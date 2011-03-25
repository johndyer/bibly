

// adapted from old scripturizer.js code

var bibly = (window.bibly) ? window.bibly : {};
bibly.version = '0.3.1';
bibly.max_nodes =  500;
bibly.className = 'bibly_reference';

(function() {

	// book names list	
    var 
		bok = bible.genNames(),
		ver =  '(\\d+)(:(\\d+))?(\\s?[-–&]\\s?(\\d+))?',  // 1 OR 1:1 OR 1:1-2
		ver2 =  '(\\d+):(\\d+)(\\s?[-–&]\\s?(\\d+))?',  // NOT 1 OR 1:1 OR 1:1-2 (this is needed so verses after semi-colons require a :. Problem John 3:16; 2 Cor 3:3 <-- the 2 will be a verse)
		regexPattern = '\\b('+bok+')\.?\\s+('+ver+'((\\s?,\\s?'+ver+')|(\\s?;\\s?'+ver2+'))*)\\b',
		referenceRegex = new RegExp(regexPattern, 'm'),
		verseRegex = new RegExp(ver, 'm'),
		skipRegex = /^(a|script|style|textarea)$/i,
		lastReference = null,
		textHandler = function(node) {
			var match = referenceRegex.exec(node.data), 
				val, 
				referenceNode, 
				afterReferenceNode,
				newLink,
				refText,
				shortenedRef;
			
			if (match) {
				val = match[0];
				// see https://developer.mozilla.org/en/DOM/text.splitText
				// split into three parts [node=before][referenceNode][afterReferenceNode]
				referenceNode = node.splitText(match.index);
				afterReferenceNode = referenceNode.splitText(val.length);
				
				// send the matched text down the 
				newLink = createLinksFromNode(node, referenceNode);
				
				return newLink;
			} else {
				return node;
			}
		},
		createLinksFromNode = function(node, referenceNode) {
			// split up match by ; and , characters and make a unique link for each
			var 
				newLink,
				shortenedRef,
				commaIndex = referenceNode.textContent.indexOf(','),
				semiColonIndex = referenceNode.textContent.indexOf(';'),
				separatorIndex = (commaIndex > 0 && semiColonIndex > 0) ? Math.min(commaIndex, semiColonIndex) : Math.max(commaIndex, semiColonIndex),
				separator,
				remainder,
				reference,
				startRemainder;
			
			// if there is a separator ,; then split up into three parts [node][separator][after]
			if (separatorIndex > 0) {
				separator = referenceNode.splitText(separatorIndex);
				
				startRemainder = 1;
				while(startRemainder < separator.textContent.length && separator.textContent.substring(startRemainder,startRemainder+1) == ' ')
					startRemainder++;
				
				remainder = separator.splitText(startRemainder);
			}	
			
			// replace the referenceNode TEXT with an anchor node
			newLink = node.ownerDocument.createElement('A');				
			node.parentNode.replaceChild(newLink, referenceNode);			
			refText = referenceNode.textContent;	
			reference = parseRefText(refText);
			newLink.setAttribute('href', reference.toShortUrl());
			newLink.setAttribute('title', 'Read ' + reference.toString());				
			newLink.setAttribute('class', bibly.className);
			newLink.appendChild(referenceNode);
			
			// if there was a separator, now parse the stuff after it
			if (remainder) {				
				newLink = createLinksFromNode(node, remainder);				
			}	
			
			return newLink;
		},
		parseRefText = function(refText) {
			
			var 
				text = refText,
				reference = new bible.Reference(text),
				match = null;
			
			if (reference != null && typeof reference.isValid != 'undefined' && reference.isValid()) {
				lastReference = reference;
				return reference;
			} else {
				
				// single verse match (3)
				match = verseRegex.exec(refText);				
				if (match) {				
					
					if (
						// single verse (1)
						typeof match[1] != 'undefined' && 
						typeof match[3] == 'undefined' && 
						typeof match[5] == 'undefined') {
											
						lastReference.verse1 = parseInt(match[1],10);
						lastReference.chapter2 = -1;
						lastReference.verse2 = -1;
					
					} else if (
						// 1:2
						typeof match[1] != 'undefined' && 
						typeof match[3] != 'undefined' && 
						typeof match[5] == 'undefined') {
						
						lastReference.chapter1 = parseInt(match[1],10);
						lastReference.verse1 = parseInt(match[3],10);
						lastReference.chapter2 = -1;
						lastReference.verse2 = -1;		
					
					} else if (
						// 1:2-3
						typeof match[1] != 'undefined' && 
						typeof match[3] != 'undefined' && 
						typeof match[5] != 'undefined') {
						
						lastReference.chapter1 = parseInt(match[1],10);
						lastReference.verse1 = parseInt(match[3],10);
						lastReference.chapter2 = -1;
						lastReference.verse2 = parseInt(match[5],10);;		
					} else if (
						// 1-2
						typeof match[1] != 'undefined' && 
						typeof match[3] == 'undefined' && 
						typeof match[5] != 'undefined') {
						
						lastReference.verse1 = parseInt(match[1],10);
						lastReference.chapter2 = -1;
						lastReference.verse2 = parseInt(match[5],10);;		
					}
					
					return lastReference;
				}
											
			
				// failure
				return {
					refText: refText,
					toShortUrl: function() {
						return 'http://bib.ly/' + refText.replace(/\s/ig,'').replace(/:/ig,'.').replace(/–/ig,'-');
					},
					toString: function() {
						return refText  + " = Can't parse it";
					}
				};
				
			}
		}
	
	function parseDocument() {
		traverseDOM(document.body, 1, textHandler);
	}
	function traverseDOM(node, depth, textHandler) {
		var count = 0;
			
		while (node && depth > 0) {
			count++;
			if (count >= bibly.max_nodes) {
				setTimeout(function() { traverseDOM(node, depth, textHandler); }, 50);
				return;
			}

			switch (node.nodeType) {
				case 1: // ELEMENT_NODE
					if (!skipRegex.test(node.tagName) && node.childNodes.length > 0) {
						node = node.childNodes[0];
						depth ++;
						continue;
					}
					break;
				case 3: // TEXT_NODE
				case 4: // CDATA_SECTION_NODE
					node = textHandler(node);
					break;
			}

			if (node.nextSibling) {
				node = node.nextSibling;
			} else {
				while (depth > 0) {
					node = node.parentNode;
					depth --;
					if (node.nextSibling) {
						node = node.nextSibling;
						break;
					}
				}
			}
		}
	}	

    if (window.attachEvent) {
        window.attachEvent('onload', parseDocument);
    } else if (window.addEventListener) {
        window.addEventListener('load', parseDocument, false);
    } else {
        __onload = window.onload;
        window.onload = function() {
           parseDocument();
            __onload();
        };
    }	
	
	
})();