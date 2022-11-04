jQuery( window ).on( 'elementor/frontend/init', () => {
    var TCSliderBase = elementorModules.frontend.handlers.Base.extend({
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
            var layout = this.getElementSettings('btccgs_testimonial_carousel_layouts');
            return ( layout == '4' ? 3 : 1 );
        },

        getResponsiveDetails: function() {
            var layout = this.getElementSettings('btccgs_testimonial_carousel_layouts');
            var response = {
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

            return ( layout == '4' ? response : '' );
        },

        getNavDetails: function() {
            var layout   = this.getElementSettings('btccgs_testimonial_carousel_layouts');
            var enable   = this.getElementSettings('btccgs_testimonial_carousel_change_nav');
            var nav   = this.getElementSettings('btccgs_testimonial_carousel_show_carousel_nav');
            var nav_prev = this.getElementSettings('btccgs_testimonial_carousel_arrow_prev_icon');
            var nav_next = this.getElementSettings('btccgs_testimonial_carousel_arrow_next_icon');

            if( layout == '2' && !enable ){
                return ( [ '<svg id="right" xmlns="http://www.w3.org/2000/svg" width="45.521" height="30.348" viewBox="0 0 45.521 30.348"><g id="Group_30" data-name="Group 30" transform="translate(0 0)"><path id="Path_1" data-name="Path 1" d="M.278,99.836,14.5,85.611a.948.948,0,1,1,1.341,1.341L3.238,99.558H44.573a.948.948,0,1,1,0,1.9H3.238l12.607,12.606A.948.948,0,1,1,14.5,115.4L.278,101.177A.948.948,0,0,1,.278,99.836Z" transform="translate(0 -85.333)"/></g></svg>', '<svg id="right" xmlns="http://www.w3.org/2000/svg" width="45.521" height="30.347" viewBox="0 0 45.521 30.347"><g id="Group_30" data-name="Group 30" transform="translate(0 0)"><path id="Path_1" data-name="Path 1" d="M45.243,99.836,31.018,85.611a.948.948,0,1,0-1.341,1.341L42.284,99.558H.948a.948.948,0,1,0,0,1.9H42.284L29.677,114.061a.948.948,0,1,0,1.341,1.341l14.225-14.225A.948.948,0,0,0,45.243,99.836Z" transform="translate(0 -85.333)"/></g></svg>' ] );
            }

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
                loop: !! this.getElementSettings('btccgs_testimonial_carousel_show_carousel_loop'),
                autoplay: !! this.getElementSettings('btccgs_testimonial_carousel_show_carousel_auto'),
                autoplaSpeed: this.getElementSettings('btccgs_testimonial_carousel_carousel_autoplay_speed'),
                margin: 30,
                nav: !! this.getElementSettings('btccgs_testimonial_carousel_show_carousel_nav'),
                dots: !! this.getElementSettings('btccgs_testimonial_carousel_show_carousel_dots'),
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
        elementorFrontend.elementsHandler.addHandler( TCSliderBase, {
            $element,
        } );
    };

    elementorFrontend.hooks.addAction( 'frontend/element_ready/meafe-testimonial-carousel.default', addHandler );
    
    jQuery(window).load(function() {
        if(!jQuery('.owl-dots').hasClass('disabled')) {
            jQuery('.meafe-testimonial-carousel-main').addClass('owl-dots-enabled');
        } else {
            jQuery('.meafe-testimonial-carousel-main').removeClass('owl-dots-enabled');
        }
    });
} );