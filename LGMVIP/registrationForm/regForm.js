document.addEventListener('DOMContentLoaded', function () {
  const enrollmentForm = document.getElementById('enrollmentForm');
  const studentList = document.getElementById('studentList');
  
  enrollmentForm.addEventListener('submit', function (event) {
  event.preventDefault();
  

  // Capture form data
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const websiteInput = document.getElementById('website');
  const imageInput = document.getElementById('image');
  const genderInput = document.querySelector('input[name="gender"]:checked');
  const skillsInputs = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
  
  const name = nameInput.value;
  const email = emailInput.value;
  const website = websiteInput.value;
  const image = imageInput.value;
  const gender = genderInput ? genderInput.value : '';
  const skills = skillsInputs.map(skill => skill.value);
  
  // Create student object
  const student = {
    name: name,
    email: email,
    website: website,
    image: image,
    gender: gender,
    skills: skills
  };
  
  // Retrieve existing students or initialize empty array
  let enrolledStudents = JSON.parse(localStorage.getItem('enrolledStudents')) || [];
  
  // Add new student
  enrolledStudents.push(student);
  
  // Update local storage
  localStorage.setItem('enrolledStudents', JSON.stringify(enrolledStudents));
  
  // Clear form inputs
  nameInput.value = '';
  emailInput.value = '';
  websiteInput.value = '';
  imageInput.value = '';
  if (genderInput) {
    genderInput.checked = false;
  }
  skillsInputs.forEach(skillInput => {
    skillInput.checked = false;
  });
  
  // Display enrolled students
  displayEnrolledStudents(enrolledStudents);
  });
  
  // Function to display enrolled students
  function displayEnrolledStudents(students) {
  studentList.innerHTML = ''; // Clear previous content
  

  students.forEach((student, index) => {
    const studentDiv = document.createElement('div');
    studentDiv.classList.add('student');
  
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('student-image-container');
    const studentImage = document.createElement('img');
    studentImage.src = "https://t4.ftcdn.net/jpg/01/81/16/91/360_F_181169190_NoBkoTD2KpGZ6gB3pMoYLYdPhOr6yckB.jpg"
    studentImage.classList.add('student-image');
    imageDiv.appendChild(studentImage);
  
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('student-details');
    detailsDiv.innerHTML = `
      <h3>${student.name}</h3>
      <p><strong>Email:</strong> ${student.email}</p>
      <p><strong>Website:</strong> <a href="${student.website}" target="_blank">${student.website}</a></p>
      <p><strong>Gender:</strong> ${student.gender}</p>
      <p><strong>Skills:</strong> ${student.skills.join(', ')}</p>
    `;
  
    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function() {
      deleteStudent(index);
    });
  
    studentDiv.appendChild(imageDiv);
    studentDiv.appendChild(detailsDiv);
    studentDiv.appendChild(deleteButton);
    studentList.appendChild(studentDiv);
  });
  }
  
  // Function to delete a student
  function deleteStudent(index) {
  let enrolledStudents = JSON.parse(localStorage.getItem('enrolledStudents')) || [];
  enrolledStudents.splice(index, 1); // Remove student from array
  localStorage.setItem('enrolledStudents', JSON.stringify(enrolledStudents)); // Update local storage
  displayEnrolledStudents(enrolledStudents); // Re-display enrolled students
  }
  
  // Display enrolled students on page load
  const storedStudents = JSON.parse(localStorage.getItem('enrolledStudents'));
  if (storedStudents) {
  displayEnrolledStudents(storedStudents);
  }
  });