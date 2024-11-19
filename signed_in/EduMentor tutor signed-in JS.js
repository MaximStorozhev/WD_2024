// Function to open a specific page/section
function openPage(pageId, element, event) {
    event.preventDefault();
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

// Function to show payments based on the selected subject
async function showPayments(subject) {
    try {
        // Simulated data for payments based on subject
        const paymentData = {
            "Arabic": [
                { name: "Alice", plan: 10, sessionDone: "5/10" },
                { name: "Bob", plan: 8, sessionDone: "4/8" }
            ],
            "Biology": [
                { name: "Charlie", plan: 12, sessionDone: "7/12" },
                { name: "David", plan: 5, sessionDone: "2/5" }
            ],
            "Business": [
                { name: "Eva", plan: 10, sessionDone: "3/10" },
                { name: "Frank", plan: 6, sessionDone: "1/6" }
            ],
            // Add more subjects and their payment data as needed
        };

        // Get payment data for the selected subject
        const payments = paymentData[subject] || [];

        // Call function to display the payments
        displayPayments(subject, payments);
    } catch (error) {
        console.error("Error loading subject payments:", error);
    }
}

// Function to display the payments for the selected subject
function displayPayments(subject, payments) {
    // Hide the dashboard
    document.getElementById('dashboard').style.display = 'none';
    
    // Show the payments section
    const paymentsSection = document.getElementById('payments'); // Make sure this ID matches your HTML
    paymentsSection.style.display = 'block';
    document.getElementById('subject-name').textContent = `Payments for ${subject}`;

    // Clear any previous payments
    const tableBody = document.getElementById('payments-table'); // Ensure this ID matches your HTML
    tableBody.innerHTML = '';

    // Populate the payments table
    let totalAmount = 0;
    payments.forEach(payment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${payment.name}</td>
            <td>${payment.plan}</td>
            <td>${payment.sessionDone}</td>
        `;
        tableBody.appendChild(row);

        totalAmount += payment.plan * 100; // Assuming each plan unit is worth 100
    });

    document.getElementById('total-amount').textContent = totalAmount + ' AED';
}

// Example of how to handle subject clicks
document.querySelectorAll('.subject').forEach(subjectElement => {
    subjectElement.addEventListener('click', function() {
        const subjectName = this.querySelector('h2').textContent; // Get the subject name
        showPayments(subjectName); // Call the function to show payments
    });
});