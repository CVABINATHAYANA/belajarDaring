angular.module('app.berandaSiswa', [])

    .controller('authSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$ionicViewService', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $ionicViewService) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.statusSiswa = localStorage.getItem('statusSiswa');

        var ref = firebase.database(appSiswa).ref("dataSiswa/" + $scope.idPenggunaSiswa);
        $ionicLoading.show();
        ref.on('value', function (snapshot) {
            $ionicLoading.hide();
            $scope.formData = snapshot.val();
        })

        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        if ($scope.idSekolahSiswa) {
            $state.go('menuSiswa.berandaSiswa');
            $ionicViewService.nextViewOptions({ disableBack: true });
        }

        $scope.formData = {

            "idProvinsi": '',
            "idKotaKabupaten": '',
            "idKecamatan": '',
            "jenjang": '',
            "idSekolah": '',
            "tingkatKelas": '',
            "idKelas": '',
            "nomorAbsen": '',

            "noHandphone": '',
            "jenisKelamin": '',
            "alamat": '',


            "idTahunAjaran": '',
            "namaKelas": ''
        };


        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi");
        var listProvinsi = $firebaseArray(refProvinsi);
        $ionicLoading.show();
        listProvinsi.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataProvinsi = response;
        });

        $scope.getIdProvinsi = function () {
            var idProvinsi = $scope.formData.idProvinsi;

            //Get Nama Provinsi
            var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
            var listNamaProvinsi = $firebaseArray(namaProvinsi);
            listNamaProvinsi.$loaded().then(function (response) {
                $scope.namaProvinsi = response[0].nama_provinsi;
                //console.log($scope.namaProvinsi);
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo(idProvinsi);
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

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
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

        $scope.getIdSekolah = function () {
            var idSekolah = $scope.formData.idSekolah;

            var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
            refDataSekolah.on("value", function (snapshot) {
                $scope.namaSekolah = snapshot.val().nama_sekolah;
                $scope.kodeSekolah = snapshot.val().id_sekolah;
            })

            var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
            listRefKelas = $firebaseArray(refKelas);
            $ionicLoading.show();
            listRefKelas.$loaded().then(function (response) {
                $ionicLoading.hide();

                if (response.length == 0) {
                    $scope.tampilBuatKelas = true;
                    $scope.tampilNamaKelas = false;
                }
                else {
                    $scope.tampilBuatKelas = false;
                    $scope.tampilNamaKelas = true;
                }
                $scope.dataKelas = response;

            })
        };

        var tahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        $scope.tahunAjaran = $firebaseArray(tahunAjaran);

        $scope.getTahunAjaran = function () {
            id = $scope.formData.idTahunAjaran;
            var getDataTahunAjaran = firebase.database().ref("tahunAjaran/" + id);
            getDataTahunAjaran.on("value", function (snapshot) {
                $scope.dataTahunAjaran = snapshot.val().tahunAjaran
            })
            var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + id);
            listRefKelas = $firebaseArray(refKelas);
            $ionicLoading.show();
            listRefKelas.$loaded().then(function (response) {
                $ionicLoading.hide();

                if (response.length === 0) {
                    $scope.tampilBuatKelas = true;
                    $scope.tampilNamaKelas = false;
                }
                else {
                    $scope.tampilBuatKelas = false;
                    $scope.tampilNamaKelas = true;
                }
                $scope.dataKelas = response;

            })
        }

        $scope.buatKelasBaru = function () {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.getTahunAjaran = function () {
                    var id = $scope.formData.idTahunAjaran;
                    var tahunAjaran = firebase.database().ref("tahunAjaran/" + id);
                    tahunAjaran.on("value", function (snapshot) {
                        $scope.namaTahunAjaran = snapshot.val().tahunAjaran
                    })
                }

                $scope.simpan = function () {
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                    if ($scope.formData.idTahunAjaran !== "" && $scope.formData.tingkatKelas !== "" && $scope.formData.namaKelas !== "" && $scope.formData.idPrasarana !== "" ) {

                        //cek
                        var refCek = firebase.database().ref("dataKelas").orderByChild("filter_input").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas);
                        var listRefCek = $firebaseArray(refCek);
                        listRefCek.$loaded().then(function (response) {
                            if (response.length === 0) {
                                $ionicLoading.show();
                                var insertData = firebase.database().ref("dataKelas");
                                insertData.push(JSON.parse(JSON.stringify({
                                    "idTahunAjaran": $scope.formData.idTahunAjaran,
                                    "tahunAjaran": $scope.namaTahunAjaran,
                                    "tingkatKelas": $scope.formData.tingkatKelas,
                                    "namaKelas": $scope.formData.namaKelas,
                                    // "idPrasarana": $scope.formData.idPrasarana,
                                    // "namaPrasarana": $scope.namaPrasarana,
                                    "createAt": createAt,
                                    "diBuatOleh": "",
                                    "idPembuat": "",
                                    "idSekolah": $scope.formData.idSekolah,
                                    "siswaAbsen": $scope.formData.nomorAbsen,
                                    "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                                    "idKecamatan": $scope.formData.idKecamatan,
                                    "namaKecamatan": $scope.namaKecamatan,
                                    "jenjang": $scope.formData.jenjang,
                                    "namaSekolah": $scope.namaSekolah,
                                    "filter_input": $scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas,
                                    "filter": $scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran,
                                    "filterKecamatanJenjang": $scope.formData.idKecamatan + "_" + $scope.formData.jenjang,
                                    "filterKecamatanJenjangIdSekolah": $scope.formData.idKecamatan + "_" + $scope.formData.jenjang + "_" + r$scope.formData.idSekolah
                                }))).then(function (resp) {
                                    $ionicLoading.hide();
                                    $scope.modal.hide();

                                    var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
                                    listRefKelas = $firebaseArray(refKelas);
                                    $ionicLoading.show();
                                    listRefKelas.$loaded().then(function (response) {
                                        $ionicLoading.hide();

                                        if (response.length === 0) {
                                            $scope.tampilBuatKelas = true;
                                            $scope.tampilNamaKelas = false;
                                        }
                                        else {
                                            $scope.tampilBuatKelas = false;
                                            $scope.tampilNamaKelas = true;
                                        }
                                        $scope.dataKelas = response;

                                    })
                                })
                            }
                            else if (response.length === 1) {
                                $ionicLoading.hide();

                                $ionicPopup.alert({
                                    title: 'Perhatian',
                                    template: 'Maaf, Data Kelas Yang Anda Masukkan Sudah Tersedia Di Tahun Ajaran Terpilih, Silahkan Cek Kembali, Terimakasih',

                                });
                            }
                        })

                    }
                    else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Semua Data Harus Diisi, terima kasih',

                        });
                    }
                };
            });
        }

        $scope.getKelas = function () {
            id = $scope.formData.idKelas;
            console.log(id)
            if (id !== "1") {
                var getDataKelas = firebase.database().ref("dataKelas/" + id);
                getDataKelas.on("value", function (snapshot) {
                    $scope.namaKelas = snapshot.val().namaKelas;
                    // console.log($scope.namaKelas)
                })
            }
            else if (id === "1") {
                // $scope.namaKelas = "buatKelasBaru";
                // console.log($scope.namaKelas)
                // console.log('BuatKelasBaru');
                $ionicModal.fromTemplateUrl('templates/modal.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();

                    // $scope.formData = {
                    //     "idTahunAjaran": "",
                    //     "tingkatKelas": "",
                    //     "namaKelas": "",
                    //     // "idPrasarana": "",
                    // }

                    $scope.getTahunAjaran = function () {
                        var id = $scope.formData.idTahunAjaran;
                        var tahunAjaran = firebase.database().ref("tahunAjaran/" + id);
                        tahunAjaran.on("value", function (snapshot) {
                            $scope.namaTahunAjaran = snapshot.val().tahunAjaran
                        })
                    }

                    // $scope.getPrasarana = function () {
                    //     var id = $scope.formData.idPrasarana;
                    //     var prasarana = firebase.database().ref("dataPrasarana/" + id);
                    //     prasarana.on("value", function (snapshot) {
                    //         $scope.namaPrasarana = snapshot.val().namaPrasarana
                    //         console.log($scope.namaPrasarana)
                    //     })
                    // }

                    $scope.simpan = function () {
                        var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                        if ($scope.formData.idTahunAjaran !== "" && $scope.formData.tingkatKelas !== "" && $scope.formData.namaKelas !== "" && $scope.formData.idPrasarana !== "") {

                            //cek
                            var refCek = firebase.database().ref("dataKelas").orderByChild("filter_input").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas);
                            var listRefCek = $firebaseArray(refCek);
                            listRefCek.$loaded().then(function (response) {
                                if (response.length === 0) {
                                    $ionicLoading.show();
                                    var insertData = firebase.database().ref("dataKelas");
                                    insertData.push(JSON.parse(JSON.stringify({
                                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                                        "tahunAjaran": $scope.namaTahunAjaran,
                                        "tingkatKelas": $scope.formData.tingkatKelas,
                                        "namaKelas": $scope.formData.namaKelas,
                                        // "idPrasarana": $scope.formData.idPrasarana,
                                        // "namaPrasarana": $scope.namaPrasarana,
                                        "createAt": createAt,
                                        "diBuatOleh": "",
                                        "idPembuat": "",
                                        "idSekolah": $scope.formData.idSekolah,
                                        "siswaAbsen": $scope.formData.nomorAbsen,
                                        "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                                        "idKecamatan": $scope.formData.idKecamatan,
                                        "namaKecamatan": $scope.namaKecamatan,
                                        "jenjang": $scope.formData.jenjang,
                                        "namaSekolah": $scope.namaSekolah,
                                        "filter_input": $scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas,
                                        "filter": $scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran
                                    }))).then(function (resp) {
                                        $ionicLoading.hide();
                                        $scope.modal.hide();
                                    })
                                }
                                else if (response.length === 1) {
                                    $ionicLoading.hide();

                                    $ionicPopup.alert({
                                        title: 'Perhatian',
                                        template: 'Maaf, Data Kelas Yang Anda Masukkan Sudah Tersedia Di Tahun Ajaran Terpilih, Silahkan Cek Kembali, Terimakasih',

                                    });
                                }
                            })

                        }
                        else {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'Perhatian',
                                template: 'Maaf, Semua Data Harus Diisi, terima kasih',

                            });
                        }
                    };
                });
            }
        }

        $scope.daftar = function () {
            console.log($scope.formData);
            console.log($scope.formData.noHandphone);

            if ($scope.formData.nomorAbsen !== undefined && $scope.formData.idProvinsi !== undefined && $scope.formData.idKotaKabupaten !== undefined && $scope.formData.idKecamatan !== undefined && $scope.formData.jenjang !== undefined && $scope.formData.idSekolah !== undefined && $scope.formData.tingkatKelas !== undefined && $scope.formData.idKelas !== undefined && $scope.formData.noHandphone !== undefined && $scope.formData.jenisKelamin !== undefined && $scope.formData.alamat !== undefined && $scope.formData.idTahunAjaran !== undefined) {
                var noAbsen = $scope.formData.nomorAbsen;
                //Entry Data Pengguna
                var refAddPengguna = firebase.database(appSiswa).ref("dataSiswa/" + $scope.idPenggunaSiswa);
                refAddPengguna.update(JSON.parse(JSON.stringify({

                    "idProvinsi": $scope.formData.idProvinsi,
                    "namaProvinsi": $scope.namaProvinsi,
                    "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                    "namaKotaKabupaten": $scope.namaKotaKabupaten,
                    "idKecamatan": $scope.formData.idKecamatan,
                    "namaKecamatan": $scope.namaKecamatan,
                    "jenjang": $scope.formData.jenjang,
                    "idSekolah": $scope.formData.idSekolah,
                    "siswaAbsen": noAbsen,
                    "kodeSekolah": $scope.kodeSekolah,
                    "namaSekolah": $scope.namaSekolah,
                    "alamat": $scope.formData.alamat,
                    "jenisKelamin": $scope.formData.jenisKelamin,


                    "noHandphone": $scope.formData.noHandphone,

                    "filterRegistrasiKota": $scope.formData.jenjang + "_" + $scope.formData.idKotaKabupaten,
                    "filterRegistrasiProvinsi": $scope.formData.jenjang + "_" + $scope.formData.idProvinsi,

                    "idTahunAjaran": $scope.formData.idTahunAjaran,
                    "tahunAjaran": $scope.dataTahunAjaran,
                    "idKelas": $scope.formData.idKelas,
                    "namaKelas": $scope.namaKelas,
                    "tingkatKelas": $scope.formData.tingkatKelas,

                    "filterKecamatanJenjang": $scope.formData.idKecamatan + "_" + $scope.formData.jenjang,
                    "filterKecamatanJenjangIdSekolah": $scope.formData.idKecamatan + "_" + $scope.formData.jenjang + "_" + $scope.formData.idSekolah,
                    "ijinkanPenggunaanAplikasi":true
                }))).then(function (resp) {
                    var getDataSiswa = firebase.database(appSiswaSekolah).ref("dataSiswa");
                    getDataSiswa.push({
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.dataTahunAjaran,
                        "idKelas": $scope.formData.idKelas,
                        "namaKelas": $scope.namaKelas,
                        "tingkatKelas": $scope.formData.tingkatKelas,
                        "namaSiswa" : $scope.namaPenggunaSiswa,
                        "idSiswa" : $scope.idPenggunaSiswa,
                        "siswaAbsen": noAbsen,
                    }).then(function (res) {
                        $ionicLoading.hide();
                        //Ambil Data Pengguna
                        var dataPengguna = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo($scope.uidSiswa);
                        var listGetID = $firebaseArray(dataPengguna);

                        listGetID.$loaded().then(function (response) {
                            //console.log(response);

                            localStorage.setItem('idSekolahSiswa', response[0].idSekolah);
                            localStorage.setItem('jenjangSiswa', response[0].jenjang);
                            localStorage.setItem('idProvinsiSiswa', response[0].idProvinsi);
                            localStorage.setItem('idKotaKabupatenSiswa', response[0].idKotaKabupaten);
                            localStorage.setItem('idKecamatanSiswa', response[0].idKecamatan);
                            localStorage.setItem('statusSiswa', response[0].statusSiswa);
                            localStorage.setItem('namaSekolahSiswa', response[0].namaSekolah);
                            localStorage.setItem('namaKotaKabupatenSiswa', response[0].namaKotaKabupaten);
                            localStorage.setItem('namaProvinsiSiswa', response[0].namaProvinsi);
                            localStorage.setItem('namaKelasSiswa', response[0].namaKelas);
                            localStorage.setItem('jenisKelaminSiswa', response[0].jenisKelamin);
                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah);

                            $state.go('menuSiswa.berandaSiswa');
                        }).then(function (resp) {
                            window.location.reload(true);
                            $ionicViewService.nextViewOptions({ disableBack: true });
                        })
                    })

                });

            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Seluruh Data Harus Diisi, Terima Kasih',
                    okType: 'button-positive'
                });
            }
        };

    }])

    .controller('berandaSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$ionicViewService', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $ionicViewService) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa');
        $scope.statusSiswa = localStorage.getItem('statusSiswa');
        $scope.namaSekolahSiswa = localStorage.getItem('namaSekolahSiswa');
        $scope.namaKotaKabupatenSiswa = localStorage.getItem('namaKotaKabupatenSiswa');
        $scope.namaProvinsiSiswa = localStorage.getItem('namaProvinsiSiswa');
        $scope.jenisKelaminSiswa = localStorage.getItem('jenisKelaminSiswa');
        $scope.namaKelasSiswa = localStorage.getItem('namaKelasSiswa');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah');

        if ($scope.idSekolahSiswa === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        console.log(app, $scope.kodeSekolah)

        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        if (!$scope.idSekolahSiswa) {
            $state.go('menuSiswa.authSiswa');
            $ionicViewService.nextViewOptions({ disableBack: true });
        }

        if($scope.kodeSekolah==="undefined"){
            var dataSekolahAdmin = firebase.database().ref("dataSekolahIndonesia/"+$scope.idSekolahSiswa);
            dataSekolahAdmin.on("value", function(snapshot){
                console.log(snapshot.val());
                var kodeKode = snapshot.val().id_sekolah;

                var updateDataPengguna = firebase.database(appSiswa).ref("dataSiswa/"+$scope.idPenggunaSiswa);
                updateDataPengguna.update(JSON.parse(JSON.stringify({
                    "kodeSekolah": kodeKode
                }))).then(function(resp){
                    localStorage.removeItem('idPenggunaSiswa');
                    localStorage.removeItem('namaPenggunaSiswa');
                    localStorage.removeItem('emailSiswa');
                    localStorage.removeItem('uidSiswa');
                    localStorage.removeItem('idSekolahSiswa');
                    localStorage.removeItem('jenjangSiswa');
                    localStorage.removeItem('idProvinsiSiswa');
                    localStorage.removeItem('idKotaKabupatenSiswa');
                    localStorage.removeItem('idKecamatanSiswa');
                    localStorage.clear();
                    $state.go("welcome");
                })
            })
        }

        // var versiAplikasiUser = "0.0.1";
        // // VERSI APLIKASI
        // var versiAplikasi = firebase.database().ref("versiAplikasi/1");
        // versiAplikasi.on("value", function (snapshot) {
        //     $scope.update = snapshot.val();
        //     $scope.versiAplikasiMaster = snapshot.val().versi;
        //     // IJINKAN AKSES
        //     if (versiAplikasiUser === $scope.versiAplikasiMaster) {
        //         $scope.akses = true;
        //     }
        //     else {
        //         $scope.akses = false;
        //     }
        // });

        // ADMIN SEKOLAH
        var adminSekolah = firebase.database().ref("adminSekolah").orderByChild("idSekolah").equalTo($scope.idSekolahSiswa);
        var listAdminSekolah = $firebaseArray(adminSekolah);
        listAdminSekolah.$loaded().then(function (response) {
            $scope.adminSekolah = response;
            $scope.jumlahAdminSekolah = response.length;
        })

        // //Cek Tugas Siswa 
        // var ref = firebase.database(appTugas).ref("tugasSiswa").orderByChild("statusDibaca").equalTo($scope.idPenggunaSiswa+"_"+false);
        // var listRef = $firebaseArray(ref);
        // listRef.$loaded().then(function (response) {
        //     $scope.tugasYangBelumDibaca = response.length;
        // });

        $scope.goToPesan = function(){
            $ionicPopup.alert({
                title: 'Information',
                template: 'Hi, '+$scope.namaPenggunaSiswa+' Belum ada pesan yang ditampilkan untuk Anda. Cek kembali lagi ya',
                okType: 'button-positive'
            });
        }

        $scope.goToTugas = function(){
            $state.go('menuSiswa.tugasSiswa')
        }

        $scope.goMeeting = function(){
            window.open("https://monitoringmeeting.com/meeting.php?name=YWRtaW4y&mn=71721572021&email=YW55QGdtYWlsLmNvbQ%3D%3D&pwd=TVd3RHlyWEhUamQwUlg5dCs4R1M5dz09&role=0&lang=en-US&signature=OTV4Y1FVNkRTbXFEdF8xdkJ0SU9Ldy43MTcyMTU3MjAyMS4xNjI1NjExMTMxMDcyLjAuVkZTL3N1NkVaY0tIVlRORFdYelhSTVBoMzZqMWxOcmlvMk1zZXNqQjVXND0&china=0&apiKey=95xcQU6DSmqDt_1vBtIOKw");
        }

        var ref = firebase.database(appSiswa).ref("dataSiswa/" + $scope.idPenggunaSiswa);
        $ionicLoading.show();
        ref.on('value', function (snapshot) {
            $ionicLoading.hide();
            $scope.formData = snapshot.val();
            console.log(snapshot.val())
            $scope.ijinkanPenggunaanAplikasi = snapshot.val().ijinkanPenggunaanAplikasi;
        });

        var pesan = firebase.database(appSiswa).ref("pesan/1");
        pesan.on('value', function(snapshot){
            $scope.pesanKeSiswa = snapshot.val();
            console.log(snapshot.val().link)
        })

        $scope.logoutSiswa = function () {

            var confirmPopup = $ionicPopup.confirm({
                title: 'Logout Application',
                template: 'Are you sure to logout this apps?',
                okType: 'button-positive'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    localStorage.removeItem('idPenggunaSiswa');
                    localStorage.removeItem('namaPenggunaSiswa');
                    localStorage.removeItem('emailSiswa');
                    localStorage.removeItem('uidSiswa');
                    localStorage.removeItem('idSekolahSiswa');
                    localStorage.removeItem('jenjangSiswa');
                    localStorage.removeItem('idProvinsiSiswa');
                    localStorage.removeItem('idKotaKabupatenSiswa');
                    localStorage.removeItem('idKecamatanSiswa');
                    localStorage.clear();
                    $state.go("welcome");
                } else {
                    console.log('You are not sure');
                }
            }).then(function (resp) {

            })
        };

    }])

    .controller('kelasLintasMinatCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$ionicViewService', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $ionicViewService) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa');
        $scope.statusSiswa = localStorage.getItem('statusSiswa');
        $scope.namaSekolahSiswa = localStorage.getItem('namaSekolahSiswa');
        $scope.namaKotaKabupatenSiswa = localStorage.getItem('namaKotaKabupatenSiswa');
        $scope.namaProvinsiSiswa = localStorage.getItem('namaProvinsiSiswa');
        $scope.jenisKelaminSiswa = localStorage.getItem('jenisKelaminSiswa');
        $scope.namaKelasSiswa = localStorage.getItem('namaKelasSiswa');

        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }
        
        console.log($scope.idPenggunaSiswa)

        var ref = firebase.database(appSiswa).ref("lintasMinat").orderByChild("idSiswa").equalTo($scope.idPenggunaSiswa);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function(response){
            $ionicLoading.hide();
            $scope.dataKelas = response;
        })

       

    }])

    .controller('kelasLintasMinatTambahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$ionicViewService', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $ionicViewService) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa');
        $scope.statusSiswa = localStorage.getItem('statusSiswa');
        $scope.namaSekolahSiswa = localStorage.getItem('namaSekolahSiswa');
        $scope.namaKotaKabupatenSiswa = localStorage.getItem('namaKotaKabupatenSiswa');
        $scope.namaProvinsiSiswa = localStorage.getItem('namaProvinsiSiswa');
        $scope.jenisKelaminSiswa = localStorage.getItem('jenisKelaminSiswa');
        $scope.namaKelasSiswa = localStorage.getItem('namaKelasSiswa');

        console.log($scope.idPenggunaSiswa)

        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        $scope.tambah = function () {
            console.log('yes');
        }

        $scope.formData = {
            'idKelas': '',
        }

        var tahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        var listTahunAjaran = $firebaseArray(tahunAjaran);
        $ionicLoading.show();
        listTahunAjaran.$loaded().then(function (response) {
            $ionicLoading.hide();

            var refKelas = firebase.database().ref("dataKelas").orderByChild("filterJenisRombel").equalTo($scope.idSekolahSiswa + "_" + response[0].$id + "_Lintas Minat");
            listRefKelas = $firebaseArray(refKelas);
            $ionicLoading.show();
            listRefKelas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKelas = response;
            })
        });

        $scope.getData = function (data, $index) {
            // console.log(data)
            // console.log($scope.formData.idKelas[$index]);
            if ($scope.formData.idKelas[$index] === true) {
                // Cek dulu, apakah datanya ada atau tidak, kalau tidak ada, maka insert, kalau ada, maka update;
                var siswa = firebase.database(appSiswa).ref("dataSiswa/" + $scope.idPenggunaSiswa + "/kelasSiswa").orderByChild("idKelas").equalTo(data.$id);
                var listSiswa = $firebaseArray(siswa);
                listSiswa.$loaded().then(function (response) {
                    console.log(response.length);
                    if (response.length === 0) {

                        var insertData = firebase.database(appSiswa).ref("dataSiswa/" + $scope.idPenggunaSiswa + "/kelasSiswa").push({
                            "idKelas": data.$id,
                            "idTahunAjaran": data.idTahunAjaran,
                            "namaKelas": data.namaKelas,
                            "tahunAjaran": data.tahunAjaran,
                            "tingkatKelas": data.tingkatKelas,
                            "jenis": "Lintas Minat"
                        }).then(function (resp) {
                            console.log('inserted');
                        })
                    }
                    else {
                        var key = response[0].$id;
                        var updateData = firebase.database(appSiswa).ref("dataSiswa/" + $scope.idPenggunaSiswa + "/kelasSiswa/" + key).update(JSON.parse(JSON.stringify({
                            "idKelas": data.$id,
                            "idTahunAjaran": data.idTahunAjaran,
                            "namaKelas": data.namaKelas,
                            "tahunAjaran": data.tahunAjaran,
                            "tingkatKelas": data.tingkatKelas,
                            "jenis": "Lintas Minat"
                        }))).then(function (resp) {
                            console.log('updated');
                        })
                    }
                })
            }
            else if ($scope.formData.idKelas[$index] === false) {
                // Cari datanya, kemudian hapus;
                var siswa = firebase.database(appSiswa).ref("dataSiswa/" + $scope.idPenggunaSiswa + "/kelasSiswa").orderByChild("idKelas").equalTo(data.$id);
                var listSiswa = $firebaseArray(siswa);
                listSiswa.$loaded().then(function (response) {
                    console.log(response.length);
                    if (response.length === 0) {
                        console.log('tidakAdaYangDihapus')
                    }
                    else {
                        var key = response[0].$id;
                        var hapus = firebase.database(appSiswa).ref("dataSiswa/" + $scope.idPenggunaSiswa + "/kelasSiswa/" + key);
                        var objHapus = $firebaseObject(hapus);
                        objHapus.$remove().then(function (resp) {
                            console.log('sudahDiHapus')
                        })
                    }
                })
            }
        }

        $scope.simpan = function () {
            $state.go("menuSiswa.kelasLintasMinat")
        }

    }])

