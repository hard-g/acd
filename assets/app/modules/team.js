var jQuery = require('jquery');
var $ = require('jQuery');
var _ = require('Underscore');

var Team = (function($, _) {
    'use strict';

    var def = function() {
        this.$els = {
            'el' : $('.team-wrap'),
            'items' : $('.team-member')
        };
        this.states = {
            active : 'is-active'
        };

        init.call(this);
    };

    var init = function() {
        this.bind();
    };

    def.prototype = {
        bind : function() {
            var self = this;
            this.$els.items.each(function() {
                var $el = $(this);

                if(hwe.isDesktop) {
                    $(this).on('click', function(e) {
                        self.toggle($(this));
                    });
                }
                if(hwe.isMobile) {
                    $(this).on('touchstart', function(e) {
                        self.toggle($(this));
                    });
                }
            });
        },
        toggle: function($el) {
            var self = this;
            var active = false;
            if($el.hasClass(self.states.active)) {
                active = true;
            }
            this.$els.items.each(function() {
                $(this).removeClass(self.states.active);
            });
            $el.toggleClass(this.states.active, !active);
        }
    };

    return def;
})(jQuery, _);

module.exports = Team;