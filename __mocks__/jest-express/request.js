

Object.defineProperty(exports, '__esModule', { value: true })
class Request {
    constructor() {
        this.baseUrl = ''
        this.body = ''
        this.cookies = {}
        this.fresh = false
        this.headers = {}
        this.hostname = ''
        this.ip = ''
        this.ips = []
        this.method = ''
        this.originalUrl = ''
        this.params = {}
        this.path = ''
        this.protocol = ''
        this.query = {}
        this.route = {}
        this.secure = false
        this.signedCookies = {}
        this.stale = false
        this.subdomains = []
        this.xhr = false
        this.accepts = jest.fn()
        this.acceptsCharsets = jest.fn()
        this.acceptsEncodings = jest.fn()
        this.acceptsLanguages = jest.fn()
        this.get = jest.fn()
        this.is = jest.fn()
        this.range = jest.fn()
        return this
    }

    resetMocked() {
        this.baseUrl = ''
        this.body = ''
        this.cookies = {}
        this.fresh = false
        this.headers = {}
        this.hostname = ''
        this.ip = ''
        this.ips = []
        this.method = ''
        this.originalUrl = ''
        this.params = {}
        this.path = ''
        this.protocol = ''
        this.query = {}
        this.route = {}
        this.secure = false
        this.signedCookies = {}
        this.stale = false
        this.subdomains = []
        this.xhr = false
        this.accepts.mockReset()
        this.acceptsCharsets.mockReset()
        this.acceptsEncodings.mockReset()
        this.acceptsLanguages.mockReset()
        this.get.mockReset()
        this.is.mockReset()
        this.range.mockReset()
    }

    setBaseUrl(value) {
        this.baseUrl = value
    }

    setBody(value) {
        this.body = value
    }

    setCookies(key, value) {
        this.cookies[key] = value
    }

    setFresh(value) {
        this.fresh = value
    }

    setHeaders(key, value) {
        this.headers[key] = value
    }

    setIp(value) {
        this.ip = value
    }

    setIps(value) {
        this.ips.push(value)
    }

    setMethod(value) {
        this.method = value
    }

    setOriginalUrl(value) {
        this.originalUrl = value
    }

    setParams(key, value) {
        this.params[key] = value
    }

    setPath(value) {
        this.path = value
    }

    setProtocol(value) {
        this.protocol = value
    }

    setQuery(key, value) {
        this.query[key] = value
    }

    setRoute(key, value) {
        this.route[key] = value
    }

    setSecure(value) {
        this.secure = value
    }

    setSignedCookies(key, value) {
        this.signedCookies[key] = value
    }

    setStale(value) {
        this.stale = value
    }

    setSubdomains(value) {
        this.subdomains.push(value)
    }

    setXhr(value) {
        this.xhr = value
    }
}
exports.Request = Request
// # sourceMappingURL=request.js.map
