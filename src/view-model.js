// NOTE: sourceURL needs a line above it.
//@ sourceURL=view-model.js
// Backbone.ViewModel v0.1.1
//
// Copyright (C)2012 Tom Hallett
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/tommyh/backbone-view-model
// 
// Patch 0.1.1. by Skyler Brungardt:
//  Changed setComputedAttributes method to call the user defined function 
//  instead, allowing for extended behaviors, such as silent property setting.

Backbone.ViewModel = (function(Backbone, _, undefined){
  'use strict';

  var Model = Backbone.Model,
    ViewModel = function(attributes, options) {
      Model.apply(this, [attributes, options]);
      this.initializeViewModel();
    };

  _.extend(ViewModel.prototype, Model.prototype, {

    initializeViewModel: function(){
      this.setComputedAttributes();
      this.bindToChangesInSourceModel();
    },

    setComputedAttributes: function(){
      _.each(this.computed_attributes, function(value, key){
        var newValue = value.call(this);
        
        if (newValue) {
          this.set(key, newValue);
        }
        
      }, this);
    },

    bindToChangesInSourceModel: function(){
      if(this.has("source_model")){
        this.get("source_model").on("change", this.setComputedAttributes, this);
      }
    }

  });

  ViewModel.extend = Model.extend;

  return ViewModel;
})(Backbone, _);