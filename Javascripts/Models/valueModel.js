define([], function(){
	return function(config, parentID){
	
		if(!config.hasOwnProperty("type")){
			throw "the valueInputModel config object is missing 'type' property";
		}
		if(!config.hasOwnProperty("data")){
			throw "the valueInputModel config object is missing 'data' property";
		}
	
		var id = parentID + "_value";
		var htmlTemplate = "";
		
		
		switch(config.type){
			case "input":
				htmlTemplate = "<div class='{{classes}}' id='value_" + parentID + "'><input class='valueInput' id='{{id}}' ></div>";
				break;
			case "doubleInput":
				htmlTemplate = ""
				break;
			case "calendar":
				break;
			case "dropdown":
				break;
		}
		
		var getTemplateData = function(){
			
			config.data.id = id;
			config.data.classes += " value";
			
			
		}
		
		
		
		
		
		this.getModelHTML = function(){
			getTemplateData();
			var html = Mustache.to_html(htmlTemplate, config.data);
			return html;
		}
		
		this.getID = function(){
			return id;
		}
		
		
		
		
		
	}
});



