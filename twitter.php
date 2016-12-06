<?php
echo '<link href="css/styles.css" rel="stylesheet">';

ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "188054099-ZQYtU2xgG46WnQSlvWogkH4mwapfIcxZqRNpfHkV",
    'oauth_access_token_secret' => "EEZtY1R1C4PgeAcld9YThfFidUmzSzBcdZ0WxM2QkCbIL",
    'consumer_key' => "zUwNkjwABkJyqm0C5cg2nzWQk",
    'consumer_secret' => "1dhkfrWg3kBNaEcSp2GaESgVrFQ6o5h6JYweLcG58WRHQANIz5"
);

/** URL for REST request, see: https://dev.twitter.com/docs/api/1.1/ **/
$url = 'https://api.twitter.com/1.1/blocks/create.json';
$requestMethod = 'POST';

/** POST fields required by the URL above. See relevant docs as above **/
$postfields = array(
    'screen_name' => 'usernameToBlock',
    'skip_status' => '1'
);

/** Perform a POST request and echo the response **/
// $twitter = new TwitterAPIExchange($settings);
// echo $twitter->buildOauth($url, $requestMethod)
//              ->setPostfields($postfields)
//              ->performRequest();

/** Perform a GET request and echo the response **/
/** Note: Set the GET field BEFORE calling buildOauth(); **/
$url = 'https://api.twitter.com/1.1/search/tweets.json';
$getfield = '?q=#NoDAPL&count=100';
$requestMethod = 'GET';
$twitter = new TwitterAPIExchange($settings);

$tweetData = json_decode($twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest(),$assoc=TRUE);

foreach($tweetData['statuses'] as $index => $items){

      $userArray = $items['user'];
      echo '<div class="twitter-tweet"><div class="twitter-img"><img src="' . $userArray['profile_image_url'] .
      '"></div><span class="float-right"><a href="http://twitter.com/ target="_newtab"' . $userArray['screen_name'] . '">@' .
      $userArray['name'] . '</a></span><a href="http://twitter.com/ target="_newtab"' .
      $userArray['screen_name'] . '"></a>';
      echo '<br>' . $items['text'] . '</div>';
      echo '</div><div style="clear: both"></div><hr>';
      // echo '<hr>';
};
