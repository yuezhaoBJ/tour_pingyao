var LOCATIONS = [
      {
        id: "pingyao",
        name: "平遥古城",
        emoji: "🏯",
        title: "平遥古城：时空小特工任务清单",
        desc: "穿越 2800 年历史，化身古城守护者！点开任务卡了解详情，完成小挑战后打勾，探索晋商故里的秘密。",
        role: "古城时空小特工",
        rewardTitle: "🏅 古城时空小特工",
        rewardText: "全部任务完成！你已解锁荣誉称号，可以生成专属任务报告啦！",
        reportLabel: "平遥古城 · 时空特工任务报告",
        reportProve: "平遥古城",
        welcomeArt: "🎉🐉🏯🐉🎉",
        reportCopy: {
          1: "登上平遥古城墙，感受明代城防气势。特工在敌楼与垛口之间巡逻，留下城墙打卡照，守护龟城平安。",
          2: "走进票号，触摸晋商「汇通天下」的智慧。算盘声声，汇票传信，特工记录下古代金融的秘密。",
          3: "化身小镖师，了解武装押运的传奇。仗剑护镖的姿态定格成照，一路平安的誓言响彻关山。",
          4: "走进县衙大堂，看见「明镜高悬」。特工明白：公正清明，才是断案与做人的明镜。",
          5: "寻访推光漆器与剪纸等非遗宝藏。匠心手作被镜头珍藏，文化之美在特工心里生了根。",
          6: "舌尖上的平遥：牛肉、碗托、栲栳栳……美食打卡不仅是味道，更是风土人情的一课。",
          7: "夜色中的古城与《又见平遥》光影，让特工穿越百年。华灯与故事，照亮晋商信义之路。",
        },
        tasks: [
          {
            id: 1, icon: "🏯", title: "任务一：城墙巡逻",
            short: "登上城墙，巡逻守卫，发现异常，保护古城安全！",
            place: "平遥古城墙",
            content: "登上雄伟的古城墙，沿着城墙走一段路，感受古城的气势。寻找城墙上的「敌楼」（瞭望防守用的小楼）和「垛口」（城垛上的缺口），数一数你看到了多少个？想象一下古代士兵是如何在这里巡逻和防御的。",
            challenge: "在城墙上拍一张打卡照：敌楼、垛口、角楼，或印有字迹的城砖都可以。",
            knowledge: "现存平遥城墙主体多为明代重修。墙上约有 72 座敌楼、3000 多个垛口，民间传说对应孔子「七十二贤人」与「三千弟子」。城池与六座城门布局像乌龟，因此又叫「龟城」。",
            interact: "wall", cover: "/assets/tasks/task1.jpg",
            photo: { title: "城墙打卡照", hint: "拍敌楼、垛口、角楼，或城砖特写都可以！" },
            quizzes: [
              { q: "平遥城墙上大约有多少座敌楼？", options: ["12 座", "72 座", "300 座"], a: 1, tip: "传说对应孔子的「七十二贤人」。" },
              { q: "城墙上约 3000 个垛口，据说象征什么？", options: ["三千士兵", "孔子的三千弟子", "三千块城砖"], a: 1, tip: "军事建筑里藏着儒家文化哦。" },
              { q: "平遥古城因为形状像什么，又被称为「龟城」？", options: ["凤凰", "龙", "乌龟"], a: 2, tip: "六座城门像龟的头尾和四足。" },
            ],
          },
          {
            id: 2, icon: "🧮", title: "任务二：票号探秘",
            short: "走进票号，破解密码，了解古代金融，找到隐藏线索！",
            place: "日升昌票号 或 协同庆票号",
            content: "走进中国第一家票号——日升昌，或者参观仍保留「地下金库」的协同庆票号。了解古代的「银行」怎样用汇票把银两汇到远方，晋商如何做到「汇通天下」。如果去协同庆，可以看看通往地下金库的通道，感受金库的隐蔽与安全设计。",
            challenge: "在票号内找到算盘，拨几下，并拍一张算盘或票号内景打卡照。",
            knowledge: "票号是清代山西商人创办的金融机构，可办理汇兑、存放银两，是中国近代银行业的重要源头。日升昌创办于清代道光年间，常用纸质汇票代替长途运现银，有「汇通天下」之称；汇票还靠密押暗号、特殊印记等办法防伪。",
            interact: "abacus", cover: "/assets/tasks/task2.jpg",
            photo: { title: "票号打卡照", hint: "拍算盘、柜台，或「汇通天下」匾额都可以！" },
            quizzes: [
              { q: "日升昌票号最像今天的什么机构？", options: ["菜市场", "银行", "学校"], a: 1, tip: "它可以汇银、存银，是金融史上的重要源头。" },
              { q: "「汇通天下」最接近哪一种意思？", options: ["钱可以汇到很远的地方", "天下人都要来平遥吃饭", "城墙通向四面八方"], a: 0, tip: "一张汇票，银两就能在各地流通。" },
              { q: "古人出门为什么更喜欢用汇票，而不是背很多银子？", options: ["汇票更漂亮", "更安全、更方便", "银子太沉抬不动而已，没有别的原因"], a: 1, tip: "少运现银，也少了被劫的风险。" },
            ],
          },
          {
            id: 3, icon: "⚔️", title: "任务三：镖局闯关",
            short: "护送镖车，击败劫镖贼，完成挑战，守护一路平安！",
            place: "中国镖局博物馆 或 华北第一镖局",
            content: "参观镖局，了解古代镖师的职责和生活。看看镖师们使用的兵器和工具，想象他们是如何「走镖」护送贵重物品的。如果条件允许，可以参与一些模拟「运镖」的小游戏或体验活动。",
            challenge: "模仿镖师的经典姿势，拍一张帅气的护镖打卡照。",
            knowledge: "镖局像古代的「武装物流公司」，专门护送银两、货物等贵重物品。票号汇票普及后，长途运送现银变少，镖局的传统押运生意也渐渐受到影响。",
            interact: "escort", cover: "/assets/tasks/task3.jpg",
            photo: { title: "镖师打卡照", hint: "摆个仗剑姿势，或和兵器、镖车合影！" },
            quizzes: [
              { q: "镖局的工作，最像今天的哪一种？", options: ["武装押运 / 安保物流", "开饭店", "教书法"], a: 0, tip: "又运货，又保护安全。" },
              { q: "镖师走镖时，最常护送的是什么？", options: ["玩具和糖", "银两和贵重货物", "只护送信件"], a: 1, tip: "晋商生意大，路上需要保镖。" },
              { q: "票号用汇票之后，为什么镖局会受影响？", options: ["大家不喜欢镖师了", "少运现银，押运需求变少", "城墙太高过不去"], a: 1, tip: "金融方式一变，运输方式也会变。" },
            ],
          },
          {
            id: 4, icon: "⚖️", title: "任务四：县衙断案",
            short: "化身小捕快，搜集证据，公正断案，伸张正义！",
            place: "平遥县衙",
            content: "走进平遥县衙，了解古代县太爷是如何审理案件、管理百姓的。参观大堂、二堂、监狱等区域，感受古代衙门的庄严。如果能赶上「升堂表演」，更可以亲身体验古代审案的场景。",
            challenge: "找到「明镜高悬」牌匾，拍一张大堂或匾额打卡照。",
            knowledge: "平遥县衙是中国现存规模较大、保存较完整的古代县级衙署之一。大堂是公开审案、办理公务的核心场所；「明镜高悬」提醒官吏断案要公正清明。",
            interact: "yamen", cover: "/assets/tasks/task4.jpg",
            photo: { title: "县衙打卡照", hint: "拍「明镜高悬」、大堂公案，或升堂场景！" },
            quizzes: [
              { q: "「明镜高悬」最接近哪一种意思？", options: ["镜子挂很高，用来照头发", "断案要像明镜一样公正清明", "衙门里禁止使用镜子"], a: 1, tip: "明镜 = 清楚、公正。" },
              { q: "县衙大堂主要用来做什么？", options: ["开演唱会", "审理案件、办理公务", "卖平遥牛肉"], a: 1, tip: "大堂是县太爷办公审案的地方。" },
              { q: "平遥县衙在全国古衙中有什么特别之处？", options: ["它是保存较完整、规模很大的县级衙署之一", "它是中国唯一的皇宫", "它没有大堂"], a: 0, tip: "常被称作「中国古衙之最」一类代表。" },
            ],
          },
          {
            id: 5, icon: "🎁", title: "任务五：非遗寻宝",
            short: "寻找非遗宝藏，体验传统技艺，解开谜题，传承文化之美！",
            place: "古城内非遗体验店（推光漆器、剪纸等）",
            content: "在古城中寻找平遥的非物质文化遗产，例如精美的推光漆器、栩栩如生的剪纸艺术。了解这些传统手工艺品的制作过程，感受匠人的智慧和耐心。如果时间允许，可以尝试亲手制作一件小小的非遗作品。",
            challenge: "挑选一件最喜欢的非遗作品，拍一张特写打卡照，并说说吸引你的地方。",
            knowledge: "平遥推光漆器是中国四大名漆器之一，要用手掌反复推光，直到漆面像镜子一样亮；剪纸则以精巧构思展现民间艺术魅力。",
            interact: "heritage", cover: "/assets/tasks/task5.jpg",
            photo: { title: "非遗打卡照", hint: "拍推光漆器、剪纸，或你亲手做的小作品！" },
            quizzes: [
              { q: "推光漆器为什么叫「推光」？", options: ["用推土机推亮", "用手掌反复推磨，让漆面发亮", "放到太阳下晒亮"], a: 1, tip: "匠人的掌心就是「抛光工具」。" },
              { q: "平遥推光漆器属于什么？", options: ["电子游戏", "非物质文化遗产 / 传统名漆器", "现代塑料玩具"], a: 1, tip: "它是中国四大名漆器之一。" },
              { q: "平遥常见的剪纸作品，经常用什么颜色？", options: ["荧光绿", "红色", "透明无色"], a: 1, tip: "红色喜庆，最常见。" },
            ],
          },
          {
            id: 6, icon: "🍜", title: "任务六：舌尖任务",
            short: "品尝平遥特色美食，完成美食任务，成为美食小达人！",
            place: "古城内特色小吃店",
            content: "寻找并品尝平遥的特色美食，如平遥牛肉、碗托、栲栳栳等。感受这些传统小吃背后的历史和文化。",
            challenge: "选出最喜欢的平遥小吃，拍一张美食打卡照，再告诉爸爸妈妈味道如何。",
            knowledge: "平遥牛肉是当地招牌特产；碗托多用荞麦面制成，口感爽滑；栲栳栳是山西特色莜面卷成小筒的面食，在平遥也能吃到，常蘸臊子食用。",
            interact: "food", cover: "/assets/tasks/task6.jpg",
            photo: { title: "美食打卡照", hint: "拍平遥牛肉、碗托或栲栳栳，吃之前先打卡！" },
            quizzes: [
              { q: "平遥最有名的招牌特产之一是？", options: ["平遥牛肉", "椰子鸡", "小笼包"], a: 0, tip: "咸香紧实，切片不散。" },
              { q: "碗托主要用什么做成？", options: ["西瓜皮", "荞麦面", "棉花糖"], a: 1, tip: "拌上醋蒜辣椒油更开胃。" },
              { q: "栲栳栳的外形最像什么？", options: ["小筒 / 窝窝", "大饼", "冰淇淋球"], a: 0, tip: "莜面卷成筒，蘸臊子吃。" },
            ],
          },
          {
            id: 7, icon: "🌙", title: "任务七：夜间行动",
            short: "夜游古城或观看《又见平遥》，穿越百年光影！",
            place: "《又见平遥》剧场 或 古城夜景",
            content: "观看大型情境体验剧《又见平遥》，通过「行走式」观演，沉浸式感受晋商「走西口」的悲壮与坚韧；或者在夜晚漫步古城，感受华灯初上、古朴宁静的夜景。",
            challenge: "夜游古城或观演后，拍一张夜景／剧场打卡照，并分享最深印象。",
            knowledge: "《又见平遥》是沉浸式情境剧，观众边走边看，感受晋商信义与「走西口」故事；夜游古城也能看见华灯映照下的明清街巷。",
            interact: "night", cover: "/assets/tasks/task7.jpg",
            photo: { title: "夜景打卡照", hint: "拍华灯下的街巷、市楼，或剧场外景（请遵守场馆规定）！" },
            quizzes: [
              { q: "《又见平遥》观演方式特别在哪里？", options: ["只能在家里看电视", "观众边走边看，沉浸式体验", "必须闭着眼睛听"], a: 1, tip: "演员就在你身边演出。" },
              { q: "这部剧主要想让人感受什么？", options: ["晋商走西口的故事与信义精神", "怎么打游戏通关", "如何做数学题"], a: 0, tip: "血脉里的坚持与担当。" },
              { q: "夜晚漫步古城，最特别的感觉是？", options: ["和白天完全一样", "华灯初上，更有古韵与宁静", "所有店都关门，什么也看不见"], a: 1, tip: "灯火下的青砖灰瓦别有味道。" },
            ],
          },
        ],
      },
      {
        id: "wangjia",
        name: "王家大院",
        emoji: "🏛️",
        title: "王家大院：民居特工任务清单",
        desc: "走进「民间故宫」，探索晋商宅院的迷宫与三雕之美！完成任务、拍照打卡，解锁民居小特工称号。",
        role: "民居时空小特工",
        rewardTitle: "🏅 民居时空小特工",
        rewardText: "王家大院任务全部完成！你已读懂一座院子里的晋商密码。",
        reportLabel: "王家大院 · 时空特工任务报告",
        reportProve: "王家大院",
        welcomeArt: "🎉🏛️🪵🧱🎉",
        reportCopy: {
          1: "特工抵达高家崖／红门堡，仰望城堡式大院，拍下第一张民居入口照。",
          2: "穿梭于层层院落，体会「王」字布局与迷宫巷道，留下探秘打卡。",
          3: "寻访砖雕、木雕、石雕，把匠人手艺定格在镜头里。",
          4: "走进祠堂／家风展区，理解尊祖敬宗与治家之道。",
          5: "登高俯瞰屋脊如海，感受华夏民居第一宅的气势。",
          6: "挑选最喜欢的一处细节，写下特工手记，完成民居通关。",
        },
        tasks: [
          {
            id: 1, icon: "🚪", title: "任务一：堡门报到",
            short: "找到高家崖或红门堡大门，开启民居探险！",
            place: "高家崖 / 红门堡入口",
            content: "王家大院位于灵石县静升镇，是规模宏大的明清民居建筑群。先找到高家崖或红门堡的入口，观察门楼、抱鼓石和匾额，想象当年晋商家族进出的场景。",
            challenge: "在堡门或门楼前拍一张报到打卡照。",
            knowledge: "王家大院被誉为「华夏民居第一宅」「民间故宫」。静升王氏家族在明清两代陆续兴建，现主要开放高家崖、红门堡、崇宁堡等堡院，依山而建、层楼叠院。",
            interact: "choice", cover: "/assets/tasks/wangjia/task1.jpg",
            warmup: {
              title: "🔎 民间故宫在哪？",
              hint: "王家大院最常被称作什么？",
              note: "确认民间故宫身份",
              choices: [
                { label: "民间故宫 / 华夏民居第一宅", ok: true },
                { label: "中国唯一皇宫", ok: false },
                { label: "海底世界乐园", ok: false },
              ],
            },
            photo: { title: "堡门打卡照", hint: "拍大门、门楼或抱鼓石都可以！" },
            quizzes: [
              { q: "王家大院主要位于山西哪里？", options: ["灵石县静升镇", "海南三亚", "哈尔滨冰雪大世界"], a: 0, tip: "晋中灵石，静升古镇旁。" },
              { q: "人们常把王家大院比作什么？", options: ["民间故宫", "外星基地", "海上灯塔"], a: 0, tip: "民居里的「紫禁城」气势。" },
              { q: "王家大院主体常见的两大堡院是？", options: ["高家崖与红门堡", "东宫与西宫", "天坛与地坛"], a: 0, tip: "东边高家崖，西边红门堡。" },
            ],
          },
          {
            id: 2, icon: "🧭", title: "任务二：院落迷宫",
            short: "穿巷过院，感受城堡式院落的层叠之美！",
            place: "大院巷道与四合院",
            content: "沿着巷道走进一座座院落，注意「前低后高、层层递进」的布局。红门堡的巷道与院落组合，整体平面隐约像一个巨大的「王」字，彰显家族姓氏。数一数你经过了几进院子。",
            challenge: "在院落或巷道中拍一张「迷宫探险」打卡照。",
            knowledge: "王家大院开放参观的区域约有二百多座院落、两千余间房屋，堡墙环绕，既是家宅也带防御功能。红门堡布局常被说成隐有「王」字形；高家崖、红门堡、崇宁堡是目前主要开放的三大堡院。",
            interact: "choice", cover: "/assets/tasks/wangjia/task2.jpg",
            warmup: {
              title: "🧭 认路小测试",
              hint: "红门堡平面布局最常被说成像哪个字？",
              note: "认出「王」字布局",
              choices: [
                { label: "「王」字", ok: true },
                { label: "「水」字", ok: false },
                { label: "「电」字", ok: false },
              ],
            },
            photo: { title: "院落打卡照", hint: "拍巷道、院门或层层台阶！" },
            quizzes: [
              { q: "王家大院的院落规模给人什么感觉？", options: ["像一座小城 / 堡寨", "只有一间小屋", "完全没有院子"], a: 0, tip: "院落成群，像民居城堡。" },
              { q: "「依山而建、坐北朝南」说明什么？", options: ["讲究风水与居住舒适", "随便盖着玩", "只为了挡雨"], a: 0, tip: "传统民居很讲究朝向。" },
              { q: "走在巷道里，特工最该注意什么？", options: ["看路、看雕刻、别乱摸文物", "大声尖叫吵醒邻居", "到处涂鸦"], a: 0, tip: "文明参观，保护文物。" },
            ],
          },
          {
            id: 3, icon: "🪵", title: "任务三：三雕寻宝",
            short: "寻找砖雕、木雕、石雕，发现藏在细节里的故事！",
            place: "照壁、门楣、柱础、屋脊等",
            content: "王家大院以砖雕、木雕、石雕「三雕」闻名。仔细观察照壁、门窗、柱础和屋脊上的图案，看看有没有狮子、花卉、人物故事。选一块你最喜欢的雕刻，说说它像什么。",
            challenge: "拍一张最喜欢的三雕特写打卡照。",
            knowledge: "三雕装饰既好看又有寓意：砖雕常见于照壁、屋脊，木雕多在门窗梁枋，石雕常见于柱础、门枕石。狮子、花卉、人物故事等图案，往往寄托吉祥与教化。",
            interact: "choice", cover: "/assets/tasks/wangjia/task3.jpg",
            warmup: {
              title: "🎁 三雕是哪三雕？",
              hint: "选出正确的一组。",
              note: "记住砖木石三雕",
              choices: [
                { label: "砖雕、木雕、石雕", ok: true },
                { label: "冰雕、沙雕、奶油雕", ok: false },
                { label: "纸雕、糖雕、雪雕", ok: false },
              ],
            },
            photo: { title: "三雕打卡照", hint: "特写一块砖雕 / 木雕 / 石雕！" },
            quizzes: [
              { q: "「三雕」一般指？", options: ["砖雕、木雕、石雕", "刀削面、牛肉、陈醋", "索道、瀑布、城墙"], a: 0, tip: "建筑装饰三大绝活。" },
              { q: "雕刻出现在大院的什么地方最多？", options: ["门楣、照壁、屋脊、柱础等", "只有停车场", "只有餐厅菜单"], a: 0, tip: "抬头低头都有惊喜。" },
              { q: "看雕刻时正确做法是？", options: ["用眼睛欣赏，轻轻拍照", "用手抠花纹带回家", "用水彩笔添颜色"], a: 0, tip: "文物不能破坏。" },
            ],
          },
          {
            id: 4, icon: "📜", title: "任务四：家风寻踪",
            short: "走进祠堂或家风展区，了解晋商家族的规矩与故事！",
            place: "祠堂 / 家风展陈区域",
            content: "晋商家族重视读书、诚信与家规。参观祠堂或相关展陈，看看牌位、匾额和介绍文字，想想「家风」为什么对一个大家族很重要。",
            challenge: "在祠堂或家风相关展区拍一张打卡照（请保持安静礼貌）。",
            knowledge: "静升王家亦官亦商，大院营建历经清代康熙至嘉庆等朝、前后约三百年。家祠与匾额常提醒后人：做人做事要守规矩、重德行、讲诚信。",
            interact: "text", cover: "/assets/tasks/wangjia/task4.jpg",
            warmup: {
              title: "✍️ 家风一句话",
              hint: "用至少 6 个字，写下你理解的「好家风」。",
              min: 6,
              placeholder: "例如：做人要诚实守信……",
            },
            photo: { title: "家风打卡照", hint: "拍祠堂外观、匾额或展陈说明牌！" },
            quizzes: [
              { q: "祠堂在传统家族中主要用来做什么？", options: ["祭祖、传承家风", "开游乐场", "卖冰淇淋"], a: 0, tip: "敬祖与教化后代。" },
              { q: "晋商成功很重要的品质常被提到的是？", options: ["诚信与勤勉", "只会玩游戏", "从不读书"], a: 0, tip: "信誉是晋商的金字招牌。" },
              { q: "参观祠堂时应该怎样？", options: ["安静、礼貌、不打闹", "大声喧哗", "攀爬摆件"], a: 0, tip: "尊重文化空间。" },
            ],
          },
          {
            id: 5, icon: "🌄", title: "任务五：屋脊瞭望",
            short: "登高望远，俯瞰灰瓦连绵的民居海洋！",
            place: "堡墙或制高观景点",
            content: "寻找可以登高的位置（注意安全，听从景区指引），俯瞰大院屋脊连绵如海的景象。对比平地上的「迷宫感」和高处的「格局感」。",
            challenge: "拍一张俯瞰屋脊或远眺静升镇的打卡照。",
            knowledge: "从高处看，更能理解城堡式民居如何依山布局、巷堡相连。这也是「华夏民居第一宅」气势的来源。",
            interact: "choice", cover: "/assets/tasks/wangjia/task5.jpg",
            warmup: {
              title: "👀 高处看什么？",
              hint: "登高瞭望时，最壮观的画面通常是？",
              note: "俯瞰屋脊如海",
              choices: [
                { label: "灰瓦屋脊连成片，像民居海洋", ok: true },
                { label: "只有一棵塑料椰子树", ok: false },
                { label: "完全空无一物", ok: false },
              ],
            },
            photo: { title: "瞭望打卡照", hint: "拍屋脊连绵或远山古镇（注意扶稳）！" },
            quizzes: [
              { q: "登高看大院，能帮助我们理解什么？", options: ["整体布局与气势", "手机游戏通关秘籍", "明天中午吃什么"], a: 0, tip: "格局一眼看清。" },
              { q: "大院墙堡环绕，最接近哪种功能？", options: ["居住 + 一定防御", "只有游泳池", "只放风筝"], a: 0, tip: "家宅也像小城堡。" },
              { q: "在高处拍照要注意什么？", options: ["安全第一，不翻越护栏", "越危险越好玩", "闭着眼睛往前跑"], a: 0, tip: "特工也要遵守安全规则。" },
            ],
          },
          {
            id: 6, icon: "✨", title: "任务六：心头好收藏",
            short: "选出最打动你的一处细节，完成民居通关！",
            place: "大院任意最爱角落",
            content: "回顾今天走过的门楼、巷道、三雕与瞭望点，选出最打动你的一个角落：可能是一扇窗、一块照壁，或一进安静的小院。",
            challenge: "为「心头好」拍一张打卡照，并在热身里写下理由。",
            knowledge: "旅行不只是打卡数量，更是发现属于自己的美。王家大院的价值，在于把建筑、艺术与家风融为一体。",
            interact: "text", cover: "/assets/tasks/wangjia/task6.jpg",
            warmup: {
              title: "💖 我的心头好",
              hint: "写下最喜欢的角落 + 理由（至少 8 个字）。",
              min: 8,
              placeholder: "例如：最爱照壁上的狮子，很威风……",
            },
            photo: { title: "心头好打卡照", hint: "拍下你最想带回家（在心里）的那个画面！" },
            quizzes: [
              { q: "王家大院最核心的看点之一是？", options: ["民居建筑与三雕艺术", "过山车", "海底隧道"], a: 0, tip: "建筑本身就是博物馆。" },
              { q: "完成任务后，特工最该记住的是？", options: ["保护文物、文明参观", "把砖块抠回家", "到处乱写名字"], a: 0, tip: "小特工也是小守护者。" },
              { q: "「民间故宫」强调的是？", options: ["民居达到了很高的艺术与规模水准", "这里真的住着皇帝", "这里禁止参观"], a: 0, tip: "比喻它的珍贵与气派。" },
            ],
          },
        ],
      },
      {
        id: "mianshan",
        name: "绵山",
        emoji: "⛰️",
        title: "绵山：介公特工任务清单",
        desc: "攀岩寺、听寒食传说，探索介子推与云峰胜境！完成挑战，成为山林小特工。",
        role: "绵山时空小特工",
        rewardTitle: "🏅 绵山时空小特工",
        rewardText: "绵山任务全部完成！寒食故事与山水胜境，都记在你的特工档案里了。",
        reportLabel: "绵山 · 时空特工任务报告",
        reportProve: "绵山",
        welcomeArt: "🎉⛰️🛕💧🎉",
        reportCopy: {
          1: "特工听闻介子推与寒食传说，在山门开启山林任务。",
          2: "乘索道或登山步道，把云海与悬崖收入打卡照。",
          3: "探访云峰寺等古刹，感受悬壁上的香火与宁静。",
          4: "走近抱腹岩奇观，惊叹大自然的鬼斧神工。",
          5: "水涛沟或栈道听泉观瀑，留下清凉一帧。",
          6: "用一句话写下今日山中印象，通关介公之旅。",
        },
        tasks: [
          {
            id: 1, icon: "🔥", title: "任务一：寒食传说",
            short: "了解介子推与寒食节的故事，开启绵山之旅！",
            place: "绵山景区入口 / 介公相关展区",
            content: "绵山因介子推的故事而闻名。传说春秋时晋国贤人介子推忠于国君、隐居绵山；后人用寒食节「禁火冷食」等方式纪念他。先在入口或展区了解这个故事的大意。",
            challenge: "拍一张山门、介公主题雕塑或介绍牌的打卡照。",
            knowledge: "寒食节是中国传统节日，习俗是不生火、吃冷食，传说与纪念介子推有关；后来常与清明节相连。绵山因此成为重要的历史文化名山。",
            interact: "choice", cover: "/assets/tasks/mianshan/task1.jpg",
            warmup: {
              title: "🔥 寒食小问答",
              hint: "寒食节传统习俗更接近哪一种？",
              note: "了解寒食禁火",
              choices: [
                { label: "不生火，吃冷食", ok: true },
                { label: "必须天天放烟花", ok: false },
                { label: "只能吃冰淇淋", ok: false },
              ],
            },
            photo: { title: "山门打卡照", hint: "拍山门、雕塑或故事介绍牌！" },
            quizzes: [
              { q: "绵山的历史文化常与谁相关？", options: ["介子推", "孙悟空的师傅", "外星船长"], a: 0, tip: "忠义隐士的故事。" },
              { q: "寒食节和哪种习惯有关？", options: ["禁火冷食", "必须烤肉", "只能喝汽水"], a: 0, tip: "传说用来纪念介子推。" },
              { q: "听完故事，特工最该学到的品质是？", options: ["忠贞、气节与敬畏自然", "随便丢垃圾", "大声吵闹"], a: 0, tip: "传说里有精神，山水里有敬畏。" },
            ],
          },
          {
            id: 2, icon: "🚠", title: "任务二：登云而上",
            short: "乘坐索道或步行登山，感受「人在云中游」！",
            place: "索道站 / 登山步道",
            content: "绵山山势陡峭，许多寺庙建在悬崖之上。可以乘坐索道登高，或沿步道缓缓上行（量力而行）。一路观察山岩、松树与云雾的变化。",
            challenge: "拍一张索道、步道或云中山景打卡照。",
            knowledge: "索道能帮助游客更轻松到达高处景区。无论乘索道还是步行，都要注意安全，抓紧扶手，不拥挤推搡。",
            interact: "choice", cover: "/assets/tasks/mianshan/task2.jpg",
            warmup: {
              title: "🚠 安全特工守则",
              hint: "乘索道或登山时，正确做法是？",
              note: "牢记登山安全",
              choices: [
                { label: "听从指引，注意安全", ok: true },
                { label: "站在护栏外摇摆", ok: false },
                { label: "闭眼狂奔冲刺", ok: false },
              ],
            },
            photo: { title: "登云打卡照", hint: "拍索道车厢、步道或云雾山景！" },
            quizzes: [
              { q: "绵山寺庙为什么常显得很「险」？", options: ["多建在悬崖峭壁上", "建在海底", "建在沙漠正中央"], a: 0, tip: "悬空古建很震撼。" },
              { q: "登山时感到累了应该？", options: ["休息、喝水、量力而行", "硬撑跑到晕倒", "把水瓶扔掉"], a: 0, tip: "小特工也要照顾自己。" },
              { q: "在索道上拍照要注意？", options: ["坐好扶稳，不探出护栏", "打开舱门站外面", "乱摇车厢"], a: 0, tip: "安全第一。" },
            ],
          },
          {
            id: 3, icon: "🛕", title: "任务三：云峰探寺",
            short: "走进云峰寺等古刹，感受悬崖上的宁静！",
            place: "云峰寺或景区主要寺庙",
            content: "参观云峰寺或其他主要寺庙建筑，观察它们如何贴着山势建造。保持安静，感受山林与香火交织的氛围（请尊重宗教场所礼仪）。",
            challenge: "拍一张寺庙外观或山寺同框的打卡照（勿扰他人礼佛）。",
            knowledge: "绵山佛道文化深厚，古建与自然融为一体。参观寺庙时应衣着得体、不大声喧哗、不乱摸佛像。",
            interact: "choice", cover: "/assets/tasks/mianshan/task3.jpg",
            warmup: {
              title: "🛕 礼寺小提示",
              hint: "进入寺庙最合适的行为是？",
              note: "文明礼寺",
              choices: [
                { label: "安静参观，尊重礼仪", ok: true },
                { label: "追逐打闹", ok: false },
                { label: "随便攀爬雕塑", ok: false },
              ],
            },
            photo: { title: "山寺打卡照", hint: "拍飞檐、山门或寺景与山岩同框！" },
            quizzes: [
              { q: "绵山的特色之一是？", options: ["悬崖古建与山水结合", "只有购物商场", "没有山只有平原"], a: 0, tip: "寺在云中。" },
              { q: "参观宗教场所时不应该？", options: ["大声喧哗、不礼貌拍摄", "安静行走", "听从工作人员提示"], a: 0, tip: "尊重是基本礼。" },
              { q: "云峰寺名字里的「云峰」让人想到？", options: ["高处云雾中的山峰", "海底火山", "沙漠绿洲超市"], a: 0, tip: "望文生义也对。" },
            ],
          },
          {
            id: 4, icon: "🪨", title: "任务四：抱腹奇岩",
            short: "寻找抱腹岩，见识「腹中能容」的天然奇观！",
            place: "抱腹岩一带",
            content: "抱腹岩是绵山著名奇观：巨大岩腔仿佛张开双臂，把古刹等建筑「抱」在怀中。站在观景点，感受大自然的力量，也可留意岩腹中的寺庙建筑。",
            challenge: "拍一张能看出「岩腹」气势的打卡照。",
            knowledge: "漫长的地质作用塑造了绵山陡峭岩壁与天然岩洞。抱腹岩因形似「怀抱」得名，岩腹中建有寺庙，是孩子们最容易记住的绵山标志景观。",
            interact: "choice", cover: "/assets/tasks/mianshan/task4.jpg",
            warmup: {
              title: "🪨 奇岩认名",
              hint: "「抱腹岩」名字最可能来自？",
              note: "认出抱腹形态",
              choices: [
                { label: "岩石形状像张开的腹部/怀抱", ok: true },
                { label: "因为里面卖抱枕", ok: false },
                { label: "因为禁止拥抱", ok: false },
              ],
            },
            photo: { title: "抱腹岩打卡照", hint: "尽量拍出岩石「怀抱」的空间感！" },
            quizzes: [
              { q: "抱腹岩属于？", options: ["自然奇观 / 地质地貌", "人造过山车", "超市货架"], a: 0, tip: "大自然的杰作。" },
              { q: "观看大型岩体时要注意？", options: ["站在安全区域，不翻越护栏", "往裂缝里钻", "敲石头带回家"], a: 0, tip: "保护自己也保护山。" },
              { q: "为什么说绵山「寺险岩奇」？", options: ["古建险峻 + 岩石奇特", "只有停车场很奇", "因为路特别平"], a: 0, tip: "人文与自然双绝。" },
            ],
          },
          {
            id: 5, icon: "💧", title: "任务五：水涛听泉",
            short: "走近水涛沟或山泉瀑布，用耳朵完成打卡！",
            place: "水涛沟 / 瀑布栈道",
            content: "如果行程包含水涛沟或山间瀑布栈道，停下脚步仔细听水声，看看水流如何从岩壁间跌落。夏天尤其清凉。",
            challenge: "拍一张溪瀑、栈道或水花的打卡照（地面湿滑，慢行）。",
            knowledge: "水塑造山谷，也滋养植被。听泉观瀑是认识水文与山地生态的好机会。湿滑路段请防滑慢行。",
            interact: "choice", cover: "/assets/tasks/mianshan/task5.jpg",
            warmup: {
              title: "👂 听泉辨声",
              hint: "靠近瀑布时，正确且安全的做法是？",
              note: "听泉也要注意安全",
              choices: [
                { label: "在栈道安全处听水声、慢慢走", ok: true },
                { label: "跳进急流里游泳", ok: false },
                { label: "把护栏拆掉方便拍照", ok: false },
              ],
            },
            photo: { title: "水涛打卡照", hint: "拍瀑布、溪流或湿润的岩壁！" },
            quizzes: [
              { q: "山中水声主要来自？", options: ["溪流瀑布冲击岩石", "空调外机", "校车喇叭"], a: 0, tip: "水流能量很大。" },
              { q: "潮湿栈道最重要的是？", options: ["防滑慢行", "冲刺跑步", "倒着走比赛"], a: 0, tip: "特工不莽撞。" },
              { q: "欣赏完水景后应该？", options: ["带走垃圾，留下美丽", "把包装袋扔进水里", "折断树枝玩"], a: 0, tip: "青山常在。" },
            ],
          },
          {
            id: 6, icon: "📝", title: "任务六：山中手记",
            short: "写下今日最深印象，完成绵山通关！",
            place: "任意观景平台或休息处",
            content: "回顾寒食故事、登云之路、古寺与奇岩水声，选出今天最难忘的一个瞬间，写成特工手记。",
            challenge: "拍一张你最满意的山景收官照，并完成手记热身。",
            knowledge: "旅行手记能帮你把风景变成记忆。绵山把忠义传说、宗教古建与自然奇观编织在一起，值得慢慢回味。",
            interact: "text", cover: "/assets/tasks/mianshan/task6.jpg",
            warmup: {
              title: "📝 今日山中印象",
              hint: "至少写 8 个字，记录最难忘的瞬间。",
              min: 8,
              placeholder: "例如：抱腹岩好大，像大山在拥抱我们……",
            },
            photo: { title: "收官山景照", hint: "选一张最想给家人看的山景！" },
            quizzes: [
              { q: "绵山吸引游客的重要原因是？", options: ["历史文化 + 山水古建", "只有停车场", "没有风景"], a: 0, tip: "故事与风景并存。" },
              { q: "完成绵山任务后，特工成为了？", options: ["更懂山西山水与传说的小使者", "职业拆护栏员", "专职乱丢垃圾"], a: 0, tip: "知识升级！" },
              { q: "离开景区前记得？", options: ["检查随身物品、文明离园", "把石头装进口袋全带走", "涂鸦留名"], a: 0, tip: "好特工有好习惯。" },
            ],
          },
        ],
      },
      {
        id: "hukou",
        name: "壶口瀑布",
        emoji: "🌊",
        title: "壶口瀑布：黄河特工任务清单",
        desc: "直面黄河怒涛，聆听「壶口」轰鸣！完成任务，成为母亲河小特工。",
        role: "黄河时空小特工",
        rewardTitle: "🏅 黄河时空小特工",
        rewardText: "壶口任务全部完成！你已亲身感受黄河的力量与美丽。",
        reportLabel: "壶口瀑布 · 时空特工任务报告",
        reportProve: "壶口瀑布",
        welcomeArt: "🎉🌊🐉🟨🎉",
        reportCopy: {
          1: "特工抵达黄河壶口，第一眼便被巨壶沸腾的气势震住。",
          2: "在观景台听涛，分辨河水的低鸣与轰鸣。",
          3: "了解「十里龙槽」，明白河水为何被挤成一束。",
          4: "远眺孟门山或河心奇观，感受河床变迁的力量。",
          5: "晴日寻彩虹，把水雾与阳光的魔术收进相机。",
          6: "写下对母亲河的祝福，完成黄河通关。",
        },
        tasks: [
          {
            id: 1, icon: "🟨", title: "任务一：黄河第一观",
            short: "站上观景台，亲眼看见「巨壶沸腾」！",
            place: "壶口主瀑观景台",
            content: "黄河流到晋陕峡谷的壶口一带，宽阔河面骤然收窄，浊浪从高处跌落，形如巨壶倾水、壶口沸腾，因此叫「壶口瀑布」。先安全地站在观景区域，整体感受它的气势。",
            challenge: "拍一张能看见主瀑水花与气势的打卡照。",
            knowledge: "壶口瀑布是黄河上著名的大瀑布，也是世上少见的大型黄色瀑布：黄河流经黄土高原后含沙量大，水色呈金黄。瀑布位于山西吉县与陕西宜川交界的峡谷中。",
            interact: "choice", cover: "/assets/tasks/hukou/task1.jpg",
            warmup: {
              title: "🌊 名字从哪来？",
              hint: "「壶口」这个名字最形象的解释是？",
              note: "理解壶口之名",
              choices: [
                { label: "河水收窄跌落，像从壶口倒出/巨壶沸腾", ok: true },
                { label: "这里专门卖茶壶", ok: false },
                { label: "因为禁止带水壶", ok: false },
              ],
            },
            photo: { title: "主瀑打卡照", hint: "拍下瀑布主体与水雾（注意防滑防溅）！" },
            quizzes: [
              { q: "壶口瀑布位于哪条大河？", options: ["黄河", "长江", "珠江"], a: 0, tip: "中华母亲河。" },
              { q: "瀑布看起来发黄，主要因为？", options: ["河水含沙量高", "有人倒了颜料", "太阳镜颜色不对"], a: 0, tip: "泥沙把水染成金黄。" },
              { q: "在观景台正确做法是？", options: ["在安全区域观看，听指挥", "翻越护栏靠近边缘", "向瀑布扔石头"], a: 0, tip: "激流危险。" },
            ],
          },
          {
            id: 2, icon: "👂", title: "任务二：听涛辨声",
            short: "闭上眼睛几秒，用耳朵感受黄河的力量！",
            place: "观景台安全区域",
            content: "壶口瀑布声如雷鸣，数里可闻。找一个相对安全、不太拥挤的位置，安静听 10 秒：是低沉的轰鸣，还是碎裂的水声？和爸爸妈妈说说你的感觉。",
            challenge: "拍一张「听涛」姿势合影或水雾弥漫的场景照。",
            knowledge: "巨大落差与狭窄河道让水流能量集中，冲击岩石产生强声与水雾。这也是认识「势能→动能」的生动课堂。",
            interact: "choice", cover: "/assets/tasks/hukou/task2.jpg",
            warmup: {
              title: "👂 声音从哪来？",
              hint: "瀑布轰鸣的主要原因是？",
              note: "听懂黄河之力",
              choices: [
                { label: "大量河水高速冲击河床与岩石", ok: true },
                { label: "有人在播音响", ok: false },
                { label: "风只吹树叶那么小声", ok: false },
              ],
            },
            photo: { title: "听涛打卡照", hint: "拍水雾、观景人或「倾听」的瞬间！" },
            quizzes: [
              { q: "瀑布声音大，说明什么？", options: ["水流能量很强", "河水在睡觉", "完全没有水"], a: 0, tip: "能量可被听见。" },
              { q: "听涛时更推荐？", options: ["站稳、短暂闭眼感受", "爬到最边缘", "把耳朵伸进水里"], a: 0, tip: "感受也要安全。" },
              { q: "水雾打湿衣服时应该？", options: ["提前穿好外套，小心脚下", "抱怨黄河并乱扔垃圾", "推别人一把"], a: 0, tip: "有备无患。" },
            ],
          },
          {
            id: 3, icon: "🐉", title: "任务三：十里龙槽",
            short: "弄清黄河为何在这里被「挤」成一束！",
            place: "龙槽观景 / 解说牌附近",
            content: "壶口瀑布之下，黄河在坚硬的石质河床中冲出一条又窄又深的槽，人们俗称「十里龙槽」（实际长度约数公里）。观察河道由瀑下归入深槽的样子，想象巨龙在槽中翻滚。",
            challenge: "拍一张能看出河道狭窄/石槽走向的打卡照。",
            knowledge: "「十里龙槽」是瀑布长期溯源侵蚀、河床不断下切后留下的深槽。黄河在壶口先收窄跌落，再顺槽奔腾而去，所以落差大、流速急、声势震耳。",
            interact: "choice", cover: "/assets/tasks/hukou/task3.jpg",
            warmup: {
              title: "🐉 龙槽是什么？",
              hint: "「十里龙槽」更接近哪一种描述？",
              note: "认识狭窄河槽",
              choices: [
                { label: "瀑布下游被冲刷出的狭窄石质深槽", ok: true },
                { label: "一条真正的龙睡觉的床", ok: false },
                { label: "游乐园的滑梯名字而已，与河无关", ok: false },
              ],
            },
            photo: { title: "龙槽打卡照", hint: "拍出河道收窄或石槽线条感！" },
            quizzes: [
              { q: "河水进入狭窄龙槽后，通常会？", options: ["更急、更有力", "立刻消失", "变成固体水泥"], a: 0, tip: "同水量过窄口，速度加快。" },
              { q: "十里龙槽主要由什么力量塑造？", options: ["长期水流冲刷与下切", "一夜之间用铲子挖成", "用积木搭的"], a: 0, tip: "地质时间很长。" },
              { q: "观察龙槽时不要？", options: ["靠近危险边缘", "看解说牌", "在安全区拍照"], a: 0, tip: "好奇不等于冒险。" },
            ],
          },
          {
            id: 4, icon: "🏝️", title: "任务四：孟门远望",
            short: "远眺孟门山等河心奇观，感受黄河改道的故事！",
            place: "孟门山观景点（以景区实际开放为准）",
            content: "在条件允许时远眺孟门山——它矗立于壶口下游的黄河之中，古有「九河之蹬」等说法，也常被称作黄河上的「门」。想想为什么坚硬的岩石能在急流中屹立；不同水位时，景象也会不同。",
            challenge: "拍一张孟门山或河心岩石的远眺打卡照。",
            knowledge: "孟门山是壶口下游河床中的著名奇观，与壶口、龙门并称黄河胜景。它是河流下切、瀑布位置上移过程中留在河心的岩石，水位高低会改变可见面貌。",
            interact: "choice", cover: "/assets/tasks/hukou/task4.jpg",
            warmup: {
              title: "🏝️ 河心石头",
              hint: "孟门山最特别的地方是？",
              note: "认识孟门奇观",
              choices: [
                { label: "矗立在黄河之中的山石奇观", ok: true },
                { label: "一座室内商场", ok: false },
                { label: "月球上的环形山", ok: false },
              ],
            },
            photo: { title: "孟门打卡照", hint: "远眺河心山石，可含黄河水面！" },
            quizzes: [
              { q: "孟门山常被称作与黄河相关的？", options: ["河心奇观 /「黄河之门」一类胜景", "黄河游乐场售票处", "黄河地铁站"], a: 0, tip: "壶口下游的河心山石。" },
              { q: "水位变化时，景色会？", options: ["有所不同", "永远一成不变", "变成沙漠"], a: 0, tip: "四季与水量影响景观。" },
              { q: "远眺景点时应该用？", options: ["眼睛和相机，不翻越护栏", "游泳游过去摸一摸", "开船冲撞岩石"], a: 0, tip: "远观亦有收获。" },
            ],
          },
          {
            id: 5, icon: "🌈", title: "任务五：彩虹猎手",
            short: "阳光 + 水雾 = 彩虹！试试能不能找到它！",
            place: "主瀑附近水雾区（安全范围内）",
            content: "晴天时，瀑布水雾在阳光照射下可能出现彩虹。变换站位与角度，耐心寻找。即使没有彩虹，水雾折射的光晕也值得记录。",
            challenge: "拍一张彩虹、水雾光晕，或阳光穿透水雾的照片。",
            knowledge: "彩虹是阳光在水滴中折射、反射形成的光学现象。壶口的水雾为观察彩虹提供了天然实验室。",
            interact: "choice", cover: "/assets/tasks/hukou/task5.jpg",
            warmup: {
              title: "🌈 彩虹怎么来？",
              hint: "瀑布边看见彩虹，主要需要？",
              note: "理解彩虹条件",
              choices: [
                { label: "阳光照射到水雾/水滴上", ok: true },
                { label: "必须先放烟花", ok: false },
                { label: "必须关掉太阳", ok: false },
              ],
            },
            photo: { title: "彩虹/水雾照", hint: "有彩虹拍彩虹；没有就拍金色水雾！" },
            quizzes: [
              { q: "彩虹属于？", options: ["光学现象", "可以装瓶带走的固体", "一种蔬菜"], a: 0, tip: "光与水的魔术。" },
              { q: "阴天不一定有彩虹，因为缺少？", options: ["合适的阳光条件", "黄河水", "观景台"], a: 0, tip: "光很重要。" },
              { q: "猎彩虹时仍要？", options: ["注意脚下湿滑与安全边界", "只顾拍照往前冲", "推开其他游客"], a: 0, tip: "美景让给文明。" },
            ],
          },
          {
            id: 6, icon: "💛", title: "任务六：母亲河手记",
            short: "写下对黄河的祝福，完成壶口通关！",
            place: "观景台休息处",
            content: "黄河是中华民族的母亲河。回顾今天的怒涛、龙槽、孟门与彩虹，用一句真诚的话，写下你对黄河的祝福或感受。",
            challenge: "拍一张收官合影或最震撼的黄河照，并完成手记。",
            knowledge: "认识黄河，既要感受它的壮美，也要理解保护母亲河、珍惜水资源的责任。小特工也可以做环保宣传员。",
            interact: "text", cover: "/assets/tasks/hukou/task6.jpg",
            warmup: {
              title: "💛 给黄河的话",
              hint: "至少写 8 个字的祝福或感受。",
              min: 8,
              placeholder: "例如：黄河你好厉害，我们会保护你……",
            },
            photo: { title: "黄河收官照", hint: "选今天最震撼的一帧留给报告！" },
            quizzes: [
              { q: "黄河常被称为？", options: ["中华民族的母亲河", "世界上最小的溪流", "人工喷泉"], a: 0, tip: "文明的摇篮之一。" },
              { q: "参观后我们能做的环保行动是？", options: ["不乱扔垃圾，宣传保护河流", "向河里倒油漆", "捕捉所有鱼带走"], a: 0, tip: "保护从身边开始。" },
              { q: "壶口之行最想让特工记住的是？", options: ["黄河的力量、美丽与需要被保护", "护栏很好吃", "瀑布是假的"], a: 0, tip: "壮美与责任同行。" },
            ],
          },
        ],
      },
    ];


