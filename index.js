import axios from 'axios';
import sleep from "sleep";
import { resultList, sendTelegramMessage } from "./bot.js";
import config from './config.json' assert { type: "json" };
import { urlsList } from "./urlsList.js";

const instance = axios.create({
    headers: {
        'X-Pimpay-Eshop-Api-Token' : config.apiToken,
        'X-PimPay-Eshop-Api-Signature' : config.apiSignature,
    },
    timeout: 15000,
});

async function apiRequest(n) {
    await instance.get(urlsList[n].url).then(function (resp) {
        if(resp.status === 200) {
            console.log(new Date().toString(),urlsList[n].url, resp.status, resp.data, n)
            urlsList[n].passCounter = urlsList[n].passCounter + 1;
        }
    }).catch(function (err) {
        urlsList[n].failCounter = urlsList[n].failCounter + 1;

        console.log('ALERT ALERT ALERT ' + urlsList[n].url + ' ' + err.toString())
        sendTelegramMessage('[' + urlsList[n].namespace.toUpperCase() + '] ' + '\n'
            + urlsList[n].url + '\n'
            + err.toString() + '\n'
            + 'За этот ран я упал ' + urlsList[n].failCounter + ' раз'
        );
    })

    await sleep.sleep(1);
}

async function start() {
    for (let k = 0; k < 1000; k++) {
        for (let i = 0; i < urlsList.length; i++) {
            await apiRequest(i);
        }
    }

    await sendTelegramMessage('im done' + '\n' + resultList(urlsList))
    process.exit(1);
}

await start();