<?php
class WebSVNPlugin extends PluginBase{
	function __construct(){
		parent::__construct();
	}
	public function regiest(){
		$this->hookRegiest(array(
			'templateCommonHeader' => 'WebSVNPlugin.addMenu'
		));
	}
	public function addMenu(){
		$config = $this->getConfig();
		$subMenu = $config['menuSubMenu'];
		navbar_menu_add(array(
			'name'		=> 'WebSVN',
			'icon'		=> $this->appIcon(),
			'url'		=> $this->pluginApi,
			'target'	=> '',
			'subMenu'	=> $subMenu,
			'use'		=> '1'
		));
	}
	public function index(){
		header('Location: '.$this->pluginHost.'websvn/');
	}
}
