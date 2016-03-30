/*
Log debug information to the browser console.
*/
Pusher.log = function(msg) {
  console.log(msg);
};
/*
   Set options so that `/private_auth` is called when the presence channel is subscribed to.
   */
var csrftoken = getCookie('csrftoken');
var options = {
  authEndpoint: '/private_auth',
  auth: {
    headers: {
      'X-CSRFToken': csrftoken
    }
  }
};
var appKey = 'de1d3dce971cfb99cd6c';
var pusher = new Pusher(appKey, options);
/*
   Subscribe to the presence channel
   */
var privateChannel = pusher.subscribe('private-my-channel');
/*
   Bind to the subscription success event and handle it with an inline function.
   */
privateChannel.bind('pusher:subscription_succeeded', function() {
  console.log('Private channel success!');
});

privateChannel.bind('pusher:subscription_error', function() {
  console.log('Error', arguments);
});
