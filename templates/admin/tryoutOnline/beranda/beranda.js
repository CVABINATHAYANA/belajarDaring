angular.module('app.berandaTryoutOnlineAdmin', [])

    .controller('berandaTryoutOnlineAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        var ref = firebase.database(appTryoutOnline).ref("tryoutOnline").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
        var list = $firebaseArray(ref);

        $ionicLoading.show();
        list.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.namaTryoutOnline = response;

        });

        $scope.pengaturanTryoutOnline = function (data) {
            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Ujian : ' + data.namaTryoutOnline,
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
                        $state.go('menuAdmin.editTryoutOnlineAdmin', {
                            "idTryoutOnline": data.$id,
                            "namaTryoutOnline": data.namaTryoutOnline,
                        });
                    }
                    if (index === 1) {
                        $state.go('menuAdmin.pelajaranTryoutOnlineAdmin', {
                            "idTryoutOnline": data.$id,
                            "namaTryoutOnline": data.namaTryoutOnline,
                            "jenjang": data.jenjang,
                            "tingkatKelas": data.tingkatKelas,
                            "TryoutOnlineTingkat": data.TryoutOnlineTingkat,
                            "namaSekolah": data.namaSekolah
                        });
                    }
                    if (index === 2) {
                        //Cek Data
                        var cek = firebase.database(appTryoutOnline).ref("pelajaranTryoutOnline").orderByChild("idTryoutOnline").equalTo(data.$id);
                        var listCek = $firebaseArray(cek);
                        listCek.$loaded().then(function (response) {
                            if (response.length === 0) {
                                $ionicPopup.alert({
                                    title: 'Perhatian',
                                    template: "Sebelum melakukan registrasi peserta, silahkan tambahkan pelajaran terlebih dahulu di menu pengaturan pelajaran",
                                    okType: "button-positive"
                                });
                            }
                            else {
                                if (data.TryoutOnlineTingkat === "Kota/Kabupaten" || data.TryoutOnlineTingkat === "Kecamatan") {
                                    $state.go('menuAdmin.registrasiPesertaKotaTryoutOnlineAdmin', {
                                        "idTryoutOnline": data.$id,
                                        "namaTryoutOnline": data.namaTryoutOnline,
                                        "jenjang": data.jenjang,
                                        "tingkatKelas": data.tingkatKelas,
                                        "id_kota_kabupaten": data.id_kota_kabupaten,
                                        "TryoutOnlineTingkat": data.TryoutOnlineTingkat,
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
                                    $state.go('menuAdmin.registrasiPesertaTryoutOnlineAdmin', {
                                        "idTryoutOnline": data.$id,
                                        "namaTryoutOnline": data.namaTryoutOnline,
                                        "jenjang": data.jenjang,
                                        "tingkatKelas": data.tingkatKelas,
                                        "id_kota_kabupaten": data.id_kota_kabupaten,
                                        "TryoutOnlineTingkat": data.TryoutOnlineTingkat,
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
                        $state.go('menuAdmin.logHistoriTryoutOnlineAdmin', {
                            "idTryoutOnline": data.$id,
                            "namaTryoutOnline": data.namaTryoutOnline,
                            "jenjang": data.jenjang,
                            "tingkatKelas": data.tingkatKelas,
                            "id_kota_kabupaten": data.id_kota_kabupaten,
                            "TryoutOnlineTingkat": data.TryoutOnlineTingkat,
                            "id_provinsi": data.id_provinsi
                        });
                    }
                    if (index === 4) {
                        $state.go("menuAdmin.nilaiPeringkatTryoutOnlineAdmin", {
                            "idTryoutOnline": data.idTryoutOnline,
                            "namaTryoutOnline": data.namaTryoutOnline,
                            "jenjang": data.jenjang,
                            "TryoutOnlineTingkat": data.TryoutOnlineTingkat,
                            "namaKota": data.namaKota,
                            "namaProvinsi": data.namaProvinsi,
                            "semester": data.semester,
                            "tahunAjaran": data.tahunAjaran,
                            "tingkatKelas": data.tingkatKelas,
                            "idTahunAjaran": data.idTahunAjaran,
                            "idSekolah": data.idSekolah,
                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    if ($scope.hakAkses === "Super Admin") {
                        var cek = firebase.database(appTryoutOnline).ref("pesertaTryoutOnline").orderByChild("idTryoutOnline").equalTo(data.$id);
                        var listCek = $firebaseArray(cek);
                        listCek.$loaded().then(function (response) {
                            console.log(response.length)
                            if (response.length === 0) {

                                var refObj = firebase.database(appTryoutOnline).ref("tryoutOnline/" + data.$id);
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
                    else {
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

        $scope.tambahTryoutOnline = function () {
            $state.go("menuAdmin.tambahTryoutOnlineAdmin");
        };

    }])


    .controller('tambahTryoutOnlineAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
                console.log($scope.namaTahunAjaran);
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

        $scope.getTryoutOnlineTingkat = function () {
            if ($scope.formData.TryoutOnlineTingkat === "Sekolah") {
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
            "TryoutOnlineTingkat": "",
            "namaTryoutOnline": "",
            "jumlahPaketSoal": "",
            "publish": false,
            "namaKecamatan": "",
            "idSekolah": "",
            "id_kecamatan": "",
            "idKecamatan": ""
        };

        $scope.simpan = function () {
            // console.log($scope.formData);
            if ($scope.formData.idTahunAjaran !== "" && $scope.formData.idSemester !== "" && $scope.formData.idProvinsi !== "" && $scope.formData.jenjang !== "" && $scope.formData.tingkatKelas !== "" && $scope.formData.TryoutOnlineTingkat !== "" && $scope.formData.jumlahPaketSoal !== null) {
                $ionicLoading.show();
                if ($scope.formData.idKecamatan === "") {
                    var ref = firebase.database(appTryoutOnline).ref("tryoutOnline");
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
                        "namaTryoutOnline": $scope.formData.namaTryoutOnline,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "TryoutOnlineTingkat": $scope.formData.TryoutOnlineTingkat,
                        //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.idKota+"_"+$scope.formData.publish
                    }).then(function (resp) {
                        //update database
                        var refUpdate = firebase.database(appTryoutOnline).ref("tryoutOnline/" + resp.key);

                        refUpdate.update(JSON.parse(JSON.stringify({

                            "idTryoutOnline": resp.key

                        }))).then(function (resp) {
                            $ionicLoading.hide();

                            //console.log('success');
                            $state.go("menuAdmin.tryoutOnlineAdmin");
                        })
                    });
                }
                else if ($scope.formData.idKecamatan !== "") {
                    var ref = firebase.database(appTryoutOnline).ref("tryoutOnline").push({
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
                        "namaTryoutOnline": $scope.formData.namaTryoutOnline,
                        "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                        "publish": $scope.formData.publish,
                        "TryoutOnlineTingkat": $scope.formData.TryoutOnlineTingkat,
                        "namaKecamatan": $scope.namaKecamatan,
                        "idSekolah": $scope.formData.idSekolah,
                        "namaSekolah": $scope.namaSekolah,
                        "id_kecamatan": $scope.id_kecamatan,
                        "idKecamatan": $scope.formData.idKecamatan
                    }).then(function (resp) {
                        //update database
                        var refUpdate = firebase.database(appTryoutOnline).ref("tryoutOnline/" + resp.key);

                        refUpdate.update(JSON.parse(JSON.stringify({

                            "idTryoutOnline": resp.key

                        }))).then(function (resp) {
                            $ionicLoading.hide();

                            //console.log('success');
                            $state.go("menuAdmin.tryoutOnlineAdmin");
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

    .controller('editTryoutOnlineAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "idTryoutOnline": $stateParams.idTryoutOnline,
            "namaTryoutOnline": $stateParams.namaTryoutOnline
        };

        var refObj = firebase.database(appTryoutOnline).ref("tryoutOnline/" + $scope.data.idTryoutOnline);
        var obj = $firebaseObject(refObj);
        obj.$loaded().then(function (response) {
            $scope.formData = response;
            // console.log($scope.formData);
            $scope.jenjang = response.jenjang;
            //console.log($scope.formData.idProvinsi+" "+$scope.formData.namaProvinsi);
            var refKota = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupaten);
            $scope.dataKota = $firebaseArray(refKota);
            //console.log($scope.dataKota);
            if (response.TryoutOnlineTingkat === "Sekolah") {
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
                //console.log($scope.dataKota)
            })
        };

        $scope.getKecamatan = function () {
            var id = $scope.formData.idKecamatan;
            var a = firebase.database().ref("kecamatan/" + id);
            a.on("value", function (snapshot) {
                $scope.namaKecamatan = snapshot.val().nama_kecamatan;
                $scope.id_kecamatan = snapshot.val().id_kecamatan;
                //Get Data Kota
                var b = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo(snapshot.val().id_kecamatan + "_" + $scope.jenjang);
                $scope.dataSekolah = $firebaseArray(b);
                //console.log($scope.dataSekolah)
            })
        };

        $scope.getTryoutOnlineTingkat = function () {
            if ($scope.formData.TryoutOnlineTingkat === "Sekolah") {
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
            console.log($scope.formData)
            if ($scope.formData.idTahunAjaran !== "" && $scope.formData.idSemester !== "" && $scope.formData.idProvinsi !== "" && $scope.formData.jenjang !== "" && $scope.formData.tingkatKelas !== "" && $scope.formData.TryoutOnlineTingkat !== "" && $scope.formData.jumlahPaketSoal !== null) {
                $ionicLoading.show();
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
                    "namaTryoutOnline": $scope.formData.namaTryoutOnline,
                    "jumlahPaketSoal": $scope.formData.jumlahPaketSoal,
                    "publish": $scope.formData.publish,
                    "TryoutOnlineTingkat": $scope.formData.TryoutOnlineTingkat,
                    "idKecamatan": $scope.formData.idKecamatan,
                    "namaKecamatan": $scope.namaKecamatan,
                    "idSekolah": $scope.formData.idSekolah,
                    "namaSekolah": $scope.namaSekolah,
                    "id_kecamatan": $scope.id_kecamatan,
                    //"filterSiswa" : $scope.formData.jenjang+"_"+$scope.formData.id_kota_kabupaten+"_"+$scope.formData.publish
                    "idTryoutOnline" : $scope.data.idTryoutOnline

                }))).then(function (resp) {

                    $ionicLoading.hide();
                    $state.go("menuAdmin.tryoutOnlineAdmin")
                    $ionicPopup.alert({
                        title: 'Sukses',
                        template: "Sukses, Data Ujian Berhasil Diperbaharui",
                        okType: "button-positive"
                    });
                })
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


