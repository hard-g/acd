var jQuery = require('jquery');
var $ = require('jquery');
var _ = require('underscore');

var Overlay = (function($, _) {
    'use strict';

    var def = function($el) {
        this.$els = {
           trigger: $('.js-trigger', $el),
           overlay: $('.document-preview-overlay', $el),
           close: $('.close', $el)
        };
      
        this.states = {
            active : 'active'
        };

        init.call(this);
    };

    var init = function() {
        this.bind();
    };

    def.prototype = {
        bind : function() {
            var self = this;
            setTimeout(function(context) {
                var $ = window.jQuery || window.$;
                $('img', context.$els.overlay).each(function() {
                    $(this).on('click', function(e) {

                        // e.preventDefault();
                        $('body').append('<div class="fuller-bleed"><div class="panzoom-parent"><div class="inner-img panzoom" style="background-image: url('+$(this).attr('src')+');"></div></div><div class="controls"><div class="zoom-in"><svg xmlns="http://www.w3.org/2000/svg" width="102" height="102" viewBox="0 0 102 102"><g fill="none" fill-rule="evenodd" stroke="#FBD3BB" stroke-linecap="square" stroke-width="2"><path d="M26.76 48.44h48.274M51.103 75.068V25.976"/></g></svg></div><div class="zoom-out"><svg xmlns="http://www.w3.org/2000/svg" width="51" height="3" viewBox="0 0 51 3"><path fill="none" fill-rule="evenodd" stroke="#FBD3BB" stroke-linecap="square" stroke-width="2" d="M.87 1.485h48.274"/></svg></div></div><section class="close-container close"><div class="close-icon"><svg xmlns="http://www.w3.org/2000/svg" width="72" height="71" viewBox="0 0 72 71"><g fill="none" fill-rule="evenodd" stroke="#FBD3BB" stroke-linecap="square" stroke-width="2"><path d="M20.358 16.862l34.135 34.135M18.742 52.904L53.455 18.19"></path></g></svg></div></section></div>');
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

            this.$els.trigger.on('click', _.bind(this.toggle, this));
            this.$els.close.each(function() {
                $(this).on('click', _.bind(self.toggle, self));
            });
            $(document).keyup(function(e) {
                if(e.keyCode === 27 && self.$els.overlay.hasClass(self.states.active)) {
                    if($('.fuller-bleed').length) {
                        $('.fuller-bleed').remove();
                        $('.zoomContainer').remove();
                    } else {
                        self.toggle();
                    }
                }
            });
        },
        toggle: function() {
           this.$els.overlay.toggleClass(this.states.active);
           if(this.$els.overlay.hasClass(this.states.active)) {
            if($('body').hasClass('home')) {
                $('nav.main').hide();
            }
            $('body').addClass('no-scroll');
           } else {
            $('nav.main').show();
            $('body').removeClass('no-scroll');
           }
        }
    };

    return def;
})(jQuery, _);

module.exports = Overlay;
