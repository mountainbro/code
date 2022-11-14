const log = require('../utils/log')
const puppeteer = require("puppeteer");
const url = "https://www.soutd.com/";
let followIndex = 1;
let discussIndex = 1;
const taskStatus = {}
const users = [{
  username: "zhaoshan0122@foxmail.com",
  password: "ZS15846108483",
},{
  username: "1667062588@qq.com",
  password: "ZS15846108483",
}]
let followStatus = false

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
// 登录
const login = async (page,user) => {
  const { username, password } = user;
  try {
    // 开始登录
    const loginSelector = ".header-login-button > button.empty.mobile-hidden";
    await page.waitForSelector(loginSelector);
    await page.click(loginSelector);
    await sleep(2000);
    await page.type("input[name=username]", username, { delay: 100 });
    await page.type("input[name=password]", password, { delay: 100 });
    await page.click(".login-bottom>button");
    taskStatus.login = true
    log(user.username+"登录成功")
  } catch (error) {
    log("登陆失败", error.message);
  }
};

// 评论两次
const discuss = async (page) => {
  const discussBtn = ".com-form-button-r > button:nth-child(2)";
  await sleep (8000)
  let btn = await page.waitForSelector(discussBtn)
  await page.evaluate(async btn => {
    const comment = document.querySelector('#comments')
    const footer = document.querySelector('#colophon')
    const textarea = document.querySelector('#textarea')
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight - comment.offsetHeight - footer.offsetHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    })
    let text = textarea.value||'点赞学习,谢谢大佬'
    textarea.value = text
    btn?.click()
    console.log('发送评论',text)
  },btn)
  log(`评论${discussIndex}完成`)
  await page.reload({waitUntil:'networkidle2'})
  if (discussIndex === 1) {
    discussIndex++
    await discuss(page)
  }
  taskStatus.discussIndex = discussIndex
};
// 点赞两次
const like = async (page) => {
  await page.reload({waitUntil:'networkidle2'})
  await sleep(8000)
  const list = await page.waitForSelector('.comment-list')
  await page.evaluate(async list => {
    let count = list.childElementCount
    if (count >= 2) {
      list.children[count-1].click()
      list.children[count-2].click()
    }
    
    console.log('like',list.childElementCount)

  },list)
  log('dianzan')
};
// 签到
const signIn = async (page) => {
  await sleep(5000)
  const signSelector = ".user-w-qd i";
  const btn = await page.waitForSelector(signSelector)
  await page.evaluate(btn => {

  },btn)
  await page.click(signSelector);
  log('签到完成')
  taskStatus.signIn = true
};
// 关注
const follow = async (page) => {
  if (followStatus||followIndex == 6) return log('关注任务已完成或者六个人都关注')
  const avatarSelector = `#b2-widget-mission-2 > div > div > div:nth-child(2) > div.user-w-qd-list > div.mission-today-list > ul > li:nth-child(${followIndex}) > a`;
  const avatar = await page.waitForSelector(avatarSelector)
  await page.evaluate((avatar)=>{
    if(avatar?.href) avatar.click()
  },avatar)
  await sleep(5000)
  const followSelector = '.user-follow button:first-child'
  const followBtn = await page.waitForSelector(followSelector);
  followStatus =  await page.evaluate(btn => {
    let status;
    console.log('关注按钮',btn.innerText)
    if (btn.innerText === '关注Ta') {
      btn.click()
      status = true
    }else{
      status = false
    }
    return status
  }, followBtn)
  followStatus?'':followIndex++;
  await page.goBack()
  await follow(page)
  log('关注状态',followStatus)
  taskStatus.followStatus = followStatus
};

const read = async (browser,page) => {
  await page.waitForNavigation({
    waitUntil: "networkidle0",
  });
  await page.click("a.thumb-link", { clickCount: 1 })
  const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));    // 声明变量
  const newPage = await newPagePromise;  
  await newPage.bringToFront()
  // 签到
  await signIn(newPage);
  // 关注
  await follow(newPage)
  // 评论
  await discuss(newPage)
  // 不能点击自己的评论
  await like(newPage)



};

const task = async (options) => {
  const browser = await puppeteer.launch({
    // 无头模式
    headless: true,
    // 试图宽高
    defaultViewport: {
      width: 1000,
      height: 800,
    },
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  await login(page,options);
  await read(browser,page);
  log('该账号任务完成',JSON.stringify(taskStatus))
  await browser.close()
};

module.exports = {
  task
}
