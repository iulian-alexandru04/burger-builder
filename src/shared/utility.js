export const checkValidity = (value, rules) => {
    const mailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const numericPattern = /^\d+$/;
    if(!rules)
        return true;
    if(rules.required && value.trim() === '')
        return false;
    if(rules.minLength && value.trim().length < rules.minLength)
        return false;
    if(rules.maxLength && value.trim().length > rules.maxLength)
        return false;
    if(rules.isEmail && !mailPattern.test(value))
        return false;
    if(rules.isNumeric && !numericPattern.test(value))
        return false;
    return true;
}
