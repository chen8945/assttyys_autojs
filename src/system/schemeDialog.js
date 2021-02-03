import store from '@/system/store';
import _ from 'lodash';

export default {
    show() {
        let staredSchemeList = _.filter(store.get('schemeList', []), item => {
            return item.star;
        });
        if (staredSchemeList.length === 0) {
            toast('还没有收藏任何方案哦~');
            return;
        }
        dialogs.select('选择方案', _.map(staredSchemeList, item => {
            return item.schemeName
        }), i => {
            if (i < 0) return; // 取消
            store.put('currenScheme', staredSchemeList[i]);
            toast('设置方案[' + staredSchemeList[i].schemeName + ']');
        })
    }
}