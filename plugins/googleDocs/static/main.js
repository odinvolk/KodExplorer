kodReady.push(function(){
	kodApp.add({
		name:"googleDocs",
		title:"{{LNG.googleDocs.meta.name}}",
		ext:"{{config.fileExt}}",
		sort:"{{config.fileSort}}",
		icon:'{{pluginHost}}static/images/icon.png',
		callback:function(path,ext){
			var url = '{{pluginApi}}&path='+core.pathCommon(path);
			window.open(url);//Не поддерживает открытия диалогового окна
		}
	});
});
