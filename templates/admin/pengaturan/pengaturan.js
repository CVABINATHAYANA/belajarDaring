angular.module('app.pengaturanAdmin', [])

    .controller('tahunAjaranAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
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
                                    "diBuatOleh": $scope.namaAdmin,
                                    "idPembuat": $scope.idAdmin
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
                            "diEditOleh": $scope.namaAdmin,
                            "idPengedit": $scope.idAdmin
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

    .controller('semesterAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
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
                                    "diBuatOleh": $scope.namaAdmin,
                                    "idPembuat": $scope.idAdmin
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
                            "diEditOleh": $scope.namaAdmin,
                            "idPengedit": $scope.idAdmin
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

    .controller('mataPelajaranAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
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
                "link": "",
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
                    if ($scope.formData.pelajaran !== "" && $scope.formData.alias !== "") {
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
                                    "link": $scope.formData.link,
                                    "aktif": $scope.formData.aktif,
                                    "createAt": createAt,
                                    "diBuatOleh": $scope.namaAdmin,
                                    "idPembuat": $scope.idAdmin
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
                    if ($scope.formData.pelajaran !== "" && $scope.formData.alias !== "") {
                        $ionicLoading.show();
                        ref.update({
                            "pelajaran": $scope.formData.pelajaran,
                            "alias": $scope.formData.alias,
                            "keterangan": $scope.formData.keterangan,
                            "link": $scope.formData.link,
                            "aktif": $scope.formData.aktif,
                            "updateAt": createAt,
                            "diEditOleh": $scope.namaAdmin,
                            "idPengedit": $scope.idAdmin
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

    .controller('jenisPrasaranaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
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
                                    "diBuatOleh": $scope.namaAdmin,
                                    "idPembuat": $scope.idAdmin
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
                            "diEditOleh": $scope.namaAdmin,
                            "idPengedit": $scope.idAdmin
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

    .controller('jenisSaranaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');

        if (!$scope.idAdmin) {
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
                                    "diBuatOleh": $scope.namaAdmin,
                                    "idPembuat": $scope.idAdmin
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
                            "diEditOleh": $scope.namaAdmin,
                            "idPengedit": $scope.idAdmin
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

    .controller('dataAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        $scope.idProvinsiAdmin = localStorage.getItem('idProvinsi');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi");
        var listProvinsi = $firebaseArray(refProvinsi);

        listProvinsi.$loaded().then(function (response) {
            $scope.dataProvinsi = response;
            // console.log($scope.dataProvinsi);
        });

        $scope.getIdProvinsi = function () {
            var idProvinsi = $scope.formData.idProvinsi;
            // console.log(idProvinsi)

            //Get Nama Provinsi
            var namaProvinsi = firebase.database().ref("provinsi").orderByChild("id_provinsi").equalTo(idProvinsi);
            var listNamaProvinsi = $firebaseArray(namaProvinsi);
            listNamaProvinsi.$loaded().then(function (response) {
                $scope.namaProvinsi = response[0].nama_provinsi;
                //console.log($scope.namaProvinsi);
            });

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo(idProvinsi);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
            // console.log($scope.dataKotaKabupaten);

        };

        var ref = firebase.database().ref("adminDinasPendidikan").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupaten);
        var listRef = $firebaseArray(ref);
        $ionicLoading.show();
        listRef.$loaded().then(function (response) {
            $ionicLoading.hide();
            $scope.dataAdmin = response;
            // console.log(response)
        })

        $scope.tambahData = function () {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.formData = {
                    "namaAdmin": '',
                    "hakAkses": '',
                    "email": '',
                    "ijinkanAkses": true,
                    "password": '12345678',
                    "idProvinsi": "",
                    "idKotaKabupaten": "",
                }

                $scope.simpan = function () {
                    if ($scope.formData.namaAdmin !== "" && $scope.formData.hakAkses !== "" && $scope.formData.email !== "") {
                        var auth = $firebaseAuth();
                        $ionicLoading.show();
                        auth.$createUserWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                            .then(function (response) {

                                var user = firebase.auth().currentUser;

                                //Entry Data Pengguna
                                var refAddPengguna = firebase.database().ref("adminDinasPendidikan");
                                refAddPengguna.push({
                                    "namaAdmin": $scope.formData.namaAdmin,
                                    "hakAkses": $scope.formData.hakAkses,
                                    "email": $scope.formData.email,
                                    "ijinkanAkses": $scope.formData.ijinkanAkses,
                                    "uid": user.uid,
                                    "idProvinsi": $scope.formData.idProvinsi,
                                    "idKotaKabupaten": $scope.formData.idKotaKabupaten
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

        $scope.getData = function (data) {
            $ionicActionSheet.show({
                titleText: 'Admin : ' + data.namaAdmin,
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
                        if ($scope.hakAkses === "Super Admin") {
                            $ionicModal.fromTemplateUrl('templates/modal.html', {
                                scope: $scope,
                                animation: 'slide-in-up'
                            }).then(function (modal) {
                                $scope.modal = modal;
                                $scope.modal.show();

                                var obj = firebase.database().ref("adminDinasPendidikan/" + data.$id);
                                var dataObj = $firebaseObject(obj);
                                dataObj.$loaded().then(function (response) {
                                    $scope.formData = response;
                                    var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo($scope.formData.idProvinsi);
                                    $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
                                })

                                $scope.simpan = function () {
                                    if ($scope.formData.namaAdmin !== "" && $scope.formData.hakAkses !== "" && $scope.formData.email !== "") {
                                        var auth = $firebaseAuth();
                                        $ionicLoading.show();

                                        obj.update({
                                            "namaAdmin": $scope.formData.namaAdmin,
                                            "hakAkses": $scope.formData.hakAkses,
                                            "email": $scope.formData.email,
                                            "ijinkanAkses": $scope.formData.ijinkanAkses,
                                            "idProvinsi": $scope.formData.idProvinsi,
                                            "idKotaKabupaten": $scope.formData.idKotaKabupaten
                                        }).then(function (resp) {
                                            $ionicLoading.hide();
                                            $scope.modal.hide();
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
                        else {
                            $ionicPopup.alert({
                                title: 'Perhatian',
                                template: "Anda Tidak Diperkenankan Mengedit Data Ini, Terimakasih",
                                okType: "button-positive"
                            });
                        }
                    }

                    return true;
                },

                destructiveButtonClicked: function () {

                    if ($scope.hakAkses === "Super Admin") {

                        var refObj = firebase.database().ref("adminDinasPendidikan/" + data.$id);
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
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: "Data tidak diperkenankan menghapus data ini, Terimakasih",
                            okType: "button-positive"
                        });
                    }


                    return true;
                }

            });


        }
    }])

    .controller('dataAdminSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        $scope.idProvinsiAdmin = localStorage.getItem('idProvinsi');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        $scope.totalAdminSekolah = [];
        var dataAdminSekolah = firebase.database().ref("adminSekolah").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupaten);
        var listDataAdminSekolah = $firebaseArray(dataAdminSekolah);
        listDataAdminSekolah.$loaded().then(function (response) {
            for (i = 0; i < response.length; i++) {
                $scope.totalAdminSekolah.push({
                    "idAdminSekolah": response[i].$id,
                })
            }
            $scope.banyakData = $scope.totalAdminSekolah.length;
        })

        $scope.count = 0;
        $scope.loadMore = function () {
            var ref = firebase.database().ref("adminSekolah").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupaten).limitToLast($scope.count += 100);
            var listRef = $firebaseArray(ref);
            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataAdmin = response;
                // console.log(response)
                console.log("inilahDatanya", $scope.count)
    
                if ($scope.dataAdmin.length === $scope.banyakData) {
                    $scope.noMoreItemsAvailable = true;
                    console.log("totalDataTerakhir", $scope.banyakData);
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        }
        

        //Data Provinsi
        var refProvinsi = firebase.database().ref("provinsi");
        var listProvinsi = $firebaseArray(refProvinsi);

        listProvinsi.$loaded().then(function (response) {
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

            var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo(idProvinsi);
            $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);
        };

        $scope.getIdKotaKabupaten = function () {
            var idKotaKabupaten = $scope.formData.idKotaKabupaten;

            //Get Nama Kota Kabupaten
            var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
            listNamaKotaKabupaten.$loaded().then(function (response) {
                $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
                console.log($scope.namaKotaKabupaten);
            });

            var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
            $scope.dataKecamatan = $firebaseArray(refKecamatan);
            //console.log($scope.dataKecamatan);
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

            var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
            refDataSekolah.on("value", function (snapshot) {
                $scope.namaSekolah = snapshot.val().nama_sekolah;
            })
        };

        $scope.tambahData = function () {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();

                $scope.formData = {
                    "idProvinsi": '',
                    "idKotaKabupaten": '',
                    "idKecamatan": '',
                    "jenjang": '',
                    "idSekolah": '',
                    "namaPengguna": '',
                    "noHandphone": '',
                    "jenisKelamin": '',
                    "alamat": '',
                    "email": '',
                    "password": '',
                    "ketikUlangPassword": '',
                    "time": new Date(),
                    "aksesAplikasi": true
                };

                $scope.daftar = function () {
                    console.log($scope.formData)
                    var tanggal = $filter('date')($scope.formData.time, 'yyyy-MM-dd HH:mm:ss Z');
                    var tanggalDisplay = $filter('date')($scope.formData.time, 'dd-MM-yyyy');
                    var jamDisplay = $filter('date')($scope.formData.time, 'HH:mm:ss');

                    if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.namaPengguna !== '' && $scope.formData.noHandphone !== '' && $scope.formData.jenisKelamin !== '' && $scope.formData.alamat !== '' && $scope.formData.email !== '' && $scope.formData.password !== '' && $scope.formData.ketikUlangPassword !== '') {

                        if ($scope.formData.password === $scope.formData.ketikUlangPassword) {
                            $ionicLoading.show();

                            var auth = $firebaseAuth();
                            auth.$createUserWithEmailAndPassword($scope.formData.email, $scope.formData.password)
                                .then(function (response) {

                                    var user = firebase.auth().currentUser;

                                    //Entry Data Pengguna
                                    var refAddPengguna = firebase.database().ref("adminSekolah");
                                    refAddPengguna.push({
                                        "idProvinsi": $scope.formData.idProvinsi,
                                        "namaProvinsi": $scope.namaProvinsi,
                                        "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                                        "namaKotaKabupaten": $scope.namaKotaKabupaten,
                                        "idKecamatan": $scope.formData.idKecamatan,
                                        "namaKecamatan": $scope.namaKecamatan,
                                        "jenjang": $scope.formData.jenjang,
                                        "idSekolah": $scope.formData.idSekolah,
                                        "namaSekolah": $scope.namaSekolah,
                                        "alamat": $scope.formData.alamat,
                                        "jenisKelamin": $scope.formData.jenisKelamin,

                                        "namaPengguna": $scope.formData.namaPengguna,
                                        "noHandphone": $scope.formData.noHandphone,
                                        "email": $scope.formData.email,
                                        "password": $scope.formData.password,
                                        "retypePassword": $scope.formData.ketikUlangPassword,
                                        "uid": user.uid,
                                        "tanggal": tanggal,
                                        "tanggalDisplay": tanggalDisplay,
                                        "jamDisplay": jamDisplay,
                                        "filterRegistrasiKota": $scope.formData.jenjang + "_" + $scope.formData.idKotaKabupaten,
                                        "filterRegistrasiProvinsi": $scope.formData.jenjang + "_" + $scope.formData.idProvinsi,
                                        "aksesAplikasi": $scope.formData.aksesAplikasi,
                                        "createAt": tanggal,
                                        "diBuatOleh": $scope.namaAdmin,
                                        "idPembuat": $scope.idAdmin,

                                    }).then(function (resp) {
                                        $ionicLoading.hide();
                                        $scope.modal.hide();
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

            });
        }

        $scope.getData = function (data) {
            $ionicActionSheet.show({
                titleText: 'Admin Sekolah : ' + data.namaPengguna,
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
                        if ($scope.hakAkses === "Super Admin") {
                            $ionicModal.fromTemplateUrl('templates/modal.html', {
                                scope: $scope,
                                animation: 'slide-in-up'
                            }).then(function (modal) {
                                $scope.modal = modal;
                                $scope.modal.show();

                                var obj = firebase.database().ref("adminSekolah/" + data.$id);
                                var dataObj = $firebaseObject(obj);
                                $ionicLoading.show();
                                dataObj.$loaded().then(function (response) {
                                    $scope.formData = response;

                                    var refKotaKabupaten = firebase.database().ref("kota").orderByChild("id_provinsi").equalTo($scope.formData.idProvinsi);
                                    $scope.dataKotaKabupaten = $firebaseArray(refKotaKabupaten);

                                    var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo($scope.formData.idKotaKabupaten);
                                    $scope.dataKecamatan = $firebaseArray(refKecamatan);

                                    var refSekolah = firebase.database().ref("dataSekolahIndonesia").orderByChild("id_kecamatan").equalTo($scope.formData.idKecamatan);
                                    $scope.dataSekolah = $firebaseArray(refSekolah);
                                    $ionicLoading.hide();
                                })

                                $scope.getIdKotaKabupaten = function () {
                                    var idKotaKabupaten = $scope.formData.idKotaKabupaten;

                                    //Get Nama Kota Kabupaten
                                    var namaKotaKabupaten = firebase.database().ref("kota").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
                                    var listNamaKotaKabupaten = $firebaseArray(namaKotaKabupaten);
                                    listNamaKotaKabupaten.$loaded().then(function (response) {
                                        $scope.namaKotaKabupaten = response[0].nama_kota_kabupaten;
                                        //console.log($scope.namaKotaKabupaten);
                                    });

                                    var refKecamatan = firebase.database().ref("kecamatan").orderByChild("id_kota_kabupaten").equalTo(idKotaKabupaten);
                                    $scope.dataKecamatan = $firebaseArray(refKecamatan);
                                    //console.log($scope.dataKecamatan);
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

                                    var refDataSekolah = firebase.database().ref("dataSekolahIndonesia/" + idSekolah);
                                    refDataSekolah.on("value", function (snapshot) {
                                        $scope.namaSekolah = snapshot.val().nama_sekolah;
                                    })
                                };

                                $scope.daftar = function () {
                                    console.log($scope.formData);
                                    var createAt = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
                                    if ($scope.formData.idProvinsi !== '' && $scope.formData.idKotaKabupaten !== '' && $scope.formData.idKecamatan !== '' && $scope.formData.jenjang !== '' && $scope.formData.idSekolah !== '' && $scope.formData.namaPengguna !== '' && $scope.formData.noHandphone !== '' && $scope.formData.jenisKelamin !== '' && $scope.formData.alamat !== '') {
                                        $ionicLoading.show();

                                        //Entry Data Pengguna
                                        var updatePengguna = firebase.database().ref("adminSekolah/" + data.$id);
                                        updatePengguna.update(JSON.parse(JSON.stringify({
                                            "idProvinsi": $scope.formData.idProvinsi,
                                            "namaProvinsi": $scope.namaProvinsi,
                                            "idKotaKabupaten": $scope.formData.idKotaKabupaten,
                                            "namaKotaKabupaten": $scope.namaKotaKabupaten,
                                            "idKecamatan": $scope.formData.idKecamatan,
                                            "namaKecamatan": $scope.namaKecamatan,
                                            "jenjang": $scope.formData.jenjang,
                                            "idSekolah": $scope.formData.idSekolah,
                                            "namaSekolah": $scope.namaSekolah,
                                            "alamat": $scope.formData.alamat,
                                            "jenisKelamin": $scope.formData.jenisKelamin,

                                            "namaPengguna": $scope.formData.namaPengguna,
                                            "noHandphone": $scope.formData.noHandphone,
                                            "aksesAplikasi": $scope.formData.aksesAplikasi,
                                            "updateAt": createAt,
                                            "diEditOleh": $scope.namaAdmin,
                                            "idPengedit": $scope.idAdmin,
                                        }))).then(function (resp) {
                                            $ionicLoading.hide();
                                            $scope.modal.hide();
                                        });

                                    }
                                    else {
                                        $ionicPopup.alert({
                                            title: 'Perhatian',
                                            template: 'Seluruh Data Harus Diisi, Terima Kasih',
                                            okType: 'button-positive'
                                        });
                                    }
                                }

                            });
                        }
                        else {
                            $ionicPopup.alert({
                                title: 'Perhatian',
                                template: "Anda Tidak Diperkenankan Mengedit Data Ini, Terimakasih",
                                okType: "button-positive"
                            });
                        }
                    }

                    return true;
                },

                destructiveButtonClicked: function () {

                    if ($scope.hakAkses === "Super Admin") {

                        var refObj = firebase.database().ref("adminSekolah/" + data.$id);
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
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: "Data tidak diperkenankan menghapus data ini, Terimakasih",
                            okType: "button-positive"
                        });
                    }


                    return true;
                }

            });


        }
    }])

    .controller('dataGuruAllAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        $scope.idAdmin = localStorage.getItem('idAdmin');
        $scope.namaAdmin = localStorage.getItem('namaAdmin');
        $scope.emailAdmin = localStorage.getItem('emailAdmin');
        $scope.hakAkses = localStorage.getItem('hakAkses');
        $scope.uidAdmin = localStorage.getItem('uidAdmin');
        $scope.idKotaKabupaten = localStorage.getItem('idKotaKabupaten');
        $scope.idProvinsiAdmin = localStorage.getItem('idProvinsi');

        if (!$scope.idAdmin) {
            $state.go('welcome');
        }

        // var dataGuruSeluruh = firebase.database(appGuru).ref("dataGuru").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupaten);
        // var listDataGuruSeluruh = $firebaseArray(dataGuruSeluruh);
        // $ionicLoading.show();
        // listDataGuruSeluruh.$loaded().then(function(response){
        //     for(i=0; i<response.length; i++){
        //         if(response[i].pernahDiVerifikasi===true){
        //             var updateDataAdminSekolah = firebase.database(appGuru).ref("dataGuru/"+response[i].$id).update(JSON.parse(JSON.stringify({
        //                 "ijinPenggunaanAplikasi": true
        //             }))).then(function(resp){
        //                 console.log('Berhasil');
        //             })

        //         }
        //         // if(response[i].idSekolah==="" || response[i].idSekolah===undefined){
        //         //     var updateDataAdminSekolah = firebase.database(appGuru).ref("dataGuru/"+response[i].$id).update(JSON.parse(JSON.stringify({
        //         //         "ijinPenggunaanAplikasi": false
        //         //     }))).then(function(resp){
        //         //         console.log('Berhasil');
        //         //     })
        //         // }

        //     }
        //     $scope.banyakData = response.length;
        // })

        $scope.totalGuru = [];
        var dataGuru = firebase.database(appGuru).ref("dataGuru").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupaten);
        var listDataGuru = $firebaseArray(dataGuru);
        listDataGuru.$loaded().then(function (response) {
            $scope.banyakData = response.length;
            for (i = 0; i < response.length; i++) {
                $scope.totalGuru.push({
                    "idGuru": response[i].$id
                })
            }
            $scope.banyakData = $scope.totalGuru.length;
        })


        $scope.count = 0
        $scope.loadMore = function () {
            var ref = firebase.database(appGuru).ref("dataGuru").orderByChild("idKotaKabupaten").equalTo($scope.idKotaKabupaten).limitToLast($scope.count += 250);
            listRef = $firebaseArray(ref);
            $ionicLoading.show();
            listRef.$loaded().then(function (response) {
                $ionicLoading.hide();
                $scope.dataGuru = response;
                console.log("inilahDatanya", $scope.count)

                if ($scope.dataGuru.length === $scope.banyakData) {
                    $scope.noMoreItemsAvailable = true;
                    console.log("totalDataTerakhir", $scope.banyakData);
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        }


        $scope.getData = function (data) {
            // console.log(data);
            $ionicActionSheet.show({
                titleText: 'Guru : ' + data.namaPengguna,
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
                        $state.go('menuAdmin.dataGuruEditAdmin', {
                            "idGuru": data.$id,
                            "namaPengguna": data.namaPengguna,
                            "idSekolah": data.idSekolah,
                            "namaSekolah": data.namaSekolah,
                            "idKotaKabupaten": data.idKotaKabupaten,
                            "idKecamatan": data.idKecamatan,
                            "jenjang": data.jenjang
                        });
                    }
                    return true;
                },

                destructiveButtonClicked: function () {
                    if ($scope.hakAkses === 'Super Admin') {
                        var refObj = firebase.database(appGuru).ref("dataGuru/" + data.$id);
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
                    else {
                        $ionicPopup.alert({
                            title: 'Perhatian',
                            template: 'Anda tidak diperkenankan menghapus data ini, terima kasih',
                            okType: 'button-positive'
                        });
                    }

                    return true;
                }

            });
        }

    }])

