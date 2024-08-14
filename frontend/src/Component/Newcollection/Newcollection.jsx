import React, { useEffect, useState } from 'react';
import Item from '../Item/Item'
import './Newcollection.css'
import new_collection from '../Assets/new_collections';
const Newcollection = () => {

  const [new_collection,setNew_collection]=useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.1.109:3000/newcollections', {
        headers: {
          'Accept': 'application/json',
        }
      });
    
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText} (Status: ${response.status})`);
      }
      const data = await response.json();
      setNew_collection(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  fetchData();
  }, []);


  // useEffect(()=>{
  //       fetch('http://localhost:4000/newcollections').then((response)=>response.json())
  //       .then((data)=>setNew_collection(data));
  // },[])

  return (
    
    <div className='New-collection'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {
          new_collection.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          })
        }
      </div>
    </div>
  )
}

export default Newcollection
