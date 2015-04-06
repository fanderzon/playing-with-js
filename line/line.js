// This is an Immediately Invoked Function Expression or 'iffy'
// http://benalman.com/news/2010/11/immediately-invoked-function-expression/
(function(lineUtil) {

  lineUtil.newDateObjectIfADateLine =  function newDateObjectIfADateLine(line) {
    // Line does not have a date and timestamp for each line
    // Instead they will have one line with the date whenever the date changes
    // This line is in the format 2015/01/13(Fri)

    // To explain some of the regex it works like this: (skip if peanut
    //   is overheating alread, because it's not important right now)
    // / are the delimiters (like '' around a string), we start and end
    //   the regex with / (any character could be used but / is the convention)
    // ^ means only match this to the start of the line, so if we have a
    //   date somewhere in the middle a sentence we're not interested
    // () marks a group in a regex, so the match for each () will be
    //   returned to us seperately, we're making a group for year, month and day
    // \d means digit, will match any number
    // {4} putting a number inside curly brackets means we want to match this
    //   many of the pattern before it, so in the case of year we say
    //   \d (any digit) and {4} so we match any number that are 4 digits
    var re = /^(\d{4})\/(\d{2})\/(\d{2})\(/;

    // match() is a method that can be run on any string, it takes a regex as
    // parameter and returns null or an array containing the first match
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
    var matches = line.match(re);
    if (matches) {
      // Return a new date object using the year, month and day we matched
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
      return new Date(
        // year
        Number(matches[1]),
        // month
        Number(matches[2]),
        // date
        Number(matches[3]),
        // hours, minutes, seconds
        0, 0, 0
      );
    }
    return null;
  };

  lineUtil.getMessagePartsIfMessageLine = function getMessagePartsIfMessageLine(line) {
    // Here we instead try to match:
    //   (hour):(minute) (Name of sender) (message text)
    var re = /^(\d{1,2}):(\d{2})\t(.*?)\t(.*)/;
    var matches = line.match(re);
    return matches;
  };

// This makes sure that there is a variable called line on the window object
// Either we use the one that is already defined, or we set it to an empty object
}(window.lineUtil = {}));
