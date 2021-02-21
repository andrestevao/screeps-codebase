"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_ai_1 = require("./class.ai");
module.exports.loop = function () {
    var gameAI = new class_ai_1.AdjutantAI(Memory, Game);
    gameAI.tick();
};
