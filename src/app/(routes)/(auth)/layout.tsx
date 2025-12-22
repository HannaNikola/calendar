
"use client";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5]">
      <div className="w-[400px]">{children}</div>
    </div>
  );
}
