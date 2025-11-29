/**
 * LazyTableComponent - Table Component (Lazy Loaded)
 */

function LazyTableComponent() {
  const data = [
    { id: 1, name: 'Ahmet', age: 25, city: 'İstanbul' },
    { id: 2, name: 'Ayşe', age: 30, city: 'Ankara' },
    { id: 3, name: 'Mehmet', age: 28, city: 'İzmir' },
  ]

  return (
    <div className="table-component">
      <h3>📋 Table Component</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>İsim</th>
            <th>Yaş</th>
            <th>Şehir</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="hint">Bu component lazy loading ile yüklenmiştir.</p>
    </div>
  )
}

export default LazyTableComponent

