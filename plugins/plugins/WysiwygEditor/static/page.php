<?php
if(isset($_POST["summernote"])){
    file_put_contents($path, $_POST["summernote"]);
}
$file = file_get_contents($path);
if($config["plugins"]!=""){
           $plugins = explode(",",$config["plugins"]);
           $pugins .= "[\"plugins\",[";
           $i=0;
           foreach($plugins as $plugin){
             $pugins .= "\"".$plugin."\"";
             if($i>=0){$pugins.=",";}
             $i++;
           }
           $pugins = substr($pugins, 0, -1);
           $pugins .= "]]";
         }
?>
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css" />
  <link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/codemirror.css">
  <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/theme/monokai.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
  <style>
    body{
        font-family: "Roboto", sans-serif;
    }
    </style>
</head>

<body>
  <h1><?= pathinfo($fileName,PATHINFO_FILENAME) ?></h1>
  <form method="post" id="editor">
    <textarea id="summernote" name="summernote"><?= $file ?></textarea>
  </form>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.js"></script>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/codemirror.js"></script>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/mode/xml/xml.js"></script>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/2.36.0/formatting.js"></script>
  <script>
    $(document).ready(function() {
      var SaveButton = function (context) {
        var ui = $.summernote.ui;
        // create button
        var button = ui.button({
          contents: "<i class='fa fa-save'/>",
          tooltip: "<?= LNG("WysiwygEditor.editor.save") ?>",
          click: function () {
            $("#editor").submit()
          }
        });
        return button.render();   // return button as jquery object
      }
      $("#summernote").summernote({
        toolbar: [
          ["style", ["bold", "italic", "underline", "clear"]],
          ["font", ["strikethrough", "superscript", "subscript"]],
          ["fontsize", ["fontsize"]],
          ["color", ["color"]],
          ["para", ["ul", "ol", "paragraph"]],
          ["height", ["height"]],
          ["kod", ["save","codeview"]],
          <?= $pugins ?>
        ],
        buttons: {
          save: SaveButton
        }
      });
    });
  </script>
</body>
</html>