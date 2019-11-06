export default {
    XianMu: [{
        title: '现场管理',
        item: [{
                badge: 0,
                label: '安全',
                switch: false,
                icon: require('../assets/xanquan.png')
            }, {
                badge: 0,
                switch: false,
                label: '质量',
                icon: require('../assets/xzhilian.png')
            }, {
                badge: 0,
                switch: false,
                label: '实测实量',
                icon: require('../assets/xscsl.png')
            }
            // , {
            //     badge: 0,
            //     label: '记工',
            //     icon: require('../assets/xjg.png')
            // },
        ]
    }, {
        title: '项目资料',
        item: [{
                switch: false,
                label: '图纸',
                icon: require('../assets/xtuzhi.png')
            }, {
                switch: false,
                label: '文件',
                icon: require('../assets/xwenjian.png')
            }, {
                switch: false,
                label: '物资',
                icon: require('../assets/xwuzi.png')
            },
        ]
    },{
        title: '协同办公',
        item: [{
                switch: false,
                label: '施工任务单',
                icon: require('../assets/xsgrwd.png')
            } 
        ]
    }],
    GonZuo: {
        gonZuoItem: [
            {badge: 0, label: '负责的', icon: require('../assets/fuzede.png')},
            {badge: 0, label: '分派的', icon: require('../assets/fenpaide.png')},
            {badge: 0, label: '参与的', icon: require('../assets/canyude.png')},
            {badge: 0, label: '新建', icon: require('../assets/xianjiade.png')},
        ]
    },
    YinYon: [{
        title: '办公管理',
        item: [{
                badge: 0,
                label: '公告',
                switch: false,
                icon: require('../assets/ygg.png')
            }, {
                badge: 0,
                label: '考勤',
                switch: false,
                icon: require('../assets/ykq.png')
            }, {
                badge: 0,
                label: '云盘',
                switch: false,
                icon: require('../assets/yyp.png')
            },
        ]
    }, {
        title: '项目管理',
        item: [{ 
                label: '施工日志',
                switch: false,
                icon: require('../assets/yrz.png')
            }, {
                badge: 0,
                label: '安全',
                switch: false,
                icon: require('../assets/yaq.png')
            }, { 
                label: '质量',
                switch: false,
                icon: require('../assets/yzl.png')
            }, { 
                label: '日报',
                switch: false,
                icon: require('../assets/yrb.png')
            }, { 
                label: '计划',
                switch: false,
                icon: require('../assets/yjh.png')
            }, { 
                label: '模型浏览',
                switch: false,
                icon: require('../assets/moxin.png')
            }, { 
                label: '记工',
                switch: false,
                icon: require('../assets/yjg.png')
            }, { 
                label: '物资',
                switch: false,
                icon: require('../assets/ywz.png')
            }, { 
                label: '文件',
                switch: false,
                icon: require('../assets/ywj.png')
            }, { 
                label: '材料',
                switch: false,
                icon: require('../assets/ycl.png')
            }, {
                badge: 0,
                label: '机械',
                switch: false,
                icon: require('../assets/yjx.png')
            }, {
                label: '施工任务单',
                switch: false,
                icon: require('../assets/xsgrwd.png')
            }, { 
                label: '实测实量',
                switch: false,
                icon: require('../assets/yscsl.png')
            } 
        ]
    }, {
        title: '公司管理',
        item: [{ 
                label: '预算',
                switch: false,
                icon: require('../assets/yys.png')
            }, { 
                label: '采购',
                switch: false,
                icon: require('../assets/ycg.png')
            },  { 
                label: '合同',
                switch: false,
                icon: require('../assets/yht.png')
            },  { 
                label: '报销',
                switch: false,
                icon: require('../assets/ybx.png')
            } 
        ]
    },{
        title: '统计管理',
        item: [{ 
                label: '考勤统计',
                switch: false,
                icon: require('../assets/ykqtj.png')
            }, { 
                label: '工作统计',
                switch: false,
                icon: require('../assets/ygztj.png')
            }, { 
                label: '物资统计',
                switch: false,
                icon: require('../assets/ywztj.png')
            }, { 
                label: '记工统计',
                switch: false,
                icon: require('../assets/yjgtj.png')
            } 
        ]
    }],
    html: `
    <body style="padding: 0; margin: 0">
    <div id='box'>  
        <canvas id='canvas_image'></canvas>
        <canvas id='canvas_point' style="position: absolute; left: 0; top: 0"></canvas>
    </div>
    <script> 
        //指令 
        //{ key: 'drawPic', pic: '', p}
        //{ key: 'drawPoints', value: [{},{}]} 
        //{ key: 'drawSelect', value: {}} //重画 select point
        //{ key: 'drawAppend', value: {}}
        //{ key: 'drawOne' }
        (function() {
            window.postMessage = function(data) {
                window.ReactNativeWebView.postMessage(data);
            };
        })();  
        document.addEventListener('message', function(msg) {  
            var instruction = JSON.parse(msg.data) 
            switch (instruction.key) {
                case 'drawPic': 
                    drawPic(instruction.value)
                    break
                case 'drawPoints': 
                    drawPoints(instruction.value) 
                    break
                case 'drawBooms':
                    drawBooms(instruction.value) 
                    break
                case 'drawSelect':
                    drawSelect(instruction.value)
                    break
                case 'drawAppend': 
                    drawAppend(instruction.value)
                    break
                case 'postList':
                    postList(instruction.value)
                    break
                case 'drawOne':
                    drawOne()
                    break
            } 
        });  
        var rangeX = rangeY = 35, pointList
        function postList(list) {
            pointList = list
        }
        function drawPic(url) {
            var canvas_image = document.getElementById('canvas_image')
            var canvas_point = document.getElementById('canvas_point')
 
            var ctx = canvas_image.getContext("2d")
            var img = new Image()
            img.src = url
            img.onload = function(e) {    
                var newHeight =  (window.screen.width * 2.73) / img.width * img.height 
                canvas_point.width = canvas_image.width =  window.screen.width * 2.73
                canvas_point.height = canvas_image.height =  newHeight

                ctx.drawImage(img, 0, 0, canvas_image.width, newHeight) 
                window.postMessage('drawPicOver')
            }
        }
        function drawBooms(list) { 
            pointList = list
            draw(list, 'boom')
            var canvas_point = document.getElementById('canvas_point')
            canvas_point.addEventListener('click', function(e) { 
                var _ins = []
                for(var p of list) {
                    if (p.x - rangeX < e.pageX && p.x + rangeX > e.pageX && p.y - rangeY < e.pageY && p.y + rangeY > e.pageY)
                        _ins.push(p)
                }
                if (_ins.length) { 
                    window.postMessage(JSON.stringify(_ins))
                }
            })
        }
        function drawPoints(list) { 
            pointList = list
            draw(list)
            var canvas_point = document.getElementById('canvas_point')
            canvas_point.addEventListener('click', function(e) { 
                var _ins = []
                for(var p of list) {
                    if (p.x - rangeX < e.pageX && p.x + rangeX > e.pageX && p.y - rangeY < e.pageY && p.y + rangeY > e.pageY)
                        _ins.push(p)
                }
                if (_ins.length) { 
                    window.postMessage(JSON.stringify(_ins))
                }
            })
        }
        var prePoint = null
        function drawSelect(point) { 
            draw(pointList, null, true, point)
        }
        function drawAppend(point) { 
            pointList.push(point)
            draw(pointList, null, true, point)
        }
        function drawOne() {
            var canvas_point = document.getElementById('canvas_point')
            canvas_point.addEventListener('click', function(e) { 
                var point = {
                    x: e.pageX - 15,
                    y: e.pageY - 35
                } 
                draw([point])
                window.postMessage(JSON.stringify(point))
            })
        }
        function isYiCe(point) {
            if (point.pointCheckList && point.pointCheckList.length) {
                for (var i = 0; i < point.pointCheckList.length; i ++) {
                    if (point.pointCheckList[i].dataLogList && point.pointCheckList[i].dataLogList.length === 0) {
                        return false
                    }
                }
            }
            return true
        }
        function draw(points, imgUrl, clear, point2) {
            points = points || [] 
            clear = clear == void 0 ? true : false
            var canvas_point = document.getElementById('canvas_point')
            var ctx = canvas_point.getContext("2d")
            ctx.font="30px Georgia"
            if (true)
                ctx.clearRect(0, 0, canvas_point.width, canvas_point.height)  

            var img = new Image(), imgSelect = new Image(), imgYiCe = new Image(), imgBoom = new Image()
            imgSelect.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDEzRkUzRDhGMDc5MTFFOTg3QTlFMzVBQ0Y5RjRCMUMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDEzRkUzRDdGMDc5MTFFOTg3QTlFMzVBQ0Y5RjRCMUMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENTg0OEI5MzhFM0YxMUU5QjBENUM2QzA1MEU5N0VDMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENTg0OEI5NDhFM0YxMUU5QjBENUM2QzA1MEU5N0VDMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnD5InAAAAUMSURBVHja7Jx9SJ1VHMfPHS6tTDFjSmAkQjG3UUabWVEZQhS1Wi9E2Ssu1qA/Gq3RjaD9sbz9UeufCHohsqRcUS0qlFq2hpWVZeWsqWyUFKtZrmnbfGE9fX+cI11G6n2e55zfOed6f/AV0XPvOc/nOW+/33lJBEEgchbeFuUQRLO82N+QTMT9hlLoIuhs6DyoDKqEStLSHIWGoV+gAagf6lG/x7NUYAlcNCuAboCuhxqgonnSF0Pl0Krj/v459B7UBu3L5qZKtWsztBdqVeCKYnxfHfSYqnkvQOdmI7gkNAQ9Cp1uoMtpgnqh5w18vxVwtdA3UPNx/ZYpWwv9AN3mM7gNUDdUw9wlUJ/4imq+3oGjQm+1PGtoUi+u1Bdw76pCu2C1aupS7jq4N6CrHZuvngl1QSe6Cu4p6EZHJ/tV0A4Xwd0J3e+4p3ShrgFDF7gzoJc8cTOp773WFXCveuaj01RlsW1wq5WT7pOdolw1q+CeFn7ag9ASO+CSiZvws0L4aw/bqnEPCb/tHrz8fF5wyUS1kIFHn+2kqPPOODXudpEd1sgN7kqGh/oNmjKcRz1az8k84JIJcpjPMfQg30ProLOUm1SlmtNbhvKjMH4dV41bZeghtqoX8pyQ0eIjQi7QvCnkGkWjoXzP5wK31EDhyWV7IAMP5VYDeVdzgavUXPAR6O4M074GdWjOv4ILXLnmgoeNWDypOf9TucDlay74rpDpafFnUmP+JVzgjmgGFxbCQeiQxvyLuMAd1gzutJDpi0W8hey4L86ZGlcfMn2tmn/pssNc4A5oBkdh9zALKUnN+f/BBU73BhdytrdlmHY9dKnm/H/mAjdkYBJ6DdQCnTBHmvugZwzkPRj2A1G3edHmlnEhQ9A67Q4hw/AvQh8pJ58GgpXQXdDFhlyuL8J+IBF5K2sy0RmhUw9r/wiejUGlIhWMcjRVsnaGB+KA9klYaHEL5tuS4GzWyvtGU8Gv+NnpOTQKkr5uoyk87jm4FlSAMX5wqeBDIffz+mrNNjvf9Z5CoyjzTzbBUa372DNo5NRvdGG4vxny6WxTo5rAWwc3ouD5YC8LufjjzASTtrA+4Ti0PiEjMc7NzGkHUJuj0PbrdBFNuDS3QG87Bo3ihxdAf7ruC9IZre2OQKP+lyLGw7440WuEPO9g06iG1cWZr9mKPtA21/ctQftLQTPi2XCEbeiwSDsztEOqeQ6ZyoDr2OVVjPDGFLRBk5lwnlcleB0M0Ggn1YDph+E+IU2bET8wXNMGOB7Exi0QVwi5EKPTxtU8bQ/XQ9i6PoMuMNAVUflbjZ4/cj6AzXtHLhe0UBLPaCsGHWzr5y687QtbLoN2RvzshILWZ6PgLtx0Ux8B3oRqnt/ZKrQrVwQRvEw3F04qaN/aLLBLdyvRRpquedJMuQDNNXBkl0CfzfK/aSH3lfS6UFDXwAUKXvf/1DTacNPjSkFdvAbtmIL0VVpNo9HzS5cK6er9cTPw3hEyNPW1awXME+4aNc/rXC1c7sbCHLgcuBy4bDYXBodCISMlNLldIeStOWXq7wXKL6XQ0e9CLvGRU/+pkGGp8YUIjg6ebRFyp3nhHOkKlOjY0jLx35F2gkk31jwCjS4kcBQFrolZU2lvHkV+2W+jsNnHTecGh2hGTe5ZIS9HjmJH1ecbFlofR/3SvdAmISPB5GItTxsc6NQOHSieVIPAzOCwO21wGLNV+ETukvho9q8AAwAGu+WXWfjvSAAAAABJRU5ErkJggg=='
            imgYiCe.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTcxMUVBQThGMDc5MTFFOUFBQTI5OEYxMjE0QjYyOUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTcxMUVBQTdGMDc5MTFFOUFBQTI5OEYxMjE0QjYyOUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NjI1NDhCMThFNDAxMUU5OTZGOTg2MkVDNDJCOTMzMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NjI1NDhCMjhFNDAxMUU5OTZGOTg2MkVDNDJCOTMzMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvJQveAAAAKSSURBVHjavJjPS1RRFMfvPLN0EgxqFi1iCPJHm8J+WRpY5I+FgqBtazEYuFSQiloGFWR/QBQELiUS1FxMOoz4Y2WhlGgwm6AmVFyMRIpW4/fiEYZ68+499755B74c5t37zny4951zf4Sy2azg2tnxmXK4WqgFOg9VQ2FqTkELUBKaod95baGx3vV5iAMGoEq4O1AXdETztVHoBXltMIcB9QjuC9THgJLWBo2QTuq+dEADKAI3DF0WdiYBm6AOaEzV2VFAnaDvxRZq3w5B76BbxmCAKoabgo4L/20AajAdsTgUFYWzCSjCAsNoyay7JgprRdCbfI3/lQtAlcBloIMiGGtByYjrjFhPgFDSnupOZUwEazWYpTOeYOhQB1dh+AdpaNOixnmO2EWDoG9pvYySHhrEuKqq/FXMgLJYdub8XoMeQ6vQS0acU6oRO80Eu5fn+StojhGnTAXGycZ1pPmiR/ssI1ZYBbbBCYZkKfNoP8yIFVKBpRnBSqGbHm3tjFg/VWAp5jfW75IwIcrUY4w4GVVWfmOCHYWWCTBJ5aLXLcsU9kkFJlf83zobyH+sj2Rqk55TiSxL03YnSPsLDemslc8DBhvEgPxQgqFTglkcbe0+Zwd7OyCoZxiIr9pg6LwE96DAUPKQc5e95wfcEzqoFsJWbA4jEq4b7rXPUHLnccGtqLJO4oCL0YHXD/sFndMp5FpXBIBr96G+7UByh/xdp7P23QXg5M3Oe0OoP9AV+uCFr2AE12wAt01XDB84LznsHN+DizOgLpkUbMeoAO1Na1KjK2v6rMEI7rpi+3wD+mga37HMNHm/8dnlubwHS9gEtgLDqO3QWXQ+53ErNG5b8GxHTNoWZd00Lf5jPsQUuwIMAP1flwx/yfitAAAAAElFTkSuQmCC'
            img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTBCNTExOEVGMDc5MTFFOTk2NTFEMEE1MTJBQjk4RjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTBCNTExOERGMDc5MTFFOTk2NTFEMEE1MTJBQjk4RjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NjI1NDhCMThFNDAxMUU5OTZGOTg2MkVDNDJCOTMzMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NjI1NDhCMjhFNDAxMUU5OTZGOTg2MkVDNDJCOTMzMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuZistEAAAJdSURBVHjaxJhNSFRRGIbPTP8mGGgLFyJBWm4E8yeTyER0IAMXuVVCElwaDP7vgkaoli3EIHApoqDmYqxQtNpkJComuBHSSHGRSElm03vgQ0a53nO+c8+9vfAg997hmwfnnu/8hBKJhDhIR0hoJg1cBxFQCK6CFHq2AubAJHhH1+rEEocuTwpeckETeAAuHPOZAuI+XY+BXvqrnTDjs4/AMoi6SDnlLhglLtkUuwg+gG7hLVJwCdyxIZZF70upsJMz4BWo9yJ2CkyDTGE//aDcVCwOsoV/eUOvCUtMjrrbwt+cAIMcsbPguQgmt0C1rlgLOC2CS4+uWKMINrIZ56vEykCO4Resg18eepyrWLFB0SGaL7OJLoMaN4/eODpXXmEWlM3yXtL1JngMNkAfo85l1X8sjynWdsz9F+Ajo06qSowzGrfAosvz94xaKSqxbWaxVJfn5xm1QiqxdUaxc6DO5Vkto9aOSmyF+Y49dRgwIRqpGYw6P1Sj8itTLB18IcFJahcPnUaZIvMqMTnj/zFYckcJ00zpvGPxgKekv2BYZ658FrDYAPimI/aW2Ry9pp2zUGwISOoJWOWIyd1Mp89ScpPTarLmj9FG1Y9897IZkWkGLy1LyZVHkVNT5W545Yp2xJLUT3BNp5HrHhHUWuhve7RCXrN9diFPdiYMpfbBDXrhrR+qCNpqceV+0xHDrF+nPclycYZUiUnDDhv+NBFaTajC+vlsiMlUKJbPleCTafGwx5EmzzcWHO5X0Zwr/pfYHu1FPyfdqwGvvTY8r2IyuzTqZmjyH7fRif8JMAD2Ymeku+d+7QAAAABJRU5ErkJggg=='
            imgBoom.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0M2QzIzQzJGQzZEMTFFOTk5MDU4NjkxQjFDMkY0RTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0M2QzIzQzNGQzZEMTFFOTk5MDU4NjkxQjFDMkY0RTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQzZDMjNDMEZDNkQxMUU5OTkwNTg2OTFCMUMyRjRFOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQzZDMjNDMUZDNkQxMUU5OTkwNTg2OTFCMUMyRjRFOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiEvIyYAAAKRSURBVHjavJhPaBQxFMZnt1VrLVTQPfQgRdCqF6G2ai2CimgPCoXWqyJFoadBIdiiR0GFxktuoiB4FFHwTw9rW1b8c1KptKJCL4KutOKhIipWXb+wT6g4O8lLZuaD31tmsvv2I5m8SZKrVCoBW6FoRtwOekAH2AgaqXUGvAAl8Jiua0vJyNv1TENtiMfBMbCyxrfaiaN0fRdcok9r5RmmziK+ASLGVJQOgjvEWtsf1VsYKiDeBl2Bn7TBfaAPjPr1WCjW0PPia+qvloF74LC7sVAsQXwIWoLkdQ3scu2xImgN0tM4KPCMhULPut1BuqoDN2o15v6rY6FoQJwHS4Ns1INaVrTpsRMZmtK6YDuUA0G2ascobY43FopuxPWOf1AG3zxqXGyPbXVIepPel63EGYccO02VfwMzoS6W/YuuP4JzYA5cZuRZZ+qxTUxjQzXuXwFPGXmaTMY4s/ETpvnLmPYnjFyNJmOfWclC0RTTvoKRK2cyVmYkWw4OxbT1MnJ9MRmbYT5jMmLC5GimrmbkmTfNyndMY6vAazJYonJxMmqWGTRlMqbf+D/ZS+7qqlZ4VP8H8UOpZJmWO1nqN7hl8668mLGx6+iQD2ZjSk4wi6Ovhjkr2CMZmRpBR7y1N6bkK8TTKZvSm5xT/DW/kudpo5qGZn02I9rcIOLVhE3plUdnVFHl7cSVHKANbxL6CrbYFHK7IwIlexOobwtAr5DfJ3t2oaQ+2bnvaOoX2EEPfMKHKlVz+x3M/aAjhmfpnPb8a67IMLXNpWDnnQamOqwli2+yhs/fWNXcHsPyeS947po+7znT9PnGdMR9fQ424ZPYz5iSC7QXnVx09wAY8y14vj2m9Z1m3SN6+Y8mkDP4I8AAtkOHJhNzKv4AAAAASUVORK5CYII='

            img.onload = function(e) { 
                for(var point of points) {   
                    if (imgUrl == 'boom') {
                        ctx.drawImage(imgBoom, point.x - 12, point.y - 20, 62, 62)
                    } else if (point2 && point2.label == point.label) {  
                        ctx.drawImage(imgSelect, point.x - 25, point.y - 32, 88, 88)
                    } else if (isYiCe(point)) { 
                        ctx.drawImage(imgYiCe, point.x - 12, point.y - 20, 62, 62)
                    } else { 
                        ctx.drawImage(img, point.x - 12, point.y - 20, 62, 62)
                    }
                    ctx.fillText(point.label || '', point.x + 50, point.y + 15)
                }
            }
        } 
    </script>
</body>
    `
}