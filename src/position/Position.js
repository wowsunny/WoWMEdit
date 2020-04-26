var Position = function(select=window.getSelection()){
    this.select=select;
    Object.defineProperty(this, 'activeNode', {
        get: function(){
            return window.getSelection().anchorNode;
        }
    })
    Object.defineProperty(this, 'offset', {
        get: function(){
            return window.getSelection().anchorOffset;
        }
    })
    //任意指定位置，转移光标
    this.setPosition = function(activeNode, offset=0, isTail=false){
        if(typeof offset == 'boolean'){
            isTail = offset;
        }
        if(isTail){
            select.collapse(activeNode, activeNode.length);
        }else{
            select.collapse(activeNode, offset);
        }
        
    }
}

export default Position;

/*
    this.setPosition = function(activeNode, offset = 0, setToEnd=false){
        //暂且将位置的设定同一在activeNode的前端(offset初始为零)
        if (setToEnd) {
            //假定，如果要求光标插入一个node的末尾，那么activeNode一定为Text类型
            if (activeNode instanceof Text) {
                range.setStart(activeNode, activeNode.length);
            }
            console.warn(`if the setPosition need to set {select} to the end of some node, 
            activeNode need to be Text, instead of ${activeNode.__proto__.toString()}`);
        }
        range.setStart(activeNode, offset);
    }
*/