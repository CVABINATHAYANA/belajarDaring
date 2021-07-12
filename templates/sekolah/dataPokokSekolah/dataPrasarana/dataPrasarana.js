angular.module('app.dataPokokPrasaranaSekolah', [])

.controller('dataPrasaranaSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

    $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
    $scope.idSekolah = localStorage.getItem('idSekolah');
    $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
    $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
    $scope.namaSekolah = localStorage.getItem('namaSekolah');
    $scope.uidSekolah = localStorage.getItem('uidSekolah');
    $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
    $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
    $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
    $scope.namaKecamatanSekolah = localStorage.getItem('namaKecamatanSekolah');

    if (!$scope.idPenggunaSekolah) {
        $state.go('welcome');
    }

    // $scope.data = {
    //     "idSekolah": $stateParams.idSekolah,
    //     "namaSekolah": $stateParams.namaSekolah,
    //     "idKotaKabupaten": $stateParams.idKotaKabupaten,
    //     "idKecamatan": $stateParams.idKecamatan,
    //     "jenjang": $stateParams.jenjang,
    //     "namaKecamatan": $stateParams.namaKecamatan
    // }

    var ref = firebase.database().ref("dataPrasarana").orderByChild("idSekolah").equalTo($scope.idSekolah);
    var listRef = $firebaseArray(ref);
    $ionicLoading.show();
    listRef.$loaded().then(function (response) {
        $ionicLoading.hide();
        $scope.dataPrasarana = response;
    });

    var refJenisPrasarana = firebase.database().ref("jenisPrasarana");
    var listRefJenisPrasarana = $firebaseArray(refJenisPrasarana);
    $ionicLoading.show();
    listRefJenisPrasarana.$loaded().then(function (response) {
        $ionicLoading.hide();
        $scope.jenisPrasarana = response;
    });

    $scope.tambahPrasarana = function () {
        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();

            $scope.formData = {
                "jenisPrasarana": "",
                "namaPrasarana": "",
                "panjang": "",
                "lebar": "",
                "kondisiAtap": "",
                "dinding": "",
                "kusen": "",
                "pondasi": "",
                "lantai": "",
                "kepemilikan": "",
            }

            $scope.simpan = function () {
                var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                if ($scope.formData.jenisPrasarana !== "" && $scope.formData.namaPrasarana !== "" && $scope.formData.panjang !== null && $scope.formData.lebar !== null && $scope.formData.kondisiAtap !== "" && $scope.formData.dinding !== "" && $scope.formData.kusen !== "" && $scope.formData.pondasi !== "" && $scope.formData.lantai !== "" && $scope.formData.kepemilikan !== "") {
                    $ionicLoading.show();
                    var ref = firebase.database().ref("dataPrasarana");
                    ref.push({
                        "jenisPrasarana": $scope.formData.jenisPrasarana,
                        "namaPrasarana": $scope.formData.namaPrasarana,
                        "panjang": $scope.formData.panjang,
                        "lebar": $scope.formData.lebar,
                        "kondisiAtap": $scope.formData.kondisiAtap,
                        "dinding": $scope.formData.dinding,
                        "kusen": $scope.formData.kusen,
                        "pondasi": $scope.formData.pondasi,
                        "lantai": $scope.formData.lantai,
                        "kepemilikan": $scope.formData.kepemilikan,
                        "createAt": createAt,
                        "diBuatOleh": $scope.namaPenggunaSekolah,
                        "idPembuat": $scope.idPenggunaSekolah,
                        "idSekolah": $scope.idSekolah,
                        "idKotaKabupaten": $scope.idKotaKabupatenSekolah,
                        "idKecamatan": $scope.idKecamatanSekolah,
                        "jenjang": $scope.jenjangSekolah,
                        "namaKecamatan": $scope.namaKecamatanSekolah,
                        "namaSekolah": $scope.namaSekolah
                    }).then(function (resp) {
                        $ionicLoading.hide();
                        $scope.modal.hide();
                    })

                }
                else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Maaf, Semua Data Harus Diisi, terima kasih',

                    });
                }
            };

        });

    };

    $scope.editData = function (data) {
        var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
        var ref = firebase.database().ref("dataPrasarana/" + data.$id);
        var refObj = $firebaseObject(ref);
        $ionicLoading.show();
        refObj.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.formData = response;
        });

        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();

            $scope.simpan = function () {
                if ($scope.formData.jenisPrasarana !== "" && $scope.formData.namaPrasarana !== "" && $scope.formData.panjang !== null && $scope.formData.lebar !== null && $scope.formData.kondisiAtap !== "" && $scope.formData.dinding !== "" && $scope.formData.kusen !== "" && $scope.formData.pondasi !== "" && $scope.formData.lantai !== "" && $scope.formData.kepemilikan !== "") {
                    $ionicLoading.show();
                    ref.update({
                        "jenisPrasarana": $scope.formData.jenisPrasarana,
                        "namaPrasarana": $scope.formData.namaPrasarana,
                        "panjang": $scope.formData.panjang,
                        "lebar": $scope.formData.lebar,
                        "kondisiAtap": $scope.formData.kondisiAtap,
                        "dinding": $scope.formData.dinding,
                        "kusen": $scope.formData.kusen,
                        "pondasi": $scope.formData.pondasi,
                        "lantai": $scope.formData.lantai,
                        "kepemilikan": $scope.formData.kepemilikan,
                        "updateAt": createAt,
                        "diEditOleh": $scope.namaPenggunaSekolah,
                        "idPengedit": $scope.idPenggunaSekolah,
                        "idSekolah": $scope.idSekolah,
                        "idKotaKabupaten": $scope.idKotaKabupatenSekolah,
                        "idKecamatan": $scope.idKecamatanSekolah,
                        "jenjang": $scope.jenjangSekolah,
                        "namaKecamatan": $scope.namaKecamatanSekolah,
                        "namaSekolah": $scope.namaSekolah
                    }).then(function (resp) {
                        $ionicLoading.hide();
                        $scope.modal.hide();
                    })

                }
                else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Maaf, Semua Data Harus Diisi, terima kasih',

                    });
                }
            };

        });
    };

    $scope.hapusData = function (data) {
        var refObj = firebase.database().ref("dataPrasarana/" + data.$id);
        var objDelete = $firebaseObject(refObj)
        var confirmPopup = $ionicPopup.confirm({
            title: 'Hapus Data',
            template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
            okType: "button-balanced",
        });
        confirmPopup.then(function (res) {
            if (res) {
                objDelete.$remove().then(function (ref) {
                    //console.log('Data Berhasil Dihapus');
                });
            }
            else {
                //console.log('Tidak Jadi Menghapus');
            }
        });
    };

}])

