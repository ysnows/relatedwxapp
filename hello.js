

var filepath = "/Users/ysnows/.vscode/extensions/relatedwxapp/index/index.wxml"
var lastindex = filepath.lastIndexOf('/')
var lastindexdot = filepath.lastIndexOf('.')
var filedir = filepath.substring(0, lastindex)
var filename = filepath.substring(lastindex+1, lastindexdot)