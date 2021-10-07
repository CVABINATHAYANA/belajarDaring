angular.module('app.jadwalPelajaranOrangTua', [])

    .controller('jadwalPelajaranOrangTuaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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


        // console.log($scope.idPenggunaSiswa);
        // console.log($scope.namaPenggunaSiswa);
        // console.log($scope.emailSiswa);
        // console.log($scope.uidSiswa);
        // console.log($scope.idSekolahSiswa);
        // console.log($scope.jenjangSiswa);
        // console.log($scope.idProvinsiSiswa);
        // console.log($scope.idKotaKabupatenSiswa);
        // console.log($scope.idKecamatanSiswa);

        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }


        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        $ionicLoading.show();
        var refKelas = firebase.database(appSiswa).ref("dataSiswa/" + $scope.idPenggunaSiswa);
        refKelas.on("value", function (snapshot) {
            $scope.idKelas = snapshot.val().idKelas;
            $ionicLoading.hide();
            
            if($scope.idKelas!==undefined){
                var ref = firebase.database(app).ref("jadwalPelajaran").orderByChild("idKelas").equalTo($scope.idKelas);
                var listRef = $firebaseArray(ref);
                $ionicLoading.show();
                listRef.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.jadwal = response;
                    if(response.length===0){
                        $scope.informasi = true;
                    }
                    else{
                        $scope.informasi = false;
                    }
                    $scope.jadwalPelajaran = $scope.jadwal.groupBy('hari');
                    // console.log($scope.jadwalPelajaran)
                });
            }
            
        })

        $scope.getData = function (x) {
            
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.hari = x;
                var refJadwal = firebase.database(app).ref("jadwalPelajaran").orderByChild("filterKelasHari").equalTo($scope.idKelas + "_" + x);
                var listRefJadwal = $firebaseArray(refJadwal);
                $ionicLoading.show();
                listRefJadwal.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.jadwalSiswa = response;
                })
            });
        }

    }])