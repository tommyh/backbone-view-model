module("ViewModel");

test("initialize: A ViewModel can be created with no arguments", function(){
  var ViewModel = Backbone.ViewModel.extend({});
  var viewModel = new ViewModel();

  ok(viewModel, "ViewModel instance created");
});

test("initialize: A ViewModel can be created with properties", function(){
  var ViewModel = Backbone.ViewModel.extend({});
  var viewModel = new ViewModel({ "name": "Billy" });

  deepEqual(viewModel.get("name"), "Billy", "attributes are preserved");
});

test("initialize: A ViewModel can be created with classProperties", function(){
  var ViewModel = Backbone.ViewModel.extend({});
  var viewModel = new ViewModel({}, {collection: "fake"});

  deepEqual(viewModel.collection, "fake", "classProperties are preserved");
});

test("initialize: A ViewModel can be created with an initialize function", function(){
  var ViewModel = Backbone.ViewModel.extend({
    initialize: function(){},
    computed_attributes: {
      foo: function(){ return "bar"; }
    }
  });

  var viewModel = new ViewModel();

  deepEqual(viewModel.get("foo"), "bar", "computed_attributes are still processed");
});

test("computed_attributes: Will be set on the ViewModel", function(){
  var ViewModel = Backbone.ViewModel.extend({
    computed_attributes: {
      welcome_message: function(){ return "Hi!"; }
    }
  });

  var viewModel = new ViewModel();

  deepEqual(viewModel.get("welcome_message"), "Hi!", "The ViewModel's welcome_message has been set to 'Hi!'");
});

test("computed_attributes: The functions will be called with the instance of the ViewModel as 'this'", function(){
  var ViewModel = Backbone.ViewModel.extend({
    computed_attributes: {
      welcome_message: function(){ return "Hi " + this.get("username") + "!"; }
    }
  });

  var viewModel = new ViewModel({
    username: "Tony Azevedo"
  });

  deepEqual(viewModel.get("welcome_message"), "Hi Tony Azevedo!", "The ViewModel's message has been set to 'Hi Tony Azevedo!'");
});

test("computed_attributes: Will be run on a change event of the 'source_model'", function(){
  var ViewModel = Backbone.ViewModel.extend({
    computed_attributes: {
      welcome_message: function(){ return "Hi " + this.get("source_model").get("username") + "!"; }
    }
  });

  var model = new Backbone.Model({ username: "Tony Azevedo"});
  var viewModel = new ViewModel({source_model: model});

  deepEqual(viewModel.get("welcome_message"), "Hi Tony Azevedo!", "welcome_message has been correctly set on the viewModel");

  model.set("username", "Ryan Bailey");

  deepEqual(viewModel.get("welcome_message"), "Hi Ryan Bailey!", "welcome_message has been correctly updated on the viewModel");
});

test("computed_attributes: A ViewModel's attributes will be set from multiple 'source_models'", function(){
  var ViewModel = Backbone.ViewModel.extend({
    computed_attributes: {
      message: function(){
        return "Sum: " + (this.get("source_models").lhs.get("a") + this.get("source_models").rhs.get("b"));
      }
    }
  });

  var lhs = new Backbone.Model({ a: 10 });
  var rhs = new Backbone.Model({ b: 5 });

  var viewModel = new ViewModel({
    source_models: {
      lhs: lhs,
      rhs: rhs
    }
  });

  deepEqual(viewModel.get("message"), "Sum: 15", "attribute has been correctly derived from multiple source models");
});

test("computed_attributes: A ViewModel's attributes will be updated on change events on multiple 'source_models'", function(){
  var ViewModel = Backbone.ViewModel.extend({
    computed_attributes: {
      message: function(){
        return "Sum: " + (this.get("source_models").lhs.get("a") + this.get("source_models").rhs.get("b"));
      }
    }
  });

  var lhs = new Backbone.Model({ a: 10 });
  var rhs = new Backbone.Model({ b: 5 });

  var viewModel = new ViewModel({
    source_models: {
      lhs: lhs,
      rhs: rhs
    }
  });

  deepEqual(viewModel.get("message"), "Sum: 15", "attribute has been correctly derived from multiple source models");

  lhs.set('a', 12);

  deepEqual(viewModel.get("message"), "Sum: 17", "attribute has been correctly updated from first source model");

  rhs.set('b', 7);

  deepEqual(viewModel.get("message"), "Sum: 19", "attribute has been correctly updated from second source model");

  rhs.set('a', 22);

  deepEqual(viewModel.get("message"), "Sum: 19", "irrelevant atribute update become a noop");
});