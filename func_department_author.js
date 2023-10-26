////////   ОТДЕЛ - АВТОР ПРОГРАММЫ     ///////////
import { findElementByText } from "./utils";

// function findElementByText(text) {
//     let xpath = `//*[text()='${text}']`;
//     let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//     return matchingElement;
// }

function set_department_author(value) {
    return new Promise((resolve, reject) => {
        const label = 'Отдел - автор программы';
        const elem = findElementByText(label);

        if (!elem) {
            reject('Element with given text not found');
            return;
        }

        const parent = elem.parentElement.parentElement.parentElement;
        const input = parent.querySelector('input');

        if (!input) {
            reject('Input element not found for the given label');
            return;
        }

        const observer1 = new MutationObserver((mutationsList, observer) => {
            for (let mutation of mutationsList) {
                for (let node of mutation.addedNodes) {
                    if (node.classList && node.classList.contains('ant-select-dropdown')) {
                        console.log("Dropdown appeared...");
                        observer.disconnect();
                        proceedWithInputValue();
                        return;
                    }
                }
            }
        });

        observer1.observe(document.body, { childList: true, subtree: true });
        console.log("Clicking the input...");
        input.click();

        function proceedWithInputValue() {
            const observer2 = new MutationObserver((mutationsList, observer) => {
                for (let mutation of mutationsList) {
                    const nodes = Array.from(mutation.target.querySelectorAll('.ant-select-item-option'));
                    for (let node of nodes) {
                        const contentNode = node.querySelector('.ant-select-item-option-content');
                        if (contentNode && contentNode.textContent.trim() === value) {
                            console.log("Option found in the dropdown!");
                            observer.disconnect();
                            node.click();
                            resolve(); // Resolve the promise here
                            return;
                        }
                    }
                }
            });

            observer2.observe(document.body, { subtree: true, childList: true });

            console.log("Inserting value into input...");
            input.value = value;
            input.dispatchEvent(new Event('input'));
        }
    });
}

export default set_department_author;

// departments = ['Отделение по контролю за ионизирующими и неионизирующими источниками излучений Дедовск', 'ООКПиВР Дедовск'];
// set_department_author(departments[0]);

// function set_department_author(value) {
//     const label = 'Отдел - автор программы';
//     const elem = findElementByText(label);

//     if (!elem) {
//         console.error('Element with given text not found');
//         return;
//     }

//     const parent = elem.parentElement.parentElement.parentElement;
//     const input = parent.querySelector('input');

//     if (!input) {
//         console.error('Input element not found for the given label');
//         return;
//     }

//     const observer1 = new MutationObserver((mutationsList, observer) => {
//         for (let mutation of mutationsList) {
//             for (let node of mutation.addedNodes) {
//                 if (node.classList && node.classList.contains('ant-select-dropdown')) {
//                     console.log("Dropdown appeared...");
//                     observer.disconnect();
//                     proceedWithInputValue();
//                     return;
//                 }
//             }
//         }
//     });

//     observer1.observe(document.body, { childList: true, subtree: true });
//     console.log("Clicking the input...");
//     input.click();

//     function proceedWithInputValue() {
//         const observer2 = new MutationObserver((mutationsList, observer) => {
//             for (let mutation of mutationsList) {
//                 const nodes = Array.from(mutation.target.querySelectorAll('.ant-select-item-option'));
//                 for (let node of nodes) {
//                     const contentNode = node.querySelector('.ant-select-item-option-content');
//                     if (contentNode && contentNode.textContent.trim() === value) {
//                         console.log("Option found in the dropdown!");
//                         observer.disconnect();
//                         node.click();
//                         return;
//                     }
//                 }
//             }
//         });

//         observer2.observe(document.body, { subtree: true, childList: true });

//         console.log("Inserting value into input...");
//         input.value = value;
//         input.dispatchEvent(new Event('input'));
//     }
// }