angular.module('app.beritaSekolah', [])

    .controller('informasiDanBeritaSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

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

        $scope.tambahData = function () {
            $state.go('menuSekolah.tambahBeritaSekolah');
        };

        var ref = firebase.database().ref("webInformasiDanBerita").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.informasiBerita = response;
        });

        $scope.getData = function (data) {
            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Berita : ' + data.judulBerita,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Berita' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Tambah Foto' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Berita',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('menuSekolah.editBeritaSekolah', {
                            "idBerita": data.$id,
                            "judulBerita": data.judulBerita,
                        });
                    }
                    if (index === 1) {
                        $state.go('menuSekolah.tambahFotoBeritaSekolah', {
                            "idBerita": data.$id,
                            "judulBerita": data.judulBerita,
                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {

                    var refObj = firebase.database().ref("webInformasiDanBerita/" + data.$id);
                    var objDelete = $firebaseObject(refObj);
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
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

        };

    }])

    .controller('tambahBeritaSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

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

        $scope.formData = {
            "judulBerita": "",
            "isiBerita": "",
            "namaPembuatBerita": "",
            "jabatanPembuatBerita": ""
        };

        $scope.simpan = function () {
            if ($scope.formData.judulBerita !== "" && $scope.formData.isiBerita !== "") {
                var tanggalDisplay = $filter('date')(new Date(), 'dd-MM-yyyy');
                var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                var ref = firebase.database().ref("webInformasiDanBerita");
                ref.push({
                    "judulBerita": $scope.formData.judulBerita,
                    "isiBerita": $scope.formData.isiBerita,
                    "namaPembuatBerita": $scope.formData.namaPembuatBerita,
                    "jabatanPembuatBerita": $scope.formData.jabatanPembuatBerita,
                    "tanggalDisplay": tanggalDisplay,
                    "createAt": createAt,
                    "idSekolah": $scope.idSekolah
                }).then(function (resp) {
                    $state.go('menuSekolah.beritaSekolah');
                    $ionicPopup.alert({
                        title: 'SUKSES',
                        template: 'Data berhasil disimpan',

                    });
                });
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf Seluruh Data Harus Diisi',

                });
            }
        };

    }])

    .controller('editBeritaSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

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
            "idBerita": $stateParams.idBerita,
            "judulBerita": $stateParams.judulBerita,
        };

        var obj = firebase.database().ref("webInformasiDanBerita/" + $scope.data.idBerita);
        $scope.formData = $firebaseObject(obj);

        $scope.simpan = function () {
            if ($scope.formData.judulBerita !== "" && $scope.formData.isiBerita !== "") {

                var ref = firebase.database().ref("webInformasiDanBerita");
                obj.update(JSON.parse(JSON.stringify({
                    "judulBerita": $scope.formData.judulBerita,
                    "isiBerita": $scope.formData.isiBerita,
                    "namaPembuatBerita": $scope.formData.namaPembuatBerita,
                    "jabatanPembuatBerita": $scope.formData.jabatanPembuatBerita,
                }))).then(function (resp) {
                    $state.go('menuSekolah.beritaSekolah');
                    $ionicPopup.alert({
                        title: 'SUKSES',
                        template: 'Data berhasil disimpan',

                    });
                });
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf Seluruh Data Harus Diisi',

                });
            }
        };

    }])

    .controller('tambahFotoBeritaSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

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
            "idBerita": $stateParams.idBerita,
            "judulBerita": $stateParams.judulBerita,
        };

        var ref = firebase.database().ref("webInformasiDanBerita/" + $scope.data.idBerita);
        var list = $firebaseObject(ref);

        $ionicLoading.show();
        list.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.datas = response;
            $scope.formData = response;
            // console.log($scope.datas);
            // console.log(response.fotoURL)
            // console.log($scope.datas.keteranganFoto)
        });

        $scope.selectFile = function (file) {
            $scope.filelist = file;
            //  console.log($scope.filelist);
            //  console.log(file.size);
            //  console.log(file.name);
            if (file.size <= 512000) {
                //console.log("fotoBolehDiUpload");
                //Create Firebase Storage Reference
                var storageRef = firebase.storage().ref("fotoBerita/" + $scope.idSekolah + "-" + file.name);
                var storage = $firebaseStorage(storageRef);

                //Upload File
                var uploadTask = storage.$put(file);

                //Create Progress Bar
                $ionicLoading.show();
                uploadTask.$progress(function (snapshot) {
                    var percentageUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    $scope.percentage = percentageUpload.toFixed(0);
                    // uploader.style.width = $scope.percentage + '%';
                    $ionicLoading.hide();
                    console.log(percentageUpload);

                });

                //Upload Completition
                $ionicLoading.show();
                uploadTask.$complete(function (snapshot) {
                    $scope.showImage = snapshot.downloadURL;
                    // 			console.log(snapshot);
                    // 			console.log(snapshot.downloadURL);
                    var refAddFoto = firebase.database().ref("webInformasiDanBerita/" + $scope.data.idBerita);
                    refAddFoto.update(JSON.parse(JSON.stringify({
                        "fotoURL": $scope.showImage,
                        "namaFoto": $scope.idPengguna + "-" + file.name
                    }))).then(function (res) {
                        $ionicLoading.hide();
                        //console.log(response);
                        return true;
                    }).then(function (err) {
                        //console.log(error);
                    })
                    // $firebaseArray(refAddFoto).$add({
                    //     "idPengguna": $scope.idPengguna,
                    //     "uid": $scope.uid,
                    //     "fotoURL": $scope.showImage,
                    //     "namaFoto": $scope.idPengguna + "-" + file.name
                    // }).then(function (response) {
                    //     $ionicLoading.hide();
                    //     //console.log(response);
                    //     return true;
                    // }).then(function (error) {
                    //     //console.log(error);
                    // });

                })
            }
            else if (file.size > 512000) {
                //console.log("FotoKebesaranCuy");
                $ionicPopup.alert({
                    title: 'Informasi',
                    template: 'Maaf foto yang Anda upload terlalu besar, besaran foto harus kurang dari 512KB, Terimakasih',

                });
            }
        };

        $scope.formData = {
            "keteranganFoto": "",
        }
        $scope.entryKeteranganFoto = function(){
            ref.update(JSON.parse(JSON.stringify({
                "keteranganFoto": $scope.formData.keteranganFoto
            })))
        }

    }])