/**
 * Created by admin on 2017/4/18.
 */

export default function dateformat() {
};


/**
 * 格式化时间
 * @param date
 * @param fmt
 * @returns {*}
 */
dateformat.format = function (date, fmt) {
    var o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds() //毫秒
    };
    if (!this.isNotEmpty(fmt)) {
        fmt = 'yyyy-MM-dd hh:mm:ss';
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
};


dateformat.formatToDate = function (dateStr) {
    if (this.isNotEmpty(dateStr)) {
        return new Date(Date.parse(dateStr.replace(/-/g, '/')));
    }
    return '';
};

dateformat.getDateStart = function (date) {
    var fmt = 'yyyy/MM/dd';
    var dateStartStr = this.getDateStartStr(date, fmt);
    var startTime = new Date(Date.parse(dateStartStr));
    return startTime;
};

dateformat.getDateStartStr = function (date, fmt) {
    if (typeof fmt == 'undefined') {
        fmt = 'yyyy/MM/dd';
    }
    var dateStr = this.format(date, fmt);
    dateStr += ' 00:00:00';
    return dateStr;
};

dateformat.getDateEnd = function (date) {
    var fmt = 'yyyy/MM/dd';
    var dateEndStr = this.getDateEndStr(date, fmt);
    var endTime = new Date(Date.parse(dateEndStr));
    return endTime;
};

dateformat.getDateEndStr = function (date, fmt) {
    if (typeof fmt == 'undefined') {
        fmt = 'yyyy/MM/dd';
    }
    var endStr = this.format(date, fmt);
    endStr += ' 24:00:00';
    return endStr;
};

dateformat.compareDate = function (d1, d2) {
    if (d1 && d2) {
        if (d1.getTime() > d2.getTime()) {
            return 1;
        } else if (d1.getTime() == d2.getTime()) {
            return 0;
        } else if (d1.getTime() < d2.getTime()) {
            return -1;
        }
    }
};

dateformat.isLeapYear = function (date) {
    if (date instanceof Date) {
        return (0 == date.getYear() % 4 && (( date.getYear() % 100 != 0) || (date.getYear() % 400 == 0)));
    }
    console.warn('argument format is wrong');
    return false;
};

dateformat.isValidDate = function (dateStr) {
    if (this.isNotEmpty(dateStr)) {
        var r = dateStr.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (r == null) {
            return false;
        }
        var d = new Date(r[1], r[3] - 1, r[4]);
        var num = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
        return (num != 0);
    }
};

dateformat.addDay = function (date, dayNum) {
    if (this.isNotEmpty(date) && this.isNotEmpty(dayNum) && date instanceof Date && typeof dayNum == 'number') {
        date.setDate(date.getDate() + dayNum);
    } else {
        console.warn('date or dayNum format wrong');
    }
    return date;
};

dateformat.addDayStr = function (dateStr, dayNum) {
    var date = '';
    if (this.isNotEmpty(dateStr) && this.isNotEmpty(dayNum) && typeof dayNum == 'number') {
        date = this.formatToDate(dateStr);
        date.setDate(date.getDate() + dayNum);
    } else {
        console.warn('dateStr or dayNum format wrong');
    }
    return date;
};

dateformat.addMonth = function (date, monthNum) {
    if (this.isNotEmpty(date) && this.isNotEmpty(monthNum) && date instanceof Date && typeof monthNum == 'number') {
        date.setMonth(date.getMonth() + monthNum);
    } else {
        console.warn('date or monthNum format wrong');
    }
    return date;
};

dateformat.addMonthStr = function (dateStr, monthNum) {
    var date = '';
    if (this.isNotEmpty(dateStr) && this.isNotEmpty(monthNum) && typeof monthNum == 'number') {
        date = this.formatToDate(dateStr);
        date.setMonth(date.getMonth() + monthNum);
    } else {
        console.warn('date or monthNum format wrong');
    }
    return date;
};

dateformat.addYear = function (date, yearNum) {
    if (this.isNotEmpty(date) && this.isNotEmpty(yearNum) && date instanceof Date && typeof yearNum == 'number') {
        date.setYear(date.getFullYear() + yearNum);
    } else {
        console.warn('date or yearNum format wrong');
    }
    return date;
};

dateformat.addYearStr = function (dateStr, yearNum) {
    var date = '';
    if (this.isNotEmpty(dateStr) && this.isNotEmpty(yearNum) && typeof yearNum == 'number') {
        date = this.formatToDate(dateStr);
        date.setYear(date.getFullYear() + yearNum);
    } else {
        console.warn('date or yearNum format wrong');
    }
    return date;
};