.controller('dataPokokPrasaranaSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

    $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
    $scope.idSekolah = localStorage.getItem('idSekolah');
    $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
    $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
    $scope.namaSekolah = localStorage.getItem('namaSekolah');
    $scope.uidSekolah = localStorage.getItem('uidSekolah');
    $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
    $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
    $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah')

    if (!$scope.idPenggunaSekolah) {
        $state.go('welcome');
    }

    // $scope.tambahSekolah = function () {
    //     $state.go("menuSekolah.dataSekolahTambahSekolah");
    // }

    Array.prototype.groupBy = function (prop) {
        return this.reduce(function (groups, item) {
            const val = item[prop]
            groups[val] = groups[val] || []
            groups[val].push(item)
            return groups
        }, {})
    }

    var ref = firebase.database().ref("dataPrasarana").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupatenSekolah);
    var listRef = $firebaseArray(ref);
    $ionicLoading.show();
    listRef.$loaded().then(function (response) {
        $ionicLoading.hide();
        $scope.dataPrasarana = response
        $scope.totalPrasarana = response.length;
        $scope.dataPrasaranaMuaraEnim = $scope.dataPrasarana.groupBy('namaKecamatan');
        // console.log($scope.dataPrasaranaMuaraEnim);
    });

    $scope.getDataKecamatan = function (x, y) {
        $state.go("menuSekolah.dataPokokPrasaranaPerKecamatanSekolah", {
            "namaKecamatan": x,
            "idKecamatan": y[0].idKecamatan
        })
    }

}])

