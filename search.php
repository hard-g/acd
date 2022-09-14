<?php /* Template Name: Search Results */ ?>
<?php

	get_header();
	global $wp_query;

	$html = '<div class="page-header-wrapper"><div class="inner">';
	$html .= '<h1 class="essay-header">'.$wp_query->found_posts.' results found for <em>'.get_search_query().'</em></h1>';
	$html .= '</div></div>';

	$html .= '<section class="documents-container grid grid-4">';
	if ( have_posts() ) {
	while ( have_posts() ) : the_post();
			$id = get_the_ID();
			$postContent = get_fields($id);

			$html .= '<div class="grid-item"><a class="flexer" href="'.get_the_permalink().'">';
			if($postContent['images'][0]['image']) {
				$html .= '<div class="inner"><div class="image-cropper" style="background-image: url('.$postContent['images'][0]['image'].');"></div>';
			} else {
				$html .= '<div class="inner"><div class="image-cropper" style="background-color: #EAE2DF;");"></div>';
			}
			$html .= '<hr/><span class="document-item-title">'.get_the_title().'</span>';
			$html .= '</div></div>';

	endwhile;
	}
	$html .= '</section>';
	echo $html;
	get_footer();
?>