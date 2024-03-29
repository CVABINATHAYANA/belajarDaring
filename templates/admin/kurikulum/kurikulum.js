angular.module('app.kurikulumAdmin', [])

    .controller('jadwalPelajaranAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')
        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        $scope.tambah = function () {
            $state.go("menuAdmin.jadwalPelajaranTambahAdmin");
        }
        var appJadwalPelajaranGuru = appJadwalPelajaran;
        var dataKecamatan = firebase.database(appJadwalPelajaranGuru).ref("groupJadwalPelajaranGuru").orderByChild("idKotaKabupaten").equalTo("id-buleleng");
        var listDataKecamatan = $firebaseArray(dataKecamatan);
        listDataKecamatan.$loaded().then(function(response){
            $scope.groupKecamatan = response;
            $scope.jadwalPerKecamatan = $scope.groupKecamatan.groupBy('namaKecamatan');
            $scope.jumlahSekolah = $scope.jadwalPerKecamatan.length;
            console.log($scope.jadwalPerKecamatan);

        })

        $scope.getData = function (x,y) {
            $state.go("menuAdmin.jadwalPelajaranPerKecamatanAdmin", {
                "namaKecamatan": x,
                "idKecamatan": y[0].idKecamatan,
                "jumlahGuru": y.length,
            })
        }

        // $scope.totalJadwal = []
        // $scope.count = 0;
        // $scope.loadMore = function () {
        //     var ref = firebase.database().ref("groupJadwalPelajaranGuru").orderByChild("idSekolah").equalTo($scope.data.idSekolah).limitToLast($scope.count += 100);
        //     var listRef = $firebaseArray(ref);
        //     $ionicLoading.show();
        //     listRef.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         $scope.jadwalPelajaran = response;
        //         // console.log($scope.jadwalPelajaran);
        //         console.log("inilahDatanya",$scope.count)

        //         if ($scope.jadwalPelajaran.length === $scope.banyakData) {
        //             $scope.noMoreItemsAvailable = true;
        //             console.log("totalDataTerakhir", $scope.banyakData);
        //         }
        //         $scope.$broadcast('scroll.infiniteScrollComplete');
        //     });
        // }

    }])

    .controller('jadwalPelajaranPerKecamatanAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')
        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }
        $scope.data = {
            "idKecamatan": $stateParams.idKecamatan,
            "namaKecamatan": $stateParams.namaKecamatan,
            "jumlahGuru":$stateParams.jumlahGuru,
        }

        var appJadwalPelajaranGuru = appJadwalPelajaran;
        var dataSekolah = firebase.database(appJadwalPelajaranGuru).ref("groupJadwalPelajaranGuru").orderByChild("idKecamatan").equalTo($scope.data.idKecamatan);
        var listDataSekolah = $firebaseArray(dataSekolah);
        listDataSekolah.$loaded().then(function(response){
            $scope.groupSekolah= response;
            $scope.jadwalPerSekolah= $scope.groupSekolah.groupBy('namaSekolah');
            $scope.jumlahSekolah = $scope.jadwalPerSekolah.length;
            // console.log($scope.jadwalPerSekolah);

        })

        $scope.getData = function (x,y) {
            // console.log(x);
            // console.log(y[0].idSekolah);
            $state.go("menuAdmin.jadwalPelajaranPerSekolahAdmin", {
                "namaSekolah": x,
                "idSekolah": y[0].idSekolah,
            })
        }

    }])

    .controller('jadwalPelajaranPerSekolahAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')
        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }
        $scope.data = {
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
        }

        var appJadwalPelajaranGuru = appJadwalPelajaran;
        var dataJadwalPelajaranPerGuru = firebase.database(appJadwalPelajaranGuru).ref("groupJadwalPelajaranGuru").orderByChild("idSekolah").equalTo($scope.data.idSekolah);
        var listDataJadwalPelajaranPerGuru = $firebaseArray(dataJadwalPelajaranPerGuru);
        listDataJadwalPelajaranPerGuru.$loaded().then(function(response){
            $scope.jadwalPerGuru= response;
        })



        $scope.getData = function (data) {
            // console.log(data.idSekolah)
            $ionicActionSheet.show({
                titleText: 'Data Jadwal Pelajaran ',
                buttons: [
                    { text: '<i class="icon ion-android-list"></i> Lihat Jadwal ' },
                ],
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go("menuAdmin.jadwalPelajaranLihatAdmin", {
                            "filterGuru": data.filterGuru,
                            "idSekolah": data.idSekolah,
                        })
                    }
                    return true;
                },
            });
        }


    }])

    .controller('jadwalPelajaranLihatAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "filterGuru": $stateParams.filterGuru,
            "idSekolah": $stateParams.idSekolah,
        }

        if ($scope.data.idSekolah === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.data.idSekolah === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }
        
        var ref = firebase.database(app).ref("jadwalPelajaran").orderByChild("filterGuru").equalTo($scope.data.filterGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.jadwalPelajaran = response;
            $scope.totalJamMengajar = response.length;
            $scope.jadwalPelajaranGroup = $scope.jadwalPelajaran.groupBy('hari');
        })

        // var ref = firebase.database().ref("jadwalPelajaran").orderByChild("filterGuru").equalTo($scope.data.filterGuru);
        // var listRef = $firebaseArray(ref);
        // $ionicLoading.show();
        // listRef.$loaded().then(function (response) {
        //     $ionicLoading.hide();
        //     $scope.jadwalPelajaran = response;

        // })

        $scope.getData = function (x, y) {
            $state.go('menuAdmin.jadwalPelajaranLihatDetailAdmin', {
                "filterGuru": $stateParams.filterGuru,
                "hari": x,
                "tahunAjaran": y[0].tahunAjaran,
                "idSekolah" : $scope.data.idSekolah,

            })
        }

        $scope.hapusData = function (data) {
            if ($scope.hakAkses === "Super Admin") {
                var refObj = firebase.database(app).ref("jadwalPelajaran/" + data.$id);
                var objDelete = $firebaseObject(refObj);
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Hapus Data',
                    template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                    okType: "button-positive",
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        objDelete.$remove().then(function (ref) {
                            //console.log('Data Berhasil Dihapus');
                        });
                    }
                    else {
                        //console.log('Tidak Jadi Menghapus');
                    }
                });
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Anda tidak diperkenankan menghapus data ini, Terima Kasih',
                    okType: 'button-positive'
                });
            }
        }

    }])

    .controller('jadwalPelajaranTambahAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        $scope.idProvinsiAdmin = localStorage.getItem('idProvinsiAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.formData = {
            "idProvinsi": '',
            "idKotaKabupaten": '',
            "idKecamatan": '',
            "jenjang": '',
            "idSekolah": '',
            "idGuru": '',
            "idTahunAjaran": '',
            "hari": '',
            "jumlahJamPelajaran": '',
            "idKelas": '',
            "idPelajaran": '',
            "jamKe": '',
            "jamMulai": '',
            "jamSelesai": '',
            "createAt": $filter('date')(new (Date), 'yyyy-MM-dd HH:mm:ss Z')
        }

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiAdmin);
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

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
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
                // for (i = 0; i < response.length; i++) {
                //     var updateData = firebase.database().ref("dataSekolahIndonesia/" + response[i].$id);
                //     updateData.update({
                //         "filter": response[i].id_kecamatan + "_" + response[i].jenjang
                //     }).then(function (resp) {
                //         $ionicLoading.hide();
                //     })
                // }

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
            })

            var refGuru = firebase.database(appGuru).ref("dataGuru").orderByChild("idSekolah").equalTo(idSekolah);
            var listRefGuru = $firebaseArray(refGuru);
            $ionicLoading.show();
            listRefGuru.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataGuru = response;
            })

            var refKelas = firebase.database().ref("dataKelas/").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
            $scope.dataKelas = $firebaseArray(refKelas);
        };

        $scope.getGuru = function () {
            var refDataGuru = firebase.database(appGuru).ref("dataGuru/" + $scope.formData.idGuru);
            refDataGuru.on("value", function (snapshot) {
                $scope.namaGuru = snapshot.val().namaPengguna;
            })
        }

        var refTahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        $scope.tahunAjaran = $firebaseArray(refTahunAjaran);

        $scope.getTahunAjaran = function () {
            var getDataTahunAjaran = firebase.database().ref("tahunAjaran/" + $scope.formData.idTahunAjaran);
            getDataTahunAjaran.on("value", function (snapshot) {
                $scope.dataTahunAjaran = snapshot.val().tahunAjaran
            })
            var refKelas = firebase.database().ref("dataKelas/").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
            $scope.dataKelas = $firebaseArray(refKelas);
        }

        var refPelajaran = firebase.database().ref("mataPelajaran");
        $scope.dataPelajaran = $firebaseArray(refPelajaran);

        $scope.jumlahJamPelajaran = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        $scope.getJumlahJam = function () {
            $scope.jumlahJam = [];
            for (i = 0; i < $scope.formData.jumlahJamPelajaran; i++) {
                $scope.jumlahJam.push(i)

            }
        }

        $scope.simpan = function () {

            if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.idGuru !== '' && $scope.formData.idTahunAjaran !== '' && $scope.formData.hari !== '' && $scope.formData.jumlahJamPelajaran !== '') {
                $ionicLoading.show()
                $scope.dataJadwalPelajaran = [];
                for (i = 0; i < $scope.jumlahJam.length; i++) {

                    var refKelas = firebase.database().ref("dataKelas/" + $scope.formData.idKelas[i]);
                    refKelas.on("value", function (snapshot) {
                        $scope.namaKelas = snapshot.val().namaKelas;
                    })
                    var refPelajaran = firebase.database().ref("mataPelajaran/" + $scope.formData.idPelajaran[i]);
                    refPelajaran.on("value", function (snapshot) {
                        $scope.namaPelajaran = snapshot.val().pelajaran
                    })
                    console.log($scope.formData.idKelas[i] + "_" + $scope.formData.idPelajaran[i] + "_" + $scope.formData.jamKe[i] + "_" + $scope.formData.jamMulai[i] + "_" + $scope.formData.jamSelesai[i] + "_" + $scope.namaKelas + "_" + $scope.namaPelajaran);
                    $scope.dataJadwalPelajaran.push({
                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.namaProvinsi,
                        "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                        "namaKotaKabupaten": $scope.namaKotaKabupaten,
                        "idKecamatan": $scope.formData.idKecamatan,
                        "namaKecamatan": $scope.namaKecamatan,
                        "jenjang": $scope.formData.jenjang,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "idGuru": $scope.formData.idGuru,
                        "namaGuru": $scope.namaGuru,

                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.dataTahunAjaran,
                        "hari": $scope.formData.hari,

                        "idKelas": $scope.formData.idKelas[i],
                        "namaKelas": $scope.namaKelas,
                        "idPelajaran": $scope.formData.idPelajaran[i],
                        "pelajaran": $scope.namaPelajaran,
                        "jamKe": $scope.formData.jamKe[i],
                        "jamMulai": $scope.formData.jamMulai[i],
                        "jamSelesai": $scope.formData.jamSelesai[i],
                        "filterPelajaran": $scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.idKelas[i],
                        "filterGuru": $scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran,
                        "filterKelasHari": $scope.formData.idKelas[i] + "_" + $scope.formData.hari,

                        "createAt": $scope.formData.createAt,
                        "diBuatOleh": $scope.namaAdmin,
                        "idPembuat": $scope.idAdmin,
                    })
                }
                console.log($scope.dataJadwalPelajaran);
                // console.log("banyakData ", $scope.dataJadwalPelajaran.length)
                for (k = 0; k < $scope.dataJadwalPelajaran.length; k++) {
                    console.log("data-K ", k)
                    var insertData = firebase.database(app).ref("jadwalPelajaran");
                    insertData.push({
                        "idProvinsi": $scope.dataJadwalPelajaran[k].idProvinsi,
                        "namaProvinsi": $scope.dataJadwalPelajaran[k].namaProvinsi,
                        "idKotaKabupaten": $scope.dataJadwalPelajaran[k].idKotaKabupaten,
                        "namaKotaKabupaten": $scope.dataJadwalPelajaran[k].namaKotaKabupaten,
                        "idKecamatan": $scope.dataJadwalPelajaran[k].idKecamatan,
                        "namaKecamatan": $scope.dataJadwalPelajaran[k].namaKecamatan,
                        "jenjang": $scope.dataJadwalPelajaran[k].jenjang,
                        "idSekolah": $scope.dataJadwalPelajaran[k].idSekolah,
                        "namaSekolah": $scope.dataJadwalPelajaran[k].namaSekolah,
                        "idGuru": $scope.dataJadwalPelajaran[k].idGuru,
                        "namaGuru": $scope.dataJadwalPelajaran[k].namaGuru,

                        "idTahunAjaran": $scope.dataJadwalPelajaran[k].idTahunAjaran,
                        "tahunAjaran": $scope.dataJadwalPelajaran[k].tahunAjaran,
                        "hari": $scope.dataJadwalPelajaran[k].hari,

                        "idKelas": $scope.dataJadwalPelajaran[k].idKelas,
                        "namaKelas": $scope.dataJadwalPelajaran[k].namaKelas,
                        "idPelajaran": $scope.dataJadwalPelajaran[k].idPelajaran,
                        "pelajaran": $scope.dataJadwalPelajaran[k].pelajaran,
                        "jamKe": $scope.dataJadwalPelajaran[k].jamKe,
                        "jamMulai": $scope.dataJadwalPelajaran[k].jamMulai,
                        "jamSelesai": $scope.dataJadwalPelajaran[k].jamSelesai,
                        "filterPelajaran": $scope.dataJadwalPelajaran[k].idSekolah + "_" + $scope.dataJadwalPelajaran[k].idGuru + "_" + $scope.dataJadwalPelajaran[k].idTahunAjaran + "_" + $scope.dataJadwalPelajaran[k].idKelas,
                        "filterGuru": $scope.dataJadwalPelajaran[k].idSekolah + "_" + $scope.dataJadwalPelajaran[k].idGuru + "_" + $scope.dataJadwalPelajaran[k].idTahunAjaran,
                        "filterGuruHari": $scope.dataJadwalPelajaran[k].idSekolah + "_" + $scope.dataJadwalPelajaran[k].idGuru + "_" + $scope.dataJadwalPelajaran[k].idTahunAjaran + "_" + $scope.dataJadwalPelajaran[k].hari,
                        "filterKelasHari": $scope.dataJadwalPelajaran[k].idKelas + "_" + $scope.dataJadwalPelajaran[k].hari,


                        "createAt": $scope.formData.createAt,
                        "diBuatOleh": $scope.namaAdmin,
                        "idPembuat": $scope.idAdmin,
                    }).then(function (resp) {
                        $ionicLoading.hide();
                        console.log("success insert jadwalPelajaran");
                        $state.go("menuAdmin.jadwalPelajaranAdmin")
                    })
                }

                //Cek Total Jadwal Pelajaran Guru Sekarang
                var cekJadwal = firebase.database(app).ref("jadwalPelajaran").orderByChild("filterGuru").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran);
                var listCekJadwal = $firebaseArray(cekJadwal);
                listCekJadwal.$loaded().then(function (response) {
                    $scope.jumlahJamMengajar = response.length;

                    //Cek Total Jumlah Group Jadwal Pelajaran Guru
                    var cekGroupJadwal = firebase.database(app).ref("groupJadwalPelajaranGuru").orderByChild("filterGuru").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran);
                    var listCekGroupJadwal = $firebaseArray(cekGroupJadwal);
                    listCekGroupJadwal.$loaded().then(function (yesIdo) {
                        console.log(yesIdo.length);
                        if (yesIdo.length === 0) {
                            var groupJadwalPelajaranGuru = firebase.database(app).ref("groupJadwalPelajaranGuru");
                            groupJadwalPelajaranGuru.push({
                                "idProvinsi": $scope.formData.idProvinsi,
                                "namaProvinsi": $scope.namaProvinsi,
                                "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                                "namaKotaKabupaten": $scope.namaKotaKabupaten,
                                "idKecamatan": $scope.formData.idKecamatan,
                                "namaKecamatan": $scope.namaKecamatan,
                                "jenjang": $scope.formData.jenjang,
                                "idSekolah": $scope.formData.idSekolah,
                                "namaSekolah": $scope.namaSekolah,
                                "idGuru": $scope.formData.idGuru,
                                "namaGuru": $scope.namaGuru,

                                "idTahunAjaran": $scope.formData.idTahunAjaran,
                                "tahunAjaran": $scope.dataTahunAjaran,

                                "filterGuru": $scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran,
                                "totalMengajar": $scope.jumlahJamMengajar,
                                "idPembuat": $scope.idAdmin,
                            })
                        }
                        else {
                            var id = yesIdo[0].$id;
                            var groupJadwalPelajaranGuru = firebase.database(app).ref("groupJadwalPelajaranGuru/" + id);
                            groupJadwalPelajaranGuru.update(JSON.parse(JSON.stringify({
                                "idProvinsi": $scope.formData.idProvinsi,
                                "namaProvinsi": $scope.namaProvinsi,
                                "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                                "namaKotaKabupaten": $scope.namaKotaKabupaten,
                                "idKecamatan": $scope.formData.idKecamatan,
                                "namaKecamatan": $scope.namaKecamatan,
                                "jenjang": $scope.formData.jenjang,
                                "idSekolah": $scope.formData.idSekolah,
                                "namaSekolah": $scope.namaSekolah,
                                "idGuru": $scope.formData.idGuru,
                                "namaGuru": $scope.namaGuru,

                                "idTahunAjaran": $scope.formData.idTahunAjaran,
                                "tahunAjaran": $scope.dataTahunAjaran,

                                "filterGuru": $scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran,
                                "totalMengajar": $scope.jumlahJamMengajar,
                                "idPembuat": $scope.idAdmin,
                            })))
                        }
                    })

                })

            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Seluruh Data Harus Diisi, Terima Kasih',
                    okType: 'button-positive'
                });
            }

        }

    }])

    .controller('jadwalPelajaranLihatDetailAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "filterGuru": $stateParams.filterGuru,
            "hari": $stateParams.hari,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idSekolah": $stateParams.idSekolah
        }

        if ($scope.data.idSekolah === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.data.idSekolah === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }
        
        var ref = firebase.database(app).ref("jadwalPelajaran").orderByChild("filterGuruHari").equalTo($scope.data.filterGuru + "_" + $scope.data.hari);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.jadwalPelajaran = response;
            $scope.totalJamMengajar = response.length;
        })

        $scope.editData = function (data) {
            $state.go("menuAdmin.jadwalPelajaranEditAdmin", {
                "idJadwalPelajaran": data.$id
            });
        }

        $scope.hapusData = function (data) {
            if ($scope.hakAkses === "Super Admin") {
                var refObj = firebase.database(app).ref("jadwalPelajaran/" + data.$id);
                var objDelete = $firebaseObject(refObj);
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Hapus Data',
                    template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                    okType: "button-positive",
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        objDelete.$remove().then(function (ref) {
                            //console.log('Data Berhasil Dihapus');
                        });
                    }
                    else {
                        //console.log('Tidak Jadi Menghapus');
                    }
                });
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Anda tidak diperkenankan menghapus data ini, Terima Kasih',
                    okType: 'button-positive'
                });
            }
        }

    }])

    .controller('jadwalPelajaranEditAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        $scope.idProvinsiAdmin = localStorage.getItem('idProvinsiAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "idJadwalPelajaran": $stateParams.idJadwalPelajaran
        }

        var ref = firebase.database(app).ref("jadwalPelajaran/" + $scope.data.idJadwalPelajaran);
        $ionicLoading.show();
        ref.on("value", function (snapshot) {
            $ionicLoading.hide();
            $scope.formData = snapshot.val();
            var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiAdmin);
            var listProvinsi = $firebaseArray(refProvinsi);

            listProvinsi.$loaded().then(function (response) {
                $scope.dataProvinsi = response;
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(snapshot.val().idKotaKabupaten);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);

            var refSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo(snapshot.val().idKecamatan + "_" + snapshot.val().jenjang);
            var listSekolah = $firebaseArray(refSekolah);

            listSekolah.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;

            });

            var jenjang = snapshot.val().jenjang;
            if (jenjang === "SD") {
                $scope.tingkatKelas = [1, 2, 3, 4, 5, 6];
            }
            else if (jenjang === "SMP") {
                $scope.tingkatKelas = [7, 8, 9];
            }
            else if (jenjang === "SMA" || jenjang === "SMK") {
                $scope.tingkatKelas = [10, 11, 12];
            }

            var refGuru = firebase.database(appGuru).ref("dataGuru").orderByChild("idSekolah").equalTo(snapshot.val().idSekolah);
            $scope.dataGuru = $firebaseArray(refGuru);

            var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo(snapshot.val().idSekolah + "_" + snapshot.val().idTahunAjaran);
            $scope.dataKelas = $firebaseArray(refKelas);

            var refTahunAjaran = firebase.database().ref("tahunAjaran/" + snapshot.val().idTahunAjaran);
            refTahunAjaran.on("value", function (snapshot) {
                $scope.dataTahunAjaran = snapshot.val().tahunAjaran
                console.log($scope.dataTahunAjaran);
            })
        })

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiAdmin);
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

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
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
            })

            var refGuru = firebase.database(appGuru).ref("dataGuru").orderByChild("idSekolah").equalTo(idSekolah);
            var listRefGuru = $firebaseArray(refGuru);
            $ionicLoading.show();
            listRefGuru.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataGuru = response;
            })

            var refKelas = firebase.database().ref("dataKelas/").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
            $scope.dataKelas = $firebaseArray(refKelas);
        };

        $scope.getGuru = function () {
            var refDataGuru = firebase.database(appGuru).ref("dataGuru/" + $scope.formData.idGuru);
            refDataGuru.on("value", function (snapshot) {
                $scope.namaGuru = snapshot.val().namaPengguna;
            })
        }

        var refTahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        $scope.tahunAjaran = $firebaseArray(refTahunAjaran);

        $scope.getTahunAjaran = function () {
            var getDataTahunAjaran = firebase.database().ref("tahunAjaran/" + $scope.formData.idTahunAjaran);
            getDataTahunAjaran.on("value", function (snapshot) {
                $scope.dataTahunAjaran = snapshot.val().tahunAjaran
            })
            var refKelas = firebase.database().ref("dataKelas/").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
            $scope.dataKelas = $firebaseArray(refKelas);
        }

        var refPelajaran = firebase.database().ref("mataPelajaran");
        $scope.dataPelajaran = $firebaseArray(refPelajaran);

        $scope.jumlahJamPelajaran = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        $scope.getJumlahJam = function () {
            $scope.jumlahJam = [];
            for (i = 0; i < $scope.formData.jumlahJamPelajaran; i++) {
                $scope.jumlahJam.push(i)

            }
        }

        $scope.simpan = function () {
            var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
            var refKelas = firebase.database().ref("dataKelas/" + $scope.formData.idKelas);
            refKelas.on("value", function (snapshot) {
                $scope.namaKelas = snapshot.val().namaKelas;
            })
            var refPelajaran = firebase.database().ref("mataPelajaran/" + $scope.formData.idPelajaran);
            refPelajaran.on("value", function (snapshot) {
                $scope.namaPelajaran = snapshot.val().pelajaran
            })
            if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.idGuru !== '' && $scope.formData.idTahunAjaran !== '' && $scope.formData.hari !== '' && $scope.formData.jumlahJamPelajaran !== '' && $scope.formData.idKelas !== '' && $scope.formData.idPelajaran !== '' && $scope.formData.jamKe !== null && $scope.formData.jamMulai !== '' && $scope.formData.jamSelesai !== '') {

                $ionicLoading.show()
                var ref = firebase.database(app).ref("jadwalPelajaran/" + $scope.data.idJadwalPelajaran);
                ref.update(JSON.parse(JSON.stringify({
                    "idProvinsi": $scope.formData.idProvinsi,
                    "namaProvinsi": $scope.namaProvinsi,
                    "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                    "namaKotaKabupaten": $scope.namaKotaKabupaten,
                    "idKecamatan": $scope.formData.idKecamatan,
                    "namaKecamatan": $scope.namaKecamatan,
                    "jenjang": $scope.formData.jenjang,
                    "idSekolah": $scope.formData.idSekolah,
                    "namaSekolah": $scope.namaSekolah,
                    "idGuru": $scope.formData.idGuru,
                    "namaGuru": $scope.namaGuru,

                    "idTahunAjaran": $scope.formData.idTahunAjaran,
                    "tahunAjaran": $scope.dataTahunAjaran,
                    "hari": $scope.formData.hari,

                    "idKelas": $scope.formData.idKelas,
                    "namaKelas": $scope.namaKelas,
                    "idPelajaran": $scope.formData.idPelajaran,
                    "pelajaran": $scope.namaPelajaran,
                    "jamKe": $scope.formData.jamKe,
                    "jamMulai": $scope.formData.jamMulai,
                    "jamSelesai": $scope.formData.jamSelesai,
                    "filterPelajaran": $scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.idKelas,
                    "filterGuru": $scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran,
                    "filterGuruHari": $scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.hari,
                    "filterKelasHari": $scope.formData.idKelas + "_" + $scope.formData.hari,

                    "updateAt": createAt,
                    "diEditOleh": $scope.namaAdmin,
                    "idPengedit": $scope.idAdmin,
                }))).then(function (resp) {
                    $ionicLoading.hide();
                    console.log("success update jadwalPelajaran");
                    $state.go("menuAdmin.jadwalPelajaranLihatAdmin", {
                        "filterGuru": $scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran,
                    });
                    $ionicPopup.alert({
                        title: 'Sukses',
                        template: 'Jadwal Pelajaran Berhasil Diperbaharui',
                        okType: 'button-positive'
                    });
                })

            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Seluruh Data Harus Diisi, Terima Kasih',
                    okType: 'button-positive'
                });
            }

        }

    }])