<!DOCTYPE>
<html>
  <head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="google" content="notranslate">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><?php echo $fileName;?></title>

    <script src="<?php echo $this->pluginHost;?>static/ofd/jquery.min.js"></script>
    <script src="<?php echo $this->pluginHost;?>static/ofd/jszip.min.js"></script>
    <script src="<?php echo $this->pluginHost;?>static/ofd/jszip-utils.min.js"></script>
    <script>var ofdFile = "<?php echo $fileUrl;?>";</script>
	<!--[if IE]>
    	<script type="text/javascript" src="<?php echo $this->pluginHost;?>static/ofd/jszip-utils-ie.min.js"></script>
    <![endif]-->
  </head>
  <body style="overflow-y:hidden">
    <div id="canvasContainer" style="margin:0 auto ;"></div>
    <script src="<?php echo $this->pluginHost;?>static/ofd/ofd.js"></script>
  </body>  
</html>