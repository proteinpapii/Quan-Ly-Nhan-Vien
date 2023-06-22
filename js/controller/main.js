function getElement(selector) {
    return document.querySelector(selector)
}

var dsnv = new DSNV()

getLocalStorage()

//Lấy thông tin từ User
function infoNV(isEdit) {
    var taiKhoan = getElement('#tknv').value
    var hoTen = getElement('#name').value
    var email = getElement('#email').value
    var matKhau = getElement('#password').value
    var ngayLam = getElement('#datepicker').value
    var luongCB = +getElement('#luongCB').value
    var chucVu = getElement('#chucVu').value
    var gioLam = +getElement('#gioLam').value

    //tạo đối tượng nhân viên từ thông tin lấy đc từ user

    var nhanVien = new NhanVien(
        taiKhoan,
        hoTen,
        email,
        matKhau,
        ngayLam,
        luongCB,
        chucVu,
        gioLam
    )

    


    //Validation
    var isValid = true

    //Kiểm tra tài khoản
    isValid &= kiemTraChuoi(nhanVien.taiKhoan, 1, undefined, '#tbTKNV', 'Tài khoản không được bỏ trống') && kiemTraChuoi(nhanVien.taiKhoan, 4, 6, '#tbTKNV', 'Tài khoản tối đa 4 - 6 ký số') && checkAccount(nhanVien.taiKhoan, dsnv.arrNV, isEdit, '#tbTKNV', 'Tài khoản đã tồn tại') && kiemTraPattern (nhanVien.taiKhoan, '#tbTKNV', /^[0-9]+$/, 'Tài khoản phải là ký số')

    //Kiểm tra tên NV
    isValid &= kiemTraChuoi(nhanVien.hoTen, 1, undefined, '#tbTen', 'Họ tên nhân viên không được bỏ trống') && kiemTraPattern (nhanVien.hoTen, '#tbTen', /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/, 'Tên nhân viên phải là chữ')

    //Kiểm tra email
    isValid &= kiemTraChuoi(nhanVien.email, 1, undefined, '#tbEmail', 'Email nhân viên không được bỏ trống') && kiemTraPattern (nhanVien.email, '#tbEmail', /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email không đúng định dạng')

    //Kiểm tra mật khẩu
    isValid &= kiemTraChuoi(nhanVien.matKhau, 1, undefined, '#tbMatKhau', 'Mật khẩu không được bỏ trống') && kiemTraChuoi(nhanVien.matKhau, 6, 10, '#tbMatKhau', 'Mật khẩu chứa tối đa 6 - 10 ký tự') && kiemTraPattern (nhanVien.matKhau, '#tbMatKhau', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/, 'Mật khẩu chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt')

    //Kiểm tra ngày làm
    isValid &= kiemTraChuoi(nhanVien.ngayLam, 1, undefined, '#tbNgay', 'Ngày làm không được bỏ trống')

    //Kiểm tra lương cơ bản
    isValid &= kiemTraLuong (nhanVien.luongCB, 1000000, 20000000, '#tbLuongCB', 'Lương cơ bản 1.000.000 - 20.000.000')

    //Kiểm tra số giờ làm
    isValid &= kiemTraLuong (nhanVien.gioLam, 80, 200, '#tbGiolam', 'Số giờ làm trong tháng 80 - 200 giờ')
 
    return isValid ? nhanVien : undefined //(Toán tử 3 ngôi)
}

getElement('#btnThemNV').onclick = function () {
    var nhanVien = infoNV(false)

    if (nhanVien) {

        //thêm NV vào mảng
        dsnv.themNV(nhanVien)
        //console.log('DSNV:',dsnv.arrNV);
    
        //Gọi lại hàm render
        renderdsnv()
    
        // Gọi hàm lưu data
        setLocalStorage()
    
        getElement('#formQLNV').reset()
    }
}

//In danh sách ra UI
function renderdsnv(arrNV = dsnv.arrNV) {
    var content = ''
    for (var i = 0; i < arrNV.length; i++) {
        var nv = arrNV[i]
        content += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong()}</td>
                <td>${nv.loaiNV()}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="editNV('${nv.taiKhoan}')" data-toggle="modal"	data-target="#myModal">Edit</button>
                    <button class='btn btn-danger btn-sm' onclick="deleteNV('${nv.taiKhoan}')">Delete</button>
                </td>
            </tr>
        `
    }
    getElement('#tableDanhSach').innerHTML = content
}

// Lưu danh sách vào localStorage
function setLocalStorage() {
    // Lưu data vào local đồng thời chuyển data thành chuỗi (JSON.Stringify)
    //localStorage.setItem('DSNV', JSON.stringify(dsnv.arrNV))

    var data = JSON.stringify(dsnv.arrNV)

    localStorage.setItem('DSNV', data)
}

// Lấy data DSNV lại từ localStorage sau khi f5
function getLocalStorage() {
    // Lấy data từ local
    var data = localStorage.getItem('DSNV')

    // Parse data vừa lấy về kiểu dữ liệu ban đầu
    if (data) {
        var parseData = JSON.parse(data)

        //Tạo mảng rỗng để lưu DSNV
        var arr = []

        //Duyệt mảng vừa lấy từ local
        for (var i = 0; i < parseData.length; i++) {
            var nv = parseData[i]

            //Tạo lại đối tượng nv từ lớp đối tượng NV
            var nhanVien = new NhanVien(
                nv.taiKhoan,
                nv.hoTen,
                nv.email,
                nv.matKhau,
                nv.ngayLam,
                nv.luongCB,
                nv.chucVu,
                nv.gioLam
            )

            //Thêm nv vào mảng arr
            arr.push(nhanVien)
        }
        //Render lại data vào mảng
        dsnv.arrNV = arr
        renderdsnv()
    }
}

//Button xóa nhân viên
function deleteNV(taiKhoan) {
    dsnv.xoaNV(taiKhoan)

    //Gọi lại hàm render để cập hật sau khi xóa thành công
    renderdsnv()

    //Cập nhật lại data lưu ở localStorage
    setLocalStorage()
}

//Cập nhật NV
function editNV(taiKhoan) {
    var index = dsnv.timNV(taiKhoan)
    var nv = dsnv.arrNV[index]
    //console.log('NV:', nv);

    //Đẩy data lên input
    getElement('#tknv').value = nv.taiKhoan
    getElement('#name').value = nv.hoTen
    getElement('#email').value = nv.email
    getElement('#password').value = nv.matKhau
    getElement('#datepicker').value = nv.ngayLam
    getElement('#luongCB').value = nv.luongCB
    getElement('#chucVu').value = nv.chucVu
    getElement('#gioLam').value = nv.gioLam

}

//Cập nhật lại thông tin NV
getElement('#btnCapNhat').onclick = function () {
    // Lấy lại data sau khi user chỉnh sửa
    var nhanVien = infoNV(true)

    //Cập nhật lại DSNV vào ảng
    dsnv.capNhatNV(nhanVien)

    // Hiển thị lại lên UI
    renderdsnv()


    //Cập nhật lại data local
    setLocalStorage()

    //Reset lại form input sau khi cập nhật
    getElement('#formQLNV').reset()
}

// Tìm kiếm sinh viên
getElement('#searchName').addEventListener('keyup', function () {
    var valueSearch = getElement('#searchName').value.toLowerCase()
    var arrSearch = []
    for (var i = 0; i < dsnv.arrNV.length; i++) {
        var loaiNV = dsnv.arrNV[i].loaiNV().toLowerCase()
        if (loaiNV.indexOf(valueSearch) !== -1) {
            arrSearch.push(dsnv.arrNV[i])
        }
    }
    renderdsnv(arrSearch)
})

