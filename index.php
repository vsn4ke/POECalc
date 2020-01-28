<?php
  $APIdata = json_decode(file_get_contents("https://poe.ninja/api/data/currencyoverview?league=Metamorph&type=Currency&language=en", true));
  $display = "";
  foreach($APIdata->lines as $key=>$data){
    $display .= "    <tr>\n"; 
    $display .= "      <td>". $data->currencyTypeName . "</td>\n";
    $display .= "      <td>". $data->chaosEquivalent . "</td>\n";
    $display .= "    </tr>\n"; 
  }
?>
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>POE.ninja api implementation</title>
  <meta name="description" content="poe ninja api implementation">
  <meta name="author" content="vsn4ke">

  <link rel="stylesheet" href="css/style.css">

</head>
<body>
  <table>

  </table>
  <div id="calculator">
    <div class="column1">
      <div class="displayOutput">
      
      </div>
      <div class="firstLine">
          <button type="button" name="C">C</button> 
          <button type="button" name="/">/</button>
          <button type="button" name="*">*</button>
          <button type="button" name="-">-</button>
      </div>
      <div class="buttonBlock">
        <div class="numberBlock">
          <div class="buttonLine">
            <button type="button" name="7">7</button>
            <button type="button" name="8">8</button>
            <button type="button" name="9">9</button>
          </div>
          <div class="buttonLine">
            <button type="button" name="4">4</button>
            <button type="button" name="5">5</button>
            <button type="button" name="6">6</button>
          </div>
          <div class="buttonLine">
            <button type="button" name="1">1</button>
            <button type="button" name="2">2</button>
            <button type="button" name="3">3</button>
          </div>
          <div class="buttonLine">
            <button type="button" name="0" class="wide">0</button>
            <button type="button" name=".">.</button>
          </div>
        </div>
        <div class="sideButton">
          <button type="button" name="+" class="tall">+</button>
          <button type="button" name="=" class="tall">=</button>
        </div>
      </div>
    </div>
    <div class="column2">
    
    </div>
  </div>
</body>
</html>