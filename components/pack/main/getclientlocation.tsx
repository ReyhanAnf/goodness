"use client"
import React, { useState, useEffect } from 'react';
import { MapPin, LoaderCircle } from "lucide-react"
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function ClientLocation() {
  const [getpos, setPos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const date = new Date();

  const updateLocation = () => {
    setIsLoading(true);
    setPos(true);

    if ("geolocation" in global.navigator) {
      global.navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
        if (permissionStatus.state === 'denied') {
          window.location.href = "app-settings:location";
        } else {
          global.navigator.geolocation.getCurrentPosition(function (position) {
            setCookie("latitude", `${position.coords.latitude}`);
            setCookie("longitude", `${position.coords.longitude}`);
            setCookie("date", date.getDate().toString());
            setCookie("month", (date.getMonth() + 1).toString());
            setCookie("year", date.getFullYear().toString());
            
            // Refresh the page to update prayer times
            setTimeout(() => {
              router.refresh();
            }, 1000);
          }, (error) => {
            console.error('Error getting location:', error);
            setIsLoading(false);
            setPos(false);
          });
        }
      });
    } else {
      console.log("Geolocation is not available in your browser.");
      setIsLoading(false);
      setPos(false);
    }
  };

  return (
    <div 
      className='hover:bg-transparent p-0 m-0 cursor-pointer' 
      onClick={updateLocation}
    >
      {!isLoading ? (
        <MapPin size={16} className="text-emerald-200" />
      ) : (
        <LoaderCircle size={20} className="animate-spin text-emerald-200" />
      )}
    </div>
  )
}

