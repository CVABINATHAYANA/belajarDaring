angular.module('app.mulaiOlimpiadeSOCSiswa', [])

    .controller('mulaiOlimpiadeSOCSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "idRekapJawabanOlimpiadeSiswa": $stateParams.idRekapJawabanOlimpiadeSiswa
        };
        //console.log($scope.data)

        // $scope.theTime = new Date().toLocaleTimeString();
        // $interval(function () {
        //     $scope.theTime = new Date().toLocaleTimeString();
        //     console.log($scope.theTime);
        //     if($scope.theTime>="11:22:40 PM"){
        //         $scope.theTime = "00:00:00 PM";
        //         console.log($scope.theTime);
        //     }
        // }, 1000);

        var refPelajaran = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran").orderByChild("filterMulaiUjian").equalTo($scope.data.idTryout + "_" + $scope.uidSiswa);
        var listRefPelajaran = $firebaseArray(refPelajaran);

        $ionicLoading.show();
        listRefPelajaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPelajaran = response;
        });

        var refRekapPelajaran = firebase.database().ref("rekapJawabanOlimpiadeSiswa").orderByChild("filter").equalTo($scope.data.idTryout + "_" + $scope.uidSiswa);
        refRekapPelajaran.on("child_added", function (snapshot) {
            $scope.idRekapJawabanOlimpiadeSiswa = snapshot.key;
            // console.log(snapshot.val())
            //console.log("ID nya", $scope.idRekapJawabanOlimpiadeSiswa);
        });

        $scope.olimpiadeOnline = function (pelajaran) {
            //console.log(pelajaran);

            var cek = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran").orderByChild("filter").equalTo($stateParams.idTryout + "_" + pelajaran.idPelajaranTryout + "_" + $scope.uidSiswa);
            cek.on("child_added", function (snapshot) {

                if (snapshot.val().statusFinish === true) {
                    $state.go("menuSiswa.nilaiSOCSiswa", {
                        "idTryout": $stateParams.idTryout,
                        "namaTryout": $stateParams.namaTryout,
                        "jenjang": $stateParams.jenjang,
                        "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
                        "namaKota": $stateParams.namaKota,
                        "namaProvinsi": $stateParams.namaProvinsi,
                        "semester": $stateParams.semester,
                        "tahunAjaran": $stateParams.tahunAjaran,
                        "idPelajaranTryout": pelajaran.idPelajaranTryout,
                        "idPelajaran": pelajaran.idPelajaran,
                        "pelajaran": pelajaran.pelajaran,
                        "statusFinish": snapshot.val().statusFinish,
                        "idJawabanOlimpiadeSiswaPerPelajaran": snapshot.key,
                        "idRekapJawabanOlimpiadeSiswa": $scope.idRekapJawabanOlimpiadeSiswa
                    });
                }

                else if (snapshot.val().statusFinish === false && snapshot.val().statusTerjawab === true && snapshot.val().tutupUjianSekarang === true) {
                    $state.go("menuSiswa.nilaiSOCSiswa", {
                        "idTryout": $stateParams.idTryout,
                        "namaTryout": $stateParams.namaTryout,
                        "jenjang": $stateParams.jenjang,
                        "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
                        "namaKota": $stateParams.namaKota,
                        "namaProvinsi": $stateParams.namaProvinsi,
                        "semester": $stateParams.semester,
                        "tahunAjaran": $stateParams.tahunAjaran,
                        "idPelajaranTryout": pelajaran.idPelajaranTryout,
                        "idPelajaran": pelajaran.idPelajaran,
                        "pelajaran": pelajaran.pelajaran,
                        "statusFinish": snapshot.val().statusFinish,
                        "idJawabanOlimpiadeSiswaPerPelajaran": snapshot.key,
                        "idRekapJawabanOlimpiadeSiswa": $scope.idRekapJawabanOlimpiadeSiswa
                    });
                }

                else {
                    // console.log(pelajaran);
                    // console.log("pelajaran", pelajaran.pelajaran);
                    // console.log("idPelajaranTryout", pelajaran.idPelajaranTryout);
                    Date.prototype.addMinutes = function (minutes) {
                        var copiedDate = new Date(this.getTime());
                        return new Date(copiedDate.getTime() + minutes * 60000);
                    }
                    var getDurasiUjian = firebase.database().ref("pengaturanUmumUjian").orderByChild("filter").equalTo($stateParams.idTryout + "_" + pelajaran.idPelajaranTryout);
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

                        var updatePerPelajaran = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran").orderByChild("filter").equalTo($stateParams.idTryout + "_" + pelajaran.idPelajaranTryout + "_" + $scope.uidSiswa);
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

                    var cekRekapJawaban = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.idRekapJawabanOlimpiadeSiswa + "/pelajaran").orderByChild("idPelajaranTryout").equalTo(pelajaran.idPelajaranTryout);
                    var listCekRekapJawaban = $firebaseArray(cekRekapJawaban);
                    listCekRekapJawaban.$loaded().then(function (response) {
                        // console.log("banyakData", response.length)
                        if (response.length === 0) {
                            var masukkanData = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.idRekapJawabanOlimpiadeSiswa + "/pelajaran");
                            masukkanData.push({
                                "idPelajaran": pelajaran.idPelajaran,
                                "idPelajaranTryout": pelajaran.idPelajaranTryout,
                                "pelajaran": pelajaran.pelajaran
                            }).then(function (resp) {
                                $state.go("olimpiadeOnlineSOCSiswa", {
                                    "idTryout": $stateParams.idTryout,
                                    "namaTryout": $stateParams.namaTryout,
                                    "jenjang": $stateParams.jenjang,
                                    "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
                                    "namaKota": $stateParams.namaKota,
                                    "namaProvinsi": $stateParams.namaProvinsi,
                                    "semester": $stateParams.semester,
                                    "tahunAjaran": $stateParams.tahunAjaran,
                                    "idPelajaranTryout": pelajaran.idPelajaranTryout,
                                    "idPelajaran": pelajaran.idPelajaran,
                                    "pelajaran": pelajaran.pelajaran,
                                    "statusFinish": snapshot.val().statusFinish,
                                    "idJawabanOlimpiadeSiswaPerPelajaran": snapshot.key,
                                    "idRekapJawabanOlimpiadeSiswa": $scope.idRekapJawabanOlimpiadeSiswa
                                });
                            })
                        }
                        else if (response.length === 1) {
                            $state.go("olimpiadeOnlineSOCSiswa", {
                                "idTryout": $stateParams.idTryout,
                                "namaTryout": $stateParams.namaTryout,
                                "jenjang": $stateParams.jenjang,
                                "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
                                "namaKota": $stateParams.namaKota,
                                "namaProvinsi": $stateParams.namaProvinsi,
                                "semester": $stateParams.semester,
                                "tahunAjaran": $stateParams.tahunAjaran,
                                "idPelajaranTryout": pelajaran.idPelajaranTryout,
                                "idPelajaran": pelajaran.idPelajaran,
                                "pelajaran": pelajaran.pelajaran,
                                "statusFinish": snapshot.val().statusFinish,
                                "idJawabanOlimpiadeSiswaPerPelajaran": snapshot.key,
                                "idRekapJawabanOlimpiadeSiswa": $scope.idRekapJawabanOlimpiadeSiswa
                            });
                        }
                        else if (response.length > 1) {
                            for (i = 0; i < response.length; i++) {
                                if (i > 0) {
                                    // console.log("hapus", i + "-" + response[i].idPelajaranTryout + "-" + response[i].$id);
                                    var obj = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.idRekapJawabanOlimpiadeSiswa + "/pelajaran/" + response[i].$id);
                                    var objDelete = $firebaseObject(obj);
                                    objDelete.$remove().then(function (ref) {
                                        console.log('Data Double Berhasil Dihapus');
                                        $state.go("olimpiadeOnlineSOCSiswa", {
                                            "idTryout": $stateParams.idTryout,
                                            "namaTryout": $stateParams.namaTryout,
                                            "jenjang": $stateParams.jenjang,
                                            "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
                                            "namaKota": $stateParams.namaKota,
                                            "namaProvinsi": $stateParams.namaProvinsi,
                                            "semester": $stateParams.semester,
                                            "tahunAjaran": $stateParams.tahunAjaran,
                                            "idPelajaranTryout": pelajaran.idPelajaranTryout,
                                            "idPelajaran": pelajaran.idPelajaran,
                                            "pelajaran": pelajaran.pelajaran,
                                            "statusFinish": snapshot.val().statusFinish,
                                            "idJawabanOlimpiadeSiswaPerPelajaran": snapshot.key,
                                            "idRekapJawabanOlimpiadeSiswa": $scope.idRekapJawabanOlimpiadeSiswa
                                        });
                                    });
                                }
                                else {
                                    // console.log("jangan hapus", i + "-" + response[i].idPelajaranTryout + "-" + response[i].$id)
                                }

                            }
                        }
                    })


                    // $state.go("olimpiadeOnline", {
                    //     "idTryout": $stateParams.idTryout,
                    //     "namaTryout": $stateParams.namaTryout,
                    //     "jenjang": $stateParams.jenjang,
                    //     "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
                    //     "namaKota": $stateParams.namaKota,
                    //     "namaProvinsi": $stateParams.namaProvinsi,
                    //     "semester": $stateParams.semester,
                    //     "tahunAjaran": $stateParams.tahunAjaran,
                    //     "idPelajaranTryout": pelajaran.idPelajaranTryout,
                    //     "idPelajaran": pelajaran.idPelajaran,
                    //     "pelajaran": pelajaran.pelajaran,
                    //     "statusFinish": snapshot.val().statusFinish,
                    //     "idJawabanOlimpiadeSiswaPerPelajaran": snapshot.key,
                    //     "idRekapJawabanOlimpiadeSiswa": $scope.idRekapJawabanOlimpiadeSiswa
                    // });


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

    .controller('nilaiSOCSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
        //console.log($scope.data);
        var refRekapNilai = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa);
        var dataRekap = $firebaseObject(refRekapNilai);
        // console.log("dataRekap", dataRekap);

        if ($scope.data.statusFinish === false) {
            //Pengaturan Umum Ujian
            var refPengaturanUmum = firebase.database().ref("pengaturanUmumUjian").orderByChild("filter").equalTo($stateParams.idTryout + "_" + $stateParams.idPelajaranTryout);
            refPengaturanUmum.on("child_added", function (snapshot) {
                $scope.soalAcak = snapshot.val().soalAcak;
                $scope.nilaiMaksimum = snapshot.val().nilaiMaksimum * 1;
                $scope.jumlahSoal = snapshot.val().jumlahSoal * 1;
                $scope.bobotNilai = snapshot.val().nilaiMaksimum * 1 / snapshot.val().jumlahSoal * 1;

            });

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
                var ref = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran/" + $scope.data.idJawabanOlimpiadeSiswaPerPelajaran);

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
            var ref = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran/" + $scope.data.idJawabanOlimpiadeSiswaPerPelajaran);
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
        var refRekapNilaiCek = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa + "/pelajaran").orderByChild("idPelajaranTryout").equalTo($scope.data.idPelajaranTryout);
        var dataRekapCek = $firebaseArray(refRekapNilaiCek);
        dataRekapCek.$loaded().then(function (response) {
            // console.log(response);
            // console.log("banyaknya nilai", response.length);
            if (response.length === 0) {
                console.log('lanjutkan')
                //Insert Data
                var insertData = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa + "/pelajaran");
                insertData.push({
                    "idPelajaran": $stateParams.idPelajaran,
                    "idPelajaranTryout": $stateParams.idPelajaranTryout,
                    "nilai": $scope.totalNilai,
                    "pelajaran": $stateParams.pelajaran
                })
            }
            else if (response.length === 1) {
                console.log('stopped');
                var updateNilai = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa + "/pelajaran/" + response[0].$id)
                updateNilai.update({
                    "nilai": $scope.totalNilai
                }).then(function (resp) {
                    console.log('updateNilaiBerhasil')
                })
            }
            else if (response.length > 1) {
                for (i = 0; i < response.length; i++) {
                    if (i > 0) {
                        console.log("hapus", i + "-" + response[i].idPelajaranTryout + "-" + response[i].$id);
                        var obj = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa + "/pelajaran/" + response[i].$id);
                        var objDelete = $firebaseObject(obj);
                        objDelete.$remove().then(function (ref) {
                            console.log('Data Double Berhasil Dihapus');
                        });
                    }
                    else {
                        console.log("jangan hapus", i + "-" + response[i].idPelajaranTryout + "-" + response[i].$id)
                    }

                }
            }
        })

        var avgNilai = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa + "/pelajaran");
        var listAvgNilai = $firebaseArray(avgNilai);

        $scope.nilaiTotal = 0;
        listAvgNilai.$loaded().then(function (response) {
            for (i = 0; i < response.length; i++) {
                var penilaian = response[i].nilai;
                $scope.nilaiTotal = $scope.nilaiTotal + penilaian;
                $scope.avg = $scope.nilaiTotal / response.length;
                // console.log("total Nilai", $scope.nilaiTotal);
                // console.log("avg", $scope.avg);
                var updateNilaiRata = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa);

                updateNilaiRata.update(JSON.parse(JSON.stringify({
                    "jumlahNilai": $scope.nilaiTotal,
                    "rataRata": $scope.avg,
                }))).then(function (resp) {
                    // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                });

            }

        });

    }])

    .controller('statusJawabanSOCSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "keterangan": $stateParams.keterangan,
            "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idPelajaranTryout": $stateParams.idPelajaranTryout,
            "pelajaran": $stateParams.pelajaran,
        };

        if ($scope.data.keterangan === "all" || $scope.data.keterangan === "Kosong") {
            var ref = firebase.database().ref("jawabanOlimpiadeSiswa").orderByChild("filter").equalTo($scope.data.idTryout + "_" + $scope.data.idPelajaranTryout + "_" + $scope.uidSiswa);
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }
        else if ($scope.data.keterangan === "Benar") {
            var ref = firebase.database().ref("jawabanOlimpiadeSiswa").orderByChild("filterStatusJawaban").equalTo($stateParams.idTryout + "_" + $stateParams.idPelajaranTryout + "_" + $scope.uidSiswa + "_Benar");
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }

        else if ($scope.data.keterangan === "Salah") {
            var ref = firebase.database().ref("jawabanOlimpiadeSiswa").orderByChild("filterStatusJawaban").equalTo($stateParams.idTryout + "_" + $stateParams.idPelajaranTryout + "_" + $scope.uidSiswa + "_Salah");
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }


        $scope.getSoal = function (jawaban) {
            //console.log(jawaban);

            var pembahasanSoal = firebase.database().ref("pengaturanUmumUjian").orderByChild("filter").equalTo($stateParams.idTryout + "_" + $stateParams.idPelajaranTryout);
            pembahasanSoal.on("child_added", function (snapshot) {

                if (snapshot.val().pembahasanSoalDibuka === true) {
                    $ionicModal.fromTemplateUrl('templates/modal.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }).then(function (modal) {
                        $scope.modal = modal;
                        $scope.modal.show();

                        var refSoal = firebase.database().ref("soal/" + jawaban.idSoal);
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