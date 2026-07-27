export const SITE_URL = "https://www.starrylovetbao.cloud";

export const siteConfig = {
  name: "Starry",
  title: "Starry — 软件工程学生、开发者与技术写作者",
  description:
    "海南大学软件工程专业在读，专注 C++、WebAssembly、多智能体系统与开发者工具。",
  url: SITE_URL,
  locale: "zh_CN",
  language: "zh-CN",
  author: {
    name: "Starry",
    github: "https://github.com/wanghongyu666qiang",
    email: "why17573315302@gmail.com",
  },
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
