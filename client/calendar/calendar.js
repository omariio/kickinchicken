Template.calendar.rendered = function(){
	var cal = $('#cal').fullCalendar({

	// Pull from his google cal / make calendar interactive
	
	height: 600,
	header: {
	        left:   'prev next',
	        center: 'title',
	        right:  'month,basicWeek,basicDay',
	      },
	// If we want agenda views
	businessHours: {
					start: '10:00',
					end: '2:00',
					dow: [2, 3, 4, 5]
				},
	})
}