const express = require('express');
const Replicate = require('replicate');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN
});

//animation2k-flux - done
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

//art-lora - done
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

//diseny - done
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

//frosting_lane_flux - done
app.post("/frosting_lane_flux",async(req,res)=>{
    const {prompt} = req.body;
    const output = await replicate.run(
      "lucataco/flux-dev-multi-lora:a738942df15c8c788b076ddd052256ba7923aade687b12109ccc64b2c3483aa1",
      {
        input: {
          prompt: `${prompt} , frstingln illustration`,
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
    console.log(output);
          res.json({ output });
})

// the-point-flux - done
app.post("/the_point_flux", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

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
  res.json({output})
  console.log(output);
    
});

//flux-softserve-anime - done
app.post("/flux_softserve_anime",async(req,res)=>{
  const {prompt} = req.body;
  const output = await replicate.run(
    "aramintak/flux-softserve-anime:9e35b00131765c22d260dce4106d6688e83e67d4416955ca137cb27c94ed81c9",
    {
      input: {
        model: "dev",
        prompt: `${prompt}, sftsrv style`,
        lora_scale: 1,
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

// flux-watercolor - done
app.post("/flux_watercolor",async(req,res)=>{
  const {prompt} = req.body;
  const output = await replicate.run(
    "lucataco/flux-watercolor:846d1eb37059ed2ed268ff8dd4aa1531487fcdc3425a7a44c2a0a10723ef8383",
    {
      input: {
        model: "dev",
        prompt:  `${prompt}`,
        lora_scale: 1,
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

//flux-ghibsky-illustration - done
app.post("/flux_ghibsky_illustration",async(req,res)=>{
  const {prompt} = req.body;
  const output = await replicate.run(
    "aleksa-codes/flux-ghibsky-illustration:a9f94946fa0377091ac0bcfe61b0d62ad9a85224e4b421b677d4747914b908c0",
    {
      input: {
        model: "dev",
        prompt: `GHIBSKY style, ${prompt}`,
        lora_scale: 1,
        num_outputs: 1,
        aspect_ratio: "9:16",
        output_format: "png",
        guidance_scale: 3.5,
        output_quality: 100,
        num_inference_steps: 28
      }
    }
  );
  console.log(output);
    res.json({output})
})

//flux-dev-realism - done
app.post("/flux_dev_realism",async(req,res)=>{
  const {prompt} = req.body;
  const output = await replicate.run(
    "xlabs-ai/flux-dev-realism:39b3434f194f87a900d1bc2b6d4b983e90f0dde1d5022c27b52c143d670758fa",
    {
      input: {
        prompt: `${prompt}`,
        guidance: 3.5,
        num_outputs: 1,
        aspect_ratio: "4:5",
        lora_strength: 0.8,
        output_format: "png",
        output_quality: 100,
        num_inference_steps: 30
      }
    }
  );
  console.log(output);
    res.json({output})
})

//flux-dev-multi-lora  - done
app.post("/flux_dev_realism",async(req,res)=>{
  const {prompt} = req.body;
  const output = await replicate.run(
    "xlabs-ai/flux-dev-realism:39b3434f194f87a900d1bc2b6d4b983e90f0dde1d5022c27b52c143d670758fa",
    {
      input: {
        prompt: `${prompt}`,
        guidance: 3.5,
        num_outputs: 1,
        aspect_ratio: "4:5",
        lora_strength: 0.8,
        output_format: "png",
        output_quality: 100,
        num_inference_steps: 30
      }
    }
  );
  console.log(output);
    res.json({output})
})

//flux-dev-multi-lora - done
app.post("/flux_dev_multi_lora",async(req,res)=>{
  const {prompt} = req.body;
  const output = await replicate.run(
    "lucataco/flux-dev-multi-lora:a738942df15c8c788b076ddd052256ba7923aade687b12109ccc64b2c3483aa1",
    {
      input: {
        prompt: `a photo of TOK, sftsrv style, ${prompt}`,
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
  console.log(output);
  res.json({ output });
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});