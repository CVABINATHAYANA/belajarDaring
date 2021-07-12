angular.module('app.berandaGuru', [])

    .controller('authGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', '$ionicViewService', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http, $ionicViewService) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        // $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        // $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        // $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        // $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        // $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        // $scope.namaKotaKabupatenGuru = localStorage.getItem('namaKotaKabupatenGuru');
        // $scope.namaProvinsiGuru = localStorage.getItem('namaProvinsiGuru');
        // $scope.namaSekolahGuru = localStorage.getItem('namaSekolahGuru');
        // $scope.jenisKelaminGuru = localStorage.getItem('jenisKelaminGuru')

        // console.log($scope.idGuru);
        // console.log($scope.namaGuru);
        // console.log($scope.emailGuru);
        // console.log($scope.uidGuru);
        console.log("dariAuth", $scope.idSekolahGuru);
        // console.log($scope.jenjangGuru);
        // console.log($scope.idProvinsiGuru);
        // console.log($scope.idKotaKabupatenGuru);
        // console.log($scope.idKecamatanGuru);
        // console.log($scope.namaKotaKabupatenGuru);
        // console.log($scope.namaProvinsiGuru);
        // console.log($scope.namaSekolahGuru);
        // console.log($scope.jenisKelaminGuru)

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        if ($scope.idSekolahGuru) {
            $state.go('menuGuru.berandaGuru');
            $ionicViewService.nextViewOptions({ disableBack: true });
        }

        var akses = firebase.database(appGuru).ref("dataGuru/" + $scope.idGuru);
        $ionicLoading.show();
        akses.on("value", function (snapshot) {
            $ionicLoading.hide();
            $scope.formData = snapshot.val();
            localStorage.setItem('namaKotaKabupatenGuru', snapshot.val().namaKotaKabupaten);
            localStorage.setItem('namaProvinsiGuru', snapshot.val().namaProvinsi);
            localStorage.setItem('namaSekolahGuru', snapshot.val().namaSekolah);
            localStorage.setItem('jenisKelaminGuru', snapshot.val().jenisKelamin);
            $scope.ijinkanAkses = snapshot.val().ijinPenggunaanAplikasi;
        });

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
            })
        };

        $scope.daftar = function () {

            if ($scope.formData.idProvinsi !== undefined && $scope.formData.idKotaKabupaten !== undefined && $scope.formData.idKecamatan !== undefined && $scope.formData.jenjang !== undefined && $scope.formData.idSekolah !== undefined && $scope.formData.noHandphone !== undefined && $scope.formData.jenisKelamin !== undefined && $scope.formData.alamat !== undefined) {

                $ionicLoading.show();
                //Entry Data Pengguna
                var refAddPengguna = firebase.database(appGuru).ref("dataGuru/" + $scope.idGuru);
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
                    var dataPengguna = firebase.database(appGuru).ref("dataGuru").orderByChild("uid").equalTo($scope.uidGuru);
                    var listGetID = $firebaseArray(dataPengguna);

                    listGetID.$loaded().then(function (response) {
                        // console.log(response);

                        localStorage.setItem('idSekolahGuru', response[0].idSekolah);
                        localStorage.setItem('kodeSekolah', response[0].kodeSekolah);
                        localStorage.setItem('jenjangGuru', response[0].jenjang);
                        localStorage.setItem('idProvinsiGuru', response[0].idProvinsi);
                        localStorage.setItem('idKotaKabupatenGuru', response[0].idKotaKabupaten);
                        localStorage.setItem('idKecamatanGuru', response[0].idKecamatan);
                        localStorage.setItem('namaSekolahGuru', response[0].namaSekolah);
                        localStorage.setItem('idKecamatanGuru', response[0].idKecamatan);
                        localStorage.setItem('namaKecamatanGuru', response[0].namaKecamatan);
                        localStorage.setItem('namaKotaKabupatenGuru', response[0].namaKotaKabupaten);
                        localStorage.setItem('namaProvinsiGuru', response[0].namaProvinsi);
                        localStorage.setItem('jenisKelaminGuru', response[0].jenisKelamin);

                        // $state.go('menuGuru.authGuru')
                        $state.go('menuGuru.berandaGuru');
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
                    okType: 'button-positive'
                });
            }
        };

    }])

    .controller('berandaGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', '$ionicViewService', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http, $ionicViewService) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.namaKotaKabupatenGuru = localStorage.getItem('namaKotaKabupatenGuru');
        $scope.namaProvinsiGuru = localStorage.getItem('namaProvinsiGuru');
        $scope.namaSekolahGuru = localStorage.getItem('namaSekolahGuru');
        $scope.jenisKelaminGuru = localStorage.getItem('jenisKelaminGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

 
        if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahGuru === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }

        // console.log($scope.idGuru);
        // console.log($scope.namaGuru);
        // console.log($scope.emailGuru);
        // console.log($scope.uidGuru);
        // console.log($scope.idSekolahGuru);
        // console.log($scope.jenjangGuru);
        // console.log($scope.idProvinsiGuru);
        // console.log($scope.idKotaKabupatenGuru);
        // console.log($scope.idKecamatanGuru);
        // console.log($scope.namaKotaKabupatenGuru);
        // console.log($scope.namaProvinsiGuru);
        // console.log($scope.namaSekolahGuru);
        // console.log($scope.jenisKelaminGuru);
        // var aksesAplikasi = firebase.database(appGuru).ref("dataGuru").orderByChild("idProvinsi").equalTo("5");
        // var listAksesAplikasi = $firebaseArray(aksesAplikasi);
        // $ionicLoading.show();
        // listAksesAplikasi.$loaded().then(function(repsonse){
        //     for(i=0; i<repsonse.length; i++){
        //         var updateData = firebase.database(appGuru).ref("dataGuru/"+repsonse[i].$id).update(JSON.parse(JSON.stringify({
        //             "aksesAplikasi" : true
        //         }))).then(function(resp){
        //             $ionicLoading.hide();
        //             console.log("Berhasi Di Update")
        //         })
        //     }
        // })

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        if (!$scope.idSekolahGuru) {
            $state.go('menuGuru.authGuru');
            $ionicViewService.nextViewOptions({ disableBack: true });
        }

        if ($scope.kodeSekolah === "undefined") {
            var dataSekolahAdmin = firebase.database().ref("dataSekolahIndonesia/" + $scope.idSekolahGuru);
            dataSekolahAdmin.on("value", function (snapshot) {
                console.log(snapshot.val());
                var kodeKode = snapshot.val().id_sekolah;

                var updateDataPengguna = firebase.database(appGuru).ref("dataGuru/" + $scope.idGuru);
                updateDataPengguna.update(JSON.parse(JSON.stringify({
                    "kodeSekolah": kodeKode
                }))).then(function (resp) {
                    localStorage.removeItem('idGuru');
                    localStorage.removeItem('namaGuru');
                    localStorage.removeItem('emailGuru');
                    localStorage.removeItem('uidGuru');
                    localStorage.removeItem('idSekolahGuru');
                    localStorage.removeItem('jenjangGuru');
                    localStorage.removeItem('idProvinsiGuru');
                    localStorage.removeItem('idKotaKabupatenGuru');
                    localStorage.clear();
                    $state.go("welcome");
                })
            })
        }

        // var versiAplikasiUser = "0.0.11";
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

        var akses = firebase.database(appGuru).ref("dataGuru/" + $scope.idGuru);
        // $ionicLoading.show();
        akses.on("value", function (snapshot) {
            // $ionicLoading.hide();
            $scope.ijinPenggunaanAplikasi = snapshot.val().ijinPenggunaanAplikasi;
            console.log("dataGuru", snapshot.val())
        });

        // PESAN UNTUK GURU
        var pesanUntukGuru = firebase.database().ref("pesanUntukGuru/1").on("value", function (snapshot) {
            $scope.pesanUntukGuru = snapshot.val();
            console.log("pesanUntukGuru", $scope.pesanUntukGuru)
        });

        // ADMIN SEKOLAH
        var adminSekolah = firebase.database().ref("adminSekolah").orderByChild("idSekolah").equalTo($scope.idSekolahGuru);
        var listAdminSekolah = $firebaseArray(adminSekolah);
        listAdminSekolah.$loaded().then(function (response) {
            $scope.adminSekolah = response;
            $scope.jumlahAdminSekolah = response.length;
        })

        var ref = firebase.database(app).ref("groupTugasSiswa").orderByChild("idGuru").equalTo($scope.idGuru);
        var listRef = $firebaseArray(ref);
        // $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            // $ionicLoading.hide();
            $scope.dataTugasSiswa = response
            $scope.tugasGuru = function () {
                $state.go("menuGuru.tugasSiswaGuru", {
                    "dataTugasSiswa": response
                })
            }
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
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Jadwal',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) { $state.go("menuGuru.dataSekolahEditGuru") }
                    if (index === 1) { $state.go("menuGuru.dataPrasaranaGuru") }
                    if (index === 2) { $state.go("menuGuru.dataSaranaGuru") }
                    if (index === 3) { $state.go("menuGuru.dataKelasGuru") }
                    if (index === 4) { $state.go("menuGuru.dataGuruGuru") }
                    if (index === 5) { $state.go("menuGuru.dataSiswaGuru") }
                    return true;
                },
            });
        }

        $scope.eLearning = function () {
            $ionicActionSheet.show({
                titleText: 'e-Learning ',
                buttons: [
                    { text: '<i class="icon ion-ios-paper-outline"></i> Bank Soal ' },
                    { text: '<i class="icon ion-ios-paper-outline"></i> Materi Pelajaran ' },
                    { text: '<i class="icon ion-videocamera"></i> Kelas Virtual ' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Jadwal',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) { $state.go("menuGuru.bankSoalGuru") }
                    if (index === 1) { $state.go("menuGuru.materiPelajaranGuru") }
                    if (index === 2) { window.open("https://monitoringmeeting.com/meeting.php?name=YWRtaW4y&mn=71721572021&email=YW55QGdtYWlsLmNvbQ%3D%3D&pwd=TVd3RHlyWEhUamQwUlg5dCs4R1M5dz09&role=0&lang=en-US&signature=OTV4Y1FVNkRTbXFEdF8xdkJ0SU9Ldy43MTcyMTU3MjAyMS4xNjI1NjExMTMxMDcyLjAuVkZTL3N1NkVaY0tIVlRORFdYelhSTVBoMzZqMWxOcmlvMk1zZXNqQjVXND0&china=0&apiKey=95xcQU6DSmqDt_1vBtIOKw");}
                    return true;
                },
            });
        }

        $scope.ujianOnline = function () {
            $ionicActionSheet.show({
                titleText: 'Data Pokok Sekolah ',
                buttons: [
                    { text: '<i class="icon ion-ios-book"></i> Ujian Online ' },
                    { text: '<i class="icon ion-ios-box"></i> UTS/UAS ' },
                    { text: '<i class="icon ion-ios-browsers"></i> Tryout ' },
                    // { text: '<i class="icon ion-trophy"></i> Olimpiade Online ' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Jadwal',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) { $state.go("menuGuru.ujianOnlineGuru") }
                    if (index === 1) { $state.go("menuGuru.UTSUASGuru") }
                    if (index === 2) { $state.go("menuGuru.tryoutOnlineGuru") }
                    if (index === 3) { $state.go("menuGuru.socGuru") }
                    return true;
                },
            });
        }

        $scope.logoutGuru = function () {

            var confirmPopup = $ionicPopup.confirm({
                title: 'Logout Application',
                template: 'Are you sure to logout this apps?',
                okType: 'button-positive'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    localStorage.removeItem('idGuru');
                    localStorage.removeItem('namaGuru');
                    localStorage.removeItem('emailGuru');
                    localStorage.removeItem('uidGuru');
                    localStorage.removeItem('idSekolahGuru');
                    localStorage.removeItem('jenjangGuru');
                    localStorage.removeItem('idProvinsiGuru');
                    localStorage.removeItem('idKotaKabupatenGuru');
                    localStorage.clear();
                    $state.go("welcome");
                } else {
                    console.log('You are not sure');
                }
            }).then(function (resp) {

            })
        };



    }])

