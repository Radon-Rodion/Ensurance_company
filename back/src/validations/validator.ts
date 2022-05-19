import {validate, Type, Any, ID, Primitive} from 'validate-typescript'

class Validator {

    validateIsPositiveNumber(id: string) {
        let regExpNumber = new RegExp("[1-9]\\d*");
        return regExpNumber.test(id);
    }

    validateDate(date: string) {
        let regExpDate = new RegExp("[1-9]\\d{0,3}-((0[1-9])|(1[0-2]))-((0[1-9])|(1\\d)|(2\\d)|(3[0-1]))")
        return regExpDate.test(date);
    }

    validateURL(url: string) {
        let regExp = new RegExp("^((ftp|http|https):\\/\\/)?(www\\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\\-]*\\.?)*\\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\\/([\\w#!:.?+=&%@!\\-\\/])*)?");
        return regExp.test(url);
    }

    validateCardNumber(card: string) {
        let regExp = new RegExp("\\d{16}");
        return regExp.test(card);
    }

    validateEmail(email: string) {
        let regExp = new RegExp("^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$");
        return regExp.test(email);
    }

    validatePhone(phone: string) {
        let regExp = new RegExp("^((8|\\+374|\\+994|\\+995|\\+375|\\+7|\\+380|\\+38|\\+996|\\+998|\\+993)[\\- ]?)?\\(?\\d{3,5}\\)?[\\- ]?\\d{1}[\\- ]?\\d{1}[\\- ]?\\d{1}[\\- ]?\\d{1}[\\- ]?\\d{1}(([\\- ]?\\d{1})?[\\- ]?\\d{1})?$");
        return regExp.test(phone)
    }
}

const validator = new Validator();
export default validator;