'use strict';

import minimist from "minimist";
const args = minimist(process.argv);

import { Todo } from "./todo.js"

const toDo = new Todo('thingstodo.txt');

toDo.getList();

if (args.l === true) {
    toDo.printTodoList();
} else if (args.hasOwnProperty('a')) {
    toDo.addTask(args.a);
} else if (args.hasOwnProperty('r')) {
    toDo.removeTask(args.r);
} else {
    toDo.printInstructions();
};