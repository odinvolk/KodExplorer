<?php
class WysiwygEditorPlugin extends PluginBase{
    public function __construct(){
		parent::__construct();
	}
	public function regiest(){
	    $this->hookRegiest(array(
	        "user.commonJs.insert" => "WysiwygEditorPlugin.echoJs"
	    ));
	}
	public function echoJs(){
	    $this->echoFile("static/main.js");
	}
	public function index(){
	    $config = $this->getConfig();
	    $path = $this->filePath($this->in['path']);
		$fileUrl  = _make_file_proxy($path);
		$fileName = get_path_this(rawurldecode($this->in['path']));
		$ext = get_path_ext($this->in['path']);
        include($this->pluginPath."static/page.php");
	}
}