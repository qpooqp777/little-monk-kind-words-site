/* Design philosophy: 寺院晨光紙本 — Neo-Mingei editorial layout, warm paper, ink navy, vermilion seal accents, and quiet utility-first motion. */
import { Fragment, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpenText,
  Check,
  Coffee,
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
  { name: "全部語料", count: 32 },
  { name: "慈悲", count: 4 },
  { name: "感恩", count: 4 },
  { name: "包容", count: 4 },
  { name: "鼓勵", count: 4 },
  { name: "安定", count: 4 },
  { name: "自省", count: 4 },
  { name: "和善", count: 4 },
  { name: "善行", count: 4 },
];

type KindWord = {
  id: number;
  category: string;
  phrase: string;
  context: string;
  action: string;
  effect: string;
  tone: string;
  color: string;
};

const kindWords: KindWord[] = [
  { id: 1, category: "慈悲", phrase: "心存善念", context: "提醒自己在忙亂或分歧裡，保留一點善意。", action: "小沙彌雙手合十，胸前護著一朵蓮花。", effect: "蓮花、柔和光線", tone: "溫柔提醒", color: "vermilion" },
  { id: 2, category: "慈悲", phrase: "溫柔一點", context: "對話變得尖銳時，邀請彼此放慢語氣。", action: "小沙彌張開雙手，像替對話留出空間。", effect: "圓形光暈、細小花瓣", tone: "輕聲勸和", color: "lavender" },
  { id: 3, category: "慈悲", phrase: "先聽聽看", context: "還不了解完整情況時，不急著下結論。", action: "小沙彌側耳傾聽，身旁浮著柔和音波線。", effect: "音波線、小耳朵線稿", tone: "耐心陪伴", color: "gold" },
  { id: 4, category: "慈悲", phrase: "給彼此一點時間", context: "衝突後先冷靜，讓情緒有回到平衡的餘地。", action: "小沙彌坐在蒲團上，安靜守著一只小沙漏。", effect: "沙漏、慢慢飄動的雲", tone: "留白與等待", color: "sage" },
  { id: 5, category: "感恩", phrase: "感恩有你", context: "收到陪伴、協助或一句及時的關心。", action: "小沙彌微微鞠躬，雙手捧著蓮花。", effect: "蓮花、手繪光點", tone: "真誠謝意", color: "vermilion" },
  { id: 6, category: "感恩", phrase: "謝謝你的善意", context: "想把對方的小小好意，清楚地接住並回應。", action: "小沙彌雙手接過一盞小燈，露出安心微笑。", effect: "小燈、溫暖光線", tone: "鄭重而輕盈", color: "gold" },
  { id: 7, category: "感恩", phrase: "一切都是幫助", context: "回望一段不容易的經驗，找到可以帶走的學習。", action: "小沙彌蹲在小樹苗旁，替它澆水。", effect: "嫩葉、水滴", tone: "平靜轉念", color: "sage" },
  { id: 8, category: "感恩", phrase: "今天也值得感謝", context: "每天給自己一個溫柔的收尾，不只計算完成了什麼。", action: "小沙彌捧茶坐在晨光裡，身旁放著小日記。", effect: "茶湯熱氣、晨光", tone: "日常祝福", color: "peach" },
  { id: 9, category: "包容", phrase: "沒關係，慢慢來", context: "朋友犯錯、焦慮或進度暫時跟不上時。", action: "小沙彌揮揮手，示意不用急著道歉。", effect: "雲朵、舒緩線條", tone: "安撫接住", color: "lavender" },
  { id: 10, category: "包容", phrase: "我們再試一次", context: "第一次沒有成功，但仍願意和對方一起重新開始。", action: "小沙彌捲起袖子，握著一面小旗子往前走。", effect: "小旗子、短促加油線", tone: "並肩重來", color: "vermilion" },
  { id: 11, category: "包容", phrase: "願你被溫柔對待", context: "想關心正在疲憊、受傷或承受壓力的人。", action: "小沙彌把蓮花遞向畫面前方，眼神安定。", effect: "蓮花、圓形光暈", tone: "深度關懷", color: "peach" },
  { id: 12, category: "包容", phrase: "不急著下定論", context: "面對誤會或爭議，先保留理解的空間。", action: "小沙彌舉起手掌做出暫停手勢。", effect: "平衡線、兩朵未合上的花", tone: "溫和提醒", color: "ink" },
  { id: 13, category: "鼓勵", phrase: "慢慢來就好", context: "事情很多、心裡很急，或需要重新找回節奏時。", action: "小沙彌坐在雲朵上喝茶，腳邊放著小木魚。", effect: "雲朵、茶杯熱氣", tone: "放慢腳步", color: "gold" },
  { id: 14, category: "鼓勵", phrase: "你已經很努力了", context: "肯定一段不一定被看見，但確實存在的付出。", action: "小沙彌伸手拍拍畫面前方，露出鼓勵微笑。", effect: "小星星、溫暖線條", tone: "真心肯定", color: "vermilion" },
  { id: 15, category: "鼓勵", phrase: "一步一步來", context: "面對複雜任務或漫長目標，提醒自己只走下一步。", action: "小沙彌沿著小石階向上走，回頭比出加油手勢。", effect: "小石階、腳步線", tone: "穩定前進", color: "sage" },
  { id: 16, category: "鼓勵", phrase: "保持初心", context: "選擇變多或受到外在聲音影響時，重新確認在乎的事。", action: "小沙彌雙手護著胸前的小蓮花。", effect: "蓮花、細緻光暈", tone: "安靜堅定", color: "lavender" },
  { id: 17, category: "安定", phrase: "先讓心靜下來", context: "生氣、焦慮或訊息太多時，先把注意力帶回自己。", action: "小沙彌盤腿打坐，雙手放在膝上。", effect: "平靜圓線、兩片葉子", tone: "安定呼吸", color: "ink" },
  { id: 18, category: "安定", phrase: "平安就好", context: "關心對方今天過得如何，或在忙碌後互相報一聲平安。", action: "小沙彌雙手合十，露出安心的笑。", effect: "平安光圈、小蓮花", tone: "簡單祝福", color: "gold" },
  { id: 19, category: "安定", phrase: "呼吸一下", context: "工作、學習或生活壓力湧上來時，提醒先停半拍。", action: "小沙彌緩慢吸氣，衣袖隨風輕輕飄動。", effect: "氣流線、葉片", tone: "短暫停靠", color: "sage" },
  { id: 20, category: "安定", phrase: "事情會慢慢好起來", context: "陪伴正在低潮中的人，但不替對方保證結果。", action: "小沙彌站在小樹旁，看著雲後的晨光。", effect: "小樹、晨光線", tone: "不過度承諾", color: "peach" },
  { id: 21, category: "自省", phrase: "先照顧好自己", context: "提醒忙著照顧別人或工作的自己，休息也是重要的事。", action: "小沙彌抱著熱茶，蓋上一條小毯子。", effect: "茶杯、柔軟小雲", tone: "自我關懷", color: "peach" },
  { id: 22, category: "自省", phrase: "今天比昨天更好", context: "把注意力放在自己的微小進步，而不是和別人比較。", action: "小沙彌在小日曆上畫下一個手繪勾。", effect: "日曆、上升小線條", tone: "溫和成長", color: "vermilion" },
  { id: 23, category: "自省", phrase: "有錯就改", context: "願意承認失誤、修正方法並繼續前進。", action: "小沙彌擦掉黑板上的錯誤圖案，重新寫下簡單符號。", effect: "橡皮擦屑、小光點", tone: "負責而不苛責", color: "ink" },
  { id: 24, category: "自省", phrase: "保持謙虛", context: "完成一件事或收到稱讚時，把功勞也留給一起努力的人。", action: "小沙彌害羞鞠躬，手邊有一朵小蓮花。", effect: "蓮花、細小弧線", tone: "謙和收下", color: "lavender" },
  { id: 25, category: "和善", phrase: "好好說話", context: "提醒自己即使不同意，也可以保留對人的尊重。", action: "小沙彌雙手向前，像把尖銳的話放柔。", effect: "對話線、圓角音波", tone: "清楚而尊重", color: "vermilion" },
  { id: 26, category: "和善", phrase: "先謝謝，再溝通", context: "面對不同意見時，先承認對方的投入再討論內容。", action: "小沙彌端茶給對話另一端，身旁有兩朵蓮花。", effect: "茶杯、雙蓮花", tone: "搭橋而非對抗", color: "gold" },
  { id: 27, category: "和善", phrase: "願我們都被理解", context: "誤會還沒解開，想表達願意靠近彼此的心情。", action: "小沙彌讓兩個對話泡泡慢慢靠近。", effect: "對話泡泡、柔和連線", tone: "共同靠近", color: "peach" },
  { id: 28, category: "和善", phrase: "留一點餘地", context: "不把話說死，也不把一次失誤定義成全部。", action: "小沙彌在分岔路口放下一朵蓮花。", effect: "路線、蓮花標記", tone: "保留可能", color: "sage" },
  { id: 29, category: "善行", phrase: "今天做件好事", context: "邀請自己從一件小小且可做到的善意開始。", action: "小沙彌彎腰替小樹苗澆水。", effect: "水滴、嫩芽", tone: "行動邀請", color: "sage" },
  { id: 30, category: "善行", phrase: "能幫就幫", context: "看到身邊的人需要一點支援時，主動伸手但不勉強。", action: "小沙彌伸手扶起一只小箱子。", effect: "小箱子、支援線", tone: "量力互助", color: "vermilion" },
  { id: 31, category: "善行", phrase: "分享一點溫暖", context: "想把一杯茶、一句話或一點時間分享給身邊的人。", action: "小沙彌把熱茶與蓮花送向畫面前方。", effect: "熱氣、蓮花、圓光", tone: "慷慨但不打擾", color: "gold" },
  { id: 32, category: "善行", phrase: "善意會留下", context: "鼓勵持續做對的事，即使沒有立刻得到回應。", action: "小沙彌播下一顆種子，身旁冒出新芽。", effect: "種子、嫩芽、細小光點", tone: "溫柔長期主義", color: "lavender" },
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

  const copyPhrase = async (word: KindWord) => {
    try {
      await navigator.clipboard.writeText(word.phrase);
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
          <div className="rail-heading"><span className="eyebrow">語料索引</span><span className="rail-count">08 章</span></div>
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
                <span className="hero-meta">32 句收藏・08 個類別</span>
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
                  <div className="phrase-detail action-detail"><span className="detail-label">小沙彌動作與手繪特效</span><p>{word.action}<br /><span className="effect-text">{word.effect}</span></p></div>
                  <button className={`copy-button ${copiedId === word.id ? "is-copied" : ""}`} type="button" onClick={() => copyPhrase(word)} aria-label={`複製：${word.phrase}`}>
                    {copiedId === word.id ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copiedId === word.id ? "已收下" : "複製"}</span>
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
      <div className={`copy-status ${copiedId ? "is-visible" : ""}`} aria-live="polite">{copiedId ? "這句話已收進剪貼簿" : ""}</div>
    </div>
  );
}
