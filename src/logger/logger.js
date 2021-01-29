const logger = {
    log: function (e) {
        console.log('[', new Date(), ']:', e);
    }
}

module.exports = logger;