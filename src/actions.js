import fetch from 'isomorphic-fetch'

const parseResponse = response => {
    let sWho = "actions.js::parseResponse";
    console.log(`${sWho}(): response = `, response );
    return response.json();
}

const logError = error => console.error(error)

/* Use isomorphic-fetch to send a request to a web
* service "then" automatically dispatch the response.
*/
const fetchThenDispatch = (dispatch, url, method, body) => {
    let sWho = "actions.js::fetchThenDispatch";
    console.log(`${sWho}(): url = ${url}...`);
    fetch(url, {method, body, headers: { 'Content-Type': 'application/json' }})
        .then(parseResponse)
        .then(dispatch)
        .catch(logError)
}

/* thunk version of addColor()...
*  (1) Sends a POST request to http://localhost:3000/api/colors
*      along with the title and hex value of the new color.
*  (2) An ADD_COLOR action object is returned, parsed, and dispatched.
*/
export const addColor = (title, color) => dispatch =>
    fetchThenDispatch(
        dispatch,
        '/color_api/colors',
        'POST',
        JSON.stringify({title, color})
    )

/* thunk... */
export const objectivesFilter = (filters) => dispatch => {
    //let url = "/objectives_api/objectives" + encodeURIComponent(JSON.stringify(filters))
    let url = "/objectives_api/objectives";
    fetchThenDispatch(
        dispatch,
        url,
        'POST',
        JSON.stringify({...filters})
    );
}

/* thunk... */
export const linksQaRun = (basePath, additionOnlyCode) => dispatch =>
    fetchThenDispatch(
        dispatch,
        '/links_qa_api/run_links_qa',
        'POST',
        JSON.stringify({basePath, additionOnlyCode})
    )

/* thunk... */
export const removeColor = id => dispatch =>
    fetchThenDispatch(
        dispatch,
        `/color_api/color/${id}`,
        'DELETE'
    )

/* thunk... */
export const rateColor = (id, rating) => dispatch =>
    fetchThenDispatch(
        dispatch,
        `/color_api/color/${id}`,
        'PUT',
        JSON.stringify({rating})
    )
