<?php /* Template Name: About Page */ ?>
<?php 
	get_header();


	if ( have_posts() ) {
		while ( have_posts() ) {
			the_post(); 
			$id = get_the_ID();
			$postContent = get_fields($id);

			// print_r($postContent);
			$html = '<div class="page-header-wrapper"><div class="inner">';
			$html .= '<h1 class="page-title">About This Project</h1></div></div>';
			$html .= '<section class="wrapper" style="padding-top: 60px;">';
			$html .= apply_filters('the_content', get_the_content()).'</section>';
		}
	}
	echo $html;
	get_footer();
?>