import React, { useState } from 'react';
import { states } from "./constants";
import "./product.css";

const Address = (props) => {
    const { data, dispatch, checkoutPageCallback } = props;
    const [addNewAddress, setAddNewAddress] = useState(false);
    const [formData, setFormData] = useState({
        active: true,
        addressLine1: "",
        addressLine2: "",
        city: "",
        creationSource: "PHYSICAL",
        id: "",
        isDefault: false,
        landmark: "",
        locationTypeTag: "Home",
        name: "",
        phone: "",
        pincode: "",
        state: "",
        alternatePhone: ""
    });

    const selectAddress = (id) => {
       
        dispatch({type: "UPDATE_SELECTION", payload: {...data, selectedAddressId: id}});
    }

    const showAddressList = () => {
        return data.billingAddressInfos.map((item) => {
            return (<div className='address-wrapper' onClick={selectAddress.bind(this,item.id)}>
                <li className={item.id === data.selectedAddressId ? 'active' : ''}>
                    <div className='address-info'>
                    <h3>{item.name}</h3>
                    <span>{item.locationTypeTag}</span>
                    <strong>{item.phone}</strong>
                    </div>
                </li>
                <p>{item.addressLine1},{item.addressLine2},{item.pincode}</p>
                <div className='deliver-wrap'> 
                    <button onClick={checkoutPageCallback}>Deliver here</button>
                </div>
            </div>)
        })
    }
    const getAllState = () => {
        return states.map((item) => {
            return <option value={item}>{item}</option>
        })
    }
    const formChange = (val, e) => {
        switch(val) {
            case 'NAME':
                formData.name = e.target.value;
                break;
            case "NUMBER":
                formData.phone = e.target.value;
                break;
            case "PINCODE":
                formData.pincode = e.target.value;
                break;
            case "LOCALITY":
                formData.addressLine2 = e.target.value;
                break;
            case "ADDRESS":
                formData.addressLine1 = e.target.value;
                break;
            case "CITY":
                formData.city = e.target.value;
                break;
            case "STATE":
                formData.state = e.target.value;
                break;
            case "LANDMARK":
                formData.landmark = e.target.value;
                break;
            case "ALTERNATE_NUMBER":
                formData.alternatePhone = e.target.value;
                break;
        }
    }
    const getNewAddress = () => {
        return (
            <form className='form_wrap'>
               <div className='input_wrap'>
                    <input type="text" class="inputText" onChange={formChange.bind(this, 'NAME')}/>
                    <label class="floating-label">Name</label>
                </div>
                <div className='input_wrap'>
                    <input type="text" class="inputText" onChange={formChange.bind(this, 'NUMBER')}/>
                    <label class="floating-label">10-digit mobile number</label>
                </div>
                <div className='input_wrap'>
                    <input type="text" class="inputText" onChange={formChange.bind(this, 'PINCODE')} />
                    <label class="floating-label">Pincode</label>
                </div>
                <div className='input_wrap'>
                    <input type="text" class="inputText" onChange={formChange.bind(this, 'LOCALITY')}/>
                    <label class="floating-label">Locality</label>
                </div>
                <div className='input_wrap'>
                    <textarea onChange={formChange.bind(this, 'ADDRESS')}/>
                    <label class="floating-label">Address</label>
                </div>
                <div className='input_wrap'>
                    <input type="text" class="inputText" onChange={formChange.bind(this, 'CITY')}/>
                    <label class="floating-label">City/Town/District</label>
                </div>
                <div class="select-style">
                <select onChange={formChange.bind(this, 'STATE')}>
                    <option value="" disabled selected>Select state</option>
                    {getAllState()}
                </select>
                </div>
                <div className='input_wrap'>
                    <input type="text" class="inputText" onChange={formChange.bind(this, 'LANDMARK')}/>
                    <label class="floating-label">Landmark(optional)</label>
                </div>
                <div className='input_wrap'>
                    <input type="text" class="inputText" onChange={formChange.bind(this, 'ALTERNATE_NUMBER')}/>
                    <label class="floating-label">Alternate Phone(optional)</label>
                </div>
                <div className='address-type'>
                    <label>Address type</label>
                    <ul>
                        <li className={formData.locationTypeTag === 'Home' ? 'active' : ''} onClick={() => {
                            formData.locationTypeTag = 'Home';
                            setFormData({...formData});
                            }}>Home</li>
                        <li className={formData.locationTypeTag === 'Work' ? 'active' : ''} onClick={() => {
                            formData.locationTypeTag = 'Work';
                            setFormData({...formData});
                            }}>Work</li>
                    </ul>
                </div>
                <div className='save-button-wrap'>
                <button onClick={() => {
                    formData.id = `${Math.random() * 10}`;
                    setFormData({...formData});
                    dispatch({type: "UPDATE_ADDRESS", payload: {formData}})
                    setAddNewAddress(!addNewAddress)
                }}>Save</button>
                </div>
            </form>
        )
    }
    return (
        <>
        <div>{showAddressList()}</div>
        <div className='add-new-address' onClick={() => {setAddNewAddress(!addNewAddress)}}><button>+ Add new address</button></div>
        {addNewAddress && getNewAddress()}
        </>
    )
}

export default Address;