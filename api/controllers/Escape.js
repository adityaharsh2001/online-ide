const str = 'Hello\nthere! I\twant to be "HTML" friendly & pretty!';

let html = '';

for(let i = 0; i < str.length; i++){
  switch (str[i]){
      case '\n':
            html+="<br>";           
            break;
                
        case ' ':
            if(str[i-1] != ' ' && str[i-1] != '\t') html+=" ";                                                  
            break;
                    
        case '\t':
            html+="&nbsp";
            break;
                
        case '&':
            html+="&amp;";
            break;
                
        case '"':
            html+="&quot;";
            break;
                
        case '>':
            html+="&gt;";
            break;
                
        case '<':
            html+="&lt;";
            break;              
                
        default:
            html+=str[i];       
    }           
}

// Log
console.log(html);