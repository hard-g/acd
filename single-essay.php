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
		$html .= '<section class="essay-wrapper">';
	  while (have_posts()) {
	  	the_post();
			$id = get_the_ID();
			$postContent = get_fields($id);
			$thumbnailURL = wp_get_attachment_url(get_post_thumbnail_id($id));
			$tags = wp_get_post_terms($id);
			$lastTag = end($tags);

			// print_r($postContent);
			$html .= '<div class="page-title-wrapper"><h1 class="page-title">'. get_the_title() .'</h1></div>';
		if($postContent['hero_caption']){
			$html .= '<div class="essay-hero wrapper"><img class="essay-hero-image" src="'.$postContent['hero_image'].'"/><div class="image-caption-ctr">'. $postContent['hero_caption'] .'</div></div>';
		}else{
			$html .= '<div class="essay-hero wrapper"><img class="essay-hero-image" src="'.$postContent['hero_image'].'"/></div>';
		}
			// $html .= '<section class="wrapper essay-content">'.do_shortcode(get_the_content()).'</section>';
			$html .= '<section class="wrapper essay-content">'.apply_filters('the_content', get_the_content());
			foreach($postContent['essay_index_section'] as $weirdessaysection) {
				$html .='<hr style="width: 240px; margin: 0 auto;" />';
				$html .='<p class="lower-essay-header"> '. $weirdessaysection['index_title'] . '</p><div class="creditss">
<div class="column column__count">';
				foreach($weirdessaysection['essay_index'] as $essayindexer ) {
					$html .='<div class="index-entery"><p class="uni">' . $essayindexer['publication'] .'</p>';
					$html .='<p class="link"><a href=" '. $essayindexer['title_link'] .'" target="_blank" rel="noopener">' . $essayindexer['title'] .'</a></p>';
					$html .='<p class="index-body">'. $essayindexer['description'] .'</p>';
					if ( $essayindexer['date'] == true ){
					$html .='<div class="date-wrap">
<p class="date-title">Date</p>
<p class="date-int">'.  $essayindexer['date'].'</p>
</div>';};
					if ( $essayindexer['author'] == true ){
					$html .='<div class="date-wrap">
<p class="date-title">Authors</p>
<p class="date-int">'. $essayindexer['author'] .'</p>
</div>';};
				$html .='</div>';
				};
				 $html .='</div></div>';
			};
			$html .='</section>';

			$next_post = get_adjacent_post(null, null, false);
			$prev_post = get_adjacent_post(null, null, true);


			// print_r($next_post);
			// print_r($prev_post);

			$html .= '<section class="pagination-wrapper grid grid-2">';
			// if previous
			$html .= '<div class="grid-item">';
			if($prev_post) {
				$prevPostContent = get_fields($prev_post->ID);
				$html .= '<a class="flexer" href="'.get_the_permalink($prev_post->ID).'">';
				$html .= '<span class="essay-header-inline">PREVIOUS ESSAY</span>';
				$html .= '<div class="trans-bg"><span class="description">'.$prevPostContent['excerpt'].'</span></div>';
				$html .= '<div class="inner"><img style="width: 100%; height: auto;" src="'.$prevPostContent['thumbnail_image'].'" />';
				$html .= '<span class="item-title">'.get_the_title($prev_post->ID).'</span>';
				$html .= '</div>';
			} else {
				$html .= '<a class="flexer no-cursor"></a>';
			}
			$html .= '</div>';
			// end prev
			$html .= '<div class="grid-item">';
			if($next_post) {
				$nextPostContent = get_fields($next_post->ID);
				$html .= '<a class="flexer" href="'.get_the_permalink($next_post->ID).'">';
				$html .= '<span class="essay-header-inline">NEXT ESSAY</span>';
				$html .= '<div class="trans-bg"><span class="description">'.$nextPostContent['excerpt'].'</span></div>';
				$html .= '<div class="inner"><img style="width: 100%; height: auto;" src="'.$nextPostContent['thumbnail_image'].'" />';
				$html .= '<span class="item-title">'.get_the_title($next_post->ID).'</span>';
				$html .= '</div>';
			} else {

				$morePostContent = get_fields(1137);
				$html .= '<a class="flexer" href="'.get_site_url().'/index.php/how-leaders-of-the-university-of-minnesota-used-and-abused-power/">';
				$html .= '<span class="essay-header-inline">INTERACTIVE FEATURE</span>';
				$html .= '<div class="trans-bg"><span class="description">'.$nextPostContent['excerpt'].'</span></div>';
				$html .= '<div class="inner"><img style="width: 100%; height: auto;" src="'.$morePostContent['thumbnail_image'].'" />';
				$html .= '<span class="item-title">A Deep Dive into Documents about Power</span>';
				$html .= '</div>';
			}
			}
			$html .= '</div>';
			// if next

			// end next
			$html .= '</section>';
	  }
	  $html .= '</section>';
	}
	wp_reset_query();
	echo $html;
	get_footer();
?>
