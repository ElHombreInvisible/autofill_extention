// document.addEventListener('DOMContentLoaded', function() {
//     let div = document.createElement('div');
//     div.innerHTML = '<p>Это мой HTML код!</p>';
//     document.body.appendChild(div);
// });
const clock = document.createElement('div')
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
        console.log(globalFileContent);
        kwargs = JSON.parse(globalFileContent)
        const table = document.getElementsByClassName('table_extension')[0]
        // console.log(Object.keys(kwargs))
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
clock.classList.add('clock_extension')
button.classList.add('button_extension')
setInterval(updateClock, 1000);
updateClock()
document.body.append(clock)
// document.body.append(button)
document.body.append(file)
function updateClock(){
    const date = new Date()
    const time = new Intl.DateTimeFormat('ru-Ru', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }).format(date)
    clock.innerText = time
    // console.log(date, time)
}
// document.getElementById('select_file_button').addEventListener('click', function() {
//     document.getElementById('fileInput').click();
// }); 

// file.addEventListener('change', function(event) {
//     const selectedFile = event.target.files[0];
//     console.log(selectedFile.name)
//     // Дальше вы можете обработать файл как вам нужно.
//     // Например, прочитать его содержимое:
//     const reader = new FileReader();
//     reader.onload = function(fileEvent) {
//         const fileContent = fileEvent.target.result;
//         // Теперь у вас есть содержимое файла и вы можете с ним работать
//         console.log(fileContent);
//     };
//     reader.readAsText(selectedFile);
// });
