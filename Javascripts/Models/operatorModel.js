define(['Value'], function(valueModel){

	return function(config, parentID, index){
		
		if(!config.hasOwnProperty("data")){
			throw "the operatorModel config object is missing 'data' property";
		}
		
		var id = parentID + "_operator_" + index;
		var value = new valueModel(config.valueInput, id);
		var htmlTemplate = "<option class='{{classes}}' id='{{id}}' value='" + index + "'>{{option}}</option>";
		var operatorName = config.value;
		
		this.getSelectedOperator = function(){
			return operatorName;
		}
		
		
		this.getValueType = function(){
			if(!config.hasOwnProperty("valueType")){
				return "string";
			}else{
				return config.valueType;
			}
		}
		
		var getTemplateData = function(){
			config.data.id = id;
			config.data.classes += " operator";
			//todo: get rid of value on the config, make it based on option e.g. equal is =
			config.data.value = config.value;
			config.data.option = config.option;
		}
		
		this.getModelHTML = function(){
			getTemplateData();
			var html = Mustache.to_html(htmlTemplate, config.data);
			return html;
		}
		
		this.getValueInputHTML = function(){
			
			return value.getModelHTML();
			
		}
		
		this.getID = function(){
			return id;
		}
		
		
	}

});



