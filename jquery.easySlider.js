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

            // Put your initialization code here
            base.readyShow();
			base.buildPager();
			base.bindEvents();
			
			if (base.options.autorotate) {
				base.rotTimeout = setTimeout(function() {
					base.next();
				}, base.options.timing);
			}
			
        };
		
		base.readyShow = function() {
			
			// Remove current class if it is assigned
			$(base.options.slide, base.$el).removeClass(base.options.currentClass);
			
			console.log(base.first);
			
			// "Preloading" the first slide. They see a loading animation until the image is fully loaded. There 
			// might be a flash of the image filling in on certain browsers, but they will not see the image while it is barely loaded.
			if (base.options.preload) {
				
				base.$el.append('<div class="loading"><img src="'+base.options.loadimage+'" alt="Loading..." /></div>');
				
				base.first.find('img').load('/'+base.first.find('img').attr('src'), function() {
					base.$el.find('ul').css('opacity','0');
			//		base.$el.hide();
					base.setupImages();					
					setTimeout(function() { 
						base.$el.find('ul').animate({'opacity':'1'}, 1000, 'linear'); 
						base.$el.find('.loading').remove();
					}, 1000);
			//		setTimeout(function() { base.$el.fadeIn('slow'); }, 1000);
					
				});
					
			} else {
				base.setupImages();	
			}			
			
		}
		
		base.buildPager = function() {
			
			if (base.options.paging) {
				base.$el.append("<div class='pager'><ul><li class='"+base.options.prevSelector+"'><a class='ir' href='javascript:;'>"+base.options.prevText+"</a></li><li class='"+base.options.nextSelector+"'><a class='ir' href='javascript:;'>"+base.options.nextText+"</a></li></ul></div>");
			}	
			
		}
		
		base.bindEvents = function() {
		
			if (base.options.paging) {
				$('.'+base.options.prevSelector + ' a', base.$el).on('click', function() {
					
					base.prev();
					
				});
				
				$('.'+base.options.nextSelector + ' a', base.$el).on('click', function() {
					
					base.next();
					
				});
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
				case 'fade':
				default: 
					currentSlide.fadeTo(base.options.speed, 0).css('zIndex', 300);
					nextSlide.css('zIndex', 400).fadeTo(base.options.speed, 1, function () {
						$(base.options.slide,base.$el).removeClass(base.options.currentClass);
						$(this).addClass(base.options.currentClass);
						base.auto();
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
				case 'fade':
				default: 
					currentSlide.fadeTo(base.options.speed, 0).css('zIndex', 300);
					prevSlide.css('zIndex', 400).fadeTo(base.options.speed, 1, function () {
						$(base.options.slide,base.$el).removeClass(base.options.currentClass);
						$(this).addClass(base.options.currentClass);
						base.auto();
					});				
					break;
			}
			
		}	
	
		base.init();
	
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
		loadimage: '',
		loadbg: ''
    };

    $.fn.easySlider = function(options)
    {
        return this.each(function()
        {
            (new $.easySlider(this, options));

        });
    };
	
})(jQuery);