var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
	if(err) throw err;

	var collection = db.collection('data');
	var cursor = collection.find({});
	var stateArray = [];
	var newState = '';
	var operator = { '$set' : {'month_high' : true} };


	cursor.sort( [['State', 1], ['Temperature', -1] ]);
//	cursor.limit(28);

	cursor.each(function(err, doc){
	  if (err) throw err;
	  if (doc == null) {
		console.log('States are ' + stateArray);
		return //db.close();
	  };

	  if (newState != doc.State) {
		newState = doc.State;
		stateArray.push(doc.State);
//		console.log(doc['_id']);
		collection.update(
		  {'_id' : doc._id}, 
		  operator,
		  function(err, updated ){
		    if(err) console.log(err);
			console.log('Updated '+ updated + ' document');
		  }
		);
	  };
  
//	  console.dir(doc.State);
	});


});
