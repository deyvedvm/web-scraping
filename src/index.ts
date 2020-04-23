import puppeteer from 'puppeteer';

const scrapeProduct = async (url: string) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="livro-java9"]/header/div[2]/img');

    const src = await el.getProperty('src');
    const srcTxt = await src.jsonValue();


    const [el2] = await page.$x('//*[@id="livro-java9"]/header/div[1]/h1/span[1]');

    const txt = await el2.getProperty('textContent');
    const rawTxt = await txt.jsonValue();

    console.log({srcTxt, rawTxt});

    await browser.close();
}

scrapeProduct('https://www.casadocodigo.com.br/products/livro-java9')
    .then(() => {
        console.log('Done!')
    })
    .catch((err) => {
        console.log('Error: ', err);
    });

