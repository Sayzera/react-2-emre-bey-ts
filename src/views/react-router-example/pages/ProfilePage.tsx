/**
 * ProfilePage - Profil Sayfası (Nested Protected Route)
 */
function ProfilePage() {
  return (
    <div className="page-container">
      <h2>👤 Profil</h2>
      <p>Bu sayfa dashboard içinde nested route olarak render edildi.</p>
      <p className="hint">URL: /dashboard/profile</p>
    </div>
  )
}

export default ProfilePage

