import Position from '../position/Position';

//接收一个字符串参数, 
//使用场景：粘贴板粘贴事件
var insertText = function (str, inAnchor=true, position) {
    if (inAnchor) {
        position = new Position();
    }else if(!position){
        console.error(`insertText need position param if you want change default position`);
    }
    var activeNode = position.activeNode;

    //<div><p>"text"</p></div> -> <div><p>"text"+"newText"</p></div>
    //这里可以进行性能优化
    if (activeNode instanceof Text) {
        let behindText = activeNode.splitText(position.offset);
        let newText = new Text(str);
        activeNode.parentNode.insertBefore(newText, behindText);
        position.setPosition(newText, newText.length);
        activeNode.parentNode.normalize();
    }
    //当指向一个空的div(初始文档)
    else if ((!activeNode.firstChild) && activeNode.className === 'Editor') {
        console.log('insertText to an empty document');
        let newDiv = document.createElement('div');
        let newP = document.createElement('p');
        let newText = new Text(str);
        newP.appendChild(newText);
        newDiv.appendChild(newP);
        activeNode.appendChild(newDiv);

        position.setPosition(newText, newText.length);
    }
    //当指向<div id="editor"><br></div>
    else if (activeNode.firstChild && activeNode.firstChild.tagName === 'BR') {
        let newDiv = document.createElement('div');
        let newP = document.createElement('p');
        let newText = document.createTextNode(str);
        newP.appendChild(newText);
        newDiv.appendChild(newP);
        activeNode.replaceChild(newDiv, activeNode.firstChild);
        position.setPosition(newText, newText.length);
    }
    else {
        console.error(`another situation appending: we are trying to append <wbr> to ${activeNode}`);
    }
}

export default insertText;