var STORAGE_KEY = "shanxi-agent-mp-v1";
function emptyProgress() {
  return { done: {}, notes: {}, challengeOk: {}, photos: {}, photoTimes: {} };
}
function normalizeIdMap(obj) {
  var out = {};
  if (!obj || typeof obj !== "object") return out;
  Object.keys(obj).forEach(function (k) {
    var n = Number(k);
    out[isFinite(n) ? n : k] = obj[k];
  });
  return out;
}
function normalizeState(parsed) {
  var locationId = parsed.locationId || "pingyao";
  var spots = parsed.spots || {};
  var progress = spots[locationId] || {
    done: parsed.done,
    notes: parsed.notes,
    challengeOk: parsed.challengeOk,
    photos: parsed.photos,
    photoTimes: parsed.photoTimes,
  };
  return {
    nickname: parsed.nickname || "",
    avatar: parsed.avatar || "",
    welcomed: !!parsed.welcomed,
    locationId: locationId,
    spots: spots,
    savedAt: parsed.savedAt || null,
    done: normalizeIdMap(progress.done),
    notes: normalizeIdMap(progress.notes),
    challengeOk: normalizeIdMap(progress.challengeOk),
    photos: normalizeIdMap(progress.photos),
    photoTimes: normalizeIdMap(progress.photoTimes),
  };
}
function loadState() {
  try {
    var raw = wx.getStorageSync(STORAGE_KEY);
    if (raw && typeof raw === "object") return normalizeState(raw);
  } catch (e) {}
  return {
    nickname: "",
    avatar: "",
    welcomed: false,
    locationId: "pingyao",
    spots: {},
    savedAt: null,
    done: {},
    notes: {},
    challengeOk: {},
    photos: {},
    photoTimes: {},
  };
}
function snapshotProgress(state) {
  return {
    done: Object.assign({}, state.done || {}),
    notes: Object.assign({}, state.notes || {}),
    challengeOk: Object.assign({}, state.challengeOk || {}),
    photos: Object.assign({}, state.photos || {}),
    photoTimes: Object.assign({}, state.photoTimes || {}),
  };
}
function saveState(state, opts) {
  opts = opts || {};
  state.spots = state.spots || {};
  state.spots[state.locationId] = snapshotProgress(state);
  state.savedAt = Date.now();
  var payload = {
    nickname: state.nickname || "",
    avatar: state.avatar || "",
    welcomed: !!state.welcomed,
    locationId: state.locationId || "pingyao",
    spots: state.spots,
    savedAt: state.savedAt,
    version: 1,
  };
  try {
    wx.setStorageSync(STORAGE_KEY, payload);
    if (opts.toast) {
      wx.showToast({ title: opts.message || "已保存", icon: "success", duration: 1500 });
    }
    return true;
  } catch (err) {
    try {
      var slim = JSON.parse(JSON.stringify(payload));
      Object.keys(slim.spots || {}).forEach(function (id) {
        if (id !== slim.locationId) {
          slim.spots[id].photos = {};
          slim.spots[id].photoTimes = {};
        }
      });
      wx.setStorageSync(STORAGE_KEY, slim);
      wx.showToast({ title: "空间紧张，已精简旧景点照片", icon: "none" });
      return true;
    } catch (e2) {
      wx.showModal({
        title: "保存失败",
        content: "本地存储已满，请删除部分打卡照后重试。",
        showCancel: false,
      });
      return false;
    }
  }
}
function switchLocation(state, locationId, locations) {
  state.spots = state.spots || {};
  state.spots[state.locationId] = snapshotProgress(state);
  state.locationId = locationId;
  var p = state.spots[locationId] || emptyProgress();
  state.done = normalizeIdMap(p.done);
  state.notes = normalizeIdMap(p.notes);
  state.challengeOk = normalizeIdMap(p.challengeOk);
  state.photos = normalizeIdMap(p.photos);
  state.photoTimes = normalizeIdMap(p.photoTimes);
  saveState(state);
  return state;
}
function shortTitle(title) {
  return String(title || "").replace(/^任务[一二三四五六七八]：/, "");
}
function formatPhotoTime(ts) {
  var n = Number(ts);
  if (!n || !isFinite(n)) return "";
  var d = new Date(n);
  if (isNaN(d.getTime())) return "";
  function pad(v) {
    var s = String(v);
    return s.length < 2 ? "0" + s : s;
  }
  return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日 " + pad(d.getHours()) + ":" + pad(d.getMinutes());
}
function doneCount(tasks, doneMap) {
  var n = 0;
  for (var i = 0; i < tasks.length; i++) if (doneMap[tasks[i].id]) n++;
  return n;
}
function photoCount(tasks, photos) {
  var n = 0;
  for (var i = 0; i < tasks.length; i++) if (photos[tasks[i].id]) n++;
  return n;
}
function canComplete(taskId, state) {
  return !!state.challengeOk[taskId] && !!state.photos[taskId] && !state.done[taskId];
}
function compressImageFile(filePath) {
  return new Promise(function (resolve) {
    if (!wx.compressImage) { resolve(filePath); return; }
    wx.compressImage({
      src: filePath,
      quality: 72,
      success: function (res) { resolve(res.tempFilePath || filePath); },
      fail: function () { resolve(filePath); },
    });
  });
}
function saveFilePersistent(tempPath) {
  return new Promise(function (resolve) {
    wx.saveFile({
      tempFilePath: tempPath,
      success: function (res) { resolve(res.savedFilePath); },
      fail: function () { resolve(tempPath); },
    });
  });
}
function ensureAlbumAuth() {
  return new Promise(function (resolve) {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting["scope.writePhotosAlbum"]) { resolve(true); return; }
        wx.authorize({
          scope: "scope.writePhotosAlbum",
          success: function () { resolve(true); },
          fail: function () {
            wx.showModal({
              title: "需要相册权限",
              content: "请允许保存图片到相册，用于下载打卡照。",
              confirmText: "去设置",
              success: function (r) {
                if (r.confirm) {
                  wx.openSetting({
                    success: function (s) { resolve(!!s.authSetting["scope.writePhotosAlbum"]); },
                    fail: function () { resolve(false); },
                  });
                } else resolve(false);
              },
            });
          },
        });
      },
      fail: function () { resolve(false); },
    });
  });
}

