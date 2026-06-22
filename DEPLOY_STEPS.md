# Vercel 部署详细步骤

## 前置条件
- GitHub 账号（https://github.com）
- Vercel 账号（建议用 GitHub 登录：https://vercel.com）
- 域名 `alyssamarketing.com` 已购买

---

## 步骤一：创建 GitHub 仓库

1. 登录 GitHub
2. 点击右上角 **+** → **New repository**
3. 填写信息：
   - Repository name: `my-portfolio`
   - Visibility: **Public**
   - 不要勾选 "Add a README file"
4. 点击 **Create repository**

---

## 步骤二：推送本地代码到 GitHub

在 PowerShell 中运行以下命令：

```powershell
cd "C:\Users\阿丽莎赛高\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\work-mode-projects\6a28dc6d65a66f82a8058fc4\my-portfolio"

# 添加远程仓库（替换为你的 GitHub 用户名）
git remote add origin https://github.com/Alyssaking666/my-portfolio.git

# 推送到 main 分支
git branch -M main
git push -u origin main
```

> 第一次推送会要求登录 GitHub，按提示操作即可。

---

## 步骤三：Vercel 部署

### 方式 A：通过 Vercel 网页界面（推荐）

1. 访问 https://vercel.com/new
2. 点击 **Import Git Repository**
3. 在列表中找到并点击 **Alyssaking666/my-portfolio**
   - 如果没有看到，点击 "Adjust GitHub App Permissions" 授权访问
4. 配置项目：
   - **Framework Preset**: 选择 `Vite`
   - **Root Directory**: `./`（默认）
   - 其他保持默认
5. 点击 **Deploy**
6. 等待 1-2 分钟，部署完成后会显示访问链接（如 `my-portfolio-xxx.vercel.app`）

### 方式 B：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

---

## 步骤四：绑定自定义域名

1. 进入 Vercel 项目 Dashboard
2. 点击顶部 **Settings** 标签
3. 左侧选择 **Domains**
4. 输入 `alyssamarketing.com`，点击 **Add**
5. Vercel 会显示需要的 DNS 配置：

| 记录类型 | 主机记录 | 记录值 |
|---------|---------|--------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

6. 登录你的域名注册商（如 GoDaddy、Namecheap、阿里云、腾讯云等）
7. 找到 DNS 管理/域名解析设置
8. 添加上述两条记录
9. 返回 Vercel，等待验证（通常 5-30 分钟）
10. Vercel 会自动配置 SSL 证书（HTTPS）

---

## 步骤五：验证部署

1. 访问 `https://alyssamarketing.com` 查看网站
2. 访问 `https://alyssamarketing.com/admin/` 查看 CMS 后台

---

## 后续更新网站

每次修改代码后：

```bash
git add .
git commit -m "更新内容"
git push origin main
```

Vercel 会自动重新构建和部署。

---

## 常见问题

**Q: Vercel 上找不到我的仓库？**
A: 点击 Vercel 上的 "Adjust GitHub App Permissions"，确保给 Vercel 授权访问你的仓库。

**Q: 部署失败？**
A: 检查 Vercel 的 Build Logs，常见原因：
- 框架预设选错（应选 Vite）
- 依赖安装失败（检查 package.json）

**Q: 域名绑定后无法访问？**
A: DNS 生效需要时间（最长 48 小时），可以用以下命令检查：
```bash
nslookup alyssamarketing.com
```
