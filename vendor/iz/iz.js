Iz = new function(){
	this.scripts = {};
	var self = this;

	function _load(path, cb){
		$.get(path)
			.done(function(){
				self.scripts[path] = {
					"status": "done",
					"cb": typeof(cb) === "function" ? cb : null
				};
				Stereo.info("[LOADER] _load:function - The source from ("+path+") was loaded.");
				if(typeof(cb) === "function") cb();
			})
			.fail(function(){
				self.scripts[path] = {
					"status": "fail",
					"cb": typeof(cb) === "function" ? cb : null
				};
				Stereo.error("[LOADER] _load:function - Unable to load the source from("+path+").");
			});
	}

	this.require = function(path, cb){
		if(typeof(path) !== "string") return(Stereo.warn("[LOADER] add:function - path not specified.")); 

		Stereo.log("[LOADER] require:function - Loading source from("+path+")");

		if(self.scripts[path]){
			if(self.scripts[path]["status"] === "done"){
				if(typeof(cb) === "function") return(cb("done"));
			}
			if(self.scripts[path]["status"] === "fail"){ 
				if(typeof(cb) === "function") _load(path, cb);
				else _load(path);
			}
		}else{
			if(typeof(cb) === "function") _load(path, cb);
			else _load(path);
		}
	};

	this.require_scripts = function(scripts){		
		Stereo.log("[LOADER] require_scripts:function - Loading sources...");
		if(!scripts) return;

		//Load main scripts
		for(i in scripts){
			if(typeof(scripts[i]["src"]) === "string"){
				if(scripts[i]["cb"]){
					self.require(scripts[i]["src"], scripts[i]["cb"]);
				}else self.require(scripts[i]["src"]);
			}
		}
	};
};