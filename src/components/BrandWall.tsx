import { motion } from 'framer-motion'

// ==================== 在此修改品牌墙数据 ====================
interface BrandCategory {
  title: string
  brands: string[]
}

const BRAND_CATEGORIES: BrandCategory[] = [
  {
    title: '甲方品牌',
    brands: ['FMS model', 'PenPen', 'Kingwell', '时代方舟'],
  },
  {
    title: '代理服务品牌',
    brands: ['Vaporesso', 'Elfbar', 'Momcozy', 'OutdoorMaster', 'Jelenew', '微豆体育'],
  },
  {
    title: '媒体合作',
    brands: ['纽约时报', 'WEIRD', 'RCCar Action'],
  },
]
// ============================================================

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

export default function BrandWall() {
  return (
    <section id="brands" className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* 标题 - Grace Ma. 风格 */}
        <motion.div {...fadeInUp} className="mb-16">
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Brand Wall.
          </h2>
        </motion.div>

        {/* 品牌分类展示 */}
        <div className="space-y-12">
          {BRAND_CATEGORIES.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: catIndex * 0.1 }}
            >
              {/* 分类标题 */}
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-6"
                style={{ color: 'var(--text-muted)' }}
              >
                {category.title}
              </h3>

              {/* 品牌列表：flex 居中，flex-wrap，gap-8，rounded-full 标签 */}
              <div className="flex flex-wrap gap-4">
                {category.brands.map((brand) => (
                  <motion.div
                    key={brand}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 px-4 py-2 rounded-full transition-colors duration-300"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {/* 圆形占位 */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'var(--border)' }}
                    >
                      <span
                        className="text-xs font-semibold"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {brand.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    {/* 品牌名称 */}
                    <span
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {brand}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
