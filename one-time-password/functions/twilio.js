const twilio = require('twilio');

const accountSID = 'AC99ccb086d1b088ea48aa69ba4ed7e15a';
const authToken = '732e6cd131c5e9aa06b53e33fcc88829';

module.exports = new twilio.Twilio(accountSID, authToken);