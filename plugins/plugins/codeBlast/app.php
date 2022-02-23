<?php

class codeBlastPlugin extends PluginBase{
	function __construct(){
		parent::__construct();
	}
	public function regiest(){
		$this->hookRegiest(array(
			'user.commonJs.insert' => 'codeBlastPlugin.echoJs',
		));
	}
	public function echoJs($st,$act){
		if($st == 'editor' && $act == 'edit'){
			$this->echoFile('static/main.js');
		}
	}
}