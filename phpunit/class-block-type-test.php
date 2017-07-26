<?php
/**
 * WP_Block_Type Tests
 *
 * @package Gutenberg
 */

/**
 * Tests for WP_Block_Type
 */
class Block_Type_Test extends WP_UnitTestCase {
	function test_set_props() {
		$name = 'core/dummy';
		$args = array(
			'render_callback' => array( $this, 'render_dummy_block' ),
			'foo'             => 'bar',
		);

		$block_type = new WP_Block_Type( $name, $args );

		$this->assertSame( $name, $block_type->name );
		$this->assertSame( $args['render_callback'], $block_type->render_callback );
		$this->assertSame( $args['foo'], $block_type->foo );
	}

	function test_render() {
		$attributes = array(
			'foo' => 'bar',
			'bar' => 'foo',
		);

		$block_type = new WP_Block_Type( 'core/dummy', array(
			'render_callback' => array( $this, 'render_dummy_block' ),
		) );
		$output = $block_type->render( $attributes );
		$this->assertEquals( $attributes, json_decode( $output, true ) );
	}

	function test_render_with_content() {
		$attributes = array(
			'foo' => 'bar',
			'bar' => 'foo',
		);
		$content = '<p>Test content.</p>';

		$block_type = new WP_Block_Type( 'core/dummy', array(
			'render_callback' => array( $this, 'render_dummy_block_with_content' ),
		) );
		$output = $block_type->render( $attributes, $content );
		$attributes['_content'] = $content;
		$this->assertSame( $attributes, json_decode( $output, true ) );
	}

	function test_render_without_callback() {
		$attributes = array(
			'foo' => 'bar',
			'bar' => 'foo',
		);
		$content = '<p>Test content.</p>';

		$block_type = new WP_Block_Type( 'core/dummy' );
		$output = $block_type->render( $attributes, $content );
		$this->assertSame( $content, $output );
	}

	function render_dummy_block( $attributes ) {
		return json_encode( $attributes );
	}

	function render_dummy_block_with_content( $attributes, $content ) {
		$attributes['_content'] = $content;

		return json_encode( $attributes );
	}
}
