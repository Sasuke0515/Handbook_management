/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { switchToBlockType } from '@wordpress/blocks';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { group, row, stack } from '@wordpress/icons';
import { _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useConvertToGroupButtonProps } from '../convert-to-group-buttons';
import { store as blockEditorStore } from '../../store';

const layouts = {
	group: undefined,
	row: { type: 'flex' },
	stack: { type: 'flex', orientation: 'vertical' },
};

function BlockGroupToolbar() {
	const {
		blocksSelection,
		clientIds,
		groupingBlockName,
		isGroupable,
	} = useConvertToGroupButtonProps();
	const { replaceBlocks } = useDispatch( blockEditorStore );

	const { canRemove } = useSelect(
		( select ) => {
			const { canRemoveBlocks } = select( blockEditorStore );
			return {
				canRemove: canRemoveBlocks( clientIds ),
			};
		},
		[ clientIds ]
	);

	const onConvertToGroup = ( layout = 'group' ) => {
		const newBlocks = switchToBlockType(
			blocksSelection,
			groupingBlockName
		);

		if ( newBlocks && newBlocks.length > 0 ) {
			// Because the block is not in the store yet we can't use
			// updateBlockAttributes so need to manually update attributes.
			newBlocks[ 0 ].attributes.layout = layouts[ layout ];
			replaceBlocks( clientIds, newBlocks );
		}
	};

	const onConvertToRow = () => onConvertToGroup( 'row' );
	const onConvertToStack = () => onConvertToGroup( 'stack' );

	// Don't render the button if the current selection cannot be grouped.
	// A good example is selecting multiple button blocks within a Buttons block:
	// The group block is not a valid child of Buttons, so we should not show the button.
	// Any blocks that are locked against removal also cannot be grouped.
	if ( ! isGroupable || ! canRemove ) {
		return null;
	}

	return (
		<ToolbarGroup>
			<ToolbarButton
				icon={ group }
				label={ _x( 'Group', 'verb' ) }
				onClick={ onConvertToGroup }
			/>
			<ToolbarButton
				icon={ row }
				label={ _x( 'Row', 'single horizontal line' ) }
				onClick={ onConvertToRow }
			/>
			<ToolbarButton
				icon={ stack }
				label={ _x( 'Stack', 'verb' ) }
				onClick={ onConvertToStack }
			/>
		</ToolbarGroup>
	);
}

export default BlockGroupToolbar;
