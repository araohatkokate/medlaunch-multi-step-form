import { useFormContext } from '../../context/FormContext'
import './Step1.css'

const Step1 = () => {
  const { formData, updateFormData, validationErrors, setValidationErrors } =
    useFormContext()
  const errors = validationErrors

  const handleChange = (field, value) => {
    if (field.startsWith('primaryContact.')) {
      const contactField = field.replace('primaryContact.', '')
      updateFormData(1, {
        primaryContact: {
          ...formData.primaryContact,
          [contactField]: value,
        },
      })
    } else {
      updateFormData(1, { [field]: value })
    }
    // Clear error when user starts typing
    if (errors[field]) {
      setValidationErrors({ ...errors, [field]: '' })
    }
  }

  const handleSameAsLegalEntity = (checked) => {
    if (checked) {
      updateFormData(1, {
        doingBusinessAs: formData.legalEntityName,
        sameAsLegalEntity: true,
      })
    } else {
      updateFormData(1, {
        sameAsLegalEntity: false,
      })
    }
  }

  const handleSendVerificationEmail = () => {
    // Simulate email verification
    alert('Verification email sent! Please check your inbox.')
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  return (
    <div className="step1-container">
      <div className="form-section">
        <h3 className="section-title">Identify Healthcare Organization</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="legalEntityName">
              Legal Entity Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="legalEntityName"
              value={formData.legalEntityName}
              onChange={(e) => handleChange('legalEntityName', e.target.value)}
              className={errors.legalEntityName ? 'error' : ''}
            />
            {errors.legalEntityName && (
              <span className="error-message">{errors.legalEntityName}</span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="doingBusinessAs">
              Doing Business As (d/b/a) Name{' '}
              <span className="required">*</span>
            </label>
            <input
              type="text"
              id="doingBusinessAs"
              value={formData.doingBusinessAs}
              onChange={(e) => handleChange('doingBusinessAs', e.target.value)}
              disabled={formData.sameAsLegalEntity}
              className={errors.doingBusinessAs ? 'error' : ''}
            />
            {errors.doingBusinessAs && (
              <span className="error-message">{errors.doingBusinessAs}</span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.sameAsLegalEntity}
                onChange={(e) => handleSameAsLegalEntity(e.target.checked)}
              />
              Same as Legal Entity Name
            </label>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Primary Contact Information</h3>
        <p className="section-subtitle">
          Primary contact receives all DNV Healthcare official communications.
        </p>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.primaryContact.firstName}
              onChange={(e) =>
                handleChange('primaryContact.firstName', e.target.value)
              }
              className={errors['primaryContact.firstName'] ? 'error' : ''}
            />
            {errors['primaryContact.firstName'] && (
              <span className="error-message">
                {errors['primaryContact.firstName']}
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.primaryContact.lastName}
              onChange={(e) =>
                handleChange('primaryContact.lastName', e.target.value)
              }
              className={errors['primaryContact.lastName'] ? 'error' : ''}
            />
            {errors['primaryContact.lastName'] && (
              <span className="error-message">
                {errors['primaryContact.lastName']}
              </span>
            )}
          </div>
        </div>
        <div className="form-row form-row-full">
          <div className="form-group">
            <label htmlFor="title">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={formData.primaryContact.title}
              onChange={(e) =>
                handleChange('primaryContact.title', e.target.value)
              }
              className={errors['primaryContact.title'] ? 'error' : ''}
            />
            {errors['primaryContact.title'] && (
              <span className="error-message">
                {errors['primaryContact.title']}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="workPhone">
              Work Phone <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="workPhone"
              value={formData.primaryContact.workPhone}
              onChange={(e) =>
                handleChange('primaryContact.workPhone', e.target.value)
              }
              className={errors['primaryContact.workPhone'] ? 'error' : ''}
            />
            {errors['primaryContact.workPhone'] && (
              <span className="error-message">
                {errors['primaryContact.workPhone']}
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="cellPhone">Cell Phone</label>
            <input
              type="tel"
              id="cellPhone"
              value={formData.primaryContact.cellPhone}
              onChange={(e) =>
                handleChange('primaryContact.cellPhone', e.target.value)
              }
            />
          </div>
        </div>
        <div className="form-row form-row-full">
          <div className="form-group email-group">
            <div className="email-label-row">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <button
                type="button"
                className="refresh-icon"
                onClick={handleSendVerificationEmail}
                aria-label="Refresh"
              >
                🔄
              </button>
            </div>
            <input
              type="email"
              id="email"
              value={formData.primaryContact.email}
              onChange={(e) =>
                handleChange('primaryContact.email', e.target.value)
              }
              className={errors['primaryContact.email'] ? 'error' : ''}
            />
            {errors['primaryContact.email'] && (
              <span className="error-message">
                {errors['primaryContact.email']}
              </span>
            )}
            <div className="email-verification">
              <button
                type="button"
                className="btn-verify-email"
                onClick={handleSendVerificationEmail}
              >
                Send Verification Email
              </button>
              <span className="verification-status not-verified">
                Not verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step1

