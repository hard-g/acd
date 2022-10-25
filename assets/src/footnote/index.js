import { registerFormatType } from '@wordpress/rich-text'

import Edit from './edit';

registerFormatType( 'acd/footnote', {
	title: 'Footnote',
	tagName: 'span',
	className: 'footnote',
	edit: Edit,
} );
