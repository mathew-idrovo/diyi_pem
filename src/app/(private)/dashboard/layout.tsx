export default function DashboardLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="container mx-auto p-5">{children}</div>
      {modal}
    </div>
  )
}
