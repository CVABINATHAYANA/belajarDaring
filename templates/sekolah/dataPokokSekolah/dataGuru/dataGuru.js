angular.module('app.dataPokokGuruSekolah', [])

.controller('dataGuruSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

    // $scope.data = {
    //     "idSekolah": $stateParams.idSekolah,
    //     "namaSekolah": $stateParams.namaSekolah,
    //     "idKotaKabupaten": $stateParams.idKotaKabupaten,
    //     "idKecamatan": $stateParams.idKecamatan,
    //     "jenjang": $stateParams.jenjang
    // }

    $scope.tambahData = function () {
        $state.go('menuSekolah.dataGuruTambahSekolah', {
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "idKotaKabupaten": $stateParams.idKotaKabupaten,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang
        })
    }

    var ref = firebase.database(appGuru).ref("dataGuru").orderByChild("idSekolah").equalTo($scope.idSekolah);
    listRef = $firebaseArray(ref);
    $ionicLoading.show();
    listRef.$loaded().then(function (response) {
        $ionicLoading.hide();
        $scope.dataGuru = response;
        // console.log(response)
    })

    $scope.getData = function (data) {
        // console.log(data);
        $ionicActionSheet.show({
            titleText: 'Guru : ' + data.namaPengguna,
            buttons: [
                { text: '<i class="icon ion-checkmark-circled"></i> Edit Data' },
                { text: '<i class="icon ion-checkmark-circled"></i> Verifikasi' },
                { text: '<i class="icon ion-checkmark-circled"></i> Batal Verifikasi' },
            ],
            destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
            cancelText: 'Cancel',
            cancel: function () {
                //console.log('CANCELLED');
            },
            buttonClicked: function (index) {
                if (index === 0) {
                    $state.go('menuSekolah.dataGuruEditSekolah', {
                        "idGuru": data.$id,
                        "namaPengguna": data.namaPengguna,
                        "idSekolah": $stateParams.idSekolah,
                        "namaSekolah": $stateParams.namaSekolah,
                        "idKotaKabupaten": $stateParams.idKotaKabupaten,
                        "idKecamatan": $stateParams.idKecamatan,
                        "jenjang": $stateParams.jenjang
                    });
                }
                if (index === 1) {
                    var updateData = firebase.database(appGuru).ref("dataGuru/" + data.$id).update(JSON.parse(JSON.stringify({
                        "aksesAplikasi": true,
                        "ijinPenggunaanAplikasi": true
                    })))
                }
                if (index === 2) {
                    var updateData = firebase.database(appGuru).ref("dataGuru/" + data.$id).update(JSON.parse(JSON.stringify({
                        "aksesAplikasi": false,
                        "ijinPenggunaanAplikasi": false
                    })))
                }
                return true;
            },

            destructiveButtonClicked: function () {
                // $ionicPopup.alert({
                //     title: 'Perhatian',
                //     template: 'Maaf, Anda tidak diperkenankan menghapus data ini. Terimakasih',
                // });
                var refObj = firebase.database(appGuru).ref("dataGuru/" + data.$id);
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

                return true;
            }

        });
    }

}])

