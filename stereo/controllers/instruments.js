Stereo.controllers.instruments = new function(){

	var self = this;

	this._load = function(){
		Iz.require_scripts([
			//Load models/views/etc..
			{"src": "/stereo/models/instruments.js"},
			{"src": "/stereo/views/instruments.js"},

			//Load instruments
			{"src": "/vendor/stereo/soho/soho.js"}
		]);
	};

	this.all = function(){
		return(Stereo.models.instruments.all());
	};

	this.findOne = function(elem){
		return(Stereo.models.instruments.findOne(elem));
	};

	this.length = function(){
		return(Stereo.models.instruments.length());
	};

	this.create = function(query){
		if(typeof(query) === "undefined") return(Stereo.warn("[CONTROLLER:INSTRUMENTS] add:function - query undefined."));
		Stereo.models.instruments.create(query);
	}

	this.play = function(elem){
		self.findOne(elem).elem.play();
	};

	this.pause = function(elem){
		self.findOne(elem).elem.pause();
	};

	this.remove = function(query){
		if(typeof(query) === "undefined") return(Stereo.warn("[CONTROLLER:INSTRUMENTS] remove:function - query undefined."));
		Stereo.models.instruments.remove(query);
	};

};

Stereo.controllers.instruments._load();