angular.module('app.nilaiAndaTryoutOnlineSiswa', [])

    .controller('nilaiAndaTryoutOnlineSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "idTryoutOnline": $stateParams.idTryoutOnline,
            "namaTryoutOnline": $stateParams.namaTryoutOnline,
            "jenjang": $stateParams.jenjang,
            "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idRekapJawabanTryoutOnlineSiswa": $stateParams.idRekapJawabanTryoutOnlineSiswa
        };
        //console.log($scope.data);

        var ref = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.data.idRekapJawabanTryoutOnlineSiswa);
        $scope.formData = $firebaseObject(ref);

        var refNilai = firebase.database(app).ref("rekapJawabanTryoutOnlineSiswa/" + $scope.data.idRekapJawabanTryoutOnlineSiswa + "/pelajaran");
        var listRefNilai = $firebaseArray(refNilai);

        $ionicLoading.show();
        listRefNilai.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.nilai = response;
        });

        $scope.goToNilai = function (data) {
            //console.log(data);
            var getData = firebase.database(app).ref("jawabanTryoutOnlineSiswaPerPelajaran").orderByChild("filter").equalTo($stateParams.idTryoutOnline + "_" + data.idPelajaranTryoutOnline + "_" + $scope.uidSiswa);
            getData.on("child_added", function (snapshot) {
                //console.log(snapshot.val());
                $state.go("menuSiswa.nilaiTryoutOnlineSiswa", {
                    "idTryoutOnline": $stateParams.idTryoutOnline,
                    "namaTryoutOnline": $stateParams.namaTryoutOnline,
                    "jenjang": $stateParams.jenjang,
                    "TryoutOnlineTingkat": $stateParams.TryoutOnlineTingkat,
                    "namaKota": $stateParams.namaKota,
                    "namaProvinsi": $stateParams.namaProvinsi,
                    "semester": $stateParams.semester,
                    "tahunAjaran": $stateParams.tahunAjaran,
                    "idPelajaranTryoutOnline": data.idPelajaranTryoutOnline,
                    "idPelajaran": data.idPelajaran,
                    "pelajaran": data.pelajaran,
                    "statusFinish": snapshot.val().statusFinish,
                    "idJawabanTryoutOnlineSiswaPerPelajaran": snapshot.key,
                    "idRekapJawabanTryoutOnlineSiswa": $stateParams.idRekapJawabanTryoutOnlineSiswa
                });
            });

        };

    }])