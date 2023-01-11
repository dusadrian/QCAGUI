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
process.env.NODE_ENV = "development";
// process.env.NODE_ENV = 'production';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// if true, move back the R_Portable directory to:
// StatConverter/dist (on Windows)
// StatConverter root (on Macos)
const embeddedR = false;
const electron_1 = require("electron");
const path = __importStar(require("path"));
const commandExec = __importStar(require("child_process"));
const gotTheLock = electron_1.app.requestSingleInstanceLock();
let mainWindow;
let Rprocess;
let longresponse = "";
let response;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        autoHideMenuBar: true,
        width: 800,
        height: 550 + (process.platform == "win32" ? 10 : 0),
        maxWidth: 800,
        maxHeight: 550,
        minWidth: 800,
        minHeight: 550,
        backgroundColor: "#fff",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            // nodeIntegration: true
        },
    });
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
    // mainWindow.webContents.setZoomFactor(2);
    if (process.env.NODE_ENV === "production") {
        // mainWindow.removeMenu();
    }
    if (process.env.NODE_ENV === "development") {
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    }
}
if (!gotTheLock) {
    electron_1.app.quit();
}
else {
    electron_1.app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized())
                mainWindow.restore();
            mainWindow.focus();
        }
        // console.log('second');
    });
    electron_1.app.whenReady().then(() => {
        createWindow();
        let R_path = "";
        if (process.platform == 'win32') {
            if (embeddedR) {
                if (process.env.NODE_ENV == "production") {
                    R_path = path.join(__dirname, '../../R_Portable/bin/R.exe');
                }
                else {
                    R_path = path.join(__dirname, '../R_Portable/bin/R.exe');
                }
            }
            else {
                let findR;
                try {
                    findR = commandExec.execSync("where.exe R", {
                        shell: "cmd.exe",
                        cwd: process.cwd(),
                        env: process.env,
                        encoding: "utf-8",
                    });
                    R_path = findR.replace(/(\r\n|\n|\r)/gm, "");
                }
                catch (error) {
                    electron_1.dialog.showMessageBox(mainWindow, {
                        type: "question",
                        title: "Select R path",
                        message: "Could not find R. Select the path to the binary?",
                        // message: String(error),
                    })
                        .then((response) => {
                        if (response) {
                            electron_1.dialog.showOpenDialog(mainWindow, {
                                title: "R path",
                                properties: ["openFile"],
                            })
                                .then((result) => {
                                if (result.canceled) {
                                    electron_1.app.quit();
                                }
                                R_path = result.filePaths[0];
                                if (R_path != "") {
                                    start_R(R_path);
                                }
                            });
                        }
                    });
                }
            }
        }
        else { // macos
            if (embeddedR) {
                if (process.env.NODE_ENV == "production") {
                    R_path = path.join(__dirname, '../../R_Portable/bin/R');
                }
                else {
                    R_path = path.join(__dirname, '../R_Portable/bin/R');
                }
            }
            else {
                // check if R is installed
                // try {
                // findR = commandExec.execSync("which R", {
                //     shell: "/bin/bash",
                //     cwd: process.cwd(),
                //     env: process.env,
                //     encoding: "utf-8" as BufferEncoding,
                // });
                // R_path = findR.replace(/(\r\n|\n|\r)/gm, "");
                R_path = "/usr/local/bin/R";
                // } catch (error) {
                //     dialog.showMessageBox(mainWindow, {
                //         type: "question",
                //         title: "Select R path",
                //         message: "Could not find R. Select the path to the binary?",
                //         // message: String(error),
                //     })
                //     .then((response) => {
                //         if (response) {
                //             dialog.showOpenDialog(mainWindow, {
                //                 title: "R path",
                //                 properties: ["openFile"],
                //             })
                //             .then((result) => {
                //                 if(result.canceled){
                //                     app.quit();
                //                 }
                //                 R_path = result.filePaths[0];
                //                 if (R_path != "") {
                //                     start_R(R_path);
                //                 }
                //             });
                //         }
                //     });
                // }
            }
        }
        // console.log(R_path);
        if (R_path != "") {
            start_R(R_path);
        }
        electron_1.ipcMain.on("showError", (event, args) => {
            electron_1.dialog.showMessageBox(mainWindow, {
                type: "error",
                message: args.message,
            });
        });
        electron_1.ipcMain.on("sendCommand", (event, command) => {
            // mainWindow.webContents.send("startLoader");
            // console.log(command);
            Rprocess.stdin.write(command);
        });
    });
}
// let dependencies_ok = false;
// let unmet_dependencies = "";
const start_R = function (R_path) {
    const penv = process.env;
    if (process.platform === "win32") {
        if (penv.HOME && !(penv.HOME.includes("Documents"))) {
            penv.HOME = penv.HOME + '\\Documents';
        }
    }
    else {
        penv.test = "test";
    }
    Rprocess = commandExec.spawn(R_path, ["-q", "--no-save"]);
    let command = "";
    if (process.platform === "win32" && embeddedR) {
        // make sure we use the R package library from R_Portable, otherwise
        // a different version of the code depending on using a locally installed R
        if (process.env.NODE_ENV == "production") {
            command = ".libPaths('" + path.join(__dirname, "../../R_Portable/library") + "')";
        }
        else {
            command = ".libPaths('" + path.join(__dirname, "../R_Portable/library") + "')";
        }
        command = command.replace(/\\/g, '/'); // replace backslash with forward slash
        Rprocess.stdin.write(command + '\n');
    }
    if (process.env.NODE_ENV == 'production') {
        command = 'source("' + path.join(__dirname, "../../") + 'startServer.R")';
    }
    else {
        command = 'source("' + path.join(__dirname, "../src/") + 'startServer.R")';
    }
    if (process.platform === "win32") {
        command = command.replace(/\\/g, '/'); // replace backslash with forward slash
    }
    Rprocess.stdin.write(command + '\n');
    Rprocess.stdin.write('RGUI_dependencies()\n');
    // Rprocess.stdin.write('RGUI_parseCommand("RGUI_infobjs()")\n');
    Rprocess.stdin.write('RGUI_parseCommand("1 + 1")\n');
    Rprocess.stdin.write('RGUI_parseCommand("2 + 1")\n');
    let startJSON = false;
    Rprocess.stdout.on("data", (data) => {
        const datasplit = data.toString().split(/\r?\n/);
        // console.log(datasplit);
        if (datasplit.includes("_dependencies_ok_")) {
            // console.log("dependencies ok");
            // dependencies_ok = true;
        }
        for (let i = 0; i < datasplit.length; i++) {
            if (!startJSON) {
                startJSON = datasplit[i] == "RGUIstartJSON";
            }
            else {
                if (datasplit[i] == "RGUIendJSON") {
                    startJSON = false;
                    response = JSON.parse(longresponse);
                    // console.log(response);
                    mainWindow.webContents.send("clearLoader");
                    mainWindow.webContents.send("sendCommand-reply", response);
                    // mainWindow.webContents.send("clearLoader");
                    longresponse = "";
                    break;
                }
                longresponse += datasplit[i];
            }
        }
    });
};
electron_1.app.on("window-all-closed", () => {
    // if (RptyProcess) {
    // 	RptyProcess.kill();
    // }
    electron_1.app.quit();
});
electron_1.app.on("activate", () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map