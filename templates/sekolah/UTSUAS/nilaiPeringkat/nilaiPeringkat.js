angular.module('app.nilaiPeringkatUTSUASSekolah', [])

    .controller('nilaiPeringkatUTSUASSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "utsUasTingkat": $stateParams.utsUasTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "totalSiswaLolos": $stateParams.totalSiswaLolos,
            "tanggalPelaksanaan": $stateParams.tanggalPelaksanaan,
            "idSekolah": $stateParams.idSekolah,
            "tingkatKelas": $stateParams.tingkatKelas,
            "idTahunAjaran": $stateParams.idTahunAjaran,
        };
        console.log($scope.data.idUTSUAS);

        $scope.totalData = [];
        var totalData = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS).orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        var listTotalData = $firebaseArray(totalData);
        listTotalData.$loaded().then(function (response) {
            for (i = 0; i < response.length; i++) {
                $scope.totalData.push({
                    "$id": response[i].$id,
                    "namaPengguna": response[i].namaPengguna,
                    "jumlahNilai": response[i].jumlahNilai,
                    "rataRata": response[i].rataRata,
                    "namaSekolah": response[i].namaSekolah,
                    "namaKelas": response[i].namaKelas,
                    "uid": response[i].uid
                })
            }
            $scope.totalData.sort(function (a, b) {
                return b.jumlahNilai - a.jumlahNilai
            })
            $scope.banyakData = $scope.totalData.length;
            // console.log($scope.totalData)
            // console.log("totalData", $scope.totalData.slice(0, 10));

            // Untuk Print Data Nilai
            var wb = XLSX.read($scope.totalData, { type: "array" });
            var d = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

            $scope.excel = function () {
                console.log("d", d)
                var wb = XLSX.utils.table_to_book(document.getElementById('danu-table'));
                XLSX.writeFile(wb, "nilaiPeringkat_" + $scope.data.namaUTSUAS + ".xlsx");
            }
        })

        $scope.tampilAll = true;

        if ($scope.data.utsUasTingkat === 'Sekolah') {

            $scope.formData = {
                "idKelas": '',
                "idPelajaran": ''
            }

     
            $scope.dataKelas = [];
            var refDataKelas = firebase.database().ref("dataKelas").orderByChild("idSekolah").equalTo($scope.data.idSekolah);
            var listRefDataKelas = $firebaseArray(refDataKelas);
            $ionicLoading.show();
            listRefDataKelas.$loaded().then(function (response) {
                $ionicLoading.hide();
                for (i = 0; i < response.length; i++) {
                    if (response[i].tingkatKelas === $scope.data.tingkatKelas && response[i].idTahunAjaran === $scope.data.idTahunAjaran) {
                        console.log(response[i].$id),
                        $scope.dataKelas.push({
                            
                            "idKelas": response[i].$id,
                            "namaKelas": response[i].namaKelas
                        })
                    }
                }
                // console.log($scope.dataKelas)
            })


            $scope.getIdKelas = function () {

                console.log('TESID', $scope.data.idUTSUAS);
                var ref = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS).orderByChild("filterIdUtsUasIdKelas").equalTo($scope.data.idUTSUAS + "_" + $scope.formData.idKelas);
                var listRef = $firebaseArray(ref);

                $ionicLoading.show();
                listRef.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.peringkat = response;

                    $scope.peringkat.sort(function (a, b) {
                        return b.jumlahNilai - a.jumlahNilai
                    })
                });

                console.log('CEK DIREKTOTI:'+$scope.data.idUTSUAS +'/' + $scope.idKelas+ '/'+$scope.data.uid);
                
                if ($scope.formData.idPelajaran !== "") {
                    var ref = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("filterIdUTSUASIdKelasIdPelajaran").equalTo($scope.data.idUTSUAS + "_" + $scope.formData.idKelas + "_" + $scope.formData.idPelajaran);
                    var listRef = $firebaseArray(ref);
                    listRef.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.peringkat = response;

                        // console.log("response", response);

                        $scope.peringkat.sort(function (a, b) {
                            return b.nilai - a.nilai
                        })
                    })
                }
            }

            $scope.getIdPelajaran = function () {
                $scope.tampilNilaiPelajaranPerKelas = true;
                $scope.tampilAll = false;
                $ionicLoading.show();
                var ref = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("filterIdUTSUASIdKelasIdPelajaran").equalTo($scope.data.idUTSUAS + "_" + $scope.formData.idKelas + "_" + $scope.formData.idPelajaran);
                var listRef = $firebaseArray(ref);
                listRef.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.peringkat = response;

                    // console.log("response", response);

                    $scope.peringkat.sort(function (a, b) {
                        return b.nilai - a.nilai
                    })
                })
            }
        }

        $scope.goToNilai = function (data) {
            $state.go("menuSekolah.nilaiSiswaDetailUTSUASSekolah", {
                "idUTSUAS": data.idUTSUAS,
                "namaUTSUAS": data.namaUTSUAS,
                "jenjang": data.jenjang,
                "utsUasTingkat": data.utsUasTingkat,
                "namaKota": data.namaKota,
                "namaProvinsi": data.namaProvinsi,
                "semester": data.semester,
                "tahunAjaran": data.tahunAjaran,
                "idPelajaranUTSUAS": data.idPelajaranUTSUAS,
                "idPelajaran": data.idPelajaran,
                "pelajaran": data.pelajaran,
                "statusFinish": data.statusFinish,
                "idJawabanUTSUASSiswaPerPelajaran": data.$id,
                "idRekapJawabanUTSUASSiswa": $stateParams.idRekapJawabanUTSUASSiswa,
                "namaPengguna": data.namaPengguna,
                "uid": data.uid
            });
        }


        // $scope.formData = {
        //     searchData: ''
        // }

        // var ref = firebase.database().ref("rekapJawabanUTSUASSiswa").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        // var listRef = $firebaseArray(ref);
        // listRef.$loaded().then(function (response) {
        //     for (i = 0; i < response.length; i++) {
        //         $scope.totalData.push({
        //             "id": response[i].$id
        //         })
        //     }
        //     $scope.peringkat = response;
        //     $scope.peringkat.sort(function (a, b) {
        //         return b.jumlahNilai - a.jumlahNilai
        //     })
        //     if ($scope.data.totalSiswaLolos !== "") {
        //         for (i = 0; i < $scope.peringkat.length; i++) {
        //             if (i < $scope.data.totalSiswaLolos) {
        //                 var updateLulus = firebase.database().ref("rekapJawabanUTSUASSiswa/" + $scope.peringkat[i].$id);
        //                 updateLulus.update({
        //                     "lulus": true,
        //                 }).then(function (resp) {
        //                     console.log('lulus');
        //                 })
        //             }
        //             else {

        //                 var updateLulus = firebase.database().ref("rekapJawabanUTSUASSiswa/" + $scope.peringkat[i].$id);
        //                 updateLulus.update({
        //                     "lulus": false,
        //                 }).then(function (resp) {
        //                     console.log('Ga lulus');
        //                 })
        //             }

        //         }
        //     }
        //     else if ($scope.data.totalSiswaLolos === "") {
        //         for (i = 0; i < $scope.peringkat.length; i++) {
        //             var updateLulus = firebase.database().ref("rekapJawabanUTSUASSiswa/" + $scope.peringkat[i].$id);
        //             updateLulus.update({
        //                 "lulus": "",
        //             }).then(function (resp) {
        //                 console.log('clean');
        //             })
        //         }
        //     }
        // });
        // $scope.totalData = [];

        // $scope.count = 0;
        // $scope.noMoreItemsAvailable = false;

        // $scope.loadMore = function () {
        //     // console.log($scope.count += 100);
        //     var ref = firebase.database().ref("rekapJawabanUTSUASSiswa").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        //     var listRef = $firebaseArray(ref);

        //     listRef.$loaded().then(function (response) {
        //         $scope.peringkat = response;
        //         $scope.peringkat.sort(function (a, b) {
        //             return b.jumlahNilai - a.jumlahNilai
        //         })

        //         $scope.dataPeringkat = $scope.peringkat.slice(0, $scope.count += 100);

        //         if ($scope.dataPeringkat.length === $scope.totalData.length) {
        //             $scope.noMoreItemsAvailable = true;
        //             //console.log("banyakData ", $scope.items.length);
        //         }
        //         $scope.$broadcast('scroll.infiniteScrollComplete');
        //     });

        // };

        // $scope.cariData = function () {
        //     var s = $scope.formData.searchData.toLowerCase();


        //     if (s == '') {
        //         $scope.dataPeringkat = listRef;
        //         return;
        //     }

        //     $scope.dataPeringkat = $scope.dataPeringkat.filter(function (item) {
        //         if (item.namaPengguna.toLowerCase().indexOf(s) > -1 || item.namaSekolah.toLowerCase().indexOf(s) > -1) {
        //             return true;
        //         }
        //         return false;
        //     });
        // }

        var ref = firebase.database(app).ref("rekapJawabanUTSUASSiswa/"+$scope.data.idUTSUAS).orderByChild("filterIdUTSUASKecamatanIdSekolah").equalTo($scope.data.idUTSUAS+"_"+$scope.idKecamatanSekolah+"_"+$scope.idSekolah);
        var listRef = $firebaseArray(ref);

        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            
            $scope.peringkat = response;
            console.log( $scope.peringkat);
            // if ($scope.data.utsUasTingkat === "Sekolah") {
            //     for (i = 0; i < response.length; i++) {
            //         var updateData = firebase.database().ref("rekapJawabanUTSUASSiswa/" + response[i].$id);
            //         updateData.update(JSON.parse(JSON.stringify({
            //             "filterIdUtsUasIdKelas": $scope.data.idUTSUAS + "_" + response[i].idKelas
            //         }))).then(function (resp) {
            //             $ionicLoading.hide();
            //             console.log("update")
            //         })
            //     }
            // }

            $scope.peringkat.sort(function (a, b) {
                $ionicLoading.hide();
                return b.jumlahNilai - a.jumlahNilai
            })
        });

        var refPelajaran = firebase.database(app).ref("pelajaranUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        var listRefPelajaran = $firebaseArray(refPelajaran);

        $ionicLoading.show();
        listRefPelajaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPelajaran = response;
        });

        $scope.dataNilaiSiswa = function (data) {
            console.log(data.idKelas);
            $state.go("menuSekolah.nilaiSiswaUTSUASSekolah", {
                "idUTSUAS": $stateParams.idUTSUAS,
                "namaUTSUAS": $stateParams.namaUTSUAS,
                "jenjang": $stateParams.jenjang,
                "utsUasTingkat": $stateParams.utsUasTingkat,
                "namaKota": $stateParams.namaKota,
                "namaProvinsi": $stateParams.namaProvinsi,
                "namaSekolah": data.namaSekolah,
                "semester": $stateParams.semester,
                "tahunAjaran": $stateParams.tahunAjaran,
                "idRekapJawabanUTSUASSiswa": data.$id,
                "namaPengguna": data.namaPengguna,
                "uid": data.uid,
                "lulus": data.lulus,
                "tanggalPelaksanaan": $stateParams.tanggalPelaksanaan,
                "idKelas":data.idKelas,
            })

        };

    }])

    .controller('nilaiSiswaUTSUASSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "utsUasTingkat": $stateParams.utsUasTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "namaSekolah": $stateParams.namaSekolah,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idRekapJawabanUTSUASSiswa": $stateParams.idRekapJawabanUTSUASSiswa,
            "namaPengguna": $stateParams.namaPengguna,
            "uid": $stateParams.uid,
            "lulus": $stateParams.lulus,
            "tanggalPelaksanaan": $stateParams.tanggalPelaksanaan,
            "idKelas":$stateParams.idKelas,
        };
        console.log($scope.data.idKelas);
        $ionicLoading.show()
        var dataSiswa = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo($scope.data.uid);
        dataSiswa.on('child_added', function (snapshot) {
            $ionicLoading.hide();
            $scope.emailSiswa = snapshot.val().email;
            $scope.noHandphoneSiswa = snapshot.val().noHandphone;
            $scope.kelasSiswa = snapshot.val().namaKelas;
            $scope.jenjang = snapshot.val().jenjang;
            $scope.idKelas = snapshot.val().idKelas;

            $scope.goToNilai = function (data) {
                //console.log(data);
                $ionicActionSheet.show({
                    titleText: 'Pelajaran : ' + data.pelajaran,
                    buttons: [
                        { text: '<i class="icon ion-checkmark-circled"></i> Lihat Detail' },
                    ],
                    destructiveText: '<i class="icon ion-trash-b"></i> Hapus Nilai',
                    cancelText: 'Cancel',
                    cancel: function () {
                        //console.log('CANCELLED');
                    },
                    buttonClicked: function (index) {
                        if (index === 0) {
                            console.log('CEK DIREK3:'+$scope.data.idUTSUAS +'/' + $scope.idKelas+ '/'+$scope.data.uid);
                            var getData = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" +$scope.data.idUTSUAS +'/' + $scope.idKelas+ '/'+$scope.data.uid).orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + data.idPelajaranUTSUAS + "_" + $scope.data.uid);
                            getData.on("child_added", function (snapshot) {
                                //console.log(snapshot.val());
                                $state.go("menuSekolah.nilaiSiswaDetailUTSUASSekolah", {
                                    "idUTSUAS": $stateParams.idUTSUAS,
                                    "namaUTSUAS": $stateParams.namaUTSUAS,
                                    "jenjang": $stateParams.jenjang,
                                    "utsUasTingkat": $stateParams.utsUasTingkat,
                                    "namaKota": $stateParams.namaKota,
                                    "namaProvinsi": $stateParams.namaProvinsi,
                                    "semester": $stateParams.semester,
                                    "tahunAjaran": $stateParams.tahunAjaran,
                                    "idPelajaranUTSUAS": data.idPelajaranUTSUAS,
                                    "idPelajaran": data.idPelajaran,
                                    "pelajaran": data.pelajaran,
                                    "statusFinish": snapshot.val().statusFinish,
                                    "idJawabanUTSUASSiswaPerPelajaran": snapshot.key,
                                    "idRekapJawabanUTSUASSiswa": $stateParams.idRekapJawabanUTSUASSiswa,
                                    "namaPengguna": $stateParams.namaPengguna,
                                    "uid": $stateParams.uid
                                });
                            });
                        }
                        return true;
                    },
    
                    destructiveButtonClicked: function () {
                        var refNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/'+ $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran/" + data.$id);
                        var nilaiHapus = $firebaseObject(refNilai);
                        console.log("nilaiHapus", nilaiHapus);
    
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Hapus Nilai',
                            template: 'Apakah Kamu Yakin Ingin Menghapus Nilai Ini?',
                            okType: 'button-balanced'
                        });
                        confirmPopup.then(function (resp) {
                            if (resp) {
                                nilaiHapus.$remove().then(function (response) {
                                    var avgNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/'+ $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran");
                                    var listAvgNilai = $firebaseArray(avgNilai);
    
                                    $scope.nilaiTotal = 0;
                                    $scope.dataArray = [];
                                    listAvgNilai.$loaded().then(function (response) {
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
                                                var updateNilaiRata = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/'+ $scope.data.idRekapJawabanUTSUASSiswa);
    
                                                updateNilaiRata.update(JSON.parse(JSON.stringify({
                                                    "jumlahNilai": $scope.nilaiTotal,
                                                    "rataRata": $scope.avg,
                                                }))).then(function (resp) {
                                                    // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                                                });
                                            }
    
                                        }
    
                                    });
                                });
    
                            }
                            else {
                                console.log('Tidak Jadi Menghapus');
                            }
                        })
    
                        return true;
                    }
    
                });
    
    
            };
        })

        var ref = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' +$scope.data.idRekapJawabanUTSUASSiswa);
        $scope.formData = $firebaseObject(ref);
        // console.log($scope.formData);
        // ref.update({
        //     "jumlahNilai" : 270
        // }).then(function(resp){
        //     console.log("success");
        // })

        var refNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/'+ $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran");
        var listRefNilai = $firebaseArray(refNilai);

        $ionicLoading.show();
        listRefNilai.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.nilai = response;
        });

        $scope.nilaiTotal = 0;
        $scope.dataArray = [];
        listRefNilai.$loaded().then(function (response) {
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
                    var updateNilaiRata = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/'+ $scope.data.idRekapJawabanUTSUASSiswa);

                    updateNilaiRata.update(JSON.parse(JSON.stringify({
                        "jumlahNilai": $scope.nilaiTotal,
                        "rataRata": $scope.avg,
                    }))).then(function (resp) {
                        // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                    });
                }

            }

        });

    }])

    .controller('nilaiSiswaDetailUTSUASSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "utsUasTingkat": $stateParams.utsUasTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran,
            "statusFinish": $stateParams.statusFinish,
            "idJawabanUTSUASSiswaPerPelajaran": $stateParams.idJawabanUTSUASSiswaPerPelajaran,
            "idRekapJawabanUTSUASSiswa": $stateParams.idRekapJawabanUTSUASSiswa,
            "namaPengguna": $stateParams.namaPengguna,
            "uid": $stateParams.uid
        };

        if ($scope.data.statusFinish === false) {
            //Pengaturan Umum Ujian 
            var refPengaturanUmum = firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
            refPengaturanUmum.on("child_added", function (snapshot) {
                $scope.soalAcak = snapshot.val().soalAcak;
                $scope.nilaiMaksimum = snapshot.val().nilaiMaksimum * 1;
                $scope.jumlahSoal = snapshot.val().jumlahSoal * 1;
                $scope.bobotNilai = snapshot.val().nilaiMaksimum * 1 / snapshot.val().jumlahSoal * 1;

            });

            //Menghitung Nilai Per Pelajaran
            var hitungNilai = firebase.database(app).ref("jawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' +$scope.data.uid).orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.data.uid);
            var listHitungNilai = $firebaseArray(hitungNilai);

            $scope.totalNilai = 0;
            $scope.statusJawabanBenar = 0;
            $scope.statusJawabanSalah = 0;
            listHitungNilai.$loaded().then(function (response) {
                for (i = 0; i < response.length; i++) {
                    $scope.totalNilai = $scope.totalNilai + response[i].bobotNilai;
                    $scope.statusJawabanBenar = $scope.statusJawabanBenar + response[i].statusJawabanBenar;
                    $scope.statusJawabanSalah = $scope.statusJawabanSalah + response[i].statusJawabanSalah;
                }
                $scope.kosong = $scope.jumlahSoal - ($scope.statusJawabanBenar + $scope.statusJawabanSalah);

                //Lock Ujian
                console.log('CEK DIREK1:'+$scope.data.idUTSUAS +'/' + $scope.idKelas+ '/'+$scope.data.uid);
                var ref = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" +$scope.data.idUTSUAS +'/' + $scope.idKelas+ '/'+$scope.data.uid +'/'+ $scope.data.idJawabanUTSUASSiswaPerPelajaran);

                ref.update(JSON.parse(JSON.stringify({
                    "benar": $scope.statusJawabanBenar,
                    "salah": $scope.statusJawabanSalah,
                    "kosong": $scope.kosong,
                    "nilai": $scope.totalNilai,
                    "statusFinish": true
                }))).then(function (resp) {
                    console.log("Updated");
                });

            });
        }

        if ($scope.data.statusFinish === true) {
            console.log('CEK DIREK2:'+$scope.data.idUTSUAS +'/' + $scope.idKelas+ '/'+$scope.data.uid);
            var ref = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" +$scope.data.idUTSUAS +'/' + $scope.idKelas+ '/'+$scope.data.uid+'/'+ $scope.data.idJawabanUTSUASSiswaPerPelajaran);
            var refObj = $firebaseObject(ref);

            refObj.$loaded().then(function (response) {
                $scope.totalNilai = response.nilai;
                $scope.statusJawabanBenar = response.benar;
                $scope.statusJawabanSalah = response.salah;
                $scope.kosong = response.kosong;
                $scope.jumlahSoal = response.jumlahSoal;
            });
        }

        var avgNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' + $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran");
        var listAvgNilai = $firebaseArray(avgNilai);

        $scope.nilaiTotal = 0;
        $scope.dataArray = [];
        listAvgNilai.$loaded().then(function (response) {
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
                    var updateNilaiRata = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/'+ $scope.data.idRekapJawabanUTSUASSiswa);

                    updateNilaiRata.update(JSON.parse(JSON.stringify({
                        "jumlahNilai": $scope.nilaiTotal,
                        "rataRata": $scope.avg,
                    }))).then(function (resp) {
                        // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                    });
                }

            }

        });


    }])

    .controller('statusJawabanSiswaUTSUASSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "keterangan": $stateParams.keterangan,
            "utsUasTingkat": $stateParams.utsUasTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
            "pelajaran": $stateParams.pelajaran,
            "namaPengguna": $stateParams.namaPengguna,
            "uid": $stateParams.uid
        };

        //console.log($scope.data);

        if ($scope.data.keterangan === "all" || $scope.data.keterangan === "Kosong") {
            var ref = firebase.database(app).ref("jawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' +$scope.data.uid ).orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS + "_" + $scope.data.uid);
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }
        else if ($scope.data.keterangan === "Benar") {
            var ref = firebase.database(app).ref("jawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' +$scope.data.uid).orderByChild("filterStatusJawaban").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.data.uid + "_Benar");
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }

        else if ($scope.data.keterangan === "Salah") {
            var ref = firebase.database(app).ref("jawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' +$scope.data.uid).orderByChild("filterStatusJawaban").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.data.uid + "_Salah");
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }


        $scope.getSoal = function (jawaban) {
            //console.log(jawaban);

            var pembahasanSoal = firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
            pembahasanSoal.on("child_added", function (snapshot) {

                if (snapshot.val().pembahasanSoalDibuka === true) {
                    $ionicModal.fromTemplateUrl('templates/modal.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }).then(function (modal) {
                        $scope.modal = modal;
                        $scope.modal.show();

                        var refSoal = firebase.database(appBankSoal).ref("soal/" + jawaban.idSoal);
                        $scope.formData = $firebaseObject(refSoal);

                    });
                }
                else if (snapshot.val().pembahasanSoalDibuka === false) {
                    $ionicPopup.alert({
                        title: 'Informasi',
                        template: "Maaf, Pembahasan Soal Untuk Mata Pelajaran " + $stateParams.pelajaran + " Belum Dibuka.",
                        okType: "button-balanced"
                    });
                }
            });


        };
    }])
