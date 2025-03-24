import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import prisma from '@/lib/prisma'
import {
  Edit,
  Mail,
  MoreHorizontal,
  Phone,
  Shield,
  Trash2,
  User,
} from 'lucide-react'
import Link from 'next/link'

export default async function NamePage() {
  let users = []
  users = await prisma.user.findMany({ orderBy: { name: 'asc' } })
  console.log(users)
  return (
    <div className="bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <Card
            key={user.id}
            className="bg-gray-800 border-gray-700 overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-gray-300" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{user.name}</h3>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Mail className="h-3 w-3 mr-1" />
                        <span className="truncate max-w-[180px]">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-700">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-800 border-gray-700 text-gray-200">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                        <Edit className="h-4 w-4 mr-2" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 hover:bg-gray-700 hover:text-red-400 cursor-pointer">
                        <Trash2 className="h-4 w-4 mr-2" />
                        <span>Eliminar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Phone className="h-3 w-3 mr-1" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Shield className="h-3 w-3 mr-1" />
                    <span>{user.cedula}</span>
                  </div>
                </div>

                <div className="flex items-center">
                  <Badge
                    variant={
                      user.role === 'ADMIN' ? 'destructive' : 'secondary'
                    }
                    className="text-xs"
                  >
                    {user.role}
                  </Badge>
                  <Badge
                    variant={user.isActive ? 'default' : 'outline'}
                    className="ml-2 text-xs"
                  >
                    {user.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Link
        href="/dashboard/add-user"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Agregar Usuario
      </Link>
    </div>
  )
}
