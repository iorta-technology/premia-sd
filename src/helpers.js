import _ from 'lodash';




export const stoageSetter = (key, value) => 
{
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