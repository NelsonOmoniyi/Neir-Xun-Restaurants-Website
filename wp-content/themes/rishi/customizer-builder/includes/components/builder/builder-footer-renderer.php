<?php

class Rishi_Footer_Builder_Render extends Rishi_Builder_Render
{
	public function get_section_type()
	{
		return 'footer';
	}

	public function contains_item($item, $is_primary = false)
	{
		if (is_customize_preview()) {
			return true;
		}

		if ($is_primary) {
			return !$this->is_row_empty($item);
		}

		$section = $this->get_current_section();

		foreach (array_values($section['rows']) as $row) {
			foreach ($row['columns'] as $single_column) {
				if (in_array($item, $single_column)) {
					return true;
				}
			}
		}

		return false;
	}

	public function render()
	{
		$content = '';

		$footer = $this->get_current_section();
		$atts = $footer['settings'];

		foreach ($this->get_current_section()['rows'] as $row) {
			$content .= $this->render_row($row);
		}

		return rishi__cb_html_tag(
			'footer',
			array_merge(
				[
					'class' => apply_filters( 'rishi__cb_footer_wrapper_class', 'cb__footer' ),
					'data-id' => $this->get_short_section_id()
				],
			 rishi__cb_customizer_schema_org_definitions('footer', [
					'array' => true
				])
			),
			$content
		);
	}

	public function render_row($row)
	{
		$atts = $this->get_item_data_for($row['id']);

		$hide_row = rishi__cb_customizer_default_akg('hide_footer_row', $atts, false );

		if ($this->is_row_empty($row) || $hide_row) {
			return '';
		}

		$row_config = $this->get_item_config_for($row['id']);

		$simplified_id = str_replace(
			'-row',
			'',
			$row['id']
		);

		$count = count($row['columns']);

		$data_stack = [];

		if ($count === 2) {
			$columns = rishi__cb_customizer_default_akg(
				'2_columns_layout',
				$atts,
				[
					'desktop' => 'repeat(2, 1fr)',
					'tablet' => 'initial',
					'mobile' => 'initial'
				]
			);

			if ($columns['tablet'] === 'initial') {
				$data_stack[] = 'tablet';
			}

			if ($columns['mobile'] === 'initial') {
				$data_stack[] = 'mobile';
			}
		}

		if ($count === 3) {
			$columns = rishi__cb_customizer_default_akg(
				'3_columns_layout',
				$atts,
				[
					'desktop' => 'repeat(3, 1fr)',
					'tablet' => 'initial',
					'mobile' => 'initial'
				]
			);

			if ($columns['tablet'] === 'initial') {
				$data_stack[] = 'tablet';
			}

			if ($columns['mobile'] === 'initial') {
				$data_stack[] = 'mobile';
			}
		}

		if ($count === 4) {
			$columns = rishi__cb_customizer_default_akg(
				'4_columns_layout',
				$atts,
				[
					'desktop' => 'repeat(4, 1fr)',
					'tablet' => 'initial',
					'mobile' => 'initial'
				]
			);

			if ($columns['tablet'] === 'initial') {
				$data_stack[] = 'tablet';
			}

			if ($columns['mobile'] === 'initial') {
				$data_stack[] = 'mobile';
			}
		}

		if ($count === 5) {
			$columns = rishi__cb_customizer_default_akg(
				'5_columns_layout',
				$atts,
				[
					'desktop' => 'repeat(5, 1fr)',
					'tablet' => 'initial',
					'mobile' => 'initial'
				]
			);

			if ($columns['tablet'] === 'initial') {
				$data_stack[] = 'tablet';
			}

			if ($columns['mobile'] === 'initial') {
				$data_stack[] = 'mobile';
			}
		}

		if ($count === 6) {
			$columns = rishi__cb_customizer_default_akg(
				'6_columns_layout',
				$atts,
				[
					'desktop' => 'repeat(6, 1fr)',
					'tablet' => 'initial',
					'mobile' => 'initial'
				]
			);

			if ($columns['tablet'] === 'initial') {
				$data_stack[] = 'tablet';
			}

			if ($columns['mobile'] === 'initial') {
				$data_stack[] = 'mobile';
			}
		}

		if (!empty($data_stack)) {
			$data_stack = ['data-stack' => implode(':', $data_stack)];
		}

		$container_class = apply_filters( 'rishi__cb_footer_container_class', 'cb__container' );

		if ( rishi__cb_customizer_default_akg('footerRowWidth', $atts, 'fixed') !== 'fixed') {
			$container_class = 'cb__container-fluid';
		}

		$divider_output = [];

		if (
		 rishi__cb_customizer_default_akg('footerColumnsDivider', $atts, [
				'width' => 1,
				'style' => 'none',
				'color' => [
					'color' => '#dddddd',
				],
			])['style'] !== 'none'
		) {
			$divider_output = ['data-divider' => 'columns'];
		}

		$row_divider_output = [];

		$visibility_classes = rishi__cb_customizer_visibility_classes(
		 rishi__cb_customizer_default_akg(
				'footerRowVisibility',
				$atts,
				[
					'desktop' => true,
					'tablet' => true,
					'mobile' => true,
				]
			)
		);

		if (!empty($visibility_classes)) {
			$row_divider_output['class'] = $visibility_classes;
		}

		$row_container_attr = array_merge([
			'data-row' => $simplified_id,
		], $row_divider_output, (is_customize_preview() ? [
				'data-item-label' => $row_config['config']['name'],
				'data-shortcut' => 'border',
				'data-location' => $this->get_customizer_location_for(
					$row['id']
				),
			] : []), ([]));

		$columns_wrapper_attr = array_merge([
			'class' => $container_class
		], $divider_output, $data_stack);

		$result = '<div ' . rishi__cb_customizer_attr_to_html($row_container_attr) . '>';
		$result .= '<div ' . rishi__cb_customizer_attr_to_html($columns_wrapper_attr) . '>';

		foreach ($row['columns'] as $index => $column) {
			$items = $this->render_items_collection($column);

			$column_id = '';

			$column_attr = [];

			$column_attr['data-column'] = '';

			if (count($column) > 0) {
				$column_attr['data-column'] = $this->get_original_id($column[0]);

				if (
					$this->get_original_id($column[0])
					!== $this->shorten_id($column[0])
				) {
					$column_attr['data-column'] .= ':' . $this->shorten_id($column[0]);
				}

				if (
					strpos($column[0], 'widget-area') !== false
					&&
					is_customize_preview()
				) {
					$column_attr['data-shortcut'] = 'border-dashed';
					$column_attr['data-location'] = $this->get_customizer_location_for($column[0]);
				}
			}

			if (!empty(trim($items))) {
				$result .= '<div ' . rishi__cb_customizer_attr_to_html($column_attr) . '>';
				$result .= $items;
				$result .= '</div>';
			} else {
				$result .= '<span data-column>';
				$result .= '</span>';
			}
		}

		$result .= '</div>';
		$result .= '</div>';

		return $result;
	}

