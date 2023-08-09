function parseCommand(cmd) {
    if (typeof (cmd) != "string") throw Error("非文本对象");
    // console.log(cmd)
    var stack = [];
    var tempStr = '';
    var cmds = [];
    var fanXieGang = false;
    for (var i = 0; i < cmd.length; i++) {
        if (cmd[i] == ' ' && stack.length <= 0) {
            cmds.push(tempStr);
            tempStr = '';
        } else if (cmd[i] == '"' && fanXieGang == 0) {
            tempStr += cmd[i];
            if (stack[stack.length - 1] == '"') stack.pop()
            else stack.push('"');
        } else if (cmd[i] == "'" && fanXieGang == 0) {
            tempStr += cmd[i];
            if (stack[stack.length - 1] == "'") stack.pop()
            else stack.push("'");
        } else if (stack[stack.length - 1] != '"' && stack[stack.length - 1] != "'") {
            if (cmd[i] == '[') {
                tempStr += cmd[i];
                // if (stack[stack.length-1] == '"') stack.pop()
                stack.push('[');
            } else if (cmd[i] == '{') {
                tempStr += cmd[i];
                // if (stack[stack.length-1] == '"') stack.pop()
                stack.push('{');
            } else if (cmd[i] == ']') {
                if (stack[stack.length - 1] == '[') { tempStr += cmd[i]; stack.pop(); }
                else {
                    throw Error("字符串的中括号不成对");
                }
            } else if (cmd[i] == '}') {
                if (stack[stack.length - 1] == '{') { tempStr += cmd[i]; stack.pop(); }
                else throw Error("字符串的大括号不成对");
            } else {
                tempStr += cmd[i];
            }
        } else {
            tempStr += cmd[i];
        }
        if (fanXieGang) fanXieGang = false;
        else if (cmd[i] == '\\') {
            fanXieGang = true;
        }
    }
    if (stack.length > 0) {
        switch (stack[0]) {
            case '"':
                throw Error("字符串的双引号不成对");
                break;
            case '[':
                throw Error("字符串的中括号不成对");
                break;
            case '{':
                throw Error("字符串的大括号不成对");
                break;
            case "'":
                throw Error("字符串的单引号不成对");
                break;
            default:
                throw Error("无法匹配“" + stack[0] + "”");
        }
    }
    if (fanXieGang > 0) {
        throw Error("转义错误。");
    }
    cmds.push(tempStr);

    return cmds;
}