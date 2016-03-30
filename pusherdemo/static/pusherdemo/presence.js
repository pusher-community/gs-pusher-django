/*
   Log debug information to the browser console.
   */
Pusher.log = function(msg) {
  console.log(msg);
};
/*
   Set options so that `/presence_auth` is called when the presence channel is subscribed to.
   */
var csrftoken = getCookie('csrftoken');
var options = {
  authEndpoint: '/pusher/presence_auth',
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
var presenceChannel = pusher.subscribe('presence-my-channel');
/*
   Bind to the subscription succeeded event and get an initial list of other users that are subscribed to the channel
   */
presenceChannel.bind('pusher:subscription_succeeded', subscriptionSucceeded);
/*
   Handled the successful subscription to the channel, receiving a list of users
   that are already online/subscribed to the channel.
   */
function subscriptionSucceeded(members) {
  console.log('Success!');
  // call addMember for each user already subscribed
  members.each(addMember);
}
/*
   Bind to the event that is triggered whenever a new user comes online/subscribes to the channel.
   */
presenceChannel.bind('pusher:member_added', addMember);
/*
   Handle new users coming online.
   */
function addMember(member) {
  console.log('addMember: ', member.id, member.info);
}
/*
   Bind to the event that is triggered whenever a user goes offline/unsubscribes from the channel.
   */
presenceChannel.bind('pusher:member_removed', removeMember);
/*
   Handle users going offline.
   */
function removeMember(member) {
  console.log('removeMember: ', member.id, member.info);
}
