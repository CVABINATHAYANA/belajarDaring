angular.module('app.berandaUTSUASSiswa', [])

    .controller('berandaUTSUASSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        // $scope.idKelas = localStorage.getItem('idKelas');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')
        
        // LOADBALANCING
        if ($scope.idSekolahSiswa === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolahSiswa === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }


        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        var ref = firebase.database(appSiswa).ref("dataSiswa/" + $scope.idPenggunaSiswa);
        $ionicLoading.show();
        ref.on('value', function (snapshot) {
            $ionicLoading.hide();
            $scope.formData = snapshot.val();
            console.log('FORM',$scope.formData)
        });

        // var ref = firebase.database(appUTSUASOnline).ref("pesertaUTSUAS").orderByChild("uid").equalTo($scope.uidSiswa);
        // var list = $firebaseArray(ref);

        // $scope.datas = [];
        // // $ionicLoading.show();
        // list.$loaded().then(function (response) {
        //     // console.log(response);
        //     if (response.length === 0) {
        //         $ionicLoading.hide();
        //         $scope.informasi = true;
        //     }
        //     else {
        //         for (i = 0; i < response.length; i++) {
        //             $scope.informasi = false;
        //             var idUTSUAS = response[i].idUTSUAS;
        //             var refNamaUTSUAS = firebase.database(appUTSUASOnline).ref("namaUTSUAS/" + idUTSUAS);
        //             var objRefNamaUTSUAS = $firebaseObject(refNamaUTSUAS);
        //             objRefNamaUTSUAS.$loaded().then(function (response) {
        //                 $ionicLoading.hide();
        //                 $scope.namaUTSUAS = response;
        //                 $scope.datas.push($scope.namaUTSUAS);
        //             })
        //         }
        //     }
        // });

        var ref = firebase.database(app).ref("pesertaUTSUAS").orderByChild("uid").equalTo($scope.uidSiswa);
        var list = $firebaseArray(ref);

        $scope.datas = [];
        $ionicLoading.show();
        list.$loaded().then(function (response) {
            console.log(response);
            if (response.length === 0) {
                $ionicLoading.hide();
                $scope.informasi = true;
            }
            else {
                for (i = 0; i < response.length; i++) {
                    $scope.informasi = false;
                    var idUTSUAS = response[i].idUTSUAS;
                    // console.log(idUTSUAS)
                    var refNamaUTSUAS = firebase.database(app).ref("namaUTSUAS/" + idUTSUAS);
                    var objRefNamaUTSUAS = $firebaseObject(refNamaUTSUAS);
                    objRefNamaUTSUAS.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.namaUTSUAS = response;
                        $scope.datas.push($scope.namaUTSUAS);
                        // console.log(response)
                    })
                }
            }
        });

        $scope.refresh = function () {
            // console.log('yesIniRefresh')
            // $ionicLoading.show();
            // var ref = firebase.database(appUTSUASOnline).ref("pesertaUTSUAS").orderByChild("uid").equalTo($scope.uidSiswa);
            // var list = $firebaseArray(ref);

            // $scope.datas = [];
            // $ionicLoading.show();
            // list.$loaded().then(function (response) {
            //     console.log(response);
            //     if (response.length === 0) {
            //         $ionicLoading.hide();
            //         $scope.informasi = true;
            //     }
            //     else {
            //         for (i = 0; i < response.length; i++) {
            //             $scope.informasi = false;
            //             var idUTSUAS = response[i].idUTSUAS;
            //             var refNamaUTSUAS = firebase.database(appUTSUASOnline).ref("namaUTSUAS/" + idUTSUAS);
            //             var objRefNamaUTSUAS = $firebaseObject(refNamaUTSUAS);
            //             objRefNamaUTSUAS.$loaded().then(function (response) {
            //                 $ionicLoading.hide();
            //                 $scope.namaUTSUAS = response;
            //                 $scope.datas.push($scope.namaUTSUAS);
            //             })
            //         }
            //     }
            // });

            $ionicLoading.show();
            var ref = firebase.database(app).ref("pesertaUTSUAS").orderByChild("uid").equalTo($scope.uidSiswa);
            var list = $firebaseArray(ref);

            $scope.datas = [];
            $ionicLoading.show();
            list.$loaded().then(function (response) {
                console.log(response);
                if (response.length === 0) {
                    $ionicLoading.hide();
                    $scope.informasi = true;
                }
                else {
                    for (i = 0; i < response.length; i++) {
                        $scope.informasi = false;
                        var idUTSUAS = response[i].idUTSUAS;
                        var refNamaUTSUAS = firebase.database(app).ref("namaUTSUAS/" + idUTSUAS);
                        var objRefNamaUTSUAS = $firebaseObject(refNamaUTSUAS);
                        objRefNamaUTSUAS.$loaded().then(function (response) {
                            $ionicLoading.hide();
                            $scope.namaUTSUAS = response;
                            $scope.datas.push($scope.namaUTSUAS);
                        })
                    }
                }
            });
        };

        $scope.getUjian = function (data) {

            console.log(data);
            var updateData = firebase.database(app).ref("namaUTSUAS/" + data.$id).update(JSON.parse(JSON.stringify({
                "idUTSUAS": data.$id
            })))
            $ionicActionSheet.show({
                titleText: 'UTSUAS : ' + data.namaUTSUAS,
                text: 'MENU UTS UAS MASIH DALAM PERBAIKAN, MOHON MENUNGGU BEBERAPA SAAT LAGI',
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Mulai Ujian' },
                    { text: '<i class="icon ion-ios-list-outline"></i> Detail Ujian' },
                    { text: '<i class="icon ion-android-bulb"></i> Kisi-kisi Ujian' },
                    { text: '<i class="icon ion-ios-people"></i> Peserta Ujian' },
                    { text: '<i class="icon ion-arrow-graph-up-right"></i> Nilai Anda' },
                    { text: '<i class="icon ion-trophy"></i> Peringkat Anda' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus UTSUAS',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    console.log("TES");
                    console.log("idUTSUAS "+data.$id);
                    console.log("idKelas "+$scope.formData.idKelas);
                    console.log("uid "+$scope.uidSiswa);

                    if (index === 0) {
                        // console.log('tes')
                        var getData = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +data.$id).orderByChild("filter").equalTo(data.idUTSUAS + "_" + $scope.uidSiswa);
                        getData.on("child_added", function (snapshot) {
                            // console.log(snapshot.key)
                            // console.log(snapshot.val())
                            $state.go('menuSiswa.mulaiUTSUASSiswa', {
                                "idUTSUAS": data.$id,
                                "namaUTSUAS": data.namaUTSUAS,
                                "jenjang": data.jenjang,
                                "utsUasTingkat": data.utsUasTingkat,
                                "namaKota": data.namaKota,
                                "namaProvinsi": data.namaProvinsi,
                                "semester": data.semester,
                                "tahunAjaran": data.tahunAjaran,
                                "idRekapJawabanUTSUASSiswa": snapshot.key,
                                "idKelas": $scope.formData.idKelas,
                                "siswauid": $scope.uidSiswa,

                            });
                        });

                    }
                    if (index === 1) {
                        $state.go('menuSiswa.UTSUASDetailSiswa', {
                            "idUTSUAS": data.idUTSUAS,
                            "namaUTSUAS": data.namaUTSUAS,
                            "jenjang": data.jenjang,
                            "utsUasTingkat": data.utsUasTingkat,
                            "namaKota": data.namaKota,
                            "namaProvinsi": data.namaProvinsi,
                            "semester": data.semester,
                            "tahunAjaran": data.tahunAjaran,
                            "idKelas": $scope.formData.idKelas,
                            "siswauid": $scope.uidSiswa,
                        });
                    }
                    if (index === 2) {
                        $state.go('menuSiswa.kisiKisiSoalUTSUASSiswa', {
                            "idUTSUAS": data.idUTSUAS,
                            "namaUTSUAS": data.namaUTSUAS,
                            "jenjang": data.jenjang,
                            "utsUasTingkat": data.utsUasTingkat,
                            "namaKota": data.namaKota,
                            "namaProvinsi": data.namaProvinsi,
                            "semester": data.semester,
                            "tahunAjaran": data.tahunAjaran,
                            "idKelas": $scope.formData.idKelas,
                            "siswauid": $scope.uidSiswa,
                        });
                    }

                    if (index === 3) {
                        $state.go('menuSiswa.pesertaUTSUASSiswa', {
                            "idUTSUAS": data.idUTSUAS,
                            "namaUTSUAS": data.namaUTSUAS,
                            "jenjang": data.jenjang,
                            "utsUasTingkat": data.utsUasTingkat,
                            "namaKota": data.namaKota,
                            "namaProvinsi": data.namaProvinsi,
                            "semester": data.semester,
                            "tahunAjaran": data.tahunAjaran,
                            "idKelas": $scope.formData.idKelas,
                            "siswauid": $scope.uidSiswa,
                        });
                    }
                    if (index === 4) {
                        console.log($scope.formData.idKelas)
                        var dataUTSUAS = firebase.database(app).ref("namaUTSUAS/" + data.idUTSUAS);
                        var objDataUTSUAS = $firebaseObject(dataUTSUAS);
                        $ionicLoading.show();
                        objDataUTSUAS.$loaded().then(function (response) {
                            $ionicLoading.hide();
                            $scope.objectData = response;
                            console.log($scope.objectData.nilaiDitampilkan);

                            if ($scope.objectData.nilaiDitampilkan === true) {
                                var getData = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +data.$id).orderByChild("filter").equalTo(data.idUTSUAS + "_" + $scope.uidSiswa);
                                var listGetData = $firebaseArray(getData);
                                $ionicLoading.show();
                                listGetData.$loaded().then(function (response) {
                                    $ionicLoading.hide();
                                    $scope.idRekap = response[0].$id;
                                    var avgNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +data.$id+ '/' + $scope.idRekap + "/pelajaran");
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
                                                var updateNilaiRata = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +data.$id+ '/' + $scope.idRekap);

                                                updateNilaiRata.update(JSON.parse(JSON.stringify({
                                                    "jumlahNilai": $scope.nilaiTotal,
                                                    "rataRata": $scope.avg,
                                                    "filterIdUTSUASIdKelas": data.idUTSUAS + "_" + $scope.formData.idKelas,
                                                    "filterIdUTSUASKecamatan": data.idUTSUAS + "_" + $scope.formData.idKecamatan,
                                                    "filterIdUTSUASKecamatanIdSekolah": data.idUTSUAS + "_" + $scope.formData.idKecamatan + "_" + $scope.idSekolahSiswa,
                                                    "filterIdUTSUASKecamatanIdSekolahIdKelas": data.idUTSUAS + "_" + $scope.formData.idKecamatan + "_" + $scope.idSekolahSiswa + "_" + $scope.formData.idKelas,
                                                    "namaKelas": $scope.formData.namaKelas
                                                }))).then(function (resp) {
                                                    // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                                                    $ionicLoading.hide();
                                                    $state.go('menuSiswa.nilaiAndaUTSUASSiswa', {
                                                        "idUTSUAS": data.idUTSUAS,
                                                        "namaUTSUAS": data.namaUTSUAS,
                                                        "jenjang": data.jenjang,
                                                        "utsUasTingkat": data.utsUasTingkat,
                                                        "namaKota": data.namaKota,
                                                        "namaProvinsi": data.namaProvinsi,
                                                        "semester": data.semester,
                                                        "tahunAjaran": data.tahunAjaran,
                                                        "idRekapJawabanUTSUASSiswa": $scope.idRekap,
                                                    });
                                                });
                                            }

                                        }

                                    });
                                })
                            }
                            else if ($scope.objectData.nilaiDitampilkan === false) {
                                $ionicPopup.alert({
                                    title: 'PERHATIAN',
                                    template: 'Maaf, nilai tidak ditampilkan untuk ujian ini, terimakasih',
                                    okType: 'button-positive'
                                });
                            }
                        })

                    }

                    if (index === 5) {

                        var dataUTSUAS = firebase.database(app).ref("namaUTSUAS/" + data.idUTSUAS);
                        dataUTSUAS.on("value", function (snapshot) {
                            if (snapshot.val().nilaiDitampilkan === true) {
                                var getData = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +data.idUTSUAS).orderByChild("filter").equalTo(data.idUTSUAS + "_" + $scope.uidSiswa);
                                var listGetData = $firebaseArray(getData);
                                $ionicLoading.show();
                                listGetData.$loaded().then(function (response) {
                                    $ionicLoading.hide();
                                    $scope.idRekap = response[0].$id;

                                    var avgNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +data.idUTSUAS+ '/' +$scope.idRekap + "/pelajaran");
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
                                                var updateNilaiRata = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +data.$id+ '/' + $scope.idRekap);
                                                updateNilaiRata.update(JSON.parse(JSON.stringify({
                                                    "jumlahNilai": $scope.nilaiTotal,
                                                    "rataRata": $scope.avg,
                                                }))).then(function (resp) {
                                                    // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                                                    $ionicLoading.hide();
                                                    $state.go('menuSiswa.peringkatAndaUTSUASSiswa', {
                                                        "idUTSUAS": data.idUTSUAS,
                                                        "namaUTSUAS": data.namaUTSUAS,
                                                        "jenjang": data.jenjang,
                                                        "utsUasTingkat": data.utsUasTingkat,
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
                            else if (snapshot.val().nilaiDitampilkan === false) {
                                $ionicPopup.alert({
                                    title: 'PERHATIAN',
                                    template: 'Maaf, nilai tidak ditampilkan untuk ujian ini, terimakasih',
                                    okType: 'button-positive'
                                });
                            }
                        })
                    }

                    return true;
                },

            });



            // var updateData = firebase.database(appUTSUASOnline).ref("namaUTSUAS/"+data.$id).update(JSON.parse(JSON.stringify({
            //     "idUTSUAS": data.$id
            // })))
            // $ionicActionSheet.show({
            //     titleText: 'UTSUAS : ' + data.namaUTSUAS,
            //     buttons: [
            //         { text: '<i class="icon ion-checkmark-circled"></i> Mulai Ujian' },
            //         { text: '<i class="icon ion-ios-list-outline"></i> Detail Ujian' },
            //         { text: '<i class="icon ion-android-bulb"></i> Kisi-kisi Ujian' },
            //         { text: '<i class="icon ion-ios-people"></i> Peserta Ujian' },
            //         { text: '<i class="icon ion-arrow-graph-up-right"></i> Nilai Anda' },
            //         { text: '<i class="icon ion-trophy"></i> Peringkat Anda' },
            //     ],
            //     // destructiveText: '<i class="icon ion-trash-b"></i> Hapus UTSUAS',
            //     cancelText: 'Cancel',
            //     cancel: function () {
            //         //console.log('CANCELLED');
            //     },
            //     buttonClicked: function (index) {
            //         if (index === 0) {
            //             // console.log('tes')
            //             var getData = firebase.database(appUTSUASOnline).ref("rekapJawabanUTSUASSiswa").orderByChild("filter").equalTo(data.idUTSUAS + "_" + $scope.uidSiswa);
            //             getData.on("child_added", function (snapshot) {
            //                 // console.log(snapshot.key)
            //                 // console.log(snapshot.val())
            //                 $state.go('menuSiswa.mulaiUTSUASSiswa', {
            //                     "idUTSUAS": data.$id,
            //                     "namaUTSUAS": data.namaUTSUAS,
            //                     "jenjang": data.jenjang,
            //                     "utsUasTingkat": data.utsUasTingkat,
            //                     "namaKota": data.namaKota,
            //                     "namaProvinsi": data.namaProvinsi,
            //                     "semester": data.semester,
            //                     "tahunAjaran": data.tahunAjaran,
            //                     "idRekapJawabanUTSUASSiswa": snapshot.key,
            //                 });
            //             });

            //         }
            //         if (index === 1) {
            //             $state.go('menuSiswa.UTSUASDetailSiswa', {
            //                 "idUTSUAS": data.idUTSUAS,
            //                 "namaUTSUAS": data.namaUTSUAS,
            //                 "jenjang": data.jenjang,
            //                 "utsUasTingkat": data.utsUasTingkat,
            //                 "namaKota": data.namaKota,
            //                 "namaProvinsi": data.namaProvinsi,
            //                 "semester": data.semester,
            //                 "tahunAjaran": data.tahunAjaran
            //             });
            //         }
            //         if (index === 2) {
            //             $state.go('menuSiswa.kisiKisiSoalUTSUASSiswa', {
            //                 "idUTSUAS": data.idUTSUAS,
            //                 "namaUTSUAS": data.namaUTSUAS,
            //                 "jenjang": data.jenjang,
            //                 "utsUasTingkat": data.utsUasTingkat,
            //                 "namaKota": data.namaKota,
            //                 "namaProvinsi": data.namaProvinsi,
            //                 "semester": data.semester,
            //                 "tahunAjaran": data.tahunAjaran
            //             });
            //         }

            //         if (index === 3) {
            //             $state.go('menuSiswa.pesertaUTSUASSiswa', {
            //                 "idUTSUAS": data.idUTSUAS,
            //                 "namaUTSUAS": data.namaUTSUAS,
            //                 "jenjang": data.jenjang,
            //                 "utsUasTingkat": data.utsUasTingkat,
            //                 "namaKota": data.namaKota,
            //                 "namaProvinsi": data.namaProvinsi,
            //                 "semester": data.semester,
            //                 "tahunAjaran": data.tahunAjaran
            //             });
            //         }
            //         if (index === 4) {

            //             var dataUTSUAS = firebase.database(appUTSUASOnline).ref("namaUTSUAS/" + data.idUTSUAS);
            //             var objDataUTSUAS = $firebaseObject(dataUTSUAS);
            //             $ionicLoading.show();
            //             objDataUTSUAS.$loaded().then(function (response) {
            //                 $ionicLoading.hide();
            //                 $scope.objectData = response;
            //                 console.log($scope.objectData.nilaiDitampilkan);

            //                 if ($scope.objectData.nilaiDitampilkan === true) {
            //                     var getData = firebase.database(appUTSUASOnline).ref("rekapJawabanUTSUASSiswa").orderByChild("filter").equalTo(data.idUTSUAS + "_" + $scope.uidSiswa);
            //                     var listGetData = $firebaseArray(getData);
            //                     $ionicLoading.show();
            //                     listGetData.$loaded().then(function (response) {
            //                         $ionicLoading.hide();
            //                         $scope.idRekap = response[0].$id;
            //                         var avgNilai = firebase.database(appUTSUASOnline).ref("rekapJawabanUTSUASSiswa/" + $scope.idRekap + "/pelajaran");
            //                         var listAvgNilai = $firebaseArray(avgNilai);

            //                         $scope.nilaiTotal = 0;
            //                         $scope.dataArray = [];
            //                         listAvgNilai.$loaded().then(function (response) {
            //                             // $ionicLoading.show();
            //                             for (i = 0; i < response.length; i++) {
            //                                 if (response[i].nilai !== undefined) {
            //                                     //console.log(response[i].nilai);
            //                                     $scope.dataArray.push({
            //                                         "data": response[i].nilai
            //                                     });
            //                                     //console.log("dataArray", $scope.dataArray.length);
            //                                     var penilaian = response[i].nilai;
            //                                     $scope.nilaiTotal = $scope.nilaiTotal + penilaian;
            //                                     $scope.avg = $scope.nilaiTotal / $scope.dataArray.length;
            //                                     // console.log("total Nilai", $scope.nilaiTotal);
            //                                     // console.log("avg", $scope.avg);
            //                                     var updateNilaiRata = firebase.database(appUTSUASOnline).ref("rekapJawabanUTSUASSiswa/" + $scope.idRekap);

            //                                     updateNilaiRata.update(JSON.parse(JSON.stringify({
            //                                         "jumlahNilai": $scope.nilaiTotal,
            //                                         "rataRata": $scope.avg,
            //                                     }))).then(function (resp) {
            //                                         // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
            //                                         $ionicLoading.hide();
            //                                         $state.go('menuSiswa.nilaiAndaUTSUASSiswa', {
            //                                             "idUTSUAS": data.idUTSUAS,
            //                                             "namaUTSUAS": data.namaUTSUAS,
            //                                             "jenjang": data.jenjang,
            //                                             "utsUasTingkat": data.utsUasTingkat,
            //                                             "namaKota": data.namaKota,
            //                                             "namaProvinsi": data.namaProvinsi,
            //                                             "semester": data.semester,
            //                                             "tahunAjaran": data.tahunAjaran,
            //                                             "idRekapJawabanUTSUASSiswa": $scope.idRekap
            //                                         });
            //                                     });
            //                                 }

            //                             }

            //                         });
            //                     })
            //                 }
            //                 else if ($scope.objectData.nilaiDitampilkan === false) {
            //                     $ionicPopup.alert({
            //                         title: 'PERHATIAN',
            //                         template: 'Maaf, nilai tidak ditampilkan untuk ujian ini, terimakasih',
            //                         okType: 'button-positive'
            //                     });
            //                 }
            //             })

            //         }

            //         if (index === 5) {

            //             var dataUTSUAS = firebase.database(appUTSUASOnline).ref("namaUTSUAS/" + data.idUTSUAS);
            //             dataUTSUAS.on("value", function (snapshot) {
            //                 if (snapshot.val().nilaiDitampilkan === true) {
            //                     var getData = firebase.database(appUTSUASOnline).ref("rekapJawabanUTSUASSiswa").orderByChild("filter").equalTo(data.idUTSUAS + "_" + $scope.uidSiswa);
            //                     var listGetData = $firebaseArray(getData);
            //                     $ionicLoading.show();
            //                     listGetData.$loaded().then(function (response) {
            //                         $ionicLoading.hide();
            //                         $scope.idRekap = response[0].$id;

            //                         var avgNilai = firebase.database(appUTSUASOnline).ref("rekapJawabanUTSUASSiswa/" + $scope.idRekap + "/pelajaran");
            //                         var listAvgNilai = $firebaseArray(avgNilai);

            //                         $scope.nilaiTotal = 0;
            //                         $scope.dataArray = [];
            //                         listAvgNilai.$loaded().then(function (response) {
            //                             // $ionicLoading.show();
            //                             for (i = 0; i < response.length; i++) {
            //                                 if (response[i].nilai !== undefined) {
            //                                     $scope.dataArray.push({
            //                                         "data": response[i].nilai
            //                                     });
            //                                     var penilaian = response[i].nilai;
            //                                     $scope.nilaiTotal = $scope.nilaiTotal + penilaian;
            //                                     $scope.avg = $scope.nilaiTotal / $scope.dataArray.length;
            //                                     // console.log("total Nilai", $scope.nilaiTotal);
            //                                     // console.log("avg", $scope.avg);
            //                                     var updateNilaiRata = firebase.database(appUTSUASOnline).ref("rekapJawabanUTSUASSiswa/" + $scope.idRekap);
            //                                     updateNilaiRata.update(JSON.parse(JSON.stringify({
            //                                         "jumlahNilai": $scope.nilaiTotal,
            //                                         "rataRata": $scope.avg,
            //                                     }))).then(function (resp) {
            //                                         // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
            //                                         $ionicLoading.hide();
            //                                         $state.go('menuSiswa.peringkatAndaUTSUASSiswa', {
            //                                             "idUTSUAS": data.idUTSUAS,
            //                                             "namaUTSUAS": data.namaUTSUAS,
            //                                             "jenjang": data.jenjang,
            //                                             "utsUasTingkat": data.utsUasTingkat,
            //                                             "namaKota": data.namaKota,
            //                                             "namaProvinsi": data.namaProvinsi,
            //                                             "semester": data.semester,
            //                                             "tahunAjaran": data.tahunAjaran,
            //                                             "totalSiswaLolos": data.totalSiswaLolos,
            //                                         });
            //                                     });
            //                                 }

            //                             }

            //                         });
            //                     });
            //                 }
            //                 else if (snapshot.val().nilaiDitampilkan === false) {
            //                     $ionicPopup.alert({
            //                         title: 'PERHATIAN',
            //                         template: 'Maaf, nilai tidak ditampilkan untuk ujian ini, terimakasih',
            //                         okType: 'button-positive'
            //                     });
            //                 }
            //             })
            //         }

            //         return true;
            //     },

            // });

        };

    }])