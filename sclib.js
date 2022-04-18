function RemoveElement(e){
    if(e.parentNode){
        e.parentNode.removeChild(e);
    };
};
function KbtoMb(s, isString){
    if(istrue(isString)){
        var S = parseInt(s)/1024;
        return S + ' MB';
    };
    return parseInt(s)/1024;
};
function formatBytes(bytes, decimals) {
    if(!isset(decimals)){decimals=2;};
    if (bytes === 0) return '0 Bytes';

    var k = 1024;
    var dm = decimals < 0 ? 0 : decimals;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    var i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
function int2ip (ipInt) {
    return ( (ipInt>>>24) +'.' + (ipInt>>16 & 255) +'.' + (ipInt>>8 & 255) +'.' + (ipInt & 255) );
};
function ip2int(ip) {
    return ip.split('.').reduce(function(ipInt, octet) { return (ipInt<<8) + parseInt(octet, 10)}, 0) >>> 0;
};
var TIME = {
    day24:86400,
    day12:43200,
    hour:3600,
    week:604800,
    month:2629746
};
function time() {
    var timestamp = Math.floor(new Date().getTime() / 1000);
    return timestamp;
};
function ExecuteFunction(functionName, context /*, args */) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for(var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    };
    if (typeof context[func] == "undefined") {
        return false;
    };
    return context[func].apply(context, args);
};
function toHex(s) {
    var s = unescape(encodeURIComponent(s))
    var h = ''
    for (var i = 0; i < s.length; i++) {
        h += s.charCodeAt(i).toString(16)
    }
    return h
};

function fromHex(h) {
    var s = ''
    for (var i = 0; i < h.length; i+=2) {
        s += String.fromCharCode(parseInt(h.substr(i, 2), 16))
    }
    return decodeURIComponent(escape(s))
};

var decodeEntities = (function() {
    // this prevents any overhead from creating the object each time
    var element = document.createElement('div');

    function decodeHTMLEntities (str) {
        if(str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }

        return str;
    }

    return decodeHTMLEntities;
})();
/*Detect type of Element*/
function detect_type(e){
    if(e[0]=='#'){
        return 'ID';
    }else if(e[0]=='.'){
        return 'CLASS';
    }else if(e[0]=='&'){
        return 'NAME'
    }else{
        return 'TAG';
    };
};
/*Return true if Value contains in container (Array Or Object)*/
function Includes(container, value) {

    var returnValue = false;
    if(isObject(container)){
        for(var key in container){
            if(Array.isArray(container[key])){
                for(var i in container[key]){
                    if(container[key][i]==value){
                        return true;
                    };
                }
            }else if(isObject(container[key])){
                Includes(container[key], value);
            }else{
                if(container[key]==value){
                    return true;
                };
            };
        };
    }else{
        var pos = container.indexOf(value);
        if (pos >= 0) {
            returnValue = true;
        };
    };
    return returnValue;
};
/*Selector of element*/
function Selector(sel){
    return new _SelectorInit(sel,false);
};
/*Selector of all elements*/
function SelectorAll(sel){
    return new _SelectorInit(sel,true);
};
/*Check if isset selector then true*/
function issetSelector(e){
    if(Selector(e).e===null){
        return false;
    }else{
        return true;
    };
};
/*Unwrap html from container*/
function _unwrap(e) {
    e.outerHTML = e.innerHTML;
    RemoveElement(e);
};
/*Unwrap html from container by Selector*/
function UnWrap(s) {
    if(issetSelector(s)){
        _unwrap(Selector(s));
    }else{
      logout(s+': not fount');
    };
};

