angular.module('app.videoTutorialSiswa', [])

    .controller('videoTutorialSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa');
        $scope.statusSiswa = localStorage.getItem('statusSiswa');
        $scope.namaSekolahSiswa = localStorage.getItem('namaSekolahSiswa');
        $scope.namaKotaKabupatenSiswa = localStorage.getItem('namaKotaKabupatenSiswa');
        $scope.namaProvinsiSiswa = localStorage.getItem('namaProvinsiSiswa');
        $scope.jenisKelaminSiswa = localStorage.getItem('jenisKelaminSiswa');
        $scope.namaKelasSiswa = localStorage.getItem('namaKelasSiswa');

        if (!$scope.idPenggunaSiswa) {
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
            // console.log(data)
            $state.go("menuSiswa.videoTutorialLihatSiswa", {
                "idVideo": data.$id,
                "judulVideo": data.judulVideo,
                "keteranganVideo": data.keteranganVideo
            })
        }

    }])

    .controller('videoTutorialLihatSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa');
        $scope.statusSiswa = localStorage.getItem('statusSiswa');
        $scope.namaSekolahSiswa = localStorage.getItem('namaSekolahSiswa');
        $scope.namaKotaKabupatenSiswa = localStorage.getItem('namaKotaKabupatenSiswa');
        $scope.namaProvinsiSiswa = localStorage.getItem('namaProvinsiSiswa');
        $scope.jenisKelaminSiswa = localStorage.getItem('jenisKelaminSiswa');
        $scope.namaKelasSiswa = localStorage.getItem('namaKelasSiswa');

        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        $scope.data = {
            "idVideo": $stateParams.idVideo,
            "judulVideo": $stateParams.judulVideo,
            "keteranganVideo": $stateParams.keteranganVideo
        }

        var dataVideo = firebase.database().ref("videoTutorial/Siswa/"+$scope.data.idVideo);
        var obj = $firebaseObject(dataVideo);
        $ionicLoading.show();
        obj.$loaded().then(function(response){
            $ionicLoading.hide();
            $scope.formData = response;
            console.log($scope.formData)
        })

    }])