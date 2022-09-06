import { addNewPost, updatePost } from "../../firebase/database";
import { handleSubmitImage } from "../../firebase/storage";
import { Input } from "../Input";

export function Forms({ collection, data={} }){

  async function handleSubmit(e){
    e.preventDefault();
    const newData = new FormData(e.target);
    const value = Object.fromEntries(newData.entries());

    // verify if has any file and convert to url image using handleSubmitImage function
    // find all inputs with type file
    const inputs = e.target.querySelectorAll('input[type="file"]');
    // convert to array
    const inputsArray = Array.from(inputs);
    // convert to url image
    const urlImages = await Promise.all(inputsArray.map(async (input) => {
      if(input.files[0]) {
        const urlImage = await handleSubmitImage(input.files[0]);
        // change file from value to url image
        value[input.name] = urlImage;
        return urlImage;
      }
      return null;
    }));

    if(urlImages.length > 1) {
      // create a new field called images and add in value
      value.images = urlImages;
    }
    console.log(value);

    let response = null;

    // verify if data has id
    if('id' in data){
      response = await updatePost(collection?.name, data.id, value); 
      console.log('update', response);
    }
    else{
      // add new post
      response = await addNewPost(collection?.name, value);
      console.log('add', response);
    }

    if(response === 'ok'){
      // reload page
      window.location.reload();
    }
  }

  if(!collection) return <h1>404</h1>

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      {collection?.fields?.map((input, index) => (
        <Input key={index} {...input} defaultValue={data?.[input.name]} />
      ))}
      <input type="submit" value="Submit" />
    </form>
  )
}