import React from 'react'
import ProductCategoryRow from './ProductCategoryRow.js'
import ProductRow from './ProductRow.js'
class ProductTable extends React.Component {
    render() {
      let rows = [];
      let lastCategory = null;
      let self  = this
      this.props.products.forEach(function(product) {
        // 1没有这个产品 2有这个产品，但是库存为空，而我只要显示库存的
        if (product.name.indexOf(self.props.filterText) === -1 || (!product.stocked && self.props.inStockOnly)) {
          return;
        }
        if (product.category !== lastCategory) {
          rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
        }
        rows.push(<ProductRow product={product} key={product.name} />);
        lastCategory = product.category;
      });
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
  }
  export default ProductTable