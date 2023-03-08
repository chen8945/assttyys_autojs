import { Script } from "@/system/script";
import { InterfaceFuncOrigin, InterfaceFuncOperator, InterfaceFuncOperatorOrigin } from "@/interface/InterfaceFunc";

const normal = -1; //定义常量
const left = 0;
const center = 1;
const right = 2;

export class Func003 implements InterfaceFuncOrigin {
	id = 3;
	name = '悬赏协作';
	config = [{
		desc: '',
		config: [{
			name: 'type',
			desc: '操作',
			type: 'list',
			data: ['关闭', '接受', '拒绝'],
			default: '关闭',
			value: null,
		}, {
			name: 'switch',
			desc: '仅接受勾协',
			type: 'switch',
			default: 'true',
			value: null,
		}]
	}];
	operator: InterfaceFuncOperatorOrigin[] = [{
		desc: [
			1280, 720,
			[
				[center, 519, 139, 0xb29375],
				[center, 727, 171, 0xb29375],
				[center, 855, 518, 0xdc6958],
				[center, 849, 422, 0x53ae5b],
				[center, 783, 124, 0xe8d4cf],
				[center, 734, 141, 0xb29176],
				[center, 509, 136, 0xb39276],
				[center, 844, 396, 0x2e1e22],
				[center, 854, 543, 0x2f2025],
			]
		],
		oper: [
			[center, 1280, 720, 768, 109, 796, 138, 1000], // 关闭
			[center, 1280, 720, 833, 397, 874, 438, 1000], // 接受
			[center, 1280, 720, 835, 500, 875, 538, 1000], // 拒绝
		]
	}, {
		desc: [1280, 720,
			[[center, 519, 139, 0xb29375],
			[center, 727, 171, 0xb29375],
			[center, 855, 518, 0xdc6958],
			[center, 849, 422, 0x53ae5b],
			[center, 572, 473, 0x9d7838],
			[center, 618, 482, 0xdba83a],
			[center, 668, 510, 0x7746a8],
			[center, 694, 490, 0xef492e]]
		]
	}, {//2,呱太弹窗
		desc: [1280, 720,
			[[center, 568, 225, 0xb7b052],
			[center, 733, 228, 0x4d4da2],
			[center, 756, 236, 0xc0c45e],
			[center, 879, 323, 0x690707],
			[center, 690, 422, 0xd3ae72]]
		],
		oper: [
			[center, 1280, 720, 517, 521, 841, 689, 1000]
		]
	}];

	/**
	 * 
	 * @param {*} thisScript script.js 这样可以拿到里面的对象用来做点击等操作
	 * @param {*} thisOperator 转换过适合当前分辨率的operator
	 */
	operatorFunc(thisScript: Script, thisOperator: InterfaceFuncOperator[]): boolean {
		if (thisScript.oper({
			name: '呱太弹窗',
			operator: [{
				desc: thisOperator[2].desc,
				oper: [thisOperator[2].oper[0]]
			}]
		})) {
			return true;
		}
		let thisconf = thisScript.scheme.config['3']; // 获取配置
		if (thisconf.switch && thisconf.type === '接受') {
			if (thisScript.oper({
				name: '悬赏协作_' + thisconf.type + '_勾协',
				operator: [{
					desc: thisOperator[1].desc,
					oper: [thisOperator[0].oper[1]]
				}]
			}, 0)) {
				thisScript.doOspPush(thisScript, { text: '接受到勾协。', before() { thisScript.myToast('正在上传数据'); } });
				return true;
			} else if (thisScript.oper({
				name: '悬赏协作_' + thisconf.type + '_非勾协关闭',
				operator: [{
					desc: thisOperator[0].desc,
					oper: [thisOperator[0].oper[0]]
				}]
			}, 0)) {
				return true;
			}
		} else {
			return thisScript.oper({
				name: '悬赏协作_' + thisconf.type,
				operator: [{
					desc: thisOperator[0].desc,
					oper: [thisOperator[0].oper[{
						'关闭': 0,
						'接受': 1,
						'拒绝': 2
					}[thisconf.type as string]]]
				}]
			}, 0);
		};
	}
}


export default new Func003();