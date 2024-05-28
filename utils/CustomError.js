class CustomError extends Error {
    constructor(statusCode, statusMessage) {
        super();
        this.statusCode = statusCode;
        this.status = this.getErrorFrom(this.statusCode);
        this.statusMessage = statusMessage;
    }

    getErrorFrom(statusCode) {
        let msg = '';

        switch (statusCode) {
            case 400:
                msg = 'Bad Request';
                break;
            case 401:
                msg = 'Unathorized';
                break;
            case 403:
                msg = 'Forbidden';
                break;
            case 404:
                msg = 'Not Found';
                break;
            case 405:
                msg = 'Method Not Allowed';
                break;
            default:
                msg = 'Unrecognized Error';
                break;
        }

        return msg;
    }
}

module.exports = CustomError;
