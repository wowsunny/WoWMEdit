var formatNode = function (e) {
    /*
    * 期望收到的参数是editor的直接子节点
    * 可能出现的情况：
    * <br>
    * "text"
    * <p><br></p>
    * <div><p>"text"</p></div>(正常情况)
    * <div><p>"text"<wbr></p></div>
    * <div><p>"text"</p> <p>"text"</p> <p>"text"</p></div>
    * ...
    */
    
    if (e instanceof Text) {
        let newP = document.createElement('p');
        let newDiv = document.createElement('div');
        newP.appendChild(e.cloneNode(true));
        newDiv.appendChild(newP);

        e.parentNode.replaceChild(newDiv, e);
        return;
    }
    else if (e.tagName === 'WBR') {
        let newDiv = document.createElement('div');
        newDiv.appendChild(e.cloneNode(true));

        e.parentNode.replaceChild(newDiv, e);
        return;
    }
    else if (e.tagName === 'P') {
        let newDiv = document.createElement('div');
        newDiv.appendChild(e.cloneNode(true));
        e.parentNode.replaceChild(newDiv, e);
        return;
    }
    else if (e.tagName === 'BR') {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = '<p><br></p>';
        e.parentNode.replaceChild(newDiv, e);
        return;
    }
    else if (e.tagName === 'DIV') {
        if (!e.firstChild) {
            e.parentNode.removeChild(e);
        }
        //处理<div><br><wbr></div>的特殊情况
        else if (e.firstChild.tagName === 'BR') {
            let newDiv = document.createElement('div');
            newDiv.innerHTML = `<p>${e.innerHTML}</p>`;
            e.parentNode.replaceChild(newDiv, e);
            return;
        }
        //处理<div>"text"</div> -> <div><p>"text"</p></div>
        else if (e.firstChild instanceof Text) {
            // console.log('get <div>"text"</div>');
            let newDiv = document.createElement('div');
            newDiv.innerHTML = '<p>' + e.innerHTML + '</p>';
            e.parentNode.replaceChild(newDiv, e);
            // console.log('after format, newDiv.parent:', newDiv);
            return;
        }
        else if (e.firstChild.tagName && e.firstChild.tagName == 'BR') {
            return;
        }
        //一个div中包含多个子节点
        else if (e.childNodes.length > 1) {
            console.log('发现包含多个子节点的Div', e.childNodes);
            e.childNodes.forEach(element => {
                console.log(element);

            });
            e.childNodes.forEach((element, index) => {
                //只考虑单层嵌套,第一个子节点保留
                if (index === 0) {
                    // console.log('pass the first child', element);
                }
                //冗余子节点的有效的信息单列一个div
                //<div>"test"''</div>             
                else if (element instanceof Text && /\w/.test(element.wholeText)) {
                    // console.log('将有效test单独列出：', element);

                    let newDiv = document.createElement('div');
                    newDiv.appendChild(element);
                    e.removeChild(element);
                    e.parentNode.insertAfter(e, newDiv);
                }
                //<div><h1></h1><p></p></div>  ->  <div><h1></h1></div> <div><p></p></div>
                else if (element instanceof Element&& element.tagName!=='WBR') {
                    console.log('存在element子节点', element);
                    let newDiv = document.createElement('div');
                    newDiv.appendChild(element);
                    e.insertAdjacentElement('afterend', newDiv);
                    console.log(e.parentNode.childNodes);


                }
            });
            return;
        }
        else {
            //普通div
            // console.log('普通div', e);

            return;
        }
    }
    console.error('another case append...', e.tagName, e, e.parentNode);

}
var formatParseTree = function (editorRef) {
    editorRef.current.childNodes.forEach(element => {
        formatNode(element);
    });
    console.log('the psTree has been formated');

}

export default formatParseTree;