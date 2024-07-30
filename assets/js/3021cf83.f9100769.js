"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[857],{6213:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>D,contentTitle:()=>V,default:()=>A,frontMatter:()=>S,metadata:()=>C,toc:()=>F});var r=n(6106),a=n(9252),s=n(7378),i=n(3372);const l={tabItem:"tabItem_cIDp"};function o(e){let{children:t,hidden:n,className:a}=e;return(0,r.jsx)("div",{role:"tabpanel",className:(0,i.A)(l.tabItem,a),hidden:n,children:t})}var c=n(2258),u=n(505),d=n(6955),p=n(5239),h=n(6284),m=n(4408);function f(e){return s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function g(e){const{values:t,children:n}=e;return(0,s.useMemo)((()=>{const e=t??function(e){return f(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}(n);return function(e){const t=(0,h.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function b(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function v(e){let{queryString:t=!1,groupId:n}=e;const r=(0,u.W6)(),a=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,p.aZ)(a),(0,s.useCallback)((e=>{if(!a)return;const t=new URLSearchParams(r.location.search);t.set(a,e),r.replace({...r.location,search:t.toString()})}),[a,r])]}function x(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,a=g(e),[i,l]=(0,s.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!b({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:a}))),[o,c]=v({queryString:n,groupId:r}),[u,p]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,a]=(0,m.Dv)(n);return[r,(0,s.useCallback)((e=>{n&&a.set(e)}),[n,a])]}({groupId:r}),h=(()=>{const e=o??u;return b({value:e,tabValues:a})?e:null})();(0,d.A)((()=>{h&&l(h)}),[h]);return{selectedValue:i,selectValue:(0,s.useCallback)((e=>{if(!b({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),c(e),p(e)}),[c,p,a]),tabValues:a}}var j=n(5609);const y={tabList:"tabList_AufO",tabItem:"tabItem_bCU_"};function w(e){let{className:t,block:n,selectedValue:a,selectValue:s,tabValues:l}=e;const o=[],{blockElementScrollPositionUntilNextRender:u}=(0,c.a_)(),d=e=>{const t=e.currentTarget,n=o.indexOf(t),r=l[n].value;r!==a&&(u(t),s(r))},p=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=o.indexOf(e.currentTarget)+1;t=o[n]??o[0];break}case"ArrowLeft":{const n=o.indexOf(e.currentTarget)-1;t=o[n]??o[o.length-1];break}}t?.focus()};return(0,r.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":n},t),children:l.map((e=>{let{value:t,label:n,attributes:s}=e;return(0,r.jsx)("li",{role:"tab",tabIndex:a===t?0:-1,"aria-selected":a===t,ref:e=>o.push(e),onKeyDown:p,onClick:d,...s,className:(0,i.A)("tabs__item",y.tabItem,s?.className,{"tabs__item--active":a===t}),children:n??t},t)}))})}function N(e){let{lazy:t,children:n,selectedValue:a}=e;const i=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===a));return e?(0,s.cloneElement)(e,{className:"margin-top--md"}):null}return(0,r.jsx)("div",{className:"margin-top--md",children:i.map(((e,t)=>(0,s.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function I(e){const t=x(e);return(0,r.jsxs)("div",{className:(0,i.A)("tabs-container",y.tabList),children:[(0,r.jsx)(w,{...t,...e}),(0,r.jsx)(N,{...t,...e})]})}function k(e){const t=(0,j.A)();return(0,r.jsx)(I,{...e,children:f(e.children)},String(t))}const S={sidebar_position:1},V="Getting Started",C={id:"getting-started",title:"Getting Started",description:"Install Fetchtastic using the package manager of your preference:",source:"@site/docs/getting-started.mdx",sourceDirName:".",slug:"/getting-started",permalink:"/fetchtastic/docs/getting-started",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/getting-started.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docSidebar",next:{title:"Usage Guide",permalink:"/fetchtastic/docs/usage-guide"}},D={},F=[{value:"Import",id:"import",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"Deno",id:"deno",level:3},{value:"Remote import",id:"remote-import",level:4},{value:"Npm specifier",id:"npm-specifier",level:4},{value:"JSR",id:"jsr",level:4},{value:"Polyfills for Node.js &lt; v18",id:"polyfills-for-nodejs--v18",level:3},{value:"Fluid interface (Chaining)",id:"fluid-interface-chaining",level:2}];function T(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"getting-started",children:"Getting Started"}),"\n",(0,r.jsx)(t.p,{children:"Install Fetchtastic using the package manager of your preference:"}),"\n",(0,r.jsxs)(k,{groupId:"package-manager",children:[(0,r.jsx)(o,{value:"npm",label:"npm",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-sh",children:"npm install fetchtastic\n"})})}),(0,r.jsx)(o,{value:"pnpm",label:"pnpm",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-sh",children:"pnpm add fetchtastic\n"})})}),(0,r.jsx)(o,{value:"yarn",label:"yarn",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-sh",children:"yarn add fetchtastic\n"})})})]}),"\n",(0,r.jsx)(t.h2,{id:"import",children:"Import"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"import { Fetchtastic } from 'fetchtastic';\n"})}),"\n",(0,r.jsx)(t.h2,{id:"compatibility",children:"Compatibility"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"Fetchtastic"})," runs everywhere fetch is available."]}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Modern browsers"}),"\n",(0,r.jsx)(t.li,{children:"Deno"}),"\n",(0,r.jsx)(t.li,{children:"Node.js >= v18"}),"\n"]}),"\n",(0,r.jsx)(t.h3,{id:"deno",children:"Deno"}),"\n",(0,r.jsx)(t.h4,{id:"remote-import",children:"Remote import"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"import { Fetchtastic } from 'https://deno.land/x/fetchtastic/lib/mod.ts';\n"})}),"\n",(0,r.jsx)(t.h4,{id:"npm-specifier",children:"Npm specifier"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"import { Fetchtastic } from 'npm:fetchtastic';\n"})}),"\n",(0,r.jsx)(t.h4,{id:"jsr",children:"JSR"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-sh",children:"deno add @fveracoechea/fetchtastic\n"})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"import { Fetchtastic } from '@fveracoechea/fetchtastic';\n"})}),"\n",(0,r.jsx)(t.h3,{id:"polyfills-for-nodejs--v18",children:"Polyfills for Node.js < v18"}),"\n",(0,r.jsx)(t.p,{children:"For older versions, the Node.js standard library does not provide a native\nimplementation of fetch and other Browsers-only APIs so polyfilling is\nmandatory."}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"import fetch, { FormData } from 'node-fetch';\n\nglobal.fetch = fetch;\nglobal.FormData = FormData;\n"})}),"\n",(0,r.jsx)(t.h2,{id:"fluid-interface-chaining",children:"Fluid interface (Chaining)"}),"\n",(0,r.jsx)(t.p,{children:"Simplifies code structure, enhances readability, and improves the overall\ndeveloper experience by enabling a more natural and concise way of expressing\noperations."}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"const request = new Fetchtastic('https://jsonplaceholder.typicode.com');\n\nconst posts = await request\n  .get('/posts')\n  .setSearchParams({ page: 1, first: 12 })\n  .appendHeader('Content-Type', 'application/json')\n  .notFound(() => Response.json({ message: 'Record not found' }))\n  .json();\n"})})]})}function A(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(T,{...e})}):T(e)}},9252:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>l});var r=n(7378);const a={},s=r.createContext(a);function i(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);