import axios from 'axios';
import sleep from "sleep";
import { resultList, sendTelegramMessage } from "./bot.js";
import { argv } from 'node:process';

const instance = axios.create({
    headers: {
        'X-Pimpay-Eshop-Api-Token' : argv[2],
        'X-PimPay-Eshop-Api-Signature' : argv[3]
    },
    timeout: 15000,
});

export let urlsList = [
    {
        url: 'https://api.pimpay.ru',
        namespace: 'main',
        failCounter: 0,
    },
    {
        url: 'https://api.pimpay.ru/eshop/v1_0/docs/method/getReports',
        namespace: 'eshop',
        failCounter: 0,
    },
    {
        url: 'https://api.pimpay.ru/eshop/v1_0/getRussianPostVerificationList?from=2022-12-07&to=2022-12-07',
        namespace: 'eshop',
        failCounter: 0,
    },
    {
        url: 'https://api.pimpay.ru/eshop/v1_0Test/docs/method/getReports',
        namespace: 'test',
        failCounter: 0,
    },
    {
        url: 'https://api.pimpay.ru/eshop/v1_0Test/ping',
        namespace: 'test',
        failCounter: 0,
    },
    {
        url: 'https://api.pimpay.ru/eshop/v1_0Test/getRussianPostVerificationList?from=2022-12-07&to=2022-12-07',
        namespace: 'test',
        failCounter: 0,
    },
];

async function apiRequest(url, namespace, n) {
    await instance.get(url).then(function (resp) {
        if(resp.status === 200) {
            console.log(new Date().toString(),urlsList[n].url, resp.status, resp.data, n)
        }
    }).catch(function (err) {
        urlsList[n].failCounter = urlsList[n].failCounter + 1;

        console.log('ALERT ALERT ALERT ' + urlsList[n].url + ' ' + resp.status)
        sendTelegramMessage('[' + namespace.toUpperCase() + '] ' + '\n'
            + err.toString() + '\n'
            + 'За этот ран я упал ' + urlsList[n].failCounter + ' раз'
        );
    })

    await sleep.sleep(1);
}

async function start() {
    for (let k = 0; k < 1000; k++) {
        for (let i = 0; i < urlsList.length; i++) {
            await apiRequest(urlsList[i].url, urlsList[i].namespace, i);
        }
    }

    await sendTelegramMessage('im done' + '\n' + resultList(urlsList))
    process.exit(1);
}

await start();