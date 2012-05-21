// JavaScript Document

// jQuery Captify Plugin
// Copyright (C) 2009 Brian Reavis
// Licenced under the MIT license
// $Date: 2009-11-30 [Mon, 30 Nov 2009] $
jQuery.fn.extend({
	captify: function(uo) {
		var o = $.extend({
			prefix: '',						// text/html to be placed at the beginning of every caption
			opacity: '0.45',				// opacity of the caption on mouse over
			className: 'caption-bottom',	// the name of the CSS class to apply to the caption box         
			position: 'bottom',				// position of the caption (top or bottom)         
			spanWidth: '100%',				// caption span % of the image
			capPadding: 0					// Padding of caption
		}, uo);
		$(this).each(function() {
			var img = this;
			$(this).load(function() {
				if (img.hasInit){ return false; }
				img.hasInit = true;
				var over_caption = false;
				var over_img = false;
				
				// Get image top and bottom padding
				var imgPadTop = $(img).css('padding-top'),
					imgPadBot = $(img).css('padding-bottom');

				//pull the label from another element if there is a 
				//valid element id inside the rel="..." attribute, otherwise,
				//just use the text in the alt="..." attribute.
				var captionLabelSrc = $('#' + $(this).attr('rel'));
				var captionLabelHTML = !captionLabelSrc.length ? $(this).attr('alt') : captionLabelSrc.html();
				captionLabelSrc.remove();
				var toWrap = this.parent && this.parent.tagName == 'a' ? this.parent : $(this);
				
				var wrapper = 
					toWrap.wrap('<div></div>').parent()
					.addClass('caption-wrapper')
					.width($(this).width())
					.css({position: 'relative'})
					/*.height($(this).height())*/;

				//transfer the margin and border properties from the image to the wrapper
				$.map(['top', 'right', 'bottom', 'left'], function(i) {
					wrapper.css('margin-' + i, $(img).css('margin-' + i));
					wrapper.css('padding-' + i, $(img).css('padding-' + i));
					$.map(['style', 'width', 'color'], function(j) {
						var key = 'border-' + i + '-' + j;
						wrapper.css(key, $(img).css(key));
					});
				});
				
				wrapper.css('float', $(img).css('float'));
				
				$(img).css({ float: ''});				
				$(img).css({ border: '0 none' });
				$(img).css({ padding: '0' });
				$(img).css({ margin: '0' });
					
				var captionContent = $('div:last', wrapper.append('<div></div>'))
					.addClass(o.className)
					.append(o.prefix)
					.css({
						width: ($(this).width() - (o.capPadding*2)),
						padding: o.capPadding,
						position: 'absolute'
					})
					.append(captionLabelHTML);
					
				switch (o.position) {
					default:		// Default to bottom
					case 'bottom':
						captionContent.css({'bottom': imgPadBot});
						break;
					case 'top':
						captionContent.css({'top': imgPadTop});
						break;	
				}

				$('*', wrapper).css({ margin: 0 });

			});
			//if the image has already loaded (due to being cached), force the load function to be called
			if (this.complete || this.naturalWidth > 0) {
				$(img).trigger('load');
			}
		});
	}
});