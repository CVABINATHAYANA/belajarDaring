angular.module('app.pelajaranSOCGuru', [])

    .controller('pelajaranSOCGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idTryout": $stateParams.idTryout,
            "namaTryout": $stateParams.namaTryout,
            "jenjang": $stateParams.jenjang,
            "kelas": $stateParams.kelas,
            "olimpiadeTingkat": $stateParams.olimpiadeTingkat
        };
        // console.log($scope.data);

        $scope.tambahPelajaran = function () {
            $state.go("menuGuru.tambahPelajaranSOCGuru", {
                "idTryout": $stateParams.idTryout,
                "namaTryout": $stateParams.namaTryout,
                "jenjang": $stateParams.jenjang,
                "kelas": $stateParams.kelas
            });
        };

        var refPelajaran = firebase.database().ref("pelajaranTryout").orderByChild("idTryout").equalTo($scope.data.idTryout);
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
                titleText: 'Tryout : ' + data.namaTryout,
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
                        $state.go('menuGuru.pengaturanUmumSOCGuru', {
                            "idTryout": data.idTryout,
                            "namaTryout": data.namaTryout,
                            "jenjang": data.jenjang,
                            "kelas": data.kelas,
                            "idPelajaranTryout": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }
                    if (index === 1) {
                        $state.go('menuGuru.kisiKisiSoalSOCGuru', {
                            "idTryout": data.idTryout,
                            "namaTryout": data.namaTryout,
                            "jenjang": data.jenjang,
                            "kelas": data.kelas,
                            "idPelajaranTryout": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }
                    if (index === 2) {
                        $state.go('menuGuru.tambahSoalOlimpiadeSOCGuru', {
                            "idTryout": data.idTryout,
                            "namaTryout": data.namaTryout,
                            "jenjang": data.jenjang,
                            "kelas": data.kelas,
                            "idPelajaranTryout": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }

                    if (index === 3) {
                        $state.go('menuGuru.resetJawabanPesertaSOCGuru', {
                            "idTryout": data.idTryout,
                            "namaTryout": data.namaTryout,
                            "jenjang": data.jenjang,
                            "kelas": data.kelas,
                            "idPelajaranTryout": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }

                    if (index === 4) {
                        $state.go('menuGuru.ulangUjianSOCGuru', {
                            "idTryout": data.idTryout,
                            "namaTryout": data.namaTryout,
                            "jenjang": data.jenjang,
                            "kelas": data.kelas,
                            "idPelajaranTryout": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }

                    return true;
                },

                destructiveButtonClicked: function () {
                    var refObj = firebase.database().ref("pelajaranTryout/" + data.$id);
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
                    return true;
                }

            });
        };
    }])

    .controller('tambahPelajaranSOCGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idTryout": $stateParams.idTryout,
            "namaTryout": $stateParams.namaTryout,
            "jenjang": $stateParams.jenjang,
            "kelas": $stateParams.kelas
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

                var cekPelajaranTryout = firebase.database().ref("pelajaranTryout").orderByChild("filter").equalTo($stateParams.idTryout + "_" + $scope.formData.idPelajaran);
                var listPelajaranTryout = $firebaseArray(cekPelajaranTryout);

                listPelajaranTryout.$loaded().then(function (response) {
                    //console.log(response.length);
                    if (response.length === 1) {

                        $ionicPopup.alert({
                            title: 'Pemberitahuan',
                            template: "Maaf, Pelajaran yang Anda pilih sudah ada",
                            okType: "button-positive"
                        });
                    }
                    else {
                        var refPelajaranTryout = firebase.database().ref("pelajaranTryout");
                        $ionicLoading.show();
                        refPelajaranTryout.push({
                            "idTryout": $stateParams.idTryout,
                            "namaTryout": $stateParams.namaTryout,
                            "jenjang": $stateParams.jenjang,
                            "kelas": $stateParams.kelas,
                            "idPelajaran": $scope.formData.idPelajaran,
                            "alias": $scope.alias,
                            "pelajaran": $scope.pelajaran,
                            "filter": $stateParams.idTryout + "_" + $scope.formData.idPelajaran
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            //console.log("data berhasil disimpan");
                            $state.go("menuGuru.pelajaranSOCGuru", {
                                "idTryout": $stateParams.idTryout,
                                "namaTryout": $stateParams.namaTryout,
                                "jenjang": $stateParams.jenjang,
                                "kelas": $stateParams.kelas
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