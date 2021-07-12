angular.module('app.pengaturanUmumUTSUASSekolah', [])

    .controller('pengaturanUmumUTSUASSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
        if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolah === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj14") { var app = app_sapta; }


        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran
        };

        var cekkelas = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran");
        var listcekkelas = $firebaseArray(cekkelas);

        listcekkelas.$loaded().then(function (response) {
            console.log(response);
        });

        console.log('CEK');
        console.log($scope.data.idUTSUAS);
        console.log($scope.data.idPelajaran);
        console.log($scope.data.pelajaran)


        var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS + '/' + $scope.data.idPelajaran);
        //console.log($scope.data);

        var data = firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS);
        var listData = $firebaseArray(data);

        listData.$loaded().then(function (response) {
            // console.log(response);
            if (response.length === 1) {
                var dataObject = firebase.database(app).ref("pengaturanUmumUjianUTSUAS/" + response[0].$id);
                var iD = response[0].$id;
                $scope.formData = {
                    "tanggalUjian": new Date(response[0].tanggalUjian),
                    "jamUjian": new Date(response[0].jamUjian),
                    "durasiUjian": response[0].durasiUjian,
                    "nilaiMaksimum": response[0].nilaiMaksimum,
                    "jumlahSoal": response[0].jumlahSoal,
                    "kkm": response[0].kkm,
                    "soalAcak": response[0].soalAcak,
                    "pembahasanSoalDibuka": response[0].pembahasanSoalDibuka,
                    "bukaUjianSekarang": response[0].bukaUjianSekarang,
                    "tutupUjianSekarang": response[0].tutupUjianSekarang,
                    "id": response[0].$id
                };
            }
            else if (response.length === 0) {
                $scope.formData = {
                    "tanggalUjian": new Date(),
                    "jamUjian": '',
                    "durasiUjian": '',
                    "nilaiMaksimum": '',
                    "jumlahSoal": '',
                    "kkm": '',
                    "soalAcak": false,
                    "pembahasanSoalDibuka": false,
                    "bukaUjianSekarang": false,
                    "tutupUjianSekarang": false
                };
            }
            else if (response.length > 1) {
                for (i = 0; i < response.length; i++) {
                    if (i > 0) {
                        var obj = firebase.database(app).ref("pengaturanUmumUjianUTSUAS/" + response[i].$id);
                        objDelete = $firebaseObject(obj);
                        objDelete.$remove().then(function (resp) {
                            console.log('delete');
                        })
                    }
                }
            }
        });

        $scope.simpan = function () {
            if ($scope.formData.tanggalUjian !== null && $scope.formData.jamUjian !== null && $scope.formData.durasiUjian !== null && $scope.formData.nilaiMaksimum !== null && $scope.formData.jumlahSoal !== null && $scope.formData.kkm !== null) {

                var cekData = firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS);
                var listCekData = $firebaseArray(cekData);

                listCekData.$loaded().then(function (response) {
                    if (response.length === 0) {
                        // Additional Variabel
                        var tanggalUjian = $filter('date')($scope.formData.tanggalUjian);
                        var hariUjian = $filter('date')($scope.formData.tanggalUjian, 'EEEE');
                        var jamUjian = $filter('date')($scope.formData.jamUjian, 'yyyy-MM-dd HH:mm:ss Z');
                        var tanggalUjianDisplay = $filter('date')($scope.formData.tanggalUjian, 'dd-MM-yyyy');
                        var jamUjianDisplay = $filter('date')($scope.formData.jamUjian, 'HH:mm');

                        var addData = firebase.database(app).ref("pengaturanUmumUjianUTSUAS");
                        var insertData = $firebaseArray(addData);

                        addData.push({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,

                            "tanggalUjian": tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        }).then(function (resp) {
                            $state.go("menuSekolah.pelajaranUTSUASSekolah", {
                                "idUTSUAS": $stateParams.idUTSUAS,
                                "namaUTSUAS": $stateParams.namaUTSUAS,
                                "jenjang": $stateParams.jenjang,
                                "tingkatKelas": $stateParams.tingkatKelas
                            });
                            $ionicPopup.alert({
                                title: 'SUKSES',
                                template: "Data berhasil disimpan",
                                okType: "button-balanced"
                            });
                        });
                    }
                    else {
                        var hariUjian = $filter('date')($scope.formData.tanggalUjian, 'EEEE');
                        var refUpdate = firebase.database(app).ref("pengaturanUmumUjianUTSUAS/" + $scope.formData.id);
                        var tanggalUjianDisplay = $filter('date')($scope.formData.tanggalUjian, 'dd-MM-yyyy');
                        var jamUjianDisplay = $filter('date')($scope.formData.jamUjian, 'HH:mm');

                        refUpdate.update(JSON.parse(JSON.stringify({

                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,

                            "tanggalUjian": $scope.formData.tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": $scope.formData.jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS

                        }))).then(function (response) {

                            var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS + '/' + $scope.data.idPelajaran).orderByChild("idPelajaranUTSUAS").equalTo($scope.data.idPelajaranUTSUAS);
                            var listUpdateJawabanUTSUASSiswaPerPelajaran = $firebaseArray(updateJawabanUTSUASSiswaPerPelajaran);

                            listUpdateJawabanUTSUASSiswaPerPelajaran.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {
                                    //console.log(response[i].$id);
                                    var updateData = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS + '/' + $scope.data.idPelajaran + '/' + response[i].$id);

                                    updateData.update(JSON.parse(JSON.stringify({

                                        "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                                        "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,

                                    }))).then(function (resp) {
                                        console.log("update jawaban perpelajaran success");
                                    })
                                }
                            });

                            $state.go("menuSekolah.pelajaranUTSUASSekolah", {
                                "idUTSUAS": $stateParams.idUTSUAS,
                                "namaUTSUAS": $stateParams.namaUTSUAS,
                                "jenjang": $stateParams.jenjang,
                                "tingkatKelas": $stateParams.tingkatKelas
                            });
                            $ionicPopup.alert({
                                title: 'SUKSES',
                                template: "Data berhasil diperbaharui",
                                okType: "button-balanced"
                            });
                        });

                    }
                });

            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: "Maaf, Seluruh Data Harus Diisi",
                    okType: "button-balanced"
                });
            }

        };

    }])

    .controller('kisiKisiSoalUTSUASSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolah === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj14") { var app = app_sapta; }


        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran
        };


        var cekData = firebase.database(app).ref("kisiKisiSoalUTSUAS").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
        var listCekData = $firebaseArray(cekData);

        listCekData.$loaded().then(function (response) {

            if (response.length === 0) {
                var add = firebase.database(app).ref("kisiKisiSoalUTSUAS").push({

                    "idUTSUAS": $stateParams.idUTSUAS,
                    "namaUTSUAS": $stateParams.namaUTSUAS,
                    "jenjang": $stateParams.jenjang,
                    "tingkatKelas": $stateParams.tingkatKelas,
                    "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                    "idPelajaran": $stateParams.idPelajaran,
                    "pelajaran": $stateParams.pelajaran,
                    "filter": $stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS,

                }).then(function (resp) {
                    var id = firebase.database(app).ref("kisiKisiSoalUTSUAS").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
                    id.on("child_added", function (snapshot) {
                        $scope.idKisiKisi = snapshot.key;
                    });

                    var refKisi = firebase.database(app).ref("kisiKisiSoalUTSUAS/" + $scope.idKisiKisi + "/kisiKisi");
                    var listRefKisi = $firebaseArray(refKisi);

                    listRefKisi.$loaded().then(function (response) {
                        $scope.kisiKisi = response;
                    });

                });
            }
            else {
                //console.log("no action anymore");
                $scope.idKisiKisi = response[0].$id;
                var refKisi = firebase.database(app).ref("kisiKisiSoalUTSUAS/" + $scope.idKisiKisi + "/kisiKisi");
                var listRefKisi = $firebaseArray(refKisi);

                listRefKisi.$loaded().then(function (response) {
                    $scope.kisiKisi = response;
                });

            }

        });

        $scope.tambahData = function () {


            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.formData = {
                    "materiPelajaran": '',
                    "ruangLingkup": '',
                };

                $scope.simpan = function () {
                    if ($scope.formData.materiPelajaran !== '' && $scope.formData.ruangLingkup !== '') {
                        $ionicLoading.show();
                        var add = firebase.database(app).ref("kisiKisiSoalUTSUAS/" + $scope.idKisiKisi + "/kisiKisi").push($scope.formData).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide();
                            //console.log("success")

                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: "Maaf, Seluruh Data Harus Diisi",
                            okType: "button-balanced"
                        });
                    }
                };

            });


        };


        $scope.getData = function (data) {

            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Materi : ' + data.materiPelajaran,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Data' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {

                        $ionicModal.fromTemplateUrl('templates/modal.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            var refObj = firebase.database(app).ref("kisiKisiSoalUTSUAS/" + $scope.idKisiKisi + "/kisiKisi/" + data.$id);
                            $scope.formData = $firebaseObject(refObj);

                            $scope.simpan = function () {
                                if ($scope.formData.materiPelajaran !== '' && $scope.formData.ruangLingkup !== '') {
                                    $ionicLoading.show();

                                    refObj.update(JSON.parse(JSON.stringify({
                                        "materiPelajaran": $scope.formData.materiPelajaran,
                                        "ruangLingkup": $scope.formData.ruangLingkup,
                                    }))).then(function (resp) {
                                        $ionicLoading.hide();
                                        $scope.modal.hide();
                                    })
                                }
                                else {
                                    $ionicPopup.alert({
                                        title: 'Perhatian',
                                        template: "Maaf, Seluruh Data Harus Diisi",
                                        okType: "button-balanced"
                                    });
                                }
                            };

                        });

                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    //console.log($scope.idKisiKisi);
                    var refObj = firebase.database(app).ref("kisiKisiSoalUTSUAS/" + $scope.idKisiKisi + "/kisiKisi/" + data.$id);
                    var objDelete = $firebaseObject(refObj)
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

        };

    }])

    .controller('resetJawabanPesertaUTSUASSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolah === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj14") { var app = app_sapta; }

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran
        };

        var refPesertaUTSUAS = firebase.database(app).ref("pesertaUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        var listPesertaUTSUAS = $firebaseArray(refPesertaUTSUAS);

        listPesertaUTSUAS.$loaded().then(function (response) {
            $scope.dataPesertaUTSUAS = response;
        });

        $scope.getDataHapus = function (data) {

            var confirmPopup = $ionicPopup.confirm({
                title: 'Reset Jawaban Peserta',
                template: 'Apakah Kamu Yakin Ingin Mereset Semua Jawaban Ujian Peserta Ini?',
                okType: "button-balanced",
            });
            confirmPopup.then(function (res) {
                if (res) {

                    //Menghapus Rekap Jawaban UTSUAS Siswa
                    // var rekapJawaban = firebase.database().ref("rekapJawabanUTSUASSiswa").orderByChild("filter").equalTo($stateParams.idUTSUAS+"_"+data.uid);
                    // rekapJawaban.on("child_added", function(snapshot){
                    //     //console.log(snapshot.val());
                    //     var id = snapshot.key;
                    //     var cekRekap = firebase.database().ref("rekapJawabanUTSUASSiswa/"+id+"/pelajaran").orderByChild("idPelajaranUTSUAS").equalTo($stateParams.idPelajaranUTSUAS);
                    //     cekRekap.on("child_added", function(snapshot){
                    //         var idNya = snapshot.key;
                    //         var hapusRekap = firebase.database().ref("rekapJawabanUTSUASSiswa/"+id+"/pelajaran/"+idNya);
                    //         var objDelete = $firebaseObject(hapusRekap);
                    //         objDelete.$remove().then(function(ref) {
                    //             console.log('Rekap Jawaban Berhasil Dihapus');
                    //         });
                    //     });
                    // });

                    console.log('CEK 1');
                    console.log($scope.data.idUTSUAS);
                    console.log($scope.data.idPelajaran);
                    console.log(data.uid);


                    //Menghapus Jawaban UTSUAS Siswa
                    var jawabanUTSUASSiswa = firebase.database(app).ref("jawabanUTSUASSiswa/" + $scope.data.idUTSUAS + '/' + data.uid).orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS + "_" + data.uid);
                    var refJawabanUTSUASSiswa = $firebaseArray(jawabanUTSUASSiswa);

                    refJawabanUTSUASSiswa.$loaded().then(function (response) {
                        for (i = 0; i < response.length; i++) {
                            var id = response[i].$id;
                            console.log('ID' + response);

                            var updateJawabanUTSUASSiswa = firebase.database(app).ref("jawabanUTSUASSiswa/" + $scope.data.idUTSUAS + '/'+ data.uid +'/'+ id);

                            updateJawabanUTSUASSiswa.update(JSON.parse(JSON.stringify({
                                "statusJawaban": "",
                                "statusJawabanBenar": 0,
                                "statusJawabanSalah": 0,
                                "kunciJawaban": "",
                                "pilihanJawaban": "",
                                "bobotNilai": 0,
                                "statusTerjawab": 0,
                            }))).then(function (resp) {
                                console.log("jawabanUTSUASSiswaTerhapus");
                            });
                        }
                    });

                    console.log('CEK 2');
                    console.log($scope.data.idUTSUAS);
                    console.log($scope.data.idPelajaran);
                    console.log(data.uid);

                    //Menghapus Jawaban UTSUAS Siswa PerPelajaran
                    var jawabanUTSUASSiswaPerPelajaran = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS + '/' + $scope.data.idPelajaran + '/' + data.uid).orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS + "_" + data.uid);
                    var refJawabanUTSUASSiswaPerPelajaran = $firebaseArray(jawabanUTSUASSiswaPerPelajaran);

                    refJawabanUTSUASSiswaPerPelajaran.$loaded().then(function (response) {
                        for (i = 0; i < response.length; i++) {
                            var id = response[i].$id;

                            var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS + '/' + $scope.data.idPelajaran + '/' + id);

                            updateJawabanUTSUASSiswaPerPelajaran.update(JSON.parse(JSON.stringify({
                                "benar": 0,
                                "salah": 0,
                                "kosong": 0,
                                "nilai": 0,
                                "statusFinish": false,
                                "bukaUjianSekarang": false,
                                "tutupUjianSekarang": false,
                                "jumlahSoal": 0,
                                "statusTerjawab": false,
                            }))).then(function (resp) {
                                console.log("jawabanUTSUASSiswaPerPelajaran-Terhapus");
                                $ionicPopup.alert({
                                    title: 'SUKSES',
                                    template: "Reset Jawaban Siswa Sukses",
                                    okType: "button-balanced"
                                });
                            });
                        }

                    });

                }
                else {
                }
            });

        };

    }])

    .controller('tambahSoalUTSUASSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolah === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj14") { var app = app_sapta; }


        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran
        };


        var jumlahSoal = firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
        jumlahSoal.on("child_added", function (snapshot) {
            $scope.totalSoalUjian = snapshot.val().jumlahSoal;
            //console.log($scope.totalSoalUjian);
        });

        if ($scope.data.jenjang === "SMK") {
            var jenjangSekarang = "SMA";
            var ref = firebase.database(appBankSoal).ref("soal").orderByChild("filterSoalUjianIdSekolah").equalTo($scope.data.idPelajaran + "_" + jenjangSekarang + "_" + $scope.data.tingkatKelas + "_" + $scope.idSekolah);
            var list = $firebaseArray(ref);

            list.$loaded().then(function (response) {
                $scope.totalSoal = response.length;
                if (response.length === 0) {
                    $scope.info = "<h2 style='font-weight:300; padding:10px'>Pemberitahuan</h2><p style='padding:10px'>Belum ada soal yang ditampilkan pada pelajaran ini, silahkan buat soal terlebih dahulu di menu <strong>Bank Soal</strong>. Terima Kasih</p>";
                }
                else {
                    $scope.dataSoal = response;
                }
            });
        }

        var ref = firebase.database(appBankSoal).ref("soal").orderByChild("filterSoalUjianIdSekolah").equalTo($scope.data.idPelajaran + "_" + $scope.data.jenjang + "_" + $scope.data.tingkatKelas + "_" + $scope.idSekolah);
        var list = $firebaseArray(ref);
        $ionicLoading.show();
        list.$loaded().then(function (response) {
            $scope.totalSoal = response.length;

            if (response.length === 0) {
                $ionicLoading.hide();
                $scope.info = "<h2 style='font-weight:300; padding:10px'>Pemberitahuan</h2><p style='padding:10px'>Belum ada soal yang ditampilkan pada pelajaran ini, silahkan buat soal terlebih dahulu di menu <strong>Bank Soal</strong>. Terima Kasih</p>";
            }
            else {
                $ionicLoading.hide();
                $scope.dataSoal = response;
            }
        });

        $scope.getData = function (data) {

            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Pelajaran : ' + data.pelajaran + ", " + data.jenjang + ", " + $scope.data.tingkatKelas,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Pilih Soal' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Lihat Soal' },
                ],
                //destructiveText: '<i class="icon ion-trash-b"></i> Hapus Soal',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {

                        var cekSoal = firebase.database(app).ref("soalUTSUAS").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + data.$id);
                        var listCekSoal = $firebaseArray(cekSoal);

                        listCekSoal.$loaded().then(function (response) {
                            if (response.length === 0) {

                                var filterJumlahSoal = firebase.database(app).ref("soalUTSUAS").orderByChild("filterJumlahSoal").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
                                var listFilterJumlahSoal = $firebaseArray(filterJumlahSoal);

                                listFilterJumlahSoal.$loaded().then(function (callBack) {
                                    $scope.jumlahSoalSekarang = callBack.length + 1;
                                    //console.log($scope.jumlahSoalSekarang);
                                    if ($scope.jumlahSoalSekarang <= $scope.totalSoalUjian) {
                                        var addSoal = firebase.database(app).ref("soalUTSUAS");
                                        addSoal.push({
                                            "idUTSUAS": $stateParams.idUTSUAS,
                                            "namaUTSUAS": $stateParams.namaUTSUAS,
                                            "jenjang": $stateParams.jenjang,
                                            "tingkatKelas": $stateParams.tingkatKelas,
                                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                                            "idPelajaran": $stateParams.idPelajaran,
                                            "pelajaran": $stateParams.pelajaran,
                                            "filter": $stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + data.$id,
                                            "filterJumlahSoal": $stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS,
                                            "idSoal": data.$id,
                                            // "soal" : data
                                        }).then(function (resp) {
                                            var cekSoal = firebase.database(app).ref("soalUTSUAS").orderByChild("filterJumlahSoal").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
                                            var listCekSoal = $firebaseArray(cekSoal);

                                            listCekSoal.$loaded().then(function (response) {
                                                $scope.totalSoal = response.length;
                                                if (response.length !== 0) {
                                                    $scope.aktif = true;
                                                }
                                            });

                                            $ionicPopup.alert({
                                                title: 'SUKSES',
                                                template: 'Soal Sudah Ditambahkan',
                                            });
                                        });
                                    }
                                    else {
                                        $ionicPopup.alert({
                                            title: 'PERHATIAN',
                                            template: 'Jumlah Soal Untuk Ujian Sudah Mencukupi, Terima kasih',
                                        });
                                    }
                                });



                            }
                            else {
                                $ionicPopup.alert({
                                    title: 'PERHATIAN',
                                    template: 'Maaf, Soal ini sudah dimasukkan kedalam ujian, Cek kembali, Terima kasih',
                                });
                            }
                        });

                    }

                    if (index === 1) {

                        $ionicModal.fromTemplateUrl('templates/modal.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            var refSoal = firebase.database(appBankSoal).ref("soal/" + data.$id);
                            $scope.formData = $firebaseObject(refSoal);

                        });

                    }

                    return true;
                },

            });
        };

        $scope.cekSoal = function () {
            $state.go('menuSekolah.soalDetailUTSUASSekolah', {
                "idUTSUAS": $stateParams.idUTSUAS,
                "namaUTSUAS": $stateParams.namaUTSUAS,
                "jenjang": $stateParams.jenjang,
                "tingkatKelas": $stateParams.tingkatKelas,
                "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                "idPelajaran": $stateParams.idPelajaran,
                "pelajaran": $stateParams.pelajaran
            });
        };

        var cekSoal = firebase.database(app).ref("soalUTSUAS").orderByChild("filterJumlahSoal").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
        var listCekSoal = $firebaseArray(cekSoal);

        listCekSoal.$loaded().then(function (response) {
            $scope.totalSoal = response.length;
            if (response.length !== 0) {
                $scope.aktif = true;
            }
        });

    }])

    .controller('soalDetailUTSUASSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolah === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj14") { var app = app_sapta; }


        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran
        };

        var ref = firebase.database(app).ref("soalUTSUAS").orderByChild("filterJumlahSoal").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
        var listRef = $firebaseArray(ref);

        $scope.datas = [];
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            for (i = 0; i < response.length; i++) {
                //console.log(response[i].$id);
                var idSoal = response[i].idSoal;
                var refSoal = firebase.database(appBankSoal).ref("soal/" + idSoal);

                refSoal.on("value", function (snapshot) {
                    $ionicLoading.hide();
                    $scope.dataSoal = snapshot.val();
                    $scope.datas.push({
                        "idSoalUTSUAS": response[i].$id,
                        "idSoal": idSoal,
                        "idPelajaran": $scope.dataSoal.idPelajaran,
                        "jamDisplay": $scope.dataSoal.jamDisplay,
                        "jawabanA": $scope.dataSoal.jawabanA,
                        "jawabanB": $scope.dataSoal.jawabanB,
                        "jawabanC": $scope.dataSoal.jawabanC,
                        "jawabanD": $scope.dataSoal.jawabanD,
                        "jawabanE": $scope.dataSoal.jawabanE,
                        "jenisSoal": $scope.dataSoal.jenisSoal,
                        "jenjang": $scope.dataSoal.jenjang,
                        "tingkatKelas": $scope.dataSoal.tingkatKelas,
                        "kunciJawaban": $scope.dataSoal.kunciJawaban,
                        "pelajaran": $scope.dataSoal.pelajaran,
                        "pembahasanSoal": $scope.dataSoal.pembahasanSoal,
                        "publish": $scope.dataSoal.publish,
                        "soal": $scope.dataSoal.soal,
                        "tanggalDisplay": $scope.dataSoal.tanggalDisplay,
                        "videoPembahasan": $scope.dataSoal.videoPembahasan
                    });
                })
            }

        });

        $scope.getData = function (data) {


            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Pelajaran : ' + data.pelajaran + ", " + data.jenjang + ", " + $scope.data.tingkatKelas,
                buttons: [

                    { text: '<i class="icon ion-checkmark-circled"></i> Lihat Soal' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Soal Ujian',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {

                    if (index === 0) {
                        $ionicModal.fromTemplateUrl('templates/modal.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            var refSoal = firebase.database(appBankSoal).ref("soal/" + data.idSoal);
                            $scope.formData = $firebaseObject(refSoal);

                        });
                    }

                    return true;
                },

                destructiveButtonClicked: function () {
                    var refObj = firebase.database(app).ref("soalUTSUAS/" + data.idSoalUTSUAS);
                    var objDelete = $firebaseObject(refObj);
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Soal Ujian Ini?',
                        okType: "button-balanced",
                    });
                    confirmPopup.then(function (res) {
                        if (res) {
                            objDelete.$remove().then(function (ref) {

                                var ref = firebase.database(app).ref("soalUTSUAS").orderByChild("filterJumlahSoal").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
                                var listRef = $firebaseArray(ref);

                                $scope.datas = [];
                                //$ionicLoading.show();
                                listRef.$loaded().then(function (response) {
                                    for (i = 0; i < response.length; i++) {
                                        //console.log(response[i].$id);
                                        var idSoal = response[i].idSoal;
                                        var refSoal = firebase.database(appBankSoal).ref("soal/" + idSoal);

                                        refSoal.on("value", function (snapshot) {
                                            //$ionicLoading.hide();
                                            $scope.dataSoal = snapshot.val();
                                            $scope.datas.push({
                                                "idSoalUTSUAS": response[i].$id,
                                                "idSoal": idSoal,
                                                "idPelajaran": $scope.dataSoal.idPelajaran,
                                                "jamDisplay": $scope.dataSoal.jamDisplay,
                                                "jawabanA": $scope.dataSoal.jawabanA,
                                                "jawabanB": $scope.dataSoal.jawabanB,
                                                "jawabanC": $scope.dataSoal.jawabanC,
                                                "jawabanD": $scope.dataSoal.jawabanD,
                                                "jawabanE": $scope.dataSoal.jawabanE,
                                                "jenisSoal": $scope.dataSoal.jenisSoal,
                                                "jenjang": $scope.dataSoal.jenjang,
                                                "tingkatKelas": $scope.dataSoal.tingkatKelas,
                                                "kunciJawaban": $scope.dataSoal.kunciJawaban,
                                                "pelajaran": $scope.dataSoal.pelajaran,
                                                "pembahasanSoal": $scope.dataSoal.pembahasanSoal,
                                                "publish": $scope.dataSoal.publish,
                                                "soal": $scope.dataSoal.soal,
                                                "tanggalDisplay": $scope.dataSoal.tanggalDisplay,
                                                "videoPembahasan": $scope.dataSoal.videoPembahasan
                                            });
                                        })
                                    }

                                });

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

    .controller('ulangUjianUTSUASSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolah === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolah === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolah === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }
        else if ($scope.idSekolah === "-MPyESRb8UVcQBHz7pxj14") { var app = app_sapta; }


        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran
        };

        var refPesertaUTSUAS = firebase.database(app).ref("pesertaUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        var listPesertaUTSUAS = $firebaseArray(refPesertaUTSUAS);

        listPesertaUTSUAS.$loaded().then(function (response) {
            $scope.dataPesertaUTSUAS = response;
            console.log($scope.dataPesertaUTSUAS.idKelas);
            for (i = 0; i < response.length; i++) {
                var idKelas = response[i].idKelas;
                console.log(idKelas);

                $scope.getDataHapus = function (data) {

                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Reset Jawaban Peserta',
                        template: 'Apakah Kamu Yakin Ingin Mereset Semua Jawaban Ujian Peserta Ini?',
                        okType: "button-balanced",
                    });

                    console.log(data.idKelas);
                    confirmPopup.then(function (res) {
                        if (res) {

                            //Menghapus Rekap Jawaban UTSUAS Siswa
                            // var rekapJawaban = firebase.database().ref("rekapJawabanUTSUASSiswa").orderByChild("filter").equalTo($stateParams.idUTSUAS+"_"+data.uid);
                            // rekapJawaban.on("child_added", function(snapshot){
                            //     //console.log(snapshot.val());
                            //     var id = snapshot.key;
                            //     var cekRekap = firebase.database().ref("rekapJawabanUTSUASSiswa/"+id+"/pelajaran").orderByChild("idPelajaranUTSUAS").equalTo($stateParams.idPelajaranUTSUAS);
                            //     cekRekap.on("child_added", function(snapshot){
                            //         var idNya = snapshot.key;
                            //         var hapusRekap = firebase.database().ref("rekapJawabanUTSUASSiswa/"+id+"/pelajaran/"+idNya);
                            //         var objDelete = $firebaseObject(hapusRekap);
                            //         objDelete.$remove().then(function(ref) {
                            //             console.log('Rekap Jawaban Berhasil Dihapus');
                            //         });
                            //     });
                            // });

                            console.log('CEK 1');
                            console.log($scope.data.idUTSUAS);
                            console.log(data.idKelas);
                            console.log(data.uid);
                            //Menghapus Jawaban UTSUAS Siswa
                            var jawabanUTSUASSiswa = firebase.database(app).ref("jawabanUTSUASSiswa/" + $scope.data.idUTSUAS + '/' + data.uid);
                            var refJawabanUTSUASSiswa = $firebaseArray(jawabanUTSUASSiswa);

                            console.log('CEK123' + refJawabanUTSUASSiswa);

                            refJawabanUTSUASSiswa.$loaded().then(function (response) {
                                console.log(response);

                                for (i = 0; i < response.length; i++) {
                                    var id = response[i].$id;
                                    // console.log('CEK123' + refJawabanUTSUASSiswa);
                                    console.log(id);

                                    var hapusJawabanUTSUASSiswa = firebase.database(app).ref("jawabanUTSUASSiswa/" +$scope.data.idUTSUAS + '/' + data.uid+'/'+  id);
                                    var objDelete = $firebaseObject(hapusJawabanUTSUASSiswa);
                                    objDelete.$remove().then(function (ref) {
                                        console.log('Jawaban UTSUAS Siswa Berhasil Dihapus');
                                    });
                                }
                            });

                            console.log('CEK 2');
                            console.log($scope.data.idUTSUAS);
                            console.log($scope.data.idPelajaran);
                            console.log(data.uid);
                            //Menghapus Jawaban UTSUAS Siswa PerPelajaran
                            var jawabanUTSUASSiswaPerPelajaran = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS + '/' + data.idKelas + '/' + data.uid).orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS + "_" + data.uid);
                            var refJawabanUTSUASSiswaPerPelajaran = $firebaseArray(jawabanUTSUASSiswaPerPelajaran);

                            refJawabanUTSUASSiswaPerPelajaran.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {
                                    var id = response[i].$id;

                                    var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS + '/' + data.idKelas + '/' + data.uid+ '/' + id);

                                    updateJawabanUTSUASSiswaPerPelajaran.update(JSON.parse(JSON.stringify({
                                        "benar": 0,
                                        "salah": 0,
                                        "kosong": 0,
                                        "nilai": 0,
                                        "statusFinish": false,
                                        "bukaUjianSekarang": false,
                                        "tutupUjianSekarang": false,
                                        "jumlahSoal": 0,
                                        "statusTerjawab": false,
                                    }))).then(function (resp) {
                                        console.log("jawabanUTSUASSiswaPerPelajaran-Terhapus");
                                        $ionicPopup.alert({
                                            title: 'SUKSES',
                                            template: "Ulang Ujian Siswa Sukses",
                                            okType: "button-balanced"
                                        });
                                    });
                                }

                            });

                        }
                        else {
                        }
                    });

                };

            }
        });

    }])