import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addShipping } from "./actions/cartActions";
import { Redirect } from 'react-router-dom';

class Checkout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {}
        }
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["name"] = "Only letters";
            }
        }

        //Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        //Contact
        if(!fields["contact"]){
            formIsValid = false;
            errors["contact"] = "Cannot be empty";
        }

        if (typeof fields["contact"] !== "undefined") {
            if (!fields["contact"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["contact"] = "Only numbers";
            }
       
            if(fields["contact"].length !== 10){
                formIsValid = false;
                errors["contact"] = "Not a valid number";
            }
        }

        //Address
        if(!fields["address"]){
            formIsValid = false;
            errors["address"] = "Cannot be empty";
        }

        if (typeof fields["address"] !== "undefined") {
            if (!fields["address"].match(/^[a-zA-Z0-9\W]+$/)) {
                formIsValid = false;
                errors["address"] = "Provide a proper address";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }
    submitData = (e) => {

        e.preventDefault();

        if (this.handleValidation()) {

            const name = this.getName.value;
            const email = this.getEmail.value;
            const contact = this.getContact.value;
            const address = this.getAddress.value;
            let items = [];
            this.props.addedItems.map(pizza =>{
                items.push(`${pizza.pizza_name}`);
            })
            let pizzas = items.join();
            const amount = (this.props.totalAmount).toFixed(2);
            const data = {
                id: new Date(),
                name,
                email,
                contact,
                address,
                pizzas,
                amount
            };
            this.props.addShipping(data);           
        } 
    };

    render() {

        if (this.props.redirect === false) {

            let total = (this.props.totalAmount).toFixed(2);

            return (
                <form onSubmit={this.submitData}>
                    <div className="container">
                        <div className="collection">
                            <ul className="collection-item">
                                <label>
                                    Name:
                                    <input type="text" name="name" placeholder="Name"
                                        ref={(input) => this.getName = input} onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]} />
                                    <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                </label>
                            </ul>
                            <ul className="collection-item">
                                <label>
                                    Email Id:
                                    <input type="text" name="email" placeholder="Email id"
                                        ref={(input) => this.getEmail = input} onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} />
                                        <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                </label>
                            </ul>
                            <ul className="collection-item">
                                <label>
                                    Contact:
                                    <input type="text" name="contact" placeholder="Contact"
                                        ref={(input) => this.getContact = input}  onChange={this.handleChange.bind(this, "contact")} value={this.state.fields["contact"]} />
                                        <span style={{ color: "red" }}>{this.state.errors["contact"]}</span>
                                </label>
                            </ul>
                            <ul className="collection-item">
                                <label>
                                    Address:
                                    <textarea name="address" placeholder="Address"
                                        ref={(input) => this.getAddress = input} onChange={this.handleChange.bind(this, "address")} value={this.state.fields["address"]}
                                    />
                                    <span style={{ color: "red" }}>{this.state.errors["address"]}</span>
                                </label>
                            </ul>
                            <ul className="collection-item">
                                <b>Total: ${total}</b>
                            </ul>
                        </div>
                        <div className="checkout">
                            <button className="waves-effect waves-light btn" type="submit">Order</button>
                        </div>
                    </div>
                </form>
            )
        } else if (this.props.redirect === true) {
            return (
                <Redirect to={`/orders/${this.getEmail.value}`} />
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        totalAmount: state.total,
        redirect: state.redirect
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addShipping: (data) => { dispatch(addShipping(data)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
