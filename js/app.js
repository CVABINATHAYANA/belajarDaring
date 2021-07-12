// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives', 'app.excel', 'app.services', 'firebase', 'firebaseConfig', 'ngCordova', 'ngFileUpload', 'app.authentification', 'app.registrasi', 'app.berandaAdmin', 'app.pengaturanAdmin', 'app.dataPokokSekolahAdmin', 'app.kurikulumAdmin', 'app.absensiAdmin', 'app.tugasAdmin', 'app.bankSoalAdmin', 'app.materiPelajaranAdmin', 'app.dataAkunAdmin', 'app.berandaAdminSOC', 'app.pelajaranSOCAdmin', 'app.pengaturanUmumSOCAdmin', 'app.registrasiPesertaSOCAdmin', 'app.nilaiPeringkatSOCAdmin', 'app.berandaUjianOnlineAdmin', 'app.pelajaranUjianOnlineAdmin', 'app.pengaturanUmumUjianOnlineAdmin', 'app.registrasiPesertaUjianOnlineAdmin', 'app.nilaiPeringkatUjianOnlineAdmin', 'app.berandaUTSUASAdmin', 'app.pelajaranUTSUASAdmin', 'app.pengaturanUmumUTSUASAdmin', 'app.registrasiPesertaUTSUASAdmin', 'app.nilaiPeringkatUTSUASAdmin', 'app.berandaTryoutOnlineAdmin', 'app.pengaturanUmumTryoutOnlineAdmin', 'app.pelajaranTryoutOnlineAdmin', 'app.registrasiPesertaTryoutOnlineAdmin', 'app.nilaiPeringkatTryoutOnlineAdmin', 'app.berandaSiswa', 'app.berandaSOCSiswa', 'app.mulaiOlimpiadeSOCSiswa', 'app.olimpiadeDetailSOCSiswa', 'app.kisiKisiSoalSOCSiswa', 'app.pesertaOlimpiadeSOCSiswa', 'app.nilaiAndaSOCSiswa', 'app.peringkatAndaSOCSiswa', 'app.olimpiadeOnlineSOCSiswa', 'app.berandaUjianOnlineSiswa', 'app.mulaiUjianOnlineSiswa', 'app.ujianOnlineSiswa', 'app.ujianOnlineDetailSiswa', 'app.pesertaUjianOnlineSiswa', 'app.nilaiAndaUjianOnlineSiswa', 'app.peringkatAndaUjianOnlineSiswa', 'app.kisiKisiSoalUjianOnlineSiswa', 'app.berandaLatihanSoalOnlineSiswa', 'app.berandaLatihanSoalOnlineSiswaUmum', 'app.berandaUTSUASSiswa', 'app.mulaiUTSUASSiswa', 'app.UTSUASOnlineSiswa', 'app.nilaiAndaUTSUASSiswa', 'app.peringkatAndaUTSUASSiswa', 'app.UTSUASDetailSiswa', 'app.kisiKisiSoalUTSUASSiswa', 'app.pesertaUTSUASSiswa', 'app.berandaTryoutOnlineSiswa', 'app.mulaiTryoutOnlineSiswa', 'app.TryoutOnlineSiswa', 'app.TryoutOnlineDetailSiswa', 'app.kisiKisiSoalTryoutOnlineSiswa', 'app.pesertaTryoutOnlineSiswa', 'app.nilaiAndaTryoutOnlineSiswa', 'app.peringkatAndaTryoutOnlineSiswa', 'app.dataAkunSiswa', 'app.jadwalPelajaranSiswa', 'app.absensiSiswa', 'app.tugasSiswa', 'app.bankSoalSiswa', 'app.materiPelajaranSiswa', 'app.berandaKuisOnlineSiswaUmum', 'app.berandaTryoutOnlineSiswaUmum', 'app.berandaGuru', 'app.pengaturanGuru', 'app.dataPokokSekolahGuru', 'app.kurikulumGuru', 'app.absensiGuru', 'app.tugasGuru', 'app.bankSoalGuru', 'app.materiPelajaranGuru', 'app.dataAkunGuru', 'app.berandaGuruSOC', 'app.pelajaranSOCGuru', 'app.pengaturanUmumSOCGuru', 'app.registrasiPesertaSOCGuru', 'app.nilaiPeringkatSOCGuru', 'app.berandaUjianOnlineGuru', 'app.pelajaranUjianOnlineGuru', 'app.pengaturanUmumUjianOnlineGuru', 'app.registrasiPesertaUjianOnlineGuru', 'app.nilaiPeringkatUjianOnlineGuru', 'app.berandaUTSUASGuru', 'app.pelajaranUTSUASGuru', 'app.pengaturanUmumUTSUASGuru', 'app.registrasiPesertaUTSUASGuru', 'app.nilaiPeringkatUTSUASGuru', 'app.berandaTryoutOnlineGuru', 'app.pengaturanUmumTryoutOnlineGuru', 'app.pelajaranTryoutOnlineGuru', 'app.registrasiPesertaTryoutOnlineGuru', 'app.nilaiPeringkatTryoutOnlineGuru', 'app.berandaSekolah', 'app.pengaturanSekolah', 'app.dataPokokSekolahSekolah', 'app.dataPokokPrasaranaSekolah', 'app.dataPokokRombelSekolah', 'app.dataPokokSaranaSekolah', 'app.dataPokokGuruSekolah', 'app.dataPokokSiswaSekolah', 'app.kurikulumSekolah', 'app.absensiSekolah', 'app.tugasSekolah', 'app.bankSoalSekolah', 'app.materiPelajaranSekolah', 'app.dataAkunSekolah', 'app.berandaSekolahSOC', 'app.pelajaranSOCSekolah', 'app.pengaturanUmumSOCSekolah', 'app.registrasiPesertaSOCSekolah', 'app.nilaiPeringkatSOCSekolah', 'app.berandaUjianOnlineSekolah', 'app.pelajaranUjianOnlineSekolah', 'app.pengaturanUmumUjianOnlineSekolah', 'app.registrasiPesertaUjianOnlineSekolah', 'app.nilaiPeringkatUjianOnlineSekolah', 'app.berandaUTSUASSekolah', 'app.pelajaranUTSUASSekolah', 'app.pengaturanUmumUTSUASSekolah', 'app.registrasiPesertaUTSUASSekolah', 'app.nilaiPeringkatUTSUASSekolah', 'app.berandaTryoutOnlineSekolah', 'app.pengaturanUmumTryoutOnlineSekolah', 'app.pelajaranTryoutOnlineSekolah', 'app.registrasiPesertaTryoutOnlineSekolah', 'app.nilaiPeringkatTryoutOnlineSekolah', 'app.videoTutorialGuru', 'app.videoTutorialSekolah', 'app.adminSekolah', 'app.videoTutorialSiswa', 'app.visiMisiSekolah', 'app.tentangKamiSekolah', 'app.beritaSekolah', 'app.informasiSekolah', 'app.webAlbumFotoSekolah', 'app.webAlbumVideoSekolah', 'app.layananKamiSekolah'])

  .config(function ($ionicConfigProvider, $sceDelegateProvider) {
    $ionicConfigProvider.backButton.text('').previousTitleText(false);

    $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

  })

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  /*
    This directive is used to disable the "drag to open" functionality of the Side-Menu
    when you are dragging a Slider component.
  */
  .directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function ($ionicSideMenuDelegate, $rootScope) {
    return {
      restrict: "A",
      controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

        function stopDrag() {
          $ionicSideMenuDelegate.canDragContent(false);
        }

        function allowDrag() {
          $ionicSideMenuDelegate.canDragContent(true);
        }

        $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
        $element.on('touchstart', stopDrag);
        $element.on('touchend', allowDrag);
        $element.on('mousedown', stopDrag);
        $element.on('mouseup', allowDrag);

      }]
    };
  }])

  /*
    This directive is used to open regular and dynamic href links inside of inappbrowser.
  */
  .directive('hrefInappbrowser', function () {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      link: function (scope, element, attrs) {
        var href = attrs['hrefInappbrowser'];

        attrs.$observe('hrefInappbrowser', function (val) {
          href = val;
        });

        element.bind('click', function (event) {

          window.open(href, '_system', 'location=yes');

          event.preventDefault();
          event.stopPropagation();

        });
      }
    };
  });