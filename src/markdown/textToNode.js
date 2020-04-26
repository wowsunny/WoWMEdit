import {markdown, halfMarkdown} from './options';

//接收一个markdown语法单元，将markdown语法单元转换为innerHTML
//收到的参数应该是string类型，返回的是node类型
var textToNode = function(text, isFocused){
    
    if (typeof text != 'string') {
        console.error(`textToNode required a String as param instead of ${typeof text}`);
    
    }
    console.log(text, isFocused);
    
    if (isFocused) {
        console.warn('here');
        
        return halfMarkdown(text);
    }
    else{
        return markdown(text);
    }
}

export default textToNode;