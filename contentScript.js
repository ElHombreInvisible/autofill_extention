let DEBUG = true
let current_preset = {}
const pathToFile = chrome.runtime.getURL('settings.json');
console.log(pathToFile)
fetch(chrome.runtime.getURL('settings.json'))
    .then(response => response.json())
    .then(  data => {
        var debug = data['DEBUG']
        console.log('DEBUG=', DEBUG)
        DEBUG = debug
        console.log('DEBUG=', DEBUG)
    });
const button = document.createElement('button')
const file = document.createElement('input')
const table = document.createElement('table')
table.classList.add('table_extension')
document.body.append(table)
button.id = 'select_file_button'
button.addEventListener('click', function() {
    // alert('Кнопка была нажата!');
    document.getElementById('fileInput').click();
});
let globalFileContent; 
file.addEventListener('change', function(event) {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(fileEvent) {
        const fileContent = fileEvent.target.result;
        globalFileContent = fileContent;
        console.log('check global variable',globalFileContent);
        kwargs = JSON.parse(globalFileContent)
        const table = document.getElementsByClassName('table_extension')[0]
        while(table.rows.length > 0) {  // Если у вас есть строка заголовков, иначе используйте > 0
            table.deleteRow(0);  // Удаляем вторую строку (индекс 1), пока не очистим всю таблицу
        }
        for (let key in kwargs) {
        let newRow = table.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        cell1.textContent = key;
        cell2.textContent = kwargs[key];
        }
    };
    reader.readAsText(selectedFile);
});
file.type = 'file'
file.id = 'fileInput'
file.classList.add('file_extension')
button.textContent = 'Выбрать файл'
button.classList.add('button_extension')
document.body.append(file)

function insertDataToPage(data) {
    let container = document.getElementById('debug_containter_id');
    if (!container){
        container = document.createElement('div');
        container.id = 'debug_containter_id'
        container.className = 'debug-container';
        container.classList.add('debug-container')
        document.body.appendChild(container);
    }
    let debug_table = document.getElementById('debug_table_id');
    if (debug_table && debug_table.rows.length > 0){
        while(debug_table.rows.length > 0) {
        debug_table.deleteRow(0);
    }}
    if (!debug_table) {
        debug_table = document.createElement('table');
        debug_table.classList.add('debug_table');
        debug_table.id = 'debug_table_id';
        container.appendChild(debug_table);
        // document.body.appendChild(debug_table);
    }
    console.log('data=',data)
    for (let key in data) {
        let newRow = debug_table.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        cell1.textContent = key;
        cell2.textContent = data[key];
        }
    let debug_table_button = document.getElementById('debug_button_id');
    if (!debug_table_button){
        debug_table_button = document.createElement('button')
        debug_table_button.classList.add('debug-arrow-button')
        debug_table_button.id = 'debug_button_id'
        debug_table_button.classList.add('debug-arrow-down')
        container.appendChild(debug_table_button);
        // document.body.appendChild(debug_table_button);
        debug_table_button.addEventListener('click', function() {
            if (debug_table.style.display === "none") {
                debug_table.style.display = "table";
                debug_table_button.classList.remove('debug-arrow-up');
                debug_table_button.classList.add('debug-arrow-down');
            } else {
                debug_table.style.display = "none";
                debug_table_button.classList.remove('debug-arrow-down');
                debug_table_button.classList.add('debug-arrow-up');
            }});
    }
}

// сообщения от popup скрипта
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "insertData") {
        console.log('settings from storage on main page',request.data)
        if (DEBUG) {insertDataToPage(request.data);}
    }
});

// chrome.storage.onChanged.addListener(function(changes, namespace) {
//     for (let key in changes) {
//         if (key === 'EIAS_SETTINGS') {
//             fetchDataAndSendToTab();
//         }
//     }
// });

//DEBUG
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "desiredAction") {
        // Обработка сообщения здесь
        console.log('ergerwgwergerg')
    }
});