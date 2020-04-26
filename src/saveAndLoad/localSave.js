import getMDFile from '../turndown/getMDFile';

function localSave(){
    let data = getMDFile();
    let fs = window.fs;
    
    var path = 'D:/WORKSPACE/VSCode/electron/test.md';
    fs.writeFile(path, data, 'utf-8', function(err){
        if(!err){
            alert('success')
        }
    })
}

export default localSave;