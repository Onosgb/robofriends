import React, { Component}from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import Scroll from '../components/Scroll';
class  App  extends Component  {
    constructor() {
        super()
        this.state = {
            robots: [],
            seachField: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users}));
    }

    onSearchChange = (event)=> {
        this.setState({seachField: event.target.value});
        }

    render() {
      let  {seachField, robots} = this.state;
      const filteredRobots = robots.filter(r => {
        return  r.name.toLowerCase().includes(seachField.toLowerCase())
       });

      return !robots.length ?    <h1>Loading</h1> : (
            <div className="tc">
             <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
              <Scroll>
                <ErrorBoundry>
                <CardList robots={filteredRobots}/>
                </ErrorBoundry>
              </Scroll> 
            </div>
            )
    }  
}

export default App;