"use client"
import Clock from 'react-live-clock';
import { useEffect, useState } from "react"

export default function TimeClock() {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true)
  })
  return (
    <>
      {isClient ? (
        <div className="dash-text-blur w-auto text-lg py-2 font-extrabold flex flex-col gap-2 justify-center items-center">
          <Clock className="font-bold text-xl" format={'HH:mm:ss'} ticking={true} timezone={'Asia/Jakarta'} noSsr={false} />
        </div>
      ) : (
        <div className="dash-text-blur w-auto text-lg py-2 font-semibold">
          00:00:00
        </div>
      )
      }
    </>
  )
}