// Products Category filter
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

        getResponsiveDetails: function() {
            var response = {
                0: {
                    items: 1,

                },
                768: {
                    items: 3,
                },
                991: {
                    items: 4,
                }
            }

            return response;
        },

        getNavDetails: function() {
            var nav      = this.getElementSettings('PCT_ed_carousel');
            var nav_prev = this.getElementSettings('PCT_prev_icon');
            var nav_next = this.getElementSettings('PCT_next_icon');

            if( nav == 'yes' ) {
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
                items: 4,
                loop: false,
                autoplay: false,
                autoplaSpeed: 5000,
                margin: 30,
                nav: !! this.getElementSettings('PCT_ed_carousel'),
                dots: !! this.getElementSettings('PCT_carousel_dots'),
                navText: this.getNavDetails(),
                responsive: this.getResponsiveDetails(),
            };

            return settings;
        },

        run: function() {
            this.elements.$container.owlCarousel(this.getReadySettings());
            var edCat       = !! this.getElementSettings('PCT_ed_cat');
            var edTitle     = !! this.getElementSettings('PCT_ed_title');
            var edPrice     = !! this.getElementSettings('PCT_ed_price');
            var edCart      = !! this.getElementSettings('PCT_ed_cart');
            var edQuickView = !! this.getElementSettings('PCT_ed_quick_view');
            var edWishlist  = !! this.getElementSettings('PCT_ed_wishlist');
            var edBadge     = !! this.getElementSettings('PCT_ed_badge');
            var edExcerpt   = !! this.getElementSettings('PCT_ed_excerpt');
            var excerptNo   = this.getElementSettings('PCT_excerpt_number');
            var postNo      = this.getElementSettings('PCT_number');
            var layout      = this.getElementSettings('PCT_layouts');
            var prodType    = this.getElementSettings('PCT_type');
            var prodSelect  = this.getElementSettings('PCT_cat_select');
            var carousel    = this.getReadySettings();
            var edCarousel  = !! this.getElementSettings('PCT_ed_carousel');
            var filterItem = jQuery('.post-filter-tab-wrapper li');
            filterItem.each( function( el, index ) {
                jQuery(index).on('click', function(){
                    filterItem.each( function( tabs, elements ) {
                        jQuery(elements).removeClass('active') //Remove active class initially from all categories
                    })
                    jQuery(index).addClass('active') //Add active class on click
                    var catText = jQuery(index).find('a').text()
                    var catID  = jQuery(index).attr('data-tab').split('-')[2];
                    if( catID == undefined ){
                        catID = ''
                    }
                    runAjaxPostFilter( catID, edCat, edTitle, edPrice, edCart, edQuickView, edWishlist, edExcerpt, excerptNo, postNo, layout, carousel, edBadge, prodType, prodSelect, catText, edCarousel )
                })
            })

            const runAjaxPostFilter = ( catID, edCat, edTitle, edPrice, edCart, edQuickView, edWishlist, edExcerpt, excerptNo, postNo, layout, carousel, edBadge, prodType, prodSelect, catText, edCarousel ) => {
                let request = new XMLHttpRequest();
                request.open('POST', meafe_publicVars.ajaxUrl, true);
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
                request.onload = function () {
                    if (this.status >= 200 && this.status < 400) {
                        // If successful
                        let wrapperClass = document.querySelector('.meafe-products-wrapper');
                        wrapperClass.innerHTML = '';
                        wrapperClass.innerHTML = this.responseText; 
                        innerWrapper           = wrapperClass.querySelector('.meafe-products')
                        if( edCarousel ) jQuery(innerWrapper).owlCarousel(carousel);
                    } else {
                        // If fail
                        console.log(this.response);
                    }
                };
                request.onerror = function() {
                    // Connection error
                };
                request.send('action=meafe_products_tab_content&cat_id=' + catID + '&edCat=' + edCat + '&edTitle=' + edTitle + '&edPrice=' + edPrice + '&edCart=' + edCart + '&edQuickView=' + edQuickView + '&edWishlist=' + edWishlist + '&edExcerpt=' + edExcerpt + '&excerptNo=' + excerptNo + '&postNo=' + postNo + '&layout=' + layout + '&edBadge=' + edBadge + '&prodType=' + prodType + '&prodSelect=' + prodSelect + '&catText=' + catText + '&edCarousel=' + edCarousel );
            }
        },
      
    });

    const addHandler = ( $element ) => {
        elementorFrontend.elementsHandler.addHandler( TCSliderBase, {
            $element,
        } );
    };

    elementorFrontend.hooks.addAction( 'frontend/element_ready/meafe-product-cat-tab.default', addHandler );
    
    jQuery(window).load(function() {
        if(!jQuery('.owl-dots').hasClass('disabled')) {
            jQuery('.meafe-product-cat-tab-main').addClass('owl-dots-enabled');
        } else {
            jQuery('.meafe-product-cat-tab-main').removeClass('owl-dots-enabled');
        }
    });
} );