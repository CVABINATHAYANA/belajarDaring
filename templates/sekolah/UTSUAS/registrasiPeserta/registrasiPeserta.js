angular.module('app.registrasiPesertaUTSUASSekolah', [])

    .controller('registrasiPesertaUTSUASSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "tingkatKelas": $stateParams.tingkatKelas,
            "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
            "utsUasTingkat": $stateParams.utsUasTingkat,
            "id_provinsi": $stateParams.id_provinsi,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "idTahunAjaran": $stateParams.idTahunAjaran,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idSekolah": $stateParams.idSekolah,
        };
        // console.log($scope.data);

        if ($scope.data.utsUasTingkat === 'Sekolah') {

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



        // if ($scope.data.utsUasTingkat === "Kota/Kabupaten") {
        //     var ref = firebase.database().ref("dataSiswa").orderByChild("filterRegistrasiKota").equalTo($scope.data.jenjang + "_" + $scope.data.id_kota_kabupaten);
        // }
        // else if ($scope.data.utsUasTingkat === "Provinsi") {
        //     var ref = firebase.database().ref("dataSiswa").orderByChild("filterRegistrasiProvinsi").equalTo($scope.data.jenjang + "_" + $scope.data.id_provinsi);

        // }
        // else if ($scope.data.utsUasTingkat === "Sekolah") {
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
        //     //         "registrasiUTSUAS": $scope.data.idUTSUAS
        //     //     }))).then(function (resp) {
        //     //         console.log("dataSiswaDiUpdate " + response[i].namaPengguna)
        //     //     })
        //     // }
        // });

        $scope.formData = {
            "namaPengguna": ""
        }


        $scope.getData = function (data) {
            console.log(data.namaPengguna);
            console.log(data.idKelas);
            console.log(data.uid);
            // $ionicLoading.show()
            // var ref = firebase.database().ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("idPengguna").equalTo(data.$id);
            // var listRef = $firebaseArray(ref);
            // listRef.$loaded().then(function (response) {
            //     $ionicLoading.hide()
            //     for (i = 0; i < response.length; i++) {
            //         var updateData = firebase.database().ref("jawabanUTSUASSiswaPerPelajaran/" + response[i].$id);
            //         updateData.update(JSON.parse(JSON.stringify({
            //             "idKelas": data.idKelas,
            //             "filterIdUTSUASIdKelasIdPelajaran": $scope.data.idUTSUAS + "_" + data.idKelas + "_" + response[i].idPelajaran
            //         }))).then(function (resp) {
            //             console.log("success")
            //         })
            //     }
            //     console.log(response)
            // })
            $ionicActionSheet.show({
                titleText: 'Nama : ' + data.namaPengguna,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Registrasikan' },
                ],
                //destructiveText: '<i class="icon ion-trash-b"></i> Hapus UTSUAS',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        var refpesertaUTSUAS = firebase.database(app).ref("pesertaUTSUAS").orderByChild("filter").equalTo(data.uid + "_" + $scope.data.idUTSUAS);
                        var listpesertaUTSUAS = $firebaseArray(refpesertaUTSUAS);
                        $ionicLoading.show()
                        listpesertaUTSUAS.$loaded().then(function (response) {
                            if (response.length === 0) {
                                var refAdd = firebase.database(app).ref("pesertaUTSUAS");
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
                                    "idKelas":data.idKelas,
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

                                    "idUTSUAS": $stateParams.idUTSUAS,
                                    "filter": data.uid + "_" + $scope.data.idUTSUAS
                                }).then(function (resp) {
                                    console.log("pesertaUTSUASSuccess")
                                    //Menambahkan Table Rekap Jawaban Olimpiade Siswa
                                    var tambahData = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$stateParams.idUTSUAS);
                                    tambahData.push({
                                        "idUTSUAS": $stateParams.idUTSUAS,
                                        "namaUTSUAS": $stateParams.namaUTSUAS,
                                        "jenjang": $stateParams.jenjang,
                                        "utsUasTingkat": $stateParams.utsUasTingkat,
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
                                        "filter": $stateParams.idUTSUAS + "_" + data.uid,
                                        "jumlahNilai": 0,
                                        "rataRata": 0,
                                        
                                        "filterIdUTSUASIdKelas": $stateParams.idUTSUAS + "_" + data.idKelas,
                                        "filterIdUTSUASKecamatan": $stateParams.idUTSUAS + "_" + data.idKecamatan,
                                        "filterIdUTSUASKecamatanIdSekolah": $stateParams.idUTSUAS + "_" + data.idKecamatan + "_" + data.idSekolah,
                                        "filterIdUTSUASKecamatanIdSekolahIdKelas": $stateParams.idUTSUAS + "_" + data.idKecamatan + "_" + data.idSekolah + "_" + data.idKelas
                                    }).then(function (resp) {
                                        $ionicLoading.hide()
                                        console.log("success Rekap");
                                        //Tambahkan data ke tabel Jawaban Olimpiade Peserta PerPelajaran
                                        var addData = firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
                                        var listAddData = $firebaseArray(addData);
                                        
                                        listAddData.$loaded().then(function (response) {
                                            for (i = 0; i < response.length; i++) {

                                                var tambahData = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" +$stateParams.idUTSUAS+ '/' +data.idKelas+ '/' +data.uid );
                                                tambahData.push({
                                                    "idUTSUAS": $stateParams.idUTSUAS,
                                                    "namaUTSUAS": $stateParams.namaUTSUAS,
                                                    "jenjang": $stateParams.jenjang,
                                                    "utsUasTingkat": $stateParams.utsUasTingkat,
                                                    "namaKota": $stateParams.namaKota,
                                                    "namaProvinsi": $stateParams.namaProvinsi,
                                                    "semester": $stateParams.semester,
                                                    "tahunAjaran": $stateParams.tahunAjaran,
                                                    "idPelajaranUTSUAS": response[i].idPelajaranUTSUAS,
                                                    "idPelajaran": response[i].idPelajaran,
                                                    "pelajaran": response[i].pelajaran,

                                                    "idKelas": data.idKelas,
                                                    "namaKelas": data.namaKelas,
                                                    "filterIdUTSUASIdKelasIdPelajaran": $scope.data.idUTSUAS + "_" + data.idKelas + "_" + response[i].idPelajaran,

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

                                                    "filter": $stateParams.idUTSUAS + "_" + response[i].idPelajaranUTSUAS + "_" + data.uid,
                                                    "filterMulaiUjian": $stateParams.idUTSUAS + "_" + data.uid,

                                                    "jamDiMulai": "",
                                                    "jamBerakhir": "",
                                                    "jamSelesai": "",
                                                    "jamDurasiUjian": "",

                                                }).then(function (resp) {
                                                    $ionicLoading.hide()
                                                    console.log("successjawabanUTSUASSiswaPerPelajaran/" +$stateParams.idUTSUAS+ '/' +data.idKelas+ '/' +data.uid );
                                                    var updateDataSiswa = firebase.database(appSiswa).ref("dataSiswa/" + data.$id);
                                                    updateDataSiswa.update(JSON.parse(JSON.stringify({
                                                        "registrasiUTSUAS": $scope.data.idUTSUAS
                                                    }))).then(function (resp) {
                                                        console.log("dataSiswaDiUpdate")
                                                    })
                                                })

                                            }
                                        });
                                    });
                                    var refpesertaUTSUAS = firebase.database(app).ref("pesertaUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
                                    var listpesertaUTSUAS = $firebaseArray(refpesertaUTSUAS);

                                    listpesertaUTSUAS.$loaded().then(function (response) {
                                        $scope.totalpesertaUTSUAS = response.length;
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

        var refpesertaUTSUAS = firebase.database(app).ref("pesertaUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        var listpesertaUTSUAS = $firebaseArray(refpesertaUTSUAS);

        listpesertaUTSUAS.$loaded().then(function (response) {
            $scope.totalpesertaUTSUAS = response.length;
            if (response.length !== 0) {
                $scope.aktif = true;
            }
        });

        $scope.pesertaTeregistrasi = function () {
            $state.go('menuSekolah.pesertaTeregistrasiUTSUASSekolah', {
                "idUTSUAS": $stateParams.idUTSUAS,
                "namaUTSUAS": $stateParams.namaUTSUAS,
                "jenjang": $stateParams.jenjang,
                "tingkatKelas": $stateParams.tingkatKelas,
                "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
                "utsUasTingkat": $stateParams.utsUasTingkat,
                "id_provinsi": $stateParams.id_provinsi,

            });
        };

    }])

    .controller('pesertaTeregistrasiUTSUASSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "tingkatKelas": $stateParams.tingkatKelas,
            "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
            "utsUasTingkat": $stateParams.utsUasTingkat,
            "id_provinsi": $stateParams.id_provinsi,
        };

        var refpesertaUTSUAS = firebase.database(app).ref("pesertaUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        var listpesertaUTSUAS = $firebaseArray(refpesertaUTSUAS);

        listpesertaUTSUAS.$loaded().then(function (response) {
            $scope.datapesertaUTSUAS = response;
        });

        

        $scope.getDataSiswa = function (data) {
            console.log(data);
            console.log('IDKELAS:' + $scope.datapesertaUTSUAS );
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
                    //         "idUTSUAS" : data.idUTSUAS,
                    //         "namaUTSUAS" : data.namaUTSUAS,
                    //         "jenjang" : data.jenjang,
                    //         "tingkatKelas" : data.tingkatKelas,
                    //         "idPelajaranUTSUAS" : data.$id,
                    //         "idPelajaran" : data.idPelajaran,
                    //         "pelajaran" : data.pelajaran
                    //     });
                    // }
                    // if(index===1){
                    //     $state.go('menu.kisiKisiSoal',{
                    //         "idUTSUAS" : data.idUTSUAS,
                    //         "namaUTSUAS" : data.namaUTSUAS,
                    //         "jenjang" : data.jenjang,
                    //         "tingkatKelas" : data.tingkatKelas,
                    //         "idPelajaranUTSUAS" : data.$id,
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
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Registrasi Untuk Siswa Ini?',
                        okType: "button-balanced",
                    });

                    console.log(data.idKelas);
                    console.log(data.uid);
                    confirmPopup.then(function (res) {
                        if (res) {


                            //Menghapus Jawaban Olimpiade Siswa
                            var a = firebase.database(app).ref("jawabanUTSUASSiswa/"+$stateParams.idUTSUAS+ '/' +data.uid ).orderByChild("filterHapusRegistrasi").equalTo($stateParams.idUTSUAS + "_" + data.uid);
                            var listA = $firebaseArray(a);
                            listA.$loaded().then(function (response) {

                                for (i = 0; i < response.length; i++) {

                                    var a1 = firebase.database(app).ref("jawabanUTSUASSiswa/"+$stateParams.idUTSUAS+ '/' +data.uid +'/' + response[i].$id);
                                    var a1Delete = $firebaseObject(a1);
                                    a1Delete.$remove().then(function (resp) {
                                        console.log("jawabanUTSUASSiswa Dihapus")
                                    })

                                }

                            });

                            //Menghapus Jawaban Olimpiade Siswa PerPelajaran
                            var b = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" +$stateParams.idUTSUAS+ '/' +data.idKelas+ '/' +data.uid ).orderByChild("filterMulaiUjian").equalTo($stateParams.idUTSUAS + "_" + data.uid);
                            var listB = $firebaseArray(b);
                            listB.$loaded().then(function (response) {

                                for (i = 0; i < response.length; i++) {

                                    var b1 = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" +$stateParams.idUTSUAS+ '/' +data.idKelas+ '/' +data.uid +'/' + response[i].$id);
                                    var b1Delete = $firebaseObject(b1);
                                    b1Delete.$remove().then(function (resp) {
                                        console.log("jawabanUTSUASSiswaPerPelajaran Dihapus");
                                    })

                                }
                            });

                            //Menghapus Rekap Jawaban Olimpiade
                            var c = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$stateParams.idUTSUAS).orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + data.uid);
                            var listC = $firebaseArray(c);
                            listC.$loaded().then(function (response) {
                                if (response.length === 0) {
                                    console.log("tidakAdaRekapYangDihapus");
                                }
                                else if (response.length === 1) {
                                    var c1 = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$stateParams.idUTSUAS+ '/' + response[0].$id);
                                    c1Delete = $firebaseObject(c1);
                                    c1Delete.$remove().then(function (resp) {
                                        console.log("rekapJawabanUTSUASSiswa Dihapus");
                                    })
                                }

                            })
                            // c.once("child_added", function(snapshot){
                            //     var id = snapshot.key;
                            //     var c1 = firebase.database().ref("rekapJawabanUTSUASSiswa/"+id);
                            //     c1Delete = $firebaseObject(c1);
                            //     c1Delete.$remove().then(function(resp){
                            //         console.log("rekapJawabanUTSUASSiswa Dihapus");
                            //     })
                            // });

                            //Menghapus Peserta Olimpiade
                            var refObj = firebase.database(app).ref("pesertaUTSUAS/" + data.$id);
                            var objDelete = $firebaseObject(refObj);
                            objDelete.$remove().then(function (ref) {
                                console.log("pesertaUTSUAS Dihapus");
                            });

                            //Update Data Siswa 
                            // var updateDataSiswa = firebase.database(app).ref("dataSiswa/" + data.idSiswa);
                            // updateDataSiswa.update(JSON.parse(JSON.stringify({
                            //     "registrasiUTSUAS": ""
                            // }))).then(function (resp) {
                            //     console.log("dataSiswaDiUpdate")
                            // })
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