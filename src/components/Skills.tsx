import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowUpRight, ArrowLeft } from 'lucide-react'

// ==================== SKILL 数据 ====================
interface SkillProject {
  id: string
  code: string
  name: string
  displayName: string
  githubUrl: string
  websiteUrl?: string
  coreStack: string
  application: string
  tags: string[]
  summary: string
  background: string
  structure: string
  strategy: string
  output: string
}

const SKILL_PROJECTS: SkillProject[] = [
  {
    id: 'sk01',
    code: 'SK01',
    name: 'competitor-research-skill',
    displayName: 'Competitor Research Skill',
    githubUrl: 'https://github.com/Alyssaking666/competitor-research-skill',
    coreStack: 'Python / Data Scraping / Data Viz / FastAPI',
    application: 'Competitor Analysis & Market Tracking',
    tags: ['Python', 'Scrapy', 'Playwright', 'SimilarWeb', 'FastAPI'],
    summary: '深度竞品/品类调研与洞察分析框架，融合横纵分析法、流量起量追踪与全维度月度监测，支持自用版（低预算爬虫驱动）和平台版（API服务化）两种模式。',
    background: '海外品牌推广面临竞争环境多变、多语言多渠道信息割裂的痛点。传统依赖人工手动收集竞品价格、创意广告及活动数据的方式不仅效率低下，且难以抓取完整的历史动态，导致市场洞察严重滞后。本 SKILL 旨在将竞品监测工作系统化、自动化，让决策者能实时掌握竞品动态。',
    structure: '项目由四大核心模块构成：\n\nScraping Engine（爬虫引擎）：支持 Meta 广告爬虫、Reddit 爬虫、通用网页爬虫、SimilarWeb 流量爬虫、社媒内容爬虫，数据源覆盖官网、广告库、社媒、流量平台等维度。\n\nData Cleaner（数据清洗处理器）：对多源爬取数据进行去重、结构化、关联聚合，生成可直接用于对比分析的标准化数据。\n\nReporter（报告生成器）：结合预设维度模板（通用维度 G1-G7、SaaS 维度 S1-S6、品牌维度 B1-B4），自动生成结构化的竞品分析报告。\n\nPlatform Edition（平台版 API）：基于 FastAPI 封装为 Web 服务，支持多用户并发调用，数据存储升级为 PostgreSQL/MongoDB。',
    strategy: '通过 Python 脚本实现分布式自动化爬取，代替繁琐的人工检索。策略上引入四级调研深度：\n\n增量更新（30min-1h, $0）：定期跟踪竞品的关键变化\n\n轻度调研（1-2h, $0）：快速扫描，适合日常监测\n\n深度调研（4-8h, $0-300）：战略决策级分析\n\n全面审计（16-24h, $300-500）：重要客户或尽调场景\n\n支持自用版（月预算 $0-20，本地脚本 + SQLite 存储，输出 Markdown + JSON）和平台版（月预算 $100-500，API 服务化 + 队列处理，输出 PDF 报告）两种模式。',
    output: '系统自动输出全英文《Competitor Landscape & Market Trends Report》（竞品多维对比与市场趋势看板），直观展示竞品定价走势、社媒声量变化、广告创意演进及新品发布动态。同时支持自定义维度组合，输出覆盖指定指标的高定制化洞察报告。',
  },
  {
    id: 'sk02',
    code: 'SK02',
    name: 'reddit-user-insight-skill',
    displayName: 'Reddit User Insight Skill',
    githubUrl: 'https://github.com/Alyssaking666/reddit-user-insight-skill',
    coreStack: 'Python / NLP / Reddit API / Data Analysis',
    application: 'User Insight Mining & Sentiment Analysis',
    tags: ['Python', 'PRAW', 'NLP', 'Pandas', 'SQLite', 'SpaCy'],
    summary: 'Reddit 用户洞察分析工具 v3.0，包含两种分析场景的完整 SOP，细化的情感分析规则与自动化脚本，以及推广/运营/内容策略模块。',
    background: 'Reddit 是北美用户最活跃的真实讨论社区，用户在 Reddit 上的讨论往往是尚未被满足的真实需求的直接反映。然而，海量的帖文与评论中，哪些是真正的机会信号、哪些只是偶然抱怨，难以通过人工逐条阅读来甄别。本 SKILL 旨在系统化地抓取、分析和挖掘 Reddit 中的用户洞察。',
    structure: 'Data Collection（数据采集模块）：基于 PRAW（Reddit API）进行关键词检索，支持按 subreddit、时间范围、热度排序等多维筛选。\n\nSentiment Analyzer（情感分析引擎）：自定义情感词典 + NLTK/SpaCy 规则引擎，将用户评论分类为正面、负面、中性，并提取核心关注点。\n\nIntent Classifier（意图分类器）：将用户帖文分类为信息寻求（求推荐）、经验分享（反馈）、抱怨投诉（痛点）、产品询问（考虑阶段）等类型。\n\nStrategy Mapper（策略映射模块）：将洞察结果直接映射为内容选题、产品改良建议、红人合作方向等行动项。',
    strategy: '基于 Reddit 社群的特点，设定了两种分析场景的 SOP：\n\n场景一（痛点挖掘与需求验证）：围绕目标品类关键词（如 dog supplements、hip dysplasia、probiotics），聚合相关帖文，识别高频抱怨与未满足需求。\n\n场景二（品牌/竞品声量监测）：持续追踪指定品牌或竞品在 Reddit 上的提及频率、情感倾向变化。\n\n情感分析采用"规则优先 + 模型兜底"的轻量化策略——核心情感分类通过自定义词典 + 简单规则引擎完成，适配 Reddit 社区特有的口语化表达（如 "fixed my dog\'s diarrhea"、"waste of money"），避免依赖外部大模型 API 导致的高昂成本。',
    output: '输出全英文《User Insight Report》（用户洞察报告），包含：\n\n核心痛点列表（附频率统计与原文引用）\n\n情感趋势图（正面/中性/负面占比及时序变化）\n\n行动建议卡片（内容选题方向、产品改良建议、红人合作方向）',
  },
  {
    id: 'sk03',
    code: 'SK03',
    name: 'brand-content-engine-new',
    displayName: 'Brand Content Engine',
    githubUrl: 'https://github.com/Alyssaking666/brand-content-engine-new',
    coreStack: 'Coze Agent / Python / Apify / Google Trends API',
    application: 'Social Media Content Pipeline',
    tags: ['Coze Agent', 'Python', 'Apify', 'Google Trends API', 'LLM Prompt Design'],
    summary: '品牌社媒内容全链路引擎，从热门内容监测到选题规划到内容制作，覆盖社媒运营全流程（监测 → 选题 → 制作，一条龙），支持 Coze Agent 编排。',
    background: '品牌社媒运营普遍面临"选题靠感觉、内容不稳定、跨平台难统筹"的困境。尤其在多语言、多时区的海外市场运营中，内容团队的精力往往被大量重复性工作占据，难以聚焦在创意突破上。本 SKILL 旨在将社媒内容生产流程（监测 → 选题 → 制作）自动化与结构化。',
    structure: 'Module 1：trend-radar（热门内容监测）：每日抓取 7 大平台（X/Twitter、Instagram、TikTok、YouTube、Facebook、Reddit、Google Trends）的热门内容，支持 Apify 真实爬虫抓取或搜索降级模式，通过时间范围控制确保"今日热点"的真实时效性。\n\nModule 2：content-planner（每周选题规划）：基于监测数据 + 品牌 Content Pillar，自动生成下周 5 天选题，每个选题明确目标平台、展示形式、对应 Pillar 及文案方向。\n\nModule 3：content-creator（品牌内容制作）：包含五大子模块：\n\nbrand-voice-trainer：品牌调性训练（语气/文案/视觉/视频/禁区）\n\ncopy-writer：7 种文案框架 + 品牌调性规则 + 平台长度约束\n\ngraphic-maker：图文制作（信息图/轮播图/单图/产品图）\n\nvideo-scripter：视频脚本 + 爆款拆解模式\n\npost-formatter：6 平台格式适配 + 发布前终检',
    strategy: '数据驱动：采用 Apify 真实爬虫（配置后）获取精确的互动量、播放量、发布时间，替代传统的"凭感觉选题"。\n\nAgent 编排：在 Coze 中构建 Agent 工作流，通过触发词（如"今日热点"、"下周选题"、"写文案"）调用对应模块，实现半自动化的人机协作。\n\n轻量化部署：支持未配置 Apify 时的降级搜索模式，降低使用门槛，让 SKILL 在预算有限的情况下仍可运行。',
    output: '输出内容包括：\n\n每日热点报告 + 周五周汇总\n\n下周 5 天选题计划（含评分排序）\n\n按品牌调性生成的文案/脚本/图文初稿',
  },
  {
    id: 'sk04',
    code: 'SK04',
    name: 'acg-platform-pro-a',
    displayName: 'ACG Platform Pro',
    githubUrl: 'https://github.com/Alyssaking666/acg-platform-pro-A',
    websiteUrl: 'https://acg-platform-pro-a.vercel.app/',
    coreStack: 'Python / Flask / BeautifulSoup / Vercel',
    application: 'ACG Content Aggregation & AI Copywriting',
    tags: ['Python', 'Flask', 'BeautifulSoup', 'Vercel', 'CrewAI'],
    summary: 'ACG 兴趣聚合平台，可部署到 Vercel，聚合 AO3、Lofter、微博、B站、爱发电等平台内容，支持 AI 文案生成与物料制作，为同人创作者提供一站式内容发现与创作工具。',
    background: 'ACG（动画、漫画、游戏）同人创作生态庞大但分散，创作者需要在 AO3、Lofter、微博、B站等多个平台间跳转寻找灵感与素材，效率低下。同时，应援文案、生日祝福等重复性内容创作消耗大量时间。本项目旨在构建一个聚合搜索 + AI 辅助创作的一站式平台，降低同人创作者的信息获取与内容生产成本。',
    structure: '项目由前端展示层 + Vercel Serverless API 层构成：\n\n前端（frontend/）：纯静态页面，包含首页动态 Typewriter 效果、搜索页多平台聚合结果展示、物料制作页 AI 文案生成与设计平台跳转。\n\nAPI 层（api/）：\n- search.py：聚合搜索入口，整合各平台数据\n- ao3.py / lofter.py / weibo.py / bilibili.py / afdian.py：各平台独立爬虫\n- ai-copy.py：AI 文案生成 API，内置多种文案模板\n\n数据层（data/）：articles.json 包含 150+ 条精选同人文数据，覆盖 188男团、墨香三部曲、热门原耽、真人 CP 等 IP。',
    strategy: '多源聚合策略：本地数据库（150+ 条精选数据）作为稳定基线，实时爬虫作为动态补充。当爬虫因反爬或网络问题失效时，本地数据确保平台仍可正常使用。\n\nAI 文案策略：采用模板 + 规则引擎的轻量化方案，无需调用外部大模型 API，降低成本。内置应援文案、生日祝福、宣传推广、周年纪念四种类型，支持甜美、酷炫、优雅三种风格。\n\n物料制作策略：不直接提供设计功能，而是打通 Canva、稿定设计等第三方平台，通过一键跳转 + 预设模板参数的方式，让创作者快速进入设计环节。',
    output: '平台输出包括：\n\n聚合搜索结果：按平台、类型、热度排序的内容卡片，支持关键词高亮与快速跳转原文。\n\nAI 生成文案：一次生成 3 条备选文案，支持一键复制，可直接用于微博、Lofter、B站动态等平台发布。\n\n物料制作入口：根据选择的物料类型（小卡、海报、手幅、票根）和风格（简约、梦幻、古风、赛博朋克），自动生成 Canva/稿定设计的跳转链接并携带预设模板参数。',
  },
]
// ====================================================

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

