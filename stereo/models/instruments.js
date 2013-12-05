Stereo.models.instruments = new function(){
	var instruments = [];
	var self = this;

	function _create(query){
		for(i in instruments){ if(instruments[i]["elem"] === query["elem"]){
			return(Stereo.warn("[MODEL:INSTRUMENTS] _create:function - Instrument already exists."));
		}}

		var type = query["instrument"].split('-').join('_');

		var i = new Stereo.soho[type](type+'_'+instruments.length);
		i.attach(query);
		instruments.push(i);
	}


	this.all = function(){
		return(instruments);
	};

	this.length = function(){
		return(instruments.length);
	};

	this.findOne = function(elem){
		for(i in instruments){
			if(instruments[i]["elem"] === elem){
				return({
					"index": i,
					"elem": instruments[i]
				});
			}
		}
	};

	this.create = function(query){
		if(typeof(query) === "undefined") return(Stereo.warn("[MODEL:INSTRUMENTS] create:function - query undefined."));
		if(query["instrument"]) validators[query["instrument"]](query, _create);
		else return(Stereo.warn("[MODEL:INSTRUMENTS] create:function - instrument undefined."));
	};

	this.change = function(){

	};

	this.remove = function(query){
		if(typeof(query) === "undefined") return(Stereo.warn("[MODEL:INSTRUMENTS] remove:function - query undefined."));
		if(!query["elem"]) return(Stereo.warn("[MODEL:INSTRUMENTS] remove:function - elem undefined."));
	
		var instrument = self.findOne(query["elem"]);
		if(instrument){
			instruments[instrument.index].pause();
			instruments.splice(instrument.index, 1);
		}
	};

	var validators = {
		"soho-lasco-c2": function(query, cb){
			var msg;
			
			msg = "[MODEL:INSTRUMENTS] validators:lasco-c2:function - num_img is required.";
			if(query["num_img"]){ 
				if(!parseInt(query["num_img"])) return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
			
			msg = "[MODEL:INSTRUMENTS] validators:lasco-c2:function - quality is required (values: 1 or 2).";
			if(query["quality"]){ 
				if(typeof(query["quality"]) !== "string") return(Stereo.warn(msg));
				if(query["quality"] !== "high" && query["quality"] !== "medium" && query["quality"] !== "low") return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
			
			msg = "[MODEL:INSTRUMENTS] validators:lasco-c2:function - time is required (in milliseconds).";
			if(query["time"]){
				if(!parseInt(query["time"])) return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));

			msg = "[MODEL:INSTRUMENTS] validators:lasco-c2:function - elem is required (DOM element).";
			if(query["elem"]){
				if(typeof(query["elem"]) !== "object" && typeof(query["elem"]) !== "string") return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
		
			cb(query);
		},
		"soho-lasco-c3": function(query, cb){
			var msg;
			
			msg = "[MODEL:INSTRUMENTS] validators:lasco-c3:function - num_img is required.";
			if(query["num_img"]){ 
				if(!parseInt(query["num_img"])) return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
			
			msg = "[MODEL:INSTRUMENTS] validators:lasco-c3:function - quality is required (values: 1 or 2).";
			if(query["quality"]){ 
				if(typeof(query["quality"]) !== "string") return(Stereo.warn(msg));
				if(query["quality"] !== "high" && query["quality"] !== "medium" && query["quality"] !== "low") return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
			
			msg = "[MODEL:INSTRUMENTS] validators:lasco-c3:function - time is required (in milliseconds).";
			if(query["time"]){
				if(!parseInt(query["time"])) return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));

			msg = "[MODEL:INSTRUMENTS] validators:lasco-c3:function - elem is required (DOM element).";
			if(query["elem"]){
				if(typeof(query["elem"]) !== "object" && typeof(query["elem"]) !== "string") return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
		
			cb(query);
		},
		"soho-eit-171": function(query, cb){
			var msg;
			
			msg = "[MODEL:INSTRUMENTS] validators:eit-171:function - num_img is required.";
			if(query["num_img"]){ 
				if(!parseInt(query["num_img"])) return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
			
			msg = "[MODEL:INSTRUMENTS] validators:eit-171:function - quality is required (values: 1 or 2).";
			if(query["quality"]){ 
				if(typeof(query["quality"]) !== "string") return(Stereo.warn(msg));
				if(query["quality"] !== "high" && query["quality"] !== "medium" && query["quality"] !== "low") return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
			
			msg = "[MODEL:INSTRUMENTS] validators:eit-171:function - time is required (in milliseconds).";
			if(query["time"]){
				if(!parseInt(query["time"])) return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));

			msg = "[MODEL:INSTRUMENTS] validators:eit-171:function - elem is required (DOM element).";
			if(query["elem"]){
				if(typeof(query["elem"]) !== "object" && typeof(query["elem"]) !== "string") return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
		
			cb(query);
		},
		"soho-eit-195": function(query, cb){
			var msg;
			
			msg = "[MODEL:INSTRUMENTS] validators:eit-195:function - num_img is required.";
			if(query["num_img"]){ 
				if(!parseInt(query["num_img"])) return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
			
			msg = "[MODEL:INSTRUMENTS] validators:eit-195:function - quality is required (values: 1 or 2).";
			if(query["quality"]){ 
				if(typeof(query["quality"]) !== "string") return(Stereo.warn(msg));
				if(query["quality"] !== "high" && query["quality"] !== "medium" && query["quality"] !== "low") return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
			
			msg = "[MODEL:INSTRUMENTS] validators:eit-195:function - time is required (in milliseconds).";
			if(query["time"]){
				if(!parseInt(query["time"])) return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));

			msg = "[MODEL:INSTRUMENTS] validators:eit-195:function - elem is required (DOM element).";
			if(query["elem"]){
				if(typeof(query["elem"]) !== "object" && typeof(query["elem"]) !== "string") return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
		
			cb(query);
		},
		"soho-eit-284": function(query, cb){
			var msg;
			
			msg = "[MODEL:INSTRUMENTS] validators:eit-284:function - num_img is required.";
			if(query["num_img"]){ 
				if(!parseInt(query["num_img"])) return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
			
			msg = "[MODEL:INSTRUMENTS] validators:eit-284:function - quality is required (values: 1 or 2).";
			if(query["quality"]){ 
				if(typeof(query["quality"]) !== "string") return(Stereo.warn(msg));
				if(query["quality"] !== "high" && query["quality"] !== "medium" && query["quality"] !== "low") return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
			
			msg = "[MODEL:INSTRUMENTS] validators:eit-284:function - time is required (in milliseconds).";
			if(query["time"]){
				if(!parseInt(query["time"])) return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));

			msg = "[MODEL:INSTRUMENTS] validators:eit-284:function - elem is required (DOM element).";
			if(query["elem"]){
				if(typeof(query["elem"]) !== "object" && typeof(query["elem"]) !== "string") return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
		
			cb(query);
		},
		"soho-eit-304": function(query, cb){
			var msg;
			
			msg = "[MODEL:INSTRUMENTS] validators:eit-304:function - num_img is required.";
			if(query["num_img"]){ 
				if(!parseInt(query["num_img"])) return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
			
			msg = "[MODEL:INSTRUMENTS] validators:eit-304:function - quality is required (values: 1 or 2).";
			if(query["quality"]){ 
				if(typeof(query["quality"]) !== "string") return(Stereo.warn(msg));
				if(query["quality"] !== "high" && query["quality"] !== "medium" && query["quality"] !== "low") return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
			
			msg = "[MODEL:INSTRUMENTS] validators:eit-304:function - time is required (in milliseconds).";
			if(query["time"]){
				if(!parseInt(query["time"])) return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));

			msg = "[MODEL:INSTRUMENTS] validators:eit-304:function - elem is required (DOM element).";
			if(query["elem"]){
				if(typeof(query["elem"]) !== "object" && typeof(query["elem"]) !== "string") return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
		
			cb(query);
		},
		"soho-hmi-continuum": function(query, cb){
			var msg;
			
			msg = "[MODEL:INSTRUMENTS] validators:hmi-continuum:function - num_img is required.";
			if(query["num_img"]){ 
				if(!parseInt(query["num_img"])) return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
			
			msg = "[MODEL:INSTRUMENTS] validators:hmi-continuum:function - quality is required (values: 1 or 2).";
			if(query["quality"]){ 
				if(typeof(query["quality"]) !== "string") return(Stereo.warn(msg));
				if(query["quality"] !== "high" && query["quality"] !== "medium" && query["quality"] !== "low") return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
			
			msg = "[MODEL:INSTRUMENTS] validators:hmi-continuum:function - time is required (in milliseconds).";
			if(query["time"]){
				if(!parseInt(query["time"])) return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));

			msg = "[MODEL:INSTRUMENTS] validators:hmi-continuum:function - elem is required (DOM element).";
			if(query["elem"]){
				if(typeof(query["elem"]) !== "object" && typeof(query["elem"]) !== "string") return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
		
			cb(query);
		},
		"soho-hmi-magnetogram": function(query, cb){
			var msg;
			
			msg = "[MODEL:INSTRUMENTS] validators:hmi-magnetogram:function - num_img is required.";
			if(query["num_img"]){ 
				if(!parseInt(query["num_img"])) return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
			
			msg = "[MODEL:INSTRUMENTS] validators:hmi-magnetogram:function - quality is required (values: 1 or 2).";
			if(query["quality"]){ 
				if(typeof(query["quality"]) !== "string") return(Stereo.warn(msg));
				if(query["quality"] !== "high" && query["quality"] !== "medium" && query["quality"] !== "low") return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
			
			msg = "[MODEL:INSTRUMENTS] validators:hmi-magnetogram:function - time is required (in milliseconds).";
			if(query["time"]){
				if(!parseInt(query["time"])) return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));

			msg = "[MODEL:INSTRUMENTS] validators:hmi-magnetogram:function - elem is required (DOM element).";
			if(query["elem"]){
				if(typeof(query["elem"]) !== "object" && typeof(query["elem"]) !== "string") return(Stereo.warn(msg));
			} else return(Stereo.warn(msg));
		
			cb(query);
		}
	};
};