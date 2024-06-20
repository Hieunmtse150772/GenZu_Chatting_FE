/* eslint-disable react/prop-types */
export default function DetailMessage(props) {
  return (
    <div>
      {console.log(props.inforMessage)}
      {props.inforMessage.map((item, index) =>
        item.id == 1 ? (
          <div key={index} className="flex justify-end">
            <div className="bg-blue-200 text-black p-2 rounded-lg max-w-xs">{item.message}</div>
          </div>
        ) : (
          <div key={index} className="flex">
            <div className="bg-gray-300 text-black p-2 rounded-lg max-w-xs">{item.message}</div>
          </div>
        )
      )}
    </div>
  );
}
