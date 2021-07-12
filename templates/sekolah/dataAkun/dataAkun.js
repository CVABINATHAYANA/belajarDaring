angular.module('app.dataAkunSekolah', [])

    .controller('gantiPasswordSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.emailSekolah = localStorage.getItem('emailSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idSekolahSekolah = localStorage.getItem('idSekolahSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');

        if (!$scope.idSekolah) {
            $state.go('welcome');
        }

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
                        okType: 'button-balanced'

                    });


                }).catch(function (error) {
                    $ionicLoading.hide();
                    $scope.message = error.message;
                    $ionicPopup.alert({
                        title: 'Something Wrong',
                        template: $scope.message,
                        okType: 'button-balanced'
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

    .controller('profilPenggunaSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.emailSekolah = localStorage.getItem('emailSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idSekolahSekolah = localStorage.getItem('idSekolahSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');

        if (!$scope.idSekolah) {
            $state.go('welcome');
        }

        var ref = firebase.database().ref("dataSekolah/" + $scope.idSekolah);
        var listRef = $firebaseObject(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.formData = response;
        })

        $scope.simpan = function () {
            if ($scope.formData.namaSekolah !== '' && $scope.formData.noHandphone !== '' && $scope.formData.alamat !== '' && $scope.formData.jenisKelamin !== '') {

                ref.update(JSON.parse(JSON.stringify({
                    "namaPengguna": $scope.formData.namaPengguna,
                    "noHandphone": $scope.formData.noHandphone,
                    "alamat": $scope.formData.alamat,
                    "jenisKelamin": $scope.formData.jenisKelamin
                }))).then(function (resp) {
                    $ionicPopup.alert({
                        title: 'SUKSES',
                        template: 'Data berhasil disimpan',

                    });
                })

            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Seluruh data harus diisi, terima kasih',

                });
            }
        }

    }])

    .controller('uploadFotoSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.emailSekolah = localStorage.getItem('emailSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idSekolahSekolah = localStorage.getItem('idSekolahSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');

        if (!$scope.idSekolah) {
            $state.go('welcome');
        }

    }])

