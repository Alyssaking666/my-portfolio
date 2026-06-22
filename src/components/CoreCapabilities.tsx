import { useState } from 'react'
import { motion } from 'framer-motion'

// ==================== 核心能力卡片数据 ====================
interface Capability {
  title: string
  keywords: string[]
  evidence: string
}

const CAPABILITIES: Capability[] = [
  {
    title: '品牌战略与资产建设',
    keywords: [
      '0-1 全球化品牌体系构建',
      '品牌数字化资产长效沉淀',
      '海外产品线全生命周期规划',
    ],
    evidence: '品牌定位体系 | 独立站0-1架构 | 3条核心产品线',
  },
  {
    title: '整合营销与增长',
    keywords: [
      '红人营销与海外社媒内容增长',
      'Reddit 深度社群生态拓展',
      '全域私域流量与全链路开拓',
    ],
    evidence: '1.4w+Reddit用户 | 11w+粉丝 | 1000w曝光',
  },
  {
    title: '跨文化协同与项目管理',
    keywords: [
      '中英双语跨国团队效能管理',
      '海外顶流垂媒内容深度建联',
      '多部门跨国协同与项目交付',
    ],
    evidence: '10人中美团队 | 120家MCN | 20+线下赛事',
  },
  {
    title: 'GTM与新品整合营销',
    keywords: [
      '全渠道新品 GTM 策略制定',
      '全球达人分级管理机制建立',
      '全链路效果监测与数据复盘',
    ],
    evidence: '单新品曝光100w+ | 超行业均值20% | 可复用SOP',
  },
]
// =================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

// 单个卡片组件
function CapabilityCard({
  cap,
  index,
  hoveredIndex,
  setHoveredIndex,
}: {
  cap: Capability
  index: number
  hoveredIndex: number | null
  setHoveredIndex: (i: number | null) => void
}) {
  const isHovered = hoveredIndex === index
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
      className="capability-card"
      style={{
        opacity: isOtherHovered ? 0.35 : 1,
        transition: 'opacity 0.4s ease',
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* 标题 — 左侧带纯黑小方块 */}
      <h3 className="capability-card-title">{cap.title}</h3>

      {/* 关键词列表 */}
      <ul className="capability-card-list">
        {cap.keywords.map((kw, i) => (
          <motion.li
            key={i}
            animate={{
              x: isHovered ? 4 : 0,
            }}
            transition={{ duration: 0.3, delay: i * 0.04, ease: 'easeOut' }}
          >
            {kw}
          </motion.li>
        ))}
      </ul>

      {/* 底部数据栏 */}
      <div className="capability-evidence">
        <p>{cap.evidence}</p>
      </div>
    </motion.div>
  )
}

export default function CoreCapabilities() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="works" className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <motion.div {...fadeInUp} className="mb-16">
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Core Capabilities.
          </h2>
        </motion.div>

        {/* 卡片网格 */}
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          {CAPABILITIES.map((cap, index) => (
            <CapabilityCard
              key={cap.title}
              cap={cap}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
