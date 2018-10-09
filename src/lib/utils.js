/** https://stackoverflow.com/questions/11616630/json-stringify-avoid-typeerror-converting-circular-structure-to-json/11616993 
*
* To prevent
* TypeError: Converting circular structure to JSON
*      at JSON.stringify (<anonymous>)
*/
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

/**
* @note: this one also converts recursive objects (using php "array" notation for the query string)
*
* @source: https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
*/
export const objectToQueryString = function(obj, prefix) {

  var str = [], p;

  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        objectToQueryString(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");

} /* objectToQueryString() */

/*
* https://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
*/
export const queryStringToObject = function(queryString) {

    if( queryString[1] == "?" ){
        queryString = queryString.substring(1)
    }

    //var args = queryString.substring(1).split('&');
    var args = queryString.split('&');

    var argsParsed = {};

    var i, arg, kvp, key, value;

    for (i=0; i < args.length; i++) {

        arg = args[i];

        if (-1 === arg.indexOf('=')) {

            argsParsed[decodeURIComponent(arg).trim()] = true;
        }
        else {

            kvp = arg.split('=');

            key = decodeURIComponent(kvp[0]).trim();

            value = decodeURIComponent(kvp[1]).trim();

            argsParsed[key] = value;
        }
    }

    return argsParsed;

} /* queryStringToObject() */

export const strEqualsIgnoreCase = function(str1, str2) {
    return compareStrings( str1, str2, true, true )
}

/* https://stackoverflow.com/questions/2140627/javascript-case-insensitive-string-comparison */
export const compareStrings = function(string1, string2, ignoreCase, useLocale) {
    if (ignoreCase) {
        if (useLocale) {
            string1 = string1.toLocaleLowerCase();
            string2 = string2.toLocaleLowerCase();
        }
        else {
            string1 = string1.toLowerCase();
            string2 = string2.toLowerCase();
        }
    }

    return string1 === string2;
}

//let utils = { customStringify: customStringify, errorStringify: errorStringify }
// Or, using object literal assignment...
let utils = { customStringify, errorStringify, objectToQueryString, queryStringToObject, strEqualsIgnoreCase, compareStrings }
export { utils }
export default utils
