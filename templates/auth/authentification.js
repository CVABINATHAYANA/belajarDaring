angular.module('app.authentification', [])

    .controller('welcomeCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idPenggunaDinas = localStorage.getItem('idPenggunaDinas');
        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.idPenggunaOrangTua = localStorage.getItem('idPenggunaOrangTua');
        $scope.idAdmin = localStorage.getItem('idAdmin')

        if ($scope.idAdmin) {
            $state.go('menuAdmin.berandaAdmin');
        }

        if ($scope.idPenggunaDinas) {
            $state.go('menuDinas.berandaDinas');
        }

        if ($scope.idPenggunaSekolah) {
            $state.go('menuSekolah.berandaSekolah');
        }

        if ($scope.idGuru) {
            $state.go('menuGuru.berandaGuru');
        }

        if ($scope.idPenggunaSiswa) {
            $state.go('menuSiswa.berandaSiswa');
        }

        if ($scope.idPenggunaOrangTua) {
            $state.go('menuOrangTua.berandaOrangTua');
        }

        $scope.registrasi = function () {
            $ionicActionSheet.show({
                titleText: 'Sebagai Apakah Anda ?',
                buttons: [
                    // { text: '<i class="icon ion-android-people"></i> Dinas Pendidikan' },
                    { text: '<i class="icon ion-ios-people"></i> Admin Sekolah' },
                    { text: '<i class="icon ion-android-people"></i> Sebagai Guru' },
                    { text: '<i class="icon ion-ios-people"></i> Sebagai Siswa' },
                    // { text: '<i class="icon ion-android-people"></i> Orang Tua Siswa' },
                ],
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    // if (index === 0) {
                    //     // $state.go('registasiDinas');
                    // }
                    if (index === 0) {
                        $state.go('registrasiSekolah');
                    }
                    if (index === 1) {
                        $state.go('registrasiGuru');
                    }
                    if (index === 2) {
                        $state.go('registrasiSiswa');
                        // console.log("yes")
                    }
                    // if (index === 4) {
                    //     // $state.go('registrasiOrangTua');
                    // }
                    return true;
                },
            });
        }

        $scope.login = function () {
            // $state.go('login');
            $ionicActionSheet.show({
                titleText: 'Login Sebagai ?',
                buttons: [
                    { text: '<i class="icon ion-android-people"></i> Dinas Pendidikan' },
                    { text: '<i class="icon ion-ios-people"></i> Admin Sekolah' },
                    { text: '<i class="icon ion-android-people"></i> Sebagai Guru' },
                    { text: '<i class="icon ion-ios-people"></i> Sebagai Siswa' },
                    { text: '<i class="icon ion-android-people"></i> Orang Tua Siswa' },
                ],
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('loginDinas');
                    }
                    if (index === 1) {
                        $state.go('loginSekolah');
                    }
                    if (index === 2) {
                        $state.go('loginGuru');
                    }
                    if (index === 3) {
                        $state.go('loginSiswa');
                    }
                    if (index === 4) {
                        $state.go('loginOrangTua');
                    }
                    return true;
                },
            });
        }

        

    }])

    .controller('loginDinasCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idPenggunaDinas = localStorage.getItem('idPenggunaDinas');
        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.idPenggunaOrangTua = localStorage.getItem('idPenggunaOrangTua');
        $scope.idAdmin = localStorage.getItem('idAdmin')

        if ($scope.idAdmin) {
            $state.go('menuAdmin.berandaAdmin');
        }

        if ($scope.idPenggunaDinas) {
            $state.go('menuDinas.berandaDinas');
        }

        if ($scope.idPenggunaSekolah) {
            $state.go('menuSekolah.berandaSekolah');
        }

        if ($scope.idGuru) {
            $state.go('menuGuru.berandaGuru');
        }

        if ($scope.idPenggunaSiswa) {
            $state.go('menuSiswa.berandaSiswa');
        }

        if ($scope.idPenggunaOrangTua) {
            $state.go('menuOrangTua.berandaOrangTua');
        }

        $scope.forgetPassword = function () {
            $state.go("lupaPassword");
        };

        $scope.formData = {
            "email": '',
            "password": '',
            "sebagai": 'dinasPendidikan'
        };

        $scope.login = function () {
            if ($scope.formData.email !== '' && $scope.formData.password !== '') {

                console.log($scope.formData.sebagai);
                //Login Sebagai Admin Sekolah
                if ($scope.formData.sebagai === "adminSekolah") {
                    var dataAdminSekolah = firebase.database().ref("adminSekolah").orderByChild("email").equalTo($scope.formData.email);
                    var listDataAdminSekolah = $firebaseArray(dataAdminSekolah);

                    listDataAdminSekolah.$loaded().then(function (response) {

                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database().ref("adminSekolah").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        //console.log(response);
                                        localStorage.setItem('idPenggunaSekolah', response[0].$id);
                                        localStorage.setItem('uidSekolah', user.uid);
                                        localStorage.setItem('namaPenggunaSekolah', response[0].namaPengguna);

                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolah', response[0].idSekolah);
                                            localStorage.setItem('jenjangSekolah', response[0].jenjang);
                                            localStorage.setItem('namaSekolah', response[0].namaSekolah);
                                            localStorage.setItem('idKecamatanSekolah', response[0].idKecamatan);
                                            localStorage.setItem('idKotaKabupatenSekolah', response[0].idKotaKabupaten);
                                            localStorage.setItem('idProvinsiSekolah', response[0].idProvinsi)
                                            localStorage.setItem('namaKecamatanSekolah', response[0].namaKecamatan);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }

                                        $state.go('menuSekolah.berandaSekolah');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })


                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Sebagai Siswa / Orang Tua
                if ($scope.formData.sebagai === "siswaSekolah") {
                    var dataSiswaSekolah = firebase.database(appSiswa).ref("dataSiswa").orderByChild("email").equalTo($scope.formData.email);
                    var listSiswaSekolah = $firebaseArray(dataSiswaSekolah);

                    listSiswaSekolah.$loaded().then(function (response) {
                        // console.log("jumlahData", response.length);
                        // console.log(response);
                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        //console.log(response);

                                        localStorage.setItem('uidSiswa', user.uid);
                                        localStorage.setItem('namaPenggunaSiswa', response[0].namaPengguna);
                                        localStorage.setItem('emailSiswa', response[0].email);
                                        localStorage.setItem('idPenggunaSiswa', response[0].$id);
                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolahSiswa', response[0].idSekolah);
                                            localStorage.setItem('jenjangSiswa', response[0].jenjang);
                                            localStorage.setItem('idProvinsiSiswa', response[0].idProvinsi);
                                            localStorage.setItem('idKotaKabupatenSiswa', response[0].idKotaKabupaten);
                                            localStorage.setItem('idKecamatanSiswa', response[0].idKecamatan);
                                            localStorage.setItem('namaSekolahSiswa', response[0].namaSekolah);
                                            localStorage.setItem('namaKotaKabupatenSiswa', response[0].namaKotaKabupaten);
                                            localStorage.setItem('namaProvinsiSiswa', response[0].namaProvinsi);
                                            localStorage.setItem('namaKelasSiswa', response[0].namaKelas);
                                            localStorage.setItem('jenisKelaminSiswa', response[0].jenisKelamin);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }
                                        localStorage.setItem('statusSiswa', response[0].statusSiswa);
                                        $state.go('menuSiswa.berandaSiswa');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })

                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Sebagai Orang Tua
                if ($scope.formData.sebagai === 'orangTua') {
                    console.log('ORANG TUA');
                    var dataSiswaSekolah = firebase.database(appSiswa).ref("dataSiswa").orderByChild("email").equalTo($scope.formData.email);
                    var listSiswaSekolah = $firebaseArray(dataSiswaSekolah);

                    listSiswaSekolah.$loaded().then(function (response) {
                        // console.log("jumlahData", response.length);
                        // console.log(response);
                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        //console.log(response);

                                        localStorage.setItem('uidSiswa', user.uid);
                                        localStorage.setItem('namaPenggunaSiswa', response[0].namaPengguna);
                                        localStorage.setItem('emailSiswa', response[0].email);
                                        localStorage.setItem('idPenggunaSiswa', response[0].$id);
                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolahSiswa', response[0].idSekolah);
                                            localStorage.setItem('jenjangSiswa', response[0].jenjang);
                                            localStorage.setItem('idProvinsiSiswa', response[0].idProvinsi);
                                            localStorage.setItem('idKotaKabupatenSiswa', response[0].idKotaKabupaten);
                                            localStorage.setItem('idKecamatanSiswa', response[0].idKecamatan);
                                            localStorage.setItem('namaSekolahSiswa', response[0].namaSekolah);
                                            localStorage.setItem('namaKotaKabupatenSiswa', response[0].namaKotaKabupaten);
                                            localStorage.setItem('namaProvinsiSiswa', response[0].namaProvinsi);
                                            localStorage.setItem('namaKelasSiswa', response[0].namaKelas);
                                            localStorage.setItem('jenisKelaminSiswa', response[0].jenisKelamin);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }
                                        localStorage.setItem('statusSiswa', response[0].statusSiswa);
                                        $state.go('menuOrangTua.berandaOrangTua');
                                    }).then(function (resp) {
                                        // window.location.reload(true);
                                    })

                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Sebagai Guru
                if ($scope.formData.sebagai === "guruSekolah") {
                    var dataGuruSekolah = firebase.database(appGuru).ref("dataGuru").orderByChild("email").equalTo($scope.formData.email);
                    var listGuruSekolah = $firebaseArray(dataGuruSekolah);

                    listGuruSekolah.$loaded().then(function (response) {

                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    // console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database(appGuru).ref("dataGuru").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        // console.log(response);

                                        localStorage.setItem('uidGuru', user.uid);
                                        localStorage.setItem('namaGuru', response[0].namaPengguna);
                                        localStorage.setItem('emailGuru', response[0].email);
                                        localStorage.setItem('idGuru', response[0].$id);

                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolahGuru', response[0].idSekolah);
                                            localStorage.setItem('jenjangGuru', response[0].jenjang);
                                            localStorage.setItem('idProvinsiGuru', response[0].idProvinsi);
                                            localStorage.setItem('idKotaKabupatenGuru', response[0].idKotaKabupaten);
                                            localStorage.setItem('idKecamatanGuru', response[0].idKecamatan);
                                            localStorage.setItem('namaSekolahGuru', response[0].namaSekolah);
                                            localStorage.setItem('idKecamatanGuru', response[0].idKecamatan);
                                            localStorage.setItem('namaKecamatanGuru', response[0].namaKecamatan);
                                            localStorage.setItem('namaKotaKabupatenGuru', response[0].namaKotaKabupaten);
                                            localStorage.setItem('namaProvinsiGuru', response[0].namaProvinsi);
                                            localStorage.setItem('jenisKelaminGuru', response[0].jenisKelamin);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }

                                        $state.go('menuGuru.berandaGuru');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })

                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Dinas Pendidikan
                if ($scope.formData.sebagai === "dinasPendidikan") {
                    var dataAdmin = firebase.database().ref("adminDinasPendidikan").orderByChild("email").equalTo($scope.formData.email);
                    var listDataAdmin = $firebaseArray(dataAdmin);

                    listDataAdmin.$loaded().then(function (response) {
                        // console.log(response);
                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database().ref("adminDinasPendidikan").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        // console.log(response);

                                        localStorage.setItem('uidAdmin', user.uid);
                                        localStorage.setItem('namaAdmin', response[0].namaAdmin);
                                        localStorage.setItem('emailAdmin', response[0].email);
                                        localStorage.setItem('idAdmin', response[0].$id);
                                        localStorage.setItem('hakAkses', response[0].hakAkses);
                                        localStorage.setItem('idKotaKabupaten', response[0].idKotaKabupaten);
                                        localStorage.setItem('idProvinsiAdmin', response[0].idProvinsi);
                                        localStorage.setItem('namaKotaKabupatenAdmin', response[0].namaKotaKabupaten);

                                        $state.go('menuAdmin.berandaAdmin');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })


                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }
            }
            else {
                $ionicPopup.alert({
                    title: 'Pemberitahuan',
                    template: 'Maaf, Seluruh Data Harus Diisi, Terima Kasih',
                    okType: 'button-positive'
                });
            }
        }

        $scope.kembali = function () {
            $state.go('welcome');
        }

    }])

    .controller('loginSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idPenggunaDinas = localStorage.getItem('idPenggunaDinas');
        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.idPenggunaOrangTua = localStorage.getItem('idPenggunaOrangTua');
        $scope.idAdmin = localStorage.getItem('idAdmin')

        if ($scope.idAdmin) {
            $state.go('menuAdmin.berandaAdmin');
        }

        if ($scope.idPenggunaDinas) {
            $state.go('menuDinas.berandaDinas');
        }

        if ($scope.idPenggunaSekolah) {
            $state.go('menuSekolah.berandaSekolah');
        }

        if ($scope.idGuru) {
            $state.go('menuGuru.berandaGuru');
        }

        if ($scope.idPenggunaSiswa) {
            $state.go('menuSiswa.berandaSiswa');
        }

        if ($scope.idPenggunaOrangTua) {
            $state.go('menuOrangTua.berandaOrangTua');
        }

        $scope.forgetPassword = function () {
            $state.go("lupaPassword");
        };

        $scope.formData = {
            "email": '',
            "password": '',
            "sebagai": 'adminSekolah'
        };

        $scope.login = function () {
            if ($scope.formData.email !== '' && $scope.formData.password !== '') {

                console.log($scope.formData.sebagai);
                //Login Sebagai Admin Sekolah
                if ($scope.formData.sebagai === "adminSekolah") {
                    var dataAdminSekolah = firebase.database().ref("adminSekolah").orderByChild("email").equalTo($scope.formData.email);
                    var listDataAdminSekolah = $firebaseArray(dataAdminSekolah);

                    listDataAdminSekolah.$loaded().then(function (response) {

                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database().ref("adminSekolah").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        //console.log(response);
                                        localStorage.setItem('idPenggunaSekolah', response[0].$id);
                                        localStorage.setItem('uidSekolah', user.uid);
                                        localStorage.setItem('namaPenggunaSekolah', response[0].namaPengguna);

                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolah', response[0].idSekolah);
                                            localStorage.setItem('jenjangSekolah', response[0].jenjang);
                                            localStorage.setItem('namaSekolah', response[0].namaSekolah);
                                            localStorage.setItem('idKecamatanSekolah', response[0].idKecamatan);
                                            localStorage.setItem('idKotaKabupatenSekolah', response[0].idKotaKabupaten);
                                            localStorage.setItem('idProvinsiSekolah', response[0].idProvinsi)
                                            localStorage.setItem('namaKecamatanSekolah', response[0].namaKecamatan);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }

                                        $state.go('menuSekolah.berandaSekolah');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })


                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Sebagai Siswa / Orang Tua
                if ($scope.formData.sebagai === "siswaSekolah") {
                    var dataSiswaSekolah = firebase.database(appSiswa).ref("dataSiswa").orderByChild("email").equalTo($scope.formData.email);
                    var listSiswaSekolah = $firebaseArray(dataSiswaSekolah);

                    listSiswaSekolah.$loaded().then(function (response) {
                        // console.log("jumlahData", response.length);
                        // console.log(response);
                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        //console.log(response);

                                        localStorage.setItem('uidSiswa', user.uid);
                                        localStorage.setItem('namaPenggunaSiswa', response[0].namaPengguna);
                                        localStorage.setItem('emailSiswa', response[0].email);
                                        localStorage.setItem('idPenggunaSiswa', response[0].$id);
                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolahSiswa', response[0].idSekolah);
                                            localStorage.setItem('jenjangSiswa', response[0].jenjang);
                                            localStorage.setItem('idProvinsiSiswa', response[0].idProvinsi);
                                            localStorage.setItem('idKotaKabupatenSiswa', response[0].idKotaKabupaten);
                                            localStorage.setItem('idKecamatanSiswa', response[0].idKecamatan);
                                            localStorage.setItem('namaSekolahSiswa', response[0].namaSekolah);
                                            localStorage.setItem('namaKotaKabupatenSiswa', response[0].namaKotaKabupaten);
                                            localStorage.setItem('namaProvinsiSiswa', response[0].namaProvinsi);
                                            localStorage.setItem('namaKelasSiswa', response[0].namaKelas);
                                            localStorage.setItem('jenisKelaminSiswa', response[0].jenisKelamin);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }
                                        localStorage.setItem('statusSiswa', response[0].statusSiswa);
                                        $state.go('menuSiswa.berandaSiswa');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })

                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Sebagai Orang Tua
                if ($scope.formData.sebagai === 'orangTua') {
                    console.log('ORANG TUA');
                    var dataSiswaSekolah = firebase.database(appSiswa).ref("dataSiswa").orderByChild("email").equalTo($scope.formData.email);
                    var listSiswaSekolah = $firebaseArray(dataSiswaSekolah);

                    listSiswaSekolah.$loaded().then(function (response) {
                        // console.log("jumlahData", response.length);
                        // console.log(response);
                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        //console.log(response);

                                        localStorage.setItem('uidSiswa', user.uid);
                                        localStorage.setItem('namaPenggunaSiswa', response[0].namaPengguna);
                                        localStorage.setItem('emailSiswa', response[0].email);
                                        localStorage.setItem('idPenggunaSiswa', response[0].$id);
                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolahSiswa', response[0].idSekolah);
                                            localStorage.setItem('jenjangSiswa', response[0].jenjang);
                                            localStorage.setItem('idProvinsiSiswa', response[0].idProvinsi);
                                            localStorage.setItem('idKotaKabupatenSiswa', response[0].idKotaKabupaten);
                                            localStorage.setItem('idKecamatanSiswa', response[0].idKecamatan);
                                            localStorage.setItem('namaSekolahSiswa', response[0].namaSekolah);
                                            localStorage.setItem('namaKotaKabupatenSiswa', response[0].namaKotaKabupaten);
                                            localStorage.setItem('namaProvinsiSiswa', response[0].namaProvinsi);
                                            localStorage.setItem('namaKelasSiswa', response[0].namaKelas);
                                            localStorage.setItem('jenisKelaminSiswa', response[0].jenisKelamin);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }
                                        localStorage.setItem('statusSiswa', response[0].statusSiswa);
                                        $state.go('menuOrangTua.berandaOrangTua');
                                    }).then(function (resp) {
                                        // window.location.reload(true);
                                    })

                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Sebagai Guru
                if ($scope.formData.sebagai === "guruSekolah") {
                    var dataGuruSekolah = firebase.database(appGuru).ref("dataGuru").orderByChild("email").equalTo($scope.formData.email);
                    var listGuruSekolah = $firebaseArray(dataGuruSekolah);

                    listGuruSekolah.$loaded().then(function (response) {

                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    // console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database(appGuru).ref("dataGuru").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        // console.log(response);

                                        localStorage.setItem('uidGuru', user.uid);
                                        localStorage.setItem('namaGuru', response[0].namaPengguna);
                                        localStorage.setItem('emailGuru', response[0].email);
                                        localStorage.setItem('idGuru', response[0].$id);

                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolahGuru', response[0].idSekolah);
                                            localStorage.setItem('jenjangGuru', response[0].jenjang);
                                            localStorage.setItem('idProvinsiGuru', response[0].idProvinsi);
                                            localStorage.setItem('idKotaKabupatenGuru', response[0].idKotaKabupaten);
                                            localStorage.setItem('idKecamatanGuru', response[0].idKecamatan);
                                            localStorage.setItem('namaSekolahGuru', response[0].namaSekolah);
                                            localStorage.setItem('idKecamatanGuru', response[0].idKecamatan);
                                            localStorage.setItem('namaKecamatanGuru', response[0].namaKecamatan);
                                            localStorage.setItem('namaKotaKabupatenGuru', response[0].namaKotaKabupaten);
                                            localStorage.setItem('namaProvinsiGuru', response[0].namaProvinsi);
                                            localStorage.setItem('jenisKelaminGuru', response[0].jenisKelamin);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }

                                        $state.go('menuGuru.berandaGuru');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })

                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Dinas Pendidikan
                if ($scope.formData.sebagai === "dinasPendidikan") {
                    var dataAdmin = firebase.database().ref("adminDinasPendidikan").orderByChild("email").equalTo($scope.formData.email);
                    var listDataAdmin = $firebaseArray(dataAdmin);

                    listDataAdmin.$loaded().then(function (response) {
                        // console.log(response);
                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database().ref("adminDinasPendidikan").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        // console.log(response);

                                        localStorage.setItem('uidAdmin', user.uid);
                                        localStorage.setItem('namaAdmin', response[0].namaAdmin);
                                        localStorage.setItem('emailAdmin', response[0].email);
                                        localStorage.setItem('idAdmin', response[0].$id);
                                        localStorage.setItem('hakAkses', response[0].hakAkses);
                                        localStorage.setItem('idKotaKabupaten', response[0].idKotaKabupaten);
                                        localStorage.setItem('idProvinsiAdmin', response[0].idProvinsi);
                                        localStorage.setItem('namaKotaKabupatenAdmin', response[0].namaKotaKabupaten);

                                        $state.go('menuAdmin.berandaAdmin');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })


                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }
            }
            else {
                $ionicPopup.alert({
                    title: 'Pemberitahuan',
                    template: 'Maaf, Seluruh Data Harus Diisi, Terima Kasih',
                    okType: 'button-positive'
                });
            }
        }

        $scope.kembali = function () {
            $state.go('welcome');
        }

    }])

    .controller('loginGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idPenggunaDinas = localStorage.getItem('idPenggunaDinas');
        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.idPenggunaOrangTua = localStorage.getItem('idPenggunaOrangTua');
        $scope.idAdmin = localStorage.getItem('idAdmin')

        if ($scope.idAdmin) {
            $state.go('menuAdmin.berandaAdmin');
        }

        if ($scope.idPenggunaDinas) {
            $state.go('menuDinas.berandaDinas');
        }

        if ($scope.idPenggunaSekolah) {
            $state.go('menuSekolah.berandaSekolah');
        }

        if ($scope.idGuru) {
            $state.go('menuGuru.berandaGuru');
        }

        if ($scope.idPenggunaSiswa) {
            $state.go('menuSiswa.berandaSiswa');
        }

        if ($scope.idPenggunaOrangTua) {
            $state.go('menuOrangTua.berandaOrangTua');
        }

        $scope.forgetPassword = function () {
            $state.go("lupaPassword");
        };

        $scope.formData = {
            "email": '',
            "password": '',
            "sebagai": 'guruSekolah'
        };

        $scope.login = function () {
            if ($scope.formData.email !== '' && $scope.formData.password !== '') {

                console.log($scope.formData.sebagai);
                //Login Sebagai Admin Sekolah
                if ($scope.formData.sebagai === "adminSekolah") {
                    var dataAdminSekolah = firebase.database().ref("adminSekolah").orderByChild("email").equalTo($scope.formData.email);
                    var listDataAdminSekolah = $firebaseArray(dataAdminSekolah);

                    listDataAdminSekolah.$loaded().then(function (response) {

                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database().ref("adminSekolah").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        //console.log(response);
                                        localStorage.setItem('idPenggunaSekolah', response[0].$id);
                                        localStorage.setItem('uidSekolah', user.uid);
                                        localStorage.setItem('namaPenggunaSekolah', response[0].namaPengguna);

                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolah', response[0].idSekolah);
                                            localStorage.setItem('jenjangSekolah', response[0].jenjang);
                                            localStorage.setItem('namaSekolah', response[0].namaSekolah);
                                            localStorage.setItem('idKecamatanSekolah', response[0].idKecamatan);
                                            localStorage.setItem('idKotaKabupatenSekolah', response[0].idKotaKabupaten);
                                            localStorage.setItem('idProvinsiSekolah', response[0].idProvinsi)
                                            localStorage.setItem('namaKecamatanSekolah', response[0].namaKecamatan);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }

                                        $state.go('menuSekolah.berandaSekolah');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })


                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Sebagai Siswa / Orang Tua
                if ($scope.formData.sebagai === "siswaSekolah") {
                    var dataSiswaSekolah = firebase.database(appSiswa).ref("dataSiswa").orderByChild("email").equalTo($scope.formData.email);
                    var listSiswaSekolah = $firebaseArray(dataSiswaSekolah);

                    listSiswaSekolah.$loaded().then(function (response) {
                        // console.log("jumlahData", response.length);
                        // console.log(response);
                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        //console.log(response);

                                        localStorage.setItem('uidSiswa', user.uid);
                                        localStorage.setItem('namaPenggunaSiswa', response[0].namaPengguna);
                                        localStorage.setItem('emailSiswa', response[0].email);
                                        localStorage.setItem('idPenggunaSiswa', response[0].$id);
                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolahSiswa', response[0].idSekolah);
                                            localStorage.setItem('jenjangSiswa', response[0].jenjang);
                                            localStorage.setItem('idProvinsiSiswa', response[0].idProvinsi);
                                            localStorage.setItem('idKotaKabupatenSiswa', response[0].idKotaKabupaten);
                                            localStorage.setItem('idKecamatanSiswa', response[0].idKecamatan);
                                            localStorage.setItem('namaSekolahSiswa', response[0].namaSekolah);
                                            localStorage.setItem('namaKotaKabupatenSiswa', response[0].namaKotaKabupaten);
                                            localStorage.setItem('namaProvinsiSiswa', response[0].namaProvinsi);
                                            localStorage.setItem('namaKelasSiswa', response[0].namaKelas);
                                            localStorage.setItem('jenisKelaminSiswa', response[0].jenisKelamin);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }
                                        localStorage.setItem('statusSiswa', response[0].statusSiswa);
                                        $state.go('menuSiswa.berandaSiswa');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })

                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Sebagai Orang Tua
                if ($scope.formData.sebagai === 'orangTua') {
                    console.log('ORANG TUA');
                    var dataSiswaSekolah = firebase.database(appSiswa).ref("dataSiswa").orderByChild("email").equalTo($scope.formData.email);
                    var listSiswaSekolah = $firebaseArray(dataSiswaSekolah);

                    listSiswaSekolah.$loaded().then(function (response) {
                        // console.log("jumlahData", response.length);
                        // console.log(response);
                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        //console.log(response);

                                        localStorage.setItem('uidSiswa', user.uid);
                                        localStorage.setItem('namaPenggunaSiswa', response[0].namaPengguna);
                                        localStorage.setItem('emailSiswa', response[0].email);
                                        localStorage.setItem('idPenggunaSiswa', response[0].$id);
                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolahSiswa', response[0].idSekolah);
                                            localStorage.setItem('jenjangSiswa', response[0].jenjang);
                                            localStorage.setItem('idProvinsiSiswa', response[0].idProvinsi);
                                            localStorage.setItem('idKotaKabupatenSiswa', response[0].idKotaKabupaten);
                                            localStorage.setItem('idKecamatanSiswa', response[0].idKecamatan);
                                            localStorage.setItem('namaSekolahSiswa', response[0].namaSekolah);
                                            localStorage.setItem('namaKotaKabupatenSiswa', response[0].namaKotaKabupaten);
                                            localStorage.setItem('namaProvinsiSiswa', response[0].namaProvinsi);
                                            localStorage.setItem('namaKelasSiswa', response[0].namaKelas);
                                            localStorage.setItem('jenisKelaminSiswa', response[0].jenisKelamin);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }
                                        localStorage.setItem('statusSiswa', response[0].statusSiswa);
                                        $state.go('menuOrangTua.berandaOrangTua');
                                    }).then(function (resp) {
                                        // window.location.reload(true);
                                    })

                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Sebagai Guru
                if ($scope.formData.sebagai === "guruSekolah") {
                    var dataGuruSekolah = firebase.database(appGuru).ref("dataGuru").orderByChild("email").equalTo($scope.formData.email);
                    var listGuruSekolah = $firebaseArray(dataGuruSekolah);

                    listGuruSekolah.$loaded().then(function (response) {

                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    // console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database(appGuru).ref("dataGuru").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        // console.log(response);

                                        localStorage.setItem('uidGuru', user.uid);
                                        localStorage.setItem('namaGuru', response[0].namaPengguna);
                                        localStorage.setItem('emailGuru', response[0].email);
                                        localStorage.setItem('idGuru', response[0].$id);

                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolahGuru', response[0].idSekolah);
                                            localStorage.setItem('jenjangGuru', response[0].jenjang);
                                            localStorage.setItem('idProvinsiGuru', response[0].idProvinsi);
                                            localStorage.setItem('idKotaKabupatenGuru', response[0].idKotaKabupaten);
                                            localStorage.setItem('idKecamatanGuru', response[0].idKecamatan);
                                            localStorage.setItem('namaSekolahGuru', response[0].namaSekolah);
                                            localStorage.setItem('idKecamatanGuru', response[0].idKecamatan);
                                            localStorage.setItem('namaKecamatanGuru', response[0].namaKecamatan);
                                            localStorage.setItem('namaKotaKabupatenGuru', response[0].namaKotaKabupaten);
                                            localStorage.setItem('namaProvinsiGuru', response[0].namaProvinsi);
                                            localStorage.setItem('jenisKelaminGuru', response[0].jenisKelamin);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }

                                        $state.go('menuGuru.berandaGuru');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })

                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Dinas Pendidikan
                if ($scope.formData.sebagai === "dinasPendidikan") {
                    var dataAdmin = firebase.database().ref("adminDinasPendidikan").orderByChild("email").equalTo($scope.formData.email);
                    var listDataAdmin = $firebaseArray(dataAdmin);

                    listDataAdmin.$loaded().then(function (response) {
                        // console.log(response);
                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database().ref("adminDinasPendidikan").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        // console.log(response);

                                        localStorage.setItem('uidAdmin', user.uid);
                                        localStorage.setItem('namaAdmin', response[0].namaAdmin);
                                        localStorage.setItem('emailAdmin', response[0].email);
                                        localStorage.setItem('idAdmin', response[0].$id);
                                        localStorage.setItem('hakAkses', response[0].hakAkses);
                                        localStorage.setItem('idKotaKabupaten', response[0].idKotaKabupaten);
                                        localStorage.setItem('idProvinsiAdmin', response[0].idProvinsi);
                                        localStorage.setItem('namaKotaKabupatenAdmin', response[0].namaKotaKabupaten);

                                        $state.go('menuAdmin.berandaAdmin');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })


                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }
            }
            else {
                $ionicPopup.alert({
                    title: 'Pemberitahuan',
                    template: 'Maaf, Seluruh Data Harus Diisi, Terima Kasih',
                    okType: 'button-positive'
                });
            }
        }

        $scope.kembali = function () {
            $state.go('welcome');
        }

    }])


    .controller('loginSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idPenggunaDinas = localStorage.getItem('idPenggunaDinas');
        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.idPenggunaOrangTua = localStorage.getItem('idPenggunaOrangTua');
        $scope.idAdmin = localStorage.getItem('idAdmin')

        if ($scope.idAdmin) {
            $state.go('menuAdmin.berandaAdmin');
        }

        if ($scope.idPenggunaDinas) {
            $state.go('menuDinas.berandaDinas');
        }

        if ($scope.idPenggunaSekolah) {
            $state.go('menuSekolah.berandaSekolah');
        }

        if ($scope.idGuru) {
            $state.go('menuGuru.berandaGuru');
        }

        if ($scope.idPenggunaSiswa) {
            $state.go('menuSiswa.berandaSiswa');
        }

        if ($scope.idPenggunaOrangTua) {
            $state.go('menuOrangTua.berandaOrangTua');
        }

        $scope.forgetPassword = function () {
            $state.go("lupaPassword");
        };

        $scope.formData = {
            "email": '',
            "password": '',
            "sebagai": 'siswaSekolah'
        };

        $scope.login = function () {
            if ($scope.formData.email !== '' && $scope.formData.password !== '') {

                console.log($scope.formData.sebagai);
                //Login Sebagai Admin Sekolah
                if ($scope.formData.sebagai === "adminSekolah") {
                    var dataAdminSekolah = firebase.database().ref("adminSekolah").orderByChild("email").equalTo($scope.formData.email);
                    var listDataAdminSekolah = $firebaseArray(dataAdminSekolah);

                    listDataAdminSekolah.$loaded().then(function (response) {

                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database().ref("adminSekolah").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        //console.log(response);
                                        localStorage.setItem('idPenggunaSekolah', response[0].$id);
                                        localStorage.setItem('uidSekolah', user.uid);
                                        localStorage.setItem('namaPenggunaSekolah', response[0].namaPengguna);

                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolah', response[0].idSekolah);
                                            localStorage.setItem('jenjangSekolah', response[0].jenjang);
                                            localStorage.setItem('namaSekolah', response[0].namaSekolah);
                                            localStorage.setItem('idKecamatanSekolah', response[0].idKecamatan);
                                            localStorage.setItem('idKotaKabupatenSekolah', response[0].idKotaKabupaten);
                                            localStorage.setItem('idProvinsiSekolah', response[0].idProvinsi)
                                            localStorage.setItem('namaKecamatanSekolah', response[0].namaKecamatan);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }

                                        $state.go('menuSekolah.berandaSekolah');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })


                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Sebagai Siswa / Orang Tua
                if ($scope.formData.sebagai === "siswaSekolah") {
                    var email = String($scope.formData.email)+'@gmail.com'
                    var dataSiswaSekolah = firebase.database(appSiswa).ref("dataSiswa").orderByChild("email").equalTo(email);
                    var listSiswaSekolah = $firebaseArray(dataSiswaSekolah);

                    listSiswaSekolah.$loaded().then(function (response) {
                        // console.log("jumlahData", response.length);
                        // console.log(response);
                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword(email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        //console.log(response);

                                        localStorage.setItem('uidSiswa', user.uid);
                                        localStorage.setItem('namaPenggunaSiswa', response[0].namaPengguna);
                                        localStorage.setItem('emailSiswa', response[0].email);
                                        localStorage.setItem('idPenggunaSiswa', response[0].$id);
                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolahSiswa', response[0].idSekolah);
                                            localStorage.setItem('jenjangSiswa', response[0].jenjang);
                                            localStorage.setItem('idProvinsiSiswa', response[0].idProvinsi);
                                            localStorage.setItem('idKotaKabupatenSiswa', response[0].idKotaKabupaten);
                                            localStorage.setItem('idKecamatanSiswa', response[0].idKecamatan);
                                            localStorage.setItem('namaSekolahSiswa', response[0].namaSekolah);
                                            localStorage.setItem('namaKotaKabupatenSiswa', response[0].namaKotaKabupaten);
                                            localStorage.setItem('namaProvinsiSiswa', response[0].namaProvinsi);
                                            localStorage.setItem('namaKelasSiswa', response[0].namaKelas);
                                            localStorage.setItem('jenisKelaminSiswa', response[0].jenisKelamin);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }
                                        localStorage.setItem('statusSiswa', response[0].statusSiswa);
                                        $state.go('menuSiswa.berandaSiswa');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })

                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Sebagai Orang Tua
                if ($scope.formData.sebagai === 'orangTua') {
                    console.log('ORANG TUA');
                    var dataSiswaSekolah = firebase.database(appSiswa).ref("dataSiswa").orderByChild("email").equalTo($scope.formData.email);
                    var listSiswaSekolah = $firebaseArray(dataSiswaSekolah);

                    listSiswaSekolah.$loaded().then(function (response) {
                        // console.log("jumlahData", response.length);
                        // console.log(response);
                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        //console.log(response);

                                        localStorage.setItem('uidSiswa', user.uid);
                                        localStorage.setItem('namaPenggunaSiswa', response[0].namaPengguna);
                                        localStorage.setItem('emailSiswa', response[0].email);
                                        localStorage.setItem('idPenggunaSiswa', response[0].$id);
                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolahSiswa', response[0].idSekolah);
                                            localStorage.setItem('jenjangSiswa', response[0].jenjang);
                                            localStorage.setItem('idProvinsiSiswa', response[0].idProvinsi);
                                            localStorage.setItem('idKotaKabupatenSiswa', response[0].idKotaKabupaten);
                                            localStorage.setItem('idKecamatanSiswa', response[0].idKecamatan);
                                            localStorage.setItem('namaSekolahSiswa', response[0].namaSekolah);
                                            localStorage.setItem('namaKotaKabupatenSiswa', response[0].namaKotaKabupaten);
                                            localStorage.setItem('namaProvinsiSiswa', response[0].namaProvinsi);
                                            localStorage.setItem('namaKelasSiswa', response[0].namaKelas);
                                            localStorage.setItem('jenisKelaminSiswa', response[0].jenisKelamin);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }
                                        localStorage.setItem('statusSiswa', response[0].statusSiswa);
                                        $state.go('menuOrangTua.berandaOrangTua');
                                    }).then(function (resp) {
                                        // window.location.reload(true);
                                    })

                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Sebagai Guru
                if ($scope.formData.sebagai === "guruSekolah") {
                    var dataGuruSekolah = firebase.database(appGuru).ref("dataGuru").orderByChild("email").equalTo($scope.formData.email);
                    var listGuruSekolah = $firebaseArray(dataGuruSekolah);

                    listGuruSekolah.$loaded().then(function (response) {

                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    // console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database(appGuru).ref("dataGuru").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        // console.log(response);

                                        localStorage.setItem('uidGuru', user.uid);
                                        localStorage.setItem('namaGuru', response[0].namaPengguna);
                                        localStorage.setItem('emailGuru', response[0].email);
                                        localStorage.setItem('idGuru', response[0].$id);

                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolahGuru', response[0].idSekolah);
                                            localStorage.setItem('jenjangGuru', response[0].jenjang);
                                            localStorage.setItem('idProvinsiGuru', response[0].idProvinsi);
                                            localStorage.setItem('idKotaKabupatenGuru', response[0].idKotaKabupaten);
                                            localStorage.setItem('idKecamatanGuru', response[0].idKecamatan);
                                            localStorage.setItem('namaSekolahGuru', response[0].namaSekolah);
                                            localStorage.setItem('idKecamatanGuru', response[0].idKecamatan);
                                            localStorage.setItem('namaKecamatanGuru', response[0].namaKecamatan);
                                            localStorage.setItem('namaKotaKabupatenGuru', response[0].namaKotaKabupaten);
                                            localStorage.setItem('namaProvinsiGuru', response[0].namaProvinsi);
                                            localStorage.setItem('jenisKelaminGuru', response[0].jenisKelamin);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }

                                        $state.go('menuGuru.berandaGuru');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })

                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Dinas Pendidikan
                if ($scope.formData.sebagai === "dinasPendidikan") {
                    var dataAdmin = firebase.database().ref("adminDinasPendidikan").orderByChild("email").equalTo($scope.formData.email);
                    var listDataAdmin = $firebaseArray(dataAdmin);

                    listDataAdmin.$loaded().then(function (response) {
                        // console.log(response);
                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database().ref("adminDinasPendidikan").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        // console.log(response);

                                        localStorage.setItem('uidAdmin', user.uid);
                                        localStorage.setItem('namaAdmin', response[0].namaAdmin);
                                        localStorage.setItem('emailAdmin', response[0].email);
                                        localStorage.setItem('idAdmin', response[0].$id);
                                        localStorage.setItem('hakAkses', response[0].hakAkses);
                                        localStorage.setItem('idKotaKabupaten', response[0].idKotaKabupaten);
                                        localStorage.setItem('idProvinsiAdmin', response[0].idProvinsi);
                                        localStorage.setItem('namaKotaKabupatenAdmin', response[0].namaKotaKabupaten);

                                        $state.go('menuAdmin.berandaAdmin');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })


                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }
            }
            else {
                $ionicPopup.alert({
                    title: 'Pemberitahuan',
                    template: 'Maaf, Seluruh Data Harus Diisi, Terima Kasih',
                    okType: 'button-positive'
                });
            }
        }

        $scope.kembali = function () {
            $state.go('welcome');
        }

    }])


    .controller('loginOrangTuaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idPenggunaDinas = localStorage.getItem('idPenggunaDinas');
        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.idPenggunaOrangTua = localStorage.getItem('idPenggunaOrangTua');
        $scope.idAdmin = localStorage.getItem('idAdmin')

        if ($scope.idAdmin) {
            $state.go('menuAdmin.berandaAdmin');
        }

        if ($scope.idPenggunaDinas) {
            $state.go('menuDinas.berandaDinas');
        }

        if ($scope.idPenggunaSekolah) {
            $state.go('menuSekolah.berandaSekolah');
        }

        if ($scope.idGuru) {
            $state.go('menuGuru.berandaGuru');
        }

        if ($scope.idPenggunaSiswa) {
            $state.go('menuSiswa.berandaSiswa');
        }

        if ($scope.idPenggunaOrangTua) {
            $state.go('menuOrangTua.berandaOrangTua');
        }

        $scope.forgetPassword = function () {
            $state.go("lupaPassword");
        };

        $scope.formData = {
            "email": '',
            "password": '',
            "sebagai": 'orangTua'
        };

        $scope.login = function () {
            if ($scope.formData.email !== '' && $scope.formData.password !== '') {

                console.log($scope.formData.sebagai);
                //Login Sebagai Admin Sekolah
                if ($scope.formData.sebagai === "adminSekolah") {
                    var dataAdminSekolah = firebase.database().ref("adminSekolah").orderByChild("email").equalTo($scope.formData.email);
                    var listDataAdminSekolah = $firebaseArray(dataAdminSekolah);

                    listDataAdminSekolah.$loaded().then(function (response) {

                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database().ref("adminSekolah").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        //console.log(response);
                                        localStorage.setItem('idPenggunaSekolah', response[0].$id);
                                        localStorage.setItem('uidSekolah', user.uid);
                                        localStorage.setItem('namaPenggunaSekolah', response[0].namaPengguna);

                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolah', response[0].idSekolah);
                                            localStorage.setItem('jenjangSekolah', response[0].jenjang);
                                            localStorage.setItem('namaSekolah', response[0].namaSekolah);
                                            localStorage.setItem('idKecamatanSekolah', response[0].idKecamatan);
                                            localStorage.setItem('idKotaKabupatenSekolah', response[0].idKotaKabupaten);
                                            localStorage.setItem('idProvinsiSekolah', response[0].idProvinsi)
                                            localStorage.setItem('namaKecamatanSekolah', response[0].namaKecamatan);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }

                                        $state.go('menuSekolah.berandaSekolah');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })


                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Sebagai Siswa / Orang Tua
                if ($scope.formData.sebagai === "siswaSekolah") {
                    var email = String($scope.formData.email)+'@gmail.com'
                    var dataSiswaSekolah = firebase.database(appSiswa).ref("dataSiswa").orderByChild("email").equalTo(email);
                    var listSiswaSekolah = $firebaseArray(dataSiswaSekolah);

                    listSiswaSekolah.$loaded().then(function (response) {
                        // console.log("jumlahData", response.length);
                        // console.log(response);
                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword(email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        //console.log(response);

                                        localStorage.setItem('uidSiswa', user.uid);
                                        localStorage.setItem('namaPenggunaSiswa', response[0].namaPengguna);
                                        localStorage.setItem('emailSiswa', response[0].email);
                                        localStorage.setItem('idPenggunaSiswa', response[0].$id);
                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolahSiswa', response[0].idSekolah);
                                            localStorage.setItem('jenjangSiswa', response[0].jenjang);
                                            localStorage.setItem('idProvinsiSiswa', response[0].idProvinsi);
                                            localStorage.setItem('idKotaKabupatenSiswa', response[0].idKotaKabupaten);
                                            localStorage.setItem('idKecamatanSiswa', response[0].idKecamatan);
                                            localStorage.setItem('namaSekolahSiswa', response[0].namaSekolah);
                                            localStorage.setItem('namaKotaKabupatenSiswa', response[0].namaKotaKabupaten);
                                            localStorage.setItem('namaProvinsiSiswa', response[0].namaProvinsi);
                                            localStorage.setItem('namaKelasSiswa', response[0].namaKelas);
                                            localStorage.setItem('jenisKelaminSiswa', response[0].jenisKelamin);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }
                                        localStorage.setItem('statusSiswa', response[0].statusSiswa);
                                        $state.go('menuSiswa.berandaSiswa');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })

                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Sebagai Orang Tua
                if ($scope.formData.sebagai === 'orangTua') {
                    console.log('ORANG TUA');
                    var email = String($scope.formData.email)+'@gmail.com'
                    var dataSiswaSekolah = firebase.database(appSiswa).ref("dataSiswa").orderByChild("email").equalTo(email);
                    var listSiswaSekolah = $firebaseArray(dataSiswaSekolah);

                    listSiswaSekolah.$loaded().then(function (response) {
                        // console.log("jumlahData", response.length);
                        // console.log(response);
                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword(email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        //console.log(response);

                                        localStorage.setItem('uidSiswa', user.uid);
                                        localStorage.setItem('namaPenggunaSiswa', response[0].namaPengguna);
                                        localStorage.setItem('emailSiswa', response[0].email);
                                        localStorage.setItem('idPenggunaSiswa', response[0].$id);
                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolahSiswa', response[0].idSekolah);
                                            localStorage.setItem('jenjangSiswa', response[0].jenjang);
                                            localStorage.setItem('idProvinsiSiswa', response[0].idProvinsi);
                                            localStorage.setItem('idKotaKabupatenSiswa', response[0].idKotaKabupaten);
                                            localStorage.setItem('idKecamatanSiswa', response[0].idKecamatan);
                                            localStorage.setItem('namaSekolahSiswa', response[0].namaSekolah);
                                            localStorage.setItem('namaKotaKabupatenSiswa', response[0].namaKotaKabupaten);
                                            localStorage.setItem('namaProvinsiSiswa', response[0].namaProvinsi);
                                            localStorage.setItem('namaKelasSiswa', response[0].namaKelas);
                                            localStorage.setItem('jenisKelaminSiswa', response[0].jenisKelamin);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }
                                        localStorage.setItem('statusSiswa', response[0].statusSiswa);
                                        $state.go('menuOrangTua.berandaOrangTua');
                                    }).then(function (resp) {
                                        // window.location.reload(true);
                                    })

                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Sebagai Guru
                if ($scope.formData.sebagai === "guruSekolah") {
                    var dataGuruSekolah = firebase.database(appGuru).ref("dataGuru").orderByChild("email").equalTo($scope.formData.email);
                    var listGuruSekolah = $firebaseArray(dataGuruSekolah);

                    listGuruSekolah.$loaded().then(function (response) {

                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    // console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database(appGuru).ref("dataGuru").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        // console.log(response);

                                        localStorage.setItem('uidGuru', user.uid);
                                        localStorage.setItem('namaGuru', response[0].namaPengguna);
                                        localStorage.setItem('emailGuru', response[0].email);
                                        localStorage.setItem('idGuru', response[0].$id);

                                        if (response[0].idSekolah !== undefined) {
                                            localStorage.setItem('idSekolahGuru', response[0].idSekolah);
                                            localStorage.setItem('jenjangGuru', response[0].jenjang);
                                            localStorage.setItem('idProvinsiGuru', response[0].idProvinsi);
                                            localStorage.setItem('idKotaKabupatenGuru', response[0].idKotaKabupaten);
                                            localStorage.setItem('idKecamatanGuru', response[0].idKecamatan);
                                            localStorage.setItem('namaSekolahGuru', response[0].namaSekolah);
                                            localStorage.setItem('idKecamatanGuru', response[0].idKecamatan);
                                            localStorage.setItem('namaKecamatanGuru', response[0].namaKecamatan);
                                            localStorage.setItem('namaKotaKabupatenGuru', response[0].namaKotaKabupaten);
                                            localStorage.setItem('namaProvinsiGuru', response[0].namaProvinsi);
                                            localStorage.setItem('jenisKelaminGuru', response[0].jenisKelamin);
                                            localStorage.setItem('kodeSekolah', response[0].kodeSekolah)
                                        }

                                        $state.go('menuGuru.berandaGuru');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })

                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }

                //Login Dinas Pendidikan
                if ($scope.formData.sebagai === "dinasPendidikan") {
                    var dataAdmin = firebase.database().ref("adminDinasPendidikan").orderByChild("email").equalTo($scope.formData.email);
                    var listDataAdmin = $firebaseArray(dataAdmin);

                    listDataAdmin.$loaded().then(function (response) {
                        // console.log(response);
                        if (response.length === 1) {
                            // console.log("lanjutkan");
                            $ionicLoading.show();
                            var auth = $firebaseAuth();
                            auth.$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {
                                    $ionicLoading.hide();

                                    var user = firebase.auth().currentUser;
                                    //console.log("uidGuru", user.uid);

                                    //Ambil Data Pengguna
                                    var dataPengguna = firebase.database().ref("adminDinasPendidikan").orderByChild("uid").equalTo(user.uid);
                                    var listGetID = $firebaseArray(dataPengguna);

                                    listGetID.$loaded().then(function (response) {
                                        // console.log(response);

                                        localStorage.setItem('uidAdmin', user.uid);
                                        localStorage.setItem('namaAdmin', response[0].namaAdmin);
                                        localStorage.setItem('emailAdmin', response[0].email);
                                        localStorage.setItem('idAdmin', response[0].$id);
                                        localStorage.setItem('hakAkses', response[0].hakAkses);
                                        localStorage.setItem('idKotaKabupaten', response[0].idKotaKabupaten);
                                        localStorage.setItem('idProvinsiAdmin', response[0].idProvinsi);
                                        localStorage.setItem('namaKotaKabupatenAdmin', response[0].namaKotaKabupaten);

                                        $state.go('menuAdmin.berandaAdmin');
                                    }).then(function (resp) {
                                        window.location.reload(true);
                                    })


                                })
                                .catch(function (error) {
                                    $ionicLoading.hide();
                                    //console.log(error.message);
                                    $scope.message = error.message;
                                    $ionicPopup.alert({
                                        title: 'Something Wrong',
                                        template: $scope.message,
                                        okType: 'button-positive'
                                    });
                                });
                        }

                        else {
                            //console.log("jangan dilanjutkan");
                            $ionicPopup.alert({
                                title: 'Information',
                                template: 'Maaf email anda belum terdaftar , silahkan mendaftar terlebih dahulu',
                                okType: 'button-positive'
                            });
                        }

                    });
                }
            }
            else {
                $ionicPopup.alert({
                    title: 'Pemberitahuan',
                    template: 'Maaf, Seluruh Data Harus Diisi, Terima Kasih',
                    okType: 'button-positive'
                });
            }
        }

        $scope.kembali = function () {
            $state.go('welcome');
        }

    }])


    .controller('lupaPasswordCtrl', ['$scope', '$stateParams', '$state', '$firebaseAuth', '$firebaseArray', '$ionicPopup', '$ionicLoading', function ($scope, $stateParams, $state, $firebaseAuth, $firebaseArray, $ionicPopup, $ionicLoading) {

        $scope.formData = {
            "email": '',
        };

        $scope.submit = function () {
            if ($scope.formData.email !== '') {

                $ionicLoading.show();
                $scope.authObj = $firebaseAuth();
                $scope.authObj.$sendPasswordResetEmail($scope.formData.email).then(function () {
                    $ionicLoading.hide();
                    //console.log("Password reset email sent successfully!");
                    $ionicPopup.alert({
                        title: 'RESET PASSWORD',
                        template: 'Kami telah mengirimkan link verifikasi ke email Anda. Silahkan cek inbox. Terima Kasih',
                        okType: 'button-positive'

                    });


                }).catch(function (error) {
                    $ionicLoading.hide();
                    $scope.message = error.message;
                    $ionicPopup.alert({
                        title: 'Something Wrong',
                        template: $scope.message,
                        okType: 'button-positive'
                    });
                });


            }
            else {
                $ionicPopup.alert({
                    title: 'Informasi',
                    template: 'Maaf, Silahkan isi elamat email, terima kasih',

                });
            }
        };

    }])

