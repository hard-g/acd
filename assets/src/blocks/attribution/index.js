/**
 * Attribution
 */

import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit.js'
import save from './save.js'
import metadata from './block.json'
import icon from './icon'

/**
 * Block definition.
 */
registerBlockType( metadata, {
	icon,
	edit,
	save
} );
