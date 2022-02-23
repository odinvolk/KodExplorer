kodReady.push(function(){
	if( !$.supportCanvas() ){
		return;
	}
	kodApp.add({
		name:"ofdView",
		title:"ofd Предварительный просмотр файла",
		ext:"{{config.fileExt}}",
		sort:"{{config.fileSort}}",
		icon:'{{pluginHost}}static/images/icon.png',
		callback:function(path,ext){
			var url = '{{pluginApi}}&path='+core.pathCommon(path);
			if('window' == "{{config.openWith}}"){
				window.open(url);
			}else{
				core.openDialog(url,core.icon(ext),htmlEncode(core.pathThis(path)));
			}
		}
	});
	$.addStyle(
		".x-item-file.x-ofd{\
			background-image:url('{{pluginHost}}static/images/icon.png');\
		}");
});
