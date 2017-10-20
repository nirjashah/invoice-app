// Base util for validation methods
module.exports ={
  /**
  * Validate customer Name
  * @param {String} customerName
  * @return {Boolean}
  */
  validCustomerName: function(customerName) {
      return /^[A-Za-z\s]+$/.test(customerName);
  },

  /**
  * Validate customer Email
  * @param {String} customerEmail
  * @return {Boolean}
  */
  validCustomerEmail: function(customerEmail) {
      return /^\w+([-+.']\ w+)*@\w+([-. ]\w+)*\.\w+([-. ]\w+)*$/.test(customerEmail);
  },

  /**
  * Validate line amount
  * @param {amount} lineAmount
  * @return {Boolean}
  */
  validAmount: function(amount) {
      return !isNaN(parseFloat(amount)) && isFinite(amount);
  }
};