dateformat.isNotEmpty = function (str) {
    if (str != '' && str != null && typeof str != 'undefined') {
        return true;
    }
    console.warn('argument format is wrong');
    return false;
};

dateformat.getWeek = function (date, type) {
    if (date) {
        if (!this.isNotEmpty(type)) {
            type = 0;
        }
        var index = date.getDay();
        var dateStr = '';
        switch (type) {
        case this.WEEKTYPE.ZH_DAYNAME:
            dateStr = this._options.ZH.dayNames[index];
            break;
        case this.WEEKTYPE.ZH_SDAYNAME:
            dateStr = this._options.ZH.shortDayNames[index];
            break;
        case this.WEEKTYPE.US_DAYNAME:
            dateStr = this._options.US.dayNames[index];
            break;
        case this.WEEKTYPE.US_SDAYNAME:
            dateStr = this._options.US.shortDayNames[index];
            break;
        }
        return dateStr;
    }
};

dateformat.getDateDiffNum = function (d1, d2) {
    if(d1 && d2){
        let dateNum = parseInt((d2.getTime() - d1.getTime())/(24 * 60 * 60 * 1000));
        return dateNum;
    }
    return '';
};

dateformat.WEEKTYPE = {
    ZH_DAYNAME: 0,
    ZH_SDAYNAME: 1,
    US_DAYNAME: 2,
    US_SDAYNAME: 3,
};

