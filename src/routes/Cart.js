import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
   let state = useSelector((state)=>{return state});
   let cart = useSelector((state)=>{return state.cart2});
   let [count, setCount] = useState(0);
   var id = localStorage.getItem("login")

   let [modalOpen, setModalOpen] = useState(false);
   const closeModal=()=>{setModalOpen(false);}

   return (
      <div>
         <button onClick={()=>{setCount(count+1)}}>+</button>
         <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Nanum+Gothic&family=Plus+Jakarta+Sans:wght@200&family=Ubuntu:wght@300&display=swap" rel="stylesheet"></link>
         <h5 className='bayc text-uppercase'>{id}'s Cart</h5>
      <Table><col width="20%"/>
         <thead>
            <tr>
               <th>Image</th>
               <th>Number</th>
               <th>Price</th>
               <th>💰</th>
            </tr>
         </thead>
         <tbody>
            {
               localStorage.getItem("basket")
               ? state.cart2.map(function(a,i){
               var price = cart[i].price*2850000;
               return(
                  <tr key={i}>
                     <td><img src={"../img/"+cart[i].name+".avif"} className="cart-img" alt=""/></td>
                     <td>{cart[i].name}</td>
                     <td><span className='fw-bold'> {cart[i].price}ETH</span> ( \{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} )</td>
                     <td>
                     <button className='btn btn-primary' value='false' onClick={()=>{
                        if(window.confirm("Are you sure to buy BAYC NFT?")){

                           setModalOpen(true)
                           localStorage.setItem("sold", cart[i].name);
                           localStorage.removeItem("basket");
                           }
                        }
                     }
                     >Buy</button></td>
                  </tr>
                  )
               })
               : <tr><td colSpan={4} className="buy">Cart is empty</td></tr>
            }
         </tbody>
         {/* <Modal2 show={modalOpen}/> */}
      </Table>
      {
         modalOpen? <Modal3 cart={cart} closeModal={closeModal}/> : null
      }
      </div>
   )
}

function Modal3(props){
   console.log();
   return(
      <div>
          <div className='fn ht2'>
         <span className="buy fw-bold">Your purchase has processed!</span><hr/>
         <span className="buy gray">Woah! You just purchased</span> <span className='bayc'>BAYC #{props.cart[0].name}</span>.<br/>
         <span className="buy gray">It's been confirmed on the blockchain!</span><br/><br/>
         <img src={"../img/"+props.cart[0].name+".avif"} className="cart-img2" alt=""/><br/><br/>
         <table border="0" className='mg w80 ht3'><col width="50%"/><col width="50%"/>
            <tr className=' buy fw-bold'>
               <td>status</td><td>transaction Hash</td>
            </tr>
            <tr className=''>
               <td>✅ Complete</td><td className='ht fw-bold'>0x8E7...6238</td>
            </tr><tr><td>　</td></tr></table>
         <table className='mg w80'>
            <tr>
               <td><button className='btn btn-info' onClick={props.closeModal}>Close</button></td>
               <td><button className='btn btn-light'><Link to="/" className='no2'>Home</Link></button></td>
            </tr>
            <tr><td>　</td></tr>
         </table>
      </div>
      </div>
   )
}

export default Cart