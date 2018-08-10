<?php
  $code['AZURE_FUNCTIONS_ENDPOINT'] = getenv('AZURE_FUNCTIONS_ENDPOINT', false);
  echo base64_encode(json_encode($code, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP));
?>
