"use strict"

const SMSModule = require("./modules/sms_module");

let sens = new SMSModule("hi test", process.env.PHONE_NUMBER);


sens.smsCall()