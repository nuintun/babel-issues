import React from 'react';
import { Button } from 'antd';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return <Button>Button</Button>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
