import { useFormContext } from '../context/FormContext'
import './ProgressBar.css'

const steps = [
  { number: 1, label: 'DNV Quote Request' },
  { number: 2, label: 'Facility Details' },
  { number: 3, label: 'Leadership Contacts' },
  { number: 4, label: 'Site Information' },
  { number: 5, label: 'Services & Certifications' },
  { number: 6, label: 'Review & Submit' },
]

const ProgressBar = () => {
  const { currentStep } = useFormContext()

  return (
    <div className="progress-container">
      <div className="progress-bar">
        {steps.map((step, index) => (
          <div key={step.number} className="progress-step-wrapper">
            <div
              className={`progress-step ${
                step.number === currentStep
                  ? 'active'
                  : step.number < currentStep
                    ? 'completed'
                    : ''
              }`}
            >
              <div className="step-connector-bar">
                <div
                  className={`connector-fill ${
                    step.number === currentStep
                      ? 'active'
                      : step.number < currentStep
                        ? 'completed'
                        : ''
                  }`}
                ></div>
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressBar

