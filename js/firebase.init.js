angular.module('firebaseConfig', ['firebase'])

    .run(function () {

        // My app's Firebase configuration
        var config = {
            apiKey: "AIzaSyA3EKVxrKB46XcrJ3MHyBX3S50NwcRuDlg",
            authDomain: "bulelengeducation.firebaseapp.com",
            databaseURL: "https://bulelengeducation-default-rtdb.firebaseio.com",
            projectId: "bulelengeducation",
            storageBucket: "bulelengeducation.appspot.com",
            messagingSenderId: "540495880933",
            appId: "1:540495880933:web:091d1277c1c8cbabf3ea0c",
            measurementId: "G-G2NNSRBNN4"
        };
        // Initialize Firebase
        firebase.initializeApp(config);
        // firebase.analytics();


    })

/*

.service("TodoExample", ["$firebaseArray", function($firebaseArray){
    var ref = firebase.database().ref().child("todos");
    var items = $firebaseArray(ref);
    var todos = {
        items: items,
        addItem: function(title){
            items.$add({
                title: title,
                finished: false
            })
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        }
    }
    return todos;
}])

*/




// angular.module('firebaseConfig', ['firebase'])

//     .run(function () {

//         // My app's Firebase configuration
//         var config = {
//             apiKey: "AIzaSyBEk-ynCcQyVkDqhTDNOyO-CSCzkbar0JA",
//             authDomain: "denpasar-10e2a.firebaseapp.com",
//             databaseURL: "https://denpasar-10e2a.firebaseio.com",
//             projectId: "denpasar",
//             storageBucket: "denpasar.appspot.com",
//             messagingSenderId: "76976225491",
//             appId: "1:76976225491:web:7c589489dbad41f530a826",
//             measurementId: "G-ZS8LB8SZRZ"
//         };
//         // Initialize Firebase
//         firebase.initializeApp(config);
//         // firebase.analytics();


//     })

// /*

// .service("TodoExample", ["$firebaseArray", function($firebaseArray){
//     var ref = firebase.database().ref().child("todos");
//     var items = $firebaseArray(ref);
//     var todos = {
//         items: items,
//         addItem: function(title){
//             items.$add({
//                 title: title,
//                 finished: false
//             })
//         },
//         setFinished: function(item, newV){
//             item.finished = newV;
//             items.$save(item);
//         }
//     }
//     return todos;
// }])

// */