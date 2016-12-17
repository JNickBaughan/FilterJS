define(['jquery'], function($){

	return function(){
	
		this.hideUI = function(queryid, id, value, ignoreValue, element){
			
			if(value === ignoreValue){
				$(queryid + ' .operatorSelector').hide();
				$(queryid + ' .value').hide();
				element.setSelectedIndex(-1);
			}else{
				$(queryid + ' .operatorSelector').hide();
				$('#' + id).show();
				$(queryid + ' .fieldSelector').removeClass('error');
				element.setSelectedIndex(value);
			}
		}
		
		this.cleanUp = function(id, queryid){
			
			var val = $('#' + id)[0].value;
			var operatorID = $('#' + id)[0].selectedOptions[0].id;
			if(val === 'Select_operator'){
				$(queryid + ' .value').hide();	
			}else{
				$(queryid + ' .value').hide();
				$('#value_' + operatorID).show();
				//show correct value input
			}
		}

	}


});

	

	
	
	
	
	
	
	