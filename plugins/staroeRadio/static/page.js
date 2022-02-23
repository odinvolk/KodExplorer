var stantion =1;var srplayer = {
    fplay:0,
    ferror:0,
	url:"http://server.audiopedia.su:8000/",
	source:"ices",
	bitrate:"128",
	player:0,
    set_br:0,
    num_br:1,
    set_radio:0,
    num_radio:1,
    elIndicator:0,
    eltxt_ok:0,
    eltxt_err:0,
	init:function(){
        if(stantion > 0) srplayer.num_radio = stantion;
		srplayer.player = document.getElementById("player5");
		srplayer.player.onloadedmetadata = srplayer.onloadedmetadata;
		srplayer.player.onerror = srplayer.onerrorplayer;
        var el = document.getElementById("power_btn");
        el.onclick = srplayer.play;
        el.onmousedown = function(){this.style.backgroundImage = "url('img/btn_on_nd.png')";};
        el.onmouseup = el.onmouseout = function(){this.style.backgroundImage = "url('img/btn_on_n.png')";};
        srplayer.elIndicator = document.getElementById("indicator");
        srplayer.eltxt_ok = document.getElementById("txt_ok");
        srplayer.eltxt_err = document.getElementById("txt_err");
        el = document.getElementById("br1");
        el.onmousedown = function(){srplayer.set_br_btn(this,1,1)};
        el.onmouseup = el.onmouseout = function(){srplayer.set_br_btn(this,1,0)};
        el.onclick = function(){srplayer.onclick_br_btn(1)};
        el = document.getElementById("br2");
        el.onmousedown = function(){srplayer.set_br_btn(this,2,1)};
        el.onmouseup = el.onmouseout = function(){srplayer.set_br_btn(this,2,0)};
        el.onclick = function(){srplayer.onclick_br_btn(2)};
        el = document.getElementById("br3");
        el.onmousedown = function(){srplayer.set_br_btn(this,3,1)};
        el.onmouseup = el.onmouseout = function(){srplayer.set_br_btn(this,3,0)};
        el.onclick = function(){srplayer.onclick_br_btn(3)};
        el = document.getElementById("radio1");
        el.onmousedown = function(){srplayer.set_radio_btn(this,1,1)};
        el.onmouseup = el.onmouseout = function(){srplayer.set_radio_btn(this,1,0)};
        el.onclick = function(){srplayer.onclick_radio_btn(1)};
        el = document.getElementById("radio2");
        el.onmousedown = function(){srplayer.set_radio_btn(this,2,1)};
        el.onmouseup = el.onmouseout = function(){srplayer.set_radio_btn(this,2,0)};
        el.onclick = function(){srplayer.onclick_radio_btn(2)};
        el = document.getElementById("radio3");
        el.onmousedown = function(){srplayer.set_radio_btn(this,3,1)};
        el.onmouseup = el.onmouseout = function(){srplayer.set_radio_btn(this,3,0)};
        el.onclick = function(){srplayer.onclick_radio_btn(3)};
	},
	set_br_btn:function(el,numbtn,down){
        if(srplayer.set_br == numbtn){
            if(down) el.style.backgroundImage = "url('img/btn_br_sd.png')";
            else el.style.backgroundImage = "url('img/btn_br_so.png')";
        }else{
            if(down) el.style.backgroundImage = "url('img/btn_br_nd.png')";
            else el.style.backgroundImage = "url('img/btn_br_no.png')";
        }
	},
	onclick_br_btn:function(numbtn){
        srplayer.set_br = numbtn;
        var freset = (srplayer.set_br != srplayer.num_br);
        if(numbtn) srplayer.num_br=numbtn;
        if((!srplayer.fplay)&&numbtn){
            srplayer.play(); return;
        }
        var el = document.getElementById("br1");
        srplayer.set_br_btn(el,1,0);
        el = document.getElementById("br2");
        srplayer.set_br_btn(el,2,0);
        el = document.getElementById("br3");
        srplayer.set_br_btn(el,3,0);
        switch(numbtn) {
            case 1: srplayer.bitrate="128"; break;
            case 2: srplayer.bitrate="64"; break;
            case 3: srplayer.bitrate="32"; break;
        };
        if(((numbtn>0)&&(freset))||srplayer.ferror) srplayer.on_reset();
	},
	onclick_radio_btn:function(numbtn){
        srplayer.set_radio = numbtn;
        var freset = (srplayer.set_radio != srplayer.num_radio);

        if(numbtn) srplayer.num_radio = numbtn;
        if((!srplayer.fplay)&&numbtn){
            srplayer.play(); return;
        }
        var el = document.getElementById("radio1");
        srplayer.set_radio_btn(el,1,0);
        el = document.getElementById("radio2");
        srplayer.set_radio_btn(el,2,0);
        el = document.getElementById("radio3");
        srplayer.set_radio_btn(el,3,0);
       switch(numbtn) {
            case 1: srplayer.source="ices"; break;
            case 2: srplayer.source="detskoe"; break;
            case 3: srplayer.source="music"; break;
        };
        if(((numbtn>0)&&(freset))||srplayer.ferror) srplayer.on_reset();
	},
	set_radio_btn:function(el,numbtn,down){
        if(srplayer.set_radio == numbtn){
            if(down) el.style.backgroundImage = "url('img/btn_sd.png')";
            else el.style.backgroundImage = "url('img/btn_so.png')";
        }else{
            if(down) el.style.backgroundImage = "url('img/btn_nd.png')";
            else el.style.backgroundImage = "url('img/btn_no.png')";
        }
	},
    on_reset:function(){
        if(srplayer.ferror) srplayer.ferror = 0;
        srplayer.set_indicator(0);
		srplayer.player.pause();
		srplayer.player.src = srplayer.url+srplayer.source+srplayer.bitrate;
		srplayer.player.load();
	},
	set_indicator:function(visible){
        if(visible){
            srplayer.elIndicator.style.visibility = "visible";
            srplayer.eltxt_ok.style.visibility = "visible";
        } else {
            srplayer.elIndicator.style.visibility = "hidden";
            srplayer.eltxt_ok.style.visibility = "hidden";
            srplayer.eltxt_err.style.visibility = "hidden";
        }
	},
	play:function(){
		srplayer.fplay = !srplayer.fplay;
		if(srplayer.fplay){
            srplayer.onclick_radio_btn(srplayer.num_radio);
            srplayer.onclick_br_btn(srplayer.num_br);
            srplayer.on_reset();
		} else{
            srplayer.ferror = 0;
            srplayer.set_indicator(0);
            srplayer.onclick_radio_btn(0);
            srplayer.onclick_br_btn(0);
            srplayer.player.pause();
		}
	},
	onloadedmetadata:function(){
        //alert(srplayer.player.readyState);
        //if(srplayer.player.readyState == 4) alert(srplayer.player.duration);
        srplayer.set_indicator(1);
		if(srplayer.fplay) srplayer.player.play();
	},
	onerrorplayer:function(){
        srplayer.set_indicator(0);
        srplayer.ferror = 1;
        srplayer.eltxt_err.style.visibility = "visible";
	}
}
