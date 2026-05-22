import type { JSX } from "react";
import HomeIcon from "../icons/SideBarIcons/HomeIcon";
import ProfileIcon from "../icons/SideBarIcons/ProfileIcon";
import MainMenuIcon from "../icons/SideBarIcons/MainMenuIcon";
import ComponentsIcon from "../icons/MainIcons/ComponentsIcon";
import CNCIcon from "../icons/MainIcons/CNCIcon";
import ProcessIcon from "../icons/MainIcons/ProcessIcon";
import PolinICon from "../icons/MainIcons/PolinIcon";
import PersonalIcon from "../icons/MainIcons/PersonalIcon";
import ProductsIcon from "../icons/MainIcons/ProductsIcon";

/**Side Bar data */
export type LinksArraySideBarTypes = {
  label: string;
  icon: JSX.Element;
  to: string;
};
export const LinksArraySideBar: LinksArraySideBarTypes[] = [
  {
    label: "Home",
    icon: <HomeIcon />,
    to: "/",
  },
  {
    label: "Menu Principal",
    icon: <MainMenuIcon />,
    to: "/menu",
  },
  {
    label: "Perfil Usuario",
    icon: <ProfileIcon />,
    to: "/profile",
  },
];

/** menu hambur data */
export type LinksHamburMenuArrayTypes = Pick<
  LinksArraySideBarTypes,
  "label" | "to"
>;

export const LinksHamburMenuArray: LinksHamburMenuArrayTypes[] = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Perfil Usuario",
    to: "/profile",
  },
  {
    label: "Menu",
    to: "/menu",
  },
];

/** menu data */

export type MainMenuDataTypes = {
  title: string;
  subtitle: string;
  icon: JSX.Element;
  link: string;
};

export const MainMenuData: MainMenuDataTypes[] = [
  {
    title: "componentes", // se manitiene
    subtitle: "listado de componentes disponibles",
    icon: <ComponentsIcon />,
    link: "components",
  },
  {
    title: "productos", // nueva
    subtitle: "Productos disponibles",
    icon: <ProductsIcon />,
    link: "products",
  },
  {
    title: "ordenes de produccion", // se mantiene
    subtitle: "ordenes de produccion en plata",
    icon: <PolinICon />,
    link: "orders",
  },
  {
    title: "maquinas", // se mantiene
    subtitle: "maquinas disponibles en plata",
    icon: <CNCIcon />,
    link: "machines",
  },
  {
    title: "procesos", // se mantiene
    subtitle: "procesos disponibles en plata",
    icon: <ProcessIcon />,
    link: "process",
  },
  {
    title: "personal",
    subtitle: "personal en planta",
    icon: <PersonalIcon />,
    link: "personal",
  },
];

/* ------- Machine static data ----------*/

export const STATE_STYLES = {
  free: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-500 hover:bg-emerald-600 text-white",
    label: "Disponible",
    dot: "bg-emerald-500",
  },
  busy: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-600 hover:bg-blue-700 text-white",
    label: "En Uso",
    dot: "bg-blue-600",
  },
  in_preparation: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-500 hover:bg-amber-600 text-white",
    label: "Mantenimiento",
    dot: "bg-amber-500",
  },
};

export const TYPE_ASSETS = {
  lathe: {
    icon: "/lathe-work-machine.svg",
    fallback: "CNC",
  },
  milling: {
    icon: "/CNC.svg",
    fallback: "FR",
  },
  welding: {
    icon: "/reshot-icon-welding-mask-TKXRSLJEGB.svg",
    fallback: "SLD",
  },
  painting: {
    icon: "/painting-process.svg",
    fallback: "PNT",
  },
  packing: {
    icon: "/packing-icon.svg",
    fallback: "DEP",
  },
  assembly: {
    icon: "/assembly-icon.svg",
    fallback: "ARM",
  },
};
