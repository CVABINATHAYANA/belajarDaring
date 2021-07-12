angular.module('app.pengaturanGuru', [])

    .controller('tahunAjaranGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        var ref = firebase.database().ref("tahunAjaran");
        var listRef = $firebaseArray(ref);

        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.tahunAjaran = response;
        })

        $scope.tambahTahunAjaran = function () {
            $scope.formData = {
                "tahunAjaran": "",
                "keterangan": "",
                "aktif": false
            }
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.simpan = function () {
                    console.log($scope.formData);
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                    if ($scope.formData.tahunAjaran !== "") {
                        //Cek Data
                        var cek = firebase.database().ref("tahunAjaran").orderByChild("tahunAjaran").equalTo($scope.formData.tahunAjaran);
                        var listCek = $firebaseArray(cek);

                        listCek.$loaded().then(function (response) {
                            $ionicLoading.show();
                            if (response.length === 0) {
                                var ref = firebase.database().ref("tahunAjaran");
                                ref.push({
                                    "tahunAjaran": $scope.formData.tahunAjaran,
                                    "keterangan": $scope.formData.keterangan,
                                    "aktif": $scope.formData.aktif,
                                    "createAt": createAt,
                                    "diBuatOleh": $scope.namaGuru,
                                    "idPembuat": $scope.idGuru
                                }).then(function (resp) {
                                    $ionicLoading.hide();
                                    $scope.modal.hide();
                                })
                            }
                            else if (response.length === 1) {
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: 'Perhatian',
                                    template: 'Maaf, Data Tahun Ajaran Yang Anda Isi Sudah Tersedia, Silahkan Cek Kembali',
                                });
                            }
                        })
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Data Tahun Ajaran Harus Diisi, terima kasih',

                        });
                    }
                };

            });

        };

        $scope.editData = function (data) {
            var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
            var ref = firebase.database().ref("tahunAjaran/" + data.$id);
            var refObj = $firebaseObject(ref);
            $ionicLoading.show();
            refObj.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.formData = response;
            });

            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.simpan = function () {
                    if ($scope.formData.tahunAjaran !== "") {
                        $ionicLoading.show();
                        ref.update({
                            "tahunAjaran": $scope.formData.tahunAjaran,
                            "keterangan": $scope.formData.keterangan,
                            "aktif": $scope.formData.aktif,
                            "updateAt": createAt,
                            "diEditOleh": $scope.namaGuru,
                            "idPengedit": $scope.idGuru
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide();
                        })
                    }
                    else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Data Tahun Ajaran Harus Diisi, terima kasih',

                        });
                    }
                };

            });
        };

        $scope.hapusData = function (data) {
            var refObj = firebase.database().ref("tahunAjaran/" + data.$id);
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
        };

    }])

    .controller('semesterGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        var ref = firebase.database().ref("semester");
        var listRef = $firebaseArray(ref);

        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.semester = response;
        })

        $scope.tambahSemester = function () {
            $scope.formData = {
                "semester": "",
                "keterangan": "",
                "aktif": false
            }
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.simpan = function () {
                    console.log($scope.formData);
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                    if ($scope.formData.semester !== "") {
                        //Cek Data
                        var cek = firebase.database().ref("semester").orderByChild("semester").equalTo($scope.formData.semester);
                        var listCek = $firebaseArray(cek);

                        listCek.$loaded().then(function (response) {
                            $ionicLoading.show();
                            if (response.length === 0) {
                                var ref = firebase.database().ref("semester");
                                ref.push({
                                    "semester": $scope.formData.semester,
                                    "keterangan": $scope.formData.keterangan,
                                    "aktif": $scope.formData.aktif,
                                    "createAt": createAt,
                                    "diBuatOleh": $scope.namaGuru,
                                    "idPembuat": $scope.idGuru
                                }).then(function (resp) {
                                    $ionicLoading.hide();
                                    $scope.modal.hide();
                                })
                            }
                            else if (response.length === 1) {
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: 'Perhatian',
                                    template: 'Maaf, Data Semester Yang Anda Isi Sudah Tersedia, Silahkan Cek Kembali',
                                });
                            }
                        })
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Data Semester Harus Diisi, terima kasih',

                        });
                    }
                };

            });

        };

        $scope.editData = function (data) {
            var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
            var ref = firebase.database().ref("semester/" + data.$id);
            var refObj = $firebaseObject(ref);
            $ionicLoading.show();
            refObj.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.formData = response;
            });

            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.simpan = function () {
                    if ($scope.formData.semester !== "") {
                        $ionicLoading.show();
                        ref.update({
                            "semester": $scope.formData.semester,
                            "keterangan": $scope.formData.keterangan,
                            "aktif": $scope.formData.aktif,
                            "updateAt": createAt,
                            "diEditOleh": $scope.namaGuru,
                            "idPengedit": $scope.idGuru
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide();
                        })
                    }
                    else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Data Semester Harus Diisi, terima kasih',

                        });
                    }
                };

            });
        };

        $scope.hapusData = function (data) {
            var refObj = firebase.database().ref("semester/" + data.$id);
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
        };

    }])

    .controller('mataPelajaranGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        var ref = firebase.database().ref("mataPelajaran");
        var listRef = $firebaseArray(ref);

        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.mataPelajaran = response;
        })

        $scope.tambahMataPelajaran = function () {
            $scope.formData = {
                "pelajaran": "",
                "alias": "",
                "keterangan": "",
                "aktif": false
            }
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.simpan = function () {
                    console.log($scope.formData);
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                    if ($scope.formData.pelajaran !== "" && $scope.formData.alias!=="") {
                        //Cek Data
                        var cek = firebase.database().ref("mataPelajaran").orderByChild("mataPelajaran").equalTo($scope.formData.pelajaran);
                        var listCek = $firebaseArray(cek);

                        listCek.$loaded().then(function (response) {
                            $ionicLoading.show();
                            if (response.length === 0) {
                                var ref = firebase.database().ref("mataPelajaran");
                                ref.push({
                                    "pelajaran": $scope.formData.pelajaran,
                                    "alias": $scope.formData.alias,
                                    "keterangan": $scope.formData.keterangan,
                                    "aktif": $scope.formData.aktif,
                                    "createAt": createAt,
                                    "diBuatOleh": $scope.namaGuru,
                                    "idPembuat": $scope.idGuru
                                }).then(function (resp) {
                                    $ionicLoading.hide();
                                    $scope.modal.hide();
                                })
                            }
                            else if (response.length === 1) {
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: 'Perhatian',
                                    template: 'Maaf, Data Mata Pelajaran Yang Anda Isi Sudah Tersedia, Silahkan Cek Kembali',
                                });
                            }
                        })
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Data Mata Pelajaran Harus Diisi, terima kasih',

                        });
                    }
                };

            });

        };

        $scope.editData = function (data) {
            var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
            var ref = firebase.database().ref("mataPelajaran/" + data.$id);
            var refObj = $firebaseObject(ref);
            $ionicLoading.show();
            refObj.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.formData = response;
            });

            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.simpan = function () {
                    if ($scope.formData.pelajaran !== "" && $scope.formData.alias!=="") {
                        $ionicLoading.show();
                        ref.update({
                            "pelajaran": $scope.formData.pelajaran,
                            "alias": $scope.formData.alias,
                            "keterangan": $scope.formData.keterangan,
                            "aktif": $scope.formData.aktif,
                            "updateAt": createAt,
                            "diEditOleh": $scope.namaGuru,
                            "idPengedit": $scope.idGuru
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide();
                        })
                    }
                    else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Data Mata Pelajaran Harus Diisi, terima kasih',

                        });
                    }
                };

            });
        };

        $scope.hapusData = function (data) {
            var refObj = firebase.database().ref("mataPelajaran/" + data.$id);
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
        };

    }])

    .controller('jenisPrasaranaGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        var ref = firebase.database().ref("jenisPrasarana");
        var listRef = $firebaseArray(ref);

        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.jenisPrasarana = response;
        })

        $scope.tambahJenisPrasarana = function () {
            $scope.formData = {
                "jenisPrasarana": "",
                "keterangan": "",
            }
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.simpan = function () {
                    console.log($scope.formData);
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                    if ($scope.formData.jenisPrasarana !== "") {
                        //Cek Data
                        var cek = firebase.database().ref("jenisPrasarana").orderByChild("jenisPrasarana").equalTo($scope.formData.jenisPrasarana);
                        var listCek = $firebaseArray(cek);

                        listCek.$loaded().then(function (response) {
                            $ionicLoading.show();
                            if (response.length === 0) {
                                var ref = firebase.database().ref("jenisPrasarana");
                                ref.push({
                                    "jenisPrasarana": $scope.formData.jenisPrasarana,
                                    "keterangan": $scope.formData.keterangan,
                                    "createAt": createAt,
                                    "diBuatOleh": $scope.namaGuru,
                                    "idPembuat": $scope.idGuru
                                }).then(function (resp) {
                                    $ionicLoading.hide();
                                    $scope.modal.hide();
                                })
                            }
                            else if (response.length === 1) {
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: 'Perhatian',
                                    template: 'Maaf, Data Jenis Prasarana Yang Anda Isi Sudah Tersedia, Silahkan Cek Kembali',
                                });
                            }
                        })
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Data Jenis Prasarana Harus Diisi, terima kasih',

                        });
                    }
                };

            });

        };

        $scope.editData = function (data) {
            var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
            var ref = firebase.database().ref("jenisPrasarana/" + data.$id);
            var refObj = $firebaseObject(ref);
            $ionicLoading.show();
            refObj.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.formData = response;
            });

            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.simpan = function () {
                    if ($scope.formData.jenisPrasarana !== "") {
                        $ionicLoading.show();
                        ref.update({
                            "jenisPrasarana": $scope.formData.jenisPrasarana,
                            "keterangan": $scope.formData.keterangan,
                            "updateAt": createAt,
                            "diEditOleh": $scope.namaGuru,
                            "idPengedit": $scope.idGuru
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide();
                        })
                    }
                    else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Data Jenis Prasarana Harus Diisi, terima kasih',

                        });
                    }
                };

            });
        };

        $scope.hapusData = function (data) {
            var refObj = firebase.database().ref("jenisPrasarana/" + data.$id);
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
        };

    }])

    .controller('jenisSaranaGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

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

        var ref = firebase.database().ref("jenisSarana");
        var listRef = $firebaseArray(ref);

        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.jenisSarana = response;
        })

        $scope.tambahJenisSarana = function () {
            $scope.formData = {
                "jenisSarana": "",
                "keterangan": "",
            }
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.simpan = function () {
                    console.log($scope.formData);
                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                    if ($scope.formData.jenisSarana !== "") {
                        //Cek Data
                        var cek = firebase.database().ref("jenisSarana").orderByChild("jenisSarana").equalTo($scope.formData.jenisSarana);
                        var listCek = $firebaseArray(cek);

                        listCek.$loaded().then(function (response) {
                            $ionicLoading.show();
                            if (response.length === 0) {
                                var ref = firebase.database().ref("jenisSarana");
                                ref.push({
                                    "jenisSarana": $scope.formData.jenisSarana,
                                    "keterangan": $scope.formData.keterangan,
                                    "createAt": createAt,
                                    "diBuatOleh": $scope.namaGuru,
                                    "idPembuat": $scope.idGuru
                                }).then(function (resp) {
                                    $ionicLoading.hide();
                                    $scope.modal.hide();
                                })
                            }
                            else if (response.length === 1) {
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: 'Perhatian',
                                    template: 'Maaf, Data Jenis Sarana Yang Anda Isi Sudah Tersedia, Silahkan Cek Kembali',
                                });
                            }
                        })
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Data Jenis Sarana Harus Diisi, terima kasih',

                        });
                    }
                };

            });

        };

        $scope.editData = function (data) {
            var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
            var ref = firebase.database().ref("jenisSarana/" + data.$id);
            var refObj = $firebaseObject(ref);
            $ionicLoading.show();
            refObj.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.formData = response;
            });

            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.simpan = function () {
                    if ($scope.formData.jenisSarana !== "") {
                        $ionicLoading.show();
                        ref.update({
                            "jenisSarana": $scope.formData.jenisSarana,
                            "keterangan": $scope.formData.keterangan,
                            "updateAt": createAt,
                            "diEditOleh": $scope.namaGuru,
                            "idPengedit": $scope.idGuru
                        }).then(function (resp) {
                            $ionicLoading.hide();
                            $scope.modal.hide();
                        })
                    }
                    else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Maaf, Data Jenis Sarana Harus Diisi, terima kasih',

                        });
                    }
                };

            });
        };

        $scope.hapusData = function (data) {
            var refObj = firebase.database().ref("jenisSarana/" + data.$id);
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
        };

    }])

    .controller('dataGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

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

        var ref = firebase.database().ref("GuruDinasPendidikan");
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataGuru = response;
        })

        $scope.tambahData = function () {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.formData = {
                    "namaGuru": '',
                    "hakAkses": '',
                    "email": '',
                    "ijinkanAkses": true,
                    "password": '12345678'
                }

                $scope.simpan = function () {
                    if ($scope.formData.namaGuru !== "" && $scope.formData.hakAkses !== "" && $scope.formData.email !== "") {
                        var auth = $firebaseAuth();
                        $ionicLoading.show();
                        auth.$createUserWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                            .then(function (response) {

                                var user = firebase.auth().currentUser;

                                //Entry Data Pengguna
                                var refAddPengguna = firebase.database().ref("GuruDinasPendidikan");
                                refAddPengguna.push({
                                    "namaGuru": $scope.formData.namaGuru,
                                    "hakAkses": $scope.formData.hakAkses,
                                    "email": $scope.formData.email,
                                    "ijinkanAkses": $scope.formData.ijinkanAkses,
                                    "uid": user.uid
                                })
                                    .then(function (resp) {
                                        $ionicLoading.hide();
                                        $scope.modal.hide();
                                    });

                            })
                            .catch(function (error) {
                                $ionicLoading.hide();
                                //console.log(error);
                                $ionicPopup.alert({
                                    title: 'Pemberitahuan',
                                    template: error.message,
                                });
                            });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: "Semua Data Harus Diisi, Terimakasih",
                            okType: "button-positive"
                        });
                    }
                }

            });
        }

    }])

