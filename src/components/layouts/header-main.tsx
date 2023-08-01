"use client"

import * as React from "react"

import { SearchBar } from "@/components/search-bar"

export function HeaderMain() {
  return (
    <header>
      <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
        <div className="mt-10 text-center">
          <h1 className="mb-2 text-[40px] font-bold text-white">
            Find your table for any occation
          </h1>
          <SearchBar />
        </div>
      </div>
    </header>
  )
}
