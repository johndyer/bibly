bible.parseReference = function (textReference) {

	var 
		bookIndex = -1,
		chapter1 = -1,
		verse1 = -1,
		chapter2 = -1,
		verse2 = -1,
		textRef = bible.replaceRoman(textReference),
		input = textRef.replace('&ndash;','-').replace('–','-').replace(/(\d+[\.:])\s+(\d+)/gi, '$1$2'),
		i, j, il, jl,
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
	
	if (possibleMatch !== null) {
		
		// tear off any remaining spaces
		// 'John ' => 'John'
		possibleMatch = possibleMatch.replace(/\s+$/,'').replace(/\.+$/,'').toLowerCase();

		// go through all books and test all names
		for (i = 0, il = bible.Books.length ; i < il && bookIndex == -1; i++) {
			// test each name starting with the full name, then short code, then abbreviation, then alternates
			for (j = 0, jl = bible.Books[i].names.length; j<jl; j++) {
				name = bible.Books[i].names[j].toLowerCase();

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
							verse2 = parseInt(currentNumber, 10);
						} else { // 1:1
							verse1 = parseInt(currentNumber, 10);
						}
					} else {
						if (afterRange) {
							chapter2 = parseInt(currentNumber, 10);
						} else { // 1
							chapter1 = parseInt(currentNumber, 10);
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
};

bible.replaceRoman = function(str) {
	// get roman numerals from string
	var matches = str.match(/((CM|CD)|(D)?(C){0,3})((XC|XL)|(L)?(X){0,3})((IX|IV)|(V)?(I){0,3})(?=(\s|[\.,;:-])|$)/gi);

	// remove "", null, undefined, and 0
	matches = matches.filter(function(e){
        return e;
    });
        
	// replace the roman numerals with arabic numerals
	for (var i = matches.length - 1; i >= 0; i--) {
		var arabicNumeral = bible.romanToArabic(matches[i]);
		var romanNumeral = new RegExp('\\b' + matches[i] + '(?=(\\s|[.,;:-])|$)', 'gi');
		str = str.replace(romanNumeral, arabicNumeral);
	}

	return str;
};

bible.romanToArabic = function(romanNumeral){
	var romanNumerals = [
		[100, 'C'],
		[90, 'XC'],
		[50, 'L'],
		[40, 'XL'],
		[10, 'X'],
		[9, 'IX'],
		[5, 'V'],
		[4, 'IV'],
		[1, 'I']
	];

	// Test if string is a valid roman numeral
	var rom = '^((CM|CD)|(D)?(C){0,3})((XC|XL)|(L)?(X){0,3})((IX|IV)|(V)?(I){0,3})$';
	var romanRegExp = new RegExp(rom ,'mi');
	if(romanRegExp.test(romanNumeral)) {
		var n = 0;
		for (var i = 0; i < romanNumerals.length; ++i){
			for (var x = romanNumerals[i], l = x[1].length; romanNumeral.substr(0,l).toUpperCase() == x[1]; romanNumeral = romanNumeral.substr(l).toUpperCase()) 
                n += x[0];
		}
		return n;
	}
	else {
		return romanNumeral;
	}
};

bible.Reference = function () {

	var 
		_bookIndex = -1,
		_chapter1 = -1,
		_verse1 = -1,
		_chapter2 = -1,
		_verse2 = -1,
		args = arguments;

	if (args.length === 0) {
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
	};
};