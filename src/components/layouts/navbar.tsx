import Link from "next/link"

export function Navbar() {
  return (
    <nav className="flex justify-between bg-white p-2">
      <Link href="/" className="text-[22px] font-bold text-gray-700">
        OpenTable
      </Link>
      <div>
        <div className="flex gap-3">
          <button className=" rounded-md border bg-blue-400 px-4 py-2 text-white">
            Sign in
          </button>
          <button className="rounded-md border px-4 py-2">Sign up</button>
        </div>
      </div>
    </nav>
  )
}
