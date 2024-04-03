document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('resumeForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const educationInput = document.getElementById('education');
    const workExperienceInput = document.getElementById('workExperience');
    const skillsInput = document.getElementById('skills');
    const resumePreview = document.getElementById('resumePreview');
    const generatePDFButton = document.getElementById('generatePDF');
  
    // Function to generate resume preview
    function generateResumePreview() {
      const fullName = fullNameInput.value;
      const email = emailInput.value;
      const phone = phoneInput.value;
      const education = educationInput.value;
      const workExperience = workExperienceInput.value;
      const skills = skillsInput.value;
  
      const resumeHTML = `
        <h2>Preview</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Work Experience</h3>
        <p>${workExperience}</p>
        <h3>Skills</h3>
        <p>${skills}</p>
      `;
      resumePreview.innerHTML = resumeHTML;
    }
  
    // Event listener for form submission
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
      generateResumePreview(); // Generate resume preview
    });
  
    // Event listener for "Generate PDF" button click
    generatePDFButton.addEventListener('click', function() {
      const element = document.getElementById('resumePreview');
      html2pdf().from(element).save();
    });
  
    // Event listeners for input fields to update preview dynamically
    fullNameInput.addEventListener('input', generateResumePreview);
    emailInput.addEventListener('input', generateResumePreview);
    phoneInput.addEventListener('input', generateResumePreview);
    educationInput.addEventListener('input', generateResumePreview);
    workExperienceInput.addEventListener('input', generateResumePreview);
    skillsInput.addEventListener('input', generateResumePreview);
  });
  