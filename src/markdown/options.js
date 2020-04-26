import marked from 'marked';
import './options.css';

var lexer = new marked.Lexer();

lexer.tokenizer.rules.table = /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/

// console.log(marked.parser(lexer.lex('|something|')));


var markdown = function (text) {
    
    var reg1 = /(?:(?<=\|)(.+?)(?=\|))/g;
    var tableArr1 = text.match(reg1);
    if (tableArr1 && tableArr1.length > 1) {
        text = text + "\n|";
        console.log(tableArr1.length, tableArr1);
        for (let i = 0; i < tableArr1.length; i++) {
            text = text + "---|";
        }
    }
    var reg2 = /^`{3}(.+)/;
    var tableArr2 = text.match(reg2);
    if(tableArr2){
        text = text+ "\n```";
        console.log(text);
    }

    let renderer = new marked.Renderer();
    renderer.em = function (text) {
        return `<em>${text}</em>`
    }
    renderer.code = function(code, language){
        return `<code class=language-${language}>${code}</code>`
    }

    return marked(text, { renderer: renderer });
}
//当焦点聚集时调用，阉割版
var halfMarkdown = function (text) {

    let renderer = new marked.Renderer();
    renderer.em = function (text) {
        return `*${text}*`;
    }
    renderer.strong = function (text) {
        return `**${text}**`;
    }
    renderer.codespan = function(text){
        return '`'+text+'`';
    }
    renderer.code = function(text){
        return '`'+text+'`';
    }
    return marked(text, { renderer: renderer });
}


export { markdown, halfMarkdown };