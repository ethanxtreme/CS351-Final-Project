// Get references to form and summary elements
const activityForm = document.getElementById('activityForm');
const summaryData = document.getElementById('summaryData');

// Initialize array to store activity data
let activities = [];

// Function to add activity to the array and update summary
function logActivity(event) {
    event.preventDefault();

    const activityType = document.getElementById('activityType').value;
    const duration = parseInt(document.getElementById('duration').value);

    activities.push({ type: activityType, duration: duration });

    updateSummary();
    activityForm.reset();
}

// Function to update the summary
function updateSummary() {
    let totalDuration = 0;

    summaryData.innerHTML = '<h3>Activity Summary</h3>';
    activities.forEach(activity => {
        totalDuration += activity.duration;
        summaryData.innerHTML += `<p>${activity.type}: ${activity.duration} minutes</p>`;
    });

    summaryData.innerHTML += `<p>Total Duration: ${totalDuration} minutes</p>`;
}

// Event listener for form submission
activityForm.addEventListener('submit', logActivity);
