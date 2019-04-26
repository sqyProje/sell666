/**存储商家是否收藏通用方法*/

export function saveTolocal (id,key,value) {
  //debugger
  let seller = window.localStorage._seller_
  //首先外层有个seller,双下划线私有的，把所以有的东西存储到_seller_里面
  if(!seller){
    seller ={}
    seller[id] = {} //每个seller有不同的id，把id存储一下
  }else{
    seller = JSON.parse(seller)//seller是个字符串
    if(!seller[id]){
      seller[id] = {}//存储对象
    }
  }
  seller[id][key] = value; //赋值到每个商家下面，id相关联，执行

  localStorage._seller_ = JSON.stringify(seller)
  //我们要存储的是个字符串，在localStorage下面不允许直接存储字符串
}


export function loadFormLocal (id,key,def) {
  let seller = window.localStorage._seller_
  if(!seller){
    return def //完全没有存储过，去取值，是默认值
  }
  seller = JSON.parse(seller)[id]
  if(!seller){
    return def //空的话，返回默认值
  }
  let ret = seller[key]  //否则返回id对应的key
  return ret||def
}
