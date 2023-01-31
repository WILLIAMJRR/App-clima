import React, { useState } from 'react';
import imgCloud from '../img/cloud-computing.png';
import imgPressure from '../img/pressure-gauge(3).png';
import imgSpeed from '../img/storm.png';

const AppClima = ({ clima, temperature }) => {
    const city = clima?.name;
    const country = clima?.sys.country;
    const img = `http://openweathermap.org/img/wn/${clima?.weather[0].icon}@4x.png`;
    const description = clima?.weather[0].description;
    const windSpeed = clima?.wind.speed;
    const clouds = clima?.clouds.all;
    const pressure = clima?.main.pressure;

    const [isCelsius, setIsCelsius] = useState(true);

    const handleClick = () => {
        setIsCelsius(!isCelsius);
    };
    console.log(temperature);

    return (
        <section className='card_seccion'>
            <div className='card_header'>
                <h1>Weather App</h1>
                <h2>
                    {city},{country}
                </h2>
            </div>
            <div className='card_container'>
                <div className='card_temp'>
                    <img src={img} alt='imagen de clima' />
                    <h2>
                        {isCelsius
                            ? temperature?.celsius + '°C'
                            : temperature?.faranheit + '°F'
                            }
                    </h2>
                </div>
                <div className='card_info'>
                    <h3>Weather : "{description}"</h3>

                    <ul>
                        <li className='card_description'>
                            <img src={imgSpeed} alt='' />
                            <p>
                                Wind Speed : <span>{windSpeed}m/s</span>
                            </p>
                        </li>
                        <li className='card_description'>
                            <img src={imgCloud} alt='' />
                            <p>
                                Clouds : <span>{clouds}%</span>
                            </p>
                        </li>
                        <li className='card_description'>
                            <img src={imgPressure} alt='' />
                            <p>
                                Pressure : <span> {pressure}hPa</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <footer className='card_footer'>
                <button className='btn_footer' onClick={handleClick}>
                    Chance to {isCelsius ? '°F' : '°C'}
                </button>
            </footer>
        </section>
    );
};

export default AppClima;
