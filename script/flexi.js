update_flexi = function() {
  // If the timer is running, then update the current flexi display based on
  // the stored times and compared to now.
  if (!running) {return}

  var config = remote.getGlobal("config")

  getRecord('', function(record) {
    // Only update the time if we've started recording any!
    if (record["times"].length==0) {
      console.log("No times yet")
      return
    }

    var local_elapsed = 0

    // TODO have to deal with start/stop getting out of sync leading
    //      to icky NaN

    var i = 0
    for (i=1; i<record["times"].length; i+=2) {
      local_elapsed += record["times"][i] - record["times"][i-1] // Stop - start
    }

    // Now add the current duration
    local_elapsed += msSinceMidnight() - record["times"][i-1]

    // Deduct lunch if appropriate
    if (record["minus_lunch"]>0) {
      local_elapsed -= record["minus_lunch"]
    }

    console.log("Elapsed time (ms): "+local_elapsed)
    $("#run-time").text(msToDuration(local_elapsed))
    elapsed = local_elapsed

  });
};

$(function() {
  // Register event subscriptions
  $('html').on('tick',update_flexi);
});
