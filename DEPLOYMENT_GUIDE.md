# 网站部署与 CMS 配置指南

## 一、部署到 Vercel

### 1. 准备工作
- 确保代码已推送到 GitHub 仓库：`Alyssaking666/my-portfolio`
- 注册 [Vercel](https://vercel.com) 账号（建议用 GitHub 账号登录）

### 2. 部署步骤
1. 登录 Vercel 控制台
2. 点击 "Add New Project"
3. 选择 `my-portfolio` 仓库
4. 框架预设选择 **Vite**
5. 点击 "Deploy"

### 3. 绑定自定义域名 `alyssamarketing.com`
1. 在 Vercel 项目设置中，进入 **Domains** 标签
2. 输入 `alyssamarketing.com`，点击 "Add"
3. Vercel 会提供 DNS 配置信息：
   - **A 记录**：指向 `76.76.21.21`
   - **CNAME 记录**：`www` 指向 `cname.vercel-dns.com`
4. 登录你的域名注册商（如 GoDaddy、Namecheap、阿里云等）
5. 在 DNS 管理中添加上述记录
6. 等待 DNS 生效（通常 5-30 分钟）
7. Vercel 会自动配置 SSL 证书

---

## 二、CMS 后台配置

### 访问地址
部署后，CMS 后台地址为：
```
https://alyssamarketing.com/admin/
```

### GitHub OAuth 认证配置
DecapCMS 需要 GitHub OAuth 认证才能编辑内容。

#### 步骤 1：创建 GitHub OAuth App
1. 登录 GitHub，进入 **Settings > Developer settings > OAuth Apps**
2. 点击 "New OAuth App"
3. 填写信息：
   - **Application name**: `Alyssa Marketing CMS`
   - **Homepage URL**: `https://alyssamarketing.com`
   - **Authorization callback URL**: `https://alyssamarketing.com/admin/`
4. 点击 "Register application"
5. 生成 **Client ID** 和 **Client Secret**（记下来）

#### 步骤 2：配置 Netlify Identity（推荐）
由于 DecapCMS 默认使用 Netlify Identity，最简单的方式是：

1. 在 Vercel 项目根目录创建 `netlify.toml`：
```toml
[build]
  publish = "dist"

[[redirects]]
  from = "/admin/*"
  to = "/admin/index.html"
  status = 200
```

2. 或者使用 **DecapCMS 的 GitHub 后端直接配置**：
   修改 `public/admin/index.html` 中的 backend 配置：
```javascript
backend: {
  name: 'github',
  repo: 'Alyssaking666/my-portfolio',
  branch: 'main',
  base_url: 'https://alyssamarketing.com',
  auth_endpoint: 'api/auth'  // 需要配置 OAuth 代理
}
```

#### 步骤 3：简易方案 - 使用 Netlify CMS 托管
如果不想配置 OAuth，可以：
1. 同时在 **Netlify** 上部署同一个仓库
2. 启用 Netlify Identity
3. 在 Vercel 的 `public/admin/index.html` 中保持使用 `git-gateway` backend
4. CMS 通过 Netlify 的认证服务工作

---

## 三、CMS 使用说明

### 可编辑内容
1. **关于我** - 编辑个人简介、背景信息
2. **案例研究** - 添加/修改 Case Studies 内容
3. **技能项目** - 管理 Skills 页面项目
4. **数据亮点** - 更新 Highlights 数据

### 编辑流程
1. 访问 `https://alyssamarketing.com/admin/`
2. 使用 GitHub 账号登录
3. 在左侧菜单选择要编辑的内容类型
4. 修改内容后点击 "Save"（保存为草稿）
5. 确认无误后点击 "Publish"（发布到网站）
6. 所有修改会自动提交到 GitHub，触发 Vercel 重新部署

---

## 四、注意事项

1. **图片上传**：CMS 上传的图片会保存在 `public/images/uploads/` 目录
2. **自动部署**：每次通过 CMS 发布内容，Vercel 会自动重新构建和部署
3. **备份**：所有内容都保存在 GitHub 仓库中，天然有版本控制
4. **本地预览**：修改代码后，运行 `npm run dev` 本地预览

---

## 五、技术栈

- **前端**: React 19 + Vite + Tailwind CSS + Framer Motion
- **部署**: Vercel
- **CMS**: DecapCMS (原 Netlify CMS)
- **域名**: alyssamarketing.com
