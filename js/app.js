// Ember application instance - this boots up the ember app
App = Ember.Application.create();

App.Router.map(function() {
  // defines an about route
  this.resource('about');
  this.resource('help');
  this.resource('posts', function(){
  	// child route
	this.resource('post', { path: ':post_id' });
  });
});

// The controller is an object that stores app state
// and responds to events from templates
App.PostController = Ember.ObjectController.extend({
	// 
	isEditing: false,
	actions: {
		edit: function(){
			this.set('isEditing', true);
		},
		doneEditing: function(){
			this.set('isEditing', false);
		}
	}
})

// creating a subclass of the route object
// routes have model method, it's a hook that determines 
// the model to use for a template
App.PostsRoute = Ember.Route.extend({
	model: function(){
		return posts;
	}
});

// This gives the post template its model
App.PostRoute = Ember.Route.extend({
	model: function(params){
		// Get the post id and use the corresponding model
		// (If it's posts/2, it will look through the post model and find the 
		// first post whose id is 2 and make that the template's model)
		return posts.findBy('id', params.post_id);
	}
});

// takes a date as input value
// uses moment to convert it to a string from the current time
Ember.Handlebars.helper('format-date', function(date){
	return moment(date).fromNow();
});

var showdown = new Showdown.converter();

// Ember.Handlebars.helper('format-markdown', function(input){
// 	return new Handlebars.SafeString(showdown.makeHtml(input));
// });

// dummy model data
var posts = [{
	id: '1',
	title: "Rails is Omakase",
	author: { 
		name: "d2h"
	},
	date: new Date("12-27-2012"),
	excerpt: "Lorem ipsum dolor sit amet.",
	body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi corporis cumque vitae reprehenderit dolore ad repellendus harum, libero voluptates soluta?"

},  
{
	id: '2',
	title: "JS Took 10 days!",
	author: { 
		name: "me"
	},
	date: new Date("12-22-2010"),
	excerpt: "Lorem ipsum dolor sit amet.",
	body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis praesentium quis quam nesciunt in error pariatur hic ex odio."	
}]