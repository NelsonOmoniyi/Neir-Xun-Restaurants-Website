<?php

add_filter(
	'post_class',
	function ( $classes ) {
		if ( function_exists( 'is_bbpress' ) && ( get_post_type() === 'forum'
		||
		get_post_type() === 'topic'
		||
		get_post_type() === 'reply' ) ) {
			$classes[] = 'bbpress';
		}

		return $classes;
	}
);

class Rishi_Custom_Post_Types {

	private $supported_post_types = null;

	public function get_supported_post_types() {
		// TODO: Check post type support.
		if ( $this->supported_post_types === null ) {
			$potential_post_types = array_keys(
				get_post_types(
					array(
						'public'   => true,
						'_builtin' => false,
					)
				)
			);

			$potential_post_types = array_values(
				array_diff(
					$potential_post_types,
					array(
						'iamport_payment',
						'zoom-meetings',
						'pafe-formabandonment',
						'pafe-form-database',
						'pafe-form-booking',
						'piotnetforms',
						'piotnetforms-aban',
						'piotnetforms-data',
						'piotnetforms-book',
						'jet-popup',
						'jet-smart-filters',
						'jet-theme-core',
						'jet-woo-builder',
						'jet-engine',
						'jet-engine-booking',
						'jet_options_preset',
						'jet-menu',
						'adsforwp',
						'adsforwp-groups',
						'popup',
						'rt_hooked_element',
						'product',
						'elementor_library',
						'brizy_template',
						'forum',
						'topic',
						'reply',

						'course',
						'lesson',

						// Elementor Landing Page
						'e-landing-page',

						// BetterDocs
						'docs',

						// Edd Downloads
						'download',

						// 'courses',
						'tutor_quiz',
						'tutor_assignments',

						'tribe_events',
						'testimonial',
						'frm_display',
						'mec_esb',
						'mec-events',

						'sfwd-assignment',
						'sfwd-essays',
						'sfwd-transactions',
						'sfwd-certificates',
						'sfwd-quiz',
						'sfwd-topic',
						'sfwd-lessons',
						'sfwd-courses'
					)
				)
			);

			$this->supported_post_types = array_unique(
				apply_filters(
					'rishi:custom_post_types:supported_list',
					$potential_post_types
				)
			);
		}

		return $this->supported_post_types;
	}

	public function is_supported_post_type() {
		global $post;
		global $wp_taxonomies;
		global $wp_query;

		$post_type = get_post_type( $post );

		$tax_query = $wp_query->tax_query;

		if ( $tax_query && ! is_home() ) {
			$tax = $tax_query->queries;

			if ( ! empty( $tax ) && isset( $tax[0]['taxonomy'] ) ) {
				$tax = $tax[0]['taxonomy'];
			}

			if ( $tax && isset( $wp_taxonomies[ $tax ] ) ) {
				$all_tax_post_types = $wp_taxonomies[ $tax ]->object_type;

				if (
					! empty( $all_tax_post_types )
					&&
					isset( $all_tax_post_types[0] )
				) {
					$post_type = $all_tax_post_types[0];
				}
			}
		}

		if ( ! $post_type ) {
			$post_type = get_query_var( 'post_type' );
		}

		if ( in_array( $post_type, $this->get_supported_post_types() ) ) {
			return $post_type;
		}

		return null;
	}
}

if ( ! function_exists( 'rishi__cb_customizer_get_taxonomy_for_cpt' ) ) {
	function rishi__cb_customizer_get_taxonomies_for_cpt( $post_type  ) {
		if ( $post_type === 'post' ) {
			return array(
				'category' => __( 'Category', 'rishi' ),
				'post_tag' => __( 'Tag', 'rishi' ),
			);
		}

		if ( $post_type === 'product' ) {
			return array(
				'product_cat' => __( 'Category', 'rishi' ),
				'product_tag' => __( 'Tag', 'rishi' ),
			);
		}

		$result = array();

		$taxonomies = array_values(
			array_diff(
				get_object_taxonomies( $post_type ),
				array( 'post_format' )
			)
		);

		if ( count( $taxonomies ) > 0 ) {
			foreach ( $taxonomies as $single_taxonomy ) {
				$taxonomy_object = get_taxonomy( $single_taxonomy );

				$result[ $single_taxonomy ] = $taxonomy_object->label;
			}
		} else {
			return array(
				'default' => __( 'Default', 'rishi' ),
			);
		}

		return $result;
	}
}
