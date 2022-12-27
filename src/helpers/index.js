import { Dimensions } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

// mergeStyles:
// İki stil öğesini birleştirir.
// style1 (zorunlu): Varsayılan stildir. Obje olmak zorundadır. Örn: { textAlign:'center', textAlignVertical:'center' }
// style2: Varsayılan stile eklenmek istenen stildir. Obje veya objeler dizisi olabilir. Örn: { color:'red' } veya [{color:'red'}, {backgroundColor:'white'}]
export const mergeStyles = (style1, style2) => style2 ? (style2.length ? [style1, ...style2] : Object.assign({}, style1, style2)) : style1;

// Ekran boyutları:
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;
export const safeAreaTopInset = StaticSafeAreaInsets.safeAreaInsetsTop;
export const safeAreaBottomInset = StaticSafeAreaInsets.safeAreaInsetsBottom;

// Tel no için verilen string'i (555) 555 55 55 formatına çevirir.
export const phoneNumberFormat = phoneStr => {
  let value = '';
  const valueOnlyNumbers = phoneStr.replace(/[^\d]/g, '');
  if (valueOnlyNumbers.length >= 3 && valueOnlyNumbers.length <= 6) value = valueOnlyNumbers.replace(/(\d{3})(\d)/, '($1) $2');
  else if (valueOnlyNumbers.length >= 7 && valueOnlyNumbers.length <= 8) value = valueOnlyNumbers.replace(/(\d{3})(\d{3})(\d)/, '($1) $2 $3');
  else if (valueOnlyNumbers.length >= 9 && valueOnlyNumbers.length <= 10) value = valueOnlyNumbers.replace(/(\d{3})(\d{3})(\d{2})(\d)/, '($1) $2 $3 $4');
  else valueOnlyNumbers.slice(0, 10).replace(/(\d{3})(\d{3})(\d{2})(\d{2})/g, '($1) $2 $3 $4');
  return value;
}

/**
 * Array içinde değer arar.
 * @param {array} array - Hangi değerler arasından arama yapılacak?
 * @param {string | number} value - Hangi değer aranacak?
 * @param {string | number} defaultValue - Değer bulunamazsa varsayılan değer ne döndürülecek?
 * @returns İkinci parametredeki değer ilk parametredeki array içinde varsa bu değeri döner, yoksa varsayılan değeri döner.
 */
export const isOneOfThem = (array, value, defaultValue = null) => {
  if (!Array.isArray(array) || !value || array.indexOf(value) < 0) return defaultValue;
  return value;
}

/**
 * Kullanıcı bir sayfaya gönderilirken bu fonksiyon da parametre olarak gönderilirse bu sayfaya geri gelmek için gereken veriler de iletilmiş olur.
 * @param {string} stackName 
 * @param {object} route 
 * @returns {object}
 */
export const makeSenderData = (stackName, route) => {
  return {
    stack: stackName,
    screen: route.name,
    params: route.params
  }
}

/**
 * String değerdeki bazı bölümleri değiştirmek için kullanılır. replace() fonksiyonu gibi sadece ilk bulduğu değeri değil tüm değerleri bulup değiştirir.
 * @param {string} str - İçinde arama yapılacak string değer
 * @param {string|array} search - Aranacak değer. String olarak aranacak değer verilir. Eğer birkaç değer birden aranacaksa string'ler array'ı verilebilr.
 * @param {string} change - Aranan değerler hangi değerle değişecek?
 * @returns {string} - İlk parametrede verilen string'in düzenlenmiş halini döndürür.
 */
export const replaceAll = (str, search, change) => {
  if (typeof search === "string") {
    return str.split(search).join(change);
  }
  if (Array.isArray(search)) {
    for (let i = 0; i < search.length; i++) {
      str = replaceAll(str, search[i], change);
    }
    return str;
  }
  console.error("replaceAll function has a problem");
  return str;
}

/**
 * Bir string ifadenin e-posta formatında olup olmadığını kontrol eder.
 * @param {string} str - E-posta formatına uygun olup olmadığı kontrol edilecek string değer.
 * @returns - E-posta formatına uygunsa true, değilse false döner.
 */
export const isEmail = (str) => {
  str = replaceAll(str, [" ", "<", ">", "?", "/", "(", ")", "[", "]", "{", "}", "*", "#", "\"", "'", ","], "");
  if (str.indexOf("@") === -1) return false;
  const splitted1 = str.split("@");
  if (splitted1.length !== 2) return false;
  const leftSide = splitted1[0].trim();
  const rightSide = splitted1[1].trim();
  if (leftSide.length === 0) return false;
  if (rightSide.length === 0) return false;
  const splitted2 = rightSide.split(".");
  if (splitted2.length !== 2 && splitted2.length !== 3) return false;
  for (let i = 0; i < splitted2.length; i++)  if (splitted2[i].length === 0) return false;
  return true;
}

