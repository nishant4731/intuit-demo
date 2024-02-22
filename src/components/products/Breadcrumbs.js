import React from 'react';
import "./product.css";
const Breadcrumbs = (props) => {
    const { list, callback } = props;
    let listData = [];
    const showbreadCrumbs = () => {
        for (var key in list) {
            listData.push(<li className={list[key]['disabled'] ? 'disable' : 'active'}>&nbsp;<span onClick={callback.bind(this,key)}>{key}</span> /</li>);
        }
        return listData;
    }
    return(
        <ul className='breadcrumbs-wrapper'>{showbreadCrumbs()}</ul>
    )
}

export default Breadcrumbs;