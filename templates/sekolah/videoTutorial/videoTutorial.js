angular.module('app.videoTutorialSekolah', [])

    .controller('videoTutorialSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        var video = firebase.database().ref("videoTutorial").orderByChild("untuk").equalTo("Admin Sekolah");
        var listVideo = $firebaseArray(video);
        $ionicLoading.show();
        listVideo.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataVideo = response;
        });

        $scope.getData = function (data) {
            // console.log(data)
            $state.go("menuSekolah.videoTutorialLihatSekolah", {
                "idVideo": data.$id,
                "judulVideo": data.judulVideo,
                "keteranganVideo": data.keteranganVideo
            })
        }

    }])

    .controller('videoTutorialLihatSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "idVideo": $stateParams.idVideo,
            "judulVideo": $stateParams.judulVideo,
            "keteranganVideo": $stateParams.keteranganVideo
        }

        var dataVideo = firebase.database().ref("videoTutorial/"+$scope.data.idVideo);
        var obj = $firebaseObject(dataVideo);
        $ionicLoading.show();
        obj.$loaded().then(function(response){
            $ionicLoading.hide();
            $scope.formData = response;
            console.log($scope.formData)
        })

    }])