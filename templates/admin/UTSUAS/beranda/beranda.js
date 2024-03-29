angular.module('app.berandaUTSUASAdmin', [])

    .controller('berandaUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        var ref = firebase.database(appUTSUASOnline).ref("namaUTSUAS").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
        var list = $firebaseArray(ref);

        $ionicLoading.show();
        list.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.namaUTSUAS = response;
            // console.log(response);
        });

        $scope.pengaturanUTSUAS = function (data) {
            console.log(data);
            $ionicActionSheet.show({
                mode: 'android',
                titleText: 'Ujian : ' + data.namaUTSUAS,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Ujian' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Pengaturan Pelajaran' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Registrasi Peserta' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Log Histori Peserta' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Nilai & Peringkat' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Ujian',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('menuAdmin.editUTSUASAdmin', {
                            "idUTSUAS": data.$id,
                            "namaUTSUAS": data.namaUTSUAS,
                        });
                    }
                    if (index === 1) {
                        $state.go('menuAdmin.pelajaranUTSUASAdmin', {
                            "idUTSUAS": data.$id,
                            "namaUTSUAS": data.namaUTSUAS,
                            "jenjang": data.jenjang,
                            "tingkatKelas": data.tingkatKelas,
                            "utsUasTingkat": data.utsUasTingkat,
                            "namaSekolah": data.namaSekolah
                        });
                    }
                    if (index === 2) {
                        //Cek Data
                        var cek = firebase.database(appUTSUASOnline).ref("pelajaranUTSUAS").orderByChild("idUTSUAS").equalTo(data.$id);
                        var listCek = $firebaseArray(cek);
                        listCek.$loaded().then(function (response) {
                            if(response.length===0){
                                $ionicPopup.alert({
                                    title: 'Perhatian',
                                    template: "Sebelum melakukan registrasi peserta, silahkan tambahkan pelajaran terlebih dahulu di menu pengaturan pelajaran",
                                    okType: "button-positive"
                                });
                            }
                            else{
                                if (data.utsUasTingkat === "Kota/Kabupaten" || data.utsUasTingkat === "Kecamatan") {
                                    $state.go('menuAdmin.registrasiPesertaKotaUTSUASAdmin', {
                                        "idUTSUAS": data.$id,
                                        "namaUTSUAS": data.namaUTSUAS,
                                        "jenjang": data.jenjang,
                                        "tingkatKelas": data.tingkatKelas,
                                        "id_kota_kabupaten": data.id_kota_kabupaten,
                                        "utsUasTingkat": data.utsUasTingkat,
                                        "id_provinsi": data.id_provinsi,
                                        "namaKota": data.namaKota,
                                        "namaProvinsi": data.namaProvinsi,
                                        "semester": data.semester,
                                        "idTahunAjaran": data.idTahunAjaran,
                                        "tahunAjaran": data.tahunAjaran,
                                        "idSekolah": data.idSekolah
                                    });
                                }
                                else {
                                    $state.go('menuAdmin.registrasiPesertaUTSUASAdmin', {
                                        "idUTSUAS": data.$id,
                                        "namaUTSUAS": data.namaUTSUAS,
                                        "jenjang": data.jenjang,
                                        "tingkatKelas": data.tingkatKelas,
                                        "id_kota_kabupaten": data.id_kota_kabupaten,
                                        "utsUasTingkat": data.utsUasTingkat,
                                        "id_provinsi": data.id_provinsi,
                                        "namaKota": data.namaKota,
                                        "namaProvinsi": data.namaProvinsi,
                                        "semester": data.semester,
                                        "idTahunAjaran": data.idTahunAjaran,
                                        "tahunAjaran": data.tahunAjaran,
                                        "idSekolah": data.idSekolah
                                    });
                                }
                            }
                        })

                    }
                    if (index === 3) {
                        $state.go('menuAdmin.logHistoriUTSUASAdmin', {
                            "idUTSUAS": data.$id,
                            "namaUTSUAS": data.namaUTSUAS,
                            "jenjang": data.jenjang,
                            "tingkatKelas": data.tingkatKelas,
                            "id_kota_kabupaten": data.id_kota_kabupaten,
                            "utsUasTingkat": data.utsUasTingkat,
                            "id_provinsi": data.id_provinsi
                        });
                    }
                    if (index === 4) {
                        $state.go("menuAdmin.nilaiPeringkatUTSUASAdmin", {
                            "idUTSUAS": data.idUTSUAS,
                            "namaUTSUAS": data.namaUTSUAS,
                            "jenjang": data.jenjang,
                            "utsUasTingkat": data.utsUasTingkat,
                            "namaKota": data.namaKota,
                            "namaProvinsi": data.namaProvinsi,
                            "semester": data.semester,
                            "tahunAjaran": data.tahunAjaran,
                            "tingkatKelas": data.tingkatKelas,
                            "idSekolah": data.idSekolah,
                            "idTahunAjaran": data.idTahunAjaran,
                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    if($scope.hakAkses==="Super Admin"){
                        var cek = firebase.database(appUTSUASOnline).ref("pesertaUTSUAS").orderByChild("idUTSUAS").equalTo(data.$id);
                        var listCek = $firebaseArray(cek);
                        listCek.$loaded().then(function (response) {
                            if (response.length === 0) {
    
                                var refObj = firebase.database(appUTSUASOnline).ref("namaUTSUAS/" + data.$id);
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
                            else if (response.length !== 0) {
                                $ionicPopup.alert({
                                    title: 'Perhatian',
                                    template: "Data tidak bisa dihapus karena sudah terisi peserta ujian, Terimakasih",
                                    okType: "button-positive"
                                });
                            }
                        });
                    }
                    else{
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: "Maaf, Anda tidak diperkenankan menghapus data ini. Terimakasih",
                            okType: "button-positive"
                        });
                    }
                    return true;
                }

            });

        };

        $scope.tambahUTSUAS = function () {
            $state.go("menuAdmin.tambahUTSUASAdmin");
        };

    }])


    .controller('tambahUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        var refTahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        var listRefTahunAjaran = $firebaseArray(refTahunAjaran);
        $ionicLoading.show();
        listRefTahunAjaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.tahunAjaran = response;
        })

        $scope.getTahunAjaran = function () {
            var id = $scope.formData.idTahunAjaran;
            var a = firebase.database().ref("tahunAjaran/" + id);
            a.on("value", function (snapshot) {
                $scope.namaTahunAjaran = snapshot.val().tahunAjaran;
                // console.log($scope.namaTahunAjaran);
            })
        }

        var refSemester = firebase.database().ref("semester").orderByChild("aktif").equalTo(true);
        var listRefSemester = $firebaseArray(refSemester);
        $ionicLoading.show();
        listRefSemester.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.semester = response;
        })

        $scope.getSemester = function () {
            var id = $scope.formData.idSemester;
            var a = firebase.database().ref("semester/" + id);
            a.on("value", function (snapshot) {
                $scope.namaSemester = snapshot.val().semester;
                console.log($scope.namaSemester);
            })
        }

        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiAdmin);
        $scope.provinsi = $firebaseArray(refProvinsi);

        $scope.getProvince = function () {
            var id = $scope.formData.idProvinsi;
            var a = firebase.database().ref("provinsi/" + id);
            a.on("value", function (snapshot) {
                $scope.id_provinsi = snapshot.val().id_provinsi;
                $scope.nama_provinsi = snapshot.val().nama_provinsi;

                //Get Data Kota
                var b = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
                $scope.dataKota = $firebaseArray(b);
                //console.log($scope.dataKota)
            })
        };

        $scope.getKota = function () {
            var id = $scope.formData.idKota;
            var a = firebase.database().ref("kota/" + id);
            a.on("value", function (snapshot) {
                $scope.idKota = snapshot.val().id_kota_kabupaten;
                $scope.nama_kota_kabupaten = snapshot.val().nama_kota_kabupaten;

                //Get Data Kota
                var b = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKota);
                $scope.dataKota = $firebaseArray(b);
                //console.log($scope.dataKota);

                var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo($scope.idKota);
                $scope.dataKecamatan = $firebaseArray(refKecamatan);
            })
        };

        $scope.getKecamatan = function () {
            var id = $scope.formData.idKecamatan;
            var a = firebase.database().ref("kecamatan/" + id);
            a.on("value", function (snapshot) {
                $scope.namaKecamatan = snapshot.val().nama_kecamatan;
                $scope.id_kecamatan = snapshot.val().id_kecamatan;
                //Get Data Kota
                var b = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo(snapshot.val().id_kecamatan + "_" + $scope.formData.jenjang);
                $scope.dataSekolah = $firebaseArray(b);
                //console.log($scope.dataSekolah)
            })
        };

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
        };

        $scope.getutsUasTingkat = function () {
            if ($scope.formData.utsUasTingkat === "Sekolah") {
                $scope.tampilkan = true;
            }
            else {
                $scope.tampilkan = false;
            }
        };

        $scope.getSekolah = function () {
            var refSchool = firebase.database().ref("dataSekolahIndonesia/" + $scope.formData.idSekolah);
            refSchool.on("value", function (snapshot) {
                $scope.namaSekolah = snapshot.val().nama_sekolah;
            })
        }

        $scope.formData = {
            "idTahunAjaran": "",
            "idSemester": "",
            "idProvinsi": "",
            "idKota": "",
            "jenjang": "",
            "tingkatKelas": "",
            "utsUasTingkat": "",
            "namaUTSUAS": "",
            "jumlahPaketSoal": "",
            "publish": false,
            "nilaiDitampilkan": true,
            "namaKecamatan": "",
            "idSekolah": "",
            "id_kecamatan": "",
            "idKecamatan": ""
        };

        $scope.simpan = function () {
            // console.log($scope.formData);
            if ($scope.formData.idTahunAjaran !== "" && $scope.formData.idSemester !== "" && $scope.formData.idProvinsi !== "" && $scope.formData.jenjang !== "" && $scope.formData.tingkatKelas !== "" && $scope.formData.utsUasTingkat !== "" && $scope.formData.jumlahPaketSoal !== null) {
                $ionicLoading.show();
                if ($scope.formData.idKecamatan === "") {
                    var ref = firebase.database(appUTSUASOnline).ref("namaUTSUAS");
                    ref.push({
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.namaTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.namaSemester,
                        "id_provinsi": $scope.id_provinsi,
                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.nama_provinsi,
                        "idKota": $scope.formData.idKota,
                        "id_kota_kabupaten": $scope.idKota,
                        "namaKota": $scope.nama_kota_kabupaten,
                        "jenjang": $scope.formData.jenjang,
                        "tingkatKelas": $scope.formData.tingkatKelas,
                        "namaUTSUAS": $scope.formData.namaUTSUAS,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "utsUasTingkat": $scope.formData.utsUasTingkat,
                        "nilaiDitampilkan": $scope.formData.nilaiDitampilkan
                        //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.idKota+"_"+$scope.formData.publish
                    }).then(function (resp) {
                        //update database
                        var refUpdate = firebase.database(appUTSUASOnline).ref("namaUTSUAS/" + resp.key);

                        refUpdate.update(JSON.parse(JSON.stringify({

                            "idUTSUAS": resp.key

                        }))).then(function (resp) {
                            $ionicLoading.hide();

                            //console.log('success');
                            $state.go("menuAdmin.UTSUASAdmin");
                        });
                    });
                }
                else if ($scope.formData.idKecamatan !== "") {
                    var ref = firebase.database(appUTSUASOnline).ref("namaUTSUAS").push({
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.namaTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.namaSemester,
                        "id_provinsi": $scope.id_provinsi,
                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.nama_provinsi,
                        "idKota": $scope.formData.idKota,
                        "id_kota_kabupaten": $scope.idKota,
                        "namaKota": $scope.nama_kota_kabupaten,
                        "jenjang": $scope.formData.jenjang,
                        "tingkatKelas": $scope.formData.tingkatKelas,
                        "namaUTSUAS": $scope.formData.namaUTSUAS,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "utsUasTingkat": $scope.formData.utsUasTingkat,
                        "namaKecamatan": $scope.namaKecamatan,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "id_kecamatan": $scope.id_kecamatan,
                        "idKecamatan": $scope.formData.idKecamatan,
                        "nilaiDitampilkan": $scope.formData.nilaiDitampilkan
                    }).then(function (resp) {
                         //update database
                         var refUpdate = firebase.database(appUTSUASOnline).ref("namaUTSUAS/" + resp.key);

                         refUpdate.update(JSON.parse(JSON.stringify({

                             "idUTSUAS": resp.key

                         }))).then(function (resp) {
                             $ionicLoading.hide();

                             //console.log('success');
                             $state.go("menuAdmin.UTSUASAdmin");
                         })

                    });
                }
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf Semua Data Harus Diisi. Terimakasih',
                    okType: 'button-positive'
                });
            }
        };

    }])

    .controller('editUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS
        };

        var refObj = firebase.database(appUTSUASOnline).ref("namaUTSUAS/" + $scope.data.idUTSUAS);
        var obj = $firebaseObject(refObj);
        obj.$loaded().then(function (response) {
            $scope.formData = response;
            // console.log($scope.formData);
            $scope.jenjang = response.jenjang;
            //console.log($scope.formData.idProvinsi+" "+$scope.formData.namaProvinsi);
            var refKota = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
            $scope.dataKota = $firebaseArray(refKota);
            //console.log($scope.dataKota);
            if (response.utsUasTingkat === "Sekolah") {
                $scope.tampilkan = true;
            }

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(response.id_kota_kabupaten);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);

            var refSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo(response.id_kecamatan + "_" + response.jenjang);
            $scope.dataSekolah = $firebaseArray(refSekolah);

            if ($scope.formData.jenjang === "SD") {
                $scope.tingkatKelas = [1, 2, 3, 4, 5, 6];
            }
            else if ($scope.formData.jenjang === "SMP") {
                $scope.tingkatKelas = [7, 8, 9];
            }
            else if ($scope.formData.jenjang === "SMA" || jenjang === "SMK") {
                $scope.tingkatKelas = [10, 11, 12];
            }

        });

        var refTahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        var listRefTahunAjaran = $firebaseArray(refTahunAjaran);
        $ionicLoading.show();
        listRefTahunAjaran.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.tahunAjaran = response;
        })

        $scope.getTahunAjaran = function () {
            var id = $scope.formData.idTahunAjaran;
            var a = firebase.database().ref("tahunAjaran/" + id);
            a.on("value", function (snapshot) {
                $scope.namaTahunAjaran = snapshot.val().tahunAjaran;
                // console.log($scope.namaTahunAjaran);
            })
        }

        var refSemester = firebase.database().ref("semester").orderByChild("aktif").equalTo(true);
        var listRefSemester = $firebaseArray(refSemester);
        $ionicLoading.show();
        listRefSemester.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.semester = response;
        })

        $scope.getSemester = function () {
            var id = $scope.formData.idSemester;
            var a = firebase.database().ref("semester/" + id);
            a.on("value", function (snapshot) {
                $scope.namaSemester = snapshot.val().semester;
                // console.log($scope.namaSemester);
            })
        }

        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiAdmin);
        $scope.provinsi = $firebaseArray(refProvinsi);

        $scope.getProvince = function () {
            var id = $scope.formData.idProvinsi;
            var a = firebase.database().ref("provinsi/" + id);
            a.on("value", function (snapshot) {
                $scope.id_provinsi = snapshot.val().id_provinsi;
                $scope.nama_provinsi = snapshot.val().nama_provinsi;

                //Get Data Kota
                var b = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo($scope.id_provinsi);
                $scope.dataKota = $firebaseArray(b);
                //console.log($scope.dataKota)
            })
        };

        $scope.getKota = function () {
            var id = $scope.formData.idKota;
            var a = firebase.database().ref("kota/" + id);
            a.on("value", function (snapshot) {
                $scope.idKota = snapshot.val().id_kota_kabupaten;
                $scope.nama_kota_kabupaten = snapshot.val().nama_kota_kabupaten;

                //Get Data Kota
                var b = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKota);
                $scope.dataKota = $firebaseArray(b);
                //console.log($scope.dataKota);

                var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo($scope.idKota);
                $scope.dataKecamatan = $firebaseArray(refKecamatan);
            })
        };

        $scope.getKecamatan = function () {
            var id = $scope.formData.idKecamatan;
            var a = firebase.database().ref("kecamatan/" + id);
            a.on("value", function (snapshot) {
                $scope.namaKecamatan = snapshot.val().nama_kecamatan;
                $scope.id_kecamatan = snapshot.val().id_kecamatan;
                //Get Data Kota
                var b = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo(snapshot.val().id_kecamatan + "_" + $scope.formData.jenjang);
                $scope.dataSekolah = $firebaseArray(b);
                //console.log($scope.dataSekolah)
            })
        };

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
        };

        $scope.getutsUasTingkat = function () {
            if ($scope.formData.utsUasTingkat === "Sekolah") {
                $scope.tampilkan = true;
            }
            else {
                $scope.tampilkan = false;
            }
        };

        $scope.getSekolah = function () {
            var refSchool = firebase.database().ref("dataSekolahIndonesia/" + $scope.formData.idSekolah);
            refSchool.on("value", function (snapshot) {
                $scope.namaSekolah = snapshot.val().nama_sekolah;
            })
        }

        $scope.simpan = function () {

            if ($scope.formData.idTahunAjaran !== "" && $scope.formData.idSemester !== "" && $scope.formData.idProvinsi !== "" && $scope.formData.jenjang !== "" && $scope.formData.tingkatKelas !== "" && $scope.formData.utsUasTingkat !== "" && $scope.formData.jumlahPaketSoal !== null) {
                $ionicLoading.show();
                if($scope.formData.utsUasTingkat==='Kota/Kabupaten'){
                    var obj5315 = firebase.database(app5315).ref("namaUTSUAS/" + $scope.data.idUTSUAS);
                    var obj5316 = firebase.database(app5316).ref("namaUTSUAS/" + $scope.data.idUTSUAS);
                    var obj5317 = firebase.database(app5317).ref("namaUTSUAS/" + $scope.data.idUTSUAS);
                    var obj5318 = firebase.database(app5318).ref("namaUTSUAS/" + $scope.data.idUTSUAS);
                    var obj5319 = firebase.database(app5319).ref("namaUTSUAS/" + $scope.data.idUTSUAS);
                    var obj5320 = firebase.database(app5320).ref("namaUTSUAS/" + $scope.data.idUTSUAS);
                    var obj5321 = firebase.database(app5321).ref("namaUTSUAS/" + $scope.data.idUTSUAS);
                    var obj5322 = firebase.database(app5322).ref("namaUTSUAS/" + $scope.data.idUTSUAS);
                    var obj5323 = firebase.database(app5323).ref("namaUTSUAS/" + $scope.data.idUTSUAS);
                    var obj5324 = firebase.database(app5324).ref("namaUTSUAS/" + $scope.data.idUTSUAS);

                    obj5315.update(JSON.parse(JSON.stringify({
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.namaTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.namaSemester,
                        "id_provinsi": $scope.id_provinsi,
                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.nama_provinsi,
                        "idKota": $scope.formData.idKota,
                        "id_kota_kabupaten": $scope.idKota,
                        "namaKota": $scope.nama_kota_kabupaten,
                        "jenjang": $scope.formData.jenjang,
                        "tingkatKelas": $scope.formData.tingkatKelas,
                        "namaUTSUAS": $scope.formData.namaUTSUAS,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "utsUasTingkat": $scope.formData.utsUasTingkat,
                        "idKecamatan": $scope.formData.idKecamatan,
                        "namaKecamatan": $scope.namaKecamatan,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "id_kecamatan": $scope.id_kecamatan,
                        "nilaiDitampilkan": $scope.formData.nilaiDitampilkan,
                        //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.formData.id_kota_kabupaten+"_"+$scope.formData.publish
                        "idUTSUAS" : $scope.data.idUTSUAS
                    })))
                    obj5316.update(JSON.parse(JSON.stringify({
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.namaTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.namaSemester,
                        "id_provinsi": $scope.id_provinsi,
                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.nama_provinsi,
                        "idKota": $scope.formData.idKota,
                        "id_kota_kabupaten": $scope.idKota,
                        "namaKota": $scope.nama_kota_kabupaten,
                        "jenjang": $scope.formData.jenjang,
                        "tingkatKelas": $scope.formData.tingkatKelas,
                        "namaUTSUAS": $scope.formData.namaUTSUAS,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "utsUasTingkat": $scope.formData.utsUasTingkat,
                        "idKecamatan": $scope.formData.idKecamatan,
                        "namaKecamatan": $scope.namaKecamatan,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "id_kecamatan": $scope.id_kecamatan,
                        "nilaiDitampilkan": $scope.formData.nilaiDitampilkan,
                        //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.formData.id_kota_kabupaten+"_"+$scope.formData.publish
                        "idUTSUAS" : $scope.data.idUTSUAS
                    })))
                    obj5317.update(JSON.parse(JSON.stringify({
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.namaTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.namaSemester,
                        "id_provinsi": $scope.id_provinsi,
                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.nama_provinsi,
                        "idKota": $scope.formData.idKota,
                        "id_kota_kabupaten": $scope.idKota,
                        "namaKota": $scope.nama_kota_kabupaten,
                        "jenjang": $scope.formData.jenjang,
                        "tingkatKelas": $scope.formData.tingkatKelas,
                        "namaUTSUAS": $scope.formData.namaUTSUAS,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "utsUasTingkat": $scope.formData.utsUasTingkat,
                        "idKecamatan": $scope.formData.idKecamatan,
                        "namaKecamatan": $scope.namaKecamatan,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "id_kecamatan": $scope.id_kecamatan,
                        "nilaiDitampilkan": $scope.formData.nilaiDitampilkan,
                        //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.formData.id_kota_kabupaten+"_"+$scope.formData.publish
                        "idUTSUAS" : $scope.data.idUTSUAS
                    })))
                    obj5318.update(JSON.parse(JSON.stringify({
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.namaTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.namaSemester,
                        "id_provinsi": $scope.id_provinsi,
                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.nama_provinsi,
                        "idKota": $scope.formData.idKota,
                        "id_kota_kabupaten": $scope.idKota,
                        "namaKota": $scope.nama_kota_kabupaten,
                        "jenjang": $scope.formData.jenjang,
                        "tingkatKelas": $scope.formData.tingkatKelas,
                        "namaUTSUAS": $scope.formData.namaUTSUAS,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "utsUasTingkat": $scope.formData.utsUasTingkat,
                        "idKecamatan": $scope.formData.idKecamatan,
                        "namaKecamatan": $scope.namaKecamatan,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "id_kecamatan": $scope.id_kecamatan,
                        "nilaiDitampilkan": $scope.formData.nilaiDitampilkan,
                        //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.formData.id_kota_kabupaten+"_"+$scope.formData.publish
                        "idUTSUAS" : $scope.data.idUTSUAS
                    })))
                    obj5319.update(JSON.parse(JSON.stringify({
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.namaTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.namaSemester,
                        "id_provinsi": $scope.id_provinsi,
                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.nama_provinsi,
                        "idKota": $scope.formData.idKota,
                        "id_kota_kabupaten": $scope.idKota,
                        "namaKota": $scope.nama_kota_kabupaten,
                        "jenjang": $scope.formData.jenjang,
                        "tingkatKelas": $scope.formData.tingkatKelas,
                        "namaUTSUAS": $scope.formData.namaUTSUAS,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "utsUasTingkat": $scope.formData.utsUasTingkat,
                        "idKecamatan": $scope.formData.idKecamatan,
                        "namaKecamatan": $scope.namaKecamatan,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "id_kecamatan": $scope.id_kecamatan,
                        "nilaiDitampilkan": $scope.formData.nilaiDitampilkan,
                        //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.formData.id_kota_kabupaten+"_"+$scope.formData.publish
                        "idUTSUAS" : $scope.data.idUTSUAS
                    })))
                    obj5320.update(JSON.parse(JSON.stringify({
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.namaTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.namaSemester,
                        "id_provinsi": $scope.id_provinsi,
                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.nama_provinsi,
                        "idKota": $scope.formData.idKota,
                        "id_kota_kabupaten": $scope.idKota,
                        "namaKota": $scope.nama_kota_kabupaten,
                        "jenjang": $scope.formData.jenjang,
                        "tingkatKelas": $scope.formData.tingkatKelas,
                        "namaUTSUAS": $scope.formData.namaUTSUAS,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "utsUasTingkat": $scope.formData.utsUasTingkat,
                        "idKecamatan": $scope.formData.idKecamatan,
                        "namaKecamatan": $scope.namaKecamatan,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "id_kecamatan": $scope.id_kecamatan,
                        "nilaiDitampilkan": $scope.formData.nilaiDitampilkan,
                        //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.formData.id_kota_kabupaten+"_"+$scope.formData.publish
                        "idUTSUAS" : $scope.data.idUTSUAS
                    })))
                    obj5321.update(JSON.parse(JSON.stringify({
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.namaTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.namaSemester,
                        "id_provinsi": $scope.id_provinsi,
                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.nama_provinsi,
                        "idKota": $scope.formData.idKota,
                        "id_kota_kabupaten": $scope.idKota,
                        "namaKota": $scope.nama_kota_kabupaten,
                        "jenjang": $scope.formData.jenjang,
                        "tingkatKelas": $scope.formData.tingkatKelas,
                        "namaUTSUAS": $scope.formData.namaUTSUAS,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "utsUasTingkat": $scope.formData.utsUasTingkat,
                        "idKecamatan": $scope.formData.idKecamatan,
                        "namaKecamatan": $scope.namaKecamatan,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "id_kecamatan": $scope.id_kecamatan,
                        "nilaiDitampilkan": $scope.formData.nilaiDitampilkan,
                        //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.formData.id_kota_kabupaten+"_"+$scope.formData.publish
                        "idUTSUAS" : $scope.data.idUTSUAS
                    })))
                    obj5322.update(JSON.parse(JSON.stringify({
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.namaTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.namaSemester,
                        "id_provinsi": $scope.id_provinsi,
                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.nama_provinsi,
                        "idKota": $scope.formData.idKota,
                        "id_kota_kabupaten": $scope.idKota,
                        "namaKota": $scope.nama_kota_kabupaten,
                        "jenjang": $scope.formData.jenjang,
                        "tingkatKelas": $scope.formData.tingkatKelas,
                        "namaUTSUAS": $scope.formData.namaUTSUAS,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "utsUasTingkat": $scope.formData.utsUasTingkat,
                        "idKecamatan": $scope.formData.idKecamatan,
                        "namaKecamatan": $scope.namaKecamatan,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "id_kecamatan": $scope.id_kecamatan,
                        "nilaiDitampilkan": $scope.formData.nilaiDitampilkan,
                        //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.formData.id_kota_kabupaten+"_"+$scope.formData.publish
                        "idUTSUAS" : $scope.data.idUTSUAS
                    })))
                    obj5323.update(JSON.parse(JSON.stringify({
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.namaTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.namaSemester,
                        "id_provinsi": $scope.id_provinsi,
                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.nama_provinsi,
                        "idKota": $scope.formData.idKota,
                        "id_kota_kabupaten": $scope.idKota,
                        "namaKota": $scope.nama_kota_kabupaten,
                        "jenjang": $scope.formData.jenjang,
                        "tingkatKelas": $scope.formData.tingkatKelas,
                        "namaUTSUAS": $scope.formData.namaUTSUAS,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "utsUasTingkat": $scope.formData.utsUasTingkat,
                        "idKecamatan": $scope.formData.idKecamatan,
                        "namaKecamatan": $scope.namaKecamatan,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "id_kecamatan": $scope.id_kecamatan,
                        "nilaiDitampilkan": $scope.formData.nilaiDitampilkan,
                        //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.formData.id_kota_kabupaten+"_"+$scope.formData.publish
                        "idUTSUAS" : $scope.data.idUTSUAS
                    })))
                    obj5324.update(JSON.parse(JSON.stringify({
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.namaTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.namaSemester,
                        "id_provinsi": $scope.id_provinsi,
                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.nama_provinsi,
                        "idKota": $scope.formData.idKota,
                        "id_kota_kabupaten": $scope.idKota,
                        "namaKota": $scope.nama_kota_kabupaten,
                        "jenjang": $scope.formData.jenjang,
                        "tingkatKelas": $scope.formData.tingkatKelas,
                        "namaUTSUAS": $scope.formData.namaUTSUAS,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "utsUasTingkat": $scope.formData.utsUasTingkat,
                        "idKecamatan": $scope.formData.idKecamatan,
                        "namaKecamatan": $scope.namaKecamatan,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "id_kecamatan": $scope.id_kecamatan,
                        "nilaiDitampilkan": $scope.formData.nilaiDitampilkan,
                        //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.formData.id_kota_kabupaten+"_"+$scope.formData.publish
                        "idUTSUAS" : $scope.data.idUTSUAS
                    })))
                    refObj.update(JSON.parse(JSON.stringify({
                        "idTahunAjaran": $scope.formData.idTahunAjaran,
                        "tahunAjaran": $scope.namaTahunAjaran,
                        "idSemester": $scope.formData.idSemester,
                        "semester": $scope.namaSemester,
                        "id_provinsi": $scope.id_provinsi,
                        "idProvinsi": $scope.formData.idProvinsi,
                        "namaProvinsi": $scope.nama_provinsi,
                        "idKota": $scope.formData.idKota,
                        "id_kota_kabupaten": $scope.idKota,
                        "namaKota": $scope.nama_kota_kabupaten,
                        "jenjang": $scope.formData.jenjang,
                        "tingkatKelas": $scope.formData.tingkatKelas,
                        "namaUTSUAS": $scope.formData.namaUTSUAS,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "utsUasTingkat": $scope.formData.utsUasTingkat,
                        "idKecamatan": $scope.formData.idKecamatan,
                        "namaKecamatan": $scope.namaKecamatan,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "id_kecamatan": $scope.id_kecamatan,
                        "nilaiDitampilkan": $scope.formData.nilaiDitampilkan,
                        //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.formData.id_kota_kabupaten+"_"+$scope.formData.publish
                        "idUTSUAS" : $scope.data.idUTSUAS
    
                    }))).then(function (resp) {
    
                        $ionicLoading.hide();
                        $state.go("menuAdmin.UTSUASAdmin")
                        $ionicPopup.alert({
                            title: 'Sukses',
                            template: "Sukses, Data Ujian Berhasil Diperbaharui",
                            okType: "button-positive"
                        });
                    })
                }
                else{
                    if ($scope.formData.idKecamatan === "") {
                        refObj.update(JSON.parse(JSON.stringify({
                            "idTahunAjaran": $scope.formData.idTahunAjaran,
                            "tahunAjaran": $scope.namaTahunAjaran,
                            "idSemester": $scope.formData.idSemester,
                            "semester": $scope.namaSemester,
                            "id_provinsi": $scope.id_provinsi,
                            "idProvinsi": $scope.formData.idProvinsi,
                            "namaProvinsi": $scope.nama_provinsi,
                            "idKota": $scope.formData.idKota,
                            "id_kota_kabupaten": $scope.idKota,
                            "namaKota": $scope.nama_kota_kabupaten,
                            "jenjang": $scope.formData.jenjang,
                            "tingkatKelas": $scope.formData.tingkatKelas,
                            "namaUTSUAS": $scope.formData.namaUTSUAS,
                            "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                            "publish": $scope.formData.publish,
                            "utsUasTingkat": $scope.formData.utsUasTingkat,
                            "idKecamatan": $scope.formData.idKecamatan,
                            "namaKecamatan": $scope.namaKecamatan,
                            "idSekolah": $scope.formData.idSekolah,
                            "namaSekolah": $scope.namaSekolah,
                            "id_kecamatan": $scope.id_kecamatan,
                            "nilaiDitampilkan": $scope.formData.nilaiDitampilkan,
                            //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.formData.id_kota_kabupaten+"_"+$scope.formData.publish
                            "idUTSUAS" : $scope.data.idUTSUAS
        
                        }))).then(function (resp) {
        
                            $ionicLoading.hide();
                            $state.go("menuAdmin.UTSUASAdmin")
                            $ionicPopup.alert({
                                title: 'Sukses',
                                template: "Sukses, Data Ujian Berhasil Diperbaharui",
                                okType: "button-positive"
                            });
                        })
                    }
                    else if($scope.formData.idKecamatan!==""){
                        refObj.update(JSON.parse(JSON.stringify({
                            "idTahunAjaran": $scope.formData.idTahunAjaran,
                            "tahunAjaran": $scope.namaTahunAjaran,
                            "idSemester": $scope.formData.idSemester,
                            "semester": $scope.namaSemester,
                            "id_provinsi": $scope.id_provinsi,
                            "idProvinsi": $scope.formData.idProvinsi,
                            "namaProvinsi": $scope.nama_provinsi,
                            "idKota": $scope.formData.idKota,
                            "id_kota_kabupaten": $scope.idKota,
                            "namaKota": $scope.nama_kota_kabupaten,
                            "jenjang": $scope.formData.jenjang,
                            "tingkatKelas": $scope.formData.tingkatKelas,
                            "namaUTSUAS": $scope.formData.namaUTSUAS,
                            "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                            "publish": $scope.formData.publish,
                            "utsUasTingkat": $scope.formData.utsUasTingkat,
                            "namaKecamatan": $scope.namaKecamatan,
                            "idSekolah": $scope.formData.idSekolah,
                            "namaSekolah": $scope.namaSekolah,
                            "id_kecamatan": $scope.id_kecamatan,
                            "idKecamatan": $scope.formData.idKecamatan,
                            "nilaiDitampilkan": $scope.formData.nilaiDitampilkan,
                            //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.formData.id_kota_kabupaten+"_"+$scope.formData.publish
                            "idUTSUAS" : $scope.data.idUTSUAS
                        }))).then(function (resp) {
        
                            $ionicLoading.hide();
                            $state.go("menuAdmin.UTSUASAdmin")
                            $ionicPopup.alert({
                                title: 'Sukses',
                                template: "Sukses, Data Ujian Berhasil Diperbaharui",
                                okType: "button-positive"
                            });
                        })
                    }
                }
                
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf Semua Data Harus Diisi. Terimakasih',
                    okType: 'button-positive'
                });
            }
        };

    }])


