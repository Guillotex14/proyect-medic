const { AndroidConfig } = require('@expo/config-plugins');

module.exports = function(config) {
    config = AndroidConfig.Manifest.addRedirectIntentFilter(config, {
        scheme: 'myapp',
        host: 'redirect',
        pathPrefix: '/',
    });

    return config;
};