import Position from "../position/Position";

//接收一个位置参数和一个节点，节点格式：<div>"text"</div>, 可以通过inAnchor选择插入当前光标位置。
//但即便是当前光标位置，insertElement也会另起一行，如果希望插入当前行，请使用insertText
//再插入节点后，position将指向新节点的末端
//使用场景：粘贴板粘贴事件
var insertElement = function (newNode, inAnchor=true, position) {
    if(inAnchor){
        position = new Position();
    }
    //这里直接使用editor
    let editor = document.getElementById('editor');
    editor.childNodes.forEach((element)=>{
        if(element.contains(position.activeNode)){
            element.insertAdjacentElement('afterend', newNode);
            position.setPosition(newNode.lastChild, true);
            console.log('--------success');
            return true;
        }
    })
    return false;
}

export default insertElement;