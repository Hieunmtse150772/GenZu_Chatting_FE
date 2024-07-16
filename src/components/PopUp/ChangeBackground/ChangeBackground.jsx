import { useCallback, useState } from "react";
import ExampleBackground from "./ExampleBackground/ExampleBackground";
import SelectBackground from "./SelectBackground/SelectBackground";
import './ChangeBackground.scss'
import { useDispatch, useSelector } from "react-redux";
import { handleChangeBackground } from "@/redux/Slice/userSlice";

export default function ChangeBackground({ onClose}){
    const [previewUrl, setPreviewUrl] = useState('')
    const [color, setColor] = useState('')
    const conversation = useSelector((state) => state.user.conversation)
    const dispatch = useDispatch()
    const handleBackgroundSelected = useCallback((item) =>{
        switch(item.type){
            case 'color':
                setColor(item.colorItem)
                setPreviewUrl('')

                break
            case 'image':
                setPreviewUrl(item.url)
                setColor('')
        }
    })
    const handleChange = (e) =>{
        if(!conversation) return
        const background = color ? { url: color, backgroundType: 'color'} : { url: previewUrl, backgroundType: 'image',}
        const itemBackground = {
            
            background: {background: background},
            idConversation: conversation._id
        }
        dispatch(handleChangeBackground(itemBackground))
        onClose()
    }
    return (
        <>
            {/* {isUpdate && <ToastSuccesful message={'Thay đổi background thành công'} />} */}
            <div className='changeBackground fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                <div className='relative flex flex-col justify-around rounded-lg bg-mainBlue p-6 shadow-lg'>
                
                    <button
                        className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    <div className="bg-white">
                        <div className="flex">
                            <div className="flex-initial w-56 px-2 border-4 ">
                                <SelectBackground handleCallBack={handleBackgroundSelected}/>

                            </div>
                            <div className="flex-initial w-full border-4">
                                <ExampleBackground color={color} imageUrl={previewUrl}/>

                            </div>

                        </div>
                        <div className="flex justify-end space-x-3">
                            <button className="inline-flex items-center rounded-md bg-transparent  text-sm font-semibold
                                            text-gray-400 shadow-sm hover:text-gray-600 focus-visible:outline 
                                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                    onClick={onClose}>
                                    <p> Hủy </p>
                            </button>
                            <button className="inline-flex items-center gap-x-2 rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold
                                            text-black shadow-sm hover:bg-blue-500 hover:text-white focus-visible:outline 
                                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                    onClick={handleChange}>
                                    <p> Xác nhận </p>
                            </button>
                        </div>
                    </div>

                    
                </div>
                
            </div>
    </>
    )
}