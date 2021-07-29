angular.module('app.nilaiAndaUTSUASSiswa', [])

    .controller('nilaiAndaUTSUASSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah');
        $scope.idKelas = localStorage.getItem('idKelas')

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
            "tahunAjaran": $stateParams.tahunAjaran,
            "idRekapJawabanUTSUASSiswa": $stateParams.idRekapJawabanUTSUASSiswa
        };


        var cekkelas = firebase.database(app).ref("pesertaUTSUAS").orderByChild("uid").equalTo($scope.uidSiswa);
        var listRefkelas = $firebaseArray(cekkelas);

        // $ionicLoading.show();
        listRefkelas.$loaded().then(function (response) {
            // $ionicLoading.hide();
            console.log(response);
            var idKelasSiswa =response[0].idKelas

            console.log('CEK1');
            console.log('id Ujian :' + $scope.data.idUTSUAS);
            console.log('id Kelas :' + idKelasSiswa);
            console.log('id siswa :' + $scope.uidSiswa );

            var ref = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idUTSUAS +'/'+ $scope.data.idRekapJawabanUTSUASSiswa);
            $scope.formData = $firebaseObject(ref);
    
            var refNilai = firebase.database(app).ref("rekapJawabanUTSUASSiswa/" + $scope.data.idUTSUAS + '/'+ $scope.data.idRekapJawabanUTSUASSiswa + "/pelajaran");
            var listRefNilai = $firebaseArray(refNilai);
    
            $ionicLoading.show();
            listRefNilai.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.nilai = response;
            });
    
            $scope.goToNilai = function (data) {
                //console.log(data);
                var getData = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + $scope.data.idUTSUAS + '/' + idKelasSiswa + '/' + $scope.uidSiswa).orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + data.idPelajaranUTSUAS + "_" + $scope.uidSiswa);
                getData.on("child_added", function (snapshot) {
                    //console.log(snapshot.val());
                    $state.go("menuSiswa.nilaiUTSUASSiswa", {
                        "idUTSUAS": $stateParams.idUTSUAS,
                        "namaUTSUAS": $stateParams.namaUTSUAS,
                        "jenjang": $stateParams.jenjang,
                        "utsUasTingkat": $stateParams.utsUasTingkat,
                        "namaKota": $stateParams.namaKota,
                        "namaProvinsi": $stateParams.namaProvinsi,
                        "semester": $stateParams.semester,
                        "tahunAjaran": $stateParams.tahunAjaran,
                        "idPelajaranUTSUAS": data.idPelajaranUTSUAS,
                        "idPelajaran": data.idPelajaran,
                        "pelajaran": data.pelajaran,
                        "statusFinish": snapshot.val().statusFinish,
                        "idJawabanUTSUASSiswaPerPelajaran": snapshot.key,
                        "idRekapJawabanUTSUASSiswa": $stateParams.idRekapJawabanUTSUASSiswa,
                        // "idKelas": idKelasSiswa,
                        // "siswauid":$scope.uidSiswa,
                    });
                });
    
            };
        });
    }])