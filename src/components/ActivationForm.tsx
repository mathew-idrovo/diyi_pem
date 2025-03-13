'use client'
import { activateUser } from '@/actions'
import { useState } from 'react'

export function ActivationForm({ token }: { token: string }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [disease, setDisease] = useState('')
  const [medication, setMedication] = useState('')
  const [message, setMessage] = useState('')
  const [securityCode, setSecurityCode] = useState<string | null>(null)

  const diseases = [
    'Diabetes',
    'Cáncer',
    'Hipertensión',
    'Asma',
    'Epilepsia',
    'Artritis',
    'Hepatitis',
    'Migraña',
  ]
  const medications = [
    'Losartán',
    'Metformina',
    'Aspirina',
    'Paracetamol',
    'Omeprazol',
    'Amoxicilina',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Procesando...')

    const res = await activateUser(token, name, password, disease, medication)

    if (res.success) {
      setMessage(res.success)
      setSecurityCode(res.securityCode)
    } else {
      setMessage(res.error || 'An error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Activación de cuenta</h2>

      <label>Nombre</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Nueva Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label>Selecciona tu enfermedad</label>
      <div className="radio-group">
        {diseases.map((d) => (
          <label key={d}>
            <input
              type="radio"
              name="disease"
              value={d}
              onChange={(e) => setDisease(e.target.value)}
              required
            />
            {d}
          </label>
        ))}
      </div>

      <label>Selecciona tu medicamento</label>
      <div className="radio-group">
        {medications.map((m) => (
          <label key={m}>
            <input
              type="radio"
              name="medication"
              value={m}
              onChange={(e) => setMedication(e.target.value)}
              required
            />
            {m}
          </label>
        ))}
      </div>

      <button type="submit">Activar Cuenta</button>

      {message && <p>{message}</p>}
      {securityCode && (
        <p>
          Código de seguridad: <strong>{securityCode}</strong>
        </p>
      )}
    </form>
  )
}
