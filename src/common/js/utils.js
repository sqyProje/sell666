/*
* @example   ?id=12345&a=b
* return Object {id:12345,a:b}
* */
export function urlParse(){
  let url = window.location.search;
  //从url拿到自负长，要把字符串变成object
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g;//解析字符串
  //第一个中括号匹配的是问好，第二个中括号匹配的是id。第三个是12345。加号是一个或多个
  let arr = url.match(reg)
  if(arr){
    arr.forEach((item)=>{
     // debugger
      let tempArr = item.substring(1).split('=')
      //定义临时数组，每个元素再拆分为数组，去掉问号
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val;

    })
  }

  return obj
}
