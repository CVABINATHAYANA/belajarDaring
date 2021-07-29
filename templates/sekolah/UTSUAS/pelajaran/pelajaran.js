angular.module('app.pelajaranUTSUASSekolah', [])

    .controller('pelajaranUTSUASSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')
        // LOADBALANCING
        if ($scope.idSekolah === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolah === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }


        if (!$scope.idPenggunaSekolah) {
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
            $state.go("menuSekolah.tambahPelajaranUTSUASSekolah", {
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
                        $state.go('menuSekolah.pengaturanUmumUTSUASSekolah', {
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
                        $state.go('menuSekolah.kisiKisiSoalUTSUASSekolah', {
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
                        $state.go('menuSekolah.tambahSoalUTSUASSekolah', {
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
                        $state.go('menuSekolah.resetJawabanPesertaUTSUASSekolah', {
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
                        $state.go('menuSekolah.ulangUjianUTSUASSekolah', {
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
                        okType: "button-balanced",
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

    .controller('tambahPelajaranUTSUASSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')
        // LOADBALANCING
        if ($scope.idSekolah === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolah === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }

        if (!$scope.idPenggunaSekolah) {
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
                            okType: "button-balanced"
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
                            $state.go("menuSekolah.pelajaranUTSUASSekolah", {
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
                    okType: "button-balanced"
                });
            }
        }
    }])