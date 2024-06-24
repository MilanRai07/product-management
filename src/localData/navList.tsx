import { navitem } from "../type/navbar";
import { FaHome } from "react-icons/fa";
import { MdAddCard } from "react-icons/md";
import { MdManageHistory } from "react-icons/md";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { FaLaptop } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";

export const navList: navitem[] = [
  { 'name': 'Home', 'icon': <FaHome />, 'link': '/' },
  { 'name': 'Add Products', 'icon': <MdAddCard />, 'link': '/add-products' },
  { 'name': 'Manage Products', 'icon': <MdManageHistory />, 'link': '/manage-products' },
  { 'name': 'Mobiles', 'icon': <MdOutlinePhoneIphone />, 'link': '/mobiles' },
  { 'name': 'Laptops', 'icon': <FaLaptop />, 'link': '/laptops' },
  { 'name': 'Computer Parts', 'icon': <IoSettings />, 'link': '/computer-parts' },
  { 'name': 'Analytics', 'icon': <SiGoogleanalytics />, 'link': '/analytics' },
]