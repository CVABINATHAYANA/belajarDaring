angular.module('app.berandaSekolah', [])

    .controller('authSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', '$ionicViewService', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http, $ionicViewService) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        // $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        // $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        // $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        // $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        // $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        // $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah')

        // console.log($scope.idPenggunaSekolah);
        // console.log($scope.idSekolah);
        // console.log($scope.namaPenggunaSekolah);
        // console.log($scope.jenjangSekolah);
        // console.log($scope.namaSekolah);
        // console.log($scope.uidSekolah);
        // console.log($scope.idProvinsiSekolah);
        // console.log($scope.idKotaKabupatenSekolah);
        // console.log($scope.idKecamatanSekolah)

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        if ($scope.idSekolah) {
            $state.go('menuSekolah.berandaSekolah');
            $ionicViewService.nextViewOptions({ disableBack: true });
        }

        var akses = firebase.database().ref("adminSekolah/" + $scope.idPenggunaSekolah);
        $ionicLoading.show();
        akses.on("value", function (snapshot) {
            $ionicLoading.hide();
            $scope.ijinkanAkses = snapshot.val().ijinPenggunaanAplikasi;
        })

        $scope.formData = {
            "idProvinsi": '',
            "idKotaKabupaten": '',
            "idKecamatan": '',
            "jenjang": '',
            "idSekolah": '',

            "noHandphone": '',
            "jenisKelamin": '',
            "alamat": '',
        };

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi");
        var listProvinsi = $firebaseArray(refProvinsi);

        listProvinsi.$loaded().then(function (response) {
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
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
        };

        $scope.getIdKotaKabupaten = function () {
            var idKotaKabupaten = $scope.formData.idKotaKabupaten;

            //Get Nama Kota Kabupaten
            var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
            listNamaKotaKabupaten.$loaded().then(function (response) {
                $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
                console.log($scope.namaKotaKabupaten);
            });

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);
            //console.log($scope.dataKecamatan);
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
                console.log($scope.kodeSekolah)
            })
        };

        $scope.daftar = function () {
            //console.log($scope.formData);
            // console.log("ini",$scope.formData.idProvinsi);
            // console.log("kota",$scope.formData.idKotaKabupaten);
            // console.log("kec", $scope.formData.idKecamatan);
            // console.log("jenjang", $scope.formData.jenjang);
            // console.log("seko", $scope.formData.idSekolah);
            // console.log("hp", $scope.formData.noHandphone);
            // console.log("lamin", $scope.formData.jenisKelamin);
            // console.log("alm", $scope.formData.alamat)

            if ($scope.formData.idProvinsi !== "" && $scope.formData.idKotaKabupaten !== "" && $scope.formData.idKecamatan !== "" && $scope.formData.jenjang !== "" && $scope.formData.idSekolah !== "" && $scope.formData.noHandphone !== "" && $scope.formData.jenisKelamin !== "" && $scope.formData.alamat !== "") {

                $ionicLoading.show();
                //Entry Data Pengguna
                var refAddPengguna = firebase.database().ref("adminSekolah/" + $scope.idPenggunaSekolah);
                refAddPengguna.update(JSON.parse(JSON.stringify({
                    "idProvinsi": $scope.formData.idProvinsi,
                    "namaProvinsi": $scope.namaProvinsi,
                    "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                    "namaKotaKabupaten": $scope.namaKotaKabupaten,
                    "idKecamatan": $scope.formData.idKecamatan,
                    "namaKecamatan": $scope.namaKecamatan,
                    "jenjang": $scope.formData.jenjang,
                    "idSekolah": $scope.formData.idSekolah,
                    "kodeSekolah": $scope.kodeSekolah,
                    "namaSekolah": $scope.namaSekolah,
                    "alamat": $scope.formData.alamat,
                    "jenisKelamin": $scope.formData.jenisKelamin,


                    "noHandphone": $scope.formData.noHandphone,

                    "filterRegistrasiKota": $scope.formData.jenjang + "_" + $scope.formData.idKotaKabupaten,
                    "filterRegistrasiProvinsi": $scope.formData.jenjang + "_" + $scope.formData.idProvinsi,


                }))).then(function (resp) {
                    $ionicLoading.hide();
                    //Ambil Data Pengguna
                    var dataPengguna = firebase.database().ref("adminSekolah").orderByChild("uid").equalTo($scope.uidSekolah);
                    var listGetID = $firebaseArray(dataPengguna);

                    listGetID.$loaded().then(function (response) {
                        // console.log(response);


                        localStorage.setItem('idSekolah', response[0].idSekolah);
                        localStorage.setItem('kodeSekolah', response[0].kodeSekolah);
                        localStorage.setItem('jenjangSekolah', response[0].jenjang);
                        localStorage.setItem('namaSekolah', response[0].namaSekolah);
                        localStorage.setItem('idKecamatanSekolah', response[0].idKecamatan);
                        localStorage.setItem('idKotaKabupatenSekolah', response[0].idKotaKabupaten);
                        localStorage.setItem('idProvinsiSekolah', response[0].idProvinsi)

                        localStorage.setItem('namaKecamatanSekolah', response[0].namaKecamatan);


                        $state.go('menuSekolah.berandaSekolah');
                    }).then(function (resp) {
                        window.location.reload(true);
                        $ionicViewService.nextViewOptions({ disableBack: true });
                    })
                });
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Seluruh Data Harus Diisi, Terima Kasih',
                    okType: 'button-balanced'
                });
            }
        };

    }])

    .controller('berandaSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', '$ionicViewService', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http, $ionicViewService) {

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


        // console.log($scope.idPenggunaSekolah);
        // console.log($scope.idSekolah);
        // console.log($scope.namaPenggunaSekolah);
        // console.log($scope.jenjangSekolah);
        // console.log($scope.namaSekolah);
        // console.log($scope.uidSekolah);
        // console.log($scope.idProvinsiSekolah);
        // console.log($scope.idKotaKabupatenSekolah);
        // console.log($scope.idKecamatanSekolah)

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        if (!$scope.idSekolah) {
            $state.go('menuSekolah.authSekolah');
            $ionicViewService.nextViewOptions({ disableBack: true });
        }

        if($scope.kodeSekolah==="undefined"){
            var dataSekolahAdmin = firebase.database().ref("dataSekolahIndonesia/"+$scope.idSekolah);
            dataSekolahAdmin.on("value", function(snapshot){
                console.log(snapshot.val());
                var kodeKode = snapshot.val().id_sekolah;

                var updateDataPengguna = firebase.database().ref("adminSekolah/"+$scope.idPenggunaSekolah);
                updateDataPengguna.update(JSON.parse(JSON.stringify({
                    "kodeSekolah": kodeKode
                }))).then(function(resp){
                    localStorage.removeItem('idPenggunaSekolah');
                    localStorage.removeItem('idSekolah');
                    localStorage.removeItem('namaPenggunaSekolah');
                    localStorage.removeItem('jenjangSekolah');
                    localStorage.removeItem('namaSekolah');
                    localStorage.removeItem('uidSekolah');
                    localStorage.removeItem('idProvinsiSekolah');
                    localStorage.removeItem('idKotaKabupatenSekolah');
                    localStorage.removeItem('idKecamatanSekolah');
                    localStorage.clear();
                    $state.go("welcome");
                })
            })
        }

        var akses = firebase.database().ref("adminSekolah/" + $scope.idPenggunaSekolah);
        $ionicLoading.show();
        akses.on("value", function (snapshot) {
            $ionicLoading.hide();
            $scope.aksesAplikasi = snapshot.val().aksesAplikasi;
        });

        $scope.dataPokokSekolah = function () {
            $ionicActionSheet.show({
                titleText: 'Data Pokok Sekolah ',
                buttons: [
                    { text: '<i class="icon ion-android-document"></i> Sekolah ' },
                    { text: '<i class="icon ion-android-folder"></i> Prasarana ' },
                    { text: '<i class="icon ion-android-folder-open"></i> Sarana ' },
                    { text: '<i class="icon ion-android-list"></i> Kelas ' },
                    { text: '<i class="icon ion-android-person"></i> Guru ' },
                    { text: '<i class="icon ion-ios-people"></i> Siswa ' },
                    { text: '<i class="icon ion-ios-people"></i> Admin Sekolah ' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Jadwal',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) { $state.go("menuSekolah.dataSekolahEditSekolah") }
                    if (index === 1) { $state.go("menuSekolah.dataPrasaranaSekolah") }
                    if (index === 2) { $state.go("menuSekolah.dataSaranaSekolah") }
                    if (index === 3) { $state.go("menuSekolah.dataKelasSekolah") }
                    if (index === 4) { $state.go("menuSekolah.dataGuruSekolah") }
                    if (index === 5) { $state.go("menuSekolah.dataSiswaSekolah") }
                    if (index === 6) { $state.go("menuSekolah.adminSekolah") }
                    return true;
                },
            });
        }

        $scope.eLearning = function () {
            $ionicActionSheet.show({
                titleText: 'e-Learning ',
                buttons: [
                    { text: '<i class="icon ion-ios-paper-outline"></i> Bank Soal ' },
                    { text: '<i class="icon ion-videocamera"></i> Materi Pelajaran ' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Jadwal',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) { $state.go("menuSekolah.bankSoalSekolah") }
                    if (index === 1) { $state.go("menuSekolah.materiPelajaranSekolah") }
                    return true;
                },
            });
        }

        $scope.ujianOnline = function () {
            $ionicActionSheet.show({
                titleText: 'Ujian Online ',
                buttons: [
                    { text: '<i class="icon ion-ios-book"></i> Ujian Online ' },
                    { text: '<i class="icon ion-ios-box"></i> UTS/UAS ' },
                    // { text: '<i class="icon ion-ios-browsers"></i> Tryout ' },
                    // { text: '<i class="icon ion-trophy"></i> Olimpiade Online ' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Jadwal',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) { $state.go("menuSekolah.ujianOnlineSekolah") }
                    if (index === 1) { $state.go("menuSekolah.UTSUASSekolah") }
                    return true;
                },
            });
        }

        $scope.tentangKami = function () {
            $ionicActionSheet.show({
                titleText: 'Tentang Sekolah ',
                buttons: [
                    { text: '<i class="icon ion-ios-book"></i> Sambutan Kepala Sekolah ' },
                    { text: '<i class="icon ion-ios-box"></i> Struktur Organisasi ' },
                    { text: '<i class="icon ion-ios-browsers"></i> Tupoksi ' },
                    { text: '<i class="icon ion-trophy"></i> Program & Kegiatan ' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Jadwal',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) { $state.go("menuSekolah.sambutanKepalaSekolah") }
                    if (index === 1) { $state.go("menuSekolah.strukturOrganisasi") }
                    if (index === 2) { $state.go("menuSekolah.tugasPokokDanFungsi") }
                    if (index === 3) { $state.go("menuSekolah.programDanKegiatan") }
                    return true;
                },
            });
        }

        $scope.layananKami = function () {
            $ionicActionSheet.show({
                titleText: 'Layanan Dinas Pendidikan : ',
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Legalisir Ijazah' },
                    { text: '<i class="icon ion-ios-list-outline"></i> Mutasi Siswa' },
                    // { text: '<i class="icon ion-ios-list-outline"></i> Rekomendasi Beasiswa Pendidikan' },
                    // { text: '<i class="icon ion-ios-list-outline"></i> Izin Cuti Pegawai' },
                    // { text: '<i class="icon ion-ios-list-outline"></i> Karis, Karsu, Karpeg, Pensiun' },
                    // { text: '<i class="icon ion-ios-list-outline"></i> Surat Rekomendasi/Izin/Dispensasi' },
                    // { text: '<i class="icon ion-ios-list-outline"></i> Usulan Sertifikasi Guru' },
                    { text: '<i class="icon ion-ios-people"></i> Ijin Operational PAUD & PNF' },
                    { text: '<i class="icon ion-android-bulb"></i> Pengaduan' },
                    { text: '<i class="icon ion-arrow-graph-up-right"></i> Pengajuan NPSN' },
                    // { text: '<i class="icon ion-trophy"></i> Permintaan Data Publik' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus SOC',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('menuSekolah.legalisirIjazahSekolah')
                    }
                    if (index === 1) {
                        $state.go('menuSekolah.mutasiSiswa')
                    }
                    // if (index === 2) {
                    //     $state.go('menuSekolah.rekomendasiBeasiswa')
                    // }
                    // if (index === 2) {
                    //     $state.go('menuSekolah.izinCutiPegawai')
                    // }
                    // if (index === 2) {
                    //     $state.go('menuSekolah.karis')
                    // }
                    // if (index === 2) {
                    //     $state.go('menuSekolah.suratRekomendasi')
                    // }
                    // if (index === 2) {
                    //     $state.go('menuSekolah.usulanSertifikasiGuru')
                    // }
                    if (index === 2) {
                        $state.go('menuSekolah.pengajuanIjinOperationalSekolah')
                    }
                    if (index === 3) {
                        $state.go('menuSekolah.pengaduan')
                    }
                    if (index === 4) {
                        $state.go('menuSekolah.pengajuanNPSN')
                    }
                    // if (index === 10) {
                    //     $state.go('menuSekolah.permintaanDataPublik')
                    // }
                    return true;
                },

            });

        };

        $scope.logoutSekolah = function () {

            var confirmPopup = $ionicPopup.confirm({
                title: 'Logout Application',
                template: 'Are you sure to logout this apps?',
                okType: 'button-balanced'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    localStorage.removeItem('idPenggunaSekolah');
                    localStorage.removeItem('idSekolah');
                    localStorage.removeItem('namaPenggunaSekolah');
                    localStorage.removeItem('jenjangSekolah');
                    localStorage.removeItem('namaSekolah');
                    localStorage.removeItem('uidSekolah');
                    localStorage.removeItem('idProvinsiSekolah');
                    localStorage.removeItem('idKotaKabupatenSekolah');
                    localStorage.removeItem('idKecamatanSekolah');
                    localStorage.clear();
                    $state.go("welcome");
                } else {
                    console.log('You are not sure');
                }
            }).then(function (resp) {

            })
        };

    }])
