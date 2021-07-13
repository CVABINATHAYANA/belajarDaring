angular.module('app.berandaSOCSiswa', [])

    .controller('berandaSOCSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa')

        // console.log($scope.idPenggunaSiswa);
        console.log($scope.namaPenggunaSiswa);
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

        var ref = firebase.database().ref("pesertaOlimpiade").orderByChild("uid").equalTo($scope.uidSiswa);
        var list = $firebaseArray(ref);

        $scope.datas = [];
        $ionicLoading.show();
        list.$loaded().then(function (response) {
            //console.log(response);
            if (response.length === 0) {
                $ionicLoading.hide();
                $scope.informasi = true;
            }
            else {
                for (i = 0; i < response.length; i++) {
                    $scope.informasi = false;
                    var idTryout = response[i].idTryout;
                    var refNamaTryout = firebase.database().ref("namaTryout/" + idTryout);

                    refNamaTryout.on("value", function (snapshot) {
                        $ionicLoading.hide();
                        $scope.namaTryout = snapshot.val();
                        //console.log($scope.namaTryout)
                        $scope.datas.push($scope.namaTryout);
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
                    for (i = 0; i <= response.length; i++) {
                        $scope.informasi = false;
                        var idTryout = response[i].idTryout;
                        var refNamaTryout = firebase.database().ref("namaTryout/" + idTryout);

                        refNamaTryout.on("value", function (snapshot) {
                            $ionicLoading.hide();
                            $scope.namaTryout = snapshot.val();
                            //console.log($scope.namaTryout)
                            $scope.datas.push($scope.namaTryout);
                        })
                    }
                }
            });
        };

        $scope.getUjian = function (data) {

            // console.log(data);
            $ionicActionSheet.show({
                titleText: 'Olimpiade : ' + data.namaTryout,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Mulai Olimpiade' },
                    { text: '<i class="icon ion-ios-list-outline"></i> Detail Olimpiade' },
                    { text: '<i class="icon ion-android-bulb"></i> Kisi-kisi Olimpiade' },
                    { text: '<i class="icon ion-ios-people"></i> Peserta Olimpiade' },
                    { text: '<i class="icon ion-arrow-graph-up-right"></i> Nilai Anda' },
                    { text: '<i class="icon ion-trophy"></i> Peringkat Anda' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus SOC',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        console.log('tes')
                        var getData = firebase.database().ref("rekapJawabanOlimpiadeSiswa").orderByChild("filter").equalTo(data.idTryout + "_" + $scope.uidSiswa);
                        getData.on("child_added", function (snapshot) {
                            // console.log(snapshot.key)
                            // console.log(snapshot.val())
                            $state.go('menuSiswa.mulaiOlimpiadeSOCSiswa', {
                                "idTryout": data.idTryout,
                                "namaTryout": data.namaTryout,
                                "jenjang": data.jenjang,
                                "olimpiadeTingkat": data.olimpiadeTingkat,
                                "namaKota": data.namaKota,
                                "namaProvinsi": data.namaProvinsi,
                                "semester": data.semester,
                                "tahunAjaran": data.tahunAjaran,
                                "idRekapJawabanOlimpiadeSiswa": snapshot.key,
                            });
                        });

                    }
                    if (index === 1) {
                        $state.go('menuSiswa.olimpiadeDetailSOCSiswa', {
                            "idTryout": data.idTryout,
                            "namaTryout": data.namaTryout,
                            "jenjang": data.jenjang,
                            "olimpiadeTingkat": data.olimpiadeTingkat,
                            "namaKota": data.namaKota,
                            "namaProvinsi": data.namaProvinsi,
                            "semester": data.semester,
                            "tahunAjaran": data.tahunAjaran
                        });
                    }
                    if (index === 2) {
                        $state.go('menuSiswa.kisiKisiSoalSOCSiswa', {
                            "idTryout": data.idTryout,
                            "namaTryout": data.namaTryout,
                            "jenjang": data.jenjang,
                            "olimpiadeTingkat": data.olimpiadeTingkat,
                            "namaKota": data.namaKota,
                            "namaProvinsi": data.namaProvinsi,
                            "semester": data.semester,
                            "tahunAjaran": data.tahunAjaran
                        });
                    }

                    if (index === 3) {
                        $state.go('menuSiswa.pesertaOlimpiadeSOCSiswa', {
                            "idTryout": data.idTryout,
                            "namaTryout": data.namaTryout,
                            "jenjang": data.jenjang,
                            "olimpiadeTingkat": data.olimpiadeTingkat,
                            "namaKota": data.namaKota,
                            "namaProvinsi": data.namaProvinsi,
                            "semester": data.semester,
                            "tahunAjaran": data.tahunAjaran
                        });
                    }
                    if (index === 4) {

                        var getData = firebase.database().ref("rekapJawabanOlimpiadeSiswa").orderByChild("filter").equalTo(data.idTryout + "_" + $scope.uidSiswa);
                        getData.on("child_added", function (snapshot) {

                            var avgNilai = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + snapshot.key + "/pelajaran");
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
                                        var updateNilaiRata = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + snapshot.key);

                                        updateNilaiRata.update(JSON.parse(JSON.stringify({
                                            "jumlahNilai": $scope.nilaiTotal,
                                            "rataRata": $scope.avg,
                                        }))).then(function (resp) {
                                            // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                                            $ionicLoading.hide();
                                            $state.go('menuSiswa.nilaiAndaSOCSiswa', {
                                                "idTryout": data.idTryout,
                                                "namaTryout": data.namaTryout,
                                                "jenjang": data.jenjang,
                                                "olimpiadeTingkat": data.olimpiadeTingkat,
                                                "namaKota": data.namaKota,
                                                "namaProvinsi": data.namaProvinsi,
                                                "semester": data.semester,
                                                "tahunAjaran": data.tahunAjaran,
                                                "idRekapJawabanOlimpiadeSiswa": snapshot.key
                                            });
                                        });
                                    }

                                }

                            });

                        });

                    }

                    if (index === 5) {
                        var getData = firebase.database().ref("rekapJawabanOlimpiadeSiswa").orderByChild("filter").equalTo(data.idTryout + "_" + $scope.uidSiswa);
                        getData.on("child_added", function (snapshot) {

                            var avgNilai = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + snapshot.key + "/pelajaran");
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
                                        var updateNilaiRata = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + snapshot.key);
                                        updateNilaiRata.update(JSON.parse(JSON.stringify({
                                            "jumlahNilai": $scope.nilaiTotal,
                                            "rataRata": $scope.avg,
                                        }))).then(function (resp) {
                                            // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                                            $ionicLoading.hide();
                                            $state.go('menuSiswa.peringkatAndaSOCSiswa', {
                                                "idTryout": data.idTryout,
                                                "namaTryout": data.namaTryout,
                                                "jenjang": data.jenjang,
                                                "olimpiadeTingkat": data.olimpiadeTingkat,
                                                "namaKota": data.namaKota,
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