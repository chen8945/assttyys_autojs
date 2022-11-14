import { setCurrentScheme } from '@/common/tool';

const normal = -1; //定义常量
const left = 0;
const center = 1;
const right = 2;

export default {
    id: 506,
    name: '进入寮活动',
    desc: '进入已开启寮活动，如道馆、宴会、狩猎战、首领退治',
    checked: false,
    operator: [{
        // 检查_道馆是否已开启
        desc: [1280, 720,
            [[center, 520, 212, 0xdad1c0],
            [center, 476, 260, 0xdccdbc],
            [center, 532, 278, 0xc6934f],
            [center, 598, 233, 0x9b6f3b],
            [center, 600, 182, 0xcc4c27]]
        ],
        oper: [
            [center, 1280, 720, 407, 169, 608, 322, 1200]	// 打开道馆
        ]
    }, { // 检查_首领退治是否已开启
        desc: [1280, 720,
            [[center, 765, 235, 0xb63b32],
            [center, 815, 265, 0xdebae3],
            [center, 840, 242, 0x241212],
            [center, 846, 185, 0x802318],
            [center, 705, 242, 0x070605],
            [center, 750, 256, 0xa96b68]]
        ],
        oper: [
            [center, 1280, 720, 656, 177, 855, 322, 1200]	// 打开首领退治
        ]
    }, {
        // 检查_宴会是否已开启
        desc: [1280, 720,
            [[right, 1099, 212, 0x4a3627],
            [right, 1096, 182, 0xcb4823],
            [right, 1036, 265, 0x7e1818],
            [right, 1043, 291, 0xf6b2b2],
            [right, 988, 286, 0x93211f],
            [center, 946, 228, 0x3f2c19]]
        ],
        oper: [
            [center, 1280, 720, 896, 172, 1103, 321, 1200]	// 打开宴会
        ]
    },
    {
        desc: [1280, 720,   // 检查_是否为道馆地图页面
            [
                [left, 214, 45, 0x706e61],
                [left, 44, 53, 0xacbdef],
                [left, 62, 51, 0x2f4079],
                [left, 250, 48, 0x5a3816],
                [left, 162, 644, 0x44281f],
                [left, 91, 620, 0xb9b1a1]
            ]
        ]
    },
    {
        desc: [1280, 720,   // 检查_狩猎战是否开启
            [[left, 244, 469, 0xc47f7e],
            [left, 273, 485, 0xc95757],
            [left, 260, 519, 0x735162],
            [center, 362, 420, 0xfc0c0c],
            [center, 355, 419, 0xfe1515],
            [center, 346, 483, 0xc2ac91]]
        ],
        oper: [
            [left, 1280, 720, 155, 417, 365, 574, 1000]
        ]
    },
    {   // 检测_鬼王集结点
        desc: [1280, 720,   
            [[center, 684, 30, 0xf7e5ac],
            [center, 590, 40, 0x5c6887],
            [center, 516, 15, 0x28295d],
            [center, 761, 22, 0xe6d391],
            [center, 810, 44, 0xfef8d2],
            [right, 1155, 622, 0x2c160e]]
        ],
        oper: [
            [right, 1280, 720, 1068, 602, 1268, 680, 1200]  // 点击鬼王集结点，固定地图右下角
        ]
    }],
    operatorFunc(thisScript, thisOperator) {
        let thisConf = thisScript.scheme.config['506'];

        if (thisScript.oper({
            name: '检测_道馆是否已开启',
            operator: [{
                desc: thisOperator[0].desc,
                oper: thisOperator[0].oper
            }]
        })) {
            return true;
        }

        if (thisScript.oper({
            name: '检测_道馆地图场景',
            operator: [{
                desc: thisOperator[3].desc
            }]
        })) {
            let point = thisScript.findMultiColor('道馆_集结道馆');
            console.log('找到结界道馆的坐标，位置为：', point)
            if (point) {
                let oper = [
                    [point.x - 40, point.y - 160, point.x + 40, point.y - 20, 1200]
                ];
                thisScript.helperBridge.regionClick(oper, thisScript.scheme.commonConfig.afterClickDelayRandom);
                sleep(2000);

                const next_scheme = '道馆';
                setCurrentScheme(next_scheme);
                toastLog(`切换方案为[${next_scheme}]`);
                thisScript.rerun();
            }
        }

        if (thisScript.oper({
            name: '检测_狩猎战是否已开启',
            operator: [{
                desc: thisOperator[4].desc,
                oper: thisOperator[4].oper
            }]
        })) {
            return true;
        }

        if (thisScript.oper({
            name: '检测_狩猎战集结点',
            operator: [{
                desc: thisOperator[5].desc,
                oper: thisOperator[5].oper
            }]
        })) {
            const next_scheme = '狩猎战';
            setCurrentScheme(next_scheme);
            toastLog(`切换方案为[${next_scheme}]`);
            thisScript.rerun();
        }

        if (thisScript.oper({
            name: '检查_宴会是否已开启',
            operator: [{
                desc: thisOperator[2].desc,
                oper: thisOperator[2].oper
            }]
        })) {

            sleep(2000);
            const next_scheme = '宴会';
            setCurrentScheme(next_scheme);
            toastLog(`切换方案为[${next_scheme}]`);
            thisScript.rerun();
        }
    }
}
