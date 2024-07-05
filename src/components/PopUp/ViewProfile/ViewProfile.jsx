
import DetailProfile from "./DetailProfile/DetailProfile"

export default function ViewProfile({ user, onClose}){
    
    
      
    return (<div className='ViewProfile fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                <div className='relative flex justify-around rounded-lg bg-white p-6 shadow-lg'>
                    <button
                        className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    <DetailProfile user={user}/>
                </div>
            </div>
        )
 }