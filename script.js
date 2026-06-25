let activities = JSON.parse(localStorage.getItem("fitnessData")) || [];

function saveData() {

    let steps = Number(document.getElementById("steps").value);
    let exercise = document.getElementById("exercise").value;
    let minutes = Number(document.getElementById("minutes").value);
    let calories = Number(document.getElementById("calories").value);

    if (!exercise || steps <= 0 || minutes <= 0 || calories <= 0) {
        alert("Please enter all details.");
        return;
    }

    let activity = {
        steps,
        exercise,
        minutes,
        calories
    };

    activities.push(activity);

    localStorage.setItem(
        "fitnessData",
        JSON.stringify(activities)
    );

    document.getElementById("steps").value = "";
    document.getElementById("exercise").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("calories").value = "";

    loadDashboard();
}

function loadDashboard() {

    let totalSteps = 0;
    let totalMinutes = 0;
    let totalCalories = 0;

    let list = document.getElementById("activityList");
    list.innerHTML = "";

    activities.forEach(item => {

        totalSteps += item.steps;
        totalMinutes += item.minutes;
        totalCalories += item.calories;

        let li = document.createElement("li");

        li.innerText =
            `${item.exercise} - ${item.minutes} min | ${item.steps} steps | ${item.calories} cal`;

        list.appendChild(li);
    });

    document.getElementById("stepCount").innerText = totalSteps;
    document.getElementById("minuteCount").innerText = totalMinutes;
    document.getElementById("calorieCount").innerText = totalCalories;

    document.getElementById("stepBar").style.width =
        Math.min(totalSteps / 10000 * 100, 100) + "%";

    document.getElementById("minuteBar").style.width =
        Math.min(totalMinutes / 120 * 100, 100) + "%";

    document.getElementById("calorieBar").style.width =
        Math.min(totalCalories / 1000 * 100, 100) + "%";
}

loadDashboard();
