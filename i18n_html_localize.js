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
    function next(){
        // for some reason this returns only the first match
        var iterator = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
        return iterator.iterateNext();
    }

    for (var n = next(); !!n; n = next()) {
        i18nLocalizeNodeText(n);
    }
}

function i18nLocalizeStart(){
    i18nLocalizeXpath("//text()[contains(.,'__MSG_')]");
    i18nLocalizeXpath("//@*[contains(.,'__MSG_')]");
}

i18nLocalizeStart();
