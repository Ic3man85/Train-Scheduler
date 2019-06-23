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
let nextArrival = "";

function Time() {
    let current = moment().format('LT');
    $("#current-time").text(current);
    setTimeout(Time, 1000);
};

$("#add-train").on("click", function(event) {
    event.preventDefault();

    name = $("#train-name").val().trim();
    destination = $("#train-destination").val().trim();
    nextArrival = moment($("#train-time").val().trim(), "HH:mm").format("HH:mm");
    frequency = $("#frequency").val().trim();

    database.ref().push({

        trainName: name,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
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
    let tTime = childSnapshot.val().nextArrival;
    let tFrequency = childSnapshot.val().frequency;

    let newTime = moment(tTime, "HH:mm").format("HH:mm");
    let minTime = moment().add(moment(newTime), "minutes");
    let remainTime = minTime % tFrequency;
    let minArrival = tFrequency - remainTime;
    let nextTrain = moment().add(minArrival, "minutes");

    let newRow = $("<tr>");

    newRow.append($("<td>").text(tName));
    newRow.append($("<td>").text(tDestination));
    newRow.append($("<td class= text-center>").text(tFrequency));
    newRow.append($("<td>").text(moment(nextTrain).format('LT')));
    newRow.append($("<td class= text-center>").text(minArrival));
    $("#show-train").append(newRow);
});

Time();

setInterval(function() {
    window.location.reload();
}, 60000);