import { useEffect, useState } from "react";

type Location = {
    latitude: null | number,
    longitude: null | number
}
export default function useLocation() {

    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<Location>(
        { 
            latitude: null, 
            longitude: null 
        }
    );
    

    useEffect(() => {
        getLocation()
    }, [])

    const getLocation = () => {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(onSuccessPosition, onErrorPosition);

        } else {

          setError("Geolocation is not supported by this browser.");

        }
    };


    const onSuccessPosition = (position:any) => {
        setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }

    const onErrorPosition = (error:any) => {
        setError(error.message);
    }


      
    return {
        location,
        error
    }
}