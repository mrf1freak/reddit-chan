import Image from 'next/image'

export default function PostThumbnailImage(props){
    const {tim, tn_w, tn_h, filename} = props.post
    const {board, className} = props

    if(typeof tim === 'undefined') return null

    return (
        <div className={className}>
            <Image
                src={`https://i.4cdn.org/${board}/${tim}s.jpg`}
                width={tn_w}
                height={tn_h}
                alt={filename}
            />
        </div>
        )


}