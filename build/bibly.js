/*!
 * bib.ly
 * Bible reference shortener and popup linker
 * http://bib.ly/
 *
 * Copyright 2011, John Dyer (http://j.hn/)
 *
 * Scripture quotations marked "ESV" are taken from The Holy Bible, English Standard Version. 
 * Copyright ©2001 by Crossway Bibles, a publishing ministry of Good News Publishers. Used by permission. 
 * All rights reserved. Text provided by the Crossway Bibles Web Service (http://www.gnpcb.org/esv/share/services/).
 *
 * NET Bible® copyright ©1996-2006 by Biblical Studies Press, L.L.C. (http://bible.org/)
 *
 * For all other versions, this site uses the Biblia web services (http://biblia.com/) 
 * from Logos Bible Software (http://www.logos.com/)
 */

var bible = {};
(function() {
	// splits the names into multiples
	var split = function(input) {
			return input.split(' ');
		},
		// 
		ordinals = function(number,input) {
			var parts = input.split(' '), 
				result = [], 
				ords = null,
				i,il,j,jl;
			if (number == 1) {
				ords = ['1','I','First'];
			} else if (number ==2) {
				ords = ['2','II','Second'];
			} else if (number == 3) {
				ords = ['3','III','Third'];
			}
			for (i=0,il=parts.length; i<il; i++) {
				for (j=0,jl=ords.length; j<jl; j++) {
					// 1 John
					result.push(ords[j] + ' ' + parts[i]);
					// 1John
					result.push(ords[j] + parts[i]);
				}			
			}				
			
			// second item should be short URL version
			result.unshift(ords[0] + parts[1]);
			// first should be the full name
			result.unshift(ords[0] + ' ' + parts[0]);
			
			return result;
		}
	

bible.Books = [
{
	names:split('Genesis Ge Gen')
	,verses:[31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26]
},
{
	names:split('Exodus Ex Exo')
	,verses:[22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38]
},
{
	names:split('Leviticus Le Lev')
	,verses:[17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34]
},
{
	names:split('Numbers Nu Num')
	,verses:[54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13]
},
{
	names:split('Deuteronomy Dt Deut Deu De')
	,verses:[46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12]
},
{
	names:split('Joshua Js Jos Jos Josh')
	,verses:[18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33]
},
{
	names:split('Judges Jg Jud Jdg Ju Jdgs')
	,verses:[36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25]
},
{
	names:split('Ruth Ru Rut')
	,verses:[22,23,18,22]
},
{
	names:ordinals(1,'Samuel Sa Sam S')
	,verses:[28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13]
},
{
	names:ordinals(2,'Samuel Sa Sam S')
	,verses:[27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25]
},
{
	names:ordinals(1,'Kings K King Kin Kngs Kngs')
	,verses:[53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53]
},
{
	names:ordinals(2,'Kings K King Kin Kngs Kngs')
	,verses:[18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30]
},
{
	names:ordinals(1,'Chronicles Ch Chr')
	,verses:[54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30]
},
{
	names:ordinals(2,'Chronicles Ch Chr')
	,verses:[17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23]
},
{
	names:split('Ezra Ez Ezr')
	,verses:[11,70,13,24,17,22,28,36,15,44]
},
{
	names:split('Nehemiah Ne Neh Neh Ne')
	,verses:[11,20,32,23,19,19,73,18,38,39,36,47,31]
},
{
	names:split('Esther Es Est Esth')
	,verses:[22,23,15,17,14,14,10,17,32,3]
},
{
	names:split('Job Jb Job')
	,verses:[22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17]
},
{
	names:split('Psalm Ps Psa Pss')
	,verses:[6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6]
},
{
	names:split('Proverbs Pr Prov Pro')
	,verses:[33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31]
},
{
	names:split('Ecclesiastes Ec Ecc')
	,verses:[18,26,22,16,20,12,29,17,18,20,10,14]
},
{
	names:['Song of Solomon','SOS','Song of Songs']
	,verses:[17,17,11,16,16,13,13,14]
},
{
	names:split('Isaiah Is Isa')
	,verses:[31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24]
},
{
	names:split('Jeremiah Je Jer')
	,verses:[19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34]
},
{
	names:split('Lamentations La Lam Lament')
	,verses:[22,22,66,22,22]
},
{
	names:split('Ezekiel Ek Ezek Eze')
	,verses:[28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35]
},
{
	names:split('Daniel Da Dan Dl Dnl')
	,verses:[21,49,30,37,31,28,28,27,27,21,45,13]
},
{
	names:split('Hosea Ho Hos')
	,verses:[11,23,5,19,15,11,16,14,17,15,12,14,16,9]
},
{
	names:split('Joel Jl Joel Joe')
	,verses:[20,32,21]
},
{
	names:split('Amos Am Amos Amo')
	,verses:[15,16,15,13,27,14,17,14,15]
},
{
	names:split('Obadiah Ob Oba Obd Odbh')
	,verses:[21]
},
{
	names:split('Jonah Jh Jon Jnh')
	,verses:[17,10,10,11]
},
{
	names:split('Micah Mi Mic')
	,verses:[16,13,12,13,15,16,20]
},
{
	names:split('Nahum Na Nah Nah Na')
	,verses:[15,13,19]
},
{
	names:split('Habakkuk Hb Hab Hk Habk')
	,verses:[17,20,19]
},
{
	names:split('Zephaniah Zp Zep Zeph Ze')
	,verses:[18,15,20]
},
{
	names:split('Haggia Ha Hag Hagg')
	,verses:[15,23]
},
{
	names:split('Zechariah Zc Zech Zec')
	,verses:[21,13,10,14,11,15,14,23,17,12,17,14,9,21]
},
{
	names:split('Malachi Ml Mal Mlc')
	,verses:[14,17,18,6]
},
{
	names:split('Matthew Mt Matt Mat')
	,verses:[25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20]
},
{
	names:split('Mark Mk Mrk')
	,verses:[45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20]
},
{
	names:split('Luke Lk Luk Lu')
	,verses:[80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53]
},
{
	names:split('John Jn Joh Jo')
	,verses:[51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25]
},
{
	names:split('Acts Ac Act')
	,verses:[26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31]
},
{
	names:split('Romans Ro Rom Rmn Rmns')
	,verses:[32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27]
},
{
	names:ordinals(1,'Corinthians Co Cor')
	,verses:[31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24]
},
{
	names:ordinals(2,'Corinthians Co Cor')
	,verses:[24,17,18,18,21,18,16,24,15,18,33,21,14]
},
{
	names:split('Galatians Ga Gal Gltns')
	,verses:[24,21,29,31,26,18]
},
{
	names:split('Ephesians Ep Eph Ephn')
	,verses:[23,22,21,32,33,24]
},
{
	names:split('Philippians Pp Phi Phil Phi')
	,verses:[30,30,21,23]
},
{
	names:split('Colossians Co Col Colo Cln Clns')
	,verses:[29,23,25,18]
},
{
	names:ordinals(1,'Thessalonians Th Thess Thes')
	,verses:[10,20,13,18,28]
},
{
	names:ordinals(2,'Thessalonians Th Thess Thes')
	,verses:[12,17,18]
},
{
	names:ordinals(1,'Timothy Ti Tim')
	,verses:[20,15,16,16,25,21]
},
{
	names:ordinals(2,'Timothy Ti Tim')
	,verses:[18,26,17,22]
},
{
	names:split('Titus Ti Tit Tt Ts')
	,verses:[16,15,15]
},
{
	names:split('Philemon Pm Phile Phile Philm Pm')
	,verses:[25]
},
{
	names:split('Hebrews He Heb Hw')
	,verses:[14,18,19,16,14,20,28,13,28,39,40,29,25]
},
{
	names:split('James Jm Jam Jas Ja')
	,verses:[27,26,18,17,20]
},
{
	names:ordinals(1,'Peter Pe Pet P')
	,verses:[25,25,22,19,14]
},
{
	names:ordinals(2,'Peter Pe Pet P')
	,verses:[21,22,18]
},
{
	names:ordinals(1,'John Jo Jn J')
	,verses:[10,29,24,21,21]
},
{
	names:ordinals(2,'John Jo Jn J')
	,verses:[13]
},
{
	names:ordinals(3,'John Jo Jn J')
	,verses:[14]
},
{
	names:split('Jude Jude Jude')
	,verses:[25]
},
{
	names:split('Revelation Re Rev Rvltn')
	,verses:[20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,20]
}
];
})();
bible.genNames= function() {
	var names = [],
		i = 0,
		il = bible.Books.length;
	for (; i<il; i++) {
		names.push( bible.Books[i].names.join('|') );
	}
	
	return names.join('|');
}
﻿bible.parseReference = function (textReference) {

	var 
		bookIndex = -1,
		chapter1 = -1,
		verse1 = -1,
		chapter2 = -1,
		verse2 = -1,
		input = new String(textReference).replace('&ndash;','-').replace('–','-'),
		i, j,
		afterRange = false,
		afterSeparator = false,
		startedNumber = false,
		currentNumber = '',
		name,
		possibleMatch = null,
		c;
		
	// take the entire reference (John 1:1 or 1 Cor) and move backwards until we find a letter or space
	// 'John 1:1' => 'John '
	// '1 Cor' => '1 Cor'
	// 'July15' => 'July'
	for (i=input.length; i>=0; i--) {
		if (/[A-Za-z\s]/.test(input.substring(i-1,i))) {
			possibleMatch = input.substring(0,i);
			break;
		}
	}
	
	if (possibleMatch != null) {
		
		// tear off any remaining spaces
		// 'John ' => 'John'
		possibleMatch = possibleMatch.replace(/\s+$/,'').replace(/\.+$/,'').toLowerCase();

		// go through all books and test all names
		for (i = bible.Books.length - 1; i >= 0; i--) {
			// test each name starting with the full name, then short code, then abbreviation, then alternates
			for (j = 0; j < bible.Books[i].names.length; j++) {
				name = new String(bible.Books[i].names[j]).toLowerCase();

				if (possibleMatch == name) {
					bookIndex = i;
					input = input.substring(name.length);
					break;
				}

			}
		}

		if (bookIndex > -1) {

			for (i = 0; i < input.length; i++) {
				c = input.charAt(i);

				if (c == ' ' || isNaN(c)) {
					if (!startedNumber)
						continue;

					if (c == '-' || c == '–') {
						afterRange = true;
						afterSeparator = false;
					} else if (c == ':' || c == ',' || c == '.') {
						afterSeparator = true;
					} else {
						// ignore
					}

					// reset
					currentNumber = '';
					startedNumber = false;

				} else {
					startedNumber = true;
					currentNumber += c;

					if (afterSeparator) {
						if (afterRange) {
							verse2 = parseInt(currentNumber);
						} else { // 1:1
							verse1 = parseInt(currentNumber);
						}
					} else {
						if (afterRange) {
							chapter2 = parseInt(currentNumber);
						} else { // 1
							chapter1 = parseInt(currentNumber);
						}
					}
				}
			}
			
			// for books with only one chapter, treat the chapter as a vers
			if (bible.Books[bookIndex].verses.length == 1) {
				
				// Jude 6 ==> Jude 1:6
				if (chapter1 > 1 && verse1 == -1) {
					verse1 = chapter1;
					chapter1 = 1;
				}
			}	
			

			// reassign 1:1-2	
			if (chapter1 > 0 && verse1 > 0 && chapter2 > 0 && verse2 <= 0) {
				verse2 = chapter2;
				chapter2 = chapter1;
			}
			// fix 1-2:5
			if (chapter1 > 0 && verse1 <= 0 && chapter2 > 0 && verse2 > 0) {
				verse1 = 1;
			}

			// just book
			if (bookIndex > -1 && chapter1 <= 0 && verse1 <= 0 && chapter2 <= 0 && verse2 <= 0) {
				chapter1 = 1;
				//verse1 = 1;
			}

			// validate max chapter
			if ( typeof bible.Books[bookIndex].verses  != 'undefined') {
				if (chapter1 == -1) {
					chapter1 = 1;
				} else if (chapter1 > bible.Books[bookIndex].verses.length) {
					chapter1 = bible.Books[bookIndex].verses.length;
					if (verse1 > 0)
						verse1 = 1;
				}

				// validate max verse
				if (verse1 > bible.Books[bookIndex].verses[chapter1 - 1]) {
					verse1 = bible.Books[bookIndex].verses[chapter1 - 1];
				}
				if (verse2 <= verse1) {
					chapter2 = -1;
					verse2 = -1;
				}
			}
		}
	}
		
	// finalize
	return bible.Reference(bookIndex, chapter1, verse1, chapter2, verse2);

}

