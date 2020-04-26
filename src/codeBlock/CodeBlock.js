var transToMonaco = function () {
  // let code = document.querySelector('code[class*="language"]');
  let code = document.querySelector('code');
  console.log('---------------------------------------------', code);
  if (code) {
      let newP = document.createElement('p');
      newP.innerHTML = '<br>';
      newP.className = 'codeContainer';
      console.log(newP.attributes);

      code.parentElement.replaceChild(newP, code);
      monaco.editor.create(newP, {
          value: '',
          language: 'javascript',
      })
      
      newP.setAttribute('contenteditable', 'fasle');
      console.log(newP.attributes);
  }

}









// import React from 'react';
// import MonacoEditor from 'react-monaco-editor';

// class CodeBlock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       code: '// type your code...',
//     }
//   }
//   editorDidMount(editor, monaco) {
//     console.log('editorDidMount', editor);
//     editor.focus();
//   }
//   onChange(newValue, e) {
//     console.log('onChange', newValue, e);
//   }
//   render() {
//     const code = this.state.code;
//     const options = {
//       selectOnLineNumbers: true
//     };
//     return (
//       <div>
//         <MonacoEditor
//           width="800"
//           height="300"
//           language="javascript"
//           theme="vs-dark"
//           value={code}
//           options={options}
//           onChange={this.onChange}
//           editorDidMount={this.editorDidMount}
//         />
        
//       </div>

//     );
//   }
// }

// export default CodeBlock;