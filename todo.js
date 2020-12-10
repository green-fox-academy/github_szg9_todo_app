import * as fs from 'fs';

export class Todo {

    constructor(file) {
        this.file = file;
    }

    getList() {
        try {
            if (!fs.existsSync(this.file)) throw Error(`Unable to write file: ${this.file}`);
            this.toDoList = (fs.readFileSync(this.file).toString().split('\n'));
        } catch (err) {
            console.log(err.message);
        }
    }

    updateList() {
        try {
            if (!fs.existsSync(this.file)) throw Error(`Unable to write file: ${this.file}`);
            fs.writeFileSync(this.file, '');
            this.toDoList.forEach((task, index) => (index == this.toDoList.length - 1) ? fs.appendFileSync(this.file, task) : fs.appendFileSync(this.file, task + '\n'));
        } catch (err) {
            console.log(err.message);
        }
    }

    addTask(task) {
        try {
            if (!fs.existsSync(this.file)) throw Error(`Unable to write file: ${this.file}`);
            if (task === true || task === '') {
                console.log('Nem lehetséges új feladat hozzáadása: nincs megadva feladat!');
            } else {
                this.getList();
                this.toDoList.push(task);
                this.updateList();
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    removeTask(taskNumber) {
        try {
            if (!fs.existsSync(this.file)) throw Error(`Unable to write file: ${this.file}`);
            this.getList();
            this.toDoList.splice(taskNumber - 1, 1);
            this.updateList();
        } catch (err) {
            console.log(err.message);
        }
    }

    printTodoList() {
        try {
            if (!fs.existsSync(this.file)) throw Error(`Unable to read file: ${this.file}`);
            this.getList();
            if (this.toDoList[0] === '' || this.toDoList.length === 0) {
                console.log('Nincs mára tennivalód! :)');
            } else {
                this.toDoList.forEach((task, index) => console.log(`${index + 1}. ${task}`));
            }
        } catch (err) {
            console.log(err.message);
        }
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
}