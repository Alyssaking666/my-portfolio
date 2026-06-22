import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

const LISTENING = [
  { name: '不易', artist: '呓语', img: '/album-yiyu.jpg' },
  { name: '打上花火', artist: '米津玄师', img: '/album-dahuahuo.jpg' },
  { name: 'Swag', artist: 'Miyauchi', img: '/album-swag.jpg' },
  { name: '神のまにまに', artist: 'れるりり', img: '/fun-1.jpg' },
]

const WATCHING = [
  { name: '咒术回战', img: '/watch-zhoushuhuizhan.jpg' },
  { name: '情书', img: '/watch-qingshu.jpg' },
  { name: '钻石王牌', img: '/watch-zuanshiwangpai.jpg' },
  { name: '蓝色大门', img: '/watch-lansedamen.jpg' },
  { name: '还有明天', img: '/watch-haiyoumingtian.jpg' },
]

const PHOTOS = ['/fun-1.jpg', '/fun-2.jpg', '/fun-3.jpg', '/fun-4.jpg']

export default function Fun() {
  const [showGallery, setShowGallery] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

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

  return (
    <section className="min-h-screen px-6 md:px-12 pt-28 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* ===== 自我介绍：左文右图 ===== */}
        <motion.div {...fadeInUp} className="mb-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* 左侧：文字 */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-2"
                style={{ color: 'var(--text-muted)' }}
              >
                Hey there,
              </h2>
              <h3
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-8"
                style={{ color: 'var(--text-primary)' }}
              >
                I'm Alyssa.
              </h3>

              <div className="space-y-4 text-sm leading-relaxed max-w-md" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  我从外教招聘转身离开的时候，并不知道自己要去哪里。只是隐约觉得，比起帮别人找到岗位，我更想亲手搭建一座桥——一座让品牌和用户能够真正信任彼此的桥。
                </p>
                <p>
                  第一份营销工作，是在一家做 RC 模型的甲方公司。我像闯进了一片陌生的森林：红人、赛事、杂志、GTM……每一棵树都不同，我慢慢摸清了海外营销的地形。实习期带我的前辈教了我两件事：Be professional, Be responsible。这句话我记到现在，受益匪浅。
                </p>
                <p>
                  后来到了深圳，一头扎进出海品牌的整合营销世界。电子烟、户外运动、母婴、美妆、储能……品类像潮水一样涌来。我从零开始建红人库，在 Discord 和 WhatsApp 里守到深夜，跟着 Twitch 直播的弹幕学年轻人的语言，在 Reddit 的各个角落悄悄搭账号、试探用户的真实反应。那时候经常觉得自己是站在岸上的人，潮水一来，湿了一身，但也看清了方向。
                </p>
                <p>
                  再后来，在时代方舟，我终于有机会从零开始做一个品牌。那些散落在各处的经验，像珠子一样被穿成了线。我知道，桥可以搭起来了。
                </p>
                <p>
                  这个世界常被调侃成草台班子。我懂。但我相信，总有人愿意在班子里认认真真地打磨自己，让自己变得靠谱、踏实，做出一点实实在在的东西。我想成为那样的人，也想和那样的人一起，做些有趣的事。
                </p>
                <p>
                  营销变得很快，打法几年就换一轮。我们都是新手，都是学生。好在我们是愿意持续学习的那一类人。
                </p>
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  我们在同一条河流，逆流而上。
                </p>
              </div>

              {/* Resume 下载 */}
              <div className="mt-8">
                <a
                  href="/Resume_Alyssa_Lai.pdf"
                  download
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-70"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <Download size={16} />
                  Resume
                </a>
              </div>
            </div>

            {/* 右侧：扇子堆叠图片 - 可逐张展开 */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end lg:items-center">
              <div className="relative" style={{ height: '520px', width: '480px' }}>
                {PHOTOS.map((src, i) => {
                  const isExpanded = expandedIndex === i
                  const isCollapsed = expandedIndex !== null && expandedIndex !== i
                  return (
                    <motion.div
                      key={src}
                      className="absolute cursor-pointer"
                      style={{ left: '50%', top: '50%' }}
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                      animate={{
                        x: isExpanded ? '-50%' : '-50%',
                        y: isExpanded ? '-50%' : '-50%',
                        marginLeft: isExpanded ? 0 : i * 32,
                        marginTop: isExpanded ? 0 : i * 10,
                        rotate: isExpanded ? 0 : (i - 1.5) * 4,
                        scale: isExpanded ? 1.06 : isCollapsed ? 0.93 : 1,
                        zIndex: isExpanded ? 20 : 10 - i,
                        opacity: isCollapsed ? 0.3 : 1,
                      }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      whileHover={{ scale: isExpanded ? 1.06 : 1.03 }}
                    >
                      <div
                        className="w-72 h-96 md:w-80 md:h-[28rem] rounded-2xl overflow-hidden shadow-lg"
                        style={{ border: '2px solid var(--border)' }}
                      >
                        <img
                          src={src}
                          alt={`photo-${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  )
                })}
                {/* 展开提示 */}
                {expandedIndex === null && (
                  <motion.div
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        color: '#101010',
                      }}
                    >
                      点击展开
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== What I'm listening to ===== */}
        <motion.div {...fadeInUp} className="mb-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* 左侧文字 */}
            <div className="lg:w-2/5">
              <h3
                className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                What I'm listening to.
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                不易 by 呓语, 打上花火 by 米津玄师, Swag by Miyauchi, 神のまにまに by れるりり
              </p>
            </div>
            {/* 右侧图片网格 */}
            <div className="lg:w-3/5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {LISTENING.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group"
                  >
                    <div
                      className="aspect-square rounded-xl overflow-hidden mb-2"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                      {item.name}
                    </p>
                    <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      {item.artist}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== What I'm watching ===== */}
        <motion.div {...fadeInUp} className="mb-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* 左侧文字 */}
            <div className="lg:w-2/5">
              <h3
                className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                What I'm watching.
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                咒术回战, 情书, 钻石王牌, 蓝色大门, 还有明天
              </p>
            </div>
            {/* 右侧图片网格 */}
            <div className="lg:w-3/5">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {WATCHING.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group"
                  >
                    <div
                      className="aspect-[3/4] rounded-xl overflow-hidden mb-2"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                      {item.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== 底部按钮 ===== */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
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

      {/* ===== 图片展开全屏画廊 ===== */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
            onClick={() => setShowGallery(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 关闭按钮 */}
              <button
                onClick={() => setShowGallery(false)}
                className="absolute -top-12 right-0 text-white hover:opacity-70 transition-opacity"
              >
                <X size={28} />
              </button>

              {/* 图片网格 */}
              <div className="grid grid-cols-2 gap-3">
                {PHOTOS.map((src, i) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-square rounded-xl overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`photo-${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
