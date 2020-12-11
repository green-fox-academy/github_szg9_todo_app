'use strict';

import minimist from "minimist";
const args = minimist(process.argv);

import { TodoList } from "./todoList.js"

const toDolist = new TodoList('thingstodo.txt');

if (checkArguments()) {
    console.log("");
    console.log('Nem támogatott argumentum!');
    toDolist.printInstructions();
} else if (args.l === true) {
    toDolist.printTodoList();
} else if (args.hasOwnProperty('a')) {
    toDolist.addTask(args.a);
} else if (args.hasOwnProperty('r')) {
    toDolist.removeTask(args.r);
} else {
    toDolist.printInstructions();
};

function checkArguments() {
    const argsArray = Object.keys(args);
    if (argsArray.includes('l') || argsArray.includes('a') || argsArray.includes('c') || argsArray.includes('r') || argsArray.length == 1 && argsArray.includes('_')) {
        return false;
    } else {
        return true;
    }
};