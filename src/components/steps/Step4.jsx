import { useState, useRef } from 'react'
import { useFormContext } from '../../context/FormContext'
import './Step4.css'

const Step4 = () => {
  const { formData, updateFormData, validationErrors } = useFormContext()
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)
  const errors = validationErrors

  const handleSiteTypeChange = (type) => {
    updateFormData(4, { siteType: type })
  }

  const handleMethodChange = (method) => {
    updateFormData(4, { siteInformationMethod: method })
  }

  const handleFileUpload = (files) => {
    const fileArray = Array.from(files)
    const updatedFiles = [
      ...(formData.uploadedFiles || []),
      ...fileArray.map((file) => ({
        name: file.name,
        size: file.size,
        file: file,
      })),
    ]
    updateFormData(4, { uploadedFiles: updatedFiles })
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files)
    }
  }

  const removeFile = (index) => {
    const updatedFiles = (formData.uploadedFiles || []).filter(
      (_, i) => i !== index
    )
    updateFormData(4, { uploadedFiles: updatedFiles })
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 MB'
    const k = 1024
    const mb = bytes / (k * k)
    return Math.round(mb * 100) / 100 + ' MB'
  }

  const downloadTemplate = () => {
    const csvContent =
      'Site Name,Address,City,State,ZIP Code,Phone,Email\n' +
      'Example Site,123 Main St,Example City,CA,12345,555-1234,example@email.com'
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'site_information_template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="step4-container">
      <div className="form-section">
        <h3 className="section-title">
          Do you have multiple sites or locations?
        </h3>
        <div className="site-options">
          <div
            className={`site-option ${
              formData.siteType === 'single' ? 'selected' : ''
            }`}
            onClick={() => handleSiteTypeChange('single')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSiteTypeChange('single')
              }
            }}
          >
            <h4 className="option-title">Single Location</h4>
            <p className="option-description">
              We operate from one facility only.
            </p>
          </div>
          <div
            className={`site-option ${
              formData.siteType === 'multiple' ? 'selected' : ''
            }`}
            onClick={() => handleSiteTypeChange('multiple')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSiteTypeChange('multiple')
              }
            }}
          >
            <h4 className="option-title">Multiple Locations</h4>
            <p className="option-description">
              We have multiple facilities or practice locations.
            </p>
          </div>
        </div>
        {errors.siteType && (
          <span className="error-message">{errors.siteType}</span>
        )}
      </div>

      {formData.siteType === 'multiple' && (
        <>
          <div className="form-section">
            <h3 className="section-title">
              How would you like to add your site information?
            </h3>
            <div className="method-options">
              <div
                className={`method-option ${
                  formData.siteInformationMethod === 'upload' ? 'selected' : ''
                }`}
                onClick={() => handleMethodChange('upload')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleMethodChange('upload')
                  }
                }}
              >
                <h4 className="option-title">Upload CSV / Excel</h4>
                <p className="option-description">
                  Upload a spreadsheet with all site information
                </p>
              </div>
            </div>
          </div>

          {formData.siteInformationMethod === 'upload' && (
            <div className="form-section">
              <div
                className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="upload-icon">☁️</div>
                <h4 className="upload-title">Upload Site Information</h4>
                <p className="upload-description">
                  Drag and drop your CSV or Excel file here, or click to select
                </p>
                <div className="upload-actions">
                  <button
                    type="button"
                    className="btn-select-file"
                    onClick={(e) => {
                      e.stopPropagation()
                      fileInputRef.current?.click()
                    }}
                  >
                    Select file
                  </button>
                  <button
                    type="button"
                    className="btn-download-template"
                    onClick={(e) => {
                      e.stopPropagation()
                      downloadTemplate()
                    }}
                  >
                    Download CSV Template
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileInput}
                  style={{ display: 'none' }}
                />
              </div>

              {(formData.uploadedFiles || []).length > 0 && (
                <div className="uploaded-files">
                  <h4 className="uploaded-title">Uploaded</h4>
                  {(formData.uploadedFiles || []).map((file, index) => (
                    <div key={index} className="uploaded-file">
                      <span className="file-icon">📄</span>
                      <span className="file-name">{file.name}</span>
                      <span className="file-size">{formatFileSize(file.size)}</span>
                      <button
                        type="button"
                        className="btn-preview"
                        onClick={() =>
                          alert('Preview functionality would go here')
                        }
                      >
                        Preview
                      </button>
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => removeFile(index)}
                        aria-label="Remove file"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Step4

