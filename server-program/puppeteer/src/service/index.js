const fs = require('fs');
const puppeteer = require('puppeteer');
 

const common = {
  m:{
    setCookie: async function (url, cookie){
      console.log(this)
    }
  }
}

common.setCookie = async function (url, cookie){
  console.log(url, cookie);
  console.log(this)
}

common.signIn = async function(url,cookie){
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setCookie(...cookie);
  await page.goto(url);


}

module.exports = common;