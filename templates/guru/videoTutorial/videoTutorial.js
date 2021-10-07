angular.module('app.videoTutorialGuru', [])

    .controller('videoTutorialGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        var video = firebase.database().ref("videoTutorial/Guru");
        var listVideo = $firebaseArray(video);
        $ionicLoading.show();
        listVideo.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataVideo = response;
            console.log($scope.dataVideo);
        });

        $scope.getData = function (data) {
            // console.log(data)
            $state.go("menuGuru.videoTutorialLihatGuru", {
                "idVideo": data.$id,
                "judulVideo": data.JudulvideoTutorial,
                "keteranganVideo": data.keterangan
            })
        }

    }])

    .controller('videoTutorialLihatGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        $scope.data = {
            "idVideo": $stateParams.idVideo,
            "judulVideo": $stateParams.judulVideo,
            "keteranganVideo": $stateParams.keteranganVideo
        }


        var dataVideo = firebase.database().ref("videoTutorial/Guru/"+$scope.data.idVideo);
        var obj = $firebaseObject(dataVideo);
        $ionicLoading.show();
        obj.$loaded().then(function(response){
            $ionicLoading.hide();
            $scope.formData = response;
            console.log($scope.formData)
        })

    }])