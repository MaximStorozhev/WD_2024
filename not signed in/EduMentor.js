// Tab Navigation
function openTab(tabName) {
    const tabContents = document.querySelectorAll('.tabcontent');
    tabContents.forEach(tab => tab.style.display = 'none'); // Hide all tabs

    const activeTab = document.getElementById(tabName);
    if (activeTab) {
        activeTab.style.display = 'block'; // Show the clicked tab
    }
}

// Set default tab on page load
document.addEventListener('DOMContentLoaded', () => {
    openTab('student-info'); // Default to "Student Info" tab
});

// Collapsible Sections
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = section.style.display === 'none' ? 'block' : 'none';
    }
}

// Modals
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal if clicking outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}