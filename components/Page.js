import Nav from 'components/Nav'
import {useState} from "react";
import {RiMenu4Fill} from "react-icons/ri";
import {GrFormClose} from "react-icons/gr";

export default function Page(props){
    const [open, setOpen] = useState(false)

    const openStyles = open ? " left-0" : ""


    return (
        <div className="flex">
            <div className={"md:static fixed right-full top-0 bottom-0 w-72 flex-shrink-0 min-h-screen z-20" + openStyles}>
                <Nav />
                <div className="md:static fixed top-6 right-6 p-3 bg-white rounded-3xl shadow" onClick={() => setOpen(!open)}>
                    {open ? <GrFormClose/> : <RiMenu4Fill/>}
                </div>
            </div>
            {open && <div className="fixed bg-black top-0 bottom-0 left-0 right-0 opacity-70 z-10" />}

            <div>
                {
                    props.children
                }
            </div>

        </div>
    )
}