angular.module('app.nilaiPeringkatUjianOnlineSekolah', [])

    .controller('nilaiPeringkatUjianOnlineSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        // LOADBALANCING
        if ($scope.idSekolah === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolah === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUjian": $stateParams.idUjian,
            "namaUjian": $stateParams.namaUjian,
            "jenjang": $stateParams.jenjang,
            "namaKotaKabupaten": $stateParams.namaKotaKabupaten,
            "namaProvinsi": $stateParams.namaProvinsi,
            "idSemester": $stateParams.idSemester,
            "semester": $stateParams.semester,
            "idTahunAjaran": $stateParams.idTahunAjaran,
            "tahunAjaran": $stateParams.tahunAjaran,
        };
        console.log($scope.data);

        // $scope.formData = {
        //     searchData: ''
        // }

        // var ref = firebase.database().ref("rekapJawabanOlimpiadeSiswa").orderByChild("idTryout").equalTo($scope.data.idTryout);
        // var listRef = $firebaseArray(ref);
        // listRef.$loaded().then(function (response) {
        //     for (i = 0; i < response.length; i++) {
        //         $scope.totalData.push({
        //             "id": response[i].$id
        //         })
        //     }
        //     $scope.peringkat = response;
        //     $scope.peringkat.sort(function (a, b) {
        //         return b.jumlahNilai - a.jumlahNilai
        //     })
        //     if ($scope.data.totalSiswaLolos !== "") {
        //         for (i = 0; i < $scope.peringkat.length; i++) {
        //             if (i < $scope.data.totalSiswaLolos) {
        //                 var updateLulus = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.peringkat[i].$id);
        //                 updateLulus.update({
        //                     "lulus": true,
        //                 }).then(function (resp) {
        //                     console.log('lulus');
        //                 })
        //             }
        //             else {

        //                 var updateLulus = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.peringkat[i].$id);
        //                 updateLulus.update({
        //                     "lulus": false,
        //                 }).then(function (resp) {
        //                     console.log('Ga lulus');
        //                 })
        //             }

        //         }
        //     }
        //     else if ($scope.data.totalSiswaLolos === "") {
        //         for (i = 0; i < $scope.peringkat.length; i++) {
        //             var updateLulus = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.peringkat[i].$id);
        //             updateLulus.update({
        //                 "lulus": "",
        //             }).then(function (resp) {
        //                 console.log('clean');
        //             })
        //         }
        //     }
        // });
        // $scope.totalData = [];

        // $scope.count = 0;
        // $scope.noMoreItemsAvailable = false;

        // $scope.loadMore = function () {
        //     // console.log($scope.count += 100);
        //     var ref = firebase.database().ref("rekapJawabanOlimpiadeSiswa").orderByChild("idTryout").equalTo($scope.data.idTryout);
        //     var listRef = $firebaseArray(ref);

        //     listRef.$loaded().then(function (response) {
        //         $scope.peringkat = response;
        //         $scope.peringkat.sort(function (a, b) {
        //             return b.jumlahNilai - a.jumlahNilai
        //         })

        //         $scope.dataPeringkat = $scope.peringkat.slice(0, $scope.count += 100);

        //         if ($scope.dataPeringkat.length === $scope.totalData.length) {
        //             $scope.noMoreItemsAvailable = true;
        //             //console.log("banyakData ", $scope.items.length);
        //         }
        //         $scope.$broadcast('scroll.infiniteScrollComplete');
        //     });

        // };

        // $scope.cariData = function () {
        //     var s = $scope.formData.searchData.toLowerCase();


        //     if (s == '') {
        //         $scope.dataPeringkat = listRef;
        //         return;
        //     }

        //     $scope.dataPeringkat = $scope.dataPeringkat.filter(function (item) {
        //         if (item.namaPengguna.toLowerCase().indexOf(s) > -1 || item.namaSekolah.toLowerCase().indexOf(s) > -1) {
        //             return true;
        //         }
        //         return false;
        //     });
        // }

        var ref = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa").orderByChild("idUjian").equalTo($scope.data.idUjian);
        var listRef = $firebaseArray(ref);

        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.peringkat = response;

            $scope.peringkat.sort(function (a, b) {
                return b.jumlahNilai - a.jumlahNilai
            })

            var wb = XLSX.read($scope.peringkat, { type: "array" });
            var d = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

            $scope.excel = function () {
                console.log("d", d)
                var wb = XLSX.utils.table_to_book(document.getElementById('danu-table'));
                XLSX.writeFile(wb, "nilaiPeringkat_" + $scope.data.namaUjian + ".xlsx");
            }

            if ($scope.data.totalSiswaLolos !== "") {
                for (i = 0; i < $scope.peringkat.length; i++) {
                    if (i < $scope.data.totalSiswaLolos) {
                        var updateLulus = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.peringkat[i].$id);
                        updateLulus.update({
                            "lulus": true,
                        }).then(function (resp) {
                            console.log('lulus');
                        })
                    }
                    else {

                        var updateLulus = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.peringkat[i].$id);
                        updateLulus.update({
                            "lulus": false,
                        }).then(function (resp) {
                            console.log('Ga lulus');
                        })
                    }

                }
            }
            else if ($scope.data.totalSiswaLolos === "") {
                for (i = 0; i < $scope.peringkat.length; i++) {
                    var updateLulus = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.peringkat[i].$id);
                    updateLulus.update({
                        "lulus": "",
                    }).then(function (resp) {
                        console.log('clean');
                    })
                }
            }
        });

        $scope.dataNilaiSiswa = function (data) {
            //console.log(data);
            $state.go("menuSekolah.nilaiSiswaUjianOnlineSekolah", {
                "idUjian": $stateParams.idUjian,
                "namaUjian": $stateParams.namaUjian,
                "jenjang": $stateParams.jenjang,
                "namaKotaKabupaten": $stateParams.namaKotaKabupaten,
                "namaProvinsi": $stateParams.namaProvinsi,
                "namaSekolah": data.namaSekolah,
                "semester": $stateParams.semester,
                "tahunAjaran": $stateParams.tahunAjaran,
                "idRekapJawabanUjianOnlineSiswa": data.$id,
                "namaPengguna": data.namaPengguna,
                "uid": data.uid,
            })

        };

    }])

    .controller('nilaiSiswaUjianOnlineSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')
        // LOADBALANCING
        if ($scope.idSekolah === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolah === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUjian": $stateParams.idUjian,
            "namaUjian": $stateParams.namaUjian,
            "jenjang": $stateParams.jenjang,
            "namaKotaKabupaten": $stateParams.namaKotaKabupaten,
            "namaProvinsi": $stateParams.namaProvinsi,
            "namaSekolah": $stateParams.namaSekolah,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idRekapJawabanUjianOnlineSiswa": $stateParams.idRekapJawabanUjianOnlineSiswa,
            "namaPengguna": $stateParams.namaPengguna,
            "uid": $stateParams.uid,
        };
        //console.log($scope.data);
        $ionicLoading.show()
        var dataSiswa = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo($scope.data.uid);
        dataSiswa.on('child_added', function (snapshot) {
            $ionicLoading.hide();
            $scope.emailSiswa = snapshot.val().email;
            $scope.noHandphoneSiswa = snapshot.val().noHandphone;
            $scope.kelasSiswa = snapshot.val().namaKelas;
            $scope.jenjang = snapshot.val().jenjang;
        })

        var ref = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanUjianOnlineSiswa);
        $scope.formData = $firebaseObject(ref);
        // console.log($scope.formData);
        // ref.update({
        //     "jumlahNilai" : 270
        // }).then(function(resp){
        //     console.log("success");
        // })

        var refNilai = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanUjianOnlineSiswa + "/pelajaran");
        var listRefNilai = $firebaseArray(refNilai);

        $ionicLoading.show();
        listRefNilai.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.nilai = response;
        });

        $scope.nilaiTotal = 0;
        $scope.dataArray = [];
        listRefNilai.$loaded().then(function (response) {
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
                    var updateNilaiRata = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanUjianOnlineSiswa);

                    updateNilaiRata.update(JSON.parse(JSON.stringify({
                        "jumlahNilai": $scope.nilaiTotal,
                        "rataRata": $scope.avg,
                    }))).then(function (resp) {
                        // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                    });
                }

            }

        });

        $scope.goToNilai = function (data) {
            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Pelajaran : ' + data.pelajaran,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Lihat Detail' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Nilai',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        var getData = firebase.database(app).ref("jawabanUjianOnlineSiswaPerPelajaran").orderByChild("filter").equalTo($stateParams.idUjian + "_" + data.idPelajaranUjianOnline + "_" + $scope.data.uid);
                        getData.on("child_added", function (snapshot) {
                            //console.log(snapshot.val());
                            $state.go("menuSekolah.nilaiSiswaDetailUjianOnlineSekolah", {
                                "idUjian": $stateParams.idUjian,
                                "namaUjian": $stateParams.namaUjian,
                                "jenjang": $stateParams.jenjang,
                                "namaKotaKabupaten": $stateParams.namaKotaKabupaten,
                                "namaProvinsi": $stateParams.namaProvinsi,
                                "semester": $stateParams.semester,
                                "tahunAjaran": $stateParams.tahunAjaran,
                                "idPelajaranUjianOnline": data.idPelajaranUjianOnline,
                                "idPelajaran": data.idPelajaran,
                                "pelajaran": data.pelajaran,
                                "statusFinish": snapshot.val().statusFinish,
                                "idJawabanUjianOnlineSiswaPerPelajaran": snapshot.key,
                                "idRekapJawabanUjianOnlineSiswa": $stateParams.idRekapJawabanUjianOnlineSiswa,
                                "namaPengguna": $stateParams.namaPengguna,
                                "uid": $stateParams.uid
                            });
                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    var refNilai = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanUjianOnlineSiswa + "/pelajaran/" + data.$id);
                    var nilaiHapus = $firebaseObject(refNilai);
                    console.log("nilaiHapus", nilaiHapus);

                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Nilai',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Nilai Ini?',
                        okType: 'button-balanced'
                    });
                    confirmPopup.then(function (resp) {
                        if (resp) {
                            nilaiHapus.$remove().then(function (response) {
                                var avgNilai = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa + "/pelajaran");
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
                                            var updateNilaiRata = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa);

                                            updateNilaiRata.update(JSON.parse(JSON.stringify({
                                                "jumlahNilai": $scope.nilaiTotal,
                                                "rataRata": $scope.avg,
                                            }))).then(function (resp) {
                                                // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                                            });
                                        }

                                    }

                                });
                            });

                        }
                        else {
                            console.log('Tidak Jadi Menghapus');
                        }
                    })

                    return true;
                }

            });


        };

        $scope.printNilai = function () {
            var createAt = $filter('date')(new Date(), 'dd-MM-yyyy HH:mm:ss');

            if ($scope.jenjang === "SMP") {
                var doc = new jsPDF();
                doc.setFontSize(16);
                doc.text(105, 20, 'STUDENTS ONLINE COMPETITION (SOC)', null, null, 'center');
                doc.setFontSize(14);
                doc.text(105, 27, 'SOC Goes To School Support By Indosat', null, null, 'center');

                doc.setFontSize(10);
                doc.text(105, 35, 'Jl. Mayor Salim Batubara No 2/553 Komplek PU, Sekip Jaya, Kemuning', null, null, 'center');
                doc.text(105, 40, 'Palembang - Sumatera Selatan, 30128, (0778) 5735166 ', null, null, 'center');
                doc.text(105, 45, 'email : soccorporation@gmail.com ', null, null, 'center');

                doc.line(20, 55, 190, 55);
                doc.setFontSize(13);
                doc.setFontType("bold");
                doc.text(105, 60, 'SELAMAT ANDA LULUS KE TINGKAT SELANJUTNYA', null, null, 'center');
                doc.line(20, 62, 190, 62);

                doc.setFontSize(11);
                doc.setFontType("normal");
                doc.text(20, 72, 'Berdasarkan hasil Olimpiade Online Babak Penyisihan yang diselenggarakan pada tanggal\n' + $stateParams.tanggalPelaksanaan + ' di ' + $stateParams.namaSekolah + ' , maka panitia penyelenggara menyatakan\nbahwa siswa dibawah ini :', null, null, 'left');

                doc.setFontSize(10);
                doc.setFontType("italic");
                doc.text(20, 90, 'Nama');
                doc.text(60, 90, ': ' + $stateParams.namaPengguna);

                doc.text(20, 95, 'Email')
                doc.text(60, 95, ': ' + $scope.emailSiswa);

                doc.text(20, 100, 'No Handphone');
                doc.text(60, 100, ': ' + $scope.noHandphoneSiswa);

                doc.text(20, 105, 'Sekolah');
                doc.text(60, 105, ': ' + $stateParams.namaSekolah);

                doc.text(20, 110, 'Kelas');
                doc.text(60, 110, ': ' + $scope.kelasSiswa);

                doc.setFontSize(11);
                doc.setFontType("normal");
                doc.text(20, 120, 'Dinyatakan LULUS Olimpiade Online pada babak penyisihan tingkat sekolah, dengan demikian,\nbahwa siswa di atas berhak melanjutkan ke babak berikutnya yaitu Tingkat Kota Palembang\nyang pelaksanaannya adalah sebagai berikut :');

                doc.setFontSize(10);
                doc.setFontType("italic");
                doc.text(20, 138, 'Hari/Tanggal');
                doc.text(60, 138, ': Sabtu, 2 Maret 2019');

                doc.text(20, 143, 'Tempat')
                doc.text(60, 143, ': SMP Patra Mandiri 1 (Komplek Pertamina Plaju)');

                doc.text(20, 148, 'Pukul');
                doc.text(60, 148, ': 08.00 WIB s/d Selesai');

                doc.text(20, 153, 'Kegiatan');
                doc.text(60, 153, ': Babak Perempatfinal, Semifinal dan Final Olimpiade Online Siswa');

                doc.setFontSize(11);
                doc.setFontType("normal");
                doc.text(20, 161, 'Hal-hal terkait petunjuk teknis pelaksanaan kegiatan terlampir bersamaan dengan surat ini');
                doc.text(20, 169, 'Demikian surat ini kami sampaikan, semoga dengan rahmat Tuhan Yang Maha Esa,\ntujuan kita dalam mencerdaskan kehidupan bangsa dapat tercapai. Atas perhatiannya\nkami mengucapkan terima kasih.');

                doc.setFontSize(13);
                doc.setFontType("normal");
                doc.text(200, 220, 'PANITIA SOC', null, null, 'right');
                doc.setFontSize(11);
                doc.text(200, 225, $stateParams.namaKota + ', ' + createAt, null, null, 'right');
                doc.text(200, 230, 'Sekolah, ', null, null, 'right');
                doc.text(200, 260, 'Danu Saputra ', null, null, 'right');
                doc.line(20, 263, 200, 263);

                doc.setFontSize(10);
                doc.setFontType("italic");
                doc.text(200, 268, 'Diberikan Kepada Siswa Olimpiade', null, null, 'right');



                doc.save($stateParams.namaSekolah + '_SOC_' + $stateParams.namaPengguna + '.pdf');
            }
            else if ($scope.jenjang === "SMA" || $scope.jenjang === "SMK") {
                var doc = new jsPDF();
                doc.setFontSize(16);
                doc.text(105, 20, 'STUDENTS ONLINE COMPETITION (SOC)', null, null, 'center');
                doc.setFontSize(14);
                doc.text(105, 27, 'SOC Goes To School Support By Indosat', null, null, 'center');

                doc.setFontSize(10);
                doc.text(105, 35, 'Jl. Mayor Salim Batubara No 2/553 Komplek PU, Sekip Jaya, Kemuning', null, null, 'center');
                doc.text(105, 40, 'Palembang - Sumatera Selatan, 30128, (0778) 5735166 ', null, null, 'center');
                doc.text(105, 45, 'email : soccorporation@gmail.com ', null, null, 'center');

                doc.line(20, 55, 190, 55);
                doc.setFontSize(13);
                doc.setFontType("bold");
                doc.text(105, 60, 'SELAMAT ANDA LULUS KE TINGKAT SELANJUTNYA', null, null, 'center');
                doc.line(20, 62, 190, 62);

                doc.setFontSize(11);
                doc.setFontType("normal");
                doc.text(20, 72, 'Berdasarkan hasil Olimpiade Online Babak Penyisihan yang diselenggarakan pada tanggal\n' + $stateParams.tanggalPelaksanaan + ' di ' + $stateParams.namaSekolah + ' , maka panitia penyelenggara menyatakan\nbahwa siswa dibawah ini :', null, null, 'left');

                doc.setFontSize(10);
                doc.setFontType("italic");
                doc.text(20, 90, 'Nama');
                doc.text(60, 90, ': ' + $stateParams.namaPengguna);

                doc.text(20, 95, 'Email')
                doc.text(60, 95, ': ' + $scope.emailSiswa);

                doc.text(20, 100, 'No Handphone');
                doc.text(60, 100, ': ' + $scope.noHandphoneSiswa);

                doc.text(20, 105, 'Sekolah');
                doc.text(60, 105, ': ' + $stateParams.namaSekolah);

                doc.text(20, 110, 'Kelas');
                doc.text(60, 110, ': ' + $scope.kelasSiswa);

                doc.setFontSize(11);
                doc.setFontType("normal");
                doc.text(20, 120, 'Dinyatakan LULUS Olimpiade Online pada babak penyisihan tingkat sekolah, dengan demikian,\nbahwa siswa di atas berhak melanjutkan ke babak berikutnya yaitu Tingkat Kota Palembang\nyang pelaksanaannya adalah sebagai berikut :');

                doc.setFontSize(10);
                doc.setFontType("italic");
                doc.text(20, 138, 'Hari/Tanggal');
                doc.text(60, 138, ': Sabtu, 9 Maret 2019');

                doc.text(20, 143, 'Tempat')
                doc.text(60, 143, ': SMAN 17 Palembang');

                doc.text(20, 148, 'Pukul');
                doc.text(60, 148, ': 08.00 WIB s/d Selesai');

                doc.text(20, 153, 'Kegiatan');
                doc.text(60, 153, ': Babak Perempatfinal, Semifinal dan Final Olimpiade Online Siswa');

                doc.setFontSize(11);
                doc.setFontType("normal");
                doc.text(20, 161, 'Hal-hal terkait petunjuk teknis pelaksanaan kegiatan terlampir bersamaan dengan surat ini');
                doc.text(20, 169, 'Demikian surat ini kami sampaikan, semoga dengan rahmat Tuhan Yang Maha Esa,\ntujuan kita dalam mencerdaskan kehidupan bangsa dapat tercapai. Atas perhatiannya\nkami mengucapkan terima kasih.');

                doc.setFontSize(13);
                doc.setFontType("normal");
                doc.text(200, 220, 'PANITIA SOC', null, null, 'right');
                doc.setFontSize(11);
                doc.text(200, 225, $stateParams.namaKota + ', ' + createAt, null, null, 'right');
                doc.text(200, 230, 'Sekolah, ', null, null, 'right');
                doc.text(200, 260, 'Danu Saputra ', null, null, 'right');
                doc.line(20, 263, 200, 263);

                doc.setFontSize(10);
                doc.setFontType("italic");
                doc.text(200, 268, 'Diberikan Kepada Siswa Olimpiade', null, null, 'right');

                doc.save($stateParams.namaSekolah + '_SOC_' + $stateParams.namaPengguna + '.pdf');
            }

        }

    }])

    .controller('nilaiSiswaDetailUjianOnlineSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        // LOADBALANCING
        if ($scope.idSekolah === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolah === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUjian": $stateParams.idUjian,
            "namaUjian": $stateParams.namaUjian,
            "jenjang": $stateParams.jenjang,
            "namaKotaKabupaten": $stateParams.namaKotaKabupaten,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idPelajaranUjianOnline": $stateParams.idPelajaranUjianOnline,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran,
            "statusFinish": $stateParams.statusFinish,
            "idJawabanUjianOnlineSiswaPerPelajaran": $stateParams.idJawabanUjianOnlineSiswaPerPelajaran,
            "idRekapJawabanUjianOnlineSiswa": $stateParams.idRekapJawabanUjianOnlineSiswa,
            "namaPengguna": $stateParams.namaPengguna,
            "uid": $stateParams.uid
        };


        if ($scope.data.statusFinish === false) {
            //Pengaturan Umum Ujian 
            var refPengaturanUmum = firebase.database(app).ref("pengaturanUmumUjianOnline").orderByChild("filter").equalTo($stateParams.idUjian + "_" + $stateParams.idPelajaranUjianOnline);
            refPengaturanUmum.on("child_added", function (snapshot) {
                $scope.soalAcak = snapshot.val().soalAcak;
                $scope.nilaiMaksimum = snapshot.val().nilaiMaksimum * 1;
                $scope.jumlahSoal = snapshot.val().jumlahSoal * 1;
                $scope.bobotNilai = snapshot.val().nilaiMaksimum * 1 / snapshot.val().jumlahSoal * 1;

            });

            //Menghitung Nilai Per Pelajaran
            var hitungNilai = firebase.database(app).ref("jawabanUjianOnlineSiswa").orderByChild("filter").equalTo($stateParams.idUjian + "_" + $stateParams.idPelajaranUjianOnline + "_" + $scope.data.uid);
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
                var ref = firebase.database(app).ref("jawabanUjianOnlineSiswaPerPelajaran/" + $scope.data.idJawabanOlimpiadeSiswaPerPelajaran);

                ref.update(JSON.parse(JSON.stringify({
                    "benar": $scope.statusJawabanBenar,
                    "salah": $scope.statusJawabanSalah,
                    "kosong": $scope.kosong,
                    "nilai": $scope.totalNilai,
                    "statusFinish": true
                }))).then(function (resp) {
                    console.log("Updated");
                });

            });
        }

        if ($scope.data.statusFinish === true) {
            var ref = firebase.database(app).ref("jawabanUjianOnlineSiswaPerPelajaran/" + $scope.data.idJawabanUjianOnlineSiswaPerPelajaran);
            var refObj = $firebaseObject(ref);

            refObj.$loaded().then(function (response) {
                $scope.totalNilai = response.nilai;
                $scope.statusJawabanBenar = response.benar;
                $scope.statusJawabanSalah = response.salah;
                $scope.kosong = response.kosong;
                $scope.jumlahSoal = response.jumlahSoal;
            });
        }

        var avgNilai = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanUjianOnlineSiswa + "/pelajaran");
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
                    var updateNilaiRata = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanUjianOnlineSiswa);

                    updateNilaiRata.update(JSON.parse(JSON.stringify({
                        "jumlahNilai": $scope.nilaiTotal,
                        "rataRata": $scope.avg,
                    }))).then(function (resp) {
                        // console.log("jumlahSoalUpdate", $scope.jumlahSoal);
                    });
                }

            }

        });


    }])

    .controller('statusJawabanSiswaUjianOnlineSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        
        // LOADBALANCING
        if ($scope.idSekolah === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolah === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUjian": $stateParams.idUjian,
            "namaUjian": $stateParams.namaUjian,
            "keterangan": $stateParams.keterangan,
            "namaKotaKabupaten": $stateParams.namaKotaKabupaten,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idPelajaranUjianOnline": $stateParams.idPelajaranUjianOnline,
            "pelajaran": $stateParams.pelajaran,
            "namaPengguna": $stateParams.namaPengguna,
            "uid": $stateParams.uid
        };

        //console.log($scope.data);

        if ($scope.data.keterangan === "all" || $scope.data.keterangan === "Kosong") {
            var ref = firebase.database(app).ref("jawabanUjianOnlineSiswa").orderByChild("filter").equalTo($scope.data.idUjian + "_" + $scope.data.idPelajaranUjianOnline + "_" + $scope.data.uid);
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }
        else if ($scope.data.keterangan === "Benar") {
            var ref = firebase.database(app).ref("jawabanUjianOnlineSiswa").orderByChild("filterStatusJawaban").equalTo($stateParams.idUjian + "_" + $stateParams.idPelajaranUjianOnline + "_" + $scope.data.uid + "_Benar");
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            });
        }

        else if ($scope.data.keterangan === "Salah") {
            var ref = firebase.database(app).ref("jawabanUjianOnlineSiswa").orderByChild("filterStatusJawaban").equalTo($stateParams.idUjian + "_" + $stateParams.idPelajaranUjianOnline + "_" + $scope.data.uid + "_Salah");
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

                        var refSoal = firebase.database(appBankSoal).ref("soal/" + jawaban.idSoal);
                        $scope.formData = $firebaseObject(refSoal);

                    });
                }
                else if (snapshot.val().pembahasanSoalDibuka === false) {
                    $ionicPopup.alert({
                        title: 'Informasi',
                        template: "Maaf, Pembahasan Soal Untuk Mata Pelajaran " + $stateParams.pelajaran + " Belum Dibuka.",
                        okType: "button-balanced"
                    });
                }
            });


        };
    }])
