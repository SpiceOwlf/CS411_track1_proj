import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {

  const [user_id, setUserId] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [phone_num, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [userReviewList, setUserReviewList] = useState([]);
  const [displayUserIdSearchList, setdisplayUserIdSearchList] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [advancedQueryList, setadvancedQueryList] = useState([]);

//   const [newphoneNumber, setlicense] = useState("");
//   const [newemail, setlicense] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3002/api/get').then((response) => {
    console.log("setUserReviewList response, "+ response);      
    setUserReviewList(response.data)
    })
  },[])

  const advanced_query_button = () =>{
    Axios.get('http://localhost:3002/api/advanced_query', {
        // params:{
        //     user_id: user_id
        // }
        
    }).then((response) => {
        // console.log("advanced_query response.data:  "+ response.data);
        setadvancedQueryList(response.data)
      });
  }


  const SearchUserId = () =>{
    console.log("db user_id is  " + user_id);
    Axios.get('http://localhost:3002/api/search_user_id', {
        params:{
            user_id: user_id
        }
        
    }).then((response) => {
        console.log("response.data:  "+ response.data);
        setdisplayUserIdSearchList(response.data)
      });
  }


  const submitUser = () => {
    console.log(user_id,username, password, phone_num, email);

    Axios.post('http://localhost:3002/api/insert', {
      user_id: user_id,
      username: username,
      password: password,
      phone_num: phone_num,
      email: email
    }).then(() => {
      alert('successful insertion!')
    })
    
    setUserReviewList([
        ...userReviewList,
        {
            user_id: user_id,
            username: username,
            password: password,
            phone_num: phone_num,
            email: email
        },
      ]);  
};

    const deleteUser = (user_id) => {
        Axios.delete(`http://localhost:3002/api/delete/${user_id}`);
    };

  const updatePassword = (user_id) => {
      console.log("user_id is  " + user_id);
      console.log("password is  " + newPassword);

    Axios.put(`http://localhost:3002/api/update`, {
        user_id: user_id,
        password: newPassword
    });
    setNewPassword(newPassword);
  };
  


  return (
    <div className="App">
      <h1>Team25 demo</h1>

      <div className="form">
      <label> Search UserId: </label>
        <input type="text" name="user_id" onChange={(e) =>
            {setUserId(e.target.value)}
            }/>
        <button onClick={SearchUserId}> Search </button>
        {displayUserIdSearchList.map((val) => {
          return (
            <div className = "card">
              <h5> userId: {val.user_id} </h5>              
              <p> username: {val.username} </p>
              <p> password: {val.password} </p>
              <p> phoneNumber: {val.phone_num} </p>
              <p> email: {val.email} </p>
              </div>
          );
          
          ;
        })}

        <label> Advanced Query: </label>

        <button onClick={advanced_query_button}> check </button>
        {
            advancedQueryList.map((val) =>{
                console.log(val);
                return (
                    <div className = "card">
                      <h5> userId: {val.user_id} </h5>              
                      <p> product_name: {val.product_name} </p>   
                      <p> Min product_p: {val.product_p} </p>
                      </div>
                  );
            })
        }



        <label> UserId: </label>
        <input type="text" name="user_id" onChange={(e) =>
            {setUserId(e.target.value)}
            }/>
        <label> Username: </label>

        <input type="text" name="username" onChange={(e) =>
          {setUserName(e.target.value)}
        }/>
        <label> Password: </label>
        <input type="text" name="password" onChange={(e) =>
          {setPassword(e.target.value)}
        }/>
        <label> Phone Number: </label>
        <input type="text" name="phone_num" onChange={(e) =>
          {setPhoneNumber(e.target.value)}
        }/>
        <label> Email: </label>
        <input type="text" name="email" onChange={(e) =>
          {setEmail(e.target.value)}
        }/>

        <button onClick={submitUser}> Submit </button>






        {userReviewList.map((val) => {
          return (
            <div className = "card">
              <h5> userId: {val.user_id} </h5>              
              <p> username: {val.username} </p>
              <p> password: {val.password} </p>
              <p> phoneNumber: {val.phone_num} </p>
              <p> email: {val.email} </p>

              
              <button onClick={() => { deleteUser(val.user_id) }}> Delete</button>
              
              <input type="text" id="newpassword" onChange={(e) => {
                //   console.log("lalalalalalaa"+e.target.value);
                    setNewPassword(e.target.value)

              } }/>


              <button onClick={() => {
                updatePassword(val.user_id)
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
