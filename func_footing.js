///////////////////// ОСНОВАНИЕ /////////////////////
import { findElementByText } from "./utils";

// function findElementByText(text) {
//     let xpath = `//*[text()='${text}']`;
//     return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
// }

function createObserver(target, callback) {
    const observer = new MutationObserver(callback);
    observer.observe(target, { childList: true, subtree: true });
    return observer;
}

function set_footing(value) {
    return new Promise((resolve, reject) => {
        const elem = findElementByText('Основание');
        if (!elem) {
            console.error('Label not found');
            reject('Label not found');
            return;
        }

        const input = elem.closest('div').querySelector('input');
        if (!input) {
            console.error('Input not found');
            reject('Input not found');
            return;
        }

        const dropdownObserver = createObserver(document.body, (mutationsList, observer) => {
            for (let mutation of mutationsList) {
                if (Array.from(mutation.addedNodes).some(node => node.classList && node.classList.contains('ant-select-dropdown'))) {
                    console.log("Dropdown appeared...");
                    observer.disconnect();
                    proceedWithInputValue();
                    break;
                }
            }
        });

        input.click();

        function proceedWithInputValue() {
            const optionObserver = createObserver(document.body, (mutationsList, observer) => {
                for (let mutation of mutationsList) {
                    const nodes = Array.from(mutation.target.querySelectorAll('.ant-select-item-option'));
                    const targetNode = nodes.find(node => node.textContent.trim() === value);
                    if (targetNode) {
                        console.log("Option found in the dropdown!");
                        observer.disconnect();
                        targetNode.click();
                        resolve();
                        break;
                    }
                }
            });

            console.log("Inserting value into input...");
            input.value = value;
            input.dispatchEvent(new Event('input'));
        }
    });
}

export default set_footing ;

// const footings = ['Заявка', 'Приказ РПН'];
// set_footing(footings[0]).then(() => {
//     console.log('Success!');
// }).catch((error) => {
//     console.error(error);
// });




// function createObserver(target, callback) {
//     const observer = new MutationObserver(callback);
//     observer.observe(target, { childList: true, subtree: true });
//     return observer;
// }


// function set_footing(value) {
//     const elem = findElementByText('Основание');
//     if (!elem) {
//         console.error('Label not found');
//         return;
//     }

//     const input = elem.closest('div').querySelector('input');
//     if (!input) {
//         console.error('Input not found');
//         return;
//     }

//     function proceedWithInputValue() {
//         const optionObserver = createObserver(document.body, (mutationsList, observer) => {
//             for (let mutation of mutationsList) {
//                 const nodes = Array.from(mutation.target.querySelectorAll('.ant-select-item-option'));
//                 const targetNode = nodes.find(node => node.textContent.trim() === value);
//                 if (targetNode) {
//                     console.log("Option found in the dropdown!");
//                     observer.disconnect();
//                     targetNode.click();
//                     break;
//                 }
//             }
//         });

//         console.log("Inserting value into input...");
//         input.value = value;
//         input.dispatchEvent(new Event('input'));
//     }
//     // First observer: Detect dropdown appearance
//     const dropdownObserver = createObserver(document.body, (mutationsList, observer) => {
//         for (let mutation of mutationsList) {
//             if (Array.from(mutation.addedNodes).some(node => node.classList && node.classList.contains('ant-select-dropdown'))) {
//                 console.log("Dropdown appeared...");
//                 observer.disconnect();
//                 proceedWithInputValue();
//                 break;
//             }
//         }
//     });

//     input.click();

//     // Second part: Enter value and select from dropdown
    
// }

// export {set_footing};

// const footings = ['Заявка', 'Приказ РПН'];
// set_footing(footings[0]);



// function findElementByText(text) {
//     let xpath = `//*[text()='${text}']`;
//     let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//     return matchingElement;
// }

// function set_footing(value) {
//     const label = 'Основание';
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

// footings = ['Заявка', 'Приказ РПН'];
// set_footing(footings[0]);