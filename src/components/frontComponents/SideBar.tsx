import RightIcon from "../../icons/SideBarIcons/RightIcon";
import Logo from "../Logo";
import { LinksArraySideBar } from "../../utils/staticData";
import { SideBarItems } from "./SideBar/SideBarItems";
import MenuHambur from "../MenuHambur";
import { Link } from "react-router-dom";

export type SideBarProps = {
  sideBarOpen: boolean;
  openCloseSideBar: () => void;
};

export default function SideBar({
  sideBarOpen,
  openCloseSideBar,
}: SideBarProps) {
  return (
    <section
      className={` flex flex-col ContentSidebar bg-gray-500 text-white h-full items-center ${sideBarOpen ? "OpenSideBar" : ""}`}
    >
      <Link to={"/"}>
        <Logo className=" m-2" />
      </Link>

      <div className=" w-full SideBarLinksContent">
        <div
          className={`flex w-full mt-4 ${sideBarOpen ? " justify-end" : "justify-center"}`}
        >
          <RightIcon
            className={`  pl-1 transition ${sideBarOpen ? " roteRightIcon" : ""}`}
            onClick={openCloseSideBar}
          />
        </div>
        <div className=" mt-20 w-full flex gap-1 flex-col">
          {LinksArraySideBar.map((item) => {
            return (
              <SideBarItems
                key={item.label}
                {...item}
                sideBarOpen={sideBarOpen}
              />
            );
          })}
        </div>
      </div>

      <MenuHambur />
    </section>
  );
}
