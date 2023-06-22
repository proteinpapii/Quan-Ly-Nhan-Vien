function NhanVien(
    _taiKhoan,
    _hoTen,
    _email,
    _matKhau,
    _ngayLam,
    _luongCB,
    _chucVu,
    _gioLam
    

) {
    ; this.taiKhoan = _taiKhoan,
        this.hoTen = _hoTen,
        this.email = _email,
        this.matKhau = _matKhau,
        this.ngayLam = _ngayLam,
        this.luongCB = _luongCB,
        this.chucVu = _chucVu,
        this.gioLam = _gioLam,
        this.tongLuong = function () {
            var total
            if (this.chucVu === 'Giám đốc') {
                total = this.luongCB * 3
            }else if (this.chucVu === 'Trưởng phòng') {
                total = this.luongCB * 2
            }else {
                total = this.luongCB 
            }

            var result = new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(total)
            
            return result
        }
        this.loaiNV = function () {
            var xepLoai
            if (this.gioLam >= 192) {
                xepLoai = 'Nhân viên xuất sắc'
            }else if (this.gioLam >= 176) {
                xepLoai = 'Nhân viên giỏi'
            }else if (this.gioLam >= 160) {
                xepLoai = 'Nhân viên khá'
            }else {
                xepLoai = 'Nhân viên trung bình'
            }
            
            return xepLoai
        }
}