import { NavLink } from "react-router-dom"
import { navList } from "../localData/navList";
import { navitem } from "../type/navbar";

const NavBar = () => {

    return (
        <>
            <nav>
                <div className="FlexBetween bg-zinc-900 text-white h-screen p-12 w-72 ">
                    <h1 className="text-center text-3xl font-bold">Technology Inc</h1>
                    <ul className="flex flex-col gap-8 font-bold text-xl">
                        {
                            navList.map((item: navitem, index: number) => {
                                const { name, icon, link } = item;
                                return (
                                    <li key={index}>
                                        <NavLink to={link} className={({ isActive }) => isActive ? 'Active NavMenu' : 'NavMenu'}>
                                            {icon}
                                            <span>{name}</span>
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default NavBar