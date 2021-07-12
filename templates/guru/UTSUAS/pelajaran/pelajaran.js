angular.module('app.pelajaranUTSUASGuru', [])

    .controller('pelajaranUTSUASGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahGuru === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "utsUasTingkat": $stateParams.utsUasTingkat,
            "namaSekolah": $stateParams.namaSekolah,
        };
        // console.log($scope.data);

        $scope.tambahPelajaran = function () {
            $state.go("menuGuru.tambahPelajaranUTSUASGuru", {
                "idUTSUAS": $stateParams.idUTSUAS,
                "namaUTSUAS": $stateParams.namaUTSUAS,
                "jenjang": $stateParams.jenjang,
                "tingkatKelas": $stateParams.tingkatKelas
            });
        };

        var refPelajaran = firebase.database(app).ref("pelajaranUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        var listRefPelajaran = $firebaseArray(refPelajaran);

        $ionicLoading.show();
        listRefPelajaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPelajaran = response;
            // console.log(response);
        });

        $scope.pengaturanPelajaran = function (data) {
            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Ujian : ' + data.namaUTSUAS,
                buttons: [
                    { text: '<i class="icon ion-android-settings"></i> Pengaturan Umum' },
                    { text: '<i class="icon ion-android-clipboard"></i> Kisi-Kisi Soal' },
                    { text: '<i class="icon ion-android-add-circle"></i> Tambah Soal' },
                    { text: '<i class="icon ion-reply"></i> Reset Jawaban Peserta' },
                    { text: '<i class="icon ion-android-create"></i> Ulang Ujian' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Pelajaran',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('menuGuru.pengaturanUmumUTSUASGuru', {
                            "idUTSUAS": data.idUTSUAS,
                            "namaUTSUAS": data.namaUTSUAS,
                            "jenjang": data.jenjang,
                            "tingkatKelas": data.tingkatKelas,
                            "idPelajaranUTSUAS": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }
                    if (index === 1) {
                        $state.go('menuGuru.kisiKisiSoalUTSUASGuru', {
                            "idUTSUAS": data.idUTSUAS,
                            "namaUTSUAS": data.namaUTSUAS,
                            "jenjang": data.jenjang,
                            "tingkatKelas": data.tingkatKelas,
                            "idPelajaranUTSUAS": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }
                    if (index === 2) {
                        $state.go('menuGuru.tambahSoalUTSUASGuru', {
                            "idUTSUAS": data.idUTSUAS,
                            "namaUTSUAS": data.namaUTSUAS,
                            "jenjang": data.jenjang,
                            "tingkatKelas": data.tingkatKelas,
                            "idPelajaranUTSUAS": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }

                    if (index === 3) {
                        $state.go('menuGuru.resetJawabanPesertaUTSUASGuru', {
                            "idUTSUAS": data.idUTSUAS,
                            "namaUTSUAS": data.namaUTSUAS,
                            "jenjang": data.jenjang,
                            "tingkatKelas": data.tingkatKelas,
                            "idPelajaranUTSUAS": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }

                    if (index === 4) {
                        $state.go('menuGuru.ulangUjianUTSUASGuru', {
                            "idUTSUAS": data.idUTSUAS,
                            "namaUTSUAS": data.namaUTSUAS,
                            "jenjang": data.jenjang,
                            "tingkatKelas": data.tingkatKelas,
                            "idPelajaranUTSUAS": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }

                    return true;
                },

                destructiveButtonClicked: function () {
                    var refObj = firebase.database(app).ref("pelajaranUTSUAS/" + data.$id);
                    var objDelete = $firebaseObject(refObj);

                    var refPengaturan = firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("idPelajaranUTSUAS").equalTo(data.$id);
                    var deletePengaturan = $firebaseObject(refPengaturan);

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

                            deletePengaturan.$remove().then(function(ref){
                                
                            })
                        }
                        else {
                            //console.log('Tidak Jadi Menghapus');
                        }
                    });
                    return true;
                }

            });
        };
    }])

    .controller('tambahPelajaranUTSUASGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }

        else if ($scope.idSekolahGuru === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }
        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas
        };
        //console.log($scope.data);

        var ref = firebase.database().ref("mataPelajaran");
        $scope.mataPelajaran = $firebaseArray(ref);

        $scope.formData = {
            "idPelajaran": ''
        };


        $scope.getMataPelajaran = function () {
            var refPel = firebase.database().ref("mataPelajaran/" + $scope.formData.idPelajaran);
            refPel.on("value", function (snapshot) {
                //console.log(snapshot.val());
                $scope.alias = snapshot.val().alias;
                $scope.pelajaran = snapshot.val().pelajaran;
            })
            //console.log($scope.formData.idPelajaran);
        };

        $scope.simpan = function () {
            //$ionicLoading.show();
            if ($scope.formData.idPelajaran !== '') {

                var cekPelajaranUTSUAS = firebase.database(app).ref("pelajaranUTSUAS").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $scope.formData.idPelajaran);
                var listPelajaranUTSUAS = $firebaseArray(cekPelajaranUTSUAS);

                listPelajaranUTSUAS.$loaded().then(function (response) {
                    //console.log(response.length);
                    if (response.length === 1) {

                        $ionicPopup.alert({
                            title: 'Pemberitahuan',
                            template: "Maaf, Pelajaran yang Anda pilih sudah ada",
                            okType: "button-positive"
                        });
                    }
                    else {
                        var refPelajaranUTSUAS = firebase.database(app).ref("pelajaranUTSUAS");
                        $ionicLoading.show();
                        refPelajaranUTSUAS.push({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaran": $scope.formData.idPelajaran,
                            "alias": $scope.alias,
                            "pelajaran": $scope.pelajaran,
                            "filter": $stateParams.idUTSUAS + "_" + $scope.formData.idPelajaran
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            //console.log("data berhasil disimpan");
                            $state.go("menuGuru.pelajaranUTSUASGuru", {
                                "idUTSUAS": $stateParams.idUTSUAS,
                                "namaUTSUAS": $stateParams.namaUTSUAS,
                                "jenjang": $stateParams.jenjang,
                                "tingkatKelas": $stateParams.tingkatKelas
                            });
                        });
                    }
                });


            }
            else {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Pemberitahuan',
                    template: "Maaf, Data Pelajaran Harus Diisi",
                    okType: "button-positive"
                });
            }
        }
    }])