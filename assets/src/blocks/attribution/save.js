import { RichText, useBlockProps } from '@wordpress/block-editor'

import './editor.scss'

export default function save( { attributes } ) {
	const {
		name,
		title
	} = attributes

	const blockProps = useBlockProps.save()

	return (
		<p { ...blockProps }>
			<span className="attr">
				<span className="attr-name">{ name }</span><br />
				<span className="attr-quote">
					<RichText.Content
						tagName="span"
						value={ title }
					/>
				</span>
			</span>
		</p>
	)
}
