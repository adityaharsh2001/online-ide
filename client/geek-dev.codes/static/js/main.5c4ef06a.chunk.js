(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{52:function(e,t,n){},71:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n.n(a),s=n(27),i=n.n(s),r=n(7),o=n.n(r),l=n(12),u=n(5),j=n(13),b=n.n(j),p=(n(52),n(28)),h=n(29),d=n(10),O=n.n(d),v=(n(62),n(63),n(64),n(65),n(66),n(67),n(68),{cpp:'#include <iostream>\nusing namespace std;\n\nint main()\n{\n    cout << "Hello World!";\n    // Code here\n    return 0;\n}',py:"print('Hello, world!')",java:'class main {  \n  public static void main(String args[]){  \n   System.out.println("Hello Java");  \n  }  \n}  '}),g=v,x=(n(69),n(73)),m=n(1),f=function(){var e=Object(a.useState)(""),t=Object(u.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)("c_cpp"),i=Object(u.a)(s,2),r=i[0],j=i[1],d=Object(a.useState)("cpp"),v=Object(u.a)(d,2),f=v[0],w=v[1],y=Object(a.useState)("$ Output"),S=Object(u.a)(y,2),C=S[0],k=S[1],L=Object(a.useState)(""),E=Object(u.a)(L,2),I=E[0],N=E[1],A=Object(a.useState)(""),P=Object(u.a)(A,2),T=P[0],B=P[1],D=Object(a.useState)(""),F=Object(u.a)(D,2),J=F[0],M=F[1],G=Object(a.useState)(!1),H=Object(u.a)(G,2),W=H[0],$=H[1],_=Object(a.useState)(!0),K=Object(u.a)(_,2),q=K[0],z=K[1];Object(a.useEffect)((function(){var e=setTimeout((function(){z(!1)}),2e3);return function(){return clearTimeout(e)}}),[]),Object(a.useEffect)((function(){M(Object(x.a)()),c(g[f])}),[f]);var Q=function(){var e=Object(l.a)(o.a.mark((function e(){var t,a,c,s,i,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return $(!0),t={jobId:J,ext:f,code:n,input:I},e.prev=2,B(""),k(""),e.next=7,b.a.post("http://localhost:8000/run",t);case 7:a=e.sent,(c=a.data).job&&k(c.jobOutput),s=setInterval(Object(l.a)(o.a.mark((function e(){var t,n,a,i,r,l,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get("http://localhost:8000/status",{params:{id:c.jobid}});case 2:if(t=e.sent,n=t.data,a=n.success,i=n.job,r=n.error,!a){e.next=16;break}if(l=i.status,u=i.output,B(l),"running"!==l){e.next=10;break}return e.abrupt("return");case 10:k(u),$(!1),clearInterval(),clearInterval(s),e.next=17;break;case 16:k(r);case 17:case"end":return e.stop()}}),e)}))),1e3),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(2),(i=e.t0.response)?(console.log(i),r=i.data.err.stderr,k(r)):window.alert("Error Connection To server");case 17:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(){return e.apply(this,arguments)}}();return Object(m.jsxs)("div",{children:[Object(m.jsx)("div",{className:"App",children:Object(m.jsxs)("header",{style:{height:"50px",backgroundColor:"#1D1E22",display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center",position:"static"},children:[Object(m.jsx)("div",{className:"select",children:Object(m.jsxs)("select",{onChange:function(e){window.confirm("Warning Switching The Language will remove your chnages")&&(w(e.target.value),function(e){"py"===e&&j("python"),"cpp"===e&&j("c_cpp"),"java"===e&&j("java")}(e.target.value))},value:f,children:[Object(m.jsx)("option",{value:"cpp",children:"C++"}),Object(m.jsx)("option",{value:"py",children:"Python"}),Object(m.jsx)("option",{value:"java",children:"Java"})]})}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{onClick:Q,disabled:W,children:W?Object(m.jsx)(p.a,{className:"fa-spin",icon:h.a}):"Submit"})})]})}),q?Object(m.jsxs)("div",{className:"logo",children:[Object(m.jsx)("span",{className:"left",children:"{"}),Object(m.jsx)("span",{class:"right",children:"}"}),Object(m.jsxs)("span",{class:"text",children:["IDE",Object(m.jsx)("br",{}),Object(m.jsx)("strong",{children:"GEEK"})]})]}):Object(m.jsxs)("div",{style:{display:"flex",position:"absolute",top:"50px",bottom:"0",right:"0",left:"0"},children:[Object(m.jsx)(O.a,{className:"editor",mode:r,theme:"dracula",height:"100%",onChange:function(e){c(e)},value:n,minLines:"50",style:{width:"100%"},editorProps:{$blockScrolling:!0},showPrintMargin:!1,highlightActiveLine:!0,enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,enableSnippets:!0,setOptions:{enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,enableSnippets:!0}}),Object(m.jsxs)("div",{style:{maxWidth:"50vw"},children:[Object(m.jsx)(O.a,{theme:"dracula",value:C+"\n"+T,readOnly:!0,style:{height:"50%"},wrapEnabled:!1,setOptions:{showGutter:!1,highlightActiveLine:!1,showLineNumbers:!1,showPrintMargin:!1}}),Object(m.jsx)(O.a,{theme:"dracula",placeholder:"STDIN",value:I,style:{height:"50%"},setOptions:{showGutter:!1,highlightActiveLine:!1,showLineNumbers:!1,showPrintMargin:!1},onChange:function(e){N(e)}})]})]})]})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,74)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),s(e),i(e)}))};i.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(f,{})}),document.getElementById("root")),w()}},[[71,1,2]]]);
//# sourceMappingURL=main.5c4ef06a.chunk.js.map