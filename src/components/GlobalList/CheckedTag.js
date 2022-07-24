import React from 'react';
import Category from '../Category';

export default class CheckedTag extends React.Component {
	render() {
    const { dataSource } = this.props;
		return (
			dataSource.length > 0 && <Category
				{...this.props}
			/>
		);
  }
}
