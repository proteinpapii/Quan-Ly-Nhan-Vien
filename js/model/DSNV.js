function DSNV () {
    this.arrNV = []

    // Thêm NV mới
    this.themNV = function (nhanVien) {
        this.arrNV.push(nhanVien)
    }
    
    //Tìm NV qua tài khoản
    this.timNV = function (taiKhoanNV) {
        var index = -1
        //Tìm index của phần tử cần xóa dựa vào thuộc tính tài khoản
        for (var i = 0; i< this.arrNV.length; i++) {
            var tkNV = this.arrNV[i].taiKhoan
            if (tkNV === taiKhoanNV) {
                return i
            }
        } 
        return -1
    }

    //Xóa phần tử timg đc qua thuộc tính tài khoản
    this.xoaNV = function (taiKhoanNV) {
        var index = this.timNV(taiKhoanNV)

        //Xóa phần tử có index tìm được
        if (index !== -1) {
            this.arrNV.splice(index, 1)
        }
    }
    
    this.capNhatNV = function (nhanVien) {
        var index = this.timNV(nhanVien.taiKhoan)
        if (index !== -1) {
            this.arrNV[index] = nhanVien
        }
    }
}