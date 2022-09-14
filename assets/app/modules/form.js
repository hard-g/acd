var jQuery = require('jquery');
var $ = require('jQuery');
var _ = require('Underscore');
var validator = require('validator');


var validators = {
    // email: {
    //     func: validator.isEmail,
    //     message: 'Enter a valid email.'
    // },
    required: {
        func: function(val) {
            return val.length > 0;
        },
        message: 'Required field.'
    },
    isWhiteSpace: {
        func: function(val) {
            return /^\s+$/.test(val);
        },
        message: 'Cannot be left blank.'
    },
    isEmail: {
        func: function(val) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            return regex.test(val);
        },
        message: 'Email address seems invalid'
    }
};

var Form = (function($, _) {
    'use strict';

    var def = function($el) {
        this.$el = $el;
        this.$els = $('input[type="text"], input[type="email"], textarea', $el);
        this.$submitter = $('.form-submit', $el);

        this.vlds = [];

        this.states = {
            active : 'is-valid',
            error : 'is-error'
        };

        init.call(this);
    };

    var init = function() {
        this.bind();
    };

    def.prototype = {
        bind : function() {
            var self = this;

            hwe.intercom.listen('reset-forms', function() {
                self.$els.each(function() {
                    $(this).parent().removeClass('is-error is-valid');
                });
                self.setSubmitOff();
            });
            this.$els.each(function() {
                if(!$(this).hasClass('no-validate')) {
                    $(this).parent().append('<div class="validator-message"></div>');
                    self.vlds.push($(this));

                    $(this).on('focusout', function(e) {
                        self.runValidator($(this));
                    });
                }
            });

            this.$submitter.parent().addClass('is-unavailable');
        },
        runValidator : function($el) {
            var self = this;
            var thisisAnEmail = false;
            // if($el.val() != '') {

                var isValid = validators['required']['func']($el.val());
                var isWhite = validators['isWhiteSpace']['func']($el.val());
                if($el.parent().hasClass('email')) {
                    thisisAnEmail = true;
                    console.log('is an email', $el);
                    var isEmail = validators['isEmail']['func']($el.val());
                    console.log(isEmail);
                }
        
                if(!isValid && !thisisAnEmail) {
                    $('.validator-message', $el.parent()).html(validators['required'].message).addClass('is-active');
                } else if(isWhite && !thisisAnEmail) {
                    $('.validator-message', $el.parent()).html(validators['isWhiteSpace'].message).addClass('is-active');
                } else if(!isEmail && thisisAnEmail) {
                    $('.validator-message', $el.parent()).html(validators['isEmail'].message).addClass('is-active');
                } else {
                    $('.validator-message', $el.parent()).removeClass('is-active');
                }
                $el.parent().addClass('is-valid');
                $el.parent().removeClass('is-error');

                this.checkAll();

                if(!isValid || (thisisAnEmail && !isEmail) || isWhite) {
                    this.setSubmitOff();
                }

                return this;
            // }
        },
        checkAll : function() {
            var self = this;
            var i = 0;
            _.each(this.vlds, function(item) {
                if($(item).parent().hasClass('is-valid')) {
                    i++;
                }
            });
            if(i === this.vlds.length) {
                this.setSubmitOn();
            }
        },
        setSubmitOn : function() {
            var self = this;
            if(!$('.validator-message.is-active').length) {
                this.$submitter.parent().removeClass('is-unavailable');
                this.$submitter.addClass('is-available').parent().addClass('is-available');
                this.$submitter.on('click', function() {
                    $('input[type="submit"]', self.$el).trigger('click');
                });
            }
        },

        setSubmitOff : function() {
            this.$submitter.parent().addClass('is-unavailable');
            this.$submitter.removeClass('is-available').parent().removeClass('is-available');
            this.$submitter.off('click');
        }
    };

    return def;
})(jQuery, _);

module.exports = Form;