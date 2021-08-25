angular.module('app.materiPelajaranSiswa', ['ngYoutubeEmbed'])

    .controller('materiPelajaranSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        $scope.tambah = function () {
            $state.go("menuSiswa.materiPelajaranTambahSiswa");
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database(appMateriPelajaran).ref("materiPelajaran").orderByChild("publishSekolah").equalTo($scope.idSekolahSiswa+'_'+true);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSoalSiswa = response
            $scope.dataSoal = $scope.dataSoalSiswa.groupBy('pelajaran');
            // console.log($scope.dataSoal)
        });

        $scope.getData = function (x, y) {
            $state.go('menuSiswa.materiPelajaranPerJenjangSiswa', {
                "pelajaran": x,
                "idPelajaran": y[0].idPelajaran
            });
        }

    }])

    .controller('materiPelajaranPerJenjangSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "pelajaran": $stateParams.pelajaran,
            "idPelajaran": $stateParams.idPelajaran
        }


        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        // var ref = firebase.database(appMateriPelajaran).ref("materiPelajaran").orderByChild("filterPelajaranDisplay").equalTo($scope.data.idPelajaran + "_true");
        var ref = firebase.database(appMateriPelajaran).ref("materiPelajaran").orderByChild("filterPelajaranDisplaySekolah").equalTo($scope.idSekolahSiswa+"_"+$scope.data.idPelajaran + "_true");
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSoalSiswa = response
            $scope.dataSoal = $scope.dataSoalSiswa.groupBy('kelas');
            // console.log($scope.dataSoal)
        });

        $scope.getData = function (x, y) {
            $state.go('menuSiswa.materiPelajaranLihatSiswa', {
                "pelajaran": $scope.data.pelajaran,
                "idPelajaran": $scope.data.idPelajaran,
                "kelas": x,
                "jenjang": y[0].jenjang
            });
        }

    }])

    .controller('materiPelajaranLihatSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "pelajaran": $stateParams.pelajaran,
            "idPelajaran": $stateParams.idPelajaran,
            "kelas": $stateParams.kelas,
            "jenjang": $stateParams.jenjang
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database(appMateriPelajaran).ref("materiPelajaran").orderByChild("filterDisplayMateriPelajaranSekolah").equalTo($scope.idSekolahSiswa+"_"+$scope.data.idPelajaran + "_" + $scope.data.jenjang + "_" + $scope.data.kelas + "_true");
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.materiPelajaran = response
        });

        $scope.getData = function (data) {

            $state.go('menuSiswa.materiPelajaranSubBABSiswa', {
                "idMateriPelajaran": data.$id,
                "BAB": data.judulMateriPelajaran
            });

            // $ionicModal.fromTemplateUrl('templates/modal.html', {
            //     scope: $scope,
            //     animation: 'slide-in-up'
            // }).then(function (modal) {
            //     $scope.modal = modal;
            //     $scope.modal.show();

            //     var ref = firebase.database().ref("materiPelajaran/" + data.$id);
            //     var refObject = $firebaseObject(ref);
            //     refObject.$loaded().then(function (response) {
            //         $scope.formData = response;
            //         $scope.videoID = response.videoPembelajaran;

            //     })


            // });

        };

    }])

    .controller('materiPelajaranSubBABSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "idMateriPelajaran": $stateParams.idMateriPelajaran,
            "BAB": $stateParams.BAB
        }


        // var ref = firebase.database(appMateriPelajaran).ref("subBabMateriPelajaran").orderByChild("idMateriPelajaran").equalTo($scope.data.idMateriPelajaran);
        var ref = firebase.database(appMateriPelajaran).ref("subBabMateriPelajaranNew/"+$scope.data.idMateriPelajaran);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.datas = response;
        })

        $scope.getData = function (item) {

            var obj = firebase.database(appMateriPelajaran).ref("subBabMateriPelajaranNew/"+$scope.data.idMateriPelajaran+ "/" + item.$id);
            var listObj = $firebaseObject(obj);
            $ionicLoading.show();
            listObj.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.formData = response;
            })

            $ionicModal.fromTemplateUrl('templates/modalLihat.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

            });

        };

    }])

