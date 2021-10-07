angular.module('app.kurikulumGuru', [])

    .controller('jadwalPelajaranGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')
        // LOADBALANCING
        if ($scope.idSekolahGuru === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolahGuru === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }
        
        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.tambah = function () {
            $state.go("menuGuru.jadwalPelajaranTambahGuru");
        }

        var appJadwalPelajaranGuru = appJadwalPelajaran;

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database(app).ref("jadwalPelajaran").orderByChild("idGuru").equalTo($scope.idGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.jadwal = response;
            // $scope.jadwalPelajaran = response;
            $scope.jadwalPelajaran = $scope.jadwal.groupBy('filterGuru');
            console.log($scope.jadwalPelajaran)

            index = 0 ;
            for (let i = 0; i < response.length; i++) {
                index = index + 1;
                console.log(index);
                console.log(response[i].$id);
                var groupAbsensiSiswa = firebase.database(appJadwalPelajaranGuru).ref("jadwalPelajaran/"+response[i].$id);
                groupAbsensiSiswa.set({
                    "createAt":response[i].createAt,
                    "diBuatOleh":response[i].diBuatOleh,
                    "filterGuru":response[i].filterGuru,
                    "filterGuruHari":response[i].filterGuruHari,
                    "filterKelasHari":response[i].filterKelasHari,
                    "filterPelajaran":response[i].filterPelajaran,
                    "hari":response[i].hari,
                    "idGuru":response[i].idGuru,
                    "idKecamatan":response[i].idKecamatan,
                    "idKelas":response[i].idKelas,
                    "idKotaKabupaten":response[i].idKotaKabupaten,
                    "idPelajaran":response[i].idPelajaran,
                    "idPembuat":response[i].idPembuat,
                    "idProvinsi":response[i].idProvinsi,
                    "idSekolah":response[i].idSekolah,
                    "idTahunAjaran":response[i].idTahunAjaran,
                    "jamKe":response[i].jamKe,
                    "jamMulai":response[i].jamMulai,
                    "jamSelesai":response[i].jamSelesai,
                    "jenjang":response[i].jenjang,
                    "namaGuru":response[i].namaGuru,
                    "namaKecamatan":response[i].namaKecamatan,
                    "namaKelas":response[i].namaKelas,
                    "namaKotaKabupaten":response[i].namaKotaKabupaten,
                    "namaProvinsi":response[i].namaProvinsi,
                    "namaSekolah":response[i].namaSekolah,
                    "pelajaran":response[i].pelajaran,
                    "tahunAjaran":response[i].tahunAjaran
                }).then(function (ok) {
                    console.log('Ok')
                })
            }
        });

        $scope.getData = function (x, y) {
            console.log(y[0].filterGuru)
            $ionicActionSheet.show({
                titleText: 'Data Jadwal Pelajaran ',
                buttons: [
                    { text: '<i class="icon ion-android-list"></i> Lihat Jadwal ' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Jadwal',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go("menuGuru.jadwalPelajaranLihatGuru", {
                            "filterGuru": x
                        })
                    }
                    return true;
                },

                destructiveButtonClicked: function () {

                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                        okType: "button-positive",
                    });
                    confirmPopup.then(function (res) {
                        if (res) {
                            $ionicLoading.show();
                            var refObj = firebase.database(app).ref("jadwalPelajaran/").orderByChild("filterGuru").equalTo(x);
                            var objDelete = $firebaseArray(refObj);
                            objDelete.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {
                                    var hapusData = firebase.database(app).ref("jadwalPelajaran/" + response[i].$id);
                                    var objDelete = $firebaseObject(hapusData);
                                    objDelete.$remove().then(function (ref) {
                                        $ionicLoading.hide();
                                        console.log('Data Berhasil Dihapus');
                                        // window.location.reload(true);
                                        Array.prototype.groupBy = function (prop) {
                                            return this.reduce(function (groups, item) {
                                                const val = item[prop]
                                                groups[val] = groups[val] || []
                                                groups[val].push(item)
                                                return groups
                                            }, {})
                                        }

                                        var ref = firebase.database(app).ref("jadwalPelajaran").orderByChild("idGuru").equalTo($scope.idGuru);
                                        var listRef = $firebaseArray(ref);
                                        $ionicLoading.show();
                                        listRef.$loaded().then(function (response) {
                                            $ionicLoading.hide();
                                            $scope.jadwal = response;
                                            // $scope.jadwalPelajaran = response;
                                            $scope.jadwalPelajaran = $scope.jadwal.groupBy('filterGuru');
                                            // console.log($scope.jadwalPelajaran)
                                        });
                                    });
                                }
                            })

                            var objGroup = firebase.database(app).ref("groupJadwalPelajaranGuru").orderByChild("filterGuru").equalTo(y[0].filterGuru);
                            var listObjGroup = $firebaseArray(objGroup);
                            listObjGroup.$loaded().then(function (hapus) {
                                var id = hapus[0].$id;

                                var objHapus = firebase.database(app).ref("groupJadwalPelajaranGuru/" + id);
                                var objHapusData = $firebaseObject(objHapus);
                                objHapusData.$remove().then(function (yes) {
                                    console.log("terhapus")
                                })
                            })

                        }
                        else {
                            //console.log('Tidak Jadi Menghapus');
                        }
                    });
                    return true;
                }

            });
        }

    }])

    .controller('jadwalPelajaranTambahGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        // LOADBALANCING
        if ($scope.idSekolahGuru === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolahGuru === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }
        if (!$scope.idGuru) {
            $state.go('welcome');
        }


        var dataGuruRealTime = firebase.database(appGuru).ref("dataGuru/" + $scope.idGuru);
        $ionicLoading.show();
        dataGuruRealTime.on("value", function (snapshot) {
            $ionicLoading.hide();
            $scope.namaProvinsi = snapshot.val().namaProvinsi;
            $scope.idProvinsiGuru = snapshot.val().idProvinsi;
            $scope.namaKotaKabupaten = snapshot.val().namaKotaKabupaten;
            $scope.idKotaKabupatenGuru = snapshot.val().idKotaKabupaten;
            $scope.namaKecamatan = snapshot.val().namaKecamatan;
            $scope.idKecamatanGuru = snapshot.val().idKecamatan;
            $scope.namaSekolah = snapshot.val().namaSekolah;
            $scope.idSekolahGuru = snapshot.val().idSekolah;
        });

        $scope.formData = {
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

        var refTahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        $scope.tahunAjaran = $firebaseArray(refTahunAjaran);

        $scope.getTahunAjaran = function () {
            var getDataTahunAjaran = firebase.database().ref("tahunAjaran/" + $scope.formData.idTahunAjaran);
            getDataTahunAjaran.on("value", function (snapshot) {
                $scope.dataTahunAjaran = snapshot.val().tahunAjaran
            })
            var refKelas = firebase.database().ref("dataKelas/").orderByChild("filter").equalTo($scope.idSekolahGuru + "_" + $scope.formData.idTahunAjaran);
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

        var appJadwalPelajaranGuru = appJadwalPelajaran;
        $scope.simpan = function () {

            if ($scope.idProvinsiGuru !== '' && $scope.idKotaKabupatenGuru !== '' && $scope.idKecamatanGuru !== '' && $scope.jenjang !== '' && $scope.idSekolahGuru !== '' && $scope.idGuru !== '' && $scope.formData.idTahunAjaran !== '' && $scope.formData.hari !== '' && $scope.formData.jumlahJamPelajaran !== '') {
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

                    var jamMulaiDisplay = $filter('date')($scope.formData.jamMulai[i], 'HH:mm');
                    var jamSelesaiDisplay = $filter('date')($scope.formData.jamSelesai[i], 'HH:mm');

                    console.log($scope.formData.idKelas[i] + "_" + $scope.formData.idPelajaran[i] + "_" + $scope.formData.jamKe[i] + "_" + $scope.formData.jamMulai[i] + "_" + $scope.formData.jamSelesai[i] + "_" + $scope.namaKelas + "_" + $scope.namaPelajaran);
                    $scope.dataJadwalPelajaran.push({
                        "idProvinsi": $scope.idProvinsiGuru,
                        "namaProvinsi": $scope.namaProvinsi,
                        "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                        "namaKotaKabupaten": $scope.namaKotaKabupaten,
                        "idKecamatan": $scope.idKecamatanGuru,
                        "namaKecamatan": $scope.namaKecamatan,
                        "jenjang": $scope.jenjangGuru,
                        "idSekolah":$scope.idSekolahGuru,
                        "namaSekolah": $scope.namaSekolah,
                        "idGuru":  $scope.idGuru,
                        "namaGuru": $scope.namaGuru,

                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.dataTahunAjaran,
                        "hari": $scope.formData.hari,

                        "idKelas": $scope.formData.idKelas[i],
                        "namaKelas": $scope.namaKelas,
                        "idPelajaran": $scope.formData.idPelajaran[i],
                        "pelajaran": $scope.namaPelajaran,
                        "jamKe": $scope.formData.jamKe[i],

                        "jamMulai": jamMulaiDisplay,                        
                        "jamSelesai": jamSelesaiDisplay,

                        "filterPelajaran": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.idKelas[i],
                        "filterGuru": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran,
                        "filterKelasHari": $scope.formData.idKelas[i] + "_" + $scope.formData.hari,

                        "createAt": $scope.formData.createAt,
                        "diBuatOleh": $scope.namaGuru,
                        "idPembuat": $scope.idGuru,
                    })
                }
                console.log($scope.dataJadwalPelajaran);
                for (k = 0; k < $scope.dataJadwalPelajaran.length; k++) {
                    // console.log("data-K ", k)
                    $scope.dataK = $scope.dataJadwalPelajaran.length;
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
                        "diBuatOleh": $scope.namaGuru,
                        "idPembuat": $scope.idGuru,
                    }).then(function (resp) {
                        $ionicLoading.hide();
                        console.log("success insert jadwalPelajaran");
                        $state.go("menuGuru.jadwalPelajaranGuru");
                    })
                }

                //Cek Total Jadwal Pelajaran Guru Sekarang
                var cekJadwal = firebase.database(app).ref("jadwalPelajaran").orderByChild("filterGuru").equalTo($scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran);
                var listCekJadwal = $firebaseArray(cekJadwal);
                listCekJadwal.$loaded().then(function (response) {
                    $scope.jumlahJamMengajar = response.length;

                    //Cek Total Jumlah Group Jadwal Pelajaran Guru
                    var cekGroupJadwal = firebase.database(app).ref("groupJadwalPelajaranGuru").orderByChild("filterGuru").equalTo($scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran);
                    var listCekGroupJadwal = $firebaseArray(cekGroupJadwal);
                    listCekGroupJadwal.$loaded().then(function (yesIdo) {
                        console.log(yesIdo.length);

                        if (yesIdo.length === 0) {
                            var groupJadwalPelajaranGuru = firebase.database(app).ref("groupJadwalPelajaranGuru");
                            groupJadwalPelajaranGuru.push({
                                "idProvinsi": $scope.idProvinsiGuru,
                                "namaProvinsi": $scope.namaProvinsi,
                                "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                                "namaKotaKabupaten": $scope.namaKotaKabupaten,
                                "idKecamatan": $scope.idKecamatanGuru,
                                "namaKecamatan": $scope.namaKecamatan,
                                "jenjang": $scope.jenjangGuru,
                                "idSekolah":$scope.idSekolahGuru,
                                "namaSekolah": $scope.namaSekolah,
                                "idGuru":  $scope.idGuru,
                                "namaGuru": $scope.namaGuru,

                                "idTahunAjaran": $scope.formData.idTahunAjaran,
                                "tahunAjaran": $scope.dataTahunAjaran,

                                "filterGuru": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran,
                                "totalMengajar": $scope.jumlahJamMengajar,
                                "idPembuat": $scope.idGuru,
                            })

                        }
                        else {
                            var id = yesIdo[0].$id;
                            var groupJadwalPelajaranGuru = firebase.database(app).ref("groupJadwalPelajaranGuru/" + id);
                            groupJadwalPelajaranGuru.update(JSON.parse(JSON.stringify({
                                "idProvinsi": $scope.idProvinsiGuru,
                                "namaProvinsi": $scope.namaProvinsi,
                                "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                                "namaKotaKabupaten": $scope.namaKotaKabupaten,
                                "idKecamatan": $scope.idKecamatanGuru,
                                "namaKecamatan": $scope.namaKecamatan,
                                "jenjang": $scope.formData.jenjang,
                                "idSekolah": $scope.idSekolahGuru,
                                "namaSekolah": $scope.namaSekolah,
                                "idGuru": $scope.idGuru,
                                "namaGuru": $scope.namaGuru,

                                "idTahunAjaran": $scope.formData.idTahunAjaran,
                                "tahunAjaran": $scope.dataTahunAjaran,

                                "filterGuru": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran,
                                "totalMengajar": $scope.jumlahJamMengajar,
                                "idPembuat": $scope.idGuru,
                            })))

                            // 
                            var groupJadwalPelajaranGuruAdmin = firebase.database(appJadwalPelajaranGuru).ref("groupJadwalPelajaranGuru/" + id);
                            groupJadwalPelajaranGuruAdmin.update(JSON.parse(JSON.stringify({
                                "idProvinsi": $scope.idProvinsiGuru,
                                "namaProvinsi": $scope.namaProvinsi,
                                "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                                "namaKotaKabupaten": $scope.namaKotaKabupaten,
                                "idKecamatan": $scope.idKecamatanGuru,
                                "namaKecamatan": $scope.namaKecamatan,
                                "jenjang": $scope.formData.jenjang,
                                "idSekolah": $scope.idSekolahGuru,
                                "namaSekolah": $scope.namaSekolah,
                                "idGuru": $scope.idGuru,
                                "namaGuru": $scope.namaGuru,

                                "idTahunAjaran": $scope.formData.idTahunAjaran,
                                "tahunAjaran": $scope.dataTahunAjaran,

                                "filterGuru": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran,
                                "totalMengajar": $scope.jumlahJamMengajar,
                                "idPembuat": $scope.idGuru,
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

    .controller('jadwalPelajaranLihatGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        // LOADBALANCING
        if ($scope.idSekolahGuru === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolahGuru === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "filterGuru": $stateParams.filterGuru
        }

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

        $scope.getData = function (x, y) {
            $state.go('menuGuru.jadwalPelajaranLihatDetailGuru', {
                "filterGuru": $stateParams.filterGuru,
                "hari": x,
                "tahunAjaran": y[0].tahunAjaran
            })
        }

        $scope.editData = function (data) {
            $state.go("menuGuru.jadwalPelajaranEditGuru", {
                "idJadwalPelajaran": data.$id
            });
        }

        $scope.hapusData = function (data) {
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

    }])

    .controller('jadwalPelajaranLihatDetailGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        // LOADBALANCING
        if ($scope.idSekolahGuru === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolahGuru === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "filterGuru": $stateParams.filterGuru,
            "hari": $stateParams.hari,
            "tahunAjaran": $stateParams.tahunAjaran
        }

        var ref = firebase.database(app).ref("jadwalPelajaran").orderByChild("filterGuruHari").equalTo($scope.data.filterGuru + "_" + $scope.data.hari);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.jadwalPelajaran = response;
            $scope.totalJamMengajar = response.length;
        })

        $scope.editData = function (data) {
            $state.go("menuGuru.jadwalPelajaranEditGuru", {
                "idJadwalPelajaran": data.$id,
                "hari": data.hari
            });
        }

        $scope.hapusData = function (data) {
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

                    //Cek Total Jadwal Pelajaran Guru Sekarang
                    var cekJadwal = firebase.database(app).ref("jadwalPelajaran").orderByChild("filterGuru").equalTo($scope.data.filterGuru);
                    var listCekJadwal = $firebaseArray(cekJadwal);
                    listCekJadwal.$loaded().then(function (response) {
                        $scope.jumlahJamMengajar = response.length;

                        //Cek Total Jumlah Group Jadwal Pelajaran Guru
                        var cekGroupJadwal = firebase.database(app).ref("groupJadwalPelajaranGuru").orderByChild("filterGuru").equalTo($scope.data.filterGuru);
                        var listCekGroupJadwal = $firebaseArray(cekGroupJadwal);
                        listCekGroupJadwal.$loaded().then(function (yesIdo) {

                            var id = yesIdo[0].$id;
                            var groupJadwalPelajaranGuru = firebase.database(app).ref("groupJadwalPelajaranGuru/" + id);
                            groupJadwalPelajaranGuru.update(JSON.parse(JSON.stringify({
                                "totalMengajar": $scope.jumlahJamMengajar,
                            })))
                        })

                    })
                }
                else {
                    //console.log('Tidak Jadi Menghapus');
                }
            });
        }

    }])

    .controller('jadwalPelajaranEditGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')
        // LOADBALANCING
        if ($scope.idSekolahGuru === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolahGuru === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idJadwalPelajaran": $stateParams.idJadwalPelajaran,
            "hari": $stateParams.hari,
        }

        var ref = firebase.database(app).ref("jadwalPelajaran/" + $scope.data.idJadwalPelajaran);
        $ionicLoading.show();
        ref.on("value", function (snapshot) {
            $ionicLoading.hide();
            $scope.formData = snapshot.val();
            var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiGuru);
            var listProvinsi = $firebaseArray(refProvinsi);

            listProvinsi.$loaded().then(function (response) {
                $scope.dataProvinsi = response;
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenGuru);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanGuru);
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

        var refTahunAjaran = firebase.database().ref("tahunAjaran");
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



        var appJadwalPelajaranGuru = appJadwalPelajaran;

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
                    "idProvinsi": $scope.idProvinsiGuru,
                    "namaProvinsi": $scope.namaProvinsi,
                    "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                    "namaKotaKabupaten": $scope.namaKotaKabupaten,
                    "idKecamatan": $scope.idKecamatanGuru,
                    "namaKecamatan": $scope.namaKecamatan,
                    "jenjang": $scope.jenjangGuru,
                    "idSekolah": $scope.idSekolahGuru,
                    "namaSekolah": $scope.namaSekolah,
                    "idGuru": $scope.idGuru,
                    "namaGuru": $scope.namaGuru,

                    "idTahunAjaran": $scope.formData.idTahunAjaran,
                    "tahunAjaran": $scope.dataTahunAjaran,
                    "hari": $scope.formData.hari,

                    "idKelas": $scope.formData.idKelas,
                    "namaKelas": $scope.namaKelas,
                    "idPelajaran": $scope.formData.idPelajaran,
                    "pelajaran": $scope.namaPelajaran,
                    "jamKe": $scope.formData.jamKe,
                    "jamMulai": $scope.formData.jamMulai.toString(),
                    "jamSelesai": $scope.formData.jamSelesai.toString(),
                    "filterPelajaran": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.idKelas,
                    "filterGuru": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran,
                    "filterGuruHari": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.hari,
                    "filterKelasHari": $scope.formData.idKelas + "_" + $scope.formData.hari,

                    "updateAt": createAt,
                    "diEditOleh": $scope.namaGuru,
                    "idPengedit": $scope.idGuru,
                }))).then(function (resp) {
                    var ref2 = firebase.database(appJadwalPelajaranGuru).ref("jadwalPelajaran/" + $scope.data.idJadwalPelajaran);
                    ref2.update(JSON.parse(JSON.stringify({
                        "idProvinsi": $scope.idProvinsiGuru,
                        "namaProvinsi": $scope.namaProvinsi,
                        "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                        "namaKotaKabupaten": $scope.namaKotaKabupaten,
                        "idKecamatan": $scope.idKecamatanGuru,
                        "namaKecamatan": $scope.namaKecamatan,
                        "jenjang": $scope.jenjangGuru,
                        "idSekolah": $scope.idSekolahGuru,
                        "namaSekolah": $scope.namaSekolah,
                        "idGuru": $scope.idGuru,
                        "namaGuru": $scope.namaGuru,
    
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.dataTahunAjaran,
                        "hari": $scope.formData.hari,
    
                        "idKelas": $scope.formData.idKelas,
                        "namaKelas": $scope.namaKelas,
                        "idPelajaran": $scope.formData.idPelajaran,
                        "pelajaran": $scope.namaPelajaran,
                        "jamKe": $scope.formData.jamKe,
                        "jamMulai": $scope.formData.jamMulai.toString(),
                        "jamSelesai": $scope.formData.jamSelesai.toString(),
                        "filterPelajaran": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.idKelas,
                        "filterGuru": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran,
                        "filterGuruHari": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.hari,
                        "filterKelasHari": $scope.formData.idKelas + "_" + $scope.formData.hari,
    
                        "updateAt": createAt,
                        "diEditOleh": $scope.namaGuru,
                        "idPengedit": $scope.idGuru,
                    })))
                }).then(function (resp) {
                    $ionicLoading.hide();
                    // console.log("success update jadwalPelajaran");
                    $state.go("menuGuru.jadwalPelajaranLihatDetailGuru", {
                        "filterGuru": $scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran,
                        "hari": $stateParams.hari
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