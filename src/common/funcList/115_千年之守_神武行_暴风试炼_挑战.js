import { myToast, doOspPush } from '@/common/toolAuto';
const normal = -1; //定义常量
const left = 0;
const center = 1;
const right = 2;

export default {
	id: 115,
	name: '千年之守_神武行_风暴试炼_挑战',
	desc: '连续执行3次后未开始，脚本将自动停止',
	operator: [{
		// 挑战
		desc:[1280, 720,
			[
				[left, 46, 55, 0xf0e3af],
				[left, 76, 57, 0x24293e],
				[right, 926, 573, 0xd7d7cf],
				[right, 1174, 636, 0x5f5238],
				[right, 1033, 573, 0xddd5cd],
			]
		],
		oper: [
			[right, 1280, 720, 1142, 590, 1229, 672, 3000]
		]
	}],
	operatorFunc(thisScript, thisOperator) {
		let curCnt = 0;
		let maxCount = 3;
		while (thisScript.oper({
			name: '千年之守_神武行_风暴试炼_挑战',
			operator: thisOperator
		})) {
			curCnt++;
			thisScript.keepScreen();
			if (curCnt >= maxCount) {
				myToast(`连续执行${maxCount}次挑战后未开始，脚本自动停止`);
				doOspPush(thisScript, { text: '脚本已停止，请查看。', before() { myToast('脚本即将停止，正在上传数据'); } });
				thisScript.stop();
				sleep(2000);
				return false;
			}
		}
		if (curCnt) {
			return true;
		}
		return false;
	}
}