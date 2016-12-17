define(['jquery'], function(jquery){
	return function(id, testName){
		
		//$('#myTable tr:last').after('<tr>...</tr><tr>...</tr>');
	
		jquery('body').append('<table id="' + id + '" ><tr><td colspan="2"><b>' + testName + ':</b></td></tr></table></br></br>');
		
		
		this.equal = function(actual, expected, message){
			
			if(actual === expected){
				jquery('#'+ id +' tr:last').after('<tr><td>' + message + ':</td><td style="border-style: solid; border-color:green;">pass</td></tr>');
			}
			else{
				jquery('#'+ id +' tr:last').after('<tr><td>' + message + ':</td><td style="border-style: solid; border-color:red;">fail</td></tr>');
			}
		}
		
		
		
	}
});



