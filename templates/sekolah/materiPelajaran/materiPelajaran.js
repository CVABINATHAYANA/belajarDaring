angular.module('app.materiPelajaranSekolah', ['ngYoutubeEmbed'])

    .controller('materiPelajaranSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');

        if (!$scope.idPenggunaSekolah) {
            $state.go('welcome');
        }

        $scope.tambah = function () {
            $state.go("menuSekolah.materiPelajaranTambahSekolah");
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        var ref = firebase.database(appMateriPelajaran).ref("materiPelajaran").orderByChild("idSekolah").equalTo($scope.idSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSoalSekolah = response
            $scope.dataSoal = $scope.dataSoalSekolah.groupBy('pelajaran');
            // console.log($scope.dataSoal)
        });

        $scope.getData = function (x, y) {
            $state.go('menuSekolah.materiPelajaranPerJenjangSekolah', {
                "pelajaran": x,
                "idPelajaran": y[0].idPelajaran
            });
        }

    }])

    .controller('materiPelajaranTambahSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');

        if (!$scope.idPenggunaSekolah) {
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
            "kelas": '',
            "idPelajaran": '',
            "kompetensiInti": '',
            "kompetensiDasar": '',
            "judulMateriPelajaran": '',
            "isiMateriPelajaran": '',
            "videoPembelajaran": '',
            "publish": false,
            "createAt": new Date(),
        };

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
        }

        $scope.getPelajaran = function () {
            var refPelajaran = firebase.database().ref("mataPelajaran/" + $scope.formData.idPelajaran);
            refPelajaran.on("value", function (snapshot) {
                $scope.pelajaran = snapshot.val().pelajaran;
                //console.log($scope.pelajaran);
            })
        };

        $scope.simpan = function () {
            //console.log($scope.formData);
            var tanggal = $filter('date')($scope.formData.createAt, 'yyyy-MM-dd HH:mm:ss Z');
            var tanggalDisplay = $filter('date')($scope.formData.createAt, 'dd-MM-yyyy');
            var jamDisplay = $filter('date')($scope.formData.createAt, 'HH:mm:ss');


            if ($scope.formData.jenjang !== '' && $scope.formData.kelas !== '' && $scope.formData.idPelajaran !== '') {
                var add = firebase.database(appMateriPelajaran).ref("materiPelajaran");
                add.push({
                    "jenjang": $scope.formData.jenjang,
                    "kelas": $scope.formData.kelas,
                    "idPelajaran": $scope.formData.idPelajaran,
                    "pelajaran": $scope.pelajaran,
                    "kompetensiInti": $scope.formData.kompetensiInti,
                    "kompetensiDasar": $scope.formData.kompetensiDasar,

                    // "isiMateriPelajaran": $scope.formData.isiMateriPelajaran,
                    // "videoPembelajaran": $scope.formData.videoPembelajaran,
                    "publish": $scope.formData.publish,

                    "tanggalBuat": tanggal,
                    "tanggalDisplay": tanggalDisplay,
                    "jamDisplay": jamDisplay,
                    "judulMateriPelajaran": $scope.formData.judulMateriPelajaran,

                    "filter": $scope.formData.idPelajaran + "_" + $scope.formData.kelas,
                    "filterDisplay": $scope.formData.idPelajaran + "_" + $scope.formData.kelas + "_" + $scope.formData.publish,
                    "filterDisplayMateriPelajaran": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.publish,
                    "filterPelajaranDisplay": $scope.formData.idPelajaran + "_" + $scope.formData.publish,
                    "idSekolah": $scope.idSekolah,

                    "filterPelajaranIdSekolah": $scope.formData.idPelajaran + "_" + $scope.idSekolah,
                    "filterSoalUjianIdSekolah": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.idSekolah,

                    "idPembuat": $scope.idPenggunaSekolah,
                }).then(function (resp) {
                    console.log("success");
                    $state.go("menuSekolah.materiPelajaranSekolah");
                    $ionicPopup.alert({
                        title: 'SUKSES',
                        template: "Soal Berhasil Ditambahkan",
                        okType: "button-balanced"
                    });
                });
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: "Beberapa data harus diisi",
                    okType: "button-balanced"
                });
            }


        };

    }])

    .controller('materiPelajaranPerJenjangSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');

        if (!$scope.idPenggunaSekolah) {
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

        var ref = firebase.database(appMateriPelajaran).ref("materiPelajaran").orderByChild("filterPelajaranIdSekolah").equalTo($scope.data.idPelajaran + "_" + $scope.idSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataSoalSekolah = response
            $scope.dataSoal = $scope.dataSoalSekolah.groupBy('kelas');
            // console.log($scope.dataSoal)
        });

        $scope.getData = function (x, y) {
            $state.go('menuSekolah.materiPelajaranLihatSekolah', {
                "pelajaran": $scope.data.pelajaran,
                "idPelajaran": $scope.data.idPelajaran,
                "kelas": x,
                "jenjang": y[0].jenjang
            });
        }

    }])

    .controller('materiPelajaranLihatSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');

        if (!$scope.idPenggunaSekolah) {
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

        var ref = firebase.database(appMateriPelajaran).ref("materiPelajaran").orderByChild("filterSoalUjianIdSekolah").equalTo($scope.data.idPelajaran + "_" + $scope.data.jenjang + "_" + $scope.data.kelas + "_" + $scope.idSekolah);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.materiPelajaran = response
        });

        $scope.getData = function (data) {

            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Pelajaran : ' + data.pelajaran + ", " + data.jenjang + ", " + data.kelas,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Sub BAB' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Data' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {

                    if (index === 0) {
                        $state.go('menuSekolah.materiPelajaranSubBABSekolah', {
                            "idMateriPelajaran": data.$id,
                            "BAB": data.judulMateriPelajaran
                        });
                    }

                    if (index === 1) {
                        $state.go('menuSekolah.materiPelajaranEditSekolah', {
                            "idMateriPelajaran": data.$id
                        });
                    }

                    // if (index === 2) {
                    //     $ionicModal.fromTemplateUrl('templates/modal.html', {
                    //         scope: $scope,
                    //         animation: 'slide-in-up'
                    //     }).then(function (modal) {
                    //         $scope.modal = modal;
                    //         $scope.modal.show();

                    //         var ref = firebase.database().ref("materiPelajaran/" + data.$id);
                    //         var refObject = $firebaseObject(ref);
                    //         refObject.$loaded().then(function (response) {
                    //             $scope.formData = response;
                    //             $scope.videoID = response.videoPembelajaran;

                    //         })
                    //     });
                    // }

                    return true;
                },

                destructiveButtonClicked: function () {
                    if(data.idPembuat===$scope.idPenggunaSekolah){
                        var refObj = firebase.database(appMateriPelajaran).ref("materiPelajaran/" + data.$id);
                        var objDelete = $firebaseObject(refObj)
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Hapus Data',
                            template: 'Apakah Kamu Yakin Ingin Menghapus Data Soal Ini?',
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
                    else{
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Anda tidak diperkenankan untuk menghapus data ini, Terima Kasih',
                            okType: 'button-balanced'
                        });
                    }
                    
                    
                    return true;
                }

            });

        };

    }])

    .controller('materiPelajaranEditSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');

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

        $scope.data = {
            "idMateriPelajaran": $stateParams.idMateriPelajaran
        };

        var ref = firebase.database(appMateriPelajaran).ref("materiPelajaran/" + $scope.data.idMateriPelajaran);
        var refObj = $firebaseObject(ref);
        $ionicLoading.show();
        refObj.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.formData = response;
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
        }

        var refPelajaran = firebase.database().ref("mataPelajaran");
        $scope.mataPelajaran = $firebaseArray(refPelajaran);

        $scope.getPelajaran = function () {
            var refPelajaran = firebase.database().ref("mataPelajaran/" + $scope.formData.idPelajaran);
            refPelajaran.on("value", function (snapshot) {
                $scope.pelajaran = snapshot.val().pelajaran;
                //console.log($scope.pelajaran);
            })
        };

        $scope.simpan = function () {
            // console.log($scope.formData);
            // var tanggal = $filter('date')($scope.formData.createAt, 'yyyy-MM-dd HH:mm:ss Z');
            // var tanggalDisplay = $filter('date')($scope.formData.createAt, 'dd-MM-yyyy');
            // var jamDisplay = $filter('date')($scope.formData.createAt, 'HH:mm:ss');


            if ($scope.formData.jenjang !== '' && $scope.formData.kelas !== '' && $scope.formData.idPelajaran !== '' && $scope.formData.isiMateriPelajaran !== '') {
                var add = firebase.database(appMateriPelajaran).ref("materiPelajaran/" + $scope.data.idMateriPelajaran);

                add.update(JSON.parse(JSON.stringify({
                    "jenjang": $scope.formData.jenjang,
                    "kelas": $scope.formData.kelas,
                    "idPelajaran": $scope.formData.idPelajaran,
                    "pelajaran": $scope.pelajaran,
                    "kompetensiInti": $scope.formData.kompetensiInti,
                    "kompetensiDasar": $scope.formData.kompetensiDasar,
                    "isiMateriPelajaran": $scope.formData.isiMateriPelajaran,
                    "videoPembelajaran": $scope.formData.videoPembelajaran,
                    "publish": $scope.formData.publish,
                    "judulMateriPelajaran": $scope.formData.judulMateriPelajaran,

                    // "tanggalBuat": tanggal,
                    // "tanggalDisplay": tanggalDisplay,
                    // "jamDisplay": jamDisplay,

                    "filter": $scope.formData.idPelajaran + "_" + $scope.formData.kelas,
                    "filterDisplay": $scope.formData.idPelajaran + "_" + $scope.formData.kelas + "_" + $scope.formData.publish,
                    "filterDisplayMateriPelajaran": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.formData.publish,
                    "filterPelajaranDisplay": $scope.formData.idPelajaran + "_" + $scope.formData.publish,
                    "idSekolah": $scope.idSekolah,
                    "filterPelajaranIdSekolah": $scope.formData.idPelajaran + "_" + $scope.idSekolah,
                    "filterSoalUjianIdSekolah": $scope.formData.idPelajaran + "_" + $scope.formData.jenjang + "_" + $scope.formData.kelas + "_" + $scope.idSekolah
                }))).then(function (resp) {
                    //console.log("success");
                    // $state.go("menu.materiPelajaran");
                    $ionicPopup.alert({
                        title: 'SUKSES',
                        template: "Data Materi Pelajaran Berhasil Diperbaharui",
                        okType: "button-balanced"
                    });
                });
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: "Beberapa data harus diisi",
                    okType: "button-balanced"
                });
            }

        };

    }])

    .controller('materiPelajaranSubBABSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');

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

        $scope.data = {
            "idMateriPelajaran": $stateParams.idMateriPelajaran,
            "BAB": $stateParams.BAB
        };

        var ref = firebase.database(appMateriPelajaran).ref("subBabMateriPelajaran").orderByChild("idMateriPelajaran").equalTo($scope.data.idMateriPelajaran);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.datas = response;
        })

        $scope.tambahSubBAB = function () {

            $state.go('menuSekolah.materiPelajaranSubBABTambahSekolah', {
                "idMateriPelajaran": $scope.data.idMateriPelajaran,
                "BAB": $scope.data.BAB
            });
        };

        $scope.getData = function (item) {
            $ionicActionSheet.show({
                titleText: 'Sub Bab : ' + item.namaSubBAB,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Data' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Lihat Data' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {

                    if (index === 0) {

                        $state.go('menuSekolah.materiPelajaranSubBABEditSekolah', {
                            "idMateriPelajaran": $scope.data.idMateriPelajaran,
                            "BAB": $scope.data.BAB,
                            "idSubBAB": item.$id,
                            "namaSubBAB": item.namaSubBAB
                        });
                    }

                    if (index === 1) {
                        var obj = firebase.database(appMateriPelajaran).ref("subBabMateriPelajaran/" + item.$id);
                        var listObj = $firebaseObject(obj);
                        $ionicLoading.show();
                        listObj.$loaded().then(function (response) {
                            $ionicLoading.hide();
                            $scope.formData = response;
                        })

                        $ionicModal.fromTemplateUrl('templates/modalLihat.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                        });
                    }

                    return true;
                },

                destructiveButtonClicked: function () {
                    var refObj = firebase.database(appMateriPelajaran).ref("subBabMateriPelajaran/" + item.$id);
                    var objDelete = $firebaseObject(refObj)
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

                    return true;
                }

            });
        }

    }])

    .controller('materiPelajaranSubBABTambahSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');

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

        $scope.data = {
            "idMateriPelajaran": $stateParams.idMateriPelajaran,
            "BAB": $stateParams.BAB
        };

        $scope.formData = {
            "namaSubBAB": "",
            "isiMateriPembelajaran": "",
            "videoPembelajaran": '',
            "publish": false
        }

        $scope.simpan = function () {

            var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

            if ($scope.formData.namaSubBAB !== "" && $scope.formData.isiMateriPembelajaran !== "") {
                $ionicLoading.show();
                var ref = firebase.database(appMateriPelajaran).ref("subBabMateriPelajaran");
                ref.push({
                    "idMateriPelajaran": $stateParams.idMateriPelajaran,
                    "BAB": $stateParams.BAB,
                    "namaSubBAB": $scope.formData.namaSubBAB,
                    "isiMateriPembelajaran": $scope.formData.isiMateriPembelajaran,
                    "videoPembelajaran": $scope.formData.videoPembelajaran,
                    "publish": $scope.formData.publish,
                    "createAt": createAt,
                }).then(function (resp) {
                    $ionicLoading.hide();
                    $state.go('menuSekolah.materiPelajaranSubBABSekolah', {
                        "idMateriPelajaran": $stateParams.idMateriPelajaran,
                        "BAB": $stateParams.BAB
                    })
                })
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Nama Sub BAB dan Isi Materi Pembelajaran Harus Diisi, terima kasih',

                });
            }
        };
    }])

    .controller('materiPelajaranSubBABEditSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSekolah = localStorage.getItem('idPenggunaSekolah');
        $scope.idSekolah = localStorage.getItem('idSekolah');
        $scope.namaPenggunaSekolah = localStorage.getItem('namaPenggunaSekolah');
        $scope.jenjangSekolah = localStorage.getItem('jenjangSekolah');
        $scope.namaSekolah = localStorage.getItem('namaSekolah');
        $scope.uidSekolah = localStorage.getItem('uidSekolah');
        $scope.idProvinsiSekolah = localStorage.getItem('idProvinsiSekolah');
        $scope.idKotaKabupatenSekolah = localStorage.getItem('idKotaKabupatenSekolah');
        $scope.idKecamatanSekolah = localStorage.getItem('idKecamatanSekolah');

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

        $scope.data = {
            "idMateriPelajaran": $stateParams.idMateriPelajaran,
            "BAB": $stateParams.BAB,
            "idSubBAB": $stateParams.idSubBAB,
            "namaSubBAB": $stateParams.namaSubBAB
        };

        var obj = firebase.database(appMateriPelajaran).ref("subBabMateriPelajaran/" + $scope.data.idSubBAB);
        var listObj = $firebaseObject(obj);
        $ionicLoading.show();
        listObj.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.formData = response;
        })

        $scope.simpan = function () {

            var updateAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

            if ($scope.formData.namaSubBAB !== "" && $scope.formData.isiMateriPembelajaran !== "") {
                $ionicLoading.show();
                obj.update(JSON.parse(JSON.stringify({
                    "idMateriPelajaran": $stateParams.idMateriPelajaran,
                    "BAB": $stateParams.BAB,
                    "namaSubBAB": $scope.formData.namaSubBAB,
                    "isiMateriPembelajaran": $scope.formData.isiMateriPembelajaran,
                    "videoPembelajaran": $scope.formData.videoPembelajaran,
                    "publish": $scope.formData.publish,
                    "updateAt": updateAt,
                }))).then(function (resp) {
                    $ionicLoading.hide();
                    $state.go('menuSekolah.materiPelajaranSubBABSekolah', {
                        "idMateriPelajaran": $stateParams.idMateriPelajaran,
                        "BAB": $stateParams.BAB
                    })
                })
            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Nama Sub BAB dan Isi Materi Pembelajaran Harus Diisi, terima kasih',

                });
            }
        };


    }])

    