export const initialState = {
    loading: true,
    error: '',
    productData: {
        products: []
    },
    addressData: [],
    pageNo: 0,
    showAddressPage: false,
    showCheckout: false
}

export const productReducer = (state, action) => {
    switch(action.type){
        case 'FETCH_SUCCESS':
            return{
                ...initialState,
                loading: false,
                error: '',
                productData: { ...action.payload, products: [...state?.productData?.products, ...action?.payload?.products]},
            }
        case 'FETCH_ERROR':
            return{
                loading: false,
                error: 'Something went wrong',
                productData: {}
            }
        case 'FETCH_SUCCESS_ADDRESS': 
        return {
            ...state,
            addressData: action.payload,
            showAddressPage: true,
            showCheckout: false
        }
        case 'LOADING': 
        return {
            ...state,
            loading: true,
        }
        case 'UPDATE_SELECTION':
            return {
                ...state,
                addressData: action.payload
            }
        case 'UPDATE_ADDRESS': 
        return {
            ...state,
            addressData: { ...state.addressData, billingAddressInfos: [...state.addressData.billingAddressInfos, action.payload.formData] }
        }
        case 'SHOW_CHECKOUT': 
            return {
                ...state,
                showAddressPage: false,
                showCheckout: true
            }
        case 'SHOW_PAGE_VIEW':
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state
    }
}