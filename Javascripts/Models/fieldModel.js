define(['Operator'], function(operatorModel){
	return function(config, parentID, index){
		
		if(!config.hasOwnProperty("data")){
			throw "the fieldModel config object is missing 'data' property";
		}
		if(!config.hasOwnProperty("operators")){
			throw "the fieldModel config object is missing 'operators' array of objects";
		}
		
		var id = parentID + "_field_" + index;
		var operators = [];
		var selectedOperatorIndex = -1;
		var htmlTemplate = "<option class='{{classes}}' id='{{id}}' value='" + index + "'>{{option}}</option>";
		var isString = false;
		var fieldName = config.value;
		
		this.resetSelectedOperatorIndex = function(){
			selectedOperatorIndex = -1;
		}
		
		this.isOperatorSelected = function(){
			
			if(selectedOperatorIndex > -1){
				return true;
			}else{
				return false;
			}
		}
		
		if(config.hasOwnProperty("string")){
			if(config.string){
				isString = true;
			}
		}
		
		this.isString = function(){
			return isString;
		}
		
		this.getFieldName = function(){
			return fieldName;
		}
		
		this.getSelectedValueID = function(){
			return operators[selectedOperatorIndex].getID();
		}
		
		this.getSelectedOperator = function(){
			
			if(selectedOperatorIndex === -1){
				return undefined;
			}else{
				return operators[selectedOperatorIndex].getSelectedOperator();
			}
			
		}
		
		this.setSelectedIndex = function(index){
			selectedOperatorIndex = index;
		}
		
		
		if(config.htmlTemplate != undefined){
			htmlTemplate = config.htmlTemplate;
		}
		
		for (k = 0; k < config.operators.length; k++) { 
			operators.push(new operatorModel(config.operators[k], id, k));
		}
		
		this.getOperatorCount = function(){
			return operators.length;
		}
		
		var getTemplateData = function(){
			
			config.data.id = id;
			config.data.classes += " field";
			config.data.value = config.value
			config.data.option = config.option;

		}
		
		this.getID = function(){
			return id;
		}
		
		this.getModelHTML = function(){
			getTemplateData();
			var html = Mustache.to_html(htmlTemplate, config.data);
			return html;
		}
		
		this.getOperatorHTML = function(){
			var html = "";
			operators.forEach(function(element, index, array){
				html += element.getModelHTML();
			});
			return html;
		}
		
		this.getValueHTML = function(){
			var html = "";
			operators.forEach(function(element, index, array){
				html += element.getValueInputHTML();
			});
			return html;
		}
		
	}
});



