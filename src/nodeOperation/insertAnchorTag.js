import Position from '../position/Position';
import { act } from 'react-dom/test-utils';

//接收一个位置参数,<wbr>会被插入该位置
//<div><p>"text"</p></div> -> <div><p>"text"<wbr></p></div>
var insertAnchorTag = function () {
    var position = new Position();
    var activeNode = position.activeNode;
    //一般情况下，activeNode为Text
    if (activeNode instanceof Text) {
        console.log(activeNode, activeNode.wholeText);
        // //``code的情况
        // console.log(activeNode.wholeText.match(/.*`$/));
        
        // if(activeNode.wholeText.match(/.*``$/)){
        //     console.log('here--------------------------');
        //     activeNode.parentNode.insertAdjacentHTML('afterend', '<wbr>');
            
        // }
        
        if (activeNode.length === position.offset) {
            activeNode.parentNode.insertAdjacentHTML('beforeend', '<wbr>');
        } else {
            var behindText = activeNode.splitText(position.offset);
            var newTag = document.createElement('wbr');
            activeNode.parentNode.insertBefore(newTag, behindText);
        }

    }
    //当指向一个空的div(初始文档)
    //其实这里也可以什么也不做
    else if ((!activeNode.firstChild) && activeNode.className === 'Editor') {
        console.log('paste to an empty document');
        activeNode.insertAdjacentHTML('afterbegin', '<div><br><wbr></div>');
    }
    //当指向<div><br></div>
    else if (activeNode.firstChild && activeNode.firstChild.tagName === 'BR') {
        activeNode.insertAdjacentHTML('beforeend', '<wbr>');
    }
    //当鼠标定位指向<h1>"something"</h1>或<p>"something"</p>
    else if (activeNode.firstChild && activeNode.firstChild instanceof Text) {
        activeNode.insertAdjacentHTML('beforeend', '<wbr>');
        
    }
    else {
        console.log('now the error activeNode:', activeNode, position.offset, (window.getSelection()).anchorNode);
        console.error(`another situation appending: we are trying to append <wbr> to ${activeNode}`);
    }

}

export default insertAnchorTag;