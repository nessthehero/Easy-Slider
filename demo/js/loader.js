// Include this file after plugins.js and jQuery

if (window.location.href.indexOf('xml/') != -1) {
  var pB = '/xml/prebuilt/';
} else {
  var pB = '/prebuilt/';
}

// Accessible Tabs
$.lazy({
  src: pB + 'js/mylibs/jquery.tabs.min.js',
  name: 'accessibleTabs',
  dependencies: {
		js: [pB + 'js/mylibs/jquery.cookie.js', pB + 'js/mylibs/jquery.syncheight.js']
  }
});

// Cookies - Also loaded seperately because it is very useful
$.lazy({
  src: pB + 'js/mylibs/jquery.cookie.js',
  name: 'cookie'
});

// Sync Height - Also loaded seperately because it is very useful
$.lazy({
  src: pB + 'js/mylibs/jquery.syncheight.js',
  name: 'syncHeight'
});

// nivoSlider
/* $.lazy({
  src: 'js/mylibs/jquery.nivo.slider.pack.js',
  name: 'nivoSlider'	
}); */


// easySlider
$.lazy({
	src: pB + 'js/mylibs/jquery.easySlider.js',
	name: 'easySlider'
});


/*$.lazy({
  src: 'js/mylibs/jquery.mousewheel-3.0.4.pack.js',
  name: 'mousewheel'	
});*/

// Fancybox
$.lazy({
  src: pB + 'js/mylibs/jquery.fancybox-1.3.4.pack.js',
  name: 'fancybox',
  dependencies: {
		css: [pB + 'js/mylibs/css/fancy/jquery.fancybox-1.3.4.css']
  }
});

// Captify (Image Captions)
$.lazy({
  src: pB + 'js/mylibs/jquery.captify.js',
  name: 'captify'
});

// Custom Select Box
/*
$.lazy({
  src: 'js/mylibs/jquery.customselect.js',
  name: 'customStyle',
  dependencies: {
		css: ['js/mylibs/css/customdrop/customDropdown.css']
  }
}); */

// DropKick.js - custom select boxes
$.lazy({
  src: pB + 'js/mylibs/jquery.dropkick-1.0.0.js',
  name: 'dropkick',
  dependencies: {
		css: [pB + 'js/mylibs/css/dropkick/dropkick.css']
  }
});

// jPlayer
$.lazy({
  src: pB + 'js/mylibs/jquery.jplayer.js',
  name: 'jPlayer',
  dependencies: {
		css: [pB + 'js/mylibs/css/jplayer/jplayer.duquesne.css']
  }
});

// Static Pager
$.lazy({
  src: pB + 'js/mylibs/jquery.paging.js',
  name: 'superPager'
});

// QTip
$.lazy({
  src: pB + 'js/mylibs/jquery.qtip.js',
  name: 'qtip'
});

// onImagesLoad
$.lazy({
  src: pB + 'js/mylibs/jquery.onImagesLoad.min.js',
  name: 'onImagesLoad'
});

// Draggable
$.lazy({
  src: pB + 'js/mylibs/jquery.ui.draggable.js',
  name: 'draggable'
});