// 详情页内容区块（支持换行）
function DetailSection({ title, content }: { title: string; content: string }) {
  if (!content) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 py-8"
      style={{ borderBottom: '1px solid #E5E5E5' }}
    >
      <h4
        className="text-xl md:text-2xl font-bold"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h4>
      <div
        className="text-base leading-relaxed whitespace-pre-line"
        style={{ color: 'var(--text-secondary)' }}
      >
        {content}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<SkillProject | null>(null)

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/Resume_Alyssa_Lai.pdf'
    link.download = 'Resume_Alyssa_Lai.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ===== 详情页 =====
  if (selectedSkill) {
    return (
      <section className="min-h-screen px-6 md:px-12 pt-28 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* 返回按钮 */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelectedSkill(null)}
            className="inline-flex items-center gap-2 mb-10 text-sm font-semibold transition-colors group"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--text-primary)' }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--text-secondary)' }}
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            返回 Skills 列表
          </motion.button>

          {/* 项目编号 + GitHub 链接 */}
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#888888' }}>
                {selectedSkill.code}
              </span>
              <a
                href={selectedSkill.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:opacity-70"
                style={{ color: 'var(--text-secondary)' }}
              >
                GitHub <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          {/* 大标题 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {selectedSkill.name}
          </motion.h1>

          {/* 一句话描述 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg leading-relaxed max-w-2xl mb-10"
            style={{ color: 'var(--text-secondary)' }}
          >
            {selectedSkill.summary}
          </motion.p>

          {/* 双栏：左图片 + 右参数（仅 sk04 有预览图） */}
          {selectedSkill.id === 'sk04' ? (
            <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12 mb-12">
              {/* 左栏：预览截图 */}
              <div className="space-y-4">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                  <img src="/acg-preview.webp" alt="ACG Platform Preview" className="w-full h-full object-cover" />
                </div>
                {selectedSkill.websiteUrl && (
                  <a
                    href={selectedSkill.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 hover:opacity-80"
                    style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg)' }}
                  >
                    Visit Website <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
              {/* 右栏：参数元数据 */}
              <div className="flex flex-col justify-center lg:pl-8">
                <div className="space-y-6">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#888888' }}>PROJECT NAME</span>
                    <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{selectedSkill.name}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#888888' }}>CORE STACK</span>
                    <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{selectedSkill.coreStack}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#888888' }}>APPLICATION</span>
                    <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{selectedSkill.application}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#888888' }}>TECH TAGS</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedSkill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-medium rounded-md"
                          style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* 纯文字排版：sk01-sk03 无预览图 */
            <div className="mb-12 max-w-2xl">
              <div className="space-y-6">
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#888888' }}>PROJECT NAME</span>
                  <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{selectedSkill.name}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#888888' }}>CORE STACK</span>
                  <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{selectedSkill.coreStack}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#888888' }}>APPLICATION</span>
                  <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{selectedSkill.application}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#888888' }}>TECH TAGS</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedSkill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium rounded-md"
                        style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 分隔线 */}
          <div className="mb-4" style={{ borderTop: '1px solid #E5E5E5' }} />

          {/* 下方长文本区块 */}
          <div>
            <DetailSection title="BACKGROUND" content={selectedSkill.background} />
            <DetailSection title="STRUCTURE" content={selectedSkill.structure} />
            <DetailSection title="STRATEGY" content={selectedSkill.strategy} />
            <DetailSection title="OUTPUT" content={selectedSkill.output} />
          </div>

          {/* 底部按钮 */}
          <div className="mt-16 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
              style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg)' }}
            >
              ↑ Back to Top
            </button>
            <button
              onClick={handleDownloadResume}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
            >
              <Download size={16} />
              Download my Resume
            </button>
          </div>
        </div>
      </section>
    )
  }

  // ===== 预览列表页 =====
  return (
    <section className="min-h-screen px-6 md:px-12 pt-28 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* 第一层：总标题 */}
        <motion.div {...fadeInUp} className="mb-16">
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Skills.
          </h2>
          <p
            className="mt-4 text-base max-w-xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            四个自研 GitHub 项目，覆盖竞品研究、用户洞察、内容生成与平台搭建。
          </p>
        </motion.div>

        {/* 第二层：4列卡片预览 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => {
                setSelectedSkill(project)
              }}
              className="group cursor-pointer flex flex-col p-6 rounded-2xl transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              {/* 项目编号 */}
              <span
                className="text-xs font-bold uppercase tracking-widest mb-4 block"
                style={{ color: '#888888' }}
              >
                {project.code}
              </span>

              {/* 项目名称 */}
              <h3
                className="text-lg font-bold mb-2 transition-colors duration-300 group-hover:opacity-70"
                style={{ color: 'var(--text-primary)' }}
              >
                {project.name}
              </h3>

              {/* 描述 */}
              <p
                className="text-sm leading-relaxed mb-4 flex-grow"
                style={{ color: 'var(--text-secondary)' }}
              >
                {project.summary}
              </p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-medium rounded"
                    style={{
                      backgroundColor: 'var(--bg)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 底部：Learn More + GitHub 链接 */}
              <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <span
                  className="text-xs font-semibold transition-colors duration-300 group-hover:opacity-70"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Learn More →
                </span>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs transition-colors hover:opacity-70"
                  style={{ color: 'var(--text-muted)' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub <ArrowUpRight size={10} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ===== 我的思考 ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-20 pt-12"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <h3
            className="text-xl md:text-2xl font-bold tracking-tight mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            My Thoughts on Skills.
          </h3>

          <div className="space-y-5 text-sm leading-relaxed max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
            <p>
              Skill 分类三类：
            </p>
            <div className="space-y-3 pl-4">
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>1. Bot/GPT 型</strong>：比如 GPT Store，卖的是对话入口。
              </p>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>2. Skill/Workflow 型</strong>：比如 Claude Skills、skills.sh，卖的是 Agent 做事方法。
              </p>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>3. Tool/MCP 型</strong>：比如 PulseMCP、Smithery，卖的是 Agent 能调用的工具。
              </p>
            </div>
            <p>
              这里最值得讨论的是"怎么判断一个 skill 真好用"。我理解 skill 不等于微调模型，更像面向具体任务的能力包：提示词/SOP、工具调用、知识约束和评估标准的组合。SkillHub 这种 marketplace 后面最难的不是收录数量，而是质量评价：任务边界是否清楚、输出能否验证、权限是否安全、是否持续维护，以及真实任务完成率怎么样。
            </p>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              我的判断：真正值钱的不是上架更多东西，而是谁能进入真实任务链路。
            </p>
          </div>
        </motion.div>

        {/* 底部按钮 */}
        <div className="mt-16 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
            style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg)' }}
          >
            ↑ Back to Top
          </button>
          <button
            onClick={handleDownloadResume}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
          >
            <Download size={16} />
            Download my Resume
          </button>
        </div>
      </div>
    </section>
  )
}
