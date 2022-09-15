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
            this.$els.trigger.on('click', _.bind(this.toggle, this));
            this.$els.close.each(function() {
                $(this).on('click', _.bind(self.toggle, self));
            });
            $(document).keyup(function(e) {
                if(e.keyCode === 27 && self.$els.overlay.hasClass(self.states.active)) {
                    self.toggle();
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