function isset(v) {
    if(typeof(v) != "undefined" && v !== null) {
        return true;
    }else{
        return false;
    };
};
function istrue(v) {
    if(isset(v) && (v==true || v=="true" || v==1 || v=='1')){
        return true;
    };
    return false;
};
function isString(v){
    if (typeof v === 'string' || v instanceof String){
        return true;
    };
    return false;
};
function isEmptyObj(obj){
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};
function empty(v) {
    if(!isset(v)){
        return true;
    }else{
        return ( v === "" || v === null  || v === false  ||  ( Array.isArray(v) && v.length === 0 ) || (typeof(v) == "object" && isEmptyObj(v)==true ) );
    };
};
function FirstLetterUp(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
function emptyOrNull(v) {
    if(empty(v)){
        return true;
    }else{
        v = v.trim();
        return v=='null';
    };
};
function isObject(v){
    return typeof v === 'object' && v !== null;
};
function isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
function isName(name){
    var result = /^[a-zA-Z]+$/.test(name);
    if(result==true){return true;}else{return false;};
};
function isInt(n){
    n = parseInt(n);
    return Number(n) === n && n % 1 === 0;
};
function isUnsignedInt(n) {
    var result = /^(?:[1-9]\d*|\d)$/.test(n);
    return result;
};
function isMoney(str) {
    var isValid = /^\d+(\.\d{1,2})?$/.test(str);
    if(isValid==true) {
        if (str[0] == '0' && (str[1]=='0' || str[1]!='.')) {
            return false;
        };
    };
    return isValid;
};
function isFloat(n){
    n = parseFloat(n);
    return Number(n) === n && n % 1 !== 0;
};
var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    };
};
function GET_URL(obj){
    var str = "";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        var tmp = '';
        if(isObject(obj[key])){
            var tmp_obj = {};
            for(var h in obj[key]){
                tmp_obj[h] = obj[key][h];
            };
            tmp = JSON.stringify(tmp_obj);
        }else{
            tmp = obj[key];
        };
        str += key + "=" + tmp;
    };
    //logout("SEND?"+str);
    return "?"+str;
};

function POST_URL(obj) {
    var fd = new FormData();
    for (var key in obj) {
        if(key=="files"){
            var files = obj[key];
            for(var x=0; x<files.length; x++){
                fd.append("files[]",files[x]);
            };
        }else{
            if(isObject(obj[key])){
                fd.append( key, JSON.stringify(obj[key]) );
            }else{
                fd.append( key, obj[key] );
            };

        };

    };
    return fd;
};

/*xhr query*/
function asynсQuery(i){

    var type = i.type;
    var url = i.url;
    var data = i.data;
    var success = i.success;
    var error = i.error;
    var progress = i.progress;

    if(type=='GET'){
        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var xhr = new XHR();
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) {
               return;
            };
            if (xhr.readyState == 4) {
                if (this.status == 200) {
                    if(success!=undefined){
                        success(this.responseText);
                    };
                }else{
                    if(error!=undefined){
                        error(this.status, this.statusText);
                    };
                };
            }else{
                error(this.status, this.statusText);
            };
            return;
        };
        if(progress!=undefined){
            xhr.upload.onprogress = function(event) {
                progress(event);
            };
        };
        if(data!='' || data!=undefined){
            url = url+GET_URL(data);
        };
        xhr.open("GET", url, true);
        xhr.setRequestHeader('Pragma','no-cache');
        xhr.setRequestHeader('Expires','0');
        xhr.send();
    }else if(type=='POST'){
        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var xhr = new XHR();
        //
        xhr.onreadystatechange = function(){
            if (xhr.readyState != 4) {return;};
            if (xhr.readyState == 4) {
                if (this.status == 200) {
                    if(success!=undefined){
                        success(this.responseText);
                    };
                }else{
                    if(error!=undefined){
                        error(this.status, this.statusText);
                    };
                };
            }else{
                error(this.status, this.statusText);
            };
        };
        if(data!='' || data!=undefined){
            data = POST_URL(data);
        };
        if(progress!=undefined){
            xhr.upload.onprogress = function(event) {
                progress(event);
            };
        };
        xhr.open("POST",url,true);
        //xhr.setRequestHeader('Content-type','multipart/form-data');
        xhr.send(data);
    }else{
        logout("Async: Bad type of query, need: GET or POST");
    };
};
function EachKeySet(data_obj) {
    for(var key in data_obj){
        if(issetSelector('#'+key)){
            //logout('#'+key + ' v: '+data_obj[key]);
            if(!empty(data_obj[key])){
                Selector('#'+key).value = data_obj[key];
            };
        };
    };
};
function GetParams() {
    var qs = document.location.search;
    qs = qs.split('+').join(' ');
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
};
function transition_object(obj) {
    return Base64.encode(JSON.stringify(obj));
};
function detransition_object(str) {
    var json = Base64.decode(str);
    if(json.isJson()){
        return JSON.parse(json);
    }else{
        return null;
    };
};

