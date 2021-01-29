const mcache = require('memory-cache');
const config = require('./config');
const logger = require('./logger');

const API_URL_ENUMS = Object.freeze({
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    FORGOT_PASSWORD: "/api/auth/forgot-password"
});

function loginCache(req, res, next) {
    {
        let key = ('__express__' + req.originalUrl || req.url) + '__user__' + JSON.stringify(req.body.mobileNumber)
        logger.log(`CACHE-KEY - ${key}`);
        let cachedData = mcache.get(key)
        return {
            key: key,
            cache: cachedData
        }
    }
}

const cache = () => {
    return (req, res, next) => {
        logger.log(`CACHE-CHECK - ${JSON.stringify(req.body)}`);
        var cacheBody;
        switch (req.originalUrl) {
            case API_URL_ENUMS.LOGIN: {
                cacheBody = loginCache(req, res, next);
                break;
            }
            default: {
                logger.log(`CACHE-NOT-FOUND - ${req.originalUrl}`);
            }
        }
        if (cacheBody && cacheBody.cache) {
            req.cache = cacheBody.cache
            logger.log(`CACHE-FOUND - ${cacheBody.key}`);
            res.sendResponse = res.json
            res.json = (body) => {
                res.sendResponse(body.data)
            }
        }
        else {
            res.sendResponse = res.json
            res.json = (body) => {
                logger.log(`CACHE-UPDATE - ${cacheBody.key}`);
                body.cache.date = new Date();
                mcache.put(cacheBody.key, body.cache, config.cache.duration * 1000);
                res.sendResponse(body.data)
            }
        }
        next();
    }
}
module.exports = cache;