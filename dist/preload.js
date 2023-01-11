"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// import { helpers } from './library/helpers.js'; // nu da nicio eroare, e ok
// console.log(helpers); // de ce da eroare la utilizarea helpers...?
window.addEventListener('DOMContentLoaded', () => {
    const helpers = async () => {
        return await Promise.resolve().then(() => __importStar(require('./library/helpers')));
    };
    console.log(helpers);
    electron_1.ipcRenderer.on('sendCommand-reply', (event, response) => {
        // console.log(response);
        let bla = document.getElementById("rconsole");
        bla.innerHTML = "haha";
        let rconsole = document.getElementById("rconsole");
        if (rconsole !== null) {
            let temp = response.evaluate.command[0].split("\n");
            let first = ">";
            let color = "#932192";
            let childspan = document.createElement('span');
            childspan.innerHTML = "<code><span style='color:" + color + "'>" + first + " </span></code>";
            rconsole.appendChild(childspan);
            childspan = document.createElement('span');
            childspan.innerHTML = "<code><span style='color:blue'>" +
                temp.join("<br>+ ").split(" ").join("&nbsp;") + "</span></code><br>";
            rconsole.appendChild(childspan);
            const keys = Object.keys(response.evaluate);
            // const keys = helpers.getKeys(response.evaluate); // Nu merge si pace...
            // console.log(keys);
            if (keys.indexOf("output") >= 0) {
                childspan = document.createElement('span');
                childspan.innerHTML = "<code><span>" +
                    response.evaluate.output[0].split("\n").join("<br>") +
                    "</code></span><br><br>";
                rconsole.appendChild(childspan);
            }
        }
        // helpers.printRcommand(response);
        // console.log(response.infobjs)
    });
});
//# sourceMappingURL=preload.js.map