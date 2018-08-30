/**
 * Created by admin on 2017/3/31.
 * 加密解密工具类
 */

const rsaKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7mK/FpaUGw5kNUDuVs9H/OflISB9Rh2yMAl1Pi6DyF9m6h5MxNwd2SDEr2wlk+aRK79JcjPu1++00lONpFAt+lMrEBLvTMHZVQ+kWgVX0+jGKCab7xoKvlZTPNjlNz9N3u4g6KabBDXIZcJa/d8esZvzLss80SNQU89B+vq1NZQIDAQAB';
let aesKey = 'b2070e309409969b';

export const encryptAllRsa = (content)=>{ // RSA 加密
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(rsaKey);
    let encryptContent = encrypt.encrypt(content);
    if(encryptContent){
        return encodeURIComponent(encryptContent);
    }
    return '';
};

export const encryptRsa = (content)=>{ // RSA 加密
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(rsaKey);
    let encryptContent = encrypt.encrypt(content);
    if(encryptContent){
        return encryptContent;
    }
    return '';
};

export const encryptDes = (content)=>{ // DES 解密
    return strDec(content , aesKey , '' , '');
};