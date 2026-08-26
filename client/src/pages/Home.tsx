/* Design philosophy: 寺院晨光紙本 — Neo-Mingei editorial layout, warm paper, ink navy, vermilion seal accents, and quiet utility-first motion. */
import { Fragment, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpenText,
  Check,
  Coffee,
  Compass,
  Gift,
  Handshake,
  ShieldCheck,
  Copy,
  Flower2,
  HeartHandshake,
  Leaf,
  Menu,
  Quote,
  RotateCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Wind,
  X,
} from "lucide-react";

const heroImage = "/manus-storage/little-monk-hero_8fe4e839.png";
const kindnessImage = "/manus-storage/little-monk-card-kindness_69724cd7.png";
const restImage = "/manus-storage/little-monk-card-rest_eb7b6de3.png";
const logoImage = "/manus-storage/little-monk-logo_0dbd06fa.png";

const categories = [
  { name: "全部語料", count: 144 },
  { name: "慈悲", count: 12 },
  { name: "感恩", count: 12 },
  { name: "包容", count: 12 },
  { name: "鼓勵", count: 12 },
  { name: "安定", count: 12 },
  { name: "自省", count: 12 },
  { name: "和善", count: 12 },
  { name: "善行", count: 12 },
  { name: "尊重", count: 12 },
  { name: "和解", count: 12 },
  { name: "分享", count: 12 },
  { name: "祝福", count: 12 },
];

type KindWord = {
  id: number;
  category: string;
  phrase: string;
  context: string;
  action: string;
  emotion: string;
  view: string;
  effect: string;
  tone: string;
  color: string;
};

