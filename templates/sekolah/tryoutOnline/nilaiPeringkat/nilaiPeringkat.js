angular.module('app.nilaiPeringkatTryoutOnlineSekolah', [])

    .controller('nilaiPeringkatTryoutOnlineSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "idTryoutOnline": $stateParams.idTryoutOnline,
            "namaTryoutOnline": $stateParams.namaTryoutOnline,
            "jenjang": $stateParams.jenjang,
            "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "totalSiswaLolos": $stateParams.totalSiswaLolos,
            "tanggalPelaksanaan": $stateParams.tanggalPelaksanaan,
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

        var getKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenSekolah);
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
                    var refDataSiswa = firebase.database().ref("dataSiswa").orderByChild("idKelas").equalTo($scope.formData.idKelas);
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
            var refDataKelas = firebase.database().ref("dataKelas").orderByChild("idSekolah").equalTo($scope.idSekolah);
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
                $scope.tampilPelajaran = true;
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
            $state.go("menuSekolah.nilaiSiswaTryoutOnlineSekolah", {
                "idTryoutOnline": $stateParams.idTryoutOnline,
                "namaTryoutOnline": $stateParams.namaTryoutOnline,
                "jenjang": $stateParams.jenjang,
                "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
                "namaKota": $stateParams.namaKota,
                "namaProvinsi": $stateParams.namaProvinsi,
                "namaSekolah": data.namaSekolah,
                "semester": $stateParams.semester,
                "tahunAjaran": $stateParams.tahunAjaran,
                "idRekapJawabanTryoutOnlineSiswa": data.$id,
                "namaPengguna": data.namaPengguna,
                "uid": data.uid,
                "lulus": data.lulus,
                "tanggalPelaksanaan": $stateParams.tanggalPelaksanaan,
            })

        };

    }])

    .controller('nilaiSiswaTryoutOnlineSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "idTryoutOnline": $stateParams.idTryoutOnline,
            "namaTryoutOnline": $stateParams.namaTryoutOnline,
            "jenjang": $stateParams.jenjang,
            "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "namaSekolah": $stateParams.namaSekolah,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idRekapJawabanTryoutOnlineSiswa": $stateParams.idRekapJawabanTryoutOnlineSiswa,
            "namaPengguna": $stateParams.namaPengguna,
            "uid": $stateParams.uid,
            "lulus": $stateParams.lulus,
            "tanggalPelaksanaan": $stateParams.tanggalPelaksanaan,
        };
        // console.log($scope.data);
        $ionicLoading.show()
        var dataSiswa = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo($scope.data.uid);
        dataSiswa.on('child_added', function (snapshot) {
            $ionicLoading.hide();
            $scope.emailSiswa = snapshot.val().email;
            $scope.noHandphoneSiswa = snapshot.val().noHandphone;
            $scope.kelasSiswa = snapshot.val().namaKelas;
            $scope.jenjang = snapshot.val().jenjang;
        })

        var ref = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.data.idRekapJawabanTryoutOnlineSiswa);
        $scope.formData = $firebaseObject(ref);
        // console.log($scope.formData);
        // ref.update({
        //     "jumlahNilai" : 270
        // }).then(function(resp){
        //     console.log("success");
        // })

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
            if ($scope.data.TryoutOnlineTingkat !== "Sekolah") {
                $ionicActionSheet.show({
                    titleText: 'Pelajaran : ' + data.pelajaran,
                    buttons: [
                        { text: '<i class="icon ion-checkmark-circled"></i> Lihat Detail' },
                    ],
                    // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Nilai',
                    cancelText: 'Cancel',
                    cancel: function () {
                        //console.log('CANCELLED');
                    },
                    buttonClicked: function (index) {
                        if (index === 0) {
                            var getData = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran").orderByChild("filter").equalTo($stateParams.idTryoutOnline + "_" + data.idPelajaranTryoutOnline + "_" + $scope.data.uid);
                            getData.on("child_added", function (snapshot) {
                                //console.log(snapshot.val());
                                $state.go("menuSekolah.nilaiSiswaDetailTryoutOnlineSekolah", {
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
                        }
                        return true;
                    },

                });
            }
            else {
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
                            var getData = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran").orderByChild("filter").equalTo($stateParams.idTryoutOnline + "_" + data.idPelajaranTryoutOnline + "_" + $scope.data.uid);
                            getData.on("child_added", function (snapshot) {
                                //console.log(snapshot.val());
                                $state.go("menuSekolah.nilaiSiswaDetailTryoutOnlineSekolah", {
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
                        }
                        return true;
                    },

                    destructiveButtonClicked: function () {
                        var refNilai = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.data.idRekapJawabanTryoutOnlineSiswa + "/pelajaran/" + data.$id);
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
                                    var avgNilai = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.data.idRekapJawabanTryoutOnlineSiswa + "/pelajaran");
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
                                });

                            }
                            else {
                                console.log('Tidak Jadi Menghapus');
                            }
                        })

                        return true;
                    }

                });
            }

        };

    }])

    .controller('nilaiSiswaDetailTryoutOnlineSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
                    console.log("Updated");
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


    }])

    .controller('statusJawabanSiswaTryoutOnlineSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah');

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
                        okType: "button-balanced"
                    });
                }
            });


        };
    }])
