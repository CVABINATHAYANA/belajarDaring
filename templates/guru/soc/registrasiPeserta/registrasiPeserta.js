angular.module('app.registrasiPesertaSOCGuru', [])

    .controller('registrasiPesertaSOCGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "namaTryout": $stateParams.namaTryout,
            "jenjang": $stateParams.jenjang,
            "kelas": $stateParams.kelas,
            "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
            "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
            "id_provinsi": $stateParams.id_provinsi,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idSekolah": $stateParams.idSekolah,
        };

        if ($scope.data.olimpiadeTingkat === "Kota/Kabupaten") {
            var ref = firebase.database().ref("dataSiswa").orderByChild("filterRegistrasiKota").equalTo($scope.data.jenjang + "_" + $scope.data.id_kota_kabupaten);
        }
        else if ($scope.data.olimpiadeTingkat === "Provinsi") {
            var ref = firebase.database().ref("dataSiswa").orderByChild("filterRegistrasiProvinsi").equalTo($scope.data.jenjang + "_" + $scope.data.id_provinsi);

        }
        else if ($scope.data.olimpiadeTingkat === "Sekolah") {
            var ref = firebase.database().ref("dataSiswa").orderByChild("idSekolah").equalTo($scope.data.idSekolah);
        }
        var listData = $firebaseArray(ref);

        $ionicLoading.show();
        listData.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSiswa = response;
            // for (i = 0; i < response.length; i++) {
            //     var updateDataSiswa = firebase.database().ref("dataSiswa/" + response[i].$id);
            //     updateDataSiswa.update(JSON.parse(JSON.stringify({
            //         "registrasiOlimpiade": $scope.data.idTryout
            //     }))).then(function (resp) {
            //         console.log("dataSiswaDiUpdate " + response[i].namaPengguna)
            //     })
            // }
        });

        $scope.formData = {
            "namaPengguna": ""
        }


        $scope.getData = function (data) {
            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Nama : ' + data.namaPengguna,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Registrasikan' },
                ],
                //destructiveText: '<i class="icon ion-trash-b"></i> Hapus SOC',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {

                        var refPesertaOlimpiade = firebase.database().ref("pesertaOlimpiade").orderByChild("filter").equalTo(data.uid + "_" + $scope.data.idTryout);
                        var listPesertaOlimpiade = $firebaseArray(refPesertaOlimpiade);
                        $ionicLoading.show()
                        listPesertaOlimpiade.$loaded().then(function (response) {
                            if (response.length === 0) {
                                var refAdd = firebase.database().ref("pesertaOlimpiade");
                                // var addData = $firebaseArray(refAdd);
                                refAdd.push({
                                    "idSiswa": data.$id,
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
                                    "kelas": data.kelas,
                                    "namaKecamatan": data.namaKecamatan,
                                    "namaKelas": data.namaKelas,
                                    "namaKotaKabupaten": data.namaKotaKabupaten,
                                    "namaPengguna": data.namaPengguna,
                                    "namaProvinsi": data.namaProvinsi,
                                    "namaSekolah": data.namaSekolah,
                                    "noHandphone": data.noHandphone,
                                    "uid": data.uid,

                                    "idTryout": $stateParams.idTryout,
                                    "filter": data.uid + "_" + $scope.data.idTryout
                                }).then(function (resp) {
                                    console.log("pesertaOlimpiadeSuccess")
                                    //Menambahkan Table Rekap Jawaban Olimpiade Siswa
                                    var tambahData = firebase.database().ref("rekapJawabanOlimpiadeSiswa");
                                    tambahData.push({
                                        "idTryout": $stateParams.idTryout,
                                        "namaTryout": $stateParams.namaTryout,
                                        "jenjang": $stateParams.jenjang,
                                        "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
                                        "namaKota": $stateParams.namaKota,
                                        "namaProvinsi": $stateParams.namaProvinsi,
                                        "semester": $stateParams.semester,
                                        "tahunAjaran": $stateParams.tahunAjaran,

                                        "idPengguna": data.$id,
                                        "namaPengguna": data.namaPengguna,
                                        "uid": data.uid,
                                        "idSekolah": data.idSekolah,
                                        "idKecamatan": data.idKecamatan,
                                        "idKotaKabupaten": data.idKotaKabupaten,
                                        "idProvinsi": data.idProvinsi,
                                        "namaSekolah": data.namaSekolah,
                                        "kelas": data.kelas,

                                        "pelajaran": "",
                                        "filter": $stateParams.idTryout + "_" + data.uid,
                                        "jumlahNilai": 0,
                                        "rataRata": 0
                                    }).then(function (resp) {
                                        $ionicLoading.hide()
                                        console.log("success Rekap");
                                        //Tambahkan data ke tabel Jawaban Olimpiade Peserta PerPelajaran
                                        var addData = firebase.database().ref("pelajaranTryout").orderByChild("idTryout").equalTo($scope.data.idTryout);
                                        var listAddData = $firebaseArray(addData);
                                        $ionicLoading.show();
                                        listAddData.$loaded().then(function (response) {
                                            for (i = 0; i < response.length; i++) {

                                                var tambahData = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran");
                                                tambahData.push({
                                                    "idTryout": $stateParams.idTryout,
                                                    "namaTryout": $stateParams.namaTryout,
                                                    "jenjang": $stateParams.jenjang,
                                                    "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
                                                    "namaKota": $stateParams.namaKota,
                                                    "namaProvinsi": $stateParams.namaProvinsi,
                                                    "semester": $stateParams.semester,
                                                    "tahunAjaran": $stateParams.tahunAjaran,
                                                    "idPelajaranTryout": response[i].$id,
                                                    "idPelajaran": response[i].idPelajaran,
                                                    "pelajaran": response[i].pelajaran,

                                                    "idPengguna": data.$id,
                                                    "namaPengguna": data.namaPengguna,
                                                    "uid": data.uid,
                                                    "idSekolah": data.idSekolah,

                                                    "benar": 0,
                                                    "salah": 0,
                                                    "kosong": 0,
                                                    "nilai": 0,
                                                    "statusFinish": false,
                                                    "bukaUjianSekarang": false,
                                                    "tutupUjianSekarang": false,
                                                    "jumlahSoal": 0,
                                                    "statusTerjawab": false,

                                                    "filter": $stateParams.idTryout + "_" + response[i].$id + "_" + data.uid,
                                                    "filterMulaiUjian": $stateParams.idTryout + "_" + data.uid,

                                                    "jamDiMulai": "",
                                                    "jamBerakhir": "",
                                                    "jamSelesai": "",
                                                    "jamDurasiUjian": "",

                                                }).then(function (resp) {
                                                    $ionicLoading.hide()
                                                    console.log("successjawabanOlimpiadeSiswaPerPelajaran");
                                                    var updateDataSiswa = firebase.database().ref("dataSiswa/" + data.$id);
                                                    updateDataSiswa.update(JSON.parse(JSON.stringify({
                                                        "registrasiOlimpiade": $scope.data.idTryout
                                                    }))).then(function (resp) {
                                                        console.log("dataSiswaDiUpdate")
                                                    })
                                                })

                                            }
                                        });
                                    });
                                    var refPesertaOlimpiade = firebase.database().ref("pesertaOlimpiade").orderByChild("idTryout").equalTo($scope.data.idTryout);
                                    var listPesertaOlimpiade = $firebaseArray(refPesertaOlimpiade);

                                    listPesertaOlimpiade.$loaded().then(function (response) {
                                        $scope.totalPesertaOlimpiade = response.length;
                                        if (response.length !== 0) {
                                            $scope.aktif = true;
                                        }
                                    });

                                    $ionicPopup.alert({
                                        title: 'SUKSES',
                                        template: 'REGISTRASI SUKSES',
                                    })
                                });
                            }
                            else {
                                $ionicLoading.hide()
                                $ionicPopup.alert({
                                    title: 'PERHATIAN',
                                    template: 'Maaf, Data siswa ini sudah diregistrasikan, cek kembali, terima kasih',
                                })
                            }
                        });

                    }
                    return true;
                },

            });

        };

        var refPesertaOlimpiade = firebase.database().ref("pesertaOlimpiade").orderByChild("idTryout").equalTo($scope.data.idTryout);
        var listPesertaOlimpiade = $firebaseArray(refPesertaOlimpiade);

        listPesertaOlimpiade.$loaded().then(function (response) {
            $scope.totalPesertaOlimpiade = response.length;
            if (response.length !== 0) {
                $scope.aktif = true;
            }
        });

        $scope.pesertaTeregistrasi = function () {
            $state.go('menuGuru.pesertaTeregistrasiSOCGuru', {
                "idTryout": $stateParams.idTryout,
                "namaTryout": $stateParams.namaTryout,
                "jenjang": $stateParams.jenjang,
                "kelas": $stateParams.kelas,
                "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
                "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
                "id_provinsi": $stateParams.id_provinsi
            });
        };

    }])

    .controller('pesertaTeregistrasiSOCGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "namaTryout": $stateParams.namaTryout,
            "jenjang": $stateParams.jenjang,
            "kelas": $stateParams.kelas,
            "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
            "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
            "id_provinsi": $stateParams.id_provinsi
        };

        var refPesertaOlimpiade = firebase.database().ref("pesertaOlimpiade").orderByChild("idTryout").equalTo($scope.data.idTryout);
        var listPesertaOlimpiade = $firebaseArray(refPesertaOlimpiade);

        listPesertaOlimpiade.$loaded().then(function (response) {
            $scope.dataPesertaOlimpiade = response;
        });

        $scope.getDataSiswa = function (data) {
            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Nama Siswa : ' + data.namaPengguna,
                buttons: [
                    // { text: '<i class="icon ion-checkmark-circled"></i> Pengaturan Umum' },
                    // { text: '<i class="icon ion-checkmark-circled"></i> Kisi-Kisi Soal' },
                    // { text: '<i class="icon ion-checkmark-circled"></i> Registrasi Peserta' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Registrasi',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    // if(index===0){
                    //     $state.go('menu.pengaturanUmum',{
                    //         "idTryout" : data.idTryout,
                    //         "namaTryout" : data.namaTryout,
                    //         "jenjang" : data.jenjang,
                    //         "kelas" : data.kelas,
                    //         "idPelajaranTryout" : data.$id,
                    //         "idPelajaran" : data.idPelajaran,
                    //         "pelajaran" : data.pelajaran
                    //     });
                    // }
                    // if(index===1){
                    //     $state.go('menu.kisiKisiSoal',{
                    //         "idTryout" : data.idTryout,
                    //         "namaTryout" : data.namaTryout,
                    //         "jenjang" : data.jenjang,
                    //         "kelas" : data.kelas,
                    //         "idPelajaranTryout" : data.$id,
                    //         "idPelajaran" : data.idPelajaran,
                    //         "pelajaran" : data.pelajaran
                    //     });
                    // }
                    // if(index===2){
                    //     $ionicPopup.alert({
                    //         title: 'Pemberitahuan',
                    //         template: 'Untuk mengetahui hasil seleksi jalur Luar Zonasi, silahkan datang ke sekolah tempat tujuan. Terimakasih', 
                    //     })
                    // }
                    // if(index===3){
                    //     $ionicPopup.alert({
                    //         title: 'Pemberitahuan',
                    //         template: 'Untuk mengetahui hasil seleksi jalur Bina Lingkungan, silahkan datang ke sekolah tempat tujuan. Terimakasih', 
                    //     })
                    // }
                    // return true;
                },

                destructiveButtonClicked: function () {
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Registrasi Untuk Siswa Ini?',
                        okType: "button-positive",
                    });
                    confirmPopup.then(function (res) {
                        if (res) {


                            //Menghapus Jawaban Olimpiade Siswa
                            var a = firebase.database().ref("jawabanOlimpiadeSiswa").orderByChild("filterHapusRegistrasi").equalTo($stateParams.idTryout + "_" + data.uid);
                            var listA = $firebaseArray(a);
                            listA.$loaded().then(function (response) {

                                for (i = 0; i < response.length; i++) {

                                    var a1 = firebase.database().ref("jawabanOlimpiadeSiswa/" + response[i].$id);
                                    var a1Delete = $firebaseObject(a1);
                                    a1Delete.$remove().then(function (resp) {
                                        console.log("JawabanOlimpiadeSiswa Dihapus")
                                    })

                                }

                            });

                            //Menghapus Jawaban Olimpiade Siswa PerPelajaran
                            var b = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran").orderByChild("filterMulaiUjian").equalTo($stateParams.idTryout + "_" + data.uid);
                            var listB = $firebaseArray(b);
                            listB.$loaded().then(function (response) {

                                for (i = 0; i < response.length; i++) {

                                    var b1 = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran/" + response[i].$id);
                                    var b1Delete = $firebaseObject(b1);
                                    b1Delete.$remove().then(function (resp) {
                                        console.log("JawabanOlimpiadeSiswaPerPelajaran Dihapus");
                                    })

                                }
                            });

                            //Menghapus Rekap Jawaban Olimpiade
                            var c = firebase.database().ref("rekapJawabanOlimpiadeSiswa").orderByChild("filter").equalTo($stateParams.idTryout + "_" + data.uid);
                            var listC = $firebaseArray(c);
                            listC.$loaded().then(function (response) {
                                if (response.length === 0) {
                                    console.log("tidakAdaRekapYangDihapus");
                                }
                                else if (response.length === 1) {
                                    var c1 = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + response[0].$id);
                                    c1Delete = $firebaseObject(c1);
                                    c1Delete.$remove().then(function (resp) {
                                        console.log("RekapJawabanOlimpiadeSiswa Dihapus");
                                    })
                                }

                            })
                            // c.once("child_added", function(snapshot){
                            //     var id = snapshot.key;
                            //     var c1 = firebase.database().ref("rekapJawabanOlimpiadeSiswa/"+id);
                            //     c1Delete = $firebaseObject(c1);
                            //     c1Delete.$remove().then(function(resp){
                            //         console.log("RekapJawabanOlimpiadeSiswa Dihapus");
                            //     })
                            // });

                            //Menghapus Peserta Olimpiade
                            var refObj = firebase.database().ref("pesertaOlimpiade/" + data.$id);
                            var objDelete = $firebaseObject(refObj);
                            objDelete.$remove().then(function (ref) {
                                console.log("PesertaOlimpiade Dihapus");
                            });

                            //Update Data Siswa 
                            var updateDataSiswa = firebase.database().ref("dataSiswa/" + data.idSiswa);
                            updateDataSiswa.update(JSON.parse(JSON.stringify({
                                "registrasiOlimpiade": ""
                            }))).then(function (resp) {
                                console.log("dataSiswaDiUpdate")
                            })
                        }
                        else {
                            //console.log('Tidak Jadi Menghapus');
                        }
                    });
                    return true;
                }
            });

        };

    }])

    .controller('registrasiPesertaKotaSOCGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "namaTryout": $stateParams.namaTryout,
            "jenjang": $stateParams.jenjang,
            "kelas": $stateParams.kelas,
            "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
            "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
            "id_provinsi": $stateParams.id_provinsi,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idSekolah": $stateParams.idSekolah,
        };

        $scope.formData = {
            "idKecamatan": "",
            "idSekolah": "",
        }

        var getKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo($scope.data.id_kota_kabupaten);
        var listGetKecamatan = $firebaseArray(getKecamatan);
        $ionicLoading.show();
        listGetKecamatan.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataKecamatan = response;
        })


        $scope.getDataKecamatan = function () {
            //console.log($scope.formData.idKecamatan);
            if ($scope.data.jenjang === 'SMA') {
                $scope.dataSekolah = [];
                var getSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.formData.idKecamatan + "_" + $scope.data.jenjang);
                var listGetSekolah = $firebaseArray(getSekolah);
                $ionicLoading.show();
                listGetSekolah.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    for (i = 0; i < response.length; i++) {
                        $scope.dataSekolah.push({
                            "$id": response[i].$id,
                            "nama_sekolah": response[i].nama_sekolah,
                        })
                    }

                })
                var getSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.formData.idKecamatan + "_SMK");
                var listGetSekolah = $firebaseArray(getSekolah);
                $ionicLoading.show();
                listGetSekolah.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    for (i = 0; i < response.length; i++) {
                        $scope.dataSekolah.push({
                            "$id": response[i].$id,
                            "nama_sekolah": response[i].nama_sekolah,
                        })
                    }
                })
                console.log($scope.dataSekolah);
            }
            else if ($scope.data.jenjang !== 'SMA') {
                var getSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.formData.idKecamatan + "_" + $scope.data.jenjang);
                var listGetSekolah = $firebaseArray(getSekolah);
                $ionicLoading.show();
                listGetSekolah.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.dataSekolah = response;
                })
            }

        }

        $scope.getDataSekolah = function () {
            //console.log($scope.formData.idSekolah);
            var ref = firebase.database().ref("dataSiswa").orderByChild("idSekolah").equalTo($scope.formData.idSekolah);
            var listData = $firebaseArray(ref);

            $ionicLoading.show();
            listData.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSiswa = response;
                // console.log(response);
                // for(i=0; i<response.length; i++){
                //     var updateDataSiswa = firebase.database().ref("dataSiswa/"+response[i].$id);
                //     updateDataSiswa.update(JSON.parse(JSON.stringify({
                //         "registrasiOlimpiade" : $scope.data.idTryout
                //     }))).then(function(resp){
                //         console.log("dataSiswaDiUpdate "+response[i].namaPengguna)
                //     })
                // }
            });
        }

        $scope.formData = {
            "namaPengguna": ""
        }


        $scope.getData = function (data) {
            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Nama : ' + data.namaPengguna,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Registrasikan' },
                ],
                //destructiveText: '<i class="icon ion-trash-b"></i> Hapus SOC',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {

                        var refPesertaOlimpiade = firebase.database().ref("pesertaOlimpiade").orderByChild("filter").equalTo(data.uid + "_" + $scope.data.idTryout);
                        var listPesertaOlimpiade = $firebaseArray(refPesertaOlimpiade);

                        $ionicLoading.show();
                        listPesertaOlimpiade.$loaded().then(function (response) {
                            if (response.length === 0) {
                                var refAdd = firebase.database().ref("pesertaOlimpiade");
                                refAdd.push({
                                    "idSiswa": data.$id,
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
                                    "kelas": data.kelas,
                                    "namaKecamatan": data.namaKecamatan,
                                    "namaKelas": data.namaKelas,
                                    "namaKotaKabupaten": data.namaKotaKabupaten,
                                    "namaPengguna": data.namaPengguna,
                                    "namaProvinsi": data.namaProvinsi,
                                    "namaSekolah": data.namaSekolah,
                                    "noHandphone": data.noHandphone,
                                    "uid": data.uid,

                                    "idTryout": $stateParams.idTryout,
                                    "filter": data.uid + "_" + $scope.data.idTryout
                                }).then(function (resp) {
                                    console.log("pesertaOlimpiadeSuccess")
                                    //Menambahkan Table Rekap Jawaban Olimpiade Siswa
                                    var tambahData = firebase.database().ref("rekapJawabanOlimpiadeSiswa");
                                    tambahData.push({
                                        "idTryout": $stateParams.idTryout,
                                        "namaTryout": $stateParams.namaTryout,
                                        "jenjang": $stateParams.jenjang,
                                        "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
                                        "namaKota": $stateParams.namaKota,
                                        "namaProvinsi": $stateParams.namaProvinsi,
                                        "semester": $stateParams.semester,
                                        "tahunAjaran": $stateParams.tahunAjaran,

                                        "idPengguna": data.$id,
                                        "namaPengguna": data.namaPengguna,
                                        "uid": data.uid,
                                        "idSekolah": data.idSekolah,
                                        "idKecamatan": data.idKecamatan,
                                        "idKotaKabupaten": data.idKotaKabupaten,
                                        "idProvinsi": data.idProvinsi,
                                        "namaSekolah": data.namaSekolah,
                                        "kelas": data.kelas,

                                        "pelajaran": "",
                                        "filter": $stateParams.idTryout + "_" + data.uid,
                                        "jumlahNilai": 0,
                                        "rataRata": 0
                                    }).then(function (resp) {
                                        console.log("success Rekap");

                                        //Tambahkan data ke tabel Jawaban Olimpiade Peserta PerPelajaran
                                        var addData = firebase.database().ref("pelajaranTryout").orderByChild("idTryout").equalTo($scope.data.idTryout);
                                        var listAddData = $firebaseArray(addData);

                                        listAddData.$loaded().then(function (response) {
                                            for (i = 0; i < response.length; i++) {

                                                var tambahData = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran");
                                                tambahData.push({
                                                    "idTryout": $stateParams.idTryout,
                                                    "namaTryout": $stateParams.namaTryout,
                                                    "jenjang": $stateParams.jenjang,
                                                    "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
                                                    "namaKota": $stateParams.namaKota,
                                                    "namaProvinsi": $stateParams.namaProvinsi,
                                                    "semester": $stateParams.semester,
                                                    "tahunAjaran": $stateParams.tahunAjaran,
                                                    "idPelajaranTryout": response[i].$id,
                                                    "idPelajaran": response[i].idPelajaran,
                                                    "pelajaran": response[i].pelajaran,

                                                    "idPengguna": data.$id,
                                                    "namaPengguna": data.namaPengguna,
                                                    "uid": data.uid,
                                                    "idSekolah": data.idSekolah,

                                                    "benar": 0,
                                                    "salah": 0,
                                                    "kosong": 0,
                                                    "nilai": 0,
                                                    "statusFinish": false,
                                                    "bukaUjianSekarang": false,
                                                    "tutupUjianSekarang": false,
                                                    "jumlahSoal": 0,
                                                    "statusTerjawab": false,

                                                    "filter": $stateParams.idTryout + "_" + response[i].$id + "_" + data.uid,
                                                    "filterMulaiUjian": $stateParams.idTryout + "_" + data.uid,

                                                    "jamDiMulai": "",
                                                    "jamBerakhir": "",
                                                    "jamSelesai": "",
                                                    "jamDurasiUjian": "",

                                                }).then(function (resp) {
                                                    $ionicLoading.hide();
                                                    console.log("successjawabanOlimpiadeSiswaPerPelajaran");
                                                    var updateDataSiswa = firebase.database().ref("dataSiswa/" + data.$id);
                                                    updateDataSiswa.update(JSON.parse(JSON.stringify({
                                                        "registrasiOlimpiade": $scope.data.idTryout
                                                    }))).then(function (resp) {
                                                        console.log("dataSiswaDiUpdate")
                                                    })

                                                })

                                            }
                                        });
                                        var refPesertaOlimpiade = firebase.database().ref("pesertaOlimpiade").orderByChild("idTryout").equalTo($scope.data.idTryout);
                                        var listPesertaOlimpiade = $firebaseArray(refPesertaOlimpiade);

                                        listPesertaOlimpiade.$loaded().then(function (response) {
                                            $scope.totalPesertaOlimpiade = response.length;
                                            if (response.length !== 0) {
                                                $scope.aktif = true;
                                            }
                                        });

                                        $ionicPopup.alert({
                                            title: 'SUKSES',
                                            template: 'REGISTRASI SUKSES',
                                        })

                                    });


                                });
                            }
                            else {
                                $ionicLoading.hide()
                                $ionicPopup.alert({
                                    title: 'PERHATIAN',
                                    template: 'Maaf, Data siswa ini sudah diregistrasikan, cek kembali, terima kasih',
                                })
                            }
                        });

                    }
                    return true;
                },

            });

        };

        var refPesertaOlimpiade = firebase.database().ref("pesertaOlimpiade").orderByChild("idTryout").equalTo($scope.data.idTryout);
        var listPesertaOlimpiade = $firebaseArray(refPesertaOlimpiade);

        listPesertaOlimpiade.$loaded().then(function (response) {
            $scope.totalPesertaOlimpiade = response.length;
            if (response.length !== 0) {
                $scope.aktif = true;
            }
        });

        $scope.pesertaTeregistrasi = function () {
            $state.go('menuGuru.pesertaTeregistrasiSOCGuru', {
                "idTryout": $stateParams.idTryout,
                "namaTryout": $stateParams.namaTryout,
                "jenjang": $stateParams.jenjang,
                "kelas": $stateParams.kelas,
                "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
                "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
                "id_provinsi": $stateParams.id_provinsi
            });
        };

    }])

    .controller('logHistoriSOCGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "namaTryout": $stateParams.namaTryout,
            "jenjang": $stateParams.jenjang,
            "kelas": $stateParams.kelas,
            "id_kota_kabupaten": $stateParams.id_kota_kabupaten,
            "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
            "id_provinsi": $stateParams.id_provinsi
        }
        //console.log($scope.data);

        var ref = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran").orderByChild("idTryout").equalTo($scope.data.idTryout);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSiswa = response;
        })

    }])