"use client";

import { useState } from 'react';

export default function Home() {
  const [selectedModel, setSelectedModel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const models = [
    { value: 'animation2k', label: 'Animation 2K' },
    { value: 'art_lora', label: 'Art LoRA' },
    { value: 'diseny', label: 'Disney Style' },
    { value: 'frosting_lane_flux', label: 'Frosting Lane Flux' },
    { value: 'the_point_flux', label: 'The Point Flux' },
    { value: 'flux_softserve_anime', label: 'Flux Softserve Anime' },
    { value: 'flux_watercolor', label: 'Flux Watercolor' },
    { value: 'flux_ghibsky_illustration', label: 'Flux Ghibsky Illustration' },
    { value: 'flux_dev_realism', label: 'Flux Dev Realism' },
    { value: 'flux_dev_multi_lora', label: 'Flux Dev Multi LoRA' },
  ];

  const handleGenerate = async () => {
    if (!selectedModel || !prompt) {
      setError('Please select a model and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:3001/${selectedModel}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setGeneratedImage(data.output[0]);
    } catch (error) {
      console.error('Error generating image:', error);
      setError('An error occurred while generating the image.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1>Image Generator</h1>
      <div>
        <select 
          value={selectedModel} 
          onChange={(e) => setSelectedModel(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        >
          <option value="">Select a model</option>
          {models.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
      </div>
      <button 
        onClick={handleGenerate} 
        disabled={isLoading}
        style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        {isLoading ? 'Generating...' : 'Generate Image'}
      </button>
      
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      
      {generatedImage && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>Generated Image</h2>
          <img src={generatedImage} alt="Generated" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
}
