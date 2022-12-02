import { useNavigate } from "react-router-dom";

function Board(props){
   var id = 0;
   var nme = localStorage.getItem("nme");
   nme = JSON.parse(nme);
   var cmt = localStorage.getItem("cmt");
   cmt = JSON.parse(cmt);
   let navigate = useNavigate();
   console.log(id) 
   return(
      <div>
         <div className="text-c pb"><span className="bayc ">Leave your comments about BAYC</span><br/></div>
         <table className="w100">
         <col width="20%"/><col width="70%"/><col width="10%"/>
         {
            nme.map(function(a,i){
               return(
                  <tr key={i}>
                     <th scope="row" className="fw-bold">{nme[i].name}</th>
                     <td>{cmt[i].comment}</td>
                     <td>
                        {
                           localStorage.getItem("login")===nme[i].name
                           ?
                              <button className="btn btn-danger" onClick={()=>{
                              if(window.confirm("Are you sure to delete this reply?")){
                              var rv = localStorage.getItem("cmt");
                              rv = JSON.parse(rv);
                              rv.splice(i,1);
                              localStorage.setItem("cmt", JSON.stringify(rv));
                              var rv2 = localStorage.getItem("nme");
                              rv2 = JSON.parse(rv2);
                              rv2.splice(i,1);
                              localStorage.setItem("nme", JSON.stringify(rv2));
                              window.alert("Deleted!"); //window.location.reload()
                              navigate("/detail/"+props.id)
                           }
                              }}>Delete</button>
                           : null
                        }
                     </td>
                  </tr>
               )
            })
         }
      </table><br/>
         <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">{localStorage.getItem("login")}</span>
            <input type="text" className="form-control" id="rep" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Reply comment"/>
               <button className="btn btn-warning text-r2" onClick={()=>{
                  
                  let rep = document.getElementById("rep").value;
                  let nme = {name : localStorage.getItem("login")};
                  let cmt = {comment : rep }
                  let out = localStorage.getItem("nme");
                  out = JSON.parse(out);
                  out.push(nme);
                  localStorage.setItem("nme", JSON.stringify(out));
                  
                  let out2 = localStorage.getItem("cmt");
                  out2 = JSON.parse(out2);
                  out2.push(cmt);
                  localStorage.setItem("cmt", JSON.stringify(out2));
                  
                  console.log(props.id+"test")
                  window.alert("Added!")

                  id++;
               }}>Reply</button>
         </div>
         
      </div>
   )
}

export default Board