
jQuery( window ).on( 'elementor/frontend/init', () => {
    var SliderBase = elementorModules.frontend.handlers.Base.extend({
        onInit: function () {
            elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
            this.run();
        },    
        getDefaultSettings: function() {
            return {
                selectors: {
                    container: '.owl-carousel'
                },
                items: 3,
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

        getReadySettings: function() {
            var settings = {
                items: this.getElementSettings('bccgs_clients_per_line'),
                loop: !! this.getElementSettings('bccgs_clients_show_carousel_loop'),
                autoplay: !! this.getElementSettings('bccgs_clients_show_carousel_auto'),
                autoplaSpeed: this.getElementSettings('bccgs_clients_carousel_autoplay_speed'),
                margin: 30,
                nav: !! this.getElementSettings('bccgs_clients_show_carousel_nav'),
                dots: !! this.getElementSettings('bccgs_clients_show_carousel_dots'),
            };

            return settings;
        },
        run: function() {
            this.elements.$container.owlCarousel(this.getReadySettings());
        }
    });

    const addHandler = ( $element ) => {
        elementorFrontend.elementsHandler.addHandler( SliderBase, {
            $element,
        } );
    };

    elementorFrontend.hooks.addAction( 'frontend/element_ready/meafe-clients.default', addHandler );
    
    jQuery(window).load(function() {
        if(!jQuery('.owl-dots').hasClass('disabled')) {
            jQuery('.meafe-clients').addClass('owl-dots-enabled');
        } else {
            jQuery('.meafe-clients').removeClass('owl-dots-enabled');
        }
    });
} );