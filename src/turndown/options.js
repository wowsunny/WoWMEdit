import TurndownService from 'turndown';

//避免转义。
TurndownService.prototype.escape = function(text){
    return text;
}

var turndownService = new TurndownService();

turndownService.addRule('wbr', {
    filter: 'wbr',
    replacement: function(content){
        return '<wbr>';
    }
})
turndownService.addRule('br', {
    filter: 'br',
    replacement: function(content){
        return '<br>';
    }
})

let tagArr = ['#','##','###','####','#####','######']
for(let i=1; i<=6; i++){
    turndownService.addRule(`h${i}`, {
        filter: `h${i}`,
        replacement: function(content){
            return tagArr[i-1]+' '+content;
        }
    })
}

turndownService.keep('table');
turndownService.addRule('em', {
    filter: 'em',
    replacement: function(content){
        return `*${content}*`;
    }
})
export default turndownService;