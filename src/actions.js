import fetch from 'isomorphic-fetch'
import C from './constants' // For Actions dispatched immediately by client...

import { config } from './config'
import { logajohn } from './lib/logajohn'

import { utils } from './lib/utils'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`src/actions.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

const parseResponse = (response) => {
    const sWho = 'actions.js::parseResponse'
    // Warning: can cause "locked response" errors in browser...
    // ...not a good idea to monkey with Promises...
    //logajohn.debug(`${sWho}(): response = `, response );
    //logajohn.debug(`${sWho}(): response.json = `, response.json );
    //logajohn.debug(`${sWho}(): response.json() = `, response.json() );
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
    logajohn.debug(`${sWho}(): url = ${url}...`)
    logajohn.debug(`${sWho}(): method = ${method}...`)
    logajohn.debug(`${sWho}(): body = `, body )
    fetch(url, { method, body, headers: { 'Content-Type': 'application/json' } })
        .then(parseResponse)
        //.then(dispatch)
        .then((response)=>{
            logajohn.debug(`${sWho}(): Calling dispatch( response ), response = `, response )
            logajohn.debug(`${sWho}(): Calling dispatch( response ), typeof response = '` + (typeof response) + `'...`)
            logajohn.debug(`${sWho}(): Calling dispatch( response ), response.constructor.name = '`+ response.constructor.name +`'...`)
            dispatch(response)
            logajohn.debug(`${sWho}(): Returned from dispatch( response ), response = `, response )
        })
        .then((out)=>{
            if( callback ){
                logajohn.debug(`${sWho}(): Calling callback( out ), out = `, out )
                callback(out);
            }
            else{
                logajohn.debug(`${sWho}(): Callback is falsey, so not calling callback( out ), out = `, out )
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

  //logajohn.debug(`${sWho}(): dispatch = `, dispatch )
  logajohn.debug(`${sWho}(): isFetching = `, isFetching )

  let dispatchee = { 
    type: C.OBJECTIVES_FETCHING,
    objectives_is_fetching: isFetching
  }

  logajohn.debug(`${sWho}(): Calling dispatch( dispatchee ), typeof dispatch = `, (typeof dispatch) )

  logajohn.debug(`${sWho}(): Calling dispatch( dispatchee ), dispatchee = `, dispatchee, `...`)
  logajohn.debug(`${sWho}(): Calling dispatch( dispatchee ), typeof dispatchee = '` + (typeof dispatchee) + `'...`)
  logajohn.debug(`${sWho}(): Calling dispatch( dispatchee ), dispatchee.constructor.name = '` + (dispatchee.constructor.name) + `'...`)

  dispatch( dispatchee ) 
}/* objectivesIsFetching() */

/* thunk... */
export const objectivesFilter = (filters) => (dispatch) => {

    const sWho = "actions.js::objectivesFilter"

    logajohn.debug(`${sWho}()...filters = `, filters )
    logajohn.debug(`${sWho}()...typeof dispatch = `, (typeof dispatch) )

    // "Thunks have another benefit. They can invoke
    //  dispatch() or getState() asynchronously as many
    //  times as they like, and they are not
    //  limited to dispatching one type of action."

    logajohn.debug(`${sWho}()...callin' objectivesIsFetching(dispatch, true)...`)

    objectivesIsFetching( dispatch, true )
    
    // const url = "/objectives_api/objectives" + encodeURIComponent(JSON.stringify(filters))
    // const url = "/objectives_api/objectives?name=fred";
    // const url = '/objectives_api/objectives?name=fredrika'
    //const url = '/objectives_api/objectives?' + utils.objectToQueryString(filters)
    // For reverse proxy...prefix /scrumi-react...
    const url = '/scrumi-react/objectives_api/objectives?' + utils.objectToQueryString(filters)

    logajohn.debug(`${sWho}(): Callin' fetchThenDispatch(${url})...`)

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
		//    logajohn.debug(`${sWho}(): setTimeout( fetchThenDispatch(${url}), faux_delay_ms = ${faux_delay_ms} )...`);
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
    //'/color_api/colors',
    '/scrumi-react/color_api/colors',
    'POST',
    JSON.stringify({ title, color }),
)

/* thunk... */
export const linksQaRun = (basePath, additionOnlyCode) => dispatch => fetchThenDispatch(
    dispatch,
    //'/links_qa_api/run_links_qa',
    '/scrumi-react/links_qa_api/run_links_qa',
    'POST',
    JSON.stringify({ basePath, additionOnlyCode }),
)

/* thunk... */
export const removeColor = id => dispatch => fetchThenDispatch(
    dispatch,
    //`/color_api/color/${id}`,
    `/scrumi-react/color_api/color/${id}`,
    'DELETE',
)

/* thunk... */
export const rateColor = (id, rating) => dispatch => fetchThenDispatch(
    dispatch,
    //`/color_api/color/${id}`,
    `/scrumi-react/color_api/color/${id}`,
    'PUT',
    JSON.stringify({ rating }),
)
