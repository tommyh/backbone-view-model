require.config({
  paths: {
    "underscore": "../bower_components/underscore/underscore",
    "backbone": "../bower_components/backbone/backbone",
    "backbone-view-model": "../src/view-model",
    "jquery": "../bower_components/jquery/dist/jquery"
  }
});

require(["backbone-view-model"], function(){
  module("RequireJs: ViewModel");

  test("initialize: A ViewModel can be created with no arguments", function(){
    var ViewModel = Backbone.ViewModel.extend({});
    var viewModel = new ViewModel();

    ok(viewModel, "ViewModel instance created");
  });
});
