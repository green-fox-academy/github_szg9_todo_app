class Task {

    constructor(name, isCompleted = false) {
        this.name = name;
        this.isCompleted = isCompleted;
    }

    getCompleted() {
        this.isCompleted = true;
    }

    printNameWithStatus() {
        if (this.isCompleted == true) {
            return (`[x] ${this.name.replace(' x ', '')}`);
        } else {
            return (`[ ] ${this.name}`);
        }
    }
}

export { Task };