import './App.css';
import AppClima from './components/AppClima';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


function App() {

    const [coordenadas, setCoordenadas] = useState();
    const [clima, setclima] = useState();
    const [temperature, settemperature] = useState();
    const [isloading, setIsloading] = useState(true);

    // peticion asincronica en el useefect aqui se esta haciendo la peticion por la geolocalizacion
    useEffect(() => {
        // nombre de la funcion que sugiere la geolocation y un objeto que guarda la latitud y longitud
        const success = (position) => {
            const info = {
                latitud: position.coords.latitude,
                longitud: position.coords.longitude,
            };

            // guardar la informacion de la latitud y longitud en coords
            setCoordenadas(info);
        };

        // este metodo es usado para la localizacion del dispositivo
        navigator.geolocation.getCurrentPosition(success);
    }, []);

    // este useEffect se ejecuta en el primer renderizado o solo cuando coordenadas reciba informacion y cada vez q cambie coordenadas y para que no se ejecute lo q esta dentro del coolback se coloca un condicionas dentro de los hooks no se puede colocar nada afiuer de la raiz
    useEffect(() => {
 
        if (coordenadas) {
            // si se ejecuta coord y tiene los datos entonces muestrame esto con mis datos
            const apiKey = '8bc16c6f1f2d255e69e974f5ca45a075';
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordenadas.latitud}&lon=${coordenadas.longitud}&appid=${apiKey}`;

            // para hacer una peticion e importarla ES UNA PROMESA METODOS THEN Y CASH SON ALGUNAS
            axios
                .get(url)
                .then(res => {
                    
                    setclima(res.data);
                    const obj = {
                        celsius:(res.data.main.temp - 273).toFixed(1),
                        faranheit:((res.data.main.temp - 273) * 9/5 + 32).toFixed(1),
                    };
                    settemperature(obj);
                })
                .catch(err => console.log(err))
                .finally(() => setIsloading(false));
        }
    }, [coordenadas]);

    return (
        <div className='App'>
            {isloading ? 
            (<h1>Loading...</h1>) : 
            (<AppClima className = 'app_clima'
             clima={clima} 
            temperature={temperature} 
            />)
            }
        </div>
    );
}

export default App;
