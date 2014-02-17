/**
 * 
 */
var DevTips = DevTips || {};

(function(dt) {

    var __callbackId = 0;
    var maxQueryStringLengthErrorMessage = "Query string length exceeds maximum recommended value of ";
    var maxPathLengthErrorMessage = "Url path length exceeds maximum recommended value of ";

    // expose these for reference
    var maxQueryStringLength = dt.maxQueryStringLength = 1000;
    var maxPathLength = dt.maxPathLength = 240;

    var jsEncode = dt.jsEncode = function(value) {
        // properly encode arrays and dates
        // NOTE: use this to turn arrays of ids into
        // semicolon delimited string.

        if (value instanceof Date) {
            return new Date(value).getTime();
        };

        if (value instanceof Array) {
            var values = [];
            for (var i = 0; i < value.length; i++) {
                values.push(encodeURIComponent(value[i]));
            };
            // vectorize arrays
            return values.join(";");
        };

        return encodeURIComponent(value);

    };

    var jsonp = dt.jsonp = function(url, parameters, apiKey, success, error, timeout) {
        /// <summary>
        /// Sets up a JSONP call to the api.
        /// </summary>
        /// <param name="url" type="String"></param>
        /// <param name="parameters" type="Map">Optional</param>
        /// <param name="apiKey" type="String">Optional</param>
        /// <param name="success" type="Function(data)">Handle successful api call. data = api JSOB</param>
        /// <param name="error" type="Function(error)">Handle and error condition. error = API error JSOB. 
        /// Optional, if you are crazy or would like to be driven that way.</param>
        /// <param name="timeout" type="Number">Timeout in ms. Optional. Defaults to 10,000</param>

        if (url.length > maxPathLength) {
            throw new Error(maxPathLengthErrorMessage + maxPathLength);
        };

        var callBackName = "_callback" + __callbackId++;

        var queryString = "?jsonp=DevTips.jsonp." + callBackName;
        if (parameters) {
            for (var name in parameters) {
                if (parameters.hasOwnProperty(name)) {
                    queryString = queryString + "&" + name + "=" + jsEncode(parameters[name]);
                };
            };
        };
        if (queryString.length > maxQueryStringLength) {
            throw new Error(maxQueryStringLengthErrorMessage + maxQueryStringLength);
        };

        // setup the callback
        jsonp[callBackName] = function(data) {
            delete jsonp[callBackName];
            if (data.error) {
                if (error) {
                    data.error.callback = callBackName;
                    error(data.error);
                };
            }
            else {
                success(data);
            };
        };

        // send the request
        var scr = document.createElement("script");
        scr.type = "text/javascript";
        scr.src = url + queryString;
        var head = document.getElementsByTagName("head")[0];
        head.insertBefore(scr, head.firstChild);


        // default to 10 second timeout
        timeout = timeout || 10000;

        window.setTimeout(function() {
            if (typeof jsonp[callBackName] == "function") {

                // replace success with null callback in case the request is just very latent.
                jsonp[callBackName] = function(data) {
                    delete jsonp[callBackName];
                };

                // call the error callback
                error({ code: 408, message: "Request Timeout", callback: callBackName });

                // set a longer timeout to safely clean up the unused callback.
                window.setTimeout(function() {
                    if (typeof jsonp[callBackName] == "function") {
                        delete jsonp[callBackName];
                    };
                }, 60000);
            };
        }, timeout);
    };
})(DevTips);