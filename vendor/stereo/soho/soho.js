/* -- Default Instrument Skeleton --
 *
 *	function _get(){}
 *	function _parse(){}
 *
 *	this.get = function(){};
 */

Stereo.soho = new function(){
	var self = this;

	this.instruments = {};

	this.log = Stereo.log;
	this.info = Stereo.info;
	this.warn = Stereo.warn;
	this.error = Stereo.error;

	this._load = function(path){
		var scripts = [
			{ "src": "/vendor/stereo/soho/lasco_c2.js" },
			{ "src": "/vendor/stereo/soho/lasco_c3.js" }
		];
		Iz.require_scripts(scripts);
	};
};

Stereo.soho._load();