angular.module('app.tugasSekolah', ['ui.tinymce'])

    .controller('tugasSiswaSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        // LOADBALANCING
        if ($scope.idSekolah === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolah === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.tambah = function () {
            // $state.go("menuSekolah.tugasSiswaTambahSekolah");
            $ionicPopup.alert({
                title: 'Perhatian',
                template: 'Maaf, Untuk saat ini hanya guru saja yang boleh membuat tugas. Terima Kasih',
                okType: 'button-balanced'
            });
        }

        // Array.prototype.groupBy = function (prop) {
        //     return this.reduce(function (groups, item) {
        //         const val = item[prop]
        //         groups[val] = groups[val] || []
        //         groups[val].push(item)
        //         return groups
        //     }, {})
        // }

        // var ref = firebase.database().ref("tugasSiswa").orderByChild("idSekolah").equalTo($scope.idSekolah);
        // var listRef = $firebaseArray(ref);
        // $ionicLoading.show();
        // listRef.$loaded().then(function (response) {
        //     $ionicLoading.hide();
        //     $scope.dataTugasSiswa = response
        //     $scope.tugasSiswa = $scope.dataTugasSiswa.groupBy('groupTugas');
        //     // console.log($scope.absensiSiswa)
        // });

        var ref = firebase.database(app).ref("groupTugasSiswa").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.tugasSiswa = response
            // $scope.tugasSiswa = $scope.dataTugasSiswa.groupBy('groupTugas');
            // console.log($scope.tugasSiswa)
        });

        $scope.getData = function (data) {

            $ionicActionSheet.show({
                titleText: 'Data Tugas : ' + data.groupTugas,
                buttons: [
                    { text: '<i class="icon ion-edit"></i> Edit Tugas ' },
                    { text: '<i class="icon ion-social-buffer"></i> Lihat Tugas' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Tugas',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Untuk saat ini hanya guru saja yang boleh mengedit tugas. Terima Kasih',
                            okType: 'button-balanced'
                        });
                        // $state.go("menuSekolah.tugasSiswaEditSekolah", {
                        //     "groupTugas": data.groupTugas
                        // })
                    }
                    if (index === 1) {
                        console.log(data.groupTugas);
                        $state.go("menuSekolah.tugasSiswaLihatSekolah", {
                            "idGroupTugasSiswa": data.$id,
                            "groupTugas": data.groupTugas,
                            "idKelas": data.idKelas,
                            "idPelajaran": data.idPelajaran,
                        })
                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Maaf, Untuk saat ini hanya guru saja yang boleh menghapus tugas. Terima Kasih',
                        okType: 'button-balanced'
                    });
                    // if(data.idPembuat===$scope.idPenggunaSekolah){
                    //     var confirmPopup = $ionicPopup.confirm({
                    //         title: 'Hapus Data',
                    //         template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                    //         okType: "button-balanced",
                    //     });
                    //     confirmPopup.then(function (res) {
                    //         if (res) {
                    //             $ionicLoading.show();
                    //             var refObj = firebase.database(app).ref("tugasSiswa/").orderByChild("groupTugas").equalTo(data.groupTugas);
                    //             var objDelete = $firebaseArray(refObj);
                    //             objDelete.$loaded().then(function (response) {
                    //                 for (i = 0; i < response.length; i++) {
                    //                     var hapusData = firebase.database(app).ref("tugasSiswa/" + response[i].$id);
                    //                     var objDelete = $firebaseObject(hapusData);
                    //                     objDelete.$remove().then(function (ref) {
                    //                         $ionicLoading.hide();
                    //                         console.log('Data Berhasil Dihapus');
                    //                         // window.location.reload(true);
                                            
                    //                     });
                    //                 }
                    //             })
    
                    //             var objGroup = firebase.database(app).ref("groupTugasSiswa").orderByChild("groupTugas").equalTo(data.groupTugas);
                    //             var listObjGroup = $firebaseArray(objGroup);
                    //             listObjGroup.$loaded().then(function (hapus) {
                    //                 var id = hapus[0].$id;
    
                    //                 var objHapus = firebase.database(app).ref("groupTugasSiswa/" + id);
                    //                 var objHapusData = $firebaseObject(objHapus);
                    //                 objHapusData.$remove().then(function (yes) {
                    //                     console.log("terhapus")
                    //                 })
                    //             })
    
                    //         }
                    //         else {
                    //             //console.log('Tidak Jadi Menghapus');
                    //         }
                    //     });
                    // }
                    // else{
                    //     $ionicPopup.alert({
                    //         title: 'Perhatian',
                    //         template: 'Maaf, Anda tidak diperkenankan untuk menghapus data ini, atau Anda harus masuk ke beranda guru yang bersangkutan jika ingin menghapus. Terima Kasih',
                    //         okType: 'button-balanced'
                    //     });
                    // }
                    return true;
                }

            });
        }

    }])

    .controller('tugasSiswaTambahSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')
        // LOADBALANCING
        if ($scope.idSekolah === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolah === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.tinymceOptions = {
            content_css: '//www.tiny.cloud/css/codepen.min.css',
            plugins: [
                'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
                'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                'save table contextmenu directionality emoticons template paste textcolor image code '
            ],
            external_plugins: { tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js' },
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry",

            /* enable title field in the Image dialog*/
            image_title: true,
            /* enable automatic uploads of images represented by blob or data URIs*/
            automatic_uploads: true,
            /*
              URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
              images_upload_url: 'postAcceptor.php',
              here we add custom filepicker only to Image dialog
            */
            file_picker_types: 'image',
            /* and here's our custom image picker*/
            file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');

                /*
                  Note: In modern browsers input[type="file"] is functional without
                  even adding it to the DOM, but that might not be the case in some older
                  or quirky browsers like IE, so you might want to add it to the DOM
                  just in case, and visually hide it. And do not forget do remove it
                  once you do not need it anymore.
                */

                input.onchange = function () {
                    var file = this.files[0];

                    var reader = new FileReader();
                    reader.onload = function () {
                        /*
                          Note: Now we need to register the blob in TinyMCEs image blob
                          registry. In the next release this part hopefully won't be
                          necessary, as we are looking to handle it internally.
                        */
                        var id = 'blobid' + (new Date()).getTime();
                        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                        var base64 = reader.result.split(',')[1];
                        var blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);

                        /* call the callback and populate the Title field with the file name */
                        cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                };

                input.click();
            }
        };

        $scope.formData = {
            "idProvinsi": '',
            "idKotaKabupaten": '',
            "idKecamatan": '',
            "jenjang": '',
            "idSekolah": '',
            "idSekolah": '',
            "tanggal": new Date(),
            "idTahunAjaran": '',
            "idSemester": '',
            "idKelas": '',
            "idPelajaran": '',
            "isiTugas": '',
            "tanggalPengumpulanTugas": new Date()

        }

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo($scope.idProvinsiSekolah);
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

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo($scope.idKotaKabupatenSekolah);
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

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kecamatan").equalTo($scope.idKecamatanSekolah);
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

            if (idSekolah === $scope.idSekolah) {
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
            }
            else {
                $scope.formData.idSekolah = "";
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Anda tidak diperkenankan memilih sekolah lain. Terimakasih',
                    okType: 'button-balanced'
                });
            }
        };

        $scope.getGuru = function () {

            var refDataGuru = firebase.database(appGuru).ref("dataGuru/" + $scope.formData.idGuru);
            refDataGuru.on("value", function (snapshot) {
                $scope.namaGuru = snapshot.val().namaPengguna;
            })
            Array.prototype.groupBy = function (prop) {
                return this.reduce(function (groups, item) {
                    const val = item[prop]
                    groups[val] = groups[val] || []
                    groups[val].push(item)
                    return groups
                }, {})
            }

            var refKelas = firebase.database(app).ref("jadwalPelajaran/").orderByChild("filterGuru").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran);
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

            var refKelas = firebase.database(app).ref("jadwalPelajaran/").orderByChild("filterGuru").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran);
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

            var refKelas = firebase.database(app).ref("jadwalPelajaran/").orderByChild("filterPelajaran").equalTo($scope.formData.idSekolah + "_" + $scope.formData.idGuru + "_" + $scope.formData.idTahunAjaran + "_" + $scope.formData.idKelas);
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

        $scope.dataTugas = [];
        $scope.getTugas = function (data, $index) {

            var tanggalAbsensi = $filter('date')($scope.formData.tanggal, 'yyyy-MM-dd');
            var hariAbsensi = $filter('date')(new (Date), 'EEEE');
            var jamAbsensi = $filter('date')(new (Date), 'HH:mm:ss');
            var tanggalPengumpulanTugas = $filter('date')($scope.formData.tanggalPengumpulanTugas, 'yyyy-MM-dd');
            var kirimTugas = $scope.formData.kirimTugas[$index];
            console.log("valuenya", kirimTugas);

            if ($scope.dataTugas.length === 0) {
                $scope.dataTugas.push({
                    "idSiswa": data.$id,
                    "namaSiswa": data.namaPengguna,
                    "kirimTugas": kirimTugas,

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
                    "isiTugas": $scope.formData.isiTugas,
                    "kirimTugas": true,

                    "tanggalTugas": tanggalAbsensi,
                    "hariTugas": hariAbsensi,
                    "jamTugas": jamAbsensi,
                    "tanggalPengumpulanTugas": tanggalPengumpulanTugas
                })
            }
            else if ($scope.dataTugas.length > 0) {
                var idSiswa = data.$id;
                var objIndex = $scope.dataTugas.map(function (obj) { return obj.idSiswa; }).indexOf(idSiswa);
                console.log("data indexnya : " + objIndex);
                if (objIndex < 0) {
                    $scope.dataTugas.push({
                        "idSiswa": data.$id,
                        "namaSiswa": data.namaPengguna,
                        "kirimTugas": kirimTugas,

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
                        "isiTugas": $scope.formData.isiTugas,
                        "kirimTugas": true,

                        "tanggalTugas": tanggalAbsensi,
                        "hariTugas": hariAbsensi,
                        "jamTugas": jamAbsensi,
                        "tanggalPengumpulanTugas": tanggalPengumpulanTugas
                    })
                }
                else {
                    if (kirimTugas === true) {
                        $scope.dataTugas[objIndex].kirimTugas = kirimTugas;
                    }
                    else if (kirimTugas === false) {
                        $scope.dataTugas.splice(objIndex, 1);
                    }
                }
            }
            console.log($scope.dataTugas);
        };

        $scope.simpan = function () {
            var groupTugas = $filter('date')($scope.formData.tanggal, 'yyyyMMddHHmmss');
            var tanggalTugas = $filter('date')($scope.formData.tanggal, 'yyyy-MM-dd');
            var hariTugas = $filter('date')(new (Date), 'EEEE');
            var jamTugas = $filter('date')(new (Date), 'HH:mm:ss');
            var tanggalPengumpulanTugas = $filter('date')($scope.formData.tanggalPengumpulanTugas, 'yyyy-MM-dd');
            if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.idSekolah !== '' && $scope.formData.idTahunAjaran !== '' && $scope.formData.idSemester !== '' && $scope.formData.idKelas !== '' && $scope.formData.idPelajaran !== "" && $scope.formData.isiTugas !== '' && $scope.formData.tanggalPengumpulanTugas !== '') {
                if ($scope.dataTugas.length === $scope.dataSiswa.length) {
                    $ionicLoading.show();
                    var insertGroupTugas = firebase.database(app).ref("groupTugasSiswa");
                    insertGroupTugas.push({
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

                        "tanggalTugas": tanggalTugas,
                        "hariTugas": hariTugas,
                        "jamTugas": jamTugas,
                        "tanggalPengumpulanTugas": tanggalPengumpulanTugas,
                        "groupTugas": groupTugas,
                        "idPembuat" : $scope.idPenggunaSekolah

                    }).then(function(ok){
                        for (i = 0; i < $scope.dataTugas.length; i++) {
                            var insertData = firebase.database(app).ref("tugasSiswa");
                            insertData.push({
                                "idSiswa": $scope.dataTugas[i].idSiswa,
                                "namaSiswa": $scope.dataTugas[i].namaSiswa,
                                "kirimTugas": $scope.dataTugas[i].kirimTugas,
    
                                "idProvinsi": $scope.dataTugas[i].idProvinsi,
                                "namaProvinsi": $scope.dataTugas[i].namaProvinsi,
                                "idKotaKabupaten": $scope.dataTugas[i].idKotaKabupaten,
                                "namaKotaKabupaten": $scope.dataTugas[i].namaKotaKabupaten,
                                "idKecamatan": $scope.dataTugas[i].idKecamatan,
                                "namaKecamatan": $scope.dataTugas[i].namaKecamatan,
                                "jenjang": $scope.dataTugas[i].jenjang,
                                "idSekolah": $scope.dataTugas[i].idSekolah,
                                "namaSekolah": $scope.dataTugas[i].namaSekolah,
                                "idGuru": $scope.dataTugas[i].idGuru,
                                "namaGuru": $scope.dataTugas[i].namaGuru,
    
                                "idTahunAjaran": $scope.dataTugas[i].idTahunAjaran,
                                "tahunAjaran": $scope.dataTugas[i].tahunAjaran,
                                "idSemester": $scope.dataTugas[i].idSemester,
                                "semester": $scope.dataTugas[i].semester,
                                "idKelas": $scope.dataTugas[i].idKelas,
                                "namaKelas": $scope.dataTugas[i].namaKelas,
                                "idPelajaran": $scope.dataTugas[i].idPelajaran,
                                "pelajaran": $scope.dataTugas[i].pelajaran,
                                "isiTugas": $scope.dataTugas[i].isiTugas,
                                "kirimTugas": $scope.dataTugas[i].kirimTugas,
    
                                "tanggalTugas": $scope.dataTugas[i].tanggalTugas,
                                "hariTugas": $scope.dataTugas[i].hariTugas,
                                "jamTugas": $scope.dataTugas[i].jamTugas,
                                "tanggalPengumpulanTugas": $scope.dataTugas[i].tanggalPengumpulanTugas,
                                "groupTugas": groupTugas,
                                "dibaca": false,
                                "statusDibaca": $scope.dataTugas[i].idSiswa+"_"+false,
                                "idPembuat" : $scope.idPenggunaSekolah
                            }).then(function (resp) {
                                $ionicLoading.hide();
                                $state.go("menuSekolah.tugasSiswaSekolah");
    
                            })
                        }
                    })
                    
                }
                else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: 'Masih ada beberapa siswa yang belum Anda Ceklist, silahkan cek kembali, terimakasih',
                        okType: 'button-balanced'
                    });
                }
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Seluruh Data Harus Diisi, Terima Kasih',
                    okType: 'button-balanced'
                });
            }
        }

    }])

    .controller('tugasSiswaLihatSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')
        // LOADBALANCING
        if ($scope.idSekolah === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolah === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "idGroupTugasSiswa": $stateParams.idGroupTugasSiswa,
            "groupTugas": $stateParams.groupTugas,
            "idKelas": $stateParams.idKelas,
            "idPelajaran": $stateParams.idPelajaran,
        }

        console.log($scope.data.groupTugas)

        var getAbs = firebase.database(app).ref("tugasSiswa").child($scope.data.idKelas).child($scope.data.idPelajaran).orderByChild("groupTugas").equalTo($scope.data.groupTugas);
        var listGetAbs = $firebaseArray(getAbs);
        $ionicLoading.show();
        listGetAbs.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataGetTugas = response;
            $scope.dataTugas = response[0];
        })

        var fileTugas = firebase.database(app).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa + "/fileGuru");
        var listFileTugas = $firebaseArray(fileTugas);
        listFileTugas.$loaded().then(function (response) {
            $scope.fileTugasGuru = response;
            $scope.banyakFile = response.length;
            console.log($scope.banyakFile);
        });

        $scope.lihatJawabanTugas = function (data) {
            // console.log(data.jawabanTugas)
            $state.go("menuSekolah.LihatJawabanTugasSiswaSekolah", {
                "idTugas": data.$id,
                "namaSiswa": data.namaSiswa,
                "idKelas": data.idKelas,
                "idPelajaran": data.idPelajaran,
            })
        }

    }])

    .controller('LihatJawabanTugasSiswaSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        // LOADBALANCING
        if ($scope.idSekolah === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolah === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "idTugas": $stateParams.idTugas,
            "namaSiswa": $stateParams.namaSiswa,
            "idKelas": $stateParams.idKelas,
            "idPelajaran": $stateParams.idPelajaran,
        }

        var refTugas = firebase.database(app).ref("tugasSiswa/" + $scope.data.idKelas + "/" + $scope.data.idPelajaran + "/" + $scope.data.idTugas);
        var objTugas = $firebaseObject(refTugas);
        $ionicLoading.show();
        objTugas.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.formData = response;
        });

        var fileTugas = firebase.database(app).ref("tugasSiswa/" + $scope.data.idKelas + "/" + $scope.data.idPelajaran + "/" + $scope.data.idTugas + "/fileSiswa");
        var listFileTugas = $firebaseArray(fileTugas);
        listFileTugas.$loaded().then(function (response) {
            $scope.fileTugasSiswa = response;
            $scope.banyakFile = response.length;
        })

        $scope.simpan = function () {
            if ($scope.formData.nilaiTugasSiswa !== undefined) {
                refTugas.update(JSON.parse(JSON.stringify({
                    "nilaiTugasSiswa": $scope.formData.nilaiTugasSiswa
                }))).then(function (resp) {
                    $ionicPopup.alert({
                        title: 'SUKSES',
                        template: 'Nilai Tugas ' + $scope.data.namaSiswa + ' Berhasil Dikirim',
                        okType: 'button-balanced'
                    });
                })
            }
        }

    }])

    .controller('tugasSiswaEditSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        // LOADBALANCING
        if ($scope.idSekolah === "-MQjdKWahm0gX0nyNuIF") { var app = app_smpn1; }
        else if ($scope.idSekolah === "-MfbLcag5nLp210rIgPK") { var app = app_smpn1sukasada; }
        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.data = {
            "groupTugas": $stateParams.groupTugas
        }

        $scope.tinymceOptions = {
            content_css: '//www.tiny.cloud/css/codepen.min.css',
            plugins: [
                'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
                'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                'save table contextmenu directionality emoticons template paste textcolor image code '
            ],
            external_plugins: { tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js' },
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry",

            /* enable title field in the Image dialog*/
            image_title: true,
            /* enable automatic uploads of images represented by blob or data URIs*/
            automatic_uploads: true,
            /*
              URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
              images_upload_url: 'postAcceptor.php',
              here we add custom filepicker only to Image dialog
            */
            file_picker_types: 'image',
            /* and here's our custom image picker*/
            file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');

                /*
                  Note: In modern browsers input[type="file"] is functional without
                  even adding it to the DOM, but that might not be the case in some older
                  or quirky browsers like IE, so you might want to add it to the DOM
                  just in case, and visually hide it. And do not forget do remove it
                  once you do not need it anymore.
                */

                input.onchange = function () {
                    var file = this.files[0];

                    var reader = new FileReader();
                    reader.onload = function () {
                        /*
                          Note: Now we need to register the blob in TinyMCEs image blob
                          registry. In the next release this part hopefully won't be
                          necessary, as we are looking to handle it internally.
                        */
                        var id = 'blobid' + (new Date()).getTime();
                        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                        var base64 = reader.result.split(',')[1];
                        var blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);

                        /* call the callback and populate the Title field with the file name */
                        cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                };

                input.click();
            }
        };

        var getAbs = firebase.database(app).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
        var listGetAbs = $firebaseArray(getAbs);
        $ionicLoading.show();
        listGetAbs.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSiswa = response;
            $scope.formData = response[0];
            $scope.formData.tanggalPengumpulanTugas = new Date(response[0].tanggalPengumpulanTugas)
        })

        $scope.getTugas = function (data) {
            var refAbsensi = firebase.database(app).ref("tugasSiswa/" + data.$id);
            refAbsensi.update({
                "kirimTugas": data.kirimTugas
            }).then(function (resp) {
                console.log("updated");
            })
        }

        $scope.simpan = function () {
            var tanggalPengumpulanTugas = $filter('date')($scope.formData.tanggalPengumpulanTugas, 'yyyy-MM-dd');
            if ($scope.formData.isiTugas !== "" && $scope.formData.tanggalPengumpulanTugas !== "") {

                var getAbs = firebase.database(app).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
                var listGetAbs = $firebaseArray(getAbs);
                listGetAbs.$loaded().then(function (response) {
                    for(i=0; i<response.length; i++){
                        var updateData = firebase.database(app).ref("tugasSiswa/"+response[i].$id);
                        updateData.update({
                            "isiTugas" : $scope.formData.isiTugas,
                            "tanggalPengumpulanTugas": tanggalPengumpulanTugas
                        }).then(function(resp){
                            $state.go("menuSekolah.tugasSiswaSekolah")
                        })
                    }
                })

            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Seluruh Data Harus Diisi, Terima Kasih',
                    okType: 'button-balanced'
                });
            }
        }


    }])