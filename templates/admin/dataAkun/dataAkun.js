angular.module('app.dataAkunAdmin', [])

    .controller('gantiPasswordAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
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

    .controller('profilPenggunaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        console.log($scope.idAdmin);

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        var ref = firebase.database().ref("adminDinasPendidikan/" + $scope.idAdmin);
        var listRef = $firebaseObject(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.formData = response;
        })

        $scope.simpan = function () {
            if ($scope.formData.namaAdmin !== '' && $scope.formData.noHandphone !== '' && $scope.formData.alamat !== '' && $scope.formData.jenisKelamin !== '') {

                ref.update(JSON.parse(JSON.stringify({
                    "namaAdmin": $scope.formData.namaAdmin,
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

    .controller('uploadFotoAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

    }])

