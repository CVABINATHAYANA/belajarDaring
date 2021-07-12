angular.module('app.informasiSekolah', [])


    .controller('informasiSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

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
            $state.go('menuSekolah.tambahInformasiSekolah');
        };

        var ref = firebase.database().ref("webInformasi").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.informasiInformasi = response;
        });

        $scope.getData = function (data) {
            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Informasi : ' + data.judulInformasi,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Informasi' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Tambah Foto' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Informasi',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('menuSekolah.editInformasiSekolah', {
                            "idInformasi": data.$id,
                            "judulInformasi": data.judulInformasi,
                        });
                    }
                    if (index === 1) {
                        $state.go('menuSekolah.tambahFotoInformasiSekolah', {
                            "idInformasi": data.$id,
                            "judulInformasi": data.judulInformasi,
                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {

                    var refObj = firebase.database().ref("webInformasi/" + data.$id);
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

    .controller('tambahInformasiSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

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
            "judulInformasi": "",
            "isiInformasi": "",
            "namaPembuatInformasi": "",
            "jabatanPembuatInformasi": ""
        };

        $scope.simpan = function () {
            if ($scope.formData.judulInformasi !== "" && $scope.formData.isiInformasi !== "") {
                var tanggalDisplay = $filter('date')(new Date(), 'dd-MM-yyyy');
                var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                var ref = firebase.database().ref("webInformasi");
                ref.push({
                    "judulInformasi": $scope.formData.judulInformasi,
                    "isiInformasi": $scope.formData.isiInformasi,
                    "namaPembuatInformasi": $scope.formData.namaPembuatInformasi,
                    "jabatanPembuatInformasi": $scope.formData.jabatanPembuatInformasi,
                    "tanggalDisplay": tanggalDisplay,
                    "createAt": createAt,
                    "idSekolah": $scope.idSekolah
                }).then(function (resp) {
                    $state.go('menuSekolah.informasiSekolah');
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

    .controller('editInformasiSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

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
            "idInformasi": $stateParams.idInformasi,
            "judulInformasi": $stateParams.judulInformasi,
        };

        var obj = firebase.database().ref("webInformasi/" + $scope.data.idInformasi);
        $scope.formData = $firebaseObject(obj);

        $scope.simpan = function () {
            if ($scope.formData.judulInformasi !== "" && $scope.formData.isiInformasi !== "") {

                var ref = firebase.database().ref("webInformasi");
                obj.update(JSON.parse(JSON.stringify({
                    "judulInformasi": $scope.formData.judulInformasi,
                    "isiInformasi": $scope.formData.isiInformasi,
                    "namaPembuatInformasi": $scope.formData.namaPembuatInformasi,
                    "jabatanPembuatInformasi": $scope.formData.jabatanPembuatInformasi,
                }))).then(function (resp) {
                    $state.go('menuSekolah.informasiSekolah');
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

    .controller('tambahFotoInformasiSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

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
            "idInformasi": $stateParams.idInformasi,
            "judulInformasi": $stateParams.judulInformasi,
        };

        var ref = firebase.database().ref("webInformasi/" + $scope.data.idInformasi);
        var list = $firebaseObject(ref);

        $ionicLoading.show();
        list.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.datas = response;
            console.log($scope.datas);
        });

        $scope.selectFile = function (file) {
            $scope.filelist = file;
            //  console.log($scope.filelist);
            //  console.log(file.size);
            //  console.log(file.name);
            if (file.size <= 512000) {
                //console.log("fotoBolehDiUpload");
                //Create Firebase Storage Reference
                var storageRef = firebase.storage().ref("fotoInformasi/" + $scope.idSekolah + "-" + file.name);
                var storage = $firebaseStorage(storageRef);

                //Upload File
                var uploadTask = storage.$put(file);

                //Create Progress Bar
                $ionicLoading.show();
                uploadTask.$progress(function (snapshot) {
                    var percentageUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    $scope.percentage = percentageUpload.toFixed(0);
                    uploader.style.width = $scope.percentage + '%';
                    $ionicLoading.hide();
                    console.log(percentageUpload);

                });

                //Upload Completition
                $ionicLoading.show();
                uploadTask.$complete(function (snapshot) {
                    $scope.showImage = snapshot.downloadURL;
                    // 			console.log(snapshot);
                    // 			console.log(snapshot.downloadURL);
                    var refAddFoto = firebase.database().ref("webInformasi/" + $scope.data.idInformasi);
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

    }])