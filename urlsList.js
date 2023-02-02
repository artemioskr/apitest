export let urlsList = [
    {
        url: 'https://api.pimpay.ru',
        namespace: 'main',
        failCounter: 0,
        passCounter: 0,
    },
    {
        url: 'https://api.pimpay.ru/eshop/v1_0/docs/method/getReports',
        namespace: 'eshop',
        failCounter: 0,
        passCounter: 0,
    },
    {
        url: 'https://api.pimpay.ru/eshop/v1_0/getRussianPostVerificationList?from=2022-12-07&to=2022-12-07',
        namespace: 'eshop',
        failCounter: 0,
        passCounter: 0,
    },
    {
        url: 'https://api.pimpay.ru/eshop/v1_0Test/ping',
        namespace: 'test',
        failCounter: 0,
        passCounter: 0,
    },
    {
        url: 'https://api.pimpay.ru/eshop/v1_0Test/getRussianPostVerificationList?from=2022-12-07&to=2022-12-07',
        namespace: 'test',
        failCounter: 0,
        passCounter: 0,
    },
    {
        url: 'https://api.pimpay.ru/accounting/ping',
        namespace: 'accountingtest',
        failCounter: 0,
        passCounter: 0,
    },
];