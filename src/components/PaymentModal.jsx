import React from "react";
import { Modal } from "reactstrap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaymentModal({ money, api, sid }) {
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: money.toFixed(2),
          },
        },
      ],
    });
  }

  const onApprove = (data, actions) => {
    api('clear_balance', { sid })
    return actions.order.capture();
  }

  return (
    money ? 
      <Modal isOpen={true}>
      <PayPalScriptProvider
        options={{"client-id": 'AbawBp9wAWuryEAt7W8fZv-4YcCWX00HBp-v7rmCQNVl_pxXeM08CWtmWp1qrLkwvv85oNvaXJpD_v4d'}}>
          <PayPalButtons createOrder={createOrder} onApprove={onApprove}/>
      </PayPalScriptProvider>
    </Modal> : null
  )
}