/**
 * Internal dependencies
 */
import {
	Component,
	createElement,
	concatChildren,
	renderToString,
	switchChildrenNodeName,
	getWrapperDisplayName,
} from '../';

describe( 'element', () => {
	describe( 'renderToString', () => {
		it( 'should return an empty string for booleans/null/undefined values', () => {
			expect( renderToString() ).toBe( '' );
			expect( renderToString( false ) ).toBe( '' );
			expect( renderToString( true ) ).toBe( '' );
			expect( renderToString( null ) ).toBe( '' );
		} );

		it( 'should return a string 0', () => {
			expect( renderToString( 0 ) ).toBe( '0' );
		} );

		it( 'should return a string 12345', () => {
			expect( renderToString( 12345 ) ).toBe( '12345' );
		} );

		it( 'should return a string verbatim', () => {
			expect( renderToString( 'Zucchini' ) ).toBe( 'Zucchini' );
		} );

		it( 'should return a string from an array', () => {
			expect( renderToString( [
				'Zucchini ',
				createElement( 'em', null, 'is a' ),
				' summer squash',
			] ) ).toBe( 'Zucchini <em>is a</em> summer squash' );
		} );

		it( 'should return a string from an element', () => {
			expect( renderToString(
				createElement( 'strong', null, 'Courgette' )
			) ).toBe( '<strong>Courgette</strong>' );
		} );
	} );

	describe( 'concatChildren', () => {
		it( 'should return an empty array for undefined children', () => {
			expect( concatChildren() ).toEqual( [] );
		} );

		it( 'should concat the string arrays', () => {
			expect( concatChildren( [ 'a' ], 'b' ) ).toEqual( [ 'a', 'b' ] );
		} );

		it( 'should concat the object arrays and rewrite keys', () => {
			const concat = concatChildren(
				[ createElement( 'strong', {}, 'Courgette' ) ],
				createElement( 'strong', {}, 'Concombre' )
			);
			expect( concat.length ).toBe( 2 );
			expect( concat[ 0 ].key ).toBe( '0,0' );
			expect( concat[ 1 ].key ).toBe( '1,0' );
		} );
	} );

	describe( 'switchChildrenNodeName', () => {
		it( 'should return undefined for undefined children', () => {
			expect( switchChildrenNodeName() ).toBeUndefined();
		} );

		it( 'should switch strings', () => {
			const children = switchChildrenNodeName( [ 'a', 'b' ], 'strong' );
			expect( children.length ).toBe( 2 );
			expect( children[ 0 ].type ).toBe( 'strong' );
			expect( children[ 0 ].props.children ).toBe( 'a' );
			expect( children[ 1 ].type ).toBe( 'strong' );
			expect( children[ 1 ].props.children ).toBe( 'b' );
		} );

		it( 'should switch elements', () => {
			const children = switchChildrenNodeName( [
				createElement( 'strong', { align: 'left' }, 'Courgette' ),
				createElement( 'strong', {}, 'Concombre' ),
			], 'em' );
			expect( children.length ).toBe( 2 );
			expect( children[ 0 ].type ).toBe( 'em' );
			expect( children[ 0 ].props.children ).toBe( 'Courgette' );
			expect( children[ 0 ].props.align ).toBe( 'left' );
			expect( children[ 1 ].type ).toBe( 'em' );
			expect( children[ 1 ].props.children ).toBe( 'Concombre' );
		} );
	} );

	describe( 'getWrapperDisplayName()', () => {
		it( 'should use default name for anonymous function', () => {
			expect( getWrapperDisplayName( () => <div />, 'test' ) ).toBe( 'Test(Component)' );
		} );

		it( 'should use function name', () => {
			function SomeComponent() {
				return <div />;
			}

			expect( getWrapperDisplayName( SomeComponent, 'test' ) ).toBe( 'Test(SomeComponent)' );
		} );

		it( 'should use component class name', () => {
			class SomeComponent extends Component {
				render() {
					return <div />;
				}
			}

			expect( getWrapperDisplayName( SomeComponent, 'test' ) ).toBe( 'Test(SomeComponent)' );
		} );

		it( 'should use displayName property', () => {
			class SomeComponent extends Component {
				render() {
					return <div />;
				}
			}
			SomeComponent.displayName = 'CustomDisplayName';

			expect( getWrapperDisplayName( SomeComponent, 'test' ) ).toBe( 'Test(CustomDisplayName)' );
		} );
	} );
} );
