(function() {
	
	var bib = 'http://code.bib.ly/', 
		d = document, 
		css = d.createElement('link'), 
		h = d.getElementsByTagName('head')[0]; 
		
	css.rel ='stylesheet'; 
	css.href = bib + 'bibly.min.css'; 
	h.appendChild(css); 	
	
	bibly.startBibly();

})();