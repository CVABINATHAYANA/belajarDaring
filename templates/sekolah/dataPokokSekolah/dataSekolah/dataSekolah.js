angular.module('app.dataPokokSekolahSekolah', [])

    .controller('dataSekolahSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        $scope.tambahSekolah = function () {
            $state.go("menuSekolah.dataSekolahTambahSekolah");
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSekolah = response
            $scope.totalSekolah = response.length;
            $scope.dataSekolahMuaraEnim = $scope.dataSekolah.groupBy('nama_kecamatan');
        });

        $scope.getDataKecamatan = function (x, y) {
            $state.go("menuSekolah.dataSekolahPerKecamatanSekolah", {
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
                        $state.go('menuSekolah.dataSekolahEditSekolah', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                        });
                    }
                    if (index === 1) {
                        $state.go('menuSekolah.dataPrasaranaSekolah', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan
                        });
                    }
                    if (index === 2) {
                        $state.go('menuSekolah.dataSaranaSekolah', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan
                        });
                    }
                    if (index === 3) {
                        $state.go('menuSekolah.dataKelasSekolah', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan,
                            "jenjang": data.jenjang
                        });
                    }
                    if (index === 4) {
                        $state.go('menuSekolah.dataGuruSekolah', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan,
                            "jenjang": data.jenjang
                        });
                    }
                    if (index === 5) {
                        $state.go('menuSekolah.dataSiswaSekolah', {
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
                    if ($scope.hakAkses === "Super Sekolah") {

                        var refObj = firebase.database().ref("dataSekolahIndonesia/" + data.$id);
                        var objDelete = $firebaseObject(refObj);
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Hapus Data',
                            template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                            okType: "button-balanced",
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
                            okType: "button-balanced"
                        });
                    }


                    return true;
                }

            });
        }

    }])

    .controller('dataSekolahPerKecamatanSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            $state.go("menuSekolah.dataSekolahPerJenjangSekolah", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": x
            })
        }

    }])

    .controller('dataSekolahPerJenjangSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            $state.go("menuSekolah.dataSekolahListSekolah", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": $scope.data.jenjang,
                "status": x
            })
        }

    }])

    .controller('dataSekolahListSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        $scope.getData = function (data) {
            // console.log(data);
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
                        $state.go('menuSekolah.dataSekolahEditSekolah', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                        });
                    }
                    if (index === 1) {
                        $state.go('menuSekolah.dataPrasaranaSekolah', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan,
                            "jenjang": data.jenjang,
                            "namaKecamatan": data.nama_kecamatan
                        });
                    }
                    if (index === 2) {
                        $state.go('menuSekolah.dataSaranaSekolah', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan,
                            "jenjang": data.jenjang,
                            "namaKecamatan": data.nama_kecamatan
                        });
                    }
                    if (index === 3) {
                        $state.go('menuSekolah.dataKelasSekolah', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan,
                            "jenjang": data.jenjang
                        });
                    }
                    if (index === 4) {
                        $state.go('menuSekolah.dataGuruSekolah', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan,
                            "jenjang": data.jenjang
                        });
                    }
                    if (index === 5) {
                        $state.go('menuSekolah.dataSiswaSekolah', {
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
                    if ($scope.hakAkses === "Super Sekolah") {

                        var refObj = firebase.database().ref("dataSekolahIndonesia/" + data.$id);
                        var objDelete = $firebaseObject(refObj);
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Hapus Data',
                            template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                            okType: "button-balanced",
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
                            okType: "button-balanced"
                        });
                    }


                    return true;
                }

            });
        }

    }])

    .controller('dataSekolahTambahSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
                    "diBuatOleh": $scope.namaSekolah,
                    "idPembuat": $scope.idSekolah,

                }).then(function (resp) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'SUKSES',
                        template: "Data sekolah berhasil disimpan",
                        okType: "button-balanced"
                    });
                    $state.go("menuSekolah.dataSekolahSekolah")
                })

            }
            else {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: "Beberapa data harus diisi, Terimakasih",
                    okType: "button-balanced"
                });
            }
        }

    }])

    .controller('dataSekolahEditSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        var obj = firebase.database().ref("dataSekolahIndonesia/" + $scope.idSekolah);
        $scope.formData = $firebaseObject(obj);

        obj.on("value", function (snapshot) {

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenSekolah);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanSekolah);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);
        })

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiSekolah);;
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

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenSekolah);
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

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanSekolah);
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

                var obj = firebase.database().ref("dataSekolahIndonesia/" + $scope.idSekolah);

                obj.update(JSON.parse(JSON.stringify({
                    "id_kecamatan": $scope.formData.id_kecamatan,
                    "id_kota_kabupaten": $scope.formData.id_kota_kabupaten,
                    "id_provinsi": $scope.formData.id_provinsi,
                    // "id_sekolah": "-",
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
                    "diEditOleh": $scope.namaSekolah,
                    "idPengedit": $scope.idSekolah

                }))).then(function (resp) {
                    // $state.go("menuSekolah.dataSekolahSekolah")
                    $ionicPopup.alert({
                        title: 'SUKSES',
                        template: "Data sekolah berhasil disimpan",
                        okType: "button-balanced"
                    });
                })

            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: "Beberapa data harus diisi, Terimakasih",
                    okType: "button-balanced"
                });
            }
        }

    }])