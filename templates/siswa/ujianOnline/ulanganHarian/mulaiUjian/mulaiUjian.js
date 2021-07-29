angular.module('app.mulaiUjianOnlineSiswa', [])

    .controller('mulaiUjianOnlineSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
        
        // LOADBALANCING
        if ($scope.idSekolahSiswa === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolahSiswa === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }



        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUjian": $stateParams.idUjian,
            "namaUjian": $stateParams.namaUjian,
            "jenjang": $stateParams.jenjang,
            "UjianOnlineTingkat": $stateParams.UjianOnlineTingkat,
            "namaKotaKabupaten": $stateParams.namaKotaKabupaten,
            "namaProvinsi": $stateParams.namaProvinsi,
            "idSemester": $stateParams.idSemester,
            "semester": $stateParams.semester,
            "idTahunAjaran": $stateParams.idTahunAjaran,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idRekapJawabanUjianOnlineSiswa": $stateParams.idRekapJawabanUjianOnlineSiswa,
            "namaSekolah": $stateParams.namaSekolah,
            "namaKelas": $stateParams.namaKelas,
            "namaGuru": $stateParams.namaGuru,
            "jenisUjian": $stateParams.jenisUjian,
            "tingkatKelas": $stateParams.tingkatKelas
        };

        var refPelajaran = firebase.database(app).ref("jawabanUjianOnlineSiswaPerPelajaran").orderByChild("filterMulaiUjian").equalTo($scope.data.idUjian + "_" + $scope.uidSiswa);
        var listRefPelajaran = $firebaseArray(refPelajaran);

        $ionicLoading.show();
        listRefPelajaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPelajaran = response;
        });

        var refRekapPelajaran = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa").orderByChild("filter").equalTo($scope.data.idUjian + "_" + $scope.uidSiswa);
        refRekapPelajaran.on("child_added", function (snapshot) {
            $scope.idRekapJawabanUjianOnlineSiswa = snapshot.key;
        });

        //Registrasi Peserta Ujian Online
        var dataSiswa = firebase.database(appSiswa).ref("dataSiswa/" + $scope.idPenggunaSiswa);
        dataSiswa.on("value", function (snapshot) {
            var data = snapshot.val();

            var refPesertaOlimpiade = firebase.database(app).ref("pesertaUjianOnline").orderByChild("filter").equalTo($scope.uidSiswa + "_" + $scope.data.idUjian);
            var listPesertaOlimpiade = $firebaseArray(refPesertaOlimpiade);
            $ionicLoading.show()
            listPesertaOlimpiade.$loaded().then(function (response) {
                if (response.length === 0) {
                    var refAdd = firebase.database(app).ref("pesertaUjianOnline");
                    // var addData = $firebaseArray(refAdd);
                    refAdd.push({
                        "idSiswa": $scope.idPenggunaSiswa,
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
                        "idKelas": data.idKelas,
                        "tingkatKelas": data.tingkatKelas,
                        "namaKecamatan": data.namaKecamatan,
                        "namaKelas": data.namaKelas,
                        "namaKotaKabupaten": data.namaKotaKabupaten,
                        "namaPengguna": data.namaPengguna,
                        "namaProvinsi": data.namaProvinsi,
                        "namaSekolah": data.namaSekolah,
                        "noHandphone": data.noHandphone,
                        "uid": data.uid,
                        "idSemester": $stateParams.idSemester,
                        "semester": $stateParams.semester,
                        "idTahunAjaran": $stateParams.idTahunAjaran,
                        "tahunAjaran": $stateParams.tahunAjaran,

                        "idUjian": $stateParams.idUjian,
                        "namaUjian": $stateParams.namaUjian,
                        "filter": data.uid + "_" + $scope.data.idUjian
                    }).then(function (resp) {
                        // console.log("pesertaUjianOnlineeSuccess")
                        //Menambahkan Table Rekap Jawaban Olimpiade Siswa
                        var tambahData = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa");
                        tambahData.push({
                            "idUjian": $stateParams.idUjian,
                            "namaUjian": $stateParams.namaUjian,
                            "jenjang": $stateParams.jenjang,
                            "namaKotaKabupaten": $stateParams.namaKotaKabupaten,
                            "namaProvinsi": $stateParams.namaProvinsi,
                            "idSemester": $stateParams.idSemester,
                            "semester": $stateParams.semester,
                            "idTahunAjaran": $stateParams.idTahunAjaran,
                            "tahunAjaran": $stateParams.tahunAjaran,

                            "idPengguna": $scope.idPenggunaSiswa,
                            "namaPengguna": data.namaPengguna,
                            "uid": data.uid,
                            "idSekolah": data.idSekolah,
                            "idKecamatan": data.idKecamatan,
                            "idKotaKabupaten": data.idKotaKabupaten,
                            "idProvinsi": data.idProvinsi,
                            "namaSekolah": data.namaSekolah,
                            "idKelas": data.idKelas,
                            "namaKelas": $stateParams.namaKelas,
                            "tingkatKelas": data.tingkatKelas,

                            "pelajaran": "",
                            "filter": $stateParams.idUjian + "_" + data.uid,
                            "jumlahNilai": 0,
                            "rataRata": 0
                        }).then(function (resp) {
                            $ionicLoading.hide()
                            // console.log("success Rekap");
                            //Tambahkan data ke tabel Jawaban Olimpiade Peserta PerPelajaran
                            var addData = firebase.database(app).ref("pengaturanUmumUjianOnline").orderByChild("idUjian").equalTo($scope.data.idUjian);
                            var listAddData = $firebaseArray(addData);
                            $ionicLoading.show();
                            listAddData.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {

                                    var tambahData = firebase.database(app).ref("jawabanUjianOnlineSiswaPerPelajaran");
                                    tambahData.push({
                                        "idUjian": $stateParams.idUjian,
                                        "namaUjian": $stateParams.namaUjian,
                                        "jenjang": $stateParams.jenjang,
                                        "namaKotaKabupaten": $stateParams.namaKotaKabupaten,
                                        "namaProvinsi": $stateParams.namaProvinsi,
                                        "idSemester": $stateParams.idSemester,
                                        "semester": $stateParams.semester,
                                        "idTahunAjaran": $stateParams.idTahunAjaran,
                                        "tahunAjaran": $stateParams.tahunAjaran,
                                        "idPelajaranUjianOnline": response[i].idPelajaranUjianOnline,
                                        "idPelajaran": response[i].idPelajaran,
                                        "pelajaran": response[i].pelajaran,

                                        "idPengguna": $scope.idPenggunaSiswa,
                                        "namaPengguna": data.namaPengguna,
                                        "uid": data.uid,
                                        "idSekolah": data.idSekolah,
                                        "namaSekolah": data.namaSekolah,
                                        "idKelas": data.idKelas,
                                        "namaKelas": $stateParams.namaKelas,

                                        "benar": 0,
                                        "salah": 0,
                                        "kosong": 0,
                                        "nilai": 0,
                                        "statusFinish": false,
                                        "bukaUjianSekarang": response[i].bukaUjianSekarang,
                                        "tutupUjianSekarang": response[i].tutupUjianSekarang,
                                        "jumlahSoal": 0,
                                        "statusTerjawab": false,

                                        "filter": $stateParams.idUjian + "_" + response[i].idPelajaranUjianOnline + "_" + data.uid,
                                        "filterMulaiUjian": $stateParams.idUjian + "_" + data.uid,

                                        "jamDiMulai": "",
                                        "jamBerakhir": "",
                                        "jamSelesai": "",
                                        "jamDurasiUjian": "",

                                    }).then(function (resp) {
                                        $ionicLoading.hide()
                                        // console.log("successjawabanUjianSiswaPerPelajaran");
                                        var updateDataSiswa = firebase.database(appSiswa).ref("dataSiswa/" + data.$id);
                                        updateDataSiswa.update(JSON.parse(JSON.stringify({
                                            "registrasiUjianOnline": $scope.data.idUjian
                                        }))).then(function (resp) {
                                            // console.log("dataSiswaDiUpdate")
                                        })
                                    })

                                }
                            });
                        });
                    });
                }
                else {
                    $ionicLoading.hide()
                    // console.log("dataSiswaSudahDiRegistrasi")

                }
            });

        })

        $scope.ujianOnline = function (pelajaran) {
            // console.log(pelajaran);
            var cek = firebase.database(app).ref("jawabanUjianOnlineSiswaPerPelajaran").orderByChild("filter").equalTo($stateParams.idUjian + "_" + pelajaran.idPelajaranUjianOnline + "_" + $scope.uidSiswa);
            cek.on("child_added", function (snapshot) {

                if (snapshot.val().statusFinish === true) {
                    $state.go("menuSiswa.nilaiUjianOnlineSiswa", {
                        "idUjian": $stateParams.idUjian,
                        "namaUjian": $stateParams.namaUjian,
                        "jenjang": $stateParams.jenjang,
                        "UjianOnlineTingkat": $stateParams.UjianOnlineTingkat,
                        "namaKotaKabupaten": $stateParams.namaKotaKabupaten,
                        "namaProvinsi": $stateParams.namaProvinsi,
                        "semester": $stateParams.semester,
                        "tahunAjaran": $stateParams.tahunAjaran,
                        "idPelajaranUjianOnline": pelajaran.idPelajaranUjianOnline,
                        "idPelajaran": pelajaran.idPelajaran,
                        "pelajaran": pelajaran.pelajaran,
                        "statusFinish": snapshot.val().statusFinish,
                        "idJawabanUjianOnlineSiswaPerPelajaran": snapshot.key,
                        "idRekapJawabanUjianOnlineSiswa": $scope.idRekapJawabanUjianOnlineSiswa
                    });
                }

                else if (snapshot.val().statusFinish === false && snapshot.val().statusTerjawab === true && snapshot.val().tutupUjianSekarang === true) {
                    $state.go("menuSiswa.nilaiUjianOnlineSiswa", {
                        "idUjian": $stateParams.idUjian,
                        "namaUjian": $stateParams.namaUjian,
                        "jenjang": $stateParams.jenjang,
                        "UjianOnlineTingkat": $stateParams.UjianOnlineTingkat,
                        "namaKotaKabupaten": $stateParams.namaKotaKabupaten,
                        "namaProvinsi": $stateParams.namaProvinsi,
                        "semester": $stateParams.semester,
                        "tahunAjaran": $stateParams.tahunAjaran,
                        "idPelajaranUjianOnline": pelajaran.idPelajaranUjianOnline,
                        "idPelajaran": pelajaran.idPelajaran,
                        "pelajaran": pelajaran.pelajaran,
                        "statusFinish": snapshot.val().statusFinish,
                        "idJawabanUjianOnlineSiswaPerPelajaran": snapshot.key,
                        "idRekapJawabanUjianOnlineSiswa": $scope.idRekapJawabanUjianOnlineSiswa
                    });
                }

                else {
                    // console.log(pelajaran);
                    // console.log("pelajaran", pelajaran.pelajaran);
                    // console.log("idPelajaranUjianOnline", pelajaran.idPelajaranUjianOnline);
                    Date.prototype.addMinutes = function (minutes) {
                        var copiedDate = new Date(this.getTime());
                        return new Date(copiedDate.getTime() + minutes * 60000);
                    }
                    var getDurasiUjian = firebase.database(app).ref("pengaturanUmumUjianOnline").orderByChild("filter").equalTo($stateParams.idUjian + "_" + pelajaran.idPelajaranUjianOnline);
                    getDurasiUjian.on("child_added", function (snapshot) {
                        $scope.durasiUjianUjianOnline = snapshot.val().durasiUjian;
                        //console.log("dataDurasi", $scope.durasiUjianUjianOnline)
                        $scope.now = new Date();
                        $scope.newNow = $scope.now.addMinutes($scope.durasiUjianUjianOnline);
                        var difference = $scope.newNow.getTime() - $scope.now.getTime(); // This will give difference in milliseconds
                        var resultInMinutes = Math.round(difference / 60000);
                        // console.log("jam Sekarang : ", $scope.now);
                        // console.log("berakhir di Jam : ", $scope.newNow);
                        // console.log("totalMenitnya: ", resultInMinutes);

                        var updatePerPelajaran = firebase.database(app).ref("jawabanUjianOnlineSiswaPerPelajaran").orderByChild("filter").equalTo($stateParams.idUjian + "_" + pelajaran.idPelajaranUjianOnline + "_" + $scope.uidSiswa);
                        updatePerPelajaran.on("child_added", function (snapshot) {
                            //console.log(snapshot.val());
                            if (snapshot.val().jamDiMulai === "") {
                                var datanyaUpdate = firebase.database(app).ref("jawabanUjianOnlineSiswaPerPelajaran/" + snapshot.key);
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

                    var cekRekapJawaban = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.idRekapJawabanUjianOnlineSiswa + "/pelajaran").orderByChild("idPelajaranUjianOnline").equalTo(pelajaran.idPelajaranUjianOnline);
                    var listCekRekapJawaban = $firebaseArray(cekRekapJawaban);
                    listCekRekapJawaban.$loaded().then(function (response) {
                        // console.log("banyakData", response.length)
                        if (response.length === 0) {
                            var masukkanData = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.idRekapJawabanUjianOnlineSiswa + "/pelajaran");
                            masukkanData.push({
                                "idPelajaran": pelajaran.idPelajaran,
                                "idPelajaranUjianOnline": pelajaran.idPelajaranUjianOnline,
                                "pelajaran": pelajaran.pelajaran
                            }).then(function (resp) {
                                $state.go("ujianOnlineSiswa", {
                                    "idUjian": $stateParams.idUjian,
                                    "namaUjian": $stateParams.namaUjian,
                                    "jenjang": $stateParams.jenjang,
                                    "UjianOnlineTingkat": $stateParams.UjianOnlineTingkat,
                                    "namaKotaKabupaten": $stateParams.namaKotaKabupaten,
                                    "namaProvinsi": $stateParams.namaProvinsi,
                                    "semester": $stateParams.semester,
                                    "tahunAjaran": $stateParams.tahunAjaran,
                                    "idPelajaranUjianOnline": pelajaran.idPelajaranUjianOnline,
                                    "idPelajaran": pelajaran.idPelajaran,
                                    "pelajaran": pelajaran.pelajaran,
                                    "statusFinish": snapshot.val().statusFinish,
                                    "idJawabanUjianOnlineSiswaPerPelajaran": snapshot.key,
                                    "idRekapJawabanUjianOnlineSiswa": $scope.idRekapJawabanUjianOnlineSiswa
                                });
                            })
                        }
                        else if (response.length === 1) {
                            $state.go("ujianOnlineSiswa", {
                                "idUjian": $stateParams.idUjian,
                                "namaUjian": $stateParams.namaUjian,
                                "jenjang": $stateParams.jenjang,
                                "UjianOnlineTingkat": $stateParams.UjianOnlineTingkat,
                                "namaKotaKabupaten": $stateParams.namaKotaKabupaten,
                                "namaProvinsi": $stateParams.namaProvinsi,
                                "semester": $stateParams.semester,
                                "tahunAjaran": $stateParams.tahunAjaran,
                                "idPelajaranUjianOnline": pelajaran.idPelajaranUjianOnline,
                                "idPelajaran": pelajaran.idPelajaran,
                                "pelajaran": pelajaran.pelajaran,
                                "statusFinish": snapshot.val().statusFinish,
                                "idJawabanUjianOnlineSiswaPerPelajaran": snapshot.key,
                                "idRekapJawabanUjianOnlineSiswa": $scope.idRekapJawabanUjianOnlineSiswa
                            });
                        }
                        else if (response.length > 1) {
                            for (i = 0; i < response.length; i++) {
                                if (i > 0) {
                                    // console.log("hapus", i + "-" + response[i].idPelajaranUjianOnline + "-" + response[i].$id);
                                    var obj = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.idRekapJawabanUjianOnlineSiswa + "/pelajaran/" + response[i].$id);
                                    var objDelete = $firebaseObject(obj);
                                    objDelete.$remove().then(function (ref) {
                                        console.log('Data Double Berhasil Dihapus');
                                        $state.go("ujianOnlineSiswa", {
                                            "idUjian": $stateParams.idUjian,
                                            "namaUjian": $stateParams.namaUjian,
                                            "jenjang": $stateParams.jenjang,
                                            "UjianOnlineTingkat": $stateParams.UjianOnlineTingkat,
                                            "namaKotaKabupaten": $stateParams.namaKotaKabupaten,
                                            "namaProvinsi": $stateParams.namaProvinsi,
                                            "semester": $stateParams.semester,
                                            "tahunAjaran": $stateParams.tahunAjaran,
                                            "idPelajaranUjianOnline": pelajaran.idPelajaranUjianOnline,
                                            "idPelajaran": pelajaran.idPelajaran,
                                            "pelajaran": pelajaran.pelajaran,
                                            "statusFinish": snapshot.val().statusFinish,
                                            "idJawabanUjianOnlineSiswaPerPelajaran": snapshot.key,
                                            "idRekapJawabanUjianOnlineSiswa": $scope.idRekapJawabanUjianOnlineSiswa
                                        });
                                    });
                                }
                                else {
                                    // console.log("jangan hapus", i + "-" + response[i].idPelajaranUjianOnline + "-" + response[i].$id)
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

    .controller('nilaiUjianOnlineSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

       
        // LOADBALANCING
        if ($scope.idSekolahSiswa === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolahSiswa === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }


        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUjian": $stateParams.idUjian,
            "namaUjian": $stateParams.namaUjian,
            "jenjang": $stateParams.jenjang,
            "UjianOnlineTingkat": $stateParams.UjianOnlineTingkat,
            "namaKotaKabupaten": $stateParams.namaKotaKabupaten,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idPelajaranUjianOnline": $stateParams.idPelajaranUjianOnline,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran,
            "statusFinish": $stateParams.statusFinish,
            "idJawabanUjianOnlineSiswaPerPelajaran": $stateParams.idJawabanUjianOnlineSiswaPerPelajaran,
            "idRekapJawabanUjianOnlineSiswa": $stateParams.idRekapJawabanUjianOnlineSiswa
        };
        // console.log($scope.data);
        var refRekapNilai = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanUjianOnlineSiswa);
        var dataRekap = $firebaseObject(refRekapNilai);
        // console.log("dataRekap", dataRekap);

        if ($scope.data.statusFinish === false) {
            //Pengaturan Umum Ujian
            var refPengaturanUmum = firebase.database(app).ref("pengaturanUmumUjian").orderByChild("filter").equalTo($stateParams.idUjian + "_" + $stateParams.idPelajaranUjianOnline);
            refPengaturanUmum.on("child_added", function (snapshot) {
                $scope.soalAcak = snapshot.val().soalAcak;
                $scope.nilaiMaksimum = snapshot.val().nilaiMaksimum * 1;
                $scope.jumlahSoal = snapshot.val().jumlahSoal * 1;
                $scope.bobotNilai = snapshot.val().nilaiMaksimum * 1 / snapshot.val().jumlahSoal * 1;

            });

            //Menghitung Nilai Per Pelajaran
            var hitungNilai = firebase.database(app).ref("jawabanUjianOnlineSiswa").orderByChild("filter").equalTo($stateParams.idUjian + "_" + $stateParams.idPelajaranUjianOnline + "_" + $scope.uidSiswa);
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
                var ref = firebase.database(app).ref("jawabanUjianOnlineSiswaPerPelajaran/" + $scope.data.idJawabanUjianOnlineSiswaPerPelajaran);

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
            var ref = firebase.database(app).ref("jawabanUjianOnlineSiswaPerPelajaran/" + $scope.data.idJawabanUjianOnlineSiswaPerPelajaran);
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
        var refRekapNilaiCek = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanUjianOnlineSiswa + "/pelajaran").orderByChild("idPelajaranUjianOnline").equalTo($scope.data.idPelajaranUjianOnline);
        var dataRekapCek = $firebaseArray(refRekapNilaiCek);
        dataRekapCek.$loaded().then(function (response) {
            // console.log(response);
            // console.log("banyaknya nilai", response.length);
            if (response.length === 0) {
                console.log('lanjutkan')
                //Insert Data
                var insertData = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanUjianOnlineSiswa + "/pelajaran");
                insertData.push({
                    "idPelajaran": $stateParams.idPelajaran,
                    "idPelajaranUjianOnline": $stateParams.idPelajaranUjianOnline,
                    "nilai": $scope.totalNilai,
                    "pelajaran": $stateParams.pelajaran
                })
            }
            else if (response.length === 1) {
                console.log('stopped');
                var updateNilai = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanUjianOnlineSiswa + "/pelajaran/" + response[0].$id)
                updateNilai.update({
                    "nilai": $scope.totalNilai
                }).then(function (resp) {
                    console.log('updateNilaiBerhasil')
                })
            }
            else if (response.length > 1) {
                for (i = 0; i < response.length; i++) {
                    if (i > 0) {
                        console.log("hapus", i + "-" + response[i].idPelajaranUjianOnline + "-" + response[i].$id);
                        var obj = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanUjianOnlineSiswa + "/pelajaran/" + response[i].$id);
                        var objDelete = $firebaseObject(obj);
                        objDelete.$remove().then(function (ref) {
                            console.log('Data Double Berhasil Dihapus');
                        });
                    }
                    else {
                        console.log("jangan hapus", i + "-" + response[i].idPelajaranUjianOnline + "-" + response[i].$id)
                    }

                }
            }
        })

        var avgNilai = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanUjianOnlineSiswa + "/pelajaran");
        var listAvgNilai = $firebaseArray(avgNilai);

        $scope.nilaiTotal = 0;
        listAvgNilai.$loaded().then(function (response) {
            for (i = 0; i < response.length; i++) {
                var penilaian = response[i].nilai;
                $scope.nilaiTotal = $scope.nilaiTotal + penilaian;
                $scope.avg = $scope.nilaiTotal / response.length;
                // console.log("total Nilai", $scope.nilaiTotal);
                // console.log("avg", $scope.avg);
                var updateNilaiRata = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanUjianOnlineSiswa);

                updateNilaiRata.update(JSON.parse(JSON.stringify({
                    "jumlahNilai": $scope.nilaiTotal,
                    "rataRata": $scope.avg,
                }))).then(function (resp) {
                    // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                });

            }

        });

    }])

    .controller('statusJawabanUjianOnlineSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

          // LOADBALANCING
          if ($scope.idSekolahSiswa === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
          else if ($scope.idSekolahSiswa === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }


        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUjian": $stateParams.idUjian,
            "namaUjian": $stateParams.namaUjian,
            "keterangan": $stateParams.keterangan,
            "UjianOnlineTingkat": $stateParams.UjianOnlineTingkat,
            "namaKotaKabupatenKabupaten": $stateParams.namaKotaKabupaten,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idPelajaranUjianOnline": $stateParams.idPelajaranUjianOnline,
            "pelajaran": $stateParams.pelajaran,
        };
        // console.log($scope.data);

        if ($scope.data.keterangan === "all" || $scope.data.keterangan === "Kosong") {
            var ref = firebase.database(app).ref("jawabanUjianOnlineSiswa").orderByChild("filter").equalTo($scope.data.idUjian + "_" + $scope.data.idPelajaranUjianOnline + "_" + $scope.uidSiswa);
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }
        else if ($scope.data.keterangan === "Benar") {
            var ref = firebase.database(app).ref("jawabanUjianOnlineSiswa").orderByChild("filterStatusJawaban").equalTo($stateParams.idUjian + "_" + $stateParams.idPelajaranUjianOnline + "_" + $scope.uidSiswa + "_Benar");
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }

        else if ($scope.data.keterangan === "Salah") {
            var ref = firebase.database(app).ref("jawabanUjianOnlineSiswa").orderByChild("filterStatusJawaban").equalTo($stateParams.idUjian + "_" + $stateParams.idPelajaranUjianOnline + "_" + $scope.uidSiswa + "_Salah");
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }


        $scope.getSoal = function (jawaban) {
            //console.log(jawaban);

            var pembahasanSoal = firebase.database(app).ref("pengaturanUmumUjianOnline").orderByChild("filter").equalTo($stateParams.idUjian + "_" + $stateParams.idPelajaranUjianOnline);
            pembahasanSoal.on("child_added", function (snapshot) {

                if (snapshot.val().pembahasanSoalDibuka === true) {
                    $ionicModal.fromTemplateUrl('templates/modal.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }).then(function (modal) {
                        $scope.modal = modal;
                        $scope.modal.show();

                        var refSoal = firebase.database(appSiswa).ref("soal/" + jawaban.idSoal);
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