fetch('settings.json')
    .then(response => response.json())
    .then(  data => {
        const dropdown = document.getElementById('settingsDropdown');
        const presets = data['presets']
        for (let setting_key in presets) {
        value = presets[setting_key]['name']
        const option = document.createElement('option');
        option.value = setting_key;
        option.textContent = value;
        dropdown.appendChild(option);
        }
        chrome.storage.local.set({'EIAS_DATA': presets})
    });


// document.getElementById('settingsDropdown').addEventListener('change', (event) => {
//     const selectedValue = event.target.value;
//     chrome.storage.local.get(['EIAS_DATA'], function(result) {
//         const setting = result['EIAS_DATA'][selectedValue];
//         console.log('settings to store',setting)
//         chrome.storage.local.set({'EIAS_SETTINGS': setting})
//         // console.log(setting, selectedValue);
//     });
// });

document.getElementById('settingsDropdown').addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    chrome.storage.local.get(['EIAS_DATA'], function(result) {
        const setting = result['EIAS_DATA'][selectedValue];
        const currentSettingElement = document.getElementById('currentSettingValue');
        // if (selectedValue) {
        //     currentSettingElement.textContent = setting.name; // Или какое-либо другое свойство из settingFromStorage
        // } else {
        //     currentSettingElement.textContent = 'Не выбрано';
        // }
        console.log('settings to store',setting)
        chrome.storage.local.set({'EIAS_SETTINGS': setting}, function() {
            sendMessageToContentScript(setting);
        });
    });
});

function sendMessageToContentScript(data) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
            action: "insertData",
            data: data
        });
    });
}

chrome.storage.local.get(['EIAS_SETTINGS'], function(result) {
    if (chrome.runtime.lastError) {
        console.error("Ошибка при чтении из хранилища:", chrome.runtime.lastError);
        return;
    }
    const settingFromStorage = result.EIAS_SETTINGS;
    console.log('settings from storage',settingFromStorage);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
            action: "insertData",
            data: settingFromStorage
        });
    });
});


// function fetchDataAndSendToTab() {
//     chrome.storage.local.get(['EIAS_SETTINGS'], function(result) {
//         if (chrome.runtime.lastError) {
//             console.error("Ошибка при чтении из хранилища:", chrome.runtime.lastError);
//             return;
//         }
//         const settingFromStorage = result.EIAS_SETTINGS;
//         console.log('settings from storage', settingFromStorage);
//         chrome.tabs.sendMessage(null, {
//             action: "insertData",
//             data: settingFromStorage
//         });
//     });
// }

//DEBUG
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "desiredAction", data: 'someData'});
});