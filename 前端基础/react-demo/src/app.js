import React from 'react'
import ReactDOM from 'react-dom'
import FilterableProductTable from './component/FilterableProductTable.js'
import PRODUCTS from './data/lib.js'


ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('app')
);
