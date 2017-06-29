import * as React from 'react';
import './<%= pascalEntityName %>.css';

export default class <%= pascalEntityName %> extends React.Component {
  render() {
    return (
      <div className='<%= pascalEntityName %>'>
        <%= pascalEntityName %>
      </div>
    );
  }
}
