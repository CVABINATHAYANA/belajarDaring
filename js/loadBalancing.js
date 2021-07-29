//Data Pokok
const appGuru = firebase.initializeApp({
  databaseURL: "https://newguru.firebaseio.com/",
}, 'appGuru');
const appSiswa = firebase.initializeApp({
  databaseURL: "https://newsiswa.firebaseio.com/",
}, 'appSiswa');
const appSiswaSekolah = firebase.initializeApp({
  databaseURL: "https://newsiswasekolah.firebaseio.com/",
}, 'appSiswaSekolah');

//eLearning
const appBankSoal = firebase.initializeApp({
  databaseURL: "https://newbanksoal.firebaseio.com/",
}, 'appBankSoal');
const appMateriPelajaran = firebase.initializeApp({
  databaseURL: "https://newmatapelajaran.firebaseio.com/",
}, 'appMateriPelajaran');

const appJadwalPelajaran = firebase.initializeApp({
  databaseURL: "https://newjadwalpelajaran.firebaseio.com/",
}, 'appJadwalPelajaran');

//PerSekolah-Negeri
const app_smpn1 = firebase.initializeApp({
  databaseURL: "https://newsmpn1.firebaseio.com/",
}, 'app_smpn1');

const app_smpn1sukasada = firebase.initializeApp({
  databaseURL: "https://newsmpn1sukasada.firebaseio.com/",
}, 'app_smpn1sukasada');