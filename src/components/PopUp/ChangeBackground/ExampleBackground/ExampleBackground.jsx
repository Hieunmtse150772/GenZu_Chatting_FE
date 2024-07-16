import { useLayoutEffect, useState } from "react"
export default function ExampleBackground(props){
    console.log('props:', props)
    const [backgroundStyle, setBackgroundStyle] = useState({})
    // let backgroundStyle 
    useLayoutEffect(() =>{
        let style
        if(props.imageUrl){

             style = {
                backgroundImage: `url(${props.imageUrl})`,
                backgroundSize: 'cover'
            }
        }else{
             style = {
                backgroundColor: props.color
            }
            

        }
        setBackgroundStyle(style)
    }, [props])
    console.log('backgroundStyle:', backgroundStyle)
    return (
           <div className={`mx-2 flex flex-col h-full`}
                style={backgroundStyle}> 
            <div className="flex justify-end">
                <div
                    className={`my-4 max-w-xs break-words rounded-lg bg-blue-200 pr-2`}
                
                >
                    Theme của bạn sẽ như này
                </div>
            </div>

            <div
                className={`my-4 max-w-xs break-words rounded-lg bg-blue-200 pl-2`}
            
            >
                    Tin nhắn của bạn sẽ được hiện với nội dung theme như này
            </div>
        </div>
    )
}