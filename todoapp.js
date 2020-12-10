'use strict';

import minimist from "minimist";
const args = minimist(process.argv);

import { Todo } from "./todo.js"

const toDo = new Todo('thingstodo.txt');

if (checkArguments()) {
    console.log("");
    console.log('Nem támogatott argumentum!');
    toDo.printInstructions();
} else if (args.l === true) {
    toDo.printTodoList();
} else if (args.hasOwnProperty('a')) {
    toDo.addTask(args.a);
} else if (args.hasOwnProperty('r')) {
    toDo.removeTask(args.r);
} else {
    toDo.printInstructions();
};

function checkArguments() {
    const argsArray = Object.keys(args);
    if (argsArray.includes('l') || argsArray.includes('a') || argsArray.includes('c') || argsArray.includes('r')) {
        return false;
    } else {
        return true;
    }
};