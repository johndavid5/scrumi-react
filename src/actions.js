import fetch from 'isomorphic-fetch'
import C from './constants' // For Actions dispatched immediately by client...

import { config } from './config'
import { logajohn } from './lib/logajohn'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info(`src/actions.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

const parseResponse = (response) => {
    const sWho = 'actions.js::parseResponse'
    logajohn.info(`${sWho}(): response = `, response );
    //logajohn.info(`${sWho}(): response.json() = `, response.json() );
    return response.json()
}

const logError = error => console.error(error)

/* Use isomorphic-fetch to send a request to a web
* service "then" automatically dispatch the response.
*
* Supply `callback` if you want something to happen
* after receiving and dispatching the response...
*/
const fetchThenDispatch = (dispatch, url, method, body, callback) => {
    const sWho = 'actions.js::fetchThenDispatch'
    logajohn.info(`${sWho}(): url = ${url}...`)
    logajohn.info(`${sWho}(): method = ${method}...`)
    logajohn.info(`${sWho}(): body = `, body )
    fetch(url, { method, body, headers: { 'Content-Type': 'application/json' } })
        .then(parseResponse)
        //.then(dispatch)
        .then((response)=>{
            logajohn.info(`${sWho}(): Calling dispatch( response ), response = `, response )
            dispatch(response)
        })
        .then((out)=>{
            if( callback ){
                logajohn.info(`${sWho}(): Calling callback( out ), out = `, out )
                callback(out);
            }
        })
        .catch(logError)
}


// Immediate dispatch of thunk...
// NOTE: Not all your action creators have to be thunks.
// The `redux-thunk` middleware knows the difference between
// thunks and action objects.  Action objects are immediately
// dispatched.
export const objectivesIsFetching = ( dispatch, isFetching ) => {

  const sWho = "actions.js:objectivesIsFetching"

  //logajohn.info(`${sWho}(): dispatch = `, dispatch )
  logajohn.info(`${sWho}(): isFetching = `, isFetching )

  let dispatchee = { 
    type: C.OBJECTIVES_FETCHING,
    objectives_is_fetching: isFetching
  }

  logajohn.info(`${sWho}(): Calling dispatch(`, dispatchee, `)...`)

  dispatch( dispatchee ) 
}

/* thunk... */
export const objectivesFilter = (filters) => (dispatch) => {

    const sWho = "actions.js::objectivesFilter"

    logajohn.info(`${sWho}()...filters = `, filters )
    logajohn.info(`${sWho}()...typeof dispatch = `, (typeof dispatch) )

    // "Thunks have another benefit. They can invoke
    //  dispatch() or getState() asynchronously as many
    //  times as they like, and they are not
    //  limited to dispatching one type of action."

    logajohn.info(`${sWho}()...callin' objectivesIsFetching(dispatch, true)...`)
    objectivesIsFetching( dispatch, true )
    
    // let url = "/objectives_api/objectives" + encodeURIComponent(JSON.stringify(filters))
    // let url = "/objectives_api/objectives?name=fred";
    const url = '/objectives_api/objectives?name=fredrika'

    logajohn.info(`${sWho}(): Callin' fetchThenDispatch(${url})...`)

     fetchThenDispatch(
	        dispatch,
	        url,
	        'GET',
            null,
	        ()=>{
	            objectivesIsFetching( dispatch, false )
	        }
	 )

		//    // Fake Latency...just for testing the spinning gears...
		//    let faux_delay_ms = 10000
		//    //let faux_delay_ms = 0
		//
		//    logajohn.info(`${sWho}(): setTimeout( fetchThenDispatch(${url}), faux_delay_ms = ${faux_delay_ms} )...`);
		//
		//    setTimeout(
		//	    ()=> {
		//
		//          fetchThenDispatch(
		//	        dispatch,
		//	        url,
		//	        'GET',
		//            null,
		//	        ()=>{
		//	            //objectivesIsFetching( dispatch, false )
		//	        }
		//	      )
		//        },
		//	    faux_delay_ms
		//    );

}/* objectivesFilter()() */

/* thunk version of addColor()...
*  (1) Sends a POST request to http://localhost:3000/api/colors
*      along with the title and hex value of the new color.
*  (2) An ADD_COLOR action object is returned, parsed, and dispatched.
*/
export const addColor = (title, color) => dispatch => fetchThenDispatch(
    dispatch,
    '/color_api/colors',
    'POST',
    JSON.stringify({ title, color }),
)

/* thunk... */
export const linksQaRun = (basePath, additionOnlyCode) => dispatch => fetchThenDispatch(
    dispatch,
    '/links_qa_api/run_links_qa',
    'POST',
    JSON.stringify({ basePath, additionOnlyCode }),
)

/* thunk... */
export const removeColor = id => dispatch => fetchThenDispatch(
    dispatch,
    `/color_api/color/${id}`,
    'DELETE',
)

/* thunk... */
export const rateColor = (id, rating) => dispatch => fetchThenDispatch(
    dispatch,
    `/color_api/color/${id}`,
    'PUT',
    JSON.stringify({ rating }),
)
