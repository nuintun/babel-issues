import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';

class App extends React.Component {
  render() {
    return <Button>SUBMIT</Button>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
