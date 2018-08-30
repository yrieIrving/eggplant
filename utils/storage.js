/**
 * 缓存工具类
 */
class StorageUtil{
    
    constructor(){

    }

    set(key, value) { // 设置 sessionStorage
        window.sessionStorage && sessionStorage.setItem(key, value);
    }

    get(key) { //获取 sessionStorage
        let val = window.sessionStorage && sessionStorage.getItem(key);
        return val ? val : '';
    }

    remove(key) { // 删除 sessionStorage
        window.sessionStorage && sessionStorage.removeItem(key);
    }

    setNoCover(key, value) {
        if(!sessionStorage.getItem(key)){
            sessionStorage.setItem(key, value);
        }
    }



    setL(key, value) { // 设置 localStorage
        window.localStorage && localStorage.setItem(key, value);
    }

    getL(key) { //获取 localStorage
        let val = window.localStorage && localStorage.getItem(key);
        return val ? val : '';
    }

    removeL(key) { //删除 localStorage
        window.localStorage && localStorage.removeItem(key);
    }

    setLNoCover(key, value) {
        if(!localStorage.getItem(key)){
            localStorage.setItem(key, value);
        }
    }
}

let storage = new StorageUtil(); //初始化缓存类

export default storage;