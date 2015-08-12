do_lunch = function() {
  var config = remote.getGlobal("config")

  getRecord('',function(record) {
    // if (record['done_lunch']) {
    //   return;
    // }

    update_doc = {}

    // Check whether we've passed the end of lunch. If so then check at least the
    // minimum has been taken and adjust otherwise.
    var lunch_start_ms = durationToMs(config["lunch_start"])
    var lunch_end_ms   = durationToMs(config["lunch_end"])
    var now = msSinceMidnight()

    if (now > lunch_end_ms) {
      update_doc['done_lunch'] = true;

      var times = record['times']
      var lunch_duration_ms = 0

      var i=0
      for (i=1;i<times.length;i+=2) {
        var end   = times[i]
        var start = times[i-1]

        // Work out how much of worked time falls between the lunch
        // start and end times.
        if (end <= lunch_start_ms || start >= lunch_end_ms) {
          // If end before lunch begins or start after it ends, ignore
          console.log("End before start or start after end")
          continue
        }

        if (start < lunch_start_ms && end > lunch_end_ms) {
          // Span whole lunch time - nothing will be deducted
          console.log("Worked whole lunch")
          lunch_duration_ms = lunch_end_ms-lunch_start_ms
          break
        }

        if (start < lunch_start_ms && end < lunch_end_ms) {
          lunch_duration_ms += end - lunch_start_ms
          continue
        }

        if (start > lunch_start_ms && end > lunch_end_ms) {
          lunch_duration_ms += lunch_end_ms - start
          continue
        }

        if (start > lunch_start_ms && end < lunch_end_ms) {
          lunch_duration_ms += end - start
          continue
        }
      }

      // Deal with the current period (if one is running)
      // If it started before the end of lunch then account for the time
      // between that and the end of lunch period.
      if (running) {
        if (start < lunch_end_ms) {
          lunch_duration_ms += lunch_end_ms - start
        }
      }

      // Work out how much of lunch WASN'T worked.
      var lunch_span = lunch_end_ms - lunch_start_ms - lunch_duration_ms
      console.log("Lunch span "+msToHM(lunch_span))
      console.log("Worked in lunch "+msToHM(lunch_duration_ms))

      var adjust = 0
      if (lunch_span < HMToMs(config["lunch_min_HM"])) {
        adjust = HMToMs(config["lunch_min_HM"]) - lunch_span
        console.log("Adjusting for missed lunch: "+adjust)
      }

      update_doc["minus_lunch"] = adjust
      updateRecord(record['id'], update_doc, function() {
        if (adjust > 0) {
          // Show the adjustment
          $("#lunch").removeClass('invisible')
          $("#lunch-deduction").text(msToHM(adjust))
        }
        else {
          $("#lunch").addClass('invisible')
        }
        return
      })
    }
  })
}

$(function() {

  // Register subscriptions
  $("html").on('tick',do_lunch)

})
