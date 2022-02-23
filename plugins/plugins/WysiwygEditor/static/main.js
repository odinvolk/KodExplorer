kodReady.push(function(){
    kodApp.add({
        name:"WysiwygEditor",
        title:"WysiwygEditor",
        ext:"{{config.fileExt}}",
        sort:"{{config.fileSort}}",
        icon:"{{pluginHost}}static/images/icon.png",
        callback:function(path,ext){
            var url = "{{pluginApi}}&path="+core.pathCommon(path);
            core.openDialog(url,"<img src=\"{{pluginHost}}static/images/icon.png\"/>",htmlEncode(core.pathThis(path)));
        }
    });
    $.addStyle(
	".x-item-file.x-ofd{\
		background-image:url('{{pluginHost}}static/images/icon.png');\
	}");
});