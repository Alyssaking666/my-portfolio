import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon } from 'lucide-react'

// ==================== 在此修改导航文案 ====================
const NAV_ITEMS = [
  { label: 'ABOUT', path: '/' },
  { label: 'CASE', path: '/case' },
  { label: 'SKILLS', path: '/skills' },
  { label: 'FUN', path: '/fun' },
]
// ==========================================================

// 主题切换开关组件 - 参考 Grace Ma.
function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative w-12 h-6 rounded-full transition-colors duration-300 flex items-center"
      style={{
        backgroundColor: isDark ? 'var(--text-primary)' : 'var(--border)',
      }}
      aria-label="切换主题"
    >
      <motion.div
        className="w-5 h-5 rounded-full shadow-sm"
        style={{
          backgroundColor: isDark ? '#101010' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
        }}
        animate={{
          x: isDark ? 26 : 2,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  )
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 路由切换时滚动到顶部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  // 日夜模式切换
  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark')
  }

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false)
    navigate(path)
  }

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? 'var(--bg)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          {/* 左侧：Logo + 日夜切换开关 */}
          <div className="flex items-center gap-4">
            <a
              onClick={() => handleNavClick('/')}
              className="text-xl font-semibold tracking-tight cursor-pointer"
              style={{ color: 'var(--text-primary)' }}
            >
              Alyssa.
            </a>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <Moon
              size={16}
              className="transition-colors duration-300"
              style={{ color: isDark ? 'var(--text-primary)' : 'var(--text-muted)' }}
            />
          </div>

          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className="text-sm font-semibold transition-colors duration-300 relative group cursor-pointer"
                style={{ color: isActive(item.path) ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = 'var(--text-primary)'
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    (e.target as HTMLElement).style.color = 'var(--text-secondary)'
                  }
                }}
              >
                {item.label}
                {/* 悬停/激活下划线动画 */}
                <span
                  className="absolute -bottom-1 left-0 h-[1.5px] transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--text-primary)',
                    width: isActive(item.path) ? '100%' : undefined,
                  }}
                  />
                <span
                  className="absolute -bottom-1 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: 'var(--text-primary)' }}
                />
              </a>
            ))}
          </div>

          {/* 移动端汉堡菜单按钮 */}
          <button
            className="md:hidden p-2"
            style={{ color: 'var(--text-primary)' }}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="打开菜单"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* 移动端菜单 (Sheet) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* 遮罩层 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 md:hidden"
              style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* 侧边栏 */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-50 md:hidden shadow-xl"
              style={{ backgroundColor: 'var(--bg)' }}
            >
              <div className="p-6">
                {/* 关闭按钮 */}
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2"
                    style={{ color: 'var(--text-primary)' }}
                    aria-label="关闭菜单"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* 导航链接 */}
                <div className="flex flex-col gap-6">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.a
                      key={item.path}
                      onClick={() => handleNavClick(item.path)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-lg font-semibold transition-colors cursor-pointer"
                      style={{ color: isActive(item.path) ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
