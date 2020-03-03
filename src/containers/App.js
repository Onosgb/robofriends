import React, { Component}from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import Scroll from '../components/Scroll';
import {setSearchField, requestRobots}  from '../actions';
const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    isPending: state.requestRobots.isPending,
    robots: state.requestRobots.robots,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatchEvent) => {
  return {
  onSearchChange: event => dispatchEvent(setSearchField(event.target.value)),
  onRequestRobots: () => dispatchEvent(requestRobots())

  }
}
class  App  extends Component  {
   
    componentDidMount() {
       this.props.onRequestRobots();
    }

 
    render() {
      const {searchField, onSearchChange, robots, isPending} = this.props;
      const filteredRobots = robots.filter(r => {
        return  r.name.toLowerCase().includes(searchField.toLowerCase())
       });

      return isPending?    <h1>Loading</h1> : (
            <div className="tc">
             <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
              <Scroll>
                <ErrorBoundry>
                <CardList robots={filteredRobots}/>
                </ErrorBoundry>
              </Scroll> 
            </div>
            )
    }  
}

export default connect(mapStateToProps, mapDispatchToProps) (App);