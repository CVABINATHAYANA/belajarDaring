angular.module('app.kurikulumGuru', [])

    .controller('jadwalPelajaranGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
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

        $scope.tambah = function () {
            $state.go("menuGuru.jadwalPelajaranTambahGuru");
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database(app).ref("jadwalPelajaran").orderByChild("idGuru").equalTo($scope.idGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.jadwal = response;
            // $scope.jadwalPelajaran = response;
            $scope.jadwalPelajaran = $scope.jadwal.groupBy('filterGuru');
            // console.log($scope.jadwalPelajaran)
        });

        $scope.getData = function (x, y) {
            console.log(y[0].filterGuru)
            $ionicActionSheet.show({
                titleText: 'Data Jadwal Pelajaran ',
                buttons: [
                    { text: '<i class="icon ion-android-list"></i> Lihat Jadwal ' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Jadwal',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go("menuGuru.jadwalPelajaranLihatGuru", {
                            "filterGuru": x
                        })
                    }
                    return true;
                },

                destructiveButtonClicked: function () {

                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                        okType: "button-positive",
                    });
                    confirmPopup.then(function (res) {
                        if (res) {
                            $ionicLoading.show();
                            var refObj = firebase.database(app).ref("jadwalPelajaran/").orderByChild("filterGuru").equalTo(x);
                            var objDelete = $firebaseArray(refObj);
                            objDelete.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {
                                    var hapusData = firebase.database(app).ref("jadwalPelajaran/" + response[i].$id);
                                    var objDelete = $firebaseObject(hapusData);
                                    objDelete.$remove().then(function (ref) {
                                        $ionicLoading.hide();
                                        console.log('Data Berhasil Dihapus');
                                        // window.location.reload(true);
                                        Array.prototype.groupBy = function (prop) {
                                            return this.reduce(function (groups, item) {
                                                const val = item[prop]
                                                groups[val] = groups[val] || []
                                                groups[val].push(item)
                                                return groups
                                            }, {})
                                        }

                                        var ref = firebase.database(app).ref("jadwalPelajaran").orderByChild("idGuru").equalTo($scope.idGuru);
                                        var listRef = $firebaseArray(ref);
                                        $ionicLoading.show();
                                        listRef.$loaded().then(function (response) {
                                            $ionicLoading.hide();
                                            $scope.jadwal = response;
                                            // $scope.jadwalPelajaran = response;
                                            $scope.jadwalPelajaran = $scope.jadwal.groupBy('filterGuru');
                                            // console.log($scope.jadwalPelajaran)
                                        });
                                    });
                                }
                            })

                            var objGroup = firebase.database(app).ref("groupJadwalPelajaranGuru").orderByChild("filterGuru").equalTo(y[0].filterGuru);
                            var listObjGroup = $firebaseArray(objGroup);
                            listObjGroup.$loaded().then(function (hapus) {
                                var id = hapus[0].$id;

                                var objHapus = firebase.database(app).ref("groupJadwalPelajaranGuru/" + id);
                                var objHapusData = $firebaseObject(objHapus);
                                objHapusData.$remove().then(function (yes) {
                                    console.log("terhapus")
                                })
                            })

                        }
                        else {
                            //console.log('Tidak Jadi Menghapus');
                        }
                    });
                    return true;
                }

            });
        }

    }])

    .controller('jadwalPelajaranTambahGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
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
            $scope.idProvinsiGuru = snapshot.val().idProvinsi;
            $scope.namaKotaKabupaten = snapshot.val().namaKotaKabupaten;
            $scope.idKotaKabupatenGuru = snapshot.val().idKotaKabupaten;
            $scope.namaKecamatan = snapshot.val().namaKecamatan;
            $scope.idKecamatanGuru = snapshot.val().idKecamatan;
            $scope.namaSekolah = snapshot.val().namaSekolah;
            $scope.idSekolahGuru = snapshot.val().idSekolah;
        });

        $scope.formData = {
            // "idProvinsi": '',
            // "idKotaKabupaten": '',
            // "idKecamatan": '',
            // "jenjang": '',
            // "idSekolah": '',
            // "idGuru": '',
            "idTahunAjaran": '',
            "hari": '',
            "jumlahJamPelajaran": '',
            "idKelas": '',
            "idPelajaran": '',
            "jamKe": '',
            "jamMulai": '',
            "jamSelesai": '',
            "createAt": $filter('date')(new (Date), 'yyyy-MM-dd HH:mm:ss Z')
        }

        //Data Provinsi
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

        // $scope.getJenjang = function () {
        //     var jenjang = $scope.formData.jenjang;
        //     if (jenjang === "SD") {
        //         $scope.tingkatKelas = [1, 2, 3, 4, 5, 6];
        //     }
        //     else if (jenjang === "SMP") {
        //         $scope.tingkatKelas = [7, 8, 9];
        //     }
        //     else if (jenjang === "SMA" || jenjang === "SMK") {
        //         $scope.tingkatKelas = [10, 11, 12];
        //     }

        //     var refJenjang = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.idKecamatan + "_" + jenjang);
        //     var listJenjang = $firebaseArray(refJenjang);

        //     $ionicLoading.show();
        //     listJenjang.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         $scope.dataSekolah = response;

        //     })
        // };

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

        //         var refKelas = firebase.database().ref("dataKelas/").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
        //         $scope.dataKelas = $firebaseArray(refKelas);
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
            })
            var refKelas = firebase.database().ref("dataKelas/").orderByChild("filter").equalTo($scope.idSekolahGuru + "_" + $scope.formData.idTahunAjaran);
            $scope.dataKelas = $firebaseArray(refKelas);
        }

        var refPelajaran = firebase.database().ref("mataPelajaran");
        $scope.dataPelajaran = $firebaseArray(refPelajaran);

        $scope.jumlahJamPelajaran = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        $scope.getJumlahJam = function () {
            $scope.jumlahJam = [];
            for (i = 0; i < $scope.formData.jumlahJamPelajaran; i++) {
                $scope.jumlahJam.push(i)

            }
        }

        $scope.simpan = function () {

            if ($scope.idProvinsiGuru !== '' && $scope.idKotaKabupatenGuru !== '' && $scope.idKecamatanGuru !== '' && $scope.jenjang !== '' && $scope.idSekolahGuru !== '' && $scope.idGuru !== '' && $scope.formData.idTahunAjaran !== '' && $scope.formData.hari !== '' && $scope.formData.jumlahJamPelajaran !== '') {
                $ionicLoading.show()
                $scope.dataJadwalPelajaran = [];
                for (i = 0; i < $scope.jumlahJam.length; i++) {

                    var refKelas = firebase.database().ref("dataKelas/" + $scope.formData.idKelas[i]);
                    refKelas.on("value", function (snapshot) {
                        $scope.namaKelas = snapshot.val().namaKelas;
                    })
                    var refPelajaran = firebase.database().ref("mataPelajaran/" + $scope.formData.idPelajaran[i]);
                    refPelajaran.on("value", function (snapshot) {
                        $scope.namaPelajaran = snapshot.val().pelajaran
                    })

                    var jamMulaiDisplay = $filter('date')($scope.formData.jamMulai[i], 'HH:mm');
                    var jamSelesaiDisplay = $filter('date')($scope.formData.jamSelesai[i], 'HH:mm');

                    console.log($scope.formData.idKelas[i] + "_" + $scope.formData.idPelajaran[i] + "_" + $scope.formData.jamKe[i] + "_" + $scope.formData.jamMulai[i] + "_" + $scope.formData.jamSelesai[i] + "_" + $scope.namaKelas + "_" + $scope.namaPelajaran);
                    $scope.dataJadwalPelajaran.push({
                        "idProvinsi": $scope.idProvinsiGuru,
                        "namaProvinsi": $scope.namaProvinsi,
                        "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                        "namaKotaKabupaten": $scope.namaKotaKabupaten,
                        "idKecamatan": $scope.idKecamatanGuru,
                        "namaKecamatan": $scope.namaKecamatan,
                        "jenjang": $scope.jenjangGuru,
                        "idSekolah":$scope.idSekolahGuru,
                        "namaSekolah": $scope.namaSekolah,
                        "idGuru":  $scope.idGuru,
                        "namaGuru": $scope.namaGuru,

                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.dataTahunAjaran,
                        "hari": $scope.formData.hari,

                        "idKelas": $scope.formData.idKelas[i],
                        "namaKelas": $scope.namaKelas,
                        "idPelajaran": $scope.formData.idPelajaran[i],
                        "pelajaran": $scope.namaPelajaran,
                        "jamKe": $scope.formData.jamKe[i],

                        // "jamMulai": $scope.formData.jamMulai[i].toString(),                        
                        // "jamSelesai": $scope.formData.jamSelesai[i].toString(),

                        "jamMulai": jamMulaiDisplay,                        
                        "jamSelesai": jamSelesaiDisplay,

                        "filterPelajaran": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.idKelas[i],
                        "filterGuru": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran,
                        "filterKelasHari": $scope.formData.idKelas[i] + "_" + $scope.formData.hari,

                        "createAt": $scope.formData.createAt,
                        "diBuatOleh": $scope.namaGuru,
                        "idPembuat": $scope.idGuru,
                    })
                }
                console.log($scope.dataJadwalPelajaran);
                // console.log("banyakData ", $scope.dataJadwalPelajaran.length)
                for (k = 0; k < $scope.dataJadwalPelajaran.length; k++) {
                    // console.log("data-K ", k)
                    $scope.dataK = $scope.dataJadwalPelajaran.length;
                    // var insertDataAdmin = firebase.database(appJadwalPelajaran).ref("jadwalPelajaran");
                    // insertDataAdmin.push({
                    //     "idProvinsi": $scope.dataJadwalPelajaran[k].idProvinsi,
                    //     "namaProvinsi": $scope.dataJadwalPelajaran[k].namaProvinsi,
                    //     "idKotaKabupaten": $scope.dataJadwalPelajaran[k].idKotaKabupaten,
                    //     "namaKotaKabupaten": $scope.dataJadwalPelajaran[k].namaKotaKabupaten,
                    //     "idKecamatan": $scope.dataJadwalPelajaran[k].idKecamatan,
                    //     "namaKecamatan": $scope.dataJadwalPelajaran[k].namaKecamatan,
                    //     "jenjang": $scope.dataJadwalPelajaran[k].jenjang,
                    //     "idSekolah": $scope.dataJadwalPelajaran[k].idSekolah,
                    //     "namaSekolah": $scope.dataJadwalPelajaran[k].namaSekolah,
                    //     "idGuru": $scope.dataJadwalPelajaran[k].idGuru,
                    //     "namaGuru": $scope.dataJadwalPelajaran[k].namaGuru,

                    //     "idTahunAjaran": $scope.dataJadwalPelajaran[k].idTahunAjaran,
                    //     "tahunAjaran": $scope.dataJadwalPelajaran[k].tahunAjaran,
                    //     "hari": $scope.dataJadwalPelajaran[k].hari,

                    //     "idKelas": $scope.dataJadwalPelajaran[k].idKelas,
                    //     "namaKelas": $scope.dataJadwalPelajaran[k].namaKelas,
                    //     "idPelajaran": $scope.dataJadwalPelajaran[k].idPelajaran,
                    //     "pelajaran": $scope.dataJadwalPelajaran[k].pelajaran,
                    //     "jamKe": $scope.dataJadwalPelajaran[k].jamKe,
                    //     "jamMulai": $scope.dataJadwalPelajaran[k].jamMulai,
                    //     "jamSelesai": $scope.dataJadwalPelajaran[k].jamSelesai,
                    //     "filterPelajaran": $scope.dataJadwalPelajaran[k].idSekolah + "_" + $scope.dataJadwalPelajaran[k].idGuru + "_" + $scope.dataJadwalPelajaran[k].idTahunAjaran + "_" + $scope.dataJadwalPelajaran[k].idKelas,
                    //     "filterGuru": $scope.dataJadwalPelajaran[k].idSekolah + "_" + $scope.dataJadwalPelajaran[k].idGuru + "_" + $scope.dataJadwalPelajaran[k].idTahunAjaran,
                    //     "filterGuruHari": $scope.dataJadwalPelajaran[k].idSekolah + "_" + $scope.dataJadwalPelajaran[k].idGuru + "_" + $scope.dataJadwalPelajaran[k].idTahunAjaran + "_" + $scope.dataJadwalPelajaran[k].hari,
                    //     "filterKelasHari": $scope.dataJadwalPelajaran[k].idKelas + "_" + $scope.dataJadwalPelajaran[k].hari,


                    //     "createAt": $scope.formData.createAt,
                    //     "diBuatOleh": $scope.namaGuru,
                    //     "idPembuat": $scope.idGuru,
                    // }).then(function (resp) {
                    //     $ionicLoading.hide();
                    //     console.log("success insert jadwalPelajaran");
                    //     $state.go("menuGuru.jadwalPelajaranGuru");
                    // })
                    var insertData = firebase.database(app).ref("jadwalPelajaran");
                    insertData.push({
                        "idProvinsi": $scope.dataJadwalPelajaran[k].idProvinsi,
                        "namaProvinsi": $scope.dataJadwalPelajaran[k].namaProvinsi,
                        "idKotaKabupaten": $scope.dataJadwalPelajaran[k].idKotaKabupaten,
                        "namaKotaKabupaten": $scope.dataJadwalPelajaran[k].namaKotaKabupaten,
                        "idKecamatan": $scope.dataJadwalPelajaran[k].idKecamatan,
                        "namaKecamatan": $scope.dataJadwalPelajaran[k].namaKecamatan,
                        "jenjang": $scope.dataJadwalPelajaran[k].jenjang,
                        "idSekolah": $scope.dataJadwalPelajaran[k].idSekolah,
                        "namaSekolah": $scope.dataJadwalPelajaran[k].namaSekolah,
                        "idGuru": $scope.dataJadwalPelajaran[k].idGuru,
                        "namaGuru": $scope.dataJadwalPelajaran[k].namaGuru,

                        "idTahunAjaran": $scope.dataJadwalPelajaran[k].idTahunAjaran,
                        "tahunAjaran": $scope.dataJadwalPelajaran[k].tahunAjaran,
                        "hari": $scope.dataJadwalPelajaran[k].hari,

                        "idKelas": $scope.dataJadwalPelajaran[k].idKelas,
                        "namaKelas": $scope.dataJadwalPelajaran[k].namaKelas,
                        "idPelajaran": $scope.dataJadwalPelajaran[k].idPelajaran,
                        "pelajaran": $scope.dataJadwalPelajaran[k].pelajaran,
                        "jamKe": $scope.dataJadwalPelajaran[k].jamKe,
                        "jamMulai": $scope.dataJadwalPelajaran[k].jamMulai,
                        "jamSelesai": $scope.dataJadwalPelajaran[k].jamSelesai,
                        "filterPelajaran": $scope.dataJadwalPelajaran[k].idSekolah + "_" + $scope.dataJadwalPelajaran[k].idGuru + "_" + $scope.dataJadwalPelajaran[k].idTahunAjaran + "_" + $scope.dataJadwalPelajaran[k].idKelas,
                        "filterGuru": $scope.dataJadwalPelajaran[k].idSekolah + "_" + $scope.dataJadwalPelajaran[k].idGuru + "_" + $scope.dataJadwalPelajaran[k].idTahunAjaran,
                        "filterGuruHari": $scope.dataJadwalPelajaran[k].idSekolah + "_" + $scope.dataJadwalPelajaran[k].idGuru + "_" + $scope.dataJadwalPelajaran[k].idTahunAjaran + "_" + $scope.dataJadwalPelajaran[k].hari,
                        "filterKelasHari": $scope.dataJadwalPelajaran[k].idKelas + "_" + $scope.dataJadwalPelajaran[k].hari,


                        "createAt": $scope.formData.createAt,
                        "diBuatOleh": $scope.namaGuru,
                        "idPembuat": $scope.idGuru,
                    }).then(function (resp) {
                        $ionicLoading.hide();
                        console.log("success insert jadwalPelajaran");
                        $state.go("menuGuru.jadwalPelajaranGuru");
                    })
                }

                //Cek Total Jadwal Pelajaran Guru Sekarang
                var cekJadwal = firebase.database(app).ref("jadwalPelajaran").orderByChild("filterGuru").equalTo($scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran);
                var listCekJadwal = $firebaseArray(cekJadwal);
                listCekJadwal.$loaded().then(function (response) {
                    $scope.jumlahJamMengajar = response.length;

                    //Cek Total Jumlah Group Jadwal Pelajaran Guru
                    var cekGroupJadwal = firebase.database(app).ref("groupJadwalPelajaranGuru").orderByChild("filterGuru").equalTo($scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran);
                    var listCekGroupJadwal = $firebaseArray(cekGroupJadwal);
                    listCekGroupJadwal.$loaded().then(function (yesIdo) {
                        console.log(yesIdo.length);

                        if (yesIdo.length === 0) {
                            var groupJadwalPelajaranGuru = firebase.database(app).ref("groupJadwalPelajaranGuru");
                            groupJadwalPelajaranGuru.push({
                                "idProvinsi": $scope.idProvinsiGuru,
                                "namaProvinsi": $scope.namaProvinsi,
                                "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                                "namaKotaKabupaten": $scope.namaKotaKabupaten,
                                "idKecamatan": $scope.idKecamatanGuru,
                                "namaKecamatan": $scope.namaKecamatan,
                                "jenjang": $scope.jenjangGuru,
                                "idSekolah":$scope.idSekolahGuru,
                                "namaSekolah": $scope.namaSekolah,
                                "idGuru":  $scope.idGuru,
                                "namaGuru": $scope.namaGuru,

                                "idTahunAjaran": $scope.formData.idTahunAjaran,
                                "tahunAjaran": $scope.dataTahunAjaran,

                                "filterGuru": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran,
                                "totalMengajar": $scope.jumlahJamMengajar,
                                "idPembuat": $scope.idGuru,
                            })

                        }
                        else {
                            var id = yesIdo[0].$id;
                            var groupJadwalPelajaranGuru = firebase.database(app).ref("groupJadwalPelajaranGuru/" + id);
                            groupJadwalPelajaranGuru.update(JSON.parse(JSON.stringify({
                                "idProvinsi": $scope.idProvinsiGuru,
                                "namaProvinsi": $scope.namaProvinsi,
                                "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                                "namaKotaKabupaten": $scope.namaKotaKabupaten,
                                "idKecamatan": $scope.idKecamatanGuru,
                                "namaKecamatan": $scope.namaKecamatan,
                                "jenjang": $scope.formData.jenjang,
                                "idSekolah": $scope.idSekolahGuru,
                                "namaSekolah": $scope.namaSekolah,
                                "idGuru": $scope.idGuru,
                                "namaGuru": $scope.namaGuru,

                                "idTahunAjaran": $scope.formData.idTahunAjaran,
                                "tahunAjaran": $scope.dataTahunAjaran,

                                "filterGuru": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran,
                                "totalMengajar": $scope.jumlahJamMengajar,
                                "idPembuat": $scope.idGuru,
                            })))
                        }
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

    }])

    .controller('jadwalPelajaranLihatGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
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
            "filterGuru": $stateParams.filterGuru
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database(app).ref("jadwalPelajaran").orderByChild("filterGuru").equalTo($scope.data.filterGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.jadwalPelajaran = response;
            $scope.totalJamMengajar = response.length;
            $scope.jadwalPelajaranGroup = $scope.jadwalPelajaran.groupBy('hari');
        })

        $scope.getData = function (x, y) {
            $state.go('menuGuru.jadwalPelajaranLihatDetailGuru', {
                "filterGuru": $stateParams.filterGuru,
                "hari": x,
                "tahunAjaran": y[0].tahunAjaran
            })
        }

        $scope.editData = function (data) {
            $state.go("menuGuru.jadwalPelajaranEditGuru", {
                "idJadwalPelajaran": data.$id
            });
        }

        $scope.hapusData = function (data) {
            var refObj = firebase.database(app).ref("jadwalPelajaran/" + data.$id);
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

    }])

    .controller('jadwalPelajaranLihatDetailGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
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
            "filterGuru": $stateParams.filterGuru,
            "hari": $stateParams.hari,
            "tahunAjaran": $stateParams.tahunAjaran
        }

        var ref = firebase.database(app).ref("jadwalPelajaran").orderByChild("filterGuruHari").equalTo($scope.data.filterGuru + "_" + $scope.data.hari);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.jadwalPelajaran = response;
            $scope.totalJamMengajar = response.length;
        })

        $scope.editData = function (data) {
            $state.go("menuGuru.jadwalPelajaranEditGuru", {
                "idJadwalPelajaran": data.$id,
                "hari": data.hari
            });
        }

        $scope.hapusData = function (data) {
            var refObj = firebase.database(app).ref("jadwalPelajaran/" + data.$id);
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

                    //Cek Total Jadwal Pelajaran Guru Sekarang
                    var cekJadwal = firebase.database(app).ref("jadwalPelajaran").orderByChild("filterGuru").equalTo($scope.data.filterGuru);
                    var listCekJadwal = $firebaseArray(cekJadwal);
                    listCekJadwal.$loaded().then(function (response) {
                        $scope.jumlahJamMengajar = response.length;

                        //Cek Total Jumlah Group Jadwal Pelajaran Guru
                        var cekGroupJadwal = firebase.database(app).ref("groupJadwalPelajaranGuru").orderByChild("filterGuru").equalTo($scope.data.filterGuru);
                        var listCekGroupJadwal = $firebaseArray(cekGroupJadwal);
                        listCekGroupJadwal.$loaded().then(function (yesIdo) {

                            var id = yesIdo[0].$id;
                            var groupJadwalPelajaranGuru = firebase.database(app).ref("groupJadwalPelajaranGuru/" + id);
                            groupJadwalPelajaranGuru.update(JSON.parse(JSON.stringify({
                                "totalMengajar": $scope.jumlahJamMengajar,
                            })))
                        })

                    })
                }
                else {
                    //console.log('Tidak Jadi Menghapus');
                }
            });
        }

    }])

    .controller('jadwalPelajaranEditGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
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
            "idJadwalPelajaran": $stateParams.idJadwalPelajaran,
            "hari": $stateParams.hari,
        }

        var ref = firebase.database(app).ref("jadwalPelajaran/" + $scope.data.idJadwalPelajaran);
        $ionicLoading.show();
        ref.on("value", function (snapshot) {
            $ionicLoading.hide();
            $scope.formData = snapshot.val();
            var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiGuru);
            var listProvinsi = $firebaseArray(refProvinsi);

            listProvinsi.$loaded().then(function (response) {
                $scope.dataProvinsi = response;
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenGuru);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanGuru);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);

            var refSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo(snapshot.val().idKecamatan + "_" + snapshot.val().jenjang);
            var listSekolah = $firebaseArray(refSekolah);

            listSekolah.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;

            });

            var jenjang = snapshot.val().jenjang;
            if (jenjang === "SD") {
                $scope.tingkatKelas = [1, 2, 3, 4, 5, 6];
            }
            else if (jenjang === "SMP") {
                $scope.tingkatKelas = [7, 8, 9];
            }
            else if (jenjang === "SMA" || jenjang === "SMK") {
                $scope.tingkatKelas = [10, 11, 12];
            }

            var refGuru = firebase.database(appGuru).ref("dataGuru").orderByChild("idSekolah").equalTo(snapshot.val().idSekolah);
            $scope.dataGuru = $firebaseArray(refGuru);

            var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo(snapshot.val().idSekolah + "_" + snapshot.val().idTahunAjaran);
            $scope.dataKelas = $firebaseArray(refKelas);

            var refTahunAjaran = firebase.database().ref("tahunAjaran/" + snapshot.val().idTahunAjaran);
            refTahunAjaran.on("value", function (snapshot) {
                $scope.dataTahunAjaran = snapshot.val().tahunAjaran
                console.log($scope.dataTahunAjaran);
            })
        })

        //Data Provinsi
        // var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiGuru);;
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

        //     var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo(idProvinsi);
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

        //     var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
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

        // $scope.getJenjang = function () {
        //     var jenjang = $scope.formData.jenjang;
        //     if (jenjang === "SD") {
        //         $scope.tingkatKelas = [1, 2, 3, 4, 5, 6];
        //     }
        //     else if (jenjang === "SMP") {
        //         $scope.tingkatKelas = [7, 8, 9];
        //     }
        //     else if (jenjang === "SMA" || jenjang === "SMK") {
        //         $scope.tingkatKelas = [10, 11, 12];
        //     }

        //     var refJenjang = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.idKecamatan + "_" + jenjang);
        //     var listJenjang = $firebaseArray(refJenjang);

        //     $ionicLoading.show();
        //     listJenjang.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         $scope.dataSekolah = response;

        //     })
        // };

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

        //         var refKelas = firebase.database().ref("dataKelas/").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
        //         $scope.dataKelas = $firebaseArray(refKelas);
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

        var refTahunAjaran = firebase.database().ref("tahunAjaran");
        $scope.tahunAjaran = $firebaseArray(refTahunAjaran);

        $scope.getTahunAjaran = function () {
            var getDataTahunAjaran = firebase.database().ref("tahunAjaran/" + $scope.formData.idTahunAjaran);
            getDataTahunAjaran.on("value", function (snapshot) {
                $scope.dataTahunAjaran = snapshot.val().tahunAjaran
            })
            var refKelas = firebase.database().ref("dataKelas/").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
            $scope.dataKelas = $firebaseArray(refKelas);
        }

        var refPelajaran = firebase.database().ref("mataPelajaran");
        $scope.dataPelajaran = $firebaseArray(refPelajaran);

        $scope.jumlahJamPelajaran = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        $scope.getJumlahJam = function () {
            $scope.jumlahJam = [];
            for (i = 0; i < $scope.formData.jumlahJamPelajaran; i++) {
                $scope.jumlahJam.push(i)

            }
        }

        $scope.simpan = function () {
            var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
            var refKelas = firebase.database().ref("dataKelas/" + $scope.formData.idKelas);
            refKelas.on("value", function (snapshot) {
                $scope.namaKelas = snapshot.val().namaKelas;
            })
            var refPelajaran = firebase.database().ref("mataPelajaran/" + $scope.formData.idPelajaran);
            refPelajaran.on("value", function (snapshot) {
                $scope.namaPelajaran = snapshot.val().pelajaran
            })
            if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.idGuru !== '' && $scope.formData.idTahunAjaran !== '' && $scope.formData.hari !== '' && $scope.formData.jumlahJamPelajaran !== '' && $scope.formData.idKelas !== '' && $scope.formData.idPelajaran !== '' && $scope.formData.jamKe !== null && $scope.formData.jamMulai !== '' && $scope.formData.jamSelesai !== '') {

                $ionicLoading.show()
                var ref = firebase.database(app).ref("jadwalPelajaran/" + $scope.data.idJadwalPelajaran);
                ref.update(JSON.parse(JSON.stringify({
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

                    "idTahunAjaran": $scope.formData.idTahunAjaran,
                    "tahunAjaran": $scope.dataTahunAjaran,
                    "hari": $scope.formData.hari,

                    "idKelas": $scope.formData.idKelas,
                    "namaKelas": $scope.namaKelas,
                    "idPelajaran": $scope.formData.idPelajaran,
                    "pelajaran": $scope.namaPelajaran,
                    "jamKe": $scope.formData.jamKe,
                    "jamMulai": $scope.formData.jamMulai.toString(),
                    "jamSelesai": $scope.formData.jamSelesai.toString(),
                    "filterPelajaran": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.idKelas,
                    "filterGuru": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran,
                    "filterGuruHari": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.hari,
                    "filterKelasHari": $scope.formData.idKelas + "_" + $scope.formData.hari,

                    "updateAt": createAt,
                    "diEditOleh": $scope.namaGuru,
                    "idPengedit": $scope.idGuru,
                }))).then(function (resp) {
                    $ionicLoading.hide();
                    console.log("success update jadwalPelajaran");
                    $state.go("menuGuru.jadwalPelajaranLihatDetailGuru", {
                        "filterGuru": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran,
                        "hari": $stateParams.hari
                    });
                    $ionicPopup.alert({
                        title: 'Sukses',
                        template: 'Jadwal Pelajaran Berhasil Diperbaharui',
                        okType: 'button-positive'
                    });
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

    }])