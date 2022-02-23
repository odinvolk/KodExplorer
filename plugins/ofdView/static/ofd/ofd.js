 (function(modules) { // webpackBootstrap
 	// The module cache
 	var installedModules = {};

 	// The require function
 	function __webpack_require__(moduleId) {

 		// Check if module is in cache
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		// Create a new module (and put it into the cache)
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 		// Execute the module function
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// Flag the module as loaded
 		module.l = true;

 		// Return the exports of the module
 		return module.exports;
 	}


 	// expose the modules object (__webpack_modules__)
 	__webpack_require__.m = modules;

 	// expose the module cache
 	__webpack_require__.c = installedModules;

 	// define getter function for harmony exports
 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, {
 				configurable: false,
 				enumerable: true,
 				get: getter
 			});
 		}
 	};

 	// getDefaultExport function for compatibility with non-harmony modules
 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};

 	// Object.prototype.hasOwnProperty.call
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

 	// __webpack_public_path__
 	__webpack_require__.p = "";

 	// Load entry module and return exports
 	return __webpack_require__(__webpack_require__.s = 1);
 })
/************************************************************************/
 ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util = (function () {
    function Util() {
    }
    Util.parseParam = function (url) {
        var params = {};
        var query = url.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (typeof params[pair[0]] === "undefined") {
                params[pair[0]] = decodeURIComponent(pair[1]);
            }
            else if (typeof params[pair[0]] === "string") {
                var arr = [params[pair[0]], decodeURIComponent(pair[1])];
                params[pair[0]] = arr;
            }
            else {
                params[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return params;
    };
    Util.open = function (url, cb) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            var zip = new JSZip();
            zip.loadAsync(data).then(cb);
        });
    };
    Util.createCanvas = function (width, height, style) {
    	//console.trace();
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        if (style)
            canvas.setAttribute("style", style);
        Util.scale(canvas.getContext("2d"), canvas);
        return canvas;
    };
    Util.scale = function (g, canvas) {
        var ratio = 2;
        var oldWidth = canvas.width;
        var oldHeight = canvas.height;
        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;
        canvas.style.width = oldWidth + "px";
        canvas.style.height = oldHeight + "px";
        g.scale(ratio, ratio);
    };
    return Util;
}());
exports.Util = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = __webpack_require__(2);
var render_1 = __webpack_require__(4);
var App = (function () {
    function App() {
    }
    App.prototype.init = function () {
        this.render = new render_1.Renderer();
        this.parser = new parser_1.Parser;
        var query = window.location.search;
        query = query.substring('?file='.length);
        if(ofdFile){
        	query = ofdFile;
        }
        
        var self = this;
        if (document.body.clientHeight > document.documentElement.clientHeight) {
            self.render.setWindowHeight(document.body.clientHeight - 10);
        }else {
            self.render.setWindowHeight(document.documentElement.clientHeight - 10);
        }
        window.onresize = function(){
        	self.render.setWindowHeight(document.body.clientHeight-10)
			self.parser.renderer.modelSizeInited = false;
        	self.parser.renderer.init(self.parser.doc, self.parser);
        	self.parser.renderer.repaint();
        }
        
        this.parser.open(this.parser, this.render, query);
    };
    return App;
}());
exports.App = App;
new App().init();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = __webpack_require__(3);
var util_1 = __webpack_require__(0);
var Parser = (function () {
    function Parser() {
        this.actions = [];
    }
    Parser.prototype.open = function (parser, render, file) {
        this.renderer = render;
        // if (file.indexOf('http://') == 0 || file.indexOf("https://") == 0) {
        //     //TODO support remote file
        //     Util.open(file, (zip) => {
        //         parser.zip = zip;
        //         parser.parse();
        //     });
        // } else {
        //     while (file.indexOf("/") == 0) file = file.substring(1);
        //     let url = "http://" + window.location.host + "/" + file;
        //     Util.open(url, (zip) => {
        //         parser.zip = zip;
        //         parser.parse();
        //     });
        // }
        util_1.Util.open(file, function (zip) {
            parser.zip = zip;
            parser.parse();
        });
    };
    Parser.prototype.parse = function () {
        var zip = this.zip;
        var self = this;
        this.doc = new model_1.Doc;
        var doc = this.doc;
        zip.files["OFD.xml"].async("string").then(function (data) {
            var ofd = new DOMParser().parseFromString(data, "text/xml").documentElement;
            doc.init(ofd);
            zip.files[doc.docRootPath].async("string").then(function (data) {
                doc.doc = new DOMParser().parseFromString(data, "text/xml").documentElement;
                self.parseDocument();
            });
        });
    };
    Parser.prototype.readXml = function (path, cb) {
        return this.zip.files[path].async("string").then(function (data) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, "text/xml");
            cb(xmlDoc.documentElement);
        });
    };
    Parser.prototype.parseColor = function (txt) {
        if (!txt)
            txt = "255 255 255";
        var rgb = 0, i, val = 0, ch, len = txt.length;
        for (i = 0; i <= len; i++) {
            ch = i === len ? -1 : txt.charCodeAt(i);
            if (ch >= 0x30 && ch <= 0x39) {
                val = val * 10 + (ch & 15);
            }
            else {
                rgb = rgb << 8 | val;
                val = 0;
            }
        }
        return rgb;
    };
    Parser.prototype.parseValue = function (node, attr) {
        return parseFloat(node.getAttribute(attr));
    };
    Parser.prototype.parseValues = function (txt) {
        if (txt) {
            var values = [], len = txt.length, start = 0;
            for (var i = 0; i <= len; i++) {
                if (i === len || txt.charCodeAt(i) === 0x20) {
                    values[values.length] = parseFloat(txt.substring(start, i));
                    start = i + 1;
                }
            }
            return values;
        }
        return null;
    };
    Parser.prototype.parseDocument = function () {
        var doc = this.doc;
        var root = doc.doc;
        if (root.localName != "Document") {
            return;
        }
        var i, j, nodes = root.childNodes;
        for (i = 0; i < nodes.length; i++) {
            var nA = nodes[i], nAs = void 0;
            switch (nA.localName) {
                case "CommonData":
                    nAs = nA.childNodes;
                    for (j = 0; j < nAs.length; j++) {
                        nA = nAs[j];
                        switch (nA.localName) {
                            case "PageArea":
                                nA = nA.firstElementChild;
                                if (nA == null) {
                                    break;
                                }
                                if (nA.localName == "PhysicalBox") {
                                    doc.PhysicalBox = this.parseValues(nA.textContent);
                                }
                                break;
                            case "PublicRes":
                                doc.PublicRes = nA.textContent;
                                break;
                            case "DocumentRes":
                                doc.DocumentRes = nA.textContent;
                                break;
                        }
                    }
                    break;
                case "Pages":
                    //ofd:Page ID="1" BaseLoc="Page_0/Content.xml"
                    nAs = nA.childNodes;
                    var pages = 0;
                    for (j = 0; j < nAs.length; j++) {
                        nA = nAs[j];
                        if (nA.localName == "Page") {
                            doc.pagePaths[pages++] = nA.getAttribute("BaseLoc");
                        }
                    }
                    break;
            }
        }
        var self = this;
        //get all xml dom
        var paths = doc.pagePaths;
        var length = paths.length;
        var count = length;
        var _loop_1 = function (i_1) {
            var path = paths[i_1];
            if (doc.dir) {
                path = doc.dir + path;
            }
            var page = new model_1.Page();
            doc.pages.push(page);
            this_1.readXml(path, function (element) { page.element = element; count--; });
        };
        var this_1 = this;
        //let count = length + 2
        for (var i_1 = 0; i_1 < length; i_1++) {
            _loop_1(i_1);
        }
        if (doc.PublicRes) {
            count++;
            //public res
            this.readXml(doc.dir + doc.PublicRes, function (element) {
                var res = {};
                res.element = element;
                doc.PublicRes = res;
                count--;
            });
        }
        if (doc.DocumentRes) {
            count++;
            //document res
            this.readXml(doc.dir + doc.DocumentRes, function (element) {
                var res = {};
                res.element = element;
                doc.DocumentRes = res;
                count--;
            });
        }
        var wait = setInterval(function () {
            if (!count) {
                //    console.log("everything parsed.")
                clearInterval(wait);
                self.parsePages();
            }
        }, 5);
    };
    Parser.prototype.parsePages = function () {
        this.parsePublicRes();
        this.parseDocumentRes();
        var pages = this.doc.pages;
        var length = pages.length;
        for (var i = 0; i < length; i++) {
            this.parsePage(i, false);
        }
        this.renderer.init(this.doc, this);
        this.renderer.repaint();
    };
    Parser.prototype.parsePublicRes = function () {
        var doc = this.doc;
        if (!doc.PublicRes)
            return;
        var i, j, nA, nAs, tmp;
        var res = doc.PublicRes;
        // this.readXml(doc.dir + doc.PublicRes, (resRoot) => {
        var nodes = res.element.childNodes;
        for (i = 0; i < nodes.length; i++) {
            nA = nodes[i];
            if (nA.localName == "Fonts") {
                nAs = nA.childNodes;
                for (j = 0; j < nAs.length; j++) {
                    nA = nAs[j];
                    if (nA.localName == "Font") {
                        tmp = nA.getAttribute("ID");
                        if (tmp) {
                            res[tmp] = nA.getAttribute("FontName");
                        }
                    }
                }
            }
        }
    };
    Parser.prototype.parseDocumentRes = function () {
        var doc = this.doc;
        if (!doc.DocumentRes)
            return;
        var res = doc.DocumentRes;
        var i, j, nA, nAs, tmp;
        var nodes = res.element.childNodes;
        for (i = 0; i < nodes.length; i++) {
            nA = nodes[i];
            if (nA.localName == "MultiMedias") {
                nAs = nA.childNodes;
                for (j = 0; j < nAs.length; j++) {
                    nA = nAs[j];
                    if (nA.localName == "MultiMedia") {
                        tmp = nA.getAttribute("ID");
                        if (tmp) {
                            var Type = nA.getAttribute("Type");
                            nA = nA.firstElementChild;
                            if (nA && nA.localName == "MediaFile") {
                                res[tmp] = [Type, nA.textContent];
                            }
                        }
                    }
                }
            }
        }
    };
    Parser.prototype.parsePath = function (path) {
        var i, c, len = path.length, vc = 0, ab = new ArrayBuffer((len / 3) << 2), fb = new Float32Array(ab);
        function parsePathPara(ch, limit) {
            fb[vc++] = ch;
            var start = (i += 2);
            while (i <= len) {
                if (i === len || path.charCodeAt(i) === 0x20) {
                    fb[vc++] = parseFloat(path.substring(start, i));
                    start = i + 1;
                    if (!--limit) {
                        return;
                    }
                }
                i++;
            }
        }
        for (i = 0; i < len; i++) {
            c = path.charCodeAt(i);
            switch (c) {
                case 0x4D:
                // M
                case 0x4C:
                // L
                case 0x53:
                    // S
                    parsePathPara(c, 2);
                    break;
                case 0x42:
                    // B
                    parsePathPara(c, 6);
                    break;
                case 0x51:
                    // Q
                    parsePathPara(c, 4);
                    break;
                case 0x43:
                    // C
                    fb[vc++] = c;
                    break;
                case 41:
                    // A
                    parsePathPara(c, 7);
                    break;
            }
        }
        return new Float32Array(ab.slice(0, vc << 2));
    };
    Parser.prototype.pCTM = function (Obj, nA) {
        // CTM="44.71 0.0 0.0 27.78 0.0 0.0
        var CTM = this.parseValues(nA.getAttribute("CTM"));
        if (CTM && CTM.length === 6 && (CTM[0] !== 1.0 || CTM[1] || CTM[2] || CTM[3] !== 1.0 || CTM[4] || CTM[5])) {
            Obj.CTM = CTM;
        }
    };
    Parser.prototype.pPathObject = function (e) {
        var obj = new model_1.PathObj;
        obj.Boundary = this.parseValues(e.getAttribute("Boundary"));
        var Stroke = e.getAttribute("Stroke");
        if (Stroke == "true") {
            obj.Stroke = 1;
            var tmp = e.getAttribute("LineWidth");
            if (tmp) {
                obj.LineWidth = parseFloat(tmp);
            }
        }
        else {
            //var Fill = nA.getAttribute("Fill");
        }
        var nCs = e.childNodes;
        for (var m = 0; m < nCs.length; m++) {
            var node = nCs[m];
            if (node.nodeType != node.ELEMENT_NODE)
                continue;
            switch (node.localName) {
                case "FillColor":
                    obj.FillColor = this.parseColor(node.getAttribute("Value"));
                    break;
                case "StrokeColor":
                    obj.StrokeColor = this.parseColor(node.getAttribute("Value"));
                    break;
                case "AbbreviatedData":
                    obj.AbbreviatedData = this.parsePath(node.textContent);
                    break;
                case "Actions":
                    var action = node.firstElementChild;
                    if (action) {
                        var event_1 = action.getAttribute('Event');
                        if (event_1 == 'CLICK') {
                            var url = action.firstElementChild.getAttribute('URI');
                            obj.url = url;
                            obj.MovieID = action.firstElementChild.getAttribute('ResourceID');
                            this.actions.push(obj);
                        }
                    }
                    break;
            }
        }
        return obj.AbbreviatedData || obj.MovieID ? obj : null;
    };
    Parser.prototype.pTextObject = function (nA) {
        var Obj = new model_1.TextObj;
        Obj.Boundary = this.parseValues(nA.getAttribute("Boundary"));
        Obj.Font = nA.getAttribute("Font");
        Obj.Size = this.parseValue(nA, "Size");
        if (nA.getAttribute("Italic") == "true") {
            Obj.Italic = 1;
        }
        var Weight = this.parseValue(nA, "Weight");
        if (Weight && Weight > 400) {
            Obj.Bold = 1;
        }
        var nCs = nA.childNodes;
        for (var m = 0; m < nCs.length; m++) {
            nA = nCs[m];
            switch (nA.localName) {
                case "FillColor":
                    Obj.FillColor = this.parseColor(nA.getAttribute("Value"));
                    break;
                case "TextCode":
                    Obj.TextCode = nA.textContent;
                    Obj.X = this.parseValue(nA, "X");
                    Obj.Y = this.parseValue(nA, "Y");
                    if (isNaN(Obj.X))
                        Obj.X = 0;
                    if (isNaN(Obj.Y))
                        Obj.Y = 0;
                    break;
            }
        }
        return Obj;
    };
    Parser.prototype.pImageObject = function (nA) {
        var Obj = new model_1.ImageObj;
        if ((Obj.ResourceID = nA.getAttribute("ResourceID"))) {
            Obj.Boundary = this.parseValues(nA.getAttribute("Boundary"));
            this.pCTM(Obj, nA);
            var path = Obj.Path = [], nAs = nA.childNodes;
            for (var i = 0; i < nAs.length; i++) {
                nA = nAs[i];
                if (nA.localName == "Clips") {
                    var nBs = nA.childNodes;
                    for (var j = 0; j < nBs.length; j++) {
                        nA = nBs[j];
                        if (nA.localName == "Clip") {
                            var nCs = nA.childNodes;
                            for (var k = 0; k < nCs.length; k++) {
                                nA = nCs[k];
                                if (nA.localName == "Area") {
                                    var nDs = nA.childNodes;
                                    for (var m = 0; m < nDs.length; m++) {
                                        nA = nDs[m];
                                        if (nA.localName == "Path") {
                                            var nEs = nA.childNodes;
                                            for (var n = 0; n < nEs.length; n++) {
                                                nA = nEs[n];
                                                if (nA.localName == "AbbreviatedData") {
                                                    path[path.length] = this.parsePath(nA.textContent);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return Obj;
        }
        return null;
    };
    Parser.prototype.parsePage = function (pageIndex, repaint) {
        if (repaint === void 0) { repaint = true; }
        var self = this;
        var doc = this.doc;
        var i, j, k, nA, nB, nAs, nBs;
        var page = doc.pages[pageIndex];
        var nodes = page.element.childNodes;
        for (i = 0; i < nodes.length; i++) {
            nA = nodes[i];
            switch (nA.localName) {
                case "Area":
                    nAs = nA.childNodes;
                    for (j = 0; j < nAs.length; j++) {
                        nA = nAs[j];
                        if (nA.localName == "PhysicalBox") {
                            page.PhysicalBox = this.parseValues(nA.textContent);
                        }
                    }
                    break;
                case "Content":
                    page.Content = nA;
                    if (pageIndex == 0) {
                        this.parsePageContent(page);
                    }
                    break;
            }
        }
    };
    Parser.prototype.parsePageContent = function (page) {
        if (page.Content) {
            var layers = page.layers = [];
            var nAs = page.Content.childNodes;
            var nA = void 0, nB = void 0;
            for (var j_1 = 0; j_1 < nAs.length; j_1++) {
                nA = nAs[j_1];
                if (nA.localName == "Layer") {
                    var layer = void 0;
                    var nBs = nA.childNodes;
                    for (var k_1 = 0; k_1 < nBs.length; k_1++) {
                        nB = nBs[k_1];
                        var Obj = null;
                        switch (nB.localName) {
                            case "PathObject":
                                Obj = this.pPathObject(nB);
                                break;
                            case "TextObject":
                                Obj = this.pTextObject(nB);
                                break;
                            case "ImageObject":
                                Obj = this.pImageObject(nB);
                                break;
                        }
                        if (Obj) {
                            if (!layer) {
                                var Type = 0;
                                switch (nA.getAttribute("Type")) {
                                    case "Foreground":
                                        Type = 1;
                                        break;
                                    case "Background":
                                        Type = -1;
                                        break;
                                }
                                layer = new model_1.Layer();
                                layer.Type = Type;
                                layers[layers.length] = layer;
                            }
                            layer.Objs[layer.Objs.length] = Obj;
                        }
                    }
                }
            }
            var k = void 0, i = void 0, j = layers.length - 1;
            while (j > 0) {
                k = 1;
                nA = layers[0];
                for (i = 0; i < j; i++) {
                    nB = layers[i + 1];
                    if (nA.Type > nB.Type) {
                        layers[i] = nB;
                        layers[i + 1] = nA;
                        if (j > 1) {
                            k = 0;
                        }
                    }
                    else {
                        nA = nB;
                    }
                }
                if (k) {
                    break;
                }
            }
            delete page.Content;
        }
    };
    Parser.prototype.parseNextPage = function (self, pageIndex) {
        var pages = self.doc.pages;
        var length = pages.length;
        if (pageIndex < length) {
            // self.parsePage(pageIndex, false);
            var page = pages[pageIndex];
            if (page.Content) {
                this.parsePageContent(page);
            }
        }
    };
    Parser.prototype.getResFile = function (ResID, cb) {
        var Res = this.doc.DocumentRes ? this.doc.DocumentRes[ResID] : 0;
        if (Res) {
            var file = this.doc.dir + "Res/" + Res[1];
            this.zip.files[file].async("blob").then(function (data) {
                cb(data);
            });
        }
    };
    Parser.prototype.getFilePath = function (ResID) {
        var Res = this.doc.DocumentRes ? this.doc.DocumentRes[ResID] : 0;
        if (Res) {
            var file = this.doc.dir + "Res/" + Res[1];
            return file;
        }
    };
    return Parser;
}());
exports.Parser = Parser;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Doc = (function () {
    function Doc() {
        this.pagePaths = [];
        this.pages = [];
    }
    Doc.prototype.init = function (ofd) {
        this.ofd = ofd;
        this.docRootPath = ofd.querySelector("DocRoot").textContent;
        this.dir = this.docRootPath.substring(0, this.docRootPath.indexOf("/") + 1);
    };
    return Doc;
}());
exports.Doc = Doc;
var Layer = (function () {
    function Layer() {
        this.Objs = [];
    }
    return Layer;
}());
exports.Layer = Layer;
var Page = (function () {
    function Page() {
    }
    return Page;
}());
exports.Page = Page;
var Obj = (function () {
    function Obj() {
    }
    Obj.prototype.parseValue = function (node, attr) {
        return parseFloat(node.getAttribute(attr));
    };
    Obj.prototype.parseValues = function (txt) {
        if (txt) {
            var values = [], len = txt.length, start = 0;
            for (var i = 0; i <= len; i++) {
                if (i === len || txt.charCodeAt(i) === 0x20) {
                    values[values.length] = parseFloat(txt.substring(start, i));
                    start = i + 1;
                }
            }
            return values;
        }
        return null;
    };
    return Obj;
}());
exports.Obj = Obj;
var PathObj = (function (_super) {
    __extends(PathObj, _super);
    function PathObj() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PathObj;
}(Obj));
exports.PathObj = PathObj;
var TextObj = (function (_super) {
    __extends(TextObj, _super);
    function TextObj() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextObj.prototype.parse = function (e) {
        this.Boundary = this.parseValues(e.getAttribute("Boundary")),
            this.Font = e.getAttribute("Font"),
            this.Size = this.parseValue(e, "Size");
    };
    return TextObj;
}(Obj));
exports.TextObj = TextObj;
var ImageObj = (function (_super) {
    __extends(ImageObj, _super);
    function ImageObj() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ImageObj;
}(Obj));
exports.ImageObj = ImageObj;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var Font = (function () {
    function Font() {
    }
    return Font;
}());
exports.Font = Font;
var Renderer = (function () {
    function Renderer() {
        this.vTop = 0;
        this.vLeft = 0;
        this.zoomValue = 1;
        this.scaleX = 0;
        this.scaleY = 0;
        this.ratio = 2;
        this.needRestore = false;
        /** return font key.
         * the font key maybe an invalid font,but we always use this invalid key to retrieve valid font.
         */
        this.fonts = {};
        this.isTransform = false;
        this.scale = 1;
        this.temp1 = 0; //测试
        this.temp2 = 0;
        this.temp3 = 0;
    }
    Renderer.prototype.init = function (doc, parser) {
        this.doc = doc;
        this.parser = parser;
        this.actions = parser.actions;
    };
    Renderer.prototype.fillText = function (t, g, name, size, style) {
        var styleStr = style == 1 ? "Bold " : style == 2 ? "Italic " :
            style ? "Bold Italic " : "";
        var key = styleStr + size + "px " + name;
        var gfont = this.fonts[key];
        if (!gfont) {
            gfont = key;
        }
        g.font = gfont;
        var factor = this.factor;
        var bound = t.Boundary;
        var x = bound[0] * factor - this.scrollx;
        var y = bound[1] * factor - this.scrolly;
        var w = bound[2] * factor;
        var h = bound[3] * factor;
        var fullSize; //实际字体大小
        fullSize = g.font.split("px")[0];
        if (styleStr != "") {
            fullSize = fullSize.split(" ")[1];
        }
        if (fullSize != Math.round(size)) {
            //赋值失败
            var scale = size / fullSize; //缩放比例
            if (scale != this.scale && this.scale != 1 && this.needRestore) {
                g.restore();
                this.scale = 1;
                // console.log("restore1=" + this.temp1++);
            }
            if (scale != this.scale) {
                this.needRestore = true;
                g.save();
                // console.log("save" + this.temp2++);
                g.transform(scale, 0, 0, scale, 0, 0);
                // console.log("transform" + this.temp3++);
            }
            this.scale = scale;
        }
        else if (this.needRestore) {
            this.needRestore = false;
            g.restore();
            g.font = gfont; //restore会将font还原
            this.scale = 1;
        }
        //draw text
        var oldColor = -1;
        var Color = t.FillColor;
        if (Color != oldColor) {
            g.fillStyle = this.formColor(Color);
            oldColor = Color;
        }
        g.fillText(t.TextCode, (x + t.X * factor) / this.scale, (y + t.Y * factor) / this.scale);
    };
    Renderer.prototype.setFont = function (ctx, name, size, style) {
        var styleStr = style == 1 ? "Bold " : style == 2 ? "Italic " :
            style ? "Bold Italic " : "";
        var key = styleStr + Math.round(size) + "px " + name;
        var gfont = this.fonts[key];
        if (gfont) {
            ctx.font = gfont;
            return;
        }
        ctx.font = key;
        this.fonts[key] = ctx.font;
    };
    Renderer.prototype.formColor = function (rgb) {
        function toChar(val) {
            val &= 15;
            return val + (val < 10 ? 48 : 55);
        }
        return String.fromCharCode(0x23, toChar(rgb >> 20), toChar(rgb >> 16), toChar(rgb >> 12), toChar(rgb >> 8), toChar(rgb >> 4), toChar(rgb));
    };
    Renderer.prototype.repaint = function () {
        var ratio = this.ratio;
        this.initModelSize();
        var cv = this.canvas;
        this.ctx.clearRect(0, 0, cv.width, cv.height);
        this.paint(cv.width / ratio, cv.height / ratio);
    };
    Renderer.prototype.initModelSize = function () {
        if (this.modelSizeInited)
            return;
        this.modelSizeInited = true;
        var doc = this.doc;
        var parser = this.parser;
        var page;
        // let paths = doc.pagePaths;
        var maxWidth = 0;
        var totalHeight = 0;
        var gutter = 20;
        var pages = doc.pages;
        var length = pages.length;
        for (var i = 0; i < length; i++) {
            page = pages[i];
            var box = page.PhysicalBox || doc.PhysicalBox;
            if ((page.Width = box[2] * (96 / 25.4)) > maxWidth) {
                maxWidth = page.Width;
            }
            page.Y = totalHeight;
            page.Height = box[3] * (96 / 25.4);
            totalHeight += page.Height + gutter;
        }
        this.width = maxWidth;
        this.modelHeight = totalHeight;
        this.initCanvas(this.width);
        this.initScroller();
        this.canvas.onmousemove = this.onCanvasMouseMove.bind(this);
        this.canvas.onclick = this.onCanvasClick.bind(this);
        //this.canvas.onscroll = this.onScroll.bind(this);
    };
    Renderer.prototype.onCanvasClick = function (e) {
        var obj = this.objUnderMouse;
        if (!obj || !obj.url)
            return;
        window.open(obj.url, '_blank');
    };
    Renderer.prototype.onCanvasMouseMove = function (e) {
        var mx = e.offsetX;
        var my = e.offsetY;
        var actions = this.actions;
        var length = actions.length;
        var factor = this.factor;
        var dX = this.scrollx;
        var dY = this.scrolly;
        this.objUnderMouse = null;
        for (var i = 0; i < length; i++) {
            var obj = actions[i];
            var bound = obj.Boundary;
            var x = bound[0] * factor - dX, y = bound[1] * factor - dY, w = bound[2] * factor, h = bound[3] * factor;
            if (y < my && y + h > my && x < mx && x + w > mx) {
                this.objUnderMouse = obj;
                break;
            }
        }
        if (this.objUnderMouse) {
            this.canvas.style.cursor = 'hand';
        }
        else {
            this.canvas.style.cursor = 'default';
        }
    };
    Renderer.prototype.initScroller = function () {
    	var scrollerBar = document.getElementById('scrollerBar');
    	if(scrollerBar){
    		scrollerBar.remove();
    	}
        var div = document.createElement("div");
        div.id = 'scrollerBar';
        div.setAttribute("style", "position:absolute;top:0px;right:0px;width:12px;height:80px;background:lightgray");
        document.body.appendChild(div);
        this.scroller = div;
        this.scrolltop = 0;
        var self = this;
        
        document.addEventListener("mousedown", function (e) {
            if (e.target == div) {
                self.scrollmousedown = true;
                self.mousey = e.clientY;
                //使右侧滚动条与滚动后的保持一直
                var top_1 = parseInt(self.scroller.style.top.split("px")[0]);
                if (top_1 < 0)
                    top_1 = 0;
                var height = document.body.clientHeight - self.scroller.clientHeight;
                if (top_1 >= height)
                    top_1 = height;
                self.scrolltop = top_1;
            }
        });
        document.addEventListener("mousemove", function (e) {
            if (self.scrollmousedown) {
                var top_2 = self.scrolltop + e.clientY - self.mousey;
                if (top_2 < 0)
                    top_2 = 0;
                var height = document.body.clientHeight - self.scroller.clientHeight;
                if (top_2 >= height)
                    top_2 = height;
                self.scroller.style.top = top_2 + "px";
                self.scrollTo(top_2 / height);
            }
        });
        document.addEventListener("mouseup", function (e) {
            if (self.scrollmousedown) {
                self.scrollmousedown = false;
                self.scrolltop = self.scroller.offsetTop;
            }
            //document.removeEventListener("mousemove");
        });
        var mouseWhell = function (e) {
            // console.log(e)
            self.onScroll(-e.wheelDelta);
        };
        window.removeEventListener("mousewheel",mouseWhell);
        window.addEventListener("mousewheel",mouseWhell);
    };
    Renderer.prototype.initCanvas = function (width) {
        var ratio = this.ratio;
        var container = document.getElementById("canvasContainer");
        if (this.canvas) {
            container.removeChild(this.canvas);
        }
        this.createCanvas(width);
        container.style.overflow = "hidden";
        var minwidth = this.canvas.width / ratio + 30;
        container.style.minWidth = minwidth + "px";
        container.style.width = minwidth + "px";
        container.style.height = (this.canvas.height / ratio + 1) + "px";
        container.appendChild(this.canvas);
    };
    Renderer.prototype.createCanvas = function (width) {
        this.canvas = util_1.Util.createCanvas(width, this.clientHeight, null);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.textBaseline = "alphabetic";
        this.viewportHeight = this.canvas.height / this.ratio;
    };
    Renderer.prototype.onScroll = function (delta) {
        var body = document.body;
        var top = this.vTop;
        top += delta;
        var dataHeight = this.modelHeight * this.zoomValue;
        if (top + this.viewportHeight >= dataHeight)
            top = dataHeight - this.viewportHeight;
        if (top < 0)
            top = 0;
        //滚动后设置右侧滚动条保持一直
        var self = this;
        self.scroller.style.top = (document.body.clientHeight - self.scroller.clientHeight) * (top / (dataHeight - this.viewportHeight)) + "px";
        if (this.vTop != top) {
            this.vTop = top;
            this.repaint();
        }
    };
    Renderer.prototype.scrollTo = function (percent) {
        var body = document.body;
        var dataHeight = this.modelHeight * this.zoomValue;
        //计算高度需要减去滚动条高度
        var top = (dataHeight - this.viewportHeight) * percent;
        if (top + this.viewportHeight >= dataHeight)
            top = dataHeight - this.viewportHeight;
        if (top < 0)
            top = 0;
        if (this.vTop != top) {
            this.vTop = top;
            this.repaint();
        }
    };
    Renderer.prototype.paint = function (wLimit, hLimit) {
        this.initModelSize();
        var doc = this.doc;
        var parser = this.parser;
        var page;
        this.zoomValue = wLimit / this.width;
        var vT = this.vTop;
        var vL = this.vLeft;
        var zoom = this.zoomValue || 1;
        var factor = this.factor = zoom * (96 / 25.4);
        var pages = doc.pages;
        var length = pages.length;
        for (var i = 0; i < length; i++) {
            page = pages[i];
            if (page.Y * zoom >= vT + hLimit) {
                break;
            }
            if ((page.Y + page.Height) * zoom > vT) {
                this.paintPage(i, wLimit, hLimit);
            }
        }
    };
    Renderer.prototype.createPath = function (data) {
        var ctx = this.ctx;
        var factor = this.factor;
        for (var i = 0; i < data.length; i++) {
            switch (data[i] >> 0) {
                case 0x4D:
                    ctx.moveTo(data[i + 1] * factor, data[i + 2] * factor);
                    i += 2;
                    break;
                case 0x4C:
                    ctx.lineTo(data[i + 1] * factor, data[i + 2] * factor);
                    i += 2;
                    break;
                case 0x42:
                    ctx.bezierCurveTo(data[i + 1] * factor, data[i + 2] * factor, data[i + 3] * factor, data[i + 4] * factor, data[i + 5] * factor, data[i + 6] * factor);
                    i += 6;
                    break;
                case 0x51:
                    ctx.quadraticCurveTo(data[i + 1] * factor, data[i + 2] * factor, data[i + 3] * factor, data[i + 4] * factor);
                    i += 4;
                    break;
                case 0x43:
                    ctx.closePath();
                    break;
                case 0x53:
                    i += 2;
                    break;
                case 0x41:
                    i += 7;
                    break;
            }
        }
    };
    Renderer.prototype.drawImage = function (parser, obj, src, x, y, cx, cy, dx, dY, width, height) {
        var ctx = this.ctx;
        var img = obj.img;
        if (img) {
            if (obj.Loaded) {
                ctx.save();
                ctx.translate(x, y);
                if (obj.Path && obj.Path.length) {
                    ctx.beginPath();
                    var CTM = obj.CTM;
                    if (CTM) {
                        ctx.transform(CTM[0], CTM[1], CTM[2], CTM[3], CTM[4], CTM[5]);
                    }
                    this.createPath(obj.Path[0]);
                    ctx.clip();
                    if (CTM) {
                        ctx.transform(1 / CTM[0], 0, 0, 1 / CTM[3], 0, 0);
                    }
                }
                if (height - dY - y < cy) {
                    ctx.rect(0, 0, width, height - dY - y);
                    ctx.clip();
                }
                ctx.drawImage(img, 0, 0, cx, cy);
                ctx.restore();
            }
        }
        else {
            var self_1 = this;
            self_1.loadingImages = (self_1.loadingImages || 0) + 1;
            obj.img = img = new Image();
            parser.getResFile(obj.ResourceID, function (data) {
                img.src = URL.createObjectURL(data);
                img.onload = function () {
                    obj.Loaded = 1;
                    if (!--self_1.loadingImages) {
                        self_1.repaint();
                    }
                };
            });
        }
    };
    Renderer.prototype.paintPage = function (pageIndex, wLimit, hLimit) {
        // console.log("pageIndex==" + pageIndex);
        var parser = this.parser;
        var ctx = this.ctx;
        var factor = this.factor;
        var doc = this.doc;
        var bound, oldSize = -1, oldColor = -1, oldStyle = 0, oldFont = 0, pageData = doc.pages[pageIndex], layers = pageData.layers;
        // if (!layers) {
        if (pageIndex == 0) {
            // pageData = parser.parsePage(pageIndex, true);
            layers = pageData.layers;
        }
        else {
            if (pageData.Content)
                parser.parseNextPage(parser, pageIndex);
            //return;
        }
        // }
        var zoom = this.zoomValue, dX = this.scrollx = pageData.Width * zoom < wLimit ? this.vLeft - (wLimit - pageData.Width * zoom) / 2 : this.vLeft, dY = this.scrolly = this.vTop - pageData.Y * zoom;
        ctx.strokeStyle = "#bbb";
        ctx.lineWidth = zoom;
        ctx.strokeRect(-dX, -dY, pageData.Width * zoom, pageData.Height * zoom);
        if (!layers) {
            return;
        }
        for (var ii = 0; ii < layers.length; ii++) {
            var Objs = layers[ii].Objs;
            for (var i = 0; i < Objs.length; i++) {
                var Obj = Objs[i];
                bound = Obj.Boundary;
                var x = bound[0] * factor - dX;
                var y = bound[1] * factor - dY;
                var w = bound[2] * factor, h = bound[3] * factor;
                if (x + w <= 0 || y + h <= 0 || x >= wLimit || y >= hLimit) {
                    continue;
                }
                if (Obj.ResourceID) {
                    this.drawImage(parser, Obj, Obj.ResourceID, x, y, w, h, dX, dY, pageData.Width * zoom, pageData.Height * zoom);
                }
                else if (Obj.MovieID) {
                    var src = parser.getFilePath(Obj.MovieID);
                    var embed = document.createElement("embed");
                    embed.setAttribute("style", "position:absolute;top:0px;right:0px;width:100px;height:80px;background:lightgray");
                    //embed.setAttribute("src", file);
                    embed.src = src;
                    // embed.style.top = y + "px";
                    // embed.style.left = x + "px";
                    // embed.style.height = h +"px";
                    // embed.style.width = w +"px";
                    document.body.appendChild(embed);
                }
                else if (Obj.AbbreviatedData) {
                    ctx.translate(x, y);
                    ctx.beginPath();
                    this.createPath(Obj.AbbreviatedData);
                    if (Obj.Stroke) {
                        ctx.strokeStyle = this.formColor(Obj.StrokeColor);
                        if (Obj.LineWidth) {
                            ctx.lineWidth = Obj.LineWidth * factor;
                        }
                        else {
                            ctx.lineWidth = 1;
                        }
                        ctx.stroke();
                    }
                    else {
                        ctx.fillStyle = this.formColor(Obj.FillColor);
                        ctx.fill();
                        oldColor = -1;
                    }
                    ctx.translate(-x, -y);
                }
                else {
                }
            }
        }
        for (var ii = 0; ii < layers.length; ii++) {
            var Objs = layers[ii].Objs;
            for (var i = 0; i < Objs.length; i++) {
                var Obj = Objs[i];
                bound = Obj.Boundary;
                var x = bound[0] * factor - dX;
                var y = bound[1] * factor - dY;
                var w = bound[2] * factor, h = bound[3] * factor;
                if (x + w <= 0 || y + h <= 0 || x >= wLimit || y >= hLimit) {
                    continue;
                }
                if (Obj.ResourceID) {
                }else if (Obj.MovieID) {
                }else if (Obj.AbbreviatedData) {
                }else {
                    var Size = Obj.Size;
                    var Style = Obj.Bold ? 1 : 0;
                    if (Obj.Italic) {
                        Style |= 2;
                    }
                    
                    var Font_1 = Obj.Font && doc.PublicRes ? doc.PublicRes[Obj.Font] : 0;
                    if (!Font_1) {
                        Font_1 = "宋体";
                    }
                    var fontSize = Size * factor;
                    if(Font_1 == '方正小标宋简体' && fontSize>=38){
                    	fontSize = 38;
                    }
                    
                    var fontName = {
                    	"方正小标宋简体":"FZXiaoBiaoSong-B05S",
                    	"仿宋":"FangSong",
                    	"宋体":"SimSun",
                    	"新宋体":"SimSun",
                    	"华文彩云":"STCaiyun",
                    	"华文隶书":"STLiTi",
                    	"黑体":'"STHeiti","STHeiti SC Medium"'
                    };
                    if(fontName[Font_1]){
                    	Font_1 = Font_1 + ',' + fontName[Font_1];
                    }
                    Font_1 += ',宋体,SimSun,Verdana,"Lantinghei SC",微软雅黑,"Microsoft Yahei"';
                    //console.log(Font_1,Size,factor,fontSize,Obj,doc,Style);
                    this.fillText(Obj, ctx, Font_1,fontSize, Style);
                }
            }
        }
        if (this.needRestore) {
            ctx.restore();
            this.needRestore = false;
            this.scale = 1;
        }
    };
    Renderer.prototype.setWindowHeight = function (clientHeight) {
        this.clientHeight = clientHeight;
    };
    return Renderer;
}());
exports.Renderer = Renderer;

	})
 ]);
