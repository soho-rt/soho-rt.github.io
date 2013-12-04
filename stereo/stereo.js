var Stereo = new function(){
	var self = this;

	this.models = {};
	this.views = {};
	this.controllers = {};

	this.init = function(){ 
		Iz.require_scripts([
			/*{"src": "/stereo/router.js"},*/
			{"src": "/stereo/controllers/main.js"}
		]);
	};

	this.log = function(l){ console.log(l); };
	this.info = function(l){ console.info(l); };
	this.warn = function(l){ console.warn(l); };
	this.error = function(l){ console.error(l); };
}

Stereo.init();