angular.module('app.registrasiPesertaTryoutOnlineSekolah', [])

    .controller('registrasiPesertaTryoutOnlineSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "idTryoutOnline": $stateParams.idTryoutOnline,
            "namaTryoutOnline": $stateParams.namaTryoutOnline,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
            "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
            "id_provinsi": $stateParams.id_provinsi,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "idTahunAjaran": $stateParams.idTahunAjaran,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idSekolah": $stateParams.idSekolah,
        };
        // console.log($scope.data)

        if ($scope.data.TryoutOnlineTingkat === 'Sekolah') {

            $scope.formData = {
                "idKelas": '',
            }

            $scope.dataKelas = [];
            var refDataKelas = firebase.database().ref("dataKelas").orderByChild("idSekolah").equalTo($scope.data.idSekolah);
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
            })

            $scope.getIdKelas = function () {
                $ionicLoading.show();
                var refDataSiswa = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.formData.idKelas);
                var listRefDataSiswa = $firebaseArray(refDataSiswa);
                listRefDataSiswa.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.dataSiswa = response;
                })
            }
        }

        if ($scope.data.TryoutOnlineTingkat === 'Kota/Kabupaten') {
            console.log('danu')
            $scope.formData = {
                "idKelas": '',
            }

            $scope.dataKelas = [];
            var refDataKelas = firebase.database().ref("dataKelas").orderByChild("idSekolah").equalTo($scope.data.idSekolah);
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
            })

            $scope.getIdKelas = function () {
                $ionicLoading.show();
                var refDataSiswa = firebase.database(app).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.formData.idKelas);
                var listRefDataSiswa = $firebaseArray(refDataSiswa);
                listRefDataSiswa.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.dataSiswa = response;
                })
            }
        }



        // if ($scope.data.TryoutOnlineTingkat === "Kota/Kabupaten") {
        //     var ref = firebase.database().ref("dataSiswa").orderByChild("filterRegistrasiKota").equalTo($scope.data.jenjang + "_" + $scope.data.id_kota_kabupaten);
        // }
        // else if ($scope.data.TryoutOnlineTingkat === "Provinsi") {
        //     var ref = firebase.database().ref("dataSiswa").orderByChild("filterRegistrasiProvinsi").equalTo($scope.data.jenjang + "_" + $scope.data.id_provinsi);

        // }
        // else if ($scope.data.TryoutOnlineTingkat === "Sekolah") {
        //     var ref = firebase.database().ref("dataSiswa").orderByChild("idSekolah").equalTo($scope.data.idSekolah);
        // }
        // var listData = $firebaseArray(ref);

        // $ionicLoading.show();
        // listData.$loaded().then(function (response) {
        //     $ionicLoading.hide();
        //     $scope.dataSiswa = response;
        //     // for (i = 0; i < response.length; i++) {
        //     //     var updateDataSiswa = firebase.database().ref("dataSiswa/" + response[i].$id);
        //     //     updateDataSiswa.update(JSON.parse(JSON.stringify({
        //     //         "registrasiTryoutOnline": $scope.data.idTryoutOnline
        //     //     }))).then(function (resp) {
        //     //         console.log("dataSiswaDiUpdate " + response[i].namaPengguna)
        //     //     })
        //     // }
        // });

        $scope.formData = {
            "namaPengguna": ""
        }


        $scope.getData = function (data) {
            // console.log(data);
            $ionicActionSheet.show({
                titleText: 'Nama : ' + data.namaPengguna,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Registrasikan' },
                ],
                //destructiveText: '<i class="icon ion-trash-b"></i> Hapus TryoutOnline',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {

                        var refpesertaTryoutOnline = firebase.database(app).ref("pesertaTryoutOnline").orderByChild("filter").equalTo(data.uid + "_" + $scope.data.idTryoutOnline);
                        var listpesertaTryoutOnline = $firebaseArray(refpesertaTryoutOnline);
                        $ionicLoading.show()
                        listpesertaTryoutOnline.$loaded().then(function (response) {
                            if (response.length === 0) {
                                var refAdd = firebase.database(app).ref("pesertaTryoutOnline");
                                // var addData = $firebaseArray(refAdd);
                                refAdd.push({
                                    "idSiswa": data.$id,
                                    "alamat": data.alamat,
                                    "email": data.email,
                                    "filterRegistrasiKota": data.filterRegistrasiKota,
                                    "filterRegistrasiProvinsi": data.filterRegistrasiProvinsi,
                                    "idKecamatan": data.idKecamatan,
                                    "idKotaKabupaten": data.idKotaKabupaten,
                                    "idProvinsi": data.idProvinsi,
                                    "idSekolah": data.idSekolah,
                                    "jenisKelamin": data.jenisKelamin,
                                    "jenjang": data.jenjang,
                                    "tingkatKelas": data.tingkatKelas,
                                    "namaKecamatan": data.namaKecamatan,
                                    "idKelas": data.idKelas,
                                    "namaKelas": data.namaKelas,
                                    "namaKotaKabupaten": data.namaKotaKabupaten,
                                    "namaPengguna": data.namaPengguna,
                                    "namaProvinsi": data.namaProvinsi,
                                    "namaSekolah": data.namaSekolah,
                                    "noHandphone": data.noHandphone,
                                    "uid": data.uid,

                                    "idTryoutOnline": $stateParams.idTryoutOnline,
                                    "filter": data.uid + "_" + $scope.data.idTryoutOnline
                                }).then(function (resp) {
                                    console.log("pesertaTryoutOnlineSuccess")
                                    //Menambahkan Table Rekap Jawaban Olimpiade Siswa
                                    var tambahData = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa");
                                    tambahData.push({
                                        "idTryoutOnline": $stateParams.idTryoutOnline,
                                        "namaTryoutOnline": $stateParams.namaTryoutOnline,
                                        "jenjang": $stateParams.jenjang,
                                        "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
                                        "namaKota": $stateParams.namaKota,
                                        "namaProvinsi": $stateParams.namaProvinsi,
                                        "semester": $stateParams.semester,
                                        "tahunAjaran": $stateParams.tahunAjaran,

                                        "idPengguna": data.$id,
                                        "namaPengguna": data.namaPengguna,
                                        "uid": data.uid,
                                        "idSekolah": data.idSekolah,
                                        "idKecamatan": data.idKecamatan,
                                        "idKotaKabupaten": data.idKotaKabupaten,
                                        "idProvinsi": data.idProvinsi,
                                        "namaSekolah": data.namaSekolah,
                                        "tingkatKelas": data.tingkatKelas,
                                        "idKelas": data.idKelas,
                                        "namaKelas": data.namaKelas,

                                        "pelajaran": "",
                                        "filter": $stateParams.idTryoutOnline + "_" + data.uid,
                                        "jumlahNilai": 0,
                                        "rataRata": 0,

                                        "filterIdTyoutOnlineIdKelas": $stateParams.idTryoutOnline + "_" + data.idKelas,
                                        "filterIdTryoutOnlineKecamatan": $stateParams.idTryoutOnline + "_" + data.idKecamatan,
                                        "filterIdTryoutOnlineKecamatanIdSekolah": $stateParams.idTryoutOnline + "_" + data.idKecamatan + "_" + data.idSekolah,
                                        "filterIdTryoutOnlineKecamatanIdSekolahIdKelas": $stateParams.idTryoutOnline + "_" + data.idKecamatan + "_" + data.idSekolah + "_" + data.idKelas
                                    }).then(function (resp) {
                                        $ionicLoading.hide()
                                        console.log("success Rekap");

                                        //Tambahkan data ke tabel Jawaban Olimpiade Peserta PerPelajaran
                                        var addData = firebase.database(app).ref("pengaturanUmumUjianTryoutOnline").orderByChild("idTryoutOnline").equalTo($scope.data.idTryoutOnline);
                                        var listAddData = $firebaseArray(addData);
                                        $ionicLoading.show();
                                        listAddData.$loaded().then(function (response) {
                                            for (i = 0; i < response.length; i++) {

                                                var tambahData = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran");
                                                tambahData.push({
                                                    "idTryoutOnline": $stateParams.idTryoutOnline,
                                                    "namaTryoutOnline": $stateParams.namaTryoutOnline,
                                                    "jenjang": $stateParams.jenjang,
                                                    "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
                                                    "namaKota": $stateParams.namaKota,
                                                    "namaProvinsi": $stateParams.namaProvinsi,
                                                    "semester": $stateParams.semester,
                                                    "tahunAjaran": $stateParams.tahunAjaran,
                                                    "idPelajaranTryoutOnline": response[i].idPelajaranTryoutOnline,
                                                    "idPelajaran": response[i].idPelajaran,
                                                    "pelajaran": response[i].pelajaran,

                                                    "idKelas": data.idKelas,
                                                    "namaKelas": data.namaKelas,
                                                    "filterIdTryoutOnlineIdKelasIdPelajaran": $scope.data.idTryoutOnline + "_" + data.idKelas + "_" + response[i].idPelajaran,

                                                    "idPengguna": data.$id,
                                                    "namaPengguna": data.namaPengguna,
                                                    "uid": data.uid,
                                                    "idSekolah": data.idSekolah,

                                                    "benar": 0,
                                                    "salah": 0,
                                                    "kosong": 0,
                                                    "nilai": 0,
                                                    
                                                    "statusFinish": false,
                                                    "bukaUjianSekarang": response[i].bukaUjianSekarang,
                                                    "tutupUjianSekarang": response[i].tutupUjianSekarang,
                                                    "jumlahSoal": 0,
                                                    "statusTerjawab": false,

                                                    "filter": $stateParams.idTryoutOnline + "_" + response[i].idPelajaranTryoutOnline + "_" + data.uid,
                                                    "filterMulaiUjian": $stateParams.idTryoutOnline + "_" + data.uid,

                                                    "jamDiMulai": "",
                                                    "jamBerakhir": "",
                                                    "jamSelesai": "",
                                                    "jamDurasiUjian": "",

                                                }).then(function (resp) {
                                                    $ionicLoading.hide()
                                                    console.log("successjawabanTryoutOnlineSiswaPerPelajaran");
                                                    var updateDataSiswa = firebase.database(appSiswa).ref("dataSiswa/" + data.$id);
                                                    updateDataSiswa.update(JSON.parse(JSON.stringify({
                                                        "registrasiTryoutOnline": $scope.data.idTryoutOnline
                                                    }))).then(function (resp) {
                                                        console.log("dataSiswaDiUpdate")
                                                    })
                                                })

                                            }
                                        });
                                    });
                                    var refpesertaTryoutOnline = firebase.database(app).ref("pesertaTryoutOnline").orderByChild("idTryoutOnline").equalTo($scope.data.idTryoutOnline);
                                    var listpesertaTryoutOnline = $firebaseArray(refpesertaTryoutOnline);

                                    listpesertaTryoutOnline.$loaded().then(function (response) {
                                        $scope.totalpesertaTryoutOnline = response.length;
                                        if (response.length !== 0) {
                                            $scope.aktif = true;
                                        }
                                    });

                                    $ionicPopup.alert({
                                        title: 'SUKSES',
                                        template: 'REGISTRASI SUKSES',
                                    })
                                });
                            }
                            else {
                                $ionicLoading.hide()
                                $ionicPopup.alert({
                                    title: 'PERHATIAN',
                                    template: 'Maaf, Data siswa ini sudah diregistrasikan, cek kembali, terima kasih',
                                })
                            }
                        });

                    }
                    return true;
                },

            });

        };

        var refpesertaTryoutOnline = firebase.database(app).ref("pesertaTryoutOnline").orderByChild("idTryoutOnline").equalTo($scope.data.idTryoutOnline);
        var listpesertaTryoutOnline = $firebaseArray(refpesertaTryoutOnline);

        listpesertaTryoutOnline.$loaded().then(function (response) {
            $scope.totalpesertaTryoutOnline = response.length;
            if (response.length !== 0) {
                $scope.aktif = true;
            }
        });

        $scope.pesertaTeregistrasi = function () {
            $state.go('menuSekolah.pesertaTeregistrasiTryoutOnlineSekolah', {
                "idTryoutOnline": $stateParams.idTryoutOnline,
                "namaTryoutOnline": $stateParams.namaTryoutOnline,
                "jenjang": $stateParams.jenjang,
                "tingkatKelas": $stateParams.tingkatKelas,
                "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
                "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
                "id_provinsi": $stateParams.id_provinsi
            });
        };

    }])

    .controller('pesertaTeregistrasiTryoutOnlineSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "idTryoutOnline": $stateParams.idTryoutOnline,
            "namaTryoutOnline": $stateParams.namaTryoutOnline,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
            "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
            "id_provinsi": $stateParams.id_provinsi
        };

        var refpesertaTryoutOnline = firebase.database(app).ref("pesertaTryoutOnline").orderByChild("idTryoutOnline").equalTo($scope.data.idTryoutOnline);
        var listpesertaTryoutOnline = $firebaseArray(refpesertaTryoutOnline);

        listpesertaTryoutOnline.$loaded().then(function (response) {
            $scope.datapesertaTryoutOnline = response;
        });

        $scope.getDataSiswa = function (data) {
            console.log(data);
            $ionicActionSheet.show({
                titleText: 'Nama Siswa : ' + data.namaPengguna,
                buttons: [
                    // { text: '<i class="icon ion-checkmark-circled"></i> Pengaturan Umum' },
                    // { text: '<i class="icon ion-checkmark-circled"></i> Kisi-Kisi Soal' },
                    // { text: '<i class="icon ion-checkmark-circled"></i> Registrasi Peserta' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Registrasi',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    // if(index===0){
                    //     $state.go('menu.pengaturanUmum',{
                    //         "idTryoutOnline" : data.idTryoutOnline,
                    //         "namaTryoutOnline" : data.namaTryoutOnline,
                    //         "jenjang" : data.jenjang,
                    //         "tingkatKelas" : data.tingkatKelas,
                    //         "idPelajaranTryoutOnline" : data.$id,
                    //         "idPelajaran" : data.idPelajaran,
                    //         "pelajaran" : data.pelajaran
                    //     });
                    // }
                    // if(index===1){
                    //     $state.go('menu.kisiKisiSoal',{
                    //         "idTryoutOnline" : data.idTryoutOnline,
                    //         "namaTryoutOnline" : data.namaTryoutOnline,
                    //         "jenjang" : data.jenjang,
                    //         "tingkatKelas" : data.tingkatKelas,
                    //         "idPelajaranTryoutOnline" : data.$id,
                    //         "idPelajaran" : data.idPelajaran,
                    //         "pelajaran" : data.pelajaran
                    //     });
                    // }
                    // if(index===2){
                    //     $ionicPopup.alert({
                    //         title: 'Pemberitahuan',
                    //         template: 'Untuk mengetahui hasil seleksi jalur Luar Zonasi, silahkan datang ke sekolah tempat tujuan. Terimakasih', 
                    //     })
                    // }
                    // if(index===3){
                    //     $ionicPopup.alert({
                    //         title: 'Pemberitahuan',
                    //         template: 'Untuk mengetahui hasil seleksi jalur Bina Lingkungan, silahkan datang ke sekolah tempat tujuan. Terimakasih', 
                    //     })
                    // }
                    // return true;
                },

                destructiveButtonClicked: function () {
                    if (data.idSekolah === $scope.idSekolah) {
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Hapus Data',
                            template: 'Apakah Kamu Yakin Ingin Menghapus Data Registrasi Untuk Siswa Ini?',
                            okType: "button-balanced",
                        });
                        confirmPopup.then(function (res) {
                            if (res) {


                                //Menghapus Jawaban Olimpiade Siswa
                                var a = firebase.database(app).ref("jawabanTryoutOnlineSiswa").orderByChild("filterHapusRegistrasi").equalTo($stateParams.idTryoutOnline + "_" + data.uid);
                                var listA = $firebaseArray(a);
                                listA.$loaded().then(function (response) {

                                    for (i = 0; i < response.length; i++) {

                                        var a1 = firebase.database(app).ref("jawabanTryoutOnlineSiswa/" + response[i].$id);
                                        var a1Delete = $firebaseObject(a1);
                                        a1Delete.$remove().then(function (resp) {
                                            console.log("jawabanTryoutOnlineSiswa Dihapus")
                                        })

                                    }

                                });

                                //Menghapus Jawaban Olimpiade Siswa PerPelajaran
                                var b = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran").orderByChild("filterMulaiUjian").equalTo($stateParams.idTryoutOnline + "_" + data.uid);
                                var listB = $firebaseArray(b);
                                listB.$loaded().then(function (response) {

                                    for (i = 0; i < response.length; i++) {

                                        var b1 = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran/" + response[i].$id);
                                        var b1Delete = $firebaseObject(b1);
                                        b1Delete.$remove().then(function (resp) {
                                            console.log("jawabanTryoutOnlineSiswaPerPelajaran Dihapus");
                                        })

                                    }
                                });

                                //Menghapus Rekap Jawaban Olimpiade
                                var c = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa").orderByChild("filter").equalTo($stateParams.idTryoutOnline + "_" + data.uid);
                                var listC = $firebaseArray(c);
                                listC.$loaded().then(function (response) {
                                    if (response.length === 0) {
                                        console.log("tidakAdaRekapYangDihapus");
                                    }
                                    else if (response.length === 1) {
                                        var c1 = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + response[0].$id);
                                        c1Delete = $firebaseObject(c1);
                                        c1Delete.$remove().then(function (resp) {
                                            console.log("rekapJawabanTryoutOnlineSiswa Dihapus");
                                        })
                                    }

                                })
                                // c.once("child_added", function(snapshot){
                                //     var id = snapshot.key;
                                //     var c1 = firebase.database().ref("rekapJawabanTryoutOnlineSiswa/"+id);
                                //     c1Delete = $firebaseObject(c1);
                                //     c1Delete.$remove().then(function(resp){
                                //         console.log("rekapJawabanTryoutOnlineSiswa Dihapus");
                                //     })
                                // });

                                //Menghapus Peserta Olimpiade
                                var refObj = firebase.database(app).ref("pesertaTryoutOnline/" + data.$id);
                                var objDelete = $firebaseObject(refObj);
                                objDelete.$remove().then(function (ref) {
                                    console.log("pesertaTryoutOnline Dihapus");
                                });

                                //Update Data Siswa 
                                var updateDataSiswa = firebase.database(appSiswa).ref("dataSiswa/" + data.idSiswa);
                                updateDataSiswa.update(JSON.parse(JSON.stringify({
                                    "registrasiTryoutOnline": ""
                                }))).then(function (resp) {
                                    console.log("dataSiswaDiUpdate")
                                })
                            }
                            else {
                                //console.log('Tidak Jadi Menghapus');
                            }
                        });
                        return true;
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Pemberitahuan',
                            template: 'Maaf, hanya boleh menghapus peserta dari sekolah Anda saja, Terimakasih',
                        })
                        return true;
                    }

                }
            });

        };

    }])

    .controller('registrasiPesertaKotaTryoutOnlineSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "idTryoutOnline": $stateParams.idTryoutOnline,
            "namaTryoutOnline": $stateParams.namaTryoutOnline,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
            "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
            "id_provinsi": $stateParams.id_provinsi,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "idTahunAjaran": $stateParams.idTahunAjaran,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idSekolah": $stateParams.idSekolah,
        };

        $scope.formData = {
            "idKecamatan": "",
            "idSekolah": "",
            "idKelas": '',
        }

        var getKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo($scope.data.id_kota_kabupaten);
        var listGetKecamatan = $firebaseArray(getKecamatan);
        $ionicLoading.show();
        listGetKecamatan.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataKecamatan = response;
        })


        $scope.getDataKecamatan = function () {
            //console.log($scope.formData.idKecamatan);
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
            console.log($scope.formData.idSekolah);
            $scope.dataKelas = [];
            var refDataKelas = firebase.database().ref("dataKelas").orderByChild("idSekolah").equalTo($scope.formData.idSekolah);
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
            })

            $scope.getIdKelas = function () {
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

        $scope.formData = {
            "namaPengguna": ""
        }


        $scope.getData = function (data) {
            console.log(data);
            $ionicActionSheet.show({
                titleText: 'Nama : ' + data.namaPengguna,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Registrasikan' },
                ],
                //destructiveText: '<i class="icon ion-trash-b"></i> Hapus TryoutOnline',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {

                        var refpesertaTryoutOnline = firebase.database(app).ref("pesertaTryoutOnline").orderByChild("filter").equalTo(data.uid + "_" + $scope.data.idTryoutOnline);
                        var listpesertaTryoutOnline = $firebaseArray(refpesertaTryoutOnline);

                        $ionicLoading.show();
                        listpesertaTryoutOnline.$loaded().then(function (response) {
                            if (response.length === 0) {
                                var refAdd = firebase.database(app).ref("pesertaTryoutOnline");
                                refAdd.push({
                                    "idSiswa": data.$id,
                                    "alamat": data.alamat,
                                    "email": data.email,
                                    "filterRegistrasiKota": data.filterRegistrasiKota,
                                    "filterRegistrasiProvinsi": data.filterRegistrasiProvinsi,
                                    "idKecamatan": data.idKecamatan,
                                    "idKotaKabupaten": data.idKotaKabupaten,
                                    "idProvinsi": data.idProvinsi,
                                    "idSekolah": data.idSekolah,
                                    "jenisKelamin": data.jenisKelamin,
                                    "jenjang": data.jenjang,
                                    "tingkatKelas": data.tingkatKelas,
                                    "namaKecamatan": data.namaKecamatan,
                                    "namaKelas": data.namaKelas,
                                    "namaKotaKabupaten": data.namaKotaKabupaten,
                                    "namaPengguna": data.namaPengguna,
                                    "namaProvinsi": data.namaProvinsi,
                                    "namaSekolah": data.namaSekolah,
                                    "noHandphone": data.noHandphone,
                                    "uid": data.uid,

                                    "idTryoutOnline": $stateParams.idTryoutOnline,
                                    "filter": data.uid + "_" + $scope.data.idTryoutOnline
                                }).then(function (resp) {
                                    console.log("pesertaTryoutOnlineSuccess")
                                    //Menambahkan Table Rekap Jawaban Olimpiade Siswa
                                    var tambahData = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa");
                                    tambahData.push({
                                        "idTryoutOnline": $stateParams.idTryoutOnline,
                                        "namaTryoutOnline": $stateParams.namaTryoutOnline,
                                        "jenjang": $stateParams.jenjang,
                                        "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
                                        "namaKota": $stateParams.namaKota,
                                        "namaProvinsi": $stateParams.namaProvinsi,
                                        "semester": $stateParams.semester,
                                        "tahunAjaran": $stateParams.tahunAjaran,

                                        "idPengguna": data.$id,
                                        "namaPengguna": data.namaPengguna,
                                        "uid": data.uid,
                                        "idSekolah": data.idSekolah,
                                        "idKecamatan": data.idKecamatan,
                                        "idKotaKabupaten": data.idKotaKabupaten,
                                        "idProvinsi": data.idProvinsi,
                                        "namaSekolah": data.namaSekolah,
                                        "tingkatKelas": data.tingkatKelas,

                                        "pelajaran": "",
                                        "filter": $stateParams.idTryoutOnline + "_" + data.uid,
                                        "jumlahNilai": 0,
                                        "rataRata": 0
                                    }).then(function (resp) {
                                        console.log("success Rekap");

                                        //Tambahkan data ke tabel Jawaban Olimpiade Peserta PerPelajaran
                                        var addData = firebase.database(app).ref("pelajaranTryoutOnline").orderByChild("idTryoutOnline").equalTo($scope.data.idTryoutOnline);
                                        var listAddData = $firebaseArray(addData);

                                        listAddData.$loaded().then(function (response) {
                                            for (i = 0; i < response.length; i++) {

                                                var tambahData = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran");
                                                tambahData.push({
                                                    "idTryoutOnline": $stateParams.idTryoutOnline,
                                                    "namaTryoutOnline": $stateParams.namaTryoutOnline,
                                                    "jenjang": $stateParams.jenjang,
                                                    "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
                                                    "namaKota": $stateParams.namaKota,
                                                    "namaProvinsi": $stateParams.namaProvinsi,
                                                    "semester": $stateParams.semester,
                                                    "tahunAjaran": $stateParams.tahunAjaran,
                                                    "idPelajaranTryoutOnline": response[i].$id,
                                                    "idPelajaran": response[i].idPelajaran,
                                                    "pelajaran": response[i].pelajaran,

                                                    "idPengguna": data.$id,
                                                    "namaPengguna": data.namaPengguna,
                                                    "uid": data.uid,
                                                    "idSekolah": data.idSekolah,

                                                    "benar": 0,
                                                    "salah": 0,
                                                    "kosong": 0,
                                                    "nilai": 0,
                                                    "statusFinish": false,
                                                    "bukaUjianSekarang": false,
                                                    "tutupUjianSekarang": false,
                                                    "jumlahSoal": 0,
                                                    "statusTerjawab": false,

                                                    "filter": $stateParams.idTryoutOnline + "_" + response[i].$id + "_" + data.uid,
                                                    "filterMulaiUjian": $stateParams.idTryoutOnline + "_" + data.uid,

                                                    "jamDiMulai": "",
                                                    "jamBerakhir": "",
                                                    "jamSelesai": "",
                                                    "jamDurasiUjian": "",

                                                }).then(function (resp) {
                                                    $ionicLoading.hide();
                                                    console.log("successjawabanTryoutOnlineSiswaPerPelajaran");
                                                    var updateDataSiswa = firebase.database(appSiswa).ref("dataSiswa/" + data.$id);
                                                    updateDataSiswa.update(JSON.parse(JSON.stringify({
                                                        "registrasiTryoutOnline": $scope.data.idTryoutOnline
                                                    }))).then(function (resp) {
                                                        console.log("dataSiswaDiUpdate")
                                                    })

                                                })

                                            }
                                        });
                                        var refpesertaTryoutOnline = firebase.database(app).ref("pesertaTryoutOnline").orderByChild("idTryoutOnline").equalTo($scope.data.idTryoutOnline);
                                        var listpesertaTryoutOnline = $firebaseArray(refpesertaTryoutOnline);

                                        listpesertaTryoutOnline.$loaded().then(function (response) {
                                            $scope.totalpesertaTryoutOnline = response.length;
                                            if (response.length !== 0) {
                                                $scope.aktif = true;
                                            }
                                        });

                                        $ionicPopup.alert({
                                            title: 'SUKSES',
                                            template: 'REGISTRASI SUKSES',
                                        })

                                    });


                                });
                            }
                            else {
                                $ionicLoading.hide()
                                $ionicPopup.alert({
                                    title: 'PERHATIAN',
                                    template: 'Maaf, Data siswa ini sudah diregistrasikan, cek kembali, terima kasih',
                                })
                            }
                        });

                    }
                    return true;
                },

            });

        };

        var refpesertaTryoutOnline = firebase.database(app).ref("pesertaTryoutOnline").orderByChild("idTryoutOnline").equalTo($scope.data.idTryoutOnline);
        var listpesertaTryoutOnline = $firebaseArray(refpesertaTryoutOnline);

        listpesertaTryoutOnline.$loaded().then(function (response) {
            $scope.totalpesertaTryoutOnline = response.length;
            if (response.length !== 0) {
                $scope.aktif = true;
            }
        });

        $scope.pesertaTeregistrasi = function () {
            $state.go('menuSekolah.pesertaTeregistrasiTryoutOnlineSekolah', {
                "idTryoutOnline": $stateParams.idTryoutOnline,
                "namaTryoutOnline": $stateParams.namaTryoutOnline,
                "jenjang": $stateParams.jenjang,
                "tingkatKelas": $stateParams.tingkatKelas,
                "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
                "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
                "id_provinsi": $stateParams.id_provinsi
            });
        };

    }])

    .controller('logHistoriTryoutOnlineSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
        else if ($scope.idSekolah === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "idTryoutOnline": $stateParams.idTryoutOnline,
            "namaTryoutOnline": $stateParams.namaTryoutOnline,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
            "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
            "id_provinsi": $stateParams.id_provinsi
        }
        //console.log($scope.data);

        var ref = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran").orderByChild("idTryoutOnline").equalTo($scope.data.idTryoutOnline);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSiswa = response;
        })

    }])