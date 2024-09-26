"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVar = void 0;
var dotenv_1 = require("dotenv");
var path_1 = require("path");
var EnvFile = process.env.NODE_ENV === "development"
    ? ".dev.env"
    : ".env";
var EnvFilePath = (0, path_1.resolve)(process.cwd(), EnvFile);
(0, dotenv_1.config)({ path: EnvFilePath });
function getEnvVar(name, fallback) {
    var _a;
    var value = (_a = process.env[name]) !== null && _a !== void 0 ? _a : fallback;
    if (value == undefined) {
        throw new Error("Environment varaible ".concat(name, " is not set."));
    }
    return value;
}
exports.getEnvVar = getEnvVar;
