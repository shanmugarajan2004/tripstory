const fs = require('fs');
const path = require('path');

const northPath = path.join(__dirname, 'data', 'northIndia.ts');
const southPath = path.join(__dirname, 'data', 'southIndia.ts');

function replaceImages(content) {
  let counter = 1;
  return content.replace(/image\s*:\s*(["'`])(.*?)\1/g, (match, quote, url, offset, str) => {
    // Extract the place name or title for better keyword targeting
    const precedingText = str.substring(Math.max(0, offset - 150), offset);
    const titleMatch = precedingText.match(/title\s*:\s*(["'`])(.*?)\1/) || 
                       precedingText.match(/location\s*:\s*(["'`])(.*?)\1/);
    
    let keyword = 'travel';
    
    if (titleMatch && titleMatch[2]) {
       const text = titleMatch[2];
       const words = text.replace(/[^a-zA-Z ]/g, ' ').split(/\s+/).filter(w => w.length > 3).slice(0, 1);
       if (words.length > 0) {
         keyword = words[0].toLowerCase();
       }
    }
    
    // Using loremflickr for reliable unique keyword-based image generation instead of deprecated Unsplash Source
    const newImage = `https://loremflickr.com/600/800/india,${encodeURIComponent(keyword)}/all?lock=${counter}`;
    counter++;
    
    return `image: "${newImage}"`;
  });
}

try {
  let northContent = fs.readFileSync(northPath, 'utf8');
  northContent = replaceImages(northContent);
  fs.writeFileSync(northPath, northContent);
  console.log('Updated northIndia.ts');

  let southContent = fs.readFileSync(southPath, 'utf8');
  // Offset counter for south to ensure no overlap in lock IDs
  let counter = 200;
  southContent = southContent.replace(/image\s*:\s*(["'`])(.*?)\1/g, (match, quote, url, offset, str) => {
    const precedingText = str.substring(Math.max(0, offset - 150), offset);
    const titleMatch = precedingText.match(/title\s*:\s*(["'`])(.*?)\1/) || 
                       precedingText.match(/location\s*:\s*(["'`])(.*?)\1/);
    
    let keyword = 'travel';
    
    if (titleMatch && titleMatch[2]) {
       const text = titleMatch[2];
       const words = text.replace(/[^a-zA-Z ]/g, ' ').split(/\s+/).filter(w => w.length > 3).slice(0, 1);
       if (words.length > 0) {
         keyword = words[0].toLowerCase();
       }
    }
    
    const newImage = `https://loremflickr.com/600/800/india,${encodeURIComponent(keyword)}/all?lock=${counter}`;
    counter++;
    
    return `image: "${newImage}"`;
  });
  
  fs.writeFileSync(southPath, southContent);
  console.log('Updated southIndia.ts');
  
  console.log('Images replaced successfully!');
} catch (e) {
  console.error("Error updating files:", e);
}
