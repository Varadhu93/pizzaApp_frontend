import {
    ADD_TO_CART,
    REMOVE_ITEM,
    SUB_QUANTITY,
    ADD_QUANTITY,
    GET_ALL_PIZZAS,
    OPEN_ADD_TO_CART_MODAL,
    CLOSE_ADD_TO_CART_MODAL,
    ADD_SHIPPING,
    GET_ORDERS
} from './action-types/cart-actions'
import axios from "axios";

const API_URL = "http://pizza_app.test:3000";

export const getOrder = (email) => async dispatch => {
   const response = await axios.get(API_URL + '/orders/?email=' +email);
   dispatch({type: GET_ORDERS, payload: response.data})
};

export const getAllPizzas = () => async dispatch => {
    const response = await axios.get(API_URL + '/home');
    dispatch({type: GET_ALL_PIZZAS, payload: response.data})
};

export const addShipping = (data) => async dispatch => {

    await axios.post(API_URL + '/order', {
        name: data.name,
        email: data.email,
        contact: data.contact,
        address: data.address,
        pizzas: data.pizzas,
        amount: data.amount
    }).then(response =>{
        console.log('');
    }).catch(error =>{
        console.log(error);
    });
    dispatch({type: ADD_SHIPPING})
}

//add cart action
export const addToCart = (id) =>{
    return{
        type: ADD_TO_CART,
        id
    }
};
//remove item action
export const removeItem= (id) =>{
    return{
        type: REMOVE_ITEM,
        id
    }
};
//subtract qt action
export const subtractQuantity= (id) =>{
    return{
        type: SUB_QUANTITY,
        id
    }
};
//add qt action
export const addQuantity= (id) =>{
    return{
        type: ADD_QUANTITY,
        id
    }
};

export const openAddToCartModal= () =>{
    return{
        type: OPEN_ADD_TO_CART_MODAL
    }
};


export const closeAddToCartModal= () =>{
    return{
        type: CLOSE_ADD_TO_CART_MODAL
    }
};

