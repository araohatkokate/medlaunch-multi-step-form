import { createContext, useContext, useState } from 'react'

const FormContext = createContext()

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider')
  }
  return context
}

export const FormProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [validationErrors, setValidationErrors] = useState({})
  const [formData, setFormData] = useState({
    // Step 1: DNV Quote Request
    legalEntityName: '',
    doingBusinessAs: '',
    sameAsLegalEntity: false,
    primaryContact: {
      firstName: '',
      lastName: '',
      title: '',
      workPhone: '',
      cellPhone: '',
      email: '',
      emailVerified: false,
    },
    // Step 2: Facility Details
    facilityType: '',
    // Step 3: Leadership Contacts
    ceo: {
      sameAsPrimary: false,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
    directorOfQuality: {
      sameAsPrimary: false,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
    invoicingContact: {
      sameAsPrimary: false,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
    billingAddress: {
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
    },
    // Step 4: Site Information
    siteType: '', // 'single' or 'multiple'
    siteInformationMethod: '', // 'upload' or 'manual'
    uploadedFiles: [],
    // Step 5: Services & Certifications
    services: [],
    otherServices: [],
    standards: [],
    strokeCertificationExpiration: '',
    applicationDate: '',
    thrombolyticDates: [],
    thrombectomyDates: [],
    // Step 6: Review & Submit
    certificationAccepted: false,
  })

  const updateFormData = (step, data) => {
    setFormData((prev) => {
      if (step === 1) {
        return { ...prev, ...data }
      } else if (step === 2) {
        return { ...prev, ...data }
      } else if (step === 3) {
        return { ...prev, ...data }
      } else if (step === 4) {
        return { ...prev, ...data }
      } else if (step === 5) {
        return { ...prev, ...data }
      } else if (step === 6) {
        return { ...prev, ...data }
      }
      return prev
    })
  }

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step) => {
    if (step >= 1 && step <= 6) {
      setCurrentStep(step)
    }
  }

  const submitForm = () => {
    console.log('Form Submission Payload:', JSON.stringify(formData, null, 2))
    alert('Form submitted! Check console for payload.')
  }

  const value = {
    currentStep,
    formData,
    validationErrors,
    setValidationErrors,
    updateFormData,
    nextStep,
    previousStep,
    goToStep,
    submitForm,
  }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

