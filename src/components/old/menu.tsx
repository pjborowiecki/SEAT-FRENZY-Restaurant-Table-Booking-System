import { MenuItemCard } from "@/components/old/menu-item-card"

export function Menu() {
  return (
    <div className="mt-5 bg-white">
      <div>
        <div className="mb-1 mt-4 pb-1">
          <h1 className="text-[32px] font-bold">Menu</h1>
          <div className="flex flex-wrap justify-between">
            <MenuItemCard />
          </div>
        </div>
      </div>
    </div>
  )
}
