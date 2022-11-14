const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const middleware = require('./middleware')
const schedule = require('node-schedule');


const users = [{
  username: "zhaoshan0122@foxmail.com",
  password: "ZS15846108483",
},{
  username: "1667062588@qq.com",
  password: "ZS15846108483",
}]

middleware(app)
router(app)
app.listen(3789,async () => {
  console.log('server is running at http://localhost:3000')
  schedule.scheduleJob('0 10 13 * * *', async () => {
    // 定时任务
    // await app.service.soutd.task(users[0])
    await app.service.soutd.task(users[1])
  });
})