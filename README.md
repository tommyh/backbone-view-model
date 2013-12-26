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

If your `computed_attributes` depend on multiple source models, you can initalize your `ViewModel` with a `source_models` attribute that contains a mapping of attribute to model pairs:

```javascript
var lhsModel = new Model({ value: 10 });
var rhsModel = new Model({ value: 20 });

var SumViewModel = Backbone.ViewModel.extend({
    computed_attributes: {
        sum : function() { return this.get("lhs").get("value") + this.get("rhs").get("value"); },
    },
});

var sumModel = new SumViewModel({
    source_models: {
        lhs: lhsModel,
        rhs: rhsModel,
    },
});
```

As with the single `source_model` approach the `computed_attributes` will be processed when the `ViewModel` is created, and when any of the `source_model`'s change.

```javascript
console.log(sumModel.get("sum"));  // Prints '30'.

lhsModel.set({value: 5});

console.log(sumModel.get("sum")); // Prints '25'.
```

## Installation

To install, include the `src/view-model.js` file in your HTML page, after Backbone and it's dependencies.


## Testing

This project uses QUnit for it's automated tests.
If you'd like to contribute, please:
* make sure the tests are green: backbone-view-model/test/index.html
* add tests for your new feature/fixes

