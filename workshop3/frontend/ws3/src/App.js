import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [name, setCafeName] = useState('');
  const [addr, setAddr] = useState('');
  const [license, setLicense] = useState('');
  const [cafeReviewList, setCafeReviewList] = useState([]);
  const [newAddr, setNewAddr] = useState("");
  const [newlicense, setlicense] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3002/api/get').then((response) => {
        setCafeReviewList(response.data)
    })
  },[])

  const submitCafe = () => {
    console.log(name, addr, license);
    Axios.post('http://localhost:3002/api/insert', {
      name: name,
      addr: addr,
      license: license
    }).then(() => {
      alert('successful insertion!')
    })
    
    
    setCafeReviewList([
        ...cafeReviewList,
        {
            name: name,
            addr: addr,
            license: license
        },
      ]);  
};

const deleteCafe = (name) => {
    Axios.delete(`http://localhost:3002/api/delete/${name}`);
  };

  const updateAddr = (name) => {
    Axios.put(`http://localhost:3002/api/update`, {
        name: name,
        addr: newAddr
    });
    setNewAddr("")
  };



  return (
    <div className="App">
      <h1>Cafe Shop Example</h1>

      <div className="form">
        <label> Cafe Name: </label>
        <input type="text" name="name" onChange={(e) =>
          {setCafeName(e.target.value)}
        }/>
        <label> Address: </label>
        <input type="text" name="addr" onChange={(e) =>
          {setAddr(e.target.value)}
        }/>
        <label> License: </label>
        <input type="text" name="license" onChange={(e) =>
          {setLicense(e.target.value)}
        }/>

        <button onClick={submitCafe}> Submit </button>



        {cafeReviewList.map((val) => {
          return (
            <div className = "card">
              <h5> name: {val.name} </h5>
              <p> address: {val.addr} </p>
              <p> license: {val.license} </p>
              <button onClick={() => { deleteCafe(val.name) }}> Delete</button>
              <input type="text" id="updateInput" onChange={(e) => {
                setNewAddr(e.target.value)
              } }/>
              <button onClick={() => {
                updateAddr(val.name)
              }}> Update</button>
              </div>
          );
          
          ;
        })}


      </div>

    </div>
  );
}

export default App;
