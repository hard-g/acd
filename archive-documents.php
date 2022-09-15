<?php /* Template Name: Documents Page */ ?>
<?php
	$allSubjectTerms = get_terms(array('taxonomy' => 'subjects'));

	$params = $_SERVER['QUERY_STRING'];
	parse_str($params, $filters);

	$filters = array_merge(
		[
			'subject' => null,
			'type'    => null,
		],
		$filters
	);

	if ( $filters['subject'] ) {

		$filters['tax_query'] = array(
       		array(
            	'taxonomy' => 'subjects',
            	'field' => 'slug',
            	'terms' => explode('_', $filters['subject'])
        	)
		);
	}


	if($filters['type']) {
		$types = array('post_type' => explode('-',$filters['type']), 'order' => 'asc');
	} else {
		$types = array( 'post_type' => array('person', 'letter', 'text', 'still_image'), 'order' => 'asc');
	}

	// print_r($allSubjectTerms);

	$myQuery = array_merge($types, $filters);

	get_header();
	if ( have_posts() ) {
		while ( have_posts() ) {
			the_post();
			$parentId = get_the_ID();
			$parentPostContent = get_fields($id);
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




	$html = '<section class="filters">';
	if($filters['subject'] || $filters['type']) {
		$html .= '<div class="filter-container-bar"><div class="inner">';
		// pre set filters here
		if($filters['type']) {
			foreach (explode('-',$filters['type']) as $t) {
				$html .= '<span class="filter-item" data-rel="'.$t.'"><span class="filter-box-text">'.ucwords(str_replace('_', ' ', $t)).'<i class="close"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29"><g fill="none" fill-rule="evenodd" stroke="#62060A" stroke-linecap="square"><path d="M7.973 21.027L21.627 7.373M21.929 21.213L7.906 7.19"/></g></svg></i></span></span>';
			}
		}
		if($filters['subject']) {
			foreach (explode('_', $filters['subject']) as $s) {
				$san = str_replace('-', ' ', $s);
				$html .= '<span class="filter-item" data-rel="'.$s.'"><span class="filter-box-text">'.str_replace('_', ' ', ucwords($san)).'<i class="close"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29"><g fill="none" fill-rule="evenodd" stroke="#62060A" stroke-linecap="square"><path d="M7.973 21.027L21.627 7.373M21.929 21.213L7.906 7.19"/></g></svg></i></span></span>';
			}
		}
		$html .= '</div></div>';
	}
	//filter menu here
	$html .= '<div class="filter-trigger">Filter <i class="filter-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 15 9"><path fill="none" fill-rule="evenodd" stroke="#FF583F" d="M1 1h13L7.5 9z"/></svg></i></div>';
	$html .= '<div class="filter-nav"><ul id="menu-main-nav" class="menu">';
	$html .= '<li class="menu-item"><a>Filter By</a></li>';
	$html .= '<li class="menu-item no-border"><a>Subject</a></li>';
		$html .= '<ul class="sub-menu">';
			foreach($allSubjectTerms as $subj) {
				// var_dump(preg_match('/'.$subj->slug.'/', $filters['subject']));
				// var_dump($subj->slug);
				$html .= '<li class="menu-item';
				if( $filters['subject'] && preg_match('/'.$subj->slug.'/', $filters['subject'])) {
					$html .= ' active';
				}
				$html .= '"><span class="boxer" data-type="subj" data-rel="'.$subj->slug.'"></span> <span class="text-of-filter">'.ucwords($subj->name).'</span></li>';
			}
		$html .= '</ul>';
	$html .= '</li>';
	$html .= '<li class="menu-item no-border"><a>Type</a></li>';
		$html .= '<ul class="sub-menu">';
			$html .= '<li class="menu-item';
			if ( $filters['type'] && preg_match( '/text/', $filters['type'] ) ) {
				$html .= ' active';
			}
			$html .= '"><span class="boxer" data-type="type" data-rel="text"></span> <span class="text-of-filter">Text</span></li>';
			$html .= '<li class="menu-item';
			if ( $filters['type'] && preg_match( '/still_image/', $filters['type'] ) ) {
				$html .= ' active';
			}
			$html .= '"><span class="boxer" data-type="type" data-rel="still_image"></span> <span class="text-of-filter">Still Image</span></li>';
			$html .= '<li class="menu-item';
			if ( $filters['type'] && preg_match( '/letter/', $filters['type'] ) ) {
				$html .= ' active';
			}
			$html .= '"><span class="boxer" data-type="type" data-rel="letter"></span> <span class="text-of-filter">Letter</span></li>';
			$html .= '<li class="menu-item';
			if ( $filters['type'] && preg_match('/person/', $filters['type'] ) ) {
				$html .= ' active';
			}
			$html .= '"><span class="boxer" data-type="type" data-rel="person"></span> <span class="text-of-filter">Person</span></li>';
		$html .= '</ul>';
	$html .= '</li>';
	$html .= '</ul><!--<div class="underlay"></div>-->';
	$html .= '<button class="button-trans js-button-apply">APPLY</button>';
	$html .= '<button class="button-trans js-button-clear">CLEAR ALL</button>';
	$html .= '</div>';
	$html .= '</section><section class="documents-container">';

	if(!$filters['type'] && !$filters['subject']) {
		$html .= '<section class="featured-documents">';
		foreach($parentPostContent['feature_group'] as $feature) {
			$html .= '<div class="subhead-small center-text">FEATURED</div>';
			$html .= '<div class="essay-header center-text">'.$feature['feature_group_title'].'</div>';
			$html .= '<section class="grid grid-4 feature-block">';
			foreach($feature['featured_items'] as $f) {
				$id = $f->ID;
				$postContent = get_fields($id);
				$html .= '<div class="grid-item">';
					$html .= '<a class="flexer" href="'.get_the_permalink($id).'">';
						$html .= '<div class="inner">';
					if ( ! empty( $postContent['images'][0]['image'] ) ) {
							$html .= '<div class="image-cropper" style="background-image: url(' . esc_url( $postContent['images'][0]['image']['sizes']['thumbnail'] ) . ');"></div>';
					} else {
							$html .= '<div class="image-cropper" style="background-color: #EAE2DF;");"></div>';
					}
							$html .= '<hr/><span class="document-item-title">'.get_the_title($id).'</span>';
				$html .= '</div></a></div>';
			}
			$html .= '<hr class="mobile-full-hr" style="width: 100%;padding-left: 24px;padding-right: 24px;"/></section>';
		}
		$html .= '</section>';
	}

	$html .= '<section class="grid grid-4">';
	$loop = new WP_Query( $myQuery );
	while ( $loop->have_posts() ) : $loop->the_post();
			$id = get_the_ID();
			$postContent = get_fields($id);

			$html .= '<div class="grid-item"><a class="flexer" href="'.get_the_permalink().'">';

			if ( ! empty( $postContent['images'][0]['image'] ) ) {
				$html .= '<div class="inner"><div class="image-cropper" style="background-image: url(' . esc_url( $postContent['images'][0]['image']['sizes']['thumbnail'] ) . ');"></div>';
			} else {
				$html .= '<div class="inner"><div class="image-cropper" style="background-color: #EAE2DF;");"></div>';
			}
			$html .= '<hr/><span class="document-item-title">'.get_the_title().'</span>';
			$html .= '</div></a></div>';

	endwhile;
	$html .= '</section></section>';
	echo $html;
	get_footer();
?>
