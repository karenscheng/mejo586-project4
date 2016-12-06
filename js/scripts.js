var html = ""
var apiurl = "http://api.flickr.com/services/feeds/photos_public.gne?tags=noDAPL&tagmode=any&format=json&jsoncallback=?"

$(document).ready(function() {
    $('.match').matchHeight();

    $('#pagepiling').pagepiling({
       menu: null,
       direction: 'vertical',
       verticalCentered: true,
       sectionsColor: [],
       anchors: [],
       scrollingSpeed: 700,
       easing: 'swing',
       loopBottom: false,
       loopTop: false,
       css3: true,
       navigation: {
           'textColor': '#000',
           'bulletsColor': '#000',
           'position': 'right',
           'tooltips': ['Main', 'Info', 'Info2', 'Map', 'Twitter', 'Gallery']
       },
       normalScrollElements: null,
       normalScrollElementTouchThreshold: 5,
       touchSensitivity: 5,
       keyboardScrolling: true,
       sectionSelector: '.section',
       animateAnchor: false,

       //events
       onLeave: function(index, nextIndex, direction){},
       afterLoad: function(anchorLink, index){},
       afterRender: function(){},
    });

    $.getJSON(apiurl,function(json){
        // console.log(json);

        $.each(json.items,function(i,data){
            // html += '<p>From:"'+ data.author_id+'"</p>';
            html += '<div class="col-md-3 no-padding flikr-div"><a href="' + data.link + '" target="_newtab"><img src ="'
            + data.media.m + '" class="flickr-img"></a></div>'
            });
        $("#results").append(html);
    });
});

function initMap() {

  var centerPos1 = {lat: 46.4146368, lng: -100.6177363};
  var centerPos2 = {lat: 46.4176277, lng: -100.6360102};

  var map1 = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: centerPos1,
    mapTypeId: 'terrain',
    scrollwheel: false
  });

  var contentString1 = "Sacred Stone Camp";
  var contentString2 = "Oceti Sakowin Camp";

  var infowindow1 = new google.maps.InfoWindow({
    content: contentString1
  });

  var infowindow2 = new google.maps.InfoWindow({
    content: contentString2
  });

  var marker1 = new google.maps.Marker({
    position: centerPos1,
    map: map1
  });

  marker1.addListener('click', function() {
    infowindow1.open(map1, marker1);
  });

  var marker2 = new google.maps.Marker({
    position: centerPos2,
    map: map1
  });

  marker2.addListener('click', function() {
    infowindow2.open(map1, marker2);
  });
};
