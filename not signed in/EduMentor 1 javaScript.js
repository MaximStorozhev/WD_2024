function resetFilters() {
  //reset select dropdowns (assuming they have IDs 'home-subject' and 'tutor-subject')
  const selectElements = document.querySelectorAll('select');
  selectElements.forEach(select => {
    select.selectedIndex = 0; //reset to first option (or you can set to an empty value if preferred)
  });
}

//open the search page and filter results based on the selected subject
function openSearchPage(isFromHome = false) {
  const searchPage = document.querySelector('#tutor-search');
  if (searchPage) {
    searchPage.style.display = 'block'; 
  }

//determine which search bar to use based on where the request came from
  const selectedSubject = isFromHome
      ? document.querySelector('#home-subject').value.toLowerCase()
      : document.querySelector('#tutor-subject').value.toLowerCase();

  console.log("Selected Subject:", selectedSubject); //use to debug

  const tutorCards = document.querySelectorAll('#profileGrid .tutor-card');

  // loop through each tutor card and show/hide based on the selected subject
  tutorCards.forEach(card => {
      const subjectsText = card.querySelector('.details p').innerText.toLowerCase();
      console.log("Tutor Card Subjects:", subjectsText);

      const subjects = subjectsText.split(/\s*,\s*|\s*\n\s*/); 
      console.log("Parsed Subjects:", subjects); 

      const hasMatch = subjects.some(subject => subject.includes(selectedSubject));

      if (selectedSubject === "" || hasMatch) {
          card.style.display = 'block'; 
      } else {
          card.style.display = 'none'; 
      }
  });
  resetFilters();
}

//  hide the search page 
function closeSearchPage() {
  const searchPage = document.querySelector('#tutor-search');
  if (searchPage) {
    searchPage.style.display = 'none'; 
  }
}

// open a page and trigger actions for the search page
function openPage(pageName, elmnt, event, isFromHome = false) {
  event.preventDefault(); 

  // hide all tab content
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none"; 
  }

  // remove the active class from all tab links
  const tablinks = document.getElementsByClassName("tablink");
  for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
  }

  // ensure the selected page is visible
  const page = document.getElementById(pageName);
  if (page) {
      page.style.display = "block"; 
  } else {
      console.error(`Page with id "${pageName}" not found.`);
      return; // exit early if the page is not found
  }

  // add active class to the clicked tab link
  if (elmnt) {
      elmnt.classList.add("active");
  }

  // close the search page if we're navigating to a different page
  if (pageName !== "tutor-search") {
    closeSearchPage(); 
  }

  //automatically trigger search if it's the search page
  if (pageName === "tutor-search") {
      openSearchPage(isFromHome); 
  }
}

// open the tutor search page from home 
function openSearchPageFromHome() {
  openSearchPage(true); 
}














// detailed profiles

