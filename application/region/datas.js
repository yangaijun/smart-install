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
        var rangeX = rangeY = 15, pointList
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

        function drawSelect(point) {
            draw(pointList)
            draw([point], 'data:image/png;base64,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', false)
        }

        function drawAppend(point) { 
            draw([point], 'data:image/png;base64,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', false)
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
            ctx.font="18px Georgia"
            if (clear)
                ctx.clearRect(0, 0, canvas_point.width, canvas_point.height);  
            var img = new Image()
            img.src = imgUrl
            img.onload = function(e) { 
                for(var point of points) {  
                    ctx.drawImage(img, point.x - 12, point.y - 20, 38, 38)
                    ctx.fillText(point.tag || '',point.x + 22, point.y + 5);
                }
            }
        } 
    </script>
</body>
    `
}