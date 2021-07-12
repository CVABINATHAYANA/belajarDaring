angular.module('app.olimpiadeOnlineSOCSiswa', [])

    .controller('olimpiadeOnlineSOCSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$interval', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $interval) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa')


        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        $scope.data = {
            "idTryout": $stateParams.idTryout,
            "namaTryout": $stateParams.namaTryout,
            "jenjang": $stateParams.jenjang,
            "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idPelajaranTryout": $stateParams.idPelajaranTryout,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran,
            "statusFinish": $stateParams.statusFinish,
            "idJawabanOlimpiadeSiswaPerPelajaran": $stateParams.idJawabanOlimpiadeSiswaPerPelajaran,
            "idRekapJawabanOlimpiadeSiswa": $stateParams.idRekapJawabanOlimpiadeSiswa
        };

        $scope.theTime = new Date().toLocaleTimeString();
        $interval(function () {
            $scope.theTime = new Date().toLocaleTimeString();
        }, 1000);


        //Cek Status Finish Ujian
        var cekStatusFinish = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran/" + $scope.data.idJawabanOlimpiadeSiswaPerPelajaran);
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
            $state.go('menuSiswa.berandaSOCSiswa');
        }

        else {
            Date.prototype.addMinutes = function (minutes) {
                var copiedDate = new Date(this.getTime());
                return new Date(copiedDate.getTime() + minutes * 60000);
            }
            var getDurasiUjian = firebase.database().ref("pengaturanUmumUjian").orderByChild("filter").equalTo($stateParams.idTryout + "_" + $stateParams.idPelajaranTryout);
            getDurasiUjian.on("child_added", function (snapshot) {
                $scope.durasiUjianOlimpiade = snapshot.val().durasiUjian;
                //console.log("dataDurasi", $scope.durasiUjianOlimpiade)
                $scope.now = new Date();
                $scope.newNow = $scope.now.addMinutes($scope.durasiUjianOlimpiade);
                var difference = $scope.newNow.getTime() - $scope.now.getTime(); // This will give difference in milliseconds
                var resultInMinutes = Math.round(difference / 60000);
                // console.log("jam Sekarang : ", $scope.now);
                // console.log("berakhir di Jam : ", $scope.newNow);
                // console.log("totalMenitnya: ", resultInMinutes);

                var updatePerPelajaran = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran").orderByChild("filter").equalTo($stateParams.idTryout + "_" + $stateParams.idPelajaranTryout + "_" + $scope.uidSiswa);
                updatePerPelajaran.on("child_added", function (snapshot) {
                    //console.log(snapshot.val());
                    if (snapshot.val().jamDiMulai === "") {
                        var datanyaUpdate = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran/" + snapshot.key);
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
            var refPengaturanUmum = firebase.database().ref("pengaturanUmumUjian").orderByChild("filter").equalTo($stateParams.idTryout + "_" + $stateParams.idPelajaranTryout);
            refPengaturanUmum.on("child_added", function (snapshot) {
                $scope.soalAcak = snapshot.val().soalAcak;
                $scope.nilaiMaksimum = snapshot.val().nilaiMaksimum * 1;
                $scope.jumlahSoal = snapshot.val().jumlahSoal * 1;
                $scope.bobotNilai = snapshot.val().nilaiMaksimum * 1 / snapshot.val().jumlahSoal * 1;
                // console.log("nilaiMaksimum",$scope.nilaiMaksimum);
                // console.log("jumlahSoal",$scope.jumlahSoal);
                // console.log("bobotNilai",$scope.bobotNilai);

                //Mengupdate Jumlah Soal di Tabel Jawaban PerPelajaran
                var updateData = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran/" + $scope.data.idJawabanOlimpiadeSiswaPerPelajaran);

                updateData.update(JSON.parse(JSON.stringify({
                    "jumlahSoal": $scope.jumlahSoal,
                    "statusTerjawab": true,
                }))).then(function (resp) {
                    // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                });
            });



            //Menghitung Status Terjawab
            var hitungNilai = firebase.database().ref("jawabanOlimpiadeSiswa").orderByChild("filter").equalTo($stateParams.idTryout + "_" + $stateParams.idPelajaranTryout + "_" + $scope.uidSiswa);
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


            //Mengecek Tabel jawabanOlimpiadeSiswa
            var cek = firebase.database().ref("jawabanOlimpiadeSiswa").orderByChild("filter").equalTo($stateParams.idTryout + "_" + $stateParams.idPelajaranTryout + "_" + $scope.uidSiswa);
            var listCek = $firebaseArray(cek);

            listCek.$loaded().then(function (callBack) {
                if (callBack.length === 0) {

                    var ref = firebase.database().ref("soalOlimpiade").orderByChild("filterJumlahSoal").equalTo($stateParams.idTryout + "_" + $stateParams.idPelajaranTryout);
                    var listRef = $firebaseArray(ref);

                    listRef.$loaded().then(function (response) {
                        if ($scope.soalAcak === true) {
                            $scope.dataSoal = response.shuffle();
                        }
                        else if ($scope.soalAcak === false) {
                            $scope.dataSoal = response;
                        }


                        for (i = 0; i < $scope.dataSoal.length; i++) {
                            $scope.nomorSoal = i + 1;
                            var addSoal = firebase.database().ref("jawabanOlimpiadeSiswa");
                            addSoal.push({

                                "idTryout": $stateParams.idTryout,
                                "idSoal": $scope.dataSoal[i].idSoal,
                                "nomorSoal": $scope.nomorSoal,
                                "namaTryout": $stateParams.namaTryout,
                                "jenjang": $stateParams.jenjang,
                                "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
                                "namaKota": $stateParams.namaKota,
                                "namaProvinsi": $stateParams.namaProvinsi,
                                "semester": $stateParams.semester,
                                "tahunAjaran": $stateParams.tahunAjaran,

                                "idPelajaranTryout": $stateParams.idPelajaranTryout,
                                "idPelajaran": $stateParams.idPelajaran,
                                "pelajaran": $stateParams.pelajaran,

                                "idPengguna": $scope.idPenggunaSiswa,
                                "namaPengguna": $scope.namaPenggunaSiswa,
                                "uid": $scope.uidSiswa,
                                "idSekolah": $scope.idSekolahSiswa,

                                "filter": $stateParams.idTryout + "_" + $stateParams.idPelajaranTryout + "_" + $scope.uidSiswa,
                                "filterNomorSoal": $stateParams.idTryout + "_" + $stateParams.idPelajaranTryout + "_" + $scope.uidSiswa + "_" + $scope.nomorSoal,
                                "filterHapusRegistrasi": $stateParams.idTryout + "_" + $scope.uidSiswa,

                                "statusJawaban": "",
                                "statusJawabanBenar": 0,
                                "statusJawabanSalah": 0,
                                "kunciJawaban": "",
                                "pilihanJawaban": "",
                                "bobotNilai": 0,
                                "statusTerjawab": 0

                            }).then(function (resp) {
                                //console.log('success');
                                var soalSiswa = firebase.database().ref("jawabanOlimpiadeSiswa").orderByChild("filter").equalTo($stateParams.idTryout + "_" + $stateParams.idPelajaranTryout + "_" + $scope.uidSiswa);
                                var listSoalSiswa = $firebaseArray(soalSiswa);

                                listSoalSiswa.$loaded().then(function (response) {
                                    $scope.soalSiswa = response;
                                    $scope.nomorSoal = response[0].nomorSoal;
                                    $scope.idSoal = response[0].idSoal;
                                    $scope.soal = response[0];
                                    $scope.idJawabanOlimpiadeSiswa = response[0].$id;
                                    $scope.danu.pilihanJawaban = response[0].pilihanJawaban;

                                    var tampilSoal = firebase.database().ref("soal/" + response[0].idSoal);
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
            var soalSiswa = firebase.database().ref("jawabanOlimpiadeSiswa").orderByChild("filter").equalTo($stateParams.idTryout + "_" + $stateParams.idPelajaranTryout + "_" + $scope.uidSiswa);
            var listSoalSiswa = $firebaseArray(soalSiswa);

            listSoalSiswa.$loaded().then(function (response) {
                if ($scope.cekStatusFinish === true || $scope.tutupUjianSekarang === true) {
                    $ionicPopup.alert({
                        title: 'MAAF',
                        template: 'Waktu ujian mata pelajaran ini sudah HABIS',
                        okType: 'button-positive'
                    });
                    $state.go('menuSiswa.berandaSOCSiswa');
                }
                else if ($scope.cekStatusFinish === false) {
                    // console.log(response[0]);
                    // console.log(response[0].nomorSoal);
                    $scope.soalSiswa = response;
                    $scope.nomorSoal = response[0].nomorSoal;
                    $scope.idSoal = response[0].idSoal;
                    $scope.soal = response[0];
                    $scope.idJawabanOlimpiadeSiswa = response[0].$id;
                    $scope.danu.pilihanJawaban = response[0].pilihanJawaban;
                    

                    var tampilSoal = firebase.database().ref("soal/" + response[0].idSoal);
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
                var cekStatusFinish = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran/" + $scope.data.idJawabanOlimpiadeSiswaPerPelajaran);
                cekStatusFinish.on("value", function (snapshot) {

                    $scope.cekStatusFinish = snapshot.val().statusFinish;
                });

                if ($scope.cekStatusFinish === true || $scope.tutupUjianSekarang === true) {

                    //Menghitung Nilai Per Pelajaran
                    var hitungNilai = firebase.database().ref("jawabanOlimpiadeSiswa").orderByChild("filter").equalTo($stateParams.idTryout + "_" + $stateParams.idPelajaranTryout + "_" + $scope.uidSiswa);
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

                        $ionicLoading.show();
                        var cekRekap = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa + "/pelajaran").orderByChild("idPelajaranTryout").equalTo($stateParams.idPelajaranTryout);
                        cekRekap.on("child_added", function (snapshot) {
                            var updateRekap = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa + "/pelajaran/" + snapshot.key);

                            updateRekap.update(JSON.parse(JSON.stringify({
                                "nilai": $scope.totalNilai
                            }))).then(function (resp) {
                                /*********************************************/
                                var getData = firebase.database().ref("rekapJawabanOlimpiadeSiswa").orderByChild("filter").equalTo($scope.data.idTryout + "_" + $scope.uidSiswa);
                                getData.on("child_added", function (snapshot) {

                                    var avgNilai = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + snapshot.key + "/pelajaran");
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
                                                var updateNilaiRata = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + snapshot.key);
                                                updateNilaiRata.update(JSON.parse(JSON.stringify({
                                                    "jumlahNilai": $scope.nilaiTotal,
                                                    "rataRata": $scope.avg,
                                                }))).then(function (resp) {
                                                    $ionicLoading.hide();
                                                    $state.go('menuSiswa.berandaSOCSiswa');
                                                });
                                            }

                                        }

                                    });

                                });
                            });
                        })

                    });

                    $ionicPopup.alert({
                        title: 'MAAF',
                        template: 'Waktu ujian mata pelajaran ini sudah HABIS',
                        okType: 'button-positive'
                    });
                    $state.go('menuSiswa.berandaSOCSiswa');
                }
                else if ($scope.cekStatusFinish === false) {
                    $scope.soal = data;
                    $scope.idSoal = data.idSoal;
                    $scope.nomorSoal = data.nomorSoal;
                    $scope.idJawabanOlimpiadeSiswa = data.$id;
                    $scope.danu.pilihanJawaban = data.pilihanJawaban;

                    var tampilSoal = firebase.database().ref("soal/" + data.idSoal);
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
                var cekStatusFinish = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran/" + $scope.data.idJawabanOlimpiadeSiswaPerPelajaran);
                cekStatusFinish.on("value", function (snapshot) {
                    $scope.cekStatusFinish = snapshot.val().statusFinish;
                });
                //console.log($scope.cekStatusFinish);

                if ($scope.cekStatusFinish === true || $scope.tutupUjianSekarang === true) {

                    //Menghitung Nilai Per Pelajaran
                    var hitungNilai = firebase.database().ref("jawabanOlimpiadeSiswa").orderByChild("filter").equalTo($stateParams.idTryout + "_" + $stateParams.idPelajaranTryout + "_" + $scope.uidSiswa);
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


                        $ionicLoading.show();
                        var cekRekap = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa + "/pelajaran").orderByChild("idPelajaranTryout").equalTo($stateParams.idPelajaranTryout);
                        cekRekap.on("child_added", function (snapshot) {
                            var updateRekap = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa + "/pelajaran/" + snapshot.key);
                            updateRekap.update(JSON.parse(JSON.stringify({
                                "nilai": $scope.totalNilai
                            }))).then(function (resp) {
                                /*********************************************/
                                var getData = firebase.database().ref("rekapJawabanOlimpiadeSiswa").orderByChild("filter").equalTo($scope.data.idTryout + "_" + $scope.uidSiswa);
                                getData.on("child_added", function (snapshot) {

                                    var avgNilai = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + snapshot.key + "/pelajaran");
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
                                                var updateNilaiRata = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + snapshot.key);
                                                updateNilaiRata.update(JSON.parse(JSON.stringify({
                                                    "jumlahNilai": $scope.nilaiTotal,
                                                    "rataRata": $scope.avg,
                                                }))).then(function (resp) {
                                                    $ionicLoading.hide();
                                                    $state.go('menuSiswa.berandaSOCSiswa');
                                                });
                                            }

                                        }

                                    });

                                });
                            });
                        })



                    });

                    $ionicPopup.alert({
                        title: 'MAAF',
                        template: 'Waktu ujian mata pelajaran ini sudah HABIS',
                        okType: 'button-positive'
                    });
                    $state.go('menuSiswa.berandaSOCSiswa');
                }
                else if ($scope.cekStatusFinish === false) {
                    //Jika Jawaban Benar
                    if ($scope.formData.kunciJawaban === $scope.danu.pilihanJawaban) {
                        $scope.statusJawaban = "Benar";
                        $scope.statusJawabanBenar = 1;
                        $scope.statusJawabanSalah = 0;
                        $scope.nilai = $scope.bobotNilai;
                        $scope.bobotNilaiJawaban = 1;
                        $scope.filterStatusJawaban = $stateParams.idTryout + "_" + $stateParams.idPelajaranTryout + "_" + $scope.uidSiswa + "_Benar";
                    }

                    //Jika Jawaban Salah
                    else if ($scope.formData.kunciJawaban !== $scope.danu.pilihanJawaban) {
                        $scope.statusJawaban = "Salah";
                        $scope.statusJawabanBenar = 0;
                        $scope.statusJawabanSalah = 1;
                        $scope.nilai = $scope.bobotNilai * 0;
                        $scope.bobotNilaiJawaban = 1;
                        $scope.filterStatusJawaban = $stateParams.idTryout + "_" + $stateParams.idPelajaranTryout + "_" + $scope.uidSiswa + "_Salah";
                    }

                    //Memperbaharui Isi tabel dengan jawaban siswa
                    var updateJawabanOlimpiadeSiswa = firebase.database().ref("jawabanOlimpiadeSiswa/" + $scope.idJawabanOlimpiadeSiswa);

                    updateJawabanOlimpiadeSiswa.update(JSON.parse(JSON.stringify({
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
                    var hitungNilai = firebase.database().ref("jawabanOlimpiadeSiswa").orderByChild("filter").equalTo($stateParams.idTryout + "_" + $stateParams.idPelajaranTryout + "_" + $scope.uidSiswa);
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
                        var hitungNilai = firebase.database().ref("jawabanOlimpiadeSiswa").orderByChild("filter").equalTo($stateParams.idTryout + "_" + $stateParams.idPelajaranTryout + "_" + $scope.uidSiswa);
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
                            var ref = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran/" + $scope.data.idJawabanOlimpiadeSiswaPerPelajaran)

                            ref.update(JSON.parse(JSON.stringify({
                                "benar": $scope.statusJawabanBenar,
                                "salah": $scope.statusJawabanSalah,
                                "kosong": $scope.kosong,
                                "nilai": $scope.totalNilai,
                                "statusFinish": true
                            }))).then(function (resp) {
                                //console.log("Updated");
                                $ionicLoading.show();
                                var cekRekap = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa + "/pelajaran").orderByChild("idPelajaranTryout").equalTo($stateParams.idPelajaranTryout);
                                cekRekap.on("child_added", function (snapshot) {
                                    var updateRekap = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa + "/pelajaran/" + snapshot.key);

                                    updateRekap.update(JSON.parse(JSON.stringify({
                                        "nilai": $scope.totalNilai
                                    }))).then(function (resp) {
                                        /*********************************************/
                                        var getData = firebase.database().ref("rekapJawabanOlimpiadeSiswa").orderByChild("filter").equalTo($scope.data.idTryout + "_" + $scope.uidSiswa);
                                        getData.on("child_added", function (snapshot) {

                                            var avgNilai = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + snapshot.key + "/pelajaran");
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
                                                        var updateNilaiRata = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + snapshot.key);
                                                        updateNilaiRata.update(JSON.parse(JSON.stringify({
                                                            "jumlahNilai": $scope.nilaiTotal,
                                                            "rataRata": $scope.avg,
                                                        }))).then(function (resp) {
                                                            $ionicLoading.hide()
                                                            // $state.go('menu.beranda');
                                                            //Percobaan
                                                            $state.go("menuSiswa.nilaiSOCSiswa", {
                                                                "idTryout": $stateParams.idTryout,
                                                                "namaTryout": $stateParams.namaTryout,
                                                                "jenjang": $stateParams.jenjang,
                                                                "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
                                                                "namaKota": $stateParams.namaKota,
                                                                "namaProvinsi": $stateParams.namaProvinsi,
                                                                "semester": $stateParams.semester,
                                                                "tahunAjaran": $stateParams.tahunAjaran,
                                                                "idPelajaranTryout": $stateParams.idPelajaranTryout,
                                                                "idPelajaran": $stateParams.idPelajaran,
                                                                "pelajaran": $stateParams.pelajaran,
                                                                "statusFinish": true,
                                                                "idJawabanOlimpiadeSiswaPerPelajaran": $stateParams.idJawabanOlimpiadeSiswaPerPelajaran,
                                                                "idRekapJawabanOlimpiadeSiswa": $stateParams.idRekapJawabanOlimpiadeSiswa
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
                    }
                    else {

                    }
                });
            };

        }

    }])