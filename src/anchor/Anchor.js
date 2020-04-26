import Position from '../position/Position';
import insertAnchorTag from '../nodeOperation/insertAnchorTag';

var Anchor = function () {
    var position = new Position();
    //读取wbr标签，将光标移到该位置，并删除该标签
    this.readTag = function () {
        var wbr = document.querySelector('wbr');
        
        
        if(wbr){
            position.setPosition(wbr);
            var parentNode = wbr.parentNode
            parentNode.removeChild(wbr);
            parentNode.normalize();
            console.log('after normallize, the activeNode:', parentNode.childNodes);
            
            return true;
        }
        else{
            // let isEnd = false;
            // var codes = document.querySelectorAll('code');
            // console.log('-------------', codes);
            // codes.forEach((e)=>{
            //     var index;
            //     var newHTML = e.innerHTML.replace(/.*&lt;wbr&gt;.*/, (value, i)=>{
            //         console.log('----------', value);
            //         index = i;
            //         isEnd = true;
            //         return '';
            //     })
            //     if (isEnd) {
            //         e.innerHTML = newHTML;
            //         position.setPosition(e.firstChild, index);
            //         return true;
            //     }
            // })
            console.warn('miss the anchor tag');
            return false;
        }
    }
    //将wbr标签插入当前光标位置
    this.insertTag = function(){
        insertAnchorTag();
    }
}

export default Anchor;