function GetPath(){
    var path = document.location.pathname;
    var part = path.split('/');
    return part;
};
function GetPath_First(){var p = GetPath();if(!empty(p[1])){return p[1];}else{return null;};};
function GetPath_Second(){var p = GetPath();if(!empty(p[2])){return p[2];}else{return null;};};
function GetPath_Third() {var p = GetPath();if(!empty(p[3])){return p[3];}else{return null;};};
function GetPath_Fourth() {var p = GetPath();if(!empty(p[4])){return p[4];}else{return null;};};
function GetPath_Fifth() {var p = GetPath();if(!empty(p[5])){return p[5];}else{return null;};};
function Path(/*, args */) {
    //var args = Array.prototype.slice.call(arguments, 5);
    var args = arguments;
    var count = args.length;
    if(count==0){
        return document.location.origin;
    };
    var path = '';
    var force_replace = true;
    for(var i=0; i<count; i++){
        if(args[i]===false){
            force_replace=false;
        }else{
            path += args[i];
        };
        if(i!=count-1){
            path+='/';
        };
    };
    path = "/"+path;
    if(force_replace===false){
        if(path===document.location.pathname){
            return false;
        };
    };
    return document.location.origin+path;
};
function LocalStorage() {
    return new $LocalStorage();
};
function $LocalStorage(){
};
$LocalStorage.prototype.Set = function(key,value){
    localStorage.setItem(key, value);
    if(localStorage.getItem(key)==null){return false;};
    return true;
};
$LocalStorage.prototype.Get = function(key){
    return localStorage.getItem(key);
};
$LocalStorage.prototype.Remove = function(key){
    return localStorage.removeItem(key);
};
localStorage.removeItem('image');

function NewPath(/*, args */) {
    //var args = Array.prototype.slice.call(arguments, 5);
    var args = arguments;
    var count = args.length;
    if(count==0){
        return window.location.replace(document.location.origin);
    };
    var path = '';
    var force_replace = true;
    for(var i=0; i<count; i++){
        if(args[i]===false){
            force_replace=false;
        }else{
            path += args[i];
        };
        if(i!=count-1){
            path+='/';
        };
    };
    path = "/"+path;
    if(force_replace===false){
        if(path===document.location.pathname){
            return false;
        };
    };
    return window.location.replace(document.location.origin+path);
};
function Page_Reload() {
    return window.location.reload();
};

function SetTitle(v){
    document.title = v;
};
function SetKeywords(v){
    document.getElementsByTagName('meta')["keywords"].content = v;
};
function SetDescription(v){
    document.getElementsByTagName('meta')["description"].content = v;
};

function ForEachSelector(sel,func){
    var s = $(sel);
    for(var i=0; i<s.length; i++){
        func(s[i]);
    };
};

function ForEachElements(object_elements,func){
    if(Array.isArray(object_elements)){
        for(var i=0; i<object_elements.length; i++){
            func(object_elements[key],key);
        };
    }else{
        for(var key in object_elements){
            func(object_elements[key],key);
        };
    };
};

var unix = function(cnix) {
    return new unix.init(cnix);
};

