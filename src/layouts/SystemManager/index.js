import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('PublicStore')
@observer
class SystemLayout extends Component {
    render() {
        return this.props.children;
    }
}
export default SystemLayout;