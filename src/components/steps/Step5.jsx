import { useState } from 'react'
import { useFormContext } from '../../context/FormContext'
import './Step5.css'

const serviceCategories = {
  all: {
    'Emergency & Critical Care': [
      'Emergency Department',
      'Neonatal Intensive Care Services',
      'Pediatric Intensive Care Services',
    ],
    'Cardiac Services': [
      'Cardiac Catheterization Laboratory',
      'Open Heart',
    ],
    'Diagnostic Services': [
      'Magnetic Resonance Imaging (MRI)',
      'Diagnostic Radioisotope Facility',
      'Lithotripsy',
    ],
    'Rehabilitation Services': [
      'Physical Rehabilitation Services',
      'Physical Therapy',
      'Occupational Therapy',
      'Speech/Language Therapy',
      'Audiology',
    ],
  },
  clinical: {
    'Emergency & Critical Care': [
      'Emergency Department',
      'Neonatal Intensive Care Services',
      'Pediatric Intensive Care Services',
    ],
  },
  surgical: {
    'Cardiac Services': [
      'Cardiac Catheterization Laboratory',
      'Open Heart',
    ],
  },
  diagnostic: {
    'Diagnostic Services': [
      'Magnetic Resonance Imaging (MRI)',
      'Diagnostic Radioisotope Facility',
      'Lithotripsy',
    ],
  },
  rehabilitation: {
    'Rehabilitation Services': [
      'Physical Rehabilitation Services',
      'Physical Therapy',
      'Occupational Therapy',
      'Speech/Language Therapy',
      'Audiology',
    ],
  },
  specialty: {},
}

const standardsOptions = [
  'Emergency Department',
  'Inpatient Acute Care',
  'General Anesthetizing Location',
  'Diagnostic Services',
  'Therapy Services',
  'Cardiac Services',
  'Critical Care Services',
]

