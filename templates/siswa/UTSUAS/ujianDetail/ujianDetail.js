angular.module('app.UTSUASDetailSiswa', [])

    .controller('UTSUASDetailSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        // LOADBALANCING
        if ($scope.idSekolahSiswa === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolahSiswa === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }



        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS,
            "jenjang": $stateParams.jenjang,
            "utsUasTingkat": $stateParams.utsUasTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran
        };

        var refPelajaran = firebase.database(app).ref("pengaturanUmumUjianUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS)
        var listRefPelajaran = $firebaseArray(refPelajaran);

        $ionicLoading.show();
        listRefPelajaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPelajaran = response;
            // console.log(response);
        });

    }])