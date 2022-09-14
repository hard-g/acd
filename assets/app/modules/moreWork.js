var jQuery = require('jquery');
var $ = require('jQuery');
var _ = require('Underscore');

var MoreWork = (function($, _) {
    'use strict';

    var def = function($el) {
        this.$el = $el;
        this.$els = $('h2', $el);

        this.states = {

        };

        init.call(this);
    };

    var init = function() {
        setTimeout(function() {
            $('html, body').scrollTop(0);
            $('.inview-manual').addClass('visible');
        }, 2500);
        this.setup();
    };

    def.prototype = {
        setup: function() {
            var self = this;
            $.getJSON('http://'+window.location.hostname+'/wp-json/wp/v2/work', function(res) {
                self.posts = res;
                //curent post
                var path = window.location.pathname.split('work/').pop().split('/')[0];

                window.res = res;
                if(path.length) {
                    var single = _.filter(res, function(item) { return item.slug == path})[0];
                    res.push(res.splice(0, res.indexOf(single)));
                    self.santResults = _.flatten(res); 
                } else {
                    self.santResults = res;
                }

                self.currentPost = {'post': self.santResults[0], "index": 0};

                self.bind();
            });
        },
        bind: function() {
            var self = this;
            hwe.intercom.listen('inviewNext', _.bind(this.loadNext, this));

            $(window).on('scroll', function() {
                if($(window).scrollTop() <= 20 && window.location.href.indexOf('work') > -1) {
                    window.history.pushState(null,null,$('.work-item').eq(0).attr('data-url'));
                }
            })
        },
        loadNext: function() {
            var self = this;
            var $el = $('.next-post'),
                $wI;


            if(this.currentPost.index + 1 <= self.santResults.length - 1) {
                $.getJSON('http://'+window.location.hostname+'/wp-json/work/v1/'+self.santResults[self.currentPost.index + 1].id, function(res) {
                    $wI = $('<div class="work-item-outer inview-el" data-url="'+self.santResults[self.currentPost.index + 1].link.split(window.location.hostname).pop()+'">'+res+'</div>');
                    $wI.insertBefore($el);
                    self.currentPost = {'post': self.santResults[self.currentPost.index + 1], 'index': self.currentPost.index + 1};
                    setTimeout(function() {
                        
                        $wI.addClass('active');
                        $el.removeClass('loading');
                        setTimeout(function() {
                            var top = $wI.offset().top;
                            $el.data('inview').destroy('next-post inview-el');
                            $el.removeClass('inview').css('opacity', 0);
                            window.hwe.arrows();

                            if(self.currentPost.index + 1 < self.santResults.length) {

                                var inview = $el.data('inview', new inView($el.get(0), $el.offset().top, function(isInView, data) {
                                    var opac, bottom;
                                    // console.log(isInView, $el);
                                    if (isInView) {
                                        if($el.hasClass('next-post') && !$el.hasClass('loading')) {
                                            hwe.intercom.broadcast('inviewNext');
                                            $el.addClass('loading');
                                        }
                                        if($el.hasClass('previous-post')) {
                                            hwe.intercom.broadcast('inviewPrevious');
                                        }
                                 
                                        // console.log(opac);
                                        if (data.elementOffsetTopInViewHeight < data.inViewHeight/2) {
                                            // console.log('in view (top half): ');
                                            // reduce opacity
                                            console.log($el.attr('data-url'));
                                            window.history.pushState(null,null,$el.attr('data-url'));

                                        } else {
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
                                 var inview = $wI.data('inview', new inView($wI.get(0), $wI.offset().top, function(isInView, data) {
                                    var opac, bottom;
                                    // console.log(isInView, $el);
                                    if (isInView) {
                                  
                                        if (data.elementOffsetTopInViewHeight < data.inViewHeight/2 && data.windowScrollTop - (data.elementOffsetTop - data.inViewHeight) < data.inViewHeight) {
                                            // console.log('in view (top half): ');
                                            // reduce opacity
                                            console.log($wI.attr('data-url'));
                                            window.history.pushState(null,null,$wI.attr('data-url'));
                                            if(!$('.inview-manual', $wI).hasClass('visible')) {
                                                $('.inview-manual', $wI).addClass('visible');
                                            }

                                        } else {
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
                            }
                        },300);
                    }, 100);
                });
            } else {
                setTimeout(function() {
                    console.log('fired');
                    $('.inview-manual').addClass('visible');                    
                }, 2200);
            }
        }
    };

    return def;
})(jQuery, _);

module.exports = MoreWork;