import { useEffect, useRef, useState } from "react";

export function ImageInput({ name, urlImage=null }){
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
  
  function addImage(e) {
    const newFile = e.target.files[0];
    setImage(newFile);
  }

  function FileListItems (files) {
    var b = new ClipboardEvent("").clipboardData || new DataTransfer()
    for (var i = 0, len = files.length; i<len; i++) b.items.add(files[i])
    return b.files
  }

  useEffect(() => {
    if(urlImage){
      // download image from url
      async function downloadImage(url){
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], "image.png", { type: "image/png" });
        setImage(file);
        // add file to input
        inputRef.current.files = FileListItems([file]);
      }
      downloadImage(urlImage);
    }
  },[])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <input
        type="file"
        name={name}
        style={{
          padding: '10px',
          margin: '10px 0',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
        required
        placeholder="Imagem"
        accept="image/*"
        onChange={addImage}
        onDrop={addImage}
        ref={inputRef}
      />
      {image && <img src={URL.createObjectURL(image)} width="200px" alt="Imagem" />}
    </div>
  );
}