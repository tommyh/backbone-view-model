// Backbone.ViewModel v0.1.0
//
// Copyright (C)2012 Tom Hallett
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/tommyh/backbone-view-model

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      define(['backbone', 'underscore'], factory);
  } else {
      factory(root.Backbone, root._);
  }
}(this, function (Backbone, _) {

  'use strict';

  Backbone.ViewModel = (function (Backbone, _, undefined){

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
          this.set(key, value.call(this));
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
}));