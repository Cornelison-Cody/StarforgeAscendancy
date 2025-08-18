# Sci-Fi Game Asset Generation Workflow

This document outlines the complete workflow for generating, organizing, and maintaining consistent artwork for your sci-fi trading card game and board game using AI image generators.

## 1. Asset Planning

### Card Types Inventory
- Character Cards
- Location/Environment Cards
- Technology/Equipment Cards
- Event Cards
- Special Ability Cards

### Board Game Components
- Game Board Sections
- Tokens and Markers
- Player Pieces
- Resource Cards/Tokens

### Asset Tracking System
Create a spreadsheet with the following columns:
- Asset ID
- Asset Name
- Asset Type
- Description
- Prompt Used
- AI Tool Used
- Generation Date
- Status (Draft/Final)
- File Location

## 2. AI Tool Setup

### Primary Tool: Midjourney
- **Access**: Via Discord or web interface
- **Subscription**: $10/month basic plan
- **Best for**: Character art, environments, technology items
- **Setup Steps**:
  1. Sign up at midjourney.com
  2. Join the Midjourney Discord server
  3. Navigate to any #newbies channel
  4. Use /imagine command with your prompts

### Secondary Tool: Leonardo AI
- **Access**: Web interface at leonardo.ai
- **Plan**: Free tier (or $10/month for more features)
- **Best for**: Detailed mechanical designs, spaceships, complex scenes
- **Setup Steps**:
  1. Create account at leonardo.ai
  2. Explore available models (especially sci-fi oriented ones)
  3. Generate using the web interface

### Tertiary Tool: Ideogram
- **Access**: Web interface at ideogram.ai
- **Plan**: Free tier (25 prompts/day)
- **Best for**: Cards with text elements, logos, symbols
- **Setup Steps**:
  1. Sign up at ideogram.ai
  2. Use the web interface for generation

## 3. Prompt Engineering Process

### Base Prompt Structure
```
[Art style] illustration of [subject] in a [setting] sci-fi environment, [lighting details], [color scheme], [composition], [additional style details], [quality descriptors]
```

### Style Consistency Elements
Always include these elements in every prompt:
- Reference to your specific sci-fi aesthetic (e.g., "neo-cyberpunk")
- Consistent lighting style
- Consistent color palette references
- Quality descriptors ("highly detailed", "professional", "concept art")

### Example Prompts by Asset Type

#### Character Card Example
```
Highly detailed digital painting of a female cyborg commander in neo-cyberpunk sci-fi style, standing on a space station bridge, blue and purple neon lighting, intricate mechanical augmentations, determined expression, professional concept art, sharp focus, trending on artstation
```

#### Location Card Example
```
Cinematic wide-angle view of a massive alien megastructure orbiting a ringed gas giant, neo-cyberpunk sci-fi style, blue and purple color scheme, atmospheric lighting with long shadows, highly detailed, professional concept art, sharp focus, trending on artstation
```

#### Technology Card Example
```
Detailed technical illustration of an advanced plasma rifle weapon in neo-cyberpunk sci-fi style, floating on dark background with blue and purple accent lighting, showing internal components, professional concept art, sharp focus, trending on artstation
```

## 4. Generation Process

### Step-by-Step Generation
1. Prepare prompt based on asset requirements and style guide
2. Generate 3-4 variations using primary AI tool
3. Select best result for refinement
4. If needed, use inpainting/editing to correct details
5. For text elements, use Ideogram or add text in post-processing
6. Save raw output with descriptive filename (assetID_type_version)

### Batch Generation Tips
- Group similar assets for batch generation
- Maintain a consistent prompt structure across batches
- Generate all faction-specific assets in dedicated sessions
- Keep detailed notes on successful prompts

## 5. Post-Processing Pipeline

### Basic Enhancement
1. Upscale images to minimum 4000x4000px using AI upscaler
2. Adjust contrast and sharpness if needed
3. Correct any color inconsistencies
4. Save as high-quality PNG

### Advanced Processing (if needed)
1. Remove unwanted elements or artifacts
2. Add or enhance text elements
3. Create transparent backgrounds for tokens/pieces
4. Apply consistent card frames and UI elements

### Recommended Tools
- Aiarty Image Enhancer for upscaling
- Photoshop/GIMP for advanced editing
- Removal.ai for background removal

## 6. Asset Organization System

### Folder Structure
```
/SciFiGame
  /RawGenerations
    /Characters
    /Environments
    /Technology
    /Events
  /ProcessedAssets
    /Cards
      /Characters
      /Environments
      /Technology
      /Events
    /BoardComponents
      /Board
      /Tokens
      /PlayerPieces
  /ReferenceArt
  /StyleGuide
  /PromptLibrary
```

### Naming Convention
`[AssetID]_[AssetType]_[Version].[extension]`

Example: `CHAR042_CyborgCommander_v3.png`

### Version Control
- Keep all promising variations
- Number versions sequentially
- Document changes between versions

## 7. Quality Control Process

### Consistency Check
- Compare new assets against style guide
- Place new assets alongside existing ones to check visual harmony
- Verify color palette adherence
- Check for consistent lighting and rendering style

### Technical Check
- Verify image resolution meets requirements
- Check for artifacts or generation errors
- Ensure text is legible (if applicable)
- Verify transparent areas are properly defined

### Feedback Loop
- Review assets with team members
- Document feedback
- Implement changes in next generation round
- Update style guide if needed

## 8. Expansion Planning

### Style Evolution
- Document how the style may evolve for expansions
- Create mood boards for new factions/environments
- Test new style elements before full implementation

### Asset Reuse Strategy
- Identify elements that can be reused or modified
- Create template prompts for recurring asset types
- Build a library of successful prompt components