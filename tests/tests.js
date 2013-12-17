/* brackets - xunit: qunit */

/** Parse tests **/

// Whole book
module('Whole books');

// single chapter
test("single chapter 3Jo", function() {
    var resultRef = bible.parseReference('3Jo');
    var expectedResults = {bookIndex: 63, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("single chapter Ob", function() {
    var resultRef = bible.parseReference('Ob');
    var expectedResults = {bookIndex: 30, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

// multiple chapter
test("single chapter Haggai", function() {
    var resultRef = bible.parseReference('Haggai');
    var expectedResults = {bookIndex: 36, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("single chapter Genesis", function() {
    var resultRef = bible.parseReference('Genesis');
    var expectedResults = {bookIndex: 0, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

// Chapters
module('Chapters');
// single chapter
test("single chapter before 1Pe 1. after", function() {
    var resultRef = bible.parseReference('1Pe 1.');
    var expectedResults = {bookIndex: 59, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});
 
test("single chapter before Gen 1 after", function() {
    var resultRef = bible.parseReference('Gen 1');
    var expectedResults = {bookIndex: 0, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("single chapter book before 2Jo 1 after", function() {
    var resultRef = bible.parseReference('2Jo 1');
    var expectedResults = {bookIndex: 62, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("single chapter before John 1 after ", function() {
    var resultRef = bible.parseReference('John 1');
    var expectedResults = {bookIndex: 42, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("single chapter with period before John 1. after ", function() {
    var resultRef = bible.parseReference('John 1.');
    var expectedResults = {bookIndex: 42, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("single chapter with comma before John 1, after ", function() {
    var resultRef = bible.parseReference('John 1,');
    var expectedResults = {bookIndex: 42, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

// multiple chapters
test("multiple chapter Genesis 1-3", function() {
    var resultRef = bible.parseReference('Genesis 1-3');
    var expectedResults = {bookIndex: 0, chapter: 1, chapter1: 1, chapter2: 3, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});


// Verses
module('Verses');
// single verse
test("single verse multiple chapter Genesis 1:3", function() {
    var resultRef = bible.parseReference('Genesis 1:3');
    var expectedResults = {bookIndex: 0, chapter: 1, chapter1: 1, chapter2: -1, verse: 3, verse1: 3, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("single verse single chapter book before Jude 5 after", function() {
    var resultRef = bible.parseReference('Jude 5');
    var expectedResults = {bookIndex: 64, chapter: 1, chapter1: 1, chapter2: -1, verse: 5, verse1: 5, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

// multiple verses
test("multiple verse single chapter 3 JOhn 13-14 after", function() {
    var resultRef = bible.parseReference('3 JOhn 13-14');
    var expectedResults = {bookIndex: 63, chapter: 1, chapter1: 1, chapter2:1, verse: 13, verse1: 13, verse2: 14};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("multiple verse multiple chapter colon before John 1:10-20 after ", function() {
    var resultRef = bible.parseReference('John 1:10-20');
    var expectedResults = {bookIndex: 42, chapter: 1, chapter1: 1, chapter2: 1, verse: 10, verse1: 10, verse2: 20};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("multiple verse multiple chapter period before John 1.10-20 after ", function() {
    var resultRef = bible.parseReference('John 1:10-20');
    var expectedResults = {bookIndex: 42, chapter: 1, chapter1: 1, chapter2: 1, verse: 10, verse1: 10, verse2: 20};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("multiple verse multiple chapter colon before John 1:10&ndash;20 after ", function() {
    var resultRef = bible.parseReference('John 1:10&ndash;20');
    var expectedResults = {bookIndex: 42, chapter: 1, chapter1: 1, chapter2: 1, verse: 10, verse1: 10, verse2: 20};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("multiple verse multiple chapter period before John 1.10&ndash;20 after ", function() {
    var resultRef = bible.parseReference('John 1.10&ndash;20');
    var expectedResults = {bookIndex: 42, chapter: 1, chapter1: 1, chapter2: 1, verse: 10, verse1: 10, verse2: 20};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

// Whole book
module('Roman Whole books');

// single chapter
test("single chapter iii Jo", function() {
    var resultRef = bible.parseReference('iii Jo');
    var expectedResults = {bookIndex: 63, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("single chapter no space roman fails iiiJo", function() {
    var resultRef = bible.parseReference('iiiJo');
    var expectedResults = {bookIndex: -1, chapter: -1, chapter1: -1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

// Chapters
module('Roman Chapters');
// single chapter
test("single chapter before 1Pe I. after", function() {
    var resultRef = bible.parseReference('1Pe I.');
    var expectedResults = {bookIndex: 59, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("single chapter before 1Pe i. after", function() {
    var resultRef = bible.parseReference('1Pe i.');
    var expectedResults = {bookIndex: 59, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});
 
test("single chapter before Gen i after", function() {
    var resultRef = bible.parseReference('Gen i');
    var expectedResults = {bookIndex: 0, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("single chapter book before 2Jo i after", function() {
    var resultRef = bible.parseReference('2Jo i');
    var expectedResults = {bookIndex: 62, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("single chapter before John i after ", function() {
    var resultRef = bible.parseReference('John i');
    var expectedResults = {bookIndex: 42, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("single chapter with period before John i. after ", function() {
    var resultRef = bible.parseReference('John i.');
    var expectedResults = {bookIndex: 42, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("single chapter with comma before John i, after ", function() {
    var resultRef = bible.parseReference('John i,');
    var expectedResults = {bookIndex: 42, chapter: 1, chapter1: 1, chapter2: -1, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

// multiple chapters
test("multiple chapter Genesis i-iii", function() {
    var resultRef = bible.parseReference('Genesis i-iii');
    var expectedResults = {bookIndex: 0, chapter: 1, chapter1: 1, chapter2: 3, verse: -1, verse1: -1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});


// Verses
module('Verses');
// single verse
test("single verse multiple chapter Genesis i:iii", function() {
    var resultRef = bible.parseReference('Genesis i:iii');
    var expectedResults = {bookIndex: 0, chapter: 1, chapter1: 1, chapter2: -1, verse: 3, verse1: 3, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("single verse single chapter book before Jude v after", function() {
    var resultRef = bible.parseReference('Jude v');
    var expectedResults = {bookIndex: 64, chapter: 1, chapter1: 1, chapter2: -1, verse: 5, verse1: 5, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

// multiple verses
test("multiple verse single chapter 3 JOhn xiii-xiv after", function() {
    var resultRef = bible.parseReference('3 JOhn xiii-xiv');
    var expectedResults = {bookIndex: 63, chapter: 1, chapter1: 1, chapter2:1, verse: 13, verse1: 13, verse2: 14};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("multiple verse multiple chapter colon before John 1:10-20 after ", function() {
    var resultRef = bible.parseReference('John i:10-20');
    var expectedResults = {bookIndex: 42, chapter: 1, chapter1: 1, chapter2: 1, verse: 10, verse1: 10, verse2: 20};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("multiple verse multiple chapter period before John 1.10-20 after ", function() {
    var resultRef = bible.parseReference('John i:10-20');
    var expectedResults = {bookIndex: 42, chapter: 1, chapter1: 1, chapter2: 1, verse: 10, verse1: 10, verse2: 20};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("multiple verse multiple chapter colon before John i:x&ndash;xx after ", function() {
    var resultRef = bible.parseReference('John i:10&ndash;20');
    var expectedResults = {bookIndex: 42, chapter: 1, chapter1: 1, chapter2: 1, verse: 10, verse1: 10, verse2: 20};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("multiple verse multiple chapter period before John 1.10&ndash;20 after ", function() {
    var resultRef = bible.parseReference('John i.10&ndash;20');
    var expectedResults = {bookIndex: 42, chapter: 1, chapter1: 1, chapter2: 1, verse: 10, verse1: 10, verse2: 20};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});


// Verses
module('Roman Psalms');

test("Psalm i. 1", function() {
    var resultRef = bible.parseReference('Psalm i. 1');
    var expectedResults = {bookIndex: 18, chapter: 1, chapter1: 1, chapter2: -1, verse: 1, verse1: 1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("Psalm v. 1", function() {
    var resultRef = bible.parseReference('Psalm v. 1');
    var expectedResults = {bookIndex: 18, chapter: 5, chapter1: 5, chapter2: -1, verse: 1, verse1: 1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("Psalm xlvi. 1", function() {
    var resultRef = bible.parseReference('Psalm xlvi. 1');
    var expectedResults = {bookIndex: 18, chapter: 46, chapter1: 46, chapter2: -1, verse: 1, verse1: 1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("Psalm lvii. 1", function() {
    var resultRef = bible.parseReference('Psalm lvii. 1');
    var expectedResults = {bookIndex: 18, chapter: 57, chapter1: 57, chapter2: -1, verse: 1, verse1: 1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("Psalm viii. 1", function() {
    var resultRef = bible.parseReference('Psalm viii. 1');
    var expectedResults = {bookIndex: 18, chapter: 8, chapter1: 8, chapter2: -1, verse: 1, verse1: 1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("Psalm xcix. 1", function() {
    var resultRef = bible.parseReference('Psalm xcix. 1');
    var expectedResults = {bookIndex: 18, chapter: 99, chapter1: 99, chapter2: -1, verse: 1, verse1: 1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("Psalm x. 1", function() {
    var resultRef = bible.parseReference('Psalm x. 1');
    var expectedResults = {bookIndex: 18, chapter: 10, chapter1: 10, chapter2: -1, verse: 1, verse1: 1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("Psalm cxi. 1", function() {
    var resultRef = bible.parseReference('Psalm cxi. 1');
    var expectedResults = {bookIndex: 18, chapter: 111, chapter1: 111, chapter2: -1, verse: 1, verse1: 1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});

test("Psalm 138. 1", function() {
    var resultRef = bible.parseReference('Psalm 138. 1');
    var expectedResults = {bookIndex: 18, chapter: 138, chapter1: 138, chapter2: -1, verse: 1, verse1: 1, verse2: -1};
    equal(resultRef.bookIndex, expectedResults.bookIndex);
    equal(resultRef.chapter, expectedResults.chapter);
    equal(resultRef.chapter1, expectedResults.chapter1);
    equal(resultRef.chapter2, expectedResults.chapter2);
    equal(resultRef.verse, expectedResults.verse);
    equal(resultRef.verse1, expectedResults.verse1);
    equal(resultRef.verse2, expectedResults.verse2);
});
