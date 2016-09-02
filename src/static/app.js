import React from 'react';

import { Navbar } from './components';
import './styles/main.scss';

class App extends React.Component {

    static propTypes = {
        children: React.PropTypes.object.isRequired
    };

    render() {
        return (
            <div className="app">
                <Navbar/>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
