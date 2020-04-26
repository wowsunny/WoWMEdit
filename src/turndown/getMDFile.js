import transToMD from './transToMD';

var getMDFile = function(){
    var mdTree = [];
    var editor = document.getElementById('editor');
    var children = editor.children;

    for(let i=0; i<children.length; i++){
        console.log(children[i].innerHTML);
        
        let md = transToMD(children[i].innerHTML);
        mdTree.push(md);
    }
    console.log(mdTree);
    return mdTree
}

export default getMDFile;