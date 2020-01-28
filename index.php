<?php
  $APIdata = json_decode(file_get_contents("https://poe.ninja/api/data/currencyoverview?league=Metamorph&type=Currency&language=en", true));
  $display = "";
  foreach($APIdata->lines as $key=>$data){
    $display .= "        <tr>\n"; 
    $display .= "          <td>". $data->currencyTypeName . "</td>\n";
    $display .= "          <td class=\"right\">". $data->chaosEquivalent . "</td>\n";
    $display .= "        </tr>\n"; 
  }
  include("view.html");