angular.module('app.webAlbumVideoSekolah', ['ngYoutubeEmbed'])

    .controller('albumVideoSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            $state.go('menuSekolah.albumVideoTambahSekolah');
        };

        var ref = firebase.database().ref("webAlbumVideo").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.albumVideo = response;
        });

        $scope.getData = function (data) {
            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Album Video : ' + data.namaAlbumVideo,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Album' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Tambah Video' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Album',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('menuSekolah.albumVideoEditSekolah', {
                            "idAlbumVideo": data.$id,
                            "namaAlbumVideo": data.namaAlbumVideo,
                        });
                    }
                    if (index === 1) {
                        $state.go('menuSekolah.albumVideoTambahVideoSekolah', {
                            "idAlbumVideo": data.$id,
                            "namaAlbumVideo": data.namaAlbumVideo,
                        });
                    }

                    return true;
                },

                destructiveButtonClicked: function () {

                    var refObj = firebase.database().ref("webAlbumVideo/" + data.$id);
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

    .controller('albumVideoTambahSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "namaAlbumVideo": "",
            "keteranganAlbumVideo": "",
        };

        $scope.simpan = function () {
            if ($scope.formData.namaAlbumVideo !== "" && $scope.formData.keteranganAlbumVideo !== "") {
                var tanggalDisplay = $filter('date')(new Date(), 'dd-MM-yyyy');
                var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                var ref = firebase.database().ref("webAlbumVideo");
                ref.push({
                    "namaAlbumVideo": $scope.formData.namaAlbumVideo,
                    "keteranganAlbumVideo": $scope.formData.keteranganAlbumVideo,
                    "tanggalDisplay": tanggalDisplay,
                    "createAt": createAt,
                    "idSekolah": $scope.idSekolah
                }).then(function (resp) {
                    $state.go('menuSekolah.videoSekolah');
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

    .controller('albumVideoEditSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "idAlbumVideo": $stateParams.idAlbumVideo,
            "namaAlbumVideo": $stateParams.namaAlbumVideo,
        };

        var obj = firebase.database().ref("webAlbumVideo/" + $scope.data.idAlbumVideo);
        $scope.formData = $firebaseObject(obj);

        $scope.simpan = function () {
            if ($scope.formData.namaAlbumVideo !== "" && $scope.formData.keteranganAlbumVideo !== "") {

                var ref = firebase.database().ref("webAlbumVideo");
                obj.update(JSON.parse(JSON.stringify({
                    "namaAlbumVideo": $scope.formData.namaAlbumVideo,
                    "keteranganAlbumVideo": $scope.formData.keteranganAlbumVideo,
                }))).then(function (resp) {
                    $state.go('menuSekolah.videoSekolah');
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

    .controller('albumVideoTambahVideoSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

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
            "idAlbumVideo": $stateParams.idAlbumVideo,
            "namaAlbumVideo": $stateParams.namaAlbumVideo,
        };

        var ref = firebase.database().ref("webAlbumVideo/" + $scope.data.idAlbumVideo + "/video");
        var list = $firebaseArray(ref);

        $ionicLoading.show();
        list.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.datas = response;
        });


        $scope.tambahData = function () {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.formData = {
                    "linkVideo": '',
                };

                $scope.submit = function () {
                    ////console.log($scope.formData);
                    if ($scope.formData.linkVideo !== '') {

                        $ionicLoading.show();
                        ref.push({
                            "linkVideo": $scope.formData.linkVideo,
                        }).then(function (response) {
                            $ionicLoading.hide();
                            $scope.modal.hide();
                            console.log('success');
                        }).then(function (err) {
                            console.log(err);
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Information',
                            template: 'Please fill all of data, Thank you',
                            
                        });
                    }
                };

            });
        };


        $scope.setting = function (data) {
            $ionicActionSheet.show({
                titleText: data.linkVideo,
                buttons: [
                    { text: '<i class="icon ion-android-apps"></i> Edit' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Delete',
                cancelText: 'Cancel',
                cancel: function () {
                    console.log('CANCELLED');
                },

                buttonClicked: function (index) {
                    //console.log('BUTTON CLICKED', index, data.$id);

                    if (index === 0) {
                        $ionicModal.fromTemplateUrl('templates/modal.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            var refUpdate = firebase.database().ref("webAlbumVideo/" + $scope.data.idAlbumVideo + "/video/" + data.$id);
                            $scope.formData = $firebaseObject(refUpdate);

                            $scope.submit = function () {
                                if ($scope.formData.linkVideo !== '') {
                                    $ionicLoading.show()

                                    refUpdate.update(JSON.parse(JSON.stringify({
                                        "linkVideo": $scope.formData.linkVideo,
                                    })))
                                        .then(function (resp) {
                                            $ionicLoading.hide()
                                            $scope.modal.hide();
                                            console.log('success');
                                        }).then(function (err) {
                                            console.log(err)
                                        })
                                }
                                else {
                                    $ionicPopup.alert({
                                        title: 'Information',
                                        template: 'Please fill all of data',
                                        
                                    });
                                }
                            };

                        });
                    }

                    return true;
                },

                destructiveButtonClicked: function () {
                    console.log('DESTRUCT');
                    var refDelete = firebase.database().ref("webAlbumVideo/" + $scope.data.idAlbumVideo + "/video/" + data.$id);
                    var obj = $firebaseObject(refDelete)

                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Delete Data',
                        template: 'Are you sure to delete this data?',
                        
                    });
                    confirmPopup.then(function (res) {
                        if (res) {
                            obj.$remove().then(function (ref) {
                                console.log('deleted')
                            }, function (error) {
                                console.log("Error:", error);
                            });
                        }
                        else {
                            console.log('Tidak Jadi Menghapus');
                        }
                    });
                    return true;
                }
            });
        }

    }])


