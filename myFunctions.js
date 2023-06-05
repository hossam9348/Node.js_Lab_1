const fs = require("fs");
const { json } = require("stream/consumers");

let filePath = "./db.json"

async function createFileIfNotExist() {
    if (await !existsAsySync(filePath)) {
        await writeFileAsySync(filePath, JSON.stringify([]));
    }
}

function readFileAsySync(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, file) => {
            if(!err){
                resolve(file);
            }else{
                reject(err);
            }
        })
    })
}
function writeFileAsySync(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if(!err){
                resolve(true);
            }else{
                reject(err);
            }
        })
    })
}

function existsAsySync(filePath) {
    return new Promise((resolve, reject) => {
        fs.exists(filePath, (status) => {
           resolve(status);
        })
    })
}

createFileIfNotExist();

function prepareData(data) {
    const preparedData = data.reduce((prev, elm) => {
        const [Key, value] = elm.split("=");
        prev[Key] = value;
        return prev;
    }, {})
    return preparedData;
}

async function add(data) {
    if (data.title && data.body) {
        const todos = JSON.parse(await readFileAsySync(filePath));
        var id = 0;
        if (todos.length == 0) {
            id = 1;
        } else {
            id = (todos[todos.length - 1].id) + 1;
        }
        const todo = {
            id: id,
            title: data.title,
            body: data.body,
            checked: false,
        }
        todos.push(todo);
         writeFileAsySync(filePath, JSON.stringify(todos));
    } else {
        console.log("not available options");
    }
}

async function edit(data) {
    if (data.title && data.body && data.id) {
        const todos = JSON.parse(await readFileAsySync(filePath));
        var todo = todos.filter((elem) => {
            if (elem.id == data.id) {
                elem.title = data.title;
                elem.body = data.body;
                return true;
            }
        })[0];
        writeFileAsySync(filePath, JSON.stringify(todos));
    } else {
        console.log("not available options");
    }
}

async function list(data) {
    if (data.status) {
        if (data.status == "checked") {
            const todos = JSON.parse(await readFileAsySync(filePath));
            var checkedTodos = todos.filter((elem) => {
                if (elem.checked == true) {
                    return true;
                }
            });
            console.log(checkedTodos);
        }
        else if (data.status == "unchecked") {
            const todos = JSON.parse(await readFileAsySync(filePath));
            var uncheckedTodos = todos.filter((elem) => {
                if (elem.checked == false) {
                    return true;
                }
            });
            console.log(uncheckedTodos);
        } else if (data.status == "all") {
            const todos = JSON.parse(await readFileAsySync(filePath));
            console.log(todos);
        }
    } else {
        console.log("not available options");
    }
}

async function remove(data) {
    if (data.id) {
        const todos = JSON.parse(await readFileAsySync(filePath));
        var todosAfterDelete = todos.filter((elem) => {
            if (elem.id != data.id) {
                return true;
            }
        });
        writeFileAsySync(filePath, JSON.stringify(todosAfterDelete));
    } else {
        console.log("not available options");
    }
}

async function check(data) {
    if (data.id) {
        const todos = JSON.parse(await readFileAsySync(filePath));
        var todo = todos.filter((elem) => {
            if (elem.id == data.id) {
                elem.checked = true;
                return true;
            }
        })[0];
        writeFileAsySync(filePath, JSON.stringify(todos));
    } else {
        console.log("not available options");
    }
}

async function uncheck(data) {
    if (data.id) {
        const todos = JSON.parse(await readFileAsySync(filePath));
        var todo = todos.filter((elem) => {
            if (elem.id == data.id) {
                elem.checked = false;
                return true;
            }
        })[0];
        writeFileAsySync(filePath, JSON.stringify(todos));
    } else {
        console.log("not available options");
    }
}

module.exports = { add, edit, list, remove, check, uncheck, prepareData };
