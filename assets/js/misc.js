(function($) {
  'use strict';
  $(function() {
    var body = $('body');
    var contentWrapper = $('.content-wrapper');
    var scroller = $('.container-scroller');
    var footer = $('.footer');
    var sidebar = $('.sidebar');

    //Add active class to nav-link based on url dynamically
    //Active class can be hard coded directly in html file also as required

    function addActiveClass(element) {
      if (current === "") {
        //for root url
        if (element.attr('href').indexOf("index.html") !== -1) {
          element.parents('.nav-item').last().addClass('active');
          if (element.parents('.sub-menu').length) {
            element.closest('.collapse').addClass('show');
            element.addClass('active');
          }
        }
      } else {
        //for other url
        if (element.attr('href').indexOf(current) !== -1) {
          element.parents('.nav-item').last().addClass('active');
          if (element.parents('.sub-menu').length) {
            element.closest('.collapse').addClass('show');
            element.addClass('active');
          }
          if (element.parents('.submenu-item').length) {
            element.addClass('active');
          }
        }
      }
    }

    var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
    $('.nav li a', sidebar).each(function() {
      var $this = $(this);
      addActiveClass($this);
    })

    $('.horizontal-menu .nav li a').each(function() {
      var $this = $(this);
      addActiveClass($this);
    })

    //Close other submenu in sidebar on opening any

    sidebar.on('show.bs.collapse', '.collapse', function() {
      sidebar.find('.collapse.show').collapse('hide');
    });


    //Change sidebar and content-wrapper height
    applyStyles();

    function applyStyles() {
      //Applying perfect scrollbar
      if (!body.hasClass("rtl")) {
        if ($('.settings-panel .tab-content .tab-pane.scroll-wrapper').length) {
          const settingsPanelScroll = new PerfectScrollbar('.settings-panel .tab-content .tab-pane.scroll-wrapper');
        }
        if ($('.chats').length) {
          const chatsScroll = new PerfectScrollbar('.chats');
        }
        if (body.hasClass("sidebar-fixed")) {
          var fixedSidebarScroll = new PerfectScrollbar('#sidebar .nav');
        }
      }
    }

    $('[data-toggle="minimize"]').on("click", function() {
      if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
        body.toggleClass('sidebar-hidden');
      } else {
        body.toggleClass('sidebar-icon-only');
      }
    });

    //checkbox and radios
    $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');

    //fullscreen
    $("#fullscreen-button").on("click", function toggleFullScreen() {
      if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    })
  });
})(jQuery);

  const shareData = {
          title: "Trex - An initiative to educate the aged population about tech tools and gadgets",
          text: "Voluntary Request to join, suggest and share an initiative that educates the aged population about tech tools and gadgets",
          url: "https://trexa.netlify.app",
        };
        
        const btn = document.querySelector(".share");
        const resultPara = document.querySelector(".result");
        
        // Share must be triggered by "user activation"
        btn.addEventListener("click", async () => {
          try {
            await navigator.share(shareData);
            resultPara.textContent = "Shared successfully";
          } catch (err) {
            resultPara.textContent = `Error: ${err}`;
          }
        });

 var Cookie = {
	set: function (name, value, days) {
		var domain, domainParts, date, expires, host;

		if (days) {
			date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = "; expires=" + date.toGMTString();
		} else {
			expires = "";
		}

		host = location.host;
		if (host.split(".").length === 1) {
			// no "." in a domain - it's localhost or something similar
			document.cookie = name + "=" + value + expires + "; path=/";
		} else {
			// Remember the cookie on all subdomains.
			//
			// Start with trying to set cookie to the top domain.
			// (example: if user is on foo.com, try to set
			//  cookie to domain ".com")
			//
			// If the cookie will not be set, it means ".com"
			// is a top level domain and we need to
			// set the cookie to ".foo.com"
			domainParts = host.split(".");
			domainParts.shift();
			domain = "." + domainParts.join(".");

			document.cookie =
				name + "=" + value + expires + "; path=/; domain=" + domain;

			// check if cookie was successfuly set to the given domain
			// (otherwise it was a Top-Level Domain)
			if (Cookie.get(name) == null || Cookie.get(name) != value) {
				// append "." to current domain
				domain = "." + host;
				document.cookie =
					name + "=" + value + expires + "; path=/; domain=" + domain;
			}
		}
	},

	get: function (name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(";");
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == " ") {
				c = c.substring(1, c.length);
			}

			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	},

	erase: function (name) {
		Cookie.set(name, "", -1);
	}
};

function googleTranslateElementInit() {
	let url = new URL(window.location);
	let lang = url.searchParams.get("lang");
	if (lang) {
		console.log(lang);
		Cookies.set("googtrans", `/en/${lang}`, { path: "" });
		Cookie.set("googtrans", `/en/${lang}`);
		Cookies.set("googtrans", `/en/${lang}`, { path: "", domain: location.host });
	} else {
		Cookie.erase("googtrans");
		Cookies.remove("googtrans", { path: "" });
	}
	new google.translate.TranslateElement({ pageLanguage: "en" }, "translate");
	// add event listener to change url param on language selection change
	let langSelector = document.querySelector(".goog-te-combo");
	langSelector.addEventListener("change", function () {
		let lang = langSelector.value;
		var newurl =
			window.location.protocol +
			"//" +
			window.location.host +
			window.location.pathname +
			"?lang=" +
			lang;
		window.history.pushState({ path: newurl }, "", newurl);
	});
}
document.addEventListener("DOMContentLoaded", function () {
	(function () {
		Cookie.erase("googtrans");
		var googleTranslateScript = document.createElement("script");
		googleTranslateScript.type = "text/javascript";
		googleTranslateScript.async = true;
		googleTranslateScript.src =
			"//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
		(
			document.getElementsByTagName("head")[0] ||
			document.getElementsByTagName("body")[0]
		).appendChild(googleTranslateScript);
	})();
});
