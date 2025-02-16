import DesktopIcon from "../components/icons/DesktopIcon";
import CodeIcon from "../components/icons/CodeIcon";
import DatabaseIcon from "../components/icons/DatabaseIcon";
import SearchIcon from "../components/icons/SearchIcon";
import BillsIcon from "../components/icons/BillsIcon";
import ShoppingCartIcon from "../components/icons/ShoppingCartIcon";
import MobileIcon from "../components/icons/MobileIcon";

import { FC } from "react";

export const iconMapper: Record<string, FC> = {
  DesktopIcon,
  CodeIcon,
  DatabaseIcon,
  SearchIcon,
  BillsIcon,
  ShoppingCartIcon,
  MobileIcon,
} as const;

export type IconType = keyof typeof iconMapper;
export default iconMapper;
