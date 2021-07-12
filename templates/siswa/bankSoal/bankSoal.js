angular.module('app.bankSoalSiswa', ['ngYoutubeEmbed'])

    .controller('bankSoalSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        // var soal = firebase.database().ref("soal");
        // var listSoal = $firebaseArray(soal);
        // $ionicLoading.show()
        // listSoal.$loaded().then(function(response){
        //     for(i=0; i<response.length; i++){
        //         var refUpdate = firebase.database().ref("soal/"+response[i].$id);
        //         refUpdate.update({
        //             "filterPelajaranDisplay": response[i].idPelajaran+"_true",
        //             "filterDisplaySoal": response[i].idPelajaran+"_"+response[i].jenjang+"_"+response[i].kelas+"_true",
        //             "publish": true
        //         }).then(function(resp){
        //             $ionicLoading.hide()
        //             console.log("soalUpdated")
        //         })
        //     }
        // })

        // Array.prototype.groupBy = function (prop) {
        //     return this.reduce(function (groups, item) {
        //         const val = item[prop]
        //         groups[val] = groups[val] || []
        //         groups[val].push(item)
        //         return groups
        //     }, {})
        // }

        // var ref = firebase.database().ref("soal").orderByChild("publish").equalTo(true);
        // var listRef = $firebaseArray(ref);
        // $ionicLoading.show();
        // listRef.$loaded().then(function (response) {
        //     $ionicLoading.hide();
        //     $scope.dataSoalSiswa = response
        //     $scope.dataSoal = $scope.dataSoalSiswa.groupBy('pelajaran');
        //     // console.log($scope.dataSoal)
        // });

        var pelajaran = firebase.database().ref("mataPelajaran");
        var listPelajaran = $firebaseArray(pelajaran);
        $ionicLoading.show();
        listPelajaran.$loaded().then(function(response){
            $ionicLoading.hide();
            $scope.dataSoal = response;
        })

        // $scope.getData = function (x, y) {
        //     $state.go('menuSiswa.bankSoalPerJenjangSiswa', {
        //         "pelajaran": x,
        //         "idPelajaran": y[0].idPelajaran
        //     });
        // }
        $scope.getData = function (data) {
            $state.go('menuSiswa.bankSoalPerJenjangSiswa', {
                "pelajaran": data.pelajaran,
                "idPelajaran": data.$id
            });
        }

    }])

    .controller('bankSoalPerJenjangSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        var ref = firebase.database(appBankSoal).ref("soal").orderByChild("filterPelajaranDisplay").equalTo($scope.data.idPelajaran+"_true");
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSoalSiswa = response
            $scope.dataSoal = $scope.dataSoalSiswa.groupBy('kelas');
            // console.log($scope.dataSoal)
        });

        $scope.getData = function (x, y) {
            $state.go('menuSiswa.bankSoalLihatSiswa', {
                "pelajaran": $scope.data.pelajaran,
                "idPelajaran": $scope.data.idPelajaran,
                "kelas": x,
                "jenjang": y[0].jenjang
            });
        }

    }])

    .controller('bankSoalLihatSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
        console.log($scope.data)

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database(appBankSoal).ref("soal").orderByChild("filterDisplaySoal").equalTo($scope.data.idPelajaran + "_" + $scope.data.jenjang + "_" + $scope.data.kelas+"_true");
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.soal = response
        });

        $scope.getData = function (data) {

            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                var ref = firebase.database(appBankSoal).ref("soal/" + data.$id);
                var refObject = $firebaseObject(ref);
                refObject.$loaded().then(function (response) {
                    $scope.formData = response;
                    $scope.videoID = response.videoPembahasan;

                })
            });

            //console.log(data);
            // $ionicActionSheet.show({
            //     titleText: 'Pelajaran : ' + data.pelajaran + ", " + data.jenjang + ", " + data.kelas,
            //     buttons: [
            //         { text: '<i class="icon ion-checkmark-circled"></i> Edit Soal' },
            //         { text: '<i class="icon ion-checkmark-circled"></i> Lihat Soal' },
            //     ],
            //     destructiveText: '<i class="icon ion-trash-b"></i> Hapus Soal',
            //     cancelText: 'Cancel',
            //     cancel: function () {
            //         //console.log('CANCELLED');
            //     },
            //     buttonClicked: function (index) {
            //         if (index === 0) {
            //             $state.go('menuSiswa.bankSoalEditSiswa', {
            //                 "idSoal": data.$id
            //             });
            //         }

            //         if (index === 1) {
                        
            //         }

            //         return true;
            //     },

            //     destructiveButtonClicked: function () {
            //         var refObj = firebase.database().ref("soal/" + data.$id);
            //         var objDelete = $firebaseObject(refObj)
            //         var confirmPopup = $ionicPopup.confirm({
            //             title: 'Hapus Data',
            //             template: 'Apakah Kamu Yakin Ingin Menghapus Data Soal Ini?',
            //             okType: "button-positive",
            //         });
            //         confirmPopup.then(function (res) {
            //             if (res) {
            //                 objDelete.$remove().then(function (ref) {
            //                     //console.log('Data Berhasil Dihapus');
            //                 });
            //             }
            //             else {
            //                 //console.log('Tidak Jadi Menghapus');
            //             }
            //         });
            //         return true;
            //     }

            // });

        };

    }])

 