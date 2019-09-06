const JianTou = require('../assets/old/youjiantou.png')
const ZiXunItem = [
    [
        {type: 'text-h4', prop: 'topic', value: '10月20日嘉实正式成为最新大佬， 2019年，让美好与我同在...'},
        [
            {type: 'text-tag', prop: 'readStatus', value: '置顶', filter: {1: '置顶', 0: '普通'}, load: value => value},
            {type: 'text-tag', prop: 'readState', value: '置顶', filter: {1: '热门', 0: '普通'}, load: value => value},
            {type: 'text-label', prop: 'createDate', value: '2分钟前'},
            {type: 'text-label', prop: 'readNum', filter: value => `阅读 ${value}`},
            {type: 'br', style: {flexDirection: 'row', paddingTB: 15, alignItems: 'center',}}
        ],
        {type: 'br', style: {flex: 1, marginRight: 5}}
    ],
    {type: 'image', value: require('../assets/image_header.png'), prop: 'remark', style: {width: 120, height: 80}},
    {type: 'click-row', prop: 'into', style: {marginTop: 1}}
]

export default {
    GeRenZhonXin: [
       
        [
            {type: 'image', prop:'userIconUrl', value: require('../assets/image_header.png'), style: {width: 62, height: 62, borderRadius: 62}},
            [
                {type: 'text', prop: 'userName', value: 'Hunter.xu', style: {color: '#252525', fontSize: 18}},
                {type: 'text', prop: 'workName', value: '后来', style: {color: '#787878'}},
                {type: 'br', style: {marginLeft: 12, flex: 1}}
            ],
            // {type: 'image', value: icon, style: {height: 10, width: 6}},
            {type: 'click', prop: 'ccc', style: {flexDirection: 'row', height: 91, backgroundColor: 'white', alignItems: 'center', paddingLR: 19, paddingTB: 15, backgroundColor: 'white'}}
        ], [
            {type: 'image', value: require('../assets/old/tonxunlu.png'), style: {width: 19, height: 19}},
            {type: 'text', value: '通讯录', style: {flex: 1, fontSize: 15, color: '#252525', marginLeft: 12}},
            {type: 'image', value: JianTou, style: {height: 10, width: 6}},
            {type:　'click', prop: 'tonxunlu', style:　{backgroundColor: 'white', flexDirection: 'row', paddingLR: 19, paddingTB: 14, alignItems: 'center', marginTop: 10, marginBottom: 10}}
        ], [
            {type: 'image', value: require('../assets/old/xuigaimima.png'), style: {width: 19, height: 19}},
            {type: 'text', value: '密码修改', style: {flex: 1, fontSize: 15, color: '#252525', marginLeft: 12}},
            {type: 'image', value: JianTou, style: {height: 10, width: 6}},
            {type:　'click', prop: 'xiugaimima', style:　{backgroundColor: 'white', flexDirection: 'row', paddingLR: 19, paddingTB: 14, alignItems: 'center',marginBottom: 1}}
        ], [
            {type: 'image', value: require('../assets/old/qinchuhuancun.png'), style: {width: 19, height: 19}},
            {type: 'text', value: '清理缓存', style: {flex: 1, fontSize: 15, color: '#252525', marginLeft: 12}},
            {type: 'image', value: JianTou, style: {height: 10, width: 6}},
            {type:　'click', prop: 'clear', style:　{backgroundColor: 'white', flexDirection: 'row', paddingLR: 19, paddingTB: 14, alignItems: 'center', marginBottom: 10}}
        ], [
            {type: 'image', value: require('../assets/old/yijianfankui.png'), style: {width: 19, height: 19}},
            {type: 'text', value: '意见反馈', style: {flex: 1, fontSize: 15, color: '#252525', marginLeft: 12}},
            {type: 'image', value: JianTou, style: {height: 10, width: 6}},
            {type:　'click', prop: 'yijianfankui', style:　{backgroundColor: 'white', flexDirection: 'row', paddingLR: 19, paddingTB: 14, alignItems: 'center', marginBottom: 1}}
        ], [
            {type: 'image', value: require('../assets/old/guanyuwomen.png'), style: {width: 19, height: 19}},
            {type: 'text', value: '关于我们', style: {flex: 1, fontSize: 15, color: '#252525', marginLeft: 12}},
            {type: 'image', value: JianTou, style: {height: 10, width: 6}},
            {type:　'click', prop: 'guanyuwomen', style:　{backgroundColor: 'white', flexDirection: 'row', paddingLR: 19, paddingTB: 14, alignItems: 'center', marginBottom: 1}}
        ], [
            {type: 'image', value: require('../assets/old/fenxianlianjie.png'), style: {width: 19, height: 19}},
            {type: 'text', value: '分享链接', style: {flex: 1, fontSize: 15, color: '#252525', marginLeft: 12}},
            {type: 'image', value: JianTou, style: {height: 10, width: 6}},
            {type:　'click', style:　{backgroundColor: 'white', flexDirection: 'row', paddingLR: 19, paddingTB: 14, alignItems: 'center', marginBottom: 1}}
        ], [
            {type: 'image', value: require('../assets/old/lianxiwomen.png'), style: {width: 19, height: 19}},
            {type: 'text', value: '联系我们', style: {flex: 1, fontSize: 15, color: '#252525', marginLeft: 12}},
            {type: 'image', value: JianTou, style: {height: 10, width: 6}},
            {type:　'click', style:　{backgroundColor: 'white', flexDirection: 'row', paddingLR: 19, paddingTB: 14, alignItems: 'center', marginBottom: 10}}
        ], 
        {type: 'button-primary', value: '退出登录', prop: 'exit', style: {fontSize: 15, color: 'white', backgroundColor: '#FF6D73', marginLR: 15,}}  
    ],
    SheZhi: [
        [
            {type: 'text', value: '设置', style: {fontSize: 22, color: 'white', flex: 1}}, 
            {type:　'br', style: {flexDirection: 'row', height: 62, backgroundColor: '#3C3B40', alignItems: 'center', paddingLR: 24}}
        ],
        {type: 'scroll', prop: 'list', value: [{},{},{}], style: {backgroundColor: 'white'}, columns: [
            {type: 'text-h3', prop: 'title', value: '办公管理', style: {paddingLR: 24, paddingTB: 5}},
            {type: 'views', prop: 'item', value: [], columns: [
                {type: 'image-item', prop: 'icon', value: require('../assets/icon.png')},
                {type: 'text-h4', prop: 'label', value: '公告', style: {flex: 1}},
                {type: 'switch', prop: 'switch', value: true},
                {type: 'br-row', style: {marginBottom: 1, paddingTB: 2}}
            ]}
        ]}
    ],
    YinYon: [
        // {type: 'scroll', value: [{}], prop: 'list', style: {flex: 1, backgroundColor: 'white'}, columns: [
            [
                {type: 'text', value:'', style: {height: 20, width: 4, backgroundColor: '#2EBBC4', marginRight: 8}},
                {type: 'text-title', prop: 'title', value: '办公管理'},
                {type: 'br', style: {flexDirection: 'row', alignItems: 'center', paddingLR: 24, paddingTB: 5, marginTop: 30}}
            ],
            {type: 'views', prop: 'item', value: [{}], style: {flexDirection: 'row', flexWrap: 'wrap'}, columns: [
                {type: 'image-item', prop: 'icon', value: require('../assets/icon.png')},
                {type: 'text-badge', prop: 'badge', value: 0, load: value => value, style: {marginTop: -60, marginLeft: 35, marginBottom: 35}},
                {type: 'text-h4', prop: 'label', value: '公告'},
                {type: 'click',  style: {align: 'center', width: '25', marginTop: 16}}
            ]}
        // ]}
    ],
    GuoLv: [
        {type: 'text-h3', value: '测区类型', style: {backgroundColor: 'white', marginTop: 1, paddingLeft: 10, paddingTB: 10}},
        {type: 'view', prop: 'cequleixin', style: {backgroundColor: 'white', paddingLeft: 20, paddingBottom: 10}, value:[{}], columns: [
            {type: 'checkbox', prop: 'b1', value: false, unCheck: require('../assets/uncheck.png'), checked: require('../assets/check.png')},
            {type: 'text-h4', prop: 'bName', value: '--', style: {paddingLeft: 15}},
            {type: 'br', style: {flexDirection: 'row', alignItems: 'center', paddingTB: 5}}
        ]},
        {type: 'text-h3',  value: '检查项', style: {backgroundColor: 'white', marginTop: 1, paddingLeft: 10, paddingTB: 10}},
        {type: 'view', prop: 'jianchaxian',  style: {backgroundColor: 'white', paddingLeft: 20, paddingBottom: 10}, value:[{}], columns: [
            {type: 'checkbox', prop: 'b', value: false, unCheck: require('../assets/uncheck.png'), checked: require('../assets/check.png')},
            {type: 'text-h4', prop: 'checkName', value: '--', style: {paddingLeft: 15}},
            {type: 'br', style: {flexDirection: 'row', alignItems: 'center', paddingTB: 5}}
        ]}
    ],
    GonZuoTai_KaoQin: [
        [
            {type: 'text', value:'', style: {height: 20, width: 4, backgroundColor: '#2EBBC4', marginRight: 5,}},
            {type: 'text-title', value: '考勤'},
            {type: 'button-text', prop: 'kaoqin_qudaka', value: '去打卡'},
            {type: 'image', value: require('../assets/right.png'), style: {width: 16, height: 16}},
            {type: 'br', style: {flexDirection: 'row', alignItems: 'center'}}
        ], [
            {type: 'text-h4', value: '出勤'},
            {type: 'text-h1', value: 4, style: {color: '#2EBBC4', paddingLR: 8}},
            {type: 'text-h4', value: '天'},
            {type: 'br', style: {flexDirection: 'row', align: 'center', height: 120}}
        ],
        {type: 'br', style: {backgroundColor: 'white', marginTop: 10, padding: 10,}}
    ],
    GonZuoTai_GonZuo: [
        [
            {type: 'text', value:'', style: {height: 20, width: 4, backgroundColor: '#2EBBC4', marginRight: 5,}},
            {type: 'text-title', prop: 'title', value: '工作'},
            {type: 'br', style: {alignItems: 'center', flexDirection: 'row'}}
        ],
        {type: 'views', prop: 'gonZuoItem', value: [{}], style: {flexDirection: 'row'}, columns: [
            {type: 'image-item', prop: 'icon', value: require('../assets/icon.png')},
            {type: 'text-badge', prop: 'badge', value: 0, load: value => value, style: {marginTop: -60, marginLeft: 35, marginBottom: 35 }},
            {type: 'text-h4', prop: 'label', value: '公告'},
            {type: 'click', style: {align: 'center', width: '24', marginTop: 10}}
        ]},
        {type: 'br', style: {backgroundColor: 'white', marginTop: 5, padding: 10, paddingTB: 20,}}
    ],
    GonZuoTai_ShiGonRiZhi: [
        [
            {type: 'text', value:'', style: {height: 20, width: 4, backgroundColor: '#2EBBC4', marginRight: 5,}},
            {type: 'text-title', value: '施工日志'},
            {type: 'button-text', value: '更多'},
            {type: 'image', value: require('../assets/right.png'), style: {width: 16, height: 16}},
            {type: 'br', style: {flexDirection: 'row', alignItems: 'center', paddingBottom: 15}}
        ], 
        {type: 'scroll-x', prop: 'sgrz', value: [{},{},{},{}], style: {backgroundColor: 'white'}, columns: [
            {type: 'text-h4', value: '开封销户', style: {color: '#FF8400', backgroundColor: '#dedde6', padding: 3, borderRadius: 8, alignSelf: 'center', paddingLR: 8}},
            {type: 'text-p', value: '居庙堂之高，处江湖之远， 上善若水，水利万物而..'},
            {type: 'text', value: '2019-09-15'},
            [
                {type: 'image-icon', value: require('../assets/cloud.png')},
                {type: 'text-h5', value: '多云'},
                {type: 'br', style: {flexDirection: 'row', alignItems: 'center'}}
            ],
            {type: 'br', style: {padding: 10, borderRadius: 5, borderColor: '#f5f5f5', borderWidth: 2, marginLR: 5, width: '33'}}
        ]},
        {type: 'br', style: {backgroundColor: 'white', marginTop: 5, padding: 10, paddingTB: 15}}
    ],
    GonZuoTai_XinWenZiXun: [
        [
            {type: 'text', value:'', style: {height: 20, width: 4, backgroundColor: '#2EBBC4', marginRight: 5}},
            {type: 'text-title', value: '新闻资讯'},
            {type: 'button-text', prop: 'zixun_more', value: '更多'},
            {type: 'image', value: require('../assets/right.png'), style: {width: 16, height: 16}},
            {type: 'br', style: {flexDirection: 'row', alignItems: 'center', paddingBottom: 15}}
        ], 
        {type: 'views', prop: 'XinWenZiXun', value: [], style: {backgroundColor: '#f5f5f5'}, columns: ZiXunItem },
        {type: 'br', style: {backgroundColor: 'white', marginTop: 5, padding: 10, paddingTB: 15}}
    ],
    ZiXunItem: ZiXunItem,
    GonZuoItem: [
        [
            {type: 'text-h4', value: '格林小镇三号底柱质量整改...', style: {flex: 1}},
            {type: 'text-status', prop: 'status', value: 1, filter: {'1': '待接受', '2' : '进行中', 3: '审核中', 4: '已完成'}, style: value => {
                let bgColor = {1: '#FF6D73', 2: '#FAB722', 3: '#00CC9B', 4 : '#999999'}[value]
                return {
                    backgroundColor: bgColor, 
                    marginLR: 8
                }
            }},
            {type: 'text-label', value: '苏州歌林小镇', style: {alignItems: 'flex-end'}},
            {type: 'click', style: {flexDirection: 'row', alignItems: 'center'}}
        ], [
            [
                {type: 'text-label', value: '王二头', filter:  value => `分派人: ${value}`},
                [
                    {type: 'text-primary', value: '质量整改工作  08.08截止'},
                    {type: 'text', prop: 'cd', filter: {1: '紧急', 2: '一般', 3: '重要'}, style: (value) => {
                        let color = {1: '#FF6D73', 2: '#00CC9B', 3: '#FAB722'}[value]
                        return {
                            color: color,
                            marginLeft: 8
                        }
                    }},
                    {type: 'br-normal-row'}
                ],
                {type: 'br', style: {flex: 1}}
            ],
            {type: 'progress-circle', prop: 'progress', value: .5, style: {width: 50}},
            {type: 'click', style: {flexDirection: 'row', alignItems: 'center', paddingTB: 10}}
        ], [
            {type: 'button-az', value: '任务完成', load: (value, data) => [2].includes(data.status), style: {color: '#878787', borderColor: '#878787'}},
            {type: 'button-az', value: '进度反馈', load: (value, data) => [2].includes(data.status)},
            {type: 'button-az', value: '拒绝任务', load: (value, data) => [1].includes(data.status), style: {color: '#878787', borderColor: '#878787'}},
            {type: 'button-az', value: '接受任务', load: (value, data) => [1].includes(data.status)},
            {type: 'button-az', value: '催办审核', load: (value, data) => [3].includes(data.status)},
            {type: 'button-az', value: '审核回复', load: (value, data) => [3].includes(data.status)},
            {type: 'button-az', value: '删除', load: (value, data) => [4].includes(data.status), style: {color: '#878787', borderColor: '#878787'}},
            {type: 'br-bottoms'}
        ],
        {type: 'br-list-item'}
    ],
    GonZuoForm: [
        [
            {type: 'text-label', value: '项目名称:', style: {width: 88}},
            {type: 'text-h4', prop: 'projectName', value: '混凝土干裂裂缝处理'},
            {type: 'br', style: {flexDirection: 'row', paddingTB: 5}}
        ], [
            {type: 'text-label', value: '检查人:', style: {width: 88}},
            {type: 'text-h4', prop: 'checkUser', value: '王二头'},
            {type: 'br', style: {flexDirection: 'row', paddingTB: 5}}
        ],  [
            {type: 'text-label', value: '指定人:', style: {width: 88}},
            {type: 'text-h4', prop: 'rectifyUserNames', filter: value => (value || '').toString()},
            {type: 'br', style: {flexDirection: 'row', paddingTB: 5}}
        ], 
        {type: 'text-h4', prop: 'content', style: { paddingTB: 5}},
        {type: 'text-label', prop: 'contentDetail', style: { paddingTB: 5}},
        [
            {type: 'text-label', value: '截止日期：', style: {width: 88}},
            {type: 'text-h4', prop: 'finishedDate', value: '2019-07-13'},
            {type: 'br', style: {flexDirection: 'row', paddingTB: 5}}
        ],  [
            {type: 'text-label', value: '描述：', style: {width: 88}},
            {type: 'text-h4', prop: 'contentDetail', value: '描述内容描述内容征信，件大事的建安大 地啊的哈抠脚大汉。 等哈看单号加大卡安静的小两口达看见啦 阿达，按打款。', style: {flex: 1}},
            {type: 'br', style: {flexDirection: 'row', paddingTB: 5}}
        ],  [
            {type: 'text-label', value: '检查项:', style: {width: 88}},
            {type: 'text-h4', prop: 'checkLists', value: '描述内容描述内容征信，件大事的建安大 地啊的哈抠脚大汉。 等哈看单号加大卡安静的小两口达看见啦 阿达，按打款。', style: {flex: 1}},
            {type: 'br', style: {flexDirection: 'row', paddingTB: 5}}
        ],  [
            {type: 'text-label', value: '检查部位:', style: {width: 88}},
            {type: 'text-h4', prop: 'checkSite', value: '描述内容描述内容征信，件大事的建安大 地啊的哈抠脚大汉。 等哈看单号加大卡安静的小两口达看见啦 阿达，按打款。', style: {flex: 1}},
            {type: 'br', style: {flexDirection: 'row', paddingTB: 5}}
        ], [
            {type: 'text-label', value: '参与人：', style: {width: 88}},
            (data) => {
                let icons = (data.aboutIcons || [])
                if (data.zgr) {
                    icons.push(...data.zgr)
                } 
                let arr = []
                for (let i = 0; i < icons.length; i ++) {
                    arr.push({type: 'image', filter: () => `http://www.jasobim.com:8080/${icons[i].userIcon || icons[i].url}`,  style: {width: 35, height: 35, borderRadius: 35}},)
                }
                arr.push({type: 'br', style: {flexDirection: 'row'}})
                return arr
            },
            {type: 'button-image', prop: 'add', value: require('../assets/xianjiade.png'),style: { flex: 1, width: 35, height: 35, borderRadius: 35}},
            {type: 'br', style: {flexDirection: 'row', paddingTB: 5}}
        ], 
        {type: 'br', style: {backgroundColor: 'white', padding: 15}}    
    ],
    //施工日志  表格
    SGRZ_Table: [
        {type: 'text', value: '天气', style: {flex: 1, align: 'center'}},
        [
            {type: 'text-h5', value: '多云 > 阴', style: {padding: 5, paddingTB: 10, align: 'center'}},
            {type: 'text-h5', value: '晴', style: {padding: 5, paddingTB: 10, borderColor: '#ccc', borderTopWidth: 1, borderBottomWidth: 1, align: 'center'}},
            {type: 'text-h5', value: '阵雨', style: {padding: 5, paddingTB: 10, align: 'center'}},
            {type: 'br', style: {flex: 2, borderColor: '#ccc', borderLeftWidth: 1, borderRightWidth: 1}}
        ],
        {type: 'text', value: '温度(℃)', style: {flex: 1, align: 'center'}},
        [
            {type: 'text-h5', value: '- 5', style: {padding: 5, paddingTB: 10, align: 'center'}},
            {type: 'text-h5', value: '2', style: {padding: 5, paddingTB: 10, borderColor: '#ccc', borderTopWidth: 1, borderBottomWidth: 1, align: 'center'}},
            {type: 'text-h5', value: '1', style: {padding: 5, paddingTB: 10, align: 'center'}},
            {type: 'br', style: {flex: 2, borderColor: '#ccc', borderLeftWidth: 1, borderRightWidth: 1}}
        ],
        {type: 'text', value: '风力(级)', style: {flex: 1, align: 'center'}},
        [
            {type: 'text-h5', value: '3', style: {padding: 5, paddingTB: 10, align: 'center'}},
            {type: 'text-h5', value: '2', style: {padding: 5, paddingTB: 10, borderColor: '#ccc', borderTopWidth: 1, borderBottomWidth: 1, align: 'center'}},
            {type: 'text-h5', value: '4', style: {padding: 5, paddingTB: 10, align: 'center'}},
            {type: 'br', style: {flex: 2, borderColor: '#ccc', borderLeftWidth: 1}}
        ],
        {type: 'br-normal-row', style: {borderColor: '#ccc', borderWidth: 1, backgroundColor: '#f5f5f5', marginLR: 12}}
    ],
    CancelAnConfirm: [
        {type: 'button-text', prop: 'cancel', value: '取消', style: {flex: 1, padding: 12, align: 'center', fontWeight: 'bold', fontSize: 16, color: '#979797'}},
        {type: 'text', style: {height: 50, width: 1, backgroundColor: '#f5f5f5'}},
        {type: 'button-text-primary', prop: 'confirm', value: '确定', style: {flex: 1, padding: 12, align: 'center', fontWeight: 'bold'}},
        {type: 'br', style: {flexDirection: 'row', height: 52, marginTop: 15, borderTopWidth: 1, borderTopColor: '#f5f5f5', marginLR: -10}}
    ],
    ZA_Search: (placeholder, prop) => {
        return [
            {type: 'image-icon', value: require('../assets/search.png'), style: {marginTB: 3}},
            {type: 'input-text', prop: prop || 'content', placeholder: placeholder || '请输入名称、检查人或检查项查询', style: {flex: 1}},
            {type: 'button-image-icon', prop: '_clear', load: (value, data) => data[prop || 'content'], value: require('../assets/clear.png'), style: {marginTB: 3}},
            {type: 'br', style: {flexDirection: 'row', paddingLR: 8, backgroundColor: '#f5f5f5', alignItems: 'center', borderRadius: 20}}
        ].slice()
    },
    CK_Search: (placeholder, prop) => { 
        return [
            {type: 'image-icon', value: require('../assets/search.png')},
            {type: 'input-text', prop: prop || 'content', placeholder: placeholder || '请输入名称、检查人或检查项查询', style: {flex: 1}},
            {type: 'button-image-icon', prop: 'clear', load: (value, data) => data[prop || 'content'], value: require('../assets/clear.png')},
            {type: 'br', style: {flexDirection: 'row', paddingLR: 8, backgroundColor: '#f5f5f5', alignItems: 'center', borderRadius: 5, flex: 1}}
        ]
    },
    SGRZ_ShenChanQinKuan: [
        [
            {type: 'text-form-label', value: '开始时间'},
            {type: 'text-must', value: '*', style: {flex: 1}},
            {type: 'pick-time',  prop: 'productionStartTime', placeholder: '请选择开始时间'},
            {type: 'image-form', value: require('../assets/right.png')},
            {type: 'br-form-row'}
        ], 
        {type: 'text-valid-message', prop: 'productionStartTime-valid', load: value => value},
        [
            {type: 'text-form-label', value: '结束时间'},
            {type: 'text-must', value: '*', style: {flex: 1}},
            {type: 'pick-time', prop: 'productionEndTime', placeholder: '请选择结束时间'},
            {type: 'image-form', value: require('../assets/right.png')},
            {type: 'br-form-row'}
        ], 
        {type: 'text-valid-message', prop: 'productionEndTime-valid', load: value => value},
        [
            {type: 'text-form-label', value: '施工部位'},
            {type: 'text-must', value: '*', style: {flex: 1}},
            {type: 'text-h5', prop: 'constructProgressConstructPart',  placeholder: '请选择施工部位'},
            {type: 'image-form', value: require('../assets/right.png')},
            {type: 'click-form-row', prop: 'shigonbuwei'}
        ], 
        {type: 'text-valid-message', prop: 'constructProgressConstructPart-valid', load: value => value},
        [
            {type: 'text-form-label', value: '施工内容'},
            {type: 'text-must', value: '*', style: {flex: 1}},
            {type: 'text-h5', prop: 'constructContentName', placeholder: '请选择施工内容'},
            {type: 'image-form', value: require('../assets/right.png')},
            {type: 'click-form-row', prop: 'shigonneiron'}
        ], 
        {type: 'text-valid-message', prop: 'constructContentName-valid', load: value => value},
        [
            {type: 'text-form-label', value: '完成工作量'},
            {type: 'text-must', value: '*', style: {flex: 1}},
            {type: 'input-text-form', prop: 'productionWorkLoad', placeholder: '请输入工作量'},
            {type: 'text', prop: 'constructContentUnit', filter: value=> value ? ` (${value})` :''},
            {type: 'br-form-row'}
        ],
        {type: 'text-valid-message', prop: 'productionWorkLoad-valid', load: value => value}
    ],
    JI$_RiLi: [
        [
            {type: 'button-image', prop:　'pre', value: require('../assets/leftprimary.png'), style: {paddingLR: 45, width: 20, height: 20}},
            {type: 'text-primary', prop: 'yearMonth', value: '2019年7月', style: {fontSize: 18, fontWeight: '400'}},
            {type: 'button-image', prop:　'next', value: require('../assets/rightprimary.png'), style: {paddingLR: 45, width: 20, height: 20}},
            {type: 'br-form-row', style: {align: 'center'}}
        ],
        //label标题
        {type: 'views', value: [{label: '一'}, {label: '二'}, {label: '三'}, {label: '四'}, {label: '五'}, {label: '六'}, {label: '日'}], style: {flexDirection: 'row', height: 38, backgroundColor: 'white', align: 'center'}, columns: [
            {type: 'text-primary', prop: 'label', style: {fontSize: 16, fontWeight: '500'}},
            {type: 'br', style: {width: '14.28', align: 'center'}}
        ]}, 
        //内容
        {type: 'views', prop: 'days', value: [], style: {flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'white', marginBottom: 2}, columns: [
            {type: 'text-h5', prop: 'label'},
            [
                {type: 'text-circle', style: {backgroundColor: '#2EBBC4'}, load: (value, data) =>  data.record},
                {type: 'image', value: require('../assets/tianjia.png'), style: {width: 14, height: 14}},
                {type: 'br-normal-row', load: (value, data) =>  data.label && data.label < 12}
            ],
            {type: 'click', prop: 'dayItem', style: {width: '14.28', align: 'center', marginTB: 8, minHeight: 40}}
        ]}
    ],
    SGRZ_GonZuoNeiRon: [
        [
            {type: 'text-form-label', value: '内容分类'},
            {type: 'text-must', value: '*', style: {flex: 1}},
            {type: 'text-h5',  prop: 'constructContentTypeName', placeholder: '请选择内容分类'},
            {type: 'image-form', value: require('../assets/right.png')},
            {type: 'click-form-row', prop: 'neironfenlei'}
        ], 
        {type: 'text-valid-message', prop: 'constructContentTypeName-valid', load: value => value}, 
        [
            {type: 'text-form-label', value: '内容描述'},
            {type: 'input-area-form', prop: 'jobConentContentDescribe', placeholder: '请输入内容', maxLength: 500},
            {type: 'br-form-col'}
        ] , [
            {type: 'text-form-label', value: '备注'},
            {type: 'input-area-form', prop: 'jobContentRemark', placeholder: '请输入备注', maxLength: 100},
            {type: 'br-form-col'}
        ]
    ],
    SGRZ_ShiGonJinDu: [
        [
            {type: 'text-form-label', value: '开始时间'},
            {type: 'text-must', value: '*', style: {flex: 1}},
            {type: 'pick-time',  prop: 'constructProgressStartTime', placeholder: '请选择开始时间'},
            {type: 'image-form', value: require('../assets/right.png')},
            {type: 'br-form-row'}
        ], 
        {type: 'text-valid-message', prop: 'constructProgressStartTime-valid', load: value => value},
        [
            {type: 'text-form-label', value: '结束时间'},
            {type: 'text-must', value: '*', style: {flex: 1}},
            {type: 'pick-time',  prop: 'constructProgressEndTime', placeholder: '请选择结束时间'},
            {type: 'image-form', value: require('../assets/right.png')},
            {type: 'br-form-row'}
        ],  
        {type: 'text-valid-message', prop: 'constructProgressEndTime-valid', load: value => value},
        [
            {type: 'text-form-label', value: '施工部位'},
            {type: 'text-must', value: '*', style: {flex: 1}},
            {type: 'text-h5', prop: 'constructProgressConstructPart',  placeholder: '请选择施工部位'},
            {type: 'image-form', value: require('../assets/right.png')},
            {type: 'click-form-row', prop: 'shigonbuwei'}
        ], 
        {type: 'text-valid-message', prop: 'constructProgressConstructPart-valid', load: value => value},
        [
            {type: 'text-form-label', value: '施工内容'},
            {type: 'text-must', value: '*', style: {flex: 1}},
            {type: 'text-h5', prop: 'constructContentName', placeholder: '请选择施工内容'},
            {type: 'image-form', value: require('../assets/right.png')},
            {type: 'click-form-row', prop: 'shigonneiron'}
        ], 
        {type: 'text-valid-message', prop: 'constructContentName-valid', load: value => value},
        [
            {type: 'text-form-label', value: '班组'},
            {type: 'text-must', value: '*', style: {flex: 1}},
            {type: 'text-h5', prop: 'teamsName',  placeholder: '请选择班组'},
            {type: 'image-form', value: require('../assets/right.png')},
            {type: 'click-form-row', prop: 'banzu'}
        ], 
        {type: 'text-valid-message', prop: 'teamsName-valid', load: value => value},
        [
            {type: 'text-form-label', value: '工作进度'},
            {type: 'text-must', value: '*'},
            {type: 'slider', prop: 'constructProgressNums',  value: 0, style: {flex: 1, paddingLR: 10}},
            {type: 'text-primary', value: 0, filter: (value, data) => (data.constructProgressNums || value) + '%', style: {minWidth: 38, alignItems: 'flex-end'}},
            {type: 'br-form-row'}
        ]
    ]
}