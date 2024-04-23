import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'

export class App extends Component {


  render() {
    return (
      <div>
      <NavBar/>
      <News pageSize='5' category='sports' country='in'/>
      </div>
    )
  }
}

export default App

