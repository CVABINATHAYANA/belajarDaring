angular.module('app.tentangKamiSekolah', [])

    .controller('sambutanKepalaSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

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

        var ref = firebase.database().ref("webFotoKepalaSekolah").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var list = $firebaseArray(ref);

        $ionicLoading.show();
        list.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.datas = response;
            //console.log($scope.datas);
        });

        $scope.selectFile = function (file) {
            $scope.filelist = file;
            //  console.log($scope.filelist);
            //  console.log(file.size);
            //  console.log(file.name);
            //ini adalah danu saputra
            
            if (file.size <= 512000) {
                //console.log("fotoBolehDiUpload");
                //Create Firebase Storage Reference
                var storageRef = firebase.storage().ref("fotoKepalaSekolah/" + $scope.idSekolah + "-" + file.name);
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
                    var refAddFoto = firebase.database().ref("webFotoKepalaSekolah");
                    $firebaseArray(refAddFoto).$add({
                        "idSekolah": $scope.idSekolah,
                        "uid": $scope.uidSekolah,
                        "fotoURL": $scope.showImage,
                        "namaFoto": $scope.idPenggunaSekolah + "-" + file.name
                    }).then(function (response) {
                        $ionicLoading.hide();
                        //console.log(response);
                        return true;
                    }).then(function (error) {
                        //console.log(error);
                    });

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

        $scope.setting = function (data) {
            //console.log(data)
            var obj = firebase.database().ref("webFotoKepalaSekolah/" + data.$id);
            var objDelete = $firebaseObject(obj);
            $ionicActionSheet.show({
                titleText: "Foto: " + data.namaFoto,
                buttons: [
                    //{ text: '<i class="icon ion-android-apps"></i> Set as Profil' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Delete Foto',
                cancelText: 'Cancel',
                cancel: function () {
                    console.log('CANCELLED');
                },

                buttonClicked: function (index) {


                    return true;
                },

                destructiveButtonClicked: function () {
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Foto',
                        template: 'Apakah kamu ingin menghapus foto ini?',
                    });

                    confirmPopup.then(function (res) {
                        if (res) {
                            objDelete.$remove().then(function (resp) {
                                console.log('Deleted');
                            });
                            var storageRef = firebase.storage().ref("fotoKepalaSekolah/" + data.namaFoto);
                            $scope.storage = $firebaseStorage(storageRef);
                            $scope.storage.$delete().then(function () {
                                console.log("successfully deleted!");
                            });
                        }
                        else {
                            console.log('You are not sure');
                        }
                    });
                    return true;
                }
            });


        };

        var refCek = firebase.database().ref("webSambutanKepalaSekolah").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRefCek = $firebaseArray(refCek);
        $ionicLoading.show();
        listRefCek.$loaded().then(function (response) {
            if (response.length === 0) {
                $ionicLoading.hide();
                $scope.formData = {
                    "sambutanKepalaSekolah": "",
                };

                $scope.simpan = function () {
                    if ($scope.formData.visi !== "" && $scope.formData.misi !== "") {
                        $ionicLoading.show();
                        var ref = firebase.database().ref("webSambutanKepalaSekolah");
                        ref.push({
                            "sambutanKepalaSekolah": $scope.formData.sambutanKepalaSekolah,
                            "idSekolah": $scope.idSekolah
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'SUKSES',
                                template: 'Data Berhasil Disimpan',

                            });
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf semua data harus diisi',

                        });
                    }
                };
            }
            else if (response.length === 1) {
                $ionicLoading.hide();
                var obj = firebase.database().ref("webSambutanKepalaSekolah/" + response[0].$id);
                var objData = $firebaseObject(obj);
                $ionicLoading.show();
                objData.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.formData = response;
                });

                $scope.simpan = function () {
                    if ($scope.formData.visi !== "" && $scope.formData.misi !== "") {
                        $ionicLoading.show();

                        obj.update(JSON.parse(JSON.stringify({
                            "sambutanKepalaSekolah": $scope.formData.sambutanKepalaSekolah,
                        }))).then(function (resp) {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'SUKSES',
                                template: 'Data Berhasil Disimpan',

                            });
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf semua data harus diisi',

                        });
                    }
                };

            }
        });

    }])

    .controller('strukturOrganisasiSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

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

        var refCek = firebase.database().ref("webStrukturOrganisasi").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRefCek = $firebaseArray(refCek);
        $ionicLoading.show();
        listRefCek.$loaded().then(function (response) {
            if (response.length === 0) {
                $ionicLoading.hide();
                $scope.formData = {
                    "strukturOrganisasi": "",
                };

                $scope.simpan = function () {
                    if ($scope.formData.visi !== "" && $scope.formData.misi !== "") {
                        $ionicLoading.show();
                        var ref = firebase.database().ref("webStrukturOrganisasi");
                        ref.push({
                            "strukturOrganisasi": $scope.formData.strukturOrganisasi,
                            "idSekolah": $scope.idSekolah
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'SUKSES',
                                template: 'Data Berhasil Disimpan',

                            });
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf semua data harus diisi',

                        });
                    }
                };
            }
            else if (response.length === 1) {
                $ionicLoading.hide();
                var obj = firebase.database().ref("webStrukturOrganisasi/" + response[0].$id);
                var objData = $firebaseObject(obj);
                $ionicLoading.show();
                objData.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.formData = response;
                });

                $scope.simpan = function () {
                    if ($scope.formData.visi !== "" && $scope.formData.misi !== "") {
                        $ionicLoading.show();

                        obj.update(JSON.parse(JSON.stringify({
                            "strukturOrganisasi": $scope.formData.strukturOrganisasi,
                        }))).then(function (resp) {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'SUKSES',
                                template: 'Data Berhasil Disimpan',

                            });
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf semua data harus diisi',

                        });
                    }
                };

            }
        });


    }])

    .controller('tugasPokokDanFungsiSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

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

        var refCek = firebase.database().ref("webTugasPokokDanFungsi").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRefCek = $firebaseArray(refCek);
        $ionicLoading.show();
        listRefCek.$loaded().then(function (response) {
            if (response.length === 0) {
                $ionicLoading.hide();
                $scope.formData = {
                    "tugasPokokDanFungsi": "",
                };

                $scope.simpan = function () {
                    if ($scope.formData.visi !== "" && $scope.formData.misi !== "") {
                        $ionicLoading.show();
                        var ref = firebase.database().ref("webTugasPokokDanFungsi");
                        ref.push({
                            "tugasPokokDanFungsi": $scope.formData.tugasPokokDanFungsi,
                            "idSekolah": $scope.idSekolah
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'SUKSES',
                                template: 'Data Berhasil Disimpan',
                                
                            });
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf semua data harus diisi',
                            
                        });
                    }
                };
            }
            else if (response.length === 1) {
                $ionicLoading.hide();
                var obj = firebase.database().ref("webTugasPokokDanFungsi/" + response[0].$id);
                var objData = $firebaseObject(obj);
                $ionicLoading.show();
                objData.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.formData = response;
                });

                $scope.simpan = function () {
                    if ($scope.formData.visi !== "" && $scope.formData.misi !== "") {
                        $ionicLoading.show();

                        obj.update(JSON.parse(JSON.stringify({
                            "tugasPokokDanFungsi": $scope.formData.tugasPokokDanFungsi,
                        }))).then(function (resp) {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'SUKSES',
                                template: 'Data Berhasil Disimpan',
                                
                            });
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf semua data harus diisi',
                            
                        });
                    }
                };

            }
        });


    }])

    .controller('programDanKegiatanSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

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

        var refCek = firebase.database().ref("webProgramDanKegiatan").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRefCek = $firebaseArray(refCek);
        $ionicLoading.show();
        listRefCek.$loaded().then(function (response) {
            if (response.length === 0) {
                $ionicLoading.hide();
                $scope.formData = {
                    "programDanKegiatan": "",
                };

                $scope.simpan = function () {
                    if ($scope.formData.visi !== "" && $scope.formData.misi !== "") {
                        $ionicLoading.show();
                        var ref = firebase.database().ref("webProgramDanKegiatan");
                        ref.push({
                            "programDanKegiatan": $scope.formData.programDanKegiatan,
                            "idSekolah": $scope.idSekolah
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'SUKSES',
                                template: 'Data Berhasil Disimpan',
                                
                            });
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf semua data harus diisi',
                            
                        });
                    }
                };
            }
            else if (response.length === 1) {
                $ionicLoading.hide();
                var obj = firebase.database().ref("webProgramDanKegiatan/" + response[0].$id);
                var objData = $firebaseObject(obj);
                $ionicLoading.show();
                objData.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.formData = response;
                });

                $scope.simpan = function () {
                    if ($scope.formData.visi !== "" && $scope.formData.misi !== "") {
                        $ionicLoading.show();

                        obj.update(JSON.parse(JSON.stringify({
                            "programDanKegiatan": $scope.formData.programDanKegiatan,
                        }))).then(function (resp) {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'SUKSES',
                                template: 'Data Berhasil Disimpan',
                                
                            });
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf semua data harus diisi',
                            
                        });
                    }
                };

            }
        });


    }])