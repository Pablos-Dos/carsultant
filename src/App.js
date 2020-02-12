import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './routes';
import CustomLayout from './containers/Layout';
import 'bootstrap';
// import 'antd/dist/antd.css'

class App extends Component {
    render() {
        return (

            <div className="App">
                {/*Router und Baserouter verarbeiten die Links*/}
                <Router>
                    <CustomLayout>
                        <BaseRouter />
                    </CustomLayout>
                </Router>


            </div>
        );
    }
}

export default App;