.controller('dataGuruTambahSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

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

    // $scope.data = {
    //     "idSekolah": $stateParams.idSekolah,
    //     "namaSekolah": $stateParams.namaSekolah,
    //     "idKotaKabupaten": $stateParams.idKotaKabupaten,
    //     "idKecamatan": $stateParams.idKecamatan,
    //     "jenjang": $stateParams.jenjang
    // }

    $scope.formData = {
        "idProvinsi": '',
        "idKotaKabupaten": '',
        "idKecamatan": '',
        "jenjang": '',
        "idSekolah": '',
        "namaPengguna": '',
        "noHandphone": '',
        "jenisKelamin": '',
        "alamat": '',
        "email": '',
        "password": '',
        "ketikUlangPassword": '',
        "time": new Date(),
        "ijinPenggunaanAplikasi": true
    };

    //Data Provinsi
    var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiSekolah);
    var listProvinsi = $firebaseArray(refProvinsi);

    listProvinsi.$loaded().then(function (response) {
        $scope.dataProvinsi = response;
    });

    $scope.getIdProvinsi = function () {
        var idProvinsi = $scope.formData.idProvinsi;

        //Get Nama Provinsi
        var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
        var listNamaProvinsi = $firebaseArray(namaProvinsi);
        listNamaProvinsi.$loaded().then(function (response) {
            $scope.namaProvinsi = response[0].nama_provinsi;
            //console.log($scope.namaProvinsi);
        });

        var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenSekolah);
        $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
    };

    $scope.getIdKotaKabupaten = function () {
        var idKotaKabupaten = $scope.formData.idKotaKabupaten;

        //Get Nama Kota Kabupaten
        var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
        var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
        listNamaKotaKabupaten.$loaded().then(function (response) {
            $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
            console.log($scope.namaKotaKabupaten);
        });

        var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanSekolah);
        $scope.dataKecamatan = $firebaseArray(refKecamatan);
        //console.log($scope.dataKecamatan);
    };

    $scope.getIdKecamatan = function () {
        var idKecamatan = $scope.formData.idKecamatan;
        $scope.idKecamatan = $scope.formData.idKecamatan;

        //Get Nama Kecamatan
        var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo(idKecamatan);
        var listNamaKecamatan = $firebaseArray(namaKecamatan);
        listNamaKecamatan.$loaded().then(function (response) {
            $scope.namaKecamatan = response[0].nama_kecamatan;
            //console.log($scope.namaKecamatan);
        });

        $ionicLoading.show()
        var refKecamatan = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo(idKecamatan);
        var listKecamatan = $firebaseArray(refKecamatan);

        listKecamatan.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSekolah = response;
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database().ref("dataSekolahIndonesia/" + response[i].$id);
                updateData.update({
                    "filter": response[i].id_kecamatan + "_" + response[i].jenjang
                }).then(function (resp) {
                    $ionicLoading.hide();
                })
            }

        })
    }

    $scope.getJenjang = function () {
        var jenjang = $scope.formData.jenjang;

        var refJenjang = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.idKecamatan + "_" + jenjang);
        var listJenjang = $firebaseArray(refJenjang);

        $ionicLoading.show();
        listJenjang.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSekolah = response;

        })
    };

    $scope.getIdSekolah = function () {
        // var idSekolah = $scope.formData.idSekolah;

        // var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
        // refDataSekolah.on("value", function (snapshot) {
        //     $scope.namaSekolah = snapshot.val().nama_sekolah;
        // })
        var idSekolah = $scope.formData.idSekolah;
        if (idSekolah === $scope.idSekolah) {
            var refSchool = firebase.database().ref("dataSekolahIndonesia/" + $scope.formData.idSekolah);
            refSchool.on("value", function (snapshot) {
                $scope.namaSekolah = snapshot.val().nama_sekolah;
            })
        }
        else {
            $scope.formData.idSekolah = "";
            $ionicPopup.alert({
                title: 'Perhatian',
                template: 'Maaf, Anda tidak diperkenankan memilih sekolah lain. Terimakasih',
                okType: 'button-balanced'
            });
        }
    };

    $scope.daftar = function () {
        //console.log($scope.formData);

        var tanggal = $filter('date')($scope.formData.time, 'yyyy-MM-dd HH:mm:ss Z');
        var tanggalDisplay = $filter('date')($scope.formData.time, 'dd-MM-yyyy');
        var jamDisplay = $filter('date')($scope.formData.time, 'HH:mm:ss');

        if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.kelas !== '' && $scope.formData.namaKelas !== '' && $scope.formData.namaPengguna !== '' && $scope.formData.noHandphone !== '' && $scope.formData.jenisKelamin !== '' && $scope.formData.alamat !== '' && $scope.formData.email !== '' && $scope.formData.password !== '' && $scope.formData.ketikUlangPassword !== '') {

            if ($scope.formData.password === $scope.formData.ketikUlangPassword) {
                $ionicLoading.show();

                var auth = $firebaseAuth();
                auth.$createUserWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                    .then(function (response) {

                        var user = firebase.auth().currentUser;

                        //Entry Data Pengguna
                        var refAddPengguna = firebase.database(appGuru).ref("dataGuru");
                        refAddPengguna.push({
                            "idProvinsi": $scope.formData.idProvinsi,
                            "namaProvinsi": $scope.namaProvinsi,
                            "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                            "namaKotaKabupaten": $scope.namaKotaKabupaten,
                            "idKecamatan": $scope.formData.idKecamatan,
                            "namaKecamatan": $scope.namaKecamatan,
                            "jenjang": $scope.formData.jenjang,
                            "idSekolah": $scope.formData.idSekolah,
                            "namaSekolah": $scope.namaSekolah,
                            "alamat": $scope.formData.alamat,
                            "jenisKelamin": $scope.formData.jenisKelamin,

                            "namaPengguna": $scope.formData.namaPengguna,
                            "noHandphone": $scope.formData.noHandphone,
                            "email": $scope.formData.email,
                            "password": $scope.formData.password,
                            "retypePassword": $scope.formData.ketikUlangPassword,
                            "uid": user.uid,
                            "tanggal": tanggal,
                            "tanggalDisplay": tanggalDisplay,
                            "jamDisplay": jamDisplay,
                            "filterRegistrasiKota": $scope.formData.jenjang + "_" + $scope.formData.idKotaKabupaten,
                            "filterRegistrasiProvinsi": $scope.formData.jenjang + "_" + $scope.formData.idProvinsi,
                            "ijinPenggunaanAplikasi": $scope.formData.ijinPenggunaanAplikasi,
                            "createAt": tanggal,
                            "diBuatOleh": $scope.namaPenggunaSekolah,
                            "idPembuat": $scope.idPenggunaSekolah,

                        })
                            .then(function (resp) {
                                $ionicLoading.hide();
                                $state.go("menuSekolah.dataGuruSekolah", {
                                    "idSekolah": $stateParams.idSekolah,
                                    "namaSekolah": $stateParams.namaSekolah,
                                    "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                    "idKecamatan": $stateParams.idKecamatan,
                                    "jenjang": $stateParams.jenjang
                                });

                            });

                    })
                    .catch(function (error) {
                        $ionicLoading.hide();
                        //console.log(error);
                        $ionicPopup.alert({
                            title: 'Information',
                            template: error.message,
                            okType: 'button-balanced'
                        });
                    });

            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Password yang Anda ketikkan tidak sama, harap cek kembali, terima kasih',
                    okType: 'button-balanced'
                });
            }

        }
        else {
            $ionicPopup.alert({
                title: 'Perhatian',
                template: 'Seluruh Data Harus Diisi, Terima Kasih',
                okType: 'button-balanced'
            });
        }
    };

}])

