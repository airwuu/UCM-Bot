"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEvents = exports.event = exports.Events = void 0;
var discord_js_1 = require("discord.js");
Object.defineProperty(exports, "Events", { enumerable: true, get: function () { return discord_js_1.Events; } });
function event(key, callback) {
    return { key: key, callback: callback };
}
exports.event = event;
function registerEvents(client, events) {
    var _loop_1 = function (key, callback) {
        client.on(key, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            //console.log(`[Event: ${key}]`);
            var log = console.log.bind(console, "[Event: ".concat(key, "]"));
            try {
                callback.apply(void 0, __spreadArray([{ client: client, log: log }], args, false));
            }
            catch (err) {
                log('[Error]', err);
            }
        });
    };
    for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
        var _a = events_1[_i], key = _a.key, callback = _a.callback;
        _loop_1(key, callback);
    }
}
exports.registerEvents = registerEvents;
