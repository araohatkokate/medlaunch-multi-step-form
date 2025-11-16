import { useFormContext } from '../context/FormContext'
import Header from './Header'
import StepTitle from './StepTitle'
import ProgressBar from './ProgressBar'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import Step5 from './steps/Step5'
import Step6 from './steps/Step6'
import FormNavigation from './FormNavigation'
import './MultiStepForm.css'

const MultiStepForm = () => {
  const { currentStep } = useFormContext()

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />
      case 2:
        return <Step2 />
      case 3:
        return <Step3 />
      case 4:
        return <Step4 />
      case 5:
        return <Step5 />
      case 6:
        return <Step6 />
      default:
        return <Step1 />
    }
  }

  return (
    <div className="multi-step-form">
      <Header />
      <div className="form-container">
        <StepTitle />
        <ProgressBar />
        <div className="form-content">
          {renderStep()}
        </div>
        <div className="form-navigation-wrapper">
          <FormNavigation />
        </div>
      </div>
    </div>
  )
}

export default MultiStepForm