const kindWords: KindWord[] = [
  { id: 1, category: "慈悲", phrase: "心存善念", context: "提醒自己在忙亂或分歧裡，保留一點善意。", action: "雙手合十，胸前護著一朵蓮花。", emotion: "溫柔安定", view: "正面半身", effect: "蓮花、柔和光線", tone: "溫柔提醒", color: "vermilion" },
  { id: 2, category: "慈悲", phrase: "溫柔一點", context: "對話變得尖銳時，邀請彼此放慢語氣。", action: "張開雙手，像替對話留出空間。", emotion: "柔和關心", view: "三分之二側面", effect: "圓形光暈、細小花瓣", tone: "輕聲勸和", color: "lavender" },
  { id: 3, category: "慈悲", phrase: "先聽聽看", context: "還不了解完整情況時，不急著下結論。", action: "側耳傾聽，手掌朝向對話的一方。", emotion: "專注耐心", view: "側面半身", effect: "音波線、小耳朵線稿", tone: "耐心陪伴", color: "gold" },
  { id: 4, category: "慈悲", phrase: "給彼此一點時間", context: "衝突後先冷靜，讓情緒有回到平衡的餘地。", action: "坐在蒲團上，安靜守著一只小沙漏。", emotion: "從容平靜", view: "微俯角全身", effect: "沙漏、慢慢飄動的雲", tone: "留白與等待", color: "sage" },
  { id: 5, category: "慈悲", phrase: "願你被理解", context: "對方感到孤單或不被看見時，送出陪伴。", action: "把手放在胸口，向前伸出另一隻手。", emotion: "真誠溫暖", view: "正面半身", effect: "兩顆靠近的心形線條", tone: "溫柔陪伴", color: "peach" },
  { id: 6, category: "慈悲", phrase: "我先聽你說", context: "朋友需要傾訴，不急著給建議時。", action: "坐好並把小木魚放在一旁，專心聆聽。", emotion: "安靜專注", view: "側面全身", effect: "對話泡泡、柔和音波", tone: "給予空間", color: "ink" },
  { id: 7, category: "慈悲", phrase: "不急，慢慢說", context: "對方緊張、卡住或找不到合適的詞時。", action: "一手合十、一手做出放慢的手勢。", emotion: "耐心安撫", view: "正面半身", effect: "慢速線、雲朵", tone: "安定邀請", color: "lavender" },
  { id: 8, category: "慈悲", phrase: "讓我陪你", context: "想表達願意陪著對方走一段路。", action: "背著小布袋站到對方身旁，並肩向前。", emotion: "可靠溫暖", view: "三分之二側面全身", effect: "並行腳步線、小蓮花", tone: "不獨留你", color: "vermilion" },
  { id: 9, category: "慈悲", phrase: "願你今天輕一點", context: "關心正在承受壓力或疲憊的人。", action: "雙手捧著一朵蓮花，輕輕向前送出。", emotion: "慈柔祝福", view: "微仰角半身", effect: "花瓣、柔和圓光", tone: "減輕重量", color: "peach" },
  { id: 10, category: "慈悲", phrase: "先照顧心情", context: "事情可以稍後處理，但情緒需要先被看見時。", action: "抱著小茶杯坐在蒲團上，低頭呼吸。", emotion: "體貼平靜", view: "微俯角半身", effect: "茶氣、緩慢圓線", tone: "情緒優先", color: "gold" },
  { id: 11, category: "慈悲", phrase: "我懂你的難處", context: "不一定有相同經驗，但願意承認對方的不容易。", action: "小沙彌點頭，眉眼溫柔地望向前方。", emotion: "理解尊重", view: "正面近半身", effect: "小蓮花、對話線", tone: "承接感受", color: "sage" },
  { id: 12, category: "慈悲", phrase: "願善意先到", context: "希望一段對話先從友善與理解開始。", action: "小沙彌把蓮花放在兩人之間的空白處。", emotion: "平和期待", view: "俯角全身", effect: "蓮花、細小光線", tone: "友善開場", color: "vermilion" },
  { id: 13, category: "感恩", phrase: "感恩有你", context: "收到陪伴、協助或一句及時的關心。", action: "微微鞠躬，雙手捧著蓮花。", emotion: "真誠感謝", view: "正面全身", effect: "蓮花、手繪光點", tone: "真誠謝意", color: "vermilion" },
  { id: 14, category: "感恩", phrase: "謝謝你的善意", context: "想把對方的小小好意，清楚地接住並回應。", action: "雙手接過一盞小燈，露出安心微笑。", emotion: "感動溫暖", view: "三分之二側面半身", effect: "小燈、溫暖光線", tone: "鄭重而輕盈", color: "gold" },
  { id: 15, category: "感恩", phrase: "謝謝你提醒我", context: "收到善意的提醒，願意帶著感謝修正自己。", action: "拿著小筆記本認真點頭。", emotion: "謙虛認真", view: "側面半身", effect: "筆記本、勾線", tone: "開放心態", color: "ink" },
  { id: 16, category: "感恩", phrase: "有你真好", context: "和熟悉的人分享被陪伴的幸福。", action: "小沙彌張開雙手，身旁有兩朵蓮花。", emotion: "開心依戀", view: "正面全身", effect: "雙蓮花、圓形光點", tone: "珍惜陪伴", color: "peach" },
  { id: 17, category: "感恩", phrase: "辛苦了，謝謝你", context: "對方完成一件費力的事，想同時表達體諒與感謝。", action: "端熱茶並微微鞠躬。", emotion: "溫暖鄭重", view: "三分之二側面全身", effect: "茶杯熱氣、蓮花", tone: "看見付出", color: "vermilion" },
  { id: 18, category: "感恩", phrase: "今天也值得感謝", context: "每天給自己一個溫柔的收尾，不只計算完成了什麼。", action: "捧茶坐在晨光裡，身旁放著小日記。", emotion: "柔和滿足", view: "正面半身", effect: "茶湯熱氣、晨光", tone: "日常祝福", color: "gold" },
  { id: 19, category: "感恩", phrase: "謝謝你願意聽", context: "完成一次真誠對話，感謝對方留在當下。", action: "雙手合十，身旁浮著小小對話泡泡。", emotion: "安心感動", view: "微俯角半身", effect: "對話泡泡、柔光", tone: "珍惜理解", color: "lavender" },
  { id: 20, category: "感恩", phrase: "謝謝你的耐心", context: "對方願意等待、重複說明或陪自己練習時。", action: "雙手捧著小沙漏，溫柔點頭。", emotion: "感激踏實", view: "正面半身", effect: "沙漏、細小星光", tone: "看見等待", color: "sage" },
  { id: 21, category: "感恩", phrase: "謝謝一起完成", context: "一件事告一段落，想把成果歸功於彼此。", action: "小沙彌與另一側的手一起托起蓮花。", emotion: "開心合作", view: "微仰角全身", effect: "蓮花、完成線條", tone: "共享成果", color: "vermilion" },
  { id: 22, category: "感恩", phrase: "謝謝今天的自己", context: "在疲憊的一天結束後肯定自己的努力。", action: "小沙彌對鏡子中的自己合十。", emotion: "溫柔自愛", view: "正面半身", effect: "小鏡子、星光", tone: "自我感謝", color: "peach" },
  { id: 23, category: "感恩", phrase: "這份心意我收到了", context: "對方表達關心或送來祝福時，清楚回應感受。", action: "小沙彌把蓮花放進胸前的小布袋。", emotion: "感動珍惜", view: "三分之二側面半身", effect: "蓮花、收納線", tone: "接住心意", color: "lavender" },
  { id: 24, category: "感恩", phrase: "謝謝讓世界更好", context: "看到善意被傳遞，想為這份行動留下鼓勵。", action: "小沙彌將小燈掛在樹枝上。", emotion: "明亮感恩", view: "微仰角全身", effect: "小燈、嫩葉", tone: "放大善意", color: "sage" },
  { id: 25, category: "包容", phrase: "沒關係，慢慢來", context: "朋友犯錯、焦慮或進度暫時跟不上時。", action: "揮揮手，示意不用急著道歉。", emotion: "安撫接住", view: "正面半身", effect: "雲朵、舒緩線條", tone: "放下急迫", color: "lavender" },
  { id: 26, category: "包容", phrase: "我們再試一次", context: "第一次沒有成功，但仍願意一起重新開始。", action: "捲起袖子，握著小旗子往前走。", emotion: "積極包容", view: "三分之二側面全身", effect: "小旗子、加油線", tone: "並肩重來", color: "vermilion" },
  { id: 27, category: "包容", phrase: "不急著下定論", context: "面對誤會或爭議，先保留理解的空間。", action: "舉起手掌做出暫停手勢。", emotion: "冷靜尊重", view: "正面半身", effect: "平衡線、未合上的花", tone: "溫和提醒", color: "ink" },
  { id: 28, category: "包容", phrase: "每個人都有步調", context: "團隊成員速度不同，提醒彼此尊重差異。", action: "小沙彌拿著不同大小的腳印卡片。", emotion: "理解包容", view: "俯角全身", effect: "腳印、不同長短線", tone: "尊重差異", color: "sage" },
  { id: 29, category: "包容", phrase: "先不用責怪自己", context: "犯錯後陷入自責，想給自己一個修正的空間。", action: "小沙彌抱住自己，身旁放著橡皮擦。", emotion: "溫柔安慰", view: "正面半身", effect: "橡皮擦、柔和圓線", tone: "自我寬待", color: "peach" },
  { id: 30, category: "包容", phrase: "我聽見你的不同", context: "遇到不同意見時，先承認差異存在。", action: "小沙彌看著兩個不同顏色的對話泡泡。", emotion: "開放專注", view: "三分之二側面半身", effect: "雙色泡泡、連接線", tone: "承認差異", color: "gold" },
  { id: 31, category: "包容", phrase: "可以不一樣", context: "鼓勵對方保有自己的選擇與生活方式。", action: "小沙彌站在兩條不同小路中間微笑。", emotion: "自在支持", view: "微俯角全身", effect: "分岔路、兩朵花", tone: "保留選擇", color: "lavender" },
  { id: 32, category: "包容", phrase: "給自己重新開始", context: "一段關係、工作或計畫需要重新整理時。", action: "小沙彌擦去小黑板，重新畫上一朵蓮花。", emotion: "希望清明", view: "側面全身", effect: "黑板、蓮花線稿", tone: "重新出發", color: "vermilion" },
  { id: 33, category: "包容", phrase: "我不急著評斷", context: "面對未完整的資訊，提醒自己保持謙慎。", action: "小沙彌放下手中的小槌，安靜觀察。", emotion: "克制平靜", view: "微俯角半身", effect: "小木槌、觀察線", tone: "暫緩判斷", color: "ink" },
  { id: 34, category: "包容", phrase: "你的感受很重要", context: "對方表達受傷或不舒服時，先肯定其感受。", action: "小沙彌把一朵蓮花放在對話泡泡旁。", emotion: "認真關懷", view: "正面半身", effect: "蓮花、柔和對話線", tone: "看見感受", color: "peach" },
  { id: 35, category: "包容", phrase: "我們慢慢理解", context: "彼此還不熟悉，但願意給關係一點時間。", action: "小沙彌與遠方的小燈之間拉出一條溫柔線。", emotion: "耐心期待", view: "側面全身", effect: "小燈、長線", tone: "培養理解", color: "gold" },
  { id: 36, category: "包容", phrase: "留一點餘地", context: "不把話說死，也不把一次失誤定義成全部。", action: "在分岔路口放下一朵蓮花。", emotion: "寬和清醒", view: "俯角全身", effect: "路線、蓮花標記", tone: "保留可能", color: "sage" },
  { id: 37, category: "鼓勵", phrase: "慢慢來就好", context: "事情很多、心裡很急，或需要重新找回節奏時。", action: "坐在雲朵上喝茶，腳邊放著小木魚。", emotion: "放鬆安心", view: "微俯角半身", effect: "雲朵、茶杯熱氣", tone: "放慢腳步", color: "gold" },
  { id: 38, category: "鼓勵", phrase: "你已經很努力了", context: "肯定一段不一定被看見，但確實存在的付出。", action: "伸手拍拍畫面前方，露出鼓勵微笑。", emotion: "真心肯定", view: "正面半身", effect: "小星星、溫暖線條", tone: "看見努力", color: "vermilion" },
  { id: 39, category: "鼓勵", phrase: "一步一步來", context: "面對複雜任務或漫長目標，提醒只走下一步。", action: "沿著小石階向上走，回頭比出加油手勢。", emotion: "穩定堅定", view: "側面全身", effect: "小石階、腳步線", tone: "穩定前進", color: "sage" },
  { id: 40, category: "鼓勵", phrase: "保持初心", context: "選擇變多或受到外在聲音影響時，重新確認在乎的事。", action: "雙手護著胸前的小蓮花。", emotion: "安靜堅定", view: "正面半身", effect: "蓮花、細緻光暈", tone: "不忘初衷", color: "lavender" },
  { id: 41, category: "鼓勵", phrase: "再試一次就好", context: "一次失敗後，給自己不帶壓力的重新嘗試。", action: "拿起小旗子，深呼吸後重新踏步。", emotion: "勇敢明亮", view: "微仰角全身", effect: "旗子、起步線", tone: "允許重來", color: "vermilion" },
  { id: 42, category: "鼓勵", phrase: "我相信你", context: "想把信任與支持直接交給正在努力的人。", action: "小沙彌將小蓮花遞到畫面前方。", emotion: "真誠信任", view: "正面半身", effect: "蓮花、向前光線", tone: "把信任交出", color: "peach" },
  { id: 43, category: "鼓勵", phrase: "今天也有進步", context: "鼓勵看見微小但真實的變化。", action: "在小日曆上畫下一個勾，開心點頭。", emotion: "欣慰開心", view: "三分之二側面半身", effect: "日曆、上升線", tone: "肯定累積", color: "gold" },
  { id: 44, category: "鼓勵", phrase: "你不用一個人撐", context: "對方承受太多時，提醒可以尋求陪伴與協助。", action: "小沙彌伸手拉起一條小布巾。", emotion: "可靠關懷", view: "正面全身", effect: "牽引線、兩朵花", tone: "邀請求助", color: "lavender" },
  { id: 45, category: "鼓勵", phrase: "先完成眼前這一步", context: "任務很大時，把注意力帶回可執行的小行動。", action: "小沙彌把一顆小石頭放到第一階。", emotion: "專注踏實", view: "俯角半身", effect: "石階、定位線", tone: "拆小目標", color: "ink" },
  { id: 46, category: "鼓勵", phrase: "你比想像中更勇敢", context: "對方願意面對不容易的事，給予溫柔肯定。", action: "小沙彌握拳但表情柔和，身旁有小旗。", emotion: "鼓舞欣賞", view: "微仰角半身", effect: "旗子、光芒線", tone: "肯定勇氣", color: "vermilion" },
  { id: 47, category: "鼓勵", phrase: "累了也可以休息", context: "鼓勵停止把休息視為失敗。", action: "小沙彌放下小木魚，躺在蒲團上。", emotion: "體貼放鬆", view: "微俯角全身", effect: "蒲團、雲朵", tone: "休息正當", color: "sage" },
  { id: 48, category: "鼓勵", phrase: "明天再一起努力", context: "今天先收好力氣，保留明天繼續的希望。", action: "小沙彌揮手走向月光，回頭微笑。", emotion: "溫暖期待", view: "側面全身", effect: "月光、腳步線", tone: "共同持續", color: "peach" },
  { id: 49, category: "安定", phrase: "先讓心靜下來", context: "生氣、焦慮或訊息太多時，先把注意力帶回自己。", action: "盤腿打坐，雙手放在膝上。", emotion: "沉靜安穩", view: "正面全身", effect: "平靜圓線、兩片葉子", tone: "安定呼吸", color: "ink" },
  { id: 50, category: "安定", phrase: "平安就好", context: "關心對方今天過得如何，或在忙碌後互相報一聲平安。", action: "雙手合十，露出安心的笑。", emotion: "安心溫柔", view: "正面半身", effect: "平安光圈、小蓮花", tone: "簡單祝福", color: "gold" },
  { id: 51, category: "安定", phrase: "呼吸一下", context: "壓力湧上來時，提醒先停半拍。", action: "緩慢吸氣，衣袖隨風輕輕飄動。", emotion: "放鬆專注", view: "側面半身", effect: "氣流線、葉片", tone: "短暫停靠", color: "sage" },
  { id: 52, category: "安定", phrase: "事情會慢慢好起來", context: "陪伴低潮中的人，但不替對方保證結果。", action: "站在小樹旁，看著雲後的晨光。", emotion: "溫柔希望", view: "微仰角全身", effect: "小樹、晨光線", tone: "不過度承諾", color: "peach" },
  { id: 53, category: "安定", phrase: "不用現在回答", context: "給對方時間整理思緒，不催促回應。", action: "小沙彌把手掌朝下，示意安靜等待。", emotion: "從容體貼", view: "正面半身", effect: "小沙漏、靜音線", tone: "留出時間", color: "lavender" },
  { id: 54, category: "安定", phrase: "喝口茶吧", context: "忙碌或緊繃時，邀請對方先補充一點能量。", action: "端著茶杯坐到小蒲團旁。", emotion: "照顧關懷", view: "三分之二側面全身", effect: "茶杯熱氣、圓桌線", tone: "溫柔停靠", color: "gold" },
  { id: 55, category: "安定", phrase: "今晚好好睡", context: "朋友累了一天，提醒把休息放回行程。", action: "小沙彌蓋好小被子，雙手合十。", emotion: "安心柔和", view: "微俯角全身", effect: "月亮、雲朵", tone: "睡前祝福", color: "lavender" },
  { id: 56, category: "安定", phrase: "把事情一件件來", context: "待辦很多時，避免讓整體壓力淹沒自己。", action: "把散落的小卡片排成一列。", emotion: "清楚踏實", view: "俯角半身", effect: "卡片、整理線", tone: "恢復秩序", color: "ink" },
  { id: 57, category: "安定", phrase: "現在先停一下", context: "察覺情緒或身體已經超過負荷時。", action: "小沙彌敲一下木魚後放下小槌。", emotion: "果斷溫柔", view: "正面半身", effect: "木魚、停止線", tone: "允許暫停", color: "vermilion" },
  { id: 58, category: "安定", phrase: "我陪你安靜一下", context: "對方不想說話時，用陪伴代替追問。", action: "坐在對方想像的位置旁，一起看著蓮花。", emotion: "安靜陪伴", view: "側面全身", effect: "蓮花、雙人光暈", tone: "不打擾的陪伴", color: "peach" },
  { id: 59, category: "安定", phrase: "不用急著想通", context: "情緒還在流動時，不強求立刻找到答案。", action: "小沙彌讓一朵雲慢慢飄過頭頂。", emotion: "寬容平靜", view: "微仰角半身", effect: "雲朵、緩慢弧線", tone: "允許過程", color: "sage" },
  { id: 60, category: "安定", phrase: "願你今晚安穩", context: "想為遠方的人送上一句安定的祝福。", action: "小沙彌把小燈放在窗邊，雙手合十。", emotion: "寧靜祝福", view: "三分之二側面全身", effect: "小燈、夜色線稿", tone: "遠方守護", color: "gold" },
  { id: 61, category: "自省", phrase: "先照顧好自己", context: "忙著照顧別人或工作時，提醒休息也是重要的事。", action: "抱著熱茶，蓋上一條小毯子。", emotion: "體貼自愛", view: "正面半身", effect: "茶杯、柔軟小雲", tone: "自我關懷", color: "peach" },
  { id: 62, category: "自省", phrase: "今天比昨天更好", context: "把注意力放在自己的微小進步，而不是比較。", action: "在小日曆上畫下一個勾。", emotion: "溫和欣慰", view: "三分之二側面半身", effect: "日曆、上升小線條", tone: "溫和成長", color: "vermilion" },
  { id: 63, category: "自省", phrase: "有錯就改", context: "願意承認失誤、修正方法並繼續前進。", action: "擦掉黑板上的錯誤圖案，重新畫蓮花。", emotion: "負責清醒", view: "側面全身", effect: "黑板、橡皮擦屑", tone: "負責而不苛責", color: "ink" },
  { id: 64, category: "自省", phrase: "保持謙虛", context: "完成一件事或收到稱讚時，也記得一起努力的人。", action: "害羞鞠躬，手邊有一朵小蓮花。", emotion: "謙和害羞", view: "正面全身", effect: "蓮花、細小弧線", tone: "謙和收下", color: "lavender" },
  { id: 65, category: "自省", phrase: "我再想想", context: "遇到重要選擇，不急著被情緒推著走。", action: "托腮坐在蒲團上，頭上有思考線。", emotion: "慎思平靜", view: "微俯角半身", effect: "思考線、茶杯", tone: "留給自己時間", color: "gold" },
  { id: 66, category: "自省", phrase: "聽聽不同的聲音", context: "提醒自己不只站在單一角度看事情。", action: "小沙彌轉動耳朵，望向兩側的對話泡泡。", emotion: "開放專注", view: "正面半身", effect: "雙向音波、泡泡", tone: "擴大視角", color: "sage" },
  { id: 67, category: "自省", phrase: "我可以做得更好", context: "不是否定自己，而是願意持續調整與學習。", action: "小沙彌拿著小筆記本重新練習。", emotion: "踏實進取", view: "側面半身", effect: "筆記本、重複線", tone: "持續修正", color: "vermilion" },
  { id: 68, category: "自省", phrase: "放下比較", context: "被他人的速度或成果影響時，回到自己的路。", action: "小沙彌把兩把不同長度的尺放下。", emotion: "釋然安定", view: "俯角全身", effect: "尺、各自腳印", tone: "回到自身", color: "lavender" },
  { id: 69, category: "自省", phrase: "我願意道歉", context: "發現自己的話或行動造成影響時，願意負責。", action: "小沙彌真誠鞠躬，手捧一朵蓮花。", emotion: "真誠負責", view: "正面半身", effect: "蓮花、柔和下弧線", tone: "承認影響", color: "peach" },
  { id: 70, category: "自省", phrase: "先確認再行動", context: "資訊還不完整時，避免誤會與衝動。", action: "小沙彌用放大鏡查看小卷軸。", emotion: "謹慎專注", view: "三分之二側面半身", effect: "卷軸、放大鏡", tone: "事前確認", color: "ink" },
  { id: 71, category: "自省", phrase: "把善意留給自己", context: "自己做不到時，停止用最嚴格的方式責備自己。", action: "小沙彌把蓮花放回胸前的小布袋。", emotion: "溫柔接納", view: "正面半身", effect: "蓮花、收納線", tone: "自我慈悲", color: "peach" },
  { id: 72, category: "自省", phrase: "今天先到這裡", context: "已經完成足夠的事，允許自己收工與休息。", action: "合上小日記，拿起小布袋準備離開。", emotion: "踏實放鬆", view: "側面全身", effect: "日記、夕陽線", tone: "知道何時停", color: "gold" },
  { id: 73, category: "和善", phrase: "好好說話", context: "提醒自己即使不同意，也可以保留對人的尊重。", action: "雙手向前，像把尖銳的話放柔。", emotion: "清楚尊重", view: "正面半身", effect: "對話線、圓角音波", tone: "清楚而尊重", color: "vermilion" },
  { id: 74, category: "和善", phrase: "先謝謝，再溝通", context: "面對不同意見時，先承認對方的投入再討論內容。", action: "端茶給對話另一端，身旁有兩朵蓮花。", emotion: "平和誠懇", view: "三分之二側面半身", effect: "茶杯、雙蓮花", tone: "搭橋而非對抗", color: "gold" },
  { id: 75, category: "和善", phrase: "願我們都被理解", context: "誤會還沒解開，想表達願意靠近彼此。", action: "讓兩個對話泡泡慢慢靠近。", emotion: "溫柔期待", view: "正面全身", effect: "對話泡泡、柔和連線", tone: "共同靠近", color: "peach" },
  { id: 76, category: "和善", phrase: "留一點餘地", context: "不把話說死，也不把一次失誤定義成全部。", action: "在分岔路口放下一朵蓮花。", emotion: "寬和清醒", view: "俯角全身", effect: "路線、蓮花標記", tone: "保留可能", color: "sage" },
  { id: 77, category: "和善", phrase: "我想確認一下", context: "不確定對方意思時，用提問取代猜測。", action: "小沙彌舉起小卷軸，禮貌點頭。", emotion: "謹慎友善", view: "側面半身", effect: "問號形手繪線、卷軸", tone: "先求理解", color: "ink" },
  { id: 78, category: "和善", phrase: "謝謝你告訴我", context: "對方提出不同感受或看法時，先表示願意接收。", action: "雙手接住一張小紙條。", emotion: "開放感謝", view: "正面半身", effect: "紙條、蓮花", tone: "鼓勵表達", color: "lavender" },
  { id: 79, category: "和善", phrase: "我們一起想辦法", context: "遇到問題時，把焦點放在合作而非責任歸屬。", action: "小沙彌和畫面前方一起攤開卷軸。", emotion: "合作積極", view: "俯角半身", effect: "卷軸、連接線", tone: "共同解題", color: "vermilion" },
  { id: 80, category: "和善", phrase: "我尊重你的選擇", context: "對方做出與自己不同的決定時，保留尊重。", action: "小沙彌退開一步並雙手合十。", emotion: "成熟平和", view: "三分之二側面全身", effect: "兩條小路、蓮花", tone: "尊重自主", color: "sage" },
  { id: 81, category: "和善", phrase: "有話可以慢慢說", context: "邀請對方在安全的節奏裡表達真實想法。", action: "小沙彌坐好，將小木魚放到一旁。", emotion: "耐心柔和", view: "正面半身", effect: "對話泡泡、舒緩線", tone: "創造安全感", color: "lavender" },
  { id: 82, category: "和善", phrase: "我先說聲抱歉", context: "發現自己的語氣或做法不夠周全時。", action: "小沙彌真誠鞠躬並遞出蓮花。", emotion: "誠懇負責", view: "正面全身", effect: "蓮花、緩和線", tone: "先承擔再修正", color: "peach" },
  { id: 83, category: "和善", phrase: "可以不同意，但別傷人", context: "討論立場不同時，守住尊重與界線。", action: "小沙彌在兩個對話泡泡中間畫出柔和界線。", emotion: "堅定溫和", view: "正面半身", effect: "柔和界線、雙色泡泡", tone: "保有界線", color: "ink" },
  { id: 84, category: "和善", phrase: "謝謝你願意一起談", context: "一段不容易的溝通終於開始有進展時。", action: "小沙彌與對話泡泡一起捧著小燈。", emotion: "欣慰溫暖", view: "微仰角全身", effect: "小燈、對話線", tone: "肯定溝通", color: "gold" },
  { id: 85, category: "善行", phrase: "今天做件好事", context: "邀請自己從一件小小且可做到的善意開始。", action: "彎腰替小樹苗澆水。", emotion: "明亮有行動力", view: "微俯角全身", effect: "水滴、嫩芽", tone: "行動邀請", color: "sage" },
  { id: 86, category: "善行", phrase: "能幫就幫", context: "看到身邊的人需要一點支援時，主動伸手但不勉強。", action: "伸手扶起一只小箱子。", emotion: "熱心可靠", view: "正面全身", effect: "小箱子、支援線", tone: "量力互助", color: "vermilion" },
  { id: 87, category: "善行", phrase: "分享一點溫暖", context: "想把一杯茶、一句話或一點時間分享給身邊的人。", action: "把熱茶與蓮花送向畫面前方。", emotion: "慷慨溫暖", view: "三分之二側面半身", effect: "熱氣、蓮花、圓光", tone: "慷慨但不打擾", color: "gold" },
  { id: 88, category: "善行", phrase: "善意會留下", context: "鼓勵持續做對的事，即使沒有立刻得到回應。", action: "播下一顆種子，身旁冒出新芽。", emotion: "安靜有希望", view: "俯角全身", effect: "種子、嫩芽、光點", tone: "溫柔長期主義", color: "lavender" },
  { id: 89, category: "善行", phrase: "把門留給別人", context: "在團體或日常裡替別人多留一點方便。", action: "小沙彌扶住一扇看不見的門。", emotion: "體貼專注", view: "側面全身", effect: "門框線、蓮花", tone: "替人著想", color: "peach" },
  { id: 90, category: "善行", phrase: "先讓需要的人", context: "資源有限時，願意把優先順序留給更需要的人。", action: "小沙彌把手中的小燈遞向前方。", emotion: "謙讓溫柔", view: "三分之二側面半身", effect: "小燈、向前線", tone: "溫柔讓步", color: "gold" },
  { id: 91, category: "善行", phrase: "謝謝你的分享", context: "收到知識、食物、時間或故事，回應分享的心意。", action: "雙手接過小卷軸並鞠躬。", emotion: "欣喜感恩", view: "正面半身", effect: "卷軸、光點", tone: "珍惜分享", color: "vermilion" },
  { id: 92, category: "善行", phrase: "一起把事情做好", context: "需要協作時，邀請大家把注意力放在共同目標。", action: "小沙彌與大家一起抬起一朵大蓮花。", emotion: "合作積極", view: "微仰角全身", effect: "大蓮花、合力線", tone: "共同完成", color: "sage" },
  { id: 93, category: "善行", phrase: "看到就順手整理", context: "發現公共空間或共享資料需要維護時。", action: "小沙彌把散落的小紙片整理成一疊。", emotion: "踏實主動", view: "俯角半身", effect: "紙片、整理線", tone: "照顧環境", color: "ink" },
  { id: 94, category: "善行", phrase: "留一盞燈給人", context: "想為晚歸、迷惘或正在努力的人留下一點指引。", action: "小沙彌將小燈掛在路旁。", emotion: "守望溫暖", view: "側面全身", effect: "小燈、道路線", tone: "提供方向", color: "peach" },
  { id: 95, category: "善行", phrase: "先問對方需不需要", context: "想幫忙前先尊重對方的需求與界線。", action: "小沙彌舉起手掌詢問，另一手捧著蓮花。", emotion: "尊重熱心", view: "正面半身", effect: "對話泡泡、蓮花", tone: "先問再幫", color: "lavender" },
  { id: 96, category: "善行", phrase: "讓好事繼續發生", context: "把收到的善意再傳給下一個人。", action: "小沙彌點亮一串小燈，光線向前延伸。", emotion: "明亮鼓舞", view: "微仰角全身", effect: "串聯小燈、光線", tone: "傳遞善意", color: "vermilion" },
  { id: 97, category: "尊重", phrase: "尊重每個選擇", context: "對方做出不同決定時，先尊重自主而不是急著說服。", action: "退開一步並雙手合十，讓出選擇的空間。", emotion: "成熟平和", view: "三分之二側面全身", effect: "兩條小路、蓮花", tone: "尊重自主", color: "ink" },
  { id: 98, category: "尊重", phrase: "謝謝你的界線", context: "對方表達需要獨處、休息或拒絕時，回應其界線。", action: "小沙彌在地面畫出柔和界線，微笑點頭。", emotion: "理解體貼", view: "正面半身", effect: "柔和界線、蓮花", tone: "接住界線", color: "sage" },
  { id: 99, category: "尊重", phrase: "我會先問過", context: "涉及他人時間、作品或資料時，先取得同意。", action: "舉起小卷軸與詢問手勢，等待回覆。", emotion: "謹慎友善", view: "側面半身", effect: "問號線、卷軸", tone: "尊重同意", color: "gold" },
  { id: 100, category: "尊重", phrase: "你的聲音很重要", context: "團體討論中，希望每個人的觀點都有被聽見的機會。", action: "把小木魚放下，側耳望向對話泡泡。", emotion: "專注認真", view: "微俯角半身", effect: "音波線、對話泡泡", tone: "邀請發聲", color: "vermilion" },
  { id: 101, category: "尊重", phrase: "先讓你說完", context: "對話中不插話，給對方完整表達的時間。", action: "小沙彌用手掌做出請繼續的手勢。", emotion: "耐心專注", view: "正面半身", effect: "順流線、對話泡泡", tone: "完整傾聽", color: "lavender" },
  { id: 102, category: "尊重", phrase: "不拿別人比較", context: "提醒自己尊重每個人的背景、速度與路線。", action: "放下兩把不同長度的尺，微笑看向前方。", emotion: "釋然清明", view: "俯角全身", effect: "尺、各自腳印", tone: "停止比較", color: "peach" },
  { id: 103, category: "尊重", phrase: "謝謝你說清楚", context: "對方說明感受、需求或限制時，回應其坦白。", action: "雙手接住一張小紙條，認真點頭。", emotion: "開放感謝", view: "三分之二側面半身", effect: "紙條、光點", tone: "鼓勵表達", color: "gold" },
  { id: 104, category: "尊重", phrase: "我會注意分寸", context: "想開玩笑或給建議前，先確認是否適合。", action: "小沙彌收起小木槌，做出輕放手勢。", emotion: "謙慎可愛", view: "正面半身", effect: "小木槌、停頓線", tone: "有界線的善意", color: "ink" },
  { id: 105, category: "尊重", phrase: "不同也很好", context: "看見差異時，不把不一樣視為錯誤。", action: "小沙彌身旁綻放兩種不同形狀的花。", emotion: "欣賞自在", view: "微仰角全身", effect: "雙色花朵、光線", tone: "欣賞差異", color: "lavender" },
  { id: 106, category: "尊重", phrase: "請給我一點空間", context: "需要安靜整理情緒或專心完成事情時。", action: "小沙彌坐在蒲團上，周圍留出清楚空白。", emotion: "平靜堅定", view: "微俯角全身", effect: "蒲團、留白圓線", tone: "溫和表達需求", color: "sage" },
  { id: 107, category: "尊重", phrase: "我先尊重你的步調", context: "對方需要較慢速度或不同方法時，願意配合。", action: "小沙彌放慢腳步，和小雲朵並行。", emotion: "耐心支持", view: "側面全身", effect: "腳步線、雲朵", tone: "配合步調", color: "peach" },
  { id: 108, category: "尊重", phrase: "謝謝你提醒我", context: "收到界線或尊重相關的提醒，願意修正自己的行動。", action: "小沙彌拿著筆記本合十致意。", emotion: "謙虛認真", view: "正面半身", effect: "筆記本、勾線", tone: "願意修正", color: "vermilion" },
  { id: 109, category: "和解", phrase: "我們先冷靜一下", context: "爭執升溫時，先停下來避免說出傷人的話。", action: "放下小木魚並做出暫停手勢。", emotion: "安定克制", view: "正面半身", effect: "停止線、雲朵", tone: "先降溫", color: "ink" },
  { id: 110, category: "和解", phrase: "我願意聽你說", context: "衝突後重新打開對話，不急著防衛。", action: "小沙彌坐好並把耳朵朝向對話泡泡。", emotion: "真誠開放", view: "側面半身", effect: "音波線、蓮花", tone: "重新聆聽", color: "lavender" },
  { id: 111, category: "和解", phrase: "我們都辛苦了", context: "雙方都承受壓力時，先承認彼此的不容易。", action: "小沙彌左右各遞一杯茶。", emotion: "溫暖理解", view: "正面全身", effect: "兩杯茶、熱氣", tone: "看見彼此", color: "gold" },
  { id: 112, category: "和解", phrase: "我想把話說清楚", context: "誤會存在時，願意用清楚而不攻擊的方式說明。", action: "小沙彌攤開小卷軸，手指向清楚的線條。", emotion: "認真平和", view: "三分之二側面半身", effect: "卷軸、整理線", tone: "釐清誤會", color: "vermilion" },
  { id: 113, category: "和解", phrase: "對不起，我剛剛太急了", context: "發現自己的語氣傷人或反應過快時。", action: "真誠鞠躬，手邊放著一朵蓮花。", emotion: "誠懇自省", view: "正面半身", effect: "蓮花、緩和弧線", tone: "承擔語氣", color: "peach" },
  { id: 114, category: "和解", phrase: "謝謝你願意回來談", context: "對方願意重新溝通，想肯定這份勇氣。", action: "小沙彌提著小燈迎向前方。", emotion: "欣慰溫暖", view: "微仰角全身", effect: "小燈、迎接線", tone: "珍惜回來", color: "gold" },
  { id: 115, category: "和解", phrase: "我們找共同點", context: "意見不同時，先找彼此都在乎的部分。", action: "小沙彌在兩個圓圈交會處放下蓮花。", emotion: "專注合作", view: "俯角半身", effect: "交會圓線、蓮花", tone: "找共同點", color: "sage" },
  { id: 116, category: "和解", phrase: "我不想再傷害你", context: "希望停止互相攻擊，把界線說清楚。", action: "小沙彌收起尖角紙片，換成柔和蓮花。", emotion: "堅定溫柔", view: "正面半身", effect: "紙片、蓮花", tone: "停止傷害", color: "ink" },
  { id: 117, category: "和解", phrase: "先從一句好話開始", context: "氣氛僵住時，讓對話重新有一個溫和起點。", action: "小沙彌端出茶並雙手合十。", emotion: "友善期待", view: "正面全身", effect: "茶杯、晨光", tone: "重新開場", color: "vermilion" },
  { id: 118, category: "和解", phrase: "我理解你為什麼難過", context: "不一定同意，但願意先承認對方的感受。", action: "小沙彌把蓮花放在對話泡泡旁。", emotion: "同理安定", view: "三分之二側面半身", effect: "蓮花、圓光", tone: "先承接感受", color: "peach" },
  { id: 119, category: "和解", phrase: "我們可以重新約定", context: "舊方法不適合時，一起建立更好的相處方式。", action: "小沙彌在卷軸上畫出新的柔和線條。", emotion: "務實希望", view: "俯角半身", effect: "卷軸、連接線", tone: "重新約定", color: "lavender" },
  { id: 120, category: "和解", phrase: "願我們都放下一點", context: "和解不是遺忘，而是讓彼此不再被衝突綁住。", action: "小沙彌放下手中的石頭，讓蓮花浮起。", emotion: "釋然平靜", view: "微仰角全身", effect: "石頭、蓮花、水波線", tone: "慢慢放下", color: "sage" },
  { id: 121, category: "分享", phrase: "一起分享吧", context: "有好消息、知識或資源時，邀請大家一起參與。", action: "小沙彌打開小布袋，裡面放著蓮花與小卷軸。", emotion: "開心大方", view: "正面全身", effect: "小布袋、光點", tone: "共享邀請", color: "vermilion" },
  { id: 122, category: "分享", phrase: "這個給你", context: "想把一份小禮物、點心或祝福送給對方。", action: "雙手遞出小茶杯與蓮花。", emotion: "溫柔慷慨", view: "三分之二側面半身", effect: "茶杯、蓮花", tone: "直接分享", color: "gold" },
  { id: 123, category: "分享", phrase: "我整理給你", context: "把資訊、筆記或經驗整理成對方容易使用的形式。", action: "小沙彌抱著整齊的小卷軸。", emotion: "可靠認真", view: "正面半身", effect: "卷軸、整理線", tone: "整理再分享", color: "ink" },
  { id: 124, category: "分享", phrase: "有需要就拿", context: "提供資源時，不讓對方感到欠人情。", action: "小沙彌把一籃小蓮花放在桌面前方。", emotion: "自在大方", view: "俯角全身", effect: "籃子、蓮花", tone: "降低負擔", color: "sage" },
  { id: 125, category: "分享", phrase: "歡迎加入", context: "新朋友、新同事或新成員加入團體時。", action: "小沙彌揮手迎接，身旁有一盞小燈。", emotion: "親切熱情", view: "正面全身", effect: "小燈、迎接線", tone: "友善邀請", color: "peach" },
  { id: 126, category: "分享", phrase: "把好消息傳下去", context: "收到值得鼓勵的善意或消息，想讓更多人知道。", action: "小沙彌把小燈交給下一盞燈。", emotion: "明亮鼓舞", view: "側面全身", effect: "串聯小燈、光線", tone: "傳遞好事", color: "vermilion" },
  { id: 127, category: "分享", phrase: "謝謝你願意分享", context: "收到對方的故事、方法、知識或心意。", action: "小沙彌雙手接住小卷軸並鞠躬。", emotion: "尊重感謝", view: "正面半身", effect: "卷軸、光點", tone: "珍惜分享", color: "lavender" },
  { id: 128, category: "分享", phrase: "我們一起用", context: "共享工具、空間或資源時，提醒彼此照顧使用方式。", action: "小沙彌與畫面前方一起托住一盞燈。", emotion: "合作踏實", view: "微仰角全身", effect: "小燈、合力線", tone: "共同維護", color: "gold" },
  { id: 129, category: "分享", phrase: "讓我也出一份力", context: "團隊共同完成事情時，主動貢獻時間或專長。", action: "小沙彌捲起袖子，抱著小箱子加入。", emotion: "積極熱心", view: "三分之二側面全身", effect: "小箱子、加油線", tone: "主動貢獻", color: "sage" },
  { id: 130, category: "分享", phrase: "這份溫暖分你一半", context: "想分享鼓勵、陪伴或一點好心情。", action: "小沙彌把一朵蓮花分成兩束光。", emotion: "溫暖可愛", view: "正面半身", effect: "雙束光、蓮花", tone: "分享心情", color: "peach" },
  { id: 131, category: "分享", phrase: "好方法值得被看見", context: "有人提供有用的方法或創意時，給予公開肯定。", action: "小沙彌舉起小卷軸，身旁有星星線。", emotion: "欣賞鼓勵", view: "微仰角半身", effect: "卷軸、星星", tone: "放大好方法", color: "vermilion" },
  { id: 132, category: "分享", phrase: "一起把善意延續", context: "把收到的幫助轉成下一個可以實踐的行動。", action: "小沙彌沿著小燈排列出一條路。", emotion: "明亮堅定", view: "俯角全身", effect: "小燈、道路線", tone: "善意接力", color: "lavender" },
  { id: 133, category: "祝福", phrase: "願你平安", context: "關心對方今天的狀態，送上簡單而真誠的祝福。", action: "雙手合十，胸前有一圈柔和光暈。", emotion: "安心溫柔", view: "正面半身", effect: "平安光圈、蓮花", tone: "簡單祝福", color: "gold" },
  { id: 134, category: "祝福", phrase: "願你順心", context: "祝福對方接下來的事情順利、心情穩定。", action: "小沙彌把一朵蓮花放在順流線上。", emotion: "明亮溫暖", view: "三分之二側面全身", effect: "順流線、蓮花", tone: "溫柔祝願", color: "peach" },
  { id: 135, category: "祝福", phrase: "願你被好好對待", context: "關心正在努力或承受壓力的人。", action: "小沙彌把小毯子與蓮花遞向前方。", emotion: "慈柔關懷", view: "正面半身", effect: "小毯子、圓光", tone: "守護祝福", color: "vermilion" },
  { id: 136, category: "祝福", phrase: "願你今天有光", context: "在低潮或陰鬱時，送上一點不過度承諾的希望。", action: "小沙彌提著小燈走在晨光裡。", emotion: "安靜希望", view: "微仰角全身", effect: "小燈、晨光線", tone: "留一盞光", color: "gold" },
  { id: 137, category: "祝福", phrase: "願你吃飽睡好", context: "關心日常基本需要，適合對疲憊的朋友說。", action: "小沙彌端茶並抱著小被子。", emotion: "可愛體貼", view: "正面全身", effect: "茶杯、月亮、被子", tone: "照顧日常", color: "lavender" },
  { id: 138, category: "祝福", phrase: "願你有勇氣", context: "對方要面對重要決定或新的挑戰時。", action: "小沙彌握著小旗子，穩穩向前踏步。", emotion: "堅定鼓舞", view: "微仰角全身", effect: "小旗子、腳步線", tone: "支持前行", color: "vermilion" },
  { id: 139, category: "祝福", phrase: "願你不必獨自承擔", context: "想提醒對方可以求助，也有人願意陪伴。", action: "小沙彌伸出手，另一手托著小燈。", emotion: "可靠溫暖", view: "正面半身", effect: "牽引線、小燈", tone: "邀請陪伴", color: "peach" },
  { id: 140, category: "祝福", phrase: "願你保有柔軟", context: "面對忙碌與不順時，提醒不要失去善意。", action: "小沙彌護著胸前的小蓮花。", emotion: "溫柔堅定", view: "三分之二側面半身", effect: "蓮花、柔和線", tone: "守住柔軟", color: "sage" },
  { id: 141, category: "祝福", phrase: "願你一路有伴", context: "祝福對方踏上新旅程、轉換工作或開始新生活。", action: "小沙彌背著小布袋在小路上揮手。", emotion: "期待親切", view: "側面全身", effect: "道路、小旗子", tone: "同行祝福", color: "lavender" },
  { id: 142, category: "祝福", phrase: "願好事發生", context: "對方需要鼓勵，或想為一天留一個明亮的結尾。", action: "小沙彌播下種子，嫩芽旁出現小光點。", emotion: "開心希望", view: "俯角全身", effect: "種子、嫩芽、光點", tone: "保留期待", color: "gold" },
  { id: 143, category: "祝福", phrase: "願你安心做自己", context: "提醒對方不用迎合所有人的期待。", action: "小沙彌在蓮花旁自在坐下，微笑合十。", emotion: "自在安定", view: "正面全身", effect: "蓮花、圓形光線", tone: "支持真實", color: "ink" },
  { id: 144, category: "祝福", phrase: "明天也會有新的風景", context: "在告別或低潮時，送上溫柔但不保證結果的盼望。", action: "小沙彌回頭看向雲後的晨光。", emotion: "溫暖期待", view: "微仰角側面全身", effect: "雲朵、遠方光線", tone: "留下希望", color: "peach" },
];

