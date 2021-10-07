angular.module('app.videoTutorialAdmin', [])

    .controller('videoTutorialAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }


        var ref = firebase.database().ref("videoTutorial");
        var listRef = $firebaseArray(ref);

        $scope.tambahvideoTutorial = function () {
            $scope.formData = {
                "user": "",
                "JudulvideoTutorial": "",
                "LinkvideoTutorial": "",
                "keterangan": "",
            }
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.simpan = function () {
                    console.log($scope.formData.user + '  ' + $scope.formData.JudulvideoTutorial + '  ' + $scope.formData.LinkvideoTutorial + '  ' + $scope.formData.keterangan);
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

                    if ($scope.formData.user !== '' && $scope.formData.JudulvideoTutorial !== '' && $scope.formData.LinkvideoTutorial !== '' && $scope.formData.keterangan !== '') {
                        var ref = firebase.database().ref("videoTutorial/" + $scope.formData.user);
                        ref.push({
                            "user": $scope.formData.user,
                            "JudulvideoTutorial": $scope.formData.JudulvideoTutorial,
                            "LinkvideoTutorial": $scope.formData.LinkvideoTutorial,
                            "keterangan": $scope.formData.keterangan,
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide();
                        })
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf,Data Video harus diisi lengkap terima kasih',
                        });
                    }
                };

            });

        };

        $scope.videoGuru = function () {
            $state.go('menuAdmin.videoTutorialGuruAdmin');
        }

        $scope.videoSekolah = function () {
            $state.go('menuAdmin.videoTutorialSekolahAdmin');
        }

        $scope.videoSiswa = function () {
            $state.go('menuAdmin.videoTutorialSiswaAdmin');
        }

        $scope.videoOrangTua = function () {
            $state.go('menuAdmin.videoTutorialOrangTuaAdmin');
        }

    }])

    // GURU 
    .controller('videoTutorialGuruAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        var video = firebase.database().ref("videoTutorial/Guru");
        var listVideo = $firebaseArray(video);
        $ionicLoading.show();
        listVideo.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataVideo = response;
            console.log($scope.dataVideo);
        });

        $scope.getData = function (data) {
            // console.log(data.idSekolah)
            $ionicActionSheet.show({
                titleText: data.JudulvideoTutorial,
                buttons: [
                    { text: '<i class="icon ion-android-create"></i> Edit Video' },
                    { text: '<i class="icon ion-android-film"></i> Lihat Video' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Video',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        console.log('EDIT');
                        var refObj = firebase.database().ref("videoTutorial/Guru/" + data.$id);
                        // var objEdit = $firebaseObject(refObj);
                        // console.log(objEdit);
                        refObj.on("value", function (snapshot) {
                            console.log(snapshot.val().JudulvideoTutorial);
                            $scope.formData = {
                                "user": snapshot.val().user,
                                "JudulvideoTutorial": snapshot.val().JudulvideoTutorial,
                                "LinkvideoTutorial": snapshot.val().LinkvideoTutorial,
                                "keterangan": snapshot.val().keterangan,
                            }
                            $ionicModal.fromTemplateUrl('templates/modal.html', {
                                scope: $scope,
                                animation: 'slide-in-up'
                            }).then(function (modal) {
                                $scope.modal = modal;
                                $scope.modal.show();

                                $scope.simpan = function () {
                                    $scope.modal.hide();
                                    // console.log($scope.formData.user + '  ' + $scope.formData.JudulvideoTutorial + '  ' + $scope.formData.LinkvideoTutorial + '  ' + $scope.formData.keterangan);
                                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

                                    if ($scope.formData.user !== '' && $scope.formData.JudulvideoTutorial !== '' && $scope.formData.LinkvideoTutorial !== '' && $scope.formData.keterangan !== '') {
                                        var ref = firebase.database().ref("videoTutorial/" + $scope.formData.user + '/' + data.$id);
                                        ref.update({
                                            "user": $scope.formData.user,
                                            "JudulvideoTutorial": $scope.formData.JudulvideoTutorial,
                                            "LinkvideoTutorial": $scope.formData.LinkvideoTutorial,
                                            "keterangan": $scope.formData.keterangan,
                                        }).then(function (resp) {
                                            $ionicLoading.hide();
                                            $ionicPopup.alert({
                                                title: 'UPDATE',
                                                template: 'Data Video Berhasil di  Update',
                                            }).then(function (response) {
                                                $scope.modal.hide();
                                            });

                                        })
                                    }
                                    else {
                                        $ionicPopup.alert({
                                            title: 'Perhatian',
                                            template: 'Maaf,Data Video harus diisi lengkap terima kasih',
                                        });
                                    }
                                };

                            });
                        })
                    }
                    else if (index === 1) {
                        $state.go("menuAdmin.videoTutorialGuruLihatAdmin", {
                            "idVideo": data.$id,
                            "judulVideo": data.JudulvideoTutorial,
                            "keteranganVideo": data.keterangan
                        })
                    }
                    return true;
                },
                destructiveButtonClicked: function () {
                    if ($scope.hakAkses === 'Super Admin') {
                        var refObj = firebase.database().ref("videoTutorial/Guru/" + data.$id);
                        var objDelete = $firebaseObject(refObj);
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Hapus Data',
                            template: 'Apakah anda yakin ingin menghapus video ini?',
                            okType: "button-positive",
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                $ionicLoading.show();
                                objDelete.$remove().then(function (ref) {
                                    console.log('Data Berhasil Dihapus');
                                    $ionicLoading.hide();
                                })
                            }
                            else {
                                console.log('Tidak Jadi Menghapus');
                            }
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Anda tidak diperkenankan menghapus data ini, terima kasih',
                            okType: 'button-positive'
                        });
                    }

                    return true;
                }

            });
        }


    }])
    .controller('videoTutorialGuruLihatAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "idVideo": $stateParams.idVideo,
            "judulVideo": $stateParams.judulVideo,
            "keteranganVideo": $stateParams.keteranganVideo
        }


        var dataVideo = firebase.database().ref("videoTutorial/Guru/" + $scope.data.idVideo);
        var obj = $firebaseObject(dataVideo);
        $ionicLoading.show();
        obj.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.formData = response;
            console.log($scope.formData)
        })

    }])

    //ADMIN SEKOLAH 

    .controller('videoTutorialSekolahAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        var video = firebase.database().ref("videoTutorial/Sekolah");
        var listVideo = $firebaseArray(video);
        $ionicLoading.show();
        listVideo.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataVideo = response;
            console.log($scope.dataVideo);
        });

        $scope.getData = function (data) {
            // console.log(data.idSekolah)
            $ionicActionSheet.show({
                titleText: data.JudulvideoTutorial,
                buttons: [
                    { text: '<i class="icon ion-android-create"></i> Edit Video' },
                    { text: '<i class="icon ion-android-film"></i> Lihat Video' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Video',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        console.log('EDIT');
                        var refObj = firebase.database().ref("videoTutorial/Sekolah/" + data.$id);
                        // var objEdit = $firebaseObject(refObj);
                        // console.log(objEdit);
                        refObj.on("value", function (snapshot) {
                            console.log(snapshot.val().JudulvideoTutorial);
                            $scope.formData = {
                                "user": snapshot.val().user,
                                "JudulvideoTutorial": snapshot.val().JudulvideoTutorial,
                                "LinkvideoTutorial": snapshot.val().LinkvideoTutorial,
                                "keterangan": snapshot.val().keterangan,
                            }
                            $ionicModal.fromTemplateUrl('templates/modal.html', {
                                scope: $scope,
                                animation: 'slide-in-up'
                            }).then(function (modal) {
                                $scope.modal = modal;
                                $scope.modal.show();

                                $scope.simpan = function () {
                                    $scope.modal.hide();
                                    // console.log($scope.formData.user + '  ' + $scope.formData.JudulvideoTutorial + '  ' + $scope.formData.LinkvideoTutorial + '  ' + $scope.formData.keterangan);
                                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

                                    if ($scope.formData.user !== '' && $scope.formData.JudulvideoTutorial !== '' && $scope.formData.LinkvideoTutorial !== '' && $scope.formData.keterangan !== '') {
                                        var ref = firebase.database().ref("videoTutorial/" + $scope.formData.user + '/' + data.$id);
                                        ref.update({
                                            "user": $scope.formData.user,
                                            "JudulvideoTutorial": $scope.formData.JudulvideoTutorial,
                                            "LinkvideoTutorial": $scope.formData.LinkvideoTutorial,
                                            "keterangan": $scope.formData.keterangan,
                                        }).then(function (resp) {
                                            $ionicLoading.hide();
                                            $ionicPopup.alert({
                                                title: 'UPDATE',
                                                template: 'Data Video Berhasil di  Update',
                                            }).then(function (response) {
                                                $scope.modal.hide();
                                            });

                                        })
                                    }
                                    else {
                                        $ionicPopup.alert({
                                            title: 'Perhatian',
                                            template: 'Maaf,Data Video harus diisi lengkap terima kasih',
                                        });
                                    }
                                };

                            });
                        })
                    }
                    else if (index === 1) {
                        $state.go("menuAdmin.videoTutorialSekolahLihatAdmin", {
                            "idVideo": data.$id,
                            "judulVideo": data.JudulvideoTutorial,
                            "keteranganVideo": data.keterangan
                        })
                    }
                    return true;
                },
                destructiveButtonClicked: function () {
                    if ($scope.hakAkses === 'Super Admin') {
                        var refObj = firebase.database().ref("videoTutorial/Sekolah/" + data.$id);
                        var objDelete = $firebaseObject(refObj);
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Hapus Data',
                            template: 'Apakah anda yakin ingin menghapus video ini?',
                            okType: "button-positive",
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                $ionicLoading.show();
                                objDelete.$remove().then(function (ref) {
                                    console.log('Data Berhasil Dihapus');
                                    $ionicLoading.hide();
                                })
                            }
                            else {
                                console.log('Tidak Jadi Menghapus');
                            }
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Anda tidak diperkenankan menghapus data ini, terima kasih',
                            okType: 'button-positive'
                        });
                    }

                    return true;
                }

            });
        }


    }])
    .controller('videoTutorialSekolahLihatAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "idVideo": $stateParams.idVideo,
            "judulVideo": $stateParams.judulVideo,
            "keteranganVideo": $stateParams.keteranganVideo
        }


        var dataVideo = firebase.database().ref("videoTutorial/Sekolah/" + $scope.data.idVideo);
        var obj = $firebaseObject(dataVideo);
        $ionicLoading.show();
        obj.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.formData = response;
            console.log($scope.formData)
        })

    }])

    // SISWA
    .controller('videoTutorialSiswaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        var video = firebase.database().ref("videoTutorial/Siswa");
        var listVideo = $firebaseArray(video);
        $ionicLoading.show();
        listVideo.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataVideo = response;
            console.log($scope.dataVideo);
        });

        $scope.getData = function (data) {
            // console.log(data.idSekolah)
            $ionicActionSheet.show({
                titleText: data.JudulvideoTutorial,
                buttons: [
                    { text: '<i class="icon ion-android-create"></i> Edit Video' },
                    { text: '<i class="icon ion-android-film"></i> Lihat Video' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Video',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        console.log('EDIT');
                        var refObj = firebase.database().ref("videoTutorial/Siswa/" + data.$id);
                        // var objEdit = $firebaseObject(refObj);
                        // console.log(objEdit);
                        refObj.on("value", function (snapshot) {
                            console.log(snapshot.val().JudulvideoTutorial);
                            $scope.formData = {
                                "user": snapshot.val().user,
                                "JudulvideoTutorial": snapshot.val().JudulvideoTutorial,
                                "LinkvideoTutorial": snapshot.val().LinkvideoTutorial,
                                "keterangan": snapshot.val().keterangan,
                            }
                            $ionicModal.fromTemplateUrl('templates/modal.html', {
                                scope: $scope,
                                animation: 'slide-in-up'
                            }).then(function (modal) {
                                $scope.modal = modal;
                                $scope.modal.show();

                                $scope.simpan = function () {
                                    $scope.modal.hide();
                                    // console.log($scope.formData.user + '  ' + $scope.formData.JudulvideoTutorial + '  ' + $scope.formData.LinkvideoTutorial + '  ' + $scope.formData.keterangan);
                                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

                                    if ($scope.formData.user !== '' && $scope.formData.JudulvideoTutorial !== '' && $scope.formData.LinkvideoTutorial !== '' && $scope.formData.keterangan !== '') {
                                        var ref = firebase.database().ref("videoTutorial/" + $scope.formData.user + '/' + data.$id);
                                        ref.update({
                                            "user": $scope.formData.user,
                                            "JudulvideoTutorial": $scope.formData.JudulvideoTutorial,
                                            "LinkvideoTutorial": $scope.formData.LinkvideoTutorial,
                                            "keterangan": $scope.formData.keterangan,
                                        }).then(function (resp) {
                                            $ionicLoading.hide();
                                            $ionicPopup.alert({
                                                title: 'UPDATE',
                                                template: 'Data Video Berhasil di  Update',
                                            }).then(function (response) {
                                                $scope.modal.hide();
                                            });

                                        })
                                    }
                                    else {
                                        $ionicPopup.alert({
                                            title: 'Perhatian',
                                            template: 'Maaf,Data Video harus diisi lengkap terima kasih',
                                        });
                                    }
                                };

                            });
                        })
                    }
                    else if (index === 1) {
                        $state.go("menuAdmin.videoTutorialSiswaLihatAdmin", {
                            "idVideo": data.$id,
                            "judulVideo": data.JudulvideoTutorial,
                            "keteranganVideo": data.keterangan
                        })
                    }
                    return true;
                },
                destructiveButtonClicked: function () {
                    if ($scope.hakAkses === 'Super Admin') {
                        var refObj = firebase.database().ref("videoTutorial/Siswa/" + data.$id);
                        var objDelete = $firebaseObject(refObj);
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Hapus Data',
                            template: 'Apakah anda yakin ingin menghapus video ini?',
                            okType: "button-positive",
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                $ionicLoading.show();
                                objDelete.$remove().then(function (ref) {
                                    console.log('Data Berhasil Dihapus');
                                    $ionicLoading.hide();
                                })
                            }
                            else {
                                console.log('Tidak Jadi Menghapus');
                            }
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Anda tidak diperkenankan menghapus data ini, terima kasih',
                            okType: 'button-positive'
                        });
                    }

                    return true;
                }

            });
        }


    }])
    .controller('videoTutorialSiswaLihatAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "idVideo": $stateParams.idVideo,
            "judulVideo": $stateParams.judulVideo,
            "keteranganVideo": $stateParams.keteranganVideo
        }


        var dataVideo = firebase.database().ref("videoTutorial/Siswa/" + $scope.data.idVideo);
        var obj = $firebaseObject(dataVideo);
        $ionicLoading.show();
        obj.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.formData = response;
            console.log($scope.formData)
        })

    }])

    // ORANG TUA
    .controller('videoTutorialOrangTuaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        var video = firebase.database().ref("videoTutorial/OrangTua");
        var listVideo = $firebaseArray(video);
        $ionicLoading.show();
        listVideo.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataVideo = response;
            console.log($scope.dataVideo);
        });

        $scope.getData = function (data) {
            // console.log(data.idSekolah)
            $ionicActionSheet.show({
                titleText: data.JudulvideoTutorial,
                buttons: [
                    { text: '<i class="icon ion-android-create"></i> Edit Video' },
                    { text: '<i class="icon ion-android-film"></i> Lihat Video' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Video',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        console.log('EDIT');
                        var refObj = firebase.database().ref("videoTutorial/OrangTua/" + data.$id);
                        // var objEdit = $firebaseObject(refObj);
                        // console.log(objEdit);
                        refObj.on("value", function (snapshot) {
                            console.log(snapshot.val().JudulvideoTutorial);
                            $scope.formData = {
                                "user": snapshot.val().user,
                                "JudulvideoTutorial": snapshot.val().JudulvideoTutorial,
                                "LinkvideoTutorial": snapshot.val().LinkvideoTutorial,
                                "keterangan": snapshot.val().keterangan,
                            }
                            $ionicModal.fromTemplateUrl('templates/modal.html', {
                                scope: $scope,
                                animation: 'slide-in-up'
                            }).then(function (modal) {
                                $scope.modal = modal;
                                $scope.modal.show();

                                $scope.simpan = function () {
                                    $scope.modal.hide();
                                    // console.log($scope.formData.user + '  ' + $scope.formData.JudulvideoTutorial + '  ' + $scope.formData.LinkvideoTutorial + '  ' + $scope.formData.keterangan);
                                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

                                    if ($scope.formData.user !== '' && $scope.formData.JudulvideoTutorial !== '' && $scope.formData.LinkvideoTutorial !== '' && $scope.formData.keterangan !== '') {
                                        var ref = firebase.database().ref("videoTutorial/" + $scope.formData.user + '/' + data.$id);
                                        ref.update({
                                            "user": $scope.formData.user,
                                            "JudulvideoTutorial": $scope.formData.JudulvideoTutorial,
                                            "LinkvideoTutorial": $scope.formData.LinkvideoTutorial,
                                            "keterangan": $scope.formData.keterangan,
                                        }).then(function (resp) {
                                            $ionicLoading.hide();
                                            $ionicPopup.alert({
                                                title: 'UPDATE',
                                                template: 'Data Video Berhasil di  Update',
                                            }).then(function (response) {
                                                $scope.modal.hide();
                                            });

                                        })
                                    }
                                    else {
                                        $ionicPopup.alert({
                                            title: 'Perhatian',
                                            template: 'Maaf,Data Video harus diisi lengkap terima kasih',
                                        });
                                    }
                                };

                            });
                        })
                    }
                    else if (index === 1) {
                        $state.go("menuAdmin.videoTutorialOrangTuaLihatAdmin", {
                            "idVideo": data.$id,
                            "judulVideo": data.JudulvideoTutorial,
                            "keteranganVideo": data.keterangan
                        })
                    }
                    return true;
                },
                destructiveButtonClicked: function () {
                    if ($scope.hakAkses === 'Super Admin') {
                        var refObj = firebase.database().ref("videoTutorial/OrangTua/" + data.$id);
                        var objDelete = $firebaseObject(refObj);
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Hapus Data',
                            template: 'Apakah anda yakin ingin menghapus video ini?',
                            okType: "button-positive",
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                $ionicLoading.show();
                                objDelete.$remove().then(function (ref) {
                                    console.log('Data Berhasil Dihapus');
                                    $ionicLoading.hide();
                                })
                            }
                            else {
                                console.log('Tidak Jadi Menghapus');
                            }
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Anda tidak diperkenankan menghapus data ini, terima kasih',
                            okType: 'button-positive'
                        });
                    }

                    return true;
                }

            });
        }


    }])
    .controller('videoTutorialOrangTuaLihatAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "idVideo": $stateParams.idVideo,
            "judulVideo": $stateParams.judulVideo,
            "keteranganVideo": $stateParams.keteranganVideo
        }


        var dataVideo = firebase.database().ref("videoTutorial/OrangTua/" + $scope.data.idVideo);
        var obj = $firebaseObject(dataVideo);
        $ionicLoading.show();
        obj.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.formData = response;
            console.log($scope.formData)
        })

    }])

