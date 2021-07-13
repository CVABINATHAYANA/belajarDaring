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

        if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahSiswa=== "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahSiswa === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj14") { var app = app_sapta; }



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