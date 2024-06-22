import { BiSearch,BiCurrentLocation } from "react-icons/bi";

import './index.css'
import { useState } from "react";

const InputLocation = ({setQuery,setUnits}) => { 
    
    const [city,setCity] = useState('')
    const onSearchClick = () => { 
        if(city !== ''){
            setQuery({q:city})
        }
    }

    const onLocationClick = () => {
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                const {latitude,longitude} = position.coords
                setQuery({lat:latitude,lon:longitude})
            })
        }
    }
    

    return(
        <div className="InputComponentContainer">
        <div className='inputLocationContainer'>
            <input type='text' placeholder='search by city...' className='inputLocation' value = {city} onChange = {(event) => setCity(event.currentTarget.value)} />
            <BiSearch className = 'icons' onClick={onSearchClick}/>
            <BiCurrentLocation className = 'icons' onClick={onLocationClick} />
        </div>
        <div className="tempContainer">
            <button className="degree" onClick={() => setUnits('metric')}>
                °C
            </button>
            <p className="seperator">
                |
            </p>
            <button className="degree" onClick={() => setUnits('imperial')}>
                °F
            </button>
        </div>
    </div>
    )
}

export default InputLocation