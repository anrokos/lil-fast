export const sendToServer = async (imageBlob, prompt, numIterations) => {    
    const formData = new FormData();
    formData.append('image', imageBlob, 'drawing.jpg');
    formData.append('prompt', prompt);
    formData.append('num_iterations', numIterations.toString());


    try {
        const response = await fetch('https://lightnote-ai--img-model-inference.modal.run', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Server response was not ok');
      }

      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      return imageUrl
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate image. Please try again.');
    }
  };
