"use client";

import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6">Register</h1>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white rounded px-3 py-2"
          >
            Register
          </button>

                    <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-sm text-blue-600 hover:underline"
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </main>
  );
}