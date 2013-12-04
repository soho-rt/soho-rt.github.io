Stereo.controllers.main = new function(){
	
	this._load = function(){
		Iz.require_scripts([
	 		/*	Add the necessary scripts to start the application.
	 		 *
	 		 *	@src: "url"
	 		 *	@cb: function (optional - Experimental)
	 		 *	@require: "url of the requested source" (optional - Not implemented)
	 		 */
	 		{"src":"/stereo/controllers/instruments.js"},
	 		{"src":"/stereo/controllers/dashboard.js"},
	 		{"src": "/vendor/xdomainajax/jquery.xdomainajax.js"}
		]);
	};
};

Stereo.controllers.main._load();