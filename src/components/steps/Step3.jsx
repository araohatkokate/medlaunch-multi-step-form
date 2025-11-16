import { useState } from 'react'
import { useFormContext } from '../../context/FormContext'
import './Step3.css'

const states = [
  'Select State',
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]

const Step3 = () => {
  const { formData, updateFormData, validationErrors, setValidationErrors } =
    useFormContext()
  const errors = validationErrors

  const handleChange = (section, field, value) => {
    updateFormData(3, {
      [section]: {
        ...formData[section],
        [field]: value,
      },
    })
    if (errors[`${section}.${field}`]) {
      setValidationErrors({ ...errors, [`${section}.${field}`]: '' })
    }
  }

  const handleSameAsPrimary = (section, checked) => {
    if (checked) {
      updateFormData(3, {
        [section]: {
          ...formData[section],
          sameAsPrimary: true,
          firstName: formData.primaryContact.firstName,
          lastName: formData.primaryContact.lastName,
          phone: formData.primaryContact.workPhone,
          email: formData.primaryContact.email,
        },
      })
    } else {
      updateFormData(3, {
        [section]: {
          ...formData[section],
          sameAsPrimary: false,
        },
      })
    }
  }

  const renderContactSection = (
    title,
    section,
    requiredFields = ['firstName', 'lastName', 'phone', 'email']
  ) => {
    const isRequired = (field) => requiredFields.includes(field)

    return (
      <div className="contact-section">
        <h4 className="contact-title">{title}</h4>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData[section].sameAsPrimary}
            onChange={(e) => handleSameAsPrimary(section, e.target.checked)}
          />
          Same as Primary Contact entered in Step 1
        </label>
        <div className="form-row">
          <div className="form-group">
            <label>
              First Name {isRequired('firstName') && <span className="required">*</span>}
            </label>
            <input
              type="text"
              value={formData[section].firstName}
              onChange={(e) =>
                handleChange(section, 'firstName', e.target.value)
              }
              disabled={formData[section].sameAsPrimary}
              className={errors[`${section}.firstName`] ? 'error' : ''}
            />
            {errors[`${section}.firstName`] && (
              <span className="error-message">
                {errors[`${section}.firstName`]}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>
              Last Name {isRequired('lastName') && <span className="required">*</span>}
            </label>
            <input
              type="text"
              value={formData[section].lastName}
              onChange={(e) =>
                handleChange(section, 'lastName', e.target.value)
              }
              disabled={formData[section].sameAsPrimary}
              className={errors[`${section}.lastName`] ? 'error' : ''}
            />
            {errors[`${section}.lastName`] && (
              <span className="error-message">
                {errors[`${section}.lastName`]}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              Phone {isRequired('phone') && <span className="required">*</span>}
            </label>
            <input
              type="tel"
              value={formData[section].phone}
              onChange={(e) => handleChange(section, 'phone', e.target.value)}
              disabled={formData[section].sameAsPrimary}
              className={errors[`${section}.phone`] ? 'error' : ''}
            />
            {errors[`${section}.phone`] && (
              <span className="error-message">{errors[`${section}.phone`]}</span>
            )}
          </div>
          <div className="form-group">
            <label>
              Email {isRequired('email') && <span className="required">*</span>}
            </label>
            <input
              type="email"
              value={formData[section].email}
              onChange={(e) => handleChange(section, 'email', e.target.value)}
              disabled={formData[section].sameAsPrimary}
              className={errors[`${section}.email`] ? 'error' : ''}
            />
            {errors[`${section}.email`] && (
              <span className="error-message">{errors[`${section}.email`]}</span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="step3-container">
      {renderContactSection('Chief Executive Officer (CEO)', 'ceo')}
      {renderContactSection('Director of Quality', 'directorOfQuality', [])}
      {renderContactSection('Invoicing Contact', 'invoicingContact')}

      <div className="form-section">
        <h3 className="section-title">Billing Address</h3>
        <div className="form-group">
          <label>
            Street Address <span className="required">*</span>
          </label>
          <input
            type="text"
            value={formData.billingAddress.streetAddress}
            onChange={(e) =>
              handleChange('billingAddress', 'streetAddress', e.target.value)
            }
            className={errors['billingAddress.streetAddress'] ? 'error' : ''}
          />
          {errors['billingAddress.streetAddress'] && (
            <span className="error-message">
              {errors['billingAddress.streetAddress']}
            </span>
          )}
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              City <span className="required">*</span>
            </label>
            <input
              type="text"
              value={formData.billingAddress.city}
              onChange={(e) =>
                handleChange('billingAddress', 'city', e.target.value)
              }
              className={errors['billingAddress.city'] ? 'error' : ''}
            />
            {errors['billingAddress.city'] && (
              <span className="error-message">
                {errors['billingAddress.city']}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>
              State <span className="required">*</span>
            </label>
            <select
              value={formData.billingAddress.state}
              onChange={(e) =>
                handleChange('billingAddress', 'state', e.target.value)
              }
              className={errors['billingAddress.state'] ? 'error' : ''}
            >
              {states.map((state) => (
                <option key={state} value={state === 'Select State' ? '' : state}>
                  {state}
                </option>
              ))}
            </select>
            {errors['billingAddress.state'] && (
              <span className="error-message">
                {errors['billingAddress.state']}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>
              ZIP Code <span className="required">*</span>
            </label>
            <input
              type="text"
              value={formData.billingAddress.zipCode}
              onChange={(e) =>
                handleChange('billingAddress', 'zipCode', e.target.value)
              }
              className={errors['billingAddress.zipCode'] ? 'error' : ''}
            />
            {errors['billingAddress.zipCode'] && (
              <span className="error-message">
                {errors['billingAddress.zipCode']}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step3

