# DNV Healthcare Multi-Step Form

A React-based multi-step form application for DNV Healthcare quote requests, built according to the provided Figma design specifications.

## Tech Stack

- **React 18.2.0** - UI library
- **Vite 5.0.8** - Build tool and development server
- **React Router DOM 6.20.0** - Routing (installed but not used in single-page app)
- **React Hook Form 7.48.2** - Form handling library (installed but using custom state management)
- **Pure CSS** - Styling (no CSS frameworks)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd medlaunch-multi-step-form
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Project Structure

```
medlaunch-multi-step-form/
├── src/
│   ├── components/
│   │   ├── steps/
│   │   │   ├── Step1.jsx          # DNV Quote Request
│   │   │   ├── Step2.jsx          # Facility Details
│   │   │   ├── Step3.jsx          # Leadership Contacts
│   │   │   ├── Step4.jsx          # Site Information
│   │   │   ├── Step5.jsx          # Services & Certifications
│   │   │   └── Step6.jsx          # Review & Submit
│   │   ├── Header.jsx             # Application header
│   │   ├── ProgressBar.jsx       # Step progress indicator
│   │   ├── FormNavigation.jsx    # Navigation buttons
│   │   └── MultiStepForm.jsx     # Main form container
│   ├── context/
│   │   └── FormContext.jsx        # Form state management
│   ├── utils/
│   │   └── validation.js          # Form validation utilities
│   ├── App.jsx                    # Root component
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## Development Approach

### State Management
- Used React Context API (`FormContext`) to manage form data across all steps
- Centralized state allows easy access and updates from any component
- Form data persists as users navigate between steps

### Form Validation
- Implemented step-by-step validation before allowing progression
- Validation errors are displayed inline with form fields
- Required fields are clearly marked with asterisks
- Email validation uses regex pattern matching
- Validation occurs when user clicks "Continue" button

### Component Architecture
- Modular component structure for maintainability
- Each step is a separate component with its own CSS file
- Reusable form components (inputs, checkboxes, radio buttons)
- Consistent styling across all steps

### Styling
- Pure CSS with no external frameworks
- Responsive design using CSS Grid and Flexbox
- Mobile-first approach with media queries
- Color scheme matches Figma design (#003366 for primary blue)
- Consistent spacing and typography

### Accessibility
- Semantic HTML elements
- Proper label associations for form inputs
- Keyboard navigation support (Enter/Space for clickable cards)
- ARIA labels where appropriate
- Focus states for interactive elements

## Form Steps

1. **Step 1: DNV Quote Request**
   - Organization identification (Legal Entity Name, DBA)
   - Primary contact information with email verification

2. **Step 2: Facility Details**
   - Facility type selection (radio buttons)

3. **Step 3: Leadership Contacts**
   - CEO, Director of Quality, and Invoicing Contact information
   - Option to use primary contact details
   - Billing address

4. **Step 4: Site Information**
   - Single vs Multiple locations selection
   - CSV/Excel file upload for multiple locations
   - Drag-and-drop file upload functionality

5. **Step 5: Services & Certifications**
   - Multi-select checkboxes for services
   - Multi-select checkboxes for certifications

6. **Step 6: Review & Submit**
   - Summary of all entered information
   - Final submission

## Features

- Multi-step form navigation (Next/Previous)
- Form data persistence across steps
- Step-by-step validation
- Responsive design (mobile, tablet, desktop)
- File upload with drag-and-drop
- Email verification workflow
- Form submission with console logging
- Progress indicator
- Save functionality (UI ready, backend integration needed)

## Assumptions Made

1. **Email Verification**: The "Send Verification Email" button triggers a simulated email send. In production, this would integrate with an email service.

2. **File Upload**: File uploads are stored in state but not sent to a server. The preview functionality shows an alert placeholder.

3. **Form Submission**: On final submission, the form data is logged to the console. In production, this would be sent to an API endpoint.

4. **State Persistence**: Form data is stored in React state. For production, consider adding localStorage persistence or backend integration.

5. **Validation**: Client-side validation only. Server-side validation should be implemented in production.

6. **CSV Template**: The download template creates a basic CSV structure. Actual template format may vary based on requirements.

## Known Issues & Limitations

1. **File Upload Preview**: The preview functionality for uploaded files currently shows an alert. A proper preview modal/component would need to be implemented.

2. **Email Verification Status**: The email verification status doesn't update after sending (would require backend integration).

3. **Form Data Persistence**: Form data is lost on page refresh. Consider adding localStorage or session storage.

4. **Error Handling**: Limited error handling for edge cases (network errors, file size limits, etc.).

5. **Browser Compatibility**: Tested on modern browsers. Older browsers may have limited support.

6. **Accessibility**: Basic accessibility features implemented. Full WCAG compliance would require additional testing and improvements.


## License

This project is created for assessment purposes.

