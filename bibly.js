

// adapted from old scripturizer.js code

(function() {
	// book names list	
	var bibly = {
			version: '0.6.3',
			maxNodes: 500,
			className: 'bibly_reference',
			enablePopups: true,
			popupVersion: 'ESV',
			linkVersion: '',
			autoStart: true,
			startNodeId: '',
			maxVerses: 4
		},	
		defaultPopupVersion = 'NET',
		allowedPopupVersions = ['NET','ESV','KJV','LEB','DARBY'],
		bok = bible.genNames(),
		ver =  '(\\d+)([\.:](\\d+))?(\\s?[-–&]\\s?(\\d+))?',  // 1 OR 1:1 OR 1:1-2
		ver2 =  '(\\d+)[\.:](\\d+)(\\s?[-–&]\\s?(\\d+))?',  // NOT 1 OR 1:1 OR 1:1-2 (this is needed so verses after semi-colons require a :. Problem John 3:16; 2 Cor 3:3 <-- the 2 will be a verse)
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
			newLink.setAttribute('href', reference.toShortUrl() + (bibly.linkVersion != '' ? '.' + bibly.linkVersion : ''));
			newLink.setAttribute('title', 'Read ' + reference.toString());
			newLink.setAttribute('rel', reference.toString());
			newLink.setAttribute('class', bibly.className);
			newLink.appendChild(referenceNode);
			
			if (bibly.enablePopups) {
				addEvent(newLink,'mouseover', handleLinkMouseOver);
				addEvent(newLink,'mouseout', handleLinkMouseOut);
			}
			
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
				match = null,
				p1, p3, p5;
			
			if (reference != null && typeof reference.isValid != 'undefined' && reference.isValid()) {
				lastReference = reference;
				return reference;
			} else {
				
				// single verse match (3)
				match = verseRegex.exec(refText);				
				if (match) {				
					
					p1 = parseInt(match[1],10);
					p3 = parseInt(match[3],10);
					p5 = parseInt(match[5],10);
					
					if (isNaN(p3)) {
						p3 = 0;
					}
					if (isNaN(p5)) {
						p5 = 0;
					}
					
					if (
						// single verse (1)
						p3 == 0 && p5 == 0) {
											
						lastReference.verse1 = parseInt(match[1],10);
						lastReference.chapter2 = -1;
						lastReference.verse2 = -1;
					
					} else if (
						// 1:2
						p3 != 0 && p5 == 0) {
						
						lastReference.chapter1 = parseInt(match[1],10);
						lastReference.verse1 = parseInt(match[3],10);
						lastReference.chapter2 = -1;
						lastReference.verse2 = -1;		
					
					} else if (
						// 1:2-3
						p3 != 0 && p5 != 0) {
						
						lastReference.chapter1 = parseInt(match[1],10);
						lastReference.verse1 = parseInt(match[3],10);
						lastReference.chapter2 = -1;
						lastReference.verse2 = parseInt(match[5],10);;		
					} else if (
						// 1-2
						p3 == 0 && p5 != 0) {
						
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
		callbackIndex=100000,
		jsonpCache = {},
		enableJsonpCache = true,
		jsonp = function(url, callback, jsonpName){  
		
			// check cache
			//if (enableJsonpCache && typeof jsonpCache[url] != 'undefined') {
			//	window[jsonpCache[url]]();
			//} else {
			
				var jsonpName = 'callback' + (callbackIndex++);
					script = document.createElement("script"); 
			
				window[jsonpName] = function(d) {
					callback(d);
				}
				jsonpCache[url] = jsonpName;
			
				url += (url.indexOf("?") > -1 ? '&' : '?') + 'callback=' + jsonpName;			  
				//url += '&' + new Date().getTime().toString(); // prevent caching        
							
				script.setAttribute("src",url);
				script.setAttribute("type","text/javascript");                
				document.body.appendChild(script);
			//}
		},
		getFooter= function(version) {
			switch (version) {
				case 'NET':
					return '<a href="http://bible.org/">NET Bible® copyright ©1996-2006 by Biblical Studies Press, LLC</a>';
				case 'ESV':
					return 'English Standard Version. Copyright &copy;2001 by <a href="http://www.crosswaybibles.org">Crossway Bibles</a>';
				case 'LEB':					
				case 'KJV':
					return version + ' powered by <a href="http://biblia.com/">Biblia</a> web services from <a href="http://www.logos.com/">Logos Bible Software</a>';					
			}
		},
		getPopupVersion = function() {
			var v = bibly.popupVersion.toUpperCase(), 
				indexOf=-1, 
				i=0, 
				il=allowedPopupVersions.length;
			
			// old IEs don't have Array.indexOf
			for (; i < il; i++) {
			  if (allowedPopupVersions[i].toUpperCase() === v) {
				indexOf = i;
				break;
			  }
			}

			return (indexOf > -1) ? v : defaultPopupVersion;
		},
		getBibleText = function(refString, callback) {
			var v = getPopupVersion(),
				max = bibly.maxVerses,
				reference = new bible.Reference(refString);
				
			// check that it's only 4 verses
			if (reference.verse1 > 0 && reference.verse2 > 0 && reference.verse2 - reference.verse1 > (max-1)) {
				reference.verse2 = reference.verse1 + (max-1);
			} else if (reference.verse1 <= 0 && reference.verse2 <= 0) {
				reference.verse1 = 1;
				reference.verse2 = max;
			}
					
			switch (v) {
				default:
				case 'NET':
					jsonp('http://labs.bible.org/api/?passage=' + encodeURIComponent(ref.toString()) + '&type=json', callback);
					break;
				case 'KJV':
				case 'LEB':
					jsonp('http://api.biblia.com/v1/bible/content/' + v + '.html.json?style=oneVersePerLine&key=436e02d01081d28a78a45d65f66f4416&passage=' + encodeURIComponent(reference.toString()), callback);
					break;
				case 'ESV':
					jsonp('http://www.esvapi.org/crossref/ref.php?reference=' + encodeURIComponent(reference.toString()), callback);
					break;					
			} 
		},		
		handleBibleText = function(d) {
			var 
				v = getPopupVersion(),
				p = bibly.popup,
				max = bibly.maxVerses,
				text = '';
				
			switch (v) {
				default:
				case 'NET':
					for (var i=0,il=d.length; i<il && i<max; i++) {
						text += '<span class="bibly_verse_number">' + d[i].verse + '</span>' + d[i].text + ' ';
					}
					break;
				case 'KJV':
				case 'LEB':
					text = d.text;
					break;
				case 'ESV':
					text = d.content;
					break;					
			}
			
			p.content.innerHTML = '<div class="' + v + '-version">' + text + '</div>';
		},
		checkPosTimeout,
		handleLinkMouseOver = function(e) {
			if (!e) var e = window.event;
			
			clearPositionTimer();
						
			var target = (e.target) ? e.target : e.srcElement,
				p = bibly.popup,
				pos = getPosition(target),
				x = y = 0,
				v = getPopupVersion();
				ref = target.getAttribute('rel'),
				viewport = getWindowSize(),
				scrollPos = getScroll();
			
			p.outer.style.display = 'block';
			p.header.innerHTML = ref + ' (' + v + ')';
			p.content.innerHTML = 'Loading...<br/><br/><br/>';
			p.footer.innerHTML = getFooter(v);
			
			
			function positionPopup() {
				x = pos.left - (p.outer.offsetWidth/2) + (target.offsetWidth/2);
				y = pos.top - p.outer.clientHeight; // for the arrow
				
				if (x < 0) {
					x = 0;
				} else if (x + p.outer.clientWidth > viewport.width) {
					x = viewport.width - p.outer.clientWidth - 20;
				}
				
				if (y < 0 || (y < scrollPos.y) ){ // above the screen
					y = pos.top + target.offsetHeight + 10;
					p.arrowtop.style.display = 'block';
					p.arrowtop_border.style.display = 'block';
					p.arrowbot.style.display = 'none';
					p.arrowbot_border.style.display = 'none';					
					
				} else {
					y = y-10; 
					p.arrowtop.style.display = 'none';
					p.arrowtop_border.style.display = 'none';
					p.arrowbot.style.display = 'block';
					p.arrowbot_border.style.display = 'block';					
				}
				
				p.outer.style.top = y + 'px';
				p.outer.style.left = x + 'px';				
			}
			positionPopup();
			
			
			getBibleText(ref, function(d) {
				// handle the various JSON outputs
				handleBibleText(d);
				
				// reposition the popup
				//y = pos.top - p.outer.clientHeight - 10; // border
				//p.outer.style.top = y + 'px';
				positionPopup();
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
		getWindowSize= function() {
			var width = 0, 
				height = 0;
			if( typeof( window.innerWidth ) == 'number' ) {
				// Non-IE
				width = window.innerWidth;
				height = window.innerHeight;
			} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
				//IE 6+ in 'standards compliant mode'
				width = document.documentElement.clientWidth;
				height = document.documentElement.clientHeight;
			} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
				//IE 4 compatible
				width = document.body.clientWidth;
				height = document.body.clientHeight;
			}
			
			return {width:width, height: height};
		},
		getScroll = function () {
			var scrOfX = 0, 
				scrOfY = 0;
			if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
				//DOM compliant
				scrOfY = document.body.scrollTop;
				scrOfX = document.body.scrollLeft;
			} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
				//IE6 standards compliant mode
				scrOfY = document.documentElement.scrollTop;
				scrOfX = document.documentElement.scrollLeft;
			} else if( typeof( window.pageYOffset ) == 'number' ) {
				//Netscape compliant
				scrOfY = window.pageYOffset;
				scrOfX = window.pageXOffset;
			}
			
			return {x: scrOfX, y:scrOfY };
		}
		isStarted = false,
		startBibly = function() {
			
			if (isStarted)
				return;				
			isStarted = true;
			
			// create popup
			var p = bibly.popup = {
					outer: document.createElement('div')
				}, 
				parts = ['header','content','footer','arrowtop_border','arrowtop','arrowbot_border','arrowbot'],
				i,
				il,
				div,
				name,
				node = null;
				
			p.outer.className = 'bibly_popup_outer';
			// build all the parts	
			for (var i=0,il=parts.length; i<il; i++) {
				name = parts[i];
				div = document.createElement('div');
				div.className = 'bibly_popup_' + name;
				p.outer.appendChild(div);
				p[name] = div;
			}
			
			document.body.appendChild(p.outer);	
			
			addEvent(p.outer,'mouseover',handlePopupMouseOver);
			addEvent(p.outer,'mouseout',handlePopupMouseOut);

			if (bibly.autoStart) {
				if (bibly.startNodeId != '') {
					node = document.getElementById(bibly.startNodeId);
				}
				
				if (node == null) {
					node = document.body;
				}
				
				scanForReferences(node);
			}
		},
		scanForReferences = function(node) {				
			// build document
			traverseDOM(node.childNodes[0], 1, textHandler);		
		},
		traverseDOM = function(node, depth, textHandler) {
			var count = 0;
				
			while (node && depth > 0) {
				count++;
				if (count >= bibly.maxNodes) {
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
		}, 
		addEvent = function(obj,name,fxn) {
			if (obj.attachEvent) {
				obj.attachEvent('on' + name, fxn);
			} else if (obj.addEventListener) {
				obj.addEventListener(name, fxn, false);
			} else {
				var __ = obj['on' + name];
				obj['on' + name] = function() {
				   fxn();
					__();
				};
			}			
		}

	// super cheater version of DOMoade
	// do whatever happens first
    addEvent(document,'DOMContentLoaded',startBibly);
	addEvent(window,'load',startBibly);
	
	// export
	bibly.scanForReferences = scanForReferences;
	window.bibly = bibly;	
})();