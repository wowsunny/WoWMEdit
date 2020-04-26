import turndownService from './options';

//接收一个string作为参数(应该为第一层DIV的innerHTML)，返回字符串类型的markdown语法单元。
var transToMD = function(str){
    if (typeof str != 'string') {
        console.error('transToMD append another case, the param:', str);
        return null;
    }

    var md = turndownService.turndown(str);
    console.log('md:', md);
    // console.log('-----------');
    // console.log('here', turndownService.turndown('<em><em>123</em></em>456'));
    // console.log('-----------');
    return md;
}

export default transToMD;