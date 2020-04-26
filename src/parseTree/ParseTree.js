import diff from '../diff/diff';
import EventFilter from '../eventFilter/EventFilter';
import Anchor from '../anchor/Anchor';
import formatParseTree from './formatParseTree';
import updataParseTree from './updataParseTree';


var ParseTree = function (ref) {
    this.init = function () {
        console.log('PsTree initing...');
        this.parseTree = [];
        Object.defineProperty(this, 'length', {
            get: function () {
                return this.parseTree.length;
            },
            set: function () {
                console.error('length of ParseTree should be changed by updata function inside of assign directly');
            }
        });
        this.editorRef = ref;
        this.anchor = new Anchor();
        this.eventFilter = new EventFilter();
        initEditor.call(this);
    }
    this.destroy = function () {
        console.log('PsTree destroying...');
        this.parseTree = null;
    }
    this.updata = function (e) {
        console.log('PsTree updataing...');
        var DOMTree = this.editorRef.current.childNodes;
        var event = e.nativeEvent;

        //若事件过滤器判断不需要执行更新，则返回
        //事件过滤器执行完后，内容已经被插入到文档中
        if (!this.eventFilter.filter(event)) {
            return false;
        }

        // console.log('begin to updata the PsTree', event);

        //在更新前记录光标位置
        this.anchor.insertTag();

        //格式化当前文档
        formatParseTree(this.editorRef);

        //针对插入后的文档进行剪枝标记,标记发生在DOMTree之上
        diff(DOMTree, this.parseTree);

        //根据标记解析更新PsTree
        updataParseTree(DOMTree);

        //更新完后恢复光标位置
        this.anchor.readTag();

    }

    var initEditor = function () {
        var editor = this.editorRef.current;
        var newDiv = document.createElement('div');
        newDiv.innerHTML = '<p><br></p>';
        editor.appendChild(newDiv);
        editor.focus();
    }

    this.init.bind(this)();
}


export default ParseTree;