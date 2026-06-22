import { motion } from "framer-motion";

// ==================== 在此修改 About 模块文案 ====================
const NAME_LINE1 = "Alyssa Lai.";
const NAME_LINE2 = "Global Brand Strategist.";
const BIO_LINE1 = "华南理工大学科技英语与国际经济与贸易双学位，英语可作为工作语言进行深度谈判与共创。";
const BIO_LINE2 = "具备 5 年品牌全球化 0-1 搭建与业务破局经验。曾作为核心主管，为知名 Agency 从 0 到 1 独立搭建起红人营销、Reddit 精准私域及海外社媒三大核心业务板块。";
const BIO_LINE3 = "深谙数据驱动的营销自动化，擅长管理中美跨国团队，以内容撬动海外声量与商业转化。";

// Highlights 数据
const HIGHLIGHTS = [
  {
    number: "0-1",
    title: "核心业务线孵化",
    desc: "构建红人/私域/Reddit三大板块，助力公司达成千万级",
  },
  {
    number: "3个月",
    title: "品牌与品类破局",
    desc: "主导 PenPen 北美推广，新品上线 3 个月即切入亚马逊宠物补充剂品类头部。",
  },
  {
    number: "1000w+",
    title: "内容流量爆破",
    desc: "纯自然流驱动双平台单视频最高引爆 1000万+ 播放量。",
  },
];
// ================================================================

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-16"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* 自我介绍区域：左头像 + 右文字 */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          {/* 左侧：头像 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-2/5 flex justify-center lg:justify-start"
          >
            <div
              className="w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden avatar-line-container"
            >
              <img
                src="/avatar-new.webp"
                alt="Alyssa Lai"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* 右侧：文字内容 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:w-3/5 flex flex-col justify-center"
          >
            {/* 名字 - 浅灰色大标题 */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight"
              style={{ color: 'var(--text-muted)' }}
            >
              {NAME_LINE1}
            </h1>
            {/* 职位 - 黑色粗体 */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight mt-1 whitespace-nowrap"
              style={{ color: 'var(--text-primary)' }}
            >
              {NAME_LINE2}
            </h2>

            {/* 简介 - 三行 */}
            <div className="mt-8 space-y-3 max-w-xl">
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {BIO_LINE1}
              </p>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {BIO_LINE2}
              </p>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {BIO_LINE3}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Highlights — 横向三栏 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="premium-highlights-section w-full mt-20 md:mt-28"
      >
        <div className="premium-highlights-container">
          {HIGHLIGHTS.map((item, idx) => (
            <motion.div
              key={idx}
              className="premium-stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="card-inner-padding">
                <div className="premium-stat-number">{item.number}</div>
                <div className="premium-stat-title">{item.title}</div>
                <p className="premium-stat-desc">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
