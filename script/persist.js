
function getRecord(yyyymmdd, callback) {
  // Fetch the record for the given day (or the current day if none is supplied)
  if (!yyyymmdd) {
    yyyymmdd = yyyymmddFromDate(new Date())
  }
  callback(ipc.sendSync('get-record', yyyymmdd))
}

function updateRecord(id, update, callback) {
  callback(ipc.sendSync('update-record',id,update))
}
