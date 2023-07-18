const _paymentSystems = {
  Visa: /^4/,
  MasterCard: /^5[1-5]/,
  Mir: /^220[0-4]/,
  Amex: /^3[47]/,
  Discover: /^6(?:011|5)/,
  JCB: /^(?:2131|1800|35)/,
  Diners: /^3(?:0[0-5]|[68])/,
  Maestro: /^(?:5[0678]|6304|6390|67)/,
  Unionpay: /^(62|88)/,
};

export const identifyPaymentSystem = (cardNum) => {
  for (let ps in _paymentSystems) {
    if (_paymentSystems[ps].test(cardNum)) {
      return ps;
    }
  }
};
