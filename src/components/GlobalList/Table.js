import React from 'react';
import TableLayout from '../TableLayout';
import { Button } from 'components/BLComps';

export default class Table extends React.Component {
	render() {
		const { btns, search } = this.props;
		return (
			<div style={{ margin: '20px 0' }}>
				<div style={{ marginBottom: '10px' }}>
					{search}
					{btns &&
						btns.length > 0 &&
						btns.map(btn => (
							<Button key={btn.name} {...btn} style={{ marginRight: '10px' }}>
								{btn.name}
							</Button>
						))}
				</div>
				<TableLayout {...this.props} />
			</div>
		);
	}
}
