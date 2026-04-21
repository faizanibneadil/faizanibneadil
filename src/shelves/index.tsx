import { __MagicThemeConfig } from "./Magic";
import { __SkillshelfThemeConfig } from "./SkillShelf";
import type { ShelfConfig } from "@/types";

export const ShelvesMaps: Record<number, ShelfConfig> = {
    1: __SkillshelfThemeConfig,
    2: __MagicThemeConfig,
}