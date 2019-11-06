import util from './utils'
const rules = {
    // not empty
    must: {
        label: '不能为空',
        regular: value => {
            if (value instanceof Array)
                return value.length !== 0
            return !!value
        }
    },
    //empty
    empty: {
        label: '',
        regular: value => {
            if (value instanceof Array)
                return value.length === 0
            return !value
        }
    },
    //cell phone number
    cellphone: { label: '请正确输入手机号码', regular: /^1\d{1}[0-9]\d{4,8}$/ },
    //telphone number
    telphone: { label: '请正确输入电话号码', regular: /^(0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?)$/ },
    //positive integer
    number: { label: '请输入数字', regular: /^[0-9]*$/ },
    //float
    float: { label: '两位小数', regular: /^[0-9]+(.[0-9]{2})?$/ },
    //email
    email: { label: '请正确输入email', regular: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
    //age
    age: { label: '请正确输入年龄', regular: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/ },
    //name
    name: { label: '请正确输入姓名', regular: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/ },
    //url
    url: { label: '请正确输入链接', regular: /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/ },
    //idcard
    idcard: { label: '请正确身份证号码', regular: /^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$/ },
    //account
    account: { label: '仅允许字母开头，字母数字下划线组合5-16长度', regular: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/ },

}

const validations = {
    WZ_XinJian: {
        materialName: 'must',
        materialTypeName: 'must',
        materialUnit: 'must',
        putNum: ['must','number']
    },
    WZ_RKQueRen: {
        materialFrom: 'must'
    },
    WZ_CKWueRen: {
        user: 'must'
    },
    SGRZ_GonZuoNeiRon: {
        constructContentTypeName: 'must'
    },
    SGRZ_ShenChanQinKuan: {
        productionStartTime: 'must',
        productionEndTime: 'must',
        constructProgressConstructPart: 'must',
        constructContentName: 'must',
        productionWorkLoad: 'must'
    },
    SGRZ_ShiGonJinDu: {
        constructProgressStartTime: 'must',
        constructProgressEndTime: 'must',
        constructProgressConstructPart: 'must',
        constructContentName: 'must',
        teamsName: 'must'
    },
    SGRZ_XinJian: {
        tendersName: 'must',
        constructDate: (value) => {  
            if (value instanceof Date) {
                value = util.formatDate.format(value, 'yyyy-MM-dd')
            }
            let date1 = new Date(), date2 = new Date()
            date1.setDate(-15)
            let towWeek = util.formatDate.format(date1, 'yyyy-MM-dd')
            let today = util.formatDate.format(date2, 'yyyy-MM-dd')

            if (value < towWeek || value > today) {
                return '日期不在范围内'
            } 
        }
    },
    ZL_XinJian: {
        startDate: 'must',
        qualityCheckName: 'must' 
    },
    AQ_XinJian: {
        startDate: 'must',
        securityCheckName: 'must' 
    },
    GZ_XinJian: {
        projectName: 'must',
        taskTopic: 'must',
        taskTime: 'must',
        workTaskUserList: 'must'
    }
}

function test(arr, value, data) {
    for(let i of arr) { 
        if (typeof i == 'function') {
            return i(value, data)
        } else if (typeof rules[i].regular == 'function') {
            if (!rules[i].regular(value))
                return rules[i].label
        } else {
            if (!rules[i].regular.test(value))
                return rules[i].label
        }
    }
}

function validate(data, name) {
    let commit = true 
    for (let key in validations[name]) {
        
        let vs = validations[name][key] 
        let back = undefined
        if (typeof vs === 'string') { 
            back = test(vs.split(','), data[key], data)
        } else if (typeof vs === 'function') {
            back = vs(data[key], data)
        } else if (Array.isArray(vs)) {
            back = test(vs, data[key], data)
        }

        if (back === undefined) {
            data[key + '-valid'] = ''
        } else {
            commit = false
            data[key + '-valid'] = back
        } 
       
    }
    return commit
}

export default validate