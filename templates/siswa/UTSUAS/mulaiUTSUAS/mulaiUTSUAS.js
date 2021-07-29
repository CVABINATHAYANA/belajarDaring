angular.module('app.mulaiUTSUASSiswa', [])

    .controller('mulaiUTSUASSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa')
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')
        
        // LOADBALANCING
        if ($scope.idSekolahSiswa === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolahSiswa === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }

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
            "idRekapJawabanUTSUASSiswa": $stateParams.idRekapJawabanUTSUASSiswa,
            "idKelas": $stateParams.idKelas,
            "siswauid": $stateParams.siswauid,
        };
        console.log('IdUTSUAS'+$scope.data.idUTSUAS);
        console.log("idKelas "+$scope.data.idKelas);
        console.log("uid "+$scope.data.siswauid);

        // CEK STATUS

        var cekstatus = firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        cekstatus.on("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot){
                var data = childSnapshot.val();
                console.log(data);
                console.log(data.idPelajaran);
                var setstatus = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid ).orderByChild("idPelajaran").equalTo(data.idPelajaran);
                var listsetstatus = $firebaseArray(setstatus);
                listsetstatus.$loaded().then(function (response) {
                    console.log(response[0].$id);
                if (data.bukaUjianSekarang === true && data.tutupUjianSekarang === false) {
                    var setstatus1 = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid + '/' + response[0].$id);
                    console.log(setstatus);
                    setstatus1.update(JSON.parse(JSON.stringify({
                        "bukaUjianSekarang": true,
                        "tutupUjianSekarang": false,
                    }))).then(function (resp) {
                        console.log("Sukses update STATUS True")
                    })
    
                }
                else if (data.bukaUjianSekarang === false && data.tutupUjianSekarang === true) {
                    var setstatus2 = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid + '/' + response[0].$id);
                    setstatus2.update(JSON.parse(JSON.stringify({
                        "bukaUjianSekarang": false,
                        "tutupUjianSekarang": true,
                    }))).then(function (resp) {
                        console.log("Sukses update STATUS False")
                    })
                }
                })
                
            
    
            });

        })


        // firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS).on('value', function (snapshot) {
        //     values = snapshot.val();
        //     console.log(values);
        //     console.log(values.key);
        //     $.each(values, function (values) {
        //         if (values) {
        //             console.log(values.bukaUjianSekarang);
        //         }
        //     });
        // });
        // $scope.theTime = new Date().toLocaleTimeString();
        // $interval(function () {
        //     $scope.theTime = new Date().toLocaleTimeString();
        //     console.log($scope.theTime);
        //     if($scope.theTime>="11:22:40 PM"){
        //         $scope.theTime = "00:00:00 PM";
        //         console.log($scope.theTime);
        //     }
        // }, 1000);

        console.log('CEK 1');
        console.log('IdUTSUAS'+$scope.data.idUTSUAS);
        console.log("idKelas "+$scope.data.idKelas);
        console.log("uid "+$scope.data.siswauid);
        var refPelajaran = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid).orderByChild("filterMulaiUjian").equalTo($scope.data.idUTSUAS + "_" + $scope.uidSiswa);
        var listRefPelajaran = $firebaseArray(refPelajaran);

        $ionicLoading.show();
        listRefPelajaran.$loaded().then(function (response) {
            console.log(response.length)
            $ionicLoading.hide();
            $scope.dataPelajaran = response;
            if (response.length === 0 && $scope.data.idUTSUAS !== '') {
                //Tambahkan data ke tabel Jawaban UTS/UAS Peserta PerPelajaran
                var addData = firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
                var listAddData = $firebaseArray(addData);

                listAddData.$loaded().then(function (response) {
                    console.log(response)
                    for (i = 0; i < response.length; i++) {

                        console.log('CEK 2');
                        console.log('IdUTSUAS'+$scope.data.idUTSUAS);
                        console.log("idKelas "+$scope.data.idKelas);
                        console.log("uid "+$scope.data.siswauid);
                        var tambahData = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid);
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

                            "idPengguna": $scope.idPenggunaSiswa,
                            "namaPengguna": $scope.namaPenggunaSiswa,
                            "uid": $scope.uidSiswa,
                            "idSekolah": $scope.idSekolahSiswa,

                            "benar": 0,
                            "salah": 0,
                            "kosong": 0,
                            "nilai": 0,
                            "statusFinish": false,
                            "bukaUjianSekarang": response[i].bukaUjianSekarang,
                            "tutupUjianSekarang": response[i].tutupUjianSekarang,
                            "jumlahSoal": 0,
                            "statusTerjawab": false,

                            "filter": $stateParams.idUTSUAS + "_" + response[i].idPelajaranUTSUAS + "_" + $scope.uidSiswa,
                            "filterMulaiUjian": $stateParams.idUTSUAS + "_" + $scope.uidSiswa,

                            "jamDiMulai": "",
                            "jamBerakhir": "",
                            "jamSelesai": "",
                            "jamDurasiUjian": "",

                        }).then(function (resp) {
                            $ionicLoading.hide();
                            console.log("successjawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid);
                            var updateDataSiswa = firebase.database(appSiswa).ref("dataSiswa/" + $scope.uidSiswa);
                            updateDataSiswa.update(JSON.parse(JSON.stringify({
                                "registrasiUTSUAS": $scope.data.idUTSUAS
                            }))).then(function (resp) {
                                console.log("dataSiswaDiUpdate")
                            })

                        })

                    }
                });
            }
        });



        var refRekapPelajaran = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idUTSUAS).orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.uidSiswa);
        refRekapPelajaran.on("child_added", function (snapshot) {
            $scope.idRekapJawabanUTSUASSiswa = snapshot.key;
            // console.log(snapshot.val())
            //console.log("ID nya", $scope.idRekapJawabanUTSUASSiswa);
        });

        $scope.UTSUASOnline = function (pelajaran) {
            console.log('TES MULAI UJIAN');

            var cek = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid).orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + pelajaran.idPelajaranUTSUAS + "_" + $scope.uidSiswa);
            var listCek = $firebaseArray(cek);
            $ionicLoading.show();
            listCek.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.statusFinishUjian = response[0].statusFinish;
                $scope.idJawabanUTSUASSiswaPerPelajaran = response[0].$id;
                console.log($scope.idJawabanUTSUASSiswaPerPelajaran)

                if ($scope.statusFinishUjian === true) {
                    var dataUTSUAS = firebase.database(app).ref("namaUTSUAS/" + $scope.data.idUTSUAS);
                    dataUTSUAS.on("value", function (snapshot) {
                        if (snapshot.val().nilaiDitampilkan === true) {
                            console.log('TES PEPES'+$scope.data.siswauid);
                            $state.go("menuSiswa.nilaiUTSUASSiswa", {
                                "idUTSUAS": $stateParams.idUTSUAS,
                                "namaUTSUAS": $stateParams.namaUTSUAS,
                                "jenjang": $stateParams.jenjang,
                                "utsUasTingkat": $stateParams.utsUasTingkat,
                                "namaKota": $stateParams.namaKota,
                                "namaProvinsi": $stateParams.namaProvinsi,
                                "semester": $stateParams.semester,
                                "tahunAjaran": $stateParams.tahunAjaran,
                                "idPelajaranUTSUAS": pelajaran.idPelajaranUTSUAS,
                                "idPelajaran": pelajaran.idPelajaran,
                                "pelajaran": pelajaran.pelajaran,
                                "statusFinish": $scope.statusFinishUjian,
                                "idJawabanUTSUASSiswaPerPelajaran": response[0].$id,
                                "idRekapJawabanUTSUASSiswa": $scope.idRekapJawabanUTSUASSiswa,
                                "idKelas" :$scope.data.idKelas,
                                "siswauid ":$scope.data.siswauid,
                            });
                        }
                        else if (snapshot.val().nilaiDitampilkan === false) {
                            $ionicPopup.alert({
                                title: 'PERHATIAN',
                                template: 'Maaf, nilai tidak ditampilkan untuk ujian ini, terimakasih',
                                okType: 'button-positive'
                            });
                        }
                    })

                }

                else if ($scope.statusFinishUjian === false && response[0].statusTerjawab === true && response[0].tutupUjianSekarang === true) {
                    var dataUTSUAS = firebase.database(app).ref("namaUTSUAS/" + $scope.data.idUTSUAS);
                    dataUTSUAS.on("value", function (snapshot) {
                        if (snapshot.val().nilaiDitampilkan === true) {
                            console.log('TES PEPES'+$scope.data.siswauid);
                            $state.go("menuSiswa.nilaiUTSUASSiswa", {
                                "idUTSUAS": $stateParams.idUTSUAS,
                                "namaUTSUAS": $stateParams.namaUTSUAS,
                                "jenjang": $stateParams.jenjang,
                                "utsUasTingkat": $stateParams.utsUasTingkat,
                                "namaKota": $stateParams.namaKota,
                                "namaProvinsi": $stateParams.namaProvinsi,
                                "semester": $stateParams.semester,
                                "tahunAjaran": $stateParams.tahunAjaran,
                                "idPelajaranUTSUAS": pelajaran.idPelajaranUTSUAS,
                                "idPelajaran": pelajaran.idPelajaran,
                                "pelajaran": pelajaran.pelajaran,
                                "statusFinish": $scope.statusFinishUjian,
                                "idJawabanUTSUASSiswaPerPelajaran": response[0].$id,
                                "idRekapJawabanUTSUASSiswa": $scope.idRekapJawabanUTSUASSiswa,
                                "idKelas" :$scope.data.idKelas,
                                "siswauid":$scope.data.siswauid,
                            });
                        }
                        else if (snapshot.val().nilaiDitampilkan === false) {
                            $ionicPopup.alert({
                                title: 'PERHATIAN',
                                template: 'Maaf, nilai tidak ditampilkan untuk ujian ini, terimakasih',
                                okType: 'button-positive'
                            });
                        }
                    })
                }

                else {
                    // console.log(pelajaran);
                    // console.log("pelajaran", pelajaran.pelajaran);
                    // console.log("idPelajaranUTSUAS", pelajaran.idPelajaranUTSUAS);
                    Date.prototype.addMinutes = function (minutes) {
                        var copiedDate = new Date(this.getTime());
                        return new Date(copiedDate.getTime() + minutes * 60000);
                    }
                    var getDurasiUjian = firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + pelajaran.idPelajaranUTSUAS);
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

                        var updatePerPelajaran = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid).orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + pelajaran.idPelajaranUTSUAS + "_" + $scope.uidSiswa);
                        updatePerPelajaran.on("child_added", function (snapshot) {
                            //console.log(snapshot.val());
                            if (snapshot.val().jamDiMulai === "") {
                                var datanyaUpdate = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.data.siswauid+ '/' + snapshot.key);
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

                    var cekRekapJawaban = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idUTSUAS+ '/' + $scope.idRekapJawabanUTSUASSiswa + "/pelajaran").orderByChild("idPelajaranUTSUAS").equalTo(pelajaran.idPelajaranUTSUAS);
                    var listCekRekapJawaban = $firebaseArray(cekRekapJawaban);
                    listCekRekapJawaban.$loaded().then(function (response) {
                        console.log("banyakData", response.length)
                        if (response.length === 0) {
                            var masukkanData = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idUTSUAS+ '/' + $scope.idRekapJawabanUTSUASSiswa + "/pelajaran");
                            masukkanData.push({
                                "idPelajaran": pelajaran.idPelajaran,
                                "idPelajaranUTSUAS": pelajaran.idPelajaranUTSUAS,
                                "pelajaran": pelajaran.pelajaran
                            }).then(function (resp) {
                                $state.go("UTSUASOnlineSiswa", {
                                    "idUTSUAS": $stateParams.idUTSUAS,
                                    "namaUTSUAS": $stateParams.namaUTSUAS,
                                    "jenjang": $stateParams.jenjang,
                                    "utsUasTingkat": $stateParams.utsUasTingkat,
                                    "namaKota": $stateParams.namaKota,
                                    "namaProvinsi": $stateParams.namaProvinsi,
                                    "semester": $stateParams.semester,
                                    "tahunAjaran": $stateParams.tahunAjaran,
                                    "idPelajaranUTSUAS": pelajaran.idPelajaranUTSUAS,
                                    "idPelajaran": pelajaran.idPelajaran,
                                    "pelajaran": pelajaran.pelajaran,
                                    "statusFinish": response[0].statusFinish,
                                    "idJawabanUTSUASSiswaPerPelajaran": $scope.idJawabanUTSUASSiswaPerPelajaran,
                                    "idRekapJawabanUTSUASSiswa": $scope.idRekapJawabanUTSUASSiswa,
                                    "idKelas": $stateParams.idKelas,
                                    "siswauid": $stateParams.siswauid,
                                });
                            })
                        }
                        else if (response.length === 1) {
                            $state.go("UTSUASOnlineSiswa", {
                                "idUTSUAS": $stateParams.idUTSUAS,
                                "namaUTSUAS": $stateParams.namaUTSUAS,
                                "jenjang": $stateParams.jenjang,
                                "utsUasTingkat": $stateParams.utsUasTingkat,
                                "namaKota": $stateParams.namaKota,
                                "namaProvinsi": $stateParams.namaProvinsi,
                                "semester": $stateParams.semester,
                                "tahunAjaran": $stateParams.tahunAjaran,
                                "idPelajaranUTSUAS": pelajaran.idPelajaranUTSUAS,
                                "idPelajaran": pelajaran.idPelajaran,
                                "pelajaran": pelajaran.pelajaran,
                                "statusFinish": response[0].statusFinish,
                                "idJawabanUTSUASSiswaPerPelajaran": $scope.idJawabanUTSUASSiswaPerPelajaran,
                                "idRekapJawabanUTSUASSiswa": $scope.idRekapJawabanUTSUASSiswa,
                                "idKelas": $stateParams.idKelas,
                                "siswauid": $stateParams.siswauid,
                            });
                        }
                        else if (response.length > 1) {
                            for (i = 0; i < response.length; i++) {
                                if (i > 0) {
                                    // console.log("hapus", i + "-" + response[i].idPelajaranUTSUAS + "-" + response[i].$id);
                                    var obj = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idUTSUAS+ '/' + $scope.idRekapJawabanUTSUASSiswa + "/pelajaran/" + response[i].$id);
                                    var objDelete = $firebaseObject(obj);
                                    objDelete.$remove().then(function (ref) {
                                        console.log('Data Double Berhasil Dihapus');
                                        $state.go("UTSUASOnlineSiswa", {
                                            "idUTSUAS": $stateParams.idUTSUAS,
                                            "namaUTSUAS": $stateParams.namaUTSUAS,
                                            "jenjang": $stateParams.jenjang,
                                            "utsUasTingkat": $stateParams.utsUasTingkat,
                                            "namaKota": $stateParams.namaKota,
                                            "namaProvinsi": $stateParams.namaProvinsi,
                                            "semester": $stateParams.semester,
                                            "tahunAjaran": $stateParams.tahunAjaran,
                                            "idPelajaranUTSUAS": pelajaran.idPelajaranUTSUAS,
                                            "idPelajaran": pelajaran.idPelajaran,
                                            "pelajaran": pelajaran.pelajaran,
                                            "statusFinish": response[0].statusFinish,
                                            "idJawabanUTSUASSiswaPerPelajaran": $scope.idJawabanUTSUASSiswaPerPelajaran,
                                            "idRekapJawabanUTSUASSiswa": $scope.idRekapJawabanUTSUASSiswa,
                                            "idKelas": $stateParams.idKelas,
                                            "siswauid": $stateParams.siswauid,
                                        });
                                    });
                                }
                                else {
                                    // console.log("jangan hapus", i + "-" + response[i].idPelajaranUTSUAS + "-" + response[i].$id)
                                }

                            }
                        }
                    })
                }
            })
        };

        $scope.belumMulai = function (pelajaran) {
            console.log(pelajaran);
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

    .controller('nilaiUTSUASSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "idKelas":$stateParams.idKelas,
            "siswauid":$stateParams.siswauid,

        };
        console.log('TES PEPES'+$scope.uidSiswa);
        var refRekapNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idUTSUAS+ '/' + $scope.data.idRekapJawabanUTSUASSiswa);
        var dataRekap = $firebaseObject(refRekapNilai);
        // console.log("dataRekap", dataRekap);

        if ($scope.data.statusFinish === false) {
            //Pengaturan Umum Ujian
            var refPengaturanUmum = firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
            refPengaturanUmum.on("child_added", function (snapshot) {
                $scope.soalAcak = snapshot.val().soalAcak;
                $scope.nilaiMaksimum = snapshot.val().nilaiMaksimum * 1;
                $scope.jumlahSoal = snapshot.val().jumlahSoal * 1;
                $scope.bobotNilai = snapshot.val().nilaiMaksimum * 1 / snapshot.val().jumlahSoal * 1;

            });

            //Menghitung Nilai Per Pelajaran
            console.log('CEK nilai 1');
            console.log("uid "+$scope.uidSiswa);
            var hitungNilai = firebase.database(app).ref("jawabanUTSUASSiswa/" + $scope.data.idUTSUAS+ '/'+$scope.data.siswauid).orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.uidSiswa);
            var listHitungNilai = $firebaseArray(hitungNilai);
            // console.log('HITUNG'+listHitungNilai);

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
                console.log('CEK nilai 2');
                console.log('IdUTSUAS'+$scope.data.idUTSUAS);
                console.log("idKelas "+$scope.data.idKelas);
                console.log("uid "+$scope.uidSiswa);
                var ref = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.uidSiswa+ '/' + $scope.data.idJawabanUTSUASSiswaPerPelajaran);

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
            console.log('CEK nilai 3');
            console.log('IdUTSUAS'+$scope.data.idUTSUAS);
            console.log("idKelas "+$scope.data.idKelas);
            console.log("uid "+$scope.uidSiswa);
            var ref = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS+ '/' +$scope.data.idKelas+ '/' +$scope.uidSiswa+ '/' + $scope.data.idJawabanUTSUASSiswaPerPelajaran);
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
        console.log('CEK nilai 1');
        console.log('IdUTSUAS'+$scope.data.idUTSUAS);
        console.log("idKelas "+$scope.data.idKelas);
        console.log("uid "+$scope.uidSiswa);
        var refRekapNilaiCek = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idUTSUAS+ '/' + $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran").orderByChild("idPelajaranUTSUAS").equalTo($scope.data.idPelajaranUTSUAS);
        var dataRekapCek = $firebaseArray(refRekapNilaiCek);
        dataRekapCek.$loaded().then(function (response) {
            // console.log(response);
            // console.log("banyaknya nilai", response.length);
            if (response.length === 0) {
                console.log('lanjutkan')
                console.log('TES PEPES'+$scope.uidSiswa);
                //Insert Data
                var insertData = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idUTSUAS+ '/' + $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran");
                insertData.push({
                    "idPelajaran": $stateParams.idPelajaran,
                    "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                    "nilai": $scope.totalNilai,
                    "pelajaran": $stateParams.pelajaran
                })
            }
            else if (response.length === 1) {
                console.log('stopped');
                console.log('stopped', response[0].$id);
                var updateNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idUTSUAS+ '/' + $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran/" + response[0].$id)
                updateNilai.update({
                    "nilai": $scope.totalNilai
                }).then(function (resp) {
                    console.log('updateNilaiBerhasil')
                })
            }
            else if (response.length > 1) {
                for (i = 0; i < response.length; i++) {
                    if (i > 0) {
                        console.log("hapus", i + "-" + response[i].idPelajaranUTSUAS + "-" + response[i].$id);
                        var obj = firebase.database(app).ref("rekapJawabanUTSUASSiswa/"+ $scope.data.idUTSUAS+ '/' + $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran/" + response[i].$id);
                        var objDelete = $firebaseObject(obj);
                        objDelete.$remove().then(function (ref) {
                            console.log('Data Double Berhasil Dihapus');
                        });
                    }
                    else {
                        console.log("jangan hapus", i + "-" + response[i].idPelajaranUTSUAS + "-" + response[i].$id)
                    }

                }
            }
        })

        var avgNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idUTSUAS+  +'/' + $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran");
        var listAvgNilai = $firebaseArray(avgNilai);

        $scope.nilaiTotal = 0;
        listAvgNilai.$loaded().then(function (response) {
            for (i = 0; i < response.length; i++) {
                var penilaian = response[i].nilai;
                $scope.nilaiTotal = $scope.nilaiTotal + penilaian;
                $scope.avg = $scope.nilaiTotal / response.length;
                // console.log("total Nilai", $scope.nilaiTotal);
                // console.log("avg", $scope.avg);
                var updateNilaiRata = firebase.database(app).ref("rekapJawabanUTSUASSiswa/"+ $scope.data.idUTSUAS+ '/' + $scope.data.idRekapJawabanUTSUASSiswa);

                updateNilaiRata.update(JSON.parse(JSON.stringify({
                    "jumlahNilai": $scope.nilaiTotal,
                    "rataRata": $scope.avg,
                }))).then(function (resp) {
                    // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                });

            }

        });

    }])

    .controller('statusJawabanUTSUASSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS,
            "keterangan": $stateParams.keterangan,
            "utsUasTingkat": $stateParams.utsUasTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
            "pelajaran": $stateParams.pelajaran,
        };

        var cekkelas = firebase.database(app).ref("pesertaUTSUAS").orderByChild("uid").equalTo($scope.uidSiswa);
        var listRefkelas = $firebaseArray(cekkelas);

        listRefkelas.$loaded().then(function (response) {
            // $ionicLoading.hide();
            console.log(response);
            var idKelasSiswa =response[0].idKelas

            console.log('CEK STATUS');
            console.log('idUTSUAS' + $scope.data.idUTSUAS);
            console.log('idKelas' + idKelasSiswa);
            console.log('uid' + $scope.uidSiswa);
    
            if ($scope.data.keterangan === "all" || $scope.data.keterangan === "Kosong") {
                var ref = firebase.database(app).ref("jawabanUTSUASSiswa/" + $scope.data.idUTSUAS + '/' + $scope.uidSiswa).orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS + "_" + $scope.uidSiswa);
                var listRef = $firebaseArray(ref);
    
                $ionicLoading.show();
                listRef.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.datas = response;
                });
            }
            else if ($scope.data.keterangan === "Benar") {
                var ref = firebase.database(app).ref("jawabanUTSUASSiswa/" + $scope.data.idUTSUAS + '/' + $scope.uidSiswa).orderByChild("filterStatusJawaban").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.uidSiswa + "_Benar");
                var listRef = $firebaseArray(ref);
    
                $ionicLoading.show();
                listRef.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.datas = response;
                });
            }
    
            else if ($scope.data.keterangan === "Salah") {
                var ref = firebase.database(app).ref("jawabanUTSUASSiswa/" + $scope.data.idUTSUAS + '/' + $scope.uidSiswa).orderByChild("filterStatusJawaban").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + $scope.uidSiswa + "_Salah");
                var listRef = $firebaseArray(ref);
    
                $ionicLoading.show();
                listRef.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.datas = response;
                });
            }
    
    
            $scope.getSoal = function (jawaban) {
                //console.log(jawaban);
    
                var pembahasanSoal = firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
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

        });
        
    }])