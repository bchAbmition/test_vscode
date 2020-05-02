const fs = require('fs');
const os = require('os');
const path = require('path');
const vscode = require('vscode');
const util = require('./util');
const exec = require('child_process').exec;

var num;
const oilControl = {
    parseOilDfs: function(lines) {
        var regex = {
            param: /\s*([\w\.\-\_]+)\s*=\s*([\w\.\-\_\"]+)\s*;/,
            oilSectionStart:  /\s*([\w\.\-\_]+)[\s*|=]+([\w\.\-\_]+)\s*{/,
            oilSectionEnd:  /^\s*}\s*;/
        };
        var value = new Array();
        while (num<lines.length) {
            if (regex.oilSectionStart.test(lines[num])) {
                var match = lines[num].match(regex.oilSectionStart);
                if (typeof(value[match[1]])=="undefined") {
                    value[match[1]] = new Array();
                }
                value[match[1]][value[match[1]].length] = {};
                value[match[1]][value[match[1]].length-1]["_self"] = match[2];
                num++;
                var temp = this.parseOilDfs(lines);
                value[match[1]][value[match[1]].length-1]["_content"] = temp;
            } else if(regex.oilSectionEnd.test(lines[num])){
                num++;
                return value;
            } else if(regex.param.test(lines[num])) {
                var match = lines[num].match(regex.param);
                if (typeof(value[match[1]])=="undefined") {
                    value[match[1]] = new Array();
                }
                value[match[1]][value[match[1]].length]  = match[2];
                num++;
            } else {
                num++;
            }
        }
        return value;
    },
    parseOilString: function(data){
        var lines = data.split(/\r\n|\r|\n/);
        num = 0;
        var value = this.parseOilDfs(lines);
        return value;
    },

    openFile: function(path) {
        vscode.window.showInformationMessage("c:\Users\Administrator\vscode-p-demo\src\package.json");
        var content = fs.readFileSync(path, 'utf-8');
        var content2 = this.parseOilString(content);
        return content2
    }
};

module.exports = oilControl;