
Template.calendar.helpers({
	openEvent: function(){
		return Session.get('openEvent');
	}
});


Template.calendar.rendered = function(){
	cal = $('#cal').fullCalendar({
		googleCalendarApiKey: 'AIzaSyBsjPW46GSXVVYBoGwDirzwn-1gpxtPoUs',
		events: {
		  googleCalendarId: 'kik.in.chicken@gmail.com',
		  borderColor: 'black',
		  // className: 'noDec',
		},

		height: 600,

		header: {
			left:   'prev',
			center: 'title',
			right:  'next',
		},

		eventClick: function(calevent){
			Session.set('openEvent', calevent._id);
			var	ce = calevent;
			if (calevent.url){
				$('.reveal-modal').foundation('reveal', 'open');
				return false;
			}
		},
		eventAfterAllRender: function(view){
			Session.set("cal", cal.fullCalendar('clientEvents'));
		}
	});
}

Template.dialog.helpers({
		event: function(){
			var ce = _.find(Session.get("cal"), function(n){
				return n.id == Session.get("openEvent");
			});
			if(!ce)
				return;
			return ce;
		},
		formattedTime: function(time){
			var d = new Date(time);
			return d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
		}
});
