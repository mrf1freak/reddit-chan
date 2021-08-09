import Nav from 'components/Nav'

export default function Page(props){
    return (
        <div>
            <Nav />
            {
                props.children
            }
        </div>
    )
}