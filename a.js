const express = require('express');
const Replicate = require('replicate');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

const replicate = new Replicate({
  auth: process.env.PORT,
});

//animation2k-flux
app.post('/animation2k', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const output = await replicate.run(
      "lucataco/flux-dev-multi-lora:a738942df15c8c788b076ddd052256ba7923aade687b12109ccc64b2c3483aa1",
      {
        input: {
          prompt: prompt,
          hf_loras: ["https://huggingface.co/nerijs/animation2k-flux/resolve/main/animation2k_v1.safetensors"],
          num_outputs: 1,
          aspect_ratio: "1:1",
          output_format: "png",
          guidance_scale: 3.5,
          output_quality: 80,
          num_inference_steps: 28
        }
      }
    );

    res.json({ output });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'An error occurred while generating the image' });
  }
});

//art-lora
app.post("/art_lora",async(req,res)=>{
    const {prompt} = req.body;
        const output = await replicate.run(
            "lucataco/flux-dev-multi-lora:a738942df15c8c788b076ddd052256ba7923aade687b12109ccc64b2c3483aa1",
            {
              input: {
                prompt: `${prompt}, art style`,
                hf_loras: ["https://huggingface.co/XLabs-AI/flux-lora-collection/resolve/main/art_lora.safetensors"],      
                num_outputs: 1,
                aspect_ratio: "1:1",
                output_format: "png",
                guidance_scale: 3.5,
                output_quality: 80,
                num_inference_steps: 28
              }
            }
          );
          console.log(output);
          res.json({ output });
})

//diseny
app.post("/diseny",async(req,res)=>{
    const {prompt} = req.body;
        const output = await replicate.run(
            "lucataco/flux-dev-multi-lora:a738942df15c8c788b076ddd052256ba7923aade687b12109ccc64b2c3483aa1",
            {
              input: {
                prompt: `${prompt}, Disney style`,
                hf_loras: ["https://huggingface.co/XLabs-AI/flux-lora-collection/resolve/main/disney_lora.safetensors"],      
                num_outputs: 1,
                aspect_ratio: "1:1",
                output_format: "png",
                guidance_scale: 3.5,
                output_quality: 80,
                num_inference_steps: 28
              }
            }
          );
          res.json({ output });
})

//frosting_lane_flux
app.post("/laneflux",async(req,res)=>{
    const {prompt} = req.body;
        const output = await replicate.run(
            "lucataco/flux-dev-multi-lora:a738942df15c8c788b076ddd052256ba7923aade687b12109ccc64b2c3483aa1",
            {
              input: {
                prompt: `${prompt}, frstingln illustration`,
                hf_loras: ["https://huggingface.co/alvdansen/frosting_lane_flux/resolve/main/flux_dev_frostinglane_araminta_k.safetensors"],
                num_outputs: 1,
                aspect_ratio: "1:1",
                output_format: "png",
                guidance_scale: 3.5,
                output_quality: 80,
                num_inference_steps: 28
              }
            }
          );
          res.json({ output });
})

//softserve_anime  -- not working private 
app.post("/softserve_anime",async(req,res)=>{
    const {prompt} = req.body;
        const output = await replicate.run(
            "lucataco/flux-dev-multi-lora:a738942df15c8c788b076ddd052256ba7923aade687b12109ccc64b2c3483aa1",
            {
              input: {
                prompt: `${prompt},sftsrv style`,
                hf_loras: ["https://replicate.delivery/yhqm/xIUPCppeslXbaC6D8hzONTPKFURik2zRMLmmif0GRq2f55lmA/trained_model.tar","alvdansen/softserve_anime"],
                num_outputs: 1,
                aspect_ratio: "1:1",
                output_format: "png",
                guidance_scale: 3.5,
                output_quality: 80,
                num_inference_steps: 28
              }
            }
          );
          res.json({ output });
})


// the-point-flux
app.post("/pntstyle",async(req,res)=>{
    const {prompt} = req.body;
    const output = await replicate.run(
        "lucataco/flux-dev-multi-lora:a738942df15c8c788b076ddd052256ba7923aade687b12109ccc64b2c3483aa1",
        {
          input: {
            prompt: `${prompt}, pnt style`,
            hf_loras: ["https://huggingface.co/alvdansen/the-point-flux/resolve/main/thepoint_flux_araminta_k.safetensors"],
            num_outputs: 1,
            aspect_ratio: "1:1",
            output_format: "png",
            guidance_scale: 3.5,
            output_quality: 80,
            num_inference_steps: 28
          }
        }
      );
      console.log(output);
      res.json({output})
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});