/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import {
	useEntityBlockEditor,
	useEntityProp,
	store as coreStore,
} from '@wordpress/core-data';
import {
	Placeholder,
	Spinner,
	ToolbarGroup,
	ToolbarButton,
	TextControl,
	PanelBody,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	InnerBlocks,
	BlockControls,
	InspectorControls,
	useBlockProps,
	Warning,
} from '@wordpress/block-editor';
import { store as reusableBlocksStore } from '@wordpress/reusable-blocks';

/**
 * Internal dependencies
 */
import useNoRecursiveRenders from './use-no-recursive-renders';

export default function ReusableBlockEdit( { attributes: { ref }, clientId } ) {
	const [ hasAlreadyRendered, RecursionProvider ] = useNoRecursiveRenders(
		ref
	);
	const { isMissing, hasResolved } = useSelect(
		( select ) => {
			const persistedBlock = select( coreStore ).getEntityRecord(
				'postType',
				'wp_block',
				ref
			);
			const hasResolvedBlock = select(
				coreStore
			).hasFinishedResolution( 'getEntityRecord', [
				'postType',
				'wp_block',
				ref,
			] );
			return {
				hasResolved: hasResolvedBlock,
				isMissing: hasResolvedBlock && ! persistedBlock,
			};
		},
		[ ref, clientId ]
	);

	const {
		__experimentalConvertBlockToStatic: convertBlockToStatic,
	} = useDispatch( reusableBlocksStore );

	const [ blocks, onInput, onChange ] = useEntityBlockEditor(
		'postType',
		'wp_block',
		{ id: ref }
	);
	const [ title, setTitle ] = useEntityProp(
		'postType',
		'wp_block',
		'title',
		ref
	);

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			value: blocks,
			onInput,
			onChange,
			renderAppender: blocks?.length
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const blockProps = useBlockProps();

	if ( hasAlreadyRendered ) {
		return (
			<div { ...blockProps }>
				<Warning>
					{ __( 'Block cannot be rendered inside itself.' ) }
				</Warning>
			</div>
		);
	}

	if ( isMissing ) {
		return (
			<div { ...blockProps }>
				<Warning>
					{ __( 'Block has been deleted or is unavailable.' ) }
				</Warning>
			</div>
		);
	}

	if ( ! hasResolved ) {
		return (
			<div { ...blockProps }>
				<Placeholder>
					<Spinner />
				</Placeholder>
			</div>
		);
	}

	return (
		<RecursionProvider>
			<div { ...blockProps }>
				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							onClick={ () => convertBlockToStatic( clientId ) }
						>
							{ __( 'Convert to regular blocks' ) }
						</ToolbarButton>
					</ToolbarGroup>
				</BlockControls>
				<InspectorControls>
					<PanelBody>
						<TextControl
							label={ __( 'Name' ) }
							value={ title }
							onChange={ setTitle }
						/>
					</PanelBody>
				</InspectorControls>
				<div className="block-library-block__reusable-block-container">
					{ <div { ...innerBlocksProps } /> }
				</div>
			</div>
		</RecursionProvider>
	);
}
