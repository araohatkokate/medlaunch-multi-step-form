import { useFormContext } from '../context/FormContext'
import { validateStep } from '../utils/validation'
import './FormNavigation.css'

const FormNavigation = () => {
  const {
    currentStep,
    previousStep,
    nextStep,
    submitForm,
    formData,
    setValidationErrors,
  } = useFormContext()

  const handleContinue = () => {
    if (currentStep === 6) {
      // Check if certification is checked
      if (!formData.certificationAccepted) {
        alert('Please certify that all information is accurate before submitting.')
        return
      }
      submitForm()
      return
    }

    // Validate current step before proceeding
    const stepErrors = validateStep(currentStep, formData)
    if (Object.keys(stepErrors).length > 0) {
      setValidationErrors(stepErrors)
      // Scroll to first error
      setTimeout(() => {
        const firstErrorField = document.querySelector('.error')
        if (firstErrorField) {
          firstErrorField.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      }, 100)
      return
    }

    setValidationErrors({})
    nextStep()
  }

  return (
    <div className="form-navigation">
      <div className="nav-left">
        {currentStep > 1 && (
          <button type="button" className="btn-exit" onClick={previousStep}>
            Previous
          </button>
        )}
        {currentStep === 1 && (
          <button type="button" className="btn-exit">
            Exit
          </button>
        )}
      </div>
      <div className="nav-center">
        <button type="button" className="btn-secondary">
          Save
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={handleContinue}
        >
          {currentStep === 6 ? 'Submit Application' : 'Continue'}
        </button>
      </div>
      <div className="nav-right">
        <button type="button" className="btn-support">
          <span className="support-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"
                fill="currentColor"
              />
            </svg>
          </span>
          Support Chat
        </button>
      </div>
    </div>
  )
}

export default FormNavigation

