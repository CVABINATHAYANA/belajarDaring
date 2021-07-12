angular.module('app.dataPokokSaranaSekolah', [])

.controller('dataSaranaSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

    var ref = firebase.database().ref("sarana").orderByChild("idSekolah").equalTo($scope.idSekolah);
    var listRef = $firebaseArray(ref);
    $ionicLoading.show();
    listRef.$loaded().then(function (response) {
        $ionicLoading.hide();
        $scope.dataSarana = response;
    })

    var refDataPrasarana = firebase.database().ref("dataPrasarana").orderByChild("idSekolah").equalTo($scope.idSekolah);
    var listRefDataPrasarana = $firebaseArray(refDataPrasarana);
    $ionicLoading.show();
    listRefDataPrasarana.$loaded().then(function (response) {
        $ionicLoading.hide();
        $scope.dataPrasarana = response;
    })

    var refJenisSarana = firebase.database().ref("jenisSarana");
    var listRefJenisSarana = $firebaseArray(refJenisSarana);
    $ionicLoading.show();
    listRefJenisSarana.$loaded().then(function (response) {
        $ionicLoading.hide();
        $scope.jenisSarana = response;
    })

    $scope.tambahSarana = function () {
        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();

            $scope.formData = {
                "idPrasarana": "",
                "idJenisSarana": "",
                "namaSarana": "",
                "jumlah": "",
                "kondisi": "",
                "kelaikan": "",
                "kepemilikan": "",
            }

            $scope.getPrasarana = function () {
                var id = $scope.formData.idPrasarana;
                var prasarana = firebase.database().ref("dataPrasarana/" + id);
                prasarana.on("value", function (snapshot) {
                    $scope.namaPrasarana = snapshot.val().namaPrasarana
                })
            }

            $scope.getJenisSarana = function () {
                var id = $scope.formData.idJenisSarana;
                var sarana = firebase.database().ref("jenisSarana/" + id);
                sarana.on("value", function (snapshot) {
                    $scope.namaJenisSarana = snapshot.val().jenisSarana
                })
            }

            $scope.simpan = function () {
                var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                if ($scope.formData.idPrasarana !== "" && $scope.formData.idJenisSarana !== "" && $scope.formData.namaSarana !== "" && $scope.formData.jumlah !== null && $scope.formData.kondisi !== "" && $scope.formData.kelaikan !== "" && $scope.formData.kepemilikan !== "") {
                    $ionicLoading.show();
                    var ref = firebase.database().ref("sarana");
                    ref.push({
                        "idPrasarana": $scope.formData.idPrasarana,
                        "namaPrasarana": $scope.namaPrasarana,
                        "idJenisSarana": $scope.formData.idJenisSarana,
                        "jenisSarana": $scope.namaJenisSarana,
                        "namaSarana": $scope.formData.namaSarana,
                        "jumlah": $scope.formData.jumlah,
                        "kondisi": $scope.formData.kondisi,
                        "kelaikan": $scope.formData.kelaikan,
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
        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();

            var ref = firebase.database().ref("sarana/" + data.$id);
            $scope.formData = $firebaseObject(ref);

            $scope.getPrasarana = function () {
                var id = $scope.formData.idPrasarana;
                var prasarana = firebase.database().ref("dataPrasarana/" + id);
                prasarana.on("value", function (snapshot) {
                    $scope.namaPrasarana = snapshot.val().namaPrasarana
                })
            }

            $scope.getJenisSarana = function () {
                var id = $scope.formData.idJenisSarana;
                var sarana = firebase.database().ref("jenisSarana/" + id);
                sarana.on("value", function (snapshot) {
                    $scope.namaJenisSarana = snapshot.val().jenisSarana
                })
            }

            $scope.simpan = function () {
                var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                if ($scope.formData.idPrasarana !== "" && $scope.formData.idJenisSarana !== "" && $scope.formData.namaSarana !== "" && $scope.formData.jumlah !== null && $scope.formData.kondisi !== "" && $scope.formData.kelaikan !== "" && $scope.formData.kepemilikan !== "") {
                    $ionicLoading.show();
                    ref.update(JSON.parse(JSON.stringify({
                        "idPrasarana": $scope.formData.idPrasarana,
                        "namaPrasarana": $scope.namaPrasarana,
                        "idJenisSarana": $scope.formData.idJenisSarana,
                        "jenisSarana": $scope.namaJenisSarana,
                        "namaSarana": $scope.formData.namaSarana,
                        "jumlah": $scope.formData.jumlah,
                        "kondisi": $scope.formData.kondisi,
                        "kelaikan": $scope.formData.kelaikan,
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
                    }))).then(function (resp) {
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
        // console.log(data.$id)
        var refObj = firebase.database().ref("sarana/" + data.$id);
        var objDelete = $firebaseObject(refObj);
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
        // if ($scope.hakAkses === "Super Admin") {

        //     var refObj = firebase.database().ref("sarana/" + data.$id);
        //     var objDelete = $firebaseObject(refObj);
        //     var confirmPopup = $ionicPopup.confirm({
        //         title: 'Hapus Data',
        //         template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
        //         okType: "button-balanced",
        //     });
        //     confirmPopup.then(function (res) {
        //         if (res) {
        //             objDelete.$remove().then(function (ref) {
        //                 //console.log('Data Berhasil Dihapus');
        //             });
        //         }
        //         else {
        //             //console.log('Tidak Jadi Menghapus');
        //         }
        //     });

        // }
        // else {
        //     $ionicPopup.alert({
        //         title: 'Perhatian',
        //         template: "Anda Tidak Diperkenankan Menghapus Data Sekolah Ini, Terimakasih",
        //         okType: "button-balanced"
        //     });
        // }
    }

}])

.controller('dataPokokSaranaSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

    var ref = firebase.database().ref("sarana").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupatenSekolah);
    var listRef = $firebaseArray(ref);
    $ionicLoading.show();
    listRef.$loaded().then(function (response) {
        $ionicLoading.hide();
        $scope.dataSarana = response
        $scope.totalSarana = response.length;
        $scope.dataSaranaMuaraEnim = $scope.dataSarana.groupBy('namaKecamatan');
        // console.log($scope.dataPrasaranaMuaraEnim);
    });

    $scope.getDataKecamatan = function (x, y) {
        $state.go("menuSekolah.dataPokokSaranaPerKecamatanSekolah", {
            "namaKecamatan": x,
            "idKecamatan": y[0].idKecamatan
        })
    }

}])

.controller('dataPokokSaranaPerKecamatanSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

    var ref = firebase.database().ref("sarana").orderByChild("idKecamatan").equalTo($scope.data.idKecamatan);
    var listRef = $firebaseArray(ref);
    $ionicLoading.show();
    listRef.$loaded().then(function (response) {
        $ionicLoading.hide();
        $scope.dataSarana = response
        $scope.totalSarana = response.length;
        $scope.dataSaranaMuaraEnim = $scope.dataSarana.groupBy('jenjang');
        // console.log($scope.dataGuruMuaraEnim);
        for (i = 0; i < response.length; i++) {
            var updateData = firebase.database().ref("sarana/" + response[i].$id);
            updateData.update(JSON.parse(JSON.stringify({
                "filterKecamatanJenjang": response[i].idKecamatan + "_" + response[i].jenjang
            }))).then(function (resp) {
                console.log('success');
            })
        }
    });

    $scope.getDataJenjang = function (x, y) {
        $state.go("menuSekolah.dataPokokSaranaPerJenjangSekolah", {
            "namaKecamatan": $scope.data.namaKecamatan,
            "idKecamatan": $scope.data.idKecamatan,
            "jenjang": x
        })
    }

}])

.controller('dataPokokSaranaPerJenjangSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

    var ref = firebase.database().ref("sarana").orderByChild("filterKecamatanJenjang").equalTo($scope.data.idKecamatan + "_" + $scope.data.jenjang);
    var listRef = $firebaseArray(ref);
    $ionicLoading.show();
    listRef.$loaded().then(function (response) {
        $ionicLoading.hide();
        $scope.dataSarana = response
        $scope.totalSarana = response.length;
        $scope.dataSaranaMuaraEnim = $scope.dataSarana.groupBy('namaSekolah');
        // console.log($scope.dataGuruMuaraEnim);
        // console.log(response);
        for (i = 0; i < response.length; i++) {
            var updateData = firebase.database().ref("sarana/" + response[i].$id);
            updateData.update(JSON.parse(JSON.stringify({
                "filterKecamatanJenjangIdSekolah": response[i].idKecamatan + "_" + response[i].jenjang + "_" + response[i].idSekolah
            }))).then(function (resp) {
                console.log('success');
            })
        }
    });

    $scope.getDataSekolah = function (x, y) {
        $state.go("menuSekolah.dataSaranaSekolah", {
            "idSekolah": y[0].idSekolah,
            "namaSekolah": x,
            "idKotaKabupaten": y[0].idKotaKabupaten,
            "idKecamatan": $scope.data.idKecamatan,
            "jenjang": $scope.data.jenjang,
            "namaKecamatan": $scope.data.namaKecamatan,
        })
    }

}])