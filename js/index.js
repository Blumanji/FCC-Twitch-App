var channels = [
  "ESL_SC2",
  "OgamingSC2",
  "freecodecamp",
  "habathcx",
  "RobotCaleb"
];
function buildChannels() {
  channels.forEach(function(channel) {
     
   var lightbulb = "";
   var streamURL = "https://wind-bow.glitch.me/twitch-api/streams/" + channel;
   var channelsURL = "https://wind-bow.glitch.me/twitch-api/channels/" + channel;
   var linky = "default"
   $.ajax({
     url: streamURL,
     dataType: 'jsonp',
     success: function (data) {
       var game = "defaultgame";
       var status = "defaultstatus";
       if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Account Closed";
        status = "offline";
      } else {
        game = data.stream.game + " --- " + data.stream.channel.status;
        status = "online";
      };
       
       if (status == "online") {
         lightbulb = "card-success"
       } else {
         lightbulb = "card-danger"
       }
     $.ajax({
       url: channelsURL,
       dataType: 'jsonp',
       success: function(data) {
         var logo = data.logo
         var linky = data.url
         var name = data.display_name
         $("#results").append(
          '<div class="card">' +
            '<div class="card-block container">' +
            '<div class="row text-center">' +
            '<div id="stream-light" class="col-sm-2 ' +
            lightbulb +
            '">' +
            '<a href="' +
            linky +
            '" target="blank"><img class="img-thumbnail logo" src= '+ logo + '></img>' +
            '</a>'+
            '</div>' +
            '<div class="col-sm-4">' +
            '<h5>' +
            '<a href="' +
            linky +
            '" target="blank">' +
            name +
            '</a>' +
            '</h5>' +
            '</div>' +
            '<div class="col-sm-6">' +
            '<h5 id="stream-status">' +
            game +
            '</h5>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
      
       
       
       
       }
     });
     }
     
   });
   });
};   
  


$(document).ready(function(){
  buildChannels();
});