kodReady.push(function(){
    if(!$.supportCss3() || isWap()){//ie8 ie9
        return;
    }
	if(lodash.get(window,'Config.pageApp') != 'desktop'){
		return;
	}
	//加载时钟挂件
	$.artDialog.open("{{pluginApi}}",{
		title:"radio",
		top: 35,
		left:$(window).width() - 320,
		width:'355px',
		height:'255px',
		simple:true
	});
});
