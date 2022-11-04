<?php

if (!function_exists('rishi__cb_customizer_assemble_selector')) {
	return;
}

// Typography
rishi__cb_customizer_output_font_css([
	'font_value' => rishi__cb_get_akv( 'headerRandomizeFont', $atts,
	 rishi__cb_customizer_typography_default_values([
			'size' => '18px',
			'variation' => 'n4',
		])
	),
	'css' => $css,
	'tablet_css' => $tablet_css,
	'mobile_css' => $mobile_css,
	'selector' => '.header-randomize-section',
]);

// Icon Size
$icon_size = rishi__cb_get_akv( 'header_randomize_icon_size', $atts, 20 );
 rishi__cb_customizer_output_responsive([
	'css'          => $css,
	'tablet_css'   => $tablet_css,
	'mobile_css'   => $mobile_css,
	'selector'     => '.header-randomize-section',
	'variableName' => 'icon-size',
	'value'        => $icon_size,
	'responsive'   => true
]);

// Header Randomize Color
rishi__cb_customizer_output_colors([
	'value' => rishi__cb_get_akv('headerRandomizeColor', $atts),
	'default' => [
		'default' => ['color' => 'var(--paletteColor1)'],
	],
	'css' => $css,
	'tablet_css' => $tablet_css,
	'mobile_css' => $mobile_css,
	'variables' => [
		'default' => [
			'selector' => '.header-randomize-section',
			'variable' => 'headerRandomizeInitialColor'
		],
	],
	'responsive' => true
]);

// Icon Color
rishi__cb_customizer_output_colors([
	'value' => rishi__cb_get_akv('headerRandomizeIconColor', $atts),
	'default' => [
		'default' => ['color' => 'var(--paletteColor1)'],
		'hover'   => ['color' => 'var(--paletteColor3)'],
	],
	'css' => $css,
	'tablet_css' => $tablet_css,
	'mobile_css' => $mobile_css,
	'variables' => [
		'default' => [
			'selector' => '.header-randomize-section',
			'variable' => 'headerRandomizeInitialIconColor'
		],
		'hover' => [
			'selector' => '.header-randomize-section',
			'variable' => 'headerRandomizeInitialIconHoverColor'
		]
	],
	'responsive' => true
]);


// transparent state
if ( isset( $has_transparent_header ) && $has_transparent_header ) {
	rishi__cb_customizer_output_colors([
		'value' => rishi__cb_get_akv('transparentHeaderRandomizeColor', $atts),
		'default' => [
			'default' => ['color' => \Rishi_CSS_Injector::get_skip_rule_keyword('DEFAULT')],
		],
		'css' => $css,
		'tablet_css' => $tablet_css,
		'mobile_css' => $mobile_css,

		'variables' => [
			'default' => [
				'selector' =>  rishi__cb_customizer_assemble_selector(
					rishi__cb_customizer_mutate_selector(
						array(
							'selector'  =>  rishi__cb_customizer_mutate_selector(
								array(
									'selector'  => $root_selector,
									'operation' => 'suffix',
									'to_add'    => '.header-randomize-section',
								)
							),
							'operation' => 'between',
							'to_add'    => '[data-transparent-row="yes"]',
						)
					)
				),
				'variable' => 'headerRandomizeInitialColor'
			],
		]
	]);

	// Icon Transparent Color
	rishi__cb_customizer_output_colors([
		'value' => rishi__cb_get_akv('transparentHeaderRandomizeIconColor', $atts),
		'default' => [
			'default' => ['color' => \Rishi_CSS_Injector::get_skip_rule_keyword('DEFAULT')],
			'hover'   => ['color' => \Rishi_CSS_Injector::get_skip_rule_keyword('DEFAULT')],
		],
		'css' => $css,
		'tablet_css' => $tablet_css,
		'mobile_css' => $mobile_css,

		'variables' => [
			'default' => [
				'selector' => rishi__cb_customizer_assemble_selector(
					rishi__cb_customizer_mutate_selector(
						array(
							'selector'  =>  rishi__cb_customizer_mutate_selector(
								array(
									'selector'  => $root_selector,
									'operation' => 'suffix',
									'to_add'    => '.header-randomize-section',
								)
							),
							'operation' => 'between',
							'to_add'    => '[data-transparent-row="yes"]',
						)
					)
				),
				'variable' => 'headerRandomizeInitialIconColor'
			],
			'hover' => [
				'selector' => rishi__cb_customizer_assemble_selector(
					rishi__cb_customizer_mutate_selector(
						array(
							'selector'  =>  rishi__cb_customizer_mutate_selector(
								array(
									'selector'  => $root_selector,
									'operation' => 'suffix',
									'to_add'    => '.header-randomize-section',
								)
							),
							'operation' => 'between',
							'to_add'    => '[data-transparent-row="yes"]',
						)
					)
				),
				'variable' => 'headerRandomizeInitialIconHoverColor'
			]
		]
	]);
}

// sticky state
if (isset($has_sticky_header) && $has_sticky_header) {
	rishi__cb_customizer_output_colors([
		'value' => rishi__cb_get_akv('stickyHeaderRandomizeColor', $atts),
		'default' => [
			'default' => ['color' => \Rishi_CSS_Injector::get_skip_rule_keyword('DEFAULT')],
		],
		'css' => $css,
		'tablet_css' => $tablet_css,
		'mobile_css' => $mobile_css,

		'variables' => [
			'default' => [
				'selector' => rishi__cb_customizer_assemble_selector(
					rishi__cb_customizer_mutate_selector(
						array(
							'selector'  =>  rishi__cb_customizer_mutate_selector(
								array(
									'selector'  => $root_selector,
									'operation' => 'suffix',
									'to_add'    => '.header-randomize-section',
								)
							),
							'operation' => 'between',
							'to_add'    => '[data-sticky*="yes"]',
						)
					)
				),
				'variable' => 'headerRandomizeInitialColor'
			],
		]
	]);

	rishi__cb_customizer_output_colors([
		'value' => rishi__cb_get_akv('stickyHeaderRandomizeIconColor', $atts),
		'default' => [
			'default' => ['color' => \Rishi_CSS_Injector::get_skip_rule_keyword('DEFAULT')],
			'hover'   => ['color' => \Rishi_CSS_Injector::get_skip_rule_keyword('DEFAULT')],
		],
		'css' => $css,
		'tablet_css' => $tablet_css,
		'mobile_css' => $mobile_css,

		'variables' => [
			'default' => [
				'selector' => rishi__cb_customizer_assemble_selector(
					rishi__cb_customizer_mutate_selector(
						array(
							'selector'  =>  rishi__cb_customizer_mutate_selector(
								array(
									'selector'  => $root_selector,
									'operation' => 'suffix',
									'to_add'    => '.header-randomize-section',
								)
							),
							'operation' => 'between',
							'to_add'    => '[data-sticky*="yes"]',
						)
					)
				),
				'variable' => 'headerRandomizeInitialIconColor'
			],
			'hover' => [
				'selector' => rishi__cb_customizer_assemble_selector(
					rishi__cb_customizer_mutate_selector(
						array(
							'selector'  =>  rishi__cb_customizer_mutate_selector(
								array(
									'selector'  => $root_selector,
									'operation' => 'suffix',
									'to_add'    => '.header-randomize-section',
								)
							),
							'operation' => 'between',
							'to_add'    => '[data-sticky*="yes"]',
						)
					)
				),
				'variable' => 'headerRandomizeInitialIconHoverColor'
			]
		]
	]);
}