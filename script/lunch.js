do_lunch = function() {
  var config = remote.getGlobal("config")

  console.log("Check lunch @ "+msToHM(msSinceMidnight()))

  getRecord('',function(record) {
    if (record['done_lunch']) {
      console.log("Lunch already worked out")
      return;
    }

    update_doc = {}

    // Check whether we've passed the end of lunch. If so then check at least the
    // minimum has been taken and adjust otherwise.
    var lunch_start_ms = durationToMs(config["lunch_start"])
    var lunch_end_ms   = durationToMs(config["lunch_end"])
    var now = msSinceMidnight()

    console.log(now+" -> "+lunch_end_ms)

    if (now > lunch_end_ms) {
      console.log("Work out lunch")
      update_doc['done_lunch'] = true;

      var times = record['times']

      var lunch_duration_ms = 0

      var i=0
      for (i=1;i<times.length;i+=2) {
        var end   = times[i]
        var start = times[i-1]

        // If end before lunch begins or start after it ends, ignore
        if (end <= lunch_start_ms || start >= lunch_end_ms) {
          continue
        }

        if (start < lunch_start_ms && end > lunch_end_ms) {
          // Span whole lunch time - nothing will be deducted
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

      var adjust = HMToMs(config["lunch_min_HM"])-lunch_duration_ms
      if (adjust < 0) {
        adjust = 0
      }

      update_doc["minus_lunch"] = adjust
      updateRecord(record['id'], update_doc, function() {
        if (adjust > 0) {
          $("#lunch").toggleClass('invisible')
          $("#lunch-deduction").text(msToHM(adjust))
        }
        return
      })
    }
  })
}

$(function() {

  $("html").on('tick',do_lunch)

})
