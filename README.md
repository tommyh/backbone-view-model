## Why do I need a Backbone.ViewModel?

`Backbone.Model`'s are great at storing the state of your objects and persisting them back to your server.  But as your `Backbone.View`'s become more complex, it's useful to have a model to store all view related attributes.  These view attributes should be stored on a separate model than persistence attributes for 2 reasons:

* Separation of concerns
* If you store view attributes on the same model as your persistence model, when you call `.save()` on that model, the view attributes will be sent to the server too, eek!

## Usage

Let's say you have a fairly standard Model and View:

~~~
# defining your classes
var Tweet = Backbone.Model.extend({});
var TweetView = Backbone.View.extend({});

# creating an instance of your model
var myTweet = new Tweet({text: "I love backbone!"});
~~~

You define a `Backbone.ViewModel` class with a `computed_attributes` object:

~~~
var TweetViewModel = Backbone.ViewModel.extend({
	computed_attributes: {
		"truncated_text" : function(){
			return this.get("source_model").get("text").substring(0,10) + "…";
		},
		"escaped_text" : function(){
			return encodeURIComponent(this.get("source_model").get("text"));
		}
	}
});
~~~

Initialize your `ViewModel` and pass your persistence model as `source_model`:

~~~
var myTweetViewModel = new TweetViewModel({
	source_model: myTweet
});
~~~


Now, pass your `ViewModel` to your `View`:

~~~
var myTweetView = new TweetView({
	model: myTweetViewModel
});
~~~


When your `ViewModel` is initialized or whenever any attribute on your `source_model` changes, all of the `computed_attributes` will be processed and `set` on your `ViewModel`:


~~~
# The view attributes are set on the ViewModel
myTweetViewModel.get("truncated_text") // => "I love bac…"

# They can be used easily in your View Template
{{ truncated_text }} <a href="#">View more</a>
~~~

## Installation

To install, include the `src/backbone-view-model.js` file in your HTML page, after Backbone and it's dependencies.