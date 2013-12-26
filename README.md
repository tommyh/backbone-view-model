## Why do I need a Backbone.ViewModel?

`Backbone.Model`'s are great at storing the state of your objects and persisting them back to your server.  But as your `Backbone.View`'s become more complex, it's useful to have a model to store all view related attributes.  These view attributes should be stored on a separate model than persistence attributes for 2 reasons:

* Separation of concerns
* If you store view attributes on the same model as your persistence model, when you call `.save()` on that model, the view attributes will be sent to the server too, eek!

## Usage

Let's say you have a fairly standard Model and View:

```javascript
// defining your classes
var Tweet = Backbone.Model.extend({});
var TweetView = Backbone.View.extend({});

// creating an instance of your model
var myTweet = new Tweet({text: "I love backbone!"});
```

You define a `Backbone.ViewModel` class with a `computed_attributes` object:

```javascript
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
```

Initialize your `ViewModel` and pass your persistence model as `source_model`:

```javascript
var myTweetViewModel = new TweetViewModel({
	source_model: myTweet
});
```


Now, pass your `ViewModel` to your `View`:

```javascript
var myTweetView = new TweetView({
	model: myTweetViewModel
});
```


When your `ViewModel` is initialized or whenever any attribute on your `source_model` changes, all of the `computed_attributes` will be processed and `set` on your `ViewModel`:


```javascript
// The view attributes are set on the ViewModel
myTweetViewModel.get("truncated_text") // => "I love bac…"

// They can be used easily in your View Template
{{ truncated_text }} <a href="#">View more</a>
```

If your `computed_attributes` depend on multiple source models, you can initialize your `ViewModel` with a `source_models` attribute that contains a mapping of attribute to model pairs:

```javascript
var myOldestTweet = new Tweet({text: "Just joined twitter!"});
var myNewestTweet = new Tweet({text: "I love backbone!"});

var TweetSummaryViewModel = Backbone.ViewModel.extend({
  computed_attributes: {
    alpha_omega: function(){
      return this.get("source_models").oldestTweet.get("text") + "…" + this.get("source_models").newestTweet.get("text");
    }
  }
});

var myTweetSummary = new TweetSummaryViewModel({
  source_models: {
    oldestTweet: myOldestTweet,
    newestTweet: myNewestTweet
  }
});
```

As with the single `source_model` approach the `computed_attributes` will be processed when the `ViewModel` is created, and when any of the `source_models` change.

```javascript
console.log(myTweetSummary.get("alpha_omega"));  // Prints 'Just joined twitter!…I love backbone!'.

myNewestTweet.set({text: "Taking a lunch break"});

console.log(myTweetSummary.get("alpha_omega"));  // Prints 'Just joined twitter!…Taking a lunch break'.
```

## Installation

To install, include the `src/view-model.js` file in your HTML page, after Backbone and it's dependencies.


## Testing

This project uses QUnit for it's automated tests.

You can run the automated tests in one of two ways:

1. Open the following files in your browser: `backbone-view-model/test/basic.html` and `backbone-view-model/test/require-js.html`.

2. Karma: Right now this is broken.  TODO - can someone help fix this?

## Contributing

* Make sure the tests are green.
* Add tests for your new features/fixes, so I don't break them in the future.
* Add documentation to the README, so people know about your new feature.
