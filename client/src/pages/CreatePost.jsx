import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
    quantity:0,
    price:10,
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();    
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section>
      <div>
        <h1 className="ml-16 text-[#B5338A] font-extrabold italic">Create stunning images with DALL-E AI and personalize your gallery. Or, turn your favorite creation into a unique poster that you can own!</h1>
      </div>
      <div className="flex justify-center">
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 w-full">
          <FormField
            labelName="Name"
            type="text"
            name="name"
            placeholder="Enter a name for your image"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Image description"
            type="text"
            name="prompt"
            placeholder="Enter description"
            value={form.prompt}
            handleChange={handleChange}
  
          />
    

          <div className="flex justify-center items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
        <div className="mt-9 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-[#B5338A] font-medium rounded-md  px-5 py-1 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-9">
          <button
            type="submit"
            className="text-white bg-[#B5338A] font-medium rounded-md px-5 py-2.5 text-center"
          >
            {loading ? 'Adding...' : 'Add to gallery'}
          </button>
        </div>
        </div>
      </form>
      </div>
    </section>
  );
};

export default CreatePost;
