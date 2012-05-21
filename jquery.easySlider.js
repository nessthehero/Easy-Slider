// JavaScript Document
/*

Easy Slider

Ian Moffitt - 2012

License: http://www.opensource.org/licenses/mit-license.html

*/
(function($) {
	$.easySlider = function(el, options) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // constants

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
		
		base.init = function()
        {

            base.options = $.extend({},$.easySlider.defaultOptions, options);	
			
			// Stored Values
			base.length = $(base.options.slide, base.$el).length;	

			base.rotTimeout = 0;
			base.first = $(base.options.slide, base.$el).eq(0);

			// If there is only one thing, turn off autorotate and paging.
			if (base.length == 1) {
				base.options.autorotate = false;
				base.options.paging = false;
			}

			// If auto rotate is false, but there are more than one slides, we better turn paging back on.
			if (base.options.autorotate === false && base.length != 1) {
				base.options.paging = true;
			}

            // Put your initialization code here
            base.readyShow();

			base.options.start(base);	

			if (base.options.autorotate) {
				base.rotTimeout = setTimeout(function() {
					base.next();
				}, (base.options.timing * 2));
			}

			base.$el.find('.pager').show();
			
        };
		
		base.readyShow = function() {
			
			// Remove current class if it is assigned
			$(base.options.slide, base.$el).removeClass(base.options.currentClass);
					
			// "Preloading" the first slide. They see a loading animation until the image is fully loaded. There 
			// might be a flash of the image filling in on certain browsers, but they will not see the image while it is barely loaded.
			if (base.options.preload && (!$.browser.msie && $.browser.version != "8.0")) {
				
				base.$el.append('<div class="loading"><img src="'+base.options.loadimage+'" alt="Loading..." /></div>');
				
				switch (base.options.preloadMethod) {
					
					case 'img':	
						// console.log(escape(base.first.find('img').attr('src')));
						// base.first.find('img').load(escape(base.first.find('img').attr('src')), function(text, status, xmlr) {
						// 	if (status == "success") {
						// 		base.$el.find('ul').css('opacity','0');
						// 		base.setupImages();					
						// 		setTimeout(function() { 
						// 			base.$el.find('ul').animate({'opacity':'1'}, 1000, 'linear'); 
						// 			base.$el.find('.loading').remove();
						// 		}, 1000);
						// 	}
						// });
						base.$el.onImagesLoad( function($selector) {

							base.$el.find('ul').css('opacity','0');
							base.setupImages();					
							setTimeout(function() { 
								base.$el.find('ul').animate({'opacity':'1'}, 1000, 'linear'); 
								base.$el.find('.loading').remove();

								base.fireTrigger("done");
							}, 1000);							
						
						});
						break;
					
					case 'bg':
						// I'm so sorry . . . okay it's not that bad
						var bgSrc = '/' + base.first.css('backgroundImage').toString().replace(/url\(/,'').replace(/\)/,'').replace(/"/g,'').replace(/https?:\/\/(.+)\.com\//,'').toString();
						var bgImg = new Image();
						bgImg.onload = function() {
							base.$el.find('ul').css('opacity','0');
							base.setupImages();					
							setTimeout(function() { 
								base.$el.find('ul').animate({'opacity':'1'}, 1000, 'linear'); 
								base.$el.find('.loading').remove();

								base.fireTrigger("done");
							}, 1000);							
						}
						bgImg.src = bgSrc;			
						// base.first.load(escape(bgImg.src), function() {
						// 	if (status == "success") {
						// 		base.$el.find('ul').css('opacity','0');
						// 		base.setupImages();					
						// 		setTimeout(function() { 
						// 			base.$el.find('ul').animate({'opacity':'1'}, 1000, 'linear'); 
						// 			base.$el.find('.loading').remove();
						// 		}, 1000);
						// 	}
						// });
						break;
				}
					
			} else {
				base.setupImages();
				base.fireTrigger("done");
			}			
			base.buildPager();
			base.bindEvents();
						
		}
		
		base.buildPager = function() {			

			if (base.options.paging) {
					
				var pager =	$("<div></div>")
						.addClass('pager')
						.css('display','none')
						.attr('data-slider-id', base.$el.attr('id'))
						.append(
							$("<ul></ul>")
								.append(
									$("<li></li>")
										.addClass(base.options.prevSelector)
										.append(
											$("<a></a>")
												.addClass('ir')
												.attr('href','javascript:;')
												.html(base.options.prevText)
										)
								)
								.append(
									$("<li></li>")
										.addClass(base.options.nextSelector)
										.append(
											$("<a></a>")
												.addClass('ir')
												.attr('href','javascript:;')
												.html(base.options.nextText)
										)
								)
						);
						
					base.$el.prepend(pager);				
				
			}	
			
		}
		
		base.bindEvents = function() {
		
			if (base.options.paging) {

				$('.'+base.options.prevSelector + ' a', base.$el).on('click', function(e) {
					e.preventDefault();
					base.options.before('prev', base);
					base.prev();
				});
				
				$('.'+base.options.nextSelector + ' a', base.$el).on('click', function(e) {
					e.preventDefault();
					base.options.before('next', base);
					base.next();
				});
			}
			
		}

		base.fireTrigger = function(event) {
			
			switch (event) {
				case "done":
					base.$el.trigger('ez-done', [
						{
							id: base.$el.attr('id')
						}
					]);
					break;
				case "change":
					base.$el.trigger('ez-change', [
						{
							id: base.$el.attr('id')
						}
					]);
					break;
				default:
					break;
			}			

		}
		
		base.setupImages = function() {

			$(base.options.slide, base.$el).each(function(index) {
				if (base.options.startIndex <= base.length && base.options.startIndex != 0) {
					if (index != (base.options.startIndex - 1)) {
						$(this).css({
							'zIndex':'300',
							'opacity':0
						})
					} else {
						$(this).css('zIndex','400').addClass(base.options.currentClass);
					}
				} else {
					if (index != 0) {
						$(this).css({
							'zIndex':'300',
							'opacity':0
						});
					} else {
						$(this).css('zIndex','400').addClass(base.options.currentClass);
					}
				}
			});	
			
			base.$el.find('.pager').show();
		}
		
		base.auto = function() {
			if (base.options.autorotate) {
				clearTimeout(base.rotTimeout);
				base.rotTimeout = setTimeout(function() {
					base.next();
				}, base.options.timing);
			}
		}
		
		base.next = function() {
		
			var	currentSlide = $('.'+base.options.currentClass, base.$el),
				index = currentSlide.index() + 1, 
				next;
	
			if ((index + 1) > base.length) { next = 1; } else { next = index + 1; }	
			
			var nextSlide = $(base.options.slide+':nth-child('+next+')', base.$el);			
			
			switch (base.options.effect) {
				case 'none':
					currentSlide.hide();
					nextSlide.show(function () {
						$(base.options.slide,base.$el).removeClass(base.options.currentClass);
						$(this).addClass(base.options.currentClass);
						base.auto();
						base.options.after('next', base);

						base.fireTrigger('change');
					});					
					break;
				case 'fade':
				default: 
					currentSlide.fadeTo(base.options.speed, 0).css('zIndex', 300);
					nextSlide.css('zIndex', 400).fadeTo(base.options.speed, 1, function () {
						$(base.options.slide,base.$el).removeClass(base.options.currentClass);
						$(this).addClass(base.options.currentClass);
						base.auto();
						base.options.after('next', base);

						base.fireTrigger('change');
					});					
					break;
			}						
			
		}
		
		base.prev = function() {
		
			var currentSlide = $('.'+base.options.currentClass,base.$el),
				index = currentSlide.index() + 1, 
				prev;
	
			if ((index - 1) == 0) { prev = base.length; } else { prev = index - 1; }
			
			var prevSlide = $(base.options.slide+':nth-child('+prev+')',base.$el);
			
			switch (base.options.effect) {
				case 'none':
					currentSlide.hide();
					prevSlide.show(function () {
						$(base.options.slide,base.$el).removeClass(base.options.currentClass);
						$(this).addClass(base.options.currentClass);
						base.auto();
						base.options.after('next', base);

						base.fireTrigger('change');
					});					
					break;
				case 'fade':
				default: 
					currentSlide.fadeTo(base.options.speed, 0).css('zIndex', 300);
					prevSlide.css('zIndex', 400).fadeTo(base.options.speed, 1, function () {
						$(base.options.slide,base.$el).removeClass(base.options.currentClass);
						$(this).addClass(base.options.currentClass);
						base.auto();
						base.options.after('prev', base);

						base.fireTrigger('change');
					});				
					break;
			}		

		}	
	
		base.init();

		base.$el.data('easy-slide', base);

		return base;
	
	}
	
	$.easySlider.defaultOptions = 
    {
    	effect: 'fade',
		slide: '.slide',
		currentClass: 'current-ez-slide',
		startIndex: 1,
		paging: true,
		nextText: 'next',
		prevText: 'prev',
		nextSelector: 'ez-next',
		prevSelector: 'ez-prev',
		speed: 600,
		timing: 3000,
		autorotate: true,
		preload: false,
		preloadMethod: 'img',
		loadimage: '',
		start: function() {},
		end: function() {},
		before: function() {},
		after: function() {}
    };

    $.fn.easySlider = function(options)
    {
        return this.each(function()
        {
            (new $.easySlider(this, options));

        });
    };
	
})(jQuery);