.controller('dataGuruEditSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
        "idGuru": $stateParams.idGuru,
        "namaPengguna": $stateParams.namaPengguna,
        "idSekolah": $stateParams.idSekolah,
        "namaSekolah": $stateParams.namaSekolah,
        "idKotaKabupaten": $stateParams.idKotaKabupaten,
        "idKecamatan": $stateParams.idKecamatan,
        "jenjang": $stateParams.jenjang
    }

    var obj = firebase.database(appGuru).ref("dataGuru/" + $scope.data.idGuru);
    $scope.formData = $firebaseObject(obj);

    obj.on("value", function (snapshot) {
        // console.log(snapshot.val());

        var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenSekolah);
        $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
        // console.log($scope.dataKotaKabupaten);

        var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanSekolah);
        $scope.dataKecamatan = $firebaseArray(refKecamatan);

        var refSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.idKecamatanSekolah + "_" + $scope.jenjangSekolah);
        $scope.dataSekolah = $firebaseArray(refSekolah);
    })

    //Data Provinsi
    var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiSekolah);
    var listProvinsi = $firebaseArray(refProvinsi);

    listProvinsi.$loaded().then(function (response) {
        $scope.dataProvinsi = response;
    });

    $scope.getIdProvinsi = function () {
        var idProvinsi = $scope.formData.idProvinsi;

        //Get Nama Provinsi
        var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
        var listNamaProvinsi = $firebaseArray(namaProvinsi);
        listNamaProvinsi.$loaded().then(function (response) {
            $scope.namaProvinsi = response[0].nama_provinsi;
            //console.log($scope.namaProvinsi);
        });

        var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenSekolah);
        $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
    };

    $scope.getIdKotaKabupaten = function () {
        var idKotaKabupaten = $scope.formData.idKotaKabupaten;

        //Get Nama Kota Kabupaten
        var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
        var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
        listNamaKotaKabupaten.$loaded().then(function (response) {
            $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
            //console.log($scope.namaKotaKabupaten);
        });

        var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanSekolah);
        $scope.dataKecamatan = $firebaseArray(refKecamatan);
        //console.log($scope.dataKecamatan);
    };

    $scope.getIdKecamatan = function () {
        var idKecamatan = $scope.formData.idKecamatan;
        $scope.idKecamatan = $scope.formData.idKecamatan;

        //Get Nama Kecamatan
        var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo(idKecamatan);
        var listNamaKecamatan = $firebaseArray(namaKecamatan);
        listNamaKecamatan.$loaded().then(function (response) {
            $scope.namaKecamatan = response[0].nama_kecamatan;
            //console.log($scope.namaKecamatan);
        });

        $ionicLoading.show()
        var refKecamatan = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo(idKecamatan);
        var listKecamatan = $firebaseArray(refKecamatan);

        listKecamatan.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSekolah = response;
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database().ref("dataSekolahIndonesia/" + response[i].$id);
                updateData.update({
                    "filter": response[i].id_kecamatan + "_" + response[i].jenjang
                }).then(function (resp) {
                    $ionicLoading.hide();
                })
            }

        })
    }

    $scope.getJenjang = function () {
        var jenjang = $scope.formData.jenjang;

        var refJenjang = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.idKecamatan + "_" + jenjang);
        var listJenjang = $firebaseArray(refJenjang);

        $ionicLoading.show();
        listJenjang.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSekolah = response;

        })
    };

    $scope.getIdSekolah = function () {
        // var idSekolah = $scope.formData.idSekolah;

        // var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
        // refDataSekolah.on("value", function (snapshot) {
        //     $scope.namaSekolah = snapshot.val().nama_sekolah;
        // })
        var idSekolah = $scope.formData.idSekolah;
        if (idSekolah === $scope.idSekolah) {
            var refSchool = firebase.database().ref("dataSekolahIndonesia/" + $scope.formData.idSekolah);
            refSchool.on("value", function (snapshot) {
                $scope.namaSekolah = snapshot.val().nama_sekolah;
            })
        }
        else {
            $scope.formData.idSekolah = "";
            $ionicPopup.alert({
                title: 'Perhatian',
                template: 'Maaf, Anda tidak diperkenankan memilih sekolah lain. Terimakasih',
                okType: 'button-balanced'
            });
        }
    };

    $scope.daftar = function () {
        //console.log($scope.formData);
        var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
        if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.namaPengguna !== '' && $scope.formData.noHandphone !== '' && $scope.formData.jenisKelamin !== '' && $scope.formData.alamat !== '') {
            $ionicLoading.show();

            //Entry Data Pengguna
            var updatePengguna = firebase.database(appGuru).ref("dataGuru/" + $scope.data.idGuru);
            updatePengguna.update(JSON.parse(JSON.stringify({
                "idProvinsi": $scope.formData.idProvinsi,
                "namaProvinsi": $scope.namaProvinsi,
                "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                "namaKotaKabupaten": $scope.namaKotaKabupaten,
                "idKecamatan": $scope.formData.idKecamatan,
                "namaKecamatan": $scope.namaKecamatan,
                "jenjang": $scope.formData.jenjang,
                "idSekolah": $scope.formData.idSekolah,
                "namaSekolah": $scope.namaSekolah,
                "alamat": $scope.formData.alamat,
                "jenisKelamin": $scope.formData.jenisKelamin,

                "namaPengguna": $scope.formData.namaPengguna,
                "noHandphone": $scope.formData.noHandphone,
                // "ijinPenggunaanAplikasi": $scope.formData.ijinPenggunaanAplikasi,
                "updateAt": createAt,
                "diEditOleh": $scope.namaPenggunaSekolah,
                "idPengedit": $scope.idPenggunaSekolah,
            }))).then(function (resp) {
                $ionicLoading.hide();
                $state.go("menuSekolah.dataGuruSekolah", {
                    "idSekolah": $stateParams.idSekolah,
                    "namaSekolah": $stateParams.namaSekolah,
                    "idKotaKabupaten": $stateParams.idKotaKabupaten,
                    "idKecamatan": $stateParams.idKecamatan,
                    "jenjang": $stateParams.jenjang
                });
            });

        }
        else {
            $ionicPopup.alert({
                title: 'Perhatian',
                template: 'Seluruh Data Harus Diisi, Terima Kasih',
                okType: 'button-balanced'
            });
        }
    };

}])

