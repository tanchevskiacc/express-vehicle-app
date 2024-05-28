const { Router } = require('express');

class ApiBase {
    constructor() {
        this.router = new Router();
    }
}

module.exports = ApiBase;