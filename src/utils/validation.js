export const validateStep1 = (formData) => {
  const errors = {}

  if (!formData.legalEntityName?.trim()) {
    errors.legalEntityName = 'Legal Entity Name is required'
  }

  if (!formData.doingBusinessAs?.trim()) {
    errors.doingBusinessAs = 'Doing Business As name is required'
  }

  if (!formData.primaryContact?.firstName?.trim()) {
    errors['primaryContact.firstName'] = 'First Name is required'
  }

  if (!formData.primaryContact?.lastName?.trim()) {
    errors['primaryContact.lastName'] = 'Last Name is required'
  }

  if (!formData.primaryContact?.title?.trim()) {
    errors['primaryContact.title'] = 'Title is required'
  }

  if (!formData.primaryContact?.workPhone?.trim()) {
    errors['primaryContact.workPhone'] = 'Work Phone is required'
  }

  if (!formData.primaryContact?.email?.trim()) {
    errors['primaryContact.email'] = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.primaryContact.email)) {
    errors['primaryContact.email'] = 'Please enter a valid email address'
  }

  return errors
}

export const validateStep2 = (formData) => {
  const errors = {}

  if (!formData.facilityType?.trim()) {
    errors.facilityType = 'Facility Type is required'
  }

  return errors
}

export const validateStep3 = (formData) => {
  const errors = {}

  // CEO validation
  if (!formData.ceo?.sameAsPrimary) {
    if (!formData.ceo?.firstName?.trim()) {
      errors['ceo.firstName'] = 'CEO First Name is required'
    }
    if (!formData.ceo?.lastName?.trim()) {
      errors['ceo.lastName'] = 'CEO Last Name is required'
    }
    if (!formData.ceo?.phone?.trim()) {
      errors['ceo.phone'] = 'CEO Phone is required'
    }
    if (!formData.ceo?.email?.trim()) {
      errors['ceo.email'] = 'CEO Email is required'
    } else if (
      formData.ceo.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.ceo.email)
    ) {
      errors['ceo.email'] = 'Please enter a valid email address'
    }
  }

  // Invoicing Contact validation
  if (!formData.invoicingContact?.sameAsPrimary) {
    if (!formData.invoicingContact?.firstName?.trim()) {
      errors['invoicingContact.firstName'] = 'Invoicing Contact First Name is required'
    }
    if (!formData.invoicingContact?.lastName?.trim()) {
      errors['invoicingContact.lastName'] = 'Invoicing Contact Last Name is required'
    }
    if (!formData.invoicingContact?.phone?.trim()) {
      errors['invoicingContact.phone'] = 'Invoicing Contact Phone is required'
    }
    if (!formData.invoicingContact?.email?.trim()) {
      errors['invoicingContact.email'] = 'Invoicing Contact Email is required'
    } else if (
      formData.invoicingContact.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.invoicingContact.email)
    ) {
      errors['invoicingContact.email'] = 'Please enter a valid email address'
    }
  }

  // Billing Address validation
  if (!formData.billingAddress?.streetAddress?.trim()) {
    errors['billingAddress.streetAddress'] = 'Street Address is required'
  }
  if (!formData.billingAddress?.city?.trim()) {
    errors['billingAddress.city'] = 'City is required'
  }
  if (!formData.billingAddress?.state?.trim() || formData.billingAddress?.state === 'Select State') {
    errors['billingAddress.state'] = 'State is required'
  }
  if (!formData.billingAddress?.zipCode?.trim()) {
    errors['billingAddress.zipCode'] = 'ZIP Code is required'
  }

  return errors
}

export const validateStep4 = (formData) => {
  const errors = {}

  if (!formData.siteType) {
    errors.siteType = 'Please select a site type'
  }

  if (formData.siteType === 'multiple' && !formData.siteInformationMethod) {
    errors.siteInformationMethod = 'Please select how you would like to add site information'
  }

  if (
    formData.siteType === 'multiple' &&
    formData.siteInformationMethod === 'upload' &&
    (!formData.uploadedFiles || formData.uploadedFiles.length === 0)
  ) {
    errors.uploadedFiles = 'Please upload at least one file'
  }

  return errors
}

export const validateStep = (step, formData) => {
  switch (step) {
    case 1:
      return validateStep1(formData)
    case 2:
      return validateStep2(formData)
    case 3:
      return validateStep3(formData)
    case 4:
      return validateStep4(formData)
    default:
      return {}
  }
}

