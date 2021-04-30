import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'
import { useState, useEffect } from 'react';
import {DateTime} from 'luxon'



const Info = ({ data }) => {
  const position = [data.location.lat, data.location.lng];
  const [country, setCountry] = useState([])
  const [londonTime, setLondonTime] = useState()


  

const fetchData = () => {
  let event = new Date();
  event = (event.toLocaleString('en-GB', { timeZone: 'Europe/London' }))
  let eventTime = event.split(' ')[1]
  let eventDate = event.split(' ')[0]
  eventTime = eventTime.split(':')
  eventDate = eventDate.split('/')
  setLondonTime({ eventDate, eventTime })
  console.log(londonTime)

}

  console.log( new Date())

  useEffect(() => {
    fetchCountry()
    fetchData()
  }, [])

  const fetchCountry = async () => {
      await axios.get(`https://restcountries.eu/rest/v2/alpha/${data.location.country}`)
      .then(response => setCountry(response.data))
  }


  console.log(data);
  return (
    <div style={{textAlign: 'center'}}>
      <p>My IP : {data.ip}</p>
      <p>{data.location.city}</p>
      <p>{data.location.country}</p>
      <p> {DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)} </p>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{width: '1000px', height : '500px', textAlign:'center'}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
              <img style={{height: '50px', width:'50px'}} src={country.flag} />
          </Popup>
        </Marker>
      </MapContainer>
      
    </div>
  );
};

export default Info;
