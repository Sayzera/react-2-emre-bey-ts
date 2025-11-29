import { Link, Outlet, useNavigate } from 'react-router-dom'

/**
 * NestedRoutesExample - İç İçe Rotalar Örneği
 * 
 * Bu örnek, iç içe (nested) route yapısını gösterir.
 * Parent route içinde child route'lar render edilir.
 * 
 * Öğrenilenler:
 * - Outlet component ile nested route'ları render etme
 * - Parent ve child route yapısı
 * - Relative path kullanımı
 * - Index route kavramı
 */

// Parent Layout Component
function NestedRoutesExample() {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <h1>📁 İç İçe Rotalar (Nested Routes)</h1>
      
      <div className="info-box">
        <h3>Nested Routes Nedir?</h3>
        <p>
          Nested routes, bir route'un içinde başka route'lar tanımlamaya olanak sağlar.
          Parent route'un layout'u korunurken, child route'lar <code>Outlet</code> içinde render edilir.
        </p>
      </div>

      <div className="nested-layout">
        {/* Sol Menü - Parent Route */}
        <nav className="nested-nav">
          <h3>Menü</h3>
          <Link to="/nested-routes" className="nav-item">
            📊 Genel Bakış
          </Link>
          <Link to="/nested-routes/users" className="nav-item">
            👥 Kullanıcılar
          </Link>
          <Link to="/nested-routes/posts" className="nav-item">
            📝 Yazılar
          </Link>
          <Link to="/nested-routes/settings" className="nav-item">
            ⚙️ Ayarlar
          </Link>
        </nav>

        {/* Sağ İçerik - Child Routes buraya render edilir */}
        <div className="nested-content">
          <Outlet />
        </div>
      </div>

      <div className="info-box">
        <h3>Bu örnekte öğrenilenler:</h3>
        <ul>
          <li><code>Outlet</code> component ile child route'ları render etme</li>
          <li>Parent route içinde child route tanımlama</li>
          <li>Relative path kullanımı (örn: "users" yerine "/nested-routes/users")</li>
          <li>Index route ile varsayılan child route</li>
          <li>Layout paylaşımı (parent layout tüm child'larda görünür)</li>
        </ul>
      </div>
    </div>
  )
}

// Index Route Component (Varsayılan child route)
export function NestedRoutesIndex() {
  return (
    <div className="nested-page">
      <h2>📊 Genel Bakış</h2>
      <p>Bu, nested route'un index (varsayılan) sayfasıdır.</p>
      <p>URL: <code>/nested-routes</code></p>
      <div className="info-box">
        <p>
          Index route, parent route'un path'ine tam olarak eşleştiğinde render edilir.
          Yani <code>/nested-routes</code> adresine gidildiğinde bu sayfa gösterilir.
        </p>
      </div>
    </div>
  )
}

// Users Child Route
export function NestedUsersPage() {
  const users = [
    { id: 1, name: 'Ahmet Yılmaz', role: 'Admin' },
    { id: 2, name: 'Ayşe Demir', role: 'Editor' },
    { id: 3, name: 'Mehmet Kaya', role: 'User' },
  ]

  return (
    <div className="nested-page">
      <h2>👥 Kullanıcılar</h2>
      <p>URL: <code>/nested-routes/users</code></p>
      <div className="users-list">
        {users.map(user => (
          <div key={user.id} className="card">
            <h3>{user.name}</h3>
            <p>Rol: {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Posts Child Route
export function NestedPostsPage() {
  const posts = [
    { id: 1, title: 'React Router Kullanımı', author: 'Ahmet' },
    { id: 2, title: 'Nested Routes Örneği', author: 'Ayşe' },
    { id: 3, title: 'TypeScript ile React', author: 'Mehmet' },
  ]

  return (
    <div className="nested-page">
      <h2>📝 Yazılar</h2>
      <p>URL: <code>/nested-routes/posts</code></p>
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="card">
            <h3>{post.title}</h3>
            <p>Yazar: {post.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Settings Child Route
export function NestedSettingsPage() {
  return (
    <div className="nested-page">
      <h2>⚙️ Ayarlar</h2>
      <p>URL: <code>/nested-routes/settings</code></p>
      <div className="settings-list">
        <div className="card">
          <h3>Genel Ayarlar</h3>
          <p>Uygulama genel ayarları burada yer alır.</p>
        </div>
        <div className="card">
          <h3>Güvenlik</h3>
          <p>Güvenlik ayarları burada yer alır.</p>
        </div>
        <div className="card">
          <h3>Bildirimler</h3>
          <p>Bildirim tercihleri burada yer alır.</p>
        </div>
      </div>
    </div>
  )
}

export default NestedRoutesExample

