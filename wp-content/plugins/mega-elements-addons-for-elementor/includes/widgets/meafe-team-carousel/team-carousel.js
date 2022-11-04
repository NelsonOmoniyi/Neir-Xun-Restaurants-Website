
jQuery( window ).on( 'elementor/frontend/init', () => {
    var TeamSliderBase = elementorModules.frontend.handlers.Base.extend({
        onInit: function () {
            elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
            this.run();
        },    
        getDefaultSettings: function() {
            return {
                selectors: {
                    container: '.owl-carousel'
                },
                items: 1,
                loop: false,
                autoplay: false,
                autoplaSpeed: 3000,
                margin: 30,
                nav: false,
                dots: true,
            };
        },

        getDefaultElements: function () {
            var selectors = this.getSettings('selectors');
            return {
                $container: this.findElement(selectors.container)
            };
        },

        onElementChange: function() {
            this.run();
        },

        getItemsCount: function() {
            var layout = this.getElementSettings('btcccs_team_member_layouts');
            return ( layout == '2' ? 3 : 4 );
        },

        getResponsiveDetails: function() {
            var layout = this.getElementSettings('btcccs_team_member_layouts');
            var response_one = {
                0: {
                    items: 1,

                },
                768: {
                    items: 2,
                },
                991: {
                    items: 4,
                }
            }

            var response_two = {
                0: {
                    items: 1,

                },
                768: {
                    items: 2,
                },
                991: {
                    items: 3,
                }
            }

            return ( layout == '2' ? response_two : response_one );
        },

        getNavDetails: function() {
            var nav   = this.getElementSettings('btcccs_team_member_show_carousel_nav');
            var nav_prev = this.getElementSettings('btcccs_team_member_arrow_prev_icon');
            var nav_next = this.getElementSettings('btcccs_team_member_arrow_next_icon');

            if( nav ) {
                var return_all = [ '<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>' ];
                var return_alls = [ '<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>' ];
                var return_all_start = [ '', '<i class="fa fa-angle-right" aria-hidden="true"></i>' ];
                var return_all_end = [ '<i class="fa fa-angle-left" aria-hidden="true"></i>', '' ];
                
                if( nav_prev.library != 'svg' && nav_next.library != 'svg' ) {
                    return ( [ '<i class="' + nav_prev.value + '" aria-hidden="true"></i>', '<i class="' + nav_next.value + '" aria-hidden="true"></i>' ] );                    
                }
                
                if ( nav_prev.library == 'svg' && nav_next.library == 'svg' ){
                    return ( [ '<img src="' + nav_prev.value.url + '">', '<img src="' + nav_next.value.url + '">' ] );
                }
                
                if ( nav_prev.library == '' && nav_next.library == 'svg' ){
                    return_all_start.pop();
                    return_all_start.push(nav_next.value.url);
                    return ( [ '', '<img src="' + return_all_start[1] + '">' ] );
                    // return return_all_start;
                }

                if ( nav_prev.library != 'svg' && nav_next.library == 'svg' ){
                    return_all.pop();
                    return_all.push('<img src="' + nav_next.value.url + '">');
                    return return_all;
                }
                
                if ( nav_prev.library == 'svg' && nav_next.library == '' ){
                    return_all_end.reverse();
                    return_all_end.pop();
                    return_all_end.push(nav_prev.value.url);
                    return_all_end.reverse();
                    return ( [ '<img src="' + return_all_end[0] + '">', '' ] );
                }

                if ( nav_prev.library == 'svg' && nav_next.library != 'svg' ){
                    return_alls.reverse();
                    return_alls.pop();
                    return_alls.push('<img src="' + nav_prev.value.url + '">');
                    return_alls.reverse();
                    return return_alls;
                }                
            }
            
            return ( [ '<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>' ] );
        },

        getReadySettings: function() {
            var settings = {
                items: this.getItemsCount(),
                loop: !! this.getElementSettings('btcccs_team_member_show_carousel_loop'),
                autoplay: !! this.getElementSettings('btcccs_team_member_show_carousel_auto'),
                autoplaSpeed: this.getElementSettings('btcccs_team_member_carousel_autoplay_speed'),
                margin: 30,
                nav: !! this.getElementSettings('btcccs_team_member_show_carousel_nav'),
                dots: !! this.getElementSettings('btcccs_team_member_show_carousel_dots'),
                navText: this.getNavDetails(),
                responsive: this.getResponsiveDetails(),
            };

            return settings;
        },

        run: function() {
            this.elements.$container.owlCarousel(this.getReadySettings());
        }
    });

    const addHandler = ( $element ) => {
        elementorFrontend.elementsHandler.addHandler( TeamSliderBase, {
            $element,
        } );
    };

    elementorFrontend.hooks.addAction( 'frontend/element_ready/meafe-team-carousel.default', addHandler );
    
    jQuery(window).load(function() {
        if(!jQuery('.owl-dots').hasClass('disabled')) {
            jQuery('.meafe-team-carousel-wrapper-main').addClass('owl-dots-enabled');
        } else {
            jQuery('.meafe-team-carousel-wrapper-main').removeClass('owl-dots-enabled');
        }
    });
} );