import { useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { useState } from 'react';
import {Nav} from 'react-bootstrap'
import {addItem} from './../store.js'
import { useDispatch } from 'react-redux';
import Board from './Board.js'
function Det(props) {
   let dispatch = useDispatch();
   let [alert, setAlert] = useState(true);
   let count = 0;
   let [tab, setTab] = useState(0);
   useEffect(()=>{ setTimeout( ()=>{setAlert(false)}, 5000 ) },[count]);

   let {id} = useParams();
   let find = props.shoes.find(function(x){return x.id == id})
   console.log(props.shoes)
   let [expand, setExpand] = useState(false);
   const closeModal=()=>{setExpand(false);}

   var price = find.price*2850000;
   let login = localStorage.getItem("login");
   return(
   <div className="container pad10">
      
      <div className="row">
         {
            alert===true
            ?<div className="alert alert-warning">
            Register your email and Receive a "30%-OFF coupon"</div>
            : null
         }
         { expand===true && <Exp title={find.title} closeModal={closeModal}/>}
         <div className="col-md-6" >
            <img src={"../img/"+find.title+".avif"} width="50%" onClick={()=>{setExpand(true)}} alt=""/>
         </div>
         <div className="col-md-6">
            <table className='text-l '>
               <tr><td className='fw-bold blue bayc'>Bored Ape Yacht Club<img src={"../img/Vmark.jpg"} className="img-sm2" alt=""/></td></tr>
               <tr><td className="fw-light fs-1 bayc">#{find.title}</td></tr>
               <tr><td className="">👁‍🗨{localStorage.getItem("view"+find.id)} 
                     {
                        localStorage.getItem(login+"Pick") === find.title
                        ? <span>❤</span> : <span>🤍</span>
                     }
                     
                     {localStorage.getItem("h"+find.id)}
                  </td></tr>
               <tr className="height20"><td className="fs-sm">Current Price</td></tr>
               
               <tr><td><img src={"../img/eth.png"} className="img-eth2" alt=""/><span className="fs-3 bayc tpad">{find.price}</span> ( \{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} )</td></tr>
               <tr><td>
                  {
                     localStorage.getItem("fix"+find.id)!=='close'
                     ?<button className="btn btn-danger" onClick={()=>{
                        if(!login){window.alert("Please Login, first!");}
                        if(localStorage.getItem("fix"+find.id)!=='close'){
                           localStorage.setItem("fix"+find.id,"open");
                           let cart = localStorage.getItem("basket");
                           dispatch(addItem( {id:find.id, name:find.title, price:find.price} ));
                           cart = JSON.parse(cart);
                           cart.push({id:find.id, name:find.title, price:find.price});
                           cart = new Set(cart);
                           cart = Array.from(cart);
                           window.alert("Added to Cart!")
                           localStorage.setItem("basket", JSON.stringify(cart));
                        }
                        localStorage.setItem("fix"+find.id,'close');
                     }}>Add to Cart 🛒
                  </button>
                     :<button className="btn btn-secondary" disabled>Add to Cart 🛒</button>
                  }
                  </td></tr>
            </table>            
         </div>
         <Nav variant="tabs"  defaultActiveKey="link0">
            <Nav.Item>
               <Nav.Link onClick={()=>{setTab(0)}}eventKey="link0">🔊 Desc.</Nav.Link>
            </Nav.Item>
            <Nav.Item>
               <Nav.Link onClick={()=>{setTab(1)}}eventKey="link1">✏ Review</Nav.Link>
            </Nav.Item>
            <Nav.Item>
               <Nav.Link onClick={()=>{setTab(2)}}eventKey="link2">🎁 More</Nav.Link>
            </Nav.Item>
         </Nav>
      </div>
      <Tab tab={tab} id={find.id}/>
   </div>
   )
}

function Exp(props){
   var size = '';
   window.innerWidth <= 640 ? size = 'mobile' : size = 'pc'
   return(
      <div>
         <img src={"../img/"+props.title+".avif"} className={size}  onClick={props.closeModal} alt=""/>
      </div>
   )
}
function Tab({tab, id}){
   let [fade, setFade] = useState('');
   useEffect(()=>{
      setTimeout(()=>{ setFade('end') },200)
      return ()=>{ setFade('') } },[tab])//컴마뒤에 탭을 넣음으로써, 탭이 변할 시에 uE가 실행됨
   return (<div className={"text-l start " + fade}><br/>
      {[<Detail/>,<div><Board id={id}/></div>, <div><More/> </div>][tab]}
   </div>)
}

function Detail(){
   return (
      <table>
         <tr>
            <td><img src="../img/bayclogo.jpg" className="img3" alt=""/></td>
            <td>The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.BoredApeYachtClub.com for more details.</td>
         </tr>
      </table>
   )
}

function More(){
   return(      
      <div className='container'>
         <div className='float w50'>
         <span className='bayc'>Stay in the loop</span><br/>
                  Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating BAYC NFT SHOP.<br/>
                  
                  <table  className=' w100'>
                     <tr>
                        <td className=" text-l"><input className='input2 text-l w100' placeholder='Your email address' ></input></td>
                        <td className=" text-r"><button className='btn btn-info w100' onClick={()=>{alert("Sorry, we are under constructing")}}>Sign up</button></td>
                     </tr>
                  </table>
                  <span className='text-r'></span>
         </div>

         <div className='float w50 bayc'>JOIN COMMUNITY<br/><br/>
            <div class="card w20 float" onClick={()=>{window.location.replace("https://twitter.com/BoredApeYC")}}>
               <img src={"../img/twitter.png"} class="card-img-top" alt=""/>
            </div>
            <div class="card w20 float" onClick={()=>{window.location.replace("https://discord.com/invite/3P5K3dzgdB")}}>
               <img src={"../img/discord.jpg"} class="card-img-top" alt="..." />
            </div>
            <div class="card w20 float" onClick={()=>{window.location.replace("https://boredapeyachtclub.com/#/")}}>
               <img src={"../img/insta.png"} class="card-img-top" alt="..." />
            </div>
            <div class="card w20 float" onClick={()=>{window.location.replace("https://opensea.io/collection/boredapeyachtclub")}}>
               <img src={"../img/opensea.png"} class="card-img-top" alt="..." />
            </div>
            <div class="card w20 float" onClick={()=>{window.location.replace("https://www.youtube.com/channel/UCB6R9NAjkgxQi_QEkc4O25Q")}}>
               <img src={"../img/youtube.jpg"} class="card-img-top" alt="..." />
            </div>
            
         </div>
      </div>
   )
}
export default Det;