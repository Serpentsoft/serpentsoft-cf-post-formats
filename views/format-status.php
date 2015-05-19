<?php $status_type = cfpf_post_status_type(); ?>

<div class="cf-elm-block" id="cfpf-format-status" style="display: none;">
	
	<div class="cf-elm-block">

		<input type="radio" name="_format_status_type" value="facebook" <?php checked($status_type, 'facebook' ); ?> id="cfpf-format-status-type-facebook"  />
		<label class="option label-inline-block fix-width-100" for="cfpf-format-status-type-facebook"><?php _e('Facebook', 'cf-post-format'); ?></label>
		<input type="text" class="input-80-per" name="_format_status_facebook_post_url" value="<?php echo esc_attr(get_post_meta($post->ID, '_format_status_facebook_post_url', true)); ?>" id="cfpf-format-status-facebook-post-url" tabindex="1" />
	</div>
	<div class="cf-elm-block">
		<input type="radio" name="_format_status_type" value="twitter" <?php checked($status_type, 'twitter' ); ?> id="cfpf-format-status-type-twitter"  />
		<label class="option label-inline-block fix-width-100" for="cfpf-format-status-type-twitter"><?php _e('Twitter', 'cf-post-format'); ?></label>

		<input type="text" class="input-80-per" name="_format_status_twitter_tweet_url" value="<?php echo esc_attr(get_post_meta($post->ID, '_format_status_twitter_tweet_url', true)); ?>" id="cfpf-format-status-twitter-tweet-url" tabindex="1" />
	</div>
	<div class="cf-elm-block">
		<input type="radio" name="_format_status_type" value="googleplus" <?php checked($status_type, 'googleplus' ); ?> id="cfpf-format-status-type-googleplus"  />
		<label class="option label-inline-block fix-width-100" for="cfpf-format-status-type-googleplus"><?php _e('Google+', 'cf-post-format'); ?></label>

		<input type="text" class="input-80-per" name="_format_status_googleplus_url" value="<?php echo esc_attr(get_post_meta($post->ID, '_format_status_googleplus_url', true)); ?>" id="cfpf-format-status-googleplus-url" tabindex="1" />
	</div>
</div>	