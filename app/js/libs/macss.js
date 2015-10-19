/* -----------------------------------------------------------------------------
   Funciones de Ayuda para Javascaript
------------------------------------------------------------------------------ */

(function(window, document, undefined){

	window.macss = function(selector){
		if(selector === '' || selector === '.' || selector === '#')
			return null;

		var elem = document.querySelector(selector);
		if(!elem)
			return null;

		elem.hasClass = function(cn){
		  return (' ' + elem.className + ' ').indexOf(' ' + cn + ' ') !== -1;
		};

		elem.addClass = function(cn){
		  if (!elem.hasClass(cn)) {
				elem.className = (elem.className === '') ? cn : elem.className + ' ' + cn;
		  }
		};

		elem.removeClass = function(cn){
			cn = (' ' + elem.className + ' ').replace(' ' + cn + ' ', ' ');
		  elem.className = cn.trim();
		};

		elem.toggleClass = function(cn) {
		  var fn = elem.hasClass(cn) ? elem.removeClass : elem.addClass;
		  fn(cn);
		};

		elem.hasParent = function(selector){
			if (elem) {
				do {
					//if (elem.id == document.querySelector(selector).id)
					if (elem.nodeType === 9) {
						break;
					}
					if (elem.matches(selector)){
						return true;
					}
				}
				while((elem = elem.parentNode));
			}
			return false;
		};
		elem.closest = function(selector) {
			if (!elem) {
				return null;
			}
			do {
				if (elem.matches(selector)) {
					return elem;
				}
				if (elem.nodeType === 9) {
					break;
				}
			}
			while((elem = elem.parentNode));
		};
		elem.matches = function(selector) {
			var p = Element.prototype;
			var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
				return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
			};
			return f.call(elem, selector);
		};

		return elem;
	};
})(window, window.document);


/* -----------------------------------------------------------------------------
   Menu Responsive
------------------------------------------------------------------------------ */
(function(window, document, undefined){
	window.MenuResposive = (function(){
		var app = { };
		var openMenu = false;

		app.init = function(idBoton, nav){
			document.body.setAttribute('class', 'nav-responsive');
			document.getElementById(idBoton).addEventListener('click', app.toggleMenu, false);
			document.addEventListener('click', function(e){
				var targetId = "#" + e.target.id;
				if(targetId !== "#"){
	        if (openMenu && !macss(targetId).hasParent(nav)) {
						e.preventDefault();
						app.toggleMenu();
		      }
				} else {
					e.target.setAttribute('id', 'aux-target');
					if (openMenu && !macss('#aux-target').hasParent(nav)) {
						e.preventDefault();
						app.toggleMenu();
		      }
		   		e.target.removeAttribute('id');
				}
			}, true);
    };
    app.toggleMenu = function(e){
    	macss('body').toggleClass('nav-open');
    	if(macss('body').hasClass('nav-open')){
    		openMenu = true;
    	} else {
    		openMenu = false;
    	}
    	if(e){
    		e.preventDefault();
      }
	  };
    return app;
	})();
})(window, window.document);

window.addEventListener('load', function(){
	MenuResposive.init('boton-menu-movil', '#main-nav');
}, false);

