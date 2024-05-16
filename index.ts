import { renderMindmap, defaultContexts } from "./mermaid.ts"
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
if (!OPENAI_API_KEY) {
  throw new Error("Environment variable OPENAI_API_KEY is not set")
}
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o"

export function makeContext(content: string) {
  return [...defaultContexts,
  {
    "role": "user",
    "content": content
  }]
}

export async function generateMindMap(contexts: any[], maxRetry = 5, errorCount = 0, tokensUsed = 0) {
  if (errorCount >= maxRetry) {
    throw new Error("Max retry reached")
  }
  const openaiHeaders = new Headers();
  openaiHeaders.append("Content-Type", "application/json");
  openaiHeaders.append("Accept", "application/json");
  openaiHeaders.append("Authorization", `Bearer ${OPENAI_API_KEY}`);

  const raw = JSON.stringify({
    "model": OPENAI_MODEL,
    "messages": contexts,
    "stream": false
  });

  const generateResult = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: openaiHeaders,
    body: raw,
  }).then((response) => response.json())

  const generateResultMindMapOrig = generateResult.choices[0].message.content
  //for some time, the GPT model will generate markdown code block, we need to filter it out
  const generateResultMindMap = generateResultMindMapOrig.replace(/^\n*`*(mermaid)?\n*(.*?)\n*`*\n*$/s, (match, p1, p2) => p2)

  const currentLoopTokensUsed = generateResult.usage.total_tokens
  console.log(`generateResultMindMap: ${generateResultMindMap}`)
  try {
    const res = await renderMindmap(generateResultMindMap, { outputFormat: "svg" })
    return {
      svg: res,
      tokensUsed: currentLoopTokensUsed + tokensUsed,
      mindMap: generateResultMindMap
    }
  } catch (e) {
    console.error(`An error occurred: ${e.toString()}, retrying[${errorCount}]`)
    return await generateMindMap(contexts, maxRetry, errorCount + 1, currentLoopTokensUsed + tokensUsed)
  }
}


// const graphDef = 'flowchart LR\n' +
// '    A[概述] --> B[游戏系统]\n' +
//   '    A --> C[故事背景与剧情]\n' +
//   '    B --> D[游戏角色]\n' +
//   '    B --> E[关卡与BOSS]\n' +
//   '    B --> F[玩法机制]\n' +
//   '    D --> G[自机角色]\n' +
//   '    G --> G1[博丽灵梦与八云紫]\n' +
//   '    G --> G2[雾雨魔理沙与爱丽丝·玛格特洛依德]\n' +
//   '    G --> G3[十六夜咲夜与蕾米莉亚·斯卡蕾特]\n' +
//   '    G --> G4[魂魄妖梦与西行寺幽幽子]\n' +
//   '    D --> H[BOSS角色]\n' +
//   '    H --> H1[莉格露·奈特巴格]\n' +
//   '    H --> H2[米斯蒂娅·萝蕾拉]\n' +
//   '    H --> H3[八意永琳]\n' +
//   '    H --> H4[蓬莱山辉夜]\n' +
//   '    H --> H5[藤原妹红]\n' +
//   '    E --> I[常规关卡与Extra关卡]\n' +
//   '    E --> J[第四面BOSS依据自机不同]\n' +
//   '    E --> K[第五面后的选择]\n' +
//   '    K --> K1[6A面 - normal ending]\n' +
//   '    K --> K2[6B面 - good ending]\n' +
//   '    F --> L[刻符系统]\n' +
//   '    F --> M[决死bomb与符卡练习模式]\n' +
//   '    C --> N[幻想乡永夜之中]\n' +
//   '    C --> O[寻找“崭新的存在价值”]\n' +
//   '    N --> P[高速与低速切换]\n' +
//   '    P --> Q[适应弹幕和不同策略]'
// try {
//   const res = await renderMindmap(graphDef, { outputFormat: "svg" })
//   console.log(res)
// } catch (e) {
//   console.error({ error: e.toString() })
// }
