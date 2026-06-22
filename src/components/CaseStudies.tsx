import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Download } from 'lucide-react'

// 全局工具函数
const downloadResume = () => {
  const link = document.createElement('a')
  link.href = '/Resume_Alyssa_Lai.pdf'
  link.download = '赖仕会_海外品牌经理.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// ==================== 在此修改案例研究数据 ====================
interface CaseStudyDetail {
  challenge: string
  strategy: string
  execution: string
  result: string
  retrospective: string
}

interface CaseStudy {
  id: number
  name: string
  brand: string
  summary: string
  role: string
  company: string
  duration: string
  detail: CaseStudyDetail
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    name: 'PenPen宠物品牌从0到1全球化 →',
    brand: 'PenPen（时代方舟）',
    summary: '品牌定位 | 独立站落地 | 社媒内容曝光近1000万',
    role: 'Brand Strategist',
    company: 'PenPen / 时代方舟',
    duration: '2022 — 2023',
    detail: {
      challenge: '北美宠物保健品市场同质化严重，PenPen 零认知度，需要从零建立品牌信任并快速切入市场。',
      strategy: '确立"肠道健康专家"定位，基于竞品与用户洞察规划益生菌为核心爆品，围绕多狗家庭做产品差异化。',
      execution: '建立社媒视觉规范，独立完成独立站架构与文案；协同产品、运营团队快速推进产品上线。',
      result: '品牌体系完整落地，益生菌试用装快速成为类目头部，匹配海外健康喂养趋势。',
      retrospective: '从0到1的品牌建设需要极强的跨部门协同能力，产品差异化策略是快速建立用户信任的关键。后续可进一步优化独立站的转化漏斗。',
    },
  },
  {
    id: 2,
    name: 'Reddit社群运营：1.4w+精准用户增长 →',
    brand: 'PenPen（时代方舟）',
    summary: '1年积累1.4w+用户，周新增400，声量TOP3 | 从0搭建品牌自有发声阵地',
    role: 'Community Manager',
    company: 'PenPen / 时代方舟',
    duration: '2022 — 2023',
    detail: {
      challenge: '宠物主人分散在多个 Subreddit，传统广告转化低，需要低成本建立精准用户池。',
      strategy: '搭建跨账号矩阵（r/askdogowners、r/seniordoghealth 等），用 AI 生成不同角度帖文，建立品牌在社群中的专业形象。',
      execution: '建立发帖 SOP、舆情监测、用户互动机制，将社群内容同步用于 SEO 和 UGC 露出。',
      result: '社群成为品牌核心用户池，直接带动自然流量和口碑转化。',
      retrospective: 'Reddit 社群运营的核心在于"真诚参与"而非"硬广投放"，AI 生成内容需要配合人工审核确保质量。社群资产是长期复用的品牌护城河。',
    },
  },
  {
    id: 3,
    name: 'RC模型新品GTM：1/6 1941 MB Scaler上市 →',
    brand: '广州微豆体育（车模/户外储能）',
    summary: '首周售出1000+台 | 70万社媒覆盖，62万红人曝光 | 《RC Car Action》杂志评测',
    role: 'GTM Marketing Manager',
    company: '广州微豆体育',
    duration: '2023 — 2024',
    detail: {
      challenge: '新品牌多款产品同时上市，需要快速建立渠道声量，在有限的预算内实现最大曝光。',
      strategy: '独立制定每款新品的 GTM 策略，整合 KOL、PR、邮件营销，协同 3 大欧美经销商形成渠道合力。',
      execution: '与美国垂类顶尖杂志 RCCarAction 全链路合作，执行 20+ 线下赛事赞助，建立红人推广标准化机制。',
      result: '单新品社媒曝光超 100w，完成效果监测与闭环复盘，形成可复用的 GTM SOP。',
      retrospective: 'GTM 的成功关键在于"节奏把控"——新品上市的每个阶段都有明确的传播目标和渠道策略。线下赛事赞助对品牌信任度的提升效果远超预期。',
    },
  },
  {
    id: 4,
    name: 'TikTok+Instagram自然流：从0到11万粉丝 →',
    brand: '时代方舟（宠物/助听器）',
    summary: '单视频曝光近1000w  | 教育科普内容撬动算法长尾推流',
    role: 'Content & Social Media Lead',
    company: '时代方舟',
    duration: '2022 — 2023',
    detail: {
      challenge: '预算有限，无法投大量广告，需要靠内容驱动增长，在竞争激烈的宠物赛道脱颖而出。',
      strategy: '搭建 TikTok/Instagram/YouTube 全域内容工厂，建立"选题-制作-发布-复盘"数据驱动模型，持续复制爆款公式。',
      execution: '测试不同内容形式（萌宠日常、科普、开箱），优化标签和发布时间，复制爆款公式。',
      result: '一年内纯自然流涨粉 11w+，多条视频破百万曝光，自然流订单占比过半。',
      retrospective: '内容增长的核心在于"数据驱动迭代"，每条爆款都是大量 A/B 测试的结果。团队 SOP 的建立比个人创意更可持续。',
    },
  },
]
// ================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

// 详情页的内容区块 — 参考截图4：左边大标题，右边文字
function DetailSection({ title, content }: { title: string; content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-16 py-12"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <h4
        className="text-2xl md:text-3xl font-bold leading-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h4>
      <div className="space-y-4">
        <p
          className="text-base leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {content}
        </p>
      </div>
    </motion.div>
  )
}

