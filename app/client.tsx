'use client'

interface ClientProps {
  children: React.ReactNode;
}

export default function Client({ children }: ClientProps) {
  return (
    <div>
      {children}
    </div>
  )
}