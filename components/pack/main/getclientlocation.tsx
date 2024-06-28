"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, LoaderCircle } from "lucide-react"
import { setCookie } from 'cookies-next';

export default function ClientLocation() {
  const [getpos, setPos] = useState(false); // jakarta is default location ;
  const date = new Date();

  useEffect(() => {

    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
        if (permissionStatus.state === 'denied') {
          window.location.href = "app-settings:location";
        } else {
          navigator.geolocation.getCurrentPosition(function (position) {
            setCookie("latitude", `${position.coords.latitude}`);
            setCookie("longitude", `${position.coords.longitude}`);
            setCookie("date", date.getDate());
            setCookie("month", date.getMonth() + 1);
            setCookie("year", date.getFullYear());
          });
        }
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, [getpos]);

  return (
    <div>
      <Button className='hover:bg-transparent' onClick={() => {
        setPos(!getpos);
        let interv = setInterval(() => {
          setPos(false);
          clearInterval(interv)
        }, 1000);

      }} variant={"ghost"}>
        {!getpos ? (
          <MapPin size={15} />
        ) : (
          <LoaderCircle size={15} />
        )}
      </Button>
    </div>
  )
}

