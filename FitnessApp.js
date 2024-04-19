// Get references to form and summary elements
const activityForm = document.getElementById('activityForm');
const summaryData = document.getElementById('summaryData');
const chartContainer = document.getElementById('chartContainer');

// Initialize array to store activity data
let activities = [];

// Function to add activity to the array and update summary and donut graph
function logActivity(event) {
    event.preventDefault();

    const activityType = document.getElementById('workoutName').value;
    const sets = parseInt(document.getElementById('sets').value);
    const repetitions = parseInt(document.getElementById('repetitions').value);
    const weight = parseInt(document.getElementById('weight').value);

    // Calculate total volume
    const totalVolume = sets * repetitions * weight;

    activities.push({ type: activityType, sets: sets, repetitions: repetitions, weight: weight, volume: totalVolume });
    
    updateDonutGraph();
    updateSummary();
    activityForm.reset();
}

// function to update the donut graph
function updateDonutGraph() {
    const activityTypes = activities.map(activity => activity.type); // Get activity types as labels
    const activityVolumes = activities.map(activity => activity.volume); // Get activity volumes as data

    // Clear previous chart
    chartContainer.innerHTML = '';

    // Create new chart
    const donutChartCanvas = document.createElement('canvas'); // Create canvas element for the chart
    chartContainer.appendChild(donutChartCanvas); // Append canvas to the chart container

    const donutCtx = donutChartCanvas.getContext('2d'); // Get canvas context
    new Chart(donutCtx, { // Create new Chart.js chart
        type: 'doughnut', // Set chart type to doughnut
        data: {
            labels: activityTypes, // Set activity types as labels
            datasets: [{
                data: activityVolumes, // Set activity volumes as data
                backgroundColor: activityTypes.map(type => randomColor()), // Set random colors for activities
            }]
        },
        options: {
            responsive: true, // Make chart responsive
            maintainAspectRatio: false // Allow chart to maintain aspect ratio
        }
    });
}

// Function to generate random color
 function randomColor() {
 	return '#' + Math.floor(Math.random() * 16777215).toString(16);
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

