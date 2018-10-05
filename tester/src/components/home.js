import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Home extends Component {
constructor(props) {
    super(props);
    this.state = {};
  }
  
componentDidMount() {
axios.get(`http://localhost:3333/api/projects`)
.then(response=>{
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
{this.state.data.map(post =>{
return(	
<Link className="post" key={post.id} to={`/projects/${post.id}`}>
{post.name}
</Link>);
})}
</div>
);}

else{
return(
<div>
...loading...
</div>
)}

}

}

export default Home;