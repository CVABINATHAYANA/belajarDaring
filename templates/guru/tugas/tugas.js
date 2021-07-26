angular.module('app.tugasGuru', ['ui.tinymce'])

    .controller('tugasSiswaGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')
        

  
        if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahGuru === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }
        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "dataTugasSiswa": $stateParams.dataTugasSiswa
        }

        $scope.tambah = function () {
            $state.go("menuGuru.tugasSiswaTambahGuru");
        }

        $scope.dataTugasSiswa = $scope.data.dataTugasSiswa;
        var ref = firebase.database(app).ref("groupTugasSiswa").orderByChild("idGuru").equalTo($scope.idGuru);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataTugasSiswa = response
            console.log($scope.dataTugasSiswa)
        });

        $scope.getData = function (data) {
            // console.log(data)
            $ionicActionSheet.show({
                titleText: 'Data Tugas : ' + data.groupTugas,
                buttons: [
                    { text: '<i class="icon ion-edit"></i> Edit Tugas ' },
                    { text: '<i class="icon ion-social-buffer"></i> Lihat Tugas' },
                    { text: '<i class="icon ion-android-person-add"></i> Tambah Siswa' },
                    { text: '<i class="icon ion-chatbubble"></i> Diskusi Tugas' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Tugas',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        console.log('ID kelas :' +data.idKelas);
                        console.log('ID Mapel :' +data.idPelajaran);
                        var getAbs = firebase.database(app).ref("tugasSiswa/" +data.idKelas+ '/' +data.idPelajaran).orderByChild("groupTugas").equalTo(data.groupTugas);
                        var listGetAbs = $firebaseArray(getAbs);
                        $ionicLoading.show();
                        listGetAbs.$loaded().then(function (response) {
                            $ionicLoading.hide();

                            $state.go("menuGuru.tugasSiswaEditGuru", {
                                "groupTugas": data.groupTugas,
                                "idGroupTugasSiswa": data.$id,
                                "namaKecamatan": data.namaKecamatan,

                                
                                'tahunAjaran': response[0].tahunAjaran,
                                "semester": response[0].semester,
                                "pelajaran": response[0].pelajaran,
                                "namaGuru": response[0].namaGuru,
                                "namaKelas": response[0].namaKelas,
                                "namaSekolah": response[0].namaSekolah,
                                "judulTugas": response[0].judulTugas,
                                "isiTugas": response[0].isiTugas,
                                "tanggalPengumpulanTugas": response[0].tanggalPengumpulanTugas,

                                "getTugas": response,
                                "publish": response[0].publish,

                                "idKelas": data.idKelas,
                                "idMapel": data.idPelajaran,
                            })
                        });
                    }
                    if (index === 1) {
                        var getAbs = firebase.database(app).ref("tugasSiswa/" +data.idKelas+ '/' +data.idPelajaran).orderByChild("groupTugas").equalTo(data.groupTugas);
                        var listGetAbs = $firebaseArray(getAbs);
                        $ionicLoading.show();
                        listGetAbs.$loaded().then(function (response) {
                            $ionicLoading.hide();

                            $state.go("menuGuru.tugasSiswaLihatGuru", {
                                "groupTugas": data.groupTugas,
                                "idGroupTugasSiswa": data.$id,
                                "namaKecamatan": data.namaKecamatan,

                                'tahunAjaran': response[0].tahunAjaran,
                                "semester": response[0].semester,
                                "pelajaran": response[0].pelajaran,
                                "namaGuru": response[0].namaGuru,
                                "namaKelas": response[0].namaKelas,
                                "namaSekolah": response[0].namaSekolah,



                                "isiTugas": response[0].isiTugas,
                                "judulTugas": response[0].judulTugas,
                                "tanggalPengumpulanTugas": response[0].tanggalPengumpulanTugas,

                                "getTugas": response,
                                "publish": response[0].publish,


                                "idKelas": data.idKelas,
                                "idMapel": data.idPelajaran
                                
                            })
                        });
                        // window.alert(data.judulTugas + data.namaGuru)
                    }
                    if (index === 2) {
                        $state.go("menuGuru.tugasTambahSiswaGuru", {
                            "groupTugas": data.groupTugas,
                            "idGroupTugasSiswa": data.$id,
                            "idGuru": data.idGuru,
                            "idKelas": data.idKelas,
                            "namaKecamatan": data.namaKecamatan,
                            "idMapel": data.idPelajaran
                        })
                    }
                    if (index === 3) {
                        var getAbs = firebase.database(app).ref("tugasSiswa/" +data.idKelas+ '/' +data.idPelajaran).orderByChild("groupTugas").equalTo(data.groupTugas);
                        var listGetAbs = $firebaseArray(getAbs);
                        $ionicLoading.show();
                        listGetAbs.$loaded().then(function (response) {
                            $ionicLoading.hide();

                            $state.go("menuGuru.tugasSiswaDiskusiGuru", {
                                "groupTugas": data.groupTugas,
                                "idGroupTugasSiswa": data.$id,
                                "namaKecamatan": data.namaKecamatan,

                                'tahunAjaran': response[0].tahunAjaran,
                                "semester": response[0].semester,
                                "pelajaran": response[0].pelajaran,
                                "namaGuru": response[0].namaGuru,
                                "namaKelas": response[0].namaKelas,
                                "namaSekolah": response[0].namaSekolah,



                                "isiTugas": response[0].isiTugas,
                                "judulTugas": response[0].judulTugas,
                                "tanggalPengumpulanTugas": response[0].tanggalPengumpulanTugas,

                                "getTugas": response,
                                "publish": response[0].publish
                                
                            })
                        });
                        // window.alert(data.judulTugas + data.namaGuru)
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
                            var refObj = firebase.database(app).ref("tugasSiswa/" +data.idKelas+ '/' +data.idPelajaran).orderByChild("groupTugas").equalTo(data.groupTugas);
                            var objDelete = $firebaseArray(refObj);
                            objDelete.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {
                                    var hapusData = firebase.database(app).ref("tugasSiswa/" +data.idKelas+ '/' +data.idPelajaran +'/' + response[i].$id);
                                    var objDelete = $firebaseObject(hapusData);
                                    objDelete.$remove().then(function (ref) {
                                        $ionicLoading.hide();
                                        console.log('Data Berhasil Dihapus');
                                    });
                                }
                            })

                            var objGroup = firebase.database(app).ref("groupTugasSiswa").orderByChild("groupTugas").equalTo(data.groupTugas);
                            var listObjGroup = $firebaseArray(objGroup);
                            listObjGroup.$loaded().then(function (hapus) {
                                var id = hapus[0].$id;

                                var objHapus = firebase.database(app).ref("groupTugasSiswa/" + id);
                                var objHapusData = $firebaseObject(objHapus);
                                objHapusData.$remove().then(function (yes) {
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

    .controller('tugasSiswaTambahGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

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

    
      
        if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahGuru === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }
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
            "tanggal": new Date(),
            "idTahunAjaran": '',
            "idSemester": '',
            "idKelas": '',
            "idPelajaran": '',
            "judulTugas" : '',
            "isiTugas": '',
            "tanggalPengumpulanTugas": new Date(),
            "publish": false,
        }

        var refTahunAjaran = firebase.database().ref("tahunAjaran").orderByChild("aktif").equalTo(true);
        $scope.tahunAjaran = $firebaseArray(refTahunAjaran);

        $scope.getTahunAjaran = function () {
            var getDataTahunAjaran = firebase.database().ref("tahunAjaran/" + $scope.formData.idTahunAjaran);
            getDataTahunAjaran.on("value", function (snapshot) {
                $scope.dataTahunAjaran = snapshot.val().tahunAjaran
                console.log($scope.dataTahunAjaran)
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
                // console.log($scope.dataKelas);
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

        $scope.getPelajaran = function () {
            var refPelajaran = firebase.database().ref("mataPelajaran/" + $scope.formData.idPelajaran);
            refPelajaran.on("value", function (snapshot) {
                $scope.pelajaran = snapshot.val().pelajaran
                console.log("niPelajarannya", $scope.pelajaran);

                $scope.dataTugas = [];
                var refSiswa = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.formData.idKelas);
                listRefSiswa = $firebaseArray(refSiswa);
                $ionicLoading.show();
                listRefSiswa.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.dataSiswa = response;

                    var tanggalAbsensi = $filter('date')($scope.formData.tanggal, 'yyyy-MM-dd');
                    var hariAbsensi = $filter('date')(new (Date), 'EEEE');
                    var jamAbsensi = $filter('date')(new (Date), 'HH:mm:ss');
                    for (i = 0; i < response.length; i++) {
                        $scope.dataTugas.push({
                            "idSiswa": response[i].$id,
                            "namaSiswa": response[i].namaPengguna,
                            "kirimTugas": true,

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

                            "isiTugas": $scope.formData.isiTugas,
                            "judulTugas":$scope.formData.judulTugas,

                            "tanggalTugas": tanggalAbsensi,
                            "hariTugas": hariAbsensi,
                            "jamTugas": jamAbsensi,
                            "tanggalPengumpulanTugas": $filter('date')($scope.formData.tanggalPengumpulanTugas, 'yyyy-MM-dd')
                        })
                    }
                    // console.log($scope.dataTugas)
                    if ($scope.dataTugas.length > 0) {
                        $scope.tampilButton = true;
                    }
                    else {
                        $scope.tampilButton = false;
                    }
                })
            });
        }

        $scope.getTugas = function (data, $index) {

            if (data.jenisRombel === 'Lintas Minat') {
                var idSiswaSekarang = data.idSiswa;
            }
            else {
                var idSiswaSekarang = data.$id;
            }

            var tanggalAbsensi = $filter('date')($scope.formData.tanggal, 'yyyy-MM-dd');
            var hariAbsensi = $filter('date')(new (Date), 'EEEE');
            var jamAbsensi = $filter('date')(new (Date), 'HH:mm:ss');
            var tanggalPengumpulanTugas = $filter('date')($scope.formData.tanggalPengumpulanTugas, 'yyyy-MM-dd');
            var kirimTugas = data.kirimTugas[$index];
            // console.log("valuenya", kirimTugas);
        };

        $scope.simpan = function () {
            var groupTugas = $filter('date')($scope.formData.tanggal, 'yyyyMMddHHmmss');
            var tanggalTugas = $filter('date')($scope.formData.tanggal, 'yyyy-MM-dd');
            var tanggalDisplay = $filter('date')($scope.formData.tanggal, 'dd-MM-YYYY');
            var hariTugas = $filter('date')(new (Date), 'EEEE');
            var jamTugas = $filter('date')(new (Date), 'HH:mm:ss');
            var tanggalPengumpulanTugas = $filter('date')($scope.formData.tanggalPengumpulanTugas, 'yyyy-MM-dd');

            if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.idGuru !== '' && $scope.formData.idTahunAjaran !== '' && $scope.formData.idSemester !== '' && $scope.formData.idKelas !== '' && $scope.formData.idPelajaran !== "" && $scope.formData.isiTugas !== '' && $scope.formData.tanggalPengumpulanTugas !== '' && $scope.formData.judulTugas !== '') {

                $ionicLoading.show();
                var insertGroupTugas = firebase.database(app).ref("groupTugasSiswa");
                insertGroupTugas.push({
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

                    "judulTugas": $scope.formData.judulTugas,

                    "tanggalTugas": tanggalTugas,
                    "tanggalDisplay": tanggalDisplay,
                    "hariTugas": hariTugas,
                    "jamTugas": jamTugas,
                    "tanggalPengumpulanTugas": tanggalPengumpulanTugas,
                    "groupTugas": groupTugas + $scope.idGuru,
                    "idPembuat": $scope.idGuru,
                    "publish": $scope.formData.publish,

                }).then(function (ok) {

                    var cekData = firebase.database(app).ref("groupTugasSiswa").orderByChild("groupTugas").equalTo(groupTugas + $scope.idGuru);
                    var listCekData = $firebaseArray(cekData);
                    listCekData.$loaded().then(function (response) {
                        $scope.idGroupTugasSiswa = response[0].$id;

                        var x = document.getElementById("myFile");
                        if ('files' in x) {
                            if (x.files.length == 0) {
                                $scope.txt = "Select one or more files.";
                            } else {
                                for (var i = 0; i < x.files.length; i++) {
                                    $scope.txt += "<br><strong>" + (i + 1) + ". file</strong><br>";
                                    var file = x.files[i];
                                    $scope.fileName = file.name;
                                    if ('name' in file) {
                                        $scope.txt += "name: " + file.name + "<br>";
                                    }
                                    if ('size' in file) {
                                        $scope.txt += "size: " + file.size + " bytes <br>";
                                    }
                                    var storageRef = firebase.storage().ref("tugasGuru/" + $scope.idGuru + "/" + groupTugas + $scope.idGuru + "/" + file.name);
                                    var storage = $firebaseStorage(storageRef);
                                    //Upload File
                                    var uploadTask = storage.$put(file);
                                    $ionicLoading.show();
                                    uploadTask.$complete(function (snapshot) {
                                        $scope.showImage = snapshot.downloadURL;
                                        // console.log(snapshot);
                                        // console.log(snapshot.downloadURL);
                                        var refAddFoto = firebase.database(app).ref("groupTugasSiswa/" + $scope.idGroupTugasSiswa + "/fileGuru");
                                        refAddFoto.push({
                                            "fotoURL": $scope.showImage,
                                            "namaFile": snapshot.metadata.name
                                        }).then(function (response) {
                                            $ionicLoading.hide();
                                            //console.log(response);
                                            return true;
                                        }).then(function (error) {
                                            //console.log(error);
                                        });

                                    })
                                }
                            }
                        }
                        else {
                            if (x.value == "") {
                                $scope.txt += "Pilih Satu Atau Banyak File.";
                            } else {
                                $scope.txt += "File property tidak support dengan browser yang Anda gunakan!";
                                $scope.txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
                            }
                        }
                    })

                    for (i = 0; i < $scope.dataTugas.length; i++) {
                        if ($scope.dataTugas[i].kirimTugas === true) {
                            var insertData = firebase.database(app).ref("tugasSiswa/" +$scope.dataTugas[i].idKelas+"/" +$scope.dataTugas[i].idPelajaran);
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
                                "isiTugas": $scope.formData.isiTugas,

                                "judulTugas":$scope.formData.judulTugas,
                                "kirimTugas": $scope.dataTugas[i].kirimTugas,

                                "tanggalTugas": $scope.dataTugas[i].tanggalTugas,
                                "hariTugas": $scope.dataTugas[i].hariTugas,
                                "jamTugas": $scope.dataTugas[i].jamTugas,
                                "tanggalPengumpulanTugas": $scope.dataTugas[i].tanggalPengumpulanTugas,
                                "groupTugas": groupTugas + $scope.dataTugas[i].idGuru,
                                "groupTugasIdSiswa": groupTugas + $scope.dataTugas[i].idGuru + $scope.dataTugas[i].idSiswa,
                                "dibaca": false,
                                "statusDibaca": $scope.dataTugas[i].idSiswa + "_" + false,
                                "idPembuat": $scope.idGuru,

                                "publish": $scope.formData.publish,
                                "filterPublish": $scope.dataTugas[i].idSiswa + "_" + $scope.formData.publish
                            }).then(function (resp) {
                                $ionicLoading.hide();

                                $state.go("menuGuru.tugasSiswaGuru");

                            })
                        }

                    }
                })

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

    .controller('tugasSiswaLihatGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

  
         
        if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahGuru === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idGroupTugasSiswa": $stateParams.idGroupTugasSiswa,
            "groupTugas": $stateParams.groupTugas,
            "namaKecamatan": $stateParams.namaKecamatan,

            'tahunAjaran': $stateParams.tahunAjaran,
            "semester": $stateParams.semester,
            "pelajaran": $stateParams.pelajaran,
            "namaGuru": $stateParams.namaGuru,
            "namaKelas": $stateParams.namaKelas,
            "namaSekolah": $stateParams.namaSekolah,

            "judulTugas":$stateParams.judulTugas,
            "isiTugas": $stateParams.isiTugas,

            "tanggalPengumpulanTugas": $stateParams.tanggalPengumpulanTugas,
            "getTugas": $stateParams.getTugas,

            "idKelas": $stateParams.idKelas,
            "idMapel": $stateParams.idMapel,
        }

        $scope.dataGetTugas = $scope.data.getTugas;

        console.log('ID MAPEL' , $scope.data.idMapel)
        var fileTugas = firebase.database(app).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa + "/fileGuru");
        var listFileTugas = $firebaseArray(fileTugas);
        listFileTugas.$loaded().then(function (response) {
            $scope.fileTugasGuru = response;
            $scope.banyakFile = response.length;
            console.log($scope.banyakFile);
        });

        $scope.hapusFile = function (fileGuru) {
            // console.log(fileSiswa);
            var fileTugas = firebase.database(app).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa + "/fileGuru/" + fileGuru.$id);
            var objDelete = $firebaseObject(fileTugas);
            objDelete.$remove().then(function (resp) {
                // console.log("deleted")
            })
            var storageRef = firebase.storage(app).ref("tugasGuru/" + $scope.idGuru + "/" + $scope.data.groupTugas + "/" + fileGuru.namaFile);
            $scope.storage = $firebaseStorage(storageRef);
            $scope.storage.$delete().then(function () {
                // console.log("successfully deleted!");
            });
        }

        $scope.lihatJawabanTugas = function (data) {

            $state.go("menuGuru.LihatJawabanTugasSiswa", {
                "idTugas": data.$id,
                "namaSiswa": data.namaSiswa,
                "namaKecamatan": data.namaKecamatan,

                'tahunAjaran': data.tahunAjaran,
                "semester": data.semester,
                "pelajaran": data.pelajaran,
                "namaGuru": data.namaGuru,
                "namaKelas": data.namaKelas,
                "namaSekolah": data.namaSekolah,

                "jawabanTugas": data.jawabanTugas,
                "nilaiTugasSiswa": data.nilaiTugasSiswa,

                "judulTugas":data.judulTugas,
                "isiTugas": data.isiTugas,

                "tanggalPengumpulanTugas": data.tanggalPengumpulanTugas,

                "fileSiswa": data.fileSiswa,

                "idKelas": data.idKelas,
                "idMapel": $scope.data.idMapel,
            })
        }



    }])

    .controller('LihatJawabanTugasSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

    
         
        if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahGuru === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idTugas": $stateParams.idTugas,
            "namaSiswa": $stateParams.namaSiswa,
            "namaKecamatan": $stateParams.namaKecamatan,

            'tahunAjaran': $stateParams.tahunAjaran,
            "semester": $stateParams.semester,
            "pelajaran": $stateParams.pelajaran,
            "namaGuru": $stateParams.namaGuru,
            "namaKelas": $stateParams.namaKelas,
            "namaSekolah": $stateParams.namaSekolah,

            "jawabanTugas": $stateParams.jawabanTugas,
            "nilaiTugasSiswa": $stateParams.nilaiTugasSiswa,

            "judulTugas":$stateParams.judulTugas,
            "isiTugas": $stateParams.isiTugas,
            "tanggalPengumpulanTugas": $stateParams.tanggalPengumpulanTugas,

            "fileSiswa": $stateParams.fileSiswa,

            "idKelas": $stateParams.idKelas,
            "idMapel": $stateParams.idMapel,
        }

        $scope.formData = $scope.data;

        $scope.fileTugasSiswa = $scope.data.fileSiswa;
        $scope.banyakFile = $scope.fileTugasSiswa.length;

        console.log("ID KELAS" + $scope.data.idKelas);
        var fileTugas = firebase.database(app).ref("tugasSiswa/" + $scope.data.idKelas +'/' +$scope.data.idMapel+ '/'+$scope.data.idTugas + "/fileSiswa");
        var listFileTugas = $firebaseArray(fileTugas);
        listFileTugas.$loaded().then(function (response) {
            $scope.fileTugasSiswa = response;
            $scope.banyakFile = response.length;
        })

        $scope.simpan = function () {
            if ($scope.formData.nilaiTugasSiswa !== undefined) {
                var refTugas = firebase.database(app).ref("tugasSiswa/"+ $scope.data.idKelas +'/' +$scope.data.idMapel+ '/'+ $scope.data.idTugas);
                refTugas.update(JSON.parse(JSON.stringify({
                    "nilaiTugasSiswa": $scope.formData.nilaiTugasSiswa
                }))).then(function (resp) {
                    $ionicPopup.alert({
                        title: 'SUKSES',
                        template: 'Nilai Tugas ' + $scope.data.namaSiswa + ' Berhasil Dikirim',
                        okType: 'button-positive'
                    });
                })
            }
        }
    }])

    .controller('tugasSiswaEditGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')


  
          
        if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahGuru === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "idGroupTugasSiswa": $stateParams.idGroupTugasSiswa,
            "groupTugas": $stateParams.groupTugas,
            "namaKecamatan": $stateParams.namaKecamatan,

            'tahunAjaran': $stateParams.tahunAjaran,
            "semester": $stateParams.semester,
            "pelajaran": $stateParams.pelajaran,
            "namaGuru": $stateParams.namaGuru,
            "namaKelas": $stateParams.namaKelas,
            "namaSekolah": $stateParams.namaSekolah,
            "judulTugas": $stateParams.judulTugas,

            "isiTugas": $stateParams.isiTugas,
            "tanggalPengumpulanTugas": $stateParams.tanggalPengumpulanTugas,
            "getTugas": $stateParams.getTugas,
            "idKelas": $stateParams.idKelas,
            "idMapel": $stateParams.idMapel,

            "publish": $stateParams.publish,
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

        $scope.dataSiswa = $scope.data.getTugas;
        $scope.formData = $scope.data;
        $scope.formData.tanggalPengumpulanTugas = new Date($scope.data.tanggalPengumpulanTugas);
        $scope.getTugas = function (data) {
            // console.log(data.kirimTugas)
            var refAbsensi = firebase.database(app).ref("tugasSiswa/ " + data.$id);
            refAbsensi.update({
                "kirimTugas": data.kirimTugas
            }).then(function (resp) {
                console.log("updated");
            })
        }

        $scope.simpan = function () {
            var tanggalPengumpulanTugas = $filter('date')($scope.formData.tanggalPengumpulanTugas, 'yyyy-MM-dd');
            if ($scope.formData.isiTugas !== "" && $scope.formData.tanggalPengumpulanTugas !== "") {


                console.log('ID' +$scope.formData.idKelas+"/" +$scope.formData.idMapel)
                var getAbs = firebase.database(app).ref("tugasSiswa/" +$scope.formData.idKelas+"/" +$scope.formData.idMapel).orderByChild("groupTugas").equalTo($scope.data.groupTugas);
                var listGetAbs = $firebaseArray(getAbs);
                listGetAbs.$loaded().then(function (response) {
                    for (i = 0; i < response.length; i++) {
                        var updateData = firebase.database(app).ref("tugasSiswa/" +$scope.formData.idKelas+"/" +$scope.formData.idMapel+"/"  + response[i].$id);
                        updateData.update({
                            "isiTugas": $scope.formData.isiTugas,
                            "judulTugas": $scope.formData.judulTugas,
                            "tanggalPengumpulanTugas": tanggalPengumpulanTugas,
                            "publish": $scope.formData.publish,
                            "filterPublish": response[i].idSiswa + "_" + $scope.formData.publish
                        }).then(function (resp) {
                            $state.go("menuGuru.tugasSiswaGuru")
                        })
                    }
                })

                var updateGroupTugas = firebase.database(app).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa).update(JSON.parse(JSON.stringify({
                    "judulTugas": $scope.formData.judulTugas,
                    "publish": $scope.formData.publish,
                })))

            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Seluruh Data Harus Diisi, Terima Kasih',
                    okType: 'button-positive'
                });
            }
        }

        // var getAbs = firebase.database(app).ref("tugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
        // var listGetAbs = $firebaseArray(getAbs);
        // $ionicLoading.show();
        // listGetAbs.$loaded().then(function (response) {
        //     $ionicLoading.hide();
        //     $scope.dataSiswa = response;
        //     $scope.formData = response[0];
        //     $scope.formData.tanggalPengumpulanTugas = new Date(response[0].tanggalPengumpulanTugas)
        // })




    }])

    .controller('tugasSiswaTambahSiswaGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')


         
        if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahGuru === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "groupTugas": $stateParams.groupTugas,
            "idGroupTugasSiswa": $stateParams.idGroupTugasSiswa,
            "idGuru": $stateParams.idGuru,
            "idKelas": $stateParams.idKelas,
            "namaKecamatan": $stateParams.namaKecamatan,
            "idMapel":$stateParams.idMapel
        }

        $scope.dataTugas = [];
        var list = firebase.database(appSiswa).ref("dataSiswa").orderByChild("idKelas").equalTo($scope.data.idKelas);
        var listData = $firebaseArray(list);
        $ionicLoading.show();
        listData.$loaded().then(function (response) {
            $ionicLoading.hide();
            for (i = 0; i < response.length; i++) {
                $scope.dataTugas.push({
                    "idSiswa": response[i].$id,
                    "namaSiswa": response[i].namaPengguna,
                })
            }
        });

        

        $scope.getTugas = function (data, $index) {
            var kirimTugas = data.kirimTugas;
            console.log(data);
            console.log(kirimTugas)
            console.log($scope.data.idKelas+'/'+$scope.data.idMapel)
            //Cek Tugas Siswa
            var periksa = firebase.database(app).ref("tugasSiswa/" +$scope.data.idKelas+'/'+$scope.data.idMapel).orderByChild("groupTugasIdSiswa").equalTo($scope.data.groupTugas + data.idSiswa);
            $ionicLoading.show()
            var listPeriksa = $firebaseArray(periksa);
            listPeriksa.$loaded().then(function (callBack) {
                console.log(callBack.length)
                $ionicLoading.hide()
                if (callBack.length === 1) {
                    console.log('sudahadadata')
                }
                else {
                    var tugas = firebase.database(app).ref("tugasSiswa/" +$scope.data.idKelas+'/'+$scope.data.idMapel).orderByChild("groupTugas").equalTo($scope.data.groupTugas).limitToFirst(1);
                    tugas.on("child_added", function (snapshot) {
                        $scope.datanya = snapshot.val();
                        if (kirimTugas === true) {
                            var insertData = firebase.database(app).ref("tugasSiswa/" +$scope.data.idKelas+'/'+$scope.data.idMapel).push({
                                dibaca: false,
                                filterPublish: data.idSiswa + "_" + $scope.datanya.publish,
                                groupTugas: $scope.datanya.groupTugas,
                                hariTugas: $scope.datanya.hariTugas,
                                idGuru: $scope.datanya.idGuru,
                                idKecamatan: $scope.datanya.idKecamatan,
                                idKelas: $scope.datanya.idKelas,
                                idKotaKabupaten: $scope.datanya.idKotaKabupaten,
                                idPelajaran: $scope.datanya.idPelajaran,
                                idPembuat: $scope.datanya.idPembuat,
                                idProvinsi: $scope.datanya.idProvinsi,
                                idSekolah: $scope.datanya.idSekolah,
                                idSemester: $scope.datanya.idSemester,
                                idSiswa: data.idSiswa,
                                idTahunAjaran: $scope.datanya.idTahunAjaran,
                                isiTugas: $scope.datanya.isiTugas,
                                judulTugas: $scope.datanya.judulTugas,
                                jamTugas: $scope.datanya.jamTugas,
                                jenjang: $scope.datanya.jenjang,
                                kirimTugas: kirimTugas,
                                namaGuru: $scope.datanya.namaGuru,
                                namaKecamatan: $scope.datanya.namaKecamatan,
                                namaKelas: $scope.datanya.namaKelas,
                                namaKotaKabupaten: $scope.datanya.namaKotaKabupaten,
                                namaProvinsi: $scope.datanya.namaProvinsi,
                                namaSekolah: $scope.datanya.namaSekolah,
                                namaSiswa: data.namaSiswa,
                                pelajaran: $scope.datanya.pelajaran,
                                publish: $scope.datanya.publish,
                                semester: $scope.datanya.semester,
                                statusDibaca: $scope.datanya.statusDibaca,
                                tahunAjaran: $scope.datanya.tahunAjaran,
                                tanggalPengumpulanTugas: $scope.datanya.tanggalPengumpulanTugas,
                                tanggalTugas: $scope.datanya.tanggalTugas,
                                groupTugasIdSiswa: $scope.datanya.groupTugas + data.idSiswa
                            }).then(function (resp) {
                                console.log('terkirim')
                            })
                        }
                        else {
                            //Hapus
                            var ref = firebase.database(app).ref("tugasSiswa/" +$scope.data.idKelas+'/'+$scope.data.idMapel).orderByChild("idSiswa").equalTo(data.idSiswa);
                            var listRef = $firebaseArray(ref);
                            $ionicLoading.show();
                            listRef.$loaded().then(function (response) {
                                $ionicLoading.hide();
                                for (i = 0; i < response.length; i++) {
                                    if (response[i].groupTugas === $scope.datanya.groupTugas) {
                                        var hapus = firebase.database(app).ref("tugasSiswa/" +$scope.data.idKelas+'/'+$scope.data.idMapel + response[i].$id);
                                        var objHapus = $firebaseObject(hapus);
                                        objHapus.$remove().then(function (resp) {
                                            console.log('Terhapus')
                                        })

                                    }
                                }
                            });
                        }
                    })
                }
            })
        }

    }])


    .controller('tugasSiswaDiskusiGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')


         
        if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahGuru === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahGuru === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahGuru === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahGuru === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahGuru === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        $scope.data = {
            "uidGuru": $scope.uidGuru,
            "idGroupTugasSiswa": $stateParams.idGroupTugasSiswa,
            "groupTugas": $stateParams.groupTugas,
            "namaKecamatan": $stateParams.namaKecamatan,

            'tahunAjaran': $stateParams.tahunAjaran,
            "semester": $stateParams.semester,
            "pelajaran": $stateParams.pelajaran,
            "namaGuru": $stateParams.namaGuru,
            "namaKelas": $stateParams.namaKelas,
            "namaSekolah": $stateParams.namaSekolah,

            "judulTugas":$stateParams.judulTugas,
            "isiTugas": $stateParams.isiTugas,

            "tanggalPengumpulanTugas": $stateParams.tanggalPengumpulanTugas,
            "getTugas": $stateParams.getTugas,
            "isiChat": '',
        }

        $scope.dataGetTugas = $scope.data.getTugas;

        var fileTugas = firebase.database(app).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa + "/fileGuru");
        var listFileTugas = $firebaseArray(fileTugas);
        listFileTugas.$loaded().then(function (response) {
            $scope.fileTugasGuru = response;
            $scope.banyakFile = response.length;
        });

        $scope.hapusFile = function (fileGuru) {
            // console.log(fileSiswa);
            var fileTugas = firebase.database(app).ref("groupTugasSiswa/" + $scope.data.idGroupTugasSiswa + "/fileGuru/" + fileGuru.$id);
            var objDelete = $firebaseObject(fileTugas);
            objDelete.$remove().then(function (resp) {
                // console.log("deleted")
            })
            var storageRef = firebase.storage(app).ref("tugasGuru/" + $scope.idGuru + "/" + $scope.data.groupTugas + "/" + fileGuru.namaFile);
            $scope.storage = $firebaseStorage(storageRef);
            $scope.storage.$delete().then(function () {
                // console.log("successfully deleted!");
            });
        }

        $scope.lihatJawabanTugas = function (data) {

            $state.go("menuGuru.LihatJawabanTugasSiswa", {
                "idTugas": data.$id,
                "namaSiswa": data.namaSiswa,
                "namaKecamatan": data.namaKecamatan,

                'tahunAjaran': data.tahunAjaran,
                "semester": data.semester,
                "pelajaran": data.pelajaran,
                "namaGuru": data.namaGuru,
                "namaKelas": data.namaKelas,
                "namaSekolah": data.namaSekolah,

                "jawabanTugas": data.jawabanTugas,
                "nilaiTugasSiswa": data.nilaiTugasSiswa,

                "judulTugas":data.judulTugas,
                "isiTugas": data.isiTugas,

                "tanggalPengumpulanTugas": data.tanggalPengumpulanTugas,

                "fileSiswa": data.fileSiswa,
            })
        }

        var cekData = firebase.database(app).ref("groupTugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
            var listCekData = $firebaseArray(cekData);
            listCekData.$loaded().then(function (response) {
                $scope.idGroupTugasSiswa = response[0].$id;
                var listChat = firebase.database(app).ref("groupTugasSiswa/" + $scope.idGroupTugasSiswa + "/chat");
                var listChatan = $firebaseArray(listChat);
                $ionicLoading.show();
                listChatan.$loaded().then(function (response) {
                    $ionicLoading.hide();
                    $scope.ChatSiswa = response;
                    console.log($scope.ChatSiswa)

    

                    firebase.database(app).ref("groupTugasSiswa/" + $scope.idGroupTugasSiswa + "/chat").once('value',   function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        console.log(childData.idPengirim)
                        
                        if (childData.idPengirim === $scope.uidSiswa) {
                        console.log('Pengirim')
                    //     document.getElementById('chat').innerHTML = '<div class="outgoing_msg">\
                    //     <div class="sent_msg">\
                    //       <p>'+childData.isiChat+'</p>\
                    //       <span class="time_date">'+childData.jamChat+' | '+ childData.tanggalDisplay +'</span> </div>\
                    //   </div>';

                        }
                        else {
                            console.log('Bukan Pengirim')
                        //     document.getElementById('chat').innerHTML = '<div class="incoming_msg">\
                        //     <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>\
                        //     <div class="received_msg">\
                        //       <div class="received_withd_msg">\
                        //       <p>'+childData.isiChat+'</p>\
                        //       <span class="time_date">'+childData.jamChat+' | '+ childData.tanggalDisplay +'</span> </div>\
                        //     </div>\
                        //   </div>';

                        }
                        });
                    });
                });
                

            })
        
        $scope.chat = function () {
            // var cekDataSiswa = irebase.database(appSiswa).ref("dataSiswa").orderByChild("uid").equalTo($scope.uidSiswa);
            var cekDataGuru = $scope.uidGuru;
            var namaGuruChat = $scope.namaGuru;
            var cekData = firebase.database(app).ref("groupTugasSiswa").orderByChild("groupTugas").equalTo($scope.data.groupTugas);
            var listCekData = $firebaseArray(cekData);
            listCekData.$loaded().then(function (response) {
                $scope.idGroupTugasSiswa = response[0].$id;
                var tanggalDisplay = $filter('date')(new (Date), 'dd-MM');
                var hariChat= $filter('date')(new (Date), 'EEEE');
                var jamChat = $filter('date')(new (Date), 'HH:mm:ss');
                var refChat = firebase.database(app).ref("groupTugasSiswa/" + $scope.idGroupTugasSiswa  + "/chat");
                refChat.push(
                    {
                        "tanggalDisplay": tanggalDisplay,
                        "jamChat":jamChat,
                        "hariChat":hariChat,
                        "isiChat":$scope.data.isiChat,
                        "idPengirim" : cekDataGuru,
                        "idChat": 'chat' + $scope.idGroupTugasSiswa,
                        "namaPengirim" : namaGuruChat,
                        "status": 'guru',
    
                    }
    
                )
                // window.alert('Chat saved');
            })
           
        }

    }])
