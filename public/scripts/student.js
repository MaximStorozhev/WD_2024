async function onLoad() {
    await fetch("/api/auth/me", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((result) => {
            document.getElementById('user-name').innerHTML = result.name
            document.getElementById('user-email').innerHTML = result.email
            document.getElementById('user-type').innerHTML = result.type
        })
        .catch((error) => alert(error));
}

function openPage(pageName, elmnt, event) {
    event.preventDefault(); // Prevent default anchor behavior

    // Hide all tab content
    var tabcontent = document.getElementsByClassName("section");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the active class from all tab links
    var tablinks = document.getElementsByClassName("menu-item");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the selected tab and set it as active
    document.getElementById(pageName).style.display = "block";
    elmnt.classList.add("active");

    // Call hideMaterials to hide the materials section
    hideMaterials();
}


async function logout() {
    await fetch("/api/auth/logout", {
        method: "GET",
    })
        .then((response) => response.json())
        .then(() => {
            return location.replace('/index.html')
        })
        .catch((error) => alert(error));
}




const materialsData = {
    "Arabic": [
        { title: "النحو - قواعد اللغة العربية", url: "path/to/naho.pdf" },
        { title: "النصوص - قراءات أدبية", url: "path/to/nosous.pdf" },
        { title: "الاملاء - تحسين الكتابة", url: "path/to/ilmala.pdf" }
    ],

    "Biology": [
        { title: "Human Biology Textbook", url: "path/to/human-biology-textbook.pdf" },
        { title: "Plant Biology Textbook", url: "path/to/plant-biology-textbook.pdf" },
        { title: "Revision Questions - Human and Plant Biology", url: "path/to/biology-revision-questions.pdf" }
    ],

    "Business": [
        { title: "Business Studies - Term 1", url: "path/to/business-term-one.pdf" },
        { title: "Business Studies - Term 2", url: "path/to/business-term-two.pdf" },
        { title: "Revision Questions - Business Studies", url: "path/to/business-revision-questions.pdf" }
    ],

    "Chemistry": [
        { title: "Organic Chemistry - Introduction", url: "path/to/organic-chemistry.pdf" },
        { title: "Inorganic Chemistry - Principles", url: "path/to/inorganic-chemistry.pdf" },
        { title: "Chemistry Revision Questions", url: "path/to/chemistry-revision-questions.pdf" }
    ],

    "Computer science": [
        { title: "Computer Science - Term 1", url: "path/to/computer-science-term-one.pdf" },
        { title: "Computer Science - Term 2", url: "path/to/computer-science-term-two.pdf" },
        { title: "Revision Questions - Computer Science", url: "path/to/computer-science-revision-questions.pdf" }
    ],

    "English": [
        { title: "English Language - Grammar & Usage", url: "path/to/english-grammar.pdf" },
        { title: "English Literature - Texts and Analysis", url: "path/to/english-literature.pdf" },
        { title: "English Revision Questions", url: "path/to/english-revision-questions.pdf" }
    ],

    "ICT": [
        { title: "ICT - Term 1", url: "path/to/ict-term-one.pdf" },
        { title: "ICT - Term 2", url: "path/to/ict-term-two.pdf" },
        { title: "ICT Revision Questions", url: "path/to/ict-revision-questions.pdf" }
    ],

    "Math": [
        { title: "Mathematics - Algebra & Functions", url: "path/to/math-algebra-functions.pdf" },
        { title: "Mathematics - Geometry & Trigonometry", url: "path/to/math-geometry-trigonometry.pdf" },
        { title: "Math Revision Questions", url: "path/to/math-revision-questions.pdf" }
    ],

    "Physics": [
        { title: "Physics - Term 1", url: "path/to/physics-term-one.pdf" },
        { title: "Physics - Term 2", url: "path/to/physics-term-two.pdf" },
        { title: "Physics Revision Questions", url: "path/to/physics-revision-questions.pdf" }
    ],

    "Social Studies": [
        { title: "Social Studies - Geography & History", url: "path/to/social-studies-geo-history.pdf" },
        { title: "Social Studies - Economics & Government", url: "path/to/social-studies-economics-government.pdf" },
        { title: "Social Studies Revision Questions", url: "path/to/social-studies-revision-questions.pdf" }
    ]
};


// Function to show a specific section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'block'; // Show the selected section

    // Hide the materials section when switching sections
    hideMaterials();
}

