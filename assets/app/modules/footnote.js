var jQuery = require('jquery');
var $ = require('jQuery');
var _ = require('Underscore');

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

            this.$els.each(function(i) {
                $(this).unwrap();
                console.log($(this).prev() );
                $(this).appendTo($(this).prev());
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