.controller('dataPokokGuruSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

    var ref = firebase.database(appGuru).ref("dataGuru").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupatenSekolah);
    var listRef = $firebaseArray(ref);
    $ionicLoading.show();
    listRef.$loaded().then(function (response) {
        $ionicLoading.hide();
        $scope.dataGuru = response
        $scope.totalGuru = response.length;
        $scope.dataGuruMuaraEnim = $scope.dataGuru.groupBy('namaKecamatan');
        // console.log($scope.dataGuruMuaraEnim);
    });

    $scope.getDataKecamatan = function (x, y) {
        $state.go("menuSekolah.dataPokokGuruPerKecamatanSekolah", {
            "namaKecamatan": x,
            "idKecamatan": y[0].idKecamatan
        })
    }

}])

.controller('dataPokokGuruPerKecamatanSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

    var ref = firebase.database(appGuru).ref("dataGuru").orderByChild("idKecamatan").equalTo($scope.data.idKecamatan);
    var listRef = $firebaseArray(ref);
    $ionicLoading.show();
    listRef.$loaded().then(function (response) {
        $ionicLoading.hide();
        $scope.dataGuru = response
        $scope.totalGuru = response.length;
        $scope.dataGuruMuaraEnim = $scope.dataGuru.groupBy('jenjang');
        // console.log($scope.dataGuruMuaraEnim);
        for (i = 0; i < response.length; i++) {
            var updateData = firebase.database(appGuru).ref("dataGuru/" + response[i].$id);
            updateData.update(JSON.parse(JSON.stringify({
                "filterKecamatanJenjang": response[i].idKecamatan + "_" + response[i].jenjang
            }))).then(function (resp) {
                console.log('success');
            })
        }
    });

    $scope.getDataJenjang = function (x, y) {
        $state.go("menuSekolah.dataPokokGuruPerJenjangSekolah", {
            "namaKecamatan": $scope.data.namaKecamatan,
            "idKecamatan": $scope.data.idKecamatan,
            "jenjang": x
        })
    }

}])

.controller('dataPokokGuruPerJenjangSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

    var ref = firebase.database(appGuru).ref("dataGuru").orderByChild("filterKecamatanJenjang").equalTo($scope.data.idKecamatan + "_" + $scope.data.jenjang);
    var listRef = $firebaseArray(ref);
    $ionicLoading.show();
    listRef.$loaded().then(function (response) {
        $ionicLoading.hide();
        $scope.dataGuru = response
        $scope.totalGuru = response.length;
        $scope.dataGuruMuaraEnim = $scope.dataGuru.groupBy('namaSekolah');
        // console.log($scope.dataGuruMuaraEnim);
        // console.log(response);
        for (i = 0; i < response.length; i++) {
            var updateData = firebase.database(appGuru).ref("dataGuru/" + response[i].$id);
            updateData.update(JSON.parse(JSON.stringify({
                "filterKecamatanJenjangIdSekolah": response[i].idKecamatan + "_" + response[i].jenjang + "_" + response[i].idSekolah
            }))).then(function (resp) {
                console.log('success');
            })
        }
    });

    $scope.getDataSekolah = function (x, y) {
        $state.go("menuSekolah.dataGuruSekolah", {
            "idSekolah": y[0].idSekolah,
            "namaSekolah": x,
            "idKotaKabupaten": y[0].idKotaKabupaten,
            "idKecamatan": $scope.data.idKecamatan,
            "jenjang": $scope.data.jenjang,
            "namaKecamatan": $scope.data.namaKecamatan,
        })
    }

}])