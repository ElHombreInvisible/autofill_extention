//ЦЕЛЬ ИССЛЕДОВАНИЯ 
import { findElementByText } from "./utils";


// function findElementByText(text) {
//     let xpath = `//*[text()='${text}']`;
//     return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
// }
function waitForElement(parent, text) {
    return new Promise((resolve, reject) => {
        const xpath = `//*[text()='${text}']`;
        const element = document.evaluate(xpath, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            resolve(element);
            return;
        }
        const observer = new MutationObserver((mutations, observerInstance) => {
            const element = document.evaluate(xpath, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

            if (element) {
                observerInstance.disconnect();
                resolve(element);
            }
        });
        observer.observe(parent, { childList: true, subtree: true });
        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Element with text ${text} not found within the given time`));
        }, 10000);  // wait for 10 seconds
    });
}
async function clickElementAndAwaitNext(element, nextText) {
    element.click();
    return await waitForElement(document.body, nextText);
}
async function set_research_purpose(textArray) {
    const initialText = 'Цель исследования'
    const initialElement = findElementByText(initialText);
    if (!initialElement) {
        console.error(`Element with text ${initialText} not found`);
        return;
    }
    const parent = initialElement.closest('div');
    const input = parent.querySelector('input');
    input.click();

    let currentParent = document.body;
    for (let i = 0; i < textArray.length - 1; i++) {
        const element = await waitForElement(currentParent, textArray[i]);
        currentParent = await clickElementAndAwaitNext(element, textArray[i + 1]);
    }
    const lastElement = await waitForElement(currentParent, textArray[textArray.length - 1]);
    lastElement.click();
}

export default set_research_purpose ;

// Часть кода для тестирования или запуска в этом модуле
// if (typeof window !== 'undefined') {
//     const sequence = ["Бюджет", "КНД", "Профилактический визит"];
//     set_research_purpose(sequence);
// }



// function findElementByText(text) {
//     let xpath = `//*[text()='${text}']`;
//     let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//     return matchingElement;
// }

// function waitForElement(parent, text) {
//     return new Promise((resolve, reject) => {
//         let xpath = `//*[text()='${text}']`;
//         let element = document.evaluate(xpath, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        
//         if (element) {
//             resolve(element);
//             return;
//         }

//         const observer = new MutationObserver((mutations, observerInstance) => {
//             let element = document.evaluate(xpath, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            
//             if (element) {
//                 observerInstance.disconnect(); // stop observing when the element is found
//                 resolve(element);
//             }
//         });

//         observer.observe(parent, {
//             childList: true, 
//             subtree: true
//         });

//         setTimeout(() => {
//             observer.disconnect();
//             reject(new Error(`Element with text ${text} not found within the given time`));
//         }, 10000); // e.g., wait for 10 seconds
//     });
// }

// async function clickElementAndAwaitNext(element, nextText) {
//     element.click();
//     return await waitForElement(document.body, nextText);
// }

// async function set_research_purpose(textArray) {
//     let currentParent = document.body;

//     for (let i = 0; i < textArray.length - 1; i++) {
//         const element = await waitForElement(currentParent, textArray[i]);
//         currentParent = await clickElementAndAwaitNext(element, textArray[i + 1]);
//     }

//     const lastElement = await waitForElement(currentParent, textArray[textArray.length - 1]);
//     lastElement.click();
// }

// let element = findElementByText('Цель исследования');
// let parent = element.parentNode.parentNode.parentNode;
// let input = parent.querySelector('input');
// input.click();

// // Запускаем последовательность кликов
// let a = ["Бюджет", "КНД", "Профилактический визит"];
// set_research_purpose(a);