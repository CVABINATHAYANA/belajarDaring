angular.module('app.berandaAdmin', [])

    .controller('berandaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        $scope.namaKotaKabupatenAdmin = localStorage.getItem('namaKotaKabupatenAdmin');


        if (!$scope.idAdmin) {
            $state.go('welcome');
        }
        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan
        }

        var akses = firebase.database().ref("adminDinasPendidikan/" + $scope.idAdmin);
        $ionicLoading.show();
        akses.on("value", function (snapshot) {
            $ionicLoading.hide();
            $scope.ijinkanAkses = snapshot.val().ijinkanAkses;
        });

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }
        var ref = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSekolah = response
            $scope.totalSekolah = response.length;
            $scope.dataSekolahMuaraEnim = $scope.dataSekolah.groupBy('nama_kecamatan');
        });


        $scope.getDataKecamatan = function (x, y) {
            $state.go("menuAdmin.dataSekolahPerJenjangAdmin", {
                "namaKecamatan": x,
                "idKecamatan": y[0].id_kecamatan,
                "jenjang": 'SMP'
            })
        }


        $scope.formData = {
            "provinsi": "",
            "kotaKabupaten": "",
            "kecamatan": "",
        }

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi");
        var listProvinsi = $firebaseArray(refProvinsi);
        $ionicLoading.show();
        listProvinsi.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataProvinsi = response;
            //console.log($scope.dataProvinsi);
        });

        $scope.getProvinsi = function () {
            var idProvinsi = $scope.formData.provinsi;
            console.log(idProvinsi)

            //Get Nama Provinsi
            var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
            var listNamaProvinsi = $firebaseArray(namaProvinsi);
            listNamaProvinsi.$loaded().then(function (response) {
                $scope.namaProvinsi = response[0].nama_provinsi;
                //console.log($scope.namaProvinsi);
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo(idProvinsi);
            var listRefKotaKabupaten = $firebaseArray(refKotaKabupaten);
            $ionicLoading.show();
            listRefKotaKabupaten.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKotaKabupaten = response;
                // console.log($scope.dataKotaKabupaten);
            })
        };

        $scope.getKotaKabupaten = function () {
            var idKotaKabupaten = $scope.formData.kotaKabupaten;

            //Get Nama Kota Kabupaten
            var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
            listNamaKotaKabupaten.$loaded().then(function (response) {
                $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
                // console.log($scope.namaKotaKabupaten);
            });

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            var listRefKecamatan = $firebaseArray(refKecamatan);
            $ionicLoading.show();
            listRefKecamatan.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKecamatan = response;
                //console.log($scope.dataKecamatan);
            })
        };

        $scope.getKecamatan = function () {
            var idKecamatan = $scope.formData.kecamatan;
            $scope.idKecamatan = $scope.formData.kecamatan;

            //Get Nama Kecamatan
            var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo(idKecamatan);
            var listNamaKecamatan = $firebaseArray(namaKecamatan);
            listNamaKecamatan.$loaded().then(function (response) {
                $scope.namaKecamatan = response[0].nama_kecamatan;
                $scope.id_kecamatan = response[0].id_kecamatan;
                // console.log($scope.id_kecamatan);

                var refSchool = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo($scope.id_kecamatan);
                var listRefSchool = $firebaseArray(refSchool);
                $ionicLoading.show();
                listRefSchool.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.tampil = true;
                    $scope.dataSekolahTampil = response;
                })

            });
        }

        $scope.getData = function (data) {
            console.log(data);
            $ionicActionSheet.show({
                titleText: 'Data Sekolah : ' + data.nama_sekolah,
                buttons: [
                    { text: '<i class="icon ion-edit"></i> Edit Sekolah' },
                    // { text: '<i class="icon ion-social-buffer"></i> Data Prasarana' },
                    // { text: '<i class="icon ion-android-folder-open"></i> Data Sarana' },
                    // { text: '<i class="icon ion-android-list"></i> Data Rombel' },
                    // { text: '<i class="icon ion-person-stalker"></i> Data Guru/Pegawai' },
                    { text: '<i class="icon ion-ios-people"></i> Data Siswa' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Sekolah',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('menuAdmin.dataSekolahEditAdmin', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                        });
                    }
                    if (index === 1) {
                        $state.go('menuAdmin.dataPrasaranaAdmin', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan
                        });
                    }
                    if (index === 2) {
                        $state.go('menuAdmin.dataSaranaAdmin', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan
                        });
                    }
                    if (index === 3) {
                        $state.go('menuAdmin.dataKelasAdmin', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan,
                            "jenjang": data.jenjang
                        });
                    }
                    if (index === 4) {
                        $state.go('menuAdmin.dataGuruAdmin', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan,
                            "jenjang": data.jenjang
                        });
                    }
                    if (index === 5) {
                        $state.go('menuAdmin.dataSiswaAdmin', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan,
                            "jenjang": data.jenjang
                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {

                    // console.log(data.$id)
                    if ($scope.hakAkses === "Super Admin") {

                        var refObj = firebase.database().ref("dataSekolahIndonesia/" + data.$id);
                        var objDelete = $firebaseObject(refObj);
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Hapus Data',
                            template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                            okType: "button-positive",
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

                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: "Anda Tidak Diperkenankan Menghapus Data Sekolah Ini, Terimakasih",
                            okType: "button-positive"
                        });
                    }


                    return true;
                }

            });
        }

        // $scope.dataPokokSekolah = function () {
        //     $ionicActionSheet.show({
        //         titleText: 'Data Pokok Sekolah ',
        //         buttons: [
        //             { text: '<i class="icon ion-android-document"></i> Sekolah ' },
        //             { text: '<i class="icon ion-android-folder"></i> Prasarana ' },
        //             { text: '<i class="icon ion-android-folder-open"></i> Sarana ' },
        //             { text: '<i class="icon ion-android-list"></i> Kelas ' },
        //             { text: '<i class="icon ion-android-person"></i> Guru ' },
        //             { text: '<i class="icon ion-ios-people"></i> Siswa ' },
        //         ],
        //         // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Jadwal',
        //         cancelText: 'Cancel',
        //         cancel: function () {
        //             //console.log('CANCELLED');
        //         },
        //         buttonClicked: function (index) {
        //             if (index === 0) { $state.go("menuAdmin.dataSekolahAdmin") }
        //             if (index === 1) { $state.go("menuAdmin.dataPokokPrasaranaAdmin") }
        //             if (index === 2) { $state.go("menuAdmin.dataPokokSaranaAdmin") }
        //             if (index === 3) { $state.go("menuAdmin.dataPokokRombelAdmin") }
        //             if (index === 4) { $state.go("menuAdmin.dataPokokGuruAdmin") }
        //             if (index === 5) { $state.go("menuAdmin.dataPokokSiswaAdmin") }
        //             return true;
        //         },
        //     });
        // }

        // $scope.eLearning = function () {
        //     $ionicActionSheet.show({
        //         titleText: 'e-Learning ',
        //         buttons: [
        //             { text: '<i class="icon ion-ios-paper-outline"></i> Bank Soal ' },
        //             { text: '<i class="icon ion-videocamera"></i> Materi Pelajaran ' },
        //         ],
        //         // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Jadwal',
        //         cancelText: 'Cancel',
        //         cancel: function () {
        //             //console.log('CANCELLED');
        //         },
        //         buttonClicked: function (index) {
        //             if (index === 0) { $state.go("menuAdmin.bankSoalAdmin") }
        //             if (index === 1) { $state.go("menuAdmin.materiPelajaranAdmin") }
        //             return true;
        //         },
        //     });
        // }

        // $scope.ujianOnline = function () {
        //     $ionicActionSheet.show({
        //         titleText: 'Ujian Online ',
        //         buttons: [
        //             { text: '<i class="icon ion-ios-book"></i> Ujian Online ' },
        //             { text: '<i class="icon ion-ios-box"></i> UTS/UAS ' },
        //             { text: '<i class="icon ion-ios-browsers"></i> Tryout ' },
        //             { text: '<i class="icon ion-trophy"></i> Olimpiade Online ' },
        //         ],
        //         // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Jadwal',
        //         cancelText: 'Cancel',
        //         cancel: function () {
        //             //console.log('CANCELLED');
        //         },
        //         buttonClicked: function (index) {
        //             if (index === 0) { $state.go("menuAdmin.ujianOnlineAdmin") }
        //             if (index === 1) { $state.go("menuAdmin.UTSUASAdmin") }
        //             if (index === 2) { $state.go("menuAdmin.tryoutOnlineAdmin") }
        //             if (index === 3) { $state.go("menuAdmin.socAdmin") }
        //             return true;
        //         },
        //     });
        // }

        $scope.pengaturan = function () {
            $ionicActionSheet.show({
                titleText: 'Pengaturan ',
                buttons: [
                    { text: '<i class="icon ion-gear-a"></i> Tahun Ajaran ' },
                    { text: '<i class="icon ion-gear-a"></i> Semester ' },
                    { text: '<i class="icon ion-gear-a"></i> Pelajaran ' },
                    { text: '<i class="icon ion-gear-a"></i> Jenis Prasarana ' },
                    { text: '<i class="icon ion-gear-a"></i> Jenis Sarana ' },
                    { text: '<i class="icon ion-gear-a"></i> Admin Sekolah ' },
                    { text: '<i class="icon ion-gear-a"></i> Data Guru ' },
                    { text: '<i class="icon ion-gear-a"></i> Data Admin ' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Jadwal',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) { $state.go("menuAdmin.tahunAjaranAdmin") }
                    if (index === 1) { $state.go("menuAdmin.semesterAdmin") }
                    if (index === 2) { $state.go("menuAdmin.pelajaranAdmin") }
                    if (index === 3) { $state.go("menuAdmin.jenisPrasaranaAdmin") }
                    if (index === 4) { $state.go("menuAdmin.jenisSaranaAdmin") }
                    if (index === 5) { $state.go("menuAdmin.dataAdminSekolah") }
                    if (index === 6) { $state.go("menuAdmin.dataGuruAllAdmin") }
                    if (index === 7) { $state.go("menuAdmin.dataAdmin") }
                    return true;
                },
            });
        }


        $scope.logoutAdmin = function () {

            var confirmPopup = $ionicPopup.confirm({
                title: 'Logout Application',
                template: 'Are you sure to logout this apps?',
                okType: 'button-positive'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    localStorage.removeItem('idAdmin');
                    localStorage.removeItem('namaAdmin');
                    localStorage.removeItem('emailAdmin');
                    localStorage.removeItem('hakAkses');
                    localStorage.removeItem('uidAdmin');
                    localStorage.clear();
                    $state.go("welcome");
                } else {
                    console.log('You are not sure');
                }
            }).then(function (resp) {

            })
        };

    }])

