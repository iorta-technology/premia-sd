import _ from 'lodash';
import dataLibrary from './dataLibrary'

let nonContact = dataLibrary.nonContact;
let contact = dataLibrary.contact;
let _apStatusList = dataLibrary.appointmentStatus;
let _appointDispoList = dataLibrary._appointDispoList;


export const stoageSetter = (key, value) =>{
    let stringify = JSON.stringify(value)
    window.localStorage.setItem(key, encryptDecrypt(stringify, 'encrypt'))
    return value;
}

export const encryptDecrypt = (str, type) => {
    return (type === "encrypt") ? str : str
}

export const camelCaseKeys = (obj) =>{
    return _.mapKeys(obj, (v, k) => _.camelCase(k))
}

export const stoageRemover = (key) => {
    window.localStorage.removeItem(key);
}

export const stoageGetter = (key) => {
    let value= null, temp =null;
    if(typeof key === "object")
    {
        value = {};
        _.map(key, function(k){
            temp = window.localStorage.getItem(k);
            temp = (temp) ? JSON.parse(encryptDecrypt(temp, 'decrypt')) : temp
            value[k] = temp
        })    
    }
    else if (typeof key === "string")
    {
        value = null;
        if(key)
        {
            value = window.localStorage.getItem(key);
            value = (value) ? JSON.parse(encryptDecrypt(value, 'decrypt')) : value
    
        }
    }
    return value
}

export const checkAgent=(levelCode,minValue)=>{
      return   levelCode === minValue ? false : true
}

export const dataFormatting =(resp, title, desc)=> {
    // console.log("desc object check",desc);

    let _obj = {};
    _obj['date'] = new Date(parseInt(resp.created_date)).toLocaleString();
    // _obj['owner'] = resp.userId.first_name
    _obj['owner'] = resp.userId !== null ? doSentenceCase(resp.userId.first_name) : "";
    // _obj['owner']       = resp.Owner;
    _obj['desc'] = desc.replace('|undefined|', '');
    _obj['highlight'] = true;
    _obj['title'] = title;

    console.log(_obj)
    return _obj;
}

export function getLabel(item) {
    let result = compare_C(item, contact, 'value', 'dispValue');  

    console.log('Here the Result of Dipsositions : ', result);

    // Comparision purpos
    return (
        result === "" ? 
        (compare_C(item, nonContact, 'value', 'dispValue') === "" ? 
        (compare_C(item, _apStatusList, 'value', 'dispValue') === "" ? (compare_C(item, _appointDispoList, 'value', 'dispValue') === "" ? "" : compare_C(item, _appointDispoList, 'value', 'dispValue')) : compare_C(item, _apStatusList, 'value', 'dispValue')): compare_C(item, nonContact, 'value', 'dispValue')) 
        : result
    );

}
export function doSentenceCase(strText) {
    try {
        var _str = strText.toLowerCase();
        var collection = _str.split(" ");
        var modifyStrigs = [];
        _str = '';
        for (var i = 0; i < collection.length; i++) {
            modifyStrigs[i] = collection[i].charAt(0).toUpperCase() + collection[i].slice(1);
            _str = _str + modifyStrigs[i] + ' ';

        }
        return _str.trim();
    } catch (err) {}
}

export function milisecondToTime(milisecond) {
    try {
        console.log("MILESECOND :::::", milisecond);
        let index = dataLibrary.timeList.findIndex(e => e.value === milisecond.toString());

        console.log("current Index : ", index);


        if (index === -1) {
            return "";
        } else {
            console.log("Result:::", dataLibrary.timeList[index].dispValue);
            return dataLibrary.timeList[index].dispValue;
        }
    } catch (error) {
        console.log(error);
    }
}
export function respDetails(respData) {
    console.log("Response Details object",respData)
    try {
        if (typeof(respData) == "string") {
            respData = respData.split("|");
            let makeString = "";
            for (let i = 0; i < respData.length; i++) {
                let value = respData[i].trim();
                if (value !== "") {
                    makeString = makeString + value + "|";
                } else {
                    makeString = ''
                }
            }
            return makeString;
        } else {
            return ""
        }
    } catch (err) {
        console.log(err)
    }

}
export function idFilter(id, initial = null) {
    try {
        if (id !== '') {
            if (initial === null || initial === undefined || initial === "") {
                initial = 'L';
            }
            if (typeof(id) !== undefined) {
                id = initial + id.slice(16, 25).toUpperCase();

            }
        }
        console.log(id)
        return id;
    } catch (err) {}
}

var compare_C = function(item, _array, _with, key) {
    // return new Promise((resolve, reject) => {
    //     for(let i = 0; i < _array.length; i++) {
    //         item == _array[i][_with] ? resolve(_array[i][_with]) : reject(false)
    //     }
    // });

    let result = "";
    for(let i = 0; i < _array.length; i++) {
        if(item === _array[i][_with]) {
            result = _array[i][key];
            break;
        } else {result = "";}
    }
    return result;
}
export const milToDateString =(milisec)=>{
    const date = new Date(milisec).toLocaleDateString('in')
    return date
}

export const getLeadFilter=(leadFilter)=>{
    const leadFilterObj = {
        all_lead:'all',
        fortoday:'fortoday',
        openlead:'open',
        convertedleads:'converted',
        pendingproposal:'failed'
    }
    switch(leadFilter){
        case "all_lead":return 'all';
        case "fortoday":return 'fortoday';
        case "openlead":return 'open';
        case "convertedleads":return 'converted';
        case "pendingproposal":return 'failed';

        default:  return 'all';

    }
    // console.log(leadFilterObj.leadFilter)
    // return leadFilterObj.leadFilter
}