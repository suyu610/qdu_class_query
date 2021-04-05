import CryptoJS from 'crypto-js';

// 获得当前时间戳
function getTimeStamp(){
  return Date.parse(new Date())/ 1000;  
}

function byteToString(arr) {
  if(typeof arr === 'string') {
    return arr;
  }
  var str = '',
    _arr = arr;
  for(var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
      v = one.match(/^1+?(?=0)/);
    if(v && one.length == 8) {
      var bytesLength = v[0].length;
      var store = _arr[i].toString(2).slice(7 - bytesLength);
      for(var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
}

// 加密
function encrypted(data,key){
  var iv = [1, 2, 3, 4, 5, 6, 7, 8];
  var ivHex = CryptoJS.enc.Utf8.parse(byteToString(iv));
  var keyHex = CryptoJS.enc.Utf8.parse(key)  
  var encrypted = CryptoJS.DES.encrypt(data,keyHex,{
    iv:ivHex,
    mode:CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  var encodedData = encodeURIComponent(encrypted.toString());  
  return encodedData;
}

// 解密
function decrypted(date,key){
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var decrypted = CryptoJS.DES.decrypt({
  ciphertext: CryptoJS.enc.Base64.parse(date)}, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
  });

  var decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
  console.log(decryptedData)
  console.log("解密之后的结果:" + decryptedData);
  return decryptedData;
}


export {encrypted, decrypted};
