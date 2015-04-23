<?php $gallery_type = cfpf_post_gallery_type();
$gallery_lighbox = cfpf_post_gallery_lightbox(); ?>

<div id="cfpf-format-gallery-preview" class="cf-elm-block cf-elm-block-image" style="display: none;">

	<div class="cf-elm-container cfpf-gallery-options">

		<label class="title"><span><?php _e('Gallery Images', 'cf-post-format'); ?></span></label>

		<div class="clearfix">

			<input type="radio" name="_format_gallery_type" value="shortcode" <?php checked($gallery_type, 'shortcode' ); ?> id="cfpf-format-gallery-type-shortcode"  />
			<label class="option" for="cfpf-format-gallery-type-shortcode"><?php _e('Shortcode', 'cf-post-format'); ?></label>
			<input type="text" name="_format_gallery_shortcode" value="<?php echo esc_attr(get_post_meta($post->ID, '_format_gallery_shortcode', true)); ?>" id="cfpf-format-gallery-shortcode" />

			<p class="none upload-image">
				<a href="#" class="button"><?php _e('Upload Images', 'cf-post-format'); ?></a>
			</p>
		</div>

		<p style="display: none; visibility: hidden;">
			<input type="radio" name="_format_gallery_type" value="attached-images" <?php checked($gallery_type, 'attached-images' ); ?> id="cfpf-format-gallery-type-attached" />
			<label for="cfpf-format-gallery-type-attached"><?php _e('Images uploaded to this post', 'cf-post-format'); ?></label>
		</p>

		<div class="srp-gallery clearfix">

		<?php // running this in the view so it can be used by multiple functions

		if( cfpf_post_has_gallery($post->ID) ){
			$att_ids = '';
			$arr_shortcode = '';

			$shortcode = get_post_meta($post->ID, '_format_gallery_shortcode', true);

			if( $shortcode ){
	            // parse shortcode to get 'ids' param
	            $pattern = get_shortcode_regex();
	            preg_match("/$pattern/s", $shortcode, $match);
	            $arr_shortcode = shortcode_parse_atts($match[3]);
	        }

	        if (isset($arr_shortcode['ids'])) {
		        $att_ids = explode(',',  $arr_shortcode['ids']);
		    }
		    // Shortcodes Ultimate Plugin Gallery
		    elseif (isset ($arr_shortcode['source'])){
		        $su_source_ids = explode(':',  $arr_shortcode['source']);
		        
		        if( count($su_source_ids[1]) > 0 ){
		            $att_ids = explode(',',  $su_source_ids[1]);
		        }
		    }

		    if(is_array($att_ids) && count($att_ids) > 0 ){
		    	$img_attributes = $img_src = $img_title = '';

		    	foreach ($att_ids as $att_id) {
		    		$img_attributes = wp_get_attachment_image_src($att_id);
		    		if( $img_attributes ){
		    			$img_src = $img_attributes[0];

		    			if (is_ssl()) {
			    			$img_src = str_replace('http://', 'https://', $img_src);
						}
		    		}
		    		echo '<span data-id="' . esc_attr($att_id) . '" title="' . esc_attr($img_title) . '"><img src="' . esc_url($img_src) . '" alt="" /><i class="srp-dashicons"></i></span>';

		    	}
		    }
		} ?>

		</div>

		<?php // $attachments = get_posts(array(
		// 	'post_type' => 'attachment',
		// 	'numberposts' => -1,
		// 	'post_status' => null,
		// 	'post_parent' => $post->ID,
		// 	'order' => 'ASC',
		// 	'orderby' => 'menu_order ID',
		// ));

		// if ($attachments) {

		// 	if (is_ssl()) {
		// 		add_filter('wp_get_attachment_image_attributes', 'cfpf_ssl_gallery_preview', 10, 2);
		// 	}

		// 	echo '<ul class="gallery clearfix">';
		// 	foreach ($attachments as $attachment) {
		// 		echo '<li>'.wp_get_attachment_image($attachment->ID, 'thumbnail').'</li>';
		// 	}
		// 	echo '</ul>';
		// } ?>

		<div class="clearfix">
			<label class="title" for="ul_format_gallery_style"><?php _e('Gallery Style', 'cf-post-format'); ?></label>

			<?php $gallery_style = 'slider';

			$db_gallery_style = get_post_meta($post->ID, '_format_gallery_style', true);
			switch ($db_gallery_style) {
				case 'slider':
				case 'grid-2cols':
				case 'grid-3cols':
				case 'grid-4cols':
					$gallery_style = $db_gallery_style;
				break;
				
				default:
					$gallery_style = 'slider';
				break;
			} ?>

			<ul id="ul_format_gallery_style" class="cf_gallery_style_image_list clearfix">
				<li>
					<input id="_format_gallery_style_slider" name="_format_gallery_style" type="radio" value="slider" <?php checked($gallery_style, 'slider' ); ?>>
                    <a class="checkbox-select" href="#"><img title="Carousel Slider" src="<?php echo cfpf_base_url().'images/style-slider.jpg'; ?>"></a>
				</li>

				<li>
					<input id="_format_gallery_style_grid-2cols" name="_format_gallery_style" type="radio" value="grid-2cols" <?php checked($gallery_style, 'grid-2cols' ); ?>>
                    <a class="checkbox-select" href="#"><img title="Grid 2 Columns" src="<?php echo cfpf_base_url().'images/style-grid-2cols.jpg'; ?>"></a>
				</li>

				<li>
					<input id="_format_gallery_style_grid-3cols" name="_format_gallery_style" type="radio" value="grid-3cols" <?php checked($gallery_style, 'grid-3cols' ); ?>>
                    <a class="checkbox-select" href="#"><img title="Grid 3 Columns" src="<?php echo cfpf_base_url().'images/style-grid-3cols.jpg'; ?>"></a>
				</li>

				<li>
					<input id="_format_gallery_style_grid-4cols" name="_format_gallery_style" type="radio" value="grid-4cols" <?php checked($gallery_style, 'grid-4cols' ); ?>>
                    <a class="checkbox-select" href="#"><img title="Grid 4 Columns" src="<?php echo cfpf_base_url().'images/style-grid-4cols.jpg'; ?>"></a>
				</li>

			</ul>
		
		</div><!-- Gallery Style -->


		<div class="clearfix">
			<label class="title"><?php _e('Show Lightbox?', 'cf-post-format'); ?></label>

			<div>
				<input type="checkbox" name="_format_gallery_show_lighbox" <?php checked( $gallery_lighbox, 1 ); ?> id="cfpf-format-gallery-show-lightbox" />
				<label class="option" for="cfpf-format-gallery-show-lightbox"><?php _e('Show Lightbox may a little bit slow down your server.', 'cf-post-format'); ?></label>
			</div>
		</div>


	</div>
</div>
