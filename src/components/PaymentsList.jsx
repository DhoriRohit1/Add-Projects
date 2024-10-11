
import React from 'react';

const PaymentsList = ({ payments, markPaymentAsPaid, deletePayment }) => {
  return (
    <div>
      <h2 className="text-primary">Payments List</h2>
      <ul className="list-group">
        {payments.map((payment) => (
          <li key={payment.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              Amount: ${payment.amount} - Status: {payment.status}
            </div>
            <div>
              <button
                className="btn btn-success m-1 px-4"
                onClick={() => markPaymentAsPaid(payment.id)}
                disabled={payment.status === 'paid'}
              >
                Paid  
              </button>
              <button
                className="btn btn-danger m-1"
                onClick={() => deletePayment(payment.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentsList;
