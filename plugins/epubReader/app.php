<?php

class epubReaderPlugin extends PluginBase{
	function __construct(){
		parent::__construct();
	}
	public function regiest(){
		$this->hookRegiest(array(
			'user.commonJs.insert' => 'epubReaderPlugin.echoJs',
		));
	}
	public function echoJs($st,$act){
		if($this->isFileExtence($st,$act)){
			$this->echoFile('static/app/main.js');
		}
	}
	public function index(){
		$path = $this->filePath($this->in['path']);
		$fileUrl  = _make_file_proxy($path);
		$fileName = get_path_this(rawurldecode($this->in['path']));
		$fileName.= ' - '.LNG('kod_name').LNG('kod_power_by');
		include(dirname(__FILE__).'/php/template.html');
	}

	public function cover(){
		$name = get_path_this($this->in['path']);
		$path = $this->filePath($this->in['path']);
		$cacheFile = 'cover'.hash_path($path);
		$imageThumb = DATA_THUMB.$cacheFile.'.png';
		if(file_exists($imageThumb)){
			file_put_out($imageThumb,false);
			exit;
		}
		$check = array(
			'images/cover.jpg',
			'cover.jpg',
			'OEBPS/images/cover.jpg',
			'OEBPS/Images/cover.jpg'
		);
		foreach ($check as $value) {
			$this->tryImage($path,$value,$cacheFile);
		}
		//1.通过meta获取opf文件
		$meta  = KodArchive::extractZipFile($path,'META-INF/container.xml');
		if(!$meta){
			show_json('meta file not exist! '.$name);
		}
		$obj = obj2array(simplexml_load_file($meta));
		$opfFile = $obj["rootfiles"]["rootfile"]['@attributes']['full-path'];
		if(!$opfFile){
			show_json('meta data error! '.$name);
		}

		//2.获取并解析opf文件
		$opf = KodArchive::extractZipFile($path,$opfFile);
		if(!$opf){
			show_json('opf file not exist! '.$name);
		}
		$obj = obj2array(simplexml_load_file($opf));
		$manifest = $obj['manifest']['item'];
		$meta = $obj['metadata']['meta'];
		if(!$meta && !$manifest){
			show_json('opf data error! '.$name);
		}

		//3.查找封面;是否在meta中
		$cover = array();
		foreach ($manifest as $value) {
			$attr = $value["@attributes"];
			if( $attr && $attr['id'] == 'cover' && $attr['href']){
				$cover[] = $attr['href'];
				$cover[] = 'OEBPS/'.$attr['href'];
				break;
			}
		}
		foreach ($meta as $value) {
			$attr = $value["@attributes"];
			if( $attr && $attr['name'] == 'cover' && $attr['content']){
				$cover[] = $attr['content'];
				if(!strstr($attr['content'],'/')){
					$cover[] = 'OEBPS/Images/'.$attr['content'];
				}
				break;
			}
		}
		if(get_path_father($opfFile) != 'OEBPS/'){//根目录不是标准的
			$cover[] = get_path_father($opfFile).'images/cover.jpg';
		}

		//show_json($cover);
		foreach ($cover as $value) {
			$this->tryImage($path,$value,$cacheFile);
		}
		show_json('not found! '.$name);
	}

	private function tryImage($path,$value,$cacheFile){
		$imageThumb = DATA_THUMB.$cacheFile.'.png';
		mk_dir(DATA_THUMB);
		if (!file_exists($imageThumb)){
			$file  = KodArchive::extractZipFile($path,$value,$cacheFile);
			if(!$file){
				return;
			}
			$cm = new ImageThumb($file,'file');
			$cm->prorate($imageThumb,250,250);
		}
		if (!file_exists($imageThumb) || filesize($imageThumb)<100){
			$imageThumb = $file;
		}
		file_put_out($imageThumb,false);
	}
}