.controller('dataPokokPrasaranaPerKecamatanSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

    $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
    $scope.idSekolah = localStorage.getItem('idSekolah');
    $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
    $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
    $scope.namaSekolah = localStorage.getItem('namaSekolah');
    $scope.uidSekolah = localStorage.getItem('uidSekolah');
    $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
    $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
    $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah')

    if (!$scope.idPenggunaSekolah) {
        $state.go('welcome');
    }

    $scope.data = {
        "namaKecamatan": $stateParams.namaKecamatan,
        "idKecamatan": $stateParams.idKecamatan
    }

    Array.prototype.groupBy = function (prop) {
        return this.reduce(function (groups, item) {
            const val = item[prop]
            groups[val] = groups[val] || []
            groups[val].push(item)
            return groups
        }, {})
    }

    var ref = firebase.database().ref("dataPrasarana").orderByChild("idKecamatan").equalTo($scope.data.idKecamatan);
    var listRef = $firebaseArray(ref);
    $ionicLoading.show();
    listRef.$loaded().then(function (response) {
        $ionicLoading.hide();
        $scope.dataPrasarana = response
        $scope.totalPrasarana = response.length;
        $scope.dataPrasaranaMuaraEnim = $scope.dataPrasarana.groupBy('jenjang');
        // console.log($scope.dataGuruMuaraEnim);
        for (i = 0; i < response.length; i++) {
            var updateData = firebase.database().ref("dataPrasarana/" + response[i].$id);
            updateData.update(JSON.parse(JSON.stringify({
                "filterKecamatanJenjang": response[i].idKecamatan + "_" + response[i].jenjang
            }))).then(function (resp) {
                console.log('success');
            })
        }
    });

    $scope.getDataJenjang = function (x, y) {
        $state.go("menuSekolah.dataPokokPrasaranaPerJenjangSekolah", {
            "namaKecamatan": $scope.data.namaKecamatan,
            "idKecamatan": $scope.data.idKecamatan,
            "jenjang": x
        })
    }

}])

.controller('dataPokokPrasaranaPerJenjangSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

    $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
    $scope.idSekolah = localStorage.getItem('idSekolah');
    $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
    $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
    $scope.namaSekolah = localStorage.getItem('namaSekolah');
    $scope.uidSekolah = localStorage.getItem('uidSekolah');
    $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
    $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
    $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah')

    if (!$scope.idPenggunaSekolah) {
        $state.go('welcome');
    }

    $scope.data = {
        "namaKecamatan": $stateParams.namaKecamatan,
        "idKecamatan": $stateParams.idKecamatan,
        "jenjang": $stateParams.jenjang
    }

    Array.prototype.groupBy = function (prop) {
        return this.reduce(function (groups, item) {
            const val = item[prop]
            groups[val] = groups[val] || []
            groups[val].push(item)
            return groups
        }, {})
    }

    var ref = firebase.database().ref("dataPrasarana").orderByChild("filterKecamatanJenjang").equalTo($scope.data.idKecamatan + "_" + $scope.data.jenjang);
    var listRef = $firebaseArray(ref);
    $ionicLoading.show();
    listRef.$loaded().then(function (response) {
        $ionicLoading.hide();
        $scope.dataPrasarana = response
        $scope.totalPrasarana = response.length;
        $scope.dataPrasaranaMuaraEnim = $scope.dataPrasarana.groupBy('namaSekolah');
        // console.log($scope.dataGuruMuaraEnim);
        // console.log(response);
        for (i = 0; i < response.length; i++) {
            var updateData = firebase.database().ref("dataPrasarana/" + response[i].$id);
            updateData.update(JSON.parse(JSON.stringify({
                "filterKecamatanJenjangIdSekolah": response[i].idKecamatan + "_" + response[i].jenjang + "_" + response[i].idSekolah
            }))).then(function (resp) {
                console.log('success');
            })
        }
    });

    $scope.getDataSekolah = function (x, y) {
        $state.go("menuSekolah.dataPrasaranaSekolah", {
            "idSekolah": y[0].idSekolah,
            "namaSekolah": x,
            "idKotaKabupaten": y[0].idKotaKabupaten,
            "idKecamatan": $scope.data.idKecamatan,
            "jenjang": $scope.data.jenjang,
            "namaKecamatan": $scope.data.namaKecamatan,
        })
    }

}])