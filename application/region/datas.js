export default {
    XianMu: [{
        title: '现场管理',
        item: [{
                badge: 8,
                label: '安全',
                icon: require('../assets/xanquan.png')
            }, {
                badge: 0,
                label: '质量',
                icon: require('../assets/xzhilian.png')
            }, {
                badge: 0,
                label: '实测实量',
                icon: require('../assets/xscsl.png')
            }, {
                badge: 0,
                label: '记工',
                icon: require('../assets/xjg.png')
            },
        ]
    },{
        title: '项目资料',
        item: [{
                badge: 0,
                label: '图纸',
                icon: require('../assets/xtuzhi.png')
            }, {
                badge: 0,
                label: '质量',
                icon: require('../assets/xzhilian.png')
            }, {
                badge: 0,
                label: '文件',
                icon: require('../assets/xwenjian.png')
            }, {
                badge: 0,
                label: '物资',
                icon: require('../assets/xwuzi.png')
            },
        ]
    },{
        title: '协同办公',
        item: [{
                badge: 2,
                label: '施工任务单',
                icon: require('../assets/xsgrwd.png')
            } 
        ]
    }],
    GonZuo: {
        gonZuoItem: [
            {badge: 8, label: '负责的', icon: require('../assets/fuzede.png')},
            {badge: 0, label: '分派的', icon: require('../assets/fenpaide.png')},
            {badge: 0, label: '参与的', icon: require('../assets/canyude.png')},
            {badge: 0, label: '新建', icon: require('../assets/xianjiade.png')},
        ]
    },
    YinYon: [{
        title: '办公管理',
        item: [{
                badge: 8,
                label: '公告',
                icon: require('../assets/ygg.png')
            }, {
                badge: 0,
                label: '工作',
                icon: require('../assets/ygz.png')
            }, {
                badge: 0,
                label: '考勤',
                icon: require('../assets/ykq.png')
            }, {
                badge: 0,
                label: '云盘',
                icon: require('../assets/yyp.png')
            },
        ]
    },{
        title: '项目管理',
        item: [{ 
                label: '施工日志',
                icon: require('../assets/yrz.png')
                
            }, {
                badge: 0,
                label: '安全',
                icon: require('../assets/yaq.png')
            }, { 
                label: '质量',
                icon: require('../assets/yzl.png')
            }, { 
                label: '日报',
                icon: require('../assets/yrb.png')
            }, { 
                label: '计划',
                icon: require('../assets/yjh.png')
            }, { 
                label: '记工',
                icon: require('../assets/yjg.png')
            }, { 
                label: '物资',
                icon: require('../assets/ywz.png')
            }, { 
                label: '文件',
                icon: require('../assets/ywj.png')
            }, { 
                label: '材料',
                icon: require('../assets/ycl.png')
            }, {
                badge: 0,
                label: '机械',
                icon: require('../assets/yjx.png')
            }, { 
                label: '实测实量',
                icon: require('../assets/yscsl.png')
            } 
        ]
    },{
        title: '公司管理',
        item: [{ 
                label: '预算',
                icon: require('../assets/yys.png')
            }, { 
                label: '采购',
                icon: require('../assets/ycg.png')
            },  { 
                label: '合同',
                icon: require('../assets/yht.png')
            },  { 
                label: '报销',
                icon: require('../assets/ybx.png')
            } 
        ]
    },{
        title: '统计管理',
        item: [{ 
                label: '考勤统计',
                icon: require('../assets/ykqtj.png')
            }, { 
                label: '工作统计',
                icon: require('../assets/ygztj.png')
            }, { 
                label: '物资统计',
                icon: require('../assets/ywztj.png')
            }, { 
                label: '记工统计',
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
 
            var ctx = canvas_image.getContext("2d");
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
            if (prePoint != null) {
                drawAppend(prePoint)
            }
            prePoint = point
            draw([point], 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzI3NDhGNkRDQUQzMTFFOUJCODZCNDU3OTU4REI0QTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzI3NDhGNkVDQUQzMTFFOUJCODZCNDU3OTU4REI0QTQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3Mjc0OEY2QkNBRDMxMUU5QkI4NkI0NTc5NThEQjRBNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3Mjc0OEY2Q0NBRDMxMUU5QkI4NkI0NTc5NThEQjRBNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrJgHuoAAAjYSURBVHja7F0JbFVF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', false)
        }

        function drawAppend(point) { 
            draw([point], 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTU4ODY5M0ZDQUQzMTFFOThCNjZDNDQ5NzYwMjE4RkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTU4ODY5NDBDQUQzMTFFOThCNjZDNDQ5NzYwMjE4RkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNTg4NjkzRENBRDMxMUU5OEI2NkM0NDk3NjAyMThGQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxNTg4NjkzRUNBRDMxMUU5OEI2NkM0NDk3NjAyMThGQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuWrkrUAAAjkSURBVHja7F0JbFVF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', false)
        }

        function drawOne() {
            var canvas_point = document.getElementById('canvas_point')
            canvas_point.addEventListener('click', function(e) { 
                var point = {
                    x: e.pageX,
                    y: e.pageY
                } 
                draw([point])
                window.postMessage(JSON.stringify(point))
            })
        }
        
        function draw(points, imgUrl, clear) {
            points = points || []
            imgUrl = imgUrl || 'data:image/png;base64,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'
            clear = clear == void 0 ? true : false
            var canvas_point = document.getElementById('canvas_point')
            var ctx = canvas_point.getContext("2d");
            ctx.font="24px Georgia"
            if (clear)
                ctx.clearRect(0, 0, canvas_point.width, canvas_point.height);  
            var bimg = new Image()
                bimg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzUyQzUxNDJDRUVDMTFFOTg3REZBMDRCQzYyMEMzMTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzUyQzUxNDNDRUVDMTFFOTg3REZBMDRCQzYyMEMzMTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NTJDNTE0MENFRUMxMUU5ODdERkEwNEJDNjIwQzMxOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NTJDNTE0MUNFRUMxMUU5ODdERkEwNEJDNjIwQzMxOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgTcYWIAAAjfSURBVHja7F0JbFVF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'
            var img = new Image()
            img.src = imgUrl
            img.onload = function(e) { 
                for(var point of points) {  
                    //point.pointStatus == 2 ? bimg : 
                    ctx.drawImage(img, point.x - 12, point.y - 20, 62, 62)
                    ctx.fillText(point.label || '', point.x + 42, point.y + 15);
                }
            }
        } 
    </script>
</body>
    `
}