/**
 * SettingsPage - Ayarlar Sayfası (Nested Protected Route)
 */
function SettingsPage() {
  return (
    <div className="page-container">
      <h2>⚙️ Ayarlar</h2>
      <p>Bu sayfa dashboard içinde nested route olarak render edildi.</p>
      <p className="hint">URL: /dashboard/settings</p>
    </div>
  )
}

export default SettingsPage

