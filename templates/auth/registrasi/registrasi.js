angular.module('app.registrasi', [])

    .controller('registrasiSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', '$ionicViewService', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth, $ionicViewService) {

        $scope.idPenggunaDinas = localStorage.getItem('idPenggunaDinas');
        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.idPenggunaOrangTua = localStorage.getItem('idPenggunaOrangTua');
        $scope.idAdmin = localStorage.getItem('idAdmin')

        if ($scope.idAdmin) {
            $state.go('menuAdmin.berandaAdmin');
        }

        if ($scope.idPenggunaDinas) {
            $state.go('menuDinas.berandaDinas');
        }

        if ($scope.idPenggunaSekolah) {
            $state.go('menuSekolah.berandaSekolah');
        }

        if ($scope.idGuru) {
            $state.go('menuGuru.berandaGuru');
        }

        if ($scope.idPenggunaSiswa) {
            $state.go('menuSiswa.berandaSiswa');
        }

        if ($scope.idPenggunaOrangTua) {
            $state.go('menuOrangTua.berandaOrangTua');
        }

        $scope.formData = {
            "statusSiswa": 'Siswa',
            // "idProvinsi": '',
            // "idKotaKabupaten": '',
            // "idKecamatan": '',
            // "jenjang": '',
            // "idSekolah": '',
            // "tingkatKelas": '',
            // "idKelas": '',
            "namaPengguna": '',
            // "noHandphone": '',
            // "jenisKelamin": '',
            // "alamat": '',
            "email": '',
            "password": '',
            "ketikUlangPassword": '',
            "time": new Date(),
            // "idTahunAjaran": '',
            // "namaKelas": ''
        };

        // var daataa = firebase.database().ref("dataSiswa").orderByChild("email").equalTo("sudasa20191@gmail.com");
        // var listDaataa = $firebaseArray(daataa);
        // console.log(listDaataa)

        //StatusSiswa 
        $scope.getStatusSiswa = function () {
            if ($scope.formData.statusSiswa === "Siswa") {
                $scope.statusSiswa = true;
            }
            else {
                $scope.statusSiswa = false;
            }
        }

        //Data Provinsi
        // var refProvinsi = firebase.database().ref("provinsi");
        // var listProvinsi = $firebaseArray(refProvinsi);
        // $ionicLoading.show();
        // listProvinsi.$loaded().then(function (response) {
        //     $ionicLoading.hide();
        //     $scope.dataProvinsi = response;
        // });

        // $scope.getIdProvinsi = function () {
        //     var idProvinsi = $scope.formData.idProvinsi;

        //     //Get Nama Provinsi
        //     var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
        //     var listNamaProvinsi = $firebaseArray(namaProvinsi);
        //     listNamaProvinsi.$loaded().then(function (response) {
        //         $scope.namaProvinsi = response[0].nama_provinsi;
        //         //console.log($scope.namaProvinsi);
        //     });

        //     var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo(idProvinsi);
        //     var listRefKotaKabupaten = $firebaseArray(refKotaKabupaten);
        //     $ionicLoading.show();
        //     listRefKotaKabupaten.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         $scope.dataKotaKabupaten = response;
        //     })

        // };

        // $scope.getIdKotaKabupaten = function () {
        //     var idKotaKabupaten = $scope.formData.idKotaKabupaten;

        //     //Get Nama Kota Kabupaten
        //     var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
        //     var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
        //     listNamaKotaKabupaten.$loaded().then(function (response) {
        //         $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
        //         // console.log($scope.namaKotaKabupaten);
        //     });

        //     var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
        //     var listRefKecamatan = $firebaseArray(refKecamatan);
        //     $ionicLoading.show();
        //     listRefKecamatan.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         $scope.dataKecamatan = response;
        //         //console.log($scope.dataKecamatan);
        //     })

        // };

        // $scope.getIdKecamatan = function () {
        //     var idKecamatan = $scope.formData.idKecamatan;
        //     $scope.idKecamatan = $scope.formData.idKecamatan;

        //     //Get Nama Kecamatan
        //     var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo(idKecamatan);
        //     var listNamaKecamatan = $firebaseArray(namaKecamatan);
        //     listNamaKecamatan.$loaded().then(function (response) {
        //         $scope.namaKecamatan = response[0].nama_kecamatan;
        //         //console.log($scope.namaKecamatan);
        //     });

        //     $ionicLoading.show()
        //     var refKecamatan = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo(idKecamatan);
        //     var listKecamatan = $firebaseArray(refKecamatan);

        //     listKecamatan.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         $scope.dataSekolah = response;
        //         for (i = 0; i < response.length; i++) {
        //             var updateData = firebase.database().ref("dataSekolahIndonesia/" + response[i].$id);
        //             updateData.update({
        //                 "filter": response[i].id_kecamatan + "_" + response[i].jenjang
        //             }).then(function (resp) {
        //                 $ionicLoading.hide();
        //             })
        //         }

        //     })
        // }

        // $scope.getJenjang = function () {
        //     var jenjang = $scope.formData.jenjang;
        //     if (jenjang === "SD") {
        //         $scope.tingkatKelas = [1, 2, 3, 4, 5, 6];
        //     }
        //     else if (jenjang === "SMP") {
        //         $scope.tingkatKelas = [7, 8, 9];
        //     }
        //     else if (jenjang === "SMA" || jenjang === "SMK") {
        //         $scope.tingkatKelas = [10, 11, 12];
        //     }

        //     var refJenjang = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.idKecamatan + "_" + jenjang);
        //     var listJenjang = $firebaseArray(refJenjang);

        //     $ionicLoading.show();
        //     listJenjang.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         $scope.dataSekolah = response;

        //     })
        // };

        // $scope.getIdSekolah = function () {
        //     var idSekolah = $scope.formData.idSekolah;

        //     var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
        //     refDataSekolah.on("value", function (snapshot) {
        //         $scope.namaSekolah = snapshot.val().nama_sekolah;
        //     })

        //     var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
        //     listRefKelas = $firebaseArray(refKelas);
        //     $ionicLoading.show();
        //     listRefKelas.$loaded().then(function (response) {
        //         $ionicLoading.hide();

        //         if (response.length == 0) {
        //             $scope.tampilBuatKelas = true;
        //             $scope.tampilNamaKelas = false;
        //         }
        //         else {
        //             $scope.tampilBuatKelas = false;
        //             $scope.tampilNamaKelas = true;
        //         }
        //         $scope.dataKelas = response;

        //     })
        // };

        // var tahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        // $scope.tahunAjaran = $firebaseArray(tahunAjaran);

        // $scope.getTahunAjaran = function () {
        //     id = $scope.formData.idTahunAjaran;
        //     var getDataTahunAjaran = firebase.database().ref("tahunAjaran/" + id);
        //     getDataTahunAjaran.on("value", function (snapshot) {
        //         $scope.dataTahunAjaran = snapshot.val().tahunAjaran
        //     })
        //     var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + id);
        //     listRefKelas = $firebaseArray(refKelas);
        //     $ionicLoading.show();
        //     listRefKelas.$loaded().then(function (response) {
        //         $ionicLoading.hide();

        //         if (response.length === 0) {
        //             $scope.tampilBuatKelas = true;
        //             $scope.tampilNamaKelas = false;
        //         }
        //         else {
        //             $scope.tampilBuatKelas = false;
        //             $scope.tampilNamaKelas = true;
        //         }
        //         $scope.dataKelas = response;

        //     })
        // }

        // $scope.buatKelasBaru = function () {
        //     $ionicModal.fromTemplateUrl('templates/modal.html', {
        //         scope: $scope,
        //         animation: 'slide-in-up'
        //     }).then(function (modal) {
        //         $scope.modal = modal;
        //         $scope.modal.show();

        //         $scope.getTahunAjaran = function () {
        //             var id = $scope.formData.idTahunAjaran;
        //             var tahunAjaran = firebase.database().ref("tahunAjaran/" + id);
        //             tahunAjaran.on("value", function (snapshot) {
        //                 $scope.namaTahunAjaran = snapshot.val().tahunAjaran
        //             })
        //         }

        //         $scope.simpan = function () {
        //             var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
        //             if ($scope.formData.idTahunAjaran !== "" && $scope.formData.tingkatKelas !== "" && $scope.formData.namaKelas !== "" && $scope.formData.idPrasarana !== "") {

        //                 //cek
        //                 var refCek = firebase.database().ref("dataKelas").orderByChild("filter_input").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas);
        //                 var listRefCek = $firebaseArray(refCek);
        //                 listRefCek.$loaded().then(function (response) {
        //                     if (response.length === 0) {
        //                         $ionicLoading.show();
        //                         var insertData = firebase.database().ref("dataKelas");
        //                         insertData.push(JSON.parse(JSON.stringify({
        //                             "idTahunAjaran": $scope.formData.idTahunAjaran,
        //                             "tahunAjaran": $scope.namaTahunAjaran,
        //                             "tingkatKelas": $scope.formData.tingkatKelas,
        //                             "namaKelas": $scope.formData.namaKelas,
        //                             // "idPrasarana": $scope.formData.idPrasarana,
        //                             // "namaPrasarana": $scope.namaPrasarana,
        //                             "createAt": createAt,
        //                             "diBuatOleh": "",
        //                             "idPembuat": "",
        //                             "idSekolah": $scope.formData.idSekolah,
        //                             "idKotaKabupaten": $scope.formData.idKotaKabupaten,
        //                             "idKecamatan": $scope.formData.idKecamatan,
        //                             "namaKecamatan": $scope.namaKecamatan,
        //                             "jenjang": $scope.formData.jenjang,
        //                             "namaSekolah": $scope.namaSekolah,
        //                             "filter_input": $scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas,
        //                             "filter": $scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran
        //                         }))).then(function (resp) {
        //                             $ionicLoading.hide();
        //                             $scope.modal.hide();

        //                             var refKelas = firebase.database().ref("dataKelas").orderByChild("filter").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran);
        //                             listRefKelas = $firebaseArray(refKelas);
        //                             $ionicLoading.show();
        //                             listRefKelas.$loaded().then(function (response) {
        //                                 $ionicLoading.hide();

        //                                 if (response.length === 0) {
        //                                     $scope.tampilBuatKelas = true;
        //                                     $scope.tampilNamaKelas = false;
        //                                 }
        //                                 else {
        //                                     $scope.tampilBuatKelas = false;
        //                                     $scope.tampilNamaKelas = true;
        //                                 }
        //                                 $scope.dataKelas = response;

        //                             })
        //                         })
        //                     }
        //                     else if (response.length === 1) {
        //                         $ionicLoading.hide();

        //                         $ionicPopup.alert({
        //                             title: 'Perhatian',
        //                             template: 'Maaf, Data Kelas Yang Anda Masukkan Sudah Tersedia Di Tahun Ajaran Terpilih, Silahkan Cek Kembali, Terimakasih',

        //                         });
        //                     }
        //                 })

        //             }
        //             else {
        //                 $ionicLoading.hide();
        //                 $ionicPopup.alert({
        //                     title: 'Perhatian',
        //                     template: 'Maaf, Semua Data Harus Diisi, terima kasih',

        //                 });
        //             }
        //         };
        //     });
        // }

        // $scope.getKelas = function () {
        //     id = $scope.formData.idKelas;
        //     console.log(id)
        //     if (id !== "1") {
        //         var getDataKelas = firebase.database().ref("dataKelas/" + id);
        //         getDataKelas.on("value", function (snapshot) {
        //             $scope.namaKelas = snapshot.val().namaKelas;
        //             // console.log($scope.namaKelas)
        //         })
        //     }
        //     else if (id === "1") {
        //         // $scope.namaKelas = "buatKelasBaru";
        //         // console.log($scope.namaKelas)
        //         // console.log('BuatKelasBaru');
        //         $ionicModal.fromTemplateUrl('templates/modal.html', {
        //             scope: $scope,
        //             animation: 'slide-in-up'
        //         }).then(function (modal) {
        //             $scope.modal = modal;
        //             $scope.modal.show();

        //             // $scope.formData = {
        //             //     "idTahunAjaran": "",
        //             //     "tingkatKelas": "",
        //             //     "namaKelas": "",
        //             //     // "idPrasarana": "",
        //             // }

        //             $scope.getTahunAjaran = function () {
        //                 var id = $scope.formData.idTahunAjaran;
        //                 var tahunAjaran = firebase.database().ref("tahunAjaran/" + id);
        //                 tahunAjaran.on("value", function (snapshot) {
        //                     $scope.namaTahunAjaran = snapshot.val().tahunAjaran
        //                 })
        //             }

        //             // $scope.getPrasarana = function () {
        //             //     var id = $scope.formData.idPrasarana;
        //             //     var prasarana = firebase.database().ref("dataPrasarana/" + id);
        //             //     prasarana.on("value", function (snapshot) {
        //             //         $scope.namaPrasarana = snapshot.val().namaPrasarana
        //             //         console.log($scope.namaPrasarana)
        //             //     })
        //             // }

        //             $scope.simpan = function () {
        //                 var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
        //                 if ($scope.formData.idTahunAjaran !== "" && $scope.formData.tingkatKelas !== "" && $scope.formData.namaKelas !== "" && $scope.formData.idPrasarana !== "") {

        //                     //cek
        //                     var refCek = firebase.database().ref("dataKelas").orderByChild("filter_input").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas);
        //                     var listRefCek = $firebaseArray(refCek);
        //                     listRefCek.$loaded().then(function (response) {
        //                         if (response.length === 0) {
        //                             $ionicLoading.show();
        //                             var insertData = firebase.database().ref("dataKelas");
        //                             insertData.push(JSON.parse(JSON.stringify({
        //                                 "idTahunAjaran": $scope.formData.idTahunAjaran,
        //                                 "tahunAjaran": $scope.namaTahunAjaran,
        //                                 "tingkatKelas": $scope.formData.tingkatKelas,
        //                                 "namaKelas": $scope.formData.namaKelas,
        //                                 // "idPrasarana": $scope.formData.idPrasarana,
        //                                 // "namaPrasarana": $scope.namaPrasarana,
        //                                 "createAt": createAt,
        //                                 "diBuatOleh": "",
        //                                 "idPembuat": "",
        //                                 "idSekolah": $scope.formData.idSekolah,
        //                                 "idKotaKabupaten": $scope.formData.idKotaKabupaten,
        //                                 "idKecamatan": $scope.formData.idKecamatan,
        //                                 "namaKecamatan": $scope.namaKecamatan,
        //                                 "jenjang": $scope.formData.jenjang,
        //                                 "namaSekolah": $scope.namaSekolah,
        //                                 "filter_input": $scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.namaKelas,
        //                                 "filter": $scope.formData.idSekolah + "_" + $scope.formData.idTahunAjaran
        //                             }))).then(function (resp) {
        //                                 $ionicLoading.hide();
        //                                 $scope.modal.hide();
        //                             })
        //                         }
        //                         else if (response.length === 1) {
        //                             $ionicLoading.hide();

        //                             $ionicPopup.alert({
        //                                 title: 'Perhatian',
        //                                 template: 'Maaf, Data Kelas Yang Anda Masukkan Sudah Tersedia Di Tahun Ajaran Terpilih, Silahkan Cek Kembali, Terimakasih',

        //                             });
        //                         }
        //                     })

        //                 }
        //                 else {
        //                     $ionicLoading.hide();
        //                     $ionicPopup.alert({
        //                         title: 'Perhatian',
        //                         template: 'Maaf, Semua Data Harus Diisi, terima kasih',

        //                     });
        //                 }
        //             };
        //         });
        //     }
        // }

        $scope.daftar = function () {

            var tanggal = $filter('date')($scope.formData.time, 'yyyy-MM-dd HH:mm:ss Z');
            var tanggalDisplay = $filter('date')($scope.formData.time, 'dd-MM-yyyy');
            var jamDisplay = $filter('date')($scope.formData.time, 'HH:mm:ss');

            if ($scope.formData.statusSiswa === "Siswa") {
                // if ($scope.formData.statusSiswa !== '' && $scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.tingkatKelas !== '' && $scope.formData.idKelas !== '' && $scope.formData.namaPengguna !== '' && $scope.formData.noHandphone !== '' && $scope.formData.jenisKelamin !== '' && $scope.formData.alamat !== '' && $scope.formData.email !== '' && $scope.formData.password !== '' && $scope.formData.ketikUlangPassword !== '' && $scope.formData.idTahunAjaran !== '' && $scope.formData.idKelas !== "1") {

                if ($scope.formData.statusSiswa !== '' && $scope.formData.namaPengguna !== '' && $scope.formData.email !== '' && $scope.formData.password !== '' && $scope.formData.ketikUlangPassword !== '') {

                    if ($scope.formData.password === $scope.formData.ketikUlangPassword) {
                        $ionicLoading.show();
                        var email = $scope.formData.email + '@gmail.com'
                        var auth = $firebaseAuth();
                        auth.$createUserWithEmailAndPassword(email, $scope.formData.password).then(function (response) {

                            var user = firebase.auth().currentUser;

                            //Entry Data Pengguna
                            var refAddPengguna = firebase.database(appSiswa).ref("dataSiswa");
                            refAddPengguna.push({
                                "statusSiswa": $scope.formData.statusSiswa,
                                // "idProvinsi": $scope.formData.idProvinsi,
                                // "namaProvinsi": $scope.namaProvinsi,
                                // "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                                // "namaKotaKabupaten": $scope.namaKotaKabupaten,
                                // "idKecamatan": $scope.formData.idKecamatan,
                                // "namaKecamatan": $scope.namaKecamatan,
                                // "jenjang": $scope.formData.jenjang,
                                // "idSekolah": $scope.formData.idSekolah,
                                // "namaSekolah": $scope.namaSekolah,
                                // "alamat": $scope.formData.alamat,
                                // "jenisKelamin": $scope.formData.jenisKelamin,

                                "namaPengguna": $scope.formData.namaPengguna,
                                // "noHandphone": $scope.formData.noHandphone,
                                "email": email,
                                "nisn": $scope.formData.email,
                                "password": $scope.formData.password,
                                "retypePassword": $scope.formData.ketikUlangPassword,
                                "uid": user.uid,
                                "tanggal": tanggal,
                                "tanggalDisplay": tanggalDisplay,
                                "jamDisplay": jamDisplay,
                                // "filterRegistrasiKota": $scope.formData.jenjang + "_" + $scope.formData.idKotaKabupaten,
                                // "filterRegistrasiProvinsi": $scope.formData.jenjang + "_" + $scope.formData.idProvinsi,

                                "createAt": tanggal,
                                "diBuatOleh": "",
                                "idPembuat": "",

                                
                                // "idTahunAjaran": $scope.formData.idTahunAjaran,
                                // "tahunAjaran": $scope.dataTahunAjaran,
                                // "idKelas": $scope.formData.idKelas,
                                // "namaKelas": $scope.namaKelas,
                                // "tingkatKelas": $scope.formData.tingkatKelas
                            }).then(function (resp) {
                                // var getDataSiswa = firebase.database().ref("dataSiswa/" + resp.key + "/kelasSiswa");
                                // getDataSiswa.push({
                                //     "idTahunAjaran": $scope.formData.idTahunAjaran,
                                //     "tahunAjaran": $scope.dataTahunAjaran,
                                //     "idKelas": $scope.formData.idKelas,
                                //     "namaKelas": $scope.namaKelas,
                                //     "tingkatKelas": $scope.formData.tingkatKelas
                                // }).then(function (res) {
                                //     $ionicLoading.hide();
                                //     //Ambil Data Pengguna
                                //     var dataPengguna = firebase.database().ref("dataSiswa").orderByChild("uid").equalTo(user.uid);
                                //     var listGetID = $firebaseArray(dataPengguna);

                                //     listGetID.$loaded().then(function (response) {
                                //         //console.log(response);
                                //         localStorage.setItem('uidSiswa', user.uid);
                                //         localStorage.setItem('namaPenggunaSiswa', response[0].namaPengguna);
                                //         localStorage.setItem('emailSiswa', response[0].email);
                                //         localStorage.setItem('idPenggunaSiswa', response[0].$id);
                                //         localStorage.setItem('idSekolahSiswa', response[0].idSekolah);
                                //         localStorage.setItem('jenjangSiswa', response[0].jenjang);
                                //         localStorage.setItem('idProvinsiSiswa', response[0].idProvinsi);
                                //         localStorage.setItem('idKotaKabupatenSiswa', response[0].idKotaKabupaten);
                                //         localStorage.setItem('idKecamatanSiswa', response[0].idKecamatan);
                                //         localStorage.setItem('statusSiswa', response[0].statusSiswa);
                                //         localStorage.setItem('namaSekolahSiswa', snapshot.val().namaSekolah);
                                //         localStorage.setItem('namaKotaKabupatenSiswa', snapshot.val().namaKotaKabupaten);
                                //         localStorage.setItem('namaProvinsiSiswa', snapshot.val().namaProvinsi);
                                //         localStorage.setItem('namaKelasSiswa', snapshot.val().namaKelas);
                                //         $state.go('menuSiswa.berandaSiswa');
                                //     }).then(function (resp) {
                                //         window.location.reload(true);
                                //     })
                                // })

                                $ionicLoading.hide();
                                //Ambil Data Pengguna
                                var dataPengguna = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo(user.uid);
                                var listGetID = $firebaseArray(dataPengguna);

                                listGetID.$loaded().then(function (response) {
                                    //console.log(response);
                                    localStorage.setItem('uidSiswa', user.uid);
                                    localStorage.setItem('namaPenggunaSiswa', response[0].namaPengguna);
                                    localStorage.setItem('emailSiswa', response[0].email);
                                    localStorage.setItem('idPenggunaSiswa', response[0].$id);
                                    // localStorage.setItem('idSekolahSiswa', response[0].idSekolah);
                                    // localStorage.setItem('jenjangSiswa', response[0].jenjang);
                                    // localStorage.setItem('idProvinsiSiswa', response[0].idProvinsi);
                                    // localStorage.setItem('idKotaKabupatenSiswa', response[0].idKotaKabupaten);
                                    // localStorage.setItem('idKecamatanSiswa', response[0].idKecamatan);
                                    localStorage.setItem('statusSiswa', response[0].statusSiswa);
                                    // localStorage.setItem('namaSekolahSiswa', snapshot.val().namaSekolah);
                                    // localStorage.setItem('namaKotaKabupatenSiswa', snapshot.val().namaKotaKabupaten);
                                    // localStorage.setItem('namaProvinsiSiswa', snapshot.val().namaProvinsi);
                                    // localStorage.setItem('namaKelasSiswa', snapshot.val().namaKelas);

                                    $state.go('menuSiswa.authSiswa')
                                    // $state.go('menuSiswa.berandaSiswa');
                                }).then(function (resp) {
                                    window.location.reload(true);
                                    $ionicViewService.nextViewOptions({ disableBack: true });
                                })

                            });

                        }).catch(function (error) {
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
            }
            else {
                // if ($scope.formData.statusSiswa !== '' && $scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.namaPengguna !== '' && $scope.formData.noHandphone !== '' && $scope.formData.jenisKelamin !== '' && $scope.formData.alamat !== '' && $scope.formData.email !== '' && $scope.formData.password !== '' && $scope.formData.ketikUlangPassword !== '') {

                if ($scope.formData.statusSiswa !== '' && $scope.formData.namaPengguna !== '' && $scope.formData.email !== '' && $scope.formData.password !== '' && $scope.formData.ketikUlangPassword !== '') {

                    if ($scope.formData.password === $scope.formData.ketikUlangPassword) {
                        $ionicLoading.show();

                        var auth = $firebaseAuth();
                        auth.$createUserWithEmailAndPassword($scope.formData.email, $scope.formData.password).then(function (response) {

                            var user = firebase.auth().currentUser;

                            //Entry Data Pengguna
                            var refAddPengguna = firebase.database(appSiswa).ref("dataSiswa");
                            refAddPengguna.push({
                                "statusSiswa": $scope.formData.statusSiswa,
                                // "idProvinsi": $scope.formData.idProvinsi,
                                // "namaProvinsi": $scope.namaProvinsi,
                                // "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                                // "namaKotaKabupaten": $scope.namaKotaKabupaten,
                                // "idKecamatan": $scope.formData.idKecamatan,
                                // "namaKecamatan": $scope.namaKecamatan,
                                // "jenjang": $scope.formData.jenjang,
                                // "idSekolah": $scope.formData.idSekolah,
                                // "namaSekolah": $scope.namaSekolah,
                                // "alamat": $scope.formData.alamat,
                                // "jenisKelamin": $scope.formData.jenisKelamin,

                                "namaPengguna": $scope.formData.namaPengguna,
                                // "noHandphone": $scope.formData.noHandphone,
                                "email": $scope.formData.email,
                                "password": $scope.formData.password,
                                "retypePassword": $scope.formData.ketikUlangPassword,
                                "uid": user.uid,
                                "tanggal": tanggal,
                                "tanggalDisplay": tanggalDisplay,
                                "jamDisplay": jamDisplay,
                                // "filterRegistrasiKota": $scope.formData.jenjang + "_" + $scope.formData.idKotaKabupaten,
                                // "filterRegistrasiProvinsi": $scope.formData.jenjang + "_" + $scope.formData.idProvinsi,

                                "createAt": tanggal,
                                "diBuatOleh": "",
                                "idPembuat": "",

                                // "idTahunAjaran": $scope.formData.idTahunAjaran,
                                // "tahunAjaran": $scope.dataTahunAjaran,
                                // "idKelas": $scope.formData.idKelas,
                                // "namaKelas": $scope.namaKelas,
                                // "tingkatKelas": $scope.formData.tingkatKelas
                            }).then(function (resp) {
                                $ionicLoading.hide();
                                //Ambil Data Pengguna
                                var dataPengguna = firebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo(user.uid);
                                var listGetID = $firebaseArray(dataPengguna);

                                listGetID.$loaded().then(function (response) {
                                    //console.log(response);
                                    localStorage.setItem('uidSiswa', user.uid);
                                    localStorage.setItem('namaPenggunaSiswa', response[0].namaPengguna);
                                    localStorage.setItem('emailSiswa', response[0].email);
                                    localStorage.setItem('idPenggunaSiswa', response[0].$id);
                                    // localStorage.setItem('idSekolahSiswa', response[0].idSekolah);
                                    // localStorage.setItem('jenjangSiswa', response[0].jenjang);
                                    // localStorage.setItem('idProvinsiSiswa', response[0].idProvinsi);
                                    // localStorage.setItem('idKotaKabupatenSiswa', response[0].idKotaKabupaten);
                                    // localStorage.setItem('idKecamatanSiswa', response[0].idKecamatan);
                                    // localStorage.setItem('statusSiswa', response[0].statusSiswa);

                                    $state.go('menuSiswa.authSiswa');
                                    // $state.go('menuSiswa.berandaSiswa');
                                }).then(function (resp) {
                                    // window.location.reload(true);
                                    $ionicViewService.nextViewOptions({ disableBack: true });
                                })
                            });

                        }).catch(function (error) {
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
            }


        };

    }])

    .controller('registrasiGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', '$ionicViewService', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth, $ionicViewService) {

        $scope.idPenggunaDinas = localStorage.getItem('idPenggunaDinas');
        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.idPenggunaOrangTua = localStorage.getItem('idPenggunaOrangTua');
        $scope.idAdmin = localStorage.getItem('idAdmin')

        if ($scope.idAdmin) {
            $state.go('menuAdmin.berandaAdmin');
        }

        if ($scope.idPenggunaDinas) {
            $state.go('menuDinas.berandaDinas');
        }

        if ($scope.idPenggunaSekolah) {
            $state.go('menuSekolah.berandaSekolah');
        }

        if ($scope.idGuru) {
            $state.go('menuGuru.berandaGuru');
        }

        if ($scope.idPenggunaSiswa) {
            $state.go('menuSiswa.berandaSiswa');
        }

        if ($scope.idPenggunaOrangTua) {
            $state.go('menuOrangTua.berandaOrangTua');
        }

        $scope.formData = {
            // "idProvinsi": '',
            // "idKotaKabupaten": '',
            // "idKecamatan": '',
            // "jenjang": '',
            // "idSekolah": '',
            "namaPengguna": '',
            // "noHandphone": '',
            // "jenisKelamin": '',
            // "alamat": '',
            "email": '',
            "password": '',
            "ketikUlangPassword": '',
            "time": new Date(),
            "ijinPenggunaanAplikasi": true
        };

        //Data Provinsi
        // var refProvinsi = firebase.database().ref("provinsi");
        // var listProvinsi = $firebaseArray(refProvinsi);

        // listProvinsi.$loaded().then(function (response) {
        //     $scope.dataProvinsi = response;
        // });

        // $scope.getIdProvinsi = function () {
        //     var idProvinsi = $scope.formData.idProvinsi;

        //     //Get Nama Provinsi
        //     var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
        //     var listNamaProvinsi = $firebaseArray(namaProvinsi);
        //     listNamaProvinsi.$loaded().then(function (response) {
        //         $scope.namaProvinsi = response[0].nama_provinsi;
        //         //console.log($scope.namaProvinsi);
        //     });

        //     var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo(idProvinsi);
        //     $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
        // };

        // $scope.getIdKotaKabupaten = function () {
        //     var idKotaKabupaten = $scope.formData.idKotaKabupaten;

        //     //Get Nama Kota Kabupaten
        //     var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
        //     var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
        //     listNamaKotaKabupaten.$loaded().then(function (response) {
        //         $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
        //         console.log($scope.namaKotaKabupaten);
        //     });

        //     var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
        //     $scope.dataKecamatan = $firebaseArray(refKecamatan);
        //     //console.log($scope.dataKecamatan);
        // };

        // $scope.getIdKecamatan = function () {
        //     var idKecamatan = $scope.formData.idKecamatan;
        //     $scope.idKecamatan = $scope.formData.idKecamatan;

        //     //Get Nama Kecamatan
        //     var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo(idKecamatan);
        //     var listNamaKecamatan = $firebaseArray(namaKecamatan);
        //     listNamaKecamatan.$loaded().then(function (response) {
        //         $scope.namaKecamatan = response[0].nama_kecamatan;
        //         //console.log($scope.namaKecamatan);
        //     });

        //     $ionicLoading.show()
        //     var refKecamatan = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo(idKecamatan);
        //     var listKecamatan = $firebaseArray(refKecamatan);

        //     listKecamatan.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         $scope.dataSekolah = response;
        //         for (i = 0; i < response.length; i++) {
        //             var updateData = firebase.database().ref("dataSekolahIndonesia/" + response[i].$id);
        //             updateData.update({
        //                 "filter": response[i].id_kecamatan + "_" + response[i].jenjang
        //             }).then(function (resp) {
        //                 $ionicLoading.hide();
        //             })
        //         }

        //     })
        // }

        // $scope.getJenjang = function () {
        //     var jenjang = $scope.formData.jenjang;

        //     var refJenjang = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.idKecamatan + "_" + jenjang);
        //     var listJenjang = $firebaseArray(refJenjang);

        //     $ionicLoading.show();
        //     listJenjang.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         $scope.dataSekolah = response;

        //     })
        // };

        // $scope.getIdSekolah = function () {
        //     var idSekolah = $scope.formData.idSekolah;

        //     var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
        //     refDataSekolah.on("value", function (snapshot) {
        //         $scope.namaSekolah = snapshot.val().nama_sekolah;
        //     })
        // };

        $scope.daftar = function () {
            //console.log($scope.formData);

            var tanggal = $filter('date')($scope.formData.time, 'yyyy-MM-dd HH:mm:ss Z');
            var tanggalDisplay = $filter('date')($scope.formData.time, 'dd-MM-yyyy');
            var jamDisplay = $filter('date')($scope.formData.time, 'HH:mm:ss');

            // if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.kelas !== '' && $scope.formData.namaKelas !== '' && $scope.formData.namaPengguna !== '' && $scope.formData.noHandphone !== '' && $scope.formData.jenisKelamin !== '' && $scope.formData.alamat !== '' && $scope.formData.email !== '' && $scope.formData.password !== '' && $scope.formData.ketikUlangPassword !== '') {

            if ($scope.formData.namaPengguna !== '' && $scope.formData.email !== '' && $scope.formData.password !== '' && $scope.formData.ketikUlangPassword !== '') {

                if ($scope.formData.password === $scope.formData.ketikUlangPassword) {
                    $ionicLoading.show();

                    var auth = $firebaseAuth();
                    auth.$createUserWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                        .then(function (response) {

                            var user = firebase.auth().currentUser;

                            //Entry Data Pengguna
                            var refAddPengguna = firebase.database(appGuru).ref("dataGuru");
                            refAddPengguna.push({
                                // "idProvinsi": $scope.formData.idProvinsi,
                                // "namaProvinsi": $scope.namaProvinsi,
                                // "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                                // "namaKotaKabupaten": $scope.namaKotaKabupaten,
                                // "idKecamatan": $scope.formData.idKecamatan,
                                // "namaKecamatan": $scope.namaKecamatan,
                                // "jenjang": $scope.formData.jenjang,
                                // "idSekolah": $scope.formData.idSekolah,
                                // "namaSekolah": $scope.namaSekolah,
                                // "alamat": $scope.formData.alamat,
                                // "jenisKelamin": $scope.formData.jenisKelamin,

                                "namaPengguna": $scope.formData.namaPengguna,
                                // "noHandphone": $scope.formData.noHandphone,
                                "email": $scope.formData.email,
                                "password": $scope.formData.password,
                                "retypePassword": $scope.formData.ketikUlangPassword,
                                "uid": user.uid,
                                "tanggal": tanggal,
                                "tanggalDisplay": tanggalDisplay,
                                "jamDisplay": jamDisplay,
                                // "filterRegistrasiKota": $scope.formData.jenjang + "_" + $scope.formData.idKotaKabupaten,
                                // "filterRegistrasiProvinsi": $scope.formData.jenjang + "_" + $scope.formData.idProvinsi,
                                "ijinPenggunaanAplikasi": false,
                                "createAt": tanggal,
                                "diBuatOleh": "",
                                "idPembuat": "",

                            }).then(function (resp) {
                                $ionicLoading.hide();
                                //Ambil Data Pengguna
                                var dataPengguna = firebase.database(appGuru).ref("dataGuru").orderByChild("uid").equalTo(user.uid);
                                var listGetID = $firebaseArray(dataPengguna);

                                listGetID.$loaded().then(function (response) {
                                    // console.log(response);

                                    localStorage.setItem('uidGuru', user.uid);
                                    localStorage.setItem('namaGuru', response[0].namaPengguna);
                                    localStorage.setItem('emailGuru', response[0].email);
                                    localStorage.setItem('idGuru', response[0].$id);
                                    // localStorage.setItem('idSekolahGuru', response[0].idSekolah);
                                    // localStorage.setItem('jenjangGuru', response[0].jenjang);
                                    // localStorage.setItem('idProvinsiGuru', response[0].idProvinsi);
                                    // localStorage.setItem('idKotaKabupatenGuru', response[0].idKotaKabupaten);
                                    // localStorage.setItem('idKecamatanGuru', response[0].idKecamatan);
                                    // localStorage.setItem('namaSekolahGuru', response[0].namaSekolah);
                                    // localStorage.setItem('idKecamatanGuru', response[0].idKecamatan);
                                    // localStorage.setItem('namaKecamatanGuru', response[0].namaKecamatan);
                                    // localStorage.setItem('namaKotaKabupatenGuru', response[0].namaKotaKabupaten);
                                    // localStorage.setItem('namaProvinsiGuru', response[0].namaProvinsi);
                                    // localStorage.setItem('jenisKelaminGuru', response[0].jenisKelamin);

                                    $state.go('menuGuru.authGuru')
                                    // $state.go('menuGuru.berandaGuru');
                                }).then(function (resp) {
                                    window.location.reload(true);
                                    $ionicViewService.nextViewOptions({ disableBack: true });
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

    .controller('registrasiSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', '$ionicViewService', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth, $ionicViewService) {

        $scope.idPenggunaDinas = localStorage.getItem('idPenggunaDinas');
        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.idPenggunaOrangTua = localStorage.getItem('idPenggunaOrangTua');
        $scope.idAdmin = localStorage.getItem('idAdmin')

        if ($scope.idAdmin) {
            $state.go('menuAdmin.berandaAdmin');
        }

        if ($scope.idPenggunaDinas) {
            $state.go('menuDinas.berandaDinas');
        }

        if ($scope.idPenggunaSekolah) {
            $state.go('menuSekolah.berandaSekolah');
        }

        if ($scope.idGuru) {
            $state.go('menuGuru.berandaGuru');
        }

        if ($scope.idPenggunaSiswa) {
            $state.go('menuSiswa.berandaSiswa');
        }

        if ($scope.idPenggunaOrangTua) {
            $state.go('menuOrangTua.berandaOrangTua');
        }

        $scope.formData = {
            // "idProvinsi": '',
            // "idKotaKabupaten": '',
            // "idKecamatan": '',
            // "jenjang": '',
            // "idSekolah": '',
            "namaPengguna": '',
            // "noHandphone": '',
            // "jenisKelamin": '',
            // "alamat": '',
            "email": '',
            "password": '',
            "ketikUlangPassword": '',
            "time": new Date(),
            "ijinPenggunaanAplikasi": true
        };

        //Data Provinsi
        // var refProvinsi = firebase.database().ref("provinsi");
        // var listProvinsi = $firebaseArray(refProvinsi);

        // listProvinsi.$loaded().then(function (response) {
        //     $scope.dataProvinsi = response;
        // });

        // $scope.getIdProvinsi = function () {
        //     var idProvinsi = $scope.formData.idProvinsi;

        //     //Get Nama Provinsi
        //     var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
        //     var listNamaProvinsi = $firebaseArray(namaProvinsi);
        //     listNamaProvinsi.$loaded().then(function (response) {
        //         $scope.namaProvinsi = response[0].nama_provinsi;
        //         //console.log($scope.namaProvinsi);
        //     });

        //     var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo(idProvinsi);
        //     $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
        // };

        // $scope.getIdKotaKabupaten = function () {
        //     var idKotaKabupaten = $scope.formData.idKotaKabupaten;

        //     //Get Nama Kota Kabupaten
        //     var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
        //     var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
        //     listNamaKotaKabupaten.$loaded().then(function (response) {
        //         $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
        //         console.log($scope.namaKotaKabupaten);
        //     });

        //     var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
        //     $scope.dataKecamatan = $firebaseArray(refKecamatan);
        //     //console.log($scope.dataKecamatan);
        // };

        // $scope.getIdKecamatan = function () {
        //     var idKecamatan = $scope.formData.idKecamatan;
        //     $scope.idKecamatan = $scope.formData.idKecamatan;

        //     //Get Nama Kecamatan
        //     var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo(idKecamatan);
        //     var listNamaKecamatan = $firebaseArray(namaKecamatan);
        //     listNamaKecamatan.$loaded().then(function (response) {
        //         $scope.namaKecamatan = response[0].nama_kecamatan;
        //         //console.log($scope.namaKecamatan);
        //     });

        //     $ionicLoading.show()
        //     var refKecamatan = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo(idKecamatan);
        //     var listKecamatan = $firebaseArray(refKecamatan);

        //     listKecamatan.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         $scope.dataSekolah = response;
        //         for (i = 0; i < response.length; i++) {
        //             var updateData = firebase.database().ref("dataSekolahIndonesia/" + response[i].$id);
        //             updateData.update({
        //                 "filter": response[i].id_kecamatan + "_" + response[i].jenjang
        //             }).then(function (resp) {
        //                 $ionicLoading.hide();
        //             })
        //         }

        //     })
        // }

        // $scope.getJenjang = function () {
        //     var jenjang = $scope.formData.jenjang;

        //     var refJenjang = firebase.database().ref("dataSekolahIndonesia").orderByChild("filter").equalTo($scope.idKecamatan + "_" + jenjang);
        //     var listJenjang = $firebaseArray(refJenjang);

        //     $ionicLoading.show();
        //     listJenjang.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         $scope.dataSekolah = response;

        //     })
        // };

        // $scope.getIdSekolah = function () {
        //     var idSekolah = $scope.formData.idSekolah;

        //     var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
        //     refDataSekolah.on("value", function (snapshot) {
        //         $scope.namaSekolah = snapshot.val().nama_sekolah;
        //     })
        // };

        $scope.daftar = function () {
            //console.log($scope.formData);

            var tanggal = $filter('date')($scope.formData.time, 'yyyy-MM-dd HH:mm:ss Z');
            var tanggalDisplay = $filter('date')($scope.formData.time, 'dd-MM-yyyy');
            var jamDisplay = $filter('date')($scope.formData.time, 'HH:mm:ss');

            // if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== ''  && $scope.formData.namaKelas !== '' && $scope.formData.namaPengguna !== '' && $scope.formData.noHandphone !== '' && $scope.formData.jenisKelamin !== '' && $scope.formData.alamat !== '' && $scope.formData.email !== '' && $scope.formData.password !== '' && $scope.formData.ketikUlangPassword !== '') {
            if ($scope.formData.namaPengguna !== '' && $scope.formData.email !== '' && $scope.formData.password !== '' && $scope.formData.ketikUlangPassword !== '') {

                if ($scope.formData.password === $scope.formData.ketikUlangPassword) {
                    $ionicLoading.show();

                    var auth = $firebaseAuth();
                    auth.$createUserWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                        .then(function (response) {

                            var user = firebase.auth().currentUser;

                            //Entry Data Pengguna
                            var refAddPengguna = firebase.database().ref("adminSekolah");
                            refAddPengguna.push({
                                // "idProvinsi": $scope.formData.idProvinsi,
                                // "namaProvinsi": $scope.namaProvinsi,
                                // "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                                // "namaKotaKabupaten": $scope.namaKotaKabupaten,
                                // "idKecamatan": $scope.formData.idKecamatan,
                                // "namaKecamatan": $scope.namaKecamatan,
                                // "jenjang": $scope.formData.jenjang,
                                // "idSekolah": $scope.formData.idSekolah,
                                // "namaSekolah": $scope.namaSekolah,
                                // "alamat": $scope.formData.alamat,
                                // "jenisKelamin": $scope.formData.jenisKelamin,

                                "namaPengguna": $scope.formData.namaPengguna,
                                // "noHandphone": $scope.formData.noHandphone,
                                "email": $scope.formData.email,
                                "password": $scope.formData.password,
                                "retypePassword": $scope.formData.ketikUlangPassword,
                                "uid": user.uid,
                                "tanggal": tanggal,
                                "tanggalDisplay": tanggalDisplay,
                                "jamDisplay": jamDisplay,
                                // "filterRegistrasiKota": $scope.formData.jenjang + "_" + $scope.formData.idKotaKabupaten,
                                // "filterRegistrasiProvinsi": $scope.formData.jenjang + "_" + $scope.formData.idProvinsi,
                                "ijinPenggunaanAplikasi": false,
                                "aksesAplikasi": false,
                                "createAt": tanggal,
                                "diBuatOleh": "",
                                "idPembuat": "",

                            }).then(function (resp) {
                                $ionicLoading.hide();
                                //Ambil Data Pengguna
                                var dataPengguna = firebase.database().ref("adminSekolah").orderByChild("uid").equalTo(user.uid);
                                var listGetID = $firebaseArray(dataPengguna);

                                listGetID.$loaded().then(function (response) {
                                    // console.log(response);

                                    localStorage.setItem('idPenggunaSekolah', response[0].$id);
                                    // localStorage.setItem('idSekolah', response[0].idSekolah);
                                    localStorage.setItem('namaPenggunaSekolah', response[0].namaPengguna);
                                    // localStorage.setItem('jenjangSekolah', response[0].jenjang);
                                    // localStorage.setItem('namaSekolah', response[0].namaSekolah);
                                    // localStorage.setItem('idKecamatanSekolah', response[0].idKecamatan);
                                    // localStorage.setItem('idKotaKabupatenSekolah', response[0].idKotaKabupaten);
                                    // localStorage.setItem('idProvinsiSekolah', response[0].idProvinsi)
                                    localStorage.setItem('uidSekolah', user.uid);
                                    // localStorage.setItem('namaKecamatanSekolah', response[0].namaKecamatan);

                                    $state.go('menuSekolah.authSekolah');
                                    // $state.go('menuSekolah.berandaSekolah');
                                }).then(function (resp) {
                                    window.location.reload(true);
                                    $ionicViewService.nextViewOptions({ disableBack: true });
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
