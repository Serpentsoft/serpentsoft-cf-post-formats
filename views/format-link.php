<div class="cf-elm-block" id="cfpf-format-link-url" style="display: none;">
	
	<div class="cf-elm-block">
		<label for="cfpf-format-link-display-text"><?php _e('Text To Display', 'cf-post-format'); ?></label>
		<input type="text" name="_format_link_display_text" value="<?php echo esc_attr(get_post_meta($post->ID, '_format_link_display_text', true)); ?>" id="cfpf-format-link-display-text" tabindex="1" />
	</div>
	<div class="cf-elm-block">
		<label for="cfpf-format-link-url-field"><?php _e('URL', 'cf-post-format'); ?></label>
		<input type="text" name="_format_link_url" value="<?php echo esc_attr(get_post_meta($post->ID, '_format_link_url', true)); ?>" id="cfpf-format-link-url-field" tabindex="1" />
	</div>
</div>	