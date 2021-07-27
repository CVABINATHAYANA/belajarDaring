angular.module('app.absensiAdmin', [])

    .controller('absensiSiswaPerKecamatanAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');

        if (!$scope.idAdmin) {
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


        var dataKecamatan = firebase.database().ref("groupAbsensiSiswa").orderByChild("idKotaKabupaten").equalTo("id-buleleng");
        var listDataKecamatan = $firebaseArray(dataKecamatan);
        listDataKecamatan.$loaded().then(function(response){
            $scope.groupKecamatan = response;
            $scope.absensiPerKecamatan = $scope.groupKecamatan.groupBy('namaKecamatan');
            console.log($scope.absensiPerKecamatan);

        })

        $scope.getData = function (x,y) {
            // $state.go("menuAdmin.jadwalPelajaranPerKecamatanAdmin", {
            //     "namaKecamatan": x,
            //     "idKecamatan": y[0].idKecamatan,
            //     "jumlahGuru": y.length,
            // })
        }
        // $scope.loadMore = function () {
        //     var ref = firebase.database().ref("groupAbsensiSiswa").orderByChild("idSekolah").equalTo($scope.data.idSekolah).limitToLast($scope.count += 100);
        //     var listRef = $firebaseArray(ref);
        //     $ionicLoading.show();
        //     listRef.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         $scope.absensiSiswa = response
        //         console.log($scope.absensiSiswa);
        //         console.log("inilahDatanya", $scope.count)

        //         if ($scope.absensiSiswa.length === $scope.banyakData) {
        //             $scope.noMoreItemsAvailable = true;
        //             console.log("totalDataTerakhir", $scope.banyakData);
        //         }
        //         $scope.$broadcast('scroll.infiniteScrollComplete');
        //     });
        // }

    }])
    .controller('absensiSiswaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
        }
        console.log($scope.data.idSekolah)

        $scope.tambah = function () {
            $state.go("menuAdmin.absensiSiswaTambahAdmin");
        }

        $scope.totalAbsensi = []
        var dataAbsensiSiswa = firebase.database().ref("groupAbsensiSiswa").orderByChild("idSekolah").equalTo($scope.data.idSekolah);
        var listDataAbsensiSiswa = $firebaseArray(dataAbsensiSiswa);
        listDataAbsensiSiswa.$loaded().then(function (response) {
            for (i = 0; i < response.length; i++) {
                $scope.totalAbsensi.push({
                    "id": response[i].$id,
                })
            }
            $scope.banyakData = $scope.totalAbsensi.length
        })

        $scope.count = 0;
        $scope.loadMore = function () {
            var ref = firebase.database().ref("groupAbsensiSiswa").orderByChild("idSekolah").equalTo($scope.data.idSekolah).limitToLast($scope.count += 100);
            var listRef = $firebaseArray(ref);
            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.absensiSiswa = response
                console.log($scope.absensiSiswa);
                console.log("inilahDatanya", $scope.count)

                if ($scope.absensiSiswa.length === $scope.banyakData) {
                    $scope.noMoreItemsAvailable = true;
                    console.log("totalDataTerakhir", $scope.banyakData);
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

        $scope.getData = function (data) {

            $ionicActionSheet.show({
                titleText: 'Data Absensi : ' + data.groupAbsensi,
                buttons: [
                    { text: '<i class="icon ion-social-buffer"></i> Lihat Absensi' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Absensi',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go("menuAdmin.absensiSiswaLihatAdmin", {
                            "groupAbsensi": data.groupAbsensi
                        })
                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    if ($scope.hakAkses === "Super Admin") {
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Hapus Data',
                            template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                            okType: "button-positive",
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                $ionicLoading.show();
                                var refObj = firebase.database(appAbsensi).ref("absensiSiswa/").orderByChild("groupAbsensi").equalTo(data.groupAbsensi);
                                var objDelete = $firebaseArray(refObj);
                                objDelete.$loaded().then(function (response) {
                                    for (i = 0; i < response.length; i++) {
                                        var hapusData = firebase.database(appAbsensi).ref("absensiSiswa/" + response[i].$id);
                                        var objDelete = $firebaseObject(hapusData);
                                        objDelete.$remove().then(function (ref) {
                                            $ionicLoading.hide();
                                            console.log('Data Berhasil Dihapus');
                                            // window.location.reload(true);

                                        });
                                    }
                                })

                                var objGroup = firebase.database(appAbsensi).ref("groupAbsensiSiswa").orderByChild("groupAbsensi").equalTo(data.groupAbsensi);
                                var listObjGroup = $firebaseArray(objGroup);
                                listObjGroup.$loaded().then(function (hapus) {
                                    console.log(hapus)
                                    var id = hapus[0].$id;

                                    var objHapus = firebase.database(appAbsensi).ref("groupAbsensiSiswa/" + id);
                                    var objHapusData = $firebaseObject(objHapus);
                                    objHapusData.$remove().then(function (yes) {
                                        $ionicLoading.hide();
                                        console.log("terhapus")
                                    })
                                })

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

    .controller('absensiSiswaTambahAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "idProvinsi": '',
            "idKotaKabupaten": '',
            "idKecamatan": '',
            "jenjang": '',
            "idSekolah": '',
            "idGuru": '',
            "tanggal": new Date(),
            "idTahunAjaran": '',
            "idSemester": '',
            "idKelas": '',
            "idPelajaran": '',

        }

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
                // for (i = 0; i < response.length; i++) {
                //     var updateData = firebase.database().ref("dataSekolahIndonesia/" + response[i].$id);
                //     updateData.update({
                //         "filter": response[i].id_kecamatan + "_" + response[i].jenjang
                //     }).then(function (resp) {
                //         $ionicLoading.hide();
                //     })
                // }

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

            var refGuru = firebase.database(appGuru).ref("dataGuru").orderByChild("idSekolah").equalTo(idSekolah);
            var listRefGuru = $firebaseArray(refGuru);
            $ionicLoading.show();
            listRefGuru.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataGuru = response;
            })

            var refKelas = firebase.database().ref("dataKelas/").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
            $scope.dataKelas = $firebaseArray(refKelas);
        };

        $scope.getGuru = function () {
            var refDataGuru = firebase.database(appGuru).ref("dataGuru/" + $scope.formData.idGuru);
            refDataGuru.on("value", function (snapshot) {
                $scope.namaGuru = snapshot.val().namaPengguna;
            });

            Array.prototype.groupBy = function (prop) {
                return this.reduce(function (groups, item) {
                    const val = item[prop]
                    groups[val] = groups[val] || []
                    groups[val].push(item)
                    return groups
                }, {})
            }

            var refKelas = firebase.database(appJadwalPelajaran).ref("jadwalPelajaran/").orderByChild("filterGuru").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran);
            var listRefKelas = $firebaseArray(refKelas);
            listRefKelas.$loaded().then(function (response) {
                $scope.datanya = response
                $scope.dataKelas = $scope.datanya.groupBy('namaKelas');
                console.log($scope.dataKelas);
            })
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

            var refKelas = firebase.database().ref("jadwalPelajaran/").orderByChild("filterGuru").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran);
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
            })

            var refSiswa = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.formData.idKelas);
            listRefSiswa = $firebaseArray(refSiswa);
            $ionicLoading.show();
            listRefSiswa.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataSiswa = response;
                // console.log($scope.dataSiswa);
            })

            console.log($scope.formData.idKelas);
            Array.prototype.groupBy = function (prop) {
                return this.reduce(function (groups, item) {
                    const val = item[prop]
                    groups[val] = groups[val] || []
                    groups[val].push(item)
                    return groups
                }, {})
            }

            var refKelas = firebase.database(appJadwalPelajaran).ref("jadwalPelajaran/").orderByChild("filterPelajaran").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.idKelas);
            var listRefKelas = $firebaseArray(refKelas);
            listRefKelas.$loaded().then(function (response) {
                $scope.datanya = response
                $scope.dataPelajaran = $scope.datanya.groupBy('pelajaran');
                console.log($scope.dataPelajaran);
            })
        }

        $scope.getPelajaran = function () {
            var refPelajaran = firebase.database().ref("mataPelajaran/" + $scope.formData.idPelajaran);
            refPelajaran.on("value", function (snapshot) {
                $scope.pelajaran = snapshot.val().pelajaran
            })
        }

        $scope.dataAbsensi = [];
        $scope.getAbsensi = function (data, $index) {

            var tanggalAbsensi = $filter('date')($scope.formData.tanggal, 'yyyy-MM-dd');
            var hariAbsensi = $filter('date')(new (Date), 'EEEE');
            var jamAbsensi = $filter('date')(new (Date), 'HH:mm:ss');
            var keterangan = $scope.formData.absensi[$index];
            // console.log("valuenya", keterangan);

            if ($scope.dataAbsensi.length === 0) {
                $scope.dataAbsensi.push({
                    "idSiswa": data.$id,
                    "namaSiswa": data.namaPengguna,
                    "keterangan": keterangan,

                    "idProvinsi": $scope.formData.idProvinsi,
                    "namaProvinsi": $scope.namaProvinsi,
                    "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                    "namaKotaKabupaten": $scope.namaKotaKabupaten,
                    "idKecamatan": $scope.formData.idKecamatan,
                    "namaKecamatan": $scope.namaKecamatan,
                    "jenjang": $scope.formData.jenjang,
                    "idSekolah": $scope.formData.idSekolah,
                    "namaSekolah": $scope.namaSekolah,
                    "idGuru": $scope.formData.idGuru,
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
            else if ($scope.dataAbsensi.length > 0) {
                var idSiswa = data.$id;
                var objIndex = $scope.dataAbsensi.map(function (obj) { return obj.idSiswa; }).indexOf(idSiswa);
                console.log("data indexnya : " + objIndex);
                if (objIndex < 0) {
                    $scope.dataAbsensi.push({
                        "idSiswa": data.$id,
                        "namaSiswa": data.namaPengguna,
                        "keterangan": keterangan,

                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.namaProvinsi,
                        "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                        "namaKotaKabupaten": $scope.namaKotaKabupaten,
                        "idKecamatan": $scope.formData.idKecamatan,
                        "namaKecamatan": $scope.namaKecamatan,
                        "jenjang": $scope.formData.jenjang,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "idGuru": $scope.formData.idGuru,
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
                else {
                    $scope.dataAbsensi[objIndex].keterangan = keterangan;
                }
            }
            console.log($scope.dataAbsensi);
        };

        $scope.simpan = function () {

            var tanggalAbsensi = $filter('date')($scope.formData.tanggal, 'yyyy-MM-dd');
            var hariAbsensi = $filter('date')(new (Date), 'EEEE');
            var jamAbsensi = $filter('date')(new (Date), 'HH:mm:ss');
            var groupAbsensi = $filter('date')($scope.formData.tanggal, 'yyyyMMddHHmmss');
            var tanggalDisplay = $filter('date')($scope.formData.tanggal, 'dd-MM-yyyy');
            if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.idGuru !== '' && $scope.formData.idTahunAjaran !== '' && $scope.formData.idSemester !== '' && $scope.formData.idKelas !== '' && $scope.formData.idPelajaran !== "") {
                if ($scope.dataAbsensi.length === $scope.dataSiswa.length) {
                    $ionicLoading.show();
                    var groupAbsensiSiswa = firebase.database(appAbsensi).ref("groupAbsensiSiswa");
                    groupAbsensiSiswa.push({
                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.namaProvinsi,
                        "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                        "namaKotaKabupaten": $scope.namaKotaKabupaten,
                        "idKecamatan": $scope.formData.idKecamatan,
                        "namaKecamatan": $scope.namaKecamatan,
                        "jenjang": $scope.formData.jenjang,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "idGuru": $scope.formData.idGuru,
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
                        "groupAbsensi": groupAbsensi,
                        "totalSiswa": $scope.dataAbsensi.length,
                        "idPembuat": $scope.idAdmin
                    }).then(function (ok) {
                        for (i = 0; i < $scope.dataAbsensi.length; i++) {
                            var insertData = firebase.database(appAbsensi).ref("absensiSiswa");
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
                                "hariAbsensi": $scope.dataAbsensi[i].hariAbsensi,
                                "jamAbsensi": $scope.dataAbsensi[i].jamAbsensi,
                                "groupAbsensi": groupAbsensi,
                                "idPembuat": $scope.idAdmin
                            }).then(function (resp) {
                                $ionicLoading.hide();
                                $state.go("menuAdmin.absensiSiswaAdmin");

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

    .controller('absensiSiswaLihatAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "groupAbsensi": $stateParams.groupAbsensi
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var getAbs = firebase.database().ref("absensiSiswa").orderByChild("groupAbsensi").equalTo($scope.data.groupAbsensi);
        var listGetAbs = $firebaseArray(getAbs);
        $ionicLoading.show();
        listGetAbs.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataGetAbs = response;
            $scope.absensiByGroup = $scope.dataGetAbs.groupBy('keterangan');
            console.log($scope.absensiByGroup);
            $scope.dataAbsensi = response[0];
        })

    }])

    .controller('absensiSiswaEditAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "groupAbsensi": $stateParams.groupAbsensi
        }

        var getAbs = firebase.database(appAbsensi).ref("absensiSiswa").orderByChild("groupAbsensi").equalTo($scope.data.groupAbsensi);
        var listGetAbs = $firebaseArray(getAbs);
        listGetAbs.$loaded().then(function (response) {
            $scope.dataSiswa = response;
            $scope.dataAbsensi = response[0];
        })

        $scope.getAbsensi = function (data) {
            var refAbsensi = firebase.database(appAbsensi).ref("absensiSiswa/" + data.$id);
            refAbsensi.update({
                "keterangan": data.keterangan
            }).then(function (resp) {
                console.log("updated");
            })
        }

        $scope.simpan = function () {
            $state.go("menuAdmin.absensiSiswaAdmin")
        }


    }])