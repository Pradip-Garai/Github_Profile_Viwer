import React, { useEffect,useState } from 'react'
import "./Styles/body.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Body() {
  
  const [profile,setProfile] = useState([]);
  const [number,setNumber] = useState();

  async function fetchData() {
  if (!number) return;

  if (isNaN(Number(number))) {
    // if it's not a number, assume it's a username
    const response = await fetch(`https://api.github.com/users/${number}`);

    if (!response.ok) {
      toast.error("❌ User not found!");
      setProfile([]);
      return;
    }

    const data = await response.json();
    setProfile([data]); 
  } 
  else {
    // it's a number, so fetch that many users
    const response = await fetch(`https://api.github.com/users?per_page=${number}`);
    const data = await response.json();
    setProfile(data);
  }
}


  return <>
    
    {/* search bar */}
    <div className='SearchArea'>
       <input type='text' placeholder='Search by Name Or Search Numbers of Profiles' value={number} onChange={(e)=> setNumber(e.target.value)}/>
       <button onClick={fetchData}>Find</button>

    </div>

    <div className='container'>
       {

        profile.map((value)=>{
           return (<div key={value.id} className='card'>
             <img src={value.avatar_url}/>
             <h2>{value.login}</h2>
             <a href={value.html_url} target="_blank">View Profile</a>
           </div>)
        })

       }
    </div>
    <ToastContainer position="top-right" autoClose={3000} />
  </>
}

export default Body