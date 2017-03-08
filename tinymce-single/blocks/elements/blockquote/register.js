window.wp.blocks.registerBlock( {
	name: 'blockquote',
	displayName: 'Quote',
	elements: [ 'blockquote' ],
	type: 'text',
	icon: 'gridicons-quote',
	controls: [
		{
			classes: 'remove-formatting',
			icon: 'gridicons-quote',
			onClick: function( block, editor ) {
				editor.formatter.remove( 'blockquote' );
			}
		}
	],
	insert: function( block, editor ) {
		editor.formatter.apply( 'blockquote', block );
	}
} );

