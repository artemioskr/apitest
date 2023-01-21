import axios from 'axios';
import sleep from "sleep";
import { resultList, sendTelegramMessage } from "./bot.js";
import { argv } from 'node:process';

const instance = axios.create({
    headers: {
        'X-Pimpay-Eshop-Api-Token' : argv[2],
        'X-PimPay-Eshop-Api-Signature' : argv[3]
    },
    timeout: 15000
});

export let links = [
    {
        link: 'https://api.pimpay.ru',
        namespace: 'main',
        failCounter: 0,
    },
    {
        link: 'https://api.pimpay.ru/eshop/v1_0/docs/method/getReports',
        namespace: 'eshop',
        failCounter: 0,
    },
    {
        link: 'https://api.pimpay.ru/eshop/v1_0/getRussianPostVerificationList?from=2022-12-07&to=2022-12-07',
        namespace: 'eshop',
        failCounter: 0,
    },
    {
        link: 'https://api.pimpay.ru/eshop/v1_0Test/docs/method/getReports',
        namespace: 'test',
        failCounter: 0,
    },
    {
        link: 'https://api.pimpay.ru/eshop/v1_0Test/ping',
        namespace: 'test',
        failCounter: 0,
    },
    {
        link: 'https://api.pimpay.ru/eshop/v1_0Test/getRussianPostVerificationList?from=2022-12-07&to=2022-12-07',
        namespace: 'test',
        failCounter: 0,
    }
];

async function apiRequest(link, namespace, n) {
    await instance.get(link).then(function (resp) {
        if(resp.status === 200) {
            console.log(new Date().toString(),links[n].link, resp.status, resp.data, n)
        } else {
            throw "ALERT ALERT ALERT " + links[n].link + ' ' + resp.status
        }
    }).catch(function (err) {
        links[n].failCounter = links[n].failCounter + 1;
        sendTelegramMessage('[' + namespace.toUpperCase() + '] ' + '\n'
            + err.toString() + '\n'
            + 'За этот ран я упал ' + links[n].failCounter + ' раз'
        );
    })

    await sleep.sleep(1);
}

async function start() {
    for (let k = 0; k < 1000; k++) {
        for (let i = 0; i < links.length; i++) {
            await apiRequest(links[i].link, links[i].namespace, i);
        }
    }
    await sendTelegramMessage('im done' + '\n' + resultList(links))

    process.exit(1);
}

await start();