dateformat._options = {
    ZH: {
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        shortDayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        shortMonthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    US: {
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        shortDayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        shortMonthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
};

dateformat.timeForm = function(time){
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    if(month<10){
        month = '0' + month;
    }
    let day = time.getDate();
    if(day<10){
        day = '0' + day;
    }
    return year + '-' + month + '-' + day;
};

dateformat.checkMinYear = function(cardId, todayDate,ageDetail){//大于多少岁
    let birthday = cardId.substring(6, 14);
    birthday = birthday.substring(0, 4) + '-' + birthday.substring(4, 6) + '-' + birthday.substring(6, 8);
    let nowYear = todayDate.split('-')[0];
    let nowMonth = todayDate.split('-')[1];
    let nowDay = todayDate.split('-')[2];
    let arr = birthday.split('-');
    let value = nowYear-arr[0];
    if(parseInt(arr[1])>parseInt(nowMonth)){
        value -= 1;
    }else if(arr[1]==nowMonth){
        if(parseInt(arr[2])>parseInt(nowDay)){
            value -= 1;
        }
    }
    if(value<ageDetail){
        arr[0] = parseInt(arr[0])+ageDetail;
        return new Date(arr[0]+'/'+arr[1]+'/'+arr[2] + ' 00:00:00');
    }else {
        return true;
    }
};

dateformat.checkMaxYear = function(cardId, todayDate,ageDetail){//小于多少岁 ok
    let birthday = cardId.substring(6, 14);
    birthday = birthday.substring(0, 4) + '-' + birthday.substring(4, 6) + '-' + birthday.substring(6, 8);
    let nowYear = todayDate.split('-')[0];
    let nowMonth = todayDate.split('-')[1];
    let nowDay = todayDate.split('-')[2];
    let arr = birthday.split('-');
    let value = nowYear-arr[0];
    if(parseInt(arr[1])>parseInt(nowMonth)){
        value -= 1;
    }else if(arr[1]==nowMonth){
        if(parseInt(arr[2])>parseInt(nowDay)){
            value -= 1;
        }
    }
    if(value<=ageDetail){
        return true;
    }else{
        return false;
    }
};
dateformat.checkMinMonth = function(cardId, todayDate,monthDetail){//大于多少个月
    let birthday = cardId.substring(6, 14);
    birthday = birthday.substring(0, 4) + '-' + birthday.substring(4, 6) + '-' + birthday.substring(6, 8);
    let nowYear = todayDate.split('-')[0];
    let nowMonth = todayDate.split('-')[1];
    let nowDay = todayDate.split('-')[2];
    let arr = birthday.split('-');
    let value = (nowYear-arr[0])*12 + (nowMonth - arr[1]);
    if(parseInt(nowDay)<=parseInt(arr[2])){
        value=value-1;
    }
    if(value>=monthDetail){
        return true;
    }else{
        return dateformat.addMonth(new Date(arr[0]+'/'+arr[1]+'/'+(parseInt(arr[2]) + 1) + ' 00:00:00'), monthDetail);
    }
};
dateformat.checkMaxMonth = function(cardId, todayDate,monthDetail){//小于多少个月
    let birthday = cardId.substring(6, 14);
    birthday = birthday.substring(0, 4) + '-' + birthday.substring(4, 6) + '-' + birthday.substring(6, 8);
    let nowYear = todayDate.split('-')[0];
    let nowMonth = todayDate.split('-')[1];
    let nowDay = todayDate.split('-')[2];
    let arr = birthday.split('-');
    let value = (nowYear-arr[0])*12 + (nowMonth - arr[1]);
    if(parseInt(nowDay)<=parseInt(arr[2])){
        value=value-1;
    }
    if(value<=monthDetail){
        return true;
    }else{
        return false;
    }
};


dateformat.checkMinDay = function(cardId, todayDate,dayDetail){//大于多少天 ok
    let birthday = cardId.substring(6, 14);
    birthday = birthday.substring(0, 4) + '/' + birthday.substring(4, 6) + '/' + birthday.substring(6, 8);
    let time1 = new Date(birthday+' 00:00:00').getTime();
    todayDate = todayDate.split('-')[0] + '/' + todayDate.split('-')[1] + '/' + todayDate.split('-')[2];
    let time2 = new Date(todayDate+' 00:00:00').getTime();
    let value = Math.ceil((time2-time1)/(3600*24*1000));
    if(value>=dayDetail){
        return true;
    }else{
        return false;
    }
};

dateformat.checkMaxDay = function(cardId, todayDate,dayDetail){//小于多少天 ok
    let birthday = cardId.substring(6, 14);
    birthday = birthday.substring(0, 4) + '/' + birthday.substring(4, 6) + '/' + birthday.substring(6, 8);
    let time1 = new Date(birthday+' 00:00:00').getTime();
    todayDate = todayDate.split('-')[0] + '/' + todayDate.split('-')[1] + '/' + todayDate.split('-')[2];
    let time2 = new Date(todayDate+' 00:00:00').getTime();
    let value = Math.ceil((time2-time1)/(3600*24*1000));
    if(value<=dayDetail){
        return true;
    }else{
        return false;
    }
};


//校验生效日期总封装
//min{ type: '', value: '' } 大于多少天、月、年
//max{ type: '', value: '' } 小于多少天、月、年
//type：year month day
// return code: 1 min不合法   2  max 不合法 0 校验通过
//cardId string  todayDate string min obj max obj
dateformat.checkAll = function(cardId, todayDate, min, max){
    //首先判断min
    let code = 0;
    if(min){
        if(min.type == 'year'){
            let res = dateformat.checkMinYear(cardId, todayDate, min.value);
            if(typeof res != 'boolean'){
                code = 1;
                return code;
            }
        }else if(min.type == 'month'){
            let res = dateformat.checkMinMonth(cardId, todayDate, min.value);
            if(typeof res != 'boolean'){
                code = 1;
                return code;
            }
        }else if(min.type == 'day'){
            let res = dateformat.checkMinDay(cardId, todayDate, min.value);
            if(!res){
                code = 1;
                return code;
            }
        }
    }
    if(max){
        if(max.type == 'year'){
            let res = dateformat.checkMaxYear(cardId, todayDate, max.value);
            if(!res){
                code = 2;
                return code;
            }
        }else if(max.type == 'month'){
            let res = dateformat.checkMaxMonth(cardId, todayDate, max.value);
            if(!res){
                code = 2;
                return code;
            }
        }else if(max.type == 'day'){
            let res = dateformat.checkMaxDay(cardId, todayDate, max.value);
            if(!res){
                code = 2;
                return code;
            }
        }
    }
    return code;
};

dateformat.yearToYearCheck=(year1, year2 , certificateNo, day) => {
    let checkParamsError = '';
    if(year1 && year2){
        if((/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(certificateNo))){ //身份证号
            let birthday = certificateNo.substring(6, 14);
            birthday = birthday.substr(0,4) + '-' + birthday.substr(4,2) + '-' + birthday.substr(6,2);
            let birthdayStr = birthday.replace(/-/g,'/') + ' 00:00:00';
            let dd = new Date(birthdayStr);
            let startTime = dateformat.getDateStart(dateformat.addDay(new Date(), day));
            dd.setFullYear(dd.getFullYear() + year1);
            if(dd.getTime() > startTime.getTime()){
                checkParamsError = '请保证身份证年龄在'+year1+'周岁-'+year2+'周岁';
            }
            dd.setFullYear(dd.getFullYear() + (year2-year1)); //再加31岁
            if(dd.getTime() < startTime.getTime()){
                checkParamsError = '请保证身份证年龄在'+year1+'周岁-'+year2+'周岁';
            }
        }
    }
    return checkParamsError;
};