/**
 * axios işlemi için kullanılan try-catch bloğunda, hatayı çözümlemek için kullanılan fonksiyon.
 * @param {object} err - Catch bloğu ile yakalanan hata
 * @returns {object} - {response, status, headers}
 */
export const getAxiosCatchError = err => {
  return { response: err.request._response, status: err.response.status, headers: err.response.headers };
}

/**
 * MySQL'den gelen tarih formatına göre düzenlenmiş tarih string'ini istenen formata göre düzenler. Bu format MySQL'in Date veya DateTime formatı olabilir.
 * @param {string} mysqlDateStr - MySQL Date veya DateTime formatıyla () gelen tarih string'i. Örn: "2017-02-04 11:23:54"
 * @param {string} newFormatStr - Yeni formata göre düzenlenmiş tarih string'i. Varsayılan: "day.month.year hour:minute:second"
 * @returns Yeni formata göre düzenlenmiş tarih string'ini döndürür.
 */
export const convertFromMysqlDateTime = (mysqlDateStr, newFormatStr = "day.month.year hour:minute:second", addZeroFor2Digits = true) => {
  const splitted = mysqlDateStr.split(/[- :TZ]/); // "1988-04-03 03:00:55" -> ["1988","04","03","03","00","55"]
  if (splitted.length > 0) newFormatStr = newFormatStr.replaceAll("year", splitted[0]);
  if (splitted.length > 1) newFormatStr = newFormatStr.replaceAll("month", !addZeroFor2Digits ? splitted[1] : addZero(splitted[1]));
  if (splitted.length > 2) newFormatStr = newFormatStr.replaceAll("day", !addZeroFor2Digits ? splitted[2] : addZero(splitted[2]));
  if (splitted.length > 3) newFormatStr = newFormatStr.replaceAll("hour", !addZeroFor2Digits ? splitted[3] : addZero(splitted[3]));
  if (splitted.length > 4) newFormatStr = newFormatStr.replaceAll("minute", !addZeroFor2Digits ? splitted[4] : addZero(splitted[4]));
  if (splitted.length > 5) newFormatStr = newFormatStr.replaceAll("second", !addZeroFor2Digits ? splitted[5] : addZero(splitted[5]));
  return newFormatStr;
}

/**
 * İlk parametrede verilen sayının başına, ikinci parametrede belirtilen karakter sayısına ulaşıncaya kadar 0 ekler.
 * @param {string|number} num - Başına, istenen karakter sayısına ulaşıncaya kadar 0 eklenmek istenen sayı
 * @param {number} numberOfDigits - Sonuç, başına 0 eklendiğinde kaç karakterden oluşacak? (varsayılan: 2)
 * @returns Verilen sayıyının, istenen karakter sayısına ulaşıncaya kadar başına 0 eklenmiş hali.
 */
export const addZero = (num, numberOfDigits = 2) => {
  num = parseInt(num).toString().split('').reverse();
  if (numberOfDigits > 1) for (let i = num.length; i < numberOfDigits; i++) num.push('0');
  return num.reverse().join('');
}

/**
 * Bir değerin boş olup olmadığını kontrol eder.
 * [], {}, "", "undefined", "null", undefined ve null değerleri boş kabul edilir.
 * 0 ve false değerleri boş kabul edilmez.
 * @param {*} val - Boş olup olmadığı kontrol edilecek değer.
 * @returns Değer boşsa true, doluysa false döner.
 */
export const isEmpty = (val) => {
  if (typeof val == "string" && val == "") return true;
  if (val === null || val === undefined) return true;
  if (val === "undefined" || val === "null") return true;
  if (Array.isArray(val) && val.length === 0) return true;
  if (typeof val === "object" && Object.keys(val).length === 0) return true;
  return false;
};

/**
 * Bir değerin null, undefined, boş string, boş obje, boş dizi, 0 veya negatif sayı olup olmadığını kontrol eder.
 * 0 veya negatif sayılar, false, [], {}, "", "undefined", "null", undefined, null, string.trim()=="" değerleri boş kabul edilir.
 * @param {*} val - Boş olup olmadığı kontrol edilecek değer.
 * @returns Değer boşsa true, doluysa false döner.
 */
export const isEmptyOrNegative = (val) => {
  if (typeof val == "string" && val.trim() == "") return true;
  if (!isNaN(val) && Number(val) <= 0) return true;
  if (val === null || val === undefined) return true;
  if (val === "undefined" || val === "null") return true;
  if (typeof val === "object" && Object.keys(val).length === 0) return true;
  return false;
}

export const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  })
}