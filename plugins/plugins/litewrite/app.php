<?php
class litewritePlugin extends PluginBase{
	function __construct(){
		parent::__construct();
	}
	public function regiest(){
		$this->hookRegiest(array(
			'templateCommonHeader' => 'litewritePlugin.addMenu'
		));
	}
	public function addMenu(){
		$config = $this->getConfig();
		$subMenu = $config['menuSubMenu'];
		navbar_menu_add(array(
			'name'		=> 'Litewrite',
			'icon'		=> $this->appIcon(),
			'url'		=> $this->pluginApi,
			'target'	=> '_parent',
			'subMenu'	=> $subMenu,
			'use'		=> '1'
		));
	}
	public function index(){
		header('Location: '.$this->pluginHost.'litewrite/');
	}
}
