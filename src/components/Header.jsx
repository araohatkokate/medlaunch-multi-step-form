import './Header.css'

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-logo">DNV Healthcare</h1>
        </div>
        <div className="header-right">
          <div className="user-profile">
            <div className="user-avatar">KM</div>
            <span className="user-name">Katherine Martinez</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

