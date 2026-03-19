import { __MagicThemeConfig } from "./Magic";
import { __SkillshelfThemeConfig } from "./SkillShelf";
import type { ThemeConfig } from "@/types";

export const themesRegistry: Record<number, ThemeConfig> = {
    2: __MagicThemeConfig,
    3: __SkillshelfThemeConfig
}