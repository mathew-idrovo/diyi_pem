'use client'

import { useState } from 'react'
import { UserPlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserFormModal } from './UserFormModal'

export const ButtonAddUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-white text-black hover:bg-gray-200"
      >
        <UserPlusIcon className="h-4 w-4 mr-2" />
        Agregar Usuario
      </Button>

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
