'use client'

import { authenticate } from '@/actions/auth/login'
import clsx from 'clsx'
import Link from 'next/link'
import React, { useActionState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { IoInformationOutline } from 'react-icons/io5'

export const FormLogin = () => {
  const [state, dispatch] = useActionState(authenticate, undefined)

  console.log(state)

  useEffect(() => {
    if (state === 'Success') {
      // redireccionar
      // router.replace('/');
      window.location.replace('/dashboard')
    }
  }, [state])
  return (
    <div className=" p-60 mt-44">
      <form action={dispatch} className="flex flex-col">
        <label htmlFor="email" className="text-amber-500 font-bold text-8xl ">
          Correo electrónico
        </label>
        <input
          className="px-5 py-2 border rounded mb-5"
          type="email"
          name="email"
        />

        <label htmlFor="email">Contraseña</label>
        <input
          className="px-5 py-2 border rounded mb-5"
          type="password"
          name="password"
        />

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state === 'CredentialsSignin' && (
            <div className="flex flex-row mb-2">
              <IoInformationOutline className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">
                Credenciales no son correctas
              </p>
            </div>
          )}
        </div>

        <LoginButton />
        {/* <button type="submit" className="btn-primary">
        Ingresar
        </button> */}

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>
      </form>
    </div>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending,
      })}
      disabled={pending}
    >
      Ingresar
    </button>
  )
}
