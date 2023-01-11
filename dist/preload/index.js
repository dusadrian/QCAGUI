"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// import $ from "jquery";
electron_1.ipcRenderer.send('test');
electron_1.ipcRenderer.on('test-reply', (event, args) => {
    // $("#rconsole").innerHTML = "blabla";
    // document.getElementById('rconsole').innerText = "blabla";
});
const loader = document.getElementById('loader');
const cover = document.getElementById('cover');
electron_1.ipcRenderer.on("startLoader", () => {
    document.body.classList.add("stop-scrolling");
    if (loader !== null) {
        loader.classList.remove("d-none");
    }
    if (cover !== null) {
        cover.classList.remove("d-none");
    }
});
electron_1.ipcRenderer.on("clearLoader", () => {
    document.body.classList.remove("stop-scrolling");
    if (loader !== null) {
        loader.classList.add("d-none");
    }
    if (cover !== null) {
        cover.classList.add("d-none");
    }
});
