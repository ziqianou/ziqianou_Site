# 贡献指南 | Contributing Guide

感谢您对本项目的关注！欢迎任何形式的贡献。

## 如何贡献

### 报告问题

如果您发现了 bug 或有功能建议，请：

1. 检查 [Issues](https://github.com/ziqianou/ziqianou_Site/issues) 中是否已有相关问题
2. 如果没有，创建一个新的 Issue，并提供：
   - 清晰的标题
   - 详细的描述
   - 如果是 bug，请提供复现步骤
   - 截图（如果适用）

### 提交代码

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

### 代码规范

- 使用 2 个空格缩进
- HTML/CSS/JS 文件使用 UTF-8 编码
- 保持代码简洁易读
- 添加必要的注释
- 遵循现有的代码风格

### 提交信息规范

提交信息应该清晰地描述更改内容，建议使用以下格式：

```
类型: 简短描述

详细描述（可选）
```

类型可以是：
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具相关

### 开发流程

1. 克隆仓库
```bash
git clone https://github.com/ziqianou/ziqianou_Site.git
cd ziqianou_Site
```

2. 启动本地服务器进行开发
```bash
python -m http.server 8000
# 或使用 Node.js
npx http-server
```

3. 在浏览器中访问 `http://localhost:8000` 查看效果

4. 进行修改并测试

5. 提交代码

## 项目结构

```
.
├── index.html          # 主页面
├── 404.html           # 404 错误页面
├── css/               # 样式文件
│   └── page.css
├── js/                # JavaScript 文件
│   └── page.js
├── images/            # 图片资源
├── favicon.ico        # 网站图标
├── robots.txt         # 搜索引擎配置
└── sitemap.xml        # 网站地图
```

## 需要帮助？

如果您有任何问题，可以：

- 创建一个 Issue
- 发送邮件到 ziqianou@qq.com

## 行为准则

请保持友善和尊重。我们致力于提供一个开放和包容的环境。

## 许可证

通过贡献代码，您同意您的贡献将在 MIT 许可证下发布。
