import React, { useReducer, useEffect, useState } from "react";
import { initialState, productReducer } from "./productReducer";
import Address from "./Address";
import Checkout from "./Checkout";
import addressData from './address.json';
import Breadcrumbs from "./Breadcrumbs";
import "./product.css";

const Products = () => {
    const [state, dispatch] = useReducer(productReducer, initialState);
    const [quantity, setQuantity] = useState({});
    const [breadCrumbsList, setbreadCrumbsList] = useState({
        products: {
            disabled: false
        },
        address: {
            disabled: true
        },
        checkout: {
            disabled: true
        }
    });

    useEffect(() => {
        fetchProductList(state.pageNo)
    },[])
    const fetchProductList = async (pageNo = 0) => {
        dispatch({type: 'LOADING'})
        const data = await fetch(`https://dummyjson.com/products?limit=9&skip=${pageNo * 9}`);
        const response = await data.json();
        dispatch({type: 'FETCH_SUCCESS', payload: response})
    }
    const addCart = (id) => {
        if(id in quantity) {
            quantity[id] = (quantity[id]+1);
        } else {
            quantity[id] = 1;
        }
        setQuantity({
            ...quantity
        })
    }
    const loadMore = () => {
        fetchProductList(state.pageNo + 1);
    }
    const loadAddress =  () => {
        const data =  addressData;
        dispatch({type: 'FETCH_SUCCESS_ADDRESS', payload: data.addressData})
        setbreadCrumbsList({
            products: {
                disabled: false
            },
            address: {
                disabled: false
            },
            checkout: {
                disabled: true
            }
        })
    }
    const toggleQuantity = (type, id) => {
        if(type === 'INCREASE') {
            if(id in quantity) {
                quantity[id] = (quantity[id]+1);
            }
        } else if(type === 'DECEREASE') {
            if(id in quantity && quantity[id] > 1) {
                quantity[id] = (quantity[id]-1);
            } else if (id in quantity && quantity[id] === 1) {
                delete quantity[id];
            }
        }
        setQuantity({
            ...quantity
        })
    }
    useEffect(() => {
        if(Object.keys(quantity).length === 0 && quantity.constructor === Object) {
            setbreadCrumbsList({
                products: {
                    disabled: true
                },
                address: {
                    disabled: true
                },
                checkout: {
                    disabled: true
                }
            })
        }
    }, [quantity])
    const showProductList = (data) => {
        return data.map((val) => {
            return (
                <li key={val.id} className={quantity.hasOwnProperty(val.id) ? 'active list-box' : 'list-box'}>
                    <div>
                    <div className="img-wrapper"><img src={`${val.images[0]}`}/></div>
                    <h3>{val.title}</h3>
                    <p>{val.description}</p> 
                    <span>&#8377; {val.price}</span> 
                    </div>
                    <div className="cart-wrapper">
                        {quantity[val.id] ? <div className="quantity-wrapper"><button onClick={toggleQuantity.bind(this, 'DECEREASE', val.id)}>-</button>{quantity[val.id]}<button onClick={toggleQuantity.bind(this, 'INCREASE', val.id)}>+</button></div> : <button className="cart-button" onClick={addCart.bind(this, val.id)}>Add to cart</button>}
                    </div> 
                </li>
            )
        })
    }
    const showPageView = (val) => {
        let payload = {}
        if(val === 'address') {
            payload.showAddressPage= true;
            payload.showCheckout = false;
        } else if(val === 'checkout') {
            payload.showAddressPage= false;
            payload.showCheckout = true;
        } else {
            payload.showAddressPage= false;
            payload.showCheckout = false;
        }
        dispatch({type: "SHOW_PAGE_VIEW", payload: payload})
    }
    return (
    <>
    <div className="button-wrapper">
        <h3>{state.showAddressPage ? 'Delivery address' : state.showCheckout ? 'Checkout' : 'Product List'}</h3>
        {!state.showAddressPage && !state.showCheckout && <button className={Object.keys(quantity).length === 0 && quantity.constructor === Object && 'disabled'} onClick={loadAddress}>Continue</button>}
        </div>
    <Breadcrumbs list={breadCrumbsList} callback={showPageView}/>
    {!state.showAddressPage && !state.showCheckout && <ul className="list-container">
        {showProductList(state.productData.products)}
    </ul>}
    {state.showAddressPage && !state.showCheckout && <Address data={state.addressData} dispatch={dispatch} checkoutPageCallback={() => {
        dispatch({type: "SHOW_CHECKOUT"})
        setbreadCrumbsList({
            products: {
                disabled: false
            },
            address: {
                disabled: false
            },
            checkout: {
                disabled: false
            }
        })
    }}/>}
    {state.showCheckout && <Checkout state={state} quantity={quantity} dispatch={dispatch}/>}
    {state.loading ? <div className="loader-wrap"><span className="loader"></span></div> : ''}
    {!state.loading && !state.showAddressPage &&  !state.showCheckout && <button className="load-more" onClick={loadMore}>Load more</button>}
    </>
    )
}

export default Products;