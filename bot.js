import TelegramBot from "node-telegram-bot-api";
import config from './config.json' assert { type: "json" };
import { urlsList } from "./urlsList.js";

const token = config.botToken;
export const bot = new TelegramBot(token, {polling: true});

export async function sendTelegramMessage(text) {
    await bot.sendMessage(config.chatId,text);
}

export function resultList(urls) {
    let str = '';
    for (let i = 0; i < urls.length; i++) {
        str += urls[i].url + '  fail: ' + urls[i].failCounter + ' pass: ' + urls[i].passCounter + ' \n' ;
    }

    return str;
}

bot.on('message', async (msg) => {
    console.log()
        if (msg.text !== undefined && msg.text.toString().toLowerCase().indexOf('!stat') === 0) {
            await sendTelegramMessage('Статистика за этот ран:' + '\n'
                + resultList(urlsList))
        }
    }
);