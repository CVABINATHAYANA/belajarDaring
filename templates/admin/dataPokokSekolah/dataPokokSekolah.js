angular.module('app.dataPokokSekolahAdmin', [])

    .controller('dataSekolahAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.tambahSekolah = function () {
            $state.go("menuAdmin.dataSekolahTambahAdmin");
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSekolah = response
            $scope.totalSekolah = response.length;
            $scope.dataSekolahMuaraEnim = $scope.dataSekolah.groupBy('nama_kecamatan');
        });

        $scope.getDataKecamatan = function (x, y) {
            $state.go("menuAdmin.dataSekolahPerKecamatanAdmin", {
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
            console.log($scope.dataProvinsi);
        });

        $scope.getProvinsi = function () {
            var idProvinsi = $scope.formData.provinsi;
            console.log(idProvinsi)

            //Get Nama Provinsi
            var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
            var listNamaProvinsi = $firebaseArray(namaProvinsi);
            listNamaProvinsi.$loaded().then(function (response) {
                $scope.namaProvinsi = response[0].nama_provinsi;
                console.log($scope.namaProvinsi);
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
                    // { text: '<i class="icon ion-social-buffer"></i> Data Prasarana' },
                    // { text: '<i class="icon ion-android-folder-open"></i> Data Sarana' },
                    // { text: '<i class="icon ion-android-list"></i> Data Rombel' },
                    // { text: '<i class="icon ion-person-stalker"></i> Data Guru/Pegawai' },
                    // { text: '<i class="icon ion-ios-people"></i> Data Siswa' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Sekolah',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('menuAdmin.dataSekolahEditAdmin', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                        });
                    }
                    if (index === 1) {
                        $state.go('menuAdmin.dataPrasaranaAdmin', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan
                        });
                    }
                    // if (index === 2) {
                    //     $state.go('menuAdmin.dataSaranaAdmin', {
                    //         "idSekolah": data.$id,
                    //         "namaSekolah": data.nama_sekolah,
                    //         "idKotaKabupaten": data.id_kota_kabupaten,
                    //         "idKecamatan": data.id_kecamatan
                    //     });
                    // }
                    // if (index === 3) {
                    //     $state.go('menuAdmin.dataKelasAdmin', {
                    //         "idSekolah": data.$id,
                    //         "namaSekolah": data.nama_sekolah,
                    //         "idKotaKabupaten": data.id_kota_kabupaten,
                    //         "idKecamatan": data.id_kecamatan,
                    //         "jenjang": data.jenjang
                    //     });
                    // }
                    // if (index === 4) {
                    //     $state.go('menuAdmin.dataGuruAdmin', {
                    //         "idSekolah": data.$id,
                    //         "namaSekolah": data.nama_sekolah,
                    //         "idKotaKabupaten": data.id_kota_kabupaten,
                    //         "idKecamatan": data.id_kecamatan,
                    //         "jenjang": data.jenjang
                    //     });
                    // }
                    // if (index === 5) {
                    //     $state.go('menuAdmin.dataSiswaAdmin', {
                    //         "idSekolah": data.$id,
                    //         "namaSekolah": data.nama_sekolah,
                    //         "idKotaKabupaten": data.id_kota_kabupaten,
                    //         "idKecamatan": data.id_kecamatan,
                    //         "jenjang": data.jenjang
                    //     });
                    // }
                    return true;
                },

                destructiveButtonClicked: function () {

                    // console.log(data.$id)
                    if ($scope.hakAkses === "Super Admin") {

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

    .controller('dataSekolahPerKecamatanAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "namaKecamatan": $stateParams.namaKecamatan,
            "idKecamatan": $stateParams.idKecamatan
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
            $state.go("menuAdmin.dataSekolahPerJenjangAdmin", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": x
            })
        }

    }])

    .controller('dataSekolahPerJenjangAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
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
            $state.go("menuAdmin.dataSekolahListAdmin", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": $scope.data.jenjang,
                "status": x
            })
        }

    }])

    .controller('dataSekolahListAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
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
            console.log(data);
            $ionicActionSheet.show({
                titleText: 'Data Sekolah : ' + data.nama_sekolah,
                buttons: [
                    { text: '<i class="icon ion-edit"></i> Edit Sekolah' },
                    { text: '<i class="icon ion-social-buffer"></i> Data lengkap sekolah' },
                    // { text: '<i class="icon ion-android-folder-open"></i> Data Sarana' },
                    // { text: '<i class="icon ion-android-list"></i> Data Rombel' },
                    // { text: '<i class="icon ion-person-stalker"></i> Data Guru/Pegawai' },
                    // { text: '<i class="icon ion-ios-people"></i> Data Siswa' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Sekolah',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('menuAdmin.dataSekolahEditAdmin', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                        });
                    }
                    if (index === 1) {
                        $state.go('menuAdmin.dataLengkapSekolahAdmin', {
                            "idSekolah": data.$id,
                            "namaSekolah": data.nama_sekolah,
                            "idKotaKabupaten": data.id_kota_kabupaten,
                            "idKecamatan": data.id_kecamatan,
                            "jenjang": data.jenjang,
                            "namaKecamatan": data.nama_kecamatan
                        });
                    }

                    // if (index === 2) {
                    //     $state.go('menuAdmin.dataSaranaAdmin', {
                    //         "idSekolah": data.$id,
                    //         "namaSekolah": data.nama_sekolah,
                    //         "idKotaKabupaten": data.id_kota_kabupaten,
                    //         "idKecamatan": data.id_kecamatan,
                    //         "jenjang": data.jenjang,
                    //         "namaKecamatan": data.nama_kecamatan
                    //     });
                    // }
                    // if (index === 3) {
                    //     $state.go('menuAdmin.dataKelasAdmin', {
                    //         "idSekolah": data.$id,
                    //         "namaSekolah": data.nama_sekolah,
                    //         "idKotaKabupaten": data.id_kota_kabupaten,
                    //         "idKecamatan": data.id_kecamatan,
                    //         "jenjang": data.jenjang
                    //     });
                    // }
                    // if (index === 4) {
                    //     $state.go('menuAdmin.dataGuruAdmin', {
                    //         "idSekolah": data.$id,
                    //         "namaSekolah": data.nama_sekolah,
                    //         "idKotaKabupaten": data.id_kota_kabupaten,
                    //         "idKecamatan": data.id_kecamatan,
                    //         "jenjang": data.jenjang
                    //     });
                    // }
                    // if (index === 5) {
                    //     $state.go('menuAdmin.dataSiswaAdmin', {
                    //         "idSekolah": data.$id,
                    //         "namaSekolah": data.nama_sekolah,
                    //         "idKotaKabupaten": data.id_kota_kabupaten,
                    //         "idKecamatan": data.id_kecamatan,
                    //         "jenjang": data.jenjang
                    //     });
                    // }
                    return true;
                },

                destructiveButtonClicked: function () {

                    // console.log(data.$id)
                    if ($scope.hakAkses === "Super Admin") {

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

    .controller('dataSekolahTambahAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        $scope.idProvinsiAdmin = localStorage.getItem('idProvinsiAdmin');

        if (!$scope.idAdmin) {
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
        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiAdmin);
        var listProvinsi = $firebaseArray(refProvinsi);

        listProvinsi.$loaded().then(function (response) {
            $scope.dataProvinsi = response;
            // console.log($scope.dataProvinsi);
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

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
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
                    "diBuatOleh": $scope.namaAdmin,
                    "idPembuat": $scope.idAdmin,

                }).then(function (resp) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'SUKSES',
                        template: "Data sekolah berhasil disimpan",
                        okType: "button-positive"
                    });
                    $state.go("menuAdmin.dataSekolahAdmin")
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

    .controller('dataSekolahEditAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        $scope.idProvinsiAdmin = localStorage.getItem('idProvinsiAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah
        }

        var obj = firebase.database().ref("dataSekolahIndonesia/" + $scope.data.idSekolah);
        $scope.formData = $firebaseObject(obj);

        obj.on("value", function (snapshot) {

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(snapshot.val().id_kota_kabupaten);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);
        })

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiAdmin);;
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

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
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
                    "diEditOleh": $scope.namaAdmin,
                    "idPengedit": $scope.idAdmin

                }))).then(function (resp) {
                    $state.go("menuAdmin.dataSekolahAdmin")
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

    .controller('dataPrasaranaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');

        if (!$scope.idAdmin) {
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

        var ref = firebase.database().ref("dataPrasarana").orderByChild("idSekolah").equalTo($scope.data.idSekolah);
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
                            "diBuatOleh": $scope.namaAdmin,
                            "idPembuat": $scope.idAdmin,
                            "idSekolah": $scope.data.idSekolah,
                            "idKotaKabupaten": $scope.data.idKotaKabupaten,
                            "idKecamatan": $scope.data.idKecamatan,
                            "jenjang": $scope.data.jenjang,
                            "namaKecamatan": $scope.data.namaKecamatan,
                            "namaSekolah": $scope.data.namaSekolah
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
                            "diEditOleh": $scope.namaAdmin,
                            "idPengedit": $scope.idAdmin,
                            "idSekolah": $scope.data.idSekolah,
                            "idKotaKabupaten": $scope.data.idKotaKabupaten,
                            "idKecamatan": $scope.data.idKecamatan,
                            "jenjang": $scope.data.jenjang,
                            "namaKecamatan": $scope.data.namaKecamatan,
                            "namaSekolah": $scope.data.namaSekolah
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
            if ($scope.hakAkses === 'Super Admin') {
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
                    template: 'Anda tidak diperkenankan menghapus data ini, terima kasih',
                    okType: 'button-positive'
                });
            }
        };

    }])

    .controller('dataSaranaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');

        if (!$scope.idAdmin) {
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

        var ref = firebase.database().ref("sarana").orderByChild("idSekolah").equalTo($scope.data.idSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSarana = response;
        });

        var refJenisPrasarana = firebase.database().ref("jenisSarana");
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
                            "diBuatOleh": $scope.namaAdmin,
                            "idPembuat": $scope.idAdmin,
                            "idSekolah": $scope.data.idSekolah,
                            "idKotaKabupaten": $scope.data.idKotaKabupaten,
                            "idKecamatan": $scope.data.idKecamatan,
                            "jenjang": $scope.data.jenjang,
                            "namaKecamatan": $scope.data.namaKecamatan,
                            "namaSekolah": $scope.data.namaSekolah
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
                            "diEditOleh": $scope.namaAdmin,
                            "idPengedit": $scope.idAdmin,
                            "idSekolah": $scope.data.idSekolah,
                            "idKotaKabupaten": $scope.data.idKotaKabupaten,
                            "idKecamatan": $scope.data.idKecamatan,
                            "jenjang": $scope.data.jenjang,
                            "namaKecamatan": $scope.data.namaKecamatan,
                            "namaSekolah": $scope.data.namaSekolah
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
            if ($scope.hakAkses === 'Super Admin') {
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
                    template: 'Anda tidak diperkenankan menghapus data ini, terima kasih',
                    okType: 'button-positive'
                });
            }
        };

    }])

    .controller('dataLengkapSekolahAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');

        if (!$scope.idAdmin) {
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


        $scope.dataPokokSekolah = function () {
            $ionicActionSheet.show({
                titleText: 'Data Pokok Sekolah ',
                buttons: [
                    { text: '<i class="icon ion-android-document"></i> Sekolah ' },
                    { text: '<i class="icon ion-android-folder"></i> Prasarana ' },
                    { text: '<i class="icon ion-android-folder-open"></i> Sarana ' },
                    { text: '<i class="icon ion-android-list"></i> Kelas ' },
                    { text: '<i class="icon ion-android-person"></i> Guru ' },
                    { text: '<i class="icon ion-ios-people"></i> Siswa ' },
                    // { text: '<i class="icon ion-ios-people"></i> Admin Sekolah ' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Jadwal',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) { 
                        // $state.go("menuSekolah.dataSekolahEditSekolah") 
                        $state.go('menuAdmin.dataSekolahEditAdmin', {
                            "idSekolah": $scope.data.idSekolah,
                            "namaSekolah": $scope.data.namaSekolah,
                            "idKotaKabupaten": $scope.data.idKotaKabupaten,
                            "idKecamatan": $scope.data.idKecamatan,
                            "jenjang": $scope.data.jenjang,
                            "namaKecamatan": $scope.data.namaKecamatan,
                        });
                    }
                    if (index === 1) {
                        //  $state.go("menuSekolah.dataPrasaranaSekolah")
                            $state.go('menuAdmin.dataPrasaranaAdmin', {
                                "idSekolah": $scope.data.idSekolah,
                                "namaSekolah": $scope.data.namaSekolah,
                                "idKotaKabupaten": $scope.data.idKotaKabupaten,
                                "idKecamatan": $scope.data.idKecamatan,
                                "jenjang": $scope.data.jenjang,
                                "namaKecamatan": $scope.data.namaKecamatan,
                        }); 
                        }
                    if (index === 2) { 
                        $state.go('menuAdmin.dataSaranaAdmin', {
                            "idSekolah": $scope.data.idSekolah,
                            "namaSekolah": $scope.data.namaSekolah,
                            "idKotaKabupaten": $scope.data.idKotaKabupaten,
                            "idKecamatan": $scope.data.idKecamatan,
                            "jenjang": $scope.data.jenjang,
                            "namaKecamatan": $scope.data.namaKecamatan,
                    });  
                    }
                    if (index === 3) {
                         $state.go('menuAdmin.dataKelasAdmin', {
                            "idSekolah": $scope.data.idSekolah,
                            "namaSekolah": $scope.data.namaSekolah,
                            "idKotaKabupaten": $scope.data.idKotaKabupaten,
                            "idKecamatan": $scope.data.idKecamatan,
                            "jenjang": $scope.data.jenjang,
                            "namaKecamatan": $scope.data.namaKecamatan,
                        }); 
                        }
                    if (index === 4) {
                        //  $state.go("menuSekolah.dataGuruSekolah")
                         $state.go('menuAdmin.dataGuruAdmin', {
                            "idSekolah": $scope.data.idSekolah,
                            "namaSekolah": $scope.data.namaSekolah,
                            "idKotaKabupaten": $scope.data.idKotaKabupaten,
                            "idKecamatan": $scope.data.idKecamatan,
                            "jenjang": $scope.data.jenjang,
                            "namaKecamatan": $scope.data.namaKecamatan,
                    });  
                        }
                    if (index === 5) {
                         $state.go('menuAdmin.dataSiswaAdmin', {
                            "idSekolah": $scope.data.idSekolah,
                            "namaSekolah": $scope.data.namaSekolah,
                            "idKotaKabupaten": $scope.data.idKotaKabupaten,
                            "idKecamatan": $scope.data.idKecamatan,
                            "jenjang": $scope.data.jenjang,
                            "namaKecamatan": $scope.data.namaKecamatan,
                    });   
                        }
                    // if (index === 6) {
                    //      $state.go("menuSekolah.adminSekolah")
                    //      $state.go('menuAdmin.dataSiswaAdmin', {
                    //         "idSekolah": $scope.data.idSekolah,
                    //         "namaSekolah": $scope.data.namaSekolah,
                    //         "idKotaKabupaten": $scope.data.idKotaKabupaten,
                    //         "idKecamatan": $scope.data.idKecamatan,
                    //         "jenjang": $scope.data.jenjang,
                    //         "namaKecamatan": $scope.data.namaKecamatan,
                    // });   
                    //     }
                    return true;
                },
            });
        }


        $scope.getJadwal = function () {
            $state.go('menuAdmin.jadwalPelajaranAdmin', {
                "idSekolah": $scope.data.idSekolah,
                "namaSekolah": $scope.data.namaSekolah,
        });  
        }

        $scope.getAbsensi = function () {
            $state.go('menuAdmin.absensiSiswaAdmin', {
                "idSekolah": $scope.data.idSekolah,
                "namaSekolah": $scope.data.namaSekolah,
        });  
        }

        $scope.getTugasSiswa = function () {
            $state.go('menuAdmin.tugasSiswaAdmin', {
                "idSekolah": $scope.data.idSekolah,
                "namaSekolah": $scope.data.namaSekolah,
        });  
        }

        $scope.eLearning = function () {
            $ionicActionSheet.show({
                titleText: 'e-Learning ',
                buttons: [
                    { text: '<i class="icon ion-ios-paper-outline"></i> Bank Soal ' },
                    { text: '<i class="icon ion-videocamera"></i> Materi Pelajaran ' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Jadwal',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) { $state.go("menuSekolah.bankSoalSekolah") }
                    if (index === 1) { $state.go("menuSekolah.materiPelajaranSekolah") }
                    return true;
                },
            });
        }

        $scope.ujianOnline = function () {
            $ionicActionSheet.show({
                titleText: 'Ujian Online ',
                buttons: [
                    { text: '<i class="icon ion-ios-book"></i> Ujian Online ' },
                    { text: '<i class="icon ion-ios-box"></i> UTS/UAS ' },
                    { text: '<i class="icon ion-ios-browsers"></i> Tryout ' },
                    // { text: '<i class="icon ion-trophy"></i> Olimpiade Online ' },
                ],
                // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Jadwal',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) { $state.go("menuSekolah.ujianOnlineSekolah") }
                    if (index === 1) { $state.go("menuSekolah.UTSUASSekolah") }
                    if (index === 2) { $state.go("menuSekolah.tryoutOnlineSekolah") }
                    if (index === 3) { $state.go("menuSekolah.socSekolah") }
                    return true;
                },
            });
        }



    }])

    .controller('dataRombelAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "idSekolah": $stateParams.idSekolah,
            "namaSekolah": $stateParams.namaSekolah,
            "idKotaKabupaten": $stateParams.idKotaKabupaten,
            "idKecamatan": $stateParams.idKecamatan,
            "jenjang": $stateParams.jenjang
        }

        var ref = firebase.database().ref("dataKelas").orderByChild("idSekolah").equalTo($scope.data.idSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataKelas = response;
        })

        var refNamaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.data.idKecamatan);
        refNamaKecamatan.on("child_added", function (snapshot) {
            $scope.namaKecamatan = snapshot.val().nama_kecamatan;
            console.log($scope.namaKecamatan);
        })

        var refTahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        var listRefTahunAjaran = $firebaseArray(refTahunAjaran);
        $ionicLoading.show();
        listRefTahunAjaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.tahunAjaran = response;
        });

        var refDataPrasarana = firebase.database().ref("dataPrasarana").orderByChild("idSekolah").equalTo($scope.data.idSekolah);
        var listRefDataPrasarana = $firebaseArray(refDataPrasarana);
        $ionicLoading.show();
        listRefDataPrasarana.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataPrasarana = response;
        })

        if ($scope.data.jenjang === 'SD') {
            $scope.tingkatKelas = [1, 2, 3, 4, 5, 6];
        }
        else if ($scope.data.jenjang === 'SMP') {
            $scope.tingkatKelas = [7, 8, 9];
        }
        else if ($scope.data.jenjang === 'SMA' || $scope.data.jenjang === 'SMK') {
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
                        console.log($scope.namaPrasarana)
                    })
                }

                $scope.simpan = function () {
                    console.log($scope.formData)
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                    if ($scope.formData.idTahunAjaran !== "" && $scope.formData.tingkatKelas !== "" && $scope.formData.namaKelas !== "") {
                
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
                                        "diBuatOleh": $scope.namaAdmin,
                                        "idPembuat": $scope.idAdmin,
                                        "idSekolah": $scope.data.idSekolah,
                                        "idKotaKabupaten": $scope.data.idKotaKabupaten,
                                        "idKecamatan": $scope.data.idKecamatan,
                                        "namaKecamatan": $scope.namaKecamatan,
                                        "jenjang": $scope.data.jenjang,
                                        "namaSekolah": $scope.data.namaSekolah,
                                        "filter_input": $scope.data.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas,
                                        "filter": $scope.data.idSekolah + "_" + $scope.formData.idTahunAjaran,
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
                                        "diBuatOleh": $scope.namaAdmin,
                                        "idPembuat": $scope.idAdmin,
                                        "idSekolah": $scope.data.idSekolah,
                                        "idKotaKabupaten": $scope.data.idKotaKabupaten,
                                        "idKecamatan": $scope.data.idKecamatan,
                                        "namaKecamatan": $scope.namaKecamatan,
                                        "jenjang": $scope.data.jenjang,
                                        "namaSekolah": $scope.data.namaSekolah,
                                        "filter_input": $scope.data.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas,
                                        "filter": $scope.data.idSekolah + "_" + $scope.formData.idTahunAjaran,
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
            console.log(data)
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                var ref = firebase.database().ref("dataKelas/" + data.$id);
                $scope.formData = $firebaseObject(ref);

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
                        console.log($scope.namaPrasarana)
                    })
                }

                $scope.simpan = function () {
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                    if ($scope.formData.idTahunAjaran !== "" && $scope.formData.tingkatKelas !== "" && $scope.formData.namaKelas !== "" ) {

                        $ionicLoading.show();
                        ref.update(JSON.parse(JSON.stringify({
                            "jenisRombel": $scope.formData.jenisRombel,
                            "idTahunAjaran": $scope.formData.idTahunAjaran,
                            "tahunAjaran": $scope.namaTahunAjaran,
                            "tingkatKelas": $scope.formData.tingkatKelas,
                            "namaKelas": $scope.formData.namaKelas,
                            "idPrasarana": $scope.formData.idPrasarana,
                            "namaPrasarana": $scope.namaPrasarana,
                            "updateAt": createAt,
                            "diEditOleh": $scope.namaAdmin,
                            "idPengedit": $scope.idAdmin,
                            "idSekolah": $scope.data.idSekolah,
                            "idKotaKabupaten": $scope.data.idKotaKabupaten,
                            "idKecamatan": $scope.data.idKecamatan,
                            "namaKecamatan": $scope.namaKecamatan,
                            "jenjang": $scope.data.jenjang,
                            "namaSekolah": $scope.data.namaSekolah,
                            "filter_input": $scope.data.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas,
                            "filter": $scope.data.idSekolah + "_" + $scope.formData.idTahunAjaran,
                            "filterJenisRombel": $scope.data.idSekolah + "_" + $scope.formData.idTahunAjaran+"_"+$scope.formData.jenisRombel
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
            if ($scope.hakAkses === "Super Admin") {
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
                    else{
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Data kelas ini tidak bisa dihapus karena sudah terisi data siswa. Terimakasih',

                        });
                    }
                });
                
            }
            else {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Anda tidak diperkenankan menghapus data ini, terima kasih',

                });
            }
        }

    }])

    .controller('dataGuruAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');

        if (!$scope.idAdmin) {
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
            $state.go('menuAdmin.dataGuruTambahAdmin', {
                "idSekolah": $stateParams.idSekolah,
                "namaSekolah": $stateParams.namaSekolah,
                "idKotaKabupaten": $stateParams.idKotaKabupaten,
                "idKecamatan": $stateParams.idKecamatan,
                "jenjang": $stateParams.jenjang
            })
        }

        var ref = firebase.database(appGuru).ref("dataGuru").orderByChild("idSekolah").equalTo($scope.data.idSekolah);
        listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataGuru = response;
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
                        $state.go('menuAdmin.dataGuruEditAdmin', {
                            "idGuru": data.$id,
                            "namaPengguna": data.namaPengguna,
                            "idSekolah": $stateParams.idSekolah,
                            "namaSekolah": $stateParams.namaSekolah,
                            "idKotaKabupaten": $stateParams.idKotaKabupaten,
                            "idKecamatan": $stateParams.idKecamatan,
                            "jenjang": $stateParams.jenjang
                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    if ($scope.hakAkses === 'Super Admin') {
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
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Anda tidak diperkenankan menghapus data ini, terima kasih',
                            okType: 'button-positive'
                        });
                    }

                    return true;
                }

            });
        }

    }])

    .controller('dataGuruTambahAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        $scope.idProvinsiAdmin = localStorage.getItem('idProvinsiAdmin');

        if (!$scope.idAdmin) {
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
        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiAdmin);
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

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
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
                                "diBuatOleh": $scope.namaAdmin,
                                "idPembuat": $scope.idAdmin,

                            })
                                .then(function (resp) {
                                    $ionicLoading.hide();
                                    $state.go("menuAdmin.dataGuruAdmin", {
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

    .controller('dataGuruEditAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        $scope.idProvinsiAdmin = localStorage.getItem('idProvinsiAdmin');

        if (!$scope.idAdmin) {
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
        $scope.formData = $firebaseObject(obj);

        obj.on("value", function (snapshot) {
            // console.log(snapshot.val());

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
            // console.log($scope.dataKotaKabupaten);

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);

            var refSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo(snapshot.val().idKecamatan);
            $scope.dataSekolah = $firebaseArray(refSekolah);
        })

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiAdmin);
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

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
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
                    "diEditOleh": $scope.namaAdmin,
                    "idPengedit": $scope.idAdmin,
                }))).then(function (resp) {
                    $ionicLoading.hide();
                    $state.go("menuAdmin.dataGuruAdmin", {
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

    .controller('dataSiswaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');

        if (!$scope.idAdmin) {
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
            $state.go("menuAdmin.dataSiswaTambahAdmin", {
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
            var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.data.idSekolah + "_" + snapshot.key);
            listRefKelas = $firebaseArray(refKelas);
            $ionicLoading.show();
            listRefKelas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKelas = response;
            })
        });

        $scope.getIdKelas = function () {
            var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.formData.idKelas);
            var listRef = $firebaseArray(ref);

            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSiswa = response;
                $scope.totalSiswa = response.length;
            });
        }

        var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idSekolah").equalTo($scope.data.idSekolah);
        var listRef = $firebaseArray(ref);

        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSiswa = response;
            $scope.totalSiswa = response.length;
            // console.log($scope.dataSiswa);
        });

        $scope.getData = function (data) {
            // console.log(data);
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
                        $state.go('menuAdmin.dataSiswaLihatAdmin', {
                            "idSiswa": data.$id,
                            "namaSiswa": data.namaPengguna,
                            "idSekolah": $stateParams.idSekolah,
                            "namaSekolah": $stateParams.namaSekolah,
                            "idKotaKabupaten": $stateParams.idKotaKabupaten,
                            "idKecamatan": $stateParams.idKecamatan,
                            "jenjang": $stateParams.jenjang
                        });
                    }
                    if (index === 1) {
                        $state.go('menuAdmin.dataSiswaEditAdmin', {
                            "idSiswa": data.$id,
                            "namaSiswa": data.namaPengguna,
                            "idSekolah": $stateParams.idSekolah,
                            "namaSekolah": $stateParams.namaSekolah,
                            "idKotaKabupaten": $stateParams.idKotaKabupaten,
                            "idKecamatan": $stateParams.idKecamatan,
                            "jenjang": $stateParams.jenjang
                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    if($scope.hakAkses==="Super Admin"){
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
                    else{
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

    .controller('dataSiswaTambahAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        $scope.idProvinsiAdmin = localStorage.getItem('idProvinsiAdmin');

        if (!$scope.idAdmin) {
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
        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiAdmin);
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

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
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

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
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
            var idSekolah = $scope.formData.idSekolah;

            var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
            refDataSekolah.on("value", function (snapshot) {
                $scope.namaSekolah = snapshot.val().nama_sekolah;
            })

            var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
            listRefKelas = $firebaseArray(refKelas);
            $ionicLoading.show();
            listRefKelas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKelas = response;
            })
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
            console.log($scope.formData);

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
                                "diBuatOleh": $scope.namaAdmin,
                                "idPembuat": $scope.idAdmin,

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
                                        $state.go('menuAdmin.dataSiswaAdmin', {
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

    .controller('dataSiswaEditAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        $scope.idProvinsiAdmin = localStorage.getItem('idProvinsiAdmin');

        if (!$scope.idAdmin) {
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

        obj.on("value", function (snapshot) {
            //console.log(snapshot.val());
            //Data Provinsi
            var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiAdmin);
            var listProvinsi = $firebaseArray(refProvinsi);

            listProvinsi.$loaded().then(function (response) {
                $scope.dataProvinsi = response;
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(snapshot.val().idKotaKabupaten);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);

            var refSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo(snapshot.val().idKecamatan + "_" + snapshot.val().jenjang);
            var listSekolah = $firebaseArray(refSekolah);

            listSekolah.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSekolah = response;

            });

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
        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiAdmin);
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

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
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

            var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
            listRefKelas = $firebaseArray(refKelas);
            $ionicLoading.show();
            listRefKelas.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataKelas = response;
            })
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

        var refKelas = firebase.database().ref("dataKelas").orderByChild("idSekolah").equalTo($scope.data.idSekolah);
        listRefKelas = $firebaseArray(refKelas);
        $ionicLoading.show();
        listRefKelas.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataKelas = response;
        })

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
                                    $state.go('menuAdmin.dataSiswaAdmin', {
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
                                    $state.go('menuAdmin.dataSiswaAdmin', {
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

    .controller('dataSiswaLihatAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');

        if (!$scope.idAdmin) {
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

    .controller('dataPokokGuruAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        // $scope.tambahSekolah = function () {
        //     $state.go("menuAdmin.dataSekolahTambahAdmin");
        // }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database(appGuru).ref("dataGuru").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupaten);
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
            $state.go("menuAdmin.dataPokokGuruPerKecamatanAdmin", {
                "namaKecamatan": x,
                "idKecamatan": y[0].idKecamatan
            })
        }

    }])

    .controller('dataPokokGuruPerKecamatanAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
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
                if(response[i].filterKecamatanJenjang==='' || response[i].filterKecamatanJenjang===undefined){
                    var updateData = firebase.database(appGuru).ref("dataGuru/" + response[i].$id);
                    updateData.update(JSON.parse(JSON.stringify({
                        "filterKecamatanJenjang": response[i].idKecamatan + "_" + response[i].jenjang
                    }))).then(function (resp) {
                        console.log('success');
                    })
                }
                
            }
        });

        $scope.getDataJenjang = function (x, y) {
            $state.go("menuAdmin.dataPokokGuruPerJenjangAdmin", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": x
            })
        }

    }])

    .controller('dataPokokGuruPerJenjangAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
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
                if(response[i].filterKecamatanJenjangIdSekolah==="" || response[i].filterKecamatanJenjangIdSekolah===undefined){
                    var updateData = firebase.database(appGuru).ref("dataGuru/" + response[i].$id);
                    updateData.update(JSON.parse(JSON.stringify({
                        "filterKecamatanJenjangIdSekolah": response[i].idKecamatan + "_" + response[i].jenjang + "_" + response[i].idSekolah
                    }))).then(function (resp) {
                        console.log('success');
                    })
                }
            }
        });

        $scope.getDataSekolah = function (x, y) {
            $state.go("menuAdmin.dataGuruAdmin", {
                "idSekolah": y[0].idSekolah,
                "namaSekolah": x,
                "idKotaKabupaten": y[0].idKotaKabupaten,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": $scope.data.jenjang,
                "namaKecamatan": $scope.data.namaKecamatan,
            })
        }

    }])

    .controller('dataPokokSiswaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        // $scope.tambahSekolah = function () {
        //     $state.go("menuAdmin.dataSekolahTambahAdmin");
        // }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        $scope.siswa = [];
        var ref = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupaten);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            for(i=0; i<response.length; i++){
                $scope.siswa.push({
                    "namaKecamatan": response[i].namaKecamatan,
                    "idKecamatan": response[i].idKecamatan
                })
            }
            // $scope.dataSiswa = response
            $scope.totalSiswa = response.length;
            $scope.dataSiswaMuaraEnim = $scope.siswa.groupBy('namaKecamatan');
            console.log($scope.dataSiswaMuaraEnim);
        });

        $scope.getDataKecamatan = function (x, y) {
            $state.go("menuAdmin.dataPokokSiswaPerKecamatanAdmin", {
                "namaKecamatan": x,
                "idKecamatan": y[0].idKecamatan
            })
        }

    }])

    .controller('dataPokokSiswaPerKecamatanAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
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
            console.log($scope.dataSiswaMuaraEnim);
            for (i = 0; i < response.length; i++) {
                if(response[i].filterKecamatanJenjang==='' || response[i].filterKecamatanJenjang===undefined){
                    var updateData = firebase.database(appSiswa).ref("dataSiswa/" + response[i].$id);
                    updateData.update(JSON.parse(JSON.stringify({
                        "filterKecamatanJenjang": response[i].idKecamatan + "_" + response[i].jenjang
                    }))).then(function (resp) {
                        console.log('success');
                    })
                }
            }
        });

        $scope.getDataJenjang = function (x, y) {
            $state.go("menuAdmin.dataPokokSiswaPerJenjangAdmin", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": x
            })
        }

    }])

    .controller('dataPokokSiswaPerJenjangAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
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
            // console.log($scope.dataSiswaMuaraEnim);
            // console.log(response);
            for (i = 0; i < response.length; i++) {
                if(response[i].filterKecamatanJenjangIdSekolah==="" || response[i].filterKecamatanJenjangIdSekolah===undefined){
                    var updateData = firebase.database(appSiswa).ref("dataSiswa/" + response[i].$id);
                    updateData.update(JSON.parse(JSON.stringify({
                        "filterKecamatanJenjangIdSekolah": response[i].idKecamatan + "_" + response[i].jenjang + "_" + response[i].idSekolah
                    }))).then(function (resp) {
                        console.log('success');
                    })
                }
                
            }
        });

        $scope.getDataSekolah = function (x, y) {
            $state.go("menuAdmin.dataSiswaAdmin", {
                "idSekolah": y[0].idSekolah,
                "namaSekolah": x,
                "idKotaKabupaten": y[0].idKotaKabupaten,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": $scope.data.jenjang,
                "namaKecamatan": $scope.data.namaKecamatan,
            })
        }

    }])

    .controller('dataPokokRombelAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        // $scope.tambahSekolah = function () {
        //     $state.go("menuAdmin.dataSekolahTambahAdmin");
        // }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("dataKelas").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupaten);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataRombel = response
            $scope.totalRombel = response.length;
            $scope.dataRombelMuaraEnim = $scope.dataRombel.groupBy('namaKecamatan');
        });

        $scope.getDataKecamatan = function (x, y) {
            $state.go("menuAdmin.dataPokokRombelPerKecamatanAdmin", {
                "namaKecamatan": x,
                "idKecamatan": y[0].idKecamatan
            })
        }

    }])

    .controller('dataPokokRombelPerKecamatanAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
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
            $state.go("menuAdmin.dataPokokRombelPerJenjangAdmin", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": x
            })
        }

    }])

    .controller('dataPokokRombelPerJenjangAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
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
            $state.go("menuAdmin.dataKelasAdmin", {
                "idSekolah": y[0].idSekolah,
                "namaSekolah": x,
                "idKotaKabupaten": y[0].idKotaKabupaten,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": $scope.data.jenjang,
                "namaKecamatan": $scope.data.namaKecamatan,
            })
        }

    }])

    .controller('dataPokokPrasaranaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        // $scope.tambahSekolah = function () {
        //     $state.go("menuAdmin.dataSekolahTambahAdmin");
        // }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("dataPrasarana").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupaten);
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
            $state.go("menuAdmin.dataPokokPrasaranaPerKecamatanAdmin", {
                "namaKecamatan": x,
                "idKecamatan": y[0].idKecamatan
            })
        }

    }])

    .controller('dataPokokPrasaranaPerKecamatanAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
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
            $state.go("menuAdmin.dataPokokPrasaranaPerJenjangAdmin", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": x
            })
        }

    }])

    .controller('dataPokokPrasaranaPerJenjangAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
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
            $state.go("menuAdmin.dataPrasaranaAdmin", {
                "idSekolah": y[0].idSekolah,
                "namaSekolah": x,
                "idKotaKabupaten": y[0].idKotaKabupaten,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": $scope.data.jenjang,
                "namaKecamatan": $scope.data.namaKecamatan,
            })
        }

    }])

    .controller('dataPokokSaranaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        // $scope.tambahSekolah = function () {
        //     $state.go("menuAdmin.dataSekolahTambahAdmin");
        // }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database().ref("sarana").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupaten);
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
            $state.go("menuAdmin.dataPokokSaranaPerKecamatanAdmin", {
                "namaKecamatan": x,
                "idKecamatan": y[0].idKecamatan
            })
        }

    }])

    .controller('dataPokokSaranaPerKecamatanAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
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
            $state.go("menuAdmin.dataPokokSaranaPerJenjangAdmin", {
                "namaKecamatan": $scope.data.namaKecamatan,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": x
            })
        }

    }])

    .controller('dataPokokSaranaPerJenjangAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        // console.log($scope.hakAkses)

        if (!$scope.idAdmin) {
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
            $state.go("menuAdmin.dataSaranaAdmin", {
                "idSekolah": y[0].idSekolah,
                "namaSekolah": x,
                "idKotaKabupaten": y[0].idKotaKabupaten,
                "idKecamatan": $scope.data.idKecamatan,
                "jenjang": $scope.data.jenjang,
                "namaKecamatan": $scope.data.namaKecamatan,
            })
        }

    }])