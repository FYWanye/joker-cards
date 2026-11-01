# 小丑牌·腕上版（Joker Hand）

以《小丑牌 Balatro》玩法为原型的小米手表（VelaOS）扑克肉鸽小游戏：
选择手牌组成扑克牌型赚取「筹码 × 倍率」，突破逐轮递增的盲注目标；
过关三选一收集小丑牌强化流派，冲击最高分。

## 玩法速览

- 每轮 8 张手牌、4 次出牌、3 次弃牌，最多选 5 张出牌
- 10 种扑克牌型（高牌 → 皇家同花顺），得分 =（基础筹码 + 牌面筹码）× 倍率
- 过关后三选一小丑牌（8 种效果，可叠加持有，上限 5 张）
- 盲注目标逐轮递增（300 / 660 / 1450 / 3200 …），出牌耗尽未达标即结算
- 最高分本地持久化（system.storage）

## 项目结构

```
joker-cards/
├── package.json               # aiot-toolkit 构建配置
├── README.md
├── THIRD_PARTY_NOTICES.md     # 第三方素材署名（MIT / CC0）
├── docs/
│   ├── PRD.md                 # 产品需求文档
│   └── TECH.md                # 技术方案
├── scripts/                   # 开发期素材获取/处理脚本（不随应用打包）
│   ├── fetch-cards.js
│   └── fetch-audio.js
└── src/
    ├── manifest.json          # 应用清单（features/router）
    ├── app.ux                 # 应用入口
    ├── config-watch.json
    ├── pages/
    │   ├── index/index.ux     # 游戏主页面（menu/game/reward/over 状态机）
    │   └── detail/detail.ux   # 玩法规则页
    ├── i18n/                  # 国际化资源
    └── common/
        ├── logo.png           # 应用图标（Joker 主题）
        ├── images/cards/      # 55 张扑克牌 PNG（112×163）
        └── audio/             # 9 个音效 MP3（22kHz 单声道）
```

## 页面说明

| 页面 | 路径 | 说明 |
|------|------|------|
| 游戏主页 | `src/pages/index/index.ux` | 状态机单页：主菜单 / 对局 / 小丑三选一 / 结算 |
| 玩法规则 | `src/pages/detail/detail.ux` | 牌型表、小丑表、操作说明（scroll 长内容） |

## 使用的组件 / API

**组件**（全部来自 Vela 白名单）：`div` `text` `image` `input[type=button]` `scroll`

**系统 API**（均已在 `manifest.json` features 声明）：

| API | 用途 |
|-----|------|
| `@system.storage` | 最高分持久化 |
| `@system.audio` | 9 个音效播放（onerror 静默降级） |
| `@system.vibrator` | 出牌 / 奖励 / 失败振动反馈 |
| `@system.prompt` | 超限与异常 toast |
| `@system.router` | 菜单 → 规则页跳转（无需声明） |

## 开发调试

```bash
npm install        # 安装 aiot-toolkit
npm run start      # 启动 watch 模式（aiot start --watch）
```

- **aiot-ide**：打开项目根目录 → `npm install` → 点击调试启动模拟器
- 调试目标屏幕：466×466 圆屏（Xiaomi Watch S3/S4/H1），兼容 480×480 与 432×514

## 构建发布

```bash
npm run build      # 构建
npm run release    # 发布
```

## 素材致谢

- 扑克牌图片：[hayeah/playing-cards-assets](https://github.com/hayeah/playing-cards-assets)（MIT © Howard Yeh）
- 音效：[Kenney.nl](https://kenney.nl) *Casino Audio* / *Interface Sounds*（CC0）

详见 [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)。

## 了解更多

- [Xiaomi Vela JS 快应用官方文档](https://iot.mi.com/vela/quickapp)
