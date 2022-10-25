import './editor.scss'

/**
 * External dependencies
 */
const { nanoid } = require( 'nanoid' );

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { isCollapsed, insertObject, getActiveObject, toggleFormat } from '@wordpress/rich-text';
import { IconButton } from '@wordpress/components'
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import icon from './icon';

const insertMarker = ( value ) => {
	const id = nanoid( 8 );

	const format = {
		type: 'acd/footnote',
		attributes: {
			footnoteId: `${ id }`,
			href: `#ref-${ id }`,
			id: `anchor-${ id }`,
			'aria-label': 'See footnote'
		},
	};

	const startIndex = isCollapsed( value ) ? value.start : value.end;

	// Add empty space at the end of the sentence, so it's possible to continue writing after it.
	value.text += ' ';

	const newValue = insertObject( value, format, startIndex );

	return newValue;
};

export default function Edit( { isActive, isObjectActive, value, onChange } ) {
	const [ isOpen, setIsOpen ] = useState( false );

	const activeObject = getActiveObject( value )
	const activeObjectId = activeObject ? activeObject.attributes.footnoteId : null

	return (
		<>
			<RichTextToolbarButton
				icon={ icon }
				title="Footnote"
				isActive={ isActive }
				className="components-toolbar_control"
				onClick={ () => onChange( toggleFormat( value, { type: 'acd/footnote' } ) ) }
			/>

			{ isObjectActive && (
				<div>Footnote content</div>
			) }
		</>
	);
}
