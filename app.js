const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');
const homeBtn = document.getElementById('home-btn');
const exitBtn = document.getElementById('exit-btn');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const resultDiv = document.getElementById('result');
const bmiValueSpan = document.getElementById('bmi-value');
const bmiMessageDiv = document.getElementById('bmi-message');
const bmiChartDiv = document.getElementById('bmi-chart');

function calculateBMI(height, weight) {
    return weight / ((height / 100) ** 2);
}

function updateChart(bmi) {
    let chartWidth = 0;
    let color = '';

    if (bmi < 18.5) {
        color = 'green';
        chartWidth = (bmi / 18.5) * 100; // Normalize to max 100%
        bmiMessageDiv.innerText = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        color = 'yellow';
        chartWidth = ((bmi - 18.5) / (24.9 - 18.5)) * 100; // Normalize to max 100%
        bmiMessageDiv.innerText = 'Normal weight';
    } else {
        color = 'red';
        chartWidth = ((bmi - 24.9) / 30) * 100; // Normalize to max 100%
        bmiMessageDiv.innerText = 'Overweight/Obesity';
    }

    bmiChartDiv.style.width = `${chartWidth}%`;
    bmiChartDiv.style.backgroundColor = color;
}

calculateBtn.addEventListener('click', () => {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    if (height > 0 && weight > 0) {
        const bmi = calculateBMI(height, weight).toFixed(2);
        bmiValueSpan.innerText = bmi;
        resultDiv.style.display = 'block';
        updateChart(bmi);
    } else {
        alert('Please enter valid height and weight.');
    }
});

resetBtn.addEventListener('click', () => {
    heightInput.value = '';
    weightInput.value = '';
    resultDiv.style.display = 'none';
    bmiChartDiv.style.width = '0%'; // Reset chart width
    bmiChartDiv.style.backgroundColor = ''; // Reset color
    bmiValueSpan.innerText = '';
    bmiMessageDiv.innerText = '';
});

homeBtn.addEventListener('click', () => {
    // Add your home navigation logic here
    alert('Navigating to Home...');
});

exitBtn.addEventListener('click', () => {
    // Logic to exit the app or go back
    alert('Exiting the app...');
    // In a web app, you may want to redirect or close the window
});