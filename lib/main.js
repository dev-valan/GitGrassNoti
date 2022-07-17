"use strict"

const SMSModule = require("./modules/sms_module");
const GitModule = require("./modules/git_module")

const MAIN = async () => {

    let SMS_CONTENT;
    const data = await GitModule.then();

    if (data !== null){

        data.length === 0
        ? SMS_CONTENT = "오늘 푸쉬 내역이 없어요 .. 얼른 일 합시다 .."
        : SMS_CONTENT = null;

    }else{
        SMS_CONTENT = "데이터를 받아오지 못했습니다. 직접 확인해주세요.";
    }

    let sens = new SMSModule(SMS_CONTENT, process.env.PHONE_NUMBER);
    sens.smsCall();

}

MAIN();