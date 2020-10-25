define(['Query'], function(Query){

	return function(index, config){
		
		if(!config.hasOwnProperty("data")){
			throw "the filterModel config object is missing 'data' property";
		}
		
		var id = "filter_" + index;
		var queries = [];
		var nextQueryIndex = 0;
		var htmlTemplate = "<div id='{{id}}' class='{{classes}}'>{{{html}}}</div>";
		
		var getQueryByID = function(ID){
			var index;
			for (var i = 0; i < queries.length; i++) {
				if('#' + queries[i].getID() === ID){
					index = i;
					break;
				}
			}
			
			return index;
		}
		
		
		this.getQueryIDbyIndex = function(index){
			return queries[index].getID();
		}
		
		
		this.getQuerybyID = function(ID){
			var index = getQueryByID(ID);
			return queries[index];
		}
		
		this.resetQuery = function(ID){
			var queryIndex = getQueryByID(ID);
			queries[queryIndex].setSelectedOperator(-1);
			queries[queryIndex].setSelectedIndex(-1);
		}
		
		this.removeLastQuery = function(){
			var index = (queries.length - 1);
			queries.splice(index, 1);
		}
		
		var removeQuery = function(index){
			queries.splice(index, 1);
		}
		
		this.removeQueryByID = function(id){
			var removeIndex = getQueryByID(id);
			removeQuery(removeIndex);
			
		}
		
		this.getSelectedFieldID = function(index){
			return queries[index].getSelectedFieldID();
		}
		
		
		this.isString = function(index){
			return queries[index].isString();
		}
		
		this.getSelectedField = function(index){
			return queries[index].getFieldName();
		}
		
		this.getSelectedOperator = function(index){
			return queries[index].getSelectedOperator();
		}
		
		this.isFieldSelected = function(index){
			
			return queries[index].isFieldSelected();
			
		}
		
		this.isOperatorSelected = function(index){
			return queries[index].isOperatorSelected();
		}
		
		this.getSelectedValueID = function(index){
			var id = queries[index].getSelectedValueID();
			
			if(id != undefined){
				return "#" + queries[index].getSelectedValueID() + "_value";
			}else{
				return undefined;
			}
			
		}
		
		if(config.hasOwnProperty("htmlTemplate")){
			htmlTemplate = config.htmlTemplate;
		}
		
		this.addQuery = function(newQuery){
			queries.push(newQuery);
		}
		
		
		this.getID = function(){
			return id;
		}
		
		this.getQueriesCount = function(){
			return queries.length;
		}
		
		
		
		
		this.getFilterModelHTML = function(){
		
			config.data.classes += " filter";
			config.data.id = id;
			config.data.html = queries[0].getFilterModelHTML();
			var html = Mustache.to_html(htmlTemplate, config.data);
			return html;
			
		}
		
		this.getNextQueryIndex = function(){
			var next = nextQueryIndex;
			nextQueryIndex++;
			return next;
		}
		
		
	
	}


});

	

	
	
	
	
	
	
	