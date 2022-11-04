<?php

$hidden = rishi__cb_customizer_default_akg( 'footer_hide_widget_three', $atts, false );

if ( $hidden ) return '';

echo rishi__cb_customizer_render_view(
	\RISHI_CUSTOMIZER_BUILDER_DIR__ . '/panel-builder/footer/widget-area-1/view.php',
	[
		'atts' => $atts,
		'attr' => $attr,
		'class' => 'footer-three',
		'sidebar' => 'footer-three'
	]
);
