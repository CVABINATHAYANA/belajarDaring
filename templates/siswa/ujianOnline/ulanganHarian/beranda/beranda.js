angular.module('app.berandaUjianOnlineSiswa', [])

    .controller('berandaUjianOnlineSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        // LOADBALANCING
        if ($scope.idSekolahSiswa === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolahSiswa === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }


        // console.log($scope.idPenggunaSiswa);
        // console.log($scope.namaPenggunaSiswa);
        // console.log($scope.emailSiswa);
        // console.log($scope.uidSiswa);
        // console.log($scope.idSekolahSiswa);
        // console.log($scope.jenjangSiswa);
        // console.log($scope.idProvinsiSiswa);
        // console.log($scope.idKotaKabupatenSiswa);
        // console.log($scope.idKecamatanSiswa);

        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        var ref = firebase.database(app).ref("pesertaUjianOnline").orderByChild("uid").equalTo($scope.uidSiswa);
        var list = $firebaseArray(ref);

        $scope.datas = [];
        $ionicLoading.show();
        list.$loaded().then(function (response) {
            // console.log(response);
            if (response.length === 0) {
                $ionicLoading.hide();
                $scope.informasi = true;
            }
            else {
                for (i = 0; i < response.length; i++) {
                    $scope.informasi = false;
                    var idUjian = response[i].idUjian;
                    var refUjianOnine = firebase.database(app).ref("ujianOnline/" + response[i].idUjian);
                    refUjianOnine.on("value", function (snapshot) {
                        $ionicLoading.hide();
                        $scope.namaUjian = snapshot.val();
                        //console.log($scope.namaUjian)
                        $scope.datas.push($scope.namaUjian);
                    })
                }
            }
        });

        $scope.refresh = function () {
            $ionicLoading.show();
            list.$loaded().then(function (response) {
                if (response.length === 0) {
                    $ionicLoading.hide();
                    $scope.informasi = true;
                }
                else {
                    for (i = 0; i < response.length; i++) {
                        $scope.informasi = false;
                        var idUjian = response[i].idUjian;
                        var refnamaUjian = firebase.database(app).ref("ujianOnline/" + idUjian);
                        refnamaUjian.on("value", function (snapshot) {
                            $ionicLoading.hide();
                            $scope.namaUjian = snapshot.val();
                            //console.log($scope.namaUjian)
                            $scope.datas.push($scope.namaUjian);
                        })
                    }
                }
            });
        };

        $scope.getUjian = function (data) {

            console.log(data);
            $ionicActionSheet.show({
                titleText: 'Ujian : ' + data.namaUjian,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Mulai Ujian' },
                    { text: '<i class="icon ion-ios-list-outline"></i> Detail Ujian' },
                    { text: '<i class="icon ion-android-bulb"></i> Kisi-kisi Ujian' },
                    { text: '<i class="icon ion-ios-people"></i> Peserta Ujian' },
                    { text: '<i class="icon ion-arrow-graph-up-right"></i> Nilai Anda' },
                    { text: '<i class="icon ion-trophy"></i> Peringkat Anda' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus UjianOnline',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        // console.log('tes')
                        var getData = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa").orderByChild("filter").equalTo(data.idUjian + "_" + $scope.uidSiswa);
                        getData.on("child_added", function (snapshot) {
                            // console.log(snapshot.key)
                            // console.log(snapshot.val())
                            $state.go('menuSiswa.mulaiUjianOnlineSiswa', {
                                "idUjian": data.idUjian,
                                "namaUjian": data.namaUjian,
                                "jenjang": data.jenjang,
                                "UjianOnlineTingkat": data.UjianOnlineTingkat,
                                "namaKotaKabupaten": data.namaKotaKabupaten,
                                "namaProvinsi": data.namaProvinsi,
                                "idSemester": data.idSemester,
                                "semester": data.semester,
                                "idTahunAjaran": data.idTahunAjaran,
                                "tahunAjaran": data.tahunAjaran,
                                "idRekapJawabanUjianOnlineSiswa": snapshot.key,
                                "namaSekolah": data.namaSekolah,
                                "namaKelas": data.namaKelas,
                                "namaGuru": data.namaGuru,
                                "jenisUjian": data.jenisUjian,
                                "tingkatKelas": data.tingkatKelas,
                            });
                        });

                    }
                    if (index === 1) {
                        $state.go('menuSiswa.UjianOnlineDetaiSiswa', {
                            "idUjian": data.idUjian,
                            "namaUjian": data.namaUjian,
                            "jenjang": data.jenjang,
                            "UjianOnlineTingkat": data.UjianOnlineTingkat,
                            "namaKotaKabupaten": data.namaKotaKabupaten,
                            "namaProvinsi": data.namaProvinsi,
                            "semester": data.semester,
                            "tahunAjaran": data.tahunAjaran,
                            "namaSekolah": data.namaSekolah,
                            "namaKelas": data.namaKelas,
                            "namaGuru": data.namaGuru,
                            "jenisUjian": data.jenisUjian,
                            "tingkatKelas": data.tingkatKelas,
                        });
                    }
                    if (index === 2) {
                        $state.go('menuSiswa.kisiKisiSoalUjianOnlineSiswa', {
                            "idUjian": data.idUjian,
                            "namaUjian": data.namaUjian,
                            "jenjang": data.jenjang,
                            "UjianOnlineTingkat": data.UjianOnlineTingkat,
                            "namaKotaKabupaten": data.namaKotaKabupaten,
                            "namaProvinsi": data.namaProvinsi,
                            "semester": data.semester,
                            "tahunAjaran": data.tahunAjaran
                        });
                    }

                    if (index === 3) {
                        $state.go('menuSiswa.pesertaUjianOnlineSiswa', {
                            "idUjian": data.idUjian,
                            "namaUjian": data.namaUjian,
                            "jenjang": data.jenjang,
                            "UjianOnlineTingkat": data.UjianOnlineTingkat,
                            "namaKotaKabupaten": data.namaKotaKabupaten,
                            "namaProvinsi": data.namaProvinsi,
                            "semester": data.semester,
                            "tahunAjaran": data.tahunAjaran
                        });
                    }
                    if (index === 4) {

                        var getData = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa").orderByChild("filter").equalTo(data.idUjian + "_" + $scope.uidSiswa);
                        getData.on("child_added", function (snapshot) {

                            var avgNilai = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + snapshot.key + "/pelajaran");
                            var listAvgNilai = $firebaseArray(avgNilai);

                            $scope.nilaiTotal = 0;
                            $scope.dataArray = [];
                            listAvgNilai.$loaded().then(function (response) {
                                // $ionicLoading.show();
                                for (i = 0; i < response.length; i++) {
                                    if (response[i].nilai !== undefined) {
                                        //console.log(response[i].nilai);
                                        $scope.dataArray.push({
                                            "data": response[i].nilai
                                        });
                                        //console.log("dataArray", $scope.dataArray.length);
                                        var penilaian = response[i].nilai;
                                        $scope.nilaiTotal = $scope.nilaiTotal + penilaian;
                                        $scope.avg = $scope.nilaiTotal / $scope.dataArray.length;
                                        // console.log("total Nilai", $scope.nilaiTotal);
                                        // console.log("avg", $scope.avg);
                                        var updateNilaiRata = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + snapshot.key);

                                        updateNilaiRata.update(JSON.parse(JSON.stringify({
                                            "jumlahNilai": $scope.nilaiTotal,
                                            "rataRata": $scope.avg,
                                        }))).then(function (resp) {
                                            // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                                            $ionicLoading.hide();
                                            $state.go('menuSiswa.nilaiAndaUjianOnlineSiswa', {
                                                "idUjian": data.idUjian,
                                                "namaUjian": data.namaUjian,
                                                "jenjang": data.jenjang,
                                                "UjianOnlineTingkat": data.UjianOnlineTingkat,
                                                "namaKotaKabupaten": data.namaKotaKabupaten,
                                                "namaProvinsi": data.namaProvinsi,
                                                "semester": data.semester,
                                                "tahunAjaran": data.tahunAjaran,
                                                "idRekapJawabanUjianOnlineSiswa": snapshot.key
                                            });
                                        });
                                    }

                                }

                            });

                        });

                    }

                    if (index === 5) {
                        var getData = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa").orderByChild("filter").equalTo(data.idUjian + "_" + $scope.uidSiswa);
                        getData.on("child_added", function (snapshot) {

                            var avgNilai = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + snapshot.key + "/pelajaran");
                            var listAvgNilai = $firebaseArray(avgNilai);

                            $scope.nilaiTotal = 0;
                            $scope.dataArray = [];
                            listAvgNilai.$loaded().then(function (response) {
                                // $ionicLoading.show();
                                for (i = 0; i < response.length; i++) {
                                    if (response[i].nilai !== undefined) {
                                        $scope.dataArray.push({
                                            "data": response[i].nilai
                                        });
                                        var penilaian = response[i].nilai;
                                        $scope.nilaiTotal = $scope.nilaiTotal + penilaian;
                                        $scope.avg = $scope.nilaiTotal / $scope.dataArray.length;
                                        // console.log("total Nilai", $scope.nilaiTotal);
                                        // console.log("avg", $scope.avg);
                                        var updateNilaiRata = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + snapshot.key);
                                        updateNilaiRata.update(JSON.parse(JSON.stringify({
                                            "jumlahNilai": $scope.nilaiTotal,
                                            "rataRata": $scope.avg,
                                        }))).then(function (resp) {
                                            // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                                            $ionicLoading.hide();
                                            $state.go('menuSiswa.peringkatAndaUjianOnlineSiswa', {
                                                "idUjian": data.idUjian,
                                                "namaUjian": data.namaUjian,
                                                "jenjang": data.jenjang,
                                                "UjianOnlineTingkat": data.UjianOnlineTingkat,
                                                "namaKotaKabupaten": data.namaKotaKabupaten,
                                                "namaProvinsi": data.namaProvinsi,
                                                "semester": data.semester,
                                                "tahunAjaran": data.tahunAjaran,
                                                "totalSiswaLolos": data.totalSiswaLolos,
                                            });
                                        });
                                    }

                                }

                            });

                        });
                    }

                    return true;
                },

            });

        };

    }])