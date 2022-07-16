require('dotenv').config();

const axios = require('axios');
const CryptoJS = require('crypto-js');

const env = process.env

const base_url = "https://sens.apigw.ntruss.com/sms/v2/services/"
const service_id = env.SERVICE_ID;
const access_key = env.ACCESS_KEY;
const secret_key = env.SECRET_KEY;
const date = Date.now().toString();
const target_url = base_url + `${service_id}/messages`;


class SMSModule {

    constructor(content, receiver) {
        this.content = content;
        this.receiver = receiver;
    }
    _makeSignature(url, access_key, secret_key, service_id) {

        const space = " ";
        const newLine = "\n";
        let api_path = '/sms/v2/services/' + service_id + '/messages'

        const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secret_key);
        hmac.update('POST');
        hmac.update(space);
        hmac.update(api_path);
        hmac.update(newLine);
        hmac.update(date);
        hmac.update(newLine);
        hmac.update(access_key);
        const hash = hmac.finalize();
        return hash.toString(CryptoJS.enc.Base64)
    }

    smsCall() {

        const data = {
            type: "SMS",
            countryCode: "82",
            from: env.PHONE_NUMBER,
            subject: 'subject',
            contentType: "COMM",
            content: this.content,
            messages: [
                {
                    "to": this.receiver
                }
            ]
        }

        const options = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'x-ncp-apigw-timestamp': date,
                'x-ncp-iam-access-key': access_key,
                'x-ncp-apigw-signature-v2': this._makeSignature(target_url, access_key, secret_key, service_id)
            }
        }

        axios.post(
            target_url, data, options
        ).then(
            res => {
                console.log(res)
            }
        ).catch(
            error => {
                console.error(error.response.data);
            }
        )
    }

}

module.exports = SMSModule;