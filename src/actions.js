import fetch from 'isomorphic-fetch'
import C from './constants' // For Actions dispatched immediately by client...

const parseResponse = (response) => {
    const sWho = 'actions.js::parseResponse'
    // console.log(`${sWho}(): response = `, response );
    // console.log(`${sWho}(): response.json() = `, response.json() );
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
    console.log(`${sWho}(): url = ${url}...`)
    console.log(`${sWho}(): method = ${method}...`)
    console.log(`${sWho}(): body = `, body )
    fetch(url, { method, body, headers: { 'Content-Type': 'application/json' } })
        .then(parseResponse)
        //.then(dispatch)
        .then((response)=>{
            console.log(`${sWho}(): Calling dispatch( response ), response = `, response )
            dispatch(response)
        })
        .then((out)=>{
            if( callback ){
                console.log(`${sWho}(): Calling callback( out ), out = `, out )
                callback(out);
            }
        })
        .catch(logError)
}


// Immediate dispatch of thunk...
export const objectivesIsFetching = ( dispatch, isFetching ) => {

  const sWho = "actions.js:objectivesIsFetching"

  let dispatchee = { 
    type: C.OBJECTIVES_FETCHING,
    objectives_is_fetching: isFetching
  }

  console.log(`${sWho}(): Calling dispatch(`, dispatchee, `)...`)

  dispatch( dispatchee ) 
}

/* thunk... */
export const objectivesFilter = (filters) => (dispatch) => {

    const sWho = "actions.js::objectivesFilter"

    console.log(`${sWho}()...callin' objectivesIsFetching(dispatch, true)...`)
    objectivesIsFetching( dispatch, true )

    // Fake Latency...just for testing the spinning gears...
    //let faux_delay_ms = 10000
    let faux_delay_ms = 0

    console.log(`${sWho}(): setTimeout( fetchThenDispatch(...), faux_delay_ms = ${faux_delay_ms} )...`);

    // let url = "/objectives_api/objectives" + encodeURIComponent(JSON.stringify(filters))
    // let url = "/objectives_api/objectives?name=fred";
    const url = '/objectives_api/objectives?name=fredrika'

    //fetchThenDispatch(
    //    dispatch,
    //    url,
    //    'GET',
    //    {},
    //)

    setTimeout(
	    ()=> {

          fetchThenDispatch(
	        dispatch,
	        url,
	        'GET',
            null,
	        ()=>{
	            objectivesIsFetching( dispatch, false )
	        }
	      )
        },
	    faux_delay_ms
    );
}

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
