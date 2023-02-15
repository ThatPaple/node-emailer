let Email = require('./emailer');

let email = new Email(true, 'text', 'RECEIVER', 'New email?', '');

email.sendMail();