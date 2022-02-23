<?php exit;?>{
    "systemPassword": "n3GC3Thi2QxxGegnr8P4",
    "systemName": "KodExplorer",
    "systemDesc": "Даоюн. Менеджер ресурсов",
    "pathHidden": "thumb.db,Thumb.db,.DS_Store,.gitignore,.git",
    "autoLogin": "0",
    "needCheckCode": "0",
    "firstIn": "desktop",
    "newUserApp": "trello,一起写office,微信,365日历,石墨文档,ProcessOn,计算器,icloud,OfficeConverter",
    "newUserFolder": "document,desktop,pictures,music",
    "newGroupFolder": "share,doc,pictures",
    "desktopFolder": "desktop",
    "rootListUser": "1",
    "rootListGroup": 0,
    "csrfProtect": 0,
    "currentVersion": "4.46",
    "menu": [
        {
            "name": "desktop",
            "url": "index.php%3Fdesktop",
            "target": "0",
            "subMenu": "0",
            "use": "1",
            "type": ""
        },
        {
            "name": "explorer",
            "url": "index.php%3Fexplorer",
            "target": "0",
            "subMenu": "0",
            "use": "1",
            "type": ""
        },
        {
            "name": "editor",
            "url": "index.php%3Feditor",
            "target": "0",
            "subMenu": "0",
            "use": "1",
            "type": ""
        },
        {
            "name": "RompR",
            "url": "..%2Frompr%2Findex.php%3Fdesktop",
            "target": "_blank",
            "subMenu": "0",
            "use": "1",
            "type": ""
        },
        {
            "name": "MajorDoMo",
            "url": "..%2F..%2Findex.php",
            "target": "_blank",
            "subMenu": "0",
            "use": "1",
            "type": ""
        },
        {
            "name": "Webmin",
            "url": "https%3A%2F%2Fmajordomo%3A10000%2Fsysinfo.cgi%3Fxnavigation%3D1",
            "target": "_blank",
            "subMenu": "1",
            "use": "1",
            "type": ""
        },
        {
            "name": "GoogleDrive",
            "url": "https%3A%2F%2Fdrive.google.com%2Fdrive%2Fmy-drive",
            "target": "_blank",
            "subMenu": "1",
            "use": "1",
            "type": ""
        },
        {
            "name": "Trello",
            "url": "https%3A%2F%2Ftrello.com%2Fuser13273594%2Fboards",
            "target": "_blank",
            "subMenu": "1",
            "use": "1",
            "type": ""
        },
        {
            "name": "KodeExplorer26",
            "url": "http%3A%2F%2F192.168.10.26%2F3rdparty%2Fkalcaddle%2F",
            "target": "0",
            "subMenu": "1",
            "use": "1",
            "type": ""
        }
    ],
    "pluginList": {
        "yzOffice": {
            "id": "yzOffice",
            "regiest": {
                "user.commonJs.insert": "yzOfficePlugin.echoJs"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1;user:;group:;role:",
                "openWith": "dialog",
                "fileExt": "doc,docx,docm,dot,dotx,dotm,rtf,wps,wpt,xls,xlsx,xlt,xlsm,csv,ppt,pptx,pps,ppsx",
                "fileSort": "50",
                "cacheFile": "1",
                "preview": "1"
            }
        },
        "VLCPlayer": {
            "id": "VLCPlayer",
            "regiest": {
                "user.commonJs.insert": "VLCPlayerPlugin.echoJs"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1;user:;group:;role:",
                "fileExt": "aac,arc,arj,asf,asx,avi,f4v,flv, m2ts,m4v,mp2,mov,mp3,mp4,mp4v,mpe,mpg,mts,mkv,ogv,3gp,mpeg,wav,wma,wmv,rm,rmvb,vob,webm,webmv,   mp3,wav,wma,m4a,aac,oga,ogg,webma",
                "fileSort": "1"
            }
        },
        "picasa": {
            "id": "picasa",
            "regiest": {
                "user.commonJs.insert": "picasaPlugin.echoJs"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1",
                "fileExt": "jpg,jpeg,png,bmp,gif,ico,svg,cur,webp",
                "fileSort": 10
            }
        },
        "adminer": {
            "id": "adminer",
            "regiest": {
                "templateCommonHeader": "adminerPlugin.addMenu"
            },
            "status": 1,
            "config": {
                "menuSubMenu": 1,
                "pluginAuth": "role:1"
            }
        },
        "jPlayer": {
            "id": "jPlayer",
            "regiest": {
                "user.commonJs.insert": "jPlayerPlugin.echoJs"
            },
            "status": 0,
            "config": {
                "pluginAuth": "all:1",
                "fileExt": "mp3,wav,m4a,aac,oga,ogg,webma,mp4,m4v,flv,mov,f4v,ogv,webm,webmv,m3u8a,m3ua,flac,fla,rtmp,rtmpa",
                "fileSort": 10
            }
        },
        "toolsCommon": {
            "id": "toolsCommon",
            "regiest": {
                "user.commonJs.insert": "toolsCommonPlugin.echoJs"
            },
            "status": 1,
            "config": []
        },
        "zipView": {
            "id": "zipView",
            "regiest": {
                "user.commonJs.insert": "zipViewPlugin.echoJs",
                "globalRequest": "zipViewPlugin.changeData"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1;user:;group:;role:",
                "fileExt": "zip,tar,gz,tgz,ipa,apk,rar,7z,iso,bz2,zx,z,arj,epub",
                "fileSort": "10"
            }
        },
        "photoSwipe": {
            "id": "photoSwipe",
            "regiest": {
                "user.commonJs.insert": "photoSwipePlugin.echoJs"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1",
                "fileExt": "jpg,jpeg,png,bmp,gif,ico,svg,cur,webp",
                "fileSort": 20
            }
        },
        "epubReader": {
            "id": "epubReader",
            "regiest": {
                "user.commonJs.insert": "epubReaderPlugin.echoJs"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1;user:;group:;role:",
                "openWith": "window",
                "fileExt": "epub,fb2,fb3",
                "fileSort": "100"
            }
        },
        "imageExif": {
            "id": "imageExif",
            "regiest": {
                "user.commonJs.insert": "imageExifPlugin.echoJs",
                "share.image": "imageExifPlugin.imageCheck",
                "explorer.image": "imageExifPlugin.imageCheck"
            },
            "status": "1",
            "config": {
                "pluginAuth": "all:1"
            }
        },
        "webodf": {
            "id": "webodf",
            "regiest": {
                "user.commonJs.insert": "webodfPlugin.echoJs"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1;user:;group:;role:",
                "openWith": "dialog",
                "fileExt": "odf,odt,ods,odp",
                "fileSort": "100"
            }
        },
        "codeBlast": {
            "id": "codeBlast",
            "regiest": {
                "user.commonJs.insert": "codeBlastPlugin.echoJs"
            },
            "status": 0,
            "config": {
                "pluginAuth": "all:1;user:;group:;role:",
                "open": "1",
                "shakeTimes": "10",
                "style": "1"
            }
        },
        "pdfjs": {
            "id": "pdfjs",
            "regiest": {
                "user.commonJs.insert": "pdfjsPlugin.echoJs"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1;user:;group:;role:",
                "fileExt": "pdf,djvu,ofd",
                "fileSort": "500"
            }
        },
        "ofdView": {
            "id": "ofdView",
            "regiest": {
                "user.commonJs.insert": "ofdViewPlugin.echoJs"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1",
                "fileExt": "ofd",
                "fileSort": 100
            }
        },
        "simpleClock": {
            "id": "simpleClock",
            "regiest": {
                "user.commonJs.insert": "simpleClockPlugin.echoJs"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1"
            }
        },
        "macClock": {
            "id": "macClock",
            "regiest": {
                "user.commonJs.insert": "macClockPlugin.echoJs"
            },
            "status": 0,
            "config": {
                "pluginAuth": "all:1;user:;group:;role:"
            }
        },
        "DPlayer": {
            "id": "DPlayer",
            "regiest": {
                "user.commonJs.insert": "DPlayerPlugin.echoJs"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1;user:;group:;role:",
                "fileSort": "100",
                "fileExt": "ofd",
                "subtitle": "1"
            }
        },
        "emlViewer": {
            "id": "emlViewer",
            "regiest": {
                "user.commonJs.insert": "emlViewerPlugin.echoJs"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1;user:;group:;role:",
                "openWith": "dialog",
                "fileSort": "1000",
                "fileExt": "eml,mht,mhtml"
            }
        },
        "litewrite": {
            "id": "litewrite",
            "regiest": {
                "templateCommonHeader": "litewritePlugin.addMenu"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1;user:;group:;role:",
                "menuSubMenu": "1"
            }
        },
        "googleDocs": {
            "id": "googleDocs",
            "regiest": {
                "user.commonJs.insert": "googleDocsPlugin.echoJs"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1",
                "fileExt": "doc,docx,rtf,xls,xlsx,wps,ppt,pptx,pps,.odt,ods,odp,ott,ots,otp,dxf,ps,eps,xps,psd,tif,tiff,bmp,svg,pages,ai,ttf",
                "fileSort": -1
            }
        },
        "officeLive": {
            "id": "officeLive",
            "regiest": {
                "user.commonJs.insert": "officeLivePlugin.echoJs"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1;user:;group:;role:",
                "pluginAuthOpen": "0",
                "openWith": "window",
                "apiServer": "https:\/\/view.officeapps.live.com\/op\/view.aspx?src=",
                "fileExt": "doc,docx,docm,dot,dotx,dotm,rtf,xls,xlsx,xlt,xlsb,xlsm,csv,ppt,pptx,pps,ppsx,pptm,potm,ppam,potx,ppsm,odt,ods,odp,ott,ots,otp,wps,wpt",
                "fileSort": "5"
            }
        },
        "WysiwygEditor": {
            "id": "WysiwygEditor",
            "regiest": {
                "user.commonJs.insert": "WysiwygEditorPlugin.echoJs"
            },
            "status": 1,
            "config": {
                "plugins": "picture,link,video,table,undo,redo,help",
                "fileExt": "wysiwyg,html,xhtml,htm",
                "fileSort": "500"
            }
        },
        "websvn": {
            "id": "websvn",
            "regiest": {
                "templateCommonHeader": "websvnPlugin.addMenu"
            },
            "status": 0,
            "config": []
        },
        "WebSVN": {
            "id": "WebSVN",
            "regiest": {
                "templateCommonHeader": "WebSVNPlugin.addMenu"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:0;user:;group:;role:1",
                "menuSubMenu": "1"
            }
        },
        "svgView": {
            "id": "svgView",
            "regiest": {
                "user.commonJs.insert": "svgViewPlugin.echoJs"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1;user:;group:;role:",
                "fileExt": "svg,cur,webp",
                "fileSort": "1"
            }
        },
        "staroeRadio": {
            "id": "staroeRadio",
            "regiest": {
                "user.commonJs.insert": "staroeRadioPlugin.echoJs"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1;user:;group:;role:"
            }
        },
        "h5Player": {
            "id": "h5Player",
            "regiest": {
                "user.commonJs.insert": "h5PlayerPlugin.echoJs"
            },
            "status": 1,
            "config": {
                "pluginAuth": "all:1;user:;group:;role:",
                "fileExt": "mp3,wav,m4a,aac,oga,ogg,webma,mp4,m4v,flv,mov,f4v,ogv,webm,webmv,m3u8a,m3ua,flac,fla,rtmp,rtmpa",
                "fileSort": "10"
            }
        }
    },
    "globalIcp": "pashaCo",
    "globalCss": "",
    "globalHtml": "",
    "groupShareFolder": "share",
    "wallpageDesktop": "1,2,3,4,5,6,7,8,9,10,11,12,13",
    "wallpageLogin": "2,3,6,8,9,11,12",
    "versionType": "A",
    "passwordCheck": "0"
}