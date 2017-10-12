module.exports ={
  /**
  * Get date in format required by input date field
  * @param {Date} day
  * @param {dateToAdd} Display correct date when picked from date selecter
  * Default due date is 30 days from today
  */
  getDateInRequiredFormat: function(day, dateToAdd) {

      var date = day.getDate() + dateToAdd;
      var month = day.getMonth() + 1;
      var year = day.getFullYear();
      if (date > 30) {
          date = day.getDate();
          month = month+1;
      }
      return (year + '-' + ( month < 10 ? '0' + month : month ) +
    '-' + ( date < 10 ? '0' + date : date ));
  }
};
