var jQuery = require('jquery');
var $ = require('jquery');
var _ = require('underscore');

var Footnote = (function($, _) {
    'use strict';

    var def = function() {
        this.$els = $('.footnote');
        init.call(this);
    };

    var init = function() {
        if(this.$els.length) {
            this.setup();
        }
    };

    def.prototype = {
        setup : function() {
            var self = this;
            console.log(this.$els.length);
						var $prev;

            this.$els.each(function(i) {
                if(!$(this).parent().hasClass('essay-content')) {
                    $(this).unwrap();
                }
                $prev = $(this).prev();
                if($('span.attr', $prev).length) {
                    $(this).appendTo($('span.attr span', $prev));
                } else {
                    $(this).appendTo($prev);
                }
                self.appendTrigger($(this), i);
            });
            this.$triggers = $('.footnote-trigger');
            this.bind();
        },
        appendTrigger: function($el, i) {
            $el.before('<span class="footnote-trigger">'+ parseInt(i+1) +'</span>');
        },
        bind: function() {
            var self = this;
            this.$triggers.each(function() {
                $(this).on('click', function() {
                    self.toggle($(this));
                });
            });
        },
        toggle: function($el) {
            $el.toggleClass('active');
            $el.next().toggleClass('active');
        }
    };

    return def;
})(jQuery, _);

module.exports = Footnote;
