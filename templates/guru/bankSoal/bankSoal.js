angular.module('app.bankSoalGuru', ['ngYoutubeEmbed'])

    .controller('bankSoalGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        $scope.tambah = function () {
            $state.go("menuGuru.bankSoalTambahGuru");
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database(appBankSoal).ref("soal").orderByChild("uid").equalTo($scope.uidGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSoalGuru = response
            $scope.dataSoal = $scope.dataSoalGuru.groupBy('pelajaran');
            // for (i = 0; i < response.length; i++) {
            //     var refUpdate = firebase.database().ref("soal/" + response[i].$id);
            //     refUpdate.update(JSON.parse(JSON.stringify({
            //         "filterPelajaranUid": response[i].idPelajaran + "_" + response[i].uid,
            //         "filterSoalUjianUid": response[i].idPelajaran + "_" + response[i].jenjang + "_" + response[i].kelas + "_" + response[i].uid
            //     }))).then(function (resp) {
            //     })
            // }
        });

        $scope.getData = function (x, y) {
            $state.go('menuGuru.bankSoalPerJenjangGuru', {
                "pelajaran": x,
                "idPelajaran": y[0].idPelajaran
            });
        }

    }])

    .controller('bankSoalTambahGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        $scope.PG = true

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

        var refPelajaran = firebase.database().ref("mataPelajaran");
        $scope.mataPelajaran = $firebaseArray(refPelajaran);


        $scope.formData = {
            "jenjang": 'SMP',
            "kelas": '',
            "idPelajaran": '',
            "kategori": 'Soal Umum',
            "kompetensiInti": '',
            "kompetensiDasar": '',
            "jenisSoal": '',
            "idMateriSoal": '',
            "materiSoal": '',
            "bobotSoal": 'Sedang',
            "soal": '',
            "jawabanA": '',
            "jawabanB": '',
            "jawabanC": '',
            "jawabanD": '',
            "jawabanE": '',
            "kunciJawaban": '',
            "pembahasanSoal": '',
            "videoPembahasan": '',
            "publish": false,
            "createAt": new Date(),
        };

        // $scope.getJenjang = function () {
        //     if ($scope.formData.jenjang === 'SD') {
        //         $scope.kelas = ['1', '2', '3', '4', '5', '6']
        //     }
        //     else if ($scope.formData.jenjang === 'SMP') {
        //         $scope.kelas = ['7', '8', '9']
        //     }
        //     else if ($scope.formData.jenjang === 'SMA' || $scope.formData.jenjang === 'SMK') {
        //         $scope.kelas = ['10', '11', '12']
        //     }

        //     var cekMateriSoal = firebase.database(appBankSoal).ref("materiSoal").orderByChild("filter").equalTo($scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.idPelajaran);
        //     var listCekMateriSoal = $firebaseArray(cekMateriSoal);
        //     $ionicLoading.show();
        //     listCekMateriSoal.$loaded().then(function (response) {
        //         $ionicLoading.hide();
        //         $scope.datas = response;
        //     })
        // }

        $scope.kelas = ['7', '8', '9']
        $scope.getKelas = function () {
            var cekMateriSoal = firebase.database(appBankSoal).ref("materiSoal").orderByChild("filter").equalTo($scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.idPelajaran);
            var listCekMateriSoal = $firebaseArray(cekMateriSoal);
            $ionicLoading.show();
            listCekMateriSoal.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            })
        }

        $scope.getPelajaran = function () {
            var refPelajaran = firebase.database().ref("mataPelajaran/" + $scope.formData.idPelajaran);
            refPelajaran.on("value", function (snapshot) {
                $scope.pelajaran = snapshot.val().pelajaran;

            });

            var cekMateriSoal = firebase.database(appBankSoal).ref("materiSoal").orderByChild("filter").equalTo($scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.idPelajaran);
            var listCekMateriSoal = $firebaseArray(cekMateriSoal);
            $ionicLoading.show();
            listCekMateriSoal.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            })
        };

        $scope.buatMateriBaru = function () {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.simpanDataMateri = function () {
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                    if ($scope.formData.namaGuru !== "") {
                        //cek
                        var refCek = firebase.database(appBankSoal).ref("materiSoal").orderByChild("filterMateri").equalTo($scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.idPelajaran + "_" + $scope.formData.namaMateriSoal);
                        var listRefCek = $firebaseArray(refCek);
                        listRefCek.$loaded().then(function (response) {
                            if (response.length === 0) {
                                $ionicLoading.show();
                                var insertData = firebase.database(appBankSoal).ref("materiSoal");
                                insertData.push(JSON.parse(JSON.stringify({
                                    "jenjang": $scope.formData.jenjang,
                                    "kelas": $scope.formData.kelas,
                                    "idPelajaran": $scope.formData.idPelajaran,
                                    "pelajaran": $scope.pelajaran,
                                    "materiSoal": $scope.formData.namaMateriSoal,
                                    "createAt": createAt,
                                    "diBuatOleh": $scope.namaGuru,
                                    "idPembuat": $scope.idGuru,
                                    "filter": $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.idPelajaran,
                                    "filterMateri": $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.idPelajaran + "_" + $scope.formData.namaMateriSoal
                                }))).then(function (resp) {
                                    $ionicLoading.hide();
                                    $scope.modal.hide();

                                    var cekMateriSoal = firebase.database(appBankSoal).ref("materiSoal").orderByChild("filter").equalTo($scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.idPelajaran);
                                    var listCekMateriSoal = $firebaseArray(cekMateriSoal);
                                    $ionicLoading.show();
                                    listCekMateriSoal.$loaded().then(function (response) {
                                        $ionicLoading.hide();
                                        $scope.datas = response;
                                    })
                                })
                            }
                            else if (response.length === 1) {
                                $ionicLoading.hide();

                                $ionicPopup.alert({
                                    title: 'Perhatian',
                                    template: 'Maaf, Materi Soal Yang Anda Isikan Sudah Tersedia, Mohon Cek Kembali, Terimakasih',

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
        }

        $scope.getMateri = function () {
            id = $scope.formData.idMateriSoal;
            var getDataMateri = firebase.database(appBankSoal).ref("materiSoal/" + id);
            getDataMateri.on("value", function (snapshot) {
                $scope.formData.materiSoal = snapshot.val().materiSoal;
            })
        }

        $scope.getJenisSoal = function () {
            if ($scope.formData.jenisSoal === 'Essay') {
                $scope.PG = false
            }
        }

        $scope.simpan = function () {
            var tanggal = $filter('date')($scope.formData.createAt, 'yyyy-MM-dd HH:mm:ss Z');
            var tanggalDisplay = $filter('date')($scope.formData.createAt, 'dd-MM-yyyy');
            var jamDisplay = $filter('date')($scope.formData.createAt, 'HH:mm:ss');

            if ($scope.formData.jenisSoal === "Pilihan Ganda") {
                if ($scope.formData.jenjang !== '' && $scope.formData.idMateriSoal !== '' && $scope.formData.kelas !== '' && $scope.formData.idPelajaran !== '' && $scope.formData.jenisSoal !== '' && $scope.formData.soal !== '' && $scope.formData.jawabanA !== '' && $scope.formData.jawabanB !== '' && $scope.formData.jawabanC !== '' && $scope.formData.jawabanD !== '' && $scope.formData.kunciJawaban !== '') {
                    var add = firebase.database(appBankSoal).ref("soal");
                    add.push({
                        "jenjang": $scope.formData.jenjang,
                        "kelas": $scope.formData.kelas,
                        "idPelajaran": $scope.formData.idPelajaran,
                        "pelajaran": $scope.pelajaran,
                        "kategori": $scope.formData.kategori,
                        "kompetensiInti": $scope.formData.kompetensiInti,
                        "kompetensiDasar": $scope.formData.kompetensiDasar,
                        "jenisSoal": $scope.formData.jenisSoal,
                        "idMateriSoal": $scope.formData.idMateriSoal,
                        "materiSoal": $scope.formData.materiSoal,
                        "bobotSoal": $scope.formData.bobotSoal,
                        "soal": $scope.formData.soal,
                        "jawabanA": $scope.formData.jawabanA,
                        "jawabanB": $scope.formData.jawabanB,
                        "jawabanC": $scope.formData.jawabanC,
                        "jawabanD": $scope.formData.jawabanD,
                        "jawabanE": $scope.formData.jawabanE,
                        "kunciJawaban": $scope.formData.kunciJawaban,
                        "pembahasanSoal": $scope.formData.pembahasanSoal,
                        "videoPembahasan": $scope.formData.videoPembahasan,
                        "publish": $scope.formData.publish,

                        "tanggalBuat": tanggal,
                        "tanggalDisplay": tanggalDisplay,
                        "jamDisplay": jamDisplay,

                        "filterSoalOlimpiade": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang,
                        "filterSoalUjian": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas,
                        "filterDisplaySoal": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.publish,
                        "filterPelajaranDisplay": $scope.formData.idPelajaran + "_" + $scope.formData.publish,

                        "uid": $scope.uidGuru,
                        "idGuru": $scope.idGuru,
                        "idSekolah": $scope.idSekolahGuru,

                        "filterPelajaranIdSekolah": $scope.formData.idPelajaran + "_" + $scope.idSekolahGuru,
                        "filterSoalUjianIdSekolah": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.idSekolahGuru,
                        "filterPelajaranUid": $scope.formData.idPelajaran + "_" + $scope.uidGuru,
                        "filterSoalUjianUid": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.uidGuru,

                        "idPembuat": $scope.idGuru,
                    }).then(function (resp) {
                        $state.go("menuGuru.bankSoalGuru");
                        $ionicPopup.alert({
                            title: 'SUKSES',
                            template: "Soal Berhasil Ditambahkan",
                            okType: "button-positive"
                        });
                    });
                }
                else {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: "Beberapa data harus diisi",
                        okType: "button-positive"
                    });
                }
            }
            else {
                if ($scope.formData.jenjang !== '' && $scope.formData.idMateriSoal !== '' || $scope.formData.idMateriSoal !== '1' && $scope.formData.kelas !== '' && $scope.formData.idPelajaran !== '' && $scope.formData.jenisSoal !== '' && $scope.formData.soal !== '') {
                    var add = firebase.database(appBankSoal).ref("soal");
                    add.push({
                        "jenjang": $scope.formData.jenjang,
                        "kelas": $scope.formData.kelas,
                        "idPelajaran": $scope.formData.idPelajaran,
                        "pelajaran": $scope.pelajaran,
                        "kategori": $scope.formData.kategori,
                        "kompetensiInti": $scope.formData.kompetensiInti,
                        "kompetensiDasar": $scope.formData.kompetensiDasar,
                        "jenisSoal": $scope.formData.jenisSoal,
                        "idMateriSoal": $scope.formData.idMateriSoal,
                        "materiSoal": $scope.formData.materiSoal,
                        "bobotSoal": $scope.formData.bobotSoal,
                        "soal": $scope.formData.soal,
                        // "jawabanA": $scope.formData.jawabanA,
                        // "jawabanB": $scope.formData.jawabanB,
                        // "jawabanC": $scope.formData.jawabanC,
                        // "jawabanD": $scope.formData.jawabanD,
                        // "jawabanE": $scope.formData.jawabanE,
                        // "kunciJawaban": $scope.formData.kunciJawaban,
                        "pembahasanSoal": $scope.formData.pembahasanSoal,
                        "videoPembahasan": $scope.formData.videoPembahasan,
                        "publish": $scope.formData.publish,

                        "tanggalBuat": tanggal,
                        "tanggalDisplay": tanggalDisplay,
                        "jamDisplay": jamDisplay,

                        "filterSoalOlimpiade": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang,
                        "filterSoalUjian": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas,
                        "filterDisplaySoal": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.publish,
                        "filterPelajaranDisplay": $scope.formData.idPelajaran + "_" + $scope.formData.publish,
                        "uid": $scope.uidGuru,
                        "idGuru": $scope.idGuru,
                        "idSekolah": $scope.idSekolahGuru,
                        "filterPelajaranIdSekolah": $scope.formData.idPelajaran + "_" + $scope.idSekolahGuru,
                        "filterSoalUjianIdSekolah": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.idSekolahGuru,
                        "filterPelajaranUid": $scope.formData.idPelajaran + "_" + $scope.uidGuru,
                        "filterSoalUjianUid": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.uidGuru,

                        "idPembuat": $scope.idGuru,
                    }).then(function (resp) {
                        $state.go("menuGuru.bankSoalGuru");
                    });
                }
                else {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: "Beberapa data harus diisi",
                        okType: "button-positive"
                    });
                }
            }

        };

    }])

    .controller('bankSoalEditGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        $scope.data = {
            "idSoal": $stateParams.idSoal
        };

        var ref = firebase.database(appBankSoal).ref("soal/" + $scope.data.idSoal);
        var refObj = $firebaseObject(ref);
        $ionicLoading.show();
        refObj.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.formData = response;
            if ($scope.formData.jenisSoal === "Pilihan Ganda") {
                $scope.PG = true;
            }
            else {
                $scope.PG = false;
            }

            var materiSoal = firebase.database(appBankSoal).ref('materiSoal').orderByChild('filter').equalTo($scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.idPelajaran);
            $scope.datas = $firebaseArray(materiSoal);
        })

        $scope.kelas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

        $scope.getJenjang = function () {
            if ($scope.formData.jenjang === 'SD') {
                $scope.kelas = ['1', '2', '3', '4', '5', '6']
            }
            else if ($scope.formData.jenjang === 'SMP') {
                $scope.kelas = ['7', '8', '9']
            }
            else if ($scope.formData.jenjang === 'SMA' || $scope.formData.jenjang === 'SMK') {
                $scope.kelas = ['10', '11', '12']
            }
            var cekMateriSoal = firebase.database(appBankSoal).ref("materiSoal").orderByChild("filter").equalTo($scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.idPelajaran);
            var listCekMateriSoal = $firebaseArray(cekMateriSoal);
            $ionicLoading.show();
            listCekMateriSoal.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            })
        }

        $scope.getKelas = function () {
            var cekMateriSoal = firebase.database(appBankSoal).ref("materiSoal").orderByChild("filter").equalTo($scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.idPelajaran);
            var listCekMateriSoal = $firebaseArray(cekMateriSoal);
            $ionicLoading.show();
            listCekMateriSoal.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            })
        }

        var refPelajaran = firebase.database().ref("mataPelajaran");
        $scope.mataPelajaran = $firebaseArray(refPelajaran);

        $scope.getPelajaran = function () {
            var refPelajaran = firebase.database().ref("mataPelajaran/" + $scope.formData.idPelajaran);
            refPelajaran.on("value", function (snapshot) {
                $scope.pelajaran = snapshot.val().pelajaran;
            })

            var cekMateriSoal = firebase.database(appBankSoal).ref("materiSoal").orderByChild("filter").equalTo($scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.idPelajaran);
            var listCekMateriSoal = $firebaseArray(cekMateriSoal);
            $ionicLoading.show();
            listCekMateriSoal.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.datas = response;
            })
        };

        $scope.buatMateriBaru = function () {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.simpanDataMateri = function () {
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                    if ($scope.formData.namaMateriSoal !== "") {
                        //cek
                        var refCek = firebase.database(appBankSoal).ref("materiSoal").orderByChild("filterMateri").equalTo($scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.idPelajaran + "_" + $scope.formData.namaMateriSoal);
                        var listRefCek = $firebaseArray(refCek);
                        listRefCek.$loaded().then(function (response) {
                            if (response.length === 0) {
                                $ionicLoading.show();
                                var insertData = firebase.database(appBankSoal).ref("materiSoal");
                                insertData.push(JSON.parse(JSON.stringify({
                                    "jenjang": $scope.formData.jenjang,
                                    "kelas": $scope.formData.kelas,
                                    "idPelajaran": $scope.formData.idPelajaran,
                                    "pelajaran": $scope.pelajaran,
                                    "materiSoal": $scope.formData.namaMateriSoal,
                                    "createAt": createAt,
                                    "diBuatOleh": $scope.namaGuru,
                                    "idPembuat": $scope.idGuru,
                                    "filter": $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.idPelajaran,
                                    "filterMateri": $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.idPelajaran + "_" + $scope.formData.namaMateriSoal
                                }))).then(function (resp) {
                                    $ionicLoading.hide();
                                    $scope.modal.hide();

                                    var cekMateriSoal = firebase.database(appBankSoal).ref("materiSoal").orderByChild("filter").equalTo($scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.idPelajaran);
                                    var listCekMateriSoal = $firebaseArray(cekMateriSoal);
                                    $ionicLoading.show();
                                    listCekMateriSoal.$loaded().then(function (response) {
                                        $ionicLoading.hide();
                                        $scope.datas = response;
                                    })
                                })
                            }
                            else if (response.length === 1) {
                                $ionicLoading.hide();

                                $ionicPopup.alert({
                                    title: 'Perhatian',
                                    template: 'Maaf, Materi Soal Yang Anda Isikan Sudah Tersedia, Mohon Cek Kembali, Terimakasih',

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
        }

        $scope.getMateri = function () {
            id = $scope.formData.idMateriSoal;
            var getDataMateri = firebase.database(appBankSoal).ref("materiSoal/" + id);
            getDataMateri.on("value", function (snapshot) {
                $scope.formData.materiSoal = snapshot.val().materiSoal;
            })
        }

        $scope.simpan = function () {
            console.log($scope.formData)
            // var tanggal = $filter('date')($scope.formData.createAt, 'yyyy-MM-dd HH:mm:ss Z');
            // var tanggalDisplay = $filter('date')($scope.formData.createAt, 'dd-MM-yyyy');
            // var jamDisplay = $filter('date')($scope.formData.createAt, 'HH:mm:ss');

            if ($scope.formData.jenisSoal === "Pilihan Ganda") {
                if ($scope.formData.jenjang !== '' && $scope.formData.idMateriSoal !== '' && $scope.formData.kelas !== '' && $scope.formData.idPelajaran !== '' && $scope.formData.jenisSoal !== '' && $scope.formData.soal !== '' && $scope.formData.jawabanA !== '' && $scope.formData.jawabanB !== '' && $scope.formData.jawabanC !== '' && $scope.formData.jawabanD !== '' && $scope.formData.kunciJawaban !== '') {
                    var add = firebase.database(appBankSoal).ref("soal/" + $scope.data.idSoal);

                    add.update(JSON.parse(JSON.stringify({
                        "jenjang": $scope.formData.jenjang,
                        "kelas": $scope.formData.kelas,
                        "idPelajaran": $scope.formData.idPelajaran,
                        "pelajaran": $scope.pelajaran,
                        "kategori": $scope.formData.kategori,
                        "kompetensiInti": $scope.formData.kompetensiInti,
                        "kompetensiDasar": $scope.formData.kompetensiDasar,
                        "jenisSoal": $scope.formData.jenisSoal,
                        "idMateriSoal": $scope.formData.idMateriSoal,
                        "materiSoal": $scope.formData.materiSoal,
                        "bobotSoal": $scope.formData.bobotSoal,
                        "soal": $scope.formData.soal,
                        "jawabanA": $scope.formData.jawabanA,
                        "jawabanB": $scope.formData.jawabanB,
                        "jawabanC": $scope.formData.jawabanC,
                        "jawabanD": $scope.formData.jawabanD,
                        "jawabanE": $scope.formData.jawabanE,
                        "kunciJawaban": $scope.formData.kunciJawaban,
                        "pembahasanSoal": $scope.formData.pembahasanSoal,
                        "videoPembahasan": $scope.formData.videoPembahasan,
                        "publish": $scope.formData.publish,

                        // "tanggalBuat": tanggal,
                        // "tanggalDisplay": tanggalDisplay,
                        // "jamDisplay": jamDisplay,

                        "filterSoalOlimpiade": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang,
                        "filterSoalUjian": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas,
                        "filterDisplaySoal": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.publish,
                        "filterPelajaranDisplay": $scope.formData.idPelajaran + "_" + $scope.formData.publish,
                        "uid": $scope.uidGuru,
                        "idGuru": $scope.idGuru,
                        "idSekolah": $scope.idSekolahGuru,
                        "filterPelajaranIdSekolah": $scope.formData.idPelajaran + "_" + $scope.idSekolahGuru,
                        "filterSoalUjianIdSekolah": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.idSekolahGuru,
                        "filterPelajaranUid": $scope.formData.idPelajaran + "_" + $scope.uidGuru,
                        "filterSoalUjianUid": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.uidGuru
                    }))).then(function (resp) {
                        // $state.go("menu.bankSoal");
                        $ionicPopup.alert({
                            title: 'SUKSES',
                            template: "Data Soal Berhasil Diperbaharui",
                            okType: "button-positive"
                        });
                    });
                }
                else {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: "Beberapa data harus diisi",
                        okType: "button-positive"
                    });
                }
            }
            else if (($scope.formData.jenisSoal === "Essay")) {
                if ($scope.formData.jenjang !== '' && $scope.formData.idMateriSoal !== '' && $scope.formData.kelas !== '' && $scope.formData.idPelajaran !== '' && $scope.formData.jenisSoal !== '' && $scope.formData.soal !== '') {
                    var add = firebase.database(appBankSoal).ref("soal/" + $scope.data.idSoal);

                    add.update(JSON.parse(JSON.stringify({
                        "jenjang": $scope.formData.jenjang,
                        "kelas": $scope.formData.kelas,
                        "idPelajaran": $scope.formData.idPelajaran,
                        "pelajaran": $scope.pelajaran,
                        "kategori": $scope.formData.kategori,
                        "kompetensiInti": $scope.formData.kompetensiInti,
                        "kompetensiDasar": $scope.formData.kompetensiDasar,
                        "jenisSoal": $scope.formData.jenisSoal,
                        "idMateriSoal": $scope.formData.idMateriSoal,
                        "materiSoal": $scope.formData.materiSoal,
                        "bobotSoal": $scope.formData.bobotSoal,
                        "soal": $scope.formData.soal,
                        // "jawabanA": $scope.formData.jawabanA,
                        // "jawabanB": $scope.formData.jawabanB,
                        // "jawabanC": $scope.formData.jawabanC,
                        // "jawabanD": $scope.formData.jawabanD,
                        // "jawabanE": $scope.formData.jawabanE,
                        // "kunciJawaban": $scope.formData.kunciJawaban,
                        "pembahasanSoal": $scope.formData.pembahasanSoal,
                        "videoPembahasan": $scope.formData.videoPembahasan,
                        "publish": $scope.formData.publish,

                        // "tanggalBuat": tanggal,
                        // "tanggalDisplay": tanggalDisplay,
                        // "jamDisplay": jamDisplay,

                        "filterSoalOlimpiade": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang,
                        "filterSoalUjian": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas,
                        "filterDisplaySoal": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.publish,
                        "filterPelajaranDisplay": $scope.formData.idPelajaran + "_" + $scope.formData.publish,
                        "uid": $scope.uidGuru,
                        "idGuru": $scope.idGuru,
                        "idSekolah": $scope.idSekolahGuru,
                        "filterPelajaranIdSekolah": $scope.formData.idPelajaran + "_" + $scope.idSekolahGuru,
                        "filterSoalUjianIdSekolah": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.idSekolahGuru,
                        "filterPelajaranUid": $scope.formData.idPelajaran + "_" + $scope.uidGuru,
                        "filterSoalUjianUid": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.uidGuru
                    }))).then(function (resp) {
                        // $state.go("menu.bankSoal");
                        $ionicPopup.alert({
                            title: 'SUKSES',
                            template: "Data Soal Berhasil Diperbaharui",
                            okType: "button-positive"
                        });
                    });
                }
                else {
                    $ionicPopup.alert({
                        title: 'Perhatian',
                        template: "Beberapa data harus diisi",
                        okType: "button-positive"
                    });
                }
            }

        };

    }])

    .controller('bankSoalPerJenjangGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "pelajaran": $stateParams.pelajaran,
            "idPelajaran": $stateParams.idPelajaran
        }


        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database(appBankSoal).ref("soal").orderByChild("filterPelajaranUid").equalTo($scope.data.idPelajaran + "_" + $scope.uidGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSoalGuru = response
            $scope.dataSoal = $scope.dataSoalGuru.groupBy('kelas');
        });

        $scope.getData = function (x, y) {
            $state.go('menuGuru.bankSoalLihatGuru', {
                "pelajaran": $scope.data.pelajaran,
                "idPelajaran": $scope.data.idPelajaran,
                "kelas": x,
                "jenjang": y[0].jenjang
            });
        }

    }])

    .controller('bankSoalLihatGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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
            "pelajaran": $stateParams.pelajaran,
            "idPelajaran": $stateParams.idPelajaran,
            "kelas": $stateParams.kelas,
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

        var ref = firebase.database(appBankSoal).ref("soal").orderByChild("filterSoalUjianUid").equalTo($scope.data.idPelajaran + "_" + $scope.data.jenjang + "_" + $scope.data.kelas + "_" + $scope.uidGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.soal = response
        });

        $scope.getData = function (data) {
            $ionicActionSheet.show({
                titleText: 'Pelajaran : ' + data.pelajaran + ", " + data.jenjang + ", " + data.kelas,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Soal' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Lihat Soal' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Soal',
                cancelText: 'Cancel',
                cancel: function () {
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('menuGuru.bankSoalEditGuru', {
                            "idSoal": data.$id
                        });
                    }

                    if (index === 1) {
                        $ionicModal.fromTemplateUrl('templates/modal.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            var ref = firebase.database(appBankSoal).ref("soal/" + data.$id);
                            var refObject = $firebaseObject(ref);
                            refObject.$loaded().then(function (response) {
                                $scope.formData = response;
                                $scope.videoID = response.videoPembahasan;

                            })


                        });
                    }

                    return true;
                },

                destructiveButtonClicked: function () {
                    var refObj = firebase.database(appBankSoal).ref("soal/" + data.$id);
                    var objDelete = $firebaseObject(refObj)
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Soal Ini?',
                        okType: "button-positive",
                    });
                    confirmPopup.then(function (res) {
                        if (res) {
                            objDelete.$remove().then(function (ref) {
                            });
                        }
                        else {
                        }
                    });
                    return true;
                }

            });

        };

    }])

