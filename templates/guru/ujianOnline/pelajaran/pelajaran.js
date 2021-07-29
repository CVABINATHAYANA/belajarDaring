angular.module('app.pelajaranUjianOnlineGuru', [])

    .controller('pelajaranUjianOnlineGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')
        // LOADBALANCING
        if ($scope.idSekolahGuru === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolahGuru === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }
        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUjian": $stateParams.idUjian,
            "namaUjian": $stateParams.namaUjian,
            "jenjang": $stateParams.jenjang,
            "namaKelas": $stateParams.namaKelas,
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "jenisUjian": $stateParams.jenisUjian,
            "idGuru": $stateParams.idGuru,
            "namaGuru": $stateParams.namaGuru,
            "idTahunAjaran": $stateParams.idTahunAjaran,
            "idKelas": $stateParams.idKelas,
            "tingkatKelas": $stateParams.tingkatKelas,
            "ruangLingkupUjian": $stateParams.ruangLingkupUjian,
        };
        // console.log($scope.data);

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        if($scope.data.ruangLingkupUjian==="Sekolah"){
            var refKelas = firebase.database(app).ref("jadwalPelajaran/").orderByChild("filterPelajaran").equalTo($scope.data.idSekolah + "_" + $scope.data.idGuru + "_" + $scope.data.idTahunAjaran + "_" + $scope.data.idKelas);
            var listRefKelas = $firebaseArray(refKelas);
            listRefKelas.$loaded().then(function (response) {
                $scope.datanya = response
                $scope.mataPelajaran = $scope.datanya.groupBy('pelajaran');
                //console.log($scope.mataPelajaran);
            })
        }
        else if($scope.data.ruangLingkupUjian==="Umum"){
            var refKelas = firebase.database(app).ref("jadwalPelajaran/").orderByChild("filterGuru").equalTo($scope.data.idSekolah + "_" + $scope.data.idGuru + "_" + $scope.data.idTahunAjaran);
            var listRefKelas = $firebaseArray(refKelas);
            listRefKelas.$loaded().then(function (response) {
                $scope.datanya = response
                $scope.mataPelajaran = $scope.datanya.groupBy('pelajaran');
                //console.log($scope.mataPelajaran);
            })
        }

        

        $scope.tambahPelajaran = function () {

            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

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

                        var cekPelajaranTryout = firebase.database(app).ref("pelajaranUjianOnline").orderByChild("filter").equalTo($stateParams.idUjian + "_" + $scope.formData.idPelajaran);
                        var listPelajaranTryout = $firebaseArray(cekPelajaranTryout);

                        listPelajaranTryout.$loaded().then(function (response) {
                            // console.log(response.length);
                            if (response.length === 1) {

                                $ionicPopup.alert({
                                    title: 'Pemberitahuan',
                                    template: "Maaf, Pelajaran yang Anda pilih sudah ada",
                                    okType: "button-positive"
                                });
                            }
                            else {
                                var refPelajaranTryout = firebase.database(app).ref("pelajaranUjianOnline");
                                $ionicLoading.show();
                                refPelajaranTryout.push({
                                    "idUjian": $stateParams.idUjian,
                                    "namaUjian": $stateParams.namaUjian,
                                    "jenjang": $stateParams.jenjang,
                                    "idKelas": $stateParams.idKelas,
                                    "namaKelas": $stateParams.namaKelas,
                                    "idPelajaran": $scope.formData.idPelajaran,
                                    "alias": $scope.alias,
                                    "pelajaran": $scope.pelajaran,
                                    "filter": $stateParams.idUjian + "_" + $scope.formData.idPelajaran
                                }).then(function (resp) {
                                    $ionicLoading.hide();
                                    $scope.modal.hide()
                                    //console.log("data berhasil disimpan");
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


            });

        };

        var refPelajaran = firebase.database(app).ref("pelajaranUjianOnline").orderByChild("idUjian").equalTo($scope.data.idUjian);
        var listRefPelajaran = $firebaseArray(refPelajaran);

        $ionicLoading.show();
        listRefPelajaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPelajaran = response;
            // console.log(response);
        });

        $scope.pengaturanPelajaran = function (data) {
            console.log($stateParams.idSekolah);
            $ionicActionSheet.show({
                titleText: 'Ujian : ' + data.namaUjian,
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
                        $state.go('menuGuru.pengaturanUmumUjianOnlineGuru', {
                            "idUjian": $stateParams.idUjian,
                            "namaUjian": $stateParams.namaUjian,
                            "jenjang": $stateParams.jenjang,
                            "idKelas": $stateParams.idKelas,
                            "namaKelas": $stateParams.namaKelas,
                            "idPelajaran": data.idPelajaran,
                            "idPelajaranUjianOnline": data.$id,
                            "pelajaran": data.pelajaran,
                            "namaSekolah": $stateParams.namaSekolah,
                            "jenisUjian": $stateParams.jenisUjian,
                            "idGuru" : $stateParams.idGuru,
                            "namaGuru": $stateParams.namaGuru,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idSekolah": $stateParams.idSekolah,
                            "idTahunAjaran": $stateParams.idTahunAjaran
                        });
                    }
                    if (index === 1) {
                        $state.go('menuGuru.kisiKisiSoalUjianOnlineGuru', {
                            "idUjian": data.idUjian,
                            "namaUjian": data.namaUjian,
                            "jenjang": data.jenjang,
                            "namaKelas": data.namaKelas,
                            "idPelajaranUjianOnline": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }
                    if (index === 2) {
                        $state.go('menuGuru.tambahSoalUjianOnlineGuru', {
                            "idUjian": data.idUjian,
                            "namaUjian": data.namaUjian,
                            "jenjang": data.jenjang,
                            "namaKelas": data.namaKelas,
                            "idPelajaranUjianOnline": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran,
                            "tingkatKelas": $stateParams.tingkatKelas
                        });
                    }

                    if (index === 3) {
                        $state.go('menuGuru.resetJawabanPesertaUjianOnlineGuru', {
                            "idUjian": data.idUjian,
                            "namaUjian": data.namaUjian,
                            "jenjang": data.jenjang,
                            "namaKelas": data.namaKelas,
                            "idPelajaranUjianOnline": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }

                    if (index === 4) {
                        $state.go('menuGuru.ulangUjianOnlineGuru', {
                            "idUjian": data.idUjian,
                            "namaUjian": data.namaUjian,
                            "jenjang": data.jenjang,
                            "namaKelas": data.namaKelas,
                            "idPelajaranUjianOnline": data.$id,
                            "idPelajaran": data.idPelajaran,
                            "pelajaran": data.pelajaran
                        });
                    }

                    return true;
                },

                destructiveButtonClicked: function () {
                    var refObj = firebase.database(app).ref("pelajaranUjianOnline/" + data.$id);
                    var objDelete = $firebaseObject(refObj);

                    var refPengaturan = firebase.database(app).ref("pengaturanUmumUjianOnline").orderByChild("idPelajaranUjianOnline").equalTo(data.$id);
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