unix.init = function(cnix){
    this._Month_iter={'0': 'января','1': 'февраля','2': 'марта','3': 'апреля','4': 'мая','5': 'июня','6': 'июля','7': 'августа','8': 'сентября','9': 'октября','10': 'ноября','11': 'декабря'};
    this._month = {'0':'01', '1':'02', '2':'03', '3':'04','4':'05','5':'06','6':'07', '7':'08', '8':'09','9':'10','10':'11','11':'12'};
    var date = new Date(cnix * 1000);
    this.v = {
        hours: date.getHours(),
        minutes: ('0' + date.getMinutes()).slice(-2),
        year: date.getFullYear(),
        month: date.getMonth(),
        month_absolute: this._month[date.getMonth()],
        day: date.getDate()
    };
};
unix.init.prototype.Day = function(){return this.v.day;};
unix.init.prototype.Month = function(){return this.v.month_absolute;};
unix.init.prototype.Year = function(){return this.v.year;};
unix.init.prototype.Hours = function(){return this.v.hours;};
unix.init.prototype.Minutes = function(){return this.v.minutes};
unix.init.prototype.GetFullIn = function(){
    return this.v.day + " " + this._Month_iter[this.v.month] + " " + this.v.year + " в " + this.v.hours + ":" + this.v.minutes;
};
unix.init.prototype.GetDateTime = function(){
    return this.v.day + " " + this._Month_iter[this.v.month] + " " + this.v.year + " - " + this.v.hours + ":" + this.v.minutes;
};
unix.init.prototype.GetTime = function(){return this.v.hours + ":" + this.v.minutes;};
unix.init.prototype.GetDate = function(){return this.v.day + " " + this._Month_iter[this.v.month] + " " + this.v.year;};
unix.init.prototype.GetDateNumbers = function(){return this.v.day + "." + this.v.month_absolute + "." + this.v.year;};
unix.init.prototype.GetSmart = function(){
    var d = new Date();
    if(d.getFullYear() == this.v.year &&  d.getMonth()==this.v.month && d.getDate() == this.v.day){
        return this.v.hours + ":" + this.v.minutes;
    };
    if(d.getFullYear() == this.v.year &&  d.getMonth()==this.v.month && d.getDate()-1 == this.v.day){
        return "Вчера в "+this.v.hours + ":" + this.v.minutes;
    };
    if(this.v.month==d.getMonth()){
        return this.v.day + " " + this._Month_iter[this.v.month] + " в " + this.v.hours + ":" + this.v.minutes;
    };
    return this.v.day + " " + this._Month_iter[this.v.month] + " " + this.v.year + " в " + this.v.hours + ":" + this.v.minutes;
};
function RemoveAllWhiteSpaces(text){
    return text.replace(/\s/g,'');
};
function Explode(Replace_Pattern, Subject){
    return Subject.split(Replace_Pattern);
};
function Implode(Implode_Pattern, array_peaces) {
    return array_peaces.join(Implode_Pattern);
};

function Matched(obj, expected){
    for(var key in obj){
        if(key==expected){
            obj[key]();
        };
    };
};
function EquateHTML(DOM, html) {
    if(!isset(html)){return DOM;};
    if(isDom(html) || Array.isArray(html)){
        DOM.appendChilds(html);
    }else{
        DOM.innerHTML = html;
    };
    return DOM;
};
function CreateElement(TAG,svoistva){
    var e = document.createElement(TAG);
    for(var key in svoistva){
        if(key=='innerHTML'){
            e =  EquateHTML(e, svoistva[key]);
        }else if(key=='onclick'){
            e.onclick = function (e) {
                svoistva[key](e);
            };
        }else if(key=='oninput'){
            e.oninput = function (e) {
                svoistva[key](e);
            };
        }else if(key=='onchange'){
            e.onchange = function (e) {
                svoistva[key](e);
            };
        }else{
            e.setAttribute(key,svoistva[key]);
        };
    };
    return e;
};

function ExceptNull(v){if(v===null || v==='null'){return '';}else{return v;};};
function isNull(v){if(v===null){return true;}else{return false;};};

function random(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
};

function NameFirstUpper(str){
    return str[0].toUpperCase() + str.slice(1);
};
function GetKeyByValue(object, value) {
    for(var key in object){
        if(object[key]==value){
            return key;
        };
    };
};
function functionName(fun) {
    var ret = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
};
function LocalJsonSet(KeyLocal, key, value) {
    var storage = localStorage.getItem(KeyLocal);

    var jl = new JsonList();
    jl.Parse(storage);
    jl.Set(key, value);

    localStorage.setItem(KeyLocal, jl.GetJson());
};
function LocalJsonGet(KeyLocal, key){
    var storage = localStorage.getItem(KeyLocal);
    var jl = new JsonList();
    jl.Parse(storage);
    return jl.Get(key);
};
function LocalJsonRemove(KeyLocal, key) {
    var storage = localStorage.getItem(KeyLocal);

    var jl = new JsonList();
    jl.Parse(storage);
    jl.Remove(key);

    localStorage.setItem(KeyLocal, jl.GetJson());
};
function isView(e) {
    var rect = e.getBoundingClientRect();
    return rect.bottom > 0 && rect.right > 0 && rect.left < (window.innerWidth || document.documentElement.clientWidth) && rect.top < (window.innerHeight || document.documentElement.clientHeight);
};

