angular.module('app.nilaiPeringkatUTSUASAdmin', [])

    .controller('nilaiPeringkatUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupatenAdmin = localStorage.getItem('idKotaKabupaten')

        if (!$scope.idAdmin) {
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
        // console.log($scope.data)

        $scope.peringkatKotaKabupaten = true;
        $scope.peringkatLain = false;
        $scope.noMoreItemsAvailable = false;
        $scope.totalData = [];

        var refPelajaran = firebase.database(appUTSUASOnline).ref("pelajaranUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        var listRefPelajaran = $firebaseArray(refPelajaran);

        $ionicLoading.show();
        listRefPelajaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPelajaran = response;
        });

        var getKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenAdmin);
        var listGetKecamatan = $firebaseArray(getKecamatan);
        $ionicLoading.show();
        listGetKecamatan.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataKecamatan = response;
        });

        if ($scope.data.utsUasTingkat === 'Kota/Kabupaten') {
            $scope.formData = {
                "idKecamatan": "",
                "idSekolah": "",
                "idKelas": '',
            }
            $scope.getDataKecamatan = function () {


                if ($scope.formData.idKecamatan === "5315") { var app = app5315; }
                else if ($scope.formData.idKecamatan === "5316") { var app = app5316; }
                else if ($scope.formData.idKecamatan === "5317") { var app = app5317; }
                else if ($scope.formData.idKecamatan === "5318") { var app = app5318; }
                else if ($scope.formData.idKecamatan === "5319") { var app = app5319; }
                else if ($scope.formData.idKecamatan === "5320") { var app = app5320; }
                else if ($scope.formData.idKecamatan === "5321") { var app = app5321; }
                else if ($scope.formData.idKecamatan === "5322") { var app = app5322; }
                else if ($scope.formData.idKecamatan === "5323") { var app = app5323; }
                else if ($scope.formData.idKecamatan === "5324") { var app = app5324; }



                $scope.peringkatKotaKabupaten = false;
                $scope.peringkatLain = true;

                if ($scope.data.jenjang === 'SMA') {
                    $scope.dataSekolah = [];
                    var getSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.formData.idKecamatan + "_" + $scope.data.jenjang);
                    var listGetSekolah = $firebaseArray(getSekolah);
                    $ionicLoading.show();
                    listGetSekolah.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        for (i = 0; i < response.length; i++) {
                            $scope.dataSekolah.push({
                                "$id": response[i].$id,
                                "nama_sekolah": response[i].nama_sekolah,
                            })
                        }

                    })
                    var getSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.formData.idKecamatan + "_SMK");
                    var listGetSekolah = $firebaseArray(getSekolah);
                    $ionicLoading.show();
                    listGetSekolah.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        for (i = 0; i < response.length; i++) {
                            $scope.dataSekolah.push({
                                "$id": response[i].$id,
                                "nama_sekolah": response[i].nama_sekolah,
                            })
                        }
                    })
                    console.log($scope.dataSekolah);
                }
                else if ($scope.data.jenjang !== 'SMA') {
                    var dataRekap = firebase.database(app).ref("rekapJawabanUTSUASSiswa").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
                    var listDataRekap = $firebaseArray(dataRekap);
                    $ionicLoading.show();
                    listDataRekap.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.peringkat = response
                        console.log(response)
                        for (i = 0; i < response.length; i++) {
                            // if(response[i].idKecamatan!==$scope.formData.idKecamatan){
                            //     console.log(response[i].idKecamatan)
                            //     var hapusData = firebase.database(app).ref("rekapJawabanUTSUASSiswa/"+response[i].$id);
                            //     var objHapus = $firebaseObject(hapusData);
                            //     objHapus.$remove().then(function(resp){
                            //         console.log('terhapus')
                            //     })
                            // }
                            var updateData = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + response[i].$id);
                            updateData.update(JSON.parse(JSON.stringify({
                                "filterIdUTSUASKecamatanIdSekolah": $scope.data.idUTSUAS + "_" + $scope.formData.idKecamatan + "_" + response[i].idSekolah,
                                // "filterIdUTSUASIdKelas": $scope.data.idUTSUAS + "_" + data.idKelas,
                                // "filterIdUTSUASKecamatan": $scope.data.idUTSUAS + "_" + $scope.formData.idKecamatan,
                                // "filterIdUTSUASKecamatanIdSekolah": $scope.data.idUTSUAS + "_" + data.idKecamatan + "_" + data.idSekolah,
                                // "filterIdUTSUASKecamatanIdSekolahIdKelas": $scope.data.idUTSUAS + "_" + data.idKecamatan + "_" + data.idSekolah + "_" + data.idKelas
                            }))).then(function (resp) {
                                console.log('yes')
                            })
                        }
                        // Untuk Print Data Nilai
                        var wb = XLSX.read($scope.peringkat, { type: "array" });
                        var d = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

                        $scope.excel = function () {
                            console.log("d", d)
                            var wb = XLSX.utils.table_to_book(document.getElementById('danu-table'));
                            XLSX.writeFile(wb, "nilaiPeringkat_" + $scope.data.namaUTSUAS + ".xlsx");
                        }
                    })
                    // var refKecamatan = firebase.database(app).ref("rekapJawabanUTSUASSiswa").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
                    // var lisRefKecamatan = $firebaseArray(refKecamatan);
                    // $ionicLoading.show();
                    // lisRefKecamatan.$loaded().then(function (response) {
                    //     $ionicLoading.hide();
                    //     $scope.peringkat = response;
                    //     console.log(response)
                    // })

                    // console.log($scope.formData.idKecamatan)
                    var getSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.formData.idKecamatan + "_" + $scope.data.jenjang);
                    var listGetSekolah = $firebaseArray(getSekolah);
                    listGetSekolah.$loaded().then(function (response) {
                        $scope.dataSekolah = response;
                    })
                }

            }

            $scope.getDataSekolah = function () {
                if ($scope.formData.idKecamatan === "5315") { var app = app5315; }
                else if ($scope.formData.idKecamatan === "5316") { var app = app5316; }
                else if ($scope.formData.idKecamatan === "5317") { var app = app5317; }
                else if ($scope.formData.idKecamatan === "5318") { var app = app5318; }
                else if ($scope.formData.idKecamatan === "5319") { var app = app5319; }
                else if ($scope.formData.idKecamatan === "5320") { var app = app5320; }
                else if ($scope.formData.idKecamatan === "5321") { var app = app5321; }
                else if ($scope.formData.idKecamatan === "5322") { var app = app5322; }
                else if ($scope.formData.idKecamatan === "5323") { var app = app5323; }
                else if ($scope.formData.idKecamatan === "5324") { var app = app5324; }
                // console.log($scope.formData.idSekolah);
                $scope.peringkatKotaKabupaten = false;
                $scope.peringkatLain = true;

                var refSchool = firebase.database(app).ref("rekapJawabanUTSUASSiswa").orderByChild("filterIdUTSUASKecamatanIdSekolah").equalTo($scope.data.idUTSUAS + "_" + $scope.formData.idKecamatan + "_" + $scope.formData.idSekolah);
                var listRefSchool = $firebaseArray(refSchool);

                $ionicLoading.show();
                listRefSchool.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.peringkat = response;
                    // console.log(response)
                })

                $scope.dataKelas = [];
                var refDataKelas = firebase.database().ref("dataKelas").orderByChild("idSekolah").equalTo($scope.formData.idSekolah);
                var listRefDataKelas = $firebaseArray(refDataKelas);
                // $ionicLoading.show();
                listRefDataKelas.$loaded().then(function (response) {
                    // $ionicLoading.hide();
                    for (i = 0; i < response.length; i++) {
                        $scope.dataKelas.push({
                            "idKelas": response[i].$id,
                            "namaKelas": response[i].namaKelas
                        })
                        // if (response[i].tingkatKelas === $scope.data.tingkatKelas && response[i].idTahunAjaran === $scope.data.idTahunAjaran) {
                        //     $scope.dataKelas.push({
                        //         "idKelas": response[i].$id,
                        //         "namaKelas": response[i].namaKelas
                        //     })
                        // }
                    }
                })

                $scope.getIdKelas = function () {
                    // console.log($scope.formData.idKelas)
                    $scope.peringkatKotaKabupaten = false;
                    $scope.peringkatLain = true;

                    var refSchool = firebase.database(app).ref("rekapJawabanUTSUASSiswa").orderByChild("filterIdUTSUASKecamatanIdSekolahIdKelas").equalTo($scope.data.idUTSUAS + "_" + $scope.formData.idKecamatan + "_" + $scope.formData.idSekolah + "_" + $scope.formData.idKelas);
                    var listRefSchool = $firebaseArray(refSchool);

                    $ionicLoading.show();
                    listRefSchool.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.peringkat = response;
                    });


                    $ionicLoading.show();
                    var refDataSiswa = firebase.database().ref("dataSiswa").orderByChild("idKelas").equalTo($scope.formData.idKelas);
                    var listRefDataSiswa = $firebaseArray(refDataSiswa);
                    listRefDataSiswa.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.dataSiswa = response;
                    })
                }
            }
        }

        // if ($scope.data.utsUasTingkat === 'Sekolah') {

        //     $scope.formData = {
        //         "idKelas": '',
        //         "idPelajaran": ''
        //     }

        //     $scope.dataKelas = [];
        //     var refDataKelas = firebase.database().ref("dataKelas").orderByChild("idSekolah").equalTo($scope.data.idSekolah);
        //     var listRefDataKelas = $firebaseArray(refDataKelas);
        //     $ionicLoading.show();
        //     listRefDataKelas.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         for (i = 0; i < response.length; i++) {
        //             if (response[i].tingkatKelas === $scope.data.tingkatKelas && response[i].idTahunAjaran === $scope.data.idTahunAjaran) {
        //                 $scope.dataKelas.push({
        //                     "idKelas": response[i].$id,
        //                     "namaKelas": response[i].namaKelas
        //                 })
        //             }
        //         }
        //         // console.log($scope.dataKelas)
        //     })

        //     $scope.getIdKelas = function () {

        //         var ref = firebase.database(appUTSUASOnline).ref("rekapJawabanUTSUASSiswa").orderByChild("filterIdUtsUasIdKelas").equalTo($scope.data.idUTSUAS + "_" + $scope.formData.idKelas);
        //         var listRef = $firebaseArray(ref);

        //         $ionicLoading.show();
        //         listRef.$loaded().then(function (response) {
        //             $ionicLoading.hide();
        //             $scope.peringkat = response;

        //             // console.log("response", response);

        //             $scope.peringkat.sort(function (a, b) {
        //                 return b.jumlahNilai - a.jumlahNilai
        //             })
        //         });

        //         if ($scope.formData.idPelajaran !== "") {
        //             var ref = firebase.database(appUTSUASOnline).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("filterIdUTSUASIdKelasIdPelajaran").equalTo($scope.data.idUTSUAS + "_" + $scope.formData.idKelas + "_" + $scope.formData.idPelajaran);
        //             var listRef = $firebaseArray(ref);
        //             listRef.$loaded().then(function (response) {
        //                 $ionicLoading.hide();
        //                 $scope.peringkat = response;

        //                 // console.log("response", response);

        //                 $scope.peringkat.sort(function (a, b) {
        //                     return b.nilai - a.nilai
        //                 })
        //             })
        //         }
        //     }

        //     $scope.getIdPelajaran = function () {
        //         $scope.tampilNilaiPelajaranPerKelas = true;
        //         $scope.tampilAll = false;
        //         $ionicLoading.show();
        //         var ref = firebase.database(appUTSUASOnline).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("filterIdUTSUASIdKelasIdPelajaran").equalTo($scope.data.idUTSUAS + "_" + $scope.formData.idKelas + "_" + $scope.formData.idPelajaran);
        //         var listRef = $firebaseArray(ref);
        //         listRef.$loaded().then(function (response) {
        //             $ionicLoading.hide();
        //             $scope.peringkat = response;

        //             // console.log("response", response);

        //             $scope.peringkat.sort(function (a, b) {
        //                 return b.nilai - a.nilai
        //             })
        //         })
        //     }
        // }

        // $scope.goToNilai = function (data) {
        //     $state.go("menuAdmin.nilaiSiswaDetailUTSUASAdmin", {
        //         "idUTSUAS": data.idUTSUAS,
        //         "namaUTSUAS": data.namaUTSUAS,
        //         "jenjang": data.jenjang,
        //         "utsUasTingkat": data.utsUasTingkat,
        //         "namaKota": data.namaKota,
        //         "namaProvinsi": data.namaProvinsi,
        //         "semester": data.semester,
        //         "tahunAjaran": data.tahunAjaran,
        //         "idPelajaranUTSUAS": data.idPelajaranUTSUAS,
        //         "idPelajaran": data.idPelajaran,
        //         "pelajaran": data.pelajaran,
        //         "statusFinish": data.statusFinish,
        //         "idJawabanUTSUASSiswaPerPelajaran": data.$id,
        //         "idRekapJawabanUTSUASSiswa": $stateParams.idRekapJawabanUTSUASSiswa,
        //         "namaPengguna": data.namaPengguna,
        //         "uid": data.uid
        //     });
        // }

        // var ref = firebase.database(appUTSUASOnline).ref("rekapJawabanUTSUASSiswa").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        // var listRef = $firebaseArray(ref);

        // $ionicLoading.show();
        // listRef.$loaded().then(function (response) {

        //     $scope.peringkat = response;
        //     if ($scope.data.utsUasTingkat === "Sekolah") {
        //         for (i = 0; i < response.length; i++) {
        //             var updateData = firebase.database(appUTSUASOnline).ref("rekapJawabanUTSUASSiswa/" + response[i].$id);
        //             updateData.update(JSON.parse(JSON.stringify({
        //                 "filterIdUtsUasIdKelas": $scope.data.idUTSUAS + "_" + response[i].idKelas
        //             }))).then(function (resp) {
        //                 $ionicLoading.hide();
        //                 console.log("update")
        //             })
        //         }
        //     }

        //     $scope.peringkat.sort(function (a, b) {
        //         return b.jumlahNilai - a.jumlahNilai
        //     })
        // });

        // var refPelajaran = firebase.database(appUTSUASOnline).ref("pelajaranUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        // var listRefPelajaran = $firebaseArray(refPelajaran);

        // $ionicLoading.show();
        // listRefPelajaran.$loaded().then(function (response) {
        //     $ionicLoading.hide();
        //     $scope.dataPelajaran = response;
        // });

        $scope.dataNilaiSiswa = function (data) {
            // console.log(data);
            $state.go("menuAdmin.nilaiSiswaUTSUASAdmin", {
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
                "idKecamatan": data.idKecamatan
            })

        };

    }])

    .controller('nilaiSiswaUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
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
            "idKecamatan": $stateParams.idKecamatan
        };

        if ($scope.data.idKecamatan === "5315") { var app = app5315; }
        else if ($scope.data.idKecamatan === "5316") { var app = app5316; }
        else if ($scope.data.idKecamatan === "5317") { var app = app5317; }
        else if ($scope.data.idKecamatan === "5318") { var app = app5318; }
        else if ($scope.data.idKecamatan === "5319") { var app = app5319; }
        else if ($scope.data.idKecamatan === "5320") { var app = app5320; }
        else if ($scope.data.idKecamatan === "5321") { var app = app5321; }
        else if ($scope.data.idKecamatan === "5322") { var app = app5322; }
        else if ($scope.data.idKecamatan === "5323") { var app = app5323; }
        else if ($scope.data.idKecamatan === "5324") { var app = app5324; }

        $ionicLoading.show()
        var dataSiswa = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo($scope.data.uid);
        dataSiswa.on('child_added', function (snapshot) {
            $ionicLoading.hide();
            $scope.emailSiswa = snapshot.val().email;
            $scope.noHandphoneSiswa = snapshot.val().noHandphone;
            $scope.kelasSiswa = snapshot.val().namaKelas;
            $scope.jenjang = snapshot.val().jenjang;
        })

        var ref = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idRekapJawabanUTSUASSiswa);
        $scope.formData = $firebaseObject(ref);
        // console.log($scope.formData);
        // ref.update({
        //     "jumlahNilai" : 270
        // }).then(function(resp){
        //     console.log("success");
        // })

        var refNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran");
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
                    var updateNilaiRata = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idRekapJawabanUTSUASSiswa);

                    updateNilaiRata.update(JSON.parse(JSON.stringify({
                        "jumlahNilai": $scope.nilaiTotal,
                        "rataRata": $scope.avg,
                    }))).then(function (resp) {
                        // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                    });
                }

            }

        });

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
                        var getData = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + data.idPelajaranUTSUAS + "_" + $scope.data.uid);
                        getData.on("child_added", function (snapshot) {
                            //console.log(snapshot.val());
                            $state.go("menuAdmin.nilaiSiswaDetailUTSUASAdmin", {
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
                                "uid": $stateParams.uid,
                                "idKecamatan": $stateParams.idKecamatan
                            });
                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    var refNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran/" + data.$id);
                    var nilaiHapus = $firebaseObject(refNilai);
                    console.log("nilaiHapus", nilaiHapus);

                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Nilai',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Nilai Ini?',
                        okType: 'button-positive'
                    });
                    confirmPopup.then(function (resp) {
                        if (resp) {
                            nilaiHapus.$remove().then(function (response) {
                                var avgNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran");
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
                                            var updateNilaiRata = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idRekapJawabanUTSUASSiswa);

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

    }])

    .controller('nilaiSiswaDetailUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
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
            "uid": $stateParams.uid,
            "idKecamatan": $stateParams.idKecamatan
        };

        if ($scope.data.idKecamatan === "5315") { var app = app5315; }
        else if ($scope.data.idKecamatan === "5316") { var app = app5316; }
        else if ($scope.data.idKecamatan === "5317") { var app = app5317; }
        else if ($scope.data.idKecamatan === "5318") { var app = app5318; }
        else if ($scope.data.idKecamatan === "5319") { var app = app5319; }
        else if ($scope.data.idKecamatan === "5320") { var app = app5320; }
        else if ($scope.data.idKecamatan === "5321") { var app = app5321; }
        else if ($scope.data.idKecamatan === "5322") { var app = app5322; }
        else if ($scope.data.idKecamatan === "5323") { var app = app5323; }
        else if ($scope.data.idKecamatan === "5324") { var app = app5324; }

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
            var hitungNilai = firebase.database(app).ref("jawabanUTSUASSiswa").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.data.uid);
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
                var ref = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idJawabanUTSUASSiswaPerPelajaran);

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
            var ref = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idJawabanUTSUASSiswaPerPelajaran);
            var refObj = $firebaseObject(ref);

            refObj.$loaded().then(function (response) {
                $scope.totalNilai = response.nilai;
                $scope.statusJawabanBenar = response.benar;
                $scope.statusJawabanSalah = response.salah;
                $scope.kosong = response.kosong;
                $scope.jumlahSoal = response.jumlahSoal;
            });
        }

        var avgNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran");
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
                    var updateNilaiRata = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idRekapJawabanUTSUASSiswa);

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

    .controller('statusJawabanSiswaUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
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
            "uid": $stateParams.uid,
            "idKecamatan": $stateParams.idKecamatan
        };

        //console.log($scope.data);

        if ($scope.data.idKecamatan === "5315") { var app = app5315; }
        else if ($scope.data.idKecamatan === "5316") { var app = app5316; }
        else if ($scope.data.idKecamatan === "5317") { var app = app5317; }
        else if ($scope.data.idKecamatan === "5318") { var app = app5318; }
        else if ($scope.data.idKecamatan === "5319") { var app = app5319; }
        else if ($scope.data.idKecamatan === "5320") { var app = app5320; }
        else if ($scope.data.idKecamatan === "5321") { var app = app5321; }
        else if ($scope.data.idKecamatan === "5322") { var app = app5322; }
        else if ($scope.data.idKecamatan === "5323") { var app = app5323; }
        else if ($scope.data.idKecamatan === "5324") { var app = app5324; }

        if ($scope.data.keterangan === "all" || $scope.data.keterangan === "Kosong") {
            var ref = firebase.database(app).ref("jawabanUTSUASSiswa").orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS + "_" + $scope.data.uid);
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }
        else if ($scope.data.keterangan === "Benar") {
            var ref = firebase.database(app).ref("jawabanUTSUASSiswa").orderByChild("filterStatusJawaban").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.data.uid + "_Benar");
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }

        else if ($scope.data.keterangan === "Salah") {
            var ref = firebase.database(app).ref("jawabanUTSUASSiswa").orderByChild("filterStatusJawaban").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.data.uid + "_Salah");
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
                        okType: "button-positive"
                    });
                }
            });


        };
    }])
