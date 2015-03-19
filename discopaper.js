(function(w,$,undefined) {

	var DiscoPaper = function(el) {
		var _this = this;
		// Get background image size
		// Append images into container to fill
		_this.el = el;
		_this.$el = $(el);
		_this.getElementSize();
		_this.images = [];
		_this.image = new Image();
		_this.image.src = this.style.getPropertyValue('background-image').replace(new RegExp( /(url\(|\)|\")+/g ),'');
		console.log( "Image Src:", _this.image.src);
		/* Imagetimeout */
		setTimeout(function() {
			_this.setupSize();

		}, 1000 );

		$(window).on('resize', function() { _this.resize() });
	}

	DiscoPaper.prototype.getElementSize = function() {
		var _this = this;
		_this.style = _this.el.currentStyle || window.getComputedStyle(_this.el, false);

		_this.el_width = Math.floor(parseFloat( _this.style.getPropertyValue('width') ));
		_this.el_height = Math.floor(parseFloat( _this.style.getPropertyValue('height') ));
		
		_this.$el.css({
			width: _this.el_width,
			height: _this.el_height 
		})
	}
	DiscoPaper.prototype.getBackgroundSize = function() {
		var _this = this;
		return _this.containDimensions( _this.image.width, _this.image.height, parseInt( _this.$el.css('width') ), parseInt( _this.$el.css('height')) );
	}

	DiscoPaper.prototype.setupSize = function() {
		var _this = this;
		
		_this.getElementSize();
		_this.background_size = _this.getBackgroundSize();
                console.log(_this.background_size);

		_this.$el.css({
			overflow: 'hidden',
			position: 'relative'
		});

		var image_counter = Math.ceil( _this.el_width / _this.background_size.width ),
			available_space = (_this.el_width - _this.background_size.width ) * .5,
			image_offset = ( _this.background_size.width - available_space ) * -1;

		var pairs = 0;


		for ( var i = 0; i < image_counter; i++ ) {

			var imageWidth = _this.background_size.width + 2,
				imageHeight = _this.el_height,
				img = new Image( imageWidth , imageHeight ),
				offset_x = ((_this.background_size.width) * pairs),
				cssProps = {
					'position'  : 'absolute',
					'top'       : 0,
					'transform' : pairs % 2 ? 'none' : 'scaleX(-1)',
					'width'     : imageWidth,
					'height'    : imageHeight
				},
				propertyName = i % 2 ? 'left' : 'right';

			cssProps[propertyName] = image_offset - offset_x;

			img.src = _this.image.src;
			_this.$el.append(img);

			$(img).css( cssProps );

			_this.images.push(img);
		}
	}

	DiscoPaper.prototype.resize = function() {
		var _this = this; 
		for (var i = _this.images.length - 1; i >= 0; i--) {
			_this.images[i].remove();
		};
		setTimeout(function() {
			_this.setupSize();
		}, 100 );
	}

	// Utils
	DiscoPaper.prototype.min = function( a, b ) {
		return a > b ? b : a;
	}

	/**
	 * Resizes an object within a container dimension
	 * while preserving the aspect ratio
	 *
	 * @param  {float}   child_w
	 * @param  {float}   child_h
	 * @param  {float}   container_w
	 * @param  {float}   container_h
	 * @return {object}  Resulting w and h
	 */
	DiscoPaper.prototype.containDimensions = function ( child_w, child_h, container_w, container_h ) {
		var scale_factor = this.min( container_w / child_w, container_h / child_h );
		return {
			width:  child_w * scale_factor,
			height: child_h * scale_factor
		};
	};



	/////////////////////
	//
	// Init
	//  
	/////////////////////

	var mirrors = [];
	var $d = $('[data-discopaper]');

	$d.each(function() {
		mirrors.push( new DiscoPaper( $(this).get(0) ) );
	});


}(window, window.jQuery))