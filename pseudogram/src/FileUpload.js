import React, { Component} from 'react';

class FileUpload extends Component {
  constructor () { //LLAMA METODO CONSTRUCTOR
    super(); //LLAMA AL CONSTRUCTOR DE Component
    this.state = { //ESTADO POR DEFECTO 0
      uploadValue: 0,
    };
  }

  render () {
    return (
      <div>
        <progress value={this.state.uploadValue} max="100"></progress>
        <br/>
        <input type="file" onChange={ this.props.onUpload }/>
      </div>
    );
  }
}


export default FileUpload;
