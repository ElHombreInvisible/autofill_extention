///////////// КОНТРОЛИРУЕМОЕ ЛИЦО /////////////////
//Поиск организации/человека по ИНН
import { findElementByText } from './utils';

// function findElementByText(text) {
//     let xpath = `//*[text()='${text}']`;
//     let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//     return matchingElement;
// }
const set_controlled_person = (inputValue) => {
    return new Promise((resolve, reject) => {
        const parentElement = document.body;
        const triggerButtonClick = () => {
            let element = findElementByText('Контролируемое лицо');
            let parent = element.parentNode.parentNode.parentNode;
            let button = parent.querySelector('button.btn-open-dialog.mat-select-btn-dialog.btn-sm.ng-star-inserted');
            
            if (button) {
                button.click();
            }
        };
        const findTargetInput = () => {
            const labelElement = Array.from(parentElement.querySelectorAll('nz-form-label.filter-label.ant-form-item-label')).find(el => el.textContent.includes('ИНН'));
            if (labelElement) {
                return labelElement.nextElementSibling.querySelector('input[placeholder="ИНН"]');
            }
            return null;
        };
        const selectFilteredResult = () => {
            const overlayContainerObserver = new MutationObserver(mutations => {
                const overlayContainer = document.querySelector('.cdk-overlay-container');
                const radioButton = overlayContainer.querySelector('tr.ant-table-row.ng-star-inserted input[type="radio"]');
                if (radioButton) {
                    radioButton.click();
                    const selectButton = overlayContainer.querySelector('button.ant-btn.ant-btn-primary.ng-star-inserted');
                    if (selectButton) {
                        selectButton.click();
                        overlayContainerObserver.disconnect();
                    }
                }
            });
            const overlayContainer = document.querySelector('.cdk-overlay-container');
            if (overlayContainer) {
                overlayContainerObserver.observe(overlayContainer, { childList: true, subtree: true });
            }
        };
        const observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
                if (mutation.type === 'childList') {
                    const targetInput = findTargetInput();
                    if (targetInput) {
                        console.log('Целевой элемент найден!');
                        targetInput.value = inputValue;
                        targetInput.dispatchEvent(new Event('input', { 'bubbles': true }));
                        observer.disconnect();
                        selectFilteredResult();
                        resolve();  // Завершение промиса успешно
                        break;
                    }
                }
            }
        });
        const config = { childList: true, subtree: true };
        observer.observe(parentElement, config);
        triggerButtonClick();
    });
};

export default set_controlled_person;

// set_controlled_person("5032034080").then(() => {
//     console.log("Успешно выполнено!");
// }).catch(error => {
//     console.error("Произошла ошибка:", error);
// });

// function findElementByText(text) {
//     let xpath = `//*[text()='${text}']`;
//     let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//     return matchingElement;
// }

// const set_controlled_person = (inputValue) => {
//     const parentElement = document.body;
//     const triggerButtonClick = () => {
//         let element = findElementByText('Контролируемое лицо');
//         let parent = element.parentNode.parentNode.parentNode;
//         let button = parent.querySelector('button.btn-open-dialog.mat-select-btn-dialog.btn-sm.ng-star-inserted');
        
//         if (button) {
//             button.click();
//         }
//     };

//     const findTargetInput = () => {
//         const labelElement = Array.from(parentElement.querySelectorAll('nz-form-label.filter-label.ant-form-item-label')).find(el => el.textContent.includes('ИНН'));
//         if (labelElement) {
//             return labelElement.nextElementSibling.querySelector('input[placeholder="ИНН"]');
//         }
//         return null;
//     };

//     const selectFilteredResult = () => {
//         const overlayContainerObserver = new MutationObserver(mutations => {
//             const overlayContainer = document.querySelector('.cdk-overlay-container');
//             const radioButton = overlayContainer.querySelector('tr.ant-table-row.ng-star-inserted input[type="radio"]');
//             if (radioButton) {
//                 radioButton.click();
//                 const selectButton = overlayContainer.querySelector('button.ant-btn.ant-btn-primary.ng-star-inserted');
//                 if (selectButton) {
//                     selectButton.click();
//                     overlayContainerObserver.disconnect();
//                 }
//             }
//         });

//         const overlayContainer = document.querySelector('.cdk-overlay-container');
//         if (overlayContainer) {
//             overlayContainerObserver.observe(overlayContainer, { childList: true, subtree: true });
//         }
//     };

//     const observer = new MutationObserver(mutations => {
//         for (let mutation of mutations) {
//             if (mutation.type === 'childList') {
//                 const targetInput = findTargetInput();
//                 if (targetInput) {
//                     console.log('Целевой элемент найден!');
//                     targetInput.value = inputValue;
//                     targetInput.dispatchEvent(new Event('input', { 'bubbles': true }));
//                     observer.disconnect();
//                     selectFilteredResult();
//                     break;
//                 }
//             }
//         }
//     });

//     const config = { childList: true, subtree: true };
//     observer.observe(parentElement, config);

//     triggerButtonClick();
// };

// set_controlled_person("5032034080");


