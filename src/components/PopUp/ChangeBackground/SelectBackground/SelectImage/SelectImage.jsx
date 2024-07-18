import { useEffect, useRef, useState } from "react"

export default function SelectImage(props){

    const imageRef = useRef(null)
    const handleRemove = () =>{
      imageRef.current.value = ''
    }
    const handleFileChange = async (event, type) => {
        const file = event.target.files[0]
        // Nếu không có file được chọn, thoát khỏi hàm
        if (!file) return
    
        // Kiểm tra kích thước file dựa trên loại file
        if (file) {
          switch (type) {
            case 'image':
              if (file.size > 3 * 1048576) {
                // Nếu file ảnh quá lớn, hiển thị thông báo lỗi
                alert('Hình ảnh quá lớn, vui lòng chọn ảnh khác')
                return
              }
              props.handleCallBack({ url: URL.createObjectURL(file), type: type,  })
              break
            default:
              break
          }
        }
      }
      useEffect(()=>{
        handleRemove()
      }, [props.colorType])
    return (
        <div className="">
            <label className="mb-1 font-semibold">Select a image</label>
            <br/>
            <span className="">
                Vui lòng tải ảnh lên
            </span>
            <input
                type='file'
                accept='image/*'
                className=''
                ref={imageRef}
                onChange={(e) => handleFileChange(e, 'image')}
            />
            <button className="border-gray-400 italic font-light" onClick={handleRemove}>remove</button>
        </div>
    )
}