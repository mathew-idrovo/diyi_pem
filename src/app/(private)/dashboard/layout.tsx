export default function DashboardLayout({
  children,
  modal, // 🔥 Agregamos el slot para el modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* 🔥 Renderiza el modal en la misma página si está activo */}
      {modal}

      <div className="container mx-auto p-5">{children}</div>
    </div>
  )
}
