
import textToNode from '../markdown/textToNode';
import transToMD from '../turndown/transToMD';


//接收一个经过diff算法标记过的DOMTree
//先将相应节点转换为markdown语法单元(turndown)
//再将其转换为Node(markdown)
var updataParseTree = function (DOMTree) {

    DOMTree.forEach(element => {
        if(element.firstChild.tagName === 'Iframe'){
            ;
        }
        else if (element.classList.contains('changed')) {

            let md = transToMD(element.innerHTML);
            let newDiv = element.cloneNode();
            if (element.classList.contains('focused')) {
                let newHTML;
                let arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
                newHTML = textToNode(md, true).replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
                    return arrEntities[t];
                });
                newDiv.innerHTML = newHTML;

                // newDiv.classList.remove('focused');
            }
            else {
                newDiv.classList.remove('changed');
                newDiv.innerHTML = textToNode(md);
            }
            element.parentNode.replaceChild(newDiv, element);
        }
    });


}

export default updataParseTree;