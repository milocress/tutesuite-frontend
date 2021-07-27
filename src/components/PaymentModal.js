import { Component } from "react";
import { Modal } from "reactstrap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default class PaymentModal extends Component {
  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: this.props.money.toFixed(2),
          },
        },
      ],
    });
  }

  onApprove = (data, actions) => {
    this.props.api('clear_balance', {sid: this.props.sid})
    return actions.order.capture();
  }

  render() {
    return (
      this.props.money ? 
        <Modal isOpen={true}>
        <PayPalScriptProvider
          options={{"client-id": 'AbawBp9wAWuryEAt7W8fZv-4YcCWX00HBp-v7rmCQNVl_pxXeM08CWtmWp1qrLkwvv85oNvaXJpD_v4d'}}>
            <PayPalButtons createOrder={this.createOrder} onApprove={this.onApprove}/>
        </PayPalScriptProvider>
      </Modal> : null
    )
  }
}