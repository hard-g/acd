var jQuery = require('jquery');
var $ = require('jquery');
var _ = require('underscore');

var NewThing = (function($, _) {
    'use strict';

    var def = function($el) {
        this.$el = $el;
        this.$els = $('h2', $el);

        this.states = {

        };

        init.call(this);
    };

    var init = function() {
        if(!hwe.isMobile) {
            setTimeout(function(context) {
                $('body').scrollTop(0);
                context.setup();
            }, 1750, this);
        }
        $(window).on('resize', _.bind(this.setup, this));
        this.bind();
        hwe.intercom.listen('mobile', _.bind(this.destroy, this));
    };

    def.prototype = {
        setup: function() {
            $('.hero .slice-50:nth-child(2) .header-main, .hero .slice-50:first-child .header-main').removeAttr('style');
            var self = this;
            setTimeout(function() {
                    var w = $(window).width() / 2,
                    h = $('.hero').height() - 70,
                    rO = $('.hero .slice-50:nth-child(2) .header-main').offset().left,
                    lO = $('.hero .slice-50:first-child .header-main').offset().left,
                    lW = $('.hero .slice-50:first-child .header-main').innerWidth(),
                    rW = $('.hero .slice-50:nth-child(2) .header-main').innerWidth(),

                    rT = $('.hero .slice-50:nth-child(2) .header-main').offset().top,
                    lT = $('.hero .slice-50:first-child .header-main').offset().top,
                    lH = $('.hero .slice-50:first-child .header-main').height(),
                    rH = $('.hero .slice-50:nth-child(2) .header-main').height();

                var topAdjust;
                if(hwe.isFirefox) {
                    topAdjust = 5;
                } else {
                    topAdjust = 0;
                }
                $('.inner.right').css({
                    'left': Math.abs(parseFloat(w - rO)),
                    'margin-left': -Math.abs(parseFloat(rW * 7)) + 'px',
                    'top': Math.abs(parseFloat(rT - rH) + topAdjust),
                    'margin-top': -Math.abs(parseFloat(rH * 8)) + 'px'
                });
                $('.inner.left').css({
                    'left': Math.abs(parseFloat(w - lO)),
                    'margin-left': -Math.abs(parseFloat(lW * 7)) + 'px',
                    'top': Math.abs(parseFloat(lT - lH) + topAdjust),
                    'margin-top': -Math.abs(parseFloat(lH * 8)) + 'px'
                });

                // abs pos attempt
                var f_l_L = $('.inner.left .slice-row').eq(6).find('h2.grid-pos-7').offset().left;
                var f_l_T = $('.inner.left .slice-row').eq(6).find('h2.grid-pos-7').offset().top;

                var f_r_L = $('.inner.right .slice-row').eq(7).find('h2.grid-pos-7').offset().left;
                var f_r_T = $('.inner.right .slice-row').eq(7).find('h2.grid-pos-7').offset().top;

                $('.hero .slice-50:first-child .header-main').css({
                    'position':'absolute',
                    'top': f_l_T,
                    'left': f_l_L
                });
                $('.hero .slice-50:nth-child(2) .header-main').css({
                    'position':'absolute',
                    'top': f_r_T,
                    'left': f_r_L
                });
            }, 25);
        },
        bind: function() {
            var $els = $('.inner.right h2, .inner.left h2');
            var fades = 0;
            var timer;

            $els.each(function(i) {
                $(this).on('mouseover', function() {
                    $(this).addClass('fade');
                    fades++;
                    if(fades <= 10) {
                        timer = 11;
                    } else if(fades > 20) {
                        timer = _.random(3, 20);
                    } else {
                        timer = _.random(fades - (fades/ 2), fades);
                    }
                    $(this).data('timeout', setTimeout(function(context) {
                            $(context).removeClass('fade');
                            fades--;
                        }, timer * 90, this));
                });
            })
        },
        destroy: function() {
            // nothing yet
        }
    };

    return def;
})(jQuery, _);

module.exports = NewThing;