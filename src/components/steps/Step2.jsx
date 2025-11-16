import { useFormContext } from '../../context/FormContext'
import './Step2.css'

const facilityTypes = [
  'Short-Term Acute Care',
  'Long-Term Acute Care',
  'Critical Access',
  "Children's",
  'Free-Standing Psychiatric',
  'Other',
]

const Step2 = () => {
  const { formData, updateFormData, validationErrors } = useFormContext()
  const errors = validationErrors

  const handleFacilityTypeChange = (value) => {
    updateFormData(2, { facilityType: value })
  }

  return (
    <div className="step2-container">
      <div className="form-section">
        <h3 className="section-title">Facility and Organization Type</h3>
        <div className="form-group">
          <label>
            Facility Type <span className="required">*</span>
          </label>
          <div className="radio-group">
            {facilityTypes.map((type) => (
              <label key={type} className="radio-label">
                <input
                  type="radio"
                  name="facilityType"
                  value={type}
                  checked={formData.facilityType === type}
                  onChange={(e) => handleFacilityTypeChange(e.target.value)}
                />
                <span className="radio-text">{type}</span>
              </label>
            ))}
          </div>
          {errors.facilityType && (
            <span className="error-message">{errors.facilityType}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Step2

