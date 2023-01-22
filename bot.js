import TelegramBot from "node-telegram-bot-api";
import { argv } from 'node:process';
import { urls } from "./index.js";

const token = argv[4];
export const bot = new TelegramBot(token, {polling: true});

export async function sendTelegramMessage(text) {
    await bot.sendMessage('-897255779',text);
}

export function resultList(urls) {
    let str = '';
    for (let i = 0; i < urls.length; i++) {
        str += urls[i].url + ' : ' + urls[i].failCounter + ' \n' ;
    }

    return str;
}

bot.on('message', async (msg) => {
        if (msg.text.toString().toLowerCase().indexOf('!stat') === 0) {
            await sendTelegramMessage('Метро люблино, работаем. Статистика за этот ран:' + '\n'
                + resultList(urls))
        }
    }
);