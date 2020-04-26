import Position from '../position/Position';

var diff = function(DOMTree, oldPsTree){
    // var position = new Position();
    DOMTree.forEach((element, index) => {
        // element.classList.remove('changed');
        element.classList.remove('focused');
        //是否包含焦点，若是则不进行转换
        if(element.contains(document.querySelector('wbr'))){
            setFocusTag(element);
        }else{

        }
        if(compareNode(element, oldPsTree[index])){
            setChangedTag(element);
            oldPsTree[index] = element.cloneNode(true);
        }

    });

}
//若两节点相同返回false，不同则返回true
var compareNode = function(DOMNode, PSNode){
    if (PSNode && DOMNode.innerHTML === PSNode.innerHTML) {
        return false;
    }
    return true;
}

var setChangedTag = function(oldDiv){
    oldDiv.classList.add('changed');
}

var setFocusTag = function(oldDiv){
    oldDiv.classList.add('focused');
}

export default diff;