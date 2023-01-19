import axios from 'axios';
import sleep from "sleep";
import TelegramBot from "node-telegram-bot-api";

const token = '5890562657:AAG80xEGYCcE3rrR1ttZtNY_7UQUBSmawbA';
const bot = new TelegramBot(token, {polling: true});
const instance = axios.create();
instance.defaults.timeout = 15000;

async function sendTelegramMessage(text) {
    await bot.sendMessage('-897255779',text);
}
async function apiRequest(link, namespace) {
    await instance.get(link).then(function (resp) {
        if(resp.status === 200) {
            console.log(new Date().toString(),link, resp.status)
        } else {
            throw "ALERT ALERT ALERT " + link + ' ' + resp.status
        }
    }).catch(function (err) {
        sendTelegramMessage('[' + namespace.toUpperCase() + '] ' + link + '\n' + err.toString());
        console.log("ALERT ALERT ALERT " + link + ' ' + err.toString());
    })

    await sleep.sleep(3);
}
async function letsGo() {
    for (let i = 0; i < 10; i++) {
        await apiRequest('https://api.pimpay.ru/','main');
        await apiRequest('https://api.pimpay.ru/accounting', 'accounting');
        await apiRequest('https://api.pimpay.ru/accounting/compositeaccounts', 'accounting');
        await apiRequest('https://api.pimpay.ru/eshop/v1_0/docs/methods','eshop');
        await apiRequest('https://api.pimpay.ru/eshop/v1_0/docs/method/getRussianPostPaymentsByPeriod','eshop');
        await apiRequest('https://api.pimpay.ru/eshop/v1_0/docs/method/getRussianPostPayments','eshop');
        await apiRequest('https://api.pimpay.ru/eshop/v1_0/docs/method/getDeliveryServicePaymentsByPeriod','eshop');
        await apiRequest('https://api.pimpay.ru/eshop/v1_0/docs/method/getDeliveryServicePayments','eshop');
        await apiRequest('https://api.pimpay.ru/eshop/v1_0/docs/method/getAllPaymentsAndStatuses','eshop');
        await apiRequest('https://api.pimpay.ru/eshop/v1_0/docs/method/upsertRussianPostOrders','eshop');
        await apiRequest('https://api.pimpay.ru/eshop/v1_0/docs/method/getRussianPostVerificationList','eshop');
        await apiRequest('https://api.pimpay.ru/eshop/v1_0/docs/method/getRussianPostVerificationRows','eshop');
        await apiRequest('https://api.pimpay.ru/eshop/v1_0/docs/method/getCurierServiceVerificationList','eshop');
        await apiRequest('https://api.pimpay.ru/eshop/v1_0/docs/method/getReports','eshop');
        await apiRequest('https://api.pimpay.ru/eshop/v1_0/docs/method/getCurierServiceVerificationRows','eshop');
    }
    await sendTelegramMessage('im done')
    process.exit(1);
}

await letsGo();