$.getJSON("https://api.dryg.net/dagar/v2.1/2019?callback", function(data) {
  // deklarera att moment.locale ska köras för svenskt språk (moment-with-locales ska också refereras)
  moment.locale("sv");
  console.log("WHICH YEAR IS THIS? " + moment.locale("sv"));

  //to get the DAY NUMBER in the calendar of a given date
  var now = Date.now();
  var year = new Date().getUTCFullYear();
  var year_start = Date.UTC(year, 0, 1);
  var day_length_in_ms = 1000 * 60 * 60 * 24;
  var day_number = Math.floor((now - year_start) / day_length_in_ms);
  console.log("Day of year " + day_number);

  console.log(year);

  var dateDay = moment(data.dagar[day_number].datum).format("DD MMMM YYYY"); // Utan moment formattering: var myVar = data.dagar[dayNr].datum; - Moment formatering används nu
  console.log(dateDay);

  var dateDayNum = moment(data.dagar[day_number].datum).format("DD");
  var dateDayMonth = moment(data.dagar[day_number].datum).format("MMMM");
  var nameDay = data.dagar[day_number].namnsdag.join(", ").replace(/,/g, " &");
  var weekday = data.dagar[day_number].veckodag;
  var eveDay = data.dagar[day_number].helgdagsafton;
  var flagDay = data.dagar[day_number].flaggdag;
  var redDay = data.dagar[day_number]["röd dag"];
  var weekNumber = data.dagar[day_number].vecka;

  $("#year").html(year);
  $("#week").html("v." + weekNumber);

  console.log(redDay);
  console.log(weekNumber);
  console.log(weekday);
  console.log(dateDay);
  console.log(dateDayNum);
  console.log(dateDayMonth);

  console.log(nameDay);

  if (redDay === "Ja") {
    $("#dayOfWeek").html("<span style='color:red'>" + weekday + "</span>");
    $("#dateMonth").html("<span style='color:red'>" + dateDayMonth + "</span>");
  }
  if (redDay === "Ja") {
    $("#dateNum").html("<span style='color:red'>" + dateDayNum + "</span>");
  } else if (redDay === "Nej") {
    $("#dayOfWeek").html("<span style='color:black'>" + weekday + "</span>");
  }
  if (redDay === "Nej") {
    $("#dateNum").html("<span style='color:black'>" + dateDayNum + "</span>");
    $("#dateMonth").html(
      "<span style='color:black'>" + dateDayMonth + "</span>"
    );
  }
  if (nameDay.length !== 0) {
    $("#theName").text(nameDay);
  }
  // flaggdag
  if (flagDay.length !== 0) {
    $("#flag").html(
      "<img id='flagDay' src='images/flag_sweden.png' /> " + flagDay
    );
  }
  // helgdagsafton (är det inte helgdag saknas objektet i APIet, därför måste undefined hanteras)
  if (eveDay !== undefined) {
    $("#helg").text(eveDay);
  }
});






