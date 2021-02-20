"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_ai_1 = require("./class.ai");
var gameAI = new class_ai_1.AdjutantAI();
module.exports.loop = function () {
    gameAI.tick();
};
