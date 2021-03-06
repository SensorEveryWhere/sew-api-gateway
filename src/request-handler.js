import request from "request";

function requestHandler(options) {
    const { uri, basePath, method, customHeaders} = options;
    return function onRequest(req, res) {
        const path = req.originalUrl.slice(basePath.length);
        const rreq = request({
            uri: uri + path,
            method,
            headers: getHeaders(req, customHeaders),
            body: req.body,
            followRedirect: false
        });
        req.pipe(rreq).pipe(res);
    };
}

function getHeaders(req, customHeaders) {
    const headers = { ...req.headers, ...customHeaders };
    // host header must be set as undefined, otherwise
    // provokes issues with https calls
    headers.host = undefined;
    return headers;
}
export default requestHandler;
