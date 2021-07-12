angular.module('app.adminSekolah', [])

    .controller('adminSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        var ref = firebase.database().ref("adminSekolah").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataAdmin = response;
            // console.log(response)
        })

        $scope.getData = function (data) {
            $ionicActionSheet.show({
                titleText: 'Admin Sekolah : ' + data.namaPengguna,
                buttons: [
                    // { text: '<i class="icon ion-checkmark-circled"></i> Edit Data' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {

                    return true;
                },

                destructiveButtonClicked: function () {

                    var refObj = firebase.database().ref("adminSekolah/" + data.$id);
                    var objDelete = $firebaseObject(refObj);
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                        okType: "button-balanced",
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

                    // if ($scope.hakAkses === "Super Admin") {

                    //     var refObj = firebase.database().ref("adminSekolah/" + data.$id);
                    //     var objDelete = $firebaseObject(refObj);
                    //     var confirmPopup = $ionicPopup.confirm({
                    //         title: 'Hapus Data',
                    //         template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                    //         okType: "button-balanced",
                    //     });
                    //     confirmPopup.then(function (res) {
                    //         if (res) {
                    //             objDelete.$remove().then(function (ref) {
                    //                 //console.log('Data Berhasil Dihapus');
                    //             });
                    //         }
                    //         else {
                    //             //console.log('Tidak Jadi Menghapus');
                    //         }
                    //     });

                    // }
                    // else {
                    //     $ionicPopup.alert({
                    //         title: 'Perhatian',
                    //         template: "Data tidak diperkenankan menghapus data ini, Terimakasih",
                    //         okType: "button-balanced"
                    //     });
                    // }


                    return true;
                }

            });


        }

    }])