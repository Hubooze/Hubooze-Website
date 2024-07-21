import React, { useEffect ,useState} from 'react'
import img from '../../src/Component/Assets/sliderimg/lts.jpg'
import Item from '../Component/Item/item';
import './CSS/Latestcollection.css'
const LatestCollectionspage = () => {

    
  const [new_latestcollection,setNew_latestcollection]=useState([]);

  useEffect(()=>{
        fetch('http://192.168.1.109:3000/latestcollection').then((response)=>response.json())
        .then((data)=>setNew_latestcollection(data));
  },[])
    return (
        <>
        <img src={img} className='bgimg'  />
        <div className='New-collection'>
        <h1>Latest COLLECTIONS</h1>
        <hr />
        <div className="collections">
          {
            new_latestcollection.map((item, i) => {
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })
          }
        </div>
      </div>
      </>
    )
}

export default LatestCollectionspage
