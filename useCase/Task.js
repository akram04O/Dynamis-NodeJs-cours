const date = new Date();
const tasks = [];
const activetasks = [];
const inactivetasks = [];
const category = ["not started", "in progress", "completed", "on hold", "cancelled"];
const members = [];
const activeMembers = [];
const inactiveMembers = [];
const role = ["backend", "frontend", "uiux", "mobile"];

// ---------------- Task Class ----------------
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

    // Add task to database
    createTask() {
        if (this !== null) {
            tasks.push(this);
            activetasks.push(this); // mark as active by default
            return true;
        }
        return false;
    }

    // Delete task (move to inactive)
    deleteTask() {
        if (tasks.includes(this) && activetasks.includes(this)) {
            const index = activetasks.indexOf(this);
            activetasks.splice(index, 1);
            inactivetasks.push(this);
            return true;
        }
        return false;
    }

    // Update task property
    updateTask(prop, value) {
        if (tasks.includes(this) && activetasks.includes(this)) {
            switch(prop) {
                case "title": this.title = value; break;
                case "description": this.description = value; break;
                case "start_date": this.start_date = value; break;
                case "end_date": this.end_date = value; break;
                case "category": this.category = value; break;
                case "assignedMember": this.assignedMember = value; break;
                default: return false;
            }
            return true;
        }
        return false;
    }

    // Categorize task
    categorizeTask(value) {
        if (category.includes(value) && tasks.includes(this) && !inactivetasks.includes(this)) {
            this.category = value;
            return true;
        }
        return false;
    }

    // Assign member
    assignMember(member) {
        if (tasks.includes(this) && activetasks.includes(this)) {
            this.assignedMember = member;
            return true;
        }
        return false;
    }
}

// ---------------- Member Class ----------------
class Member {
    constructor(id, username, fname, lname, email, role, category) {
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
        }
        return false;
    }

    deleteMember() {
        if (members.includes(this) && activeMembers.includes(this)) {
            const index = activeMembers.indexOf(this);
            activeMembers.splice(index, 1);
            inactiveMembers.push(this);
            return true;
        }
        return false;
    }

    assignRole(value) {
        if (members.includes(this) && activeMembers.includes(this) && role.includes(value)) {
            this.role = value;
            return true;
        }
        return false;
    }
}

// ---------------- Progress Tracking ----------------
function trackProgress() {
    const progress = {
        "not started": 0,
        "in progress": 0,
        "completed": 0,
        "on hold": 0,
        "cancelled": 0
    };
    tasks.forEach(task => {
        if (progress.hasOwnProperty(task.category)) {
            progress[task.category]++;
        }
    });
    return progress;
}

// ---------------- Analytics ----------------
function generateAnalytics() {
    // Tasks per member
    const tasksPerMember = {};
    members.forEach(member => {
        const memberTasks = tasks.filter(task => task.assignedMember === member);
        tasksPerMember[member.username] = memberTasks.length;
    });

    // Tasks by category
    const tasksByCategory = trackProgress();

    // Active vs inactive tasks
    const taskStatus = {
        active: activetasks.length,
        inactive: inactivetasks.length
    };

    // Active vs inactive members
    const memberStatus = {
        active: activeMembers.length,
        inactive: inactiveMembers.length
    };

    return {
        tasksPerMember,
        tasksByCategory,
        taskStatus,
        memberStatus
    };
}

// ---------------- Simulated Data Persistence ----------------
function saveTasks() {
    return JSON.stringify(tasks, (key, value) => {
        // replace member object with member id for saving
        if (key === "assignedMember" && value) return value.id;
        return value;
    });
}

function loadTasks(jsonString) {
    const loadedTasks = JSON.parse(jsonString);
    tasks.length = 0;
    activetasks.length = 0;
    inactivetasks.length = 0;

    loadedTasks.forEach(obj => {
        const member = members.find(m => m.id === obj.assignedMember) || null;
        const task = new Task(obj.id, obj.title, obj.description, obj.start_date, obj.end_date, obj.category, member);
        tasks.push(task);
        if (obj.category !== "cancelled") activetasks.push(task);
        else inactivetasks.push(task);
    });
}

function saveMembers() {
    return JSON.stringify(members);
}

function loadMembers(jsonString) {
    const loadedMembers = JSON.parse(jsonString);
    members.length = 0;
    activeMembers.length = 0;
    inactiveMembers.length = 0;

    loadedMembers.forEach(obj => {
        const member = new Member(obj.id, obj.username, obj.fname, obj.lname, obj.email, obj.role, obj.category);
        members.push(member);
        activeMembers.push(member);
    });
}

// ---------------- Example Usage ----------------

// Create members
const member1 = new Member(1, "user1", "John", "Doe", "john@gmail.com", "backend", "not started");
member1.addMember();
const member2 = new Member(2, "user2", "Jane", "Smith", "jane@gmail.com", "frontend", "not started");
member2.addMember();
const member3 = new Member(3, "user3", "Mark", "Lee", "mark@gmail.com", "uiux", "not started");
member3.addMember();

// Create tasks
const task1 = new Task(1, "Task 1", "Description 1");
task1.createTask();
task1.assignMember(member1);
task1.categorizeTask("completed");

const task2 = new Task(2, "Task 2", "Description 2");
task2.createTask();
task2.assignMember(member2);
task2.categorizeTask("in progress");

const task3 = new Task(3, "Task 3", "Description 3");
task3.createTask();
task3.assignMember(member3);
task3.categorizeTask("on hold");

// ---------------- Test Analytics ----------------
console.log(generateAnalytics());

// ---------------- Test Persistence ----------------
const savedTasks = saveTasks();
const savedMembers = saveMembers();

// Clear arrays
tasks.length = 0;
activetasks.length = 0;
members.length = 0;
activeMembers.length = 0;

// Load back
loadMembers(savedMembers);
loadTasks(savedTasks);

console.log("After loading:", generateAnalytics());
