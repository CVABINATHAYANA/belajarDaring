angular.module('app.absensiGuru', [])

    .controller('absensiSiswaGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah');
        $scope.npsn = localStorage.getItem('npsn');

        console.log($scope.idSekolahGuru);

        // LOADBALANCING
        if ($scope.idSekolahGuru === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolahGuru === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.tambah = function () {
            $state.go("menuGuru.absensiSiswaTambahGuru");
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        index = 0;
        var ref = firebase.database(app).ref("groupAbsensiSiswa").orderByChild("idGuru").equalTo($scope.idGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.absensiSiswa = response
            // $scope.absensiSiswa = $scope.dataAbsensiSiswa.groupBy('groupAbsensi');
            console.log($scope.absensiSiswa)
            for (let i = 0; i < response.length; i++) {
                index = index + 1;
                console.log(index);
                console.log(response[i].$id);
                var groupAbsensiSiswa = firebase.database().ref("groupAbsensiSiswa/"+response[i].$id);
                groupAbsensiSiswa.set({
                    "groupAbsensi": response[i].groupAbsensi,
                    "hariAbsensi":response[i].hariAbsensi,
                    "idGuru": response[i].idGuru,
                    "idKecamatan": response[i].idKecamatan,
                    "idKelas": response[i].idKelas,
                    "idKotaKabupaten": response[i].idKotaKabupaten,
                    "idPelajaran": response[i].idPelajaran,
                    "idPembuat": response[i].idPembuat,
                    "idProvinsi": response[i].idProvinsi,
                    "idSekolah": response[i].idSekolah,
                    "idSemester": response[i].idSemester,
                    "idTahunAjaran": response[i].idTahunAjaran,
                    "jamAbsensi": response[i].jamAbsensi,
                    "jenjang": response[i].jenjang,
                    "namaGuru": response[i].namaGuru,
                    "namaKecamatan": response[i].namaKecamatan,
                    "namaKelas":response[i].namaKelas,
                    "namaKotaKabupaten": response[i].namaKotaKabupaten,
                    "namaProvinsi": response[i].namaProvinsi,
                    "namaSekolah": response[i].namaSekolah,
                    "pelajaran": response[i].pelajaran,
                    "semester": response[i].semester,
                    "tahunAjaran": response[i].tahunAjaran,
                    "tanggalAbsensi": response[i].tanggalAbsensi,
                    "tanggalDisplay": response[i].tanggalDisplay,
                    "totalSiswa":response[i].totalSiswa,

                }).then(function (ok) {
                    console.log('Ok')
                })

            }

        });

        $scope.getData = function (data, absensiSiswa) {
            $ionicActionSheet.show({
                titleText: 'Data Absensi : ' + data.groupAbsensi,
                buttons: [
                    { text: '<i class="icon ion-edit"></i> Edit Absensi ' },
                    { text: '<i class="icon ion-social-buffer"></i> Lihat Absensi' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Absensi',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        var getAbs = firebase.database(app).ref("absensiSiswa").orderByChild("groupAbsensi").equalTo(data.groupAbsensi);
                        var listGetAbs = $firebaseArray(getAbs);
                        $ionicLoading.show();
                        listGetAbs.$loaded().then(function (response) {
                            $ionicLoading.hide();
                            $state.go("menuGuru.absensiSiswaEditGuru", {
                                "groupAbsensi": data.groupAbsensi,
                                "tahunAjaran": data.tahunAjaran,
                                "semester": data.semester,
                                "pelajaran": data.pelajaran,
                                "namaGuru": data.namaGuru,
                                "namaKelas": data.namaKelas,
                                "tanggalDisplay": data.tanggalDisplay,
                                "namaSekolah": data.namaSekolah,
                                "dataGetAbs": response,
                            })
                        })
                    }
                    if (index === 1) {
                        var getAbs = firebase.database(app).ref("absensiSiswa").orderByChild("groupAbsensi").equalTo(data.groupAbsensi);
                        var listGetAbs = $firebaseArray(getAbs);
                        $ionicLoading.show();
                        listGetAbs.$loaded().then(function (response) {
                            $ionicLoading.hide();
                            $scope.dataGetAbs = response;
                            // console.log( 'TES RESPONSE '  + response);
                            $scope.absensiByGroup = $scope.dataGetAbs.groupBy('keterangan');

                            $state.go("menuGuru.absensiSiswaLihatGuru", {
                                "groupAbsensi": data.groupAbsensi,
                                "tahunAjaran": data.tahunAjaran,
                                "semester": data.semester,
                                "pelajaran": data.pelajaran,
                                "namaGuru": data.namaGuru,
                                "namaKelas": data.namaKelas,
                                "tanggalDisplay": data.tanggalDisplay,
                                "namaSekolah": data.namaSekolah,
                                "dataGetAbs": response,
                                "absensiByGroup": $scope.absensiByGroup
                            })
                        })
                    }
                    return true;
                },

                destructiveButtonClicked: function () {

                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                        okType: "button-positive",
                    });
                    confirmPopup.then(function (res) {
                        if (res) {
                            $ionicLoading.show();
                            var refObj = firebase.database(app).ref("absensiSiswa/").orderByChild("groupAbsensi").equalTo(data.groupAbsensi);
                            var objDelete = $firebaseArray(refObj);
                            objDelete.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {
                                    var hapusData = firebase.database(app).ref("absensiSiswa/" + response[i].$id);
                                    var objDelete = $firebaseObject(hapusData);
                                    objDelete.$remove().then(function (ref) {
                                        $ionicLoading.hide();
                                        console.log('Data Berhasil Dihapus');
                                        // window.location.reload(true);

                                    });
                                }
                            })

                            var objGroup = firebase.database(app).ref("groupAbsensiSiswa").orderByChild("groupAbsensi").equalTo(data.groupAbsensi);
                            var listObjGroup = $firebaseArray(objGroup);
                            listObjGroup.$loaded().then(function (hapus) {
                                var id = hapus[0].$id;

                                var objHapus = firebase.database(app).ref("groupAbsensiSiswa/" + id);
                                var objHapusData = $firebaseObject(objHapus);
                                objHapusData.$remove().then(function (yes) {
                                    $ionicLoading.hide()
                                    console.log("terhapus")
                                })
                            })

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

    .controller('absensiSiswaTambahGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')


        // LOADBALANCING
        if ($scope.idSekolahGuru === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolahGuru === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        var dataGuruRealTime = firebase.database(appGuru).ref("dataGuru/" + $scope.idGuru);
        $ionicLoading.show();
        dataGuruRealTime.on("value", function (snapshot) {
            $ionicLoading.hide();
            $scope.namaProvinsi = snapshot.val().namaProvinsi;
            $scope.namaKotaKabupaten = snapshot.val().namaKotaKabupaten;
            $scope.namaKecamatan = snapshot.val().namaKecamatan;
            $scope.namaSekolah = snapshot.val().namaSekolah;
        });

        $scope.formData = {
            "tanggal": new Date(),
            "idTahunAjaran": '',
            "idSemester": '',
            "idKelas": '',
            "idPelajaran": '',

        }

        var refTahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        $scope.tahunAjaran = $firebaseArray(refTahunAjaran);

        $scope.getTahunAjaran = function () {
            var getDataTahunAjaran = firebase.database().ref("tahunAjaran/" + $scope.formData.idTahunAjaran);
            getDataTahunAjaran.on("value", function (snapshot) {
                $scope.dataTahunAjaran = snapshot.val().tahunAjaran
            });

            Array.prototype.groupBy = function (prop) {
                return this.reduce(function (groups, item) {
                    const val = item[prop]
                    groups[val] = groups[val] || []
                    groups[val].push(item)
                    return groups
                }, {})
            }

            var refKelas = firebase.database(app).ref("jadwalPelajaran/").orderByChild("filterGuru").equalTo($scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran);
            var listRefKelas = $firebaseArray(refKelas);
            listRefKelas.$loaded().then(function (response) {
                $scope.datanya = response
                $scope.dataKelas = $scope.datanya.groupBy('namaKelas');
                console.log($scope.dataKelas);
            })

        }

        var refSemester = firebase.database().ref("semester").orderByChild("aktif").equalTo(true);
        $scope.semester = $firebaseArray(refSemester);

        $scope.getSemester = function () {
            var dataSemester = firebase.database().ref("semester/" + $scope.formData.idSemester);
            dataSemester.on("value", function (snapshot) {
                $scope.dataSemester = snapshot.val().semester;
            })
        }

        $scope.getKelas = function () {
            $scope.dataAbsensi = [];
            $scope.tampil = true;

            var dataKelasNya = firebase.database().ref("dataKelas/" + $scope.formData.idKelas);
            dataKelasNya.on("value", function (snapshot) {
                $scope.namaKelas = snapshot.val().namaKelas;

                if (snapshot.val().jenisRombel === 'Lintas Minat') {
                    var refSiswa = firebase.database(appSiswa).ref("lintasMinat").orderByChild("idKelas").equalTo($scope.formData.idKelas);
                    listRefSiswa = $firebaseArray(refSiswa);
                    $ionicLoading.show();
                    listRefSiswa.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.dataSiswa = response;
                        // console.log($scope.dataSiswa);
                    })
                }
                else {
                    var refSiswa = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.formData.idKelas);
                    listRefSiswa = $firebaseArray(refSiswa);
                    $ionicLoading.show();
                    listRefSiswa.$loaded().then(function (response) {
                        $ionicLoading.hide();
                        $scope.dataSiswa = response;
                        // console.log($scope.dataSiswa);
                    })
                }

            })



            // console.log($scope.formData.idKelas);
            Array.prototype.groupBy = function (prop) {
                return this.reduce(function (groups, item) {
                    const val = item[prop]
                    groups[val] = groups[val] || []
                    groups[val].push(item)
                    return groups
                }, {})
            }

            var refKelas = firebase.database(app).ref("jadwalPelajaran/").orderByChild("filterPelajaran").equalTo($scope.idSekolahGuru + "_" + $scope.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.idKelas);
            var listRefKelas = $firebaseArray(refKelas);
            listRefKelas.$loaded().then(function (response) {
                $scope.datanya = response
                $scope.dataPelajaran = $scope.datanya.groupBy('pelajaran');
                // console.log($scope.dataPelajaran);
            })
        }

        $scope.dataAbsensi = [];
        $scope.getPelajaran = function () {
            var refPelajaran = firebase.database().ref("mataPelajaran/" + $scope.formData.idPelajaran);
            refPelajaran.on("value", function (snapshot) {
                $scope.pelajaran = snapshot.val().pelajaran;

                var dataKelasNya = firebase.database().ref("dataKelas/" + $scope.formData.idKelas);
                dataKelasNya.on("value", function (snapshot) {
                    $scope.namaKelas = snapshot.val().namaKelas;

                    if (snapshot.val().jenisRombel === 'Lintas Minat') {
                        var refSiswa = firebase.database(appSiswa).ref("lintasMinat").orderByChild("idKelas").equalTo($scope.formData.idKelas);
                        listRefSiswa = $firebaseArray(refSiswa);
                        $ionicLoading.show();
                        listRefSiswa.$loaded().then(function (response) {
                            $ionicLoading.hide();
                            $scope.dataSiswa = response;
                            var tanggalAbsensi = $filter('date')($scope.formData.tanggal, 'yyyy-MM-dd');
                            var hariAbsensi = $filter('date')(new (Date), 'EEEE');
                            var jamAbsensi = $filter('date')(new (Date), 'HH:mm:ss');
                            for (i = 0; i < response.length; i++) {
                                $scope.dataAbsensi.push({
                                    "idSiswa": response[i].idSiswa,
                                    "namaSiswa": response[i].namaPengguna,
                                    "keterangan": 'Masuk',

                                    "idProvinsi": $scope.idProvinsiGuru,
                                    "namaProvinsi": $scope.namaProvinsi,

                                    "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                                    "namaKotaKabupaten": $scope.namaKotaKabupaten,

                                    "idKecamatan": $scope.idKecamatanGuru,
                                    "namaKecamatan": $scope.namaKecamatan,

                                    "jenjang": $scope.jenjangGuru,
                                    "idSekolah": $scope.idSekolahGuru,
                                    "namaSekolah": $scope.namaSekolah,

                                    "idGuru": $scope.idGuru,
                                    "namaGuru": $scope.namaGuru,

                                    "idTahunAjaran": $scope.formData.idTahunAjaran,
                                    "tahunAjaran": $scope.dataTahunAjaran,
                                    "idSemester": $scope.formData.idSemester,
                                    "semester": $scope.dataSemester,
                                    "idKelas": $scope.formData.idKelas,
                                    "namaKelas": $scope.namaKelas,
                                    "idPelajaran": $scope.formData.idPelajaran,
                                    "pelajaran": $scope.pelajaran,

                                    "tanggalAbsensi": tanggalAbsensi,
                                    "hariAbsensi": hariAbsensi,
                                    "jamAbsensi": jamAbsensi
                                })
                            }
                        })
                    }
                    else {
                        var refSiswa = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.formData.idKelas);
                        listRefSiswa = $firebaseArray(refSiswa);
                        $ionicLoading.show();
                        listRefSiswa.$loaded().then(function (response) {
                            $ionicLoading.hide();
                            var tanggalAbsensi = $filter('date')($scope.formData.tanggal, 'yyyy-MM-dd');
                            var hariAbsensi = $filter('date')(new (Date), 'EEEE');
                            var jamAbsensi = $filter('date')(new (Date), 'HH:mm:ss');
                            for (i = 0; i < response.length; i++) {
                                $scope.dataAbsensi.push({
                                    "idSiswa": response[i].$id,
                                    "namaSiswa": response[i].namaPengguna,
                                    "keterangan": 'Masuk',

                                    "idProvinsi": $scope.idProvinsiGuru,
                                    "namaProvinsi": $scope.namaProvinsi,

                                    "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                                    "namaKotaKabupaten": $scope.namaKotaKabupaten,

                                    "idKecamatan": $scope.idKecamatanGuru,
                                    "namaKecamatan": $scope.namaKecamatan,

                                    "jenjang": $scope.jenjangGuru,
                                    "idSekolah": $scope.idSekolahGuru,
                                    "namaSekolah": $scope.namaSekolah,

                                    "idGuru": $scope.idGuru,
                                    "namaGuru": $scope.namaGuru,

                                    "idTahunAjaran": $scope.formData.idTahunAjaran,
                                    "tahunAjaran": $scope.dataTahunAjaran,
                                    "idSemester": $scope.formData.idSemester,
                                    "semester": $scope.dataSemester,
                                    "idKelas": $scope.formData.idKelas,
                                    "namaKelas": $scope.namaKelas,
                                    "idPelajaran": $scope.formData.idPelajaran,
                                    "pelajaran": $scope.pelajaran,

                                    "tanggalAbsensi": tanggalAbsensi,
                                    "hariAbsensi": hariAbsensi,
                                    "jamAbsensi": jamAbsensi
                                })
                            }
                        })
                    }

                })
                // console.log($scope.dataAbsensi)
            })
        }

        // $scope.dataAbsensi = [];
        // $scope.getAbsensi = function (data, $index) {

        //     if (data.jenisRombel === 'Lintas Minat') {
        //         var idSiswaSekarang = data.idSiswa;
        //     }
        //     else {
        //         var idSiswaSekarang = data.$id;
        //     }

        //     var tanggalAbsensi = $filter('date')($scope.formData.tanggal, 'yyyy-MM-dd');
        //     var hariAbsensi = $filter('date')(new (Date), 'EEEE');
        //     var jamAbsensi = $filter('date')(new (Date), 'HH:mm:ss');
        //     var keterangan = $scope.formData.absensi[$index];
        //     // console.log("valuenya", keterangan);

        //     if ($scope.dataAbsensi.length === 0) {
        //         $scope.dataAbsensi.push({
        //             "idSiswa": idSiswaSekarang,
        //             "namaSiswa": data.namaPengguna,
        //             "keterangan": keterangan,

        //             "idProvinsi": $scope.idProvinsiGuru,
        //             "namaProvinsi": $scope.namaProvinsi,

        //             "idKotaKabupaten": $scope.idKotaKabupatenGuru,
        //             "namaKotaKabupaten": $scope.namaKotaKabupaten,

        //             "idKecamatan": $scope.idKecamatanGuru,
        //             "namaKecamatan": $scope.namaKecamatan,

        //             "jenjang": $scope.jenjangGuru,
        //             "idSekolah": $scope.idSekolahGuru,
        //             "namaSekolah": $scope.namaSekolah,

        //             "idGuru": $scope.idGuru,
        //             "namaGuru": $scope.namaGuru,

        //             "idTahunAjaran": $scope.formData.idTahunAjaran,
        //             "tahunAjaran": $scope.dataTahunAjaran,
        //             "idSemester": $scope.formData.idSemester,
        //             "semester": $scope.dataSemester,
        //             "idKelas": $scope.formData.idKelas,
        //             "namaKelas": $scope.namaKelas,
        //             "idPelajaran": $scope.formData.idPelajaran,
        //             "pelajaran": $scope.pelajaran,

        //             "tanggalAbsensi": tanggalAbsensi,
        //             "hariAbsensi": hariAbsensi,
        //             "jamAbsensi": jamAbsensi
        //         })
        //     }
        //     else if ($scope.dataAbsensi.length > 0) {
        //         var idSiswa = data.$id;
        //         var objIndex = $scope.dataAbsensi.map(function (obj) { return obj.idSiswa; }).indexOf(idSiswa);
        //         // console.log("data indexnya : " + objIndex);
        //         if (objIndex < 0) {
        //             $scope.dataAbsensi.push({
        //                 "idSiswa": idSiswaSekarang,
        //                 "namaSiswa": data.namaPengguna,
        //                 "keterangan": keterangan,

        //                 "idSiswa": idSiswaSekarang,
        //                 "namaSiswa": data.namaPengguna,
        //                 "keterangan": keterangan,

        //                 "idProvinsi": $scope.idProvinsiGuru,
        //                 "namaProvinsi": $scope.namaProvinsi,

        //                 "idKotaKabupaten": $scope.idKotaKabupatenGuru,
        //                 "namaKotaKabupaten": $scope.namaKotaKabupaten,

        //                 "idKecamatan": $scope.idKecamatanGuru,
        //                 "namaKecamatan": $scope.namaKecamatan,

        //                 "jenjang": $scope.jenjangGuru,
        //                 "idSekolah": $scope.idSekolahGuru,
        //                 "namaSekolah": $scope.namaSekolah,

        //                 "idGuru": $scope.idGuru,
        //                 "namaGuru": $scope.namaGuru,

        //                 "idTahunAjaran": $scope.formData.idTahunAjaran,
        //                 "tahunAjaran": $scope.dataTahunAjaran,
        //                 "idSemester": $scope.formData.idSemester,
        //                 "semester": $scope.dataSemester,
        //                 "idKelas": $scope.formData.idKelas,
        //                 "namaKelas": $scope.namaKelas,
        //                 "idPelajaran": $scope.formData.idPelajaran,
        //                 "pelajaran": $scope.pelajaran,

        //                 "tanggalAbsensi": tanggalAbsensi,
        //                 "hariAbsensi": hariAbsensi,
        //                 "jamAbsensi": jamAbsensi
        //             })
        //         }
        //         else {
        //             $scope.dataAbsensi[objIndex].keterangan = keterangan;
        //         }
        //     }
        //     // console.log($scope.dataAbsensi);
        // };

        $scope.simpan = function () {
            var tanggalAbsensi = $filter('date')($scope.formData.tanggal, 'yyyy-MM-dd');
            var hariAbsensi = $filter('date')(new (Date), 'EEEE');
            var jamAbsensi = $filter('date')(new (Date), 'HH:mm:ss');

            var groupAbsensi = $filter('date')($scope.formData.tanggal, 'yyyyMMddHHmmss');
            var tanggalDisplay = $filter('date')($scope.formData.tanggal, 'dd-MM-yyyy');
            if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.idGuru !== '' && $scope.formData.idTahunAjaran !== '' && $scope.formData.idSemester !== '' && $scope.formData.idKelas !== '' && $scope.formData.idPelajaran !== "") {
                if ($scope.dataAbsensi.length === $scope.dataSiswa.length) {
                    $ionicLoading.show();
                    var groupAbsensiSiswa = firebase.database(app).ref("groupAbsensiSiswa");
                    groupAbsensiSiswa.push({
                        "idProvinsi": $scope.idProvinsiGuru,
                        "namaProvinsi": $scope.namaProvinsi,
                        "idKotaKabupaten": $scope.idKotaKabupatenGuru,
                        "namaKotaKabupaten": $scope.namaKotaKabupaten,
                        "idKecamatan": $scope.idKecamatanGuru,
                        "namaKecamatan": $scope.namaKecamatan,
                        "jenjang": $scope.jenjangGuru,
                        "idSekolah": $scope.idSekolahGuru,
                        "namaSekolah": $scope.namaSekolah,
                        "idGuru": $scope.idGuru,
                        "namaGuru": $scope.namaGuru,

                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.dataTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.dataSemester,
                        "idKelas": $scope.formData.idKelas,
                        "namaKelas": $scope.namaKelas,
                        "idPelajaran": $scope.formData.idPelajaran,
                        "pelajaran": $scope.pelajaran,

                        "tanggalAbsensi": tanggalAbsensi,
                        "tanggalDisplay": tanggalDisplay,
                        "hariAbsensi": hariAbsensi,
                        "jamAbsensi": jamAbsensi,
                        "groupAbsensi": groupAbsensi + $scope.idGuru,
                        "totalSiswa": $scope.dataAbsensi.length,
                        "idPembuat": $scope.idGuru
                    }).then(function (ok) {
                        for (i = 0; i < $scope.dataAbsensi.length; i++) {
                            var insertData = firebase.database(app).ref("absensiSiswa");
                            insertData.push({
                                "idSiswa": $scope.dataAbsensi[i].idSiswa,
                                "namaSiswa": $scope.dataAbsensi[i].namaSiswa,
                                "keterangan": $scope.dataAbsensi[i].keterangan,

                                "idProvinsi": $scope.dataAbsensi[i].idProvinsi,
                                "namaProvinsi": $scope.dataAbsensi[i].namaProvinsi,
                                "idKotaKabupaten": $scope.dataAbsensi[i].idKotaKabupaten,
                                "namaKotaKabupaten": $scope.dataAbsensi[i].namaKotaKabupaten,
                                "idKecamatan": $scope.dataAbsensi[i].idKecamatan,
                                "namaKecamatan": $scope.dataAbsensi[i].namaKecamatan,
                                "jenjang": $scope.dataAbsensi[i].jenjang,
                                "idSekolah": $scope.dataAbsensi[i].idSekolah,
                                "namaSekolah": $scope.dataAbsensi[i].namaSekolah,
                                "idGuru": $scope.dataAbsensi[i].idGuru,
                                "namaGuru": $scope.dataAbsensi[i].namaGuru,

                                "idTahunAjaran": $scope.dataAbsensi[i].idTahunAjaran,
                                "tahunAjaran": $scope.dataAbsensi[i].tahunAjaran,
                                "idSemester": $scope.dataAbsensi[i].idSemester,
                                "semester": $scope.dataAbsensi[i].semester,
                                "idKelas": $scope.dataAbsensi[i].idKelas,
                                "namaKelas": $scope.dataAbsensi[i].namaKelas,
                                "idPelajaran": $scope.dataAbsensi[i].idPelajaran,
                                "pelajaran": $scope.dataAbsensi[i].pelajaran,

                                "tanggalAbsensi": $scope.dataAbsensi[i].tanggalAbsensi,
                                "tanggalDisplay": tanggalDisplay,
                                "hariAbsensi": $scope.dataAbsensi[i].hariAbsensi,
                                "jamAbsensi": $scope.dataAbsensi[i].jamAbsensi,
                                "groupAbsensi": groupAbsensi + $scope.dataAbsensi[i].idGuru,
                                "idPembuat": $scope.idGuru
                            }).then(function (resp) {
                                $ionicLoading.hide();
                                $state.go("menuGuru.absensiSiswaGuru");

                            })
                        }
                    })

                }
                else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Masih ada beberapa siswa yang belum Anda absen, silahkan cek kembali, terimakasih',
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
        }

    }])

    .controller('absensiSiswaLihatGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        // LOADBALANCING
        if ($scope.idSekolahGuru === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolahGuru === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }
        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "groupAbsensi": $stateParams.groupAbsensi,
            "tahunAjaran": $stateParams.tahunAjaran,
            "semester": $stateParams.semester,
            "pelajaran": $stateParams.pelajaran,
            "namaGuru": $stateParams.namaGuru,
            "namaKelas": $stateParams.namaKelas,
            "tanggalDisplay": $stateParams.tanggalDisplay,
            "namaSekolah": $stateParams.namaSekolah,
            "dataGetAbs": $stateParams.dataGetAbs,
            "absensiByGroup": $stateParams.absensiByGroup
        }

        // console.log($scope.data.groupAbsensi)

        $scope.dataGetAbs = $scope.data.dataGetAbs;
        $scope.absensiByGroup = $scope.data.absensiByGroup;
        // Untuk Print Data Nilai
        var wb = XLSX.read($scope.dataGetAbs, { type: "array" });
        var d = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

        $scope.excel = function () {
            console.log("d", d)
            var wb = XLSX.utils.table_to_book(document.getElementById('danu-table'));
            XLSX.writeFile(wb, "Absensi" +$scope.data.tanggalDisplay+ "_"+ $scope.data.namaKelas+ "_" + $scope.data.pelajaran + ".xlsx");
        }
    }])

    .controller('absensiSiswaEditGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')


        // LOADBALANCING
        if ($scope.idSekolahGuru === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolahGuru === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }


        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "groupAbsensi": $stateParams.groupAbsensi,
            "tahunAjaran": $stateParams.tahunAjaran,
            "semester": $stateParams.semester,
            "pelajaran": $stateParams.pelajaran,
            "namaGuru": $stateParams.namaGuru,
            "namaKelas": $stateParams.namaKelas,
            "tanggalDisplay": $stateParams.tanggalDisplay,
            "namaSekolah": $stateParams.namaSekolah,
            "dataGetAbs": $stateParams.dataGetAbs,
            "absensiByGroup": $stateParams.absensiByGroup
        }

        $scope.dataSiswa = $scope.data.dataGetAbs;

        $scope.getAbsensi = function (data) {
            var refAbsensi = firebase.database(app).ref("absensiSiswa/" + data.$id);
            refAbsensi.update({
                "keterangan": data.keterangan
            }).then(function (resp) {
                console.log("updated");
            })
        }

        $scope.simpan = function () {
            $state.go("menuGuru.absensiSiswaGuru")
        }

    }])
