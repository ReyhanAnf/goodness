"use client"
import Clock from 'react-live-clock';
import { useEffect, useState } from "react"

export default function TimeClock() {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="text-xs sm:text-sm text-white/70 mb-1">Waktu Sekarang</div>
      {isClient ? (
        <Clock 
          className="font-bold text-lg sm:text-xl text-white" 
          format={'HH:mm:ss'} 
          ticking={true} 
          timezone={'Asia/Jakarta'} 
          noSsr={false} 
        />
      ) : (
        <div className="font-bold text-lg sm:text-xl text-white">
          00:00:00
        </div>
      )}
    </div>
  )
}