import { ImageInput } from "../ImageInput"

export function Input({ ...props }) {  
  if(props.type === 'file') {
    return <ImageInput name={props.name} urlImage={props.defaultValue}/>
  }

  return (
    <input
      {...props}
      style={{
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '5px',
      }}
      required
    />
  )
}