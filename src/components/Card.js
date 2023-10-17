import React,{useState,useRef,useEffect} from 'react';
// import img1 from "../images/img1.jpeg"
import {useCart,useDispatchCart} from "./ContextReducer";
const Card = (props) => {
    let dispatch = useDispatchCart();
    let data = useCart();

    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const foodItem = props.foodItems;

    const[qty, setQty] = useState(1);
    const[size, setSize] = useState("");
    const handleAddToCart = async () => {

      let food = []
      for(const item of data) {
        if(item.id === foodItem._id) {
          food = item;
          break;
      }

    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
    
        await dispatch({type : "ADD", id : foodItem._id, name : foodItem.name, price : finalPrice, qty: qty, size : size, img : foodItem.img})
        return
      }
        // console.log(data);
       return
    }
    await dispatch({type : "ADD", id : foodItem._id, name : foodItem.name, price : finalPrice, qty: qty, size : size, img : foodItem.img})
  }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
      setSize(priceRef.current.value)
    },[])
  return (
    <>
      <div>
      <div className="card mt-3 mx-3" style={{"width" : "18rem", "backgroundColor" : "#2D2D2D","color":"#fff","maxHeight" : "360px"}}>
          <img src={foodItem.img} className="card-img-top" alt="..."  style={{height : "150px", objectFit : "fill"}}/>
          <div className="card-body">
            <h5 className="card-title">{foodItem.name}</h5>
            
            <div className="container w-100"> 
              <select className="m-2 h-100  bg-success rounded text-white fw-semibold" style={{"border" : "none","outline" : "none"}} onChange = {(e) => setQty(e.target.value)}>
                {
                  Array.from(Array(6), (e, i) => {
                    return(
                      <option key={i+1} value={i+1}> {i+1} </option>
                    )
                  })
                }
              </select>
                <select className="m-2 h-100 bg-success rounded text-white fw-semibold" ref = {priceRef} style={{"border" : "none","outline" : "none"}} onChange = {(e) => setSize(e.target.value)}>
                   {
                    priceOptions.map(data => {
                      return(
                        <option key={data} value={data}>{data}</option>
                      )
                    })
                   }
                </select>
                <div className="d-inline fs-5">{finalPrice}/-</div>
            </div>
            <hr></hr>
            <button className='btn bg-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card;
