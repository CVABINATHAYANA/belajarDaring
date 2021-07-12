angular.module('app.tugasSiswa', [])

    .controller('tugasSiswaPerMapelCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah');
        // $scope.idKelas = localStorage.getItem('idKelas');
     
        if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahSiswa=== "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahSiswa=== "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahSiswa === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J15") { var app = app_slub; }

        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        $scope.selectFile = function (file) {
            $scope.filelist = file;
            console.log($scope.filelist);
            console.log(file.size);
            console.log(file.name);
            $scope.size = file.size / 1024000;
            // if (file.size <= 512000) {
            //     //console.log("fotoBolehDiUpload");
            //     //Create Firebase Storage Reference
            //     var storageRef = firebase.storage().ref("activityNew/" + $scope.idPengguna + "-" + file.name);
            //     var storage = $firebaseStorage(storageRef);

            //     //Upload File
            //     var uploadTask = storage.$put(file);

            //     //Create Progress Bar
            //     $ionicLoading.show();
            //     uploadTask.$progress(function (snapshot) {
            //         var percentageUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //         $scope.percentage = percentageUpload.toFixed(0);
            //         uploader.style.width = $scope.percentage + '%';
            //         $ionicLoading.hide();
            //         console.log(percentageUpload);
            //     });

            //     //Upload Completition
            //     $ionicLoading.show();
            //     uploadTask.$complete(function (snapshot) {
            //         $scope.showImage = snapshot.downloadURL;
            //         // 			console.log(snapshot);
            //         // 			console.log(snapshot.downloadURL);
            //         var refAddFoto = firebase.database().ref("activity/" + $stateParams.idActivity + "/foto");
            //         $firebaseArray(refAddFoto).$add({
            //             "idPengguna": $scope.idPengguna,
            //             "uid": $scope.uid,
            //             "idActivity": $stateParams.idActivity,
            //             "activityName": $stateParams.activityName,
            //             "fotoURL": $scope.showImage,
            //             "namaFoto": $scope.idPengguna + "-" + file.name
            //         }).then(function (response) {
            //             $ionicLoading.hide();
            //             //console.log(response);
            //             return true;
            //         }).then(function (error) {
            //             //console.log(error);
            //         });

            //     })
            // }
            // else if (file.size > 512000) {
            //     //console.log("FotoKebesaranCuy");
            //     $ionicPopup.alert({
            //         title: 'Informasi',
            //         template: 'Maaf foto yang Anda upload terlalu besar, besaran foto harus kurang dari 512KB, Terimakasih',
            //         okType: 'button-calm'
            //     });
            // }
        };

        var ref = firebase.database(appSiswa).ref("dataSiswa/" + $scope.idPenggunaSiswa);
        $ionicLoading.show();
        ref.on('value', function (snapshot) {
            $ionicLoading.hide();
            // $scope.formData = snapshot.val();
            console.log(snapshot.val().idKelas)
            var kelas = snapshot.val().idKelas;


            var ref = firebase.database().ref("mataPelajaran");
            var listRef = $firebaseArray(ref);
    
            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.mataPelajaran = response;
                var mapel = $scope.mataPelajaran
                $scope.goToTugas = function(data){
                    console.log('ID MAPEL' + data.$id )
                    $state.go('menuSiswa.tugasSiswa',{
                        "idMapel": data.$id,
                    }
                    )
                }
            })

            
            // var ref = firebase.database().ref("tugasSiswa/" + kelas).orderByChild("idSiswa").equalTo($scope.idPenggunaSiswa);
            // var listRef = $firebaseArray(ref);
            // $ionicLoading.show();
            // listRef.$loaded().then(function (response) {
            //     $ionicLoading.hide();
            //     $scope.tugasSiswa = response;
            //     console.log($scope.tugasSiswa)
            //     if (response.length === 0) {
            //         $scope.informasi = true;
            //     }
            //     else {
            //         $scope.informasi = false;
            //     }
            // });
    
            // $scope.getData = function (data) {
            //     $ionicActionSheet.show({
            //         titleText: 'Data Tugas : ' + data.groupTugas,
            //         buttons: [
            //             { text: '<i class="icon ion-social-buffer"></i> Lihat Tugas' },
            //             { text: '<i class="icon ion-chatbubble"></i> Diskusi Tugas' },
            //         ],
            //         // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Tugas',
            //         cancelText: 'Cancel',
            //         cancel: function () {
            //             //console.log('CANCELLED');
            //         },
            //         buttonClicked: function (index) {
            //             if (index === 0) {
            //                 $state.go("menuSiswa.tugasSiswaLihat", {
            //                     "idTugas": data.$id,
            //                     "pelajaran": data.pelajaran,
            //                     "groupTugas": data.groupTugas,
    
            //                     "tahunAjaran": data.tahunAjaran,
            //                     "semester": data.semester,
            //                     "pelajaran": data.pelajaran,
            //                     "guru": data.namaGuru,
            //                     "kelas": data.namaKelas,
            //                     "sekolah": data.namaSekolah,
    
            //                     "judulTugas": data.judulTugas,
            //                     "isiTugas": data.isiTugas,
            //                     "nilaiTugasSiswa": data.nilaiTugasSiswa,
            //                     "jawabanTugas": data.jawabanTugas
            //                 })
            //             }
            //             if (index === 1) {
            //                 $state.go("menuSiswa.tugasSiswaDiskusi", {
            //                     "idTugas": data.$id,
            //                     "pelajaran": data.pelajaran,
            //                     "groupTugas": data.groupTugas,
    
            //                     "tahunAjaran": data.tahunAjaran,
            //                     "semester": data.semester,
            //                     "pelajaran": data.pelajaran,
            //                     "guru": data.namaGuru,
            //                     "kelas": data.namaKelas,
            //                     "sekolah": data.namaSekolah,
    
            //                     "judulTugas": data.judulTugas,
            //                     "isiTugas": data.isiTugas,
            //                     "nilaiTugasSiswa": data.nilaiTugasSiswa,
            //                     "jawabanTugas": data.jawabanTugas
            //                 })
            //             }
            //             return true;
            //         },
            //     });
            // }

        })

    }])


    .controller('tugasSiswaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah');
        // $scope.idKelas = localStorage.getItem('idKelas');
     
         
        if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahSiswa=== "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahSiswa === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj14") { var app = app_sapta; }

        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }
        $scope.formData = {
            "idMapel": $stateParams.idMapel,
        }
        $scope.selectFile = function (file) {
            $scope.filelist = file;
            console.log($scope.filelist);
            console.log(file.size);
            console.log(file.name);
            $scope.size = file.size / 1024000;
            // if (file.size <= 512000) {
            //     //console.log("fotoBolehDiUpload");
            //     //Create Firebase Storage Reference
            //     var storageRef = firebase.storage().ref("activityNew/" + $scope.idPengguna + "-" + file.name);
            //     var storage = $firebaseStorage(storageRef);

            //     //Upload File
            //     var uploadTask = storage.$put(file);

            //     //Create Progress Bar
            //     $ionicLoading.show();
            //     uploadTask.$progress(function (snapshot) {
            //         var percentageUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //         $scope.percentage = percentageUpload.toFixed(0);
            //         uploader.style.width = $scope.percentage + '%';
            //         $ionicLoading.hide();
            //         console.log(percentageUpload);
            //     });

            //     //Upload Completition
            //     $ionicLoading.show();
            //     uploadTask.$complete(function (snapshot) {
            //         $scope.showImage = snapshot.downloadURL;
            //         // 			console.log(snapshot);
            //         // 			console.log(snapshot.downloadURL);
            //         var refAddFoto = firebase.database().ref("activity/" + $stateParams.idActivity + "/foto");
            //         $firebaseArray(refAddFoto).$add({
            //             "idPengguna": $scope.idPengguna,
            //             "uid": $scope.uid,
            //             "idActivity": $stateParams.idActivity,
            //             "activityName": $stateParams.activityName,
            //             "fotoURL": $scope.showImage,
            //             "namaFoto": $scope.idPengguna + "-" + file.name
            //         }).then(function (response) {
            //             $ionicLoading.hide();
            //             //console.log(response);
            //             return true;
            //         }).then(function (error) {
            //             //console.log(error);
            //         });

            //     })
            // }
            // else if (file.size > 512000) {
            //     //console.log("FotoKebesaranCuy");
            //     $ionicPopup.alert({
            //         title: 'Informasi',
            //         template: 'Maaf foto yang Anda upload terlalu besar, besaran foto harus kurang dari 512KB, Terimakasih',
            //         okType: 'button-calm'
            //     });
            // }
        };

        var ref = firebase.database(appSiswa).ref("dataSiswa/" + $scope.idPenggunaSiswa);
        $ionicLoading.show();
        ref.on('value', function (snapshot) {
            $ionicLoading.hide();
            // $scope.formData = snapshot.val();
            console.log(snapshot.val().idKelas)
            var kelas = snapshot.val().idKelas;
            console.log($scope.formData.idMapel);
            var mapel = $scope.formData.idMapel;


            // var ref = firebase.database().ref("mataPelajaran");
            // var listRef = $firebaseArray(ref);
    
            // $ionicLoading.show();
            // listRef.$loaded().then(function (response) {
            //     $ionicLoading.hide();
            //     $scope.mataPelajaran = response;
            // })

            
            var ref = firebase.database(app).ref("tugasSiswa/" + kelas + '/' + mapel).orderByChild("idSiswa").equalTo($scope.idPenggunaSiswa);
            var listRef = $firebaseArray(ref);
            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.tugasSiswa = response;
                console.log($scope.tugasSiswa)
                if (response.length === 0) {
                    $scope.informasi = true;
                }
                else {
                    $scope.informasi = false;
                }
            });
    
            $scope.getData = function (data) {
                $ionicActionSheet.show({
                    titleText: 'Data Tugas : ' + data.groupTugas,
                    buttons: [
                        { text: '<i class="icon ion-social-buffer"></i> Lihat Tugas' },
                        { text: '<i class="icon ion-chatbubble"></i> Diskusi Tugas' },
                    ],
                    // destructiveText: '<i class="icon ion-trash-b"></i> Hapus Tugas',
                    cancelText: 'Cancel',
                    cancel: function () {
                        //console.log('CANCELLED');
                    },
                    buttonClicked: function (index) {
                        if (index === 0) {
                            $state.go("menuSiswa.tugasSiswaLihat", {
                                "idTugas": data.$id,
                                "pelajaran": data.pelajaran,
                                "groupTugas": data.groupTugas,
    
                                "tahunAjaran": data.tahunAjaran,
                                "semester": data.semester,
                                "pelajaran": data.pelajaran,
                                "guru": data.namaGuru,
                                "kelas": data.namaKelas,
                                "sekolah": data.namaSekolah,
    
                                "judulTugas": data.judulTugas,
                                "isiTugas": data.isiTugas,
                                "nilaiTugasSiswa": data.nilaiTugasSiswa,
                                "jawabanTugas": data.jawabanTugas,

                                "idKelas":kelas,
                                "idMapel":mapel,
                            })
                        }
                        if (index === 1) {
                            $state.go("menuSiswa.tugasSiswaDiskusi", {
                                "idTugas": data.$id,
                                "pelajaran": data.pelajaran,
                                "groupTugas": data.groupTugas,
    
                                "tahunAjaran": data.tahunAjaran,
                                "semester": data.semester,
                                "pelajaran": data.pelajaran,
                                "guru": data.namaGuru,
                                "kelas": data.namaKelas,
                                "sekolah": data.namaSekolah,
    
                                "judulTugas": data.judulTugas,
                                "isiTugas": data.isiTugas,
                                "nilaiTugasSiswa": data.nilaiTugasSiswa,
                                "jawabanTugas": data.jawabanTugas,

                                "idKelas":kelas,
                                "idMapel":mapel,
                            })
                        }
                        return true;
                    },
                });
            }

        })

    }])

    .controller('tugasSiswaLihatCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

       
        if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahSiswa=== "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahSiswa === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj14") { var app = app_sapta; }
        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        $scope.formData = {
            "idTugas": $stateParams.idTugas,
            "pelajaran": $stateParams.pelajaran,
            "groupTugas": $stateParams.groupTugas,

            "tahunAjaran": $stateParams.tahunAjaran,
            "semester": $stateParams.semester,
            "pelajaran": $stateParams.pelajaran,
            "guru": $stateParams.guru,
            "kelas": $stateParams.kelas,
            "sekolah": $stateParams.sekolah,

            "judulTugas": $stateParams.judulTugas,
            "isiTugas": $stateParams.isiTugas,
            "nilaiTugasSiswa": $stateParams.nilaiTugasSiswa,
            "jawabanTugas": $stateParams.jawabanTugas,

            "idKelas":$stateParams.idKelas,
            "idMapel":$stateParams.idMapel,

        }

        $scope.tinymceOptions = {
            // content_css: '//www.tiny.cloud/css/codepen.min.css',
            // plugins: [
            //     'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
            //     'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
            //     'save table contextmenu directionality emoticons template paste textcolor image code'
            // ],
            // toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
            mobile: {
                menubar: true
            },

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

        var grup = firebase.database(app).ref("groupTugasSiswa").orderByChild("groupTugas").equalTo($scope.formData.groupTugas);
        grup.on("child_added", function (snapshot) {
            $scope.idGroupTugasSiswa = snapshot.key;

            var listGrup = firebase.database(app).ref("groupTugasSiswa/" + $scope.idGroupTugasSiswa + "/fileGuru");
            var listFile = $firebaseArray(listGrup);
            $ionicLoading.show();
            listFile.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.fileTugasGuru = response;
            })
        });

        var refTugas = firebase.database(app).ref("tugasSiswa/" +$scope.formData.idKelas +'/'+$scope.formData.idMapel +'/'+ $scope.formData.idTugas).update(JSON.parse(JSON.stringify({
            "dibaca": true,
            "statusDibaca": $scope.idPenggunaSiswa + "_" + true,
        })));

        $scope.uploadFile = function () {
            // console.log($scope.formData.jawabanTugas)
            var tanggalKirimTugas = $filter('date')(new Date(), 'dd-MM-yyyy HH:mm:ss');

            if ($scope.formData.jawabanTugas === undefined) {
                $ionicPopup.alert({
                    title: 'MAAF',
                    template: 'Jawaban Tugas Harus Anda Isi',
                    okType: 'button-assertive'
                });
            }
            else if ($scope.formData.jawabanTugas === '') {
                $ionicPopup.alert({
                    title: 'MAAF',
                    template: 'Jawaban Tugas Harus Anda Isi',
                    okType: 'button-assertive'
                });
            }
            else {
                var refTugas = firebase.database(app).ref("tugasSiswa/" +$scope.formData.idKelas +'/'+$scope.formData.idMapel +'/'+ $scope.formData.idTugas).update(JSON.parse(JSON.stringify({
                    "jawabanTugas": $scope.formData.jawabanTugas,
                    "tanggalKirimTugas": tanggalKirimTugas
                }))).then(function (resp) {
                    $ionicPopup.alert({
                        title: 'SUKSES',
                        template: 'Jawaban Tugas Anda Berhasil Dikirim',
                        okType: 'button-positive'
                    });
                })
            }
        }

        $scope.uploadfilesiswa = function () {

            if ($scope.formData.jawabanTugas   === undefined) {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Anda harus menjawab isi tugas terlebih dahulu, setelah itu baru dibolehkan untuk upload file',
                    okType: 'button-positive'
                });
            }
            else if ($scope.formData.jawabanTugas   === "") {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: 'Maaf, Anda harus menjawab isi tugas terlebih dahulu, setelah itu baru dibolehkan untuk upload file',
                    okType: 'button-positive'
                });
            }
            else {
                $state.go("menuSiswa.uploadFileTugas", {
                    "idTugas": $stateParams.idTugas,
                    "pelajaran": $stateParams.pelajaran,
                    "groupTugas": $stateParams.groupTugas,
        
                    "tahunAjaran": $stateParams.tahunAjaran,
                    "semester": $stateParams.semester,
                    "pelajaran": $stateParams.pelajaran,
                    "guru": $stateParams.guru,
                    "kelas": $stateParams.kelas,
                    "sekolah": $stateParams.sekolah,
        
                    "judulTugas": $stateParams.judulTugas,
                    "isiTugas": $stateParams.isiTugas,
                    "nilaiTugasSiswa": $stateParams.nilaiTugasSiswa,
                    "jawabanTugas": $stateParams.jawabanTugas,

                    "idKelas" :$scope.formData.idKelas,
                    "idMapel" :$scope.formData.idMapel
                })
            }
        }


    }])

    .controller('uploadFileTugasCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')
             
        if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahSiswa=== "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahSiswa === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj14") { var app = app_sapta; }
        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        $scope.formData = {
            "idTugas": $stateParams.idTugas,
            "pelajaran": $stateParams.pelajaran,
            "groupTugas": $stateParams.groupTugas,

            "tahunAjaran": $stateParams.tahunAjaran,
            "semester": $stateParams.semester,
            "pelajaran": $stateParams.pelajaran,
            "namaGuru": $stateParams.namaGuru,
            "namaKelas": $stateParams.namaKelas,
            "namaKelas": $stateParams.namaSekolah,

            "judulTugas": $stateParams.judulTugas,
            "isiTugas": $stateParams.isiTugas,
            "nilaiTugasSiswa": $stateParams.nilaiTugasSiswa,
            "jawabanTugas": $stateParams.jawabanTugas,

            "idKelas":$stateParams.idKelas,
            "idMapel":$stateParams.idMapel,

        }

        var uploader = document.getElementById("uploader");
        var fileTugas = firebase.database(app).ref("tugasSiswa/"+$scope.formData.idKelas +'/'+$scope.formData.idMapel +'/'+ $scope.formData.idTugas + "/fileSiswa");
        var listFileTugas = $firebaseArray(fileTugas);
        $ionicLoading.show();
        listFileTugas.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.fileTugasSiswa = response;
            $scope.banyakFile = response.length;
        });

        $scope.selectFile = function (files) {
            $scope.filelist = files;
            if (files && files.length) {
                var ukuran = 0
                for (var i = 0; i < files.length; i++) {
                    var ukuran = ukuran + files[i].size
                }
                for (j = 0; j < files.length; j++) {
                    if (ukuran <= 5120000000) {

                        //Create Firebase Storage Reference
                        var storageRef = firebase.storage().ref("tugasSiswa/" + $scope.formData.idTugas + "/" + $scope.idPenggunaSiswa + "/" + files[j].name);
                        var storage = $firebaseStorage(storageRef);

                        //Upload File
                        var uploadTask = storage.$put(files[j]);

                        //Create Progress Bar
                        uploadTask.$progress(function (snapshot) {
                            var percentageUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            $scope.percentage = percentageUpload.toFixed(0);
                            uploader.style.width = $scope.percentage + '%';
                            console.log(percentageUpload);
                        });

                        //Upload Completition
                        uploadTask.$complete(function (snapshot) {
                            $scope.showImage = snapshot.downloadURL;
                            // console.log(snapshot);
                            // console.log(snapshot.downloadURL);
                            var refAddFoto = firebase.database(app).ref("tugasSiswa/" +$scope.formData.idKelas +'/'+$scope.formData.idMapel +'/'+  $scope.formData.idTugas + "/fileSiswa");
                            refAddFoto.push({
                                "fotoURL": $scope.showImage,
                                "namaFile": snapshot.metadata.name
                            }).then(function (response) {
                                $ionicLoading.hide();
                                //console.log(response);
                                return true;
                            }).then(function (error) {
                                console.log(error);
                            });

                        })

                    }
                    else if (ukuran > 5120000000) {
                        //console.log("FotoKebesaranCuy");
                        $ionicPopup.alert({
                            title: 'Informasi',
                            template: 'Maaf total ukuran file yang Anda upload terlalu besar, besaran file tidak boleh lebih dari 50 MB, Terimakasih',
                            okType: 'button-positive'
                        });
                    }
                }
            }
            // console.log(ukuran);

        };

        $scope.hapusFile = function (fileSiswa) {
            // console.log(fileSiswa);
            var fileTugas = firebase.database(app).ref("tugasSiswa/" +$scope.formData.idKelas +'/'+$scope.formData.idMapel +'/'+ $scope.formData.idTugas + "/fileSiswa/" + fileSiswa.$id);
            var objDelete = $firebaseObject(fileTugas);
            objDelete.$remove().then(function (resp) {
                console.log("deleted")
            })
            var storageRef = firebase.storage(app).ref("tugasSiswa/" + $scope.formData.idTugas + "/" + $scope.idPenggunaSiswa + "/" + fileSiswa.namaFile);
            $scope.storage = $firebaseStorage(storageRef);
            $scope.storage.$delete().then(function () {
                console.log("successfully deleted!");
            });
        }

    }])

    .controller('tugasSiswaDiskusiCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseStorage) {

        $scope.idPenggunaSiswa = localStorage.getItem('idPenggunaSiswa');
        $scope.namaPenggunaSiswa = localStorage.getItem('namaPenggunaSiswa');
        $scope.emailSiswa = localStorage.getItem('emailSiswa');
        $scope.uidSiswa = localStorage.getItem('uidSiswa');
        $scope.idSekolahSiswa = localStorage.getItem('idSekolahSiswa');
        $scope.jenjangSiswa = localStorage.getItem('jenjangSiswa');
        $scope.idProvinsiSiswa = localStorage.getItem('idProvinsiSiswa');
        $scope.idKotaKabupatenSiswa = localStorage.getItem('idKotaKabupatenSiswa');
        $scope.idKecamatanSiswa = localStorage.getItem('idKecamatanSiswa');
        $scope.kodeSekolah = localStorage.getItem('kodeSekolah')

        // window.alert($scope.uidSiswa);
       
        if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP1") { var app = app_smpn1dps; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J1") { var app = app_smpn2; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J8") { var app = app_smpn3; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J9") { var app = app_smpn4; }
        else if ($scope.idSekolahSiswa=== "-MPyF17P3CjaG3Am7g9J10") { var app = app_smpn5; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw1") { var app = app_smpn6; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj1") { var app = app_smpn7; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP6") { var app = app_smpn8; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw13") { var app = app_smpn9; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J6") { var app = app_smpn10; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw12") { var app = app_smpn11; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J7") { var app = app_smpn12; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj8") { var app = app_smpn13; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP5") { var app = app_smpn14; }
        else if ($scope.idSekolahSiswa === "-MPyROcy6xPWAnYTzci8") { var app = app_lentera; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J3") { var app = app_dharmapraja; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj5") { var app = app_harapanmulia; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw8") { var app = app_kusumasari; }
        else if ($scope.idSekolahSiswa === "-MPyA8UKj59icln4APLw24") { var app = app_pelitahati; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj11") { var app = app_pgri1; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP10") { var app = app_rajyamuna; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP12") { var app = app_siladharma; }
        else if ($scope.idSekolahSiswa === "-MPyF17P3CjaG3Am7g9J17") { var app = app_tamanrama; }
        else if ($scope.idSekolahSiswa === "-MPy2LKKp9pwOpJjuoCP13") { var app = app_tawakkal; }
        else if ($scope.idSekolahSiswa === "-MPyESRb8UVcQBHz7pxj14") { var app = app_sapta; }
        if (!$scope.idPenggunaSiswa) {
            $state.go('welcome');
        }

        $scope.formData = {
            "uidSiswa": $scope.uidSiswa,
            "idTugas": $stateParams.idTugas,
            "pelajaran": $stateParams.pelajaran,
            "groupTugas": $stateParams.groupTugas,

            "tahunAjaran": $stateParams.tahunAjaran,
            "semester": $stateParams.semester,
            "pelajaran": $stateParams.pelajaran,
            "guru": $stateParams.guru,
            "kelas": $stateParams.kelas,
            "sekolah": $stateParams.sekolah,

            "judulTugas": $stateParams.judulTugas,
            "isiTugas": $stateParams.isiTugas,
            "nilaiTugasSiswa": $stateParams.nilaiTugasSiswa,
            "jawabanTugas": $stateParams.jawabanTugas,
            "isiChat": '',

        }

        var cekData = firebase.database(app).ref("groupTugasSiswa").orderByChild("groupTugas").equalTo($scope.formData.groupTugas);
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
            var cekDataSiswa = $scope.uidSiswa;
            var namaSiswaChat = $scope.namaPenggunaSiswa;
            var cekData = firebase.database(app).ref("groupTugasSiswa").orderByChild("groupTugas").equalTo($scope.formData.groupTugas);
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
                        "isiChat":$scope.formData.isiChat,
                        "idPengirim" : cekDataSiswa,
                        "idChat": 'chat' + $scope.idGroupTugasSiswa,
                        "namaPengirim" : namaSiswaChat,
                        "status": 'siswa',
    
                    }
    
                )
                // window.alert('Chat saved')
            })
           
        }
    }])