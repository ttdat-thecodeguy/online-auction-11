var moment = require('moment'); // require

require('moment/locale/vi')

// moment.updateLocale('en', {
//     relativeTime : {
//         future: "in %s",
//         past:   "%s ago",
//         s: function (number, withoutSuffix, key, isFuture){
//             return '00:' + (number<10 ? '0':'') + number + ' minutes';
//         },
//         m:  "01:00 minutes",
//         mm: function (number, withoutSuffix, key, isFuture){
//             return (number<10 ? '0':'') + number + ':00' + ' minutes';
//         },
//         h:  "an hour",
//         hh: "%d hours",
//         d:  "a day",
//         dd: "%d days",
//         M:  "a month",
//         MM: "%d months",
//         y:  "a year",
//         yy: "%d years"
//     }
// });

moment.locale('vi')

module.exports = {
    doiTiengViet : (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    },
    toPath: (str, id) => {
        str = str.toLowerCase()
        let arr = str.split(" ");
        let path = id + "-";
        for(let i = 0;i < arr.length - 1;i++) path += removeTV(arr[i]) + "-";
        return (path + removeTV(arr[arr.length - 1])    )
    },
    mapProduct : (product, id, anh) => {        
        if(product.cap_danh_muc == 0) product.cap_danh_muc = "Điện thoại";
        else product.cap_danh_muc = "Máy tính";
    
        product.danh_muc =  {
            id : product.id_danh_muc,
            ten : product.ten_danh_muc,
            cap_danh_muc: product.cap_danh_muc
        }

        product.nguoi_ban = {
            id : product.id_nguoi_ban,
            ho_ten: product.ho_ten,
            email: product.email,
            diem_duong: product.diem_duong,
            diem_am: product.diem_am
        }

        product.anh_phu = anh
        
        delete product.id_nguoi_ban
        delete product.ho_ten
        delete product.email
        delete product.diem_duong
        delete product.diem_am
        delete product.cap_danh_muc
        delete product.id_danh_muc
        delete product.ten_danh_muc
        
        var e =  moment(product.end_date);
        var p = moment(product.publish_date);

        var today = moment().startOf('day');

        var sec_end_date = Math.round(moment.duration(e - today).asSeconds());
        var sec_publish_date = Math.round(moment.duration(today - p).asSeconds());
        
        product.isMoi = false
        product.relative_publish_date = null
        product.relative_end_date = null
        
        if(sec_publish_date < 3600){
            product.isMoi = true
            product.relative_publish_date = p.fromNow()
        }

        if(sec_end_date < 259200){
            product.relative_end_date = e.fromNow()
        }

        product.path = module.exports.toPath(product.ten_sp, id);
        return product
    },
    masking: (str)=>{
        let idx = Math.round(str.length / 2) 
        return replaceBetween(0, idx, "*", str)
    }

}



function replaceBetween(start, end, chr, str) {
    let masking = ''
    for(let i = start; i < end;i++) masking += chr
    return masking + str.substring(end);
};

function removeTV(str){
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}