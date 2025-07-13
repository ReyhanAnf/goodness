

export async function get_current_location(latitude: any, longitude : any) {
  const url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${process.env.GEO_API_KEY}`;
  const req = await fetch(url, { 
    cache: 'no-store',
    next: { revalidate: 3600 } // Revalidate every hour
  });
  const res = req.json();

  return res;
}

export async function get_current_pray(year: any, month: any, latitude: any, longitude : any) {
  const url = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}`;
  const req = await fetch(url, { 
    cache: 'no-store',
    next: { revalidate: 1800 } // Revalidate every 30 minutes
  });
  const res = req.json();

  return res;
}