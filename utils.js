export function findElementByText(text) {
    let xpath = `//*[text()='${text}']`;
    let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return matchingElement;
}