bible.Reference = function () {

	var 
		_bookIndex = -1,
		_chapter1 = -1,
		_verse1 = -1,
		_chapter2 = -1,
		_verse2 = -1,
		args = arguments;

	if (args.length == 0) {
		// error		
	} else if (args.length == 1 && typeof args[0] == 'string') { // a string that needs to be parsed
		return bible.parseReference(args[0]);
	} else if (args.length == 1) { // unknown
		return null;
	} else {
		_bookIndex = args[0];
		_chapter1 = args[1];
		if (args.length >= 3) _verse1 = args[2];
		if (args.length >= 4) _chapter2 = args[3];
		if (args.length >= 5) _verse2 = args[4];
	}

	return {
		bookIndex: _bookIndex,
		chapter: _chapter1,
		verse: _verse1,
		chapter1: _chapter1,
		verse1: _verse1,
		chapter2: _chapter2,
		verse2: _verse2,

		isValid: function () {
			return (_bookIndex > -1 && _bookIndex < bible.Books.length && _chapter1 > 0);
		},

		chapterAndVerse: function (cvSeparator, vvSeparator, ccSeparator) {
			cvSeparator = cvSeparator || ':';
			vvSeparator = vvSeparator || '-';
			ccSeparator = ccSeparator || '-';
			
			var chapter1 = this.chapter1, 
				chapter2 = this.chapter2, 
				verse1 = this.verse1, 
				verse2 = this.verse2;

			if (chapter1 > 0 && verse1 <= 0 && chapter2 <= 0 && verse2 <= 0) // John 1
				return chapter1;
			else if (chapter1 > 0 && verse1 > 0 && chapter2 <= 0 && verse2 <= 0) // John 1:1
				return chapter1 + cvSeparator + verse1;
			else if (chapter1 > 0 && verse1 > 0 && chapter2 <= 0 && verse2 > 0) // John 1:1-5
				return chapter1 + cvSeparator + verse1 + vvSeparator + verse2;
			else if (chapter1 > 0 && verse1 <= 0 && chapter2 > 0 && verse2 <= 0) // John 1-2
				return chapter1 + ccSeparator + chapter2;
			else if (chapter1 > 0 && verse1 > 0 && chapter2 > 0 && verse2 > 0) // John 1:1-2:2
				return chapter1 + cvSeparator + verse1 + ccSeparator + ((chapter1 != chapter2) ? chapter2 + cvSeparator : '') + verse2;
			else
				return '?';
		},

		toString: function () {
			if (this.bookIndex < 0 || this.bookIndex >= bible.Books.length) return "invalid";

			return bible.Books[this.bookIndex].names[0] + ' ' + this.chapterAndVerse();
		},

		toShortUrl: function () {
			if (this.bookIndex < 0 || this.bookIndex >= bible.Books.length) return "invalid";
			return 'http://bib.ly/' + bible.Books[this.bookIndex].names[1] + this.chapterAndVerse('.','-','-');
		}
	}
};
﻿

