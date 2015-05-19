jQuery(function($) {
	var CF = CF || {};
	
	CF.postFormats = function($) {
		return {
			switchTab: function(clicked) {
				var $this = $(clicked),
					$tab = $this.closest('li');

				if (!$this.hasClass('current')) {
					$this.addClass('current');
					$tab.siblings().find('a').removeClass('current');
					this.switchWPFormat($this.attr('href'));
				}
			},
			
			switchWPFormat: function(formatHash) {
				$(formatHash).trigger('click');
				switch (formatHash) {
					case '#post-format-0':
					case '#post-format-aside':
					case '#post-format-chat':
						CF.postFormats.standard();
						break;
					case '#post-format-status':
					case '#post-format-link':
					case '#post-format-image':
					case '#post-format-gallery':
					case '#post-format-video':
					case '#post-format-quote':
					case '#post-format-audio':
						CF.postFormats[formatHash.replace('#post-format-', '')]();
				}
				$(document).trigger('cf-post-formats-switch', formatHash);
			},

			standard: function() {
				$('#cfpf-format-link-url, #cfpf-format-quote-fields, #cfpf-format-video-fields, #cfpf-format-audio-fields, #cfpf-format-gallery-preview, #cfpf-format-status').hide();
				$('#titlewrap').show();
				$('#postimagediv-placeholder').replaceWith($('#postimagediv'));
			},
			
			status: function() {
				$('#cfpf-format-link-url, #cfpf-format-quote-fields, #cfpf-format-video-fields, #cfpf-format-audio-fields, #cfpf-format-gallery-preview').hide();
				$('#titlewrap, #cfpf-format-status').show();
				$('#postimagediv-placeholder').replaceWith($('#postimagediv'));
				//$('#content:visible').focus();
			},

			link: function() {
				$('#cfpf-format-quote-fields, #cfpf-format-video-fields, #cfpf-format-audio-fields, #cfpf-format-gallery-preview, #cfpf-format-status').hide();
				$('#titlewrap, #cfpf-format-link-url').show();
				$('#postimagediv-placeholder').replaceWith($('#postimagediv'));
			},
			
			image: function() {
				$('#cfpf-format-link-url, #cfpf-format-quote-fields, #cfpf-format-video-fields, #cfpf-format-audio-fields, #cfpf-format-gallery-preview, #cfpf-format-status').hide();
				$('#titlewrap').show();
				$('#postimagediv').after('<div id="postimagediv-placeholder"></div>').insertAfter('#titlediv');
			},

			gallery: function() {
				$('#cfpf-format-link-url, #cfpf-format-quote-fields, #cfpf-format-video-fields, #cfpf-format-audio-fields, #cfpf-format-status').hide();
				$('#titlewrap, #cfpf-format-gallery-preview').show();
				$('#postimagediv-placeholder').replaceWith($('#postimagediv'));
			},

			video: function() {
				$('#cfpf-format-link-url, #cfpf-format-quote-fields, #cfpf-format-gallery-preview, #cfpf-format-audio-fields, #cfpf-format-status').hide();
				$('#titlewrap, #cfpf-format-video-fields').show();
				$('#postimagediv-placeholder').replaceWith($('#postimagediv'));
			},

			quote: function() {
				$('#cfpf-format-link-url, #cfpf-format-video-fields, #cfpf-format-audio-fields, #cfpf-format-gallery-preview, #cfpf-format-status').hide();
				$('#cfpf-format-quote-fields').show().find(':input:first').focus();
				$('#postimagediv-placeholder').replaceWith($('#postimagediv'));
			},

			audio: function() {
				$('#cfpf-format-link-url, #cfpf-format-quote-fields, #cfpf-format-video-fields, #cfpf-format-gallery-preview, #cfpf-format-status').hide();
				$('#titlewrap, #cfpf-format-audio-fields').show();
				$('#postimagediv-placeholder').replaceWith($('#postimagediv'));
			},

			gallerySortable: function() {
				$galleryPreview = $('#cfpf-format-gallery-preview .gallery');
				$galleryPreview.sortable({
					containment: 'parent',
					cursor: 'move',
					forceHelperSize: true,
					forcePlaceholderSize: true,
					update: function() {
						var ids = [];
						$galleryPreview.find('img.attachment-thumbnail').each(function() {
							ids.push($(this).data('id'));
						});

						$.post(
							ajaxurl,
							{
								'action': 'cfpf_gallery_menu_order',
								'order': ids
							}
						);
					}
				});
			}
		};
	}(jQuery);
	
	// move tabs in to place
	$('#cf-post-format-tabs').insertBefore($('form#post')).show();
	$('#cfpf-format-link-url, #cfpf-format-video-fields, #cfpf-format-audio-fields, #cfpf-format-status').insertAfter($('#titlediv'));
	$('#cfpf-format-gallery-preview').find('dt a').each(function() {
		$(this).replaceWith($(this.childNodes)); // remove links
	}).end().insertAfter($('#titlediv'));
	$('#cfpf-format-quote-fields').insertAfter($('#titlediv'));
	
	$(document).trigger('cf-post-formats-init');
	
	// tab switch
	$(document).on('click', '#cf-post-format-tabs a', function(e) {
		CF.postFormats.switchTab(this);
		e.stopPropagation();
		e.preventDefault();
	});
	$('#cf-post-format-tabs a').filter('.current').each(function() {
		CF.postFormats.switchWPFormat($(this).attr('href'));
	});
	
	// set to shortcode when clicking into shortcode field
	$(document).on('click focus', '#cfpf-format-gallery-shortcode', function() {
		$('#cfpf-format-gallery-type-shortcode').prop('checked', true);
	});

	// WordPress 3.5 compatibility
	// props: https://gist.github.com/4192094
	
	var postId = $('#post_ID').val();

	var gallery;


	//gallery = wp.media.query({ uploadedTo: postId });

	// Run the query.
	// This returns a promise (like $.ajax) so you can do things when it completes.
	//gallery.more();

	var $gallery_ids = [];
	var $gallery_shortcode = '';

	var $addImageLink = $('#cfpf-format-gallery-preview .none a');
	var $preview_images = $('#cfpf-format-gallery-preview .srp-gallery');

	var update = function(){
		var ids = '',
			arr_images = [];

		if( $preview_images.find('span').length > 0 ){
			$preview_images.find('span').each(function(i){
				arr_images[i] = $(this).data('id');
			});
		}
		else{
			$('#cfpf-format-gallery-shortcode').val('');
		}


		if (arr_images.length > 0){
			ids = arr_images.join(',');
		}

		if( ids !== '' ){
			$gallery_shortcode = '[gallery ids="' + ids + '"]';
			$('#cfpf-format-gallery-shortcode').val($gallery_shortcode);
		}
	}

	// Remove image
	$preview_images.on('click', 'span i', function() {
		$(this).parent('span').css('border-color', '#f03').fadeOut(300, function() {
			$(this).remove();
			update();
		});
	});

	// Add New Images
	$addImageLink.on('click', function(e) {
		//$('#wp-content-media-buttons .insert-media').mousedown().mouseup().click();
		e.preventDefault();

		if( gallery ){
			gallery.open();
			return;
		}

		gallery = wp.media.frames.gallery = wp.media({
			title: 'Customize your own gallery',
			library: {
				type: 'image'
			},
			multiple: true
		});
	

		gallery.on('select', function() {
			var files = gallery.state().get('selection').toJSON();
			//$preview_images.find('em').remove();
			
			$.each(files, function(i) {
				$preview_images.append('<span data-id="' + this.id + '" title="' + this.title + '"><img src="' + this.url + '" alt="" /><i class="srp-dashicons"></i></span>');
			});

			update();
		}).open();



		// Bind your events for when the contents of the gallery changes.
		// gallery.on( 'add remove reset', function() {
		// 	// Something changed, update your stuff.

		// 	var $preview = $('#cfpf-format-gallery-preview');
			
		// 	// spinner
		// 	$preview.find('.cf-elm-container').html('<p><img src="' + cfpf_post_format.wpspin_light + '" alt="' + cfpf_post_format.loading + '" /></p>');
			
		// 	// AJAX call for gallery snippet
		// 	$.post(
		// 		ajaxurl,
		// 		{
		// 			'action': 'cfpf_gallery_preview',
		// 			'id': $('#post_ID').val()
		// 		},
		// 		function(response) {
					
		// 			// replace
		// 			$preview.replaceWith(response.html);
					
		// 			// find it again
		// 			$preview = $('#cfpf-format-gallery-preview')
		// 			$preview.find('dt a').each(function() {
		// 				$(this).replaceWith($(this.childNodes)); // remove links
		// 			}).end();
					
		// 			// only show if tab is selected
		// 			if ($('#cf-post-format-tabs a.current').attr('href').indexOf('#post-format-gallery') != -1) {
		// 				$preview.show();
		// 			}

		// 			CF.postFormats.gallerySortable();
		// 		},
		// 		'json'
		// 	);

		// }, gallery );

		// gallery.open();

	});


	$preview_images.sortable({
		containment: 'parent',
		cursor: 'move',
		forceHelperSize: true,
		forcePlaceholderSize: true,

		stop: function() {
			update();
		}
	});

	CF.postFormats.gallerySortable();

	// Gallery Style
	// Page Layout (Middle, Left, Right)
    jQuery("#ul_format_gallery_style input:checked").parent().addClass("selected");
    jQuery("#ul_format_gallery_style .checkbox-select").click(
        function(event) {
            event.preventDefault();
            jQuery("#ul_format_gallery_style li").removeClass("selected");
            jQuery(this).parent().addClass("selected");
            jQuery(this).parent().find(":radio").attr("checked","checked");			 
        });
    
});