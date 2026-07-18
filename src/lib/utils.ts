/** 用于 UI 显示，把 English category 格式化为双语 */
export function displayCategory(category: string | null): string {
  const map: Record<string, string> = {
    Research: "研究 Research",
    Engineering: "工程 Engineering",
    Learning: "学习 Learning",
    Thoughts: "思考 Thoughts",
  };
  return category ? (map[category] || category) : "";
}
