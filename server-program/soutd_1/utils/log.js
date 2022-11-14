// index.js

const fs = require('fs');
const dateFormat = (date, fmt) => {
  date = new Date(date)
  var a = ['日', '一', '二', '三', '四', '五', '六']
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds(), // 毫秒
    'w': date.getDay(), // 周
    'W': a[date.getDay()], // 大写周
    'T': 'T'
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}




function logger (file){
   file = file || 'a.log';
   
   let options = {
      flags: 'a', // 
      encoding: 'utf8', // utf8编码
   }
   
   let stderr = fs.createWriteStream(file, options);
   
   // 创建logger
   let logger = new console.Console(stderr);

   return function(...infos){
      infos.forEach(info => {
         logger.log(`[${dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss.S')}]--${JSON.stringify(info)}`);
      } )
      
   }
}

// 真实项目中调用下面即可记录错误日志
module.exports = logger(`./logs/app${dateFormat(new Date(),'yyyy-MM-dd')}.log`);