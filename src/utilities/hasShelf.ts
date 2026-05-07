import { ShelvesMaps } from "@/shelves";

export const hasShelf = (shelfID: number) => Object.hasOwn(ShelvesMaps, shelfID)