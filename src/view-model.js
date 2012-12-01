var parentClass = Backbone.Model;

Backbone.ViewModel = function(attributes, options){
  parentClass.apply(this, [attributes, options]);
  this.initializeViewModel();
};

_.extend(Backbone.ViewModel.prototype, parentClass.prototype, {

  initializeViewModel: function(){
    this.setComputedAttributes();
    this.bindToChangesInSourceModel();
  },

  setComputedAttributes: function(){
    _.each(this.computed_attributes, function(value, key){
      this.set(key, value.call(this));
    }, this)
  },

  bindToChangesInSourceModel: function(){
    if(this.has("source_model")){
      this.get("source_model").on("change", this.setComputedAttributes, this);
    }
  }

});

Backbone.ViewModel.extend = parentClass.extend;