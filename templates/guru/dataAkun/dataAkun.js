angular.module('app.dataAkunGuru', [])

    .controller('gantiPasswordGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
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

    .controller('profilPenggunaGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        var ref = firebase.database(appGuru).ref("dataGuru/" + $scope.idGuru);
        var listRef = $firebaseObject(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.formData = response;
        })

        $scope.simpan = function () {
            if ($scope.formData.namaGuru !== '' && $scope.formData.noHandphone !== '' && $scope.formData.alamat !== '' && $scope.formData.jenisKelamin !== '') {

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

    .controller('uploadFotoGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

    }])