	public function is_row_empty($row)
	{
		if (!is_array($row)) {
			$row = $this->get_primary_item($row);
		}

		if (!isset($row['columns'])) {
			return true;
		}

		if (count($row['columns']) === 0) {
			return true;
		}

		foreach ($row['columns'] as $column) {
			if (!is_array($column)) {
				continue;
			}

			if (!empty($column)) {
				return false;
			}
		}

		return true;
	}

	private function render_items_collection($items)
	{
		$result = '';

		foreach ($items as $item) {
			$result .= $this->render_single_item($item);
		}

		return $result;
	}

	public function render_single_item($item_id)
	{
		$item = null;

		$registered_items = rishi__cb_customizer_manager()
			->builder
			->get_registered_items_by($this->get_section_type());

		foreach ($registered_items as $single_item) {
			if ($single_item['id'] === $this->get_original_id($item_id)) {
				$item = $single_item;
				break;
			}
		}

		$not_registered_label = sprintf(
			// translated: %s is the panel builder item ID that is missing
			__(
				'Item %s not registered or doesn\'t have a view.php file.',
				'rishi'
			),
			$item_id
		);

		if (!$item) {
			return $not_registered_label;
		}

		return rishi__cb_customizer_render_view(
			$item['path'] . '/view.php',
			[
				'panel_type' => 'footer',
				'atts' => $this->get_item_data_for($item_id),
				'section_id' => $this->get_current_section_id(),
				'attr' => array_merge([
					'data-id' => $this->shorten_id($item_id),
				], (is_customize_preview() ? [
						'data-item-label' => $item['config']['name'],
						'data-shortcut' => $item['config']['shortcut_style'],
						'data-location' => $this->get_customizer_location_for($item_id)
					] : [])),
			],
			$not_registered_label
		);
	}

	public function get_primary_item($id)
	{
		$builder_value = $this->get_current_section();

		foreach ($builder_value['rows'] as $row) {
			if ($row['id'] === $id) {
				return $row;
			}
		}

		return [];
	}
}
