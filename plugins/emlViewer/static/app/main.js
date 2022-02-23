kodReady.push(function(){
	kodApp.add({
		name:"eml阅读器",
		title:"eml Viewer",
		ext:"{{config.fileExt}}",
		sort:"{{config.fileSort}}",
		icon:'{{pluginHost}}static/images/icon.png',
		callback:function(path,ext){
			var url = '{{pluginApi}}&path='+core.pathCommon(path);
			if('window' == "{{config.openWith}}" && !core.isFileView() ){
				window.open(url);
			}else{
				core.openDialog(url,core.icon(ext),htmlEncode(core.pathThis(path)));
			}
		}
	});

	$.addStyle(
		".x-item-file.x-eml{\
			background-image:url('{{pluginHost}}static/images/icon.png');\
		}\
		.x-item-file.x-mht,.x-item-file.x-mhtml{\
			background-image:url('{{staticPath}}images/file_icon/icon_file/mht.png');\
		}\
		");
});
