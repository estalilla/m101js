var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {

	if(err) throw err;

	var collection = db.collection('students');
	var cursor = collection.find({});
	

	cursor.each(function(err, doc){
	  if(err) throw err;
	  if(doc == null) {
		console.log('Done');
		return db.close();
	  };
	  
	  var scores = doc.scores;
  
	  console.log(doc.name);
	  var minHw = 1000;
	  var counter = 0;
	  var hwPos = 0;

	  scores.forEach(function(entry){
	    if (entry.type == "homework") {
		  //console.log(entry.score);
		  if (minHw > entry.score){
			minHw = entry.score;
		 	hwPos = counter;
		  };
		};
		counter++;
	  });

	  console.log(minHw);
	  scores.splice(hwPos, 1);
	  console.log(scores);
	  collection.update( {'_id': doc._id}, doc, function(err, updated){
		if(err) throw err;
	  }); 	  
	  console.log(scores);
	});

});
