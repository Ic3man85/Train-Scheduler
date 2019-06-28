var firebaseConfig = {
    apiKey: "AIzaSyBmRE4zYkLXUUNrIPM1-V1QqC2gbkltEqQ",
    authDomain: "train-scheduler-72425.firebaseapp.com",
    databaseURL: "https://train-scheduler-72425.firebaseio.com",
    projectId: "train-scheduler-72425",
    storageBucket: "",
    messagingSenderId: "1052448589503",
    appId: "1:1052448589503:web:713daba2f459cced"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();
let name = "";
let destination = "";
let frequency = 0;
let trainTime = ""

function Time() {
    let current = moment().format('LT');
    $("#current-time").text(current);
    setTimeout(Time, 1000);
};

$("#add-train").on("click", function(event) {
    event.preventDefault();

    name = $("#train-name").val().trim();
    destination = $("#train-destination").val().trim();
    trainTime = moment($("#train-time").val(), "HH:mm").format("HH:mm");
    frequency = $("#frequency").val().trim();

    database.ref().push({

        name: name,
        destination: destination,
        frequency: frequency,
        nextArrival: trainTime,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
});
database.ref().on("child_added", function(childSnapshot) {
    let tName = childSnapshot.val().name;
    let tDestination = childSnapshot.val().destination;
    let tTime = childSnapshot.val().trainTime;
    let tFrequency = childSnapshot.val().frequency;
    let remove = childSnapshot.key;

    let newTime = moment(tTime, "HH:mm").format("HH:mm");
    let minTime = moment().add(moment(newTime), "minutes");
    let remainTime = minTime % tFrequency;
    let minArrival = tFrequency - remainTime;
    let nextTrain = moment().add(minArrival, "minutes");

    let row = $("<tr>");
    row.append($("<td>").text(tName));
    row.append($("<td>").text(tDestination));
    row.append($("<td class= text-center>").text(tFrequency));
    row.append($("<td>").text(moment(nextTrain).format('LT')));
    row.append($("<td class= text-center>").text(minArrival));
    $("#show-train").append(row);
});

Time();

// setTimeout(function() {
// window.location.reload();
// }, 60000);