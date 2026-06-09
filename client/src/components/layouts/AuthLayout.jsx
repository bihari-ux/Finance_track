import { Outlet, Navigate } from "react-router-dom";


export default function AuthLayout() {
  return ( 
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Finance Tracker
          </h2>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
