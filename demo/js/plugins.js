// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

/**
 *	@name							Lazy
 *	@descripton						Lazy is Jquery plugin that lazy loads Jquery plugins. It will not load the plugin if the method is not used or the jQuery selector returns nothing.
 *	@version						1.5.1
 *	@requires						Jquery 1.2.6+
 *	@author							Jan Jarfalk jan.jarfalk@unwrongest.com
 *	@author							Ian Moffitt
 *
 *	@param {String} src				Path to the plugin you want to load
 *	@param {String} name			Function name of the plugin
 *	@param {Hash} dependencies		Hash with the keys js and css
 *		@param {Array} js			Array of paths to javascript dependencies
 *		@param {Array} css			Array of paths to css dependencies
 *	@param {Bool} cache				Enable or disable caching
 */
(function(a){a.lazy=function(b){if(typeof b.name=="string"){b.name=[b.name]}a.each(b.name,function(c){function o(){var c=this;j=arguments;if(a(c).length!=0){if(a.lazy.archive[d].status==="loaded"){a.each(this,function(){a(this)[e].apply(c,j)})}else if(a.lazy.archive[d].status==="loading"){a.lazy.archive[d].que.push({name:e,self:c,arguments:j})}else{a.lazy.archive[d].status="loading";if(b.dependencies){var f=b.dependencies.css||[],g=b.dependencies.js||[];var h=f.length+g.length;function i(b,d,f){var g=b.length,i;b=b.reverse();while(g--&&h--){i=b[g];if(typeof a.lazy.archive[i]=="undefined"){a.lazy.archive[i]={status:"unloaded",que:[]}}if(a.lazy.archive[i].status==="unloaded"){if(!h){d(i,function(){n(c,e,j)})}else{d(i)}}else if(!h){n(c,e,j)}}}i(f,l);i(g,m)}else{n(c,e,j)}}}return this}function n(b,c,e){function f(){if(typeof b=="object"){if(e.length>0){a(b)[c].apply(b,e)}else{a(b)[c]()}}else{a[c].apply(null,e)}a.each(a.lazy.archive[d].que,function(b){var c=a.lazy.archive[d].que[b];k[c.name].apply(c.self,c.arguments)});a.lazy.archive[d].que=[]}m(d,f,b,c,e)}function m(b,c,d,e,g){a.lazy.archive[b].status="loading";a.ajax({type:"GET",url:b,cache:f,dataType:"script",success:function(){a.lazy.archive[b].status="loaded";if(c){c(d,e,g)}}})}function l(b,c,d,e,f){a.lazy.archive[b].status="loading";var g=document.createElement("link");g.type="text/css";g.rel="stylesheet";g.href=b;g.media="screen";document.getElementsByTagName("head")[0].appendChild(g);a.lazy.archive[b].status="loaded";if(c)c(d,e,f)}var d=b.src,e=b.name[c],f=b.cache||true,g=b.isFunction||true,h=b.isMethod||true,i,j,k={};a.lazy.archive[d]={status:"unloaded",que:[]};k[e]=o;if(h){jQuery.fn.extend(k)}if(g){jQuery.extend(k)}})};a.lazy.archive={}})(jQuery);

/*
 *  Title: jQuery Slash Search plugin
 *  Author: Rémy Bach
 *  Version: 1.0
 *
 *  Description:
 *  All this plugin does is essentially allow you to bind the '/' key to go to the first search box on your page.
 *	This kind of functionality is used on quite a few sites.
 *
 *	License: MIT License - http://remybach.mit-license.org/
 */
(function($) {
	var defaults = {
		charCode:47, // default to '/'
		selector:'[name="search"]'
	};

	$.fn.slashSearch = function(options) {
		// If options were passed in, merge them with the defaults.
		$.extend(defaults, options || {});

		// Try find the search field on the page.
		var _search = $(this).find('input[type="search"]');

		if (_search.length === 0) { // Ok, that didn't work - try using the selector from our options
			_search = $(this).find(defaults.selector);
		}

		if (_search.length === 0) { // This still isn't working. Attempt to make some suggestions.
			var _msg = 'Maybe try $(document).slashSearch();';
			if (this.toString().match(/HTMLDocument/)) { // If they're already trying within the document scope...
				_msg = 'Maybe try passing in a selector as follows: $(document).slashSearch({ selector:\'input.search\' });';
			}

			if (window.console && console.info)console.info('Can\'t seem to find your search field within the context specified. '+_msg);
			return false;
		}

		this.keypress(function(e) {
			// If the user isn't trying to legitimately type & the key that was pressed matches
			if ($('input:focus, textarea:focus').length === 0 && e.charCode === defaults.charCode) {
				_search.focus();
				return false;
			}
		});

		return this;
	}
})(jQuery);

// onScreen jQuery plugin v0.2.1
// (c) 2011 Ben Pickles
//
// http://benpickles.github.com/onScreen
//
// Released under MIT license.
(function(a){a.expr[":"].onScreen=function(b){var c=a(window),d=c.scrollTop(),e=c.height(),f=d+e,g=a(b),h=g.offset().top,i=g.height(),j=h+i;return h>=d&&h<f||j>d&&j<=f||i>e&&h<=d&&j>=f}})(jQuery);

// Scroll to an ID
function goToByScroll(id){
     	$('html,body').animate({scrollTop: $("#"+id).offset().top},1000);
} 

// Grab the query string and throw it into a global variable
var uP = {};
(function () {
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

    while (e = r.exec(q))
       uP[d(e[1])] = d(e[2]);
})();