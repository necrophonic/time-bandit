var HOUR=3600000
var MINUTE=60000
var SECOND=1000

function msSinceMidnight() {
  var now = new Date()
  return now.getHours()*HOUR + now.getMinutes()*MINUTE + now.getSeconds()*SECOND + now.getMilliseconds()
}

// Return a YYYYMMDD formatted string from a javascript date
function yyyymmddFromDate(date) {
  return sprintf("%4s%02s%02s",date.getYear()+1900,date.getMonth()+1,date.getDate())
}

function formatYYYMMDD(yyyymmdd) {
  var m = yyyymmdd.match(/(\d\d\d\d)(\d\d)(\d\d)/)
  var year = m[1]
  var month = parseInt(m[2])
  var day = parseInt(m[3])
  return day+" / "+month+" / "+year
}

// Format a millisecond value into hh:mm (odd seconds thrown away)
function msToDuration(ms) {
  var hours = Math.floor(ms/HOUR)
  ms = ms%HOUR
  var minutes = Math.floor(ms/MINUTE)
  var sign = ''

  // Deal with minus durations
  if (hours < 0) {
    hours = (hours+1) * -1
    minutes = minutes * -1
    sign = '-'
  }
  return sprintf("%s%02s:%02s",sign,hours,minutes)
}

// Convert a duration back to milliseconds since midnight
function durationToMs(duration) {
  var matches = duration.match(/(\d?\d):(\d?\d)/)
  if (!matches) {
    console.error("Cannot parse duration '"+duration+"' to ms")
  }
  return parseInt(matches[1])*HOUR + parseInt(matches[2])*MINUTE
}

// Convert a Xh Ym string to milliseconds
function HMToMs(str) {
  var ms = 0
  var hour_match = str.match(/(\d+)h/)
  if (hour_match) {
    ms += parseInt(hour_match[1]) * HOUR
  }

  var minutes = 0
  var minute_match = str.match(/(\d+)m/)
  if (minute_match) {
    ms += parseInt(minute_match[1]) * MINUTE
  }
  return ms
}

// Format a millisecond value to Xh Ym format
function msToHM(ms) {
  var hours = Math.floor(ms/HOUR)
  ms = ms%HOUR
  var minutes = Math.floor(ms/MINUTE)
  var formatted = "";
  if (hours > 0) {
    formatted = hours + "h "
  }
  if (minutes > 0) {
    formatted += minutes + "m"
  }
  return formatted
}
