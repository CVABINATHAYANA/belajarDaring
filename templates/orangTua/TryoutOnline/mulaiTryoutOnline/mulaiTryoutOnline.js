angular.module('app.mulaiTryoutOnlineSiswa', [])

    .controller('mulaiTryoutOnlineSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "idRekapJawabanTryoutOnlineSiswa": $stateParams.idRekapJawabanTryoutOnlineSiswa
        };
        // console.log($scope.data)

        // $scope.theTime = new Date().toLocaleTimeString();
        // $interval(function () {
        //     $scope.theTime = new Date().toLocaleTimeString();
        //     console.log($scope.theTime);
        //     if($scope.theTime>="11:22:40 PM"){
        //         $scope.theTime = "00:00:00 PM";
        //         console.log($scope.theTime);
        //     }
        // }, 1000);

        var refPelajaran = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran").orderByChild("filterMulaiUjian").equalTo($scope.data.idTryoutOnline + "_" + $scope.uidSiswa);
        var listRefPelajaran = $firebaseArray(refPelajaran);

        $ionicLoading.show();
        listRefPelajaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPelajaran = response;
        });

        var refRekapPelajaran = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa").orderByChild("filter").equalTo($scope.data.idTryoutOnline + "_" + $scope.uidSiswa);
        refRekapPelajaran.on("child_added", function (snapshot) {
            $scope.idRekapJawabanTryoutOnlineSiswa = snapshot.key;
            // console.log(snapshot.val())
            //console.log("ID nya", $scope.idRekapJawabanTryoutOnlineSiswa);
        });

        $scope.TryoutOnline = function (pelajaran) {
            // console.log(pelajaran);

            var cek = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran").orderByChild("filter").equalTo($stateParams.idTryoutOnline + "_" + pelajaran.idPelajaranTryoutOnline + "_" + $scope.uidSiswa);
            cek.on("child_added", function (snapshot) {
                // console.log("snapshot", snapshot.val())

                if (snapshot.val().statusFinish === true) {
                    $state.go("menuSiswa.nilaiTryoutOnlineSiswa", {
                        "idTryoutOnline": $stateParams.idTryoutOnline,
                        "namaTryoutOnline": $stateParams.namaTryoutOnline,
                        "jenjang": $stateParams.jenjang,
                        "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
                        "namaKota": $stateParams.namaKota,
                        "namaProvinsi": $stateParams.namaProvinsi,
                        "semester": $stateParams.semester,
                        "tahunAjaran": $stateParams.tahunAjaran,
                        "idPelajaranTryoutOnline": pelajaran.idPelajaranTryoutOnline,
                        "idPelajaran": pelajaran.idPelajaran,
                        "pelajaran": pelajaran.pelajaran,
                        "statusFinish": snapshot.val().statusFinish,
                        "idJawabanTryoutOnlineSiswaPerPelajaran": snapshot.key,
                        "idRekapJawabanTryoutOnlineSiswa": $scope.idRekapJawabanTryoutOnlineSiswa
                    });
                }

                else if (snapshot.val().statusFinish === false && snapshot.val().statusTerjawab === true && snapshot.val().tutupUjianSekarang === true) {
                    $state.go("menuSiswa.nilaiTryoutOnlineSiswa", {
                        "idTryoutOnline": $stateParams.idTryoutOnline,
                        "namaTryoutOnline": $stateParams.namaTryoutOnline,
                        "jenjang": $stateParams.jenjang,
                        "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
                        "namaKota": $stateParams.namaKota,
                        "namaProvinsi": $stateParams.namaProvinsi,
                        "semester": $stateParams.semester,
                        "tahunAjaran": $stateParams.tahunAjaran,
                        "idPelajaranTryoutOnline": pelajaran.idPelajaranTryoutOnline,
                        "idPelajaran": pelajaran.idPelajaran,
                        "pelajaran": pelajaran.pelajaran,
                        "statusFinish": snapshot.val().statusFinish,
                        "idJawabanTryoutOnlineSiswaPerPelajaran": snapshot.key,
                        "idRekapJawabanTryoutOnlineSiswa": $scope.idRekapJawabanTryoutOnlineSiswa
                    });
                }

                else {
                    // console.log(pelajaran);
                    // console.log("pelajaran", pelajaran.pelajaran);
                    // console.log("idPelajaranTryoutOnline", pelajaran.idPelajaranTryoutOnline);
                    Date.prototype.addMinutes = function (minutes) {
                        var copiedDate = new Date(this.getTime());
                        return new Date(copiedDate.getTime() + minutes * 60000);
                    }
                    var getDurasiUjian = firebase.database(app).ref("pengaturanUmumUjianTryoutOnline").orderByChild("filter").equalTo($stateParams.idTryoutOnline + "_" + pelajaran.idPelajaranTryoutOnline);
                    getDurasiUjian.on("child_added", function (snapshot) {
                        $scope.durasiUjianTryoutOnline = snapshot.val().durasiUjian;
                        //console.log("dataDurasi", $scope.durasiUjianTryoutOnline)
                        $scope.now = new Date();
                        $scope.newNow = $scope.now.addMinutes($scope.durasiUjianTryoutOnline);
                        var difference = $scope.newNow.getTime() - $scope.now.getTime(); // This will give difference in milliseconds
                        var resultInMinutes = Math.round(difference / 60000);
                        // console.log("jam Sekarang : ", $scope.now);
                        // console.log("berakhir di Jam : ", $scope.newNow);
                        // console.log("totalMenitnya: ", resultInMinutes);

                        var updatePerPelajaran = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran").orderByChild("filter").equalTo($stateParams.idTryoutOnline + "_" + pelajaran.idPelajaranTryoutOnline + "_" + $scope.uidSiswa);
                        updatePerPelajaran.on("child_added", function (snapshot) {
                            //console.log(snapshot.val());
                            if (snapshot.val().jamDiMulai === "") {
                                var datanyaUpdate = firebase.database().ref("jawabanTryoutOnlineSiswaPerPelajaran/" + snapshot.key);
                                datanyaUpdate.update(JSON.parse(JSON.stringify({
                                    "jamDiMulai": $scope.now,
                                    "jamBerakhir": $scope.newNow,
                                    "jamSelesai": "",
                                    "jamDurasiUjian": "",
                                }))).then(function (resp) {
                                    console.log('good');
                                })
                            }

                        })
                    })

                    var cekRekapJawaban = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.idRekapJawabanTryoutOnlineSiswa + "/pelajaran").orderByChild("idPelajaranTryoutOnline").equalTo(pelajaran.idPelajaranTryoutOnline);
                    var listCekRekapJawaban = $firebaseArray(cekRekapJawaban);
                    listCekRekapJawaban.$loaded().then(function (response) {
                        console.log("banyakData", response.length)
                        if (response.length === 0) {
                            var masukkanData = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.idRekapJawabanTryoutOnlineSiswa + "/pelajaran");
                            masukkanData.push({
                                "idPelajaran": pelajaran.idPelajaran,
                                "idPelajaranTryoutOnline": pelajaran.idPelajaranTryoutOnline,
                                "pelajaran": pelajaran.pelajaran
                            }).then(function (resp) {
                                $state.go("TryoutOnlineSiswa", {
                                    "idTryoutOnline": $stateParams.idTryoutOnline,
                                    "namaTryoutOnline": $stateParams.namaTryoutOnline,
                                    "jenjang": $stateParams.jenjang,
                                    "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
                                    "namaKota": $stateParams.namaKota,
                                    "namaProvinsi": $stateParams.namaProvinsi,
                                    "semester": $stateParams.semester,
                                    "tahunAjaran": $stateParams.tahunAjaran,
                                    "idPelajaranTryoutOnline": pelajaran.idPelajaranTryoutOnline,
                                    "idPelajaran": pelajaran.idPelajaran,
                                    "pelajaran": pelajaran.pelajaran,
                                    "statusFinish": snapshot.val().statusFinish,
                                    "idJawabanTryoutOnlineSiswaPerPelajaran": snapshot.key,
                                    "idRekapJawabanTryoutOnlineSiswa": $scope.idRekapJawabanTryoutOnlineSiswa
                                });
                            })
                        }
                        else if (response.length === 1) {
                            $state.go("TryoutOnlineSiswa", {
                                "idTryoutOnline": $stateParams.idTryoutOnline,
                                "namaTryoutOnline": $stateParams.namaTryoutOnline,
                                "jenjang": $stateParams.jenjang,
                                "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
                                "namaKota": $stateParams.namaKota,
                                "namaProvinsi": $stateParams.namaProvinsi,
                                "semester": $stateParams.semester,
                                "tahunAjaran": $stateParams.tahunAjaran,
                                "idPelajaranTryoutOnline": pelajaran.idPelajaranTryoutOnline,
                                "idPelajaran": pelajaran.idPelajaran,
                                "pelajaran": pelajaran.pelajaran,
                                "statusFinish": snapshot.val().statusFinish,
                                "idJawabanTryoutOnlineSiswaPerPelajaran": snapshot.key,
                                "idRekapJawabanTryoutOnlineSiswa": $scope.idRekapJawabanTryoutOnlineSiswa
                            });
                        }
                        else if (response.length > 1) {
                            for (i = 0; i < response.length; i++) {
                                if (i > 0) {
                                    // console.log("hapus", i + "-" + response[i].idPelajaranTryoutOnline + "-" + response[i].$id);
                                    var obj = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.idRekapJawabanTryoutOnlineSiswa + "/pelajaran/" + response[i].$id);
                                    var objDelete = $firebaseObject(obj);
                                    objDelete.$remove().then(function (ref) {
                                        console.log('Data Double Berhasil Dihapus');
                                        $state.go("TryoutOnlineSiswa", {
                                            "idTryoutOnline": $stateParams.idTryoutOnline,
                                            "namaTryoutOnline": $stateParams.namaTryoutOnline,
                                            "jenjang": $stateParams.jenjang,
                                            "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
                                            "namaKota": $stateParams.namaKota,
                                            "namaProvinsi": $stateParams.namaProvinsi,
                                            "semester": $stateParams.semester,
                                            "tahunAjaran": $stateParams.tahunAjaran,
                                            "idPelajaranTryoutOnline": pelajaran.idPelajaranTryoutOnline,
                                            "idPelajaran": pelajaran.idPelajaran,
                                            "pelajaran": pelajaran.pelajaran,
                                            "statusFinish": snapshot.val().statusFinish,
                                            "idJawabanTryoutOnlineSiswaPerPelajaran": snapshot.key,
                                            "idRekapJawabanTryoutOnlineSiswa": $scope.idRekapJawabanTryoutOnlineSiswa
                                        });
                                    });
                                }
                                else {
                                    // console.log("jangan hapus", i + "-" + response[i].idPelajaranTryoutOnline + "-" + response[i].$id)
                                }

                            }
                        }
                    })
                }
            });
        };

        $scope.belumMulai = function (pelajaran) {
            //console.log(pelajaran);
            $ionicPopup.alert({
                title: 'PERHATIAN',
                template: 'Ujian untuk mata pelajaran ini belum dimulai, harap sabar menunggu',
                okType: 'button-positive'
            });
        };

        $scope.tutupUjian = function (pelajaran) {
            //console.log(pelajaran);
            $ionicPopup.alert({
                title: 'MAAF',
                template: 'Ujian untuk mata pelajaran ini sudah ditutup',
                okType: 'button-positive'
            });
        };

    }])

    .controller('nilaiTryoutOnlineSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1; }
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
            "idRekapJawabanTryoutOnlineSiswa": $stateParams.idRekapJawabanTryoutOnlineSiswa
        };
        //console.log($scope.data);
        var refRekapNilai = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.data.idRekapJawabanTryoutOnlineSiswa);
        var dataRekap = $firebaseObject(refRekapNilai);
        // console.log("dataRekap", dataRekap);

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
            var hitungNilai = firebase.database(app).ref("jawabanTryoutOnlineSiswa").orderByChild("filter").equalTo($stateParams.idTryoutOnline + "_" + $stateParams.idPelajaranTryoutOnline + "_" + $scope.uidSiswa);
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

                ref.update({
                    "benar": $scope.statusJawabanBenar,
                    "salah": $scope.statusJawabanSalah,
                    "kosong": $scope.kosong,
                    "nilai": $scope.totalNilai,
                    "statusFinish": true
                }).then(function (resp) {
                    console.log("Updated");
                });

            });
        }

        if ($scope.data.statusFinish === true) {
            var ref = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran/" + $scope.data.idJawabanTryoutOnlineSiswaPerPelajaran);
            var refObj = $firebaseObject(ref);

            refObj.$loaded().then(function (response) {
                //console.log(response)
                $scope.totalNilai = response.nilai;
                $scope.statusJawabanBenar = response.benar;
                $scope.statusJawabanSalah = response.salah;
                $scope.kosong = response.kosong;
                $scope.jumlahSoal = response.jumlahSoal;
                $scope.jamDiMulai = response.jamDiMulai;
                $scope.jamBerakhir = response.jamBerakhir;
                $scope.jamSelesai = response.jamSelesai;
            });
        }

        //Cek Ketersedian Data Nilai
        var refRekapNilaiCek = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.data.idRekapJawabanTryoutOnlineSiswa + "/pelajaran").orderByChild("idPelajaranTryoutOnline").equalTo($scope.data.idPelajaranTryoutOnline);
        var dataRekapCek = $firebaseArray(refRekapNilaiCek);
        dataRekapCek.$loaded().then(function (response) {
            // console.log(response);
            // console.log("banyaknya nilai", response.length);
            if (response.length === 0) {
                console.log('lanjutkan')
                //Insert Data
                var insertData = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.data.idRekapJawabanTryoutOnlineSiswa + "/pelajaran");
                insertData.push({
                    "idPelajaran": $stateParams.idPelajaran,
                    "idPelajaranTryoutOnline": $stateParams.idPelajaranTryoutOnline,
                    "nilai": $scope.totalNilai,
                    "pelajaran": $stateParams.pelajaran
                })
            }
            else if (response.length === 1) {
                console.log('stopped');
                var updateNilai = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.data.idRekapJawabanTryoutOnlineSiswa + "/pelajaran/" + response[0].$id)
                updateNilai.update({
                    "nilai": $scope.totalNilai
                }).then(function (resp) {
                    console.log('updateNilaiBerhasil')
                })
            }
            else if (response.length > 1) {
                for (i = 0; i < response.length; i++) {
                    if (i > 0) {
                        console.log("hapus", i + "-" + response[i].idPelajaranTryoutOnline + "-" + response[i].$id);
                        var obj = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.data.idRekapJawabanTryoutOnlineSiswa + "/pelajaran/" + response[i].$id);
                        var objDelete = $firebaseObject(obj);
                        objDelete.$remove().then(function (ref) {
                            console.log('Data Double Berhasil Dihapus');
                        });
                    }
                    else {
                        console.log("jangan hapus", i + "-" + response[i].idPelajaranTryoutOnline + "-" + response[i].$id)
                    }

                }
            }
        })

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

    .controller('statusJawabanTryoutOnlineSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah');

        if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1; }
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
        };

        if ($scope.data.keterangan === "all" || $scope.data.keterangan === "Kosong") {
            var ref = firebase.database(app).ref("jawabanTryoutOnlineSiswa").orderByChild("filter").equalTo($scope.data.idTryoutOnline + "_" + $scope.data.idPelajaranTryoutOnline + "_" + $scope.uidSiswa);
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }
        else if ($scope.data.keterangan === "Benar") {
            var ref = firebase.database(app).ref("jawabanTryoutOnlineSiswa").orderByChild("filterStatusJawaban").equalTo($stateParams.idTryoutOnline + "_" + $stateParams.idPelajaranTryoutOnline + "_" + $scope.uidSiswa + "_Benar");
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }

        else if ($scope.data.keterangan === "Salah") {
            var ref = firebase.database(app).ref("jawabanTryoutOnlineSiswa").orderByChild("filterStatusJawaban").equalTo($stateParams.idTryoutOnline + "_" + $stateParams.idPelajaranTryoutOnline + "_" + $scope.uidSiswa + "_Salah");
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