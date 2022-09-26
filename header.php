<!doctype html>
<?php wp_head(); ?>
<head>
<!-- Global Site Tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-106562274-1"></script>
<!-- trackduck mobile tracker -->
<script src="//cdn.trackduck.com/toolbar/prod/td.js" async data-trackduck-id="5add144b22c1d8b3042a9c85"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)};
  gtag('js', new Date());

  gtag('config', 'UA-106562274-1');
</script>


	<meta charset="<?php bloginfo('charset'); ?>">
	<title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' :'; } ?> <?php bloginfo('name'); ?></title>


	<!--- replace http://localhost:4200/asets with get_template_directory_uri(); -->

  <link href="<?php echo get_template_directory_uri(); ?>/favicon.png" rel="shortcut icon">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=IE8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<?php if (is_front_page())  { ?>
	<meta name="og:description" content="<?php bloginfo('description'); ?>">

	<meta property="og:title" content="A Campus Divided">
  <meta property="og:type" content="website">
  <meta property="og:url" content="<?php echo get_site_url(); ?>">
  <meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/ACD.jpg">
  <meta property="og:site_name" content="A Campus Divided">
  <meta property="og:description" content="Progressives, Anticommunists, Racism and Antisemitism at the University of Minnesota 1930-1942">
  <?php } ?>

	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
	<link href="<?php echo get_template_directory_uri(); ?>/dist/assets/style/style.css" rel="stylesheet" />


</head>
<body <?php body_class(); ?> <?php language_attributes(); ?>>
	<nav class="main">
		<div class="inner">
			<div class="left-nav">
				<a class="logo" href="<?php echo get_bloginfo('url'); ?>"><?php echo get_bloginfo('name');?></a>
				<!-- <div class="header-page-title"><?php wp_title('', true, '');?></div> -->
				<div class="header-page-title">
				<?php
				// print_r($post);
					  if(is_single()) {
					  	$t = $post->post_type;
					  	if($t === 'person' || $t === 'still_image' || $t === 'event' || $t === 'text' || $t === 'organization' || $t === 'place' || $t === 'letter') {
					  		$title = 'Documents';
					  		$singleLink = home_url( '/documents/' );
					  	} else if($t === 'essay') {
					  		$title = 'Essays';
					  		$singleLink = home_url( 'essays' );
					  	}

					     ?> <div class="header-page-title"> <a class="no-style" href="<?php echo esc_url( $singleLink ); ?>"><?php echo esc_html( $title ); ?> </div></a><?php
					   } else if (is_search()) {?>
					   <div class="header-page-title">Search</div>
					   <?php } else { ?>
 						<div class="header-page-title"><?php wp_title( ' ', true, 'right' ); ?> </div>
					   <?php }
					  ?>
				</div>
			</div>
			<div class="middle-nav">
				<form class="search-box-form" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
					<input type="text" name="s" class="search-box" placeholder="Enter search here" />
					<input type="hidden" name="sentence" value="1" />
				</form>
			</div>
			<div class="right-nav">
				<div class="controls-wrapper">
					<!-- <?php echo get_search_form(); ?> -->
					<div class="search"><svg width="25px" height="21px" viewBox="0 0 25 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="icon-search" transform="translate(1.000000, 1.000000)" stroke="#FBD3BB">
            <circle id="Oval-2" cx="8" cy="8" r="8"></circle>
            <path d="M15.3369495,12.4909249 L23.3233046,18.5090751" id="Line" stroke-linecap="square"></path>
        </g>
    </g>
</svg></div>
					<span class="menu-label"><span class="word-close">close</span> MENU</span>
					<?php wp_nav_menu( array( 'theme_location' => 'header-menu' )); ?>
				</div>
			</div>
		</div>
	</nav>
	<section class="main">
