// 挂载controller和service和中间件
const controller = require('./controller');
const service = require('./service');
const koaBody = require('koa-body');
const path = require('path');
const router = require('./router');

function init(app){
  app.context.controller = controller;
  app.context.service = service;
  app.use(koaBody({
    multipart:true,
    encoding:'gzip',
    formidable:{
      uploadDir:path.join(__dirname,'static/upload/'),
      keepExtensions: true
    }
  }))
  // app.use(function(){
  //   console.log(this,'this')
  // })
  app.use(router.routes());
}

module.exports = init;