const categoryIcons: Record<string, typeof HeartHandshake> = {
  慈悲: HeartHandshake,
  感恩: Flower2,
  包容: Wind,
  鼓勵: Sparkles,
  安定: Sun,
  自省: BookOpenText,
  和善: Quote,
  善行: Leaf,
  尊重: ShieldCheck,
  和解: Handshake,
  分享: Gift,
  祝福: Compass,
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("全部語料");
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [featuredId, setFeaturedId] = useState(14);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const filteredWords = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return kindWords.filter((word) => {
      const inCategory = activeCategory === "全部語料" || word.category === activeCategory;
      const inSearch = !normalized || [word.phrase, word.category, word.context, word.action].some((value) => value.toLowerCase().includes(normalized));
      return inCategory && inSearch;
    });
  }, [activeCategory, query]);

  const featuredWord = kindWords.find((word) => word.id === featuredId) ?? kindWords[13];

  const formatPrompt = (word: KindWord) => `文字：「${word.phrase}」；小沙彌${word.action}；表情${word.emotion}；視角為${word.view}；手繪特效為${word.effect}。`;

  const copyPhrase = async (word: KindWord) => {
    try {
      await navigator.clipboard.writeText(formatPrompt(word));
      setCopiedId(word.id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setCopiedId(null);
    }
  };

  const chooseFeatured = () => {
    const choices = kindWords.filter((word) => word.id !== featuredWord.id);
    setFeaturedId(choices[Math.floor(Math.random() * choices.length)].id);
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand-lockup" href="#top" aria-label="小沙彌向善用語專區首頁">
          <img className="brand-mark" src={logoImage} alt="蓮花與木魚圖形標誌" />
          <span className="brand-name">小沙彌<span>向善用語</span></span>
        </a>
        <button className="mobile-menu-button" type="button" aria-label="開啟分類選單" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen((open) => !open)}>
          {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="topbar-note"><span className="live-dot" />今日也留一句好話</div>
      </header>

      <div className="page-grid" id="top">
        <aside className={`index-rail ${mobileNavOpen ? "is-open" : ""}`}>
          <div className="rail-heading"><span className="eyebrow">語料索引</span><span className="rail-count">12 章</span></div>
          <nav aria-label="向善用語分類">
            {categories.map((category, index) => {
              const Icon = category.name === "全部語料" ? BookOpenText : categoryIcons[category.name];
              const active = activeCategory === category.name;
              return (
                <button key={category.name} type="button" className={`category-link ${active ? "is-active" : ""}`} onClick={() => { setActiveCategory(category.name); setMobileNavOpen(false); }}>
                  <span className="category-index">{String(index).padStart(2, "0")}</span>
                  <Icon size={15} strokeWidth={1.8} />
                  <span>{category.name}</span>
                  <span className="category-count">{category.count}</span>
                </button>
              );
            })}
          </nav>
          <div className="rail-note">
            <span className="note-kicker">小小提醒</span>
            <p>善意不是大道理，是一句讓人可以繼續往前走的話。</p>
            <span className="note-seal">善</span>
          </div>
        </aside>

        <main className="main-content">
          <section className="hero-section" aria-labelledby="page-title">
            <div className="hero-copy">
              <div className="section-kicker"><span className="chapter-mark">一</span><span>小沙彌語料圖鑑 / 2026</span></div>
              <h1 id="page-title">把一句好話，<em>放進</em><br />今天的對話裡。</h1>
              <p className="hero-lede">一份給日常使用的向善用語集。沒有說教，只有剛剛好的溫柔，讓每次回覆都多一點餘地。</p>
              <div className="hero-actions">
                <a className="text-link" href="#phrases">開始翻閱 <ArrowUpRight size={16} /></a>
                <span className="hero-rule" />
                <span className="hero-meta">144 句收藏・12 個類別</span>
              </div>
            </div>
            <div className="hero-art-wrap">
              <div className="hero-annotation annotation-top">晨光裡<br />的一句話</div>
              <img className="hero-art" src={heroImage} alt="坐在晨光紙頁旁、手捧蓮花的小沙彌插畫" />
              <div className="hero-seal">善</div>
              <div className="hero-annotation annotation-bottom">編號 01 /<br />留給今天</div>
            </div>
          </section>

          <section className="daily-section" aria-labelledby="daily-heading">
            <div className="daily-card">
              <div className="daily-card-top"><span className="eyebrow">今日一句 / DAILY NOTE</span><span className="daily-date">NO. {String(featuredWord.id).padStart(2, "0")}</span><span className="daily-stamp" aria-hidden="true">善</span></div>
              <div className="daily-card-body">
                <div>
                  <span className="daily-category">{featuredWord.category}</span>
                  <h2 id="daily-heading">「{featuredWord.phrase}」</h2>
                  <p>{featuredWord.context}</p>
                </div>
                <button className="icon-action" type="button" onClick={chooseFeatured} aria-label="換一句今日用語" title="換一句今日用語"><RotateCw size={17} /></button>
              </div>
              <div className="daily-card-foot"><span><Sparkles size={14} /> 小沙彌想說</span><span>把善意放在能抵達的地方。</span></div>
            </div>
            <div className="daily-side-note">
              <img src={kindnessImage} alt="小沙彌端著熱茶的插畫" />
              <p>一句話的重量，<br /><strong>不在音量，在心意。</strong></p>
            </div>
          </section>

          <section className="library-section" id="phrases" aria-labelledby="library-heading">
            <div className="library-header">
              <div>
                <div className="section-kicker"><span className="chapter-mark">二</span><span>向善用語 / 可直接使用</span></div>
                <h2 id="library-heading">選一句，<em>好好說。</em></h2>
              </div>
              <div className="library-tools">
                <label className="search-box">
                  <Search size={17} />
                  <span className="sr-only">搜尋向善用語</span>
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋一句話、情境或動作" />
                  {query && <button type="button" className="clear-search" aria-label="清除搜尋" onClick={() => setQuery("")}><X size={14} /></button>}
                </label>
                <span className="result-count"><SlidersHorizontal size={14} /> {filteredWords.length} 句</span>
              </div>
            </div>

            <div className="active-filter-row">
              <span className="filter-label">目前閱讀</span>
              <span className="active-filter">{activeCategory}</span>
              {query && <span className="search-result-label">搜尋「{query}」</span>}
            </div>

            <div className="phrase-list">
              {filteredWords.map((word, index) => (
                <Fragment key={word.id}>
                  {index > 0 && index % 8 === 0 && (
                    <div className="archive-break" aria-hidden="true">
                      <span className="break-seal">善</span>
                      <span className="break-note">{["把一句話說柔一點", "善意也需要呼吸", "從理解開始"][Math.floor(index / 8) - 1]}</span>
                      <span className="break-line" />
                      <span className="break-index">CH. {String(index / 8 + 1).padStart(2, "0")}</span>
                    </div>
                  )}
                  <article className={`phrase-row accent-${word.color}`}>
                  <div className="phrase-number">{String(index + 1).padStart(2, "0")}</div>
                  <div className="phrase-main">
                    <div className="phrase-topline"><span className="phrase-category">{word.category}</span><span className="phrase-tone">{word.tone}</span></div>
                    <h3>{word.phrase}</h3>
                    <p className="phrase-context">{word.context}</p>
                  </div>
                  <div className="phrase-detail"><span className="detail-label">適合情境</span><p>{word.context}</p></div>
                  <div className="phrase-detail action-detail"><span className="detail-label">Prompt 內容</span><p>{word.action}<br /><span className="effect-text">表情：{word.emotion}・視角：{word.view}<br />特效：{word.effect}</span></p></div>
                  <button className={`copy-button ${copiedId === word.id ? "is-copied" : ""}`} type="button" onClick={() => copyPhrase(word)} aria-label={`複製完整 Prompt：${word.phrase}`}>
                    {copiedId === word.id ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copiedId === word.id ? "已收下" : "複製 Prompt"}</span>
                  </button>
                  </article>
                </Fragment>
              ))}
            </div>

            {filteredWords.length === 0 && (
              <div className="empty-state"><Coffee size={24} /><h3>先歇一歇，換個關鍵字。</h3><p>找不到完全相符的語料，可以試試「溫柔」「休息」或「感謝」。</p><button type="button" onClick={() => { setQuery(""); setActiveCategory("全部語料"); }}>看全部語料</button></div>
            )}
          </section>

          <section className="closing-section">
            <div className="closing-art"><img src={restImage} alt="坐在蒲團上喝茶休息的小沙彌插畫" /></div>
            <div className="closing-copy"><span className="eyebrow">給正在努力的你</span><h2>先照顧好自己，<br /><em>再把溫柔分出去。</em></h2><p>每句話都可以是小小的休息站。願你今天說出口的，也能回到自己身上。</p><a className="text-link" href="#top">回到頁首 <ArrowUpRight size={16} /></a></div>
          </section>
        </main>
      </div>

      <footer className="site-footer"><span className="footer-brand"><img src={logoImage} alt="" />小沙彌向善用語專區</span><span>以一句好話，替今天留一盞燈。</span><span>© 2026 Kind Words Archive</span></footer>
      <div className={`copy-status ${copiedId ? "is-visible" : ""}`} aria-live="polite">{copiedId ? "完整 Prompt 已收進剪貼簿" : ""}</div>
    </div>
  );
}
