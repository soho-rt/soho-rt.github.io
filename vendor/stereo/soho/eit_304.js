Stereo.soho.soho_eit_304 = function(){
	var handlers = {};

	if(name) this.name = name ? name : '';

	this.changeStatus = function(stat){
		this.status = stat;
		if(!handlers[stat]) handlers[stat] = [];
		
		for(i in handlers[stat]) 
			handlers[stat][i]();
	};

	this.getStatus = function(){
		return(this.status);
	};

	this.on = function(event,cb){
		if(!handlers[event]) handlers[event] = [];
		
		for(i in handlers[event])
			if(handlers[event][i] === cb) return;

		handlers[event].push(cb);
	};

	this.off = function(event,cb){
		if(!handlers[event]) return;
		while(handlers[event].indexOf(cb) > -1){
			handlers[event].splice(handlers[event].indexOf(cb), 1);
		}
	}

	this.type = "soho_eit_304";

	var _params = { "imgs_list": [] }
	 ,	imgs
	 ,	imgs_loaded = []
	 ,	imgs_animation_index;

	this.render_interval = null;
		 
	function getter(name){
		return(_params[name]);
	};

	function setter(name, value){
		_params[name] = value;
	};

	var _load = function (query){
		if(typeof(query) !== "object"){ Stereo.soho.warn("[EIT/304] _get:function - Invalid query."); return; }
		
		/* Validate query */
		var keys = ["num_img", "quality"];
		for(i in keys)
			if(typeof(query[keys[i]]) !== "string" && typeof(query[keys[i]]) !== "number"){ Stereo.soho.warn("[EIT/304] _get:function - Parameter \"num_img\" is string or number."); return; }
		
		$.get("http://sohodata.nascom.nasa.gov/cgi-bin/data_query_search_url?Session=web&Resolution="+query["quality"]+"&Display=Images&NumImg="+query["num_img"]+"&Types=instrument=EIT:wavelength=304").done(_parse);
	};

	function __findOnList(src){
		var imgs_list = getter("imgs_list")
		 ,	src_code = 0;
		
		for(var i=0; i < imgs_list.length; i++){
			if(src === imgs_list[i][src_code]) return(i);
		}
	}

	function __findOnImages(src){
		for(var i=0; i < imgs.length; i++)
			if(src === imgs[i].src) return(i);
	}

	function _parse(response){
		if(!response || !response.results || response.results.length === 0){ 
			Stereo.soho.warn("[EIT/304] _parse:function - Server no response.");
			alert("Sorry! Server no response. Try again.");
			return;
		}
		
		var html = $.parseHTML(response.results[0]);
		imgs = $(html).find("img")

		function __done(){
			var imgs_list = getter("imgs_list");
			var vi = __findOnList($(this).attr("src"));

			if(typeof(vi) === "undefined"){
				var index = __findOnImages($(this).attr("src"));
				imgs_list.push([
					$(this).attr("src"),
					index]);

				imgs_loaded.push(index);
				imgs_loaded.sort(function(a,b){ return(b-a); });
				setter("imgs_list", imgs_list);
				Stereo.soho.log("[EIT/304] _parse:__done:function - Image loaded: "+ $(this).attr("src"));
			} 
		}

		function __fail(){
			Stereo.soho.log("[EIT/304] _parse:__fail:function - Image unloaded: "+ $(this).attr("src"));
		}

		$(imgs).on("load", __done);
		$(imgs).on("error", __fail);
	}

	this.reset = function(){
		this.changeStatus("reset");
		setter("imgs_list", []);
	};

	this.pause = function(){
		this.changeStatus("pause");
		if(this.render_interval !== null) clearInterval(this.render_interval);
	};

	this.play = function(e, time){
		this.changeStatus("play");

		var frameRate = time ? time : this.time
		 ,	elem = e ? e : this.elem;

		if(this.render_interval !== null) clearInterval(this.render_interval);
		this.render_interval = setInterval(function(){
			var index;
			if(imgs_loaded.length === 0) return;
			if(!imgs_animation_index) imgs_animation_index=0;
			
			index = imgs_animation_index;

			if(imgs_animation_index < imgs_loaded.length){
				/* Verify elem type */
				if($(elem).is("img") === true) $(elem).attr("src", imgs[imgs_loaded[index]].src);
				else $(elem).css("background-image", 'url("'+imgs[imgs_loaded[index]].src+'")');
			 	imgs_animation_index++;
			}else imgs_animation_index = 0;
		}, frameRate);
	
	};

	this.attach = function(query){
		this.changeStatus("load");
		Stereo.soho.log("[EIT/304] attach:function - Query sent.");

		//Quality
		if(query["quality"] === "low") query["quality"] = 2;
		if(query["quality"] === "high") query["quality"] = 1;

		//Elem
		this.elem = query["elem"];

		//Time
		this.time = query["time"] ? query["time"]: 200;

		_load(query);
		this.play();
	};
};