function i18nLocalizeNodeText(node){
    node.textContent = i18nLocalizeString(node.textContent);
}

function i18nLocalizeString(string){
    return string.replace(/__MSG_(\w+)__/g,
        function(match, messageName){
            return i18nLocalizeMessage(messageName);
        }
    );
}

function i18nLocalizeMessage(key){
    return chrome.i18n.getMessage(key);
}

function i18nLocalizeXpath(xpath){
    var iterator = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );

    try {
        var thisNode = iterator.iterateNext();

        while (thisNode) {
            i18nLocalizeNodeText(thisNode);
            thisNode = iterator.iterateNext();
        }
    }
    catch (e) {
        console.log( 'Error: Document tree modified during iteration ' + e );
    }
}

function i18nLocalizeStart(){
    i18nLocalizeXpath("//text()[contains(.,'__MSG_')]");
    i18nLocalizeXpath("//@*[contains(.,'__MSG_')]");
}

i18nLocalizeStart();
