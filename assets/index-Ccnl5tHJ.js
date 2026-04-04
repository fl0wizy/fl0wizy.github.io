(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))u(c);new MutationObserver(c=>{for(const s of c)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&u(f)}).observe(document,{childList:!0,subtree:!0});function a(c){const s={};return c.integrity&&(s.integrity=c.integrity),c.referrerPolicy&&(s.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?s.credentials="include":c.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(c){if(c.ep)return;c.ep=!0;const s=a(c);fetch(c.href,s)}})();function fg(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Kc={exports:{}},wa={};var lp;function ib(){if(lp)return wa;lp=1;var n=Symbol.for("react.transitional.element"),i=Symbol.for("react.fragment");function a(u,c,s){var f=null;if(s!==void 0&&(f=""+s),c.key!==void 0&&(f=""+c.key),"key"in c){s={};for(var m in c)m!=="key"&&(s[m]=c[m])}else s=c;return c=s.ref,{$$typeof:n,type:u,key:f,ref:c!==void 0?c:null,props:s}}return wa.Fragment=i,wa.jsx=a,wa.jsxs=a,wa}var ip;function ab(){return ip||(ip=1,Kc.exports=ib()),Kc.exports}var E=ab(),Jc={exports:{}},ge={};var ap;function rb(){if(ap)return ge;ap=1;var n=Symbol.for("react.transitional.element"),i=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),s=Symbol.for("react.consumer"),f=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),g=Symbol.for("react.activity"),S=Symbol.iterator;function x(T){return T===null||typeof T!="object"?null:(T=S&&T[S]||T["@@iterator"],typeof T=="function"?T:null)}var A={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},M=Object.assign,R={};function D(T,X,k){this.props=T,this.context=X,this.refs=R,this.updater=k||A}D.prototype.isReactComponent={},D.prototype.setState=function(T,X){if(typeof T!="object"&&typeof T!="function"&&T!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,T,X,"setState")},D.prototype.forceUpdate=function(T){this.updater.enqueueForceUpdate(this,T,"forceUpdate")};function G(){}G.prototype=D.prototype;function U(T,X,k){this.props=T,this.context=X,this.refs=R,this.updater=k||A}var ne=U.prototype=new G;ne.constructor=U,M(ne,D.prototype),ne.isPureReactComponent=!0;var le=Array.isArray;function q(){}var $={H:null,A:null,T:null,S:null},se=Object.prototype.hasOwnProperty;function me(T,X,k){var P=k.ref;return{$$typeof:n,type:T,key:X,ref:P!==void 0?P:null,props:k}}function B(T,X){return me(T.type,X,T.props)}function te(T){return typeof T=="object"&&T!==null&&T.$$typeof===n}function ee(T){var X={"=":"=0",":":"=2"};return"$"+T.replace(/[=:]/g,function(k){return X[k]})}var xe=/\/+/g;function ae(T,X){return typeof T=="object"&&T!==null&&T.key!=null?ee(""+T.key):X.toString(36)}function K(T){switch(T.status){case"fulfilled":return T.value;case"rejected":throw T.reason;default:switch(typeof T.status=="string"?T.then(q,q):(T.status="pending",T.then(function(X){T.status==="pending"&&(T.status="fulfilled",T.value=X)},function(X){T.status==="pending"&&(T.status="rejected",T.reason=X)})),T.status){case"fulfilled":return T.value;case"rejected":throw T.reason}}throw T}function L(T,X,k,P,de){var oe=typeof T;(oe==="undefined"||oe==="boolean")&&(T=null);var Ae=!1;if(T===null)Ae=!0;else switch(oe){case"bigint":case"string":case"number":Ae=!0;break;case"object":switch(T.$$typeof){case n:case i:Ae=!0;break;case b:return Ae=T._init,L(Ae(T._payload),X,k,P,de)}}if(Ae)return de=de(T),Ae=P===""?"."+ae(T,0):P,le(de)?(k="",Ae!=null&&(k=Ae.replace(xe,"$&/")+"/"),L(de,X,k,"",function(Yt){return Yt})):de!=null&&(te(de)&&(de=B(de,k+(de.key==null||T&&T.key===de.key?"":(""+de.key).replace(xe,"$&/")+"/")+Ae)),X.push(de)),1;Ae=0;var Ze=P===""?".":P+":";if(le(T))for(var Be=0;Be<T.length;Be++)P=T[Be],oe=Ze+ae(P,Be),Ae+=L(P,X,k,oe,de);else if(Be=x(T),typeof Be=="function")for(T=Be.call(T),Be=0;!(P=T.next()).done;)P=P.value,oe=Ze+ae(P,Be++),Ae+=L(P,X,k,oe,de);else if(oe==="object"){if(typeof T.then=="function")return L(K(T),X,k,P,de);throw X=String(T),Error("Objects are not valid as a React child (found: "+(X==="[object Object]"?"object with keys {"+Object.keys(T).join(", ")+"}":X)+"). If you meant to render a collection of children, use an array instead.")}return Ae}function I(T,X,k){if(T==null)return T;var P=[],de=0;return L(T,P,"","",function(oe){return X.call(k,oe,de++)}),P}function ue(T){if(T._status===-1){var X=T._result;X=X(),X.then(function(k){(T._status===0||T._status===-1)&&(T._status=1,T._result=k)},function(k){(T._status===0||T._status===-1)&&(T._status=2,T._result=k)}),T._status===-1&&(T._status=0,T._result=X)}if(T._status===1)return T._result.default;throw T._result}var Se=typeof reportError=="function"?reportError:function(T){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var X=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof T=="object"&&T!==null&&typeof T.message=="string"?String(T.message):String(T),error:T});if(!window.dispatchEvent(X))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",T);return}console.error(T)},C={map:I,forEach:function(T,X,k){I(T,function(){X.apply(this,arguments)},k)},count:function(T){var X=0;return I(T,function(){X++}),X},toArray:function(T){return I(T,function(X){return X})||[]},only:function(T){if(!te(T))throw Error("React.Children.only expected to receive a single React element child.");return T}};return ge.Activity=g,ge.Children=C,ge.Component=D,ge.Fragment=a,ge.Profiler=c,ge.PureComponent=U,ge.StrictMode=u,ge.Suspense=p,ge.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=$,ge.__COMPILER_RUNTIME={__proto__:null,c:function(T){return $.H.useMemoCache(T)}},ge.cache=function(T){return function(){return T.apply(null,arguments)}},ge.cacheSignal=function(){return null},ge.cloneElement=function(T,X,k){if(T==null)throw Error("The argument must be a React element, but you passed "+T+".");var P=M({},T.props),de=T.key;if(X!=null)for(oe in X.key!==void 0&&(de=""+X.key),X)!se.call(X,oe)||oe==="key"||oe==="__self"||oe==="__source"||oe==="ref"&&X.ref===void 0||(P[oe]=X[oe]);var oe=arguments.length-2;if(oe===1)P.children=k;else if(1<oe){for(var Ae=Array(oe),Ze=0;Ze<oe;Ze++)Ae[Ze]=arguments[Ze+2];P.children=Ae}return me(T.type,de,P)},ge.createContext=function(T){return T={$$typeof:f,_currentValue:T,_currentValue2:T,_threadCount:0,Provider:null,Consumer:null},T.Provider=T,T.Consumer={$$typeof:s,_context:T},T},ge.createElement=function(T,X,k){var P,de={},oe=null;if(X!=null)for(P in X.key!==void 0&&(oe=""+X.key),X)se.call(X,P)&&P!=="key"&&P!=="__self"&&P!=="__source"&&(de[P]=X[P]);var Ae=arguments.length-2;if(Ae===1)de.children=k;else if(1<Ae){for(var Ze=Array(Ae),Be=0;Be<Ae;Be++)Ze[Be]=arguments[Be+2];de.children=Ze}if(T&&T.defaultProps)for(P in Ae=T.defaultProps,Ae)de[P]===void 0&&(de[P]=Ae[P]);return me(T,oe,de)},ge.createRef=function(){return{current:null}},ge.forwardRef=function(T){return{$$typeof:m,render:T}},ge.isValidElement=te,ge.lazy=function(T){return{$$typeof:b,_payload:{_status:-1,_result:T},_init:ue}},ge.memo=function(T,X){return{$$typeof:d,type:T,compare:X===void 0?null:X}},ge.startTransition=function(T){var X=$.T,k={};$.T=k;try{var P=T(),de=$.S;de!==null&&de(k,P),typeof P=="object"&&P!==null&&typeof P.then=="function"&&P.then(q,Se)}catch(oe){Se(oe)}finally{X!==null&&k.types!==null&&(X.types=k.types),$.T=X}},ge.unstable_useCacheRefresh=function(){return $.H.useCacheRefresh()},ge.use=function(T){return $.H.use(T)},ge.useActionState=function(T,X,k){return $.H.useActionState(T,X,k)},ge.useCallback=function(T,X){return $.H.useCallback(T,X)},ge.useContext=function(T){return $.H.useContext(T)},ge.useDebugValue=function(){},ge.useDeferredValue=function(T,X){return $.H.useDeferredValue(T,X)},ge.useEffect=function(T,X){return $.H.useEffect(T,X)},ge.useEffectEvent=function(T){return $.H.useEffectEvent(T)},ge.useId=function(){return $.H.useId()},ge.useImperativeHandle=function(T,X,k){return $.H.useImperativeHandle(T,X,k)},ge.useInsertionEffect=function(T,X){return $.H.useInsertionEffect(T,X)},ge.useLayoutEffect=function(T,X){return $.H.useLayoutEffect(T,X)},ge.useMemo=function(T,X){return $.H.useMemo(T,X)},ge.useOptimistic=function(T,X){return $.H.useOptimistic(T,X)},ge.useReducer=function(T,X,k){return $.H.useReducer(T,X,k)},ge.useRef=function(T){return $.H.useRef(T)},ge.useState=function(T){return $.H.useState(T)},ge.useSyncExternalStore=function(T,X,k){return $.H.useSyncExternalStore(T,X,k)},ge.useTransition=function(){return $.H.useTransition()},ge.version="19.2.4",ge}var rp;function Ns(){return rp||(rp=1,Jc.exports=rb()),Jc.exports}var V=Ns(),Wc={exports:{}},Aa={},$c={exports:{}},Pc={};var up;function ub(){return up||(up=1,(function(n){function i(L,I){var ue=L.length;L.push(I);e:for(;0<ue;){var Se=ue-1>>>1,C=L[Se];if(0<c(C,I))L[Se]=I,L[ue]=C,ue=Se;else break e}}function a(L){return L.length===0?null:L[0]}function u(L){if(L.length===0)return null;var I=L[0],ue=L.pop();if(ue!==I){L[0]=ue;e:for(var Se=0,C=L.length,T=C>>>1;Se<T;){var X=2*(Se+1)-1,k=L[X],P=X+1,de=L[P];if(0>c(k,ue))P<C&&0>c(de,k)?(L[Se]=de,L[P]=ue,Se=P):(L[Se]=k,L[X]=ue,Se=X);else if(P<C&&0>c(de,ue))L[Se]=de,L[P]=ue,Se=P;else break e}}return I}function c(L,I){var ue=L.sortIndex-I.sortIndex;return ue!==0?ue:L.id-I.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var s=performance;n.unstable_now=function(){return s.now()}}else{var f=Date,m=f.now();n.unstable_now=function(){return f.now()-m}}var p=[],d=[],b=1,g=null,S=3,x=!1,A=!1,M=!1,R=!1,D=typeof setTimeout=="function"?setTimeout:null,G=typeof clearTimeout=="function"?clearTimeout:null,U=typeof setImmediate<"u"?setImmediate:null;function ne(L){for(var I=a(d);I!==null;){if(I.callback===null)u(d);else if(I.startTime<=L)u(d),I.sortIndex=I.expirationTime,i(p,I);else break;I=a(d)}}function le(L){if(M=!1,ne(L),!A)if(a(p)!==null)A=!0,q||(q=!0,ee());else{var I=a(d);I!==null&&K(le,I.startTime-L)}}var q=!1,$=-1,se=5,me=-1;function B(){return R?!0:!(n.unstable_now()-me<se)}function te(){if(R=!1,q){var L=n.unstable_now();me=L;var I=!0;try{e:{A=!1,M&&(M=!1,G($),$=-1),x=!0;var ue=S;try{t:{for(ne(L),g=a(p);g!==null&&!(g.expirationTime>L&&B());){var Se=g.callback;if(typeof Se=="function"){g.callback=null,S=g.priorityLevel;var C=Se(g.expirationTime<=L);if(L=n.unstable_now(),typeof C=="function"){g.callback=C,ne(L),I=!0;break t}g===a(p)&&u(p),ne(L)}else u(p);g=a(p)}if(g!==null)I=!0;else{var T=a(d);T!==null&&K(le,T.startTime-L),I=!1}}break e}finally{g=null,S=ue,x=!1}I=void 0}}finally{I?ee():q=!1}}}var ee;if(typeof U=="function")ee=function(){U(te)};else if(typeof MessageChannel<"u"){var xe=new MessageChannel,ae=xe.port2;xe.port1.onmessage=te,ee=function(){ae.postMessage(null)}}else ee=function(){D(te,0)};function K(L,I){$=D(function(){L(n.unstable_now())},I)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(L){L.callback=null},n.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):se=0<L?Math.floor(1e3/L):5},n.unstable_getCurrentPriorityLevel=function(){return S},n.unstable_next=function(L){switch(S){case 1:case 2:case 3:var I=3;break;default:I=S}var ue=S;S=I;try{return L()}finally{S=ue}},n.unstable_requestPaint=function(){R=!0},n.unstable_runWithPriority=function(L,I){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var ue=S;S=L;try{return I()}finally{S=ue}},n.unstable_scheduleCallback=function(L,I,ue){var Se=n.unstable_now();switch(typeof ue=="object"&&ue!==null?(ue=ue.delay,ue=typeof ue=="number"&&0<ue?Se+ue:Se):ue=Se,L){case 1:var C=-1;break;case 2:C=250;break;case 5:C=1073741823;break;case 4:C=1e4;break;default:C=5e3}return C=ue+C,L={id:b++,callback:I,priorityLevel:L,startTime:ue,expirationTime:C,sortIndex:-1},ue>Se?(L.sortIndex=ue,i(d,L),a(p)===null&&L===a(d)&&(M?(G($),$=-1):M=!0,K(le,ue-Se))):(L.sortIndex=C,i(p,L),A||x||(A=!0,q||(q=!0,ee()))),L},n.unstable_shouldYield=B,n.unstable_wrapCallback=function(L){var I=S;return function(){var ue=S;S=I;try{return L.apply(this,arguments)}finally{S=ue}}}})(Pc)),Pc}var op;function ob(){return op||(op=1,$c.exports=ub()),$c.exports}var es={exports:{}},mt={};var cp;function cb(){if(cp)return mt;cp=1;var n=Ns();function i(p){var d="https://react.dev/errors/"+p;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var b=2;b<arguments.length;b++)d+="&args[]="+encodeURIComponent(arguments[b])}return"Minified React error #"+p+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function a(){}var u={d:{f:a,r:function(){throw Error(i(522))},D:a,C:a,L:a,m:a,X:a,S:a,M:a},p:0,findDOMNode:null},c=Symbol.for("react.portal");function s(p,d,b){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:c,key:g==null?null:""+g,children:p,containerInfo:d,implementation:b}}var f=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(p,d){if(p==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return mt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=u,mt.createPortal=function(p,d){var b=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(i(299));return s(p,d,null,b)},mt.flushSync=function(p){var d=f.T,b=u.p;try{if(f.T=null,u.p=2,p)return p()}finally{f.T=d,u.p=b,u.d.f()}},mt.preconnect=function(p,d){typeof p=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,u.d.C(p,d))},mt.prefetchDNS=function(p){typeof p=="string"&&u.d.D(p)},mt.preinit=function(p,d){if(typeof p=="string"&&d&&typeof d.as=="string"){var b=d.as,g=m(b,d.crossOrigin),S=typeof d.integrity=="string"?d.integrity:void 0,x=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;b==="style"?u.d.S(p,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:g,integrity:S,fetchPriority:x}):b==="script"&&u.d.X(p,{crossOrigin:g,integrity:S,fetchPriority:x,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},mt.preinitModule=function(p,d){if(typeof p=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var b=m(d.as,d.crossOrigin);u.d.M(p,{crossOrigin:b,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&u.d.M(p)},mt.preload=function(p,d){if(typeof p=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var b=d.as,g=m(b,d.crossOrigin);u.d.L(p,b,{crossOrigin:g,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},mt.preloadModule=function(p,d){if(typeof p=="string")if(d){var b=m(d.as,d.crossOrigin);u.d.m(p,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:b,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else u.d.m(p)},mt.requestFormReset=function(p){u.d.r(p)},mt.unstable_batchedUpdates=function(p,d){return p(d)},mt.useFormState=function(p,d,b){return f.H.useFormState(p,d,b)},mt.useFormStatus=function(){return f.H.useHostTransitionStatus()},mt.version="19.2.4",mt}var sp;function sb(){if(sp)return es.exports;sp=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(i){console.error(i)}}return n(),es.exports=cb(),es.exports}var fp;function fb(){if(fp)return Aa;fp=1;var n=ob(),i=Ns(),a=sb();function u(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var l=2;l<arguments.length;l++)t+="&args[]="+encodeURIComponent(arguments[l])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function c(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function s(e){var t=e,l=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(l=t.return),e=t.return;while(e)}return t.tag===3?l:null}function f(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function m(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function p(e){if(s(e)!==e)throw Error(u(188))}function d(e){var t=e.alternate;if(!t){if(t=s(e),t===null)throw Error(u(188));return t!==e?null:e}for(var l=e,r=t;;){var o=l.return;if(o===null)break;var h=o.alternate;if(h===null){if(r=o.return,r!==null){l=r;continue}break}if(o.child===h.child){for(h=o.child;h;){if(h===l)return p(o),e;if(h===r)return p(o),t;h=h.sibling}throw Error(u(188))}if(l.return!==r.return)l=o,r=h;else{for(var y=!1,v=o.child;v;){if(v===l){y=!0,l=o,r=h;break}if(v===r){y=!0,r=o,l=h;break}v=v.sibling}if(!y){for(v=h.child;v;){if(v===l){y=!0,l=h,r=o;break}if(v===r){y=!0,r=h,l=o;break}v=v.sibling}if(!y)throw Error(u(189))}}if(l.alternate!==r)throw Error(u(190))}if(l.tag!==3)throw Error(u(188));return l.stateNode.current===l?e:t}function b(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=b(e),t!==null)return t;e=e.sibling}return null}var g=Object.assign,S=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),A=Symbol.for("react.portal"),M=Symbol.for("react.fragment"),R=Symbol.for("react.strict_mode"),D=Symbol.for("react.profiler"),G=Symbol.for("react.consumer"),U=Symbol.for("react.context"),ne=Symbol.for("react.forward_ref"),le=Symbol.for("react.suspense"),q=Symbol.for("react.suspense_list"),$=Symbol.for("react.memo"),se=Symbol.for("react.lazy"),me=Symbol.for("react.activity"),B=Symbol.for("react.memo_cache_sentinel"),te=Symbol.iterator;function ee(e){return e===null||typeof e!="object"?null:(e=te&&e[te]||e["@@iterator"],typeof e=="function"?e:null)}var xe=Symbol.for("react.client.reference");function ae(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===xe?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case M:return"Fragment";case D:return"Profiler";case R:return"StrictMode";case le:return"Suspense";case q:return"SuspenseList";case me:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case A:return"Portal";case U:return e.displayName||"Context";case G:return(e._context.displayName||"Context")+".Consumer";case ne:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case $:return t=e.displayName||null,t!==null?t:ae(e.type)||"Memo";case se:t=e._payload,e=e._init;try{return ae(e(t))}catch{}}return null}var K=Array.isArray,L=i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,I=a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ue={pending:!1,data:null,method:null,action:null},Se=[],C=-1;function T(e){return{current:e}}function X(e){0>C||(e.current=Se[C],Se[C]=null,C--)}function k(e,t){C++,Se[C]=e.current,e.current=t}var P=T(null),de=T(null),oe=T(null),Ae=T(null);function Ze(e,t){switch(k(oe,t),k(de,e),k(P,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Am(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Am(t),e=Tm(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}X(P),k(P,e)}function Be(){X(P),X(de),X(oe)}function Yt(e){e.memoizedState!==null&&k(Ae,e);var t=P.current,l=Tm(t,e.type);t!==l&&(k(de,e),k(P,l))}function pn(e){de.current===e&&(X(P),X(de)),Ae.current===e&&(X(Ae),Sa._currentValue=ue)}var Mi,Za;function gn(e){if(Mi===void 0)try{throw Error()}catch(l){var t=l.stack.trim().match(/\n( *(at )?)/);Mi=t&&t[1]||"",Za=-1<l.stack.indexOf(`
    at`)?" (<anonymous>)":-1<l.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Mi+e+Za}var Ol=!1;function Nl(e,t){if(!e||Ol)return"";Ol=!0;var l=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var Z=function(){throw Error()};if(Object.defineProperty(Z.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Z,[])}catch(H){var j=H}Reflect.construct(e,[],Z)}else{try{Z.call()}catch(H){j=H}e.call(Z.prototype)}}else{try{throw Error()}catch(H){j=H}(Z=e())&&typeof Z.catch=="function"&&Z.catch(function(){})}}catch(H){if(H&&j&&typeof H.stack=="string")return[H.stack,j.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=r.DetermineComponentFrameRoot(),y=h[0],v=h[1];if(y&&v){var w=y.split(`
`),N=v.split(`
`);for(o=r=0;r<w.length&&!w[r].includes("DetermineComponentFrameRoot");)r++;for(;o<N.length&&!N[o].includes("DetermineComponentFrameRoot");)o++;if(r===w.length||o===N.length)for(r=w.length-1,o=N.length-1;1<=r&&0<=o&&w[r]!==N[o];)o--;for(;1<=r&&0<=o;r--,o--)if(w[r]!==N[o]){if(r!==1||o!==1)do if(r--,o--,0>o||w[r]!==N[o]){var Y=`
`+w[r].replace(" at new "," at ");return e.displayName&&Y.includes("<anonymous>")&&(Y=Y.replace("<anonymous>",e.displayName)),Y}while(1<=r&&0<=o);break}}}finally{Ol=!1,Error.prepareStackTrace=l}return(l=e?e.displayName||e.name:"")?gn(l):""}function Ia(e,t){switch(e.tag){case 26:case 27:case 5:return gn(e.type);case 16:return gn("Lazy");case 13:return e.child!==t&&t!==null?gn("Suspense Fallback"):gn("Suspense");case 19:return gn("SuspenseList");case 0:case 15:return Nl(e.type,!1);case 11:return Nl(e.type.render,!1);case 1:return Nl(e.type,!0);case 31:return gn("Activity");default:return""}}function Ka(e){try{var t="",l=null;do t+=Ia(e,l),l=e,e=e.return;while(e);return t}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}var jl=Object.prototype.hasOwnProperty,Ll=n.unstable_scheduleCallback,Oi=n.unstable_cancelCallback,Ou=n.unstable_shouldYield,Nu=n.unstable_requestPaint,yt=n.unstable_now,ju=n.unstable_getCurrentPriorityLevel,Q=n.unstable_ImmediatePriority,W=n.unstable_UserBlockingPriority,pe=n.unstable_NormalPriority,Ee=n.unstable_LowPriority,Ne=n.unstable_IdlePriority,_t=n.log,yn=n.unstable_setDisableYieldValue,bt=null,at=null;function St(e){if(typeof _t=="function"&&yn(e),at&&typeof at.setStrictMode=="function")try{at.setStrictMode(bt,e)}catch{}}var Ye=Math.clz32?Math.clz32:Xy,Hn=Math.log,en=Math.LN2;function Xy(e){return e>>>=0,e===0?32:31-(Hn(e)/en|0)|0}var Ja=256,Wa=262144,$a=4194304;function hl(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Pa(e,t,l){var r=e.pendingLanes;if(r===0)return 0;var o=0,h=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var v=r&134217727;return v!==0?(r=v&~h,r!==0?o=hl(r):(y&=v,y!==0?o=hl(y):l||(l=v&~e,l!==0&&(o=hl(l))))):(v=r&~h,v!==0?o=hl(v):y!==0?o=hl(y):l||(l=r&~e,l!==0&&(o=hl(l)))),o===0?0:t!==0&&t!==o&&(t&h)===0&&(h=o&-o,l=t&-t,h>=l||h===32&&(l&4194048)!==0)?t:o}function Ni(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Qy(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function uf(){var e=$a;return $a<<=1,($a&62914560)===0&&($a=4194304),e}function Lu(e){for(var t=[],l=0;31>l;l++)t.push(e);return t}function ji(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Fy(e,t,l,r,o,h){var y=e.pendingLanes;e.pendingLanes=l,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=l,e.entangledLanes&=l,e.errorRecoveryDisabledLanes&=l,e.shellSuspendCounter=0;var v=e.entanglements,w=e.expirationTimes,N=e.hiddenUpdates;for(l=y&~l;0<l;){var Y=31-Ye(l),Z=1<<Y;v[Y]=0,w[Y]=-1;var j=N[Y];if(j!==null)for(N[Y]=null,Y=0;Y<j.length;Y++){var H=j[Y];H!==null&&(H.lane&=-536870913)}l&=~Z}r!==0&&of(e,r,0),h!==0&&o===0&&e.tag!==0&&(e.suspendedLanes|=h&~(y&~t))}function of(e,t,l){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Ye(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|l&261930}function cf(e,t){var l=e.entangledLanes|=t;for(e=e.entanglements;l;){var r=31-Ye(l),o=1<<r;o&t|e[r]&t&&(e[r]|=t),l&=~o}}function sf(e,t){var l=t&-t;return l=(l&42)!==0?1:Bu(l),(l&(e.suspendedLanes|t))!==0?0:l}function Bu(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Uu(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ff(){var e=I.p;return e!==0?e:(e=window.event,e===void 0?32:Jm(e.type))}function hf(e,t){var l=I.p;try{return I.p=e,t()}finally{I.p=l}}var qn=Math.random().toString(36).slice(2),ct="__reactFiber$"+qn,Et="__reactProps$"+qn,Bl="__reactContainer$"+qn,Hu="__reactEvents$"+qn,Zy="__reactListeners$"+qn,Iy="__reactHandles$"+qn,df="__reactResources$"+qn,Li="__reactMarker$"+qn;function qu(e){delete e[ct],delete e[Et],delete e[Hu],delete e[Zy],delete e[Iy]}function Ul(e){var t=e[ct];if(t)return t;for(var l=e.parentNode;l;){if(t=l[Bl]||l[ct]){if(l=t.alternate,t.child!==null||l!==null&&l.child!==null)for(e=Nm(e);e!==null;){if(l=e[ct])return l;e=Nm(e)}return t}e=l,l=e.parentNode}return null}function Hl(e){if(e=e[ct]||e[Bl]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Bi(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(u(33))}function ql(e){var t=e[df];return t||(t=e[df]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function ut(e){e[Li]=!0}var mf=new Set,pf={};function dl(e,t){Yl(e,t),Yl(e+"Capture",t)}function Yl(e,t){for(pf[e]=t,e=0;e<t.length;e++)mf.add(t[e])}var Ky=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),gf={},yf={};function Jy(e){return jl.call(yf,e)?!0:jl.call(gf,e)?!1:Ky.test(e)?yf[e]=!0:(gf[e]=!0,!1)}function er(e,t,l){if(Jy(t))if(l===null)e.removeAttribute(t);else{switch(typeof l){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var r=t.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+l)}}function tr(e,t,l){if(l===null)e.removeAttribute(t);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+l)}}function bn(e,t,l,r){if(r===null)e.removeAttribute(l);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(l);return}e.setAttributeNS(t,l,""+r)}}function Vt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function bf(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Wy(e,t,l){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var o=r.get,h=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(y){l=""+y,h.call(this,y)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return l},setValue:function(y){l=""+y},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Yu(e){if(!e._valueTracker){var t=bf(e)?"checked":"value";e._valueTracker=Wy(e,t,""+e[t])}}function vf(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var l=t.getValue(),r="";return e&&(r=bf(e)?e.checked?"true":"false":e.value),e=r,e!==l?(t.setValue(e),!0):!1}function nr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var $y=/[\n"\\]/g;function Gt(e){return e.replace($y,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Vu(e,t,l,r,o,h,y,v){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),t!=null?y==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Vt(t)):e.value!==""+Vt(t)&&(e.value=""+Vt(t)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),t!=null?Gu(e,y,Vt(t)):l!=null?Gu(e,y,Vt(l)):r!=null&&e.removeAttribute("value"),o==null&&h!=null&&(e.defaultChecked=!!h),o!=null&&(e.checked=o&&typeof o!="function"&&typeof o!="symbol"),v!=null&&typeof v!="function"&&typeof v!="symbol"&&typeof v!="boolean"?e.name=""+Vt(v):e.removeAttribute("name")}function xf(e,t,l,r,o,h,y,v){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),t!=null||l!=null){if(!(h!=="submit"&&h!=="reset"||t!=null)){Yu(e);return}l=l!=null?""+Vt(l):"",t=t!=null?""+Vt(t):l,v||t===e.value||(e.value=t),e.defaultValue=t}r=r??o,r=typeof r!="function"&&typeof r!="symbol"&&!!r,e.checked=v?e.checked:!!r,e.defaultChecked=!!r,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Yu(e)}function Gu(e,t,l){t==="number"&&nr(e.ownerDocument)===e||e.defaultValue===""+l||(e.defaultValue=""+l)}function Vl(e,t,l,r){if(e=e.options,t){t={};for(var o=0;o<l.length;o++)t["$"+l[o]]=!0;for(l=0;l<e.length;l++)o=t.hasOwnProperty("$"+e[l].value),e[l].selected!==o&&(e[l].selected=o),o&&r&&(e[l].defaultSelected=!0)}else{for(l=""+Vt(l),t=null,o=0;o<e.length;o++){if(e[o].value===l){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Sf(e,t,l){if(t!=null&&(t=""+Vt(t),t!==e.value&&(e.value=t),l==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=l!=null?""+Vt(l):""}function Ef(e,t,l,r){if(t==null){if(r!=null){if(l!=null)throw Error(u(92));if(K(r)){if(1<r.length)throw Error(u(93));r=r[0]}l=r}l==null&&(l=""),t=l}l=Vt(t),e.defaultValue=l,r=e.textContent,r===l&&r!==""&&r!==null&&(e.value=r),Yu(e)}function Gl(e,t){if(t){var l=e.firstChild;if(l&&l===e.lastChild&&l.nodeType===3){l.nodeValue=t;return}}e.textContent=t}var Py=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function kf(e,t,l){var r=t.indexOf("--")===0;l==null||typeof l=="boolean"||l===""?r?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":r?e.setProperty(t,l):typeof l!="number"||l===0||Py.has(t)?t==="float"?e.cssFloat=l:e[t]=(""+l).trim():e[t]=l+"px"}function Cf(e,t,l){if(t!=null&&typeof t!="object")throw Error(u(62));if(e=e.style,l!=null){for(var r in l)!l.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf("--")===0?e.setProperty(r,""):r==="float"?e.cssFloat="":e[r]="");for(var o in t)r=t[o],t.hasOwnProperty(o)&&l[o]!==r&&kf(e,o,r)}else for(var h in t)t.hasOwnProperty(h)&&kf(e,h,t[h])}function Xu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var e1=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),t1=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function lr(e){return t1.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function vn(){}var Qu=null;function Fu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Xl=null,Ql=null;function wf(e){var t=Hl(e);if(t&&(e=t.stateNode)){var l=e[Et]||null;e:switch(e=t.stateNode,t.type){case"input":if(Vu(e,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name),t=l.name,l.type==="radio"&&t!=null){for(l=e;l.parentNode;)l=l.parentNode;for(l=l.querySelectorAll('input[name="'+Gt(""+t)+'"][type="radio"]'),t=0;t<l.length;t++){var r=l[t];if(r!==e&&r.form===e.form){var o=r[Et]||null;if(!o)throw Error(u(90));Vu(r,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(t=0;t<l.length;t++)r=l[t],r.form===e.form&&vf(r)}break e;case"textarea":Sf(e,l.value,l.defaultValue);break e;case"select":t=l.value,t!=null&&Vl(e,!!l.multiple,t,!1)}}}var Zu=!1;function Af(e,t,l){if(Zu)return e(t,l);Zu=!0;try{var r=e(t);return r}finally{if(Zu=!1,(Xl!==null||Ql!==null)&&(Xr(),Xl&&(t=Xl,e=Ql,Ql=Xl=null,wf(t),e)))for(t=0;t<e.length;t++)wf(e[t])}}function Ui(e,t){var l=e.stateNode;if(l===null)return null;var r=l[Et]||null;if(r===null)return null;l=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(l&&typeof l!="function")throw Error(u(231,t,typeof l));return l}var xn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Iu=!1;if(xn)try{var Hi={};Object.defineProperty(Hi,"passive",{get:function(){Iu=!0}}),window.addEventListener("test",Hi,Hi),window.removeEventListener("test",Hi,Hi)}catch{Iu=!1}var Yn=null,Ku=null,ir=null;function Tf(){if(ir)return ir;var e,t=Ku,l=t.length,r,o="value"in Yn?Yn.value:Yn.textContent,h=o.length;for(e=0;e<l&&t[e]===o[e];e++);var y=l-e;for(r=1;r<=y&&t[l-r]===o[h-r];r++);return ir=o.slice(e,1<r?1-r:void 0)}function ar(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function rr(){return!0}function zf(){return!1}function kt(e){function t(l,r,o,h,y){this._reactName=l,this._targetInst=o,this.type=r,this.nativeEvent=h,this.target=y,this.currentTarget=null;for(var v in e)e.hasOwnProperty(v)&&(l=e[v],this[v]=l?l(h):h[v]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?rr:zf,this.isPropagationStopped=zf,this}return g(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var l=this.nativeEvent;l&&(l.preventDefault?l.preventDefault():typeof l.returnValue!="unknown"&&(l.returnValue=!1),this.isDefaultPrevented=rr)},stopPropagation:function(){var l=this.nativeEvent;l&&(l.stopPropagation?l.stopPropagation():typeof l.cancelBubble!="unknown"&&(l.cancelBubble=!0),this.isPropagationStopped=rr)},persist:function(){},isPersistent:rr}),t}var ml={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ur=kt(ml),qi=g({},ml,{view:0,detail:0}),n1=kt(qi),Ju,Wu,Yi,or=g({},qi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Pu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Yi&&(Yi&&e.type==="mousemove"?(Ju=e.screenX-Yi.screenX,Wu=e.screenY-Yi.screenY):Wu=Ju=0,Yi=e),Ju)},movementY:function(e){return"movementY"in e?e.movementY:Wu}}),Df=kt(or),l1=g({},or,{dataTransfer:0}),i1=kt(l1),a1=g({},qi,{relatedTarget:0}),$u=kt(a1),r1=g({},ml,{animationName:0,elapsedTime:0,pseudoElement:0}),u1=kt(r1),o1=g({},ml,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),c1=kt(o1),s1=g({},ml,{data:0}),Rf=kt(s1),f1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},h1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},d1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function m1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=d1[e])?!!t[e]:!1}function Pu(){return m1}var p1=g({},qi,{key:function(e){if(e.key){var t=f1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ar(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?h1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Pu,charCode:function(e){return e.type==="keypress"?ar(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ar(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),g1=kt(p1),y1=g({},or,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),_f=kt(y1),b1=g({},qi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Pu}),v1=kt(b1),x1=g({},ml,{propertyName:0,elapsedTime:0,pseudoElement:0}),S1=kt(x1),E1=g({},or,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),k1=kt(E1),C1=g({},ml,{newState:0,oldState:0}),w1=kt(C1),A1=[9,13,27,32],eo=xn&&"CompositionEvent"in window,Vi=null;xn&&"documentMode"in document&&(Vi=document.documentMode);var T1=xn&&"TextEvent"in window&&!Vi,Mf=xn&&(!eo||Vi&&8<Vi&&11>=Vi),Of=" ",Nf=!1;function jf(e,t){switch(e){case"keyup":return A1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Lf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Fl=!1;function z1(e,t){switch(e){case"compositionend":return Lf(t);case"keypress":return t.which!==32?null:(Nf=!0,Of);case"textInput":return e=t.data,e===Of&&Nf?null:e;default:return null}}function D1(e,t){if(Fl)return e==="compositionend"||!eo&&jf(e,t)?(e=Tf(),ir=Ku=Yn=null,Fl=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Mf&&t.locale!=="ko"?null:t.data;default:return null}}var R1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Bf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!R1[e.type]:t==="textarea"}function Uf(e,t,l,r){Xl?Ql?Ql.push(r):Ql=[r]:Xl=r,t=Wr(t,"onChange"),0<t.length&&(l=new ur("onChange","change",null,l,r),e.push({event:l,listeners:t}))}var Gi=null,Xi=null;function _1(e){xm(e,0)}function cr(e){var t=Bi(e);if(vf(t))return e}function Hf(e,t){if(e==="change")return t}var qf=!1;if(xn){var to;if(xn){var no="oninput"in document;if(!no){var Yf=document.createElement("div");Yf.setAttribute("oninput","return;"),no=typeof Yf.oninput=="function"}to=no}else to=!1;qf=to&&(!document.documentMode||9<document.documentMode)}function Vf(){Gi&&(Gi.detachEvent("onpropertychange",Gf),Xi=Gi=null)}function Gf(e){if(e.propertyName==="value"&&cr(Xi)){var t=[];Uf(t,Xi,e,Fu(e)),Af(_1,t)}}function M1(e,t,l){e==="focusin"?(Vf(),Gi=t,Xi=l,Gi.attachEvent("onpropertychange",Gf)):e==="focusout"&&Vf()}function O1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return cr(Xi)}function N1(e,t){if(e==="click")return cr(t)}function j1(e,t){if(e==="input"||e==="change")return cr(t)}function L1(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Mt=typeof Object.is=="function"?Object.is:L1;function Qi(e,t){if(Mt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var l=Object.keys(e),r=Object.keys(t);if(l.length!==r.length)return!1;for(r=0;r<l.length;r++){var o=l[r];if(!jl.call(t,o)||!Mt(e[o],t[o]))return!1}return!0}function Xf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Qf(e,t){var l=Xf(e);e=0;for(var r;l;){if(l.nodeType===3){if(r=e+l.textContent.length,e<=t&&r>=t)return{node:l,offset:t-e};e=r}e:{for(;l;){if(l.nextSibling){l=l.nextSibling;break e}l=l.parentNode}l=void 0}l=Xf(l)}}function Ff(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ff(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Zf(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=nr(e.document);t instanceof e.HTMLIFrameElement;){try{var l=typeof t.contentWindow.location.href=="string"}catch{l=!1}if(l)e=t.contentWindow;else break;t=nr(e.document)}return t}function lo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var B1=xn&&"documentMode"in document&&11>=document.documentMode,Zl=null,io=null,Fi=null,ao=!1;function If(e,t,l){var r=l.window===l?l.document:l.nodeType===9?l:l.ownerDocument;ao||Zl==null||Zl!==nr(r)||(r=Zl,"selectionStart"in r&&lo(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Fi&&Qi(Fi,r)||(Fi=r,r=Wr(io,"onSelect"),0<r.length&&(t=new ur("onSelect","select",null,t,l),e.push({event:t,listeners:r}),t.target=Zl)))}function pl(e,t){var l={};return l[e.toLowerCase()]=t.toLowerCase(),l["Webkit"+e]="webkit"+t,l["Moz"+e]="moz"+t,l}var Il={animationend:pl("Animation","AnimationEnd"),animationiteration:pl("Animation","AnimationIteration"),animationstart:pl("Animation","AnimationStart"),transitionrun:pl("Transition","TransitionRun"),transitionstart:pl("Transition","TransitionStart"),transitioncancel:pl("Transition","TransitionCancel"),transitionend:pl("Transition","TransitionEnd")},ro={},Kf={};xn&&(Kf=document.createElement("div").style,"AnimationEvent"in window||(delete Il.animationend.animation,delete Il.animationiteration.animation,delete Il.animationstart.animation),"TransitionEvent"in window||delete Il.transitionend.transition);function gl(e){if(ro[e])return ro[e];if(!Il[e])return e;var t=Il[e],l;for(l in t)if(t.hasOwnProperty(l)&&l in Kf)return ro[e]=t[l];return e}var Jf=gl("animationend"),Wf=gl("animationiteration"),$f=gl("animationstart"),U1=gl("transitionrun"),H1=gl("transitionstart"),q1=gl("transitioncancel"),Pf=gl("transitionend"),eh=new Map,uo="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");uo.push("scrollEnd");function tn(e,t){eh.set(e,t),dl(t,[e])}var sr=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Xt=[],Kl=0,oo=0;function fr(){for(var e=Kl,t=oo=Kl=0;t<e;){var l=Xt[t];Xt[t++]=null;var r=Xt[t];Xt[t++]=null;var o=Xt[t];Xt[t++]=null;var h=Xt[t];if(Xt[t++]=null,r!==null&&o!==null){var y=r.pending;y===null?o.next=o:(o.next=y.next,y.next=o),r.pending=o}h!==0&&th(l,o,h)}}function hr(e,t,l,r){Xt[Kl++]=e,Xt[Kl++]=t,Xt[Kl++]=l,Xt[Kl++]=r,oo|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function co(e,t,l,r){return hr(e,t,l,r),dr(e)}function yl(e,t){return hr(e,null,null,t),dr(e)}function th(e,t,l){e.lanes|=l;var r=e.alternate;r!==null&&(r.lanes|=l);for(var o=!1,h=e.return;h!==null;)h.childLanes|=l,r=h.alternate,r!==null&&(r.childLanes|=l),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(o=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,o&&t!==null&&(o=31-Ye(l),e=h.hiddenUpdates,r=e[o],r===null?e[o]=[t]:r.push(t),t.lane=l|536870912),h):null}function dr(e){if(50<ma)throw ma=0,vc=null,Error(u(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Jl={};function Y1(e,t,l,r){this.tag=e,this.key=l,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ot(e,t,l,r){return new Y1(e,t,l,r)}function so(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Sn(e,t){var l=e.alternate;return l===null?(l=Ot(e.tag,t,e.key,e.mode),l.elementType=e.elementType,l.type=e.type,l.stateNode=e.stateNode,l.alternate=e,e.alternate=l):(l.pendingProps=t,l.type=e.type,l.flags=0,l.subtreeFlags=0,l.deletions=null),l.flags=e.flags&65011712,l.childLanes=e.childLanes,l.lanes=e.lanes,l.child=e.child,l.memoizedProps=e.memoizedProps,l.memoizedState=e.memoizedState,l.updateQueue=e.updateQueue,t=e.dependencies,l.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},l.sibling=e.sibling,l.index=e.index,l.ref=e.ref,l.refCleanup=e.refCleanup,l}function nh(e,t){e.flags&=65011714;var l=e.alternate;return l===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=l.childLanes,e.lanes=l.lanes,e.child=l.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=l.memoizedProps,e.memoizedState=l.memoizedState,e.updateQueue=l.updateQueue,e.type=l.type,t=l.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function mr(e,t,l,r,o,h){var y=0;if(r=e,typeof e=="function")so(e)&&(y=1);else if(typeof e=="string")y=F0(e,l,P.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case me:return e=Ot(31,l,t,o),e.elementType=me,e.lanes=h,e;case M:return bl(l.children,o,h,t);case R:y=8,o|=24;break;case D:return e=Ot(12,l,t,o|2),e.elementType=D,e.lanes=h,e;case le:return e=Ot(13,l,t,o),e.elementType=le,e.lanes=h,e;case q:return e=Ot(19,l,t,o),e.elementType=q,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case U:y=10;break e;case G:y=9;break e;case ne:y=11;break e;case $:y=14;break e;case se:y=16,r=null;break e}y=29,l=Error(u(130,e===null?"null":typeof e,"")),r=null}return t=Ot(y,l,t,o),t.elementType=e,t.type=r,t.lanes=h,t}function bl(e,t,l,r){return e=Ot(7,e,r,t),e.lanes=l,e}function fo(e,t,l){return e=Ot(6,e,null,t),e.lanes=l,e}function lh(e){var t=Ot(18,null,null,0);return t.stateNode=e,t}function ho(e,t,l){return t=Ot(4,e.children!==null?e.children:[],e.key,t),t.lanes=l,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var ih=new WeakMap;function Qt(e,t){if(typeof e=="object"&&e!==null){var l=ih.get(e);return l!==void 0?l:(t={value:e,source:t,stack:Ka(t)},ih.set(e,t),t)}return{value:e,source:t,stack:Ka(t)}}var Wl=[],$l=0,pr=null,Zi=0,Ft=[],Zt=0,Vn=null,un=1,on="";function En(e,t){Wl[$l++]=Zi,Wl[$l++]=pr,pr=e,Zi=t}function ah(e,t,l){Ft[Zt++]=un,Ft[Zt++]=on,Ft[Zt++]=Vn,Vn=e;var r=un;e=on;var o=32-Ye(r)-1;r&=~(1<<o),l+=1;var h=32-Ye(t)+o;if(30<h){var y=o-o%5;h=(r&(1<<y)-1).toString(32),r>>=y,o-=y,un=1<<32-Ye(t)+o|l<<o|r,on=h+e}else un=1<<h|l<<o|r,on=e}function mo(e){e.return!==null&&(En(e,1),ah(e,1,0))}function po(e){for(;e===pr;)pr=Wl[--$l],Wl[$l]=null,Zi=Wl[--$l],Wl[$l]=null;for(;e===Vn;)Vn=Ft[--Zt],Ft[Zt]=null,on=Ft[--Zt],Ft[Zt]=null,un=Ft[--Zt],Ft[Zt]=null}function rh(e,t){Ft[Zt++]=un,Ft[Zt++]=on,Ft[Zt++]=Vn,un=t.id,on=t.overflow,Vn=e}var st=null,Qe=null,De=!1,Gn=null,It=!1,go=Error(u(519));function Xn(e){var t=Error(u(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ii(Qt(t,e)),go}function uh(e){var t=e.stateNode,l=e.type,r=e.memoizedProps;switch(t[ct]=e,t[Et]=r,l){case"dialog":Ce("cancel",t),Ce("close",t);break;case"iframe":case"object":case"embed":Ce("load",t);break;case"video":case"audio":for(l=0;l<ga.length;l++)Ce(ga[l],t);break;case"source":Ce("error",t);break;case"img":case"image":case"link":Ce("error",t),Ce("load",t);break;case"details":Ce("toggle",t);break;case"input":Ce("invalid",t),xf(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":Ce("invalid",t);break;case"textarea":Ce("invalid",t),Ef(t,r.value,r.defaultValue,r.children)}l=r.children,typeof l!="string"&&typeof l!="number"&&typeof l!="bigint"||t.textContent===""+l||r.suppressHydrationWarning===!0||Cm(t.textContent,l)?(r.popover!=null&&(Ce("beforetoggle",t),Ce("toggle",t)),r.onScroll!=null&&Ce("scroll",t),r.onScrollEnd!=null&&Ce("scrollend",t),r.onClick!=null&&(t.onclick=vn),t=!0):t=!1,t||Xn(e,!0)}function oh(e){for(st=e.return;st;)switch(st.tag){case 5:case 31:case 13:It=!1;return;case 27:case 3:It=!0;return;default:st=st.return}}function Pl(e){if(e!==st)return!1;if(!De)return oh(e),De=!0,!1;var t=e.tag,l;if((l=t!==3&&t!==27)&&((l=t===5)&&(l=e.type,l=!(l!=="form"&&l!=="button")||Nc(e.type,e.memoizedProps)),l=!l),l&&Qe&&Xn(e),oh(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(317));Qe=Om(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(317));Qe=Om(e)}else t===27?(t=Qe,il(e.type)?(e=Hc,Hc=null,Qe=e):Qe=t):Qe=st?Jt(e.stateNode.nextSibling):null;return!0}function vl(){Qe=st=null,De=!1}function yo(){var e=Gn;return e!==null&&(Tt===null?Tt=e:Tt.push.apply(Tt,e),Gn=null),e}function Ii(e){Gn===null?Gn=[e]:Gn.push(e)}var bo=T(null),xl=null,kn=null;function Qn(e,t,l){k(bo,t._currentValue),t._currentValue=l}function Cn(e){e._currentValue=bo.current,X(bo)}function vo(e,t,l){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===l)break;e=e.return}}function xo(e,t,l,r){var o=e.child;for(o!==null&&(o.return=e);o!==null;){var h=o.dependencies;if(h!==null){var y=o.child;h=h.firstContext;e:for(;h!==null;){var v=h;h=o;for(var w=0;w<t.length;w++)if(v.context===t[w]){h.lanes|=l,v=h.alternate,v!==null&&(v.lanes|=l),vo(h.return,l,e),r||(y=null);break e}h=v.next}}else if(o.tag===18){if(y=o.return,y===null)throw Error(u(341));y.lanes|=l,h=y.alternate,h!==null&&(h.lanes|=l),vo(y,l,e),y=null}else y=o.child;if(y!==null)y.return=o;else for(y=o;y!==null;){if(y===e){y=null;break}if(o=y.sibling,o!==null){o.return=y.return,y=o;break}y=y.return}o=y}}function ei(e,t,l,r){e=null;for(var o=t,h=!1;o!==null;){if(!h){if((o.flags&524288)!==0)h=!0;else if((o.flags&262144)!==0)break}if(o.tag===10){var y=o.alternate;if(y===null)throw Error(u(387));if(y=y.memoizedProps,y!==null){var v=o.type;Mt(o.pendingProps.value,y.value)||(e!==null?e.push(v):e=[v])}}else if(o===Ae.current){if(y=o.alternate,y===null)throw Error(u(387));y.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(e!==null?e.push(Sa):e=[Sa])}o=o.return}e!==null&&xo(t,e,l,r),t.flags|=262144}function gr(e){for(e=e.firstContext;e!==null;){if(!Mt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Sl(e){xl=e,kn=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ft(e){return ch(xl,e)}function yr(e,t){return xl===null&&Sl(e),ch(e,t)}function ch(e,t){var l=t._currentValue;if(t={context:t,memoizedValue:l,next:null},kn===null){if(e===null)throw Error(u(308));kn=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else kn=kn.next=t;return l}var V1=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(l,r){e.push(r)}};this.abort=function(){t.aborted=!0,e.forEach(function(l){return l()})}},G1=n.unstable_scheduleCallback,X1=n.unstable_NormalPriority,et={$$typeof:U,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function So(){return{controller:new V1,data:new Map,refCount:0}}function Ki(e){e.refCount--,e.refCount===0&&G1(X1,function(){e.controller.abort()})}var Ji=null,Eo=0,ti=0,ni=null;function Q1(e,t){if(Ji===null){var l=Ji=[];Eo=0,ti=wc(),ni={status:"pending",value:void 0,then:function(r){l.push(r)}}}return Eo++,t.then(sh,sh),t}function sh(){if(--Eo===0&&Ji!==null){ni!==null&&(ni.status="fulfilled");var e=Ji;Ji=null,ti=0,ni=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function F1(e,t){var l=[],r={status:"pending",value:null,reason:null,then:function(o){l.push(o)}};return e.then(function(){r.status="fulfilled",r.value=t;for(var o=0;o<l.length;o++)(0,l[o])(t)},function(o){for(r.status="rejected",r.reason=o,o=0;o<l.length;o++)(0,l[o])(void 0)}),r}var fh=L.S;L.S=function(e,t){Id=yt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&Q1(e,t),fh!==null&&fh(e,t)};var El=T(null);function ko(){var e=El.current;return e!==null?e:Ve.pooledCache}function br(e,t){t===null?k(El,El.current):k(El,t.pool)}function hh(){var e=ko();return e===null?null:{parent:et._currentValue,pool:e}}var li=Error(u(460)),Co=Error(u(474)),vr=Error(u(542)),xr={then:function(){}};function dh(e){return e=e.status,e==="fulfilled"||e==="rejected"}function mh(e,t,l){switch(l=e[l],l===void 0?e.push(t):l!==t&&(t.then(vn,vn),t=l),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,gh(e),e;default:if(typeof t.status=="string")t.then(vn,vn);else{if(e=Ve,e!==null&&100<e.shellSuspendCounter)throw Error(u(482));e=t,e.status="pending",e.then(function(r){if(t.status==="pending"){var o=t;o.status="fulfilled",o.value=r}},function(r){if(t.status==="pending"){var o=t;o.status="rejected",o.reason=r}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,gh(e),e}throw Cl=t,li}}function kl(e){try{var t=e._init;return t(e._payload)}catch(l){throw l!==null&&typeof l=="object"&&typeof l.then=="function"?(Cl=l,li):l}}var Cl=null;function ph(){if(Cl===null)throw Error(u(459));var e=Cl;return Cl=null,e}function gh(e){if(e===li||e===vr)throw Error(u(483))}var ii=null,Wi=0;function Sr(e){var t=Wi;return Wi+=1,ii===null&&(ii=[]),mh(ii,e,t)}function $i(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Er(e,t){throw t.$$typeof===S?Error(u(525)):(e=Object.prototype.toString.call(t),Error(u(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function yh(e){function t(_,z){if(e){var O=_.deletions;O===null?(_.deletions=[z],_.flags|=16):O.push(z)}}function l(_,z){if(!e)return null;for(;z!==null;)t(_,z),z=z.sibling;return null}function r(_){for(var z=new Map;_!==null;)_.key!==null?z.set(_.key,_):z.set(_.index,_),_=_.sibling;return z}function o(_,z){return _=Sn(_,z),_.index=0,_.sibling=null,_}function h(_,z,O){return _.index=O,e?(O=_.alternate,O!==null?(O=O.index,O<z?(_.flags|=67108866,z):O):(_.flags|=67108866,z)):(_.flags|=1048576,z)}function y(_){return e&&_.alternate===null&&(_.flags|=67108866),_}function v(_,z,O,F){return z===null||z.tag!==6?(z=fo(O,_.mode,F),z.return=_,z):(z=o(z,O),z.return=_,z)}function w(_,z,O,F){var ce=O.type;return ce===M?Y(_,z,O.props.children,F,O.key):z!==null&&(z.elementType===ce||typeof ce=="object"&&ce!==null&&ce.$$typeof===se&&kl(ce)===z.type)?(z=o(z,O.props),$i(z,O),z.return=_,z):(z=mr(O.type,O.key,O.props,null,_.mode,F),$i(z,O),z.return=_,z)}function N(_,z,O,F){return z===null||z.tag!==4||z.stateNode.containerInfo!==O.containerInfo||z.stateNode.implementation!==O.implementation?(z=ho(O,_.mode,F),z.return=_,z):(z=o(z,O.children||[]),z.return=_,z)}function Y(_,z,O,F,ce){return z===null||z.tag!==7?(z=bl(O,_.mode,F,ce),z.return=_,z):(z=o(z,O),z.return=_,z)}function Z(_,z,O){if(typeof z=="string"&&z!==""||typeof z=="number"||typeof z=="bigint")return z=fo(""+z,_.mode,O),z.return=_,z;if(typeof z=="object"&&z!==null){switch(z.$$typeof){case x:return O=mr(z.type,z.key,z.props,null,_.mode,O),$i(O,z),O.return=_,O;case A:return z=ho(z,_.mode,O),z.return=_,z;case se:return z=kl(z),Z(_,z,O)}if(K(z)||ee(z))return z=bl(z,_.mode,O,null),z.return=_,z;if(typeof z.then=="function")return Z(_,Sr(z),O);if(z.$$typeof===U)return Z(_,yr(_,z),O);Er(_,z)}return null}function j(_,z,O,F){var ce=z!==null?z.key:null;if(typeof O=="string"&&O!==""||typeof O=="number"||typeof O=="bigint")return ce!==null?null:v(_,z,""+O,F);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case x:return O.key===ce?w(_,z,O,F):null;case A:return O.key===ce?N(_,z,O,F):null;case se:return O=kl(O),j(_,z,O,F)}if(K(O)||ee(O))return ce!==null?null:Y(_,z,O,F,null);if(typeof O.then=="function")return j(_,z,Sr(O),F);if(O.$$typeof===U)return j(_,z,yr(_,O),F);Er(_,O)}return null}function H(_,z,O,F,ce){if(typeof F=="string"&&F!==""||typeof F=="number"||typeof F=="bigint")return _=_.get(O)||null,v(z,_,""+F,ce);if(typeof F=="object"&&F!==null){switch(F.$$typeof){case x:return _=_.get(F.key===null?O:F.key)||null,w(z,_,F,ce);case A:return _=_.get(F.key===null?O:F.key)||null,N(z,_,F,ce);case se:return F=kl(F),H(_,z,O,F,ce)}if(K(F)||ee(F))return _=_.get(O)||null,Y(z,_,F,ce,null);if(typeof F.then=="function")return H(_,z,O,Sr(F),ce);if(F.$$typeof===U)return H(_,z,O,yr(z,F),ce);Er(z,F)}return null}function ie(_,z,O,F){for(var ce=null,_e=null,re=z,be=z=0,ze=null;re!==null&&be<O.length;be++){re.index>be?(ze=re,re=null):ze=re.sibling;var Me=j(_,re,O[be],F);if(Me===null){re===null&&(re=ze);break}e&&re&&Me.alternate===null&&t(_,re),z=h(Me,z,be),_e===null?ce=Me:_e.sibling=Me,_e=Me,re=ze}if(be===O.length)return l(_,re),De&&En(_,be),ce;if(re===null){for(;be<O.length;be++)re=Z(_,O[be],F),re!==null&&(z=h(re,z,be),_e===null?ce=re:_e.sibling=re,_e=re);return De&&En(_,be),ce}for(re=r(re);be<O.length;be++)ze=H(re,_,be,O[be],F),ze!==null&&(e&&ze.alternate!==null&&re.delete(ze.key===null?be:ze.key),z=h(ze,z,be),_e===null?ce=ze:_e.sibling=ze,_e=ze);return e&&re.forEach(function(cl){return t(_,cl)}),De&&En(_,be),ce}function he(_,z,O,F){if(O==null)throw Error(u(151));for(var ce=null,_e=null,re=z,be=z=0,ze=null,Me=O.next();re!==null&&!Me.done;be++,Me=O.next()){re.index>be?(ze=re,re=null):ze=re.sibling;var cl=j(_,re,Me.value,F);if(cl===null){re===null&&(re=ze);break}e&&re&&cl.alternate===null&&t(_,re),z=h(cl,z,be),_e===null?ce=cl:_e.sibling=cl,_e=cl,re=ze}if(Me.done)return l(_,re),De&&En(_,be),ce;if(re===null){for(;!Me.done;be++,Me=O.next())Me=Z(_,Me.value,F),Me!==null&&(z=h(Me,z,be),_e===null?ce=Me:_e.sibling=Me,_e=Me);return De&&En(_,be),ce}for(re=r(re);!Me.done;be++,Me=O.next())Me=H(re,_,be,Me.value,F),Me!==null&&(e&&Me.alternate!==null&&re.delete(Me.key===null?be:Me.key),z=h(Me,z,be),_e===null?ce=Me:_e.sibling=Me,_e=Me);return e&&re.forEach(function(lb){return t(_,lb)}),De&&En(_,be),ce}function qe(_,z,O,F){if(typeof O=="object"&&O!==null&&O.type===M&&O.key===null&&(O=O.props.children),typeof O=="object"&&O!==null){switch(O.$$typeof){case x:e:{for(var ce=O.key;z!==null;){if(z.key===ce){if(ce=O.type,ce===M){if(z.tag===7){l(_,z.sibling),F=o(z,O.props.children),F.return=_,_=F;break e}}else if(z.elementType===ce||typeof ce=="object"&&ce!==null&&ce.$$typeof===se&&kl(ce)===z.type){l(_,z.sibling),F=o(z,O.props),$i(F,O),F.return=_,_=F;break e}l(_,z);break}else t(_,z);z=z.sibling}O.type===M?(F=bl(O.props.children,_.mode,F,O.key),F.return=_,_=F):(F=mr(O.type,O.key,O.props,null,_.mode,F),$i(F,O),F.return=_,_=F)}return y(_);case A:e:{for(ce=O.key;z!==null;){if(z.key===ce)if(z.tag===4&&z.stateNode.containerInfo===O.containerInfo&&z.stateNode.implementation===O.implementation){l(_,z.sibling),F=o(z,O.children||[]),F.return=_,_=F;break e}else{l(_,z);break}else t(_,z);z=z.sibling}F=ho(O,_.mode,F),F.return=_,_=F}return y(_);case se:return O=kl(O),qe(_,z,O,F)}if(K(O))return ie(_,z,O,F);if(ee(O)){if(ce=ee(O),typeof ce!="function")throw Error(u(150));return O=ce.call(O),he(_,z,O,F)}if(typeof O.then=="function")return qe(_,z,Sr(O),F);if(O.$$typeof===U)return qe(_,z,yr(_,O),F);Er(_,O)}return typeof O=="string"&&O!==""||typeof O=="number"||typeof O=="bigint"?(O=""+O,z!==null&&z.tag===6?(l(_,z.sibling),F=o(z,O),F.return=_,_=F):(l(_,z),F=fo(O,_.mode,F),F.return=_,_=F),y(_)):l(_,z)}return function(_,z,O,F){try{Wi=0;var ce=qe(_,z,O,F);return ii=null,ce}catch(re){if(re===li||re===vr)throw re;var _e=Ot(29,re,null,_.mode);return _e.lanes=F,_e.return=_,_e}}}var wl=yh(!0),bh=yh(!1),Fn=!1;function wo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ao(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Zn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function In(e,t,l){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(Oe&2)!==0){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,t=dr(e),th(e,null,l),t}return hr(e,r,t,l),dr(e)}function Pi(e,t,l){if(t=t.updateQueue,t!==null&&(t=t.shared,(l&4194048)!==0)){var r=t.lanes;r&=e.pendingLanes,l|=r,t.lanes=l,cf(e,l)}}function To(e,t){var l=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,l===r)){var o=null,h=null;if(l=l.firstBaseUpdate,l!==null){do{var y={lane:l.lane,tag:l.tag,payload:l.payload,callback:null,next:null};h===null?o=h=y:h=h.next=y,l=l.next}while(l!==null);h===null?o=h=t:h=h.next=t}else o=h=t;l={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:h,shared:r.shared,callbacks:r.callbacks},e.updateQueue=l;return}e=l.lastBaseUpdate,e===null?l.firstBaseUpdate=t:e.next=t,l.lastBaseUpdate=t}var zo=!1;function ea(){if(zo){var e=ni;if(e!==null)throw e}}function ta(e,t,l,r){zo=!1;var o=e.updateQueue;Fn=!1;var h=o.firstBaseUpdate,y=o.lastBaseUpdate,v=o.shared.pending;if(v!==null){o.shared.pending=null;var w=v,N=w.next;w.next=null,y===null?h=N:y.next=N,y=w;var Y=e.alternate;Y!==null&&(Y=Y.updateQueue,v=Y.lastBaseUpdate,v!==y&&(v===null?Y.firstBaseUpdate=N:v.next=N,Y.lastBaseUpdate=w))}if(h!==null){var Z=o.baseState;y=0,Y=N=w=null,v=h;do{var j=v.lane&-536870913,H=j!==v.lane;if(H?(Te&j)===j:(r&j)===j){j!==0&&j===ti&&(zo=!0),Y!==null&&(Y=Y.next={lane:0,tag:v.tag,payload:v.payload,callback:null,next:null});e:{var ie=e,he=v;j=t;var qe=l;switch(he.tag){case 1:if(ie=he.payload,typeof ie=="function"){Z=ie.call(qe,Z,j);break e}Z=ie;break e;case 3:ie.flags=ie.flags&-65537|128;case 0:if(ie=he.payload,j=typeof ie=="function"?ie.call(qe,Z,j):ie,j==null)break e;Z=g({},Z,j);break e;case 2:Fn=!0}}j=v.callback,j!==null&&(e.flags|=64,H&&(e.flags|=8192),H=o.callbacks,H===null?o.callbacks=[j]:H.push(j))}else H={lane:j,tag:v.tag,payload:v.payload,callback:v.callback,next:null},Y===null?(N=Y=H,w=Z):Y=Y.next=H,y|=j;if(v=v.next,v===null){if(v=o.shared.pending,v===null)break;H=v,v=H.next,H.next=null,o.lastBaseUpdate=H,o.shared.pending=null}}while(!0);Y===null&&(w=Z),o.baseState=w,o.firstBaseUpdate=N,o.lastBaseUpdate=Y,h===null&&(o.shared.lanes=0),Pn|=y,e.lanes=y,e.memoizedState=Z}}function vh(e,t){if(typeof e!="function")throw Error(u(191,e));e.call(t)}function xh(e,t){var l=e.callbacks;if(l!==null)for(e.callbacks=null,e=0;e<l.length;e++)vh(l[e],t)}var ai=T(null),kr=T(0);function Sh(e,t){e=On,k(kr,e),k(ai,t),On=e|t.baseLanes}function Do(){k(kr,On),k(ai,ai.current)}function Ro(){On=kr.current,X(ai),X(kr)}var Nt=T(null),Kt=null;function Kn(e){var t=e.alternate;k($e,$e.current&1),k(Nt,e),Kt===null&&(t===null||ai.current!==null||t.memoizedState!==null)&&(Kt=e)}function _o(e){k($e,$e.current),k(Nt,e),Kt===null&&(Kt=e)}function Eh(e){e.tag===22?(k($e,$e.current),k(Nt,e),Kt===null&&(Kt=e)):Jn()}function Jn(){k($e,$e.current),k(Nt,Nt.current)}function jt(e){X(Nt),Kt===e&&(Kt=null),X($e)}var $e=T(0);function Cr(e){for(var t=e;t!==null;){if(t.tag===13){var l=t.memoizedState;if(l!==null&&(l=l.dehydrated,l===null||Bc(l)||Uc(l)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var wn=0,ye=null,Ue=null,tt=null,wr=!1,ri=!1,Al=!1,Ar=0,na=0,ui=null,Z1=0;function Je(){throw Error(u(321))}function Mo(e,t){if(t===null)return!1;for(var l=0;l<t.length&&l<e.length;l++)if(!Mt(e[l],t[l]))return!1;return!0}function Oo(e,t,l,r,o,h){return wn=h,ye=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,L.H=e===null||e.memoizedState===null?ad:Io,Al=!1,h=l(r,o),Al=!1,ri&&(h=Ch(t,l,r,o)),kh(e),h}function kh(e){L.H=aa;var t=Ue!==null&&Ue.next!==null;if(wn=0,tt=Ue=ye=null,wr=!1,na=0,ui=null,t)throw Error(u(300));e===null||nt||(e=e.dependencies,e!==null&&gr(e)&&(nt=!0))}function Ch(e,t,l,r){ye=e;var o=0;do{if(ri&&(ui=null),na=0,ri=!1,25<=o)throw Error(u(301));if(o+=1,tt=Ue=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}L.H=rd,h=t(l,r)}while(ri);return h}function I1(){var e=L.H,t=e.useState()[0];return t=typeof t.then=="function"?la(t):t,e=e.useState()[0],(Ue!==null?Ue.memoizedState:null)!==e&&(ye.flags|=1024),t}function No(){var e=Ar!==0;return Ar=0,e}function jo(e,t,l){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l}function Lo(e){if(wr){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}wr=!1}wn=0,tt=Ue=ye=null,ri=!1,na=Ar=0,ui=null}function vt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return tt===null?ye.memoizedState=tt=e:tt=tt.next=e,tt}function Pe(){if(Ue===null){var e=ye.alternate;e=e!==null?e.memoizedState:null}else e=Ue.next;var t=tt===null?ye.memoizedState:tt.next;if(t!==null)tt=t,Ue=e;else{if(e===null)throw ye.alternate===null?Error(u(467)):Error(u(310));Ue=e,e={memoizedState:Ue.memoizedState,baseState:Ue.baseState,baseQueue:Ue.baseQueue,queue:Ue.queue,next:null},tt===null?ye.memoizedState=tt=e:tt=tt.next=e}return tt}function Tr(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function la(e){var t=na;return na+=1,ui===null&&(ui=[]),e=mh(ui,e,t),t=ye,(tt===null?t.memoizedState:tt.next)===null&&(t=t.alternate,L.H=t===null||t.memoizedState===null?ad:Io),e}function zr(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return la(e);if(e.$$typeof===U)return ft(e)}throw Error(u(438,String(e)))}function Bo(e){var t=null,l=ye.updateQueue;if(l!==null&&(t=l.memoCache),t==null){var r=ye.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(o){return o.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),l===null&&(l=Tr(),ye.updateQueue=l),l.memoCache=t,l=t.data[t.index],l===void 0)for(l=t.data[t.index]=Array(e),r=0;r<e;r++)l[r]=B;return t.index++,l}function An(e,t){return typeof t=="function"?t(e):t}function Dr(e){var t=Pe();return Uo(t,Ue,e)}function Uo(e,t,l){var r=e.queue;if(r===null)throw Error(u(311));r.lastRenderedReducer=l;var o=e.baseQueue,h=r.pending;if(h!==null){if(o!==null){var y=o.next;o.next=h.next,h.next=y}t.baseQueue=o=h,r.pending=null}if(h=e.baseState,o===null)e.memoizedState=h;else{t=o.next;var v=y=null,w=null,N=t,Y=!1;do{var Z=N.lane&-536870913;if(Z!==N.lane?(Te&Z)===Z:(wn&Z)===Z){var j=N.revertLane;if(j===0)w!==null&&(w=w.next={lane:0,revertLane:0,gesture:null,action:N.action,hasEagerState:N.hasEagerState,eagerState:N.eagerState,next:null}),Z===ti&&(Y=!0);else if((wn&j)===j){N=N.next,j===ti&&(Y=!0);continue}else Z={lane:0,revertLane:N.revertLane,gesture:null,action:N.action,hasEagerState:N.hasEagerState,eagerState:N.eagerState,next:null},w===null?(v=w=Z,y=h):w=w.next=Z,ye.lanes|=j,Pn|=j;Z=N.action,Al&&l(h,Z),h=N.hasEagerState?N.eagerState:l(h,Z)}else j={lane:Z,revertLane:N.revertLane,gesture:N.gesture,action:N.action,hasEagerState:N.hasEagerState,eagerState:N.eagerState,next:null},w===null?(v=w=j,y=h):w=w.next=j,ye.lanes|=Z,Pn|=Z;N=N.next}while(N!==null&&N!==t);if(w===null?y=h:w.next=v,!Mt(h,e.memoizedState)&&(nt=!0,Y&&(l=ni,l!==null)))throw l;e.memoizedState=h,e.baseState=y,e.baseQueue=w,r.lastRenderedState=h}return o===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Ho(e){var t=Pe(),l=t.queue;if(l===null)throw Error(u(311));l.lastRenderedReducer=e;var r=l.dispatch,o=l.pending,h=t.memoizedState;if(o!==null){l.pending=null;var y=o=o.next;do h=e(h,y.action),y=y.next;while(y!==o);Mt(h,t.memoizedState)||(nt=!0),t.memoizedState=h,t.baseQueue===null&&(t.baseState=h),l.lastRenderedState=h}return[h,r]}function wh(e,t,l){var r=ye,o=Pe(),h=De;if(h){if(l===void 0)throw Error(u(407));l=l()}else l=t();var y=!Mt((Ue||o).memoizedState,l);if(y&&(o.memoizedState=l,nt=!0),o=o.queue,Vo(zh.bind(null,r,o,e),[e]),o.getSnapshot!==t||y||tt!==null&&tt.memoizedState.tag&1){if(r.flags|=2048,oi(9,{destroy:void 0},Th.bind(null,r,o,l,t),null),Ve===null)throw Error(u(349));h||(wn&127)!==0||Ah(r,t,l)}return l}function Ah(e,t,l){e.flags|=16384,e={getSnapshot:t,value:l},t=ye.updateQueue,t===null?(t=Tr(),ye.updateQueue=t,t.stores=[e]):(l=t.stores,l===null?t.stores=[e]:l.push(e))}function Th(e,t,l,r){t.value=l,t.getSnapshot=r,Dh(t)&&Rh(e)}function zh(e,t,l){return l(function(){Dh(t)&&Rh(e)})}function Dh(e){var t=e.getSnapshot;e=e.value;try{var l=t();return!Mt(e,l)}catch{return!0}}function Rh(e){var t=yl(e,2);t!==null&&zt(t,e,2)}function qo(e){var t=vt();if(typeof e=="function"){var l=e;if(e=l(),Al){St(!0);try{l()}finally{St(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:An,lastRenderedState:e},t}function _h(e,t,l,r){return e.baseState=l,Uo(e,Ue,typeof r=="function"?r:An)}function K1(e,t,l,r,o){if(Mr(e))throw Error(u(485));if(e=t.action,e!==null){var h={payload:o,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){h.listeners.push(y)}};L.T!==null?l(!0):h.isTransition=!1,r(h),l=t.pending,l===null?(h.next=t.pending=h,Mh(t,h)):(h.next=l.next,t.pending=l.next=h)}}function Mh(e,t){var l=t.action,r=t.payload,o=e.state;if(t.isTransition){var h=L.T,y={};L.T=y;try{var v=l(o,r),w=L.S;w!==null&&w(y,v),Oh(e,t,v)}catch(N){Yo(e,t,N)}finally{h!==null&&y.types!==null&&(h.types=y.types),L.T=h}}else try{h=l(o,r),Oh(e,t,h)}catch(N){Yo(e,t,N)}}function Oh(e,t,l){l!==null&&typeof l=="object"&&typeof l.then=="function"?l.then(function(r){Nh(e,t,r)},function(r){return Yo(e,t,r)}):Nh(e,t,l)}function Nh(e,t,l){t.status="fulfilled",t.value=l,jh(t),e.state=l,t=e.pending,t!==null&&(l=t.next,l===t?e.pending=null:(l=l.next,t.next=l,Mh(e,l)))}function Yo(e,t,l){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status="rejected",t.reason=l,jh(t),t=t.next;while(t!==r)}e.action=null}function jh(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Lh(e,t){return t}function Bh(e,t){if(De){var l=Ve.formState;if(l!==null){e:{var r=ye;if(De){if(Qe){t:{for(var o=Qe,h=It;o.nodeType!==8;){if(!h){o=null;break t}if(o=Jt(o.nextSibling),o===null){o=null;break t}}h=o.data,o=h==="F!"||h==="F"?o:null}if(o){Qe=Jt(o.nextSibling),r=o.data==="F!";break e}}Xn(r)}r=!1}r&&(t=l[0])}}return l=vt(),l.memoizedState=l.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Lh,lastRenderedState:t},l.queue=r,l=nd.bind(null,ye,r),r.dispatch=l,r=qo(!1),h=Zo.bind(null,ye,!1,r.queue),r=vt(),o={state:t,dispatch:null,action:e,pending:null},r.queue=o,l=K1.bind(null,ye,o,h,l),o.dispatch=l,r.memoizedState=e,[t,l,!1]}function Uh(e){var t=Pe();return Hh(t,Ue,e)}function Hh(e,t,l){if(t=Uo(e,t,Lh)[0],e=Dr(An)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var r=la(t)}catch(y){throw y===li?vr:y}else r=t;t=Pe();var o=t.queue,h=o.dispatch;return l!==t.memoizedState&&(ye.flags|=2048,oi(9,{destroy:void 0},J1.bind(null,o,l),null)),[r,h,e]}function J1(e,t){e.action=t}function qh(e){var t=Pe(),l=Ue;if(l!==null)return Hh(t,l,e);Pe(),t=t.memoizedState,l=Pe();var r=l.queue.dispatch;return l.memoizedState=e,[t,r,!1]}function oi(e,t,l,r){return e={tag:e,create:l,deps:r,inst:t,next:null},t=ye.updateQueue,t===null&&(t=Tr(),ye.updateQueue=t),l=t.lastEffect,l===null?t.lastEffect=e.next=e:(r=l.next,l.next=e,e.next=r,t.lastEffect=e),e}function Yh(){return Pe().memoizedState}function Rr(e,t,l,r){var o=vt();ye.flags|=e,o.memoizedState=oi(1|t,{destroy:void 0},l,r===void 0?null:r)}function _r(e,t,l,r){var o=Pe();r=r===void 0?null:r;var h=o.memoizedState.inst;Ue!==null&&r!==null&&Mo(r,Ue.memoizedState.deps)?o.memoizedState=oi(t,h,l,r):(ye.flags|=e,o.memoizedState=oi(1|t,h,l,r))}function Vh(e,t){Rr(8390656,8,e,t)}function Vo(e,t){_r(2048,8,e,t)}function W1(e){ye.flags|=4;var t=ye.updateQueue;if(t===null)t=Tr(),ye.updateQueue=t,t.events=[e];else{var l=t.events;l===null?t.events=[e]:l.push(e)}}function Gh(e){var t=Pe().memoizedState;return W1({ref:t,nextImpl:e}),function(){if((Oe&2)!==0)throw Error(u(440));return t.impl.apply(void 0,arguments)}}function Xh(e,t){return _r(4,2,e,t)}function Qh(e,t){return _r(4,4,e,t)}function Fh(e,t){if(typeof t=="function"){e=e();var l=t(e);return function(){typeof l=="function"?l():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Zh(e,t,l){l=l!=null?l.concat([e]):null,_r(4,4,Fh.bind(null,t,e),l)}function Go(){}function Ih(e,t){var l=Pe();t=t===void 0?null:t;var r=l.memoizedState;return t!==null&&Mo(t,r[1])?r[0]:(l.memoizedState=[e,t],e)}function Kh(e,t){var l=Pe();t=t===void 0?null:t;var r=l.memoizedState;if(t!==null&&Mo(t,r[1]))return r[0];if(r=e(),Al){St(!0);try{e()}finally{St(!1)}}return l.memoizedState=[r,t],r}function Xo(e,t,l){return l===void 0||(wn&1073741824)!==0&&(Te&261930)===0?e.memoizedState=t:(e.memoizedState=l,e=Jd(),ye.lanes|=e,Pn|=e,l)}function Jh(e,t,l,r){return Mt(l,t)?l:ai.current!==null?(e=Xo(e,l,r),Mt(e,t)||(nt=!0),e):(wn&42)===0||(wn&1073741824)!==0&&(Te&261930)===0?(nt=!0,e.memoizedState=l):(e=Jd(),ye.lanes|=e,Pn|=e,t)}function Wh(e,t,l,r,o){var h=I.p;I.p=h!==0&&8>h?h:8;var y=L.T,v={};L.T=v,Zo(e,!1,t,l);try{var w=o(),N=L.S;if(N!==null&&N(v,w),w!==null&&typeof w=="object"&&typeof w.then=="function"){var Y=F1(w,r);ia(e,t,Y,Ut(e))}else ia(e,t,r,Ut(e))}catch(Z){ia(e,t,{then:function(){},status:"rejected",reason:Z},Ut())}finally{I.p=h,y!==null&&v.types!==null&&(y.types=v.types),L.T=y}}function $1(){}function Qo(e,t,l,r){if(e.tag!==5)throw Error(u(476));var o=$h(e).queue;Wh(e,o,t,ue,l===null?$1:function(){return Ph(e),l(r)})}function $h(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ue,baseState:ue,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:An,lastRenderedState:ue},next:null};var l={};return t.next={memoizedState:l,baseState:l,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:An,lastRenderedState:l},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Ph(e){var t=$h(e);t.next===null&&(t=e.alternate.memoizedState),ia(e,t.next.queue,{},Ut())}function Fo(){return ft(Sa)}function ed(){return Pe().memoizedState}function td(){return Pe().memoizedState}function P1(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var l=Ut();e=Zn(l);var r=In(t,e,l);r!==null&&(zt(r,t,l),Pi(r,t,l)),t={cache:So()},e.payload=t;return}t=t.return}}function e0(e,t,l){var r=Ut();l={lane:r,revertLane:0,gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},Mr(e)?ld(t,l):(l=co(e,t,l,r),l!==null&&(zt(l,e,r),id(l,t,r)))}function nd(e,t,l){var r=Ut();ia(e,t,l,r)}function ia(e,t,l,r){var o={lane:r,revertLane:0,gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null};if(Mr(e))ld(t,o);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=t.lastRenderedReducer,h!==null))try{var y=t.lastRenderedState,v=h(y,l);if(o.hasEagerState=!0,o.eagerState=v,Mt(v,y))return hr(e,t,o,0),Ve===null&&fr(),!1}catch{}if(l=co(e,t,o,r),l!==null)return zt(l,e,r),id(l,t,r),!0}return!1}function Zo(e,t,l,r){if(r={lane:2,revertLane:wc(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Mr(e)){if(t)throw Error(u(479))}else t=co(e,l,r,2),t!==null&&zt(t,e,2)}function Mr(e){var t=e.alternate;return e===ye||t!==null&&t===ye}function ld(e,t){ri=wr=!0;var l=e.pending;l===null?t.next=t:(t.next=l.next,l.next=t),e.pending=t}function id(e,t,l){if((l&4194048)!==0){var r=t.lanes;r&=e.pendingLanes,l|=r,t.lanes=l,cf(e,l)}}var aa={readContext:ft,use:zr,useCallback:Je,useContext:Je,useEffect:Je,useImperativeHandle:Je,useLayoutEffect:Je,useInsertionEffect:Je,useMemo:Je,useReducer:Je,useRef:Je,useState:Je,useDebugValue:Je,useDeferredValue:Je,useTransition:Je,useSyncExternalStore:Je,useId:Je,useHostTransitionStatus:Je,useFormState:Je,useActionState:Je,useOptimistic:Je,useMemoCache:Je,useCacheRefresh:Je};aa.useEffectEvent=Je;var ad={readContext:ft,use:zr,useCallback:function(e,t){return vt().memoizedState=[e,t===void 0?null:t],e},useContext:ft,useEffect:Vh,useImperativeHandle:function(e,t,l){l=l!=null?l.concat([e]):null,Rr(4194308,4,Fh.bind(null,t,e),l)},useLayoutEffect:function(e,t){return Rr(4194308,4,e,t)},useInsertionEffect:function(e,t){Rr(4,2,e,t)},useMemo:function(e,t){var l=vt();t=t===void 0?null:t;var r=e();if(Al){St(!0);try{e()}finally{St(!1)}}return l.memoizedState=[r,t],r},useReducer:function(e,t,l){var r=vt();if(l!==void 0){var o=l(t);if(Al){St(!0);try{l(t)}finally{St(!1)}}}else o=t;return r.memoizedState=r.baseState=o,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:o},r.queue=e,e=e.dispatch=e0.bind(null,ye,e),[r.memoizedState,e]},useRef:function(e){var t=vt();return e={current:e},t.memoizedState=e},useState:function(e){e=qo(e);var t=e.queue,l=nd.bind(null,ye,t);return t.dispatch=l,[e.memoizedState,l]},useDebugValue:Go,useDeferredValue:function(e,t){var l=vt();return Xo(l,e,t)},useTransition:function(){var e=qo(!1);return e=Wh.bind(null,ye,e.queue,!0,!1),vt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,l){var r=ye,o=vt();if(De){if(l===void 0)throw Error(u(407));l=l()}else{if(l=t(),Ve===null)throw Error(u(349));(Te&127)!==0||Ah(r,t,l)}o.memoizedState=l;var h={value:l,getSnapshot:t};return o.queue=h,Vh(zh.bind(null,r,h,e),[e]),r.flags|=2048,oi(9,{destroy:void 0},Th.bind(null,r,h,l,t),null),l},useId:function(){var e=vt(),t=Ve.identifierPrefix;if(De){var l=on,r=un;l=(r&~(1<<32-Ye(r)-1)).toString(32)+l,t="_"+t+"R_"+l,l=Ar++,0<l&&(t+="H"+l.toString(32)),t+="_"}else l=Z1++,t="_"+t+"r_"+l.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Fo,useFormState:Bh,useActionState:Bh,useOptimistic:function(e){var t=vt();t.memoizedState=t.baseState=e;var l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=l,t=Zo.bind(null,ye,!0,l),l.dispatch=t,[e,t]},useMemoCache:Bo,useCacheRefresh:function(){return vt().memoizedState=P1.bind(null,ye)},useEffectEvent:function(e){var t=vt(),l={impl:e};return t.memoizedState=l,function(){if((Oe&2)!==0)throw Error(u(440));return l.impl.apply(void 0,arguments)}}},Io={readContext:ft,use:zr,useCallback:Ih,useContext:ft,useEffect:Vo,useImperativeHandle:Zh,useInsertionEffect:Xh,useLayoutEffect:Qh,useMemo:Kh,useReducer:Dr,useRef:Yh,useState:function(){return Dr(An)},useDebugValue:Go,useDeferredValue:function(e,t){var l=Pe();return Jh(l,Ue.memoizedState,e,t)},useTransition:function(){var e=Dr(An)[0],t=Pe().memoizedState;return[typeof e=="boolean"?e:la(e),t]},useSyncExternalStore:wh,useId:ed,useHostTransitionStatus:Fo,useFormState:Uh,useActionState:Uh,useOptimistic:function(e,t){var l=Pe();return _h(l,Ue,e,t)},useMemoCache:Bo,useCacheRefresh:td};Io.useEffectEvent=Gh;var rd={readContext:ft,use:zr,useCallback:Ih,useContext:ft,useEffect:Vo,useImperativeHandle:Zh,useInsertionEffect:Xh,useLayoutEffect:Qh,useMemo:Kh,useReducer:Ho,useRef:Yh,useState:function(){return Ho(An)},useDebugValue:Go,useDeferredValue:function(e,t){var l=Pe();return Ue===null?Xo(l,e,t):Jh(l,Ue.memoizedState,e,t)},useTransition:function(){var e=Ho(An)[0],t=Pe().memoizedState;return[typeof e=="boolean"?e:la(e),t]},useSyncExternalStore:wh,useId:ed,useHostTransitionStatus:Fo,useFormState:qh,useActionState:qh,useOptimistic:function(e,t){var l=Pe();return Ue!==null?_h(l,Ue,e,t):(l.baseState=e,[e,l.queue.dispatch])},useMemoCache:Bo,useCacheRefresh:td};rd.useEffectEvent=Gh;function Ko(e,t,l,r){t=e.memoizedState,l=l(r,t),l=l==null?t:g({},t,l),e.memoizedState=l,e.lanes===0&&(e.updateQueue.baseState=l)}var Jo={enqueueSetState:function(e,t,l){e=e._reactInternals;var r=Ut(),o=Zn(r);o.payload=t,l!=null&&(o.callback=l),t=In(e,o,r),t!==null&&(zt(t,e,r),Pi(t,e,r))},enqueueReplaceState:function(e,t,l){e=e._reactInternals;var r=Ut(),o=Zn(r);o.tag=1,o.payload=t,l!=null&&(o.callback=l),t=In(e,o,r),t!==null&&(zt(t,e,r),Pi(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var l=Ut(),r=Zn(l);r.tag=2,t!=null&&(r.callback=t),t=In(e,r,l),t!==null&&(zt(t,e,l),Pi(t,e,l))}};function ud(e,t,l,r,o,h,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,h,y):t.prototype&&t.prototype.isPureReactComponent?!Qi(l,r)||!Qi(o,h):!0}function od(e,t,l,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(l,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(l,r),t.state!==e&&Jo.enqueueReplaceState(t,t.state,null)}function Tl(e,t){var l=t;if("ref"in t){l={};for(var r in t)r!=="ref"&&(l[r]=t[r])}if(e=e.defaultProps){l===t&&(l=g({},l));for(var o in e)l[o]===void 0&&(l[o]=e[o])}return l}function cd(e){sr(e)}function sd(e){console.error(e)}function fd(e){sr(e)}function Or(e,t){try{var l=e.onUncaughtError;l(t.value,{componentStack:t.stack})}catch(r){setTimeout(function(){throw r})}}function hd(e,t,l){try{var r=e.onCaughtError;r(l.value,{componentStack:l.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(o){setTimeout(function(){throw o})}}function Wo(e,t,l){return l=Zn(l),l.tag=3,l.payload={element:null},l.callback=function(){Or(e,t)},l}function dd(e){return e=Zn(e),e.tag=3,e}function md(e,t,l,r){var o=l.type.getDerivedStateFromError;if(typeof o=="function"){var h=r.value;e.payload=function(){return o(h)},e.callback=function(){hd(t,l,r)}}var y=l.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){hd(t,l,r),typeof o!="function"&&(el===null?el=new Set([this]):el.add(this));var v=r.stack;this.componentDidCatch(r.value,{componentStack:v!==null?v:""})})}function t0(e,t,l,r,o){if(l.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(t=l.alternate,t!==null&&ei(t,l,o,!0),l=Nt.current,l!==null){switch(l.tag){case 31:case 13:return Kt===null?Qr():l.alternate===null&&We===0&&(We=3),l.flags&=-257,l.flags|=65536,l.lanes=o,r===xr?l.flags|=16384:(t=l.updateQueue,t===null?l.updateQueue=new Set([r]):t.add(r),Ec(e,r,o)),!1;case 22:return l.flags|=65536,r===xr?l.flags|=16384:(t=l.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},l.updateQueue=t):(l=t.retryQueue,l===null?t.retryQueue=new Set([r]):l.add(r)),Ec(e,r,o)),!1}throw Error(u(435,l.tag))}return Ec(e,r,o),Qr(),!1}if(De)return t=Nt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=o,r!==go&&(e=Error(u(422),{cause:r}),Ii(Qt(e,l)))):(r!==go&&(t=Error(u(423),{cause:r}),Ii(Qt(t,l))),e=e.current.alternate,e.flags|=65536,o&=-o,e.lanes|=o,r=Qt(r,l),o=Wo(e.stateNode,r,o),To(e,o),We!==4&&(We=2)),!1;var h=Error(u(520),{cause:r});if(h=Qt(h,l),da===null?da=[h]:da.push(h),We!==4&&(We=2),t===null)return!0;r=Qt(r,l),l=t;do{switch(l.tag){case 3:return l.flags|=65536,e=o&-o,l.lanes|=e,e=Wo(l.stateNode,r,e),To(l,e),!1;case 1:if(t=l.type,h=l.stateNode,(l.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(el===null||!el.has(h))))return l.flags|=65536,o&=-o,l.lanes|=o,o=dd(o),md(o,e,l,r),To(l,o),!1}l=l.return}while(l!==null);return!1}var $o=Error(u(461)),nt=!1;function ht(e,t,l,r){t.child=e===null?bh(t,null,l,r):wl(t,e.child,l,r)}function pd(e,t,l,r,o){l=l.render;var h=t.ref;if("ref"in r){var y={};for(var v in r)v!=="ref"&&(y[v]=r[v])}else y=r;return Sl(t),r=Oo(e,t,l,y,h,o),v=No(),e!==null&&!nt?(jo(e,t,o),Tn(e,t,o)):(De&&v&&mo(t),t.flags|=1,ht(e,t,r,o),t.child)}function gd(e,t,l,r,o){if(e===null){var h=l.type;return typeof h=="function"&&!so(h)&&h.defaultProps===void 0&&l.compare===null?(t.tag=15,t.type=h,yd(e,t,h,r,o)):(e=mr(l.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(h=e.child,!rc(e,o)){var y=h.memoizedProps;if(l=l.compare,l=l!==null?l:Qi,l(y,r)&&e.ref===t.ref)return Tn(e,t,o)}return t.flags|=1,e=Sn(h,r),e.ref=t.ref,e.return=t,t.child=e}function yd(e,t,l,r,o){if(e!==null){var h=e.memoizedProps;if(Qi(h,r)&&e.ref===t.ref)if(nt=!1,t.pendingProps=r=h,rc(e,o))(e.flags&131072)!==0&&(nt=!0);else return t.lanes=e.lanes,Tn(e,t,o)}return Po(e,t,l,r,o)}function bd(e,t,l,r){var o=r.children,h=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode==="hidden"){if((t.flags&128)!==0){if(h=h!==null?h.baseLanes|l:l,e!==null){for(r=t.child=e.child,o=0;r!==null;)o=o|r.lanes|r.childLanes,r=r.sibling;r=o&~h}else r=0,t.child=null;return vd(e,t,h,l,r)}if((l&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&br(t,h!==null?h.cachePool:null),h!==null?Sh(t,h):Do(),Eh(t);else return r=t.lanes=536870912,vd(e,t,h!==null?h.baseLanes|l:l,l,r)}else h!==null?(br(t,h.cachePool),Sh(t,h),Jn(),t.memoizedState=null):(e!==null&&br(t,null),Do(),Jn());return ht(e,t,o,l),t.child}function ra(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function vd(e,t,l,r,o){var h=ko();return h=h===null?null:{parent:et._currentValue,pool:h},t.memoizedState={baseLanes:l,cachePool:h},e!==null&&br(t,null),Do(),Eh(t),e!==null&&ei(e,t,r,!0),t.childLanes=o,null}function Nr(e,t){return t=Lr({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function xd(e,t,l){return wl(t,e.child,null,l),e=Nr(t,t.pendingProps),e.flags|=2,jt(t),t.memoizedState=null,e}function n0(e,t,l){var r=t.pendingProps,o=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(De){if(r.mode==="hidden")return e=Nr(t,r),t.lanes=536870912,ra(null,e);if(_o(t),(e=Qe)?(e=Mm(e,It),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Vn!==null?{id:un,overflow:on}:null,retryLane:536870912,hydrationErrors:null},l=lh(e),l.return=t,t.child=l,st=t,Qe=null)):e=null,e===null)throw Xn(t);return t.lanes=536870912,null}return Nr(t,r)}var h=e.memoizedState;if(h!==null){var y=h.dehydrated;if(_o(t),o)if(t.flags&256)t.flags&=-257,t=xd(e,t,l);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(u(558));else if(nt||ei(e,t,l,!1),o=(l&e.childLanes)!==0,nt||o){if(r=Ve,r!==null&&(y=sf(r,l),y!==0&&y!==h.retryLane))throw h.retryLane=y,yl(e,y),zt(r,e,y),$o;Qr(),t=xd(e,t,l)}else e=h.treeContext,Qe=Jt(y.nextSibling),st=t,De=!0,Gn=null,It=!1,e!==null&&rh(t,e),t=Nr(t,r),t.flags|=4096;return t}return e=Sn(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function jr(e,t){var l=t.ref;if(l===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof l!="function"&&typeof l!="object")throw Error(u(284));(e===null||e.ref!==l)&&(t.flags|=4194816)}}function Po(e,t,l,r,o){return Sl(t),l=Oo(e,t,l,r,void 0,o),r=No(),e!==null&&!nt?(jo(e,t,o),Tn(e,t,o)):(De&&r&&mo(t),t.flags|=1,ht(e,t,l,o),t.child)}function Sd(e,t,l,r,o,h){return Sl(t),t.updateQueue=null,l=Ch(t,r,l,o),kh(e),r=No(),e!==null&&!nt?(jo(e,t,h),Tn(e,t,h)):(De&&r&&mo(t),t.flags|=1,ht(e,t,l,h),t.child)}function Ed(e,t,l,r,o){if(Sl(t),t.stateNode===null){var h=Jl,y=l.contextType;typeof y=="object"&&y!==null&&(h=ft(y)),h=new l(r,h),t.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=Jo,t.stateNode=h,h._reactInternals=t,h=t.stateNode,h.props=r,h.state=t.memoizedState,h.refs={},wo(t),y=l.contextType,h.context=typeof y=="object"&&y!==null?ft(y):Jl,h.state=t.memoizedState,y=l.getDerivedStateFromProps,typeof y=="function"&&(Ko(t,l,y,r),h.state=t.memoizedState),typeof l.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(y=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),y!==h.state&&Jo.enqueueReplaceState(h,h.state,null),ta(t,r,h,o),ea(),h.state=t.memoizedState),typeof h.componentDidMount=="function"&&(t.flags|=4194308),r=!0}else if(e===null){h=t.stateNode;var v=t.memoizedProps,w=Tl(l,v);h.props=w;var N=h.context,Y=l.contextType;y=Jl,typeof Y=="object"&&Y!==null&&(y=ft(Y));var Z=l.getDerivedStateFromProps;Y=typeof Z=="function"||typeof h.getSnapshotBeforeUpdate=="function",v=t.pendingProps!==v,Y||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(v||N!==y)&&od(t,h,r,y),Fn=!1;var j=t.memoizedState;h.state=j,ta(t,r,h,o),ea(),N=t.memoizedState,v||j!==N||Fn?(typeof Z=="function"&&(Ko(t,l,Z,r),N=t.memoizedState),(w=Fn||ud(t,l,w,r,j,N,y))?(Y||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(t.flags|=4194308)):(typeof h.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=N),h.props=r,h.state=N,h.context=y,r=w):(typeof h.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{h=t.stateNode,Ao(e,t),y=t.memoizedProps,Y=Tl(l,y),h.props=Y,Z=t.pendingProps,j=h.context,N=l.contextType,w=Jl,typeof N=="object"&&N!==null&&(w=ft(N)),v=l.getDerivedStateFromProps,(N=typeof v=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(y!==Z||j!==w)&&od(t,h,r,w),Fn=!1,j=t.memoizedState,h.state=j,ta(t,r,h,o),ea();var H=t.memoizedState;y!==Z||j!==H||Fn||e!==null&&e.dependencies!==null&&gr(e.dependencies)?(typeof v=="function"&&(Ko(t,l,v,r),H=t.memoizedState),(Y=Fn||ud(t,l,Y,r,j,H,w)||e!==null&&e.dependencies!==null&&gr(e.dependencies))?(N||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(r,H,w),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(r,H,w)),typeof h.componentDidUpdate=="function"&&(t.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof h.componentDidUpdate!="function"||y===e.memoizedProps&&j===e.memoizedState||(t.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&j===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=H),h.props=r,h.state=H,h.context=w,r=Y):(typeof h.componentDidUpdate!="function"||y===e.memoizedProps&&j===e.memoizedState||(t.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&j===e.memoizedState||(t.flags|=1024),r=!1)}return h=r,jr(e,t),r=(t.flags&128)!==0,h||r?(h=t.stateNode,l=r&&typeof l.getDerivedStateFromError!="function"?null:h.render(),t.flags|=1,e!==null&&r?(t.child=wl(t,e.child,null,o),t.child=wl(t,null,l,o)):ht(e,t,l,o),t.memoizedState=h.state,e=t.child):e=Tn(e,t,o),e}function kd(e,t,l,r){return vl(),t.flags|=256,ht(e,t,l,r),t.child}var ec={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function tc(e){return{baseLanes:e,cachePool:hh()}}function nc(e,t,l){return e=e!==null?e.childLanes&~l:0,t&&(e|=Bt),e}function Cd(e,t,l){var r=t.pendingProps,o=!1,h=(t.flags&128)!==0,y;if((y=h)||(y=e!==null&&e.memoizedState===null?!1:($e.current&2)!==0),y&&(o=!0,t.flags&=-129),y=(t.flags&32)!==0,t.flags&=-33,e===null){if(De){if(o?Kn(t):Jn(),(e=Qe)?(e=Mm(e,It),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Vn!==null?{id:un,overflow:on}:null,retryLane:536870912,hydrationErrors:null},l=lh(e),l.return=t,t.child=l,st=t,Qe=null)):e=null,e===null)throw Xn(t);return Uc(e)?t.lanes=32:t.lanes=536870912,null}var v=r.children;return r=r.fallback,o?(Jn(),o=t.mode,v=Lr({mode:"hidden",children:v},o),r=bl(r,o,l,null),v.return=t,r.return=t,v.sibling=r,t.child=v,r=t.child,r.memoizedState=tc(l),r.childLanes=nc(e,y,l),t.memoizedState=ec,ra(null,r)):(Kn(t),lc(t,v))}var w=e.memoizedState;if(w!==null&&(v=w.dehydrated,v!==null)){if(h)t.flags&256?(Kn(t),t.flags&=-257,t=ic(e,t,l)):t.memoizedState!==null?(Jn(),t.child=e.child,t.flags|=128,t=null):(Jn(),v=r.fallback,o=t.mode,r=Lr({mode:"visible",children:r.children},o),v=bl(v,o,l,null),v.flags|=2,r.return=t,v.return=t,r.sibling=v,t.child=r,wl(t,e.child,null,l),r=t.child,r.memoizedState=tc(l),r.childLanes=nc(e,y,l),t.memoizedState=ec,t=ra(null,r));else if(Kn(t),Uc(v)){if(y=v.nextSibling&&v.nextSibling.dataset,y)var N=y.dgst;y=N,r=Error(u(419)),r.stack="",r.digest=y,Ii({value:r,source:null,stack:null}),t=ic(e,t,l)}else if(nt||ei(e,t,l,!1),y=(l&e.childLanes)!==0,nt||y){if(y=Ve,y!==null&&(r=sf(y,l),r!==0&&r!==w.retryLane))throw w.retryLane=r,yl(e,r),zt(y,e,r),$o;Bc(v)||Qr(),t=ic(e,t,l)}else Bc(v)?(t.flags|=192,t.child=e.child,t=null):(e=w.treeContext,Qe=Jt(v.nextSibling),st=t,De=!0,Gn=null,It=!1,e!==null&&rh(t,e),t=lc(t,r.children),t.flags|=4096);return t}return o?(Jn(),v=r.fallback,o=t.mode,w=e.child,N=w.sibling,r=Sn(w,{mode:"hidden",children:r.children}),r.subtreeFlags=w.subtreeFlags&65011712,N!==null?v=Sn(N,v):(v=bl(v,o,l,null),v.flags|=2),v.return=t,r.return=t,r.sibling=v,t.child=r,ra(null,r),r=t.child,v=e.child.memoizedState,v===null?v=tc(l):(o=v.cachePool,o!==null?(w=et._currentValue,o=o.parent!==w?{parent:w,pool:w}:o):o=hh(),v={baseLanes:v.baseLanes|l,cachePool:o}),r.memoizedState=v,r.childLanes=nc(e,y,l),t.memoizedState=ec,ra(e.child,r)):(Kn(t),l=e.child,e=l.sibling,l=Sn(l,{mode:"visible",children:r.children}),l.return=t,l.sibling=null,e!==null&&(y=t.deletions,y===null?(t.deletions=[e],t.flags|=16):y.push(e)),t.child=l,t.memoizedState=null,l)}function lc(e,t){return t=Lr({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Lr(e,t){return e=Ot(22,e,null,t),e.lanes=0,e}function ic(e,t,l){return wl(t,e.child,null,l),e=lc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function wd(e,t,l){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),vo(e.return,t,l)}function ac(e,t,l,r,o,h){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:l,tailMode:o,treeForkCount:h}:(y.isBackwards=t,y.rendering=null,y.renderingStartTime=0,y.last=r,y.tail=l,y.tailMode=o,y.treeForkCount=h)}function Ad(e,t,l){var r=t.pendingProps,o=r.revealOrder,h=r.tail;r=r.children;var y=$e.current,v=(y&2)!==0;if(v?(y=y&1|2,t.flags|=128):y&=1,k($e,y),ht(e,t,r,l),r=De?Zi:0,!v&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&wd(e,l,t);else if(e.tag===19)wd(e,l,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(o){case"forwards":for(l=t.child,o=null;l!==null;)e=l.alternate,e!==null&&Cr(e)===null&&(o=l),l=l.sibling;l=o,l===null?(o=t.child,t.child=null):(o=l.sibling,l.sibling=null),ac(t,!1,o,l,h,r);break;case"backwards":case"unstable_legacy-backwards":for(l=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&Cr(e)===null){t.child=o;break}e=o.sibling,o.sibling=l,l=o,o=e}ac(t,!0,l,null,h,r);break;case"together":ac(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Tn(e,t,l){if(e!==null&&(t.dependencies=e.dependencies),Pn|=t.lanes,(l&t.childLanes)===0)if(e!==null){if(ei(e,t,l,!1),(l&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(u(153));if(t.child!==null){for(e=t.child,l=Sn(e,e.pendingProps),t.child=l,l.return=t;e.sibling!==null;)e=e.sibling,l=l.sibling=Sn(e,e.pendingProps),l.return=t;l.sibling=null}return t.child}function rc(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&gr(e)))}function l0(e,t,l){switch(t.tag){case 3:Ze(t,t.stateNode.containerInfo),Qn(t,et,e.memoizedState.cache),vl();break;case 27:case 5:Yt(t);break;case 4:Ze(t,t.stateNode.containerInfo);break;case 10:Qn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,_o(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated!==null?(Kn(t),t.flags|=128,null):(l&t.child.childLanes)!==0?Cd(e,t,l):(Kn(t),e=Tn(e,t,l),e!==null?e.sibling:null);Kn(t);break;case 19:var o=(e.flags&128)!==0;if(r=(l&t.childLanes)!==0,r||(ei(e,t,l,!1),r=(l&t.childLanes)!==0),o){if(r)return Ad(e,t,l);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),k($e,$e.current),r)break;return null;case 22:return t.lanes=0,bd(e,t,l,t.pendingProps);case 24:Qn(t,et,e.memoizedState.cache)}return Tn(e,t,l)}function Td(e,t,l){if(e!==null)if(e.memoizedProps!==t.pendingProps)nt=!0;else{if(!rc(e,l)&&(t.flags&128)===0)return nt=!1,l0(e,t,l);nt=(e.flags&131072)!==0}else nt=!1,De&&(t.flags&1048576)!==0&&ah(t,Zi,t.index);switch(t.lanes=0,t.tag){case 16:e:{var r=t.pendingProps;if(e=kl(t.elementType),t.type=e,typeof e=="function")so(e)?(r=Tl(e,r),t.tag=1,t=Ed(null,t,e,r,l)):(t.tag=0,t=Po(null,t,e,r,l));else{if(e!=null){var o=e.$$typeof;if(o===ne){t.tag=11,t=pd(null,t,e,r,l);break e}else if(o===$){t.tag=14,t=gd(null,t,e,r,l);break e}}throw t=ae(e)||e,Error(u(306,t,""))}}return t;case 0:return Po(e,t,t.type,t.pendingProps,l);case 1:return r=t.type,o=Tl(r,t.pendingProps),Ed(e,t,r,o,l);case 3:e:{if(Ze(t,t.stateNode.containerInfo),e===null)throw Error(u(387));r=t.pendingProps;var h=t.memoizedState;o=h.element,Ao(e,t),ta(t,r,null,l);var y=t.memoizedState;if(r=y.cache,Qn(t,et,r),r!==h.cache&&xo(t,[et],l,!0),ea(),r=y.element,h.isDehydrated)if(h={element:r,isDehydrated:!1,cache:y.cache},t.updateQueue.baseState=h,t.memoizedState=h,t.flags&256){t=kd(e,t,r,l);break e}else if(r!==o){o=Qt(Error(u(424)),t),Ii(o),t=kd(e,t,r,l);break e}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Qe=Jt(e.firstChild),st=t,De=!0,Gn=null,It=!0,l=bh(t,null,r,l),t.child=l;l;)l.flags=l.flags&-3|4096,l=l.sibling;else{if(vl(),r===o){t=Tn(e,t,l);break e}ht(e,t,r,l)}t=t.child}return t;case 26:return jr(e,t),e===null?(l=Um(t.type,null,t.pendingProps,null))?t.memoizedState=l:De||(l=t.type,e=t.pendingProps,r=$r(oe.current).createElement(l),r[ct]=t,r[Et]=e,dt(r,l,e),ut(r),t.stateNode=r):t.memoizedState=Um(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Yt(t),e===null&&De&&(r=t.stateNode=jm(t.type,t.pendingProps,oe.current),st=t,It=!0,o=Qe,il(t.type)?(Hc=o,Qe=Jt(r.firstChild)):Qe=o),ht(e,t,t.pendingProps.children,l),jr(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&De&&((o=r=Qe)&&(r=O0(r,t.type,t.pendingProps,It),r!==null?(t.stateNode=r,st=t,Qe=Jt(r.firstChild),It=!1,o=!0):o=!1),o||Xn(t)),Yt(t),o=t.type,h=t.pendingProps,y=e!==null?e.memoizedProps:null,r=h.children,Nc(o,h)?r=null:y!==null&&Nc(o,y)&&(t.flags|=32),t.memoizedState!==null&&(o=Oo(e,t,I1,null,null,l),Sa._currentValue=o),jr(e,t),ht(e,t,r,l),t.child;case 6:return e===null&&De&&((e=l=Qe)&&(l=N0(l,t.pendingProps,It),l!==null?(t.stateNode=l,st=t,Qe=null,e=!0):e=!1),e||Xn(t)),null;case 13:return Cd(e,t,l);case 4:return Ze(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=wl(t,null,r,l):ht(e,t,r,l),t.child;case 11:return pd(e,t,t.type,t.pendingProps,l);case 7:return ht(e,t,t.pendingProps,l),t.child;case 8:return ht(e,t,t.pendingProps.children,l),t.child;case 12:return ht(e,t,t.pendingProps.children,l),t.child;case 10:return r=t.pendingProps,Qn(t,t.type,r.value),ht(e,t,r.children,l),t.child;case 9:return o=t.type._context,r=t.pendingProps.children,Sl(t),o=ft(o),r=r(o),t.flags|=1,ht(e,t,r,l),t.child;case 14:return gd(e,t,t.type,t.pendingProps,l);case 15:return yd(e,t,t.type,t.pendingProps,l);case 19:return Ad(e,t,l);case 31:return n0(e,t,l);case 22:return bd(e,t,l,t.pendingProps);case 24:return Sl(t),r=ft(et),e===null?(o=ko(),o===null&&(o=Ve,h=So(),o.pooledCache=h,h.refCount++,h!==null&&(o.pooledCacheLanes|=l),o=h),t.memoizedState={parent:r,cache:o},wo(t),Qn(t,et,o)):((e.lanes&l)!==0&&(Ao(e,t),ta(t,null,null,l),ea()),o=e.memoizedState,h=t.memoizedState,o.parent!==r?(o={parent:r,cache:r},t.memoizedState=o,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=o),Qn(t,et,r)):(r=h.cache,Qn(t,et,r),r!==o.cache&&xo(t,[et],l,!0))),ht(e,t,t.pendingProps.children,l),t.child;case 29:throw t.pendingProps}throw Error(u(156,t.tag))}function zn(e){e.flags|=4}function uc(e,t,l,r,o){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(o&335544128)===o)if(e.stateNode.complete)e.flags|=8192;else if(em())e.flags|=8192;else throw Cl=xr,Co}else e.flags&=-16777217}function zd(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Gm(t))if(em())e.flags|=8192;else throw Cl=xr,Co}function Br(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?uf():536870912,e.lanes|=t,hi|=t)}function ua(e,t){if(!De)switch(e.tailMode){case"hidden":t=e.tail;for(var l=null;t!==null;)t.alternate!==null&&(l=t),t=t.sibling;l===null?e.tail=null:l.sibling=null;break;case"collapsed":l=e.tail;for(var r=null;l!==null;)l.alternate!==null&&(r=l),l=l.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Fe(e){var t=e.alternate!==null&&e.alternate.child===e.child,l=0,r=0;if(t)for(var o=e.child;o!==null;)l|=o.lanes|o.childLanes,r|=o.subtreeFlags&65011712,r|=o.flags&65011712,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)l|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=l,t}function i0(e,t,l){var r=t.pendingProps;switch(po(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Fe(t),null;case 1:return Fe(t),null;case 3:return l=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Cn(et),Be(),l.pendingContext&&(l.context=l.pendingContext,l.pendingContext=null),(e===null||e.child===null)&&(Pl(t)?zn(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,yo())),Fe(t),null;case 26:var o=t.type,h=t.memoizedState;return e===null?(zn(t),h!==null?(Fe(t),zd(t,h)):(Fe(t),uc(t,o,null,r,l))):h?h!==e.memoizedState?(zn(t),Fe(t),zd(t,h)):(Fe(t),t.flags&=-16777217):(e=e.memoizedProps,e!==r&&zn(t),Fe(t),uc(t,o,e,r,l)),null;case 27:if(pn(t),l=oe.current,o=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&zn(t);else{if(!r){if(t.stateNode===null)throw Error(u(166));return Fe(t),null}e=P.current,Pl(t)?uh(t):(e=jm(o,r,l),t.stateNode=e,zn(t))}return Fe(t),null;case 5:if(pn(t),o=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&zn(t);else{if(!r){if(t.stateNode===null)throw Error(u(166));return Fe(t),null}if(h=P.current,Pl(t))uh(t);else{var y=$r(oe.current);switch(h){case 1:h=y.createElementNS("http://www.w3.org/2000/svg",o);break;case 2:h=y.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;default:switch(o){case"svg":h=y.createElementNS("http://www.w3.org/2000/svg",o);break;case"math":h=y.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;case"script":h=y.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof r.is=="string"?y.createElement("select",{is:r.is}):y.createElement("select"),r.multiple?h.multiple=!0:r.size&&(h.size=r.size);break;default:h=typeof r.is=="string"?y.createElement(o,{is:r.is}):y.createElement(o)}}h[ct]=t,h[Et]=r;e:for(y=t.child;y!==null;){if(y.tag===5||y.tag===6)h.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===t)break e;for(;y.sibling===null;){if(y.return===null||y.return===t)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}t.stateNode=h;e:switch(dt(h,o,r),o){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}r&&zn(t)}}return Fe(t),uc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,l),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&zn(t);else{if(typeof r!="string"&&t.stateNode===null)throw Error(u(166));if(e=oe.current,Pl(t)){if(e=t.stateNode,l=t.memoizedProps,r=null,o=st,o!==null)switch(o.tag){case 27:case 5:r=o.memoizedProps}e[ct]=t,e=!!(e.nodeValue===l||r!==null&&r.suppressHydrationWarning===!0||Cm(e.nodeValue,l)),e||Xn(t,!0)}else e=$r(e).createTextNode(r),e[ct]=t,t.stateNode=e}return Fe(t),null;case 31:if(l=t.memoizedState,e===null||e.memoizedState!==null){if(r=Pl(t),l!==null){if(e===null){if(!r)throw Error(u(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(557));e[ct]=t}else vl(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Fe(t),e=!1}else l=yo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),e=!0;if(!e)return t.flags&256?(jt(t),t):(jt(t),null);if((t.flags&128)!==0)throw Error(u(558))}return Fe(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(o=Pl(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(u(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(u(317));o[ct]=t}else vl(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Fe(t),o=!1}else o=yo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=o),o=!0;if(!o)return t.flags&256?(jt(t),t):(jt(t),null)}return jt(t),(t.flags&128)!==0?(t.lanes=l,t):(l=r!==null,e=e!==null&&e.memoizedState!==null,l&&(r=t.child,o=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(o=r.alternate.memoizedState.cachePool.pool),h=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(h=r.memoizedState.cachePool.pool),h!==o&&(r.flags|=2048)),l!==e&&l&&(t.child.flags|=8192),Br(t,t.updateQueue),Fe(t),null);case 4:return Be(),e===null&&Dc(t.stateNode.containerInfo),Fe(t),null;case 10:return Cn(t.type),Fe(t),null;case 19:if(X($e),r=t.memoizedState,r===null)return Fe(t),null;if(o=(t.flags&128)!==0,h=r.rendering,h===null)if(o)ua(r,!1);else{if(We!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(h=Cr(e),h!==null){for(t.flags|=128,ua(r,!1),e=h.updateQueue,t.updateQueue=e,Br(t,e),t.subtreeFlags=0,e=l,l=t.child;l!==null;)nh(l,e),l=l.sibling;return k($e,$e.current&1|2),De&&En(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&yt()>Vr&&(t.flags|=128,o=!0,ua(r,!1),t.lanes=4194304)}else{if(!o)if(e=Cr(h),e!==null){if(t.flags|=128,o=!0,e=e.updateQueue,t.updateQueue=e,Br(t,e),ua(r,!0),r.tail===null&&r.tailMode==="hidden"&&!h.alternate&&!De)return Fe(t),null}else 2*yt()-r.renderingStartTime>Vr&&l!==536870912&&(t.flags|=128,o=!0,ua(r,!1),t.lanes=4194304);r.isBackwards?(h.sibling=t.child,t.child=h):(e=r.last,e!==null?e.sibling=h:t.child=h,r.last=h)}return r.tail!==null?(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=yt(),e.sibling=null,l=$e.current,k($e,o?l&1|2:l&1),De&&En(t,r.treeForkCount),e):(Fe(t),null);case 22:case 23:return jt(t),Ro(),r=t.memoizedState!==null,e!==null?e.memoizedState!==null!==r&&(t.flags|=8192):r&&(t.flags|=8192),r?(l&536870912)!==0&&(t.flags&128)===0&&(Fe(t),t.subtreeFlags&6&&(t.flags|=8192)):Fe(t),l=t.updateQueue,l!==null&&Br(t,l.retryQueue),l=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==l&&(t.flags|=2048),e!==null&&X(El),null;case 24:return l=null,e!==null&&(l=e.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),Cn(et),Fe(t),null;case 25:return null;case 30:return null}throw Error(u(156,t.tag))}function a0(e,t){switch(po(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Cn(et),Be(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return pn(t),null;case 31:if(t.memoizedState!==null){if(jt(t),t.alternate===null)throw Error(u(340));vl()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(jt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(u(340));vl()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return X($e),null;case 4:return Be(),null;case 10:return Cn(t.type),null;case 22:case 23:return jt(t),Ro(),e!==null&&X(El),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Cn(et),null;case 25:return null;default:return null}}function Dd(e,t){switch(po(t),t.tag){case 3:Cn(et),Be();break;case 26:case 27:case 5:pn(t);break;case 4:Be();break;case 31:t.memoizedState!==null&&jt(t);break;case 13:jt(t);break;case 19:X($e);break;case 10:Cn(t.type);break;case 22:case 23:jt(t),Ro(),e!==null&&X(El);break;case 24:Cn(et)}}function oa(e,t){try{var l=t.updateQueue,r=l!==null?l.lastEffect:null;if(r!==null){var o=r.next;l=o;do{if((l.tag&e)===e){r=void 0;var h=l.create,y=l.inst;r=h(),y.destroy=r}l=l.next}while(l!==o)}}catch(v){Le(t,t.return,v)}}function Wn(e,t,l){try{var r=t.updateQueue,o=r!==null?r.lastEffect:null;if(o!==null){var h=o.next;r=h;do{if((r.tag&e)===e){var y=r.inst,v=y.destroy;if(v!==void 0){y.destroy=void 0,o=t;var w=l,N=v;try{N()}catch(Y){Le(o,w,Y)}}}r=r.next}while(r!==h)}}catch(Y){Le(t,t.return,Y)}}function Rd(e){var t=e.updateQueue;if(t!==null){var l=e.stateNode;try{xh(t,l)}catch(r){Le(e,e.return,r)}}}function _d(e,t,l){l.props=Tl(e.type,e.memoizedProps),l.state=e.memoizedState;try{l.componentWillUnmount()}catch(r){Le(e,t,r)}}function ca(e,t){try{var l=e.ref;if(l!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof l=="function"?e.refCleanup=l(r):l.current=r}}catch(o){Le(e,t,o)}}function cn(e,t){var l=e.ref,r=e.refCleanup;if(l!==null)if(typeof r=="function")try{r()}catch(o){Le(e,t,o)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof l=="function")try{l(null)}catch(o){Le(e,t,o)}else l.current=null}function Md(e){var t=e.type,l=e.memoizedProps,r=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":l.autoFocus&&r.focus();break e;case"img":l.src?r.src=l.src:l.srcSet&&(r.srcset=l.srcSet)}}catch(o){Le(e,e.return,o)}}function oc(e,t,l){try{var r=e.stateNode;T0(r,e.type,l,t),r[Et]=t}catch(o){Le(e,e.return,o)}}function Od(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&il(e.type)||e.tag===4}function cc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Od(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&il(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function sc(e,t,l){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(l.nodeType===9?l.body:l.nodeName==="HTML"?l.ownerDocument.body:l).insertBefore(e,t):(t=l.nodeType===9?l.body:l.nodeName==="HTML"?l.ownerDocument.body:l,t.appendChild(e),l=l._reactRootContainer,l!=null||t.onclick!==null||(t.onclick=vn));else if(r!==4&&(r===27&&il(e.type)&&(l=e.stateNode,t=null),e=e.child,e!==null))for(sc(e,t,l),e=e.sibling;e!==null;)sc(e,t,l),e=e.sibling}function Ur(e,t,l){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?l.insertBefore(e,t):l.appendChild(e);else if(r!==4&&(r===27&&il(e.type)&&(l=e.stateNode),e=e.child,e!==null))for(Ur(e,t,l),e=e.sibling;e!==null;)Ur(e,t,l),e=e.sibling}function Nd(e){var t=e.stateNode,l=e.memoizedProps;try{for(var r=e.type,o=t.attributes;o.length;)t.removeAttributeNode(o[0]);dt(t,r,l),t[ct]=e,t[Et]=l}catch(h){Le(e,e.return,h)}}var Dn=!1,lt=!1,fc=!1,jd=typeof WeakSet=="function"?WeakSet:Set,ot=null;function r0(e,t){if(e=e.containerInfo,Mc=au,e=Zf(e),lo(e)){if("selectionStart"in e)var l={start:e.selectionStart,end:e.selectionEnd};else e:{l=(l=e.ownerDocument)&&l.defaultView||window;var r=l.getSelection&&l.getSelection();if(r&&r.rangeCount!==0){l=r.anchorNode;var o=r.anchorOffset,h=r.focusNode;r=r.focusOffset;try{l.nodeType,h.nodeType}catch{l=null;break e}var y=0,v=-1,w=-1,N=0,Y=0,Z=e,j=null;t:for(;;){for(var H;Z!==l||o!==0&&Z.nodeType!==3||(v=y+o),Z!==h||r!==0&&Z.nodeType!==3||(w=y+r),Z.nodeType===3&&(y+=Z.nodeValue.length),(H=Z.firstChild)!==null;)j=Z,Z=H;for(;;){if(Z===e)break t;if(j===l&&++N===o&&(v=y),j===h&&++Y===r&&(w=y),(H=Z.nextSibling)!==null)break;Z=j,j=Z.parentNode}Z=H}l=v===-1||w===-1?null:{start:v,end:w}}else l=null}l=l||{start:0,end:0}}else l=null;for(Oc={focusedElem:e,selectionRange:l},au=!1,ot=t;ot!==null;)if(t=ot,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ot=e;else for(;ot!==null;){switch(t=ot,h=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(l=0;l<e.length;l++)o=e[l],o.ref.impl=o.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,l=t,o=h.memoizedProps,h=h.memoizedState,r=l.stateNode;try{var ie=Tl(l.type,o);e=r.getSnapshotBeforeUpdate(ie,h),r.__reactInternalSnapshotBeforeUpdate=e}catch(he){Le(l,l.return,he)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,l=e.nodeType,l===9)Lc(e);else if(l===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Lc(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(u(163))}if(e=t.sibling,e!==null){e.return=t.return,ot=e;break}ot=t.return}}function Ld(e,t,l){var r=l.flags;switch(l.tag){case 0:case 11:case 15:_n(e,l),r&4&&oa(5,l);break;case 1:if(_n(e,l),r&4)if(e=l.stateNode,t===null)try{e.componentDidMount()}catch(y){Le(l,l.return,y)}else{var o=Tl(l.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(o,t,e.__reactInternalSnapshotBeforeUpdate)}catch(y){Le(l,l.return,y)}}r&64&&Rd(l),r&512&&ca(l,l.return);break;case 3:if(_n(e,l),r&64&&(e=l.updateQueue,e!==null)){if(t=null,l.child!==null)switch(l.child.tag){case 27:case 5:t=l.child.stateNode;break;case 1:t=l.child.stateNode}try{xh(e,t)}catch(y){Le(l,l.return,y)}}break;case 27:t===null&&r&4&&Nd(l);case 26:case 5:_n(e,l),t===null&&r&4&&Md(l),r&512&&ca(l,l.return);break;case 12:_n(e,l);break;case 31:_n(e,l),r&4&&Hd(e,l);break;case 13:_n(e,l),r&4&&qd(e,l),r&64&&(e=l.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(l=p0.bind(null,l),j0(e,l))));break;case 22:if(r=l.memoizedState!==null||Dn,!r){t=t!==null&&t.memoizedState!==null||lt,o=Dn;var h=lt;Dn=r,(lt=t)&&!h?Mn(e,l,(l.subtreeFlags&8772)!==0):_n(e,l),Dn=o,lt=h}break;case 30:break;default:_n(e,l)}}function Bd(e){var t=e.alternate;t!==null&&(e.alternate=null,Bd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&qu(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ie=null,Ct=!1;function Rn(e,t,l){for(l=l.child;l!==null;)Ud(e,t,l),l=l.sibling}function Ud(e,t,l){if(at&&typeof at.onCommitFiberUnmount=="function")try{at.onCommitFiberUnmount(bt,l)}catch{}switch(l.tag){case 26:lt||cn(l,t),Rn(e,t,l),l.memoizedState?l.memoizedState.count--:l.stateNode&&(l=l.stateNode,l.parentNode.removeChild(l));break;case 27:lt||cn(l,t);var r=Ie,o=Ct;il(l.type)&&(Ie=l.stateNode,Ct=!1),Rn(e,t,l),ba(l.stateNode),Ie=r,Ct=o;break;case 5:lt||cn(l,t);case 6:if(r=Ie,o=Ct,Ie=null,Rn(e,t,l),Ie=r,Ct=o,Ie!==null)if(Ct)try{(Ie.nodeType===9?Ie.body:Ie.nodeName==="HTML"?Ie.ownerDocument.body:Ie).removeChild(l.stateNode)}catch(h){Le(l,t,h)}else try{Ie.removeChild(l.stateNode)}catch(h){Le(l,t,h)}break;case 18:Ie!==null&&(Ct?(e=Ie,Rm(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,l.stateNode),xi(e)):Rm(Ie,l.stateNode));break;case 4:r=Ie,o=Ct,Ie=l.stateNode.containerInfo,Ct=!0,Rn(e,t,l),Ie=r,Ct=o;break;case 0:case 11:case 14:case 15:Wn(2,l,t),lt||Wn(4,l,t),Rn(e,t,l);break;case 1:lt||(cn(l,t),r=l.stateNode,typeof r.componentWillUnmount=="function"&&_d(l,t,r)),Rn(e,t,l);break;case 21:Rn(e,t,l);break;case 22:lt=(r=lt)||l.memoizedState!==null,Rn(e,t,l),lt=r;break;default:Rn(e,t,l)}}function Hd(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{xi(e)}catch(l){Le(t,t.return,l)}}}function qd(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{xi(e)}catch(l){Le(t,t.return,l)}}function u0(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new jd),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new jd),t;default:throw Error(u(435,e.tag))}}function Hr(e,t){var l=u0(e);t.forEach(function(r){if(!l.has(r)){l.add(r);var o=g0.bind(null,e,r);r.then(o,o)}})}function wt(e,t){var l=t.deletions;if(l!==null)for(var r=0;r<l.length;r++){var o=l[r],h=e,y=t,v=y;e:for(;v!==null;){switch(v.tag){case 27:if(il(v.type)){Ie=v.stateNode,Ct=!1;break e}break;case 5:Ie=v.stateNode,Ct=!1;break e;case 3:case 4:Ie=v.stateNode.containerInfo,Ct=!0;break e}v=v.return}if(Ie===null)throw Error(u(160));Ud(h,y,o),Ie=null,Ct=!1,h=o.alternate,h!==null&&(h.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Yd(t,e),t=t.sibling}var nn=null;function Yd(e,t){var l=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:wt(t,e),At(e),r&4&&(Wn(3,e,e.return),oa(3,e),Wn(5,e,e.return));break;case 1:wt(t,e),At(e),r&512&&(lt||l===null||cn(l,l.return)),r&64&&Dn&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(l=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=l===null?r:l.concat(r))));break;case 26:var o=nn;if(wt(t,e),At(e),r&512&&(lt||l===null||cn(l,l.return)),r&4){var h=l!==null?l.memoizedState:null;if(r=e.memoizedState,l===null)if(r===null)if(e.stateNode===null){e:{r=e.type,l=e.memoizedProps,o=o.ownerDocument||o;t:switch(r){case"title":h=o.getElementsByTagName("title")[0],(!h||h[Li]||h[ct]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=o.createElement(r),o.head.insertBefore(h,o.querySelector("head > title"))),dt(h,r,l),h[ct]=e,ut(h),r=h;break e;case"link":var y=Ym("link","href",o).get(r+(l.href||""));if(y){for(var v=0;v<y.length;v++)if(h=y[v],h.getAttribute("href")===(l.href==null||l.href===""?null:l.href)&&h.getAttribute("rel")===(l.rel==null?null:l.rel)&&h.getAttribute("title")===(l.title==null?null:l.title)&&h.getAttribute("crossorigin")===(l.crossOrigin==null?null:l.crossOrigin)){y.splice(v,1);break t}}h=o.createElement(r),dt(h,r,l),o.head.appendChild(h);break;case"meta":if(y=Ym("meta","content",o).get(r+(l.content||""))){for(v=0;v<y.length;v++)if(h=y[v],h.getAttribute("content")===(l.content==null?null:""+l.content)&&h.getAttribute("name")===(l.name==null?null:l.name)&&h.getAttribute("property")===(l.property==null?null:l.property)&&h.getAttribute("http-equiv")===(l.httpEquiv==null?null:l.httpEquiv)&&h.getAttribute("charset")===(l.charSet==null?null:l.charSet)){y.splice(v,1);break t}}h=o.createElement(r),dt(h,r,l),o.head.appendChild(h);break;default:throw Error(u(468,r))}h[ct]=e,ut(h),r=h}e.stateNode=r}else Vm(o,e.type,e.stateNode);else e.stateNode=qm(o,r,e.memoizedProps);else h!==r?(h===null?l.stateNode!==null&&(l=l.stateNode,l.parentNode.removeChild(l)):h.count--,r===null?Vm(o,e.type,e.stateNode):qm(o,r,e.memoizedProps)):r===null&&e.stateNode!==null&&oc(e,e.memoizedProps,l.memoizedProps)}break;case 27:wt(t,e),At(e),r&512&&(lt||l===null||cn(l,l.return)),l!==null&&r&4&&oc(e,e.memoizedProps,l.memoizedProps);break;case 5:if(wt(t,e),At(e),r&512&&(lt||l===null||cn(l,l.return)),e.flags&32){o=e.stateNode;try{Gl(o,"")}catch(ie){Le(e,e.return,ie)}}r&4&&e.stateNode!=null&&(o=e.memoizedProps,oc(e,o,l!==null?l.memoizedProps:o)),r&1024&&(fc=!0);break;case 6:if(wt(t,e),At(e),r&4){if(e.stateNode===null)throw Error(u(162));r=e.memoizedProps,l=e.stateNode;try{l.nodeValue=r}catch(ie){Le(e,e.return,ie)}}break;case 3:if(tu=null,o=nn,nn=Pr(t.containerInfo),wt(t,e),nn=o,At(e),r&4&&l!==null&&l.memoizedState.isDehydrated)try{xi(t.containerInfo)}catch(ie){Le(e,e.return,ie)}fc&&(fc=!1,Vd(e));break;case 4:r=nn,nn=Pr(e.stateNode.containerInfo),wt(t,e),At(e),nn=r;break;case 12:wt(t,e),At(e);break;case 31:wt(t,e),At(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,Hr(e,r)));break;case 13:wt(t,e),At(e),e.child.flags&8192&&e.memoizedState!==null!=(l!==null&&l.memoizedState!==null)&&(Yr=yt()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,Hr(e,r)));break;case 22:o=e.memoizedState!==null;var w=l!==null&&l.memoizedState!==null,N=Dn,Y=lt;if(Dn=N||o,lt=Y||w,wt(t,e),lt=Y,Dn=N,At(e),r&8192)e:for(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,o&&(l===null||w||Dn||lt||zl(e)),l=null,t=e;;){if(t.tag===5||t.tag===26){if(l===null){w=l=t;try{if(h=w.stateNode,o)y=h.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{v=w.stateNode;var Z=w.memoizedProps.style,j=Z!=null&&Z.hasOwnProperty("display")?Z.display:null;v.style.display=j==null||typeof j=="boolean"?"":(""+j).trim()}}catch(ie){Le(w,w.return,ie)}}}else if(t.tag===6){if(l===null){w=t;try{w.stateNode.nodeValue=o?"":w.memoizedProps}catch(ie){Le(w,w.return,ie)}}}else if(t.tag===18){if(l===null){w=t;try{var H=w.stateNode;o?_m(H,!0):_m(w.stateNode,!1)}catch(ie){Le(w,w.return,ie)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;l===t&&(l=null),t=t.return}l===t&&(l=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(l=r.retryQueue,l!==null&&(r.retryQueue=null,Hr(e,l))));break;case 19:wt(t,e),At(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,Hr(e,r)));break;case 30:break;case 21:break;default:wt(t,e),At(e)}}function At(e){var t=e.flags;if(t&2){try{for(var l,r=e.return;r!==null;){if(Od(r)){l=r;break}r=r.return}if(l==null)throw Error(u(160));switch(l.tag){case 27:var o=l.stateNode,h=cc(e);Ur(e,h,o);break;case 5:var y=l.stateNode;l.flags&32&&(Gl(y,""),l.flags&=-33);var v=cc(e);Ur(e,v,y);break;case 3:case 4:var w=l.stateNode.containerInfo,N=cc(e);sc(e,N,w);break;default:throw Error(u(161))}}catch(Y){Le(e,e.return,Y)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Vd(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Vd(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function _n(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Ld(e,t.alternate,t),t=t.sibling}function zl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Wn(4,t,t.return),zl(t);break;case 1:cn(t,t.return);var l=t.stateNode;typeof l.componentWillUnmount=="function"&&_d(t,t.return,l),zl(t);break;case 27:ba(t.stateNode);case 26:case 5:cn(t,t.return),zl(t);break;case 22:t.memoizedState===null&&zl(t);break;case 30:zl(t);break;default:zl(t)}e=e.sibling}}function Mn(e,t,l){for(l=l&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var r=t.alternate,o=e,h=t,y=h.flags;switch(h.tag){case 0:case 11:case 15:Mn(o,h,l),oa(4,h);break;case 1:if(Mn(o,h,l),r=h,o=r.stateNode,typeof o.componentDidMount=="function")try{o.componentDidMount()}catch(N){Le(r,r.return,N)}if(r=h,o=r.updateQueue,o!==null){var v=r.stateNode;try{var w=o.shared.hiddenCallbacks;if(w!==null)for(o.shared.hiddenCallbacks=null,o=0;o<w.length;o++)vh(w[o],v)}catch(N){Le(r,r.return,N)}}l&&y&64&&Rd(h),ca(h,h.return);break;case 27:Nd(h);case 26:case 5:Mn(o,h,l),l&&r===null&&y&4&&Md(h),ca(h,h.return);break;case 12:Mn(o,h,l);break;case 31:Mn(o,h,l),l&&y&4&&Hd(o,h);break;case 13:Mn(o,h,l),l&&y&4&&qd(o,h);break;case 22:h.memoizedState===null&&Mn(o,h,l),ca(h,h.return);break;case 30:break;default:Mn(o,h,l)}t=t.sibling}}function hc(e,t){var l=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==l&&(e!=null&&e.refCount++,l!=null&&Ki(l))}function dc(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ki(e))}function ln(e,t,l,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Gd(e,t,l,r),t=t.sibling}function Gd(e,t,l,r){var o=t.flags;switch(t.tag){case 0:case 11:case 15:ln(e,t,l,r),o&2048&&oa(9,t);break;case 1:ln(e,t,l,r);break;case 3:ln(e,t,l,r),o&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ki(e)));break;case 12:if(o&2048){ln(e,t,l,r),e=t.stateNode;try{var h=t.memoizedProps,y=h.id,v=h.onPostCommit;typeof v=="function"&&v(y,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(w){Le(t,t.return,w)}}else ln(e,t,l,r);break;case 31:ln(e,t,l,r);break;case 13:ln(e,t,l,r);break;case 23:break;case 22:h=t.stateNode,y=t.alternate,t.memoizedState!==null?h._visibility&2?ln(e,t,l,r):sa(e,t):h._visibility&2?ln(e,t,l,r):(h._visibility|=2,ci(e,t,l,r,(t.subtreeFlags&10256)!==0||!1)),o&2048&&hc(y,t);break;case 24:ln(e,t,l,r),o&2048&&dc(t.alternate,t);break;default:ln(e,t,l,r)}}function ci(e,t,l,r,o){for(o=o&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var h=e,y=t,v=l,w=r,N=y.flags;switch(y.tag){case 0:case 11:case 15:ci(h,y,v,w,o),oa(8,y);break;case 23:break;case 22:var Y=y.stateNode;y.memoizedState!==null?Y._visibility&2?ci(h,y,v,w,o):sa(h,y):(Y._visibility|=2,ci(h,y,v,w,o)),o&&N&2048&&hc(y.alternate,y);break;case 24:ci(h,y,v,w,o),o&&N&2048&&dc(y.alternate,y);break;default:ci(h,y,v,w,o)}t=t.sibling}}function sa(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var l=e,r=t,o=r.flags;switch(r.tag){case 22:sa(l,r),o&2048&&hc(r.alternate,r);break;case 24:sa(l,r),o&2048&&dc(r.alternate,r);break;default:sa(l,r)}t=t.sibling}}var fa=8192;function si(e,t,l){if(e.subtreeFlags&fa)for(e=e.child;e!==null;)Xd(e,t,l),e=e.sibling}function Xd(e,t,l){switch(e.tag){case 26:si(e,t,l),e.flags&fa&&e.memoizedState!==null&&Z0(l,nn,e.memoizedState,e.memoizedProps);break;case 5:si(e,t,l);break;case 3:case 4:var r=nn;nn=Pr(e.stateNode.containerInfo),si(e,t,l),nn=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=fa,fa=16777216,si(e,t,l),fa=r):si(e,t,l));break;default:si(e,t,l)}}function Qd(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function ha(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var l=0;l<t.length;l++){var r=t[l];ot=r,Zd(r,e)}Qd(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Fd(e),e=e.sibling}function Fd(e){switch(e.tag){case 0:case 11:case 15:ha(e),e.flags&2048&&Wn(9,e,e.return);break;case 3:ha(e);break;case 12:ha(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,qr(e)):ha(e);break;default:ha(e)}}function qr(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var l=0;l<t.length;l++){var r=t[l];ot=r,Zd(r,e)}Qd(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Wn(8,t,t.return),qr(t);break;case 22:l=t.stateNode,l._visibility&2&&(l._visibility&=-3,qr(t));break;default:qr(t)}e=e.sibling}}function Zd(e,t){for(;ot!==null;){var l=ot;switch(l.tag){case 0:case 11:case 15:Wn(8,l,t);break;case 23:case 22:if(l.memoizedState!==null&&l.memoizedState.cachePool!==null){var r=l.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Ki(l.memoizedState.cache)}if(r=l.child,r!==null)r.return=l,ot=r;else e:for(l=e;ot!==null;){r=ot;var o=r.sibling,h=r.return;if(Bd(r),r===l){ot=null;break e}if(o!==null){o.return=h,ot=o;break e}ot=h}}}var o0={getCacheForType:function(e){var t=ft(et),l=t.data.get(e);return l===void 0&&(l=e(),t.data.set(e,l)),l},cacheSignal:function(){return ft(et).controller.signal}},c0=typeof WeakMap=="function"?WeakMap:Map,Oe=0,Ve=null,ke=null,Te=0,je=0,Lt=null,$n=!1,fi=!1,mc=!1,On=0,We=0,Pn=0,Dl=0,pc=0,Bt=0,hi=0,da=null,Tt=null,gc=!1,Yr=0,Id=0,Vr=1/0,Gr=null,el=null,rt=0,tl=null,di=null,Nn=0,yc=0,bc=null,Kd=null,ma=0,vc=null;function Ut(){return(Oe&2)!==0&&Te!==0?Te&-Te:L.T!==null?wc():ff()}function Jd(){if(Bt===0)if((Te&536870912)===0||De){var e=Wa;Wa<<=1,(Wa&3932160)===0&&(Wa=262144),Bt=e}else Bt=536870912;return e=Nt.current,e!==null&&(e.flags|=32),Bt}function zt(e,t,l){(e===Ve&&(je===2||je===9)||e.cancelPendingCommit!==null)&&(mi(e,0),nl(e,Te,Bt,!1)),ji(e,l),((Oe&2)===0||e!==Ve)&&(e===Ve&&((Oe&2)===0&&(Dl|=l),We===4&&nl(e,Te,Bt,!1)),sn(e))}function Wd(e,t,l){if((Oe&6)!==0)throw Error(u(327));var r=!l&&(t&127)===0&&(t&e.expiredLanes)===0||Ni(e,t),o=r?h0(e,t):Sc(e,t,!0),h=r;do{if(o===0){fi&&!r&&nl(e,t,0,!1);break}else{if(l=e.current.alternate,h&&!s0(l)){o=Sc(e,t,!1),h=!1;continue}if(o===2){if(h=t,e.errorRecoveryDisabledLanes&h)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){t=y;e:{var v=e;o=da;var w=v.current.memoizedState.isDehydrated;if(w&&(mi(v,y).flags|=256),y=Sc(v,y,!1),y!==2){if(mc&&!w){v.errorRecoveryDisabledLanes|=h,Dl|=h,o=4;break e}h=Tt,Tt=o,h!==null&&(Tt===null?Tt=h:Tt.push.apply(Tt,h))}o=y}if(h=!1,o!==2)continue}}if(o===1){mi(e,0),nl(e,t,0,!0);break}e:{switch(r=e,h=o,h){case 0:case 1:throw Error(u(345));case 4:if((t&4194048)!==t)break;case 6:nl(r,t,Bt,!$n);break e;case 2:Tt=null;break;case 3:case 5:break;default:throw Error(u(329))}if((t&62914560)===t&&(o=Yr+300-yt(),10<o)){if(nl(r,t,Bt,!$n),Pa(r,0,!0)!==0)break e;Nn=t,r.timeoutHandle=zm($d.bind(null,r,l,Tt,Gr,gc,t,Bt,Dl,hi,$n,h,"Throttled",-0,0),o);break e}$d(r,l,Tt,Gr,gc,t,Bt,Dl,hi,$n,h,null,-0,0)}}break}while(!0);sn(e)}function $d(e,t,l,r,o,h,y,v,w,N,Y,Z,j,H){if(e.timeoutHandle=-1,Z=t.subtreeFlags,Z&8192||(Z&16785408)===16785408){Z={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:vn},Xd(t,h,Z);var ie=(h&62914560)===h?Yr-yt():(h&4194048)===h?Id-yt():0;if(ie=I0(Z,ie),ie!==null){Nn=h,e.cancelPendingCommit=ie(rm.bind(null,e,t,h,l,r,o,y,v,w,Y,Z,null,j,H)),nl(e,h,y,!N);return}}rm(e,t,h,l,r,o,y,v,w)}function s0(e){for(var t=e;;){var l=t.tag;if((l===0||l===11||l===15)&&t.flags&16384&&(l=t.updateQueue,l!==null&&(l=l.stores,l!==null)))for(var r=0;r<l.length;r++){var o=l[r],h=o.getSnapshot;o=o.value;try{if(!Mt(h(),o))return!1}catch{return!1}}if(l=t.child,t.subtreeFlags&16384&&l!==null)l.return=t,t=l;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function nl(e,t,l,r){t&=~pc,t&=~Dl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var o=t;0<o;){var h=31-Ye(o),y=1<<h;r[h]=-1,o&=~y}l!==0&&of(e,l,t)}function Xr(){return(Oe&6)===0?(pa(0),!1):!0}function xc(){if(ke!==null){if(je===0)var e=ke.return;else e=ke,kn=xl=null,Lo(e),ii=null,Wi=0,e=ke;for(;e!==null;)Dd(e.alternate,e),e=e.return;ke=null}}function mi(e,t){var l=e.timeoutHandle;l!==-1&&(e.timeoutHandle=-1,R0(l)),l=e.cancelPendingCommit,l!==null&&(e.cancelPendingCommit=null,l()),Nn=0,xc(),Ve=e,ke=l=Sn(e.current,null),Te=t,je=0,Lt=null,$n=!1,fi=Ni(e,t),mc=!1,hi=Bt=pc=Dl=Pn=We=0,Tt=da=null,gc=!1,(t&8)!==0&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var o=31-Ye(r),h=1<<o;t|=e[o],r&=~h}return On=t,fr(),l}function Pd(e,t){ye=null,L.H=aa,t===li||t===vr?(t=ph(),je=3):t===Co?(t=ph(),je=4):je=t===$o?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Lt=t,ke===null&&(We=1,Or(e,Qt(t,e.current)))}function em(){var e=Nt.current;return e===null?!0:(Te&4194048)===Te?Kt===null:(Te&62914560)===Te||(Te&536870912)!==0?e===Kt:!1}function tm(){var e=L.H;return L.H=aa,e===null?aa:e}function nm(){var e=L.A;return L.A=o0,e}function Qr(){We=4,$n||(Te&4194048)!==Te&&Nt.current!==null||(fi=!0),(Pn&134217727)===0&&(Dl&134217727)===0||Ve===null||nl(Ve,Te,Bt,!1)}function Sc(e,t,l){var r=Oe;Oe|=2;var o=tm(),h=nm();(Ve!==e||Te!==t)&&(Gr=null,mi(e,t)),t=!1;var y=We;e:do try{if(je!==0&&ke!==null){var v=ke,w=Lt;switch(je){case 8:xc(),y=6;break e;case 3:case 2:case 9:case 6:Nt.current===null&&(t=!0);var N=je;if(je=0,Lt=null,pi(e,v,w,N),l&&fi){y=0;break e}break;default:N=je,je=0,Lt=null,pi(e,v,w,N)}}f0(),y=We;break}catch(Y){Pd(e,Y)}while(!0);return t&&e.shellSuspendCounter++,kn=xl=null,Oe=r,L.H=o,L.A=h,ke===null&&(Ve=null,Te=0,fr()),y}function f0(){for(;ke!==null;)lm(ke)}function h0(e,t){var l=Oe;Oe|=2;var r=tm(),o=nm();Ve!==e||Te!==t?(Gr=null,Vr=yt()+500,mi(e,t)):fi=Ni(e,t);e:do try{if(je!==0&&ke!==null){t=ke;var h=Lt;t:switch(je){case 1:je=0,Lt=null,pi(e,t,h,1);break;case 2:case 9:if(dh(h)){je=0,Lt=null,im(t);break}t=function(){je!==2&&je!==9||Ve!==e||(je=7),sn(e)},h.then(t,t);break e;case 3:je=7;break e;case 4:je=5;break e;case 7:dh(h)?(je=0,Lt=null,im(t)):(je=0,Lt=null,pi(e,t,h,7));break;case 5:var y=null;switch(ke.tag){case 26:y=ke.memoizedState;case 5:case 27:var v=ke;if(y?Gm(y):v.stateNode.complete){je=0,Lt=null;var w=v.sibling;if(w!==null)ke=w;else{var N=v.return;N!==null?(ke=N,Fr(N)):ke=null}break t}}je=0,Lt=null,pi(e,t,h,5);break;case 6:je=0,Lt=null,pi(e,t,h,6);break;case 8:xc(),We=6;break e;default:throw Error(u(462))}}d0();break}catch(Y){Pd(e,Y)}while(!0);return kn=xl=null,L.H=r,L.A=o,Oe=l,ke!==null?0:(Ve=null,Te=0,fr(),We)}function d0(){for(;ke!==null&&!Ou();)lm(ke)}function lm(e){var t=Td(e.alternate,e,On);e.memoizedProps=e.pendingProps,t===null?Fr(e):ke=t}function im(e){var t=e,l=t.alternate;switch(t.tag){case 15:case 0:t=Sd(l,t,t.pendingProps,t.type,void 0,Te);break;case 11:t=Sd(l,t,t.pendingProps,t.type.render,t.ref,Te);break;case 5:Lo(t);default:Dd(l,t),t=ke=nh(t,On),t=Td(l,t,On)}e.memoizedProps=e.pendingProps,t===null?Fr(e):ke=t}function pi(e,t,l,r){kn=xl=null,Lo(t),ii=null,Wi=0;var o=t.return;try{if(t0(e,o,t,l,Te)){We=1,Or(e,Qt(l,e.current)),ke=null;return}}catch(h){if(o!==null)throw ke=o,h;We=1,Or(e,Qt(l,e.current)),ke=null;return}t.flags&32768?(De||r===1?e=!0:fi||(Te&536870912)!==0?e=!1:($n=e=!0,(r===2||r===9||r===3||r===6)&&(r=Nt.current,r!==null&&r.tag===13&&(r.flags|=16384))),am(t,e)):Fr(t)}function Fr(e){var t=e;do{if((t.flags&32768)!==0){am(t,$n);return}e=t.return;var l=i0(t.alternate,t,On);if(l!==null){ke=l;return}if(t=t.sibling,t!==null){ke=t;return}ke=t=e}while(t!==null);We===0&&(We=5)}function am(e,t){do{var l=a0(e.alternate,e);if(l!==null){l.flags&=32767,ke=l;return}if(l=e.return,l!==null&&(l.flags|=32768,l.subtreeFlags=0,l.deletions=null),!t&&(e=e.sibling,e!==null)){ke=e;return}ke=e=l}while(e!==null);We=6,ke=null}function rm(e,t,l,r,o,h,y,v,w){e.cancelPendingCommit=null;do Zr();while(rt!==0);if((Oe&6)!==0)throw Error(u(327));if(t!==null){if(t===e.current)throw Error(u(177));if(h=t.lanes|t.childLanes,h|=oo,Fy(e,l,h,y,v,w),e===Ve&&(ke=Ve=null,Te=0),di=t,tl=e,Nn=l,yc=h,bc=o,Kd=r,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,y0(pe,function(){return fm(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||r){r=L.T,L.T=null,o=I.p,I.p=2,y=Oe,Oe|=4;try{r0(e,t,l)}finally{Oe=y,I.p=o,L.T=r}}rt=1,um(),om(),cm()}}function um(){if(rt===1){rt=0;var e=tl,t=di,l=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||l){l=L.T,L.T=null;var r=I.p;I.p=2;var o=Oe;Oe|=4;try{Yd(t,e);var h=Oc,y=Zf(e.containerInfo),v=h.focusedElem,w=h.selectionRange;if(y!==v&&v&&v.ownerDocument&&Ff(v.ownerDocument.documentElement,v)){if(w!==null&&lo(v)){var N=w.start,Y=w.end;if(Y===void 0&&(Y=N),"selectionStart"in v)v.selectionStart=N,v.selectionEnd=Math.min(Y,v.value.length);else{var Z=v.ownerDocument||document,j=Z&&Z.defaultView||window;if(j.getSelection){var H=j.getSelection(),ie=v.textContent.length,he=Math.min(w.start,ie),qe=w.end===void 0?he:Math.min(w.end,ie);!H.extend&&he>qe&&(y=qe,qe=he,he=y);var _=Qf(v,he),z=Qf(v,qe);if(_&&z&&(H.rangeCount!==1||H.anchorNode!==_.node||H.anchorOffset!==_.offset||H.focusNode!==z.node||H.focusOffset!==z.offset)){var O=Z.createRange();O.setStart(_.node,_.offset),H.removeAllRanges(),he>qe?(H.addRange(O),H.extend(z.node,z.offset)):(O.setEnd(z.node,z.offset),H.addRange(O))}}}}for(Z=[],H=v;H=H.parentNode;)H.nodeType===1&&Z.push({element:H,left:H.scrollLeft,top:H.scrollTop});for(typeof v.focus=="function"&&v.focus(),v=0;v<Z.length;v++){var F=Z[v];F.element.scrollLeft=F.left,F.element.scrollTop=F.top}}au=!!Mc,Oc=Mc=null}finally{Oe=o,I.p=r,L.T=l}}e.current=t,rt=2}}function om(){if(rt===2){rt=0;var e=tl,t=di,l=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||l){l=L.T,L.T=null;var r=I.p;I.p=2;var o=Oe;Oe|=4;try{Ld(e,t.alternate,t)}finally{Oe=o,I.p=r,L.T=l}}rt=3}}function cm(){if(rt===4||rt===3){rt=0,Nu();var e=tl,t=di,l=Nn,r=Kd;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?rt=5:(rt=0,di=tl=null,sm(e,e.pendingLanes));var o=e.pendingLanes;if(o===0&&(el=null),Uu(l),t=t.stateNode,at&&typeof at.onCommitFiberRoot=="function")try{at.onCommitFiberRoot(bt,t,void 0,(t.current.flags&128)===128)}catch{}if(r!==null){t=L.T,o=I.p,I.p=2,L.T=null;try{for(var h=e.onRecoverableError,y=0;y<r.length;y++){var v=r[y];h(v.value,{componentStack:v.stack})}}finally{L.T=t,I.p=o}}(Nn&3)!==0&&Zr(),sn(e),o=e.pendingLanes,(l&261930)!==0&&(o&42)!==0?e===vc?ma++:(ma=0,vc=e):ma=0,pa(0)}}function sm(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Ki(t)))}function Zr(){return um(),om(),cm(),fm()}function fm(){if(rt!==5)return!1;var e=tl,t=yc;yc=0;var l=Uu(Nn),r=L.T,o=I.p;try{I.p=32>l?32:l,L.T=null,l=bc,bc=null;var h=tl,y=Nn;if(rt=0,di=tl=null,Nn=0,(Oe&6)!==0)throw Error(u(331));var v=Oe;if(Oe|=4,Fd(h.current),Gd(h,h.current,y,l),Oe=v,pa(0,!1),at&&typeof at.onPostCommitFiberRoot=="function")try{at.onPostCommitFiberRoot(bt,h)}catch{}return!0}finally{I.p=o,L.T=r,sm(e,t)}}function hm(e,t,l){t=Qt(l,t),t=Wo(e.stateNode,t,2),e=In(e,t,2),e!==null&&(ji(e,2),sn(e))}function Le(e,t,l){if(e.tag===3)hm(e,e,l);else for(;t!==null;){if(t.tag===3){hm(t,e,l);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(el===null||!el.has(r))){e=Qt(l,e),l=dd(2),r=In(t,l,2),r!==null&&(md(l,r,t,e),ji(r,2),sn(r));break}}t=t.return}}function Ec(e,t,l){var r=e.pingCache;if(r===null){r=e.pingCache=new c0;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(l)||(mc=!0,o.add(l),e=m0.bind(null,e,t,l),t.then(e,e))}function m0(e,t,l){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&l,e.warmLanes&=~l,Ve===e&&(Te&l)===l&&(We===4||We===3&&(Te&62914560)===Te&&300>yt()-Yr?(Oe&2)===0&&mi(e,0):pc|=l,hi===Te&&(hi=0)),sn(e)}function dm(e,t){t===0&&(t=uf()),e=yl(e,t),e!==null&&(ji(e,t),sn(e))}function p0(e){var t=e.memoizedState,l=0;t!==null&&(l=t.retryLane),dm(e,l)}function g0(e,t){var l=0;switch(e.tag){case 31:case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(l=o.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(u(314))}r!==null&&r.delete(t),dm(e,l)}function y0(e,t){return Ll(e,t)}var Ir=null,gi=null,kc=!1,Kr=!1,Cc=!1,ll=0;function sn(e){e!==gi&&e.next===null&&(gi===null?Ir=gi=e:gi=gi.next=e),Kr=!0,kc||(kc=!0,v0())}function pa(e,t){if(!Cc&&Kr){Cc=!0;do for(var l=!1,r=Ir;r!==null;){if(e!==0){var o=r.pendingLanes;if(o===0)var h=0;else{var y=r.suspendedLanes,v=r.pingedLanes;h=(1<<31-Ye(42|e)+1)-1,h&=o&~(y&~v),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(l=!0,ym(r,h))}else h=Te,h=Pa(r,r===Ve?h:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(h&3)===0||Ni(r,h)||(l=!0,ym(r,h));r=r.next}while(l);Cc=!1}}function b0(){mm()}function mm(){Kr=kc=!1;var e=0;ll!==0&&D0()&&(e=ll);for(var t=yt(),l=null,r=Ir;r!==null;){var o=r.next,h=pm(r,t);h===0?(r.next=null,l===null?Ir=o:l.next=o,o===null&&(gi=l)):(l=r,(e!==0||(h&3)!==0)&&(Kr=!0)),r=o}rt!==0&&rt!==5||pa(e),ll!==0&&(ll=0)}function pm(e,t){for(var l=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var y=31-Ye(h),v=1<<y,w=o[y];w===-1?((v&l)===0||(v&r)!==0)&&(o[y]=Qy(v,t)):w<=t&&(e.expiredLanes|=v),h&=~v}if(t=Ve,l=Te,l=Pa(e,e===t?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,l===0||e===t&&(je===2||je===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Oi(r),e.callbackNode=null,e.callbackPriority=0;if((l&3)===0||Ni(e,l)){if(t=l&-l,t===e.callbackPriority)return t;switch(r!==null&&Oi(r),Uu(l)){case 2:case 8:l=W;break;case 32:l=pe;break;case 268435456:l=Ne;break;default:l=pe}return r=gm.bind(null,e),l=Ll(l,r),e.callbackPriority=t,e.callbackNode=l,t}return r!==null&&r!==null&&Oi(r),e.callbackPriority=2,e.callbackNode=null,2}function gm(e,t){if(rt!==0&&rt!==5)return e.callbackNode=null,e.callbackPriority=0,null;var l=e.callbackNode;if(Zr()&&e.callbackNode!==l)return null;var r=Te;return r=Pa(e,e===Ve?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Wd(e,r,t),pm(e,yt()),e.callbackNode!=null&&e.callbackNode===l?gm.bind(null,e):null)}function ym(e,t){if(Zr())return null;Wd(e,t,!0)}function v0(){_0(function(){(Oe&6)!==0?Ll(Q,b0):mm()})}function wc(){if(ll===0){var e=ti;e===0&&(e=Ja,Ja<<=1,(Ja&261888)===0&&(Ja=256)),ll=e}return ll}function bm(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:lr(""+e)}function vm(e,t){var l=t.ownerDocument.createElement("input");return l.name=t.name,l.value=t.value,e.id&&l.setAttribute("form",e.id),t.parentNode.insertBefore(l,t),e=new FormData(e),l.parentNode.removeChild(l),e}function x0(e,t,l,r,o){if(t==="submit"&&l&&l.stateNode===o){var h=bm((o[Et]||null).action),y=r.submitter;y&&(t=(t=y[Et]||null)?bm(t.formAction):y.getAttribute("formAction"),t!==null&&(h=t,y=null));var v=new ur("action","action",null,r,o);e.push({event:v,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(ll!==0){var w=y?vm(o,y):new FormData(o);Qo(l,{pending:!0,data:w,method:o.method,action:h},null,w)}}else typeof h=="function"&&(v.preventDefault(),w=y?vm(o,y):new FormData(o),Qo(l,{pending:!0,data:w,method:o.method,action:h},h,w))},currentTarget:o}]})}}for(var Ac=0;Ac<uo.length;Ac++){var Tc=uo[Ac],S0=Tc.toLowerCase(),E0=Tc[0].toUpperCase()+Tc.slice(1);tn(S0,"on"+E0)}tn(Jf,"onAnimationEnd"),tn(Wf,"onAnimationIteration"),tn($f,"onAnimationStart"),tn("dblclick","onDoubleClick"),tn("focusin","onFocus"),tn("focusout","onBlur"),tn(U1,"onTransitionRun"),tn(H1,"onTransitionStart"),tn(q1,"onTransitionCancel"),tn(Pf,"onTransitionEnd"),Yl("onMouseEnter",["mouseout","mouseover"]),Yl("onMouseLeave",["mouseout","mouseover"]),Yl("onPointerEnter",["pointerout","pointerover"]),Yl("onPointerLeave",["pointerout","pointerover"]),dl("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),dl("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),dl("onBeforeInput",["compositionend","keypress","textInput","paste"]),dl("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),dl("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),dl("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ga="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),k0=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ga));function xm(e,t){t=(t&4)!==0;for(var l=0;l<e.length;l++){var r=e[l],o=r.event;r=r.listeners;e:{var h=void 0;if(t)for(var y=r.length-1;0<=y;y--){var v=r[y],w=v.instance,N=v.currentTarget;if(v=v.listener,w!==h&&o.isPropagationStopped())break e;h=v,o.currentTarget=N;try{h(o)}catch(Y){sr(Y)}o.currentTarget=null,h=w}else for(y=0;y<r.length;y++){if(v=r[y],w=v.instance,N=v.currentTarget,v=v.listener,w!==h&&o.isPropagationStopped())break e;h=v,o.currentTarget=N;try{h(o)}catch(Y){sr(Y)}o.currentTarget=null,h=w}}}}function Ce(e,t){var l=t[Hu];l===void 0&&(l=t[Hu]=new Set);var r=e+"__bubble";l.has(r)||(Sm(t,e,2,!1),l.add(r))}function zc(e,t,l){var r=0;t&&(r|=4),Sm(l,e,r,t)}var Jr="_reactListening"+Math.random().toString(36).slice(2);function Dc(e){if(!e[Jr]){e[Jr]=!0,mf.forEach(function(l){l!=="selectionchange"&&(k0.has(l)||zc(l,!1,e),zc(l,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Jr]||(t[Jr]=!0,zc("selectionchange",!1,t))}}function Sm(e,t,l,r){switch(Jm(t)){case 2:var o=W0;break;case 8:o=$0;break;default:o=Xc}l=o.bind(null,t,l,e),o=void 0,!Iu||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,l,{capture:!0,passive:o}):e.addEventListener(t,l,!0):o!==void 0?e.addEventListener(t,l,{passive:o}):e.addEventListener(t,l,!1)}function Rc(e,t,l,r,o){var h=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var y=r.tag;if(y===3||y===4){var v=r.stateNode.containerInfo;if(v===o)break;if(y===4)for(y=r.return;y!==null;){var w=y.tag;if((w===3||w===4)&&y.stateNode.containerInfo===o)return;y=y.return}for(;v!==null;){if(y=Ul(v),y===null)return;if(w=y.tag,w===5||w===6||w===26||w===27){r=h=y;continue e}v=v.parentNode}}r=r.return}Af(function(){var N=h,Y=Fu(l),Z=[];e:{var j=eh.get(e);if(j!==void 0){var H=ur,ie=e;switch(e){case"keypress":if(ar(l)===0)break e;case"keydown":case"keyup":H=g1;break;case"focusin":ie="focus",H=$u;break;case"focusout":ie="blur",H=$u;break;case"beforeblur":case"afterblur":H=$u;break;case"click":if(l.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":H=Df;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":H=i1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":H=v1;break;case Jf:case Wf:case $f:H=u1;break;case Pf:H=S1;break;case"scroll":case"scrollend":H=n1;break;case"wheel":H=k1;break;case"copy":case"cut":case"paste":H=c1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":H=_f;break;case"toggle":case"beforetoggle":H=w1}var he=(t&4)!==0,qe=!he&&(e==="scroll"||e==="scrollend"),_=he?j!==null?j+"Capture":null:j;he=[];for(var z=N,O;z!==null;){var F=z;if(O=F.stateNode,F=F.tag,F!==5&&F!==26&&F!==27||O===null||_===null||(F=Ui(z,_),F!=null&&he.push(ya(z,F,O))),qe)break;z=z.return}0<he.length&&(j=new H(j,ie,null,l,Y),Z.push({event:j,listeners:he}))}}if((t&7)===0){e:{if(j=e==="mouseover"||e==="pointerover",H=e==="mouseout"||e==="pointerout",j&&l!==Qu&&(ie=l.relatedTarget||l.fromElement)&&(Ul(ie)||ie[Bl]))break e;if((H||j)&&(j=Y.window===Y?Y:(j=Y.ownerDocument)?j.defaultView||j.parentWindow:window,H?(ie=l.relatedTarget||l.toElement,H=N,ie=ie?Ul(ie):null,ie!==null&&(qe=s(ie),he=ie.tag,ie!==qe||he!==5&&he!==27&&he!==6)&&(ie=null)):(H=null,ie=N),H!==ie)){if(he=Df,F="onMouseLeave",_="onMouseEnter",z="mouse",(e==="pointerout"||e==="pointerover")&&(he=_f,F="onPointerLeave",_="onPointerEnter",z="pointer"),qe=H==null?j:Bi(H),O=ie==null?j:Bi(ie),j=new he(F,z+"leave",H,l,Y),j.target=qe,j.relatedTarget=O,F=null,Ul(Y)===N&&(he=new he(_,z+"enter",ie,l,Y),he.target=O,he.relatedTarget=qe,F=he),qe=F,H&&ie)t:{for(he=C0,_=H,z=ie,O=0,F=_;F;F=he(F))O++;F=0;for(var ce=z;ce;ce=he(ce))F++;for(;0<O-F;)_=he(_),O--;for(;0<F-O;)z=he(z),F--;for(;O--;){if(_===z||z!==null&&_===z.alternate){he=_;break t}_=he(_),z=he(z)}he=null}else he=null;H!==null&&Em(Z,j,H,he,!1),ie!==null&&qe!==null&&Em(Z,qe,ie,he,!0)}}e:{if(j=N?Bi(N):window,H=j.nodeName&&j.nodeName.toLowerCase(),H==="select"||H==="input"&&j.type==="file")var _e=Hf;else if(Bf(j))if(qf)_e=j1;else{_e=O1;var re=M1}else H=j.nodeName,!H||H.toLowerCase()!=="input"||j.type!=="checkbox"&&j.type!=="radio"?N&&Xu(N.elementType)&&(_e=Hf):_e=N1;if(_e&&(_e=_e(e,N))){Uf(Z,_e,l,Y);break e}re&&re(e,j,N),e==="focusout"&&N&&j.type==="number"&&N.memoizedProps.value!=null&&Gu(j,"number",j.value)}switch(re=N?Bi(N):window,e){case"focusin":(Bf(re)||re.contentEditable==="true")&&(Zl=re,io=N,Fi=null);break;case"focusout":Fi=io=Zl=null;break;case"mousedown":ao=!0;break;case"contextmenu":case"mouseup":case"dragend":ao=!1,If(Z,l,Y);break;case"selectionchange":if(B1)break;case"keydown":case"keyup":If(Z,l,Y)}var be;if(eo)e:{switch(e){case"compositionstart":var ze="onCompositionStart";break e;case"compositionend":ze="onCompositionEnd";break e;case"compositionupdate":ze="onCompositionUpdate";break e}ze=void 0}else Fl?jf(e,l)&&(ze="onCompositionEnd"):e==="keydown"&&l.keyCode===229&&(ze="onCompositionStart");ze&&(Mf&&l.locale!=="ko"&&(Fl||ze!=="onCompositionStart"?ze==="onCompositionEnd"&&Fl&&(be=Tf()):(Yn=Y,Ku="value"in Yn?Yn.value:Yn.textContent,Fl=!0)),re=Wr(N,ze),0<re.length&&(ze=new Rf(ze,e,null,l,Y),Z.push({event:ze,listeners:re}),be?ze.data=be:(be=Lf(l),be!==null&&(ze.data=be)))),(be=T1?z1(e,l):D1(e,l))&&(ze=Wr(N,"onBeforeInput"),0<ze.length&&(re=new Rf("onBeforeInput","beforeinput",null,l,Y),Z.push({event:re,listeners:ze}),re.data=be)),x0(Z,e,N,l,Y)}xm(Z,t)})}function ya(e,t,l){return{instance:e,listener:t,currentTarget:l}}function Wr(e,t){for(var l=t+"Capture",r=[];e!==null;){var o=e,h=o.stateNode;if(o=o.tag,o!==5&&o!==26&&o!==27||h===null||(o=Ui(e,l),o!=null&&r.unshift(ya(e,o,h)),o=Ui(e,t),o!=null&&r.push(ya(e,o,h))),e.tag===3)return r;e=e.return}return[]}function C0(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Em(e,t,l,r,o){for(var h=t._reactName,y=[];l!==null&&l!==r;){var v=l,w=v.alternate,N=v.stateNode;if(v=v.tag,w!==null&&w===r)break;v!==5&&v!==26&&v!==27||N===null||(w=N,o?(N=Ui(l,h),N!=null&&y.unshift(ya(l,N,w))):o||(N=Ui(l,h),N!=null&&y.push(ya(l,N,w)))),l=l.return}y.length!==0&&e.push({event:t,listeners:y})}var w0=/\r\n?/g,A0=/\u0000|\uFFFD/g;function km(e){return(typeof e=="string"?e:""+e).replace(w0,`
`).replace(A0,"")}function Cm(e,t){return t=km(t),km(e)===t}function He(e,t,l,r,o,h){switch(l){case"children":typeof r=="string"?t==="body"||t==="textarea"&&r===""||Gl(e,r):(typeof r=="number"||typeof r=="bigint")&&t!=="body"&&Gl(e,""+r);break;case"className":tr(e,"class",r);break;case"tabIndex":tr(e,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":tr(e,l,r);break;case"style":Cf(e,r,h);break;case"data":if(t!=="object"){tr(e,"data",r);break}case"src":case"href":if(r===""&&(t!=="a"||l!=="href")){e.removeAttribute(l);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(l);break}r=lr(""+r),e.setAttribute(l,r);break;case"action":case"formAction":if(typeof r=="function"){e.setAttribute(l,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(l==="formAction"?(t!=="input"&&He(e,t,"name",o.name,o,null),He(e,t,"formEncType",o.formEncType,o,null),He(e,t,"formMethod",o.formMethod,o,null),He(e,t,"formTarget",o.formTarget,o,null)):(He(e,t,"encType",o.encType,o,null),He(e,t,"method",o.method,o,null),He(e,t,"target",o.target,o,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(l);break}r=lr(""+r),e.setAttribute(l,r);break;case"onClick":r!=null&&(e.onclick=vn);break;case"onScroll":r!=null&&Ce("scroll",e);break;case"onScrollEnd":r!=null&&Ce("scrollend",e);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(u(61));if(l=r.__html,l!=null){if(o.children!=null)throw Error(u(60));e.innerHTML=l}}break;case"multiple":e.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":e.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){e.removeAttribute("xlink:href");break}l=lr(""+r),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",l);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(l,""+r):e.removeAttribute(l);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(l,""):e.removeAttribute(l);break;case"capture":case"download":r===!0?e.setAttribute(l,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(l,r):e.removeAttribute(l);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?e.setAttribute(l,r):e.removeAttribute(l);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?e.removeAttribute(l):e.setAttribute(l,r);break;case"popover":Ce("beforetoggle",e),Ce("toggle",e),er(e,"popover",r);break;case"xlinkActuate":bn(e,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":bn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":bn(e,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":bn(e,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":bn(e,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":bn(e,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":bn(e,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":bn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":bn(e,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":er(e,"is",r);break;case"innerText":case"textContent":break;default:(!(2<l.length)||l[0]!=="o"&&l[0]!=="O"||l[1]!=="n"&&l[1]!=="N")&&(l=e1.get(l)||l,er(e,l,r))}}function _c(e,t,l,r,o,h){switch(l){case"style":Cf(e,r,h);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(u(61));if(l=r.__html,l!=null){if(o.children!=null)throw Error(u(60));e.innerHTML=l}}break;case"children":typeof r=="string"?Gl(e,r):(typeof r=="number"||typeof r=="bigint")&&Gl(e,""+r);break;case"onScroll":r!=null&&Ce("scroll",e);break;case"onScrollEnd":r!=null&&Ce("scrollend",e);break;case"onClick":r!=null&&(e.onclick=vn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!pf.hasOwnProperty(l))e:{if(l[0]==="o"&&l[1]==="n"&&(o=l.endsWith("Capture"),t=l.slice(2,o?l.length-7:void 0),h=e[Et]||null,h=h!=null?h[l]:null,typeof h=="function"&&e.removeEventListener(t,h,o),typeof r=="function")){typeof h!="function"&&h!==null&&(l in e?e[l]=null:e.hasAttribute(l)&&e.removeAttribute(l)),e.addEventListener(t,r,o);break e}l in e?e[l]=r:r===!0?e.setAttribute(l,""):er(e,l,r)}}}function dt(e,t,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Ce("error",e),Ce("load",e);var r=!1,o=!1,h;for(h in l)if(l.hasOwnProperty(h)){var y=l[h];if(y!=null)switch(h){case"src":r=!0;break;case"srcSet":o=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(u(137,t));default:He(e,t,h,y,l,null)}}o&&He(e,t,"srcSet",l.srcSet,l,null),r&&He(e,t,"src",l.src,l,null);return;case"input":Ce("invalid",e);var v=h=y=o=null,w=null,N=null;for(r in l)if(l.hasOwnProperty(r)){var Y=l[r];if(Y!=null)switch(r){case"name":o=Y;break;case"type":y=Y;break;case"checked":w=Y;break;case"defaultChecked":N=Y;break;case"value":h=Y;break;case"defaultValue":v=Y;break;case"children":case"dangerouslySetInnerHTML":if(Y!=null)throw Error(u(137,t));break;default:He(e,t,r,Y,l,null)}}xf(e,h,v,w,N,y,o,!1);return;case"select":Ce("invalid",e),r=y=h=null;for(o in l)if(l.hasOwnProperty(o)&&(v=l[o],v!=null))switch(o){case"value":h=v;break;case"defaultValue":y=v;break;case"multiple":r=v;default:He(e,t,o,v,l,null)}t=h,l=y,e.multiple=!!r,t!=null?Vl(e,!!r,t,!1):l!=null&&Vl(e,!!r,l,!0);return;case"textarea":Ce("invalid",e),h=o=r=null;for(y in l)if(l.hasOwnProperty(y)&&(v=l[y],v!=null))switch(y){case"value":r=v;break;case"defaultValue":o=v;break;case"children":h=v;break;case"dangerouslySetInnerHTML":if(v!=null)throw Error(u(91));break;default:He(e,t,y,v,l,null)}Ef(e,r,o,h);return;case"option":for(w in l)l.hasOwnProperty(w)&&(r=l[w],r!=null)&&(w==="selected"?e.selected=r&&typeof r!="function"&&typeof r!="symbol":He(e,t,w,r,l,null));return;case"dialog":Ce("beforetoggle",e),Ce("toggle",e),Ce("cancel",e),Ce("close",e);break;case"iframe":case"object":Ce("load",e);break;case"video":case"audio":for(r=0;r<ga.length;r++)Ce(ga[r],e);break;case"image":Ce("error",e),Ce("load",e);break;case"details":Ce("toggle",e);break;case"embed":case"source":case"link":Ce("error",e),Ce("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(N in l)if(l.hasOwnProperty(N)&&(r=l[N],r!=null))switch(N){case"children":case"dangerouslySetInnerHTML":throw Error(u(137,t));default:He(e,t,N,r,l,null)}return;default:if(Xu(t)){for(Y in l)l.hasOwnProperty(Y)&&(r=l[Y],r!==void 0&&_c(e,t,Y,r,l,void 0));return}}for(v in l)l.hasOwnProperty(v)&&(r=l[v],r!=null&&He(e,t,v,r,l,null))}function T0(e,t,l,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,h=null,y=null,v=null,w=null,N=null,Y=null;for(H in l){var Z=l[H];if(l.hasOwnProperty(H)&&Z!=null)switch(H){case"checked":break;case"value":break;case"defaultValue":w=Z;default:r.hasOwnProperty(H)||He(e,t,H,null,r,Z)}}for(var j in r){var H=r[j];if(Z=l[j],r.hasOwnProperty(j)&&(H!=null||Z!=null))switch(j){case"type":h=H;break;case"name":o=H;break;case"checked":N=H;break;case"defaultChecked":Y=H;break;case"value":y=H;break;case"defaultValue":v=H;break;case"children":case"dangerouslySetInnerHTML":if(H!=null)throw Error(u(137,t));break;default:H!==Z&&He(e,t,j,H,r,Z)}}Vu(e,y,v,w,N,Y,h,o);return;case"select":H=y=v=j=null;for(h in l)if(w=l[h],l.hasOwnProperty(h)&&w!=null)switch(h){case"value":break;case"multiple":H=w;default:r.hasOwnProperty(h)||He(e,t,h,null,r,w)}for(o in r)if(h=r[o],w=l[o],r.hasOwnProperty(o)&&(h!=null||w!=null))switch(o){case"value":j=h;break;case"defaultValue":v=h;break;case"multiple":y=h;default:h!==w&&He(e,t,o,h,r,w)}t=v,l=y,r=H,j!=null?Vl(e,!!l,j,!1):!!r!=!!l&&(t!=null?Vl(e,!!l,t,!0):Vl(e,!!l,l?[]:"",!1));return;case"textarea":H=j=null;for(v in l)if(o=l[v],l.hasOwnProperty(v)&&o!=null&&!r.hasOwnProperty(v))switch(v){case"value":break;case"children":break;default:He(e,t,v,null,r,o)}for(y in r)if(o=r[y],h=l[y],r.hasOwnProperty(y)&&(o!=null||h!=null))switch(y){case"value":j=o;break;case"defaultValue":H=o;break;case"children":break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(u(91));break;default:o!==h&&He(e,t,y,o,r,h)}Sf(e,j,H);return;case"option":for(var ie in l)j=l[ie],l.hasOwnProperty(ie)&&j!=null&&!r.hasOwnProperty(ie)&&(ie==="selected"?e.selected=!1:He(e,t,ie,null,r,j));for(w in r)j=r[w],H=l[w],r.hasOwnProperty(w)&&j!==H&&(j!=null||H!=null)&&(w==="selected"?e.selected=j&&typeof j!="function"&&typeof j!="symbol":He(e,t,w,j,r,H));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var he in l)j=l[he],l.hasOwnProperty(he)&&j!=null&&!r.hasOwnProperty(he)&&He(e,t,he,null,r,j);for(N in r)if(j=r[N],H=l[N],r.hasOwnProperty(N)&&j!==H&&(j!=null||H!=null))switch(N){case"children":case"dangerouslySetInnerHTML":if(j!=null)throw Error(u(137,t));break;default:He(e,t,N,j,r,H)}return;default:if(Xu(t)){for(var qe in l)j=l[qe],l.hasOwnProperty(qe)&&j!==void 0&&!r.hasOwnProperty(qe)&&_c(e,t,qe,void 0,r,j);for(Y in r)j=r[Y],H=l[Y],!r.hasOwnProperty(Y)||j===H||j===void 0&&H===void 0||_c(e,t,Y,j,r,H);return}}for(var _ in l)j=l[_],l.hasOwnProperty(_)&&j!=null&&!r.hasOwnProperty(_)&&He(e,t,_,null,r,j);for(Z in r)j=r[Z],H=l[Z],!r.hasOwnProperty(Z)||j===H||j==null&&H==null||He(e,t,Z,j,r,H)}function wm(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function z0(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,l=performance.getEntriesByType("resource"),r=0;r<l.length;r++){var o=l[r],h=o.transferSize,y=o.initiatorType,v=o.duration;if(h&&v&&wm(y)){for(y=0,v=o.responseEnd,r+=1;r<l.length;r++){var w=l[r],N=w.startTime;if(N>v)break;var Y=w.transferSize,Z=w.initiatorType;Y&&wm(Z)&&(w=w.responseEnd,y+=Y*(w<v?1:(v-N)/(w-N)))}if(--r,t+=8*(h+y)/(o.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Mc=null,Oc=null;function $r(e){return e.nodeType===9?e:e.ownerDocument}function Am(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Tm(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Nc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var jc=null;function D0(){var e=window.event;return e&&e.type==="popstate"?e===jc?!1:(jc=e,!0):(jc=null,!1)}var zm=typeof setTimeout=="function"?setTimeout:void 0,R0=typeof clearTimeout=="function"?clearTimeout:void 0,Dm=typeof Promise=="function"?Promise:void 0,_0=typeof queueMicrotask=="function"?queueMicrotask:typeof Dm<"u"?function(e){return Dm.resolve(null).then(e).catch(M0)}:zm;function M0(e){setTimeout(function(){throw e})}function il(e){return e==="head"}function Rm(e,t){var l=t,r=0;do{var o=l.nextSibling;if(e.removeChild(l),o&&o.nodeType===8)if(l=o.data,l==="/$"||l==="/&"){if(r===0){e.removeChild(o),xi(t);return}r--}else if(l==="$"||l==="$?"||l==="$~"||l==="$!"||l==="&")r++;else if(l==="html")ba(e.ownerDocument.documentElement);else if(l==="head"){l=e.ownerDocument.head,ba(l);for(var h=l.firstChild;h;){var y=h.nextSibling,v=h.nodeName;h[Li]||v==="SCRIPT"||v==="STYLE"||v==="LINK"&&h.rel.toLowerCase()==="stylesheet"||l.removeChild(h),h=y}}else l==="body"&&ba(e.ownerDocument.body);l=o}while(l);xi(t)}function _m(e,t){var l=e;e=0;do{var r=l.nextSibling;if(l.nodeType===1?t?(l._stashedDisplay=l.style.display,l.style.display="none"):(l.style.display=l._stashedDisplay||"",l.getAttribute("style")===""&&l.removeAttribute("style")):l.nodeType===3&&(t?(l._stashedText=l.nodeValue,l.nodeValue=""):l.nodeValue=l._stashedText||""),r&&r.nodeType===8)if(l=r.data,l==="/$"){if(e===0)break;e--}else l!=="$"&&l!=="$?"&&l!=="$~"&&l!=="$!"||e++;l=r}while(l)}function Lc(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var l=t;switch(t=t.nextSibling,l.nodeName){case"HTML":case"HEAD":case"BODY":Lc(l),qu(l);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(l.rel.toLowerCase()==="stylesheet")continue}e.removeChild(l)}}function O0(e,t,l,r){for(;e.nodeType===1;){var o=l;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(r){if(!e[Li])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==o.rel||e.getAttribute("href")!==(o.href==null||o.href===""?null:o.href)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin)||e.getAttribute("title")!==(o.title==null?null:o.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(o.src==null?null:o.src)||e.getAttribute("type")!==(o.type==null?null:o.type)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var h=o.name==null?null:""+o.name;if(o.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=Jt(e.nextSibling),e===null)break}return null}function N0(e,t,l){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!l||(e=Jt(e.nextSibling),e===null))return null;return e}function Mm(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Jt(e.nextSibling),e===null))return null;return e}function Bc(e){return e.data==="$?"||e.data==="$~"}function Uc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function j0(e,t){var l=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||l.readyState!=="loading")t();else{var r=function(){t(),l.removeEventListener("DOMContentLoaded",r)};l.addEventListener("DOMContentLoaded",r),e._reactRetry=r}}function Jt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Hc=null;function Om(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var l=e.data;if(l==="/$"||l==="/&"){if(t===0)return Jt(e.nextSibling);t--}else l!=="$"&&l!=="$!"&&l!=="$?"&&l!=="$~"&&l!=="&"||t++}e=e.nextSibling}return null}function Nm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var l=e.data;if(l==="$"||l==="$!"||l==="$?"||l==="$~"||l==="&"){if(t===0)return e;t--}else l!=="/$"&&l!=="/&"||t++}e=e.previousSibling}return null}function jm(e,t,l){switch(t=$r(l),e){case"html":if(e=t.documentElement,!e)throw Error(u(452));return e;case"head":if(e=t.head,!e)throw Error(u(453));return e;case"body":if(e=t.body,!e)throw Error(u(454));return e;default:throw Error(u(451))}}function ba(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);qu(e)}var Wt=new Map,Lm=new Set;function Pr(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var jn=I.d;I.d={f:L0,r:B0,D:U0,C:H0,L:q0,m:Y0,X:G0,S:V0,M:X0};function L0(){var e=jn.f(),t=Xr();return e||t}function B0(e){var t=Hl(e);t!==null&&t.tag===5&&t.type==="form"?Ph(t):jn.r(e)}var yi=typeof document>"u"?null:document;function Bm(e,t,l){var r=yi;if(r&&typeof t=="string"&&t){var o=Gt(t);o='link[rel="'+e+'"][href="'+o+'"]',typeof l=="string"&&(o+='[crossorigin="'+l+'"]'),Lm.has(o)||(Lm.add(o),e={rel:e,crossOrigin:l,href:t},r.querySelector(o)===null&&(t=r.createElement("link"),dt(t,"link",e),ut(t),r.head.appendChild(t)))}}function U0(e){jn.D(e),Bm("dns-prefetch",e,null)}function H0(e,t){jn.C(e,t),Bm("preconnect",e,t)}function q0(e,t,l){jn.L(e,t,l);var r=yi;if(r&&e&&t){var o='link[rel="preload"][as="'+Gt(t)+'"]';t==="image"&&l&&l.imageSrcSet?(o+='[imagesrcset="'+Gt(l.imageSrcSet)+'"]',typeof l.imageSizes=="string"&&(o+='[imagesizes="'+Gt(l.imageSizes)+'"]')):o+='[href="'+Gt(e)+'"]';var h=o;switch(t){case"style":h=bi(e);break;case"script":h=vi(e)}Wt.has(h)||(e=g({rel:"preload",href:t==="image"&&l&&l.imageSrcSet?void 0:e,as:t},l),Wt.set(h,e),r.querySelector(o)!==null||t==="style"&&r.querySelector(va(h))||t==="script"&&r.querySelector(xa(h))||(t=r.createElement("link"),dt(t,"link",e),ut(t),r.head.appendChild(t)))}}function Y0(e,t){jn.m(e,t);var l=yi;if(l&&e){var r=t&&typeof t.as=="string"?t.as:"script",o='link[rel="modulepreload"][as="'+Gt(r)+'"][href="'+Gt(e)+'"]',h=o;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=vi(e)}if(!Wt.has(h)&&(e=g({rel:"modulepreload",href:e},t),Wt.set(h,e),l.querySelector(o)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(l.querySelector(xa(h)))return}r=l.createElement("link"),dt(r,"link",e),ut(r),l.head.appendChild(r)}}}function V0(e,t,l){jn.S(e,t,l);var r=yi;if(r&&e){var o=ql(r).hoistableStyles,h=bi(e);t=t||"default";var y=o.get(h);if(!y){var v={loading:0,preload:null};if(y=r.querySelector(va(h)))v.loading=5;else{e=g({rel:"stylesheet",href:e,"data-precedence":t},l),(l=Wt.get(h))&&qc(e,l);var w=y=r.createElement("link");ut(w),dt(w,"link",e),w._p=new Promise(function(N,Y){w.onload=N,w.onerror=Y}),w.addEventListener("load",function(){v.loading|=1}),w.addEventListener("error",function(){v.loading|=2}),v.loading|=4,eu(y,t,r)}y={type:"stylesheet",instance:y,count:1,state:v},o.set(h,y)}}}function G0(e,t){jn.X(e,t);var l=yi;if(l&&e){var r=ql(l).hoistableScripts,o=vi(e),h=r.get(o);h||(h=l.querySelector(xa(o)),h||(e=g({src:e,async:!0},t),(t=Wt.get(o))&&Yc(e,t),h=l.createElement("script"),ut(h),dt(h,"link",e),l.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},r.set(o,h))}}function X0(e,t){jn.M(e,t);var l=yi;if(l&&e){var r=ql(l).hoistableScripts,o=vi(e),h=r.get(o);h||(h=l.querySelector(xa(o)),h||(e=g({src:e,async:!0,type:"module"},t),(t=Wt.get(o))&&Yc(e,t),h=l.createElement("script"),ut(h),dt(h,"link",e),l.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},r.set(o,h))}}function Um(e,t,l,r){var o=(o=oe.current)?Pr(o):null;if(!o)throw Error(u(446));switch(e){case"meta":case"title":return null;case"style":return typeof l.precedence=="string"&&typeof l.href=="string"?(t=bi(l.href),l=ql(o).hoistableStyles,r=l.get(t),r||(r={type:"style",instance:null,count:0,state:null},l.set(t,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(l.rel==="stylesheet"&&typeof l.href=="string"&&typeof l.precedence=="string"){e=bi(l.href);var h=ql(o).hoistableStyles,y=h.get(e);if(y||(o=o.ownerDocument||o,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,y),(h=o.querySelector(va(e)))&&!h._p&&(y.instance=h,y.state.loading=5),Wt.has(e)||(l={rel:"preload",as:"style",href:l.href,crossOrigin:l.crossOrigin,integrity:l.integrity,media:l.media,hrefLang:l.hrefLang,referrerPolicy:l.referrerPolicy},Wt.set(e,l),h||Q0(o,e,l,y.state))),t&&r===null)throw Error(u(528,""));return y}if(t&&r!==null)throw Error(u(529,""));return null;case"script":return t=l.async,l=l.src,typeof l=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=vi(l),l=ql(o).hoistableScripts,r=l.get(t),r||(r={type:"script",instance:null,count:0,state:null},l.set(t,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(u(444,e))}}function bi(e){return'href="'+Gt(e)+'"'}function va(e){return'link[rel="stylesheet"]['+e+"]"}function Hm(e){return g({},e,{"data-precedence":e.precedence,precedence:null})}function Q0(e,t,l,r){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?r.loading=1:(t=e.createElement("link"),r.preload=t,t.addEventListener("load",function(){return r.loading|=1}),t.addEventListener("error",function(){return r.loading|=2}),dt(t,"link",l),ut(t),e.head.appendChild(t))}function vi(e){return'[src="'+Gt(e)+'"]'}function xa(e){return"script[async]"+e}function qm(e,t,l){if(t.count++,t.instance===null)switch(t.type){case"style":var r=e.querySelector('style[data-href~="'+Gt(l.href)+'"]');if(r)return t.instance=r,ut(r),r;var o=g({},l,{"data-href":l.href,"data-precedence":l.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement("style"),ut(r),dt(r,"style",o),eu(r,l.precedence,e),t.instance=r;case"stylesheet":o=bi(l.href);var h=e.querySelector(va(o));if(h)return t.state.loading|=4,t.instance=h,ut(h),h;r=Hm(l),(o=Wt.get(o))&&qc(r,o),h=(e.ownerDocument||e).createElement("link"),ut(h);var y=h;return y._p=new Promise(function(v,w){y.onload=v,y.onerror=w}),dt(h,"link",r),t.state.loading|=4,eu(h,l.precedence,e),t.instance=h;case"script":return h=vi(l.src),(o=e.querySelector(xa(h)))?(t.instance=o,ut(o),o):(r=l,(o=Wt.get(h))&&(r=g({},l),Yc(r,o)),e=e.ownerDocument||e,o=e.createElement("script"),ut(o),dt(o,"link",r),e.head.appendChild(o),t.instance=o);case"void":return null;default:throw Error(u(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(r=t.instance,t.state.loading|=4,eu(r,l.precedence,e));return t.instance}function eu(e,t,l){for(var r=l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),o=r.length?r[r.length-1]:null,h=o,y=0;y<r.length;y++){var v=r[y];if(v.dataset.precedence===t)h=v;else if(h!==o)break}h?h.parentNode.insertBefore(e,h.nextSibling):(t=l.nodeType===9?l.head:l,t.insertBefore(e,t.firstChild))}function qc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Yc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var tu=null;function Ym(e,t,l){if(tu===null){var r=new Map,o=tu=new Map;o.set(l,r)}else o=tu,r=o.get(l),r||(r=new Map,o.set(l,r));if(r.has(e))return r;for(r.set(e,null),l=l.getElementsByTagName(e),o=0;o<l.length;o++){var h=l[o];if(!(h[Li]||h[ct]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var y=h.getAttribute(t)||"";y=e+y;var v=r.get(y);v?v.push(h):r.set(y,[h])}}return r}function Vm(e,t,l){e=e.ownerDocument||e,e.head.insertBefore(l,t==="title"?e.querySelector("head > title"):null)}function F0(e,t,l){if(l===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Gm(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Z0(e,t,l,r){if(l.type==="stylesheet"&&(typeof r.media!="string"||matchMedia(r.media).matches!==!1)&&(l.state.loading&4)===0){if(l.instance===null){var o=bi(r.href),h=t.querySelector(va(o));if(h){t=h._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=nu.bind(e),t.then(e,e)),l.state.loading|=4,l.instance=h,ut(h);return}h=t.ownerDocument||t,r=Hm(r),(o=Wt.get(o))&&qc(r,o),h=h.createElement("link"),ut(h);var y=h;y._p=new Promise(function(v,w){y.onload=v,y.onerror=w}),dt(h,"link",r),l.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(l,t),(t=l.state.preload)&&(l.state.loading&3)===0&&(e.count++,l=nu.bind(e),t.addEventListener("load",l),t.addEventListener("error",l))}}var Vc=0;function I0(e,t){return e.stylesheets&&e.count===0&&iu(e,e.stylesheets),0<e.count||0<e.imgCount?function(l){var r=setTimeout(function(){if(e.stylesheets&&iu(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+t);0<e.imgBytes&&Vc===0&&(Vc=62500*z0());var o=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&iu(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>Vc?50:800)+t);return e.unsuspend=l,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(o)}}:null}function nu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)iu(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var lu=null;function iu(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,lu=new Map,t.forEach(K0,e),lu=null,nu.call(e))}function K0(e,t){if(!(t.state.loading&4)){var l=lu.get(e);if(l)var r=l.get(null);else{l=new Map,lu.set(e,l);for(var o=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<o.length;h++){var y=o[h];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(l.set(y.dataset.precedence,y),r=y)}r&&l.set(null,r)}o=t.instance,y=o.getAttribute("data-precedence"),h=l.get(y)||r,h===r&&l.set(null,o),l.set(y,o),this.count++,r=nu.bind(this),o.addEventListener("load",r),o.addEventListener("error",r),h?h.parentNode.insertBefore(o,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(o,e.firstChild)),t.state.loading|=4}}var Sa={$$typeof:U,Provider:null,Consumer:null,_currentValue:ue,_currentValue2:ue,_threadCount:0};function J0(e,t,l,r,o,h,y,v,w){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Lu(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Lu(0),this.hiddenUpdates=Lu(null),this.identifierPrefix=r,this.onUncaughtError=o,this.onCaughtError=h,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=w,this.incompleteTransitions=new Map}function Xm(e,t,l,r,o,h,y,v,w,N,Y,Z){return e=new J0(e,t,l,y,w,N,Y,Z,v),t=1,h===!0&&(t|=24),h=Ot(3,null,null,t),e.current=h,h.stateNode=e,t=So(),t.refCount++,e.pooledCache=t,t.refCount++,h.memoizedState={element:r,isDehydrated:l,cache:t},wo(h),e}function Qm(e){return e?(e=Jl,e):Jl}function Fm(e,t,l,r,o,h){o=Qm(o),r.context===null?r.context=o:r.pendingContext=o,r=Zn(t),r.payload={element:l},h=h===void 0?null:h,h!==null&&(r.callback=h),l=In(e,r,t),l!==null&&(zt(l,e,t),Pi(l,e,t))}function Zm(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var l=e.retryLane;e.retryLane=l!==0&&l<t?l:t}}function Gc(e,t){Zm(e,t),(e=e.alternate)&&Zm(e,t)}function Im(e){if(e.tag===13||e.tag===31){var t=yl(e,67108864);t!==null&&zt(t,e,67108864),Gc(e,67108864)}}function Km(e){if(e.tag===13||e.tag===31){var t=Ut();t=Bu(t);var l=yl(e,t);l!==null&&zt(l,e,t),Gc(e,t)}}var au=!0;function W0(e,t,l,r){var o=L.T;L.T=null;var h=I.p;try{I.p=2,Xc(e,t,l,r)}finally{I.p=h,L.T=o}}function $0(e,t,l,r){var o=L.T;L.T=null;var h=I.p;try{I.p=8,Xc(e,t,l,r)}finally{I.p=h,L.T=o}}function Xc(e,t,l,r){if(au){var o=Qc(r);if(o===null)Rc(e,t,r,ru,l),Wm(e,r);else if(eb(o,e,t,l,r))r.stopPropagation();else if(Wm(e,r),t&4&&-1<P0.indexOf(e)){for(;o!==null;){var h=Hl(o);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var y=hl(h.pendingLanes);if(y!==0){var v=h;for(v.pendingLanes|=2,v.entangledLanes|=2;y;){var w=1<<31-Ye(y);v.entanglements[1]|=w,y&=~w}sn(h),(Oe&6)===0&&(Vr=yt()+500,pa(0))}}break;case 31:case 13:v=yl(h,2),v!==null&&zt(v,h,2),Xr(),Gc(h,2)}if(h=Qc(r),h===null&&Rc(e,t,r,ru,l),h===o)break;o=h}o!==null&&r.stopPropagation()}else Rc(e,t,r,null,l)}}function Qc(e){return e=Fu(e),Fc(e)}var ru=null;function Fc(e){if(ru=null,e=Ul(e),e!==null){var t=s(e);if(t===null)e=null;else{var l=t.tag;if(l===13){if(e=f(t),e!==null)return e;e=null}else if(l===31){if(e=m(t),e!==null)return e;e=null}else if(l===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return ru=e,null}function Jm(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(ju()){case Q:return 2;case W:return 8;case pe:case Ee:return 32;case Ne:return 268435456;default:return 32}default:return 32}}var Zc=!1,al=null,rl=null,ul=null,Ea=new Map,ka=new Map,ol=[],P0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Wm(e,t){switch(e){case"focusin":case"focusout":al=null;break;case"dragenter":case"dragleave":rl=null;break;case"mouseover":case"mouseout":ul=null;break;case"pointerover":case"pointerout":Ea.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ka.delete(t.pointerId)}}function Ca(e,t,l,r,o,h){return e===null||e.nativeEvent!==h?(e={blockedOn:t,domEventName:l,eventSystemFlags:r,nativeEvent:h,targetContainers:[o]},t!==null&&(t=Hl(t),t!==null&&Im(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function eb(e,t,l,r,o){switch(t){case"focusin":return al=Ca(al,e,t,l,r,o),!0;case"dragenter":return rl=Ca(rl,e,t,l,r,o),!0;case"mouseover":return ul=Ca(ul,e,t,l,r,o),!0;case"pointerover":var h=o.pointerId;return Ea.set(h,Ca(Ea.get(h)||null,e,t,l,r,o)),!0;case"gotpointercapture":return h=o.pointerId,ka.set(h,Ca(ka.get(h)||null,e,t,l,r,o)),!0}return!1}function $m(e){var t=Ul(e.target);if(t!==null){var l=s(t);if(l!==null){if(t=l.tag,t===13){if(t=f(l),t!==null){e.blockedOn=t,hf(e.priority,function(){Km(l)});return}}else if(t===31){if(t=m(l),t!==null){e.blockedOn=t,hf(e.priority,function(){Km(l)});return}}else if(t===3&&l.stateNode.current.memoizedState.isDehydrated){e.blockedOn=l.tag===3?l.stateNode.containerInfo:null;return}}}e.blockedOn=null}function uu(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var l=Qc(e.nativeEvent);if(l===null){l=e.nativeEvent;var r=new l.constructor(l.type,l);Qu=r,l.target.dispatchEvent(r),Qu=null}else return t=Hl(l),t!==null&&Im(t),e.blockedOn=l,!1;t.shift()}return!0}function Pm(e,t,l){uu(e)&&l.delete(t)}function tb(){Zc=!1,al!==null&&uu(al)&&(al=null),rl!==null&&uu(rl)&&(rl=null),ul!==null&&uu(ul)&&(ul=null),Ea.forEach(Pm),ka.forEach(Pm)}function ou(e,t){e.blockedOn===t&&(e.blockedOn=null,Zc||(Zc=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,tb)))}var cu=null;function ep(e){cu!==e&&(cu=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){cu===e&&(cu=null);for(var t=0;t<e.length;t+=3){var l=e[t],r=e[t+1],o=e[t+2];if(typeof r!="function"){if(Fc(r||l)===null)continue;break}var h=Hl(l);h!==null&&(e.splice(t,3),t-=3,Qo(h,{pending:!0,data:o,method:l.method,action:r},r,o))}}))}function xi(e){function t(w){return ou(w,e)}al!==null&&ou(al,e),rl!==null&&ou(rl,e),ul!==null&&ou(ul,e),Ea.forEach(t),ka.forEach(t);for(var l=0;l<ol.length;l++){var r=ol[l];r.blockedOn===e&&(r.blockedOn=null)}for(;0<ol.length&&(l=ol[0],l.blockedOn===null);)$m(l),l.blockedOn===null&&ol.shift();if(l=(e.ownerDocument||e).$$reactFormReplay,l!=null)for(r=0;r<l.length;r+=3){var o=l[r],h=l[r+1],y=o[Et]||null;if(typeof h=="function")y||ep(l);else if(y){var v=null;if(h&&h.hasAttribute("formAction")){if(o=h,y=h[Et]||null)v=y.formAction;else if(Fc(o)!==null)continue}else v=y.action;typeof v=="function"?l[r+1]=v:(l.splice(r,3),r-=3),ep(l)}}}function tp(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(y){return o=y})},focusReset:"manual",scroll:"manual"})}function t(){o!==null&&(o(),o=null),r||setTimeout(l,20)}function l(){if(!r&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var r=!1,o=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(l,100),function(){r=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),o!==null&&(o(),o=null)}}}function Ic(e){this._internalRoot=e}su.prototype.render=Ic.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(u(409));var l=t.current,r=Ut();Fm(l,r,e,t,null,null)},su.prototype.unmount=Ic.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Fm(e.current,2,null,e,null,null),Xr(),t[Bl]=null}};function su(e){this._internalRoot=e}su.prototype.unstable_scheduleHydration=function(e){if(e){var t=ff();e={blockedOn:null,target:e,priority:t};for(var l=0;l<ol.length&&t!==0&&t<ol[l].priority;l++);ol.splice(l,0,e),l===0&&$m(e)}};var np=i.version;if(np!=="19.2.4")throw Error(u(527,np,"19.2.4"));I.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(u(188)):(e=Object.keys(e).join(","),Error(u(268,e)));return e=d(t),e=e!==null?b(e):null,e=e===null?null:e.stateNode,e};var nb={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:L,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var fu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!fu.isDisabled&&fu.supportsFiber)try{bt=fu.inject(nb),at=fu}catch{}}return Aa.createRoot=function(e,t){if(!c(e))throw Error(u(299));var l=!1,r="",o=cd,h=sd,y=fd;return t!=null&&(t.unstable_strictMode===!0&&(l=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(h=t.onCaughtError),t.onRecoverableError!==void 0&&(y=t.onRecoverableError)),t=Xm(e,1,!1,null,null,l,r,null,o,h,y,tp),e[Bl]=t.current,Dc(e),new Ic(t)},Aa.hydrateRoot=function(e,t,l){if(!c(e))throw Error(u(299));var r=!1,o="",h=cd,y=sd,v=fd,w=null;return l!=null&&(l.unstable_strictMode===!0&&(r=!0),l.identifierPrefix!==void 0&&(o=l.identifierPrefix),l.onUncaughtError!==void 0&&(h=l.onUncaughtError),l.onCaughtError!==void 0&&(y=l.onCaughtError),l.onRecoverableError!==void 0&&(v=l.onRecoverableError),l.formState!==void 0&&(w=l.formState)),t=Xm(e,1,!0,t,l??null,r,o,w,h,y,v,tp),t.context=Qm(null),l=t.current,r=Ut(),r=Bu(r),o=Zn(r),o.callback=null,In(l,o,r),l=r,t.current.lanes=l,ji(t,l),sn(t),e[Bl]=t.current,Dc(e),new su(t)},Aa.version="19.2.4",Aa}var hp;function hb(){if(hp)return Wc.exports;hp=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(i){console.error(i)}}return n(),Wc.exports=fb(),Wc.exports}var db=hb();var dp="popstate";function mp(n){return typeof n=="object"&&n!=null&&"pathname"in n&&"search"in n&&"hash"in n&&"state"in n&&"key"in n}function mb(n={}){function i(u,c){let s=c.state?.masked,{pathname:f,search:m,hash:p}=s||u.location;return Ss("",{pathname:f,search:m,hash:p},c.state&&c.state.usr||null,c.state&&c.state.key||"default",s?{pathname:u.location.pathname,search:u.location.search,hash:u.location.hash}:void 0)}function a(u,c){return typeof c=="string"?c:La(c)}return gb(i,a,null,n)}function Ke(n,i){if(n===!1||n===null||typeof n>"u")throw new Error(i)}function dn(n,i){if(!n){typeof console<"u"&&console.warn(i);try{throw new Error(i)}catch{}}}function pb(){return Math.random().toString(36).substring(2,10)}function pp(n,i){return{usr:n.state,key:n.key,idx:i,masked:n.unstable_mask?{pathname:n.pathname,search:n.search,hash:n.hash}:void 0}}function Ss(n,i,a=null,u,c){return{pathname:typeof n=="string"?n:n.pathname,search:"",hash:"",...typeof i=="string"?zi(i):i,state:a,key:i&&i.key||u||pb(),unstable_mask:c}}function La({pathname:n="/",search:i="",hash:a=""}){return i&&i!=="?"&&(n+=i.charAt(0)==="?"?i:"?"+i),a&&a!=="#"&&(n+=a.charAt(0)==="#"?a:"#"+a),n}function zi(n){let i={};if(n){let a=n.indexOf("#");a>=0&&(i.hash=n.substring(a),n=n.substring(0,a));let u=n.indexOf("?");u>=0&&(i.search=n.substring(u),n=n.substring(0,u)),n&&(i.pathname=n)}return i}function gb(n,i,a,u={}){let{window:c=document.defaultView,v5Compat:s=!1}=u,f=c.history,m="POP",p=null,d=b();d==null&&(d=0,f.replaceState({...f.state,idx:d},""));function b(){return(f.state||{idx:null}).idx}function g(){m="POP";let R=b(),D=R==null?null:R-d;d=R,p&&p({action:m,location:M.location,delta:D})}function S(R,D){m="PUSH";let G=mp(R)?R:Ss(M.location,R,D);d=b()+1;let U=pp(G,d),ne=M.createHref(G.unstable_mask||G);try{f.pushState(U,"",ne)}catch(le){if(le instanceof DOMException&&le.name==="DataCloneError")throw le;c.location.assign(ne)}s&&p&&p({action:m,location:M.location,delta:1})}function x(R,D){m="REPLACE";let G=mp(R)?R:Ss(M.location,R,D);d=b();let U=pp(G,d),ne=M.createHref(G.unstable_mask||G);f.replaceState(U,"",ne),s&&p&&p({action:m,location:M.location,delta:0})}function A(R){return yb(R)}let M={get action(){return m},get location(){return n(c,f)},listen(R){if(p)throw new Error("A history only accepts one active listener");return c.addEventListener(dp,g),p=R,()=>{c.removeEventListener(dp,g),p=null}},createHref(R){return i(c,R)},createURL:A,encodeLocation(R){let D=A(R);return{pathname:D.pathname,search:D.search,hash:D.hash}},push:S,replace:x,go(R){return f.go(R)}};return M}function yb(n,i=!1){let a="http://localhost";typeof window<"u"&&(a=window.location.origin!=="null"?window.location.origin:window.location.href),Ke(a,"No window.location.(origin|href) available to create URL");let u=typeof n=="string"?n:La(n);return u=u.replace(/ $/,"%20"),!i&&u.startsWith("//")&&(u=a+u),new URL(u,a)}function hg(n,i,a="/"){return bb(n,i,a,!1)}function bb(n,i,a,u){let c=typeof i=="string"?zi(i):i,s=Ln(c.pathname||"/",a);if(s==null)return null;let f=dg(n);vb(f);let m=null;for(let p=0;m==null&&p<f.length;++p){let d=Rb(s);m=zb(f[p],d,u)}return m}function dg(n,i=[],a=[],u="",c=!1){let s=(f,m,p=c,d)=>{let b={relativePath:d===void 0?f.path||"":d,caseSensitive:f.caseSensitive===!0,childrenIndex:m,route:f};if(b.relativePath.startsWith("/")){if(!b.relativePath.startsWith(u)&&p)return;Ke(b.relativePath.startsWith(u),`Absolute route path "${b.relativePath}" nested under path "${u}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),b.relativePath=b.relativePath.slice(u.length)}let g=hn([u,b.relativePath]),S=a.concat(b);f.children&&f.children.length>0&&(Ke(f.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${g}".`),dg(f.children,i,S,g,p)),!(f.path==null&&!f.index)&&i.push({path:g,score:Ab(g,f.index),routesMeta:S})};return n.forEach((f,m)=>{if(f.path===""||!f.path?.includes("?"))s(f,m);else for(let p of mg(f.path))s(f,m,!0,p)}),i}function mg(n){let i=n.split("/");if(i.length===0)return[];let[a,...u]=i,c=a.endsWith("?"),s=a.replace(/\?$/,"");if(u.length===0)return c?[s,""]:[s];let f=mg(u.join("/")),m=[];return m.push(...f.map(p=>p===""?s:[s,p].join("/"))),c&&m.push(...f),m.map(p=>n.startsWith("/")&&p===""?"/":p)}function vb(n){n.sort((i,a)=>i.score!==a.score?a.score-i.score:Tb(i.routesMeta.map(u=>u.childrenIndex),a.routesMeta.map(u=>u.childrenIndex)))}var xb=/^:[\w-]+$/,Sb=3,Eb=2,kb=1,Cb=10,wb=-2,gp=n=>n==="*";function Ab(n,i){let a=n.split("/"),u=a.length;return a.some(gp)&&(u+=wb),i&&(u+=Eb),a.filter(c=>!gp(c)).reduce((c,s)=>c+(xb.test(s)?Sb:s===""?kb:Cb),u)}function Tb(n,i){return n.length===i.length&&n.slice(0,-1).every((u,c)=>u===i[c])?n[n.length-1]-i[i.length-1]:0}function zb(n,i,a=!1){let{routesMeta:u}=n,c={},s="/",f=[];for(let m=0;m<u.length;++m){let p=u[m],d=m===u.length-1,b=s==="/"?i:i.slice(s.length)||"/",g=xu({path:p.relativePath,caseSensitive:p.caseSensitive,end:d},b),S=p.route;if(!g&&d&&a&&!u[u.length-1].route.index&&(g=xu({path:p.relativePath,caseSensitive:p.caseSensitive,end:!1},b)),!g)return null;Object.assign(c,g.params),f.push({params:c,pathname:hn([s,g.pathname]),pathnameBase:Nb(hn([s,g.pathnameBase])),route:S}),g.pathnameBase!=="/"&&(s=hn([s,g.pathnameBase]))}return f}function xu(n,i){typeof n=="string"&&(n={path:n,caseSensitive:!1,end:!0});let[a,u]=Db(n.path,n.caseSensitive,n.end),c=i.match(a);if(!c)return null;let s=c[0],f=s.replace(/(.)\/+$/,"$1"),m=c.slice(1);return{params:u.reduce((d,{paramName:b,isOptional:g},S)=>{if(b==="*"){let A=m[S]||"";f=s.slice(0,s.length-A.length).replace(/(.)\/+$/,"$1")}const x=m[S];return g&&!x?d[b]=void 0:d[b]=(x||"").replace(/%2F/g,"/"),d},{}),pathname:s,pathnameBase:f,pattern:n}}function Db(n,i=!1,a=!0){dn(n==="*"||!n.endsWith("*")||n.endsWith("/*"),`Route path "${n}" will be treated as if it were "${n.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/,"/*")}".`);let u=[],c="^"+n.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(f,m,p,d,b)=>{if(u.push({paramName:m,isOptional:p!=null}),p){let g=b.charAt(d+f.length);return g&&g!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return n.endsWith("*")?(u.push({paramName:"*"}),c+=n==="*"||n==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):a?c+="\\/*$":n!==""&&n!=="/"&&(c+="(?:(?=\\/|$))"),[new RegExp(c,i?void 0:"i"),u]}function Rb(n){try{return n.split("/").map(i=>decodeURIComponent(i).replace(/\//g,"%2F")).join("/")}catch(i){return dn(!1,`The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`),n}}function Ln(n,i){if(i==="/")return n;if(!n.toLowerCase().startsWith(i.toLowerCase()))return null;let a=i.endsWith("/")?i.length-1:i.length,u=n.charAt(a);return u&&u!=="/"?null:n.slice(a)||"/"}var _b=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Mb(n,i="/"){let{pathname:a,search:u="",hash:c=""}=typeof n=="string"?zi(n):n,s;return a?(a=a.replace(/\/\/+/g,"/"),a.startsWith("/")?s=yp(a.substring(1),"/"):s=yp(a,i)):s=i,{pathname:s,search:jb(u),hash:Lb(c)}}function yp(n,i){let a=i.replace(/\/+$/,"").split("/");return n.split("/").forEach(c=>{c===".."?a.length>1&&a.pop():c!=="."&&a.push(c)}),a.length>1?a.join("/"):"/"}function ts(n,i,a,u){return`Cannot include a '${n}' character in a manually specified \`to.${i}\` field [${JSON.stringify(u)}].  Please separate it out to the \`to.${a}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ob(n){return n.filter((i,a)=>a===0||i.route.path&&i.route.path.length>0)}function pg(n){let i=Ob(n);return i.map((a,u)=>u===i.length-1?a.pathname:a.pathnameBase)}function js(n,i,a,u=!1){let c;typeof n=="string"?c=zi(n):(c={...n},Ke(!c.pathname||!c.pathname.includes("?"),ts("?","pathname","search",c)),Ke(!c.pathname||!c.pathname.includes("#"),ts("#","pathname","hash",c)),Ke(!c.search||!c.search.includes("#"),ts("#","search","hash",c)));let s=n===""||c.pathname==="",f=s?"/":c.pathname,m;if(f==null)m=a;else{let g=i.length-1;if(!u&&f.startsWith("..")){let S=f.split("/");for(;S[0]==="..";)S.shift(),g-=1;c.pathname=S.join("/")}m=g>=0?i[g]:"/"}let p=Mb(c,m),d=f&&f!=="/"&&f.endsWith("/"),b=(s||f===".")&&a.endsWith("/");return!p.pathname.endsWith("/")&&(d||b)&&(p.pathname+="/"),p}var hn=n=>n.join("/").replace(/\/\/+/g,"/"),Nb=n=>n.replace(/\/+$/,"").replace(/^\/*/,"/"),jb=n=>!n||n==="?"?"":n.startsWith("?")?n:"?"+n,Lb=n=>!n||n==="#"?"":n.startsWith("#")?n:"#"+n,Bb=class{constructor(n,i,a,u=!1){this.status=n,this.statusText=i||"",this.internal=u,a instanceof Error?(this.data=a.toString(),this.error=a):this.data=a}};function Ub(n){return n!=null&&typeof n.status=="number"&&typeof n.statusText=="string"&&typeof n.internal=="boolean"&&"data"in n}function Hb(n){return n.map(i=>i.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var gg=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function yg(n,i){let a=n;if(typeof a!="string"||!_b.test(a))return{absoluteURL:void 0,isExternal:!1,to:a};let u=a,c=!1;if(gg)try{let s=new URL(window.location.href),f=a.startsWith("//")?new URL(s.protocol+a):new URL(a),m=Ln(f.pathname,i);f.origin===s.origin&&m!=null?a=m+f.search+f.hash:c=!0}catch{dn(!1,`<Link to="${a}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:u,isExternal:c,to:a}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var bg=["POST","PUT","PATCH","DELETE"];new Set(bg);var qb=["GET",...bg];new Set(qb);var Di=V.createContext(null);Di.displayName="DataRouter";var Au=V.createContext(null);Au.displayName="DataRouterState";var Yb=V.createContext(!1),vg=V.createContext({isTransitioning:!1});vg.displayName="ViewTransition";var Vb=V.createContext(new Map);Vb.displayName="Fetchers";var Gb=V.createContext(null);Gb.displayName="Await";var Pt=V.createContext(null);Pt.displayName="Navigation";var qa=V.createContext(null);qa.displayName="Location";var rn=V.createContext({outlet:null,matches:[],isDataRoute:!1});rn.displayName="Route";var Ls=V.createContext(null);Ls.displayName="RouteError";var xg="REACT_ROUTER_ERROR",Xb="REDIRECT",Qb="ROUTE_ERROR_RESPONSE";function Fb(n){if(n.startsWith(`${xg}:${Xb}:{`))try{let i=JSON.parse(n.slice(28));if(typeof i=="object"&&i&&typeof i.status=="number"&&typeof i.statusText=="string"&&typeof i.location=="string"&&typeof i.reloadDocument=="boolean"&&typeof i.replace=="boolean")return i}catch{}}function Zb(n){if(n.startsWith(`${xg}:${Qb}:{`))try{let i=JSON.parse(n.slice(40));if(typeof i=="object"&&i&&typeof i.status=="number"&&typeof i.statusText=="string")return new Bb(i.status,i.statusText,i.data)}catch{}}function Ib(n,{relative:i}={}){Ke(Ya(),"useHref() may be used only in the context of a <Router> component.");let{basename:a,navigator:u}=V.useContext(Pt),{hash:c,pathname:s,search:f}=Va(n,{relative:i}),m=s;return a!=="/"&&(m=s==="/"?a:hn([a,s])),u.createHref({pathname:m,search:f,hash:c})}function Ya(){return V.useContext(qa)!=null}function Bn(){return Ke(Ya(),"useLocation() may be used only in the context of a <Router> component."),V.useContext(qa).location}var Sg="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Eg(n){V.useContext(Pt).static||V.useLayoutEffect(n)}function Bs(){let{isDataRoute:n}=V.useContext(rn);return n?cv():Kb()}function Kb(){Ke(Ya(),"useNavigate() may be used only in the context of a <Router> component.");let n=V.useContext(Di),{basename:i,navigator:a}=V.useContext(Pt),{matches:u}=V.useContext(rn),{pathname:c}=Bn(),s=JSON.stringify(pg(u)),f=V.useRef(!1);return Eg(()=>{f.current=!0}),V.useCallback((p,d={})=>{if(dn(f.current,Sg),!f.current)return;if(typeof p=="number"){a.go(p);return}let b=js(p,JSON.parse(s),c,d.relative==="path");n==null&&i!=="/"&&(b.pathname=b.pathname==="/"?i:hn([i,b.pathname])),(d.replace?a.replace:a.push)(b,d.state,d)},[i,a,s,c,n])}var Jb=V.createContext(null);function Wb(n){let i=V.useContext(rn).outlet;return V.useMemo(()=>i&&V.createElement(Jb.Provider,{value:n},i),[i,n])}function kg(){let{matches:n}=V.useContext(rn),i=n[n.length-1];return i?i.params:{}}function Va(n,{relative:i}={}){let{matches:a}=V.useContext(rn),{pathname:u}=Bn(),c=JSON.stringify(pg(a));return V.useMemo(()=>js(n,JSON.parse(c),u,i==="path"),[n,c,u,i])}function $b(n,i){return Cg(n,i)}function Cg(n,i,a){Ke(Ya(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:u}=V.useContext(Pt),{matches:c}=V.useContext(rn),s=c[c.length-1],f=s?s.params:{},m=s?s.pathname:"/",p=s?s.pathnameBase:"/",d=s&&s.route;{let R=d&&d.path||"";Ag(m,!d||R.endsWith("*")||R.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${R}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${R}"> to <Route path="${R==="/"?"*":`${R}/*`}">.`)}let b=Bn(),g;if(i){let R=typeof i=="string"?zi(i):i;Ke(p==="/"||R.pathname?.startsWith(p),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${R.pathname}" was given in the \`location\` prop.`),g=R}else g=b;let S=g.pathname||"/",x=S;if(p!=="/"){let R=p.replace(/^\//,"").split("/");x="/"+S.replace(/^\//,"").split("/").slice(R.length).join("/")}let A=hg(n,{pathname:x});dn(d||A!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),dn(A==null||A[A.length-1].route.element!==void 0||A[A.length-1].route.Component!==void 0||A[A.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let M=lv(A&&A.map(R=>Object.assign({},R,{params:Object.assign({},f,R.params),pathname:hn([p,u.encodeLocation?u.encodeLocation(R.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:R.pathname]),pathnameBase:R.pathnameBase==="/"?p:hn([p,u.encodeLocation?u.encodeLocation(R.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:R.pathnameBase])})),c,a);return i&&M?V.createElement(qa.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...g},navigationType:"POP"}},M):M}function Pb(){let n=ov(),i=Ub(n)?`${n.status} ${n.statusText}`:n instanceof Error?n.message:JSON.stringify(n),a=n instanceof Error?n.stack:null,u="rgba(200,200,200, 0.5)",c={padding:"0.5rem",backgroundColor:u},s={padding:"2px 4px",backgroundColor:u},f=null;return console.error("Error handled by React Router default ErrorBoundary:",n),f=V.createElement(V.Fragment,null,V.createElement("p",null,"💿 Hey developer 👋"),V.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",V.createElement("code",{style:s},"ErrorBoundary")," or"," ",V.createElement("code",{style:s},"errorElement")," prop on your route.")),V.createElement(V.Fragment,null,V.createElement("h2",null,"Unexpected Application Error!"),V.createElement("h3",{style:{fontStyle:"italic"}},i),a?V.createElement("pre",{style:c},a):null,f)}var ev=V.createElement(Pb,null),wg=class extends V.Component{constructor(n){super(n),this.state={location:n.location,revalidation:n.revalidation,error:n.error}}static getDerivedStateFromError(n){return{error:n}}static getDerivedStateFromProps(n,i){return i.location!==n.location||i.revalidation!=="idle"&&n.revalidation==="idle"?{error:n.error,location:n.location,revalidation:n.revalidation}:{error:n.error!==void 0?n.error:i.error,location:i.location,revalidation:n.revalidation||i.revalidation}}componentDidCatch(n,i){this.props.onError?this.props.onError(n,i):console.error("React Router caught the following error during render",n)}render(){let n=this.state.error;if(this.context&&typeof n=="object"&&n&&"digest"in n&&typeof n.digest=="string"){const a=Zb(n.digest);a&&(n=a)}let i=n!==void 0?V.createElement(rn.Provider,{value:this.props.routeContext},V.createElement(Ls.Provider,{value:n,children:this.props.component})):this.props.children;return this.context?V.createElement(tv,{error:n},i):i}};wg.contextType=Yb;var ns=new WeakMap;function tv({children:n,error:i}){let{basename:a}=V.useContext(Pt);if(typeof i=="object"&&i&&"digest"in i&&typeof i.digest=="string"){let u=Fb(i.digest);if(u){let c=ns.get(i);if(c)throw c;let s=yg(u.location,a);if(gg&&!ns.get(i))if(s.isExternal||u.reloadDocument)window.location.href=s.absoluteURL||s.to;else{const f=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(s.to,{replace:u.replace}));throw ns.set(i,f),f}return V.createElement("meta",{httpEquiv:"refresh",content:`0;url=${s.absoluteURL||s.to}`})}}return n}function nv({routeContext:n,match:i,children:a}){let u=V.useContext(Di);return u&&u.static&&u.staticContext&&(i.route.errorElement||i.route.ErrorBoundary)&&(u.staticContext._deepestRenderedBoundaryId=i.route.id),V.createElement(rn.Provider,{value:n},a)}function lv(n,i=[],a){let u=a?.state;if(n==null){if(!u)return null;if(u.errors)n=u.matches;else if(i.length===0&&!u.initialized&&u.matches.length>0)n=u.matches;else return null}let c=n,s=u?.errors;if(s!=null){let b=c.findIndex(g=>g.route.id&&s?.[g.route.id]!==void 0);Ke(b>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),c=c.slice(0,Math.min(c.length,b+1))}let f=!1,m=-1;if(a&&u){f=u.renderFallback;for(let b=0;b<c.length;b++){let g=c[b];if((g.route.HydrateFallback||g.route.hydrateFallbackElement)&&(m=b),g.route.id){let{loaderData:S,errors:x}=u,A=g.route.loader&&!S.hasOwnProperty(g.route.id)&&(!x||x[g.route.id]===void 0);if(g.route.lazy||A){a.isStatic&&(f=!0),m>=0?c=c.slice(0,m+1):c=[c[0]];break}}}}let p=a?.onError,d=u&&p?(b,g)=>{p(b,{location:u.location,params:u.matches?.[0]?.params??{},unstable_pattern:Hb(u.matches),errorInfo:g})}:void 0;return c.reduceRight((b,g,S)=>{let x,A=!1,M=null,R=null;u&&(x=s&&g.route.id?s[g.route.id]:void 0,M=g.route.errorElement||ev,f&&(m<0&&S===0?(Ag("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),A=!0,R=null):m===S&&(A=!0,R=g.route.hydrateFallbackElement||null)));let D=i.concat(c.slice(0,S+1)),G=()=>{let U;return x?U=M:A?U=R:g.route.Component?U=V.createElement(g.route.Component,null):g.route.element?U=g.route.element:U=b,V.createElement(nv,{match:g,routeContext:{outlet:b,matches:D,isDataRoute:u!=null},children:U})};return u&&(g.route.ErrorBoundary||g.route.errorElement||S===0)?V.createElement(wg,{location:u.location,revalidation:u.revalidation,component:M,error:x,children:G(),routeContext:{outlet:null,matches:D,isDataRoute:!0},onError:d}):G()},null)}function Us(n){return`${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function iv(n){let i=V.useContext(Di);return Ke(i,Us(n)),i}function av(n){let i=V.useContext(Au);return Ke(i,Us(n)),i}function rv(n){let i=V.useContext(rn);return Ke(i,Us(n)),i}function Hs(n){let i=rv(n),a=i.matches[i.matches.length-1];return Ke(a.route.id,`${n} can only be used on routes that contain a unique "id"`),a.route.id}function uv(){return Hs("useRouteId")}function ov(){let n=V.useContext(Ls),i=av("useRouteError"),a=Hs("useRouteError");return n!==void 0?n:i.errors?.[a]}function cv(){let{router:n}=iv("useNavigate"),i=Hs("useNavigate"),a=V.useRef(!1);return Eg(()=>{a.current=!0}),V.useCallback(async(c,s={})=>{dn(a.current,Sg),a.current&&(typeof c=="number"?await n.navigate(c):await n.navigate(c,{fromRouteId:i,...s}))},[n,i])}var bp={};function Ag(n,i,a){!i&&!bp[n]&&(bp[n]=!0,dn(!1,a))}V.memo(sv);function sv({routes:n,future:i,state:a,isStatic:u,onError:c}){return Cg(n,void 0,{state:a,isStatic:u,onError:c})}function fv(n){return Wb(n.context)}function ki(n){Ke(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function hv({basename:n="/",children:i=null,location:a,navigationType:u="POP",navigator:c,static:s=!1,unstable_useTransitions:f}){Ke(!Ya(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let m=n.replace(/^\/*/,"/"),p=V.useMemo(()=>({basename:m,navigator:c,static:s,unstable_useTransitions:f,future:{}}),[m,c,s,f]);typeof a=="string"&&(a=zi(a));let{pathname:d="/",search:b="",hash:g="",state:S=null,key:x="default",unstable_mask:A}=a,M=V.useMemo(()=>{let R=Ln(d,m);return R==null?null:{location:{pathname:R,search:b,hash:g,state:S,key:x,unstable_mask:A},navigationType:u}},[m,d,b,g,S,x,u,A]);return dn(M!=null,`<Router basename="${m}"> is not able to match the URL "${d}${b}${g}" because it does not start with the basename, so the <Router> won't render anything.`),M==null?null:V.createElement(Pt.Provider,{value:p},V.createElement(qa.Provider,{children:i,value:M}))}function dv({children:n,location:i}){return $b(Es(n),i)}function Es(n,i=[]){let a=[];return V.Children.forEach(n,(u,c)=>{if(!V.isValidElement(u))return;let s=[...i,c];if(u.type===V.Fragment){a.push.apply(a,Es(u.props.children,s));return}Ke(u.type===ki,`[${typeof u.type=="string"?u.type:u.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Ke(!u.props.index||!u.props.children,"An index route cannot have child routes.");let f={id:u.props.id||s.join("-"),caseSensitive:u.props.caseSensitive,element:u.props.element,Component:u.props.Component,index:u.props.index,path:u.props.path,middleware:u.props.middleware,loader:u.props.loader,action:u.props.action,hydrateFallbackElement:u.props.hydrateFallbackElement,HydrateFallback:u.props.HydrateFallback,errorElement:u.props.errorElement,ErrorBoundary:u.props.ErrorBoundary,hasErrorBoundary:u.props.hasErrorBoundary===!0||u.props.ErrorBoundary!=null||u.props.errorElement!=null,shouldRevalidate:u.props.shouldRevalidate,handle:u.props.handle,lazy:u.props.lazy};u.props.children&&(f.children=Es(u.props.children,s)),a.push(f)}),a}var yu="get",bu="application/x-www-form-urlencoded";function Tu(n){return typeof HTMLElement<"u"&&n instanceof HTMLElement}function mv(n){return Tu(n)&&n.tagName.toLowerCase()==="button"}function pv(n){return Tu(n)&&n.tagName.toLowerCase()==="form"}function gv(n){return Tu(n)&&n.tagName.toLowerCase()==="input"}function yv(n){return!!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)}function bv(n,i){return n.button===0&&(!i||i==="_self")&&!yv(n)}var hu=null;function vv(){if(hu===null)try{new FormData(document.createElement("form"),0),hu=!1}catch{hu=!0}return hu}var xv=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function ls(n){return n!=null&&!xv.has(n)?(dn(!1,`"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${bu}"`),null):n}function Sv(n,i){let a,u,c,s,f;if(pv(n)){let m=n.getAttribute("action");u=m?Ln(m,i):null,a=n.getAttribute("method")||yu,c=ls(n.getAttribute("enctype"))||bu,s=new FormData(n)}else if(mv(n)||gv(n)&&(n.type==="submit"||n.type==="image")){let m=n.form;if(m==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let p=n.getAttribute("formaction")||m.getAttribute("action");if(u=p?Ln(p,i):null,a=n.getAttribute("formmethod")||m.getAttribute("method")||yu,c=ls(n.getAttribute("formenctype"))||ls(m.getAttribute("enctype"))||bu,s=new FormData(m,n),!vv()){let{name:d,type:b,value:g}=n;if(b==="image"){let S=d?`${d}.`:"";s.append(`${S}x`,"0"),s.append(`${S}y`,"0")}else d&&s.append(d,g)}}else{if(Tu(n))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');a=yu,u=null,c=bu,f=n}return s&&c==="text/plain"&&(f=s,s=void 0),{action:u,method:a.toLowerCase(),encType:c,formData:s,body:f}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function qs(n,i){if(n===!1||n===null||typeof n>"u")throw new Error(i)}function Ev(n,i,a,u){let c=typeof n=="string"?new URL(n,typeof window>"u"?"server://singlefetch/":window.location.origin):n;return a?c.pathname.endsWith("/")?c.pathname=`${c.pathname}_.${u}`:c.pathname=`${c.pathname}.${u}`:c.pathname==="/"?c.pathname=`_root.${u}`:i&&Ln(c.pathname,i)==="/"?c.pathname=`${i.replace(/\/$/,"")}/_root.${u}`:c.pathname=`${c.pathname.replace(/\/$/,"")}.${u}`,c}async function kv(n,i){if(n.id in i)return i[n.id];try{let a=await import(n.module);return i[n.id]=a,a}catch(a){return console.error(`Error loading route module \`${n.module}\`, reloading page...`),console.error(a),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Cv(n){return n==null?!1:n.href==null?n.rel==="preload"&&typeof n.imageSrcSet=="string"&&typeof n.imageSizes=="string":typeof n.rel=="string"&&typeof n.href=="string"}async function wv(n,i,a){let u=await Promise.all(n.map(async c=>{let s=i.routes[c.route.id];if(s){let f=await kv(s,a);return f.links?f.links():[]}return[]}));return Dv(u.flat(1).filter(Cv).filter(c=>c.rel==="stylesheet"||c.rel==="preload").map(c=>c.rel==="stylesheet"?{...c,rel:"prefetch",as:"style"}:{...c,rel:"prefetch"}))}function vp(n,i,a,u,c,s){let f=(p,d)=>a[d]?p.route.id!==a[d].route.id:!0,m=(p,d)=>a[d].pathname!==p.pathname||a[d].route.path?.endsWith("*")&&a[d].params["*"]!==p.params["*"];return s==="assets"?i.filter((p,d)=>f(p,d)||m(p,d)):s==="data"?i.filter((p,d)=>{let b=u.routes[p.route.id];if(!b||!b.hasLoader)return!1;if(f(p,d)||m(p,d))return!0;if(p.route.shouldRevalidate){let g=p.route.shouldRevalidate({currentUrl:new URL(c.pathname+c.search+c.hash,window.origin),currentParams:a[0]?.params||{},nextUrl:new URL(n,window.origin),nextParams:p.params,defaultShouldRevalidate:!0});if(typeof g=="boolean")return g}return!0}):[]}function Av(n,i,{includeHydrateFallback:a}={}){return Tv(n.map(u=>{let c=i.routes[u.route.id];if(!c)return[];let s=[c.module];return c.clientActionModule&&(s=s.concat(c.clientActionModule)),c.clientLoaderModule&&(s=s.concat(c.clientLoaderModule)),a&&c.hydrateFallbackModule&&(s=s.concat(c.hydrateFallbackModule)),c.imports&&(s=s.concat(c.imports)),s}).flat(1))}function Tv(n){return[...new Set(n)]}function zv(n){let i={},a=Object.keys(n).sort();for(let u of a)i[u]=n[u];return i}function Dv(n,i){let a=new Set;return new Set(i),n.reduce((u,c)=>{let s=JSON.stringify(zv(c));return a.has(s)||(a.add(s),u.push({key:s,link:c})),u},[])}function Tg(){let n=V.useContext(Di);return qs(n,"You must render this element inside a <DataRouterContext.Provider> element"),n}function Rv(){let n=V.useContext(Au);return qs(n,"You must render this element inside a <DataRouterStateContext.Provider> element"),n}var Ys=V.createContext(void 0);Ys.displayName="FrameworkContext";function zg(){let n=V.useContext(Ys);return qs(n,"You must render this element inside a <HydratedRouter> element"),n}function _v(n,i){let a=V.useContext(Ys),[u,c]=V.useState(!1),[s,f]=V.useState(!1),{onFocus:m,onBlur:p,onMouseEnter:d,onMouseLeave:b,onTouchStart:g}=i,S=V.useRef(null);V.useEffect(()=>{if(n==="render"&&f(!0),n==="viewport"){let M=D=>{D.forEach(G=>{f(G.isIntersecting)})},R=new IntersectionObserver(M,{threshold:.5});return S.current&&R.observe(S.current),()=>{R.disconnect()}}},[n]),V.useEffect(()=>{if(u){let M=setTimeout(()=>{f(!0)},100);return()=>{clearTimeout(M)}}},[u]);let x=()=>{c(!0)},A=()=>{c(!1),f(!1)};return a?n!=="intent"?[s,S,{}]:[s,S,{onFocus:Ta(m,x),onBlur:Ta(p,A),onMouseEnter:Ta(d,x),onMouseLeave:Ta(b,A),onTouchStart:Ta(g,x)}]:[!1,S,{}]}function Ta(n,i){return a=>{n&&n(a),a.defaultPrevented||i(a)}}function Mv({page:n,...i}){let{router:a}=Tg(),u=V.useMemo(()=>hg(a.routes,n,a.basename),[a.routes,n,a.basename]);return u?V.createElement(Nv,{page:n,matches:u,...i}):null}function Ov(n){let{manifest:i,routeModules:a}=zg(),[u,c]=V.useState([]);return V.useEffect(()=>{let s=!1;return wv(n,i,a).then(f=>{s||c(f)}),()=>{s=!0}},[n,i,a]),u}function Nv({page:n,matches:i,...a}){let u=Bn(),{future:c,manifest:s,routeModules:f}=zg(),{basename:m}=Tg(),{loaderData:p,matches:d}=Rv(),b=V.useMemo(()=>vp(n,i,d,s,u,"data"),[n,i,d,s,u]),g=V.useMemo(()=>vp(n,i,d,s,u,"assets"),[n,i,d,s,u]),S=V.useMemo(()=>{if(n===u.pathname+u.search+u.hash)return[];let M=new Set,R=!1;if(i.forEach(G=>{let U=s.routes[G.route.id];!U||!U.hasLoader||(!b.some(ne=>ne.route.id===G.route.id)&&G.route.id in p&&f[G.route.id]?.shouldRevalidate||U.hasClientLoader?R=!0:M.add(G.route.id))}),M.size===0)return[];let D=Ev(n,m,c.unstable_trailingSlashAwareDataRequests,"data");return R&&M.size>0&&D.searchParams.set("_routes",i.filter(G=>M.has(G.route.id)).map(G=>G.route.id).join(",")),[D.pathname+D.search]},[m,c.unstable_trailingSlashAwareDataRequests,p,u,s,b,i,n,f]),x=V.useMemo(()=>Av(g,s),[g,s]),A=Ov(g);return V.createElement(V.Fragment,null,S.map(M=>V.createElement("link",{key:M,rel:"prefetch",as:"fetch",href:M,...a})),x.map(M=>V.createElement("link",{key:M,rel:"modulepreload",href:M,...a})),A.map(({key:M,link:R})=>V.createElement("link",{key:M,nonce:a.nonce,...R,crossOrigin:R.crossOrigin??a.crossOrigin})))}function jv(...n){return i=>{n.forEach(a=>{typeof a=="function"?a(i):a!=null&&(a.current=i)})}}var Lv=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Lv&&(window.__reactRouterVersion="7.13.1")}catch{}function Bv({basename:n,children:i,unstable_useTransitions:a,window:u}){let c=V.useRef();c.current==null&&(c.current=mb({window:u,v5Compat:!0}));let s=c.current,[f,m]=V.useState({action:s.action,location:s.location}),p=V.useCallback(d=>{a===!1?m(d):V.startTransition(()=>m(d))},[a]);return V.useLayoutEffect(()=>s.listen(p),[s,p]),V.createElement(hv,{basename:n,children:i,location:f.location,navigationType:f.action,navigator:s,unstable_useTransitions:a})}var Dg=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ai=V.forwardRef(function({onClick:i,discover:a="render",prefetch:u="none",relative:c,reloadDocument:s,replace:f,unstable_mask:m,state:p,target:d,to:b,preventScrollReset:g,viewTransition:S,unstable_defaultShouldRevalidate:x,...A},M){let{basename:R,navigator:D,unstable_useTransitions:G}=V.useContext(Pt),U=typeof b=="string"&&Dg.test(b),ne=yg(b,R);b=ne.to;let le=Ib(b,{relative:c}),q=Bn(),$=null;if(m){let K=js(m,[],q.unstable_mask?q.unstable_mask.pathname:"/",!0);R!=="/"&&(K.pathname=K.pathname==="/"?R:hn([R,K.pathname])),$=D.createHref(K)}let[se,me,B]=_v(u,A),te=Yv(b,{replace:f,unstable_mask:m,state:p,target:d,preventScrollReset:g,relative:c,viewTransition:S,unstable_defaultShouldRevalidate:x,unstable_useTransitions:G});function ee(K){i&&i(K),K.defaultPrevented||te(K)}let xe=!(ne.isExternal||s),ae=V.createElement("a",{...A,...B,href:(xe?$:void 0)||ne.absoluteURL||le,onClick:xe?ee:i,ref:jv(M,me),target:d,"data-discover":!U&&a==="render"?"true":void 0});return se&&!U?V.createElement(V.Fragment,null,ae,V.createElement(Mv,{page:le})):ae});Ai.displayName="Link";var Uv=V.forwardRef(function({"aria-current":i="page",caseSensitive:a=!1,className:u="",end:c=!1,style:s,to:f,viewTransition:m,children:p,...d},b){let g=Va(f,{relative:d.relative}),S=Bn(),x=V.useContext(Au),{navigator:A,basename:M}=V.useContext(Pt),R=x!=null&&Fv(g)&&m===!0,D=A.encodeLocation?A.encodeLocation(g).pathname:g.pathname,G=S.pathname,U=x&&x.navigation&&x.navigation.location?x.navigation.location.pathname:null;a||(G=G.toLowerCase(),U=U?U.toLowerCase():null,D=D.toLowerCase()),U&&M&&(U=Ln(U,M)||U);const ne=D!=="/"&&D.endsWith("/")?D.length-1:D.length;let le=G===D||!c&&G.startsWith(D)&&G.charAt(ne)==="/",q=U!=null&&(U===D||!c&&U.startsWith(D)&&U.charAt(D.length)==="/"),$={isActive:le,isPending:q,isTransitioning:R},se=le?i:void 0,me;typeof u=="function"?me=u($):me=[u,le?"active":null,q?"pending":null,R?"transitioning":null].filter(Boolean).join(" ");let B=typeof s=="function"?s($):s;return V.createElement(Ai,{...d,"aria-current":se,className:me,ref:b,style:B,to:f,viewTransition:m},typeof p=="function"?p($):p)});Uv.displayName="NavLink";var Hv=V.forwardRef(({discover:n="render",fetcherKey:i,navigate:a,reloadDocument:u,replace:c,state:s,method:f=yu,action:m,onSubmit:p,relative:d,preventScrollReset:b,viewTransition:g,unstable_defaultShouldRevalidate:S,...x},A)=>{let{unstable_useTransitions:M}=V.useContext(Pt),R=Xv(),D=Qv(m,{relative:d}),G=f.toLowerCase()==="get"?"get":"post",U=typeof m=="string"&&Dg.test(m),ne=le=>{if(p&&p(le),le.defaultPrevented)return;le.preventDefault();let q=le.nativeEvent.submitter,$=q?.getAttribute("formmethod")||f,se=()=>R(q||le.currentTarget,{fetcherKey:i,method:$,navigate:a,replace:c,state:s,relative:d,preventScrollReset:b,viewTransition:g,unstable_defaultShouldRevalidate:S});M&&a!==!1?V.startTransition(()=>se()):se()};return V.createElement("form",{ref:A,method:G,action:D,onSubmit:u?p:ne,...x,"data-discover":!U&&n==="render"?"true":void 0})});Hv.displayName="Form";function qv(n){return`${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Rg(n){let i=V.useContext(Di);return Ke(i,qv(n)),i}function Yv(n,{target:i,replace:a,unstable_mask:u,state:c,preventScrollReset:s,relative:f,viewTransition:m,unstable_defaultShouldRevalidate:p,unstable_useTransitions:d}={}){let b=Bs(),g=Bn(),S=Va(n,{relative:f});return V.useCallback(x=>{if(bv(x,i)){x.preventDefault();let A=a!==void 0?a:La(g)===La(S),M=()=>b(n,{replace:A,unstable_mask:u,state:c,preventScrollReset:s,relative:f,viewTransition:m,unstable_defaultShouldRevalidate:p});d?V.startTransition(()=>M()):M()}},[g,b,S,a,u,c,i,n,s,f,m,p,d])}var Vv=0,Gv=()=>`__${String(++Vv)}__`;function Xv(){let{router:n}=Rg("useSubmit"),{basename:i}=V.useContext(Pt),a=uv(),u=n.fetch,c=n.navigate;return V.useCallback(async(s,f={})=>{let{action:m,method:p,encType:d,formData:b,body:g}=Sv(s,i);if(f.navigate===!1){let S=f.fetcherKey||Gv();await u(S,a,f.action||m,{unstable_defaultShouldRevalidate:f.unstable_defaultShouldRevalidate,preventScrollReset:f.preventScrollReset,formData:b,body:g,formMethod:f.method||p,formEncType:f.encType||d,flushSync:f.flushSync})}else await c(f.action||m,{unstable_defaultShouldRevalidate:f.unstable_defaultShouldRevalidate,preventScrollReset:f.preventScrollReset,formData:b,body:g,formMethod:f.method||p,formEncType:f.encType||d,replace:f.replace,state:f.state,fromRouteId:a,flushSync:f.flushSync,viewTransition:f.viewTransition})},[u,c,i,a])}function Qv(n,{relative:i}={}){let{basename:a}=V.useContext(Pt),u=V.useContext(rn);Ke(u,"useFormAction must be used inside a RouteContext");let[c]=u.matches.slice(-1),s={...Va(n||".",{relative:i})},f=Bn();if(n==null){s.search=f.search;let m=new URLSearchParams(s.search),p=m.getAll("index");if(p.some(b=>b==="")){m.delete("index"),p.filter(g=>g).forEach(g=>m.append("index",g));let b=m.toString();s.search=b?`?${b}`:""}}return(!n||n===".")&&c.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),a!=="/"&&(s.pathname=s.pathname==="/"?a:hn([a,s.pathname])),La(s)}function Fv(n,{relative:i}={}){let a=V.useContext(vg);Ke(a!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:u}=Rg("useViewTransitionState"),c=Va(n,{relative:i});if(!a.isTransitioning)return!1;let s=Ln(a.currentLocation.pathname,u)||a.currentLocation.pathname,f=Ln(a.nextLocation.pathname,u)||a.nextLocation.pathname;return xu(c.pathname,f)!=null||xu(c.pathname,s)!=null}const Zv=`---
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
`,Iv=`---
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
`,Kv=`---
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
`,Jv=`---
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
`,Wv=`---
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
`,$v=`---
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
`,Pv=`---
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
`,e2=`---
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
`;function _g(n){const i=n.trim();return i.startsWith('"')&&i.endsWith('"')||i.startsWith("'")&&i.endsWith("'")?i.slice(1,-1).replace(/\\"/g,'"').replace(/\\'/g,"'").replace(/\\\\/g,"\\"):i}function t2(n){const i=n.trim();if(!i.startsWith("[")||!i.endsWith("]"))return[];const a=i.slice(1,-1).trim();return a?a.split(",").map(u=>_g(u)).filter(Boolean):[]}function n2(n){if(!n.startsWith(`---
`))return{frontmatter:{},content:n};const i=n.indexOf(`
---
`,4);if(i===-1)return{frontmatter:{},content:n};const a=n.slice(4,i),u=n.slice(i+5),c={};for(const s of a.split(`
`)){if(!s.trim())continue;const f=s.indexOf(":");if(f===-1)continue;const m=s.slice(0,f).trim(),p=s.slice(f+1).trim();if(m==="tags"){c.tags=t2(p);continue}if(m==="published"){c.published=p.toLowerCase()==="true";continue}const d=_g(p);m==="id"?c.id=d:m==="title"?c.title=d:m==="description"?c.description=d:m==="date"?c.date=d:m==="category"&&(c.category=d)}return{frontmatter:c,content:u}}function xp(n){const i=new Date(n.replace(" ","T")).getTime();return Number.isNaN(i)?0:i}const l2=Object.assign({"../content/posts/blog-post-management-guide.md":Zv,"../content/posts/future-of-web3-audit.md":Iv,"../content/posts/md-writing-template-guide.md":Kv,"../content/posts/profile-customization-guide.md":Jv,"../content/posts/solidity-concepts-1.md":Wv,"../content/posts/solidity-concepts-2.md":$v,"../content/posts/solidity-concepts-3.md":Pv,"../content/posts/solidity-concepts-4.md":e2}),Ba=Object.entries(l2).map(([n,i])=>{const a=n.split("/").pop()?.replace(/\.md$/,"")||"untitled-post",{frontmatter:u,content:c}=n2(i),s=u.tags&&u.tags.length>0?u.tags:void 0;return{id:u.id||a,title:u.title||a,description:u.description||"",date:u.date||"1970-01-01 00:00",category:u.category||"daily",tags:s,published:u.published??!0,content:c.trim()}}).sort((n,i)=>xp(i.date)-xp(n.date)),Mg=[{id:"all",name:"전체",icon:"grid"},{id:"security",name:"보안(Security)",icon:"shield",children:[{id:"web-security",name:"Web Security",icon:"globe"},{id:"web3-blockchain",name:"Web3 / Blockchain",icon:"zap",children:[{id:"research-article",name:"research/Article"},{id:"study-dev-security",name:"study(dev/security)"},{id:"wargame-ctf",name:"wargame/CTF"}]},{id:"reversing",name:"Reversing",icon:"cpu"},{id:"pwn",name:"Pwn",icon:"terminal"},{id:"crypto",name:"Crypto",icon:"lock"}]},{id:"development",name:"개발(Development)",icon:"code"},{id:"travel",name:"여행(Travel)",icon:"map"},{id:"daily",name:"일상(Daily)",icon:"user"}],Ga={name:"flowizy",title:"SECURITY RESEARCHER",bio:"관심 있는 것들을 공부하고 기록합니다.",profileImage:"/images/chaegeon.jpg",contacts:[{type:"discord",label:"DISCORD",value:"_flowizy"},{type:"telegram",label:"TELEGRAM",value:"@chaegunn",link:"https://t.me/chaegunn"},{type:"linkedin",label:"LINKEDIN",value:"Chaegeon Oh",link:"https://www.linkedin.com/in/%EC%B1%84%EA%B1%B4-%EC%98%A4-159157342/"},{type:"github",label:"GITHUB",value:"fl0wizy",link:"https://github.com/fl0wizy"},{type:"email",label:"PERSONAL EMAIL",value:"dhcorjs063@gmail.com",link:"mailto:dhcorjs063@gmail.com"},{type:"email",label:"ACADEMIC EMAIL",value:"dhcorjs@ajou.ac.kr",link:"mailto:dhcorjs@ajou.ac.kr"}],experiences:[{title:"The 10th President of the Student Council",company:"Ajou University-department of cyber security",period:"2025-01 ~ 2025-12",description:"2025년도 아주대학교 사이버보안학과 제10대 학생회장으로 역임.",tags:["학생회","자치활동","책임감"],current:!0}],projects:[{title:"Visualize on-chain data",type:"Data Analytics & Visualization",year:"2025-03 ~ 2025-06",description:"ARKHAM, DUNE, Etherscan 등과 같이 정적인 데이터에서 유의미한 데이터를 추출하고 이를 보기 쉽게 가시화한 프로젝트입니다.",tags:["Java","SpringBoot","Vue.js"],link:"https://github.com/fl0wizy/defi-audit-bot"},{title:"Blockchain Audit Project",type:"DeFi Security & Audit",year:"2025-07 ~ 2025-10",description:"Flare, Trader Joe, Ekubo와 같은 정통 DEX부터 담보대출 시스템 등 DeFi 프로토콜 감사를 수행한 프로젝트입니다.",tags:["EVM","Solidity","CodeArena"],link:"https://github.com/fl0wizy/defi-audit-bot"}],education:[{title:"Department of Cyber Security",institution:"Ajou University",subInfo:"아주대학교 사이버보안학과",period:"2022 ~ 현재",description:"시스템 보안 및 탈중앙화를 중점적으로 공부하고 있습니다.",tags:["시스템 보안","운영체제","네트워크"],current:!0},{title:"Hspace Internship",institution:"Hspace",subInfo:"교육 인턴",period:"2025-07 ~ 2025-08",description:"Web과 Web3, 인프라에 대한 전반적인 지식을 습득했습니다.",tags:["Web Security","Web3","Secureum","DEFCON"]},{title:"HuntingMaster (KISA) Web/Web3 Track Trainee",institution:"KISA",subInfo:"우수 수료생",period:"2025-07 ~ 2025-10",description:"Web과 Web3에 대한 전반적인 보안 지식을 습득했습니다.",tags:["Web Security","Web3","Audit","Bug Bounty"]},{title:"upside Academy",institution:"Theory x 두나무",subInfo:"A.K.A fl0wizy",period:"2026-02 ~ 2026-06",description:"전분야 보안의 전반적인 지식과 web3의 깊은 이해를 가지게 되었습니다.",tags:["Solidity","Foundry","Web3","Audit","Threat Modeling"]}],skills:[{name:"Web3 security",category:"Smart Contracts",level:"intermediate",description:"EVM, 가스 최적화 및 프로토콜 보안 패턴에 대한 깊은 이해를 보유하고 있습니다.",tags:["Solidity","Yul","Foundry"]},{name:"Web Security",category:"Network Security",level:"intermediate",description:"네트워크 보안 기술에 대한 깊은 이해를 보유하고 있습니다.",tags:["Burp Suite","XSS","SQLi","Wireshark","Nmap","business"]}]};function Og(n,i=Mg){for(const a of i){if(a.id===n)return a;if(a.children){const u=Og(n,a.children);if(u)return u}}}function Ng(n){const i=[n.id];if(n.children)for(const a of n.children)i.push(...Ng(a));return i}function i2(n){return Ba.filter(i=>i.published).length}function a2(n){if(n==="all")return Ba.filter(u=>u.published);const i=Og(n);if(!i)return[];const a=new Set(Ng(i));return Ba.filter(u=>u.published&&a.has(u.category))}function r2(n){return Ba.find(i=>i.id===n)}function jg(n){const i=new Date(n.replace(" ","T")),u=new Date().getTime()-i.getTime(),c=Math.floor(u/(1e3*60)),s=Math.floor(u/(1e3*60*60)),f=Math.floor(u/(1e3*60*60*24)),m=Math.floor(f/7),p=Math.floor(f/30),d=Math.floor(f/365);return c<1?"방금 전":c<60?`약 ${c}분 전`:s<24?`약 ${s}시간 전`:f<7?`약 ${f}일 전`:m<4?`약 ${m}주 전`:p<12?`약 ${p}개월 전`:`약 ${d}년 전`}function Lg(n){const[i,a]=n.split(" ");return`${i} / ${a}`}const Su={grid:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("rect",{x:"3",y:"3",width:"7",height:"7",rx:"1"}),E.jsx("rect",{x:"14",y:"3",width:"7",height:"7",rx:"1"}),E.jsx("rect",{x:"3",y:"14",width:"7",height:"7",rx:"1"}),E.jsx("rect",{x:"14",y:"14",width:"7",height:"7",rx:"1"})]}),shield:()=>E.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:E.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})}),globe:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("circle",{cx:"12",cy:"12",r:"10"}),E.jsx("line",{x1:"2",y1:"12",x2:"22",y2:"12"}),E.jsx("path",{d:"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),zap:()=>E.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:E.jsx("polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"})}),cpu:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}),E.jsx("rect",{x:"9",y:"9",width:"6",height:"6"}),E.jsx("line",{x1:"9",y1:"1",x2:"9",y2:"4"}),E.jsx("line",{x1:"15",y1:"1",x2:"15",y2:"4"}),E.jsx("line",{x1:"9",y1:"20",x2:"9",y2:"23"}),E.jsx("line",{x1:"15",y1:"20",x2:"15",y2:"23"}),E.jsx("line",{x1:"20",y1:"9",x2:"23",y2:"9"}),E.jsx("line",{x1:"20",y1:"14",x2:"23",y2:"14"}),E.jsx("line",{x1:"1",y1:"9",x2:"4",y2:"9"}),E.jsx("line",{x1:"1",y1:"14",x2:"4",y2:"14"})]}),terminal:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("polyline",{points:"4 17 10 11 4 5"}),E.jsx("line",{x1:"12",y1:"19",x2:"20",y2:"19"})]}),lock:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),E.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),code:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("polyline",{points:"16 18 22 12 16 6"}),E.jsx("polyline",{points:"8 6 2 12 8 18"})]}),map:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("polygon",{points:"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"}),E.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"18"}),E.jsx("line",{x1:"16",y1:"6",x2:"16",y2:"22"})]}),user:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),E.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),chevronDown:()=>E.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:E.jsx("polyline",{points:"6 9 12 15 18 9"})}),book:()=>E.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("path",{d:"M4 19.5A2.5 2.5 0 0 1 6.5 17H20"}),E.jsx("path",{d:"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"})]}),userCircle:()=>E.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("circle",{cx:"12",cy:"12",r:"10"}),E.jsx("circle",{cx:"12",cy:"10",r:"3"}),E.jsx("path",{d:"M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"})]})},u2=n=>{if(!n)return null;const i=Su[n];return i?E.jsx(i,{}):null};function Bg({category:n,level:i,selectedCategory:a,onSelect:u}){const[c,s]=V.useState(i===0),f=n.children&&n.children.length>0,m=a===n.id,p=n.id==="all"?i2():void 0,d=()=>{f&&s(!c),u(n.id)};return E.jsxs("div",{className:"category-item-wrapper",children:[E.jsxs("button",{className:`category-item ${m?"selected":""} level-${i}`,onClick:d,style:{paddingLeft:`${i*16+12}px`},children:[E.jsx("span",{className:"category-icon",children:u2(n.icon)}),E.jsx("span",{className:"category-name",children:n.name}),p!==void 0&&E.jsx("span",{className:"post-count",children:p}),f&&E.jsx("span",{className:`expand-icon ${c?"expanded":""}`,children:E.jsx(Su.chevronDown,{})})]}),f&&c&&E.jsx("div",{className:"category-children",children:n.children.map(b=>E.jsx(Bg,{category:b,level:i+1,selectedCategory:a,onSelect:u},b.id))})]})}function o2({onCategorySelect:n}){const i=Bn(),[a,u]=V.useState("all"),c=i.pathname==="/profile",s=i.pathname==="/"||i.pathname.startsWith("/blog")||i.pathname.startsWith("/category"),f=m=>{u(m),n?.(m)};return E.jsxs("aside",{className:"sidebar",children:[E.jsx("div",{className:"sidebar-logo",children:E.jsxs("div",{className:"logo-container",children:[E.jsx("div",{className:"logo-image-wrapper",children:E.jsx("img",{src:"/images/profile.jpg",alt:"flowizy",className:"logo-profile-image"})}),E.jsxs("div",{className:"logo-text",children:[E.jsx("h1",{children:"flowizy's DevLog"}),E.jsx("p",{children:"SECURITY RESEARCHER"})]})]})}),E.jsxs("nav",{className:"sidebar-nav",children:[E.jsxs(Ai,{to:"/profile",className:`nav-item ${c?"active":""}`,children:[E.jsx(Su.userCircle,{}),E.jsx("span",{children:"PROFILE"})]}),E.jsxs(Ai,{to:"/",className:`nav-item ${s?"active":""}`,children:[E.jsx(Su.book,{}),E.jsx("span",{children:"BLOG"})]})]}),E.jsxs("div",{className:"sidebar-categories",children:[E.jsx("div",{className:"categories-header",children:E.jsx("span",{children:"CONTENT CATEGORIES"})}),E.jsx("div",{className:"categories-list",children:Mg.map(m=>E.jsx(Bg,{category:m,level:0,selectedCategory:a,onSelect:f},m.id))})]})]})}function c2(){const n=Bs(),i=a=>{n(a==="all"?"/":`/category/${a}`)};return E.jsxs("div",{className:"layout",children:[E.jsx(o2,{onCategorySelect:i}),E.jsx("main",{className:"main-content",children:E.jsx(fv,{})})]})}const s2=()=>E.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:E.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})});function Ug({subtitle:n="SECURITY RESEARCH LOG",title:i,highlightWord:a}){const u=()=>a?i.split(new RegExp(`(${a})`,"gi")).map((s,f)=>s.toLowerCase()===a.toLowerCase()?E.jsx("span",{className:"highlight",children:s},f):s):i;return E.jsxs("header",{className:"hero-header",children:[E.jsxs("div",{className:"hero-background",children:[E.jsx("div",{className:"stars"}),E.jsx("div",{className:"nebula"})]}),E.jsxs("div",{className:"hero-content",children:[E.jsxs("div",{className:"hero-badge",children:[E.jsx(s2,{}),E.jsx("span",{className:"badge-text",children:n})]}),E.jsx("h1",{className:"hero-title",children:u()})]})]})}const f2={daily:"일상(DAILY)",security:"보안(SECURITY)","web-security":"Web Security","web3-blockchain":"Web3/Blockchain","research-article":"Research/Article","study-dev-security":"Study","wargame-ctf":"Wargame/CTF",reversing:"Reversing",pwn:"Pwn",crypto:"Crypto",development:"개발(DEVELOPMENT)",travel:"여행(TRAVEL)"};function Hg({post:n}){const i=f2[n.category]||n.category;return E.jsx("article",{className:"post-card",children:E.jsxs(Ai,{to:`/post/${n.id}`,className:"post-card-link",children:[E.jsxs("div",{className:"post-card-header",children:[E.jsxs("div",{className:"post-meta",children:[E.jsx("span",{className:"post-date",children:Lg(n.date)}),E.jsx("span",{className:"post-relative-time",children:jg(n.date)})]}),E.jsx("span",{className:"post-category-badge",children:i})]}),E.jsx("h2",{className:"post-title",children:n.title}),E.jsx("p",{className:"post-description",children:n.description}),n.tags&&n.tags.length>0&&E.jsx("div",{className:"post-tags",children:n.tags.slice(0,3).map(a=>E.jsxs("span",{className:"post-tag",children:["#",a]},a))})]})})}function h2(){const n=Ba.filter(i=>i.published);return E.jsxs("div",{className:"blog-page",children:[E.jsx(Ug,{title:"Searching for vulnerabilities",highlightWord:"vulnerabilities"}),E.jsxs("section",{className:"archive-section",children:[E.jsx("h2",{className:"section-header",children:"ARCHIVE"}),E.jsx("div",{className:"posts-list",children:n.length>0?n.map(i=>E.jsx(Hg,{post:i},i.id)):E.jsx("div",{className:"no-posts",children:E.jsx("p",{children:"아직 게시글이 없습니다."})})})]})]})}const za={discord:()=>E.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"currentColor",children:E.jsx("path",{d:"M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"})}),telegram:()=>E.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"currentColor",children:E.jsx("path",{d:"M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"})}),linkedin:()=>E.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"currentColor",children:E.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})}),github:()=>E.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"currentColor",children:E.jsx("path",{d:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"})}),email:()=>E.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),E.jsx("path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"})]}),externalLink:()=>E.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),E.jsx("polyline",{points:"15 3 21 3 21 9"}),E.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),copy:()=>E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"}),E.jsx("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]}),check:()=>E.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:E.jsx("polyline",{points:"20 6 9 17 4 12"})})},Sp={discord:"#5865F2",telegram:"#26A5E4",linkedin:"#0A66C2",github:"#8b5cf6",email:"#a855f7"};function d2(){const{name:n,title:i,bio:a,profileImage:u,contacts:c}=Ga,[s,f]=V.useState(null),m=async(d,b)=>{try{await navigator.clipboard.writeText(d),f(b),setTimeout(()=>f(null),2e3)}catch(g){console.error("Failed to copy:",g)}},p=d=>d==="github"||d==="linkedin";return E.jsxs("div",{className:"profile-card-container",children:[E.jsxs("div",{className:"profile-header",children:[E.jsx("div",{className:"profile-image-wrapper",children:E.jsx("div",{className:"profile-image",children:E.jsx("img",{src:u,alt:n})})}),E.jsxs("div",{className:"profile-info",children:[E.jsx("h1",{className:"profile-name",children:n}),E.jsx("p",{className:"profile-title",children:i}),E.jsx("p",{className:"profile-korean-name",children:"Korean name : Chaegeon Oh"}),E.jsx("p",{className:"profile-bio",children:a})]})]}),E.jsx("div",{className:"contact-grid",children:c.map((d,b)=>{const g=za[d.type]||za.email,S=Sp[d.type]||Sp.email,x=p(d.type)&&d.link;return E.jsxs("div",{className:"contact-card",style:{"--contact-icon-color":S},children:[E.jsx("div",{className:"contact-icon",children:E.jsx(g,{})}),E.jsxs("div",{className:"contact-content",children:[E.jsx("span",{className:"contact-label",children:d.label}),x?E.jsxs("a",{href:d.link,className:"contact-value contact-link",target:"_blank",rel:"noopener noreferrer",children:[d.value,E.jsx(za.externalLink,{})]}):E.jsx("span",{className:"contact-value contact-text",children:d.value})]}),!x&&E.jsx("button",{className:`copy-button ${s===b?"copied":""}`,onClick:()=>m(d.value,b),title:"복사",children:s===b?E.jsx(za.check,{}):E.jsx(za.copy,{})})]},b)})})]})}function m2(){const{experiences:n}=Ga;return n.length===0?null:E.jsxs("section",{className:"experience-section",children:[E.jsx("h2",{className:"section-header",children:"EXPERIENCE"}),E.jsx("div",{className:"timeline",children:n.map((i,a)=>E.jsx("div",{className:"timeline-item",children:E.jsxs("div",{className:"experience-card",children:[E.jsxs("div",{className:"experience-header",children:[E.jsx("div",{className:"experience-icon",children:E.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:E.jsx("circle",{cx:"12",cy:"12",r:"10"})})}),E.jsxs("div",{className:"experience-title-info",children:[E.jsx("h3",{className:"experience-title",children:i.title}),E.jsx("p",{className:"experience-company",children:i.company})]}),E.jsx("span",{className:`experience-period ${i.current?"current":""}`,children:i.period})]}),E.jsx("p",{className:"experience-description",children:i.description}),i.tags&&i.tags.length>0&&E.jsx("div",{className:"experience-tags",children:i.tags.map((u,c)=>E.jsxs("span",{className:"tag",children:["#",u]},c))})]})},a))})]})}function p2(){const{projects:n}=Ga;return n.length===0?null:E.jsxs("section",{className:"projects-section",children:[E.jsx("h2",{className:"section-header",children:"PROJECTS"}),E.jsx("div",{className:"timeline",children:n.map((i,a)=>E.jsx("div",{className:"timeline-item",children:E.jsxs("div",{className:"project-card",children:[E.jsxs("div",{className:"project-header",children:[E.jsx("div",{className:"project-icon",children:E.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("polyline",{points:"4 17 10 11 4 5"}),E.jsx("line",{x1:"12",y1:"19",x2:"20",y2:"19"})]})}),E.jsxs("div",{className:"project-title-info",children:[E.jsx("h3",{className:"project-title",children:i.title}),E.jsx("p",{className:"project-type",children:i.type})]}),E.jsx("span",{className:"project-year",children:i.year})]}),E.jsx("p",{className:"project-description",children:i.description}),i.tags&&i.tags.length>0&&E.jsx("div",{className:"project-tags",children:i.tags.map((u,c)=>E.jsxs("span",{className:"tag",children:["#",u]},c))})]})},a))})]})}function g2(){const{education:n}=Ga;return n.length===0?null:E.jsxs("section",{className:"education-section",children:[E.jsx("h2",{className:"section-header",children:"EDUCATION"}),E.jsx("div",{className:"timeline",children:n.map((i,a)=>E.jsx("div",{className:"timeline-item",children:E.jsxs("div",{className:"education-card",children:[E.jsxs("div",{className:"education-header",children:[E.jsx("div",{className:"education-icon",children:E.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("path",{d:"M22 10v6M2 10l10-5 10 5-10 5z"}),E.jsx("path",{d:"M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"})]})}),E.jsxs("div",{className:"education-title-info",children:[E.jsx("h3",{className:"education-title",children:i.title}),E.jsxs("p",{className:"education-institution",children:[i.institution,i.subInfo&&E.jsxs("span",{className:"education-subinfo",children:[" (",i.subInfo,")"]})]})]}),E.jsx("span",{className:`education-period ${i.current?"current":""}`,children:i.period})]}),E.jsx("p",{className:"education-description",children:i.description}),i.tags&&i.tags.length>0&&E.jsx("div",{className:"education-tags",children:i.tags.map((u,c)=>E.jsxs("span",{className:"tag",children:["#",u]},c))})]})},a))})]})}const y2={beginner:"입문",intermediate:"중급",advanced:"고급",expert:"전문가"},b2={beginner:"blue",intermediate:"yellow",advanced:"purple",expert:"green"};function v2(){const{skills:n}=Ga;return n.length===0?null:E.jsxs("section",{className:"skills-section",children:[E.jsx("h2",{className:"section-header",children:"SKILLS"}),E.jsx("div",{className:"timeline",children:n.map((i,a)=>E.jsx("div",{className:"timeline-item",children:E.jsxs("div",{className:"skill-card",children:[E.jsxs("div",{className:"skill-header",children:[E.jsx("div",{className:"skill-icon",children:E.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:E.jsx("circle",{cx:"12",cy:"12",r:"10"})})}),E.jsxs("div",{className:"skill-title-info",children:[E.jsx("h3",{className:"skill-title",children:i.name}),E.jsx("p",{className:"skill-category",children:i.category})]}),E.jsx("span",{className:`skill-level level-${b2[i.level]}`,children:y2[i.level]})]}),E.jsx("p",{className:"skill-description",children:i.description}),i.tags&&i.tags.length>0&&E.jsx("div",{className:"skill-tags",children:i.tags.map((u,c)=>E.jsxs("span",{className:"tag",children:["#",u]},c))})]})},a))})]})}function x2(){return E.jsxs("div",{className:"profile-page",children:[E.jsx(d2,{}),E.jsx(m2,{}),E.jsx(p2,{}),E.jsx(g2,{}),E.jsx(v2,{})]})}function S2(n,i){const a={};return(n[n.length-1]===""?[...n,""]:n).join((a.padRight?" ":"")+","+(a.padLeft===!1?"":" ")).trim()}const E2=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,k2=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,C2={};function Ep(n,i){return(C2.jsx?k2:E2).test(n)}const w2=/[ \t\n\f\r]/g;function A2(n){return typeof n=="object"?n.type==="text"?kp(n.value):!1:kp(n)}function kp(n){return n.replace(w2,"")===""}class Xa{constructor(i,a,u){this.normal=a,this.property=i,u&&(this.space=u)}}Xa.prototype.normal={};Xa.prototype.property={};Xa.prototype.space=void 0;function qg(n,i){const a={},u={};for(const c of n)Object.assign(a,c.property),Object.assign(u,c.normal);return new Xa(a,u,i)}function ks(n){return n.toLowerCase()}class Rt{constructor(i,a){this.attribute=a,this.property=i}}Rt.prototype.attribute="";Rt.prototype.booleanish=!1;Rt.prototype.boolean=!1;Rt.prototype.commaOrSpaceSeparated=!1;Rt.prototype.commaSeparated=!1;Rt.prototype.defined=!1;Rt.prototype.mustUseProperty=!1;Rt.prototype.number=!1;Rt.prototype.overloadedBoolean=!1;Rt.prototype.property="";Rt.prototype.spaceSeparated=!1;Rt.prototype.space=void 0;let T2=0;const ve=Ml(),it=Ml(),Cs=Ml(),J=Ml(),Xe=Ml(),wi=Ml(),Ht=Ml();function Ml(){return 2**++T2}const ws=Object.freeze(Object.defineProperty({__proto__:null,boolean:ve,booleanish:it,commaOrSpaceSeparated:Ht,commaSeparated:wi,number:J,overloadedBoolean:Cs,spaceSeparated:Xe},Symbol.toStringTag,{value:"Module"})),is=Object.keys(ws);class Vs extends Rt{constructor(i,a,u,c){let s=-1;if(super(i,a),Cp(this,"space",c),typeof u=="number")for(;++s<is.length;){const f=is[s];Cp(this,is[s],(u&ws[f])===ws[f])}}}Vs.prototype.defined=!0;function Cp(n,i,a){a&&(n[i]=a)}function Ri(n){const i={},a={};for(const[u,c]of Object.entries(n.properties)){const s=new Vs(u,n.transform(n.attributes||{},u),c,n.space);n.mustUseProperty&&n.mustUseProperty.includes(u)&&(s.mustUseProperty=!0),i[u]=s,a[ks(u)]=u,a[ks(s.attribute)]=u}return new Xa(i,a,n.space)}const Yg=Ri({properties:{ariaActiveDescendant:null,ariaAtomic:it,ariaAutoComplete:null,ariaBusy:it,ariaChecked:it,ariaColCount:J,ariaColIndex:J,ariaColSpan:J,ariaControls:Xe,ariaCurrent:null,ariaDescribedBy:Xe,ariaDetails:null,ariaDisabled:it,ariaDropEffect:Xe,ariaErrorMessage:null,ariaExpanded:it,ariaFlowTo:Xe,ariaGrabbed:it,ariaHasPopup:null,ariaHidden:it,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:Xe,ariaLevel:J,ariaLive:null,ariaModal:it,ariaMultiLine:it,ariaMultiSelectable:it,ariaOrientation:null,ariaOwns:Xe,ariaPlaceholder:null,ariaPosInSet:J,ariaPressed:it,ariaReadOnly:it,ariaRelevant:null,ariaRequired:it,ariaRoleDescription:Xe,ariaRowCount:J,ariaRowIndex:J,ariaRowSpan:J,ariaSelected:it,ariaSetSize:J,ariaSort:null,ariaValueMax:J,ariaValueMin:J,ariaValueNow:J,ariaValueText:null,role:null},transform(n,i){return i==="role"?i:"aria-"+i.slice(4).toLowerCase()}});function Vg(n,i){return i in n?n[i]:i}function Gg(n,i){return Vg(n,i.toLowerCase())}const z2=Ri({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:wi,acceptCharset:Xe,accessKey:Xe,action:null,allow:null,allowFullScreen:ve,allowPaymentRequest:ve,allowUserMedia:ve,alt:null,as:null,async:ve,autoCapitalize:null,autoComplete:Xe,autoFocus:ve,autoPlay:ve,blocking:Xe,capture:null,charSet:null,checked:ve,cite:null,className:Xe,cols:J,colSpan:null,content:null,contentEditable:it,controls:ve,controlsList:Xe,coords:J|wi,crossOrigin:null,data:null,dateTime:null,decoding:null,default:ve,defer:ve,dir:null,dirName:null,disabled:ve,download:Cs,draggable:it,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:ve,formTarget:null,headers:Xe,height:J,hidden:Cs,high:J,href:null,hrefLang:null,htmlFor:Xe,httpEquiv:Xe,id:null,imageSizes:null,imageSrcSet:null,inert:ve,inputMode:null,integrity:null,is:null,isMap:ve,itemId:null,itemProp:Xe,itemRef:Xe,itemScope:ve,itemType:Xe,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:ve,low:J,manifest:null,max:null,maxLength:J,media:null,method:null,min:null,minLength:J,multiple:ve,muted:ve,name:null,nonce:null,noModule:ve,noValidate:ve,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:ve,optimum:J,pattern:null,ping:Xe,placeholder:null,playsInline:ve,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:ve,referrerPolicy:null,rel:Xe,required:ve,reversed:ve,rows:J,rowSpan:J,sandbox:Xe,scope:null,scoped:ve,seamless:ve,selected:ve,shadowRootClonable:ve,shadowRootDelegatesFocus:ve,shadowRootMode:null,shape:null,size:J,sizes:null,slot:null,span:J,spellCheck:it,src:null,srcDoc:null,srcLang:null,srcSet:null,start:J,step:null,style:null,tabIndex:J,target:null,title:null,translate:null,type:null,typeMustMatch:ve,useMap:null,value:it,width:J,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:Xe,axis:null,background:null,bgColor:null,border:J,borderColor:null,bottomMargin:J,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:ve,declare:ve,event:null,face:null,frame:null,frameBorder:null,hSpace:J,leftMargin:J,link:null,longDesc:null,lowSrc:null,marginHeight:J,marginWidth:J,noResize:ve,noHref:ve,noShade:ve,noWrap:ve,object:null,profile:null,prompt:null,rev:null,rightMargin:J,rules:null,scheme:null,scrolling:it,standby:null,summary:null,text:null,topMargin:J,valueType:null,version:null,vAlign:null,vLink:null,vSpace:J,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:ve,disableRemotePlayback:ve,prefix:null,property:null,results:J,security:null,unselectable:null},space:"html",transform:Gg}),D2=Ri({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:Ht,accentHeight:J,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:J,amplitude:J,arabicForm:null,ascent:J,attributeName:null,attributeType:null,azimuth:J,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:J,by:null,calcMode:null,capHeight:J,className:Xe,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:J,diffuseConstant:J,direction:null,display:null,dur:null,divisor:J,dominantBaseline:null,download:ve,dx:null,dy:null,edgeMode:null,editable:null,elevation:J,enableBackground:null,end:null,event:null,exponent:J,externalResourcesRequired:null,fill:null,fillOpacity:J,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:wi,g2:wi,glyphName:wi,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:J,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:J,horizOriginX:J,horizOriginY:J,id:null,ideographic:J,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:J,k:J,k1:J,k2:J,k3:J,k4:J,kernelMatrix:Ht,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:J,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:J,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:J,overlineThickness:J,paintOrder:null,panose1:null,path:null,pathLength:J,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:Xe,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:J,pointsAtY:J,pointsAtZ:J,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:Ht,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:Ht,rev:Ht,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:Ht,requiredFeatures:Ht,requiredFonts:Ht,requiredFormats:Ht,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:J,specularExponent:J,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:J,strikethroughThickness:J,string:null,stroke:null,strokeDashArray:Ht,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:J,strokeOpacity:J,strokeWidth:null,style:null,surfaceScale:J,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:Ht,tabIndex:J,tableValues:null,target:null,targetX:J,targetY:J,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:Ht,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:J,underlineThickness:J,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:J,values:null,vAlphabetic:J,vMathematical:J,vectorEffect:null,vHanging:J,vIdeographic:J,version:null,vertAdvY:J,vertOriginX:J,vertOriginY:J,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:J,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:Vg}),Xg=Ri({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(n,i){return"xlink:"+i.slice(5).toLowerCase()}}),Qg=Ri({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:Gg}),Fg=Ri({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(n,i){return"xml:"+i.slice(3).toLowerCase()}}),R2={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},_2=/[A-Z]/g,wp=/-[a-z]/g,M2=/^data[-\w.:]+$/i;function O2(n,i){const a=ks(i);let u=i,c=Rt;if(a in n.normal)return n.property[n.normal[a]];if(a.length>4&&a.slice(0,4)==="data"&&M2.test(i)){if(i.charAt(4)==="-"){const s=i.slice(5).replace(wp,j2);u="data"+s.charAt(0).toUpperCase()+s.slice(1)}else{const s=i.slice(4);if(!wp.test(s)){let f=s.replace(_2,N2);f.charAt(0)!=="-"&&(f="-"+f),i="data"+f}}c=Vs}return new c(u,i)}function N2(n){return"-"+n.toLowerCase()}function j2(n){return n.charAt(1).toUpperCase()}const L2=qg([Yg,z2,Xg,Qg,Fg],"html"),Gs=qg([Yg,D2,Xg,Qg,Fg],"svg");function B2(n){return n.join(" ").trim()}var Si={},as,Ap;function U2(){if(Ap)return as;Ap=1;var n=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,i=/\n/g,a=/^\s*/,u=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,c=/^:\s*/,s=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,f=/^[;\s]*/,m=/^\s+|\s+$/g,p=`
`,d="/",b="*",g="",S="comment",x="declaration";function A(R,D){if(typeof R!="string")throw new TypeError("First argument must be a string");if(!R)return[];D=D||{};var G=1,U=1;function ne(ae){var K=ae.match(i);K&&(G+=K.length);var L=ae.lastIndexOf(p);U=~L?ae.length-L:U+ae.length}function le(){var ae={line:G,column:U};return function(K){return K.position=new q(ae),me(),K}}function q(ae){this.start=ae,this.end={line:G,column:U},this.source=D.source}q.prototype.content=R;function $(ae){var K=new Error(D.source+":"+G+":"+U+": "+ae);if(K.reason=ae,K.filename=D.source,K.line=G,K.column=U,K.source=R,!D.silent)throw K}function se(ae){var K=ae.exec(R);if(K){var L=K[0];return ne(L),R=R.slice(L.length),K}}function me(){se(a)}function B(ae){var K;for(ae=ae||[];K=te();)K!==!1&&ae.push(K);return ae}function te(){var ae=le();if(!(d!=R.charAt(0)||b!=R.charAt(1))){for(var K=2;g!=R.charAt(K)&&(b!=R.charAt(K)||d!=R.charAt(K+1));)++K;if(K+=2,g===R.charAt(K-1))return $("End of comment missing");var L=R.slice(2,K-2);return U+=2,ne(L),R=R.slice(K),U+=2,ae({type:S,comment:L})}}function ee(){var ae=le(),K=se(u);if(K){if(te(),!se(c))return $("property missing ':'");var L=se(s),I=ae({type:x,property:M(K[0].replace(n,g)),value:L?M(L[0].replace(n,g)):g});return se(f),I}}function xe(){var ae=[];B(ae);for(var K;K=ee();)K!==!1&&(ae.push(K),B(ae));return ae}return me(),xe()}function M(R){return R?R.replace(m,g):g}return as=A,as}var Tp;function H2(){if(Tp)return Si;Tp=1;var n=Si&&Si.__importDefault||function(u){return u&&u.__esModule?u:{default:u}};Object.defineProperty(Si,"__esModule",{value:!0}),Si.default=a;const i=n(U2());function a(u,c){let s=null;if(!u||typeof u!="string")return s;const f=(0,i.default)(u),m=typeof c=="function";return f.forEach(p=>{if(p.type!=="declaration")return;const{property:d,value:b}=p;m?c(d,b,p):b&&(s=s||{},s[d]=b)}),s}return Si}var Da={},zp;function q2(){if(zp)return Da;zp=1,Object.defineProperty(Da,"__esModule",{value:!0}),Da.camelCase=void 0;var n=/^--[a-zA-Z0-9_-]+$/,i=/-([a-z])/g,a=/^[^-]+$/,u=/^-(webkit|moz|ms|o|khtml)-/,c=/^-(ms)-/,s=function(d){return!d||a.test(d)||n.test(d)},f=function(d,b){return b.toUpperCase()},m=function(d,b){return"".concat(b,"-")},p=function(d,b){return b===void 0&&(b={}),s(d)?d:(d=d.toLowerCase(),b.reactCompat?d=d.replace(c,m):d=d.replace(u,m),d.replace(i,f))};return Da.camelCase=p,Da}var Ra,Dp;function Y2(){if(Dp)return Ra;Dp=1;var n=Ra&&Ra.__importDefault||function(c){return c&&c.__esModule?c:{default:c}},i=n(H2()),a=q2();function u(c,s){var f={};return!c||typeof c!="string"||(0,i.default)(c,function(m,p){m&&p&&(f[(0,a.camelCase)(m,s)]=p)}),f}return u.default=u,Ra=u,Ra}var V2=Y2();const G2=fg(V2),Zg=Ig("end"),Xs=Ig("start");function Ig(n){return i;function i(a){const u=a&&a.position&&a.position[n]||{};if(typeof u.line=="number"&&u.line>0&&typeof u.column=="number"&&u.column>0)return{line:u.line,column:u.column,offset:typeof u.offset=="number"&&u.offset>-1?u.offset:void 0}}}function X2(n){const i=Xs(n),a=Zg(n);if(i&&a)return{start:i,end:a}}function Oa(n){return!n||typeof n!="object"?"":"position"in n||"type"in n?Rp(n.position):"start"in n||"end"in n?Rp(n):"line"in n||"column"in n?As(n):""}function As(n){return _p(n&&n.line)+":"+_p(n&&n.column)}function Rp(n){return As(n&&n.start)+"-"+As(n&&n.end)}function _p(n){return n&&typeof n=="number"?n:1}class gt extends Error{constructor(i,a,u){super(),typeof a=="string"&&(u=a,a=void 0);let c="",s={},f=!1;if(a&&("line"in a&&"column"in a?s={place:a}:"start"in a&&"end"in a?s={place:a}:"type"in a?s={ancestors:[a],place:a.position}:s={...a}),typeof i=="string"?c=i:!s.cause&&i&&(f=!0,c=i.message,s.cause=i),!s.ruleId&&!s.source&&typeof u=="string"){const p=u.indexOf(":");p===-1?s.ruleId=u:(s.source=u.slice(0,p),s.ruleId=u.slice(p+1))}if(!s.place&&s.ancestors&&s.ancestors){const p=s.ancestors[s.ancestors.length-1];p&&(s.place=p.position)}const m=s.place&&"start"in s.place?s.place.start:s.place;this.ancestors=s.ancestors||void 0,this.cause=s.cause||void 0,this.column=m?m.column:void 0,this.fatal=void 0,this.file="",this.message=c,this.line=m?m.line:void 0,this.name=Oa(s.place)||"1:1",this.place=s.place||void 0,this.reason=this.message,this.ruleId=s.ruleId||void 0,this.source=s.source||void 0,this.stack=f&&s.cause&&typeof s.cause.stack=="string"?s.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}gt.prototype.file="";gt.prototype.name="";gt.prototype.reason="";gt.prototype.message="";gt.prototype.stack="";gt.prototype.column=void 0;gt.prototype.line=void 0;gt.prototype.ancestors=void 0;gt.prototype.cause=void 0;gt.prototype.fatal=void 0;gt.prototype.place=void 0;gt.prototype.ruleId=void 0;gt.prototype.source=void 0;const Qs={}.hasOwnProperty,Q2=new Map,F2=/[A-Z]/g,Z2=new Set(["table","tbody","thead","tfoot","tr"]),I2=new Set(["td","th"]),Kg="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function K2(n,i){if(!i||i.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const a=i.filePath||void 0;let u;if(i.development){if(typeof i.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");u=lx(a,i.jsxDEV)}else{if(typeof i.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof i.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");u=nx(a,i.jsx,i.jsxs)}const c={Fragment:i.Fragment,ancestors:[],components:i.components||{},create:u,elementAttributeNameCase:i.elementAttributeNameCase||"react",evaluater:i.createEvaluater?i.createEvaluater():void 0,filePath:a,ignoreInvalidStyle:i.ignoreInvalidStyle||!1,passKeys:i.passKeys!==!1,passNode:i.passNode||!1,schema:i.space==="svg"?Gs:L2,stylePropertyNameCase:i.stylePropertyNameCase||"dom",tableCellAlignToStyle:i.tableCellAlignToStyle!==!1},s=Jg(c,n,void 0);return s&&typeof s!="string"?s:c.create(n,c.Fragment,{children:s||void 0},void 0)}function Jg(n,i,a){if(i.type==="element")return J2(n,i,a);if(i.type==="mdxFlowExpression"||i.type==="mdxTextExpression")return W2(n,i);if(i.type==="mdxJsxFlowElement"||i.type==="mdxJsxTextElement")return P2(n,i,a);if(i.type==="mdxjsEsm")return $2(n,i);if(i.type==="root")return ex(n,i,a);if(i.type==="text")return tx(n,i)}function J2(n,i,a){const u=n.schema;let c=u;i.tagName.toLowerCase()==="svg"&&u.space==="html"&&(c=Gs,n.schema=c),n.ancestors.push(i);const s=$g(n,i.tagName,!1),f=ix(n,i);let m=Zs(n,i);return Z2.has(i.tagName)&&(m=m.filter(function(p){return typeof p=="string"?!A2(p):!0})),Wg(n,f,s,i),Fs(f,m),n.ancestors.pop(),n.schema=u,n.create(i,s,f,a)}function W2(n,i){if(i.data&&i.data.estree&&n.evaluater){const u=i.data.estree.body[0];return u.type,n.evaluater.evaluateExpression(u.expression)}Ua(n,i.position)}function $2(n,i){if(i.data&&i.data.estree&&n.evaluater)return n.evaluater.evaluateProgram(i.data.estree);Ua(n,i.position)}function P2(n,i,a){const u=n.schema;let c=u;i.name==="svg"&&u.space==="html"&&(c=Gs,n.schema=c),n.ancestors.push(i);const s=i.name===null?n.Fragment:$g(n,i.name,!0),f=ax(n,i),m=Zs(n,i);return Wg(n,f,s,i),Fs(f,m),n.ancestors.pop(),n.schema=u,n.create(i,s,f,a)}function ex(n,i,a){const u={};return Fs(u,Zs(n,i)),n.create(i,n.Fragment,u,a)}function tx(n,i){return i.value}function Wg(n,i,a,u){typeof a!="string"&&a!==n.Fragment&&n.passNode&&(i.node=u)}function Fs(n,i){if(i.length>0){const a=i.length>1?i:i[0];a&&(n.children=a)}}function nx(n,i,a){return u;function u(c,s,f,m){const d=Array.isArray(f.children)?a:i;return m?d(s,f,m):d(s,f)}}function lx(n,i){return a;function a(u,c,s,f){const m=Array.isArray(s.children),p=Xs(u);return i(c,s,f,m,{columnNumber:p?p.column-1:void 0,fileName:n,lineNumber:p?p.line:void 0},void 0)}}function ix(n,i){const a={};let u,c;for(c in i.properties)if(c!=="children"&&Qs.call(i.properties,c)){const s=rx(n,c,i.properties[c]);if(s){const[f,m]=s;n.tableCellAlignToStyle&&f==="align"&&typeof m=="string"&&I2.has(i.tagName)?u=m:a[f]=m}}if(u){const s=a.style||(a.style={});s[n.stylePropertyNameCase==="css"?"text-align":"textAlign"]=u}return a}function ax(n,i){const a={};for(const u of i.attributes)if(u.type==="mdxJsxExpressionAttribute")if(u.data&&u.data.estree&&n.evaluater){const s=u.data.estree.body[0];s.type;const f=s.expression;f.type;const m=f.properties[0];m.type,Object.assign(a,n.evaluater.evaluateExpression(m.argument))}else Ua(n,i.position);else{const c=u.name;let s;if(u.value&&typeof u.value=="object")if(u.value.data&&u.value.data.estree&&n.evaluater){const m=u.value.data.estree.body[0];m.type,s=n.evaluater.evaluateExpression(m.expression)}else Ua(n,i.position);else s=u.value===null?!0:u.value;a[c]=s}return a}function Zs(n,i){const a=[];let u=-1;const c=n.passKeys?new Map:Q2;for(;++u<i.children.length;){const s=i.children[u];let f;if(n.passKeys){const p=s.type==="element"?s.tagName:s.type==="mdxJsxFlowElement"||s.type==="mdxJsxTextElement"?s.name:void 0;if(p){const d=c.get(p)||0;f=p+"-"+d,c.set(p,d+1)}}const m=Jg(n,s,f);m!==void 0&&a.push(m)}return a}function rx(n,i,a){const u=O2(n.schema,i);if(!(a==null||typeof a=="number"&&Number.isNaN(a))){if(Array.isArray(a)&&(a=u.commaSeparated?S2(a):B2(a)),u.property==="style"){let c=typeof a=="object"?a:ux(n,String(a));return n.stylePropertyNameCase==="css"&&(c=ox(c)),["style",c]}return[n.elementAttributeNameCase==="react"&&u.space?R2[u.property]||u.property:u.attribute,a]}}function ux(n,i){try{return G2(i,{reactCompat:!0})}catch(a){if(n.ignoreInvalidStyle)return{};const u=a,c=new gt("Cannot parse `style` attribute",{ancestors:n.ancestors,cause:u,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw c.file=n.filePath||void 0,c.url=Kg+"#cannot-parse-style-attribute",c}}function $g(n,i,a){let u;if(!a)u={type:"Literal",value:i};else if(i.includes(".")){const c=i.split(".");let s=-1,f;for(;++s<c.length;){const m=Ep(c[s])?{type:"Identifier",name:c[s]}:{type:"Literal",value:c[s]};f=f?{type:"MemberExpression",object:f,property:m,computed:!!(s&&m.type==="Literal"),optional:!1}:m}u=f}else u=Ep(i)&&!/^[a-z]/.test(i)?{type:"Identifier",name:i}:{type:"Literal",value:i};if(u.type==="Literal"){const c=u.value;return Qs.call(n.components,c)?n.components[c]:c}if(n.evaluater)return n.evaluater.evaluateExpression(u);Ua(n)}function Ua(n,i){const a=new gt("Cannot handle MDX estrees without `createEvaluater`",{ancestors:n.ancestors,place:i,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw a.file=n.filePath||void 0,a.url=Kg+"#cannot-handle-mdx-estrees-without-createevaluater",a}function ox(n){const i={};let a;for(a in n)Qs.call(n,a)&&(i[cx(a)]=n[a]);return i}function cx(n){let i=n.replace(F2,sx);return i.slice(0,3)==="ms-"&&(i="-"+i),i}function sx(n){return"-"+n.toLowerCase()}const rs={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},fx={};function Is(n,i){const a=fx,u=typeof a.includeImageAlt=="boolean"?a.includeImageAlt:!0,c=typeof a.includeHtml=="boolean"?a.includeHtml:!0;return Pg(n,u,c)}function Pg(n,i,a){if(hx(n)){if("value"in n)return n.type==="html"&&!a?"":n.value;if(i&&"alt"in n&&n.alt)return n.alt;if("children"in n)return Mp(n.children,i,a)}return Array.isArray(n)?Mp(n,i,a):""}function Mp(n,i,a){const u=[];let c=-1;for(;++c<n.length;)u[c]=Pg(n[c],i,a);return u.join("")}function hx(n){return!!(n&&typeof n=="object")}const Op=document.createElement("i");function Ks(n){const i="&"+n+";";Op.innerHTML=i;const a=Op.textContent;return a.charCodeAt(a.length-1)===59&&n!=="semi"||a===i?!1:a}function qt(n,i,a,u){const c=n.length;let s=0,f;if(i<0?i=-i>c?0:c+i:i=i>c?c:i,a=a>0?a:0,u.length<1e4)f=Array.from(u),f.unshift(i,a),n.splice(...f);else for(a&&n.splice(i,a);s<u.length;)f=u.slice(s,s+1e4),f.unshift(i,0),n.splice(...f),s+=1e4,i+=1e4}function $t(n,i){return n.length>0?(qt(n,n.length,0,i),n):i}const Np={}.hasOwnProperty;function ey(n){const i={};let a=-1;for(;++a<n.length;)dx(i,n[a]);return i}function dx(n,i){let a;for(a in i){const c=(Np.call(n,a)?n[a]:void 0)||(n[a]={}),s=i[a];let f;if(s)for(f in s){Np.call(c,f)||(c[f]=[]);const m=s[f];mx(c[f],Array.isArray(m)?m:m?[m]:[])}}}function mx(n,i){let a=-1;const u=[];for(;++a<i.length;)(i[a].add==="after"?n:u).push(i[a]);qt(n,0,0,u)}function ty(n,i){const a=Number.parseInt(n,i);return a<9||a===11||a>13&&a<32||a>126&&a<160||a>55295&&a<57344||a>64975&&a<65008||(a&65535)===65535||(a&65535)===65534||a>1114111?"�":String.fromCodePoint(a)}function an(n){return n.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const xt=fl(/[A-Za-z]/),pt=fl(/[\dA-Za-z]/),px=fl(/[#-'*+\--9=?A-Z^-~]/);function Eu(n){return n!==null&&(n<32||n===127)}const Ts=fl(/\d/),gx=fl(/[\dA-Fa-f]/),yx=fl(/[!-/:-@[-`{-~]/);function fe(n){return n!==null&&n<-2}function Ge(n){return n!==null&&(n<0||n===32)}function we(n){return n===-2||n===-1||n===32}const zu=fl(new RegExp("\\p{P}|\\p{S}","u")),_l=fl(/\s/);function fl(n){return i;function i(a){return a!==null&&a>-1&&n.test(String.fromCharCode(a))}}function _i(n){const i=[];let a=-1,u=0,c=0;for(;++a<n.length;){const s=n.charCodeAt(a);let f="";if(s===37&&pt(n.charCodeAt(a+1))&&pt(n.charCodeAt(a+2)))c=2;else if(s<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(s))||(f=String.fromCharCode(s));else if(s>55295&&s<57344){const m=n.charCodeAt(a+1);s<56320&&m>56319&&m<57344?(f=String.fromCharCode(s,m),c=1):f="�"}else f=String.fromCharCode(s);f&&(i.push(n.slice(u,a),encodeURIComponent(f)),u=a+c+1,f=""),c&&(a+=c,c=0)}return i.join("")+n.slice(u)}function Re(n,i,a,u){const c=u?u-1:Number.POSITIVE_INFINITY;let s=0;return f;function f(p){return we(p)?(n.enter(a),m(p)):i(p)}function m(p){return we(p)&&s++<c?(n.consume(p),m):(n.exit(a),i(p))}}const bx={tokenize:vx};function vx(n){const i=n.attempt(this.parser.constructs.contentInitial,u,c);let a;return i;function u(m){if(m===null){n.consume(m);return}return n.enter("lineEnding"),n.consume(m),n.exit("lineEnding"),Re(n,i,"linePrefix")}function c(m){return n.enter("paragraph"),s(m)}function s(m){const p=n.enter("chunkText",{contentType:"text",previous:a});return a&&(a.next=p),a=p,f(m)}function f(m){if(m===null){n.exit("chunkText"),n.exit("paragraph"),n.consume(m);return}return fe(m)?(n.consume(m),n.exit("chunkText"),s):(n.consume(m),f)}}const xx={tokenize:Sx},jp={tokenize:Ex};function Sx(n){const i=this,a=[];let u=0,c,s,f;return m;function m(U){if(u<a.length){const ne=a[u];return i.containerState=ne[1],n.attempt(ne[0].continuation,p,d)(U)}return d(U)}function p(U){if(u++,i.containerState._closeFlow){i.containerState._closeFlow=void 0,c&&G();const ne=i.events.length;let le=ne,q;for(;le--;)if(i.events[le][0]==="exit"&&i.events[le][1].type==="chunkFlow"){q=i.events[le][1].end;break}D(u);let $=ne;for(;$<i.events.length;)i.events[$][1].end={...q},$++;return qt(i.events,le+1,0,i.events.slice(ne)),i.events.length=$,d(U)}return m(U)}function d(U){if(u===a.length){if(!c)return S(U);if(c.currentConstruct&&c.currentConstruct.concrete)return A(U);i.interrupt=!!(c.currentConstruct&&!c._gfmTableDynamicInterruptHack)}return i.containerState={},n.check(jp,b,g)(U)}function b(U){return c&&G(),D(u),S(U)}function g(U){return i.parser.lazy[i.now().line]=u!==a.length,f=i.now().offset,A(U)}function S(U){return i.containerState={},n.attempt(jp,x,A)(U)}function x(U){return u++,a.push([i.currentConstruct,i.containerState]),S(U)}function A(U){if(U===null){c&&G(),D(0),n.consume(U);return}return c=c||i.parser.flow(i.now()),n.enter("chunkFlow",{_tokenizer:c,contentType:"flow",previous:s}),M(U)}function M(U){if(U===null){R(n.exit("chunkFlow"),!0),D(0),n.consume(U);return}return fe(U)?(n.consume(U),R(n.exit("chunkFlow")),u=0,i.interrupt=void 0,m):(n.consume(U),M)}function R(U,ne){const le=i.sliceStream(U);if(ne&&le.push(null),U.previous=s,s&&(s.next=U),s=U,c.defineSkip(U.start),c.write(le),i.parser.lazy[U.start.line]){let q=c.events.length;for(;q--;)if(c.events[q][1].start.offset<f&&(!c.events[q][1].end||c.events[q][1].end.offset>f))return;const $=i.events.length;let se=$,me,B;for(;se--;)if(i.events[se][0]==="exit"&&i.events[se][1].type==="chunkFlow"){if(me){B=i.events[se][1].end;break}me=!0}for(D(u),q=$;q<i.events.length;)i.events[q][1].end={...B},q++;qt(i.events,se+1,0,i.events.slice($)),i.events.length=q}}function D(U){let ne=a.length;for(;ne-- >U;){const le=a[ne];i.containerState=le[1],le[0].exit.call(i,n)}a.length=U}function G(){c.write([null]),s=void 0,c=void 0,i.containerState._closeFlow=void 0}}function Ex(n,i,a){return Re(n,n.attempt(this.parser.constructs.document,i,a),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Ti(n){if(n===null||Ge(n)||_l(n))return 1;if(zu(n))return 2}function Du(n,i,a){const u=[];let c=-1;for(;++c<n.length;){const s=n[c].resolveAll;s&&!u.includes(s)&&(i=s(i,a),u.push(s))}return i}const zs={name:"attention",resolveAll:kx,tokenize:Cx};function kx(n,i){let a=-1,u,c,s,f,m,p,d,b;for(;++a<n.length;)if(n[a][0]==="enter"&&n[a][1].type==="attentionSequence"&&n[a][1]._close){for(u=a;u--;)if(n[u][0]==="exit"&&n[u][1].type==="attentionSequence"&&n[u][1]._open&&i.sliceSerialize(n[u][1]).charCodeAt(0)===i.sliceSerialize(n[a][1]).charCodeAt(0)){if((n[u][1]._close||n[a][1]._open)&&(n[a][1].end.offset-n[a][1].start.offset)%3&&!((n[u][1].end.offset-n[u][1].start.offset+n[a][1].end.offset-n[a][1].start.offset)%3))continue;p=n[u][1].end.offset-n[u][1].start.offset>1&&n[a][1].end.offset-n[a][1].start.offset>1?2:1;const g={...n[u][1].end},S={...n[a][1].start};Lp(g,-p),Lp(S,p),f={type:p>1?"strongSequence":"emphasisSequence",start:g,end:{...n[u][1].end}},m={type:p>1?"strongSequence":"emphasisSequence",start:{...n[a][1].start},end:S},s={type:p>1?"strongText":"emphasisText",start:{...n[u][1].end},end:{...n[a][1].start}},c={type:p>1?"strong":"emphasis",start:{...f.start},end:{...m.end}},n[u][1].end={...f.start},n[a][1].start={...m.end},d=[],n[u][1].end.offset-n[u][1].start.offset&&(d=$t(d,[["enter",n[u][1],i],["exit",n[u][1],i]])),d=$t(d,[["enter",c,i],["enter",f,i],["exit",f,i],["enter",s,i]]),d=$t(d,Du(i.parser.constructs.insideSpan.null,n.slice(u+1,a),i)),d=$t(d,[["exit",s,i],["enter",m,i],["exit",m,i],["exit",c,i]]),n[a][1].end.offset-n[a][1].start.offset?(b=2,d=$t(d,[["enter",n[a][1],i],["exit",n[a][1],i]])):b=0,qt(n,u-1,a-u+3,d),a=u+d.length-b-2;break}}for(a=-1;++a<n.length;)n[a][1].type==="attentionSequence"&&(n[a][1].type="data");return n}function Cx(n,i){const a=this.parser.constructs.attentionMarkers.null,u=this.previous,c=Ti(u);let s;return f;function f(p){return s=p,n.enter("attentionSequence"),m(p)}function m(p){if(p===s)return n.consume(p),m;const d=n.exit("attentionSequence"),b=Ti(p),g=!b||b===2&&c||a.includes(p),S=!c||c===2&&b||a.includes(u);return d._open=!!(s===42?g:g&&(c||!S)),d._close=!!(s===42?S:S&&(b||!g)),i(p)}}function Lp(n,i){n.column+=i,n.offset+=i,n._bufferIndex+=i}const wx={name:"autolink",tokenize:Ax};function Ax(n,i,a){let u=0;return c;function c(x){return n.enter("autolink"),n.enter("autolinkMarker"),n.consume(x),n.exit("autolinkMarker"),n.enter("autolinkProtocol"),s}function s(x){return xt(x)?(n.consume(x),f):x===64?a(x):d(x)}function f(x){return x===43||x===45||x===46||pt(x)?(u=1,m(x)):d(x)}function m(x){return x===58?(n.consume(x),u=0,p):(x===43||x===45||x===46||pt(x))&&u++<32?(n.consume(x),m):(u=0,d(x))}function p(x){return x===62?(n.exit("autolinkProtocol"),n.enter("autolinkMarker"),n.consume(x),n.exit("autolinkMarker"),n.exit("autolink"),i):x===null||x===32||x===60||Eu(x)?a(x):(n.consume(x),p)}function d(x){return x===64?(n.consume(x),b):px(x)?(n.consume(x),d):a(x)}function b(x){return pt(x)?g(x):a(x)}function g(x){return x===46?(n.consume(x),u=0,b):x===62?(n.exit("autolinkProtocol").type="autolinkEmail",n.enter("autolinkMarker"),n.consume(x),n.exit("autolinkMarker"),n.exit("autolink"),i):S(x)}function S(x){if((x===45||pt(x))&&u++<63){const A=x===45?S:g;return n.consume(x),A}return a(x)}}const Qa={partial:!0,tokenize:Tx};function Tx(n,i,a){return u;function u(s){return we(s)?Re(n,c,"linePrefix")(s):c(s)}function c(s){return s===null||fe(s)?i(s):a(s)}}const ny={continuation:{tokenize:Dx},exit:Rx,name:"blockQuote",tokenize:zx};function zx(n,i,a){const u=this;return c;function c(f){if(f===62){const m=u.containerState;return m.open||(n.enter("blockQuote",{_container:!0}),m.open=!0),n.enter("blockQuotePrefix"),n.enter("blockQuoteMarker"),n.consume(f),n.exit("blockQuoteMarker"),s}return a(f)}function s(f){return we(f)?(n.enter("blockQuotePrefixWhitespace"),n.consume(f),n.exit("blockQuotePrefixWhitespace"),n.exit("blockQuotePrefix"),i):(n.exit("blockQuotePrefix"),i(f))}}function Dx(n,i,a){const u=this;return c;function c(f){return we(f)?Re(n,s,"linePrefix",u.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(f):s(f)}function s(f){return n.attempt(ny,i,a)(f)}}function Rx(n){n.exit("blockQuote")}const ly={name:"characterEscape",tokenize:_x};function _x(n,i,a){return u;function u(s){return n.enter("characterEscape"),n.enter("escapeMarker"),n.consume(s),n.exit("escapeMarker"),c}function c(s){return yx(s)?(n.enter("characterEscapeValue"),n.consume(s),n.exit("characterEscapeValue"),n.exit("characterEscape"),i):a(s)}}const iy={name:"characterReference",tokenize:Mx};function Mx(n,i,a){const u=this;let c=0,s,f;return m;function m(g){return n.enter("characterReference"),n.enter("characterReferenceMarker"),n.consume(g),n.exit("characterReferenceMarker"),p}function p(g){return g===35?(n.enter("characterReferenceMarkerNumeric"),n.consume(g),n.exit("characterReferenceMarkerNumeric"),d):(n.enter("characterReferenceValue"),s=31,f=pt,b(g))}function d(g){return g===88||g===120?(n.enter("characterReferenceMarkerHexadecimal"),n.consume(g),n.exit("characterReferenceMarkerHexadecimal"),n.enter("characterReferenceValue"),s=6,f=gx,b):(n.enter("characterReferenceValue"),s=7,f=Ts,b(g))}function b(g){if(g===59&&c){const S=n.exit("characterReferenceValue");return f===pt&&!Ks(u.sliceSerialize(S))?a(g):(n.enter("characterReferenceMarker"),n.consume(g),n.exit("characterReferenceMarker"),n.exit("characterReference"),i)}return f(g)&&c++<s?(n.consume(g),b):a(g)}}const Bp={partial:!0,tokenize:Nx},Up={concrete:!0,name:"codeFenced",tokenize:Ox};function Ox(n,i,a){const u=this,c={partial:!0,tokenize:le};let s=0,f=0,m;return p;function p(q){return d(q)}function d(q){const $=u.events[u.events.length-1];return s=$&&$[1].type==="linePrefix"?$[2].sliceSerialize($[1],!0).length:0,m=q,n.enter("codeFenced"),n.enter("codeFencedFence"),n.enter("codeFencedFenceSequence"),b(q)}function b(q){return q===m?(f++,n.consume(q),b):f<3?a(q):(n.exit("codeFencedFenceSequence"),we(q)?Re(n,g,"whitespace")(q):g(q))}function g(q){return q===null||fe(q)?(n.exit("codeFencedFence"),u.interrupt?i(q):n.check(Bp,M,ne)(q)):(n.enter("codeFencedFenceInfo"),n.enter("chunkString",{contentType:"string"}),S(q))}function S(q){return q===null||fe(q)?(n.exit("chunkString"),n.exit("codeFencedFenceInfo"),g(q)):we(q)?(n.exit("chunkString"),n.exit("codeFencedFenceInfo"),Re(n,x,"whitespace")(q)):q===96&&q===m?a(q):(n.consume(q),S)}function x(q){return q===null||fe(q)?g(q):(n.enter("codeFencedFenceMeta"),n.enter("chunkString",{contentType:"string"}),A(q))}function A(q){return q===null||fe(q)?(n.exit("chunkString"),n.exit("codeFencedFenceMeta"),g(q)):q===96&&q===m?a(q):(n.consume(q),A)}function M(q){return n.attempt(c,ne,R)(q)}function R(q){return n.enter("lineEnding"),n.consume(q),n.exit("lineEnding"),D}function D(q){return s>0&&we(q)?Re(n,G,"linePrefix",s+1)(q):G(q)}function G(q){return q===null||fe(q)?n.check(Bp,M,ne)(q):(n.enter("codeFlowValue"),U(q))}function U(q){return q===null||fe(q)?(n.exit("codeFlowValue"),G(q)):(n.consume(q),U)}function ne(q){return n.exit("codeFenced"),i(q)}function le(q,$,se){let me=0;return B;function B(K){return q.enter("lineEnding"),q.consume(K),q.exit("lineEnding"),te}function te(K){return q.enter("codeFencedFence"),we(K)?Re(q,ee,"linePrefix",u.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(K):ee(K)}function ee(K){return K===m?(q.enter("codeFencedFenceSequence"),xe(K)):se(K)}function xe(K){return K===m?(me++,q.consume(K),xe):me>=f?(q.exit("codeFencedFenceSequence"),we(K)?Re(q,ae,"whitespace")(K):ae(K)):se(K)}function ae(K){return K===null||fe(K)?(q.exit("codeFencedFence"),$(K)):se(K)}}}function Nx(n,i,a){const u=this;return c;function c(f){return f===null?a(f):(n.enter("lineEnding"),n.consume(f),n.exit("lineEnding"),s)}function s(f){return u.parser.lazy[u.now().line]?a(f):i(f)}}const us={name:"codeIndented",tokenize:Lx},jx={partial:!0,tokenize:Bx};function Lx(n,i,a){const u=this;return c;function c(d){return n.enter("codeIndented"),Re(n,s,"linePrefix",5)(d)}function s(d){const b=u.events[u.events.length-1];return b&&b[1].type==="linePrefix"&&b[2].sliceSerialize(b[1],!0).length>=4?f(d):a(d)}function f(d){return d===null?p(d):fe(d)?n.attempt(jx,f,p)(d):(n.enter("codeFlowValue"),m(d))}function m(d){return d===null||fe(d)?(n.exit("codeFlowValue"),f(d)):(n.consume(d),m)}function p(d){return n.exit("codeIndented"),i(d)}}function Bx(n,i,a){const u=this;return c;function c(f){return u.parser.lazy[u.now().line]?a(f):fe(f)?(n.enter("lineEnding"),n.consume(f),n.exit("lineEnding"),c):Re(n,s,"linePrefix",5)(f)}function s(f){const m=u.events[u.events.length-1];return m&&m[1].type==="linePrefix"&&m[2].sliceSerialize(m[1],!0).length>=4?i(f):fe(f)?c(f):a(f)}}const Ux={name:"codeText",previous:qx,resolve:Hx,tokenize:Yx};function Hx(n){let i=n.length-4,a=3,u,c;if((n[a][1].type==="lineEnding"||n[a][1].type==="space")&&(n[i][1].type==="lineEnding"||n[i][1].type==="space")){for(u=a;++u<i;)if(n[u][1].type==="codeTextData"){n[a][1].type="codeTextPadding",n[i][1].type="codeTextPadding",a+=2,i-=2;break}}for(u=a-1,i++;++u<=i;)c===void 0?u!==i&&n[u][1].type!=="lineEnding"&&(c=u):(u===i||n[u][1].type==="lineEnding")&&(n[c][1].type="codeTextData",u!==c+2&&(n[c][1].end=n[u-1][1].end,n.splice(c+2,u-c-2),i-=u-c-2,u=c+2),c=void 0);return n}function qx(n){return n!==96||this.events[this.events.length-1][1].type==="characterEscape"}function Yx(n,i,a){let u=0,c,s;return f;function f(g){return n.enter("codeText"),n.enter("codeTextSequence"),m(g)}function m(g){return g===96?(n.consume(g),u++,m):(n.exit("codeTextSequence"),p(g))}function p(g){return g===null?a(g):g===32?(n.enter("space"),n.consume(g),n.exit("space"),p):g===96?(s=n.enter("codeTextSequence"),c=0,b(g)):fe(g)?(n.enter("lineEnding"),n.consume(g),n.exit("lineEnding"),p):(n.enter("codeTextData"),d(g))}function d(g){return g===null||g===32||g===96||fe(g)?(n.exit("codeTextData"),p(g)):(n.consume(g),d)}function b(g){return g===96?(n.consume(g),c++,b):c===u?(n.exit("codeTextSequence"),n.exit("codeText"),i(g)):(s.type="codeTextData",d(g))}}class Vx{constructor(i){this.left=i?[...i]:[],this.right=[]}get(i){if(i<0||i>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+i+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return i<this.left.length?this.left[i]:this.right[this.right.length-i+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(i,a){const u=a??Number.POSITIVE_INFINITY;return u<this.left.length?this.left.slice(i,u):i>this.left.length?this.right.slice(this.right.length-u+this.left.length,this.right.length-i+this.left.length).reverse():this.left.slice(i).concat(this.right.slice(this.right.length-u+this.left.length).reverse())}splice(i,a,u){const c=a||0;this.setCursor(Math.trunc(i));const s=this.right.splice(this.right.length-c,Number.POSITIVE_INFINITY);return u&&_a(this.left,u),s.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(i){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(i)}pushMany(i){this.setCursor(Number.POSITIVE_INFINITY),_a(this.left,i)}unshift(i){this.setCursor(0),this.right.push(i)}unshiftMany(i){this.setCursor(0),_a(this.right,i.reverse())}setCursor(i){if(!(i===this.left.length||i>this.left.length&&this.right.length===0||i<0&&this.left.length===0))if(i<this.left.length){const a=this.left.splice(i,Number.POSITIVE_INFINITY);_a(this.right,a.reverse())}else{const a=this.right.splice(this.left.length+this.right.length-i,Number.POSITIVE_INFINITY);_a(this.left,a.reverse())}}}function _a(n,i){let a=0;if(i.length<1e4)n.push(...i);else for(;a<i.length;)n.push(...i.slice(a,a+1e4)),a+=1e4}function ay(n){const i={};let a=-1,u,c,s,f,m,p,d;const b=new Vx(n);for(;++a<b.length;){for(;a in i;)a=i[a];if(u=b.get(a),a&&u[1].type==="chunkFlow"&&b.get(a-1)[1].type==="listItemPrefix"&&(p=u[1]._tokenizer.events,s=0,s<p.length&&p[s][1].type==="lineEndingBlank"&&(s+=2),s<p.length&&p[s][1].type==="content"))for(;++s<p.length&&p[s][1].type!=="content";)p[s][1].type==="chunkText"&&(p[s][1]._isInFirstContentOfListItem=!0,s++);if(u[0]==="enter")u[1].contentType&&(Object.assign(i,Gx(b,a)),a=i[a],d=!0);else if(u[1]._container){for(s=a,c=void 0;s--;)if(f=b.get(s),f[1].type==="lineEnding"||f[1].type==="lineEndingBlank")f[0]==="enter"&&(c&&(b.get(c)[1].type="lineEndingBlank"),f[1].type="lineEnding",c=s);else if(!(f[1].type==="linePrefix"||f[1].type==="listItemIndent"))break;c&&(u[1].end={...b.get(c)[1].start},m=b.slice(c,a),m.unshift(u),b.splice(c,a-c+1,m))}}return qt(n,0,Number.POSITIVE_INFINITY,b.slice(0)),!d}function Gx(n,i){const a=n.get(i)[1],u=n.get(i)[2];let c=i-1;const s=[];let f=a._tokenizer;f||(f=u.parser[a.contentType](a.start),a._contentTypeTextTrailing&&(f._contentTypeTextTrailing=!0));const m=f.events,p=[],d={};let b,g,S=-1,x=a,A=0,M=0;const R=[M];for(;x;){for(;n.get(++c)[1]!==x;);s.push(c),x._tokenizer||(b=u.sliceStream(x),x.next||b.push(null),g&&f.defineSkip(x.start),x._isInFirstContentOfListItem&&(f._gfmTasklistFirstContentOfListItem=!0),f.write(b),x._isInFirstContentOfListItem&&(f._gfmTasklistFirstContentOfListItem=void 0)),g=x,x=x.next}for(x=a;++S<m.length;)m[S][0]==="exit"&&m[S-1][0]==="enter"&&m[S][1].type===m[S-1][1].type&&m[S][1].start.line!==m[S][1].end.line&&(M=S+1,R.push(M),x._tokenizer=void 0,x.previous=void 0,x=x.next);for(f.events=[],x?(x._tokenizer=void 0,x.previous=void 0):R.pop(),S=R.length;S--;){const D=m.slice(R[S],R[S+1]),G=s.pop();p.push([G,G+D.length-1]),n.splice(G,2,D)}for(p.reverse(),S=-1;++S<p.length;)d[A+p[S][0]]=A+p[S][1],A+=p[S][1]-p[S][0]-1;return d}const Xx={resolve:Fx,tokenize:Zx},Qx={partial:!0,tokenize:Ix};function Fx(n){return ay(n),n}function Zx(n,i){let a;return u;function u(m){return n.enter("content"),a=n.enter("chunkContent",{contentType:"content"}),c(m)}function c(m){return m===null?s(m):fe(m)?n.check(Qx,f,s)(m):(n.consume(m),c)}function s(m){return n.exit("chunkContent"),n.exit("content"),i(m)}function f(m){return n.consume(m),n.exit("chunkContent"),a.next=n.enter("chunkContent",{contentType:"content",previous:a}),a=a.next,c}}function Ix(n,i,a){const u=this;return c;function c(f){return n.exit("chunkContent"),n.enter("lineEnding"),n.consume(f),n.exit("lineEnding"),Re(n,s,"linePrefix")}function s(f){if(f===null||fe(f))return a(f);const m=u.events[u.events.length-1];return!u.parser.constructs.disable.null.includes("codeIndented")&&m&&m[1].type==="linePrefix"&&m[2].sliceSerialize(m[1],!0).length>=4?i(f):n.interrupt(u.parser.constructs.flow,a,i)(f)}}function ry(n,i,a,u,c,s,f,m,p){const d=p||Number.POSITIVE_INFINITY;let b=0;return g;function g(D){return D===60?(n.enter(u),n.enter(c),n.enter(s),n.consume(D),n.exit(s),S):D===null||D===32||D===41||Eu(D)?a(D):(n.enter(u),n.enter(f),n.enter(m),n.enter("chunkString",{contentType:"string"}),M(D))}function S(D){return D===62?(n.enter(s),n.consume(D),n.exit(s),n.exit(c),n.exit(u),i):(n.enter(m),n.enter("chunkString",{contentType:"string"}),x(D))}function x(D){return D===62?(n.exit("chunkString"),n.exit(m),S(D)):D===null||D===60||fe(D)?a(D):(n.consume(D),D===92?A:x)}function A(D){return D===60||D===62||D===92?(n.consume(D),x):x(D)}function M(D){return!b&&(D===null||D===41||Ge(D))?(n.exit("chunkString"),n.exit(m),n.exit(f),n.exit(u),i(D)):b<d&&D===40?(n.consume(D),b++,M):D===41?(n.consume(D),b--,M):D===null||D===32||D===40||Eu(D)?a(D):(n.consume(D),D===92?R:M)}function R(D){return D===40||D===41||D===92?(n.consume(D),M):M(D)}}function uy(n,i,a,u,c,s){const f=this;let m=0,p;return d;function d(x){return n.enter(u),n.enter(c),n.consume(x),n.exit(c),n.enter(s),b}function b(x){return m>999||x===null||x===91||x===93&&!p||x===94&&!m&&"_hiddenFootnoteSupport"in f.parser.constructs?a(x):x===93?(n.exit(s),n.enter(c),n.consume(x),n.exit(c),n.exit(u),i):fe(x)?(n.enter("lineEnding"),n.consume(x),n.exit("lineEnding"),b):(n.enter("chunkString",{contentType:"string"}),g(x))}function g(x){return x===null||x===91||x===93||fe(x)||m++>999?(n.exit("chunkString"),b(x)):(n.consume(x),p||(p=!we(x)),x===92?S:g)}function S(x){return x===91||x===92||x===93?(n.consume(x),m++,g):g(x)}}function oy(n,i,a,u,c,s){let f;return m;function m(S){return S===34||S===39||S===40?(n.enter(u),n.enter(c),n.consume(S),n.exit(c),f=S===40?41:S,p):a(S)}function p(S){return S===f?(n.enter(c),n.consume(S),n.exit(c),n.exit(u),i):(n.enter(s),d(S))}function d(S){return S===f?(n.exit(s),p(f)):S===null?a(S):fe(S)?(n.enter("lineEnding"),n.consume(S),n.exit("lineEnding"),Re(n,d,"linePrefix")):(n.enter("chunkString",{contentType:"string"}),b(S))}function b(S){return S===f||S===null||fe(S)?(n.exit("chunkString"),d(S)):(n.consume(S),S===92?g:b)}function g(S){return S===f||S===92?(n.consume(S),b):b(S)}}function Na(n,i){let a;return u;function u(c){return fe(c)?(n.enter("lineEnding"),n.consume(c),n.exit("lineEnding"),a=!0,u):we(c)?Re(n,u,a?"linePrefix":"lineSuffix")(c):i(c)}}const Kx={name:"definition",tokenize:Wx},Jx={partial:!0,tokenize:$x};function Wx(n,i,a){const u=this;let c;return s;function s(x){return n.enter("definition"),f(x)}function f(x){return uy.call(u,n,m,a,"definitionLabel","definitionLabelMarker","definitionLabelString")(x)}function m(x){return c=an(u.sliceSerialize(u.events[u.events.length-1][1]).slice(1,-1)),x===58?(n.enter("definitionMarker"),n.consume(x),n.exit("definitionMarker"),p):a(x)}function p(x){return Ge(x)?Na(n,d)(x):d(x)}function d(x){return ry(n,b,a,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(x)}function b(x){return n.attempt(Jx,g,g)(x)}function g(x){return we(x)?Re(n,S,"whitespace")(x):S(x)}function S(x){return x===null||fe(x)?(n.exit("definition"),u.parser.defined.push(c),i(x)):a(x)}}function $x(n,i,a){return u;function u(m){return Ge(m)?Na(n,c)(m):a(m)}function c(m){return oy(n,s,a,"definitionTitle","definitionTitleMarker","definitionTitleString")(m)}function s(m){return we(m)?Re(n,f,"whitespace")(m):f(m)}function f(m){return m===null||fe(m)?i(m):a(m)}}const Px={name:"hardBreakEscape",tokenize:eS};function eS(n,i,a){return u;function u(s){return n.enter("hardBreakEscape"),n.consume(s),c}function c(s){return fe(s)?(n.exit("hardBreakEscape"),i(s)):a(s)}}const tS={name:"headingAtx",resolve:nS,tokenize:lS};function nS(n,i){let a=n.length-2,u=3,c,s;return n[u][1].type==="whitespace"&&(u+=2),a-2>u&&n[a][1].type==="whitespace"&&(a-=2),n[a][1].type==="atxHeadingSequence"&&(u===a-1||a-4>u&&n[a-2][1].type==="whitespace")&&(a-=u+1===a?2:4),a>u&&(c={type:"atxHeadingText",start:n[u][1].start,end:n[a][1].end},s={type:"chunkText",start:n[u][1].start,end:n[a][1].end,contentType:"text"},qt(n,u,a-u+1,[["enter",c,i],["enter",s,i],["exit",s,i],["exit",c,i]])),n}function lS(n,i,a){let u=0;return c;function c(b){return n.enter("atxHeading"),s(b)}function s(b){return n.enter("atxHeadingSequence"),f(b)}function f(b){return b===35&&u++<6?(n.consume(b),f):b===null||Ge(b)?(n.exit("atxHeadingSequence"),m(b)):a(b)}function m(b){return b===35?(n.enter("atxHeadingSequence"),p(b)):b===null||fe(b)?(n.exit("atxHeading"),i(b)):we(b)?Re(n,m,"whitespace")(b):(n.enter("atxHeadingText"),d(b))}function p(b){return b===35?(n.consume(b),p):(n.exit("atxHeadingSequence"),m(b))}function d(b){return b===null||b===35||Ge(b)?(n.exit("atxHeadingText"),m(b)):(n.consume(b),d)}}const iS=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Hp=["pre","script","style","textarea"],aS={concrete:!0,name:"htmlFlow",resolveTo:oS,tokenize:cS},rS={partial:!0,tokenize:fS},uS={partial:!0,tokenize:sS};function oS(n){let i=n.length;for(;i--&&!(n[i][0]==="enter"&&n[i][1].type==="htmlFlow"););return i>1&&n[i-2][1].type==="linePrefix"&&(n[i][1].start=n[i-2][1].start,n[i+1][1].start=n[i-2][1].start,n.splice(i-2,2)),n}function cS(n,i,a){const u=this;let c,s,f,m,p;return d;function d(k){return b(k)}function b(k){return n.enter("htmlFlow"),n.enter("htmlFlowData"),n.consume(k),g}function g(k){return k===33?(n.consume(k),S):k===47?(n.consume(k),s=!0,M):k===63?(n.consume(k),c=3,u.interrupt?i:C):xt(k)?(n.consume(k),f=String.fromCharCode(k),R):a(k)}function S(k){return k===45?(n.consume(k),c=2,x):k===91?(n.consume(k),c=5,m=0,A):xt(k)?(n.consume(k),c=4,u.interrupt?i:C):a(k)}function x(k){return k===45?(n.consume(k),u.interrupt?i:C):a(k)}function A(k){const P="CDATA[";return k===P.charCodeAt(m++)?(n.consume(k),m===P.length?u.interrupt?i:ee:A):a(k)}function M(k){return xt(k)?(n.consume(k),f=String.fromCharCode(k),R):a(k)}function R(k){if(k===null||k===47||k===62||Ge(k)){const P=k===47,de=f.toLowerCase();return!P&&!s&&Hp.includes(de)?(c=1,u.interrupt?i(k):ee(k)):iS.includes(f.toLowerCase())?(c=6,P?(n.consume(k),D):u.interrupt?i(k):ee(k)):(c=7,u.interrupt&&!u.parser.lazy[u.now().line]?a(k):s?G(k):U(k))}return k===45||pt(k)?(n.consume(k),f+=String.fromCharCode(k),R):a(k)}function D(k){return k===62?(n.consume(k),u.interrupt?i:ee):a(k)}function G(k){return we(k)?(n.consume(k),G):B(k)}function U(k){return k===47?(n.consume(k),B):k===58||k===95||xt(k)?(n.consume(k),ne):we(k)?(n.consume(k),U):B(k)}function ne(k){return k===45||k===46||k===58||k===95||pt(k)?(n.consume(k),ne):le(k)}function le(k){return k===61?(n.consume(k),q):we(k)?(n.consume(k),le):U(k)}function q(k){return k===null||k===60||k===61||k===62||k===96?a(k):k===34||k===39?(n.consume(k),p=k,$):we(k)?(n.consume(k),q):se(k)}function $(k){return k===p?(n.consume(k),p=null,me):k===null||fe(k)?a(k):(n.consume(k),$)}function se(k){return k===null||k===34||k===39||k===47||k===60||k===61||k===62||k===96||Ge(k)?le(k):(n.consume(k),se)}function me(k){return k===47||k===62||we(k)?U(k):a(k)}function B(k){return k===62?(n.consume(k),te):a(k)}function te(k){return k===null||fe(k)?ee(k):we(k)?(n.consume(k),te):a(k)}function ee(k){return k===45&&c===2?(n.consume(k),L):k===60&&c===1?(n.consume(k),I):k===62&&c===4?(n.consume(k),T):k===63&&c===3?(n.consume(k),C):k===93&&c===5?(n.consume(k),Se):fe(k)&&(c===6||c===7)?(n.exit("htmlFlowData"),n.check(rS,X,xe)(k)):k===null||fe(k)?(n.exit("htmlFlowData"),xe(k)):(n.consume(k),ee)}function xe(k){return n.check(uS,ae,X)(k)}function ae(k){return n.enter("lineEnding"),n.consume(k),n.exit("lineEnding"),K}function K(k){return k===null||fe(k)?xe(k):(n.enter("htmlFlowData"),ee(k))}function L(k){return k===45?(n.consume(k),C):ee(k)}function I(k){return k===47?(n.consume(k),f="",ue):ee(k)}function ue(k){if(k===62){const P=f.toLowerCase();return Hp.includes(P)?(n.consume(k),T):ee(k)}return xt(k)&&f.length<8?(n.consume(k),f+=String.fromCharCode(k),ue):ee(k)}function Se(k){return k===93?(n.consume(k),C):ee(k)}function C(k){return k===62?(n.consume(k),T):k===45&&c===2?(n.consume(k),C):ee(k)}function T(k){return k===null||fe(k)?(n.exit("htmlFlowData"),X(k)):(n.consume(k),T)}function X(k){return n.exit("htmlFlow"),i(k)}}function sS(n,i,a){const u=this;return c;function c(f){return fe(f)?(n.enter("lineEnding"),n.consume(f),n.exit("lineEnding"),s):a(f)}function s(f){return u.parser.lazy[u.now().line]?a(f):i(f)}}function fS(n,i,a){return u;function u(c){return n.enter("lineEnding"),n.consume(c),n.exit("lineEnding"),n.attempt(Qa,i,a)}}const hS={name:"htmlText",tokenize:dS};function dS(n,i,a){const u=this;let c,s,f;return m;function m(C){return n.enter("htmlText"),n.enter("htmlTextData"),n.consume(C),p}function p(C){return C===33?(n.consume(C),d):C===47?(n.consume(C),le):C===63?(n.consume(C),U):xt(C)?(n.consume(C),se):a(C)}function d(C){return C===45?(n.consume(C),b):C===91?(n.consume(C),s=0,A):xt(C)?(n.consume(C),G):a(C)}function b(C){return C===45?(n.consume(C),x):a(C)}function g(C){return C===null?a(C):C===45?(n.consume(C),S):fe(C)?(f=g,I(C)):(n.consume(C),g)}function S(C){return C===45?(n.consume(C),x):g(C)}function x(C){return C===62?L(C):C===45?S(C):g(C)}function A(C){const T="CDATA[";return C===T.charCodeAt(s++)?(n.consume(C),s===T.length?M:A):a(C)}function M(C){return C===null?a(C):C===93?(n.consume(C),R):fe(C)?(f=M,I(C)):(n.consume(C),M)}function R(C){return C===93?(n.consume(C),D):M(C)}function D(C){return C===62?L(C):C===93?(n.consume(C),D):M(C)}function G(C){return C===null||C===62?L(C):fe(C)?(f=G,I(C)):(n.consume(C),G)}function U(C){return C===null?a(C):C===63?(n.consume(C),ne):fe(C)?(f=U,I(C)):(n.consume(C),U)}function ne(C){return C===62?L(C):U(C)}function le(C){return xt(C)?(n.consume(C),q):a(C)}function q(C){return C===45||pt(C)?(n.consume(C),q):$(C)}function $(C){return fe(C)?(f=$,I(C)):we(C)?(n.consume(C),$):L(C)}function se(C){return C===45||pt(C)?(n.consume(C),se):C===47||C===62||Ge(C)?me(C):a(C)}function me(C){return C===47?(n.consume(C),L):C===58||C===95||xt(C)?(n.consume(C),B):fe(C)?(f=me,I(C)):we(C)?(n.consume(C),me):L(C)}function B(C){return C===45||C===46||C===58||C===95||pt(C)?(n.consume(C),B):te(C)}function te(C){return C===61?(n.consume(C),ee):fe(C)?(f=te,I(C)):we(C)?(n.consume(C),te):me(C)}function ee(C){return C===null||C===60||C===61||C===62||C===96?a(C):C===34||C===39?(n.consume(C),c=C,xe):fe(C)?(f=ee,I(C)):we(C)?(n.consume(C),ee):(n.consume(C),ae)}function xe(C){return C===c?(n.consume(C),c=void 0,K):C===null?a(C):fe(C)?(f=xe,I(C)):(n.consume(C),xe)}function ae(C){return C===null||C===34||C===39||C===60||C===61||C===96?a(C):C===47||C===62||Ge(C)?me(C):(n.consume(C),ae)}function K(C){return C===47||C===62||Ge(C)?me(C):a(C)}function L(C){return C===62?(n.consume(C),n.exit("htmlTextData"),n.exit("htmlText"),i):a(C)}function I(C){return n.exit("htmlTextData"),n.enter("lineEnding"),n.consume(C),n.exit("lineEnding"),ue}function ue(C){return we(C)?Re(n,Se,"linePrefix",u.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(C):Se(C)}function Se(C){return n.enter("htmlTextData"),f(C)}}const Js={name:"labelEnd",resolveAll:yS,resolveTo:bS,tokenize:vS},mS={tokenize:xS},pS={tokenize:SS},gS={tokenize:ES};function yS(n){let i=-1;const a=[];for(;++i<n.length;){const u=n[i][1];if(a.push(n[i]),u.type==="labelImage"||u.type==="labelLink"||u.type==="labelEnd"){const c=u.type==="labelImage"?4:2;u.type="data",i+=c}}return n.length!==a.length&&qt(n,0,n.length,a),n}function bS(n,i){let a=n.length,u=0,c,s,f,m;for(;a--;)if(c=n[a][1],s){if(c.type==="link"||c.type==="labelLink"&&c._inactive)break;n[a][0]==="enter"&&c.type==="labelLink"&&(c._inactive=!0)}else if(f){if(n[a][0]==="enter"&&(c.type==="labelImage"||c.type==="labelLink")&&!c._balanced&&(s=a,c.type!=="labelLink")){u=2;break}}else c.type==="labelEnd"&&(f=a);const p={type:n[s][1].type==="labelLink"?"link":"image",start:{...n[s][1].start},end:{...n[n.length-1][1].end}},d={type:"label",start:{...n[s][1].start},end:{...n[f][1].end}},b={type:"labelText",start:{...n[s+u+2][1].end},end:{...n[f-2][1].start}};return m=[["enter",p,i],["enter",d,i]],m=$t(m,n.slice(s+1,s+u+3)),m=$t(m,[["enter",b,i]]),m=$t(m,Du(i.parser.constructs.insideSpan.null,n.slice(s+u+4,f-3),i)),m=$t(m,[["exit",b,i],n[f-2],n[f-1],["exit",d,i]]),m=$t(m,n.slice(f+1)),m=$t(m,[["exit",p,i]]),qt(n,s,n.length,m),n}function vS(n,i,a){const u=this;let c=u.events.length,s,f;for(;c--;)if((u.events[c][1].type==="labelImage"||u.events[c][1].type==="labelLink")&&!u.events[c][1]._balanced){s=u.events[c][1];break}return m;function m(S){return s?s._inactive?g(S):(f=u.parser.defined.includes(an(u.sliceSerialize({start:s.end,end:u.now()}))),n.enter("labelEnd"),n.enter("labelMarker"),n.consume(S),n.exit("labelMarker"),n.exit("labelEnd"),p):a(S)}function p(S){return S===40?n.attempt(mS,b,f?b:g)(S):S===91?n.attempt(pS,b,f?d:g)(S):f?b(S):g(S)}function d(S){return n.attempt(gS,b,g)(S)}function b(S){return i(S)}function g(S){return s._balanced=!0,a(S)}}function xS(n,i,a){return u;function u(g){return n.enter("resource"),n.enter("resourceMarker"),n.consume(g),n.exit("resourceMarker"),c}function c(g){return Ge(g)?Na(n,s)(g):s(g)}function s(g){return g===41?b(g):ry(n,f,m,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(g)}function f(g){return Ge(g)?Na(n,p)(g):b(g)}function m(g){return a(g)}function p(g){return g===34||g===39||g===40?oy(n,d,a,"resourceTitle","resourceTitleMarker","resourceTitleString")(g):b(g)}function d(g){return Ge(g)?Na(n,b)(g):b(g)}function b(g){return g===41?(n.enter("resourceMarker"),n.consume(g),n.exit("resourceMarker"),n.exit("resource"),i):a(g)}}function SS(n,i,a){const u=this;return c;function c(m){return uy.call(u,n,s,f,"reference","referenceMarker","referenceString")(m)}function s(m){return u.parser.defined.includes(an(u.sliceSerialize(u.events[u.events.length-1][1]).slice(1,-1)))?i(m):a(m)}function f(m){return a(m)}}function ES(n,i,a){return u;function u(s){return n.enter("reference"),n.enter("referenceMarker"),n.consume(s),n.exit("referenceMarker"),c}function c(s){return s===93?(n.enter("referenceMarker"),n.consume(s),n.exit("referenceMarker"),n.exit("reference"),i):a(s)}}const kS={name:"labelStartImage",resolveAll:Js.resolveAll,tokenize:CS};function CS(n,i,a){const u=this;return c;function c(m){return n.enter("labelImage"),n.enter("labelImageMarker"),n.consume(m),n.exit("labelImageMarker"),s}function s(m){return m===91?(n.enter("labelMarker"),n.consume(m),n.exit("labelMarker"),n.exit("labelImage"),f):a(m)}function f(m){return m===94&&"_hiddenFootnoteSupport"in u.parser.constructs?a(m):i(m)}}const wS={name:"labelStartLink",resolveAll:Js.resolveAll,tokenize:AS};function AS(n,i,a){const u=this;return c;function c(f){return n.enter("labelLink"),n.enter("labelMarker"),n.consume(f),n.exit("labelMarker"),n.exit("labelLink"),s}function s(f){return f===94&&"_hiddenFootnoteSupport"in u.parser.constructs?a(f):i(f)}}const os={name:"lineEnding",tokenize:TS};function TS(n,i){return a;function a(u){return n.enter("lineEnding"),n.consume(u),n.exit("lineEnding"),Re(n,i,"linePrefix")}}const vu={name:"thematicBreak",tokenize:zS};function zS(n,i,a){let u=0,c;return s;function s(d){return n.enter("thematicBreak"),f(d)}function f(d){return c=d,m(d)}function m(d){return d===c?(n.enter("thematicBreakSequence"),p(d)):u>=3&&(d===null||fe(d))?(n.exit("thematicBreak"),i(d)):a(d)}function p(d){return d===c?(n.consume(d),u++,p):(n.exit("thematicBreakSequence"),we(d)?Re(n,m,"whitespace")(d):m(d))}}const Dt={continuation:{tokenize:MS},exit:NS,name:"list",tokenize:_S},DS={partial:!0,tokenize:jS},RS={partial:!0,tokenize:OS};function _S(n,i,a){const u=this,c=u.events[u.events.length-1];let s=c&&c[1].type==="linePrefix"?c[2].sliceSerialize(c[1],!0).length:0,f=0;return m;function m(x){const A=u.containerState.type||(x===42||x===43||x===45?"listUnordered":"listOrdered");if(A==="listUnordered"?!u.containerState.marker||x===u.containerState.marker:Ts(x)){if(u.containerState.type||(u.containerState.type=A,n.enter(A,{_container:!0})),A==="listUnordered")return n.enter("listItemPrefix"),x===42||x===45?n.check(vu,a,d)(x):d(x);if(!u.interrupt||x===49)return n.enter("listItemPrefix"),n.enter("listItemValue"),p(x)}return a(x)}function p(x){return Ts(x)&&++f<10?(n.consume(x),p):(!u.interrupt||f<2)&&(u.containerState.marker?x===u.containerState.marker:x===41||x===46)?(n.exit("listItemValue"),d(x)):a(x)}function d(x){return n.enter("listItemMarker"),n.consume(x),n.exit("listItemMarker"),u.containerState.marker=u.containerState.marker||x,n.check(Qa,u.interrupt?a:b,n.attempt(DS,S,g))}function b(x){return u.containerState.initialBlankLine=!0,s++,S(x)}function g(x){return we(x)?(n.enter("listItemPrefixWhitespace"),n.consume(x),n.exit("listItemPrefixWhitespace"),S):a(x)}function S(x){return u.containerState.size=s+u.sliceSerialize(n.exit("listItemPrefix"),!0).length,i(x)}}function MS(n,i,a){const u=this;return u.containerState._closeFlow=void 0,n.check(Qa,c,s);function c(m){return u.containerState.furtherBlankLines=u.containerState.furtherBlankLines||u.containerState.initialBlankLine,Re(n,i,"listItemIndent",u.containerState.size+1)(m)}function s(m){return u.containerState.furtherBlankLines||!we(m)?(u.containerState.furtherBlankLines=void 0,u.containerState.initialBlankLine=void 0,f(m)):(u.containerState.furtherBlankLines=void 0,u.containerState.initialBlankLine=void 0,n.attempt(RS,i,f)(m))}function f(m){return u.containerState._closeFlow=!0,u.interrupt=void 0,Re(n,n.attempt(Dt,i,a),"linePrefix",u.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(m)}}function OS(n,i,a){const u=this;return Re(n,c,"listItemIndent",u.containerState.size+1);function c(s){const f=u.events[u.events.length-1];return f&&f[1].type==="listItemIndent"&&f[2].sliceSerialize(f[1],!0).length===u.containerState.size?i(s):a(s)}}function NS(n){n.exit(this.containerState.type)}function jS(n,i,a){const u=this;return Re(n,c,"listItemPrefixWhitespace",u.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function c(s){const f=u.events[u.events.length-1];return!we(s)&&f&&f[1].type==="listItemPrefixWhitespace"?i(s):a(s)}}const qp={name:"setextUnderline",resolveTo:LS,tokenize:BS};function LS(n,i){let a=n.length,u,c,s;for(;a--;)if(n[a][0]==="enter"){if(n[a][1].type==="content"){u=a;break}n[a][1].type==="paragraph"&&(c=a)}else n[a][1].type==="content"&&n.splice(a,1),!s&&n[a][1].type==="definition"&&(s=a);const f={type:"setextHeading",start:{...n[u][1].start},end:{...n[n.length-1][1].end}};return n[c][1].type="setextHeadingText",s?(n.splice(c,0,["enter",f,i]),n.splice(s+1,0,["exit",n[u][1],i]),n[u][1].end={...n[s][1].end}):n[u][1]=f,n.push(["exit",f,i]),n}function BS(n,i,a){const u=this;let c;return s;function s(d){let b=u.events.length,g;for(;b--;)if(u.events[b][1].type!=="lineEnding"&&u.events[b][1].type!=="linePrefix"&&u.events[b][1].type!=="content"){g=u.events[b][1].type==="paragraph";break}return!u.parser.lazy[u.now().line]&&(u.interrupt||g)?(n.enter("setextHeadingLine"),c=d,f(d)):a(d)}function f(d){return n.enter("setextHeadingLineSequence"),m(d)}function m(d){return d===c?(n.consume(d),m):(n.exit("setextHeadingLineSequence"),we(d)?Re(n,p,"lineSuffix")(d):p(d))}function p(d){return d===null||fe(d)?(n.exit("setextHeadingLine"),i(d)):a(d)}}const US={tokenize:HS};function HS(n){const i=this,a=n.attempt(Qa,u,n.attempt(this.parser.constructs.flowInitial,c,Re(n,n.attempt(this.parser.constructs.flow,c,n.attempt(Xx,c)),"linePrefix")));return a;function u(s){if(s===null){n.consume(s);return}return n.enter("lineEndingBlank"),n.consume(s),n.exit("lineEndingBlank"),i.currentConstruct=void 0,a}function c(s){if(s===null){n.consume(s);return}return n.enter("lineEnding"),n.consume(s),n.exit("lineEnding"),i.currentConstruct=void 0,a}}const qS={resolveAll:sy()},YS=cy("string"),VS=cy("text");function cy(n){return{resolveAll:sy(n==="text"?GS:void 0),tokenize:i};function i(a){const u=this,c=this.parser.constructs[n],s=a.attempt(c,f,m);return f;function f(b){return d(b)?s(b):m(b)}function m(b){if(b===null){a.consume(b);return}return a.enter("data"),a.consume(b),p}function p(b){return d(b)?(a.exit("data"),s(b)):(a.consume(b),p)}function d(b){if(b===null)return!0;const g=c[b];let S=-1;if(g)for(;++S<g.length;){const x=g[S];if(!x.previous||x.previous.call(u,u.previous))return!0}return!1}}}function sy(n){return i;function i(a,u){let c=-1,s;for(;++c<=a.length;)s===void 0?a[c]&&a[c][1].type==="data"&&(s=c,c++):(!a[c]||a[c][1].type!=="data")&&(c!==s+2&&(a[s][1].end=a[c-1][1].end,a.splice(s+2,c-s-2),c=s+2),s=void 0);return n?n(a,u):a}}function GS(n,i){let a=0;for(;++a<=n.length;)if((a===n.length||n[a][1].type==="lineEnding")&&n[a-1][1].type==="data"){const u=n[a-1][1],c=i.sliceStream(u);let s=c.length,f=-1,m=0,p;for(;s--;){const d=c[s];if(typeof d=="string"){for(f=d.length;d.charCodeAt(f-1)===32;)m++,f--;if(f)break;f=-1}else if(d===-2)p=!0,m++;else if(d!==-1){s++;break}}if(i._contentTypeTextTrailing&&a===n.length&&(m=0),m){const d={type:a===n.length||p||m<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:s?f:u.start._bufferIndex+f,_index:u.start._index+s,line:u.end.line,column:u.end.column-m,offset:u.end.offset-m},end:{...u.end}};u.end={...d.start},u.start.offset===u.end.offset?Object.assign(u,d):(n.splice(a,0,["enter",d,i],["exit",d,i]),a+=2)}a++}return n}const XS={42:Dt,43:Dt,45:Dt,48:Dt,49:Dt,50:Dt,51:Dt,52:Dt,53:Dt,54:Dt,55:Dt,56:Dt,57:Dt,62:ny},QS={91:Kx},FS={[-2]:us,[-1]:us,32:us},ZS={35:tS,42:vu,45:[qp,vu],60:aS,61:qp,95:vu,96:Up,126:Up},IS={38:iy,92:ly},KS={[-5]:os,[-4]:os,[-3]:os,33:kS,38:iy,42:zs,60:[wx,hS],91:wS,92:[Px,ly],93:Js,95:zs,96:Ux},JS={null:[zs,qS]},WS={null:[42,95]},$S={null:[]},PS=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:WS,contentInitial:QS,disable:$S,document:XS,flow:ZS,flowInitial:FS,insideSpan:JS,string:IS,text:KS},Symbol.toStringTag,{value:"Module"}));function eE(n,i,a){let u={_bufferIndex:-1,_index:0,line:a&&a.line||1,column:a&&a.column||1,offset:a&&a.offset||0};const c={},s=[];let f=[],m=[];const p={attempt:$(le),check:$(q),consume:G,enter:U,exit:ne,interrupt:$(q,{interrupt:!0})},d={code:null,containerState:{},defineSkip:M,events:[],now:A,parser:n,previous:null,sliceSerialize:S,sliceStream:x,write:g};let b=i.tokenize.call(d,p);return i.resolveAll&&s.push(i),d;function g(te){return f=$t(f,te),R(),f[f.length-1]!==null?[]:(se(i,0),d.events=Du(s,d.events,d),d.events)}function S(te,ee){return nE(x(te),ee)}function x(te){return tE(f,te)}function A(){const{_bufferIndex:te,_index:ee,line:xe,column:ae,offset:K}=u;return{_bufferIndex:te,_index:ee,line:xe,column:ae,offset:K}}function M(te){c[te.line]=te.column,B()}function R(){let te;for(;u._index<f.length;){const ee=f[u._index];if(typeof ee=="string")for(te=u._index,u._bufferIndex<0&&(u._bufferIndex=0);u._index===te&&u._bufferIndex<ee.length;)D(ee.charCodeAt(u._bufferIndex));else D(ee)}}function D(te){b=b(te)}function G(te){fe(te)?(u.line++,u.column=1,u.offset+=te===-3?2:1,B()):te!==-1&&(u.column++,u.offset++),u._bufferIndex<0?u._index++:(u._bufferIndex++,u._bufferIndex===f[u._index].length&&(u._bufferIndex=-1,u._index++)),d.previous=te}function U(te,ee){const xe=ee||{};return xe.type=te,xe.start=A(),d.events.push(["enter",xe,d]),m.push(xe),xe}function ne(te){const ee=m.pop();return ee.end=A(),d.events.push(["exit",ee,d]),ee}function le(te,ee){se(te,ee.from)}function q(te,ee){ee.restore()}function $(te,ee){return xe;function xe(ae,K,L){let I,ue,Se,C;return Array.isArray(ae)?X(ae):"tokenize"in ae?X([ae]):T(ae);function T(oe){return Ae;function Ae(Ze){const Be=Ze!==null&&oe[Ze],Yt=Ze!==null&&oe.null,pn=[...Array.isArray(Be)?Be:Be?[Be]:[],...Array.isArray(Yt)?Yt:Yt?[Yt]:[]];return X(pn)(Ze)}}function X(oe){return I=oe,ue=0,oe.length===0?L:k(oe[ue])}function k(oe){return Ae;function Ae(Ze){return C=me(),Se=oe,oe.partial||(d.currentConstruct=oe),oe.name&&d.parser.constructs.disable.null.includes(oe.name)?de():oe.tokenize.call(ee?Object.assign(Object.create(d),ee):d,p,P,de)(Ze)}}function P(oe){return te(Se,C),K}function de(oe){return C.restore(),++ue<I.length?k(I[ue]):L}}}function se(te,ee){te.resolveAll&&!s.includes(te)&&s.push(te),te.resolve&&qt(d.events,ee,d.events.length-ee,te.resolve(d.events.slice(ee),d)),te.resolveTo&&(d.events=te.resolveTo(d.events,d))}function me(){const te=A(),ee=d.previous,xe=d.currentConstruct,ae=d.events.length,K=Array.from(m);return{from:ae,restore:L};function L(){u=te,d.previous=ee,d.currentConstruct=xe,d.events.length=ae,m=K,B()}}function B(){u.line in c&&u.column<2&&(u.column=c[u.line],u.offset+=c[u.line]-1)}}function tE(n,i){const a=i.start._index,u=i.start._bufferIndex,c=i.end._index,s=i.end._bufferIndex;let f;if(a===c)f=[n[a].slice(u,s)];else{if(f=n.slice(a,c),u>-1){const m=f[0];typeof m=="string"?f[0]=m.slice(u):f.shift()}s>0&&f.push(n[c].slice(0,s))}return f}function nE(n,i){let a=-1;const u=[];let c;for(;++a<n.length;){const s=n[a];let f;if(typeof s=="string")f=s;else switch(s){case-5:{f="\r";break}case-4:{f=`
`;break}case-3:{f=`\r
`;break}case-2:{f=i?" ":"	";break}case-1:{if(!i&&c)continue;f=" ";break}default:f=String.fromCharCode(s)}c=s===-2,u.push(f)}return u.join("")}function lE(n){const u={constructs:ey([PS,...(n||{}).extensions||[]]),content:c(bx),defined:[],document:c(xx),flow:c(US),lazy:{},string:c(YS),text:c(VS)};return u;function c(s){return f;function f(m){return eE(u,s,m)}}}function iE(n){for(;!ay(n););return n}const Yp=/[\0\t\n\r]/g;function aE(){let n=1,i="",a=!0,u;return c;function c(s,f,m){const p=[];let d,b,g,S,x;for(s=i+(typeof s=="string"?s.toString():new TextDecoder(f||void 0).decode(s)),g=0,i="",a&&(s.charCodeAt(0)===65279&&g++,a=void 0);g<s.length;){if(Yp.lastIndex=g,d=Yp.exec(s),S=d&&d.index!==void 0?d.index:s.length,x=s.charCodeAt(S),!d){i=s.slice(g);break}if(x===10&&g===S&&u)p.push(-3),u=void 0;else switch(u&&(p.push(-5),u=void 0),g<S&&(p.push(s.slice(g,S)),n+=S-g),x){case 0:{p.push(65533),n++;break}case 9:{for(b=Math.ceil(n/4)*4,p.push(-2);n++<b;)p.push(-1);break}case 10:{p.push(-4),n=1;break}default:u=!0,n=1}g=S+1}return m&&(u&&p.push(-5),i&&p.push(i),p.push(null)),p}}const rE=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function uE(n){return n.replace(rE,oE)}function oE(n,i,a){if(i)return i;if(a.charCodeAt(0)===35){const c=a.charCodeAt(1),s=c===120||c===88;return ty(a.slice(s?2:1),s?16:10)}return Ks(a)||n}const fy={}.hasOwnProperty;function cE(n,i,a){return i&&typeof i=="object"&&(a=i,i=void 0),sE(a)(iE(lE(a).document().write(aE()(n,i,!0))))}function sE(n){const i={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:s(jl),autolinkProtocol:me,autolinkEmail:me,atxHeading:s(Ol),blockQuote:s(Yt),characterEscape:me,characterReference:me,codeFenced:s(pn),codeFencedFenceInfo:f,codeFencedFenceMeta:f,codeIndented:s(pn,f),codeText:s(Mi,f),codeTextData:me,data:me,codeFlowValue:me,definition:s(Za),definitionDestinationString:f,definitionLabelString:f,definitionTitleString:f,emphasis:s(gn),hardBreakEscape:s(Nl),hardBreakTrailing:s(Nl),htmlFlow:s(Ia,f),htmlFlowData:me,htmlText:s(Ia,f),htmlTextData:me,image:s(Ka),label:f,link:s(jl),listItem:s(Oi),listItemValue:S,listOrdered:s(Ll,g),listUnordered:s(Ll),paragraph:s(Ou),reference:k,referenceString:f,resourceDestinationString:f,resourceTitleString:f,setextHeading:s(Ol),strong:s(Nu),thematicBreak:s(ju)},exit:{atxHeading:p(),atxHeadingSequence:le,autolink:p(),autolinkEmail:Be,autolinkProtocol:Ze,blockQuote:p(),characterEscapeValue:B,characterReferenceMarkerHexadecimal:de,characterReferenceMarkerNumeric:de,characterReferenceValue:oe,characterReference:Ae,codeFenced:p(R),codeFencedFence:M,codeFencedFenceInfo:x,codeFencedFenceMeta:A,codeFlowValue:B,codeIndented:p(D),codeText:p(K),codeTextData:B,data:B,definition:p(),definitionDestinationString:ne,definitionLabelString:G,definitionTitleString:U,emphasis:p(),hardBreakEscape:p(ee),hardBreakTrailing:p(ee),htmlFlow:p(xe),htmlFlowData:B,htmlText:p(ae),htmlTextData:B,image:p(I),label:Se,labelText:ue,lineEnding:te,link:p(L),listItem:p(),listOrdered:p(),listUnordered:p(),paragraph:p(),referenceString:P,resourceDestinationString:C,resourceTitleString:T,resource:X,setextHeading:p(se),setextHeadingLineSequence:$,setextHeadingText:q,strong:p(),thematicBreak:p()}};hy(i,(n||{}).mdastExtensions||[]);const a={};return u;function u(Q){let W={type:"root",children:[]};const pe={stack:[W],tokenStack:[],config:i,enter:m,exit:d,buffer:f,resume:b,data:a},Ee=[];let Ne=-1;for(;++Ne<Q.length;)if(Q[Ne][1].type==="listOrdered"||Q[Ne][1].type==="listUnordered")if(Q[Ne][0]==="enter")Ee.push(Ne);else{const _t=Ee.pop();Ne=c(Q,_t,Ne)}for(Ne=-1;++Ne<Q.length;){const _t=i[Q[Ne][0]];fy.call(_t,Q[Ne][1].type)&&_t[Q[Ne][1].type].call(Object.assign({sliceSerialize:Q[Ne][2].sliceSerialize},pe),Q[Ne][1])}if(pe.tokenStack.length>0){const _t=pe.tokenStack[pe.tokenStack.length-1];(_t[1]||Vp).call(pe,void 0,_t[0])}for(W.position={start:sl(Q.length>0?Q[0][1].start:{line:1,column:1,offset:0}),end:sl(Q.length>0?Q[Q.length-2][1].end:{line:1,column:1,offset:0})},Ne=-1;++Ne<i.transforms.length;)W=i.transforms[Ne](W)||W;return W}function c(Q,W,pe){let Ee=W-1,Ne=-1,_t=!1,yn,bt,at,St;for(;++Ee<=pe;){const Ye=Q[Ee];switch(Ye[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{Ye[0]==="enter"?Ne++:Ne--,St=void 0;break}case"lineEndingBlank":{Ye[0]==="enter"&&(yn&&!St&&!Ne&&!at&&(at=Ee),St=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:St=void 0}if(!Ne&&Ye[0]==="enter"&&Ye[1].type==="listItemPrefix"||Ne===-1&&Ye[0]==="exit"&&(Ye[1].type==="listUnordered"||Ye[1].type==="listOrdered")){if(yn){let Hn=Ee;for(bt=void 0;Hn--;){const en=Q[Hn];if(en[1].type==="lineEnding"||en[1].type==="lineEndingBlank"){if(en[0]==="exit")continue;bt&&(Q[bt][1].type="lineEndingBlank",_t=!0),en[1].type="lineEnding",bt=Hn}else if(!(en[1].type==="linePrefix"||en[1].type==="blockQuotePrefix"||en[1].type==="blockQuotePrefixWhitespace"||en[1].type==="blockQuoteMarker"||en[1].type==="listItemIndent"))break}at&&(!bt||at<bt)&&(yn._spread=!0),yn.end=Object.assign({},bt?Q[bt][1].start:Ye[1].end),Q.splice(bt||Ee,0,["exit",yn,Ye[2]]),Ee++,pe++}if(Ye[1].type==="listItemPrefix"){const Hn={type:"listItem",_spread:!1,start:Object.assign({},Ye[1].start),end:void 0};yn=Hn,Q.splice(Ee,0,["enter",Hn,Ye[2]]),Ee++,pe++,at=void 0,St=!0}}}return Q[W][1]._spread=_t,pe}function s(Q,W){return pe;function pe(Ee){m.call(this,Q(Ee),Ee),W&&W.call(this,Ee)}}function f(){this.stack.push({type:"fragment",children:[]})}function m(Q,W,pe){this.stack[this.stack.length-1].children.push(Q),this.stack.push(Q),this.tokenStack.push([W,pe||void 0]),Q.position={start:sl(W.start),end:void 0}}function p(Q){return W;function W(pe){Q&&Q.call(this,pe),d.call(this,pe)}}function d(Q,W){const pe=this.stack.pop(),Ee=this.tokenStack.pop();if(Ee)Ee[0].type!==Q.type&&(W?W.call(this,Q,Ee[0]):(Ee[1]||Vp).call(this,Q,Ee[0]));else throw new Error("Cannot close `"+Q.type+"` ("+Oa({start:Q.start,end:Q.end})+"): it’s not open");pe.position.end=sl(Q.end)}function b(){return Is(this.stack.pop())}function g(){this.data.expectingFirstListItemValue=!0}function S(Q){if(this.data.expectingFirstListItemValue){const W=this.stack[this.stack.length-2];W.start=Number.parseInt(this.sliceSerialize(Q),10),this.data.expectingFirstListItemValue=void 0}}function x(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.lang=Q}function A(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.meta=Q}function M(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function R(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.value=Q.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function D(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.value=Q.replace(/(\r?\n|\r)$/g,"")}function G(Q){const W=this.resume(),pe=this.stack[this.stack.length-1];pe.label=W,pe.identifier=an(this.sliceSerialize(Q)).toLowerCase()}function U(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.title=Q}function ne(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.url=Q}function le(Q){const W=this.stack[this.stack.length-1];if(!W.depth){const pe=this.sliceSerialize(Q).length;W.depth=pe}}function q(){this.data.setextHeadingSlurpLineEnding=!0}function $(Q){const W=this.stack[this.stack.length-1];W.depth=this.sliceSerialize(Q).codePointAt(0)===61?1:2}function se(){this.data.setextHeadingSlurpLineEnding=void 0}function me(Q){const pe=this.stack[this.stack.length-1].children;let Ee=pe[pe.length-1];(!Ee||Ee.type!=="text")&&(Ee=yt(),Ee.position={start:sl(Q.start),end:void 0},pe.push(Ee)),this.stack.push(Ee)}function B(Q){const W=this.stack.pop();W.value+=this.sliceSerialize(Q),W.position.end=sl(Q.end)}function te(Q){const W=this.stack[this.stack.length-1];if(this.data.atHardBreak){const pe=W.children[W.children.length-1];pe.position.end=sl(Q.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&i.canContainEols.includes(W.type)&&(me.call(this,Q),B.call(this,Q))}function ee(){this.data.atHardBreak=!0}function xe(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.value=Q}function ae(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.value=Q}function K(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.value=Q}function L(){const Q=this.stack[this.stack.length-1];if(this.data.inReference){const W=this.data.referenceType||"shortcut";Q.type+="Reference",Q.referenceType=W,delete Q.url,delete Q.title}else delete Q.identifier,delete Q.label;this.data.referenceType=void 0}function I(){const Q=this.stack[this.stack.length-1];if(this.data.inReference){const W=this.data.referenceType||"shortcut";Q.type+="Reference",Q.referenceType=W,delete Q.url,delete Q.title}else delete Q.identifier,delete Q.label;this.data.referenceType=void 0}function ue(Q){const W=this.sliceSerialize(Q),pe=this.stack[this.stack.length-2];pe.label=uE(W),pe.identifier=an(W).toLowerCase()}function Se(){const Q=this.stack[this.stack.length-1],W=this.resume(),pe=this.stack[this.stack.length-1];if(this.data.inReference=!0,pe.type==="link"){const Ee=Q.children;pe.children=Ee}else pe.alt=W}function C(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.url=Q}function T(){const Q=this.resume(),W=this.stack[this.stack.length-1];W.title=Q}function X(){this.data.inReference=void 0}function k(){this.data.referenceType="collapsed"}function P(Q){const W=this.resume(),pe=this.stack[this.stack.length-1];pe.label=W,pe.identifier=an(this.sliceSerialize(Q)).toLowerCase(),this.data.referenceType="full"}function de(Q){this.data.characterReferenceType=Q.type}function oe(Q){const W=this.sliceSerialize(Q),pe=this.data.characterReferenceType;let Ee;pe?(Ee=ty(W,pe==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):Ee=Ks(W);const Ne=this.stack[this.stack.length-1];Ne.value+=Ee}function Ae(Q){const W=this.stack.pop();W.position.end=sl(Q.end)}function Ze(Q){B.call(this,Q);const W=this.stack[this.stack.length-1];W.url=this.sliceSerialize(Q)}function Be(Q){B.call(this,Q);const W=this.stack[this.stack.length-1];W.url="mailto:"+this.sliceSerialize(Q)}function Yt(){return{type:"blockquote",children:[]}}function pn(){return{type:"code",lang:null,meta:null,value:""}}function Mi(){return{type:"inlineCode",value:""}}function Za(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function gn(){return{type:"emphasis",children:[]}}function Ol(){return{type:"heading",depth:0,children:[]}}function Nl(){return{type:"break"}}function Ia(){return{type:"html",value:""}}function Ka(){return{type:"image",title:null,url:"",alt:null}}function jl(){return{type:"link",title:null,url:"",children:[]}}function Ll(Q){return{type:"list",ordered:Q.type==="listOrdered",start:null,spread:Q._spread,children:[]}}function Oi(Q){return{type:"listItem",spread:Q._spread,checked:null,children:[]}}function Ou(){return{type:"paragraph",children:[]}}function Nu(){return{type:"strong",children:[]}}function yt(){return{type:"text",value:""}}function ju(){return{type:"thematicBreak"}}}function sl(n){return{line:n.line,column:n.column,offset:n.offset}}function hy(n,i){let a=-1;for(;++a<i.length;){const u=i[a];Array.isArray(u)?hy(n,u):fE(n,u)}}function fE(n,i){let a;for(a in i)if(fy.call(i,a))switch(a){case"canContainEols":{const u=i[a];u&&n[a].push(...u);break}case"transforms":{const u=i[a];u&&n[a].push(...u);break}case"enter":case"exit":{const u=i[a];u&&Object.assign(n[a],u);break}}}function Vp(n,i){throw n?new Error("Cannot close `"+n.type+"` ("+Oa({start:n.start,end:n.end})+"): a different token (`"+i.type+"`, "+Oa({start:i.start,end:i.end})+") is open"):new Error("Cannot close document, a token (`"+i.type+"`, "+Oa({start:i.start,end:i.end})+") is still open")}function hE(n){const i=this;i.parser=a;function a(u){return cE(u,{...i.data("settings"),...n,extensions:i.data("micromarkExtensions")||[],mdastExtensions:i.data("fromMarkdownExtensions")||[]})}}function dE(n,i){const a={type:"element",tagName:"blockquote",properties:{},children:n.wrap(n.all(i),!0)};return n.patch(i,a),n.applyData(i,a)}function mE(n,i){const a={type:"element",tagName:"br",properties:{},children:[]};return n.patch(i,a),[n.applyData(i,a),{type:"text",value:`
`}]}function pE(n,i){const a=i.value?i.value+`
`:"",u={},c=i.lang?i.lang.split(/\s+/):[];c.length>0&&(u.className=["language-"+c[0]]);let s={type:"element",tagName:"code",properties:u,children:[{type:"text",value:a}]};return i.meta&&(s.data={meta:i.meta}),n.patch(i,s),s=n.applyData(i,s),s={type:"element",tagName:"pre",properties:{},children:[s]},n.patch(i,s),s}function gE(n,i){const a={type:"element",tagName:"del",properties:{},children:n.all(i)};return n.patch(i,a),n.applyData(i,a)}function yE(n,i){const a={type:"element",tagName:"em",properties:{},children:n.all(i)};return n.patch(i,a),n.applyData(i,a)}function bE(n,i){const a=typeof n.options.clobberPrefix=="string"?n.options.clobberPrefix:"user-content-",u=String(i.identifier).toUpperCase(),c=_i(u.toLowerCase()),s=n.footnoteOrder.indexOf(u);let f,m=n.footnoteCounts.get(u);m===void 0?(m=0,n.footnoteOrder.push(u),f=n.footnoteOrder.length):f=s+1,m+=1,n.footnoteCounts.set(u,m);const p={type:"element",tagName:"a",properties:{href:"#"+a+"fn-"+c,id:a+"fnref-"+c+(m>1?"-"+m:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(f)}]};n.patch(i,p);const d={type:"element",tagName:"sup",properties:{},children:[p]};return n.patch(i,d),n.applyData(i,d)}function vE(n,i){const a={type:"element",tagName:"h"+i.depth,properties:{},children:n.all(i)};return n.patch(i,a),n.applyData(i,a)}function xE(n,i){if(n.options.allowDangerousHtml){const a={type:"raw",value:i.value};return n.patch(i,a),n.applyData(i,a)}}function dy(n,i){const a=i.referenceType;let u="]";if(a==="collapsed"?u+="[]":a==="full"&&(u+="["+(i.label||i.identifier)+"]"),i.type==="imageReference")return[{type:"text",value:"!["+i.alt+u}];const c=n.all(i),s=c[0];s&&s.type==="text"?s.value="["+s.value:c.unshift({type:"text",value:"["});const f=c[c.length-1];return f&&f.type==="text"?f.value+=u:c.push({type:"text",value:u}),c}function SE(n,i){const a=String(i.identifier).toUpperCase(),u=n.definitionById.get(a);if(!u)return dy(n,i);const c={src:_i(u.url||""),alt:i.alt};u.title!==null&&u.title!==void 0&&(c.title=u.title);const s={type:"element",tagName:"img",properties:c,children:[]};return n.patch(i,s),n.applyData(i,s)}function EE(n,i){const a={src:_i(i.url)};i.alt!==null&&i.alt!==void 0&&(a.alt=i.alt),i.title!==null&&i.title!==void 0&&(a.title=i.title);const u={type:"element",tagName:"img",properties:a,children:[]};return n.patch(i,u),n.applyData(i,u)}function kE(n,i){const a={type:"text",value:i.value.replace(/\r?\n|\r/g," ")};n.patch(i,a);const u={type:"element",tagName:"code",properties:{},children:[a]};return n.patch(i,u),n.applyData(i,u)}function CE(n,i){const a=String(i.identifier).toUpperCase(),u=n.definitionById.get(a);if(!u)return dy(n,i);const c={href:_i(u.url||"")};u.title!==null&&u.title!==void 0&&(c.title=u.title);const s={type:"element",tagName:"a",properties:c,children:n.all(i)};return n.patch(i,s),n.applyData(i,s)}function wE(n,i){const a={href:_i(i.url)};i.title!==null&&i.title!==void 0&&(a.title=i.title);const u={type:"element",tagName:"a",properties:a,children:n.all(i)};return n.patch(i,u),n.applyData(i,u)}function AE(n,i,a){const u=n.all(i),c=a?TE(a):my(i),s={},f=[];if(typeof i.checked=="boolean"){const b=u[0];let g;b&&b.type==="element"&&b.tagName==="p"?g=b:(g={type:"element",tagName:"p",properties:{},children:[]},u.unshift(g)),g.children.length>0&&g.children.unshift({type:"text",value:" "}),g.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:i.checked,disabled:!0},children:[]}),s.className=["task-list-item"]}let m=-1;for(;++m<u.length;){const b=u[m];(c||m!==0||b.type!=="element"||b.tagName!=="p")&&f.push({type:"text",value:`
`}),b.type==="element"&&b.tagName==="p"&&!c?f.push(...b.children):f.push(b)}const p=u[u.length-1];p&&(c||p.type!=="element"||p.tagName!=="p")&&f.push({type:"text",value:`
`});const d={type:"element",tagName:"li",properties:s,children:f};return n.patch(i,d),n.applyData(i,d)}function TE(n){let i=!1;if(n.type==="list"){i=n.spread||!1;const a=n.children;let u=-1;for(;!i&&++u<a.length;)i=my(a[u])}return i}function my(n){const i=n.spread;return i??n.children.length>1}function zE(n,i){const a={},u=n.all(i);let c=-1;for(typeof i.start=="number"&&i.start!==1&&(a.start=i.start);++c<u.length;){const f=u[c];if(f.type==="element"&&f.tagName==="li"&&f.properties&&Array.isArray(f.properties.className)&&f.properties.className.includes("task-list-item")){a.className=["contains-task-list"];break}}const s={type:"element",tagName:i.ordered?"ol":"ul",properties:a,children:n.wrap(u,!0)};return n.patch(i,s),n.applyData(i,s)}function DE(n,i){const a={type:"element",tagName:"p",properties:{},children:n.all(i)};return n.patch(i,a),n.applyData(i,a)}function RE(n,i){const a={type:"root",children:n.wrap(n.all(i))};return n.patch(i,a),n.applyData(i,a)}function _E(n,i){const a={type:"element",tagName:"strong",properties:{},children:n.all(i)};return n.patch(i,a),n.applyData(i,a)}function ME(n,i){const a=n.all(i),u=a.shift(),c=[];if(u){const f={type:"element",tagName:"thead",properties:{},children:n.wrap([u],!0)};n.patch(i.children[0],f),c.push(f)}if(a.length>0){const f={type:"element",tagName:"tbody",properties:{},children:n.wrap(a,!0)},m=Xs(i.children[1]),p=Zg(i.children[i.children.length-1]);m&&p&&(f.position={start:m,end:p}),c.push(f)}const s={type:"element",tagName:"table",properties:{},children:n.wrap(c,!0)};return n.patch(i,s),n.applyData(i,s)}function OE(n,i,a){const u=a?a.children:void 0,s=(u?u.indexOf(i):1)===0?"th":"td",f=a&&a.type==="table"?a.align:void 0,m=f?f.length:i.children.length;let p=-1;const d=[];for(;++p<m;){const g=i.children[p],S={},x=f?f[p]:void 0;x&&(S.align=x);let A={type:"element",tagName:s,properties:S,children:[]};g&&(A.children=n.all(g),n.patch(g,A),A=n.applyData(g,A)),d.push(A)}const b={type:"element",tagName:"tr",properties:{},children:n.wrap(d,!0)};return n.patch(i,b),n.applyData(i,b)}function NE(n,i){const a={type:"element",tagName:"td",properties:{},children:n.all(i)};return n.patch(i,a),n.applyData(i,a)}const Gp=9,Xp=32;function jE(n){const i=String(n),a=/\r?\n|\r/g;let u=a.exec(i),c=0;const s=[];for(;u;)s.push(Qp(i.slice(c,u.index),c>0,!0),u[0]),c=u.index+u[0].length,u=a.exec(i);return s.push(Qp(i.slice(c),c>0,!1)),s.join("")}function Qp(n,i,a){let u=0,c=n.length;if(i){let s=n.codePointAt(u);for(;s===Gp||s===Xp;)u++,s=n.codePointAt(u)}if(a){let s=n.codePointAt(c-1);for(;s===Gp||s===Xp;)c--,s=n.codePointAt(c-1)}return c>u?n.slice(u,c):""}function LE(n,i){const a={type:"text",value:jE(String(i.value))};return n.patch(i,a),n.applyData(i,a)}function BE(n,i){const a={type:"element",tagName:"hr",properties:{},children:[]};return n.patch(i,a),n.applyData(i,a)}const UE={blockquote:dE,break:mE,code:pE,delete:gE,emphasis:yE,footnoteReference:bE,heading:vE,html:xE,imageReference:SE,image:EE,inlineCode:kE,linkReference:CE,link:wE,listItem:AE,list:zE,paragraph:DE,root:RE,strong:_E,table:ME,tableCell:NE,tableRow:OE,text:LE,thematicBreak:BE,toml:du,yaml:du,definition:du,footnoteDefinition:du};function du(){}const py=-1,Ru=0,ja=1,ku=2,Ws=3,$s=4,Ps=5,ef=6,gy=7,yy=8,Fp=typeof self=="object"?self:globalThis,HE=(n,i)=>{const a=(c,s)=>(n.set(s,c),c),u=c=>{if(n.has(c))return n.get(c);const[s,f]=i[c];switch(s){case Ru:case py:return a(f,c);case ja:{const m=a([],c);for(const p of f)m.push(u(p));return m}case ku:{const m=a({},c);for(const[p,d]of f)m[u(p)]=u(d);return m}case Ws:return a(new Date(f),c);case $s:{const{source:m,flags:p}=f;return a(new RegExp(m,p),c)}case Ps:{const m=a(new Map,c);for(const[p,d]of f)m.set(u(p),u(d));return m}case ef:{const m=a(new Set,c);for(const p of f)m.add(u(p));return m}case gy:{const{name:m,message:p}=f;return a(new Fp[m](p),c)}case yy:return a(BigInt(f),c);case"BigInt":return a(Object(BigInt(f)),c);case"ArrayBuffer":return a(new Uint8Array(f).buffer,f);case"DataView":{const{buffer:m}=new Uint8Array(f);return a(new DataView(m),f)}}return a(new Fp[s](f),c)};return u},Zp=n=>HE(new Map,n)(0),Ei="",{toString:qE}={},{keys:YE}=Object,Ma=n=>{const i=typeof n;if(i!=="object"||!n)return[Ru,i];const a=qE.call(n).slice(8,-1);switch(a){case"Array":return[ja,Ei];case"Object":return[ku,Ei];case"Date":return[Ws,Ei];case"RegExp":return[$s,Ei];case"Map":return[Ps,Ei];case"Set":return[ef,Ei];case"DataView":return[ja,a]}return a.includes("Array")?[ja,a]:a.includes("Error")?[gy,a]:[ku,a]},mu=([n,i])=>n===Ru&&(i==="function"||i==="symbol"),VE=(n,i,a,u)=>{const c=(f,m)=>{const p=u.push(f)-1;return a.set(m,p),p},s=f=>{if(a.has(f))return a.get(f);let[m,p]=Ma(f);switch(m){case Ru:{let b=f;switch(p){case"bigint":m=yy,b=f.toString();break;case"function":case"symbol":if(n)throw new TypeError("unable to serialize "+p);b=null;break;case"undefined":return c([py],f)}return c([m,b],f)}case ja:{if(p){let S=f;return p==="DataView"?S=new Uint8Array(f.buffer):p==="ArrayBuffer"&&(S=new Uint8Array(f)),c([p,[...S]],f)}const b=[],g=c([m,b],f);for(const S of f)b.push(s(S));return g}case ku:{if(p)switch(p){case"BigInt":return c([p,f.toString()],f);case"Boolean":case"Number":case"String":return c([p,f.valueOf()],f)}if(i&&"toJSON"in f)return s(f.toJSON());const b=[],g=c([m,b],f);for(const S of YE(f))(n||!mu(Ma(f[S])))&&b.push([s(S),s(f[S])]);return g}case Ws:return c([m,f.toISOString()],f);case $s:{const{source:b,flags:g}=f;return c([m,{source:b,flags:g}],f)}case Ps:{const b=[],g=c([m,b],f);for(const[S,x]of f)(n||!(mu(Ma(S))||mu(Ma(x))))&&b.push([s(S),s(x)]);return g}case ef:{const b=[],g=c([m,b],f);for(const S of f)(n||!mu(Ma(S)))&&b.push(s(S));return g}}const{message:d}=f;return c([m,{name:p,message:d}],f)};return s},Ip=(n,{json:i,lossy:a}={})=>{const u=[];return VE(!(i||a),!!i,new Map,u)(n),u},Cu=typeof structuredClone=="function"?(n,i)=>i&&("json"in i||"lossy"in i)?Zp(Ip(n,i)):structuredClone(n):(n,i)=>Zp(Ip(n,i));function GE(n,i){const a=[{type:"text",value:"↩"}];return i>1&&a.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(i)}]}),a}function XE(n,i){return"Back to reference "+(n+1)+(i>1?"-"+i:"")}function QE(n){const i=typeof n.options.clobberPrefix=="string"?n.options.clobberPrefix:"user-content-",a=n.options.footnoteBackContent||GE,u=n.options.footnoteBackLabel||XE,c=n.options.footnoteLabel||"Footnotes",s=n.options.footnoteLabelTagName||"h2",f=n.options.footnoteLabelProperties||{className:["sr-only"]},m=[];let p=-1;for(;++p<n.footnoteOrder.length;){const d=n.footnoteById.get(n.footnoteOrder[p]);if(!d)continue;const b=n.all(d),g=String(d.identifier).toUpperCase(),S=_i(g.toLowerCase());let x=0;const A=[],M=n.footnoteCounts.get(g);for(;M!==void 0&&++x<=M;){A.length>0&&A.push({type:"text",value:" "});let G=typeof a=="string"?a:a(p,x);typeof G=="string"&&(G={type:"text",value:G}),A.push({type:"element",tagName:"a",properties:{href:"#"+i+"fnref-"+S+(x>1?"-"+x:""),dataFootnoteBackref:"",ariaLabel:typeof u=="string"?u:u(p,x),className:["data-footnote-backref"]},children:Array.isArray(G)?G:[G]})}const R=b[b.length-1];if(R&&R.type==="element"&&R.tagName==="p"){const G=R.children[R.children.length-1];G&&G.type==="text"?G.value+=" ":R.children.push({type:"text",value:" "}),R.children.push(...A)}else b.push(...A);const D={type:"element",tagName:"li",properties:{id:i+"fn-"+S},children:n.wrap(b,!0)};n.patch(d,D),m.push(D)}if(m.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:s,properties:{...Cu(f),id:"footnote-label"},children:[{type:"text",value:c}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:n.wrap(m,!0)},{type:"text",value:`
`}]}}const _u=(function(n){if(n==null)return KE;if(typeof n=="function")return Mu(n);if(typeof n=="object")return Array.isArray(n)?FE(n):ZE(n);if(typeof n=="string")return IE(n);throw new Error("Expected function, string, or object as test")});function FE(n){const i=[];let a=-1;for(;++a<n.length;)i[a]=_u(n[a]);return Mu(u);function u(...c){let s=-1;for(;++s<i.length;)if(i[s].apply(this,c))return!0;return!1}}function ZE(n){const i=n;return Mu(a);function a(u){const c=u;let s;for(s in n)if(c[s]!==i[s])return!1;return!0}}function IE(n){return Mu(i);function i(a){return a&&a.type===n}}function Mu(n){return i;function i(a,u,c){return!!(JE(a)&&n.call(this,a,typeof u=="number"?u:void 0,c||void 0))}}function KE(){return!0}function JE(n){return n!==null&&typeof n=="object"&&"type"in n}const by=[],WE=!0,Ds=!1,$E="skip";function vy(n,i,a,u){let c;typeof i=="function"&&typeof a!="function"?(u=a,a=i):c=i;const s=_u(c),f=u?-1:1;m(n,void 0,[])();function m(p,d,b){const g=p&&typeof p=="object"?p:{};if(typeof g.type=="string"){const x=typeof g.tagName=="string"?g.tagName:typeof g.name=="string"?g.name:void 0;Object.defineProperty(S,"name",{value:"node ("+(p.type+(x?"<"+x+">":""))+")"})}return S;function S(){let x=by,A,M,R;if((!i||s(p,d,b[b.length-1]||void 0))&&(x=PE(a(p,b)),x[0]===Ds))return x;if("children"in p&&p.children){const D=p;if(D.children&&x[0]!==$E)for(M=(u?D.children.length:-1)+f,R=b.concat(D);M>-1&&M<D.children.length;){const G=D.children[M];if(A=m(G,M,R)(),A[0]===Ds)return A;M=typeof A[1]=="number"?A[1]:M+f}}return x}}}function PE(n){return Array.isArray(n)?n:typeof n=="number"?[WE,n]:n==null?by:[n]}function tf(n,i,a,u){let c,s,f;typeof i=="function"&&typeof a!="function"?(s=void 0,f=i,c=a):(s=i,f=a,c=u),vy(n,s,m,c);function m(p,d){const b=d[d.length-1],g=b?b.children.indexOf(p):void 0;return f(p,g,b)}}const Rs={}.hasOwnProperty,e3={};function t3(n,i){const a=i||e3,u=new Map,c=new Map,s=new Map,f={...UE,...a.handlers},m={all:d,applyData:l3,definitionById:u,footnoteById:c,footnoteCounts:s,footnoteOrder:[],handlers:f,one:p,options:a,patch:n3,wrap:a3};return tf(n,function(b){if(b.type==="definition"||b.type==="footnoteDefinition"){const g=b.type==="definition"?u:c,S=String(b.identifier).toUpperCase();g.has(S)||g.set(S,b)}}),m;function p(b,g){const S=b.type,x=m.handlers[S];if(Rs.call(m.handlers,S)&&x)return x(m,b,g);if(m.options.passThrough&&m.options.passThrough.includes(S)){if("children"in b){const{children:M,...R}=b,D=Cu(R);return D.children=m.all(b),D}return Cu(b)}return(m.options.unknownHandler||i3)(m,b,g)}function d(b){const g=[];if("children"in b){const S=b.children;let x=-1;for(;++x<S.length;){const A=m.one(S[x],b);if(A){if(x&&S[x-1].type==="break"&&(!Array.isArray(A)&&A.type==="text"&&(A.value=Kp(A.value)),!Array.isArray(A)&&A.type==="element")){const M=A.children[0];M&&M.type==="text"&&(M.value=Kp(M.value))}Array.isArray(A)?g.push(...A):g.push(A)}}}return g}}function n3(n,i){n.position&&(i.position=X2(n))}function l3(n,i){let a=i;if(n&&n.data){const u=n.data.hName,c=n.data.hChildren,s=n.data.hProperties;if(typeof u=="string")if(a.type==="element")a.tagName=u;else{const f="children"in a?a.children:[a];a={type:"element",tagName:u,properties:{},children:f}}a.type==="element"&&s&&Object.assign(a.properties,Cu(s)),"children"in a&&a.children&&c!==null&&c!==void 0&&(a.children=c)}return a}function i3(n,i){const a=i.data||{},u="value"in i&&!(Rs.call(a,"hProperties")||Rs.call(a,"hChildren"))?{type:"text",value:i.value}:{type:"element",tagName:"div",properties:{},children:n.all(i)};return n.patch(i,u),n.applyData(i,u)}function a3(n,i){const a=[];let u=-1;for(i&&a.push({type:"text",value:`
`});++u<n.length;)u&&a.push({type:"text",value:`
`}),a.push(n[u]);return i&&n.length>0&&a.push({type:"text",value:`
`}),a}function Kp(n){let i=0,a=n.charCodeAt(i);for(;a===9||a===32;)i++,a=n.charCodeAt(i);return n.slice(i)}function Jp(n,i){const a=t3(n,i),u=a.one(n,void 0),c=QE(a),s=Array.isArray(u)?{type:"root",children:u}:u||{type:"root",children:[]};return c&&s.children.push({type:"text",value:`
`},c),s}function r3(n,i){return n&&"run"in n?async function(a,u){const c=Jp(a,{file:u,...i});await n.run(c,u)}:function(a,u){return Jp(a,{file:u,...n||i})}}function Wp(n){if(n)throw n}var cs,$p;function u3(){if($p)return cs;$p=1;var n=Object.prototype.hasOwnProperty,i=Object.prototype.toString,a=Object.defineProperty,u=Object.getOwnPropertyDescriptor,c=function(d){return typeof Array.isArray=="function"?Array.isArray(d):i.call(d)==="[object Array]"},s=function(d){if(!d||i.call(d)!=="[object Object]")return!1;var b=n.call(d,"constructor"),g=d.constructor&&d.constructor.prototype&&n.call(d.constructor.prototype,"isPrototypeOf");if(d.constructor&&!b&&!g)return!1;var S;for(S in d);return typeof S>"u"||n.call(d,S)},f=function(d,b){a&&b.name==="__proto__"?a(d,b.name,{enumerable:!0,configurable:!0,value:b.newValue,writable:!0}):d[b.name]=b.newValue},m=function(d,b){if(b==="__proto__")if(n.call(d,b)){if(u)return u(d,b).value}else return;return d[b]};return cs=function p(){var d,b,g,S,x,A,M=arguments[0],R=1,D=arguments.length,G=!1;for(typeof M=="boolean"&&(G=M,M=arguments[1]||{},R=2),(M==null||typeof M!="object"&&typeof M!="function")&&(M={});R<D;++R)if(d=arguments[R],d!=null)for(b in d)g=m(M,b),S=m(d,b),M!==S&&(G&&S&&(s(S)||(x=c(S)))?(x?(x=!1,A=g&&c(g)?g:[]):A=g&&s(g)?g:{},f(M,{name:b,newValue:p(G,A,S)})):typeof S<"u"&&f(M,{name:b,newValue:S}));return M},cs}var o3=u3();const ss=fg(o3);function _s(n){if(typeof n!="object"||n===null)return!1;const i=Object.getPrototypeOf(n);return(i===null||i===Object.prototype||Object.getPrototypeOf(i)===null)&&!(Symbol.toStringTag in n)&&!(Symbol.iterator in n)}function c3(){const n=[],i={run:a,use:u};return i;function a(...c){let s=-1;const f=c.pop();if(typeof f!="function")throw new TypeError("Expected function as last argument, not "+f);m(null,...c);function m(p,...d){const b=n[++s];let g=-1;if(p){f(p);return}for(;++g<c.length;)(d[g]===null||d[g]===void 0)&&(d[g]=c[g]);c=d,b?s3(b,m)(...d):f(null,...d)}}function u(c){if(typeof c!="function")throw new TypeError("Expected `middelware` to be a function, not "+c);return n.push(c),i}}function s3(n,i){let a;return u;function u(...f){const m=n.length>f.length;let p;m&&f.push(c);try{p=n.apply(this,f)}catch(d){const b=d;if(m&&a)throw b;return c(b)}m||(p&&p.then&&typeof p.then=="function"?p.then(s,c):p instanceof Error?c(p):s(p))}function c(f,...m){a||(a=!0,i(f,...m))}function s(f){c(null,f)}}const fn={basename:f3,dirname:h3,extname:d3,join:m3,sep:"/"};function f3(n,i){if(i!==void 0&&typeof i!="string")throw new TypeError('"ext" argument must be a string');Fa(n);let a=0,u=-1,c=n.length,s;if(i===void 0||i.length===0||i.length>n.length){for(;c--;)if(n.codePointAt(c)===47){if(s){a=c+1;break}}else u<0&&(s=!0,u=c+1);return u<0?"":n.slice(a,u)}if(i===n)return"";let f=-1,m=i.length-1;for(;c--;)if(n.codePointAt(c)===47){if(s){a=c+1;break}}else f<0&&(s=!0,f=c+1),m>-1&&(n.codePointAt(c)===i.codePointAt(m--)?m<0&&(u=c):(m=-1,u=f));return a===u?u=f:u<0&&(u=n.length),n.slice(a,u)}function h3(n){if(Fa(n),n.length===0)return".";let i=-1,a=n.length,u;for(;--a;)if(n.codePointAt(a)===47){if(u){i=a;break}}else u||(u=!0);return i<0?n.codePointAt(0)===47?"/":".":i===1&&n.codePointAt(0)===47?"//":n.slice(0,i)}function d3(n){Fa(n);let i=n.length,a=-1,u=0,c=-1,s=0,f;for(;i--;){const m=n.codePointAt(i);if(m===47){if(f){u=i+1;break}continue}a<0&&(f=!0,a=i+1),m===46?c<0?c=i:s!==1&&(s=1):c>-1&&(s=-1)}return c<0||a<0||s===0||s===1&&c===a-1&&c===u+1?"":n.slice(c,a)}function m3(...n){let i=-1,a;for(;++i<n.length;)Fa(n[i]),n[i]&&(a=a===void 0?n[i]:a+"/"+n[i]);return a===void 0?".":p3(a)}function p3(n){Fa(n);const i=n.codePointAt(0)===47;let a=g3(n,!i);return a.length===0&&!i&&(a="."),a.length>0&&n.codePointAt(n.length-1)===47&&(a+="/"),i?"/"+a:a}function g3(n,i){let a="",u=0,c=-1,s=0,f=-1,m,p;for(;++f<=n.length;){if(f<n.length)m=n.codePointAt(f);else{if(m===47)break;m=47}if(m===47){if(!(c===f-1||s===1))if(c!==f-1&&s===2){if(a.length<2||u!==2||a.codePointAt(a.length-1)!==46||a.codePointAt(a.length-2)!==46){if(a.length>2){if(p=a.lastIndexOf("/"),p!==a.length-1){p<0?(a="",u=0):(a=a.slice(0,p),u=a.length-1-a.lastIndexOf("/")),c=f,s=0;continue}}else if(a.length>0){a="",u=0,c=f,s=0;continue}}i&&(a=a.length>0?a+"/..":"..",u=2)}else a.length>0?a+="/"+n.slice(c+1,f):a=n.slice(c+1,f),u=f-c-1;c=f,s=0}else m===46&&s>-1?s++:s=-1}return a}function Fa(n){if(typeof n!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(n))}const y3={cwd:b3};function b3(){return"/"}function Ms(n){return!!(n!==null&&typeof n=="object"&&"href"in n&&n.href&&"protocol"in n&&n.protocol&&n.auth===void 0)}function v3(n){if(typeof n=="string")n=new URL(n);else if(!Ms(n)){const i=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+n+"`");throw i.code="ERR_INVALID_ARG_TYPE",i}if(n.protocol!=="file:"){const i=new TypeError("The URL must be of scheme file");throw i.code="ERR_INVALID_URL_SCHEME",i}return x3(n)}function x3(n){if(n.hostname!==""){const u=new TypeError('File URL host must be "localhost" or empty on darwin');throw u.code="ERR_INVALID_FILE_URL_HOST",u}const i=n.pathname;let a=-1;for(;++a<i.length;)if(i.codePointAt(a)===37&&i.codePointAt(a+1)===50){const u=i.codePointAt(a+2);if(u===70||u===102){const c=new TypeError("File URL path must not include encoded / characters");throw c.code="ERR_INVALID_FILE_URL_PATH",c}}return decodeURIComponent(i)}const fs=["history","path","basename","stem","extname","dirname"];class xy{constructor(i){let a;i?Ms(i)?a={path:i}:typeof i=="string"||S3(i)?a={value:i}:a=i:a={},this.cwd="cwd"in a?"":y3.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let u=-1;for(;++u<fs.length;){const s=fs[u];s in a&&a[s]!==void 0&&a[s]!==null&&(this[s]=s==="history"?[...a[s]]:a[s])}let c;for(c in a)fs.includes(c)||(this[c]=a[c])}get basename(){return typeof this.path=="string"?fn.basename(this.path):void 0}set basename(i){ds(i,"basename"),hs(i,"basename"),this.path=fn.join(this.dirname||"",i)}get dirname(){return typeof this.path=="string"?fn.dirname(this.path):void 0}set dirname(i){Pp(this.basename,"dirname"),this.path=fn.join(i||"",this.basename)}get extname(){return typeof this.path=="string"?fn.extname(this.path):void 0}set extname(i){if(hs(i,"extname"),Pp(this.dirname,"extname"),i){if(i.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(i.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=fn.join(this.dirname,this.stem+(i||""))}get path(){return this.history[this.history.length-1]}set path(i){Ms(i)&&(i=v3(i)),ds(i,"path"),this.path!==i&&this.history.push(i)}get stem(){return typeof this.path=="string"?fn.basename(this.path,this.extname):void 0}set stem(i){ds(i,"stem"),hs(i,"stem"),this.path=fn.join(this.dirname||"",i+(this.extname||""))}fail(i,a,u){const c=this.message(i,a,u);throw c.fatal=!0,c}info(i,a,u){const c=this.message(i,a,u);return c.fatal=void 0,c}message(i,a,u){const c=new gt(i,a,u);return this.path&&(c.name=this.path+":"+c.name,c.file=this.path),c.fatal=!1,this.messages.push(c),c}toString(i){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(i||void 0).decode(this.value)}}function hs(n,i){if(n&&n.includes(fn.sep))throw new Error("`"+i+"` cannot be a path: did not expect `"+fn.sep+"`")}function ds(n,i){if(!n)throw new Error("`"+i+"` cannot be empty")}function Pp(n,i){if(!n)throw new Error("Setting `"+i+"` requires `path` to be set too")}function S3(n){return!!(n&&typeof n=="object"&&"byteLength"in n&&"byteOffset"in n)}const E3=(function(n){const u=this.constructor.prototype,c=u[n],s=function(){return c.apply(s,arguments)};return Object.setPrototypeOf(s,u),s}),k3={}.hasOwnProperty;class nf extends E3{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=c3()}copy(){const i=new nf;let a=-1;for(;++a<this.attachers.length;){const u=this.attachers[a];i.use(...u)}return i.data(ss(!0,{},this.namespace)),i}data(i,a){return typeof i=="string"?arguments.length===2?(gs("data",this.frozen),this.namespace[i]=a,this):k3.call(this.namespace,i)&&this.namespace[i]||void 0:i?(gs("data",this.frozen),this.namespace=i,this):this.namespace}freeze(){if(this.frozen)return this;const i=this;for(;++this.freezeIndex<this.attachers.length;){const[a,...u]=this.attachers[this.freezeIndex];if(u[0]===!1)continue;u[0]===!0&&(u[0]=void 0);const c=a.call(i,...u);typeof c=="function"&&this.transformers.use(c)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(i){this.freeze();const a=pu(i),u=this.parser||this.Parser;return ms("parse",u),u(String(a),a)}process(i,a){const u=this;return this.freeze(),ms("process",this.parser||this.Parser),ps("process",this.compiler||this.Compiler),a?c(void 0,a):new Promise(c);function c(s,f){const m=pu(i),p=u.parse(m);u.run(p,m,function(b,g,S){if(b||!g||!S)return d(b);const x=g,A=u.stringify(x,S);A3(A)?S.value=A:S.result=A,d(b,S)});function d(b,g){b||!g?f(b):s?s(g):a(void 0,g)}}}processSync(i){let a=!1,u;return this.freeze(),ms("processSync",this.parser||this.Parser),ps("processSync",this.compiler||this.Compiler),this.process(i,c),tg("processSync","process",a),u;function c(s,f){a=!0,Wp(s),u=f}}run(i,a,u){eg(i),this.freeze();const c=this.transformers;return!u&&typeof a=="function"&&(u=a,a=void 0),u?s(void 0,u):new Promise(s);function s(f,m){const p=pu(a);c.run(i,p,d);function d(b,g,S){const x=g||i;b?m(b):f?f(x):u(void 0,x,S)}}}runSync(i,a){let u=!1,c;return this.run(i,a,s),tg("runSync","run",u),c;function s(f,m){Wp(f),c=m,u=!0}}stringify(i,a){this.freeze();const u=pu(a),c=this.compiler||this.Compiler;return ps("stringify",c),eg(i),c(i,u)}use(i,...a){const u=this.attachers,c=this.namespace;if(gs("use",this.frozen),i!=null)if(typeof i=="function")p(i,a);else if(typeof i=="object")Array.isArray(i)?m(i):f(i);else throw new TypeError("Expected usable value, not `"+i+"`");return this;function s(d){if(typeof d=="function")p(d,[]);else if(typeof d=="object")if(Array.isArray(d)){const[b,...g]=d;p(b,g)}else f(d);else throw new TypeError("Expected usable value, not `"+d+"`")}function f(d){if(!("plugins"in d)&&!("settings"in d))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");m(d.plugins),d.settings&&(c.settings=ss(!0,c.settings,d.settings))}function m(d){let b=-1;if(d!=null)if(Array.isArray(d))for(;++b<d.length;){const g=d[b];s(g)}else throw new TypeError("Expected a list of plugins, not `"+d+"`")}function p(d,b){let g=-1,S=-1;for(;++g<u.length;)if(u[g][0]===d){S=g;break}if(S===-1)u.push([d,...b]);else if(b.length>0){let[x,...A]=b;const M=u[S][1];_s(M)&&_s(x)&&(x=ss(!0,M,x)),u[S]=[d,x,...A]}}}}const C3=new nf().freeze();function ms(n,i){if(typeof i!="function")throw new TypeError("Cannot `"+n+"` without `parser`")}function ps(n,i){if(typeof i!="function")throw new TypeError("Cannot `"+n+"` without `compiler`")}function gs(n,i){if(i)throw new Error("Cannot call `"+n+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function eg(n){if(!_s(n)||typeof n.type!="string")throw new TypeError("Expected node, got `"+n+"`")}function tg(n,i,a){if(!a)throw new Error("`"+n+"` finished async. Use `"+i+"` instead")}function pu(n){return w3(n)?n:new xy(n)}function w3(n){return!!(n&&typeof n=="object"&&"message"in n&&"messages"in n)}function A3(n){return typeof n=="string"||T3(n)}function T3(n){return!!(n&&typeof n=="object"&&"byteLength"in n&&"byteOffset"in n)}const z3="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",ng=[],lg={allowDangerousHtml:!0},D3=/^(https?|ircs?|mailto|xmpp)$/i,R3=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function _3(n){const i=M3(n),a=O3(n);return N3(i.runSync(i.parse(a),a),n)}function M3(n){const i=n.rehypePlugins||ng,a=n.remarkPlugins||ng,u=n.remarkRehypeOptions?{...n.remarkRehypeOptions,...lg}:lg;return C3().use(hE).use(a).use(r3,u).use(i)}function O3(n){const i=n.children||"",a=new xy;return typeof i=="string"&&(a.value=i),a}function N3(n,i){const a=i.allowedElements,u=i.allowElement,c=i.components,s=i.disallowedElements,f=i.skipHtml,m=i.unwrapDisallowed,p=i.urlTransform||j3;for(const b of R3)Object.hasOwn(i,b.from)&&(""+b.from+(b.to?"use `"+b.to+"` instead":"remove it")+z3+b.id,void 0);return tf(n,d),K2(n,{Fragment:E.Fragment,components:c,ignoreInvalidStyle:!0,jsx:E.jsx,jsxs:E.jsxs,passKeys:!0,passNode:!0});function d(b,g,S){if(b.type==="raw"&&S&&typeof g=="number")return f?S.children.splice(g,1):S.children[g]={type:"text",value:b.value},g;if(b.type==="element"){let x;for(x in rs)if(Object.hasOwn(rs,x)&&Object.hasOwn(b.properties,x)){const A=b.properties[x],M=rs[x];(M===null||M.includes(b.tagName))&&(b.properties[x]=p(String(A||""),x,b))}}if(b.type==="element"){let x=a?!a.includes(b.tagName):s?s.includes(b.tagName):!1;if(!x&&u&&typeof g=="number"&&(x=!u(b,g,S)),x&&S&&typeof g=="number")return m&&b.children?S.children.splice(g,1,...b.children):S.children.splice(g,1),g}}}function j3(n){const i=n.indexOf(":"),a=n.indexOf("?"),u=n.indexOf("#"),c=n.indexOf("/");return i===-1||c!==-1&&i>c||a!==-1&&i>a||u!==-1&&i>u||D3.test(n.slice(0,i))?n:""}function ig(n,i){const a=String(n);if(typeof i!="string")throw new TypeError("Expected character");let u=0,c=a.indexOf(i);for(;c!==-1;)u++,c=a.indexOf(i,c+i.length);return u}function L3(n){if(typeof n!="string")throw new TypeError("Expected a string");return n.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}function B3(n,i,a){const c=_u((a||{}).ignore||[]),s=U3(i);let f=-1;for(;++f<s.length;)vy(n,"text",m);function m(d,b){let g=-1,S;for(;++g<b.length;){const x=b[g],A=S?S.children:void 0;if(c(x,A?A.indexOf(x):void 0,S))return;S=x}if(S)return p(d,b)}function p(d,b){const g=b[b.length-1],S=s[f][0],x=s[f][1];let A=0;const R=g.children.indexOf(d);let D=!1,G=[];S.lastIndex=0;let U=S.exec(d.value);for(;U;){const ne=U.index,le={index:U.index,input:U.input,stack:[...b,d]};let q=x(...U,le);if(typeof q=="string"&&(q=q.length>0?{type:"text",value:q}:void 0),q===!1?S.lastIndex=ne+1:(A!==ne&&G.push({type:"text",value:d.value.slice(A,ne)}),Array.isArray(q)?G.push(...q):q&&G.push(q),A=ne+U[0].length,D=!0),!S.global)break;U=S.exec(d.value)}return D?(A<d.value.length&&G.push({type:"text",value:d.value.slice(A)}),g.children.splice(R,1,...G)):G=[d],R+G.length}}function U3(n){const i=[];if(!Array.isArray(n))throw new TypeError("Expected find and replace tuple or list of tuples");const a=!n[0]||Array.isArray(n[0])?n:[n];let u=-1;for(;++u<a.length;){const c=a[u];i.push([H3(c[0]),q3(c[1])])}return i}function H3(n){return typeof n=="string"?new RegExp(L3(n),"g"):n}function q3(n){return typeof n=="function"?n:function(){return n}}const ys="phrasing",bs=["autolink","link","image","label"];function Y3(){return{transforms:[I3],enter:{literalAutolink:G3,literalAutolinkEmail:vs,literalAutolinkHttp:vs,literalAutolinkWww:vs},exit:{literalAutolink:Z3,literalAutolinkEmail:F3,literalAutolinkHttp:X3,literalAutolinkWww:Q3}}}function V3(){return{unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:ys,notInConstruct:bs},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:ys,notInConstruct:bs},{character:":",before:"[ps]",after:"\\/",inConstruct:ys,notInConstruct:bs}]}}function G3(n){this.enter({type:"link",title:null,url:"",children:[]},n)}function vs(n){this.config.enter.autolinkProtocol.call(this,n)}function X3(n){this.config.exit.autolinkProtocol.call(this,n)}function Q3(n){this.config.exit.data.call(this,n);const i=this.stack[this.stack.length-1];i.type,i.url="http://"+this.sliceSerialize(n)}function F3(n){this.config.exit.autolinkEmail.call(this,n)}function Z3(n){this.exit(n)}function I3(n){B3(n,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,K3],[new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)","gu"),J3]],{ignore:["link","linkReference"]})}function K3(n,i,a,u,c){let s="";if(!Sy(c)||(/^w/i.test(i)&&(a=i+a,i="",s="http://"),!W3(a)))return!1;const f=$3(a+u);if(!f[0])return!1;const m={type:"link",title:null,url:s+i+f[0],children:[{type:"text",value:i+f[0]}]};return f[1]?[m,{type:"text",value:f[1]}]:m}function J3(n,i,a,u){return!Sy(u,!0)||/[-\d_]$/.test(a)?!1:{type:"link",title:null,url:"mailto:"+i+"@"+a,children:[{type:"text",value:i+"@"+a}]}}function W3(n){const i=n.split(".");return!(i.length<2||i[i.length-1]&&(/_/.test(i[i.length-1])||!/[a-zA-Z\d]/.test(i[i.length-1]))||i[i.length-2]&&(/_/.test(i[i.length-2])||!/[a-zA-Z\d]/.test(i[i.length-2])))}function $3(n){const i=/[!"&'),.:;<>?\]}]+$/.exec(n);if(!i)return[n,void 0];n=n.slice(0,i.index);let a=i[0],u=a.indexOf(")");const c=ig(n,"(");let s=ig(n,")");for(;u!==-1&&c>s;)n+=a.slice(0,u+1),a=a.slice(u+1),u=a.indexOf(")"),s++;return[n,a]}function Sy(n,i){const a=n.input.charCodeAt(n.index-1);return(n.index===0||_l(a)||zu(a))&&(!i||a!==47)}Ey.peek=uk;function P3(){this.buffer()}function ek(n){this.enter({type:"footnoteReference",identifier:"",label:""},n)}function tk(){this.buffer()}function nk(n){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},n)}function lk(n){const i=this.resume(),a=this.stack[this.stack.length-1];a.type,a.identifier=an(this.sliceSerialize(n)).toLowerCase(),a.label=i}function ik(n){this.exit(n)}function ak(n){const i=this.resume(),a=this.stack[this.stack.length-1];a.type,a.identifier=an(this.sliceSerialize(n)).toLowerCase(),a.label=i}function rk(n){this.exit(n)}function uk(){return"["}function Ey(n,i,a,u){const c=a.createTracker(u);let s=c.move("[^");const f=a.enter("footnoteReference"),m=a.enter("reference");return s+=c.move(a.safe(a.associationId(n),{after:"]",before:s})),m(),f(),s+=c.move("]"),s}function ok(){return{enter:{gfmFootnoteCallString:P3,gfmFootnoteCall:ek,gfmFootnoteDefinitionLabelString:tk,gfmFootnoteDefinition:nk},exit:{gfmFootnoteCallString:lk,gfmFootnoteCall:ik,gfmFootnoteDefinitionLabelString:ak,gfmFootnoteDefinition:rk}}}function ck(n){let i=!1;return n&&n.firstLineBlank&&(i=!0),{handlers:{footnoteDefinition:a,footnoteReference:Ey},unsafe:[{character:"[",inConstruct:["label","phrasing","reference"]}]};function a(u,c,s,f){const m=s.createTracker(f);let p=m.move("[^");const d=s.enter("footnoteDefinition"),b=s.enter("label");return p+=m.move(s.safe(s.associationId(u),{before:p,after:"]"})),b(),p+=m.move("]:"),u.children&&u.children.length>0&&(m.shift(4),p+=m.move((i?`
`:" ")+s.indentLines(s.containerFlow(u,m.current()),i?ky:sk))),d(),p}}function sk(n,i,a){return i===0?n:ky(n,i,a)}function ky(n,i,a){return(a?"":"    ")+n}const fk=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];Cy.peek=gk;function hk(){return{canContainEols:["delete"],enter:{strikethrough:mk},exit:{strikethrough:pk}}}function dk(){return{unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:fk}],handlers:{delete:Cy}}}function mk(n){this.enter({type:"delete",children:[]},n)}function pk(n){this.exit(n)}function Cy(n,i,a,u){const c=a.createTracker(u),s=a.enter("strikethrough");let f=c.move("~~");return f+=a.containerPhrasing(n,{...c.current(),before:f,after:"~"}),f+=c.move("~~"),s(),f}function gk(){return"~"}function yk(n){return n.length}function bk(n,i){const a=i||{},u=(a.align||[]).concat(),c=a.stringLength||yk,s=[],f=[],m=[],p=[];let d=0,b=-1;for(;++b<n.length;){const M=[],R=[];let D=-1;for(n[b].length>d&&(d=n[b].length);++D<n[b].length;){const G=vk(n[b][D]);if(a.alignDelimiters!==!1){const U=c(G);R[D]=U,(p[D]===void 0||U>p[D])&&(p[D]=U)}M.push(G)}f[b]=M,m[b]=R}let g=-1;if(typeof u=="object"&&"length"in u)for(;++g<d;)s[g]=ag(u[g]);else{const M=ag(u);for(;++g<d;)s[g]=M}g=-1;const S=[],x=[];for(;++g<d;){const M=s[g];let R="",D="";M===99?(R=":",D=":"):M===108?R=":":M===114&&(D=":");let G=a.alignDelimiters===!1?1:Math.max(1,p[g]-R.length-D.length);const U=R+"-".repeat(G)+D;a.alignDelimiters!==!1&&(G=R.length+G+D.length,G>p[g]&&(p[g]=G),x[g]=G),S[g]=U}f.splice(1,0,S),m.splice(1,0,x),b=-1;const A=[];for(;++b<f.length;){const M=f[b],R=m[b];g=-1;const D=[];for(;++g<d;){const G=M[g]||"";let U="",ne="";if(a.alignDelimiters!==!1){const le=p[g]-(R[g]||0),q=s[g];q===114?U=" ".repeat(le):q===99?le%2?(U=" ".repeat(le/2+.5),ne=" ".repeat(le/2-.5)):(U=" ".repeat(le/2),ne=U):ne=" ".repeat(le)}a.delimiterStart!==!1&&!g&&D.push("|"),a.padding!==!1&&!(a.alignDelimiters===!1&&G==="")&&(a.delimiterStart!==!1||g)&&D.push(" "),a.alignDelimiters!==!1&&D.push(U),D.push(G),a.alignDelimiters!==!1&&D.push(ne),a.padding!==!1&&D.push(" "),(a.delimiterEnd!==!1||g!==d-1)&&D.push("|")}A.push(a.delimiterEnd===!1?D.join("").replace(/ +$/,""):D.join(""))}return A.join(`
`)}function vk(n){return n==null?"":String(n)}function ag(n){const i=typeof n=="string"?n.codePointAt(0):0;return i===67||i===99?99:i===76||i===108?108:i===82||i===114?114:0}function xk(n,i,a,u){const c=a.enter("blockquote"),s=a.createTracker(u);s.move("> "),s.shift(2);const f=a.indentLines(a.containerFlow(n,s.current()),Sk);return c(),f}function Sk(n,i,a){return">"+(a?"":" ")+n}function Ek(n,i){return rg(n,i.inConstruct,!0)&&!rg(n,i.notInConstruct,!1)}function rg(n,i,a){if(typeof i=="string"&&(i=[i]),!i||i.length===0)return a;let u=-1;for(;++u<i.length;)if(n.includes(i[u]))return!0;return!1}function ug(n,i,a,u){let c=-1;for(;++c<a.unsafe.length;)if(a.unsafe[c].character===`
`&&Ek(a.stack,a.unsafe[c]))return/[ \t]/.test(u.before)?"":" ";return`\\
`}function kk(n,i){const a=String(n);let u=a.indexOf(i),c=u,s=0,f=0;if(typeof i!="string")throw new TypeError("Expected substring");for(;u!==-1;)u===c?++s>f&&(f=s):s=1,c=u+i.length,u=a.indexOf(i,c);return f}function Ck(n,i){return!!(i.options.fences===!1&&n.value&&!n.lang&&/[^ \r\n]/.test(n.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(n.value))}function wk(n){const i=n.options.fence||"`";if(i!=="`"&&i!=="~")throw new Error("Cannot serialize code with `"+i+"` for `options.fence`, expected `` ` `` or `~`");return i}function Ak(n,i,a,u){const c=wk(a),s=n.value||"",f=c==="`"?"GraveAccent":"Tilde";if(Ck(n,a)){const g=a.enter("codeIndented"),S=a.indentLines(s,Tk);return g(),S}const m=a.createTracker(u),p=c.repeat(Math.max(kk(s,c)+1,3)),d=a.enter("codeFenced");let b=m.move(p);if(n.lang){const g=a.enter(`codeFencedLang${f}`);b+=m.move(a.safe(n.lang,{before:b,after:" ",encode:["`"],...m.current()})),g()}if(n.lang&&n.meta){const g=a.enter(`codeFencedMeta${f}`);b+=m.move(" "),b+=m.move(a.safe(n.meta,{before:b,after:`
`,encode:["`"],...m.current()})),g()}return b+=m.move(`
`),s&&(b+=m.move(s+`
`)),b+=m.move(p),d(),b}function Tk(n,i,a){return(a?"":"    ")+n}function lf(n){const i=n.options.quote||'"';if(i!=='"'&&i!=="'")throw new Error("Cannot serialize title with `"+i+"` for `options.quote`, expected `\"`, or `'`");return i}function zk(n,i,a,u){const c=lf(a),s=c==='"'?"Quote":"Apostrophe",f=a.enter("definition");let m=a.enter("label");const p=a.createTracker(u);let d=p.move("[");return d+=p.move(a.safe(a.associationId(n),{before:d,after:"]",...p.current()})),d+=p.move("]: "),m(),!n.url||/[\0- \u007F]/.test(n.url)?(m=a.enter("destinationLiteral"),d+=p.move("<"),d+=p.move(a.safe(n.url,{before:d,after:">",...p.current()})),d+=p.move(">")):(m=a.enter("destinationRaw"),d+=p.move(a.safe(n.url,{before:d,after:n.title?" ":`
`,...p.current()}))),m(),n.title&&(m=a.enter(`title${s}`),d+=p.move(" "+c),d+=p.move(a.safe(n.title,{before:d,after:c,...p.current()})),d+=p.move(c),m()),f(),d}function Dk(n){const i=n.options.emphasis||"*";if(i!=="*"&&i!=="_")throw new Error("Cannot serialize emphasis with `"+i+"` for `options.emphasis`, expected `*`, or `_`");return i}function Ha(n){return"&#x"+n.toString(16).toUpperCase()+";"}function wu(n,i,a){const u=Ti(n),c=Ti(i);return u===void 0?c===void 0?a==="_"?{inside:!0,outside:!0}:{inside:!1,outside:!1}:c===1?{inside:!0,outside:!0}:{inside:!1,outside:!0}:u===1?c===void 0?{inside:!1,outside:!1}:c===1?{inside:!0,outside:!0}:{inside:!1,outside:!1}:c===void 0?{inside:!1,outside:!1}:c===1?{inside:!0,outside:!1}:{inside:!1,outside:!1}}wy.peek=Rk;function wy(n,i,a,u){const c=Dk(a),s=a.enter("emphasis"),f=a.createTracker(u),m=f.move(c);let p=f.move(a.containerPhrasing(n,{after:c,before:m,...f.current()}));const d=p.charCodeAt(0),b=wu(u.before.charCodeAt(u.before.length-1),d,c);b.inside&&(p=Ha(d)+p.slice(1));const g=p.charCodeAt(p.length-1),S=wu(u.after.charCodeAt(0),g,c);S.inside&&(p=p.slice(0,-1)+Ha(g));const x=f.move(c);return s(),a.attentionEncodeSurroundingInfo={after:S.outside,before:b.outside},m+p+x}function Rk(n,i,a){return a.options.emphasis||"*"}function _k(n,i){let a=!1;return tf(n,function(u){if("value"in u&&/\r?\n|\r/.test(u.value)||u.type==="break")return a=!0,Ds}),!!((!n.depth||n.depth<3)&&Is(n)&&(i.options.setext||a))}function Mk(n,i,a,u){const c=Math.max(Math.min(6,n.depth||1),1),s=a.createTracker(u);if(_k(n,a)){const b=a.enter("headingSetext"),g=a.enter("phrasing"),S=a.containerPhrasing(n,{...s.current(),before:`
`,after:`
`});return g(),b(),S+`
`+(c===1?"=":"-").repeat(S.length-(Math.max(S.lastIndexOf("\r"),S.lastIndexOf(`
`))+1))}const f="#".repeat(c),m=a.enter("headingAtx"),p=a.enter("phrasing");s.move(f+" ");let d=a.containerPhrasing(n,{before:"# ",after:`
`,...s.current()});return/^[\t ]/.test(d)&&(d=Ha(d.charCodeAt(0))+d.slice(1)),d=d?f+" "+d:f,a.options.closeAtx&&(d+=" "+f),p(),m(),d}Ay.peek=Ok;function Ay(n){return n.value||""}function Ok(){return"<"}Ty.peek=Nk;function Ty(n,i,a,u){const c=lf(a),s=c==='"'?"Quote":"Apostrophe",f=a.enter("image");let m=a.enter("label");const p=a.createTracker(u);let d=p.move("![");return d+=p.move(a.safe(n.alt,{before:d,after:"]",...p.current()})),d+=p.move("]("),m(),!n.url&&n.title||/[\0- \u007F]/.test(n.url)?(m=a.enter("destinationLiteral"),d+=p.move("<"),d+=p.move(a.safe(n.url,{before:d,after:">",...p.current()})),d+=p.move(">")):(m=a.enter("destinationRaw"),d+=p.move(a.safe(n.url,{before:d,after:n.title?" ":")",...p.current()}))),m(),n.title&&(m=a.enter(`title${s}`),d+=p.move(" "+c),d+=p.move(a.safe(n.title,{before:d,after:c,...p.current()})),d+=p.move(c),m()),d+=p.move(")"),f(),d}function Nk(){return"!"}zy.peek=jk;function zy(n,i,a,u){const c=n.referenceType,s=a.enter("imageReference");let f=a.enter("label");const m=a.createTracker(u);let p=m.move("![");const d=a.safe(n.alt,{before:p,after:"]",...m.current()});p+=m.move(d+"]["),f();const b=a.stack;a.stack=[],f=a.enter("reference");const g=a.safe(a.associationId(n),{before:p,after:"]",...m.current()});return f(),a.stack=b,s(),c==="full"||!d||d!==g?p+=m.move(g+"]"):c==="shortcut"?p=p.slice(0,-1):p+=m.move("]"),p}function jk(){return"!"}Dy.peek=Lk;function Dy(n,i,a){let u=n.value||"",c="`",s=-1;for(;new RegExp("(^|[^`])"+c+"([^`]|$)").test(u);)c+="`";for(/[^ \r\n]/.test(u)&&(/^[ \r\n]/.test(u)&&/[ \r\n]$/.test(u)||/^`|`$/.test(u))&&(u=" "+u+" ");++s<a.unsafe.length;){const f=a.unsafe[s],m=a.compilePattern(f);let p;if(f.atBreak)for(;p=m.exec(u);){let d=p.index;u.charCodeAt(d)===10&&u.charCodeAt(d-1)===13&&d--,u=u.slice(0,d)+" "+u.slice(p.index+1)}}return c+u+c}function Lk(){return"`"}function Ry(n,i){const a=Is(n);return!!(!i.options.resourceLink&&n.url&&!n.title&&n.children&&n.children.length===1&&n.children[0].type==="text"&&(a===n.url||"mailto:"+a===n.url)&&/^[a-z][a-z+.-]+:/i.test(n.url)&&!/[\0- <>\u007F]/.test(n.url))}_y.peek=Bk;function _y(n,i,a,u){const c=lf(a),s=c==='"'?"Quote":"Apostrophe",f=a.createTracker(u);let m,p;if(Ry(n,a)){const b=a.stack;a.stack=[],m=a.enter("autolink");let g=f.move("<");return g+=f.move(a.containerPhrasing(n,{before:g,after:">",...f.current()})),g+=f.move(">"),m(),a.stack=b,g}m=a.enter("link"),p=a.enter("label");let d=f.move("[");return d+=f.move(a.containerPhrasing(n,{before:d,after:"](",...f.current()})),d+=f.move("]("),p(),!n.url&&n.title||/[\0- \u007F]/.test(n.url)?(p=a.enter("destinationLiteral"),d+=f.move("<"),d+=f.move(a.safe(n.url,{before:d,after:">",...f.current()})),d+=f.move(">")):(p=a.enter("destinationRaw"),d+=f.move(a.safe(n.url,{before:d,after:n.title?" ":")",...f.current()}))),p(),n.title&&(p=a.enter(`title${s}`),d+=f.move(" "+c),d+=f.move(a.safe(n.title,{before:d,after:c,...f.current()})),d+=f.move(c),p()),d+=f.move(")"),m(),d}function Bk(n,i,a){return Ry(n,a)?"<":"["}My.peek=Uk;function My(n,i,a,u){const c=n.referenceType,s=a.enter("linkReference");let f=a.enter("label");const m=a.createTracker(u);let p=m.move("[");const d=a.containerPhrasing(n,{before:p,after:"]",...m.current()});p+=m.move(d+"]["),f();const b=a.stack;a.stack=[],f=a.enter("reference");const g=a.safe(a.associationId(n),{before:p,after:"]",...m.current()});return f(),a.stack=b,s(),c==="full"||!d||d!==g?p+=m.move(g+"]"):c==="shortcut"?p=p.slice(0,-1):p+=m.move("]"),p}function Uk(){return"["}function af(n){const i=n.options.bullet||"*";if(i!=="*"&&i!=="+"&&i!=="-")throw new Error("Cannot serialize items with `"+i+"` for `options.bullet`, expected `*`, `+`, or `-`");return i}function Hk(n){const i=af(n),a=n.options.bulletOther;if(!a)return i==="*"?"-":"*";if(a!=="*"&&a!=="+"&&a!=="-")throw new Error("Cannot serialize items with `"+a+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(a===i)throw new Error("Expected `bullet` (`"+i+"`) and `bulletOther` (`"+a+"`) to be different");return a}function qk(n){const i=n.options.bulletOrdered||".";if(i!=="."&&i!==")")throw new Error("Cannot serialize items with `"+i+"` for `options.bulletOrdered`, expected `.` or `)`");return i}function Oy(n){const i=n.options.rule||"*";if(i!=="*"&&i!=="-"&&i!=="_")throw new Error("Cannot serialize rules with `"+i+"` for `options.rule`, expected `*`, `-`, or `_`");return i}function Yk(n,i,a,u){const c=a.enter("list"),s=a.bulletCurrent;let f=n.ordered?qk(a):af(a);const m=n.ordered?f==="."?")":".":Hk(a);let p=i&&a.bulletLastUsed?f===a.bulletLastUsed:!1;if(!n.ordered){const b=n.children?n.children[0]:void 0;if((f==="*"||f==="-")&&b&&(!b.children||!b.children[0])&&a.stack[a.stack.length-1]==="list"&&a.stack[a.stack.length-2]==="listItem"&&a.stack[a.stack.length-3]==="list"&&a.stack[a.stack.length-4]==="listItem"&&a.indexStack[a.indexStack.length-1]===0&&a.indexStack[a.indexStack.length-2]===0&&a.indexStack[a.indexStack.length-3]===0&&(p=!0),Oy(a)===f&&b){let g=-1;for(;++g<n.children.length;){const S=n.children[g];if(S&&S.type==="listItem"&&S.children&&S.children[0]&&S.children[0].type==="thematicBreak"){p=!0;break}}}}p&&(f=m),a.bulletCurrent=f;const d=a.containerFlow(n,u);return a.bulletLastUsed=f,a.bulletCurrent=s,c(),d}function Vk(n){const i=n.options.listItemIndent||"one";if(i!=="tab"&&i!=="one"&&i!=="mixed")throw new Error("Cannot serialize items with `"+i+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return i}function Gk(n,i,a,u){const c=Vk(a);let s=a.bulletCurrent||af(a);i&&i.type==="list"&&i.ordered&&(s=(typeof i.start=="number"&&i.start>-1?i.start:1)+(a.options.incrementListMarker===!1?0:i.children.indexOf(n))+s);let f=s.length+1;(c==="tab"||c==="mixed"&&(i&&i.type==="list"&&i.spread||n.spread))&&(f=Math.ceil(f/4)*4);const m=a.createTracker(u);m.move(s+" ".repeat(f-s.length)),m.shift(f);const p=a.enter("listItem"),d=a.indentLines(a.containerFlow(n,m.current()),b);return p(),d;function b(g,S,x){return S?(x?"":" ".repeat(f))+g:(x?s:s+" ".repeat(f-s.length))+g}}function Xk(n,i,a,u){const c=a.enter("paragraph"),s=a.enter("phrasing"),f=a.containerPhrasing(n,u);return s(),c(),f}const Qk=_u(["break","delete","emphasis","footnote","footnoteReference","image","imageReference","inlineCode","inlineMath","link","linkReference","mdxJsxTextElement","mdxTextExpression","strong","text","textDirective"]);function Fk(n,i,a,u){return(n.children.some(function(f){return Qk(f)})?a.containerPhrasing:a.containerFlow).call(a,n,u)}function Zk(n){const i=n.options.strong||"*";if(i!=="*"&&i!=="_")throw new Error("Cannot serialize strong with `"+i+"` for `options.strong`, expected `*`, or `_`");return i}Ny.peek=Ik;function Ny(n,i,a,u){const c=Zk(a),s=a.enter("strong"),f=a.createTracker(u),m=f.move(c+c);let p=f.move(a.containerPhrasing(n,{after:c,before:m,...f.current()}));const d=p.charCodeAt(0),b=wu(u.before.charCodeAt(u.before.length-1),d,c);b.inside&&(p=Ha(d)+p.slice(1));const g=p.charCodeAt(p.length-1),S=wu(u.after.charCodeAt(0),g,c);S.inside&&(p=p.slice(0,-1)+Ha(g));const x=f.move(c+c);return s(),a.attentionEncodeSurroundingInfo={after:S.outside,before:b.outside},m+p+x}function Ik(n,i,a){return a.options.strong||"*"}function Kk(n,i,a,u){return a.safe(n.value,u)}function Jk(n){const i=n.options.ruleRepetition||3;if(i<3)throw new Error("Cannot serialize rules with repetition `"+i+"` for `options.ruleRepetition`, expected `3` or more");return i}function Wk(n,i,a){const u=(Oy(a)+(a.options.ruleSpaces?" ":"")).repeat(Jk(a));return a.options.ruleSpaces?u.slice(0,-1):u}const jy={blockquote:xk,break:ug,code:Ak,definition:zk,emphasis:wy,hardBreak:ug,heading:Mk,html:Ay,image:Ty,imageReference:zy,inlineCode:Dy,link:_y,linkReference:My,list:Yk,listItem:Gk,paragraph:Xk,root:Fk,strong:Ny,text:Kk,thematicBreak:Wk};function $k(){return{enter:{table:Pk,tableData:og,tableHeader:og,tableRow:t4},exit:{codeText:n4,table:e4,tableData:xs,tableHeader:xs,tableRow:xs}}}function Pk(n){const i=n._align;this.enter({type:"table",align:i.map(function(a){return a==="none"?null:a}),children:[]},n),this.data.inTable=!0}function e4(n){this.exit(n),this.data.inTable=void 0}function t4(n){this.enter({type:"tableRow",children:[]},n)}function xs(n){this.exit(n)}function og(n){this.enter({type:"tableCell",children:[]},n)}function n4(n){let i=this.resume();this.data.inTable&&(i=i.replace(/\\([\\|])/g,l4));const a=this.stack[this.stack.length-1];a.type,a.value=i,this.exit(n)}function l4(n,i){return i==="|"?i:n}function i4(n){const i=n||{},a=i.tableCellPadding,u=i.tablePipeAlign,c=i.stringLength,s=a?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{inlineCode:S,table:f,tableCell:p,tableRow:m}};function f(x,A,M,R){return d(b(x,M,R),x.align)}function m(x,A,M,R){const D=g(x,M,R),G=d([D]);return G.slice(0,G.indexOf(`
`))}function p(x,A,M,R){const D=M.enter("tableCell"),G=M.enter("phrasing"),U=M.containerPhrasing(x,{...R,before:s,after:s});return G(),D(),U}function d(x,A){return bk(x,{align:A,alignDelimiters:u,padding:a,stringLength:c})}function b(x,A,M){const R=x.children;let D=-1;const G=[],U=A.enter("table");for(;++D<R.length;)G[D]=g(R[D],A,M);return U(),G}function g(x,A,M){const R=x.children;let D=-1;const G=[],U=A.enter("tableRow");for(;++D<R.length;)G[D]=p(R[D],x,A,M);return U(),G}function S(x,A,M){let R=jy.inlineCode(x,A,M);return M.stack.includes("tableCell")&&(R=R.replace(/\|/g,"\\$&")),R}}function a4(){return{exit:{taskListCheckValueChecked:cg,taskListCheckValueUnchecked:cg,paragraph:u4}}}function r4(){return{unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:o4}}}function cg(n){const i=this.stack[this.stack.length-2];i.type,i.checked=n.type==="taskListCheckValueChecked"}function u4(n){const i=this.stack[this.stack.length-2];if(i&&i.type==="listItem"&&typeof i.checked=="boolean"){const a=this.stack[this.stack.length-1];a.type;const u=a.children[0];if(u&&u.type==="text"){const c=i.children;let s=-1,f;for(;++s<c.length;){const m=c[s];if(m.type==="paragraph"){f=m;break}}f===a&&(u.value=u.value.slice(1),u.value.length===0?a.children.shift():a.position&&u.position&&typeof u.position.start.offset=="number"&&(u.position.start.column++,u.position.start.offset++,a.position.start=Object.assign({},u.position.start)))}}this.exit(n)}function o4(n,i,a,u){const c=n.children[0],s=typeof n.checked=="boolean"&&c&&c.type==="paragraph",f="["+(n.checked?"x":" ")+"] ",m=a.createTracker(u);s&&m.move(f);let p=jy.listItem(n,i,a,{...u,...m.current()});return s&&(p=p.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,d)),p;function d(b){return b+f}}function c4(){return[Y3(),ok(),hk(),$k(),a4()]}function s4(n){return{extensions:[V3(),ck(n),dk(),i4(n),r4()]}}const f4={tokenize:y4,partial:!0},Ly={tokenize:b4,partial:!0},By={tokenize:v4,partial:!0},Uy={tokenize:x4,partial:!0},h4={tokenize:S4,partial:!0},Hy={name:"wwwAutolink",tokenize:p4,previous:Yy},qy={name:"protocolAutolink",tokenize:g4,previous:Vy},Un={name:"emailAutolink",tokenize:m4,previous:Gy},mn={};function d4(){return{text:mn}}let Rl=48;for(;Rl<123;)mn[Rl]=Un,Rl++,Rl===58?Rl=65:Rl===91&&(Rl=97);mn[43]=Un;mn[45]=Un;mn[46]=Un;mn[95]=Un;mn[72]=[Un,qy];mn[104]=[Un,qy];mn[87]=[Un,Hy];mn[119]=[Un,Hy];function m4(n,i,a){const u=this;let c,s;return f;function f(g){return!Os(g)||!Gy.call(u,u.previous)||rf(u.events)?a(g):(n.enter("literalAutolink"),n.enter("literalAutolinkEmail"),m(g))}function m(g){return Os(g)?(n.consume(g),m):g===64?(n.consume(g),p):a(g)}function p(g){return g===46?n.check(h4,b,d)(g):g===45||g===95||pt(g)?(s=!0,n.consume(g),p):b(g)}function d(g){return n.consume(g),c=!0,p}function b(g){return s&&c&&xt(u.previous)?(n.exit("literalAutolinkEmail"),n.exit("literalAutolink"),i(g)):a(g)}}function p4(n,i,a){const u=this;return c;function c(f){return f!==87&&f!==119||!Yy.call(u,u.previous)||rf(u.events)?a(f):(n.enter("literalAutolink"),n.enter("literalAutolinkWww"),n.check(f4,n.attempt(Ly,n.attempt(By,s),a),a)(f))}function s(f){return n.exit("literalAutolinkWww"),n.exit("literalAutolink"),i(f)}}function g4(n,i,a){const u=this;let c="",s=!1;return f;function f(g){return(g===72||g===104)&&Vy.call(u,u.previous)&&!rf(u.events)?(n.enter("literalAutolink"),n.enter("literalAutolinkHttp"),c+=String.fromCodePoint(g),n.consume(g),m):a(g)}function m(g){if(xt(g)&&c.length<5)return c+=String.fromCodePoint(g),n.consume(g),m;if(g===58){const S=c.toLowerCase();if(S==="http"||S==="https")return n.consume(g),p}return a(g)}function p(g){return g===47?(n.consume(g),s?d:(s=!0,p)):a(g)}function d(g){return g===null||Eu(g)||Ge(g)||_l(g)||zu(g)?a(g):n.attempt(Ly,n.attempt(By,b),a)(g)}function b(g){return n.exit("literalAutolinkHttp"),n.exit("literalAutolink"),i(g)}}function y4(n,i,a){let u=0;return c;function c(f){return(f===87||f===119)&&u<3?(u++,n.consume(f),c):f===46&&u===3?(n.consume(f),s):a(f)}function s(f){return f===null?a(f):i(f)}}function b4(n,i,a){let u,c,s;return f;function f(d){return d===46||d===95?n.check(Uy,p,m)(d):d===null||Ge(d)||_l(d)||d!==45&&zu(d)?p(d):(s=!0,n.consume(d),f)}function m(d){return d===95?u=!0:(c=u,u=void 0),n.consume(d),f}function p(d){return c||u||!s?a(d):i(d)}}function v4(n,i){let a=0,u=0;return c;function c(f){return f===40?(a++,n.consume(f),c):f===41&&u<a?s(f):f===33||f===34||f===38||f===39||f===41||f===42||f===44||f===46||f===58||f===59||f===60||f===63||f===93||f===95||f===126?n.check(Uy,i,s)(f):f===null||Ge(f)||_l(f)?i(f):(n.consume(f),c)}function s(f){return f===41&&u++,n.consume(f),c}}function x4(n,i,a){return u;function u(m){return m===33||m===34||m===39||m===41||m===42||m===44||m===46||m===58||m===59||m===63||m===95||m===126?(n.consume(m),u):m===38?(n.consume(m),s):m===93?(n.consume(m),c):m===60||m===null||Ge(m)||_l(m)?i(m):a(m)}function c(m){return m===null||m===40||m===91||Ge(m)||_l(m)?i(m):u(m)}function s(m){return xt(m)?f(m):a(m)}function f(m){return m===59?(n.consume(m),u):xt(m)?(n.consume(m),f):a(m)}}function S4(n,i,a){return u;function u(s){return n.consume(s),c}function c(s){return pt(s)?a(s):i(s)}}function Yy(n){return n===null||n===40||n===42||n===95||n===91||n===93||n===126||Ge(n)}function Vy(n){return!xt(n)}function Gy(n){return!(n===47||Os(n))}function Os(n){return n===43||n===45||n===46||n===95||pt(n)}function rf(n){let i=n.length,a=!1;for(;i--;){const u=n[i][1];if((u.type==="labelLink"||u.type==="labelImage")&&!u._balanced){a=!0;break}if(u._gfmAutolinkLiteralWalkedInto){a=!1;break}}return n.length>0&&!a&&(n[n.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),a}const E4={tokenize:R4,partial:!0};function k4(){return{document:{91:{name:"gfmFootnoteDefinition",tokenize:T4,continuation:{tokenize:z4},exit:D4}},text:{91:{name:"gfmFootnoteCall",tokenize:A4},93:{name:"gfmPotentialFootnoteCall",add:"after",tokenize:C4,resolveTo:w4}}}}function C4(n,i,a){const u=this;let c=u.events.length;const s=u.parser.gfmFootnotes||(u.parser.gfmFootnotes=[]);let f;for(;c--;){const p=u.events[c][1];if(p.type==="labelImage"){f=p;break}if(p.type==="gfmFootnoteCall"||p.type==="labelLink"||p.type==="label"||p.type==="image"||p.type==="link")break}return m;function m(p){if(!f||!f._balanced)return a(p);const d=an(u.sliceSerialize({start:f.end,end:u.now()}));return d.codePointAt(0)!==94||!s.includes(d.slice(1))?a(p):(n.enter("gfmFootnoteCallLabelMarker"),n.consume(p),n.exit("gfmFootnoteCallLabelMarker"),i(p))}}function w4(n,i){let a=n.length;for(;a--;)if(n[a][1].type==="labelImage"&&n[a][0]==="enter"){n[a][1];break}n[a+1][1].type="data",n[a+3][1].type="gfmFootnoteCallLabelMarker";const u={type:"gfmFootnoteCall",start:Object.assign({},n[a+3][1].start),end:Object.assign({},n[n.length-1][1].end)},c={type:"gfmFootnoteCallMarker",start:Object.assign({},n[a+3][1].end),end:Object.assign({},n[a+3][1].end)};c.end.column++,c.end.offset++,c.end._bufferIndex++;const s={type:"gfmFootnoteCallString",start:Object.assign({},c.end),end:Object.assign({},n[n.length-1][1].start)},f={type:"chunkString",contentType:"string",start:Object.assign({},s.start),end:Object.assign({},s.end)},m=[n[a+1],n[a+2],["enter",u,i],n[a+3],n[a+4],["enter",c,i],["exit",c,i],["enter",s,i],["enter",f,i],["exit",f,i],["exit",s,i],n[n.length-2],n[n.length-1],["exit",u,i]];return n.splice(a,n.length-a+1,...m),n}function A4(n,i,a){const u=this,c=u.parser.gfmFootnotes||(u.parser.gfmFootnotes=[]);let s=0,f;return m;function m(g){return n.enter("gfmFootnoteCall"),n.enter("gfmFootnoteCallLabelMarker"),n.consume(g),n.exit("gfmFootnoteCallLabelMarker"),p}function p(g){return g!==94?a(g):(n.enter("gfmFootnoteCallMarker"),n.consume(g),n.exit("gfmFootnoteCallMarker"),n.enter("gfmFootnoteCallString"),n.enter("chunkString").contentType="string",d)}function d(g){if(s>999||g===93&&!f||g===null||g===91||Ge(g))return a(g);if(g===93){n.exit("chunkString");const S=n.exit("gfmFootnoteCallString");return c.includes(an(u.sliceSerialize(S)))?(n.enter("gfmFootnoteCallLabelMarker"),n.consume(g),n.exit("gfmFootnoteCallLabelMarker"),n.exit("gfmFootnoteCall"),i):a(g)}return Ge(g)||(f=!0),s++,n.consume(g),g===92?b:d}function b(g){return g===91||g===92||g===93?(n.consume(g),s++,d):d(g)}}function T4(n,i,a){const u=this,c=u.parser.gfmFootnotes||(u.parser.gfmFootnotes=[]);let s,f=0,m;return p;function p(A){return n.enter("gfmFootnoteDefinition")._container=!0,n.enter("gfmFootnoteDefinitionLabel"),n.enter("gfmFootnoteDefinitionLabelMarker"),n.consume(A),n.exit("gfmFootnoteDefinitionLabelMarker"),d}function d(A){return A===94?(n.enter("gfmFootnoteDefinitionMarker"),n.consume(A),n.exit("gfmFootnoteDefinitionMarker"),n.enter("gfmFootnoteDefinitionLabelString"),n.enter("chunkString").contentType="string",b):a(A)}function b(A){if(f>999||A===93&&!m||A===null||A===91||Ge(A))return a(A);if(A===93){n.exit("chunkString");const M=n.exit("gfmFootnoteDefinitionLabelString");return s=an(u.sliceSerialize(M)),n.enter("gfmFootnoteDefinitionLabelMarker"),n.consume(A),n.exit("gfmFootnoteDefinitionLabelMarker"),n.exit("gfmFootnoteDefinitionLabel"),S}return Ge(A)||(m=!0),f++,n.consume(A),A===92?g:b}function g(A){return A===91||A===92||A===93?(n.consume(A),f++,b):b(A)}function S(A){return A===58?(n.enter("definitionMarker"),n.consume(A),n.exit("definitionMarker"),c.includes(s)||c.push(s),Re(n,x,"gfmFootnoteDefinitionWhitespace")):a(A)}function x(A){return i(A)}}function z4(n,i,a){return n.check(Qa,i,n.attempt(E4,i,a))}function D4(n){n.exit("gfmFootnoteDefinition")}function R4(n,i,a){const u=this;return Re(n,c,"gfmFootnoteDefinitionIndent",5);function c(s){const f=u.events[u.events.length-1];return f&&f[1].type==="gfmFootnoteDefinitionIndent"&&f[2].sliceSerialize(f[1],!0).length===4?i(s):a(s)}}function _4(n){let a=(n||{}).singleTilde;const u={name:"strikethrough",tokenize:s,resolveAll:c};return a==null&&(a=!0),{text:{126:u},insideSpan:{null:[u]},attentionMarkers:{null:[126]}};function c(f,m){let p=-1;for(;++p<f.length;)if(f[p][0]==="enter"&&f[p][1].type==="strikethroughSequenceTemporary"&&f[p][1]._close){let d=p;for(;d--;)if(f[d][0]==="exit"&&f[d][1].type==="strikethroughSequenceTemporary"&&f[d][1]._open&&f[p][1].end.offset-f[p][1].start.offset===f[d][1].end.offset-f[d][1].start.offset){f[p][1].type="strikethroughSequence",f[d][1].type="strikethroughSequence";const b={type:"strikethrough",start:Object.assign({},f[d][1].start),end:Object.assign({},f[p][1].end)},g={type:"strikethroughText",start:Object.assign({},f[d][1].end),end:Object.assign({},f[p][1].start)},S=[["enter",b,m],["enter",f[d][1],m],["exit",f[d][1],m],["enter",g,m]],x=m.parser.constructs.insideSpan.null;x&&qt(S,S.length,0,Du(x,f.slice(d+1,p),m)),qt(S,S.length,0,[["exit",g,m],["enter",f[p][1],m],["exit",f[p][1],m],["exit",b,m]]),qt(f,d-1,p-d+3,S),p=d+S.length-2;break}}for(p=-1;++p<f.length;)f[p][1].type==="strikethroughSequenceTemporary"&&(f[p][1].type="data");return f}function s(f,m,p){const d=this.previous,b=this.events;let g=0;return S;function S(A){return d===126&&b[b.length-1][1].type!=="characterEscape"?p(A):(f.enter("strikethroughSequenceTemporary"),x(A))}function x(A){const M=Ti(d);if(A===126)return g>1?p(A):(f.consume(A),g++,x);if(g<2&&!a)return p(A);const R=f.exit("strikethroughSequenceTemporary"),D=Ti(A);return R._open=!D||D===2&&!!M,R._close=!M||M===2&&!!D,m(A)}}}class M4{constructor(){this.map=[]}add(i,a,u){O4(this,i,a,u)}consume(i){if(this.map.sort(function(s,f){return s[0]-f[0]}),this.map.length===0)return;let a=this.map.length;const u=[];for(;a>0;)a-=1,u.push(i.slice(this.map[a][0]+this.map[a][1]),this.map[a][2]),i.length=this.map[a][0];u.push(i.slice()),i.length=0;let c=u.pop();for(;c;){for(const s of c)i.push(s);c=u.pop()}this.map.length=0}}function O4(n,i,a,u){let c=0;if(!(a===0&&u.length===0)){for(;c<n.map.length;){if(n.map[c][0]===i){n.map[c][1]+=a,n.map[c][2].push(...u);return}c+=1}n.map.push([i,a,u])}}function N4(n,i){let a=!1;const u=[];for(;i<n.length;){const c=n[i];if(a){if(c[0]==="enter")c[1].type==="tableContent"&&u.push(n[i+1][1].type==="tableDelimiterMarker"?"left":"none");else if(c[1].type==="tableContent"){if(n[i-1][1].type==="tableDelimiterMarker"){const s=u.length-1;u[s]=u[s]==="left"?"center":"right"}}else if(c[1].type==="tableDelimiterRow")break}else c[0]==="enter"&&c[1].type==="tableDelimiterRow"&&(a=!0);i+=1}return u}function j4(){return{flow:{null:{name:"table",tokenize:L4,resolveAll:B4}}}}function L4(n,i,a){const u=this;let c=0,s=0,f;return m;function m(B){let te=u.events.length-1;for(;te>-1;){const ae=u.events[te][1].type;if(ae==="lineEnding"||ae==="linePrefix")te--;else break}const ee=te>-1?u.events[te][1].type:null,xe=ee==="tableHead"||ee==="tableRow"?q:p;return xe===q&&u.parser.lazy[u.now().line]?a(B):xe(B)}function p(B){return n.enter("tableHead"),n.enter("tableRow"),d(B)}function d(B){return B===124||(f=!0,s+=1),b(B)}function b(B){return B===null?a(B):fe(B)?s>1?(s=0,u.interrupt=!0,n.exit("tableRow"),n.enter("lineEnding"),n.consume(B),n.exit("lineEnding"),x):a(B):we(B)?Re(n,b,"whitespace")(B):(s+=1,f&&(f=!1,c+=1),B===124?(n.enter("tableCellDivider"),n.consume(B),n.exit("tableCellDivider"),f=!0,b):(n.enter("data"),g(B)))}function g(B){return B===null||B===124||Ge(B)?(n.exit("data"),b(B)):(n.consume(B),B===92?S:g)}function S(B){return B===92||B===124?(n.consume(B),g):g(B)}function x(B){return u.interrupt=!1,u.parser.lazy[u.now().line]?a(B):(n.enter("tableDelimiterRow"),f=!1,we(B)?Re(n,A,"linePrefix",u.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(B):A(B))}function A(B){return B===45||B===58?R(B):B===124?(f=!0,n.enter("tableCellDivider"),n.consume(B),n.exit("tableCellDivider"),M):le(B)}function M(B){return we(B)?Re(n,R,"whitespace")(B):R(B)}function R(B){return B===58?(s+=1,f=!0,n.enter("tableDelimiterMarker"),n.consume(B),n.exit("tableDelimiterMarker"),D):B===45?(s+=1,D(B)):B===null||fe(B)?ne(B):le(B)}function D(B){return B===45?(n.enter("tableDelimiterFiller"),G(B)):le(B)}function G(B){return B===45?(n.consume(B),G):B===58?(f=!0,n.exit("tableDelimiterFiller"),n.enter("tableDelimiterMarker"),n.consume(B),n.exit("tableDelimiterMarker"),U):(n.exit("tableDelimiterFiller"),U(B))}function U(B){return we(B)?Re(n,ne,"whitespace")(B):ne(B)}function ne(B){return B===124?A(B):B===null||fe(B)?!f||c!==s?le(B):(n.exit("tableDelimiterRow"),n.exit("tableHead"),i(B)):le(B)}function le(B){return a(B)}function q(B){return n.enter("tableRow"),$(B)}function $(B){return B===124?(n.enter("tableCellDivider"),n.consume(B),n.exit("tableCellDivider"),$):B===null||fe(B)?(n.exit("tableRow"),i(B)):we(B)?Re(n,$,"whitespace")(B):(n.enter("data"),se(B))}function se(B){return B===null||B===124||Ge(B)?(n.exit("data"),$(B)):(n.consume(B),B===92?me:se)}function me(B){return B===92||B===124?(n.consume(B),se):se(B)}}function B4(n,i){let a=-1,u=!0,c=0,s=[0,0,0,0],f=[0,0,0,0],m=!1,p=0,d,b,g;const S=new M4;for(;++a<n.length;){const x=n[a],A=x[1];x[0]==="enter"?A.type==="tableHead"?(m=!1,p!==0&&(sg(S,i,p,d,b),b=void 0,p=0),d={type:"table",start:Object.assign({},A.start),end:Object.assign({},A.end)},S.add(a,0,[["enter",d,i]])):A.type==="tableRow"||A.type==="tableDelimiterRow"?(u=!0,g=void 0,s=[0,0,0,0],f=[0,a+1,0,0],m&&(m=!1,b={type:"tableBody",start:Object.assign({},A.start),end:Object.assign({},A.end)},S.add(a,0,[["enter",b,i]])),c=A.type==="tableDelimiterRow"?2:b?3:1):c&&(A.type==="data"||A.type==="tableDelimiterMarker"||A.type==="tableDelimiterFiller")?(u=!1,f[2]===0&&(s[1]!==0&&(f[0]=f[1],g=gu(S,i,s,c,void 0,g),s=[0,0,0,0]),f[2]=a)):A.type==="tableCellDivider"&&(u?u=!1:(s[1]!==0&&(f[0]=f[1],g=gu(S,i,s,c,void 0,g)),s=f,f=[s[1],a,0,0])):A.type==="tableHead"?(m=!0,p=a):A.type==="tableRow"||A.type==="tableDelimiterRow"?(p=a,s[1]!==0?(f[0]=f[1],g=gu(S,i,s,c,a,g)):f[1]!==0&&(g=gu(S,i,f,c,a,g)),c=0):c&&(A.type==="data"||A.type==="tableDelimiterMarker"||A.type==="tableDelimiterFiller")&&(f[3]=a)}for(p!==0&&sg(S,i,p,d,b),S.consume(i.events),a=-1;++a<i.events.length;){const x=i.events[a];x[0]==="enter"&&x[1].type==="table"&&(x[1]._align=N4(i.events,a))}return n}function gu(n,i,a,u,c,s){const f=u===1?"tableHeader":u===2?"tableDelimiter":"tableData",m="tableContent";a[0]!==0&&(s.end=Object.assign({},Ci(i.events,a[0])),n.add(a[0],0,[["exit",s,i]]));const p=Ci(i.events,a[1]);if(s={type:f,start:Object.assign({},p),end:Object.assign({},p)},n.add(a[1],0,[["enter",s,i]]),a[2]!==0){const d=Ci(i.events,a[2]),b=Ci(i.events,a[3]),g={type:m,start:Object.assign({},d),end:Object.assign({},b)};if(n.add(a[2],0,[["enter",g,i]]),u!==2){const S=i.events[a[2]],x=i.events[a[3]];if(S[1].end=Object.assign({},x[1].end),S[1].type="chunkText",S[1].contentType="text",a[3]>a[2]+1){const A=a[2]+1,M=a[3]-a[2]-1;n.add(A,M,[])}}n.add(a[3]+1,0,[["exit",g,i]])}return c!==void 0&&(s.end=Object.assign({},Ci(i.events,c)),n.add(c,0,[["exit",s,i]]),s=void 0),s}function sg(n,i,a,u,c){const s=[],f=Ci(i.events,a);c&&(c.end=Object.assign({},f),s.push(["exit",c,i])),u.end=Object.assign({},f),s.push(["exit",u,i]),n.add(a+1,0,s)}function Ci(n,i){const a=n[i],u=a[0]==="enter"?"start":"end";return a[1][u]}const U4={name:"tasklistCheck",tokenize:q4};function H4(){return{text:{91:U4}}}function q4(n,i,a){const u=this;return c;function c(p){return u.previous!==null||!u._gfmTasklistFirstContentOfListItem?a(p):(n.enter("taskListCheck"),n.enter("taskListCheckMarker"),n.consume(p),n.exit("taskListCheckMarker"),s)}function s(p){return Ge(p)?(n.enter("taskListCheckValueUnchecked"),n.consume(p),n.exit("taskListCheckValueUnchecked"),f):p===88||p===120?(n.enter("taskListCheckValueChecked"),n.consume(p),n.exit("taskListCheckValueChecked"),f):a(p)}function f(p){return p===93?(n.enter("taskListCheckMarker"),n.consume(p),n.exit("taskListCheckMarker"),n.exit("taskListCheck"),m):a(p)}function m(p){return fe(p)?i(p):we(p)?n.check({tokenize:Y4},i,a)(p):a(p)}}function Y4(n,i,a){return Re(n,u,"whitespace");function u(c){return c===null?a(c):i(c)}}function V4(n){return ey([d4(),k4(),_4(n),j4(),H4()])}const G4={};function X4(n){const i=this,a=n||G4,u=i.data(),c=u.micromarkExtensions||(u.micromarkExtensions=[]),s=u.fromMarkdownExtensions||(u.fromMarkdownExtensions=[]),f=u.toMarkdownExtensions||(u.toMarkdownExtensions=[]);c.push(V4(a)),s.push(c4()),f.push(s4(a))}const Q4={daily:"일상(DAILY)",security:"보안(SECURITY)","web-security":"Web Security","web3-blockchain":"Web3/Blockchain","research-article":"Research/Article","study-dev-security":"Study","wargame-ctf":"Wargame/CTF",reversing:"Reversing",pwn:"Pwn",crypto:"Crypto",development:"개발(DEVELOPMENT)",travel:"여행(TRAVEL)"};function F4(){const{id:n}=kg(),i=Bs(),a=n?r2(n):void 0;if(!a)return E.jsx("div",{className:"post-page",children:E.jsxs("div",{className:"post-not-found",children:[E.jsx("h1",{children:"포스트를 찾을 수 없습니다"}),E.jsx("p",{children:"요청하신 포스트가 존재하지 않거나 삭제되었습니다."}),E.jsx("button",{onClick:()=>i("/"),className:"back-button",children:"블로그로 돌아가기"})]})});const u=Q4[a.category]||a.category;return E.jsx("div",{className:"post-page",children:E.jsxs("div",{className:"post-container",children:[E.jsxs(Ai,{to:"/",className:"back-link",children:[E.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("line",{x1:"19",y1:"12",x2:"5",y2:"12"}),E.jsx("polyline",{points:"12 19 5 12 12 5"})]}),"BACK TO LIST"]}),E.jsx("div",{className:"post-category-line",children:E.jsx("span",{className:"post-category-badge",children:u})}),E.jsx("h1",{className:"post-title",children:a.title}),E.jsxs("div",{className:"post-meta",children:[E.jsxs("span",{className:"post-date",children:[E.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[E.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),E.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),E.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),E.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),Lg(a.date)]}),E.jsx("span",{className:"post-relative-time",children:jg(a.date)})]}),E.jsx("article",{className:"post-content",children:E.jsx(_3,{remarkPlugins:[X4],components:{a:({...c})=>E.jsx("a",{...c,target:"_blank",rel:"noopener noreferrer"})},children:a.content})}),a.tags&&a.tags.length>0&&E.jsx("div",{className:"post-tags",children:a.tags.map(c=>E.jsxs("span",{className:"tag",children:["#",c]},c))})]})})}const Z4={all:"전체",daily:"일상(Daily)",security:"보안(Security)","web-security":"Web Security","web3-blockchain":"Web3 / Blockchain","research-article":"Research/Article","study-dev-security":"Study(dev/security)","wargame-ctf":"Wargame/CTF",reversing:"Reversing",pwn:"Pwn",crypto:"Crypto",development:"개발(Development)",travel:"여행(Travel)"};function I4(){const{categoryId:n}=kg(),i=n?a2(n):[],a=Z4[n||""]||n;return E.jsxs("div",{className:"category-page",children:[E.jsx(Ug,{title:`Category: ${a}`,highlightWord:a}),E.jsxs("section",{className:"filtered-section",children:[E.jsx("h2",{className:"section-header",children:"FILTERED POSTS"}),E.jsx("div",{className:"posts-list",children:i.length>0?i.map(u=>E.jsx(Hg,{post:u},u.id)):E.jsx("div",{className:"no-posts",children:E.jsx("p",{children:"아직 이 카테고리에 게시글이 없습니다."})})})]})]})}function K4(){return E.jsx(Bv,{children:E.jsx(dv,{children:E.jsxs(ki,{path:"/",element:E.jsx(c2,{}),children:[E.jsx(ki,{index:!0,element:E.jsx(h2,{})}),E.jsx(ki,{path:"profile",element:E.jsx(x2,{})}),E.jsx(ki,{path:"post/:id",element:E.jsx(F4,{})}),E.jsx(ki,{path:"category/:categoryId",element:E.jsx(I4,{})})]})})})}db.createRoot(document.getElementById("root")).render(E.jsx(V.StrictMode,{children:E.jsx(K4,{})}));