document.addEventListener('DOMContentLoaded', function() {
  const tutorData = {
      'Alice Johnson': {
          name: 'Alice Johnson',
          email: 'alice.j@example.com',
          phone: '123-456-7890',
          
          bio: 'I am a passionate Scholar of Mathematics with over 8 years experience in this field. My methods of teachings are easy to understand because i use a lot of real life scenario to model the problems , which always gives me ,positive results with all my students',
          subjectName: 'Math, Physics',
        
          resume: {
              diploma: 'MSc in Mathematics, University of Oxford',
              workExperience: 'Mathematics Teacher, Oxford High School'
          },
          reviews: 'Excellent tutor, very knowledgeable!'
      },
      'Ahmed Saif': {
          name: 'Ahmed Saif',
          email: 'ahmed.s@example.com',
          phone: '234-567-8901',
         
          bio: 'Computer Science and ICT teacher with 10 years of experience. I am Passionate about fostering critical thinking, problem-solving, and practical skills in students, they ensure learners are well-prepared for exams and real-world challenges.',
          subjectName: 'Computer Science, ICT',
          
          resume: {
              diploma: 'BSc in Computer Science, Cairo University',
              workExperience: 'ICT Teacher, Cairo International School'
          },
          reviews: 'Very patient and thorough in explaining complex topics.'
      },
      'Cathy Brown': {
          name: 'Cathy Brown',
          email: 'cathy.b@example.com',
          phone: '345-678-9012',
         
          bio: 'English literature specialist with over 13 years experience in the field. Exited to help students develop critical reading, analytical, and writing skills.',
          subjectName: 'English, Social Studies',
         
          resume: {
              diploma: 'MA in English Literature, Harvard University',
              workExperience: 'English Teacher, Cambridge Academy'
          },
          reviews: 'Fantastic teacher! Makes literature fun and engaging.'
      }
  };

  // open the modal and display tutor info
  window.fetchTutorProfile = function(tutorName) {
    const tutor = tutorData[tutorName];

    if (tutor) {
        document.getElementById('tutorName').innerText = tutor.name;
        document.getElementById('tutorBio').innerText = `Bio: ${tutor.bio}`;
        document.getElementById('tutorCurriculum').innerText = `Subjects: ${tutor.subjectName}`;
        document.getElementById('tutorPhone').innerText = `Phone: ${tutor.phone}`;
        document.getElementById('tutorEmail').innerText = `Email: ${tutor.email}`;

        document.querySelector('.resume').innerHTML = `
            <h3>Resume</h3>
            <p><strong>Diploma:</strong> ${tutor.resume.diploma}</p>
            <p><strong>Work Experience:</strong> ${tutor.resume.workExperience}</p>
        `;

        document.querySelector('.reviews').innerHTML = `
            <h3>Reviews</h3>
            <p>${tutor.reviews}</p>
        `;

        
        document.getElementById('tutorModal').style.display = 'block';
    } else {
        alert('Tutor not found');
    }
};


window.closeModal = function() {
    document.getElementById('tutorModal').style.display = 'none';
};

});















// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  const menuItems = menu.querySelectorAll('a');

 
  function toggleMenu() {
      menu.classList.toggle('show');
      hamburger.classList.toggle('active');
  }

  
  hamburger.addEventListener('click', toggleMenu);


  menuItems.forEach(item => {
      item.addEventListener('click', () => {
          menu.classList.remove('show');
          hamburger.classList.remove('active');
      });
  });

  document.addEventListener('click', (event) => {
      if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
          menu.classList.remove('show');
          hamburger.classList.remove('active');
      }
  });
});









// event listener for log in form submission
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  // elements for sign-up and log-in
  const signupBtn = document.getElementById('signupBtn');
  const loginBtn = document.getElementById('loginBtn');
  const signupModal = document.getElementById('sign_up');
  const loginModal = document.getElementById('log_in');
  const closeButtons = document.querySelectorAll('.close');

  
  function openModal(modal) {
      modal.style.display = "block";
  }

  function closeModal(modal) {
      modal.style.display = "none";
  }

  
// select all elements with href="#sign_up"
const signupButtons = document.querySelectorAll('a[href="#sign_up"]');
    
signupButtons.forEach(button => {
    button.addEventListener('click', (event) => {
     event.preventDefault(); // Prevent default link behavior
     document.getElementById('sign_up').style.display = 'block';
    });
  });


  // show log-in modal when log-in button is clicked
  loginBtn.addEventListener('click', (event) => {
      event.preventDefault();
      openModal(loginModal);
  });

  // close modals when clicking outside of them
  window.onclick = function(event) {
      if (event.target === signupModal) closeModal(signupModal);
      if (event.target === loginModal) closeModal(loginModal);
  };

  // close modals when clicking close button (×)
  closeButtons.forEach(button => {
      button.addEventListener('click', () => {
          const modal = button.closest('.modal');
          closeModal(modal);
      });
  });
});



// form submission for sign-up
function handleSubmit(event) {
  event.preventDefault();
  const password = document.getElementById('psw').value;
  const passwordRepeat = document.getElementById('psw-repeat').value;

  if (password !== passwordRepeat) {
      alert("Passwords do not match!");
      return;
  }

  console.log("Sign-up form submitted!");
  document.getElementById('sign_up').style.display = 'none';
}

// form submission for log-in
function handleLogin(event) {
  event.preventDefault();
  console.log("Login form submitted!");
  document.getElementById('log_in').style.display = 'none';
}



// home page review functions 
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}


function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
}