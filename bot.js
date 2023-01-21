import TelegramBot from "node-telegram-bot-api";

const token = '5890562657:AAG80xEGYCcE3rrR1ttZtNY_7UQUBSmawbA';
export const bot = new TelegramBot(token, {polling: true});

export async function sendTelegramMessage(text) {
    await bot.sendMessage('-897255779',text);
}

export function resultList(links) {
    let str = '';
    for (let i = 0; i < links.length; i++) {
        str += links[i].link + ' : ' + links[i].failCounter + ' \n' ;
    }

    return str;
}

