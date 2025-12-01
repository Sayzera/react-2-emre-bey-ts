import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormState() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();

    navigate('/form-success', {
        state: {
            formData,
            submittedAt: new Date().toISOString()
        }
    })

    
  }
  return (
    <div className="page-container">
      <h1>📝 Form Sayfası</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>İsim:</label>
          <input
            type="text"
            required
            className="form-input"
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            required
            className="form-input"
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Mesaj:</label>
          <textarea
            required
            className="form-textarea"
            onChange={(e) =>
              setFormData({
                ...formData,
                message: e.target.value,
              })
            }
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Gönder (State ile)
        </button>
      </form>

      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li>
            <code>navigate()</code> ile state geçirme
          </li>
          <li>Form verilerini state ile taşıma</li>
          <li>Sayfalar arası veri aktarımı</li>
          <li>State objesi ile kompleks veri geçirme</li>
        </ul>
      </div>
    </div>
  );
}

export default FormState;
