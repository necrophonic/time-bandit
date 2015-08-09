$(function() {

  $("#run-control").click(function() {
    // Start or stop the timing and write a start/stop point to the time record.
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
      times.push(ms)
      updateRecord(record['id'],{"times":times},function() {
        return;
      });
    });
  });

});
