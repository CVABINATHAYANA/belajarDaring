angular.module('app.visiMisiSekolah', [])

    .controller('visiMisiSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah')

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.tinymceOptions = {
            plugins: [
                'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
                'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                'save table contextmenu directionality emoticons template paste textcolor'
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",

        };

        var refCek = firebase.database().ref("webVisiMisi").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRefCek = $firebaseArray(refCek);
        $ionicLoading.show();
        listRefCek.$loaded().then(function (response) {
            if (response.length === 0) {
                $ionicLoading.hide();
                $scope.formData = {
                    "visi": "",
                    "misi": ""
                };

                $scope.simpan = function () {
                    if ($scope.formData.visi !== "" && $scope.formData.misi !== "") {
                        $ionicLoading.show();
                        var ref = firebase.database().ref("webVisiMisi");
                        ref.push({
                            "visi": $scope.formData.visi,
                            "misi": $scope.formData.misi,
                            "idSekolah": $scope.idSekolah
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'SUKSES',
                                template: 'Data Berhasil Disimpan',

                            });
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf semua data harus diisi',

                        });
                    }
                };
            }
            else if (response.length === 1) {
                $ionicLoading.hide();
                var obj = firebase.database().ref("webVisiMisi/" + response[0].$id);
                var objData = $firebaseObject(obj);
                $ionicLoading.show();
                objData.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.formData = response;
                });

                $scope.simpan = function () {
                    if ($scope.formData.visi !== "" && $scope.formData.misi !== "") {
                        $ionicLoading.show();

                        obj.update(JSON.parse(JSON.stringify({
                            "visi": $scope.formData.visi,
                            "misi": $scope.formData.misi,
                        }))).then(function (resp) {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'SUKSES',
                                template: 'Data Berhasil Disimpan',

                            });
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf semua data harus diisi',

                        });
                    }
                };

            }
        });

    }])