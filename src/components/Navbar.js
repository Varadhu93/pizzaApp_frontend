import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import {closeAddToCartModal} from "./actions/cartActions";
import {connect} from "react-redux";
import Modal from './Modal'

class Navbar extends Component {

    closeAddToCartModal = () => {
        this.props.closeAddToCartModal();
    };

    showNavbar = () => {
        return(
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo">Varadhu's Pizza Shop</Link>
                    <ul className="right">
                        <li><Link to="/">Pizza Shop</Link></li>
                        <li><Link to="/cart">My cart</Link></li>
                        <li><Link to="/orders">My orders</Link></li>
                        <li><Link to="/checkout"><i className="material-icons">shopping_cart</i></Link></li>
                    </ul>
                </div>
            </nav>
        )
    };
    render() {
        if(this.props.addToCartModalIsShowing === true) {
            return(
                <div>
                    {this.showNavbar()}
                    {
                        this.props.addToCartModalIsShowing ?
                            <div onClick={() => this.closeAddToCartModal()} className="back-drop"></div> : null
                    }
                    <Modal
                        className="modal"
                        show={this.props.addToCartModalIsShowing}
                        close={() => this.closeAddToCartModal()}>
                        Item has been added to cart successfully.
                    </Modal>
                </div>
            )
        }else{
            return (
                <div>
                    {this.showNavbar()}
                </div>
            )
        }
    }
}

const mapStateToProps = (state)=>{
    return {
        addToCartModalIsShowing: state.addToCartModalIsShowing
    }
};
const mapDispatchToProps= (dispatch)=>{

    return{
        closeAddToCartModal: () =>{dispatch(closeAddToCartModal())}
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
