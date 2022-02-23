kodReady.push(function(){
	if( !$.supportCanvas() ){
		return;
	}
	kodApp.add({
		name:"epubReader",
		title:"{{LNG.epubReader.meta.title}}",
		ext:"{{config.fileExt}}",
		sort:"{{config.fileSort}}",
		icon:'{{pluginHost}}static/app/images/icon.png',
		callback:function(path,ext){
			var url = '{{pluginApi}}&path='+core.pathCommon(path);
			if('window' == "{{config.openWith}}" && !core.isFileView() ){
				window.open(url);
			}else{
				core.openDialog(url,core.icon(ext),htmlEncode(core.pathThis(path)));
			}
		}
	});
	Hook.bind('explorer.list.fileThumb',function(path,ext){
		if(ext != 'epub') {
			return;
		}
		var apiUrl = "{{pluginApi}}cover";
		var url   = apiUrl+'&path='+core.pathCommon(path);
		var image = G.staticPath+'images/file_icon/icon_file/epub.png';
		var html  = "<div class=' ico'filetype='"+htmlEncode(ext)+
			"'><img draggable='false' class='border-radius-none' ondragstart='return false;' src='"+
			url+"' onerror='javascript:this.src=\""+image+"\";$(this).removeClass(\"border-radius-none\");'/></div>";
		return html;
	});

	var cssText = 
	"body .file .ico img.border-radius-none{\
		border-radius:0;transition: all 0.2s ease;max-height: 90%;\
		box-shadow: 3px 4px 12px 0 rgba(0,0,0,.2);background: #fff;\
	}";
	
	//ui.f5();
	$.addStyle(cssText);
});