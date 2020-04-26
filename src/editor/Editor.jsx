import React from 'react';
import './Editor.css';
import ParseTree from '../parseTree/ParseTree';

class Editor extends React.Component{
    constructor(props){
        super(props);
        this.editorRef = React.createRef();
        this.getData = props.getData;
    }
    componentDidMount(){
        this.parseTree = new ParseTree(this.editorRef);
    }

    handleChange = (event)=>{
        this.parseTree.updata(event);
    }
    
    render(){
        return(
            <div className='Editor' 
            id='editor'
            ref={this.editorRef} 
            contentEditable='true'
            onPaste = {this.handleChange.bind(this)}
            onCompositionStart = {this.handleChange.bind(this)}
            onCompositionEnd = {this.handleChange.bind(this)}
            onKeyDown = {this.handleChange.bind(this)}
            onKeyUp =  {this.handleChange.bind(this)}
            onMouseUp = {this.handleChange.bind(this)}
            >
            </div>
        )
    }
}

export default Editor;