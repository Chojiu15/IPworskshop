import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Info from './Info'

const App = () => {
 
  const API_KEY = process.env.REACT_APP_KEY
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      fetchData()
  }, [])

  const fetchData = async () => {
      await axios.get(`https://geo.ipify.org/api/v1?apiKey=${API_KEY}`)
      .then(response => {
         setData(response.data)
        setLoading(false)
      })
      console.log(data)
  }


  return (
    <div style={{textAlign: 'center'}}>
     {loading ? <h1>Loading</h1> : (
       <>
          <Info data={data} />
       </>
     )}
    </div>
  );
}

export default App
