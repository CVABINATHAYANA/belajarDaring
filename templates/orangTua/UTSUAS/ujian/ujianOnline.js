angular.module('app.UTSUASOnlineSiswa', ['ngYoutubeEmbed'])

    .controller('UTSUASOnlineSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$interval','$ionicViewService', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $interval, $ionicViewService) {

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
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
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
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj14") { var app = app_sapta; }


        if (!$scope.idPenggunaSiswa) {
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
            "idKelas": $stateParams.idKelas,
            "siswauid": $stateParams.siswauid,
        };
        console.log('IdUTSUAS'+$scope.data.idUTSUAS);
        console.log("idKelas "+$scope.data.idKelas);
        console.log("uid "+$scope.data.siswauid);
        // console.log($scope.data);

        $scope.theTime = new Date().toLocaleTimeString();
        $interval(function () {
            $scope.theTime = new Date().toLocaleTimeString();
        }, 1000);

        //Cek Status Finish Ujian
        var cekStatusFinish = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" +$scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid +'/'+$scope.data.idJawabanUTSUASSiswaPerPelajaran);
        cekStatusFinish.on("value", function (snapshot) {
            $scope.cekStatusFinish = snapshot.val().statusFinish;
            $scope.tutupUjianSekarang = snapshot.val().tutupUjianSekarang;
            //console.log(snapshot.val());
        });

        //console.log("tutup", $scope.tutupUjianSekarang);

        if ($scope.cekStatusFinish === true || $scope.tutupUjianSekarang === true) {
            $ionicPopup.alert({
                title: 'MAAF',
                template: 'Waktu ujian mata pelajaran ini sudah HABIS',
                okType: 'button-positive'
            });
            $state.go("menuSiswa.nilaiUTSUASSiswa", {
                "idUTSUAS": $stateParams.idUTSUAS,
                "namaUTSUAS": $stateParams.namaUTSUAS,
                "jenjang": $stateParams.jenjang,
                // "utsUasTingkat": $stateParams.utsUasTingkat,
                "namaKota": $stateParams.namaKota,
                "namaProvinsi": $stateParams.namaProvinsi,
                "semester": $stateParams.semester,
                "tahunAjaran": $stateParams.tahunAjaran,
                "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                "idPelajaran": $stateParams.idPelajaran,
                "pelajaran": $stateParams.pelajaran,
                "statusFinish": true,
                "idJawabanUTSUASSiswaPerPelajaran": $stateParams.idJawabanUTSUASSiswaPerPelajaran,
                "idRekapJawabanUTSUASSiswa": $stateParams.idRekapJawabanUTSUASSiswa,
                // "idKelas": $stateParams.idKelas,
                // "siswauid": $stateParams.siswauid,
            });
        }

        else {
            Date.prototype.addMinutes = function (minutes) {
                var copiedDate = new Date(this.getTime());
                return new Date(copiedDate.getTime() + minutes * 60000);
            }
            var getDurasiUjian = firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
            getDurasiUjian.on("child_added", function (snapshot) {
                $scope.durasiUjianUTSUAS = snapshot.val().durasiUjian;
                //console.log("dataDurasi", $scope.durasiUjianUTSUAS)
                $scope.now = new Date();
                $scope.newNow = $scope.now.addMinutes($scope.durasiUjianUTSUAS);
                var difference = $scope.newNow.getTime() - $scope.now.getTime(); // This will give difference in milliseconds
                var resultInMinutes = Math.round(difference / 60000);
                // console.log("jam Sekarang : ", $scope.now);
                // console.log("berakhir di Jam : ", $scope.newNow);
                // console.log("totalMenitnya: ", resultInMinutes);

                var updatePerPelajaran = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" +$scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid ).orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.uidSiswa);
                updatePerPelajaran.on("child_added", function (snapshot) {
                    //console.log(snapshot.val());
                    if (snapshot.val().jamDiMulai === "") {
                        var datanyaUpdate = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" +$scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid +'/' + snapshot.key);
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

            //Pengaturan Umum Ujian
            var refPengaturanUmum = firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
            refPengaturanUmum.on("child_added", function (snapshot) {
                $scope.soalAcak = snapshot.val().soalAcak;
                $scope.nilaiMaksimum = snapshot.val().nilaiMaksimum * 1;
                $scope.jumlahSoal = snapshot.val().jumlahSoal * 1;
                $scope.bobotNilai = snapshot.val().nilaiMaksimum * 1 / snapshot.val().jumlahSoal * 1;
                // console.log("nilaiMaksimum",$scope.nilaiMaksimum);
                // console.log("jumlahSoal",$scope.jumlahSoal);
                // console.log("bobotNilai",$scope.bobotNilai);

                //Mengupdate Jumlah Soal di Tabel Jawaban PerPelajaran
                var updateData = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" +$scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid +'/' + $scope.data.idJawabanUTSUASSiswaPerPelajaran);

                updateData.update(JSON.parse(JSON.stringify({
                    "jumlahSoal": $scope.jumlahSoal,
                    "statusTerjawab": true,
                }))).then(function (resp) {
                    // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                });
            });



            //Menghitung Status Terjawab
            var hitungNilai = firebase.database(app).ref("jawabanUTSUASSiswa/" +$scope.data.idUTSUAS+  '/' +$scope.data.siswauid).orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.uidSiswa);
            var listHitungNilai = $firebaseArray(hitungNilai);

            $scope.statusTerjawab = 0;
            listHitungNilai.$loaded().then(function (response) {
                for (i = 0; i < response.length; i++) {
                    $scope.statusTerjawab = $scope.statusTerjawab + response[i].statusTerjawab;
                }
            });

            Array.prototype.shuffle = function () {
                var i = this.length, j, temp;
                if (i == 0) return this;
                while (--i) {
                    j = Math.floor(Math.random() * (i + 1));
                    temp = this[i];
                    this[i] = this[j];
                    this[j] = temp;
                }
                return this;
            }


            //Mengecek Tabel jawabanUTSUASSiswa
            var cek = firebase.database(app).ref("jawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' +$scope.data.siswauid).orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.uidSiswa);
            var listCek = $firebaseArray(cek);

            listCek.$loaded().then(function (callBack) {
                // console.log("callBack", callBack.length)
                if (callBack.length === 0) {

                    var ref = firebase.database(app).ref("soalUTSUAS").orderByChild("filterJumlahSoal").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
                    var listRef = $firebaseArray(ref);

                    listRef.$loaded().then(function (response) {

                        if ($scope.soalAcak === true) {
                            $scope.dataSoal = response.shuffle();
                            // console.log("banyakDataShuffle",$scope.dataSoal);
                        }
                        else if ($scope.soalAcak === false) {
                            $scope.dataSoal = response;
                            // console.log("banyakData",$scope.dataSoal);
                        }

                        for (i = 0; i < $scope.dataSoal.length; i++) {
                            $scope.nomorSoal = i + 1;
                            var addSoal = firebase.database(app).ref("jawabanUTSUASSiswa/" +$scope.data.idUTSUAS+  '/' +$scope.data.siswauid);
                            addSoal.push({

                                "idUTSUAS": $stateParams.idUTSUAS,
                                "idSoal": $scope.dataSoal[i].idSoal,
                                "nomorSoal": $scope.nomorSoal,
                                "namaUTSUAS": $stateParams.namaUTSUAS,
                                "jenjang": $stateParams.jenjang,
                                // "utsUasTingkat": $stateParams.utsUasTingkat,
                                "namaKota": $stateParams.namaKota,
                                "namaProvinsi": $stateParams.namaProvinsi,
                                "semester": $stateParams.semester,
                                "tahunAjaran": $stateParams.tahunAjaran,

                                "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                                "idPelajaran": $stateParams.idPelajaran,
                                "pelajaran": $stateParams.pelajaran,

                                "idPengguna": $scope.idPenggunaSiswa,
                                "namaPengguna": $scope.namaPenggunaSiswa,
                                "uid": $scope.uidSiswa,
                                "idSekolah": $scope.idSekolahSiswa,

                                "filter": $stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.uidSiswa,
                                "filterNomorSoal": $stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.uidSiswa + "_" + $scope.nomorSoal,
                                "filterHapusRegistrasi": $stateParams.idUTSUAS + "_" + $scope.uidSiswa,

                                "statusJawaban": "",
                                "statusJawabanBenar": 0,
                                "statusJawabanSalah": 0,
                                "kunciJawaban": "",
                                "pilihanJawaban": "",
                                "bobotNilai": 0,
                                "statusTerjawab": 0

                            }).then(function (resp) {
                                console.log('success');
                                var soalSiswa = firebase.database(app).ref("jawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' +$scope.data.siswauid).orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.uidSiswa);
                                var listSoalSiswa = $firebaseArray(soalSiswa);

                                listSoalSiswa.$loaded().then(function (response) {
                                    $scope.soalSiswa = response;
                                    $scope.nomorSoal = response[0].nomorSoal;
                                    $scope.idSoal = response[0].idSoal;
                                    $scope.soal = response[0];
                                    $scope.idJawabanUTSUASSiswa = response[0].$id;
                                    $scope.danu.pilihanJawaban = response[0].pilihanJawaban;

                                    var tampilSoal = firebase.database(appBankSoal).ref("soal/" + response[0].idSoal);
                                    var listTampilSoal = $firebaseObject(tampilSoal);
                                    $ionicLoading.show();
                                    listTampilSoal.$loaded().then(function (response) {
                                        $ionicLoading.hide();
                                        $scope.formData = response;
                                    });
                                });
                            })
                        }

                    });

                }
                else {
                    //console.log("No Action Anymore");
                }
            });


            //Menampilkan nomor soal dan soal nomor pertama
            var soalSiswa = firebase.database(app).ref("jawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' +$scope.data.siswauid).orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.uidSiswa);
            var listSoalSiswa = $firebaseArray(soalSiswa);

            listSoalSiswa.$loaded().then(function (response) {
                if ($scope.cekStatusFinish === true || $scope.tutupUjianSekarang === true) {
                    $ionicPopup.alert({
                        title: 'MAAF',
                        template: 'Waktu ujian mata pelajaran ini sudah HABIS',
                        okType: 'button-positive'
                    });
                    $state.go("menuSiswa.nilaiUTSUASSiswa", {
                        "idUTSUAS": $stateParams.idUTSUAS,
                        "namaUTSUAS": $stateParams.namaUTSUAS,
                        "jenjang": $stateParams.jenjang,
                        // "utsUasTingkat": $stateParams.utsUasTingkat,
                        "namaKota": $stateParams.namaKota,
                        "namaProvinsi": $stateParams.namaProvinsi,
                        "semester": $stateParams.semester,
                        "tahunAjaran": $stateParams.tahunAjaran,
                        "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                        "idPelajaran": $stateParams.idPelajaran,
                        "pelajaran": $stateParams.pelajaran,
                        "statusFinish": true,
                        "idJawabanUTSUASSiswaPerPelajaran": $stateParams.idJawabanUTSUASSiswaPerPelajaran,
                        "idRekapJawabanUTSUASSiswa": $stateParams.idRekapJawabanUTSUASSiswa,
                        // "idKelas": $stateParams.idKelas,
                        // "siswauid": $stateParams.siswauid,
                    });
                }
                else if ($scope.cekStatusFinish === false) {
                    // console.log(response[0]);
                    // console.log(response[0].nomorSoal);
                    $scope.soalSiswa = response;
                    $scope.nomorSoal = response[0].nomorSoal;
                    $scope.idSoal = response[0].idSoal;
                    $scope.soal = response[0];
                    $scope.idJawabanUTSUASSiswa = response[0].$id;
                    $scope.danu.pilihanJawaban = response[0].pilihanJawaban;


                    var tampilSoal = firebase.database(appBankSoal).ref("soal/" + response[0].idSoal);
                    var listTampilSoal = $firebaseObject(tampilSoal);
                    $ionicLoading.show();
                    listTampilSoal.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.formData = response;
                    });
                }

            });


            //Mengklik Nomor Soal
            $scope.getSoal = function (data) {
                $scope.nomorSoalNow = data.nomorSoal;
                //Cek Status Finish Ujian
                var cekStatusFinish = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" +$scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid +'/' + $scope.data.idJawabanUTSUASSiswaPerPelajaran);
                cekStatusFinish.on("value", function (snapshot) {

                    $scope.cekStatusFinish = snapshot.val().statusFinish;
                });

                if ($scope.cekStatusFinish === true || $scope.tutupUjianSekarang === true) {

                    //Menghitung Nilai Per Pelajaran
                    var hitungNilai = firebase.database(app).ref("jawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' +$scope.data.siswauid).orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.uidSiswa);
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
                        var ref = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + +$scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid + '/' + $scope.data.idJawabanUTSUASSiswaPerPelajaran)

                        ref.update(JSON.parse(JSON.stringify({
                            "benar": $scope.statusJawabanBenar,
                            "salah": $scope.statusJawabanSalah,
                            "kosong": $scope.kosong,
                            "nilai": $scope.totalNilai,
                            "statusFinish": true
                        }))).then(function (resp) {
                            console.log("Updated");
                            $ionicLoading.show();
                            var cekRekap = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+  '/' + $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran").orderByChild("idPelajaranUTSUAS").equalTo($stateParams.idPelajaranUTSUAS);
                            cekRekap.on("child_added", function (snapshot) {

                                // console.log("beuh", snapshot.val())

                                var updateRekap = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' + $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran/" + snapshot.key);

                                updateRekap.update(JSON.parse(JSON.stringify({
                                    "nilai": $scope.totalNilai
                                }))).then(function (resp) {
                                    /*********************************************/
                                    var getData = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS).orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.uidSiswa);
                                    getData.on("child_added", function (snapshot) {

                                        var avgNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/'+ snapshot.key + "/pelajaran");
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
                                                    var updateNilaiRata = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' + snapshot.key);
                                                    updateNilaiRata.update(JSON.parse(JSON.stringify({
                                                        "jumlahNilai": $scope.nilaiTotal,
                                                        "rataRata": $scope.avg,
                                                    }))).then(function (resp) {
                                                        $ionicLoading.hide()
                                                        // $state.go('menu.beranda');
                                                        //Percobaan
                                                        $state.go("menuSiswa.nilaiUTSUASSiswa", {
                                                            "idUTSUAS": $stateParams.idUTSUAS,
                                                            "namaUTSUAS": $stateParams.namaUTSUAS,
                                                            "jenjang": $stateParams.jenjang,
                                                            // "utsUasTingkat": $stateParams.utsUasTingkat,
                                                            "namaKota": $stateParams.namaKota,
                                                            "namaProvinsi": $stateParams.namaProvinsi,
                                                            "semester": $stateParams.semester,
                                                            "tahunAjaran": $stateParams.tahunAjaran,
                                                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                                                            "idPelajaran": $stateParams.idPelajaran,
                                                            "pelajaran": $stateParams.pelajaran,
                                                            "statusFinish": true,
                                                            "idJawabanUTSUASSiswaPerPelajaran": $stateParams.idJawabanUTSUASSiswaPerPelajaran,
                                                            "idRekapJawabanUTSUASSiswa": $stateParams.idRekapJawabanUTSUASSiswa,
                                                            // "idKelas": $stateParams.idKelas,
                                                            // "siswauid": $stateParams.siswauid,
                                                        });
                                                    });
                                                }

                                            }

                                        });

                                    });
                                });
                            })

                        });

                    });

                    $ionicPopup.alert({
                        title: 'MAAF',
                        template: 'Waktu ujian mata pelajaran ini sudah HABIS',
                        okType: 'button-positive'
                    });
                    // $state.go('menuSiswa.UTSUASSiswa');
                }
                else if ($scope.cekStatusFinish === false) {
                    $scope.soal = data;
                    $scope.idSoal = data.idSoal;
                    $scope.nomorSoal = data.nomorSoal;
                    $scope.idJawabanUTSUASSiswa = data.$id;
                    $scope.danu.pilihanJawaban = data.pilihanJawaban;

                    var tampilSoal = firebase.database(appBankSoal).ref("soal/" + data.idSoal);
                    var listTampilSoal = $firebaseObject(tampilSoal);
                    $ionicLoading.show();
                    listTampilSoal.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.formData = response;
                    });
                }

            };

            $scope.danu = {
                "pilihanJawaban": "",
            };


            //Memasukkan Jawaban Siswa
            $scope.klik = function () {

                //Cek Status Finish Ujian
                var cekStatusFinish = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + +$scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid +'/' + $scope.data.idJawabanUTSUASSiswaPerPelajaran);
                cekStatusFinish.on("value", function (snapshot) {
                    $scope.cekStatusFinish = snapshot.val().statusFinish;
                });
                //console.log($scope.cekStatusFinish);

                if ($scope.cekStatusFinish === true || $scope.tutupUjianSekarang === true) {

                    //Menghitung Nilai Per Pelajaran
                    var hitungNilai = firebase.database(app).ref("jawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' +$scope.data.siswauid).orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.uidSiswa);
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
                        var ref = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" +$scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid +'/' + $scope.data.idJawabanUTSUASSiswaPerPelajaran)

                        ref.update(JSON.parse(JSON.stringify({
                            "benar": $scope.statusJawabanBenar,
                            "salah": $scope.statusJawabanSalah,
                            "kosong": $scope.kosong,
                            "nilai": $scope.totalNilai,
                            "statusFinish": true
                        }))).then(function (resp) {
                            console.log("Updated");
                            $ionicLoading.show();
                            var cekRekap = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' + $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran").orderByChild("idPelajaranUTSUAS").equalTo($stateParams.idPelajaranUTSUAS);
                            cekRekap.on("child_added", function (snapshot) {

                                // console.log("beuh", snapshot.val())

                                var updateRekap = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+'/' + $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran/" + snapshot.key);

                                updateRekap.update(JSON.parse(JSON.stringify({
                                    "nilai": $scope.totalNilai
                                }))).then(function (resp) {
                                    /*********************************************/
                                    var getData = firebase.database(app).ref("rekapJawabanUTSUASSiswa/"+$scope.data.idUTSUAS+ '/' +$scope.data.siswauid).orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.uidSiswa);
                                    getData.on("child_added", function (snapshot) {

                                        var avgNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/'+ snapshot.key + "/pelajaran");
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
                                                    var updateNilaiRata = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS + '/' + snapshot.key);
                                                    updateNilaiRata.update(JSON.parse(JSON.stringify({
                                                        "jumlahNilai": $scope.nilaiTotal,
                                                        "rataRata": $scope.avg,
                                                    }))).then(function (resp) {
                                                        $ionicLoading.hide()
                                                        // $state.go('menu.beranda');
                                                        //Percobaan
                                                        $state.go("menuSiswa.nilaiUTSUASSiswa", {
                                                            "idUTSUAS": $stateParams.idUTSUAS,
                                                            "namaUTSUAS": $stateParams.namaUTSUAS,
                                                            "jenjang": $stateParams.jenjang,
                                                            // "utsUasTingkat": $stateParams.utsUasTingkat,
                                                            "namaKota": $stateParams.namaKota,
                                                            "namaProvinsi": $stateParams.namaProvinsi,
                                                            "semester": $stateParams.semester,
                                                            "tahunAjaran": $stateParams.tahunAjaran,
                                                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                                                            "idPelajaran": $stateParams.idPelajaran,
                                                            "pelajaran": $stateParams.pelajaran,
                                                            "statusFinish": true,
                                                            "idJawabanUTSUASSiswaPerPelajaran": $stateParams.idJawabanUTSUASSiswaPerPelajaran,
                                                            "idRekapJawabanUTSUASSiswa": $stateParams.idRekapJawabanUTSUASSiswa,
                                                            // "idKelas": $stateParams.idKelas,
                                                            // "siswauid": $stateParams.siswauid,
                                                        });
                                                    });
                                                }

                                            }

                                        });

                                    });
                                });
                            })

                        });

                    });

                    $ionicPopup.alert({
                        title: 'MAAF',
                        template: 'Waktu ujian mata pelajaran ini sudah HABIS',
                        okType: 'button-positive'
                    });
                    // $state.go('menuSiswa.UTSUASSiswa');
                }
                else if ($scope.cekStatusFinish === false) {
                    //Jika Jawaban Benar
                    if ($scope.formData.kunciJawaban === $scope.danu.pilihanJawaban) {
                        $scope.statusJawaban = "Benar";
                        $scope.statusJawabanBenar = 1;
                        $scope.statusJawabanSalah = 0;
                        $scope.nilai = $scope.bobotNilai;
                        $scope.bobotNilaiJawaban = 1;
                        $scope.filterStatusJawaban = $stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.uidSiswa + "_Benar";
                    }

                    //Jika Jawaban Salah
                    else if ($scope.formData.kunciJawaban !== $scope.danu.pilihanJawaban) {
                        $scope.statusJawaban = "Salah";
                        $scope.statusJawabanBenar = 0;
                        $scope.statusJawabanSalah = 1;
                        $scope.nilai = $scope.bobotNilai * 0;
                        $scope.bobotNilaiJawaban = 1;
                        $scope.filterStatusJawaban = $stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.uidSiswa + "_Salah";
                    }

                    //Memperbaharui Isi tabel dengan jawaban siswa
                    var updateJawabanUTSUASSiswa = firebase.database(app).ref("jawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' +$scope.data.siswauid + '/' + $scope.idJawabanUTSUASSiswa);

                    updateJawabanUTSUASSiswa.update(JSON.parse(JSON.stringify({
                        "statusJawaban": $scope.statusJawaban,
                        "statusJawabanBenar": $scope.statusJawabanBenar,
                        "statusJawabanSalah": $scope.statusJawabanSalah,
                        "kunciJawaban": $scope.formData.kunciJawaban,
                        "pilihanJawaban": $scope.danu.pilihanJawaban,
                        "bobotNilai": $scope.nilai,
                        "statusTerjawab": 1,
                        "filterStatusJawaban": $scope.filterStatusJawaban
                    }))).then(function (resp) {
                        //console.log("Jawaban Tersimpan");
                    });

                    //Menghitung Status Terjawab
                    var hitungNilai = firebase.database(app).ref("jawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' +$scope.data.siswauid).orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.uidSiswa);
                    var listHitungNilai = $firebaseArray(hitungNilai);

                    $scope.statusTerjawab = 0;
                    listHitungNilai.$loaded().then(function (response) {
                        for (i = 0; i < response.length; i++) {
                            $scope.statusTerjawab = $scope.statusTerjawab + response[i].statusTerjawab;
                        }

                    });
                }
            };

            $scope.finish = function () {

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Finish Ujian',
                    template: 'Apakah Kamu Yakin Ingin Menyelesaikan Ujian Ini? Jika Klik Ok, Kamu Akan Diarahkan Ke Halaman Nilai/Peringkat dan Tidak Akan Pernah Bisa Mengulang Ujian Kembali',
                    okType: "button-positive",
                });
                confirmPopup.then(function (res) {
                    if (res) {

                        //Menghitung Nilai Per Pelajaran
                        var hitungNilai = firebase.database(app).ref("jawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' +$scope.data.siswauid).orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.uidSiswa);
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
                            var ref = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" +$scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid + '/'+ $scope.data.idJawabanUTSUASSiswaPerPelajaran)

                            ref.update(JSON.parse(JSON.stringify({
                                "benar": $scope.statusJawabanBenar,
                                "salah": $scope.statusJawabanSalah,
                                "kosong": $scope.kosong,
                                "nilai": $scope.totalNilai,
                                "statusFinish": true
                            }))).then(function (resp) {
                                console.log("Updated");
                                $ionicLoading.show();
                                var cekRekap = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+'/' + $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran").orderByChild("idPelajaranUTSUAS").equalTo($stateParams.idPelajaranUTSUAS);
                                cekRekap.on("child_added", function (snapshot) {

                                    // console.log("beuh", snapshot.val())

                                    var updateRekap = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/' + $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran/" + snapshot.key);

                                    updateRekap.update(JSON.parse(JSON.stringify({
                                        "nilai": $scope.totalNilai
                                    }))).then(function (resp) {
                                        /*********************************************/
                                        var getData = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+ '/').orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.uidSiswa);
                                        getData.on("child_added", function (snapshot) {

                                            var avgNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+'/' + snapshot.key + "/pelajaran");
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
                                                        var updateNilaiRata = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" +$scope.data.idUTSUAS+'/' + snapshot.key);
                                                        updateNilaiRata.update(JSON.parse(JSON.stringify({
                                                            "jumlahNilai": $scope.nilaiTotal,
                                                            "rataRata": $scope.avg,
                                                        }))).then(function (resp) {
                                                            $ionicViewService.nextViewOptions({
                                                                disableBack: true
                                                            });
                                                            $ionicLoading.hide()
                                                            // $state.go('menu.beranda');
                                                            var dataUTSUAS = firebase.database(app).ref("namaUTSUAS/" + $scope.data.idUTSUAS);
                                                            dataUTSUAS.on('value', function (snapshot) {
                                                                
                                                                if(snapshot.val().nilaiDitampilkan===true){
                                                                    $state.go("menuSiswa.nilaiUTSUASSiswa", {
                                                                        "idUTSUAS": $stateParams.idUTSUAS,
                                                                        "namaUTSUAS": $stateParams.namaUTSUAS,
                                                                        "jenjang": $stateParams.jenjang,
                                                                        // "utsUasTingkat": $stateParams.utsUasTingkat,
                                                                        "namaKota": $stateParams.namaKota,
                                                                        "namaProvinsi": $stateParams.namaProvinsi,
                                                                        "semester": $stateParams.semester,
                                                                        "tahunAjaran": $stateParams.tahunAjaran,
                                                                        "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                                                                        "idPelajaran": $stateParams.idPelajaran,
                                                                        "pelajaran": $stateParams.pelajaran,
                                                                        "statusFinish": true,
                                                                        "idJawabanUTSUASSiswaPerPelajaran": $stateParams.idJawabanUTSUASSiswaPerPelajaran,
                                                                        "idRekapJawabanUTSUASSiswa": $stateParams.idRekapJawabanUTSUASSiswa,
                                                                        // "idKelas": $stateParams.idKelas,
                                                                        // "siswauid": $stateParams.siswauid,
                                                                    });
                                                                }
                                                                else{
                                                                    $state.go("menuSiswa.mulaiUTSUASSiswa", {
                                                                        "idUTSUAS": $stateParams.idUTSUAS,
                                                                        "namaUTSUAS": $stateParams.namaUTSUAS,
                                                                        "jenjang": $stateParams.jenjang,
                                                                        "utsUasTingkat": $stateParams.utsUasTingkat,
                                                                        "namaKota": $stateParams.namaKota,
                                                                        "namaProvinsi": $stateParams.namaProvinsi,
                                                                        "semester": $stateParams.semester,
                                                                        "tahunAjaran": $stateParams.tahunAjaran,
                                                                        "idRekapJawabanUTSUASSiswa": $stateParams.idRekapJawabanUTSUASSiswa,
                                                                        "idKelas": $stateParams.idKelas,
                                                                        "siswauid": $stateParams.siswauid,
                                                                    });
                                                                }
                                                            })
                                                            //Percobaan
                                                            
                                                        });
                                                    }

                                                }

                                            });

                                        });
                                    });
                                })

                            });

                        });
                    }
                    else {

                    }
                });
            };

        }

    }])