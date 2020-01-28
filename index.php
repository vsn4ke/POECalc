<?php
        $APIdata = json_decode(file_get_contents("https://poe.ninja/api/data/currencyoverview?league=Metamorph&type=Currency&language=en", true));
        $display = "";
        foreach($APIdata->lines as $key=>$data){
          $display .= "\t\t<tr>\n"; 
          $display .= "\t\t\t<td>". $data->currencyTypeName . "</td>\n";
          $display .= "\t\t\t<td>". $data->chaosEquivalent . "</td>\n";
          $display .= "\t\t</tr>\n"; 
        }
?>
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>POE.ninja api implementation</title>
  <meta name="description" content="poe ninja api implementation">
  <meta name="author" content="vsn4ke">

  <link rel="stylesheet" href="css/styles.css">

</head>
<body>
  <table>
<?= $display; ?>
  </table>
</body>
</html>