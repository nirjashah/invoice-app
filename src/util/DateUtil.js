module.exports ={
  // Need to add 1 date when selecting from date component
  getDateInRequiredFormat: function(day, dateToAdd) {

      var date = day.getDate() + dateToAdd;
      var month = day.getMonth() + 1;
      var year = day.getFullYear();

      return (year + '-' + ( month < 10 ? '0' + month : month ) +
    '-' + ( date < 10 ? '0' + date : date ));
  }
};
