/**
 * Created by admin on 2017/7/12.
 * 专门用于校验录入页参数
 */
import dateformat from './dateformat';

function validate() {};

validate.getBirthDay = (certificateNo)=>{
    if((/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(certificateNo))){
        let birthday = certificateNo.substring(6,14);
        if(birthday.length == 8){
            birthday = birthday.substring(0, 4) + '-' + birthday.substring(4 , 6) + '-' + birthday.substring(6 , 8);
            return birthday;
        }
    }
};

export const isNotEmpty = (str)=>{
    if(str !== '' && str !== null && typeof str !== 'undefined'){
        return true;
    }
    return false;
};
/**
 * 证件类型枚举
 * @type {{ID_CARD_NO: string, PASSPORT: string, OFFICER_CERTIFICATE: string}}
 */
validate.cardType = {
    ID_CARD_NO: '1', //身份证
    PASSPORT: '2', // 护照
    OFFICER_CERTIFICATE:'3' // 军官证
};

validate.addressType = {
    NORMAL: '1', //平常
    STRICT: '2' //严格
};


/**
 * 校验是否为姓名格式  中文 2-5 英文 1-30
 * @param name
 */
validate.isName = (name)=>{
    if(!isNotEmpty(name)){
        return false;
    }
    let regx = /^[\u4e00-\u9fa5]{2,5}$|^[a-zA-Z]{1,30}$/gi;
    if(regx.test(name)) {
        return true;
    }
    return false;
};

validate.isCertificateNo = (certificateNo)=>{
    //15位和18位身份证号码的正则表达式
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(certificateNo)) {
        if (certificateNo.length == 18) {
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += certificateNo.substring(i, i + 1) * idCardWi[i];
            }
            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
            var idCardLast = certificateNo.substring(17);//得到最后一位身份证号码
            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == 'X' || idCardLast == 'x') {
                    return true;
                } else {
                    return false;
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    } else {
        return false;
    }
},

/**
 * 证件类型校验，默认为身份证
 * @param cardNo
 * @param type
 */
validate.isCardNo = (cardNo, type = cardType.ID_CARD_NO)=>{
    if(!isNotEmpty(cardNo)){
        return false;
    }
    let flag = false;
    let regx = '';
    switch(type){
    default:
    //默认为身份证号正则
        flag = this.isCertificateNo(cardNo);
        break;
    }
    return flag;
};

/**
 * 校验年龄是否在某个区间内
 * @param birthday
 * @param ageNumStart
 * @param ageNumEnd
 * @param sureDateNum
 */
validate.isAgeRange = (birthday, ageNumStart, ageNumEnd, sureDateNum = 1)=>{
    if(!isNotEmpty(birthday)){
        return false;
    }
    let result = birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if(result != null){
        let birthdayStr = birthday.replace(/-/g,'/') + ' 00:00:00';
        let dd = new Date(birthdayStr);
        let startTime = dateformat.getDateStart(dateformat.addDay(new Date() , sureDateNum));
        dd = dateformat.addDay(dd, ageNumStart); //大于ageNumStart天
        if(dd.getTime() > startTime.getTime()){//
            return false;
        }
        dd = dateformat.addDay(dd, -ageNumStart);
        dd = dateformat.addYear(dd, ageNumEnd + 1); //加一岁，因为max 有一年的期限
        if(dd.getTime() < startTime.getTime()){
            return false;
        }
    }
};

/**
 * 校验是否为正常日期
 * @param time
 * @returns {*}
 */
validate.isDate = (time)=>{
    if(!isNotEmpty(time)){
        return false;
    }
    if(time == '' || typeof time == 'undefined' || time.length != 10){
        return false;
    }
    let date = time;
    let result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if(result == null){
        return false;
    }
    var d = new Date(result[1], result[3] - 1, result[4]);
    var now = new Date();
    if(d.getTime() > now.getTime()){
        console.log(d.getTime());
        return false;
    }
    return (d.getFullYear() == result[1] && d.getFullYear() && (d.getMonth() + 1) == result[3] && d.getDate() == result[4]);
};

/**
 * 是否为正确的手机号
 * @param mobile
 */
validate.isMobile = (mobile)=>{
    if(!isNotEmpty(mobile)){
        return false;
    }
    let reg = /(^(1[3-9]\d{9})$)/;
    if(reg.test(mobile)){
        return true;
    }
    return false;
};

/**
 * 校验邮箱
 * @param email
 * @returns {boolean}
 */
