define(['jquery'], function($){

	return function(){
	
		this.hideUI = function(queryid, id, value, ignoreValue,element){
			
			if(value === ignoreValue){
				$(queryid + ' .value').hide();
				element.setSelectedIndex(-1);
			}else{
				$(queryid + ' .value').hide();
				$('#' + id).show();
				$(queryid + ' .operatorSelector').removeClass('error');
				element.getField().setSelectedIndex(value);
			}
		}
		
		this.cleanUp = function(){
			
		}

	}


});

	

	
	
	
	
	
	
	