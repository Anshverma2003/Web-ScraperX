import env from 'dotenv';
import { Builder, By, Key, until } from 'selenium-webdriver';
import 'chromedriver';

export const home = async (req, res) => {

    var driver = new Builder().forBrowser('chrome').build();
    let trends = [];

    try {
        await driver.get('https://x.com/i/flow/login');


        await driver.wait(until.elementLocated(By.xpath("//input[@name='text']")), 10000);

        var userName = await driver.findElement(By.xpath("//input[@name='text']"));
        await userName.sendKeys('webscraper72481');

        let nextBtn = await driver.findElement(By.xpath("//span[contains(text(),'Next')]"));
        await nextBtn.click();

        await driver.wait(until.elementLocated(By.xpath("//input[@name='password']")), 10000);
        var password = await driver.findElement(By.xpath("//input[@name='password']"));
        await password.sendKeys('webscraperx2024');

        let loginBtn = await driver.findElement(By.xpath("//span[contains(text(),'Log in')]"));
        await loginBtn.click();


        await driver.wait(until.elementLocated(By.xpath('//span[@class="r-18u37iz"]/span[@class="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3"]')), 10000);

        const trendElements = await driver.findElements(By.xpath('//span[@class="r-18u37iz"]/span[@class="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3"]'));

        for (let i = 0; i < 5; i++) {
            const trendText = await trendElements[i].getText();
            trends[i] = trendText;
            console.log(trends);
        }

        res.status(200).json({message:"Trends fetched" , trends});

    } 
    catch(error){

        res.status(error.status).json({error: error.message || error});

    }

    finally {

    }

};