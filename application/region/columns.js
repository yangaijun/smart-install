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
            {type: 'text', value: '个人中心', style: {fontSize: 22, color: 'white', flex: 1}}, 
            {type:　'br', style: {flexDirection: 'row', height: 62, backgroundColor: '#3C3B40', alignItems: 'center', paddingLR: 24}}
        ],
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
                {type: 'text', value:'', style: {height: 20, width: 4, backgroundColor: '#2EBBC4', marginRight: 8,}},
                {type: 'text-title', prop: 'title', value: '办公管理'},
                {type: 'br', style: {flexDirection: 'row', alignItems: 'center', paddingLR: 24, paddingTB: 5, marginTop: 30}}
            ],
            {type: 'views', prop: 'item', value: [{}], style: {flexDirection: 'row', flexWrap: 'wrap'}, columns: [
                {type: 'image-item', prop: 'icon', value: require('../assets/icon.png')},
                {type: 'text-badge', prop: 'badge', value: 0, load: value => value, style: {marginTop: -60, marginLeft: 35, marginBottom: 38 }},
                {type: 'text-h4', prop: 'label', value: '公告'},
                {type: 'click',  style: {align: 'center', width: '25', marginTop: 22}}
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
            {type: 'button-text', value: '去打卡'},
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
            {type: 'text-h3', value: '格林小镇三号底柱质量整改...'},
            {type: 'text', prop: 'status', value: 1, filter: {'1': '进行中', '2' : '待接受', 3: '审核中'}, style: value => {
                let bgColor = {'1': '#FAB722', '2': '#FF6D73', '3': '#00CC9B'}[value + '']
                return {
                    color: 'white', 
                    backgroundColor: bgColor, 
                    borderRadius: 16,
                    paddingTB: 3,
                    paddingLR: 8,
                    marginLeft: 10
                }
            }},
            {type: 'text-label', value: '苏州歌林小镇', style: {flex: 1, alignItems: 'flex-end'}},
            {type: 'br', style: {flexDirection: 'row', alignItems: 'center'}}
        ], [
            [
                {type: 'text-label', value: '王二头', filter:  value => `分派人: ${value}`},
                {type: 'text-primary', value: '质量整改工作  08.08截止'},
                {type: 'br', style: {flex: 1}}
            ],
            {type: 'progress-circle', value: .5, style: {width: 80}},
            {type: 'br', style: {flexDirection: 'row', alignItems: 'center', paddingTB: 10}}
        ],   [
            {type: 'button-az', value: '整改'},
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
    SearchBox: [
        {type: 'image-icon', value: require('../assets/search.png')},
        {type: 'input-text', prop: 'content', placeholder: '请输入名称、检查人或检查项查询', style: {flex: 1}},
        {type: 'button-image-icon', prop: '_clear', load: (value, data) => data.content, value: require('../assets/clear.png')},
        {type: 'br', style: {flexDirection: 'row', paddingLR: 8, backgroundColor: '#f5f5f5', alignItems: 'center', borderRadius: 26}}
    ],
    ZA_Search: (placeholder, prop) => {
        return [
            {type: 'image-icon', value: require('../assets/search.png')},
            {type: 'input-text', prop: prop || 'content', placeholder: placeholder || '请输入名称、检查人或检查项查询', style: {flex: 1}},
            {type: 'button-image-icon', prop: '_clear', load: (value, data) => data[prop || 'content'], value: require('../assets/clear.png')},
            {type: 'br', style: {flexDirection: 'row', paddingLR: 8, backgroundColor: '#f5f5f5', alignItems: 'center', borderRadius: 26}}
        ]
    },
    CK_Search: (placeholder, prop) => { 
        return [
            {type: 'image-icon', value: require('../assets/search.png')},
            {type: 'input-text', prop: prop || 'content', placeholder: placeholder || '请输入名称、检查人或检查项查询', style: {flex: 1}},
            {type: 'button-image-icon', prop: 'clear', load: (value, data) => data[prop || 'content'], value: require('../assets/clear.png')},
            {type: 'br', style: {flexDirection: 'row', paddingLR: 8, backgroundColor: '#f5f5f5', alignItems: 'center', borderRadius: 5, flex: 1}}
        ]
    },
    CancelAnConfirm:  [
        {type: 'button-text', prop: 'cancel', value: '取消', style: {flex: 1, padding: 15, align: 'center', fontWeight: 'bold', fontSize: 16, color: '#999'}},
        {type: 'text', style: {height: 50, width: 1, backgroundColor: '#f5f5f5'}},
        {type: 'button-text-primary', prop: 'confirm', value: '确定', style: {flex: 1, padding: 15, align: 'center', fontWeight: 'bold'}},
        {type: 'br', style: {flexDirection: 'row', height: 52, marginTop: 25, borderTopWidth: 1, borderTopColor: '#f5f5f5'}}
    ]
}