// ==================== Case 1 画廊式详情页 ====================
function Case1Detail({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState('insight')

  const sections = [
    { id: 'insight', label: 'Insight' },
    { id: 'positioning', label: 'Positioning' },
    { id: 'pivot', label: 'Pivot' },
    { id: 'growth', label: 'Growth' },
    { id: 'impact', label: 'Impact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sectionEls = document.querySelectorAll('.case-gallery-section')
      let current = ''
      sectionEls.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.5) {
          current = el.getAttribute('id') || ''
        }
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="case-studies" className="min-h-screen pt-28 pb-20">
      {/* 返回按钮 */}
      <div className="case-detail-layout">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-10 text-sm font-semibold transition-colors group"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          返回案例列表
        </motion.button>
      </div>

      <div className="case-detail-layout">
        {/* 英文侧边栏 */}
        <aside className="case-detail-sidebar">
          {sections.map((s) => (
            <span
              key={s.id}
              className={`case-nav-link ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </span>
          ))}
        </aside>

        {/* 主内容 */}
        <main className="case-detail-main">
          {/* Hero */}
          <header className="case-hero">
            <div className="case-hero-banner">
              <img src="/case1-banner.jpg" alt="PenPen Banner" />
              <div className="case-hero-overlay">
                <h1>PenPen:<br />Global Brand Growth.</h1>
                <div className="case-hero-meta">
                  <div className="case-meta-item"><span>Role</span><strong>Brand Lead</strong></div>
                  <div className="case-meta-item"><span>Category</span><strong>Pet Health</strong></div>
                  <div className="case-meta-item"><span>Focus</span><strong>0-1 Growth</strong></div>
                </div>
              </div>
            </div>
          </header>

          {/* 01. Insight */}
          <section id="insight" className={`case-gallery-section ${activeSection === 'insight' ? 'active' : ''}`}>
            <span className="case-section-label">01 / Core Insights</span>
            <div className="case-text-block" style={{ maxWidth: '700px' }}>
              <h2>三类洞察交叉验证<br />发现被忽视的战略真空</h2>
            </div>
            <div className="case-gallery-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '0.5rem', alignItems: 'stretch' }}>
              {/* 左侧：三个洞察文字 */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.6rem' }}>
                <div>
                  <h3 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.15rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span style={{ color: '#dc2626', fontWeight: 800 }}>/</span>论坛洞察
                  </h3>
                  <p style={{ fontSize: '0.73rem', lineHeight: '1.45', color: 'var(--text-secondary)' }}>Reddit 养狗社群全年热度最高的话题：狗狗腹泻、呕吐等肠胃问题。用户对补剂关注"有效性、成分安全、性价比"三维度，处于"愿意尝试但缺乏判断标准"的阶段。</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.15rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span style={{ color: '#dc2626', fontWeight: 800 }}>/</span>竞品洞察
                  </h3>
                  <p style={{ fontSize: '0.73rem', lineHeight: '1.45', color: 'var(--text-secondary)' }}>亚马逊头部产品差评高度集中：适口性差（狗狗不吃/吐出来）、产品无效、颗粒太大。现有产品在用户体验层面存在系统性缺陷，未被任何头部品牌解决。</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.15rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span style={{ color: '#dc2626', fontWeight: 800 }}>/</span>大盘洞察
                  </h3>
                  <p style={{ fontSize: '0.73rem', lineHeight: '1.45', color: 'var(--text-secondary)' }}>美国 7100 万养狗家庭中，约 37% 为多狗家庭（1500-2100 万户）。年均宠物开销 $3,000-$8,600，对"大包装/高性价比"产品有明确偏好。</p>
                </div>
              </div>
              {/* 右侧：大配图 */}
              <div className="case-image-box case-no-border" style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden' }}>
                <img src="/case1-amazon.png" alt="Amazon Reviews" className="w-full h-full object-contain" />
              </div>
            </div>
          </section>

          {/* 02. Positioning */}
          <section id="positioning" className={`case-gallery-section ${activeSection === 'positioning' ? 'active' : ''}`}>
            <span className="case-section-label">02 / Strategic Positioning</span>
            <div className="case-gallery-grid" style={{ alignItems: 'stretch' }}>
              <div className="case-image-box case-no-border" style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden' }}>
                <img src="/case1-ingredients.jpg" alt="PenPen Ingredients" className="w-full h-full object-contain" />
              </div>
              <div className="case-text-block" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>从洞察到定位<br />差异化破局</h2>
                <p style={{ fontSize: '0.78rem', lineHeight: '1.5' }}>三层洞察的交集指向同一个战略机会：用户有高频刚需（肠胃焦虑），现有产品有系统缺陷（适口性/颗粒/容量），高价值人群（多狗家庭）未被覆盖。</p>
                <div style={{ marginTop: '0.5rem', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-primary)' }}>品牌定位：狗狗肠胃健康专家 | 核心人群：多狗家庭</p>
                  <table style={{ width: '100%', fontSize: '0.72rem', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)' }}>
                        <th style={{ textAlign: 'left', padding: '0.2rem 0', fontWeight: 600 }}>竞品痛点</th>
                        <th style={{ textAlign: 'left', padding: '0.2rem 0', fontWeight: 600 }}>PenPen 决策</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '0.2rem 0' }}>适口性差，狗狗不吃</td>
                        <td style={{ padding: '0.2rem 0' }}>与狗舍合作测试配方</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '0.2rem 0' }}>颗粒太大，小型犬难吞咽</td>
                        <td style={{ padding: '0.2rem 0' }}>颗粒微型化</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '0.2rem 0' }}>120粒/罐（行业标准）</td>
                        <td style={{ padding: '0.2rem 0' }}>180粒/罐，匹配多狗家庭</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.2rem 0' }}>产品无效，信任缺失</td>
                        <td style={{ padding: '0.2rem 0' }}>提升 CFU，确保功效</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* 03. Pivot */}
          <section id="pivot" className={`case-gallery-section ${activeSection === 'pivot' ? 'active' : ''}`}>
            <span className="case-section-label">03 / Testing & Pivot</span>
            <div className="case-gallery-grid">
              <div className="case-text-block">
                <h2>内容验证定位<br />数据驱动战略锁定</h2>
                <p>品牌定位确立后，通过内容测试进行快速验证：发布与益生菌/肠胃健康相关的教育科普内容（如"狗狗呕吐物颜色预示什么"），TikTok+Instagram 双平台累计播放量突破 <strong>1000万</strong>，用户主动搜索"dog gut health"时 PenPen 内容占据前排。</p>
                <p>搜索数据证明了定位与用户需求之间的匹配度，我们据此将品牌重心正式锁定为"肠胃健康专家"，并将资源持续倾斜至这一方向。</p>
              </div>
              <div className="case-image-box case-no-border" style={{ aspectRatio: '4/3', background: '#fff' }}>
                <img src="/case1-ingredient1.png" alt="PenPen Ingredients" className="w-full h-full object-contain" />
              </div>
            </div>
          </section>

          {/* 04. Growth */}
          <section id="growth" className={`case-gallery-section ${activeSection === 'growth' ? 'active' : ''}`}>
            <span className="case-section-label">04 / Omni-channel Growth</span>
            <div className="case-gallery-grid reverse">
              <div className="case-text-block">
                <h2>多维触达与转化<br />线上线下协同推广</h2>
                <p>我们构建了"线上 SEO+私域问卷"与"线下领养包植入"的双轨制推广体系，让产品在第一时间触达刚需家庭，大幅降低用户决策门槛。</p>
                <ul>
                  <li>围绕核心词做长效 SEO 占位，Reddit 硬核科普引流独立站</li>
                  <li>定制化健康问卷（Quiz）推荐专属补剂方案并捆绑折扣，低成本沉淀私域线索</li>
                  <li>与宠物救助机构合作推出"肠胃健康领养包"，益生菌随犬只领养直接进入家庭</li>
                </ul>
              </div>
              <div className="case-image-box case-no-border" style={{ aspectRatio: '4/3', background: '#fff' }}>
                <img src="/case1-event.jpg" alt="PenPen Event" className="w-full h-full object-contain" />
              </div>
            </div>
          </section>

          {/* 05. Impact */}
          <section id="impact" className={`case-gallery-section ${activeSection === 'impact' ? 'active' : ''}`}>
            <span className="case-section-label">05 / Business Impact</span>
            <div className="case-text-block" style={{ maxWidth: '600px' }}>
              <h2>3个月进入品类头部<br />实现品牌资产沉淀</h2>
              <p>通过 GA 和 Brand Referral Bonus，我们清晰打通了全链路转化路径，实现了自然流订单占比 50% 的高质量增长。</p>
            </div>
            <div className="case-stats-row">
              <div className="case-stat-item">
                <span className="case-stat-val">Top</span>
                <span className="case-stat-lab">Amazon Category Rank</span>
              </div>
              <div className="case-stat-item">
                <span className="case-stat-val">50%</span>
                <span className="case-stat-lab">Organic Order Ratio</span>
              </div>
              <div className="case-stat-item">
                <span className="case-stat-val">10M+</span>
                <span className="case-stat-lab">Social Views</span>
              </div>
            </div>
            <div className="case-image-box case-no-border case-wide-image" style={{ background: '#fff' }}>
              <img src="/case1-products-v2.jpg" alt="PenPen Product Collection" className="w-full h-full object-contain" />
            </div>
          </section>

          {/* 底部：Back to Top + Download Resume */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ padding: '4rem 0 2rem', borderTop: '1px solid var(--border)' }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg)',
                cursor: 'pointer'
              }}
            >
              ↑ Back to Top
            </button>
            <button
              onClick={downloadResume}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                cursor: 'pointer'
              }}
            >
              <Download size={16} />
              Download Resume
            </button>
          </div>

          <footer style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.15em' }}>
            © 2025 ALYSSA LAI. ALL RIGHTS RESERVED.
          </footer>
        </main>
      </div>
    </section>
  )
}

// ==================== Case 2 画廊式详情页 ====================
function Case2Detail({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState('insight')

  const sections = [
    { id: 'insight', label: 'Insight' },
    { id: 'launch', label: 'Launch' },
    { id: 'growth', label: 'Growth' },
    { id: 'impact', label: 'Impact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sectionEls = document.querySelectorAll('.case-gallery-section')
      let current = ''
      sectionEls.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.5) {
          current = el.getAttribute('id') || ''
        }
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="case-studies" className="min-h-screen pt-28 pb-20">
      {/* 返回按钮 */}
      <div className="case-detail-layout">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-10 text-sm font-semibold transition-colors group"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          返回案例列表
        </motion.button>
      </div>

      <div className="case-detail-layout">
        {/* 英文侧边栏 */}
        <aside className="case-detail-sidebar">
          {sections.map((s) => (
            <span
              key={s.id}
              className={`case-nav-link ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </span>
          ))}
        </aside>

        {/* 主内容 */}
        <main className="case-detail-main">
          {/* Hero */}
          <header className="case-hero">
            <div className="case-hero-banner">
              <img src="/case2-banner.jpg" alt="Reddit Community Banner" />
              <div className="case-hero-overlay" style={{ justifyContent: 'flex-end', paddingBottom: '1.5rem' }}>
                <h1>14K Organic Growth<br />– Niche Community Building.</h1>
                <div className="case-hero-meta">
                  <div className="case-meta-item"><span>Role</span><strong>Community Lead</strong></div>
                  <div className="case-meta-item"><span>Platform</span><strong>Reddit</strong></div>
                  <div className="case-meta-item"><span>Focus</span><strong>0-1 Community</strong></div>
                </div>
              </div>
            </div>
          </header>

          {/* 01. Insight */}
          <section id="insight" className={`case-gallery-section ${activeSection === 'insight' ? 'active' : ''}`}>
            <span className="case-section-label">01 / The Challenge</span>
            <div className="case-gallery-grid">
              <div className="case-text-block">
                <h2>冷启动的信任困局<br />与大社群的审查壁垒</h2>
                <p>PenPen 冷启动阶段需要快速建立用户信任与品牌声量。Reddit 是北美养宠用户最活跃的真实评价社区，但大型宠物社群（如 r/dogs、r/dogadvice）对营销内容审查极严，品牌帖极易被删或封禁，无法稳定输出内容。</p>
                <p>品牌需要一个自有、可控、高粘性的社群阵地，用于聚合养狗爱好者、沉淀 UGC 内容、降低对外部社群的依赖。</p>
                <ul>
                  <li>大社群营销内容审查极严，品牌帖易被删除</li>
                  <li>需要自有可控阵地，实现可持续声量增长</li>
                  <li>UGC 内容沉淀为 SEO 和信任背书</li>
                </ul>
              </div>
              <a href="https://www.reddit.com/r/AskDogOwners/" target="_blank" rel="noopener noreferrer" className="case-image-box case-no-border" style={{ aspectRatio: '4/3', background: '#fff', textDecoration: 'none', cursor: 'pointer', position: 'relative' }}>
                <img src="/case2-subreddit-v2.png" alt="Dog Owner Subreddit" className="w-full h-full object-contain" />
                <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.7rem', borderRadius: '6px', background: 'rgb(0 0 0 / 0.7)', fontSize: '0.65rem', color: '#fff', fontWeight: 500 }}>
                  <span>Visit r/AskDogOwners</span>
                  <span>→</span>
                </div>
              </a>
            </div>
          </section>

          {/* 02. Launch */}
          <section id="launch" className={`case-gallery-section ${activeSection === 'launch' ? 'active' : ''}`}>
            <span className="case-section-label">02 / Strategic Launch</span>
            <div className="case-gallery-grid reverse">
              <div className="case-text-block">
                <h2>洞察驱动<br />自建社群冷启动</h2>
                <p>通过抓取 r/dogs、r/dogadvice 等大社群的高热帖文，我们发现用户高频互动内容具备两个特征：高分享性（晒毛孩子）与高价值性（养狗问题互助）。</p>
                <p>创建 r/askdogowner，定位为"面向所有养狗人士的互助社区"——可晒狗、可提问、可分享经验。品牌以"普通养宠者"身份参与，不做硬广。</p>
                <ul>
                  <li><strong>内容策略</strong>：复刻大社群高互动帖文，让算法识别高质量内容</li>
                  <li><strong>爆款 flair</strong>："Name My Dog" 类话题实现高曝光、高互动、高拉新</li>
                  <li><strong>账号矩阵</strong>：官方号+员工号+种子用户号，营造真实社区氛围</li>
                </ul>
              </div>
              <div className="case-image-box case-no-border" style={{ aspectRatio: '4/3', background: '#fff' }}>
                <img src="/case2-flair-v2.png" alt="Name My Dog Flair" className="w-full h-full object-contain" />
              </div>
            </div>
          </section>

          {/* 03. Growth */}
          <section id="growth" className={`case-gallery-section ${activeSection === 'growth' ? 'active' : ''}`}>
            <span className="case-section-label">03 / Deepening Operations</span>
            <div className="case-gallery-grid">
              <div className="case-text-block">
                <h2>专业升级<br />从流量到信任</h2>
                <p>冷启动后，社群进入深化运营阶段。通过 AMA 合作、账号矩阵优化和内容复用，将社群从"流量池"升级为"信任资产"。</p>
                <ul>
                  <li><strong>AMA 合作</strong>：邀请高 Karma 值宠物营养师/兽医进行 AMA，免费提供专业咨询，大幅提升权威性</li>
                  <li><strong>Verified Vet 标签</strong>：为官方账号申请认证标签，增强专业背书</li>
                  <li><strong>内容复用</strong>：高质量问答二次加工为 SEO 长尾词文章及社媒短视频素材</li>
                </ul>
              </div>
              <div className="case-image-box case-no-border" style={{ aspectRatio: '4/3', background: '#fff' }}>
                <img src="/case2-ama.png" alt="AMA Detail" className="w-full h-full object-contain" />
              </div>
            </div>
          </section>

          {/* 04. Impact */}
          <section id="impact" className={`case-gallery-section ${activeSection === 'impact' ? 'active' : ''}`}>
            <span className="case-section-label">04 / Business Impact</span>
            <div className="case-gallery-grid reverse">
              <div className="case-text-block">
                <h2>从0到1.4万<br />Reddit全链路营销方法论</h2>
                <p>社群不仅成为品牌核心用户池，更形成了可复用的 Reddit 全链路营销方法论，直接带动自然流量和口碑转化。</p>
              </div>
              <div className="case-image-box case-no-border" style={{ aspectRatio: '4/3', background: '#fff' }}>
                <img src="/case2-insight-v2.png" alt="Reddit Insight Data" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="case-stats-row">
              <div className="case-stat-item">
                <span className="case-stat-val">14K+</span>
                <span className="case-stat-lab">Community Members</span>
              </div>
              <div className="case-stat-item">
                <span className="case-stat-val">400</span>
                <span className="case-stat-lab">Weekly New Users</span>
              </div>
              <div className="case-stat-item">
                <span className="case-stat-val">60</span>
                <span className="case-stat-lab">Daily Active Online</span>
              </div>
            </div>
            <div className="case-text-block" style={{ maxWidth: '600px', marginTop: '4rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>可复用方法论</h3>
              <ul>
                <li><strong>洞察先行</strong>：抓取大社群高热内容，提炼用户真实互动偏好</li>
                <li><strong>自有阵地</strong>：避开审查严的大社群，自建可控社群</li>
                <li><strong>内容驱动拉新</strong>：复刻已验证的高互动内容，借平台算法冷启动</li>
                <li><strong>专业升级</strong>：通过 AMA 和认证标签提升可信度</li>
                <li><strong>账号矩阵协同</strong>：多账号分层运营，营造真实社区氛围</li>
              </ul>
            </div>
          </section>

          {/* Back to Top + Resume */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '4rem 0 2rem', borderTop: '1px solid var(--border)' }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                cursor: 'pointer'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
              Back to Top
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Download Resume
            </a>
          </div>

          <footer style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.15em' }}>
            © 2025 ALYSSA LAI. ALL RIGHTS RESERVED.
          </footer>
        </main>
      </div>
    </section>
  )
}

// ==================== Case 4 画廊式详情页 ====================
function Case4Detail({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState('insight')

  const sections = [
    { id: 'insight', label: 'Insight' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'execution', label: 'Execution' },
    { id: 'impact', label: 'Impact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sectionEls = document.querySelectorAll('.case-gallery-section')
      let current = ''
      sectionEls.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.5) {
          current = el.getAttribute('id') || ''
        }
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="case-studies" className="min-h-screen pt-28 pb-20">
      {/* 返回按钮 */}
      <div className="case-detail-layout">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-10 text-sm font-semibold transition-colors group"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          返回案例列表
        </motion.button>
      </div>

      <div className="case-detail-layout">
        {/* 英文侧边栏 */}
        <aside className="case-detail-sidebar">
          {sections.map((s) => (
            <span
              key={s.id}
              className={`case-nav-link ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </span>
          ))}
        </aside>

        {/* 主内容 */}
        <main className="case-detail-main">
          {/* Hero */}
          <header className="case-hero">
            <div className="case-hero-banner">
              <img src="/case4-banner-v4.png" alt="Social Media Banner" />
              <div className="case-hero-overlay">
                <h1>Social Media:<br />110K Organic Growth.</h1>
                <div className="case-hero-meta">
                  <div className="case-meta-item"><span>Role</span><strong>Content Strategist</strong></div>
                  <div className="case-meta-item"><span>Platform</span><strong>TikTok + IG</strong></div>
                  <div className="case-meta-item"><span>Focus</span><strong>Natural Traffic</strong></div>
                </div>
              </div>
            </div>
          </header>

          {/* 01. Insight */}
          <section id="insight" className={`case-gallery-section ${activeSection === 'insight' ? 'active' : ''}`}>
            <span className="case-section-label">01 / The Challenge</span>
            <div className="case-gallery-grid">
              <div className="case-text-block">
                <h2>零付费预算<br />宠物赛道破局</h2>
                <p>PenPen 冷启动无付费预算，需在竞争激烈的北美宠物赛道跑通自然流增长模型。初期团队仅 2 人（剪辑+社媒运营），账号从 0 开始。</p>
                <p>目标：先做流量与互动声量，逐步转向品牌官方号。核心挑战：常规起量周期长，需快速验证内容方向，找到可持续复制的爆款逻辑。</p>
                <ul>
                  <li>零付费预算，纯自然流增长</li>
                  <li>团队仅 2 人，资源极度有限</li>
                  <li>需快速验证内容方向与爆款逻辑</li>
                </ul>
              </div>
              <div className="case-image-box case-no-border" style={{ aspectRatio: '4/3', background: '#fff' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', width: '100%', height: '100%', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>2</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>人团队</span>
                  </div>
                  <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>0</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>付费预算</span>
                  </div>
                  <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>0</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>粉丝起步</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 02. Strategy */}
          <section id="strategy" className={`case-gallery-section ${activeSection === 'strategy' ? 'active' : ''}`}>
            <span className="case-section-label">02 / Content Strategy</span>
            <div className="case-gallery-grid reverse">
              <div className="case-text-block">
                <h2>教育科普切入<br />五大内容矩阵</h2>
                <p>经多轮测试，固定为五大内容支柱。周期性 A/B 测试脚本结构、发布时间、Hashtag 组合、画面色调，通过早期数据累积持续迭代。</p>
                <ul>
                  <li><strong>养宠科普</strong>（核心，拉高收藏率）</li>
                  <li><strong>产品宣传</strong>（review/成分拆解/背书）</li>
                  <li><strong>品牌宣传</strong>（线下活动、社区赞助）</li>
                  <li><strong>人宠情感互动</strong>（养宠人共鸣梗）</li>
                  <li><strong>Trending 热点</strong></li>
                </ul>
              </div>
              <div className="case-image-box case-no-border" style={{ aspectRatio: '4/3', background: '#fff' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '0.4rem', width: '100%', height: '100%', padding: '0.5rem' }}>
                  <img src="/case4-mat1.png" alt="Material 1" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  <img src="/case4-mat2.png" alt="Material 2" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  <img src="/case4-mat3.png" alt="Material 3" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  <img src="/case4-mat5.png" alt="Material 5" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  <img src="/case4-mat6.png" alt="Material 6" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  <img src="/case4-mat-new.png" alt="Material New" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
              </div>
            </div>
          </section>

          {/* 03. Execution */}
          <section id="execution" className={`case-gallery-section ${activeSection === 'execution' ? 'active' : ''}`}>
            <span className="case-section-label">03 / Execution</span>
            <div className="case-gallery-grid">
              <div className="case-text-block">
                <h2>爆款突破<br />平台分化运营</h2>
                <p>运营约 4 个月后，一条"狗狗呕吐物颜色对应的症状与解决办法"的硬核科普视频在双平台同步爆发，播放量突破百万，粉丝从不足 100 迅速增至 1 万+。</p>
                <ul>
                  <li><strong>TikTok</strong>：以短视频为主，持续拆解爆款公式，快速复制到其他品线</li>
                  <li><strong>Instagram</strong>：优化 Profile 视觉系统，向品牌号调整；引入 Carousel、Story、Post 等多维形式</li>
                  <li><strong>私域引导</strong>：评论区引导用户留言关键词触发自动回复提供折扣，低成本沉淀核心用户</li>
                </ul>
              </div>
              <div className="case-image-box case-no-border" style={{ aspectRatio: '4/3', background: '#fff' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', width: '100%', height: '100%', padding: '0.75rem' }}>
                  <a href="https://www.instagram.com/penpenpet/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', padding: '0.5rem', borderRadius: '10px', border: '1.5px solid var(--border)', transition: 'all 0.2s', background: 'var(--bg-secondary)' }} className="social-link-card">
                    <img src="/case4-ig-final.png" alt="Instagram" style={{ width: '100%', height: '75%', objectFit: 'contain', borderRadius: '6px' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-primary)' }}>Instagram</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--accent)' }}>@penpenpet →</span>
                    </div>
                  </a>
                  <a href="https://www.tiktok.com/@penpenpet" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', padding: '0.5rem', borderRadius: '10px', border: '1.5px solid var(--border)', transition: 'all 0.2s', background: 'var(--bg-secondary)' }} className="social-link-card">
                    <img src="/case4-tk-final.png" alt="TikTok" style={{ width: '100%', height: '75%', objectFit: 'contain', borderRadius: '6px' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-primary)' }}>TikTok</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--accent)' }}>@penpenpet →</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* 04. Impact */}
          <section id="impact" className={`case-gallery-section ${activeSection === 'impact' ? 'active' : ''}`}>
            <span className="case-section-label">04 / Business Impact</span>
            <div className="case-text-block" style={{ maxWidth: '600px' }}>
              <h2>11万+ 自然流粉丝<br />打通全链路转化</h2>
              <p>通过教育科普内容切入真实焦虑，用高收藏率撬动算法长尾推荐流，成功打通"社媒内容爆破 → 独立站种草 → 亚马逊转化"的外溢路径。</p>
            </div>
            <div className="case-stats-row">
              <div className="case-stat-item">
                <span className="case-stat-val">110K+</span>
                <span className="case-stat-lab">Total Followers</span>
              </div>
              <div className="case-stat-item">
                <span className="case-stat-val">10M+</span>
                <span className="case-stat-lab">Peak Video Views</span>
              </div>
              <div className="case-stat-item">
                <span className="case-stat-val">50%</span>
                <span className="case-stat-lab">Organic Order Ratio</span>
              </div>
            </div>
            <div className="case-text-block" style={{ maxWidth: '600px', marginTop: '4rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>复盘</h3>
              <ul>
                <li><strong>做对了</strong>：教育科普内容切入真实焦虑，用高收藏率撬动算法长尾推荐流；"先做流量再转品牌号"避免早期过度追求调性而牺牲效率；爆款后及时平台分化运营；评论区引导关键词+折扣低成本沉淀私域</li>
                <li><strong>可优化</strong>：爆款视频可同步配合广告投放，放大 Lookalike 相似受众；应更早建立邮件列表（Email List），减少对算法流量的依赖</li>
              </ul>
            </div>
          </section>

          {/* 底部：Back to Top + Download Resume */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ padding: '4rem 0 2rem', borderTop: '1px solid var(--border)' }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg)',
                cursor: 'pointer'
              }}
            >
              ↑ Back to Top
            </button>
            <button
              onClick={downloadResume}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                cursor: 'pointer'
              }}
            >
              <Download size={16} />
              Download Resume
            </button>
          </div>

          <footer style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.15em' }}>
            © 2025 ALYSSA LAI. ALL RIGHTS RESERVED.
          </footer>
        </main>
      </div>
    </section>
  )
}

// ==================== Case 3 画廊式详情页 ====================
function Case3Detail({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState('insight')

  const sections = [
    { id: 'insight', label: 'Insight' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'execution', label: 'Execution' },
    { id: 'impact', label: 'Impact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sectionEls = document.querySelectorAll('.case-gallery-section')
      let current = ''
      sectionEls.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.5) {
          current = el.getAttribute('id') || ''
        }
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="case-studies" className="min-h-screen pt-28 pb-20">
      {/* 返回按钮 */}
      <div className="case-detail-layout">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-10 text-sm font-semibold transition-colors group"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          返回案例列表
        </motion.button>
      </div>

      <div className="case-detail-layout">
        {/* 英文侧边栏 */}
        <aside className="case-detail-sidebar">
          {sections.map((s) => (
            <span
              key={s.id}
              className={`case-nav-link ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </span>
          ))}
        </aside>

        {/* 主内容 */}
        <main className="case-detail-main">
          {/* Hero */}
          <header className="case-hero">
            <div className="case-hero-banner">
              <img src="/case3-banner-v2.png" alt="RC Model GTM Banner" />
              <div className="case-hero-overlay">
                <h1>RC Model GTM:<br />Military Market Entry.</h1>
                <div className="case-hero-meta">
                  <div className="case-meta-item"><span>Role</span><strong>GTM Lead</strong></div>
                  <div className="case-meta-item"><span>Brand</span><strong>ROCHobby</strong></div>
                  <div className="case-meta-item"><span>Focus</span><strong>New Product Launch</strong></div>
                </div>
              </div>
            </div>
          </header>

          {/* 01. Insight */}
          <section id="insight" className={`case-gallery-section ${activeSection === 'insight' ? 'active' : ''}`}>
            <span className="case-section-label">01 / Market Insight</span>
            <div className="case-gallery-grid">
              <div className="case-text-block">
                <h2>从真实车型<br />到军事增量市场</h2>
                <p>ROCHobby 以往车模以真实车型（吉姆尼等）为主，核心用户集中在传统 RC 玩家圈层。为实现破局，品牌希望切入军事爱好者这一高粘性、高购买力的细分增量市场。</p>
                <p>通过全球用户问卷与深度访谈，我们精准捕捉到两大未满足需求：</p>
                <ul>
                  <li><strong>比例断层</strong>：军事兵人收藏界存在庞大的"1/6 比例"发烧友群体，但缺乏能与之搭配且具备越野性能的 RC 军车</li>
                  <li><strong>动态仿真需求</strong>：用户渴望车门可开、内饰考究的同时，兼顾攀爬抓地力</li>
                </ul>
              </div>
              <div className="case-image-box case-no-border" style={{ aspectRatio: '4/3', background: '#fff' }}>
                <img src="/case3-banner-new.png" alt="RC Model Banner" className="w-full h-full object-contain" />
              </div>
            </div>
          </section>

          {/* 02. Strategy */}
          <section id="strategy" className={`case-gallery-section ${activeSection === 'strategy' ? 'active' : ''}`}>
            <span className="case-section-label">02 / GTM Strategy</span>
            <div className="case-gallery-grid reverse">
              <div className="case-text-block">
                <h2>RC 操控 + 兵人收藏<br />交叉领域差异化</h2>
                <p>锁定二战标志性车型 1941 MB Scaler（威利斯吉普），以"RC 操控 + 1/6 兵人静态收藏"的交叉领域作为核心差异化卖点。</p>
                <p>我主导卖点确认、预热期物料筹备，统筹红人、设计、社媒、广告团队落地；与欧美三大经销商协同，确认卖点细节及上市节奏。</p>
                <ul>
                  <li><strong>自有社媒</strong>：YouTube、Facebook、TikTok、Instagram 同步发声</li>
                  <li><strong>红人矩阵</strong>：从资源库定向筛选 15 位垂类达人集中评测</li>
                  <li><strong>顶流媒体</strong>：攻克《RC Car Action》杂志，官网同步露出</li>
                  <li><strong>线下渗透</strong>：赞助美国越野俱乐部赛事，实车场景展示</li>
                </ul>
              </div>
              <div className="case-image-box case-no-border" style={{ aspectRatio: '4/3', background: '#fff' }}>
                <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', width: '100%', height: '100%', padding: '0.5rem' }}>
                  <img src="/case3-yt-v1.png" alt="YT Review 1" style={{ width: '100%', height: '100%', objectFit: 'contain', gridColumn: '1 / -1' }} />
                  <img src="/case3-yt-v2.png" alt="YT Review 2" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  <img src="/case3-yt-v3.png" alt="YT Review 3" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
              </div>
            </div>
          </section>

          {/* 03. Execution */}
          <section id="execution" className={`case-gallery-section ${activeSection === 'execution' ? 'active' : ''}`}>
            <span className="case-section-label">03 / Execution</span>
            <div className="case-gallery-grid">
              <div className="case-text-block">
                <h2>电影级内容<br />全渠道饱和攻击</h2>
                <p>高价采买二战历史影像素材，聘请专业配音师制作电影级宣传片；邀请"古董四驱教父"马大立出镜讲解，强化专业背书。</p>
                <ul>
                  <li><strong>预热期</strong>：社媒悬念剪影 + 红人局部细节曝光</li>
                  <li><strong>爆发期</strong>：宣传片全球发布 + 红人集中评测 + 杂志发文 + 经销商同步上架</li>
                  <li><strong>长尾期</strong>：用户 UGC 激励（晒单/改装大赛）+ 线下赛事持续露出</li>
                </ul>
              </div>
              <div className="case-image-box case-no-border" style={{ aspectRatio: '4/3', background: '#fff' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '0.5rem', width: '100%', height: '100%', padding: '0.5rem' }}>
                  <img src="/case3-old1.png" alt="Old Page 1" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  <img src="/case3-old3.png" alt="Old Page 3" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  <img src="/case3-old4.png" alt="Old Page 4" style={{ width: '100%', height: '100%', objectFit: 'contain', gridColumn: '1 / -1' }} />
                </div>
              </div>
            </div>
          </section>

          {/* 04. Impact */}
          <section id="impact" className={`case-gallery-section ${activeSection === 'impact' ? 'active' : ''}`}>
            <span className="case-section-label">04 / Business Impact</span>
            <div className="case-text-block" style={{ maxWidth: '600px' }}>
              <h2>首周 1000+ 台<br />高客单价小众品类突破</h2>
              <p>通过用户调研先行、不惜成本的内容投入、红人+媒体+经销商+线下赛事全渠道饱和攻击，成功在军事爱好者市场建立品牌心智。</p>
            </div>
            <div className="case-stats-row">
              <div className="case-stat-item">
                <span className="case-stat-val">1000+</span>
                <span className="case-stat-lab">First Week Sales</span>
              </div>
              <div className="case-stat-item">
                <span className="case-stat-val">70w+</span>
                <span className="case-stat-lab">Social Media Reach</span>
              </div>
              <div className="case-stat-item">
                <span className="case-stat-val">62w+</span>
                <span className="case-stat-lab">KOL Exposure</span>
              </div>
            </div>
            <div className="case-text-block" style={{ maxWidth: '600px', marginTop: '4rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>复盘</h3>
              <ul>
                <li><strong>做对了</strong>：用户调研先行，精准定位 1/6 比例与军事爱好者的交叉需求；内容上不惜成本建立"懂发烧友"的品牌心智；全渠道饱和攻击形成合力</li>
                <li><strong>可优化</strong>：后续产品可提前拍摄更多微型素材包，与 Facebook 广告投放更紧密结合</li>
              </ul>
            </div>
          </section>

          {/* 底部：Back to Top + Download Resume */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ padding: '4rem 0 2rem', borderTop: '1px solid var(--border)' }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg)',
                cursor: 'pointer'
              }}
            >
              ↑ Back to Top
            </button>
            <button
              onClick={downloadResume}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                cursor: 'pointer'
              }}
            >
              <Download size={16} />
              Download Resume
            </button>
          </div>

          <footer style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.15em' }}>
            © 2025 ALYSSA LAI. ALL RIGHTS RESERVED.
          </footer>
        </main>
      </div>
    </section>
  )
}

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Case 1 画廊式详情页
  if (selectedCase && selectedCase.id === 1) {
    return <Case1Detail onBack={() => setSelectedCase(null)} />
  }

  // Case 2 画廊式详情页
  if (selectedCase && selectedCase.id === 2) {
    return <Case2Detail onBack={() => setSelectedCase(null)} />
  }

  // Case 3 画廊式详情页
  if (selectedCase && selectedCase.id === 3) {
    return <Case3Detail onBack={() => setSelectedCase(null)} />
  }

  // Case 4 画廊式详情页
  if (selectedCase && selectedCase.id === 4) {
    return <Case4Detail onBack={() => setSelectedCase(null)} />
  }

  // 详情页
  if (selectedCase) {
    return (
      <section id="case-studies" className="min-h-screen px-6 md:px-12 pt-28 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* 返回按钮 */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelectedCase(null)}
            className="inline-flex items-center gap-2 mb-10 text-sm font-semibold transition-colors group"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = 'var(--text-primary)'
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = 'var(--text-secondary)'
            }}
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            返回案例列表
          </motion.button>

          {/* Banner 图 — 与列表卡片中的图片保持一致 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-12"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            {selectedCase.id === 1 ? (
              <img src="/case1-banner.jpg" alt="PenPen Banner" className="w-full h-full object-cover" />
            ) : selectedCase.id === 2 ? (
              <img src="/case2-banner.jpg" alt="Reddit Community Banner" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Banner Image
                </span>
              </div>
            )}
          </motion.div>

          {/* 大标题 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]"
            style={{ color: 'var(--text-primary)' }}
          >
            {selectedCase.name}
          </motion.h1>

          {/* 一句话描述 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg leading-relaxed max-w-2xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            {selectedCase.summary}
          </motion.p>

          {/* Role / Company / Duration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--text-muted)' }}>
                Role
              </span>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {selectedCase.role}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--text-muted)' }}>
                Company
              </span>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {selectedCase.company}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--text-muted)' }}>
                Duration
              </span>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {selectedCase.duration}
              </span>
            </div>
          </motion.div>

          {/* 分隔线 */}
          <div className="my-12" style={{ borderTop: '1px solid var(--border)' }} />

          {/* 内容区块：挑战、策略、执行、结果、复盘 — 参考截图4风格 */}
          <div>
            <DetailSection title="挑战" content={selectedCase.detail.challenge} />
            <DetailSection title="策略" content={selectedCase.detail.strategy} />
            <DetailSection title="执行" content={selectedCase.detail.execution} />
            <DetailSection title="结果" content={selectedCase.detail.result} />
            <DetailSection title="复盘" content={selectedCase.detail.retrospective} />
          </div>

          {/* 底部：Back to Top + Download Resume */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ padding: '4rem 0 2rem', borderTop: '1px solid var(--border)' }}>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg)',
                cursor: 'pointer'
              }}
            >
              ↑ Back to Top
            </button>
            <button
              onClick={downloadResume}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                cursor: 'pointer'
              }}
            >
              <Download size={16} />
              Download Resume
            </button>
          </div>
        </div>
      </section>
    )
  }

  // 案例列表页 — 参考截图2风格：大图+标签+标题+描述
  return (
    <section id="case-studies" className="min-h-screen px-6 md:px-12 pt-28 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* 总标题 */}
        <motion.div {...fadeInUp} className="mb-16">
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Case Studies.
          </h2>
          <p
            className="mt-4 text-base max-w-xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            精选品牌战略、社群运营、内容增长与 GTM 营销案例。
          </p>
        </motion.div>

        {/* 2列网格卡片 — 参考截图风格：标签+标题箭头+描述+大图 */}
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
          {CASE_STUDIES.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedCase(caseItem)}
              className="group cursor-pointer flex flex-col"
            >
              {/* 文字内容区 — 固定高度保证对齐 */}
              <div className="mb-5">
                {/* 标签 */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="inline-block px-3 py-1 text-xs font-medium rounded-md"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {caseItem.brand}
                  </span>
                </div>

                {/* 案例名称 + 箭头 */}
                <h3
                  className="text-xl md:text-2xl font-bold mb-2 flex items-center gap-2 transition-colors duration-300 group-hover:opacity-70"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {caseItem.name}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </h3>

                {/* 核心数据摘要 */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {caseItem.summary}
                </p>
              </div>

              {/* 卡片图片区域 — 大图在下方，固定比例 */}
              <div
                className="w-full aspect-[16/10] rounded-2xl overflow-hidden transition-all duration-300 mt-auto"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                {caseItem.id === 1 ? (
                  <img src="/case1-banner.jpg" alt="PenPen Banner" className="w-full h-full object-cover" />
                ) : caseItem.id === 2 ? (
                  <img src="/case2-banner.jpg" alt="Reddit Community Banner" className="w-full h-full object-cover" />
                ) : caseItem.id === 3 ? (
                  <img src="/case3-banner-v2.png" alt="RC Model GTM Banner" className="w-full h-full object-cover" />
                ) : caseItem.id === 4 ? (
                  <img src="/case4-banner-v4.png" alt="Social Media Banner" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      Banner Image
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
