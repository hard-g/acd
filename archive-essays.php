<?php /* Template Name: Essays Page */ ?>
<?php 
	get_header();
	if ( have_posts() ) {
		while ( have_posts() ) {
			the_post(); 
			//
			?>
			<div class="page-header-wrapper">
				<div class="inner">
					<h1 class="page-title"><?php the_title(); ?></h1>
					<h2 class="subhead"><?php the_content(); ?></h2>
				</div>
			</div>
			<?php
			//
		} // end while
	} // end if
	$html = '<section class="essays-container grid grid-3">';
	$args = array( 'post_type' => 'essay', 'order' => 'asc');
	$loop = new WP_Query( $args );
	while ( $loop->have_posts() ) : $loop->the_post();
			$id = get_the_ID();
			$postContent = get_fields($id);
			$html .= '<div class="grid-item"><a class="flexer" href="'.get_the_permalink().'">';
			$html .= '<div class="trans-bg"><span class="description">'.$postContent['excerpt'].'</span></div>';
			$html .= '<div class="inner"><img style="width: 100%; height: auto;" src="'.$postContent['thumbnail_image'].'" />';
			$html .= '<span class="item-title">'.get_the_title().'</span>';
			$html .= '</div></div>';
	endwhile;
	$html .= '</section>';
	echo $html;
	get_footer();
?>