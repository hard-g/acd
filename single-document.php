<?php
	get_header();

	$html = '';
	// $type = 'work';
	// $args=array(
	//   'post_type' => $type,
	//   'post_status' => 'publish',
	//   'posts_per_page' => 1,
	//   'caller_get_posts'=> 1
	  // );

	// $my_query = new WP_Query($args);
	if( have_posts() ) {
		$html .= '<section class="document-wrapper">';
	  while (have_posts()) {
	  	the_post();
			$id = get_the_ID();
			$postContent = get_fields($id);

			$postContent = array_merge(
				[
					'subject'     => '',
					'images'      => [],
					'description' => '',
					'creator'     => '',
					'source'      => '',
					'date'        => '',
					'rights'      => '',
					'coverage'    => '',
					'time_period' => '',
					'citation'    => '',
				],
				$postContent
			);

			$tags = wp_get_post_terms($id);
			$lastTag = end($tags);

			$subjects = $postContent['subject'];
			$type = get_post_type($id);
			$tags = wp_get_post_terms($id, 'post_tag');

			// print_r($postContent['subject']);
			// print_r($types);
			// print_r($tags);

			$document_archive_url = home_url( 'documents' );

			// print_r($postContent);
			$i = 0;
			$iLength = count($postContent['images']);
			$html .= '<section class="document-box">';
			foreach($postContent['images'] as $image) {
				$i++;
				$html .= '<div class="document-image"><a class="js-trigger" href="' . esc_url( $image['image']['url'] ) .'" target="_blank"><img src="' . esc_url( $image['image']['url'] ) . '" /></a>';
				if($iLength > 1) {
					$html .= '<span class="document-counter-grey">'.$i.'/'.$iLength.'</span>';
				}
				$html .= '</div>';
			}
			$html .= '</section>';

			// grid meta
			$html .= '<section class="grid meta grid-2">';
			//left
			$html .= '<div class="grid-item col">';
				$html .= '<div class="inner">';
					$html .= '<span class="essay-header">'.get_the_title().'</span>';
					$html .= '<span class="document-description paragraph">'.$postContent['description'].'</span>';
				$html .= '</div>';
			$html .= '</div>';
			//right
			$html .= '<div class="grid-item">';
				$html .= '<div class="grid grid-2">';
					$html .= '<div class="grid-item left-border">';
						$html .= '<span class="subhead">DETAILS</span>';
						$html .= '<div class="inner"><div class="inner-padding">';

							if($postContent['creator']) {
								$html .= '<span class="doc-meta-label">Creator</span>';
								$html .= '<span class="image-caption">'.$postContent['creator'].'</span>';
							}

							if($postContent['source']) {
								$html .= '<span class="doc-meta-label">Source</span>';
								$html .= '<span class="image-caption">'.$postContent['source'].'</span>';
							}

							if($postContent['date']) {
								$html .= '<span class="doc-meta-label">Date</span>';
								$html .= '<span class="image-caption">'.$postContent['date'].'</span>';
							}

							if($postContent['rights']) {
								$html .= '<span class="doc-meta-label">Rights</span>';
								$html .= '<span class="image-caption">'.$postContent['rights'].'</span>';
							}

							if($postContent['coverage']) {
								$html .= '<span class="doc-meta-label">Coverage</span>';
								$html .= '<span class="image-caption">'.$postContent['coverage'].'</span>';
							}

							if($postContent['time_period']) {
								$html .= '<span class="doc-meta-label">Time Period</span>';
								$html .= '<span class="image-caption">'.$postContent['time_period'][0].'</span>';
							}

							if($postContent['citation']) {
								$html .= '<span class="doc-meta-label">Citation</span>';
								$html .= '<span class="image-caption">'.$postContent['citation'].'</span>';
							}

						$html .= '</div></div>';
					$html .= '</div>';
					$html .= '<div class="grid-item left-border">';
						if(count($subjects) > 0) {
							$html .= '<span class="subhead">RELATED SUBJECTS</span>';
							$html .= '<div class="inner"><div class="inner-padding">';
							foreach($subjects as $subject) {
								$archive_url = add_query_arg( 'subject', $subject->slug, $document_archive_url );
								$html .= '<a class="button-text related-item" href="' . esc_url( $archive_url ) . '">' . esc_html( $subject->name ) . '</a>';
							}
						}
						// if(count($tags) > 0) {
						// 	$html .= '<span class="subhead rel">RELATED TAGS</span>';
						// 	foreach($tags as $tag) {
						// 		$html .= '<a class="button-text related-item" href="'. get_site_url() .'/index.php/documents/?tag='.$tag->slug.'">'.$tag->name.'</a>';
						// 	}
						// }
						$html .= '<span class="subhead rel">TYPE</span>';

						$html .= '<a class="button-text related-item" href="'. esc_url( add_query_arg( 'type', $type, $document_archive_url ) ) . '">' . esc_html( strtoupper( str_replace( '_', ' ', $type ) ) ) .'</a>';

						$html .= '</div></div>';
					$html .= '</div>';
				$html .= '</div>';
			$html .= '</div>';
			$html .= '</div>';

	  }
	  $html .= '</section>';
	}
	wp_reset_query();
	echo $html;
	get_footer();
?>
