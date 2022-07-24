/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2021-05-14 14:06:41
 * @LastEditors: shoen
 * @LastEditTime: 2021-12-23 14:23:16
 */

/**
 * 日期时间检查  
 * 格式为：YYYY-MM-DD HH:MM:SS
 */
export function checkDateTime(str) {   
    var reg = /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s((([0-1][0-9])|(2?[0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/
    var r = str.match(reg);   
    if(r==null) {
        return false;
    }
    else {   
        return true;  
    }
}

/**
 * 时间长度表达式检查
 * 例如：20h
 *      20m
 *      20s
 * 
 * @param {*} str 
 */
export function checkTimeExpressionLength(str) {
    var reg = /(\dh$)|(\dm$)|(\ds$)/
    var r = str.match(reg);   
    if(r==null) {
        return false;
    }
    else {   
        return true;  
    } 
}

/**
 * 识别 YYYY-MM-DD~YYYY-MM-DD;YYYY-MM-DD;星期一~星期二;星期一
 * @param {*} str 
 */
export function checkCalendarDate(str) {
    let reg = /(^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))$)/
    let regWeek =/^星期[一二三四五六日]{1}$/
    let strArray=str.split(';');

    for(var i = 0; i < strArray.length; i++) {
        // (1) YYYY-MM-DD ~ YYYY-MM-DD
        if (strArray[i].indexOf('~')>=0 && strArray[i].indexOf('星期')===-1) {
            let tempArray=strArray[i].split('~');
            for (var j=0;j<tempArray.length;j++) {
                let r = tempArray[j].match(reg);   
                if(r==null) {
                    return false;
                }
            }
        } 

        // (2) 星期一 ～ 星期二
        if (strArray[i].indexOf('~')>=0 && strArray[i].indexOf('星期')>=0) {
            let tempArray=strArray[i].split('~');
            for (var j=0;j<tempArray.length;j++) {
                let r = tempArray[j].match(regWeek);   
                if(r==null) {
                    return false;
                }
            }
        } 

        // (3) YYYY-MM-DD
        if (strArray[i].indexOf('~')===-1 && strArray[i].indexOf('星期')===-1) {
            let r = strArray[i].match(reg);   
            if(r==null) {
                return false;
            }
        }

        // (4) 星期
        if (strArray[i].indexOf('~')===-1 && strArray[i].indexOf('星期')>=0) {
            let r = strArray[i].match(regWeek);   
            if(r==null) {
                return false;
            }
        }
    }

    return true;
}


/**
 * 识别 HH:MM-HH:MM;HH:MM-HH:MM
 * @param {*} str 
 */
export function checkShiftPattern(str) {
    let reg = /(^(([0-1][0-9])|(2?[0-3]))\:([0-5]?[0-9])$)/
    let strArray=str.split(';');

    for(var i = 0; i < strArray.length; i++) {
        // (1) HH:MM - HH:MM
        if (strArray[i].indexOf('-')>=0) {
            let tempArray=strArray[i].split('-');
            for (var j=0;j<tempArray.length;j++) {
                let r = tempArray[j].match(reg);   
                if(r==null) {
                    return false;
                }
            }
        } 
        else {
            return false;
        }
    }

    return true;

}