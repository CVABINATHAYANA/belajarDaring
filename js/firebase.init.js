angular.module('firebaseConfig', ['firebase'])

    .run(function () {

        // My app's Firebase configuration
        var config = {
            apiKey: "AIzaSyCZk4ZHTRUNjQ9pGe6CuuWLRCdeGWvWwz4",
            authDomain: "newbulelengeducation.firebaseapp.com",
            databaseURL: "https://newbulelengeducation-default-rtdb.firebaseio.com",
            projectId: "newbulelengeducation",
            storageBucket: "newbulelengeducation.appspot.com",
            messagingSenderId: "719991188095",
            appId: "1:719991188095:web:c9174892795884731d2d4a",
            measurementId: "G-7J9KWW98NP"
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