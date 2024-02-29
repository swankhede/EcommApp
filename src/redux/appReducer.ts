
import {STORE_PRODUCTS_SUCCESS } from './actions';


const initialState={}

const appReducer=(state=initialState,action:any)=>{
    console.log("action:===>",action.type,action.payload);
    switch(action.type){
        case STORE_PRODUCTS_SUCCESS:return {
            ...action.payload
        }
     
        default:return initialState
    }
}

export default appReducer