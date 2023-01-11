import { ipcRenderer } from 'electron';
// import $ from "jquery";
import * as path from 'path';

// import { helpers } from './library/helpers.js'; // nu da nicio eroare, e ok
// console.log(helpers); // de ce da eroare la utilizarea helpers...?

window.addEventListener('DOMContentLoaded', () => {
    
    // const helpers = async () => {
    //     return await import('./library/helpers');
    // };

    // console.log(helpers().then(result => result.isArray("a")));

    ipcRenderer.on('sendCommand-reply', (event, response) => {
        // console.log(response);
        
        let bla: HTMLElement = document.getElementById("rconsole");
        bla.innerHTML = "haha";

        let rconsole: HTMLElement | null = document.getElementById("rconsole");

        if (rconsole !== null) {
            
            let temp: Array<string> = response.evaluate.command[0].split("\n");

            let first: string = ">";
            let color: string = "#932192";
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
