angular.module('app.peringkatAndaTryoutOnlineSiswa', [])

    .controller('peringkatAndaTryoutOnlineSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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



        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }
        $ionicLoading.show()
        $scope.data = {
            "idTryoutOnline": $stateParams.idTryoutOnline,
            "namaTryoutOnline": $stateParams.namaTryoutOnline,
            "jenjang": $stateParams.jenjang,
            "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "totalSiswaLolos": $stateParams.totalSiswaLolos,
            "tingkatKelas": $stateParams.tingkatKelas,
            "idTahunAjaran": $stateParams.idTahunAjaran
        };
        

        $scope.peringkatKotaKabupaten = true;
        $scope.peringkatLain = false;
        $scope.noMoreItemsAvailable = false;
        $scope.totalData = [];
        var totalData = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa").orderByChild("idTryoutOnline").equalTo($scope.data.idTryoutOnline);
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
                XLSX.writeFile(wb, "nilaiPeringkat_" + $scope.data.namaTryoutOnline + ".xlsx");
            }
        })

        $scope.count = 0;
        $scope.loadMore = function () {

            $scope.peringkatKota = $scope.totalData.slice(0, $scope.count += 10);

            if ($scope.peringkatKota.length === $scope.banyakData) {
                $scope.noMoreItemsAvailable = true;
                console.log("totalDataTerakhir", $scope.banyakData);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            // console.log($scope.peringkat.length);
        }

        var refPelajaran = firebase.database(app).ref("pelajaranTryoutOnline").orderByChild("idTryoutOnline").equalTo($scope.data.idTryoutOnline);
        var listRefPelajaran = $firebaseArray(refPelajaran);

        $ionicLoading.show();
        listRefPelajaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPelajaran = response;
        });

        var getKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenSiswa);
        var listGetKecamatan = $firebaseArray(getKecamatan);
        $ionicLoading.show();
        listGetKecamatan.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataKecamatan = response;
        })


        if ($scope.data.TryoutOnlineTingkat === 'Kota/Kabupaten') {
            $scope.formData = {
                "idKecamatan": "",
                "idSekolah": "",
                "idKelas": '',
            }
            $scope.getDataKecamatan = function () {
                //console.log($scope.formData.idKecamatan);
                $scope.peringkatKotaKabupaten = false;
                $scope.peringkatLain = true;

                $ionicLoading.show();
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

                    var refKecamatan = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa").orderByChild("filterIdTryoutOnlineKecamatan").equalTo($scope.data.idTryoutOnline + "_" + $scope.formData.idKecamatan);
                    var lisRefKecamatan = $firebaseArray(refKecamatan);

                    $ionicLoading.show();
                    lisRefKecamatan.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.peringkat = response;
                    })

                    // console.log($scope.formData.idKecamatan)
                    var getSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.formData.idKecamatan + "_" + $scope.data.jenjang);
                    var listGetSekolah = $firebaseArray(getSekolah);
                    $ionicLoading.show();
                    listGetSekolah.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.dataSekolah = response;
                    })
                }

            }

            $scope.getDataSekolah = function () {
                // console.log($scope.formData.idSekolah);
                $scope.peringkatKotaKabupaten = false;
                $scope.peringkatLain = true;

                var refSchool = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa").orderByChild("filterIdTryoutOnlineKecamatanIdSekolah").equalTo($scope.data.idTryoutOnline + "_" + $scope.formData.idKecamatan + "_" + $scope.formData.idSekolah);
                var listRefSchool = $firebaseArray(refSchool);

                $ionicLoading.show();
                listRefSchool.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.peringkat = response;
                })

                $scope.dataKelas = [];
                var refDataKelas = firebase.database().ref("dataKelas").orderByChild("idSekolah").equalTo($scope.formData.idSekolah);
                var listRefDataKelas = $firebaseArray(refDataKelas);
                $ionicLoading.show();
                listRefDataKelas.$loaded().then(function (response) {
                    $ionicLoading.hide();
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
                    $scope.peringkatKotaKabupaten = false;
                    $scope.peringkatLain = true;

                    var refSchool = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa").orderByChild("filterIdTryoutOnlineKecamatanIdSekolahIdKelas").equalTo($scope.data.idTryoutOnline + "_" + $scope.formData.idKecamatan + "_" + $scope.formData.idSekolah + "_" + $scope.formData.idKelas);
                    var listRefSchool = $firebaseArray(refSchool);

                    $ionicLoading.show();
                    listRefSchool.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.peringkat = response;
                    });


                    $ionicLoading.show();
                    var refDataSiswa = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.formData.idKelas);
                    var listRefDataSiswa = $firebaseArray(refDataSiswa);
                    listRefDataSiswa.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.dataSiswa = response;
                    })
                }
                // var ref = firebase.database().ref("dataSiswa").orderByChild("idSekolah").equalTo($scope.formData.idSekolah);
                // var listData = $firebaseArray(ref);

                // $ionicLoading.show();
                // listData.$loaded().then(function (response) {
                //     $ionicLoading.hide();
                //     $scope.dataSiswa = response;
                //     // console.log(response);
                //     // for(i=0; i<response.length; i++){
                //     //     var updateDataSiswa = firebase.database().ref("dataSiswa/"+response[i].$id);
                //     //     updateDataSiswa.update(JSON.parse(JSON.stringify({
                //     //         "registrasiTryoutOnline" : $scope.data.idTryoutOnline
                //     //     }))).then(function(resp){
                //     //         console.log("dataSiswaDiUpdate "+response[i].namaPengguna)
                //     //     })
                //     // }
                // });
            }
        }

        if ($scope.data.TryoutOnlineTingkat === 'Sekolah') {
            $scope.formData = {
                "idKelas": '',
                "idPelajaran": ''
            }

            $scope.dataKelas = [];
            var refDataKelas = firebase.database().ref("dataKelas").orderByChild("idSekolah").equalTo($scope.idSekolahSiswa);
            var listRefDataKelas = $firebaseArray(refDataKelas);
            $ionicLoading.show();
            listRefDataKelas.$loaded().then(function (response) {
                $ionicLoading.hide();
                for (i = 0; i < response.length; i++) {
                    if (response[i].tingkatKelas === $scope.data.tingkatKelas && response[i].idTahunAjaran === $scope.data.idTahunAjaran) {
                        $scope.dataKelas.push({
                            "idKelas": response[i].$id,
                            "namaKelas": response[i].namaKelas
                        })
                    }
                }
                // console.log($scope.dataKelas)
            })

            $scope.getIdKelas = function () {
                $scope.peringkatKotaKabupaten = false;
                $scope.peringkatLain = true;
                $scope.tampilPelajaran=true;
                var ref = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa").orderByChild("filterIdTyoutOnlineIdKelas").equalTo($scope.data.idTryoutOnline + "_" + $scope.formData.idKelas);
                var listRef = $firebaseArray(ref);

                $ionicLoading.show();
                listRef.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.peringkat = response;

                    console.log("response", response);

                    $scope.peringkat.sort(function (a, b) {
                        return b.jumlahNilai - a.jumlahNilai
                    })
                });

                if ($scope.formData.idPelajaran !== "") {
                    var ref = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran").orderByChild("filterIdTryoutOnlineIdKelasIdPelajaran").equalTo($scope.data.idTryoutOnline + "_" + $scope.formData.idKelas + "_" + $scope.formData.idPelajaran);
                    var listRef = $firebaseArray(ref);
                    listRef.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.peringkatPelajaran = response;

                        // console.log("response", response);

                        $scope.peringkat.sort(function (a, b) {
                            return b.nilai - a.nilai
                        })
                    })
                }
            }

            $scope.getIdPelajaran = function () {
                $scope.peringkatKotaKabupaten = false;
                $scope.peringkatLain = false;
                $scope.tampilNilaiPelajaranPerKelas = true;
                $scope.peringkatKotaKabupaten = false;
                $ionicLoading.show();
                var ref = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran").orderByChild("filterIdTryoutOnlineIdKelasIdPelajaran").equalTo($scope.data.idTryoutOnline + "_" + $scope.formData.idKelas + "_" + $scope.formData.idPelajaran);
                var listRef = $firebaseArray(ref);
                listRef.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.peringkatPelajaran = response;

                    // console.log("response", response);

                    $scope.peringkat.sort(function (a, b) {
                        return b.nilai - a.nilai
                    })
                })
            }
        }

        $scope.dataNilaiSiswa = function (data) {
            //console.log(data);
            $state.go("menuSiswa.nilaiSiswaTryoutOnlineSiswa", {
                "idTryoutOnline": $stateParams.idTryoutOnline,
                "namaTryoutOnline": $stateParams.namaTryoutOnline,
                "jenjang": $stateParams.jenjang,
                "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
                "namaKota": $stateParams.namaKota,
                "namaProvinsi": $stateParams.namaProvinsi,
                "semester": $stateParams.semester,
                "tahunAjaran": $stateParams.tahunAjaran,
                "idRekapJawabanTryoutOnlineSiswa": data.$id,
                "namaPengguna": data.namaPengguna,
                "uid": data.uid,
            })

        };

    }])

    .controller('nilaiSiswaTryoutOnlineSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahSiswa=== "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahSiswa=== "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahSiswa === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }



        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        $scope.data = {
            "idTryoutOnline": $stateParams.idTryoutOnline,
            "namaTryoutOnline": $stateParams.namaTryoutOnline,
            "jenjang": $stateParams.jenjang,
            "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idRekapJawabanTryoutOnlineSiswa": $stateParams.idRekapJawabanTryoutOnlineSiswa,
            "namaPengguna": $stateParams.namaPengguna,
            "uid": $stateParams.uid
        };
        //console.log($scope.data);

        var ref = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.data.idRekapJawabanTryoutOnlineSiswa);
        $scope.formData = $firebaseObject(ref);

        var refNilai = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.data.idRekapJawabanTryoutOnlineSiswa + "/pelajaran");
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
                    var updateNilaiRata = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.data.idRekapJawabanTryoutOnlineSiswa);

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
            var getData = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran").orderByChild("filter").equalTo($stateParams.idTryoutOnline + "_" + data.idPelajaranTryoutOnline + "_" + $scope.data.uid);
            getData.on("child_added", function (snapshot) {
                //console.log(snapshot.val());
                $state.go("menuSiswa.nilaiSiswaDetailTryoutOnlineSiswa", {
                    "idTryoutOnline": $stateParams.idTryoutOnline,
                    "namaTryoutOnline": $stateParams.namaTryoutOnline,
                    "jenjang": $stateParams.jenjang,
                    "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
                    "namaKota": $stateParams.namaKota,
                    "namaProvinsi": $stateParams.namaProvinsi,
                    "semester": $stateParams.semester,
                    "tahunAjaran": $stateParams.tahunAjaran,
                    "idPelajaranTryoutOnline": data.idPelajaranTryoutOnline,
                    "idPelajaran": data.idPelajaran,
                    "pelajaran": data.pelajaran,
                    "statusFinish": snapshot.val().statusFinish,
                    "idJawabanTryoutOnlineSiswaPerPelajaran": snapshot.key,
                    "idRekapJawabanTryoutOnlineSiswa": $stateParams.idRekapJawabanTryoutOnlineSiswa,
                    "namaPengguna": $stateParams.namaPengguna,
                    "uid": $stateParams.uid
                });
            });

        };

    }])

    .controller('nilaiSiswaDetailTryoutOnlineSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahSiswa=== "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahSiswa=== "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahSiswa === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }


        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        $scope.data = {
            "idTryoutOnline": $stateParams.idTryoutOnline,
            "namaTryoutOnline": $stateParams.namaTryoutOnline,
            "jenjang": $stateParams.jenjang,
            "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idPelajaranTryoutOnline": $stateParams.idPelajaranTryoutOnline,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran,
            "statusFinish": $stateParams.statusFinish,
            "idJawabanTryoutOnlineSiswaPerPelajaran": $stateParams.idJawabanTryoutOnlineSiswaPerPelajaran,
            "idRekapJawabanTryoutOnlineSiswa": $stateParams.idRekapJawabanTryoutOnlineSiswa,
            "namaPengguna": $stateParams.namaPengguna,
            "uid": $stateParams.uid
        };


        if ($scope.data.statusFinish === false) {
            //Pengaturan Umum Ujian
            var refPengaturanUmum = firebase.database(app).ref("pengaturanUmumUjianTryoutOnline").orderByChild("filter").equalTo($stateParams.idTryoutOnline + "_" + $stateParams.idPelajaranTryoutOnline);
            refPengaturanUmum.on("child_added", function (snapshot) {
                $scope.soalAcak = snapshot.val().soalAcak;
                $scope.nilaiMaksimum = snapshot.val().nilaiMaksimum * 1;
                $scope.jumlahSoal = snapshot.val().jumlahSoal * 1;
                $scope.bobotNilai = snapshot.val().nilaiMaksimum * 1 / snapshot.val().jumlahSoal * 1;

            });

            //Menghitung Nilai Per Pelajaran
            var hitungNilai = firebase.database(app).ref("jawabanTryoutOnlineSiswa").orderByChild("filter").equalTo($stateParams.idTryoutOnline + "_" + $stateParams.idPelajaranTryoutOnline + "_" + $scope.data.uid);
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
                var ref = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran/" + $scope.data.idJawabanTryoutOnlineSiswaPerPelajaran);

                ref.update(JSON.parse(JSON.stringify({
                    "benar": $scope.statusJawabanBenar,
                    "salah": $scope.statusJawabanSalah,
                    "kosong": $scope.kosong,
                    "nilai": $scope.totalNilai,
                    "statusFinish": true
                }))).then(function (resp) {
                    //console.log("Updated");
                });

            });
        }

        if ($scope.data.statusFinish === true) {
            var ref = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran/" + $scope.data.idJawabanTryoutOnlineSiswaPerPelajaran);
            var refObj = $firebaseObject(ref);

            refObj.$loaded().then(function (response) {
                $scope.totalNilai = response.nilai;
                $scope.statusJawabanBenar = response.benar;
                $scope.statusJawabanSalah = response.salah;
                $scope.kosong = response.kosong;
                $scope.jumlahSoal = response.jumlahSoal;
            });
        }

        var avgNilai = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.data.idRekapJawabanTryoutOnlineSiswa + "/pelajaran");
        var listAvgNilai = $firebaseArray(avgNilai);

        $scope.nilaiTotal = 0;
        listAvgNilai.$loaded().then(function (response) {
            for (i = 0; i < response.length; i++) {
                var penilaian = response[i].nilai;
                $scope.nilaiTotal = $scope.nilaiTotal + penilaian;
                $scope.avg = $scope.nilaiTotal / response.length;
                // console.log("total Nilai", $scope.nilaiTotal);
                // console.log("avg", $scope.avg);
                var updateNilaiRata = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.data.idRekapJawabanTryoutOnlineSiswa);

                updateNilaiRata.update(JSON.parse(JSON.stringify({
                    "jumlahNilai": $scope.nilaiTotal,
                    "rataRata": $scope.avg,
                }))).then(function (resp) {
                    // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                });
            }

        });

    }])

    .controller('statusJawabanSiswaTryoutOnlineSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahSiswa=== "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahSiswa=== "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahSiswa === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }



        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        $scope.data = {
            "idTryoutOnline": $stateParams.idTryoutOnline,
            "namaTryoutOnline": $stateParams.namaTryoutOnline,
            "keterangan": $stateParams.keterangan,
            "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idPelajaranTryoutOnline": $stateParams.idPelajaranTryoutOnline,
            "pelajaran": $stateParams.pelajaran,
            "namaPengguna": $stateParams.namaPengguna,
            "uid": $stateParams.uid
        };

        //console.log($scope.data);

        if ($scope.data.keterangan === "all" || $scope.data.keterangan === "Kosong") {
            var ref = firebase.database(app).ref("jawabanTryoutOnlineSiswa").orderByChild("filter").equalTo($scope.data.idTryoutOnline + "_" + $scope.data.idPelajaranTryoutOnline + "_" + $scope.data.uid);
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }
        else if ($scope.data.keterangan === "Benar") {
            var ref = firebase.database(app).ref("jawabanTryoutOnlineSiswa").orderByChild("filterStatusJawaban").equalTo($stateParams.idTryoutOnline + "_" + $stateParams.idPelajaranTryoutOnline + "_" + $scope.data.uid + "_Benar");
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }

        else if ($scope.data.keterangan === "Salah") {
            var ref = firebase.database(app).ref("jawabanTryoutOnlineSiswa").orderByChild("filterStatusJawaban").equalTo($stateParams.idTryoutOnline + "_" + $stateParams.idPelajaranTryoutOnline + "_" + $scope.data.uid + "_Salah");
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }


        $scope.getSoal = function (jawaban) {
            //console.log(jawaban);

            var pembahasanSoal = firebase.database(app).ref("pengaturanUmumUjianTryoutOnline").orderByChild("filter").equalTo($stateParams.idTryoutOnline + "_" + $stateParams.idPelajaranTryoutOnline);
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