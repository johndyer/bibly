## bib.ly
bib.ly helps you easily create links to Bible verses and automatically create Bible popups on your website.

### Can I choose a new Bible destination site?
You checked the box that makes bib.ly always take you to the same site, but you can turn that off by clicking the button [here](http://bib.ly/#remove-cookie-block).

### How do I make a link to a Bible verse?
Just type in http://bib.ly/ and then add the book name and the chapter and verse after that:

http://bib.ly/2Th1.2

You can also add a version to the end of it:

http://bib.ly/La3.25.NET

### How do I add bib.ly popups to my site?
bib.ly can automatically find Bible references like these and add popups to them: Zp 2:3; John 6:10; Ec 12:11

To easily add bib.ly to your site, you can install the Wordpress plugin or Drupal plugin. You can also manually add bib.ly to your site by adding the following two lines of code somewhere on your site (details).

```html
<script src="http://code.bib.ly/bibly.min.js"></script>
<link href="http://code.bib.ly/bibly.min.css" rel="stylesheet" />
```

Here's an example doctrinal statement with lots of Bible verses linked up.

There's also a bib.ly bookmarklet that you can find on the [bib.ly homepage](http://bib.ly/).

### How is this different from other Bible URL sites?
Most Bible reference links take visitors to a specific website (youversion.com, biblia.com, etc.). But when your friends click on a bib.ly URL, they are taken to a page that lets them choose the Bible website they prefer for reading. You can specify a translation, but they get to choose the website or software they like best.

### Build process
Concatenate the following into build/bibly.js
 - bibly.copyright.js
 - '\n'
 - bible.js
 - '\n'
 - bible.reference.js
 - '\n'
 - bibly.js

### Any features planned for the future?
A "remember my favorite site" checkbox so bib.ly will always take you where you want to go, languages other than English, apocryphal books, and visual trending to name a few.

### Anything else I should know?
When creating links, you should use only periods (.), underscores (_) and dashes (-). You can use a colon (:) if you want, but some websites like Twitter won't recognize it as a valid URL.

The popups currently only offer the following versions: ESV, NET, KJV, and LEB. We're working on making more available soon.

### Who made this?
I'm John Dyer, and I like to make Bible-related tools. You can find our more about me here: http://j.hn/

Copyright John Dyer 2015