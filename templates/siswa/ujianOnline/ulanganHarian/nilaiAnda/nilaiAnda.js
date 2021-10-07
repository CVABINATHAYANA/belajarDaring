angular.module('app.nilaiAndaUjianOnlineSiswa', [])

    .controller('nilaiAndaUjianOnlineSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "idUjian": $stateParams.idUjian,
            "namaUjian": $stateParams.namaUjian,
            "jenjang": $stateParams.jenjang,
            "UjianOnlineTingkat": $stateParams.UjianOnlineTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idRekapJawabanUjianOnlineSiswa": $stateParams.idRekapJawabanUjianOnlineSiswa
        };
        //console.log($scope.data);

        var ref = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanUjianOnlineSiswa);
        $scope.formData = $firebaseObject(ref);

        var refNilai = firebase.database(app).ref("rekapJawabanUjianOnlineSiswa/" + $scope.data.idRekapJawabanUjianOnlineSiswa + "/pelajaran");
        var listRefNilai = $firebaseArray(refNilai);

        $ionicLoading.show();
        listRefNilai.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.nilai = response;
        });

        $scope.goToNilai = function (data) {
            //console.log(data);
            var getData = firebase.database(app).ref("jawabanUjianOnlineSiswaPerPelajaran").orderByChild("filter").equalTo($stateParams.idUjian + "_" + data.idPelajaranUjianOnline + "_" + $scope.uidSiswa);
            getData.on("child_added", function (snapshot) {
                //console.log(snapshot.val());
                $state.go("menuSiswa.nilaiUjianOnlineSiswa", {
                    "idUjian": $stateParams.idUjian,
                    "namaUjian": $stateParams.namaUjian,
                    "jenjang": $stateParams.jenjang,
                    "UjianOnlineTingkat": $stateParams.UjianOnlineTingkat,
                    "namaKota": $stateParams.namaKota,
                    "namaProvinsi": $stateParams.namaProvinsi,
                    "semester": $stateParams.semester,
                    "tahunAjaran": $stateParams.tahunAjaran,
                    "idPelajaranUjianOnline": data.idPelajaranUjianOnline,
                    "idPelajaran": data.idPelajaran,
                    "pelajaran": data.pelajaran,
                    "statusFinish": snapshot.val().statusFinish,
                    "idJawabanUjianOnlineSiswaPerPelajaran": snapshot.key,
                    "idRekapJawabanUjianOnlineSiswa": $stateParams.idRekapJawabanUjianOnlineSiswa
                });
            });

        };

    }])