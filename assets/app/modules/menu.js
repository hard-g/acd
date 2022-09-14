var jQuery = require('jquery');
var $ = require('jQuery');
var _ = require('Underscore');

var Menu = (function($, _) {
    'use strict';


    var def = function() {
        this.$el = $('.main-menu');
        this.$control = $('.menu-controls .hamburger');
        this.$close = $('.menu-controls .close');

        this.states = {
            active : 'is-expanded',
            min : 'is-collapsed',
            logoReady: 'min-logo',
            mobileOpen: 'mobile-open'
        };

        this.first = false;

        init.call(this);
    };

    var init = function() {
        if(hwe.isMobile) {
            this.expand();
            this.$el.css('opacity', 1);
        }
        setTimeout(function(context) {
            $('body').scrollTop(0);
            context.bind();
        },100, this);
    };

    def.prototype = {
        bind : function() {
            var self = this;
            var menuHeight = $('.main-menu').outerHeight(true);
            var threshold;
            if($('body').hasClass('home')) {
                threshold = ($(window).height() * 0.9) - menuHeight;
            } else  {
                threshold = 0;
            }
            var buffer = 10;
            var toShow = threshold+buffer+menuHeight;
            
            var lastScrollTop = 0;
            $(window).scroll(function(event){
               var st = $(this).scrollTop();
               // current scroll is greater than last scroll, and current scroll is greater or equal to threshold
               if (st > lastScrollTop  && st >= threshold) {
                   //buffer exists to stop pushing off screen just when out of view
                    if(st <= toShow ) {
                        self.$el.css({
                            'top': -Math.abs(st - threshold)
                        });
                    } else {
                        self.$el.css({
                            'top': -Math.abs(menuHeight),
                            'opacity': 0
                        });
                    }
               }
               // current scroll is greater or equal to threshold 
               else if(st>=threshold) {
                    if(st < lastScrollTop) {
                        // show
                        self.$el.css({
                            'top': 0,
                            'opacity': 1,
                            'background': 'white'
                        }).addClass(self.states.active);
                    } 
               }
               if(st<=menuHeight && st < lastScrollTop ) {
                    self.$el.css({
                        'background': 'rgba(255,255,255,'+ st/menuHeight +')'
                    }).removeClass(self.states.active);
               }
               if(st < 0) { // safari fix for negative elastic scroll
                lastScrollTop = lastScrollTop;
               } else {
                lastScrollTop = st;
               }
            });

            this.$control.on('click', function() {
                self.$el.addClass(self.states.mobileOpen);
            });
            this.$close.on('click', function() {
                self.$el.removeClass(self.states.mobileOpen);
            });
        },
        collapse: function() {
            if(!this.first) {
                setTimeout(function(context) {
                    $('.logo').addClass(context.states.logoReady);
                }, 1000, this);
            }
            this.$el.addClass(this.states.min).removeClass(this.states.active);
            this.first = true;
        },
        expand: function() {
            this.$el.removeClass(this.states.min).addClass(this.states.active);
        }
    };

    return def;
})(jQuery, _);

module.exports = Menu;