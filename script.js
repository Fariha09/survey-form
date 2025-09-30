document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("surveyModal");
  // const openBtn = document.getElementById("openSurveyBtn"); <-- REMOVED
  const closeBtn = document.querySelector(".close-button");

  const formSteps = Array.from(document.querySelectorAll(".form-step"));
  const nextBtns = document.querySelectorAll(".next-btn");
  const prevBtns = document.querySelectorAll(".prev-btn");
  const form = document.getElementById("survey-form");
  const progressSteps = document.querySelectorAll(".progress-bar .step");

  let currentStep = 0;

  // --- Modal Functions ---
  // The showModal function is removed as the modal is open by default.

  function hideModal() {
    modal.classList.remove("show");
  }

  // openBtn.addEventListener("click", showModal); <-- REMOVED
  closeBtn.addEventListener("click", hideModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      hideModal();
    }
  });

  // --- Form Navigation ---
  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (validateStep()) {
          currentStep++;
          updateFormSteps();
      }
    });
  });

  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentStep--;
      updateFormSteps();
    });
  });

  function updateFormSteps() {
    formSteps.forEach((step, index) => {
      step.classList.toggle("active", index === currentStep);
    });
    updateProgressBar();
  }
  
  function updateProgressBar() {
    progressSteps.forEach((step, index) => {
        if (index <= currentStep) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }
    });
  }

  function validateStep() {
    const currentStepFields = formSteps[currentStep].querySelectorAll("[required]");
    let isValid = true;
    currentStepFields.forEach(field => {
        if (!field.value.trim()) {
            // Optional: You can add error message handling here
            field.style.borderColor = 'red'; // Example feedback
            isValid = false;
        } else {
            field.style.borderColor = ''; // Reset border
        }
    });
    return isValid;
  }

  // --- Form Submission ---
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateStep()) {
        const formData = new FormData(form);
        console.log("Survey Submitted!");
        // You can now send formData to a server or process it
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        alert("Thank you for your submission!");
        hideModal();
        // Optional: Reset form after submission
        form.reset();
        currentStep = 0;
        updateFormSteps();
    }
  });

  // Initialize the form to the first step
  updateFormSteps();
});