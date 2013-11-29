function SOHO(){
	var self = this;

	/*Instrument LASCO - Detector C3*/
	var lasco_c3_imgs_length = 0
	 ,	lasco_c3_imgs_called = 0
	 ,	lasco_c3_imgs_called_index = [];

	this.get_lasco_c3 = function(){
		//Show progress bar
		$("#soho-anim-progress-container").show();
		$("#soho-lasco_c3-alert").text(" (Wait! Will take a while)");

		$.get("http://sohodata.nascom.nasa.gov/cgi-bin/data_query_search_url?Session=web&Resolution=2&Display=Images&NumImg=30&Types=instrument%3DLASCO%3Adetector%3DC3").done(query_response_lasco_c3);
	}

	function query_response_lasco_c3(res){
		if(!res || !res.results || res.results.length === 0){ return(parse_lasco_c3(null)); }
		
		parse_lasco_c3(res.results[0]);
	}

	function parse_lasco_c3(res){
		if(res === null){
			alert("The servers are overloaded. Try again!");
			document.location.reload();
			return;
		}

		var h = $.parseHTML(res);
		var imgs = $(h).find("img");
		
		lasco_c3_imgs_length = imgs.length;
		imgs.each(scraper_lasco_c3);
		
		/* Call check_lasco_c3 to check the number of images downloaded */
		self.check_lasco_c3_interval = setInterval(check_lasco_c3, 1000);
	}

	function scraper_lasco_c3(index, img){
		$(img).attr("id", "lasco_c3_"+index)
			  .attr("soho-anim-active", "false")
			  .addClass("lasco_c3")
		      .css("display", "none");
		
		$(img).on("load", function(){	//Success - Loaded image
			$("#soho-anim").append($(this));
			lasco_c3_imgs_called++;
			lasco_c3_imgs_called_index.push(index);
	  	});
		
		$(img).on("error", function(){
			lasco_c3_imgs_called++;
			console.warn("[SOHO] "+$(this).attr('src')+" not loaded.");
		});
	}


	function show_lasco_c3(option){
		if(!option || !option["preview"] || option["preview"] !== true){
			$("#soho-anim-progress-container").hide();
		}

		//Scroll page
		if($("#soho-anim img:first").is("img") === true){
			$(document).scrollTop($("#soho-anim img:first").height());
		}
		
		var list= lasco_c3_imgs_called_index.sort(function(a,b){return b-a});

		if($('.lasco_c3[soho-anim-active="true"]').length === 0 && list.length > 0){
			$("#lasco_c3_"+list[0]).attr("soho-anim-active", "true");
			$('.lasco_c3[soho-anim-active="true"]').show();
		}else if(list.length > 0){
				var imgs_active =  $('.lasco_c3[soho-anim-active="true"]');
				if(imgs_active.length === 0) return;
				
				var img_active_index = imgs_active[0].id.replace('lasco_c3_','');
					img_active_index = img_active_index ? parseInt(img_active_index) : 0;
				
				for(i in list){
					if(list[i] < img_active_index){
						$("#lasco_c3_"+img_active_index).attr("soho-anim-active", "false");
						$("#lasco_c3_"+list[i]).attr("soho-anim-active", "true");
						break;
					}
					if(i > 0 && list[i] === list[list.length - 1]){
						$("#lasco_c3_"+img_active_index).attr("soho-anim-active", "false");
						$("#lasco_c3_"+list[0]).attr("soho-anim-active", "true");
						break;
					}
				}
				
				$('.lasco_c3').hide();
				$('.lasco_c3[soho-anim-active="true"]').show();
		}

	}

	function check_lasco_c3(){
		if(lasco_c3_imgs_called === lasco_c3_imgs_length){
			return(show_lasco_c3());
		}

		//Update progress bar
		if(lasco_c3_imgs_called > 0){
			var imgs_loaded_percentage = 100/lasco_c3_imgs_length*lasco_c3_imgs_called;
			
			imgs_loaded_percentage = String(imgs_loaded_percentage.toFixed(0)) + '%';
			$("#soho-anim").find(".progress-bar").css("width", imgs_loaded_percentage);
			$("#soho-anim").find(".progress-bar .sr-only").text(imgs_loaded_percentage+" Complete");
			$("#soho-lasco_c3-progress-alert").text(imgs_loaded_percentage+" Loading images from NASA servers ...");

			//Preview Animation
			show_lasco_c3({"preview":true});
		}else{
			var imgs_loaded_percentage = 100/lasco_c3_imgs_length;

			imgs_loaded_percentage = String(imgs_loaded_percentage.toFixed(0)) + '%';
			$("#soho-anim").find(".progress-bar").css("width", imgs_loaded_percentage);
			$("#soho-anim").find(".progress-bar .sr-only").text(imgs_loaded_percentage+" Complete");
		}
	}
}

var SO = new SOHO();
$("#soho-lasco-c3-start-btn").click(function(){
	$(this).attr("disabled","disabled");
	SO.get_lasco_c3();
});