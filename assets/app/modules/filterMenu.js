var jQuery = require('jquery');
var $ = require('jquery');
var _ = require('underscore');

var FilterMenu = (function($, _) {
    'use strict';

    var def = function() {
        this.$apply = $('.js-button-apply');
        this.$clear = $('.js-button-clear');

        this.$items = $('.filter-nav .sub-menu .menu-item');

        this.$tagssss = $('.filter-container-bar .filter-item');

        this.subj = [];
        this.type = [];
        init.call(this);
    };

    var init = function() {
        this.bind();
    };

    def.prototype = {
        bind: function() {
            var self = this;
            this.$items.each(function() {
                $(this).on('click', function() {
                    $(this).toggleClass('active');
                })
            });
            this.$apply.on('click', function() {
                self.gatherParams();
            });
            this.$clear.on('click', function() {
                self.emptyParams();
            });

            this.$tagssss.each(function() {
                $(this).on('click', function() {
                    self.untoggleAndGoSingle($(this).attr('data-rel'));
                });
            })
        },
        untoggleAndGoSingle: function(which) {
            $('.filter-nav .sub-menu .menu-item .boxer[data-rel="'+which+'"]').parent().removeClass('active');
            this.gatherParams();
        },
        emptyParams: function() {
            this.$items.each(function() {
                $(this).removeClass('active');
            });
            this.subj = [];
            this.type = [];
        },
        gatherParams: function() {
            var self = this;
            this.$items.each(function() {
                if($(this).hasClass('active')){
                    let $rel = $('.boxer', this);
                    let type = $rel.attr('data-type');
                    let value = $rel.attr('data-rel');
                    // console.log($('.boxer', this).attr('data-rel'));

                    self[type].push(value);
                }
            });
            this.buildUrl();
        },
        buildUrl: function() {
            var subjs, types;
            if(this.subj.length) {
                subjs = 'subject='+this.subj.join('_');
            } else {
                subjs = '';
            }

            if(this.type.length) {
                types = 'type='+this.type.join('-');
            } else {
                types = '';
            }

            window.location = window.location.origin + window.location.pathname + '?'+types+'&'+subjs;
        }

    };

    return def;
})(jQuery, _);

module.exports = FilterMenu;
