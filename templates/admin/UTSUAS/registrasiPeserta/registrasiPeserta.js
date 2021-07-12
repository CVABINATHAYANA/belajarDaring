angular.module('app.registrasiPesertaUTSUASAdmin', [])

    .controller('registrasiPesertaUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            // console.log(data);
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

                        var refpesertaUTSUAS = firebase.database(appUTSUASOnline).ref("pesertaUTSUAS").orderByChild("filter").equalTo(data.uid + "_" + $scope.data.idUTSUAS);
                        var listpesertaUTSUAS = $firebaseArray(refpesertaUTSUAS);
                        $ionicLoading.show()
                        listpesertaUTSUAS.$loaded().then(function (response) {
                            if (response.length === 0) {
                                var refAdd = firebase.database(appUTSUASOnline).ref("pesertaUTSUAS");
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
                                    var tambahData = firebase.database(appUTSUASOnline).ref("rekapJawabanUTSUASSiswa");
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
                                        "filterIdUtsUasIdKelas": $stateParams.idUTSUAS + "_" + data.idKelas,
                                    }).then(function (resp) {
                                        $ionicLoading.hide()
                                        console.log("success Rekap");
                                        //Tambahkan data ke tabel Jawaban Olimpiade Peserta PerPelajaran
                                        var addData = firebase.database(appUTSUASOnline).ref("pengaturanUmumUjianUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
                                        var listAddData = $firebaseArray(addData);
                                        $ionicLoading.show();
                                        listAddData.$loaded().then(function (response) {
                                            for (i = 0; i < response.length; i++) {

                                                var tambahData = firebase.database(appUTSUASOnline).ref("jawabanUTSUASSiswaPerPelajaran");
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
                                                    console.log("successjawabanUTSUASSiswaPerPelajaran");
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
                                    var refpesertaUTSUAS = firebase.database(appUTSUASOnline).ref("pesertaUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
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

        var refpesertaUTSUAS = firebase.database(appUTSUASOnline).ref("pesertaUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        var listpesertaUTSUAS = $firebaseArray(refpesertaUTSUAS);

        listpesertaUTSUAS.$loaded().then(function (response) {
            $scope.totalpesertaUTSUAS = response.length;
            if (response.length !== 0) {
                $scope.aktif = true;
            }
        });

        $scope.pesertaTeregistrasi = function () {
            $state.go('menuAdmin.pesertaTeregistrasiUTSUASAdmin', {
                "idUTSUAS": $stateParams.idUTSUAS,
                "namaUTSUAS": $stateParams.namaUTSUAS,
                "jenjang": $stateParams.jenjang,
                "tingkatKelas": $stateParams.tingkatKelas,
                "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
                "utsUasTingkat": $stateParams.utsUasTingkat,
                "id_provinsi": $stateParams.id_provinsi
            });
        };

    }])

    .controller('pesertaTeregistrasiUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "tingkatKelas": $stateParams.tingkatKelas,
            "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
            "utsUasTingkat": $stateParams.utsUasTingkat,
            "id_provinsi": $stateParams.id_provinsi
        };

        var refpesertaUTSUAS = firebase.database(appUTSUASOnline).ref("pesertaUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        var listpesertaUTSUAS = $firebaseArray(refpesertaUTSUAS);

        listpesertaUTSUAS.$loaded().then(function (response) {
            $scope.datapesertaUTSUAS = response;
        });

        $scope.getDataSiswa = function (data) {
            console.log(data);
            if (data.idKecamatan === "5315") { var app = app5315; }
            else if (data.idKecamatan === "5316") { var app = app5316; }
            else if (data.idKecamatan === "5317") { var app = app5317; }
            else if (data.idKecamatan === "5318") { var app = app5318; }
            else if (data.idKecamatan === "5319") { var app = app5319; }
            else if (data.idKecamatan === "5320") { var app = app5320; }
            else if (data.idKecamatan === "5321") { var app = app5321; }
            else if (data.idKecamatan === "5322") { var app = app5322; }
            else if (data.idKecamatan === "5323") { var app = app5323; }
            else if (data.idKecamatan === "5324") { var app = app5324; }
            $ionicActionSheet.show({
                titleText: 'Nama Siswa : ' + data.namaPengguna,
                buttons: [
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Registrasi',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                },

                destructiveButtonClicked: function () {
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Registrasi Untuk Siswa Ini?',
                        okType: "button-positive",
                    });
                    confirmPopup.then(function (res) {
                        if (res) {


                            //Menghapus Jawaban UTS/UAS Siswa
                            var a = firebase.database(app).ref("jawabanUTSUASSiswa").orderByChild("filterHapusRegistrasi").equalTo($stateParams.idUTSUAS + "_" + data.uid);
                            var listA = $firebaseArray(a);
                            listA.$loaded().then(function (response) {

                                for (i = 0; i < response.length; i++) {

                                    var a1 = firebase.database(app).ref("jawabanUTSUASSiswa/" + response[i].$id);
                                    var a1Delete = $firebaseObject(a1);
                                    a1Delete.$remove().then(function (resp) {
                                        console.log("jawabanUTSUASSiswa Dihapus")
                                    })

                                }

                            });
                            var a = firebase.database(appUTSUASOnline).ref("jawabanUTSUASSiswa").orderByChild("filterHapusRegistrasi").equalTo($stateParams.idUTSUAS + "_" + data.uid);
                            var listA = $firebaseArray(a);
                            listA.$loaded().then(function (response) {

                                for (i = 0; i < response.length; i++) {

                                    var a1 = firebase.database(app).ref("jawabanUTSUASSiswa/" + response[i].$id);
                                    var a1Delete = $firebaseObject(a1);
                                    a1Delete.$remove().then(function (resp) {
                                        console.log("jawabanUTSUASSiswa Dihapus")
                                    })

                                }

                            });

                            //Menghapus Jawaban UTS/UAS Siswa PerPelajaran
                            var b = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("filterMulaiUjian").equalTo($stateParams.idUTSUAS + "_" + data.uid);
                            var listB = $firebaseArray(b);
                            listB.$loaded().then(function (response) {

                                for (i = 0; i < response.length; i++) {

                                    var b1 = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + response[i].$id);
                                    var b1Delete = $firebaseObject(b1);
                                    b1Delete.$remove().then(function (resp) {
                                        console.log("jawabanUTSUASSiswaPerPelajaran Dihapus");
                                    })

                                }
                            });
                            var b = firebase.database(appUTSUASOnline).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("filterMulaiUjian").equalTo($stateParams.idUTSUAS + "_" + data.uid);
                            var listB = $firebaseArray(b);
                            listB.$loaded().then(function (response) {

                                for (i = 0; i < response.length; i++) {

                                    var b1 = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + response[i].$id);
                                    var b1Delete = $firebaseObject(b1);
                                    b1Delete.$remove().then(function (resp) {
                                        console.log("jawabanUTSUASSiswaPerPelajaran Dihapus");
                                    })

                                }
                            });

                            //Menghapus Rekap Jawaban UTS/UAS
                            var c = firebase.database(app).ref("rekapJawabanUTSUASSiswa").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + data.uid);
                            var listC = $firebaseArray(c);
                            listC.$loaded().then(function (response) {
                                if (response.length === 0) {
                                    console.log("tidakAdaRekapYangDihapus");
                                }
                                else if (response.length === 1) {
                                    var c1 = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + response[0].$id);
                                    c1Delete = $firebaseObject(c1);
                                    c1Delete.$remove().then(function (resp) {
                                        console.log("rekapJawabanUTSUASSiswa Dihapus");
                                    })
                                }

                            })
                            var c = firebase.database(appUTSUASOnline).ref("rekapJawabanUTSUASSiswa").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + data.uid);
                            var listC = $firebaseArray(c);
                            listC.$loaded().then(function (response) {
                                if (response.length === 0) {
                                    console.log("tidakAdaRekapYangDihapus");
                                }
                                else if (response.length === 1) {
                                    var c1 = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + response[0].$id);
                                    c1Delete = $firebaseObject(c1);
                                    c1Delete.$remove().then(function (resp) {
                                        console.log("rekapJawabanUTSUASSiswa Dihapus");
                                    })
                                }

                            })

                            //Menghapus Peserta UTS/UAS
                            var refObj = firebase.database(app).ref("pesertaUTSUAS").orderByChild("filter").equalTo(data.uid + "_" + $stateParams.idUTSUAS);
                            var listrefObj = $firebaseArray(refObj);
                            listrefObj.$loaded().then(function (response) {
                                if (response.length === 0) {
                                    console.log("tidakAdaPesertaYangDihapus");
                                }
                                else if (response.length === 1) {
                                    var c1 = firebase.database(app).ref("pesertaUTSUAS/" + response[0].$id);
                                    c1Delete = $firebaseObject(c1);
                                    c1Delete.$remove().then(function (resp) {
                                        console.log("pesertaUTSUAS Dihapus");
                                    })
                                }

                            })
                            var refObj = firebase.database(appUTSUASOnline).ref("pesertaUTSUAS/" + data.$id);
                            var objDelete = $firebaseObject(refObj);
                            objDelete.$remove().then(function (ref) {
                                console.log("pesertaUTSUAS Dihapus");
                            });

                            //Update Data Siswa 
                            var updateDataSiswa = firebase.database(appSiswa).ref("dataSiswa/" + data.idSiswa);
                            updateDataSiswa.update(JSON.parse(JSON.stringify({
                                "registrasiUTSUAS": ""
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
            });

        };

    }])

    .controller('registrasiPesertaKotaUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            //     //         "registrasiUTSUAS" : $scope.data.idUTSUAS
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

            if (data.idKecamatan === "5315") { var app = app5315; }
            else if (data.idKecamatan === "5316") { var app = app5316; }
            else if (data.idKecamatan === "5317") { var app = app5317; }
            else if (data.idKecamatan === "5318") { var app = app5318; }
            else if (data.idKecamatan === "5319") { var app = app5319; }
            else if (data.idKecamatan === "5320") { var app = app5320; }
            else if (data.idKecamatan === "5321") { var app = app5321; }
            else if (data.idKecamatan === "5322") { var app = app5322; }
            else if (data.idKecamatan === "5323") { var app = app5323; }
            else if (data.idKecamatan === "5324") { var app = app5324; }

            //Cari
            var cariData = firebase.database(app).ref("rekapJawabanUTSUASSiswa").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + data.uid)
            var listCariData = $firebaseArray(cariData);
            listCariData.$loaded().then(function (response) {
                console.log(app)
                for(i=0;i<response.length;i++){
                    var ubahData = firebase.database(app).ref("rekapJawabanUTSUASSiswa" / +response[i].$id);
                    var objData = $firebaseObject(ubahData);
                    console.log(objData)
                }
                
            })
            // cariData.on("child_added", function (snapshot) {
            //     console.log(snapshot.val())

            //     var ubahData = firebase.database(app).ref("rekapJawabanUTSUASSiswa" / +$scope.kunci);
            //     ubahData.on("value", function(snapshot){
            //         console.log(snapshot.val())
            //     })

            //     // ubahData.update(JSON.parse(JSON.stringify({
            //     //     "filterIdUTSUASIdKelas": $stateParams.idUTSUAS + "_" + data.idKelas,
            //     //     "filterIdUTSUASKecamatan": $stateParams.idUTSUAS + "_" + data.idKecamatan,
            //     //     "filterIdUTSUASKecamatanIdSekolah": $stateParams.idUTSUAS + "_" + data.idKecamatan + "_" + data.idSekolah,
            //     //     "filterIdUTSUASKecamatanIdSekolahIdKelas": $stateParams.idUTSUAS + "_" + data.idKecamatan + "_" + data.idSekolah + "_" + data.idKelas
            //     // }))).then(function (resp) {
            //     //     console.log('updated')
            //     // })
            // });


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

                        $ionicLoading.show();
                        listpesertaUTSUAS.$loaded().then(function (response) {
                            if (response.length === 0) {
                                var refAdd = firebase.database(app).ref("pesertaUTSUAS");
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

                                    "idUTSUAS": $stateParams.idUTSUAS,
                                    "filter": data.uid + "_" + $scope.data.idUTSUAS
                                }).then(function (resp) {
                                    console.log("pesertaUTSUASSuccess")
                                    //Menambahkan Table Rekap Jawaban Olimpiade Siswa
                                    var tambahData = firebase.database(app).ref("rekapJawabanUTSUASSiswa");
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

                                        "pelajaran": "",
                                        "filter": $stateParams.idUTSUAS + "_" + data.uid,
                                        "jumlahNilai": 0,
                                        "rataRata": 0,

                                        "filterIdUTSUASIdKelas": $stateParams.idUTSUAS + "_" + data.idKelas,
                                        "filterIdUTSUASKecamatan": $stateParams.idUTSUAS + "_" + data.idKecamatan,
                                        "filterIdUTSUASKecamatanIdSekolah": $stateParams.idUTSUAS + "_" + data.idKecamatan + "_" + data.idSekolah,
                                        "filterIdUTSUASKecamatanIdSekolahIdKelas": $stateParams.idUTSUAS + "_" + data.idKecamatan + "_" + data.idSekolah + "_" + data.idKelas
                                    }).then(function (resp) {
                                        console.log("success Rekap");
                                        //Tambahkan data ke tabel Jawaban UTS/UAS Peserta PerPelajaran
                                        var addData = firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
                                        var listAddData = $firebaseArray(addData);

                                        listAddData.$loaded().then(function (response) {
                                            for (i = 0; i < response.length; i++) {

                                                var tambahData = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran");
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
                                                    $ionicLoading.hide();
                                                    console.log("successjawabanUTSUASSiswaPerPelajaran");
                                                    var updateDataSiswa = firebase.database(appSiswa).ref("dataSiswa/" + data.$id);
                                                    updateDataSiswa.update(JSON.parse(JSON.stringify({
                                                        "registrasiUTSUAS": $scope.data.idUTSUAS
                                                    }))).then(function (resp) {
                                                        console.log("dataSiswaDiUpdate")
                                                    })

                                                })

                                            }
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

        var refpesertaUTSUAS = firebase.database(appUTSUASOnline).ref("pesertaUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        var listpesertaUTSUAS = $firebaseArray(refpesertaUTSUAS);

        listpesertaUTSUAS.$loaded().then(function (response) {
            $scope.totalpesertaUTSUAS = response.length;
            if (response.length !== 0) {
                $scope.aktif = true;
            }
        });

        $scope.pesertaTeregistrasi = function () {
            $state.go('menuAdmin.pesertaTeregistrasiUTSUASAdmin', {
                "idUTSUAS": $stateParams.idUTSUAS,
                "namaUTSUAS": $stateParams.namaUTSUAS,
                "jenjang": $stateParams.jenjang,
                "tingkatKelas": $stateParams.tingkatKelas,
                "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
                "utsUasTingkat": $stateParams.utsUasTingkat,
                "id_provinsi": $stateParams.id_provinsi
            });
        };

    }])

    .controller('logHistoriUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "tingkatKelas": $stateParams.tingkatKelas,
            "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
            "utsUasTingkat": $stateParams.utsUasTingkat,
            "id_provinsi": $stateParams.id_provinsi
        }
        //console.log($scope.data);

        var ref = firebase.database(appUTSUASOnline).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSiswa = response;
        })

    }])