/**
 * jQuery 'onImagesLoaded' plugin v1.2.0 (Updated December 1, 2011)
 * Fires callback functions when images have loaded within a particular selector.
 *
 * Copyright (c) Cirkuit Networks, Inc. (http://www.cirkuit.net), 2008-2011.
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * For documentation and usage, visit "http://www.cirkuit.net/projects/jquery/onImagesLoad/"
 */
(function(b){b.fn.onImagesLoad=function(d){"function"==typeof d&&(d={all:d});var a=this;a.opts=b.extend({},b.fn.onImagesLoad.defaults,d);if(a.opts.selectorCallback&&!a.opts.all)a.opts.all=a.opts.selectorCallback;if(a.opts.itemCallback&&!a.opts.each)a.opts.each=a.opts.itemCallback;a.bindEvents=function(c,d,f){if(0===c.length)a.opts.callbackIfNoImagesExist&&f&&f(d);else{var e=[];c.jquery||(c=b(c));c.each(function(a){var g=this.src;if(!b.browser.msie)this.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
b(this).bind("load",function(){0>jQuery.inArray(a,e)&&(e.push(a),e.length==c.length&&f&&f.call(d,d))});if(b.browser.msie){if(this.complete||void 0===this.complete)this.src=g}else this.src=g})}};var e=[];a.each(function(){if(a.opts.each){var c;c="IMG"==this.tagName?this:b("img",this);a.bindEvents(c,this,a.opts.each)}a.opts.all&&("IMG"==this.tagName?e.push(this):b("img",this).each(function(){e.push(this)}))});a.opts.all&&a.bindEvents(e,this,a.opts.all);return a.each(function(){})};b.fn.onImagesLoad.defaults=
{all:null,each:null,callbackIfNoImagesExist:!1}})(jQuery);