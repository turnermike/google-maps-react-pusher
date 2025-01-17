// src/App.js

import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import axios from 'axios';
import Pusher from 'pusher-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import keys from './config/keys';


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


  constructor(props) {

    super(props);

    this.state = {
      center: { lat: 5.6219868, lng: -0.23223 },
      locations: {},
      users_online: [],
      current_user: ''      
    };

  } // constructor()


  componentDidMount() {

    let pusher = new Pusher(keys.pusherKey, {
      authEndpoint: "http://localhost:3128/pusher/auth",
      cluster: keys.pusherCluster
    })
    this.presenceChannel = pusher.subscribe('presence-channel');

    this.presenceChannel.bind('pusher:subscription_succeeded', members => {
      this.setState({
        users_online: members.members,
        current_user: members.myID
      });
      this.getLocation();
      this.notify();
    })

    this.presenceChannel.bind('location-update', body => {
      this.setState((prevState, props) => {
        const newState = { ...prevState }
        newState.locations[`${body.username}`] = body.location;
        return newState;
      });
    });

    this.presenceChannel.bind('pusher:member_removed', member => {
      this.setState((prevState, props) => {
        const newState = { ...prevState };
        // remove member location once they go offline
        delete newState.locations[`${member.id}`];
        // delete member from the list of online users
        delete newState.users_online[`${member.id}`];
        return newState;
      })
      this.notify()
    })

    this.presenceChannel.bind('pusher:member_added', member => {
      this.notify();
    })

  } // componentDidUpdate()


  notify = () => toast(`Users online : ${Object.keys(this.state.users_online).length}`, {

    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    type: 'default'

  }); // notify


  getLocation = () => {

    if ("geolocation" in navigator) {

      navigator.geolocation.watchPosition(position => {
        let location = { lat: position.coords.latitude, lng: position.coords.longitude };
        this.setState((prevState, props) => {
          let newState = { ...prevState };
          newState.center = location;
          newState.locations[`${prevState.current_user}`] = location;
          return newState;
        });
        axios.post("http://localhost:3128/update-location", {
          username: this.state.current_user,
          location: location
        }).then(res => {
          if (res.status === 200) {
            console.log("new location updated successfully");
          }
        });
      })

    } else {

      alert("Sorry, geolocation is not available on your device. You need that to use this app");

    }

  } // getLocation() 

  render() {

    let locationMarkers = Object.keys(this.state.locations).map((username, id) => {
      return (
        <Marker
          key={id}
          title={`${username === this.state.current_user ? 'My location' : username + "'s location"}`}
          lat={this.state.locations[`${username}`].lat}
          lng={this.state.locations[`${username}`].lng}
        >
        </Marker>
      );
    });

    return (

      <div >

        <GoogleMap
          style={mapStyles}
          bootstrapURLKeys={{ key: keys.googleAPIKey }}
          center={{ lat: 43.335937, lng: -79.812593 }}
          zoom={10}
        >
          {locationMarkers}
        </GoogleMap>

        <ToastContainer />

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
