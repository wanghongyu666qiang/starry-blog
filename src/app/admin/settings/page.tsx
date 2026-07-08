export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-text-primary">设置</h1>
      <p className="mt-4 text-text-secondary">
        站点设置通过环境变量和内容文件管理。
      </p>

      <div className="mt-8 space-y-6">
        <div className="p-6 border border-border bg-surface">
          <h2 className="font-medium text-text-primary">管理员密码</h2>
          <p className="mt-1 text-sm text-text-secondary">
            修改 <code className="px-1.5 py-0.5 bg-bg-alt border border-border text-xs">.env.local</code> 中的
            <code className="px-1.5 py-0.5 bg-bg-alt border border-border text-xs ml-1">ADMIN_PASSWORD</code>
          </p>
        </div>

        <div className="p-6 border border-border bg-surface">
          <h2 className="font-medium text-text-primary">站点信息</h2>
          <p className="mt-1 text-sm text-text-secondary">
            站点标题、描述等信息通过对应页面的 component metadata 配置。
          </p>
        </div>

        <div className="p-6 border border-border bg-surface">
          <h2 className="font-medium text-text-primary">内容管理</h2>
          <p className="mt-1 text-sm text-text-secondary">
            文章和项目以 Markdown 文件形式存储在
            <code className="px-1.5 py-0.5 bg-bg-alt border border-border text-xs mx-1">src/content/</code>
            目录中，可直接用 Obsidian 编辑。
          </p>
        </div>
      </div>
    </div>
  );
}
