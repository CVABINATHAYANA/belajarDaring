angular.module('app.webAlbumFotoSekolah', [])

    .controller('albumFotoSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        $scope.tinymceOptions = {
            plugins: [
                'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
                'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                'save table contextmenu directionality emoticons template paste textcolor'
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",

        };

        $scope.tambahData = function () {
            $state.go('menuSekolah.albumFotoTambahSekolah');
        };

        var ref = firebase.database().ref("webAlbumFoto").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.albumFoto = response;
        });

        $scope.getData = function (data) {
            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Album Foto : ' + data.namaAlbumFoto,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Album' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Tambah Foto' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Album',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('menuSekolah.albumFotoEditSekolah', {
                            "idAlbumFoto": data.$id,
                            "namaAlbumFoto": data.namaAlbumFoto,
                        });
                    }
                    if (index === 1) {
                        $state.go('menuSekolah.albumFotoTambahFotoSekolah', {
                            "idAlbumFoto": data.$id,
                            "namaAlbumFoto": data.namaAlbumFoto,
                        });
                    }

                    return true;
                },

                destructiveButtonClicked: function () {

                    var refObj = firebase.database().ref("webAlbumFoto/" + data.$id);
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

    .controller('albumFotoTambahSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        $scope.tinymceOptions = {
            plugins: [
                'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
                'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                'save table contextmenu directionality emoticons template paste textcolor'
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",

        };

        $scope.formData = {
            "namaAlbumFoto": "",
            "keteranganAlbumFoto": "",
        };

        $scope.simpan = function () {
            if ($scope.formData.namaAlbumFoto !== "" && $scope.formData.keteranganAlbumFoto !== "") {
                var tanggalDisplay = $filter('date')(new Date(), 'dd-MM-yyyy');
                var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                var ref = firebase.database().ref("webAlbumFoto");
                ref.push({
                    "namaAlbumFoto": $scope.formData.namaAlbumFoto,
                    "keteranganAlbumFoto": $scope.formData.keteranganAlbumFoto,
                    "tanggalDisplay": tanggalDisplay,
                    "createAt": createAt,
                    "idSekolah": $scope.idSekolah
                }).then(function (resp) {
                    $state.go('menuSekolah.fotoSekolah');
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

    .controller('albumFotoEditSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        $scope.tinymceOptions = {
            plugins: [
                'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
                'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                'save table contextmenu directionality emoticons template paste textcolor'
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",

        };

        $scope.data = {
            "idAlbumFoto": $stateParams.idAlbumFoto,
            "namaAlbumFoto": $stateParams.namaAlbumFoto,
        };

        var obj = firebase.database().ref("webAlbumFoto/" + $scope.data.idAlbumFoto);
        $scope.formData = $firebaseObject(obj);

        $scope.simpan = function () {
            if ($scope.formData.namaAlbumFoto !== "" && $scope.formData.keteranganAlbumFoto !== "") {

                var ref = firebase.database().ref("webAlbumFoto");
                obj.update(JSON.parse(JSON.stringify({
                    "namaAlbumFoto": $scope.formData.namaAlbumFoto,
                    "keteranganAlbumFoto": $scope.formData.keteranganAlbumFoto,
                }))).then(function (resp) {
                    $state.go('menuSekolah.fotoSekolah');
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

    .controller('albumFotoTambahFotoCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

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
            "idAlbumFoto": $stateParams.idAlbumFoto,
            "namaAlbumFoto": $stateParams.namaAlbumFoto,
        };

        var ref = firebase.database().ref("webAlbumFoto/" + $scope.data.idAlbumFoto + "/foto");
        var list = $firebaseArray(ref);

        $ionicLoading.show();
        list.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.datas = response;
        });

        $scope.selectFile = function (file) {
            $scope.filelist = file;
            //  console.log($scope.filelist);
            //  console.log(file.size);
            //  console.log(file.name);
            if (file.size <= 512000) {
                //console.log("fotoBolehDiUpload");
                //Create Firebase Storage Reference
                var storageRef = firebase.storage().ref("fotoAlbumFoto/" + $scope.idSekolah + "-" + file.name);
                var storage = $firebaseStorage(storageRef);

                //Upload File
                var uploadTask = storage.$put(file);

                //Create Progress Bar
                // $ionicLoading.show();
                // uploadTask.$progress(function (snapshot) {
                //     var percentageUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //     $scope.percentage = percentageUpload.toFixed(0);
                //     uploader.style.width = $scope.percentage + '%';
                //     $ionicLoading.hide();
                // });

                //Upload Completition
                $ionicLoading.show();
                uploadTask.$complete(function (snapshot) {
                    $scope.showImage = snapshot.downloadURL;
                    // 			console.log(snapshot);
                    // 			console.log(snapshot.downloadURL);
                    var refAddFoto = firebase.database().ref("webAlbumFoto/" + $scope.data.idAlbumFoto + "/foto");
                    refAddFoto.push(JSON.parse(JSON.stringify({
                        "fotoURL": $scope.showImage,
                        "namaFoto": $scope.uid + "-" + file.name
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

        $scope.getData = function (data) {
            $ionicActionSheet.show({
                titleText: 'Album Foto : ' + data.namaAlbumFoto,
                buttons: [
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Foto',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    return true;
                },

                destructiveButtonClicked: function () {

                    var refObj = firebase.database().ref("webAlbumFoto/" + $scope.data.idAlbumFoto + "/foto/" + data.$id);
                    var objDelete = $firebaseObject(refObj);
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                       
                    });
                    confirmPopup.then(function (res) {
                        if (res) {
                            var storageRef = firebase.storage().ref("fotoAlbumFoto/" + data.namaFoto);
                            $scope.storage = $firebaseStorage(storageRef);
                            $scope.storage.$delete().then(function () {
                                console.log("successfully deleted!");
                            });
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