const Step5 = () => {
  const { formData, updateFormData } = useFormContext()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddOtherService, setShowAddOtherService] = useState(false)
  const [otherServiceInput, setOtherServiceInput] = useState('')
  const [showStandardsDropdown, setShowStandardsDropdown] = useState(false)
  const [thrombolyticInput, setThrombolyticInput] = useState('')
  const [thrombectomyInput, setThrombectomyInput] = useState('')

  const handleServiceToggle = (service) => {
    const currentServices = formData.services || []
    const updatedServices = currentServices.includes(service)
      ? currentServices.filter((s) => s !== service)
      : [...currentServices, service]
    updateFormData(5, { services: updatedServices })
  }

  const handleAddOtherService = () => {
    if (otherServiceInput.trim()) {
      const updatedOtherServices = [
        ...(formData.otherServices || []),
        otherServiceInput.trim(),
      ]
      const updatedServices = [
        ...(formData.services || []),
        otherServiceInput.trim(),
      ]
      updateFormData(5, {
        otherServices: updatedOtherServices,
        services: updatedServices,
      })
      setOtherServiceInput('')
      setShowAddOtherService(false)
    }
  }

  const handleRemoveOtherService = (service) => {
    const updatedOtherServices = (formData.otherServices || []).filter(
      (s) => s !== service
    )
    const updatedServices = (formData.services || []).filter((s) => s !== service)
    updateFormData(5, {
      otherServices: updatedOtherServices,
      services: updatedServices,
    })
  }

  const handleStandardToggle = (standard) => {
    const currentStandards = formData.standards || []
    const updatedStandards = currentStandards.includes(standard)
      ? currentStandards.filter((s) => s !== standard)
      : [...currentStandards, standard]
    updateFormData(5, { standards: updatedStandards })
  }

  const handleRemoveStandard = (standard) => {
    const updatedStandards = (formData.standards || []).filter(
      (s) => s !== standard
    )
    updateFormData(5, { standards: updatedStandards })
  }

  const handleDateInput = (type, value) => {
    // Parse comma-separated dates in mm/dd/yyyy format
    const datePattern = /(\d{2}\/\d{2}\/\d{4})/g
    const matches = value.match(datePattern) || []
    const dates = [...new Set(matches)] // Remove duplicates

    if (type === 'thrombolytic') {
      const existingDates = formData.thrombolyticDates || []
      const newDates = [...existingDates, ...dates]
      const limitedDates = newDates.slice(0, 25) // Limit to 25
      updateFormData(5, { thrombolyticDates: limitedDates })
      setThrombolyticInput('')
    } else if (type === 'thrombectomy') {
      const existingDates = formData.thrombectomyDates || []
      const newDates = [...existingDates, ...dates]
      const limitedDates = newDates.slice(0, 15) // Limit to 15
      updateFormData(5, { thrombectomyDates: limitedDates })
      setThrombectomyInput('')
    }
  }

  const handleRemoveDate = (type, index) => {
    if (type === 'thrombolytic') {
      const updatedDates = (formData.thrombolyticDates || []).filter(
        (_, i) => i !== index
      )
      updateFormData(5, { thrombolyticDates: updatedDates })
    } else if (type === 'thrombectomy') {
      const updatedDates = (formData.thrombectomyDates || []).filter(
        (_, i) => i !== index
      )
      updateFormData(5, { thrombectomyDates: updatedDates })
    }
  }

  const filteredServices = () => {
    const categories = serviceCategories[activeTab] || {}
    const allServices = Object.values(categories).flat()

    if (!searchQuery) return categories

    const filtered = {}
    Object.entries(categories).forEach(([category, services]) => {
      const matching = services.filter((service) =>
        service.toLowerCase().includes(searchQuery.toLowerCase())
      )
      if (matching.length > 0) {
        filtered[category] = matching
      }
    })
    return filtered
  }

  const tabs = ['all', 'clinical', 'surgical', 'diagnostic', 'rehabilitation', 'specialty']

  return (
    <div className="step5-container">
      <div className="form-section">
        <h3 className="section-title">Service Offering</h3>
        <p className="section-subtitle">Primary Site Service offering.</p>

        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Services
            </button>
          ))}
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="service-categories">
          {Object.entries(filteredServices()).map(([category, services]) => (
            <div key={category} className="service-category-card">
              <h4 className="category-title">{category}</h4>
              <div className="service-list">
                {services.map((service) => (
                  <label key={service} className="service-checkbox">
                    <input
                      type="checkbox"
                      checked={(formData.services || []).includes(service)}
                      onChange={() => handleServiceToggle(service)}
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="btn-add-service"
          onClick={() => setShowAddOtherService(true)}
        >
          + Add Other Service
        </button>

        {showAddOtherService && (
          <div className="other-service-section">
            <h4 className="other-service-title">Other Service</h4>
            <div className="other-service-input-group">
              <input
                type="text"
                placeholder="Specify other service"
                value={otherServiceInput}
                onChange={(e) => setOtherServiceInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddOtherService()
                  }
                }}
                className="other-service-input"
              />
              <button
                type="button"
                className="btn-remove-input"
                onClick={() => {
                  setShowAddOtherService(false)
                  setOtherServiceInput('')
                }}
              >
                ×
              </button>
            </div>
            <button
              type="button"
              className="btn-save-service"
              onClick={handleAddOtherService}
            >
              Add Service
            </button>
          </div>
        )}

        {(formData.otherServices || []).length > 0 && (
          <div className="other-services-list">
            {(formData.otherServices || []).map((service, index) => (
              <div key={index} className="other-service-tag">
                {service}
                <button
                  type="button"
                  className="tag-remove"
                  onClick={() => handleRemoveOtherService(service)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-section">
        <h3 className="section-title">Standards to Apply</h3>
        <div className="standards-container">
          <div
            className="standards-dropdown"
            onClick={() => setShowStandardsDropdown(!showStandardsDropdown)}
          >
            <input
              type="text"
              placeholder="Select Standard(s)"
              value=""
              readOnly
              className="standards-input"
            />
            <span className="dropdown-arrow">▼</span>
          </div>
          {showStandardsDropdown && (
            <div className="standards-options">
              {standardsOptions.map((standard) => (
                <label key={standard} className="standard-option">
                  <input
                    type="checkbox"
                    checked={(formData.standards || []).includes(standard)}
                    onChange={() => handleStandardToggle(standard)}
                  />
                  <span>{standard}</span>
                </label>
              ))}
            </div>
          )}
          {(formData.standards || []).length > 0 && (
            <div className="standards-tags">
              {(formData.standards || []).map((standard, index) => (
                <span key={index} className="standard-tag">
                  {standard}
                  <button
                    type="button"
                    className="tag-remove"
                    onClick={() => handleRemoveStandard(standard)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="form-section">
        <div className="form-row">
          <div className="form-group">
            <label>
              Expiration Date of Current Stroke Certification
            </label>
            <input
              type="date"
              value={formData.strokeCertificationExpiration}
              onChange={(e) =>
                updateFormData(5, {
                  strokeCertificationExpiration: e.target.value,
                })
              }
              className="date-input"
            />
          </div>
          <div className="form-group">
            <label>Date of Application</label>
            <input
              type="date"
              value={formData.applicationDate}
              onChange={(e) =>
                updateFormData(5, { applicationDate: e.target.value })
              }
              className="date-input"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">
          Dates of last twenty-five thrombolytic administrations
        </h3>
        <div className="date-input-container">
          <input
            type="text"
            placeholder="mm/dd/yyyy, mm/dd/yyyy"
            value={thrombolyticInput}
            onChange={(e) => setThrombolyticInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleDateInput('thrombolytic', e.target.value)
              }
            }}
            className="date-text-input"
          />
          <button
            type="button"
            className="btn-add-date"
            onClick={() => handleDateInput('thrombolytic', thrombolyticInput)}
          >
            Add
          </button>
        </div>
        {(formData.thrombolyticDates || []).length > 0 && (
          <div className="date-tags">
            {(formData.thrombolyticDates || []).map((date, index) => (
              <span key={index} className="date-tag">
                {date}
                <button
                  type="button"
                  className="tag-remove"
                  onClick={() => handleRemoveDate('thrombolytic', index)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="form-section">
        <h3 className="section-title">
          Dates of last fifteen thrombectomies
        </h3>
        <div className="date-input-container">
          <input
            type="text"
            placeholder="mm/dd/yyyy, mm/dd/yyyy"
            value={thrombectomyInput}
            onChange={(e) => setThrombectomyInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleDateInput('thrombectomy', e.target.value)
              }
            }}
            className="date-text-input"
          />
          <button
            type="button"
            className="btn-add-date"
            onClick={() => handleDateInput('thrombectomy', thrombectomyInput)}
          >
            Add
          </button>
        </div>
        {(formData.thrombectomyDates || []).length > 0 && (
          <div className="date-tags">
            {(formData.thrombectomyDates || []).map((date, index) => (
              <span key={index} className="date-tag">
                {date}
                <button
                  type="button"
                  className="tag-remove"
                  onClick={() => handleRemoveDate('thrombectomy', index)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Step5