// adapted from old scripturizer.js code

(function() {
	// book names list	
	var bibly = {
			version: '0.8',
			maxNodes: 500,
			className: 'bibly_reference',
			enablePopups: true,
			popupVersion: 'ESV',
			linkVersion: '',
			bibliaApiKey: '436e02d01081d28a78a45d65f66f4416', 
			autoStart: true,
			startNodeId: '',
			maxVerses: 4
		},	
		win = window,
		doc = document,
		body = null,		
		defaultPopupVersion = 'ESV',
		allowedPopupVersions = ['NET','ESV','KJV','LEB','DARBY'],
		bok = bible.genNames(),
		ver =  '(\\d+)([\.:](\\d+))?(\\s?[-–&]\\s?(\\d+))?',  // 1 OR 1:1 OR 1:1-2
		ver2 =  '(\\d+)[\.:](\\d+)(\\s?[-–&]\\s?(\\d+))?',  // NOT 1 OR 1:1 OR 1:1-2 (this is needed so verses after semi-colons require a :. Problem John 3:16; 2 Cor 3:3 <-- the 2 will be a verse)
		regexPattern = '\\b('+bok+')\.?\\s+('+ver+'((\\s?,\\s?'+ver+')|(\\s?;\\s?'+ver2+'))*)\\b',
		referenceRegex = new RegExp(regexPattern, 'mi'),
		verseRegex = new RegExp(ver, 'mi'),
		skipRegex = /^(a|script|style|textarea)$/i,
		lastReference = null,
		textHandler = function(node) {
			var match = referenceRegex.exec(node.data), 
				val, 
				referenceNode, 
				afterReferenceNode,
				newLink;
			
			// reset this
			lastReference = null;
			
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
			
			// test if the text matches a real reference
			refText = referenceNode.nodeValue;	
			reference = parseRefText(refText);
			if (typeof reference != 'undefined' && reference.isValid()) {
				
				// replace the referenceNode TEXT with an anchor node to bib.ly
				newLink = node.ownerDocument.createElement('A');				
				node.parentNode.replaceChild(newLink, referenceNode);	
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
			} else {
				// for false matches, return it unchanged
				return referenceNode;
			}
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
				
			} else if (lastReference  != null) {
				
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
					
					// single verse (1)
					if (p3 == 0 && p5 == 0) {
											
						lastReference.verse1 = parseInt(match[1],10);
						lastReference.chapter2 = -1;
						lastReference.verse2 = -1;
					
					// 1:2
					} else if ( p3 != 0 && p5 == 0) {
						
						lastReference.chapter1 = parseInt(match[1],10);
						lastReference.verse1 = parseInt(match[3],10);
						lastReference.chapter2 = -1;
						lastReference.verse2 = -1;		
					
					// 1:2-3
					} else if (p3 != 0 && p5 != 0) {
						
						lastReference.chapter1 = parseInt(match[1],10);
						lastReference.verse1 = parseInt(match[3],10);
						lastReference.chapter2 = -1;
						lastReference.verse2 = parseInt(match[5],10);;		
					
					// 1-2
					} else if (p3 == 0 && p5 != 0) {
						
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
		jsonp = function(url, callback){  
		
			var jsonpName = 'callback' + (callbackIndex++),
				script = doc.createElement("script"); 
		
			win[jsonpName] = function(d) {
				callback(d);
			}
			jsonpCache[url] = jsonpName;
		
			url += (url.indexOf("?") > -1 ? '&' : '?') + 'callback=' + jsonpName;			  
			//url += '&' + new Date().getTime().toString(); // prevent caching        
						
			script.setAttribute("src",url);
			script.setAttribute("type","text/javascript");                
			body.appendChild(script);
			
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
					jsonp('http://labs.bible.org/api/?passage=' + encodeURIComponent(reference.toString()) + '&type=json', callback);
					break;
				case 'KJV':
				case 'LEB':
					jsonp('http://api.biblia.com/v1/bible/content/' + v + '.html.json?style=oneVersePerLine&key=' + bibly.bibliaApiKey + '&passage=' + encodeURIComponent(reference.toString()), callback);
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
				text = '',
				className = v + '-version',
				i,il;
				
			switch (v) {
				default:
				case 'NET':
					for (i=0,il=d.length; i<il && i<max; i++) {
						text += '<span class="bibly_verse_number">' + d[i].verse + '</span>' + d[i].text + ' ';
					}
					break;
				case 'KJV':
				case 'LEB':
					className += ' biblia';
					text = d.text;
					break;
				case 'ESV':
					text = d.content;
					break;					
			}
			
			p.content.innerHTML = '<div class="' + className + '">' + text + '</div>';
		},
		checkPosTimeout,
		handleLinkMouseOver = function(e) {
			if (!e) e = win.event;
			
			clearPositionTimer();
						
			var target = (e.target) ? e.target : e.srcElement,
				p = bibly.popup,
				pos = getPosition(target),
				x = y = 0,
				v = getPopupVersion();
				referenceText = target.getAttribute('rel'),
				viewport = getWindowSize(),
				scrollPos = getScroll();
			
			p.outer.style.display = 'block';
			p.header.innerHTML = referenceText + ' (' + v + ')';
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
			
			
			getBibleText(referenceText, function(d) {
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
			if( typeof( win.innerWidth ) == 'number' ) {
				// Non-IE
				width = win.innerWidth;
				height = win.innerHeight;
			} else if( doc.documentElement && ( doc.documentElement.clientWidth || doc.documentElement.clientHeight ) ) {
				//IE 6+ in 'standards compliant mode'
				width = doc.documentElement.clientWidth;
				height = doc.documentElement.clientHeight;
			} else if( body && ( body.clientWidth || body.clientHeight ) ) {
				//IE 4 compatible
				width = body.clientWidth;
				height = body.clientHeight;
			}
			
			return {width:width, height: height};
		},
		getScroll = function () {
			var scrOfX = 0, 
				scrOfY = 0;
			if( body && ( body.scrollLeft || body.scrollTop ) ) {
				//DOM compliant
				scrOfY = body.scrollTop;
				scrOfX = body.scrollLeft;
			} else if( doc.documentElement && ( doc.documentElement.scrollLeft || doc.documentElement.scrollTop ) ) {
				//IE6 standards compliant mode
				scrOfY = doc.documentElement.scrollTop;
				scrOfX = doc.documentElement.scrollLeft;
			} else if( typeof( win.pageYOffset ) == 'number' ) {
				//Netscape compliant
				scrOfY = win.pageYOffset;
				scrOfX = win.pageXOffset;
			}
			
			return {x: scrOfX, y:scrOfY };
		},
		scanForReferences = function(node) {				
			// build doc
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
		},		
		isStarted = false,
		startBibly = function() {
			
			if (isStarted)
				return;				
			isStarted = true;
			
			doc = document;
			body = doc.body;
			
			// create popup
			var p = bibly.popup = {
					outer: doc.createElement('div')
				}, 
				parts = ['header','content','footer','arrowtop_border','arrowtop','arrowbot_border','arrowbot'],
				i,
				il,
				div,
				name,
				node = null;
				
			p.outer.className = 'bibly_popup_outer';
			// build all the parts	
			for (i=0,il=parts.length; i<il; i++) {
				name = parts[i];
				div = doc.createElement('div');
				div.className = 'bibly_popup_' + name;
				p.outer.appendChild(div);
				p[name] = div;
			}
			
			body.appendChild(p.outer);	
			
			addEvent(p.outer,'mouseover',handlePopupMouseOver);
			addEvent(p.outer,'mouseout',handlePopupMouseOut);

			if (bibly.autoStart) {
				if (bibly.startNodeId != '') {
					node = doc.getElementById(bibly.startNodeId);
				}
				
				if (node == null) {
					node = body;
				}
				
				scanForReferences(node);
			}
		};

	// super cheater version of DOMoade
	// do whatever happens first
	addEvent(doc,'DOMContentLoaded',startBibly);
	addEvent(win,'load',startBibly);
	
	// export
	bibly.scanForReferences = scanForReferences;
	win.bibly = bibly;	
})();
