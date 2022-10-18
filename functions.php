<?php
// function excerpt_please($post_id) {
//   global $post;
//   $save_post = $post;
//   $post = get_post($post_id);
//   $output = get_the_excerpt();
//   $post = $save_post;
//   return $output;
// }

shortcode_ui_register_for_shortcode(
  'document',
  array(
    'label' => 'Add Document',
    'attrs'          => array(
      array(
        'label'        => 'Document',
        'attr'         => 'id',
        'type'         => 'post_select',
        'query'        => array('person', 'places', 'events', 'organizations', 'letter', 'text', 'still_image' )
      )
    )
  )
);


shortcode_ui_register_for_shortcode(
  'footnote',
  array(
    'label' => 'Add Footnote',
    'attrs'          => array(
      array(
        'label'        => 'Text',
        'attr'         => 'text',
        'type'         => 'textarea'
      )
    )
  )
);

shortcode_ui_register_for_shortcode(
  'attribution',
  array(
    'label' => 'Add Attribution',
    'attrs'          => array(
      array(
        'label'        => 'Name',
        'attr'         => 'name',
        'type'         => 'text'
      ),
      array(
        'label'        => 'Text',
        'attr'         => 'text',
        'type'         => 'textarea'
      )
    )
  )
);


add_filter('nav_menu_css_class' , 'special_nav_class' , 10 , 2);

function special_nav_class ($classes, $item) {
    if (in_array('current-menu-item', $classes) ){
        $classes[] = 'active ';
    }
    return $classes;
}


// wysiwyg edits
function add_style_select_buttons( $buttons ) {
    array_unshift( $buttons, 'styleselect' );
    return $buttons;
}
// Register our callback to the appropriate filter
add_filter( 'mce_buttons_2', 'add_style_select_buttons' );
function wpa_45815($arr){
    $arr['block_formats'] = '';
    $style_formats = array(
            array( 'title' => 'Page Title', 'inline' => 'span', 'classes' => 'page-title', 'wrapper' => false),
            array( 'title' => 'Essay Header', 'inline' => 'span', 'classes' => 'essay-header', 'wrapper' => false),
            array( 'title' => 'Essay Header CAPS', 'inline' => 'span', 'classes' => 'essay-header caps', 'wrapper' => false),
            array( 'title' => 'Essay Header Inline', 'inline' => 'span', 'classes' => 'essay-header-inline', 'wrapper' => false),
            array( 'title' => 'Item Title', 'inline' => 'span', 'classes' => 'item-title', 'wrapper' => false),
            array( 'title' => 'Subhead', 'inline' => 'span', 'classes' => 'subhead', 'wrapper' => false),
            array( 'title' => 'Pull Quote', 'inline' => 'span', 'classes' => 'pull-quote', 'wrapper' => false),
            array( 'title' => 'Quote', 'inline' => 'span', 'classes' => 'quote', 'wrapper' => true),
            array( 'title' => 'Quote Attribution', 'inline' => 'span', 'classes' => 'attr', 'wrapper' => false),
            array( 'title' => 'Foot Note', 'inline' => 'span', 'classes' => 'footnote', 'wrapper' => false)
    );

    $settings['style_formats'] = json_encode( $style_formats );
    return array_merge($arr, $settings);
  }
add_filter('tiny_mce_before_init', 'wpa_45815');



function enable_more_buttons($buttons) {
  $buttons[] = 'hr';

  /*
  Repeat with any other buttons you want to add, e.g.
    $buttons[] = 'fontselect';
    $buttons[] = 'sup';
  */

  return $buttons;
}
add_filter("mce_buttons", "enable_more_buttons");

// remove_filter( 'the_content', 'wpautop' );
add_shortcode('footnote', 'footnote_shortcode_query');
function footnote_shortcode_query($atts, $content){
  extract(shortcode_atts(array(
   'text' => '')
   , $atts));

  $what = '<span class="footnote">'.$text.'</span>';

  return $what;
}

add_shortcode('attribution', 'attr_shortcode_query');
function attr_shortcode_query($atts, $content){
  extract(shortcode_atts(array(
   'text' => '',
   'name' => '')
   , $atts));

  $what = '<p><span class="attr"> &mdash; <em>'.$name.'</em><br /><span class="attr-quote">'.$text.'</span></span></p>';

  return $what;
}

