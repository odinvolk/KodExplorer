kodReady.push(function(){
	kodApp.add({
		name:"svgView",
		title:"{{LNG.Plugin.default.svgView}}",
		ext:"{{config.fileExt}}",
		sort:"{{config.fileSort}}",
		icon:"x-item-file x-png",
		callback:function(imagePath,ext){
			var appStatic = "{{pluginHost}}static/";
			require.async(appStatic+'page.js',function(app){
				app(imagePath,appStatic)
			});
		}
	});
});
