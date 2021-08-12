import Nav from 'components/Nav'
import {useState} from "react";
import {RiMenu4Fill} from "react-icons/ri";
import {GrFormClose} from "react-icons/gr";
import {motion, AnimatePresence} from "framer-motion"

export default function Page(props){
    const [open, setOpen] = useState(false)

    const openStyles = {width: '100%'}

    return (
        <div className="flex">
            <motion.div className="md:static md:w-72 fixed top-0 bottom-0 w-0 flex-shrink-0 min-h-screen overflow-hidden shadow-lg z-20"
                animate={open ? openStyles : null}>
                <Nav />
            </motion.div>
            <div className="md:static md:hidden fixed top-12 right-6 p-3 bg-white rounded-3xl shadow cursor-pointer z-20" onClick={() => setOpen(!open)}>
                {open ? <GrFormClose/> : <RiMenu4Fill/>}
            </div>
            <AnimatePresence>
                {open &&
                <motion.div
                    className="fixed bg-black top-0 bottom-0 left-0 right-0 opacity-70 z-10"
                    initial={{opacity: 0}}
                    animate={{opacity: 0.7}}
                    exit={{opacity: 0}}/>
                }
            </AnimatePresence>


            <AnimatePresence>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                {
                    props.children
                }
            </motion.div>
            </AnimatePresence>


        </div>
    )
}