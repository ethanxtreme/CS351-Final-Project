// Get references to form and summary elements
const activityForm = document.getElementById('activityForm');
const summaryData = document.getElementById('summaryData');

// Initialize array to store activity data
let activities = [];

// Function to add activity to the array and update summary
function logActivity(event) {
    event.preventDefault();

    const activityType = document.getElementById('workoutName').value;
    const sets = parseInt(document.getElementById('sets').value);
    const repetitions = parseInt(document.getElementById('repetitions').value);
    const weight = parseInt(document.getElementById('weight').value);

    // Calculate total volume
    const totalVolume = sets * repetitions * weight;

    activities.push({ type: activityType, sets: sets, repetitions: repetitions, weight: weight, volume: totalVolume });

    updateSummary();
    activityForm.reset();
}

// Function to update the summary
function updateSummary() {
    let totalSets = 0;
    let totalRepetitions = 0;
    let totalWeight = 0;
    let totalVolume = 0;

    // Build table structure
    let summaryHTML = `
        <h3>Workout Summary</h3>
        <table>
            <tr>
                <th>Workout Type</th>
                <th>Sets</th>
                <th>Repetitions</th>
                <th>Weight (lbs)</th>
                <th>Volume (lbs)</th>
            </tr>
    `;

    // Fill table with activity data
    activities.forEach(activity => {
        totalSets += activity.sets;
        totalRepetitions += activity.repetitions;
        totalWeight += activity.weight;
        totalVolume += activity.volume;

        summaryHTML += `
            <tr>
                <td>${activity.type}</td>
                <td>${activity.sets}</td>
                <td>${activity.repetitions}</td>
                <td>${activity.weight}</td>
                <td>${activity.volume}</td>
            </tr>
        `;
    });

    // Add totals row
    summaryHTML += `
        <tr>
            <td><b>Total</b></td>
            <td>${totalSets}</td>
            <td>${totalRepetitions}</td>
            <td>${totalWeight}</td>
            <td>${totalVolume}</td>
        </tr>
    `;

    summaryHTML += '</table>';

    // Update summaryData div with the table
    summaryData.innerHTML = summaryHTML;
}


// Event listener for form submission
activityForm.addEventListener('submit', logActivity);
