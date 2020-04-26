import insertText from '../nodeOperation/insertText';
import Position from '../position/Position';
import localSave from '../saveAndLoad/localSave';
var position = new Position();

//接受editor中的事件，包括键盘输入事件，粘贴板粘贴事件，输入法输入事件。
//返回一个boolean值，指示是否发生了变化
var EventFilter = function () {
    //过滤粘贴操作
    this.isComposing = false;
    this.filter = function(event){
        console.log(event);
        if (event.type === 'paste') {
            //阻止事件继续传播以及默认事件的发生
            event.stopPropagation();
            event.preventDefault();
    
            var pasteData = event.clipboardData.getData('text');
            //若粘贴内容有效部分为空，结束粘贴行为
            if (!pasteData) {
                return false;
            }
            //将有效内容插入当前光标位置
            //目前有效内容为string。
            insertText(pasteData);
    
            return true;
        }
        else if (event.type === 'keydown') {
            //过滤输入法操作
            if(event.code === 'KeyS'&&event.ctrlKey === true){
                event.preventDefault();
                event.stopPropagation();
                localSave();
            }
            return false;
        }
        else if(event.type === 'keyup'){
            //覆写enter 
            if(event.code === 'ArrowLeft'||event.code === 'ArrowRight'
            ||event.code === 'ArrowUp'||event.code === 'ArrowDown'||event.code === 'Enter'){
                return true;
            }
            
            return false;
        }
        
        else if (event.type === 'compositionstart') {
            this.isComposing = true;
            return false;
        }
        else if (event.type === 'compositionend') {
            this.isComposing = false;
            return true;
        }
        else if(event.type === 'mouseup'){
            //若选中文本
            if(!window.getSelection().isCollapsed){
                return false;
            }
            return true;
        }
        console.error('another case append..., the new event:', event);
    }

}

export default EventFilter;     