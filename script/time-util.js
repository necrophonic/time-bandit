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

// Format a millisecond value into hh:mm (odd seconds thrown away)
function msToDuration(ms) {
  var hours = Math.floor(ms/HOUR)
  ms = ms%HOUR
  var minutes = Math.floor(ms/MINUTE)
  return sprintf("%02s:%02s",hours,minutes)
}

// Convert a duration back to milliseconds since midnight
function durationToMs(duration) {
  var matches = duration.match(/(\d\d):(\d\d)/)
  return parseInt(matches[0])*HOUR + parseInt(matches[1])*MINUTE
}

// Convert a Xh Ym string to milliseconds
function HMToMs(str) {
  var ms = 0
  var hour_match = str.match(/(\d+)h/)
  if (hour_match) {
    ms += parseInt(hour_match[0]) * HOUR
  }

  var minutes = 0
  var minute_match = str.match(/(\d+)m/)
  if (minute_match) {
    ms += parseInt(minute_match[0]) * MINUTE
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
