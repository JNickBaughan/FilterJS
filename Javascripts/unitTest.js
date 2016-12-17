require(['testRunner', 'jquery', 'JSFilter', 'Filter', 'Query', 'Field', 'Operator', 'Value'], function(testRunner, jquery, JSFilter, Filter, Query, Field, Operator, Value){
	
	var filter1 = {
            data: {
                            
                 },query: {
                data: {
                            
                        },fields: [
                    {
                        data: {
                            
                        },
                        value: "id",
                        option: "id",
                        operators: [
                            {
                                data: {
                                    
                                },
                                value: "equals",
                                option: "equals",
                                valueInput: {
                                    data: {
                                        
                                    },
                                    type: "input"
                                }
                            }
                        ]
                    }
                ]
            }
        }
	var filter2 = {
            data: {
                            
                        },query: {
                data: {
                            
                        },fields: [
                    {
                        data: {
                            
                        },
                        value: "id",
                        option: "id",
                        operators: [
                            {
                                data: {
                                    
                                },
                                value: "equals",
                                option: "equals",
                                valueInput: {
                                    data: {
                                        
                                    },
                                    type: "input"
                                }
                            }
                        ]
                    }
                ]
            }
        }
		
	var filter3 = {
            data: {
                            
                        },query: {
                data: {
                            
                        },fields: [
                    {
                        data: {
                            
                        },
                        value: "id",
                        option: "id",
                        operators: [
                            {
                                data: {
                                    
                                },
                                value: "equals",
                                option: "equals",
                                valueInput: {
                                    data: {
                                        
                                    },
                                    type: "input"
                                }
                            }
                        ]
                    }
                ]
            }
        }
	
	

        
        
        
     var filter4 = {
            data: {
                            
                        },query: {
                data: {
                            
                        },fields: [
                    {
                        data: {
                            
                        },
                        value: "id",
                        option: "id",
                        operators: [
                            {
                                data: {
                                    
                                },
                                value: "equals",
                                option: "equals",
                                valueInput: {
                                    data: {
                                        
                                    },
                                    type: "input"
                                }
                            }
                        ]
                    }
                ]
            }
        }
		
	var config = {
				filters: [ filter1, filter2, filter3, filter4 ]
			}
    
	
	
	
	
	
	

	var jsfilter = new JSFilter( config, "divID" );
	var JSFilterTester = new testRunner("JSFilterTest", "JSFilter Test");
	
	var filter = jsfilter.getFilter(0);
	JSFilterTester.equal(filter.getID(),'filter_0', "JSFilter's first filter in the array has id of filter_0");
	filter = jsfilter.getFilter(1);
	JSFilterTester.equal(filter.getID(),'filter_1', "JSFilter's second filter in the array has id of filter_1");
	JSFilterTester.equal(jsfilter.getFiltersCount(),4, "The JSFilter should have 4 filters in the array");
	
	for (i = 0; i < 4; i++)
	{
		filter = jsfilter.getFilter(i);
		JSFilterTester.equal(filter.getQueriesCount(), 1, "each filter in JSFilter's array should have one query in it's array");
	}
	
	JSFilterTester.equal(jsfilter.getCurrentFilter(), 0, "the current filter should start as 0");	
	jsfilter.toggleFilter(1);
	JSFilterTester.equal(jsfilter.getCurrentFilter(), 1, "the current filter has been changed to 1");	
	jsfilter.toggleFilter(0);
	jsfilter.addQuery();
	filter = jsfilter.getFilter(0);
	JSFilterTester.equal(filter.getQueriesCount(), 2, "the first filter in JSFilter's array has had another query added");
	jsfilter.removeQuery(0, 0);
	JSFilterTester.equal(filter.getQueriesCount(), 1, "the first filter in JSFilter's array has had it's first query removed");
	var clause = jsfilter.getWhereClauseSeparater();
	JSFilterTester.equal(clause, "AND", "the whereClauseSeparator should be 'AND'");
	jsfilter.changeClauseSeparater();
	clause = jsfilter.getWhereClauseSeparater();
	JSFilterTester.equal(clause, "OR", "the whereClauseSeparator should be 'OR'");
	jsfilter.changeClauseSeparater();
	clause = jsfilter.getWhereClauseSeparater();
	JSFilterTester.equal(clause, "AND", "the whereClauseSeparator should be 'AND'");
	
	
	
	
	
	var filterConfig = { 
						data: {
					
								},query : { 
						data: {
					
								},fields : [
								{ 
									data: {
						
									},value: "id"
									, option: "id"
									,operators : [
										{ 
											data: {
						
											},value: "equals"
											, option: "equals"
											,valueInput : {
																		data: {
						
																			},type : "input"
																} 
										}
									]
								}
							]
						}
					}
					
	var  fil = new Filter(8, filterConfig);
	var FilterTester = new testRunner("FilterTest", "Filter Test");
	
	var id = fil.getID();
	var count = fil.getQueriesCount();
	FilterTester.equal(id,'filter_8', "the index should be 'filter_8'");
	FilterTester.equal(count,0, "there shouldn't be any queries in the array");
	fil.addQuery(new Query(filterConfig.query, id, 0));
	fil.addQuery(new Query(filterConfig.query, id, 1));
	
	
	
	count = fil.getQueriesCount();
	FilterTester.equal(count,2, "there should be 2 queries in the array now");
	
	fil.removeQueryByID("#filter_8_Query_0");
	count = fil.getQueriesCount();
	FilterTester.equal(count,1, "there should be 1 query in the array now. The second has been removed");
	
	
	
	
	
	
	var queryConfig = {
										data: {
                                    
                                },fields: [
											{ 
												data: {
                                    
												},value: "id"
												, option: "id"
												,operators : [
													{ 
														data: {
                                    
														},value: "equals"
														, option: "equals"
														,valueInput : {
																					data: {
                                    
																					},type : "input"
																			} 
													}
												]
											}
											,{ 
												data: {
                                    
												},value: "id"
												, option: "id"
												,operators : [
													{ 
														data: {
                                    
														},value: "equals"
														, option: "equals"
														,valueInput : {
																					data: {
                                    
																					},type : "input"
																			} 
													}
												]
											}
											,{ 
												data: {
                                    
												},value: "id"
												, option: "id"
												,operators : [
													{ 
														data: {
                                    
														},value: "equals"
														, option: "equals"
														,valueInput : {
																					data: {
                                    
																					},type : "input"
																			} 
													}
												]
											}
										]
									}
	var QueryTester = new testRunner("QueryModelTest", "Query Model Test");
	var q = new Query(queryConfig, 'parentID', 3);
	
	id = q.getID();
	count = q.getFieldsCount();
	QueryTester.equal(id,'parentID_Query_3', "the id of Query should be 'parentID_Query_3'");
	QueryTester.equal(count,3, "the Query should have 3 fields in the array");
	/*QueryTester.equal(q.getSelectedField(),undefined, "the field hasn't been set yet");
	q.setSelectedField("test");
	QueryTester.equal(q.getSelectedField(),"test", "the field has been set to 'test'");*/
	/*
	QueryTester.equal(q.getSelectedOperator(),undefined, "the operator hasn't been set yet");
	q.setSelectedOperator("test2");
	QueryTester.equal(q.getSelectedOperator(),"test2", "the operator has been set to 'test2'");
	*/
	/*
	QueryTester.equal(q.getSelectedValue(),undefined, "the value hasn't been set yet");
	q.setSelectedValue("test3");
	QueryTester.equal(q.getSelectedValue(),"test3", "the value has been set to 'test3'");
	*/
	
	
	
	
	
	
	fieldConfig = { 
								data: {
                                    
                                },value: "id"
								, option: "id"
								,operators : [
									{ 
										data: {
                                    
                                },value: "equals"
										, option: "equals"
										,valueInput : {
																	data: {
                                    
                                },type : "input"
															} 
									}
									,{ 
										data: {
                                    
                                },value: "equals"
										, option: "equals"
										,valueInput : {
																	data: {
                                    
                                },type : "input"
															} 
									}
									,{ 
										data: {
                                    
                                },value: "equals"
										, option: "equals"
										,valueInput : {
																	data: {
                                    
                                },type : "input"
															} 
									}
								]
							}
	var FieldTester = new testRunner("FieldModelTest", "Field Model Test");
	var f = new Field(fieldConfig, "parent", 0);
	id= f.getID();
	FieldTester.equal(id,"parent_field_0", "the id should be 'parent_field_0'");
	FieldTester.equal(f.getOperatorCount(),3, "there should be 3 fields in the array now");
	
	
	var OperatorTester = new testRunner("OperatorModelTest", "Operator Model Test");
	var o = new Operator({ 
										data: {
                                    
										},value: "equals"
										, option: "equals"
										,valueInput : {
																	data: {
                                    
                                },type : "input"
															} 
									}, "parent", 2);
									
	id = o.getID();
	OperatorTester.equal(id,"parent_operator_2", "the id should be 'parent_operator_2'");
	
	
	
	var ValueTester = new testRunner("ValueModelTest", "Value Model Test");
	var v = new Value({ data: {
                                    
                                },type : "input" }, "parent");
	
	id = v.getID();
	
	ValueTester.equal( id, "parent_value", "the id should be 'parent_value'" );
	
	
	
	
	
	
	
	
});



