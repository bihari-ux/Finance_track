import { Outlet, Navigate } from "react-router-dom";


export default function AuthLayout() {
  return ( 
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center flex justify-center mb-6">
          <img src="/image/fantriq.png" alt="Fintriq" className="h-16 w-auto object-contain mix-blend-multiply contrast-[1.2] brightness-[1.1] scale-[1.3] origin-center" />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