add_shortcode('document', 'document_shortcode_query');
function document_shortcode_query($atts, $content){
	extract(
		shortcode_atts(
			[
				'id' => get_queried_object_id(),
			],
			$atts
		)
	);

  // global $post;

  $post = get_post($id);
  // print_r($id);
  // $output = '';
  //   if ($posts->have_posts())
  //       while ($posts->have_posts()):
  //           $posts->the_post();
  //           // the_post();
		// 	$id = get_the_ID();
			$document = get_fields($id);
        // $out = 'found a post';
                // <h4><a href="'.get_permalink().'" title="' . get_the_title() . '">'.get_the_title() .'</a></h4>

			$thumb_url = ! empty( $document['images'][0]['image'] ) ? $document['images'][0]['image']['sizes']['large'] : '';
			$image_url = ! empty( $document['images'][0]['image'] ) ? $document['images'][0]['image']['url'] : '';

            $out = '<div class="document-preview">';
            $out .= '<a class="js-trigger" href="javascript:void(0);" title="' . get_the_title($id) . '"><img src=' . esc_url( $thumb_url ) . ' data-original-image="' . esc_url( $image_url ) . '" />';
            $out .= '<div class="image-caption-title">'. get_the_title($id) .'</div>';
            $out .= '<div class="image-caption-ctr">'. $document['caption'] .'</div>';
            $out .= '</a>';
            $out .= '<section class="document-preview-overlay">';
            $out .= '<section class="close-container close"><div class="close-icon"><svg xmlns="http://www.w3.org/2000/svg" width="72" height="71" viewBox="0 0 72 71"><g fill="none" fill-rule="evenodd" stroke="#FBD3BB" stroke-linecap="square" stroke-width="2"><path d="M20.358 16.862l34.135 34.135M18.742 52.904L53.455 18.19"/></g></svg></div></section>';
            $out .= '<section class="document-data">';
            $out .= '<span class="image-caption-title">'. get_the_title($id) .'</span>';
            $out .= '<span class="lightbox-caption">'.$document['description'].'</span>';
            $out .= '<div class="control close"><span class="close icon-back"></span> <span class="lightbox-controls">Back to Essay</span></div>';
            $out .= '<div class="control"><a href="'.get_the_permalink($id).'"><span class="icon-leave"></span> <span class="lightbox-controls">View details</span></a></div>';
            $out .= '</section>';
            $i = 0;
            $iLength = count($document['images']);
            $out .= '<div class="image">';
            foreach($document['images'] as $image) {
              $i++;

			  $thumb_url = ! empty( $image['image']['sizes']['large'] ) ? $image['image']['sizes']['large'] : '';
			  $image_url = ! empty( $image['image']['url'] ) ? $image['image']['url'] : '';

              $out .= '<div class="item-image"><img src="' . esc_url( $thumb_url ) . '" data-original-image="' . esc_url( $image_url ) . '" />';
              if($iLength > 1) {
                $out .= '<span class="item-counter document-counter">'.$i.'/'.$iLength.'</span>';
              }
              $out .= '</div>';
            }
            $out .= '</div>';
            $out .= '</section>';
            $out .= '</div>';

  //           // $out = var_dump($postContent);
  //   endwhile;
  // else
  //   return; // no posts found

  // wp_reset_query();
  // return var_dump($post);
  return html_entity_decode($out);
}

$types = array( 'person', 'places', 'events', 'organizations', 'letter', 'text', 'still_image' );

add_filter( 'template_include', function( $template )
{
  $types = array( 'person', 'places', 'events', 'organizations', 'letter', 'text', 'still_image' );
    // your custom post types
    $my_types = $types;
    // $post_type = get_post_type();


     // is the current request for an archive page of one of your post types?
    if ( is_post_type_archive(  $my_types ) ){
        // if it is return the common archive template
        return get_stylesheet_directory() . '/archive-documents.php';
    } else
    // is the current request for a single page of one of your post types?
    if ( is_singular( $my_types ) ){
        // if it is return the common single template
        return get_stylesheet_directory() . '/single-document.php';
    } else {
        // if not a match, return the $template that was passed in
        return $template;
    }

    // if ( ! in_array( $post_type, $my_types ) )
        // return $template;

    // return get_stylesheet_directory() . '/single-document.php';
});



function register_my_menu() {
  register_nav_menu('header-menu',__( 'Header Menu' ));
}
add_action( 'init', 'register_my_menu' );

add_theme_support( 'post-thumbnails' );

// // add base options page
// acf_add_options_page();

// //add main menu options page
// $menu = array(
// 	'page_title' => 'Main Menu',
// 	'menu_title' => 'Main Menu'
// 	);
// acf_add_options_page($menu);





/*-------------------------------------------------------------------------------
  Custom Columns
-------------------------------------------------------------------------------*/


function sortable_faq_post_columns($query) {
    if ( ! is_admin() )
    return;

  $orderby = $query->get( 'orderby');

  if ( 'internal_flag_for_attention' == $orderby ) {
    $query->set( 'meta_key', 'internal_flag_for_attention' );
    $query->set( 'orderby', 'meta_value_num' );
  }
  if ( 'internal_numerator' == $orderby ) {
    $query->set( 'meta_key', 'internal_numerator' );
    $query->set( 'orderby', 'meta_value_num' );
  }
}

function add_acf_columns ( $columns ) {
   return array_merge ( $columns, array (
     'internal_numerator' => __( 'Orderby' ),
     'internal_flag_for_attention' => __( 'Flagged For Attention' ),
     'id' => __( 'Post ID' )
   ) );
 }

 function exhibition_custom_column ( $column, $post_id ) {
   switch ( $column ) {
     case 'internal_numerator':
       echo get_post_meta ( $post_id, 'internal_numerator', true );
       break;
    case 'id':
       echo $post_id;
       break;
      case 'internal_flag_for_attention':
        if(get_post_meta($post_id, 'internal_flag_for_attention', true)) {
          echo '!!';
        } else {

        }
       break;
   }
 }

 function my_column_register_sortable( $columns )
{
  // unset( $columns['title'] );
  unset( $columns['date'] );
  $columns['internal_numerator'] = 'internal_numerator';
  $columns['internal_flag_for_attention'] = 'internal_flag_for_attention';
  return $columns;
}

function add_type($type) {
  add_filter ( 'manage_'.$type.'_posts_columns', 'add_acf_columns' );
  add_action ( 'manage_'.$type.'_posts_custom_column', 'exhibition_custom_column', 10, 2 );
  add_filter('manage_edit-'.$type.'_sortable_columns', 'my_column_register_sortable' );
}

foreach($types as $type) {
  add_type($type);
}

  add_action( 'pre_get_posts', 'sortable_faq_post_columns');
?>
