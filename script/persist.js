var Datastore = require('nedb'), db = new Datastore({ filename: __dirname+'/db', autoload: true });

function getRecord(yyyymmdd, callback) {
  // Fetch the record for the given day (or the current day if none is supplied)
  if (!yyyymmdd) {
    yyyymmdd = yyyymmddFromDate(new Date())
  }

  // Check whether the current record is populated. If so then check whether
  // it is the date. If it is and is, then return it, otherwise attempt to load
  // it. If one can't be loaded for the given date then return an empty one.

  // Attempt to fetch the record for the date.
  db.find({'id':yyyymmdd},function(err,docs) {
    if (docs.length>0) {
      // console.log("Record loaded for "+yyyymmdd)
      callback(docs[0])
    } else {
      // console.log("Record for "+yyyymmdd+" doesn't exist yet - creating")
      var doc = {
        "id"    : yyyymmdd,
        "times" : [],
        "done_lunch" : false
      }
      saveRecord(doc, callback)
    }
  });
}

function saveRecord(record, callback) {
  db.update({'id':record['id']}, record, {upsert:true}, function(err) {
    if (err) {
      // console.error("Failed to save record for "+record['id']+": "+err)
      callback({})
    }
    // console.log("Saved record for "+record['id'])
    callback(record)
  })
}

function updateRecord(id, update, callback) {
  db.update({'id':id},{ $set: update }, function(err) {
    if (err) {
      // console.error("Failed to update record for "+id+": "+err)
      callback()
    }
    // console.log("Updated record for "+id)
    callback()
  })
}
