import React, { Component, Fragment } from "react"
import axios from "axios"
import "./App.css"


const API= "https://jsonplaceholder.typicode.com/users";

export default class App extends Component{

    constructor(){
    
        super();

        this.state={
          
            users:[],
            id:"",
            name:"",
            username:"",
            email:"",

            address:{

           
            street:"",
            suite:"",
            city:"",
            zipcode:""
            
            },


            phone:"",
            website:"",
            company:{

               name:""

            }

        }

    }


  componentDidMount=()=>{

   this.getComments()
   

  }



////Read operations////


    getComments=async ()=>{
     
        const {data}= await axios.get(API)

        console.log(data)

        this.setState({users:data})

    }



////Delete operations///

   
  deletePosts= async(pid)=>{
    
    const {data}=await axios.delete(`${API}/${pid}`)

    console.log(data)

    let mekala=[...this.state.users]
      
    mekala=mekala.filter((us)=>us.id!==pid)

    this.setState({users:mekala})

  }




  /////Functionalities/////

//handleChange is just to project on the UI, whatever the values we enter in the input fields///

handleChange=({target:{name,value}})=>{


    console.log(name,value)

    this.setState({[name]:value})


  }


  ////Create operations/////
   
   createPosts=async ()=>{

     const {data}= await axios.post(API,{

        name:this.state.name,
        username:this.state.username,
        email:this.state.email,
        address:{
        street:this.state.street,
        suite:this.state.suite,
        city:this.state.city,
        zipcode:this.state.zipcode
        },

        phone:this.state.phone,
        website:this.state.website,
        company:{
            name: this.state.name,

        }

     })

     console.log(data)

     const mekalp=[...this.state.users]
    
       mekalp.push(data)

     this.setState({users:mekalp, name:"",username:"",email:"",street:"",suite:"",city:"",zipcode:"",phone:"",website:"",company:"" })


 }


 /////Edit Operations/////


 editPosts= (us)=>{

   this.setState(
       
    {id:us.id,
   name:us.name,
   username:us.username,
   email:us.email,
   street:us.address.street,
   suite:us.address.suite,
   city:us.address.city,
   zipcode:us.address.zipcode,
   phone:us.phone,
   website:us.website,
   company:us.company,

   })

 }


 updatePosts=async ()=>{

 const {data}=await axios.put(`${API}/${this.state.id}`,{

    name:this.state.name,
    username:this.state.username,
    email:this.state.email,
    address:{
    street:this.state.street,
    suite:this.state.suite,
    city:this.state.city,
    zipcode:this.state.zipcode
    },

    phone:this.state.phone,
    website:this.state.website,
    company:{
        name: this.state.name,

    }

 })


 console.log(data)


 const posts=[...this.state.users]

 const ias= posts.findIndex(pt=>pt.id===this.state.id)

 console.log(ias)

 posts[ias]=data;

 this.setState({users:posts, name:"",username:"",email:"",street:"",suite:"",city:"",zipcode:"",phone:"",website:"",company:"",id:""})


 }




 ////HandleSubmit////


 handleSubmit=(e)=>{

    e.preventDefault()

    
  console.log(this.state)

  if(this.state.id){

    this.updatePosts()

  }else{

  this.createPosts()

  }


  }


      render(){


      return(
      
      <Fragment>
      
      <h3 className="header">CRUD OPERATIONS FOR USERS</h3>


      <form onSubmit={this.handleSubmit} className="frm">



   
     <div>
      
      <label>Name: </label>
      <input type="text" name="name" value={this.state.name} onChange={this.handleChange}></input>



     </div><br/>

   
     <div>
      
      <label>User Name: </label>
      <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>



     </div><br/>
     <div>
      
      <label>Email: </label>
      <input type="email" name="email" value={this.state.email} onChange={this.handleChange}></input>



     </div><br/>

     <div>
      
      <label>Address: </label><br/><br/>
      <label>Street:</label>
      <input type="text" name="street" value={this.state.street} onChange={this.handleChange}></input>

      <label>Suite: </label>
      <input type="text" name="suite" value={this.state.suite} onChange={this.handleChange}></input>

      <label>City: </label>
      <input type="text" name="city" value={this.state.city} onChange={this.handleChange}></input>

      <label>Zipcode:</label>
      <input type="number" name="zipcode" value={this.state.zipcode} onChange={this.handleChange}></input><br/><br/>

      <label>Phone</label>
      <input type="number" name="phone" value={this.state.phone} onChange={this.handleChange}></input>

      <label>Website:</label>
      <input type="text" name="website" value={this.state.website} onChange={this.handleChange}></input>

      <label>Company: </label>
      <input type="text" name="company" value={this.state.company.name} onChange={this.handleChange}></input>


     </div><br/>


     
     <div>

      <button type="submit">SUBMIT</button>


     </div>

      </form>
   
      <table className="table">

  <thead className="tr">
    <tr>
      <th scope="col">id</th>
      <th scope="col">name</th>
      <th scope="col">username</th>
      <th scope="col">email</th>
      <th scope="col">street</th>
      <th scope="col">suite</th>
      <th scope="col">city</th>
      <th scope="col">zipcode</th>
      <th scope="col">phone</th>
      <th scope="col">website</th>
      <th scope="col">company</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    

    

    {this.state.users.map((user)=>{

          return (

            <tr key={user.id} className="tr">

            <th scope="row">{user.id}</th>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.address.street}</td>
            <td>{user.address.suite}</td>
            <td>{user.address.city}</td>
            <td>{user.address.zipcode}</td>
            <td>{user.phone}</td>
            <td>{user.website}</td>
            <td>{user.company.name}</td>
            <td>
              <button type="button" className="btn btn-primary" onClick={()=>this.editPosts(user)}>EDIT</button>
              <button type="button" className="btn btn-warning" onClick={()=>this.deletePosts(user.id)}>DELETE</button>
            </td>


            </tr>

          )

    })
    
    }

  </tbody>
</table>
      
      </Fragment>
      
)
}

}