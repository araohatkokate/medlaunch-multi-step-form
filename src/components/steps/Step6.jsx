import { useState } from 'react'
import { useFormContext } from '../../context/FormContext'
import './Step6.css'

const Step6 = () => {
  const { formData, goToStep, updateFormData } = useFormContext()

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
  }

  const handleEdit = (step) => {
    goToStep(step)
  }

  const handleDownloadPDF = () => {
    alert('PDF download functionality would be implemented here')
  }

  const handleExportCSV = () => {
    alert('CSV export functionality would be implemented here')
  }

  return (
    <div className="step6-container">
      <div className="review-sections">
        <div className="review-section-card">
          <h3 className="section-blue-title">Basic Information</h3>
          <div className="section-content">
            <div className="info-row">
              <strong>Legal Entity Name:</strong>
              <span>{formData.legalEntityName || 'Not provided'}</span>
            </div>
            <div className="info-row">
              <strong>d/b/a Name:</strong>
              <span>{formData.doingBusinessAs || 'Not provided'}</span>
            </div>
            <div className="info-row">
              <strong>Primary Contact:</strong>
              <div className="contact-details">
                <div>
                  <strong>Name:</strong>{' '}
                  {formData.primaryContact.firstName &&
                  formData.primaryContact.lastName
                    ? `${formData.primaryContact.firstName} ${formData.primaryContact.lastName}`
                    : 'Not provided'}
                </div>
                <div>
                  <strong>Title:</strong>{' '}
                  {formData.primaryContact.title || 'Not provided'}
                </div>
                <div>
                  <strong>Work Phone:</strong>{' '}
                  {formData.primaryContact.workPhone || 'Not provided'}
                </div>
                <div>
                  <strong>Cell Phone:</strong>{' '}
                  {formData.primaryContact.cellPhone || 'Not provided'}
                </div>
                <div>
                  <strong>Email:</strong>{' '}
                  {formData.primaryContact.email || 'Not provided'}
                  {formData.primaryContact.emailVerified && (
                    <span className="verified-badge">Verified</span>
                  )}
                </div>
                <div>
                  <strong>Address:</strong>{' '}
                  {formData.billingAddress.streetAddress &&
                  formData.billingAddress.city &&
                  formData.billingAddress.state &&
                  formData.billingAddress.zipCode
                    ? `${formData.billingAddress.streetAddress}, ${formData.billingAddress.city}, ${formData.billingAddress.state} ${formData.billingAddress.zipCode}`
                    : 'Not provided'}
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn-edit-section"
            onClick={() => handleEdit(1)}
          >
            Edit
          </button>
        </div>

        <div className="review-section-card">
          <h3 className="section-blue-title">Facility Details</h3>
          <div className="section-content">
            <div className="info-row">
              <strong>Facility Type:</strong>
              <span>{formData.facilityType || 'Not provided'}</span>
            </div>
          </div>
          <button
            type="button"
            className="btn-edit-section"
            onClick={() => handleEdit(2)}
          >
            Edit
          </button>
        </div>

        <div className="review-section-card">
          <h3 className="section-blue-title">Leadership Contacts</h3>
          <div className="section-content">
            <div className="contact-section">
              <strong>CEO:</strong>
              <div>
                <strong>Name:</strong>{' '}
                {formData.ceo.firstName && formData.ceo.lastName
                  ? `${formData.ceo.firstName} ${formData.ceo.lastName}`
                  : 'Not provided'}
              </div>
              <div>
                <strong>Phone:</strong> {formData.ceo.phone || 'Not provided'}
              </div>
              <div>
                <strong>Email:</strong> {formData.ceo.email || 'Not provided'}
              </div>
            </div>
            <div className="contact-section">
              <strong>Director of Quality:</strong>
              <div>
                <strong>Name:</strong>{' '}
                {formData.directorOfQuality.firstName &&
                formData.directorOfQuality.lastName
                  ? `${formData.directorOfQuality.firstName} ${formData.directorOfQuality.lastName}`
                  : 'Not provided'}
              </div>
              <div>
                <strong>Phone:</strong>{' '}
                {formData.directorOfQuality.phone || 'Not provided'}
              </div>
              <div>
                <strong>Email:</strong>{' '}
                {formData.directorOfQuality.email || 'Not provided'}
              </div>
            </div>
            <div className="contact-section">
              <strong>Invoicing Contact:</strong>
              <div>
                <strong>Name:</strong>{' '}
                {formData.invoicingContact.firstName &&
                formData.invoicingContact.lastName
                  ? `${formData.invoicingContact.firstName} ${formData.invoicingContact.lastName}`
                  : 'Not provided'}
              </div>
              <div>
                <strong>Phone:</strong>{' '}
                {formData.invoicingContact.phone || 'Not provided'}
              </div>
              <div>
                <strong>Email:</strong>{' '}
                {formData.invoicingContact.email || 'Not provided'}
              </div>
              <div>
                <strong>Billing Address:</strong>{' '}
                {formData.billingAddress.streetAddress &&
                formData.billingAddress.city &&
                formData.billingAddress.state &&
                formData.billingAddress.zipCode
                  ? `${formData.billingAddress.streetAddress}, ${formData.billingAddress.city}, ${formData.billingAddress.state} ${formData.billingAddress.zipCode}`
                  : 'Not provided'}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn-edit-section"
            onClick={() => handleEdit(3)}
          >
            Edit
          </button>
        </div>

        <div className="review-section-card">
          <h3 className="section-blue-title">Site Information</h3>
          <div className="section-content">
            <div className="info-row">
              <strong>Site Configuration:</strong>
              <span>
                {formData.siteType === 'single'
                  ? 'Single Location'
                  : formData.siteType === 'multiple'
                    ? `Multiple Locations (${
                        (formData.uploadedFiles || []).length || 0
                      } sites)`
                    : 'Not provided'}
              </span>
            </div>
            {formData.siteType === 'multiple' && (
              <div className="info-row">
                <strong>Input Method:</strong>
                <span>
                  {formData.siteInformationMethod === 'upload'
                    ? 'File Upload'
                    : 'Not provided'}
                </span>
              </div>
            )}
          </div>
          <button
            type="button"
            className="btn-edit-section"
            onClick={() => handleEdit(4)}
          >
            Edit
          </button>
        </div>

        <div className="review-section-card">
          <h3 className="section-blue-title">Services & Certifications</h3>
          <div className="section-content">
            <div className="info-row">
              <strong>Services Provided:</strong>
              <div className="tags-container">
                {(formData.services || []).length > 0 ? (
                  (formData.services || []).map((service, index) => (
                    <span key={index} className="service-tag">
                      {service}
                    </span>
                  ))
                ) : (
                  <span>None selected</span>
                )}
              </div>
            </div>
            <div className="info-row">
              <strong>Standards to Apply:</strong>
              <div className="tags-container">
                {(formData.standards || []).length > 0 ? (
                  (formData.standards || []).map((standard, index) => (
                    <span key={index} className="service-tag">
                      {standard}
                    </span>
                  ))
                ) : (
                  <span>None selected</span>
                )}
              </div>
            </div>
            <div className="info-row">
              <strong>Date of Application:</strong>
              <span>{formatDate(formData.applicationDate)}</span>
            </div>
            <div className="info-row">
              <strong>Expiration Date of Current Stroke Certification:</strong>
              <span>
                {formatDate(formData.strokeCertificationExpiration)}
              </span>
            </div>
            {(formData.thrombolyticDates || []).length > 0 && (
              <div className="info-row">
                <strong>
                  Dates of last twenty-five thrombolytic administrations:
                </strong>
                <span>
                  {(formData.thrombolyticDates || []).join(', ')}
                </span>
              </div>
            )}
            {(formData.thrombectomyDates || []).length > 0 && (
              <div className="info-row">
                <strong>Dates of last fifteen thrombectomies:</strong>
                <span>
                  {(formData.thrombectomyDates || []).join(', ')}
                </span>
              </div>
            )}
          </div>
          <button
            type="button"
            className="btn-edit-section"
            onClick={() => handleEdit(5)}
          >
            Edit
          </button>
        </div>

        <div className="review-section-card ready-to-submit">
          <h3 className="section-blue-title">Ready to Submit?</h3>
          <div className="certification-section">
            <label className="certification-checkbox">
              <input
                type="checkbox"
                checked={formData.certificationAccepted || false}
                onChange={(e) =>
                  updateFormData(6, { certificationAccepted: e.target.checked })
                }
              />
              <span>
                I certify that all information provided is accurate and complete
                to the best of my knowledge
              </span>
            </label>
            <p className="disclaimer-text">
              By submitting this form, you agree to our terms and conditions.
              DNV will review your application and contact you within 2-3
              business days.
            </p>
          </div>
          <div className="export-buttons">
            <button
              type="button"
              className="btn-export"
              onClick={handleDownloadPDF}
            >
              Download as PDF
            </button>
            <button
              type="button"
              className="btn-export"
              onClick={handleExportCSV}
            >
              Export to CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step6