validate.isEmail = (email)=>{
    if(!isNotEmpty(email)){
        return false;
    }
    let reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    if(reg.test(email)) {
        if(email.length <= 50) {
            return true;
        }
    }
    return false;
};

/**
 * 校验地址
 * @param address
 * @returns {boolean}
 */
validate.isAddress = (address, type = validate.addressType.NORMAL)=>{
    if(!isNotEmpty(address)){
        return false;
    }
    if(address.length < 125){
        if(type == validate.addressType.STRICT){ //严格模式,含有街道，
            if(address.includes('街')){
                return true;
            }
        }else{
            return true;
        }
    }
    return false;
};

/**
 * 校验密码规则
 * @param password
 * @returns {boolean}
 */
validate.isPassword = (password)=>{
    if(!isNotEmpty(password)){
        return false;
    }
    let regx = /^[a-z\d]*$/i;
    let allNumber = /^\d*$/;
    let allLetter = /^[a-z]*$/i;
    /* if(password.length > 20 || password.length < 6){
        return false;
    }else if(allNumber.test(password) || allLetter.test(password)){
        return false;
    }else if(!regx.test(password)){
        return false;
    }*/
    if(password.length > 20 || password.length < 6){
        return false;
    }else if(allNumber.test(password) || allLetter.test(password)){
        return false;
    }
    return true;
};

/**
 * 校验图片验证码
 * @param imgCode
 * @returns {boolean}
 */
validate.isImgCode = (imgCode)=>{
    if(!isNotEmpty(imgCode)){
        return false;
    }
    if(imgCode.length == 4){
        return true;
    }
    return false;
};

/**
 * 校验短信验证码
 * @param smsCode
 * @returns {boolean}
 */
validate.isSmsCode = (smsCode)=>{
    if(!isNotEmpty(smsCode)){
        return false;
    }
    let regx =/^\d{6}$/;
    if(regx.test(smsCode)){
        return true;
    }
    return false;
};

/**
 * 封装校验方法
 */
validate.checkParam = (type, value) => {
    let flag = true;
    if(type && value){
        switch(type){
        case 'mobile': 
            flag = validate.isMobile(value);
            break;
        case 'password':
            flag = validate.isPassword(value);
            break;
        case 'name':
            flag = validate.isName(value);
            break;
        case 'certificateNo':
            flag = validate.isCertificateNo(value);
            break;
        case 'email':
            flag = validate.isEmail(value);
            break;
        case 'address':
            flag = validate.isAddress(value);
            break;

        }
    }
    return flag;
};

/**
 * 封装校验方法
 */
validate.checkParamWithMsg = (type, value, name) => {
    if(value == ''){
        return name + '不能为空';
    }
    let flag = validate.checkParam(type, value);
    if(!flag){
        return '请输入正确的' + name;
    }
    return '';
};

/**
 * 封装校验方法
 */
validate.checkParamInsured = (name, showName, value, compType) => {
    let msg = compType == 1? '投保人':compType == 2 ? '被保人': '';
    if(value == ''){
        return msg + showName + '不能为空';
    }
    let flag = validate.checkParam(name, value);
    if(!flag){
        return '请输入正确的' + msg + showName;
    }
    return '';
};

validate.checkBirthdayIsOk = (birthday, ageNumStart, ageNumEnd, sureDateNum = 1, compType = 1)=>{//检验年龄范围
    let compTypeName = compType == 1? '投保人' : compType == 2? '被保人' : '';
    let checkParamsError = '';
    let result = birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if(result != null){
        let birthdayStr = birthday.replace(/-/g,'/') + ' 00:00:00';
        console.log('birthdayStr:' + birthdayStr);
        let dd = new Date(birthdayStr);
        let startTime = dateformat.getDateStart(dateformat.addDay(new Date() , sureDateNum));
        dd = dateformat.addYear(dd, ageNumStart); //大于十八岁
        if(dd.getTime() > startTime.getTime()){//
            checkParamsError = '请保证' + compTypeName + '年龄在'+ ageNumStart +'岁~'+ ageNumEnd +'岁';
        }
        dd = dateformat.addYear(dd, -ageNumStart);
        dd = dateformat.addYear(dd, ageNumEnd + 1); //加一岁，因为max 有一年的期限
        console.log('时间戳：' + dd.getTime() + ',' + startTime.getTime());
        if(dd.getTime() < startTime.getTime()){
            checkParamsError = '请保证' + compTypeName + '年龄在'+ ageNumStart +'岁~'+ ageNumEnd +'岁';
        }
    }
    return checkParamsError;
};

export default validate;
