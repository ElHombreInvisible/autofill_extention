////////  ЗАЯВИТЕЛЬ /////////
import { findElementByText } from "./utils";

const set_applicant_promised = (searchText) => {
    return new Promise((resolve, reject) => {
        function findElementByText(text) {
            let xpath = `//*[text()='${text}']`;
            let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return matchingElement;
        }
        const set_applicant = (searchText) => {
            let element = findElementByText('Заявитель');
            let parent = element.parentNode.parentNode.parentNode;
            let button = parent.querySelector('button.btn-open-dialog.mat-select-btn-dialog.btn-sm.ng-star-inserted');
            let firstObserver = new MutationObserver((mutations) => {
                for (let mutation of mutations) {
                    if (mutation.addedNodes.length) {
                        console.log("Modal has been opened after clicking the button.");
                        firstObserver.disconnect();
                        initiateSecondObserver(searchText);
                        break;
                    }
                }
            });
            firstObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
            if (button) {
                button.click();
            }
        };
        const initiateRadioButtonObserver = (targetText) => {
            let radioButtonObserver = new MutationObserver((mutations) => {
                for (let mutation of mutations) {
                    if (mutation.addedNodes.length) {
                        let targetCells = Array.from(document.querySelectorAll('td.ant-table-cell.ng-star-inserted')).filter(cell => cell.textContent.trim() === targetText);
                        if (targetCells.length) {
                            let targetCell = targetCells[0];
                            let radioButton = targetCell.parentElement.querySelector('input[type="radio"]');
                            if (radioButton) {
                                radioButtonObserver.disconnect();
                                radioButton.click();
                                let selectButton = document.querySelector('button.ant-btn-primary.ng-star-inserted');
                                if (selectButton) {
                                    selectButton.click();
                                    resolve();  // Завершаем промис при успешном клике на кнопку
                                } else {
                                    console.log("Couldn't find the 'Выбрать' button.");
                                    reject("Couldn't find the 'Выбрать' button.");  // Завершаем промис с ошибкой, если кнопка не найдена
                                }
                                break;
                            }
                        }
                    }
                }
            });
            radioButtonObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        };
        const initiateInputObserver = (searchText) => {
            let text = searchText;
            let inputObserver = new MutationObserver((mutations) => {
                for (let mutation of mutations) {
                    if (mutation.addedNodes.length) {
                        let label = findElementByText('Поиск организации');
                        if (label) {
                            let inputForm = label.parentElement.parentElement.parentElement;
                            let inputField = inputForm.querySelector('input[placeholder="Поиск организации"]');
                            if (inputField) {
                                inputObserver.disconnect();
                                console.log("'Поиск организации' input field is now available.");
                                enterTextAndTriggerEvent(inputField, text);
                                break;
                            }
                        }
                    }
                }
            });
            inputObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        };
        const initiateThirdObserver = (searchText) => {
            let observer = new MutationObserver((mutations) => {
                for (let mutation of mutations) {
                    if (mutation.addedNodes.length) {
                        let targetItem = findElementByText('Подразделение РПН');
                        if (targetItem) {
                            observer.disconnect();
                            targetItem.click();
                            initiateInputObserver(searchText);
                            break; 
                        }
                    }
                }
            });
        
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        };
        
        const initiateSecondObserver = (searchText) => {
            let label = findElementByText('Правовая форма');
            let form = label.parentElement.parentElement.parentElement;
            let a = form.querySelector('nz-select-item');
            if (a) {
                a.click();
                initiateThirdObserver(searchText);
            }
        };
        const enterTextAndTriggerEvent = (input, text) => {
            input.value = text;
            let event = new Event('input', { 'bubbles': true, 'cancelable': true });
            initiateRadioButtonObserver(text);
            input.dispatchEvent(event);
        };
    set_applicant(searchText);
    });
};

export default set_applicant_promised;

