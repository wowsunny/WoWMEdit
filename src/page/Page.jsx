import React from 'react';
import Editor from '../editor/Editor';
import './page.css'
class Page extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='Page'>
                <Editor/>
            </div>
        )
    }
}

export default Page;