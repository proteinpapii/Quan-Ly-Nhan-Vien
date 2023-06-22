/**
 *
 * @param  value Giá trị chuỗi cần kiểm tra
 * @param  minLength Chiều dài tối thiểu của chuỗi cần kiểm tra
 * @param  maxLength Chiều dài tối đa của chuỗi
 * @param selector selector của thẻ cần hiển thị looix
 * @param messErr Lỗi cần hiển thị lên UI nếu `value` không thỏa mãn điều kiện
 */
function kiemTraChuoi (value, minLength, maxLength, selector, messErr) {
    //Nếu như kiểm tra false
    if (value.trim().length < minLength || value.trim().length > maxLength) {
        getElement(selector).innerHTML = messErr
        return false
    }

    //Nếu như kiểm tra true
    getElement(selector).innerHTML = ''
    return true
}

/**
 *
 * @param {*} taiKhoan
 * @param {*} dsnv
 * @param {*} selector
 * @param {*} messErr
 * @param {*} isEdit => true => đang edit k cần kiểm tra trùng, false => đang thêm mới cần kiểm tra
 */
function checkAccount (taiKhoan, dsnv, isEdit, selector, messErr) {
    if (isEdit) return true

    var isFlag = true

    for (var i = 0; i < dsnv.length; i++) {
        if (dsnv[i].taiKhoan === taiKhoan) {
            isFlag = false
            break
        }
    }
    if (isFlag) {
        getElement(selector).innerHTML = ''
        return true
    }

    if (!isFlag) {
        getElement(selector).innerHTML = messErr
        return false
    }
}


/**
 * 
 * @param value chuỗi cần kiểm tra
 * @param selector Thẻ hiển thị lỗi
 * @param pattern chuỗi pattern để kiểm tra chuỗi
 * @param messErr Mess err cần hiển thị
 */
function kiemTraPattern (value, selector, pattern, messErr) {
    //Nếu chuỗi không thõa mãn pattern
    if (!pattern.test(value)) {
        getElement(selector).innerHTML = messErr
        return false
    }
    
    //Nếu đúng
    getElement(selector).innerHTML = ''
    return true
}


/**
 *
 * @param  value Giá trị chuỗi cần kiểm tra
 * @param  minLuong Lương cơ bản tối thiểu của chuỗi cần kiểm tra
 * @param  maxLuong Lương cơ bản tối đa của chuỗi
 * @param selector selector của thẻ cần hiển thị looix
 * @param messErr Lỗi cần hiển thị lên UI nếu `value` không thỏa mãn điều kiện
 */

function kiemTraLuong (value, minLuong, maxLuong, selector, messErr) {
    //Nếu như kiểm tra false
    if (value < minLuong || value > maxLuong) {
        getElement(selector).innerHTML = messErr
        return false
    }

    //Nếu như kiểm tra true
    getElement(selector).innerHTML = ''
    return true
}


