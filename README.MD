# MindMapGPT

generate mind maps from text using GPT-4o

## Installation

```bash
yarn add mindmap-gpt
```

## Usage

See `/test.ts` for usage examples.

```typescript
import { generateMindMap, makeContext } from './index.ts'
process.env.OPENAI_API_KEY = 'your-openai-api-key'

const steps = "### 东方永夜抄的玩法总结\n\n**概述**\n- 东方永夜抄是东方Project系列的第八作，是一款弹幕射击游戏。\n- 游戏设定主要基于日本民间传说《竹取物语》。\n\n**游戏系统**\n1. **游戏角色**\n   - 每组自机由一个人类（高速移动）和一个妖怪（低速移动）组成。全四组分别为：\n     - 博丽灵梦与八云紫\n     - 雾雨魔理沙与爱丽丝·玛格特洛依德\n     - 十六夜咲夜与蕾米莉亚·斯卡蕾特\n     - 魂魄妖梦与西行寺幽幽子\n   - 通关所有组合之后，可以使用单一角色进行游戏。\n\n2. **关卡与BOSS**\n   - 游戏共包含常规关卡和Extra关卡。\n   - 第四面BOSS会根据使用的自机组合有所不同。\n   - 第五面通关后，可以选择进入6A面或6B面，两者剧情不同（6A为normal ending，6B为good ending）。\n\n3. **玩法机制**\n   - 刻符系统：收集蓝点道具可以增加残机。\n   - 决死bomb：系统中有一定改动，且引入了符卡练习模式。\n\n**故事背景与剧情**\n- 故事发生在幻想乡的永夜之中，玩家需控制人类与妖怪组合来解决异变，寻找“崭新的存在价值”。\n\n**角色**\n- 自机角色：包含人类和妖怪的组合以及单人使用模式。\n- BOSS角色：如莉格露·奈特巴格、米斯蒂娅·萝蕾拉、八意永琳、蓬莱山辉夜、藤原妹红等。\n\n通过游戏中的高速（人类）与低速（妖怪）切换，玩家需要适应弹幕和使用不同的策略来通关并解决幻想乡的异变。"

const result = await generateMindMap(makeContext(steps))
console.log(result)
```

## Output

```plaintext
{
  svg: {
    data: '<svg aria....',
    time: 1965
  },
  tokensUsed: 18197,
  mindMap: 'flowchart TD\n' +
    '    A[概述] --> B[东方永夜抄是东方Project系列的第八作，是一款弹幕射击游戏]\n' +
    '    A --> C[游戏设定主要基于日本民间传说《竹取物语》]\n' +
    '\n' +
    '    B --> D[游戏系统]\n' +
    '    D --> E[游戏角色] \n' +
    '    D --> F[关卡与BOSS]\n' +
    '    D --> G[玩法机制]\n' +
    '    F --> H[游戏共包含常规关卡和Extra关卡]\n' +
    '    F --> I[第四面BOSS会根据使用的自机组合有所不同]\n' +
    '    F --> J[第五面通关后，可以选择进入6A面或6B面，两者剧情不同（6A为normal ending，6B为good ending）]\n' +
    '    G --> L[刻符系统：收集蓝点道具可以增加残机]\n' +
    '    G --> M[决死bomb：系统中有一定改动，且引入了符卡练习模式]\n' +
    '\n' +
    '    E --> N[博丽灵梦与八云紫]\n' +
    '    E --> O[雾雨魔理沙与爱丽丝·玛格特洛依德]\n' +
    '    E --> P[十六夜咲夜与蕾米莉亚·斯卡蕾特]\n' +
    '    E --> Q[魂魄妖梦与西行寺幽幽子]\n' +
    '    E --> R[通关所有组合之后，可以使用单一角色进行游戏]\n' +
    '\n' +
    '    C --> S[故事背景与剧情]\n' +
    '    S --> T[故事发生在幻想乡的永夜之中，玩家需控制人类与妖怪组合来解决异变，寻找“崭新的存在价值”]\n' +
    '\n' +
    '    S --> V[角色]\n' +
    '    V --> W[自机角色]\n' +
    '    V --> X[BOSS角色，如莉格露·奈特巴格、米斯蒂娅·萝蕾拉、八意永琳、蓬莱山辉夜、藤原妹红等]\n' +
    '    W --> Y[包含人类和妖怪的组合以及单人使用模式]\n' +
    '\n' +
    '    J --> Z[通过游戏中的高速（人类）与低速（妖怪）切换，玩家需要适应弹幕和使用不同的策略来通关并解决幻想乡的异变]'
}
```

## License

GPL-3.0
