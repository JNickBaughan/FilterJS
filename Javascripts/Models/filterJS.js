define(['Filter', 'Query', 'jquery', 'fieldUI', 'operatorUI'], function(filterModel, queryModel, $, fieldUI, operatorUI){
	return function(config, id){
	
		if(!config.hasOwnProperty("filters")){
			throw "the JSfilterModel config object is missing 'filters' array of objects";
		}
		
		var filters = [];
		var currentFilter = 0;
		var html = "";
		var UIfield = new fieldUI();
		var UIoperator = new operatorUI();
		var whereClauseSeparater = "AND";
		
		for (var i = 0; i < config.filters.length; i++) { 
			
			filters.push(new filterModel(i, config.filters[i]));
			filters[i].addQuery(new queryModel( config.filters[i].query, "filter_" + i, filters[i].getNextQueryIndex()));
			html += filters[i].getFilterModelHTML();
			
		}
		
		//below should become a set up function
		//think about splitting this out to a UI module
		$('#' + id).html(html);
		$('.filter').hide();
		$('#filter_0').show();
		$('.operatorSelector').hide();
		$('.value').hide();
		
		
		
		//selector, idHeader, ignoreValue
		var setChange = function(queryid, selector, idHeader, ignoreValue, type, element){
			
			var elementSelector = queryid + " " + selector;
			$( elementSelector ).change(function() {
				
				var value = this.selectedOptions[0].value;
				var id = idHeader + this.selectedOptions[0].id;
				type.hideUI(queryid, id, value, ignoreValue, element);
				type.cleanUp(id, queryid);
				
			});
		}
		
		var removeSingleQuery = function(id){
			
			filters[currentFilter].removeQueryByID(id);
			$('#' + id).prev('br').remove();
			$('#' + id).remove();
			
			
		}
		
		
		var setRemove = function(queryid){
			var elementSelector = queryid + "_remove";
			$( elementSelector ).click(function(){
				var id = this.id.substring(0, this.id.length - 7);
				removeSingleQuery(id);
				var queryCount = filters[currentFilter].getQueriesCount();
				if(queryCount === 1){
					var filterID = filters[currentFilter].getID();
					$('#' + filterID + ' .remove').hide();
				}
			});
		}
		
		var resetSingleQuery = function(id){
				filters[currentFilter].resetQuery('#' + id);
				//remove error class
				$('#' + id + ' .valueInput').removeClass('error');
				$('#' + id + ' .operatorSelector').removeClass('error');
				$('#' + id + ' .fieldSelector').removeClass('error');
				var fieldsID = id + "_fields";
				$('#' + fieldsID).val("Select_field");
				$('#' + id + ' .operatorSelector').val("Select_operator").hide();
				$('#' + id + ' .valueInput').val("");
				$('#' + id + ' .value').hide();
		}
		
		var setClear = function(queryid){
			var elementSelector = queryid + "_clear";
			$( elementSelector ).click(function(){
				var id = this.id.substring(0, this.id.length - 6);
				resetSingleQuery(id);

			});
		}
		
		for (var i = 0; i < config.filters.length; i++) { 
			var clauseID = "#filter_" + i + "_Query_0";
			setChange( clauseID ,".fieldSelector", "selector_", 'Select_field',  UIfield, filters[i].getQuerybyID( clauseID ));
			setChange( clauseID , ".operatorSelector", "value_", 'Select_operator', UIoperator, filters[i].getQuerybyID( clauseID ));
			setRemove( clauseID );
			setClear( clauseID );
			$('.remove').hide();
		}
		
		
		this.resetQuery = function(){
			
			var count = filters[currentFilter].getQueriesCount();
			
			
			while(count > 1){
				
				var queryID = filters[currentFilter].getQueryIDbyIndex((count - 1));
				filters[currentFilter].removeLastQuery();
				
				
				
				count--;
				
				$('#' + queryID).prev('br').remove();
				
				$('#' + queryID).remove();
				
			}
			var lastIndex = count-1;
			var queryID = filters[currentFilter].getQueryIDbyIndex(lastIndex);
			resetSingleQuery(queryID);
			var filterID = filters[currentFilter].getID();
			$('#' + filterID + ' .remove').hide();
			
			
		}
		
		
		
		this.getQuery = function(){
			
			var query = "";
			var count = filters[currentFilter].getQueriesCount();
			var queryComplete = true;
			
			for(var n = 0; n < count; n++){
				
				var queryID = filters[currentFilter].getQueryIDbyIndex(n);
				
				if(filters[currentFilter].isFieldSelected(n)){//is field selected
					
					var field = filters[currentFilter].getSelectedField(n);
					query += field;
					
					if(filters[currentFilter].isOperatorSelected(n)){
						var operator = filters[currentFilter].getSelectedOperator(n);
						query += " " + operator;
						
						var valueID = filters[currentFilter].getSelectedValueID(n);
						var value = $(valueID)[0].value;
						
						if(value != ""){
							$('#' + queryID + ' .valueInput').removeClass('error');
							var isString = filters[currentFilter].isString(n);
								
							if(isString){
								query += "'" + value + "'";
							}
							else{
								query += " " + value;
							}
							if((n+1) != count){
								query += " " + whereClauseSeparater + " ";
							}
						
						}else{
							queryComplete = false;
							
							$('#' + queryID + ' .valueInput').addClass('error');
						}

					}else{
						queryComplete = false;
						$('#' + queryID + ' .operatorSelector').addClass('error');
					}
				}else{//field is not selected
					queryComplete = false;
					$('#' + queryID + ' .fieldSelector').addClass('error');
					
				}
				
	
			}
			
			if(queryComplete){
				return query;
			}else{
				return -1;
			}
			
		}
		
		//exposed functions
		this.toggleFilter = function(index){
		
			currentFilter = index;
			$('.filter').hide();
			$('#filter_' + index).show();
			
		}
		
		this.changeClauseSeparater = function(){
			if(whereClauseSeparater === "AND"){
				whereClauseSeparater = "OR";
			}else{
				whereClauseSeparater = "AND";
			}
		}
		
		
		//these will probably change to hidden and be even driven
		//todo: test that using currentFilter always give you the correct config
		//todo: refactor this.... too long
		this.addQuery = function(){
			
			var nextQueryIndex = filters[currentFilter].getNextQueryIndex();
			var queryID = "#filter_" + currentFilter + "_Query_" + nextQueryIndex;
			var id = '#'+ filters[currentFilter].getID();
			
			filters[currentFilter].addQuery(new queryModel( config.filters[currentFilter].query, "filter_" + currentFilter, nextQueryIndex));
			
			var html = "</br>" + filters[currentFilter].getQuerybyID(id + "_Query_" + nextQueryIndex).getFilterModelHTML();
			$(id + ' .query:last').after(html);
			$(queryID + ' .filter').hide();
			$(queryID + '_0').show();
			$(queryID + ' .operatorSelector').hide();
			$(queryID + ' .value').hide();
			
			setChange( queryID ,".fieldSelector", "selector_", 'Select_field',  UIfield, filters[currentFilter].getQuerybyID(id + "_Query_" + nextQueryIndex));
			setChange( queryID , ".operatorSelector", "value_", 'Select_operator', UIoperator, filters[currentFilter].getQuerybyID(id + "_Query_" + nextQueryIndex));
			setRemove( queryID );
			setClear( queryID );
			var filterID = filters[currentFilter].getID();
			$('#' + filterID + ' .remove').show();

		}
		
		this.removeQuery = function(id){
			//todo: make this return true/false, only remove ui if removed from state
			var removed = filters[currentFilter].removeQueryByID(id);
			$( "#" ).remove();
		}
		
		//test only functions
		this.getWhereClauseSeparater = function(){
			return whereClauseSeparater;
		}
		
		this.getCurrentFilter = function(){
			return currentFilter;
		}
		
		this.getFilter = function(index){
			return filters[index];
		}
		
		this.getFiltersCount = function()
		{
			return filters.length;
		}
		//test only functions
		
		
		
	}
});



