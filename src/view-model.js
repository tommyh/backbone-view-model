Backbone.ViewModel = Backbone.Model.extend({

  initialize: function(){
    this.initializeViewModel();
  },

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