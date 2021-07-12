angular.module('app.dataPokokSiswaSekolah', [])

    .controller('dataSiswaSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "idKotaKabupaten": $stateParams.idKotaKabupaten,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang
        }

        $scope.tambah = function () {
            $state.go("menuSekolah.dataSiswaTambahSekolah", {
                "idSekolah": $stateParams.idSekolah,
                "namaSekolah": $stateParams.namaSekolah,
                "idKotaKabupaten": $stateParams.idKotaKabupaten,
                "idKecamatan": $stateParams.idKecamatan,
                "jenjang": $stateParams.jenjang
            })
        }

        $scope.formData = {
            "idKelas": '',
        }

        var tahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        tahunAjaran.on("child_added", function (snapshot) {
            var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.idSekolah + "_" + snapshot.key);
            listRefKelas = $firebaseArray(refKelas);
            // $ionicLoading.show();
            listRefKelas.$loaded().then(function (response) {
                // $ionicLoading.hide();
                $scope.dataKelas = response;
            })
        });

        $scope.getIdKelas = function () {
            var objKelas = firebase.database().ref("dataKelas/" + $scope.formData.idKelas);
            objKelas.on("value", function (snapshot) {
                if (snapshot.val().jenisRombel === 'Lintas Minat') {
                    var ref = firebase.database(appSiswa).ref("lintasMinat").orderByChild("idKelas").equalTo($scope.formData.idKelas);
                    var listRef = $firebaseArray(ref);

                    $ionicLoading.show();
                    listRef.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.dataSiswa = response;
                        $scope.totalSiswa = response.length;
                    });
                }
                else {
                    var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.formData.idKelas);
                    var listRef = $firebaseArray(ref);

                    $ionicLoading.show();
                    listRef.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.dataSiswa = response;
                        $scope.totalSiswa = response.length;
                    });
                }
            })
        }


        var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRef = $firebaseArray(ref);

        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSiswa = response;
            $scope.totalSiswa = response.length;
        });

        $scope.getData = function (data) {

            $ionicActionSheet.show({
                titleText: 'Siswa : ' + data.namaPengguna,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Lihat Data' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Data' },
                    // { text: '<i class="icon ion-checkmark-circled"></i> Verifikasi' },
                    // { text: '<i class="icon ion-checkmark-circled"></i> Batal Verifikasi' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        if (data.jenisRombel === 'Lintas Minat') {
                            $state.go('menuSekolah.dataSiswaLihatSekolah', {
                                "idSiswa": data.idSiswa,
                                "namaSiswa": data.namaPengguna,
                                "idSekolah": $stateParams.idSekolah,
                                "namaSekolah": $stateParams.namaSekolah,
                                "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                "idKecamatan": $stateParams.idKecamatan,
                                "jenjang": $stateParams.jenjang
                            });
                        }
                        else {
                            $state.go('menuSekolah.dataSiswaLihatSekolah', {
                                "idSiswa": data.$id,
                                "namaSiswa": data.namaPengguna,
                                "idSekolah": $stateParams.idSekolah,
                                "namaSekolah": $stateParams.namaSekolah,
                                "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                "idKecamatan": $stateParams.idKecamatan,
                                "jenjang": $stateParams.jenjang
                            });
                        }

                    }
                    if (index === 1) {
                        if (data.jenisRombel === 'Lintas Minat') {
                            $state.go('menuSekolah.dataSiswaEditSekolah', {
                                "idSiswa": data.idSiswa,
                                "namaSiswa": data.namaPengguna,
                                "idSekolah": $stateParams.idSekolah,
                                "namaSekolah": $stateParams.namaSekolah,
                                "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                "idKecamatan": $stateParams.idKecamatan,
                                "jenjang": $stateParams.jenjang
                            });
                        }
                        else {
                            $state.go('menuSekolah.dataSiswaEditSekolah', {
                                "idSiswa": data.$id,
                                "namaSiswa": data.namaPengguna,
                                "idSekolah": $stateParams.idSekolah,
                                "namaSekolah": $stateParams.namaSekolah,
                                "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                "idKecamatan": $stateParams.idKecamatan,
                                "jenjang": $stateParams.jenjang
                            });
                        }

                    }
                    if (index === 2) {
                        var updateData = firebase.database(appSiswa).ref("dataSiswa/" + data.$id).update(JSON.parse(JSON.stringify({
                            "aksesAplikasi": true,
                            "ijinkanPenggunaanAplikasi": true
                        })))
                    }
                    if (index === 3) {
                        var updateData = firebase.database(appSiswa).ref("dataSiswa/" + data.$id).update(JSON.parse(JSON.stringify({
                            "aksesAplikasi": false,
                            "ijinkanPenggunaanAplikasi": false
                        })))
                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    // $ionicPopup.alert({
                    //     title: 'Perhatian',
                    //     template: 'Maaf, Anda tidak diperkenankan menghapus data ini. Terimakasih',
                    // });
                    var refObj = firebase.database(appSiswa).ref("dataSiswa/" + data.$id);
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

    }])

    .controller('dataSiswaTambahSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

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
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "idKotaKabupaten": $stateParams.idKotaKabupaten,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang
        }

        $scope.formData = {
            "idProvinsi": '',
            "idKotaKabupaten": '',
            "idKecamatan": '',
            "jenjang": '',
            "idSekolah": '',
            "tingkatKelas": '',
            "idKelas": '',
            "namaPengguna": '',
            "noHandphone": '',
            "jenisKelamin": '',
            "alamat": '',
            "email": '',
            "password": '',
            "ketikUlangPassword": '',
            "time": new Date(),

            "idTahunAjaran": ''
        };

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiSekolah);
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

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenSekolah);
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

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanSekolah);
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

            if (idSekolah === $scope.idSekolah) {
                var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
                refDataSekolah.on("value", function (snapshot) {
                    $scope.namaSekolah = snapshot.val().nama_sekolah;
                })

                var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
                listRefKelas = $firebaseArray(refKelas);
                $ionicLoading.show();
                listRefKelas.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.dataKelas = response;
                })
            }
            else {
                $scope.formData.idSekolah = "";
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Anda tidak diperkenankan memilih sekolah lain. Terimakasih',
                    okType: 'button-balanced'
                });
            }
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
                $scope.dataKelas = response;
            })
        }

        $scope.getKelas = function () {
            id = $scope.formData.idKelas;
            var getDataKelas = firebase.database().ref("dataKelas/" + id);
            getDataKelas.on("value", function (snapshot) {
                $scope.namaKelas = snapshot.val().namaKelas
            })
        }

        $scope.daftar = function () {
            // console.log($scope.formData);

            var tanggal = $filter('date')($scope.formData.time, 'yyyy-MM-dd HH:mm:ss Z');
            var tanggalDisplay = $filter('date')($scope.formData.time, 'dd-MM-yyyy');
            var jamDisplay = $filter('date')($scope.formData.time, 'HH:mm:ss');

            if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.tingkatKelas !== '' && $scope.formData.idKelas !== '' && $scope.formData.namaPengguna !== '' && $scope.formData.noHandphone !== '' && $scope.formData.jenisKelamin !== '' && $scope.formData.alamat !== '' && $scope.formData.email !== '' && $scope.formData.password !== '' && $scope.formData.ketikUlangPassword !== '' && $scope.formData.idTahunAjaran !== '') {

                if ($scope.formData.password === $scope.formData.ketikUlangPassword) {
                    $ionicLoading.show();

                    var auth = $firebaseAuth();
                    auth.$createUserWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                        .then(function (response) {

                            var user = firebase.auth().currentUser;

                            //Entry Data Pengguna
                            var refAddPengguna = firebase.database(appSiswa).ref("dataSiswa");
                            refAddPengguna.push({
                                "idProvinsi": $scope.formData.idProvinsi,
                                "namaProvinsi": $scope.namaProvinsi,
                                "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                                "namaKotaKabupaten": $scope.namaKotaKabupaten,
                                "idKecamatan": $scope.formData.idKecamatan,
                                "namaKecamatan": $scope.namaKecamatan,
                                "jenjang": $scope.formData.jenjang,
                                "idSekolah": $scope.formData.idSekolah,
                                "namaSekolah": $scope.namaSekolah,
                                "alamat": $scope.formData.alamat,
                                "jenisKelamin": $scope.formData.jenisKelamin,

                                "namaPengguna": $scope.formData.namaPengguna,
                                "noHandphone": $scope.formData.noHandphone,
                                "email": $scope.formData.email,
                                "password": $scope.formData.password,
                                "retypePassword": $scope.formData.ketikUlangPassword,
                                "uid": user.uid,
                                "tanggal": tanggal,
                                "tanggalDisplay": tanggalDisplay,
                                "jamDisplay": jamDisplay,
                                "filterRegistrasiKota": $scope.formData.jenjang + "_" + $scope.formData.idKotaKabupaten,
                                "filterRegistrasiProvinsi": $scope.formData.jenjang + "_" + $scope.formData.idProvinsi,

                                "createAt": tanggal,
                                "diBuatOleh": $scope.namaPenggunaSekolah,
                                "idPembuat": $scope.idPenggunaSekolah,

                                "idTahunAjaran": $scope.formData.idTahunAjaran,
                                "tahunAjaran": $scope.dataTahunAjaran,
                                "idKelas": $scope.formData.idKelas,
                                "namaKelas": $scope.namaKelas,
                                "tingkatKelas": $scope.formData.tingkatKelas
                            }).then(function (resp) {
                                var getDataSiswa = firebase.database(appSiswaSekolah).ref("dataSiswa");
                                getDataSiswa.push({
                                    "idTahunAjaran": $scope.formData.idTahunAjaran,
                                    "tahunAjaran": $scope.dataTahunAjaran,
                                    "idKelas": $scope.formData.idKelas,
                                    "namaKelas": $scope.namaKelas,
                                    "tingkatKelas": $scope.formData.tingkatKelas,
                                    "namaSiswa": $scope.formData.namaPengguna,
                                    "idSiswa": resp.key
                                }).then(function (res) {
                                    $ionicLoading.hide();
                                    $state.go('menuSekolah.dataSiswaSekolah', {
                                        "idSekolah": $stateParams.idSekolah,
                                        "namaSekolah": $stateParams.namaSekolah,
                                        "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                        "idKecamatan": $stateParams.idKecamatan,
                                        "jenjang": $stateParams.jenjang
                                    });
                                    $ionicPopup.alert({
                                        title: 'SUKSES',
                                        template: "Data siswa berhasil dibuat",
                                        okType: 'button-balanced'
                                    });
                                })

                            });

                        })
                        .catch(function (error) {
                            $ionicLoading.hide();
                            //console.log(error);
                            $ionicPopup.alert({
                                title: 'Information',
                                template: error.message,
                                okType: 'button-balanced'
                            });
                        });

                }
                else {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Password yang Anda ketikkan tidak sama, harap cek kembali, terima kasih',
                        okType: 'button-balanced'
                    });
                }

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

    .controller('dataSiswaEditSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

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
            "idSiswa": $stateParams.idSiswa,
            "namaSiswa": $stateParams.namaSiswa,
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "idKotaKabupaten": $stateParams.idKotaKabupaten,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang
        }

        var obj = firebase.database(appSiswa).ref("dataSiswa/" + $scope.data.idSiswa);
        $scope.formData = $firebaseObject(obj);

        obj.on("value", function (snapshot) {
            //console.log(snapshot.val());
            $scope.idTahunAjaran = snapshot.val().idTahunAjaran;
            //Data Provinsi
            var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiSekolah);
            var listProvinsi = $firebaseArray(refProvinsi);

            listProvinsi.$loaded().then(function (response) {
                $scope.dataProvinsi = response;
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenSekolah);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanSekolah);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);

            var refSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.idKecamatanSekolah + "_" + $scope.jenjangSekolah);
            var listSekolah = $firebaseArray(refSekolah);

            listSekolah.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;

            });

            var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.idSekolah + "_" + snapshot.val().idTahunAjaran);
            listRefKelas = $firebaseArray(refKelas);
            $ionicLoading.show();
            listRefKelas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKelas = response;
            })

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

        })

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiSekolah);
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

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenSekolah);
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

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanSekolah);
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
                for (i = 0; i <= response.length; i++) {
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

            if (idSekolah === $scope.idSekolah) {
                var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
                refDataSekolah.on("value", function (snapshot) {
                    $scope.namaSekolah = snapshot.val().nama_sekolah;
                })

                var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.idSekolahGuru + "_" + $scope.idTahunAjaran);
                listRefKelas = $firebaseArray(refKelas);
                $ionicLoading.show();
                listRefKelas.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.dataKelas = response;
                })
            }
            else {
                $scope.formData.idSekolah = "";
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Anda tidak diperkenankan memilih sekolah lain. Terimakasih',
                    okType: 'button-balanced'
                });
            }
        };

        // var tahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        var tahunAjaran = firebase.database().ref("tahunAjaran");
        $scope.tahunAjaran = $firebaseArray(tahunAjaran);

        $scope.getTahunAjaran = function () {
            id = $scope.formData.idTahunAjaran;
            var getDataTahunAjaran = firebase.database().ref("tahunAjaran/" + id);
            getDataTahunAjaran.on("value", function (snapshot) {
                $scope.dataTahunAjaran = snapshot.val().tahunAjaran
            })
            var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.idSekolahGuru + "_" + id);
            listRefKelas = $firebaseArray(refKelas);
            $ionicLoading.show();
            listRefKelas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKelas = response;
            })
        }

        // var refKelas = firebase.database().ref("dataKelas").orderByChild("idSekolah").equalTo($scope.idSekolahGuru);
        // listRefKelas = $firebaseArray(refKelas);
        // $ionicLoading.show();
        // listRefKelas.$loaded().then(function (response) {
        //     $ionicLoading.hide();
        //     $scope.dataKelas = response;
        // })

        $scope.getKelas = function () {
            id = $scope.formData.idKelas;
            var getDataKelas = firebase.database().ref("dataKelas/" + id);
            getDataKelas.on("value", function (snapshot) {
                $scope.namaKelas = snapshot.val().namaKelas
            })
        }

        $scope.daftar = function () {
            //console.log($scope.formData);

            // var tanggal = $filter('date')($scope.formData.time, 'yyyy-MM-dd HH:mm:ss Z');
            // var tanggalDisplay = $filter('date')($scope.formData.time, 'dd-MM-yyyy');
            // var jamDisplay = $filter('date')($scope.formData.time, 'HH:mm:ss');

            if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.kelas !== '' && $scope.formData.namaKelas !== '' && $scope.formData.namaPengguna !== '' && $scope.formData.noHandphone !== '' && $scope.formData.jenisKelamin !== '' && $scope.formData.alamat !== '') {
                $ionicLoading.show();

                //Update Data Pengguna
                var refAddPengguna = firebase.database(appSiswa).ref("dataSiswa/" + $scope.data.idSiswa);
                refAddPengguna.update(JSON.parse(JSON.stringify({
                    "idProvinsi": $scope.formData.idProvinsi,
                    "namaProvinsi": $scope.namaProvinsi,
                    "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                    "namaKotaKabupaten": $scope.namaKotaKabupaten,
                    "idKecamatan": $scope.formData.idKecamatan,
                    "namaKecamatan": $scope.namaKecamatan,
                    "jenjang": $scope.formData.jenjang,
                    "idSekolah": $scope.formData.idSekolah,
                    "namaSekolah": $scope.namaSekolah,
                    "alamat": $scope.formData.alamat,
                    "jenisKelamin": $scope.formData.jenisKelamin,

                    "namaPengguna": $scope.formData.namaPengguna,
                    "noHandphone": $scope.formData.noHandphone,

                    "filterRegistrasiKota": $scope.formData.jenjang + "_" + $scope.formData.idKotaKabupaten,
                    "filterRegistrasiProvinsi": $scope.formData.jenjang + "_" + $scope.formData.idProvinsi,

                    "idTahunAjaran": $scope.formData.idTahunAjaran,
                    "tahunAjaran": $scope.dataTahunAjaran,
                    "idKelas": $scope.formData.idKelas,
                    "namaKelas": $scope.namaKelas,
                    "tingkatKelas": $scope.formData.tingkatKelas
                }))).then(function (resp) {
                    $ionicLoading.hide();
                    var get = firebase.database(appSiswa).ref("dataSiswa/" + $scope.data.idSiswa + "/kelasSiswa").orderByChild('idTahunAjaran').equalTo($scope.formData.idTahunAjaran);
                    var listGet = $firebaseArray(get);
                    listGet.$loaded().then(function (response) {
                        console.log("jumlahData", response.length);
                        if (response.length === 0) {
                            var insertData = firebase.database(appSiswa).ref("dataSiswa/" + $scope.data.idSiswa + "/kelasSiswa/");
                            insertData.push(JSON.parse(JSON.stringify({
                                "idTahunAjaran": $scope.formData.idTahunAjaran,
                                "tahunAjaran": $scope.dataTahunAjaran,
                                "idKelas": $scope.formData.idKelas,
                                "namaKelas": $scope.namaKelas,
                                "tingkatKelas": $scope.formData.tingkatKelas
                            }))).then(function (resp) {
                                $ionicPopup.alert({
                                    title: 'Sukses',
                                    template: 'Data Siswa Berhasil Diperbaharui',
                                    okType: 'button-balanced'
                                });
                                $state.go('menuSekolah.dataSiswaSekolah', {
                                    "idSekolah": $stateParams.idSekolah,
                                    "namaSekolah": $stateParams.namaSekolah,
                                    "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                    "idKecamatan": $stateParams.idKecamatan,
                                    "jenjang": $stateParams.jenjang
                                });
                                console.log("inserted");
                            })
                        }
                        else if (response.length === 1) {
                            var ubahData = firebase.database(appSiswa).ref("dataSiswa/" + $scope.data.idSiswa + "/kelasSiswa/" + response[0].$id);
                            ubahData.update(JSON.parse(JSON.stringify({
                                "idTahunAjaran": $scope.formData.idTahunAjaran,
                                "tahunAjaran": $scope.dataTahunAjaran,
                                "idKelas": $scope.formData.idKelas,
                                "namaKelas": $scope.namaKelas,
                                "tingkatKelas": $scope.formData.tingkatKelas
                            }))).then(function (resp) {
                                $ionicPopup.alert({
                                    title: 'Sukses',
                                    template: 'Data Siswa Berhasil Diperbaharui',
                                    okType: 'button-balanced'
                                });
                                $state.go('menuSekolah.dataSiswaSekolah', {
                                    "idSekolah": $stateParams.idSekolah,
                                    "namaSekolah": $stateParams.namaSekolah,
                                    "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                    "idKecamatan": $stateParams.idKecamatan,
                                    "jenjang": $stateParams.jenjang
                                });
                                console.log("update");
                            })
                        }
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

    .controller('dataSiswaLihatSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

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
            "idSiswa": $stateParams.idSiswa,
            "namaSiswa": $stateParams.namaSiswa,
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "idKotaKabupaten": $stateParams.idKotaKabupaten,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang
        }

        var obj = firebase.database(appSiswa).ref("dataSiswa/" + $scope.data.idSiswa);
        var listObj = $firebaseObject(obj);
        $ionicLoading.show();
        listObj.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.formData = response;
        })
    }])

    .controller('dataPokokSiswaSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupatenSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSiswa = response
            $scope.totalSiswa = response.length;
            $scope.dataSiswaMuaraEnim = $scope.dataSiswa.groupBy('namaKecamatan');
            // console.log($scope.dataSiswaMuaraEnim);
        });

        $scope.getDataKecamatan = function (x, y) {
            $state.go("menuSekolah.dataPokokSiswaPerKecamatanSekolah", {
                "namaKecamatan": x,
                "idKecamatan": y[0].idKecamatan
            })
        }

    }])

    .controller('dataPokokSiswaPerKecamatanSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKecamatan").equalTo($scope.data.idKecamatan);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSiswa = response
            $scope.totalSiswa = response.length;
            $scope.dataSiswaMuaraEnim = $scope.dataSiswa.groupBy('jenjang');
            // console.log($scope.dataGuruMuaraEnim);
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database(appSiswa).ref("dataSiswa/" + response[i].$id);
                updateData.update(JSON.parse(JSON.stringify({
                    "filterKecamatanJenjang": response[i].idKecamatan + "_" + response[i].jenjang
                }))).then(function (resp) {
                    console.log('success');
                })
            }
        });

        $scope.getDataJenjang = function (x, y) {
            $state.go("menuSekolah.dataPokokSiswaPerJenjangSekolah", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": x
            })
        }

    }])

    .controller('dataPokokSiswaPerJenjangSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("filterKecamatanJenjang").equalTo($scope.data.idKecamatan + "_" + $scope.data.jenjang);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSiswa = response
            $scope.totalSiswa = response.length;
            $scope.dataSiswaMuaraEnim = $scope.dataSiswa.groupBy('namaSekolah');
            // console.log($scope.dataGuruMuaraEnim);
            // console.log(response);
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database(appSiswa).ref("dataSiswa/" + response[i].$id);
                updateData.update(JSON.parse(JSON.stringify({
                    "filterKecamatanJenjangIdSekolah": response[i].idKecamatan + "_" + response[i].jenjang + "_" + response[i].idSekolah
                }))).then(function (resp) {
                    console.log('success');
                })
            }
        });

        $scope.getDataSekolah = function (x, y) {
            $state.go("menuSekolah.dataSiswaSekolah", {
                "idSekolah": y[0].idSekolah,
                "namaSekolah": x,
                "idKotaKabupaten": y[0].idKotaKabupaten,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": $scope.data.jenjang,
                "namaKecamatan": $scope.data.namaKecamatan,
            })
        }

    }])

    

    

   