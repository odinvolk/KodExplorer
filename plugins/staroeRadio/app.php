<?php

/**
 * 隐藏插件，默认开启
 */
class staroeRadioPlugin extends PluginBase{
	function __construct(){
		parent::__construct();
	}
	public function regiest(){
		$this->hookRegiest(array(
			'user.commonJs.insert' => 'staroeRadioPlugin.echoJs'
		));
	}
	public function echoJs($st,$act){
		$this->echoFile('static/main.js');
	}
	public function index(){
		include($this->pluginPath.'static/page.html');
	}
}
