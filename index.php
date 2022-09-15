<?php
// this is the blog page
	

	get_header();
	// ?>
	<svg class="defs-only">
	  <filter id="duotone" color-interpolation-filters="sRGB"
	          x="0" y="0" height="100%" width="100%">
	    <feColorMatrix type="matrix"
	      values="0.95 0 0 0  0.05 
	              0.65 0 0 0  0.15  
	              0.15 0 0 0  0.50 
	                0  0 0 1  0" />
	  </filter>
	<div class="landing">
	
	<section class="hero">
		
		<div class="bg bg-1"></div>
		<div class="bg bg-2"></div>
		<div class="bg bg-3"></div>
		<div class="bg bg-4"></div>
		<div class="bg bg-5"></div>
		<div class="bg bg-6"></div>

		<div class="text-container">
			<!-- <div class="logo"><svg width="1165" height="401" viewBox="0 0 1165 401" xmlns="http://www.w3.org/2000/svg"><title>logo</title><g fill="#FFF" fill-rule="evenodd"><path d="M143.32 188H89.8L54.52 2h50.64l38.16 186zM.28 188L38.2 58.4 62.92 188H.28zm215.44-92.4c0 47.28 14.88 86.4 59.28 94.08V.8c-44.4 7.92-59.28 46.8-59.28 94.8zm140.16-37.2C352.76 29.6 333.8 4.16 301.16.8v74.64l54.72-17.04zm0 74.16l-54.72-17.04v73.68c32.88-3.36 51.6-27.6 54.72-56.64zM369.64 152c0 22.8 19.2 36 47.04 36H427v-72.24h-10.32c-27.84 0-47.04 13.44-47.04 36.24zM427 107.36V56c-28.8 1.2-46.08 16.8-52.32 35.04L427 107.36zM499.48 188V96.32c0-29.76-24.72-40.32-44.88-40.32h-4.8v132h49.68zm29.6 0H579V58.4h-49.92V188zM651 188V98.72c0-29.76-24.72-40.32-44.88-40.32h-4.8V188H651zm71.28 0V98.72c0-29.76-24.72-40.32-44.88-40.32h-4.8V188h49.68zm158.48-64.32c0-35.76-20.64-65.28-56.64-65.28V188c33.12 0 56.64-28.32 56.64-64.32zM751.88 242h49.92V58.4h-49.92V242zM1027 58.4h-49.92V188H1027V58.4zm-121.92 0v89.28c0 29.76 24.72 40.32 44.88 40.32h4.8V58.4h-49.68zm146.96 95.04c6.24 17.04 23.76 32.64 48.72 36.96V56c-21.6.96-49.44 19.2-49.44 41.04 0 20.16 8.64 33.6 34.32 45.36l-33.6 11.04zm120-60.48c-6.24-17.04-24-32.64-48.96-36.96v134.4c21.6-.96 49.68-19.2 49.68-41.04 0-20.16-8.64-33.6-34.32-45.36l33.6-11.04zM286.2 398c49.44 0 51.36 0 53.76-.24V212H286.2v186zm136.32-96c0-44.64-18.96-75.12-56.4-85.68 0 29.52.24 135.6 0 177.12 39.84-12 56.4-47.52 56.4-91.44zm26.72 96h49.92V268.4h-49.92V398zm-2.4-165.6c0 13.68 12.24 26.64 27.12 26.64 15.12 0 27.6-12.96 27.6-26.64s-12.48-26.64-27.6-26.64c-14.88 0-27.12 12.96-27.12 26.64zm76.4 36L554.92 398h44.88l-25.92-129.6h-50.64zm124.56 0h-41.52L601 291.68 614.68 362l33.12-93.6zM671.88 398h49.92V268.4h-49.92V398zm-2.4-165.6c0 13.68 12.24 26.64 27.12 26.64 15.12 0 27.6-12.96 27.6-26.64s-12.48-26.64-27.6-26.64c-14.88 0-27.12 12.96-27.12 26.64zm79.04 100.32c0 35.76 20.64 65.28 56.4 65.28V268.4c-32.88 0-56.4 28.32-56.4 64.32zM877.4 212h-49.92v186h49.92V212zm151.52 111.12c-2.4-33.6-18.72-53.04-50.88-57.12v72.48l50.88-15.36zm-127.2 9.6c0 34.56 16.32 63.36 54 67.68V266c-37.68 5.04-54 36.24-54 66.72zm126 31.92l-49.68-16.08.24 51.84c28.56-3.36 42.96-17.04 49.44-35.76zm20.24-31.92c0 35.76 20.64 65.28 56.4 65.28V268.4c-32.88 0-56.4 28.32-56.4 64.32zM1176.84 212h-49.92v186h49.92V212z"/></g></svg></div> -->
		</div>

	</section>



	</svg>


	<?php


	$out = '<section class="home-push body-copy">';
	$out .= '<section class="hero no-fix"><div class="lockup" alt="A Campus Divided"></div></section>';
	$posts = get_fields(538); //bad I know
	$out .= '<div class="home-wrapper">';
	$out .= '<div class="wrapper">';
	$out .= get_post(538)->post_content;
	$out .= '</div>';
	// print_r($posts['featured']);
	$out .= '<div class="featured-items-home image">';
	$count = 0;
    foreach($posts['featured'] as $postObject) {
    $out .= '<div class="document-preview">';
      // $out .= '<div class="item-image"><img src="'.$image['image'].'" /></div>';
    	$id = $postObject->ID;
    	$document = get_fields($id);

            $out .= '<a class="js-trigger item-image" href="javascript:void(0);" title="' . get_the_title($id) . '"><img src='.$document['images'][0]['image'].' /></a>';
            $out .= '<section class="document-preview-overlay">';
            $out .= '<section class="close-container close"><div class="close-icon"><svg xmlns="http://www.w3.org/2000/svg" width="72" height="71" viewBox="0 0 72 71"><g fill="none" fill-rule="evenodd" stroke="#FBD3BB" stroke-linecap="square" stroke-width="2"><path d="M20.358 16.862l34.135 34.135M18.742 52.904L53.455 18.19"/></g></svg></div></section>';
            $out .= '<section class="document-data">';
            $out .= '<span class="image-caption-title"">'. get_the_title($id) .'</span>';
            $out .= '<span class="lightbox-caption">'.$document['description'].'</span>';
            // print_r($posts['featured_essay_links'][0]['link'][0]);
            $out .= '<div class="control"><a href="'.get_the_permalink($posts['featured_essay_links'][$count]['link'][0]).'"></span><span class="icon-leave"></span> <span class="lightbox-controls">Read the essay</span></div>';
            $out .= '<div class="control"><a href="'.get_the_permalink($id).'"><span class="icon-leave"></span> <span class="lightbox-controls">View details</span></a></div>';
            $out .= '</section>';
            $i = 0;
            $iLength = count($document['images']);
            $out .= '<div class="image">';
            foreach($document['images'] as $image) {
              $i++;
              $out .= '<div class="item-image"><img src="'.$image['image'].'" />';
              if($iLength > 1) {
                $out .= '<span class="item-counter document-counter">'.$i.'/'.$iLength.'</span>';
              }
              $out .= '</div>';
            }
            $out .= '</div>';
            // $out .= '<div class="image"><img class="item-image" src="'. $document['images'][0]['image'] .'" /></div>';
            $out .= '</section>';
    $count++;
	$out .= '</div>';
    }
    $out .= '</div>';

    $out .= '<div class="home-wrapper wrapper">';
    $out .= $posts['closing_paragraphs'];
    $out .= '</div>';


    $out .= '<section class="pagination-wrapper grid grid-2">';
	// if previous
	$out .= '<div class="grid-item">';
		$prevPostContent = get_fields(66);
		$out .= '<a class="flexer" href="'.get_site_url().'/index.php/essays">';
		$out .= '<div class="inner"><img style="width: 100%; height: auto;" src="'.$prevPostContent['thumbnail_image'].'" />';
		$out .= '<span class="item-title">Continue to Essays</span>';
		$out .= '</div>';
	$out .= '</div>';
	// end prev
	$out .= '<div class="grid-item">';
		$nextPostContent = get_fields(71);
		$out .= '<a class="flexer" href="'.get_site_url().'/index.php/documents">';
		$out .= '<div class="inner"><img style="width: 100%; height: auto;" src="'.$nextPostContent['thumbnail_image'].'" />';
		$out .= '<span class="item-title">Explore the Documents</span>';
		$out .= '</div>';
	$out .= '</div>';
	// if next
	
	// end next
	$out .= '</section></section></div></div>';

    echo $out;

	?>


</div>
	<?php

	get_footer();
?>