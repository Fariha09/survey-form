function toggleModal() {
    document.getElementById('surveyModal').classList.toggle('show');
  }
  
  let currentStep = 0;
  const steps = document.querySelectorAll("fieldset");
  
  function nextStep(step) {
    steps[currentStep].classList.remove("active");
    currentStep = step;
    steps[currentStep].classList.add("active");
  }
  