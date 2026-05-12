kodReady.push(function(){
	kodApp.add({
		name:"VLCPlayer",
		title:LNG['Plugin.default.VLCPlayer'],
		ext:"{{config.fileExt}}",
		sort:"{{config.fileSort}}",
		icon:'{{pluginHost}}static/images/icon.png',
		callback:function(path,ext){
			if(isWap()){//ios Загрузка файлов не поддерживается
				window.open(core.path2url(path));
				return;
			}
			var dialog = $.dialog({
				ico:core.icon(ext),
				title:urlDecode(core.pathThis(path)),
				animate:false,
				width:750,
				height:450,
				content:makePlayer(core.path2url(path)),
				resize:true,
				padding:0,
				fixed:true
			});
			$('.VLCPlayer-dialog embed').css('background','#000');

			setTimeout(function() {
				var vlc = getVLC("vlc");
				if(!vlc || !vlc.playlist){
					dialog.DOM.wrap.find('.error-tips').removeClass('hidden');
				}
				dialog._clickMax();
				dialog._clickMax();
			},500);
		}
	});


	function getVLC(name){   
		if (window.document[name]){   
			return window.document[name];   
		}   
		if ($.isIE()) {   
			if (document.embeds && document.embeds[name]){
				return document.embeds[name];  
			} 
		}else{   
			return document.getElementById(name);   
		}   
	} 
	var makePlayer = function(src){
		if(navigator.platform.toLowerCase().indexOf('win') == -1 ){
			var msg = '<div class="row can-select" style="position:absolute;top:40%;width:100%;">\
			 <div class="col-md-8 col-md-offset-2">\
			 <div class="alert alert-warning" role="alert">\
			 <h5>К сожалению, этот плагин поддерживает только системы Windows</h5> </div>  </div></div>';
			return msg;
		}

		var player = "";
		var width = '100%',height = '100%';
		var download = "http://download.videolan.org/pub/videolan/vlc/2.2.6/win32/vlc-2.2.6-win32.exe";

		player = '<object width="'+width+'" height="'+height+'" data="'+src+'" id="VLCPlayer" ';
		player += 'classid="clsid:67DABFBF-D0AB-41fa-9C46-CC0F21721616">'; 
		player += '<param name="codebase" value="http://go.divx.com/plugin/DivXBrowserPlugin.cab">';
		player += '<param value="true" name="autoPlay">';
		player += '<param value="'+src+'" name="src">';
		player += '<embed width="'+width+'" height="'+height+'" version="VideoLAN.VLCPlugin.2" pluginspage="'+download+'" type="application/x-vlc-plugin" name="vlc" src="' + src + '">';
		player += '</object>';

		player += '<div class="row can-select error-tips hidden" style="position:absolute;top:40%;width:100%;">\
		 <div class="col-md-8 col-md-offset-2"><div class="alert alert-warning">\
			<h4> VLC Проигрыватель еще не установлен<br/><br/></h4>\
			<p> Пожалуйста, установите <a href="'+download+'">VLC player</a> после установки вам необходимо перезапустить просмотр.<br/>\
			Или загрузите файл <ahref="'+src+'"></a> на локальный компьютерный проигрыватель для воспроизведения.<br/><br/>\
			Примечание: Для этого плагина требуется поддержка activex. Он поддерживает только Windows, но не firefox и chrome50+ (функция activex заблокирована). Рекомендуется использовать 360 Speed, QQ browser, UC browser, Cheetah и т.д.\
			< / p>\
		</div>\
		</div></div>';
		return player;
	}
});


