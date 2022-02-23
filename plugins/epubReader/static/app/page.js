EPUBJS.filePath = appOptions.epubStatic+"js/libs/";
EPUBJS.cssPath = appOptions.epubStatic+"css/";
//避免css中图片解析；没找到图片时导致css也不加载的问题
EPUBJS.replace.cssUrls = function(_store, base, text){
	var deferred = new RSVP.defer(),
		matches = text.match(/url\(\'?\"?((?!data:)[^\'|^\"^\)]*)\'?\"?\)/g);
	if(!_store) return;
	if(!matches){
		deferred.resolve(text);
		return deferred.promise;
	}
	var promises = matches.map(function(str) {
		var full = EPUBJS.core.resolveUrl(base, str.replace(/url\(|[|\)|\'|\"]|\?.*$/g, ''));
		return _store.getUrl(full).then(function(url) {
			text = text.replace(str, 'url("'+url+'")');
		}, function(reason) {
			deferred.resolve(text); // add by warlee;
			//deferred.reject(reason);
		});
	});
	RSVP.all(promises).then(function(){
		deferred.resolve(text);
	});
	return deferred.promise;
};
EPUBJS.Unarchiver.prototype.getUrl = function(url, mime){
	var unarchiver = this;
	var deferred = new RSVP.defer();
	var decodededUrl = window.decodeURIComponent(url);
	var entry = this.zip.file(decodededUrl);
	var _URL = window.URL || window.webkitURL || window.mozURL;
	var tempUrl;
	var blob;

	//文件丢失允许继续执行
	if(!entry){
		//console.log(111,entry,decodededUrl,url,this.urlCache);
		url = "OEBPS/images/cover.jpg";
		entry = this.zip.file(url);
		if(url in this.urlCache) {
			deferred.resolve(this.urlCache[url]);
			return deferred.promise;
		}
	}

	if(!entry) {
		deferred.reject({
			message : "File not found in the epub111: " + url,
			stack : new Error().stack
		});
		
		return deferred.promise;
	}
	if(url in this.urlCache) {
		deferred.resolve(this.urlCache[url]);
		return deferred.promise;
	}

	blob = new Blob([entry.asUint8Array()], {type : EPUBJS.core.getMimeType(entry.name)});
	tempUrl = _URL.createObjectURL(blob);
	deferred.resolve(tempUrl);
	unarchiver.urlCache[url] = tempUrl;
	return deferred.promise;
};


$(document).ready(function(){
	var reader = ePubReader(appOptions.filePath,{
		reload: false,
		restore: true, 
		generatePagination: false,
		history:false,
		contained:true
	});
	reader.book.on('book:ready', function(){
		reader.book.setStyle('fontSize','13px')
		//reader.book.setStyle('font-family','"Helvetica Neue","Helvetica","Microsoft Yahei","微软雅黑","Lantinghei SC","STXihei","WenQuanYi Micro Hei"');
		$(".list_item").each(function(){
			var id = $(this).attr('id');
			if(id.length <=20){
				$(this).addClass('parent');
			}
		});
	});
	$('body').delegate('.list_item.openChapter.currentChapter', 'click', function(event) {
		$(this).removeClass('openChapter currentChapter');
	});
});