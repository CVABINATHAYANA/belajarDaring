angular.module('app.dataPokokRombelSekolah', [])

    .controller('dataRombelSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
        $scope.namaKecamatanSekolah = localStorage.getItem('namaKecamatanSekolah');
        // console.log($scope.namaKecamatanSekolah)

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        // $scope.data = {
        //     "idSekolah": $stateParams.idSekolah,
        //     "namaSekolah": $stateParams.namaSekolah,
        //     "idKotaKabupaten": $stateParams.idKotaKabupaten,
        //     "idKecamatan": $stateParams.idKecamatan,
        //     "jenjang": $stateParams.jenjang
        // }
        // console.log($scope.data);
        $scope.formData = {
            "idTahunAjaranFilter": ''
        }
        var tpFilter = firebase.database().ref("tahunAjaran");
        var listTPFilter = $firebaseArray(tpFilter);
        $ionicLoading.show();
        listTPFilter.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.tahunAjaranFilter = response;
        });

        $scope.getTahunAjaranFilter = function () {
            console.log($scope.formData.idTahunAjaranFilter)
            var ref = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.idSekolah + "_" + $scope.formData.idTahunAjaranFilter);
            var listRef = $firebaseArray(ref);
            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKelas = response;
                console.log("dataKelas", response)
            })
        }

        var refNamaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanSekolah);
        refNamaKecamatan.on("child_added", function (snapshot) {
            $scope.namaKecamatan = snapshot.val().nama_kecamatan;
            // console.log($scope.namaKecamatan);
        })

        var refTahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        var listRefTahunAjaran = $firebaseArray(refTahunAjaran);
        $ionicLoading.show();
        listRefTahunAjaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.tahunAjaran = response;
            $scope.idTahunAjaranAktif = response[0].$id;

            //Kelas Tahun Ajaran Aktif
            var ref = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.idSekolah + "_" + response[0].$id);
            var listRef = $firebaseArray(ref);
            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKelas = response;
            })
        });

        var refDataPrasarana = firebase.database().ref("dataPrasarana").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRefDataPrasarana = $firebaseArray(refDataPrasarana);
        $ionicLoading.show();
        listRefDataPrasarana.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPrasarana = response;
        })

        if ($scope.jenjangSekolah === 'SD') {
            $scope.tingkatKelas = [1, 2, 3, 4, 5, 6];
        }
        else if ($scope.jenjangSekolah === 'SMP') {
            $scope.tingkatKelas = [7, 8, 9];
        }
        else if ($scope.jenjangSekolah === 'SMA' || $scope.jenjangSekolah === 'SMK') {
            $scope.tingkatKelas = [10, 11, 12]
        }

        $scope.tambah = function () {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.formData = {
                    "jenisRombel": "",
                    "idTahunAjaran": "",
                    "tingkatKelas": "",
                    "namaKelas": "",
                    "idPrasarana": "",
                }

                $scope.getTahunAjaran = function () {
                    var id = $scope.formData.idTahunAjaran;
                    var tahunAjaran = firebase.database().ref("tahunAjaran/" + id);
                    tahunAjaran.on("value", function (snapshot) {
                        $scope.namaTahunAjaran = snapshot.val().tahunAjaran
                        console.log($scope.namaTahunAjaran)
                    })
                }

                $scope.getPrasarana = function () {
                    var id = $scope.formData.idPrasarana;
                    var prasarana = firebase.database().ref("dataPrasarana/" + id);
                    prasarana.on("value", function (snapshot) {
                        $scope.namaPrasarana = snapshot.val().namaPrasarana
                        console.log($scope.namaPrasarana)
                    })
                }

                $scope.simpan = function () {
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                    if ($scope.formData.idTahunAjaran !== "" && $scope.formData.tingkatKelas !== "" && $scope.formData.namaKelas !== "") {

                        //cek
                        var refCek = firebase.database().ref("dataKelas").orderByChild("filter_input").equalTo($scope.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas);
                        var listRefCek = $firebaseArray(refCek);
                        listRefCek.$loaded().then(function (response) {
                            if (response.length === 0) {
                                if ($scope.namaPrasarana !== undefined) {
                                    $ionicLoading.show();
                                    var insertData = firebase.database().ref("dataKelas");
                                    insertData.push({
                                        "jenisRombel": $scope.formData.jenisRombel,
                                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                                        "tahunAjaran": $scope.namaTahunAjaran,
                                        "tingkatKelas": $scope.formData.tingkatKelas,
                                        "namaKelas": $scope.formData.namaKelas,
                                        "idPrasarana": $scope.formData.idPrasarana,
                                        "namaPrasarana": $scope.namaPrasarana,
                                        "createAt": createAt,
                                        "diBuatOleh": $scope.namaPenggunaSekolah,
                                        "idPembuat": $scope.idPenggunaSekolah,
                                        "idSekolah": $scope.idSekolah,
                                        "idKotaKabupaten": $scope.idKotaKabupatenSekolah,
                                        "idKecamatan": $scope.idKecamatanSekolah,
                                        "namaKecamatan": $scope.namaKecamatanSekolah,
                                        "jenjang": $scope.jenjangSekolah,
                                        "namaSekolah": $scope.namaSekolah,
                                        "filter_input": $scope.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas,
                                        "filter": $scope.idSekolah + "_" + $scope.formData.idTahunAjaran,
                                        "filterJenisRombel": $scope.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.jenisRombel
                                    }).then(function (resp) {
                                        $ionicLoading.hide();
                                        $scope.modal.hide();
                                    })
                                }
                                else {
                                    $ionicLoading.show();
                                    var insertData = firebase.database().ref("dataKelas");
                                    insertData.push({
                                        "jenisRombel": $scope.formData.jenisRombel,
                                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                                        "tahunAjaran": $scope.namaTahunAjaran,
                                        "tingkatKelas": $scope.formData.tingkatKelas,
                                        "namaKelas": $scope.formData.namaKelas,

                                        "createAt": createAt,
                                        "diBuatOleh": $scope.namaPenggunaSekolah,
                                        "idPembuat": $scope.idPenggunaSekolah,
                                        "idSekolah": $scope.idSekolah,
                                        "idKotaKabupaten": $scope.idKotaKabupatenSekolah,
                                        "idKecamatan": $scope.idKecamatanSekolah,
                                        "namaKecamatan": $scope.namaKecamatanSekolah,
                                        "jenjang": $scope.jenjangSekolah,
                                        "namaSekolah": $scope.namaSekolah,
                                        "filter_input": $scope.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas,
                                        "filter": $scope.idSekolah + "_" + $scope.formData.idTahunAjaran,
                                        "filterJenisRombel": $scope.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.jenisRombel
                                    }).then(function (resp) {
                                        $ionicLoading.hide();
                                        $scope.modal.hide();
                                    })
                                }
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

        };

        $scope.editData = function (data) {
            if (data.idTahunAjaran === $scope.idTahunAjaranAktif) {
                $ionicModal.fromTemplateUrl('templates/modal.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();

                    var ref = firebase.database().ref("dataKelas/" + data.$id);
                    $scope.formData = $firebaseObject(ref);

                    $scope.getTahunAjaran = function () {
                        var id = $scope.formData.idTahunAjaran;
                        var tahunAjaran = firebase.database().ref("tahunAjaran/" + id);
                        tahunAjaran.on("value", function (snapshot) {
                            $scope.namaTahunAjaran = snapshot.val().tahunAjaran
                            console.log($scope.namaTahunAjaran)
                        })
                    }

                    $scope.getPrasarana = function () {
                        var id = $scope.formData.idPrasarana;
                        var prasarana = firebase.database().ref("dataPrasarana/" + id);
                        prasarana.on("value", function (snapshot) {
                            $scope.namaPrasarana = snapshot.val().namaPrasarana
                            console.log($scope.namaPrasarana)
                        })
                    }

                    $scope.simpan = function () {
                        var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                        if ($scope.formData.idTahunAjaran !== "" && $scope.formData.tingkatKelas !== "" && $scope.formData.namaKelas !== "") {

                            $ionicLoading.show();
                            ref.update(JSON.parse(JSON.stringify({
                                "jenisRombel": $scope.formData.jenisRombel,
                                "idTahunAjaran": $scope.formData.idTahunAjaran,
                                "tahunAjaran": $scope.namaTahunAjaran,
                                "tingkatKelas": $scope.formData.tingkatKelas,
                                "namaKelas": $scope.formData.namaKelas,
                                "idPrasarana": $scope.formData.idPrasarana,
                                "namaPrasarana": $scope.namaPrasarana,
                                "updateAt": createAt,
                                "diEditOleh": $scope.namaPenggunaSekolah,
                                "idPengedit": $scope.idPenggunaSekolah,
                                "idSekolah": $scope.idSekolah,
                                "idKotaKabupaten": $scope.idKotaKabupatenSekolah,
                                "idKecamatan": $scope.idKecamatanSekolah,
                                "namaKecamatan": $scope.namaKecamatanSekolah,
                                "jenjang": $scope.jenjangSekolah,
                                "namaSekolah": $scope.namaSekolah,
                                "filter_input": $scope.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas,
                                "filter": $scope.idSekolah + "_" + $scope.formData.idTahunAjaran,
                                "filterJenisRombel": $scope.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.jenisRombel
                            }))).then(function (resp) {
                                $ionicLoading.hide();
                                $scope.modal.hide();
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
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Tahun ajaran ini sudah menjadi arsip, tidak bisa diedit, Terimakasih',

                });
            }


        };

        $scope.hapusData = function (data) {
            if (data.idTahunAjaran === $scope.idTahunAjaranAktif) {
                var cek = firebase.database().ref("dataSiswa").orderByChild("idKelas").equalTo(data.$id);
                var listCek = $firebaseArray(cek);
                listCek.$loaded().then(function (response) {
                    if (response.length === 0) {
                        var refObj = firebase.database().ref("dataKelas/" + data.$id);
                        var objDelete = $firebaseObject(refObj);
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Hapus Data',
                            template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                            okType: "button-balanced",
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
                            template: 'Maaf, Data kelas ini tidak bisa dihapus karena sudah terisi data siswa. Terimakasih',

                        });
                    }
                });
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Tahun ajaran ini sudah menjadi arsip, tidak bisa dihapus, Terimakasih',

                });
            }

        }

        $scope.tambahSiswa = function (data) {
            // console.log(data)
            if (data.idTahunAjaran === $scope.idTahunAjaranAktif) {
                $state.go("menuSekolah.lintasMinatSekolah", {
                    "idKelas": data.$id,
                    "tingkatKelas": data.tingkatKelas,
                    "jenisRombel": data.jenisRombel,
                    "namaKelas": data.namaKelas
                })
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Tahun ajaran ini sudah menjadi arsip, tidak bisa menambahkan kelas lintas minat, Terimakasih',

                });
            }
        }

        $scope.migrasiSiswa = function (data) {
            if (data.idTahunAjaran === $scope.idTahunAjaranAktif) {
                $state.go("menuSekolah.migrasiSiswaSekolah", {
                    "dataKelas": data
                })
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Tahun ajaran ini sudah menjadi arsip, tidak bisa migrasi siswa, Terimakasih',

                });
            }

        }

    }])

    .controller('lintasMinatSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah')

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.dataDari = {
            "idKelas": $stateParams.idKelas,
            "tingkatKelas": $stateParams.tingkatKelas,
            "jenisRombel": $stateParams.jenisRombel,
            "namaKelas": $stateParams.namaKelas
        }

        $scope.formData = {
            "idKelas": '',
        }

        $scope.dataKelas = [];
        var tahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        tahunAjaran.on("child_added", function (snapshot) {
            var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.idSekolah + "_" + snapshot.key);
            listRefKelas = $firebaseArray(refKelas);
            $ionicLoading.show();
            listRefKelas.$loaded().then(function (response) {
                $ionicLoading.hide();
                for (i = 0; i < response.length; i++) {
                    if (response[i].tingkatKelas === $scope.dataDari.tingkatKelas && (response[i].jenisRombel === 'Regular' || response[i].jenisRombel === undefined)) {
                        $scope.dataKelas.push({
                            "$id": response[i].$id,
                            "namaKelas": response[i].namaKelas
                        })
                    }
                }
                console.log($scope.dataKelas)
            })
        });

        $scope.getIdKelas = function () {
            var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.formData.idKelas);
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSiswa = response;
                // $scope.totalSiswa = response.length;
            });
        }

        $scope.dataSiswa = [];
        var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idSekolah").equalTo($scope.idSekolah);
        listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            // $scope.dataSiswa = response;
            for (i = 0; i < response.length; i++) {
                if (response[i].tingkatKelas === $scope.dataDari.tingkatKelas) {
                    $scope.dataSiswa.push({
                        '$id': response[i].$id,
                        "namaPengguna": response[i].namaPengguna,
                        "namaKelas": response[i].namaKelas,
                        "namaSekolah": response[i].namaSekolah,
                        "tahunAjaran": response[i].tahunAjaran,
                        "idTahunAjaran": response[i].idTahunAjaran,
                        "namaKotaKabupaten": response[i].namaKotaKabupaten,
                        "namaProvinsi": response[i].namaProvinsi,
                        "tanggalDisplay": response[i].tanggalDisplay,
                        "jamDisplay": response[i].jamDisplay
                    })
                }

            }
        })

        $scope.getData = function (data) {
            // console.log(data);
            $ionicActionSheet.show({
                titleText: 'Siswa : ' + data.namaPengguna,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Jadikan Sebagai Siswa' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        //Cek Data Dulu Di Kelas Lintas Minat
                        var cekData = firebase.database(appSiswa).ref("lintasMinat").orderByChild("filterIdSiswaIdKelasLintasMinat").equalTo(data.$id + "_" + $scope.dataDari.idKelas);
                        var listCekData = $firebaseArray(cekData);
                        $ionicLoading.show();
                        listCekData.$loaded().then(function (response) {
                            $ionicLoading.hide();
                            if (response.length === 0) {
                                var insertData = firebase.database(appSiswa).ref("lintasMinat").push({
                                    'idSiswa': data.$id,
                                    "namaPengguna": data.namaPengguna,
                                    "namaKelasRegular": data.namaKelas,
                                    "namaSekolah": data.namaSekolah,
                                    "idTahunAjaran": data.idTahunAjaran,
                                    "tahunAjaran": data.tahunAjaran,

                                    "idKelas": $stateParams.idKelas,
                                    "tingkatKelas": $stateParams.tingkatKelas,
                                    "jenisRombel": $stateParams.jenisRombel,
                                    "namaKelas": $stateParams.namaKelas,

                                    "namaKotaKabupaten": data.namaKotaKabupaten,
                                    "namaProvinsi": data.namaProvinsi,
                                    "tanggalDisplay": data.tanggalDisplay,
                                    "jamDisplay": data.jamDisplay,

                                    "filterIdSiswaIdKelasLintasMinat": data.$id + "_" + $scope.dataDari.idKelas
                                }).then(function (resp) {
                                    $ionicPopup.alert({
                                        title: 'SUKSES',
                                        template: 'Data Berhasil Ditambahkan',
                                        okType: 'button-balanced'
                                    });
                                    var kelasLintasMinat = firebase.database(appSiswa).ref("lintasMinat").orderByChild("idKelas").equalTo($scope.dataDari.idKelas);
                                    var listKelasLintasMinat = $firebaseArray(kelasLintasMinat);
                                    listKelasLintasMinat.$loaded().then(function (response) {
                                        $scope.totalSiswa = response.length
                                    })
                                })
                            }
                            else {
                                $ionicPopup.alert({
                                    title: 'Perhatian',
                                    template: 'Maaf, Siswa Ini Telah Ditambahkan Di Kelas ' + $scope.dataDari.namaKelas + " Silahkan Cek Kembali, Terimakasih",
                                    okType: 'button-balanced'
                                });
                            }
                        })
                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    // $ionicPopup.alert({
                    //     title: 'Perhatian',
                    //     template: 'Maaf, Anda tidak diperkenankan menghapus data ini. Terimakasih',
                    // });
                    var refObj = firebase.database(appGuru).ref("dataGuru/" + data.$id);
                    var objDelete = $firebaseObject(refObj);
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                        okType: "button-balanced",
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

                    return true;
                }

            });
        }

        var kelasLintasMinat = firebase.database(appSiswa).ref("lintasMinat").orderByChild("idKelas").equalTo($scope.dataDari.idKelas);
        var listKelasLintasMinat = $firebaseArray(kelasLintasMinat);
        listKelasLintasMinat.$loaded().then(function (response) {
            $scope.totalSiswa = response.length
        });

        $scope.lihatData = function () {
            $state.go("menuSekolah.lintasMinatDetailSekolah", {
                "idKelas": $stateParams.idKelas,
                "tingkatKelas": $stateParams.tingkatKelas,
                "jenisRombel": $stateParams.jenisRombel,
                "namaKelas": $stateParams.namaKelas
            })
        }

    }])

    .controller('lintasMinatDetailSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah')

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.dataDari = {
            "idKelas": $stateParams.idKelas,
            "tingkatKelas": $stateParams.tingkatKelas,
            "jenisRombel": $stateParams.jenisRombel,
            "namaKelas": $stateParams.namaKelas
        }

        var ref = firebase.database(appSiswa).ref("lintasMinat").orderByChild("idKelas").equalTo($scope.dataDari.idKelas);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (respone) {
            $ionicLoading.hide();
            $scope.dataLintasMinat = respone;
        });

        $scope.getData = function (data) {
            // console.log(data);
            $ionicActionSheet.show({
                titleText: 'Siswa : ' + data.namaPengguna,
                buttons: [
                    // { text: '<i class="icon ion-checkmark-circled"></i> Jadikan Sebagai Siswa' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Keluarkan Dari Kelas',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {

                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    // $ionicPopup.alert({
                    //     title: 'Perhatian',
                    //     template: 'Maaf, Anda tidak diperkenankan menghapus data ini. Terimakasih',
                    // });
                    var refObj = firebase.database(appSiswa).ref("lintasMinat/" + data.$id);
                    var objDelete = $firebaseObject(refObj);
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Mengeluarkan ' + data.namaPengguna + ' Dari Kelas ' + $scope.dataDari.namaKelas + ' ?',
                        okType: "button-balanced",
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

                    return true;
                }

            });
        }

    }])

    .controller('dataPokokRombelSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah')

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        // $scope.tambahSekolah = function () {
        //     $state.go("menuSekolah.dataSekolahTambahSekolah");
        // }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("dataKelas").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupatenSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataRombel = response
            $scope.totalRombel = response.length;
            $scope.dataRombelMuaraEnim = $scope.dataRombel.groupBy('namaKecamatan');
            console.log($scope.dataRombelMuaraEnim);
        });

        $scope.getDataKecamatan = function (x, y) {
            $state.go("menuSekolah.dataPokokRombelPerKecamatanSekolah", {
                "namaKecamatan": x,
                "idKecamatan": y[0].idKecamatan
            })
        }

    }])

    .controller('dataPokokRombelPerKecamatanSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah')

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("dataKelas").orderByChild("idKecamatan").equalTo($scope.data.idKecamatan);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataRombel = response
            $scope.totalRombel = response.length;
            $scope.dataRombelMuaraEnim = $scope.dataRombel.groupBy('jenjang');
            // console.log($scope.dataGuruMuaraEnim);
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database().ref("dataKelas/" + response[i].$id);
                updateData.update(JSON.parse(JSON.stringify({
                    "filterKecamatanJenjang": response[i].idKecamatan + "_" + response[i].jenjang
                }))).then(function (resp) {
                    console.log('success');
                })
            }
        });

        $scope.getDataJenjang = function (x, y) {
            $state.go("menuSekolah.dataPokokRombelPerJenjangSekolah", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": x
            })
        }

    }])

    .controller('dataPokokRombelPerJenjangSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah')

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("dataKelas").orderByChild("filterKecamatanJenjang").equalTo($scope.data.idKecamatan + "_" + $scope.data.jenjang);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataRombel = response
            $scope.totalRombel = response.length;
            $scope.dataRombelMuaraEnim = $scope.dataRombel.groupBy('namaSekolah');
            // console.log($scope.dataGuruMuaraEnim);
            // console.log(response);
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database().ref("dataKelas/" + response[i].$id);
                updateData.update(JSON.parse(JSON.stringify({
                    "filterKecamatanJenjangIdSekolah": response[i].idKecamatan + "_" + response[i].jenjang + "_" + response[i].idSekolah
                }))).then(function (resp) {
                    console.log('success');
                })
            }
        });

        $scope.getDataSekolah = function (x, y) {
            $state.go("menuSekolah.dataKelasSekolah", {
                "idSekolah": y[0].idSekolah,
                "namaSekolah": x,
                "idKotaKabupaten": y[0].idKotaKabupaten,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": $scope.data.jenjang,
                "namaKecamatan": $scope.data.namaKecamatan,
            })
        }

    }])

    .controller('migrasiSiswaSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah')

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "dataKelas": $stateParams.dataKelas,
        }

        $scope.dataSiswa = [];
        var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idSekolah").equalTo($scope.idSekolah);
        listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSiswa = response;
        })

        var kelasLintasMinat = firebase.database(appSiswaSekolah).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.data.dataKelas.$id);
        var listKelasLintasMinat = $firebaseArray(kelasLintasMinat);
        listKelasLintasMinat.$loaded().then(function (response) {
            $scope.totalSiswa = response.length
        })

        $scope.getData = function (data) {
            console.log(data);
            $ionicActionSheet.show({
                titleText: 'Siswa : ' + data.namaPengguna,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Migrasikan' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        //Cek Data Dulu Di Siswa Sekolah
                        var cekData = firebase.database(appSiswaSekolah).ref("dataSiswa").orderByChild("filterIdSiswaIdKelasIdTahunAjaran").equalTo(data.$id + "_" + $scope.data.dataKelas.$id + "_" + $scope.data.dataKelas.idTahunAjaran);
                        var listCekData = $firebaseArray(cekData);
                        $ionicLoading.show();
                        listCekData.$loaded().then(function (response) {
                            $ionicLoading.hide();
                            if (response.length === 0) {
                                var insertData = firebase.database(appSiswaSekolah).ref("dataSiswa").push({
                                    'idKelas': $scope.data.dataKelas.$id,
                                    "idSiswa": data.$id,
                                    "idTahunAjaran": $scope.data.dataKelas.idTahunAjaran,
                                    "namaKelas": $scope.data.dataKelas.namaKelas,
                                    "namaSiswa": data.namaPengguna,
                                    "tahunAjaran": $scope.data.dataKelas.tahunAjaran,
                                    "tingkatKelas": $scope.data.dataKelas.tingkatKelas,
                                    "idSekolah" : data.idSekolah,
                                    "namaSekolah": data.namaSekolah,
                                    "filterIdSiswaIdKelasIdTahunAjaran": data.$id + "_" + $scope.data.dataKelas.$id + "_" + $scope.data.dataKelas.idTahunAjaran
                                }).then(function (resp) {
                                    var ubahData = firebase.database(appSiswa).ref("dataSiswa/" + data.$id);
                                    ubahData.update(JSON.parse(JSON.stringify({
                                        'idKelas': $scope.data.dataKelas.$id,
                                        "idTahunAjaran": $scope.data.dataKelas.idTahunAjaran,
                                        "namaKelas": $scope.data.dataKelas.namaKelas,
                                        "tahunAjaran": $scope.data.dataKelas.tahunAjaran,
                                        "tingkatKelas": $scope.data.dataKelas.tingkatKelas,
                                    }))).then(function (resp) {
                                        $ionicPopup.alert({
                                            title: 'SUKSES',
                                            template: 'Data Berhasil Ditambahkan',
                                            okType: 'button-balanced'
                                        });
                                        var kelasLintasMinat = firebase.database(appSiswaSekolah).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.data.dataKelas.$id);
                                        var listKelasLintasMinat = $firebaseArray(kelasLintasMinat);
                                        listKelasLintasMinat.$loaded().then(function (response) {
                                            $scope.totalSiswa = response.length
                                        })
                                    })

                                })
                            }
                            else {
                                $ionicPopup.alert({
                                    title: 'Perhatian',
                                    template: 'Maaf, Siswa Ini Telah Ditambahkan Di Kelas ' + response[0].namaKelas + " Silahkan Cek Kembali, Terimakasih",
                                    okType: 'button-balanced'
                                });
                            }
                        })
                    }
                    return true;
                },

            });
        }

        $scope.lihatData = function () {
            $state.go("menuSekolah.migrasiSiswaDetailSekolah", {
                "idKelas": $stateParams.dataKelas.$id,
                "idTahunAjaran": $stateParams.dataKelas.idTahunAjaran,
                "namaKelas": $stateParams.dataKelas.namaKelas
            })
        }

    }])

    .controller('migrasiSiswaDetailSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah')

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.dataDari = {
            "idKelas": $stateParams.idKelas,
            "idTahunAjaran": $stateParams.idTahunAjaran,
            "namaKelas": $stateParams.namaKelas
        }
        console.log($scope.dataDari)

        var ref = firebase.database(appSiswaSekolah).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.dataDari.idKelas);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (respone) {
            $ionicLoading.hide();
            $scope.dataSiswaMigrasi = respone;
        });

        $scope.getData = function (data) {
            // console.log(data);
            $ionicActionSheet.show({
                titleText: 'Siswa : ' + data.namaSiswa,
                buttons: [
                    // { text: '<i class="icon ion-checkmark-circled"></i> Jadikan Sebagai Siswa' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Keluarkan Dari Kelas',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {

                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    // $ionicPopup.alert({
                    //     title: 'Perhatian',
                    //     template: 'Maaf, Anda tidak diperkenankan menghapus data ini. Terimakasih',
                    // });
                    var refObj = firebase.database(appSiswaSekolah).ref("dataSiswa/" + data.$id);
                    var objDelete = $firebaseObject(refObj);
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Mengeluarkan ' + data.namaPengguna + ' Dari Kelas ' + $scope.dataDari.namaKelas + ' ?',
                        okType: "button-balanced",
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

                    return true;
                }

            });
        }

    }])