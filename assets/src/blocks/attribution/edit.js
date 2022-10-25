import {
	RichText,
	useBlockProps
} from '@wordpress/block-editor'

export default function edit( {
	context: { postType, postId },
	props,
	attributes,
	setAttributes
} ) {
	const {
		name,
		title
	} = attributes

	const blockProps = useBlockProps( {
		className: [ 'attr' ]
	} )

	return (
		<>
			<div { ...blockProps }>
				<RichText
					className="attribution-name attr-name"
					onChange={ (name) => setAttributes( { name } ) }
					tagName="span"
					value={ name }
					placeholder="Author Name"
				/>

				<br />

				<RichText
					className="attribution-title text"
					onChange={ (title) => setAttributes( { title } ) }
					tagName="span"
					value={ title }
					placeholder="Title"
				/>
			</div>
		</>
	)
}
