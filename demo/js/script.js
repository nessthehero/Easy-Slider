(function() {
	var preload = [
		'../img/ajax-loader.gif'
	];
	var preImages = [];
	for (x in preload) {
		preImages[x] = new Image();
		preImages[x].src = preload[x]
	}
});

$(function() {	

	if (window.location.href.indexOf('xml/') != -1) {
		var pB = '/xml/prebuilt/';
	} else {
		var pB = '/prebuilt/';
	}
	
	$('.body-tab-callout .tab-container').accessibleTabs({
		tabhead: 'h2',
		syncheights: false,
		saveState: true,
		fx: 'fadeIn'
	});
	
	// WYSIWYG image captions
	// To use, apply this style to any image in a wysiwyg
	$('.give-image-caption').each(function(index) {
		if (!$(this).is("img")) {
			$(this).find("img").captify({
				capPadding: 15
			});
		} else {
			$(this).captify({
				capPadding: 15
			});
		}
	});		
	
	/* $('select.custom').customStyle();	*/
	setTimeout(function() {
		$('select.custom').dropkick();
	}, 400);
	
	// Social Media Icon tooltips
	$('.social.icon a').qtip({
		content: false,
		style: {
			name: 'red',
			tip: 'bottomRight'
		},
		position: {
			corner: {
				target: 'topLeft',
				tooltip: 'bottomRight'
			}
		}
	});

	// Index search
	$('.search-toggle').on('click', function() {
		var parent = $(this).parent();
		parent.toggleClass('open');
	});
	
	// Site search
	$(document).slashSearch({selector: '#site-search'});
	$('#search-container a').on('click', function() {
		var parent = $(this).parent();
		parent.toggleClass('open');
		
		if (parent.hasClass('open')) {
			$('#header-search').slideDown();
		} else {
			if (($('#site-search').val() != '') && ($('#site-search').val() != $('#site-search')[0].defaultValue)) {
				$('#header-search-form').submit();
			} else {
				$('#header-search').slideUp();
			}
		}
	});
	$('#site-search').focus(function() {	
		if (!$('#search-container').hasClass('open')) {
			$('#search-container').addClass('open');
			$('#header-search').slideDown();
		}
	});
	$('#site-search').focus(function() {	
		if ($(this).val() == $(this)[0].defaultValue) {
			$(this).val('');	
		}
	}).blur(function() {
		if ($(this).val() == '') {
			$(this).val($(this)[0].defaultValue);	
		}
	});
	
	// Alert message
	$('#alert-tab').on('click', function() {
		if ($('#alert-message').hasClass('open')) {
			$('#alert-message').removeClass('open');	
		} else {
			$('#alert-message').addClass('open');	
		}
	});
	
	$('.paged-results').superPager({
		pageSize			:	25,
		topPaging			:	false,
		nextText			:   '>',
		prevText			:   '<',
		statusLocation		:   'bottom',
		showAll				:	'true',
		truncate			:   true
	});
	
	/* Zoom */
	var zoomLevel;
	if (Modernizr.sessionstorage) {
		zoomLevel = sessionStorage.getItem('zoomLevel');
		if (zoomLevel !== null) {
			if (zoomLevel == 'larger') {
				$('#main').addClass('zoom');
				$('#larger').addClass('enabled');
				$('#smaller').removeClass('enabled');			
			} else {
				$('#main').removeClass('zoom');
				$('#smaller').addClass('enabled');
				$('#larger').removeClass('enabled');
			}
		} else {
			sessionStorage.setItem('zoomLevel', $('#controls .enabled').attr('id'));
		}
	}
	
	$('#smaller, #larger').on('click', function() {
		$('#main').toggleClass('zoom');
		$('#smaller, #larger').toggleClass('enabled');
		
		if (Modernizr.sessionstorage) {
			sessionStorage.setItem('zoomLevel', $('#controls .enabled').attr('id'));
		}
	});
	
	$('a.component-slideshow').fancybox(
	{
		showNavArrows: true,
		centerOnScroll: true,
		overlayOpacity: 0.85,
		overlayColor: '#000',
		padding: 0,
		cyclic: true
	});	
	
	// Convert to embed URL so that videos work in NOJS situations.
	$('a.component-video').attr('href',function() {
		return 'http://www.youtube.com/embed/'+$(this).attr('data-youtubeid')+'?autoplay=1';
	}).fancybox(
	{
		width: '75%',
		height: '75%', 
		autoScale: false,
		type: 'iframe',
		showNavArrows: false,
		centerOnScroll: true,
		overlayOpacity: 0.85,
		overlayColor: '#000',
		padding: 0,
	});

	// Convert to embed URL so that videos work in NOJS situations.
	$('a.component-htmlfive').each(function(index) {
		var link = $(this);
		
		if ($.browser.msie) { // IE hates HTML5, so we force feed it a flash player.

			var h = parseInt(link.attr('data-height'),10)+4; // Add 4 for some weird reason.
			var w = parseInt(link.attr('data-width'),10);

			$(this).attr('href',function() {
				return pB + 'ajax/flow.htm?mp4='+$(this).attr('data-mpfour')+'&amp;width='+link.attr('data-width')+'&amp;height='+link.attr('data-height');
			});

		} else {

			var h = parseInt(link.attr('data-height'),10); // Add 66 to account for video controls
			var w = parseInt(link.attr('data-width'),10);

			$(this).attr('href',function() {
				return pB + 'ajax/vidjs.htm?mp4='+$(this).attr('data-mpfour')+'&amp;ogv='+$(this).attr('data-ogv')+'&amp;webm='+$(this).attr('data-webm')+'&amp;poster='+$(this).attr('data-poster')+'&amp;width='+link.attr('data-width')+'&amp;height='+link.attr('data-height');
			});

		}
		
		$(this).fancybox({
			width: w,
			height: h,
			autoScale: false,
			type: 'iframe',
			showNavArrows: false,
			centerOnScroll: true,
			overlayOpacity: 0.85,
			overlayColor: '#000',
			padding: 0
		});
	});

	var tmp = 0;
	$('li', '#school-minor-callouts').each(function(index) {
		if (tmp < $(this).height()) {
			tmp = $(this).height();
		}
	});
	$('li', '#school-minor-callouts').css('height', tmp);

});

// Powers downloading a .ics file for Outlook
function downloadICS(vcal) {
		
	var bb = new BlobBuilder;		
	bb.append(vcal);
	saveAs(bb.getBlob("text/calendar;charset="+document.characterSet), "event.ics");		

}