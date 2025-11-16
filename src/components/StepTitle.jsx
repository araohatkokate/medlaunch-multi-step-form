import { useFormContext } from '../context/FormContext'
import './StepTitle.css'

const stepTitles = {
  1: 'New DNV Quote Request',
  2: 'Facility Details',
  3: 'Leadership Contacts',
  4: 'Site Information',
  5: 'Services & Certifications',
  6: 'Review & Submit',
}

const StepTitle = () => {
  const { currentStep } = useFormContext()

  return (
    <div className="step-title-container">
      <h1 className="page-title">{stepTitles[currentStep] || 'Form'}</h1>
      <span className="step-indicator">Step {currentStep} of 6</span>
    </div>
  )
}

export default StepTitle

