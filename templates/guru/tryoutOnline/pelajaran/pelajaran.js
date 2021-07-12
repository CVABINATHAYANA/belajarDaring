angular.module('app.pelajaranTryoutOnlineGuru', [])

    .controller('pelajaranTryoutOnlineGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
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
            "idTryoutOnline": $stateParams.idTryoutOnline,
            "namaTryoutOnline": $stateParams.namaTryoutOnline,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
            "namaSekolah": $stateParams.namaSekolah,
        };
        // console.log($scope.data);

        $scope.tambahPelajaran = function () {
            $state.go("menuGuru.tambahPelajaranTryoutOnlineGuru", {
                "idTryoutOnline": $stateParams.idTryoutOnline,
                "namaTryoutOnline": $stateParams.namaTryoutOnline,
                "jenjang": $stateParams.jenjang,
                "tingkatKelas": $stateParams.tingkatKelas
            });
        };

        var refPelajaran = firebase.database(app).ref("pelajaranTryoutOnline").orderByChild("idTryoutOnline").equalTo($scope.data.idTryoutOnline);
        var listRefPelajaran = $firebaseArray(refPelajaran);

        $ionicLoading.show();
        listRefPelajaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPelajaran = response;
            // console.log(response);
        });

        $scope.pengaturanPelajaran = function (data) {
            // console.log(data);
            $ionicActionSheet.show({
                titleText: 'Ujian : ' + data.namaTryoutOnline,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Pengaturan Umum' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Kisi-Kisi Soal' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Tambah Soal' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Reset Jawaban Peserta' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Ulang Ujian' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Pelajaran',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('menuGuru.pengaturanUmumTryoutOnlineGuru', {
                            "idTryoutOnline": data.idTryoutOnline,
                            "namaTryoutOnline": data.namaTryoutOnline,
                            "jenjang": data.jenjang,
                            "tingkatKelas": data.tingkatKelas,
                            "idPelajaranTryoutOnline": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }
                    if (index === 1) {
                        $state.go('menuGuru.kisiKisiSoalTryoutOnlineGuru', {
                            "idTryoutOnline": data.idTryoutOnline,
                            "namaTryoutOnline": data.namaTryoutOnline,
                            "jenjang": data.jenjang,
                            "tingkatKelas": data.tingkatKelas,
                            "idPelajaranTryoutOnline": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }
                    if (index === 2) {
                        $state.go('menuGuru.tambahSoalTryoutOnlineGuru', {
                            "idTryoutOnline": data.idTryoutOnline,
                            "namaTryoutOnline": data.namaTryoutOnline,
                            "jenjang": data.jenjang,
                            "tingkatKelas": data.tingkatKelas,
                            "idPelajaranTryoutOnline": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }

                    if (index === 3) {
                        $state.go('menuGuru.resetJawabanPesertaTryoutOnlineGuru', {
                            "idTryoutOnline": data.idTryoutOnline,
                            "namaTryoutOnline": data.namaTryoutOnline,
                            "jenjang": data.jenjang,
                            "tingkatKelas": data.tingkatKelas,
                            "idPelajaranTryoutOnline": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }

                    if (index === 4) {
                        $state.go('menuGuru.ulangUjianTryoutOnlineGuru', {
                            "idTryoutOnline": data.idTryoutOnline,
                            "namaTryoutOnline": data.namaTryoutOnline,
                            "jenjang": data.jenjang,
                            "tingkatKelas": data.tingkatKelas,
                            "idPelajaranTryoutOnline": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }

                    return true;
                },

                destructiveButtonClicked: function () {
                    var refObj = firebase.database(app).ref("pelajaranTryoutOnline/" + data.$id);
                    var objDelete = $firebaseObject(refObj);

                    var refPengaturan = firebase.database(app).ref("pengaturanUmumUjianTryoutOnline").orderByChild("idPelajaranTryoutOnline").equalTo(data.$id);
                    var deletePengaturan = $firebaseObject(refPengaturan);

                    var refKisikisiSoal = firebase.database(app).ref("kisiKisiSoalTryoutOnline").orderByChild("filter").equalTo($scope.data.idTryoutOnline+"_"+data.$id);
                    var deleteKisikisi = $firebaseObject(refKisikisiSoal);

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

                            deleteKisikisi.$remove().then(function(ref){

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

    .controller('tambahPelajaranTryoutOnlineGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
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
            "idTryoutOnline": $stateParams.idTryoutOnline,
            "namaTryoutOnline": $stateParams.namaTryoutOnline,
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

                var cekPelajaranTryoutOnline = firebase.database(app).ref("pelajaranTryoutOnline").orderByChild("filter").equalTo($stateParams.idTryoutOnline + "_" + $scope.formData.idPelajaran);
                var listPelajaranTryoutOnline = $firebaseArray(cekPelajaranTryoutOnline);

                listPelajaranTryoutOnline.$loaded().then(function (response) {
                    //console.log(response.length);
                    if (response.length === 1) {

                        $ionicPopup.alert({
                            title: 'Pemberitahuan',
                            template: "Maaf, Pelajaran yang Anda pilih sudah ada",
                            okType: "button-positive"
                        });
                    }
                    else {
                        var refPelajaranTryoutOnline = firebase.database(app).ref("pelajaranTryoutOnline");
                        $ionicLoading.show();
                        refPelajaranTryoutOnline.push({
                            "idTryoutOnline": $stateParams.idTryoutOnline,
                            "namaTryoutOnline": $stateParams.namaTryoutOnline,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaran": $scope.formData.idPelajaran,
                            "alias": $scope.alias,
                            "pelajaran": $scope.pelajaran,
                            "filter": $stateParams.idTryoutOnline + "_" + $scope.formData.idPelajaran
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            //console.log("data berhasil disimpan");
                            $state.go("menuGuru.pelajaranTryoutOnlineGuru", {
                                "idTryoutOnline": $stateParams.idTryoutOnline,
                                "namaTryoutOnline": $stateParams.namaTryoutOnline,
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