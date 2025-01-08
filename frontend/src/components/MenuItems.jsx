
import { useDispatch, useSelector } from 'react-redux';

import AddBtnComponent from './AddBtn';
import { Link } from 'react-router-dom';


function MenuItems(props){
    const dispatch=useDispatch();
    const isEmail=useSelector((state)=>state.authReducer.isEmail)
    
    return(
        <Link to={`/menu/${props.data._id}`}>
            
        <div className="flex justify-center  h-[18rem] w-[540px] border-2 border-gray-300 p-2">
            <div className="w-[70%] text-[#3d081b] text-base relative p-4">
                <div className='border-2 border-gray-100 text-white bg-green-800 rounded-lg text-base text-center'></div>
                <div className="text-xl mt-3">{props.data.name} </div>
                <p className="font-light mt-2">{props.data.desc} </p>
                <div className="font-bold mt-5">${props.data.price}</div>
                <AddBtnComponent item={props.data._id}/>
                {/* <button onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    sendToFb(props.data._id)
                    }} className="border-2 border-gray-900 rounded-3xl p-3 text-base absolute bottom-1">Add to Order</button> */}
            </div>
            <div className="w-[30%] border-2 rounded-lg overflow-hidden">
                <img className="h-full .max-w-full " src={props.data.img} alt="" />
            </div>
        </div>
        
        </Link>
    )
}

export default MenuItems;