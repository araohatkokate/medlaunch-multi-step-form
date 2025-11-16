import { FormProvider } from './context/FormContext'
import MultiStepForm from './components/MultiStepForm'
import './App.css'

function App() {
  return (
    <FormProvider>
      <MultiStepForm />
    </FormProvider>
  )
}

export default App

