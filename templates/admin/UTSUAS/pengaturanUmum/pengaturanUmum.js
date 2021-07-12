angular.module('app.pengaturanUmumUTSUASAdmin', [])

    .controller('pengaturanUmumUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran
        };
        //console.log($scope.data);

        $ionicLoading.show();
        var data = firebase.database(appUTSUASOnline).ref("pengaturanUmumUjianUTSUAS").orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS);
        var listData = $firebaseArray(data);
        listData.$loaded().then(function (response) {
            $ionicLoading.hide()
            // console.log(response);
            if (response.length === 1) {
                var dataObject = firebase.database(appUTSUASOnline).ref("pengaturanUmumUjianUTSUAS/" + response[0].$id);
                var iD = response[0].$id;
                $scope.formData = {
                    "tanggalUjian": new Date(response[0].tanggalUjian),
                    "jamUjian": new Date(response[0].jamUjian),
                    "durasiUjian": response[0].durasiUjian,
                    "nilaiMaksimum": response[0].nilaiMaksimum,
                    "jumlahSoal": response[0].jumlahSoal,
                    "kkm": response[0].kkm,
                    "soalAcak": response[0].soalAcak,
                    "pembahasanSoalDibuka": response[0].pembahasanSoalDibuka,
                    "bukaUjianSekarang": response[0].bukaUjianSekarang,
                    "tutupUjianSekarang": response[0].tutupUjianSekarang,
                    "id": response[0].$id
                };
            }
            else if (response.length === 0) {
                $scope.formData = {
                    "tanggalUjian": new Date(),
                    "jamUjian": '',
                    "durasiUjian": '',
                    "nilaiMaksimum": '',
                    "jumlahSoal": '',
                    "kkm": '',
                    "soalAcak": false,
                    "pembahasanSoalDibuka": false,
                    "bukaUjianSekarang": false,
                    "tutupUjianSekarang": false
                };
            }
            else if (response.length > 1) {
                for (i = 0; i < response.length; i++) {
                    if (i > 0) {
                        var obj = firebase.database(appUTSUASOnline).ref("pengaturanUmumUjianUTSUAS/" + response[i].$id);
                        objDelete = $firebaseObject(obj);
                        objDelete.$remove().then(function (resp) {
                            console.log('delete');
                        })
                    }
                }
            }
        });

        $scope.simpan = function () {
            if ($scope.formData.tanggalUjian !== null && $scope.formData.jamUjian !== null && $scope.formData.durasiUjian !== null && $scope.formData.nilaiMaksimum !== null && $scope.formData.jumlahSoal !== null && $scope.formData.kkm !== null) {

                var cekData = firebase.database(appUTSUASOnline).ref("pengaturanUmumUjianUTSUAS").orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS);
                var listCekData = $firebaseArray(cekData);

                listCekData.$loaded().then(function (response) {
                    if (response.length === 0) {
                        // Additional Variabel
                        var tanggalUjian = $filter('date')($scope.formData.tanggalUjian);
                        var hariUjian = $filter('date')($scope.formData.tanggalUjian, 'EEEE');
                        var jamUjian = $filter('date')($scope.formData.jamUjian, 'yyyy-MM-dd HH:mm:ss Z');
                        var tanggalUjianDisplay = $filter('date')($scope.formData.tanggalUjian, 'dd-MM-yyyy');
                        var jamUjianDisplay = $filter('date')($scope.formData.jamUjian, 'HH:mm');

                        var addData = firebase.database(appUTSUASOnline).ref("pengaturanUmumUjianUTSUAS");
                        addData.push({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,

                            "tanggalUjian": tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        }).then(function (resp) {
                            $state.go("menuAdmin.pelajaranUTSUASAdmin", {
                                "idUTSUAS": $stateParams.idUTSUAS,
                                "namaUTSUAS": $stateParams.namaUTSUAS,
                                "jenjang": $stateParams.jenjang,
                                "tingkatKelas": $stateParams.tingkatKelas
                            });
                            $ionicPopup.alert({
                                title: 'SUKSES',
                                template: "Data berhasil disimpan",
                                okType: "button-positive"
                            });
                        });

                        var addData = firebase.database(app5315).ref("pengaturanUmumUjianUTSUAS");
                        addData.push({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,

                            "tanggalUjian": tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        })
                        var addData = firebase.database(app5316).ref("pengaturanUmumUjianUTSUAS");
                        addData.push({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,

                            "tanggalUjian": tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        })
                        var addData = firebase.database(app5317).ref("pengaturanUmumUjianUTSUAS");
                        addData.push({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,

                            "tanggalUjian": tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        })
                        var addData = firebase.database(app5318).ref("pengaturanUmumUjianUTSUAS");
                        addData.push({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,

                            "tanggalUjian": tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        })
                        var addData = firebase.database(app5319).ref("pengaturanUmumUjianUTSUAS");
                        addData.push({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,

                            "tanggalUjian": tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        })
                        var addData = firebase.database(app5320).ref("pengaturanUmumUjianUTSUAS");
                        addData.push({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,

                            "tanggalUjian": tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        })
                        var addData = firebase.database(app5321).ref("pengaturanUmumUjianUTSUAS");
                        addData.push({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,

                            "tanggalUjian": tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        })
                        var addData = firebase.database(app5322).ref("pengaturanUmumUjianUTSUAS");
                        addData.push({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,

                            "tanggalUjian": tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        })
                        var addData = firebase.database(app5323).ref("pengaturanUmumUjianUTSUAS");
                        addData.push({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,

                            "tanggalUjian": tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        })
                        var addData = firebase.database(app5324).ref("pengaturanUmumUjianUTSUAS");
                        addData.push({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,

                            "tanggalUjian": tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        })
                    }
                    else {
                        var hariUjian = $filter('date')($scope.formData.tanggalUjian, 'EEEE');
                        var tanggalUjianDisplay = $filter('date')($scope.formData.tanggalUjian, 'dd-MM-yyyy');
                        var jamUjianDisplay = $filter('date')($scope.formData.jamUjian, 'HH:mm');

                        var refUpdate = firebase.database(appUTSUASOnline).ref("pengaturanUmumUjianUTSUAS/" + $scope.formData.id);
                        refUpdate.update(JSON.parse(JSON.stringify({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,

                            "tanggalUjian": $scope.formData.tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": $scope.formData.jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        }))).then(function (response) {
                            var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(appUTSUASOnline).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("idPelajaranUTSUAS").equalTo($scope.data.idPelajaranUTSUAS);
                            var listUpdateJawabanUTSUASSiswaPerPelajaran = $firebaseArray(updateJawabanUTSUASSiswaPerPelajaran);

                            listUpdateJawabanUTSUASSiswaPerPelajaran.$loaded().then(function (response) {
                                // for (i = 0; i < response.length; i++) {
                                //     //console.log(response[i].$id);
                                //     var updateData = firebase.database(appUTSUASOnline).ref("jawabanUTSUASSiswaPerPelajaran/" + response[i].$id);

                                //     updateData.update(JSON.parse(JSON.stringify({

                                //         "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                                //         "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,

                                //     }))).then(function (resp) {
                                //         console.log("update jawaban perpelajaran success");
                                //     })
                                // }
                            });

                            $state.go("menuAdmin.pelajaranUTSUASAdmin", {
                                "idUTSUAS": $stateParams.idUTSUAS,
                                "namaUTSUAS": $stateParams.namaUTSUAS,
                                "jenjang": $stateParams.jenjang,
                                "tingkatKelas": $stateParams.tingkatKelas
                            });
                            $ionicPopup.alert({
                                title: 'SUKSES',
                                template: "Data berhasil diperbaharui",
                                okType: "button-positive"
                            });
                        });

                        var update5315 = firebase.database(app5315).ref("pengaturanUmumUjianUTSUAS/" + $scope.formData.id);
                        update5315.update(JSON.parse(JSON.stringify({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,
                            "tanggalUjian": $scope.formData.tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": $scope.formData.jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        }))).then(function (response) {
                            var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(app5315).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("idPelajaranUTSUAS").equalTo($scope.data.idPelajaranUTSUAS);
                            var listUpdateJawabanUTSUASSiswaPerPelajaran = $firebaseArray(updateJawabanUTSUASSiswaPerPelajaran);

                            listUpdateJawabanUTSUASSiswaPerPelajaran.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {
                                    //console.log(response[i].$id);
                                    var updateData = firebase.database(app5315).ref("jawabanUTSUASSiswaPerPelajaran/" + response[i].$id);
                                    updateData.update(JSON.parse(JSON.stringify({
                                        "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                                        "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                                    })))
                                }
                            });
                        });

                        var update5316 = firebase.database(app5316).ref("pengaturanUmumUjianUTSUAS/" + $scope.formData.id);
                        update5316.update(JSON.parse(JSON.stringify({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,
                            "tanggalUjian": $scope.formData.tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": $scope.formData.jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        }))).then(function (response) {
                            var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(app5316).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("idPelajaranUTSUAS").equalTo($scope.data.idPelajaranUTSUAS);
                            var listUpdateJawabanUTSUASSiswaPerPelajaran = $firebaseArray(updateJawabanUTSUASSiswaPerPelajaran);

                            listUpdateJawabanUTSUASSiswaPerPelajaran.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {
                                    //console.log(response[i].$id);
                                    var updateData = firebase.database(app5316).ref("jawabanUTSUASSiswaPerPelajaran/" + response[i].$id);
                                    updateData.update(JSON.parse(JSON.stringify({
                                        "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                                        "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                                    })))
                                }
                            });
                        });

                        var update5317 = firebase.database(app5317).ref("pengaturanUmumUjianUTSUAS/" + $scope.formData.id);
                        update5317.update(JSON.parse(JSON.stringify({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,
                            "tanggalUjian": $scope.formData.tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": $scope.formData.jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        }))).then(function (response) {
                            var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(app5317).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("idPelajaranUTSUAS").equalTo($scope.data.idPelajaranUTSUAS);
                            var listUpdateJawabanUTSUASSiswaPerPelajaran = $firebaseArray(updateJawabanUTSUASSiswaPerPelajaran);

                            listUpdateJawabanUTSUASSiswaPerPelajaran.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {
                                    //console.log(response[i].$id);
                                    var updateData = firebase.database(app5317).ref("jawabanUTSUASSiswaPerPelajaran/" + response[i].$id);
                                    updateData.update(JSON.parse(JSON.stringify({
                                        "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                                        "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                                    })))
                                }
                            });
                        });

                        var update5318 = firebase.database(app5318).ref("pengaturanUmumUjianUTSUAS/" + $scope.formData.id);
                        update5318.update(JSON.parse(JSON.stringify({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,
                            "tanggalUjian": $scope.formData.tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": $scope.formData.jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        }))).then(function (response) {
                            var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(app5318).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("idPelajaranUTSUAS").equalTo($scope.data.idPelajaranUTSUAS);
                            var listUpdateJawabanUTSUASSiswaPerPelajaran = $firebaseArray(updateJawabanUTSUASSiswaPerPelajaran);

                            listUpdateJawabanUTSUASSiswaPerPelajaran.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {
                                    //console.log(response[i].$id);
                                    var updateData = firebase.database(app5318).ref("jawabanUTSUASSiswaPerPelajaran/" + response[i].$id);
                                    updateData.update(JSON.parse(JSON.stringify({
                                        "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                                        "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                                    })))
                                }
                            });
                        });

                        var update5319 = firebase.database(app5319).ref("pengaturanUmumUjianUTSUAS/" + $scope.formData.id);
                        update5319.update(JSON.parse(JSON.stringify({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,
                            "tanggalUjian": $scope.formData.tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": $scope.formData.jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        }))).then(function (response) {
                            var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(app5319).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("idPelajaranUTSUAS").equalTo($scope.data.idPelajaranUTSUAS);
                            var listUpdateJawabanUTSUASSiswaPerPelajaran = $firebaseArray(updateJawabanUTSUASSiswaPerPelajaran);

                            listUpdateJawabanUTSUASSiswaPerPelajaran.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {
                                    //console.log(response[i].$id);
                                    var updateData = firebase.database(app5319).ref("jawabanUTSUASSiswaPerPelajaran/" + response[i].$id);
                                    updateData.update(JSON.parse(JSON.stringify({
                                        "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                                        "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                                    })))
                                }
                            });
                        });

                        var update5320 = firebase.database(app5320).ref("pengaturanUmumUjianUTSUAS/" + $scope.formData.id);
                        update5320.update(JSON.parse(JSON.stringify({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,
                            "tanggalUjian": $scope.formData.tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": $scope.formData.jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        }))).then(function (response) {
                            var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(app5320).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("idPelajaranUTSUAS").equalTo($scope.data.idPelajaranUTSUAS);
                            var listUpdateJawabanUTSUASSiswaPerPelajaran = $firebaseArray(updateJawabanUTSUASSiswaPerPelajaran);

                            listUpdateJawabanUTSUASSiswaPerPelajaran.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {
                                    //console.log(response[i].$id);
                                    var updateData = firebase.database(app5320).ref("jawabanUTSUASSiswaPerPelajaran/" + response[i].$id);
                                    updateData.update(JSON.parse(JSON.stringify({
                                        "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                                        "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                                    })))
                                }
                            });
                        });

                        var update5321 = firebase.database(app5321).ref("pengaturanUmumUjianUTSUAS/" + $scope.formData.id);
                        update5321.update(JSON.parse(JSON.stringify({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,
                            "tanggalUjian": $scope.formData.tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": $scope.formData.jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        }))).then(function (response) {
                            var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(app5321).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("idPelajaranUTSUAS").equalTo($scope.data.idPelajaranUTSUAS);
                            var listUpdateJawabanUTSUASSiswaPerPelajaran = $firebaseArray(updateJawabanUTSUASSiswaPerPelajaran);

                            listUpdateJawabanUTSUASSiswaPerPelajaran.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {
                                    //console.log(response[i].$id);
                                    var updateData = firebase.database(app5321).ref("jawabanUTSUASSiswaPerPelajaran/" + response[i].$id);
                                    updateData.update(JSON.parse(JSON.stringify({
                                        "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                                        "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                                    })))
                                }
                            });
                        });

                        var update5322 = firebase.database(app5322).ref("pengaturanUmumUjianUTSUAS/" + $scope.formData.id);
                        update5322.update(JSON.parse(JSON.stringify({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,
                            "tanggalUjian": $scope.formData.tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": $scope.formData.jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        }))).then(function (response) {
                            var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(app5322).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("idPelajaranUTSUAS").equalTo($scope.data.idPelajaranUTSUAS);
                            var listUpdateJawabanUTSUASSiswaPerPelajaran = $firebaseArray(updateJawabanUTSUASSiswaPerPelajaran);

                            listUpdateJawabanUTSUASSiswaPerPelajaran.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {
                                    //console.log(response[i].$id);
                                    var updateData = firebase.database(app5322).ref("jawabanUTSUASSiswaPerPelajaran/" + response[i].$id);
                                    updateData.update(JSON.parse(JSON.stringify({
                                        "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                                        "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                                    })))
                                }
                            });
                        });

                        var update5323 = firebase.database(app5323).ref("pengaturanUmumUjianUTSUAS/" + $scope.formData.id);
                        update5323.update(JSON.parse(JSON.stringify({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,
                            "tanggalUjian": $scope.formData.tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": $scope.formData.jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        }))).then(function (response) {
                            var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(app5323).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("idPelajaranUTSUAS").equalTo($scope.data.idPelajaranUTSUAS);
                            var listUpdateJawabanUTSUASSiswaPerPelajaran = $firebaseArray(updateJawabanUTSUASSiswaPerPelajaran);

                            listUpdateJawabanUTSUASSiswaPerPelajaran.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {
                                    //console.log(response[i].$id);
                                    var updateData = firebase.database(app5323).ref("jawabanUTSUASSiswaPerPelajaran/" + response[i].$id);
                                    updateData.update(JSON.parse(JSON.stringify({
                                        "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                                        "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                                    })))
                                }
                            });
                        });

                        var update5324 = firebase.database(app5324).ref("pengaturanUmumUjianUTSUAS/" + $scope.formData.id);
                        update5324.update(JSON.parse(JSON.stringify({
                            "idUTSUAS": $stateParams.idUTSUAS,
                            "namaUTSUAS": $stateParams.namaUTSUAS,
                            "jenjang": $stateParams.jenjang,
                            "tingkatKelas": $stateParams.tingkatKelas,
                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                            "idPelajaran": $stateParams.idPelajaran,
                            "pelajaran": $stateParams.pelajaran,
                            "tanggalUjian": $scope.formData.tanggalUjian,
                            "tanggalUjianDisplay": tanggalUjianDisplay,
                            "hariUjian": hariUjian,
                            "jamUjian": $scope.formData.jamUjian,
                            "jamUjianDisplay": jamUjianDisplay,
                            "durasiUjian": $scope.formData.durasiUjian,
                            "nilaiMaksimum": $scope.formData.nilaiMaksimum,
                            "jumlahSoal": $scope.formData.jumlahSoal,
                            "kkm": $scope.formData.kkm,
                            "soalAcak": $scope.formData.soalAcak,
                            "pembahasanSoalDibuka": $scope.formData.pembahasanSoalDibuka,
                            "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                            "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                            "filter": $scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS
                        }))).then(function (response) {
                            var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(app5324).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("idPelajaranUTSUAS").equalTo($scope.data.idPelajaranUTSUAS);
                            var listUpdateJawabanUTSUASSiswaPerPelajaran = $firebaseArray(updateJawabanUTSUASSiswaPerPelajaran);

                            listUpdateJawabanUTSUASSiswaPerPelajaran.$loaded().then(function (response) {
                                for (i = 0; i < response.length; i++) {
                                    //console.log(response[i].$id);
                                    var updateData = firebase.database(app5324).ref("jawabanUTSUASSiswaPerPelajaran/" + response[i].$id);
                                    updateData.update(JSON.parse(JSON.stringify({
                                        "bukaUjianSekarang": $scope.formData.bukaUjianSekarang,
                                        "tutupUjianSekarang": $scope.formData.tutupUjianSekarang,
                                    })))
                                }
                            });
                        });

                    }
                });

            }
            else {
                $ionicPopup.alert({
                    title: 'Perhatian',
                    template: "Maaf, Seluruh Data Harus Diisi",
                    okType: "button-positive"
                });
            }

        };

    }])

    .controller('kisiKisiSoalUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran
        };


        var cekData = firebase.database(appUTSUASOnline).ref("kisiKisiSoalUTSUAS").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
        var listCekData = $firebaseArray(cekData);

        listCekData.$loaded().then(function (response) {

            if (response.length === 0) {
                var add = firebase.database(appUTSUASOnline).ref("kisiKisiSoalUTSUAS").push({

                    "idUTSUAS": $stateParams.idUTSUAS,
                    "namaUTSUAS": $stateParams.namaUTSUAS,
                    "jenjang": $stateParams.jenjang,
                    "tingkatKelas": $stateParams.tingkatKelas,
                    "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                    "idPelajaran": $stateParams.idPelajaran,
                    "pelajaran": $stateParams.pelajaran,
                    "filter": $stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS,

                }).then(function (resp) {
                    var id = firebase.database(appUTSUASOnline).ref("kisiKisiSoalUTSUAS").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
                    id.on("child_added", function (snapshot) {
                        $scope.idKisiKisi = snapshot.key;
                    });

                    var refKisi = firebase.database(appUTSUASOnline).ref("kisiKisiSoalUTSUAS/" + $scope.idKisiKisi + "/kisiKisi");
                    var listRefKisi = $firebaseArray(refKisi);

                    listRefKisi.$loaded().then(function (response) {
                        $scope.kisiKisi = response;
                    });

                });
            }
            else {
                //console.log("no action anymore");
                $scope.idKisiKisi = response[0].$id;
                var refKisi = firebase.database(appUTSUASOnline).ref("kisiKisiSoalUTSUAS/" + $scope.idKisiKisi + "/kisiKisi");
                var listRefKisi = $firebaseArray(refKisi);

                listRefKisi.$loaded().then(function (response) {
                    $scope.kisiKisi = response;
                });

            }

        });

        $scope.tambahData = function () {


            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.formData = {
                    "materiPelajaran": '',
                    "ruangLingkup": '',
                };

                $scope.simpan = function () {
                    if ($scope.formData.materiPelajaran !== '' && $scope.formData.ruangLingkup !== '') {
                        $ionicLoading.show();
                        var add = firebase.database(appUTSUASOnline).ref("kisiKisiSoalUTSUAS/" + $scope.idKisiKisi + "/kisiKisi").push($scope.formData).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide();
                            //console.log("success")

                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: "Maaf, Seluruh Data Harus Diisi",
                            okType: "button-positive"
                        });
                    }
                };

            });


        };


        $scope.getData = function (data) {

            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Materi : ' + data.materiPelajaran,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Edit Data' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {

                        $ionicModal.fromTemplateUrl('templates/modal.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            var refObj = firebase.database(appUTSUASOnline).ref("kisiKisiSoalUTSUAS/" + $scope.idKisiKisi + "/kisiKisi/" + data.$id);
                            $scope.formData = $firebaseObject(refObj);

                            $scope.simpan = function () {
                                if ($scope.formData.materiPelajaran !== '' && $scope.formData.ruangLingkup !== '') {
                                    $ionicLoading.show();

                                    refObj.update(JSON.parse(JSON.stringify({
                                        "materiPelajaran": $scope.formData.materiPelajaran,
                                        "ruangLingkup": $scope.formData.ruangLingkup,
                                    }))).then(function (resp) {
                                        $ionicLoading.hide();
                                        $scope.modal.hide();
                                    })
                                }
                                else {
                                    $ionicPopup.alert({
                                        title: 'Perhatian',
                                        template: "Maaf, Seluruh Data Harus Diisi",
                                        okType: "button-positive"
                                    });
                                }
                            };

                        });

                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    //console.log($scope.idKisiKisi);
                    var refObj = firebase.database(appUTSUASOnline).ref("kisiKisiSoalUTSUAS/" + $scope.idKisiKisi + "/kisiKisi/" + data.$id);
                    var objDelete = $firebaseObject(refObj)
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
                    return true;
                }

            });

        };

    }])

    .controller('resetJawabanPesertaUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran
        };

        var refPesertaUTSUAS = firebase.database(appUTSUASOnline).ref("pesertaUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        var listPesertaUTSUAS = $firebaseArray(refPesertaUTSUAS);

        listPesertaUTSUAS.$loaded().then(function (response) {
            $scope.dataPesertaUTSUAS = response;
        });

        $scope.getDataHapus = function (data) {
            if (data.idKecamatan === "5315") { var app = app5315; }
            else if (data.idKecamatan === "5316") { var app = app5316; }
            else if (data.idKecamatan === "5317") { var app = app5317; }
            else if (data.idKecamatan === "5318") { var app = app5318; }
            else if (data.idKecamatan === "5319") { var app = app5319; }
            else if (data.idKecamatan === "5320") { var app = app5320; }
            else if (data.idKecamatan === "5321") { var app = app5321; }
            else if (data.idKecamatan === "5322") { var app = app5322; }
            else if (data.idKecamatan === "5323") { var app = app5323; }
            else if (data.idKecamatan === "5324") { var app = app5324; }

            var confirmPopup = $ionicPopup.confirm({
                title: 'Reset Jawaban Peserta',
                template: 'Apakah Kamu Yakin Ingin Mereset Semua Jawaban Ujian Peserta Ini?',
                okType: "button-positive",
            });
            confirmPopup.then(function (res) {
                if (res) {

                    //Menghapus Jawaban UTSUAS Siswa
                    var jawabanUTSUASSiswa = firebase.database(app).ref("jawabanUTSUASSiswa").orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS + "_" + data.uid);
                    var refJawabanUTSUASSiswa = $firebaseArray(jawabanUTSUASSiswa);

                    refJawabanUTSUASSiswa.$loaded().then(function (response) {
                        for (i = 0; i < response.length; i++) {
                            var id = response[i].$id;

                            var updateJawabanUTSUASSiswa = firebase.database(app).ref("jawabanUTSUASSiswa/" + id);

                            updateJawabanUTSUASSiswa.update(JSON.parse(JSON.stringify({
                                "statusJawaban": "",
                                "statusJawabanBenar": 0,
                                "statusJawabanSalah": 0,
                                "kunciJawaban": "",
                                "pilihanJawaban": "",
                                "bobotNilai": 0,
                                "statusTerjawab": 0,
                            }))).then(function (resp) {
                                console.log("jawabanUTSUASSiswaTerhapus");
                            });
                        }
                    });

                    //Menghapus Jawaban UTSUAS Siswa PerPelajaran
                    var jawabanUTSUASSiswaPerPelajaran = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS + "_" + data.uid);
                    var refJawabanUTSUASSiswaPerPelajaran = $firebaseArray(jawabanUTSUASSiswaPerPelajaran);

                    refJawabanUTSUASSiswaPerPelajaran.$loaded().then(function (response) {
                        for (i = 0; i < response.length; i++) {
                            var id = response[i].$id;

                            var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + id);

                            updateJawabanUTSUASSiswaPerPelajaran.update(JSON.parse(JSON.stringify({
                                "benar": 0,
                                "salah": 0,
                                "kosong": 0,
                                "nilai": 0,
                                "statusFinish": false,
                                "bukaUjianSekarang": false,
                                "tutupUjianSekarang": false,
                                "jumlahSoal": 0,
                                "statusTerjawab": false,
                            }))).then(function (resp) {
                                console.log("jawabanUTSUASSiswaPerPelajaran-Terhapus");
                                $ionicPopup.alert({
                                    title: 'SUKSES',
                                    template: "Reset Jawaban Siswa Sukses",
                                    okType: "button-positive"
                                });
                            });
                        }

                    });

                }
                else {
                }
            });

        };

    }])

    .controller('tambahSoalUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran
        };


        var jumlahSoal = firebase.database(appUTSUASOnline).ref("pengaturanUmumUjianUTSUAS").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
        jumlahSoal.on("child_added", function (snapshot) {
            $scope.totalSoalUjian = snapshot.val().jumlahSoal;
            //console.log($scope.totalSoalUjian);
        });

        if ($scope.data.jenjang === "SMK") {
            var jenjangSekarang = "SMA";
            var ref = firebase.database(appBankSoal).ref("soal").orderByChild("filterSoalUjian").equalTo($scope.data.idPelajaran + "_" + jenjangSekarang + "_" + $scope.data.tingkatKelas);
            var list = $firebaseArray(ref);

            list.$loaded().then(function (response) {
                $scope.totalSoal = response.length;
                if (response.length === 0) {
                    $scope.info = "<h2 style='font-weight:300; padding:10px'>Pemberitahuan</h2><p style='padding:10px'>Belum ada soal yang ditampilkan pada pelajaran ini, silahkan buat soal terlebih dahulu di menu <strong>Bank Soal</strong>. Terima Kasih</p>";
                }
                else {
                    $scope.dataSoal = response;
                }
            });
        }

        var ref = firebase.database(appBankSoal).ref("soal").orderByChild("filterSoalUjian").equalTo($scope.data.idPelajaran + "_" + $scope.data.jenjang + "_" + $scope.data.tingkatKelas);
        var list = $firebaseArray(ref);
        $ionicLoading.show();
        list.$loaded().then(function (response) {
            $scope.totalSoal = response.length;

            if (response.length === 0) {
                $ionicLoading.hide();
                $scope.info = "<h2 style='font-weight:300; padding:10px'>Pemberitahuan</h2><p style='padding:10px'>Belum ada soal yang ditampilkan pada pelajaran ini, silahkan buat soal terlebih dahulu di menu <strong>Bank Soal</strong>. Terima Kasih</p>";
            }
            else {
                $ionicLoading.hide();
                $scope.dataSoal = response;
            }
        });

        $scope.getData = function (data) {

            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Pelajaran : ' + data.pelajaran + ", " + data.jenjang + ", " + $scope.data.tingkatKelas,
                buttons: [
                    { text: '<i class="icon ion-checkmark-circled"></i> Pilih Soal' },
                    { text: '<i class="icon ion-checkmark-circled"></i> Lihat Soal' },
                ],
                //destructiveText: '<i class="icon ion-trash-b"></i> Hapus Soal',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {

                        var cekSoal = firebase.database(appUTSUASOnline).ref("soalUTSUAS").orderByChild("filter").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + data.$id);
                        var listCekSoal = $firebaseArray(cekSoal);

                        listCekSoal.$loaded().then(function (response) {
                            if (response.length === 0) {

                                var filterJumlahSoal = firebase.database(appUTSUASOnline).ref("soalUTSUAS").orderByChild("filterJumlahSoal").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
                                var listFilterJumlahSoal = $firebaseArray(filterJumlahSoal);

                                listFilterJumlahSoal.$loaded().then(function (callBack) {
                                    $scope.jumlahSoalSekarang = callBack.length + 1;
                                    //console.log($scope.jumlahSoalSekarang);
                                    if ($scope.jumlahSoalSekarang <= $scope.totalSoalUjian) {
                                        var addSoal = firebase.database(appUTSUASOnline).ref("soalUTSUAS");
                                        addSoal.push({
                                            "idUTSUAS": $stateParams.idUTSUAS,
                                            "namaUTSUAS": $stateParams.namaUTSUAS,
                                            "jenjang": $stateParams.jenjang,
                                            "tingkatKelas": $stateParams.tingkatKelas,
                                            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                                            "idPelajaran": $stateParams.idPelajaran,
                                            "pelajaran": $stateParams.pelajaran,
                                            "filter": $stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS + "_" + data.$id,
                                            "filterJumlahSoal": $stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS,
                                            "idSoal": data.$id,
                                            // "soal" : data
                                        }).then(function (resp) {
                                            var cekSoal = firebase.database(appUTSUASOnline).ref("soalUTSUAS").orderByChild("filterJumlahSoal").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
                                            var listCekSoal = $firebaseArray(cekSoal);

                                            listCekSoal.$loaded().then(function (response) {
                                                $scope.totalSoal = response.length;
                                                if (response.length !== 0) {
                                                    $scope.aktif = true;
                                                }
                                            });

                                            $ionicPopup.alert({
                                                title: 'SUKSES',
                                                template: 'Soal Sudah Ditambahkan',
                                            });
                                        });
                                    }
                                    else {
                                        $ionicPopup.alert({
                                            title: 'PERHATIAN',
                                            template: 'Jumlah Soal Untuk Ujian Sudah Mencukupi, Terima kasih',
                                        });
                                    }
                                });



                            }
                            else {
                                $ionicPopup.alert({
                                    title: 'PERHATIAN',
                                    template: 'Maaf, Soal ini sudah dimasukkan kedalam ujian, Cek kembali, Terima kasih',
                                });
                            }
                        });

                    }

                    if (index === 1) {

                        $ionicModal.fromTemplateUrl('templates/modal.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            var refSoal = firebase.database(appBankSoal).ref("soal/" + data.$id);
                            $scope.formData = $firebaseObject(refSoal);

                        });

                    }

                    return true;
                },

            });
        };

        $scope.cekSoal = function () {
            $state.go('menuAdmin.soalDetailUTSUASAdmin', {
                "idUTSUAS": $stateParams.idUTSUAS,
                "namaUTSUAS": $stateParams.namaUTSUAS,
                "jenjang": $stateParams.jenjang,
                "tingkatKelas": $stateParams.tingkatKelas,
                "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
                "idPelajaran": $stateParams.idPelajaran,
                "pelajaran": $stateParams.pelajaran
            });
        };

        var cekSoal = firebase.database(appUTSUASOnline).ref("soalUTSUAS").orderByChild("filterJumlahSoal").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
        var listCekSoal = $firebaseArray(cekSoal);

        listCekSoal.$loaded().then(function (response) {
            $scope.totalSoal = response.length;
            if (response.length !== 0) {
                $scope.aktif = true;
            }
        });

    }])

    .controller('soalDetailUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran
        };

        var ref = firebase.database(appUTSUASOnline).ref("soalUTSUAS").orderByChild("filterJumlahSoal").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
        var listRef = $firebaseArray(ref);

        $scope.datas = [];
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            for (i = 0; i < response.length; i++) {
                //console.log(response[i].$id);
                var idSoal = response[i].idSoal;
                var refSoal = firebase.database(appBankSoal).ref("soal/" + idSoal);

                refSoal.on("value", function (snapshot) {
                    $ionicLoading.hide();
                    $scope.dataSoal = snapshot.val();
                    $scope.datas.push({
                        "idSoalUTSUAS": response[i].$id,
                        "idSoal": idSoal,
                        "idPelajaran": $scope.dataSoal.idPelajaran,
                        "jamDisplay": $scope.dataSoal.jamDisplay,
                        "jawabanA": $scope.dataSoal.jawabanA,
                        "jawabanB": $scope.dataSoal.jawabanB,
                        "jawabanC": $scope.dataSoal.jawabanC,
                        "jawabanD": $scope.dataSoal.jawabanD,
                        "jawabanE": $scope.dataSoal.jawabanE,
                        "jenisSoal": $scope.dataSoal.jenisSoal,
                        "jenjang": $scope.dataSoal.jenjang,
                        "tingkatKelas": $scope.dataSoal.tingkatKelas,
                        "kunciJawaban": $scope.dataSoal.kunciJawaban,
                        "pelajaran": $scope.dataSoal.pelajaran,
                        "pembahasanSoal": $scope.dataSoal.pembahasanSoal,
                        "publish": $scope.dataSoal.publish,
                        "soal": $scope.dataSoal.soal,
                        "tanggalDisplay": $scope.dataSoal.tanggalDisplay,
                        "videoPembahasan": $scope.dataSoal.videoPembahasan
                    });
                })
            }

        });

        $scope.getData = function (data) {


            //console.log(data);
            $ionicActionSheet.show({
                titleText: 'Pelajaran : ' + data.pelajaran + ", " + data.jenjang + ", " + $scope.data.tingkatKelas,
                buttons: [

                    { text: '<i class="icon ion-checkmark-circled"></i> Lihat Soal' },
                ],
                destructiveText: '<i class="icon ion-trash-b"></i> Hapus Soal Ujian',
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {

                    if (index === 0) {
                        $ionicModal.fromTemplateUrl('templates/modal.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (modal) {
                            $scope.modal = modal;
                            $scope.modal.show();

                            var refSoal = firebase.database(appBankSoal).ref("soal/" + data.idSoal);
                            $scope.formData = $firebaseObject(refSoal);

                        });
                    }

                    return true;
                },

                destructiveButtonClicked: function () {
                    var refObj = firebase.database(appUTSUASOnline).ref("soalUTSUAS/" + data.idSoalUTSUAS);
                    var objDelete = $firebaseObject(refObj);
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Hapus Data',
                        template: 'Apakah Kamu Yakin Ingin Menghapus Data Soal Ujian Ini?',
                        okType: "button-positive",
                    });
                    confirmPopup.then(function (res) {
                        if (res) {
                            objDelete.$remove().then(function (ref) {

                                var ref = firebase.database(appUTSUASOnline).ref("soalUTSUAS").orderByChild("filterJumlahSoal").equalTo($stateParams.idUTSUAS + "_" + $stateParams.idPelajaranUTSUAS);
                                var listRef = $firebaseArray(ref);

                                $scope.datas = [];
                                //$ionicLoading.show();
                                listRef.$loaded().then(function (response) {
                                    for (i = 0; i < response.length; i++) {
                                        //console.log(response[i].$id);
                                        var idSoal = response[i].idSoal;
                                        var refSoal = firebase.database(appBankSoal).ref("soal/" + idSoal);

                                        refSoal.on("value", function (snapshot) {
                                            //$ionicLoading.hide();
                                            $scope.dataSoal = snapshot.val();
                                            $scope.datas.push({
                                                "idSoalUTSUAS": response[i].$id,
                                                "idSoal": idSoal,
                                                "idPelajaran": $scope.dataSoal.idPelajaran,
                                                "jamDisplay": $scope.dataSoal.jamDisplay,
                                                "jawabanA": $scope.dataSoal.jawabanA,
                                                "jawabanB": $scope.dataSoal.jawabanB,
                                                "jawabanC": $scope.dataSoal.jawabanC,
                                                "jawabanD": $scope.dataSoal.jawabanD,
                                                "jawabanE": $scope.dataSoal.jawabanE,
                                                "jenisSoal": $scope.dataSoal.jenisSoal,
                                                "jenjang": $scope.dataSoal.jenjang,
                                                "tingkatKelas": $scope.dataSoal.tingkatKelas,
                                                "kunciJawaban": $scope.dataSoal.kunciJawaban,
                                                "pelajaran": $scope.dataSoal.pelajaran,
                                                "pembahasanSoal": $scope.dataSoal.pembahasanSoal,
                                                "publish": $scope.dataSoal.publish,
                                                "soal": $scope.dataSoal.soal,
                                                "tanggalDisplay": $scope.dataSoal.tanggalDisplay,
                                                "videoPembahasan": $scope.dataSoal.videoPembahasan
                                            });
                                        })
                                    }

                                });

                            });
                        }
                        else {
                            //console.log('Tidak Jadi Menghapus');
                        }
                    });
                    return true;
                }

            });


        };

    }])

    .controller('ulangUjianUTSUASAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.data = {
            "idUTSUAS": $stateParams.idUTSUAS,
            "namaUTSUAS": $stateParams.namaUTSUAS,
            "jenjang": $stateParams.jenjang,
            "tingkatKelas": $stateParams.tingkatKelas,
            "idPelajaranUTSUAS": $stateParams.idPelajaranUTSUAS,
            "idPelajaran": $stateParams.idPelajaran,
            "pelajaran": $stateParams.pelajaran
        };

        var refPesertaUTSUAS = firebase.database(appUTSUASOnline).ref("pesertaUTSUAS").orderByChild("idUTSUAS").equalTo($scope.data.idUTSUAS);
        var listPesertaUTSUAS = $firebaseArray(refPesertaUTSUAS);

        listPesertaUTSUAS.$loaded().then(function (response) {
            $scope.dataPesertaUTSUAS = response;
        });

        $scope.getDataHapus = function (data) {

            if (data.idKecamatan === "5315") { var app = app5315; }
            else if (data.idKecamatan === "5316") { var app = app5316; }
            else if (data.idKecamatan === "5317") { var app = app5317; }
            else if (data.idKecamatan === "5318") { var app = app5318; }
            else if (data.idKecamatan === "5319") { var app = app5319; }
            else if (data.idKecamatan === "5320") { var app = app5320; }
            else if (data.idKecamatan === "5321") { var app = app5321; }
            else if (data.idKecamatan === "5322") { var app = app5322; }
            else if (data.idKecamatan === "5323") { var app = app5323; }
            else if (data.idKecamatan === "5324") { var app = app5324; }

            var confirmPopup = $ionicPopup.confirm({
                title: 'Ulang Ujian',
                template: 'Apakah Kamu Yakin Ingin Mengulang Ujian Untuk Peserta Ini?',
                okType: "button-positive",
            });
            confirmPopup.then(function (res) {
                if (res) {

                    //Menghapus Jawaban UTSUAS Siswa
                    var jawabanUTSUASSiswa = firebase.database(app).ref("jawabanUTSUASSiswa").orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS + "_" + data.uid);
                    var refJawabanUTSUASSiswa = $firebaseArray(jawabanUTSUASSiswa);

                    refJawabanUTSUASSiswa.$loaded().then(function (response) {
                        for (i = 0; i < response.length; i++) {
                            var id = response[i].$id;

                            var hapusJawabanUTSUASSiswa = firebase.database(app).ref("jawabanUTSUASSiswa/" + id);
                            var objDelete = $firebaseObject(hapusJawabanUTSUASSiswa);
                            objDelete.$remove().then(function (ref) {
                                console.log('Jawaban UTSUAS Siswa Berhasil Dihapus');
                            });
                        }
                    });

                    //Menghapus Jawaban UTSUAS Siswa PerPelajaran
                    var jawabanUTSUASSiswaPerPelajaran = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran").orderByChild("filter").equalTo($scope.data.idUTSUAS + "_" + $scope.data.idPelajaranUTSUAS + "_" + data.uid);
                    var refJawabanUTSUASSiswaPerPelajaran = $firebaseArray(jawabanUTSUASSiswaPerPelajaran);

                    refJawabanUTSUASSiswaPerPelajaran.$loaded().then(function (response) {
                        for (i = 0; i < response.length; i++) {
                            var id = response[i].$id;

                            var updateJawabanUTSUASSiswaPerPelajaran = firebase.database(app).ref("jawabanUTSUASSiswaPerPelajaran/" + id);

                            updateJawabanUTSUASSiswaPerPelajaran.update(JSON.parse(JSON.stringify({
                                "benar": 0,
                                "salah": 0,
                                "kosong": 0,
                                "nilai": 0,
                                "statusFinish": false,
                                "bukaUjianSekarang": false,
                                "tutupUjianSekarang": false,
                                "jumlahSoal": 0,
                                "statusTerjawab": false,
                            }))).then(function (resp) {
                                console.log("jawabanUTSUASSiswaPerPelajaran-Terhapus");
                                $ionicPopup.alert({
                                    title: 'SUKSES',
                                    template: "Ulang Ujian Siswa Sukses",
                                    okType: "button-positive"
                                });
                            });
                        }

                    });

                }
                else {
                }
            });

        };
    }])