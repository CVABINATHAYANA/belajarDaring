angular.module('app.absensiSiswa', [])

    .controller('absensiSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        var ref = firebase.database(app).ref("absensiSiswa").orderByChild("idSiswa").equalTo($scope.idPenggunaSiswa);
        var listRef = $firebaseArray(ref);

        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.absensi = response;
            if(response.length===0){
                $scope.informasi = true;
            }
            else{
                $scope.informasi = false;
            }
            $scope.absensi.sort(function (a, b) {
                return b.groupAbsensi - a.groupAbsensi
            })
            $scope.absensiSiswa = $scope.absensi.groupBy('tanggalAbsensi');
        });

        
        $scope.getData = function (x) {

            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.tanggal = x;
                $scope.absensiDetail = []
                var refAbsensi = firebase.database(app).ref("absensiSiswa").orderByChild("idSiswa").equalTo($scope.idPenggunaSiswa);
                var listRefAbsensi = $firebaseArray(refAbsensi);
                $ionicLoading.show();
                listRefAbsensi.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    for(i=0; i<response.length; i++){
                        if(response[i].tanggalAbsensi===x){
                            $scope.absensiDetail.push({
                                "pelajaran": response[i].pelajaran,
                                "namaGuru": response[i].namaGuru,
                                "keterangan": response[i].keterangan,
                                "jamAbsensi": response[i].jamAbsensi
                            })
                        }
                    }
                    
                })
            });
        }

    }])