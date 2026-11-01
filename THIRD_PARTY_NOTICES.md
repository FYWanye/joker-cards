# 第三方素材声明 / Third-Party Notices

本项目在开发过程中使用了以下网络收集的第三方素材，感谢原作者的开源贡献。

## 1. 扑克牌图片（Playing Card Images）

- **来源**：[hayeah/playing-cards-assets](https://github.com/hayeah/playing-cards-assets)
- **作者**：Howard Yeh ([@hayeah](https://github.com/hayeah))
- **许可**：MIT License（Copyright (c) 2018 Howard Yeh）
- **使用范围**：`src/common/images/cards/` 下全部 55 张 PNG（52 张标准牌 + 牌背 + 黑/红 Joker）
- **处理**：原始 222×323 PNG 已批量缩放至 112×163（保持宽高比），用于手表小屏渲染

```
MIT License

Copyright (c) 2018 Howard Yeh (https://github.com/hayeah)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 2. 音效（Sound Effects）

- **来源**：[Kenney.nl](https://kenney.nl) — *Casino Audio* 与 *Interface Sounds* 素材包（经 [ETdoFresh/kenney.nl](https://github.com/ETdoFresh/kenney.nl) 镜像获取）
- **作者**：Kenney ([kenney.nl](https://kenney.nl) · [Patreon](https://www.patreon.com/kenney))
- **许可**：CC0 1.0 Universal（公有领域，无需署名，但本项目仍自愿致谢）
- **使用范围**：`src/common/audio/` 下 9 个 MP3
- **处理**：原始 OGG 已转码为 MP3（22.05kHz / 64kbps / 单声道）

| 文件 | 原始素材 |
|------|----------|
| click.mp3 | Interface Sounds — click_001.ogg |
| win.mp3 | Interface Sounds — confirmation_001.ogg |
| lose.mp3 | Interface Sounds — error_001.ogg |
| select.mp3 | Casino Audio — cardSlide1.ogg |
| play.mp3 | Casino Audio — cardPlace1.ogg |
| discard.mp3 | Casino Audio — cardShove1.ogg |
| shuffle.mp3 | Casino Audio — cardShuffle.ogg |
| chips.mp3 | Casino Audio — chipsStack1.ogg |
| reward.mp3 | Casino Audio — chipsHandle1.ogg |

> CC0 1.0：https://creativecommons.org/publicdomain/zero/1.0/

## 3. 构建期工具（不随应用分发）

- 卡牌缩放：Windows PowerShell + System.Drawing
- 音频转码：[eugeneware/ffmpeg-static](https://github.com/eugeneware/ffmpeg-static)（FFmpeg，LGPL/GPL，仅本地转码使用，未包含在应用包中）