function EventOnView(e, callback) {
    setInterval(function () {
            if(isView(e)){
                callback();
            };
    },1000);
};
function EventOnScroll(e, callback){

    var inter = setInterval(function () {
        e.addEventListener('scroll', function(event)
        {
            var element = event.target;
            if (element.scrollHeight - element.scrollTop === element.clientHeight)
            {
                callback();
            };
        });
    },600);
    return inter;
};


/*
* a = {
     'error1':'value',
     'error2':'value',
 }
* */
function MatchCase(expected, obj){
    for(var key in obj){
        if(key===expected){
            return obj[key];
        };
    };
};
function OutOfNull(String){
    if(empty(String)){return '';};
    if(String===null || String==='null' || String ==='Null' || String==='NULL'){
        return '';
    }else{
        return String;
    };
};
function GetQueryFormingString(obj){
    var res = '/?';
    var tmp_params = [];
    for(var key in obj){
        tmp_params.push(key+'='+encodeURIComponent(obj[key]));
    };
    res+=Implode('&',tmp_params);
    return res;
};
function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {return true;} else {return false;};
};
function EqualObjects(val1, val2){
    return JSON.stringify(val1) === JSON.stringify(val2);
};
function ContainsValue(Obj, value){
    for(var key in Obj){
        if(Obj[key]===value){
            return true;
        };
    };
    return false;
};
function Count(v){
    if(empty(v)){
        return 0;
    };
   if(isObject(v)){
      return  Object.keys(v).length;
   };
   return v.length;
};
function isNullOrStringNull(v){
    if(v==null || v=='null'){return true;};
    return false;
};
function ShortStr(str, length){
    if(!isset(length)){length=16;};
    str = str.substr(0, length);
    return str+"...";
};
function NewLine_ConvertToHTMLstrings(v){
    return v.replace(/\r?\n|\r/g, "<br>");
};
function NewLine_ConvertToTextstrings(v){
    return v.replace(/<br\s*[\/]?>/gi, "\n");
};
function NewLine_Escape(v) {
    return v.replace(/\n/g, "\\n");
};
function Void(){return 'javascript:void(0);';};
function GetArrayOfObjectList(ObjList){
    return [].slice.call(ObjList);
};

function RedirectToEdge(url){
    window.open("microsoft-edge:"+ url);
};
function AnalyzActionOnClick(e, UserFuncOrHref, isBlank){
    if(isset(UserFuncOrHref)){
       if(isString(UserFuncOrHref)){
            e.href=UserFuncOrHref;
        }else{
            e.onclick = function () {
                UserFuncOrHref();
            };
            e.href=Void();
        };
    }else{
        e.href=Void();
    };
    if(istrue(isBlank)){
        e.target='_blank';
    };
    return e;
};
/*if Not Isset String return Empty string*/
function NIS(v, DefaultIfNotIsset) {
    if(!isset(v)){
        if(!isset(DefaultIfNotIsset)){
            return Empty;
        }else{
            return DefaultIfNotIsset;
        };
    };
    return v;
};
/*if Not Isset Object Prop then return Empty string*/
function NIO(Obj, key, DefaultIfNotIsset){
    if(Obj.hasOwnProperty(key)){
        return Obj[key];
    }else{
        if(!isset(DefaultIfNotIsset)){
            return Empty;
        }else{
            return DefaultIfNotIsset;
        };
    };
};
/*if Not Isset Boolean return False*/
function NIB(v) {if(!isset(v)){return false;}else{return  v==true;};};

function Uniq_ID() {
    var id = 'a'+time()+Math.random().toString(36).substr(2)+((Math.random() * 10000).toString()).split('.')[0];
    if ( $('#'+id).length==0 ) {
        return id;
    }else{
        id = id+'z';
        return id;
    };
};
function isVisakosny (y) {
    return !(y & 3 || !(y % 25) && y & 15);
};
function getWeekOfFirstDay (month, year) {
    var newyear = new Date(month+" 1, "+year);
    var w = newyear.getDay();
    if(w==0){return 7;};
    return w;
};
