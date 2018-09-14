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
