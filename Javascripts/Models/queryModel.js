define(['Field'], function(fieldModel){
	
	return function( config, parentID, index ){ 
	
		if(!config.hasOwnProperty("fields")){
			throw "the queryModel config object is missing 'fields' property";
		}
		
		var valueID;
		var id = parentID + '_Query_' + index;
		var htmlTemplate = "<div id='{{id}}' class='query'><span class='remove' id='{{id}}_remove'><i class='fa fa-trash'></i></span><span class='clear' id='{{id}}_clear'><i class='fa fa-refresh'></i></span><div>{{{fieldHtml}}}</div><div>{{{operatorHtml}}}</div><div>{{{valueHtml}}}</div></div>";
		
		if(config.htmlTemplate != undefined){
			htmlTemplate = config.htmlTemplate;
		}
		
		var fields = [];
		var selectedFieldIndex = -1;
		
		this.isFieldSelected = function(){//todo: selectedFieldIndex is broken
			
			if(selectedFieldIndex > -1){
				return true;
			}else{
				return false;
			}
		}
		
		this.isOperatorSelected = function(){
			console.log(selectedFieldIndex);
			if(selectedFieldIndex > -1){
				return fields[selectedFieldIndex].isOperatorSelected();

			}else{
				return false;
			}
		}
		
		
		
		this.getValueType = function(){
			return fields[selectedFieldIndex].getValueType();
		}
		
		this.isString = function(){
			return fields[selectedFieldIndex].isString();
		}
		
		this.setSelectedIndex = function(index){
			selectedFieldIndex = index;
		}
		
		this.getField = function(){
			
			return fields[selectedFieldIndex];
		}
		
		this.getSelectedFieldID = function(){
			if(selectedFieldIndex === -1){
				return undefined;
			}else{
				return fields[selectedFieldIndex].getID();
			}
		}
		
		
		
		
		this.getFieldName = function(){
			if(selectedFieldIndex === -1){
				return undefined;
			}else{
				return fields[selectedFieldIndex].getFieldName();
			}
			
		}
		
		this.setSelectedOperator = function(index){
			if(selectedFieldIndex != -1){
				fields[selectedFieldIndex].resetSelectedOperatorIndex();
			}
		}
		
		this.getSelectedOperator = function(){
			if(selectedFieldIndex === -1){
				return undefined;
			}else{
				return fields[selectedFieldIndex].getSelectedOperator();
			}
		}
		
		
		this.getSelectedValueID = function(){
			if(selectedFieldIndex === -1){
				return undefined;
			}else{
				return fields[selectedFieldIndex].getSelectedValueID();
			}
			
		}
		
		for (var j = 0; j < config.fields.length; j++) { 
			fields.push(new fieldModel(config.fields[j], id, j));
		}
		
		
		this.getValueID = function(){
			return valueID;
		}
		
		this.setValueID = function(value){
			valueID = value + "_value";
		}
		
		
		
		this.getID = function(){
			return id;
		}
		
		this.getFieldsCount = function(){
			return fields.length;
		}
		
		var getFieldHTML = function(){
			var fieldHtml = "<option value='Select_field'>Select a Field</option>";
			fields.forEach(function(element, index, array){
				fieldHtml += element.getModelHTML();
			});
			return fieldHtml;
		}
		
		var getOperatorHTML = function(classes){
			var operatorHtml = "";
			fields.forEach(function(element, index, array){
				operatorHtml += "<select class='" + classes + "' id='selector_" + element.getID() + "' >" ;
					operatorHtml += "<option value='Select_operator'>Select an Operator</option>";
					operatorHtml += element.getOperatorHTML();
				operatorHtml += "</select>";
				
			});
			return operatorHtml;
		}
		
		var getValueHTML = function(){
			var valueHTML = "";
			fields.forEach(function(element, index, array){
				valueHTML += element.getValueHTML();
			});
			
			return valueHTML;
		}
		
		
		var getTemplateData = function(classes){
		
			config.data.id = id;
			var fieldHtml = getFieldHTML();
			config.data.fieldHtml = "<select class='" + classes + "' id='" + id + "_fields" + "'>" +  fieldHtml + "</select>";
			
			var operatorHtml = getOperatorHTML("operatorSelector");
			config.data.operatorHtml = operatorHtml;
			config.data.valueHtml = getValueHTML();
			
		}
		
		
		
		this.getFilterModelHTML = function(){
			
			var html = Mustache.to_html(htmlTemplate, config.data);
			
			return html;
		}
		
		getTemplateData("fieldSelector");
	
	}
	
});



