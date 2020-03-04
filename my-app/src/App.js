// src/App.js

import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import keys from './config/keys';
// import logo from './logo.svg';
// import './App.css';

const mapStyles = {
  width: '100%',
  height: '100%'
}

const markerStyle = {
  height: '50px',
  width: '50px',
  marginTop: '-50px'
}

const imgStyle = {
  height: '100%'
}

const Marker = ({ title }) => (

  <div style={markerStyle}>
    <img style={imgStyle} src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png" alt={title} />
    <h3>{title}</h3>
  </div>

);



class App extends Component {

  render() {
    return (

      <div >
        <GoogleMap
          style={mapStyles}
          bootstrapURLKeys={{ key: keys.googleAPIKey }}
          center={{ lat: 5.6219868, lng: -0.1733074 }}
          zoom={14}
        >
          <Marker
          title={'Current Location'}
          lat={5.6219868}
          lng={-0.1733074}
        >
          </Marker>
        </GoogleMap>
      </div>      

    );
  } // render()

}




// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
