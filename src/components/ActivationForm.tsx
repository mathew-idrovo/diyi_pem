'use client'

import { activateUser } from '@/actions'
import { AlertCircle, Check, Loader2, Loader2Icon } from 'lucide-react'
import { useState } from 'react'

export function ActivationForm({ token }: { token: string }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [cedula, setCedula] = useState('')
  const [disease, setDisease] = useState('')
  const [medication, setMedication] = useState('')
  const [message, setMessage] = useState('')
  const [securityCode, setSecurityCode] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    setIsSubmitting(true)
    setMessage('Procesando...')
    const user = await activateUser(
      token,
      name,
      password,
      phone,
      disease,
      medication,
      cedula
    )

    if (user.success) {
      setMessage(user.success)
      setSecurityCode(user.securityCode)
    } else {
      setMessage(user.error || 'An error occurred')
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md backdrop-blur-md bg-black/30 p-8 rounded-xl border border-gray-800 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Activación de cuenta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-gray-300 font-medium block">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-300 font-medium block">
              Nueva Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-300 font-medium block">Celular</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-300 font-medium block">Cédula</label>
            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-3">
            <label className="text-gray-300 font-medium block">
              Selecciona tu enfermedad
            </label>
            <div className="grid grid-cols-2 gap-2">
              {diseases.map((d) => (
                <label
                  key={d}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
                >
                  <input
                    type="radio"
                    name="disease"
                    value={d}
                    onChange={(e) => setDisease(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="text-white focus:ring-white focus:ring-offset-black"
                  />
                  <span>{d}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-gray-300 font-medium block">
              Selecciona tu medicamento
            </label>
            <div className="grid grid-cols-2 gap-2">
              {medications.map((m) => (
                <label
                  key={m}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
                >
                  <input
                    type="radio"
                    name="medication"
                    value={m}
                    onChange={(e) => setMedication(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="text-white focus:ring-white focus:ring-offset-black"
                  />
                  <span>{m}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-md font-medium transition-all bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed mt-4"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
                Procesando...
              </span>
            ) : (
              'Activar Cuenta'
            )}
          </button>

          {message && !securityCode && (
            <div
              className={`flex items-start space-x-2 p-3 rounded-md ${
                message.includes('error')
                  ? 'text-red-400 bg-red-900/20 border border-red-800'
                  : 'text-green-400 bg-green-900/20 border border-green-800'
              }`}
            >
              {message.includes('error') ? (
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              ) : (
                <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
              )}
              <p>{message}</p>
            </div>
          )}

          {securityCode && (
            <div className="mt-6 bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-center">
              <h3 className="text-lg font-medium text-white mb-2">
                Cuenta activada correctamente
              </h3>
              <div className="bg-black/50 border border-gray-700 rounded-md p-3 mb-3">
                <p className="text-gray-400 text-sm">Código de seguridad:</p>
                <p className="text-xl font-mono tracking-wider text-white">
                  {securityCode}
                </p>
              </div>
              <p className="text-gray-400 text-sm">
                Este código también ha sido enviado a tu correo electrónico
                junto con tu tarjeta médica digital.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
