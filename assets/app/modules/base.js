var $ = require('jquery'),
    _ = require('underscore')
    inView = require('inview');

var Intercom = require('./lib/intercom.js');
// var Prism = require('./lib/prism.js');
// var AutoSize = require('./lib/autosize.min.js');
var Overlay = require('./overlay.js');
var Footnote = require('./footnote.js');
var FilterMenu = require('./filterMenu.js');
// var Menu = require('./menu.js');
// var TeamMembers = require('./team.js');
// var Form = require('./form.js');
// var NewThing = require('./newThings.js');
// var MoreWork = require('./moreWork.js');

window._ = _;

// base functions
base = (function($, _ , Intercom) {
    'use strict';

    var def = function(hwe) {
        var hwe = hwe;
        hwe.options = {};

        hwe.intercom = {};
        Intercom.installOn(hwe.intercom);

        // setup touch for mobile
        hwe.options.uAgent = navigator.userAgent;
        hwe.options.interaction = hwe.options.uAgent.match(/(iPad|iPhone|iPod)/g) ? 'touchstart' : 'click';

        init.call(this);
    };

    var init = function() {
        $(document).ready(function(){
            $('html, body').scrollTop(0);
        });

        const bgsLen = 6;
const bgStart = 1;
let i = bgStart;

setTimeout(function(context) {
                var $ = window.jQuery || window.$;
                $('.single .document-image img').each(function() {
                    $(this).on('click', function(e) {

                        e.preventDefault();
                        $('body').append('<div class="fuller-bleed"><div class="panzoom-parent"><div class="inner-img panzoom" style="background-image: url(' + $(this).data('originalImage') + ');"></div></div><div class="controls"><div class="zoom-in"><svg xmlns="http://www.w3.org/2000/svg" width="102" height="102" viewBox="0 0 102 102"><g fill="none" fill-rule="evenodd" stroke="#FBD3BB" stroke-linecap="square" stroke-width="2"><path d="M26.76 48.44h48.274M51.103 75.068V25.976"/></g></svg></div><div class="zoom-out"><svg xmlns="http://www.w3.org/2000/svg" width="51" height="3" viewBox="0 0 51 3"><path fill="none" fill-rule="evenodd" stroke="#FBD3BB" stroke-linecap="square" stroke-width="2" d="M.87 1.485h48.274"/></svg></div></div><section class="close-container close"><div class="close-icon"><svg xmlns="http://www.w3.org/2000/svg" width="72" height="71" viewBox="0 0 72 71"><g fill="none" fill-rule="evenodd" stroke="#FBD3BB" stroke-linecap="square" stroke-width="2"><path d="M20.358 16.862l34.135 34.135M18.742 52.904L53.455 18.19"></path></g></svg></div></section></div>');
                        var $section = $('.fuller-bleed');
                        var $panzoom = $section.find('.panzoom');
                          $panzoom.panzoom({
                            $zoomIn: $section.find(".zoom-in"),
                            $zoomOut: $section.find(".zoom-out"),
                            // panOnlyWhenZoomed: true,
                            transition: true,
                            duration: 200,
                            easing: "ease-in-out",
                            contain: 'invert',
                            minScale: 1
                          });
                            $panzoom.parent().on('mousewheel.focal', function( e ) {
                                e.preventDefault();
                                var delta = e.delta || e.originalEvent.wheelDelta;
                                var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
                                $panzoom.panzoom('zoom', zoomOut, {
                                  increment: 0.1,
                                  animate: false,
                                  focal: e
                                });
                            });
                        $('.close-container', $section).on('click', function() {
                            $('.fuller-bleed').remove();
                        });
                    })
                });
            }, 1000, this);

 // setTimeout(function(context) {
 //                var $ = window.jQuery || window.$;
 //                $('.single .document-image img').each(function() {
 //                    $(this).on('click', function(e) {
 //                        e.preventDefault();
 //                        $('body').append('<img src="'+$(this).attr('src')+'" class="fuller-bleed" />');
 //                        $('.fuller-bleed').on('click', function() {
 //                            $(this).remove();
 //                            $('.zoomContainer').remove();
 //                        }).elevateZoom({
 //                            zoomType: "inner",
 //                            cursor: "crosshair"
 //                        })
 //                        setTimeout(function() {
 //                            $('.fuller-bleed').trigger('mouseenter');
 //                        },100);
 //                    })
 //                });
 //            }, 1000, this);

setInterval(function() {
    if(i >bgsLen) {
        i = bgStart;
    }
    $('.bg').removeClass('active');
    $('.bg-'+i).addClass('active');
    i++;
}, 3600 );
$('.menu-main-nav-container').append('<div class="underlay"></div>');
$('.menu-main-nav-container .underlay').on('click', function() {
    $('.menu-label').trigger('click');
})

// if($('.page-template-archive-documents').length) {
    new FilterMenu();
// }

$('.controls-wrapper .search').on('click', function() {
    var $s = $('.search-box');
    $s.toggleClass('active');
    if($s.hasClass('active')) {
        $('.search-box').focus();
        $s.on('keyup', function(e) {
            // console.log(e);
            if(e.keyCode === 13 && $s.val().length >= 2) {
								var $searchForm = $s.closest( 'search-box-form' );
								if ( $searchForm.length ) {
									$searchForm.submit();
								}
            }
        })
    } else {
        $s.blur();
        $s.off('keydown');
    }
})

function hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
}

if (hasTouch()) { // remove all :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}

$('.menu-label').on('click', function() {
    $('.menu-main-nav-container').toggleClass('active');
    if($('.word-close').hasClass('visi')) {
        setTimeout(function() {
            $('.word-close').removeClass('visi');
        }, 85);
    } else {
        setTimeout(function() {
            $('.word-close').addClass('visi');
        }, 85);
    }
});

if($('body').hasClass('home')) {
    var h = $(window).height() * 0.85;
    $(window).on('scroll', function() {
        // console.log($(window).scrollTop());
        if($(window).scrollTop() >= h) {
            $('nav.main').addClass('visible');
        } else {
            $('nav.main').removeClass('visible');
        }
    })
}

var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('safari') != -1) {
  if (ua.indexOf('chrome') > -1) {
    // alert("1") // Chrome
  } else {
    $('body').addClass('safari');
    // $('.featured-items-home .document-preview').on('click', function() {
    //     $('.featured-items-home.image').toggleClass('visi');
    // })
}}

if($('body').hasClass('page-template-archive-documents') && $(window).width() >= 1024) {
    var $f = $('.filter-nav');
    var t = $f.offset().top;
    var h = $('nav.main').outerHeight();
    var wh = $(window).height();
    var s;

    $(window).on('scroll', function() {
        s = $(window).scrollTop();
        if ($f.hasClass('active')) {
            if(s >= t - h) {
                $('.filter-nav').addClass('fixed-yo');
                $('.filter-trigger').addClass('fixed-yo');
                if(s >= t - 6) {
                    $('.filter-trigger').addClass('stuck');
                } else {
                    $('.filter-trigger').removeClass('stuck');
                }
                $('.filters').addClass('top');
            } else {
                $('.filter-nav').removeClass('fixed-yo');
                $('.filter-trigger').removeClass('fixed-yo');
                $('.filters').removeClass('top');
            }
        }
    });
}
var fh = $('.filter-trigger').html();
$('.filter-trigger').on('click', function() {
    $(this).toggleClass('active');
    if($(this).hasClass('active')) {
        $(this).html('CLOSE');
    } else {
        $(this).html(fh);
        $('.filter-nav').removeClass('fixed-yo');
        $('.filter-trigger').removeClass('fixed-yo');
        $('.filters').removeClass('top');
    }
    $('.documents-container').toggleClass('under');
    $('.filter-nav').toggleClass('active');
})
        this.checkDimensions();
        this.utils();
        // this.menu();
        // this.team();
        // this.svg();
        // this.form();
        this.overlay();
        new Footnote();
        // this.videos();
        // this.rows();
        // this.inviews();
        // this.newthings();
        // this.moreWork();
        // window.hwe.inviews = this.inviews;
        // window.hwe.arrows = this.svg;
    };

    def.prototype = {

        checkDimensions: function() {
            hwe.isDesktop = $(window).width() >= 968;
            hwe.isMobile = $(window).width() <= 967;

            if(hwe.isDesktop) {
                hwe.intercom.broadcast('desktop', this);
            }

            if(hwe.isMobile) {
                hwe.intercom.broadcast('mobile', this);
            }
        },

        utils: function() {
            $(window).on('resize', _.bind(this.checkDimensions, this));

            // Target IE
            if (navigator.userAgent.indexOf('MSIE') >= 0 || navigator.userAgent.indexOf('Trident') >= 0) {
                document.getElementsByTagName("html")[0].className += ' ie';
            }

            // For use within normal web clients
            var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

            // For use within iPad developer UIWebView
            // Thanks to Andrew Hedges!
            var ua = navigator.userAgent;

            var isFirefox = typeof InstallTrigger !== 'undefined';
            hwe.isFirefox = isFirefox;


            if(Function('/*@cc_on return document.documentMode===10@*/')()){
                $('html').addClass('ie10');
            }

            // if(window.location.hash) {
            //     hwe.hash = window.location.hash;
            // }

            if(!hwe.isMobile) {
                // AutoSize(document.querySelectorAll('textarea'));
            }

            if(isIOS) {
                $('body').addClass('is-ipad');
            }

            if(isFirefox) {
                $('body').addClass('is-ff');
            } else {
                $('body').addClass('not-ff');
            }

            if($('body').hasClass('is-ipad') || $('body').hasClass('safari')) {
                $('.featured-items-home .js-trigger img').on('click', function() {
                    $('.featured-items-home.image').addClass('visi');
                    $('.close-container.close').on('click', function() {
                        $('.featured-items-home.image').removeClass('visi');
                    })
                })
            }

            // // file input hack
            // $('input[type="file"]').each(function() {
            //     $(this).attr('accept', '.pdf, .doc, .docx, .txt');
            //     $(this).parent().append('<p class="file"><a href="javascript:void(0);" class="file-trigger">Upload a document</a></p>');
            // });
            // $('.file-trigger').each(function() {
            //     var $selfTrigger = $(this);
            //     var $p = $(this).parent().parent();
            //     $p.css({
            //         'width': $('input[type="tel"]').width(),
            //         'position': 'relative',
            //         'display': 'inline-block'
            //     });
            //     hwe.intercom.listen('mobile', function() {
            //         $p.css({
            //             'width': 'auto'
            //         });
            //     });
            //     var $i = $('input[type="file"]', $p);
            //     $p.append('<div class="delete-file"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 54.5 53.8" enable-background="new 0 0 54.5 53.8" xml:space="preserve"> <g> <line fill="none" stroke="#00b4a2" stroke-width="2" x1="2.5" y1="52" x2="52" y2="2.5"></line> <line fill="none" stroke="#00b4a2" stroke-width="2" x1="52" y1="52" x2="2.5" y2="2.5"></line> </g> </svg> Remove file</div>');
            //     var $d = $('.delete-file', $p);
            //     $d.on('click', function() {
            //         $i.get(0).value = "";
            //         // $selfTrigger.addClass('new-val');
            //         $(this).addClass('removed');
            //         setTimeout(function($context) {
            //             $context.removeClass('active');
            //             $selfTrigger.html("Upload a document");
            //             $selfTrigger.removeClass("collapsed");
            //             // $selfTrigger.removeClass('new-val');
            //             setTimeout(function() {
            //                 $context.removeClass('removed');
            //             }, 150);
            //         }, 350, $(this));
            //     });

            //     $(this).on('click', function() {
            //         var $el = $(this);
            //         $i.trigger('click');
            //         $i.on('change', function() {
            //             var val = $(this).val().split('\\').pop();
            //             $el.addClass('new-val collapsed');
            //             setTimeout(function() {
            //                 $el.html(val);
            //                 $el.removeClass('new-val');
            //                 $('.delete-file', $p).addClass('active');
            //             }, 350);
            //         });
            //     });
            // });

        },

        inviews: function() {

            $('.inview-el').each(function() {
                var $el = $(this);
                var inview = $(this).data('inview', new inView($el.get(0), $el.offset().top, function(isInView, data) {
                    var opac, bottom;
                    // console.log(isInView, $el);
                    if (isInView) {
                        bottom = data.elementOffsetTop + data.inViewHeight;
                        opac = 1 - (data.elementOffsetTopInViewHeight / data.elementOffsetTop);
                        // opac = data.windowScrollTop / data.inViewHeight;
                        // console.log($el);
                        // console.log(data);
                        // console.log(opac);
                        if($el.hasClass('next-post') && !$el.hasClass('loading')) {
                                hwe.intercom.broadcast('inviewNext');
                                $el.addClass('loading');
                            }
                        if (data.elementOffsetTopInViewHeight < data.inViewHeight/2) {
                            $el.css('opacity', 1);
                            // console.log('in view (top half): ');
                            // reduce opacity
                            if($el.attr('data-url') != '' && $el.attr('data-url') != undefined) {
                                window.history.pushState(null,null,$el.attr('data-url'));
                            }

                        } else {
                            if(!hwe.isMobile) {
                                $el.css('opacity', (opac /2));
                            } else {
                                $el.css('opacity', 1);

                            }
                            // console.log('in view (bottom half)');
                            // increase opacity

                        }
                    } else {
                        if (data.windowScrollTop - (data.elementOffsetTop - data.inViewHeight) > data.inViewHeight) {
                            // console.log('not in view (scroll up)');
                        } else {
                            // console.log('not in view (scroll down)');
                        }
                    }
                }));
            });
        },

        overlay: function() {
            $('.document-preview').each(function() {
                new Overlay($(this));
            });
        },

        menu: function() {
            new Menu();
        },

        team: function() {
            if($('.team-wrap').length > 0) {
                new TeamMembers();
            }
        },

        svg: function() {
            $('.link-arrow').each(function() {
                if(!$(this).hasClass('wrapped')) {
                    $(this).addClass('wrapped').wrap('<div class="link-wrapper"></div>').parent().append('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 42 22.5" enable-background="new 0 0 42 22.5" xml:space="preserve"><g><line fill="none" stroke="#000000" stroke-width="2" x1="2.8" y1="11.1" x2="38.8" y2="11.1"/><polyline fill="none" stroke="#000000" stroke-width="2" points="30.5,19.5 39,11.1 30.5,2.6  "/></g></svg>');
                }
            });
        },

        form : function() {
            $('form').each(function() {
                new Form($(this));
            });
        },

        videos: function() {
            $('video').each(function() {
                $(this).get(0).muted = true;
            });
        },

        rows: function() {
            var self = this;
            if(!hwe.isMobile) {
                if ($('.js-gallery').length > 0) {
                    $('.js-gallery').each(function() {
                        var base = 50,
                            amount = $('.slice-50', this).length,
                            unit = 2,
                            rows = Math.ceil(amount / unit),
                            finalVal = (rows * base) + 'vw';

                        $(this).css('min-height', finalVal);
                    })

                    hwe.intercom.listen('mobile', function() {
                        $('.js-gallery'.removeAttr('style'));
                    });
                    hwe.intercom.listen('desktop', function() {
                        self.rows();
                    });
                }
            }
        },

        newthings: function() {
            if($('.new-things').length  && !hwe.isMobile) {
                hwe.newThings = new NewThing($('.new-things'));
            }
        },

        moreWork: function() {
            // if is work page
            if(window.location.pathname.indexOf('work') > -1) {
                new MoreWork();
            }
        }

    };

    return def;

}).call(this, $, _, Intercom);

module.exports = base;
