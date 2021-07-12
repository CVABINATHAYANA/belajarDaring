angular.module('app.berandaGuruSOC', [])

    .controller('berandaSOCGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        var ref = firebase.database().ref("namaTryout").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenGuru);
        var list = $firebaseArray(ref);

        $ionicLoading.show();
        list.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.namaTryout = response;

        });

        $scope.pengaturanTryout = function (data) {
            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Tryout : ' + data.namaTryout,
                buttons: [
                    // { text: '<i class="icon ion-checkmark-circled"></i> Edit SOC' },
                    // { text: '<i class="icon ion-checkmark-circled"></i> Tambah Pelajaran' },
                    // { text: '<i class="icon ion-checkmark-circled"></i> Registrasi Peserta' },
                    // { text: '<i class="icon ion-checkmark-circled"></i> Log Histori Peserta' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Nilai & Peringkat' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus SOC',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    // if (index === 0) {
                    //     $state.go('menuGuru.editSOCGuru', {
                    //         "idTryout": data.$id,
                    //         "namaTryout": data.namaTryout,
                    //     });
                    // }
                    // if (index === 1) {
                    //     $state.go('menuGuru.pelajaranSOCGuru', {
                    //         "idTryout": data.$id,
                    //         "namaTryout": data.namaTryout,
                    //         "jenjang": data.jenjang,
                    //         "kelas": data.kelas,
                    //         "olimpiadeTingkat": data.olimpiadeTingkat
                    //     });
                    // }
                    // if (index === 2) {
                    //     if (data.olimpiadeTingkat === "Kota/Kabupaten") {
                    //         $state.go('menuGuru.registrasiPesertaKotaSOCGuru', {
                    //             "idTryout": data.$id,
                    //             "namaTryout": data.namaTryout,
                    //             "jenjang": data.jenjang,
                    //             "kelas": data.kelas,
                    //             "id_kota_kabupaten": data.id_kota_kabupaten,
                    //             "olimpiadeTingkat": data.olimpiadeTingkat,
                    //             "id_provinsi": data.id_provinsi,
                    //             "namaKota": data.namaKota,
                    //             "namaProvinsi": data.namaProvinsi,
                    //             "semester": data.semester,
                    //             "tahunAjaran": data.tahunAjaran,
                    //             "idSekolah": data.idSekolah
                    //         });
                    //     }
                    //     else {
                    //         $state.go('menuGuru.registrasiPesertaSOCGuru', {
                    //             "idTryout": data.$id,
                    //             "namaTryout": data.namaTryout,
                    //             "jenjang": data.jenjang,
                    //             "kelas": data.kelas,
                    //             "id_kota_kabupaten": data.id_kota_kabupaten,
                    //             "olimpiadeTingkat": data.olimpiadeTingkat,
                    //             "id_provinsi": data.id_provinsi,
                    //             "namaKota": data.namaKota,
                    //             "namaProvinsi": data.namaProvinsi,
                    //             "semester": data.semester,
                    //             "tahunAjaran": data.tahunAjaran,
                    //             "idSekolah": data.idSekolah
                    //         });
                    //     }

                    // }
                    // if (index === 3) {
                    //     $state.go('menuGuru.logHistoriSOCGuru', {
                    //         "idTryout": data.$id,
                    //         "namaTryout": data.namaTryout,
                    //         "jenjang": data.jenjang,
                    //         "kelas": data.kelas,
                    //         "id_kota_kabupaten": data.id_kota_kabupaten,
                    //         "olimpiadeTingkat": data.olimpiadeTingkat,
                    //         "id_provinsi": data.id_provinsi
                    //     });
                    // }
                    if (index === 0) {
                        $state.go("menuGuru.nilaiPeringkatSOCGuru", {
                            "idTryout": data.idTryout,
                            "namaTryout": data.namaTryout,
                            "jenjang": data.jenjang,
                            "olimpiadeTingkat": data.olimpiadeTingkat,
                            "namaKota": data.namaKota,
                            "namaProvinsi": data.namaProvinsi,
                            "semester": data.semester,
                            "tahunAjaran": data.tahunAjaran,
                            "totalSiswaLolos": data.totalSiswaLolos,
                            "tanggalPelaksanaan": data.tanggalPelaksanaan,
                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {

                    var cek = firebase.database().ref("pesertaOlimpiade").orderByChild("idTryout").equalTo(data.$id);
                    var listCek = $firebaseArray(cek);
                    listCek.$loaded().then(function (response) {
                        if (response.length === 0) {

                            var refObj = firebase.database().ref("namaTryout/" + data.$id);
                            var objDelete = $firebaseObject(refObj);
                            var confirmPopup = $ionicPopup.confirm({
                                title: 'Hapus Data',
                                template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                                okType: "button-positive",
                            });
                            confirmPopup.then(function (res) {
                                if (res) {
                                    objDelete.$remove().then(function (ref) {
                                        //console.log('Data Berhasil Dihapus');
                                    });
                                }
                                else {
                                    //console.log('Tidak Jadi Menghapus');
                                }
                            });

                        }
                        else if (response.length !== 0) {
                            $ionicPopup.alert({
                                title: 'Perhatian',
                                template: "Data tidak bisa dihapus karena sudah terisi peserta olimpiade, Terimakasih",
                                okType: "button-positive"
                            });
                        }
                    });


                    return true;
                }

            });

        };

        $scope.tambahTryout = function () {
            $state.go("menuGuru.tambahSOCGuru");
        };

    }])


    .controller('tambahSOCGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        var refProvinsi = firebase.database().ref("provinsi");
        $scope.provinsi = $firebaseArray(refProvinsi);

        $scope.getProvince = function () {
            var id = $scope.formData.idProvinsi;
            var a = firebase.database().ref("provinsi/" + id);
            a.on("value", function (snapshot) {
                $scope.id_provinsi = snapshot.val().id_provinsi;
                $scope.nama_provinsi = snapshot.val().nama_provinsi;

                //Get Data Kota
                var b = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo($scope.id_provinsi);
                $scope.dataKota = $firebaseArray(b);
                //console.log($scope.dataKota)
            })
        };

        $scope.getKota = function () {
            var id = $scope.formData.idKota;
            var a = firebase.database().ref("kota/" + id);
            a.on("value", function (snapshot) {
                $scope.idKota = snapshot.val().id_kota_kabupaten;
                $scope.nama_kota_kabupaten = snapshot.val().nama_kota_kabupaten;

                //Get Data Kota
                var b = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKota);
                $scope.dataKota = $firebaseArray(b);
                //console.log($scope.dataKota);

                var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo($scope.idKota);
                $scope.dataKecamatan = $firebaseArray(refKecamatan);
            })
        };

        $scope.getKecamatan = function () {
            var id = $scope.formData.idKecamatan;
            var a = firebase.database().ref("kecamatan/" + id);
            a.on("value", function (snapshot) {
                $scope.namaKecamatan = snapshot.val().nama_kecamatan;
                $scope.id_kecamatan = snapshot.val().id_kecamatan;
                //Get Data Kota
                var b = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo(snapshot.val().id_kecamatan + "_" + $scope.formData.jenjang);
                $scope.dataSekolah = $firebaseArray(b);
                //console.log($scope.dataSekolah)
            })
        };

        $scope.getOlimpiadeTingkat = function () {
            if ($scope.formData.olimpiadeTingkat === "Sekolah") {
                $scope.tampilkan = true;
            }
            else {
                $scope.tampilkan = false;
            }
        };

        $scope.formData = {
            "tahunAjaran": "",
            "semester": "",
            "idProvinsi": "",
            "idKota": "",
            "jenjang": "",
            "kelas": "",
            "olimpiadeTingkat": "",
            "namaTryout": "",
            "jumlahPaketSoal": "",
            "publish": false,
            "namaKecamatan": "",
            "idSekolah": "",
            "id_kecamatan": "",
            "idKecamatan": ""
        };

        $scope.simpan = function () {
            console.log($scope.formData);
            if ($scope.formData.idKecamatan === "") {
                var ref = firebase.database().ref("namaTryout");
                var add = $firebaseArray(ref);
                add.$add({
                    "tahunAjaran": $scope.formData.tahunAjaran,
                    "semester": $scope.formData.semester,
                    "id_provinsi": $scope.id_provinsi,
                    "idProvinsi": $scope.formData.idProvinsi,
                    "namaProvinsi": $scope.nama_provinsi,
                    "idKota": $scope.formData.idKota,
                    "id_kota_kabupaten": $scope.idKota,
                    "namaKota": $scope.nama_kota_kabupaten,
                    "jenjang": $scope.formData.jenjang,
                    "kelas": $scope.formData.kelas,
                    "namaTryout": $scope.formData.namaTryout,
                    "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                    "publish": $scope.formData.publish,
                    "olimpiadeTingkat": $scope.formData.olimpiadeTingkat,
                    //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.idKota+"_"+$scope.formData.publish
                }).then(function (resp) {
                    var getID = firebase.database().ref("namaTryout").limitToLast(1);
                    getID.on("child_added", function (snapshot) {
                        var ID = snapshot.key;

                        //update database
                        var refUpdate = firebase.database().ref("namaTryout/" + ID);

                        refUpdate.update(JSON.parse(JSON.stringify({

                            "idTryout": ID

                        }))).then(function (resp) {

                            //console.log('success');
                            $state.go("menuGuru.socGuru");
                        })

                    });
                });
            }
            else if ($scope.formData.idKecamatan !== "") {
                var ref = firebase.database().ref("namaTryout").push({
                    "tahunAjaran": $scope.formData.tahunAjaran,
                    "semester": $scope.formData.semester,
                    "id_provinsi": $scope.id_provinsi,
                    "idProvinsi": $scope.formData.idProvinsi,
                    "namaProvinsi": $scope.nama_provinsi,
                    "idKota": $scope.formData.idKota,
                    "id_kota_kabupaten": $scope.idKota,
                    "namaKota": $scope.nama_kota_kabupaten,
                    "jenjang": $scope.formData.jenjang,
                    "kelas": $scope.formData.kelas,
                    "namaTryout": $scope.formData.namaTryout,
                    "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                    "publish": $scope.formData.publish,
                    "olimpiadeTingkat": $scope.formData.olimpiadeTingkat,
                    "namaKecamatan": $scope.namaKecamatan,
                    "idSekolah": $scope.formData.idSekolah,
                    "id_kecamatan": $scope.id_kecamatan,
                    "idKecamatan": $scope.formData.idKecamatan
                }).then(function (resp) {
                    var getID = firebase.database().ref("namaTryout").limitToLast(1);
                    getID.on("child_added", function (snapshot) {
                        var ID = snapshot.key;

                        //update database
                        var refUpdate = firebase.database().ref("namaTryout/" + ID);

                        refUpdate.update(JSON.parse(JSON.stringify({

                            "idTryout": ID

                        }))).then(function (resp) {

                            //console.log('success');
                            $state.go("menuGuru.socGuru");
                        })

                    });

                });
            }

        };

    }])

    .controller('editSOCGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idTryout": $stateParams.idTryout,
            "namaTryout": $stateParams.namaTryout
        };

        var refObj = firebase.database().ref("namaTryout/" + $scope.data.idTryout);
        var obj = $firebaseObject(refObj);
        obj.$loaded().then(function (response) {
            $scope.formData = response;
            console.log($scope.formData);
            $scope.jenjang = response.jenjang;
            //console.log($scope.formData.idProvinsi+" "+$scope.formData.namaProvinsi);
            var refKota = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo(response.id_provinsi);
            $scope.dataKota = $firebaseArray(refKota);
            //console.log($scope.dataKota);
            if (response.olimpiadeTingkat === "Sekolah") {
                $scope.tampilkan = true;
            }

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(response.id_kota_kabupaten);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);

            var refSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo(response.id_kecamatan + "_" + response.jenjang);
            $scope.dataSekolah = $firebaseArray(refSekolah);
        });


        var refProvinsi = firebase.database().ref("provinsi");
        $scope.provinsi = $firebaseArray(refProvinsi);



        $scope.getProvince = function () {
            var id = $scope.formData.idProvinsi;
            var a = firebase.database().ref("provinsi/" + id);
            a.on("value", function (snapshot) {
                $scope.id_provinsi = snapshot.val().id_provinsi;
                $scope.nama_provinsi = snapshot.val().nama_provinsi;

                //Get Data Kota
                var b = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo($scope.id_provinsi);
                $scope.dataKota = $firebaseArray(b);
                //console.log($scope.dataKota)
            })
        };

        $scope.getKota = function () {
            var id = $scope.formData.idKota;
            var a = firebase.database().ref("kota/" + id);
            a.on("value", function (snapshot) {
                $scope.idKota = snapshot.val().id_kota_kabupaten;
                $scope.nama_kota_kabupaten = snapshot.val().nama_kota_kabupaten;

                //Get Data Kota
                var b = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKota);
                $scope.dataKota = $firebaseArray(b);
                //console.log($scope.dataKota)
            })
        };

        $scope.getKecamatan = function () {
            var id = $scope.formData.idKecamatan;
            var a = firebase.database().ref("kecamatan/" + id);
            a.on("value", function (snapshot) {
                $scope.namaKecamatan = snapshot.val().nama_kecamatan;
                $scope.id_kecamatan = snapshot.val().id_kecamatan;
                //Get Data Kota
                var b = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo(snapshot.val().id_kecamatan + "_" + $scope.jenjang);
                $scope.dataSekolah = $firebaseArray(b);
                //console.log($scope.dataSekolah)
            })
        };

        $scope.simpan = function () {
            $ionicLoading.show();

            refObj.update(JSON.parse(JSON.stringify({

                "tahunAjaran": $scope.formData.tahunAjaran,
                "semester": $scope.formData.semester,
                "id_provinsi": $scope.id_provinsi,
                "idProvinsi": $scope.formData.idProvinsi,
                "namaProvinsi": $scope.nama_provinsi,
                "idKota": $scope.formData.idKota,
                "id_kota_kabupaten": $scope.idKota,
                "namaKota": $scope.nama_kota_kabupaten,
                "jenjang": $scope.formData.jenjang,
                "kelas": $scope.formData.kelas,
                "namaTryout": $scope.formData.namaTryout,
                "tanggalPelaksanaan": $scope.formData.tanggalPelaksanaan,
                "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                "publish": $scope.formData.publish,
                "olimpiadeTingkat": $scope.formData.olimpiadeTingkat,
                "totalSiswaLolos": $scope.formData.totalSiswaLolos,
                "idKecamatan": $scope.formData.idKecamatan,
                "namaKecamatan": $scope.namaKecamatan,
                "idSekolah": $scope.formData.idSekolah,
                "id_kecamatan": $scope.id_kecamatan
                //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.formData.id_kota_kabupaten+"_"+$scope.formData.publish

            }))).then(function (resp) {

                $ionicLoading.hide();
                $state.go("menuGuru.socGuru")
                $ionicPopup.alert({
                    title: 'Sukses',
                    template: "Sukses, Data Tryout Berhasil Diperbaharui",
                    okType: "button-positive"
                });
            })

        };

    }])


