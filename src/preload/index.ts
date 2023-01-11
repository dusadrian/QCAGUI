import { ipcRenderer } from 'electron';
// import $ from "jquery";

ipcRenderer.send('test');
ipcRenderer.on('test-reply', (event, args) => {
    // $("#rconsole").innerHTML = "blabla";
    // document.getElementById('rconsole').innerText = "blabla";
})



const loader: HTMLElement | null = document.getElementById('loader');
const cover: HTMLElement | null = document.getElementById('cover');

ipcRenderer.on("startLoader", () => {
    document.body.classList.add("stop-scrolling");
    if (loader !== null) {
        loader.classList.remove("d-none");
    }
    if (cover !== null) {
        cover.classList.remove("d-none");
    }
});

ipcRenderer.on("clearLoader", () => {
    document.body.classList.remove("stop-scrolling");
    if (loader !== null) {
        loader.classList.add("d-none");
    }
    if (cover !== null) {
        cover.classList.add("d-none");
    }   
});
