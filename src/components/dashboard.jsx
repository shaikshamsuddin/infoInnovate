import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import './dashboard.css';
import moment from 'moment'
export const DashBoard = (()=>{
const [city, setCity] = useState('');
const [report, setReport] = useState([]);
const [cityName , setCityName] = useState('');
const [loading, setLoading] = useState(false)

const handleChange = (e)=>{
    setCity(e.target.value)
}

const handleSave = ()=>{
    setLoading(true)
    if(city.length > 0){
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?appid=15ca787f2d191cf1f09525804a2ce85d&q=${city}`).then((res)=>{
        setReport(res.data.list);
        setLoading(false)
    })
}
    console.log(report,"city")
}




    
    return(
        <div className="container-div">
             <div className="city-dashboard">
    <div className="city-bar">{city}</div>
    <span className="wether-portal">
                    Weather Report Portal
                </span>
    </div>
            <div className="dashboard-top">
                <h1>Weather Location in your City</h1>
              
                <div>
            <input type="text" value={city} onChange={handleChange} placeholder="please enter the City" />
         <button onClick={handleSave}><i class="fa fa-search"></i> Search</button>

     
         </div>
         </div>
         {loading  && city.length > 0 ? (
      <div className="loading">Loading...</div>
    ) : '' }

{loading  && city.length == 0 ? (
      <div className="error">Please enter city name...</div>
    ) : '' }
   
       <div className="weather-container">  
      { report && report.filter((val,index)=> index <= 5).map((res,index)=>{
        return(
              <div className="temperature-block">
                <div className="date-table">
                    Date : {moment(res.dt_txt).format("YYYY/MM/DD")};
                </div>
                <div className="temp-class temp-color"> Temperature</div>

                <div className="temperature temp-color">
                    <div className="min-temp">
                        <span className="span1">
                            Min
                        </span>
                        <span >
                            {res.main.temp_min}
                        </span>

                    </div>
                    <div className="max-temp"> 
                    <span className="span1">
                            Max
                        </span>
                        <span>
                            {res.main.temp_max}
                        </span>
                    </div>
                    </div>
                    <div className="temperature">
                    <div className="min-temp">
                        <span className="span1">
                            Pressure
                        </span>
                        <span>
                            Humidity
                        </span>

                    </div>
                    <div className="max-temp"> 
                    <span className="span1">
                            {res.main.pressure}
                        </span>
                        <span>
                            {res.main.humidity}
                        </span>
                    </div>
                    </div>
             </div> 
        )
      })
    }
    {
        loading && report.length < 0 ? <div> Data not available for this City </div>  : ''
    }
  </div>
        </div>
)

})