App({
  globalData: {
    state: null,
    locations: LOCATIONS,
    routing: false,
  },
  onLaunch: function () {
    this.globalData.state = loadState();
  },
  go: function (url, mode) {
    var that = this;
    if (this.globalData.routing) return;
    this.globalData.routing = true;
    var done = function () {
      setTimeout(function () { that.globalData.routing = false; }, 400);
    };
    var opts = { url: url, complete: done, fail: function () {
      if (mode !== "reLaunch") wx.reLaunch({ url: url, complete: done });
      else done();
    }};
    if (mode === "redirect") wx.redirectTo(opts);
    else wx.reLaunch(opts);
  },
  getState: function () {
    if (!this.globalData.state) this.globalData.state = loadState();
    return this.globalData.state;
  },
  setState: function (patch, opts) {
    var state = this.getState();
    patch = patch || {};
    Object.keys(patch).forEach(function (k) { state[k] = patch[k]; });
    this.globalData.state = state;
    saveState(state, opts);
    return state;
  },
  getLocation: function () {
    var state = this.getState();
    var list = this.globalData.locations || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === state.locationId) return list[i];
    return list[0] || { id: "pingyao", name: "平遥古城", tasks: [], title: "", desc: "", role: "" };
  },
  getTasks: function () {
    var loc = this.getLocation();
    return (loc && loc.tasks) || [];
  },
  switchSpot: function (locationId) {
    this.globalData.state = switchLocation(this.getState(), locationId, this.globalData.locations || []);
    return this.globalData.state;
  },
  // helpers for pages (no require)
  shortTitle: shortTitle,
  formatPhotoTime: formatPhotoTime,
  doneCount: doneCount,
  photoCount: photoCount,
  canComplete: canComplete,
  compressImageFile: compressImageFile,
  saveFilePersistent: saveFilePersistent,
  ensureAlbumAuth: ensureAlbumAuth,
});
