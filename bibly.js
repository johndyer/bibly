

// adapted from old scripturizer.js code

var bibly = (window.bibly) ? window.bibly : {};
bibly.version = '0.4';
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
			if (referenceNode.nodeValue == null)
				return referenceNode;
		
			// split up match by ; and , characters and make a unique link for each
			var 
				newLink,
				shortenedRef,
				commaIndex = referenceNode.nodeValue.indexOf(','),
				semiColonIndex = referenceNode.nodeValue.indexOf(';'),
				separatorIndex = (commaIndex > 0 && semiColonIndex > 0) ? Math.min(commaIndex, semiColonIndex) : Math.max(commaIndex, semiColonIndex),
				separator,
				remainder,
				reference,
				startRemainder;
			
			// if there is a separator ,; then split up into three parts [node][separator][after]
			if (separatorIndex > 0) {
				separator = referenceNode.splitText(separatorIndex);
				
				startRemainder = 1;
				while(startRemainder < separator.nodeValue.length && separator.nodeValue.substring(startRemainder,startRemainder+1) == ' ')
					startRemainder++;
				
				remainder = separator.splitText(startRemainder);
			}	
			
			// replace the referenceNode TEXT with an anchor node
			newLink = node.ownerDocument.createElement('A');				
			node.parentNode.replaceChild(newLink, referenceNode);			
			refText = referenceNode.nodeValue;	
			reference = parseRefText(refText);
			newLink.setAttribute('href', reference.toShortUrl());
			newLink.setAttribute('title', 'Read ' + reference.toString());
			newLink.setAttribute('rel', reference.toString());
			newLink.setAttribute('class', bibly.className);
			newLink.appendChild(referenceNode);
			newLink.onmouseover = handleLinkMouseOver;
			newLink.onmouseout = handleLinkMouseOut;
			
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
		},
		jsonp = function(url, callback, jsonpName){  
			
			var jsonpName = 'callback' + Math.floor(Math.random()*11);
				script = document.createElement("script"); 
		
			window[jsonpName] = function(d) {
				callback(d);
			}
		
			url += (url.indexOf("?") > -1 ? '&' : '?') + 'callback=' + jsonpName;			  
			//url += '&' + new Date().getTime().toString(); // prevent caching        
						
			script.setAttribute("src",url);
			script.setAttribute("type","text/javascript");                
			document.body.appendChild(script);
		},
		getBibleText = function(reference, callback) {
			jsonp('http://api.biblia.com/v1/bible/content/LEB.txt.json?key=436e02d01081d28a78a45d65f66f4416&passage=' + encodeURIComponent(reference), callback);
		},		
		checkPosTimeout,
		handleLinkMouseOver = function(e) {
			if (!e) var e = window.event;
			
			clearPositionTimer();
						
			var target = (e.target) ? e.target : e.srcElement,
				p = bibly.popup,
				pos = getPosition(target),
				x = y = 0,
				ref = target.getAttribute('rel');
			
			p.outer.style.display = 'block';
			p.header.innerHTML = ref + ' (KJV)';
			p.content.innerHTML = 'Loading...<br/><br/><br/>';
			x = pos.left - (p.outer.clientWidth/2) + (target.clientWidth/2);
			y = pos.top - p.outer.clientHeight;
			
			if (x < 0) {
				x = 0;
			} /* else if (x + p.outer.clientWidth >  */
			
			if (y < 0) {
				y = 0;
			} /* else if (x + p.outer.clientWidth >  */			
						
			p.outer.style.top = y + 'px';
			p.outer.style.left = x+ 'px';	
			
			getBibleText(ref, function(d) {
				p.content.innerHTML = d.text;
				y = pos.top - p.outer.clientHeight;
				p.outer.style.top = y + 'px';
			});
		},
		handleLinkMouseOut = function(e) {
			startPositionTimer();
		},
		
		handlePopupMouseOver = function(e) {	
			clearPositionTimer();
		},
		handlePopupMouseOut = function(e) {
			startPositionTimer();
		},
		
		/* Timer on/off */
		startPositionTimer = function () {
			checkPosTimeout = setTimeout(hidePopup, 500);
		},
		clearPositionTimer = function() {
			clearTimeout(checkPosTimeout);
			delete checkPosTimeout;
		},
		hidePopup = function() {
			var p = bibly.popup;
			p.outer.style.display = 'none';	
		},
		
		getPosition = function(node) {		
			var curleft = curtop = curtopscroll = curleftscroll = 0;
			if (node.offsetParent) {
				do {
					curleft += node.offsetLeft;
					curtop += node.offsetTop;				
					curleftscroll += node.offsetParent ? node.offsetParent.scrollLeft : 0;
					curtopscroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
				} while (node = node.offsetParent);
			}
			
			return {left:curleft,top:curtop,leftScroll:curleftscroll,topScroll:curtopscroll};
		},
		
		startBibly = function() {
				
			// create popup
			var p = bibly.popup = {
				outer: document.createElement('div'), 
				header: document.createElement('div'), 
				content: document.createElement('div'), 
				footer: document.createElement('div')
			}
				
			p.outer.setAttribute('class','bibly_popup_container');
			p.header.setAttribute('class','bibly_popup_header'); 
			p.content.setAttribute('class','bibly_popup_content');
			p.footer.setAttribute('class','bibly_popup_footer');		

			p.outer.appendChild(p.header);
			p.outer.appendChild(p.content);
			p.outer.appendChild(p.footer);
			
			document.body.appendChild(p.outer);	
			p.outer.onmouseover = handlePopupMouseOver;
			p.outer.onmouseout = handlePopupMouseOut;
				
			// build document
			traverseDOM(document.body, 1, textHandler);
			
			// dummy data
			p.content.innerHTML = 
				'<span class="bibly_verse"><span class="bibly_verse_number">16</span> For God so loved the world that he gave his only begotten Son that whosoever believeth in him should not perish but have everlasting life.</span>' + 
				'<span class="bibly_verse"><span class="bibly_verse_number">17</span> For God sent not his Son into the world to condemn the world but that the world through him might be saved.</span>	';		
			p.header.innerHTML = 'John 3:16-17';		
		},
		traverseDOM = function(node, depth, textHandler) {
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
		};

    if (window.attachEvent) {
        window.attachEvent('onload', startBibly);
    } else if (window.addEventListener) {
        window.addEventListener('load', startBibly, false);
    } else {
        var __onload = window.onload;
        window.onload = function() {
           startBibly();
            __onload();
        };
    }	
	
	
})();