// Function to show materials for a specific subject
function showMaterials(subject) {
    document.getElementById('subjectName').innerText = subject;
    const materialList = document.getElementById('materialList');
    materialList.innerHTML = ''; // Clear previous materials

    // Populate the materials list
    materialsData[subject].forEach(material => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = material.url; // Set the href to the PDF URL
        a.innerText = material.title; // Set the text to the material title
        a.target = "_blank"; // Open in a new tab
        li.appendChild(a); // Append the anchor to the list item
        materialList.appendChild(li); // Append the list item to the material list
    });

    // Show materials section
    const materialsContainer = document.getElementById('materials');
    materialsContainer.style.display = 'block'; // Show materials section

    // Hide other sections
    document.querySelectorAll('.section').forEach(section => section.style.display = 'none'); // Hide other sections
}

function hideMaterials() {
    // Logic to hide materials
    const materials = document.getElementById("materials");
    materials.style.display = "none"; // Hides the materials section
    console.log("Materials hidden");
}

// Add event listener to the specific button
document.getElementById("Back_Dash").addEventListener("click", function (event) {
    hideMaterials();
    // Prevent default action to avoid navigation
    event.preventDefault();
});


// paymenty page 

document.addEventListener("DOMContentLoaded", function () {
    const savedCardsContainer = document.getElementById("savedCardsContainer");
    const amountDue = document.getElementById("amountDue").textContent;
    const payButton = document.getElementById("payButton");
    const openAddCardModal = document.getElementById("openAddCardModal");
    const addCardModal = document.getElementById("addCardModal");
    const closeModal = document.querySelector(".close");
    const saveCardButton = document.getElementById("saveCardButton");
    let selectedCard = null;
    let savedCards = [];

    // Render saved cards in the UI
    function renderSavedCards() {
        savedCardsContainer.innerHTML = "";
        savedCards.forEach((card, index) => {
            const cardDiv = document.createElement("div");
            cardDiv.className = "card";
            cardDiv.innerHTML = `
                <input type="radio" name="savedCard" id="card${index}" data-index="${index}">
                <label for="card${index}">**** **** **** ${card.number.slice(-4)}</label>
            `;
            cardDiv.querySelector("input").addEventListener("change", function () {
                selectedCard = savedCards[this.getAttribute("data-index")];
                payButton.disabled = false;
            });
            savedCardsContainer.appendChild(cardDiv);
        });
    }

    // Open the add card modal
    openAddCardModal.addEventListener("click", () => {
        addCardModal.style.display = "block";
    });

    // Close the modal
    closeModal.addEventListener("click", () => {
        addCardModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == addCardModal) {
            addCardModal.style.display = "none";
        }
    });

    // Validate input fields
    function validateCardFields(name, number, expiry, cvv) {
        const namePattern = /^[A-Za-z\s]+$/;
        const numberPattern = /^\d{12}$/;
        const expiryPattern = /^\d{4}$/; // MMYY format
        const cvvPattern = /^\d{3}$/;

        if (!namePattern.test(name)) {
            alert("Cardholder's Name must contain only letters.");
            return false;
        }
        if (!numberPattern.test(number)) {
            alert("Card Number must be exactly 12 digits.");
            return false;
        }
        if (!expiryPattern.test(expiry)) {
            alert("Expiration Date must be in MMYY format (4 digits).");
            return false;
        }
        if (!cvvPattern.test(cvv)) {
            alert("CVV must be exactly 3 digits.");
            return false;
        }
        return true;
    }

    // Save new card
    saveCardButton.addEventListener("click", () => {
        const cardName = document.getElementById("cardName").value;
        const cardNumber = document.getElementById("cardNumber").value.replace(/\s/g, ""); // Remove spaces
        const cardExpiry = document.getElementById("cardExpiry").value;
        const cardCvv = document.getElementById("cardCvv").value;

        if (validateCardFields(cardName, cardNumber, cardExpiry, cardCvv)) {
            const newCard = {
                name: cardName,
                number: cardNumber,
                expiry: cardExpiry,
                cvv: cardCvv
            };
            savedCards.push(newCard);
            renderSavedCards();

            // Clear fields and close modal
            document.getElementById("cardName").value = "";
            document.getElementById("cardNumber").value = "";
            document.getElementById("cardExpiry").value = "";
            document.getElementById("cardCvv").value = "";
            addCardModal.style.display = "none";
        }
    });

    // Handle payment with selected card
    payButton.addEventListener("click", () => {
        if (selectedCard) {
            alert(`Paid ${amountDue} using card ending in ${selectedCard.number.slice(-4)}`);
        }
    });

    renderSavedCards();
});


