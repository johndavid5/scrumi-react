/** https://stackoverflow.com/questions/11616630/json-stringify-avoid-typeerror-converting-circular-structure-to-json/11616993 */
export const customStringify = function (v, s) {
    if( typeof v == "undefined" ){
        return "undefined"
    }
    else if( v == null ){
        return "null";
    }

    const cache = new Map()
    return JSON.stringify(v, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.get(value)) {
                // Circular reference found, discard key
                return
            }
            // Store value in our map
            cache.set(value, true)
        }
        return value
    }, s)
}

// https://stackoverflow.com/questions/38513493/why-are-my-js-promise-catch-error-objects-empty
export const errorStringify = function (err, s) {
    let sOut = ""

    if( err.hasOwnProperty("message") ){
        sOut += "\n" + "message:" + "\"" + err.message + "\""
        //err.message = err["message"]
    }
    if( err.hasOwnProperty("stack") ){
        sOut += "\n" + "stack:" + "\"" + err.stack + "\""
        //err.stack = err["stack"]
    }

    let sCustom = customStringify(err, s)
    if( sCustom && !sCustom == "{}" ){
        sOut += "\n" + sCustom
    }

    return sOut
}

let utils = { customStringify: customStringify, errorStringify: errorStringify }
export { utils }
export default utils
