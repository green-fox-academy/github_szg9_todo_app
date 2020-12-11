import * as fs from 'fs';
import { Task } from './task.js'

class TodoList {

    constructor(file) {
        this.file = file;
    }

    printInstructions() {
        console.log('');
        console.log('Parancssori Todo applikáció');
        console.log('=============================');
        console.log('');
        console.log('    -l   Kilistázza a feladatokat');
        console.log('    -a   Új feladatot ad hozzá');
        console.log('    -r   Eltávolít egy feladatot');
        console.log('    -c   Teljesít egy feladatot');
        console.log('');
    }

    getList() {
        try {
            if (!fs.existsSync(this.file)) throw Error(`Unable to read file: ${this.file}`);
            this.textList = fs.readFileSync(this.file).toString().split('\n');
            if (this.textList[0] === '') {
                this.textList.splice(0, 1);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    updateList() {
        try {
            if (!fs.existsSync(this.file)) throw Error(`Unable to write file: ${this.file}`);
            fs.writeFileSync(this.file, '');
            this.textList.forEach((task, index) => (index == this.textList.length - 1) ? fs.appendFileSync(this.file, task) : fs.appendFileSync(this.file, task + '\n'));
        } catch (err) {
            console.log(err.message);
        }
    }

    addTask(task) {
        try {
            if (task === true || task === '') throw Error('Nem lehetséges új feladat hozzáadása: nincs megadva feladat!');
            this.getList();
            this.textList.push(task);
            this.updateList();
            console.log(`${task} feladat elmentve.`);
        } catch (err) {
            console.log(err.message);
        }
    }

    removeTask(taskNumber) {
        try {
            this.getList();
            if (taskNumber === true || taskNumber === '') throw Error('Nem lehetséges az eltávolítás: nem adott meg indexet!');
            if (taskNumber > this.textList.length) throw Error('Nem lehetséges az eltávolítás: túlindexelési probléma adódott!');
            if (typeof taskNumber != "number") throw Error('Nem lehetséges az eltávolítás: a megadott index nem szám!');
            this.textList.splice(taskNumber - 1, 1);
            this.updateList();
            console.log(`${taskNumber}. számú feladat törölve.`);
        } catch (err) {
            console.log(err.message);
        }
    }

    createTaskList() {
        this.getList();
        this.taskList = [];
        for (let i = 0; i < this.textList.length; i++) {
            if (this.textList[i].includes(' x ')) {
                this.taskList.push(new Task(this.textList[i], true));
            } else {
                this.taskList.push(new Task(this.textList[i]));
            }
        }
    }

    printTodoList() {
        this.getList();
        if (this.textList[0] === '' || this.textList.length === 0) {
            console.log('Nincs mára tennivalód! :)');
        } else {
            this.createTaskList();
            this.taskList.forEach((task, index) => console.log(`${index + 1} - ${task.printNameWithStatus()}`));
        }
    }

    getTaskCompleted(taskNumber) {
        try {
            this.getList();
            if (taskNumber === true || taskNumber === '') throw Error('Nem lehetséges az eltávolítás: nem adott meg indexet!');
            if (taskNumber > this.textList.length) throw Error('Nem lehetséges az eltávolítás: túlindexelési probléma adódott!');
            if (typeof taskNumber != "number") throw Error('Nem lehetséges az eltávolítás: a megadott index nem szám!');
            this.createTaskList();
            this.taskList[taskNumber - 1].getCompleted();
            this.textList[taskNumber - 1] = this.textList[taskNumber - 1] + ' x ';
            this.updateList();
            this.printTodoList();
        }
        catch (err) {
            console.log(err.message);
        }
    }
}

export { TodoList };