import _ from "lodash";
// import * as path from "path";
import wrapText from "wrap-text";
// import $ from "jquery";

// import {
// } from "./interfaces";

// _.orderBy(["a","c","b","d"], [], ["desc"])
// _.orderBy([3,2,4,1], [], ["desc"])


interface HelpersInterface {
    isArray: (obj: unknown) => boolean;
}

export const helpers: HelpersInterface = {
    
    isArray: function(obj: unknown): boolean {
    //     return Object.prototype.toString.call(x) == '[object Array]';
        return (obj instanceof Array);
    },


    // getKeys: function(obj: Record<string, unknown>): Array<string> {
    //     if (obj === null) return([]);
    //     return Object.keys(obj);
    // },


    // missing: function (x: unknown): boolean {
    //     return(x === void 0 || x === undefined);
    // },


    // exists: function (x: unknown): boolean {
    //     return(x !== void 0 && x !== undefined);
    // },


    // isString: function (x: unknown): boolean {
    //     return Object.prototype.toString.call(x) === "[object String]"
    // },


    // possibleNumeric: function(x: string|number): boolean {
    //     if (this.isNumeric(x)) {
    //         return true;
    //     }

    //     if (this.isNumeric(this.asNumeric(x))) {
    //         return true;
    //     }

    //     return false;
    // },


    // isNumeric: function (x: number | string): boolean {
    //     if (this.missing(x) || x === null || ("" + x).length == 0) {
    //         return false;
    //     }

    //     return Object.prototype.toString.call(x) === "[object Number]" && !Number.isNaN(x)
    // },


    // isInteger: function (x: number): boolean {
    //     return parseFloat("" + x) == parseInt("" + x, 10);
    // },


    // asNumeric: function(x: string|number|boolean): number {
    //     if (x === true) {
    //         return(1);
    //     }
    //     if (x === false) {
    //         return(0);
    //     }
    //     return parseFloat("" + x);
    // },


    // asInteger: function(x: string|number): number {
    //     return parseInt("" + x);
    // },


    // isTrue: function(x: boolean): boolean {
    //     return (x === true);
    // },

    
    // isFalse: function(x: boolean): boolean {
    //     return (x === false);
    // },

    // // modified version from: https://github.com/pieterprovoost/jerzy/blob/master/lib/vector.js
    // sortArray: function(
    //     x: Array<string|number>, options?: {[key: string]: boolean}
    // ): Array<string|number> {
        
    //     // empty last is needed to get something like:
    //     // ["A", "B", ""] instead of ["", "A", "B"]
    //     // same with numbers
    //     let emptylast = true;
    //     let decreasing = false;

    //     if (options !== void 0 && options !== undefined) { // it exists
    //         if (this.exists(options.emptylast)) {
    //             emptylast = options.emptylast;
    //         }

    //         if (this.exists(options.decreasing)) {
    //             decreasing = options.decreasing;
    //         }
    //     }
        
    //     const sorted: Array<string|number> = _.orderBy(
    //         x,
    //         [],
    //         decreasing ? ["desc"] : ["asc"]
    //     );
        
        
    //     if (emptylast) {
    //         // unlike R vectors (where all elements have to be of the same type)
    //         // array elements in Javascript can be different
    //         x = this.rep("", x.length);
    //         let pos = 0;

    //         for (let i = 0; i < x.length; i++) {
    //             if (sorted[i] !== "") {
    //                 x[pos] = sorted[i];
    //                 pos++;
    //             }
    //         }
            
    //         return x;
    //     }
        
    //     return sorted;
    // },


    // round: function(x: number, decimals: number): number {
    //     decimals = Math.pow(10, decimals);
    //     return(Math.round(x * decimals)/decimals);
    // },


    // all: function(x: Array<number|string>, rule: string, value?: unknown): boolean {
    //     if (this.missing(value)) {
    //         value = "";
    //     }

    //     let check = true;
        
    //     for (let i = 0; i < x.length; i++) {
    //         // if (this.isArray(value)) {
    //         if (value instanceof Array) {
    //             let check2 = false;
    //             for (let j = 0; j < value.length; j++) {
    //                 check2 = check2 || eval("x[i]" + rule + value[j]);
    //             }
    //             check = check && check2;
    //         }
    //         else {
    //             check = check && eval("x[i]" + rule + value);
    //         }
    //     }
        
    //     return(check);
    // },


    // any: function(x: Array<number|string>, rule: string, value?: unknown): boolean {
    //     if (this.missing(value)) {
    //         value = "";
    //     }

    //     let check = false;
        
    //     for (let i = 0; i < x.length; i++) {
    //         // if (this.isArray(value)) {
    //             if (value instanceof Array) {
    //             for (let j = 0; j < value.length; j++) {
    //                 check = check || eval("x[i]" + rule + value[j]);
    //             }
    //         }
    //         else {
    //             check = check && eval("x[i]" + rule + value);
    //         }
    //     }
        
    //     return(check);
    // },


    // rep: function(x: number|string, times: number): Array<number|string> {
    //     const result = new Array(times);
    //     for (let i = 0; i < times; i++) {
    //         result[i] = x;
    //     }
    //     return(result);
    // },


    // seq: function(from: number, to: number): Array<number> {
    //     const length = to - from + 1;
    //     const result = new Array(length);
    //     for (let i = 0; i < length; i++) {
    //         result[i] = from + i;
    //     }
    //     return(result);
    // },


    // unique: function(x: Array<number|string>): Array<number|string> {
        
    //     const uniques: Array<number|string> = [];

    //     x.forEach(value => {
    //         if (uniques.indexOf(value) < 0) {
    //             uniques.push(value);
    //         }
    //     })
        
    //     return(uniques);        
    // },


    // min: function(x: Array<number>): number {
    //     return(Math.min.apply(null, x));
    // },


    // max: function(x: Array<number>): number {
    //     return(Math.max.apply(null, x));
    // },


    // //                                         options?: {sep: string, from: number, to: number}
    // //                                         options?: {[key: string]: string|number}
    // paste: function(arr: Array<number|string>, options?: Record<string, string|number>): string {
    //     if (arr.length == 0) return("");
        
    //     let sep = " ";
    //     let from = 0;
    //     let to = arr.length - 1;

    //     if (options !== void 0 && options !== undefined) {
    //         if (this.exists(options.sep)) {
    //             sep = "" + options.sep;
    //         }
        
    //         if (this.exists(options.from)) {
    //             from = Number(options.from);
    //         }
            
    //         if (this.exists(options.to)) {
    //             to = Number(options.to);
    //         }
    //     }
        
    //     let result: string = "" + arr[from];
        
    //     if (from < to) {
    //         for (let i = from + 1; i <= to; i++) {
    //             result += sep + arr[i];
    //         }
    //     }
    //     else {
    //         for (let i = from - 1; i >= to; i--) {
    //             result += sep + arr[i];
    //         }
    //     }
        
    //     return(result);
    // },


    // // adapted from:
    // // http://stackoverflow.com/questions/840781/easiest-way-to-find-duplicate-values-in-a-javascript-array
    // duplicates: function(arr: Array<number|string>): Array<number|string> {
    //     const len = arr.length,
    //         out: Array<number|string> = [],
    //         counts: {
    //             [key: string]: number,
    //         } = {};
    //     let item = "";
            
    //     for (let i = 0; i < len; i++) {
    //         item = "" + arr[i];
    //         counts[item] = this.exists(counts[item]) ? (counts[item] + 1) : 1;
    //     }
        
    //     for (item in counts) {
    //         if (counts[item] > 1) {
    //             if (this.isNumeric(item)) {
    //                 out.push(this.asNumeric(item));
    //             } else {
    //                 out.push(item);
    //             }
    //         }
    //     }
        
    //     return out;
    // },


    // sum: function (x: Array<number>): number {
    //     return(x.reduce((sum, i) => sum += i, 0));
    // },


    // prod: function(x: Array<number>): number {
    //     return x.reduce((prod, i) => prod * i);
    // },


	// recode: function (
    //     x: Array<number>, cut: Array<number>, onebased = false
    // ): Array<number> {
    //     // x is an array of values
        
    //     // cut is an array of cut values, i.e. [a, b, c] and values get
    //     // recoded into the intervals (min, a), [a, b), [b, c) etc.

    //     // onebased is a flag to get the numbers 1 based
    //     // (instead of Javascript's 0 based system)

    //     const copycut = _.cloneDeep(cut); // to avoid any reference assignments
    //     copycut.push(this.min(x));
    //     // uscut = unique and sorted cut
    //     const uscut = this.sortArray(this.unique(copycut));
		
    //     const result = new Array<number>(x.length);
    //     for (let i = 0; i < x.length; i++) {
    //         for (let j = 0; j < uscut.length; j++) {
    //             if (x[i] >= uscut[j]) {
    //                 result[i] = j + (onebased ? 1 : 0);
    //             }
    //         }
    //     }

	// 	return(result);
    // },

    
    // printRcommand: function(robject: any) {
    //     let rconsole = document.getElementById("rconsole");
    //     //console.log("printRcommand");
    //     // updatecounter += 1;

    //     if (rconsole !== null) {
    //         let viewdata = "";
    //         this.txtcommand = ""
    //         this.updatecounter = 0;
            
    //         for (let i = 0, length = robject.evaluate.length; i < length; i++) {
                
    //             let temp: Array<string> = robject.evaluate[i].command.split("\n");
    //             let first: string = ">";
    //             let color: string = "#932192";
                
    //             if (this.tempcommand != "") {
    //                 temp.splice(0, this.tempcommand.split("\n").length - 1);
    //                 first = "+";
    //                 color = "blue";
    //             }
                
    //             for (let t: number = 0; t < temp.length; t++) {
    //                 temp[t] = wrapText(temp[t], this.cpl.result);
    //             }
                
    //             rconsole.append("<span style='color:" + color + "'>" + first + " </span>");
    //             rconsole.append("<span style='color:blue'>" + 
    //                 temp.join("<br>+ ").split(" ").join("&nbsp;") + "</span><br>");
                
    //             if (robject.evaluate[i].continue) {
    //                 if (robject.evaluate[i].hasOwnProperty("output")) {
    //                     rconsole.append(robject.evaluate[i].output.split("\n").join("<br>") + "<br>");
    //                 }
                    
    //                 // createCommandPromptInRconsole("+");
                    
    //                 if (robject.evaluate[i].hasOwnProperty("partial")) {
    //                     this.tempcommand += temp[0].substring(robject.evaluate[i].partial.length, temp[0].length) + "\n";
    //                 }
    //                 else {
    //                     this.tempcommand += temp.join("\n") + "\n";
    //                 }
    //             }
    //             else {
    //                 this.tempcommand = "";
    //                 if (robject.evaluate[i].hasOwnProperty("message")) {
    //                     rconsole.append("<span style='color:red'>" + robject.evaluate[i].message.split("\n").join("<br>") + "</span>");
    //                 }
    //                 else {
    //                     rconsole.append("<br>");
    //                 }
                    
    //                 if (robject.evaluate[i].hasOwnProperty("output")) {
    //                     rconsole.append(robject.evaluate[i].output.split("\n").join("<br>") + "<br><br>");
    //                 }
                    
    //                 if (robject.evaluate[i].hasOwnProperty("warning")) {
    //                     rconsole.append("<span style='color:red'>" + robject.evaluate[i].warning + "</span><br><br>");
    //                 }
                    
    //                 if (robject.evaluate[i].hasOwnProperty("error")) {
    //                     rconsole.append("<span style='color:red'>" + robject.evaluate[i].error + "</span><br><br>");
    //                 }
                    
    //                 if (robject.evaluate[i].hasOwnProperty("view")) {
    //                     viewdata = robject.evaluate[i].view;
    //                 }
                    
    //                 if (i == robject.evaluate.length - 1) {
    //                     // createCommandPromptInRconsole();
    //                 }
    //             }
                
    //             // rconsole.animate({
    //             //     scrollTop: rconsole[0].scrollHeight
    //             // });
                
    //             // if (focus == "result") {
    //             //     $("#tempdiv").click();
    //             // }
    //         }
            
    //         // if (viewdata != "") {
    //         //     openDataEditor(viewdata);
    //         // }
            
    //         // reset_robject();
    //         // removeSpinner();
    //     }
            
    // },

    // txtcommand: "",
    // tempcommand: "",
    // updatecounter: 0,
    // crev: {
    //     "£": "csv(",
    //     "§": "table(",
    //     "∞": " ",
    //     "±": "/",
    //     "≠": " "
    // },

    // cpl: { //characters per line
    //     command: 76,
    //     result: 74
    // },
}
