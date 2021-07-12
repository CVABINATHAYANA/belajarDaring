angular.module('app.nilaiAndaSOCSiswa', [])

    .controller('nilaiAndaSOCSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa')


        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        $scope.data = {
            "idTryout": $stateParams.idTryout,
            "namaTryout": $stateParams.namaTryout,
            "jenjang": $stateParams.jenjang,
            "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
            "namaKota": $stateParams.namaKota,
            "namaProvinsi": $stateParams.namaProvinsi,
            "semester": $stateParams.semester,
            "tahunAjaran": $stateParams.tahunAjaran,
            "idRekapJawabanOlimpiadeSiswa": $stateParams.idRekapJawabanOlimpiadeSiswa
        };
        //console.log($scope.data);

        var ref = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa);
        $scope.formData = $firebaseObject(ref);

        var refNilai = firebase.database().ref("rekapJawabanOlimpiadeSiswa/" + $scope.data.idRekapJawabanOlimpiadeSiswa + "/pelajaran");
        var listRefNilai = $firebaseArray(refNilai);

        $ionicLoading.show();
        listRefNilai.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.nilai = response;
        });

        $scope.goToNilai = function (data) {
            //console.log(data);
            var getData = firebase.database().ref("jawabanOlimpiadeSiswaPerPelajaran").orderByChild("filter").equalTo($stateParams.idTryout + "_" + data.idPelajaranTryout + "_" + $scope.uidSiswa);
            getData.on("child_added", function (snapshot) {
                //console.log(snapshot.val());
                $state.go("menuSiswa.nilaiSOCSiswa", {
                    "idTryout": $stateParams.idTryout,
                    "namaTryout": $stateParams.namaTryout,
                    "jenjang": $stateParams.jenjang,
                    "olimpiadeTingkat": $stateParams.olimpiadeTingkat,
                    "namaKota": $stateParams.namaKota,
                    "namaProvinsi": $stateParams.namaProvinsi,
                    "semester": $stateParams.semester,
                    "tahunAjaran": $stateParams.tahunAjaran,
                    "idPelajaranTryout": data.idPelajaranTryout,
                    "idPelajaran": data.idPelajaran,
                    "pelajaran": data.pelajaran,
                    "statusFinish": snapshot.val().statusFinish,
                    "idJawabanOlimpiadeSiswaPerPelajaran": snapshot.key,
                    "idRekapJawabanOlimpiadeSiswa": $stateParams.idRekapJawabanOlimpiadeSiswa
                });
            });

        };

    }])