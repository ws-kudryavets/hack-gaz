import React, { Component } from 'react';
import './Regist.css';
import { connect } from 'react-redux';
import { getToken } from '../../utils/localStorage';
import Header from '../Header';


import RegistForm from './registForm';

import { regist } from '../../actions/userAction';

class Regist extends Component {
    componentWillMount() {
        if (getToken()) { this.props.history.replace('/'); }
    }

    onSubmit = formValues => this.props.regist(formValues)
        .then(() => {
            if (getToken()) { this.props.history.replace('/'); }
        });

    render() {
        return (
            <div>
                <Header />
                <div className="center">
                    <div className="card">
                        <div>
                            <h3>Registration</h3>
                            <RegistForm onSubmit={this.onSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { regist }
)(Regist);

