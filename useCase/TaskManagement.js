const date = new Date();
const tasks = [];
const activetasks = [];
const inactivetasks = [];
const category = ["not started", "in progress", "completed", "on hold", "cancelled"];
const members = [];
const activeMembers = [];
const inactiveMembers = [];
role =["backend", "frontend", "uiux", "mobile"]
class Task {
    constructor(id, title, description, start_date = date.getDate(), end_date = date.getDate(), category = "not started", assignedMember = null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.category = category;
        this.assignedMember = assignedMember;
    }
    //createTask
    createTask() {
        //database
        if (this !== null) {
            tasks.push(this);
            return true;
        }
        else {
            return false;
        }

    }
    //delete a s task = aka deplace it from active tasks to inactive tasks
    deleteTask(id) {
        if (tasks.includes(this.id) && activetasks.includes(this.id)) {
            if (tasks.includes(this)) {
                activetasks.splice(tasks.indexOf(this), 1);
                inactivetasks.push(this);
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    //update
    updateTask(id, value) {
        if (tasks.includes(this.id) && activetasks.includes(this.id)) {
            switch (value) {
                case "title":
                    this.title = value;
                    break;
                case "description":
                    this.description = value;
                    break;
                case "start_date":
                    this.start_date = value;
                    break;
                case "end_date":
                    this.end_date = value;
                    break;
                case "category":
                    this.category = value;
                    break;
            }
            return true;
        } else {
            return false;
        }
    }

    categorizeTask(id, value) {
        if (category.includes(value)) {
            if (tasks.includes(this.id) && !(inactivetasks.includes(this.id))) {
                this.category = value;
                return true;
            }
            else {
                return false;
            }
        } else {
            return false;
        }

    }
    //assign to member
    assignMember(id, member){
        if(tasks.includes(this.id) && activetasks.includes(this.id)){
            this.assignedMember = member;
            return true;
        }
        else {
            return false;
        }
    }
}

class Member {
    contructor(id, username, fname, lname, email, role, category) {
        this.id = id;
        this.username = username;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.role = role;
        this.category = category;
    }
    addMember() {
        if (this !== null) {
            members.push(this);
            activeMembers.push(this);
            return true;
        } else {
            return false;
        }
    }
    deleteMember(id) {
        if (members.includes(this.id) && activeMembers.includes(this.id)) {
            if (members.includes(this)) {
                activeMembers.splice(members.indexOf(this), 1);
                inactiveMembers.push(this);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    assignRole(id, value) {
        if (members.includes(this.id) && activeMembers.includes(this.id)) {
            if (value != null && role.includes(value)) {
                this.role = value;
                return true;
            }
            else {
                return false;
            }
        } else {
            return false;
        }
    }    

}

//Progress Tracking

function trackProgress(){
    const progress = {
        "not started":0,
        "in progress":0,
        "completed":0,
        "on hold":0,
        "cancelled":0
    };
    tasks.forEach(task => {
        if (progress.hasOwnProperty(task.category)) {
            progress[task.category]++;
        }
    });
     return progress;
}

function getAnalitics() {
    const taskPerMember = {}
    members.forEach(member => {
        const memberTasks = tasks.filter(task => task.assignedMember === member);
        taskPerMember[member.username] = memberTasks.length
    });

    const taskByCategory = trackProgress();

    const taskStatus ={
        active: activetasks.length,
        inactive: inactivetasks.length,
    };

    const memberStatus = {
        active: activeMembers.length,
        inactive: inactiveMembers.length,
    };

    return {
        taskPerMember,
        taskByCategory,
        taskStatus,
        memberStatus
    }
}

const task1 = new Task(1, "Task 1", "Description of Task 1");
task1.createTask();

const member1 = new Member(1, "user1", "John", "Doe", "john@gmail.com", "backend", "not started");
member1.addMember();

task1.assignMember(1, member1);
task1.categorizeTask(1, "completed");


const task2 = new Task(2, "Task 2", "Description of Task 2");
task2.createTask();

const member2 = new Member(2, "user2", "Jane", "Smith", "jane@gmail.com", "frontend", "not started");
member2.addMember();

task2.assignMember(2, member2);
task2.categorizeTask(2, "cancelled");

const task3 = new Task(3, "Task 3", "Description of Task 3");
task3.createTask();

const member3 = new Member(3, "user3", "Mark", "Lee", "mark@gmail.com", "uiux", "not started");
member3.addMember();

task3.assignMember(3, member3);
task3.categorizeTask(3, "on hold");

console.table(trackProgress());
/*
console.table(tasks);
console.table(members);
console.table(activetasks);
console.table(inactivetasks);
*/
console.log(getAnalitics());



