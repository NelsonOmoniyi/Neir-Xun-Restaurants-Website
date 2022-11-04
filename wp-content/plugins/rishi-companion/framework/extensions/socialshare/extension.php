<?php
require_once dirname(__FILE__) . '/helpers.php';
class RishiCompanionExtensionSocialShare {

	public function __construct() {

		add_filter (
			'rishi__cb_customizer_socialshare_customizer_options',
			[$this, 'add_options_panel']
		);
	}

	public function add_options_panel($options) {

		$options['socialshare_ext'] = $this->get_call_fn(
			[
				'fn' => 'rishi__cb_customizer_get_options',
				'default' => 'array'
			],
			dirname(__FILE__) . '/customizer.php',
			[], false
		);

		return $options;
	}

	public function get_call_fn($args = [], ...$params) {
		$args = wp_parse_args(
			$args,
			[
				'fn' => null,

				// string | null | array
				'default' => ''
			]
		);

		if (! $args['fn']) {
			throw new Error('$fn must be specified!');
		}

		if (! function_exists($args['fn'])) {
			return $args['default'];
		}

		return call_user_func($args['fn'], ...$params);
	}
}

