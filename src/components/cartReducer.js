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
} from './actions/action-types/cart-actions'

const initState = {
    items: [],
    addedItems:[],
    total: 0,
    addToCartModalIsShowing: false,
    shipping: [],
    redirect: false,
    orders: []
};
const cartReducer = (state = initState, action) => {

    if (action.type === ADD_SHIPPING) {
        return { ...state,
            //addedItems: [],
            //total: 0,
            shipping: action.payload,
            redirect: true
        }
    }

    if (action.type === GET_ALL_PIZZAS) {
        return { ...state, items: action.payload, redirect: false}
    }

    if (action.type === OPEN_ADD_TO_CART_MODAL) {
        return { ...state, addToCartModalIsShowing: true}
    }

    if (action.type === CLOSE_ADD_TO_CART_MODAL) {
        return { ...state, addToCartModalIsShowing: false}
    }

    if (action.type === GET_ORDERS) {
        return { ...state, addedItems: [], total: 0, orders: action.payload, redirect: false}
    }

    //INSIDE HOME COMPONENT
    if (action.type === ADD_TO_CART) {
        let existedItem = state.addedItems.find(item => action.id === item.id);
        let isExist = false;
        let addedItem = {};
        if (existedItem) {
            isExist = true;
            addedItem = existedItem;
        } else {
            isExist = false;
            addedItem = state.items.find(item => item.id === action.id);
        }

        let addedItems = updateAddedItems(state.addedItems, addedItem, isExist);
        return {
            ...state,
            addedItems: addedItems,
            total: getTotal(addedItems)
        };

    }
    if (action.type === REMOVE_ITEM) {
        let afterRemoveAddedItems = state.addedItems.filter(item => action.id !== item.id);
        return {
            ...state,
            addedItems: afterRemoveAddedItems,
            total: getTotal(afterRemoveAddedItems)
        }
    }
    //INSIDE CART COMPONENT
    if (action.type === ADD_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id);
        let addedItems = updateAddedItems(state.addedItems, addedItem, true);
        return {
            ...state,
            addedItems: addedItems,
            total: getTotal(addedItems)
        }
    }

    if (action.type === SUB_QUANTITY) {
        let subItem = state.addedItems.find(item => item.id === action.id);
        let addedItems = [];
        if (subItem.quantity <= 1) {
            return { ...state };
        } else {
            addedItems = state.addedItems.map(item => {
                if (subItem.id === item.id) {
                    item.quantity--;
                }
                return item;
            });
        }
        return {
            ...state,
            addedItems: addedItems,
            total: getTotal(addedItems)
        };
    }
    return state
};

const getTotal = (listOfItems) => {
    let total = 0;
    for (let i = 0; i < listOfItems.length; i++) {
        total = total + parseFloat(listOfItems[i].price.replace("$", "")) * listOfItems[i].quantity;
    }
    return total;
};

const updateAddedItems = (addedItems, addedItem, isExist) => {
    if (isExist) {
        addedItem.quantity = addedItem.quantity + 1;
        for(let i = 0; i < addedItems.length; i++) {
            if (addedItems[i].id === addedItem.id) {
                addedItems[i] = addedItem;
            }
        }
    } else {
        addedItem.quantity = 1;
        addedItems.push(addedItem);
    }

    return addedItems;
}


export default cartReducer
