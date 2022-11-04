import rtEvents from '../../../src/js/events';
import { updateAndSaveEl } from '../../../src/js/frontend/header/render-loop'
import { responsiveClassesFor } from '../../../src/js/customizer/sync/helpers'
import { handleBackgroundOptionFor } from '../../../src/js/customizer/sync/variables/background'
import { typographyOption } from "../../../src/js/customizer/sync/variables/typography"
import {
	getRootSelectorFor,
	assembleSelector,
	mutateSelector,
} from '../../../src/js/customizer/sync/helpers'

const svgs = {
	'type-1':
		'<svg viewBox="0 0 10 10"><path d="M10,8.9L9.6,1c0-0.6-0.4-1-1.1-1H1.4c-0.6,0-1,0.4-1,1L0,8.9l0,0C0,9.6,0.4,10,1,10h7.9C9.6,10,10,9.6,10,8.9L10,8.9zM8.9,9.1H1C0.9,9.1,0.9,9.1,0.9,9L1.2,1l0,0c0-0.1,0-0.1,0.1-0.1h7.2c0.1,0,0.1,0.1,0.1,0.1l0,0l0.4,7.9C9.1,9.1,9.1,9.1,8.9,9.1zM6.5,1.8C6.2,1.8,6.1,2,6.1,2.2v1.3c0,0.6-0.4,1.1-1.1,1.1c-0.6,0-1-0.5-1-1.1V2.2c0-0.2-0.2-0.5-0.5-0.5S3,1.9,3,2.2v1.3c0,1.1,0.9,1.9,1.9,1.9s1.9-0.8,1.9-1.9V2.2C6.9,2,6.8,1.8,6.5,1.8z"/></svg>',

	'type-2':
		'<svg viewBox="0 0 10 10"><path d="M0.4,0.4C0.2,0.4,0,0.5,0,0.7s0.1,0.4,0.4,0.4l0,0h0.7c0.1,0,0.1,0.1,0.1,0.1l1.6,5.4C3,7.1,3.4,7.4,3.9,7.4H8c0.5,0,0.9-0.4,1.1-0.8L10,3.1c0.1-0.2-0.1-0.4-0.3-0.4H9.6H2.4L1.9,1.1l0,0C1.9,0.6,1.5,0.4,1.1,0.4H0.4zM4.1,8.1c-0.4,0-0.7,0.4-0.7,0.7s0.4,0.7,0.7,0.7s0.7-0.4,0.7-0.7S4.5,8.1,4.1,8.1zM7.8,8.1c-0.4,0-0.7,0.4-0.7,0.7s0.4,0.7,0.7,0.7c0.4,0,0.7-0.4,0.7-0.7S8.2,8.1,7.8,8.1z"/></svg>',

	'type-3':
		'<svg viewBox="0 0 10 10"><path d="M3,0.7c-0.4,0-0.7,0.2-0.9,0.6L1.1,3.9H0.4c-0.1,0-0.3,0.1-0.4,0.2C0,4.1,0,4.3,0,4.4l1.1,4.2c0.1,0.4,0.5,0.6,0.9,0.6h5.9c0.4,0,0.8-0.3,0.9-0.6L10,4.4c0-0.1,0-0.3-0.1-0.4C9.9,3.9,9.7,3.9,9.6,3.9H8.9L7.8,1.2l0,0C7.6,0.9,7.4,0.7,7,0.7H3zM3,1.6h3.9l1,2.3H2.1L3,1.6z M3.2,5.2c0.3,0,0.4,0.2,0.4,0.4v1.8c0,0.3-0.2,0.4-0.4,0.4C3,7.9,2.8,7.6,2.8,7.4V5.7C2.7,5.4,2.9,5.2,3.2,5.2zM5,5.2c0.3,0,0.4,0.2,0.4,0.4v1.8c0,0.3-0.2,0.4-0.4,0.4c-0.3,0-0.4-0.2-0.4-0.4V5.7C4.6,5.4,4.7,5.2,5,5.2z M6.8,5.2c0.3,0,0.4,0.2,0.4,0.4v1.8c0,0.3-0.2,0.4-0.4,0.4c-0.3,0-0.4-0.2-0.4-0.4V5.7C6.4,5.4,6.6,5.2,6.8,5.2z"/></svg>',
}

