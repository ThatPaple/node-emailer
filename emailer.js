var nodemailer = require('nodemailer');
var config = require('./config');

let email_subject;
let email_text;
let email_reciever;
let mode;
let console_logging = false;

// EMAIL CONFIG
var transporter = nodemailer.createTransport({
    service: config.service,
    auth: {
        user: config.username,
        pass: config.password
    }
});

module.exports = class emailer { 
/**
 * @constructor 
 * @param {*} enableLogging 
 * @param {*} emailRecipient 
 * @param {*} emailSubject 
 * @param {*} emailText 
 */
constructor(enableLogging, mode, emailRecipient, emailSubject, emailText){
    enableLogging ? this.console_logging = enableLogging : this.enableLogging = false;
    mode ? this.mode = mode : this.mode = 'text';
    emailRecipient ? this.email_reciever = emailRecipient : this.email_reciever = "'####DEFAULT RECEIVER####";
    emailSubject ? this.email_subject = emailSubject : this.email_subject = `[${process.title}]`
    emailText ? this.email_text = emailText : this.email_subject = "<h1>Hello World!</h1><br><p>Please configure your email text!</p>"
}

setLoggingState(state) {
    this.console_logging = state;
    console.log(`Console logging : + ${state ? 'enabled' : 'disabled'}`);
}

sendMail() {
    if(this.mode = 'text'){
        var mailOptions = {
            from: '####SENDER####',
            to: '####RECEIVER####',
            subject: `${this.email_subject}`,
            text: `${this.email_text}`
        };
    } else if (this.mode = 'html'){
        var mailOptions = {
            from: '####SENDER####',
            to: '###RECEIVER###',
            subject: `${this.email_subject}`,
            html: `${this.email_text}`
        };
    } else {
        console.error('Incorrect mode set. Please choose either text or html.')
    }

    transporter.sendMail(mailOptions, function (error, info) {

        if (console_logging) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }
    });
}

setEmailRecipient(email){
    this.email_reciever = email;
}

setEmailText(text = "Hellow World!") {
    this.email_text = text;
    if (console_logging) console.log('Set email text as : ' + this.text)
}

setSubject(subject = "This is a subject") {
    this.subject = subject;

    if (console_logging) console.log('Set email subject as : ' + this.subject)
}

getEmailRecipient(){
    return this.email_reciever;
}
getEmailText(){
    return this.email_text;
}
getEmailSubject(){
    return this.email_subject;
}
getDebuggingState(){
    return this.email_reciever;
}
};