import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav} from 'react-bootstrap';
import data from './data.js';
import Det from './routes/Det.js';
import { useState, useEffect } from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import axios from 'axios';
import Cart from './routes/Cart.js';
import VH from './ViewHeart.js';

function App() {

  useEffect(()=>{
    localStorage.setItem('basket', JSON.stringify([]))
  },[])
  
  localStorage.setItem("nme", JSON.stringify([{"name":"Runny"}, {"name":"3966 holder"}, {"name":"tobias"}, {"name":"Rachamadu"}, {"name":"Jeff goes"}]));
  localStorage.setItem("cmt", JSON.stringify([{"comment":"wow.. so expensive"}, {"comment":"hottest nft #3966..! "},{"comment":"Thank you, Master. it's very useful web XD"},{"comment":"bayc go to the moooooon 🌛"},{"comment":"This buying can be utilized in any framework while doing fetch and cleanup."}]));
  let [shoes, setShoes] = useState(data);
  let [cnt, setCnt] = useState(1);
  let [end, setEnd] = useState(true);
  let login = localStorage.getItem("login");
  let [loading, setLoading] = useState(false);
  return (
    <div className="App">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Nanum+Gothic&display=swap');
        </style>      
        <Navbar bg="dark" variant="dark">
          <Container>
            <Link to="/" className="bayc no fs-4">BAYC NFT SHOP</Link>
              <Nav className="me-auto"/>
              { !login ? <Login/>
                : <Navbar.Brand className=''>Welcome, {login}!&nbsp;&nbsp;
                { login && <Link to="/cart" className="no bayc">🛒</Link> }
                &nbsp;&nbsp;<button className="btn btn-info" onClick={()=>{
                    localStorage.removeItem("login");
                    localStorage.removeItem("basket");
                    alert("See you later :D"); window.location.reload();
                  }}>Log Out</button>
                </Navbar.Brand>
              }
          </Container>
        </Navbar>
        
        <VH/>
        <Routes>
          <Route path="/" element={
            <div>
            
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map(function(a,i, key){
                      return(<Card shoes={shoes[i]} key={i} i={i} login={login}/>)
                    })}
                </div>
              </div><br/>
              {
                loading === true && <Loading/>
              }
              {end===true?
              //axios 기능을 통하여 more 버튼 클릭시 추가적인 nft들을 리스팅함
                <button className="btn btn-primary" onClick={(()=>
                { 
                  setLoading(true);
                  setTimeout(()=>{
                    setLoading(false);
                  },1000)
                  if(cnt===1)
                  {
                  axios.get("https://0400j.github.io/data0.json")
                  .then((res)=>{
                    let copy = [...shoes, ...res.data];
                    setShoes(copy); setCnt(2);
                  })
                }else{
                  axios.get("https://0400j.github.io/data3.json")
                  .then((res)=>{
                    let copy = [...shoes, ...res.data];
                    setShoes(copy);
                    setEnd(false);
                  })
                }}
                
                )}>More</button>
                :null
              }
            </div>
            }/>

          <Route path="/detail/:id" element={
                <Det shoes={shoes} />
            }/>
            <Route path="/cart" element={<Cart/>}/>
        </Routes>
    </div>
  );
}
function Card(props){
  var [heart, heartChange] = useState(0);
  var nowHeart = localStorage.getItem("h"+props.shoes.id);
  return(
    <div className="col-md-4">
      <br/>
        <div className="card nn"  >
      <Link to={"./detail/"+props.i} heart={heart}>
          <img src={"./img/"+props.shoes.title+".avif"} className="card-img-top" alt="..."
          onClick={()=>{
            var view = localStorage.getItem("view"+props.shoes.id);
            localStorage.setItem("view"+props.shoes.id, parseInt(view)+1)
            }}/>
      </Link>
          <div className="card-body2">
          {
            // NFT가 판매되었을 경우에 나타낼 UI
             localStorage.getItem("sold") == props.shoes.title
             ? <table className='w100'>
                <tr><td><input type="text" className="text-c w100 h150" placeholder="SOLD OUT" disabled/></td></tr>
              </table>
              
              //NFT가 판매되지 않았을 경우에 나타낼 UI
             :
              <table><col width="60%"/><col width="40%"/>
              <tr>
                <td className="text-l">BAYC<img src="./img/Vmark.jpg" className='img-sm' alt=""/>
                </td>
                <td className="text-r">#{props.shoes.title}</td>
              </tr>
              <tr>
                <td className="text-l">👁‍🗨{localStorage.getItem("view"+props.shoes.id)} 
                {
                  //홀수번 누르면 하트가 빨간색이 되고, 짝수번 누르면 빈 하트가 된다
                  heart%2===0 
                  ? <span onClick={()=>{
                    if(!props.login){ alert("Login, first!"); return false; }
                    heartChange(heart+1);
                    localStorage.setItem("h"+props.shoes.id, parseInt(nowHeart)+1);
                    localStorage.setItem(props.login+"Pick", props.shoes.title);
                  }}>🤍</span>
                  : <span onClick={()=>{heartChange(heart-1);
                    localStorage.setItem("h"+props.shoes.id, parseInt(nowHeart)-1);
                  }}>❤</span>
                }{localStorage.getItem("h"+props.shoes.id)}
                </td>
                <td className="text-r"><img src={"./img/eth.png"} className="img-eth" alt=""/>{props.shoes.price}ETH</td></tr>
             </table>
          }
          </div>
        </div>
    </div>
  )
}

function Login(){
  return(
    <div>
      <input type="text" id="user_id"className="end input2" size="7"></input>&nbsp;
        <button className="end btn btn-success" onClick={()=>{
          var name = document.getElementById("user_id").value;
          if(name==='' || name===null){
            alert("Please check your id"); 
            return false; 
          }
          localStorage.setItem("login",name);
          localStorage.setItem(name+"Pick", 0);
          
          alert("It's good day, "+name+" :D");
          window.location.reload();
        }}>Login</button>
    </div>
  )
}

function Loading(){
  return(
    <div className='fn2'>
      Data is loading...
    </div>
  )
}
export default App;