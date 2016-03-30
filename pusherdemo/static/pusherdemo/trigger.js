/*
   Log debug information to the browser console.
   */
Pusher.log = function(msg) {
  console.log(msg);
};

/*
   Create a new Pusher instance and connect to Pusher.
   Change this app key to the one for your Pusher app!
   */
var appKey = 'de1d3dce971cfb99cd6c';
var pusher = new Pusher(appKey);

/*
   Subscribe to the channel.
   */
var channel = pusher.subscribe('my-channel');

/*
   Bind to the subscription success event and handle it with an inline function.
   */
channel.bind('pusher:subscription_succeeded', function() {
  console.log('Success!');
});

/*
   Bind to the custom event, `my-event`, and handle with an inline function.
   When the event is received an alert will be shown using the `.message` property of the incoming event payload.
   */
channel.bind('my-event', function(data) {
  alert('A message has been received: ' + data.message);
});

/*
   Handle the submission of the form used to send data to the server.
   That data will then be sent via Pusher.
   */
jQuery('#trigger_form').submit(function(e) {
  // Prevent the normal form submission from taking place
  e.preventDefault();
  var formEl = jQuery(this);
  // Get the data from the `input` form element
  var inputMessage = formEl.find('#trigger_message').val();
  // Build the data to be submitted. A single form value will be sent called `message`
  var submitData = {message: inputMessage};
  // Make the POST request to `/trigger`
  jQuery.post('trigger_submit', submitData);
});
