angular.module('app.dataPokokSekolahGuru', [])

    .controller('dataSekolahGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.tambahSekolah = function () {
            $state.go("menuGuru.dataSekolahTambahGuru");
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSekolah = response
            $scope.totalSekolah = response.length;
            $scope.dataSekolahMuaraEnim = $scope.dataSekolah.groupBy('nama_kecamatan');
        });

        $scope.getDataKecamatan = function (x, y) {
            $state.go("menuGuru.dataSekolahPerKecamatanGuru", {
                "namaKecamatan": x,
                "idKecamatan": y[0].id_kecamatan
            })
        }


        $scope.formData = {
            "provinsi": "",
            "kotaKabupaten": "",
            "kecamatan": "",
        }

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi");
        var listProvinsi = $firebaseArray(refProvinsi);
        $ionicLoading.show();
        listProvinsi.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataProvinsi = response;
            //console.log($scope.dataProvinsi);
        });

        $scope.getProvinsi = function () {
            var idProvinsi = $scope.formData.provinsi;
            // console.log(idProvinsi)

            //Get Nama Provinsi
            var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
            var listNamaProvinsi = $firebaseArray(namaProvinsi);
            listNamaProvinsi.$loaded().then(function (response) {
                $scope.namaProvinsi = response[0].nama_provinsi;
                //console.log($scope.namaProvinsi);
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo(idProvinsi);
            var listRefKotaKabupaten = $firebaseArray(refKotaKabupaten);
            $ionicLoading.show();
            listRefKotaKabupaten.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKotaKabupaten = response;
                // console.log($scope.dataKotaKabupaten);
            })
        };

        $scope.getKotaKabupaten = function () {
            var idKotaKabupaten = $scope.formData.kotaKabupaten;

            //Get Nama Kota Kabupaten
            var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
            listNamaKotaKabupaten.$loaded().then(function (response) {
                $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
                // console.log($scope.namaKotaKabupaten);
            });

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            var listRefKecamatan = $firebaseArray(refKecamatan);
            $ionicLoading.show();
            listRefKecamatan.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKecamatan = response;
                //console.log($scope.dataKecamatan);
            })
        };

        $scope.getKecamatan = function () {
            var idKecamatan = $scope.formData.kecamatan;
            $scope.idKecamatan = $scope.formData.kecamatan;

            //Get Nama Kecamatan
            var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo(idKecamatan);
            var listNamaKecamatan = $firebaseArray(namaKecamatan);
            listNamaKecamatan.$loaded().then(function (response) {
                $scope.namaKecamatan = response[0].nama_kecamatan;
                $scope.id_kecamatan = response[0].id_kecamatan;
                // console.log($scope.id_kecamatan);

                var refSchool = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo($scope.id_kecamatan);
                var listRefSchool = $firebaseArray(refSchool);
                $ionicLoading.show();
                listRefSchool.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.tampil = true;
                    $scope.dataSekolahTampil = response;
                })

            });
        }

        $scope.getData = function (data) {
            console.log(data);
            $ionicActionSheet.show({
                titleText: 'Data Sekolah : ' + data.nama_sekolah,
                buttons: [
                    { text: '<i class="icon ion-edit"></i> Edit Sekolah' },
                    { text: '<i class="icon ion-social-buffer"></i> Data Prasarana' },
                    { text: '<i class="icon ion-android-folder-open"></i> Data Sarana' },
                    { text: '<i class="icon ion-android-list"></i> Data Rombel' },
                    { text: '<i class="icon ion-person-stalker"></i> Data Guru/Pegawai' },
                    { text: '<i class="icon ion-ios-people"></i> Data Siswa' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Sekolah',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('menuGuru.dataSekolahEditGuru', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                        });
                    }
                    if (index === 1) {
                        $state.go('menuGuru.dataPrasaranaGuru', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan
                        });
                    }
                    if (index === 2) {
                        $state.go('menuGuru.dataSaranaGuru', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan
                        });
                    }
                    if (index === 3) {
                        $state.go('menuGuru.dataKelasGuru', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan,
                            "jenjang": data.jenjang
                        });
                    }
                    if (index === 4) {
                        $state.go('menuGuru.dataGuruGuru', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan,
                            "jenjang": data.jenjang
                        });
                    }
                    if (index === 5) {
                        $state.go('menuGuru.dataSiswaGuru', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan,
                            "jenjang": data.jenjang
                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {

                    // console.log(data.$id)
                    if ($scope.hakAkses === "Super Guru") {

                        var refObj = firebase.database().ref("dataSekolahIndonesia/" + data.$id);
                        var objDelete = $firebaseObject(refObj);
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Hapus Data',
                            template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                            okType: "button-positive",
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                objDelete.$remove().then(function (ref) {
                                    //console.log('Data Berhasil Dihapus');
                                });
                            }
                            else {
                                //console.log('Tidak Jadi Menghapus');
                            }
                        });

                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: "Anda Tidak Diperkenankan Menghapus Data Sekolah Ini, Terimakasih",
                            okType: "button-positive"
                        });
                    }


                    return true;
                }

            });
        }

    }])

    .controller('dataSekolahPerKecamatanGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo($scope.data.idKecamatan);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSekolah = response
            $scope.totalSekolah = response.length;
            $scope.dataSekolahMuaraEnim = $scope.dataSekolah.groupBy('jenjang');
            // console.log($scope.dataSekolahMuaraEnim);
        });

        $scope.getDataJenjang = function (x, y) {
            $state.go("menuGuru.dataSekolahPerJenjangGuru", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": x
            })
        }

    }])

    .controller('dataSekolahPerJenjangGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        // console.log($scope.hakAkses)

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan,
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

        var ref = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.data.idKecamatan + "_" + $scope.data.jenjang);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSekolah = response
            $scope.totalSekolah = response.length;
            $scope.dataSekolahMuaraEnim = $scope.dataSekolah.groupBy('status');
            // console.log($scope.dataSekolahMuaraEnim);
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database().ref("dataSekolahIndonesia/" + response[i].$id);
                updateData.update(JSON.parse(JSON.stringify({
                    "filterJenjangStatus": response[i].id_kecamatan + "_" + response[i].jenjang + "_" + response[i].status
                }))).then(function (resp) {
                    console.log('success');
                })
            }
        });

        $scope.getDataSekolah = function (x, y) {
            $state.go("menuGuru.dataSekolahListGuru", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": $scope.data.jenjang,
                "status": x
            })
        }

    }])

    .controller('dataSekolahListGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang,
            "status": $stateParams.status
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("dataSekolahIndonesia").orderByChild("filterJenjangStatus").equalTo($scope.data.idKecamatan + "_" + $scope.data.jenjang + "_" + $scope.data.status);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSekolahMuaraEnim = response
            $scope.totalSekolah = response.length;
        });

        // $scope.getData = function (data) {
        //     // console.log(data);
        //     $ionicActionSheet.show({
        //         titleText: 'Data Sekolah : ' + data.nama_sekolah,
        //         buttons: [
        //             { text: '<i class="icon ion-edit"></i> Edit Sekolah' },
        //             { text: '<i class="icon ion-social-buffer"></i> Data Prasarana' },
        //             { text: '<i class="icon ion-android-folder-open"></i> Data Sarana' },
        //             { text: '<i class="icon ion-android-list"></i> Data Rombel' },
        //             { text: '<i class="icon ion-person-stalker"></i> Data Guru/Pegawai' },
        //             { text: '<i class="icon ion-ios-people"></i> Data Siswa' },
        //         ],
        //         destructiveText: '<i class="icon ion-trash-b"></i> Hapus Sekolah',
        //         cancelText: 'Cancel',
        //         cancel: function () {
        //             //console.log('CANCELLED');
        //         },
        //         buttonClicked: function (index) {
        //             if (index === 0) {
        //                 $state.go('menuGuru.dataSekolahEditGuru', {
        //                     "idSekolah": data.$id,
        //                     "namaSekolah": data.nama_sekolah,
        //                 });
        //             }
        //             if (index === 1) {
        //                 $state.go('menuGuru.dataPrasaranaGuru', {
        //                     "idSekolah": data.$id,
        //                     "namaSekolah": data.nama_sekolah,
        //                     "idKotaKabupaten": data.id_kota_kabupaten,
        //                     "idKecamatan": data.id_kecamatan,
        //                     "jenjang": data.jenjang,
        //                     "namaKecamatan": data.nama_kecamatan
        //                 });
        //             }
        //             if (index === 2) {
        //                 $state.go('menuGuru.dataSaranaGuru', {
        //                     "idSekolah": data.$id,
        //                     "namaSekolah": data.nama_sekolah,
        //                     "idKotaKabupaten": data.id_kota_kabupaten,
        //                     "idKecamatan": data.id_kecamatan,
        //                     "jenjang": data.jenjang,
        //                     "namaKecamatan": data.nama_kecamatan
        //                 });
        //             }
        //             if (index === 3) {
        //                 $state.go('menuGuru.dataKelasGuru', {
        //                     "idSekolah": data.$id,
        //                     "namaSekolah": data.nama_sekolah,
        //                     "idKotaKabupaten": data.id_kota_kabupaten,
        //                     "idKecamatan": data.id_kecamatan,
        //                     "jenjang": data.jenjang
        //                 });
        //             }
        //             if (index === 4) {
        //                 $state.go('menuGuru.dataGuruGuru', {
        //                     "idSekolah": data.$id,
        //                     "namaSekolah": data.nama_sekolah,
        //                     "idKotaKabupaten": data.id_kota_kabupaten,
        //                     "idKecamatan": data.id_kecamatan,
        //                     "jenjang": data.jenjang
        //                 });
        //             }
        //             if (index === 5) {
        //                 $state.go('menuGuru.dataSiswaGuru', {
        //                     "idSekolah": data.$id,
        //                     "namaSekolah": data.nama_sekolah,
        //                     "idKotaKabupaten": data.id_kota_kabupaten,
        //                     "idKecamatan": data.id_kecamatan,
        //                     "jenjang": data.jenjang
        //                 });
        //             }
        //             return true;
        //         },

        //         destructiveButtonClicked: function () {

        //             // console.log(data.$id)
        //             if ($scope.hakAkses === "Super Guru") {

        //                 var refObj = firebase.database().ref("dataSekolahIndonesia/" + data.$id);
        //                 var objDelete = $firebaseObject(refObj);
        //                 var confirmPopup = $ionicPopup.confirm({
        //                     title: 'Hapus Data',
        //                     template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
        //                     okType: "button-positive",
        //                 });
        //                 confirmPopup.then(function (res) {
        //                     if (res) {
        //                         objDelete.$remove().then(function (ref) {
        //                             //console.log('Data Berhasil Dihapus');
        //                         });
        //                     }
        //                     else {
        //                         //console.log('Tidak Jadi Menghapus');
        //                     }
        //                 });

        //             }
        //             else {
        //                 $ionicPopup.alert({
        //                     title: 'Perhatian',
        //                     template: "Anda Tidak Diperkenankan Menghapus Data Sekolah Ini, Terimakasih",
        //                     okType: "button-positive"
        //                 });
        //             }


        //             return true;
        //         }

        //     });
        // }

    }])

    .controller('dataSekolahTambahGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.formData = {
            "jenjang": "",
            "status": "",
            "namaSekolah": "",
            "idProvinsi": "",
            "idKotaKabupaten": "",
            "idKecamatan": "",
            "alamatSekolah": "",
            "namaKepsek": "",
            "noHpKepsek": "",
            "npsn": "",
        }

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi");
        var listProvinsi = $firebaseArray(refProvinsi);

        listProvinsi.$loaded().then(function (response) {
            $scope.dataProvinsi = response;
            //console.log($scope.dataProvinsi);
        });

        $scope.getIdProvinsi = function () {
            var idProvinsi = $scope.formData.idProvinsi;
            // console.log(idProvinsi)

            //Get Nama Provinsi
            var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
            var listNamaProvinsi = $firebaseArray(namaProvinsi);
            listNamaProvinsi.$loaded().then(function (response) {
                $scope.namaProvinsi = response[0].nama_provinsi;
                //console.log($scope.namaProvinsi);
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo(idProvinsi);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
            // console.log($scope.dataKotaKabupaten);

        };

        $scope.getIdKotaKabupaten = function () {
            var idKotaKabupaten = $scope.formData.idKotaKabupaten;

            //Get Nama Kota Kabupaten
            var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
            listNamaKotaKabupaten.$loaded().then(function (response) {
                $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
                // console.log($scope.namaKotaKabupaten);
            });

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);
            //console.log($scope.dataKecamatan);
        };

        $scope.getIdKecamatan = function () {
            var idKecamatan = $scope.formData.idKecamatan;
            $scope.idKecamatan = $scope.formData.idKecamatan;

            //Get Nama Kecamatan
            var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo(idKecamatan);
            var listNamaKecamatan = $firebaseArray(namaKecamatan);
            listNamaKecamatan.$loaded().then(function (response) {
                $scope.namaKecamatan = response[0].nama_kecamatan;
                $scope.id_kecamatan = response[0].id_kecamatan;
                // console.log($scope.id_kecamatan);

                var refSchool = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo($scope.id_kecamatan);
                var listRefSchool = $firebaseArray(refSchool);
                $ionicLoading.show();
                listRefSchool.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.tampil = true;
                    $scope.dataSekolah = response;
                })

            });
        }

        $scope.simpan = function () {
            var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
            // console.log($scope.formData);
            if ($scope.formData.jenjang !== "" && $scope.formData.status !== "" && $scope.formData.namaSekolah !== "" && $scope.formData.idProvinsi !== "" && $scope.formData.idKotaKabupaten !== "" && $scope.formData.idKecamatan !== "" && $scope.formData.npsn !== "") {
                $ionicLoading.show();
                var ref = firebase.database().ref("dataSekolahIndonesia");
                ref.push({
                    "id_kecamatan": $scope.formData.idKecamatan,
                    "id_kota_kabupaten": $scope.formData.idKotaKabupaten,
                    "id_provinsi": $scope.formData.idProvinsi,
                    "id_sekolah": "-",
                    "jenjang": $scope.formData.jenjang,
                    "nama_kecamatan": $scope.namaKecamatan,
                    "nama_kota_kabupaten": $scope.namaKotaKabupaten,
                    "nama_provinsi": $scope.namaProvinsi,
                    "nama_sekolah": $scope.formData.namaSekolah,
                    "npsn": $scope.formData.npsn,
                    "status": $scope.formData.status,
                    "alamat_sekolah": $scope.formData.alamatSekolah,
                    "kepala_sekolah": $scope.formData.namaKepsek,
                    "nohpkepsek": $scope.formData.noHpKepsek,
                    "filter": $scope.formData.idKecamatan + "_" + $scope.formData.jenjang,
                    "createAt": createAt,
                    "diBuatOleh": $scope.namaGuru,
                    "idPembuat": $scope.idGuru,

                }).then(function (resp) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'SUKSES',
                        template: "Data sekolah berhasil disimpan",
                        okType: "button-positive"
                    });
                    $state.go("menuGuru.dataSekolahGuru")
                })

            }
            else {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: "Beberapa data harus diisi, Terimakasih",
                    okType: "button-positive"
                });
            }
        }

    }])

    .controller('dataSekolahEditGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.namaSekolahGuru = localStorage.getItem('namaSekolahGuru')

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah
        }

        var obj = firebase.database().ref("dataSekolahIndonesia/" + $scope.idSekolahGuru);
        $scope.formData = $firebaseObject(obj);

        obj.on("value", function (snapshot) {

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo(snapshot.val().id_provinsi);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(snapshot.val().id_kota_kabupaten);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);
        })

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi");
        var listProvinsi = $firebaseArray(refProvinsi);

        listProvinsi.$loaded().then(function (response) {
            $scope.dataProvinsi = response;
            //console.log($scope.dataProvinsi);
        });

        $scope.getIdProvinsi = function () {
            var idProvinsi = $scope.formData.id_provinsi;
            // console.log(idProvinsi)

            //Get Nama Provinsi
            var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
            var listNamaProvinsi = $firebaseArray(namaProvinsi);
            listNamaProvinsi.$loaded().then(function (response) {
                $scope.namaProvinsi = response[0].nama_provinsi;
                //console.log($scope.namaProvinsi);
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo(idProvinsi);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
            // console.log($scope.dataKotaKabupaten);

        };

        $scope.getIdKotaKabupaten = function () {
            var idKotaKabupaten = $scope.formData.id_kota_kabupaten;

            //Get Nama Kota Kabupaten
            var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
            listNamaKotaKabupaten.$loaded().then(function (response) {
                $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
                // console.log($scope.namaKotaKabupaten);
            });

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);
            //console.log($scope.dataKecamatan);
        };

        $scope.getIdKecamatan = function () {
            var idKecamatan = $scope.formData.id_kecamatan;
            // console.log(idKecamatan);
            $scope.idKecamatan = $scope.formData.id_kecamatan;

            //Get Nama Kecamatan
            var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo(idKecamatan);
            var listNamaKecamatan = $firebaseArray(namaKecamatan);
            listNamaKecamatan.$loaded().then(function (response) {
                $scope.namaKecamatan = response[0].nama_kecamatan;
                $scope.id_kecamatan = response[0].id_kecamatan;
                // console.log($scope.id_kecamatan);

                var refSchool = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo($scope.id_kecamatan);
                var listRefSchool = $firebaseArray(refSchool);
                $ionicLoading.show();
                listRefSchool.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.tampil = true;
                    $scope.dataSekolah = response;
                })

            });
        }

        $scope.simpan = function () {
            var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
            if ($scope.formData.jenjang !== "" && $scope.formData.status !== "" && $scope.formData.namaSekolah !== "" && $scope.formData.idProvinsi !== "" && $scope.formData.idKotaKabupaten !== "" && $scope.formData.idKecamatan !== "" && $scope.formData.npsn !== "") {

                var obj = firebase.database().ref("dataSekolahIndonesia/" + $scope.data.idSekolah);

                obj.update(JSON.parse(JSON.stringify({
                    "id_kecamatan": $scope.formData.id_kecamatan,
                    "id_kota_kabupaten": $scope.formData.id_kota_kabupaten,
                    "id_provinsi": $scope.formData.id_provinsi,
                    "id_sekolah": "-",
                    "jenjang": $scope.formData.jenjang,
                    "nama_kecamatan": $scope.namaKecamatan,
                    "nama_kota_kabupaten": $scope.namaKotaKabupaten,
                    "nama_provinsi": $scope.namaProvinsi,
                    "nama_sekolah": $scope.formData.nama_sekolah,
                    "npsn": $scope.formData.npsn,
                    "status": $scope.formData.status,
                    "alamat_sekolah": $scope.formData.alamat_sekolah,
                    "kepala_sekolah": $scope.formData.kepala_sekolah,
                    "nohpkepsek": $scope.formData.nohpkepsek,
                    "filter": $scope.formData.id_kecamatan + "_" + $scope.formData.jenjang,
                    "updateAt": createAt,
                    "diEditOleh": $scope.namaGuru,
                    "idPengedit": $scope.idGuru

                }))).then(function (resp) {
                    $state.go("menuGuru.dataSekolahGuru")
                    $ionicPopup.alert({
                        title: 'SUKSES',
                        template: "Data sekolah berhasil disimpan",
                        okType: "button-positive"
                    });
                })

            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: "Beberapa data harus diisi, Terimakasih",
                    okType: "button-positive"
                });
            }
        }

    }])

    .controller('dataPrasaranaGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.namaSekolahGuru = localStorage.getItem('namaSekolahGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.namaKecamatanGuru = localStorage.getItem('namaKecamatanGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "idKotaKabupaten": $stateParams.idKotaKabupaten,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang,
            "namaKecamatan": $stateParams.namaKecamatan
        }

        var ref = firebase.database().ref("dataPrasarana").orderByChild("idSekolah").equalTo($scope.idSekolahGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPrasarana = response;
        });

        var refJenisPrasarana = firebase.database().ref("jenisPrasarana");
        var listRefJenisPrasarana = $firebaseArray(refJenisPrasarana);
        $ionicLoading.show();
        listRefJenisPrasarana.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.jenisPrasarana = response;
        });

        $scope.tambahPrasarana = function () {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.formData = {
                    "jenisPrasarana": "",
                    "namaPrasarana": "",
                    "panjang": "",
                    "lebar": "",
                    "kondisiAtap": "",
                    "dinding": "",
                    "kusen": "",
                    "pondasi": "",
                    "lantai": "",
                    "kepemilikan": "",
                }

                $scope.simpan = function () {
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                    if ($scope.formData.jenisPrasarana !== "" && $scope.formData.namaPrasarana !== "" && $scope.formData.panjang !== null && $scope.formData.lebar !== null && $scope.formData.kondisiAtap !== "" && $scope.formData.dinding !== "" && $scope.formData.kusen !== "" && $scope.formData.pondasi !== "" && $scope.formData.lantai !== "" && $scope.formData.kepemilikan !== "") {
                        $ionicLoading.show();
                        var ref = firebase.database().ref("dataPrasarana");
                        ref.push({
                            "jenisPrasarana": $scope.formData.jenisPrasarana,
                            "namaPrasarana": $scope.formData.namaPrasarana,
                            "panjang": $scope.formData.panjang,
                            "lebar": $scope.formData.lebar,
                            "kondisiAtap": $scope.formData.kondisiAtap,
                            "dinding": $scope.formData.dinding,
                            "kusen": $scope.formData.kusen,
                            "pondasi": $scope.formData.pondasi,
                            "lantai": $scope.formData.lantai,
                            "kepemilikan": $scope.formData.kepemilikan,
                            "createAt": createAt,
                            "diBuatOleh": $scope.namaGuru,
                            "idPembuat": $scope.idGuru,
                            "idSekolah": $scope.idSekolahGuru,
                            "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                            "idKecamatan": $scope.idKecamatanGuru,
                            "jenjang": $scope.jenjangGuru,
                            "namaKecamatan": $scope.namaKecamatanGuru,
                            "namaSekolah": $scope.namaSekolahGuru
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide();
                        })

                    }
                    else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Semua Data Harus Diisi, terima kasih',

                        });
                    }
                };

            });

        };

        $scope.editData = function (data) {
            var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
            var ref = firebase.database().ref("dataPrasarana/" + data.$id);
            var refObj = $firebaseObject(ref);
            $ionicLoading.show();
            refObj.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.formData = response;
            });

            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.simpan = function () {
                    if ($scope.formData.jenisPrasarana !== "" && $scope.formData.namaPrasarana !== "" && $scope.formData.panjang !== null && $scope.formData.lebar !== null && $scope.formData.kondisiAtap !== "" && $scope.formData.dinding !== "" && $scope.formData.kusen !== "" && $scope.formData.pondasi !== "" && $scope.formData.lantai !== "" && $scope.formData.kepemilikan !== "") {
                        $ionicLoading.show();
                        ref.update({
                            "jenisPrasarana": $scope.formData.jenisPrasarana,
                            "namaPrasarana": $scope.formData.namaPrasarana,
                            "panjang": $scope.formData.panjang,
                            "lebar": $scope.formData.lebar,
                            "kondisiAtap": $scope.formData.kondisiAtap,
                            "dinding": $scope.formData.dinding,
                            "kusen": $scope.formData.kusen,
                            "pondasi": $scope.formData.pondasi,
                            "lantai": $scope.formData.lantai,
                            "kepemilikan": $scope.formData.kepemilikan,
                            "updateAt": createAt,
                            "diEditOleh": $scope.namaGuru,
                            "idPengedit": $scope.idGuru,
                            "idSekolah": $scope.idSekolahGuru,
                            "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                            "idKecamatan": $scope.idKecamatanGuru,
                            "jenjang": $scope.jenjangGuru,
                            "namaKecamatan": $scope.namaKecamatanGuru,
                            "namaSekolah": $scope.namaSekolahGuru
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide();
                        })

                    }
                    else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Semua Data Harus Diisi, terima kasih',

                        });
                    }
                };

            });
        };

        $scope.hapusData = function (data) {
            if (data.idPembuat === $scope.idGuru) {
                var refObj = firebase.database().ref("dataPrasarana/" + data.$id);
                var objDelete = $firebaseObject(refObj)
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Hapus Data',
                    template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                    okType: "button-positive",
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        objDelete.$remove().then(function (ref) {
                            //console.log('Data Berhasil Dihapus');
                        });
                    }
                    else {
                        //console.log('Tidak Jadi Menghapus');
                    }
                });
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Anda tidak diperkenankan untuk menghapus data ini, Terima Kasih',
                    okType: 'button-positive'
                });
            }

        };

    }])

    .controller('dataSaranaGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.namaSekolahGuru = localStorage.getItem('namaSekolahGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.namaKecamatanGuru = localStorage.getItem('namaKecamatanGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "idKotaKabupaten": $stateParams.idKotaKabupaten,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang,
            "namaKecamatan": $stateParams.namaKecamatan
        }

        var ref = firebase.database().ref("sarana").orderByChild("idSekolah").equalTo($scope.idSekolahGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSarana = response;
        })

        var refDataPrasarana = firebase.database().ref("dataPrasarana").orderByChild("idSekolah").equalTo($scope.idSekolahGuru);
        var listRefDataPrasarana = $firebaseArray(refDataPrasarana);
        $ionicLoading.show();
        listRefDataPrasarana.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPrasarana = response;
        })

        var refJenisSarana = firebase.database().ref("jenisSarana");
        var listRefJenisSarana = $firebaseArray(refJenisSarana);
        $ionicLoading.show();
        listRefJenisSarana.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.jenisSarana = response;
        })

        $scope.tambahSarana = function () {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.formData = {
                    "idPrasarana": "",
                    "idJenisSarana": "",
                    "namaSarana": "",
                    "jumlah": "",
                    "kondisi": "",
                    "kelaikan": "",
                    "kepemilikan": "",
                }

                $scope.getPrasarana = function () {
                    var id = $scope.formData.idPrasarana;
                    var prasarana = firebase.database().ref("dataPrasarana/" + id);
                    prasarana.on("value", function (snapshot) {
                        $scope.namaPrasarana = snapshot.val().namaPrasarana
                    })
                }

                $scope.getJenisSarana = function () {
                    var id = $scope.formData.idJenisSarana;
                    var sarana = firebase.database().ref("jenisSarana/" + id);
                    sarana.on("value", function (snapshot) {
                        $scope.namaJenisSarana = snapshot.val().jenisSarana
                    })
                }

                $scope.simpan = function () {
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                    if ($scope.formData.idPrasarana !== "" && $scope.formData.idJenisSarana !== "" && $scope.formData.namaSarana !== "" && $scope.formData.jumlah !== null && $scope.formData.kondisi !== "" && $scope.formData.kelaikan !== "" && $scope.formData.kepemilikan !== "") {
                        $ionicLoading.show();
                        var ref = firebase.database().ref("sarana");
                        ref.push({
                            "idPrasarana": $scope.formData.idPrasarana,
                            "namaPrasarana": $scope.namaPrasarana,
                            "idJenisSarana": $scope.formData.idJenisSarana,
                            "jenisSarana": $scope.namaJenisSarana,
                            "namaSarana": $scope.formData.namaSarana,
                            "jumlah": $scope.formData.jumlah,
                            "kondisi": $scope.formData.kondisi,
                            "kelaikan": $scope.formData.kelaikan,
                            "kepemilikan": $scope.formData.kepemilikan,
                            "createAt": createAt,
                            "diBuatOleh": $scope.namaGuru,
                            "idPembuat": $scope.idGuru,
                            "idSekolah": $scope.idSekolahGuru,
                            "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                            "idKecamatan": $scope.idKecamatanGuru,
                            "jenjang": $scope.jenjangGuru,
                            "namaKecamatan": $scope.namaKecamatanGuru,
                            "namaSekolah": $scope.namaSekolahGuru
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide();
                        })

                    }
                    else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Semua Data Harus Diisi, terima kasih',

                        });
                    }
                };

            });

        };

        $scope.editData = function (data) {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                var ref = firebase.database().ref("sarana/" + data.$id);
                $scope.formData = $firebaseObject(ref);

                $scope.getPrasarana = function () {
                    var id = $scope.formData.idPrasarana;
                    var prasarana = firebase.database().ref("dataPrasarana/" + id);
                    prasarana.on("value", function (snapshot) {
                        $scope.namaPrasarana = snapshot.val().namaPrasarana
                    })
                }

                $scope.getJenisSarana = function () {
                    var id = $scope.formData.idJenisSarana;
                    var sarana = firebase.database().ref("jenisSarana/" + id);
                    sarana.on("value", function (snapshot) {
                        $scope.namaJenisSarana = snapshot.val().jenisSarana
                    })
                }

                $scope.simpan = function () {
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                    if ($scope.formData.idPrasarana !== "" && $scope.formData.idJenisSarana !== "" && $scope.formData.namaSarana !== "" && $scope.formData.jumlah !== null && $scope.formData.kondisi !== "" && $scope.formData.kelaikan !== "" && $scope.formData.kepemilikan !== "") {
                        $ionicLoading.show();
                        ref.update(JSON.parse(JSON.stringify({
                            "idPrasarana": $scope.formData.idPrasarana,
                            "namaPrasarana": $scope.namaPrasarana,
                            "idJenisSarana": $scope.formData.idJenisSarana,
                            "jenisSarana": $scope.namaJenisSarana,
                            "namaSarana": $scope.formData.namaSarana,
                            "jumlah": $scope.formData.jumlah,
                            "kondisi": $scope.formData.kondisi,
                            "kelaikan": $scope.formData.kelaikan,
                            "kepemilikan": $scope.formData.kepemilikan,
                            "updateAt": createAt,
                            "diEditOleh": $scope.namaGuru,
                            "idPengedit": $scope.idGuru,
                            "idSekolah": $scope.idSekolahGuru,
                            "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                            "idKecamatan": $scope.idKecamatanGuru,
                            "jenjang": $scope.jenjangGuru,
                            "namaKecamatan": $scope.namaKecamatanGuru,
                            "namaSekolah": $scope.namaSekolahGuru
                        }))).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide();
                        })

                    }
                    else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Semua Data Harus Diisi, terima kasih',

                        });
                    }
                };

            });

        };

        $scope.hapusData = function (data) {
            // console.log(data.$id)
            if (data.idPembuat === $scope.idGuru) {

                var refObj = firebase.database().ref("sarana/" + data.$id);
                var objDelete = $firebaseObject(refObj);
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Hapus Data',
                    template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                    okType: "button-positive",
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        objDelete.$remove().then(function (ref) {
                            //console.log('Data Berhasil Dihapus');
                        });
                    }
                    else {
                        //console.log('Tidak Jadi Menghapus');
                    }
                });

            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: "Anda Tidak Diperkenankan Menghapus Data Ini, Terimakasih",
                    okType: "button-positive"
                });
            }
        }

    }])

    .controller('dataRombelGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.namaSekolahGuru = localStorage.getItem('namaSekolahGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.namaKecamatanGuru = localStorage.getItem('namaKecamatanGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "idKotaKabupaten": $stateParams.idKotaKabupaten,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang
        }

        var ref = firebase.database().ref("dataKelas").orderByChild("idSekolah").equalTo($scope.idSekolahGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataKelas = response;
        })

        var refNamaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanGuru);
        refNamaKecamatan.on("child_added", function (snapshot) {
            $scope.namaKecamatan = snapshot.val().nama_kecamatan;
        })

        var refTahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        var listRefTahunAjaran = $firebaseArray(refTahunAjaran);
        $ionicLoading.show();
        listRefTahunAjaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.tahunAjaran = response;
        });

        var refDataPrasarana = firebase.database().ref("dataPrasarana").orderByChild("idSekolah").equalTo($scope.idSekolahGuru);
        var listRefDataPrasarana = $firebaseArray(refDataPrasarana);
        $ionicLoading.show();
        listRefDataPrasarana.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPrasarana = response;
        })

        if ($scope.jenjangGuru === 'SD') {
            $scope.tingkatKelas = [1, 2, 3, 4, 5, 6];
        }
        else if ($scope.jenjangGuru === 'SMP') {
            $scope.tingkatKelas = [7, 8, 9];
        }
        else if ($scope.jenjangGuru === 'SMA' || $scope.data.jenjang === 'SMK') {
            $scope.tingkatKelas = [10, 11, 12]
        }

        $scope.tambah = function () {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.formData = {
                    "jenisRombel": "",
                    "idTahunAjaran": "",
                    "tingkatKelas": "",
                    "namaKelas": "",
                    "idPrasarana": "",
                }

                $scope.getTahunAjaran = function () {
                    var id = $scope.formData.idTahunAjaran;
                    var tahunAjaran = firebase.database().ref("tahunAjaran/" + id);
                    tahunAjaran.on("value", function (snapshot) {
                        $scope.namaTahunAjaran = snapshot.val().tahunAjaran
                        console.log($scope.namaTahunAjaran)
                    })
                }

                $scope.getPrasarana = function () {
                    var id = $scope.formData.idPrasarana;
                    var prasarana = firebase.database().ref("dataPrasarana/" + id);
                    prasarana.on("value", function (snapshot) {
                        $scope.namaPrasarana = snapshot.val().namaPrasarana
                        // console.log($scope.namaPrasarana)
                    })
                }

                $scope.simpan = function () {
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                    if ($scope.formData.idTahunAjaran !== "" && $scope.formData.tingkatKelas !== "" && $scope.formData.namaKelas !== "" ) {

                        //cek
                        var refCek = firebase.database().ref("dataKelas").orderByChild("filter_input").equalTo($scope.data.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas);
                        var listRefCek = $firebaseArray(refCek);
                        listRefCek.$loaded().then(function (response) {
                            if (response.length === 0) {
                                $ionicLoading.show();
                                var insertData = firebase.database().ref("dataKelas");
                                if($scope.formData.idPrasarana!==""){
                                    insertData.push({
                                        "jenisRombel": $scope.formData.jenisRombel,
                                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                                        "tahunAjaran": $scope.namaTahunAjaran,
                                        "tingkatKelas": $scope.formData.tingkatKelas,
                                        "namaKelas": $scope.formData.namaKelas,
                                        "idPrasarana": $scope.formData.idPrasarana,
                                        "namaPrasarana": $scope.namaPrasarana,
                                        "createAt": createAt,
                                        "diBuatOleh": $scope.namaGuru,
                                        "idPembuat": $scope.idGuru,
                                        "idSekolah": $scope.idSekolahGuru,
                                        "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                                        "idKecamatan": $scope.idKecamatanGuru,
                                        "namaKecamatan": $scope.namaKecamatan,
                                        "jenjang": $scope.jenjangGuru,
                                        "namaSekolah": $scope.namaSekolahGuru,
                                        "filter_input": $scope.idSekolahGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas,
                                        "filter": $scope.idSekolahGuru + "_" + $scope.formData.idTahunAjaran,
                                        "filterJenisRombel": $scope.data.idSekolah + "_" + $scope.formData.idTahunAjaran+"_"+$scope.formData.jenisRombel
                                    }).then(function (resp) {
                                        $ionicLoading.hide();
                                        $scope.modal.hide();
                                    })
                                }
                                else{
                                    insertData.push({
                                        "jenisRombel": $scope.formData.jenisRombel,
                                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                                        "tahunAjaran": $scope.namaTahunAjaran,
                                        "tingkatKelas": $scope.formData.tingkatKelas,
                                        "namaKelas": $scope.formData.namaKelas,
                                        
                                        "createAt": createAt,
                                        "diBuatOleh": $scope.namaGuru,
                                        "idPembuat": $scope.idGuru,
                                        "idSekolah": $scope.idSekolahGuru,
                                        "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                                        "idKecamatan": $scope.idKecamatanGuru,
                                        "namaKecamatan": $scope.namaKecamatan,
                                        "jenjang": $scope.jenjangGuru,
                                        "namaSekolah": $scope.namaSekolahGuru,
                                        "filter_input": $scope.idSekolahGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas,
                                        "filter": $scope.idSekolahGuru + "_" + $scope.formData.idTahunAjaran,
                                        "filterJenisRombel": $scope.data.idSekolah + "_" + $scope.formData.idTahunAjaran+"_"+$scope.formData.jenisRombel
                                    }).then(function (resp) {
                                        $ionicLoading.hide();
                                        $scope.modal.hide();
                                    })
                                }
                                
                            }
                            else if (response.length === 1) {
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: 'Perhatian',
                                    template: 'Maaf, Data Kelas Yang Anda Masukkan Sudah Tersedia Di Tahun Ajaran Terpilih, Silahkan Cek Kembali, Terimakasih',

                                });
                            }
                        })

                    }
                    else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Semua Data Harus Diisi, terima kasih',

                        });
                    }
                };

            });

        };

        $scope.editData = function (data) {
            if (data.idPembuat === $scope.idGuru) {
                $ionicModal.fromTemplateUrl('templates/modal.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();

                    var ref = firebase.database().ref("dataKelas/" + data.$id);
                    $scope.formData = $firebaseObject(ref);

                    var refTahunAjaran = firebase.database().ref("tahunAjaran");
                    var listRefTahunAjaran = $firebaseArray(refTahunAjaran);
                    $ionicLoading.show();
                    listRefTahunAjaran.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.tahunAjaran = response;
                    });

                    $scope.getTahunAjaran = function () {
                        var id = $scope.formData.idTahunAjaran;
                        var tahunAjaran = firebase.database().ref("tahunAjaran/" + id);
                        tahunAjaran.on("value", function (snapshot) {
                            $scope.namaTahunAjaran = snapshot.val().tahunAjaran
                            // console.log($scope.namaTahunAjaran)
                        })
                    }

                    $scope.getPrasarana = function () {
                        var id = $scope.formData.idPrasarana;
                        var prasarana = firebase.database().ref("dataPrasarana/" + id);
                        prasarana.on("value", function (snapshot) {
                            $scope.namaPrasarana = snapshot.val().namaPrasarana
                            // console.log($scope.namaPrasarana)
                        })
                    }

                    $scope.simpan = function () {
                        var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                        if ($scope.formData.idTahunAjaran !== "" && $scope.formData.tingkatKelas !== "" && $scope.formData.namaKelas !== "" && $scope.formData.idPrasarana !== "") {

                            $ionicLoading.show();
                            ref.update(JSON.parse(JSON.stringify({
                                "idTahunAjaran": $scope.formData.idTahunAjaran,
                                "tahunAjaran": $scope.namaTahunAjaran,
                                "tingkatKelas": $scope.formData.tingkatKelas,
                                "namaKelas": $scope.formData.namaKelas,
                                "idPrasarana": $scope.formData.idPrasarana,
                                "namaPrasarana": $scope.namaPrasarana,
                                "updateAt": createAt,
                                "diEditOleh": $scope.namaGuru,
                                "idPengedit": $scope.idGuru,
                                "idSekolah": $scope.idSekolahGuru,
                                "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                                "idKecamatan": $scope.idKecamatanGuru,
                                "namaKecamatan": $scope.namaKecamatan,
                                "jenjang": $scope.jenjangGuru,
                                "namaSekolah": $scope.namaSekolahGuru,
                                "filter_input": $scope.idSekolahGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas,
                                "filter": $scope.idSekolahGuru + "_" + $scope.formData.idTahunAjaran
                            }))).then(function (resp) {
                                $ionicLoading.hide();
                                $scope.modal.hide();
                            })

                        }
                        else {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'Perhatian',
                                template: 'Maaf, Semua Data Harus Diisi, terima kasih',

                            });
                        }
                    };

                });
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Anda tidak diperkenankan mengedit data kelas ini, karena bukan Anda yang membuatnya. Terimakasih',

                });
            }


        };

        $scope.hapusData = function (data) {
            if (data.idPembuat === $scope.idGuru) {
                //Cek Data Kelas
                var cek = firebase.database().ref("dataSiswa").orderByChild("idKelas").equalTo(data.$id);
                var listCek = $firebaseArray(cek);
                listCek.$loaded().then(function (response) {
                    if (response.length === 0) {
                        var refObj = firebase.database().ref("dataKelas/" + data.$id);
                        var objDelete = $firebaseObject(refObj);
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Hapus Data',
                            template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                            okType: "button-positive",
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                objDelete.$remove().then(function (ref) {
                                    //console.log('Data Berhasil Dihapus');
                                });
                            }
                            else {
                                //console.log('Tidak Jadi Menghapus');
                            }
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Data kelas ini tidak bisa dihapus karena sudah terisi data siswa. Terimakasih',

                        });
                    }
                })
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Anda tidak diperkenankan menghapus data kelas ini. Terimakasih',

                });
            }

        }

        $scope.tambahSiswa = function (data) {
            // console.log(data)
            $state.go("menuGuru.lintasMinatGuru", {
                "idKelas": data.$id,
                "tingkatKelas": data.tingkatKelas,
                "jenisRombel": data.jenisRombel,
                "namaKelas": data.namaKelas
            })
        }

    }])

    .controller('lintasMinatGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.namaSekolahGuru = localStorage.getItem('namaSekolahGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.namaKecamatanGuru = localStorage.getItem('namaKecamatanGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.dataDari = {
            "idKelas": $stateParams.idKelas,
            "tingkatKelas": $stateParams.tingkatKelas,
            "jenisRombel": $stateParams.jenisRombel,
            "namaKelas": $stateParams.namaKelas
        }

        $scope.formData = {
            "idKelas": '',
        }

        $scope.dataKelas = [];
        var tahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        tahunAjaran.on("child_added", function (snapshot) {
            var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.idSekolah + "_" + snapshot.key);
            listRefKelas = $firebaseArray(refKelas);
            $ionicLoading.show();
            listRefKelas.$loaded().then(function (response) {
                $ionicLoading.hide();
                for (i = 0; i < response.length; i++) {
                    if (response[i].tingkatKelas === $scope.dataDari.tingkatKelas && (response[i].jenisRombel === 'Regular' || response[i].jenisRombel === undefined)) {
                        $scope.dataKelas.push({
                            "$id": response[i].$id,
                            "namaKelas": response[i].namaKelas
                        })
                    }
                }
                console.log($scope.dataKelas)
            })
        });

        $scope.getIdKelas = function () {
            var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.formData.idKelas);
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSiswa = response;
                // $scope.totalSiswa = response.length;
            });
        }

        $scope.dataSiswa = [];
        var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idSekolah").equalTo($scope.idSekolahGuru);
        listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            // $scope.dataSiswa = response;
            for (i = 0; i < response.length; i++) {
                if (response[i].tingkatKelas === $scope.dataDari.tingkatKelas) {
                    $scope.dataSiswa.push({
                        '$id': response[i].$id,
                        "namaPengguna": response[i].namaPengguna,
                        "namaKelas": response[i].namaKelas,
                        "namaSekolah": response[i].namaSekolah,
                        "tahunAjaran": response[i].tahunAjaran,
                        "idTahunAjaran": response[i].idTahunAjaran,
                        "namaKotaKabupaten": response[i].namaKotaKabupaten,
                        "namaProvinsi": response[i].namaProvinsi,
                        "tanggalDisplay": response[i].tanggalDisplay,
                        "jamDisplay": response[i].jamDisplay
                    })
                }

            }
        })

        $scope.getData = function (data) {
            // console.log(data);
            $ionicActionSheet.show({
                titleText: 'Siswa : ' + data.namaPengguna,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Jadikan Sebagai Siswa' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        //Cek Data Dulu Di Kelas Lintas Minat
                        var cekData = firebase.database(appSiswa).ref("lintasMinat").orderByChild("filterIdSiswaIdKelasLintasMinat").equalTo(data.$id + "_" + $scope.dataDari.idKelas);
                        var listCekData = $firebaseArray(cekData);
                        $ionicLoading.show();
                        listCekData.$loaded().then(function (response) {
                            $ionicLoading.hide();
                            if (response.length === 0) {
                                var insertData = firebase.database(appSiswa).ref("lintasMinat").push({
                                    'idSiswa': data.$id,
                                    "namaPengguna": data.namaPengguna,
                                    "namaKelasRegular": data.namaKelas,
                                    "namaSekolah": data.namaSekolah,
                                    "idTahunAjaran": data.idTahunAjaran,
                                    "tahunAjaran": data.tahunAjaran,

                                    "idKelas": $stateParams.idKelas,
                                    "tingkatKelas": $stateParams.tingkatKelas,
                                    "jenisRombel": $stateParams.jenisRombel,
                                    "namaKelas": $stateParams.namaKelas,

                                    "namaKotaKabupaten": data.namaKotaKabupaten,
                                    "namaProvinsi": data.namaProvinsi,
                                    "tanggalDisplay": data.tanggalDisplay,
                                    "jamDisplay": data.jamDisplay,

                                    "filterIdSiswaIdKelasLintasMinat": data.$id + "_" + $scope.dataDari.idKelas
                                }).then(function (resp) {
                                    $ionicPopup.alert({
                                        title: 'SUKSES',
                                        template: 'Data Berhasil Ditambahkan',
                                        okType: 'button-positive'
                                    });
                                    var kelasLintasMinat = firebase.database(appSiswa).ref("lintasMinat").orderByChild("idKelas").equalTo($scope.dataDari.idKelas);
                                    var listKelasLintasMinat = $firebaseArray(kelasLintasMinat);
                                    listKelasLintasMinat.$loaded().then(function (response) {
                                        $scope.totalSiswa = response.length
                                    })
                                })
                            }
                            else {
                                $ionicPopup.alert({
                                    title: 'Perhatian',
                                    template: 'Maaf, Siswa Ini Telah Ditambahkan Di Kelas ' + $scope.dataDari.namaKelas + " Silahkan Cek Kembali, Terimakasih",
                                    okType: 'button-positive'
                                });
                            }
                        })
                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    // $ionicPopup.alert({
                    //     title: 'Perhatian',
                    //     template: 'Maaf, Anda tidak diperkenankan menghapus data ini. Terimakasih',
                    // });
                    var refObj = firebase.database(appGuru).ref("dataGuru/" + data.$id);
                    var objDelete = $firebaseObject(refObj);
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                        okType: "button-positive",
                    });
                    confirmPopup.then(function (res) {
                        if (res) {
                            objDelete.$remove().then(function (ref) {
                                //console.log('Data Berhasil Dihapus');
                            });
                        }
                        else {
                            //console.log('Tidak Jadi Menghapus');
                        }
                    });

                    return true;
                }

            });
        }

        var kelasLintasMinat = firebase.database(appSiswa).ref("lintasMinat").orderByChild("idKelas").equalTo($scope.dataDari.idKelas);
        var listKelasLintasMinat = $firebaseArray(kelasLintasMinat);
        listKelasLintasMinat.$loaded().then(function (response) {
            $scope.totalSiswa = response.length
        });

        $scope.lihatData = function () {
            $state.go("menuGuru.lintasMinatDetailGuru", {
                "idKelas": $stateParams.idKelas,
                "tingkatKelas": $stateParams.tingkatKelas,
                "jenisRombel": $stateParams.jenisRombel,
                "namaKelas": $stateParams.namaKelas
            })
        }

    }])

    .controller('lintasMinatDetailGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.namaSekolahGuru = localStorage.getItem('namaSekolahGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.namaKecamatanGuru = localStorage.getItem('namaKecamatanGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }
        
        $scope.dataDari = {
            "idKelas": $stateParams.idKelas,
            "tingkatKelas": $stateParams.tingkatKelas,
            "jenisRombel": $stateParams.jenisRombel,
            "namaKelas": $stateParams.namaKelas
        }

        var ref = firebase.database(appSiswa).ref("lintasMinat").orderByChild("idKelas").equalTo($scope.dataDari.idKelas);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (respone) {
            $ionicLoading.hide();
            $scope.dataLintasMinat = respone;
        });

        $scope.getData = function (data) {
            // console.log(data);
            $ionicActionSheet.show({
                titleText: 'Siswa : ' + data.namaPengguna,
                buttons: [
                    // { text: '<i class="icon ion-checkmark-circled"></i> Jadikan Sebagai Siswa' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Keluarkan Dari Kelas',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {

                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    // $ionicPopup.alert({
                    //     title: 'Perhatian',
                    //     template: 'Maaf, Anda tidak diperkenankan menghapus data ini. Terimakasih',
                    // });
                    var refObj = firebase.database(appSiswa).ref("lintasMinat/" + data.$id);
                    var objDelete = $firebaseObject(refObj);
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Mengeluarkan ' + data.namaPengguna + ' Dari Kelas ' + $scope.dataDari.namaKelas + ' ?',
                        okType: "button-positive",
                    });
                    confirmPopup.then(function (res) {
                        if (res) {
                            objDelete.$remove().then(function (ref) {
                                //console.log('Data Berhasil Dihapus');
                            });
                        }
                        else {
                            //console.log('Tidak Jadi Menghapus');
                        }
                    });

                    return true;
                }

            });
        }

    }])

    .controller('dataGuruGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.namaSekolahGuru = localStorage.getItem('namaSekolahGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.namaKecamatanGuru = localStorage.getItem('namaKecamatanGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }
        $scope.data = {
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "idKotaKabupaten": $stateParams.idKotaKabupaten,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang
        }

        $scope.tambahData = function () {
            $state.go('menuGuru.dataGuruTambahGuru', {
                "idSekolah": $stateParams.idSekolah,
                "namaSekolah": $stateParams.namaSekolah,
                "idKotaKabupaten": $stateParams.idKotaKabupaten,
                "idKecamatan": $stateParams.idKecamatan,
                "jenjang": $stateParams.jenjang
            })
        }

        var ref = firebase.database(appGuru).ref("dataGuru").orderByChild("idSekolah").equalTo($scope.idSekolahGuru);
        listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataGuru = response;
            // console.log(response);
        })

        $scope.getData = function (data) {
            // console.log(data);
            $ionicActionSheet.show({
                titleText: 'Guru : ' + data.namaPengguna,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Data' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        if (data.$id === $scope.idGuru) {
                            $state.go('menuGuru.dataGuruEditGuru', {
                                "idGuru": data.$id,
                                "namaPengguna": data.namaPengguna,
                                "idSekolah": $stateParams.idSekolah,
                                "namaSekolah": $stateParams.namaSekolah,
                                "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                "idKecamatan": $stateParams.idKecamatan,
                                "jenjang": $stateParams.jenjang
                            });
                        }
                        else {
                            $ionicPopup.alert({
                                title: 'Perhatian',
                                template: 'Maaf, Anda tidak diperkenankan mengedit data ini. Terimakasih',

                            });
                        }
                    }
                    return true;
                },

                destructiveButtonClicked: function () {

                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Maaf, Anda tidak diperkenankan menghapus data ini. Terimakasih',

                    });

                    // var refObj = firebase.database().ref("dataGuru/" + data.$id);
                    // var objDelete = $firebaseObject(refObj);
                    // var confirmPopup = $ionicPopup.confirm({
                    //     title: 'Hapus Data',
                    //     template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                    //     okType: "button-positive",
                    // });
                    // confirmPopup.then(function (res) {
                    //     if (res) {
                    //         objDelete.$remove().then(function (ref) {
                    //             //console.log('Data Berhasil Dihapus');
                    //         });
                    //     }
                    //     else {
                    //         //console.log('Tidak Jadi Menghapus');
                    //     }
                    // });

                    return true;
                }

            });
        }

    }])

    .controller('dataGuruTambahGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "idKotaKabupaten": $stateParams.idKotaKabupaten,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang
        }

        $scope.formData = {
            "idProvinsi": '',
            "idKotaKabupaten": '',
            "idKecamatan": '',
            "jenjang": '',
            "idSekolah": '',
            "namaPengguna": '',
            "noHandphone": '',
            "jenisKelamin": '',
            "alamat": '',
            "email": '',
            "password": '',
            "ketikUlangPassword": '',
            "time": new Date(),
            "ijinPenggunaanAplikasi": true
        };

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi");
        var listProvinsi = $firebaseArray(refProvinsi);

        listProvinsi.$loaded().then(function (response) {
            $scope.dataProvinsi = response;
        });

        $scope.getIdProvinsi = function () {
            var idProvinsi = $scope.formData.idProvinsi;

            //Get Nama Provinsi
            var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
            var listNamaProvinsi = $firebaseArray(namaProvinsi);
            listNamaProvinsi.$loaded().then(function (response) {
                $scope.namaProvinsi = response[0].nama_provinsi;
                //console.log($scope.namaProvinsi);
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo(idProvinsi);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
        };

        $scope.getIdKotaKabupaten = function () {
            var idKotaKabupaten = $scope.formData.idKotaKabupaten;

            //Get Nama Kota Kabupaten
            var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
            listNamaKotaKabupaten.$loaded().then(function (response) {
                $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
                console.log($scope.namaKotaKabupaten);
            });

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);
            //console.log($scope.dataKecamatan);
        };

        $scope.getIdKecamatan = function () {
            var idKecamatan = $scope.formData.idKecamatan;
            $scope.idKecamatan = $scope.formData.idKecamatan;

            //Get Nama Kecamatan
            var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo(idKecamatan);
            var listNamaKecamatan = $firebaseArray(namaKecamatan);
            listNamaKecamatan.$loaded().then(function (response) {
                $scope.namaKecamatan = response[0].nama_kecamatan;
                //console.log($scope.namaKecamatan);
            });

            $ionicLoading.show()
            var refKecamatan = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo(idKecamatan);
            var listKecamatan = $firebaseArray(refKecamatan);

            listKecamatan.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;
                for (i = 0; i < response.length; i++) {
                    var updateData = firebase.database().ref("dataSekolahIndonesia/" + response[i].$id);
                    updateData.update({
                        "filter": response[i].id_kecamatan + "_" + response[i].jenjang
                    }).then(function (resp) {
                        $ionicLoading.hide();
                    })
                }

            })
        }

        $scope.getJenjang = function () {
            var jenjang = $scope.formData.jenjang;

            var refJenjang = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.idKecamatan + "_" + jenjang);
            var listJenjang = $firebaseArray(refJenjang);

            $ionicLoading.show();
            listJenjang.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;

            })
        };

        $scope.getIdSekolah = function () {
            var idSekolah = $scope.formData.idSekolah;

            var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
            refDataSekolah.on("value", function (snapshot) {
                $scope.namaSekolah = snapshot.val().nama_sekolah;
            })
        };

        $scope.daftar = function () {
            //console.log($scope.formData);

            var tanggal = $filter('date')($scope.formData.time, 'yyyy-MM-dd HH:mm:ss Z');
            var tanggalDisplay = $filter('date')($scope.formData.time, 'dd-MM-yyyy');
            var jamDisplay = $filter('date')($scope.formData.time, 'HH:mm:ss');

            if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.kelas !== '' && $scope.formData.namaKelas !== '' && $scope.formData.namaPengguna !== '' && $scope.formData.noHandphone !== '' && $scope.formData.jenisKelamin !== '' && $scope.formData.alamat !== '' && $scope.formData.email !== '' && $scope.formData.password !== '' && $scope.formData.ketikUlangPassword !== '') {

                if ($scope.formData.password === $scope.formData.ketikUlangPassword) {
                    $ionicLoading.show();

                    var auth = $firebaseAuth();
                    auth.$createUserWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                        .then(function (response) {

                            var user = firebase.auth().currentUser;

                            //Entry Data Pengguna
                            var refAddPengguna = firebase.database(appGuru).ref("dataGuru");
                            refAddPengguna.push({
                                "idProvinsi": $scope.formData.idProvinsi,
                                "namaProvinsi": $scope.namaProvinsi,
                                "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                                "namaKotaKabupaten": $scope.namaKotaKabupaten,
                                "idKecamatan": $scope.formData.idKecamatan,
                                "namaKecamatan": $scope.namaKecamatan,
                                "jenjang": $scope.formData.jenjang,
                                "idSekolah": $scope.formData.idSekolah,
                                "namaSekolah": $scope.namaSekolah,
                                "alamat": $scope.formData.alamat,
                                "jenisKelamin": $scope.formData.jenisKelamin,

                                "namaPengguna": $scope.formData.namaPengguna,
                                "noHandphone": $scope.formData.noHandphone,
                                "email": $scope.formData.email,
                                "password": $scope.formData.password,
                                "retypePassword": $scope.formData.ketikUlangPassword,
                                "uid": user.uid,
                                "tanggal": tanggal,
                                "tanggalDisplay": tanggalDisplay,
                                "jamDisplay": jamDisplay,
                                "filterRegistrasiKota": $scope.formData.jenjang + "_" + $scope.formData.idKotaKabupaten,
                                "filterRegistrasiProvinsi": $scope.formData.jenjang + "_" + $scope.formData.idProvinsi,
                                "ijinPenggunaanAplikasi": $scope.formData.ijinPenggunaanAplikasi,
                                "createAt": tanggal,
                                "diBuatOleh": $scope.namaGuru,
                                "idPembuat": $scope.idGuru,

                            })
                                .then(function (resp) {
                                    $ionicLoading.hide();
                                    $state.go("menuGuru.dataGuruGuru", {
                                        "idSekolah": $stateParams.idSekolah,
                                        "namaSekolah": $stateParams.namaSekolah,
                                        "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                        "idKecamatan": $stateParams.idKecamatan,
                                        "jenjang": $stateParams.jenjang
                                    });

                                });

                        })
                        .catch(function (error) {
                            $ionicLoading.hide();
                            //console.log(error);
                            $ionicPopup.alert({
                                title: 'Information',
                                template: error.message,
                                okType: 'button-positive'
                            });
                        });

                }
                else {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Password yang Anda ketikkan tidak sama, harap cek kembali, terima kasih',
                        okType: 'button-positive'
                    });
                }

            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Seluruh Data Harus Diisi, Terima Kasih',
                    okType: 'button-positive'
                });
            }
        };

    }])

    .controller('dataGuruEditGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idGuru": $stateParams.idGuru,
            "namaPengguna": $stateParams.namaPengguna,
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "idKotaKabupaten": $stateParams.idKotaKabupaten,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang
        }

        var obj = firebase.database(appGuru).ref("dataGuru/" + $scope.data.idGuru);
        var listObj = $firebaseObject(obj);

        listObj.$loaded().then(function (response) {
            $scope.formData = response;
            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo($scope.formData.idProvinsi);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
            // console.log($scope.dataKotaKabupaten);

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo($scope.formData.idKotaKabupaten);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);

            var refSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo($scope.formData.idKecamatan);
            $scope.dataSekolah = $firebaseArray(refSekolah);
        });

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi");
        var listProvinsi = $firebaseArray(refProvinsi);

        listProvinsi.$loaded().then(function (response) {
            $scope.dataProvinsi = response;
        });

        $scope.getIdProvinsi = function () {
            var idProvinsi = $scope.formData.idProvinsi;

            //Get Nama Provinsi
            var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
            var listNamaProvinsi = $firebaseArray(namaProvinsi);
            listNamaProvinsi.$loaded().then(function (response) {
                $scope.namaProvinsi = response[0].nama_provinsi;
                //console.log($scope.namaProvinsi);
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo(idProvinsi);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
        };

        $scope.getIdKotaKabupaten = function () {
            var idKotaKabupaten = $scope.formData.idKotaKabupaten;

            //Get Nama Kota Kabupaten
            var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
            listNamaKotaKabupaten.$loaded().then(function (response) {
                $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
                //console.log($scope.namaKotaKabupaten);
            });

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);
            //console.log($scope.dataKecamatan);
        };

        $scope.getIdKecamatan = function () {
            var idKecamatan = $scope.formData.idKecamatan;
            $scope.idKecamatan = $scope.formData.idKecamatan;

            //Get Nama Kecamatan
            var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo(idKecamatan);
            var listNamaKecamatan = $firebaseArray(namaKecamatan);
            listNamaKecamatan.$loaded().then(function (response) {
                $scope.namaKecamatan = response[0].nama_kecamatan;
                //console.log($scope.namaKecamatan);
            });

            $ionicLoading.show()
            var refKecamatan = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo(idKecamatan);
            var listKecamatan = $firebaseArray(refKecamatan);

            listKecamatan.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;
                for (i = 0; i < response.length; i++) {
                    var updateData = firebase.database().ref("dataSekolahIndonesia/" + response[i].$id);
                    updateData.update({
                        "filter": response[i].id_kecamatan + "_" + response[i].jenjang
                    }).then(function (resp) {
                        $ionicLoading.hide();
                    })
                }

            })
        }

        $scope.getJenjang = function () {
            var jenjang = $scope.formData.jenjang;

            var refJenjang = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.idKecamatan + "_" + jenjang);
            var listJenjang = $firebaseArray(refJenjang);

            $ionicLoading.show();
            listJenjang.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;

            })
        };

        $scope.getIdSekolah = function () {
            var idSekolah = $scope.formData.idSekolah;

            var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
            refDataSekolah.on("value", function (snapshot) {
                $scope.namaSekolah = snapshot.val().nama_sekolah;
            })
        };

        $scope.daftar = function () {
            //console.log($scope.formData);
            var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
            if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.namaPengguna !== '' && $scope.formData.noHandphone !== '' && $scope.formData.jenisKelamin !== '' && $scope.formData.alamat !== '') {
                $ionicLoading.show();

                //Entry Data Pengguna
                var updatePengguna = firebase.database(appGuru).ref("dataGuru/" + $scope.data.idGuru);
                updatePengguna.update(JSON.parse(JSON.stringify({
                    "idProvinsi": $scope.formData.idProvinsi,
                    "namaProvinsi": $scope.namaProvinsi,
                    "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                    "namaKotaKabupaten": $scope.namaKotaKabupaten,
                    "idKecamatan": $scope.formData.idKecamatan,
                    "namaKecamatan": $scope.namaKecamatan,
                    "jenjang": $scope.formData.jenjang,
                    "idSekolah": $scope.formData.idSekolah,
                    "namaSekolah": $scope.namaSekolah,
                    "alamat": $scope.formData.alamat,
                    "jenisKelamin": $scope.formData.jenisKelamin,

                    "namaPengguna": $scope.formData.namaPengguna,
                    "noHandphone": $scope.formData.noHandphone,
                    "ijinPenggunaanAplikasi": $scope.formData.ijinPenggunaanAplikasi,
                    "updateAt": createAt,
                    "diEditOleh": $scope.namaGuru,
                    "idPengedit": $scope.idGuru,
                }))).then(function (resp) {
                    $ionicLoading.hide();
                    $state.go("menuGuru.dataGuruGuru", {
                        "idSekolah": $stateParams.idSekolah,
                        "namaSekolah": $stateParams.namaSekolah,
                        "idKotaKabupaten": $stateParams.idKotaKabupaten,
                        "idKecamatan": $stateParams.idKecamatan,
                        "jenjang": $stateParams.jenjang
                    });
                });

            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Seluruh Data Harus Diisi, Terima Kasih',
                    okType: 'button-positive'
                });
            }
        };

    }])

    .controller('dataSiswaGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.namaSekolahGuru = localStorage.getItem('namaSekolahGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.namaKecamatanGuru = localStorage.getItem('namaKecamatanGuru');


        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "idKotaKabupaten": $stateParams.idKotaKabupaten,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang
        }

        $scope.tambah = function () {
            $state.go("menuGuru.dataSiswaTambahGuru", {
                "idSekolah": $stateParams.idSekolah,
                "namaSekolah": $stateParams.namaSekolah,
                "idKotaKabupaten": $stateParams.idKotaKabupaten,
                "idKecamatan": $stateParams.idKecamatan,
                "jenjang": $stateParams.jenjang
            })
        }

        $scope.formData = {
            "idKelas": '',
        }

        var tahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        tahunAjaran.on("child_added", function (snapshot) {
            var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.idSekolahGuru + "_" + snapshot.key);
            listRefKelas = $firebaseArray(refKelas);
            $ionicLoading.show();
            listRefKelas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKelas = response;
            })
        });

        $scope.getIdKelas = function () {
            var objKelas = firebase.database().ref("dataKelas/"+$scope.formData.idKelas);
            objKelas.on("value", function(snapshot){
                if(snapshot.val().jenisRombel==='Lintas Minat'){
                    var ref = firebase.database(appSiswa).ref("lintasMinat").orderByChild("idKelas").equalTo($scope.formData.idKelas);
                    var listRef = $firebaseArray(ref);
        
                    $ionicLoading.show();
                    listRef.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.dataSiswa = response;
                        $scope.totalSiswa = response.length;
                    });
                }
                else{
                    var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.formData.idKelas);
                    var listRef = $firebaseArray(ref);
        
                    $ionicLoading.show();
                    listRef.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.dataSiswa = response;
                        $scope.totalSiswa = response.length;
                    });
                }
            })
            
        }

        var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idSekolah").equalTo($scope.idSekolahGuru);
        var listRef = $firebaseArray(ref);

        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSiswa = response;
            $scope.totalSiswa = response.length;
        });

        $scope.getData = function (data) {
            
            $ionicActionSheet.show({
                titleText: 'Siswa : ' + data.namaPengguna,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Lihat Data' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Data' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        if(data.jenisRombel==="Lintas Minat"){
                            $state.go('menuGuru.dataSiswaLihatGuru', {
                                "idSiswa": data.idSiswa,
                                "namaSiswa": data.namaPengguna,
                                "idSekolah": $stateParams.idSekolah,
                                "namaSekolah": $stateParams.namaSekolah,
                                "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                "idKecamatan": $stateParams.idKecamatan,
                                "jenjang": $stateParams.jenjang
                            });
                        }
                        else{
                            $state.go('menuGuru.dataSiswaLihatGuru', {
                                "idSiswa": data.$id,
                                "namaSiswa": data.namaPengguna,
                                "idSekolah": $stateParams.idSekolah,
                                "namaSekolah": $stateParams.namaSekolah,
                                "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                "idKecamatan": $stateParams.idKecamatan,
                                "jenjang": $stateParams.jenjang
                            });
                        }
                        
                    }
                    if (index === 1) {
                        if(data.jenisRombel==='Lintas Minat'){
                            $state.go('menuGuru.dataSiswaEditGuru', {
                                "idSiswa": data.idSiswa,
                                "namaSiswa": data.namaPengguna,
                                "idSekolah": $stateParams.idSekolah,
                                "namaSekolah": $stateParams.namaSekolah,
                                "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                "idKecamatan": $stateParams.idKecamatan,
                                "jenjang": $stateParams.jenjang
                            });
                        }
                        else{
                            $state.go('menuGuru.dataSiswaEditGuru', {
                                "idSiswa": data.$id,
                                "namaSiswa": data.namaPengguna,
                                "idSekolah": $stateParams.idSekolah,
                                "namaSekolah": $stateParams.namaSekolah,
                                "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                "idKecamatan": $stateParams.idKecamatan,
                                "jenjang": $stateParams.jenjang
                            });
                        }
                        
                        // if(data.idPembuat===$scope.idGuru){
                        //     $state.go('menuGuru.dataSiswaEditGuru', {
                        //         "idSiswa": data.$id,
                        //         "namaSiswa": data.namaPengguna,
                        //         "idSekolah": $stateParams.idSekolah,
                        //         "namaSekolah": $stateParams.namaSekolah,
                        //         "idKotaKabupaten": $stateParams.idKotaKabupaten,
                        //         "idKecamatan": $stateParams.idKecamatan,
                        //         "jenjang": $stateParams.jenjang
                        //     });
                        // }
                        // else{
                        //     $ionicPopup.alert({
                        //         title: 'Perhatian',
                        //         template: 'Maaf, Anda tidak diperkenankan mengedit data ini, Terima Kasih',
                        //         okType: 'button-positive'
                        //     });
                        // }
                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    if (data.idPembuat === $scope.idGuru) {
                        var refObj = firebase.database(appSiswa).ref("dataSiswa/" + data.$id);
                        var objDelete = $firebaseObject(refObj);
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Hapus Data',
                            template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                            okType: "button-positive",
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                objDelete.$remove().then(function (ref) {
                                    //console.log('Data Berhasil Dihapus');
                                });
                            }
                            else {
                                //console.log('Tidak Jadi Menghapus');
                            }
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Anda tidak diperkenankan menghapus data ini, Terima Kasih',
                            okType: 'button-positive'
                        });
                    }

                    return true;
                }

            });
        }

    }])

    .controller('dataSiswaTambahGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.namaSekolahGuru = localStorage.getItem('namaSekolahGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.namaKecamatanGuru = localStorage.getItem('namaKecamatanGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "idKotaKabupaten": $stateParams.idKotaKabupaten,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang
        }

        $scope.formData = {
            "idProvinsi": '',
            "idKotaKabupaten": '',
            "idKecamatan": '',
            "jenjang": '',
            "idSekolah": '',
            "tingkatKelas": '',
            "idKelas": '',
            "namaPengguna": '',
            "noHandphone": '',
            "jenisKelamin": '',
            "alamat": '',
            "email": '',
            "password": '',
            "ketikUlangPassword": '',
            "time": new Date(),

            "idTahunAjaran": ''
        };

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiGuru);
        var listProvinsi = $firebaseArray(refProvinsi);
        $ionicLoading.show();
        listProvinsi.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataProvinsi = response;
        });

        $scope.getIdProvinsi = function () {
            var idProvinsi = $scope.formData.idProvinsi;

            //Get Nama Provinsi
            var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
            var listNamaProvinsi = $firebaseArray(namaProvinsi);
            listNamaProvinsi.$loaded().then(function (response) {
                $scope.namaProvinsi = response[0].nama_provinsi;
                //console.log($scope.namaProvinsi);
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenGuru);
            var listRefKotaKabupaten = $firebaseArray(refKotaKabupaten);
            $ionicLoading.show();
            listRefKotaKabupaten.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKotaKabupaten = response;
            })

        };

        $scope.getIdKotaKabupaten = function () {
            var idKotaKabupaten = $scope.formData.idKotaKabupaten;

            //Get Nama Kota Kabupaten
            var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
            listNamaKotaKabupaten.$loaded().then(function (response) {
                $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
                // console.log($scope.namaKotaKabupaten);
            });

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanGuru);
            var listRefKecamatan = $firebaseArray(refKecamatan);
            $ionicLoading.show();
            listRefKecamatan.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKecamatan = response;
                //console.log($scope.dataKecamatan);
            })

        };

        $scope.getIdKecamatan = function () {
            var idKecamatan = $scope.formData.idKecamatan;
            $scope.idKecamatan = $scope.formData.idKecamatan;

            //Get Nama Kecamatan
            var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo(idKecamatan);
            var listNamaKecamatan = $firebaseArray(namaKecamatan);
            listNamaKecamatan.$loaded().then(function (response) {
                $scope.namaKecamatan = response[0].nama_kecamatan;
                //console.log($scope.namaKecamatan);
            });

            $ionicLoading.show()
            var refKecamatan = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo(idKecamatan);
            var listKecamatan = $firebaseArray(refKecamatan);

            listKecamatan.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;
                for (i = 0; i < response.length; i++) {
                    var updateData = firebase.database().ref("dataSekolahIndonesia/" + response[i].$id);
                    updateData.update({
                        "filter": response[i].id_kecamatan + "_" + response[i].jenjang
                    }).then(function (resp) {
                        $ionicLoading.hide();
                    })
                }

            })
        }

        $scope.getJenjang = function () {
            var jenjang = $scope.formData.jenjang;
            if (jenjang === "SD") {
                $scope.tingkatKelas = [1, 2, 3, 4, 5, 6];
            }
            else if (jenjang === "SMP") {
                $scope.tingkatKelas = [7, 8, 9];
            }
            else if (jenjang === "SMA" || jenjang === "SMK") {
                $scope.tingkatKelas = [10, 11, 12];
            }

            var refJenjang = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.idKecamatan + "_" + jenjang);
            var listJenjang = $firebaseArray(refJenjang);

            $ionicLoading.show();
            listJenjang.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;

            })
        };

        $scope.getIdSekolah = function () {
            // var idSekolah = $scope.formData.idSekolah;

            // var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
            // refDataSekolah.on("value", function (snapshot) {
            //     $scope.namaSekolah = snapshot.val().nama_sekolah;
            // })

            // var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
            // listRefKelas = $firebaseArray(refKelas);
            // $ionicLoading.show();
            // listRefKelas.$loaded().then(function (response) {
            //     $ionicLoading.hide();
            //     $scope.dataKelas = response;
            // })
            var idSekolah = $scope.formData.idSekolah;

            if (idSekolah === $scope.idSekolahGuru) {
                var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
                refDataSekolah.on("value", function (snapshot) {
                    $scope.namaSekolah = snapshot.val().nama_sekolah;
                })

                var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
                $scope.dataKelas = $firebaseArray(refKelas);
            }
            else {
                $scope.formData.idSekolah = "";
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Anda tidak diperkenankan memilih sekolah lain. Terimakasih',
                    okType: 'button-positive'
                });
            }
        };

        var tahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        $scope.tahunAjaran = $firebaseArray(tahunAjaran);

        $scope.getTahunAjaran = function () {
            id = $scope.formData.idTahunAjaran;
            var getDataTahunAjaran = firebase.database().ref("tahunAjaran/" + id);
            getDataTahunAjaran.on("value", function (snapshot) {
                $scope.dataTahunAjaran = snapshot.val().tahunAjaran
            })
            var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + id);
            listRefKelas = $firebaseArray(refKelas);
            $ionicLoading.show();
            listRefKelas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKelas = response;
            })
        }

        $scope.getKelas = function () {
            id = $scope.formData.idKelas;
            var getDataKelas = firebase.database().ref("dataKelas/" + id);
            getDataKelas.on("value", function (snapshot) {
                $scope.namaKelas = snapshot.val().namaKelas
            })
        }

        $scope.daftar = function () {
            // console.log($scope.formData);

            var tanggal = $filter('date')($scope.formData.time, 'yyyy-MM-dd HH:mm:ss Z');
            var tanggalDisplay = $filter('date')($scope.formData.time, 'dd-MM-yyyy');
            var jamDisplay = $filter('date')($scope.formData.time, 'HH:mm:ss');

            if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.tingkatKelas !== '' && $scope.formData.idKelas !== '' && $scope.formData.namaPengguna !== '' && $scope.formData.noHandphone !== '' && $scope.formData.jenisKelamin !== '' && $scope.formData.alamat !== '' && $scope.formData.email !== '' && $scope.formData.password !== '' && $scope.formData.ketikUlangPassword !== '' && $scope.formData.idTahunAjaran !== '') {

                if ($scope.formData.password === $scope.formData.ketikUlangPassword) {
                    $ionicLoading.show();

                    var auth = $firebaseAuth();
                    auth.$createUserWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                        .then(function (response) {

                            var user = firebase.auth().currentUser;

                            //Entry Data Pengguna
                            var refAddPengguna = firebase.database(appSiswa).ref("dataSiswa");
                            refAddPengguna.push({
                                "idProvinsi": $scope.formData.idProvinsi,
                                "namaProvinsi": $scope.namaProvinsi,
                                "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                                "namaKotaKabupaten": $scope.namaKotaKabupaten,
                                "idKecamatan": $scope.formData.idKecamatan,
                                "namaKecamatan": $scope.namaKecamatan,
                                "jenjang": $scope.formData.jenjang,
                                "idSekolah": $scope.formData.idSekolah,
                                "namaSekolah": $scope.namaSekolah,
                                "alamat": $scope.formData.alamat,
                                "jenisKelamin": $scope.formData.jenisKelamin,

                                "namaPengguna": $scope.formData.namaPengguna,
                                "noHandphone": $scope.formData.noHandphone,
                                "email": $scope.formData.email,
                                "password": $scope.formData.password,
                                "retypePassword": $scope.formData.ketikUlangPassword,
                                "uid": user.uid,
                                "tanggal": tanggal,
                                "tanggalDisplay": tanggalDisplay,
                                "jamDisplay": jamDisplay,
                                "filterRegistrasiKota": $scope.formData.jenjang + "_" + $scope.formData.idKotaKabupaten,
                                "filterRegistrasiProvinsi": $scope.formData.jenjang + "_" + $scope.formData.idProvinsi,

                                "createAt": tanggal,
                                "diBuatOleh": $scope.namaGuru,
                                "idPembuat": $scope.idGuru,

                                "idTahunAjaran": $scope.formData.idTahunAjaran,
                                "tahunAjaran": $scope.dataTahunAjaran,
                                "idKelas": $scope.formData.idKelas,
                                "namaKelas": $scope.namaKelas,
                                "tingkatKelas": $scope.formData.tingkatKelas
                            })
                                .then(function (resp) {
                                    console.log(resp.key)
                                    var getDataSiswa = firebase.database(appSiswa).ref("dataSiswa/" + resp.key + "/kelasSiswa");
                                    getDataSiswa.push({
                                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                                        "tahunAjaran": $scope.dataTahunAjaran,
                                        "idKelas": $scope.formData.idKelas,
                                        "namaKelas": $scope.namaKelas,
                                        "tingkatKelas": $scope.formData.tingkatKelas
                                    }).then(function (res) {
                                        $ionicLoading.hide();
                                        $state.go('menuGuru.dataSiswaGuru', {
                                            "idSekolah": $stateParams.idSekolah,
                                            "namaSekolah": $stateParams.namaSekolah,
                                            "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                            "idKecamatan": $stateParams.idKecamatan,
                                            "jenjang": $stateParams.jenjang
                                        });
                                        $ionicPopup.alert({
                                            title: 'SUKSES',
                                            template: "Data siswa berhasil dibuat",
                                            okType: 'button-positive'
                                        });
                                    })

                                });

                        })
                        .catch(function (error) {
                            $ionicLoading.hide();
                            //console.log(error);
                            $ionicPopup.alert({
                                title: 'Information',
                                template: error.message,
                                okType: 'button-positive'
                            });
                        });

                }
                else {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Password yang Anda ketikkan tidak sama, harap cek kembali, terima kasih',
                        okType: 'button-positive'
                    });
                }

            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Seluruh Data Harus Diisi, Terima Kasih',
                    okType: 'button-positive'
                });
            }
        };

    }])

    .controller('dataSiswaEditGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.namaSekolahGuru = localStorage.getItem('namaSekolahGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.namaKecamatanGuru = localStorage.getItem('namaKecamatanGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idSiswa": $stateParams.idSiswa,
            "namaSiswa": $stateParams.namaSiswa,
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "idKotaKabupaten": $stateParams.idKotaKabupaten,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang
        }

        var obj = firebase.database(appSiswa).ref("dataSiswa/" + $scope.data.idSiswa);
        $scope.formData = $firebaseObject(obj);
        console.log($scope.formData)

        obj.on("value", function (snapshot) {
            //console.log(snapshot.val());
            //Data Provinsi
            $scope.idTahunAjaran = snapshot.val().idTahunAjaran;
            var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiGuru);
            var listProvinsi = $firebaseArray(refProvinsi);

            listProvinsi.$loaded().then(function (response) {
                $scope.dataProvinsi = response;
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenGuru);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanGuru);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);

            var refSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.idKecamatanGuru + "_" + $scope.jenjangGuru);
            var listSekolah = $firebaseArray(refSekolah);

            listSekolah.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;

            });

            var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.idSekolahGuru + "_" + $scope.idTahunAjaran);
            listRefKelas = $firebaseArray(refKelas);
            $ionicLoading.show();
            listRefKelas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKelas = response;
            })

            var jenjang = snapshot.val().jenjang;
            if (jenjang === "SD") {
                $scope.tingkatKelas = [1, 2, 3, 4, 5, 6];
            }
            else if (jenjang === "SMP") {
                $scope.tingkatKelas = [7, 8, 9];
            }
            else if (jenjang === "SMA" || jenjang === "SMK") {
                $scope.tingkatKelas = [10, 11, 12];
            }

        })

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiGuru);
        var listProvinsi = $firebaseArray(refProvinsi);

        listProvinsi.$loaded().then(function (response) {
            $scope.dataProvinsi = response;
        });

        $scope.getIdProvinsi = function () {
            var idProvinsi = $scope.formData.idProvinsi;

            //Get Nama Provinsi
            var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
            var listNamaProvinsi = $firebaseArray(namaProvinsi);
            listNamaProvinsi.$loaded().then(function (response) {
                $scope.namaProvinsi = response[0].nama_provinsi;
                //console.log($scope.namaProvinsi);
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenGuru);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
        };

        $scope.getIdKotaKabupaten = function () {
            var idKotaKabupaten = $scope.formData.idKotaKabupaten;

            //Get Nama Kota Kabupaten
            var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
            listNamaKotaKabupaten.$loaded().then(function (response) {
                $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
                console.log($scope.namaKotaKabupaten);
            });

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanGuru);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);
            //console.log($scope.dataKecamatan);
        };

        $scope.getIdKecamatan = function () {
            var idKecamatan = $scope.formData.idKecamatan;
            $scope.idKecamatan = $scope.formData.idKecamatan;

            //Get Nama Kecamatan
            var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo(idKecamatan);
            var listNamaKecamatan = $firebaseArray(namaKecamatan);
            listNamaKecamatan.$loaded().then(function (response) {
                $scope.namaKecamatan = response[0].nama_kecamatan;
                //console.log($scope.namaKecamatan);
            });

            $ionicLoading.show()
            var refKecamatan = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo(idKecamatan);
            var listKecamatan = $firebaseArray(refKecamatan);

            listKecamatan.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;
                for (i = 0; i <= response.length; i++) {
                    var updateData = firebase.database().ref("dataSekolahIndonesia/" + response[i].$id);
                    updateData.update({
                        "filter": response[i].id_kecamatan + "_" + response[i].jenjang
                    }).then(function (resp) {
                        $ionicLoading.hide();
                    })
                }

            })
        }

        $scope.getJenjang = function () {
            var jenjang = $scope.formData.jenjang;
            if (jenjang === "SD") {
                $scope.tingkatKelas = [1, 2, 3, 4, 5, 6];
            }
            else if (jenjang === "SMP") {
                $scope.tingkatKelas = [7, 8, 9];
            }
            else if (jenjang === "SMA" || jenjang === "SMK") {
                $scope.tingkatKelas = [10, 11, 12];
            }

            var refJenjang = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.idKecamatanGuru + "_" + jenjang);
            var listJenjang = $firebaseArray(refJenjang);

            $ionicLoading.show();
            listJenjang.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;

            })
        };

        $scope.getIdSekolah = function () {
            // var idSekolah = $scope.formData.idSekolah;

            // var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
            // refDataSekolah.on("value", function (snapshot) {
            //     $scope.namaSekolah = snapshot.val().nama_sekolah;
            // })

            // var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.idSekolahGuru + "_" + $scope.idTahunAjaran);
            // listRefKelas = $firebaseArray(refKelas);
            // $ionicLoading.show();
            // listRefKelas.$loaded().then(function (response) {
            //     $ionicLoading.hide();
            //     $scope.dataKelas = response;
            // })
            var idSekolah = $scope.formData.idSekolah;

            if (idSekolah === $scope.idSekolahGuru) {
                var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
                refDataSekolah.on("value", function (snapshot) {
                    $scope.namaSekolah = snapshot.val().nama_sekolah;
                })

                var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.idSekolahGuru + "_" + $scope.idTahunAjaran);
                $scope.dataKelas = $firebaseArray(refKelas);
            }
            else {
                $scope.formData.idSekolah = "";
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Anda tidak diperkenankan memilih sekolah lain. Terimakasih',
                    okType: 'button-positive'
                });
            }
        };

        var tahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        $scope.tahunAjaran = $firebaseArray(tahunAjaran);

        $scope.getTahunAjaran = function () {
            id = $scope.formData.idTahunAjaran;
            var getDataTahunAjaran = firebase.database().ref("tahunAjaran/" + id);
            getDataTahunAjaran.on("value", function (snapshot) {
                $scope.dataTahunAjaran = snapshot.val().tahunAjaran
            })
            var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + id);
            listRefKelas = $firebaseArray(refKelas);
            $ionicLoading.show();
            listRefKelas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKelas = response;
            })
        }

        $scope.getKelas = function () {
            id = $scope.formData.idKelas;
            var getDataKelas = firebase.database().ref("dataKelas/" + id);
            getDataKelas.on("value", function (snapshot) {
                $scope.namaKelas = snapshot.val().namaKelas
            })
        }

        $scope.daftar = function () {
            //console.log($scope.formData);

            // var tanggal = $filter('date')($scope.formData.time, 'yyyy-MM-dd HH:mm:ss Z');
            // var tanggalDisplay = $filter('date')($scope.formData.time, 'dd-MM-yyyy');
            // var jamDisplay = $filter('date')($scope.formData.time, 'HH:mm:ss');

            if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.kelas !== '' && $scope.formData.namaKelas !== '' && $scope.formData.namaPengguna !== '' && $scope.formData.noHandphone !== '' && $scope.formData.jenisKelamin !== '' && $scope.formData.alamat !== '') {
                $ionicLoading.show();

                //Update Data Pengguna
                var refAddPengguna = firebase.database(appSiswa).ref("dataSiswa/" + $scope.data.idSiswa);
                refAddPengguna.update(JSON.parse(JSON.stringify({
                    "idProvinsi": $scope.formData.idProvinsi,
                    "namaProvinsi": $scope.namaProvinsi,
                    "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                    "namaKotaKabupaten": $scope.namaKotaKabupaten,
                    "idKecamatan": $scope.formData.idKecamatan,
                    "namaKecamatan": $scope.namaKecamatan,
                    "jenjang": $scope.formData.jenjang,
                    "idSekolah": $scope.formData.idSekolah,
                    "namaSekolah": $scope.namaSekolah,
                    "alamat": $scope.formData.alamat,
                    "jenisKelamin": $scope.formData.jenisKelamin,

                    "namaPengguna": $scope.formData.namaPengguna,
                    "noHandphone": $scope.formData.noHandphone,

                    "filterRegistrasiKota": $scope.formData.jenjang + "_" + $scope.formData.idKotaKabupaten,
                    "filterRegistrasiProvinsi": $scope.formData.jenjang + "_" + $scope.formData.idProvinsi,

                    "idTahunAjaran": $scope.formData.idTahunAjaran,
                    "tahunAjaran": $scope.dataTahunAjaran,
                    "idKelas": $scope.formData.idKelas,
                    "namaKelas": $scope.namaKelas,
                    "tingkatKelas": $scope.formData.tingkatKelas
                })))
                    .then(function (resp) {
                        $ionicLoading.hide();
                        var get = firebase.database(appSiswa).ref("dataSiswa/" + $scope.data.idSiswa + "/kelasSiswa").orderByChild('idTahunAjaran').equalTo($scope.formData.idTahunAjaran);
                        var listGet = $firebaseArray(get);
                        listGet.$loaded().then(function (response) {
                            console.log("jumlahData", response.length);
                            if (response.length === 0) {
                                var insertData = firebase.database(appSiswa).ref("dataSiswa/" + $scope.data.idSiswa + "/kelasSiswa/");
                                insertData.push(JSON.parse(JSON.stringify({
                                    "idTahunAjaran": $scope.formData.idTahunAjaran,
                                    "tahunAjaran": $scope.dataTahunAjaran,
                                    "idKelas": $scope.formData.idKelas,
                                    "namaKelas": $scope.namaKelas,
                                    "tingkatKelas": $scope.formData.tingkatKelas
                                }))).then(function (resp) {
                                    $ionicPopup.alert({
                                        title: 'Sukses',
                                        template: 'Data Siswa Berhasil Diperbaharui',
                                        okType: 'button-positive'
                                    });
                                    $state.go('menuGuru.dataSiswaGuru', {
                                        "idSekolah": $stateParams.idSekolah,
                                        "namaSekolah": $stateParams.namaSekolah,
                                        "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                        "idKecamatan": $stateParams.idKecamatan,
                                        "jenjang": $stateParams.jenjang
                                    });
                                    console.log("inserted");
                                })
                            }
                            else if (response.length === 1) {
                                var ubahData = firebase.database(appSiswa).ref("dataSiswa/" + $scope.data.idSiswa + "/kelasSiswa/" + response[0].$id);
                                ubahData.update(JSON.parse(JSON.stringify({
                                    "idTahunAjaran": $scope.formData.idTahunAjaran,
                                    "tahunAjaran": $scope.dataTahunAjaran,
                                    "idKelas": $scope.formData.idKelas,
                                    "namaKelas": $scope.namaKelas,
                                    "tingkatKelas": $scope.formData.tingkatKelas
                                }))).then(function (resp) {
                                    $ionicPopup.alert({
                                        title: 'Sukses',
                                        template: 'Data Siswa Berhasil Diperbaharui',
                                        okType: 'button-positive'
                                    });
                                    $state.go('menuGuru.dataSiswaGuru', {
                                        "idSekolah": $stateParams.idSekolah,
                                        "namaSekolah": $stateParams.namaSekolah,
                                        "idKotaKabupaten": $stateParams.idKotaKabupaten,
                                        "idKecamatan": $stateParams.idKecamatan,
                                        "jenjang": $stateParams.jenjang
                                    });
                                    console.log("update");
                                })
                            }
                        })

                    });
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Seluruh Data Harus Diisi, Terima Kasih',
                    okType: 'button-positive'
                });
            }
        };

    }])

    .controller('dataSiswaLihatGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idSiswa": $stateParams.idSiswa,
            "namaSiswa": $stateParams.namaSiswa,
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "idKotaKabupaten": $stateParams.idKotaKabupaten,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang
        }

        var obj = firebase.database(appSiswa).ref("dataSiswa/" + $scope.data.idSiswa);
        var listObj = $firebaseObject(obj);
        $ionicLoading.show();
        listObj.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.formData = response;
        })
    }])

    .controller('dataPokokGuruGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        // $scope.tambahSekolah = function () {
        //     $state.go("menuGuru.dataSekolahTambahGuru");
        // }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database(appGuru).ref("dataGuru").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupatenGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataGuru = response
            $scope.totalGuru = response.length;
            $scope.dataGuruMuaraEnim = $scope.dataGuru.groupBy('namaKecamatan');
            // console.log($scope.dataGuruMuaraEnim);
        });

        $scope.getDataKecamatan = function (x, y) {
            $state.go("menuGuru.dataPokokGuruPerKecamatanGuru", {
                "namaKecamatan": x,
                "idKecamatan": y[0].idKecamatan
            })
        }

    }])

    .controller('dataPokokGuruPerKecamatanGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database(appGuru).ref("dataGuru").orderByChild("idKecamatan").equalTo($scope.data.idKecamatan);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataGuru = response
            $scope.totalGuru = response.length;
            $scope.dataGuruMuaraEnim = $scope.dataGuru.groupBy('jenjang');
            // console.log($scope.dataGuruMuaraEnim);
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database(appGuru).ref("dataGuru/" + response[i].$id);
                updateData.update(JSON.parse(JSON.stringify({
                    "filterKecamatanJenjang": response[i].idKecamatan + "_" + response[i].jenjang
                }))).then(function (resp) {
                    console.log('success');
                })
            }
        });

        $scope.getDataJenjang = function (x, y) {
            $state.go("menuGuru.dataPokokGuruPerJenjangGuru", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": x
            })
        }

    }])

    .controller('dataPokokGuruPerJenjangGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan,
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

        var ref = firebase.database(appGuru).ref("dataGuru").orderByChild("filterKecamatanJenjang").equalTo($scope.data.idKecamatan + "_" + $scope.data.jenjang);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataGuru = response
            $scope.totalGuru = response.length;
            $scope.dataGuruMuaraEnim = $scope.dataGuru.groupBy('namaSekolah');
            // console.log($scope.dataGuruMuaraEnim);
            // console.log(response);
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database(appGuru).ref("dataGuru/" + response[i].$id);
                updateData.update(JSON.parse(JSON.stringify({
                    "filterKecamatanJenjangIdSekolah": response[i].idKecamatan + "_" + response[i].jenjang + "_" + response[i].idSekolah
                }))).then(function (resp) {
                    console.log('success');
                })
            }
        });

        $scope.getDataSekolah = function (x, y) {
            $state.go("menuGuru.dataGuruGuru", {
                "idSekolah": y[0].idSekolah,
                "namaSekolah": x,
                "idKotaKabupaten": y[0].idKotaKabupaten,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": $scope.data.jenjang,
                "namaKecamatan": $scope.data.namaKecamatan,
            })
        }

    }])

    .controller('dataPokokSiswaGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        // $scope.tambahSekolah = function () {
        //     $state.go("menuGuru.dataSekolahTambahGuru");
        // }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupatenGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSiswa = response
            $scope.totalSiswa = response.length;
            $scope.dataSiswaMuaraEnim = $scope.dataSiswa.groupBy('namaKecamatan');
            // console.log($scope.dataSiswaMuaraEnim);
        });

        $scope.getDataKecamatan = function (x, y) {
            $state.go("menuGuru.dataPokokSiswaPerKecamatanGuru", {
                "namaKecamatan": x,
                "idKecamatan": y[0].idKecamatan
            })
        }

    }])

    .controller('dataPokokSiswaPerKecamatanGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKecamatan").equalTo($scope.data.idKecamatan);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSiswa = response
            $scope.totalSiswa = response.length;
            $scope.dataSiswaMuaraEnim = $scope.dataSiswa.groupBy('jenjang');
            // console.log($scope.dataGuruMuaraEnim);
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database().ref("dataSiswa/" + response[i].$id);
                updateData.update(JSON.parse(JSON.stringify({
                    "filterKecamatanJenjang": response[i].idKecamatan + "_" + response[i].jenjang
                }))).then(function (resp) {
                    console.log('success');
                })
            }
        });

        $scope.getDataJenjang = function (x, y) {
            $state.go("menuGuru.dataPokokSiswaPerJenjangGuru", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": x
            })
        }

    }])

    .controller('dataPokokSiswaPerJenjangGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan,
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

        var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("filterKecamatanJenjang").equalTo($scope.data.idKecamatan + "_" + $scope.data.jenjang);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSiswa = response
            $scope.totalSiswa = response.length;
            $scope.dataSiswaMuaraEnim = $scope.dataSiswa.groupBy('namaSekolah');
            // console.log($scope.dataGuruMuaraEnim);
            // console.log(response);
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database(appSiswa).ref("dataSiswa/" + response[i].$id);
                updateData.update(JSON.parse(JSON.stringify({
                    "filterKecamatanJenjangIdSekolah": response[i].idKecamatan + "_" + response[i].jenjang + "_" + response[i].idSekolah
                }))).then(function (resp) {
                    console.log('success');
                })
            }
        });

        $scope.getDataSekolah = function (x, y) {
            $state.go("menuGuru.dataSiswaGuru", {
                "idSekolah": y[0].idSekolah,
                "namaSekolah": x,
                "idKotaKabupaten": y[0].idKotaKabupaten,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": $scope.data.jenjang,
                "namaKecamatan": $scope.data.namaKecamatan,
            })
        }

    }])

    .controller('dataPokokRombelGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        // $scope.tambahSekolah = function () {
        //     $state.go("menuGuru.dataSekolahTambahGuru");
        // }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("dataKelas").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupatenGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataRombel = response
            $scope.totalRombel = response.length;
            $scope.dataRombelMuaraEnim = $scope.dataRombel.groupBy('namaKecamatan');
            console.log($scope.dataRombelMuaraEnim);
        });

        $scope.getDataKecamatan = function (x, y) {
            $state.go("menuGuru.dataPokokRombelPerKecamatanGuru", {
                "namaKecamatan": x,
                "idKecamatan": y[0].idKecamatan
            })
        }

    }])

    .controller('dataPokokRombelPerKecamatanGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("dataKelas").orderByChild("idKecamatan").equalTo($scope.data.idKecamatan);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataRombel = response
            $scope.totalRombel = response.length;
            $scope.dataRombelMuaraEnim = $scope.dataRombel.groupBy('jenjang');
            // console.log($scope.dataGuruMuaraEnim);
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database().ref("dataKelas/" + response[i].$id);
                updateData.update(JSON.parse(JSON.stringify({
                    "filterKecamatanJenjang": response[i].idKecamatan + "_" + response[i].jenjang
                }))).then(function (resp) {
                    console.log('success');
                })
            }
        });

        $scope.getDataJenjang = function (x, y) {
            $state.go("menuGuru.dataPokokRombelPerJenjangGuru", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": x
            })
        }

    }])

    .controller('dataPokokRombelPerJenjangGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan,
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

        var ref = firebase.database().ref("dataKelas").orderByChild("filterKecamatanJenjang").equalTo($scope.data.idKecamatan + "_" + $scope.data.jenjang);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataRombel = response
            $scope.totalRombel = response.length;
            $scope.dataRombelMuaraEnim = $scope.dataRombel.groupBy('namaSekolah');
            // console.log($scope.dataGuruMuaraEnim);
            // console.log(response);
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database().ref("dataKelas/" + response[i].$id);
                updateData.update(JSON.parse(JSON.stringify({
                    "filterKecamatanJenjangIdSekolah": response[i].idKecamatan + "_" + response[i].jenjang + "_" + response[i].idSekolah
                }))).then(function (resp) {
                    console.log('success');
                })
            }
        });

        $scope.getDataSekolah = function (x, y) {
            $state.go("menuGuru.dataKelasGuru", {
                "idSekolah": y[0].idSekolah,
                "namaSekolah": x,
                "idKotaKabupaten": y[0].idKotaKabupaten,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": $scope.data.jenjang,
                "namaKecamatan": $scope.data.namaKecamatan,
            })
        }

    }])

    .controller('dataPokokPrasaranaGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        // $scope.tambahSekolah = function () {
        //     $state.go("menuGuru.dataSekolahTambahGuru");
        // }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("dataPrasarana").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupatenGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPrasarana = response
            $scope.totalPrasarana = response.length;
            $scope.dataPrasaranaMuaraEnim = $scope.dataPrasarana.groupBy('namaKecamatan');
            // console.log($scope.dataPrasaranaMuaraEnim);
        });

        $scope.getDataKecamatan = function (x, y) {
            $state.go("menuGuru.dataPokokPrasaranaPerKecamatanGuru", {
                "namaKecamatan": x,
                "idKecamatan": y[0].idKecamatan
            })
        }

    }])

    .controller('dataPokokPrasaranaPerKecamatanGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("dataPrasarana").orderByChild("idKecamatan").equalTo($scope.data.idKecamatan);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPrasarana = response
            $scope.totalPrasarana = response.length;
            $scope.dataPrasaranaMuaraEnim = $scope.dataPrasarana.groupBy('jenjang');
            // console.log($scope.dataGuruMuaraEnim);
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database().ref("dataPrasarana/" + response[i].$id);
                updateData.update(JSON.parse(JSON.stringify({
                    "filterKecamatanJenjang": response[i].idKecamatan + "_" + response[i].jenjang
                }))).then(function (resp) {
                    console.log('success');
                })
            }
        });

        $scope.getDataJenjang = function (x, y) {
            $state.go("menuGuru.dataPokokPrasaranaPerJenjangGuru", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": x
            })
        }

    }])

    .controller('dataPokokPrasaranaPerJenjangGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan,
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

        var ref = firebase.database().ref("dataPrasarana").orderByChild("filterKecamatanJenjang").equalTo($scope.data.idKecamatan + "_" + $scope.data.jenjang);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPrasarana = response
            $scope.totalPrasarana = response.length;
            $scope.dataPrasaranaMuaraEnim = $scope.dataPrasarana.groupBy('namaSekolah');
            // console.log($scope.dataGuruMuaraEnim);
            // console.log(response);
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database().ref("dataPrasarana/" + response[i].$id);
                updateData.update(JSON.parse(JSON.stringify({
                    "filterKecamatanJenjangIdSekolah": response[i].idKecamatan + "_" + response[i].jenjang + "_" + response[i].idSekolah
                }))).then(function (resp) {
                    console.log('success');
                })
            }
        });

        $scope.getDataSekolah = function (x, y) {
            $state.go("menuGuru.dataPrasaranaGuru", {
                "idSekolah": y[0].idSekolah,
                "namaSekolah": x,
                "idKotaKabupaten": y[0].idKotaKabupaten,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": $scope.data.jenjang,
                "namaKecamatan": $scope.data.namaKecamatan,
            })
        }

    }])

    .controller('dataPokokSaranaGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        // $scope.tambahSekolah = function () {
        //     $state.go("menuGuru.dataSekolahTambahGuru");
        // }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("sarana").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupatenGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSarana = response
            $scope.totalSarana = response.length;
            $scope.dataSaranaMuaraEnim = $scope.dataSarana.groupBy('namaKecamatan');
            // console.log($scope.dataPrasaranaMuaraEnim);
        });

        $scope.getDataKecamatan = function (x, y) {
            $state.go("menuGuru.dataPokokSaranaPerKecamatanGuru", {
                "namaKecamatan": x,
                "idKecamatan": y[0].idKecamatan
            })
        }

    }])

    .controller('dataPokokSaranaPerKecamatanGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("sarana").orderByChild("idKecamatan").equalTo($scope.data.idKecamatan);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSarana = response
            $scope.totalSarana = response.length;
            $scope.dataSaranaMuaraEnim = $scope.dataSarana.groupBy('jenjang');
            // console.log($scope.dataGuruMuaraEnim);
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database().ref("sarana/" + response[i].$id);
                updateData.update(JSON.parse(JSON.stringify({
                    "filterKecamatanJenjang": response[i].idKecamatan + "_" + response[i].jenjang
                }))).then(function (resp) {
                    console.log('success');
                })
            }
        });

        $scope.getDataJenjang = function (x, y) {
            $state.go("menuGuru.dataPokokSaranaPerJenjangGuru", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": x
            })
        }

    }])

    .controller('dataPokokSaranaPerJenjangGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan,
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

        var ref = firebase.database().ref("sarana").orderByChild("filterKecamatanJenjang").equalTo($scope.data.idKecamatan + "_" + $scope.data.jenjang);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSarana = response
            $scope.totalSarana = response.length;
            $scope.dataSaranaMuaraEnim = $scope.dataSarana.groupBy('namaSekolah');
            // console.log($scope.dataGuruMuaraEnim);
            // console.log(response);
            for (i = 0; i < response.length; i++) {
                var updateData = firebase.database().ref("sarana/" + response[i].$id);
                updateData.update(JSON.parse(JSON.stringify({
                    "filterKecamatanJenjangIdSekolah": response[i].idKecamatan + "_" + response[i].jenjang + "_" + response[i].idSekolah
                }))).then(function (resp) {
                    console.log('success');
                })
            }
        });

        $scope.getDataSekolah = function (x, y) {
            $state.go("menuGuru.dataSaranaGuru", {
                "idSekolah": y[0].idSekolah,
                "namaSekolah": x,
                "idKotaKabupaten": y[0].idKotaKabupaten,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": $scope.data.jenjang,
                "namaKecamatan": $scope.data.namaKecamatan,
            })
        }

    }])