rtEvents.on(
	'rt:header:sync:collect-variable-descriptors',
	(variableDescriptors) => {
		variableDescriptors['cart'] = ({ itemId }) => ({
			cartIconSize: {
				selector: assembleSelector(
					mutateSelector({
						selector: getRootSelectorFor({ itemId }),
						operation: 'suffix',
						to_add: '.cb__icon-container',
					})
				),
				variable: 'icon-size',
				responsive: true,
				unit: 'px',
			},

			cartHeaderIconColor: [
				{
					selector: assembleSelector(getRootSelectorFor({ itemId })),
					variable: 'icon-color',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: assembleSelector(getRootSelectorFor({ itemId })),
					variable: 'icon-hover-color',
					type: 'color:hover',
					responsive: true,
				},
			],

			cartHeaderTextColor: [
				{
					selector: assembleSelector(getRootSelectorFor({ itemId })),
					variable: 'textInitialColor',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: assembleSelector(getRootSelectorFor({ itemId })),
					variable: 'textHoverColor',
					type: 'color:hover',
					responsive: true,
				},
			],

			cartBadgeColor: [
				{
					selector: assembleSelector(getRootSelectorFor({ itemId })),
					variable: 'cartBadgeBackground',
					type: 'color:background',
					responsive: true,
				},

				{
					selector: assembleSelector(getRootSelectorFor({ itemId })),
					variable: 'cartBadgeText',
					type: 'color:text',
					responsive: true,
				},
			],

			// cart top total
			...typographyOption({
				id: 'cart_total_font',

				selector: assembleSelector(
					mutateSelector({
						selector: getRootSelectorFor({ itemId }),
						operation: 'suffix',
						to_add: '.cb__label',
					})
				),
			}),

			cart_total_font_color: [
				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'suffix',
							to_add: '.scb__cart-item',
						})
					),
					variable: 'linkInitialColor',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'suffix',
							to_add: '.scb__cart-item',
						})
					),
					variable: 'linkHoverColor',
					type: 'color:hover',
					responsive: true,
				},
			],

			// transparent state
			transparent_cart_total_font_color: [
				{
					selector: assembleSelector(
						mutateSelector({
							selector: mutateSelector({
								selector: getRootSelectorFor({ itemId }),
								operation: 'suffix',
								to_add: '.scb__cart-item',
							}),
							operation: 'between',
							to_add: '[data-transparent-row="yes"]',
						})
					),
					variable: 'linkInitialColor',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: assembleSelector(
						mutateSelector({
							selector: mutateSelector({
								selector: getRootSelectorFor({ itemId }),
								operation: 'suffix',
								to_add: '.scb__cart-item',
							}),
							operation: 'between',
							to_add: '[data-transparent-row="yes"]',
						})
					),
					variable: 'linkHoverColor',
					type: 'color:hover',
					responsive: true,
				},
			],

			transparentCartHeaderIconColor: [
				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'between',
							to_add: '[data-transparent-row="yes"]',
						})
					),
					variable: 'icon-color',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'between',
							to_add: '[data-transparent-row="yes"]',
						})
					),

					variable: 'icon-hover-color',
					type: 'color:hover',
					responsive: true,
				},
			],

			transparentCartHeaderTextColor: [
				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'between',
							to_add: '[data-transparent-row="yes"]',
						})
					),
					variable: 'textInitialColor',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'between',
							to_add: '[data-transparent-row="yes"]',
						})
					),

					variable: 'textHoverColor',
					type: 'color:hover',
					responsive: true,
				},
			],

			transparentCartBadgeColor: [
				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'between',
							to_add: '[data-transparent-row="yes"]',
						})
					),

					variable: 'cartBadgeBackground',
					type: 'color:background',
					responsive: true,
				},

				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'between',
							to_add: '[data-transparent-row="yes"]',
						})
					),

					variable: 'cartBadgeText',
					type: 'color:text',
					responsive: true,
				},
			],

			// sticky state
			sticky_cart_total_font_color: [
				{
					selector: assembleSelector(
						mutateSelector({
							selector: mutateSelector({
								selector: getRootSelectorFor({ itemId }),
								operation: 'suffix',
								to_add: '.scb__cart-item',
							}),
							operation: 'between',
							to_add: '[data-sticky*="yes"]',
						})
					),
					variable: 'linkInitialColor',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: assembleSelector(
						mutateSelector({
							selector: mutateSelector({
								selector: getRootSelectorFor({ itemId }),
								operation: 'suffix',
								to_add: '.scb__cart-item',
							}),
							operation: 'between',
							to_add: '[data-sticky*="yes"]',
						})
					),
					variable: 'linkHoverColor',
					type: 'color:hover',
					responsive: true,
				},
			],

			stickyCartHeaderIconColor: [
				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'between',
							to_add: '[data-sticky*="yes"]',
						})
					),
					variable: 'icon-color',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'between',
							to_add: '[data-sticky*="yes"]',
						})
					),
					variable: 'icon-hover-color',
					type: 'color:hover',
					responsive: true,
				},
			],

			stickyCartBadgeColor: [
				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'between',
							to_add: '[data-sticky*="yes"]',
						})
					),
					variable: 'cartBadgeBackground',
					type: 'color:background',
					responsive: true,
				},

				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'between',
							to_add: '[data-sticky*="yes"]',
						})
					),
					variable: 'cartBadgeText',
					type: 'color:text',
					responsive: true,
				},
			],

			cartFontColor: [
				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'suffix',
							to_add: '.cb__cart-content',
						})
					),
					variable: 'linkInitialColor',
					type: 'color:default',
				},

				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'suffix',
							to_add: '.cb__cart-content',
						})
					),
					variable: 'linkHoverColor',
					type: 'color:hover',
				}
			],

			cartTotalFontColor: {
				selector: assembleSelector(
					mutateSelector({
						selector: getRootSelectorFor({ itemId }),
						operation: 'suffix',
						to_add: '.cb__cart-content .total',
					})
				),
				variable: 'color',
				type: 'color:default',
			},

			// dropdown type
			cartDropDownBackground: {
				selector: assembleSelector(
					mutateSelector({
						selector: getRootSelectorFor({ itemId }),
						operation: 'suffix',
						to_add: '.cb__cart-content',
					})
				),
				variable: 'backgroundColor',
				type: 'color:default',
			},

			cartDropdownTopOffset: {
				selector: assembleSelector(
					mutateSelector({
						selector: getRootSelectorFor({ itemId }),
						operation: 'suffix',
						to_add: '.cb__cart-content',
					})
				),
				variable: 'dropdownTopOffset',
				unit: 'px',
			},

			// panel type
			cart_panel_width: {
				selector: '#woo-cart-panel',
				variable: 'side-panel-width',
				responsive: true,
				unit: '',
			},

			cart_panel_heading_font_color: {
				selector: '#woo-cart-panel .cb__panel-actions',
				variable: 'headingColor',
				type: 'color:default',
				responsive: true,
			},

			cart_panel_font_color: [
				{
					selector:
						'#woo-cart-panel .cart_list, #woo-cart-panel [class*="empty-message"]',
					variable: 'color',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: '#woo-cart-panel .cart_list',
					variable: 'linkInitialColor',
					type: 'color:link_initial',
					responsive: true,
				},

				{
					selector: '#woo-cart-panel .cart_list',
					variable: 'linkHoverColor',
					type: 'color:link_hover',
					responsive: true,
				},
			],

			cart_panel_total_font_color: {
				selector: '#woo-cart-panel .total',
				variable: 'color',
				type: 'color:default',
				responsive: true,
			},

			cart_panel_shadow: {
				selector: '#woo-cart-panel',
				type: 'box-shadow',
				variable: 'box-shadow',
				responsive: true,
			},

			...handleBackgroundOptionFor({
				id: 'cart_panel_background',
				selector: '#woo-cart-panel > section',
				responsive: true,
			}),

			...handleBackgroundOptionFor({
				id: 'cart_panel_backdrop',
				selector: '#woo-cart-panel',
				responsive: true,
			}),

			cart_panel_close_button_color: [
				{
					selector: '#woo-cart-panel .close-button',
					variable: 'closeButtonColor',
					type: 'color:default',
				},

				{
					selector: '#woo-cart-panel .close-button',
					variable: 'closeButtonHoverColor',
					type: 'color:hover',
				},
			],

			cart_panel_close_button_shape_color: [
				{
					selector: '#woo-cart-panel .close-button',
					variable: 'closeButtonBackground',
					type: 'color:default',
				},

				{
					selector: '#woo-cart-panel .close-button',
					variable: 'closeButtonHoverBackground',
					type: 'color:hover',
				},
			],

			headerCartMargin: {
				selector: assembleSelector(getRootSelectorFor({ itemId })),
				type: 'spacing',
				variable: 'margin',
				responsive: true,
				important: true,
			},
		})
	}
)