// let searchText = 'Лобненский территориальный отдел Управления Федеральной службы по надзору в сфере защиты прав потребителей и благополучия человека по Московской области';
// set_applicant_promised(searchText)
//     .then(() => {
//         console.log("Действие успешно выполнено!");
//     })
//     .catch(error => {
//         console.error("Произошла ошибка:", error);
//     });



    // function findElementByText(text) {
    //     let xpath = `//*[text()='${text}']`;
    //     let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    //     return matchingElement;
    // }
    
    // const enterTextAndTriggerEvent = (input, text) => {
    //     const initiateRadioButtonObserver = (targetText) => {
    //         let radioButtonObserver = new MutationObserver((mutations) => {
    //             for (let mutation of mutations) {
    //                 if (mutation.addedNodes.length) {
    //                     let targetCells = Array.from(document.querySelectorAll('td.ant-table-cell.ng-star-inserted')).filter(cell => cell.textContent.trim() === targetText);
    //                     if (targetCells.length) {
    //                         let targetCell = targetCells[0]; 
    //                         let radioButton = targetCell.parentElement.querySelector('input[type="radio"]');
    //                         if (radioButton) {
    //                             radioButtonObserver.disconnect();
    //                             radioButton.click();
    //                             let selectButton = document.querySelector('button.ant-btn-primary.ng-star-inserted');
    //                             if (selectButton) {
    //                                 selectButton.click();
    //                             } else {
    //                                 console.log("Couldn't find the 'Выбрать' button.");
    //                             }
    //                             break;
    //                         }
    //                     }
    //                 }
    //             }
    //         });
    
    //         radioButtonObserver.observe(document.body, {
    //             childList: true,
    //             subtree: true
    //         });
    //     };
        
    //     input.value = text;
    //     let event = new Event('input', { 'bubbles': true, 'cancelable': true });
    //     initiateRadioButtonObserver(text);
    //     input.dispatchEvent(event);
    // };
    
    // const initiateInputObserver = (searchText) => {
    //     let text = searchText;
    //     let inputObserver = new MutationObserver((mutations) => {
    //         for (let mutation of mutations) {
    //             if (mutation.addedNodes.length) {
    //                 let label = findElementByText('Поиск организации');
    //                 if (label) {
    //                     let inputForm = label.parentElement.parentElement.parentElement;
    //                     let inputField = inputForm.querySelector('input[placeholder="Поиск организации"]');
    //                     if (inputField) {
    //                         inputObserver.disconnect();
    //                         console.log("'Поиск организации' input field is now available.");
    //                         enterTextAndTriggerEvent(inputField, text);
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //     });
    
    //     inputObserver.observe(document.body, {
    //         childList: true,
    //         subtree: true
    //     });
    // };
    
    // const initiateThirdObserver = (searchText) => {
    //     let observer = new MutationObserver((mutations) => {
    //         for (let mutation of mutations) {
    //             if (mutation.addedNodes.length) {
    //                 let targetItem = findElementByText('Подразделение РПН');
    //                 if (targetItem) {
    //                     observer.disconnect();
    //                     targetItem.click();
    //                     initiateInputObserver(searchText);
    //                     break; 
    //                 }
    //             }
    //         }
    //     });
    
    //     observer.observe(document.body, {
    //         childList: true,
    //         subtree: true
    //     });
    // };
    
    // const initiateSecondObserver = (searchText) => {
    //     let label = findElementByText('Правовая форма');
    //     let form = label.parentElement.parentElement.parentElement;
    //     let a = form.querySelector('nz-select-item');
        
    //     if (a) {
    //         a.click();
    //         initiateThirdObserver(searchText);
    //     }
    // };
    
    // const set_applicant = (searchText) => {
    //     let element = findElementByText('Заявитель');
    //     let parent = element.parentNode.parentNode.parentNode;
    //     let button = parent.querySelector('button.btn-open-dialog.mat-select-btn-dialog.btn-sm.ng-star-inserted');
    
    //     let firstObserver = new MutationObserver((mutations) => {
    //         for (let mutation of mutations) {
    //             if (mutation.addedNodes.length) {
    //                 console.log("Modal has been opened after clicking the button.");
    //                 firstObserver.disconnect();
    //                 initiateSecondObserver(searchText);
    //                 break;
    //             }
    //         }
    //     });
    
    //     firstObserver.observe(document.body, {
    //         childList: true,
    //         subtree: true
    //     });
    
    //     if (button) {
    //         button.click();
    //     }
    // };
    
    // let searchText = 'Лобненский территориальный отдел Управления Федеральной службы по надзору в сфере защиты прав потребителей и благополучия человека по Московской области';
    // set_applicant(searchText);
    
    