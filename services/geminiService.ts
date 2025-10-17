import { GuidanceReportData, AIDraft } from '../types';

// 預先生成的模擬報告數據，用於概念展示
const MOCK_REPORT_DATA: GuidanceReportData = {
  productSuggestions: [
    {
      name: "個人化電子書：Podcasting 快速入門",
      description: "一本深入淺出的電子書，指導初學者如何從零開始建立、錄製並推廣自己的 Podcast 節目。",
      rationale: "您的核心內容是科技 Podcast，這表示您的受眾對深入的技術指導有強烈興趣。電子書是一個完美的數位產品，可以一次性銷售，提供高價值內容。"
    },
    {
      name: "付費會員社群",
      description: "一個專屬的社群空間（例如 Discord 或 Circle），會員可以獲得獨家幕後內容、提前收聽節目，並與您和其他同好直接交流。",
      rationale: "這能為您的忠實聽眾提供額外價值，並建立一個穩定的訂閱收入來源，符合您增加副業收入的目標。"
    }
  ],
  pricingStrategies: [
    {
      name: "一次性購買 (電子書)",
      description: "為電子書設定一個固定的價格，顧客購買後即可永久擁有。可以考慮提供早鳥優惠來刺激初期銷售。",
      suitability: "簡單直接，易於管理。非常適合首次推出數位產品的創作者，能快速驗證市場反應。"
    },
    {
      name: "分級訂閱制 (會員社群)",
      description: "設定不同的會員等級（例如：每月 NT$150 的基礎級、每月 NT$450 的 VIP 級），提供不同層次的福利。",
      suitability: "能創造可預測的經常性收入，並根據粉絲的投入程度提供不同價值的回饋，深化粉絲關係。"
    }
  ],
  marketingCopyTemplates: [
    {
      platform: "Instagram",
      template: "想開啟你的 Podcast 旅程卻不知從何下手？我的全新電子書《[產品名稱]》現已推出！從設備選擇到內容策略，所有秘訣都在裡面。點擊主頁連結，立即解鎖你的聲音力量！#Podcast入門 #內容創作 #創作者"
    },
    {
      platform: "Twitter / X",
      template: "準備好更深入地參與我們的節目了嗎？加入我的獨家會員社群，你將獲得幕後花絮、AMA 問答，還能與同好交流！成為我們核心圈的一員吧！[社群連結] #Podcaster #會員專屬"
    }
  ],
  successStories: [
    {
      creatorType: "插畫家轉型線上課程教師",
      story: "一位名叫 'ArtbyVee' 的插畫家，最初只在社群分享作品。她注意到許多粉絲詢問她的繪畫技巧，於是她將自己的知識打包成一門線上課程。透過預售和社群推廣，她在第一個月就獲得了超過全職工作的收入。"
    }
  ]
};

const MOCK_DRAFT_DATA: AIDraft = {
  title: "如何開始您的第一個 Podcast",
  body: `
### 1. 找到你的獨特聲音 (Niche Down)
- **熱情與專業的交集：** 選擇一個你既熱愛又了解的主題。
- **目標聽眾是誰？** 想像你的理想聽眾，他們想聽什麼？
- **市場差異化：** 你的節目有什麼獨特之處？是獨特的觀點、風格還是形式？

### 2. 規劃你的內容策略
- **節目格式：** 訪談、單口、故事敘述，還是圓桌討論？
- **單集結構：** 開頭、中段、結尾，固定的環節能增加聽眾黏著度。
- **內容行事曆：** 預先規劃至少 4-6 集的內容，確保穩定更新。

### 3. 準備基礎設備
- **麥克風是關鍵：** 從高品質的 USB 麥克風開始 (例如 Blue Yeti, Rode NT-USB)。
- **錄音軟體：** 免費的 Audacity 或 GarageBand 已經非常強大。
- **安靜的空間：** 找一個充滿軟質物品（如衣物、地毯）的房間來減少回音。

### 4. 錄製與剪輯
- **放鬆，就像在對話：** 對著麥克風說話，而不是念稿。
- **剪輯的核心：** 去除贅詞、長停頓，加入簡單的片頭片尾音樂。
- **音質提升：** 學習基礎的音訊處理，如降噪和等化 (EQ)。

### 5. 發布與推廣
- **選擇託管平台 (Hosting)：** 如 SoundOn, Firstory, Anchor.fm。
- **提交到各大平台：** Apple Podcasts, Spotify, Google Podcasts。
- **初期推廣：** 在你的社群媒體上大力宣傳，並邀請朋友分享。
`
};


export const generateMonetizationGuide = async (): Promise<GuidanceReportData> => {
    console.log("正在生成模擬指南...");
    // 模擬 API 呼叫的延遲，讓載入畫面更真實
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("模擬指南生成完畢。");
            resolve(MOCK_REPORT_DATA);
        }, 2500); // 模擬 2.5 秒的載入時間
    });
};

export const generateDraft = async (topic: string): Promise<AIDraft> => {
    console.log(`正在為主題 "${topic}" 生成模擬草稿...`);
     // 模擬 API 呼叫的延遲
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("模擬草稿生成完畢。");
            // 實際應用中，這裡會根據 topic 動態生成內容
            // 但在模擬中，我們返回修改了標題的 MOCK_DRAFT_DATA
            resolve({
                ...MOCK_DRAFT_DATA,
                title: topic || MOCK_DRAFT_DATA.title // 如果使用者沒輸入主題，則使用預設標題
            });
        }, 2000); // 模擬 2 秒的載入時間
    });
};