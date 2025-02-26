/**
 * Internal dependencies
 */
import { getInlineStyles } from './style';

// This utility is intended to assist where the serialization of the shadow
// block support is being skipped for a block but the shadow related CSS classes
// & styles still need to be generated so they can be applied to inner elements.

/**
 * Provides the CSS class names and inline styles for a block's shadow support
 * attributes.
 *
 * @param {Object} attributes Block attributes.
 * @return {Object} Shadow block support derived CSS classes & styles.
 */
export function getShadowClassesAndStyles( attributes ) {
	const shadow = attributes.style?.shadow || '';

	return {
		className: undefined,
		style: getInlineStyles( { shadow } ),
	};
}

/**
 * Derives the shadow related props for a block from its shadow block support
 * attributes.
 *
 * @param {Object} attributes Block attributes.
 *
 * @return {Object} ClassName & style props from shadow block support.
 */
export function useShadowProps( attributes ) {
	const shadowProps = getShadowClassesAndStyles( attributes );
	return shadowProps;
}
