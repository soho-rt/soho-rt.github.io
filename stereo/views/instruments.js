Stereo.views.instruments = new function(){
	var self = this;

	this.add = function(){
		var template = '<div class="col-sm-4 col-md-4 instrument-new-form">\
	  		<div class="panel panel-success">\
		  		<div class="panel-heading">New Instrument\
		  			<button type="button" class="close">&times;</button>\
		  		</div>\
		  		<div class="panel-body">\
		    		<form class="form-horizontal" role="form">\
						<div class="form-group">\
			    			<label class="col-sm-3 control-label">Instrument</label>\
			    			<div class="col-sm-9">\
					      		<select class="form-control input-sm" name="instrument">\
							  		<option value="soho-lasco-c2">SOHO - LASCO/C2</option>\
							  		<option value="soho-lasco-c3">SOHO - LASCO/C3</option>\
\
							  		<option value="soho-eit-171">SOHO - EIT/171</option>\
							  		<option value="soho-eit-195">SOHO - EIT/195</option>\
							  		<option value="soho-eit-284">SOHO - EIT/284</option>\
							  		<option value="soho-eit-304">SOHO - EIT/304</option>\
\
							  		<option value="soho-hmi-continuum">SOHO - HMI/Continuum</option>\
							  		<option value="soho-hmi-magnetogram">SOHO - HMI/Magnetogram</option>\
							  		</select>\
			    			</div>\
			  			</div>\
						<div class="form-group">\
							<label class="col-sm-3 control-label">Quality</label>\
							<div class="col-sm-9">\
								<select class="form-control input-sm" name="quality">\
									<option value="low">Low</option>\
									<option value="high">High</option>\
								</select>\
							</div>\
						</div>\
						<div class="form-group">\
							<label class="col-sm-3 control-label">Frames</label>\
							<div class="col-sm-9">\
								<input type="number" name="num_img" min="1" value="30" class="form-control input-sm">\
							</div>\
						</div>\
\
						<div class="form-group">\
							<label class="col-sm-3 control-label">Speed</label>\
							<div class="col-sm-9">\
								0 ms<input type="range" name="time" min="1" max="1000" value="200" class="input-sm">1000 ms\
							</div>\
						</div>\
\
						<div class="form-group"><hr>\
							<div class="col-sm-offset-1 col-sm-10">\
								<button type="button" class="btn btn-success instrument-create-btn">Load images</button>\
							</div>\
						</div>\
					</form>\
				</div>\
			</div>\
		</div>';

		var e = $.parseHTML(template);
		//Close
		$(e).find(".close").click(self.remove);

		//Create instrument
		$(e).find(".instrument-create-btn").click(self.create);

		$("#instruments").prepend(e);
	};

	this.create = function(){
		var form_box = $(".instrument-new-form").has($(this))
		 ,	form = []
		 ,	field_selectors = ['[name="instrument"]', '[name="quality"]', '[name="num_img"]', '[name="time"]'];

		for(name in field_selectors){
			var field = $(form_box).find(field_selectors[name])
			 ,	value = $(field).val();
			
			
			// Check value field
			if(value.length === 0 && $(field).hasClass("form-control") === true){
				$(field).offsetParent().addClass("has-error");
				return;
			}

			if(value.length === 0 && $(field).hasClass("form-control") === false){
				alert("Invalid value of field \""+$(field).attr("name")+"\"");
				return;
			}

			form[$(field).attr("name")] = $(field).val();
		}

		var template = '<div class="col-sm-4 col-md-4 instrument-container">\
			<div class="panel panel-info">\
				<div class="panel-heading instrument-title">'+form["instrument"].toUpperCase()+'\
					<button type="button" class="close">&times;</button>\
				</div>\
				<div class="panel-body">\
					<div class="row">\
						<div class="col-sm-12">\
							<img class="instrument" width="100%" height="250px" src="/images/icons/loading.gif">\
						</div><hr>\
						<div class="col-sm-12">\
							<div class="col-sm-6">\
								<button class="btn btn-primary instrument-play" style="width:100%;">Play</button>\
							</div>\
							<div class="col-sm-6">\
								<button class="btn btn-primary instrument-pause" style="width:100%;">Pause</button>\
							</div>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>';

		//Remove Form
		$(form_box).remove();

		// Create Instrument Container
		var e = $.parseHTML(template);

		//Bind events
		$(e).find(".close").click(self.remove);
		$(e).find(".instrument-play").click(self.play);
		$(e).find(".instrument-pause").click(self.pause);

		$("#instruments").prepend(e);
		form["elem"] = $(e).find(".instrument")[0];

		Stereo.controllers.instruments.create(form);
	};

	this.remove = function(){
		var parent = $(this).offsetParent();

		// Delete - Instrument - Create Form
		if(parent.is(".instrument-new-form") === true){
			//Prevent - Blank page
			if($(".instrument-container").length === 0 && $(".instrument-new-form").length === 1){
				$(parent).remove();
				self.add(); return;
			}

			$(parent).remove();
			return;
		}

		// Delete - Instrument Container
		if(parent.is(".instrument-container") === true){
			var instrument = parent.find(".instrument")[0];
			
			Stereo.controllers.instruments.remove({
				"elem": instrument
			});

			$(parent).remove();

			//Prevent - Blank page
			if($(".instrument-container").length === 0 && $(".instrument-new-form").length === 0) self.add();

			return;
		}
	};

	this.play = function(){
		var instrument = $(".instrument-container").has($(this)).find(".instrument")[0];
		Stereo.controllers.instruments.play(instrument);
	};

	this.pause = function(){
		var instrument = $(".instrument-container").has($(this)).find(".instrument")[0];
		Stereo.controllers.instruments.pause(instrument);
	};

	this._load = function(){
		//Create new form - New instrument
		$(".instrument-add-btn").click(self.add);

		//Close
		$(".close").click(self.remove);

		//Create instrument
		$(".instrument-create-btn").click(self.create);
	};
};

Stereo.views.instruments._load();