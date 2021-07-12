angular.module('app.layananKamiSekolah', [])

    .controller('layananKamiSekolahCtrl', ['$scope', '$stateParams', '$ionicActionSheet', '$state', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$ionicModal', function ($scope, $stateParams, $ionicActionSheet, $state, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $ionicModal) {


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

    }])

    .controller('legalisirIjazahSekolahCtrl', ['$scope', '$stateParams', '$ionicActionSheet', '$state', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$ionicModal', "$filter", function ($scope, $stateParams, $ionicActionSheet, $state, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $ionicModal, $filter) {


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

        var ref = firebase.database().ref("webLegalisirIjazah").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.LegalisirIjazah = response;
            //console.log($scope.LegalisirIjazah);
        })

        $scope.buatPengajuan = function () {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.formData = {
                    "namaLengkap": "",
                    "tempatLahir": "",
                    "tanggalLahir": "",
                    "pekerjaan": "",
                    "noKTP": "",
                    "alamat": "",
                    "kotaKabupaten": "",
                    "provinsi": "",
                    "noSeriIjazah": "",
                    "tahunIjazah": "",
                    "noHandphone": ""
                }

                $scope.simpan = function () {
                    var tanggalDisplay = $filter('date')(new Date(), 'dd-MM-yyyy');
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

                    if ($scope.formData.namaLengkap !== "" && $scope.formData.tempatLahir !== "" && $scope.formData.tanggalLahir !== "" && $scope.formData.pekerjaan !== "" && $scope.formData.noKTP !== null && $scope.formData.alamat !== "" && $scope.formData.kotaKabupaten !== "" && $scope.formData.provinsi !== "" && $scope.formData.noSeriIjazah !== null && $scope.formData.tahunIjazah !== null && $scope.formData.noHandphone !== "") {

                        $ionicLoading.show();
                        var entry = firebase.database().ref("webLegalisirIjazah");
                        entry.push({
                            "namaLengkap": $scope.formData.namaLengkap,
                            "tempatLahir": $scope.formData.tempatLahir,
                            "tanggalLahir": $scope.formData.tanggalLahir,
                            "pekerjaan": $scope.formData.pekerjaan,
                            "noKTP": $scope.formData.noKTP,
                            "alamat": $scope.formData.alamat,
                            "kotaKabupaten": $scope.formData.kotaKabupaten,
                            "provinsi": $scope.formData.provinsi,
                            "noSeriIjazah": $scope.formData.noSeriIjazah,
                            "tahunIjazah": $scope.formData.tahunIjazah,
                            "noHandphone": $scope.formData.noHandphone,
                            "tanggalDisplay": tanggalDisplay,
                            "createAt": createAt,
                            "idSekolah": $scope.idSekolah,
                            "statusPengajuan": "Menunggu Persetujuan"
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide()
                        })

                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf Seluruh Data Harus Diisi',
                            okType: 'button-royal'
                        });
                    }
                };

            });
        };

        $scope.dataLegalisir = function (data) {
            $ionicActionSheet.show({
                titleText: data.namaLengkap,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Data' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Lihat Data' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $ionicModal.fromTemplateUrl('templates/modalEdit.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            $scope.formData = data;

                            $scope.simpan = function () {
                                var tanggalDisplay = $filter('date')(new Date(), 'dd-MM-yyyy');
                                var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

                                if ($scope.formData.namaLengkap !== "" && $scope.formData.tempatLahir !== "" && $scope.formData.tanggalLahir !== "" && $scope.formData.pekerjaan !== "" && $scope.formData.noKTP !== null && $scope.formData.alamat !== "" && $scope.formData.kotaKabupaten !== "" && $scope.formData.provinsi !== "" && $scope.formData.noSeriIjazah !== null && $scope.formData.tahunIjazah !== null && $scope.formData.noHandphone !== "") {

                                    $ionicLoading.show();
                                    var entry = firebase.database().ref("webLegalisirIjazah/" + data.$id);
                                    entry.update(JSON.parse(JSON.stringify({
                                        "namaLengkap": $scope.formData.namaLengkap,
                                        "tempatLahir": $scope.formData.tempatLahir,
                                        "tanggalLahir": $scope.formData.tanggalLahir,
                                        "pekerjaan": $scope.formData.pekerjaan,
                                        "noKTP": $scope.formData.noKTP,
                                        "alamat": $scope.formData.alamat,
                                        "kotaKabupaten": $scope.formData.kotaKabupaten,
                                        "provinsi": $scope.formData.provinsi,
                                        "noSeriIjazah": $scope.formData.noSeriIjazah,
                                        "tahunIjazah": $scope.formData.tahunIjazah,
                                        "noHandphone": $scope.formData.noHandphone,
                                        "updateAt": createAt,
                                        "idSekolah": $scope.idSekolah,
                                    }))).then(function (resp) {
                                        $ionicLoading.hide();
                                        $scope.modal.hide()
                                    })

                                }
                                else {
                                    $ionicPopup.alert({
                                        title: 'Perhatian',
                                        template: 'Maaf Seluruh Data Harus Diisi',
                                        okType: 'button-royal'
                                    });
                                }
                            };

                        });
                    }
                    if (index === 1) {
                        $ionicModal.fromTemplateUrl('templates/modalLihat.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            var obj = firebase.database().ref("webLegalisirIjazah/" + data.$id);
                            var dataObj = $firebaseObject(obj);

                            dataObj.$loaded().then(function (response) {
                                $scope.dataObj = response;
                                //console.log($scope.dataObj);
                            })

                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {

                    var refObj = firebase.database().ref("webLegalisirIjazah/" + data.$id);
                    var objDelete = $firebaseObject(refObj);
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
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

    .controller('mutasiSiswaSekolahCtrl', ['$scope', '$stateParams', '$ionicActionSheet', '$state', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$ionicModal', '$filter', function ($scope, $stateParams, $ionicActionSheet, $state, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $ionicModal, $filter) {


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

        var ref = firebase.database().ref("webMutasiSiswa").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.LegalisirIjazah = response;
            //console.log($scope.LegalisirIjazah);
        })

        $scope.buatPengajuan = function () {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.formData = {
                    "nisn": "",
                    "namaSiswa": "",
                    "nomorIndukSiswa": "",
                    "jenisKelamin": "",
                    "agama": "",
                    "tempatLahir": "",
                    "tanggalLahir": "",
                    "namaOrtu": "",
                    "pekerjaanOrtu": "",
                    "alamat": "",
                    "asalSekolah": "",
                    "pindahKeSekolah": "",
                    "tanggalPindah": "",
                    "alasanPindah": "",
                    "noHandphone": ""
                }

                $scope.simpan = function () {
                    var tanggalDisplay = $filter('date')(new Date(), 'dd-MM-yyyy');
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

                    if ($scope.formData.nisn !== "" && $scope.formData.namaSiswa !== "" && $scope.formData.nomorIndukSiswa !== "" && $scope.formData.jenisKelamin !== "" && $scope.formData.agama !== "" && $scope.formData.tempatLahir !== "" && $scope.formData.tanggalLahir !== "" && $scope.formData.namaOrtu !== "" && $scope.formData.pekerjaanOrtu !== "" && $scope.formData.alamat !== "" && $scope.formData.asalSekolah !== "" && $scope.formData.pindahKeSekolah !== "" && $scope.formData.tanggalPindah !== "" && $scope.formData.alasanPindah !== "" && $scope.formData.noHandphone !== "") {

                        $ionicLoading.show();
                        var entry = firebase.database().ref("webMutasiSiswa");
                        entry.push({
                            "nisn": $scope.formData.nisn,
                            "namaSiswa": $scope.formData.namaSiswa,
                            "nomorIndukSiswa": $scope.formData.nomorIndukSiswa,
                            "jenisKelamin": $scope.formData.jenisKelamin,
                            "agama": $scope.formData.agama,
                            "tempatLahir": $scope.formData.tempatLahir,
                            "tanggalLahir": $scope.formData.tanggalLahir,
                            "namaOrtu": $scope.formData.namaOrtu,
                            "pekerjaanOrtu": $scope.formData.pekerjaanOrtu,
                            "alamat": $scope.formData.alamat,
                            "asalSekolah": $scope.formData.asalSekolah,
                            "pindahKeSekolah": $scope.formData.pindahKeSekolah,
                            "tanggalPindah": $scope.formData.tanggalPindah,
                            "alasanPindah": $scope.formData.alasanPindah,
                            "noHandphone": $scope.formData.noHandphone,
                            "tanggalDisplay": tanggalDisplay,
                            "createAt": createAt,
                            "idSekolah": $scope.idSekolah,
                            "statusPengajuan": "Menunggu Persetujuan"
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide()
                        })

                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf Seluruh Data Harus Diisi',
                            okType: 'button-positive'
                        });
                    }
                };

            });
        };

        $scope.dataMutasi = function (data) {
            $ionicActionSheet.show({
                titleText: data.namaSiswa,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Data' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Lihat Data' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $ionicModal.fromTemplateUrl('templates/modalEdit.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            $scope.formData = data;

                            $scope.simpan = function () {
                                var tanggalDisplay = $filter('date')(new Date(), 'dd-MM-yyyy');
                                var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

                                if ($scope.formData.nisn !== "" && $scope.formData.namaSiswa !== "" && $scope.formData.nomorIndukSiswa !== "" && $scope.formData.jenisKelamin !== "" && $scope.formData.agama !== "" && $scope.formData.tempatLahir !== "" && $scope.formData.tanggalLahir !== "" && $scope.formData.namaOrtu !== "" && $scope.formData.pekerjaanOrtu !== "" && $scope.formData.alamat !== "" && $scope.formData.asalSekolah !== "" && $scope.formData.pindahKeSekolah !== "" && $scope.formData.tanggalPindah !== "" && $scope.formData.alasanPindah !== "" && $scope.formData.noHandphone !== "") {

                                    $ionicLoading.show();
                                    var entry = firebase.database().ref("webMutasiSiswa/" + data.$id);
                                    entry.update(JSON.parse(JSON.stringify({
                                        "nisn": $scope.formData.nisn,
                                        "namaSiswa": $scope.formData.namaSiswa,
                                        "nomorIndukSiswa": $scope.formData.nomorIndukSiswa,
                                        "jenisKelamin": $scope.formData.jenisKelamin,
                                        "agama": $scope.formData.agama,
                                        "tempatLahir": $scope.formData.tempatLahir,
                                        "tanggalLahir": $scope.formData.tanggalLahir,
                                        "namaOrtu": $scope.formData.namaOrtu,
                                        "pekerjaanOrtu": $scope.formData.pekerjaanOrtu,
                                        "alamat": $scope.formData.alamat,
                                        "asalSekolah": $scope.formData.asalSekolah,
                                        "pindahKeSekolah": $scope.formData.pindahKeSekolah,
                                        "tanggalPindah": $scope.formData.tanggalPindah,
                                        "alasanPindah": $scope.formData.alasanPindah,
                                        "noHandphone": $scope.formData.noHandphone,
                                        "updateAt": createAt,
                                        "idSekolah": $scope.idSekolah,
                                    }))).then(function (resp) {
                                        $ionicLoading.hide();
                                        $scope.modal.hide()
                                    })
                                }
                                else {
                                    $ionicPopup.alert({
                                        title: 'Perhatian',
                                        template: 'Maaf Seluruh Data Harus Diisi',
                                        okType: 'button-positive'
                                    });
                                }
                            };

                        });
                    }
                    if (index === 1) {
                        $ionicModal.fromTemplateUrl('templates/modalLihat.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            var obj = firebase.database().ref("webMutasiSiswa/" + data.$id);
                            var dataObj = $firebaseObject(obj);

                            dataObj.$loaded().then(function (response) {
                                $scope.dataObj = response;
                                console.log($scope.dataObj);
                            })

                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {

                    var refObj = firebase.database().ref("webMutasiSiswa/" + data.$id);
                    var objDelete = $firebaseObject(refObj);
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
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

    .controller('pengaduanSekolahCtrl', ['$scope', '$stateParams', '$ionicActionSheet', '$state', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$ionicModal', '$filter', function ($scope, $stateParams, $ionicActionSheet, $state, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $ionicModal, $filter) {


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

        var ref = firebase.database().ref("webPengaduan").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPengaduan = response;
            //console.log($scope.LegalisirIjazah);
        })

        $scope.buatPengaduan = function () {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.formData = {
                    "namaLengkap": "",
                    "noHandphone": "",
                    "isiPengaduan": ""
                }

                $scope.simpan = function () {
                    var tanggalDisplay = $filter('date')(new Date(), 'dd-MM-yyyy');
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

                    if ($scope.formData.namaLengkap !== "" && $scope.formData.isiPengaduan !== "" && $scope.formData.noHandphone !== "") {

                        $ionicLoading.show();
                        var entry = firebase.database().ref("webPengaduan");
                        entry.push({
                            "namaLengkap": $scope.formData.namaLengkap,
                            "noHandphone": $scope.formData.noHandphone,
                            "isiPengaduan": $scope.formData.isiPengaduan,
                            "tanggalDisplay": tanggalDisplay,
                            "createAt": createAt,
                            "idSekolah": $scope.idSekolah,
                            "statusPengaduan": "Sedang Ditinjau"
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide()
                        })

                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf Seluruh Data Harus Diisi',
                            okType: 'button-positive'
                        });
                    }
                };

            });
        };

        $scope.pengaduanData = function (data) {
            $ionicActionSheet.show({
                titleText: data.namaLengkap,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Data' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Lihat Data' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $ionicModal.fromTemplateUrl('templates/modalEdit.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            $scope.formData = data;

                            $scope.simpan = function () {
                                var tanggalDisplay = $filter('date')(new Date(), 'dd-MM-yyyy');
                                var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

                                if ($scope.formData.namaLengkap !== "" && $scope.formData.isiPengaduan !== "" && $scope.formData.noHandphone !== "") {

                                    $ionicLoading.show();
                                    var entry = firebase.database().ref("webPengaduan/" + data.$id);
                                    entry.update(JSON.parse(JSON.stringify({
                                        "namaLengkap": $scope.formData.namaLengkap,
                                        "noHandphone": $scope.formData.noHandphone,
                                        "isiPengaduan": $scope.formData.isiPengaduan,
                                        "tanggalDisplay": tanggalDisplay,
                                        "updateAt": createAt,
                                        "idSekolah": $scope.idSekolah,
                                    }))).then(function (resp) {
                                        $ionicLoading.hide();
                                        $scope.modal.hide()
                                    })

                                }
                                else {
                                    $ionicPopup.alert({
                                        title: 'Perhatian',
                                        template: 'Maaf Seluruh Data Harus Diisi',
                                        okType: 'button-positive'
                                    });
                                }
                            };

                        });
                    }
                    if (index === 1) {
                        $ionicModal.fromTemplateUrl('templates/modalLihat.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            var obj = firebase.database().ref("webPengaduan/" + data.$id);
                            var dataObj = $firebaseObject(obj);

                            dataObj.$loaded().then(function (response) {
                                $scope.dataObj = response;
                            })
                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {

                    var refObj = firebase.database().ref("webPengaduan/" + data.$id);
                    var objDelete = $firebaseObject(refObj);
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
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

    .controller('pengajuanIjinOperationalSekolahCtrl', ['$scope', '$stateParams', '$ionicActionSheet', '$state', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$ionicModal', '$filter', function ($scope, $stateParams, $ionicActionSheet, $state, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $ionicModal, $filter) {


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

        var ref = firebase.database().ref("webPengajuanIjinOperationalSekolah").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataIjin = response;
            //console.log($scope.LegalisirIjazah);
        })

        $scope.buatPengajuan = function () {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.formData = {
                    "namaSekolah": "",
                    "tahunBerdiri": "",
                    "nss": "",
                    "npsn": "",
                    "statusSekolah": "",
                    "alamatSekolah": "",
                    "desaKelurahan": "",
                    "kecamatan": "",
                    "kotaKabupaten": "",
                    "provinsi": "",
                    "noHandphone": ""
                }

                $scope.simpan = function () {
                    var tanggalDisplay = $filter('date')(new Date(), 'dd-MM-yyyy');
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

                    if ($scope.formData.namaSekolah !== "" && $scope.formData.tahunBerdiri !== null && $scope.formData.noHandphone !== "" && $scope.formData.nss !== null && $scope.formData.npsn !== null && $scope.formData.statusSekolah !== "" && $scope.formData.alamatSekolah !== "" && $scope.formData.desaKelurahan !== "" && $scope.formData.kotaKabupaten !== "" && $scope.formData.kecamatan !== "" && $scope.formData.provinsi !== "") {

                        $ionicLoading.show();
                        var entry = firebase.database().ref("webPengajuanIjinOperationalSekolah");
                        entry.push({
                            "namaSekolah": $scope.formData.namaSekolah,
                            "tahunBerdiri": $scope.formData.tahunBerdiri,
                            "nss": $scope.formData.nss,
                            "npsn": $scope.formData.npsn,
                            "statusSekolah": $scope.formData.statusSekolah,
                            "alamatSekolah": $scope.formData.alamatSekolah,
                            "desaKelurahan": $scope.formData.desaKelurahan,
                            "kecamatan": $scope.formData.kecamatan,
                            "kotaKabupaten": $scope.formData.kotaKabupaten,
                            "provinsi": $scope.formData.provinsi,
                            "noHandphone": $scope.formData.noHandphone,
                            "tanggalDisplay": tanggalDisplay,
                            "createAt": createAt,
                            "idSekolah": $scope.idSekolah,
                            "statusPengajuan": "Menunggu Persetujuan"
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide()
                        })

                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf Seluruh Data Harus Diisi',
                            okType: 'button-positive'
                        });
                    }
                };

            });
        };

        $scope.ijin = function (data) {
            $ionicActionSheet.show({
                titleText: data.namaSekolah,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Data' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Lihat Data' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $ionicModal.fromTemplateUrl('templates/modalEdit.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            $scope.formData = data;

                            $scope.simpan = function () {
                                var tanggalDisplay = $filter('date')(new Date(), 'dd-MM-yyyy');
                                var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

                                if ($scope.formData.namaSekolah !== "" && $scope.formData.tahunBerdiri !== null && $scope.formData.noHandphone !== "" && $scope.formData.nss !== null && $scope.formData.npsn !== null && $scope.formData.statusSekolah !== "" && $scope.formData.alamatSekolah !== "" && $scope.formData.desaKelurahan !== "" && $scope.formData.kotaKabupaten !== "" && $scope.formData.kecamatan !== "" && $scope.formData.provinsi !== "") {

                                    $ionicLoading.show();
                                    var entry = firebase.database().ref("webPengajuanIjinOperationalSekolah");
                                    entry.update(JSON.parse(JSON.stringify({
                                        "namaSekolah": $scope.formData.namaSekolah,
                                        "tahunBerdiri": $scope.formData.tahunBerdiri,
                                        "nss": $scope.formData.nss,
                                        "npsn": $scope.formData.npsn,
                                        "statusSekolah": $scope.formData.statusSekolah,
                                        "alamatSekolah": $scope.formData.alamatSekolah,
                                        "desaKelurahan": $scope.formData.desaKelurahan,
                                        "kecamatan": $scope.formData.kecamatan,
                                        "kotaKabupaten": $scope.formData.kotaKabupaten,
                                        "provinsi": $scope.formData.provinsi,
                                        "noHandphone": $scope.formData.noHandphone,
                                        "tanggalDisplay": tanggalDisplay,
                                        "updateAt": createAt,
                                        "idSekolah": $scope.idSekolah,
                                    }))).then(function (resp) {
                                        $ionicLoading.hide();
                                        $scope.modal.hide()
                                    })

                                }
                                else {
                                    $ionicPopup.alert({
                                        title: 'Perhatian',
                                        template: 'Maaf Seluruh Data Harus Diisi',
                                        okType: 'button-positive'
                                    });
                                }
                            };

                        });
                    }
                    if (index === 1) {
                        $ionicModal.fromTemplateUrl('templates/modalLihat.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            var obj = firebase.database().ref("webPengajuanIjinOperationalSekolah/" + data.$id);
                            var dataObj = $firebaseObject(obj);

                            dataObj.$loaded().then(function (response) {
                                $scope.dataObj = response;
                                console.log($scope.dataObj);
                            })

                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {

                    var refObj = firebase.database().ref("webPengajuanIjinOperationalSekolah/" + data.$id);
                    var objDelete = $firebaseObject(refObj);
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
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

    .controller('pengajuanNPSNSekolahCtrl', ['$scope', '$stateParams', '$ionicActionSheet', '$state', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$ionicModal', '$filter', function ($scope, $stateParams, $ionicActionSheet, $state, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $ionicModal, $filter) {


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

        var ref = firebase.database().ref("webNPSN").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataNPSN = response;
            //console.log($scope.LegalisirIjazah);
        })

        $scope.buatPengajuan = function () {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.formData = {
                    "namaKepalaSekolah": "",
                    "namaSekolah": "",
                    "jenjang": "",
                    "statusSekolah": "",
                    "alamatSekolah": "",
                    "desaKelurahan": "",
                    "kecamatan": "",
                    "kotaKabupaten": "",
                    "provinsi": "",
                    "noHandphone": "",
                    "emailSekolah": "",
                    "noSKPendirian": "",
                    "tanggalSKPendirian": "",
                    "noSKOperational": "",
                    "tanggalSKOperational": ""
                }

                $scope.simpan = function () {
                    var tanggalDisplay = $filter('date')(new Date(), 'dd-MM-yyyy');
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

                    if ($scope.formData.namaKepalaSekolah !== "" && $scope.formData.namaSekolah !== "" && $scope.formData.jenjang !== "" && $scope.formData.statusSekolah !== "" && $scope.formData.alamatSekolah !== "" && $scope.formData.alamatSekolah !== "" && $scope.formData.desaKelurahan !== "" && $scope.formData.kotaKabupaten !== "" && $scope.formData.kecamatan !== "" && $scope.formData.provinsi !== "" && $scope.formData.noHandphone !== "" && $scope.formData.emailSekolah !== "" && $scope.formData.noSKPendirian !== "" && $scope.formData.tanggalSKPendirian !== "" && $scope.formData.noSKOperational !== "" && $scope.formData.tanggalSKOperational !== "") {

                        $ionicLoading.show();
                        var entry = firebase.database().ref("webNPSN");
                        entry.push({
                            "namaKepalaSekolah": $scope.formData.namaKepalaSekolah,
                            "namaSekolah": $scope.formData.namaSekolah,
                            "jenjang": $scope.formData.jenjang,
                            "statusSekolah": $scope.formData.statusSekolah,
                            "alamatSekolah": $scope.formData.alamatSekolah,
                            "desaKelurahan": $scope.formData.desaKelurahan,
                            "kecamatan": $scope.formData.kecamatan,
                            "kotaKabupaten": $scope.formData.kotaKabupaten,
                            "provinsi": $scope.formData.provinsi,
                            "noHandphone": $scope.formData.noHandphone,
                            "emailSekolah": $scope.formData.emailSekolah,
                            "noSKPendirian": $scope.formData.noSKPendirian,
                            "tanggalSKPendirian": $scope.formData.tanggalSKPendirian,
                            "noSKOperational": $scope.formData.noSKOperational,
                            "tanggalSKOperational": $scope.formData.tanggalSKOperational,
                            "tanggalDisplay": tanggalDisplay,
                            "createAt": createAt,
                            "idSekolah": $scope.idSekolah,
                            "statusPengajuan": "Menunggu Persetujuan"
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide()
                        })

                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf Seluruh Data Harus Diisi',
                            okType: 'button-positive'
                        });
                    }
                };

            });
        };

        $scope.NPSN = function (data) {
            $ionicActionSheet.show({
                titleText: data.namaSekolah,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Data' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Lihat Data' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $ionicModal.fromTemplateUrl('templates/modalEdit.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            $scope.formData = data;

                            $scope.simpan = function () {
                                var tanggalDisplay = $filter('date')(new Date(), 'dd-MM-yyyy');
                                var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
            
                                if ($scope.formData.namaKepalaSekolah !== "" && $scope.formData.namaSekolah !== "" && $scope.formData.jenjang !== "" && $scope.formData.statusSekolah !== "" && $scope.formData.alamatSekolah !== "" && $scope.formData.alamatSekolah !== "" && $scope.formData.desaKelurahan !== "" && $scope.formData.kotaKabupaten !== "" && $scope.formData.kecamatan !== "" && $scope.formData.provinsi !== "" && $scope.formData.noHandphone !== "" && $scope.formData.emailSekolah !== "" && $scope.formData.noSKPendirian !== "" && $scope.formData.tanggalSKPendirian !== "" && $scope.formData.noSKOperational !== "" && $scope.formData.tanggalSKOperational !== "") {
            
                                    $ionicLoading.show();
                                    var entry = firebase.database().ref("webNPSN/"+data.$id);
                                    entry.update(JSON.parse(JSON.stringify({
                                        "namaKepalaSekolah": $scope.formData.namaKepalaSekolah,
                                        "namaSekolah": $scope.formData.namaSekolah,
                                        "jenjang": $scope.formData.jenjang,
                                        "statusSekolah": $scope.formData.statusSekolah,
                                        "alamatSekolah": $scope.formData.alamatSekolah,
                                        "desaKelurahan": $scope.formData.desaKelurahan,
                                        "kecamatan": $scope.formData.kecamatan,
                                        "kotaKabupaten": $scope.formData.kotaKabupaten,
                                        "provinsi": $scope.formData.provinsi,
                                        "noHandphone": $scope.formData.noHandphone,
                                        "emailSekolah": $scope.formData.emailSekolah,
                                        "noSKPendirian": $scope.formData.noSKPendirian,
                                        "tanggalSKPendirian": $scope.formData.tanggalSKPendirian,
                                        "noSKOperational": $scope.formData.noSKOperational,
                                        "tanggalSKOperational": $scope.formData.tanggalSKOperational,
                                        "tanggalDisplay": tanggalDisplay,
                                        "updateAt": createAt,
                                        "idSekolah": $scope.idSekolah,
                                    }))).then(function (resp) {
                                        $ionicLoading.hide();
                                        $scope.modal.hide()
                                    })
            
                                }
                                else {
                                    $ionicPopup.alert({
                                        title: 'Perhatian',
                                        template: 'Maaf Seluruh Data Harus Diisi',
                                        okType: 'button-positive'
                                    });
                                }
                            };
            

                        });
                    }
                    if (index === 1) {
                        $ionicModal.fromTemplateUrl('templates/modalLihat.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            var obj = firebase.database().ref("webNPSN/" + data.$id);
                            var dataObj = $firebaseObject(obj);

                            dataObj.$loaded().then(function (response) {
                                $scope.dataObj = response;
                                //console.log($scope.dataObj);
                            })
                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {

                    var refObj = firebase.database().ref("webNPSN/" + data.$id);
                    var objDelete = $firebaseObject(refObj);
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
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

    .controller('permintaanDataPublikSekolahCtrl', ['$scope', '$stateParams', '$ionicActionSheet', '$state', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$ionicModal', function ($scope, $stateParams, $ionicActionSheet, $state, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $ionicModal) {


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

    }])

    .controller('rekomendasiBeasiswaSekolahCtrl', ['$scope', '$stateParams', '$ionicActionSheet', '$state', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$ionicModal', function ($scope, $stateParams, $ionicActionSheet, $state, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $ionicModal) {


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

    }])

    .controller('izinCutiPegawaiSekolahCtrl', ['$scope', '$stateParams', '$ionicActionSheet', '$state', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$ionicModal', function ($scope, $stateParams, $ionicActionSheet, $state, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $ionicModal) {


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

    }])

    .controller('karisSekolahCtrl', ['$scope', '$stateParams', '$ionicActionSheet', '$state', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$ionicModal', function ($scope, $stateParams, $ionicActionSheet, $state, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $ionicModal) {


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

    }])

    .controller('suratRekomendasiSekolahCtrl', ['$scope', '$stateParams', '$ionicActionSheet', '$state', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$ionicModal', function ($scope, $stateParams, $ionicActionSheet, $state, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $ionicModal) {


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

    }])

    .controller('usulanSertifikasiGuruSekolahCtrl', ['$scope', '$stateParams', '$ionicActionSheet', '$state', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$ionicModal', function ($scope, $stateParams, $ionicActionSheet, $state, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $ionicModal) {


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
    }])
