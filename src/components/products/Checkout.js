import React from 'react';
import Modal from 'react-modal';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const Checkout = (props) => {
    const { state, quantity, dispatch} = props;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [orderStatus, setOrderStatus] = React.useState('');
    const getPricing = (data) => {
        let price = 0;
        let index = 0;
        
        let Listdata = data.map((item) => {
            for(let key in quantity) {
                if(key == item.id) {
                    price = price + (item.price * quantity[key] - (item.price * quantity[key] * (item.discountPercentage / 100)));
                    return (
                    <ul>
                        <li>Item {index + 1} prince is: &#8377;{item.price * quantity[key]}</li>
                        <li>Item {index + 1} discount percent is: &#8377;{item.discountPercentage}%</li>
                        <li>After Dicounted prince is: &#8377;{(item.price * quantity[key] - (item.price * quantity[key] * (item.discountPercentage / 100)))}</li>
                    </ul>
                    )
                }
                index++;
            }
        })
        Listdata.push(<div className='final-price'>Final price of All Item: &#8377;{price}</div>)
        return Listdata;
        //setItemPrice(price);

    }

    const mockResponse = () => {
        // Generate a random number (0 or 1)
        const randomNumber = Math.floor(Math.random() * 2);
      
        // Simulate success or failure randomly
        if (randomNumber === 0) {
          return { success: true, message: "Order placed succesfully" };
        } else {
          return { success: false, message: "Order placement Failued" };
        }
      }
    const checkoutPrice = () => {
        let repsonse = mockResponse();
        setOrderStatus(repsonse.message);
        setIsOpen(true);
    }
   
    const showPricingDetails = () => {
        const objLength = Object.keys(quantity).length;
        return (
            <div className='checkout-wrapper'>
                <strong>Price of ({objLength} item{objLength > 1 && 's'})</strong>
                <div>{getPricing(state.productData.products)}</div>
                <button onClick={checkoutPrice}>Checkout</button>
            </div>
        )
    }
    return(
        <div className='pricing-wrapper'>
            <h2>Pricing Details</h2>
            {showPricingDetails()}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => {setIsOpen(!modalIsOpen)}}
                style={customStyles}
            >
                <button onClick={() => {
                    setIsOpen(!modalIsOpen)
                    window.location.reload();
                    }}>close</button>
                <h2>Order Status</h2>
                <p>{orderStatus}</p>
            </Modal>
        </div>
    )
}

export default Checkout;