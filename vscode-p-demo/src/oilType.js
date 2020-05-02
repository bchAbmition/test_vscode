const fs = require('fs');
const os = require('os');
const path = require('path');
const vscode = require('vscode');
const util = require('./util');
const exec = require('child_process').exec;

var num;
var SCHEDULE_TYPE = {
    FULL : 1,
    NON : 2
};
class Task {
    constructor(_name) {
    this.Name = _name;
    this.Priority = 0;
    this.Stack = false;
    this.SCHEDULE_TYPE = {
            FULL : 1,
            NON : 2
        }
    this.Schedule = SCHEDULE_TYPE.NON;
    }
    GetTask(content) {
        let temp = content.PRIORITY[0];
    }
}

class Oil {
    constructor(_name) {
        this.Name = _name;
        this.tasks = new Array();
    }
    GetOs(data) {
        this.Name = data["_self"];
        let it = data["_content"]["TASK"];
        if (typeof(it)!="undefined") {
            for (var i=0; i<it.length; i++) {
                this.tasks[this.tasks.length] = new Task(it[i]["_self"]);
                this.tasks[this.tasks.length-1].GetTask(it[i]["_content"]);
            }
        }
    }
}

module.exports = Oil;