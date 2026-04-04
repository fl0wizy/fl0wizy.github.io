(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))u(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&u(f)}).observe(document,{childList:!0,subtree:!0});function a(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function u(s){if(s.ep)return;s.ep=!0;const c=a(s);fetch(s.href,c)}})();function fg(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Ks={exports:{}},Aa={};var lp;function ib(){if(lp)return Aa;lp=1;var t=Symbol.for("react.transitional.element"),i=Symbol.for("react.fragment");function a(u,s,c){var f=null;if(c!==void 0&&(f=""+c),s.key!==void 0&&(f=""+s.key),"key"in s){c={};for(var m in s)m!=="key"&&(c[m]=s[m])}else c=s;return s=c.ref,{$$typeof:t,type:u,key:f,ref:s!==void 0?s:null,props:c}}return Aa.Fragment=i,Aa.jsx=a,Aa.jsxs=a,Aa}var ip;function ab(){return ip||(ip=1,Ks.exports=ib()),Ks.exports}var E=ab(),Js={exports:{}},ge={};var ap;function rb(){if(ap)return ge;ap=1;var t=Symbol.for("react.transitional.element"),i=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),g=Symbol.for("react.activity"),S=Symbol.iterator;function x(T){return T===null||typeof T!="object"?null:(T=S&&T[S]||T["@@iterator"],typeof T=="function"?T:null)}var w={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,D={};function R(T,G,k){this.props=T,this.context=G,this.refs=D,this.updater=k||w}R.prototype.isReactComponent={},R.prototype.setState=function(T,G){if(typeof T!="object"&&typeof T!="function"&&T!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,T,G,"setState")},R.prototype.forceUpdate=function(T){this.updater.enqueueForceUpdate(this,T,"forceUpdate")};function X(){}X.prototype=R.prototype;function U(T,G,k){this.props=T,this.context=G,this.refs=D,this.updater=k||w}var te=U.prototype=new X;te.constructor=U,_(te,R.prototype),te.isPureReactComponent=!0;var le=Array.isArray;function q(){}var P={H:null,A:null,T:null,S:null},ce=Object.prototype.hasOwnProperty;function me(T,G,k){var $=k.ref;return{$$typeof:t,type:T,key:G,ref:$!==void 0?$:null,props:k}}function B(T,G){return me(T.type,G,T.props)}function ne(T){return typeof T=="object"&&T!==null&&T.$$typeof===t}function ee(T){var G={"=":"=0",":":"=2"};return"$"+T.replace(/[=:]/g,function(k){return G[k]})}var xe=/\/+/g;function ae(T,G){return typeof T=="object"&&T!==null&&T.key!=null?ee(""+T.key):G.toString(36)}function K(T){switch(T.status){case"fulfilled":return T.value;case"rejected":throw T.reason;default:switch(typeof T.status=="string"?T.then(q,q):(T.status="pending",T.then(function(G){T.status==="pending"&&(T.status="fulfilled",T.value=G)},function(G){T.status==="pending"&&(T.status="rejected",T.reason=G)})),T.status){case"fulfilled":return T.value;case"rejected":throw T.reason}}throw T}function L(T,G,k,$,de){var oe=typeof T;(oe==="undefined"||oe==="boolean")&&(T=null);var we=!1;if(T===null)we=!0;else switch(oe){case"bigint":case"string":case"number":we=!0;break;case"object":switch(T.$$typeof){case t:case i:we=!0;break;case b:return we=T._init,L(we(T._payload),G,k,$,de)}}if(we)return de=de(T),we=$===""?"."+ae(T,0):$,le(de)?(k="",we!=null&&(k=we.replace(xe,"$&/")+"/"),L(de,G,k,"",function(Vn){return Vn})):de!=null&&(ne(de)&&(de=B(de,k+(de.key==null||T&&T.key===de.key?"":(""+de.key).replace(xe,"$&/")+"/")+we)),G.push(de)),1;we=0;var Ie=$===""?".":$+":";if(le(T))for(var Be=0;Be<T.length;Be++)$=T[Be],oe=Ie+ae($,Be),we+=L($,G,k,oe,de);else if(Be=x(T),typeof Be=="function")for(T=Be.call(T),Be=0;!($=T.next()).done;)$=$.value,oe=Ie+ae($,Be++),we+=L($,G,k,oe,de);else if(oe==="object"){if(typeof T.then=="function")return L(K(T),G,k,$,de);throw G=String(T),Error("Objects are not valid as a React child (found: "+(G==="[object Object]"?"object with keys {"+Object.keys(T).join(", ")+"}":G)+"). If you meant to render a collection of children, use an array instead.")}return we}function Z(T,G,k){if(T==null)return T;var $=[],de=0;return L(T,$,"","",function(oe){return G.call(k,oe,de++)}),$}function ue(T){if(T._status===-1){var G=T._result;G=G(),G.then(function(k){(T._status===0||T._status===-1)&&(T._status=1,T._result=k)},function(k){(T._status===0||T._status===-1)&&(T._status=2,T._result=k)}),T._status===-1&&(T._status=0,T._result=G)}if(T._status===1)return T._result.default;throw T._result}var Se=typeof reportError=="function"?reportError:function(T){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var G=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof T=="object"&&T!==null&&typeof T.message=="string"?String(T.message):String(T),error:T});if(!window.dispatchEvent(G))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",T);return}console.error(T)},C={map:Z,forEach:function(T,G,k){Z(T,function(){G.apply(this,arguments)},k)},count:function(T){var G=0;return Z(T,function(){G++}),G},toArray:function(T){return Z(T,function(G){return G})||[]},only:function(T){if(!ne(T))throw Error("React.Children.only expected to receive a single React element child.");return T}};return ge.Activity=g,ge.Children=C,ge.Component=R,ge.Fragment=a,ge.Profiler=s,ge.PureComponent=U,ge.StrictMode=u,ge.Suspense=p,ge.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=P,ge.__COMPILER_RUNTIME={__proto__:null,c:function(T){return P.H.useMemoCache(T)}},ge.cache=function(T){return function(){return T.apply(null,arguments)}},ge.cacheSignal=function(){return null},ge.cloneElement=function(T,G,k){if(T==null)throw Error("The argument must be a React element, but you passed "+T+".");var $=_({},T.props),de=T.key;if(G!=null)for(oe in G.key!==void 0&&(de=""+G.key),G)!ce.call(G,oe)||oe==="key"||oe==="__self"||oe==="__source"||oe==="ref"&&G.ref===void 0||($[oe]=G[oe]);var oe=arguments.length-2;if(oe===1)$.children=k;else if(1<oe){for(var we=Array(oe),Ie=0;Ie<oe;Ie++)we[Ie]=arguments[Ie+2];$.children=we}return me(T.type,de,$)},ge.createContext=function(T){return T={$$typeof:f,_currentValue:T,_currentValue2:T,_threadCount:0,Provider:null,Consumer:null},T.Provider=T,T.Consumer={$$typeof:c,_context:T},T},ge.createElement=function(T,G,k){var $,de={},oe=null;if(G!=null)for($ in G.key!==void 0&&(oe=""+G.key),G)ce.call(G,$)&&$!=="key"&&$!=="__self"&&$!=="__source"&&(de[$]=G[$]);var we=arguments.length-2;if(we===1)de.children=k;else if(1<we){for(var Ie=Array(we),Be=0;Be<we;Be++)Ie[Be]=arguments[Be+2];de.children=Ie}if(T&&T.defaultProps)for($ in we=T.defaultProps,we)de[$]===void 0&&(de[$]=we[$]);return me(T,oe,de)},ge.createRef=function(){return{current:null}},ge.forwardRef=function(T){return{$$typeof:m,render:T}},ge.isValidElement=ne,ge.lazy=function(T){return{$$typeof:b,_payload:{_status:-1,_result:T},_init:ue}},ge.memo=function(T,G){return{$$typeof:d,type:T,compare:G===void 0?null:G}},ge.startTransition=function(T){var G=P.T,k={};P.T=k;try{var $=T(),de=P.S;de!==null&&de(k,$),typeof $=="object"&&$!==null&&typeof $.then=="function"&&$.then(q,Se)}catch(oe){Se(oe)}finally{G!==null&&k.types!==null&&(G.types=k.types),P.T=G}},ge.unstable_useCacheRefresh=function(){return P.H.useCacheRefresh()},ge.use=function(T){return P.H.use(T)},ge.useActionState=function(T,G,k){return P.H.useActionState(T,G,k)},ge.useCallback=function(T,G){return P.H.useCallback(T,G)},ge.useContext=function(T){return P.H.useContext(T)},ge.useDebugValue=function(){},ge.useDeferredValue=function(T,G){return P.H.useDeferredValue(T,G)},ge.useEffect=function(T,G){return P.H.useEffect(T,G)},ge.useEffectEvent=function(T){return P.H.useEffectEvent(T)},ge.useId=function(){return P.H.useId()},ge.useImperativeHandle=function(T,G,k){return P.H.useImperativeHandle(T,G,k)},ge.useInsertionEffect=function(T,G){return P.H.useInsertionEffect(T,G)},ge.useLayoutEffect=function(T,G){return P.H.useLayoutEffect(T,G)},ge.useMemo=function(T,G){return P.H.useMemo(T,G)},ge.useOptimistic=function(T,G){return P.H.useOptimistic(T,G)},ge.useReducer=function(T,G,k){return P.H.useReducer(T,G,k)},ge.useRef=function(T){return P.H.useRef(T)},ge.useState=function(T){return P.H.useState(T)},ge.useSyncExternalStore=function(T,G,k){return P.H.useSyncExternalStore(T,G,k)},ge.useTransition=function(){return P.H.useTransition()},ge.version="19.2.4",ge}var rp;function Nc(){return rp||(rp=1,Js.exports=rb()),Js.exports}var V=Nc(),Ws={exports:{}},wa={},Ps={exports:{}},$s={};var up;function ub(){return up||(up=1,(function(t){function i(L,Z){var ue=L.length;L.push(Z);e:for(;0<ue;){var Se=ue-1>>>1,C=L[Se];if(0<s(C,Z))L[Se]=Z,L[ue]=C,ue=Se;else break e}}function a(L){return L.length===0?null:L[0]}function u(L){if(L.length===0)return null;var Z=L[0],ue=L.pop();if(ue!==Z){L[0]=ue;e:for(var Se=0,C=L.length,T=C>>>1;Se<T;){var G=2*(Se+1)-1,k=L[G],$=G+1,de=L[$];if(0>s(k,ue))$<C&&0>s(de,k)?(L[Se]=de,L[$]=ue,Se=$):(L[Se]=k,L[G]=ue,Se=G);else if($<C&&0>s(de,ue))L[Se]=de,L[$]=ue,Se=$;else break e}}return Z}function s(L,Z){var ue=L.sortIndex-Z.sortIndex;return ue!==0?ue:L.id-Z.id}if(t.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;t.unstable_now=function(){return c.now()}}else{var f=Date,m=f.now();t.unstable_now=function(){return f.now()-m}}var p=[],d=[],b=1,g=null,S=3,x=!1,w=!1,_=!1,D=!1,R=typeof setTimeout=="function"?setTimeout:null,X=typeof clearTimeout=="function"?clearTimeout:null,U=typeof setImmediate<"u"?setImmediate:null;function te(L){for(var Z=a(d);Z!==null;){if(Z.callback===null)u(d);else if(Z.startTime<=L)u(d),Z.sortIndex=Z.expirationTime,i(p,Z);else break;Z=a(d)}}function le(L){if(_=!1,te(L),!w)if(a(p)!==null)w=!0,q||(q=!0,ee());else{var Z=a(d);Z!==null&&K(le,Z.startTime-L)}}var q=!1,P=-1,ce=5,me=-1;function B(){return D?!0:!(t.unstable_now()-me<ce)}function ne(){if(D=!1,q){var L=t.unstable_now();me=L;var Z=!0;try{e:{w=!1,_&&(_=!1,X(P),P=-1),x=!0;var ue=S;try{n:{for(te(L),g=a(p);g!==null&&!(g.expirationTime>L&&B());){var Se=g.callback;if(typeof Se=="function"){g.callback=null,S=g.priorityLevel;var C=Se(g.expirationTime<=L);if(L=t.unstable_now(),typeof C=="function"){g.callback=C,te(L),Z=!0;break n}g===a(p)&&u(p),te(L)}else u(p);g=a(p)}if(g!==null)Z=!0;else{var T=a(d);T!==null&&K(le,T.startTime-L),Z=!1}}break e}finally{g=null,S=ue,x=!1}Z=void 0}}finally{Z?ee():q=!1}}}var ee;if(typeof U=="function")ee=function(){U(ne)};else if(typeof MessageChannel<"u"){var xe=new MessageChannel,ae=xe.port2;xe.port1.onmessage=ne,ee=function(){ae.postMessage(null)}}else ee=function(){R(ne,0)};function K(L,Z){P=R(function(){L(t.unstable_now())},Z)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(L){L.callback=null},t.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ce=0<L?Math.floor(1e3/L):5},t.unstable_getCurrentPriorityLevel=function(){return S},t.unstable_next=function(L){switch(S){case 1:case 2:case 3:var Z=3;break;default:Z=S}var ue=S;S=Z;try{return L()}finally{S=ue}},t.unstable_requestPaint=function(){D=!0},t.unstable_runWithPriority=function(L,Z){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var ue=S;S=L;try{return Z()}finally{S=ue}},t.unstable_scheduleCallback=function(L,Z,ue){var Se=t.unstable_now();switch(typeof ue=="object"&&ue!==null?(ue=ue.delay,ue=typeof ue=="number"&&0<ue?Se+ue:Se):ue=Se,L){case 1:var C=-1;break;case 2:C=250;break;case 5:C=1073741823;break;case 4:C=1e4;break;default:C=5e3}return C=ue+C,L={id:b++,callback:Z,priorityLevel:L,startTime:ue,expirationTime:C,sortIndex:-1},ue>Se?(L.sortIndex=ue,i(d,L),a(p)===null&&L===a(d)&&(_?(X(P),P=-1):_=!0,K(le,ue-Se))):(L.sortIndex=C,i(p,L),w||x||(w=!0,q||(q=!0,ee()))),L},t.unstable_shouldYield=B,t.unstable_wrapCallback=function(L){var Z=S;return function(){var ue=S;S=Z;try{return L.apply(this,arguments)}finally{S=ue}}}})($s)),$s}var op;function ob(){return op||(op=1,Ps.exports=ub()),Ps.exports}var ec={exports:{}},pn={};var sp;function sb(){if(sp)return pn;sp=1;var t=Nc();function i(p){var d="https://react.dev/errors/"+p;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var b=2;b<arguments.length;b++)d+="&args[]="+encodeURIComponent(arguments[b])}return"Minified React error #"+p+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function a(){}var u={d:{f:a,r:function(){throw Error(i(522))},D:a,C:a,L:a,m:a,X:a,S:a,M:a},p:0,findDOMNode:null},s=Symbol.for("react.portal");function c(p,d,b){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:s,key:g==null?null:""+g,children:p,containerInfo:d,implementation:b}}var f=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(p,d){if(p==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return pn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=u,pn.createPortal=function(p,d){var b=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(i(299));return c(p,d,null,b)},pn.flushSync=function(p){var d=f.T,b=u.p;try{if(f.T=null,u.p=2,p)return p()}finally{f.T=d,u.p=b,u.d.f()}},pn.preconnect=function(p,d){typeof p=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,u.d.C(p,d))},pn.prefetchDNS=function(p){typeof p=="string"&&u.d.D(p)},pn.preinit=function(p,d){if(typeof p=="string"&&d&&typeof d.as=="string"){var b=d.as,g=m(b,d.crossOrigin),S=typeof d.integrity=="string"?d.integrity:void 0,x=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;b==="style"?u.d.S(p,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:g,integrity:S,fetchPriority:x}):b==="script"&&u.d.X(p,{crossOrigin:g,integrity:S,fetchPriority:x,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},pn.preinitModule=function(p,d){if(typeof p=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var b=m(d.as,d.crossOrigin);u.d.M(p,{crossOrigin:b,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&u.d.M(p)},pn.preload=function(p,d){if(typeof p=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var b=d.as,g=m(b,d.crossOrigin);u.d.L(p,b,{crossOrigin:g,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},pn.preloadModule=function(p,d){if(typeof p=="string")if(d){var b=m(d.as,d.crossOrigin);u.d.m(p,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:b,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else u.d.m(p)},pn.requestFormReset=function(p){u.d.r(p)},pn.unstable_batchedUpdates=function(p,d){return p(d)},pn.useFormState=function(p,d,b){return f.H.useFormState(p,d,b)},pn.useFormStatus=function(){return f.H.useHostTransitionStatus()},pn.version="19.2.4",pn}var cp;function cb(){if(cp)return ec.exports;cp=1;function t(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t)}catch(i){console.error(i)}}return t(),ec.exports=sb(),ec.exports}var fp;function fb(){if(fp)return wa;fp=1;var t=ob(),i=Nc(),a=cb();function u(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var l=2;l<arguments.length;l++)n+="&args[]="+encodeURIComponent(arguments[l])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,l=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(l=n.return),e=n.return;while(e)}return n.tag===3?l:null}function f(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function p(e){if(c(e)!==e)throw Error(u(188))}function d(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(u(188));return n!==e?null:e}for(var l=e,r=n;;){var o=l.return;if(o===null)break;var h=o.alternate;if(h===null){if(r=o.return,r!==null){l=r;continue}break}if(o.child===h.child){for(h=o.child;h;){if(h===l)return p(o),e;if(h===r)return p(o),n;h=h.sibling}throw Error(u(188))}if(l.return!==r.return)l=o,r=h;else{for(var y=!1,v=o.child;v;){if(v===l){y=!0,l=o,r=h;break}if(v===r){y=!0,r=o,l=h;break}v=v.sibling}if(!y){for(v=h.child;v;){if(v===l){y=!0,l=h,r=o;break}if(v===r){y=!0,r=h,l=o;break}v=v.sibling}if(!y)throw Error(u(189))}}if(l.alternate!==r)throw Error(u(190))}if(l.tag!==3)throw Error(u(188));return l.stateNode.current===l?e:n}function b(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=b(e),n!==null)return n;e=e.sibling}return null}var g=Object.assign,S=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),w=Symbol.for("react.portal"),_=Symbol.for("react.fragment"),D=Symbol.for("react.strict_mode"),R=Symbol.for("react.profiler"),X=Symbol.for("react.consumer"),U=Symbol.for("react.context"),te=Symbol.for("react.forward_ref"),le=Symbol.for("react.suspense"),q=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),ce=Symbol.for("react.lazy"),me=Symbol.for("react.activity"),B=Symbol.for("react.memo_cache_sentinel"),ne=Symbol.iterator;function ee(e){return e===null||typeof e!="object"?null:(e=ne&&e[ne]||e["@@iterator"],typeof e=="function"?e:null)}var xe=Symbol.for("react.client.reference");function ae(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===xe?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case _:return"Fragment";case R:return"Profiler";case D:return"StrictMode";case le:return"Suspense";case q:return"SuspenseList";case me:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case w:return"Portal";case U:return e.displayName||"Context";case X:return(e._context.displayName||"Context")+".Consumer";case te:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case P:return n=e.displayName||null,n!==null?n:ae(e.type)||"Memo";case ce:n=e._payload,e=e._init;try{return ae(e(n))}catch{}}return null}var K=Array.isArray,L=i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Z=a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ue={pending:!1,data:null,method:null,action:null},Se=[],C=-1;function T(e){return{current:e}}function G(e){0>C||(e.current=Se[C],Se[C]=null,C--)}function k(e,n){C++,Se[C]=e.current,e.current=n}var $=T(null),de=T(null),oe=T(null),we=T(null);function Ie(e,n){switch(k(oe,n),k(de,e),k($,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?wm(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=wm(n),e=Tm(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}G($),k($,e)}function Be(){G($),G(de),G(oe)}function Vn(e){e.memoizedState!==null&&k(we,e);var n=$.current,l=Tm(n,e.type);n!==l&&(k(de,e),k($,l))}function pt(e){de.current===e&&(G($),G(de)),we.current===e&&(G(we),Sa._currentValue=ue)}var _i,Ia;function gt(e){if(_i===void 0)try{throw Error()}catch(l){var n=l.stack.trim().match(/\n( *(at )?)/);_i=n&&n[1]||"",Ia=-1<l.stack.indexOf(`
    at`)?" (<anonymous>)":-1<l.stack.indexOf("@")?"@unknown:0:0":""}return`
`+_i+e+Ia}var Ol=!1;function Nl(e,n){if(!e||Ol)return"";Ol=!0;var l=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(n){var I=function(){throw Error()};if(Object.defineProperty(I.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(I,[])}catch(H){var j=H}Reflect.construct(e,[],I)}else{try{I.call()}catch(H){j=H}e.call(I.prototype)}}else{try{throw Error()}catch(H){j=H}(I=e())&&typeof I.catch=="function"&&I.catch(function(){})}}catch(H){if(H&&j&&typeof H.stack=="string")return[H.stack,j.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=r.DetermineComponentFrameRoot(),y=h[0],v=h[1];if(y&&v){var A=y.split(`
`),N=v.split(`
`);for(o=r=0;r<A.length&&!A[r].includes("DetermineComponentFrameRoot");)r++;for(;o<N.length&&!N[o].includes("DetermineComponentFrameRoot");)o++;if(r===A.length||o===N.length)for(r=A.length-1,o=N.length-1;1<=r&&0<=o&&A[r]!==N[o];)o--;for(;1<=r&&0<=o;r--,o--)if(A[r]!==N[o]){if(r!==1||o!==1)do if(r--,o--,0>o||A[r]!==N[o]){var Y=`
`+A[r].replace(" at new "," at ");return e.displayName&&Y.includes("<anonymous>")&&(Y=Y.replace("<anonymous>",e.displayName)),Y}while(1<=r&&0<=o);break}}}finally{Ol=!1,Error.prepareStackTrace=l}return(l=e?e.displayName||e.name:"")?gt(l):""}function Za(e,n){switch(e.tag){case 26:case 27:case 5:return gt(e.type);case 16:return gt("Lazy");case 13:return e.child!==n&&n!==null?gt("Suspense Fallback"):gt("Suspense");case 19:return gt("SuspenseList");case 0:case 15:return Nl(e.type,!1);case 11:return Nl(e.type.render,!1);case 1:return Nl(e.type,!0);case 31:return gt("Activity");default:return""}}function Ka(e){try{var n="",l=null;do n+=Za(e,l),l=e,e=e.return;while(e);return n}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}var jl=Object.prototype.hasOwnProperty,Ll=t.unstable_scheduleCallback,Oi=t.unstable_cancelCallback,Ou=t.unstable_shouldYield,Nu=t.unstable_requestPaint,bn=t.unstable_now,ju=t.unstable_getCurrentPriorityLevel,Q=t.unstable_ImmediatePriority,W=t.unstable_UserBlockingPriority,pe=t.unstable_NormalPriority,Ee=t.unstable_LowPriority,Ne=t.unstable_IdlePriority,_n=t.log,yt=t.unstable_setDisableYieldValue,vn=null,rn=null;function En(e){if(typeof _n=="function"&&yt(e),rn&&typeof rn.setStrictMode=="function")try{rn.setStrictMode(vn,e)}catch{}}var Ye=Math.clz32?Math.clz32:Gy,Ht=Math.log,nt=Math.LN2;function Gy(e){return e>>>=0,e===0?32:31-(Ht(e)/nt|0)|0}var Ja=256,Wa=262144,Pa=4194304;function hl(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function $a(e,n,l){var r=e.pendingLanes;if(r===0)return 0;var o=0,h=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var v=r&134217727;return v!==0?(r=v&~h,r!==0?o=hl(r):(y&=v,y!==0?o=hl(y):l||(l=v&~e,l!==0&&(o=hl(l))))):(v=r&~h,v!==0?o=hl(v):y!==0?o=hl(y):l||(l=r&~e,l!==0&&(o=hl(l)))),o===0?0:n!==0&&n!==o&&(n&h)===0&&(h=o&-o,l=n&-n,h>=l||h===32&&(l&4194048)!==0)?n:o}function Ni(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function Qy(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function uf(){var e=Pa;return Pa<<=1,(Pa&62914560)===0&&(Pa=4194304),e}function Lu(e){for(var n=[],l=0;31>l;l++)n.push(e);return n}function ji(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Fy(e,n,l,r,o,h){var y=e.pendingLanes;e.pendingLanes=l,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=l,e.entangledLanes&=l,e.errorRecoveryDisabledLanes&=l,e.shellSuspendCounter=0;var v=e.entanglements,A=e.expirationTimes,N=e.hiddenUpdates;for(l=y&~l;0<l;){var Y=31-Ye(l),I=1<<Y;v[Y]=0,A[Y]=-1;var j=N[Y];if(j!==null)for(N[Y]=null,Y=0;Y<j.length;Y++){var H=j[Y];H!==null&&(H.lane&=-536870913)}l&=~I}r!==0&&of(e,r,0),h!==0&&o===0&&e.tag!==0&&(e.suspendedLanes|=h&~(y&~n))}function of(e,n,l){e.pendingLanes|=n,e.suspendedLanes&=~n;var r=31-Ye(n);e.entangledLanes|=n,e.entanglements[r]=e.entanglements[r]|1073741824|l&261930}function sf(e,n){var l=e.entangledLanes|=n;for(e=e.entanglements;l;){var r=31-Ye(l),o=1<<r;o&n|e[r]&n&&(e[r]|=n),l&=~o}}function cf(e,n){var l=n&-n;return l=(l&42)!==0?1:Bu(l),(l&(e.suspendedLanes|n))!==0?0:l}function Bu(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Uu(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ff(){var e=Z.p;return e!==0?e:(e=window.event,e===void 0?32:Jm(e.type))}function hf(e,n){var l=Z.p;try{return Z.p=e,n()}finally{Z.p=l}}var qt=Math.random().toString(36).slice(2),cn="__reactFiber$"+qt,kn="__reactProps$"+qt,Bl="__reactContainer$"+qt,Hu="__reactEvents$"+qt,Iy="__reactListeners$"+qt,Zy="__reactHandles$"+qt,df="__reactResources$"+qt,Li="__reactMarker$"+qt;function qu(e){delete e[cn],delete e[kn],delete e[Hu],delete e[Iy],delete e[Zy]}function Ul(e){var n=e[cn];if(n)return n;for(var l=e.parentNode;l;){if(n=l[Bl]||l[cn]){if(l=n.alternate,n.child!==null||l!==null&&l.child!==null)for(e=Nm(e);e!==null;){if(l=e[cn])return l;e=Nm(e)}return n}e=l,l=e.parentNode}return null}function Hl(e){if(e=e[cn]||e[Bl]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function Bi(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(u(33))}function ql(e){var n=e[df];return n||(n=e[df]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function on(e){e[Li]=!0}var mf=new Set,pf={};function dl(e,n){Yl(e,n),Yl(e+"Capture",n)}function Yl(e,n){for(pf[e]=n,e=0;e<n.length;e++)mf.add(n[e])}var Ky=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),gf={},yf={};function Jy(e){return jl.call(yf,e)?!0:jl.call(gf,e)?!1:Ky.test(e)?yf[e]=!0:(gf[e]=!0,!1)}function er(e,n,l){if(Jy(n))if(l===null)e.removeAttribute(n);else{switch(typeof l){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var r=n.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+l)}}function nr(e,n,l){if(l===null)e.removeAttribute(n);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+l)}}function bt(e,n,l,r){if(r===null)e.removeAttribute(l);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(l);return}e.setAttributeNS(n,l,""+r)}}function Xn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function bf(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Wy(e,n,l){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var o=r.get,h=r.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return o.call(this)},set:function(y){l=""+y,h.call(this,y)}}),Object.defineProperty(e,n,{enumerable:r.enumerable}),{getValue:function(){return l},setValue:function(y){l=""+y},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Yu(e){if(!e._valueTracker){var n=bf(e)?"checked":"value";e._valueTracker=Wy(e,n,""+e[n])}}function vf(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var l=n.getValue(),r="";return e&&(r=bf(e)?e.checked?"true":"false":e.value),e=r,e!==l?(n.setValue(e),!0):!1}function tr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Py=/[\n"\\]/g;function Gn(e){return e.replace(Py,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Vu(e,n,l,r,o,h,y,v){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),n!=null?y==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Xn(n)):e.value!==""+Xn(n)&&(e.value=""+Xn(n)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),n!=null?Xu(e,y,Xn(n)):l!=null?Xu(e,y,Xn(l)):r!=null&&e.removeAttribute("value"),o==null&&h!=null&&(e.defaultChecked=!!h),o!=null&&(e.checked=o&&typeof o!="function"&&typeof o!="symbol"),v!=null&&typeof v!="function"&&typeof v!="symbol"&&typeof v!="boolean"?e.name=""+Xn(v):e.removeAttribute("name")}function xf(e,n,l,r,o,h,y,v){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),n!=null||l!=null){if(!(h!=="submit"&&h!=="reset"||n!=null)){Yu(e);return}l=l!=null?""+Xn(l):"",n=n!=null?""+Xn(n):l,v||n===e.value||(e.value=n),e.defaultValue=n}r=r??o,r=typeof r!="function"&&typeof r!="symbol"&&!!r,e.checked=v?e.checked:!!r,e.defaultChecked=!!r,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Yu(e)}function Xu(e,n,l){n==="number"&&tr(e.ownerDocument)===e||e.defaultValue===""+l||(e.defaultValue=""+l)}function Vl(e,n,l,r){if(e=e.options,n){n={};for(var o=0;o<l.length;o++)n["$"+l[o]]=!0;for(l=0;l<e.length;l++)o=n.hasOwnProperty("$"+e[l].value),e[l].selected!==o&&(e[l].selected=o),o&&r&&(e[l].defaultSelected=!0)}else{for(l=""+Xn(l),n=null,o=0;o<e.length;o++){if(e[o].value===l){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}n!==null||e[o].disabled||(n=e[o])}n!==null&&(n.selected=!0)}}function Sf(e,n,l){if(n!=null&&(n=""+Xn(n),n!==e.value&&(e.value=n),l==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=l!=null?""+Xn(l):""}function Ef(e,n,l,r){if(n==null){if(r!=null){if(l!=null)throw Error(u(92));if(K(r)){if(1<r.length)throw Error(u(93));r=r[0]}l=r}l==null&&(l=""),n=l}l=Xn(n),e.defaultValue=l,r=e.textContent,r===l&&r!==""&&r!==null&&(e.value=r),Yu(e)}function Xl(e,n){if(n){var l=e.firstChild;if(l&&l===e.lastChild&&l.nodeType===3){l.nodeValue=n;return}}e.textContent=n}var $y=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function kf(e,n,l){var r=n.indexOf("--")===0;l==null||typeof l=="boolean"||l===""?r?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":r?e.setProperty(n,l):typeof l!="number"||l===0||$y.has(n)?n==="float"?e.cssFloat=l:e[n]=(""+l).trim():e[n]=l+"px"}function Cf(e,n,l){if(n!=null&&typeof n!="object")throw Error(u(62));if(e=e.style,l!=null){for(var r in l)!l.hasOwnProperty(r)||n!=null&&n.hasOwnProperty(r)||(r.indexOf("--")===0?e.setProperty(r,""):r==="float"?e.cssFloat="":e[r]="");for(var o in n)r=n[o],n.hasOwnProperty(o)&&l[o]!==r&&kf(e,o,r)}else for(var h in n)n.hasOwnProperty(h)&&kf(e,h,n[h])}function Gu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var e0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),n0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function lr(e){return n0.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function vt(){}var Qu=null;function Fu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Gl=null,Ql=null;function Af(e){var n=Hl(e);if(n&&(e=n.stateNode)){var l=e[kn]||null;e:switch(e=n.stateNode,n.type){case"input":if(Vu(e,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name),n=l.name,l.type==="radio"&&n!=null){for(l=e;l.parentNode;)l=l.parentNode;for(l=l.querySelectorAll('input[name="'+Gn(""+n)+'"][type="radio"]'),n=0;n<l.length;n++){var r=l[n];if(r!==e&&r.form===e.form){var o=r[kn]||null;if(!o)throw Error(u(90));Vu(r,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(n=0;n<l.length;n++)r=l[n],r.form===e.form&&vf(r)}break e;case"textarea":Sf(e,l.value,l.defaultValue);break e;case"select":n=l.value,n!=null&&Vl(e,!!l.multiple,n,!1)}}}var Iu=!1;function wf(e,n,l){if(Iu)return e(n,l);Iu=!0;try{var r=e(n);return r}finally{if(Iu=!1,(Gl!==null||Ql!==null)&&(Gr(),Gl&&(n=Gl,e=Ql,Ql=Gl=null,Af(n),e)))for(n=0;n<e.length;n++)Af(e[n])}}function Ui(e,n){var l=e.stateNode;if(l===null)return null;var r=l[kn]||null;if(r===null)return null;l=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(l&&typeof l!="function")throw Error(u(231,n,typeof l));return l}var xt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Zu=!1;if(xt)try{var Hi={};Object.defineProperty(Hi,"passive",{get:function(){Zu=!0}}),window.addEventListener("test",Hi,Hi),window.removeEventListener("test",Hi,Hi)}catch{Zu=!1}var Yt=null,Ku=null,ir=null;function Tf(){if(ir)return ir;var e,n=Ku,l=n.length,r,o="value"in Yt?Yt.value:Yt.textContent,h=o.length;for(e=0;e<l&&n[e]===o[e];e++);var y=l-e;for(r=1;r<=y&&n[l-r]===o[h-r];r++);return ir=o.slice(e,1<r?1-r:void 0)}function ar(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function rr(){return!0}function zf(){return!1}function Cn(e){function n(l,r,o,h,y){this._reactName=l,this._targetInst=o,this.type=r,this.nativeEvent=h,this.target=y,this.currentTarget=null;for(var v in e)e.hasOwnProperty(v)&&(l=e[v],this[v]=l?l(h):h[v]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?rr:zf,this.isPropagationStopped=zf,this}return g(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var l=this.nativeEvent;l&&(l.preventDefault?l.preventDefault():typeof l.returnValue!="unknown"&&(l.returnValue=!1),this.isDefaultPrevented=rr)},stopPropagation:function(){var l=this.nativeEvent;l&&(l.stopPropagation?l.stopPropagation():typeof l.cancelBubble!="unknown"&&(l.cancelBubble=!0),this.isPropagationStopped=rr)},persist:function(){},isPersistent:rr}),n}var ml={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ur=Cn(ml),qi=g({},ml,{view:0,detail:0}),t0=Cn(qi),Ju,Wu,Yi,or=g({},qi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:$u,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Yi&&(Yi&&e.type==="mousemove"?(Ju=e.screenX-Yi.screenX,Wu=e.screenY-Yi.screenY):Wu=Ju=0,Yi=e),Ju)},movementY:function(e){return"movementY"in e?e.movementY:Wu}}),Rf=Cn(or),l0=g({},or,{dataTransfer:0}),i0=Cn(l0),a0=g({},qi,{relatedTarget:0}),Pu=Cn(a0),r0=g({},ml,{animationName:0,elapsedTime:0,pseudoElement:0}),u0=Cn(r0),o0=g({},ml,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),s0=Cn(o0),c0=g({},ml,{data:0}),Df=Cn(c0),f0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},h0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},d0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function m0(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=d0[e])?!!n[e]:!1}function $u(){return m0}var p0=g({},qi,{key:function(e){if(e.key){var n=f0[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=ar(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?h0[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:$u,charCode:function(e){return e.type==="keypress"?ar(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ar(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),g0=Cn(p0),y0=g({},or,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Mf=Cn(y0),b0=g({},qi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:$u}),v0=Cn(b0),x0=g({},ml,{propertyName:0,elapsedTime:0,pseudoElement:0}),S0=Cn(x0),E0=g({},or,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),k0=Cn(E0),C0=g({},ml,{newState:0,oldState:0}),A0=Cn(C0),w0=[9,13,27,32],eo=xt&&"CompositionEvent"in window,Vi=null;xt&&"documentMode"in document&&(Vi=document.documentMode);var T0=xt&&"TextEvent"in window&&!Vi,_f=xt&&(!eo||Vi&&8<Vi&&11>=Vi),Of=" ",Nf=!1;function jf(e,n){switch(e){case"keyup":return w0.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Lf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Fl=!1;function z0(e,n){switch(e){case"compositionend":return Lf(n);case"keypress":return n.which!==32?null:(Nf=!0,Of);case"textInput":return e=n.data,e===Of&&Nf?null:e;default:return null}}function R0(e,n){if(Fl)return e==="compositionend"||!eo&&jf(e,n)?(e=Tf(),ir=Ku=Yt=null,Fl=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return _f&&n.locale!=="ko"?null:n.data;default:return null}}var D0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Bf(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!D0[e.type]:n==="textarea"}function Uf(e,n,l,r){Gl?Ql?Ql.push(r):Ql=[r]:Gl=r,n=Wr(n,"onChange"),0<n.length&&(l=new ur("onChange","change",null,l,r),e.push({event:l,listeners:n}))}var Xi=null,Gi=null;function M0(e){xm(e,0)}function sr(e){var n=Bi(e);if(vf(n))return e}function Hf(e,n){if(e==="change")return n}var qf=!1;if(xt){var no;if(xt){var to="oninput"in document;if(!to){var Yf=document.createElement("div");Yf.setAttribute("oninput","return;"),to=typeof Yf.oninput=="function"}no=to}else no=!1;qf=no&&(!document.documentMode||9<document.documentMode)}function Vf(){Xi&&(Xi.detachEvent("onpropertychange",Xf),Gi=Xi=null)}function Xf(e){if(e.propertyName==="value"&&sr(Gi)){var n=[];Uf(n,Gi,e,Fu(e)),wf(M0,n)}}function _0(e,n,l){e==="focusin"?(Vf(),Xi=n,Gi=l,Xi.attachEvent("onpropertychange",Xf)):e==="focusout"&&Vf()}function O0(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return sr(Gi)}function N0(e,n){if(e==="click")return sr(n)}function j0(e,n){if(e==="input"||e==="change")return sr(n)}function L0(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var On=typeof Object.is=="function"?Object.is:L0;function Qi(e,n){if(On(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var l=Object.keys(e),r=Object.keys(n);if(l.length!==r.length)return!1;for(r=0;r<l.length;r++){var o=l[r];if(!jl.call(n,o)||!On(e[o],n[o]))return!1}return!0}function Gf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Qf(e,n){var l=Gf(e);e=0;for(var r;l;){if(l.nodeType===3){if(r=e+l.textContent.length,e<=n&&r>=n)return{node:l,offset:n-e};e=r}e:{for(;l;){if(l.nextSibling){l=l.nextSibling;break e}l=l.parentNode}l=void 0}l=Gf(l)}}function Ff(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Ff(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function If(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=tr(e.document);n instanceof e.HTMLIFrameElement;){try{var l=typeof n.contentWindow.location.href=="string"}catch{l=!1}if(l)e=n.contentWindow;else break;n=tr(e.document)}return n}function lo(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var B0=xt&&"documentMode"in document&&11>=document.documentMode,Il=null,io=null,Fi=null,ao=!1;function Zf(e,n,l){var r=l.window===l?l.document:l.nodeType===9?l:l.ownerDocument;ao||Il==null||Il!==tr(r)||(r=Il,"selectionStart"in r&&lo(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Fi&&Qi(Fi,r)||(Fi=r,r=Wr(io,"onSelect"),0<r.length&&(n=new ur("onSelect","select",null,n,l),e.push({event:n,listeners:r}),n.target=Il)))}function pl(e,n){var l={};return l[e.toLowerCase()]=n.toLowerCase(),l["Webkit"+e]="webkit"+n,l["Moz"+e]="moz"+n,l}var Zl={animationend:pl("Animation","AnimationEnd"),animationiteration:pl("Animation","AnimationIteration"),animationstart:pl("Animation","AnimationStart"),transitionrun:pl("Transition","TransitionRun"),transitionstart:pl("Transition","TransitionStart"),transitioncancel:pl("Transition","TransitionCancel"),transitionend:pl("Transition","TransitionEnd")},ro={},Kf={};xt&&(Kf=document.createElement("div").style,"AnimationEvent"in window||(delete Zl.animationend.animation,delete Zl.animationiteration.animation,delete Zl.animationstart.animation),"TransitionEvent"in window||delete Zl.transitionend.transition);function gl(e){if(ro[e])return ro[e];if(!Zl[e])return e;var n=Zl[e],l;for(l in n)if(n.hasOwnProperty(l)&&l in Kf)return ro[e]=n[l];return e}var Jf=gl("animationend"),Wf=gl("animationiteration"),Pf=gl("animationstart"),U0=gl("transitionrun"),H0=gl("transitionstart"),q0=gl("transitioncancel"),$f=gl("transitionend"),eh=new Map,uo="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");uo.push("scrollEnd");function tt(e,n){eh.set(e,n),dl(n,[e])}var cr=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Qn=[],Kl=0,oo=0;function fr(){for(var e=Kl,n=oo=Kl=0;n<e;){var l=Qn[n];Qn[n++]=null;var r=Qn[n];Qn[n++]=null;var o=Qn[n];Qn[n++]=null;var h=Qn[n];if(Qn[n++]=null,r!==null&&o!==null){var y=r.pending;y===null?o.next=o:(o.next=y.next,y.next=o),r.pending=o}h!==0&&nh(l,o,h)}}function hr(e,n,l,r){Qn[Kl++]=e,Qn[Kl++]=n,Qn[Kl++]=l,Qn[Kl++]=r,oo|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function so(e,n,l,r){return hr(e,n,l,r),dr(e)}function yl(e,n){return hr(e,null,null,n),dr(e)}function nh(e,n,l){e.lanes|=l;var r=e.alternate;r!==null&&(r.lanes|=l);for(var o=!1,h=e.return;h!==null;)h.childLanes|=l,r=h.alternate,r!==null&&(r.childLanes|=l),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(o=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,o&&n!==null&&(o=31-Ye(l),e=h.hiddenUpdates,r=e[o],r===null?e[o]=[n]:r.push(n),n.lane=l|536870912),h):null}function dr(e){if(50<ma)throw ma=0,vs=null,Error(u(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Jl={};function Y0(e,n,l,r){this.tag=e,this.key=l,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Nn(e,n,l,r){return new Y0(e,n,l,r)}function co(e){return e=e.prototype,!(!e||!e.isReactComponent)}function St(e,n){var l=e.alternate;return l===null?(l=Nn(e.tag,n,e.key,e.mode),l.elementType=e.elementType,l.type=e.type,l.stateNode=e.stateNode,l.alternate=e,e.alternate=l):(l.pendingProps=n,l.type=e.type,l.flags=0,l.subtreeFlags=0,l.deletions=null),l.flags=e.flags&65011712,l.childLanes=e.childLanes,l.lanes=e.lanes,l.child=e.child,l.memoizedProps=e.memoizedProps,l.memoizedState=e.memoizedState,l.updateQueue=e.updateQueue,n=e.dependencies,l.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},l.sibling=e.sibling,l.index=e.index,l.ref=e.ref,l.refCleanup=e.refCleanup,l}function th(e,n){e.flags&=65011714;var l=e.alternate;return l===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=l.childLanes,e.lanes=l.lanes,e.child=l.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=l.memoizedProps,e.memoizedState=l.memoizedState,e.updateQueue=l.updateQueue,e.type=l.type,n=l.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function mr(e,n,l,r,o,h){var y=0;if(r=e,typeof e=="function")co(e)&&(y=1);else if(typeof e=="string")y=F1(e,l,$.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case me:return e=Nn(31,l,n,o),e.elementType=me,e.lanes=h,e;case _:return bl(l.children,o,h,n);case D:y=8,o|=24;break;case R:return e=Nn(12,l,n,o|2),e.elementType=R,e.lanes=h,e;case le:return e=Nn(13,l,n,o),e.elementType=le,e.lanes=h,e;case q:return e=Nn(19,l,n,o),e.elementType=q,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case U:y=10;break e;case X:y=9;break e;case te:y=11;break e;case P:y=14;break e;case ce:y=16,r=null;break e}y=29,l=Error(u(130,e===null?"null":typeof e,"")),r=null}return n=Nn(y,l,n,o),n.elementType=e,n.type=r,n.lanes=h,n}function bl(e,n,l,r){return e=Nn(7,e,r,n),e.lanes=l,e}function fo(e,n,l){return e=Nn(6,e,null,n),e.lanes=l,e}function lh(e){var n=Nn(18,null,null,0);return n.stateNode=e,n}function ho(e,n,l){return n=Nn(4,e.children!==null?e.children:[],e.key,n),n.lanes=l,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var ih=new WeakMap;function Fn(e,n){if(typeof e=="object"&&e!==null){var l=ih.get(e);return l!==void 0?l:(n={value:e,source:n,stack:Ka(n)},ih.set(e,n),n)}return{value:e,source:n,stack:Ka(n)}}var Wl=[],Pl=0,pr=null,Ii=0,In=[],Zn=0,Vt=null,ut=1,ot="";function Et(e,n){Wl[Pl++]=Ii,Wl[Pl++]=pr,pr=e,Ii=n}function ah(e,n,l){In[Zn++]=ut,In[Zn++]=ot,In[Zn++]=Vt,Vt=e;var r=ut;e=ot;var o=32-Ye(r)-1;r&=~(1<<o),l+=1;var h=32-Ye(n)+o;if(30<h){var y=o-o%5;h=(r&(1<<y)-1).toString(32),r>>=y,o-=y,ut=1<<32-Ye(n)+o|l<<o|r,ot=h+e}else ut=1<<h|l<<o|r,ot=e}function mo(e){e.return!==null&&(Et(e,1),ah(e,1,0))}function po(e){for(;e===pr;)pr=Wl[--Pl],Wl[Pl]=null,Ii=Wl[--Pl],Wl[Pl]=null;for(;e===Vt;)Vt=In[--Zn],In[Zn]=null,ot=In[--Zn],In[Zn]=null,ut=In[--Zn],In[Zn]=null}function rh(e,n){In[Zn++]=ut,In[Zn++]=ot,In[Zn++]=Vt,ut=n.id,ot=n.overflow,Vt=e}var fn=null,Qe=null,Re=!1,Xt=null,Kn=!1,go=Error(u(519));function Gt(e){var n=Error(u(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Zi(Fn(n,e)),go}function uh(e){var n=e.stateNode,l=e.type,r=e.memoizedProps;switch(n[cn]=e,n[kn]=r,l){case"dialog":Ce("cancel",n),Ce("close",n);break;case"iframe":case"object":case"embed":Ce("load",n);break;case"video":case"audio":for(l=0;l<ga.length;l++)Ce(ga[l],n);break;case"source":Ce("error",n);break;case"img":case"image":case"link":Ce("error",n),Ce("load",n);break;case"details":Ce("toggle",n);break;case"input":Ce("invalid",n),xf(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":Ce("invalid",n);break;case"textarea":Ce("invalid",n),Ef(n,r.value,r.defaultValue,r.children)}l=r.children,typeof l!="string"&&typeof l!="number"&&typeof l!="bigint"||n.textContent===""+l||r.suppressHydrationWarning===!0||Cm(n.textContent,l)?(r.popover!=null&&(Ce("beforetoggle",n),Ce("toggle",n)),r.onScroll!=null&&Ce("scroll",n),r.onScrollEnd!=null&&Ce("scrollend",n),r.onClick!=null&&(n.onclick=vt),n=!0):n=!1,n||Gt(e,!0)}function oh(e){for(fn=e.return;fn;)switch(fn.tag){case 5:case 31:case 13:Kn=!1;return;case 27:case 3:Kn=!0;return;default:fn=fn.return}}function $l(e){if(e!==fn)return!1;if(!Re)return oh(e),Re=!0,!1;var n=e.tag,l;if((l=n!==3&&n!==27)&&((l=n===5)&&(l=e.type,l=!(l!=="form"&&l!=="button")||Ns(e.type,e.memoizedProps)),l=!l),l&&Qe&&Gt(e),oh(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(317));Qe=Om(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(317));Qe=Om(e)}else n===27?(n=Qe,il(e.type)?(e=Hs,Hs=null,Qe=e):Qe=n):Qe=fn?Wn(e.stateNode.nextSibling):null;return!0}function vl(){Qe=fn=null,Re=!1}function yo(){var e=Xt;return e!==null&&(zn===null?zn=e:zn.push.apply(zn,e),Xt=null),e}function Zi(e){Xt===null?Xt=[e]:Xt.push(e)}var bo=T(null),xl=null,kt=null;function Qt(e,n,l){k(bo,n._currentValue),n._currentValue=l}function Ct(e){e._currentValue=bo.current,G(bo)}function vo(e,n,l){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===l)break;e=e.return}}function xo(e,n,l,r){var o=e.child;for(o!==null&&(o.return=e);o!==null;){var h=o.dependencies;if(h!==null){var y=o.child;h=h.firstContext;e:for(;h!==null;){var v=h;h=o;for(var A=0;A<n.length;A++)if(v.context===n[A]){h.lanes|=l,v=h.alternate,v!==null&&(v.lanes|=l),vo(h.return,l,e),r||(y=null);break e}h=v.next}}else if(o.tag===18){if(y=o.return,y===null)throw Error(u(341));y.lanes|=l,h=y.alternate,h!==null&&(h.lanes|=l),vo(y,l,e),y=null}else y=o.child;if(y!==null)y.return=o;else for(y=o;y!==null;){if(y===e){y=null;break}if(o=y.sibling,o!==null){o.return=y.return,y=o;break}y=y.return}o=y}}function ei(e,n,l,r){e=null;for(var o=n,h=!1;o!==null;){if(!h){if((o.flags&524288)!==0)h=!0;else if((o.flags&262144)!==0)break}if(o.tag===10){var y=o.alternate;if(y===null)throw Error(u(387));if(y=y.memoizedProps,y!==null){var v=o.type;On(o.pendingProps.value,y.value)||(e!==null?e.push(v):e=[v])}}else if(o===we.current){if(y=o.alternate,y===null)throw Error(u(387));y.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(e!==null?e.push(Sa):e=[Sa])}o=o.return}e!==null&&xo(n,e,l,r),n.flags|=262144}function gr(e){for(e=e.firstContext;e!==null;){if(!On(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Sl(e){xl=e,kt=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function hn(e){return sh(xl,e)}function yr(e,n){return xl===null&&Sl(e),sh(e,n)}function sh(e,n){var l=n._currentValue;if(n={context:n,memoizedValue:l,next:null},kt===null){if(e===null)throw Error(u(308));kt=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else kt=kt.next=n;return l}var V0=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(l,r){e.push(r)}};this.abort=function(){n.aborted=!0,e.forEach(function(l){return l()})}},X0=t.unstable_scheduleCallback,G0=t.unstable_NormalPriority,en={$$typeof:U,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function So(){return{controller:new V0,data:new Map,refCount:0}}function Ki(e){e.refCount--,e.refCount===0&&X0(G0,function(){e.controller.abort()})}var Ji=null,Eo=0,ni=0,ti=null;function Q0(e,n){if(Ji===null){var l=Ji=[];Eo=0,ni=As(),ti={status:"pending",value:void 0,then:function(r){l.push(r)}}}return Eo++,n.then(ch,ch),n}function ch(){if(--Eo===0&&Ji!==null){ti!==null&&(ti.status="fulfilled");var e=Ji;Ji=null,ni=0,ti=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function F0(e,n){var l=[],r={status:"pending",value:null,reason:null,then:function(o){l.push(o)}};return e.then(function(){r.status="fulfilled",r.value=n;for(var o=0;o<l.length;o++)(0,l[o])(n)},function(o){for(r.status="rejected",r.reason=o,o=0;o<l.length;o++)(0,l[o])(void 0)}),r}var fh=L.S;L.S=function(e,n){Zd=bn(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Q0(e,n),fh!==null&&fh(e,n)};var El=T(null);function ko(){var e=El.current;return e!==null?e:Ve.pooledCache}function br(e,n){n===null?k(El,El.current):k(El,n.pool)}function hh(){var e=ko();return e===null?null:{parent:en._currentValue,pool:e}}var li=Error(u(460)),Co=Error(u(474)),vr=Error(u(542)),xr={then:function(){}};function dh(e){return e=e.status,e==="fulfilled"||e==="rejected"}function mh(e,n,l){switch(l=e[l],l===void 0?e.push(n):l!==n&&(n.then(vt,vt),n=l),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,gh(e),e;default:if(typeof n.status=="string")n.then(vt,vt);else{if(e=Ve,e!==null&&100<e.shellSuspendCounter)throw Error(u(482));e=n,e.status="pending",e.then(function(r){if(n.status==="pending"){var o=n;o.status="fulfilled",o.value=r}},function(r){if(n.status==="pending"){var o=n;o.status="rejected",o.reason=r}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,gh(e),e}throw Cl=n,li}}function kl(e){try{var n=e._init;return n(e._payload)}catch(l){throw l!==null&&typeof l=="object"&&typeof l.then=="function"?(Cl=l,li):l}}var Cl=null;function ph(){if(Cl===null)throw Error(u(459));var e=Cl;return Cl=null,e}function gh(e){if(e===li||e===vr)throw Error(u(483))}var ii=null,Wi=0;function Sr(e){var n=Wi;return Wi+=1,ii===null&&(ii=[]),mh(ii,e,n)}function Pi(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Er(e,n){throw n.$$typeof===S?Error(u(525)):(e=Object.prototype.toString.call(n),Error(u(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function yh(e){function n(M,z){if(e){var O=M.deletions;O===null?(M.deletions=[z],M.flags|=16):O.push(z)}}function l(M,z){if(!e)return null;for(;z!==null;)n(M,z),z=z.sibling;return null}function r(M){for(var z=new Map;M!==null;)M.key!==null?z.set(M.key,M):z.set(M.index,M),M=M.sibling;return z}function o(M,z){return M=St(M,z),M.index=0,M.sibling=null,M}function h(M,z,O){return M.index=O,e?(O=M.alternate,O!==null?(O=O.index,O<z?(M.flags|=67108866,z):O):(M.flags|=67108866,z)):(M.flags|=1048576,z)}function y(M){return e&&M.alternate===null&&(M.flags|=67108866),M}function v(M,z,O,F){return z===null||z.tag!==6?(z=fo(O,M.mode,F),z.return=M,z):(z=o(z,O),z.return=M,z)}function A(M,z,O,F){var se=O.type;return se===_?Y(M,z,O.props.children,F,O.key):z!==null&&(z.elementType===se||typeof se=="object"&&se!==null&&se.$$typeof===ce&&kl(se)===z.type)?(z=o(z,O.props),Pi(z,O),z.return=M,z):(z=mr(O.type,O.key,O.props,null,M.mode,F),Pi(z,O),z.return=M,z)}function N(M,z,O,F){return z===null||z.tag!==4||z.stateNode.containerInfo!==O.containerInfo||z.stateNode.implementation!==O.implementation?(z=ho(O,M.mode,F),z.return=M,z):(z=o(z,O.children||[]),z.return=M,z)}function Y(M,z,O,F,se){return z===null||z.tag!==7?(z=bl(O,M.mode,F,se),z.return=M,z):(z=o(z,O),z.return=M,z)}function I(M,z,O){if(typeof z=="string"&&z!==""||typeof z=="number"||typeof z=="bigint")return z=fo(""+z,M.mode,O),z.return=M,z;if(typeof z=="object"&&z!==null){switch(z.$$typeof){case x:return O=mr(z.type,z.key,z.props,null,M.mode,O),Pi(O,z),O.return=M,O;case w:return z=ho(z,M.mode,O),z.return=M,z;case ce:return z=kl(z),I(M,z,O)}if(K(z)||ee(z))return z=bl(z,M.mode,O,null),z.return=M,z;if(typeof z.then=="function")return I(M,Sr(z),O);if(z.$$typeof===U)return I(M,yr(M,z),O);Er(M,z)}return null}function j(M,z,O,F){var se=z!==null?z.key:null;if(typeof O=="string"&&O!==""||typeof O=="number"||typeof O=="bigint")return se!==null?null:v(M,z,""+O,F);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case x:return O.key===se?A(M,z,O,F):null;case w:return O.key===se?N(M,z,O,F):null;case ce:return O=kl(O),j(M,z,O,F)}if(K(O)||ee(O))return se!==null?null:Y(M,z,O,F,null);if(typeof O.then=="function")return j(M,z,Sr(O),F);if(O.$$typeof===U)return j(M,z,yr(M,O),F);Er(M,O)}return null}function H(M,z,O,F,se){if(typeof F=="string"&&F!==""||typeof F=="number"||typeof F=="bigint")return M=M.get(O)||null,v(z,M,""+F,se);if(typeof F=="object"&&F!==null){switch(F.$$typeof){case x:return M=M.get(F.key===null?O:F.key)||null,A(z,M,F,se);case w:return M=M.get(F.key===null?O:F.key)||null,N(z,M,F,se);case ce:return F=kl(F),H(M,z,O,F,se)}if(K(F)||ee(F))return M=M.get(O)||null,Y(z,M,F,se,null);if(typeof F.then=="function")return H(M,z,O,Sr(F),se);if(F.$$typeof===U)return H(M,z,O,yr(z,F),se);Er(z,F)}return null}function ie(M,z,O,F){for(var se=null,Me=null,re=z,be=z=0,ze=null;re!==null&&be<O.length;be++){re.index>be?(ze=re,re=null):ze=re.sibling;var _e=j(M,re,O[be],F);if(_e===null){re===null&&(re=ze);break}e&&re&&_e.alternate===null&&n(M,re),z=h(_e,z,be),Me===null?se=_e:Me.sibling=_e,Me=_e,re=ze}if(be===O.length)return l(M,re),Re&&Et(M,be),se;if(re===null){for(;be<O.length;be++)re=I(M,O[be],F),re!==null&&(z=h(re,z,be),Me===null?se=re:Me.sibling=re,Me=re);return Re&&Et(M,be),se}for(re=r(re);be<O.length;be++)ze=H(re,M,be,O[be],F),ze!==null&&(e&&ze.alternate!==null&&re.delete(ze.key===null?be:ze.key),z=h(ze,z,be),Me===null?se=ze:Me.sibling=ze,Me=ze);return e&&re.forEach(function(sl){return n(M,sl)}),Re&&Et(M,be),se}function he(M,z,O,F){if(O==null)throw Error(u(151));for(var se=null,Me=null,re=z,be=z=0,ze=null,_e=O.next();re!==null&&!_e.done;be++,_e=O.next()){re.index>be?(ze=re,re=null):ze=re.sibling;var sl=j(M,re,_e.value,F);if(sl===null){re===null&&(re=ze);break}e&&re&&sl.alternate===null&&n(M,re),z=h(sl,z,be),Me===null?se=sl:Me.sibling=sl,Me=sl,re=ze}if(_e.done)return l(M,re),Re&&Et(M,be),se;if(re===null){for(;!_e.done;be++,_e=O.next())_e=I(M,_e.value,F),_e!==null&&(z=h(_e,z,be),Me===null?se=_e:Me.sibling=_e,Me=_e);return Re&&Et(M,be),se}for(re=r(re);!_e.done;be++,_e=O.next())_e=H(re,M,be,_e.value,F),_e!==null&&(e&&_e.alternate!==null&&re.delete(_e.key===null?be:_e.key),z=h(_e,z,be),Me===null?se=_e:Me.sibling=_e,Me=_e);return e&&re.forEach(function(lb){return n(M,lb)}),Re&&Et(M,be),se}function qe(M,z,O,F){if(typeof O=="object"&&O!==null&&O.type===_&&O.key===null&&(O=O.props.children),typeof O=="object"&&O!==null){switch(O.$$typeof){case x:e:{for(var se=O.key;z!==null;){if(z.key===se){if(se=O.type,se===_){if(z.tag===7){l(M,z.sibling),F=o(z,O.props.children),F.return=M,M=F;break e}}else if(z.elementType===se||typeof se=="object"&&se!==null&&se.$$typeof===ce&&kl(se)===z.type){l(M,z.sibling),F=o(z,O.props),Pi(F,O),F.return=M,M=F;break e}l(M,z);break}else n(M,z);z=z.sibling}O.type===_?(F=bl(O.props.children,M.mode,F,O.key),F.return=M,M=F):(F=mr(O.type,O.key,O.props,null,M.mode,F),Pi(F,O),F.return=M,M=F)}return y(M);case w:e:{for(se=O.key;z!==null;){if(z.key===se)if(z.tag===4&&z.stateNode.containerInfo===O.containerInfo&&z.stateNode.implementation===O.implementation){l(M,z.sibling),F=o(z,O.children||[]),F.return=M,M=F;break e}else{l(M,z);break}else n(M,z);z=z.sibling}F=ho(O,M.mode,F),F.return=M,M=F}return y(M);case ce:return O=kl(O),qe(M,z,O,F)}if(K(O))return ie(M,z,O,F);if(ee(O)){if(se=ee(O),typeof se!="function")throw Error(u(150));return O=se.call(O),he(M,z,O,F)}if(typeof O.then=="function")return qe(M,z,Sr(O),F);if(O.$$typeof===U)return qe(M,z,yr(M,O),F);Er(M,O)}return typeof O=="string"&&O!==""||typeof O=="number"||typeof O=="bigint"?(O=""+O,z!==null&&z.tag===6?(l(M,z.sibling),F=o(z,O),F.return=M,M=F):(l(M,z),F=fo(O,M.mode,F),F.return=M,M=F),y(M)):l(M,z)}return function(M,z,O,F){try{Wi=0;var se=qe(M,z,O,F);return ii=null,se}catch(re){if(re===li||re===vr)throw re;var Me=Nn(29,re,null,M.mode);return Me.lanes=F,Me.return=M,Me}}}var Al=yh(!0),bh=yh(!1),Ft=!1;function Ao(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function wo(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function It(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Zt(e,n,l){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(Oe&2)!==0){var o=r.pending;return o===null?n.next=n:(n.next=o.next,o.next=n),r.pending=n,n=dr(e),nh(e,null,l),n}return hr(e,r,n,l),dr(e)}function $i(e,n,l){if(n=n.updateQueue,n!==null&&(n=n.shared,(l&4194048)!==0)){var r=n.lanes;r&=e.pendingLanes,l|=r,n.lanes=l,sf(e,l)}}function To(e,n){var l=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,l===r)){var o=null,h=null;if(l=l.firstBaseUpdate,l!==null){do{var y={lane:l.lane,tag:l.tag,payload:l.payload,callback:null,next:null};h===null?o=h=y:h=h.next=y,l=l.next}while(l!==null);h===null?o=h=n:h=h.next=n}else o=h=n;l={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:h,shared:r.shared,callbacks:r.callbacks},e.updateQueue=l;return}e=l.lastBaseUpdate,e===null?l.firstBaseUpdate=n:e.next=n,l.lastBaseUpdate=n}var zo=!1;function ea(){if(zo){var e=ti;if(e!==null)throw e}}function na(e,n,l,r){zo=!1;var o=e.updateQueue;Ft=!1;var h=o.firstBaseUpdate,y=o.lastBaseUpdate,v=o.shared.pending;if(v!==null){o.shared.pending=null;var A=v,N=A.next;A.next=null,y===null?h=N:y.next=N,y=A;var Y=e.alternate;Y!==null&&(Y=Y.updateQueue,v=Y.lastBaseUpdate,v!==y&&(v===null?Y.firstBaseUpdate=N:v.next=N,Y.lastBaseUpdate=A))}if(h!==null){var I=o.baseState;y=0,Y=N=A=null,v=h;do{var j=v.lane&-536870913,H=j!==v.lane;if(H?(Te&j)===j:(r&j)===j){j!==0&&j===ni&&(zo=!0),Y!==null&&(Y=Y.next={lane:0,tag:v.tag,payload:v.payload,callback:null,next:null});e:{var ie=e,he=v;j=n;var qe=l;switch(he.tag){case 1:if(ie=he.payload,typeof ie=="function"){I=ie.call(qe,I,j);break e}I=ie;break e;case 3:ie.flags=ie.flags&-65537|128;case 0:if(ie=he.payload,j=typeof ie=="function"?ie.call(qe,I,j):ie,j==null)break e;I=g({},I,j);break e;case 2:Ft=!0}}j=v.callback,j!==null&&(e.flags|=64,H&&(e.flags|=8192),H=o.callbacks,H===null?o.callbacks=[j]:H.push(j))}else H={lane:j,tag:v.tag,payload:v.payload,callback:v.callback,next:null},Y===null?(N=Y=H,A=I):Y=Y.next=H,y|=j;if(v=v.next,v===null){if(v=o.shared.pending,v===null)break;H=v,v=H.next,H.next=null,o.lastBaseUpdate=H,o.shared.pending=null}}while(!0);Y===null&&(A=I),o.baseState=A,o.firstBaseUpdate=N,o.lastBaseUpdate=Y,h===null&&(o.shared.lanes=0),$t|=y,e.lanes=y,e.memoizedState=I}}function vh(e,n){if(typeof e!="function")throw Error(u(191,e));e.call(n)}function xh(e,n){var l=e.callbacks;if(l!==null)for(e.callbacks=null,e=0;e<l.length;e++)vh(l[e],n)}var ai=T(null),kr=T(0);function Sh(e,n){e=Ot,k(kr,e),k(ai,n),Ot=e|n.baseLanes}function Ro(){k(kr,Ot),k(ai,ai.current)}function Do(){Ot=kr.current,G(ai),G(kr)}var jn=T(null),Jn=null;function Kt(e){var n=e.alternate;k(Pe,Pe.current&1),k(jn,e),Jn===null&&(n===null||ai.current!==null||n.memoizedState!==null)&&(Jn=e)}function Mo(e){k(Pe,Pe.current),k(jn,e),Jn===null&&(Jn=e)}function Eh(e){e.tag===22?(k(Pe,Pe.current),k(jn,e),Jn===null&&(Jn=e)):Jt()}function Jt(){k(Pe,Pe.current),k(jn,jn.current)}function Ln(e){G(jn),Jn===e&&(Jn=null),G(Pe)}var Pe=T(0);function Cr(e){for(var n=e;n!==null;){if(n.tag===13){var l=n.memoizedState;if(l!==null&&(l=l.dehydrated,l===null||Bs(l)||Us(l)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var At=0,ye=null,Ue=null,nn=null,Ar=!1,ri=!1,wl=!1,wr=0,ta=0,ui=null,I0=0;function Je(){throw Error(u(321))}function _o(e,n){if(n===null)return!1;for(var l=0;l<n.length&&l<e.length;l++)if(!On(e[l],n[l]))return!1;return!0}function Oo(e,n,l,r,o,h){return At=h,ye=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,L.H=e===null||e.memoizedState===null?ad:Zo,wl=!1,h=l(r,o),wl=!1,ri&&(h=Ch(n,l,r,o)),kh(e),h}function kh(e){L.H=aa;var n=Ue!==null&&Ue.next!==null;if(At=0,nn=Ue=ye=null,Ar=!1,ta=0,ui=null,n)throw Error(u(300));e===null||tn||(e=e.dependencies,e!==null&&gr(e)&&(tn=!0))}function Ch(e,n,l,r){ye=e;var o=0;do{if(ri&&(ui=null),ta=0,ri=!1,25<=o)throw Error(u(301));if(o+=1,nn=Ue=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}L.H=rd,h=n(l,r)}while(ri);return h}function Z0(){var e=L.H,n=e.useState()[0];return n=typeof n.then=="function"?la(n):n,e=e.useState()[0],(Ue!==null?Ue.memoizedState:null)!==e&&(ye.flags|=1024),n}function No(){var e=wr!==0;return wr=0,e}function jo(e,n,l){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~l}function Lo(e){if(Ar){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Ar=!1}At=0,nn=Ue=ye=null,ri=!1,ta=wr=0,ui=null}function xn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return nn===null?ye.memoizedState=nn=e:nn=nn.next=e,nn}function $e(){if(Ue===null){var e=ye.alternate;e=e!==null?e.memoizedState:null}else e=Ue.next;var n=nn===null?ye.memoizedState:nn.next;if(n!==null)nn=n,Ue=e;else{if(e===null)throw ye.alternate===null?Error(u(467)):Error(u(310));Ue=e,e={memoizedState:Ue.memoizedState,baseState:Ue.baseState,baseQueue:Ue.baseQueue,queue:Ue.queue,next:null},nn===null?ye.memoizedState=nn=e:nn=nn.next=e}return nn}function Tr(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function la(e){var n=ta;return ta+=1,ui===null&&(ui=[]),e=mh(ui,e,n),n=ye,(nn===null?n.memoizedState:nn.next)===null&&(n=n.alternate,L.H=n===null||n.memoizedState===null?ad:Zo),e}function zr(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return la(e);if(e.$$typeof===U)return hn(e)}throw Error(u(438,String(e)))}function Bo(e){var n=null,l=ye.updateQueue;if(l!==null&&(n=l.memoCache),n==null){var r=ye.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(n={data:r.data.map(function(o){return o.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),l===null&&(l=Tr(),ye.updateQueue=l),l.memoCache=n,l=n.data[n.index],l===void 0)for(l=n.data[n.index]=Array(e),r=0;r<e;r++)l[r]=B;return n.index++,l}function wt(e,n){return typeof n=="function"?n(e):n}function Rr(e){var n=$e();return Uo(n,Ue,e)}function Uo(e,n,l){var r=e.queue;if(r===null)throw Error(u(311));r.lastRenderedReducer=l;var o=e.baseQueue,h=r.pending;if(h!==null){if(o!==null){var y=o.next;o.next=h.next,h.next=y}n.baseQueue=o=h,r.pending=null}if(h=e.baseState,o===null)e.memoizedState=h;else{n=o.next;var v=y=null,A=null,N=n,Y=!1;do{var I=N.lane&-536870913;if(I!==N.lane?(Te&I)===I:(At&I)===I){var j=N.revertLane;if(j===0)A!==null&&(A=A.next={lane:0,revertLane:0,gesture:null,action:N.action,hasEagerState:N.hasEagerState,eagerState:N.eagerState,next:null}),I===ni&&(Y=!0);else if((At&j)===j){N=N.next,j===ni&&(Y=!0);continue}else I={lane:0,revertLane:N.revertLane,gesture:null,action:N.action,hasEagerState:N.hasEagerState,eagerState:N.eagerState,next:null},A===null?(v=A=I,y=h):A=A.next=I,ye.lanes|=j,$t|=j;I=N.action,wl&&l(h,I),h=N.hasEagerState?N.eagerState:l(h,I)}else j={lane:I,revertLane:N.revertLane,gesture:N.gesture,action:N.action,hasEagerState:N.hasEagerState,eagerState:N.eagerState,next:null},A===null?(v=A=j,y=h):A=A.next=j,ye.lanes|=I,$t|=I;N=N.next}while(N!==null&&N!==n);if(A===null?y=h:A.next=v,!On(h,e.memoizedState)&&(tn=!0,Y&&(l=ti,l!==null)))throw l;e.memoizedState=h,e.baseState=y,e.baseQueue=A,r.lastRenderedState=h}return o===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Ho(e){var n=$e(),l=n.queue;if(l===null)throw Error(u(311));l.lastRenderedReducer=e;var r=l.dispatch,o=l.pending,h=n.memoizedState;if(o!==null){l.pending=null;var y=o=o.next;do h=e(h,y.action),y=y.next;while(y!==o);On(h,n.memoizedState)||(tn=!0),n.memoizedState=h,n.baseQueue===null&&(n.baseState=h),l.lastRenderedState=h}return[h,r]}function Ah(e,n,l){var r=ye,o=$e(),h=Re;if(h){if(l===void 0)throw Error(u(407));l=l()}else l=n();var y=!On((Ue||o).memoizedState,l);if(y&&(o.memoizedState=l,tn=!0),o=o.queue,Vo(zh.bind(null,r,o,e),[e]),o.getSnapshot!==n||y||nn!==null&&nn.memoizedState.tag&1){if(r.flags|=2048,oi(9,{destroy:void 0},Th.bind(null,r,o,l,n),null),Ve===null)throw Error(u(349));h||(At&127)!==0||wh(r,n,l)}return l}function wh(e,n,l){e.flags|=16384,e={getSnapshot:n,value:l},n=ye.updateQueue,n===null?(n=Tr(),ye.updateQueue=n,n.stores=[e]):(l=n.stores,l===null?n.stores=[e]:l.push(e))}function Th(e,n,l,r){n.value=l,n.getSnapshot=r,Rh(n)&&Dh(e)}function zh(e,n,l){return l(function(){Rh(n)&&Dh(e)})}function Rh(e){var n=e.getSnapshot;e=e.value;try{var l=n();return!On(e,l)}catch{return!0}}function Dh(e){var n=yl(e,2);n!==null&&Rn(n,e,2)}function qo(e){var n=xn();if(typeof e=="function"){var l=e;if(e=l(),wl){En(!0);try{l()}finally{En(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:wt,lastRenderedState:e},n}function Mh(e,n,l,r){return e.baseState=l,Uo(e,Ue,typeof r=="function"?r:wt)}function K0(e,n,l,r,o){if(_r(e))throw Error(u(485));if(e=n.action,e!==null){var h={payload:o,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){h.listeners.push(y)}};L.T!==null?l(!0):h.isTransition=!1,r(h),l=n.pending,l===null?(h.next=n.pending=h,_h(n,h)):(h.next=l.next,n.pending=l.next=h)}}function _h(e,n){var l=n.action,r=n.payload,o=e.state;if(n.isTransition){var h=L.T,y={};L.T=y;try{var v=l(o,r),A=L.S;A!==null&&A(y,v),Oh(e,n,v)}catch(N){Yo(e,n,N)}finally{h!==null&&y.types!==null&&(h.types=y.types),L.T=h}}else try{h=l(o,r),Oh(e,n,h)}catch(N){Yo(e,n,N)}}function Oh(e,n,l){l!==null&&typeof l=="object"&&typeof l.then=="function"?l.then(function(r){Nh(e,n,r)},function(r){return Yo(e,n,r)}):Nh(e,n,l)}function Nh(e,n,l){n.status="fulfilled",n.value=l,jh(n),e.state=l,n=e.pending,n!==null&&(l=n.next,l===n?e.pending=null:(l=l.next,n.next=l,_h(e,l)))}function Yo(e,n,l){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do n.status="rejected",n.reason=l,jh(n),n=n.next;while(n!==r)}e.action=null}function jh(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function Lh(e,n){return n}function Bh(e,n){if(Re){var l=Ve.formState;if(l!==null){e:{var r=ye;if(Re){if(Qe){n:{for(var o=Qe,h=Kn;o.nodeType!==8;){if(!h){o=null;break n}if(o=Wn(o.nextSibling),o===null){o=null;break n}}h=o.data,o=h==="F!"||h==="F"?o:null}if(o){Qe=Wn(o.nextSibling),r=o.data==="F!";break e}}Gt(r)}r=!1}r&&(n=l[0])}}return l=xn(),l.memoizedState=l.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Lh,lastRenderedState:n},l.queue=r,l=td.bind(null,ye,r),r.dispatch=l,r=qo(!1),h=Io.bind(null,ye,!1,r.queue),r=xn(),o={state:n,dispatch:null,action:e,pending:null},r.queue=o,l=K0.bind(null,ye,o,h,l),o.dispatch=l,r.memoizedState=e,[n,l,!1]}function Uh(e){var n=$e();return Hh(n,Ue,e)}function Hh(e,n,l){if(n=Uo(e,n,Lh)[0],e=Rr(wt)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var r=la(n)}catch(y){throw y===li?vr:y}else r=n;n=$e();var o=n.queue,h=o.dispatch;return l!==n.memoizedState&&(ye.flags|=2048,oi(9,{destroy:void 0},J0.bind(null,o,l),null)),[r,h,e]}function J0(e,n){e.action=n}function qh(e){var n=$e(),l=Ue;if(l!==null)return Hh(n,l,e);$e(),n=n.memoizedState,l=$e();var r=l.queue.dispatch;return l.memoizedState=e,[n,r,!1]}function oi(e,n,l,r){return e={tag:e,create:l,deps:r,inst:n,next:null},n=ye.updateQueue,n===null&&(n=Tr(),ye.updateQueue=n),l=n.lastEffect,l===null?n.lastEffect=e.next=e:(r=l.next,l.next=e,e.next=r,n.lastEffect=e),e}function Yh(){return $e().memoizedState}function Dr(e,n,l,r){var o=xn();ye.flags|=e,o.memoizedState=oi(1|n,{destroy:void 0},l,r===void 0?null:r)}function Mr(e,n,l,r){var o=$e();r=r===void 0?null:r;var h=o.memoizedState.inst;Ue!==null&&r!==null&&_o(r,Ue.memoizedState.deps)?o.memoizedState=oi(n,h,l,r):(ye.flags|=e,o.memoizedState=oi(1|n,h,l,r))}function Vh(e,n){Dr(8390656,8,e,n)}function Vo(e,n){Mr(2048,8,e,n)}function W0(e){ye.flags|=4;var n=ye.updateQueue;if(n===null)n=Tr(),ye.updateQueue=n,n.events=[e];else{var l=n.events;l===null?n.events=[e]:l.push(e)}}function Xh(e){var n=$e().memoizedState;return W0({ref:n,nextImpl:e}),function(){if((Oe&2)!==0)throw Error(u(440));return n.impl.apply(void 0,arguments)}}function Gh(e,n){return Mr(4,2,e,n)}function Qh(e,n){return Mr(4,4,e,n)}function Fh(e,n){if(typeof n=="function"){e=e();var l=n(e);return function(){typeof l=="function"?l():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Ih(e,n,l){l=l!=null?l.concat([e]):null,Mr(4,4,Fh.bind(null,n,e),l)}function Xo(){}function Zh(e,n){var l=$e();n=n===void 0?null:n;var r=l.memoizedState;return n!==null&&_o(n,r[1])?r[0]:(l.memoizedState=[e,n],e)}function Kh(e,n){var l=$e();n=n===void 0?null:n;var r=l.memoizedState;if(n!==null&&_o(n,r[1]))return r[0];if(r=e(),wl){En(!0);try{e()}finally{En(!1)}}return l.memoizedState=[r,n],r}function Go(e,n,l){return l===void 0||(At&1073741824)!==0&&(Te&261930)===0?e.memoizedState=n:(e.memoizedState=l,e=Jd(),ye.lanes|=e,$t|=e,l)}function Jh(e,n,l,r){return On(l,n)?l:ai.current!==null?(e=Go(e,l,r),On(e,n)||(tn=!0),e):(At&42)===0||(At&1073741824)!==0&&(Te&261930)===0?(tn=!0,e.memoizedState=l):(e=Jd(),ye.lanes|=e,$t|=e,n)}function Wh(e,n,l,r,o){var h=Z.p;Z.p=h!==0&&8>h?h:8;var y=L.T,v={};L.T=v,Io(e,!1,n,l);try{var A=o(),N=L.S;if(N!==null&&N(v,A),A!==null&&typeof A=="object"&&typeof A.then=="function"){var Y=F0(A,r);ia(e,n,Y,Hn(e))}else ia(e,n,r,Hn(e))}catch(I){ia(e,n,{then:function(){},status:"rejected",reason:I},Hn())}finally{Z.p=h,y!==null&&v.types!==null&&(y.types=v.types),L.T=y}}function P0(){}function Qo(e,n,l,r){if(e.tag!==5)throw Error(u(476));var o=Ph(e).queue;Wh(e,o,n,ue,l===null?P0:function(){return $h(e),l(r)})}function Ph(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:ue,baseState:ue,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:wt,lastRenderedState:ue},next:null};var l={};return n.next={memoizedState:l,baseState:l,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:wt,lastRenderedState:l},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function $h(e){var n=Ph(e);n.next===null&&(n=e.alternate.memoizedState),ia(e,n.next.queue,{},Hn())}function Fo(){return hn(Sa)}function ed(){return $e().memoizedState}function nd(){return $e().memoizedState}function $0(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var l=Hn();e=It(l);var r=Zt(n,e,l);r!==null&&(Rn(r,n,l),$i(r,n,l)),n={cache:So()},e.payload=n;return}n=n.return}}function e1(e,n,l){var r=Hn();l={lane:r,revertLane:0,gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},_r(e)?ld(n,l):(l=so(e,n,l,r),l!==null&&(Rn(l,e,r),id(l,n,r)))}function td(e,n,l){var r=Hn();ia(e,n,l,r)}function ia(e,n,l,r){var o={lane:r,revertLane:0,gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null};if(_r(e))ld(n,o);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=n.lastRenderedReducer,h!==null))try{var y=n.lastRenderedState,v=h(y,l);if(o.hasEagerState=!0,o.eagerState=v,On(v,y))return hr(e,n,o,0),Ve===null&&fr(),!1}catch{}if(l=so(e,n,o,r),l!==null)return Rn(l,e,r),id(l,n,r),!0}return!1}function Io(e,n,l,r){if(r={lane:2,revertLane:As(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},_r(e)){if(n)throw Error(u(479))}else n=so(e,l,r,2),n!==null&&Rn(n,e,2)}function _r(e){var n=e.alternate;return e===ye||n!==null&&n===ye}function ld(e,n){ri=Ar=!0;var l=e.pending;l===null?n.next=n:(n.next=l.next,l.next=n),e.pending=n}function id(e,n,l){if((l&4194048)!==0){var r=n.lanes;r&=e.pendingLanes,l|=r,n.lanes=l,sf(e,l)}}var aa={readContext:hn,use:zr,useCallback:Je,useContext:Je,useEffect:Je,useImperativeHandle:Je,useLayoutEffect:Je,useInsertionEffect:Je,useMemo:Je,useReducer:Je,useRef:Je,useState:Je,useDebugValue:Je,useDeferredValue:Je,useTransition:Je,useSyncExternalStore:Je,useId:Je,useHostTransitionStatus:Je,useFormState:Je,useActionState:Je,useOptimistic:Je,useMemoCache:Je,useCacheRefresh:Je};aa.useEffectEvent=Je;var ad={readContext:hn,use:zr,useCallback:function(e,n){return xn().memoizedState=[e,n===void 0?null:n],e},useContext:hn,useEffect:Vh,useImperativeHandle:function(e,n,l){l=l!=null?l.concat([e]):null,Dr(4194308,4,Fh.bind(null,n,e),l)},useLayoutEffect:function(e,n){return Dr(4194308,4,e,n)},useInsertionEffect:function(e,n){Dr(4,2,e,n)},useMemo:function(e,n){var l=xn();n=n===void 0?null:n;var r=e();if(wl){En(!0);try{e()}finally{En(!1)}}return l.memoizedState=[r,n],r},useReducer:function(e,n,l){var r=xn();if(l!==void 0){var o=l(n);if(wl){En(!0);try{l(n)}finally{En(!1)}}}else o=n;return r.memoizedState=r.baseState=o,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:o},r.queue=e,e=e.dispatch=e1.bind(null,ye,e),[r.memoizedState,e]},useRef:function(e){var n=xn();return e={current:e},n.memoizedState=e},useState:function(e){e=qo(e);var n=e.queue,l=td.bind(null,ye,n);return n.dispatch=l,[e.memoizedState,l]},useDebugValue:Xo,useDeferredValue:function(e,n){var l=xn();return Go(l,e,n)},useTransition:function(){var e=qo(!1);return e=Wh.bind(null,ye,e.queue,!0,!1),xn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,l){var r=ye,o=xn();if(Re){if(l===void 0)throw Error(u(407));l=l()}else{if(l=n(),Ve===null)throw Error(u(349));(Te&127)!==0||wh(r,n,l)}o.memoizedState=l;var h={value:l,getSnapshot:n};return o.queue=h,Vh(zh.bind(null,r,h,e),[e]),r.flags|=2048,oi(9,{destroy:void 0},Th.bind(null,r,h,l,n),null),l},useId:function(){var e=xn(),n=Ve.identifierPrefix;if(Re){var l=ot,r=ut;l=(r&~(1<<32-Ye(r)-1)).toString(32)+l,n="_"+n+"R_"+l,l=wr++,0<l&&(n+="H"+l.toString(32)),n+="_"}else l=I0++,n="_"+n+"r_"+l.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:Fo,useFormState:Bh,useActionState:Bh,useOptimistic:function(e){var n=xn();n.memoizedState=n.baseState=e;var l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=l,n=Io.bind(null,ye,!0,l),l.dispatch=n,[e,n]},useMemoCache:Bo,useCacheRefresh:function(){return xn().memoizedState=$0.bind(null,ye)},useEffectEvent:function(e){var n=xn(),l={impl:e};return n.memoizedState=l,function(){if((Oe&2)!==0)throw Error(u(440));return l.impl.apply(void 0,arguments)}}},Zo={readContext:hn,use:zr,useCallback:Zh,useContext:hn,useEffect:Vo,useImperativeHandle:Ih,useInsertionEffect:Gh,useLayoutEffect:Qh,useMemo:Kh,useReducer:Rr,useRef:Yh,useState:function(){return Rr(wt)},useDebugValue:Xo,useDeferredValue:function(e,n){var l=$e();return Jh(l,Ue.memoizedState,e,n)},useTransition:function(){var e=Rr(wt)[0],n=$e().memoizedState;return[typeof e=="boolean"?e:la(e),n]},useSyncExternalStore:Ah,useId:ed,useHostTransitionStatus:Fo,useFormState:Uh,useActionState:Uh,useOptimistic:function(e,n){var l=$e();return Mh(l,Ue,e,n)},useMemoCache:Bo,useCacheRefresh:nd};Zo.useEffectEvent=Xh;var rd={readContext:hn,use:zr,useCallback:Zh,useContext:hn,useEffect:Vo,useImperativeHandle:Ih,useInsertionEffect:Gh,useLayoutEffect:Qh,useMemo:Kh,useReducer:Ho,useRef:Yh,useState:function(){return Ho(wt)},useDebugValue:Xo,useDeferredValue:function(e,n){var l=$e();return Ue===null?Go(l,e,n):Jh(l,Ue.memoizedState,e,n)},useTransition:function(){var e=Ho(wt)[0],n=$e().memoizedState;return[typeof e=="boolean"?e:la(e),n]},useSyncExternalStore:Ah,useId:ed,useHostTransitionStatus:Fo,useFormState:qh,useActionState:qh,useOptimistic:function(e,n){var l=$e();return Ue!==null?Mh(l,Ue,e,n):(l.baseState=e,[e,l.queue.dispatch])},useMemoCache:Bo,useCacheRefresh:nd};rd.useEffectEvent=Xh;function Ko(e,n,l,r){n=e.memoizedState,l=l(r,n),l=l==null?n:g({},n,l),e.memoizedState=l,e.lanes===0&&(e.updateQueue.baseState=l)}var Jo={enqueueSetState:function(e,n,l){e=e._reactInternals;var r=Hn(),o=It(r);o.payload=n,l!=null&&(o.callback=l),n=Zt(e,o,r),n!==null&&(Rn(n,e,r),$i(n,e,r))},enqueueReplaceState:function(e,n,l){e=e._reactInternals;var r=Hn(),o=It(r);o.tag=1,o.payload=n,l!=null&&(o.callback=l),n=Zt(e,o,r),n!==null&&(Rn(n,e,r),$i(n,e,r))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var l=Hn(),r=It(l);r.tag=2,n!=null&&(r.callback=n),n=Zt(e,r,l),n!==null&&(Rn(n,e,l),$i(n,e,l))}};function ud(e,n,l,r,o,h,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,h,y):n.prototype&&n.prototype.isPureReactComponent?!Qi(l,r)||!Qi(o,h):!0}function od(e,n,l,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(l,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(l,r),n.state!==e&&Jo.enqueueReplaceState(n,n.state,null)}function Tl(e,n){var l=n;if("ref"in n){l={};for(var r in n)r!=="ref"&&(l[r]=n[r])}if(e=e.defaultProps){l===n&&(l=g({},l));for(var o in e)l[o]===void 0&&(l[o]=e[o])}return l}function sd(e){cr(e)}function cd(e){console.error(e)}function fd(e){cr(e)}function Or(e,n){try{var l=e.onUncaughtError;l(n.value,{componentStack:n.stack})}catch(r){setTimeout(function(){throw r})}}function hd(e,n,l){try{var r=e.onCaughtError;r(l.value,{componentStack:l.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(o){setTimeout(function(){throw o})}}function Wo(e,n,l){return l=It(l),l.tag=3,l.payload={element:null},l.callback=function(){Or(e,n)},l}function dd(e){return e=It(e),e.tag=3,e}function md(e,n,l,r){var o=l.type.getDerivedStateFromError;if(typeof o=="function"){var h=r.value;e.payload=function(){return o(h)},e.callback=function(){hd(n,l,r)}}var y=l.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){hd(n,l,r),typeof o!="function"&&(el===null?el=new Set([this]):el.add(this));var v=r.stack;this.componentDidCatch(r.value,{componentStack:v!==null?v:""})})}function n1(e,n,l,r,o){if(l.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(n=l.alternate,n!==null&&ei(n,l,o,!0),l=jn.current,l!==null){switch(l.tag){case 31:case 13:return Jn===null?Qr():l.alternate===null&&We===0&&(We=3),l.flags&=-257,l.flags|=65536,l.lanes=o,r===xr?l.flags|=16384:(n=l.updateQueue,n===null?l.updateQueue=new Set([r]):n.add(r),Es(e,r,o)),!1;case 22:return l.flags|=65536,r===xr?l.flags|=16384:(n=l.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([r])},l.updateQueue=n):(l=n.retryQueue,l===null?n.retryQueue=new Set([r]):l.add(r)),Es(e,r,o)),!1}throw Error(u(435,l.tag))}return Es(e,r,o),Qr(),!1}if(Re)return n=jn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=o,r!==go&&(e=Error(u(422),{cause:r}),Zi(Fn(e,l)))):(r!==go&&(n=Error(u(423),{cause:r}),Zi(Fn(n,l))),e=e.current.alternate,e.flags|=65536,o&=-o,e.lanes|=o,r=Fn(r,l),o=Wo(e.stateNode,r,o),To(e,o),We!==4&&(We=2)),!1;var h=Error(u(520),{cause:r});if(h=Fn(h,l),da===null?da=[h]:da.push(h),We!==4&&(We=2),n===null)return!0;r=Fn(r,l),l=n;do{switch(l.tag){case 3:return l.flags|=65536,e=o&-o,l.lanes|=e,e=Wo(l.stateNode,r,e),To(l,e),!1;case 1:if(n=l.type,h=l.stateNode,(l.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(el===null||!el.has(h))))return l.flags|=65536,o&=-o,l.lanes|=o,o=dd(o),md(o,e,l,r),To(l,o),!1}l=l.return}while(l!==null);return!1}var Po=Error(u(461)),tn=!1;function dn(e,n,l,r){n.child=e===null?bh(n,null,l,r):Al(n,e.child,l,r)}function pd(e,n,l,r,o){l=l.render;var h=n.ref;if("ref"in r){var y={};for(var v in r)v!=="ref"&&(y[v]=r[v])}else y=r;return Sl(n),r=Oo(e,n,l,y,h,o),v=No(),e!==null&&!tn?(jo(e,n,o),Tt(e,n,o)):(Re&&v&&mo(n),n.flags|=1,dn(e,n,r,o),n.child)}function gd(e,n,l,r,o){if(e===null){var h=l.type;return typeof h=="function"&&!co(h)&&h.defaultProps===void 0&&l.compare===null?(n.tag=15,n.type=h,yd(e,n,h,r,o)):(e=mr(l.type,null,r,n,n.mode,o),e.ref=n.ref,e.return=n,n.child=e)}if(h=e.child,!rs(e,o)){var y=h.memoizedProps;if(l=l.compare,l=l!==null?l:Qi,l(y,r)&&e.ref===n.ref)return Tt(e,n,o)}return n.flags|=1,e=St(h,r),e.ref=n.ref,e.return=n,n.child=e}function yd(e,n,l,r,o){if(e!==null){var h=e.memoizedProps;if(Qi(h,r)&&e.ref===n.ref)if(tn=!1,n.pendingProps=r=h,rs(e,o))(e.flags&131072)!==0&&(tn=!0);else return n.lanes=e.lanes,Tt(e,n,o)}return $o(e,n,l,r,o)}function bd(e,n,l,r){var o=r.children,h=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode==="hidden"){if((n.flags&128)!==0){if(h=h!==null?h.baseLanes|l:l,e!==null){for(r=n.child=e.child,o=0;r!==null;)o=o|r.lanes|r.childLanes,r=r.sibling;r=o&~h}else r=0,n.child=null;return vd(e,n,h,l,r)}if((l&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&br(n,h!==null?h.cachePool:null),h!==null?Sh(n,h):Ro(),Eh(n);else return r=n.lanes=536870912,vd(e,n,h!==null?h.baseLanes|l:l,l,r)}else h!==null?(br(n,h.cachePool),Sh(n,h),Jt(),n.memoizedState=null):(e!==null&&br(n,null),Ro(),Jt());return dn(e,n,o,l),n.child}function ra(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function vd(e,n,l,r,o){var h=ko();return h=h===null?null:{parent:en._currentValue,pool:h},n.memoizedState={baseLanes:l,cachePool:h},e!==null&&br(n,null),Ro(),Eh(n),e!==null&&ei(e,n,r,!0),n.childLanes=o,null}function Nr(e,n){return n=Lr({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function xd(e,n,l){return Al(n,e.child,null,l),e=Nr(n,n.pendingProps),e.flags|=2,Ln(n),n.memoizedState=null,e}function t1(e,n,l){var r=n.pendingProps,o=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Re){if(r.mode==="hidden")return e=Nr(n,r),n.lanes=536870912,ra(null,e);if(Mo(n),(e=Qe)?(e=_m(e,Kn),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Vt!==null?{id:ut,overflow:ot}:null,retryLane:536870912,hydrationErrors:null},l=lh(e),l.return=n,n.child=l,fn=n,Qe=null)):e=null,e===null)throw Gt(n);return n.lanes=536870912,null}return Nr(n,r)}var h=e.memoizedState;if(h!==null){var y=h.dehydrated;if(Mo(n),o)if(n.flags&256)n.flags&=-257,n=xd(e,n,l);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(u(558));else if(tn||ei(e,n,l,!1),o=(l&e.childLanes)!==0,tn||o){if(r=Ve,r!==null&&(y=cf(r,l),y!==0&&y!==h.retryLane))throw h.retryLane=y,yl(e,y),Rn(r,e,y),Po;Qr(),n=xd(e,n,l)}else e=h.treeContext,Qe=Wn(y.nextSibling),fn=n,Re=!0,Xt=null,Kn=!1,e!==null&&rh(n,e),n=Nr(n,r),n.flags|=4096;return n}return e=St(e.child,{mode:r.mode,children:r.children}),e.ref=n.ref,n.child=e,e.return=n,e}function jr(e,n){var l=n.ref;if(l===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof l!="function"&&typeof l!="object")throw Error(u(284));(e===null||e.ref!==l)&&(n.flags|=4194816)}}function $o(e,n,l,r,o){return Sl(n),l=Oo(e,n,l,r,void 0,o),r=No(),e!==null&&!tn?(jo(e,n,o),Tt(e,n,o)):(Re&&r&&mo(n),n.flags|=1,dn(e,n,l,o),n.child)}function Sd(e,n,l,r,o,h){return Sl(n),n.updateQueue=null,l=Ch(n,r,l,o),kh(e),r=No(),e!==null&&!tn?(jo(e,n,h),Tt(e,n,h)):(Re&&r&&mo(n),n.flags|=1,dn(e,n,l,h),n.child)}function Ed(e,n,l,r,o){if(Sl(n),n.stateNode===null){var h=Jl,y=l.contextType;typeof y=="object"&&y!==null&&(h=hn(y)),h=new l(r,h),n.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=Jo,n.stateNode=h,h._reactInternals=n,h=n.stateNode,h.props=r,h.state=n.memoizedState,h.refs={},Ao(n),y=l.contextType,h.context=typeof y=="object"&&y!==null?hn(y):Jl,h.state=n.memoizedState,y=l.getDerivedStateFromProps,typeof y=="function"&&(Ko(n,l,y,r),h.state=n.memoizedState),typeof l.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(y=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),y!==h.state&&Jo.enqueueReplaceState(h,h.state,null),na(n,r,h,o),ea(),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308),r=!0}else if(e===null){h=n.stateNode;var v=n.memoizedProps,A=Tl(l,v);h.props=A;var N=h.context,Y=l.contextType;y=Jl,typeof Y=="object"&&Y!==null&&(y=hn(Y));var I=l.getDerivedStateFromProps;Y=typeof I=="function"||typeof h.getSnapshotBeforeUpdate=="function",v=n.pendingProps!==v,Y||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(v||N!==y)&&od(n,h,r,y),Ft=!1;var j=n.memoizedState;h.state=j,na(n,r,h,o),ea(),N=n.memoizedState,v||j!==N||Ft?(typeof I=="function"&&(Ko(n,l,I,r),N=n.memoizedState),(A=Ft||ud(n,l,A,r,j,N,y))?(Y||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(n.flags|=4194308)):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=N),h.props=r,h.state=N,h.context=y,r=A):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{h=n.stateNode,wo(e,n),y=n.memoizedProps,Y=Tl(l,y),h.props=Y,I=n.pendingProps,j=h.context,N=l.contextType,A=Jl,typeof N=="object"&&N!==null&&(A=hn(N)),v=l.getDerivedStateFromProps,(N=typeof v=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(y!==I||j!==A)&&od(n,h,r,A),Ft=!1,j=n.memoizedState,h.state=j,na(n,r,h,o),ea();var H=n.memoizedState;y!==I||j!==H||Ft||e!==null&&e.dependencies!==null&&gr(e.dependencies)?(typeof v=="function"&&(Ko(n,l,v,r),H=n.memoizedState),(Y=Ft||ud(n,l,Y,r,j,H,A)||e!==null&&e.dependencies!==null&&gr(e.dependencies))?(N||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(r,H,A),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(r,H,A)),typeof h.componentDidUpdate=="function"&&(n.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof h.componentDidUpdate!="function"||y===e.memoizedProps&&j===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&j===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=H),h.props=r,h.state=H,h.context=A,r=Y):(typeof h.componentDidUpdate!="function"||y===e.memoizedProps&&j===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&j===e.memoizedState||(n.flags|=1024),r=!1)}return h=r,jr(e,n),r=(n.flags&128)!==0,h||r?(h=n.stateNode,l=r&&typeof l.getDerivedStateFromError!="function"?null:h.render(),n.flags|=1,e!==null&&r?(n.child=Al(n,e.child,null,o),n.child=Al(n,null,l,o)):dn(e,n,l,o),n.memoizedState=h.state,e=n.child):e=Tt(e,n,o),e}function kd(e,n,l,r){return vl(),n.flags|=256,dn(e,n,l,r),n.child}var es={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function ns(e){return{baseLanes:e,cachePool:hh()}}function ts(e,n,l){return e=e!==null?e.childLanes&~l:0,n&&(e|=Un),e}function Cd(e,n,l){var r=n.pendingProps,o=!1,h=(n.flags&128)!==0,y;if((y=h)||(y=e!==null&&e.memoizedState===null?!1:(Pe.current&2)!==0),y&&(o=!0,n.flags&=-129),y=(n.flags&32)!==0,n.flags&=-33,e===null){if(Re){if(o?Kt(n):Jt(),(e=Qe)?(e=_m(e,Kn),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Vt!==null?{id:ut,overflow:ot}:null,retryLane:536870912,hydrationErrors:null},l=lh(e),l.return=n,n.child=l,fn=n,Qe=null)):e=null,e===null)throw Gt(n);return Us(e)?n.lanes=32:n.lanes=536870912,null}var v=r.children;return r=r.fallback,o?(Jt(),o=n.mode,v=Lr({mode:"hidden",children:v},o),r=bl(r,o,l,null),v.return=n,r.return=n,v.sibling=r,n.child=v,r=n.child,r.memoizedState=ns(l),r.childLanes=ts(e,y,l),n.memoizedState=es,ra(null,r)):(Kt(n),ls(n,v))}var A=e.memoizedState;if(A!==null&&(v=A.dehydrated,v!==null)){if(h)n.flags&256?(Kt(n),n.flags&=-257,n=is(e,n,l)):n.memoizedState!==null?(Jt(),n.child=e.child,n.flags|=128,n=null):(Jt(),v=r.fallback,o=n.mode,r=Lr({mode:"visible",children:r.children},o),v=bl(v,o,l,null),v.flags|=2,r.return=n,v.return=n,r.sibling=v,n.child=r,Al(n,e.child,null,l),r=n.child,r.memoizedState=ns(l),r.childLanes=ts(e,y,l),n.memoizedState=es,n=ra(null,r));else if(Kt(n),Us(v)){if(y=v.nextSibling&&v.nextSibling.dataset,y)var N=y.dgst;y=N,r=Error(u(419)),r.stack="",r.digest=y,Zi({value:r,source:null,stack:null}),n=is(e,n,l)}else if(tn||ei(e,n,l,!1),y=(l&e.childLanes)!==0,tn||y){if(y=Ve,y!==null&&(r=cf(y,l),r!==0&&r!==A.retryLane))throw A.retryLane=r,yl(e,r),Rn(y,e,r),Po;Bs(v)||Qr(),n=is(e,n,l)}else Bs(v)?(n.flags|=192,n.child=e.child,n=null):(e=A.treeContext,Qe=Wn(v.nextSibling),fn=n,Re=!0,Xt=null,Kn=!1,e!==null&&rh(n,e),n=ls(n,r.children),n.flags|=4096);return n}return o?(Jt(),v=r.fallback,o=n.mode,A=e.child,N=A.sibling,r=St(A,{mode:"hidden",children:r.children}),r.subtreeFlags=A.subtreeFlags&65011712,N!==null?v=St(N,v):(v=bl(v,o,l,null),v.flags|=2),v.return=n,r.return=n,r.sibling=v,n.child=r,ra(null,r),r=n.child,v=e.child.memoizedState,v===null?v=ns(l):(o=v.cachePool,o!==null?(A=en._currentValue,o=o.parent!==A?{parent:A,pool:A}:o):o=hh(),v={baseLanes:v.baseLanes|l,cachePool:o}),r.memoizedState=v,r.childLanes=ts(e,y,l),n.memoizedState=es,ra(e.child,r)):(Kt(n),l=e.child,e=l.sibling,l=St(l,{mode:"visible",children:r.children}),l.return=n,l.sibling=null,e!==null&&(y=n.deletions,y===null?(n.deletions=[e],n.flags|=16):y.push(e)),n.child=l,n.memoizedState=null,l)}function ls(e,n){return n=Lr({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function Lr(e,n){return e=Nn(22,e,null,n),e.lanes=0,e}function is(e,n,l){return Al(n,e.child,null,l),e=ls(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Ad(e,n,l){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),vo(e.return,n,l)}function as(e,n,l,r,o,h){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:l,tailMode:o,treeForkCount:h}:(y.isBackwards=n,y.rendering=null,y.renderingStartTime=0,y.last=r,y.tail=l,y.tailMode=o,y.treeForkCount=h)}function wd(e,n,l){var r=n.pendingProps,o=r.revealOrder,h=r.tail;r=r.children;var y=Pe.current,v=(y&2)!==0;if(v?(y=y&1|2,n.flags|=128):y&=1,k(Pe,y),dn(e,n,r,l),r=Re?Ii:0,!v&&e!==null&&(e.flags&128)!==0)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ad(e,l,n);else if(e.tag===19)Ad(e,l,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(o){case"forwards":for(l=n.child,o=null;l!==null;)e=l.alternate,e!==null&&Cr(e)===null&&(o=l),l=l.sibling;l=o,l===null?(o=n.child,n.child=null):(o=l.sibling,l.sibling=null),as(n,!1,o,l,h,r);break;case"backwards":case"unstable_legacy-backwards":for(l=null,o=n.child,n.child=null;o!==null;){if(e=o.alternate,e!==null&&Cr(e)===null){n.child=o;break}e=o.sibling,o.sibling=l,l=o,o=e}as(n,!0,l,null,h,r);break;case"together":as(n,!1,null,null,void 0,r);break;default:n.memoizedState=null}return n.child}function Tt(e,n,l){if(e!==null&&(n.dependencies=e.dependencies),$t|=n.lanes,(l&n.childLanes)===0)if(e!==null){if(ei(e,n,l,!1),(l&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(u(153));if(n.child!==null){for(e=n.child,l=St(e,e.pendingProps),n.child=l,l.return=n;e.sibling!==null;)e=e.sibling,l=l.sibling=St(e,e.pendingProps),l.return=n;l.sibling=null}return n.child}function rs(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&gr(e)))}function l1(e,n,l){switch(n.tag){case 3:Ie(n,n.stateNode.containerInfo),Qt(n,en,e.memoizedState.cache),vl();break;case 27:case 5:Vn(n);break;case 4:Ie(n,n.stateNode.containerInfo);break;case 10:Qt(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Mo(n),null;break;case 13:var r=n.memoizedState;if(r!==null)return r.dehydrated!==null?(Kt(n),n.flags|=128,null):(l&n.child.childLanes)!==0?Cd(e,n,l):(Kt(n),e=Tt(e,n,l),e!==null?e.sibling:null);Kt(n);break;case 19:var o=(e.flags&128)!==0;if(r=(l&n.childLanes)!==0,r||(ei(e,n,l,!1),r=(l&n.childLanes)!==0),o){if(r)return wd(e,n,l);n.flags|=128}if(o=n.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),k(Pe,Pe.current),r)break;return null;case 22:return n.lanes=0,bd(e,n,l,n.pendingProps);case 24:Qt(n,en,e.memoizedState.cache)}return Tt(e,n,l)}function Td(e,n,l){if(e!==null)if(e.memoizedProps!==n.pendingProps)tn=!0;else{if(!rs(e,l)&&(n.flags&128)===0)return tn=!1,l1(e,n,l);tn=(e.flags&131072)!==0}else tn=!1,Re&&(n.flags&1048576)!==0&&ah(n,Ii,n.index);switch(n.lanes=0,n.tag){case 16:e:{var r=n.pendingProps;if(e=kl(n.elementType),n.type=e,typeof e=="function")co(e)?(r=Tl(e,r),n.tag=1,n=Ed(null,n,e,r,l)):(n.tag=0,n=$o(null,n,e,r,l));else{if(e!=null){var o=e.$$typeof;if(o===te){n.tag=11,n=pd(null,n,e,r,l);break e}else if(o===P){n.tag=14,n=gd(null,n,e,r,l);break e}}throw n=ae(e)||e,Error(u(306,n,""))}}return n;case 0:return $o(e,n,n.type,n.pendingProps,l);case 1:return r=n.type,o=Tl(r,n.pendingProps),Ed(e,n,r,o,l);case 3:e:{if(Ie(n,n.stateNode.containerInfo),e===null)throw Error(u(387));r=n.pendingProps;var h=n.memoizedState;o=h.element,wo(e,n),na(n,r,null,l);var y=n.memoizedState;if(r=y.cache,Qt(n,en,r),r!==h.cache&&xo(n,[en],l,!0),ea(),r=y.element,h.isDehydrated)if(h={element:r,isDehydrated:!1,cache:y.cache},n.updateQueue.baseState=h,n.memoizedState=h,n.flags&256){n=kd(e,n,r,l);break e}else if(r!==o){o=Fn(Error(u(424)),n),Zi(o),n=kd(e,n,r,l);break e}else for(e=n.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Qe=Wn(e.firstChild),fn=n,Re=!0,Xt=null,Kn=!0,l=bh(n,null,r,l),n.child=l;l;)l.flags=l.flags&-3|4096,l=l.sibling;else{if(vl(),r===o){n=Tt(e,n,l);break e}dn(e,n,r,l)}n=n.child}return n;case 26:return jr(e,n),e===null?(l=Um(n.type,null,n.pendingProps,null))?n.memoizedState=l:Re||(l=n.type,e=n.pendingProps,r=Pr(oe.current).createElement(l),r[cn]=n,r[kn]=e,mn(r,l,e),on(r),n.stateNode=r):n.memoizedState=Um(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return Vn(n),e===null&&Re&&(r=n.stateNode=jm(n.type,n.pendingProps,oe.current),fn=n,Kn=!0,o=Qe,il(n.type)?(Hs=o,Qe=Wn(r.firstChild)):Qe=o),dn(e,n,n.pendingProps.children,l),jr(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Re&&((o=r=Qe)&&(r=O1(r,n.type,n.pendingProps,Kn),r!==null?(n.stateNode=r,fn=n,Qe=Wn(r.firstChild),Kn=!1,o=!0):o=!1),o||Gt(n)),Vn(n),o=n.type,h=n.pendingProps,y=e!==null?e.memoizedProps:null,r=h.children,Ns(o,h)?r=null:y!==null&&Ns(o,y)&&(n.flags|=32),n.memoizedState!==null&&(o=Oo(e,n,Z0,null,null,l),Sa._currentValue=o),jr(e,n),dn(e,n,r,l),n.child;case 6:return e===null&&Re&&((e=l=Qe)&&(l=N1(l,n.pendingProps,Kn),l!==null?(n.stateNode=l,fn=n,Qe=null,e=!0):e=!1),e||Gt(n)),null;case 13:return Cd(e,n,l);case 4:return Ie(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=Al(n,null,r,l):dn(e,n,r,l),n.child;case 11:return pd(e,n,n.type,n.pendingProps,l);case 7:return dn(e,n,n.pendingProps,l),n.child;case 8:return dn(e,n,n.pendingProps.children,l),n.child;case 12:return dn(e,n,n.pendingProps.children,l),n.child;case 10:return r=n.pendingProps,Qt(n,n.type,r.value),dn(e,n,r.children,l),n.child;case 9:return o=n.type._context,r=n.pendingProps.children,Sl(n),o=hn(o),r=r(o),n.flags|=1,dn(e,n,r,l),n.child;case 14:return gd(e,n,n.type,n.pendingProps,l);case 15:return yd(e,n,n.type,n.pendingProps,l);case 19:return wd(e,n,l);case 31:return t1(e,n,l);case 22:return bd(e,n,l,n.pendingProps);case 24:return Sl(n),r=hn(en),e===null?(o=ko(),o===null&&(o=Ve,h=So(),o.pooledCache=h,h.refCount++,h!==null&&(o.pooledCacheLanes|=l),o=h),n.memoizedState={parent:r,cache:o},Ao(n),Qt(n,en,o)):((e.lanes&l)!==0&&(wo(e,n),na(n,null,null,l),ea()),o=e.memoizedState,h=n.memoizedState,o.parent!==r?(o={parent:r,cache:r},n.memoizedState=o,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=o),Qt(n,en,r)):(r=h.cache,Qt(n,en,r),r!==o.cache&&xo(n,[en],l,!0))),dn(e,n,n.pendingProps.children,l),n.child;case 29:throw n.pendingProps}throw Error(u(156,n.tag))}function zt(e){e.flags|=4}function us(e,n,l,r,o){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(o&335544128)===o)if(e.stateNode.complete)e.flags|=8192;else if(em())e.flags|=8192;else throw Cl=xr,Co}else e.flags&=-16777217}function zd(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Xm(n))if(em())e.flags|=8192;else throw Cl=xr,Co}function Br(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?uf():536870912,e.lanes|=n,hi|=n)}function ua(e,n){if(!Re)switch(e.tailMode){case"hidden":n=e.tail;for(var l=null;n!==null;)n.alternate!==null&&(l=n),n=n.sibling;l===null?e.tail=null:l.sibling=null;break;case"collapsed":l=e.tail;for(var r=null;l!==null;)l.alternate!==null&&(r=l),l=l.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Fe(e){var n=e.alternate!==null&&e.alternate.child===e.child,l=0,r=0;if(n)for(var o=e.child;o!==null;)l|=o.lanes|o.childLanes,r|=o.subtreeFlags&65011712,r|=o.flags&65011712,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)l|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=l,n}function i1(e,n,l){var r=n.pendingProps;switch(po(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Fe(n),null;case 1:return Fe(n),null;case 3:return l=n.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),Ct(en),Be(),l.pendingContext&&(l.context=l.pendingContext,l.pendingContext=null),(e===null||e.child===null)&&($l(n)?zt(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,yo())),Fe(n),null;case 26:var o=n.type,h=n.memoizedState;return e===null?(zt(n),h!==null?(Fe(n),zd(n,h)):(Fe(n),us(n,o,null,r,l))):h?h!==e.memoizedState?(zt(n),Fe(n),zd(n,h)):(Fe(n),n.flags&=-16777217):(e=e.memoizedProps,e!==r&&zt(n),Fe(n),us(n,o,e,r,l)),null;case 27:if(pt(n),l=oe.current,o=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==r&&zt(n);else{if(!r){if(n.stateNode===null)throw Error(u(166));return Fe(n),null}e=$.current,$l(n)?uh(n):(e=jm(o,r,l),n.stateNode=e,zt(n))}return Fe(n),null;case 5:if(pt(n),o=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==r&&zt(n);else{if(!r){if(n.stateNode===null)throw Error(u(166));return Fe(n),null}if(h=$.current,$l(n))uh(n);else{var y=Pr(oe.current);switch(h){case 1:h=y.createElementNS("http://www.w3.org/2000/svg",o);break;case 2:h=y.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;default:switch(o){case"svg":h=y.createElementNS("http://www.w3.org/2000/svg",o);break;case"math":h=y.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;case"script":h=y.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof r.is=="string"?y.createElement("select",{is:r.is}):y.createElement("select"),r.multiple?h.multiple=!0:r.size&&(h.size=r.size);break;default:h=typeof r.is=="string"?y.createElement(o,{is:r.is}):y.createElement(o)}}h[cn]=n,h[kn]=r;e:for(y=n.child;y!==null;){if(y.tag===5||y.tag===6)h.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===n)break e;for(;y.sibling===null;){if(y.return===null||y.return===n)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}n.stateNode=h;e:switch(mn(h,o,r),o){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}r&&zt(n)}}return Fe(n),us(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,l),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==r&&zt(n);else{if(typeof r!="string"&&n.stateNode===null)throw Error(u(166));if(e=oe.current,$l(n)){if(e=n.stateNode,l=n.memoizedProps,r=null,o=fn,o!==null)switch(o.tag){case 27:case 5:r=o.memoizedProps}e[cn]=n,e=!!(e.nodeValue===l||r!==null&&r.suppressHydrationWarning===!0||Cm(e.nodeValue,l)),e||Gt(n,!0)}else e=Pr(e).createTextNode(r),e[cn]=n,n.stateNode=e}return Fe(n),null;case 31:if(l=n.memoizedState,e===null||e.memoizedState!==null){if(r=$l(n),l!==null){if(e===null){if(!r)throw Error(u(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(557));e[cn]=n}else vl(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Fe(n),e=!1}else l=yo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),e=!0;if(!e)return n.flags&256?(Ln(n),n):(Ln(n),null);if((n.flags&128)!==0)throw Error(u(558))}return Fe(n),null;case 13:if(r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(o=$l(n),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(u(318));if(o=n.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(u(317));o[cn]=n}else vl(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Fe(n),o=!1}else o=yo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=o),o=!0;if(!o)return n.flags&256?(Ln(n),n):(Ln(n),null)}return Ln(n),(n.flags&128)!==0?(n.lanes=l,n):(l=r!==null,e=e!==null&&e.memoizedState!==null,l&&(r=n.child,o=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(o=r.alternate.memoizedState.cachePool.pool),h=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(h=r.memoizedState.cachePool.pool),h!==o&&(r.flags|=2048)),l!==e&&l&&(n.child.flags|=8192),Br(n,n.updateQueue),Fe(n),null);case 4:return Be(),e===null&&Rs(n.stateNode.containerInfo),Fe(n),null;case 10:return Ct(n.type),Fe(n),null;case 19:if(G(Pe),r=n.memoizedState,r===null)return Fe(n),null;if(o=(n.flags&128)!==0,h=r.rendering,h===null)if(o)ua(r,!1);else{if(We!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(h=Cr(e),h!==null){for(n.flags|=128,ua(r,!1),e=h.updateQueue,n.updateQueue=e,Br(n,e),n.subtreeFlags=0,e=l,l=n.child;l!==null;)th(l,e),l=l.sibling;return k(Pe,Pe.current&1|2),Re&&Et(n,r.treeForkCount),n.child}e=e.sibling}r.tail!==null&&bn()>Vr&&(n.flags|=128,o=!0,ua(r,!1),n.lanes=4194304)}else{if(!o)if(e=Cr(h),e!==null){if(n.flags|=128,o=!0,e=e.updateQueue,n.updateQueue=e,Br(n,e),ua(r,!0),r.tail===null&&r.tailMode==="hidden"&&!h.alternate&&!Re)return Fe(n),null}else 2*bn()-r.renderingStartTime>Vr&&l!==536870912&&(n.flags|=128,o=!0,ua(r,!1),n.lanes=4194304);r.isBackwards?(h.sibling=n.child,n.child=h):(e=r.last,e!==null?e.sibling=h:n.child=h,r.last=h)}return r.tail!==null?(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=bn(),e.sibling=null,l=Pe.current,k(Pe,o?l&1|2:l&1),Re&&Et(n,r.treeForkCount),e):(Fe(n),null);case 22:case 23:return Ln(n),Do(),r=n.memoizedState!==null,e!==null?e.memoizedState!==null!==r&&(n.flags|=8192):r&&(n.flags|=8192),r?(l&536870912)!==0&&(n.flags&128)===0&&(Fe(n),n.subtreeFlags&6&&(n.flags|=8192)):Fe(n),l=n.updateQueue,l!==null&&Br(n,l.retryQueue),l=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==l&&(n.flags|=2048),e!==null&&G(El),null;case 24:return l=null,e!==null&&(l=e.memoizedState.cache),n.memoizedState.cache!==l&&(n.flags|=2048),Ct(en),Fe(n),null;case 25:return null;case 30:return null}throw Error(u(156,n.tag))}function a1(e,n){switch(po(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return Ct(en),Be(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return pt(n),null;case 31:if(n.memoizedState!==null){if(Ln(n),n.alternate===null)throw Error(u(340));vl()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(Ln(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(u(340));vl()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return G(Pe),null;case 4:return Be(),null;case 10:return Ct(n.type),null;case 22:case 23:return Ln(n),Do(),e!==null&&G(El),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return Ct(en),null;case 25:return null;default:return null}}function Rd(e,n){switch(po(n),n.tag){case 3:Ct(en),Be();break;case 26:case 27:case 5:pt(n);break;case 4:Be();break;case 31:n.memoizedState!==null&&Ln(n);break;case 13:Ln(n);break;case 19:G(Pe);break;case 10:Ct(n.type);break;case 22:case 23:Ln(n),Do(),e!==null&&G(El);break;case 24:Ct(en)}}function oa(e,n){try{var l=n.updateQueue,r=l!==null?l.lastEffect:null;if(r!==null){var o=r.next;l=o;do{if((l.tag&e)===e){r=void 0;var h=l.create,y=l.inst;r=h(),y.destroy=r}l=l.next}while(l!==o)}}catch(v){Le(n,n.return,v)}}function Wt(e,n,l){try{var r=n.updateQueue,o=r!==null?r.lastEffect:null;if(o!==null){var h=o.next;r=h;do{if((r.tag&e)===e){var y=r.inst,v=y.destroy;if(v!==void 0){y.destroy=void 0,o=n;var A=l,N=v;try{N()}catch(Y){Le(o,A,Y)}}}r=r.next}while(r!==h)}}catch(Y){Le(n,n.return,Y)}}function Dd(e){var n=e.updateQueue;if(n!==null){var l=e.stateNode;try{xh(n,l)}catch(r){Le(e,e.return,r)}}}function Md(e,n,l){l.props=Tl(e.type,e.memoizedProps),l.state=e.memoizedState;try{l.componentWillUnmount()}catch(r){Le(e,n,r)}}function sa(e,n){try{var l=e.ref;if(l!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof l=="function"?e.refCleanup=l(r):l.current=r}}catch(o){Le(e,n,o)}}function st(e,n){var l=e.ref,r=e.refCleanup;if(l!==null)if(typeof r=="function")try{r()}catch(o){Le(e,n,o)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof l=="function")try{l(null)}catch(o){Le(e,n,o)}else l.current=null}function _d(e){var n=e.type,l=e.memoizedProps,r=e.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":l.autoFocus&&r.focus();break e;case"img":l.src?r.src=l.src:l.srcSet&&(r.srcset=l.srcSet)}}catch(o){Le(e,e.return,o)}}function os(e,n,l){try{var r=e.stateNode;T1(r,e.type,l,n),r[kn]=n}catch(o){Le(e,e.return,o)}}function Od(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&il(e.type)||e.tag===4}function ss(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Od(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&il(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function cs(e,n,l){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?(l.nodeType===9?l.body:l.nodeName==="HTML"?l.ownerDocument.body:l).insertBefore(e,n):(n=l.nodeType===9?l.body:l.nodeName==="HTML"?l.ownerDocument.body:l,n.appendChild(e),l=l._reactRootContainer,l!=null||n.onclick!==null||(n.onclick=vt));else if(r!==4&&(r===27&&il(e.type)&&(l=e.stateNode,n=null),e=e.child,e!==null))for(cs(e,n,l),e=e.sibling;e!==null;)cs(e,n,l),e=e.sibling}function Ur(e,n,l){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?l.insertBefore(e,n):l.appendChild(e);else if(r!==4&&(r===27&&il(e.type)&&(l=e.stateNode),e=e.child,e!==null))for(Ur(e,n,l),e=e.sibling;e!==null;)Ur(e,n,l),e=e.sibling}function Nd(e){var n=e.stateNode,l=e.memoizedProps;try{for(var r=e.type,o=n.attributes;o.length;)n.removeAttributeNode(o[0]);mn(n,r,l),n[cn]=e,n[kn]=l}catch(h){Le(e,e.return,h)}}var Rt=!1,ln=!1,fs=!1,jd=typeof WeakSet=="function"?WeakSet:Set,sn=null;function r1(e,n){if(e=e.containerInfo,_s=au,e=If(e),lo(e)){if("selectionStart"in e)var l={start:e.selectionStart,end:e.selectionEnd};else e:{l=(l=e.ownerDocument)&&l.defaultView||window;var r=l.getSelection&&l.getSelection();if(r&&r.rangeCount!==0){l=r.anchorNode;var o=r.anchorOffset,h=r.focusNode;r=r.focusOffset;try{l.nodeType,h.nodeType}catch{l=null;break e}var y=0,v=-1,A=-1,N=0,Y=0,I=e,j=null;n:for(;;){for(var H;I!==l||o!==0&&I.nodeType!==3||(v=y+o),I!==h||r!==0&&I.nodeType!==3||(A=y+r),I.nodeType===3&&(y+=I.nodeValue.length),(H=I.firstChild)!==null;)j=I,I=H;for(;;){if(I===e)break n;if(j===l&&++N===o&&(v=y),j===h&&++Y===r&&(A=y),(H=I.nextSibling)!==null)break;I=j,j=I.parentNode}I=H}l=v===-1||A===-1?null:{start:v,end:A}}else l=null}l=l||{start:0,end:0}}else l=null;for(Os={focusedElem:e,selectionRange:l},au=!1,sn=n;sn!==null;)if(n=sn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,sn=e;else for(;sn!==null;){switch(n=sn,h=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(l=0;l<e.length;l++)o=e[l],o.ref.impl=o.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,l=n,o=h.memoizedProps,h=h.memoizedState,r=l.stateNode;try{var ie=Tl(l.type,o);e=r.getSnapshotBeforeUpdate(ie,h),r.__reactInternalSnapshotBeforeUpdate=e}catch(he){Le(l,l.return,he)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,l=e.nodeType,l===9)Ls(e);else if(l===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Ls(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(u(163))}if(e=n.sibling,e!==null){e.return=n.return,sn=e;break}sn=n.return}}function Ld(e,n,l){var r=l.flags;switch(l.tag){case 0:case 11:case 15:Mt(e,l),r&4&&oa(5,l);break;case 1:if(Mt(e,l),r&4)if(e=l.stateNode,n===null)try{e.componentDidMount()}catch(y){Le(l,l.return,y)}else{var o=Tl(l.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(o,n,e.__reactInternalSnapshotBeforeUpdate)}catch(y){Le(l,l.return,y)}}r&64&&Dd(l),r&512&&sa(l,l.return);break;case 3:if(Mt(e,l),r&64&&(e=l.updateQueue,e!==null)){if(n=null,l.child!==null)switch(l.child.tag){case 27:case 5:n=l.child.stateNode;break;case 1:n=l.child.stateNode}try{xh(e,n)}catch(y){Le(l,l.return,y)}}break;case 27:n===null&&r&4&&Nd(l);case 26:case 5:Mt(e,l),n===null&&r&4&&_d(l),r&512&&sa(l,l.return);break;case 12:Mt(e,l);break;case 31:Mt(e,l),r&4&&Hd(e,l);break;case 13:Mt(e,l),r&4&&qd(e,l),r&64&&(e=l.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(l=p1.bind(null,l),j1(e,l))));break;case 22:if(r=l.memoizedState!==null||Rt,!r){n=n!==null&&n.memoizedState!==null||ln,o=Rt;var h=ln;Rt=r,(ln=n)&&!h?_t(e,l,(l.subtreeFlags&8772)!==0):Mt(e,l),Rt=o,ln=h}break;case 30:break;default:Mt(e,l)}}function Bd(e){var n=e.alternate;n!==null&&(e.alternate=null,Bd(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&qu(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ze=null,An=!1;function Dt(e,n,l){for(l=l.child;l!==null;)Ud(e,n,l),l=l.sibling}function Ud(e,n,l){if(rn&&typeof rn.onCommitFiberUnmount=="function")try{rn.onCommitFiberUnmount(vn,l)}catch{}switch(l.tag){case 26:ln||st(l,n),Dt(e,n,l),l.memoizedState?l.memoizedState.count--:l.stateNode&&(l=l.stateNode,l.parentNode.removeChild(l));break;case 27:ln||st(l,n);var r=Ze,o=An;il(l.type)&&(Ze=l.stateNode,An=!1),Dt(e,n,l),ba(l.stateNode),Ze=r,An=o;break;case 5:ln||st(l,n);case 6:if(r=Ze,o=An,Ze=null,Dt(e,n,l),Ze=r,An=o,Ze!==null)if(An)try{(Ze.nodeType===9?Ze.body:Ze.nodeName==="HTML"?Ze.ownerDocument.body:Ze).removeChild(l.stateNode)}catch(h){Le(l,n,h)}else try{Ze.removeChild(l.stateNode)}catch(h){Le(l,n,h)}break;case 18:Ze!==null&&(An?(e=Ze,Dm(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,l.stateNode),xi(e)):Dm(Ze,l.stateNode));break;case 4:r=Ze,o=An,Ze=l.stateNode.containerInfo,An=!0,Dt(e,n,l),Ze=r,An=o;break;case 0:case 11:case 14:case 15:Wt(2,l,n),ln||Wt(4,l,n),Dt(e,n,l);break;case 1:ln||(st(l,n),r=l.stateNode,typeof r.componentWillUnmount=="function"&&Md(l,n,r)),Dt(e,n,l);break;case 21:Dt(e,n,l);break;case 22:ln=(r=ln)||l.memoizedState!==null,Dt(e,n,l),ln=r;break;default:Dt(e,n,l)}}function Hd(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{xi(e)}catch(l){Le(n,n.return,l)}}}function qd(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{xi(e)}catch(l){Le(n,n.return,l)}}function u1(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new jd),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new jd),n;default:throw Error(u(435,e.tag))}}function Hr(e,n){var l=u1(e);n.forEach(function(r){if(!l.has(r)){l.add(r);var o=g1.bind(null,e,r);r.then(o,o)}})}function wn(e,n){var l=n.deletions;if(l!==null)for(var r=0;r<l.length;r++){var o=l[r],h=e,y=n,v=y;e:for(;v!==null;){switch(v.tag){case 27:if(il(v.type)){Ze=v.stateNode,An=!1;break e}break;case 5:Ze=v.stateNode,An=!1;break e;case 3:case 4:Ze=v.stateNode.containerInfo,An=!0;break e}v=v.return}if(Ze===null)throw Error(u(160));Ud(h,y,o),Ze=null,An=!1,h=o.alternate,h!==null&&(h.return=null),o.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)Yd(n,e),n=n.sibling}var lt=null;function Yd(e,n){var l=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:wn(n,e),Tn(e),r&4&&(Wt(3,e,e.return),oa(3,e),Wt(5,e,e.return));break;case 1:wn(n,e),Tn(e),r&512&&(ln||l===null||st(l,l.return)),r&64&&Rt&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(l=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=l===null?r:l.concat(r))));break;case 26:var o=lt;if(wn(n,e),Tn(e),r&512&&(ln||l===null||st(l,l.return)),r&4){var h=l!==null?l.memoizedState:null;if(r=e.memoizedState,l===null)if(r===null)if(e.stateNode===null){e:{r=e.type,l=e.memoizedProps,o=o.ownerDocument||o;n:switch(r){case"title":h=o.getElementsByTagName("title")[0],(!h||h[Li]||h[cn]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=o.createElement(r),o.head.insertBefore(h,o.querySelector("head > title"))),mn(h,r,l),h[cn]=e,on(h),r=h;break e;case"link":var y=Ym("link","href",o).get(r+(l.href||""));if(y){for(var v=0;v<y.length;v++)if(h=y[v],h.getAttribute("href")===(l.href==null||l.href===""?null:l.href)&&h.getAttribute("rel")===(l.rel==null?null:l.rel)&&h.getAttribute("title")===(l.title==null?null:l.title)&&h.getAttribute("crossorigin")===(l.crossOrigin==null?null:l.crossOrigin)){y.splice(v,1);break n}}h=o.createElement(r),mn(h,r,l),o.head.appendChild(h);break;case"meta":if(y=Ym("meta","content",o).get(r+(l.content||""))){for(v=0;v<y.length;v++)if(h=y[v],h.getAttribute("content")===(l.content==null?null:""+l.content)&&h.getAttribute("name")===(l.name==null?null:l.name)&&h.getAttribute("property")===(l.property==null?null:l.property)&&h.getAttribute("http-equiv")===(l.httpEquiv==null?null:l.httpEquiv)&&h.getAttribute("charset")===(l.charSet==null?null:l.charSet)){y.splice(v,1);break n}}h=o.createElement(r),mn(h,r,l),o.head.appendChild(h);break;default:throw Error(u(468,r))}h[cn]=e,on(h),r=h}e.stateNode=r}else Vm(o,e.type,e.stateNode);else e.stateNode=qm(o,r,e.memoizedProps);else h!==r?(h===null?l.stateNode!==null&&(l=l.stateNode,l.parentNode.removeChild(l)):h.count--,r===null?Vm(o,e.type,e.stateNode):qm(o,r,e.memoizedProps)):r===null&&e.stateNode!==null&&os(e,e.memoizedProps,l.memoizedProps)}break;case 27:wn(n,e),Tn(e),r&512&&(ln||l===null||st(l,l.return)),l!==null&&r&4&&os(e,e.memoizedProps,l.memoizedProps);break;case 5:if(wn(n,e),Tn(e),r&512&&(ln||l===null||st(l,l.return)),e.flags&32){o=e.stateNode;try{Xl(o,"")}catch(ie){Le(e,e.return,ie)}}r&4&&e.stateNode!=null&&(o=e.memoizedProps,os(e,o,l!==null?l.memoizedProps:o)),r&1024&&(fs=!0);break;case 6:if(wn(n,e),Tn(e),r&4){if(e.stateNode===null)throw Error(u(162));r=e.memoizedProps,l=e.stateNode;try{l.nodeValue=r}catch(ie){Le(e,e.return,ie)}}break;case 3:if(nu=null,o=lt,lt=$r(n.containerInfo),wn(n,e),lt=o,Tn(e),r&4&&l!==null&&l.memoizedState.isDehydrated)try{xi(n.containerInfo)}catch(ie){Le(e,e.return,ie)}fs&&(fs=!1,Vd(e));break;case 4:r=lt,lt=$r(e.stateNode.containerInfo),wn(n,e),Tn(e),lt=r;break;case 12:wn(n,e),Tn(e);break;case 31:wn(n,e),Tn(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,Hr(e,r)));break;case 13:wn(n,e),Tn(e),e.child.flags&8192&&e.memoizedState!==null!=(l!==null&&l.memoizedState!==null)&&(Yr=bn()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,Hr(e,r)));break;case 22:o=e.memoizedState!==null;var A=l!==null&&l.memoizedState!==null,N=Rt,Y=ln;if(Rt=N||o,ln=Y||A,wn(n,e),ln=Y,Rt=N,Tn(e),r&8192)e:for(n=e.stateNode,n._visibility=o?n._visibility&-2:n._visibility|1,o&&(l===null||A||Rt||ln||zl(e)),l=null,n=e;;){if(n.tag===5||n.tag===26){if(l===null){A=l=n;try{if(h=A.stateNode,o)y=h.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{v=A.stateNode;var I=A.memoizedProps.style,j=I!=null&&I.hasOwnProperty("display")?I.display:null;v.style.display=j==null||typeof j=="boolean"?"":(""+j).trim()}}catch(ie){Le(A,A.return,ie)}}}else if(n.tag===6){if(l===null){A=n;try{A.stateNode.nodeValue=o?"":A.memoizedProps}catch(ie){Le(A,A.return,ie)}}}else if(n.tag===18){if(l===null){A=n;try{var H=A.stateNode;o?Mm(H,!0):Mm(A.stateNode,!1)}catch(ie){Le(A,A.return,ie)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;l===n&&(l=null),n=n.return}l===n&&(l=null),n.sibling.return=n.return,n=n.sibling}r&4&&(r=e.updateQueue,r!==null&&(l=r.retryQueue,l!==null&&(r.retryQueue=null,Hr(e,l))));break;case 19:wn(n,e),Tn(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,Hr(e,r)));break;case 30:break;case 21:break;default:wn(n,e),Tn(e)}}function Tn(e){var n=e.flags;if(n&2){try{for(var l,r=e.return;r!==null;){if(Od(r)){l=r;break}r=r.return}if(l==null)throw Error(u(160));switch(l.tag){case 27:var o=l.stateNode,h=ss(e);Ur(e,h,o);break;case 5:var y=l.stateNode;l.flags&32&&(Xl(y,""),l.flags&=-33);var v=ss(e);Ur(e,v,y);break;case 3:case 4:var A=l.stateNode.containerInfo,N=ss(e);cs(e,N,A);break;default:throw Error(u(161))}}catch(Y){Le(e,e.return,Y)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Vd(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;Vd(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function Mt(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Ld(e,n.alternate,n),n=n.sibling}function zl(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Wt(4,n,n.return),zl(n);break;case 1:st(n,n.return);var l=n.stateNode;typeof l.componentWillUnmount=="function"&&Md(n,n.return,l),zl(n);break;case 27:ba(n.stateNode);case 26:case 5:st(n,n.return),zl(n);break;case 22:n.memoizedState===null&&zl(n);break;case 30:zl(n);break;default:zl(n)}e=e.sibling}}function _t(e,n,l){for(l=l&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var r=n.alternate,o=e,h=n,y=h.flags;switch(h.tag){case 0:case 11:case 15:_t(o,h,l),oa(4,h);break;case 1:if(_t(o,h,l),r=h,o=r.stateNode,typeof o.componentDidMount=="function")try{o.componentDidMount()}catch(N){Le(r,r.return,N)}if(r=h,o=r.updateQueue,o!==null){var v=r.stateNode;try{var A=o.shared.hiddenCallbacks;if(A!==null)for(o.shared.hiddenCallbacks=null,o=0;o<A.length;o++)vh(A[o],v)}catch(N){Le(r,r.return,N)}}l&&y&64&&Dd(h),sa(h,h.return);break;case 27:Nd(h);case 26:case 5:_t(o,h,l),l&&r===null&&y&4&&_d(h),sa(h,h.return);break;case 12:_t(o,h,l);break;case 31:_t(o,h,l),l&&y&4&&Hd(o,h);break;case 13:_t(o,h,l),l&&y&4&&qd(o,h);break;case 22:h.memoizedState===null&&_t(o,h,l),sa(h,h.return);break;case 30:break;default:_t(o,h,l)}n=n.sibling}}function hs(e,n){var l=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==l&&(e!=null&&e.refCount++,l!=null&&Ki(l))}function ds(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&Ki(e))}function it(e,n,l,r){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Xd(e,n,l,r),n=n.sibling}function Xd(e,n,l,r){var o=n.flags;switch(n.tag){case 0:case 11:case 15:it(e,n,l,r),o&2048&&oa(9,n);break;case 1:it(e,n,l,r);break;case 3:it(e,n,l,r),o&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&Ki(e)));break;case 12:if(o&2048){it(e,n,l,r),e=n.stateNode;try{var h=n.memoizedProps,y=h.id,v=h.onPostCommit;typeof v=="function"&&v(y,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(A){Le(n,n.return,A)}}else it(e,n,l,r);break;case 31:it(e,n,l,r);break;case 13:it(e,n,l,r);break;case 23:break;case 22:h=n.stateNode,y=n.alternate,n.memoizedState!==null?h._visibility&2?it(e,n,l,r):ca(e,n):h._visibility&2?it(e,n,l,r):(h._visibility|=2,si(e,n,l,r,(n.subtreeFlags&10256)!==0||!1)),o&2048&&hs(y,n);break;case 24:it(e,n,l,r),o&2048&&ds(n.alternate,n);break;default:it(e,n,l,r)}}function si(e,n,l,r,o){for(o=o&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var h=e,y=n,v=l,A=r,N=y.flags;switch(y.tag){case 0:case 11:case 15:si(h,y,v,A,o),oa(8,y);break;case 23:break;case 22:var Y=y.stateNode;y.memoizedState!==null?Y._visibility&2?si(h,y,v,A,o):ca(h,y):(Y._visibility|=2,si(h,y,v,A,o)),o&&N&2048&&hs(y.alternate,y);break;case 24:si(h,y,v,A,o),o&&N&2048&&ds(y.alternate,y);break;default:si(h,y,v,A,o)}n=n.sibling}}function ca(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var l=e,r=n,o=r.flags;switch(r.tag){case 22:ca(l,r),o&2048&&hs(r.alternate,r);break;case 24:ca(l,r),o&2048&&ds(r.alternate,r);break;default:ca(l,r)}n=n.sibling}}var fa=8192;function ci(e,n,l){if(e.subtreeFlags&fa)for(e=e.child;e!==null;)Gd(e,n,l),e=e.sibling}function Gd(e,n,l){switch(e.tag){case 26:ci(e,n,l),e.flags&fa&&e.memoizedState!==null&&I1(l,lt,e.memoizedState,e.memoizedProps);break;case 5:ci(e,n,l);break;case 3:case 4:var r=lt;lt=$r(e.stateNode.containerInfo),ci(e,n,l),lt=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=fa,fa=16777216,ci(e,n,l),fa=r):ci(e,n,l));break;default:ci(e,n,l)}}function Qd(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function ha(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var l=0;l<n.length;l++){var r=n[l];sn=r,Id(r,e)}Qd(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Fd(e),e=e.sibling}function Fd(e){switch(e.tag){case 0:case 11:case 15:ha(e),e.flags&2048&&Wt(9,e,e.return);break;case 3:ha(e);break;case 12:ha(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,qr(e)):ha(e);break;default:ha(e)}}function qr(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var l=0;l<n.length;l++){var r=n[l];sn=r,Id(r,e)}Qd(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Wt(8,n,n.return),qr(n);break;case 22:l=n.stateNode,l._visibility&2&&(l._visibility&=-3,qr(n));break;default:qr(n)}e=e.sibling}}function Id(e,n){for(;sn!==null;){var l=sn;switch(l.tag){case 0:case 11:case 15:Wt(8,l,n);break;case 23:case 22:if(l.memoizedState!==null&&l.memoizedState.cachePool!==null){var r=l.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Ki(l.memoizedState.cache)}if(r=l.child,r!==null)r.return=l,sn=r;else e:for(l=e;sn!==null;){r=sn;var o=r.sibling,h=r.return;if(Bd(r),r===l){sn=null;break e}if(o!==null){o.return=h,sn=o;break e}sn=h}}}var o1={getCacheForType:function(e){var n=hn(en),l=n.data.get(e);return l===void 0&&(l=e(),n.data.set(e,l)),l},cacheSignal:function(){return hn(en).controller.signal}},s1=typeof WeakMap=="function"?WeakMap:Map,Oe=0,Ve=null,ke=null,Te=0,je=0,Bn=null,Pt=!1,fi=!1,ms=!1,Ot=0,We=0,$t=0,Rl=0,ps=0,Un=0,hi=0,da=null,zn=null,gs=!1,Yr=0,Zd=0,Vr=1/0,Xr=null,el=null,un=0,nl=null,di=null,Nt=0,ys=0,bs=null,Kd=null,ma=0,vs=null;function Hn(){return(Oe&2)!==0&&Te!==0?Te&-Te:L.T!==null?As():ff()}function Jd(){if(Un===0)if((Te&536870912)===0||Re){var e=Wa;Wa<<=1,(Wa&3932160)===0&&(Wa=262144),Un=e}else Un=536870912;return e=jn.current,e!==null&&(e.flags|=32),Un}function Rn(e,n,l){(e===Ve&&(je===2||je===9)||e.cancelPendingCommit!==null)&&(mi(e,0),tl(e,Te,Un,!1)),ji(e,l),((Oe&2)===0||e!==Ve)&&(e===Ve&&((Oe&2)===0&&(Rl|=l),We===4&&tl(e,Te,Un,!1)),ct(e))}function Wd(e,n,l){if((Oe&6)!==0)throw Error(u(327));var r=!l&&(n&127)===0&&(n&e.expiredLanes)===0||Ni(e,n),o=r?h1(e,n):Ss(e,n,!0),h=r;do{if(o===0){fi&&!r&&tl(e,n,0,!1);break}else{if(l=e.current.alternate,h&&!c1(l)){o=Ss(e,n,!1),h=!1;continue}if(o===2){if(h=n,e.errorRecoveryDisabledLanes&h)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){n=y;e:{var v=e;o=da;var A=v.current.memoizedState.isDehydrated;if(A&&(mi(v,y).flags|=256),y=Ss(v,y,!1),y!==2){if(ms&&!A){v.errorRecoveryDisabledLanes|=h,Rl|=h,o=4;break e}h=zn,zn=o,h!==null&&(zn===null?zn=h:zn.push.apply(zn,h))}o=y}if(h=!1,o!==2)continue}}if(o===1){mi(e,0),tl(e,n,0,!0);break}e:{switch(r=e,h=o,h){case 0:case 1:throw Error(u(345));case 4:if((n&4194048)!==n)break;case 6:tl(r,n,Un,!Pt);break e;case 2:zn=null;break;case 3:case 5:break;default:throw Error(u(329))}if((n&62914560)===n&&(o=Yr+300-bn(),10<o)){if(tl(r,n,Un,!Pt),$a(r,0,!0)!==0)break e;Nt=n,r.timeoutHandle=zm(Pd.bind(null,r,l,zn,Xr,gs,n,Un,Rl,hi,Pt,h,"Throttled",-0,0),o);break e}Pd(r,l,zn,Xr,gs,n,Un,Rl,hi,Pt,h,null,-0,0)}}break}while(!0);ct(e)}function Pd(e,n,l,r,o,h,y,v,A,N,Y,I,j,H){if(e.timeoutHandle=-1,I=n.subtreeFlags,I&8192||(I&16785408)===16785408){I={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:vt},Gd(n,h,I);var ie=(h&62914560)===h?Yr-bn():(h&4194048)===h?Zd-bn():0;if(ie=Z1(I,ie),ie!==null){Nt=h,e.cancelPendingCommit=ie(rm.bind(null,e,n,h,l,r,o,y,v,A,Y,I,null,j,H)),tl(e,h,y,!N);return}}rm(e,n,h,l,r,o,y,v,A)}function c1(e){for(var n=e;;){var l=n.tag;if((l===0||l===11||l===15)&&n.flags&16384&&(l=n.updateQueue,l!==null&&(l=l.stores,l!==null)))for(var r=0;r<l.length;r++){var o=l[r],h=o.getSnapshot;o=o.value;try{if(!On(h(),o))return!1}catch{return!1}}if(l=n.child,n.subtreeFlags&16384&&l!==null)l.return=n,n=l;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function tl(e,n,l,r){n&=~ps,n&=~Rl,e.suspendedLanes|=n,e.pingedLanes&=~n,r&&(e.warmLanes|=n),r=e.expirationTimes;for(var o=n;0<o;){var h=31-Ye(o),y=1<<h;r[h]=-1,o&=~y}l!==0&&of(e,l,n)}function Gr(){return(Oe&6)===0?(pa(0),!1):!0}function xs(){if(ke!==null){if(je===0)var e=ke.return;else e=ke,kt=xl=null,Lo(e),ii=null,Wi=0,e=ke;for(;e!==null;)Rd(e.alternate,e),e=e.return;ke=null}}function mi(e,n){var l=e.timeoutHandle;l!==-1&&(e.timeoutHandle=-1,D1(l)),l=e.cancelPendingCommit,l!==null&&(e.cancelPendingCommit=null,l()),Nt=0,xs(),Ve=e,ke=l=St(e.current,null),Te=n,je=0,Bn=null,Pt=!1,fi=Ni(e,n),ms=!1,hi=Un=ps=Rl=$t=We=0,zn=da=null,gs=!1,(n&8)!==0&&(n|=n&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=n;0<r;){var o=31-Ye(r),h=1<<o;n|=e[o],r&=~h}return Ot=n,fr(),l}function $d(e,n){ye=null,L.H=aa,n===li||n===vr?(n=ph(),je=3):n===Co?(n=ph(),je=4):je=n===Po?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,Bn=n,ke===null&&(We=1,Or(e,Fn(n,e.current)))}function em(){var e=jn.current;return e===null?!0:(Te&4194048)===Te?Jn===null:(Te&62914560)===Te||(Te&536870912)!==0?e===Jn:!1}function nm(){var e=L.H;return L.H=aa,e===null?aa:e}function tm(){var e=L.A;return L.A=o1,e}function Qr(){We=4,Pt||(Te&4194048)!==Te&&jn.current!==null||(fi=!0),($t&134217727)===0&&(Rl&134217727)===0||Ve===null||tl(Ve,Te,Un,!1)}function Ss(e,n,l){var r=Oe;Oe|=2;var o=nm(),h=tm();(Ve!==e||Te!==n)&&(Xr=null,mi(e,n)),n=!1;var y=We;e:do try{if(je!==0&&ke!==null){var v=ke,A=Bn;switch(je){case 8:xs(),y=6;break e;case 3:case 2:case 9:case 6:jn.current===null&&(n=!0);var N=je;if(je=0,Bn=null,pi(e,v,A,N),l&&fi){y=0;break e}break;default:N=je,je=0,Bn=null,pi(e,v,A,N)}}f1(),y=We;break}catch(Y){$d(e,Y)}while(!0);return n&&e.shellSuspendCounter++,kt=xl=null,Oe=r,L.H=o,L.A=h,ke===null&&(Ve=null,Te=0,fr()),y}function f1(){for(;ke!==null;)lm(ke)}function h1(e,n){var l=Oe;Oe|=2;var r=nm(),o=tm();Ve!==e||Te!==n?(Xr=null,Vr=bn()+500,mi(e,n)):fi=Ni(e,n);e:do try{if(je!==0&&ke!==null){n=ke;var h=Bn;n:switch(je){case 1:je=0,Bn=null,pi(e,n,h,1);break;case 2:case 9:if(dh(h)){je=0,Bn=null,im(n);break}n=function(){je!==2&&je!==9||Ve!==e||(je=7),ct(e)},h.then(n,n);break e;case 3:je=7;break e;case 4:je=5;break e;case 7:dh(h)?(je=0,Bn=null,im(n)):(je=0,Bn=null,pi(e,n,h,7));break;case 5:var y=null;switch(ke.tag){case 26:y=ke.memoizedState;case 5:case 27:var v=ke;if(y?Xm(y):v.stateNode.complete){je=0,Bn=null;var A=v.sibling;if(A!==null)ke=A;else{var N=v.return;N!==null?(ke=N,Fr(N)):ke=null}break n}}je=0,Bn=null,pi(e,n,h,5);break;case 6:je=0,Bn=null,pi(e,n,h,6);break;case 8:xs(),We=6;break e;default:throw Error(u(462))}}d1();break}catch(Y){$d(e,Y)}while(!0);return kt=xl=null,L.H=r,L.A=o,Oe=l,ke!==null?0:(Ve=null,Te=0,fr(),We)}function d1(){for(;ke!==null&&!Ou();)lm(ke)}function lm(e){var n=Td(e.alternate,e,Ot);e.memoizedProps=e.pendingProps,n===null?Fr(e):ke=n}function im(e){var n=e,l=n.alternate;switch(n.tag){case 15:case 0:n=Sd(l,n,n.pendingProps,n.type,void 0,Te);break;case 11:n=Sd(l,n,n.pendingProps,n.type.render,n.ref,Te);break;case 5:Lo(n);default:Rd(l,n),n=ke=th(n,Ot),n=Td(l,n,Ot)}e.memoizedProps=e.pendingProps,n===null?Fr(e):ke=n}function pi(e,n,l,r){kt=xl=null,Lo(n),ii=null,Wi=0;var o=n.return;try{if(n1(e,o,n,l,Te)){We=1,Or(e,Fn(l,e.current)),ke=null;return}}catch(h){if(o!==null)throw ke=o,h;We=1,Or(e,Fn(l,e.current)),ke=null;return}n.flags&32768?(Re||r===1?e=!0:fi||(Te&536870912)!==0?e=!1:(Pt=e=!0,(r===2||r===9||r===3||r===6)&&(r=jn.current,r!==null&&r.tag===13&&(r.flags|=16384))),am(n,e)):Fr(n)}function Fr(e){var n=e;do{if((n.flags&32768)!==0){am(n,Pt);return}e=n.return;var l=i1(n.alternate,n,Ot);if(l!==null){ke=l;return}if(n=n.sibling,n!==null){ke=n;return}ke=n=e}while(n!==null);We===0&&(We=5)}function am(e,n){do{var l=a1(e.alternate,e);if(l!==null){l.flags&=32767,ke=l;return}if(l=e.return,l!==null&&(l.flags|=32768,l.subtreeFlags=0,l.deletions=null),!n&&(e=e.sibling,e!==null)){ke=e;return}ke=e=l}while(e!==null);We=6,ke=null}function rm(e,n,l,r,o,h,y,v,A){e.cancelPendingCommit=null;do Ir();while(un!==0);if((Oe&6)!==0)throw Error(u(327));if(n!==null){if(n===e.current)throw Error(u(177));if(h=n.lanes|n.childLanes,h|=oo,Fy(e,l,h,y,v,A),e===Ve&&(ke=Ve=null,Te=0),di=n,nl=e,Nt=l,ys=h,bs=o,Kd=r,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,y1(pe,function(){return fm(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||r){r=L.T,L.T=null,o=Z.p,Z.p=2,y=Oe,Oe|=4;try{r1(e,n,l)}finally{Oe=y,Z.p=o,L.T=r}}un=1,um(),om(),sm()}}function um(){if(un===1){un=0;var e=nl,n=di,l=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||l){l=L.T,L.T=null;var r=Z.p;Z.p=2;var o=Oe;Oe|=4;try{Yd(n,e);var h=Os,y=If(e.containerInfo),v=h.focusedElem,A=h.selectionRange;if(y!==v&&v&&v.ownerDocument&&Ff(v.ownerDocument.documentElement,v)){if(A!==null&&lo(v)){var N=A.start,Y=A.end;if(Y===void 0&&(Y=N),"selectionStart"in v)v.selectionStart=N,v.selectionEnd=Math.min(Y,v.value.length);else{var I=v.ownerDocument||document,j=I&&I.defaultView||window;if(j.getSelection){var H=j.getSelection(),ie=v.textContent.length,he=Math.min(A.start,ie),qe=A.end===void 0?he:Math.min(A.end,ie);!H.extend&&he>qe&&(y=qe,qe=he,he=y);var M=Qf(v,he),z=Qf(v,qe);if(M&&z&&(H.rangeCount!==1||H.anchorNode!==M.node||H.anchorOffset!==M.offset||H.focusNode!==z.node||H.focusOffset!==z.offset)){var O=I.createRange();O.setStart(M.node,M.offset),H.removeAllRanges(),he>qe?(H.addRange(O),H.extend(z.node,z.offset)):(O.setEnd(z.node,z.offset),H.addRange(O))}}}}for(I=[],H=v;H=H.parentNode;)H.nodeType===1&&I.push({element:H,left:H.scrollLeft,top:H.scrollTop});for(typeof v.focus=="function"&&v.focus(),v=0;v<I.length;v++){var F=I[v];F.element.scrollLeft=F.left,F.element.scrollTop=F.top}}au=!!_s,Os=_s=null}finally{Oe=o,Z.p=r,L.T=l}}e.current=n,un=2}}function om(){if(un===2){un=0;var e=nl,n=di,l=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||l){l=L.T,L.T=null;var r=Z.p;Z.p=2;var o=Oe;Oe|=4;try{Ld(e,n.alternate,n)}finally{Oe=o,Z.p=r,L.T=l}}un=3}}function sm(){if(un===4||un===3){un=0,Nu();var e=nl,n=di,l=Nt,r=Kd;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?un=5:(un=0,di=nl=null,cm(e,e.pendingLanes));var o=e.pendingLanes;if(o===0&&(el=null),Uu(l),n=n.stateNode,rn&&typeof rn.onCommitFiberRoot=="function")try{rn.onCommitFiberRoot(vn,n,void 0,(n.current.flags&128)===128)}catch{}if(r!==null){n=L.T,o=Z.p,Z.p=2,L.T=null;try{for(var h=e.onRecoverableError,y=0;y<r.length;y++){var v=r[y];h(v.value,{componentStack:v.stack})}}finally{L.T=n,Z.p=o}}(Nt&3)!==0&&Ir(),ct(e),o=e.pendingLanes,(l&261930)!==0&&(o&42)!==0?e===vs?ma++:(ma=0,vs=e):ma=0,pa(0)}}function cm(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,Ki(n)))}function Ir(){return um(),om(),sm(),fm()}function fm(){if(un!==5)return!1;var e=nl,n=ys;ys=0;var l=Uu(Nt),r=L.T,o=Z.p;try{Z.p=32>l?32:l,L.T=null,l=bs,bs=null;var h=nl,y=Nt;if(un=0,di=nl=null,Nt=0,(Oe&6)!==0)throw Error(u(331));var v=Oe;if(Oe|=4,Fd(h.current),Xd(h,h.current,y,l),Oe=v,pa(0,!1),rn&&typeof rn.onPostCommitFiberRoot=="function")try{rn.onPostCommitFiberRoot(vn,h)}catch{}return!0}finally{Z.p=o,L.T=r,cm(e,n)}}function hm(e,n,l){n=Fn(l,n),n=Wo(e.stateNode,n,2),e=Zt(e,n,2),e!==null&&(ji(e,2),ct(e))}function Le(e,n,l){if(e.tag===3)hm(e,e,l);else for(;n!==null;){if(n.tag===3){hm(n,e,l);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(el===null||!el.has(r))){e=Fn(l,e),l=dd(2),r=Zt(n,l,2),r!==null&&(md(l,r,n,e),ji(r,2),ct(r));break}}n=n.return}}function Es(e,n,l){var r=e.pingCache;if(r===null){r=e.pingCache=new s1;var o=new Set;r.set(n,o)}else o=r.get(n),o===void 0&&(o=new Set,r.set(n,o));o.has(l)||(ms=!0,o.add(l),e=m1.bind(null,e,n,l),n.then(e,e))}function m1(e,n,l){var r=e.pingCache;r!==null&&r.delete(n),e.pingedLanes|=e.suspendedLanes&l,e.warmLanes&=~l,Ve===e&&(Te&l)===l&&(We===4||We===3&&(Te&62914560)===Te&&300>bn()-Yr?(Oe&2)===0&&mi(e,0):ps|=l,hi===Te&&(hi=0)),ct(e)}function dm(e,n){n===0&&(n=uf()),e=yl(e,n),e!==null&&(ji(e,n),ct(e))}function p1(e){var n=e.memoizedState,l=0;n!==null&&(l=n.retryLane),dm(e,l)}function g1(e,n){var l=0;switch(e.tag){case 31:case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(l=o.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(u(314))}r!==null&&r.delete(n),dm(e,l)}function y1(e,n){return Ll(e,n)}var Zr=null,gi=null,ks=!1,Kr=!1,Cs=!1,ll=0;function ct(e){e!==gi&&e.next===null&&(gi===null?Zr=gi=e:gi=gi.next=e),Kr=!0,ks||(ks=!0,v1())}function pa(e,n){if(!Cs&&Kr){Cs=!0;do for(var l=!1,r=Zr;r!==null;){if(e!==0){var o=r.pendingLanes;if(o===0)var h=0;else{var y=r.suspendedLanes,v=r.pingedLanes;h=(1<<31-Ye(42|e)+1)-1,h&=o&~(y&~v),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(l=!0,ym(r,h))}else h=Te,h=$a(r,r===Ve?h:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(h&3)===0||Ni(r,h)||(l=!0,ym(r,h));r=r.next}while(l);Cs=!1}}function b1(){mm()}function mm(){Kr=ks=!1;var e=0;ll!==0&&R1()&&(e=ll);for(var n=bn(),l=null,r=Zr;r!==null;){var o=r.next,h=pm(r,n);h===0?(r.next=null,l===null?Zr=o:l.next=o,o===null&&(gi=l)):(l=r,(e!==0||(h&3)!==0)&&(Kr=!0)),r=o}un!==0&&un!==5||pa(e),ll!==0&&(ll=0)}function pm(e,n){for(var l=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var y=31-Ye(h),v=1<<y,A=o[y];A===-1?((v&l)===0||(v&r)!==0)&&(o[y]=Qy(v,n)):A<=n&&(e.expiredLanes|=v),h&=~v}if(n=Ve,l=Te,l=$a(e,e===n?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,l===0||e===n&&(je===2||je===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Oi(r),e.callbackNode=null,e.callbackPriority=0;if((l&3)===0||Ni(e,l)){if(n=l&-l,n===e.callbackPriority)return n;switch(r!==null&&Oi(r),Uu(l)){case 2:case 8:l=W;break;case 32:l=pe;break;case 268435456:l=Ne;break;default:l=pe}return r=gm.bind(null,e),l=Ll(l,r),e.callbackPriority=n,e.callbackNode=l,n}return r!==null&&r!==null&&Oi(r),e.callbackPriority=2,e.callbackNode=null,2}function gm(e,n){if(un!==0&&un!==5)return e.callbackNode=null,e.callbackPriority=0,null;var l=e.callbackNode;if(Ir()&&e.callbackNode!==l)return null;var r=Te;return r=$a(e,e===Ve?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Wd(e,r,n),pm(e,bn()),e.callbackNode!=null&&e.callbackNode===l?gm.bind(null,e):null)}function ym(e,n){if(Ir())return null;Wd(e,n,!0)}function v1(){M1(function(){(Oe&6)!==0?Ll(Q,b1):mm()})}function As(){if(ll===0){var e=ni;e===0&&(e=Ja,Ja<<=1,(Ja&261888)===0&&(Ja=256)),ll=e}return ll}function bm(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:lr(""+e)}function vm(e,n){var l=n.ownerDocument.createElement("input");return l.name=n.name,l.value=n.value,e.id&&l.setAttribute("form",e.id),n.parentNode.insertBefore(l,n),e=new FormData(e),l.parentNode.removeChild(l),e}function x1(e,n,l,r,o){if(n==="submit"&&l&&l.stateNode===o){var h=bm((o[kn]||null).action),y=r.submitter;y&&(n=(n=y[kn]||null)?bm(n.formAction):y.getAttribute("formAction"),n!==null&&(h=n,y=null));var v=new ur("action","action",null,r,o);e.push({event:v,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(ll!==0){var A=y?vm(o,y):new FormData(o);Qo(l,{pending:!0,data:A,method:o.method,action:h},null,A)}}else typeof h=="function"&&(v.preventDefault(),A=y?vm(o,y):new FormData(o),Qo(l,{pending:!0,data:A,method:o.method,action:h},h,A))},currentTarget:o}]})}}for(var ws=0;ws<uo.length;ws++){var Ts=uo[ws],S1=Ts.toLowerCase(),E1=Ts[0].toUpperCase()+Ts.slice(1);tt(S1,"on"+E1)}tt(Jf,"onAnimationEnd"),tt(Wf,"onAnimationIteration"),tt(Pf,"onAnimationStart"),tt("dblclick","onDoubleClick"),tt("focusin","onFocus"),tt("focusout","onBlur"),tt(U0,"onTransitionRun"),tt(H0,"onTransitionStart"),tt(q0,"onTransitionCancel"),tt($f,"onTransitionEnd"),Yl("onMouseEnter",["mouseout","mouseover"]),Yl("onMouseLeave",["mouseout","mouseover"]),Yl("onPointerEnter",["pointerout","pointerover"]),Yl("onPointerLeave",["pointerout","pointerover"]),dl("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),dl("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),dl("onBeforeInput",["compositionend","keypress","textInput","paste"]),dl("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),dl("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),dl("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ga="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),k1=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ga));function xm(e,n){n=(n&4)!==0;for(var l=0;l<e.length;l++){var r=e[l],o=r.event;r=r.listeners;e:{var h=void 0;if(n)for(var y=r.length-1;0<=y;y--){var v=r[y],A=v.instance,N=v.currentTarget;if(v=v.listener,A!==h&&o.isPropagationStopped())break e;h=v,o.currentTarget=N;try{h(o)}catch(Y){cr(Y)}o.currentTarget=null,h=A}else for(y=0;y<r.length;y++){if(v=r[y],A=v.instance,N=v.currentTarget,v=v.listener,A!==h&&o.isPropagationStopped())break e;h=v,o.currentTarget=N;try{h(o)}catch(Y){cr(Y)}o.currentTarget=null,h=A}}}}function Ce(e,n){var l=n[Hu];l===void 0&&(l=n[Hu]=new Set);var r=e+"__bubble";l.has(r)||(Sm(n,e,2,!1),l.add(r))}function zs(e,n,l){var r=0;n&&(r|=4),Sm(l,e,r,n)}var Jr="_reactListening"+Math.random().toString(36).slice(2);function Rs(e){if(!e[Jr]){e[Jr]=!0,mf.forEach(function(l){l!=="selectionchange"&&(k1.has(l)||zs(l,!1,e),zs(l,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Jr]||(n[Jr]=!0,zs("selectionchange",!1,n))}}function Sm(e,n,l,r){switch(Jm(n)){case 2:var o=W1;break;case 8:o=P1;break;default:o=Gs}l=o.bind(null,n,l,e),o=void 0,!Zu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(n,l,{capture:!0,passive:o}):e.addEventListener(n,l,!0):o!==void 0?e.addEventListener(n,l,{passive:o}):e.addEventListener(n,l,!1)}function Ds(e,n,l,r,o){var h=r;if((n&1)===0&&(n&2)===0&&r!==null)e:for(;;){if(r===null)return;var y=r.tag;if(y===3||y===4){var v=r.stateNode.containerInfo;if(v===o)break;if(y===4)for(y=r.return;y!==null;){var A=y.tag;if((A===3||A===4)&&y.stateNode.containerInfo===o)return;y=y.return}for(;v!==null;){if(y=Ul(v),y===null)return;if(A=y.tag,A===5||A===6||A===26||A===27){r=h=y;continue e}v=v.parentNode}}r=r.return}wf(function(){var N=h,Y=Fu(l),I=[];e:{var j=eh.get(e);if(j!==void 0){var H=ur,ie=e;switch(e){case"keypress":if(ar(l)===0)break e;case"keydown":case"keyup":H=g0;break;case"focusin":ie="focus",H=Pu;break;case"focusout":ie="blur",H=Pu;break;case"beforeblur":case"afterblur":H=Pu;break;case"click":if(l.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":H=Rf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":H=i0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":H=v0;break;case Jf:case Wf:case Pf:H=u0;break;case $f:H=S0;break;case"scroll":case"scrollend":H=t0;break;case"wheel":H=k0;break;case"copy":case"cut":case"paste":H=s0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":H=Mf;break;case"toggle":case"beforetoggle":H=A0}var he=(n&4)!==0,qe=!he&&(e==="scroll"||e==="scrollend"),M=he?j!==null?j+"Capture":null:j;he=[];for(var z=N,O;z!==null;){var F=z;if(O=F.stateNode,F=F.tag,F!==5&&F!==26&&F!==27||O===null||M===null||(F=Ui(z,M),F!=null&&he.push(ya(z,F,O))),qe)break;z=z.return}0<he.length&&(j=new H(j,ie,null,l,Y),I.push({event:j,listeners:he}))}}if((n&7)===0){e:{if(j=e==="mouseover"||e==="pointerover",H=e==="mouseout"||e==="pointerout",j&&l!==Qu&&(ie=l.relatedTarget||l.fromElement)&&(Ul(ie)||ie[Bl]))break e;if((H||j)&&(j=Y.window===Y?Y:(j=Y.ownerDocument)?j.defaultView||j.parentWindow:window,H?(ie=l.relatedTarget||l.toElement,H=N,ie=ie?Ul(ie):null,ie!==null&&(qe=c(ie),he=ie.tag,ie!==qe||he!==5&&he!==27&&he!==6)&&(ie=null)):(H=null,ie=N),H!==ie)){if(he=Rf,F="onMouseLeave",M="onMouseEnter",z="mouse",(e==="pointerout"||e==="pointerover")&&(he=Mf,F="onPointerLeave",M="onPointerEnter",z="pointer"),qe=H==null?j:Bi(H),O=ie==null?j:Bi(ie),j=new he(F,z+"leave",H,l,Y),j.target=qe,j.relatedTarget=O,F=null,Ul(Y)===N&&(he=new he(M,z+"enter",ie,l,Y),he.target=O,he.relatedTarget=qe,F=he),qe=F,H&&ie)n:{for(he=C1,M=H,z=ie,O=0,F=M;F;F=he(F))O++;F=0;for(var se=z;se;se=he(se))F++;for(;0<O-F;)M=he(M),O--;for(;0<F-O;)z=he(z),F--;for(;O--;){if(M===z||z!==null&&M===z.alternate){he=M;break n}M=he(M),z=he(z)}he=null}else he=null;H!==null&&Em(I,j,H,he,!1),ie!==null&&qe!==null&&Em(I,qe,ie,he,!0)}}e:{if(j=N?Bi(N):window,H=j.nodeName&&j.nodeName.toLowerCase(),H==="select"||H==="input"&&j.type==="file")var Me=Hf;else if(Bf(j))if(qf)Me=j0;else{Me=O0;var re=_0}else H=j.nodeName,!H||H.toLowerCase()!=="input"||j.type!=="checkbox"&&j.type!=="radio"?N&&Gu(N.elementType)&&(Me=Hf):Me=N0;if(Me&&(Me=Me(e,N))){Uf(I,Me,l,Y);break e}re&&re(e,j,N),e==="focusout"&&N&&j.type==="number"&&N.memoizedProps.value!=null&&Xu(j,"number",j.value)}switch(re=N?Bi(N):window,e){case"focusin":(Bf(re)||re.contentEditable==="true")&&(Il=re,io=N,Fi=null);break;case"focusout":Fi=io=Il=null;break;case"mousedown":ao=!0;break;case"contextmenu":case"mouseup":case"dragend":ao=!1,Zf(I,l,Y);break;case"selectionchange":if(B0)break;case"keydown":case"keyup":Zf(I,l,Y)}var be;if(eo)e:{switch(e){case"compositionstart":var ze="onCompositionStart";break e;case"compositionend":ze="onCompositionEnd";break e;case"compositionupdate":ze="onCompositionUpdate";break e}ze=void 0}else Fl?jf(e,l)&&(ze="onCompositionEnd"):e==="keydown"&&l.keyCode===229&&(ze="onCompositionStart");ze&&(_f&&l.locale!=="ko"&&(Fl||ze!=="onCompositionStart"?ze==="onCompositionEnd"&&Fl&&(be=Tf()):(Yt=Y,Ku="value"in Yt?Yt.value:Yt.textContent,Fl=!0)),re=Wr(N,ze),0<re.length&&(ze=new Df(ze,e,null,l,Y),I.push({event:ze,listeners:re}),be?ze.data=be:(be=Lf(l),be!==null&&(ze.data=be)))),(be=T0?z0(e,l):R0(e,l))&&(ze=Wr(N,"onBeforeInput"),0<ze.length&&(re=new Df("onBeforeInput","beforeinput",null,l,Y),I.push({event:re,listeners:ze}),re.data=be)),x1(I,e,N,l,Y)}xm(I,n)})}function ya(e,n,l){return{instance:e,listener:n,currentTarget:l}}function Wr(e,n){for(var l=n+"Capture",r=[];e!==null;){var o=e,h=o.stateNode;if(o=o.tag,o!==5&&o!==26&&o!==27||h===null||(o=Ui(e,l),o!=null&&r.unshift(ya(e,o,h)),o=Ui(e,n),o!=null&&r.push(ya(e,o,h))),e.tag===3)return r;e=e.return}return[]}function C1(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Em(e,n,l,r,o){for(var h=n._reactName,y=[];l!==null&&l!==r;){var v=l,A=v.alternate,N=v.stateNode;if(v=v.tag,A!==null&&A===r)break;v!==5&&v!==26&&v!==27||N===null||(A=N,o?(N=Ui(l,h),N!=null&&y.unshift(ya(l,N,A))):o||(N=Ui(l,h),N!=null&&y.push(ya(l,N,A)))),l=l.return}y.length!==0&&e.push({event:n,listeners:y})}var A1=/\r\n?/g,w1=/\u0000|\uFFFD/g;function km(e){return(typeof e=="string"?e:""+e).replace(A1,`
`).replace(w1,"")}function Cm(e,n){return n=km(n),km(e)===n}function He(e,n,l,r,o,h){switch(l){case"children":typeof r=="string"?n==="body"||n==="textarea"&&r===""||Xl(e,r):(typeof r=="number"||typeof r=="bigint")&&n!=="body"&&Xl(e,""+r);break;case"className":nr(e,"class",r);break;case"tabIndex":nr(e,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":nr(e,l,r);break;case"style":Cf(e,r,h);break;case"data":if(n!=="object"){nr(e,"data",r);break}case"src":case"href":if(r===""&&(n!=="a"||l!=="href")){e.removeAttribute(l);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(l);break}r=lr(""+r),e.setAttribute(l,r);break;case"action":case"formAction":if(typeof r=="function"){e.setAttribute(l,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(l==="formAction"?(n!=="input"&&He(e,n,"name",o.name,o,null),He(e,n,"formEncType",o.formEncType,o,null),He(e,n,"formMethod",o.formMethod,o,null),He(e,n,"formTarget",o.formTarget,o,null)):(He(e,n,"encType",o.encType,o,null),He(e,n,"method",o.method,o,null),He(e,n,"target",o.target,o,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(l);break}r=lr(""+r),e.setAttribute(l,r);break;case"onClick":r!=null&&(e.onclick=vt);break;case"onScroll":r!=null&&Ce("scroll",e);break;case"onScrollEnd":r!=null&&Ce("scrollend",e);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(u(61));if(l=r.__html,l!=null){if(o.children!=null)throw Error(u(60));e.innerHTML=l}}break;case"multiple":e.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":e.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){e.removeAttribute("xlink:href");break}l=lr(""+r),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",l);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(l,""+r):e.removeAttribute(l);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(l,""):e.removeAttribute(l);break;case"capture":case"download":r===!0?e.setAttribute(l,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(l,r):e.removeAttribute(l);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?e.setAttribute(l,r):e.removeAttribute(l);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?e.removeAttribute(l):e.setAttribute(l,r);break;case"popover":Ce("beforetoggle",e),Ce("toggle",e),er(e,"popover",r);break;case"xlinkActuate":bt(e,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":bt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":bt(e,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":bt(e,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":bt(e,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":bt(e,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":bt(e,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":bt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":bt(e,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":er(e,"is",r);break;case"innerText":case"textContent":break;default:(!(2<l.length)||l[0]!=="o"&&l[0]!=="O"||l[1]!=="n"&&l[1]!=="N")&&(l=e0.get(l)||l,er(e,l,r))}}function Ms(e,n,l,r,o,h){switch(l){case"style":Cf(e,r,h);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(u(61));if(l=r.__html,l!=null){if(o.children!=null)throw Error(u(60));e.innerHTML=l}}break;case"children":typeof r=="string"?Xl(e,r):(typeof r=="number"||typeof r=="bigint")&&Xl(e,""+r);break;case"onScroll":r!=null&&Ce("scroll",e);break;case"onScrollEnd":r!=null&&Ce("scrollend",e);break;case"onClick":r!=null&&(e.onclick=vt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!pf.hasOwnProperty(l))e:{if(l[0]==="o"&&l[1]==="n"&&(o=l.endsWith("Capture"),n=l.slice(2,o?l.length-7:void 0),h=e[kn]||null,h=h!=null?h[l]:null,typeof h=="function"&&e.removeEventListener(n,h,o),typeof r=="function")){typeof h!="function"&&h!==null&&(l in e?e[l]=null:e.hasAttribute(l)&&e.removeAttribute(l)),e.addEventListener(n,r,o);break e}l in e?e[l]=r:r===!0?e.setAttribute(l,""):er(e,l,r)}}}function mn(e,n,l){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Ce("error",e),Ce("load",e);var r=!1,o=!1,h;for(h in l)if(l.hasOwnProperty(h)){var y=l[h];if(y!=null)switch(h){case"src":r=!0;break;case"srcSet":o=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(u(137,n));default:He(e,n,h,y,l,null)}}o&&He(e,n,"srcSet",l.srcSet,l,null),r&&He(e,n,"src",l.src,l,null);return;case"input":Ce("invalid",e);var v=h=y=o=null,A=null,N=null;for(r in l)if(l.hasOwnProperty(r)){var Y=l[r];if(Y!=null)switch(r){case"name":o=Y;break;case"type":y=Y;break;case"checked":A=Y;break;case"defaultChecked":N=Y;break;case"value":h=Y;break;case"defaultValue":v=Y;break;case"children":case"dangerouslySetInnerHTML":if(Y!=null)throw Error(u(137,n));break;default:He(e,n,r,Y,l,null)}}xf(e,h,v,A,N,y,o,!1);return;case"select":Ce("invalid",e),r=y=h=null;for(o in l)if(l.hasOwnProperty(o)&&(v=l[o],v!=null))switch(o){case"value":h=v;break;case"defaultValue":y=v;break;case"multiple":r=v;default:He(e,n,o,v,l,null)}n=h,l=y,e.multiple=!!r,n!=null?Vl(e,!!r,n,!1):l!=null&&Vl(e,!!r,l,!0);return;case"textarea":Ce("invalid",e),h=o=r=null;for(y in l)if(l.hasOwnProperty(y)&&(v=l[y],v!=null))switch(y){case"value":r=v;break;case"defaultValue":o=v;break;case"children":h=v;break;case"dangerouslySetInnerHTML":if(v!=null)throw Error(u(91));break;default:He(e,n,y,v,l,null)}Ef(e,r,o,h);return;case"option":for(A in l)l.hasOwnProperty(A)&&(r=l[A],r!=null)&&(A==="selected"?e.selected=r&&typeof r!="function"&&typeof r!="symbol":He(e,n,A,r,l,null));return;case"dialog":Ce("beforetoggle",e),Ce("toggle",e),Ce("cancel",e),Ce("close",e);break;case"iframe":case"object":Ce("load",e);break;case"video":case"audio":for(r=0;r<ga.length;r++)Ce(ga[r],e);break;case"image":Ce("error",e),Ce("load",e);break;case"details":Ce("toggle",e);break;case"embed":case"source":case"link":Ce("error",e),Ce("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(N in l)if(l.hasOwnProperty(N)&&(r=l[N],r!=null))switch(N){case"children":case"dangerouslySetInnerHTML":throw Error(u(137,n));default:He(e,n,N,r,l,null)}return;default:if(Gu(n)){for(Y in l)l.hasOwnProperty(Y)&&(r=l[Y],r!==void 0&&Ms(e,n,Y,r,l,void 0));return}}for(v in l)l.hasOwnProperty(v)&&(r=l[v],r!=null&&He(e,n,v,r,l,null))}function T1(e,n,l,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,h=null,y=null,v=null,A=null,N=null,Y=null;for(H in l){var I=l[H];if(l.hasOwnProperty(H)&&I!=null)switch(H){case"checked":break;case"value":break;case"defaultValue":A=I;default:r.hasOwnProperty(H)||He(e,n,H,null,r,I)}}for(var j in r){var H=r[j];if(I=l[j],r.hasOwnProperty(j)&&(H!=null||I!=null))switch(j){case"type":h=H;break;case"name":o=H;break;case"checked":N=H;break;case"defaultChecked":Y=H;break;case"value":y=H;break;case"defaultValue":v=H;break;case"children":case"dangerouslySetInnerHTML":if(H!=null)throw Error(u(137,n));break;default:H!==I&&He(e,n,j,H,r,I)}}Vu(e,y,v,A,N,Y,h,o);return;case"select":H=y=v=j=null;for(h in l)if(A=l[h],l.hasOwnProperty(h)&&A!=null)switch(h){case"value":break;case"multiple":H=A;default:r.hasOwnProperty(h)||He(e,n,h,null,r,A)}for(o in r)if(h=r[o],A=l[o],r.hasOwnProperty(o)&&(h!=null||A!=null))switch(o){case"value":j=h;break;case"defaultValue":v=h;break;case"multiple":y=h;default:h!==A&&He(e,n,o,h,r,A)}n=v,l=y,r=H,j!=null?Vl(e,!!l,j,!1):!!r!=!!l&&(n!=null?Vl(e,!!l,n,!0):Vl(e,!!l,l?[]:"",!1));return;case"textarea":H=j=null;for(v in l)if(o=l[v],l.hasOwnProperty(v)&&o!=null&&!r.hasOwnProperty(v))switch(v){case"value":break;case"children":break;default:He(e,n,v,null,r,o)}for(y in r)if(o=r[y],h=l[y],r.hasOwnProperty(y)&&(o!=null||h!=null))switch(y){case"value":j=o;break;case"defaultValue":H=o;break;case"children":break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(u(91));break;default:o!==h&&He(e,n,y,o,r,h)}Sf(e,j,H);return;case"option":for(var ie in l)j=l[ie],l.hasOwnProperty(ie)&&j!=null&&!r.hasOwnProperty(ie)&&(ie==="selected"?e.selected=!1:He(e,n,ie,null,r,j));for(A in r)j=r[A],H=l[A],r.hasOwnProperty(A)&&j!==H&&(j!=null||H!=null)&&(A==="selected"?e.selected=j&&typeof j!="function"&&typeof j!="symbol":He(e,n,A,j,r,H));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var he in l)j=l[he],l.hasOwnProperty(he)&&j!=null&&!r.hasOwnProperty(he)&&He(e,n,he,null,r,j);for(N in r)if(j=r[N],H=l[N],r.hasOwnProperty(N)&&j!==H&&(j!=null||H!=null))switch(N){case"children":case"dangerouslySetInnerHTML":if(j!=null)throw Error(u(137,n));break;default:He(e,n,N,j,r,H)}return;default:if(Gu(n)){for(var qe in l)j=l[qe],l.hasOwnProperty(qe)&&j!==void 0&&!r.hasOwnProperty(qe)&&Ms(e,n,qe,void 0,r,j);for(Y in r)j=r[Y],H=l[Y],!r.hasOwnProperty(Y)||j===H||j===void 0&&H===void 0||Ms(e,n,Y,j,r,H);return}}for(var M in l)j=l[M],l.hasOwnProperty(M)&&j!=null&&!r.hasOwnProperty(M)&&He(e,n,M,null,r,j);for(I in r)j=r[I],H=l[I],!r.hasOwnProperty(I)||j===H||j==null&&H==null||He(e,n,I,j,r,H)}function Am(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function z1(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,l=performance.getEntriesByType("resource"),r=0;r<l.length;r++){var o=l[r],h=o.transferSize,y=o.initiatorType,v=o.duration;if(h&&v&&Am(y)){for(y=0,v=o.responseEnd,r+=1;r<l.length;r++){var A=l[r],N=A.startTime;if(N>v)break;var Y=A.transferSize,I=A.initiatorType;Y&&Am(I)&&(A=A.responseEnd,y+=Y*(A<v?1:(v-N)/(A-N)))}if(--r,n+=8*(h+y)/(o.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var _s=null,Os=null;function Pr(e){return e.nodeType===9?e:e.ownerDocument}function wm(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Tm(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function Ns(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var js=null;function R1(){var e=window.event;return e&&e.type==="popstate"?e===js?!1:(js=e,!0):(js=null,!1)}var zm=typeof setTimeout=="function"?setTimeout:void 0,D1=typeof clearTimeout=="function"?clearTimeout:void 0,Rm=typeof Promise=="function"?Promise:void 0,M1=typeof queueMicrotask=="function"?queueMicrotask:typeof Rm<"u"?function(e){return Rm.resolve(null).then(e).catch(_1)}:zm;function _1(e){setTimeout(function(){throw e})}function il(e){return e==="head"}function Dm(e,n){var l=n,r=0;do{var o=l.nextSibling;if(e.removeChild(l),o&&o.nodeType===8)if(l=o.data,l==="/$"||l==="/&"){if(r===0){e.removeChild(o),xi(n);return}r--}else if(l==="$"||l==="$?"||l==="$~"||l==="$!"||l==="&")r++;else if(l==="html")ba(e.ownerDocument.documentElement);else if(l==="head"){l=e.ownerDocument.head,ba(l);for(var h=l.firstChild;h;){var y=h.nextSibling,v=h.nodeName;h[Li]||v==="SCRIPT"||v==="STYLE"||v==="LINK"&&h.rel.toLowerCase()==="stylesheet"||l.removeChild(h),h=y}}else l==="body"&&ba(e.ownerDocument.body);l=o}while(l);xi(n)}function Mm(e,n){var l=e;e=0;do{var r=l.nextSibling;if(l.nodeType===1?n?(l._stashedDisplay=l.style.display,l.style.display="none"):(l.style.display=l._stashedDisplay||"",l.getAttribute("style")===""&&l.removeAttribute("style")):l.nodeType===3&&(n?(l._stashedText=l.nodeValue,l.nodeValue=""):l.nodeValue=l._stashedText||""),r&&r.nodeType===8)if(l=r.data,l==="/$"){if(e===0)break;e--}else l!=="$"&&l!=="$?"&&l!=="$~"&&l!=="$!"||e++;l=r}while(l)}function Ls(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var l=n;switch(n=n.nextSibling,l.nodeName){case"HTML":case"HEAD":case"BODY":Ls(l),qu(l);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(l.rel.toLowerCase()==="stylesheet")continue}e.removeChild(l)}}function O1(e,n,l,r){for(;e.nodeType===1;){var o=l;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(r){if(!e[Li])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==o.rel||e.getAttribute("href")!==(o.href==null||o.href===""?null:o.href)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin)||e.getAttribute("title")!==(o.title==null?null:o.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(o.src==null?null:o.src)||e.getAttribute("type")!==(o.type==null?null:o.type)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var h=o.name==null?null:""+o.name;if(o.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=Wn(e.nextSibling),e===null)break}return null}function N1(e,n,l){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!l||(e=Wn(e.nextSibling),e===null))return null;return e}function _m(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Wn(e.nextSibling),e===null))return null;return e}function Bs(e){return e.data==="$?"||e.data==="$~"}function Us(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function j1(e,n){var l=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||l.readyState!=="loading")n();else{var r=function(){n(),l.removeEventListener("DOMContentLoaded",r)};l.addEventListener("DOMContentLoaded",r),e._reactRetry=r}}function Wn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var Hs=null;function Om(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var l=e.data;if(l==="/$"||l==="/&"){if(n===0)return Wn(e.nextSibling);n--}else l!=="$"&&l!=="$!"&&l!=="$?"&&l!=="$~"&&l!=="&"||n++}e=e.nextSibling}return null}function Nm(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var l=e.data;if(l==="$"||l==="$!"||l==="$?"||l==="$~"||l==="&"){if(n===0)return e;n--}else l!=="/$"&&l!=="/&"||n++}e=e.previousSibling}return null}function jm(e,n,l){switch(n=Pr(l),e){case"html":if(e=n.documentElement,!e)throw Error(u(452));return e;case"head":if(e=n.head,!e)throw Error(u(453));return e;case"body":if(e=n.body,!e)throw Error(u(454));return e;default:throw Error(u(451))}}function ba(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);qu(e)}var Pn=new Map,Lm=new Set;function $r(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var jt=Z.d;Z.d={f:L1,r:B1,D:U1,C:H1,L:q1,m:Y1,X:X1,S:V1,M:G1};function L1(){var e=jt.f(),n=Gr();return e||n}function B1(e){var n=Hl(e);n!==null&&n.tag===5&&n.type==="form"?$h(n):jt.r(e)}var yi=typeof document>"u"?null:document;function Bm(e,n,l){var r=yi;if(r&&typeof n=="string"&&n){var o=Gn(n);o='link[rel="'+e+'"][href="'+o+'"]',typeof l=="string"&&(o+='[crossorigin="'+l+'"]'),Lm.has(o)||(Lm.add(o),e={rel:e,crossOrigin:l,href:n},r.querySelector(o)===null&&(n=r.createElement("link"),mn(n,"link",e),on(n),r.head.appendChild(n)))}}function U1(e){jt.D(e),Bm("dns-prefetch",e,null)}function H1(e,n){jt.C(e,n),Bm("preconnect",e,n)}function q1(e,n,l){jt.L(e,n,l);var r=yi;if(r&&e&&n){var o='link[rel="preload"][as="'+Gn(n)+'"]';n==="image"&&l&&l.imageSrcSet?(o+='[imagesrcset="'+Gn(l.imageSrcSet)+'"]',typeof l.imageSizes=="string"&&(o+='[imagesizes="'+Gn(l.imageSizes)+'"]')):o+='[href="'+Gn(e)+'"]';var h=o;switch(n){case"style":h=bi(e);break;case"script":h=vi(e)}Pn.has(h)||(e=g({rel:"preload",href:n==="image"&&l&&l.imageSrcSet?void 0:e,as:n},l),Pn.set(h,e),r.querySelector(o)!==null||n==="style"&&r.querySelector(va(h))||n==="script"&&r.querySelector(xa(h))||(n=r.createElement("link"),mn(n,"link",e),on(n),r.head.appendChild(n)))}}function Y1(e,n){jt.m(e,n);var l=yi;if(l&&e){var r=n&&typeof n.as=="string"?n.as:"script",o='link[rel="modulepreload"][as="'+Gn(r)+'"][href="'+Gn(e)+'"]',h=o;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=vi(e)}if(!Pn.has(h)&&(e=g({rel:"modulepreload",href:e},n),Pn.set(h,e),l.querySelector(o)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(l.querySelector(xa(h)))return}r=l.createElement("link"),mn(r,"link",e),on(r),l.head.appendChild(r)}}}function V1(e,n,l){jt.S(e,n,l);var r=yi;if(r&&e){var o=ql(r).hoistableStyles,h=bi(e);n=n||"default";var y=o.get(h);if(!y){var v={loading:0,preload:null};if(y=r.querySelector(va(h)))v.loading=5;else{e=g({rel:"stylesheet",href:e,"data-precedence":n},l),(l=Pn.get(h))&&qs(e,l);var A=y=r.createElement("link");on(A),mn(A,"link",e),A._p=new Promise(function(N,Y){A.onload=N,A.onerror=Y}),A.addEventListener("load",function(){v.loading|=1}),A.addEventListener("error",function(){v.loading|=2}),v.loading|=4,eu(y,n,r)}y={type:"stylesheet",instance:y,count:1,state:v},o.set(h,y)}}}function X1(e,n){jt.X(e,n);var l=yi;if(l&&e){var r=ql(l).hoistableScripts,o=vi(e),h=r.get(o);h||(h=l.querySelector(xa(o)),h||(e=g({src:e,async:!0},n),(n=Pn.get(o))&&Ys(e,n),h=l.createElement("script"),on(h),mn(h,"link",e),l.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},r.set(o,h))}}function G1(e,n){jt.M(e,n);var l=yi;if(l&&e){var r=ql(l).hoistableScripts,o=vi(e),h=r.get(o);h||(h=l.querySelector(xa(o)),h||(e=g({src:e,async:!0,type:"module"},n),(n=Pn.get(o))&&Ys(e,n),h=l.createElement("script"),on(h),mn(h,"link",e),l.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},r.set(o,h))}}function Um(e,n,l,r){var o=(o=oe.current)?$r(o):null;if(!o)throw Error(u(446));switch(e){case"meta":case"title":return null;case"style":return typeof l.precedence=="string"&&typeof l.href=="string"?(n=bi(l.href),l=ql(o).hoistableStyles,r=l.get(n),r||(r={type:"style",instance:null,count:0,state:null},l.set(n,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(l.rel==="stylesheet"&&typeof l.href=="string"&&typeof l.precedence=="string"){e=bi(l.href);var h=ql(o).hoistableStyles,y=h.get(e);if(y||(o=o.ownerDocument||o,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,y),(h=o.querySelector(va(e)))&&!h._p&&(y.instance=h,y.state.loading=5),Pn.has(e)||(l={rel:"preload",as:"style",href:l.href,crossOrigin:l.crossOrigin,integrity:l.integrity,media:l.media,hrefLang:l.hrefLang,referrerPolicy:l.referrerPolicy},Pn.set(e,l),h||Q1(o,e,l,y.state))),n&&r===null)throw Error(u(528,""));return y}if(n&&r!==null)throw Error(u(529,""));return null;case"script":return n=l.async,l=l.src,typeof l=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=vi(l),l=ql(o).hoistableScripts,r=l.get(n),r||(r={type:"script",instance:null,count:0,state:null},l.set(n,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(u(444,e))}}function bi(e){return'href="'+Gn(e)+'"'}function va(e){return'link[rel="stylesheet"]['+e+"]"}function Hm(e){return g({},e,{"data-precedence":e.precedence,precedence:null})}function Q1(e,n,l,r){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?r.loading=1:(n=e.createElement("link"),r.preload=n,n.addEventListener("load",function(){return r.loading|=1}),n.addEventListener("error",function(){return r.loading|=2}),mn(n,"link",l),on(n),e.head.appendChild(n))}function vi(e){return'[src="'+Gn(e)+'"]'}function xa(e){return"script[async]"+e}function qm(e,n,l){if(n.count++,n.instance===null)switch(n.type){case"style":var r=e.querySelector('style[data-href~="'+Gn(l.href)+'"]');if(r)return n.instance=r,on(r),r;var o=g({},l,{"data-href":l.href,"data-precedence":l.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement("style"),on(r),mn(r,"style",o),eu(r,l.precedence,e),n.instance=r;case"stylesheet":o=bi(l.href);var h=e.querySelector(va(o));if(h)return n.state.loading|=4,n.instance=h,on(h),h;r=Hm(l),(o=Pn.get(o))&&qs(r,o),h=(e.ownerDocument||e).createElement("link"),on(h);var y=h;return y._p=new Promise(function(v,A){y.onload=v,y.onerror=A}),mn(h,"link",r),n.state.loading|=4,eu(h,l.precedence,e),n.instance=h;case"script":return h=vi(l.src),(o=e.querySelector(xa(h)))?(n.instance=o,on(o),o):(r=l,(o=Pn.get(h))&&(r=g({},l),Ys(r,o)),e=e.ownerDocument||e,o=e.createElement("script"),on(o),mn(o,"link",r),e.head.appendChild(o),n.instance=o);case"void":return null;default:throw Error(u(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(r=n.instance,n.state.loading|=4,eu(r,l.precedence,e));return n.instance}function eu(e,n,l){for(var r=l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),o=r.length?r[r.length-1]:null,h=o,y=0;y<r.length;y++){var v=r[y];if(v.dataset.precedence===n)h=v;else if(h!==o)break}h?h.parentNode.insertBefore(e,h.nextSibling):(n=l.nodeType===9?l.head:l,n.insertBefore(e,n.firstChild))}function qs(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function Ys(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var nu=null;function Ym(e,n,l){if(nu===null){var r=new Map,o=nu=new Map;o.set(l,r)}else o=nu,r=o.get(l),r||(r=new Map,o.set(l,r));if(r.has(e))return r;for(r.set(e,null),l=l.getElementsByTagName(e),o=0;o<l.length;o++){var h=l[o];if(!(h[Li]||h[cn]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var y=h.getAttribute(n)||"";y=e+y;var v=r.get(y);v?v.push(h):r.set(y,[h])}}return r}function Vm(e,n,l){e=e.ownerDocument||e,e.head.insertBefore(l,n==="title"?e.querySelector("head > title"):null)}function F1(e,n,l){if(l===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(e=n.disabled,typeof n.precedence=="string"&&e==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Xm(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function I1(e,n,l,r){if(l.type==="stylesheet"&&(typeof r.media!="string"||matchMedia(r.media).matches!==!1)&&(l.state.loading&4)===0){if(l.instance===null){var o=bi(r.href),h=n.querySelector(va(o));if(h){n=h._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=tu.bind(e),n.then(e,e)),l.state.loading|=4,l.instance=h,on(h);return}h=n.ownerDocument||n,r=Hm(r),(o=Pn.get(o))&&qs(r,o),h=h.createElement("link"),on(h);var y=h;y._p=new Promise(function(v,A){y.onload=v,y.onerror=A}),mn(h,"link",r),l.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(l,n),(n=l.state.preload)&&(l.state.loading&3)===0&&(e.count++,l=tu.bind(e),n.addEventListener("load",l),n.addEventListener("error",l))}}var Vs=0;function Z1(e,n){return e.stylesheets&&e.count===0&&iu(e,e.stylesheets),0<e.count||0<e.imgCount?function(l){var r=setTimeout(function(){if(e.stylesheets&&iu(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+n);0<e.imgBytes&&Vs===0&&(Vs=62500*z1());var o=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&iu(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>Vs?50:800)+n);return e.unsuspend=l,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(o)}}:null}function tu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)iu(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var lu=null;function iu(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,lu=new Map,n.forEach(K1,e),lu=null,tu.call(e))}function K1(e,n){if(!(n.state.loading&4)){var l=lu.get(e);if(l)var r=l.get(null);else{l=new Map,lu.set(e,l);for(var o=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<o.length;h++){var y=o[h];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(l.set(y.dataset.precedence,y),r=y)}r&&l.set(null,r)}o=n.instance,y=o.getAttribute("data-precedence"),h=l.get(y)||r,h===r&&l.set(null,o),l.set(y,o),this.count++,r=tu.bind(this),o.addEventListener("load",r),o.addEventListener("error",r),h?h.parentNode.insertBefore(o,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(o,e.firstChild)),n.state.loading|=4}}var Sa={$$typeof:U,Provider:null,Consumer:null,_currentValue:ue,_currentValue2:ue,_threadCount:0};function J1(e,n,l,r,o,h,y,v,A){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Lu(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Lu(0),this.hiddenUpdates=Lu(null),this.identifierPrefix=r,this.onUncaughtError=o,this.onCaughtError=h,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=A,this.incompleteTransitions=new Map}function Gm(e,n,l,r,o,h,y,v,A,N,Y,I){return e=new J1(e,n,l,y,A,N,Y,I,v),n=1,h===!0&&(n|=24),h=Nn(3,null,null,n),e.current=h,h.stateNode=e,n=So(),n.refCount++,e.pooledCache=n,n.refCount++,h.memoizedState={element:r,isDehydrated:l,cache:n},Ao(h),e}function Qm(e){return e?(e=Jl,e):Jl}function Fm(e,n,l,r,o,h){o=Qm(o),r.context===null?r.context=o:r.pendingContext=o,r=It(n),r.payload={element:l},h=h===void 0?null:h,h!==null&&(r.callback=h),l=Zt(e,r,n),l!==null&&(Rn(l,e,n),$i(l,e,n))}function Im(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var l=e.retryLane;e.retryLane=l!==0&&l<n?l:n}}function Xs(e,n){Im(e,n),(e=e.alternate)&&Im(e,n)}function Zm(e){if(e.tag===13||e.tag===31){var n=yl(e,67108864);n!==null&&Rn(n,e,67108864),Xs(e,67108864)}}function Km(e){if(e.tag===13||e.tag===31){var n=Hn();n=Bu(n);var l=yl(e,n);l!==null&&Rn(l,e,n),Xs(e,n)}}var au=!0;function W1(e,n,l,r){var o=L.T;L.T=null;var h=Z.p;try{Z.p=2,Gs(e,n,l,r)}finally{Z.p=h,L.T=o}}function P1(e,n,l,r){var o=L.T;L.T=null;var h=Z.p;try{Z.p=8,Gs(e,n,l,r)}finally{Z.p=h,L.T=o}}function Gs(e,n,l,r){if(au){var o=Qs(r);if(o===null)Ds(e,n,r,ru,l),Wm(e,r);else if(eb(o,e,n,l,r))r.stopPropagation();else if(Wm(e,r),n&4&&-1<$1.indexOf(e)){for(;o!==null;){var h=Hl(o);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var y=hl(h.pendingLanes);if(y!==0){var v=h;for(v.pendingLanes|=2,v.entangledLanes|=2;y;){var A=1<<31-Ye(y);v.entanglements[1]|=A,y&=~A}ct(h),(Oe&6)===0&&(Vr=bn()+500,pa(0))}}break;case 31:case 13:v=yl(h,2),v!==null&&Rn(v,h,2),Gr(),Xs(h,2)}if(h=Qs(r),h===null&&Ds(e,n,r,ru,l),h===o)break;o=h}o!==null&&r.stopPropagation()}else Ds(e,n,r,null,l)}}function Qs(e){return e=Fu(e),Fs(e)}var ru=null;function Fs(e){if(ru=null,e=Ul(e),e!==null){var n=c(e);if(n===null)e=null;else{var l=n.tag;if(l===13){if(e=f(n),e!==null)return e;e=null}else if(l===31){if(e=m(n),e!==null)return e;e=null}else if(l===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return ru=e,null}function Jm(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(ju()){case Q:return 2;case W:return 8;case pe:case Ee:return 32;case Ne:return 268435456;default:return 32}default:return 32}}var Is=!1,al=null,rl=null,ul=null,Ea=new Map,ka=new Map,ol=[],$1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Wm(e,n){switch(e){case"focusin":case"focusout":al=null;break;case"dragenter":case"dragleave":rl=null;break;case"mouseover":case"mouseout":ul=null;break;case"pointerover":case"pointerout":Ea.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":ka.delete(n.pointerId)}}function Ca(e,n,l,r,o,h){return e===null||e.nativeEvent!==h?(e={blockedOn:n,domEventName:l,eventSystemFlags:r,nativeEvent:h,targetContainers:[o]},n!==null&&(n=Hl(n),n!==null&&Zm(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,o!==null&&n.indexOf(o)===-1&&n.push(o),e)}function eb(e,n,l,r,o){switch(n){case"focusin":return al=Ca(al,e,n,l,r,o),!0;case"dragenter":return rl=Ca(rl,e,n,l,r,o),!0;case"mouseover":return ul=Ca(ul,e,n,l,r,o),!0;case"pointerover":var h=o.pointerId;return Ea.set(h,Ca(Ea.get(h)||null,e,n,l,r,o)),!0;case"gotpointercapture":return h=o.pointerId,ka.set(h,Ca(ka.get(h)||null,e,n,l,r,o)),!0}return!1}function Pm(e){var n=Ul(e.target);if(n!==null){var l=c(n);if(l!==null){if(n=l.tag,n===13){if(n=f(l),n!==null){e.blockedOn=n,hf(e.priority,function(){Km(l)});return}}else if(n===31){if(n=m(l),n!==null){e.blockedOn=n,hf(e.priority,function(){Km(l)});return}}else if(n===3&&l.stateNode.current.memoizedState.isDehydrated){e.blockedOn=l.tag===3?l.stateNode.containerInfo:null;return}}}e.blockedOn=null}function uu(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var l=Qs(e.nativeEvent);if(l===null){l=e.nativeEvent;var r=new l.constructor(l.type,l);Qu=r,l.target.dispatchEvent(r),Qu=null}else return n=Hl(l),n!==null&&Zm(n),e.blockedOn=l,!1;n.shift()}return!0}function $m(e,n,l){uu(e)&&l.delete(n)}function nb(){Is=!1,al!==null&&uu(al)&&(al=null),rl!==null&&uu(rl)&&(rl=null),ul!==null&&uu(ul)&&(ul=null),Ea.forEach($m),ka.forEach($m)}function ou(e,n){e.blockedOn===n&&(e.blockedOn=null,Is||(Is=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,nb)))}var su=null;function ep(e){su!==e&&(su=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){su===e&&(su=null);for(var n=0;n<e.length;n+=3){var l=e[n],r=e[n+1],o=e[n+2];if(typeof r!="function"){if(Fs(r||l)===null)continue;break}var h=Hl(l);h!==null&&(e.splice(n,3),n-=3,Qo(h,{pending:!0,data:o,method:l.method,action:r},r,o))}}))}function xi(e){function n(A){return ou(A,e)}al!==null&&ou(al,e),rl!==null&&ou(rl,e),ul!==null&&ou(ul,e),Ea.forEach(n),ka.forEach(n);for(var l=0;l<ol.length;l++){var r=ol[l];r.blockedOn===e&&(r.blockedOn=null)}for(;0<ol.length&&(l=ol[0],l.blockedOn===null);)Pm(l),l.blockedOn===null&&ol.shift();if(l=(e.ownerDocument||e).$$reactFormReplay,l!=null)for(r=0;r<l.length;r+=3){var o=l[r],h=l[r+1],y=o[kn]||null;if(typeof h=="function")y||ep(l);else if(y){var v=null;if(h&&h.hasAttribute("formAction")){if(o=h,y=h[kn]||null)v=y.formAction;else if(Fs(o)!==null)continue}else v=y.action;typeof v=="function"?l[r+1]=v:(l.splice(r,3),r-=3),ep(l)}}}function np(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(y){return o=y})},focusReset:"manual",scroll:"manual"})}function n(){o!==null&&(o(),o=null),r||setTimeout(l,20)}function l(){if(!r&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var r=!1,o=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(l,100),function(){r=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),o!==null&&(o(),o=null)}}}function Zs(e){this._internalRoot=e}cu.prototype.render=Zs.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(u(409));var l=n.current,r=Hn();Fm(l,r,e,n,null,null)},cu.prototype.unmount=Zs.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Fm(e.current,2,null,e,null,null),Gr(),n[Bl]=null}};function cu(e){this._internalRoot=e}cu.prototype.unstable_scheduleHydration=function(e){if(e){var n=ff();e={blockedOn:null,target:e,priority:n};for(var l=0;l<ol.length&&n!==0&&n<ol[l].priority;l++);ol.splice(l,0,e),l===0&&Pm(e)}};var tp=i.version;if(tp!=="19.2.4")throw Error(u(527,tp,"19.2.4"));Z.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(u(188)):(e=Object.keys(e).join(","),Error(u(268,e)));return e=d(n),e=e!==null?b(e):null,e=e===null?null:e.stateNode,e};var tb={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:L,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var fu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!fu.isDisabled&&fu.supportsFiber)try{vn=fu.inject(tb),rn=fu}catch{}}return wa.createRoot=function(e,n){if(!s(e))throw Error(u(299));var l=!1,r="",o=sd,h=cd,y=fd;return n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(o=n.onUncaughtError),n.onCaughtError!==void 0&&(h=n.onCaughtError),n.onRecoverableError!==void 0&&(y=n.onRecoverableError)),n=Gm(e,1,!1,null,null,l,r,null,o,h,y,np),e[Bl]=n.current,Rs(e),new Zs(n)},wa.hydrateRoot=function(e,n,l){if(!s(e))throw Error(u(299));var r=!1,o="",h=sd,y=cd,v=fd,A=null;return l!=null&&(l.unstable_strictMode===!0&&(r=!0),l.identifierPrefix!==void 0&&(o=l.identifierPrefix),l.onUncaughtError!==void 0&&(h=l.onUncaughtError),l.onCaughtError!==void 0&&(y=l.onCaughtError),l.onRecoverableError!==void 0&&(v=l.onRecoverableError),l.formState!==void 0&&(A=l.formState)),n=Gm(e,1,!0,n,l??null,r,o,A,h,y,v,np),n.context=Qm(null),l=n.current,r=Hn(),r=Bu(r),o=It(r),o.callback=null,Zt(l,o,r),l=r,n.current.lanes=l,ji(n,l),ct(n),e[Bl]=n.current,Rs(e),new cu(n)},wa.version="19.2.4",wa}var hp;function hb(){if(hp)return Ws.exports;hp=1;function t(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t)}catch(i){console.error(i)}}return t(),Ws.exports=fb(),Ws.exports}var db=hb();var dp="popstate";function mp(t){return typeof t=="object"&&t!=null&&"pathname"in t&&"search"in t&&"hash"in t&&"state"in t&&"key"in t}function mb(t={}){function i(u,s){let c=s.state?.masked,{pathname:f,search:m,hash:p}=c||u.location;return Sc("",{pathname:f,search:m,hash:p},s.state&&s.state.usr||null,s.state&&s.state.key||"default",c?{pathname:u.location.pathname,search:u.location.search,hash:u.location.hash}:void 0)}function a(u,s){return typeof s=="string"?s:La(s)}return gb(i,a,null,t)}function Ke(t,i){if(t===!1||t===null||typeof t>"u")throw new Error(i)}function dt(t,i){if(!t){typeof console<"u"&&console.warn(i);try{throw new Error(i)}catch{}}}function pb(){return Math.random().toString(36).substring(2,10)}function pp(t,i){return{usr:t.state,key:t.key,idx:i,masked:t.unstable_mask?{pathname:t.pathname,search:t.search,hash:t.hash}:void 0}}function Sc(t,i,a=null,u,s){return{pathname:typeof t=="string"?t:t.pathname,search:"",hash:"",...typeof i=="string"?zi(i):i,state:a,key:i&&i.key||u||pb(),unstable_mask:s}}function La({pathname:t="/",search:i="",hash:a=""}){return i&&i!=="?"&&(t+=i.charAt(0)==="?"?i:"?"+i),a&&a!=="#"&&(t+=a.charAt(0)==="#"?a:"#"+a),t}function zi(t){let i={};if(t){let a=t.indexOf("#");a>=0&&(i.hash=t.substring(a),t=t.substring(0,a));let u=t.indexOf("?");u>=0&&(i.search=t.substring(u),t=t.substring(0,u)),t&&(i.pathname=t)}return i}function gb(t,i,a,u={}){let{window:s=document.defaultView,v5Compat:c=!1}=u,f=s.history,m="POP",p=null,d=b();d==null&&(d=0,f.replaceState({...f.state,idx:d},""));function b(){return(f.state||{idx:null}).idx}function g(){m="POP";let D=b(),R=D==null?null:D-d;d=D,p&&p({action:m,location:_.location,delta:R})}function S(D,R){m="PUSH";let X=mp(D)?D:Sc(_.location,D,R);d=b()+1;let U=pp(X,d),te=_.createHref(X.unstable_mask||X);try{f.pushState(U,"",te)}catch(le){if(le instanceof DOMException&&le.name==="DataCloneError")throw le;s.location.assign(te)}c&&p&&p({action:m,location:_.location,delta:1})}function x(D,R){m="REPLACE";let X=mp(D)?D:Sc(_.location,D,R);d=b();let U=pp(X,d),te=_.createHref(X.unstable_mask||X);f.replaceState(U,"",te),c&&p&&p({action:m,location:_.location,delta:0})}function w(D){return yb(D)}let _={get action(){return m},get location(){return t(s,f)},listen(D){if(p)throw new Error("A history only accepts one active listener");return s.addEventListener(dp,g),p=D,()=>{s.removeEventListener(dp,g),p=null}},createHref(D){return i(s,D)},createURL:w,encodeLocation(D){let R=w(D);return{pathname:R.pathname,search:R.search,hash:R.hash}},push:S,replace:x,go(D){return f.go(D)}};return _}function yb(t,i=!1){let a="http://localhost";typeof window<"u"&&(a=window.location.origin!=="null"?window.location.origin:window.location.href),Ke(a,"No window.location.(origin|href) available to create URL");let u=typeof t=="string"?t:La(t);return u=u.replace(/ $/,"%20"),!i&&u.startsWith("//")&&(u=a+u),new URL(u,a)}function hg(t,i,a="/"){return bb(t,i,a,!1)}function bb(t,i,a,u){let s=typeof i=="string"?zi(i):i,c=Lt(s.pathname||"/",a);if(c==null)return null;let f=dg(t);vb(f);let m=null;for(let p=0;m==null&&p<f.length;++p){let d=Db(c);m=zb(f[p],d,u)}return m}function dg(t,i=[],a=[],u="",s=!1){let c=(f,m,p=s,d)=>{let b={relativePath:d===void 0?f.path||"":d,caseSensitive:f.caseSensitive===!0,childrenIndex:m,route:f};if(b.relativePath.startsWith("/")){if(!b.relativePath.startsWith(u)&&p)return;Ke(b.relativePath.startsWith(u),`Absolute route path "${b.relativePath}" nested under path "${u}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),b.relativePath=b.relativePath.slice(u.length)}let g=ht([u,b.relativePath]),S=a.concat(b);f.children&&f.children.length>0&&(Ke(f.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${g}".`),dg(f.children,i,S,g,p)),!(f.path==null&&!f.index)&&i.push({path:g,score:wb(g,f.index),routesMeta:S})};return t.forEach((f,m)=>{if(f.path===""||!f.path?.includes("?"))c(f,m);else for(let p of mg(f.path))c(f,m,!0,p)}),i}function mg(t){let i=t.split("/");if(i.length===0)return[];let[a,...u]=i,s=a.endsWith("?"),c=a.replace(/\?$/,"");if(u.length===0)return s?[c,""]:[c];let f=mg(u.join("/")),m=[];return m.push(...f.map(p=>p===""?c:[c,p].join("/"))),s&&m.push(...f),m.map(p=>t.startsWith("/")&&p===""?"/":p)}function vb(t){t.sort((i,a)=>i.score!==a.score?a.score-i.score:Tb(i.routesMeta.map(u=>u.childrenIndex),a.routesMeta.map(u=>u.childrenIndex)))}var xb=/^:[\w-]+$/,Sb=3,Eb=2,kb=1,Cb=10,Ab=-2,gp=t=>t==="*";function wb(t,i){let a=t.split("/"),u=a.length;return a.some(gp)&&(u+=Ab),i&&(u+=Eb),a.filter(s=>!gp(s)).reduce((s,c)=>s+(xb.test(c)?Sb:c===""?kb:Cb),u)}function Tb(t,i){return t.length===i.length&&t.slice(0,-1).every((u,s)=>u===i[s])?t[t.length-1]-i[i.length-1]:0}function zb(t,i,a=!1){let{routesMeta:u}=t,s={},c="/",f=[];for(let m=0;m<u.length;++m){let p=u[m],d=m===u.length-1,b=c==="/"?i:i.slice(c.length)||"/",g=xu({path:p.relativePath,caseSensitive:p.caseSensitive,end:d},b),S=p.route;if(!g&&d&&a&&!u[u.length-1].route.index&&(g=xu({path:p.relativePath,caseSensitive:p.caseSensitive,end:!1},b)),!g)return null;Object.assign(s,g.params),f.push({params:s,pathname:ht([c,g.pathname]),pathnameBase:Nb(ht([c,g.pathnameBase])),route:S}),g.pathnameBase!=="/"&&(c=ht([c,g.pathnameBase]))}return f}function xu(t,i){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[a,u]=Rb(t.path,t.caseSensitive,t.end),s=i.match(a);if(!s)return null;let c=s[0],f=c.replace(/(.)\/+$/,"$1"),m=s.slice(1);return{params:u.reduce((d,{paramName:b,isOptional:g},S)=>{if(b==="*"){let w=m[S]||"";f=c.slice(0,c.length-w.length).replace(/(.)\/+$/,"$1")}const x=m[S];return g&&!x?d[b]=void 0:d[b]=(x||"").replace(/%2F/g,"/"),d},{}),pathname:c,pathnameBase:f,pattern:t}}function Rb(t,i=!1,a=!0){dt(t==="*"||!t.endsWith("*")||t.endsWith("/*"),`Route path "${t}" will be treated as if it were "${t.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/,"/*")}".`);let u=[],s="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(f,m,p,d,b)=>{if(u.push({paramName:m,isOptional:p!=null}),p){let g=b.charAt(d+f.length);return g&&g!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return t.endsWith("*")?(u.push({paramName:"*"}),s+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):a?s+="\\/*$":t!==""&&t!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,i?void 0:"i"),u]}function Db(t){try{return t.split("/").map(i=>decodeURIComponent(i).replace(/\//g,"%2F")).join("/")}catch(i){return dt(!1,`The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`),t}}function Lt(t,i){if(i==="/")return t;if(!t.toLowerCase().startsWith(i.toLowerCase()))return null;let a=i.endsWith("/")?i.length-1:i.length,u=t.charAt(a);return u&&u!=="/"?null:t.slice(a)||"/"}var Mb=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function _b(t,i="/"){let{pathname:a,search:u="",hash:s=""}=typeof t=="string"?zi(t):t,c;return a?(a=a.replace(/\/\/+/g,"/"),a.startsWith("/")?c=yp(a.substring(1),"/"):c=yp(a,i)):c=i,{pathname:c,search:jb(u),hash:Lb(s)}}function yp(t,i){let a=i.replace(/\/+$/,"").split("/");return t.split("/").forEach(s=>{s===".."?a.length>1&&a.pop():s!=="."&&a.push(s)}),a.length>1?a.join("/"):"/"}function nc(t,i,a,u){return`Cannot include a '${t}' character in a manually specified \`to.${i}\` field [${JSON.stringify(u)}].  Please separate it out to the \`to.${a}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ob(t){return t.filter((i,a)=>a===0||i.route.path&&i.route.path.length>0)}function pg(t){let i=Ob(t);return i.map((a,u)=>u===i.length-1?a.pathname:a.pathnameBase)}function jc(t,i,a,u=!1){let s;typeof t=="string"?s=zi(t):(s={...t},Ke(!s.pathname||!s.pathname.includes("?"),nc("?","pathname","search",s)),Ke(!s.pathname||!s.pathname.includes("#"),nc("#","pathname","hash",s)),Ke(!s.search||!s.search.includes("#"),nc("#","search","hash",s)));let c=t===""||s.pathname==="",f=c?"/":s.pathname,m;if(f==null)m=a;else{let g=i.length-1;if(!u&&f.startsWith("..")){let S=f.split("/");for(;S[0]==="..";)S.shift(),g-=1;s.pathname=S.join("/")}m=g>=0?i[g]:"/"}let p=_b(s,m),d=f&&f!=="/"&&f.endsWith("/"),b=(c||f===".")&&a.endsWith("/");return!p.pathname.endsWith("/")&&(d||b)&&(p.pathname+="/"),p}var ht=t=>t.join("/").replace(/\/\/+/g,"/"),Nb=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),jb=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,Lb=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t,Bb=class{constructor(t,i,a,u=!1){this.status=t,this.statusText=i||"",this.internal=u,a instanceof Error?(this.data=a.toString(),this.error=a):this.data=a}};function Ub(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}function Hb(t){return t.map(i=>i.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var gg=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function yg(t,i){let a=t;if(typeof a!="string"||!Mb.test(a))return{absoluteURL:void 0,isExternal:!1,to:a};let u=a,s=!1;if(gg)try{let c=new URL(window.location.href),f=a.startsWith("//")?new URL(c.protocol+a):new URL(a),m=Lt(f.pathname,i);f.origin===c.origin&&m!=null?a=m+f.search+f.hash:s=!0}catch{dt(!1,`<Link to="${a}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:u,isExternal:s,to:a}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var bg=["POST","PUT","PATCH","DELETE"];new Set(bg);var qb=["GET",...bg];new Set(qb);var Ri=V.createContext(null);Ri.displayName="DataRouter";var wu=V.createContext(null);wu.displayName="DataRouterState";var Yb=V.createContext(!1),vg=V.createContext({isTransitioning:!1});vg.displayName="ViewTransition";var Vb=V.createContext(new Map);Vb.displayName="Fetchers";var Xb=V.createContext(null);Xb.displayName="Await";var et=V.createContext(null);et.displayName="Navigation";var qa=V.createContext(null);qa.displayName="Location";var rt=V.createContext({outlet:null,matches:[],isDataRoute:!1});rt.displayName="Route";var Lc=V.createContext(null);Lc.displayName="RouteError";var xg="REACT_ROUTER_ERROR",Gb="REDIRECT",Qb="ROUTE_ERROR_RESPONSE";function Fb(t){if(t.startsWith(`${xg}:${Gb}:{`))try{let i=JSON.parse(t.slice(28));if(typeof i=="object"&&i&&typeof i.status=="number"&&typeof i.statusText=="string"&&typeof i.location=="string"&&typeof i.reloadDocument=="boolean"&&typeof i.replace=="boolean")return i}catch{}}function Ib(t){if(t.startsWith(`${xg}:${Qb}:{`))try{let i=JSON.parse(t.slice(40));if(typeof i=="object"&&i&&typeof i.status=="number"&&typeof i.statusText=="string")return new Bb(i.status,i.statusText,i.data)}catch{}}function Zb(t,{relative:i}={}){Ke(Ya(),"useHref() may be used only in the context of a <Router> component.");let{basename:a,navigator:u}=V.useContext(et),{hash:s,pathname:c,search:f}=Va(t,{relative:i}),m=c;return a!=="/"&&(m=c==="/"?a:ht([a,c])),u.createHref({pathname:m,search:f,hash:s})}function Ya(){return V.useContext(qa)!=null}function Bt(){return Ke(Ya(),"useLocation() may be used only in the context of a <Router> component."),V.useContext(qa).location}var Sg="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Eg(t){V.useContext(et).static||V.useLayoutEffect(t)}function Bc(){let{isDataRoute:t}=V.useContext(rt);return t?s2():Kb()}function Kb(){Ke(Ya(),"useNavigate() may be used only in the context of a <Router> component.");let t=V.useContext(Ri),{basename:i,navigator:a}=V.useContext(et),{matches:u}=V.useContext(rt),{pathname:s}=Bt(),c=JSON.stringify(pg(u)),f=V.useRef(!1);return Eg(()=>{f.current=!0}),V.useCallback((p,d={})=>{if(dt(f.current,Sg),!f.current)return;if(typeof p=="number"){a.go(p);return}let b=jc(p,JSON.parse(c),s,d.relative==="path");t==null&&i!=="/"&&(b.pathname=b.pathname==="/"?i:ht([i,b.pathname])),(d.replace?a.replace:a.push)(b,d.state,d)},[i,a,c,s,t])}var Jb=V.createContext(null);function Wb(t){let i=V.useContext(rt).outlet;return V.useMemo(()=>i&&V.createElement(Jb.Provider,{value:t},i),[i,t])}function kg(){let{matches:t}=V.useContext(rt),i=t[t.length-1];return i?i.params:{}}function Va(t,{relative:i}={}){let{matches:a}=V.useContext(rt),{pathname:u}=Bt(),s=JSON.stringify(pg(a));return V.useMemo(()=>jc(t,JSON.parse(s),u,i==="path"),[t,s,u,i])}function Pb(t,i){return Cg(t,i)}function Cg(t,i,a){Ke(Ya(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:u}=V.useContext(et),{matches:s}=V.useContext(rt),c=s[s.length-1],f=c?c.params:{},m=c?c.pathname:"/",p=c?c.pathnameBase:"/",d=c&&c.route;{let D=d&&d.path||"";wg(m,!d||D.endsWith("*")||D.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${D}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${D}"> to <Route path="${D==="/"?"*":`${D}/*`}">.`)}let b=Bt(),g;if(i){let D=typeof i=="string"?zi(i):i;Ke(p==="/"||D.pathname?.startsWith(p),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${D.pathname}" was given in the \`location\` prop.`),g=D}else g=b;let S=g.pathname||"/",x=S;if(p!=="/"){let D=p.replace(/^\//,"").split("/");x="/"+S.replace(/^\//,"").split("/").slice(D.length).join("/")}let w=hg(t,{pathname:x});dt(d||w!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),dt(w==null||w[w.length-1].route.element!==void 0||w[w.length-1].route.Component!==void 0||w[w.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let _=l2(w&&w.map(D=>Object.assign({},D,{params:Object.assign({},f,D.params),pathname:ht([p,u.encodeLocation?u.encodeLocation(D.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:D.pathname]),pathnameBase:D.pathnameBase==="/"?p:ht([p,u.encodeLocation?u.encodeLocation(D.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:D.pathnameBase])})),s,a);return i&&_?V.createElement(qa.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...g},navigationType:"POP"}},_):_}function $b(){let t=o2(),i=Ub(t)?`${t.status} ${t.statusText}`:t instanceof Error?t.message:JSON.stringify(t),a=t instanceof Error?t.stack:null,u="rgba(200,200,200, 0.5)",s={padding:"0.5rem",backgroundColor:u},c={padding:"2px 4px",backgroundColor:u},f=null;return console.error("Error handled by React Router default ErrorBoundary:",t),f=V.createElement(V.Fragment,null,V.createElement("p",null,"💿 Hey developer 👋"),V.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",V.createElement("code",{style:c},"ErrorBoundary")," or"," ",V.createElement("code",{style:c},"errorElement")," prop on your route.")),V.createElement(V.Fragment,null,V.createElement("h2",null,"Unexpected Application Error!"),V.createElement("h3",{style:{fontStyle:"italic"}},i),a?V.createElement("pre",{style:s},a):null,f)}var e2=V.createElement($b,null),Ag=class extends V.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,i){return i.location!==t.location||i.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:i.error,location:i.location,revalidation:t.revalidation||i.revalidation}}componentDidCatch(t,i){this.props.onError?this.props.onError(t,i):console.error("React Router caught the following error during render",t)}render(){let t=this.state.error;if(this.context&&typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){const a=Ib(t.digest);a&&(t=a)}let i=t!==void 0?V.createElement(rt.Provider,{value:this.props.routeContext},V.createElement(Lc.Provider,{value:t,children:this.props.component})):this.props.children;return this.context?V.createElement(n2,{error:t},i):i}};Ag.contextType=Yb;var tc=new WeakMap;function n2({children:t,error:i}){let{basename:a}=V.useContext(et);if(typeof i=="object"&&i&&"digest"in i&&typeof i.digest=="string"){let u=Fb(i.digest);if(u){let s=tc.get(i);if(s)throw s;let c=yg(u.location,a);if(gg&&!tc.get(i))if(c.isExternal||u.reloadDocument)window.location.href=c.absoluteURL||c.to;else{const f=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(c.to,{replace:u.replace}));throw tc.set(i,f),f}return V.createElement("meta",{httpEquiv:"refresh",content:`0;url=${c.absoluteURL||c.to}`})}}return t}function t2({routeContext:t,match:i,children:a}){let u=V.useContext(Ri);return u&&u.static&&u.staticContext&&(i.route.errorElement||i.route.ErrorBoundary)&&(u.staticContext._deepestRenderedBoundaryId=i.route.id),V.createElement(rt.Provider,{value:t},a)}function l2(t,i=[],a){let u=a?.state;if(t==null){if(!u)return null;if(u.errors)t=u.matches;else if(i.length===0&&!u.initialized&&u.matches.length>0)t=u.matches;else return null}let s=t,c=u?.errors;if(c!=null){let b=s.findIndex(g=>g.route.id&&c?.[g.route.id]!==void 0);Ke(b>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(c).join(",")}`),s=s.slice(0,Math.min(s.length,b+1))}let f=!1,m=-1;if(a&&u){f=u.renderFallback;for(let b=0;b<s.length;b++){let g=s[b];if((g.route.HydrateFallback||g.route.hydrateFallbackElement)&&(m=b),g.route.id){let{loaderData:S,errors:x}=u,w=g.route.loader&&!S.hasOwnProperty(g.route.id)&&(!x||x[g.route.id]===void 0);if(g.route.lazy||w){a.isStatic&&(f=!0),m>=0?s=s.slice(0,m+1):s=[s[0]];break}}}}let p=a?.onError,d=u&&p?(b,g)=>{p(b,{location:u.location,params:u.matches?.[0]?.params??{},unstable_pattern:Hb(u.matches),errorInfo:g})}:void 0;return s.reduceRight((b,g,S)=>{let x,w=!1,_=null,D=null;u&&(x=c&&g.route.id?c[g.route.id]:void 0,_=g.route.errorElement||e2,f&&(m<0&&S===0?(wg("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),w=!0,D=null):m===S&&(w=!0,D=g.route.hydrateFallbackElement||null)));let R=i.concat(s.slice(0,S+1)),X=()=>{let U;return x?U=_:w?U=D:g.route.Component?U=V.createElement(g.route.Component,null):g.route.element?U=g.route.element:U=b,V.createElement(t2,{match:g,routeContext:{outlet:b,matches:R,isDataRoute:u!=null},children:U})};return u&&(g.route.ErrorBoundary||g.route.errorElement||S===0)?V.createElement(Ag,{location:u.location,revalidation:u.revalidation,component:_,error:x,children:X(),routeContext:{outlet:null,matches:R,isDataRoute:!0},onError:d}):X()},null)}function Uc(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function i2(t){let i=V.useContext(Ri);return Ke(i,Uc(t)),i}function a2(t){let i=V.useContext(wu);return Ke(i,Uc(t)),i}function r2(t){let i=V.useContext(rt);return Ke(i,Uc(t)),i}function Hc(t){let i=r2(t),a=i.matches[i.matches.length-1];return Ke(a.route.id,`${t} can only be used on routes that contain a unique "id"`),a.route.id}function u2(){return Hc("useRouteId")}function o2(){let t=V.useContext(Lc),i=a2("useRouteError"),a=Hc("useRouteError");return t!==void 0?t:i.errors?.[a]}function s2(){let{router:t}=i2("useNavigate"),i=Hc("useNavigate"),a=V.useRef(!1);return Eg(()=>{a.current=!0}),V.useCallback(async(s,c={})=>{dt(a.current,Sg),a.current&&(typeof s=="number"?await t.navigate(s):await t.navigate(s,{fromRouteId:i,...c}))},[t,i])}var bp={};function wg(t,i,a){!i&&!bp[t]&&(bp[t]=!0,dt(!1,a))}V.memo(c2);function c2({routes:t,future:i,state:a,isStatic:u,onError:s}){return Cg(t,void 0,{state:a,isStatic:u,onError:s})}function f2(t){return Wb(t.context)}function ki(t){Ke(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function h2({basename:t="/",children:i=null,location:a,navigationType:u="POP",navigator:s,static:c=!1,unstable_useTransitions:f}){Ke(!Ya(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let m=t.replace(/^\/*/,"/"),p=V.useMemo(()=>({basename:m,navigator:s,static:c,unstable_useTransitions:f,future:{}}),[m,s,c,f]);typeof a=="string"&&(a=zi(a));let{pathname:d="/",search:b="",hash:g="",state:S=null,key:x="default",unstable_mask:w}=a,_=V.useMemo(()=>{let D=Lt(d,m);return D==null?null:{location:{pathname:D,search:b,hash:g,state:S,key:x,unstable_mask:w},navigationType:u}},[m,d,b,g,S,x,u,w]);return dt(_!=null,`<Router basename="${m}"> is not able to match the URL "${d}${b}${g}" because it does not start with the basename, so the <Router> won't render anything.`),_==null?null:V.createElement(et.Provider,{value:p},V.createElement(qa.Provider,{children:i,value:_}))}function d2({children:t,location:i}){return Pb(Ec(t),i)}function Ec(t,i=[]){let a=[];return V.Children.forEach(t,(u,s)=>{if(!V.isValidElement(u))return;let c=[...i,s];if(u.type===V.Fragment){a.push.apply(a,Ec(u.props.children,c));return}Ke(u.type===ki,`[${typeof u.type=="string"?u.type:u.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Ke(!u.props.index||!u.props.children,"An index route cannot have child routes.");let f={id:u.props.id||c.join("-"),caseSensitive:u.props.caseSensitive,element:u.props.element,Component:u.props.Component,index:u.props.index,path:u.props.path,middleware:u.props.middleware,loader:u.props.loader,action:u.props.action,hydrateFallbackElement:u.props.hydrateFallbackElement,HydrateFallback:u.props.HydrateFallback,errorElement:u.props.errorElement,ErrorBoundary:u.props.ErrorBoundary,hasErrorBoundary:u.props.hasErrorBoundary===!0||u.props.ErrorBoundary!=null||u.props.errorElement!=null,shouldRevalidate:u.props.shouldRevalidate,handle:u.props.handle,lazy:u.props.lazy};u.props.children&&(f.children=Ec(u.props.children,c)),a.push(f)}),a}var yu="get",bu="application/x-www-form-urlencoded";function Tu(t){return typeof HTMLElement<"u"&&t instanceof HTMLElement}function m2(t){return Tu(t)&&t.tagName.toLowerCase()==="button"}function p2(t){return Tu(t)&&t.tagName.toLowerCase()==="form"}function g2(t){return Tu(t)&&t.tagName.toLowerCase()==="input"}function y2(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function b2(t,i){return t.button===0&&(!i||i==="_self")&&!y2(t)}var hu=null;function v2(){if(hu===null)try{new FormData(document.createElement("form"),0),hu=!1}catch{hu=!0}return hu}var x2=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function lc(t){return t!=null&&!x2.has(t)?(dt(!1,`"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${bu}"`),null):t}function S2(t,i){let a,u,s,c,f;if(p2(t)){let m=t.getAttribute("action");u=m?Lt(m,i):null,a=t.getAttribute("method")||yu,s=lc(t.getAttribute("enctype"))||bu,c=new FormData(t)}else if(m2(t)||g2(t)&&(t.type==="submit"||t.type==="image")){let m=t.form;if(m==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let p=t.getAttribute("formaction")||m.getAttribute("action");if(u=p?Lt(p,i):null,a=t.getAttribute("formmethod")||m.getAttribute("method")||yu,s=lc(t.getAttribute("formenctype"))||lc(m.getAttribute("enctype"))||bu,c=new FormData(m,t),!v2()){let{name:d,type:b,value:g}=t;if(b==="image"){let S=d?`${d}.`:"";c.append(`${S}x`,"0"),c.append(`${S}y`,"0")}else d&&c.append(d,g)}}else{if(Tu(t))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');a=yu,u=null,s=bu,f=t}return c&&s==="text/plain"&&(f=c,c=void 0),{action:u,method:a.toLowerCase(),encType:s,formData:c,body:f}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function qc(t,i){if(t===!1||t===null||typeof t>"u")throw new Error(i)}function E2(t,i,a,u){let s=typeof t=="string"?new URL(t,typeof window>"u"?"server://singlefetch/":window.location.origin):t;return a?s.pathname.endsWith("/")?s.pathname=`${s.pathname}_.${u}`:s.pathname=`${s.pathname}.${u}`:s.pathname==="/"?s.pathname=`_root.${u}`:i&&Lt(s.pathname,i)==="/"?s.pathname=`${i.replace(/\/$/,"")}/_root.${u}`:s.pathname=`${s.pathname.replace(/\/$/,"")}.${u}`,s}async function k2(t,i){if(t.id in i)return i[t.id];try{let a=await import(t.module);return i[t.id]=a,a}catch(a){return console.error(`Error loading route module \`${t.module}\`, reloading page...`),console.error(a),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function C2(t){return t==null?!1:t.href==null?t.rel==="preload"&&typeof t.imageSrcSet=="string"&&typeof t.imageSizes=="string":typeof t.rel=="string"&&typeof t.href=="string"}async function A2(t,i,a){let u=await Promise.all(t.map(async s=>{let c=i.routes[s.route.id];if(c){let f=await k2(c,a);return f.links?f.links():[]}return[]}));return R2(u.flat(1).filter(C2).filter(s=>s.rel==="stylesheet"||s.rel==="preload").map(s=>s.rel==="stylesheet"?{...s,rel:"prefetch",as:"style"}:{...s,rel:"prefetch"}))}function vp(t,i,a,u,s,c){let f=(p,d)=>a[d]?p.route.id!==a[d].route.id:!0,m=(p,d)=>a[d].pathname!==p.pathname||a[d].route.path?.endsWith("*")&&a[d].params["*"]!==p.params["*"];return c==="assets"?i.filter((p,d)=>f(p,d)||m(p,d)):c==="data"?i.filter((p,d)=>{let b=u.routes[p.route.id];if(!b||!b.hasLoader)return!1;if(f(p,d)||m(p,d))return!0;if(p.route.shouldRevalidate){let g=p.route.shouldRevalidate({currentUrl:new URL(s.pathname+s.search+s.hash,window.origin),currentParams:a[0]?.params||{},nextUrl:new URL(t,window.origin),nextParams:p.params,defaultShouldRevalidate:!0});if(typeof g=="boolean")return g}return!0}):[]}function w2(t,i,{includeHydrateFallback:a}={}){return T2(t.map(u=>{let s=i.routes[u.route.id];if(!s)return[];let c=[s.module];return s.clientActionModule&&(c=c.concat(s.clientActionModule)),s.clientLoaderModule&&(c=c.concat(s.clientLoaderModule)),a&&s.hydrateFallbackModule&&(c=c.concat(s.hydrateFallbackModule)),s.imports&&(c=c.concat(s.imports)),c}).flat(1))}function T2(t){return[...new Set(t)]}function z2(t){let i={},a=Object.keys(t).sort();for(let u of a)i[u]=t[u];return i}function R2(t,i){let a=new Set;return new Set(i),t.reduce((u,s)=>{let c=JSON.stringify(z2(s));return a.has(c)||(a.add(c),u.push({key:c,link:s})),u},[])}function Tg(){let t=V.useContext(Ri);return qc(t,"You must render this element inside a <DataRouterContext.Provider> element"),t}function D2(){let t=V.useContext(wu);return qc(t,"You must render this element inside a <DataRouterStateContext.Provider> element"),t}var Yc=V.createContext(void 0);Yc.displayName="FrameworkContext";function zg(){let t=V.useContext(Yc);return qc(t,"You must render this element inside a <HydratedRouter> element"),t}function M2(t,i){let a=V.useContext(Yc),[u,s]=V.useState(!1),[c,f]=V.useState(!1),{onFocus:m,onBlur:p,onMouseEnter:d,onMouseLeave:b,onTouchStart:g}=i,S=V.useRef(null);V.useEffect(()=>{if(t==="render"&&f(!0),t==="viewport"){let _=R=>{R.forEach(X=>{f(X.isIntersecting)})},D=new IntersectionObserver(_,{threshold:.5});return S.current&&D.observe(S.current),()=>{D.disconnect()}}},[t]),V.useEffect(()=>{if(u){let _=setTimeout(()=>{f(!0)},100);return()=>{clearTimeout(_)}}},[u]);let x=()=>{s(!0)},w=()=>{s(!1),f(!1)};return a?t!=="intent"?[c,S,{}]:[c,S,{onFocus:Ta(m,x),onBlur:Ta(p,w),onMouseEnter:Ta(d,x),onMouseLeave:Ta(b,w),onTouchStart:Ta(g,x)}]:[!1,S,{}]}function Ta(t,i){return a=>{t&&t(a),a.defaultPrevented||i(a)}}function _2({page:t,...i}){let{router:a}=Tg(),u=V.useMemo(()=>hg(a.routes,t,a.basename),[a.routes,t,a.basename]);return u?V.createElement(N2,{page:t,matches:u,...i}):null}function O2(t){let{manifest:i,routeModules:a}=zg(),[u,s]=V.useState([]);return V.useEffect(()=>{let c=!1;return A2(t,i,a).then(f=>{c||s(f)}),()=>{c=!0}},[t,i,a]),u}function N2({page:t,matches:i,...a}){let u=Bt(),{future:s,manifest:c,routeModules:f}=zg(),{basename:m}=Tg(),{loaderData:p,matches:d}=D2(),b=V.useMemo(()=>vp(t,i,d,c,u,"data"),[t,i,d,c,u]),g=V.useMemo(()=>vp(t,i,d,c,u,"assets"),[t,i,d,c,u]),S=V.useMemo(()=>{if(t===u.pathname+u.search+u.hash)return[];let _=new Set,D=!1;if(i.forEach(X=>{let U=c.routes[X.route.id];!U||!U.hasLoader||(!b.some(te=>te.route.id===X.route.id)&&X.route.id in p&&f[X.route.id]?.shouldRevalidate||U.hasClientLoader?D=!0:_.add(X.route.id))}),_.size===0)return[];let R=E2(t,m,s.unstable_trailingSlashAwareDataRequests,"data");return D&&_.size>0&&R.searchParams.set("_routes",i.filter(X=>_.has(X.route.id)).map(X=>X.route.id).join(",")),[R.pathname+R.search]},[m,s.unstable_trailingSlashAwareDataRequests,p,u,c,b,i,t,f]),x=V.useMemo(()=>w2(g,c),[g,c]),w=O2(g);return V.createElement(V.Fragment,null,S.map(_=>V.createElement("link",{key:_,rel:"prefetch",as:"fetch",href:_,...a})),x.map(_=>V.createElement("link",{key:_,rel:"modulepreload",href:_,...a})),w.map(({key:_,link:D})=>V.createElement("link",{key:_,nonce:a.nonce,...D,crossOrigin:D.crossOrigin??a.crossOrigin})))}function j2(...t){return i=>{t.forEach(a=>{typeof a=="function"?a(i):a!=null&&(a.current=i)})}}var L2=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{L2&&(window.__reactRouterVersion="7.13.1")}catch{}function B2({basename:t,children:i,unstable_useTransitions:a,window:u}){let s=V.useRef();s.current==null&&(s.current=mb({window:u,v5Compat:!0}));let c=s.current,[f,m]=V.useState({action:c.action,location:c.location}),p=V.useCallback(d=>{a===!1?m(d):V.startTransition(()=>m(d))},[a]);return V.useLayoutEffect(()=>c.listen(p),[c,p]),V.createElement(h2,{basename:t,children:i,location:f.location,navigationType:f.action,navigator:c,unstable_useTransitions:a})}var Rg=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,wi=V.forwardRef(function({onClick:i,discover:a="render",prefetch:u="none",relative:s,reloadDocument:c,replace:f,unstable_mask:m,state:p,target:d,to:b,preventScrollReset:g,viewTransition:S,unstable_defaultShouldRevalidate:x,...w},_){let{basename:D,navigator:R,unstable_useTransitions:X}=V.useContext(et),U=typeof b=="string"&&Rg.test(b),te=yg(b,D);b=te.to;let le=Zb(b,{relative:s}),q=Bt(),P=null;if(m){let K=jc(m,[],q.unstable_mask?q.unstable_mask.pathname:"/",!0);D!=="/"&&(K.pathname=K.pathname==="/"?D:ht([D,K.pathname])),P=R.createHref(K)}let[ce,me,B]=M2(u,w),ne=Y2(b,{replace:f,unstable_mask:m,state:p,target:d,preventScrollReset:g,relative:s,viewTransition:S,unstable_defaultShouldRevalidate:x,unstable_useTransitions:X});function ee(K){i&&i(K),K.defaultPrevented||ne(K)}let xe=!(te.isExternal||c),ae=V.createElement("a",{...w,...B,href:(xe?P:void 0)||te.absoluteURL||le,onClick:xe?ee:i,ref:j2(_,me),target:d,"data-discover":!U&&a==="render"?"true":void 0});return ce&&!U?V.createElement(V.Fragment,null,ae,V.createElement(_2,{page:le})):ae});wi.displayName="Link";var U2=V.forwardRef(function({"aria-current":i="page",caseSensitive:a=!1,className:u="",end:s=!1,style:c,to:f,viewTransition:m,children:p,...d},b){let g=Va(f,{relative:d.relative}),S=Bt(),x=V.useContext(wu),{navigator:w,basename:_}=V.useContext(et),D=x!=null&&F2(g)&&m===!0,R=w.encodeLocation?w.encodeLocation(g).pathname:g.pathname,X=S.pathname,U=x&&x.navigation&&x.navigation.location?x.navigation.location.pathname:null;a||(X=X.toLowerCase(),U=U?U.toLowerCase():null,R=R.toLowerCase()),U&&_&&(U=Lt(U,_)||U);const te=R!=="/"&&R.endsWith("/")?R.length-1:R.length;let le=X===R||!s&&X.startsWith(R)&&X.charAt(te)==="/",q=U!=null&&(U===R||!s&&U.startsWith(R)&&U.charAt(R.length)==="/"),P={isActive:le,isPending:q,isTransitioning:D},ce=le?i:void 0,me;typeof u=="function"?me=u(P):me=[u,le?"active":null,q?"pending":null,D?"transitioning":null].filter(Boolean).join(" ");let B=typeof c=="function"?c(P):c;return V.createElement(wi,{...d,"aria-current":ce,className:me,ref:b,style:B,to:f,viewTransition:m},typeof p=="function"?p(P):p)});U2.displayName="NavLink";var H2=V.forwardRef(({discover:t="render",fetcherKey:i,navigate:a,reloadDocument:u,replace:s,state:c,method:f=yu,action:m,onSubmit:p,relative:d,preventScrollReset:b,viewTransition:g,unstable_defaultShouldRevalidate:S,...x},w)=>{let{unstable_useTransitions:_}=V.useContext(et),D=G2(),R=Q2(m,{relative:d}),X=f.toLowerCase()==="get"?"get":"post",U=typeof m=="string"&&Rg.test(m),te=le=>{if(p&&p(le),le.defaultPrevented)return;le.preventDefault();let q=le.nativeEvent.submitter,P=q?.getAttribute("formmethod")||f,ce=()=>D(q||le.currentTarget,{fetcherKey:i,method:P,navigate:a,replace:s,state:c,relative:d,preventScrollReset:b,viewTransition:g,unstable_defaultShouldRevalidate:S});_&&a!==!1?V.startTransition(()=>ce()):ce()};return V.createElement("form",{ref:w,method:X,action:R,onSubmit:u?p:te,...x,"data-discover":!U&&t==="render"?"true":void 0})});H2.displayName="Form";function q2(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Dg(t){let i=V.useContext(Ri);return Ke(i,q2(t)),i}function Y2(t,{target:i,replace:a,unstable_mask:u,state:s,preventScrollReset:c,relative:f,viewTransition:m,unstable_defaultShouldRevalidate:p,unstable_useTransitions:d}={}){let b=Bc(),g=Bt(),S=Va(t,{relative:f});return V.useCallback(x=>{if(b2(x,i)){x.preventDefault();let w=a!==void 0?a:La(g)===La(S),_=()=>b(t,{replace:w,unstable_mask:u,state:s,preventScrollReset:c,relative:f,viewTransition:m,unstable_defaultShouldRevalidate:p});d?V.startTransition(()=>_()):_()}},[g,b,S,a,u,s,i,t,c,f,m,p,d])}var V2=0,X2=()=>`__${String(++V2)}__`;function G2(){let{router:t}=Dg("useSubmit"),{basename:i}=V.useContext(et),a=u2(),u=t.fetch,s=t.navigate;return V.useCallback(async(c,f={})=>{let{action:m,method:p,encType:d,formData:b,body:g}=S2(c,i);if(f.navigate===!1){let S=f.fetcherKey||X2();await u(S,a,f.action||m,{unstable_defaultShouldRevalidate:f.unstable_defaultShouldRevalidate,preventScrollReset:f.preventScrollReset,formData:b,body:g,formMethod:f.method||p,formEncType:f.encType||d,flushSync:f.flushSync})}else await s(f.action||m,{unstable_defaultShouldRevalidate:f.unstable_defaultShouldRevalidate,preventScrollReset:f.preventScrollReset,formData:b,body:g,formMethod:f.method||p,formEncType:f.encType||d,replace:f.replace,state:f.state,fromRouteId:a,flushSync:f.flushSync,viewTransition:f.viewTransition})},[u,s,i,a])}function Q2(t,{relative:i}={}){let{basename:a}=V.useContext(et),u=V.useContext(rt);Ke(u,"useFormAction must be used inside a RouteContext");let[s]=u.matches.slice(-1),c={...Va(t||".",{relative:i})},f=Bt();if(t==null){c.search=f.search;let m=new URLSearchParams(c.search),p=m.getAll("index");if(p.some(b=>b==="")){m.delete("index"),p.filter(g=>g).forEach(g=>m.append("index",g));let b=m.toString();c.search=b?`?${b}`:""}}return(!t||t===".")&&s.route.index&&(c.search=c.search?c.search.replace(/^\?/,"?index&"):"?index"),a!=="/"&&(c.pathname=c.pathname==="/"?a:ht([a,c.pathname])),La(c)}function F2(t,{relative:i}={}){let a=V.useContext(vg);Ke(a!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:u}=Dg("useViewTransitionState"),s=Va(t,{relative:i});if(!a.isTransitioning)return!1;let c=Lt(a.currentLocation.pathname,u)||a.currentLocation.pathname,f=Lt(a.nextLocation.pathname,u)||a.nextLocation.pathname;return xu(s.pathname,f)!=null||xu(s.pathname,c)!=null}const I2=`---
id: "blog-post-management-guide"
title: "블로그 게시글 작성 및 관리 완벽 가이드"
description: "새 게시글 작성, 카테고리 설정, 날짜 형식, 태그 추가 등 블로그 콘텐츠 관리에 필요한 모든 것을 다룹니다."
date: "2026-01-29 09:00"
category: "daily"
tags: ["블로그", "가이드", "게시글관리"]
published: false
---
# 블로그 게시글 작성 및 관리 완벽 가이드

이 가이드에서는 flowizy's DevLog에 새 게시글을 작성하고 관리하는 방법을 상세하게 설명합니다.

---

## 1. 게시글 데이터 파일 위치

모든 게시글은 \`src/content/posts/\` 폴더의 개별 마크다운 파일로 관리됩니다:

\`\`\`
src/content/posts/*.md
\`\`\`

새 글을 작성할 때는 새 \`.md\` 파일을 추가하면 됩니다.

앱은 \`src/lib/posts.ts\`에서 이 폴더를 자동으로 읽어 글 목록을 생성합니다.
\`src/lib/data.ts\`는 게시글 본문을 저장하는 파일이 아니라 타입, 카테고리, 프로필 정보 등을 관리하는 공통 설정 파일입니다.

---

## 2. 새 게시글 작성 방법

### 2.1 기본 구조

\`src/content/posts/\` 폴더에 새 \`.md\` 파일을 추가합니다.

\`\`\`md
---
id: "unique-post-id"            # URL에 사용될 고유 ID (영문, 숫자, 하이픈)
title: "게시글 제목"              # 게시글 제목
description: "짧은 설명"          # 목록에 표시될 요약
date: "2026-01-29 14:30"        # 작성일 (YYYY-MM-DD HH:MM)
category: "daily"               # 카테고리 ID
tags: ["태그1", "태그2"]          # 태그 배열 (선택사항)
published: true                 # 공개 여부
---

# 게시글 제목

마크다운 형식의 본문
\`\`\`

### 2.2 실제 예시

\`\`\`md
---
id: "smart-contract-audit-checklist"
title: "스마트 컨트랙트 감사 체크리스트"
description: "Solidity 기반 컨트랙트 감사 시 반드시 확인해야 할 항목들을 정리했습니다."
date: "2026-01-29 15:00"
category: "web3-blockchain"
tags: ["스마트컨트랙트", "보안", "감사"]
published: true
---

# 스마트 컨트랙트 감사 체크리스트

## 1. 재진입 공격 (Reentrancy)

외부 호출 전에 상태를 업데이트했는지 확인합니다.
\`\`\`

---

## 3. 카테고리 설정

### 3.1 사용 가능한 카테고리

\`category\` 필드에는 다음 값들을 사용할 수 있습니다:

| 카테고리 ID | 표시 이름 | 설명 |
|------------|----------|------|
| \`daily\` | 일상(DAILY) | 일상적인 이야기 |
| \`security\` | 보안(SECURITY) | 보안 관련 상위 카테고리 |
| \`web-security\` | Web Security | 웹 보안 |
| \`web3-blockchain\` | Web3/Blockchain | 블록체인 보안 |
| \`research-article\` | Research/Article | 연구 자료 |
| \`study-dev-security\` | Study | 학습 기록 |
| \`wargame-ctf\` | Wargame/CTF | CTF 풀이 |
| \`reversing\` | Reversing | 리버싱 |
| \`pwn\` | Pwn | 시스템 해킹 |
| \`crypto\` | Crypto | 암호학 |
| \`development\` | 개발(DEVELOPMENT) | 개발 관련 |
| \`travel\` | 여행(TRAVEL) | 여행 기록 |

### 3.2 새 카테고리 추가하기

\`data.ts\` 파일의 \`categories\` 배열을 수정합니다:

\`\`\`typescript
export const categories: Category[] = [
  { id: 'all', name: '전체', icon: 'grid' },
  // 새 카테고리 추가
  { id: 'my-new-category', name: '새 카테고리', icon: 'code' },
  // ...
];
\`\`\`

사용 가능한 아이콘: \`grid\`, \`shield\`, \`globe\`, \`zap\`, \`cpu\`, \`terminal\`, \`lock\`, \`code\`, \`map\`, \`user\`

---

## 4. 날짜 형식

날짜는 반드시 다음 형식을 따라야 합니다:

\`\`\`
YYYY-MM-DD HH:MM
\`\`\`

**예시:**
- \`2026-01-29 09:00\` → 2026년 1월 29일 오전 9시
- \`2026-02-14 18:30\` → 2026년 2월 14일 오후 6시 30분

이 날짜를 기준으로 "약 N시간 전" 같은 상대 시간이 자동으로 계산됩니다.

---

## 5. 마크다운 문법

### 5.1 제목

\`\`\`markdown
# H1 제목 (가장 큰 제목)
## H2 제목
### H3 제목
\`\`\`

### 5.2 텍스트 스타일

\`\`\`markdown
**굵은 텍스트**
*기울임 텍스트*
~~취소선~~
\\\`인라인 코드\\\`
\`\`\`

### 5.3 코드 블록

언어를 지정하면 문법 강조가 적용됩니다:

\`\`\`markdown
\\\`\\\`\\\`python
def hello():
    print("Hello, World!")
\\\`\\\`\\\`
\`\`\`

### 5.4 링크와 이미지

\`\`\`markdown
[링크 텍스트](https://example.com)
![이미지 설명](/images/my-image.png)
\`\`\`

### 5.5 리스트

\`\`\`markdown
- 항목 1
- 항목 2
- 항목 3

1. 첫 번째
2. 두 번째
3. 세 번째
\`\`\`

### 5.6 인용문

\`\`\`markdown
> 이것은 인용문입니다.
\`\`\`

### 5.7 표와 체크리스트

현재 블로그는 GitHub Flavored Markdown도 지원합니다.

\`\`\`markdown
| 항목 | 상태 |
|------|------|
| 초안 | 진행 중 |
| 배포 | 완료 |

- [x] 제목 작성
- [ ] 이미지 추가
\`\`\`

---

## 6. 게시글 비공개 설정

\`published\` 필드를 \`false\`로 설정하면 게시글이 목록에 표시되지 않습니다:

\`\`\`typescript
{
  id: 'draft-post',
  title: '작성 중인 글',
  // ...
  published: false,  // 비공개
}
\`\`\`

---

## 7. 배포 방법 (글 작성 후 필수!)

게시글을 작성하거나 수정한 후에는 반드시 아래 과정을 거쳐야 블로그에 반영됩니다.

### 7.1 로컬 미리보기 (선택)

배포 전에 로컬에서 먼저 확인하고 싶다면:

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 \`http://localhost:5173\`으로 접속하여 확인합니다.
확인이 끝나면 터미널에서 \`Ctrl + C\`로 종료합니다.

### 7.2 GitHub에 커밋 및 푸시

\`\`\`bash
# 1. 모든 변경사항 스테이징
git add .

# 2. 커밋 (메시지는 자유롭게)
git commit -m "새 글 추가: 글제목"

# 3. GitHub에 푸시
git push origin main
\`\`\`

### 7.3 GitHub Pages 배포

\`\`\`bash
npm run deploy
\`\`\`

이 명령어가 자동으로 빌드하고 \`gh-pages\` 브랜치에 배포합니다.
SSH 키 암호를 여러 번 물어볼 수 있는데, 정상입니다.
"Published"가 나오면 배포 완료!

### 7.4 한 줄로 모두 실행하기

매번 명령어 4개 치기 귀찮으면 한 줄로:

\`\`\`bash
git add . && git commit -m "update" && git push origin main && npm run deploy
\`\`\`

### 7.5 배포 확인

2-3분 후 https://fl0wizy.github.io 에 접속하여 변경사항을 확인합니다.

---

## 8. 주의사항

1. **ID 중복 금지**: 각 게시글의 \`id\`는 고유해야 합니다.
2. **frontmatter 위치 주의**: 파일 맨 위 \`---\` 블록은 메타데이터 영역이므로, 본문 시작 전까지 형식을 유지해야 합니다.
3. **이미지 경로**: 이미지는 \`public/images/\` 폴더에 저장하고, 경로는 \`/images/파일명\`으로 지정합니다.
4. **설정 파일 구분**: 게시글 본문은 \`src/content/posts/*.md\`, 카테고리와 프로필 설정은 \`src/lib/data.ts\`에서 관리합니다.
`,Z2=`---
id: "ethereum-ux-roadmap-analysis"
title: "이더리움 UX 로드맵 완전 분석: 32,000건의 사용자 리포트가 말하는 것"
description: "ethux.design의 이더리움 UX 로드맵을 8개 카테고리별로 분석한다. 온보딩, 트랜잭션, 크로스체인, 보안, 모바일, 접근성, 프로토콜, 일상 운영까지 — 32,000건의 실제 사용자 데이터가 가리키는 문제와 해법을 정리한다."
date: "2026-04-05 01:00"
category: "research-article"
tags: ["Ethereum", "UX", "Web3", "EIP", "Account Abstraction", "Research"]
published: true
---

# 이더리움 UX 로드맵 완전 분석: 32,000건의 사용자 리포트가 말하는 것

이더리움은 기술적으로는 성숙기에 접어들었다.
L2 생태계가 폭발적으로 성장했고, Account Abstraction은 5,400만 계정을 넘었으며, 크로스체인 인텐트 프로토콜은 $35B 이상의 누적 볼륨을 달성했다.

그런데 왜 여전히 일반 사용자에게는 어려운가?

[ethux.design](https://ethux.design/)은 이 질문에 데이터로 답한다.
커뮤니티에서 수집된 **32,000건 이상의 사용자 리포트**를 분석하여, 이더리움 UX의 핵심 마찰 지점 8개 카테고리를 정리한 로드맵이다.

이 글에서는 각 카테고리를 하나씩 뜯어보며, 무엇이 문제이고, 어디까지 해결되었고, 어떤 기회가 남아 있는지를 정리한다.

---

## 1. User Onboarding: 처음 5분이 모든 것을 결정한다

> "생산성 앱을 80K 사용자로 키웠다. 블록체인 기능을 붙이면서 지갑 다운로드, 시드 구문 백업, ETH 구매를 요구하자 — 사용자들이 그냥 떠났다."
> — 앱 개발자

### 핵심 문제 5가지

**1) Gas Hurdle (심각도: Critical)**

이더리움에서 무엇이든 하려면 먼저 ETH를 사야 한다.
지갑을 만들고, 시드 구문을 백업하고, 거래소에서 ETH를 구매하고, 전송하고, 그제서야 첫 트랜잭션을 실행할 수 있다.

결과: **지갑 설정을 완료한 사용자의 40%가 가스 획득 단계에서 이탈한다.**

해법은 명확하다. **Paymaster**다.
ERC-4337 기반 스마트 계정은 제3자가 가스비를 대신 지불할 수 있게 한다. 이미 5,400만 개 이상의 스마트 계정이 활성화되어 있고, 이것이 가스 없는 온보딩의 핵심 전달 수단이다.

**2) 영어 전용 복구 구문 (심각도: High)**

BIP-39 표준은 한국어, 일본어, 중국어, 스페인어 등 다국어 단어 목록을 지원한다.
하지만 실제로 이를 구현한 지갑은 **사실상 제로**다.

전 세계 인터넷 사용자의 75%가 비영어권이다.
가장 빠르게 성장하는 크립토 시장은 아시아, 아프리카, 라틴아메리카에 있다.
그런데 복구 구문은 영어 12단어로만 제공된다.

이것은 단순한 편의성 문제가 아니다.
영어를 모르는 사용자가 영어 단어를 받아적고 관리해야 한다는 것은, 자산 보안의 가장 중요한 단계에서 사회공학 공격에 취약해진다는 뜻이다.

**3) 강제 백업 마찰 (심각도: Medium)**

빈 지갑에 12단어 시드 구문을 즉시 보여주는 것은 사용자를 겁먹게 한다.
탐색도 하기 전에 "이것을 잃으면 모든 자산을 잃습니다"라는 경고를 마주하게 된다.

현재 약 30~40%의 지갑이 지연된 백업 방식을 채택하고 있다.
사용자가 실제 가치를 보유하기 시작할 때까지 백업을 미루면, 완료율이 올라가고 보안 습관도 더 건강해진다.

임베디드 지갑의 경우 시드 구문 자체를 보여주지 않는 방식으로 이 문제를 우회한다.

**4) 지역별 온램프 제한 (심각도: High)**

서구 은행 시스템에 맞춰진 제3자 온램프 제공자들은 신흥시장에서 KYC 거부율이 높고, 현지 통화를 지원하지 않는다.
P2P 온램프(Paxful, Remitano)가 0.5~2% 수수료로 존재하지만, 규모는 제한적이다.

**5) 전문 용어 과부하 (심각도: Critical)**

> "44살인데 크립토에 대해 아무것도 몰라요. 딸의 남자친구가 좀 사라고 해서요."
> — 신규 사용자

"시드 구문", "니모닉", "비밀 키", "복구 구문", "비밀 복구 구문" — 같은 의미의 5가지 용어.
"가스", "스테이킹", "스마트 컨트랙트" — 지갑마다 다른 설명, 혹은 설명 자체가 없는 용어.

업계 표준 용어 사전은 **현재 존재하지 않는다.** 누구도 만들고 있지 않다.

### 빌더 체크리스트: 온보딩

| 우선순위 | 패턴 |
|---------|------|
| Critical | 자금이 생길 때까지 복구 구문 백업 지연 |
| Critical | 모든 전문 용어를 평이한 표현으로 대체 |
| High | 간단/고급 모드 토글 제공 |
| High | WCAG 2.2 AA 접근성 표준 충족 |
| High | 점진적 공개 — 복잡성을 맥락에 맞게 노출 |
| Medium | 최소 5개 언어를 i18n 프레임워크로 지원 |

---

## 2. Transaction Clarity: 블라인드 서명은 최대 공격 표면이다

> "$1.77M의 스테이블코인이 EIP-2612 Permit 피싱 공격으로 탈취되었다."
> — 보안 연구자

> "내 최악의 블라인드 서명 경험: 새 일드 파밍 프로토콜이 긍정적인 웹사이트 뒤에서 내 자금을 전부 빼갔다."
> — 사용자

### 핵심 문제 7가지

**1) Blind Signing (심각도: Critical)**

하드웨어 지갑조차 사용자에게 raw hex 데이터를 보여준다.
사용자는 무엇을 승인하는지 이해하지 못한 채 서명한다.

2024년 지갑 드레이너 피해: **$494M**
2025년 지갑 드레이너 피해: **$84M**

감소 추세이긴 하지만, $84M은 여전히 거대한 숫자다.

ERC-7730 Clear Signing이 사람이 읽을 수 있는 트랜잭션 요약을 제공하려 하지만, 아직 Draft 단계이며 엔드투엔드 커버리지가 제한적이다.

**2) Signing Fatigue (심각도: High)**

로그인, 승인, 스왑, 잔고 확인 — 모든 상호작용이 서명 팝업을 트리거한다.
세션당 수십 개의 서명 요청은 사용자에게 "읽지 않고 승인"하는 습관을 형성시킨다.

이것은 정확히 공격자가 악용하는 행동 패턴이다.

EIP-5792 배치 호출(Final 단계)과 ERC-7715 세션 키(Draft)가 서명 횟수 자체를 줄여 "원클릭 DeFi"를 가능하게 하려 한다.

**3) Missing Signing Context (심각도: Medium)**

멀티스텝 서명이 맥락 없이 개별적으로 제시된다.
"3개 중 2번째 단계"와 같은 진행 표시가 없다.
사용자는 끝내기 위해 무조건 승인하거나, 중간에 포기한다.

**4) Redundant Token Approvals (심각도: High)**

ERC-20 표준은 앱이 토큰을 이동하기 전에 별도의 승인을 요구한다.
단순한 스왑이 두 단계, 두 번의 지갑 팝업, 두 번의 가스 지불이 된다.

처음 DeFi를 접한 사용자는 앱이 고장났다고 생각한다.

Permit2(Uniswap이 ETH/OP/ARB/BASE/POLY에 배포)와 EIP-5792 배치가 이를 단일 동작으로 압축한다.

**5) Token Approval Management (심각도: High)**

> "10분 만에 $300K를 잃었다. 설정 오류. 봇이 잘못된 토큰 승인을 감지하고 즉시 빼갔다."
> — 2026년 3월 피해자

대부분의 앱이 무제한 승인(MAX_UINT256)을 기본값으로 요청한다.
만료 기한도 없다. 대부분의 지갑에 취소 인터페이스가 없다.

Revoke.cash가 100개 이상 네트워크에서 오픈소스 취소 도구를 제공하지만, 지갑 내장 취소 기능은 이제야 주요 지갑에 나타나기 시작했다.

**6) Blanket Warnings (심각도: Medium)**

$50 승인과 $50,000 승인에 동일한 빨간 경고를 표시한다.
사용자는 반복된 오경보 후 경고 자체를 무시하게 된다.

이것이 바로 **"경고 맹점(Warning Blindness)"** 현상이다.

위험도 차등 경고(Contextual Risk Scoring)가 필요하지만, Blockaid, Blowfish, TRM Labs 등이 아직 구축 중이다.

**7) 잘못된 주소로 전송 (심각도: Critical)**

> "남동생을 DeFi에 입문시켰다. 지갑 주소 대신 컨트랙트 주소로 USDC를 보냈다. 영원히 사라졌다."
> — 사용자

42자 hex 주소, 오류 허용치 제로, 되돌리기 불가능.

ENS가 910K+ 활성 도메인으로 성장했지만, 많은 앱이 아직 ENS 이름을 해석하거나 표시하지 않는다.

### 빌더 체크리스트: 트랜잭션 서명

| 우선순위 | 패턴 |
|---------|------|
| Critical | EIP-712 구조화된 타입 데이터를 서명에 사용 |
| Critical | 모든 서명 전에 사람이 읽을 수 있는 트랜잭션 요약 표시 |
| High | 트랜잭션 시뮬레이션으로 잔고 변화 미리보기 |
| Medium | 멀티스텝 서명 진행 표시 ("3단계 중 2단계") |
| Medium | 관련 승인을 단일 세션으로 배치 |

### 빌더 체크리스트: 토큰 승인

| 우선순위 | 패턴 |
|---------|------|
| Critical | 정확한 금액 승인 사용 (MAX_UINT256 대신) |
| High | Permit2로 가스리스 단일 서명 승인 구현 |
| High | 승인 + 액션을 단일 트랜잭션으로 배치 (EIP-5792) |
| High | 지출자 이름, 금액, 토큰을 평이한 언어로 표시 |
| Medium | 앱 내 승인 관리 및 취소 기능 제공 |

---

## 3. Cross-chain Flow: 체인 간 이동을 보이지 않게 만들어라

> "크로스체인 스테이블코인 결제로 이커머스를 운영한다. 수동으로 브릿지하고 스왑한다. 새벽 3시에 일어나서 가스를 확인하거나, 혼잡 때문에 자금을 옮기는 것에 지쳤다."
> — 사업자

### 핵심 문제 4가지

**1) 단일 체인 잔고 표시 (심각도: Medium)**

> "2~3개 체인만 쓴다. 더 넓게 쓸 때마다 전부 추적하는 게 악몽이 된다."
> — 사용자

사용자는 전체 잔고를 보려면 네트워크를 수동으로 전환해야 한다.
EIP-7811 통합 잔고는 Draft 상태이며 **구현체가 아직 하나도 없다.**

**2) 수동 네트워크 전환 (심각도: Medium)**

지갑이 체인 A에 연결되어 있는데 체인 B에서 트랜잭션을 하고 싶다면, 사용자가 명시적으로 전환해야 한다.
새로운 L2가 추가될수록 혼란은 기하급수적으로 증가한다.

ERC-7828 자동 전환이 표준으로 제안되어 있지만, 구현한 앱은 극소수다.

**3) 브릿지의 고통 (심각도: Critical)**

브릿지는 이더리움 UX에서 가장 큰 마찰 지점 중 하나다:

- 특정 경로를 지원하는 브릿지를 찾아야 한다
- 여러 제공자의 수수료/대기시간을 비교해야 한다
- 분 단위에서 일 단위까지 추적 없이 기다려야 한다
- 소액 전송에서 브릿지 수수료가 전송 금액을 초과할 수 있다

**온보딩을 완료한 지갑 사용자의 70%가 브릿지 트랜잭션을 한 번도 완료하지 않는다.**

인텐트 기반 프로토콜(ERC-7683)이 해답이다.
Across 프로토콜이 $35B 이상의 누적 볼륨을 달성하며 이를 증명했다.
사용자에게 "어떤 체인에서 브릿지하고 스왑해라"가 아니라 "원하는 결과"만 선언하게 하는 것이다.

**4) 자산 파편화 (심각도: High)**

토큰이 5개 체인에 $100씩 흩어져 있으면, DeFi 최소 금액을 충족하지 못한다.
자본 효율성이 새로운 L2가 추가될 때마다 떨어진다.

인텐트 기반 자동 라우팅과 이더리움 Interop Layer(EIL)가 테스트넷에서 이를 해결하려 한다.

### 빌더 체크리스트: 멀티체인

| 우선순위 | 패턴 |
|---------|------|
| Critical | 모든 연결된 체인의 통합 잔고 표시 |
| High | 다른 체인과 상호작용 시 자동 네트워크 전환 |
| High | 체인별 주소 포맷으로 잘못된 체인 전송 방지 |
| High | 브릿지를 원클릭 크로스체인 전송으로 추상화 |
| Medium | L2 간 일관된 스마트 계정 주소 보장 (CREATE2) |

---

## 4. Safety & Security: 투명성과 사용자 통제로 신뢰를 구축하라

> "합법적인 것인지 확인했다. 인기도가 매우 낮은 도메인이라고 경고받았는데 — 위조된 사이트로 리다이렉트되었다."
> — 사용자

> "하루에 스캠 DM 10개를 받는다."
> — 사용자

### 핵심 문제 3가지

**1) 스캠의 만연 (심각도: Critical)**

피싱 공격, 주소 포이즈닝, 사칭 지원 채널이 매월 수천 명의 피해자를 만든다.

특히 위험한 것은 사칭 지원 채널이다.
문제를 겪은 사용자가 도움을 찾을 때, 합법적인 채널보다 사기꾼이 먼저 도달한다.

트랜잭션 시뮬레이션과 주소 포이즈닝 감지가 일부 지갑에 등장하고 있지만, Blockaid 통합은 아직 제한적이다.

**2) 키 관리 부담 (심각도: High)**

사용자가 개인키 보안에 대한 전적인 책임을 진다.
분실하면 끝이다. 복구 없음, 리셋 없음, 고객 지원 없음.

이 단일 장애점이 사용자를 중앙화된 플랫폼으로 밀어넣는 핵심 요인이다.

변화가 진행 중이다:
- **스마트 계정 (ERC-4337)**: 5,400만+ 계정, 10억+ UserOps
- **EIP-7702 위임**: 9개 지갑 메인넷 구현, 1,290만 계정, 1.17억 인가
- **소셜 리커버리**: YoY 44% 성장
- **패스키 기반 서명**: 등장 단계

패러다임이 "키 분실을 절대 막아야 한다"에서 **"키가 침해되었을 때 피해를 제한한다"**로 전환되고 있다.

**3) 스팸 및 악성 토큰 (심각도: Medium)**

> "ETH를 금 담보 토큰으로 스왑했는데, 잔고 제로인 가짜 토큰을 받았다. 컨트랙트가 합법적인 것과 달랐다."
> — 사용자

악성 토큰 에어드롭은 피싱의 주요 진입점이다.
토큰과 상호작용하는 것만으로도 승인 피싱이 트리거될 수 있다.
토큰 리스트 큐레이션은 표준적이지만, 스팸 필터링은 지갑마다 불균일하다.

### 빌더 체크리스트: 안전

| 우선순위 | 패턴 |
|---------|------|
| Critical | 위험도 차등 경고 사용 (획일적 빨간 경고 대신) |
| High | hex 주소 옆에 ENS 이름 표시 |
| High | 전송 전 ERC-55 체크섬으로 주소 검증 |
| High | 스팸 토큰 및 의심스러운 에어드롭 필터링/격리 |
| Medium | "최대 전송"에서 최대 가스비 반영 |

---

## 5. Mobile & Connectivity: 모바일은 설계상 망가져 있다

> "모바일에서 지갑 통합은 UX를 파괴할 수 있다. 세션 끊김, 앱으로 돌아올 때 멈춤, 서명이 영원히 대기 상태."
> — 개발자

**웹 트래픽의 60% 이상이 모바일에서 발생하지만, 프로토콜의 65%가 모바일에 최적화되지 않았다.**

이것은 이더리움 UX에서 가장 기이한 불일치 중 하나다.

### 핵심 문제 3가지

**1) 연결 실패 (심각도: Medium)**

데스크톱에서는 EIP-6963이 37개 이상 지갑에서 멀티 지갑 검색을 해결했다.
모바일은 여전히 WalletConnect v2에 의존하며, 이 연결은 본질적으로 불안정하다.

연결 실패는 많은 사용자의 첫인상이다.
실패한 연결은 종종 사용자가 영영 돌아오지 않는다는 것을 의미한다.

**2) 모바일 연결 댄스 (심각도: Critical)**

이것이 2026년 현재 이더리움 모바일 UX의 현실이다:

1. 앱 링크를 탭한다
2. 기본 브라우저가 열린다 (지갑이 아님)
3. URL을 복사한다
4. 지갑 앱으로 전환한다
5. 인앱 브라우저에 붙여넣는다
6. 다시 연결한다

iOS 17+에서 자동 리다이렉트가 제거되면서, 수동 앱 전환이 강제된다.

**Mobile Wallet Protocol(MWP)** 이 딥링크 직접 연결로 99% 신뢰성을 주장하며, Coinbase와 Rainbow가 네이티브로 채택했다.
임베디드 지갑은 연결 레이어 자체를 완전히 우회한다.

**3) 모바일 앱 무응답 (심각도: High)**

WalletConnect 세션이 조용히 끊긴다.
iOS 15 소켓 버그와 2025년 5월 Chrome 웹소켓 변경이 연결 흐름을 깨뜨렸다.
5개 이상의 동시 세션을 관리하는 지갑은 거의 없다.

릴레이 기반 통신은 모바일에서 본질적으로 취약하다.

**핵심**: 모바일에서 실패한 사용자는 데스크톱으로 전환하지 않는다. 그냥 떠난다.

### 빌더 체크리스트: 지갑 연결

| 우선순위 | 패턴 |
|---------|------|
| Critical | EIP-6963 멀티 지갑 검색 구현 |
| High | 원활한 모바일 연결을 위한 딥링크 지원 |
| High | 마지막 연결된 지갑 기억 및 자동 재연결 |
| Medium | 신규 사용자를 위해 임베디드/스마트 지갑을 기본값으로 지원 |
| Medium | WalletConnect v2를 폴백 연결 방식으로 사용 |

---

## 6. Accessibility: 비영어권 75%를 위한 문을 열어라

### 핵심 문제 3가지

**1) 전문 용어 과부하 (심각도: Critical)**

앞서 온보딩 섹션에서도 다뤘지만, 접근성 관점에서 다시 강조할 필요가 있다.

"시드 구문", "니모닉", "비밀 키", "복구 구문", "비밀 복구 구문" — 동의어 5개.
지갑마다, 프로토콜마다 다른 용어를 사용한다.

비영어권 시장에서는 이 용어들의 표준 번역조차 존재하지 않는다.
각 프로젝트가 "스테이킹", "가스", "지갑"을 독자적으로 번역하면서, **번역이 오히려 원래의 전문 용어보다 더 큰 혼란**을 만든다.

업계 표준 용어 사전은 아무도 만들고 있지 않다.

**2) 사용자 지식 가정 (심각도: High)**

앱과 지갑이 사용자가 블록체인을 이미 이해한다고 가정한다:

- 가스비를 가스가 무엇인지 설명하지 않고 보여준다
- 승인을 "승인"이 무엇을 의미하는지 설명하지 않고 요청한다
- 유동성 풀을 비영구적 손실에 대한 지식을 전제로 제시한다

가정된 지식과 실제 지식 사이의 격차는 거대하다.

점진적 공개(Progressive Disclosure)와 인라인 맥락 설명이 해법이지만, 표준으로 구축하고 있는 곳은 없다.
일부 지갑이 간단/고급 모드 토글을 제공하기 시작했다.

**3) 빈약한 현지화 (심각도: Medium)**

대부분의 앱이 영어 전용이다.
i18n 프레임워크 도구는 존재하지만, 팀들이 우선순위를 두지 않는다.

일부 프로젝트가 자원봉사 번역자를 활용해 40개 이상 언어를 지원하지만, 체계적이지 않다.

**기회**: 현지화된 인터페이스는 비영어권 인터넷 사용자 75%에 접근할 수 있게 한다.
모든 새로운 언어는 새로운 시장 세그먼트를 연다.

---

## 7. Protocol Design: 프로토콜 레이어에서 UX를 해금하라

### 핵심 문제 2가지

**1) 기본값이 네이티브 Account Abstraction이 아니다 (심각도: High)**

> "ERC-4337 경험에서, AA 채택의 가장 큰 장벽은 기존 EOA 사용자들이 UX 이점에도 불구하고 마이그레이션을 원하지 않는다는 것이다."
> — 빌더

이더리움은 EOA(Externally Owned Account)를 기본값으로 사용한다.
사용자는 개인키를 관리하고, 모든 트랜잭션에 ETH로 가스를 지불하고, 모든 동작에 승인을 해야 한다.

반면 Starknet은 네이티브 AA로 시작했다.
모든 계정이 스마트 계정이고, 이러한 제약이 기본적으로 존재하지 않는다.

현재 이더리움의 상황:
- **ERC-4337** (오프프로토콜): 5,400만+ 계정, 10억+ UserOps — 성공적이지만 프로토콜 네이티브가 아님
- **EIP-7702** (브릿지): 9개 지갑, 1,290만 계정 — EOA에 스마트 계정 행동을 위임
- **EIP-8141** (프레임 트랜잭션): Active Draft — 진정한 네이티브 AA를 향한 제안

핵심 통찰: **스마트 지갑의 리텐션은 70%이고, 시드 구문 지갑은 60%다.**
10%의 차이지만, 이것이 누적되면 생태계 전체의 사용자 기반에 영향을 미친다.

**2) 온체인 활동이 기본적으로 공개된다 (심각도: High)**

> "누군가에게 지갑 주소를 문자로 보낼 때마다, 전체 잔고와 모든 거래 내역을 넘기는 것이다."
> — 사용자

> "세금 감사관에게 보유 내역을 공유하는 것이 전 세계에 익스플로러로 노출되어야 할 이유는 없다."
> — 사용자

이더리움의 모든 트랜잭션은 영구적으로 공개되고 인덱싱된다.
사용자들은 종종 이를 인지하지 못한다.

이것이 의미하는 것:
- 고용주가 직원의 전체 금융 활동을 볼 수 있다
- 상점이 고객의 전체 잔고를 볼 수 있다
- 거래 상대방이 완전한 거래 내역을 볼 수 있다

**공개가 기본값인 한, 급여, 상거래, 개인 DeFi 같은 일상적 금융 사용 사례는 불가능하다.**

프라이버시 솔루션은 존재한다:

| 솔루션 | 상태 | 채택 |
|--------|------|------|
| Railgun | Live | $4.5B+ 누적 차폐 볼륨 |
| Privacy Pools | Live | ~1,500 사용자, ~$6M 볼륨 |
| 스텔스 주소 (ERC-5564) | Live | Umbra를 통해 77K 주소 |
| Aztec L2 | Building | 2026년 초 사용자 트랜잭션 예상 |

문제는 모두 **옵트인 방식**이라는 것이다.
사용자가 능동적으로 선택해야 프라이버시가 작동한다.
주류 채택을 위해서는 프라이버시가 기본값이어야 한다.

---

## 8. Daily Operations: 매일 쓰는 흐름을 다듬어라

### 핵심 문제 5가지

**1) 예측 불가능한 가스비 (심각도: Medium)**

2026년 평균 가스는 ~3 gwei로 낮아졌지만, 사용자는 여전히 트랜잭션을 실행하기 전에 비용을 예측할 수 없다.
네트워크 혼잡 스파이크는 사용자를 놀라게 한다.
변동 수수료 모델은 전통적 앱 사용자에게 여전히 생소하다.

**2) 법정화폐 기준 표시 부족 (심각도: Medium)**

일부 인터페이스가 토큰 수량 입력(0.0042 ETH)을 강제한다.
사용자는 법정화폐로 사고한다.

USD/EUR 외 시장(PLN, CZK, BRL, KRW 등)에서는 사용자가 이중 환산을 해야 한다:
토큰 → USD → 현지 통화.

**3) 포트폴리오 및 세금 추적 부재 (심각도: Medium)**

여러 체인, 여러 지갑, DeFi 포지션, LP 보상, 에어드롭, 브릿지를 단일 도구로 추적하는 것은 현재 불가능하다.

외부 세금 소프트웨어(Koinly, CoinTracker)가 있지만:
- 수동 조정이 필요하다
- DeFi를 잘못 분류한다
- 크로스체인 스왑의 원가 기준을 추적하지 못한다

지갑 네이티브 세금 추적은 아무도 구축하고 있지 않다.

**4) NFT 로딩 실패 (심각도: Medium)**

지갑이 멀티체인 NFT 표시에 어려움을 겪는다:
- RPC 엔드포인트 실패
- 인덱서가 오래된 데이터를 반환
- IPFS 호스팅 미디어가 느리게 로드되거나 전혀 로드되지 않음

사용자는 NFT가 사라졌다고 생각하지만, 실제로는 인덱싱되지 않았을 뿐이다.

**5) 토큰 리스트 마찰 (심각도: Medium)**

범용 토큰 레지스트리가 존재하지 않는다.
사용자가 지원되지 않는 토큰을 만나면, 수동으로 컨트랙트 주소를 임포트해야 한다.

대부분의 신규 사용자는 이를 시도조차 하지 않는다.

### 빌더 체크리스트: 가스 및 수수료

| 우선순위 | 패턴 |
|---------|------|
| Critical | 빈 지갑 감지 시 Paymaster 가스 후원 제공 |
| High | 모든 수수료를 사용자의 현지 법정화폐로 표시 |
| High | 스테이블코인/ERC-20 토큰으로 가스 결제 허용 |
| Medium | 수수료 분해 표시 (기본, 우선순위, L2의 L1 데이터) |
| Medium | 비정상적으로 높은 가스비 트랜잭션 전 경고 |

---

## 전체 채택 현황: 무엇이 작동하고 있는가

이 로드맵에서 언급된 주요 기술들의 현재 상태를 한눈에 보자.

### Live (이미 작동 중)

| 기술 | 채택 수준 |
|------|----------|
| ERC-4337 스마트 계정 | 5,400만+ 계정, 10억+ UserOps |
| EIP-7702 위임 | 9개 지갑, 1,290만 계정, 1.17억 인가 |
| Permit2 | Uniswap, ETH/OP/ARB/BASE/POLY에 배포 |
| EIP-6963 멀티 지갑 검색 | 37+ 지갑 |
| ENS 도메인 | 910K+ 활성 |
| EIP-1559 수수료 시장 | 범용 |
| Railgun | $4.5B+ 차폐 볼륨 |
| Revoke.cash | 100+ 네트워크 |

### Final/Draft (진행 중)

| 기술 | 상태 | 현황 |
|------|------|------|
| EIP-5792 배치 호출 | Final | 지갑 지원 성장 중, 앱 통합 부족 |
| ERC-7730 Clear Signing | Draft | 제한적 엔드투엔드 커버리지 |
| ERC-7715 세션 키 | Draft | MetaMask Delegation Toolkit, Viem |
| EIP-7811 통합 잔고 | Draft | 구현체 없음 |
| EIP-8141 네이티브 AA | Draft | Active Draft |

### Unsolved (미해결)

| 문제 | 상태 |
|------|------|
| 업계 표준 용어 사전 | 아무도 구축하지 않음 |
| UX 라이팅 가이드라인 | 아무도 구축하지 않음 |
| 지갑 네이티브 세금 추적 | 아무도 구축하지 않음 |
| 프라이버시 기본값 | 옵트인만 존재 |

---

## 전략적 통찰: 이 데이터가 말하는 것

32,000건의 사용자 리포트에서 추출된 패턴을 종합하면, 몇 가지 구조적 통찰이 드러난다.

### 1. 첫 5분이 평생 가치를 결정한다

40%가 가스 획득에서 이탈한다.
각 추가 단계마다 이탈률이 증가한다.
Paymaster 가스 후원이 온보딩 전환의 **단일 최대 레버**다.

### 2. 서명 UX가 보안과 사용성을 동시에 결정한다

블라인드 서명은 최대 공격 표면이다.
서명 피로는 사용자를 무방비 상태로 만든다.
Clear signing + 시뮬레이션 + 배치는 선택이 아니라 필수다.

### 3. 인텐트 기반이 이미 승리하고 있다

Across가 $35B+ 볼륨을 달성한 것은 복잡성 제거가 시장에서 보상받는다는 증거다.
사용자에게 "어떻게"가 아니라 "무엇을 원하느냐"만 물어야 한다.

### 4. 모바일 무시는 자해 행위다

60%+ 트래픽이 모바일인데 65% 프로토콜이 무시한다.
모바일에서 실패한 사용자는 데스크톱으로 전환하지 않고 이탈한다.

### 5. 전문 용어가 내부자를 자가선별한다

평이한 언어와 현지화 없이 대중 채택은 불가능하다.
업계 표준 용어 사전이 아무도 구축하지 않고 있다는 사실은, 이것이 아직 아무도 소유하지 않은 기회라는 뜻이기도 하다.

### 6. 프라이버시는 기능이 아니라 기대값이다

은행 거래내역이 전부 공개된다면 아무도 은행을 쓰지 않을 것이다.
이더리움에서는 그것이 기본값이다.
공개가 기본인 한, 급여/상거래/개인 DeFi는 불가능하다.

### 7. Account Abstraction은 모든 것의 기반이다

가스 후원, 서명 배치, 소셜 리커버리, 세션 키 — 이 모든 것의 전제조건이 스마트 계정이다.
5,400만 계정이 이미 이를 증명하고 있다.
스마트 지갑의 리텐션(70%)이 시드 구문 지갑(60%)보다 높다.

---

## 마무리: UX가 킬러 앱이다

이더리움의 기술 스택은 이미 대부분의 문제를 해결할 수 있는 수준에 도달했다.
ERC-4337, EIP-7702, EIP-5792, ERC-7683, ERC-7730 — 표준은 존재한다.

부족한 것은 기술이 아니라 **구현과 채택**이다.

32,000건의 사용자 리포트가 일관되게 가리키는 방향은 하나다:

> 사용자는 블록체인을 이해하고 싶지 않다.
> 사용자는 **결과**를 원한다.

가스가 무엇인지, 어떤 체인에 있는지, 승인이 왜 두 번 필요한지 — 이런 것들은 사용자가 알 필요가 없는 구현 세부사항이다.

이더리움이 다음 10억 사용자에 도달하려면, 기술의 복잡성을 사용자로부터 완전히 숨겨야 한다.
인텐트 기반 프로토콜이 $35B로 이를 증명했고, 스마트 계정이 5,400만으로 기반을 다졌다.

남은 것은 이 조각들을 하나의 매끄러운 경험으로 조립하는 것이다.

---

*이 글은 [ethux.design](https://ethux.design/)의 Ethereum UX Roadmap 데이터를 기반으로 작성되었습니다. 원본 데이터는 32,000건 이상의 커뮤니티 사용자 리포트에서 수집되었으며, 빌더 체크리스트와 채택 메트릭스를 포함합니다.*
`,K2=`---
id: "future-of-web3-audit"
title: "Web3 Audit의 미래: 코드에서 금융 시스템으로, 그리고 다시 신뢰로"
description: "Web3 보안은 더 이상 코드만의 문제가 아니다. FTX, Drift, Resolv, Aave-CoW 사례를 통해 시스템 레벨 보안과 조합 위험의 중요성을 정리한다."
date: "2026-04-04 19:50"
category: "research-article"
tags: ["Web3", "Audit", "DeFi", "Security", "Research"]
published: true
---

# Web3 Audit의 미래: 코드에서 금융 시스템으로, 그리고 다시 “신뢰”로

Web3는 한때 단순한 약속 위에서 출발했다.

> “코드를 신뢰하라 (Don’t trust, verify)”

스마트 컨트랙트가 모든 규칙을 자동으로 실행하고,  
중앙화된 신뢰를 제거하며,  
투명성과 불변성을 통해 금융을 재구성한다는 이상.

그러나 이 이상은 시간이 지날수록 점점 다른 질문으로 바뀌고 있다.

> “정말 우리는 더 이상 신뢰하지 않아도 되는가?”

---

## FTX: Web3가 가장 먼저 무너진 이유

FTX의 붕괴는 단순한 기업 파산이 아니었다.  
그것은 Web3가 해결하려 했던 문제, 즉 “신뢰”가 여전히 남아 있다는 사실을 보여준 사건이었다.

FTX는 고객 자산을 안전하게 보관하는 것처럼 보였지만,  
실제로는 고객 자금을 내부 트레이딩 회사인 Alameda Research에 유용했고,  
약 80억 달러 규모의 자금 공백이 드러나며 붕괴했다 ([Investopedia][1]).

더 중요한 문제는 따로 있다.

FTX는 기술적으로 복잡한 시스템이 아니었다.  
오히려 문제는 전통 금융에서 이미 해결되었어야 할 영역,  
즉 **custody, 내부 통제, 회계, 리스크 관리**가 존재하지 않았다는 점이다.

관련 보고서는 FTX가 기본적인 보안 조직, 리스크 관리 체계, 내부 통제조차 제대로 갖추지 못했다고 지적한다 ([Investopedia][2]).

즉,

> FTX는 “블록체인 문제”가 아니라  
> **“금융 시스템 실패”였다.**

---

## “비수탁이면 안전하다”는 착각

FTX 이후 Web3는 이렇게 말한다.

> “그래서 우리는 비수탁(non-custodial)으로 간다”

하지만 이 역시 완전한 해답은 아니다.

비수탁은 단지  
“자산을 누가 들고 있느냐”의 문제를 해결할 뿐,  
“무엇을 실행하느냐”의 문제는 해결하지 못한다.

사용자는 여전히:

- 프론트엔드를 통해 트랜잭션을 생성하고
- 스마트 컨트랙트와 상호작용하며
- 서명을 통해 권한을 위임한다

이 과정에서:

- UI가 조작되거나
- 악성 로직이 숨겨져 있거나
- \`delegatecall\`과 같은 메커니즘이 상태를 변조하면

사용자는 스스로 자산을 넘겨주게 된다.

즉,

> custody는 제거되었지만,  
> **신뢰는 여전히 존재한다. 단지 형태만 바뀌었을 뿐이다.**

---

## Drift, Resolv, Aave–CoW: 코드가 아니라 시스템이 무너진다

최근의 사건들은 이 변화를 더욱 명확하게 보여준다.

Drift Protocol 사건은 단순한 코드 취약점이 아니었다.  
관리자 키, 사전 서명된 트랜잭션, 타임락 부재, 오라클 신뢰 구조가 결합되면서  
공격자는 시스템의 “운영 권한”을 이용해 자산을 탈취했다.

Resolv 역시 온체인 로직 자체보다는  
**오프체인 키 관리와 신뢰 구조의 붕괴**가 핵심 원인이었다.

Aave–CoW 사건은 더 흥미롭다.  
여기에는 전통적인 의미의 코드 버그가 없었다.

하지만 다음 요소들이 결합되며 대규모 손실이 발생했다.

- 유동성 부족
- 라우팅 실패
- 주문 실행 구조
- UI 설계

이 세 사건이 공통적으로 보여주는 것은 단 하나다.

> 공격은 더 이상 “코드 내부”에서만 발생하지 않는다.  
> **공격은 시스템 전체에서 발생한다.**

---

## Web3는 이미 “금융 시스템”이다

오늘날 하나의 DeFi 프로토콜은 더 이상 단일 컨트랙트가 아니다.

그것은 다음 요소들의 집합이다.

- 스마트 컨트랙트
- 프론트엔드
- 오프체인 봇 및 솔버
- 키 관리 시스템
- 오라클 / 브리지
- 거버넌스
- 유동성 구조
- 비상 대응 체계

이 중 하나만 무너져도 손실이 발생한다.

즉,

> “Contract is secure” ≠ “System is secure”

---

## Audit의 붕괴: 왜 더 이상 충분하지 않은가

기존의 audit은 다음 전제 위에 존재했다.

> “코드에 취약점이 없으면 안전하다”

하지만 현실의 공격은 훨씬 복합적인 방식으로 발생한다.

- 계약 A는 안전하다
- 계약 B도 안전하다
- 오프체인 시스템도 정상이다
- UI도 문제없다

그런데 이들이 결합되면  
**예상하지 못한 공격 경로가 생성된다.**

이것이 바로 Web3의 핵심 리스크,  
즉 **조합 위험(compositional risk)**이다.

Web3의 강점이었던 composability는  
이제 가장 큰 공격 surface가 되었다.

---

## 공격의 본질이 바뀌고 있다

과거의 공격은 코드 중심이었다.

- reentrancy
- overflow

하지만 지금의 공격은 시스템 중심이다.

- key compromise
- governance hijack
- oracle manipulation
- MEV exploitation
- liquidity attack
- UI deception

FTX는 “custody 실패”였고,  
Drift는 “운영 권한 실패”였으며,  
Aave–CoW는 “시장 구조 실패”였다.

이것은 더 이상 단순한 해킹이 아니라,

> **금융 시스템 공격(financial system attack)**이다.

---

## Audit의 미래: System-Level Security

따라서 audit은 근본적으로 바뀌어야 한다.

앞으로의 audit은 단순 코드 검수가 아니라  
다음 영역을 함께 포함해야 한다.

- Code Security
- Key / Permission Structure
- Execution Layer (solver, routing)
- Market & Liquidity Risk
- Dependency Risk (oracle, bridge)
- Operational Security
- User Interaction

즉,

> Audit은 “코드 리뷰”에서  
> **“금융 시스템 리스크 분석”으로 진화해야 한다.**

---

## 다시, 신뢰의 문제

Web3는 “신뢰를 제거하겠다”는 목표로 시작했다.

하지만 현실은 다르다.

- FTX에서는 중앙화된 신뢰가 무너졌고
- DeFi에서는 분산된 신뢰가 복잡하게 얽혀 있다

그리고 우리는 지금 새로운 질문 앞에 서 있다.

> “우리는 무엇을 신뢰하고 있는가?”

코드인가,  
키 관리인가,  
오라클인가,  
UI인가,  
혹은 그 모든 것의 조합인가.

---

## 결론

Web3는 더 이상 코드가 아니다.  
이미 하나의 금융 시스템이다.

따라서 우리가 던져야 할 질문은 바뀌어야 한다.

> “이 컨트랙트는 안전한가?”가 아니라  
> **“이 시스템 전체는 어디에서 무너질 수 있는가?”**

그리고 이 질문에 답할 수 있는 사람이  
앞으로의 Web3 보안, 그리고 금융 보안의 핵심이 될 것이다.

[1]: https://www.investopedia.com/what-went-wrong-with-ftx-6828447?utm_source=chatgpt.com "FTX Crypto Exchange Collapse: Causes, Consequences, and Lessons"
[2]: https://www.investopedia.com/hubris-incompetence-greed-caused-ftx-collapse-7377716?utm_source=chatgpt.com "'Hubris, Incompetence, and Greed' Plagued Failed Cryptocurrency Exchange FTX"
`,J2=`---
id: "md-writing-template-guide"
title: "Markdown 포스트 작성 템플릿"
description: "이 파일 형식 그대로 복사해서 새 글을 빠르게 작성하는 방법을 정리했습니다."
date: "2026-03-02 01:10"
category: "daily"
tags: ["markdown", "템플릿", "작성가이드"]
published: false
---
# Markdown 포스트 작성 템플릿

이 글은 \`src/content/posts/*.md\` 형식으로 글을 작성할 때 바로 참고할 수 있는 실전 템플릿입니다.

글 내용은 각 \`.md\` 파일에 저장되고, \`src/lib/posts.ts\`가 이를 자동으로 수집해 목록으로 만듭니다.

---

## 1. 파일 만들기

\`src/content/posts/\` 폴더에 새 파일을 만듭니다.

예시:

\`\`\`bash
src/content/posts/my-new-post.md
\`\`\`

파일명은 보통 \`id\`와 비슷하게 맞추는 것을 권장합니다.

---

## 2. frontmatter 작성

파일 맨 위에 아래 블록을 넣고 값만 바꿉니다.

\`\`\`md
---
id: "my-new-post"
title: "글 제목"
description: "목록에서 보일 요약 설명"
date: "2026-03-02 01:10"
category: "daily"
tags: ["태그1", "태그2"]
published: true
---
\`\`\`

필드 설명:

- \`id\`: 글 고유값 (URL에 사용됨, 중복 금지)
- \`title\`: 글 제목
- \`description\`: 목록 요약
- \`date\`: \`YYYY-MM-DD HH:MM\` 형식
- \`category\`: 카테고리 ID (\`daily\`, \`security\`, \`web-security\` 등)
- \`tags\`: 문자열 배열
- \`published\`: \`true\`면 공개, \`false\`면 숨김

---

## 3. 본문 작성

frontmatter 아래부터는 일반 마크다운으로 작성하면 됩니다.
표, 체크리스트, 취소선 같은 GitHub 스타일 문법도 사용할 수 있습니다.

\`\`\`\`md
# 메인 제목

도입 문장

## 섹션 제목

- 항목 1
- 항목 2

\`\`\`ts
const message = "hello";
console.log(message);
\`\`\`

[링크 예시](https://example.com)
\`\`\`\`

---

## 4. 바로 쓰는 복붙용 템플릿

아래를 그대로 새 파일에 붙여넣고 값만 변경하세요.

\`\`\`md
---
id: "replace-with-post-id"
title: "replace with title"
description: "replace with short description"
date: "2026-03-02 01:10"
category: "daily"
tags: ["tag1", "tag2"]
published: true
---

# replace with title

본문을 작성하세요.
\`\`\`
`,W2=`---
id: "profile-customization-guide"
title: "프로필 및 블로그 커스터마이징 완벽 가이드"
description: "프로필 사진, 배경 이미지, 연락처, 경력, 학력 등 모든 개인 정보를 수정하는 방법을 상세히 설명합니다."
date: "2026-01-29 10:00"
category: "daily"
tags: ["블로그", "프로필", "커스터마이징", "가이드"]
published: false
---
# 프로필 및 블로그 커스터마이징 완벽 가이드

이 가이드에서는 프로필 사진, 헤더 배경, 그리고 PROFILE 페이지의 모든 정보를 수정하는 방법을 다룹니다.

---

## 1. 이미지 변경

### 1.1 프로필 사진 변경

프로필 사진은 두 곳에서 사용됩니다:
- 사이드바 상단의 로고 영역
- PROFILE 페이지의 메인 프로필 이미지

**변경 방법:**

1. 새 프로필 이미지를 \`public/images/\` 폴더에 저장합니다.
   - 권장 크기: 400x400px 이상
   - 권장 형식: JPG 또는 PNG

2. \`src/lib/data.ts\` 파일을 열고 \`profileData.profileImage\` 값을 수정합니다:

\`\`\`typescript
export const profileData: ProfileData = {
  // ...
  profileImage: '/images/새로운프로필.jpg',  // 👈 여기 수정
  // ...
};
\`\`\`

### 1.2 헤더 배경 이미지 변경

BLOG 페이지 상단의 우주 배경 이미지를 변경하려면:

1. 새 배경 이미지를 \`public/images/\` 폴더에 저장합니다.
   - 권장 크기: 1920x600px 이상
   - 어두운 톤의 이미지 권장 (텍스트 가독성)

2. \`src/components/Header/Header.css\` 파일을 열고 다음 부분을 수정합니다:

\`\`\`css
.hero-background {
  /* ... */
  background: 
    linear-gradient(180deg, 
      rgba(5, 5, 10, 0.3) 0%,
      rgba(5, 5, 10, 0.6) 100%),
    url('/images/새로운배경.png');  /* 👈 여기 수정 */
  /* ... */
}
\`\`\`

---

## 2. 기본 프로필 정보 수정

\`src/lib/data.ts\` 파일의 \`profileData\` 객체를 수정합니다.

### 2.1 이름 및 타이틀

\`\`\`typescript
export const profileData: ProfileData = {
  name: 'flowizy',              // 닉네임
  title: 'SECURITY RESEARCHER',  // 직함
  bio: '관심 있는 것들을 공부하고 기록합니다.',  // 소개 문구
  // ...
};
\`\`\`

**참고:** Korean name은 ProfileCard 컴포넌트에서 하드코딩되어 있습니다. 변경하려면 \`src/components/Profile/ProfileCard.tsx\`를 수정하세요.

### 2.2 연락처 정보 (Contacts)

\`contacts\` 배열에서 연락처 정보를 수정합니다:

\`\`\`typescript
contacts: [
  { 
    type: 'discord',           // 타입: discord, telegram, linkedin, github, email
    label: 'DISCORD',          // 표시될 라벨
    value: '_flowizy'          // 실제 값 (복사될 텍스트)
  },
  { 
    type: 'telegram', 
    label: 'TELEGRAM', 
    value: '@chaegunn',
    link: 'https://t.me/chaegunn'  // 클릭 시 이동할 링크 (선택사항)
  },
  { 
    type: 'linkedin', 
    label: 'LINKEDIN', 
    value: 'Chaegeon Oh',
    link: 'https://linkedin.com/in/chaegunn'  // 외부 링크로 연결
  },
  { 
    type: 'github', 
    label: 'GITHUB', 
    value: 'fl0wizy',
    link: 'https://github.com/fl0wizy'  // 외부 링크로 연결
  },
  { 
    type: 'email', 
    label: 'PERSONAL EMAIL', 
    value: 'dhcorjs063@gmail.com',
    link: 'mailto:dhcorjs063@gmail.com'  // 메일 클라이언트로 연결
  },
],
\`\`\`

**연락처 타입별 동작:**
- \`github\`, \`linkedin\`: 클릭 시 외부 링크로 이동 (새 탭)
- \`discord\`, \`telegram\`, \`email\`: 복사 버튼 표시 (클릭 시 클립보드에 복사)

---

## 3. 경력 정보 수정 (Experience)

\`experiences\` 배열을 수정합니다:

\`\`\`typescript
experiences: [
  {
    title: 'The 10th President of the Student Council',  // 직책
    company: 'Ajou University-department of cyber security',           // 회사명
    period: '2025-01 ~ 2025-12',                 // 기간
    description: '2025년도 아주대학교 사이버보안학과 제10대 학생회장으로 역임.',  // 설명
    tags: ['학생회', '자치활동', '책임감감'],  // 관련 기술 태그
    current: true,                        // 현재 재직 중 여부 (보라색 강조)
  },
  {
    title: 'Security Analyst',
    company: 'Previous Company',
    period: '2022 ~ 2024',
    description: '웹 애플리케이션 취약점 분석 및 침투 테스트를 수행했습니다.',
    tags: ['Web Security', 'Penetration Testing'],
    current: false,
  },
],
\`\`\`

**\`current: true\`**: 기간 부분이 보라색으로 강조 표시됩니다.

---

## 4. 프로젝트 정보 수정 (Projects)

\`projects\` 배열을 수정합니다:

\`\`\`typescript
projects: [
  {
    title: 'Visualize on-chain data',              // 프로젝트명
    type: 'Data Analytics & Visualization',             // 프로젝트 유형
    year: '2025-03 ~ 2025-06',                         // 연도
    description: 'ARKHAM, DUNE, Etherscan 등과 같이 정적인 데이터에서 유의미한 데이터를 추출하고 이를 보기 쉽게 가시화한 프로젝트입니다.',
    tags: ['Java', 'SpringBoot', 'Vue.js'],
    link: 'https://github.com/fl0wizy/defi-audit-bot',  // 프로젝트 링크 (선택사항)
  },
  {
    title: 'Blockchain Audit Project',              // 프로젝트명
    type: 'DeFi Security & Audit',             // 프로젝트 유형
    year: '2025-07 ~ 2025-10',                         // 연도
    description: 'Flare, Trader Joe, Ekubo와 같은 정통 DEX부터 담보대출 시스템 등 DeFi 프로토콜 감사를 수행한 프로젝트입니다.',
    tags: ['EVM', 'Solidity', 'CodeArena'],
    link: 'https://github.com/fl0wizy/defi-audit-bot',  // 프로젝트 링크 (선택사항)
  },
],
\`\`\`

---

## 5. 학력 정보 수정 (Education)

\`education\` 배열을 수정합니다:

\`\`\`typescript
education: [
  {
    title: 'Department of Cyber Security',
    institution: 'Ajou University',
    subInfo: '아주대학교 사이버보안학과',
    period: '2022 ~ 현재',
    description: '시스템 보안 및 탈중앙화를 중점적으로 공부하고 있습니다.',
    tags: ['시스템 보안', '운영체제', '네트워크'],
    current: true,                        // 현재 재학 중 (파란색 강조)
  },
  {
    title: 'Hspace Internship',  // 프로그램명
    institution: 'Hspace',                   // 기관명
    subInfo: '교육 인턴',                 // 부가 정보 (선택사항)
    period: '2025-07 ~ 2025-08',           // 기간
    description: 'Web과 Web3, 인프라에 대한 전반적인 지식을 습득했습니다.',
    tags: ['Web Security', 'Web3', 'Secureum', 'DEFCON'],
  },
  {
    title: 'HuntinMaster (KISA) Web/Web3 Track Trainee',  // 프로그램명
    institution: 'KISA',                   // 기관명
    subInfo: '우수 수료생',                 // 부가 정보 (선택사항)
    period: '2025-07 ~ 2025-10',           // 기간
    description: 'Web과 Web3에 대한 전반적인 보안 지식을 습득했습니다.',
    tags: ['Web Security', 'Web3', 'Audit', 'Bug Bounty'],
  },
  {
    title: 'upside Academy',  // 프로그램명
    institution: 'Theory x 두나무',                   // 기관명
    subInfo: 'A.K.A fl0wizy',                 // 부가 정보 (선택사항)
    period: '2026-02 ~ 2026-06',           // 기간
    description: '전분야 보안의 전반적인 지식과 web3의 깊은 이해를 가지게 되었습니다.',
    tags: ['Solidity', 'Foundry', 'Web3', 'Audit', 'Threat Modeling'],
  },
],
\`\`\`

---

## 6. 스킬 정보 수정 (Skills)

\`skills\` 배열을 수정합니다:

\`\`\`typescript
skills: [
  {
    name: 'Web3 보안',                     // 스킬명
    category: 'Smart Contracts',          // 카테고리
    level: 'intermediate',                      // 수준: beginner, intermediate, advanced, expert
    description: 'EVM, 가스 최적화 및 프로토콜 보안 패턴에 대한 깊은 이해를 보유하고 있습니다.',
    tags: ['Solidity', 'Yul', 'Foundry'],
  },
  {
    name: 'Web Security',
    category: 'Network Security',
    level: 'intermediate',
    description: '네트워크 보안 기술에 대한 깊은 이해를 보유하고 있습니다.',
    tags: ['Burp Suite', 'XSS', 'SQLi', 'Wireshark', 'Nmap', 'business'],
  },
],
\`\`\`

---

## 7. 사이드바 로고 텍스트 변경

사이드바에 표시되는 "flowizy's DevLog"와 "SECURITY RESEARCHER" 텍스트를 변경하려면:

\`src/components/Sidebar/Sidebar.tsx\` 파일을 수정합니다:

\`\`\`typescript
<div className="logo-text">
  <h1>Your Name's Blog</h1>    {/* 👈 여기 수정 */}
  <p>YOUR TITLE</p>             {/* 👈 여기 수정 */}
</div>
\`\`\`

---

## 8. 헤더 타이틀 변경

BLOG 페이지 상단 배너의 "Searching for vulnerabilities" 텍스트를 변경하려면:

\`src/components/Header/Header.tsx\` 파일을 수정합니다:

\`\`\`typescript
<h1 className="hero-title">
  Searching for <span className="highlight">vulnerabilities</span>
</h1>
\`\`\`

---

## 9. 전체 수정 흐름 요약

| 수정 항목 | 파일 위치 |
|----------|----------|
| 프로필 사진 | \`public/images/\` + \`src/lib/data.ts\` |
| 배경 이미지 | \`public/images/\` + \`src/components/Header/Header.css\` |
| 기본 정보 (이름, 소개) | \`src/lib/data.ts\` → \`profileData\` |
| 연락처 | \`src/lib/data.ts\` → \`profileData.contacts\` |
| 경력 | \`src/lib/data.ts\` → \`profileData.experiences\` |
| 프로젝트 | \`src/lib/data.ts\` → \`profileData.projects\` |
| 학력 | \`src/lib/data.ts\` → \`profileData.education\` |
| 스킬 | \`src/lib/data.ts\` → \`profileData.skills\` |
| 게시글 본문 | \`src/content/posts/*.md\` |
| 사이드바 로고 텍스트 | \`src/components/Sidebar/Sidebar.tsx\` |
| 헤더 타이틀 | \`src/components/Header/Header.tsx\` |

---

## 10. 배포 후 확인

모든 수정이 완료되면:

\`\`\`bash
# 로컬에서 확인
npm run dev

# 문제없으면 배포
npm run deploy
\`\`\`

브라우저에서 \`https://fl0wizy.github.io\`로 접속하여 변경사항을 확인합니다.
`,P2=`---
id: "solidity-concepts-1"
title: "Solidity 개념 정리 1: EVM, 파일 구조, ABI"
description: "Solidity와 EVM의 관계, 소스 파일 레이아웃, pragma, ABI, NatSpec, SMTChecker까지 기초 개념을 한 번에 정리합니다."
date: "2026-04-04 19:10"
category: "study-dev-security"
tags: ["Solidity", "EVM", "ABI", "Pragma", "NatSpec"]
published: true
---

# Solidity 개념 정리 1: EVM, 파일 구조, ABI

이 글은 Solidity를 공부하며 정리한 기초 개념 노트다.  
이번 글에서는 Solidity가 EVM 위에서 어떻게 동작하는지, Solidity 소스 파일을 어떤 구조로 작성하는지, 그리고 ABI가 무엇인지까지 한 번에 훑어본다.

---

## 1. Solidity와 EVM의 관계

Solidity는 이더리움에서 스마트 컨트랙트를 작성하기 위해 사용하는 고급 언어다.  
여기서 핵심은 Solidity 코드가 직접 실행되는 것이 아니라, **컴파일된 바이트코드가 EVM에서 실행된다는 점**이다.

### EVM이란?

EVM(Ethereum Virtual Machine)은 이더리움 네트워크 전체가 공유하는 가상 실행 환경이다.

- 스마트 컨트랙트를 실행한다.
- 모든 노드가 같은 입력에 대해 같은 결과를 내도록 보장한다.
- 실제 물리 컴퓨터가 아니라, 추상적인 계산 모델이다.

즉, Solidity는 사람이 읽기 쉬운 언어이고, EVM은 기계가 실행하는 환경이다.

### 실행 흐름

\`\`\`text
Solidity 소스코드
-> 컴파일
-> EVM 바이트코드
-> 이더리움에 배포
-> EVM이 바이트코드 실행
\`\`\`

이 관계를 이해하면 "Solidity 문법"과 "EVM 동작"을 따로 공부해야 하는 이유도 자연스럽게 보인다.

---

## 2. Solidity는 정적 타입 언어다

Solidity는 **정적 타입 언어**다.  
즉, 변수의 타입이 컴파일 시점에 결정되고, 실행 전에 타입 검사가 끝난다.

예를 들어 다음 코드는 허용된다.

\`\`\`solidity
uint256 count = 10;
\`\`\`

반면 아래 코드는 컴파일되지 않는다.

\`\`\`solidity
uint256 count = 10;
// count = "hello"; // 컴파일 에러
\`\`\`

정적 타입 언어의 장점은 다음과 같다.

- 타입 오류를 실행 전에 발견할 수 있다.
- 예상치 못한 형변환 버그를 줄일 수 있다.
- 컴파일러 최적화가 쉬워진다.

Solidity가 자산을 직접 다루는 언어라는 점을 생각하면, 정적 타입 시스템은 단순한 문법 특징이 아니라 안정성과 직결되는 설계라고 볼 수 있다.

---

## 3. Solidity 소스 파일의 기본 레이아웃

Solidity 파일에는 여러 요소가 들어갈 수 있지만, 일반적으로 다음 순서를 많이 사용한다.

1. SPDX 라이선스 식별자
2. pragma
3. import
4. contract / interface / library 선언
5. 상태 변수
6. 이벤트
7. modifier
8. constructor
9. 함수

예시는 다음과 같다.

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is Ownable {
    uint256 public totalSupply;

    event Mint(address indexed to, uint256 amount);

    modifier onlyPositive(uint256 amount) {
        require(amount > 0, "Must be > 0");
        _;
    }

    constructor() {
        totalSupply = 0;
    }

    function mint(address to, uint256 amount)
        public
        onlyOwner
        onlyPositive(amount)
    {
        totalSupply += amount;
        emit Mint(to, amount);
    }
}
\`\`\`

이 순서가 문법적으로 강제되는 것은 아니지만, 코드를 읽고 리뷰할 때 훨씬 편하다.

---

## 4. SPDX 라이선스 식별자

Solidity 파일은 보통 다음과 같은 주석으로 시작한다.

\`\`\`solidity
// SPDX-License-Identifier: MIT
\`\`\`

이 문자열은 라이선스 정보를 사람이 아니라 **도구와 컴파일러가 읽을 수 있도록 명시하는 식별자**다.  
컴파일러는 이를 바이트코드 메타데이터에 포함시킬 수 있다.

실무에서는 MIT, GPL-3.0, UNLICENSED 등을 자주 본다.

---

## 5. pragma란 무엇인가

\`pragma\`는 Solidity 컴파일러에게 특정 지시를 전달하는 문장이다.  
가장 많이 보는 것은 **버전 pragma**다.

\`\`\`solidity
pragma solidity ^0.8.20;
\`\`\`

이 문장은 "이 파일은 0.8.20 이상, 0.9.0 미만의 컴파일러로 컴파일되어야 한다"는 의미다.

중요한 점은 pragma가 **컴파일러 버전을 바꿔주는 것이 아니라**,  
현재 컴파일러가 요구 조건에 맞는지 검사하게 만든다는 점이다.

### 왜 필요한가?

- 버전마다 문법과 동작이 달라질 수 있다.
- 보안 관련 변경사항이 반영되기도 한다.
- 의도하지 않은 버전에서 컴파일되는 것을 막아준다.

### 자주 보는 버전 표현

\`\`\`solidity
pragma solidity ^0.8.20;
pragma solidity >=0.8.0 <0.9.0;
\`\`\`

\`^0.8.20\`은 흔히 **플로팅 프라그마**라고 부른다.  
패치 버전은 유연하게 허용하면서 메이저 호환성 범위는 제한한다.

---

## 6. import는 무엇을 가져오는가

\`import\`는 다른 Solidity 파일의 코드를 현재 파일에 가져오는 지시어다.

\`\`\`solidity
import "@openzeppelin/contracts/access/Ownable.sol";
\`\`\`

주로 가져오는 대상은 다음과 같다.

- 컨트랙트
- 인터페이스
- 라이브러리

예를 들어 \`IERC20\`, \`Ownable\`, \`ECDSA\` 같은 구성 요소를 불러와 재사용할 수 있다.

---

## 7. ABI란 무엇인가

ABI(Application Binary Interface)는 스마트 컨트랙트와 외부 세계가 데이터를 주고받는 형식을 정의한 표준이다.

EVM은 문자열이나 구조체를 그대로 이해하지 못한다.  
그래서 함수 호출 정보와 인자는 **정해진 규칙에 따라 바이트 배열로 인코딩**되어야 한다.

### ABI 인코더 / 디코더

- ABI 인코더: 사람이 읽는 값을 EVM이 읽는 바이트 형식으로 바꾼다.
- ABI 디코더: 바이트 응답을 사람이 읽는 값으로 해석한다.

### 함수 호출 데이터의 기본 구조

\`\`\`text
[ 4바이트 함수 selector ]
[ 32바이트 인자 1 ]
[ 32바이트 인자 2 ]
...
\`\`\`

예를 들어 \`transfer(address,uint256)\`를 호출할 때:

\`\`\`text
keccak256("transfer(address,uint256)")
-> 앞 4바이트 = 함수 selector
\`\`\`

그리고 인자들은 32바이트 단위로 정렬되어 붙는다.

### 왜 중요한가?

- 함수 호출이 어떻게 이루어지는지 이해할 수 있다.
- \`msg.data\`, selector, low-level call 분석에 도움이 된다.
- 디버깅과 보안 분석의 출발점이 된다.

---

## 8. ABI 인코딩을 예시로 보기

예를 들어 다음 함수를 호출한다고 하자.

\`\`\`solidity
transfer(address,uint256)
\`\`\`

함수 selector는 다음처럼 얻는다.

\`\`\`text
keccak256("transfer(address,uint256)")[:4]
\`\`\`

이후 주소와 수량이 각각 32바이트로 인코딩되어 이어진다.

\`\`\`text
0xa9059cbb
000000000000000000000000ab8483f64d9c6d1ecf9b849ae677dd3315835cb2
00000000000000000000000000000000000000000000000000000000000003e8
\`\`\`

즉, 호출 데이터 맨 앞 4바이트는 항상 **어떤 함수를 부를지 식별하는 selector**이고,  
그 뒤에는 ABI 규칙에 맞는 인자 데이터가 온다.

---

## 9. NatSpec 주석

NatSpec은 Solidity 문서를 위한 표준 형식이다.  
함수나 컨트랙트 바로 위에 다음처럼 작성한다.

\`\`\`solidity
/// @notice 사용자 잔액을 반환합니다.
/// @param user 조회할 주소
/// @return balance 사용자 잔액
function getBalance(address user) external view returns (uint256 balance) {
    return balances[user];
}
\`\`\`

NatSpec을 잘 써두면:

- 개발자용 문서가 정리된다.
- 프론트엔드나 도구에서 설명을 보여주기 좋다.
- 감사와 협업 시 코드 의도를 전달하기 쉽다.

---

## 10. SMTChecker는 무엇을 하는가

SMTChecker는 Solidity 컴파일러에 포함된 **형식 검증 도구**다.  
코드를 실행하지 않고, 가능한 경로를 수학적으로 분석해서 논리적 오류 가능성을 찾으려고 시도한다.

대표적으로 다음과 같은 문제를 확인하는 데 도움을 줄 수 있다.

- \`assert\` 위반 가능성
- 불변 조건 위반
- 특정 분기에서만 발생하는 논리 오류
- 산술 오류 가능성

예를 들어:

\`\`\`solidity
/// @custom:invariant sum <= 100
contract Test {
    uint256 sum;

    function add(uint256 x) public {
        sum += x;
    }
}
\`\`\`

이 경우 검증 도구는 "어떤 입력에서 \`sum <= 100\`이 깨질 수 있는가?"를 탐색한다.

실무에서 SMTChecker 하나로 모든 보안성을 보장할 수는 없지만,  
명백한 논리 위반을 빠르게 찾는 데는 의미가 있다.

---

## 11. Solidity에서 contract란 무엇인가

Solidity에서 \`contract\`는 기본 구성 단위다.  
블록체인에 배포되면 **고유한 주소를 가진 계정처럼 동작하는 프로그램**이 된다.

하나의 컨트랙트는 보통 다음 요소를 가진다.

- 상태 변수
- 함수
- 이벤트
- modifier
- constructor
- struct / enum
- mapping

즉, contract는 "코드 + 상태 + 주소"를 함께 가지는 블록체인 객체라고 이해하면 편하다.

---

## 마무리

이번 글에서는 Solidity를 공부할 때 가장 먼저 잡아야 하는 기반 개념을 정리했다.

- Solidity 코드는 직접 실행되지 않고 EVM 바이트코드로 변환된다.
- pragma와 import는 파일 수준의 중요한 지시어다.
- ABI는 함수 호출과 데이터 교환의 핵심 규칙이다.
- NatSpec과 SMTChecker는 문서화와 검증 측면에서 의미가 있다.

다음 글에서는 상태 변수, 가시성, struct, enum, 정적 타입 시스템 같은 Solidity의 타입과 데이터 모델을 이어서 정리해보겠다.
`,$2=`---
id: "solidity-concepts-2"
title: "Solidity 개념 정리 2: 상태 변수, 타입 시스템, 매핑과 배열"
description: "상태 변수 가시성, constant와 immutable, struct, enum, 값 타입과 참조 타입, 배열 슬라이스와 매핑까지 Solidity의 데이터 모델을 정리합니다."
date: "2026-04-04 19:20"
category: "study-dev-security"
tags: ["Solidity", "Storage", "Struct", "Mapping", "Type System"]
published: true
---

# Solidity 개념 정리 2: 상태 변수, 타입 시스템, 매핑과 배열

이번 글에서는 Solidity의 데이터 모델을 중심으로 정리한다.  
상태 변수의 가시성, \`constant\`와 \`immutable\`, \`struct\`, \`enum\`, 값 타입과 참조 타입, 매핑과 배열 슬라이스까지 한 번에 묶어서 보는 글이다.

---

## 1. 상태 변수의 가시성 지정자

상태 변수에는 \`public\`, \`internal\`, \`private\` 같은 가시성을 붙일 수 있다.

### public

\`\`\`solidity
uint256 public totalSupply;
\`\`\`

- 외부에서 읽을 수 있다.
- 자동 getter 함수가 생성된다.
- 컨트랙트 내부에서도 접근 가능하다.

즉 \`public\`은 "그 변수 값을 반환하는 읽기 인터페이스가 자동으로 생긴다"는 의미다.

### internal

- 현재 컨트랙트와 상속받은 컨트랙트 내부에서만 접근 가능하다.
- 외부 인터페이스에는 노출되지 않는다.

### private

- 해당 변수가 정의된 컨트랙트 내부에서만 접근 가능하다.
- 상속받은 컨트랙트도 직접 접근할 수 없다.

하지만 여기서 자주 생기는 오해가 있다.

### private는 진짜 비밀이 아니다

\`private\`은 **Solidity 코드 레벨에서의 접근 제한**일 뿐이다.  
블록체인에 저장된 값 자체가 암호화되는 것은 아니다.

즉:

- 다른 컨트랙트에서 \`a.secret\`처럼 직접 접근은 못 한다.
- 하지만 스토리지 슬롯을 안다면 노드, RPC, 도구로 값을 읽을 수 있다.

그래서 \`private\`은 "외부인이 절대 모른다"가 아니라  
"다른 Solidity 코드가 직접 참조하지 못한다" 정도로 이해해야 한다.

---

## 2. constant와 immutable

Solidity에서는 변경 불가능한 값을 두 가지 방식으로 선언할 수 있다.

| 구분 | \`constant\` | \`immutable\` |
|------|------------|-------------|
| 설정 시점 | 컴파일 타임 | 배포 시점 |
| 변경 가능성 | 절대 불가 | 생성자에서 한 번만 가능 |
| 저장 방식 | 코드에 직접 포함 | 배포 시 값이 코드에 반영 |
| 대표 사용처 | 수학 상수, 비율, 단위 | 배포자 주소, 초기 설정값 |

### constant

\`\`\`solidity
uint256 constant MAX_SUPPLY = 1_000_000 ether;
\`\`\`

- 선언과 동시에 값을 정해야 한다.
- 컴파일러가 값 자체를 코드에 직접 넣는다.
- \`msg.sender\`, \`block.timestamp\` 같은 런타임 값은 사용할 수 없다.

### immutable

\`\`\`solidity
address immutable owner;

constructor() {
    owner = msg.sender;
}
\`\`\`

- 생성자에서 한 번만 설정 가능하다.
- 배포 시점의 동적 정보 반영이 가능하다.
- 이후에는 절대 바꿀 수 없다.

둘 다 storage slot에 일반 상태 변수처럼 저장되는 개념과는 다르다.  
다만 둘 다 완전한 비밀은 아니고, 바이트코드 분석으로 값이 드러날 수 있다.

---

## 3. struct: 여러 값을 하나로 묶는 타입

\`struct\`는 서로 다른 타입의 데이터를 하나의 논리적 묶음으로 다루게 해준다.

\`\`\`solidity
struct User {
    address wallet;
    uint256 balance;
    string name;
}
\`\`\`

이런 구조는 사용자 프로필, 주문 정보, 포지션 상태처럼 여러 값을 함께 다룰 때 유용하다.

### 사용 예시

\`\`\`solidity
contract Example {
    struct User {
        address wallet;
        uint256 balance;
        string name;
    }

    User public user;

    function setUser(
        address _wallet,
        uint256 _balance,
        string memory _name
    ) public {
        user = User(_wallet, _balance, _name);
    }
}
\`\`\`

### struct의 특징

- 다른 struct를 포함할 수 있다.
- 배열, 매핑, 함수 파라미터 등에도 사용할 수 있다.
- 실제 변수로 사용할 때는 \`storage\`, \`memory\`, \`calldata\`를 명시해야 하는 경우가 많다.

---

## 4. enum: 제한된 상태 집합을 표현하는 타입

\`enum\`은 서로 관련된 상태를 이름으로 묶어 표현하는 타입이다.

\`\`\`solidity
enum Status {
    Pending,
    Active,
    Closed
}
\`\`\`

내부적으로는 0부터 시작하는 정수처럼 표현되지만,  
코드에서는 숫자보다 훨씬 읽기 쉬운 상태 이름으로 다룰 수 있다.

\`\`\`solidity
Status public status = Status.Pending;
\`\`\`

### enum을 쓰는 이유

- 상태 표현이 명확해진다.
- 의미 없는 매직 넘버를 줄일 수 있다.
- 코드 리뷰와 감사 시 읽기 쉽다.

### 주의할 점

- enum 값은 명시적 형변환 없이 일반 정수와 바로 섞어 쓰지 않는다.
- 잘못된 정수 값을 enum으로 변환하면 런타임 오류가 날 수 있다.

---

## 5. 정적 타입 시스템과 Solidity 실행 관점

Solidity는 정적 타입 언어이기 때문에:

- 컴파일 시점에 타입이 확정된다.
- 타입 불일치가 실행 전에 걸러진다.
- 컴파일러가 최적화를 수행하기 쉽다.

예를 들어:

\`\`\`solidity
uint256 public count;

function setCount(uint256 newCount) external {
    count = newCount;
}
\`\`\`

여기서 \`count = "hello"\` 같은 코드는 실행조차 되지 않는다.  
이런 성질은 자산을 직접 다루는 언어에서 특히 중요하다.

---

## 6. 값 타입과 참조 타입

Solidity의 타입은 크게 **값 타입**과 **참조 타입**으로 나뉜다.

### 값 타입

복사되어 전달되는 타입이다.

- \`bool\`
- \`int\`, \`uint\`
- \`address\`
- 고정 크기 \`bytes\`
- \`enum\`

### 참조 타입

배열, 구조체처럼 실제 데이터 영역을 참조하는 타입이다.

- \`array\`
- \`bytes\`
- \`string\`
- \`struct\`
- \`mapping\`

참조 타입은 어느 데이터 영역에 놓이느냐가 중요하다.

- \`storage\`: 영구 저장
- \`memory\`: 함수 실행 중 임시 저장
- \`calldata\`: 외부 호출 데이터, 읽기 전용

---

## 7. 기본값(Default Values)

Solidity에서 선언된 변수는 자동으로 0 기반 기본값을 가진다.

예를 들면:

- \`bool\` -> \`false\`
- \`uint\` / \`int\` -> \`0\`
- \`address\` -> \`address(0)\`
- \`string\` -> \`""\`
- 동적 배열 -> 빈 배열
- enum -> 첫 번째 멤버

초기화하지 않은 상태 변수를 읽었는데 값이 나오는 이유가 바로 이것이다.

---

## 8. 범위(Scope)

블록 내부에서 선언된 변수는 그 블록 안에서만 유효하다.

\`\`\`solidity
function example() external pure returns (uint256) {
    uint256 x = 10;

    if (x > 0) {
        uint256 y = 20;
        return x + y;
    }

    return x;
}
\`\`\`

여기서 \`y\`는 \`if\` 블록 밖에서 접근할 수 없다.

반면 상태 변수, 함수, contract 선언 같은 최상위 선언은 코드 블록 바깥에 있기 때문에 더 넓은 범위를 가진다.

---

## 9. bool과 단락 평가(short-circuit)

Solidity의 \`&&\`, \`||\`는 단락 평가를 한다.

예를 들어:

\`\`\`solidity
if (isAdmin || expensiveCheck()) {
    // ...
}
\`\`\`

여기서 \`isAdmin\`이 이미 \`true\`라면 \`expensiveCheck()\`는 실행되지 않는다.

이 말은 곧:

- 불필요한 외부 호출을 줄일 수 있고
- 가스를 절약할 수 있으며
- 부작용이 있는 함수의 실행을 막을 수 있다는 뜻이다

즉, 단락 평가는 단순한 문법 편의가 아니라 실행 흐름에 직접 영향을 준다.

---

## 10. 배열 슬라이스(Array Slices)

배열 슬라이스는 배열의 연속된 일부를 바라보는 뷰다.

\`\`\`solidity
function sliceExample(bytes calldata data) external pure {
    bytes calldata a = data[0:4];
    bytes calldata b = data[4:];
}
\`\`\`

### 핵심 규칙

- \`start\`는 포함
- \`end\`는 미포함
- \`x[start:end]\` 형태

### 중요한 제약

- calldata 배열에서만 사용된다.
- 일반적인 별도 타입 이름을 갖는 것은 아니다.
- 보통 ABI 디코딩 전처리 등에 유용하다.

예를 들어:

\`\`\`solidity
function decode(bytes calldata data)
    external
    pure
    returns (uint256)
{
    return abi.decode(data[:32], (uint256));
}
\`\`\`

---

## 11. 매핑(Mapping)

매핑은 키-값 쌍을 저장하는 자료구조다.

\`\`\`solidity
mapping(address => uint256) public balances;
\`\`\`

### 특징

- 존재하지 않는 키를 읽으면 기본값이 나온다.
- 순회(iteration)가 불가능하다.
- storage에서만 의미 있게 사용된다.
- 키 목록이 필요하면 별도 배열로 추적해야 한다.

### 왜 반복이 안 되는가?

매핑은 내부적으로 "키를 해시한 스토리지 위치"를 이용하는 구조라서  
"들어 있는 모든 키를 나열한다"는 개념이 기본적으로 없다.

그래서 아래처럼 보조 배열을 함께 쓰는 패턴이 자주 나온다.

\`\`\`solidity
mapping(address => uint256) public balances;
address[] public users;
\`\`\`

---

## 12. delete 연산자

\`delete\`는 값을 "없애는" 것이 아니라 **해당 타입의 기본값으로 되돌리는 연산**이다.

예를 들면:

\`\`\`solidity
uint256 x = 42;
delete x; // x = 0
\`\`\`

### 배열에서의 동작

- 동적 배열 전체에 \`delete\` -> 빈 배열
- 고정 배열 전체에 \`delete\` -> 각 요소가 기본값
- 특정 요소에 \`delete\` -> 그 요소만 기본값, 길이는 유지

### 매핑에서의 동작

\`\`\`solidity
delete balances[msg.sender];
\`\`\`

이렇게 특정 키의 값을 초기화할 수 있다.  
하지만 매핑 전체를 한 번에 지우는 개념은 없다.

### struct와 mapping의 조합에서 주의

struct 안에 mapping이 있을 때 \`delete structVar\`를 해도  
mapping 내부 키들이 "순회되어 모두 삭제"되는 것은 아니다.  
매핑은 기본적으로 전체 열거가 불가능하기 때문이다.

---

## 13. 암시적 변환과 명시적 변환

### 암시적 변환

컴파일러가 안전하다고 판단한 경우 자동 변환한다.

\`\`\`solidity
uint8 a = 100;
uint16 b = a; // OK
\`\`\`

### 명시적 변환

개발자가 직접 형변환을 써서 강제한다.

\`\`\`solidity
uint256 large = 300;
uint8 small = uint8(large); // 44
\`\`\`

이 경우 상위 비트가 잘려나가므로 주의가 필요하다.

### 왜 위험한가?

- 범위를 벗어나면 값이 잘릴 수 있다.
- signed / unsigned 전환은 예상과 다른 결과를 만들 수 있다.
- bytes 타입 변환도 왼쪽/오른쪽 잘림과 패딩 규칙을 알아야 한다.

형변환은 "문법이 통과했으니 안전하다"가 아니라  
"내가 비트 수준 결과를 이해하고 있다"가 중요하다.

---

## 14. 리터럴과 타입 간의 관계

숫자 리터럴이나 문자열 리터럴은 타입 문맥에 따라 변환된다.

예를 들어:

\`\`\`solidity
uint8 a = 255; // OK
// uint8 b = 256; // 컴파일 에러
\`\`\`

문자열 리터럴을 고정 크기 bytes에 넣을 때도 길이가 중요하다.

\`\`\`solidity
bytes4 tag = "ABCD";
\`\`\`

리터럴은 편리하지만, 타입 크기와 정확히 맞는지 항상 확인하는 습관이 필요하다.

---

## 마무리

이번 글에서는 Solidity의 데이터 모델을 중심으로 정리했다.

- \`public\`, \`internal\`, \`private\`은 코드 레벨 접근 제어다.
- \`constant\`와 \`immutable\`은 둘 다 불변이지만 설정 시점이 다르다.
- \`struct\`, \`enum\`, \`mapping\`은 상태 모델링의 핵심 도구다.
- 값 타입과 참조 타입은 저장 위치와 복사 방식에서 차이가 난다.
- \`delete\`, 형변환, 슬라이스 같은 세부 규칙은 버그와 감사 포인트가 되기 쉽다.

다음 글에서는 함수, modifier, 가시성, calldata/memory/storage, receive/fallback, 예외 처리 같은 실행 흐름 쪽 개념을 정리해보겠다.
`,ev=`---
id: "solidity-concepts-3"
title: "Solidity 개념 정리 3: 함수, 가시성, 메모리 모델, 예외 처리"
description: "함수 정의, modifier, 함수 가시성, calldata-memory-storage, receive/fallback, ABI encode/decode, require/assert/revert까지 실행 관점에서 정리합니다."
date: "2026-04-04 19:30"
category: "study-dev-security"
tags: ["Solidity", "Function", "Calldata", "Fallback", "Exception"]
published: true
---

# Solidity 개념 정리 3: 함수, 가시성, 메모리 모델, 예외 처리

이번 글에서는 Solidity가 실제로 어떻게 호출되고 실행되는지를 중심으로 정리한다.  
함수와 modifier, 함수 가시성, \`calldata / memory / storage\`, \`receive / fallback\`, ABI 인코딩, 예외 처리까지 런타임 관점에서 연결해보자.

---

## 1. 함수의 기본 개념

Solidity에서 함수는 컨트랙트 내부의 실행 가능한 코드 블록이다.  
상태를 읽거나 수정하고, 값을 반환할 수 있다.

\`\`\`solidity
function getSum(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;
}
\`\`\`

함수는 보통 컨트랙트 안에 정의하지만, 라이브러리나 free function 형태로도 존재할 수 있다.

---

## 2. 매개변수와 반환값

매개변수는 함수 내부에서 지역 변수처럼 사용된다.

\`\`\`solidity
function add(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;
}
\`\`\`

반환 방식은 두 가지를 자주 본다.

### 이름 있는 반환값

\`\`\`solidity
function add(uint256 a, uint256 b)
    public
    pure
    returns (uint256 sum)
{
    sum = a + b;
}
\`\`\`

### 이름 없는 반환값

\`\`\`solidity
function add(uint256 a, uint256 b)
    public
    pure
    returns (uint256)
{
    return a + b;
}
\`\`\`

또한 Solidity는 복수 반환도 지원한다.

\`\`\`solidity
function info() public pure returns (uint256, bool) {
    return (42, true);
}
\`\`\`

---

## 3. modifier는 함수에 로직을 씌우는 장치

modifier는 함수 실행 전후에 공통 로직을 삽입하거나, 아예 실행을 막는 데 사용한다.

\`\`\`solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}
\`\`\`

여기서 \`_\`는 "원래 함수 본문이 들어갈 위치"다.

\`\`\`solidity
function changeOwner(address newOwner) public onlyOwner {
    owner = newOwner;
}
\`\`\`

이 함수는 실제로 \`onlyOwner\`의 \`require\`를 먼저 통과한 뒤 본문이 실행된다.

### modifier의 대표 용도

- 접근 제어
- 사전 조건 검증
- pause 여부 확인
- 재진입 방지

---

## 4. 함수 가시성 지정자

Solidity 함수의 가시성은 \`public\`, \`external\`, \`internal\`, \`private\` 네 가지가 핵심이다.

| 가시성 | 외부 호출 | 내부 직접 호출 | 상속 컨트랙트 |
|--------|-----------|----------------|---------------|
| \`public\` | 가능 | 가능 | 가능 |
| \`external\` | 가능 | 직접은 불가 | 가능 |
| \`internal\` | 불가 | 가능 | 가능 |
| \`private\` | 불가 | 가능 | 불가 |

### public

- 내부와 외부 모두에서 쓸 수 있다.
- ABI에 포함된다.

### external

- 외부 호출 전용으로 설계된다.
- 내부에서 \`f()\`처럼 직접 부를 수는 없고 \`this.f()\`처럼 외부 호출 방식으로만 가능하다.

이 차이는 단순 문법 차이가 아니라 실제 실행 방식 차이다.

- \`f()\` -> 내부 점프
- \`this.f()\` -> 외부 CALL

따라서 \`external\`은 특히 큰 calldata를 받는 진입 함수에서 자주 사용된다.

### internal / private

- 둘 다 ABI에 포함되지 않는다.
- 즉 외부에서 selector 기반으로 직접 호출할 수 없다.
- 다만 컴파일된 코드 내부에는 구현이 존재한다.

---

## 5. calldata, memory, storage

이 세 개는 Solidity를 공부할 때 가장 헷갈리지만, 가장 중요하다.

| 구분 | 지속성 | 수정 가능 | 대표 용도 |
|------|--------|-----------|-----------|
| \`calldata\` | 호출 중 임시 | 읽기 전용 | 외부 함수 입력 |
| \`memory\` | 호출 중 임시 | 가능 | 함수 내부 계산 |
| \`storage\` | 영구 | 가능 | 상태 변수 |

### calldata

- 외부 호출 데이터가 담기는 영역이다.
- 읽기 전용이다.
- 복사 비용이 없어서 효율적이다.

\`\`\`solidity
function setData(uint256[] calldata input) external {
    uint256 first = input[0];
}
\`\`\`

### memory

- 함수 실행 중 사용하는 임시 메모리다.
- 수정 가능하지만 함수가 끝나면 사라진다.

\`\`\`solidity
function copyData(uint256[] memory input) public pure returns (uint256) {
    input[0] = 100;
    return input[0];
}
\`\`\`

### storage

- 블록체인에 영구 저장된다.
- 가장 비싸고, 가장 신중하게 다뤄야 한다.

\`\`\`solidity
uint256[] public data;
\`\`\`

---

## 6. 왜 external + calldata가 가스에 유리한가

외부 함수가 큰 배열이나 문자열을 받을 때 \`calldata\`를 직접 참조하면,  
\`memory\`로 복사하는 비용을 줄일 수 있다.

\`\`\`solidity
function foo(uint256[] calldata input) external {
    uint256 x = input[0];
}
\`\`\`

반면 \`public\` 함수의 참조형 파라미터는 내부 사용 과정에서 메모리 복사가 개입하기 쉽다.  
이 때문에 외부 진입점에서는 \`external\` + \`calldata\` 조합이 자주 보인다.

---

## 7. 메모리와 calldata를 저수준으로 보면

### calldata 기본 구조

함수 호출 데이터는 보통 이렇게 생긴다.

\`\`\`text
[ 4바이트 selector ][ 인자 1 ][ 인자 2 ] ...
\`\`\`

예:

\`\`\`text
foo(uint256 x, uint256 y)
\`\`\`

이때:

- \`msg.data[0:4]\` -> selector
- 그 뒤 32바이트 단위 -> 인자

### 관련 opcode

- \`calldataload(offset)\` -> calldata 읽기
- \`mload(offset)\` -> memory 읽기
- \`mstore(offset, value)\` -> memory 쓰기
- \`sload(slot)\` -> storage 읽기
- \`sstore(slot, value)\` -> storage 쓰기

이걸 이해하면 ABI, 함수 selector, low-level 디버깅이 훨씬 선명해진다.

---

## 8. receive와 fallback

Solidity에는 일반 함수와 달리 특별한 두 함수가 있다.

### receive

\`\`\`solidity
receive() external payable {
    emit Received(msg.sender, msg.value);
}
\`\`\`

특징:

- 이름이 없다.
- \`external payable\`만 가능하다.
- 빈 calldata로 Ether를 받을 때 실행된다.

### fallback

\`\`\`solidity
fallback() external payable {
    emit FallbackCalled(msg.sender, msg.data);
}
\`\`\`

특징:

- 존재하지 않는 함수 호출 처리에 사용된다.
- 데이터가 있는데 일치하는 함수가 없을 때 실행된다.
- 필요하면 \`payable\`로 Ether도 받을 수 있다.

### 실행 우선순위

대략 다음처럼 이해하면 된다.

1. calldata가 비어 있나?
2. 비어 있으면 \`receive\` 확인
3. 아니면 selector 일치 함수 확인
4. 없으면 \`fallback\` 확인
5. 둘 다 없으면 revert

---

## 9. 강제 Ether 수신과 balance 의존성

중요한 점 하나는 **컨트랙트가 원하지 않아도 Ether를 받을 수 있다**는 것이다.

대표적으로:

- \`selfdestruct\`의 대상
- 프로토콜 레벨 강제 잔액 이동

이 경우:

- \`receive()\`가 실행되지 않을 수 있다.
- 내부 카운터와 \`address(this).balance\`가 어긋날 수 있다.

따라서 아래처럼 "내가 기록한 입금 합계 == 실제 잔액"에 강하게 의존하는 로직은 조심해야 한다.

\`\`\`solidity
require(address(this).balance == accountedBalance, "Mismatch");
\`\`\`

실무에서는 "알려진 잔액"과 "예상치 못한 잔액"을 분리해 생각하는 편이 안전하다.

---

## 10. ABI encode / decode

Solidity는 ABI 인코딩/디코딩 함수들을 제공한다.

### encode

\`\`\`solidity
bytes memory data = abi.encode(123, "hello", true);
\`\`\`

표준 ABI 규칙대로 32바이트 단위 정렬을 사용한다.

### encodePacked

\`\`\`solidity
bytes memory packed = abi.encodePacked("ab", "cd");
\`\`\`

압축 인코딩이지만, 동적 타입과 섞이면 모호성이 생길 수 있다.  
해시 입력으로 쓸 때는 충돌 가능성을 꼭 생각해야 한다.

### encodeWithSelector / encodeWithSignature

\`\`\`solidity
abi.encodeWithSignature("transfer(address,uint256)", to, amount);
\`\`\`

low-level call 데이터를 만들 때 자주 쓴다.

### decode

\`\`\`solidity
(uint256 amount, address to) = abi.decode(data, (uint256, address));
\`\`\`

인코딩과 디코딩은 selector, calldata, low-level call 분석과 직접 연결된다.

---

## 11. 블록 / 트랜잭션 전역 변수

Solidity에서는 실행 환경 정보를 다음 전역 변수들로 읽을 수 있다.

### block

- \`block.number\`
- \`block.timestamp\`
- \`block.chainid\`
- \`block.coinbase\`
- \`block.gaslimit\`

### msg

- \`msg.sender\`
- \`msg.value\`
- \`msg.data\`
- \`msg.sig\`

### tx

- \`tx.gasprice\`
- \`tx.origin\`

특히 \`msg.sender\`와 \`tx.origin\`을 혼동하면 보안 문제가 생길 수 있다.  
실무에서는 권한 확인에 \`tx.origin\`을 쓰지 않는 것이 일반적이다.

또한 \`block.timestamp\`, \`blockhash\` 등은 완전한 무작위성 원천으로 쓰면 안 된다.

---

## 12. 예외 처리: require, assert, revert

### require

입력 검증, 외부 조건 검사에 사용한다.

\`\`\`solidity
require(amount > 0, "Amount must be positive");
\`\`\`

### assert

절대 깨지면 안 되는 내부 불변식 확인에 쓴다.

\`\`\`solidity
assert(totalSupply >= balance);
\`\`\`

### revert

직접 실행을 중단하고 싶을 때 사용한다.

\`\`\`solidity
revert("Transfer failed");
\`\`\`

실무 감각으로 보면:

- 사용자 입력 검증 -> \`require\`
- 내부 논리 오류 검출 -> \`assert\`
- 명시적 중단 -> \`revert\`

---

## 13. 예외는 어떻게 전파되는가

일반 함수 호출에서 하위 호출이 revert되면 예외는 상위 호출로 전파된다.  
하지만 저수준 함수는 다르다.

\`\`\`solidity
(bool success, bytes memory data) = addr.call(payload);
\`\`\`

이 경우 실패해도 자동으로 예외가 버블업되지 않고:

- \`success == false\`
- \`data\`에 revert 데이터가 들어올 수 있다

즉, low-level call은 반드시 직접 검사해야 한다.

\`\`\`solidity
require(success, "Low-level call failed");
\`\`\`

또한 코드가 없는 주소를 call해도 EVM 설계상 성공으로 보일 수 있으므로,  
호출 대상 검증이 필요할 때는 추가 체크가 필요하다.

---

## 14. try / catch

외부 함수 호출이나 컨트랙트 생성에서 예외를 잡고 싶다면 \`try/catch\`를 사용한다.

\`\`\`solidity
try other.someFunction() returns (uint256 result) {
    // 성공
} catch Error(string memory reason) {
    // require/revert(string)
} catch Panic(uint256 code) {
    // assert, 산술 오류 등
} catch {
    // 기타 예외
}
\`\`\`

주의할 점은 \`try/catch\`가 **외부 호출에만 적용**된다는 것이다.  
내부 표현식에서 나는 오류를 전부 잡는 범용 예외 문법은 아니다.

---

## 15. 컴파일 타임과 런타임

Solidity 실행을 이해하려면 컴파일 타임과 런타임을 분리해서 보는 것이 좋다.

### 컴파일 타임

- 문법 검사
- 타입 검사
- 최적화
- 바이트코드 생성
- ABI 생성

### 런타임

- selector 매칭
- calldata 디코딩
- opcode 실행
- gas 차감
- storage 변경
- 이벤트 생성
- 반환값 인코딩

즉, 정적 타입은 컴파일 타임의 안정성을 주고,  
EVM은 런타임에 실제 상태 변경과 가스 계산을 담당한다.

---

## 마무리

이번 글에서는 Solidity의 "실행되는 쪽" 개념을 정리했다.

- 함수와 modifier는 실행 흐름을 조직하는 핵심 도구다.
- 함수 가시성은 ABI 노출과 내부 호출 방식에 직접 연결된다.
- \`calldata\`, \`memory\`, \`storage\`는 가스와 보안의 핵심이다.
- \`receive\`와 \`fallback\`은 Ether 수신과 알 수 없는 호출 처리에 중요하다.
- \`require\`, \`assert\`, \`revert\`, \`try/catch\`는 예외 모델을 구성한다.

다음 글에서는 이벤트, LOG opcode, Ether/시간 단위, 해시/서명, \`selfdestruct\`, 스타일 가이드처럼 실전에서 자주 맞닥뜨리는 개념들을 묶어 정리해보겠다.
`,nv=`---
id: "solidity-concepts-4"
title: "Solidity 개념 정리 4: 이벤트, 해시, selfdestruct, 스타일 가이드"
description: "이벤트와 LOG opcode, Ether와 시간 단위, 암호화 함수, selfdestruct 변화, type() 키워드, 제어 구조와 스타일 가이드까지 실전 중심으로 정리합니다."
date: "2026-04-04 19:40"
category: "study-dev-security"
tags: ["Solidity", "Event", "LOG", "ECDSA", "selfdestruct"]
published: true
---

# Solidity 개념 정리 4: 이벤트, 해시, selfdestruct, 스타일 가이드

이번 글은 Solidity를 공부하면서 실무에서 자주 다시 찾게 되는 주제들을 모아 정리한 글이다.  
이벤트와 EVM 로그, Ether/시간 단위, 해시와 서명, \`selfdestruct\`, \`type()\` 키워드, 제어 구조, 그리고 스타일 가이드까지 이어서 살펴본다.

---

## 1. 이벤트(Event)는 상태가 아니라 로그다

이벤트는 Solidity가 제공하는 EVM 로그 기능의 추상화다.  
\`emit\` 키워드로 트랜잭션 로그에 기록된다.

\`\`\`solidity
event Deposit(address indexed user, uint256 amount);

function deposit() external payable {
    emit Deposit(msg.sender, msg.value);
}
\`\`\`

### 이벤트의 특징

- 블록체인 로그에 기록된다.
- 컨트랙트 내부 상태처럼 읽을 수 있는 값은 아니다.
- 외부 애플리케이션이 구독하고 검색하기 좋다.
- storage에 쓰는 것보다 훨씬 저렴한 편이다.

즉, 이벤트는 "상태 저장"이 아니라 **외부 세계에 알리는 기록**으로 이해하는 것이 맞다.

---

## 2. indexed와 topic

이벤트 파라미터에 \`indexed\`를 붙이면 topic 영역에 저장되어 필터링이 쉬워진다.

\`\`\`solidity
event Transfer(address indexed from, address indexed to, uint256 value);
\`\`\`

이 경우:

- \`from\`, \`to\` -> topic
- \`value\` -> data

로그는 대략 다음 구조를 가진다.

\`\`\`text
address: 컨트랙트 주소
topics:
  [0] 이벤트 시그니처 해시
  [1] indexed 인자 1
  [2] indexed 인자 2
data:
  non-indexed 인자들의 ABI 인코딩
\`\`\`

이벤트 검색 속도가 중요한 이유가 바로 여기에 있다.

---

## 3. 이벤트는 왜 SLOAD로 읽을 수 없는가

이벤트는 EVM의 **storage**에 저장되는 것이 아니라 **log 영역**에 남는다.  
그래서 \`SLOAD\`로 읽을 수 없다.

정리하면:

- 상태 변수 -> storage -> \`SLOAD\`, \`SSTORE\`
- 이벤트 -> logs -> \`LOG0 ~ LOG4\`

즉, 이벤트는 EVM 내부에서 다시 참조할 수 있는 상태가 아니라  
트랜잭션 결과에 붙는 외부 관찰용 기록이다.

이 때문에 컨트랙트 내부에서 "예전에 emit한 이벤트를 읽어와라" 같은 작업은 불가능하다.

---

## 4. LOG0 ~ LOG4는 무엇인가

EVM은 이벤트를 처리할 때 \`LOG0\`부터 \`LOG4\`까지의 opcode를 사용한다.

| Opcode | 의미 |
|--------|------|
| \`LOG0\` | topic 없음 |
| \`LOG1\` | topic 1개 |
| \`LOG2\` | topic 2개 |
| \`LOG3\` | topic 3개 |
| \`LOG4\` | topic 4개 |

예를 들어:

\`\`\`solidity
event MyEvent(address indexed from, uint256 amount);
\`\`\`

이 이벤트는 대개:

- 이벤트 시그니처 해시
- \`from\`

두 개의 topic을 사용하므로 \`LOG2\` 형태로 생각할 수 있다.

실무에서 opcode까지 내려가 보는 이유는:

- 이벤트 가스 계산을 이해하기 위해
- 디버깅과 트레이싱을 위해
- 바이트코드 레벨 동작을 확인하기 위해서다

---

## 5. Ether 단위

Solidity는 Ether 단위를 읽기 쉽게 쓰도록 접미사를 제공한다.

\`\`\`solidity
1 wei
1 gwei
1 ether
\`\`\`

예를 들어:

\`\`\`solidity
uint256 minimum = 0.1 ether;
uint256 gasPrice = 20 gwei;
\`\`\`

이런 표현은 숫자를 직접 쓰는 것보다 훨씬 안전하고 읽기 쉽다.

### 주의할 점

Solidity는 부동소수점을 지원하지 않는다.  
그래서 \`0.5 ether\`가 아니라 정수 연산으로 표현해야 하는 경우가 있다.

\`\`\`solidity
uint256 half = 1 ether / 2;
\`\`\`

---

## 6. 시간 단위

시간 관련 접미사도 제공한다.

\`\`\`solidity
1 minutes
1 hours
1 days
1 weeks
\`\`\`

예:

\`\`\`solidity
uint256 unlockTime = block.timestamp + 7 days;
\`\`\`

다만 이것은 어디까지나 초 단위 계산을 쉽게 하는 문법이다.  
달력 계산 자체를 정확하게 처리해주는 것은 아니다.

따라서:

- 윤년
- 월 길이 차이
- 정교한 캘린더 계산

같은 것은 별도 로직이나 외부 시스템에 맡기는 편이 낫다.

---

## 7. 블록 / 메시지 / 트랜잭션 속성

Solidity는 현재 실행 환경을 읽는 전역 변수를 제공한다.

### block

- \`block.number\`
- \`block.timestamp\`
- \`block.chainid\`
- \`block.coinbase\`
- \`block.gaslimit\`

### msg

- \`msg.sender\`
- \`msg.value\`
- \`msg.data\`
- \`msg.sig\`

### tx

- \`tx.gasprice\`
- \`tx.origin\`

### 보안적으로 중요한 포인트

- \`msg.sender\`는 외부 호출이 한 단계 들어갈 때마다 바뀔 수 있다.
- \`tx.origin\`은 권한 검증 기준으로 쓰지 않는 것이 일반적이다.
- \`block.timestamp\`, \`blockhash\` 기반 무작위성은 조작 가능성을 항상 고려해야 한다.

---

## 8. 해시 함수와 암호학 함수

Solidity는 여러 내장 해시 함수를 제공한다.

\`\`\`solidity
keccak256(...)
sha256(...)
ripemd160(...)
\`\`\`

이더리움에서 가장 많이 보는 것은 \`keccak256\`이다.

\`\`\`solidity
bytes32 hash = keccak256(abi.encodePacked(user, amount));
\`\`\`

또한 모듈러 연산 함수도 제공한다.

\`\`\`solidity
addmod(a, b, m);
mulmod(a, b, m);
\`\`\`

이 함수들은 단순 산술보다 overflow 처리 측면에서 의미가 있다.

---

## 9. ecrecover와 서명 검증

서명 검증에는 \`ecrecover\`를 사용할 수 있다.

\`\`\`solidity
function recoverSigner(
    bytes32 hash,
    uint8 v,
    bytes32 r,
    bytes32 s
) public pure returns (address) {
    return ecrecover(hash, v, r, s);
}
\`\`\`

다만 실무에서는 OpenZeppelin의 \`ECDSA\` 라이브러리를 더 자주 쓴다.

이유는:

- 서명 가변성 문제를 더 안전하게 처리할 수 있고
- 실패 시 반환값 검증을 명확히 할 수 있기 때문이다

서명 검증은 "함수는 짧아 보여도 보안적으로는 민감한 부분"이라는 점을 항상 기억해야 한다.

---

## 10. selfdestruct는 이제 예전처럼 생각하면 안 된다

예전에는 \`selfdestruct\`가 컨트랙트를 사실상 제거하는 명령처럼 여겨졌다.

\`\`\`solidity
selfdestruct(payable(beneficiary));
\`\`\`

이 명령은:

- 컨트랙트 잔액을 특정 주소로 보낸다.
- 수신자의 \`receive()\`를 호출하지 않는다.

하지만 최근 이더리움 업그레이드 이후에는  
**예전처럼 일반적인 "컨트랙트 삭제" 도구로 이해하면 안 된다.**

### 중요한 변화

Cancun 이후(EIP-6780)에는 \`selfdestruct\`의 의미가 크게 제한되었다.

- 기존 컨트랙트를 과거처럼 자유롭게 지우는 용도로 기대하면 안 된다.
- 설계상 "삭제"보다 잔액 이동 측면만 보는 편이 안전하다.
- CREATE2 + selfdestruct 재배포 같은 오래된 패턴도 더 이상 예전과 같은 가정으로 보면 안 된다.

즉, 지금은 \`selfdestruct\`를 "언젠가 컨트랙트를 깔끔히 없애는 기능"으로 설계에 넣기보다  
최신 체인 동작을 기준으로 매우 보수적으로 다뤄야 한다.

---

## 11. type() 키워드

\`type(X)\`는 타입 정보에 접근할 때 사용한다.

예를 들면:

\`\`\`solidity
type(uint256).max
type(uint256).min
\`\`\`

정수 타입의 범위를 가져오거나, 인터페이스 ID, 계약 이름, 바이트코드 정보를 읽는 데 쓸 수 있다.

대표 예시는 다음과 같다.

\`\`\`solidity
uint256 maxValue = type(uint256).max;
\`\`\`

이 키워드는 메타 정보가 필요할 때 꽤 유용하다.

---

## 12. 제어 구조와 Solidity 스타일

Solidity는 \`if\`, \`for\`, \`while\`, \`do-while\`, \`break\`, \`continue\`, \`return\` 같은 일반적인 제어문을 지원한다.

다만 C와 다른 점도 있다.

- \`if (1)\` 같은 숫자 조건은 허용되지 않는다.
- 암시적 bool 변환을 기대하면 안 된다.
- 조건은 명시적으로 \`bool\`이어야 한다.

예:

\`\`\`solidity
if (count > 0) {
    // ...
}
\`\`\`

---

## 13. 스타일 가이드는 왜 중요한가

스타일 가이드는 문법은 아니지만, 실무에서는 꽤 중요하다.

대표 규칙은 다음과 같다.

- 공백 4칸 들여쓰기
- import는 파일 상단
- 함수 순서는 생성자 -> receive -> fallback -> external -> public -> internal -> private
- contract / struct / event는 \`CapWords\`
- 함수 / 변수 / modifier는 \`mixedCase\`
- 상수는 \`UPPER_CASE\`

스타일을 지키지 않아도 컴파일은 된다.  
하지만 지키지 않으면 다음 문제가 생긴다.

- 가독성 저하
- 리뷰와 감사 난이도 증가
- 협업 품질 저하
- 자동 포맷터 / 린터와 충돌

특히 보안 감사 관점에서는 "읽기 쉬운 코드" 자체가 큰 장점이다.

---

## 14. 실전에서 기억할 포인트

마지막으로 이 글에서 다룬 내용을 실전 관점에서 다시 요약해보면 다음과 같다.

- 이벤트는 상태가 아니라 외부 관찰용 로그다.
- \`indexed\`는 검색성과 직결된다.
- Ether와 시간 단위 접미사는 가독성을 크게 높여준다.
- 해시와 서명 검증은 짧아 보여도 보안 민감도가 높다.
- \`selfdestruct\`는 최신 네트워크 기준으로 매우 보수적으로 이해해야 한다.
- 스타일 가이드는 단순 취향이 아니라 유지보수성과 감사 효율에 영향을 준다.

---

## 시리즈 마무리

여기까지 Solidity의 기초 개념을 4편으로 나눠 정리해봤다.

1. EVM과 파일 구조, ABI
2. 타입 시스템과 상태 모델
3. 함수, 메모리 모델, 예외 처리
4. 이벤트, 해시, selfdestruct, 스타일 가이드

이 시리즈는 "문법을 외우는 것"보다  
"Solidity 코드가 실제로 어떤 모델 위에서 돌아가는지 이해하는 것"에 초점을 맞췄다.

다음에는 상속, 라이브러리, 인터페이스, ERC 표준, delegatecall, proxy, storage layout처럼  
더 실전적인 주제로 이어가면 자연스럽게 다음 단계로 넘어갈 수 있을 것 같다.
`;function Mg(t){const i=t.trim();return i.startsWith('"')&&i.endsWith('"')||i.startsWith("'")&&i.endsWith("'")?i.slice(1,-1).replace(/\\"/g,'"').replace(/\\'/g,"'").replace(/\\\\/g,"\\"):i}function tv(t){const i=t.trim();if(!i.startsWith("[")||!i.endsWith("]"))return[];const a=i.slice(1,-1).trim();return a?a.split(",").map(u=>Mg(u)).filter(Boolean):[]}function lv(t){if(!t.startsWith(`---
`))return{frontmatter:{},content:t};const i=t.indexOf(`
---
`,4);if(i===-1)return{frontmatter:{},content:t};const a=t.slice(4,i),u=t.slice(i+5),s={};for(const c of a.split(`
`)){if(!c.trim())continue;const f=c.indexOf(":");if(f===-1)continue;const m=c.slice(0,f).trim(),p=c.slice(f+1).trim();if(m==="tags"){s.tags=tv(p);continue}if(m==="published"){s.published=p.toLowerCase()==="true";continue}const d=Mg(p);m==="id"?s.id=d:m==="title"?s.title=d:m==="description"?s.description=d:m==="date"?s.date=d:m==="category"&&(s.category=d)}return{frontmatter:s,content:u}}function xp(t){const i=new Date(t.replace(" ","T")).getTime();return Number.isNaN(i)?0:i}const iv=Object.assign({"../content/posts/blog-post-management-guide.md":I2,"../content/posts/ethereum-ux-roadmap-analysis.md":Z2,"../content/posts/future-of-web3-audit.md":K2,"../content/posts/md-writing-template-guide.md":J2,"../content/posts/profile-customization-guide.md":W2,"../content/posts/solidity-concepts-1.md":P2,"../content/posts/solidity-concepts-2.md":$2,"../content/posts/solidity-concepts-3.md":ev,"../content/posts/solidity-concepts-4.md":nv}),Ba=Object.entries(iv).map(([t,i])=>{const a=t.split("/").pop()?.replace(/\.md$/,"")||"untitled-post",{frontmatter:u,content:s}=lv(i),c=u.tags&&u.tags.length>0?u.tags:void 0;return{id:u.id||a,title:u.title||a,description:u.description||"",date:u.date||"1970-01-01 00:00",category:u.category||"daily",tags:c,published:u.published??!0,content:s.trim()}}).sort((t,i)=>xp(i.date)-xp(t.date)),_g=[{id:"all",name:"전체",icon:"grid"},{id:"security",name:"보안(Security)",icon:"shield",children:[{id:"web-security",name:"Web Security",icon:"globe"},{id:"web3-blockchain",name:"Web3 / Blockchain",icon:"zap",children:[{id:"research-article",name:"research/Article"},{id:"study-dev-security",name:"study(dev/security)"},{id:"wargame-ctf",name:"wargame/CTF"}]},{id:"reversing",name:"Reversing",icon:"cpu"},{id:"pwn",name:"Pwn",icon:"terminal"},{id:"crypto",name:"Crypto",icon:"lock"}]},{id:"development",name:"개발(Development)",icon:"code"},{id:"travel",name:"여행(Travel)",icon:"map"},{id:"daily",name:"일상(Daily)",icon:"user"}],Xa={name:"flowizy",title:"SECURITY RESEARCHER",bio:"관심 있는 것들을 공부하고 기록합니다.",profileImage:"/images/chaegeon.jpg",contacts:[{type:"discord",label:"DISCORD",value:"_flowizy"},{type:"telegram",label:"TELEGRAM",value:"@chaegunn",link:"https://t.me/chaegunn"},{type:"linkedin",label:"LINKEDIN",value:"Chaegeon Oh",link:"https://www.linkedin.com/in/%EC%B1%84%EA%B1%B4-%EC%98%A4-159157342/"},{type:"github",label:"GITHUB",value:"fl0wizy",link:"https://github.com/fl0wizy"},{type:"email",label:"PERSONAL EMAIL",value:"dhcorjs063@gmail.com",link:"mailto:dhcorjs063@gmail.com"},{type:"email",label:"ACADEMIC EMAIL",value:"dhcorjs@ajou.ac.kr",link:"mailto:dhcorjs@ajou.ac.kr"}],experiences:[{title:"The 10th President of the Student Council",company:"Ajou University-department of cyber security",period:"2025-01 ~ 2025-12",description:"2025년도 아주대학교 사이버보안학과 제10대 학생회장으로 역임.",tags:["학생회","자치활동","책임감"],current:!0}],projects:[{title:"Visualize on-chain data",type:"Data Analytics & Visualization",year:"2025-03 ~ 2025-06",description:"ARKHAM, DUNE, Etherscan 등과 같이 정적인 데이터에서 유의미한 데이터를 추출하고 이를 보기 쉽게 가시화한 프로젝트입니다.",tags:["Java","SpringBoot","Vue.js"],link:"https://github.com/fl0wizy/defi-audit-bot"},{title:"Blockchain Audit Project",type:"DeFi Security & Audit",year:"2025-07 ~ 2025-10",description:"Flare, Trader Joe, Ekubo와 같은 정통 DEX부터 담보대출 시스템 등 DeFi 프로토콜 감사를 수행한 프로젝트입니다.",tags:["EVM","Solidity","CodeArena"],link:"https://github.com/fl0wizy/defi-audit-bot"}],education:[{title:"Department of Cyber Security",institution:"Ajou University",subInfo:"아주대학교 사이버보안학과",period:"2022 ~ 현재",description:"시스템 보안 및 탈중앙화를 중점적으로 공부하고 있습니다.",tags:["시스템 보안","운영체제","네트워크"],current:!0},{title:"Hspace Internship",institution:"Hspace",subInfo:"교육 인턴",period:"2025-07 ~ 2025-08",description:"Web과 Web3, 인프라에 대한 전반적인 지식을 습득했습니다.",tags:["Web Security","Web3","Secureum","DEFCON"]},{title:"HuntingMaster (KISA) Web/Web3 Track Trainee",institution:"KISA",subInfo:"우수 수료생",period:"2025-07 ~ 2025-10",description:"Web과 Web3에 대한 전반적인 보안 지식을 습득했습니다.",tags:["Web Security","Web3","Audit","Bug Bounty"]},{title:"upside Academy",institution:"Theory x 두나무",subInfo:"A.K.A fl0wizy",period:"2026-02 ~ 2026-06",description:"전분야 보안의 전반적인 지식과 web3의 깊은 이해를 가지게 되었습니다.",tags:["Solidity","Foundry","Web3","Audit","Threat Modeling"]}],skills:[{name:"Web3 security",category:"Smart Contracts",level:"intermediate",description:"EVM, 가스 최적화 및 프로토콜 보안 패턴에 대한 깊은 이해를 보유하고 있습니다.",tags:["Solidity","Yul","Foundry"]},{name:"Web Security",category:"Network Security",level:"intermediate",description:"네트워크 보안 기술에 대한 깊은 이해를 보유하고 있습니다.",tags:["Burp Suite","XSS","SQLi","Wireshark","Nmap","business"]}]};function Og(t,i=_g){for(const a of i){if(a.id===t)return a;if(a.children){const u=Og(t,a.children);if(u)return u}}}function Ng(t){const i=[t.id];if(t.children)for(const a of t.children)i.push(...Ng(a));return i}function av(t){return Ba.filter(i=>i.published).length}function rv(t){if(t==="all")return Ba.filter(u=>u.published);const i=Og(t);if(!i)return[];const a=new Set(Ng(i));return Ba.filter(u=>u.published&&a.has(u.category))}function uv(t){return Ba.find(i=>i.id===t)}function jg(t){const i=new Date(t.replace(" ","T")),u=new Date().getTime()-i.getTime(),s=Math.floor(u/(1e3*60)),c=Math.floor(u/(1e3*60*60)),f=Math.floor(u/(1e3*60*60*24)),m=Math.floor(f/7),p=Math.floor(f/30),d=Math.floor(f/365);return s<1?"방금 전":s<60?`약 ${s}분 전`:c<24?`약 ${c}시간 전`:f<7?`약 ${f}일 전`:m<4?`약 ${m}주 전`:p<12?`약 ${p}개월 전`:`약 ${d}년 전`}function Lg(t){const[i,a]=t.split(" ");return`${i} / ${a}`}const Su={grid:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("rect",{x:"3",y:"3",width:"7",height:"7",rx:"1"}),E.jsx("rect",{x:"14",y:"3",width:"7",height:"7",rx:"1"}),E.jsx("rect",{x:"3",y:"14",width:"7",height:"7",rx:"1"}),E.jsx("rect",{x:"14",y:"14",width:"7",height:"7",rx:"1"})]}),shield:()=>E.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:E.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})}),globe:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("circle",{cx:"12",cy:"12",r:"10"}),E.jsx("line",{x1:"2",y1:"12",x2:"22",y2:"12"}),E.jsx("path",{d:"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),zap:()=>E.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:E.jsx("polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"})}),cpu:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}),E.jsx("rect",{x:"9",y:"9",width:"6",height:"6"}),E.jsx("line",{x1:"9",y1:"1",x2:"9",y2:"4"}),E.jsx("line",{x1:"15",y1:"1",x2:"15",y2:"4"}),E.jsx("line",{x1:"9",y1:"20",x2:"9",y2:"23"}),E.jsx("line",{x1:"15",y1:"20",x2:"15",y2:"23"}),E.jsx("line",{x1:"20",y1:"9",x2:"23",y2:"9"}),E.jsx("line",{x1:"20",y1:"14",x2:"23",y2:"14"}),E.jsx("line",{x1:"1",y1:"9",x2:"4",y2:"9"}),E.jsx("line",{x1:"1",y1:"14",x2:"4",y2:"14"})]}),terminal:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("polyline",{points:"4 17 10 11 4 5"}),E.jsx("line",{x1:"12",y1:"19",x2:"20",y2:"19"})]}),lock:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),E.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),code:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("polyline",{points:"16 18 22 12 16 6"}),E.jsx("polyline",{points:"8 6 2 12 8 18"})]}),map:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("polygon",{points:"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"}),E.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"18"}),E.jsx("line",{x1:"16",y1:"6",x2:"16",y2:"22"})]}),user:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),E.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),chevronDown:()=>E.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:E.jsx("polyline",{points:"6 9 12 15 18 9"})}),book:()=>E.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("path",{d:"M4 19.5A2.5 2.5 0 0 1 6.5 17H20"}),E.jsx("path",{d:"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"})]}),userCircle:()=>E.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("circle",{cx:"12",cy:"12",r:"10"}),E.jsx("circle",{cx:"12",cy:"10",r:"3"}),E.jsx("path",{d:"M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"})]})},ov=t=>{if(!t)return null;const i=Su[t];return i?E.jsx(i,{}):null};function Bg({category:t,level:i,selectedCategory:a,onSelect:u}){const[s,c]=V.useState(i===0),f=t.children&&t.children.length>0,m=a===t.id,p=t.id==="all"?av():void 0,d=()=>{f&&c(!s),u(t.id)};return E.jsxs("div",{className:"category-item-wrapper",children:[E.jsxs("button",{className:`category-item ${m?"selected":""} level-${i}`,onClick:d,style:{paddingLeft:`${i*16+12}px`},children:[E.jsx("span",{className:"category-icon",children:ov(t.icon)}),E.jsx("span",{className:"category-name",children:t.name}),p!==void 0&&E.jsx("span",{className:"post-count",children:p}),f&&E.jsx("span",{className:`expand-icon ${s?"expanded":""}`,children:E.jsx(Su.chevronDown,{})})]}),f&&s&&E.jsx("div",{className:"category-children",children:t.children.map(b=>E.jsx(Bg,{category:b,level:i+1,selectedCategory:a,onSelect:u},b.id))})]})}function sv({onCategorySelect:t}){const i=Bt(),[a,u]=V.useState("all"),s=i.pathname==="/profile",c=i.pathname==="/"||i.pathname.startsWith("/blog")||i.pathname.startsWith("/category"),f=m=>{u(m),t?.(m)};return E.jsxs("aside",{className:"sidebar",children:[E.jsx("div",{className:"sidebar-logo",children:E.jsxs("div",{className:"logo-container",children:[E.jsx("div",{className:"logo-image-wrapper",children:E.jsx("img",{src:"/images/profile.jpg",alt:"flowizy",className:"logo-profile-image"})}),E.jsxs("div",{className:"logo-text",children:[E.jsx("h1",{children:"flowizy's DevLog"}),E.jsx("p",{children:"SECURITY RESEARCHER"})]})]})}),E.jsxs("nav",{className:"sidebar-nav",children:[E.jsxs(wi,{to:"/profile",className:`nav-item ${s?"active":""}`,children:[E.jsx(Su.userCircle,{}),E.jsx("span",{children:"PROFILE"})]}),E.jsxs(wi,{to:"/",className:`nav-item ${c?"active":""}`,children:[E.jsx(Su.book,{}),E.jsx("span",{children:"BLOG"})]})]}),E.jsxs("div",{className:"sidebar-categories",children:[E.jsx("div",{className:"categories-header",children:E.jsx("span",{children:"CONTENT CATEGORIES"})}),E.jsx("div",{className:"categories-list",children:_g.map(m=>E.jsx(Bg,{category:m,level:0,selectedCategory:a,onSelect:f},m.id))})]})]})}function cv(){const t=Bc(),i=a=>{t(a==="all"?"/":`/category/${a}`)};return E.jsxs("div",{className:"layout",children:[E.jsx(sv,{onCategorySelect:i}),E.jsx("main",{className:"main-content",children:E.jsx(f2,{})})]})}const fv=()=>E.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:E.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})});function Ug({subtitle:t="SECURITY RESEARCH LOG",title:i,highlightWord:a}){const u=()=>a?i.split(new RegExp(`(${a})`,"gi")).map((c,f)=>c.toLowerCase()===a.toLowerCase()?E.jsx("span",{className:"highlight",children:c},f):c):i;return E.jsxs("header",{className:"hero-header",children:[E.jsxs("div",{className:"hero-background",children:[E.jsx("div",{className:"stars"}),E.jsx("div",{className:"nebula"})]}),E.jsxs("div",{className:"hero-content",children:[E.jsxs("div",{className:"hero-badge",children:[E.jsx(fv,{}),E.jsx("span",{className:"badge-text",children:t})]}),E.jsx("h1",{className:"hero-title",children:u()})]})]})}const hv={daily:"일상(DAILY)",security:"보안(SECURITY)","web-security":"Web Security","web3-blockchain":"Web3/Blockchain","research-article":"Research/Article","study-dev-security":"Study","wargame-ctf":"Wargame/CTF",reversing:"Reversing",pwn:"Pwn",crypto:"Crypto",development:"개발(DEVELOPMENT)",travel:"여행(TRAVEL)"};function Hg({post:t}){const i=hv[t.category]||t.category;return E.jsx("article",{className:"post-card",children:E.jsxs(wi,{to:`/post/${t.id}`,className:"post-card-link",children:[E.jsxs("div",{className:"post-card-header",children:[E.jsxs("div",{className:"post-meta",children:[E.jsx("span",{className:"post-date",children:Lg(t.date)}),E.jsx("span",{className:"post-relative-time",children:jg(t.date)})]}),E.jsx("span",{className:"post-category-badge",children:i})]}),E.jsx("h2",{className:"post-title",children:t.title}),E.jsx("p",{className:"post-description",children:t.description}),t.tags&&t.tags.length>0&&E.jsx("div",{className:"post-tags",children:t.tags.slice(0,3).map(a=>E.jsxs("span",{className:"post-tag",children:["#",a]},a))})]})})}function dv(){const t=Ba.filter(i=>i.published);return E.jsxs("div",{className:"blog-page",children:[E.jsx(Ug,{title:"Searching for vulnerabilities",highlightWord:"vulnerabilities"}),E.jsxs("section",{className:"archive-section",children:[E.jsx("h2",{className:"section-header",children:"ARCHIVE"}),E.jsx("div",{className:"posts-list",children:t.length>0?t.map(i=>E.jsx(Hg,{post:i},i.id)):E.jsx("div",{className:"no-posts",children:E.jsx("p",{children:"아직 게시글이 없습니다."})})})]})]})}const za={discord:()=>E.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"currentColor",children:E.jsx("path",{d:"M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"})}),telegram:()=>E.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"currentColor",children:E.jsx("path",{d:"M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"})}),linkedin:()=>E.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"currentColor",children:E.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})}),github:()=>E.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"currentColor",children:E.jsx("path",{d:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"})}),email:()=>E.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),E.jsx("path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"})]}),externalLink:()=>E.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),E.jsx("polyline",{points:"15 3 21 3 21 9"}),E.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),copy:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"}),E.jsx("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]}),check:()=>E.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:E.jsx("polyline",{points:"20 6 9 17 4 12"})})},Sp={discord:"#5865F2",telegram:"#26A5E4",linkedin:"#0A66C2",github:"#8b5cf6",email:"#a855f7"};function mv(){const{name:t,title:i,bio:a,profileImage:u,contacts:s}=Xa,[c,f]=V.useState(null),m=async(d,b)=>{try{await navigator.clipboard.writeText(d),f(b),setTimeout(()=>f(null),2e3)}catch(g){console.error("Failed to copy:",g)}},p=d=>d==="github"||d==="linkedin";return E.jsxs("div",{className:"profile-card-container",children:[E.jsxs("div",{className:"profile-header",children:[E.jsx("div",{className:"profile-image-wrapper",children:E.jsx("div",{className:"profile-image",children:E.jsx("img",{src:u,alt:t})})}),E.jsxs("div",{className:"profile-info",children:[E.jsx("h1",{className:"profile-name",children:t}),E.jsx("p",{className:"profile-title",children:i}),E.jsx("p",{className:"profile-korean-name",children:"Korean name : Chaegeon Oh"}),E.jsx("p",{className:"profile-bio",children:a})]})]}),E.jsx("div",{className:"contact-grid",children:s.map((d,b)=>{const g=za[d.type]||za.email,S=Sp[d.type]||Sp.email,x=p(d.type)&&d.link;return E.jsxs("div",{className:"contact-card",style:{"--contact-icon-color":S},children:[E.jsx("div",{className:"contact-icon",children:E.jsx(g,{})}),E.jsxs("div",{className:"contact-content",children:[E.jsx("span",{className:"contact-label",children:d.label}),x?E.jsxs("a",{href:d.link,className:"contact-value contact-link",target:"_blank",rel:"noopener noreferrer",children:[d.value,E.jsx(za.externalLink,{})]}):E.jsx("span",{className:"contact-value contact-text",children:d.value})]}),!x&&E.jsx("button",{className:`copy-button ${c===b?"copied":""}`,onClick:()=>m(d.value,b),title:"복사",children:c===b?E.jsx(za.check,{}):E.jsx(za.copy,{})})]},b)})})]})}function pv(){const{experiences:t}=Xa;return t.length===0?null:E.jsxs("section",{className:"experience-section",children:[E.jsx("h2",{className:"section-header",children:"EXPERIENCE"}),E.jsx("div",{className:"timeline",children:t.map((i,a)=>E.jsx("div",{className:"timeline-item",children:E.jsxs("div",{className:"experience-card",children:[E.jsxs("div",{className:"experience-header",children:[E.jsx("div",{className:"experience-icon",children:E.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:E.jsx("circle",{cx:"12",cy:"12",r:"10"})})}),E.jsxs("div",{className:"experience-title-info",children:[E.jsx("h3",{className:"experience-title",children:i.title}),E.jsx("p",{className:"experience-company",children:i.company})]}),E.jsx("span",{className:`experience-period ${i.current?"current":""}`,children:i.period})]}),E.jsx("p",{className:"experience-description",children:i.description}),i.tags&&i.tags.length>0&&E.jsx("div",{className:"experience-tags",children:i.tags.map((u,s)=>E.jsxs("span",{className:"tag",children:["#",u]},s))})]})},a))})]})}function gv(){const{projects:t}=Xa;return t.length===0?null:E.jsxs("section",{className:"projects-section",children:[E.jsx("h2",{className:"section-header",children:"PROJECTS"}),E.jsx("div",{className:"timeline",children:t.map((i,a)=>E.jsx("div",{className:"timeline-item",children:E.jsxs("div",{className:"project-card",children:[E.jsxs("div",{className:"project-header",children:[E.jsx("div",{className:"project-icon",children:E.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("polyline",{points:"4 17 10 11 4 5"}),E.jsx("line",{x1:"12",y1:"19",x2:"20",y2:"19"})]})}),E.jsxs("div",{className:"project-title-info",children:[E.jsx("h3",{className:"project-title",children:i.title}),E.jsx("p",{className:"project-type",children:i.type})]}),E.jsx("span",{className:"project-year",children:i.year})]}),E.jsx("p",{className:"project-description",children:i.description}),i.tags&&i.tags.length>0&&E.jsx("div",{className:"project-tags",children:i.tags.map((u,s)=>E.jsxs("span",{className:"tag",children:["#",u]},s))})]})},a))})]})}function yv(){const{education:t}=Xa;return t.length===0?null:E.jsxs("section",{className:"education-section",children:[E.jsx("h2",{className:"section-header",children:"EDUCATION"}),E.jsx("div",{className:"timeline",children:t.map((i,a)=>E.jsx("div",{className:"timeline-item",children:E.jsxs("div",{className:"education-card",children:[E.jsxs("div",{className:"education-header",children:[E.jsx("div",{className:"education-icon",children:E.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("path",{d:"M22 10v6M2 10l10-5 10 5-10 5z"}),E.jsx("path",{d:"M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"})]})}),E.jsxs("div",{className:"education-title-info",children:[E.jsx("h3",{className:"education-title",children:i.title}),E.jsxs("p",{className:"education-institution",children:[i.institution,i.subInfo&&E.jsxs("span",{className:"education-subinfo",children:[" (",i.subInfo,")"]})]})]}),E.jsx("span",{className:`education-period ${i.current?"current":""}`,children:i.period})]}),E.jsx("p",{className:"education-description",children:i.description}),i.tags&&i.tags.length>0&&E.jsx("div",{className:"education-tags",children:i.tags.map((u,s)=>E.jsxs("span",{className:"tag",children:["#",u]},s))})]})},a))})]})}const bv={beginner:"입문",intermediate:"중급",advanced:"고급",expert:"전문가"},vv={beginner:"blue",intermediate:"yellow",advanced:"purple",expert:"green"};function xv(){const{skills:t}=Xa;return t.length===0?null:E.jsxs("section",{className:"skills-section",children:[E.jsx("h2",{className:"section-header",children:"SKILLS"}),E.jsx("div",{className:"timeline",children:t.map((i,a)=>E.jsx("div",{className:"timeline-item",children:E.jsxs("div",{className:"skill-card",children:[E.jsxs("div",{className:"skill-header",children:[E.jsx("div",{className:"skill-icon",children:E.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:E.jsx("circle",{cx:"12",cy:"12",r:"10"})})}),E.jsxs("div",{className:"skill-title-info",children:[E.jsx("h3",{className:"skill-title",children:i.name}),E.jsx("p",{className:"skill-category",children:i.category})]}),E.jsx("span",{className:`skill-level level-${vv[i.level]}`,children:bv[i.level]})]}),E.jsx("p",{className:"skill-description",children:i.description}),i.tags&&i.tags.length>0&&E.jsx("div",{className:"skill-tags",children:i.tags.map((u,s)=>E.jsxs("span",{className:"tag",children:["#",u]},s))})]})},a))})]})}function Sv(){return E.jsxs("div",{className:"profile-page",children:[E.jsx(mv,{}),E.jsx(pv,{}),E.jsx(gv,{}),E.jsx(yv,{}),E.jsx(xv,{})]})}function Ev(t,i){const a={};return(t[t.length-1]===""?[...t,""]:t).join((a.padRight?" ":"")+","+(a.padLeft===!1?"":" ")).trim()}const kv=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,Cv=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,Av={};function Ep(t,i){return(Av.jsx?Cv:kv).test(t)}const wv=/[ \t\n\f\r]/g;function Tv(t){return typeof t=="object"?t.type==="text"?kp(t.value):!1:kp(t)}function kp(t){return t.replace(wv,"")===""}class Ga{constructor(i,a,u){this.normal=a,this.property=i,u&&(this.space=u)}}Ga.prototype.normal={};Ga.prototype.property={};Ga.prototype.space=void 0;function qg(t,i){const a={},u={};for(const s of t)Object.assign(a,s.property),Object.assign(u,s.normal);return new Ga(a,u,i)}function kc(t){return t.toLowerCase()}class Mn{constructor(i,a){this.attribute=a,this.property=i}}Mn.prototype.attribute="";Mn.prototype.booleanish=!1;Mn.prototype.boolean=!1;Mn.prototype.commaOrSpaceSeparated=!1;Mn.prototype.commaSeparated=!1;Mn.prototype.defined=!1;Mn.prototype.mustUseProperty=!1;Mn.prototype.number=!1;Mn.prototype.overloadedBoolean=!1;Mn.prototype.property="";Mn.prototype.spaceSeparated=!1;Mn.prototype.space=void 0;let zv=0;const ve=_l(),an=_l(),Cc=_l(),J=_l(),Ge=_l(),Ai=_l(),qn=_l();function _l(){return 2**++zv}const Ac=Object.freeze(Object.defineProperty({__proto__:null,boolean:ve,booleanish:an,commaOrSpaceSeparated:qn,commaSeparated:Ai,number:J,overloadedBoolean:Cc,spaceSeparated:Ge},Symbol.toStringTag,{value:"Module"})),ic=Object.keys(Ac);class Vc extends Mn{constructor(i,a,u,s){let c=-1;if(super(i,a),Cp(this,"space",s),typeof u=="number")for(;++c<ic.length;){const f=ic[c];Cp(this,ic[c],(u&Ac[f])===Ac[f])}}}Vc.prototype.defined=!0;function Cp(t,i,a){a&&(t[i]=a)}function Di(t){const i={},a={};for(const[u,s]of Object.entries(t.properties)){const c=new Vc(u,t.transform(t.attributes||{},u),s,t.space);t.mustUseProperty&&t.mustUseProperty.includes(u)&&(c.mustUseProperty=!0),i[u]=c,a[kc(u)]=u,a[kc(c.attribute)]=u}return new Ga(i,a,t.space)}const Yg=Di({properties:{ariaActiveDescendant:null,ariaAtomic:an,ariaAutoComplete:null,ariaBusy:an,ariaChecked:an,ariaColCount:J,ariaColIndex:J,ariaColSpan:J,ariaControls:Ge,ariaCurrent:null,ariaDescribedBy:Ge,ariaDetails:null,ariaDisabled:an,ariaDropEffect:Ge,ariaErrorMessage:null,ariaExpanded:an,ariaFlowTo:Ge,ariaGrabbed:an,ariaHasPopup:null,ariaHidden:an,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:Ge,ariaLevel:J,ariaLive:null,ariaModal:an,ariaMultiLine:an,ariaMultiSelectable:an,ariaOrientation:null,ariaOwns:Ge,ariaPlaceholder:null,ariaPosInSet:J,ariaPressed:an,ariaReadOnly:an,ariaRelevant:null,ariaRequired:an,ariaRoleDescription:Ge,ariaRowCount:J,ariaRowIndex:J,ariaRowSpan:J,ariaSelected:an,ariaSetSize:J,ariaSort:null,ariaValueMax:J,ariaValueMin:J,ariaValueNow:J,ariaValueText:null,role:null},transform(t,i){return i==="role"?i:"aria-"+i.slice(4).toLowerCase()}});function Vg(t,i){return i in t?t[i]:i}function Xg(t,i){return Vg(t,i.toLowerCase())}const Rv=Di({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:Ai,acceptCharset:Ge,accessKey:Ge,action:null,allow:null,allowFullScreen:ve,allowPaymentRequest:ve,allowUserMedia:ve,alt:null,as:null,async:ve,autoCapitalize:null,autoComplete:Ge,autoFocus:ve,autoPlay:ve,blocking:Ge,capture:null,charSet:null,checked:ve,cite:null,className:Ge,cols:J,colSpan:null,content:null,contentEditable:an,controls:ve,controlsList:Ge,coords:J|Ai,crossOrigin:null,data:null,dateTime:null,decoding:null,default:ve,defer:ve,dir:null,dirName:null,disabled:ve,download:Cc,draggable:an,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:ve,formTarget:null,headers:Ge,height:J,hidden:Cc,high:J,href:null,hrefLang:null,htmlFor:Ge,httpEquiv:Ge,id:null,imageSizes:null,imageSrcSet:null,inert:ve,inputMode:null,integrity:null,is:null,isMap:ve,itemId:null,itemProp:Ge,itemRef:Ge,itemScope:ve,itemType:Ge,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:ve,low:J,manifest:null,max:null,maxLength:J,media:null,method:null,min:null,minLength:J,multiple:ve,muted:ve,name:null,nonce:null,noModule:ve,noValidate:ve,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:ve,optimum:J,pattern:null,ping:Ge,placeholder:null,playsInline:ve,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:ve,referrerPolicy:null,rel:Ge,required:ve,reversed:ve,rows:J,rowSpan:J,sandbox:Ge,scope:null,scoped:ve,seamless:ve,selected:ve,shadowRootClonable:ve,shadowRootDelegatesFocus:ve,shadowRootMode:null,shape:null,size:J,sizes:null,slot:null,span:J,spellCheck:an,src:null,srcDoc:null,srcLang:null,srcSet:null,start:J,step:null,style:null,tabIndex:J,target:null,title:null,translate:null,type:null,typeMustMatch:ve,useMap:null,value:an,width:J,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:Ge,axis:null,background:null,bgColor:null,border:J,borderColor:null,bottomMargin:J,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:ve,declare:ve,event:null,face:null,frame:null,frameBorder:null,hSpace:J,leftMargin:J,link:null,longDesc:null,lowSrc:null,marginHeight:J,marginWidth:J,noResize:ve,noHref:ve,noShade:ve,noWrap:ve,object:null,profile:null,prompt:null,rev:null,rightMargin:J,rules:null,scheme:null,scrolling:an,standby:null,summary:null,text:null,topMargin:J,valueType:null,version:null,vAlign:null,vLink:null,vSpace:J,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:ve,disableRemotePlayback:ve,prefix:null,property:null,results:J,security:null,unselectable:null},space:"html",transform:Xg}),Dv=Di({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:qn,accentHeight:J,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:J,amplitude:J,arabicForm:null,ascent:J,attributeName:null,attributeType:null,azimuth:J,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:J,by:null,calcMode:null,capHeight:J,className:Ge,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:J,diffuseConstant:J,direction:null,display:null,dur:null,divisor:J,dominantBaseline:null,download:ve,dx:null,dy:null,edgeMode:null,editable:null,elevation:J,enableBackground:null,end:null,event:null,exponent:J,externalResourcesRequired:null,fill:null,fillOpacity:J,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:Ai,g2:Ai,glyphName:Ai,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:J,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:J,horizOriginX:J,horizOriginY:J,id:null,ideographic:J,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:J,k:J,k1:J,k2:J,k3:J,k4:J,kernelMatrix:qn,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:J,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:J,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:J,overlineThickness:J,paintOrder:null,panose1:null,path:null,pathLength:J,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:Ge,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:J,pointsAtY:J,pointsAtZ:J,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:qn,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:qn,rev:qn,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:qn,requiredFeatures:qn,requiredFonts:qn,requiredFormats:qn,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:J,specularExponent:J,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:J,strikethroughThickness:J,string:null,stroke:null,strokeDashArray:qn,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:J,strokeOpacity:J,strokeWidth:null,style:null,surfaceScale:J,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:qn,tabIndex:J,tableValues:null,target:null,targetX:J,targetY:J,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:qn,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:J,underlineThickness:J,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:J,values:null,vAlphabetic:J,vMathematical:J,vectorEffect:null,vHanging:J,vIdeographic:J,version:null,vertAdvY:J,vertOriginX:J,vertOriginY:J,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:J,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:Vg}),Gg=Di({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(t,i){return"xlink:"+i.slice(5).toLowerCase()}}),Qg=Di({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:Xg}),Fg=Di({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(t,i){return"xml:"+i.slice(3).toLowerCase()}}),Mv={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},_v=/[A-Z]/g,Ap=/-[a-z]/g,Ov=/^data[-\w.:]+$/i;function Nv(t,i){const a=kc(i);let u=i,s=Mn;if(a in t.normal)return t.property[t.normal[a]];if(a.length>4&&a.slice(0,4)==="data"&&Ov.test(i)){if(i.charAt(4)==="-"){const c=i.slice(5).replace(Ap,Lv);u="data"+c.charAt(0).toUpperCase()+c.slice(1)}else{const c=i.slice(4);if(!Ap.test(c)){let f=c.replace(_v,jv);f.charAt(0)!=="-"&&(f="-"+f),i="data"+f}}s=Vc}return new s(u,i)}function jv(t){return"-"+t.toLowerCase()}function Lv(t){return t.charAt(1).toUpperCase()}const Bv=qg([Yg,Rv,Gg,Qg,Fg],"html"),Xc=qg([Yg,Dv,Gg,Qg,Fg],"svg");function Uv(t){return t.join(" ").trim()}var Si={},ac,wp;function Hv(){if(wp)return ac;wp=1;var t=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,i=/\n/g,a=/^\s*/,u=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,s=/^:\s*/,c=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,f=/^[;\s]*/,m=/^\s+|\s+$/g,p=`
`,d="/",b="*",g="",S="comment",x="declaration";function w(D,R){if(typeof D!="string")throw new TypeError("First argument must be a string");if(!D)return[];R=R||{};var X=1,U=1;function te(ae){var K=ae.match(i);K&&(X+=K.length);var L=ae.lastIndexOf(p);U=~L?ae.length-L:U+ae.length}function le(){var ae={line:X,column:U};return function(K){return K.position=new q(ae),me(),K}}function q(ae){this.start=ae,this.end={line:X,column:U},this.source=R.source}q.prototype.content=D;function P(ae){var K=new Error(R.source+":"+X+":"+U+": "+ae);if(K.reason=ae,K.filename=R.source,K.line=X,K.column=U,K.source=D,!R.silent)throw K}function ce(ae){var K=ae.exec(D);if(K){var L=K[0];return te(L),D=D.slice(L.length),K}}function me(){ce(a)}function B(ae){var K;for(ae=ae||[];K=ne();)K!==!1&&ae.push(K);return ae}function ne(){var ae=le();if(!(d!=D.charAt(0)||b!=D.charAt(1))){for(var K=2;g!=D.charAt(K)&&(b!=D.charAt(K)||d!=D.charAt(K+1));)++K;if(K+=2,g===D.charAt(K-1))return P("End of comment missing");var L=D.slice(2,K-2);return U+=2,te(L),D=D.slice(K),U+=2,ae({type:S,comment:L})}}function ee(){var ae=le(),K=ce(u);if(K){if(ne(),!ce(s))return P("property missing ':'");var L=ce(c),Z=ae({type:x,property:_(K[0].replace(t,g)),value:L?_(L[0].replace(t,g)):g});return ce(f),Z}}function xe(){var ae=[];B(ae);for(var K;K=ee();)K!==!1&&(ae.push(K),B(ae));return ae}return me(),xe()}function _(D){return D?D.replace(m,g):g}return ac=w,ac}var Tp;function qv(){if(Tp)return Si;Tp=1;var t=Si&&Si.__importDefault||function(u){return u&&u.__esModule?u:{default:u}};Object.defineProperty(Si,"__esModule",{value:!0}),Si.default=a;const i=t(Hv());function a(u,s){let c=null;if(!u||typeof u!="string")return c;const f=(0,i.default)(u),m=typeof s=="function";return f.forEach(p=>{if(p.type!=="declaration")return;const{property:d,value:b}=p;m?s(d,b,p):b&&(c=c||{},c[d]=b)}),c}return Si}var Ra={},zp;function Yv(){if(zp)return Ra;zp=1,Object.defineProperty(Ra,"__esModule",{value:!0}),Ra.camelCase=void 0;var t=/^--[a-zA-Z0-9_-]+$/,i=/-([a-z])/g,a=/^[^-]+$/,u=/^-(webkit|moz|ms|o|khtml)-/,s=/^-(ms)-/,c=function(d){return!d||a.test(d)||t.test(d)},f=function(d,b){return b.toUpperCase()},m=function(d,b){return"".concat(b,"-")},p=function(d,b){return b===void 0&&(b={}),c(d)?d:(d=d.toLowerCase(),b.reactCompat?d=d.replace(s,m):d=d.replace(u,m),d.replace(i,f))};return Ra.camelCase=p,Ra}var Da,Rp;function Vv(){if(Rp)return Da;Rp=1;var t=Da&&Da.__importDefault||function(s){return s&&s.__esModule?s:{default:s}},i=t(qv()),a=Yv();function u(s,c){var f={};return!s||typeof s!="string"||(0,i.default)(s,function(m,p){m&&p&&(f[(0,a.camelCase)(m,c)]=p)}),f}return u.default=u,Da=u,Da}var Xv=Vv();const Gv=fg(Xv),Ig=Zg("end"),Gc=Zg("start");function Zg(t){return i;function i(a){const u=a&&a.position&&a.position[t]||{};if(typeof u.line=="number"&&u.line>0&&typeof u.column=="number"&&u.column>0)return{line:u.line,column:u.column,offset:typeof u.offset=="number"&&u.offset>-1?u.offset:void 0}}}function Qv(t){const i=Gc(t),a=Ig(t);if(i&&a)return{start:i,end:a}}function Oa(t){return!t||typeof t!="object"?"":"position"in t||"type"in t?Dp(t.position):"start"in t||"end"in t?Dp(t):"line"in t||"column"in t?wc(t):""}function wc(t){return Mp(t&&t.line)+":"+Mp(t&&t.column)}function Dp(t){return wc(t&&t.start)+"-"+wc(t&&t.end)}function Mp(t){return t&&typeof t=="number"?t:1}class yn extends Error{constructor(i,a,u){super(),typeof a=="string"&&(u=a,a=void 0);let s="",c={},f=!1;if(a&&("line"in a&&"column"in a?c={place:a}:"start"in a&&"end"in a?c={place:a}:"type"in a?c={ancestors:[a],place:a.position}:c={...a}),typeof i=="string"?s=i:!c.cause&&i&&(f=!0,s=i.message,c.cause=i),!c.ruleId&&!c.source&&typeof u=="string"){const p=u.indexOf(":");p===-1?c.ruleId=u:(c.source=u.slice(0,p),c.ruleId=u.slice(p+1))}if(!c.place&&c.ancestors&&c.ancestors){const p=c.ancestors[c.ancestors.length-1];p&&(c.place=p.position)}const m=c.place&&"start"in c.place?c.place.start:c.place;this.ancestors=c.ancestors||void 0,this.cause=c.cause||void 0,this.column=m?m.column:void 0,this.fatal=void 0,this.file="",this.message=s,this.line=m?m.line:void 0,this.name=Oa(c.place)||"1:1",this.place=c.place||void 0,this.reason=this.message,this.ruleId=c.ruleId||void 0,this.source=c.source||void 0,this.stack=f&&c.cause&&typeof c.cause.stack=="string"?c.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}yn.prototype.file="";yn.prototype.name="";yn.prototype.reason="";yn.prototype.message="";yn.prototype.stack="";yn.prototype.column=void 0;yn.prototype.line=void 0;yn.prototype.ancestors=void 0;yn.prototype.cause=void 0;yn.prototype.fatal=void 0;yn.prototype.place=void 0;yn.prototype.ruleId=void 0;yn.prototype.source=void 0;const Qc={}.hasOwnProperty,Fv=new Map,Iv=/[A-Z]/g,Zv=new Set(["table","tbody","thead","tfoot","tr"]),Kv=new Set(["td","th"]),Kg="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function Jv(t,i){if(!i||i.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const a=i.filePath||void 0;let u;if(i.development){if(typeof i.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");u=ix(a,i.jsxDEV)}else{if(typeof i.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof i.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");u=lx(a,i.jsx,i.jsxs)}const s={Fragment:i.Fragment,ancestors:[],components:i.components||{},create:u,elementAttributeNameCase:i.elementAttributeNameCase||"react",evaluater:i.createEvaluater?i.createEvaluater():void 0,filePath:a,ignoreInvalidStyle:i.ignoreInvalidStyle||!1,passKeys:i.passKeys!==!1,passNode:i.passNode||!1,schema:i.space==="svg"?Xc:Bv,stylePropertyNameCase:i.stylePropertyNameCase||"dom",tableCellAlignToStyle:i.tableCellAlignToStyle!==!1},c=Jg(s,t,void 0);return c&&typeof c!="string"?c:s.create(t,s.Fragment,{children:c||void 0},void 0)}function Jg(t,i,a){if(i.type==="element")return Wv(t,i,a);if(i.type==="mdxFlowExpression"||i.type==="mdxTextExpression")return Pv(t,i);if(i.type==="mdxJsxFlowElement"||i.type==="mdxJsxTextElement")return ex(t,i,a);if(i.type==="mdxjsEsm")return $v(t,i);if(i.type==="root")return nx(t,i,a);if(i.type==="text")return tx(t,i)}function Wv(t,i,a){const u=t.schema;let s=u;i.tagName.toLowerCase()==="svg"&&u.space==="html"&&(s=Xc,t.schema=s),t.ancestors.push(i);const c=Pg(t,i.tagName,!1),f=ax(t,i);let m=Ic(t,i);return Zv.has(i.tagName)&&(m=m.filter(function(p){return typeof p=="string"?!Tv(p):!0})),Wg(t,f,c,i),Fc(f,m),t.ancestors.pop(),t.schema=u,t.create(i,c,f,a)}function Pv(t,i){if(i.data&&i.data.estree&&t.evaluater){const u=i.data.estree.body[0];return u.type,t.evaluater.evaluateExpression(u.expression)}Ua(t,i.position)}function $v(t,i){if(i.data&&i.data.estree&&t.evaluater)return t.evaluater.evaluateProgram(i.data.estree);Ua(t,i.position)}function ex(t,i,a){const u=t.schema;let s=u;i.name==="svg"&&u.space==="html"&&(s=Xc,t.schema=s),t.ancestors.push(i);const c=i.name===null?t.Fragment:Pg(t,i.name,!0),f=rx(t,i),m=Ic(t,i);return Wg(t,f,c,i),Fc(f,m),t.ancestors.pop(),t.schema=u,t.create(i,c,f,a)}function nx(t,i,a){const u={};return Fc(u,Ic(t,i)),t.create(i,t.Fragment,u,a)}function tx(t,i){return i.value}function Wg(t,i,a,u){typeof a!="string"&&a!==t.Fragment&&t.passNode&&(i.node=u)}function Fc(t,i){if(i.length>0){const a=i.length>1?i:i[0];a&&(t.children=a)}}function lx(t,i,a){return u;function u(s,c,f,m){const d=Array.isArray(f.children)?a:i;return m?d(c,f,m):d(c,f)}}function ix(t,i){return a;function a(u,s,c,f){const m=Array.isArray(c.children),p=Gc(u);return i(s,c,f,m,{columnNumber:p?p.column-1:void 0,fileName:t,lineNumber:p?p.line:void 0},void 0)}}function ax(t,i){const a={};let u,s;for(s in i.properties)if(s!=="children"&&Qc.call(i.properties,s)){const c=ux(t,s,i.properties[s]);if(c){const[f,m]=c;t.tableCellAlignToStyle&&f==="align"&&typeof m=="string"&&Kv.has(i.tagName)?u=m:a[f]=m}}if(u){const c=a.style||(a.style={});c[t.stylePropertyNameCase==="css"?"text-align":"textAlign"]=u}return a}function rx(t,i){const a={};for(const u of i.attributes)if(u.type==="mdxJsxExpressionAttribute")if(u.data&&u.data.estree&&t.evaluater){const c=u.data.estree.body[0];c.type;const f=c.expression;f.type;const m=f.properties[0];m.type,Object.assign(a,t.evaluater.evaluateExpression(m.argument))}else Ua(t,i.position);else{const s=u.name;let c;if(u.value&&typeof u.value=="object")if(u.value.data&&u.value.data.estree&&t.evaluater){const m=u.value.data.estree.body[0];m.type,c=t.evaluater.evaluateExpression(m.expression)}else Ua(t,i.position);else c=u.value===null?!0:u.value;a[s]=c}return a}function Ic(t,i){const a=[];let u=-1;const s=t.passKeys?new Map:Fv;for(;++u<i.children.length;){const c=i.children[u];let f;if(t.passKeys){const p=c.type==="element"?c.tagName:c.type==="mdxJsxFlowElement"||c.type==="mdxJsxTextElement"?c.name:void 0;if(p){const d=s.get(p)||0;f=p+"-"+d,s.set(p,d+1)}}const m=Jg(t,c,f);m!==void 0&&a.push(m)}return a}function ux(t,i,a){const u=Nv(t.schema,i);if(!(a==null||typeof a=="number"&&Number.isNaN(a))){if(Array.isArray(a)&&(a=u.commaSeparated?Ev(a):Uv(a)),u.property==="style"){let s=typeof a=="object"?a:ox(t,String(a));return t.stylePropertyNameCase==="css"&&(s=sx(s)),["style",s]}return[t.elementAttributeNameCase==="react"&&u.space?Mv[u.property]||u.property:u.attribute,a]}}function ox(t,i){try{return Gv(i,{reactCompat:!0})}catch(a){if(t.ignoreInvalidStyle)return{};const u=a,s=new yn("Cannot parse `style` attribute",{ancestors:t.ancestors,cause:u,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw s.file=t.filePath||void 0,s.url=Kg+"#cannot-parse-style-attribute",s}}function Pg(t,i,a){let u;if(!a)u={type:"Literal",value:i};else if(i.includes(".")){const s=i.split(".");let c=-1,f;for(;++c<s.length;){const m=Ep(s[c])?{type:"Identifier",name:s[c]}:{type:"Literal",value:s[c]};f=f?{type:"MemberExpression",object:f,property:m,computed:!!(c&&m.type==="Literal"),optional:!1}:m}u=f}else u=Ep(i)&&!/^[a-z]/.test(i)?{type:"Identifier",name:i}:{type:"Literal",value:i};if(u.type==="Literal"){const s=u.value;return Qc.call(t.components,s)?t.components[s]:s}if(t.evaluater)return t.evaluater.evaluateExpression(u);Ua(t)}function Ua(t,i){const a=new yn("Cannot handle MDX estrees without `createEvaluater`",{ancestors:t.ancestors,place:i,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw a.file=t.filePath||void 0,a.url=Kg+"#cannot-handle-mdx-estrees-without-createevaluater",a}function sx(t){const i={};let a;for(a in t)Qc.call(t,a)&&(i[cx(a)]=t[a]);return i}function cx(t){let i=t.replace(Iv,fx);return i.slice(0,3)==="ms-"&&(i="-"+i),i}function fx(t){return"-"+t.toLowerCase()}const rc={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},hx={};function Zc(t,i){const a=hx,u=typeof a.includeImageAlt=="boolean"?a.includeImageAlt:!0,s=typeof a.includeHtml=="boolean"?a.includeHtml:!0;return $g(t,u,s)}function $g(t,i,a){if(dx(t)){if("value"in t)return t.type==="html"&&!a?"":t.value;if(i&&"alt"in t&&t.alt)return t.alt;if("children"in t)return _p(t.children,i,a)}return Array.isArray(t)?_p(t,i,a):""}function _p(t,i,a){const u=[];let s=-1;for(;++s<t.length;)u[s]=$g(t[s],i,a);return u.join("")}function dx(t){return!!(t&&typeof t=="object")}const Op=document.createElement("i");function Kc(t){const i="&"+t+";";Op.innerHTML=i;const a=Op.textContent;return a.charCodeAt(a.length-1)===59&&t!=="semi"||a===i?!1:a}function Yn(t,i,a,u){const s=t.length;let c=0,f;if(i<0?i=-i>s?0:s+i:i=i>s?s:i,a=a>0?a:0,u.length<1e4)f=Array.from(u),f.unshift(i,a),t.splice(...f);else for(a&&t.splice(i,a);c<u.length;)f=u.slice(c,c+1e4),f.unshift(i,0),t.splice(...f),c+=1e4,i+=1e4}function $n(t,i){return t.length>0?(Yn(t,t.length,0,i),t):i}const Np={}.hasOwnProperty;function ey(t){const i={};let a=-1;for(;++a<t.length;)mx(i,t[a]);return i}function mx(t,i){let a;for(a in i){const s=(Np.call(t,a)?t[a]:void 0)||(t[a]={}),c=i[a];let f;if(c)for(f in c){Np.call(s,f)||(s[f]=[]);const m=c[f];px(s[f],Array.isArray(m)?m:m?[m]:[])}}}function px(t,i){let a=-1;const u=[];for(;++a<i.length;)(i[a].add==="after"?t:u).push(i[a]);Yn(t,0,0,u)}function ny(t,i){const a=Number.parseInt(t,i);return a<9||a===11||a>13&&a<32||a>126&&a<160||a>55295&&a<57344||a>64975&&a<65008||(a&65535)===65535||(a&65535)===65534||a>1114111?"�":String.fromCodePoint(a)}function at(t){return t.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Sn=fl(/[A-Za-z]/),gn=fl(/[\dA-Za-z]/),gx=fl(/[#-'*+\--9=?A-Z^-~]/);function Eu(t){return t!==null&&(t<32||t===127)}const Tc=fl(/\d/),yx=fl(/[\dA-Fa-f]/),bx=fl(/[!-/:-@[-`{-~]/);function fe(t){return t!==null&&t<-2}function Xe(t){return t!==null&&(t<0||t===32)}function Ae(t){return t===-2||t===-1||t===32}const zu=fl(new RegExp("\\p{P}|\\p{S}","u")),Ml=fl(/\s/);function fl(t){return i;function i(a){return a!==null&&a>-1&&t.test(String.fromCharCode(a))}}function Mi(t){const i=[];let a=-1,u=0,s=0;for(;++a<t.length;){const c=t.charCodeAt(a);let f="";if(c===37&&gn(t.charCodeAt(a+1))&&gn(t.charCodeAt(a+2)))s=2;else if(c<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(c))||(f=String.fromCharCode(c));else if(c>55295&&c<57344){const m=t.charCodeAt(a+1);c<56320&&m>56319&&m<57344?(f=String.fromCharCode(c,m),s=1):f="�"}else f=String.fromCharCode(c);f&&(i.push(t.slice(u,a),encodeURIComponent(f)),u=a+s+1,f=""),s&&(a+=s,s=0)}return i.join("")+t.slice(u)}function De(t,i,a,u){const s=u?u-1:Number.POSITIVE_INFINITY;let c=0;return f;function f(p){return Ae(p)?(t.enter(a),m(p)):i(p)}function m(p){return Ae(p)&&c++<s?(t.consume(p),m):(t.exit(a),i(p))}}const vx={tokenize:xx};function xx(t){const i=t.attempt(this.parser.constructs.contentInitial,u,s);let a;return i;function u(m){if(m===null){t.consume(m);return}return t.enter("lineEnding"),t.consume(m),t.exit("lineEnding"),De(t,i,"linePrefix")}function s(m){return t.enter("paragraph"),c(m)}function c(m){const p=t.enter("chunkText",{contentType:"text",previous:a});return a&&(a.next=p),a=p,f(m)}function f(m){if(m===null){t.exit("chunkText"),t.exit("paragraph"),t.consume(m);return}return fe(m)?(t.consume(m),t.exit("chunkText"),c):(t.consume(m),f)}}const Sx={tokenize:Ex},jp={tokenize:kx};function Ex(t){const i=this,a=[];let u=0,s,c,f;return m;function m(U){if(u<a.length){const te=a[u];return i.containerState=te[1],t.attempt(te[0].continuation,p,d)(U)}return d(U)}function p(U){if(u++,i.containerState._closeFlow){i.containerState._closeFlow=void 0,s&&X();const te=i.events.length;let le=te,q;for(;le--;)if(i.events[le][0]==="exit"&&i.events[le][1].type==="chunkFlow"){q=i.events[le][1].end;break}R(u);let P=te;for(;P<i.events.length;)i.events[P][1].end={...q},P++;return Yn(i.events,le+1,0,i.events.slice(te)),i.events.length=P,d(U)}return m(U)}function d(U){if(u===a.length){if(!s)return S(U);if(s.currentConstruct&&s.currentConstruct.concrete)return w(U);i.interrupt=!!(s.currentConstruct&&!s._gfmTableDynamicInterruptHack)}return i.containerState={},t.check(jp,b,g)(U)}function b(U){return s&&X(),R(u),S(U)}function g(U){return i.parser.lazy[i.now().line]=u!==a.length,f=i.now().offset,w(U)}function S(U){return i.containerState={},t.attempt(jp,x,w)(U)}function x(U){return u++,a.push([i.currentConstruct,i.containerState]),S(U)}function w(U){if(U===null){s&&X(),R(0),t.consume(U);return}return s=s||i.parser.flow(i.now()),t.enter("chunkFlow",{_tokenizer:s,contentType:"flow",previous:c}),_(U)}function _(U){if(U===null){D(t.exit("chunkFlow"),!0),R(0),t.consume(U);return}return fe(U)?(t.consume(U),D(t.exit("chunkFlow")),u=0,i.interrupt=void 0,m):(t.consume(U),_)}function D(U,te){const le=i.sliceStream(U);if(te&&le.push(null),U.previous=c,c&&(c.next=U),c=U,s.defineSkip(U.start),s.write(le),i.parser.lazy[U.start.line]){let q=s.events.length;for(;q--;)if(s.events[q][1].start.offset<f&&(!s.events[q][1].end||s.events[q][1].end.offset>f))return;const P=i.events.length;let ce=P,me,B;for(;ce--;)if(i.events[ce][0]==="exit"&&i.events[ce][1].type==="chunkFlow"){if(me){B=i.events[ce][1].end;break}me=!0}for(R(u),q=P;q<i.events.length;)i.events[q][1].end={...B},q++;Yn(i.events,ce+1,0,i.events.slice(P)),i.events.length=q}}function R(U){let te=a.length;for(;te-- >U;){const le=a[te];i.containerState=le[1],le[0].exit.call(i,t)}a.length=U}function X(){s.write([null]),c=void 0,s=void 0,i.containerState._closeFlow=void 0}}function kx(t,i,a){return De(t,t.attempt(this.parser.constructs.document,i,a),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Ti(t){if(t===null||Xe(t)||Ml(t))return 1;if(zu(t))return 2}function Ru(t,i,a){const u=[];let s=-1;for(;++s<t.length;){const c=t[s].resolveAll;c&&!u.includes(c)&&(i=c(i,a),u.push(c))}return i}const zc={name:"attention",resolveAll:Cx,tokenize:Ax};function Cx(t,i){let a=-1,u,s,c,f,m,p,d,b;for(;++a<t.length;)if(t[a][0]==="enter"&&t[a][1].type==="attentionSequence"&&t[a][1]._close){for(u=a;u--;)if(t[u][0]==="exit"&&t[u][1].type==="attentionSequence"&&t[u][1]._open&&i.sliceSerialize(t[u][1]).charCodeAt(0)===i.sliceSerialize(t[a][1]).charCodeAt(0)){if((t[u][1]._close||t[a][1]._open)&&(t[a][1].end.offset-t[a][1].start.offset)%3&&!((t[u][1].end.offset-t[u][1].start.offset+t[a][1].end.offset-t[a][1].start.offset)%3))continue;p=t[u][1].end.offset-t[u][1].start.offset>1&&t[a][1].end.offset-t[a][1].start.offset>1?2:1;const g={...t[u][1].end},S={...t[a][1].start};Lp(g,-p),Lp(S,p),f={type:p>1?"strongSequence":"emphasisSequence",start:g,end:{...t[u][1].end}},m={type:p>1?"strongSequence":"emphasisSequence",start:{...t[a][1].start},end:S},c={type:p>1?"strongText":"emphasisText",start:{...t[u][1].end},end:{...t[a][1].start}},s={type:p>1?"strong":"emphasis",start:{...f.start},end:{...m.end}},t[u][1].end={...f.start},t[a][1].start={...m.end},d=[],t[u][1].end.offset-t[u][1].start.offset&&(d=$n(d,[["enter",t[u][1],i],["exit",t[u][1],i]])),d=$n(d,[["enter",s,i],["enter",f,i],["exit",f,i],["enter",c,i]]),d=$n(d,Ru(i.parser.constructs.insideSpan.null,t.slice(u+1,a),i)),d=$n(d,[["exit",c,i],["enter",m,i],["exit",m,i],["exit",s,i]]),t[a][1].end.offset-t[a][1].start.offset?(b=2,d=$n(d,[["enter",t[a][1],i],["exit",t[a][1],i]])):b=0,Yn(t,u-1,a-u+3,d),a=u+d.length-b-2;break}}for(a=-1;++a<t.length;)t[a][1].type==="attentionSequence"&&(t[a][1].type="data");return t}function Ax(t,i){const a=this.parser.constructs.attentionMarkers.null,u=this.previous,s=Ti(u);let c;return f;function f(p){return c=p,t.enter("attentionSequence"),m(p)}function m(p){if(p===c)return t.consume(p),m;const d=t.exit("attentionSequence"),b=Ti(p),g=!b||b===2&&s||a.includes(p),S=!s||s===2&&b||a.includes(u);return d._open=!!(c===42?g:g&&(s||!S)),d._close=!!(c===42?S:S&&(b||!g)),i(p)}}function Lp(t,i){t.column+=i,t.offset+=i,t._bufferIndex+=i}const wx={name:"autolink",tokenize:Tx};function Tx(t,i,a){let u=0;return s;function s(x){return t.enter("autolink"),t.enter("autolinkMarker"),t.consume(x),t.exit("autolinkMarker"),t.enter("autolinkProtocol"),c}function c(x){return Sn(x)?(t.consume(x),f):x===64?a(x):d(x)}function f(x){return x===43||x===45||x===46||gn(x)?(u=1,m(x)):d(x)}function m(x){return x===58?(t.consume(x),u=0,p):(x===43||x===45||x===46||gn(x))&&u++<32?(t.consume(x),m):(u=0,d(x))}function p(x){return x===62?(t.exit("autolinkProtocol"),t.enter("autolinkMarker"),t.consume(x),t.exit("autolinkMarker"),t.exit("autolink"),i):x===null||x===32||x===60||Eu(x)?a(x):(t.consume(x),p)}function d(x){return x===64?(t.consume(x),b):gx(x)?(t.consume(x),d):a(x)}function b(x){return gn(x)?g(x):a(x)}function g(x){return x===46?(t.consume(x),u=0,b):x===62?(t.exit("autolinkProtocol").type="autolinkEmail",t.enter("autolinkMarker"),t.consume(x),t.exit("autolinkMarker"),t.exit("autolink"),i):S(x)}function S(x){if((x===45||gn(x))&&u++<63){const w=x===45?S:g;return t.consume(x),w}return a(x)}}const Qa={partial:!0,tokenize:zx};function zx(t,i,a){return u;function u(c){return Ae(c)?De(t,s,"linePrefix")(c):s(c)}function s(c){return c===null||fe(c)?i(c):a(c)}}const ty={continuation:{tokenize:Dx},exit:Mx,name:"blockQuote",tokenize:Rx};function Rx(t,i,a){const u=this;return s;function s(f){if(f===62){const m=u.containerState;return m.open||(t.enter("blockQuote",{_container:!0}),m.open=!0),t.enter("blockQuotePrefix"),t.enter("blockQuoteMarker"),t.consume(f),t.exit("blockQuoteMarker"),c}return a(f)}function c(f){return Ae(f)?(t.enter("blockQuotePrefixWhitespace"),t.consume(f),t.exit("blockQuotePrefixWhitespace"),t.exit("blockQuotePrefix"),i):(t.exit("blockQuotePrefix"),i(f))}}function Dx(t,i,a){const u=this;return s;function s(f){return Ae(f)?De(t,c,"linePrefix",u.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(f):c(f)}function c(f){return t.attempt(ty,i,a)(f)}}function Mx(t){t.exit("blockQuote")}const ly={name:"characterEscape",tokenize:_x};function _x(t,i,a){return u;function u(c){return t.enter("characterEscape"),t.enter("escapeMarker"),t.consume(c),t.exit("escapeMarker"),s}function s(c){return bx(c)?(t.enter("characterEscapeValue"),t.consume(c),t.exit("characterEscapeValue"),t.exit("characterEscape"),i):a(c)}}const iy={name:"characterReference",tokenize:Ox};function Ox(t,i,a){const u=this;let s=0,c,f;return m;function m(g){return t.enter("characterReference"),t.enter("characterReferenceMarker"),t.consume(g),t.exit("characterReferenceMarker"),p}function p(g){return g===35?(t.enter("characterReferenceMarkerNumeric"),t.consume(g),t.exit("characterReferenceMarkerNumeric"),d):(t.enter("characterReferenceValue"),c=31,f=gn,b(g))}function d(g){return g===88||g===120?(t.enter("characterReferenceMarkerHexadecimal"),t.consume(g),t.exit("characterReferenceMarkerHexadecimal"),t.enter("characterReferenceValue"),c=6,f=yx,b):(t.enter("characterReferenceValue"),c=7,f=Tc,b(g))}function b(g){if(g===59&&s){const S=t.exit("characterReferenceValue");return f===gn&&!Kc(u.sliceSerialize(S))?a(g):(t.enter("characterReferenceMarker"),t.consume(g),t.exit("characterReferenceMarker"),t.exit("characterReference"),i)}return f(g)&&s++<c?(t.consume(g),b):a(g)}}const Bp={partial:!0,tokenize:jx},Up={concrete:!0,name:"codeFenced",tokenize:Nx};function Nx(t,i,a){const u=this,s={partial:!0,tokenize:le};let c=0,f=0,m;return p;function p(q){return d(q)}function d(q){const P=u.events[u.events.length-1];return c=P&&P[1].type==="linePrefix"?P[2].sliceSerialize(P[1],!0).length:0,m=q,t.enter("codeFenced"),t.enter("codeFencedFence"),t.enter("codeFencedFenceSequence"),b(q)}function b(q){return q===m?(f++,t.consume(q),b):f<3?a(q):(t.exit("codeFencedFenceSequence"),Ae(q)?De(t,g,"whitespace")(q):g(q))}function g(q){return q===null||fe(q)?(t.exit("codeFencedFence"),u.interrupt?i(q):t.check(Bp,_,te)(q)):(t.enter("codeFencedFenceInfo"),t.enter("chunkString",{contentType:"string"}),S(q))}function S(q){return q===null||fe(q)?(t.exit("chunkString"),t.exit("codeFencedFenceInfo"),g(q)):Ae(q)?(t.exit("chunkString"),t.exit("codeFencedFenceInfo"),De(t,x,"whitespace")(q)):q===96&&q===m?a(q):(t.consume(q),S)}function x(q){return q===null||fe(q)?g(q):(t.enter("codeFencedFenceMeta"),t.enter("chunkString",{contentType:"string"}),w(q))}function w(q){return q===null||fe(q)?(t.exit("chunkString"),t.exit("codeFencedFenceMeta"),g(q)):q===96&&q===m?a(q):(t.consume(q),w)}function _(q){return t.attempt(s,te,D)(q)}function D(q){return t.enter("lineEnding"),t.consume(q),t.exit("lineEnding"),R}function R(q){return c>0&&Ae(q)?De(t,X,"linePrefix",c+1)(q):X(q)}function X(q){return q===null||fe(q)?t.check(Bp,_,te)(q):(t.enter("codeFlowValue"),U(q))}function U(q){return q===null||fe(q)?(t.exit("codeFlowValue"),X(q)):(t.consume(q),U)}function te(q){return t.exit("codeFenced"),i(q)}function le(q,P,ce){let me=0;return B;function B(K){return q.enter("lineEnding"),q.consume(K),q.exit("lineEnding"),ne}function ne(K){return q.enter("codeFencedFence"),Ae(K)?De(q,ee,"linePrefix",u.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(K):ee(K)}function ee(K){return K===m?(q.enter("codeFencedFenceSequence"),xe(K)):ce(K)}function xe(K){return K===m?(me++,q.consume(K),xe):me>=f?(q.exit("codeFencedFenceSequence"),Ae(K)?De(q,ae,"whitespace")(K):ae(K)):ce(K)}function ae(K){return K===null||fe(K)?(q.exit("codeFencedFence"),P(K)):ce(K)}}}function jx(t,i,a){const u=this;return s;function s(f){return f===null?a(f):(t.enter("lineEnding"),t.consume(f),t.exit("lineEnding"),c)}function c(f){return u.parser.lazy[u.now().line]?a(f):i(f)}}const uc={name:"codeIndented",tokenize:Bx},Lx={partial:!0,tokenize:Ux};function Bx(t,i,a){const u=this;return s;function s(d){return t.enter("codeIndented"),De(t,c,"linePrefix",5)(d)}function c(d){const b=u.events[u.events.length-1];return b&&b[1].type==="linePrefix"&&b[2].sliceSerialize(b[1],!0).length>=4?f(d):a(d)}function f(d){return d===null?p(d):fe(d)?t.attempt(Lx,f,p)(d):(t.enter("codeFlowValue"),m(d))}function m(d){return d===null||fe(d)?(t.exit("codeFlowValue"),f(d)):(t.consume(d),m)}function p(d){return t.exit("codeIndented"),i(d)}}function Ux(t,i,a){const u=this;return s;function s(f){return u.parser.lazy[u.now().line]?a(f):fe(f)?(t.enter("lineEnding"),t.consume(f),t.exit("lineEnding"),s):De(t,c,"linePrefix",5)(f)}function c(f){const m=u.events[u.events.length-1];return m&&m[1].type==="linePrefix"&&m[2].sliceSerialize(m[1],!0).length>=4?i(f):fe(f)?s(f):a(f)}}const Hx={name:"codeText",previous:Yx,resolve:qx,tokenize:Vx};function qx(t){let i=t.length-4,a=3,u,s;if((t[a][1].type==="lineEnding"||t[a][1].type==="space")&&(t[i][1].type==="lineEnding"||t[i][1].type==="space")){for(u=a;++u<i;)if(t[u][1].type==="codeTextData"){t[a][1].type="codeTextPadding",t[i][1].type="codeTextPadding",a+=2,i-=2;break}}for(u=a-1,i++;++u<=i;)s===void 0?u!==i&&t[u][1].type!=="lineEnding"&&(s=u):(u===i||t[u][1].type==="lineEnding")&&(t[s][1].type="codeTextData",u!==s+2&&(t[s][1].end=t[u-1][1].end,t.splice(s+2,u-s-2),i-=u-s-2,u=s+2),s=void 0);return t}function Yx(t){return t!==96||this.events[this.events.length-1][1].type==="characterEscape"}function Vx(t,i,a){let u=0,s,c;return f;function f(g){return t.enter("codeText"),t.enter("codeTextSequence"),m(g)}function m(g){return g===96?(t.consume(g),u++,m):(t.exit("codeTextSequence"),p(g))}function p(g){return g===null?a(g):g===32?(t.enter("space"),t.consume(g),t.exit("space"),p):g===96?(c=t.enter("codeTextSequence"),s=0,b(g)):fe(g)?(t.enter("lineEnding"),t.consume(g),t.exit("lineEnding"),p):(t.enter("codeTextData"),d(g))}function d(g){return g===null||g===32||g===96||fe(g)?(t.exit("codeTextData"),p(g)):(t.consume(g),d)}function b(g){return g===96?(t.consume(g),s++,b):s===u?(t.exit("codeTextSequence"),t.exit("codeText"),i(g)):(c.type="codeTextData",d(g))}}class Xx{constructor(i){this.left=i?[...i]:[],this.right=[]}get(i){if(i<0||i>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+i+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return i<this.left.length?this.left[i]:this.right[this.right.length-i+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(i,a){const u=a??Number.POSITIVE_INFINITY;return u<this.left.length?this.left.slice(i,u):i>this.left.length?this.right.slice(this.right.length-u+this.left.length,this.right.length-i+this.left.length).reverse():this.left.slice(i).concat(this.right.slice(this.right.length-u+this.left.length).reverse())}splice(i,a,u){const s=a||0;this.setCursor(Math.trunc(i));const c=this.right.splice(this.right.length-s,Number.POSITIVE_INFINITY);return u&&Ma(this.left,u),c.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(i){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(i)}pushMany(i){this.setCursor(Number.POSITIVE_INFINITY),Ma(this.left,i)}unshift(i){this.setCursor(0),this.right.push(i)}unshiftMany(i){this.setCursor(0),Ma(this.right,i.reverse())}setCursor(i){if(!(i===this.left.length||i>this.left.length&&this.right.length===0||i<0&&this.left.length===0))if(i<this.left.length){const a=this.left.splice(i,Number.POSITIVE_INFINITY);Ma(this.right,a.reverse())}else{const a=this.right.splice(this.left.length+this.right.length-i,Number.POSITIVE_INFINITY);Ma(this.left,a.reverse())}}}function Ma(t,i){let a=0;if(i.length<1e4)t.push(...i);else for(;a<i.length;)t.push(...i.slice(a,a+1e4)),a+=1e4}function ay(t){const i={};let a=-1,u,s,c,f,m,p,d;const b=new Xx(t);for(;++a<b.length;){for(;a in i;)a=i[a];if(u=b.get(a),a&&u[1].type==="chunkFlow"&&b.get(a-1)[1].type==="listItemPrefix"&&(p=u[1]._tokenizer.events,c=0,c<p.length&&p[c][1].type==="lineEndingBlank"&&(c+=2),c<p.length&&p[c][1].type==="content"))for(;++c<p.length&&p[c][1].type!=="content";)p[c][1].type==="chunkText"&&(p[c][1]._isInFirstContentOfListItem=!0,c++);if(u[0]==="enter")u[1].contentType&&(Object.assign(i,Gx(b,a)),a=i[a],d=!0);else if(u[1]._container){for(c=a,s=void 0;c--;)if(f=b.get(c),f[1].type==="lineEnding"||f[1].type==="lineEndingBlank")f[0]==="enter"&&(s&&(b.get(s)[1].type="lineEndingBlank"),f[1].type="lineEnding",s=c);else if(!(f[1].type==="linePrefix"||f[1].type==="listItemIndent"))break;s&&(u[1].end={...b.get(s)[1].start},m=b.slice(s,a),m.unshift(u),b.splice(s,a-s+1,m))}}return Yn(t,0,Number.POSITIVE_INFINITY,b.slice(0)),!d}function Gx(t,i){const a=t.get(i)[1],u=t.get(i)[2];let s=i-1;const c=[];let f=a._tokenizer;f||(f=u.parser[a.contentType](a.start),a._contentTypeTextTrailing&&(f._contentTypeTextTrailing=!0));const m=f.events,p=[],d={};let b,g,S=-1,x=a,w=0,_=0;const D=[_];for(;x;){for(;t.get(++s)[1]!==x;);c.push(s),x._tokenizer||(b=u.sliceStream(x),x.next||b.push(null),g&&f.defineSkip(x.start),x._isInFirstContentOfListItem&&(f._gfmTasklistFirstContentOfListItem=!0),f.write(b),x._isInFirstContentOfListItem&&(f._gfmTasklistFirstContentOfListItem=void 0)),g=x,x=x.next}for(x=a;++S<m.length;)m[S][0]==="exit"&&m[S-1][0]==="enter"&&m[S][1].type===m[S-1][1].type&&m[S][1].start.line!==m[S][1].end.line&&(_=S+1,D.push(_),x._tokenizer=void 0,x.previous=void 0,x=x.next);for(f.events=[],x?(x._tokenizer=void 0,x.previous=void 0):D.pop(),S=D.length;S--;){const R=m.slice(D[S],D[S+1]),X=c.pop();p.push([X,X+R.length-1]),t.splice(X,2,R)}for(p.reverse(),S=-1;++S<p.length;)d[w+p[S][0]]=w+p[S][1],w+=p[S][1]-p[S][0]-1;return d}const Qx={resolve:Ix,tokenize:Zx},Fx={partial:!0,tokenize:Kx};function Ix(t){return ay(t),t}function Zx(t,i){let a;return u;function u(m){return t.enter("content"),a=t.enter("chunkContent",{contentType:"content"}),s(m)}function s(m){return m===null?c(m):fe(m)?t.check(Fx,f,c)(m):(t.consume(m),s)}function c(m){return t.exit("chunkContent"),t.exit("content"),i(m)}function f(m){return t.consume(m),t.exit("chunkContent"),a.next=t.enter("chunkContent",{contentType:"content",previous:a}),a=a.next,s}}function Kx(t,i,a){const u=this;return s;function s(f){return t.exit("chunkContent"),t.enter("lineEnding"),t.consume(f),t.exit("lineEnding"),De(t,c,"linePrefix")}function c(f){if(f===null||fe(f))return a(f);const m=u.events[u.events.length-1];return!u.parser.constructs.disable.null.includes("codeIndented")&&m&&m[1].type==="linePrefix"&&m[2].sliceSerialize(m[1],!0).length>=4?i(f):t.interrupt(u.parser.constructs.flow,a,i)(f)}}function ry(t,i,a,u,s,c,f,m,p){const d=p||Number.POSITIVE_INFINITY;let b=0;return g;function g(R){return R===60?(t.enter(u),t.enter(s),t.enter(c),t.consume(R),t.exit(c),S):R===null||R===32||R===41||Eu(R)?a(R):(t.enter(u),t.enter(f),t.enter(m),t.enter("chunkString",{contentType:"string"}),_(R))}function S(R){return R===62?(t.enter(c),t.consume(R),t.exit(c),t.exit(s),t.exit(u),i):(t.enter(m),t.enter("chunkString",{contentType:"string"}),x(R))}function x(R){return R===62?(t.exit("chunkString"),t.exit(m),S(R)):R===null||R===60||fe(R)?a(R):(t.consume(R),R===92?w:x)}function w(R){return R===60||R===62||R===92?(t.consume(R),x):x(R)}function _(R){return!b&&(R===null||R===41||Xe(R))?(t.exit("chunkString"),t.exit(m),t.exit(f),t.exit(u),i(R)):b<d&&R===40?(t.consume(R),b++,_):R===41?(t.consume(R),b--,_):R===null||R===32||R===40||Eu(R)?a(R):(t.consume(R),R===92?D:_)}function D(R){return R===40||R===41||R===92?(t.consume(R),_):_(R)}}function uy(t,i,a,u,s,c){const f=this;let m=0,p;return d;function d(x){return t.enter(u),t.enter(s),t.consume(x),t.exit(s),t.enter(c),b}function b(x){return m>999||x===null||x===91||x===93&&!p||x===94&&!m&&"_hiddenFootnoteSupport"in f.parser.constructs?a(x):x===93?(t.exit(c),t.enter(s),t.consume(x),t.exit(s),t.exit(u),i):fe(x)?(t.enter("lineEnding"),t.consume(x),t.exit("lineEnding"),b):(t.enter("chunkString",{contentType:"string"}),g(x))}function g(x){return x===null||x===91||x===93||fe(x)||m++>999?(t.exit("chunkString"),b(x)):(t.consume(x),p||(p=!Ae(x)),x===92?S:g)}function S(x){return x===91||x===92||x===93?(t.consume(x),m++,g):g(x)}}function oy(t,i,a,u,s,c){let f;return m;function m(S){return S===34||S===39||S===40?(t.enter(u),t.enter(s),t.consume(S),t.exit(s),f=S===40?41:S,p):a(S)}function p(S){return S===f?(t.enter(s),t.consume(S),t.exit(s),t.exit(u),i):(t.enter(c),d(S))}function d(S){return S===f?(t.exit(c),p(f)):S===null?a(S):fe(S)?(t.enter("lineEnding"),t.consume(S),t.exit("lineEnding"),De(t,d,"linePrefix")):(t.enter("chunkString",{contentType:"string"}),b(S))}function b(S){return S===f||S===null||fe(S)?(t.exit("chunkString"),d(S)):(t.consume(S),S===92?g:b)}function g(S){return S===f||S===92?(t.consume(S),b):b(S)}}function Na(t,i){let a;return u;function u(s){return fe(s)?(t.enter("lineEnding"),t.consume(s),t.exit("lineEnding"),a=!0,u):Ae(s)?De(t,u,a?"linePrefix":"lineSuffix")(s):i(s)}}const Jx={name:"definition",tokenize:Px},Wx={partial:!0,tokenize:$x};function Px(t,i,a){const u=this;let s;return c;function c(x){return t.enter("definition"),f(x)}function f(x){return uy.call(u,t,m,a,"definitionLabel","definitionLabelMarker","definitionLabelString")(x)}function m(x){return s=at(u.sliceSerialize(u.events[u.events.length-1][1]).slice(1,-1)),x===58?(t.enter("definitionMarker"),t.consume(x),t.exit("definitionMarker"),p):a(x)}function p(x){return Xe(x)?Na(t,d)(x):d(x)}function d(x){return ry(t,b,a,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(x)}function b(x){return t.attempt(Wx,g,g)(x)}function g(x){return Ae(x)?De(t,S,"whitespace")(x):S(x)}function S(x){return x===null||fe(x)?(t.exit("definition"),u.parser.defined.push(s),i(x)):a(x)}}function $x(t,i,a){return u;function u(m){return Xe(m)?Na(t,s)(m):a(m)}function s(m){return oy(t,c,a,"definitionTitle","definitionTitleMarker","definitionTitleString")(m)}function c(m){return Ae(m)?De(t,f,"whitespace")(m):f(m)}function f(m){return m===null||fe(m)?i(m):a(m)}}const eS={name:"hardBreakEscape",tokenize:nS};function nS(t,i,a){return u;function u(c){return t.enter("hardBreakEscape"),t.consume(c),s}function s(c){return fe(c)?(t.exit("hardBreakEscape"),i(c)):a(c)}}const tS={name:"headingAtx",resolve:lS,tokenize:iS};function lS(t,i){let a=t.length-2,u=3,s,c;return t[u][1].type==="whitespace"&&(u+=2),a-2>u&&t[a][1].type==="whitespace"&&(a-=2),t[a][1].type==="atxHeadingSequence"&&(u===a-1||a-4>u&&t[a-2][1].type==="whitespace")&&(a-=u+1===a?2:4),a>u&&(s={type:"atxHeadingText",start:t[u][1].start,end:t[a][1].end},c={type:"chunkText",start:t[u][1].start,end:t[a][1].end,contentType:"text"},Yn(t,u,a-u+1,[["enter",s,i],["enter",c,i],["exit",c,i],["exit",s,i]])),t}function iS(t,i,a){let u=0;return s;function s(b){return t.enter("atxHeading"),c(b)}function c(b){return t.enter("atxHeadingSequence"),f(b)}function f(b){return b===35&&u++<6?(t.consume(b),f):b===null||Xe(b)?(t.exit("atxHeadingSequence"),m(b)):a(b)}function m(b){return b===35?(t.enter("atxHeadingSequence"),p(b)):b===null||fe(b)?(t.exit("atxHeading"),i(b)):Ae(b)?De(t,m,"whitespace")(b):(t.enter("atxHeadingText"),d(b))}function p(b){return b===35?(t.consume(b),p):(t.exit("atxHeadingSequence"),m(b))}function d(b){return b===null||b===35||Xe(b)?(t.exit("atxHeadingText"),m(b)):(t.consume(b),d)}}const aS=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Hp=["pre","script","style","textarea"],rS={concrete:!0,name:"htmlFlow",resolveTo:sS,tokenize:cS},uS={partial:!0,tokenize:hS},oS={partial:!0,tokenize:fS};function sS(t){let i=t.length;for(;i--&&!(t[i][0]==="enter"&&t[i][1].type==="htmlFlow"););return i>1&&t[i-2][1].type==="linePrefix"&&(t[i][1].start=t[i-2][1].start,t[i+1][1].start=t[i-2][1].start,t.splice(i-2,2)),t}function cS(t,i,a){const u=this;let s,c,f,m,p;return d;function d(k){return b(k)}function b(k){return t.enter("htmlFlow"),t.enter("htmlFlowData"),t.consume(k),g}function g(k){return k===33?(t.consume(k),S):k===47?(t.consume(k),c=!0,_):k===63?(t.consume(k),s=3,u.interrupt?i:C):Sn(k)?(t.consume(k),f=String.fromCharCode(k),D):a(k)}function S(k){return k===45?(t.consume(k),s=2,x):k===91?(t.consume(k),s=5,m=0,w):Sn(k)?(t.consume(k),s=4,u.interrupt?i:C):a(k)}function x(k){return k===45?(t.consume(k),u.interrupt?i:C):a(k)}function w(k){const $="CDATA[";return k===$.charCodeAt(m++)?(t.consume(k),m===$.length?u.interrupt?i:ee:w):a(k)}function _(k){return Sn(k)?(t.consume(k),f=String.fromCharCode(k),D):a(k)}function D(k){if(k===null||k===47||k===62||Xe(k)){const $=k===47,de=f.toLowerCase();return!$&&!c&&Hp.includes(de)?(s=1,u.interrupt?i(k):ee(k)):aS.includes(f.toLowerCase())?(s=6,$?(t.consume(k),R):u.interrupt?i(k):ee(k)):(s=7,u.interrupt&&!u.parser.lazy[u.now().line]?a(k):c?X(k):U(k))}return k===45||gn(k)?(t.consume(k),f+=String.fromCharCode(k),D):a(k)}function R(k){return k===62?(t.consume(k),u.interrupt?i:ee):a(k)}function X(k){return Ae(k)?(t.consume(k),X):B(k)}function U(k){return k===47?(t.consume(k),B):k===58||k===95||Sn(k)?(t.consume(k),te):Ae(k)?(t.consume(k),U):B(k)}function te(k){return k===45||k===46||k===58||k===95||gn(k)?(t.consume(k),te):le(k)}function le(k){return k===61?(t.consume(k),q):Ae(k)?(t.consume(k),le):U(k)}function q(k){return k===null||k===60||k===61||k===62||k===96?a(k):k===34||k===39?(t.consume(k),p=k,P):Ae(k)?(t.consume(k),q):ce(k)}function P(k){return k===p?(t.consume(k),p=null,me):k===null||fe(k)?a(k):(t.consume(k),P)}function ce(k){return k===null||k===34||k===39||k===47||k===60||k===61||k===62||k===96||Xe(k)?le(k):(t.consume(k),ce)}function me(k){return k===47||k===62||Ae(k)?U(k):a(k)}function B(k){return k===62?(t.consume(k),ne):a(k)}function ne(k){return k===null||fe(k)?ee(k):Ae(k)?(t.consume(k),ne):a(k)}function ee(k){return k===45&&s===2?(t.consume(k),L):k===60&&s===1?(t.consume(k),Z):k===62&&s===4?(t.consume(k),T):k===63&&s===3?(t.consume(k),C):k===93&&s===5?(t.consume(k),Se):fe(k)&&(s===6||s===7)?(t.exit("htmlFlowData"),t.check(uS,G,xe)(k)):k===null||fe(k)?(t.exit("htmlFlowData"),xe(k)):(t.consume(k),ee)}function xe(k){return t.check(oS,ae,G)(k)}function ae(k){return t.enter("lineEnding"),t.consume(k),t.exit("lineEnding"),K}function K(k){return k===null||fe(k)?xe(k):(t.enter("htmlFlowData"),ee(k))}function L(k){return k===45?(t.consume(k),C):ee(k)}function Z(k){return k===47?(t.consume(k),f="",ue):ee(k)}function ue(k){if(k===62){const $=f.toLowerCase();return Hp.includes($)?(t.consume(k),T):ee(k)}return Sn(k)&&f.length<8?(t.consume(k),f+=String.fromCharCode(k),ue):ee(k)}function Se(k){return k===93?(t.consume(k),C):ee(k)}function C(k){return k===62?(t.consume(k),T):k===45&&s===2?(t.consume(k),C):ee(k)}function T(k){return k===null||fe(k)?(t.exit("htmlFlowData"),G(k)):(t.consume(k),T)}function G(k){return t.exit("htmlFlow"),i(k)}}function fS(t,i,a){const u=this;return s;function s(f){return fe(f)?(t.enter("lineEnding"),t.consume(f),t.exit("lineEnding"),c):a(f)}function c(f){return u.parser.lazy[u.now().line]?a(f):i(f)}}function hS(t,i,a){return u;function u(s){return t.enter("lineEnding"),t.consume(s),t.exit("lineEnding"),t.attempt(Qa,i,a)}}const dS={name:"htmlText",tokenize:mS};function mS(t,i,a){const u=this;let s,c,f;return m;function m(C){return t.enter("htmlText"),t.enter("htmlTextData"),t.consume(C),p}function p(C){return C===33?(t.consume(C),d):C===47?(t.consume(C),le):C===63?(t.consume(C),U):Sn(C)?(t.consume(C),ce):a(C)}function d(C){return C===45?(t.consume(C),b):C===91?(t.consume(C),c=0,w):Sn(C)?(t.consume(C),X):a(C)}function b(C){return C===45?(t.consume(C),x):a(C)}function g(C){return C===null?a(C):C===45?(t.consume(C),S):fe(C)?(f=g,Z(C)):(t.consume(C),g)}function S(C){return C===45?(t.consume(C),x):g(C)}function x(C){return C===62?L(C):C===45?S(C):g(C)}function w(C){const T="CDATA[";return C===T.charCodeAt(c++)?(t.consume(C),c===T.length?_:w):a(C)}function _(C){return C===null?a(C):C===93?(t.consume(C),D):fe(C)?(f=_,Z(C)):(t.consume(C),_)}function D(C){return C===93?(t.consume(C),R):_(C)}function R(C){return C===62?L(C):C===93?(t.consume(C),R):_(C)}function X(C){return C===null||C===62?L(C):fe(C)?(f=X,Z(C)):(t.consume(C),X)}function U(C){return C===null?a(C):C===63?(t.consume(C),te):fe(C)?(f=U,Z(C)):(t.consume(C),U)}function te(C){return C===62?L(C):U(C)}function le(C){return Sn(C)?(t.consume(C),q):a(C)}function q(C){return C===45||gn(C)?(t.consume(C),q):P(C)}function P(C){return fe(C)?(f=P,Z(C)):Ae(C)?(t.consume(C),P):L(C)}function ce(C){return C===45||gn(C)?(t.consume(C),ce):C===47||C===62||Xe(C)?me(C):a(C)}function me(C){return C===47?(t.consume(C),L):C===58||C===95||Sn(C)?(t.consume(C),B):fe(C)?(f=me,Z(C)):Ae(C)?(t.consume(C),me):L(C)}function B(C){return C===45||C===46||C===58||C===95||gn(C)?(t.consume(C),B):ne(C)}function ne(C){return C===61?(t.consume(C),ee):fe(C)?(f=ne,Z(C)):Ae(C)?(t.consume(C),ne):me(C)}function ee(C){return C===null||C===60||C===61||C===62||C===96?a(C):C===34||C===39?(t.consume(C),s=C,xe):fe(C)?(f=ee,Z(C)):Ae(C)?(t.consume(C),ee):(t.consume(C),ae)}function xe(C){return C===s?(t.consume(C),s=void 0,K):C===null?a(C):fe(C)?(f=xe,Z(C)):(t.consume(C),xe)}function ae(C){return C===null||C===34||C===39||C===60||C===61||C===96?a(C):C===47||C===62||Xe(C)?me(C):(t.consume(C),ae)}function K(C){return C===47||C===62||Xe(C)?me(C):a(C)}function L(C){return C===62?(t.consume(C),t.exit("htmlTextData"),t.exit("htmlText"),i):a(C)}function Z(C){return t.exit("htmlTextData"),t.enter("lineEnding"),t.consume(C),t.exit("lineEnding"),ue}function ue(C){return Ae(C)?De(t,Se,"linePrefix",u.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(C):Se(C)}function Se(C){return t.enter("htmlTextData"),f(C)}}const Jc={name:"labelEnd",resolveAll:bS,resolveTo:vS,tokenize:xS},pS={tokenize:SS},gS={tokenize:ES},yS={tokenize:kS};function bS(t){let i=-1;const a=[];for(;++i<t.length;){const u=t[i][1];if(a.push(t[i]),u.type==="labelImage"||u.type==="labelLink"||u.type==="labelEnd"){const s=u.type==="labelImage"?4:2;u.type="data",i+=s}}return t.length!==a.length&&Yn(t,0,t.length,a),t}function vS(t,i){let a=t.length,u=0,s,c,f,m;for(;a--;)if(s=t[a][1],c){if(s.type==="link"||s.type==="labelLink"&&s._inactive)break;t[a][0]==="enter"&&s.type==="labelLink"&&(s._inactive=!0)}else if(f){if(t[a][0]==="enter"&&(s.type==="labelImage"||s.type==="labelLink")&&!s._balanced&&(c=a,s.type!=="labelLink")){u=2;break}}else s.type==="labelEnd"&&(f=a);const p={type:t[c][1].type==="labelLink"?"link":"image",start:{...t[c][1].start},end:{...t[t.length-1][1].end}},d={type:"label",start:{...t[c][1].start},end:{...t[f][1].end}},b={type:"labelText",start:{...t[c+u+2][1].end},end:{...t[f-2][1].start}};return m=[["enter",p,i],["enter",d,i]],m=$n(m,t.slice(c+1,c+u+3)),m=$n(m,[["enter",b,i]]),m=$n(m,Ru(i.parser.constructs.insideSpan.null,t.slice(c+u+4,f-3),i)),m=$n(m,[["exit",b,i],t[f-2],t[f-1],["exit",d,i]]),m=$n(m,t.slice(f+1)),m=$n(m,[["exit",p,i]]),Yn(t,c,t.length,m),t}function xS(t,i,a){const u=this;let s=u.events.length,c,f;for(;s--;)if((u.events[s][1].type==="labelImage"||u.events[s][1].type==="labelLink")&&!u.events[s][1]._balanced){c=u.events[s][1];break}return m;function m(S){return c?c._inactive?g(S):(f=u.parser.defined.includes(at(u.sliceSerialize({start:c.end,end:u.now()}))),t.enter("labelEnd"),t.enter("labelMarker"),t.consume(S),t.exit("labelMarker"),t.exit("labelEnd"),p):a(S)}function p(S){return S===40?t.attempt(pS,b,f?b:g)(S):S===91?t.attempt(gS,b,f?d:g)(S):f?b(S):g(S)}function d(S){return t.attempt(yS,b,g)(S)}function b(S){return i(S)}function g(S){return c._balanced=!0,a(S)}}function SS(t,i,a){return u;function u(g){return t.enter("resource"),t.enter("resourceMarker"),t.consume(g),t.exit("resourceMarker"),s}function s(g){return Xe(g)?Na(t,c)(g):c(g)}function c(g){return g===41?b(g):ry(t,f,m,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(g)}function f(g){return Xe(g)?Na(t,p)(g):b(g)}function m(g){return a(g)}function p(g){return g===34||g===39||g===40?oy(t,d,a,"resourceTitle","resourceTitleMarker","resourceTitleString")(g):b(g)}function d(g){return Xe(g)?Na(t,b)(g):b(g)}function b(g){return g===41?(t.enter("resourceMarker"),t.consume(g),t.exit("resourceMarker"),t.exit("resource"),i):a(g)}}function ES(t,i,a){const u=this;return s;function s(m){return uy.call(u,t,c,f,"reference","referenceMarker","referenceString")(m)}function c(m){return u.parser.defined.includes(at(u.sliceSerialize(u.events[u.events.length-1][1]).slice(1,-1)))?i(m):a(m)}function f(m){return a(m)}}function kS(t,i,a){return u;function u(c){return t.enter("reference"),t.enter("referenceMarker"),t.consume(c),t.exit("referenceMarker"),s}function s(c){return c===93?(t.enter("referenceMarker"),t.consume(c),t.exit("referenceMarker"),t.exit("reference"),i):a(c)}}const CS={name:"labelStartImage",resolveAll:Jc.resolveAll,tokenize:AS};function AS(t,i,a){const u=this;return s;function s(m){return t.enter("labelImage"),t.enter("labelImageMarker"),t.consume(m),t.exit("labelImageMarker"),c}function c(m){return m===91?(t.enter("labelMarker"),t.consume(m),t.exit("labelMarker"),t.exit("labelImage"),f):a(m)}function f(m){return m===94&&"_hiddenFootnoteSupport"in u.parser.constructs?a(m):i(m)}}const wS={name:"labelStartLink",resolveAll:Jc.resolveAll,tokenize:TS};function TS(t,i,a){const u=this;return s;function s(f){return t.enter("labelLink"),t.enter("labelMarker"),t.consume(f),t.exit("labelMarker"),t.exit("labelLink"),c}function c(f){return f===94&&"_hiddenFootnoteSupport"in u.parser.constructs?a(f):i(f)}}const oc={name:"lineEnding",tokenize:zS};function zS(t,i){return a;function a(u){return t.enter("lineEnding"),t.consume(u),t.exit("lineEnding"),De(t,i,"linePrefix")}}const vu={name:"thematicBreak",tokenize:RS};function RS(t,i,a){let u=0,s;return c;function c(d){return t.enter("thematicBreak"),f(d)}function f(d){return s=d,m(d)}function m(d){return d===s?(t.enter("thematicBreakSequence"),p(d)):u>=3&&(d===null||fe(d))?(t.exit("thematicBreak"),i(d)):a(d)}function p(d){return d===s?(t.consume(d),u++,p):(t.exit("thematicBreakSequence"),Ae(d)?De(t,m,"whitespace")(d):m(d))}}const Dn={continuation:{tokenize:OS},exit:jS,name:"list",tokenize:_S},DS={partial:!0,tokenize:LS},MS={partial:!0,tokenize:NS};function _S(t,i,a){const u=this,s=u.events[u.events.length-1];let c=s&&s[1].type==="linePrefix"?s[2].sliceSerialize(s[1],!0).length:0,f=0;return m;function m(x){const w=u.containerState.type||(x===42||x===43||x===45?"listUnordered":"listOrdered");if(w==="listUnordered"?!u.containerState.marker||x===u.containerState.marker:Tc(x)){if(u.containerState.type||(u.containerState.type=w,t.enter(w,{_container:!0})),w==="listUnordered")return t.enter("listItemPrefix"),x===42||x===45?t.check(vu,a,d)(x):d(x);if(!u.interrupt||x===49)return t.enter("listItemPrefix"),t.enter("listItemValue"),p(x)}return a(x)}function p(x){return Tc(x)&&++f<10?(t.consume(x),p):(!u.interrupt||f<2)&&(u.containerState.marker?x===u.containerState.marker:x===41||x===46)?(t.exit("listItemValue"),d(x)):a(x)}function d(x){return t.enter("listItemMarker"),t.consume(x),t.exit("listItemMarker"),u.containerState.marker=u.containerState.marker||x,t.check(Qa,u.interrupt?a:b,t.attempt(DS,S,g))}function b(x){return u.containerState.initialBlankLine=!0,c++,S(x)}function g(x){return Ae(x)?(t.enter("listItemPrefixWhitespace"),t.consume(x),t.exit("listItemPrefixWhitespace"),S):a(x)}function S(x){return u.containerState.size=c+u.sliceSerialize(t.exit("listItemPrefix"),!0).length,i(x)}}function OS(t,i,a){const u=this;return u.containerState._closeFlow=void 0,t.check(Qa,s,c);function s(m){return u.containerState.furtherBlankLines=u.containerState.furtherBlankLines||u.containerState.initialBlankLine,De(t,i,"listItemIndent",u.containerState.size+1)(m)}function c(m){return u.containerState.furtherBlankLines||!Ae(m)?(u.containerState.furtherBlankLines=void 0,u.containerState.initialBlankLine=void 0,f(m)):(u.containerState.furtherBlankLines=void 0,u.containerState.initialBlankLine=void 0,t.attempt(MS,i,f)(m))}function f(m){return u.containerState._closeFlow=!0,u.interrupt=void 0,De(t,t.attempt(Dn,i,a),"linePrefix",u.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(m)}}function NS(t,i,a){const u=this;return De(t,s,"listItemIndent",u.containerState.size+1);function s(c){const f=u.events[u.events.length-1];return f&&f[1].type==="listItemIndent"&&f[2].sliceSerialize(f[1],!0).length===u.containerState.size?i(c):a(c)}}function jS(t){t.exit(this.containerState.type)}function LS(t,i,a){const u=this;return De(t,s,"listItemPrefixWhitespace",u.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function s(c){const f=u.events[u.events.length-1];return!Ae(c)&&f&&f[1].type==="listItemPrefixWhitespace"?i(c):a(c)}}const qp={name:"setextUnderline",resolveTo:BS,tokenize:US};function BS(t,i){let a=t.length,u,s,c;for(;a--;)if(t[a][0]==="enter"){if(t[a][1].type==="content"){u=a;break}t[a][1].type==="paragraph"&&(s=a)}else t[a][1].type==="content"&&t.splice(a,1),!c&&t[a][1].type==="definition"&&(c=a);const f={type:"setextHeading",start:{...t[u][1].start},end:{...t[t.length-1][1].end}};return t[s][1].type="setextHeadingText",c?(t.splice(s,0,["enter",f,i]),t.splice(c+1,0,["exit",t[u][1],i]),t[u][1].end={...t[c][1].end}):t[u][1]=f,t.push(["exit",f,i]),t}function US(t,i,a){const u=this;let s;return c;function c(d){let b=u.events.length,g;for(;b--;)if(u.events[b][1].type!=="lineEnding"&&u.events[b][1].type!=="linePrefix"&&u.events[b][1].type!=="content"){g=u.events[b][1].type==="paragraph";break}return!u.parser.lazy[u.now().line]&&(u.interrupt||g)?(t.enter("setextHeadingLine"),s=d,f(d)):a(d)}function f(d){return t.enter("setextHeadingLineSequence"),m(d)}function m(d){return d===s?(t.consume(d),m):(t.exit("setextHeadingLineSequence"),Ae(d)?De(t,p,"lineSuffix")(d):p(d))}function p(d){return d===null||fe(d)?(t.exit("setextHeadingLine"),i(d)):a(d)}}const HS={tokenize:qS};function qS(t){const i=this,a=t.attempt(Qa,u,t.attempt(this.parser.constructs.flowInitial,s,De(t,t.attempt(this.parser.constructs.flow,s,t.attempt(Qx,s)),"linePrefix")));return a;function u(c){if(c===null){t.consume(c);return}return t.enter("lineEndingBlank"),t.consume(c),t.exit("lineEndingBlank"),i.currentConstruct=void 0,a}function s(c){if(c===null){t.consume(c);return}return t.enter("lineEnding"),t.consume(c),t.exit("lineEnding"),i.currentConstruct=void 0,a}}const YS={resolveAll:cy()},VS=sy("string"),XS=sy("text");function sy(t){return{resolveAll:cy(t==="text"?GS:void 0),tokenize:i};function i(a){const u=this,s=this.parser.constructs[t],c=a.attempt(s,f,m);return f;function f(b){return d(b)?c(b):m(b)}function m(b){if(b===null){a.consume(b);return}return a.enter("data"),a.consume(b),p}function p(b){return d(b)?(a.exit("data"),c(b)):(a.consume(b),p)}function d(b){if(b===null)return!0;const g=s[b];let S=-1;if(g)for(;++S<g.length;){const x=g[S];if(!x.previous||x.previous.call(u,u.previous))return!0}return!1}}}function cy(t){return i;function i(a,u){let s=-1,c;for(;++s<=a.length;)c===void 0?a[s]&&a[s][1].type==="data"&&(c=s,s++):(!a[s]||a[s][1].type!=="data")&&(s!==c+2&&(a[c][1].end=a[s-1][1].end,a.splice(c+2,s-c-2),s=c+2),c=void 0);return t?t(a,u):a}}function GS(t,i){let a=0;for(;++a<=t.length;)if((a===t.length||t[a][1].type==="lineEnding")&&t[a-1][1].type==="data"){const u=t[a-1][1],s=i.sliceStream(u);let c=s.length,f=-1,m=0,p;for(;c--;){const d=s[c];if(typeof d=="string"){for(f=d.length;d.charCodeAt(f-1)===32;)m++,f--;if(f)break;f=-1}else if(d===-2)p=!0,m++;else if(d!==-1){c++;break}}if(i._contentTypeTextTrailing&&a===t.length&&(m=0),m){const d={type:a===t.length||p||m<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:c?f:u.start._bufferIndex+f,_index:u.start._index+c,line:u.end.line,column:u.end.column-m,offset:u.end.offset-m},end:{...u.end}};u.end={...d.start},u.start.offset===u.end.offset?Object.assign(u,d):(t.splice(a,0,["enter",d,i],["exit",d,i]),a+=2)}a++}return t}const QS={42:Dn,43:Dn,45:Dn,48:Dn,49:Dn,50:Dn,51:Dn,52:Dn,53:Dn,54:Dn,55:Dn,56:Dn,57:Dn,62:ty},FS={91:Jx},IS={[-2]:uc,[-1]:uc,32:uc},ZS={35:tS,42:vu,45:[qp,vu],60:rS,61:qp,95:vu,96:Up,126:Up},KS={38:iy,92:ly},JS={[-5]:oc,[-4]:oc,[-3]:oc,33:CS,38:iy,42:zc,60:[wx,dS],91:wS,92:[eS,ly],93:Jc,95:zc,96:Hx},WS={null:[zc,YS]},PS={null:[42,95]},$S={null:[]},eE=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:PS,contentInitial:FS,disable:$S,document:QS,flow:ZS,flowInitial:IS,insideSpan:WS,string:KS,text:JS},Symbol.toStringTag,{value:"Module"}));function nE(t,i,a){let u={_bufferIndex:-1,_index:0,line:a&&a.line||1,column:a&&a.column||1,offset:a&&a.offset||0};const s={},c=[];let f=[],m=[];const p={attempt:P(le),check:P(q),consume:X,enter:U,exit:te,interrupt:P(q,{interrupt:!0})},d={code:null,containerState:{},defineSkip:_,events:[],now:w,parser:t,previous:null,sliceSerialize:S,sliceStream:x,write:g};let b=i.tokenize.call(d,p);return i.resolveAll&&c.push(i),d;function g(ne){return f=$n(f,ne),D(),f[f.length-1]!==null?[]:(ce(i,0),d.events=Ru(c,d.events,d),d.events)}function S(ne,ee){return lE(x(ne),ee)}function x(ne){return tE(f,ne)}function w(){const{_bufferIndex:ne,_index:ee,line:xe,column:ae,offset:K}=u;return{_bufferIndex:ne,_index:ee,line:xe,column:ae,offset:K}}function _(ne){s[ne.line]=ne.column,B()}function D(){let ne;for(;u._index<f.length;){const ee=f[u._index];if(typeof ee=="string")for(ne=u._index,u._bufferIndex<0&&(u._bufferIndex=0);u._index===ne&&u._bufferIndex<ee.length;)R(ee.charCodeAt(u._bufferIndex));else R(ee)}}function R(ne){b=b(ne)}function X(ne){fe(ne)?(u.line++,u.column=1,u.offset+=ne===-3?2:1,B()):ne!==-1&&(u.column++,u.offset++),u._bufferIndex<0?u._index++:(u._bufferIndex++,u._bufferIndex===f[u._index].length&&(u._bufferIndex=-1,u._index++)),d.previous=ne}function U(ne,ee){const xe=ee||{};return xe.type=ne,xe.start=w(),d.events.push(["enter",xe,d]),m.push(xe),xe}function te(ne){const ee=m.pop();return ee.end=w(),d.events.push(["exit",ee,d]),ee}function le(ne,ee){ce(ne,ee.from)}function q(ne,ee){ee.restore()}function P(ne,ee){return xe;function xe(ae,K,L){let Z,ue,Se,C;return Array.isArray(ae)?G(ae):"tokenize"in ae?G([ae]):T(ae);function T(oe){return we;function we(Ie){const Be=Ie!==null&&oe[Ie],Vn=Ie!==null&&oe.null,pt=[...Array.isArray(Be)?Be:Be?[Be]:[],...Array.isArray(Vn)?Vn:Vn?[Vn]:[]];return G(pt)(Ie)}}function G(oe){return Z=oe,ue=0,oe.length===0?L:k(oe[ue])}function k(oe){return we;function we(Ie){return C=me(),Se=oe,oe.partial||(d.currentConstruct=oe),oe.name&&d.parser.constructs.disable.null.includes(oe.name)?de():oe.tokenize.call(ee?Object.assign(Object.create(d),ee):d,p,$,de)(Ie)}}function $(oe){return ne(Se,C),K}function de(oe){return C.restore(),++ue<Z.length?k(Z[ue]):L}}}function ce(ne,ee){ne.resolveAll&&!c.includes(ne)&&c.push(ne),ne.resolve&&Yn(d.events,ee,d.events.length-ee,ne.resolve(d.events.slice(ee),d)),ne.resolveTo&&(d.events=ne.resolveTo(d.events,d))}function me(){const ne=w(),ee=d.previous,xe=d.currentConstruct,ae=d.events.length,K=Array.from(m);return{from:ae,restore:L};function L(){u=ne,d.previous=ee,d.currentConstruct=xe,d.events.length=ae,m=K,B()}}function B(){u.line in s&&u.column<2&&(u.column=s[u.line],u.offset+=s[u.line]-1)}}function tE(t,i){const a=i.start._index,u=i.start._bufferIndex,s=i.end._index,c=i.end._bufferIndex;let f;if(a===s)f=[t[a].slice(u,c)];else{if(f=t.slice(a,s),u>-1){const m=f[0];typeof m=="string"?f[0]=m.slice(u):f.shift()}c>0&&f.push(t[s].slice(0,c))}return f}function lE(t,i){let a=-1;const u=[];let s;for(;++a<t.length;){const c=t[a];let f;if(typeof c=="string")f=c;else switch(c){case-5:{f="\r";break}case-4:{f=`
`;break}case-3:{f=`\r
`;break}case-2:{f=i?" ":"	";break}case-1:{if(!i&&s)continue;f=" ";break}default:f=String.fromCharCode(c)}s=c===-2,u.push(f)}return u.join("")}function iE(t){const u={constructs:ey([eE,...(t||{}).extensions||[]]),content:s(vx),defined:[],document:s(Sx),flow:s(HS),lazy:{},string:s(VS),text:s(XS)};return u;function s(c){return f;function f(m){return nE(u,c,m)}}}function aE(t){for(;!ay(t););return t}const Yp=/[\0\t\n\r]/g;function rE(){let t=1,i="",a=!0,u;return s;function s(c,f,m){const p=[];let d,b,g,S,x;for(c=i+(typeof c=="string"?c.toString():new TextDecoder(f||void 0).decode(c)),g=0,i="",a&&(c.charCodeAt(0)===65279&&g++,a=void 0);g<c.length;){if(Yp.lastIndex=g,d=Yp.exec(c),S=d&&d.index!==void 0?d.index:c.length,x=c.charCodeAt(S),!d){i=c.slice(g);break}if(x===10&&g===S&&u)p.push(-3),u=void 0;else switch(u&&(p.push(-5),u=void 0),g<S&&(p.push(c.slice(g,S)),t+=S-g),x){case 0:{p.push(65533),t++;break}case 9:{for(b=Math.ceil(t/4)*4,p.push(-2);t++<b;)p.push(-1);break}case 10:{p.push(-4),t=1;break}default:u=!0,t=1}g=S+1}return m&&(u&&p.push(-5),i&&p.push(i),p.push(null)),p}}const uE=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function oE(t){return t.replace(uE,sE)}function sE(t,i,a){if(i)return i;if(a.charCodeAt(0)===35){const s=a.charCodeAt(1),c=s===120||s===88;return ny(a.slice(c?2:1),c?16:10)}return Kc(a)||t}const fy={}.hasOwnProperty;function cE(t,i,a){return i&&typeof i=="object"&&(a=i,i=void 0),fE(a)(aE(iE(a).document().write(rE()(t,i,!0))))}function fE(t){const i={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:c(jl),autolinkProtocol:me,autolinkEmail:me,atxHeading:c(Ol),blockQuote:c(Vn),characterEscape:me,characterReference:me,codeFenced:c(pt),codeFencedFenceInfo:f,codeFencedFenceMeta:f,codeIndented:c(pt,f),codeText:c(_i,f),codeTextData:me,data:me,codeFlowValue:me,definition:c(Ia),definitionDestinationString:f,definitionLabelString:f,definitionTitleString:f,emphasis:c(gt),hardBreakEscape:c(Nl),hardBreakTrailing:c(Nl),htmlFlow:c(Za,f),htmlFlowData:me,htmlText:c(Za,f),htmlTextData:me,image:c(Ka),label:f,link:c(jl),listItem:c(Oi),listItemValue:S,listOrdered:c(Ll,g),listUnordered:c(Ll),paragraph:c(Ou),reference:k,referenceString:f,resourceDestinationString:f,resourceTitleString:f,setextHeading:c(Ol),strong:c(Nu),thematicBreak:c(ju)},exit:{atxHeading:p(),atxHeadingSequence:le,autolink:p(),autolinkEmail:Be,autolinkProtocol:Ie,blockQuote:p(),characterEscapeValue:B,characterReferenceMarkerHexadecimal:de,characterReferenceMarkerNumeric:de,characterReferenceValue:oe,characterReference:we,codeFenced:p(D),codeFencedFence:_,codeFencedFenceInfo:x,codeFencedFenceMeta:w,codeFlowValue:B,codeIndented:p(R),codeText:p(K),codeTextData:B,data:B,definition:p(),definitionDestinationString:te,definitionLabelString:X,definitionTitleString:U,emphasis:p(),hardBreakEscape:p(ee),hardBreakTrailing:p(ee),htmlFlow:p(xe),htmlFlowData:B,htmlText:p(ae),htmlTextData:B,image:p(Z),label:Se,labelText:ue,lineEnding:ne,link:p(L),listItem:p(),listOrdered:p(),listUnordered:p(),paragraph:p(),referenceString:$,resourceDestinationString:C,resourceTitleString:T,resource:G,setextHeading:p(ce),setextHeadingLineSequence:P,setextHeadingText:q,strong:p(),thematicBreak:p()}};hy(i,(t||{}).mdastExtensions||[]);const a={};return u;function u(Q){let W={type:"root",children:[]};const pe={stack:[W],tokenStack:[],config:i,enter:m,exit:d,buffer:f,resume:b,data:a},Ee=[];let Ne=-1;for(;++Ne<Q.length;)if(Q[Ne][1].type==="listOrdered"||Q[Ne][1].type==="listUnordered")if(Q[Ne][0]==="enter")Ee.push(Ne);else{const _n=Ee.pop();Ne=s(Q,_n,Ne)}for(Ne=-1;++Ne<Q.length;){const _n=i[Q[Ne][0]];fy.call(_n,Q[Ne][1].type)&&_n[Q[Ne][1].type].call(Object.assign({sliceSerialize:Q[Ne][2].sliceSerialize},pe),Q[Ne][1])}if(pe.tokenStack.length>0){const _n=pe.tokenStack[pe.tokenStack.length-1];(_n[1]||Vp).call(pe,void 0,_n[0])}for(W.position={start:cl(Q.length>0?Q[0][1].start:{line:1,column:1,offset:0}),end:cl(Q.length>0?Q[Q.length-2][1].end:{line:1,column:1,offset:0})},Ne=-1;++Ne<i.transforms.length;)W=i.transforms[Ne](W)||W;return W}function s(Q,W,pe){let Ee=W-1,Ne=-1,_n=!1,yt,vn,rn,En;for(;++Ee<=pe;){const Ye=Q[Ee];switch(Ye[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{Ye[0]==="enter"?Ne++:Ne--,En=void 0;break}case"lineEndingBlank":{Ye[0]==="enter"&&(yt&&!En&&!Ne&&!rn&&(rn=Ee),En=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:En=void 0}if(!Ne&&Ye[0]==="enter"&&Ye[1].type==="listItemPrefix"||Ne===-1&&Ye[0]==="exit"&&(Ye[1].type==="listUnordered"||Ye[1].type==="listOrdered")){if(yt){let Ht=Ee;for(vn=void 0;Ht--;){const nt=Q[Ht];if(nt[1].type==="lineEnding"||nt[1].type==="lineEndingBlank"){if(nt[0]==="exit")continue;vn&&(Q[vn][1].type="lineEndingBlank",_n=!0),nt[1].type="lineEnding",vn=Ht}else if(!(nt[1].type==="linePrefix"||nt[1].type==="blockQuotePrefix"||nt[1].type==="blockQuotePrefixWhitespace"||nt[1].type==="blockQuoteMarker"||nt[1].type==="listItemIndent"))break}rn&&(!vn||rn<vn)&&(yt._spread=!0),yt.end=Object.assign({},vn?Q[vn][1].start:Ye[1].end),Q.splice(vn||Ee,0,["exit",yt,Ye[2]]),Ee++,pe++}if(Ye[1].type==="listItemPrefix"){const Ht={type:"listItem",_spread:!1,start:Object.assign({},Ye[1].start),end:void 0};yt=Ht,Q.splice(Ee,0,["enter",Ht,Ye[2]]),Ee++,pe++,rn=void 0,En=!0}}}return Q[W][1]._spread=_n,pe}function c(Q,W){return pe;function pe(Ee){m.call(this,Q(Ee),Ee),W&&W.call(this,Ee)}}function f(){this.stack.push({type:"fragment",children:[]})}function m(Q,W,pe){this.stack[this.stack.length-1].children.push(Q),this.stack.push(Q),this.tokenStack.push([W,pe||void 0]),Q.position={start:cl(W.start),end:void 0}}function p(Q){return W;function W(pe){Q&&Q.call(this,pe),d.call(this,pe)}}function d(Q,W){const pe=this.stack.pop(),Ee=this.tokenStack.pop();if(Ee)Ee[0].type!==Q.type&&(W?W.call(this,Q,Ee[0]):(Ee[1]||Vp).call(this,Q,Ee[0]));else throw new Error("Cannot close `"+Q.type+"` ("+Oa({start:Q.start,end:Q.end})+"): it’s not open");pe.position.end=cl(Q.end)}function b(){return Zc(this.stack.pop())}function g(){this.data.expectingFirstListItemValue=!0}function S(Q){if(this.data.expectingFirstListItemValue){const W=this.stack[this.stack.length-2];W.start=Number.parseInt(this.sliceSerialize(Q),10),this.data.expectingFirstListItemValue=void 0}}function x(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.lang=Q}function w(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.meta=Q}function _(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function D(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.value=Q.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function R(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.value=Q.replace(/(\r?\n|\r)$/g,"")}function X(Q){const W=this.resume(),pe=this.stack[this.stack.length-1];pe.label=W,pe.identifier=at(this.sliceSerialize(Q)).toLowerCase()}function U(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.title=Q}function te(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.url=Q}function le(Q){const W=this.stack[this.stack.length-1];if(!W.depth){const pe=this.sliceSerialize(Q).length;W.depth=pe}}function q(){this.data.setextHeadingSlurpLineEnding=!0}function P(Q){const W=this.stack[this.stack.length-1];W.depth=this.sliceSerialize(Q).codePointAt(0)===61?1:2}function ce(){this.data.setextHeadingSlurpLineEnding=void 0}function me(Q){const pe=this.stack[this.stack.length-1].children;let Ee=pe[pe.length-1];(!Ee||Ee.type!=="text")&&(Ee=bn(),Ee.position={start:cl(Q.start),end:void 0},pe.push(Ee)),this.stack.push(Ee)}function B(Q){const W=this.stack.pop();W.value+=this.sliceSerialize(Q),W.position.end=cl(Q.end)}function ne(Q){const W=this.stack[this.stack.length-1];if(this.data.atHardBreak){const pe=W.children[W.children.length-1];pe.position.end=cl(Q.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&i.canContainEols.includes(W.type)&&(me.call(this,Q),B.call(this,Q))}function ee(){this.data.atHardBreak=!0}function xe(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.value=Q}function ae(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.value=Q}function K(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.value=Q}function L(){const Q=this.stack[this.stack.length-1];if(this.data.inReference){const W=this.data.referenceType||"shortcut";Q.type+="Reference",Q.referenceType=W,delete Q.url,delete Q.title}else delete Q.identifier,delete Q.label;this.data.referenceType=void 0}function Z(){const Q=this.stack[this.stack.length-1];if(this.data.inReference){const W=this.data.referenceType||"shortcut";Q.type+="Reference",Q.referenceType=W,delete Q.url,delete Q.title}else delete Q.identifier,delete Q.label;this.data.referenceType=void 0}function ue(Q){const W=this.sliceSerialize(Q),pe=this.stack[this.stack.length-2];pe.label=oE(W),pe.identifier=at(W).toLowerCase()}function Se(){const Q=this.stack[this.stack.length-1],W=this.resume(),pe=this.stack[this.stack.length-1];if(this.data.inReference=!0,pe.type==="link"){const Ee=Q.children;pe.children=Ee}else pe.alt=W}function C(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.url=Q}function T(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.title=Q}function G(){this.data.inReference=void 0}function k(){this.data.referenceType="collapsed"}function $(Q){const W=this.resume(),pe=this.stack[this.stack.length-1];pe.label=W,pe.identifier=at(this.sliceSerialize(Q)).toLowerCase(),this.data.referenceType="full"}function de(Q){this.data.characterReferenceType=Q.type}function oe(Q){const W=this.sliceSerialize(Q),pe=this.data.characterReferenceType;let Ee;pe?(Ee=ny(W,pe==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):Ee=Kc(W);const Ne=this.stack[this.stack.length-1];Ne.value+=Ee}function we(Q){const W=this.stack.pop();W.position.end=cl(Q.end)}function Ie(Q){B.call(this,Q);const W=this.stack[this.stack.length-1];W.url=this.sliceSerialize(Q)}function Be(Q){B.call(this,Q);const W=this.stack[this.stack.length-1];W.url="mailto:"+this.sliceSerialize(Q)}function Vn(){return{type:"blockquote",children:[]}}function pt(){return{type:"code",lang:null,meta:null,value:""}}function _i(){return{type:"inlineCode",value:""}}function Ia(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function gt(){return{type:"emphasis",children:[]}}function Ol(){return{type:"heading",depth:0,children:[]}}function Nl(){return{type:"break"}}function Za(){return{type:"html",value:""}}function Ka(){return{type:"image",title:null,url:"",alt:null}}function jl(){return{type:"link",title:null,url:"",children:[]}}function Ll(Q){return{type:"list",ordered:Q.type==="listOrdered",start:null,spread:Q._spread,children:[]}}function Oi(Q){return{type:"listItem",spread:Q._spread,checked:null,children:[]}}function Ou(){return{type:"paragraph",children:[]}}function Nu(){return{type:"strong",children:[]}}function bn(){return{type:"text",value:""}}function ju(){return{type:"thematicBreak"}}}function cl(t){return{line:t.line,column:t.column,offset:t.offset}}function hy(t,i){let a=-1;for(;++a<i.length;){const u=i[a];Array.isArray(u)?hy(t,u):hE(t,u)}}function hE(t,i){let a;for(a in i)if(fy.call(i,a))switch(a){case"canContainEols":{const u=i[a];u&&t[a].push(...u);break}case"transforms":{const u=i[a];u&&t[a].push(...u);break}case"enter":case"exit":{const u=i[a];u&&Object.assign(t[a],u);break}}}function Vp(t,i){throw t?new Error("Cannot close `"+t.type+"` ("+Oa({start:t.start,end:t.end})+"): a different token (`"+i.type+"`, "+Oa({start:i.start,end:i.end})+") is open"):new Error("Cannot close document, a token (`"+i.type+"`, "+Oa({start:i.start,end:i.end})+") is still open")}function dE(t){const i=this;i.parser=a;function a(u){return cE(u,{...i.data("settings"),...t,extensions:i.data("micromarkExtensions")||[],mdastExtensions:i.data("fromMarkdownExtensions")||[]})}}function mE(t,i){const a={type:"element",tagName:"blockquote",properties:{},children:t.wrap(t.all(i),!0)};return t.patch(i,a),t.applyData(i,a)}function pE(t,i){const a={type:"element",tagName:"br",properties:{},children:[]};return t.patch(i,a),[t.applyData(i,a),{type:"text",value:`
`}]}function gE(t,i){const a=i.value?i.value+`
`:"",u={},s=i.lang?i.lang.split(/\s+/):[];s.length>0&&(u.className=["language-"+s[0]]);let c={type:"element",tagName:"code",properties:u,children:[{type:"text",value:a}]};return i.meta&&(c.data={meta:i.meta}),t.patch(i,c),c=t.applyData(i,c),c={type:"element",tagName:"pre",properties:{},children:[c]},t.patch(i,c),c}function yE(t,i){const a={type:"element",tagName:"del",properties:{},children:t.all(i)};return t.patch(i,a),t.applyData(i,a)}function bE(t,i){const a={type:"element",tagName:"em",properties:{},children:t.all(i)};return t.patch(i,a),t.applyData(i,a)}function vE(t,i){const a=typeof t.options.clobberPrefix=="string"?t.options.clobberPrefix:"user-content-",u=String(i.identifier).toUpperCase(),s=Mi(u.toLowerCase()),c=t.footnoteOrder.indexOf(u);let f,m=t.footnoteCounts.get(u);m===void 0?(m=0,t.footnoteOrder.push(u),f=t.footnoteOrder.length):f=c+1,m+=1,t.footnoteCounts.set(u,m);const p={type:"element",tagName:"a",properties:{href:"#"+a+"fn-"+s,id:a+"fnref-"+s+(m>1?"-"+m:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(f)}]};t.patch(i,p);const d={type:"element",tagName:"sup",properties:{},children:[p]};return t.patch(i,d),t.applyData(i,d)}function xE(t,i){const a={type:"element",tagName:"h"+i.depth,properties:{},children:t.all(i)};return t.patch(i,a),t.applyData(i,a)}function SE(t,i){if(t.options.allowDangerousHtml){const a={type:"raw",value:i.value};return t.patch(i,a),t.applyData(i,a)}}function dy(t,i){const a=i.referenceType;let u="]";if(a==="collapsed"?u+="[]":a==="full"&&(u+="["+(i.label||i.identifier)+"]"),i.type==="imageReference")return[{type:"text",value:"!["+i.alt+u}];const s=t.all(i),c=s[0];c&&c.type==="text"?c.value="["+c.value:s.unshift({type:"text",value:"["});const f=s[s.length-1];return f&&f.type==="text"?f.value+=u:s.push({type:"text",value:u}),s}function EE(t,i){const a=String(i.identifier).toUpperCase(),u=t.definitionById.get(a);if(!u)return dy(t,i);const s={src:Mi(u.url||""),alt:i.alt};u.title!==null&&u.title!==void 0&&(s.title=u.title);const c={type:"element",tagName:"img",properties:s,children:[]};return t.patch(i,c),t.applyData(i,c)}function kE(t,i){const a={src:Mi(i.url)};i.alt!==null&&i.alt!==void 0&&(a.alt=i.alt),i.title!==null&&i.title!==void 0&&(a.title=i.title);const u={type:"element",tagName:"img",properties:a,children:[]};return t.patch(i,u),t.applyData(i,u)}function CE(t,i){const a={type:"text",value:i.value.replace(/\r?\n|\r/g," ")};t.patch(i,a);const u={type:"element",tagName:"code",properties:{},children:[a]};return t.patch(i,u),t.applyData(i,u)}function AE(t,i){const a=String(i.identifier).toUpperCase(),u=t.definitionById.get(a);if(!u)return dy(t,i);const s={href:Mi(u.url||"")};u.title!==null&&u.title!==void 0&&(s.title=u.title);const c={type:"element",tagName:"a",properties:s,children:t.all(i)};return t.patch(i,c),t.applyData(i,c)}function wE(t,i){const a={href:Mi(i.url)};i.title!==null&&i.title!==void 0&&(a.title=i.title);const u={type:"element",tagName:"a",properties:a,children:t.all(i)};return t.patch(i,u),t.applyData(i,u)}function TE(t,i,a){const u=t.all(i),s=a?zE(a):my(i),c={},f=[];if(typeof i.checked=="boolean"){const b=u[0];let g;b&&b.type==="element"&&b.tagName==="p"?g=b:(g={type:"element",tagName:"p",properties:{},children:[]},u.unshift(g)),g.children.length>0&&g.children.unshift({type:"text",value:" "}),g.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:i.checked,disabled:!0},children:[]}),c.className=["task-list-item"]}let m=-1;for(;++m<u.length;){const b=u[m];(s||m!==0||b.type!=="element"||b.tagName!=="p")&&f.push({type:"text",value:`
`}),b.type==="element"&&b.tagName==="p"&&!s?f.push(...b.children):f.push(b)}const p=u[u.length-1];p&&(s||p.type!=="element"||p.tagName!=="p")&&f.push({type:"text",value:`
`});const d={type:"element",tagName:"li",properties:c,children:f};return t.patch(i,d),t.applyData(i,d)}function zE(t){let i=!1;if(t.type==="list"){i=t.spread||!1;const a=t.children;let u=-1;for(;!i&&++u<a.length;)i=my(a[u])}return i}function my(t){const i=t.spread;return i??t.children.length>1}function RE(t,i){const a={},u=t.all(i);let s=-1;for(typeof i.start=="number"&&i.start!==1&&(a.start=i.start);++s<u.length;){const f=u[s];if(f.type==="element"&&f.tagName==="li"&&f.properties&&Array.isArray(f.properties.className)&&f.properties.className.includes("task-list-item")){a.className=["contains-task-list"];break}}const c={type:"element",tagName:i.ordered?"ol":"ul",properties:a,children:t.wrap(u,!0)};return t.patch(i,c),t.applyData(i,c)}function DE(t,i){const a={type:"element",tagName:"p",properties:{},children:t.all(i)};return t.patch(i,a),t.applyData(i,a)}function ME(t,i){const a={type:"root",children:t.wrap(t.all(i))};return t.patch(i,a),t.applyData(i,a)}function _E(t,i){const a={type:"element",tagName:"strong",properties:{},children:t.all(i)};return t.patch(i,a),t.applyData(i,a)}function OE(t,i){const a=t.all(i),u=a.shift(),s=[];if(u){const f={type:"element",tagName:"thead",properties:{},children:t.wrap([u],!0)};t.patch(i.children[0],f),s.push(f)}if(a.length>0){const f={type:"element",tagName:"tbody",properties:{},children:t.wrap(a,!0)},m=Gc(i.children[1]),p=Ig(i.children[i.children.length-1]);m&&p&&(f.position={start:m,end:p}),s.push(f)}const c={type:"element",tagName:"table",properties:{},children:t.wrap(s,!0)};return t.patch(i,c),t.applyData(i,c)}function NE(t,i,a){const u=a?a.children:void 0,c=(u?u.indexOf(i):1)===0?"th":"td",f=a&&a.type==="table"?a.align:void 0,m=f?f.length:i.children.length;let p=-1;const d=[];for(;++p<m;){const g=i.children[p],S={},x=f?f[p]:void 0;x&&(S.align=x);let w={type:"element",tagName:c,properties:S,children:[]};g&&(w.children=t.all(g),t.patch(g,w),w=t.applyData(g,w)),d.push(w)}const b={type:"element",tagName:"tr",properties:{},children:t.wrap(d,!0)};return t.patch(i,b),t.applyData(i,b)}function jE(t,i){const a={type:"element",tagName:"td",properties:{},children:t.all(i)};return t.patch(i,a),t.applyData(i,a)}const Xp=9,Gp=32;function LE(t){const i=String(t),a=/\r?\n|\r/g;let u=a.exec(i),s=0;const c=[];for(;u;)c.push(Qp(i.slice(s,u.index),s>0,!0),u[0]),s=u.index+u[0].length,u=a.exec(i);return c.push(Qp(i.slice(s),s>0,!1)),c.join("")}function Qp(t,i,a){let u=0,s=t.length;if(i){let c=t.codePointAt(u);for(;c===Xp||c===Gp;)u++,c=t.codePointAt(u)}if(a){let c=t.codePointAt(s-1);for(;c===Xp||c===Gp;)s--,c=t.codePointAt(s-1)}return s>u?t.slice(u,s):""}function BE(t,i){const a={type:"text",value:LE(String(i.value))};return t.patch(i,a),t.applyData(i,a)}function UE(t,i){const a={type:"element",tagName:"hr",properties:{},children:[]};return t.patch(i,a),t.applyData(i,a)}const HE={blockquote:mE,break:pE,code:gE,delete:yE,emphasis:bE,footnoteReference:vE,heading:xE,html:SE,imageReference:EE,image:kE,inlineCode:CE,linkReference:AE,link:wE,listItem:TE,list:RE,paragraph:DE,root:ME,strong:_E,table:OE,tableCell:jE,tableRow:NE,text:BE,thematicBreak:UE,toml:du,yaml:du,definition:du,footnoteDefinition:du};function du(){}const py=-1,Du=0,ja=1,ku=2,Wc=3,Pc=4,$c=5,ef=6,gy=7,yy=8,Fp=typeof self=="object"?self:globalThis,qE=(t,i)=>{const a=(s,c)=>(t.set(c,s),s),u=s=>{if(t.has(s))return t.get(s);const[c,f]=i[s];switch(c){case Du:case py:return a(f,s);case ja:{const m=a([],s);for(const p of f)m.push(u(p));return m}case ku:{const m=a({},s);for(const[p,d]of f)m[u(p)]=u(d);return m}case Wc:return a(new Date(f),s);case Pc:{const{source:m,flags:p}=f;return a(new RegExp(m,p),s)}case $c:{const m=a(new Map,s);for(const[p,d]of f)m.set(u(p),u(d));return m}case ef:{const m=a(new Set,s);for(const p of f)m.add(u(p));return m}case gy:{const{name:m,message:p}=f;return a(new Fp[m](p),s)}case yy:return a(BigInt(f),s);case"BigInt":return a(Object(BigInt(f)),s);case"ArrayBuffer":return a(new Uint8Array(f).buffer,f);case"DataView":{const{buffer:m}=new Uint8Array(f);return a(new DataView(m),f)}}return a(new Fp[c](f),s)};return u},Ip=t=>qE(new Map,t)(0),Ei="",{toString:YE}={},{keys:VE}=Object,_a=t=>{const i=typeof t;if(i!=="object"||!t)return[Du,i];const a=YE.call(t).slice(8,-1);switch(a){case"Array":return[ja,Ei];case"Object":return[ku,Ei];case"Date":return[Wc,Ei];case"RegExp":return[Pc,Ei];case"Map":return[$c,Ei];case"Set":return[ef,Ei];case"DataView":return[ja,a]}return a.includes("Array")?[ja,a]:a.includes("Error")?[gy,a]:[ku,a]},mu=([t,i])=>t===Du&&(i==="function"||i==="symbol"),XE=(t,i,a,u)=>{const s=(f,m)=>{const p=u.push(f)-1;return a.set(m,p),p},c=f=>{if(a.has(f))return a.get(f);let[m,p]=_a(f);switch(m){case Du:{let b=f;switch(p){case"bigint":m=yy,b=f.toString();break;case"function":case"symbol":if(t)throw new TypeError("unable to serialize "+p);b=null;break;case"undefined":return s([py],f)}return s([m,b],f)}case ja:{if(p){let S=f;return p==="DataView"?S=new Uint8Array(f.buffer):p==="ArrayBuffer"&&(S=new Uint8Array(f)),s([p,[...S]],f)}const b=[],g=s([m,b],f);for(const S of f)b.push(c(S));return g}case ku:{if(p)switch(p){case"BigInt":return s([p,f.toString()],f);case"Boolean":case"Number":case"String":return s([p,f.valueOf()],f)}if(i&&"toJSON"in f)return c(f.toJSON());const b=[],g=s([m,b],f);for(const S of VE(f))(t||!mu(_a(f[S])))&&b.push([c(S),c(f[S])]);return g}case Wc:return s([m,f.toISOString()],f);case Pc:{const{source:b,flags:g}=f;return s([m,{source:b,flags:g}],f)}case $c:{const b=[],g=s([m,b],f);for(const[S,x]of f)(t||!(mu(_a(S))||mu(_a(x))))&&b.push([c(S),c(x)]);return g}case ef:{const b=[],g=s([m,b],f);for(const S of f)(t||!mu(_a(S)))&&b.push(c(S));return g}}const{message:d}=f;return s([m,{name:p,message:d}],f)};return c},Zp=(t,{json:i,lossy:a}={})=>{const u=[];return XE(!(i||a),!!i,new Map,u)(t),u},Cu=typeof structuredClone=="function"?(t,i)=>i&&("json"in i||"lossy"in i)?Ip(Zp(t,i)):structuredClone(t):(t,i)=>Ip(Zp(t,i));function GE(t,i){const a=[{type:"text",value:"↩"}];return i>1&&a.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(i)}]}),a}function QE(t,i){return"Back to reference "+(t+1)+(i>1?"-"+i:"")}function FE(t){const i=typeof t.options.clobberPrefix=="string"?t.options.clobberPrefix:"user-content-",a=t.options.footnoteBackContent||GE,u=t.options.footnoteBackLabel||QE,s=t.options.footnoteLabel||"Footnotes",c=t.options.footnoteLabelTagName||"h2",f=t.options.footnoteLabelProperties||{className:["sr-only"]},m=[];let p=-1;for(;++p<t.footnoteOrder.length;){const d=t.footnoteById.get(t.footnoteOrder[p]);if(!d)continue;const b=t.all(d),g=String(d.identifier).toUpperCase(),S=Mi(g.toLowerCase());let x=0;const w=[],_=t.footnoteCounts.get(g);for(;_!==void 0&&++x<=_;){w.length>0&&w.push({type:"text",value:" "});let X=typeof a=="string"?a:a(p,x);typeof X=="string"&&(X={type:"text",value:X}),w.push({type:"element",tagName:"a",properties:{href:"#"+i+"fnref-"+S+(x>1?"-"+x:""),dataFootnoteBackref:"",ariaLabel:typeof u=="string"?u:u(p,x),className:["data-footnote-backref"]},children:Array.isArray(X)?X:[X]})}const D=b[b.length-1];if(D&&D.type==="element"&&D.tagName==="p"){const X=D.children[D.children.length-1];X&&X.type==="text"?X.value+=" ":D.children.push({type:"text",value:" "}),D.children.push(...w)}else b.push(...w);const R={type:"element",tagName:"li",properties:{id:i+"fn-"+S},children:t.wrap(b,!0)};t.patch(d,R),m.push(R)}if(m.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:c,properties:{...Cu(f),id:"footnote-label"},children:[{type:"text",value:s}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:t.wrap(m,!0)},{type:"text",value:`
`}]}}const Mu=(function(t){if(t==null)return JE;if(typeof t=="function")return _u(t);if(typeof t=="object")return Array.isArray(t)?IE(t):ZE(t);if(typeof t=="string")return KE(t);throw new Error("Expected function, string, or object as test")});function IE(t){const i=[];let a=-1;for(;++a<t.length;)i[a]=Mu(t[a]);return _u(u);function u(...s){let c=-1;for(;++c<i.length;)if(i[c].apply(this,s))return!0;return!1}}function ZE(t){const i=t;return _u(a);function a(u){const s=u;let c;for(c in t)if(s[c]!==i[c])return!1;return!0}}function KE(t){return _u(i);function i(a){return a&&a.type===t}}function _u(t){return i;function i(a,u,s){return!!(WE(a)&&t.call(this,a,typeof u=="number"?u:void 0,s||void 0))}}function JE(){return!0}function WE(t){return t!==null&&typeof t=="object"&&"type"in t}const by=[],PE=!0,Rc=!1,$E="skip";function vy(t,i,a,u){let s;typeof i=="function"&&typeof a!="function"?(u=a,a=i):s=i;const c=Mu(s),f=u?-1:1;m(t,void 0,[])();function m(p,d,b){const g=p&&typeof p=="object"?p:{};if(typeof g.type=="string"){const x=typeof g.tagName=="string"?g.tagName:typeof g.name=="string"?g.name:void 0;Object.defineProperty(S,"name",{value:"node ("+(p.type+(x?"<"+x+">":""))+")"})}return S;function S(){let x=by,w,_,D;if((!i||c(p,d,b[b.length-1]||void 0))&&(x=e3(a(p,b)),x[0]===Rc))return x;if("children"in p&&p.children){const R=p;if(R.children&&x[0]!==$E)for(_=(u?R.children.length:-1)+f,D=b.concat(R);_>-1&&_<R.children.length;){const X=R.children[_];if(w=m(X,_,D)(),w[0]===Rc)return w;_=typeof w[1]=="number"?w[1]:_+f}}return x}}}function e3(t){return Array.isArray(t)?t:typeof t=="number"?[PE,t]:t==null?by:[t]}function nf(t,i,a,u){let s,c,f;typeof i=="function"&&typeof a!="function"?(c=void 0,f=i,s=a):(c=i,f=a,s=u),vy(t,c,m,s);function m(p,d){const b=d[d.length-1],g=b?b.children.indexOf(p):void 0;return f(p,g,b)}}const Dc={}.hasOwnProperty,n3={};function t3(t,i){const a=i||n3,u=new Map,s=new Map,c=new Map,f={...HE,...a.handlers},m={all:d,applyData:i3,definitionById:u,footnoteById:s,footnoteCounts:c,footnoteOrder:[],handlers:f,one:p,options:a,patch:l3,wrap:r3};return nf(t,function(b){if(b.type==="definition"||b.type==="footnoteDefinition"){const g=b.type==="definition"?u:s,S=String(b.identifier).toUpperCase();g.has(S)||g.set(S,b)}}),m;function p(b,g){const S=b.type,x=m.handlers[S];if(Dc.call(m.handlers,S)&&x)return x(m,b,g);if(m.options.passThrough&&m.options.passThrough.includes(S)){if("children"in b){const{children:_,...D}=b,R=Cu(D);return R.children=m.all(b),R}return Cu(b)}return(m.options.unknownHandler||a3)(m,b,g)}function d(b){const g=[];if("children"in b){const S=b.children;let x=-1;for(;++x<S.length;){const w=m.one(S[x],b);if(w){if(x&&S[x-1].type==="break"&&(!Array.isArray(w)&&w.type==="text"&&(w.value=Kp(w.value)),!Array.isArray(w)&&w.type==="element")){const _=w.children[0];_&&_.type==="text"&&(_.value=Kp(_.value))}Array.isArray(w)?g.push(...w):g.push(w)}}}return g}}function l3(t,i){t.position&&(i.position=Qv(t))}function i3(t,i){let a=i;if(t&&t.data){const u=t.data.hName,s=t.data.hChildren,c=t.data.hProperties;if(typeof u=="string")if(a.type==="element")a.tagName=u;else{const f="children"in a?a.children:[a];a={type:"element",tagName:u,properties:{},children:f}}a.type==="element"&&c&&Object.assign(a.properties,Cu(c)),"children"in a&&a.children&&s!==null&&s!==void 0&&(a.children=s)}return a}function a3(t,i){const a=i.data||{},u="value"in i&&!(Dc.call(a,"hProperties")||Dc.call(a,"hChildren"))?{type:"text",value:i.value}:{type:"element",tagName:"div",properties:{},children:t.all(i)};return t.patch(i,u),t.applyData(i,u)}function r3(t,i){const a=[];let u=-1;for(i&&a.push({type:"text",value:`
`});++u<t.length;)u&&a.push({type:"text",value:`
`}),a.push(t[u]);return i&&t.length>0&&a.push({type:"text",value:`
`}),a}function Kp(t){let i=0,a=t.charCodeAt(i);for(;a===9||a===32;)i++,a=t.charCodeAt(i);return t.slice(i)}function Jp(t,i){const a=t3(t,i),u=a.one(t,void 0),s=FE(a),c=Array.isArray(u)?{type:"root",children:u}:u||{type:"root",children:[]};return s&&c.children.push({type:"text",value:`
`},s),c}function u3(t,i){return t&&"run"in t?async function(a,u){const s=Jp(a,{file:u,...i});await t.run(s,u)}:function(a,u){return Jp(a,{file:u,...t||i})}}function Wp(t){if(t)throw t}var sc,Pp;function o3(){if(Pp)return sc;Pp=1;var t=Object.prototype.hasOwnProperty,i=Object.prototype.toString,a=Object.defineProperty,u=Object.getOwnPropertyDescriptor,s=function(d){return typeof Array.isArray=="function"?Array.isArray(d):i.call(d)==="[object Array]"},c=function(d){if(!d||i.call(d)!=="[object Object]")return!1;var b=t.call(d,"constructor"),g=d.constructor&&d.constructor.prototype&&t.call(d.constructor.prototype,"isPrototypeOf");if(d.constructor&&!b&&!g)return!1;var S;for(S in d);return typeof S>"u"||t.call(d,S)},f=function(d,b){a&&b.name==="__proto__"?a(d,b.name,{enumerable:!0,configurable:!0,value:b.newValue,writable:!0}):d[b.name]=b.newValue},m=function(d,b){if(b==="__proto__")if(t.call(d,b)){if(u)return u(d,b).value}else return;return d[b]};return sc=function p(){var d,b,g,S,x,w,_=arguments[0],D=1,R=arguments.length,X=!1;for(typeof _=="boolean"&&(X=_,_=arguments[1]||{},D=2),(_==null||typeof _!="object"&&typeof _!="function")&&(_={});D<R;++D)if(d=arguments[D],d!=null)for(b in d)g=m(_,b),S=m(d,b),_!==S&&(X&&S&&(c(S)||(x=s(S)))?(x?(x=!1,w=g&&s(g)?g:[]):w=g&&c(g)?g:{},f(_,{name:b,newValue:p(X,w,S)})):typeof S<"u"&&f(_,{name:b,newValue:S}));return _},sc}var s3=o3();const cc=fg(s3);function Mc(t){if(typeof t!="object"||t===null)return!1;const i=Object.getPrototypeOf(t);return(i===null||i===Object.prototype||Object.getPrototypeOf(i)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)}function c3(){const t=[],i={run:a,use:u};return i;function a(...s){let c=-1;const f=s.pop();if(typeof f!="function")throw new TypeError("Expected function as last argument, not "+f);m(null,...s);function m(p,...d){const b=t[++c];let g=-1;if(p){f(p);return}for(;++g<s.length;)(d[g]===null||d[g]===void 0)&&(d[g]=s[g]);s=d,b?f3(b,m)(...d):f(null,...d)}}function u(s){if(typeof s!="function")throw new TypeError("Expected `middelware` to be a function, not "+s);return t.push(s),i}}function f3(t,i){let a;return u;function u(...f){const m=t.length>f.length;let p;m&&f.push(s);try{p=t.apply(this,f)}catch(d){const b=d;if(m&&a)throw b;return s(b)}m||(p&&p.then&&typeof p.then=="function"?p.then(c,s):p instanceof Error?s(p):c(p))}function s(f,...m){a||(a=!0,i(f,...m))}function c(f){s(null,f)}}const ft={basename:h3,dirname:d3,extname:m3,join:p3,sep:"/"};function h3(t,i){if(i!==void 0&&typeof i!="string")throw new TypeError('"ext" argument must be a string');Fa(t);let a=0,u=-1,s=t.length,c;if(i===void 0||i.length===0||i.length>t.length){for(;s--;)if(t.codePointAt(s)===47){if(c){a=s+1;break}}else u<0&&(c=!0,u=s+1);return u<0?"":t.slice(a,u)}if(i===t)return"";let f=-1,m=i.length-1;for(;s--;)if(t.codePointAt(s)===47){if(c){a=s+1;break}}else f<0&&(c=!0,f=s+1),m>-1&&(t.codePointAt(s)===i.codePointAt(m--)?m<0&&(u=s):(m=-1,u=f));return a===u?u=f:u<0&&(u=t.length),t.slice(a,u)}function d3(t){if(Fa(t),t.length===0)return".";let i=-1,a=t.length,u;for(;--a;)if(t.codePointAt(a)===47){if(u){i=a;break}}else u||(u=!0);return i<0?t.codePointAt(0)===47?"/":".":i===1&&t.codePointAt(0)===47?"//":t.slice(0,i)}function m3(t){Fa(t);let i=t.length,a=-1,u=0,s=-1,c=0,f;for(;i--;){const m=t.codePointAt(i);if(m===47){if(f){u=i+1;break}continue}a<0&&(f=!0,a=i+1),m===46?s<0?s=i:c!==1&&(c=1):s>-1&&(c=-1)}return s<0||a<0||c===0||c===1&&s===a-1&&s===u+1?"":t.slice(s,a)}function p3(...t){let i=-1,a;for(;++i<t.length;)Fa(t[i]),t[i]&&(a=a===void 0?t[i]:a+"/"+t[i]);return a===void 0?".":g3(a)}function g3(t){Fa(t);const i=t.codePointAt(0)===47;let a=y3(t,!i);return a.length===0&&!i&&(a="."),a.length>0&&t.codePointAt(t.length-1)===47&&(a+="/"),i?"/"+a:a}function y3(t,i){let a="",u=0,s=-1,c=0,f=-1,m,p;for(;++f<=t.length;){if(f<t.length)m=t.codePointAt(f);else{if(m===47)break;m=47}if(m===47){if(!(s===f-1||c===1))if(s!==f-1&&c===2){if(a.length<2||u!==2||a.codePointAt(a.length-1)!==46||a.codePointAt(a.length-2)!==46){if(a.length>2){if(p=a.lastIndexOf("/"),p!==a.length-1){p<0?(a="",u=0):(a=a.slice(0,p),u=a.length-1-a.lastIndexOf("/")),s=f,c=0;continue}}else if(a.length>0){a="",u=0,s=f,c=0;continue}}i&&(a=a.length>0?a+"/..":"..",u=2)}else a.length>0?a+="/"+t.slice(s+1,f):a=t.slice(s+1,f),u=f-s-1;s=f,c=0}else m===46&&c>-1?c++:c=-1}return a}function Fa(t){if(typeof t!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(t))}const b3={cwd:v3};function v3(){return"/"}function _c(t){return!!(t!==null&&typeof t=="object"&&"href"in t&&t.href&&"protocol"in t&&t.protocol&&t.auth===void 0)}function x3(t){if(typeof t=="string")t=new URL(t);else if(!_c(t)){const i=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+t+"`");throw i.code="ERR_INVALID_ARG_TYPE",i}if(t.protocol!=="file:"){const i=new TypeError("The URL must be of scheme file");throw i.code="ERR_INVALID_URL_SCHEME",i}return S3(t)}function S3(t){if(t.hostname!==""){const u=new TypeError('File URL host must be "localhost" or empty on darwin');throw u.code="ERR_INVALID_FILE_URL_HOST",u}const i=t.pathname;let a=-1;for(;++a<i.length;)if(i.codePointAt(a)===37&&i.codePointAt(a+1)===50){const u=i.codePointAt(a+2);if(u===70||u===102){const s=new TypeError("File URL path must not include encoded / characters");throw s.code="ERR_INVALID_FILE_URL_PATH",s}}return decodeURIComponent(i)}const fc=["history","path","basename","stem","extname","dirname"];class xy{constructor(i){let a;i?_c(i)?a={path:i}:typeof i=="string"||E3(i)?a={value:i}:a=i:a={},this.cwd="cwd"in a?"":b3.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let u=-1;for(;++u<fc.length;){const c=fc[u];c in a&&a[c]!==void 0&&a[c]!==null&&(this[c]=c==="history"?[...a[c]]:a[c])}let s;for(s in a)fc.includes(s)||(this[s]=a[s])}get basename(){return typeof this.path=="string"?ft.basename(this.path):void 0}set basename(i){dc(i,"basename"),hc(i,"basename"),this.path=ft.join(this.dirname||"",i)}get dirname(){return typeof this.path=="string"?ft.dirname(this.path):void 0}set dirname(i){$p(this.basename,"dirname"),this.path=ft.join(i||"",this.basename)}get extname(){return typeof this.path=="string"?ft.extname(this.path):void 0}set extname(i){if(hc(i,"extname"),$p(this.dirname,"extname"),i){if(i.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(i.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=ft.join(this.dirname,this.stem+(i||""))}get path(){return this.history[this.history.length-1]}set path(i){_c(i)&&(i=x3(i)),dc(i,"path"),this.path!==i&&this.history.push(i)}get stem(){return typeof this.path=="string"?ft.basename(this.path,this.extname):void 0}set stem(i){dc(i,"stem"),hc(i,"stem"),this.path=ft.join(this.dirname||"",i+(this.extname||""))}fail(i,a,u){const s=this.message(i,a,u);throw s.fatal=!0,s}info(i,a,u){const s=this.message(i,a,u);return s.fatal=void 0,s}message(i,a,u){const s=new yn(i,a,u);return this.path&&(s.name=this.path+":"+s.name,s.file=this.path),s.fatal=!1,this.messages.push(s),s}toString(i){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(i||void 0).decode(this.value)}}function hc(t,i){if(t&&t.includes(ft.sep))throw new Error("`"+i+"` cannot be a path: did not expect `"+ft.sep+"`")}function dc(t,i){if(!t)throw new Error("`"+i+"` cannot be empty")}function $p(t,i){if(!t)throw new Error("Setting `"+i+"` requires `path` to be set too")}function E3(t){return!!(t&&typeof t=="object"&&"byteLength"in t&&"byteOffset"in t)}const k3=(function(t){const u=this.constructor.prototype,s=u[t],c=function(){return s.apply(c,arguments)};return Object.setPrototypeOf(c,u),c}),C3={}.hasOwnProperty;class tf extends k3{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=c3()}copy(){const i=new tf;let a=-1;for(;++a<this.attachers.length;){const u=this.attachers[a];i.use(...u)}return i.data(cc(!0,{},this.namespace)),i}data(i,a){return typeof i=="string"?arguments.length===2?(gc("data",this.frozen),this.namespace[i]=a,this):C3.call(this.namespace,i)&&this.namespace[i]||void 0:i?(gc("data",this.frozen),this.namespace=i,this):this.namespace}freeze(){if(this.frozen)return this;const i=this;for(;++this.freezeIndex<this.attachers.length;){const[a,...u]=this.attachers[this.freezeIndex];if(u[0]===!1)continue;u[0]===!0&&(u[0]=void 0);const s=a.call(i,...u);typeof s=="function"&&this.transformers.use(s)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(i){this.freeze();const a=pu(i),u=this.parser||this.Parser;return mc("parse",u),u(String(a),a)}process(i,a){const u=this;return this.freeze(),mc("process",this.parser||this.Parser),pc("process",this.compiler||this.Compiler),a?s(void 0,a):new Promise(s);function s(c,f){const m=pu(i),p=u.parse(m);u.run(p,m,function(b,g,S){if(b||!g||!S)return d(b);const x=g,w=u.stringify(x,S);T3(w)?S.value=w:S.result=w,d(b,S)});function d(b,g){b||!g?f(b):c?c(g):a(void 0,g)}}}processSync(i){let a=!1,u;return this.freeze(),mc("processSync",this.parser||this.Parser),pc("processSync",this.compiler||this.Compiler),this.process(i,s),ng("processSync","process",a),u;function s(c,f){a=!0,Wp(c),u=f}}run(i,a,u){eg(i),this.freeze();const s=this.transformers;return!u&&typeof a=="function"&&(u=a,a=void 0),u?c(void 0,u):new Promise(c);function c(f,m){const p=pu(a);s.run(i,p,d);function d(b,g,S){const x=g||i;b?m(b):f?f(x):u(void 0,x,S)}}}runSync(i,a){let u=!1,s;return this.run(i,a,c),ng("runSync","run",u),s;function c(f,m){Wp(f),s=m,u=!0}}stringify(i,a){this.freeze();const u=pu(a),s=this.compiler||this.Compiler;return pc("stringify",s),eg(i),s(i,u)}use(i,...a){const u=this.attachers,s=this.namespace;if(gc("use",this.frozen),i!=null)if(typeof i=="function")p(i,a);else if(typeof i=="object")Array.isArray(i)?m(i):f(i);else throw new TypeError("Expected usable value, not `"+i+"`");return this;function c(d){if(typeof d=="function")p(d,[]);else if(typeof d=="object")if(Array.isArray(d)){const[b,...g]=d;p(b,g)}else f(d);else throw new TypeError("Expected usable value, not `"+d+"`")}function f(d){if(!("plugins"in d)&&!("settings"in d))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");m(d.plugins),d.settings&&(s.settings=cc(!0,s.settings,d.settings))}function m(d){let b=-1;if(d!=null)if(Array.isArray(d))for(;++b<d.length;){const g=d[b];c(g)}else throw new TypeError("Expected a list of plugins, not `"+d+"`")}function p(d,b){let g=-1,S=-1;for(;++g<u.length;)if(u[g][0]===d){S=g;break}if(S===-1)u.push([d,...b]);else if(b.length>0){let[x,...w]=b;const _=u[S][1];Mc(_)&&Mc(x)&&(x=cc(!0,_,x)),u[S]=[d,x,...w]}}}}const A3=new tf().freeze();function mc(t,i){if(typeof i!="function")throw new TypeError("Cannot `"+t+"` without `parser`")}function pc(t,i){if(typeof i!="function")throw new TypeError("Cannot `"+t+"` without `compiler`")}function gc(t,i){if(i)throw new Error("Cannot call `"+t+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function eg(t){if(!Mc(t)||typeof t.type!="string")throw new TypeError("Expected node, got `"+t+"`")}function ng(t,i,a){if(!a)throw new Error("`"+t+"` finished async. Use `"+i+"` instead")}function pu(t){return w3(t)?t:new xy(t)}function w3(t){return!!(t&&typeof t=="object"&&"message"in t&&"messages"in t)}function T3(t){return typeof t=="string"||z3(t)}function z3(t){return!!(t&&typeof t=="object"&&"byteLength"in t&&"byteOffset"in t)}const R3="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",tg=[],lg={allowDangerousHtml:!0},D3=/^(https?|ircs?|mailto|xmpp)$/i,M3=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function _3(t){const i=O3(t),a=N3(t);return j3(i.runSync(i.parse(a),a),t)}function O3(t){const i=t.rehypePlugins||tg,a=t.remarkPlugins||tg,u=t.remarkRehypeOptions?{...t.remarkRehypeOptions,...lg}:lg;return A3().use(dE).use(a).use(u3,u).use(i)}function N3(t){const i=t.children||"",a=new xy;return typeof i=="string"&&(a.value=i),a}function j3(t,i){const a=i.allowedElements,u=i.allowElement,s=i.components,c=i.disallowedElements,f=i.skipHtml,m=i.unwrapDisallowed,p=i.urlTransform||L3;for(const b of M3)Object.hasOwn(i,b.from)&&(""+b.from+(b.to?"use `"+b.to+"` instead":"remove it")+R3+b.id,void 0);return nf(t,d),Jv(t,{Fragment:E.Fragment,components:s,ignoreInvalidStyle:!0,jsx:E.jsx,jsxs:E.jsxs,passKeys:!0,passNode:!0});function d(b,g,S){if(b.type==="raw"&&S&&typeof g=="number")return f?S.children.splice(g,1):S.children[g]={type:"text",value:b.value},g;if(b.type==="element"){let x;for(x in rc)if(Object.hasOwn(rc,x)&&Object.hasOwn(b.properties,x)){const w=b.properties[x],_=rc[x];(_===null||_.includes(b.tagName))&&(b.properties[x]=p(String(w||""),x,b))}}if(b.type==="element"){let x=a?!a.includes(b.tagName):c?c.includes(b.tagName):!1;if(!x&&u&&typeof g=="number"&&(x=!u(b,g,S)),x&&S&&typeof g=="number")return m&&b.children?S.children.splice(g,1,...b.children):S.children.splice(g,1),g}}}function L3(t){const i=t.indexOf(":"),a=t.indexOf("?"),u=t.indexOf("#"),s=t.indexOf("/");return i===-1||s!==-1&&i>s||a!==-1&&i>a||u!==-1&&i>u||D3.test(t.slice(0,i))?t:""}function ig(t,i){const a=String(t);if(typeof i!="string")throw new TypeError("Expected character");let u=0,s=a.indexOf(i);for(;s!==-1;)u++,s=a.indexOf(i,s+i.length);return u}function B3(t){if(typeof t!="string")throw new TypeError("Expected a string");return t.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}function U3(t,i,a){const s=Mu((a||{}).ignore||[]),c=H3(i);let f=-1;for(;++f<c.length;)vy(t,"text",m);function m(d,b){let g=-1,S;for(;++g<b.length;){const x=b[g],w=S?S.children:void 0;if(s(x,w?w.indexOf(x):void 0,S))return;S=x}if(S)return p(d,b)}function p(d,b){const g=b[b.length-1],S=c[f][0],x=c[f][1];let w=0;const D=g.children.indexOf(d);let R=!1,X=[];S.lastIndex=0;let U=S.exec(d.value);for(;U;){const te=U.index,le={index:U.index,input:U.input,stack:[...b,d]};let q=x(...U,le);if(typeof q=="string"&&(q=q.length>0?{type:"text",value:q}:void 0),q===!1?S.lastIndex=te+1:(w!==te&&X.push({type:"text",value:d.value.slice(w,te)}),Array.isArray(q)?X.push(...q):q&&X.push(q),w=te+U[0].length,R=!0),!S.global)break;U=S.exec(d.value)}return R?(w<d.value.length&&X.push({type:"text",value:d.value.slice(w)}),g.children.splice(D,1,...X)):X=[d],D+X.length}}function H3(t){const i=[];if(!Array.isArray(t))throw new TypeError("Expected find and replace tuple or list of tuples");const a=!t[0]||Array.isArray(t[0])?t:[t];let u=-1;for(;++u<a.length;){const s=a[u];i.push([q3(s[0]),Y3(s[1])])}return i}function q3(t){return typeof t=="string"?new RegExp(B3(t),"g"):t}function Y3(t){return typeof t=="function"?t:function(){return t}}const yc="phrasing",bc=["autolink","link","image","label"];function V3(){return{transforms:[K3],enter:{literalAutolink:G3,literalAutolinkEmail:vc,literalAutolinkHttp:vc,literalAutolinkWww:vc},exit:{literalAutolink:Z3,literalAutolinkEmail:I3,literalAutolinkHttp:Q3,literalAutolinkWww:F3}}}function X3(){return{unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:yc,notInConstruct:bc},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:yc,notInConstruct:bc},{character:":",before:"[ps]",after:"\\/",inConstruct:yc,notInConstruct:bc}]}}function G3(t){this.enter({type:"link",title:null,url:"",children:[]},t)}function vc(t){this.config.enter.autolinkProtocol.call(this,t)}function Q3(t){this.config.exit.autolinkProtocol.call(this,t)}function F3(t){this.config.exit.data.call(this,t);const i=this.stack[this.stack.length-1];i.type,i.url="http://"+this.sliceSerialize(t)}function I3(t){this.config.exit.autolinkEmail.call(this,t)}function Z3(t){this.exit(t)}function K3(t){U3(t,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,J3],[new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)","gu"),W3]],{ignore:["link","linkReference"]})}function J3(t,i,a,u,s){let c="";if(!Sy(s)||(/^w/i.test(i)&&(a=i+a,i="",c="http://"),!P3(a)))return!1;const f=$3(a+u);if(!f[0])return!1;const m={type:"link",title:null,url:c+i+f[0],children:[{type:"text",value:i+f[0]}]};return f[1]?[m,{type:"text",value:f[1]}]:m}function W3(t,i,a,u){return!Sy(u,!0)||/[-\d_]$/.test(a)?!1:{type:"link",title:null,url:"mailto:"+i+"@"+a,children:[{type:"text",value:i+"@"+a}]}}function P3(t){const i=t.split(".");return!(i.length<2||i[i.length-1]&&(/_/.test(i[i.length-1])||!/[a-zA-Z\d]/.test(i[i.length-1]))||i[i.length-2]&&(/_/.test(i[i.length-2])||!/[a-zA-Z\d]/.test(i[i.length-2])))}function $3(t){const i=/[!"&'),.:;<>?\]}]+$/.exec(t);if(!i)return[t,void 0];t=t.slice(0,i.index);let a=i[0],u=a.indexOf(")");const s=ig(t,"(");let c=ig(t,")");for(;u!==-1&&s>c;)t+=a.slice(0,u+1),a=a.slice(u+1),u=a.indexOf(")"),c++;return[t,a]}function Sy(t,i){const a=t.input.charCodeAt(t.index-1);return(t.index===0||Ml(a)||zu(a))&&(!i||a!==47)}Ey.peek=o4;function e4(){this.buffer()}function n4(t){this.enter({type:"footnoteReference",identifier:"",label:""},t)}function t4(){this.buffer()}function l4(t){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},t)}function i4(t){const i=this.resume(),a=this.stack[this.stack.length-1];a.type,a.identifier=at(this.sliceSerialize(t)).toLowerCase(),a.label=i}function a4(t){this.exit(t)}function r4(t){const i=this.resume(),a=this.stack[this.stack.length-1];a.type,a.identifier=at(this.sliceSerialize(t)).toLowerCase(),a.label=i}function u4(t){this.exit(t)}function o4(){return"["}function Ey(t,i,a,u){const s=a.createTracker(u);let c=s.move("[^");const f=a.enter("footnoteReference"),m=a.enter("reference");return c+=s.move(a.safe(a.associationId(t),{after:"]",before:c})),m(),f(),c+=s.move("]"),c}function s4(){return{enter:{gfmFootnoteCallString:e4,gfmFootnoteCall:n4,gfmFootnoteDefinitionLabelString:t4,gfmFootnoteDefinition:l4},exit:{gfmFootnoteCallString:i4,gfmFootnoteCall:a4,gfmFootnoteDefinitionLabelString:r4,gfmFootnoteDefinition:u4}}}function c4(t){let i=!1;return t&&t.firstLineBlank&&(i=!0),{handlers:{footnoteDefinition:a,footnoteReference:Ey},unsafe:[{character:"[",inConstruct:["label","phrasing","reference"]}]};function a(u,s,c,f){const m=c.createTracker(f);let p=m.move("[^");const d=c.enter("footnoteDefinition"),b=c.enter("label");return p+=m.move(c.safe(c.associationId(u),{before:p,after:"]"})),b(),p+=m.move("]:"),u.children&&u.children.length>0&&(m.shift(4),p+=m.move((i?`
`:" ")+c.indentLines(c.containerFlow(u,m.current()),i?ky:f4))),d(),p}}function f4(t,i,a){return i===0?t:ky(t,i,a)}function ky(t,i,a){return(a?"":"    ")+t}const h4=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];Cy.peek=y4;function d4(){return{canContainEols:["delete"],enter:{strikethrough:p4},exit:{strikethrough:g4}}}function m4(){return{unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:h4}],handlers:{delete:Cy}}}function p4(t){this.enter({type:"delete",children:[]},t)}function g4(t){this.exit(t)}function Cy(t,i,a,u){const s=a.createTracker(u),c=a.enter("strikethrough");let f=s.move("~~");return f+=a.containerPhrasing(t,{...s.current(),before:f,after:"~"}),f+=s.move("~~"),c(),f}function y4(){return"~"}function b4(t){return t.length}function v4(t,i){const a=i||{},u=(a.align||[]).concat(),s=a.stringLength||b4,c=[],f=[],m=[],p=[];let d=0,b=-1;for(;++b<t.length;){const _=[],D=[];let R=-1;for(t[b].length>d&&(d=t[b].length);++R<t[b].length;){const X=x4(t[b][R]);if(a.alignDelimiters!==!1){const U=s(X);D[R]=U,(p[R]===void 0||U>p[R])&&(p[R]=U)}_.push(X)}f[b]=_,m[b]=D}let g=-1;if(typeof u=="object"&&"length"in u)for(;++g<d;)c[g]=ag(u[g]);else{const _=ag(u);for(;++g<d;)c[g]=_}g=-1;const S=[],x=[];for(;++g<d;){const _=c[g];let D="",R="";_===99?(D=":",R=":"):_===108?D=":":_===114&&(R=":");let X=a.alignDelimiters===!1?1:Math.max(1,p[g]-D.length-R.length);const U=D+"-".repeat(X)+R;a.alignDelimiters!==!1&&(X=D.length+X+R.length,X>p[g]&&(p[g]=X),x[g]=X),S[g]=U}f.splice(1,0,S),m.splice(1,0,x),b=-1;const w=[];for(;++b<f.length;){const _=f[b],D=m[b];g=-1;const R=[];for(;++g<d;){const X=_[g]||"";let U="",te="";if(a.alignDelimiters!==!1){const le=p[g]-(D[g]||0),q=c[g];q===114?U=" ".repeat(le):q===99?le%2?(U=" ".repeat(le/2+.5),te=" ".repeat(le/2-.5)):(U=" ".repeat(le/2),te=U):te=" ".repeat(le)}a.delimiterStart!==!1&&!g&&R.push("|"),a.padding!==!1&&!(a.alignDelimiters===!1&&X==="")&&(a.delimiterStart!==!1||g)&&R.push(" "),a.alignDelimiters!==!1&&R.push(U),R.push(X),a.alignDelimiters!==!1&&R.push(te),a.padding!==!1&&R.push(" "),(a.delimiterEnd!==!1||g!==d-1)&&R.push("|")}w.push(a.delimiterEnd===!1?R.join("").replace(/ +$/,""):R.join(""))}return w.join(`
`)}function x4(t){return t==null?"":String(t)}function ag(t){const i=typeof t=="string"?t.codePointAt(0):0;return i===67||i===99?99:i===76||i===108?108:i===82||i===114?114:0}function S4(t,i,a,u){const s=a.enter("blockquote"),c=a.createTracker(u);c.move("> "),c.shift(2);const f=a.indentLines(a.containerFlow(t,c.current()),E4);return s(),f}function E4(t,i,a){return">"+(a?"":" ")+t}function k4(t,i){return rg(t,i.inConstruct,!0)&&!rg(t,i.notInConstruct,!1)}function rg(t,i,a){if(typeof i=="string"&&(i=[i]),!i||i.length===0)return a;let u=-1;for(;++u<i.length;)if(t.includes(i[u]))return!0;return!1}function ug(t,i,a,u){let s=-1;for(;++s<a.unsafe.length;)if(a.unsafe[s].character===`
`&&k4(a.stack,a.unsafe[s]))return/[ \t]/.test(u.before)?"":" ";return`\\
`}function C4(t,i){const a=String(t);let u=a.indexOf(i),s=u,c=0,f=0;if(typeof i!="string")throw new TypeError("Expected substring");for(;u!==-1;)u===s?++c>f&&(f=c):c=1,s=u+i.length,u=a.indexOf(i,s);return f}function A4(t,i){return!!(i.options.fences===!1&&t.value&&!t.lang&&/[^ \r\n]/.test(t.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(t.value))}function w4(t){const i=t.options.fence||"`";if(i!=="`"&&i!=="~")throw new Error("Cannot serialize code with `"+i+"` for `options.fence`, expected `` ` `` or `~`");return i}function T4(t,i,a,u){const s=w4(a),c=t.value||"",f=s==="`"?"GraveAccent":"Tilde";if(A4(t,a)){const g=a.enter("codeIndented"),S=a.indentLines(c,z4);return g(),S}const m=a.createTracker(u),p=s.repeat(Math.max(C4(c,s)+1,3)),d=a.enter("codeFenced");let b=m.move(p);if(t.lang){const g=a.enter(`codeFencedLang${f}`);b+=m.move(a.safe(t.lang,{before:b,after:" ",encode:["`"],...m.current()})),g()}if(t.lang&&t.meta){const g=a.enter(`codeFencedMeta${f}`);b+=m.move(" "),b+=m.move(a.safe(t.meta,{before:b,after:`
`,encode:["`"],...m.current()})),g()}return b+=m.move(`
`),c&&(b+=m.move(c+`
`)),b+=m.move(p),d(),b}function z4(t,i,a){return(a?"":"    ")+t}function lf(t){const i=t.options.quote||'"';if(i!=='"'&&i!=="'")throw new Error("Cannot serialize title with `"+i+"` for `options.quote`, expected `\"`, or `'`");return i}function R4(t,i,a,u){const s=lf(a),c=s==='"'?"Quote":"Apostrophe",f=a.enter("definition");let m=a.enter("label");const p=a.createTracker(u);let d=p.move("[");return d+=p.move(a.safe(a.associationId(t),{before:d,after:"]",...p.current()})),d+=p.move("]: "),m(),!t.url||/[\0- \u007F]/.test(t.url)?(m=a.enter("destinationLiteral"),d+=p.move("<"),d+=p.move(a.safe(t.url,{before:d,after:">",...p.current()})),d+=p.move(">")):(m=a.enter("destinationRaw"),d+=p.move(a.safe(t.url,{before:d,after:t.title?" ":`
`,...p.current()}))),m(),t.title&&(m=a.enter(`title${c}`),d+=p.move(" "+s),d+=p.move(a.safe(t.title,{before:d,after:s,...p.current()})),d+=p.move(s),m()),f(),d}function D4(t){const i=t.options.emphasis||"*";if(i!=="*"&&i!=="_")throw new Error("Cannot serialize emphasis with `"+i+"` for `options.emphasis`, expected `*`, or `_`");return i}function Ha(t){return"&#x"+t.toString(16).toUpperCase()+";"}function Au(t,i,a){const u=Ti(t),s=Ti(i);return u===void 0?s===void 0?a==="_"?{inside:!0,outside:!0}:{inside:!1,outside:!1}:s===1?{inside:!0,outside:!0}:{inside:!1,outside:!0}:u===1?s===void 0?{inside:!1,outside:!1}:s===1?{inside:!0,outside:!0}:{inside:!1,outside:!1}:s===void 0?{inside:!1,outside:!1}:s===1?{inside:!0,outside:!1}:{inside:!1,outside:!1}}Ay.peek=M4;function Ay(t,i,a,u){const s=D4(a),c=a.enter("emphasis"),f=a.createTracker(u),m=f.move(s);let p=f.move(a.containerPhrasing(t,{after:s,before:m,...f.current()}));const d=p.charCodeAt(0),b=Au(u.before.charCodeAt(u.before.length-1),d,s);b.inside&&(p=Ha(d)+p.slice(1));const g=p.charCodeAt(p.length-1),S=Au(u.after.charCodeAt(0),g,s);S.inside&&(p=p.slice(0,-1)+Ha(g));const x=f.move(s);return c(),a.attentionEncodeSurroundingInfo={after:S.outside,before:b.outside},m+p+x}function M4(t,i,a){return a.options.emphasis||"*"}function _4(t,i){let a=!1;return nf(t,function(u){if("value"in u&&/\r?\n|\r/.test(u.value)||u.type==="break")return a=!0,Rc}),!!((!t.depth||t.depth<3)&&Zc(t)&&(i.options.setext||a))}function O4(t,i,a,u){const s=Math.max(Math.min(6,t.depth||1),1),c=a.createTracker(u);if(_4(t,a)){const b=a.enter("headingSetext"),g=a.enter("phrasing"),S=a.containerPhrasing(t,{...c.current(),before:`
`,after:`
`});return g(),b(),S+`
`+(s===1?"=":"-").repeat(S.length-(Math.max(S.lastIndexOf("\r"),S.lastIndexOf(`
`))+1))}const f="#".repeat(s),m=a.enter("headingAtx"),p=a.enter("phrasing");c.move(f+" ");let d=a.containerPhrasing(t,{before:"# ",after:`
`,...c.current()});return/^[\t ]/.test(d)&&(d=Ha(d.charCodeAt(0))+d.slice(1)),d=d?f+" "+d:f,a.options.closeAtx&&(d+=" "+f),p(),m(),d}wy.peek=N4;function wy(t){return t.value||""}function N4(){return"<"}Ty.peek=j4;function Ty(t,i,a,u){const s=lf(a),c=s==='"'?"Quote":"Apostrophe",f=a.enter("image");let m=a.enter("label");const p=a.createTracker(u);let d=p.move("![");return d+=p.move(a.safe(t.alt,{before:d,after:"]",...p.current()})),d+=p.move("]("),m(),!t.url&&t.title||/[\0- \u007F]/.test(t.url)?(m=a.enter("destinationLiteral"),d+=p.move("<"),d+=p.move(a.safe(t.url,{before:d,after:">",...p.current()})),d+=p.move(">")):(m=a.enter("destinationRaw"),d+=p.move(a.safe(t.url,{before:d,after:t.title?" ":")",...p.current()}))),m(),t.title&&(m=a.enter(`title${c}`),d+=p.move(" "+s),d+=p.move(a.safe(t.title,{before:d,after:s,...p.current()})),d+=p.move(s),m()),d+=p.move(")"),f(),d}function j4(){return"!"}zy.peek=L4;function zy(t,i,a,u){const s=t.referenceType,c=a.enter("imageReference");let f=a.enter("label");const m=a.createTracker(u);let p=m.move("![");const d=a.safe(t.alt,{before:p,after:"]",...m.current()});p+=m.move(d+"]["),f();const b=a.stack;a.stack=[],f=a.enter("reference");const g=a.safe(a.associationId(t),{before:p,after:"]",...m.current()});return f(),a.stack=b,c(),s==="full"||!d||d!==g?p+=m.move(g+"]"):s==="shortcut"?p=p.slice(0,-1):p+=m.move("]"),p}function L4(){return"!"}Ry.peek=B4;function Ry(t,i,a){let u=t.value||"",s="`",c=-1;for(;new RegExp("(^|[^`])"+s+"([^`]|$)").test(u);)s+="`";for(/[^ \r\n]/.test(u)&&(/^[ \r\n]/.test(u)&&/[ \r\n]$/.test(u)||/^`|`$/.test(u))&&(u=" "+u+" ");++c<a.unsafe.length;){const f=a.unsafe[c],m=a.compilePattern(f);let p;if(f.atBreak)for(;p=m.exec(u);){let d=p.index;u.charCodeAt(d)===10&&u.charCodeAt(d-1)===13&&d--,u=u.slice(0,d)+" "+u.slice(p.index+1)}}return s+u+s}function B4(){return"`"}function Dy(t,i){const a=Zc(t);return!!(!i.options.resourceLink&&t.url&&!t.title&&t.children&&t.children.length===1&&t.children[0].type==="text"&&(a===t.url||"mailto:"+a===t.url)&&/^[a-z][a-z+.-]+:/i.test(t.url)&&!/[\0- <>\u007F]/.test(t.url))}My.peek=U4;function My(t,i,a,u){const s=lf(a),c=s==='"'?"Quote":"Apostrophe",f=a.createTracker(u);let m,p;if(Dy(t,a)){const b=a.stack;a.stack=[],m=a.enter("autolink");let g=f.move("<");return g+=f.move(a.containerPhrasing(t,{before:g,after:">",...f.current()})),g+=f.move(">"),m(),a.stack=b,g}m=a.enter("link"),p=a.enter("label");let d=f.move("[");return d+=f.move(a.containerPhrasing(t,{before:d,after:"](",...f.current()})),d+=f.move("]("),p(),!t.url&&t.title||/[\0- \u007F]/.test(t.url)?(p=a.enter("destinationLiteral"),d+=f.move("<"),d+=f.move(a.safe(t.url,{before:d,after:">",...f.current()})),d+=f.move(">")):(p=a.enter("destinationRaw"),d+=f.move(a.safe(t.url,{before:d,after:t.title?" ":")",...f.current()}))),p(),t.title&&(p=a.enter(`title${c}`),d+=f.move(" "+s),d+=f.move(a.safe(t.title,{before:d,after:s,...f.current()})),d+=f.move(s),p()),d+=f.move(")"),m(),d}function U4(t,i,a){return Dy(t,a)?"<":"["}_y.peek=H4;function _y(t,i,a,u){const s=t.referenceType,c=a.enter("linkReference");let f=a.enter("label");const m=a.createTracker(u);let p=m.move("[");const d=a.containerPhrasing(t,{before:p,after:"]",...m.current()});p+=m.move(d+"]["),f();const b=a.stack;a.stack=[],f=a.enter("reference");const g=a.safe(a.associationId(t),{before:p,after:"]",...m.current()});return f(),a.stack=b,c(),s==="full"||!d||d!==g?p+=m.move(g+"]"):s==="shortcut"?p=p.slice(0,-1):p+=m.move("]"),p}function H4(){return"["}function af(t){const i=t.options.bullet||"*";if(i!=="*"&&i!=="+"&&i!=="-")throw new Error("Cannot serialize items with `"+i+"` for `options.bullet`, expected `*`, `+`, or `-`");return i}function q4(t){const i=af(t),a=t.options.bulletOther;if(!a)return i==="*"?"-":"*";if(a!=="*"&&a!=="+"&&a!=="-")throw new Error("Cannot serialize items with `"+a+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(a===i)throw new Error("Expected `bullet` (`"+i+"`) and `bulletOther` (`"+a+"`) to be different");return a}function Y4(t){const i=t.options.bulletOrdered||".";if(i!=="."&&i!==")")throw new Error("Cannot serialize items with `"+i+"` for `options.bulletOrdered`, expected `.` or `)`");return i}function Oy(t){const i=t.options.rule||"*";if(i!=="*"&&i!=="-"&&i!=="_")throw new Error("Cannot serialize rules with `"+i+"` for `options.rule`, expected `*`, `-`, or `_`");return i}function V4(t,i,a,u){const s=a.enter("list"),c=a.bulletCurrent;let f=t.ordered?Y4(a):af(a);const m=t.ordered?f==="."?")":".":q4(a);let p=i&&a.bulletLastUsed?f===a.bulletLastUsed:!1;if(!t.ordered){const b=t.children?t.children[0]:void 0;if((f==="*"||f==="-")&&b&&(!b.children||!b.children[0])&&a.stack[a.stack.length-1]==="list"&&a.stack[a.stack.length-2]==="listItem"&&a.stack[a.stack.length-3]==="list"&&a.stack[a.stack.length-4]==="listItem"&&a.indexStack[a.indexStack.length-1]===0&&a.indexStack[a.indexStack.length-2]===0&&a.indexStack[a.indexStack.length-3]===0&&(p=!0),Oy(a)===f&&b){let g=-1;for(;++g<t.children.length;){const S=t.children[g];if(S&&S.type==="listItem"&&S.children&&S.children[0]&&S.children[0].type==="thematicBreak"){p=!0;break}}}}p&&(f=m),a.bulletCurrent=f;const d=a.containerFlow(t,u);return a.bulletLastUsed=f,a.bulletCurrent=c,s(),d}function X4(t){const i=t.options.listItemIndent||"one";if(i!=="tab"&&i!=="one"&&i!=="mixed")throw new Error("Cannot serialize items with `"+i+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return i}function G4(t,i,a,u){const s=X4(a);let c=a.bulletCurrent||af(a);i&&i.type==="list"&&i.ordered&&(c=(typeof i.start=="number"&&i.start>-1?i.start:1)+(a.options.incrementListMarker===!1?0:i.children.indexOf(t))+c);let f=c.length+1;(s==="tab"||s==="mixed"&&(i&&i.type==="list"&&i.spread||t.spread))&&(f=Math.ceil(f/4)*4);const m=a.createTracker(u);m.move(c+" ".repeat(f-c.length)),m.shift(f);const p=a.enter("listItem"),d=a.indentLines(a.containerFlow(t,m.current()),b);return p(),d;function b(g,S,x){return S?(x?"":" ".repeat(f))+g:(x?c:c+" ".repeat(f-c.length))+g}}function Q4(t,i,a,u){const s=a.enter("paragraph"),c=a.enter("phrasing"),f=a.containerPhrasing(t,u);return c(),s(),f}const F4=Mu(["break","delete","emphasis","footnote","footnoteReference","image","imageReference","inlineCode","inlineMath","link","linkReference","mdxJsxTextElement","mdxTextExpression","strong","text","textDirective"]);function I4(t,i,a,u){return(t.children.some(function(f){return F4(f)})?a.containerPhrasing:a.containerFlow).call(a,t,u)}function Z4(t){const i=t.options.strong||"*";if(i!=="*"&&i!=="_")throw new Error("Cannot serialize strong with `"+i+"` for `options.strong`, expected `*`, or `_`");return i}Ny.peek=K4;function Ny(t,i,a,u){const s=Z4(a),c=a.enter("strong"),f=a.createTracker(u),m=f.move(s+s);let p=f.move(a.containerPhrasing(t,{after:s,before:m,...f.current()}));const d=p.charCodeAt(0),b=Au(u.before.charCodeAt(u.before.length-1),d,s);b.inside&&(p=Ha(d)+p.slice(1));const g=p.charCodeAt(p.length-1),S=Au(u.after.charCodeAt(0),g,s);S.inside&&(p=p.slice(0,-1)+Ha(g));const x=f.move(s+s);return c(),a.attentionEncodeSurroundingInfo={after:S.outside,before:b.outside},m+p+x}function K4(t,i,a){return a.options.strong||"*"}function J4(t,i,a,u){return a.safe(t.value,u)}function W4(t){const i=t.options.ruleRepetition||3;if(i<3)throw new Error("Cannot serialize rules with repetition `"+i+"` for `options.ruleRepetition`, expected `3` or more");return i}function P4(t,i,a){const u=(Oy(a)+(a.options.ruleSpaces?" ":"")).repeat(W4(a));return a.options.ruleSpaces?u.slice(0,-1):u}const jy={blockquote:S4,break:ug,code:T4,definition:R4,emphasis:Ay,hardBreak:ug,heading:O4,html:wy,image:Ty,imageReference:zy,inlineCode:Ry,link:My,linkReference:_y,list:V4,listItem:G4,paragraph:Q4,root:I4,strong:Ny,text:J4,thematicBreak:P4};function $4(){return{enter:{table:ek,tableData:og,tableHeader:og,tableRow:tk},exit:{codeText:lk,table:nk,tableData:xc,tableHeader:xc,tableRow:xc}}}function ek(t){const i=t._align;this.enter({type:"table",align:i.map(function(a){return a==="none"?null:a}),children:[]},t),this.data.inTable=!0}function nk(t){this.exit(t),this.data.inTable=void 0}function tk(t){this.enter({type:"tableRow",children:[]},t)}function xc(t){this.exit(t)}function og(t){this.enter({type:"tableCell",children:[]},t)}function lk(t){let i=this.resume();this.data.inTable&&(i=i.replace(/\\([\\|])/g,ik));const a=this.stack[this.stack.length-1];a.type,a.value=i,this.exit(t)}function ik(t,i){return i==="|"?i:t}function ak(t){const i=t||{},a=i.tableCellPadding,u=i.tablePipeAlign,s=i.stringLength,c=a?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{inlineCode:S,table:f,tableCell:p,tableRow:m}};function f(x,w,_,D){return d(b(x,_,D),x.align)}function m(x,w,_,D){const R=g(x,_,D),X=d([R]);return X.slice(0,X.indexOf(`
`))}function p(x,w,_,D){const R=_.enter("tableCell"),X=_.enter("phrasing"),U=_.containerPhrasing(x,{...D,before:c,after:c});return X(),R(),U}function d(x,w){return v4(x,{align:w,alignDelimiters:u,padding:a,stringLength:s})}function b(x,w,_){const D=x.children;let R=-1;const X=[],U=w.enter("table");for(;++R<D.length;)X[R]=g(D[R],w,_);return U(),X}function g(x,w,_){const D=x.children;let R=-1;const X=[],U=w.enter("tableRow");for(;++R<D.length;)X[R]=p(D[R],x,w,_);return U(),X}function S(x,w,_){let D=jy.inlineCode(x,w,_);return _.stack.includes("tableCell")&&(D=D.replace(/\|/g,"\\$&")),D}}function rk(){return{exit:{taskListCheckValueChecked:sg,taskListCheckValueUnchecked:sg,paragraph:ok}}}function uk(){return{unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:sk}}}function sg(t){const i=this.stack[this.stack.length-2];i.type,i.checked=t.type==="taskListCheckValueChecked"}function ok(t){const i=this.stack[this.stack.length-2];if(i&&i.type==="listItem"&&typeof i.checked=="boolean"){const a=this.stack[this.stack.length-1];a.type;const u=a.children[0];if(u&&u.type==="text"){const s=i.children;let c=-1,f;for(;++c<s.length;){const m=s[c];if(m.type==="paragraph"){f=m;break}}f===a&&(u.value=u.value.slice(1),u.value.length===0?a.children.shift():a.position&&u.position&&typeof u.position.start.offset=="number"&&(u.position.start.column++,u.position.start.offset++,a.position.start=Object.assign({},u.position.start)))}}this.exit(t)}function sk(t,i,a,u){const s=t.children[0],c=typeof t.checked=="boolean"&&s&&s.type==="paragraph",f="["+(t.checked?"x":" ")+"] ",m=a.createTracker(u);c&&m.move(f);let p=jy.listItem(t,i,a,{...u,...m.current()});return c&&(p=p.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,d)),p;function d(b){return b+f}}function ck(){return[V3(),s4(),d4(),$4(),rk()]}function fk(t){return{extensions:[X3(),c4(t),m4(),ak(t),uk()]}}const hk={tokenize:bk,partial:!0},Ly={tokenize:vk,partial:!0},By={tokenize:xk,partial:!0},Uy={tokenize:Sk,partial:!0},dk={tokenize:Ek,partial:!0},Hy={name:"wwwAutolink",tokenize:gk,previous:Yy},qy={name:"protocolAutolink",tokenize:yk,previous:Vy},Ut={name:"emailAutolink",tokenize:pk,previous:Xy},mt={};function mk(){return{text:mt}}let Dl=48;for(;Dl<123;)mt[Dl]=Ut,Dl++,Dl===58?Dl=65:Dl===91&&(Dl=97);mt[43]=Ut;mt[45]=Ut;mt[46]=Ut;mt[95]=Ut;mt[72]=[Ut,qy];mt[104]=[Ut,qy];mt[87]=[Ut,Hy];mt[119]=[Ut,Hy];function pk(t,i,a){const u=this;let s,c;return f;function f(g){return!Oc(g)||!Xy.call(u,u.previous)||rf(u.events)?a(g):(t.enter("literalAutolink"),t.enter("literalAutolinkEmail"),m(g))}function m(g){return Oc(g)?(t.consume(g),m):g===64?(t.consume(g),p):a(g)}function p(g){return g===46?t.check(dk,b,d)(g):g===45||g===95||gn(g)?(c=!0,t.consume(g),p):b(g)}function d(g){return t.consume(g),s=!0,p}function b(g){return c&&s&&Sn(u.previous)?(t.exit("literalAutolinkEmail"),t.exit("literalAutolink"),i(g)):a(g)}}function gk(t,i,a){const u=this;return s;function s(f){return f!==87&&f!==119||!Yy.call(u,u.previous)||rf(u.events)?a(f):(t.enter("literalAutolink"),t.enter("literalAutolinkWww"),t.check(hk,t.attempt(Ly,t.attempt(By,c),a),a)(f))}function c(f){return t.exit("literalAutolinkWww"),t.exit("literalAutolink"),i(f)}}function yk(t,i,a){const u=this;let s="",c=!1;return f;function f(g){return(g===72||g===104)&&Vy.call(u,u.previous)&&!rf(u.events)?(t.enter("literalAutolink"),t.enter("literalAutolinkHttp"),s+=String.fromCodePoint(g),t.consume(g),m):a(g)}function m(g){if(Sn(g)&&s.length<5)return s+=String.fromCodePoint(g),t.consume(g),m;if(g===58){const S=s.toLowerCase();if(S==="http"||S==="https")return t.consume(g),p}return a(g)}function p(g){return g===47?(t.consume(g),c?d:(c=!0,p)):a(g)}function d(g){return g===null||Eu(g)||Xe(g)||Ml(g)||zu(g)?a(g):t.attempt(Ly,t.attempt(By,b),a)(g)}function b(g){return t.exit("literalAutolinkHttp"),t.exit("literalAutolink"),i(g)}}function bk(t,i,a){let u=0;return s;function s(f){return(f===87||f===119)&&u<3?(u++,t.consume(f),s):f===46&&u===3?(t.consume(f),c):a(f)}function c(f){return f===null?a(f):i(f)}}function vk(t,i,a){let u,s,c;return f;function f(d){return d===46||d===95?t.check(Uy,p,m)(d):d===null||Xe(d)||Ml(d)||d!==45&&zu(d)?p(d):(c=!0,t.consume(d),f)}function m(d){return d===95?u=!0:(s=u,u=void 0),t.consume(d),f}function p(d){return s||u||!c?a(d):i(d)}}function xk(t,i){let a=0,u=0;return s;function s(f){return f===40?(a++,t.consume(f),s):f===41&&u<a?c(f):f===33||f===34||f===38||f===39||f===41||f===42||f===44||f===46||f===58||f===59||f===60||f===63||f===93||f===95||f===126?t.check(Uy,i,c)(f):f===null||Xe(f)||Ml(f)?i(f):(t.consume(f),s)}function c(f){return f===41&&u++,t.consume(f),s}}function Sk(t,i,a){return u;function u(m){return m===33||m===34||m===39||m===41||m===42||m===44||m===46||m===58||m===59||m===63||m===95||m===126?(t.consume(m),u):m===38?(t.consume(m),c):m===93?(t.consume(m),s):m===60||m===null||Xe(m)||Ml(m)?i(m):a(m)}function s(m){return m===null||m===40||m===91||Xe(m)||Ml(m)?i(m):u(m)}function c(m){return Sn(m)?f(m):a(m)}function f(m){return m===59?(t.consume(m),u):Sn(m)?(t.consume(m),f):a(m)}}function Ek(t,i,a){return u;function u(c){return t.consume(c),s}function s(c){return gn(c)?a(c):i(c)}}function Yy(t){return t===null||t===40||t===42||t===95||t===91||t===93||t===126||Xe(t)}function Vy(t){return!Sn(t)}function Xy(t){return!(t===47||Oc(t))}function Oc(t){return t===43||t===45||t===46||t===95||gn(t)}function rf(t){let i=t.length,a=!1;for(;i--;){const u=t[i][1];if((u.type==="labelLink"||u.type==="labelImage")&&!u._balanced){a=!0;break}if(u._gfmAutolinkLiteralWalkedInto){a=!1;break}}return t.length>0&&!a&&(t[t.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),a}const kk={tokenize:Mk,partial:!0};function Ck(){return{document:{91:{name:"gfmFootnoteDefinition",tokenize:zk,continuation:{tokenize:Rk},exit:Dk}},text:{91:{name:"gfmFootnoteCall",tokenize:Tk},93:{name:"gfmPotentialFootnoteCall",add:"after",tokenize:Ak,resolveTo:wk}}}}function Ak(t,i,a){const u=this;let s=u.events.length;const c=u.parser.gfmFootnotes||(u.parser.gfmFootnotes=[]);let f;for(;s--;){const p=u.events[s][1];if(p.type==="labelImage"){f=p;break}if(p.type==="gfmFootnoteCall"||p.type==="labelLink"||p.type==="label"||p.type==="image"||p.type==="link")break}return m;function m(p){if(!f||!f._balanced)return a(p);const d=at(u.sliceSerialize({start:f.end,end:u.now()}));return d.codePointAt(0)!==94||!c.includes(d.slice(1))?a(p):(t.enter("gfmFootnoteCallLabelMarker"),t.consume(p),t.exit("gfmFootnoteCallLabelMarker"),i(p))}}function wk(t,i){let a=t.length;for(;a--;)if(t[a][1].type==="labelImage"&&t[a][0]==="enter"){t[a][1];break}t[a+1][1].type="data",t[a+3][1].type="gfmFootnoteCallLabelMarker";const u={type:"gfmFootnoteCall",start:Object.assign({},t[a+3][1].start),end:Object.assign({},t[t.length-1][1].end)},s={type:"gfmFootnoteCallMarker",start:Object.assign({},t[a+3][1].end),end:Object.assign({},t[a+3][1].end)};s.end.column++,s.end.offset++,s.end._bufferIndex++;const c={type:"gfmFootnoteCallString",start:Object.assign({},s.end),end:Object.assign({},t[t.length-1][1].start)},f={type:"chunkString",contentType:"string",start:Object.assign({},c.start),end:Object.assign({},c.end)},m=[t[a+1],t[a+2],["enter",u,i],t[a+3],t[a+4],["enter",s,i],["exit",s,i],["enter",c,i],["enter",f,i],["exit",f,i],["exit",c,i],t[t.length-2],t[t.length-1],["exit",u,i]];return t.splice(a,t.length-a+1,...m),t}function Tk(t,i,a){const u=this,s=u.parser.gfmFootnotes||(u.parser.gfmFootnotes=[]);let c=0,f;return m;function m(g){return t.enter("gfmFootnoteCall"),t.enter("gfmFootnoteCallLabelMarker"),t.consume(g),t.exit("gfmFootnoteCallLabelMarker"),p}function p(g){return g!==94?a(g):(t.enter("gfmFootnoteCallMarker"),t.consume(g),t.exit("gfmFootnoteCallMarker"),t.enter("gfmFootnoteCallString"),t.enter("chunkString").contentType="string",d)}function d(g){if(c>999||g===93&&!f||g===null||g===91||Xe(g))return a(g);if(g===93){t.exit("chunkString");const S=t.exit("gfmFootnoteCallString");return s.includes(at(u.sliceSerialize(S)))?(t.enter("gfmFootnoteCallLabelMarker"),t.consume(g),t.exit("gfmFootnoteCallLabelMarker"),t.exit("gfmFootnoteCall"),i):a(g)}return Xe(g)||(f=!0),c++,t.consume(g),g===92?b:d}function b(g){return g===91||g===92||g===93?(t.consume(g),c++,d):d(g)}}function zk(t,i,a){const u=this,s=u.parser.gfmFootnotes||(u.parser.gfmFootnotes=[]);let c,f=0,m;return p;function p(w){return t.enter("gfmFootnoteDefinition")._container=!0,t.enter("gfmFootnoteDefinitionLabel"),t.enter("gfmFootnoteDefinitionLabelMarker"),t.consume(w),t.exit("gfmFootnoteDefinitionLabelMarker"),d}function d(w){return w===94?(t.enter("gfmFootnoteDefinitionMarker"),t.consume(w),t.exit("gfmFootnoteDefinitionMarker"),t.enter("gfmFootnoteDefinitionLabelString"),t.enter("chunkString").contentType="string",b):a(w)}function b(w){if(f>999||w===93&&!m||w===null||w===91||Xe(w))return a(w);if(w===93){t.exit("chunkString");const _=t.exit("gfmFootnoteDefinitionLabelString");return c=at(u.sliceSerialize(_)),t.enter("gfmFootnoteDefinitionLabelMarker"),t.consume(w),t.exit("gfmFootnoteDefinitionLabelMarker"),t.exit("gfmFootnoteDefinitionLabel"),S}return Xe(w)||(m=!0),f++,t.consume(w),w===92?g:b}function g(w){return w===91||w===92||w===93?(t.consume(w),f++,b):b(w)}function S(w){return w===58?(t.enter("definitionMarker"),t.consume(w),t.exit("definitionMarker"),s.includes(c)||s.push(c),De(t,x,"gfmFootnoteDefinitionWhitespace")):a(w)}function x(w){return i(w)}}function Rk(t,i,a){return t.check(Qa,i,t.attempt(kk,i,a))}function Dk(t){t.exit("gfmFootnoteDefinition")}function Mk(t,i,a){const u=this;return De(t,s,"gfmFootnoteDefinitionIndent",5);function s(c){const f=u.events[u.events.length-1];return f&&f[1].type==="gfmFootnoteDefinitionIndent"&&f[2].sliceSerialize(f[1],!0).length===4?i(c):a(c)}}function _k(t){let a=(t||{}).singleTilde;const u={name:"strikethrough",tokenize:c,resolveAll:s};return a==null&&(a=!0),{text:{126:u},insideSpan:{null:[u]},attentionMarkers:{null:[126]}};function s(f,m){let p=-1;for(;++p<f.length;)if(f[p][0]==="enter"&&f[p][1].type==="strikethroughSequenceTemporary"&&f[p][1]._close){let d=p;for(;d--;)if(f[d][0]==="exit"&&f[d][1].type==="strikethroughSequenceTemporary"&&f[d][1]._open&&f[p][1].end.offset-f[p][1].start.offset===f[d][1].end.offset-f[d][1].start.offset){f[p][1].type="strikethroughSequence",f[d][1].type="strikethroughSequence";const b={type:"strikethrough",start:Object.assign({},f[d][1].start),end:Object.assign({},f[p][1].end)},g={type:"strikethroughText",start:Object.assign({},f[d][1].end),end:Object.assign({},f[p][1].start)},S=[["enter",b,m],["enter",f[d][1],m],["exit",f[d][1],m],["enter",g,m]],x=m.parser.constructs.insideSpan.null;x&&Yn(S,S.length,0,Ru(x,f.slice(d+1,p),m)),Yn(S,S.length,0,[["exit",g,m],["enter",f[p][1],m],["exit",f[p][1],m],["exit",b,m]]),Yn(f,d-1,p-d+3,S),p=d+S.length-2;break}}for(p=-1;++p<f.length;)f[p][1].type==="strikethroughSequenceTemporary"&&(f[p][1].type="data");return f}function c(f,m,p){const d=this.previous,b=this.events;let g=0;return S;function S(w){return d===126&&b[b.length-1][1].type!=="characterEscape"?p(w):(f.enter("strikethroughSequenceTemporary"),x(w))}function x(w){const _=Ti(d);if(w===126)return g>1?p(w):(f.consume(w),g++,x);if(g<2&&!a)return p(w);const D=f.exit("strikethroughSequenceTemporary"),R=Ti(w);return D._open=!R||R===2&&!!_,D._close=!_||_===2&&!!R,m(w)}}}class Ok{constructor(){this.map=[]}add(i,a,u){Nk(this,i,a,u)}consume(i){if(this.map.sort(function(c,f){return c[0]-f[0]}),this.map.length===0)return;let a=this.map.length;const u=[];for(;a>0;)a-=1,u.push(i.slice(this.map[a][0]+this.map[a][1]),this.map[a][2]),i.length=this.map[a][0];u.push(i.slice()),i.length=0;let s=u.pop();for(;s;){for(const c of s)i.push(c);s=u.pop()}this.map.length=0}}function Nk(t,i,a,u){let s=0;if(!(a===0&&u.length===0)){for(;s<t.map.length;){if(t.map[s][0]===i){t.map[s][1]+=a,t.map[s][2].push(...u);return}s+=1}t.map.push([i,a,u])}}function jk(t,i){let a=!1;const u=[];for(;i<t.length;){const s=t[i];if(a){if(s[0]==="enter")s[1].type==="tableContent"&&u.push(t[i+1][1].type==="tableDelimiterMarker"?"left":"none");else if(s[1].type==="tableContent"){if(t[i-1][1].type==="tableDelimiterMarker"){const c=u.length-1;u[c]=u[c]==="left"?"center":"right"}}else if(s[1].type==="tableDelimiterRow")break}else s[0]==="enter"&&s[1].type==="tableDelimiterRow"&&(a=!0);i+=1}return u}function Lk(){return{flow:{null:{name:"table",tokenize:Bk,resolveAll:Uk}}}}function Bk(t,i,a){const u=this;let s=0,c=0,f;return m;function m(B){let ne=u.events.length-1;for(;ne>-1;){const ae=u.events[ne][1].type;if(ae==="lineEnding"||ae==="linePrefix")ne--;else break}const ee=ne>-1?u.events[ne][1].type:null,xe=ee==="tableHead"||ee==="tableRow"?q:p;return xe===q&&u.parser.lazy[u.now().line]?a(B):xe(B)}function p(B){return t.enter("tableHead"),t.enter("tableRow"),d(B)}function d(B){return B===124||(f=!0,c+=1),b(B)}function b(B){return B===null?a(B):fe(B)?c>1?(c=0,u.interrupt=!0,t.exit("tableRow"),t.enter("lineEnding"),t.consume(B),t.exit("lineEnding"),x):a(B):Ae(B)?De(t,b,"whitespace")(B):(c+=1,f&&(f=!1,s+=1),B===124?(t.enter("tableCellDivider"),t.consume(B),t.exit("tableCellDivider"),f=!0,b):(t.enter("data"),g(B)))}function g(B){return B===null||B===124||Xe(B)?(t.exit("data"),b(B)):(t.consume(B),B===92?S:g)}function S(B){return B===92||B===124?(t.consume(B),g):g(B)}function x(B){return u.interrupt=!1,u.parser.lazy[u.now().line]?a(B):(t.enter("tableDelimiterRow"),f=!1,Ae(B)?De(t,w,"linePrefix",u.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(B):w(B))}function w(B){return B===45||B===58?D(B):B===124?(f=!0,t.enter("tableCellDivider"),t.consume(B),t.exit("tableCellDivider"),_):le(B)}function _(B){return Ae(B)?De(t,D,"whitespace")(B):D(B)}function D(B){return B===58?(c+=1,f=!0,t.enter("tableDelimiterMarker"),t.consume(B),t.exit("tableDelimiterMarker"),R):B===45?(c+=1,R(B)):B===null||fe(B)?te(B):le(B)}function R(B){return B===45?(t.enter("tableDelimiterFiller"),X(B)):le(B)}function X(B){return B===45?(t.consume(B),X):B===58?(f=!0,t.exit("tableDelimiterFiller"),t.enter("tableDelimiterMarker"),t.consume(B),t.exit("tableDelimiterMarker"),U):(t.exit("tableDelimiterFiller"),U(B))}function U(B){return Ae(B)?De(t,te,"whitespace")(B):te(B)}function te(B){return B===124?w(B):B===null||fe(B)?!f||s!==c?le(B):(t.exit("tableDelimiterRow"),t.exit("tableHead"),i(B)):le(B)}function le(B){return a(B)}function q(B){return t.enter("tableRow"),P(B)}function P(B){return B===124?(t.enter("tableCellDivider"),t.consume(B),t.exit("tableCellDivider"),P):B===null||fe(B)?(t.exit("tableRow"),i(B)):Ae(B)?De(t,P,"whitespace")(B):(t.enter("data"),ce(B))}function ce(B){return B===null||B===124||Xe(B)?(t.exit("data"),P(B)):(t.consume(B),B===92?me:ce)}function me(B){return B===92||B===124?(t.consume(B),ce):ce(B)}}function Uk(t,i){let a=-1,u=!0,s=0,c=[0,0,0,0],f=[0,0,0,0],m=!1,p=0,d,b,g;const S=new Ok;for(;++a<t.length;){const x=t[a],w=x[1];x[0]==="enter"?w.type==="tableHead"?(m=!1,p!==0&&(cg(S,i,p,d,b),b=void 0,p=0),d={type:"table",start:Object.assign({},w.start),end:Object.assign({},w.end)},S.add(a,0,[["enter",d,i]])):w.type==="tableRow"||w.type==="tableDelimiterRow"?(u=!0,g=void 0,c=[0,0,0,0],f=[0,a+1,0,0],m&&(m=!1,b={type:"tableBody",start:Object.assign({},w.start),end:Object.assign({},w.end)},S.add(a,0,[["enter",b,i]])),s=w.type==="tableDelimiterRow"?2:b?3:1):s&&(w.type==="data"||w.type==="tableDelimiterMarker"||w.type==="tableDelimiterFiller")?(u=!1,f[2]===0&&(c[1]!==0&&(f[0]=f[1],g=gu(S,i,c,s,void 0,g),c=[0,0,0,0]),f[2]=a)):w.type==="tableCellDivider"&&(u?u=!1:(c[1]!==0&&(f[0]=f[1],g=gu(S,i,c,s,void 0,g)),c=f,f=[c[1],a,0,0])):w.type==="tableHead"?(m=!0,p=a):w.type==="tableRow"||w.type==="tableDelimiterRow"?(p=a,c[1]!==0?(f[0]=f[1],g=gu(S,i,c,s,a,g)):f[1]!==0&&(g=gu(S,i,f,s,a,g)),s=0):s&&(w.type==="data"||w.type==="tableDelimiterMarker"||w.type==="tableDelimiterFiller")&&(f[3]=a)}for(p!==0&&cg(S,i,p,d,b),S.consume(i.events),a=-1;++a<i.events.length;){const x=i.events[a];x[0]==="enter"&&x[1].type==="table"&&(x[1]._align=jk(i.events,a))}return t}function gu(t,i,a,u,s,c){const f=u===1?"tableHeader":u===2?"tableDelimiter":"tableData",m="tableContent";a[0]!==0&&(c.end=Object.assign({},Ci(i.events,a[0])),t.add(a[0],0,[["exit",c,i]]));const p=Ci(i.events,a[1]);if(c={type:f,start:Object.assign({},p),end:Object.assign({},p)},t.add(a[1],0,[["enter",c,i]]),a[2]!==0){const d=Ci(i.events,a[2]),b=Ci(i.events,a[3]),g={type:m,start:Object.assign({},d),end:Object.assign({},b)};if(t.add(a[2],0,[["enter",g,i]]),u!==2){const S=i.events[a[2]],x=i.events[a[3]];if(S[1].end=Object.assign({},x[1].end),S[1].type="chunkText",S[1].contentType="text",a[3]>a[2]+1){const w=a[2]+1,_=a[3]-a[2]-1;t.add(w,_,[])}}t.add(a[3]+1,0,[["exit",g,i]])}return s!==void 0&&(c.end=Object.assign({},Ci(i.events,s)),t.add(s,0,[["exit",c,i]]),c=void 0),c}function cg(t,i,a,u,s){const c=[],f=Ci(i.events,a);s&&(s.end=Object.assign({},f),c.push(["exit",s,i])),u.end=Object.assign({},f),c.push(["exit",u,i]),t.add(a+1,0,c)}function Ci(t,i){const a=t[i],u=a[0]==="enter"?"start":"end";return a[1][u]}const Hk={name:"tasklistCheck",tokenize:Yk};function qk(){return{text:{91:Hk}}}function Yk(t,i,a){const u=this;return s;function s(p){return u.previous!==null||!u._gfmTasklistFirstContentOfListItem?a(p):(t.enter("taskListCheck"),t.enter("taskListCheckMarker"),t.consume(p),t.exit("taskListCheckMarker"),c)}function c(p){return Xe(p)?(t.enter("taskListCheckValueUnchecked"),t.consume(p),t.exit("taskListCheckValueUnchecked"),f):p===88||p===120?(t.enter("taskListCheckValueChecked"),t.consume(p),t.exit("taskListCheckValueChecked"),f):a(p)}function f(p){return p===93?(t.enter("taskListCheckMarker"),t.consume(p),t.exit("taskListCheckMarker"),t.exit("taskListCheck"),m):a(p)}function m(p){return fe(p)?i(p):Ae(p)?t.check({tokenize:Vk},i,a)(p):a(p)}}function Vk(t,i,a){return De(t,u,"whitespace");function u(s){return s===null?a(s):i(s)}}function Xk(t){return ey([mk(),Ck(),_k(t),Lk(),qk()])}const Gk={};function Qk(t){const i=this,a=t||Gk,u=i.data(),s=u.micromarkExtensions||(u.micromarkExtensions=[]),c=u.fromMarkdownExtensions||(u.fromMarkdownExtensions=[]),f=u.toMarkdownExtensions||(u.toMarkdownExtensions=[]);s.push(Xk(a)),c.push(ck()),f.push(fk(a))}const Fk={daily:"일상(DAILY)",security:"보안(SECURITY)","web-security":"Web Security","web3-blockchain":"Web3/Blockchain","research-article":"Research/Article","study-dev-security":"Study","wargame-ctf":"Wargame/CTF",reversing:"Reversing",pwn:"Pwn",crypto:"Crypto",development:"개발(DEVELOPMENT)",travel:"여행(TRAVEL)"};function Ik(){const{id:t}=kg(),i=Bc(),a=t?uv(t):void 0;if(!a)return E.jsx("div",{className:"post-page",children:E.jsxs("div",{className:"post-not-found",children:[E.jsx("h1",{children:"포스트를 찾을 수 없습니다"}),E.jsx("p",{children:"요청하신 포스트가 존재하지 않거나 삭제되었습니다."}),E.jsx("button",{onClick:()=>i("/"),className:"back-button",children:"블로그로 돌아가기"})]})});const u=Fk[a.category]||a.category;return E.jsx("div",{className:"post-page",children:E.jsxs("div",{className:"post-container",children:[E.jsxs(wi,{to:"/",className:"back-link",children:[E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("line",{x1:"19",y1:"12",x2:"5",y2:"12"}),E.jsx("polyline",{points:"12 19 5 12 12 5"})]}),"BACK TO LIST"]}),E.jsx("div",{className:"post-category-line",children:E.jsx("span",{className:"post-category-badge",children:u})}),E.jsx("h1",{className:"post-title",children:a.title}),E.jsxs("div",{className:"post-meta",children:[E.jsxs("span",{className:"post-date",children:[E.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),E.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),E.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),E.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),Lg(a.date)]}),E.jsx("span",{className:"post-relative-time",children:jg(a.date)})]}),E.jsx("article",{className:"post-content",children:E.jsx(_3,{remarkPlugins:[Qk],components:{a:({...s})=>E.jsx("a",{...s,target:"_blank",rel:"noopener noreferrer"})},children:a.content})}),a.tags&&a.tags.length>0&&E.jsx("div",{className:"post-tags",children:a.tags.map(s=>E.jsxs("span",{className:"tag",children:["#",s]},s))})]})})}const Zk={all:"전체",daily:"일상(Daily)",security:"보안(Security)","web-security":"Web Security","web3-blockchain":"Web3 / Blockchain","research-article":"Research/Article","study-dev-security":"Study(dev/security)","wargame-ctf":"Wargame/CTF",reversing:"Reversing",pwn:"Pwn",crypto:"Crypto",development:"개발(Development)",travel:"여행(Travel)"};function Kk(){const{categoryId:t}=kg(),i=t?rv(t):[],a=Zk[t||""]||t;return E.jsxs("div",{className:"category-page",children:[E.jsx(Ug,{title:`Category: ${a}`,highlightWord:a}),E.jsxs("section",{className:"filtered-section",children:[E.jsx("h2",{className:"section-header",children:"FILTERED POSTS"}),E.jsx("div",{className:"posts-list",children:i.length>0?i.map(u=>E.jsx(Hg,{post:u},u.id)):E.jsx("div",{className:"no-posts",children:E.jsx("p",{children:"아직 이 카테고리에 게시글이 없습니다."})})})]})]})}function Jk(){return E.jsx(B2,{children:E.jsx(d2,{children:E.jsxs(ki,{path:"/",element:E.jsx(cv,{}),children:[E.jsx(ki,{index:!0,element:E.jsx(dv,{})}),E.jsx(ki,{path:"profile",element:E.jsx(Sv,{})}),E.jsx(ki,{path:"post/:id",element:E.jsx(Ik,{})}),E.jsx(ki,{path:"category/:categoryId",element:E.jsx(Kk,{})})]})})})}db.createRoot(document.getElementById("root")).render(E.jsx(V.StrictMode,{children:E.jsx(Jk,{})}));
