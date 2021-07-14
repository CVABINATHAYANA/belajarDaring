angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('welcome', {
        url: '/welcome',
        templateUrl: 'templates/auth/welcome/welcome.html',
        controller: 'welcomeCtrl'
      })

      .state('registrasiSekolah', {
        url: '/registrasiSekolah',
        templateUrl: 'templates/auth/registrasi/sekolah.html',
        controller: 'registrasiSekolahCtrl'
      })

      .state('registrasiGuru', {
        url: '/registrasiGuru',
        templateUrl: 'templates/auth/registrasi/guru.html',
        controller: 'registrasiGuruCtrl'
      })

      .state('registrasiSiswa', {
        url: '/registrasiSiswa',
        templateUrl: 'templates/auth/registrasi/siswa.html',
        controller: 'registrasiSiswaCtrl'
      })

      .state('registrasiOrangTua', {
        url: '/registrasiOrangTua',
        templateUrl: 'templates/auth/registrasi/orangTua.html',
        controller: 'registrasiOrangTuaCtrl'
      })

      .state('registrasiDinas', {
        url: '/registrasiDinas',
        templateUrl: 'templates/auth/registrasi/dinas.html',
        controller: 'registrasiDinasCtrl'
      })

      .state('lupaPassword', {
        url: '/lupaPassword',
        templateUrl: 'templates/auth/lupaPassword/lupaPassword.html',
        controller: 'lupaPasswordCtrl'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/auth/login/login.html',
        controller: 'loginCtrl'
      })


      // Admin
      .state('menuAdmin', {
        url: '/admin',
        templateUrl: 'templates/admin/menuAdmin.html',
        controller: 'menuAdminCtrl'
      })

      .state('menuAdmin.berandaAdmin', {
        url: '/berandaAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/beranda/beranda.html',
            controller: 'berandaAdminCtrl'
          }
        }
      })

      // Pengaturan Admin
      .state('menuAdmin.tahunAjaranAdmin', {
        url: '/tahunAjaranAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/pengaturan/tahunAjaran/tahunAjaran.html',
            controller: 'tahunAjaranAdminCtrl'
          }
        }
      })
      .state('menuAdmin.semesterAdmin', {
        url: '/semesterAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/pengaturan/semester/semester.html',
            controller: 'semesterAdminCtrl'
          }
        }
      })
      .state('menuAdmin.pelajaranAdmin', {
        url: '/mataPelajaranAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/pengaturan/pelajaran/pelajaran.html',
            controller: 'mataPelajaranAdminCtrl'
          }
        }
      })
      .state('menuAdmin.jenisPrasaranaAdmin', {
        url: '/jenisPrasaranaAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/pengaturan/jenisPrasarana/jenisPrasarana.html',
            controller: 'jenisPrasaranaAdminCtrl'
          }
        }
      })
      .state('menuAdmin.jenisSaranaAdmin', {
        url: '/jenisSaranaAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/pengaturan/jenisSarana/jenisSarana.html',
            controller: 'jenisSaranaAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataAdmin', {
        url: '/dataAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/pengaturan/dataAdmin/dataAdmin.html',
            controller: 'dataAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataAdminSekolah', {
        url: '/dataAdminSekolah',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/pengaturan/dataAdminSekolah/dataAdminSekolah.html',
            controller: 'dataAdminSekolahCtrl'
          }
        }
      })
      .state('menuAdmin.dataGuruAllAdmin', {
        url: '/dataGuruAllAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/pengaturan/dataGuru/dataGuru.html',
            controller: 'dataGuruAllAdminCtrl'
          }
        }
      })

      //Data Pokok Sekolah Admin
      .state('menuAdmin.dataSekolahAdmin', {
        url: '/dataSekolahAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSekolah/dataSekolah.html',
            controller: 'dataSekolahAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataSekolahPerKecamatanAdmin', {
        url: '/dataSekolahPerKecamatanAdmin',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSekolah/dataSekolahPerKecamatan.html',
            controller: 'dataSekolahPerKecamatanAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataSekolahPerJenjangAdmin', {
        url: '/dataSekolahPerJenjangAdmin',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSekolah/dataSekolahPerJenjang.html',
            controller: 'dataSekolahPerJenjangAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataSekolahListAdmin', {
        url: '/dataSekolahListAdmin',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: "",
          status: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSekolah/dataSekolahList.html',
            controller: 'dataSekolahListAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataSekolahTambahAdmin', {
        url: '/dataSekolahTambahAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSekolah/dataSekolahTambah.html',
            controller: 'dataSekolahTambahAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataSekolahEditAdmin', {
        url: '/dataSekolahEditAdmin',
        params: {
          idSekolah: "",
          namaSekolah: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSekolah/dataSekolahEdit.html',
            controller: 'dataSekolahEditAdminCtrl'
          }
        }
      })

      //Data Pokok Guru Admin
      .state('menuAdmin.dataPokokGuruAdmin', {
        url: '/dataPokokGuruAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataGuru/dataPokokGuru.html',
            controller: 'dataPokokGuruAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataPokokGuruPerKecamatanAdmin', {
        url: '/dataPokokGuruPerKecamatanAdmin',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataGuru/dataPokokGuruPerKecamatan.html',
            controller: 'dataPokokGuruPerKecamatanAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataPokokGuruPerJenjangAdmin', {
        url: '/dataPokokGuruPerJenjangAdmin',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataGuru/dataPokokGuruPerJenjang.html',
            controller: 'dataPokokGuruPerJenjangAdminCtrl'
          }
        }
      })

      //Data Pokok Siswa Admin
      .state('menuAdmin.dataPokokSiswaAdmin', {
        url: '/dataPokokSiswaAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSiswa/dataPokokSiswa.html',
            controller: 'dataPokokSiswaAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataPokokSiswaPerKecamatanAdmin', {
        url: '/dataPokokSiswaPerKecamatanAdmin',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSiswa/dataPokokSiswaPerKecamatan.html',
            controller: 'dataPokokSiswaPerKecamatanAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataPokokSiswaPerJenjangAdmin', {
        url: '/dataPokokSiswaPerJenjangAdmin',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSiswa/dataPokokSiswaPerJenjang.html',
            controller: 'dataPokokSiswaPerJenjangAdminCtrl'
          }
        }
      })
      //Data Pokok Rombel Admin
      .state('menuAdmin.dataPokokRombelAdmin', {
        url: '/dataPokokRombelAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataRombel/dataPokokRombel.html',
            controller: 'dataPokokRombelAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataPokokRombelPerKecamatanAdmin', {
        url: '/dataPokokRombelPerKecamatanAdmin',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataRombel/dataPokokRombelPerKecamatan.html',
            controller: 'dataPokokRombelPerKecamatanAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataPokokRombelPerJenjangAdmin', {
        url: '/dataPokokRombelPerJenjangAdmin',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataRombel/dataPokokRombelPerJenjang.html',
            controller: 'dataPokokRombelPerJenjangAdminCtrl'
          }
        }
      })
      //Data Pokok Prasarana Admin
      .state('menuAdmin.dataPokokPrasaranaAdmin', {
        url: '/dataPokokPrasaranaAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataPrasarana/dataPokokPrasarana.html',
            controller: 'dataPokokPrasaranaAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataPokokPrasaranaPerKecamatanAdmin', {
        url: '/dataPokokPrasaranaPerKecamatanAdmin',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataPrasarana/dataPokokPrasaranaPerKecamatan.html',
            controller: 'dataPokokPrasaranaPerKecamatanAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataPokokPrasaranaPerJenjangAdmin', {
        url: '/dataPokokPrasaranaPerJenjangAdmin',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataPrasarana/dataPokokPrasaranaPerJenjang.html',
            controller: 'dataPokokPrasaranaPerJenjangAdminCtrl'
          }
        }
      })
      //Data Pokok Sarana Admin
      .state('menuAdmin.dataPokokSaranaAdmin', {
        url: '/dataPokokSaranaAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSarana/dataPokokSarana.html',
            controller: 'dataPokokSaranaAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataPokokSaranaPerKecamatanAdmin', {
        url: '/dataPokokSaranaPerKecamatanAdmin',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSarana/dataPokokSaranaPerKecamatan.html',
            controller: 'dataPokokSaranaPerKecamatanAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataPokokSaranaPerJenjangAdmin', {
        url: '/dataPokokSaranaPerJenjangAdmin',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSarana/dataPokokSaranaPerJenjang.html',
            controller: 'dataPokokSaranaPerJenjangAdminCtrl'
          }
        }
      })

      //Data Prasarana Sekolah Admin
      .state('menuAdmin.dataPrasaranaAdmin', {
        url: '/dataPrasaranaAdmin',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: "",
          namaKecamatan: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataPrasarana/dataPrasarana.html',
            controller: 'dataPrasaranaAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataSaranaAdmin', {
        url: '/dataSaranaAdmin',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: "",
          namaKecamatan: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSarana/dataSarana.html',
            controller: 'dataSaranaAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataLengkapSekolahAdmin', {
        url: '/dataLengkapSekolahAdmin',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: "",
          namaKecamatan: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataLengkapSekolah/dataLengkap.html',
            controller: 'dataLengkapSekolahAdminCtrl'
          }
        }
      })

      //Data Kelas Admin
      .state('menuAdmin.dataKelasAdmin', {
        url: '/dataKelasAdmin',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataRombel/dataRombel.html',
            controller: 'dataRombelAdminCtrl'
          }
        }
      })

      //Data Guru Admin
      .state('menuAdmin.dataGuruAdmin', {
        url: '/dataGuruAdmin',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataGuru/dataGuru.html',
            controller: 'dataGuruAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataGuruTambahAdmin', {
        url: '/dataGuruTambahAdmin',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataGuru/dataGuruTambah.html',
            controller: 'dataGuruTambahAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataGuruEditAdmin', {
        url: '/dataGuruEditAdmin',
        params: {
          idGuru: "",
          namaPengguna: "",
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataGuru/dataGuruEdit.html',
            controller: 'dataGuruEditAdminCtrl'
          }
        }
      })

      //Data Siswa Admin
      .state('menuAdmin.dataSiswaAdmin', {
        url: '/dataSiswaAdmin',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSiswa/dataSiswa.html',
            controller: 'dataSiswaAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataSiswaTambahAdmin', {
        url: '/dataSiswaTambahAdmin',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSiswa/dataSiswaTambah.html',
            controller: 'dataSiswaTambahAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataSiswaEditAdmin', {
        url: '/dataSiswaEditAdmin',
        params: {
          idSiswa: "",
          namaSiswa: "",
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSiswa/dataSiswaEdit.html',
            controller: 'dataSiswaEditAdminCtrl'
          }
        }
      })
      .state('menuAdmin.dataSiswaLihatAdmin', {
        url: '/dataSiswaLihatAdmin',
        params: {
          idSiswa: "",
          namaSiswa: "",
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPokokSekolah/dataSiswa/dataSiswaLihat.html',
            controller: 'dataSiswaLihatAdminCtrl'
          }
        }
      })

      //Data Jadwal Pelajaran Admin
      .state('menuAdmin.jadwalPelajaranAdmin', {
        url: '/jadwalPelajaranAdmin',
        params: {
          idSekolah: "",
          namaSekolah: "",
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/kurikulum/jadwalPelajaran/jadwalPelajaran.html',
            controller: 'jadwalPelajaranAdminCtrl'
          }
        }
      })
      .state('menuAdmin.jadwalPelajaranTambahAdmin', {
        url: '/jadwalPelajaranTambahAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/kurikulum/jadwalPelajaran/jadwalPelajaranTambah.html',
            controller: 'jadwalPelajaranTambahAdminCtrl'
          }
        }
      })
      .state('menuAdmin.jadwalPelajaranLihatAdmin', {
        url: '/jadwalPelajaranLihatAdmin',
        params: {
          filterGuru: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/kurikulum/jadwalPelajaran/jadwalPelajaranLihat.html',
            controller: 'jadwalPelajaranLihatAdminCtrl'
          }
        }
      })
      .state('menuAdmin.jadwalPelajaranLihatDetailAdmin', {
        url: '/jadwalPelajaranLihatDetailAdmin',
        params: {
          filterGuru: "",
          hari: "",
          tahunAjaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/kurikulum/jadwalPelajaran/jadwalPelajaranLihatDetail.html',
            controller: 'jadwalPelajaranLihatDetailAdminCtrl'
          }
        }
      })
      .state('menuAdmin.jadwalPelajaranEditAdmin', {
        url: '/jadwalPelajaranEditAdmin',
        params: {
          idJadwalPelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/kurikulum/jadwalPelajaran/jadwalPelajaranEdit.html',
            controller: 'jadwalPelajaranEditAdminCtrl'
          }
        }
      })

      //Data Absensi Siswa Admin
      .state('menuAdmin.absensiSiswaAdmin', {
        url: '/absensiSiswaAdmin',
        params: {
          idSekolah: "",
          namaSekolah: "",
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/absensi/siswa/absensiSiswa.html',
            controller: 'absensiSiswaAdminCtrl'
          }
        }
      })
      .state('menuAdmin.absensiSiswaTambahAdmin', {
        url: '/absensiSiswaTambahAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/absensi/siswa/absensiSiswaTambah.html',
            controller: 'absensiSiswaTambahAdminCtrl'
          }
        }
      })
      .state('menuAdmin.absensiSiswaLihatAdmin', {
        url: '/absensiSiswaLihatAdmin',
        params: {
          groupAbsensi: '',
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/absensi/siswa/absensiSiswaLihat.html',
            controller: 'absensiSiswaLihatAdminCtrl'
          }
        }
      })
      .state('menuAdmin.absensiSiswaEditAdmin', {
        url: '/absensiSiswaEditAdmin',
        params: {
          groupAbsensi: '',
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/absensi/siswa/absensiSiswaEdit.html',
            controller: 'absensiSiswaEditAdminCtrl'
          }
        }
      })

      //Data Tugas Siswa Admin
      .state('menuAdmin.tugasHomeSiswaAdmin', {
        url: '/tugasHomeSiswaAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tugas/siswa/tugasHome.html',
            controller: 'tugasHomeSiswaAdminCtrl'
          }
        }
      })
      .state('menuAdmin.tugasSiswaAdmin', {
        url: '/tugasSiswaAdmin',
        params: {
          namaKecamatan: '',
          idSekolah:'',
          namaSekolah:''
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tugas/siswa/tugasSiswa.html',
            controller: 'tugasSiswaAdminCtrl'
          }
        }
      })
      .state('menuAdmin.tugasSiswaTambahAdmin', {
        url: '/tugasSiswaTambahAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tugas/siswa/tugasSiswaTambah.html',
            controller: 'tugasSiswaTambahAdminCtrl'
          }
        }
      })
      .state('menuAdmin.tugasSiswaLihatAdmin', {
        url: '/tugasSiswaLihatAdmin',
        params: {
          groupTugas: '',
          idGroupTugasSiswa: '',
          idGuru: '',
          namaKecamatan: '',
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tugas/siswa/tugasSiswaLihat.html',
            controller: 'tugasSiswaLihatAdminCtrl'
          }
        }
      })
      .state('menuAdmin.tugasTambahSiswaAdmin', {
        url: '/tugasTambahSiswaAdmin',
        params: {
          groupTugas: '',
          idGroupTugasSiswa: '',
          idGuru: '',
          idKelas: ''
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tugas/siswa/tugasSiswaTambahSiswa.html',
            controller: 'tugasSiswaTambahSiswaCtrl'
          }
        }
      })
      .state('menuAdmin.tugasSiswaEditAdmin', {
        url: '/tugasSiswaEditAdmin',
        params: {
          groupTugas: '',
          idGroupTugasSiswa: '',
          namaKecamatan: ''
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tugas/siswa/tugasSiswaEdit.html',
            controller: 'tugasSiswaEditAdminCtrl'
          }
        }
      })
      .state('menuAdmin.LihatJawabanTugasSiswaAdmin', {
        url: '/jawabanTugasSiswa',
        params: {
          idTugas: '',
          namaSiswa: '',
          namaKecamatan: ''
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tugas/siswa/tugasSiswaJawaban.html',
            controller: 'LihatJawabanTugasSiswaAdminCtrl'
          }
        }
      })

      //Data Bank Soal Admin
      .state('menuAdmin.bankSoalAdmin', {
        url: '/bankSoalAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/bankSoal/bankSoal.html',
            controller: 'bankSoalAdminCtrl'
          }
        }
      })
      .state('menuAdmin.bankSoalTambahAdmin', {
        url: '/bankSoalTambahAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/bankSoal/bankSoalTambah.html',
            controller: 'bankSoalTambahAdminCtrl'
          }
        }
      })
      .state('menuAdmin.bankSoalPerJenjangAdmin', {
        url: '/bankSoalPerJenjangAdmin',
        params: {
          pelajaran: "",
          idPelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/bankSoal/bankSoalPerJenjang.html',
            controller: 'bankSoalPerJenjangAdminCtrl'
          }
        }
      })
      .state('menuAdmin.bankSoalLihatAdmin', {
        url: '/bankSoalLihatAdmin',
        params: {
          pelajaran: "",
          idPelajaran: "",
          kelas: "",
          jenjang: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/bankSoal/bankSoalLihat.html',
            controller: 'bankSoalLihatAdminCtrl'
          }
        }
      })
      .state('menuAdmin.bankSoalEditAdmin', {
        url: '/bankSoalEditAdmin',
        params: {
          idSoal: "",
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/bankSoal/bankSoalEdit.html',
            controller: 'bankSoalEditAdminCtrl'
          }
        }
      })

      //Data Materi Pelajaran Admin
      .state('menuAdmin.materiPelajaranAdmin', {
        url: '/materiPelajaranAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/materiPelajaran/materiPelajaran.html',
            controller: 'materiPelajaranAdminCtrl'
          }
        }
      })
      .state('menuAdmin.materiPelajaranTambahAdmin', {
        url: '/materiPelajaranTambahAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/materiPelajaran/materiPelajaranTambah.html',
            controller: 'materiPelajaranTambahAdminCtrl'
          }
        }
      })
      .state('menuAdmin.materiPelajaranPerJenjangAdmin', {
        url: '/materiPelajaranPerJenjangAdmin',
        params: {
          pelajaran: "",
          idPelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/materiPelajaran/materiPelajaranPerJenjang.html',
            controller: 'materiPelajaranPerJenjangAdminCtrl'
          }
        }
      })
      .state('menuAdmin.materiPelajaranLihatAdmin', {
        url: '/materiPelajaranLihatAdmin',
        params: {
          pelajaran: "",
          idPelajaran: "",
          kelas: "",
          jenjang: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/materiPelajaran/materiPelajaranLihat.html',
            controller: 'materiPelajaranLihatAdminCtrl'
          }
        }
      })
      .state('menuAdmin.materiPelajaranSubBABAdmin', {
        url: '/materiPelajaranSubBABAdmin',
        params: {
          idMateriPelajaran: "",
          BAB: ''
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/materiPelajaran/materiPelajaranSubBAB.html',
            controller: 'materiPelajaranSubBABAdminCtrl'
          }
        }
      })
      .state('menuAdmin.materiPelajaranSubBABTambahAdmin', {
        url: '/materiPelajaranSubBABTambahAdmin',
        params: {
          idMateriPelajaran: "",
          BAB: ''
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/materiPelajaran/materiPelajaranSubBABTambah.html',
            controller: 'materiPelajaranSubBABTambahAdminCtrl'
          }
        }
      })
      .state('menuAdmin.materiPelajaranSubBABEditAdmin', {
        url: '/materiPelajaranSubBABTambahAdmin',
        params: {
          idMateriPelajaran: "",
          BAB: '',
          idSubBAB: '',
          namaSubBAB: ''
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/materiPelajaran/materiPelajaranSubBABEdit.html',
            controller: 'materiPelajaranSubBABEditAdminCtrl'
          }
        }
      })
      .state('menuAdmin.materiPelajaranEditAdmin', {
        url: '/materiPelajaranEditAdmin',
        params: {
          idMateriPelajaran: "",
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/materiPelajaran/materiPelajaranEdit.html',
            controller: 'materiPelajaranEditAdminCtrl'
          }
        }
      })

      // Data Akun Admin
      .state('menuAdmin.profilPenggunaAdmin', {
        url: '/profilPenggunaAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataAkun/profilPengguna.html',
            controller: 'profilPenggunaAdminCtrl'
          }
        }
      })
      .state('menuAdmin.gantiPasswordAdmin', {
        url: '/gantiPasswordAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataAkun/gantiPassword.html',
            controller: 'gantiPasswordAdminCtrl'
          }
        }
      })
      .state('menuAdmin.uploadFotoAdmin', {
        url: '/uploadFotoAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataAkun/uploadFoto.html',
            controller: 'uploadFotoAdminCtrl'
          }
        }
      })

      // Data SOC Admin
      .state('menuAdmin.socAdmin', {
        url: '/socAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/beranda/beranda.html',
            controller: 'berandaSOCAdminCtrl'
          }
        }
      })
      .state('menuAdmin.tambahSOCAdmin', {
        url: '/tambahSOCAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/beranda/tambahSOC.html',
            controller: 'tambahSOCAdminCtrl'
          }
        }
      })
      .state('menuAdmin.editSOCAdmin', {
        url: '/editSOCAdmin',
        params: {
          idTryout: "",
          namaTryout: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/beranda/editSOC.html',
            controller: 'editSOCAdminCtrl'
          }
        }
      })
      // Data SOC Pelajaran Admin
      .state('menuAdmin.pelajaranSOCAdmin', {
        url: '/pelajaranSOCAdmin',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          olimpiadeTingkat: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/pelajaran/pelajaran.html',
            controller: 'pelajaranSOCAdminCtrl'
          }
        }
      })
      .state('menuAdmin.tambahPelajaranSOCAdmin', {
        url: '/tambahPelajaranSOCAdmin',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/pelajaran/tambahPelajaran.html',
            controller: 'tambahPelajaranSOCAdminCtrl'
          }
        }
      })
      // Data SOC Pengaturan Umum Admin
      .state('menuAdmin.pengaturanUmumSOCAdmin', {
        url: '/pengaturanUmumSOCAdmin',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/pengaturanUmum/pengaturanUmum.html',
            controller: 'pengaturanUmumSOCAdminCtrl'
          }
        }
      })
      .state('menuAdmin.kisiKisiSoalSOCAdmin', {
        url: '/kisiKisiSoalSOCAdmin',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/pengaturanUmum/kisiKisiSoal.html',
            controller: 'kisiKisiSoalSOCAdminCtrl'
          }
        }
      })
      .state('menuAdmin.resetJawabanPesertaSOCAdmin', {
        url: '/resetJawabanPesertaSOCAdmin',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/pengaturanUmum/resetJawabanPeserta.html',
            controller: 'resetJawabanPesertaSOCAdminCtrl'
          }
        }
      })
      .state('menuAdmin.ulangUjianSOCAdmin', {
        url: '/ulangUjianSOCAdmin',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/pengaturanUmum/ulangUjian.html',
            controller: 'ulangUjianSOCAdminCtrl'
          }
        }
      })
      .state('menuAdmin.tambahSoalOlimpiadeSOCAdmin', {
        url: '/tambahSoalOlimpiadeSOCAdmin',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: "",
          kelas: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/pengaturanUmum/tambahSoalOlimpiade.html',
            controller: 'tambahSoalOlimpiadeSOCAdminCtrl'
          }
        }
      })
      .state('menuAdmin.soalOlimpiadeDetailSOCAdmin', {
        url: '/soalOlimpiadeDetailSOCAdmin',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/pengaturanUmum/soalOlimpiadeDetail.html',
            controller: 'soalOlimpiadeDetailSOCAdminCtrl'
          }
        }
      })

      //Data SOC Registrasi Peserta Admin
      .state('menuAdmin.registrasiPesertaSOCAdmin', {
        url: '/registrasiPesertaSOCAdmin',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          id_kota_kabupaten: "",
          olimpiadeTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/registrasiPeserta/registrasiPeserta.html',
            controller: 'registrasiPesertaSOCAdminCtrl'
          }
        }
      })
      .state('menuAdmin.registrasiPesertaKotaSOCAdmin', {
        url: '/registrasiPesertaKotaSOCAdmin',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          id_kota_kabupaten: "",
          olimpiadeTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/registrasiPeserta/registrasiPesertaKota.html',
            controller: 'registrasiPesertaKotaSOCAdminCtrl'
          }
        }
      })
      .state('menuAdmin.pesertaTeregistrasiSOCAdmin', {
        url: '/pesertaTeregistrasiSOCAdmin',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          id_kota_kabupaten: "",
          olimpiadeTingkat: "",
          id_provinsi: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/registrasiPeserta/pesertaTeregistrasi.html',
            controller: 'pesertaTeregistrasiSOCAdminCtrl'
          }
        }
      })
      .state('menuAdmin.logHistoriSOCAdmin', {
        url: '/logHistoriSOCAdmin',
        params: {
          "idTryout": "",
          "namaTryout": "",
          "jenjang": "",
          "kelas": "",
          "id_kota_kabupaten": "",
          "olimpiadeTingkat": "",
          "id_provinsi": ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/registrasiPeserta/logHistoriPeserta.html',
            controller: 'logHistoriSOCAdminCtrl'
          }
        }
      })

      //Nilai Peringkat SOC Admin
      .state('menuAdmin.nilaiPeringkatSOCAdmin', {
        url: '/nilaiPeringkatSOCAdmin',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          totalSiswaLolos: "",
          tanggalPelaksanaan: "",
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/nilaiPeringkat/nilaiPeringkatNew.html',
            controller: 'nilaiPeringkatSOCAdminCtrl'
          }
        }
      })

      .state('menuAdmin.nilaiSiswaSOCAdmin', {
        url: '/nilaiSiswaSOCAdmin',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          namaSekolah: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanOlimpiadeSiswa: "",
          namaPengguna: "",
          uid: "",
          lulus: "",
          tanggalPelaksanaan: "",
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/nilaiPeringkat/nilaiSiswa.html',
            controller: 'nilaiSiswaSOCAdminCtrl'
          }
        }
      })

      .state('menuAdmin.nilaiSiswaDetailSOCAdmin', {
        url: '/nilaiSiswaDetailSOCAdmin',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanOlimpiadeSiswaPerPelajaran: "",
          idRekapJawabanOlimpiadeSiswa: "",
          namaPengguna: "",
          uid: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/nilaiPeringkat/nilaiSiswaDetail.html',
            controller: 'nilaiSiswaDetailSOCAdminlCtrl'
          }
        }
      })

      .state('menuAdmin.statusJawabanSiswaSOCAdmin', {
        url: '/statusJawabanSiswaSOCAdmin',
        params: {
          idTryout: "",
          namaTryout: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryout: "",
          pelajaran: "",
          namaPengguna: "",
          uid: "",
          keterangan: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/soc/nilaiPeringkat/statusJawabanSiswa.html',
            controller: 'statusJawabanSiswaSOCAdminCtrl'
          }
        }
      })

      // Data UTS UAS Admin
      .state('menuAdmin.UTSUASAdmin', {
        url: '/utsUasAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/beranda/beranda.html',
            controller: 'berandaUTSUASAdminCtrl'
          }
        }
      })
      .state('menuAdmin.tambahUTSUASAdmin', {
        url: '/tambahUTSUASAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/beranda/tambahSOC.html',
            controller: 'tambahUTSUASAdminCtrl'
          }
        }
      })
      .state('menuAdmin.editUTSUASAdmin', {
        url: '/editUTSUASAdmin',
        params: {
          idUTSUAS: "",
          namaUTSUAS: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/beranda/editSOC.html',
            controller: 'editUTSUASAdminCtrl'
          }
        }
      })
      // Data UTS / UAS Pelajaran Admin
      .state('menuAdmin.pelajaranUTSUASAdmin', {
        url: '/pelajaranUTSUASAdmin',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          utsUasTingkat: "",
          namaSekolah: "",
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/pelajaran/pelajaran.html',
            controller: 'pelajaranUTSUASAdminCtrl'
          }
        }
      })
      .state('menuAdmin.tambahPelajaranUTSUASAdmin', {
        url: '/tambahPelajaranUTSUASAdmin',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/pelajaran/tambahPelajaran.html',
            controller: 'tambahPelajaranUTSUASAdminCtrl'
          }
        }
      })
      // Data UTS UAS Pengaturan Umum Admin
      .state('menuAdmin.pengaturanUmumUTSUASAdmin', {
        url: '/pengaturanUmumUTSUASAdmin',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/pengaturanUmum/pengaturanUmum.html',
            controller: 'pengaturanUmumUTSUASAdminCtrl'
          }
        }
      })
      .state('menuAdmin.kisiKisiSoalUTSUASAdmin', {
        url: '/kisiKisiSoalUTSUASAdmin',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/pengaturanUmum/kisiKisiSoal.html',
            controller: 'kisiKisiSoalUTSUASAdminCtrl'
          }
        }
      })
      .state('menuAdmin.resetJawabanPesertaUTSUASAdmin', {
        url: '/resetJawabanPesertaUTSUASAdmin',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/pengaturanUmum/resetJawabanPeserta.html',
            controller: 'resetJawabanPesertaUTSUASAdminCtrl'
          }
        }
      })
      .state('menuAdmin.ulangUjianUTSUASAdmin', {
        url: '/ulangUjianUTSUASAdmin',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/pengaturanUmum/ulangUjian.html',
            controller: 'ulangUjianUTSUASAdminCtrl'
          }
        }
      })
      .state('menuAdmin.tambahSoalUTSUASAdmin', {
        url: '/tambahSoalUTSUASAdmin',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: "",
          tingkatKelas: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/pengaturanUmum/tambahSoalOlimpiade.html',
            controller: 'tambahSoalUTSUASAdminCtrl'
          }
        }
      })
      .state('menuAdmin.soalDetailUTSUASAdmin', {
        url: '/soalDetailUTSUASAdmin',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/pengaturanUmum/soalOlimpiadeDetail.html',
            controller: 'soalDetailUTSUASAdminCtrl'
          }
        }
      })
      //Data UTS UAS Registrasi Peserta Admin
      .state('menuAdmin.registrasiPesertaUTSUASAdmin', {
        url: '/registrasiPesertaUTSUASAdmin',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          utsUasTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/registrasiPeserta/registrasiPeserta.html',
            controller: 'registrasiPesertaUTSUASAdminCtrl'
          }
        }
      })
      .state('menuAdmin.registrasiPesertaKotaUTSUASAdmin', {
        url: '/registrasiPesertaKotaUTSUASAdmin',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          utsUasTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/registrasiPeserta/registrasiPesertaKota.html',
            controller: 'registrasiPesertaKotaUTSUASAdminCtrl'
          }
        }
      })
      .state('menuAdmin.pesertaTeregistrasiUTSUASAdmin', {
        url: '/pesertaTeregistrasiUTSUASAdmin',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          utsUasTingkat: "",
          id_provinsi: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/registrasiPeserta/pesertaTeregistrasi.html',
            controller: 'pesertaTeregistrasiUTSUASAdminCtrl'
          }
        }
      })
      .state('menuAdmin.logHistoriUTSUASAdmin', {
        url: '/logHistoriUTSUASAdmin',
        params: {
          "idUTSUAS": "",
          "namaUTSUAS": "",
          "jenjang": "",
          "tingkatKelas": "",
          "id_kota_kabupaten": "",
          "utsUasTingkat": "",
          "id_provinsi": ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/registrasiPeserta/logHistoriPeserta.html',
            controller: 'logHistoriUTSUASAdminCtrl'
          }
        }
      })
      //Nilai Peringkat UTS UAS Admin
      .state('menuAdmin.nilaiPeringkatUTSUASAdmin', {
        url: '/nilaiPeringkatUTSUASAdmin',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          tingkatKelas: "",
          idSekolah: "",
          idTahunAjaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/nilaiPeringkat/nilaiPeringkat.html',
            controller: 'nilaiPeringkatUTSUASAdminCtrl'
          }
        }
      })
      .state('menuAdmin.nilaiSiswaUTSUASAdmin', {
        url: '/nilaiSiswaUTSUASAdmin',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          namaSekolah: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanUTSUASSiswa: "",
          namaPengguna: "",
          uid: "",
          lulus: "",
          tanggalPelaksanaan: "",
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/nilaiPeringkat/nilaiSiswa.html',
            controller: 'nilaiSiswaUTSUASAdminCtrl'
          }
        }
      })
      .state('menuAdmin.nilaiSiswaDetailUTSUASAdmin', {
        url: '/nilaiSiswaDetailUTSUASAdmin',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanUTSUASSiswaPerPelajaran: "",
          idRekapJawabanUTSUASSiswa: "",
          namaPengguna: "",
          uid: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/nilaiPeringkat/nilaiSiswaDetail.html',
            controller: 'nilaiSiswaDetailUTSUASAdminCtrl'
          }
        }
      })
      .state('menuAdmin.statusJawabanSiswaUTSUASAdmin', {
        url: '/statusJawabanSiswaUTSUASAdmin',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranUTSUAS: "",
          pelajaran: "",
          namaPengguna: "",
          uid: "",
          keterangan: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/UTSUAS/nilaiPeringkat/statusJawabanSiswa.html',
            controller: 'statusJawabanSiswaUTSUASAdminCtrl'
          }
        }
      })

      // Data Tryout Online Admin
      .state('menuAdmin.tryoutOnlineAdmin', {
        url: '/tryoutOnlineAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/beranda/beranda.html',
            controller: 'berandaTryoutOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.tambahTryoutOnlineAdmin', {
        url: '/tambahTryoutOnlineAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/beranda/tambahTryoutOnline.html',
            controller: 'tambahTryoutOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.editTryoutOnlineAdmin', {
        url: '/editTryoutOnlineAdmin',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/beranda/editTryoutOnline.html',
            controller: 'editTryoutOnlineAdminCtrl'
          }
        }
      })
      // Data Tryout Online Pelajaran Admin
      .state('menuAdmin.pelajaranTryoutOnlineAdmin', {
        url: '/pelajaranTryoutOnlineAdmin',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          TryoutOnlineTingkat: "",
          namaSekolah: "",
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/pelajaran/pelajaran.html',
            controller: 'pelajaranTryoutOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.tambahPelajaranTryoutOnlineAdmin', {
        url: '/tambahPelajaranTryoutOnlineAdmin',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/pelajaran/tambahPelajaran.html',
            controller: 'tambahPelajaranTryoutOnlineAdminCtrl'
          }
        }
      })
      // Data Tryout Online Pengaturan Umum Admin
      .state('menuAdmin.pengaturanUmumTryoutOnlineAdmin', {
        url: '/pengaturanUmumTryoutOnlineAdmin',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/pengaturanUmum/pengaturanUmum.html',
            controller: 'pengaturanUmumTryoutOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.kisiKisiSoalTryoutOnlineAdmin', {
        url: '/kisiKisiSoalTryoutOnlineAdmin',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/pengaturanUmum/kisiKisiSoal.html',
            controller: 'kisiKisiSoalTryoutOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.resetJawabanPesertaTryoutOnlineAdmin', {
        url: '/resetJawabanPesertaTryoutOnlineAdmin',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/pengaturanUmum/resetJawabanPeserta.html',
            controller: 'resetJawabanPesertaTryoutOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.ulangUjianTryoutOnlineAdmin', {
        url: '/ulangUjianTryoutOnlineAdmin',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/pengaturanUmum/ulangUjian.html',
            controller: 'ulangUjianTryoutOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.tambahSoalTryoutOnlineAdmin', {
        url: '/tambahSoalTryoutOnlineAdmin',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: "",
          tingkatKelas: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/pengaturanUmum/tambahSoalOlimpiade.html',
            controller: 'tambahSoalTryoutOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.soalDetailTryoutOnlineAdmin', {
        url: '/soalDetailTryoutOnlineAdmin',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/pengaturanUmum/soalOlimpiadeDetail.html',
            controller: 'soalDetailTryoutOnlineAdminCtrl'
          }
        }
      })
      //Data Tryout Online Registrasi Peserta Admin
      .state('menuAdmin.registrasiPesertaTryoutOnlineAdmin', {
        url: '/registrasiPesertaTryoutOnlineAdmin',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          TryoutOnlineTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/registrasiPeserta/registrasiPeserta.html',
            controller: 'registrasiPesertaTryoutOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.registrasiPesertaKotaTryoutOnlineAdmin', {
        url: '/registrasiPesertaKotaTryoutOnlineAdmin',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          TryoutOnlineTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/registrasiPeserta/registrasiPesertaKota.html',
            controller: 'registrasiPesertaKotaTryoutOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.pesertaTeregistrasiTryoutOnlineAdmin', {
        url: '/pesertaTeregistrasiTryoutOnlineAdmin',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          TryoutOnlineTingkat: "",
          id_provinsi: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/registrasiPeserta/pesertaTeregistrasi.html',
            controller: 'pesertaTeregistrasiTryoutOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.logHistoriTryoutOnlineAdmin', {
        url: '/logHistoriTryoutOnlineAdmin',
        params: {
          "idTryoutOnline": "",
          "namaTryoutOnline": "",
          "jenjang": "",
          "tingkatKelas": "",
          "id_kota_kabupaten": "",
          "TryoutOnlineTingkat": "",
          "id_provinsi": ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/registrasiPeserta/logHistoriPeserta.html',
            controller: 'logHistoriTryoutOnlineAdminCtrl'
          }
        }
      })
      //Nilai Peringkat TryoutOnline Admin
      .state('menuAdmin.nilaiPeringkatTryoutOnlineAdmin', {
        url: '/nilaiPeringkatTryoutOnlineAdmin',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          tingkatKelas: "",
          idTahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/nilaiPeringkat/nilaiPeringkat.html',
            controller: 'nilaiPeringkatTryoutOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.nilaiSiswaTryoutOnlineAdmin', {
        url: '/nilaiSiswaTryoutOnlineAdmin',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          namaSekolah: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanTryoutOnlineSiswa: "",
          namaPengguna: "",
          uid: "",
          lulus: "",
          tanggalPelaksanaan: "",
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/nilaiPeringkat/nilaiSiswa.html',
            controller: 'nilaiSiswaTryoutOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.nilaiSiswaDetailTryoutOnlineAdmin', {
        url: '/nilaiSiswaDetailTryoutOnlineAdmin',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanTryoutOnlineSiswaPerPelajaran: "",
          idRekapJawabanTryoutOnlineSiswa: "",
          namaPengguna: "",
          uid: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/nilaiPeringkat/nilaiSiswaDetail.html',
            controller: 'nilaiSiswaDetailTryoutOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.statusJawabanSiswaTryoutOnlineAdmin', {
        url: '/statusJawabanSiswaTryoutOnlineAdmin',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryoutOnline: "",
          pelajaran: "",
          namaPengguna: "",
          uid: "",
          keterangan: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/tryoutOnline/nilaiPeringkat/statusJawabanSiswa.html',
            controller: 'statusJawabanSiswaTryoutOnlineAdminCtrl'
          }
        }
      })

      // Data Ujian Online Admin
      .state('menuAdmin.ujianOnlineAdmin', {
        url: '/ujianOnlineAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/beranda/beranda.html',
            controller: 'berandaUjianOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.tambahUjianOnlineAdmin', {
        url: '/tambahUjianOnlineAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/beranda/tambahUjianOnline.html',
            controller: 'tambahUjianOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.editUjianOnlineAdmin', {
        url: '/editUjianOnlineAdmin',
        params: {
          idUjian: "",
          namaUjian: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/beranda/editUjianOnline.html',
            controller: 'editUjianOnlineAdminCtrl'
          }
        }
      })
      // Data Ujian Online Pelajaran Admin
      .state('menuAdmin.pelajaranUjianOnlineAdmin', {
        url: '/pelajaranUjianOnlineAdmin',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKelas: "",
          namaSekolah: "",
          jenisUjian: "",
          namaGuru: "",
          idTahunAjaran: "",
          idSekolah: "",
          idKelas: "",
          idGuru: "",
          tingkatKelas: "",
          ruangLingkupUjian: "",
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/pelajaran/pelajaran.html',
            controller: 'pelajaranUjianOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.tambahPelajaranUjianOnlineAdmin', {
        url: '/tambahPelajaranUjianOnlineAdmin',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/pelajaran/tambahPelajaran.html',
            controller: 'tambahPelajaranUjianOnlineAdminCtrl'
          }
        }
      })
      // Data UjianOnline Pengaturan Umum Admin
      .state('menuAdmin.pengaturanUmumUjianOnlineAdmin', {
        url: '/pengaturanUmumUjianOnlineAdmin',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          idKelas: "",
          namaKelas: "",
          idPelajaran: "",
          pelajaran: "",
          namaSekolah: "",
          jenisUjian: "",
          idGuru: "",
          namaGuru: "",
          idPelajaranUjianOnline: "",
          tingkatKelas: "",
          idSekolah: "",
          idTahunAjaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/pengaturanUmum/pengaturanUmum.html',
            controller: 'pengaturanUmumUjianOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.kisiKisiSoalUjianOnlineAdmin', {
        url: '/kisiKisiSoalUjianOnlineAdmin',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKelas: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/pengaturanUmum/kisiKisiSoal.html',
            controller: 'kisiKisiSoalUjianOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.resetJawabanPesertaUjianOnlineAdmin', {
        url: '/resetJawabanPesertaUjianOnlineAdmin',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKelas: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/pengaturanUmum/resetJawabanPeserta.html',
            controller: 'resetJawabanPesertaUjianOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.ulangUjianOnlineAdmin', {
        url: '/ulangUjianOnlineAdmin',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKelas: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/pengaturanUmum/ulangUjian.html',
            controller: 'ulangUjianOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.tambahSoalUjianOnlineAdmin', {
        url: '/tambahSoalUjianOnlineAdmin',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: "",
          namaKelas: "",
          tingkatKelas: "",
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/pengaturanUmum/tambahSoalUjianOnline.html',
            controller: 'tambahSoalUjianOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.soalUjianOnlineDetailAdmin', {
        url: '/soalUjianOnlineDetailAdmin',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKelas: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/pengaturanUmum/soalUjianOnlineDetail.html',
            controller: 'soalUjianOnlineDetailAdminCtrl'
          }
        }
      })
      //Data Ujian Online Registrasi Peserta Admin
      .state('menuAdmin.registrasiPesertaUjianOnlineAdmin', {
        url: '/registrasiPesertaUjianOnlineAdmin',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          idKelas: "",
          namaKelas: "",
          idKotaKabupaten: "",
          idProvinsi: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          idSemester: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idSekolah: "",
          namaSekolah: "",
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/registrasiPeserta/registrasiPeserta.html',
            controller: 'registrasiPesertaUjianOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.pesertaTeregistrasiUjianOnlineAdmin', {
        url: '/pesertaTeregistrasiUjianOnlineAdmin',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          idKelas: "",
          namaKelas: "",
          kelas: "",
          idKotaKabupaten: "",
          idProvinsi: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/registrasiPeserta/pesertaTeregistrasi.html',
            controller: 'pesertaTeregistrasiUjianOnlineAdminCtrl'
          }
        }
      })
      .state('menuAdmin.logHistoriUjianOnlineAdmin', {
        url: '/logHistoriUjianOnlineAdmin',
        params: {
          idUjian: "",
          namaTryout: "",
          jenjang: "",
          idKelas: "",
          namaKelas: "",
          idKotaKabupaten: "",
          idProvinsi: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/registrasiPeserta/logHistoriPeserta.html',
            controller: 'logHistoriUjianOnlineAdminCtrl'
          }
        }
      })

      //Nilai Peringkat Ujian Online Admin
      .state('menuAdmin.nilaiPeringkatUjianOnlineAdmin', {
        url: '/nilaiPeringkatUjianOnlineAdmin',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          idSemester: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/nilaiPeringkat/nilaiPeringkatNew.html',
            controller: 'nilaiPeringkatUjianOnlineAdminCtrl'
          }
        }
      })

      .state('menuAdmin.nilaiSiswaUjianOnlineAdmin', {
        url: '/nilaiSiswaUjianOnlineAdmin',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          idSekolah: "",
          namaSekolah: "",
          idSemester: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idRekapJawabanUjianOnlineSiswa: "",
          namaPengguna: "",
          uid: "",
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/nilaiPeringkat/nilaiSiswa.html',
            controller: 'nilaiSiswaUjianOnlineAdminCtrl'
          }
        }
      })

      .state('menuAdmin.nilaiSiswaDetailUjianOnlineAdmin', {
        url: '/nilaiSiswaDetailUjianOnlineAdmin',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          idSemester: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanUjianOnlineSiswaPerPelajaran: "",
          idRekapJawabanUjianOnlineSiswa: "",
          namaPengguna: "",
          uid: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/nilaiPeringkat/nilaiSiswaDetail.html',
            controller: 'nilaiSiswaDetailUjianOnlineAdminCtrl'
          }
        }
      })

      .state('menuAdmin.statusJawabanSiswaUjianOnlineAdmin', {
        url: '/statusJawabanSiswaUjianOnlineAdmin',
        params: {
          idUjian: "",
          namaUjian: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          idSemester: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idPelajaranUjianOnline: "",
          pelajaran: "",
          namaPengguna: "",
          uid: "",
          keterangan: ""
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/ujianOnline/nilaiPeringkat/statusJawabanSiswa.html',
            controller: 'statusJawabanSiswaUjianOnlineAdminCtrl'
          }
        }
      })

      // USER SISWA
      .state('menuSiswa', {
        url: '/siswa',
        templateUrl: 'templates/siswa/menuSiswa.html',
        controller: 'menuSiswaCtrl'
      })

      .state('menuSiswa.authSiswa', {
        url: '/authSiswa',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/beranda/authSiswa.html',
            controller: 'authSiswaCtrl'
          }
        }
      })

      .state('menuSiswa.berandaSiswa', {
        url: '/berandaSiswa',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/beranda/beranda.html',
            controller: 'berandaSiswaCtrl'
          }
        }
      })

      .state('menuSiswa.kelasLintasMinat', {
        url: '/kelasLintasMinat',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/beranda/kelasLintasMinat.html',
            controller: 'kelasLintasMinatCtrl'
          }
        }
      })

      .state('menuSiswa.kelasLintasMinatTambah', {
        url: '/kelasLintasMinatTambah',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/beranda/kelasLintasMinatTambah.html',
            controller: 'kelasLintasMinatTambahCtrl'
          }
        }
      })

      // USER SOC
      .state('menuSiswa.socSiswa', {
        url: '/socSiswa',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/soc/beranda/beranda.html',
            controller: 'berandaSOCSiswaCtrl'
          }
        }
      })
      // USER SOC MULAI OLIMPIADE
      .state('menuSiswa.mulaiOlimpiadeSOCSiswa', {
        url: '/mulaiOlimpiadeSOCSiswa',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanOlimpiadeSiswa: "",
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/soc/mulaiOlimpiade/mulaiOlimpiade.html',
            controller: 'mulaiOlimpiadeSOCSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.nilaiSOCSiswa', {
        url: '/nilaiSOCSiswa',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanOlimpiadeSiswaPerPelajaran: "",
          idRekapJawabanOlimpiadeSiswa: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/soc/mulaiOlimpiade/nilai.html',
            controller: 'nilaiSOCSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.statusJawabanSOCSiswa', {
        url: '/statusJawabanSOCSiswa',
        params: {
          idTryout: "",
          namaTryout: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryout: "",
          pelajaran: "",
          keterangan: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/soc/mulaiOlimpiade/statusJawaban.html',
            controller: 'statusJawabanSOCSiswaCtrl'
          }
        }
      })
      // USER SOC DETAIL OLIMPIADE
      .state('menuSiswa.olimpiadeDetailSOCSiswa', {
        url: '/olimpiadeDetailSOCSiswa',
        params: {
          idTryout: "",
          namaTryout: "",
          olimpiadeTingkat: "",
          jenjang: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/soc/olimpiadeDetail/olimpiadeDetail.html',
            controller: 'olimpiadeDetailSOCSiswaCtrl'
          }
        }
      })
      // USER SOC KISI KISI SOAL OLIMPIADE
      .state('menuSiswa.kisiKisiSoalSOCSiswa', {
        url: '/kisiKisiSoalSOCSiswa',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/soc/kisiKisiSoal/kisiKisiSoal.html',
            controller: 'kisiKisiSoalSOCSiswaCtrl'
          }
        }
      })
      // USER SOC PESERTA OLIMPIADE
      .state('menuSiswa.pesertaOlimpiadeSOCSiswa', {
        url: '/pesertaOlimpiadeSOCSiswa',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/soc/pesertaOlimpiade/pesertaOlimpiade.html',
            controller: 'pesertaOlimpiadeSOCSiswaCtrl'
          }
        }
      })
      // USER SOC NILAI ANDA
      .state('menuSiswa.nilaiAndaSOCSiswa', {
        url: '/nilaiAndaSOCSiswa',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanOlimpiadeSiswa: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/soc/nilaiAnda/nilaiAnda.html',
            controller: 'nilaiAndaSOCSiswaCtrl'
          }
        }
      })
      // USER SOC PERINGKAT ANDA
      .state('menuSiswa.peringkatAndaSOCSiswa', {
        url: '/peringkatAndaSOCSiswa',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          totalSiswaLolos: "",
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/soc/peringkatAnda/peringkatAnda.html',
            controller: 'peringkatAndaSOCSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.nilaiSiswaSOCSiswa', {
        url: '/nilaiSiswaSOCSiswa',
        params: {
          idTryout: "",
          namaTryout: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanOlimpiadeSiswa: "",
          namaPengguna: "",
          uid: "",
          jenjang: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/soc/peringkatAnda/nilaiSiswa.html',
            controller: 'nilaiSiswaSOCSiswaCtrl'
          }
        }

      })
      .state('menuSiswa.nilaiSiswaDetailSOCSiswa', {
        url: '/nilaiSiswaDetailSOCSiswa',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanOlimpiadeSiswaPerPelajaran: "",
          idRekapJawabanOlimpiadeSiswa: "",
          namaPengguna: "",
          uid: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/soc/peringkatAnda/nilaiSiswaDetail.html',
            controller: 'nilaiSiswaDetailSOCSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.statusJawabanSiswaSOCSiswa', {
        url: '/statusJawabanSiswaSOCSiswa',
        params: {
          idTryout: "",
          namaTryout: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryout: "",
          pelajaran: "",
          namaPengguna: "",
          uid: "",
          keterangan: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/soc/peringkatAnda/statusJawabanSiswa.html',
            controller: 'statusJawabanSiswaSOCSiswaCtrl'
          }
        }
      })
      // USER SOC OLIMPIADE ONLINE SISWA
      .state('olimpiadeOnlineSOCSiswa', {
        url: '/olimpiadeOnlineSOCSiswa',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanOlimpiadeSiswaPerPelajaran: "",
          idRekapJawabanOlimpiadeSiswa: ""
        },
        templateUrl: 'templates/siswa/soc/olimpiadeOnline/olimpiadeOnline.html',
        controller: 'olimpiadeOnlineSOCSiswaCtrl'
      })

      // Start

      // USER UTS UAS Siswa
      .state('menuSiswa.berandaUTSUASSiswa', {
        url: '/berandaUTSUASSiswa',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/UTSUAS/beranda/beranda.html',
            controller: 'berandaUTSUASSiswaCtrl'
          }
        }
      })
      // USER UTS UAS MULAI Siswa
      .state('menuSiswa.mulaiUTSUASSiswa', {
        url: '/mulaiUTSUASSiswa',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanUTSUASSiswa: "",
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/UTSUAS/mulaiUTSUAS/mulaiUTSUAS.html',
            controller: 'mulaiUTSUASSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.nilaiUTSUASSiswa', {
        url: '/nilaiUTSUASSiswa',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanUTSUASSiswaPerPelajaran: "",
          idRekapJawabanUTSUASSiswa: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/UTSUAS/mulaiUTSUAS/nilai.html',
            controller: 'nilaiUTSUASSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.statusJawabanUTSUASSiswa', {
        url: '/statusJawabanUTSUASSiswa',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranUTSUAS: "",
          pelajaran: "",
          keterangan: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/UTSUAS/mulaiUTSUAS/statusJawaban.html',
            controller: 'statusJawabanUTSUASSiswaCtrl'
          }
        }
      })
      // USER UTS UAS DETAIL SISWA
      .state('menuSiswa.UTSUASDetailSiswa', {
        url: '/UTSUASDetailSiswa',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          utsUasTingkat: "",
          jenjang: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/UTSUAS/ujianDetail/ujianDetail.html',
            controller: 'UTSUASDetailSiswaCtrl'
          }
        }
      })
      // USER UTS UAS KISI KISI SOAL Siswa
      .state('menuSiswa.kisiKisiSoalUTSUASSiswa', {
        url: '/kisiKisiSoalUTSUASSiswa',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/UTSUAS/kisiKisiSoal/kisiKisiSoal.html',
            controller: 'kisiKisiSoalUTSUASSiswaCtrl'
          }
        }
      })
      // USER UTS UAS PESERTA Siswa
      .state('menuSiswa.pesertaUTSUASSiswa', {
        url: '/pesertaUTSUASSiswa',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/UTSUAS/pesertaUjian/pesertaUjian.html',
            controller: 'pesertaUTSUASSiswaCtrl'
          }
        }
      })
      // USER UTS UAS NILAI ANDA Siswa
      .state('menuSiswa.nilaiAndaUTSUASSiswa', {
        url: '/nilaiAndaUTSUASSiswa',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanUTSUASSiswa: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/UTSUAS/nilaiAnda/nilaiAnda.html',
            controller: 'nilaiAndaUTSUASSiswaCtrl'
          }
        }
      })
      // USER UTS UAS PERINGKAT ANDA Siswa
      .state('menuSiswa.peringkatAndaUTSUASSiswa', {
        url: '/peringkatAndaUTSUASSiswa',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          totalSiswaLolos: "",
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/UTSUAS/peringkatAnda/peringkatAnda.html',
            controller: 'peringkatAndaUTSUASSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.nilaiSiswaUTSUASSiswa', {
        url: '/nilaiSiswaUTSUASSiswa',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanUTSUASSiswa: "",
          namaPengguna: "",
          uid: "",
          jenjang: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/UTSUAS/peringkatAnda/nilaiSiswa.html',
            controller: 'nilaiSiswaUTSUASSiswaCtrl'
          }
        }

      })
      .state('menuSiswa.nilaiSiswaDetailUTSUASSiswa', {
        url: '/nilaiSiswaDetailUTSUASSiswa',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanUTSUASSiswaPerPelajaran: "",
          idRekapJawabanUTSUASSiswa: "",
          namaPengguna: "",
          uid: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/UTSUAS/peringkatAnda/nilaiSiswaDetail.html',
            controller: 'nilaiSiswaDetailUTSUASSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.statusJawabanSiswaUTSUASSiswa', {
        url: '/statusJawabanSiswaUTSUASSiswa',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranUTSUAS: "",
          pelajaran: "",
          namaPengguna: "",
          uid: "",
          keterangan: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/UTSUAS/peringkatAnda/statusJawabanSiswa.html',
            controller: 'statusJawabanSiswaUTSUASSiswaCtrl'
          }
        }
      })
      // USER UTS UAS  ONLINE SISWA
      .state('UTSUASOnlineSiswa', {
        url: '/UTSUASOnlineSiswa',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanUTSUASSiswaPerPelajaran: "",
          idRekapJawabanUTSUASSiswa: ""
        },
        templateUrl: 'templates/siswa/UTSUAS/ujian/ujianOnline.html',
        controller: 'UTSUASOnlineSiswaCtrl'
      })

      // End

      // Start Tryout Online Siswa

      // USER Tryout Online Siswa
      .state('menuSiswa.berandaTryoutOnlineSiswa', {
        url: '/berandaTryoutOnlineSiswa',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/TryoutOnline/beranda/beranda.html',
            controller: 'berandaTryoutOnlineSiswaCtrl'
          }
        }
      })
      // USER Tryout Online MULAI Siswa
      .state('menuSiswa.mulaiTryoutOnlineSiswa', {
        url: '/mulaiTryoutOnlineSiswa',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanTryoutOnlineSiswa: "",
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/TryoutOnline/mulaiTryoutOnline/mulaiTryoutOnline.html',
            controller: 'mulaiTryoutOnlineSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.nilaiTryoutOnlineSiswa', {
        url: '/nilaiTryoutOnlineSiswa',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanTryoutOnlineSiswaPerPelajaran: "",
          idRekapJawabanTryoutOnlineSiswa: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/TryoutOnline/mulaiTryoutOnline/nilai.html',
            controller: 'nilaiTryoutOnlineSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.statusJawabanTryoutOnlineSiswa', {
        url: '/statusJawabanTryoutOnlineSiswa',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryoutOnline: "",
          pelajaran: "",
          keterangan: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/TryoutOnline/mulaiTryoutOnline/statusJawaban.html',
            controller: 'statusJawabanTryoutOnlineSiswaCtrl'
          }
        }
      })
      // USER Tryout Online DETAIL SISWA
      .state('menuSiswa.TryoutOnlineDetailSiswa', {
        url: '/TryoutOnlineDetailSiswa',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          TryoutOnlineTingkat: "",
          jenjang: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/TryoutOnline/ujianDetail/ujianDetail.html',
            controller: 'TryoutOnlineDetailSiswaCtrl'
          }
        }
      })
      // USER Tryout Online KISI KISI SOAL Siswa
      .state('menuSiswa.kisiKisiSoalTryoutOnlineSiswa', {
        url: '/kisiKisiSoalTryoutOnlineSiswa',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/TryoutOnline/kisiKisiSoal/kisiKisiSoal.html',
            controller: 'kisiKisiSoalTryoutOnlineSiswaCtrl'
          }
        }
      })
      // USER Tryout Online PESERTA Siswa
      .state('menuSiswa.pesertaTryoutOnlineSiswa', {
        url: '/pesertaTryoutOnlineSiswa',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/TryoutOnline/pesertaUjian/pesertaUjian.html',
            controller: 'pesertaTryoutOnlineSiswaCtrl'
          }
        }
      })
      // USER Tryout Online NILAI ANDA Siswa
      .state('menuSiswa.nilaiAndaTryoutOnlineSiswa', {
        url: '/nilaiAndaTryoutOnlineSiswa',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanTryoutOnlineSiswa: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/TryoutOnline/nilaiAnda/nilaiAnda.html',
            controller: 'nilaiAndaTryoutOnlineSiswaCtrl'
          }
        }
      })
      // USER Tryout Online PERINGKAT ANDA Siswa
      .state('menuSiswa.peringkatAndaTryoutOnlineSiswa', {
        url: '/peringkatAndaTryoutOnlineSiswa',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          totalSiswaLolos: "",
          tingkatKelas: "",
          idTahunAjaran: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/TryoutOnline/peringkatAnda/peringkatAnda.html',
            controller: 'peringkatAndaTryoutOnlineSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.nilaiSiswaTryoutOnlineSiswa', {
        url: '/nilaiSiswaTryoutOnlineSiswa',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanTryoutOnlineSiswa: "",
          namaPengguna: "",
          uid: "",
          jenjang: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/TryoutOnline/peringkatAnda/nilaiSiswa.html',
            controller: 'nilaiSiswaTryoutOnlineSiswaCtrl'
          }
        }

      })
      .state('menuSiswa.nilaiSiswaDetailTryoutOnlineSiswa', {
        url: '/nilaiSiswaDetailTryoutOnlineSiswa',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanTryoutOnlineSiswaPerPelajaran: "",
          idRekapJawabanTryoutOnlineSiswa: "",
          namaPengguna: "",
          uid: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/TryoutOnline/peringkatAnda/nilaiSiswaDetail.html',
            controller: 'nilaiSiswaDetailTryoutOnlineSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.statusJawabanSiswaTryoutOnlineSiswa', {
        url: '/statusJawabanSiswaTryoutOnlineSiswa',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryoutOnline: "",
          pelajaran: "",
          namaPengguna: "",
          uid: "",
          keterangan: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/TryoutOnline/peringkatAnda/statusJawabanSiswa.html',
            controller: 'statusJawabanSiswaTryoutOnlineSiswaCtrl'
          }
        }
      })
      // USER Tryout Online SISWA
      .state('TryoutOnlineSiswa', {
        url: '/TryoutOnlineSiswa',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanTryoutOnlineSiswaPerPelajaran: "",
          idRekapJawabanTryoutOnlineSiswa: ""
        },
        templateUrl: 'templates/siswa/TryoutOnline/ujian/ujianOnline.html',
        controller: 'TryoutOnlineSiswaCtrl'
      })

      // End Tryout Online Siswa



      // USER UJIAN ONLINE SISWA
      .state('menuSiswa.ujianOnlineSiswa', {
        url: '/ujianOnlineSiswa',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/ujianOnline/ulanganHarian/beranda/beranda.html',
            controller: 'berandaUjianOnlineSiswaCtrl'
          }
        }
      })
      // USER UJIAN ONLINE MULAI UJIAN SISWA
      .state('menuSiswa.mulaiUjianOnlineSiswa', {
        url: '/mulaiUjianOnlineSiswa',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          idSemester: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idRekapJawabanUjianOnlineSiswa: "",
          namaSekolah: "",
          namaKelas: "",
          namaGuru: "",
          jenisUjian: "",
          tingkatKelas: "",
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/ujianOnline/ulanganHarian/mulaiUjian/mulaiUjian.html',
            controller: 'mulaiUjianOnlineSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.nilaiUjianOnlineSiswa', {
        url: '/nilaiUjianOnlineSiswa',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanUjianOnlineSiswaPerPelajaran: "",
          idRekapJawabanUjianOnlineSiswa: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/ujianOnline/ulanganHarian/mulaiUjian/nilai.html',
            controller: 'nilaiUjianOnlineSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.statusJawabanUjianOnlineSiswa', {
        url: '/statusJawabanUjianOnlineSiswa',
        params: {
          idUjian: "",
          namaUjian: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranUjianOnline: "",
          pelajaran: "",
          keterangan: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/ujianOnline/ulanganHarian/mulaiUjian/statusJawaban.html',
            controller: 'statusJawabanUjianOnlineSiswaCtrl'
          }
        }
      })
      // USER UJIAN ONLINE TEST SISWA
      .state('ujianOnlineSiswa', {
        url: '/ujianOnlineSiswa',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanUjianOnlineSiswaPerPelajaran: "",
          idRekapJawabanUjianOnlineSiswa: ""
        },
        templateUrl: 'templates/siswa/ujianOnline/ulanganHarian/ujian/ujianOnline.html',
        controller: 'ujianOnlineSiswaCtrl'
      })
      // USER UJIAN ONLINE DETAIL SISWA
      .state('menuSiswa.UjianOnlineDetaiSiswa', {
        url: '/UjianOnlineDetaiSiswa',
        params: {
          idUjian: "",
          namaUjian: "",
          olimpiadeTingkat: "",
          jenjang: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          namaSekolah: "",
          namaKelas: "",
          namaGuru: "",
          jenisUjian: "",
          tingkatKelas: "",
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/ujianOnline/ulanganHarian/ujianDetail/ujianDetail.html',
            controller: 'UjianOnlineDetaiSiswaCtrl'
          }
        }
      })
      // USER UJIAN ONLINE KISI KISI SOAL OLIMPIADE SISWA
      .state('menuSiswa.kisiKisiSoalUjianOnlineSiswa', {
        url: '/kisiKisiSoalUjianOnlineSiswa',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/ujianOnline/ulanganHarian/kisiKisiSoal/kisiKisiSoal.html',
            controller: 'kisiKisiSoalUjianOnlineSiswaCtrl'
          }
        }
      })
      // USER UJIAN ONLINE PESERTA OLIMPIADE SISWA
      .state('menuSiswa.pesertaUjianOnlineSiswa', {
        url: '/pesertaUjianOnlineSiswa',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/ujianOnline/ulanganHarian/pesertaUjian/pesertaUjian.html',
            controller: 'pesertaUjianOnlineSiswaCtrl'
          }
        }
      })
      // USER UJIAN ONLINE NILAI ANDA SISWA
      .state('menuSiswa.nilaiAndaUjianOnlineSiswa', {
        url: '/nilaiAndaUjianOnlineSiswa',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanUjianOnlineSiswa: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/ujianOnline/ulanganHarian/nilaiAnda/nilaiAnda.html',
            controller: 'nilaiAndaUjianOnlineSiswaCtrl'
          }
        }
      })
      // USER UJIAN ONLINE PERINGKAT ANDA SISWA
      .state('menuSiswa.peringkatAndaUjianOnlineSiswa', {
        url: '/peringkatAndaUjianOnlineSiswa',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          totalSiswaLolos: "",
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/ujianOnline/ulanganHarian/peringkatAnda/peringkatAnda.html',
            controller: 'peringkatAndaUjianOnlineSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.nilaiSiswaUjianOnlineSiswa', {
        url: '/nilaiSiswaUjianOnlineSiswa',
        params: {
          idUjian: "",
          namaUjian: "",
          olimpiadeTingkat: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanUjianOnlineSiswa: "",
          namaPengguna: "",
          uid: "",
          jenjang: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/ujianOnline/ulanganHarian/peringkatAnda/nilaiSiswa.html',
            controller: 'nilaiSiswaUjianOnlineSiswaCtrl'
          }
        }

      })
      .state('menuSiswa.nilaiSiswaDetailUjianOnlineSiswa', {
        url: '/nilaiSiswaDetailUjianOnlineSiswa',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanUjianOnlineSiswaPerPelajaran: "",
          idRekapJawabanUjianOnlineSiswa: "",
          namaPengguna: "",
          uid: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/ujianOnline/ulanganHarian/peringkatAnda/nilaiSiswaDetail.html',
            controller: 'nilaiSiswaDetailUjianOnlineSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.statusJawabanSiswaUjianOnlineSiswa', {
        url: '/statusJawabanSiswaUjianOnlineSiswa',
        params: {
          idUjian: "",
          namaUjian: "",
          olimpiadeTingkat: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranUjianOnline: "",
          pelajaran: "",
          namaPengguna: "",
          uid: "",
          keterangan: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/ujianOnline/ulanganHarian/peringkatAnda/statusJawabanSiswa.html',
            controller: 'statusJawabanSiswaUjianOnlineSiswaCtrl'
          }
        }
      })

      // USER LATIHAN SOAL ONLINE SISWA
      .state('menuSiswa.latihanSoalOnlineSiswa', {
        url: '/latihanSoalOnlineSiswa',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/ujianOnline/latihanSoal/beranda/beranda.html',
            controller: 'berandaLatihanSoalOnlineSiswaCtrl'
          }
        }
      })
      // USER LATIHAN SOAL ONLINE SISWA UMUM
      .state('menuSiswa.latihanSoalOnlineSiswaUmum', {
        url: '/latihanSoalOnlineSiswaUmum',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/ujianOnline/latihanSoal/berandaUmum/beranda.html',
            controller: 'berandaLatihanSoalOnlineSiswaUmumCtrl'
          }
        }
      })
      // USER KUIS ONLINE SISWA UMUM
      .state('menuSiswa.kuisOnlineSiswaUmum', {
        url: '/berandaKuisOnlineSiswaUmum',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/ujianOnline/latihanSoal/berandaKuisOnlineUmum/beranda.html',
            controller: 'berandaKuisOnlineSiswaUmumCtrl'
          }
        }
      })
      // USER TRYOUT ONLINE SISWA UMUM
      .state('menuSiswa.tryoutOnlineSiswaUmum', {
        url: '/tryoutOnlineSiswaUmum',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/ujianOnline/latihanSoal/berandaTryoutOnlineUmum/beranda.html',
            controller: 'berandaTryoutOnlineSiswaUmumCtrl'
          }
        }
      })

      // Data Akun Siswa
      .state('menuSiswa.profilPenggunaSiswa', {
        url: '/profilPenggunaSiswa',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/dataAkun/profilPengguna.html',
            controller: 'profilPenggunaSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.gantiPasswordSiswa', {
        url: '/gantiPasswordSiswa',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/dataAkun/gantiPassword.html',
            controller: 'gantiPasswordSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.uploadFotoSiswa', {
        url: '/uploadFotoSiswa',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/dataAkun/uploadFoto.html',
            controller: 'uploadFotoSiswaCtrl'
          }
        }
      })

      // Jadwal Pelajaran Siswa
      .state('menuSiswa.jadwalPelajaranSiswa', {
        url: '/jadwalPelajaranSiswa',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/jadwalPelajaran/jadwalPelajaran.html',
            controller: 'jadwalPelajaranSiswaCtrl'
          }
        }
      })

      // Absensi Siswa
      .state('menuSiswa.absensiSiswa', {
        url: '/absensiSiswa',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/absensi/absensi.html',
            controller: 'absensiSiswaCtrl'
          }
        }
      })

      // Tugas Siswa// Tugas Siswa

      .state('menuSiswa.tugasSiswaPerMapel', {
        url: '/tugasSiswaPerMapel',
        params: {
          idMapel: "",
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/tugas/tugaspermapel.html',
            controller: 'tugasSiswaPerMapelCtrl'
          }
        }
      })
      .state('menuSiswa.tugasSiswa', {
        url: '/tugasSiswa',
        params: {
          idMapel: "",
          idKelas: "",
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/tugas/tugas.html',
            controller: 'tugasSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.tugasSiswaLihat', {
        url: '/tugasSiswaLihat',
        params: {
          idTugas: "",
          pelajaran: "",
          groupTugas: '',
          tahunAjaran: '',
          semester: '',
          pelajaran: '',
          guru: '',
          kelas: '',
          sekolah: '',
          judulTugas:'',
          isiTugas: '',
          nilaiTugasSiswa: '',
          jawabanTugas: '',

          idMapel: "",
          idKelas: "",
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/tugas/tugasLihat.html',
            controller: 'tugasSiswaLihatCtrl'
          }
        }
      })
      .state('menuSiswa.tugasSiswaDiskusi', {
        url: '/tugasSiswaDiskusi',
        params: {
          idTugas: "",
          pelajaran: "",
          groupTugas: '',
          tahunAjaran: '',
          semester: '',
          pelajaran: '',
          guru: '',
          kelas: '',
          sekolah: '',
          judulTugas: '',
          isiTugas: '',
          nilaiTugasSiswa: '',
          jawabanTugas: '',
          isiChat:'',

          idMapel: "",
          idKelas: "",
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/tugas/tugasSiswaDiskusi.html',
            controller: 'tugasSiswaDiskusiCtrl'
          }
        }
      })
      .state('menuSiswa.uploadFileTugas', {
        url: '/uploadFileTugas',
        params: {
          idTugas: "",
          pelajaran: "",
          groupTugas: '',
          tahunAjaran: '',
          semester: '',
          pelajaran: '',
          namaGuru: '',
          namaKelas: '',
          namaSekolah: '',
          isiTugas: '',
          nilaiTugasSiswa: '',
          jawabanTugas: '',

          idMapel: "",
          idKelas: "",
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/tugas/uploadFile.html',
            controller: 'uploadFileTugasCtrl'
          }
        }
      })

      //Data Bank Soal Siswa
      .state('menuSiswa.bankSoalSiswa', {
        url: '/bankSoalSiswa',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/bankSoal/bankSoal.html',
            controller: 'bankSoalSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.bankSoalPerJenjangSiswa', {
        url: '/bankSoalPerJenjangSiswa',
        params: {
          pelajaran: "",
          idPelajaran: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/bankSoal/bankSoalPerJenjang.html',
            controller: 'bankSoalPerJenjangSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.bankSoalLihatSiswa', {
        url: '/bankSoalLihatSiswa',
        params: {
          pelajaran: "",
          idPelajaran: "",
          kelas: "",
          jenjang: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/bankSoal/bankSoalLihat.html',
            controller: 'bankSoalLihatSiswaCtrl'
          }
        }
      })

      //Data Materi Pelajaran Siswa
      .state('menuSiswa.materiPelajaranSiswa', {
        url: '/materiPelajaranSiswa',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/materiPelajaran/materiPelajaran.html',
            controller: 'materiPelajaranSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.materiPelajaranPerJenjangSiswa', {
        url: '/materiPelajaranPerJenjangSiswa',
        params: {
          pelajaran: "",
          idPelajaran: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/materiPelajaran/materiPelajaranPerJenjang.html',
            controller: 'materiPelajaranPerJenjangSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.materiPelajaranLihatSiswa', {
        url: '/materiPelajaranLihatSiswa',
        params: {
          pelajaran: "",
          idPelajaran: "",
          kelas: "",
          jenjang: ""
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/materiPelajaran/materiPelajaranLihat.html',
            controller: 'materiPelajaranLihatSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.materiPelajaranSubBABSiswa', {
        url: '/materiPelajaranSubBABSiswa',
        params: {
          idMateriPelajaran: "",
          BAB: ''
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/materiPelajaran/materiPelajaranSubBAB.html',
            controller: 'materiPelajaranSubBABSiswaCtrl'
          }
        }
      })

      //Data Video Tutorial Siswa
      .state('menuSiswa.videoTutorialSiswa', {
        url: '/videoTutorialSiswa',
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/videoTutorial/videoTutorial.html',
            controller: 'videoTutorialSiswaCtrl'
          }
        }
      })
      .state('menuSiswa.videoTutorialLihatSiswa', {
        url: '/videoTutorialLihatSiswa',
        params: {
          idVideo: '',
          judulVideo: '',
          keteranganVideo: ''
        },
        views: {
          'menuSiswa': {
            templateUrl: 'templates/siswa/videoTutorial/videoTutorialLihat.html',
            controller: 'videoTutorialLihatSiswaCtrl'
          }
        }
      })


      // Guru
      .state('menuGuru', {
        url: '/guru',
        templateUrl: 'templates/guru/menuGuru.html',
        controller: 'menuGuruCtrl'
      })

      .state('menuGuru.authGuru', {
        url: '/authGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/beranda/authGuru.html',
            controller: 'authGuruCtrl'
          }
        }
      })

      .state('menuGuru.berandaGuru', {
        url: '/berandaGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/beranda/beranda.html',
            controller: 'berandaGuruCtrl'
          }
        }
      })

      // Pengaturan Guru
      .state('menuGuru.tahunAjaranGuru', {
        url: '/tahunAjaranGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/pengaturan/tahunAjaran/tahunAjaran.html',
            controller: 'tahunAjaranGuruCtrl'
          }
        }
      })
      .state('menuGuru.semesterGuru', {
        url: '/semesterGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/pengaturan/semester/semester.html',
            controller: 'semesterGuruCtrl'
          }
        }
      })
      .state('menuGuru.pelajaranGuru', {
        url: '/mataPelajaranGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/pengaturan/pelajaran/pelajaran.html',
            controller: 'mataPelajaranGuruCtrl'
          }
        }
      })
      .state('menuGuru.jenisPrasaranaGuru', {
        url: '/jenisPrasaranaGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/pengaturan/jenisPrasarana/jenisPrasarana.html',
            controller: 'jenisPrasaranaGuruCtrl'
          }
        }
      })
      .state('menuGuru.jenisSaranaGuru', {
        url: '/jenisSaranaGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/pengaturan/jenisSarana/jenisSarana.html',
            controller: 'jenisSaranaGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataGuru', {
        url: '/dataGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/pengaturan/dataGuru/dataGuru.html',
            controller: 'dataGuruCtrl'
          }
        }
      })

      //Data Pokok Sekolah Guru
      .state('menuGuru.dataSekolahGuru', {
        url: '/dataSekolahGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSekolah/dataSekolah.html',
            controller: 'dataSekolahGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataSekolahPerKecamatanGuru', {
        url: '/dataSekolahPerKecamatanGuru',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSekolah/dataSekolahPerKecamatan.html',
            controller: 'dataSekolahPerKecamatanGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataSekolahPerJenjangGuru', {
        url: '/dataSekolahPerJenjangGuru',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSekolah/dataSekolahPerJenjang.html',
            controller: 'dataSekolahPerJenjangGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataSekolahListGuru', {
        url: '/dataSekolahListGuru',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: "",
          status: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSekolah/dataSekolahList.html',
            controller: 'dataSekolahListGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataSekolahTambahGuru', {
        url: '/dataSekolahTambahGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSekolah/dataSekolahTambah.html',
            controller: 'dataSekolahTambahGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataSekolahEditGuru', {
        url: '/dataSekolahEditGuru',
        params: {
          idSekolah: "",
          namaSekolah: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSekolah/dataSekolahEdit.html',
            controller: 'dataSekolahEditGuruCtrl'
          }
        }
      })

      //Data Pokok Guru Guru
      .state('menuGuru.dataPokokGuruGuru', {
        url: '/dataPokokGuruGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataGuru/dataPokokGuru.html',
            controller: 'dataPokokGuruGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataPokokGuruPerKecamatanGuru', {
        url: '/dataPokokGuruPerKecamatanGuru',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataGuru/dataPokokGuruPerKecamatan.html',
            controller: 'dataPokokGuruPerKecamatanGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataPokokGuruPerJenjangGuru', {
        url: '/dataPokokGuruPerJenjangGuru',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataGuru/dataPokokGuruPerJenjang.html',
            controller: 'dataPokokGuruPerJenjangGuruCtrl'
          }
        }
      })
      //Data Pokok Siswa Guru
      .state('menuGuru.dataPokokSiswaGuru', {
        url: '/dataPokokSiswaGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSiswa/dataPokokSiswa.html',
            controller: 'dataPokokSiswaGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataPokokSiswaPerKecamatanGuru', {
        url: '/dataPokokSiswaPerKecamatanGuru',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSiswa/dataPokokSiswaPerKecamatan.html',
            controller: 'dataPokokSiswaPerKecamatanGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataPokokSiswaPerJenjangGuru', {
        url: '/dataPokokSiswaPerJenjangGuru',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSiswa/dataPokokSiswaPerJenjang.html',
            controller: 'dataPokokSiswaPerJenjangGuruCtrl'
          }
        }
      })
      //Data Pokok Rombel Guru
      .state('menuGuru.dataPokokRombelGuru', {
        url: '/dataPokokRombelGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataRombel/dataPokokRombel.html',
            controller: 'dataPokokRombelGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataPokokRombelPerKecamatanGuru', {
        url: '/dataPokokRombelPerKecamatanGuru',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataRombel/dataPokokRombelPerKecamatan.html',
            controller: 'dataPokokRombelPerKecamatanGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataPokokRombelPerJenjangGuru', {
        url: '/dataPokokRombelPerJenjangGuru',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataRombel/dataPokokRombelPerJenjang.html',
            controller: 'dataPokokRombelPerJenjangGuruCtrl'
          }
        }
      })
      //Data Pokok Prasarana Guru
      .state('menuGuru.dataPokokPrasaranaGuru', {
        url: '/dataPokokPrasaranaGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataPrasarana/dataPokokPrasarana.html',
            controller: 'dataPokokPrasaranaGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataPokokPrasaranaPerKecamatanGuru', {
        url: '/dataPokokPrasaranaPerKecamatanGuru',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataPrasarana/dataPokokPrasaranaPerKecamatan.html',
            controller: 'dataPokokPrasaranaPerKecamatanGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataPokokPrasaranaPerJenjangGuru', {
        url: '/dataPokokPrasaranaPerJenjangGuru',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataPrasarana/dataPokokPrasaranaPerJenjang.html',
            controller: 'dataPokokPrasaranaPerJenjangGuruCtrl'
          }
        }
      })
      //Data Pokok Sarana Guru
      .state('menuGuru.dataPokokSaranaGuru', {
        url: '/dataPokokSaranaGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSarana/dataPokokSarana.html',
            controller: 'dataPokokSaranaGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataPokokSaranaPerKecamatanGuru', {
        url: '/dataPokokSaranaPerKecamatanGuru',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSarana/dataPokokSaranaPerKecamatan.html',
            controller: 'dataPokokSaranaPerKecamatanGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataPokokSaranaPerJenjangGuru', {
        url: '/dataPokokSaranaPerJenjangGuru',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSarana/dataPokokSaranaPerJenjang.html',
            controller: 'dataPokokSaranaPerJenjangGuruCtrl'
          }
        }
      })

      //Data Prasarana Sekolah Guru
      .state('menuGuru.dataPrasaranaGuru', {
        url: '/dataPrasaranaGuru',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: "",
          namaKecamatan: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataPrasarana/dataPrasarana.html',
            controller: 'dataPrasaranaGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataSaranaGuru', {
        url: '/dataSaranaGuru',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: "",
          namaKecamatan: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSarana/dataSarana.html',
            controller: 'dataSaranaGuruCtrl'
          }
        }
      })

      //Data Kelas Guru
      .state('menuGuru.dataKelasGuru', {
        url: '/dataKelasGuru',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataRombel/dataRombel.html',
            controller: 'dataRombelGuruCtrl'
          }
        }
      })

      //Data Lintas Minat Sekolah
      .state('menuGuru.lintasMinatGuru', {
        url: '/lintasMinatGuru',
        params: {
          idKelas: "",
          tingkatKelas: "",
          jenisRombel: "",
          namaKelas: "",
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataRombel/lintasMinat.html',
            controller: 'lintasMinatGuruCtrl'
          }
        }
      })
      //Data Migrasi Siswa Sekolah
      .state('menuSekolah.migrasiSiswaSekolah', {
        url: '/migrasiSiswaSekolah',
        params: {
          dataKelas: "",
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataRombel/migrasiSiswa.html',
            controller: 'migrasiSiswaSekolahCtrl'
          }
        }
      })
      //Data Migrasi Siswa Sekolah Detail
      .state('menuSekolah.migrasiSiswaDetailSekolah', {
        url: '/migrasiSiswaDetailSekolah',
        params: {
          idKelas: "",
          idTahunAjaran: "",
          namaKelas: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataRombel/migrasiSiswaDetail.html',
            controller: 'migrasiSiswaDetailSekolahCtrl'
          }
        }
      })

      .state('menuGuru.lintasMinatDetailGuru', {
        url: '/lintasMinatDetailGuru',
        params: {
          idKelas: "",
          tingkatKelas: "",
          jenisRombel: "",
          namaKelas: "",
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataRombel/lintasMinatDetail.html',
            controller: 'lintasMinatDetailGuruCtrl'
          }
        }
      })

      //Data Guru Guru
      .state('menuGuru.dataGuruGuru', {
        url: '/dataGuruGuru',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataGuru/dataGuru.html',
            controller: 'dataGuruGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataGuruTambahGuru', {
        url: '/dataGuruTambahGuru',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataGuru/dataGuruTambah.html',
            controller: 'dataGuruTambahGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataGuruEditGuru', {
        url: '/dataGuruEditGuru',
        params: {
          idGuru: "",
          namaPengguna: "",
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataGuru/dataGuruEdit.html',
            controller: 'dataGuruEditGuruCtrl'
          }
        }
      })

      //Data Siswa Guru
      .state('menuGuru.dataSiswaGuru', {
        url: '/dataSiswaGuru',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSiswa/dataSiswa.html',
            controller: 'dataSiswaGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataSiswaTambahGuru', {
        url: '/dataSiswaTambahGuru',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSiswa/dataSiswaTambah.html',
            controller: 'dataSiswaTambahGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataSiswaEditGuru', {
        url: '/dataSiswaEditGuru',
        params: {
          idSiswa: "",
          namaSiswa: "",
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSiswa/dataSiswaEdit.html',
            controller: 'dataSiswaEditGuruCtrl'
          }
        }
      })
      .state('menuGuru.dataSiswaLihatGuru', {
        url: '/dataSiswaLihatGuru',
        params: {
          idSiswa: "",
          namaSiswa: "",
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataPokokSekolah/dataSiswa/dataSiswaLihat.html',
            controller: 'dataSiswaLihatGuruCtrl'
          }
        }
      })

      //Data Video Tutorial Guru
      .state('menuGuru.videoTutorialGuru', {
        url: '/videoTutorialGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/videoTutorial/videoTutorial.html',
            controller: 'videoTutorialGuruCtrl'
          }
        }
      })
      .state('menuGuru.videoTutorialLihatGuru', {
        url: '/videoTutorialLihatGuru',
        params: {
          idVideo: '',
          judulVideo: '',
          keteranganVideo: ''
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/videoTutorial/videoTutorialLihat.html',
            controller: 'videoTutorialLihatGuruCtrl'
          }
        }
      })

      //Data Jadwal Pelajaran Guru
      .state('menuGuru.jadwalPelajaranGuru', {
        url: '/jadwalPelajaranGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/kurikulum/jadwalPelajaran/jadwalPelajaran.html',
            controller: 'jadwalPelajaranGuruCtrl'
          }
        }
      })
      .state('menuGuru.jadwalPelajaranTambahGuru', {
        url: '/jadwalPelajaranTambahGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/kurikulum/jadwalPelajaran/jadwalPelajaranTambah.html',
            controller: 'jadwalPelajaranTambahGuruCtrl'
          }
        }
      })
      .state('menuGuru.jadwalPelajaranLihatGuru', {
        url: '/jadwalPelajaranLihatGuru',
        params: {
          filterGuru: "",
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/kurikulum/jadwalPelajaran/jadwalPelajaranLihat.html',
            controller: 'jadwalPelajaranLihatGuruCtrl'
          }
        }
      })
      .state('menuGuru.jadwalPelajaranLihatDetailGuru', {
        url: '/jadwalPelajaranLihatDetailGuru',
        params: {
          filterGuru: "",
          hari: "",
          tahunAjaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/kurikulum/jadwalPelajaran/jadwalPelajaranLihatDetail.html',
            controller: 'jadwalPelajaranLihatDetailGuruCtrl'
          }
        }
      })
      .state('menuGuru.jadwalPelajaranEditGuru', {
        url: '/jadwalPelajaranEditGuru',
        params: {
          idJadwalPelajaran: "",
          hari: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/kurikulum/jadwalPelajaran/jadwalPelajaranEdit.html',
            controller: 'jadwalPelajaranEditGuruCtrl'
          }
        }
      })

      //Data Absensi Siswa Guru
      .state('menuGuru.absensiSiswaGuru', {
        url: '/absensiSiswaGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/absensi/siswa/absensiSiswa.html',
            controller: 'absensiSiswaGuruCtrl'
          }
        }
      })
      .state('menuGuru.absensiSiswaTambahGuru', {
        url: '/absensiSiswaTambahGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/absensi/siswa/absensiSiswaTambah.html',
            controller: 'absensiSiswaTambahGuruCtrl'
          }
        }
      })
      .state('menuGuru.absensiSiswaLihatGuru', {
        url: '/absensiSiswaLihatGuru',
        params: {
          groupAbsensi: '',
          "tahunAjaran": '',
          "semester": '',
          "pelajaran": '',
          "namaGuru": '',
          "namaKelas": '',
          "tanggalDisplay": '',
          "namaSekolah": '',
          "dataGetAbs": '',
          "absensiByGroup": ''
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/absensi/siswa/absensiSiswaLihat.html',
            controller: 'absensiSiswaLihatGuruCtrl'
          }
        }
      })
      .state('menuGuru.absensiSiswaEditGuru', {
        url: '/absensiSiswaEditGuru',
        params: {
          groupAbsensi: '',
          "tahunAjaran": '',
          "semester": '',
          "pelajaran": '',
          "namaGuru": '',
          "namaKelas": '',
          "tanggalDisplay": '',
          "namaSekolah": '',
          "dataGetAbs": '',
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/absensi/siswa/absensiSiswaEdit.html',
            controller: 'absensiSiswaEditGuruCtrl'
          }
        }
      })

      //Data Tugas Siswa Guru
      
      .state('menuGuru.tugasSiswaGuru', {
        url: '/tugasSiswaGuru',
        params: {
          dataTugasSiswa: '',
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tugas/siswa/tugasSiswa.html',
            controller: 'tugasSiswaGuruCtrl'
          }
        }
      })
      .state('menuGuru.tugasSiswaTambahGuru', {
        url: '/tugasSiswaTambahGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tugas/siswa/tugasSiswaTambah.html',
            controller: 'tugasSiswaTambahGuruCtrl'
          }
        }
      })
      .state('menuGuru.tugasSiswaLihatGuru', {
        url: '/tugasSiswaLihatGuru',
        params: {
          groupTugas: '',
          idGroupTugasSiswa: '',
          namaKecamatan: '',

          tahunAjaran: '',
          semester: '',
          pelajaran: '',
          namaGuru: '',
          namaKelas: '',
          namaSekolah: '',

          judulTugas:'',
          isiTugas: '',
          tanggalPengumpulanTugas: '',
          getTugas: '',

          idKelas: '',
          idMapel: '',
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tugas/siswa/tugasSiswaLihat.html',
            controller: 'tugasSiswaLihatGuruCtrl'
          }
        }
      })
      .state('menuGuru.tugasSiswaDiskusiGuru', {
        url: '/tugasSiswaDiskusiGuru',
        params: {
          groupTugas: '',
          idGroupTugasSiswa: '',
          namaKecamatan: '',

          tahunAjaran: '',
          semester: '',
          pelajaran: '',
          namaGuru: '',
          namaKelas: '',
          namaSekolah: '',

          judulTugas:'',
          isiTugas: '',
          tanggalPengumpulanTugas: '',
          getTugas: '',
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tugas/siswa/tugasSiswaDiskusi.html',
            controller: 'tugasSiswaDiskusiGuruCtrl'
          }
        }
      })
      .state('menuGuru.tugasSiswaEditGuru', {
        url: '/tugasSiswaEditGuru',
        params: {
          groupTugas: '',
          idGroupTugasSiswa: '',
          namaKecamatan: '',

          tahunAjaran: '',
          semester: '',
          pelajaran: '',
          namaGuru: '',
          namaKelas: '',
          namaSekolah: '',

          judulTugas:'',
          isiTugas: '',
          tanggalPengumpulanTugas: '',
          getTugas: '',

          publish: '',

          idMapel: '',
          idKelas: '',
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tugas/siswa/tugasSiswaEdit.html',
            controller: 'tugasSiswaEditGuruCtrl'
          }
        }
      })
      .state('menuGuru.LihatJawabanTugasSiswa', {
        url: '/LihatJawabanTugasSiswa',
        params: {
          idTugas: '',
          groupTugas: '',
          namaSiswa: '',
          namaKecamatan: '',

          tahunAjaran: '',
          semester: '',
          pelajaran: '',
          namaGuru: '',
          namaKelas: '',
          namaSekolah: '',

          jawabanTugas: '',
          nilaiTugasSiswa: '',
          judulTugas:'',
          isiTugas: '',
          tanggalPengumpulanTugas: '',

          fileSiswa: '',

          idKelas: '',
          idMapel: '',
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tugas/siswa/tugasSiswaJawaban.html',
            controller: 'LihatJawabanTugasSiswaCtrl'
          }
        }
      })
      .state('menuGuru.tugasTambahSiswaGuru', {
        url: '/tugasTambahSiswaGuru',
        params: {
          groupTugas: '',
          idGroupTugasSiswa: '',
          idGuru: '',
          idKelas: '',
          namaKecamatan: '',
          idMapel: '',
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tugas/siswa/tugasSiswaTambahSiswa.html',
            controller: 'tugasSiswaTambahSiswaGuruCtrl'
          }
        }
      })

      //Data Bank Soal Guru
      .state('menuGuru.bankSoalGuru', {
        url: '/bankSoalGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/bankSoal/bankSoal.html',
            controller: 'bankSoalGuruCtrl'
          }
        }
      })
      .state('menuGuru.bankSoalTambahGuru', {
        url: '/bankSoalTambahGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/bankSoal/bankSoalTambah.html',
            controller: 'bankSoalTambahGuruCtrl'
          }
        }
      })
      .state('menuGuru.bankSoalPerJenjangGuru', {
        url: '/bankSoalPerJenjangGuru',
        params: {
          pelajaran: "",
          idPelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/bankSoal/bankSoalPerJenjang.html',
            controller: 'bankSoalPerJenjangGuruCtrl'
          }
        }
      })
      .state('menuGuru.bankSoalLihatGuru', {
        url: '/bankSoalLihatGuru',
        params: {
          pelajaran: "",
          idPelajaran: "",
          kelas: "",
          jenjang: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/bankSoal/bankSoalLihat.html',
            controller: 'bankSoalLihatGuruCtrl'
          }
        }
      })
      .state('menuGuru.bankSoalEditGuru', {
        url: '/bankSoalEditGuru',
        params: {
          idSoal: "",
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/bankSoal/bankSoalEdit.html',
            controller: 'bankSoalEditGuruCtrl'
          }
        }
      })

      //Data Materi Pelajaran Guru
      .state('menuGuru.materiPelajaranGuru', {
        url: '/materiPelajaranGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/materiPelajaran/materiPelajaran.html',
            controller: 'materiPelajaranGuruCtrl'
          }
        }
      })
      .state('menuGuru.materiPelajaranTambahGuru', {
        url: '/materiPelajaranTambahGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/materiPelajaran/materiPelajaranTambah.html',
            controller: 'materiPelajaranTambahGuruCtrl'
          }
        }
      })
      .state('menuGuru.materiPelajaranPerJenjangGuru', {
        url: '/materiPelajaranPerJenjangGuru',
        params: {
          pelajaran: "",
          idPelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/materiPelajaran/materiPelajaranPerJenjang.html',
            controller: 'materiPelajaranPerJenjangGuruCtrl'
          }
        }
      })
      .state('menuGuru.materiPelajaranLihatGuru', {
        url: '/materiPelajaranLihatGuru',
        params: {
          pelajaran: "",
          idPelajaran: "",
          kelas: "",
          jenjang: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/materiPelajaran/materiPelajaranLihat.html',
            controller: 'materiPelajaranLihatGuruCtrl'
          }
        }
      })
      .state('menuGuru.materiPelajaranSubBABGuru', {
        url: '/materiPelajaranSubBABGuru',
        params: {
          idMateriPelajaran: "",
          BAB: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/materiPelajaran/materiPelajaranSubBAB.html',
            controller: 'materiPelajaranSubBABGuruCtrl'
          }
        }
      })
      .state('menuGuru.materiPelajaranSubBABTambahGuru', {
        url: '/materiPelajaranSubBABTambahGuru',
        params: {
          idMateriPelajaran: "",
          BAB: ''
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/materiPelajaran/materiPelajaranSubBABTambah.html',
            controller: 'materiPelajaranSubBABTambahGuruCtrl'
          }
        }
      })
      .state('menuGuru.materiPelajaranSubBABEditGuru', {
        url: '/materiPelajaranSubBABTambahGuru',
        params: {
          idMateriPelajaran: "",
          BAB: '',
          idSubBAB: '',
          namaSubBAB: ''
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/materiPelajaran/materiPelajaranSubBABEdit.html',
            controller: 'materiPelajaranSubBABEditGuruCtrl'
          }
        }
      })
      .state('menuGuru.materiPelajaranEditGuru', {
        url: '/materiPelajaranEditGuru',
        params: {
          idMateriPelajaran: "",
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/materiPelajaran/materiPelajaranEdit.html',
            controller: 'materiPelajaranEditGuruCtrl'
          }
        }
      })

      // Data Akun Guru
      .state('menuGuru.profilPenggunaGuru', {
        url: '/profilPenggunaGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataAkun/profilPengguna.html',
            controller: 'profilPenggunaGuruCtrl'
          }
        }
      })
      .state('menuGuru.gantiPasswordGuru', {
        url: '/gantiPasswordGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataAkun/gantiPassword.html',
            controller: 'gantiPasswordGuruCtrl'
          }
        }
      })
      .state('menuGuru.uploadFotoGuru', {
        url: '/uploadFotoGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/dataAkun/uploadFoto.html',
            controller: 'uploadFotoGuruCtrl'
          }
        }
      })

      // Data SOC Guru
      .state('menuGuru.socGuru', {
        url: '/socGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/beranda/beranda.html',
            controller: 'berandaSOCGuruCtrl'
          }
        }
      })
      .state('menuGuru.tambahSOCGuru', {
        url: '/tambahSOCGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/beranda/tambahSOC.html',
            controller: 'tambahSOCGuruCtrl'
          }
        }
      })
      .state('menuGuru.editSOCGuru', {
        url: '/editSOCGuru',
        params: {
          idTryout: "",
          namaTryout: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/beranda/editSOC.html',
            controller: 'editSOCGuruCtrl'
          }
        }
      })
      // Data SOC Pelajaran Guru
      .state('menuGuru.pelajaranSOCGuru', {
        url: '/pelajaranSOCGuru',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          olimpiadeTingkat: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/pelajaran/pelajaran.html',
            controller: 'pelajaranSOCGuruCtrl'
          }
        }
      })
      .state('menuGuru.tambahPelajaranSOCGuru', {
        url: '/tambahPelajaranSOCGuru',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/pelajaran/tambahPelajaran.html',
            controller: 'tambahPelajaranSOCGuruCtrl'
          }
        }
      })
      // Data SOC Pengaturan Umum Guru
      .state('menuGuru.pengaturanUmumSOCGuru', {
        url: '/pengaturanUmumSOCGuru',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/pengaturanUmum/pengaturanUmum.html',
            controller: 'pengaturanUmumSOCGuruCtrl'
          }
        }
      })
      .state('menuGuru.kisiKisiSoalSOCGuru', {
        url: '/kisiKisiSoalSOCGuru',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/pengaturanUmum/kisiKisiSoal.html',
            controller: 'kisiKisiSoalSOCGuruCtrl'
          }
        }
      })
      .state('menuGuru.resetJawabanPesertaSOCGuru', {
        url: '/resetJawabanPesertaSOCGuru',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/pengaturanUmum/resetJawabanPeserta.html',
            controller: 'resetJawabanPesertaSOCGuruCtrl'
          }
        }
      })
      .state('menuGuru.ulangUjianSOCGuru', {
        url: '/ulangUjianSOCGuru',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/pengaturanUmum/ulangUjian.html',
            controller: 'ulangUjianSOCGuruCtrl'
          }
        }
      })
      .state('menuGuru.tambahSoalOlimpiadeSOCGuru', {
        url: '/tambahSoalOlimpiadeSOCGuru',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: "",
          kelas: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/pengaturanUmum/tambahSoalOlimpiade.html',
            controller: 'tambahSoalOlimpiadeSOCGuruCtrl'
          }
        }
      })
      .state('menuGuru.soalOlimpiadeDetailSOCGuru', {
        url: '/soalOlimpiadeDetailSOCGuru',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/pengaturanUmum/soalOlimpiadeDetail.html',
            controller: 'soalOlimpiadeDetailSOCGuruCtrl'
          }
        }
      })

      //Data SOC Registrasi Peserta Guru
      .state('menuGuru.registrasiPesertaSOCGuru', {
        url: '/registrasiPesertaSOCGuru',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          id_kota_kabupaten: "",
          olimpiadeTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/registrasiPeserta/registrasiPeserta.html',
            controller: 'registrasiPesertaSOCGuruCtrl'
          }
        }
      })
      .state('menuGuru.registrasiPesertaKotaSOCGuru', {
        url: '/registrasiPesertaKotaSOCGuru',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          id_kota_kabupaten: "",
          olimpiadeTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/registrasiPeserta/registrasiPesertaKota.html',
            controller: 'registrasiPesertaKotaSOCGuruCtrl'
          }
        }
      })
      .state('menuGuru.pesertaTeregistrasiSOCGuru', {
        url: '/pesertaTeregistrasiSOCGuru',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          id_kota_kabupaten: "",
          olimpiadeTingkat: "",
          id_provinsi: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/registrasiPeserta/pesertaTeregistrasi.html',
            controller: 'pesertaTeregistrasiSOCGuruCtrl'
          }
        }
      })
      .state('menuGuru.logHistoriSOCGuru', {
        url: '/logHistoriSOCGuru',
        params: {
          "idTryout": "",
          "namaTryout": "",
          "jenjang": "",
          "kelas": "",
          "id_kota_kabupaten": "",
          "olimpiadeTingkat": "",
          "id_provinsi": ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/registrasiPeserta/logHistoriPeserta.html',
            controller: 'logHistoriSOCGuruCtrl'
          }
        }
      })

      //Nilai Peringkat SOC Guru
      .state('menuGuru.nilaiPeringkatSOCGuru', {
        url: '/nilaiPeringkatSOCGuru',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          totalSiswaLolos: "",
          tanggalPelaksanaan: "",
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/nilaiPeringkat/nilaiPeringkatNew.html',
            controller: 'nilaiPeringkatSOCGuruCtrl'
          }
        }
      })

      .state('menuGuru.nilaiSiswaSOCGuru', {
        url: '/nilaiSiswaSOCGuru',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          namaSekolah: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanOlimpiadeSiswa: "",
          namaPengguna: "",
          uid: "",
          lulus: "",
          tanggalPelaksanaan: "",
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/nilaiPeringkat/nilaiSiswa.html',
            controller: 'nilaiSiswaSOCGuruCtrl'
          }
        }
      })

      .state('menuGuru.nilaiSiswaDetailSOCGuru', {
        url: '/nilaiSiswaDetailSOCGuru',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanOlimpiadeSiswaPerPelajaran: "",
          idRekapJawabanOlimpiadeSiswa: "",
          namaPengguna: "",
          uid: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/nilaiPeringkat/nilaiSiswaDetail.html',
            controller: 'nilaiSiswaDetailSOCGurulCtrl'
          }
        }
      })

      .state('menuGuru.statusJawabanSiswaSOCGuru', {
        url: '/statusJawabanSiswaSOCGuru',
        params: {
          idTryout: "",
          namaTryout: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryout: "",
          pelajaran: "",
          namaPengguna: "",
          uid: "",
          keterangan: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/soc/nilaiPeringkat/statusJawabanSiswa.html',
            controller: 'statusJawabanSiswaSOCGuruCtrl'
          }
        }
      })

      // Data UTS UAS Guru
      .state('menuGuru.UTSUASGuru', {
        url: '/utsUasGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/beranda/beranda.html',
            controller: 'berandaUTSUASGuruCtrl'
          }
        }
      })
      .state('menuGuru.tambahUTSUASGuru', {
        url: '/tambahUTSUASGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/beranda/tambahSOC.html',
            controller: 'tambahUTSUASGuruCtrl'
          }
        }
      })
      .state('menuGuru.editUTSUASGuru', {
        url: '/editUTSUASGuru',
        params: {
          idUTSUAS: "",
          namaUTSUAS: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/beranda/editSOC.html',
            controller: 'editUTSUASGuruCtrl'
          }
        }
      })
      // Data UTS / UAS Pelajaran Guru
      .state('menuGuru.pelajaranUTSUASGuru', {
        url: '/pelajaranUTSUASGuru',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          utsUasTingkat: "",
          namaSekolah: "",
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/pelajaran/pelajaran.html',
            controller: 'pelajaranUTSUASGuruCtrl'
          }
        }
      })
      .state('menuGuru.tambahPelajaranUTSUASGuru', {
        url: '/tambahPelajaranUTSUASGuru',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/pelajaran/tambahPelajaran.html',
            controller: 'tambahPelajaranUTSUASGuruCtrl'
          }
        }
      })
      // Data UTS UAS Pengaturan Umum Guru
      .state('menuGuru.pengaturanUmumUTSUASGuru', {
        url: '/pengaturanUmumUTSUASGuru',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/pengaturanUmum/pengaturanUmum.html',
            controller: 'pengaturanUmumUTSUASGuruCtrl'
          }
        }
      })
      .state('menuGuru.kisiKisiSoalUTSUASGuru', {
        url: '/kisiKisiSoalUTSUASGuru',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/pengaturanUmum/kisiKisiSoal.html',
            controller: 'kisiKisiSoalUTSUASGuruCtrl'
          }
        }
      })
      .state('menuGuru.resetJawabanPesertaUTSUASGuru', {
        url: '/resetJawabanPesertaUTSUASGuru',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/pengaturanUmum/resetJawabanPeserta.html',
            controller: 'resetJawabanPesertaUTSUASGuruCtrl'
          }
        }
      })
      .state('menuGuru.ulangUjianUTSUASGuru', {
        url: '/ulangUjianUTSUASGuru',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/pengaturanUmum/ulangUjian.html',
            controller: 'ulangUjianUTSUASGuruCtrl'
          }
        }
      })
      .state('menuGuru.tambahSoalUTSUASGuru', {
        url: '/tambahSoalUTSUASGuru',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: "",
          tingkatKelas: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/pengaturanUmum/tambahSoalOlimpiade.html',
            controller: 'tambahSoalUTSUASGuruCtrl'
          }
        }
      })
      .state('menuGuru.soalDetailUTSUASGuru', {
        url: '/soalDetailUTSUASGuru',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/pengaturanUmum/soalOlimpiadeDetail.html',
            controller: 'soalDetailUTSUASGuruCtrl'
          }
        }
      })
      //Data UTS UAS Registrasi Peserta Guru
      .state('menuGuru.registrasiPesertaUTSUASGuru', {
        url: '/registrasiPesertaUTSUASGuru',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          utsUasTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/registrasiPeserta/registrasiPeserta.html',
            controller: 'registrasiPesertaUTSUASGuruCtrl'
          }
        }
      })
      .state('menuGuru.registrasiPesertaKotaUTSUASGuru', {
        url: '/registrasiPesertaKotaUTSUASGuru',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          utsUasTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/registrasiPeserta/registrasiPesertaKota.html',
            controller: 'registrasiPesertaKotaUTSUASGuruCtrl'
          }
        }
      })
      .state('menuGuru.pesertaTeregistrasiUTSUASGuru', {
        url: '/pesertaTeregistrasiUTSUASGuru',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          utsUasTingkat: "",
          id_provinsi: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/registrasiPeserta/pesertaTeregistrasi.html',
            controller: 'pesertaTeregistrasiUTSUASGuruCtrl'
          }
        }
      })
      .state('menuGuru.logHistoriUTSUASGuru', {
        url: '/logHistoriUTSUASGuru',
        params: {
          "idUTSUAS": "",
          "namaUTSUAS": "",
          "jenjang": "",
          "tingkatKelas": "",
          "id_kota_kabupaten": "",
          "utsUasTingkat": "",
          "id_provinsi": ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/registrasiPeserta/logHistoriPeserta.html',
            controller: 'logHistoriUTSUASGuruCtrl'
          }
        }
      })
      //Nilai Peringkat UTS UAS Guru
      .state('menuGuru.nilaiPeringkatUTSUASGuru', {
        url: '/nilaiPeringkatUTSUASGuru',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          tingkatKelas: "",
          idTahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/nilaiPeringkat/nilaiPeringkat.html',
            controller: 'nilaiPeringkatUTSUASGuruCtrl'
          }
        }
      })
      .state('menuGuru.nilaiSiswaUTSUASGuru', {
        url: '/nilaiSiswaUTSUASGuru',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          namaSekolah: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanUTSUASSiswa: "",
          namaPengguna: "",
          uid: "",
          lulus: "",
          tanggalPelaksanaan: "",
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/nilaiPeringkat/nilaiSiswa.html',
            controller: 'nilaiSiswaUTSUASGuruCtrl'
          }
        }
      })
      .state('menuGuru.nilaiSiswaDetailUTSUASGuru', {
        url: '/nilaiSiswaDetailUTSUASGuru',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanUTSUASSiswaPerPelajaran: "",
          idRekapJawabanUTSUASSiswa: "",
          namaPengguna: "",
          uid: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/nilaiPeringkat/nilaiSiswaDetail.html',
            controller: 'nilaiSiswaDetailUTSUASGuruCtrl'
          }
        }
      })
      .state('menuGuru.statusJawabanSiswaUTSUASGuru', {
        url: '/statusJawabanSiswaUTSUASGuru',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranUTSUAS: "",
          pelajaran: "",
          namaPengguna: "",
          uid: "",
          keterangan: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/UTSUAS/nilaiPeringkat/statusJawabanSiswa.html',
            controller: 'statusJawabanSiswaUTSUASGuruCtrl'
          }
        }
      })

      // Data Tryout Online Guru
      .state('menuGuru.tryoutOnlineGuru', {
        url: '/tryoutOnlineGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/beranda/beranda.html',
            controller: 'berandaTryoutOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.tambahTryoutOnlineGuru', {
        url: '/tambahTryoutOnlineGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/beranda/tambahTryoutOnline.html',
            controller: 'tambahTryoutOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.editTryoutOnlineGuru', {
        url: '/editTryoutOnlineGuru',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/beranda/editTryoutOnline.html',
            controller: 'editTryoutOnlineGuruCtrl'
          }
        }
      })
      // Data Tryout Online Pelajaran Guru
      .state('menuGuru.pelajaranTryoutOnlineGuru', {
        url: '/pelajaranTryoutOnlineGuru',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          TryoutOnlineTingkat: "",
          namaSekolah: "",
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/pelajaran/pelajaran.html',
            controller: 'pelajaranTryoutOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.tambahPelajaranTryoutOnlineGuru', {
        url: '/tambahPelajaranTryoutOnlineGuru',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/pelajaran/tambahPelajaran.html',
            controller: 'tambahPelajaranTryoutOnlineGuruCtrl'
          }
        }
      })
      // Data Tryout Online Pengaturan Umum Guru
      .state('menuGuru.pengaturanUmumTryoutOnlineGuru', {
        url: '/pengaturanUmumTryoutOnlineGuru',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/pengaturanUmum/pengaturanUmum.html',
            controller: 'pengaturanUmumTryoutOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.kisiKisiSoalTryoutOnlineGuru', {
        url: '/kisiKisiSoalTryoutOnlineGuru',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/pengaturanUmum/kisiKisiSoal.html',
            controller: 'kisiKisiSoalTryoutOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.resetJawabanPesertaTryoutOnlineGuru', {
        url: '/resetJawabanPesertaTryoutOnlineGuru',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/pengaturanUmum/resetJawabanPeserta.html',
            controller: 'resetJawabanPesertaTryoutOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.ulangUjianTryoutOnlineGuru', {
        url: '/ulangUjianTryoutOnlineGuru',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/pengaturanUmum/ulangUjian.html',
            controller: 'ulangUjianTryoutOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.tambahSoalTryoutOnlineGuru', {
        url: '/tambahSoalTryoutOnlineGuru',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: "",
          tingkatKelas: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/pengaturanUmum/tambahSoalOlimpiade.html',
            controller: 'tambahSoalTryoutOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.soalDetailTryoutOnlineGuru', {
        url: '/soalDetailTryoutOnlineGuru',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/pengaturanUmum/soalOlimpiadeDetail.html',
            controller: 'soalDetailTryoutOnlineGuruCtrl'
          }
        }
      })
      //Data Tryout Online Registrasi Peserta Guru
      .state('menuGuru.registrasiPesertaTryoutOnlineGuru', {
        url: '/registrasiPesertaTryoutOnlineGuru',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          TryoutOnlineTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/registrasiPeserta/registrasiPeserta.html',
            controller: 'registrasiPesertaTryoutOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.registrasiPesertaKotaTryoutOnlineGuru', {
        url: '/registrasiPesertaKotaTryoutOnlineGuru',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          TryoutOnlineTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/registrasiPeserta/registrasiPesertaKota.html',
            controller: 'registrasiPesertaKotaTryoutOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.pesertaTeregistrasiTryoutOnlineGuru', {
        url: '/pesertaTeregistrasiTryoutOnlineGuru',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          TryoutOnlineTingkat: "",
          id_provinsi: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/TryoutOnline/registrasiPeserta/pesertaTeregistrasi.html',
            controller: 'pesertaTeregistrasiTryoutOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.logHistoriTryoutOnlineGuru', {
        url: '/logHistoriTryoutOnlineGuru',
        params: {
          "idTryoutOnline": "",
          "namaTryoutOnline": "",
          "jenjang": "",
          "tingkatKelas": "",
          "id_kota_kabupaten": "",
          "TryoutOnlineTingkat": "",
          "id_provinsi": ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/registrasiPeserta/logHistoriPeserta.html',
            controller: 'logHistoriTryoutOnlineGuruCtrl'
          }
        }
      })
      //Nilai Peringkat TryoutOnline Guru
      .state('menuGuru.nilaiPeringkatTryoutOnlineGuru', {
        url: '/nilaiPeringkatTryoutOnlineGuru',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          tingkatKelas: "",
          idTahunAjaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/nilaiPeringkat/nilaiPeringkat.html',
            controller: 'nilaiPeringkatTryoutOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.nilaiSiswaTryoutOnlineGuru', {
        url: '/nilaiSiswaTryoutOnlineGuru',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          namaSekolah: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanTryoutOnlineSiswa: "",
          namaPengguna: "",
          uid: "",
          lulus: "",
          tanggalPelaksanaan: "",
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/nilaiPeringkat/nilaiSiswa.html',
            controller: 'nilaiSiswaTryoutOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.nilaiSiswaDetailTryoutOnlineGuru', {
        url: '/nilaiSiswaDetailTryoutOnlineGuru',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanTryoutOnlineSiswaPerPelajaran: "",
          idRekapJawabanTryoutOnlineSiswa: "",
          namaPengguna: "",
          uid: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/nilaiPeringkat/nilaiSiswaDetail.html',
            controller: 'nilaiSiswaDetailTryoutOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.statusJawabanSiswaTryoutOnlineGuru', {
        url: '/statusJawabanSiswaTryoutOnlineGuru',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryoutOnline: "",
          pelajaran: "",
          namaPengguna: "",
          uid: "",
          keterangan: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/tryoutOnline/nilaiPeringkat/statusJawabanSiswa.html',
            controller: 'statusJawabanSiswaTryoutOnlineGuruCtrl'
          }
        }
      })

      // Data Ujian Online Guru
      .state('menuGuru.ujianOnlineGuru', {
        url: '/ujianOnlineGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/beranda/beranda.html',
            controller: 'berandaUjianOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.tambahUjianOnlineGuru', {
        url: '/tambahUjianOnlineGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/beranda/tambahUjianOnline.html',
            controller: 'tambahUjianOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.editUjianOnlineGuru', {
        url: '/editUjianOnlineGuru',
        params: {
          idUjian: "",
          namaUjian: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/beranda/editUjianOnline.html',
            controller: 'editUjianOnlineGuruCtrl'
          }
        }
      })
      // Data Ujian Online Pelajaran Guru
      .state('menuGuru.pelajaranUjianOnlineGuru', {
        url: '/pelajaranUjianOnlineGuru',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKelas: "",
          namaSekolah: "",
          jenisUjian: "",
          namaGuru: "",
          idTahunAjaran: "",
          idSekolah: "",
          idKelas: "",
          idGuru: "",
          tingkatKelas: "",
          ruangLingkupUjian: "",
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/pelajaran/pelajaran.html',
            controller: 'pelajaranUjianOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.tambahPelajaranUjianOnlineGuru', {
        url: '/tambahPelajaranUjianOnlineGuru',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/pelajaran/tambahPelajaran.html',
            controller: 'tambahPelajaranUjianOnlineGuruCtrl'
          }
        }
      })
      // Data UjianOnline Pengaturan Umum Guru
      .state('menuGuru.pengaturanUmumUjianOnlineGuru', {
        url: '/pengaturanUmumUjianOnlineGuru',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          idKelas: "",
          namaKelas: "",
          idPelajaran: "",
          pelajaran: "",
          namaSekolah: "",
          jenisUjian: "",
          idGuru: "",
          namaGuru: "",
          idPelajaranUjianOnline: "",
          tingkatKelas: "",
          idSekolah: "",
          idTahunAjaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/pengaturanUmum/pengaturanUmum.html',
            controller: 'pengaturanUmumUjianOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.kisiKisiSoalUjianOnlineGuru', {
        url: '/kisiKisiSoalUjianOnlineGuru',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKelas: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/pengaturanUmum/kisiKisiSoal.html',
            controller: 'kisiKisiSoalUjianOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.resetJawabanPesertaUjianOnlineGuru', {
        url: '/resetJawabanPesertaUjianOnlineGuru',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKelas: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/pengaturanUmum/resetJawabanPeserta.html',
            controller: 'resetJawabanPesertaUjianOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.ulangUjianOnlineGuru', {
        url: '/ulangUjianOnlineGuru',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKelas: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/pengaturanUmum/ulangUjian.html',
            controller: 'ulangUjianOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.tambahSoalUjianOnlineGuru', {
        url: '/tambahSoalUjianOnlineGuru',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: "",
          namaKelas: "",
          tingkatKelas: "",
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/pengaturanUmum/tambahSoalUjianOnline.html',
            controller: 'tambahSoalUjianOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.soalUjianOnlineDetailGuru', {
        url: '/soalUjianOnlineDetailGuru',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKelas: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/pengaturanUmum/soalUjianOnlineDetail.html',
            controller: 'soalUjianOnlineDetailGuruCtrl'
          }
        }
      })
      //Data Ujian Online Registrasi Peserta Guru
      .state('menuGuru.registrasiPesertaUjianOnlineGuru', {
        url: '/registrasiPesertaUjianOnlineGuru',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          idKelas: "",
          namaKelas: "",
          idKotaKabupaten: "",
          idProvinsi: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          idSemester: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idSekolah: "",
          namaSekolah: "",
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/registrasiPeserta/registrasiPeserta.html',
            controller: 'registrasiPesertaUjianOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.pesertaTeregistrasiUjianOnlineGuru', {
        url: '/pesertaTeregistrasiUjianOnlineGuru',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          idKelas: "",
          namaKelas: "",
          kelas: "",
          idKotaKabupaten: "",
          idProvinsi: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/registrasiPeserta/pesertaTeregistrasi.html',
            controller: 'pesertaTeregistrasiUjianOnlineGuruCtrl'
          }
        }
      })
      .state('menuGuru.logHistoriUjianOnlineGuru', {
        url: '/logHistoriUjianOnlineGuru',
        params: {
          idUjian: "",
          namaTryout: "",
          jenjang: "",
          idKelas: "",
          namaKelas: "",
          idKotaKabupaten: "",
          idProvinsi: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/registrasiPeserta/logHistoriPeserta.html',
            controller: 'logHistoriUjianOnlineGuruCtrl'
          }
        }
      })

      //Nilai Peringkat Ujian Online Guru
      .state('menuGuru.nilaiPeringkatUjianOnlineGuru', {
        url: '/nilaiPeringkatUjianOnlineGuru',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          idSemester: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/nilaiPeringkat/nilaiPeringkatNew.html',
            controller: 'nilaiPeringkatUjianOnlineGuruCtrl'
          }
        }
      })

      .state('menuGuru.nilaiSiswaUjianOnlineGuru', {
        url: '/nilaiSiswaUjianOnlineGuru',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          idSekolah: "",
          namaSekolah: "",
          idSemester: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idRekapJawabanUjianOnlineSiswa: "",
          namaPengguna: "",
          uid: "",
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/nilaiPeringkat/nilaiSiswa.html',
            controller: 'nilaiSiswaUjianOnlineGuruCtrl'
          }
        }
      })

      .state('menuGuru.nilaiSiswaDetailUjianOnlineGuru', {
        url: '/nilaiSiswaDetailUjianOnlineGuru',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          idSemester: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanUjianOnlineSiswaPerPelajaran: "",
          idRekapJawabanUjianOnlineSiswa: "",
          namaPengguna: "",
          uid: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/nilaiPeringkat/nilaiSiswaDetail.html',
            controller: 'nilaiSiswaDetailUjianOnlineGuruCtrl'
          }
        }
      })

      .state('menuGuru.statusJawabanSiswaUjianOnlineGuru', {
        url: '/statusJawabanSiswaUjianOnlineGuru',
        params: {
          idUjian: "",
          namaUjian: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          idSemester: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idPelajaranUjianOnline: "",
          pelajaran: "",
          namaPengguna: "",
          uid: "",
          keterangan: ""
        },
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/ujianOnline/nilaiPeringkat/statusJawabanSiswa.html',
            controller: 'statusJawabanSiswaUjianOnlineGuruCtrl'
          }
        }
      })

      // Sekolah
      .state('menuSekolah', {
        url: '/Sekolah',
        templateUrl: 'templates/sekolah/menuSekolah.html',
        controller: 'menuSekolahCtrl'
      })

      .state('menuSekolah.authSekolah', {
        url: '/authSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/beranda/authSekolah.html',
            controller: 'authSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.berandaSekolah', {
        url: '/berandaSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/beranda/beranda.html',
            controller: 'berandaSekolahCtrl'
          }
        }
      })

      //Data Video Tutorial Guru
      .state('menuSekolah.videoTutorialSekolah', {
        url: '/videoTutorialSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/videoTutorial/videoTutorial.html',
            controller: 'videoTutorialSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.videoTutorialLihatSekolah', {
        url: '/videoTutorialLihatSekolah',
        params: {
          idVideo: '',
          judulVideo: '',
          keteranganVideo: ''
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/videoTutorial/videoTutorialLihat.html',
            controller: 'videoTutorialLihatSekolahCtrl'
          }
        }
      })

      // Pengaturan Sekolah
      .state('menuSekolah.tahunAjaranSekolah', {
        url: '/tahunAjaranSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/pengaturan/tahunAjaran/tahunAjaran.html',
            controller: 'tahunAjaranSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.semesterSekolah', {
        url: '/semesterSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/pengaturan/semester/semester.html',
            controller: 'semesterSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.pelajaranSekolah', {
        url: '/mataPelajaranSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/pengaturan/pelajaran/pelajaran.html',
            controller: 'mataPelajaranSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.jenisPrasaranaSekolah', {
        url: '/jenisPrasaranaSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/pengaturan/jenisPrasarana/jenisPrasarana.html',
            controller: 'jenisPrasaranaSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.jenisSaranaSekolah', {
        url: '/jenisSaranaSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/pengaturan/jenisSarana/jenisSarana.html',
            controller: 'jenisSaranaSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataSekolah', {
        url: '/dataSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/pengaturan/dataSekolah/dataSekolah.html',
            controller: 'dataSekolahCtrl'
          }
        }
      })

      //Data Pokok Sekolah Sekolah
      .state('menuSekolah.dataSekolahSekolah', {
        url: '/dataSekolahSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSekolah/dataSekolah.html',
            controller: 'dataSekolahSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataSekolahPerKecamatanSekolah', {
        url: '/dataSekolahPerKecamatanSekolah',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSekolah/dataSekolahPerKecamatan.html',
            controller: 'dataSekolahPerKecamatanSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataSekolahPerJenjangSekolah', {
        url: '/dataSekolahPerJenjangSekolah',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSekolah/dataSekolahPerJenjang.html',
            controller: 'dataSekolahPerJenjangSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataSekolahListSekolah', {
        url: '/dataSekolahListSekolah',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: "",
          status: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSekolah/dataSekolahList.html',
            controller: 'dataSekolahListSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataSekolahTambahSekolah', {
        url: '/dataSekolahTambahSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSekolah/dataSekolahTambah.html',
            controller: 'dataSekolahTambahSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataSekolahEditSekolah', {
        url: '/dataSekolahEditSekolah',
        params: {
          idSekolah: "",
          namaSekolah: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSekolah/dataSekolahEdit.html',
            controller: 'dataSekolahEditSekolahCtrl'
          }
        }
      })

      //Data Pokok Guru Sekolah
      .state('menuSekolah.dataPokokGuruSekolah', {
        url: '/dataPokokGuruSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataGuru/dataPokokGuru.html',
            controller: 'dataPokokGuruSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataPokokGuruPerKecamatanSekolah', {
        url: '/dataPokokGuruPerKecamatanSekolah',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataGuru/dataPokokGuruPerKecamatan.html',
            controller: 'dataPokokGuruPerKecamatanSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataPokokGuruPerJenjangSekolah', {
        url: '/dataPokokGuruPerJenjangSekolah',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataGuru/dataPokokGuruPerJenjang.html',
            controller: 'dataPokokGuruPerJenjangSekolahCtrl'
          }
        }
      })
      //Data Pokok Siswa Sekolah
      .state('menuSekolah.dataPokokSiswaSekolah', {
        url: '/dataPokokSiswaSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSiswa/dataPokokSiswa.html',
            controller: 'dataPokokSiswaSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataPokokSiswaPerKecamatanSekolah', {
        url: '/dataPokokSiswaPerKecamatanSekolah',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSiswa/dataPokokSiswaPerKecamatan.html',
            controller: 'dataPokokSiswaPerKecamatanSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataPokokSiswaPerJenjangSekolah', {
        url: '/dataPokokSiswaPerJenjangSekolah',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSiswa/dataPokokSiswaPerJenjang.html',
            controller: 'dataPokokSiswaPerJenjangSekolahCtrl'
          }
        }
      })
      //Data Pokok Rombel Sekolah
      .state('menuSekolah.dataPokokRombelSekolah', {
        url: '/dataPokokRombelSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataRombel/dataPokokRombel.html',
            controller: 'dataPokokRombelSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataPokokRombelPerKecamatanSekolah', {
        url: '/dataPokokRombelPerKecamatanSekolah',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataRombel/dataPokokRombelPerKecamatan.html',
            controller: 'dataPokokRombelPerKecamatanSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataPokokRombelPerJenjangSekolah', {
        url: '/dataPokokRombelPerJenjangSekolah',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataRombel/dataPokokRombelPerJenjang.html',
            controller: 'dataPokokRombelPerJenjangSekolahCtrl'
          }
        }
      })
      //Data Pokok Prasarana Sekolah
      .state('menuSekolah.dataPokokPrasaranaSekolah', {
        url: '/dataPokokPrasaranaSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataPrasarana/dataPokokPrasarana.html',
            controller: 'dataPokokPrasaranaSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataPokokPrasaranaPerKecamatanSekolah', {
        url: '/dataPokokPrasaranaPerKecamatanSekolah',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataPrasarana/dataPokokPrasaranaPerKecamatan.html',
            controller: 'dataPokokPrasaranaPerKecamatanSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataPokokPrasaranaPerJenjangSekolah', {
        url: '/dataPokokPrasaranaPerJenjangSekolah',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataPrasarana/dataPokokPrasaranaPerJenjang.html',
            controller: 'dataPokokPrasaranaPerJenjangSekolahCtrl'
          }
        }
      })
      //Data Pokok Sarana Sekolah
      .state('menuSekolah.dataPokokSaranaSekolah', {
        url: '/dataPokokSaranaSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSarana/dataPokokSarana.html',
            controller: 'dataPokokSaranaSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataPokokSaranaPerKecamatanSekolah', {
        url: '/dataPokokSaranaPerKecamatanSekolah',
        params: {
          namaKecamatan: "",
          idKecamatan: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSarana/dataPokokSaranaPerKecamatan.html',
            controller: 'dataPokokSaranaPerKecamatanSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataPokokSaranaPerJenjangSekolah', {
        url: '/dataPokokSaranaPerJenjangSekolah',
        params: {
          namaKecamatan: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSarana/dataPokokSaranaPerJenjang.html',
            controller: 'dataPokokSaranaPerJenjangSekolahCtrl'
          }
        }
      })

      //Data Prasarana Sekolah Sekolah
      .state('menuSekolah.dataPrasaranaSekolah', {
        url: '/dataPrasaranaSekolah',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: "",
          namaKecamatan: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataPrasarana/dataPrasarana.html',
            controller: 'dataPrasaranaSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataSaranaSekolah', {
        url: '/dataSaranaSekolah',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: "",
          namaKecamatan: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSarana/dataSarana.html',
            controller: 'dataSaranaSekolahCtrl'
          }
        }
      })

      //Data Kelas Sekolah
      .state('menuSekolah.dataKelasSekolah', {
        url: '/dataKelasSekolah',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataRombel/dataRombel.html',
            controller: 'dataRombelSekolahCtrl'
          }
        }
      })

      //Data Lintas Minat Sekolah
      .state('menuSekolah.lintasMinatSekolah', {
        url: '/lintasMinatSekolah',
        params: {
          idKelas: "",
          tingkatKelas: "",
          jenisRombel: "",
          namaKelas: "",
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataRombel/lintasMinat.html',
            controller: 'lintasMinatSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.lintasMinatDetailSekolah', {
        url: '/lintasMinatDetailSekolah',
        params: {
          idKelas: "",
          tingkatKelas: "",
          jenisRombel: "",
          namaKelas: "",
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataRombel/lintasMinatDetail.html',
            controller: 'lintasMinatDetailSekolahCtrl'
          }
        }
      })

      //Data Guru Sekolah
      .state('menuSekolah.dataGuruSekolah', {
        url: '/dataGuruSekolah',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataGuru/dataGuru.html',
            controller: 'dataGuruSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataGuruTambahSekolah', {
        url: '/dataGuruTambahSekolah',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataGuru/dataGuruTambah.html',
            controller: 'dataGuruTambahSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataGuruEditSekolah', {
        url: '/dataGuruEditSekolah',
        params: {
          idGuru: "",
          namaPengguna: "",
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataGuru/dataGuruEdit.html',
            controller: 'dataGuruEditSekolahCtrl'
          }
        }
      })

      //Data Siswa Sekolah
      .state('menuSekolah.dataSiswaSekolah', {
        url: '/dataSiswaSekolah',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSiswa/dataSiswa.html',
            controller: 'dataSiswaSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataSiswaTambahSekolah', {
        url: '/dataSiswaTambahSekolah',
        params: {
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSiswa/dataSiswaTambah.html',
            controller: 'dataSiswaTambahSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataSiswaEditSekolah', {
        url: '/dataSiswaEditSekolah',
        params: {
          idSiswa: "",
          namaSiswa: "",
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSiswa/dataSiswaEdit.html',
            controller: 'dataSiswaEditSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.dataSiswaLihatSekolah', {
        url: '/dataSiswaLihatSekolah',
        params: {
          idSiswa: "",
          namaSiswa: "",
          idSekolah: "",
          namaSekolah: "",
          idKotaKabupaten: "",
          idKecamatan: "",
          jenjang: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataPokokSekolah/dataSiswa/dataSiswaLihat.html',
            controller: 'dataSiswaLihatSekolahCtrl'
          }
        }
      })

      //Data Admin Sekolah
      .state('menuSekolah.adminSekolah', {
        url: '/adminSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/adminSekolah/adminSekolah.html',
            controller: 'adminSekolahCtrl'
          }
        }
      })

      //Data Jadwal Pelajaran Sekolah
      .state('menuSekolah.jadwalPelajaranSekolah', {
        url: '/jadwalPelajaranSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/kurikulum/jadwalPelajaran/jadwalPelajaran.html',
            controller: 'jadwalPelajaranSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.jadwalPelajaranTambahSekolah', {
        url: '/jadwalPelajaranTambahSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/kurikulum/jadwalPelajaran/jadwalPelajaranTambah.html',
            controller: 'jadwalPelajaranTambahSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.jadwalPelajaranLihatSekolah', {
        url: '/jadwalPelajaranLihatSekolah',
        params: {
          filterGuru: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/kurikulum/jadwalPelajaran/jadwalPelajaranLihat.html',
            controller: 'jadwalPelajaranLihatSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.jadwalPelajaranLihatDetailSekolah', {
        url: '/jadwalPelajaranLihatDetailSekolah',
        params: {
          filterGuru: "",
          hari: "",
          tahunAjaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/kurikulum/jadwalPelajaran/jadwalPelajaranLihatDetail.html',
            controller: 'jadwalPelajaranLihatDetailSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.jadwalPelajaranEditSekolah', {
        url: '/jadwalPelajaranEditSekolah',
        params: {
          idJadwalPelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/kurikulum/jadwalPelajaran/jadwalPelajaranEdit.html',
            controller: 'jadwalPelajaranEditSekolahCtrl'
          }
        }
      })

      //Data Absensi Siswa Sekolah
      .state('menuSekolah.absensiSiswaSekolah', {
        url: '/absensiSiswaSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/absensi/siswa/absensiSiswa.html',
            controller: 'absensiSiswaSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.absensiSiswaTambahSekolah', {
        url: '/absensiSiswaTambahSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/absensi/siswa/absensiSiswaTambah.html',
            controller: 'absensiSiswaTambahSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.absensiSiswaLihatSekolah', {
        url: '/absensiSiswaLihatSekolah',
        params: {
          groupAbsensi: '',
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/absensi/siswa/absensiSiswaLihat.html',
            controller: 'absensiSiswaLihatSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.absensiSiswaEditSekolah', {
        url: '/absensiSiswaEditSekolah',
        params: {
          groupAbsensi: '',
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/absensi/siswa/absensiSiswaEdit.html',
            controller: 'absensiSiswaEditSekolahCtrl'
          }
        }
      })

      //Data Tugas Siswa Sekolah
      .state('menuSekolah.tugasSiswaSekolah', {
        url: '/tugasSiswaSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tugas/siswa/tugasSiswa.html',
            controller: 'tugasSiswaSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.tugasSiswaTambahSekolah', {
        url: '/tugasSiswaTambahSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tugas/siswa/tugasSiswaTambah.html',
            controller: 'tugasSiswaTambahSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.tugasSiswaLihatSekolah', {
        url: '/tugasSiswaLihatSekolah',
        params: {
          groupTugas: '',
          idKelas: '',
          idPelajaran: '',
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tugas/siswa/tugasSiswaLihat.html',
            controller: 'tugasSiswaLihatSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.tugasSiswaEditSekolah', {
        url: '/tugasSiswaEditSekolah',
        params: {
          groupTugas: '',
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tugas/siswa/tugasSiswaEdit.html',
            controller: 'tugasSiswaEditSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.LihatJawabanTugasSiswaSekolah', {
        url: '/jawabanTugasSiswaSekolah',
        params: {
          idTugas: '',
          namaSiswa: '',
          idKelas: '',
          idPelajaran: '',
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tugas/siswa/tugasSiswaJawaban.html',
            controller: 'LihatJawabanTugasSiswaSekolahCtrl'
          }
        }
      })

      //Data Bank Soal Sekolah
      .state('menuSekolah.bankSoalSekolah', {
        url: '/bankSoalSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/bankSoal/bankSoal.html',
            controller: 'bankSoalSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.bankSoalTambahSekolah', {
        url: '/bankSoalTambahSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/bankSoal/bankSoalTambah.html',
            controller: 'bankSoalTambahSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.bankSoalPerJenjangSekolah', {
        url: '/bankSoalPerJenjangSekolah',
        params: {
          pelajaran: "",
          idPelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/bankSoal/bankSoalPerJenjang.html',
            controller: 'bankSoalPerJenjangSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.bankSoalLihatSekolah', {
        url: '/bankSoalLihatSekolah',
        params: {
          pelajaran: "",
          idPelajaran: "",
          kelas: "",
          jenjang: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/bankSoal/bankSoalLihat.html',
            controller: 'bankSoalLihatSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.bankSoalEditSekolah', {
        url: '/bankSoalEditSekolah',
        params: {
          idSoal: "",
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/bankSoal/bankSoalEdit.html',
            controller: 'bankSoalEditSekolahCtrl'
          }
        }
      })

      //Data Materi Pelajaran Sekolah
      .state('menuSekolah.materiPelajaranSekolah', {
        url: '/materiPelajaranSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/materiPelajaran/materiPelajaran.html',
            controller: 'materiPelajaranSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.materiPelajaranTambahSekolah', {
        url: '/materiPelajaranTambahSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/materiPelajaran/materiPelajaranTambah.html',
            controller: 'materiPelajaranTambahSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.materiPelajaranPerJenjangSekolah', {
        url: '/materiPelajaranPerJenjangSekolah',
        params: {
          pelajaran: "",
          idPelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/materiPelajaran/materiPelajaranPerJenjang.html',
            controller: 'materiPelajaranPerJenjangSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.materiPelajaranLihatSekolah', {
        url: '/materiPelajaranLihatSekolah',
        params: {
          pelajaran: "",
          idPelajaran: "",
          kelas: "",
          jenjang: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/materiPelajaran/materiPelajaranLihat.html',
            controller: 'materiPelajaranLihatSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.materiPelajaranSubBABSekolah', {
        url: '/materiPelajaranSubBABSekolah',
        params: {
          idMateriPelajaran: "",
          BAB: ''
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/materiPelajaran/materiPelajaranSubBAB.html',
            controller: 'materiPelajaranSubBABSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.materiPelajaranSubBABTambahSekolah', {
        url: '/materiPelajaranSubBABTambahSekolah',
        params: {
          idMateriPelajaran: "",
          BAB: ''
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/materiPelajaran/materiPelajaranSubBABTambah.html',
            controller: 'materiPelajaranSubBABTambahSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.materiPelajaranSubBABEditSekolah', {
        url: '/materiPelajaranSubBABTambahSekolah',
        params: {
          idMateriPelajaran: "",
          BAB: '',
          idSubBAB: '',
          namaSubBAB: ''
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/materiPelajaran/materiPelajaranSubBABEdit.html',
            controller: 'materiPelajaranSubBABEditSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.materiPelajaranEditSekolah', {
        url: '/materiPelajaranEditSekolah',
        params: {
          idMateriPelajaran: "",
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/materiPelajaran/materiPelajaranEdit.html',
            controller: 'materiPelajaranEditSekolahCtrl'
          }
        }
      })

      // Data Akun Sekolah
      .state('menuSekolah.profilPenggunaSekolah', {
        url: '/profilPenggunaSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataAkun/profilPengguna.html',
            controller: 'profilPenggunaSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.gantiPasswordSekolah', {
        url: '/gantiPasswordSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataAkun/gantiPassword.html',
            controller: 'gantiPasswordSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.uploadFotoSekolah', {
        url: '/uploadFotoSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/dataAkun/uploadFoto.html',
            controller: 'uploadFotoSekolahCtrl'
          }
        }
      })

      // Data SOC Sekolah
      .state('menuSekolah.socSekolah', {
        url: '/socSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/beranda/beranda.html',
            controller: 'berandaSOCSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.tambahSOCSekolah', {
        url: '/tambahSOCSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/beranda/tambahSOC.html',
            controller: 'tambahSOCSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.editSOCSekolah', {
        url: '/editSOCSekolah',
        params: {
          idTryout: "",
          namaTryout: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/beranda/editSOC.html',
            controller: 'editSOCSekolahCtrl'
          }
        }
      })
      // Data SOC Pelajaran Sekolah
      .state('menuSekolah.pelajaranSOCSekolah', {
        url: '/pelajaranSOCSekolah',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          olimpiadeTingkat: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/pelajaran/pelajaran.html',
            controller: 'pelajaranSOCSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.tambahPelajaranSOCSekolah', {
        url: '/tambahPelajaranSOCSekolah',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/pelajaran/tambahPelajaran.html',
            controller: 'tambahPelajaranSOCSekolahCtrl'
          }
        }
      })
      // Data SOC Pengaturan Umum Sekolah
      .state('menuSekolah.pengaturanUmumSOCSekolah', {
        url: '/pengaturanUmumSOCSekolah',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/pengaturanUmum/pengaturanUmum.html',
            controller: 'pengaturanUmumSOCSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.kisiKisiSoalSOCSekolah', {
        url: '/kisiKisiSoalSOCSekolah',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/pengaturanUmum/kisiKisiSoal.html',
            controller: 'kisiKisiSoalSOCSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.resetJawabanPesertaSOCSekolah', {
        url: '/resetJawabanPesertaSOCSekolah',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/pengaturanUmum/resetJawabanPeserta.html',
            controller: 'resetJawabanPesertaSOCSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.ulangUjianSOCSekolah', {
        url: '/ulangUjianSOCSekolah',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/pengaturanUmum/ulangUjian.html',
            controller: 'ulangUjianSOCSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.tambahSoalOlimpiadeSOCSekolah', {
        url: '/tambahSoalOlimpiadeSOCSekolah',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: "",
          kelas: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/pengaturanUmum/tambahSoalOlimpiade.html',
            controller: 'tambahSoalOlimpiadeSOCSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.soalOlimpiadeDetailSOCSekolah', {
        url: '/soalOlimpiadeDetailSOCSekolah',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/pengaturanUmum/soalOlimpiadeDetail.html',
            controller: 'soalOlimpiadeDetailSOCSekolahCtrl'
          }
        }
      })

      //Data SOC Registrasi Peserta Sekolah
      .state('menuSekolah.registrasiPesertaSOCSekolah', {
        url: '/registrasiPesertaSOCSekolah',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          id_kota_kabupaten: "",
          olimpiadeTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/registrasiPeserta/registrasiPeserta.html',
            controller: 'registrasiPesertaSOCSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.registrasiPesertaKotaSOCSekolah', {
        url: '/registrasiPesertaKotaSOCSekolah',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          id_kota_kabupaten: "",
          olimpiadeTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/registrasiPeserta/registrasiPesertaKota.html',
            controller: 'registrasiPesertaKotaSOCSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.pesertaTeregistrasiSOCSekolah', {
        url: '/pesertaTeregistrasiSOCSekolah',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: "",
          id_kota_kabupaten: "",
          olimpiadeTingkat: "",
          id_provinsi: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/registrasiPeserta/pesertaTeregistrasi.html',
            controller: 'pesertaTeregistrasiSOCSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.logHistoriSOCSekolah', {
        url: '/logHistoriSOCSekolah',
        params: {
          "idTryout": "",
          "namaTryout": "",
          "jenjang": "",
          "kelas": "",
          "id_kota_kabupaten": "",
          "olimpiadeTingkat": "",
          "id_provinsi": ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/registrasiPeserta/logHistoriPeserta.html',
            controller: 'logHistoriSOCSekolahCtrl'
          }
        }
      })

      //Nilai Peringkat SOC Sekolah
      .state('menuSekolah.nilaiPeringkatSOCSekolah', {
        url: '/nilaiPeringkatSOCSekolah',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          totalSiswaLolos: "",
          tanggalPelaksanaan: "",
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/nilaiPeringkat/nilaiPeringkatNew.html',
            controller: 'nilaiPeringkatSOCSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.nilaiSiswaSOCSekolah', {
        url: '/nilaiSiswaSOCSekolah',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          namaSekolah: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanOlimpiadeSiswa: "",
          namaPengguna: "",
          uid: "",
          lulus: "",
          tanggalPelaksanaan: "",
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/nilaiPeringkat/nilaiSiswa.html',
            controller: 'nilaiSiswaSOCSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.nilaiSiswaDetailSOCSekolah', {
        url: '/nilaiSiswaDetailSOCSekolah',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryout: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanOlimpiadeSiswaPerPelajaran: "",
          idRekapJawabanOlimpiadeSiswa: "",
          namaPengguna: "",
          uid: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/nilaiPeringkat/nilaiSiswaDetail.html',
            controller: 'nilaiSiswaDetailSOCSekolahlCtrl'
          }
        }
      })

      .state('menuSekolah.statusJawabanSiswaSOCSekolah', {
        url: '/statusJawabanSiswaSOCSekolah',
        params: {
          idTryout: "",
          namaTryout: "",
          olimpiadeTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryout: "",
          pelajaran: "",
          namaPengguna: "",
          uid: "",
          keterangan: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/soc/nilaiPeringkat/statusJawabanSiswa.html',
            controller: 'statusJawabanSiswaSOCSekolahCtrl'
          }
        }
      })

      // Data UTS UAS Sekolah
      .state('menuSekolah.UTSUASSekolah', {
        url: '/utsUasSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/beranda/beranda.html',
            controller: 'berandaUTSUASSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.tambahUTSUASSekolah', {
        url: '/tambahUTSUASSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/beranda/tambahSOC.html',
            controller: 'tambahUTSUASSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.editUTSUASSekolah', {
        url: '/editUTSUASSekolah',
        params: {
          idUTSUAS: "",
          namaUTSUAS: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/beranda/editSOC.html',
            controller: 'editUTSUASSekolahCtrl'
          }
        }
      })
      // Data UTS / UAS Pelajaran Sekolah
      .state('menuSekolah.pelajaranUTSUASSekolah', {
        url: '/pelajaranUTSUASSekolah',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          utsUasTingkat: "",
          namaSekolah: "",
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/pelajaran/pelajaran.html',
            controller: 'pelajaranUTSUASSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.tambahPelajaranUTSUASSekolah', {
        url: '/tambahPelajaranUTSUASSekolah',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/pelajaran/tambahPelajaran.html',
            controller: 'tambahPelajaranUTSUASSekolahCtrl'
          }
        }
      })
      // Data UTS UAS Pengaturan Umum Sekolah
      .state('menuSekolah.pengaturanUmumUTSUASSekolah', {
        url: '/pengaturanUmumUTSUASSekolah',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/pengaturanUmum/pengaturanUmum.html',
            controller: 'pengaturanUmumUTSUASSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.kisiKisiSoalUTSUASSekolah', {
        url: '/kisiKisiSoalUTSUASSekolah',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/pengaturanUmum/kisiKisiSoal.html',
            controller: 'kisiKisiSoalUTSUASSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.resetJawabanPesertaUTSUASSekolah', {
        url: '/resetJawabanPesertaUTSUASSekolah',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/pengaturanUmum/resetJawabanPeserta.html',
            controller: 'resetJawabanPesertaUTSUASSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.ulangUjianUTSUASSekolah', {
        url: '/ulangUjianUTSUASSekolah',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/pengaturanUmum/ulangUjian.html',
            controller: 'ulangUjianUTSUASSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.tambahSoalUTSUASSekolah', {
        url: '/tambahSoalUTSUASSekolah',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: "",
          tingkatKelas: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/pengaturanUmum/tambahSoalOlimpiade.html',
            controller: 'tambahSoalUTSUASSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.soalDetailUTSUASSekolah', {
        url: '/soalDetailUTSUASSekolah',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/pengaturanUmum/soalOlimpiadeDetail.html',
            controller: 'soalDetailUTSUASSekolahCtrl'
          }
        }
      })
      //Data UTS UAS Registrasi Peserta Sekolah
      .state('menuSekolah.registrasiPesertaUTSUASSekolah', {
        url: '/registrasiPesertaUTSUASSekolah',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          utsUasTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/registrasiPeserta/registrasiPeserta.html',
            controller: 'registrasiPesertaUTSUASSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.registrasiPesertaKotaUTSUASSekolah', {
        url: '/registrasiPesertaKotaUTSUASSekolah',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          utsUasTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/registrasiPeserta/registrasiPesertaKota.html',
            controller: 'registrasiPesertaKotaUTSUASSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.pesertaTeregistrasiUTSUASSekolah', {
        url: '/pesertaTeregistrasiUTSUASSekolah',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          utsUasTingkat: "",
          id_provinsi: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/registrasiPeserta/pesertaTeregistrasi.html',
            controller: 'pesertaTeregistrasiUTSUASSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.logHistoriUTSUASSekolah', {
        url: '/logHistoriUTSUASSekolah',
        params: {
          "idUTSUAS": "",
          "namaUTSUAS": "",
          "jenjang": "",
          "tingkatKelas": "",
          "id_kota_kabupaten": "",
          "utsUasTingkat": "",
          "id_provinsi": ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/registrasiPeserta/logHistoriPeserta.html',
            controller: 'logHistoriUTSUASSekolahCtrl'
          }
        }
      })
      //Nilai Peringkat UTS UAS Sekolah
      .state('menuSekolah.nilaiPeringkatUTSUASSekolah', {
        url: '/nilaiPeringkatUTSUASSekolah',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          tingkatKelas: "",
          idSekolah: "",
          idTahunAjaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/nilaiPeringkat/nilaiPeringkat.html',
            controller: 'nilaiPeringkatUTSUASSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.nilaiSiswaUTSUASSekolah', {
        url: '/nilaiSiswaUTSUASSekolah',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          namaSekolah: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanUTSUASSiswa: "",
          namaPengguna: "",
          uid: "",
          lulus: "",
          tanggalPelaksanaan: "",
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/nilaiPeringkat/nilaiSiswa.html',
            controller: 'nilaiSiswaUTSUASSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.nilaiSiswaDetailUTSUASSekolah', {
        url: '/nilaiSiswaDetailUTSUASSekolah',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          jenjang: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranUTSUAS: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanUTSUASSiswaPerPelajaran: "",
          idRekapJawabanUTSUASSiswa: "",
          namaPengguna: "",
          uid: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/nilaiPeringkat/nilaiSiswaDetail.html',
            controller: 'nilaiSiswaDetailUTSUASSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.statusJawabanSiswaUTSUASSekolah', {
        url: '/statusJawabanSiswaUTSUASSekolah',
        params: {
          idUTSUAS: "",
          namaUTSUAS: "",
          utsUasTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranUTSUAS: "",
          pelajaran: "",
          namaPengguna: "",
          uid: "",
          keterangan: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/UTSUAS/nilaiPeringkat/statusJawabanSiswa.html',
            controller: 'statusJawabanSiswaUTSUASSekolahCtrl'
          }
        }
      })

      // Data Tryout Online Sekolah
      .state('menuSekolah.tryoutOnlineSekolah', {
        url: '/tryoutOnlineSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/beranda/beranda.html',
            controller: 'berandaTryoutOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.tambahTryoutOnlineSekolah', {
        url: '/tambahTryoutOnlineSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/beranda/tambahTryoutOnline.html',
            controller: 'tambahTryoutOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.editTryoutOnlineSekolah', {
        url: '/editTryoutOnlineSekolah',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/beranda/editTryoutOnline.html',
            controller: 'editTryoutOnlineSekolahCtrl'
          }
        }
      })
      // Data Tryout Online Pelajaran Sekolah
      .state('menuSekolah.pelajaranTryoutOnlineSekolah', {
        url: '/pelajaranTryoutOnlineSekolah',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          TryoutOnlineTingkat: "",
          namaSekolah: "",
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/pelajaran/pelajaran.html',
            controller: 'pelajaranTryoutOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.tambahPelajaranTryoutOnlineSekolah', {
        url: '/tambahPelajaranTryoutOnlineSekolah',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/pelajaran/tambahPelajaran.html',
            controller: 'tambahPelajaranTryoutOnlineSekolahCtrl'
          }
        }
      })
      // Data Tryout Online Pengaturan Umum Sekolah
      .state('menuSekolah.pengaturanUmumTryoutOnlineSekolah', {
        url: '/pengaturanUmumTryoutOnlineSekolah',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/pengaturanUmum/pengaturanUmum.html',
            controller: 'pengaturanUmumTryoutOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.kisiKisiSoalTryoutOnlineSekolah', {
        url: '/kisiKisiSoalTryoutOnlineSekolah',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/pengaturanUmum/kisiKisiSoal.html',
            controller: 'kisiKisiSoalTryoutOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.resetJawabanPesertaTryoutOnlineSekolah', {
        url: '/resetJawabanPesertaTryoutOnlineSekolah',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/pengaturanUmum/resetJawabanPeserta.html',
            controller: 'resetJawabanPesertaTryoutOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.ulangUjianTryoutOnlineSekolah', {
        url: '/ulangUjianTryoutOnlineSekolah',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/pengaturanUmum/ulangUjian.html',
            controller: 'ulangUjianTryoutOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.tambahSoalTryoutOnlineSekolah', {
        url: '/tambahSoalTryoutOnlineSekolah',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: "",
          tingkatKelas: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/pengaturanUmum/tambahSoalOlimpiade.html',
            controller: 'tambahSoalTryoutOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.soalDetailTryoutOnlineSekolah', {
        url: '/soalDetailTryoutOnlineSekolah',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/pengaturanUmum/soalOlimpiadeDetail.html',
            controller: 'soalDetailTryoutOnlineSekolahCtrl'
          }
        }
      })
      //Data Tryout Online Registrasi Peserta Sekolah
      .state('menuSekolah.registrasiPesertaTryoutOnlineSekolah', {
        url: '/registrasiPesertaTryoutOnlineSekolah',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          TryoutOnlineTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/registrasiPeserta/registrasiPeserta.html',
            controller: 'registrasiPesertaTryoutOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.registrasiPesertaKotaTryoutOnlineSekolah', {
        url: '/registrasiPesertaKotaTryoutOnlineSekolah',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          TryoutOnlineTingkat: "",
          id_provinsi: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idSekolah: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/registrasiPeserta/registrasiPesertaKota.html',
            controller: 'registrasiPesertaKotaTryoutOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.pesertaTeregistrasiTryoutOnlineSekolah', {
        url: '/pesertaTeregistrasiTryoutOnlineSekolah',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          tingkatKelas: "",
          id_kota_kabupaten: "",
          TryoutOnlineTingkat: "",
          id_provinsi: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/registrasiPeserta/pesertaTeregistrasi.html',
            controller: 'pesertaTeregistrasiTryoutOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.logHistoriTryoutOnlineSekolah', {
        url: '/logHistoriTryoutOnlineSekolah',
        params: {
          "idTryoutOnline": "",
          "namaTryoutOnline": "",
          "jenjang": "",
          "tingkatKelas": "",
          "id_kota_kabupaten": "",
          "TryoutOnlineTingkat": "",
          "id_provinsi": ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/registrasiPeserta/logHistoriPeserta.html',
            controller: 'logHistoriTryoutOnlineSekolahCtrl'
          }
        }
      })
      //Nilai Peringkat TryoutOnline Sekolah
      .state('menuSekolah.nilaiPeringkatTryoutOnlineSekolah', {
        url: '/nilaiPeringkatTryoutOnlineSekolah',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          tingkatKelas: "",
          idTahunAjaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/nilaiPeringkat/nilaiPeringkat.html',
            controller: 'nilaiPeringkatTryoutOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.nilaiSiswaTryoutOnlineSekolah', {
        url: '/nilaiSiswaTryoutOnlineSekolah',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          namaSekolah: "",
          semester: "",
          tahunAjaran: "",
          idRekapJawabanTryoutOnlineSiswa: "",
          namaPengguna: "",
          uid: "",
          lulus: "",
          tanggalPelaksanaan: "",
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/nilaiPeringkat/nilaiSiswa.html',
            controller: 'nilaiSiswaTryoutOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.nilaiSiswaDetailTryoutOnlineSekolah', {
        url: '/nilaiSiswaDetailTryoutOnlineSekolah',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          jenjang: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryoutOnline: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanTryoutOnlineSiswaPerPelajaran: "",
          idRekapJawabanTryoutOnlineSiswa: "",
          namaPengguna: "",
          uid: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/nilaiPeringkat/nilaiSiswaDetail.html',
            controller: 'nilaiSiswaDetailTryoutOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.statusJawabanSiswaTryoutOnlineSekolah', {
        url: '/statusJawabanSiswaTryoutOnlineSekolah',
        params: {
          idTryoutOnline: "",
          namaTryoutOnline: "",
          TryoutOnlineTingkat: "",
          namaKota: "",
          namaProvinsi: "",
          semester: "",
          tahunAjaran: "",
          idPelajaranTryoutOnline: "",
          pelajaran: "",
          namaPengguna: "",
          uid: "",
          keterangan: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tryoutOnline/nilaiPeringkat/statusJawabanSiswa.html',
            controller: 'statusJawabanSiswaTryoutOnlineSekolahCtrl'
          }
        }
      })

      // Data Ujian Online Sekolah
      .state('menuSekolah.ujianOnlineSekolah', {
        url: '/ujianOnlineSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/beranda/beranda.html',
            controller: 'berandaUjianOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.tambahUjianOnlineSekolah', {
        url: '/tambahUjianOnlineSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/beranda/tambahUjianOnline.html',
            controller: 'tambahUjianOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.editUjianOnlineSekolah', {
        url: '/editUjianOnlineSekolah',
        params: {
          idUjian: "",
          namaUjian: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/beranda/editUjianOnline.html',
            controller: 'editUjianOnlineSekolahCtrl'
          }
        }
      })
      // Data Ujian Online Pelajaran Sekolah
      .state('menuSekolah.pelajaranUjianOnlineSekolah', {
        url: '/pelajaranUjianOnlineSekolah',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKelas: "",
          namaSekolah: "",
          jenisUjian: "",
          namaGuru: "",
          idTahunAjaran: "",
          idSekolah: "",
          idKelas: "",
          idGuru: "",
          tingkatKelas: "",
          ruangLingkupUjian: "",
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/pelajaran/pelajaran.html',
            controller: 'pelajaranUjianOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.tambahPelajaranUjianOnlineSekolah', {
        url: '/tambahPelajaranUjianOnlineSekolah',
        params: {
          idTryout: "",
          namaTryout: "",
          jenjang: "",
          kelas: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/pelajaran/tambahPelajaran.html',
            controller: 'tambahPelajaranUjianOnlineSekolahCtrl'
          }
        }
      })
      // Data UjianOnline Pengaturan Umum Sekolah
      .state('menuSekolah.pengaturanUmumUjianOnlineSekolah', {
        url: '/pengaturanUmumUjianOnlineSekolah',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          idKelas: "",
          namaKelas: "",
          idPelajaran: "",
          pelajaran: "",
          namaSekolah: "",
          jenisUjian: "",
          idGuru: "",
          namaGuru: "",
          idPelajaranUjianOnline: "",
          tingkatKelas: "",
          idSekolah: "",
          idTahunAjaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/pengaturanUmum/pengaturanUmum.html',
            controller: 'pengaturanUmumUjianOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.kisiKisiSoalUjianOnlineSekolah', {
        url: '/kisiKisiSoalUjianOnlineSekolah',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKelas: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/pengaturanUmum/kisiKisiSoal.html',
            controller: 'kisiKisiSoalUjianOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.resetJawabanPesertaUjianOnlineSekolah', {
        url: '/resetJawabanPesertaUjianOnlineSekolah',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKelas: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/pengaturanUmum/resetJawabanPeserta.html',
            controller: 'resetJawabanPesertaUjianOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.ulangUjianOnlineSekolah', {
        url: '/ulangUjianOnlineSekolah',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKelas: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/pengaturanUmum/ulangUjian.html',
            controller: 'ulangUjianOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.tambahSoalUjianOnlineSekolah', {
        url: '/tambahSoalUjianOnlineSekolah',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: "",
          namaKelas: "",
          tingkatKelas: "",
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/pengaturanUmum/tambahSoalUjianOnline.html',
            controller: 'tambahSoalUjianOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.soalUjianOnlineDetailSekolah', {
        url: '/soalUjianOnlineDetailSekolah',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKelas: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/pengaturanUmum/soalUjianOnlineDetail.html',
            controller: 'soalUjianOnlineDetailSekolahCtrl'
          }
        }
      })
      //Data Ujian Online Registrasi Peserta Sekolah
      .state('menuSekolah.registrasiPesertaUjianOnlineSekolah', {
        url: '/registrasiPesertaUjianOnlineSekolah',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          idKelas: "",
          namaKelas: "",
          idKotaKabupaten: "",
          idProvinsi: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          idSemester: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idSekolah: "",
          namaSekolah: "",
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/registrasiPeserta/registrasiPeserta.html',
            controller: 'registrasiPesertaUjianOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.pesertaTeregistrasiUjianOnlineSekolah', {
        url: '/pesertaTeregistrasiUjianOnlineSekolah',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          idKelas: "",
          namaKelas: "",
          kelas: "",
          idKotaKabupaten: "",
          idProvinsi: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/registrasiPeserta/pesertaTeregistrasi.html',
            controller: 'pesertaTeregistrasiUjianOnlineSekolahCtrl'
          }
        }
      })
      .state('menuSekolah.logHistoriUjianOnlineSekolah', {
        url: '/logHistoriUjianOnlineSekolah',
        params: {
          idUjian: "",
          namaTryout: "",
          jenjang: "",
          idKelas: "",
          namaKelas: "",
          idKotaKabupaten: "",
          idProvinsi: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/registrasiPeserta/logHistoriPeserta.html',
            controller: 'logHistoriUjianOnlineSekolahCtrl'
          }
        }
      })

      //Nilai Peringkat Ujian Online Sekolah
      .state('menuSekolah.nilaiPeringkatUjianOnlineSekolah', {
        url: '/nilaiPeringkatUjianOnlineSekolah',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          idSemester: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/nilaiPeringkat/nilaiPeringkatNew.html',
            controller: 'nilaiPeringkatUjianOnlineSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.nilaiSiswaUjianOnlineSekolah', {
        url: '/nilaiSiswaUjianOnlineSekolah',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          idSekolah: "",
          namaSekolah: "",
          idSemester: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idRekapJawabanUjianOnlineSiswa: "",
          namaPengguna: "",
          uid: "",
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/nilaiPeringkat/nilaiSiswa.html',
            controller: 'nilaiSiswaUjianOnlineSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.nilaiSiswaDetailUjianOnlineSekolah', {
        url: '/nilaiSiswaDetailUjianOnlineSekolah',
        params: {
          idUjian: "",
          namaUjian: "",
          jenjang: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          idSemester: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idPelajaranUjianOnline: "",
          idPelajaran: "",
          pelajaran: "",
          statusFinish: "",
          idJawabanUjianOnlineSiswaPerPelajaran: "",
          idRekapJawabanUjianOnlineSiswa: "",
          namaPengguna: "",
          uid: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/nilaiPeringkat/nilaiSiswaDetail.html',
            controller: 'nilaiSiswaDetailUjianOnlineSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.statusJawabanSiswaUjianOnlineSekolah', {
        url: '/statusJawabanSiswaUjianOnlineSekolah',
        params: {
          idUjian: "",
          namaUjian: "",
          namaKotaKabupaten: "",
          namaProvinsi: "",
          idSemester: "",
          semester: "",
          idTahunAjaran: "",
          tahunAjaran: "",
          idPelajaranUjianOnline: "",
          pelajaran: "",
          namaPengguna: "",
          uid: "",
          keterangan: ""
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/ujianOnline/nilaiPeringkat/statusJawabanSiswa.html',
            controller: 'statusJawabanSiswaUjianOnlineSekolahCtrl'
          }
        }
      })

      //Website Sekolah Visi Misi
      .state('menuSekolah.visiMisiSekolah', {
        url: '/visiMisiSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/visiMisi/visiMisi.html',
            controller: 'visiMisiSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.sambutanKepalaSekolah', {
        url: '/sambutanKepalaSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tentangKami/sambutanKepalaSekolah.html',
            controller: 'sambutanKepalaSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.strukturOrganisasi', {
        url: '/strukturOrganisasi',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tentangKami/strukturOrganisasi.html',
            controller: 'strukturOrganisasiSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.tugasPokokDanFungsi', {
        url: '/tugasPokokDanFungsi',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tentangKami/tugasPokokDanFungsi.html',
            controller: 'tugasPokokDanFungsiSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.programDanKegiatan', {
        url: '/programDanKegiatan',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/tentangKami/programDanKegiatan.html',
            controller: 'programDanKegiatanSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.beritaSekolah', {
        url: '/beritaSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/berita/informasiDanBerita.html',
            controller: 'informasiDanBeritaSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.tambahBeritaSekolah', {
        url: '/tambahBeritaSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/berita/tambahBerita.html',
            controller: 'tambahBeritaSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.editBeritaSekolah', {
        url: '/editBeritaSekolah',
        params: {
          idBerita: '',
          judulBerita: ''
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/berita/editBerita.html',
            controller: 'editBeritaSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.tambahFotoBeritaSekolah', {
        url: '/tambahFotoBeritaSekolah',
        params: {
          idBerita: '',
          judulBerita: ''
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/berita/tambahFotoBerita.html',
            controller: 'tambahFotoBeritaSekolahCtrl'
          }
        }
      })

      //Informasi Sekolah
      .state('menuSekolah.informasiSekolah', {
        url: '/informasiSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/informasi/informasi.html',
            controller: 'informasiSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.tambahInformasiSekolah', {
        url: '/tambahInformasiSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/informasi/tambahInformasi.html',
            controller: 'tambahInformasiSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.editInformasiSekolah', {
        url: '/editInformasiSekolah',
        params: {
          idInformasi: '',
          judulInformasi: ''
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/informasi/editInformasi.html',
            controller: 'editInformasiSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.tambahFotoInformasiSekolah', {
        url: '/tambahFotoInformasiSekolah',
        params: {
          idInformasi: '',
          judulInformasi: ''
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/informasi/tambahFotoInformasi.html',
            controller: 'tambahFotoInformasiSekolahCtrl'
          }
        }
      })

      //Album Foto Sekolah
      .state('menuSekolah.fotoSekolah', {
        url: '/fotoSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/gallery/albumFoto/albumFoto.html',
            controller: 'albumFotoSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.albumFotoTambahSekolah', {
        url: '/albumFotoTambahSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/gallery/albumFoto/albumFotoTambah.html',
            controller: 'albumFotoTambahSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.albumFotoEditSekolah', {
        url: '/albumFotoEditSekolah',
        params: {
          idAlbumFoto: '',
          namaAlbumFoto: ''
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/gallery/albumFoto/albumFotoTambah.html',
            controller: 'albumFotoEditSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.albumFotoTambahFotoSekolah', {
        url: '/albumFotoTambahFotoSekolah',
        params: {
          idAlbumFoto: '',
          namaAlbumFoto: ''
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/gallery/albumFoto/tambahFoto.html',
            controller: 'albumFotoTambahFotoCtrl'
          }
        }
      })

      //Album Video Sekolah
      .state('menuSekolah.videoSekolah', {
        url: '/videoSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/gallery/albumVideo/albumVideo.html',
            controller: 'albumVideoSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.albumVideoTambahSekolah', {
        url: '/albumVideoTambahSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/gallery/albumVideo/albumVideoTambah.html',
            controller: 'albumVideoTambahSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.albumVideoEditSekolah', {
        url: '/albumVideoEditSekolah',
        params: {
          idAlbumVideo: '',
          namaAlbumVideo: ''
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/gallery/albumVideo/albumVideoTambah.html',
            controller: 'albumVideoEditSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.albumVideoTambahVideoSekolah', {
        url: '/albumVideoTambahVideoSekolah',
        params: {
          idAlbumVideo: '',
          namaAlbumVideo: ''
        },
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/gallery/albumVideo/tambahVideo.html',
            controller: 'albumVideoTambahVideoSekolahCtrl'
          }
        }
      })

      //Layanan Kami
      .state('menuSekolah.legalisirIjazahSekolah', {
        url: '/legalisirIjazahSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/layananKami/legalisirIjazah.html',
            controller: 'legalisirIjazahSekolahCtrl'
          }
        }

      })

      .state('menuSekolah.mutasiSiswa', {
        url: '/mutasiSiswa',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/layananKami/mutasiSiswa.html',
            controller: 'mutasiSiswaSekolahCtrl'
          }
        }

      })

      .state('menuSekolah.rekomendasiBeasiswa', {
        url: '/rekomendasiBeasiswa',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/layananKami/rekomendasiBeasiswa.html',
            controller: 'rekomendasiBeasiswaSekolahCtrl'
          }
        }

      })

      .state('menuSekolah.izinCutiPegawai', {
        url: '/izinCutiPegawai',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/layananKami/izinCutiPegawai.html',
            controller: 'izinCutiPegawaiSekolahCtrl'
          }
        }

      })

      .state('menuSekolah.karis', {
        url: '/karis',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/layananKami/karisDanLainlain.html',
            controller: 'karisSekolahCtrl'
          }
        }

      })

      .state('menuSekolah.suratRekomendasi', {
        url: '/suratRekomendasi',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/layananKami/suratRekomendasi.html',
            controller: 'suratRekomendasiSekolahCtrl'
          }
        }

      })

      .state('menuSekolah.usulanSertifikasiGuru', {
        url: '/usulanSertifikasiGuru',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/layananKami/usulanSertifikasiGuru.html',
            controller: 'usulanSertifikasiGuruSekolahCtrl'
          }
        }

      })

      .state('menuSekolah.pengaduan', {
        url: '/pengaduan',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/layananKami/pengaduan.html',
            controller: 'pengaduanSekolahCtrl'
          }
        }

      })

      .state('menuSekolah.pengajuanIjinOperationalSekolah', {
        url: '/pengajuanIjinOperationalSekolah',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/layananKami/pengajuanIjinOperationalSekolah.html',
            controller: 'pengajuanIjinOperationalSekolahCtrl'
          }
        }

      })

      .state('menuSekolah.pengajuanNPSN', {
        url: '/pengajuanNPSN',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/layananKami/pengajuanNPSN.html',
            controller: 'pengajuanNPSNSekolahCtrl'
          }
        }

      })

      .state('menuSekolah.permintaanDataPublik', {
        url: '/permintaanDataPublik',
        views: {
          'menuSekolah': {
            templateUrl: 'templates/sekolah/layananKami/permintaanDataPublik.html',
            controller: 'permintaanDataPublikSekolahCtrl'
          }
        }

      })

        
      // USER ORANG TUA 
      .state('menuOrangTua', {
        url: '/orangTua',
        templateUrl: 'templates/orangTua/menuOrangTua.html',
        controller: 'menuOrangTuaCtrl'
      })

      .state('menuOrangTua.authOrangTua', {
        url: '/authOrangTua',
        views: {
          'menuOrangTua': {
            templateUrl: 'templates/orangTua/beranda/authSiswa.html',
            controller: 'authOrangTuaCtrl'
          }
        }
      })

      .state('menuOrangTua.berandaOrangTua', {
        url: '/berandaOrangTua',
        views: {
          'menuOrangTua': {
            templateUrl: 'templates/orangTua/beranda/beranda.html',
            controller: 'berandaOrangTuaCtrl'
          }
        }
      })

      .state('menuOrangTua.absensiOrangTua', {
        url: '/absensiOrangTua',
        views: {
          'menuOrangTua': {
            templateUrl: 'templates/orangTua/absensi/absensi.html',
            controller: 'absensiOrangTuaCtrl'
          }
        }
      })

      .state('menuOrangTua.jadwalPelajaranOrangTua', {
        url: '/jadwalPelajaranOrangTua',
        views: {
          'menuOrangTua': {
            templateUrl: 'templates/orangTua/jadwalPelajaran/jadwalPelajaran.html',
            controller: 'jadwalPelajaranOrangTuaCtrl'
          }
        }
      })
      
      // Tugas Siswa
      .state('menuOrangTua.tugasSiswaPerMapelOrangTua', {
        url: '/tugasSiswaPerMapelOrangTua',
        params: {
          idMapel: "",
        },
        views: {
          'menuOrangTua': {
            templateUrl: 'templates/orangTua/tugas/tugaspermapel.html',
            controller: 'tugasSiswaPerMapelOrangTuaCtrl'
          }
        }
      })
      .state('menuOrangTua.tugasSiswaOrangTua', {
        url: '/tugasSiswaOrangTua',
        params: {
          idMapel: "",
          idKelas: "",
        },
        views: {
          'menuOrangTua': {
            templateUrl: 'templates/orangTua/tugas/tugas.html',
            controller: 'tugasSiswaOrangTuaCtrl'
          }
        }
      })
      .state('menuOrangTua.tugasSiswaLihatOrangTua', {
        url: '/tugasSiswaLihatOrangTua',
        params: {
          idTugas: "",
          pelajaran: "",
          groupTugas: '',
          tahunAjaran: '',
          semester: '',
          pelajaran: '',
          guru: '',
          kelas: '',
          sekolah: '',
          judulTugas: '',
          isiTugas: '',
          nilaiTugasSiswa: '',
          jawabanTugas: '',

          idMapel: "",
          idKelas: "",
        },
        views: {
          'menuOrangTua': {
            templateUrl: 'templates/orangTua/tugas/tugasLihat.html',
            controller: 'tugasSiswaLihatOrangTuaCtrl'
          }
        }
      })
      .state('menuOrangTua.tugasSiswaDiskusiOrangTua', {
        url: '/tugasSiswaDiskusiOrangTua',
        params: {
          idTugas: "",
          pelajaran: "",
          groupTugas: '',
          tahunAjaran: '',
          semester: '',
          pelajaran: '',
          guru: '',
          kelas: '',
          sekolah: '',
          judulTugas: '',
          isiTugas: '',
          nilaiTugasSiswa: '',
          jawabanTugas: '',
          isiChat: '',

          idMapel: "",
          idKelas: "",
        },
        views: {
          'menuOrangTua': {
            templateUrl: 'templates/orangTua/tugas/tugasSiswaDiskusi.html',
            controller: 'tugasSiswaDiskusiOrangTuaCtrl'
          }
        }
      })
      .state('menuOrangTua.uploadFileTugasOrangTua', {
        url: '/uploadFileTugasOrangTua',
        params: {
          idTugas: "",
          pelajaran: "",
          groupTugas: '',
          tahunAjaran: '',
          semester: '',
          pelajaran: '',
          namaGuru: '',
          namaKelas: '',
          namaSekolah: '',
          isiTugas: '',
          nilaiTugasSiswa: '',
          jawabanTugas: '',

          idMapel: "",
          idKelas: "",
        },
        views: {
          'menuOrangTua': {
            templateUrl: 'templates/orangTua/tugas/uploadFile.html',
            controller: 'uploadFileTugasOrangTuaCtrl'
          }
        }
      })
      
    $urlRouterProvider.otherwise('/welcome')


  });