rtEvents.on('ct:header:sync:item:cart', ({ optionId, optionValue, values }) => {
	const selector = '[data-id="cart"]'

	if (optionId === 'cart_subtotal_visibility') {
		updateAndSaveEl(selector, (el) => {
			;[...el.querySelectorAll('.cb__label')].map((el) => {
				responsiveClassesFor(optionValue, el)
			})
		})
	}

	if (optionId === 'cart_total_position') {
		updateAndSaveEl(
			selector,
			(el) => {
				if (!optionValue.desktop) {
					optionValue = {
						desktop: optionValue,
						mobile: optionValue,
					}
				}

				el.firstElementChild.dataset.label = optionValue.desktop
			},
			{ onlyView: 'desktop' }
		)

		updateAndSaveEl(
			selector,
			(el) => {
				if (!optionValue.desktop) {
					optionValue = {
						desktop: optionValue,
						mobile: optionValue,
					}
				}

				el.firstElementChild.dataset.label = optionValue.mobile
			},
			{ onlyView: 'mobile' }
		)
	}

	if (optionId === 'header_cart_visibility') {
		updateAndSaveEl(selector, (el) =>
			responsiveClassesFor({ ...optionValue, desktop: true }, el)
		)
	}

	if (optionId === 'has_cart_badge') {
		updateAndSaveEl(selector, (el) => {
			el.firstElementChild.removeAttribute('data-skip-badge')
			if (optionValue === 'yes') return
			el.firstElementChild.dataset.skipBadge = ''
		})
	}

	if (optionId === 'auto_open_cart') {
		updateAndSaveEl(selector, (el) => {
			el.querySelector('a').removeAttribute('data-auto-open')

			let components = []

			if (optionValue.archive) {
				components.push('archive')
			}

			if (optionValue.product) {
				components.push('product')
			}

			if (components.length > 0) {
				el.querySelector('a').dataset.autoOpen = components.join(':')
			}
		})
	}
})
