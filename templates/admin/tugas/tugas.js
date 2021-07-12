angular.module('app.tugasAdmin', ['ui.tinymce'])

    .controller('tugasHomeSiswaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        var kecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
        var listKecamatan = $firebaseArray(kecamatan);
        $ionicLoading.show();
        listKecamatan.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataKecamatan = response;
        })

        $scope.getData = function (data) {
            console.log(data)
            $state.go("menuAdmin.tugasSiswaAdmin", {
                "namaKecamatan": data.nama_kecamatan
            })
        }

    }])

    .controller('tugasSiswaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.tambah = function () {
            $state.go("menuAdmin.tugasSiswaTambahAdmin");
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
        }
        console.log($scope.data.idSekolah)

        var tanggal = $filter('date')(new Date(), 'yyyy-MM-dd');

        if ($scope.data.namaKecamatan === "Kec. Denpasar Barat") {
            $scope.totalTugas = [];
            var refTugas = firebase.database(appTugasDenpasarBarat).ref("groupTugasSiswa").orderByChild("tanggalTugas").equalTo(tanggal);
            var listRefTugas = $firebaseArray(refTugas);
            listRefTugas.$loaded().then(function (response) {
                for (i = 0; i < response.length; i++) {
                    $scope.totalTugas.push({
                        "id": response[i].$id
                    })
                }
                $scope.banyakData = $scope.totalTugas.length
            });

            $scope.count = 0;
            $scope.loadMore = function () {
                var ref = firebase.database(appTugasDenpasarBarat).ref("groupTugasSiswa").orderByChild("tanggalTugas").equalTo(tanggal).limitToLast($scope.count += 50);
                var listRef = $firebaseArray(ref);
                $ionicLoading.show();
                listRef.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.tugasSiswa = response
                    // console.log($scope.tugasSiswa)
                    console.log("inilahDatanya", $scope.count)
                    // console.log($scope.banyakData);

                    if ($scope.tugasSiswa.length === $scope.banyakData) {
                        $scope.noMoreItemsAvailable = true;
                        console.log("totalDataTerakhir", $scope.banyakData);
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            }

            $scope.getData = function (data) {
                $ionicActionSheet.show({
                    titleText: 'Data Tugas : ' + data.groupTugas,
                    buttons: [
                        { text: '<i class="icon ion-social-buffer"></i> Lihat Tugas' }
                    ],
                    destructiveText: '<i class="icon ion-trash-b"></i> Hapus Tugas',
                    cancelText: 'Cancel',
                    cancel: function () {
                        //console.log('CANCELLED');
                    },
                    buttonClicked: function (index) {
                        if (index === 0) {
                            $state.go("menuAdmin.tugasSiswaLihatAdmin", {
                                "groupTugas": data.groupTugas,
                                "idGroupTugasSiswa": data.$id,
                                "idGuru": data.idGuru,
                                "namaKecamatan": data.namaKecamatan
                            })
                        }
                        return true;
                    },

                    destructiveButtonClicked: function () {
                        if ($scope.hakAkses === "Super Admin") {
                            var confirmPopup = $ionicPopup.confirm({
                                title: 'Hapus Data',
                                template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                                okType: "button-positive",
                            });
                            confirmPopup.then(function (res) {
                                if (res) {
                                    $ionicLoading.show();
                                    var refObj = firebase.database(appTugasDenpasarBarat).ref("tugasSiswa/").orderByChild("groupTugas").equalTo(data.groupTugas);
                                    var objDelete = $firebaseArray(refObj);
                                    objDelete.$loaded().then(function (response) {
                                        for (i = 0; i < response.length; i++) {
                                            var hapusData = firebase.database(appTugasDenpasarBarat).ref("tugasSiswa/" + response[i].$id);
                                            var objDelete = $firebaseObject(hapusData);
                                            objDelete.$remove().then(function (ref) {
                                                $ionicLoading.hide();
                                                console.log('Data Berhasil Dihapus');
                                                // window.location.reload(true);
                                            });
                                        }
                                    })

                                    var objGroup = firebase.database(appTugasDenpasarBarat).ref("groupTugasSiswa").orderByChild("groupTugas").equalTo(data.groupTugas);
                                    var listObjGroup = $firebaseArray(objGroup);
                                    listObjGroup.$loaded().then(function (hapus) {
                                        var id = hapus[0].$id;

                                        var objHapus = firebase.database(appTugasDenpasarBarat).ref("groupTugasSiswa/" + id);
                                        var objHapusData = $firebaseObject(objHapus);
                                        objHapusData.$remove().then(function (yes) {
                                            $ionicLoading.hide();
                                            console.log("terhapus")
                                        })
                                    })

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

                        return true;
                    }

                });
            }
        }
        else if ($scope.data.namaKecamatan === "Kec. Denpasar Timur") {
            $scope.totalTugas = [];
            var refTugas = firebase.database(appTugasDenpasarTimur).ref("groupTugasSiswa").orderByChild("tanggalTugas").equalTo(tanggal);
            var listRefTugas = $firebaseArray(refTugas);
            listRefTugas.$loaded().then(function (response) {
                for (i = 0; i < response.length; i++) {
                    $scope.totalTugas.push({
                        "id": response[i].$id
                    })
                }
                $scope.banyakData = $scope.totalTugas.length
            });

            $scope.count = 0;
            $scope.loadMore = function () {
                var ref = firebase.database(appTugasDenpasarTimur).ref("groupTugasSiswa").orderByChild("tanggalTugas").equalTo(tanggal).limitToLast($scope.count += 50);
                var listRef = $firebaseArray(ref);
                $ionicLoading.show();
                listRef.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.tugasSiswa = response
                    // console.log($scope.tugasSiswa)
                    console.log("inilahDatanya", $scope.count)
                    // console.log($scope.banyakData);

                    if ($scope.tugasSiswa.length === $scope.banyakData) {
                        $scope.noMoreItemsAvailable = true;
                        console.log("totalDataTerakhir", $scope.banyakData);
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            }

            $scope.getData = function (data) {
                $ionicActionSheet.show({
                    titleText: 'Data Tugas : ' + data.groupTugas,
                    buttons: [
                        { text: '<i class="icon ion-social-buffer"></i> Lihat Tugas' }
                    ],
                    destructiveText: '<i class="icon ion-trash-b"></i> Hapus Tugas',
                    cancelText: 'Cancel',
                    cancel: function () {
                        //console.log('CANCELLED');
                    },
                    buttonClicked: function (index) {
                        if (index === 0) {
                            $state.go("menuAdmin.tugasSiswaLihatAdmin", {
                                "groupTugas": data.groupTugas,
                                "idGroupTugasSiswa": data.$id,
                                "idGuru": data.idGuru,
                                "namaKecamatan": data.namaKecamatan
                            })
                        }
                        return true;
                    },

                    destructiveButtonClicked: function () {
                        if ($scope.hakAkses === "Super Admin") {
                            var confirmPopup = $ionicPopup.confirm({
                                title: 'Hapus Data',
                                template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                                okType: "button-positive",
                            });
                            confirmPopup.then(function (res) {
                                if (res) {
                                    $ionicLoading.show();
                                    var refObj = firebase.database(appTugasDenpasarTimur).ref("tugasSiswa/").orderByChild("groupTugas").equalTo(data.groupTugas);
                                    var objDelete = $firebaseArray(refObj);
                                    objDelete.$loaded().then(function (response) {
                                        for (i = 0; i < response.length; i++) {
                                            var hapusData = firebase.database(appTugasDenpasarTimur).ref("tugasSiswa/" + response[i].$id);
                                            var objDelete = $firebaseObject(hapusData);
                                            objDelete.$remove().then(function (ref) {
                                                $ionicLoading.hide();
                                                console.log('Data Berhasil Dihapus');
                                                // window.location.reload(true);
                                            });
                                        }
                                    })

                                    var objGroup = firebase.database(appTugasDenpasarTimur).ref("groupTugasSiswa").orderByChild("groupTugas").equalTo(data.groupTugas);
                                    var listObjGroup = $firebaseArray(objGroup);
                                    listObjGroup.$loaded().then(function (hapus) {
                                        var id = hapus[0].$id;

                                        var objHapus = firebase.database(appTugasDenpasarTimur).ref("groupTugasSiswa/" + id);
                                        var objHapusData = $firebaseObject(objHapus);
                                        objHapusData.$remove().then(function (yes) {
                                            $ionicLoading.hide();
                                            console.log("terhapus")
                                        })
                                    })

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

                        return true;
                    }

                });
            }
        }
        else if ($scope.data.namaKecamatan === "Kec. Denpasar Utara") {
            $scope.totalTugas = [];
            var refTugas = firebase.database(appTugasDenpasarUtara).ref("groupTugasSiswa").orderByChild("tanggalTugas").equalTo(tanggal);
            var listRefTugas = $firebaseArray(refTugas);
            listRefTugas.$loaded().then(function (response) {
                for (i = 0; i < response.length; i++) {
                    $scope.totalTugas.push({
                        "id": response[i].$id
                    })
                }
                $scope.banyakData = $scope.totalTugas.length
            });

            $scope.count = 0;
            $scope.loadMore = function () {
                var ref = firebase.database(appTugasDenpasarUtara).ref("groupTugasSiswa").orderByChild("tanggalTugas").equalTo(tanggal).limitToLast($scope.count += 50);
                var listRef = $firebaseArray(ref);
                $ionicLoading.show();
                listRef.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.tugasSiswa = response
                    // console.log($scope.tugasSiswa)
                    console.log("inilahDatanya", $scope.count)
                    // console.log($scope.banyakData);

                    if ($scope.tugasSiswa.length === $scope.banyakData) {
                        $scope.noMoreItemsAvailable = true;
                        console.log("totalDataTerakhir", $scope.banyakData);
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            }

            $scope.getData = function (data) {
                $ionicActionSheet.show({
                    titleText: 'Data Tugas : ' + data.groupTugas,
                    buttons: [
                        { text: '<i class="icon ion-social-buffer"></i> Lihat Tugas' },
                    ],
                    destructiveText: '<i class="icon ion-trash-b"></i> Hapus Tugas',
                    cancelText: 'Cancel',
                    cancel: function () {
                        //console.log('CANCELLED');
                    },
                    buttonClicked: function (index) {
                        if (index === 0) {
                            $state.go("menuAdmin.tugasSiswaLihatAdmin", {
                                "groupTugas": data.groupTugas,
                                "idGroupTugasSiswa": data.$id,
                                "idGuru": data.idGuru,
                                "namaKecamatan": data.namaKecamatan
                            })
                        }
                        return true;
                    },

                    destructiveButtonClicked: function () {
                        if ($scope.hakAkses === "Super Admin") {
                            var confirmPopup = $ionicPopup.confirm({
                                title: 'Hapus Data',
                                template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                                okType: "button-positive",
                            });
                            confirmPopup.then(function (res) {
                                if (res) {
                                    $ionicLoading.show();
                                    var refObj = firebase.database(appTugasDenpasarUtara).ref("tugasSiswa/").orderByChild("groupTugas").equalTo(data.groupTugas);
                                    var objDelete = $firebaseArray(refObj);
                                    objDelete.$loaded().then(function (response) {
                                        for (i = 0; i < response.length; i++) {
                                            var hapusData = firebase.database(appTugasDenpasarUtara).ref("tugasSiswa/" + response[i].$id);
                                            var objDelete = $firebaseObject(hapusData);
                                            objDelete.$remove().then(function (ref) {
                                                $ionicLoading.hide();
                                                console.log('Data Berhasil Dihapus');
                                                // window.location.reload(true);
                                            });
                                        }
                                    })

                                    var objGroup = firebase.database(appTugasDenpasarUtara).ref("groupTugasSiswa").orderByChild("groupTugas").equalTo(data.groupTugas);
                                    var listObjGroup = $firebaseArray(objGroup);
                                    listObjGroup.$loaded().then(function (hapus) {
                                        var id = hapus[0].$id;

                                        var objHapus = firebase.database(appTugasDenpasarUtara).ref("groupTugasSiswa/" + id);
                                        var objHapusData = $firebaseObject(objHapus);
                                        objHapusData.$remove().then(function (yes) {
                                            $ionicLoading.hide();
                                            console.log("terhapus")
                                        })
                                    })

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

                        return true;
                    }

                });
            }
        }
        else if ($scope.data.namaKecamatan === "Kec. Denpasar Selatan") {
            $scope.totalTugas = [];
            var refTugas = firebase.database(appTugasDenpasarSelatan).ref("groupTugasSiswa").orderByChild("tanggalTugas").equalTo(tanggal);
            var listRefTugas = $firebaseArray(refTugas);
            listRefTugas.$loaded().then(function (response) {
                for (i = 0; i < response.length; i++) {
                    $scope.totalTugas.push({
                        "id": response[i].$id
                    })
                }
                $scope.banyakData = $scope.totalTugas.length
            });

            $scope.count = 0;
            $scope.loadMore = function () {
                var ref = firebase.database(appTugasDenpasarSelatan).ref("groupTugasSiswa").orderByChild("tanggalTugas").equalTo(tanggal).limitToLast($scope.count += 50);
                var listRef = $firebaseArray(ref);
                $ionicLoading.show();
                listRef.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.tugasSiswa = response
                    // console.log($scope.tugasSiswa)
                    console.log("inilahDatanya", $scope.count)
                    // console.log($scope.banyakData);

                    if ($scope.tugasSiswa.length === $scope.banyakData) {
                        $scope.noMoreItemsAvailable = true;
                        console.log("totalDataTerakhir", $scope.banyakData);
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            }

            $scope.getData = function (data) {
                $ionicActionSheet.show({
                    titleText: 'Data Tugas : ' + data.groupTugas,
                    buttons: [
                        { text: '<i class="icon ion-social-buffer"></i> Lihat Tugas' },
                    ],
                    destructiveText: '<i class="icon ion-trash-b"></i> Hapus Tugas',
                    cancelText: 'Cancel',
                    cancel: function () {
                        //console.log('CANCELLED');
                    },
                    buttonClicked: function (index) {
                        if (index === 0) {
                            $state.go("menuAdmin.tugasSiswaLihatAdmin", {
                                "groupTugas": data.groupTugas,
                                "idGroupTugasSiswa": data.$id,
                                "idGuru": data.idGuru,
                                "namaKecamatan": data.namaKecamatan
                            })
                        }
                        return true;
                    },

                    destructiveButtonClicked: function () {
                        if ($scope.hakAkses === "Super Admin") {
                            var confirmPopup = $ionicPopup.confirm({
                                title: 'Hapus Data',
                                template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                                okType: "button-positive",
                            });
                            confirmPopup.then(function (res) {
                                if (res) {
                                    $ionicLoading.show();
                                    var refObj = firebase.database(appTugasDenpasarSelatan).ref("tugasSiswa/").orderByChild("groupTugas").equalTo(data.groupTugas);
                                    var objDelete = $firebaseArray(refObj);
                                    objDelete.$loaded().then(function (response) {
                                        for (i = 0; i < response.length; i++) {
                                            var hapusData = firebase.database(appTugasDenpasarSelatan).ref("tugasSiswa/" + response[i].$id);
                                            var objDelete = $firebaseObject(hapusData);
                                            objDelete.$remove().then(function (ref) {
                                                $ionicLoading.hide();
                                                console.log('Data Berhasil Dihapus');
                                                // window.location.reload(true);
                                            });
                                        }
                                    })

                                    var objGroup = firebase.database(appTugasDenpasarSelatan).ref("groupTugasSiswa").orderByChild("groupTugas").equalTo(data.groupTugas);
                                    var listObjGroup = $firebaseArray(objGroup);
                                    listObjGroup.$loaded().then(function (hapus) {
                                        var id = hapus[0].$id;

                                        var objHapus = firebase.database(appTugasDenpasarSelatan).ref("groupTugasSiswa/" + id);
                                        var objHapusData = $firebaseObject(objHapus);
                                        objHapusData.$remove().then(function (yes) {
                                            $ionicLoading.hide();
                                            console.log("terhapus")
                                        })
                                    })

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

                        return true;
                    }

                });
            }
        }
        else {
            $scope.totalTugas = [];
            var refTugas = firebase.database().ref("groupTugasSiswa").orderByChild("idSekolah").equalTo($scope.data.idSekolah);
            var listRefTugas = $firebaseArray(refTugas);
            listRefTugas.$loaded().then(function (response) {
                for (i = 0; i < response.length; i++) {
                    $scope.totalTugas.push({
                        "id": response[i].$id
                    })
                }
                $scope.banyakData = $scope.totalTugas.length
            });

            $scope.count = 0;
            $scope.loadMore = function () {
                var ref = firebase.database().ref("groupTugasSiswa").orderByChild("idSekolah").equalTo($scope.data.idSekolah).limitToLast($scope.count += 500);
                var listRef = $firebaseArray(ref);
                $ionicLoading.show();
                listRef.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.tugasSiswa = response
                    // console.log($scope.tugasSiswa)
                    console.log("inilahDatanya", $scope.count)
                    // console.log($scope.banyakData);

                    if ($scope.tugasSiswa.length === $scope.banyakData) {
                        $scope.noMoreItemsAvailable = true;
                        console.log("totalDataTerakhir", $scope.banyakData);
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            }

            $scope.getData = function (data) {
                // sconsole.log(data)
                $ionicActionSheet.show({
                    titleText: 'Data Tugas : ' + data.groupTugas,
                    buttons: [
                        { text: '<i class="icon ion-social-buffer"></i> Lihat Tugas' },
                    ],
                    destructiveText: '<i class="icon ion-trash-b"></i> Hapus Tugas',
                    cancelText: 'Cancel',
                    cancel: function () {
                        //console.log('CANCELLED');
                    },
                    buttonClicked: function (index) {
                        if (index === 0) {
                            $state.go("menuAdmin.tugasSiswaLihatAdmin", {
                                "groupTugas": data.groupTugas,
                                "idGroupTugasSiswa": data.$id,
                                "idGuru": data.idGuru,
                                "namaKecamatan": data.namaKecamatan
                            })
                        }
                        return true;
                    },

                    destructiveButtonClicked: function () {
                        if ($scope.hakAkses === "Super Admin") {
                            var confirmPopup = $ionicPopup.confirm({
                                title: 'Hapus Data',
                                template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                                okType: "button-positive",
                            });
                            confirmPopup.then(function (res) {
                                if (res) {
                                    $ionicLoading.show();
                                    var refObj = firebase.database(appTugas).ref("tugasSiswa/").orderByChild("groupTugas").equalTo(data.groupTugas);
                                    var objDelete = $firebaseArray(refObj);
                                    objDelete.$loaded().then(function (response) {
                                        for (i = 0; i < response.length; i++) {
                                            var hapusData = firebase.database(appTugas).ref("tugasSiswa/" + response[i].$id);
                                            var objDelete = $firebaseObject(hapusData);
                                            objDelete.$remove().then(function (ref) {
                                                $ionicLoading.hide();
                                                console.log('Data Berhasil Dihapus');
                                                // window.location.reload(true);
                                            });
                                        }
                                    })

                                    var objGroup = firebase.database(appTugas).ref("groupTugasSiswa").orderByChild("groupTugas").equalTo(data.groupTugas);
                                    var listObjGroup = $firebaseArray(objGroup);
                                    listObjGroup.$loaded().then(function (hapus) {
                                        var id = hapus[0].$id;

                                        var objHapus = firebase.database(appTugas).ref("groupTugasSiswa/" + id);
                                        var objHapusData = $firebaseObject(objHapus);
                                        objHapusData.$remove().then(function (yes) {
                                            $ionicLoading.hide();
                                            console.log("terhapus")
                                        })
                                    })

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

                        return true;
                    }

                });
            }
        }



        // $scope.getData = function (data) {
        //     console.log(data);
        //     //Cek Tugas Siswa
        //     var cekTugasSiswa = firebase.database(appTugas).ref("tugasSiswa").orderByChild("groupTugas").equalTo(data.groupTugas);
        //     var listCekTugasSiswa = $firebaseArray(cekTugasSiswa);
        //     // $ionicLoading.show();
        //     listCekTugasSiswa.$loaded().then(function (response) {
        //         // $ionicLoading.hide();
        //         console.log("iniDatanya", response);
        //         for (i = 0; i < response.length; i++) {
        //             if (response[i].idPembuat !== undefined) {
        //                 var idPembuat = response[i].idPembuat;
        //             }
        //             else {
        //                 var idPembuat = "";
        //             }
        //             if (response[i].tanggalPengumpulanTugas !== undefined) {
        //                 var tanggalPengumpulanTugas = response[i].tanggalPengumpulanTugas
        //             }
        //             else {
        //                 var tanggalPengumpulanTugas = "";
        //             }
        //             if (response[i].jawabanTugas !== undefined) {
        //                 var jawabanTugas = response[i].jawabanTugas;
        //             }
        //             else {
        //                 var jawabanTugas = "";
        //             }
        //             if (response[i].tanggalKirimTugas !== undefined) {
        //                 var tanggalKirimTugas = response[i].tanggalKirimTugas;
        //             }
        //             else {
        //                 var tanggalKirimTugas = "";
        //             }
        //             if (response[i].nilaiTugasSiswa !== undefined) {
        //                 var nilaiTugasSiswa = response[i].nilaiTugasSiswa;
        //             }
        //             else {
        //                 var nilaiTugasSiswa = ""
        //             }
        //             if(response[i].namaKecamatan==="Kec. Denpasar Barat"){
        //                 var insertTugas = firebase.database(appTugasDenpasarBarat).ref("tugasSiswa")
        //             }
        //             else if(response[i].namaKecamatan==="Kec. Denpasar Utara"){
        //                 var insertTugas = firebase.database(appTugasDenpasarUtara).ref("tugasSiswa")
        //             }
        //             else if(response[i].namaKecamatan==="Kec. Denpasar Selatan"){
        //                 var insertTugas = firebase.database(appTugasDenpasarSelatan).ref("tugasSiswa")
        //             }
        //             insertTugas.push({
        //                 dibaca: response[i].dibaca,
        //                 groupTugas: response[i].groupTugas,
        //                 hariTugas: response[i].hariTugas,
        //                 idGuru: response[i].idGuru,
        //                 idKecamatan: response[i].idKecamatan,
        //                 idKelas: response[i].idKelas,
        //                 idKotaKabupaten: response[i].idKotaKabupaten,
        //                 idPelajaran: response[i].idPelajaran,
        //                 idPembuat: idPembuat,
        //                 idProvinsi: response[i].idProvinsi,
        //                 idSekolah: response[i].idSekolah,
        //                 idSemester: response[i].idSemester,
        //                 idSiswa: response[i].idSiswa,
        //                 idTahunAjaran: response[i].idTahunAjaran,
        //                 isiTugas: response[i].isiTugas,
        //                 jamTugas: response[i].jamTugas,
        //                 jenjang: response[i].jenjang,
        //                 kirimTugas: response[i].kirimTugas,
        //                 namaGuru: response[i].namaGuru,
        //                 namaKecamatan: response[i].namaKecamatan,
        //                 namaKelas: response[i].namaKelas,
        //                 namaKotaKabupaten: response[i].namaKotaKabupaten,
        //                 namaProvinsi: response[i].namaProvinsi,
        //                 namaSekolah: response[i].namaSekolah,
        //                 namaSiswa: response[i].namaSiswa,
        //                 pelajaran: response[i].pelajaran,
        //                 semester: response[i].semester,
        //                 tahunAjaran: response[i].tahunAjaran,
        //                 tanggalPengumpulanTugas: tanggalPengumpulanTugas,
        //                 tanggalTugas: response[i].tanggalTugas,
        //                 jawabanTugas: jawabanTugas,
        //                 tanggalKirimTugas: tanggalKirimTugas,
        //                 nilaiTugasSiswa: nilaiTugasSiswa
        //             }).then(function (resp) {
        //                 // $ionicLoading.hide();
        //                 console.log('Tugas Berhasil Dibuat')
        //             })
        //         }
        //     })
        //     // $ionicActionSheet.show({
        //     //     titleText: 'Data Tugas : ' + data.groupTugas,
        //     //     buttons: [
        //     //         { text: '<i class="icon ion-edit"></i> Edit Tugas ' },
        //     //         { text: '<i class="icon ion-social-buffer"></i> Lihat Tugas' },
        //     //         { text: '<i class="icon ion-social-buffer"></i> Import Tugas' },
        //     //     ],
        //     //     destructiveText: '<i class="icon ion-trash-b"></i> Hapus Tugas',
        //     //     cancelText: 'Cancel',
        //     //     cancel: function () {
        //     //         //console.log('CANCELLED');
        //     //     },
        //     //     buttonClicked: function (index) {
        //     //         if (index === 0) {
        //     //             $state.go("menuAdmin.tugasSiswaEditAdmin", {
        //     //                 "groupTugas": data.groupTugas
        //     //             })
        //     //         }
        //     //         if (index === 1) {
        //     //             $state.go("menuAdmin.tugasSiswaLihatAdmin", {
        //     //                 "groupTugas": data.groupTugas
        //     //             })
        //     //         }
        //     //         if (index === 2) {



        //     //         }
        //     //         return true;
        //     //     },

        //     //     destructiveButtonClicked: function () {
        //     //         if ($scope.hakAkses === "Super Admin") {
        //     //             var confirmPopup = $ionicPopup.confirm({
        //     //                 title: 'Hapus Data',
        //     //                 template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
        //     //                 okType: "button-positive",
        //     //             });
        //     //             confirmPopup.then(function (res) {
        //     //                 if (res) {
        //     //                     $ionicLoading.show();
        //     //                     var refObj = firebase.database(appTugas).ref("tugasSiswa/").orderByChild("groupTugas").equalTo(data.groupTugas);
        //     //                     var objDelete = $firebaseArray(refObj);
        //     //                     objDelete.$loaded().then(function (response) {
        //     //                         for (i = 0; i < response.length; i++) {
        //     //                             var hapusData = firebase.database(appTugas).ref("tugasSiswa/" + response[i].$id);
        //     //                             var objDelete = $firebaseObject(hapusData);
        //     //                             objDelete.$remove().then(function (ref) {
        //     //                                 $ionicLoading.hide();
        //     //                                 console.log('Data Berhasil Dihapus');
        //     //                                 // window.location.reload(true);
        //     //                             });
        //     //                         }
        //     //                     })

        //     //                     var objGroup = firebase.database(appTugas).ref("groupTugasSiswa").orderByChild("groupTugas").equalTo(data.groupTugas);
        //     //                     var listObjGroup = $firebaseArray(objGroup);
        //     //                     listObjGroup.$loaded().then(function (hapus) {
        //     //                         var id = hapus[0].$id;

        //     //                         var objHapus = firebase.database(appTugas).ref("groupTugasSiswa/" + id);
        //     //                         var objHapusData = $firebaseObject(objHapus);
        //     //                         objHapusData.$remove().then(function (yes) {
        //     //                             console.log("terhapus")
        //     //                         })
        //     //                     })

        //     //                 }
        //     //                 else {
        //     //                     //console.log('Tidak Jadi Menghapus');
        //     //                 }
        //     //             });
        //     //         }
        //     //         else {
        //     //             $ionicPopup.alert({
        //     //                 title: 'Perhatian',
        //     //                 template: 'Maaf, Anda tidak diperkenankan menghapus data ini, Terima Kasih',
        //     //                 okType: 'button-positive'
        //     //             });
        //     //         }

        //     //         return true;
        //     //     }

        //     // });
        // }

    }])

    .controller('tugasSiswaTambahAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

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

        $scope.tinymceOptions = {
            content_css: '//www.tiny.cloud/css/codepen.min.css',
            plugins: [
                'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
                'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                'save table contextmenu directionality emoticons template paste textcolor image code '
            ],
            external_plugins: { tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js' },
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry",

            /* enable title field in the Image dialog*/
            image_title: true,
            /* enable automatic uploads of images represented by blob or data URIs*/
            automatic_uploads: true,
            /*
              URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
              images_upload_url: 'postAcceptor.php',
              here we add custom filepicker only to Image dialog
            */
            file_picker_types: 'image',
            /* and here's our custom image picker*/
            file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');

                /*
                  Note: In modern browsers input[type="file"] is functional without
                  even adding it to the DOM, but that might not be the case in some older
                  or quirky browsers like IE, so you might want to add it to the DOM
                  just in case, and visually hide it. And do not forget do remove it
                  once you do not need it anymore.
                */

                input.onchange = function () {
                    var file = this.files[0];

                    var reader = new FileReader();
                    reader.onload = function () {
                        /*
                          Note: Now we need to register the blob in TinyMCEs image blob
                          registry. In the next release this part hopefully won't be
                          necessary, as we are looking to handle it internally.
                        */
                        var id = 'blobid' + (new Date()).getTime();
                        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                        var base64 = reader.result.split(',')[1];
                        var blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);

                        /* call the callback and populate the Title field with the file name */
                        cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                };

                input.click();
            }
        };

        $scope.formData = {
            "idProvinsi": '',
            "idKotaKabupaten": '',
            "idKecamatan": '',
            "jenjang": '',
            "idSekolah": '',
            "idGuru": '',
            "tanggal": new Date(),
            "idTahunAjaran": '',
            "idSemester": '',
            "idKelas": '',
            "idPelajaran": '',
            "isiTugas": '',
            "tanggalPengumpulanTugas": new Date(),
            "publish": false,

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
            });

            Array.prototype.groupBy = function (prop) {
                return this.reduce(function (groups, item) {
                    const val = item[prop]
                    groups[val] = groups[val] || []
                    groups[val].push(item)
                    return groups
                }, {})
            }

            var refKelas = firebase.database(appJadwalPelajaran).ref("jadwalPelajaran/").orderByChild("filterGuru").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran);
            var listRefKelas = $firebaseArray(refKelas);
            listRefKelas.$loaded().then(function (response) {
                $scope.datanya = response
                $scope.dataKelas = $scope.datanya.groupBy('namaKelas');
                console.log($scope.dataKelas);
            })
        }

        var refTahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        $scope.tahunAjaran = $firebaseArray(refTahunAjaran);

        $scope.getTahunAjaran = function () {
            var getDataTahunAjaran = firebase.database().ref("tahunAjaran/" + $scope.formData.idTahunAjaran);
            getDataTahunAjaran.on("value", function (snapshot) {
                $scope.dataTahunAjaran = snapshot.val().tahunAjaran
            });

            Array.prototype.groupBy = function (prop) {
                return this.reduce(function (groups, item) {
                    const val = item[prop]
                    groups[val] = groups[val] || []
                    groups[val].push(item)
                    return groups
                }, {})
            }

            var refKelas = firebase.database(appJadwalPelajaran).ref("jadwalPelajaran/").orderByChild("filterGuru").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran);
            var listRefKelas = $firebaseArray(refKelas);
            listRefKelas.$loaded().then(function (response) {
                $scope.datanya = response
                $scope.dataKelas = $scope.datanya.groupBy('namaKelas');
                console.log($scope.dataKelas);
            })

        }

        var refSemester = firebase.database().ref("semester").orderByChild("aktif").equalTo(true);
        $scope.semester = $firebaseArray(refSemester);

        $scope.getSemester = function () {
            var dataSemester = firebase.database().ref("semester/" + $scope.formData.idSemester);
            dataSemester.on("value", function (snapshot) {
                $scope.dataSemester = snapshot.val().semester;
            })
        }

        $scope.getKelas = function () {
            $scope.dataAbsensi = [];
            $scope.tampil = true;

            var dataKelasNya = firebase.database().ref("dataKelas/" + $scope.formData.idKelas);
            dataKelasNya.on("value", function (snapshot) {
                $scope.namaKelas = snapshot.val().namaKelas;
            })

            console.log($scope.formData.idKelas);
            Array.prototype.groupBy = function (prop) {
                return this.reduce(function (groups, item) {
                    const val = item[prop]
                    groups[val] = groups[val] || []
                    groups[val].push(item)
                    return groups
                }, {})
            }

            var refKelas = firebase.database(appJadwalPelajaran).ref("jadwalPelajaran/").orderByChild("filterPelajaran").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.idKelas);
            var listRefKelas = $firebaseArray(refKelas);
            listRefKelas.$loaded().then(function (response) {
                $scope.datanya = response
                $scope.dataPelajaran = $scope.datanya.groupBy('pelajaran');
                console.log($scope.dataPelajaran);
            });
        }

        $scope.getPelajaran = function () {
            var refPelajaran = firebase.database().ref("mataPelajaran/" + $scope.formData.idPelajaran);
            refPelajaran.on("value", function (snapshot) {
                $scope.pelajaran = snapshot.val().pelajaran
            });

            $scope.dataTugas = [];
            var refSiswa = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.formData.idKelas);
            listRefSiswa = $firebaseArray(refSiswa);
            $ionicLoading.show();
            listRefSiswa.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSiswa = response;

                var tanggalAbsensi = $filter('date')($scope.formData.tanggal, 'yyyy-MM-dd');
                var hariAbsensi = $filter('date')(new (Date), 'EEEE');
                var jamAbsensi = $filter('date')(new (Date), 'HH:mm:ss');
                for (i = 0; i < response.length; i++) {
                    $scope.dataTugas.push({
                        "idSiswa": response[i].$id,
                        "namaSiswa": response[i].namaPengguna,
                        "kirimTugas": true,

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
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.dataSemester,
                        "idKelas": $scope.formData.idKelas,
                        "namaKelas": $scope.namaKelas,
                        "idPelajaran": $scope.formData.idPelajaran,
                        "pelajaran": $scope.pelajaran,
                        "isiTugas": $scope.formData.isiTugas,

                        "tanggalTugas": tanggalAbsensi,
                        "hariTugas": hariAbsensi,
                        "jamTugas": jamAbsensi,
                        "tanggalPengumpulanTugas": $filter('date')($scope.formData.tanggalPengumpulanTugas, 'yyyy-MM-dd')
                    })
                }
                // console.log($scope.dataTugas)
                if ($scope.dataTugas.length > 0) {
                    $scope.tampilButton = true;
                }
                else {
                    $scope.tampilButton = false;
                }
            })
        }

        $scope.getTugas = function (data, $index) {

            var tanggalAbsensi = $filter('date')($scope.formData.tanggal, 'yyyy-MM-dd');
            var hariAbsensi = $filter('date')(new (Date), 'EEEE');
            var jamAbsensi = $filter('date')(new (Date), 'HH:mm:ss');
            var tanggalPengumpulanTugas = $filter('date')($scope.formData.tanggalPengumpulanTugas, 'yyyy-MM-dd');
            var kirimTugas = data.kirimTugas[$index];
            // console.log($scope.dataTugas)
            // console.log("valuenya", kirimTugas);

            // if ($scope.dataTugas.length === 0) {
            //     $scope.dataTugas.push({
            //         "idSiswa": data.$id,
            //         "namaSiswa": data.namaPengguna,
            //         "kirimTugas": kirimTugas,

            //         "idProvinsi": $scope.formData.idProvinsi,
            //         "namaProvinsi": $scope.namaProvinsi,
            //         "idKotaKabupaten": $scope.formData.idKotaKabupaten,
            //         "namaKotaKabupaten": $scope.namaKotaKabupaten,
            //         "idKecamatan": $scope.formData.idKecamatan,
            //         "namaKecamatan": $scope.namaKecamatan,
            //         "jenjang": $scope.formData.jenjang,
            //         "idSekolah": $scope.formData.idSekolah,
            //         "namaSekolah": $scope.namaSekolah,
            //         "idGuru": $scope.formData.idGuru,
            //         "namaGuru": $scope.namaGuru,

            //         "idTahunAjaran": $scope.formData.idTahunAjaran,
            //         "tahunAjaran": $scope.dataTahunAjaran,
            //         "idSemester": $scope.formData.idSemester,
            //         "semester": $scope.dataSemester,
            //         "idKelas": $scope.formData.idKelas,
            //         "namaKelas": $scope.namaKelas,
            //         "idPelajaran": $scope.formData.idPelajaran,
            //         "pelajaran": $scope.pelajaran,
            //         "isiTugas": $scope.formData.isiTugas,

            //         "tanggalTugas": tanggalAbsensi,
            //         "hariTugas": hariAbsensi,
            //         "jamTugas": jamAbsensi,
            //         "tanggalPengumpulanTugas": tanggalPengumpulanTugas
            //     })
            // }
            // else if ($scope.dataTugas.length > 0) {
            //     var idSiswa = data.$id;
            //     var objIndex = $scope.dataTugas.map(function (obj) { return obj.idSiswa; }).indexOf(idSiswa);
            //     console.log("data indexnya : " + objIndex);
            //     if (objIndex < 0 && $scope.dataTugas.idSiswa!==undefined) {
            //         $scope.dataTugas.push({
            //             "idSiswa": data.$id,
            //             "namaSiswa": data.namaPengguna,
            //             "kirimTugas": kirimTugas,

            //             "idProvinsi": $scope.formData.idProvinsi,
            //             "namaProvinsi": $scope.namaProvinsi,
            //             "idKotaKabupaten": $scope.formData.idKotaKabupaten,
            //             "namaKotaKabupaten": $scope.namaKotaKabupaten,
            //             "idKecamatan": $scope.formData.idKecamatan,
            //             "namaKecamatan": $scope.namaKecamatan,
            //             "jenjang": $scope.formData.jenjang,
            //             "idSekolah": $scope.formData.idSekolah,
            //             "namaSekolah": $scope.namaSekolah,
            //             "idGuru": $scope.formData.idGuru,
            //             "namaGuru": $scope.namaGuru,

            //             "idTahunAjaran": $scope.formData.idTahunAjaran,
            //             "tahunAjaran": $scope.dataTahunAjaran,
            //             "idSemester": $scope.formData.idSemester,
            //             "semester": $scope.dataSemester,
            //             "idKelas": $scope.formData.idKelas,
            //             "namaKelas": $scope.namaKelas,
            //             "idPelajaran": $scope.formData.idPelajaran,
            //             "pelajaran": $scope.pelajaran,
            //             "isiTugas": $scope.formData.isiTugas,

            //             "tanggalTugas": tanggalAbsensi,
            //             "hariTugas": hariAbsensi,
            //             "jamTugas": jamAbsensi,
            //             "tanggalPengumpulanTugas": tanggalPengumpulanTugas
            //         })
            //     }
            //     else {
            //         if (kirimTugas === true) {
            //             $scope.dataTugas[objIndex].kirimTugas = kirimTugas;
            //         }
            //         else if (kirimTugas === false) {
            //             $scope.dataTugas.splice(objIndex, 1);
            //         }
            //     }
            // }
            // console.log($scope.dataTugas);
            // if ($scope.dataTugas.length > 0) {
            //     $scope.tampilButton = true;
            // }
            // else {
            //     $scope.tampilButton = false;
            // }
        };

        $scope.simpan = function () {
            var groupTugas = $filter('date')($scope.formData.tanggal, 'yyyyMMddHHmmss');
            var tanggalTugas = $filter('date')($scope.formData.tanggal, 'yyyy-MM-dd');
            var tanggalDisplay = $filter('date')($scope.formData.tanggal, 'dd-MM-YYYY');
            var hariTugas = $filter('date')(new (Date), 'EEEE');
            var jamTugas = $filter('date')(new (Date), 'HH:mm:ss');
            var tanggalPengumpulanTugas = $filter('date')($scope.formData.tanggalPengumpulanTugas, 'yyyy-MM-dd');

            if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.idGuru !== '' && $scope.formData.idTahunAjaran !== '' && $scope.formData.idSemester !== '' && $scope.formData.idKelas !== '' && $scope.formData.idPelajaran !== "" && $scope.formData.isiTugas !== '' && $scope.formData.tanggalPengumpulanTugas !== '') {
                // if ($scope.dataTugas.length === $scope.dataSiswa.length) {
                // }
                // else {
                //     $ionicLoading.hide();
                //     $ionicPopup.alert({
                //         title: 'Perhatian',
                //         template: 'Masih ada beberapa siswa yang belum Anda Ceklist, silahkan cek kembali, terimakasih',
                //         okType: 'button-positive'
                //     });
                // }
                $ionicLoading.show();
                var insertGroupTugas = firebase.database(appTugas).ref("groupTugasSiswa");
                insertGroupTugas.push({
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
                    "idSemester": $scope.formData.idSemester,
                    "semester": $scope.dataSemester,
                    "idKelas": $scope.formData.idKelas,
                    "namaKelas": $scope.namaKelas,
                    "idPelajaran": $scope.formData.idPelajaran,
                    "pelajaran": $scope.pelajaran,

                    "tanggalTugas": tanggalTugas,
                    "tanggalDisplay": tanggalDisplay,
                    "hariTugas": hariTugas,
                    "jamTugas": jamTugas,
                    "tanggalPengumpulanTugas": tanggalPengumpulanTugas,
                    "groupTugas": groupTugas + $scope.formData.idGuru,
                    "idPembuat": $scope.idAdmin,
                    "publish": $scope.formData.publish,

                }).then(function (ok) {

                    var cekData = firebase.database(appTugas).ref("groupTugasSiswa").orderByChild("groupTugas").equalTo(groupTugas + $scope.formData.idGuru);
                    var listCekData = $firebaseArray(cekData);
                    listCekData.$loaded().then(function (response) {
                        console.log(response);
                        $scope.idGroupTugasSiswa = response[0].$id;

                        var x = document.getElementById("myFile");
                        if ('files' in x) {
                            if (x.files.length == 0) {
                                $scope.txt = "Select one or more files.";
                            } else {
                                for (var i = 0; i < x.files.length; i++) {
                                    $scope.txt += "<br><strong>" + (i + 1) + ". file</strong><br>";
                                    var file = x.files[i];
                                    $scope.fileName = file.name;
                                    if ('name' in file) {
                                        $scope.txt += "name: " + file.name + "<br>";
                                    }
                                    if ('size' in file) {
                                        $scope.txt += "size: " + file.size + " bytes <br>";
                                    }
                                    var storageRef = firebase.storage().ref("tugasGuru/" + $scope.formData.idGuru + "/" + groupTugas + $scope.formData.idGuru + "/" + file.name);
                                    var storage = $firebaseStorage(storageRef);
                                    //Upload File
                                    var uploadTask = storage.$put(file);
                                    $ionicLoading.show();
                                    uploadTask.$complete(function (snapshot) {
                                        $scope.showImage = snapshot.downloadURL;
                                        // console.log(snapshot);
                                        // console.log(snapshot.downloadURL);
                                        var refAddFoto = firebase.database(appTugas).ref("groupTugasSiswa/" + $scope.idGroupTugasSiswa + "/fileGuru");
                                        refAddFoto.push({
                                            "fotoURL": $scope.showImage,
                                            "namaFile": snapshot.metadata.name
                                        }).then(function (response) {
                                            $ionicLoading.hide();
                                            //console.log(response);
                                            return true;
                                        }).then(function (error) {
                                            //console.log(error);
                                        });

                                    })
                                }
                            }
                        }
                        else {
                            if (x.value == "") {
                                $scope.txt += "Pilih Satu Atau Banyak File.";
                            } else {
                                $scope.txt += "File property tidak support dengan browser yang Anda gunakan!";
                                $scope.txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
                            }
                        }
                    })


                    for (i = 0; i < $scope.dataTugas.length; i++) {
                        if ($scope.dataTugas[i].kirimTugas === true) {
                            var insertData = firebase.database(appTugas).ref("tugasSiswa");
                            insertData.push({
                                "idSiswa": $scope.dataTugas[i].idSiswa,
                                "namaSiswa": $scope.dataTugas[i].namaSiswa,
                                "kirimTugas": $scope.dataTugas[i].kirimTugas,

                                "idProvinsi": $scope.dataTugas[i].idProvinsi,
                                "namaProvinsi": $scope.dataTugas[i].namaProvinsi,
                                "idKotaKabupaten": $scope.dataTugas[i].idKotaKabupaten,
                                "namaKotaKabupaten": $scope.dataTugas[i].namaKotaKabupaten,
                                "idKecamatan": $scope.dataTugas[i].idKecamatan,
                                "namaKecamatan": $scope.dataTugas[i].namaKecamatan,
                                "jenjang": $scope.dataTugas[i].jenjang,
                                "idSekolah": $scope.dataTugas[i].idSekolah,
                                "namaSekolah": $scope.dataTugas[i].namaSekolah,
                                "idGuru": $scope.dataTugas[i].idGuru,
                                "namaGuru": $scope.dataTugas[i].namaGuru,

                                "idTahunAjaran": $scope.dataTugas[i].idTahunAjaran,
                                "tahunAjaran": $scope.dataTugas[i].tahunAjaran,
                                "idSemester": $scope.dataTugas[i].idSemester,
                                "semester": $scope.dataTugas[i].semester,
                                "idKelas": $scope.dataTugas[i].idKelas,
                                "namaKelas": $scope.dataTugas[i].namaKelas,
                                "idPelajaran": $scope.dataTugas[i].idPelajaran,
                                "pelajaran": $scope.dataTugas[i].pelajaran,
                                "isiTugas": $scope.formData.isiTugas,
                                "kirimTugas": $scope.dataTugas[i].kirimTugas,

                                "tanggalTugas": $scope.dataTugas[i].tanggalTugas,
                                "hariTugas": $scope.dataTugas[i].hariTugas,
                                "jamTugas": $scope.dataTugas[i].jamTugas,
                                "tanggalPengumpulanTugas": $scope.dataTugas[i].tanggalPengumpulanTugas,
                                "groupTugas": groupTugas + $scope.dataTugas[i].idGuru,
                                "dibaca": false,
                                "statusDibaca": $scope.dataTugas[i].idSiswa + "_" + false,
                                "idPembuat": $scope.idAdmin,

                                "publish": $scope.formData.publish,
                                "filterPublish": $scope.dataTugas[i].idSiswa + "_" + $scope.formData.publish
                            }).then(function (resp) {
                                $ionicLoading.hide();
                                $state.go("menuAdmin.tugasSiswaAdmin");
                                // console.log($scope.formData.isiTugas)
                            })
                        }
                    }
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

    .controller('tugasSiswaLihatAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "idGroupTugasSiswa": $stateParams.idGroupTugasSiswa,
            "groupTugas": $stateParams.groupTugas,
            "idGuru": $stateParams.idGuru,
            "namaKecamatan": $stateParams.namaKecamatan,
        }

        if ($scope.data.namaKecamatan === "Kec. Denpasar Barat") {
            var getAbs = firebase.database(appTugasDenpasarBarat).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
            var listGetAbs = $firebaseArray(getAbs);
            $ionicLoading.show();
            listGetAbs.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataGetTugas = response;
                $scope.dataTugas = response[0];
            });

            var fileTugas = firebase.database(appTugasDenpasarBarat).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa + "/fileGuru");
            var listFileTugas = $firebaseArray(fileTugas);
            listFileTugas.$loaded().then(function (response) {
                $scope.fileTugasGuru = response;
                $scope.banyakFile = response.length;
            });

            $scope.hapusFile = function (data, fileGuru) {
                // console.log(fileSiswa);
                var fileTugas = firebase.database(appTugasDenpasarBarat).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa + "/fileGuru/" + fileGuru.$id);
                var objDelete = $firebaseObject(fileTugas);
                objDelete.$remove().then(function (resp) {
                    // console.log("deleted")
                })
                var storageRef = firebase.storage().ref("tugasGuru/" + $scope.data.idGuru + "/" + $scope.data.groupTugas + "/" + fileGuru.namaFile);
                $scope.storage = $firebaseStorage(storageRef);
                $scope.storage.$delete().then(function () {
                    // console.log("successfully deleted!");
                });
            }

            $scope.lihatJawabanTugas = function (data) {
                console.log(data)
                $state.go("menuAdmin.LihatJawabanTugasSiswaAdmin", {
                    "idTugas": data.$id,
                    "namaSiswa": data.namaSiswa,
                    'namaKecamatan': $scope.data.namaKecamatan
                })
            }
        }
        else if ($scope.data.namaKecamatan === "Kec. Denpasar Timur") {
            var getAbs = firebase.database(appTugasDenpasarTimur).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
            var listGetAbs = $firebaseArray(getAbs);
            $ionicLoading.show();
            listGetAbs.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataGetTugas = response;
                $scope.dataTugas = response[0];
            });

            var fileTugas = firebase.database(appTugasDenpasarTimur).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa + "/fileGuru");
            var listFileTugas = $firebaseArray(fileTugas);
            listFileTugas.$loaded().then(function (response) {
                $scope.fileTugasGuru = response;
                $scope.banyakFile = response.length;
            });

            $scope.hapusFile = function (data, fileGuru) {
                // console.log(fileSiswa);
                var fileTugas = firebase.database(appTugasDenpasarTimur).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa + "/fileGuru/" + fileGuru.$id);
                var objDelete = $firebaseObject(fileTugas);
                objDelete.$remove().then(function (resp) {
                    // console.log("deleted")
                })
                var storageRef = firebase.storage().ref("tugasGuru/" + $scope.data.idGuru + "/" + $scope.data.groupTugas + "/" + fileGuru.namaFile);
                $scope.storage = $firebaseStorage(storageRef);
                $scope.storage.$delete().then(function () {
                    // console.log("successfully deleted!");
                });
            }

            $scope.lihatJawabanTugas = function (data) {
                console.log(data)
                $state.go("menuAdmin.LihatJawabanTugasSiswaAdmin", {
                    "idTugas": data.$id,
                    "namaSiswa": data.namaSiswa,
                    'namaKecamatan': $scope.data.namaKecamatan
                })
            }
        }
        else if ($scope.data.namaKecamatan === "Kec. Denpasar Utara") {
            var getAbs = firebase.database(appTugasDenpasarUtara).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
            var listGetAbs = $firebaseArray(getAbs);
            $ionicLoading.show();
            listGetAbs.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataGetTugas = response;
                $scope.dataTugas = response[0];
            });

            var fileTugas = firebase.database(appTugasDenpasarUtara).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa + "/fileGuru");
            var listFileTugas = $firebaseArray(fileTugas);
            listFileTugas.$loaded().then(function (response) {
                $scope.fileTugasGuru = response;
                $scope.banyakFile = response.length;
            });

            $scope.hapusFile = function (data, fileGuru) {
                // console.log(fileSiswa);
                var fileTugas = firebase.database(appTugasDenpasarUtara).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa + "/fileGuru/" + fileGuru.$id);
                var objDelete = $firebaseObject(fileTugas);
                objDelete.$remove().then(function (resp) {
                    // console.log("deleted")
                })
                var storageRef = firebase.storage().ref("tugasGuru/" + $scope.data.idGuru + "/" + $scope.data.groupTugas + "/" + fileGuru.namaFile);
                $scope.storage = $firebaseStorage(storageRef);
                $scope.storage.$delete().then(function () {
                    // console.log("successfully deleted!");
                });
            }

            $scope.lihatJawabanTugas = function (data) {
                console.log(data)
                $state.go("menuAdmin.LihatJawabanTugasSiswaAdmin", {
                    "idTugas": data.$id,
                    "namaSiswa": data.namaSiswa,
                    'namaKecamatan': $scope.data.namaKecamatan
                })
            }
        }
        else if ($scope.data.namaKecamatan === "Kec. Denpasar Selatan") {
            var getAbs = firebase.database(appTugasDenpasarSelatan).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
            var listGetAbs = $firebaseArray(getAbs);
            $ionicLoading.show();
            listGetAbs.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataGetTugas = response;
                $scope.dataTugas = response[0];
            });

            var fileTugas = firebase.database(appTugasDenpasarSelatan).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa + "/fileGuru");
            var listFileTugas = $firebaseArray(fileTugas);
            listFileTugas.$loaded().then(function (response) {
                $scope.fileTugasGuru = response;
                $scope.banyakFile = response.length;
            });

            $scope.hapusFile = function (data, fileGuru) {
                // console.log(fileSiswa);
                var fileTugas = firebase.database(appTugasDenpasarSelatan).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa + "/fileGuru/" + fileGuru.$id);
                var objDelete = $firebaseObject(fileTugas);
                objDelete.$remove().then(function (resp) {
                    // console.log("deleted")
                })
                var storageRef = firebase.storage().ref("tugasGuru/" + $scope.data.idGuru + "/" + $scope.data.groupTugas + "/" + fileGuru.namaFile);
                $scope.storage = $firebaseStorage(storageRef);
                $scope.storage.$delete().then(function () {
                    // console.log("successfully deleted!");
                });
            }

            $scope.lihatJawabanTugas = function (data) {
                console.log(data)
                $state.go("menuAdmin.LihatJawabanTugasSiswaAdmin", {
                    "idTugas": data.$id,
                    "namaSiswa": data.namaSiswa,
                    'namaKecamatan': $scope.data.namaKecamatan
                })
            }
        }
        else {
            var getAbs = firebase.database().ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
            var listGetAbs = $firebaseArray(getAbs);
            $ionicLoading.show();
            listGetAbs.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataGetTugas = response;
                $scope.dataTugas = response[0];
            });

            var fileTugas = firebase.database().ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa + "/fileGuru");
            var listFileTugas = $firebaseArray(fileTugas);
            listFileTugas.$loaded().then(function (response) {
                $scope.fileTugasGuru = response;
                $scope.banyakFile = response.length;
            });

            $scope.hapusFile = function (data, fileGuru) {
                // console.log(fileSiswa);
                var fileTugas = firebase.database(appTugas).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa + "/fileGuru/" + fileGuru.$id);
                var objDelete = $firebaseObject(fileTugas);
                objDelete.$remove().then(function (resp) {
                    // console.log("deleted")
                })
                var storageRef = firebase.storage().ref("tugasGuru/" + $scope.data.idGuru + "/" + $scope.data.groupTugas + "/" + fileGuru.namaFile);
                $scope.storage = $firebaseStorage(storageRef);
                $scope.storage.$delete().then(function () {
                    // console.log("successfully deleted!");
                });
            }

            $scope.lihatJawabanTugas = function (data) {
                console.log(data)
                $state.go("menuAdmin.LihatJawabanTugasSiswaAdmin", {
                    "idTugas": data.$id,
                    "namaSiswa": data.namaSiswa
                })
            }
        }



    }])

    .controller('LihatJawabanTugasSiswaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "idTugas": $stateParams.idTugas,
            "namaSiswa": $stateParams.namaSiswa,
            "namaKecamatan": $stateParams.namaKecamatan,
        }

        if ($scope.data.namaKecamatan === "Kec. Denpasar Barat") {
            var refTugas = firebase.database(appTugasDenpasarBarat).ref("tugasSiswa/" + $scope.data.idTugas);
            var objTugas = $firebaseObject(refTugas);
            $ionicLoading.show();
            objTugas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.formData = response;
            });

            var fileTugas = firebase.database(appTugasDenpasarBarat).ref("tugasSiswa/" + $scope.data.idTugas + "/fileSiswa");
            var listFileTugas = $firebaseArray(fileTugas);
            $ionicLoading.show();
            listFileTugas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.fileTugasSiswa = response;
                $scope.banyakFile = response.length;
            })

            $scope.simpan = function () {
                if ($scope.formData.nilaiTugasSiswa !== undefined) {
                    refTugas.update(JSON.parse(JSON.stringify({
                        "nilaiTugasSiswa": $scope.formData.nilaiTugasSiswa
                    }))).then(function (resp) {
                        $ionicPopup.alert({
                            title: 'SUKSES',
                            template: 'Nilai Tugas ' + $scope.data.namaSiswa + ' Berhasil Dikirim',
                            okType: 'button-positive'
                        });
                    })
                }
            }
        }
        else if ($scope.data.namaKecamatan === "Kec. Denpasar Timur") {
            var refTugas = firebase.database(appTugasDenpasarTimur).ref("tugasSiswa/" + $scope.data.idTugas);
            var objTugas = $firebaseObject(refTugas);
            $ionicLoading.show();
            objTugas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.formData = response;
            });

            var fileTugas = firebase.database(appTugasDenpasarTimur).ref("tugasSiswa/" + $scope.data.idTugas + "/fileSiswa");
            var listFileTugas = $firebaseArray(fileTugas);
            $ionicLoading.show();
            listFileTugas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.fileTugasSiswa = response;
                $scope.banyakFile = response.length;
            })

            $scope.simpan = function () {
                if ($scope.formData.nilaiTugasSiswa !== undefined) {
                    refTugas.update(JSON.parse(JSON.stringify({
                        "nilaiTugasSiswa": $scope.formData.nilaiTugasSiswa
                    }))).then(function (resp) {
                        $ionicPopup.alert({
                            title: 'SUKSES',
                            template: 'Nilai Tugas ' + $scope.data.namaSiswa + ' Berhasil Dikirim',
                            okType: 'button-positive'
                        });
                    })
                }
            }
        }
        else if ($scope.data.namaKecamatan === "Kec. Denpasar Utara") {
            var refTugas = firebase.database(appTugasDenpasarUtara).ref("tugasSiswa/" + $scope.data.idTugas);
            var objTugas = $firebaseObject(refTugas);
            $ionicLoading.show();
            objTugas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.formData = response;
            });

            var fileTugas = firebase.database(appTugasDenpasarUtara).ref("tugasSiswa/" + $scope.data.idTugas + "/fileSiswa");
            var listFileTugas = $firebaseArray(fileTugas);
            $ionicLoading.show();
            listFileTugas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.fileTugasSiswa = response;
                $scope.banyakFile = response.length;
            })

            $scope.simpan = function () {
                if ($scope.formData.nilaiTugasSiswa !== undefined) {
                    refTugas.update(JSON.parse(JSON.stringify({
                        "nilaiTugasSiswa": $scope.formData.nilaiTugasSiswa
                    }))).then(function (resp) {
                        $ionicPopup.alert({
                            title: 'SUKSES',
                            template: 'Nilai Tugas ' + $scope.data.namaSiswa + ' Berhasil Dikirim',
                            okType: 'button-positive'
                        });
                    })
                }
            }
        }
        else if ($scope.data.namaKecamatan === "Kec. Denpasar Selatan") {
            var refTugas = firebase.database(appTugasDenpasarSelatan).ref("tugasSiswa/" + $scope.data.idTugas);
            var objTugas = $firebaseObject(refTugas);
            $ionicLoading.show();
            objTugas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.formData = response;
            });

            var fileTugas = firebase.database(appTugasDenpasarSelatan).ref("tugasSiswa/" + $scope.data.idTugas + "/fileSiswa");
            var listFileTugas = $firebaseArray(fileTugas);
            $ionicLoading.show();
            listFileTugas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.fileTugasSiswa = response;
                $scope.banyakFile = response.length;
            })

            $scope.simpan = function () {
                if ($scope.formData.nilaiTugasSiswa !== undefined) {
                    refTugas.update(JSON.parse(JSON.stringify({
                        "nilaiTugasSiswa": $scope.formData.nilaiTugasSiswa
                    }))).then(function (resp) {
                        $ionicPopup.alert({
                            title: 'SUKSES',
                            template: 'Nilai Tugas ' + $scope.data.namaSiswa + ' Berhasil Dikirim',
                            okType: 'button-positive'
                        });
                    })
                }
            }
        }
        else {
            var refTugas = firebase.database().ref("tugasSiswa/" + $scope.data.idTugas);
            var objTugas = $firebaseObject(refTugas);
            $ionicLoading.show();
            objTugas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.formData = response;
            });

            var fileTugas = firebase.database().ref("tugasSiswa/" + $scope.data.idTugas + "/fileSiswa");
            var listFileTugas = $firebaseArray(fileTugas);
            $ionicLoading.show();
            listFileTugas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.fileTugasSiswa = response;
                $scope.banyakFile = response.length;
            })

            $scope.simpan = function () {
                if ($scope.formData.nilaiTugasSiswa !== undefined) {
                    refTugas.update(JSON.parse(JSON.stringify({
                        "nilaiTugasSiswa": $scope.formData.nilaiTugasSiswa
                    }))).then(function (resp) {
                        $ionicPopup.alert({
                            title: 'SUKSES',
                            template: 'Nilai Tugas ' + $scope.data.namaSiswa + ' Berhasil Dikirim',
                            okType: 'button-positive'
                        });
                    })
                }
            }
        }



    }])

    .controller('tugasSiswaEditAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "groupTugas": $stateParams.groupTugas,
            "idGroupTugasSiswa": $stateParams.idGroupTugasSiswa,
            "namaKecamatan": $stateParams.namaKecamatan
        }

        $scope.tinymceOptions = {
            content_css: '//www.tiny.cloud/css/codepen.min.css',
            plugins: [
                'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
                'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                'save table contextmenu directionality emoticons template paste textcolor image code '
            ],
            external_plugins: { tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js' },
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry",

            /* enable title field in the Image dialog*/
            image_title: true,
            /* enable automatic uploads of images represented by blob or data URIs*/
            automatic_uploads: true,
            /*
              URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
              images_upload_url: 'postAcceptor.php',
              here we add custom filepicker only to Image dialog
            */
            file_picker_types: 'image',
            /* and here's our custom image picker*/
            file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');

                /*
                  Note: In modern browsers input[type="file"] is functional without
                  even adding it to the DOM, but that might not be the case in some older
                  or quirky browsers like IE, so you might want to add it to the DOM
                  just in case, and visually hide it. And do not forget do remove it
                  once you do not need it anymore.
                */

                input.onchange = function () {
                    var file = this.files[0];

                    var reader = new FileReader();
                    reader.onload = function () {
                        /*
                          Note: Now we need to register the blob in TinyMCEs image blob
                          registry. In the next release this part hopefully won't be
                          necessary, as we are looking to handle it internally.
                        */
                        var id = 'blobid' + (new Date()).getTime();
                        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                        var base64 = reader.result.split(',')[1];
                        var blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);

                        /* call the callback and populate the Title field with the file name */
                        cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                };

                input.click();
            }
        };

        if ($scope.data.namaKecamatan === "Kec. Denpasar Barat") {
            var getAbs = firebase.database(appTugasDenpasarBarat).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
            var listGetAbs = $firebaseArray(getAbs);
            $ionicLoading.show();
            listGetAbs.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSiswa = response;
                $scope.formData = response[0];
                $scope.formData.tanggalPengumpulanTugas = new Date(response[0].tanggalPengumpulanTugas);
                console.log($scope.formData.publish);
            })

            $scope.getTugas = function (data) {
                var refAbsensi = firebase.database(appTugasDenpasarBarat).ref("tugasSiswa/" + data.$id);
                refAbsensi.update({
                    "kirimTugas": data.kirimTugas
                }).then(function (resp) {
                    console.log("updated");
                })
            }

            $scope.simpan = function () {
                var tanggalPengumpulanTugas = $filter('date')($scope.formData.tanggalPengumpulanTugas, 'yyyy-MM-dd');
                if ($scope.formData.isiTugas !== "" && $scope.formData.tanggalPengumpulanTugas !== "") {

                    var getAbs = firebase.database(appTugasDenpasarBarat).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
                    var listGetAbs = $firebaseArray(getAbs);
                    listGetAbs.$loaded().then(function (response) {
                        for (i = 0; i < response.length; i++) {
                            var updateData = firebase.database(appTugasDenpasarBarat).ref("tugasSiswa/" + response[i].$id);
                            updateData.update({
                                "isiTugas": $scope.formData.isiTugas,
                                "tanggalPengumpulanTugas": tanggalPengumpulanTugas,
                            }).then(function (resp) {
                                $state.go("menuAdmin.tugasSiswaAdmin")
                            })
                        }
                    })

                    var updateGroupTugas = firebase.database(appTugasDenpasarBarat).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa).update(JSON.parse(JSON.stringify({
                        "publish": $scope.formData.publish,
                    })))

                }
                else {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Seluruh Data Harus Diisi, Terima Kasih',
                        okType: 'button-positive'
                    });
                }
            }
        }
        else if ($scope.data.namaKecamatan === "Kec. Denpasar Timur") {
            var getAbs = firebase.database(appTugasDenpasarTimur).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
            var listGetAbs = $firebaseArray(getAbs);
            $ionicLoading.show();
            listGetAbs.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSiswa = response;
                $scope.formData = response[0];
                $scope.formData.tanggalPengumpulanTugas = new Date(response[0].tanggalPengumpulanTugas);
                console.log($scope.formData.publish);
            })

            $scope.getTugas = function (data) {
                var refAbsensi = firebase.database(appTugasDenpasarTimur).ref("tugasSiswa/" + data.$id);
                refAbsensi.update({
                    "kirimTugas": data.kirimTugas
                }).then(function (resp) {
                    console.log("updated");
                })
            }

            $scope.simpan = function () {
                var tanggalPengumpulanTugas = $filter('date')($scope.formData.tanggalPengumpulanTugas, 'yyyy-MM-dd');
                if ($scope.formData.isiTugas !== "" && $scope.formData.tanggalPengumpulanTugas !== "") {

                    var getAbs = firebase.database(appTugasDenpasarTimur).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
                    var listGetAbs = $firebaseArray(getAbs);
                    listGetAbs.$loaded().then(function (response) {
                        for (i = 0; i < response.length; i++) {
                            var updateData = firebase.database(appTugasDenpasarTimur).ref("tugasSiswa/" + response[i].$id);
                            updateData.update({
                                "isiTugas": $scope.formData.isiTugas,
                                "tanggalPengumpulanTugas": tanggalPengumpulanTugas,
                            }).then(function (resp) {
                                $state.go("menuAdmin.tugasSiswaAdmin")
                            })
                        }
                    })

                    var updateGroupTugas = firebase.database(appTugasDenpasarTimur).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa).update(JSON.parse(JSON.stringify({
                        "publish": $scope.formData.publish,
                    })))

                }
                else {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Seluruh Data Harus Diisi, Terima Kasih',
                        okType: 'button-positive'
                    });
                }
            }
        }
        else if ($scope.data.namaKecamatan === "Kec. Denpasar Utara") {
            var getAbs = firebase.database(appTugasDenpasarUtara).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
            var listGetAbs = $firebaseArray(getAbs);
            $ionicLoading.show();
            listGetAbs.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSiswa = response;
                $scope.formData = response[0];
                $scope.formData.tanggalPengumpulanTugas = new Date(response[0].tanggalPengumpulanTugas);
                console.log($scope.formData.publish);
            })

            $scope.getTugas = function (data) {
                var refAbsensi = firebase.database(appTugasDenpasarUtara).ref("tugasSiswa/" + data.$id);
                refAbsensi.update({
                    "kirimTugas": data.kirimTugas
                }).then(function (resp) {
                    console.log("updated");
                })
            }

            $scope.simpan = function () {
                var tanggalPengumpulanTugas = $filter('date')($scope.formData.tanggalPengumpulanTugas, 'yyyy-MM-dd');
                if ($scope.formData.isiTugas !== "" && $scope.formData.tanggalPengumpulanTugas !== "") {

                    var getAbs = firebase.database(appTugasDenpasarUtara).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
                    var listGetAbs = $firebaseArray(getAbs);
                    listGetAbs.$loaded().then(function (response) {
                        for (i = 0; i < response.length; i++) {
                            var updateData = firebase.database(appTugasDenpasarUtara).ref("tugasSiswa/" + response[i].$id);
                            updateData.update({
                                "isiTugas": $scope.formData.isiTugas,
                                "tanggalPengumpulanTugas": tanggalPengumpulanTugas,
                            }).then(function (resp) {
                                $state.go("menuAdmin.tugasSiswaAdmin")
                            })
                        }
                    })

                    var updateGroupTugas = firebase.database(appTugasDenpasarUtara).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa).update(JSON.parse(JSON.stringify({
                        "publish": $scope.formData.publish,
                    })))

                }
                else {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Seluruh Data Harus Diisi, Terima Kasih',
                        okType: 'button-positive'
                    });
                }
            }
        }
        else if ($scope.data.namaKecamatan === "Kec. Denpasar Selatan") {
            var getAbs = firebase.database(appTugasDenpasarSelatan).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
            var listGetAbs = $firebaseArray(getAbs);
            $ionicLoading.show();
            listGetAbs.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSiswa = response;
                $scope.formData = response[0];
                $scope.formData.tanggalPengumpulanTugas = new Date(response[0].tanggalPengumpulanTugas);
                console.log($scope.formData.publish);
            })

            $scope.getTugas = function (data) {
                var refAbsensi = firebase.database(appTugasDenpasarSelatan).ref("tugasSiswa/" + data.$id);
                refAbsensi.update({
                    "kirimTugas": data.kirimTugas
                }).then(function (resp) {
                    console.log("updated");
                })
            }

            $scope.simpan = function () {
                var tanggalPengumpulanTugas = $filter('date')($scope.formData.tanggalPengumpulanTugas, 'yyyy-MM-dd');
                if ($scope.formData.isiTugas !== "" && $scope.formData.tanggalPengumpulanTugas !== "") {

                    var getAbs = firebase.database(appTugasDenpasarSelatan).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
                    var listGetAbs = $firebaseArray(getAbs);
                    listGetAbs.$loaded().then(function (response) {
                        for (i = 0; i < response.length; i++) {
                            var updateData = firebase.database(appTugasDenpasarSelatan).ref("tugasSiswa/" + response[i].$id);
                            updateData.update({
                                "isiTugas": $scope.formData.isiTugas,
                                "tanggalPengumpulanTugas": tanggalPengumpulanTugas,
                            }).then(function (resp) {
                                $state.go("menuAdmin.tugasSiswaAdmin")
                            })
                        }
                    })

                    var updateGroupTugas = firebase.database(appTugasDenpasarSelatan).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa).update(JSON.parse(JSON.stringify({
                        "publish": $scope.formData.publish,
                    })))

                }
                else {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Seluruh Data Harus Diisi, Terima Kasih',
                        okType: 'button-positive'
                    });
                }
            }
        }
        else {
            var getAbs = firebase.database(appTugas).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
            var listGetAbs = $firebaseArray(getAbs);
            $ionicLoading.show();
            listGetAbs.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSiswa = response;
                $scope.formData = response[0];
                $scope.formData.tanggalPengumpulanTugas = new Date(response[0].tanggalPengumpulanTugas);
                console.log($scope.formData.publish);
            })

            $scope.getTugas = function (data) {
                var refAbsensi = firebase.database(appTugas).ref("tugasSiswa/" + data.$id);
                refAbsensi.update({
                    "kirimTugas": data.kirimTugas
                }).then(function (resp) {
                    console.log("updated");
                })
            }

            $scope.simpan = function () {
                var tanggalPengumpulanTugas = $filter('date')($scope.formData.tanggalPengumpulanTugas, 'yyyy-MM-dd');
                if ($scope.formData.isiTugas !== "" && $scope.formData.tanggalPengumpulanTugas !== "") {

                    var getAbs = firebase.database(appTugas).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
                    var listGetAbs = $firebaseArray(getAbs);
                    listGetAbs.$loaded().then(function (response) {
                        for (i = 0; i < response.length; i++) {
                            var updateData = firebase.database(appTugas).ref("tugasSiswa/" + response[i].$id);
                            updateData.update({
                                "isiTugas": $scope.formData.isiTugas,
                                "tanggalPengumpulanTugas": tanggalPengumpulanTugas,
                            }).then(function (resp) {
                                $state.go("menuAdmin.tugasSiswaAdmin")
                            })
                        }
                    })

                    var updateGroupTugas = firebase.database(appTugas).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa).update(JSON.parse(JSON.stringify({
                        "publish": $scope.formData.publish,
                    })))

                }
                else {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Seluruh Data Harus Diisi, Terima Kasih',
                        okType: 'button-positive'
                    });
                }
            }
        }
    }])

    .controller('tugasSiswaTambahSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "groupTugas": $stateParams.groupTugas,
            "idGroupTugasSiswa": $stateParams.idGroupTugasSiswa,
            "idGuru": $stateParams.idGuru,
            "idKelas": $stateParams.idKelas
        }
        console.log($scope.data)

        $scope.dataPenerimaTugas = [];
        var getAbs = firebase.database(appTugas).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
        var listGetAbs = $firebaseArray(getAbs);
        $ionicLoading.show();
        listGetAbs.$loaded().then(function (datanya) {
            $ionicLoading.hide();
            for (k = 0; k < datanya.length; k++) {
                $scope.dataPenerimaTugas.push({
                    "idSiswa": datanya[k].idSiswa,
                })
            }
            $scope.banyakDataI = $scope.dataPenerimaTugas.length;
        });
        // console.log("penerimaTugas", $scope.dataPenerimaTugas);

        $scope.dataBakalTerimaTugas = []
        var list = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.data.idKelas);
        var listData = $firebaseArray(list);
        $ionicLoading.show();
        listData.$loaded().then(function (response) {
            $ionicLoading.hide();
            for (i = 0; i < response.length; i++) {
                $scope.dataBakalTerimaTugas.push({
                    "idSiswa": response[i].$id,
                    "namaSiswa": response[i].namaPengguna,
                })
            }
            $scope.banyakDataJ = $scope.dataBakalTerimaTugas.length;
            $scope.dataTugas = [];
            for (j = 0; j < $scope.banyakDataJ; j++) {
                console.log("ini", $scope.banyakDataJ[j].idSiswa);
                // if ($scope.banyakDataI[i].idSiswa !== $scope.banyakDataJ[j].idSiswa) {
                //     $scope.dataTugas.push({
                //         "idSiswa": $scope.dataBakalTerimaTugas[j].idSiswa,
                //         "namaSiswa": response[i].namaSiswa,
                //     })
                // }

            }
            console.log($scope.dataTugas);
        });

        // console.log("bakalTerimaTugas", $scope.dataBakalTerimaTugas);
        // console.log("banyakDatanya",$scope.banyakDataJ);

        for (i = 0; i < 10; i++) {
            console.log($scope.banyakDataJ);
        }

        for (j = 0; j < $scope.banyakDataJ; j++) {
            console.log("ini", $scope.banyakDataJ[j].idSiswa);
            // if ($scope.dataPenerimaTugas[i].idSiswa !== $scope.dataBakalTerimaTugas[j].idSiswa) {
            //     $scope.dataTugas.push({
            //         "idSiswa": $scope.dataBakalTerimaTugas[j].idSiswa,
            //         "namaSiswa": response[i].namaSiswa,
            //     })
            // }
            // console.log($scope.dataTugas);
        }





        $scope.getTugas = function (data) {
            var refAbsensi = firebase.database(appTugas).ref("tugasSiswa/" + data.$id);
            refAbsensi.update({
                "kirimTugas": data.kirimTugas
            }).then(function (resp) {
                console.log("updated");
            })
        }

        $scope.simpan = function () {
            var tanggalPengumpulanTugas = $filter('date')($scope.formData.tanggalPengumpulanTugas, 'yyyy-MM-dd');
            if ($scope.formData.isiTugas !== "" && $scope.formData.tanggalPengumpulanTugas !== "") {

                var getAbs = firebase.database(appTugas).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
                var listGetAbs = $firebaseArray(getAbs);
                listGetAbs.$loaded().then(function (response) {
                    for (i = 0; i < response.length; i++) {
                        var updateData = firebase.database(appTugas).ref("tugasSiswa/" + response[i].$id);
                        updateData.update({
                            "isiTugas": $scope.formData.isiTugas,
                            "tanggalPengumpulanTugas": tanggalPengumpulanTugas,
                        }).then(function (resp) {
                            $state.go("menuAdmin.tugasSiswaAdmin")
                        })
                    }
                })

                var updateGroupTugas = firebase.database(appTugas).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa).update(JSON.parse(JSON.stringify({
                    "publish": $scope.formData.publish,
                })))

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