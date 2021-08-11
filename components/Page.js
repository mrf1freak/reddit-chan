import Nav from 'components/Nav'

export default function Page(props){
    return (
        <div className="flex">
            <div className="w-72 flex-shrink-0 min-h-screen">
                <Nav />
            </div>

            <div>
                {
                    props.children
                }
            </div>

        </div>
    )
}