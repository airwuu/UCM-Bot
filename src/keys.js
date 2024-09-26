"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keys = void 0;
var index_js_1 = require("./utils/index.js");
exports.Keys = {
    clientToken: (0, index_js_1.getEnvVar)('CLIENT_TOKEN'),
    clientID: (0, index_js_1.getEnvVar)('CLIENT_ID'),
    guildID: (0, index_js_1.getEnvVar)('GUILD_ID'),
};
exports.default = exports.Keys;
