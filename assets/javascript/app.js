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
let nextArrival = 0;
let minAway = 0;

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
        minsAway: ""
    });

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
});
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    let tName = childSnapshot.val().name;
    let tDestination = childSnapshot.val().destination;
    let tTime = childSnapshot.val().nextArrival;
    let tFrequency = childSnapshot.val().frequency;

    let newRow = $("<tr scope=" + "row>").append(
        $("<td>").text(tName),
        $("<td>").text(tDestination),
        $("<td>").text(tFrequency),
        $("<td>").text(tTime),
    );
    $("#train-table > tbody").append(newRow);
});