angular.module('app.pelajaranTryoutOnlineAdmin', [])

    .controller('pelajaranTryoutOnlineAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
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
            $state.go("menuAdmin.tambahPelajaranTryoutOnlineAdmin", {
                "idTryoutOnline": $stateParams.idTryoutOnline,
                "namaTryoutOnline": $stateParams.namaTryoutOnline,
                "jenjang": $stateParams.jenjang,
                "tingkatKelas": $stateParams.tingkatKelas
            });
        };

        var refPelajaran = firebase.database(appTryoutOnline).ref("pelajaranTryoutOnline").orderByChild("idTryoutOnline").equalTo($scope.data.idTryoutOnline);
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
                        $state.go('menuAdmin.pengaturanUmumTryoutOnlineAdmin', {
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
                        $state.go('menuAdmin.kisiKisiSoalTryoutOnlineAdmin', {
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
                        $state.go('menuAdmin.tambahSoalTryoutOnlineAdmin', {
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
                        $state.go('menuAdmin.resetJawabanPesertaTryoutOnlineAdmin', {
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
                        $state.go('menuAdmin.ulangUjianTryoutOnlineAdmin', {
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
                    var refObj = firebase.database(appTryoutOnline).ref("pelajaranTryoutOnline/" + data.$id);
                    var objDelete = $firebaseObject(refObj);

                    var refPengaturan = firebase.database(appTryoutOnline).ref("pengaturanUmumUjianTryoutOnline").orderByChild("idPelajaranTryoutOnline").equalTo(data.$id);
                    var deletePengaturan = $firebaseObject(refPengaturan);

                    var refKisikisiSoal = firebase.database(appTryoutOnline).ref("kisiKisiSoalTryoutOnline").orderByChild("filter").equalTo($scope.data.idTryoutOnline+"_"+data.$id);
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

    .controller('tambahPelajaranTryoutOnlineAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
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

                var cekPelajaranTryoutOnline = firebase.database(appTryoutOnline).ref("pelajaranTryoutOnline").orderByChild("filter").equalTo($stateParams.idTryoutOnline + "_" + $scope.formData.idPelajaran);
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
                        var refPelajaranTryoutOnline = firebase.database(appTryoutOnline).ref("pelajaranTryoutOnline");
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
                            $state.go("menuAdmin.pelajaranTryoutOnlineAdmin", {
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