import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {removeItem, addQuantity, subtractQuantity} from './actions/cartActions'

export class Cart extends Component{

    //to remove the item completely
    handleRemove = (id) => {
        this.props.removeItem(id);
    };
    //to add the quantity
    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    };
    //to subtract from the quantity
    handleSubtractQuantity = (item) => {
        if(item.quantity > 1) {
            this.props.subtractQuantity(item.id);
        }
    };

    //proceed to checkout
    proccedToCheckout = (total) => {
        if(total > 0){
            this.props.history.push('/checkout');
        }
    }
    render(){

        let addedItems = this.props.items.length ?
            (
                this.props.items.map(item=>{
                    return(

                        <li className="collection-item avatar" key={item.id}>
                            <div className="item-img">
                                <img src={item.image} alt={item.image}/>
                            </div>
                            <div className="item-desc">
                                <span className="title">{item.pizza_name}</span>
                                <p><b>Price: {item.price}</b></p>
                                <p>
                                    <b>Quantity: {item.quantity}</b>
                                </p>
                                <div className="add-remove">
                                    <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleAddQuantity(item.id)}}>arrow_drop_up</i></Link>
                                    <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleSubtractQuantity(item)}}>arrow_drop_down</i></Link>
                                </div>
                                <button className="waves-effect waves-light btn pink remove" onClick={()=>{this.handleRemove(item.id)}}>Remove</button>
                            </div>
                        </li    >
                    )
                })
            ):

            (
                <p>Nothing.</p>
            );

        let total = (this.props.totalAmount).toFixed(2);

        return(
            <div className="container">
                <div className="cart">
                    <h5>You have ordered:</h5>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                    <p>
                        <b>Total: ${total} </b>
                    </p>
                    <p>
                        {/* <Link to="/checkOut" className="btn btn-primary">Proceed to Checkout</Link> */}
                        <button className="btn btn-primary" onClick={()=>{this.proccedToCheckout(total)}}>Proceed to Checkout</button>
                    </p>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        items: state.addedItems,
        totalAmount: state.total
    }
};
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))},
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Cart)
