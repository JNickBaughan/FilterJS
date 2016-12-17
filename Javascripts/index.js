require(['JSFilter'], function( JSFilter){
	
	
	var config ={
		filters: [
			{ 
				
				data: {
					classes: ""
				}
				,query : { 
					data: {
						classes: ""
					}
					,fields : [
						{ 
							data: {
								classes: ""
							}
							,value: "id"
							, option: "id"
							,operators : [
								{ 
									data: {
										classes: ""
									}
									,value: "="
									, option: "equals"
									,valueInput : {
																type : "input"
																,data: {
																	classes: ""
																}
														} 
								}
								,{ 
									data: {
										classes: ""
									}
									,value: "!="
									, option: "don't equals"
									,valueInput : {
																type : "input"
																,data: {
																	classes: ""
																}
														} 
								}
							]
						}
						,{ 
							data: {
								classes: ""
							}
							,string : true
							,value: "name"
							, option: "name"
							,operators : [
								{ 
									data: {
										classes: ""
									}
									,value: "="
									, option: "equals"
									,valueInput :{
																type : "input"
																,data: {
																	classes: ""
																}
														} 
								}
								,{ 
									data: {
										classes: ""
									}
									,value: "!="
									, option: "don't equals"
									,valueInput : {
																type : "input"
																,data: {
																	classes: ""
																}
														} 
								}
							]
						}
						,{ 
							data: {
								classes: ""
							}
							,value: "unit"
							, option: "unit"
							,operators : [
								{ 
									data: {
										classes: ""
									}
									,value: "="
									, option: "equals"
									,valueInput :{
																type : "input"
																,data: {
																	classes: ""
																}
														} 
								}
								,{ 
									data: {
										classes: ""
									}
									,value: "!="
									, option: "don't equals"
									,valueInput : {
																type : "input"
																,data: {
																	classes: ""
																}
														} 
								}
							]
						}
					]
				}
			}
			,{ 
				data: {
					classes: ""
				}
				,query : { 
					data: {
						classes: ""
					}
					,fields : [
						{ 
							data: {
								classes: ""
							}
							,string : true
							,value: "name"
							,option: "name"
							,operators : [
								{ 
									data: {
										classes: ""
									}
									,value: "="
									, option: "equals"
									,valueInput : {
																type : "input"
																,data: {
																	classes: ""
																}
														} 
								}
								,{ 
									data: {
										classes: ""
									}
									,value: "!="
									,option: "don't equals"
									,valueInput :  {
																type : "input"
																,data: {
																	classes: ""
																}
														} 
								}
							]
						}
						,{ 
							data: {
								classes: ""
							}
							,string : true
							,value: "address"
							,option: "address"
							,operators : [
								{ 
									data: {
										classes: ""
									}
									,value: "="
									, option: "equals"
									,valueInput :  {
																type : "input"
																,data: {
																	classes: ""
																}
														} 
								}
								,{ 
									data: {
										classes: ""
									}
									,value: "!="
									, option: "don't equals"
									,valueInput :  {
																type : "input"
																,data: {
																	classes: ""
																}
														} 
								}
							]
						}
					]
				}
			}
			
			
		]
	}
	
	
	var jsfilter = new JSFilter( config, "filter" );
	$( "#search" ).click(function() {
	  var query = jsfilter.getQuery();
	  if(query === -1){
		  //alert('query isnt valid');
	  }else{
		alert(query);
	  }
	});
	
	$( "#newQuery" ).click(function() {
	  jsfilter.addQuery();
	  
	});
	
	$("#toggle").change(function(){
		jsfilter.toggleFilter(this.selectedOptions[0].value);
	});
	
	$("#toggleClause").change(function(){
		jsfilter.changeClauseSeparater();
	});
	
	
	$("#resetQuery").click(function(){
		jsfilter.resetQuery();
	});
	

	
});



