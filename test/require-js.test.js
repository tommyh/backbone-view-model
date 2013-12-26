require.config({
  paths: {
    "underscore": "lib/underscore-1.3.1",
    "backbone": "lib/backbone-0.9.2",
    "backbone-view-model": "../src/view-model"
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