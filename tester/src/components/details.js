import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Details extends Component {
constructor(props) {
    super(props);
    this.state = {};
  }
  
componentDidMount() {
axios.get(`http://localhost:3333/api${this.props.match.url}`)
.then(response=>{
console.log(response);
this.setState({data:response.data});
})
.catch(function(error){
console.log(error);
})
}

render(){
if(this.state.data){
return(
<div className="flex">
<Link to="/">Home</Link>
<div>
{this.state.data.name}
</div><div>
{this.state.data.description}
</div>
<div>
requirements:
</div>
{this.state.data.actions.map(item=>{
return(
<div key={item.id}>
{item.description}
</div>);
})}
</div>
)}
else{
return(
<div>
...loading...
</div>
)}
}

}

export default Details