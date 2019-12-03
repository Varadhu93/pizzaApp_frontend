import React, { Component } from 'react';
import {getOrder} from './actions/cartActions'
import {connect} from "react-redux";

class Orders extends Component{

    componentDidMount = () => {
        let {email} = this.props.match.params;        
        this.props.getOrder(email);
    };

    render() {
   
        return(
            <div className="container">
                <h3 className="center">Orders</h3>
                <div className="box">
                <table className="table table-striped table-bordered table-sm">
                        <thead className ="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Ordered Items</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>   
                        <tbody>
                            {
                                this.props.orders.map(order => {                                                  
                                    return (
                                        <tr key={order.order_id}>
                                            <td>{order.order_id}</td>
                                            <td>{order.name}</td>
                                            <td>{order.email}</td>
                                            <td>{order.contact}</td>
                                            <td>{order.pizzas}</td>
                                            <td>${order.amount}</td>
                                        </tr>
                                    )
                                })
                            }    
                        </tbody>
                </table>
                </div>    
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
    }
};
const mapDispatchToProps = (dispatch) =>{

    return{      
        getOrder: (email) => {dispatch(getOrder(email))},    
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Orders)
