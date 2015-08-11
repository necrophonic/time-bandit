// Start or stop the timing and write a start/stop point to the time record.
start_stop = function() {
  getRecord('',function(record) {
    var ms = msSinceMidnight()
    if (running) {
      console.log("Stop timing @ "+ms)
      running = false
    } else {
      console.log("Start timing @ "+ms)
      running = true
    }
    $("#run-time").toggleClass('faded');
    $("#pause").toggleClass('faded');
    var times = record['times']
    console.log("Start/stop loaded times "+times)
    times.push(ms)
    updateRecord(record['id'],{"times":times},function() {
      return;
    });
  })
}

$(function() {

  $("#run-control").click(start_stop);

});
