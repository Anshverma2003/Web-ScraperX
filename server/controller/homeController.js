import Trend from '../models/trends.js';
import { Builder, By, Key, until } from 'selenium-webdriver';
import 'chromedriver';

export const home = async (req, res) => {

    var driver = new Builder().forBrowser('chrome').build();
    let trends = [];

    try {

        await driver.get('https://x.com/i/flow/login');


        await driver.wait(until.elementLocated(By.xpath("//input[@name='text']")), 10000);

        var userName = await driver.findElement(By.xpath("//input[@name='text']"));
        await userName.sendKeys(process.env.LOGIN_USERNAME);

        let nextBtn = await driver.findElement(By.xpath("//span[contains(text(),'Next')]"));
        await nextBtn.click();

        await driver.wait(until.elementLocated(By.xpath("//input[@name='password']")), 10000);
        var password = await driver.findElement(By.xpath("//input[@name='password']"));
        await password.sendKeys(process.env.LOGIN_PASSWORD);

        let loginBtn = await driver.findElement(By.xpath("//span[contains(text(),'Log in')]"));
        await loginBtn.click();


        await driver.wait(until.elementLocated(By.xpath('//span[@class="r-18u37iz"]/span[@class="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3"]')), 20000);

        const trendElements = await driver.findElements(By.xpath('//span[@class="r-18u37iz"]/span[@class="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3"]'), 20000);

        for (let i = 0; i < Math.min(trendElements.length , 5); i++) {
            const trendText = await trendElements[i].getText();
            trends[i] = trendText;
            console.log(trends);
        }


        function getip() {
            const getOctet = () => Math.floor(Math.random() * 256);
            return `${getOctet()}.${getOctet()}.${getOctet()}.${getOctet()}`;
        }

        const ip = getip().toString();
        const dt = new Date();
        const date = dt.toString();

        console.log(date.split('T')[0]);
        console.log(ip, date);

        const newtrends = new Trend({
            trends,
            ip,
            date
        });
        const saveTrend = await newtrends.save();

        if(!saveTrend){
            throw{message:"Trends not saved"};
        }

        res.status(200).json({ message: "Trends fetched", trends, ip,date ,saveTrend});

    }
    catch (error) {

        res.status(error.status || 500).json({ error: error.message || error });

    }

};