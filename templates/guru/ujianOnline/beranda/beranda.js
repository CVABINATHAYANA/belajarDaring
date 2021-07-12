angular.module('app.berandaUjianOnlineGuru', [])

    .controller('berandaUjianOnlineGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.namaKecamatanGuru = localStorage.getItem('namaKecamatanGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')


        if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahGuru === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }
        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        var ref = firebase.database(app).ref("ujianOnline").orderByChild("idGuru").equalTo($scope.idGuru);
        var list = $firebaseArray(ref);

        $ionicLoading.show();
        list.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.namaUjian = response;
        });

        $scope.pengaturanUjian = function (data) {
            // console.log(data);
            $ionicActionSheet.show({
                titleText: 'Nama Ujian : ' + data.namaUjian,
                buttons: [
                    { text: '<i class="icon ion-edit"></i> Edit Ujian' },
                    { text: '<i class="icon ion-android-settings"></i> Pengaturan Pelajaran' },
                    { text: '<i class="icon ion-android-people"></i> Registrasi Peserta' },
                    { text: '<i class="icon ion-ios-time"></i> Log Histori Peserta' },
                    { text: '<i class="icon ion-android-star"></i> Nilai & Peringkat' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Ujian',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('menuGuru.editUjianOnlineGuru', {
                            "idUjian": data.$id,
                            "namaUjian": data.namaUjian,
                        });
                    }
                    if (index === 1) {
                        $state.go('menuGuru.pelajaranUjianOnlineGuru', {
                            "idUjian": data.$id,
                            "namaUjian": data.namaUjian,
                            "jenjang": data.jenjang,
                            "namaKelas": data.namaKelas,
                            "namaSekolah": data.namaSekolah,
                            "jenisUjian": data.jenisUjian,
                            "namaGuru": data.namaGuru,
                            "idTahunAjaran": data.idTahunAjaran,
                            "idKelas": data.idKelas,
                            "idGuru": data.idGuru,
                            "idSekolah": data.idSekolah,
                            "tingkatKelas": data.tingkatKelas,
                            "ruangLingkupUjian": data.ruangLingkupUjian,
                        });
                    }
                    if (index === 2) {
                        if (data.ruangLingkupUjian === 'Sekolah') {
                            //Cek Data
                            var cek = firebase.database(app).ref("pelajaranUjianOnline").orderByChild("idUjian").equalTo(data.$id);
                            var listCek = $firebaseArray(cek);
                            listCek.$loaded().then(function (response) {
                                if (response.length === 0) {
                                    $ionicPopup.alert({
                                        title: 'Perhatian',
                                        template: "Sebelum melakukan registrasi peserta, silahkan tambahkan pelajaran terlebih dahulu di menu pengaturan pelajaran",
                                        okType: "button-positive"
                                    });
                                }
                                else {
                                    $state.go('menuGuru.registrasiPesertaUjianOnlineGuru', {
                                        "idUjian": data.$id,
                                        "namaUjian": data.namaUjian,
                                        "jenjang": data.jenjang,
                                        "idKelas": data.idKelas,
                                        "namaKelas": data.namaKelas,
                                        "idKotaKabupaten": data.idKotaKabupaten,
                                        "idProvinsi": data.idProvinsi,
                                        "namaKotaKabupaten": data.namaKotaKabupaten,
                                        "namaProvinsi": data.namaProvinsi,
                                        "idSemester": data.idSemester,
                                        "semester": data.semester,
                                        "idTahunAjaran": data.idTahunAjaran,
                                        "tahunAjaran": data.tahunAjaran,
                                        "idSekolah": data.idSekolah,
                                        "namaSekolah": data.namaSekolah,
                                    });
                                }
                            })
                        }
                        else {
                            $ionicPopup.alert({
                                title: 'Perhatian',
                                template: "Ujian Online Ini Ditujukan Untuk Umum, Tidak Perlu Registrasi Peserta. Terimakasih",
                                okType: "button-positive"
                            });
                        }
                    }
                    if (index === 3) {
                        $state.go('menuGuru.logHistoriUjianOnlineGuru', {
                            "idUjian": data.$id,
                            "namaUjian": data.namaUjian,
                            "jenjang": data.jenjang,
                            "namaKelas": data.namaKelas,
                            "idKotaKabupaten": data.idKotaKabupaten,
                            "idProvinsi": data.idProvinsi
                        });
                    }
                    if (index === 4) {
                        $state.go("menuGuru.nilaiPeringkatUjianOnlineGuru", {
                            "idUjian": data.idUjian,
                            "namaUjian": data.namaUjian,
                            "jenjang": data.jenjang,
                            "namaKotaKabupaten": data.namaKotaKabupaten,
                            "namaProvinsi": data.namaProvinsi,
                            "idSemester": data.idSemester,
                            "semester": data.semester,
                            "idTahunAjaran": data.idTahunAjaran,
                            "tahunAjaran": data.tahunAjaran,
                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {

                    var cek = firebase.database(app).ref("pesertaUjianOnline").orderByChild("idUjian").equalTo(data.$id);
                    var listCek = $firebaseArray(cek);
                    listCek.$loaded().then(function (response) {
                        if (response.length === 0) {

                            var refObj = firebase.database(app).ref("ujianOnline/" + data.$id);
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
                                template: "Data tidak bisa dihapus karena sudah terisi peserta ujian, Terimakasih",
                                okType: "button-positive"
                            });
                        }
                    });


                    return true;
                }

            });

        };

        $scope.tambahUjianOnline = function () {
            $state.go("menuGuru.tambahUjianOnlineGuru");
        };

    }])


    .controller('tambahUjianOnlineGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.namaKecamatanGuru = localStorage.getItem('namaKecamatanGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahGuru === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        var dataGuruRealTime = firebase.database(appGuru).ref("dataGuru/" + $scope.idGuru);
        $ionicLoading.show();
        dataGuruRealTime.on("value", function (snapshot) {
            $ionicLoading.hide();
            $scope.namaProvinsi = snapshot.val().namaProvinsi;
            $scope.namaKotaKabupaten = snapshot.val().namaKotaKabupaten;
            $scope.namaKecamatan = snapshot.val().namaKecamatan;
            $scope.namaSekolah = snapshot.val().namaSekolah;
        });

        $scope.formData = {
            // "idProvinsi": '',
            // "idKotaKabupaten": '',
            // "idKecamatan": '',
            // "jenjang": '',
            // "idSekolah": '',
            // "idGuru": '',
            "jenisUjian": '',
            "ruangLingkupUjian": '',
            "idTahunAjaran": '',
            "idSemester": '',
            "idKelas": '',
            // "idPelajaran": '',
            "namaUjian": "",
            "jumlahPaketSoal": "",
            "publish": false,
        };

        $scope.getJenisUjian = function () {
            if ($scope.formData.jenisUjian === 'Ulangan Harian') {
                $scope.ruangLingkup = ['Sekolah']
            }
            else if ($scope.formData.jenisUjian === 'Latihan Soal Online' || $scope.formData.jenisUjian === 'Kuis Online') {
                $scope.ruangLingkup = ['Sekolah', 'Umum']
            }
            else if ($scope.formData.jenisUjian === 'Tryout Online') {
                $scope.ruangLingkup = ['Umum']
            }
        }

        $scope.tampilUjian = true;

        $scope.getRuangLingkupUjian = function () {
            if ($scope.formData.ruangLingkupUjian === "Umum") {
                $scope.tampilUjian = false;
                $scope.tampilUjianTingkatKelas = true;
            }
            if ($scope.formData.ruangLingkupUjian === "Sekolah") {
                $scope.tampilUjian = true;
                $scope.tampilUjianTingkatKelas = false;
            }
        }

        var refTahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        var listRefTahunAjaran = $firebaseArray(refTahunAjaran);
        $ionicLoading.show();
        listRefTahunAjaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.tahunAjaran = response;
        })

        $scope.getTahunAjaran = function () {
            var id = $scope.formData.idTahunAjaran;
            var a = firebase.database().ref("tahunAjaran/" + id);
            a.on("value", function (snapshot) {
                $scope.namaTahunAjaran = snapshot.val().tahunAjaran;
                console.log($scope.namaTahunAjaran);
            })
        }

        var refSemester = firebase.database().ref("semester").orderByChild("aktif").equalTo(true);
        var listRefSemester = $firebaseArray(refSemester);
        $ionicLoading.show();
        listRefSemester.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.semester = response;
        })

        $scope.getSemester = function () {
            var id = $scope.formData.idSemester;
            var a = firebase.database().ref("semester/" + id);
            a.on("value", function (snapshot) {
                $scope.namaSemester = snapshot.val().semester;
                console.log($scope.namaSemester);
            })
        }

        // var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiGuru);
        // listRefProvinsi = $firebaseArray(refProvinsi);
        // $ionicLoading.show();
        // listRefProvinsi.$loaded().then(function (response) {
        //     $ionicLoading.hide();
        //     $scope.provinsi = response;
        // })

        // //Data Provinsi
        // var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiGuru);
        // var listProvinsi = $firebaseArray(refProvinsi);
        // $ionicLoading.show();
        // listProvinsi.$loaded().then(function (response) {
        //     $ionicLoading.hide();
        //     $scope.dataProvinsi = response;
        // });

        // $scope.getIdProvinsi = function () {
        //     var idProvinsi = $scope.formData.idProvinsi;

        //     //Get Nama Provinsi
        //     var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
        //     var listNamaProvinsi = $firebaseArray(namaProvinsi);
        //     listNamaProvinsi.$loaded().then(function (response) {
        //         $scope.namaProvinsi = response[0].nama_provinsi;
        //         //console.log($scope.namaProvinsi);
        //     });

        //     var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenGuru);
        //     var listRefKotaKabupaten = $firebaseArray(refKotaKabupaten);
        //     $ionicLoading.show();
        //     listRefKotaKabupaten.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         $scope.dataKotaKabupaten = response;
        //     })

        // };

        // $scope.getIdKotaKabupaten = function () {
        //     var idKotaKabupaten = $scope.formData.idKotaKabupaten;

        //     //Get Nama Kota Kabupaten
        //     var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
        //     var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
        //     listNamaKotaKabupaten.$loaded().then(function (response) {
        //         $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
        //         // console.log($scope.namaKotaKabupaten);
        //     });

        //     var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanGuru);
        //     var listRefKecamatan = $firebaseArray(refKecamatan);
        //     $ionicLoading.show();
        //     listRefKecamatan.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         $scope.dataKecamatan = response;
        //         //console.log($scope.dataKecamatan);
        //     })

        // };

        // $scope.getIdKecamatan = function () {
        //     var idKecamatan = $scope.formData.idKecamatan;
        //     $scope.idKecamatan = $scope.formData.idKecamatan;

        //     //Get Nama Kecamatan
        //     var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo(idKecamatan);
        //     var listNamaKecamatan = $firebaseArray(namaKecamatan);
        //     listNamaKecamatan.$loaded().then(function (response) {
        //         $scope.namaKecamatan = response[0].nama_kecamatan;
        //         //console.log($scope.namaKecamatan);
        //     });

        //     $ionicLoading.show()
        //     var refKecamatan = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo(idKecamatan);
        //     var listKecamatan = $firebaseArray(refKecamatan);

        //     listKecamatan.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         $scope.dataSekolah = response;
        //         for (i = 0; i < response.length; i++) {
        //             var updateData = firebase.database().ref("dataSekolahIndonesia/" + response[i].$id);
        //             updateData.update({
        //                 "filter": response[i].id_kecamatan + "_" + response[i].jenjang
        //             }).then(function (resp) {
        //                 $ionicLoading.hide();
        //             })
        //         }

        //     })
        // }

        $scope.getJenjang = function () {
            var jenjang = $scope.formData.jenjang;
            if (jenjang === "SD") {
                $scope.tingkatKelas = [1, 2, 3, 4, 5, 6];
            }
            else if (jenjang === "SMP") {
                $scope.tingkatKelas = [7, 8, 9];
            }
            else if (jenjang === "SMA" || jenjang === "SMK") {
                $scope.tingkatKelas = [10, 11, 12];
            }

            var refJenjang = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.idKecamatan + "_" + jenjang);
            var listJenjang = $firebaseArray(refJenjang);

            $ionicLoading.show();
            listJenjang.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;

            })
        };

        // $scope.getIdSekolah = function () {
        //     var idSekolah = $scope.formData.idSekolah;

        //     if (idSekolah === $scope.idSekolahGuru) {
        //         var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
        //         refDataSekolah.on("value", function (snapshot) {
        //             $scope.namaSekolah = snapshot.val().nama_sekolah;
        //         })

        //         var refGuru = firebase.database(appGuru).ref("dataGuru").orderByChild("idSekolah").equalTo(idSekolah);
        //         var listRefGuru = $firebaseArray(refGuru);
        //         $ionicLoading.show();
        //         listRefGuru.$loaded().then(function (response) {
        //             $ionicLoading.hide();
        //             $scope.dataGuru = response;
        //         })
        //     }
        //     else {
        //         $scope.formData.idSekolah = "";
        //         $ionicPopup.alert({
        //             title: 'Perhatian',
        //             template: 'Maaf, Anda tidak diperkenankan memilih sekolah lain. Terimakasih',
        //             okType: 'button-positive'
        //         });
        //     }
        // };

        // $scope.getGuru = function () {

        //     if ($scope.formData.idGuru === $scope.idGuru) {
        //         var refDataGuru = firebase.database(appGuru).ref("dataGuru/" + $scope.formData.idGuru);
        //         refDataGuru.on("value", function (snapshot) {
        //             $scope.namaGuru = snapshot.val().namaPengguna;
        //         });

        //         Array.prototype.groupBy = function (prop) {
        //             return this.reduce(function (groups, item) {
        //                 const val = item[prop]
        //                 groups[val] = groups[val] || []
        //                 groups[val].push(item)
        //                 return groups
        //             }, {})
        //         }

        //         var refKelas = firebase.database(app).ref("jadwalPelajaran/").orderByChild("filterGuru").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran);
        //         var listRefKelas = $firebaseArray(refKelas);
        //         listRefKelas.$loaded().then(function (response) {
        //             $scope.datanya = response
        //             $scope.dataKelas = $scope.datanya.groupBy('namaKelas');
        //             // console.log($scope.dataKelas);
        //         })
        //     }
        //     else {
        //         $scope.formData.idGuru = "";
        //         $ionicPopup.alert({
        //             title: 'Perhatian',
        //             template: 'Maaf, Anda tidak diperkenankan memilih guru lain. Terimakasih',
        //             okType: 'button-positive'
        //         });
        //     }

        // }

        var refTahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        $scope.tahunAjaran = $firebaseArray(refTahunAjaran);

        $scope.getTahunAjaran = function () {
            var getDataTahunAjaran = firebase.database().ref("tahunAjaran/" + $scope.formData.idTahunAjaran);
            getDataTahunAjaran.on("value", function (snapshot) {
                $scope.dataTahunAjaran = snapshot.val().tahunAjaran
            });

            Array.prototype.groupBy = function (prop) {
                return this.reduce(function (groups, item) {
                    const val = item[prop]
                    groups[val] = groups[val] || []
                    groups[val].push(item)
                    return groups
                }, {})
            }

            var refKelas = firebase.database(app).ref("jadwalPelajaran/").orderByChild("filterGuru").equalTo($scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran);
            var listRefKelas = $firebaseArray(refKelas);
            listRefKelas.$loaded().then(function (response) {
                $scope.datanya = response
                $scope.dataKelas = $scope.datanya.groupBy('namaKelas');
                console.log($scope.dataKelas);
            })

        }

        var refSemester = firebase.database().ref("semester").orderByChild("aktif").equalTo(true);
        $scope.semester = $firebaseArray(refSemester);

        $scope.getSemester = function () {
            var dataSemester = firebase.database().ref("semester/" + $scope.formData.idSemester);
            dataSemester.on("value", function (snapshot) {
                $scope.dataSemester = snapshot.val().semester;
            })
        }

        $scope.getKelas = function () {
            $scope.dataAbsensi = [];
            $scope.tampil = true;

            var dataKelasNya = firebase.database().ref("dataKelas/" + $scope.formData.idKelas);
            dataKelasNya.on("value", function (snapshot) {
                $scope.namaKelas = snapshot.val().namaKelas;
                $scope.dataTingkatKelas = snapshot.val().tingkatKelas;
                console.log("tingkatKelas", $scope.tingkatKelas);
            })

            // console.log($scope.formData.idKelas);
            Array.prototype.groupBy = function (prop) {
                return this.reduce(function (groups, item) {
                    const val = item[prop]
                    groups[val] = groups[val] || []
                    groups[val].push(item)
                    return groups
                }, {})
            }

            var refKelas = firebase.database().ref("jadwalPelajaran/").orderByChild("filterPelajaran").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.idKelas);
            var listRefKelas = $firebaseArray(refKelas);
            listRefKelas.$loaded().then(function (response) {
                $scope.datanya = response
                $scope.dataPelajaran = $scope.datanya.groupBy('pelajaran');
                // console.log($scope.dataPelajaran);
            })
        }

        $scope.getPelajaran = function () {
            var refPelajaran = firebase.database().ref("mataPelajaran/" + $scope.formData.idPelajaran);
            refPelajaran.on("value", function (snapshot) {
                $scope.pelajaran = snapshot.val().pelajaran
            })
        }

        $scope.simpan = function () {
            console.log($scope.formData);
            var tanggalBuat = $filter('date')(new Date(), 'dd-MM-yyyy');
            var jamBuat = $filter('date')(new Date(), 'HH:mm:ss');
            var hariBuat = $filter('date')(new (Date), 'EEEE');

            if ($scope.formData.ruangLingkupUjian === "Sekolah") {
                if ($scope.formData.idTahunAjaran !== "" && $scope.formData.idSemester !== "" && $scope.formData.idKelas !== "" && $scope.formData.namaUjian !== "" && $scope.formData.jumlahPaketSoal !== null) {
                    var ref = firebase.database(app).ref("ujianOnline");
                    ref.push({

                        "idProvinsi": $scope.idProvinsiGuru,
                        "namaProvinsi": $scope.namaProvinsi,
                        "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                        "namaKotaKabupaten": $scope.namaKotaKabupaten,
                        "idKecamatan": $scope.idKecamatanGuru,
                        "namaKecamatan": $scope.namaKecamatan,
                        "jenjang": $scope.jenjangGuru,
                        "idSekolah": $scope.idSekolahGuru,
                        "namaSekolah": $scope.namaSekolah,
                        "idGuru": $scope.idGuru,
                        "namaGuru": $scope.namaGuru,

                        "jenisUjian": $scope.formData.jenisUjian,
                        "ruangLingkupUjian": $scope.formData.ruangLingkupUjian,
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.dataTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.dataSemester,
                        "idKelas": $scope.formData.idKelas,
                        "namaKelas": $scope.namaKelas,
                        "tingkatKelas": $scope.dataTingkatKelas,
                        // "idPelajaran": $scope.formData.idPelajaran,
                        // "pelajaran": $scope.pelajaran,

                        "tanggalBuat": tanggalBuat,
                        "jamBuat": jamBuat,
                        "hariBuat": hariBuat,

                        "namaUjian": $scope.formData.namaUjian,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "filter": $scope.formData.jenisUjian + "_" + $scope.formData.ruangLingkupUjian + "_" + $scope.formData.tingkatKelas + "_" + $scope.formData.publish

                    }).then(function (resp) {
                        //update database
                        var refUpdate = firebase.database(app).ref("ujianOnline/" + resp.key);

                        refUpdate.update(JSON.parse(JSON.stringify({

                            "idUjian": resp.key

                        }))).then(function (resp) {
                            $ionicPopup.alert({
                                title: 'Sukses',
                                template: 'Data Ujian Online Berhasil Disimpan, Terima Kasih',
                                okType: 'button-positive'
                            });
                            $state.go("menuGuru.ujianOnlineGuru");
                        })
                    })
                }
                else {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Seluruh Data Harus Diisi, Terima Kasih',
                        okType: 'button-positive'
                    });
                }
            }
            else {
                if ($scope.formData.idTahunAjaran !== "" && $scope.formData.idSemester !== "" && $scope.formData.tingkatKelas !== "" && $scope.formData.namaUjian !== "" && $scope.formData.jumlahPaketSoal !== null && $scope.formData.idSekolah !== "") {
                    var ref = firebase.database(app).ref("ujianOnline");
                    ref.push({

                        "idProvinsi": $scope.idProvinsiGuru,
                        "namaProvinsi": $scope.namaProvinsi,
                        "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                        "namaKotaKabupaten": $scope.namaKotaKabupaten,
                        "idKecamatan": $scope.idKecamatanGuru,
                        "namaKecamatan": $scope.namaKecamatan,
                        "jenjang": $scope.jenjangGuru,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "idGuru": $scope.formData.idGuru,
                        "namaGuru": $scope.namaGuru,

                        "jenisUjian": $scope.formData.jenisUjian,
                        "ruangLingkupUjian": $scope.formData.ruangLingkupUjian,
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.dataTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.dataSemester,
                        // "idKelas": $scope.formData.idKelas,
                        // "namaKelas": $scope.namaKelas,
                        "tingkatKelas": $scope.formData.tingkatKelas,
                        // "idPelajaran": $scope.formData.idPelajaran,
                        // "pelajaran": $scope.pelajaran,

                        "tanggalBuat": tanggalBuat,
                        "jamBuat": jamBuat,
                        "hariBuat": hariBuat,

                        "namaUjian": $scope.formData.namaUjian,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "filter": $scope.formData.jenisUjian + "_" + $scope.formData.ruangLingkupUjian + "_" + $scope.formData.tingkatKelas + "_" + $scope.formData.publish

                    }).then(function (resp) {
                        //update database
                        var refUpdate = firebase.database(app).ref("ujianOnline/" + resp.key);

                        refUpdate.update(JSON.parse(JSON.stringify({

                            "idUjian": resp.key

                        }))).then(function (resp) {
                            $ionicPopup.alert({
                                title: 'Sukses',
                                template: 'Data Ujian Online Berhasil Disimpan, Terima Kasih',
                                okType: 'button-positive'
                            });
                            $state.go("menuGuru.ujianOnlineGuru");
                        })
                    })
                }
                else {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Seluruh Data Harus Diisi, Terima Kasih',
                        okType: 'button-positive'
                    });
                }
            }
        };

    }])

    .controller('editUjianOnlineGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.namaKecamatanGuru = localStorage.getItem('namaKecamatanGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahGuru === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUjian": $stateParams.idUjian,
            "namaUjian": $stateParams.namaUjian
        };

        var refObj = firebase.database(app).ref("ujianOnline/" + $scope.data.idUjian);
        var obj = $firebaseObject(refObj);
        obj.$loaded().then(function (response) {
            $scope.formData = response;
            // console.log($scope.formData);
            if ($scope.formData.ruangLingkupUjian === "Sekolah") {
                $scope.tampilUjian = true;
            }
            else if ($scope.formData.ruangLingkupUjian === "Umum") {
                $scope.tampilUjianTingkatKelas = true;
            }
            if ($scope.formData.jenjang === "SD") {
                $scope.tingkatKelas = [1, 2, 3, 4, 5, 6];
            }
            else if ($scope.formData.jenjang === "SMP") {
                $scope.tingkatKelas = [7, 8, 9];
            }
            else if ($scope.formData.jenjang === "SMA" || jenjang === "SMK") {
                $scope.tingkatKelas = [10, 11, 12];
            }

            if ($scope.formData.jenisUjian === 'Ulangan Harian') {
                $scope.ruangLingkup = ['Sekolah']
            }
            else if ($scope.formData.jenisUjian === 'Latihan Soal Online' || $scope.formData.jenisUjian === 'Kuis Online') {
                $scope.ruangLingkup = ['Sekolah', 'Umum']
            }
            else if ($scope.formData.jenisUjian === 'Tryout Online') {
                $scope.ruangLingkup = ['Umum']
            }

            Array.prototype.groupBy = function (prop) {
                return this.reduce(function (groups, item) {
                    const val = item[prop]
                    groups[val] = groups[val] || []
                    groups[val].push(item)
                    return groups
                }, {})
            }

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenGuru);
            var listRefKotaKabupaten = $firebaseArray(refKotaKabupaten);
            $ionicLoading.show();
            listRefKotaKabupaten.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKotaKabupaten = response;
            })

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanGuru);
            var listRefKecamatan = $firebaseArray(refKecamatan);
            $ionicLoading.show();
            listRefKecamatan.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKecamatan = response;
            })

            var refJenjang = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo(response.idKecamatan + "_" + response.jenjang);
            var listJenjang = $firebaseArray(refJenjang);

            $ionicLoading.show();
            listJenjang.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;

            })

            var refGuru = firebase.database(appGuru).ref("dataGuru").orderByChild("idSekolah").equalTo(response.idSekolah);
            var listRefGuru = $firebaseArray(refGuru);
            $ionicLoading.show();
            listRefGuru.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataGuru = response;
            })

            var refKelas = firebase.database(app).ref("jadwalPelajaran/").orderByChild("filterGuru").equalTo(response.idSekolah + "_" + response.idGuru + "_" + response.idTahunAjaran);
            var listRefKelas = $firebaseArray(refKelas);
            listRefKelas.$loaded().then(function (response) {
                $scope.datanya = response
                $scope.dataKelas = $scope.datanya.groupBy('namaKelas');

            })

            var refKelas = firebase.database(app).ref("jadwalPelajaran").orderByChild("filterPelajaran").equalTo(response.idSekolah + "_" + response.idGuru + "_" + response.idTahunAjaran + "_" + response.idKelas);
            var listRefKelas = $firebaseArray(refKelas);
            listRefKelas.$loaded().then(function (response) {
                $scope.datanya = response
                $scope.dataPelajaran = $scope.datanya.groupBy('pelajaran');
            })

        });

        $scope.getJenisUjian = function () {
            if ($scope.formData.jenisUjian === 'Ulangan Harian') {
                $scope.ruangLingkup = ['Sekolah']
            }
            else {
                $scope.ruangLingkup = ['Sekolah', 'Umum']
            }
        }

        $scope.getRuangLingkupUjian = function () {
            if ($scope.formData.ruangLingkupUjian === "Umum") {
                $scope.tampilUjian = false;
                $scope.tampilUjianTingkatKelas = true;
            }
            if ($scope.formData.ruangLingkupUjian === "Sekolah") {
                $scope.tampilUjian = true;
                $scope.tampilUjianTingkatKelas = false;
            }
        }


        var refTahunAjaran = firebase.database().ref("tahunAjaran");
        var listRefTahunAjaran = $firebaseArray(refTahunAjaran);
        $ionicLoading.show();
        listRefTahunAjaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.tahunAjaran = response;
        })

        $scope.getTahunAjaran = function () {
            var id = $scope.formData.idTahunAjaran;
            var a = firebase.database().ref("tahunAjaran/" + id);
            a.on("value", function (snapshot) {
                $scope.namaTahunAjaran = snapshot.val().tahunAjaran;
                // console.log($scope.namaTahunAjaran);
            })
        }

        var refSemester = firebase.database().ref("semester");
        var listRefSemester = $firebaseArray(refSemester);
        $ionicLoading.show();
        listRefSemester.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.semester = response;
        })

        $scope.getSemester = function () {
            var id = $scope.formData.idSemester;
            var a = firebase.database().ref("semester/" + id);
            a.on("value", function (snapshot) {
                $scope.namaSemester = snapshot.val().semester;
                // console.log($scope.namaSemester);
            })
        }

        var refProvinsi = firebase.database().ref("provinsi");
        listRefProvinsi = $firebaseArray(refProvinsi);
        $ionicLoading.show();
        listRefProvinsi.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.provinsi = response;
        })

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiGuru);
        var listProvinsi = $firebaseArray(refProvinsi);
        $ionicLoading.show();
        listProvinsi.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataProvinsi = response;
        });

        $scope.getIdProvinsi = function () {
            var idProvinsi = $scope.formData.idProvinsi;

            //Get Nama Provinsi
            var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiGuru);
            var listNamaProvinsi = $firebaseArray(namaProvinsi);
            listNamaProvinsi.$loaded().then(function (response) {
                $scope.namaProvinsi = response[0].nama_provinsi;
                //console.log($scope.namaProvinsi);
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenGuru);
            var listRefKotaKabupaten = $firebaseArray(refKotaKabupaten);
            $ionicLoading.show();
            listRefKotaKabupaten.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKotaKabupaten = response;
            })

        };

        $scope.getIdKotaKabupaten = function () {
            var idKotaKabupaten = $scope.formData.idKotaKabupaten;

            //Get Nama Kota Kabupaten
            var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
            listNamaKotaKabupaten.$loaded().then(function (response) {
                $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
                // console.log($scope.namaKotaKabupaten);
            });

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanGuru);
            var listRefKecamatan = $firebaseArray(refKecamatan);
            $ionicLoading.show();
            listRefKecamatan.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKecamatan = response;
                //console.log($scope.dataKecamatan);
            })

        };

        $scope.getIdKecamatan = function () {
            var idKecamatan = $scope.formData.idKecamatan;
            $scope.idKecamatan = $scope.formData.idKecamatan;

            //Get Nama Kecamatan
            var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo(idKecamatan);
            var listNamaKecamatan = $firebaseArray(namaKecamatan);
            listNamaKecamatan.$loaded().then(function (response) {
                $scope.namaKecamatan = response[0].nama_kecamatan;
                //console.log($scope.namaKecamatan);
            });

            $ionicLoading.show()
            var refKecamatan = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo(idKecamatan);
            var listKecamatan = $firebaseArray(refKecamatan);

            listKecamatan.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;
                for (i = 0; i < response.length; i++) {
                    var updateData = firebase.database().ref("dataSekolahIndonesia/" + response[i].$id);
                    updateData.update({
                        "filter": response[i].id_kecamatan + "_" + response[i].jenjang
                    }).then(function (resp) {
                        $ionicLoading.hide();
                    })
                }

            })
        }

        $scope.getJenjang = function () {
            var jenjang = $scope.formData.jenjang;
            // console.log(jenjang+" "+$scope.formData.idKecamatan)+" "+$scope.idKecamatan;
            if (jenjang === "SD") {
                $scope.tingkatKelas = [1, 2, 3, 4, 5, 6];
            }
            else if (jenjang === "SMP") {
                $scope.tingkatKelas = [7, 8, 9];
            }
            else if (jenjang === "SMA" || jenjang === "SMK") {
                $scope.tingkatKelas = [10, 11, 12];
            }

            var refJenjang = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.formData.idKecamatan + "_" + jenjang);
            var listJenjang = $firebaseArray(refJenjang);

            $ionicLoading.show();
            listJenjang.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;

            })
        };

        $scope.getIdSekolah = function () {
            var idSekolah = $scope.formData.idSekolah;

            if (idSekolah === $scope.idSekolahGuru) {
                var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
                refDataSekolah.on("value", function (snapshot) {
                    $scope.namaSekolah = snapshot.val().nama_sekolah;
                })

                var refGuru = firebase.database(appGuru).ref("dataGuru").orderByChild("idSekolah").equalTo(idSekolah);
                var listRefGuru = $firebaseArray(refGuru);
                $ionicLoading.show();
                listRefGuru.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.dataGuru = response;
                })

                // var refKelas = firebase.database().ref("dataKelas/").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
                // $scope.dataKelas = $firebaseArray(refKelas);
            }
            else {
                $scope.formData.idSekolah = "";
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Anda tidak diperkenankan memilih sekolah lain. Terimakasih',
                    okType: 'button-positive'
                });
            }


        };

        $scope.getGuru = function () {
            if ($scope.formData.idGuru === $scope.idGuru) {
                var refDataGuru = firebase.database(appGuru).ref("dataGuru/" + $scope.formData.idGuru);
                refDataGuru.on("value", function (snapshot) {
                    $scope.namaGuru = snapshot.val().namaPengguna;
                });

                Array.prototype.groupBy = function (prop) {
                    return this.reduce(function (groups, item) {
                        const val = item[prop]
                        groups[val] = groups[val] || []
                        groups[val].push(item)
                        return groups
                    }, {})
                }

                var refKelas = firebase.database(app).ref("jadwalPelajaran/").orderByChild("filterGuru").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran);
                var listRefKelas = $firebaseArray(refKelas);
                listRefKelas.$loaded().then(function (response) {
                    $scope.datanya = response
                    $scope.dataKelas = $scope.datanya.groupBy('namaKelas');
                })
            }
            else {
                $scope.formData.idGuru = "";
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Anda tidak diperkenankan memilih guru lain. Terimakasih',
                    okType: 'button-positive'
                });
            }

        }

        var refTahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        $scope.tahunAjaran = $firebaseArray(refTahunAjaran);

        $scope.getTahunAjaran = function () {
            var getDataTahunAjaran = firebase.database().ref("tahunAjaran/" + $scope.formData.idTahunAjaran);
            getDataTahunAjaran.on("value", function (snapshot) {
                $scope.dataTahunAjaran = snapshot.val().tahunAjaran
            });

            Array.prototype.groupBy = function (prop) {
                return this.reduce(function (groups, item) {
                    const val = item[prop]
                    groups[val] = groups[val] || []
                    groups[val].push(item)
                    return groups
                }, {})
            }

            var refKelas = firebase.database(app).ref("jadwalPelajaran/").orderByChild("filterGuru").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran);
            var listRefKelas = $firebaseArray(refKelas);
            listRefKelas.$loaded().then(function (response) {
                $scope.datanya = response
                $scope.dataKelas = $scope.datanya.groupBy('namaKelas');
                console.log($scope.dataKelas);
            })

        }

        var refSemester = firebase.database().ref("semester").orderByChild("aktif").equalTo(true);
        $scope.semester = $firebaseArray(refSemester);

        $scope.getSemester = function () {
            var dataSemester = firebase.database().ref("semester/" + $scope.formData.idSemester);
            dataSemester.on("value", function (snapshot) {
                $scope.dataSemester = snapshot.val().semester;
            })
        }

        $scope.getKelas = function () {
            $scope.dataAbsensi = [];
            $scope.tampil = true;

            var dataKelasNya = firebase.database().ref("dataKelas/" + $scope.formData.idKelas);
            dataKelasNya.on("value", function (snapshot) {
                $scope.namaKelas = snapshot.val().namaKelas;
                $scope.dataTingkatKelas = snapshot.val().tingkatKelas;
            })

            // console.log($scope.formData.idKelas);
            Array.prototype.groupBy = function (prop) {
                return this.reduce(function (groups, item) {
                    const val = item[prop]
                    groups[val] = groups[val] || []
                    groups[val].push(item)
                    return groups
                }, {})
            }

            var refKelas = firebase.database(app).ref("jadwalPelajaran/").orderByChild("filterPelajaran").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.idKelas);
            var listRefKelas = $firebaseArray(refKelas);
            listRefKelas.$loaded().then(function (response) {
                $scope.datanya = response
                $scope.dataPelajaran = $scope.datanya.groupBy('pelajaran');
                // console.log($scope.dataPelajaran);
            })
        }

        $scope.getPelajaran = function () {
            var refPelajaran = firebase.database().ref("mataPelajaran/" + $scope.formData.idPelajaran);
            refPelajaran.on("value", function (snapshot) {
                $scope.pelajaran = snapshot.val().pelajaran
            })
        }


        $scope.simpan = function () {
            if ($scope.formData.ruangLingkupUjian === "Sekolah") {
                if ($scope.formData.idProvinsi !== "" && $scope.formData.idKotaKabupaten !== "" && $scope.formData.idKecamatan !== "" && $scope.formData.jenjang !== "" && $scope.formData.idSekolah !== "" && $scope.formData.idGuru !== "" && $scope.formData.idTahunAjaran !== "" && $scope.formData.idSemester !== "" && $scope.formData.idKelas !== "" && $scope.formData.namaUjian !== "" && $scope.formData.jumlahPaketSoal !== null) {

                    $ionicLoading.show();
                    var updateData = firebase.database(app).ref("ujianOnline/" + $scope.data.idUjian);
                    updateData.update(JSON.parse(JSON.stringify({

                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.namaProvinsi,
                        "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                        "namaKotaKabupaten": $scope.namaKotaKabupaten,
                        "idKecamatan": $scope.formData.idKecamatan,
                        "namaKecamatan": $scope.namaKecamatan,
                        "jenjang": $scope.jenjangGuru,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "idGuru": $scope.formData.idGuru,
                        "namaGuru": $scope.namaGuru,

                        "jenisUjian": $scope.formData.jenisUjian,
                        "ruangLingkupUjian": $scope.formData.ruangLingkupUjian,
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.dataTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.dataSemester,
                        "idKelas": $scope.formData.idKelas,
                        "namaKelas": $scope.namaKelas,
                        "tingkatKelas": $scope.dataTingkatKelas,
                        // "idPelajaran": $scope.formData.idPelajaran,
                        // "pelajaran": $scope.pelajaran,

                        // "tanggalBuat": tanggalBuat,
                        // "jamBuat": jamBuat,
                        // "hariBuat": hariBuat,

                        "namaUjian": $scope.formData.namaUjian,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "filter": $scope.formData.jenisUjian + "_" + $scope.formData.ruangLingkupUjian + "_" + $scope.formData.tingkatKelas + "_" + $scope.formData.publish,
                        "idUjian" : $scope.data.idUjian

                    }))).then(function (resp) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Sukses',
                            template: 'Data Ujian Online Berhasil Diperbaharui, Terima Kasih',
                            okType: 'button-positive'
                        });
                        $state.go("menuGuru.ujianOnlineGuru");
                    })

                }
                else {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Seluruh Data Harus Diisi, Terima Kasih',
                        okType: 'button-positive'
                    });
                }
            }
            else if ($scope.formData.ruangLingkupUjian === "Umum") {
                if ($scope.formData.idProvinsi !== "" && $scope.formData.idKotaKabupaten !== "" && $scope.formData.idKecamatan !== "" && $scope.formData.jenjang !== "" && $scope.formData.idSekolah !== "" && $scope.formData.idGuru !== "" && $scope.formData.idTahunAjaran !== "" && $scope.formData.idSemester !== "" && $scope.formData.tingkatKelas !== "" && $scope.formData.namaUjian !== "" && $scope.formData.jumlahPaketSoal !== null) {

                    $ionicLoading.show();
                    var updateData = firebase.database(app).ref("ujianOnline/" + $scope.data.idUjian);
                    updateData.update(JSON.parse(JSON.stringify({

                        "idProvinsi": $scope.idProvinsiGuru,
                        "namaProvinsi": $scope.namaProvinsi,
                        "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                        "namaKotaKabupaten": $scope.namaKotaKabupaten,
                        "idKecamatan": $scope.idKecamatanGuru,
                        "namaKecamatan": $scope.namaKecamatan,
                        "jenjang": $scope.jenjangGuru,
                        "idSekolah": $scope.idSekolahGuru,
                        "namaSekolah": $scope.namaSekolah,
                        "idGuru": $scope.idGuru,
                        "namaGuru": $scope.namaGuru,

                        "jenisUjian": $scope.formData.jenisUjian,
                        "ruangLingkupUjian": $scope.formData.ruangLingkupUjian,
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.dataTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.dataSemester,
                        "idKelas": "",
                        "namaKelas": "",
                        "tingkatKelas": $scope.formData.tingkatKelas,
                        // "idPelajaran": $scope.formData.idPelajaran,
                        // "pelajaran": $scope.pelajaran,

                        // "tanggalBuat": tanggalBuat,
                        // "jamBuat": jamBuat,
                        // "hariBuat": hariBuat,

                        "namaUjian": $scope.formData.namaUjian,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "filter": $scope.formData.jenisUjian + "_" + $scope.formData.ruangLingkupUjian + "_" + $scope.formData.tingkatKelas + "_" + $scope.formData.publish,
                        "idUjian": $scope.data.idUjian

                    }))).then(function (resp) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Sukses',
                            template: 'Data Ujian Online Berhasil Diperbaharui, Terima Kasih',
                            okType: 'button-positive'
                        });
                        $state.go("menuGuru.ujianOnlineGuru");
                    })

                }
                else {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Seluruh Data Harus Diisi, Terima Kasih',
                        okType: 'button-positive'
                    });
                }
            }

        };

    }])


